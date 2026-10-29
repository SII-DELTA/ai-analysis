"""Frontier 3D three.js 端到端 headless 交互验证。"""
from __future__ import annotations

import hashlib
import json
import math
import os
import re
import subprocess
import sys
import time
import traceback
import uuid
from pathlib import Path

from playwright.sync_api import Error as PlaywrightError, TimeoutError as PlaywrightTimeoutError, sync_playwright

from tests.browser_playwright.frontier_3d_playwright_verification_support import (
    create_frontier_3d_test_page_with_runtime_observation,
    launch_requested_frontier_3d_test_browser,
    wait_for_frontier_layout_transitions_and_render,
)

REPOSITORY_ROOT = Path(__file__).resolve().parents[2]
from src.frontier_3d_worktree_storage_paths import resolve_frontier_3d_storage_paths
HTML_PATH = (
    Path(sys.argv[1])
    if len(sys.argv) > 1
    else resolve_frontier_3d_storage_paths().output_html_path
).resolve()


class FrontierInteractionVerificationEvidenceJournal:
    """逐条落盘，失败和中断记录不会被后续重放覆盖。"""

    def __init__(self, html_path: Path):
        self.directory = Path(os.environ.get(
            "FRONTIER_3D_INTERACTION_VERIFICATION_ARTIFACT_DIRECTORY",
            str(REPOSITORY_ROOT / ".frontier-3d-worktree-artifacts/interaction-verification"),
        )).resolve()
        self.directory.mkdir(parents=True, exist_ok=True)
        self.journal_path = self.directory / "interaction-verification-events.jsonl"
        html_bytes = html_path.read_bytes()
        embedded_input = re.search(
            rb'<script id="frontier-3d-visualization-dataset-json"[^>]*>(.*?)</script>',
            html_bytes, re.DOTALL,
        )
        assert embedded_input, "HTML 缺少嵌入的科学数据契约"
        self.fingerprint = {
            "html_sha256": hashlib.sha256(html_bytes).hexdigest(),
            "embedded_input_sha256": hashlib.sha256(embedded_input[1]).hexdigest(),
            "verification_source_sha256": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
            "layout_support_source_sha256": hashlib.sha256(Path(__file__).with_name(
                "frontier_3d_playwright_verification_support.py"
            ).read_bytes()).hexdigest(),
            "head_commit": subprocess.check_output(
                ["git", "rev-parse", "HEAD"], cwd=REPOSITORY_ROOT, text=True, timeout=5,
            ).strip(),
            "browser_name": os.environ.get("FRONTIER_3D_TEST_BROWSER", "chromium"),
        }
        previous_start = None
        previous_terminal_events = {}
        interrupted_journal_tail = False
        journal_needs_newline = False
        if self.journal_path.exists():
            journal_text = self.journal_path.read_text(encoding="utf-8", errors="replace")
            journal_needs_newline = bool(journal_text) and not journal_text.endswith("\n")
            for line in journal_text.splitlines():
                try:
                    event = json.loads(line)
                except json.JSONDecodeError:
                    interrupted_journal_tail = True
                    continue
                if event["event"] == "run_started" and event["fingerprint"] == self.fingerprint:
                    previous_start = event
                if event["event"] in ("run_completed", "run_failed"):
                    previous_terminal_events[event["run_id"]] = event
        self.run_id = uuid.uuid4().hex
        previous_terminal = previous_terminal_events.get(previous_start["run_id"]) if previous_start else None
        interrupted_run = previous_start and (previous_terminal is None
            or previous_terminal.get("reason") == "interrupted_replay_budget_exhausted")
        replay_count = previous_start["replay_count"] + 1 if interrupted_run else 0
        # 追加换行保留被机器中断的尾部；完整历史行仍可独立读取。
        if journal_needs_newline:
            with self.journal_path.open("a", encoding="utf-8") as journal:
                journal.write("\n")
        self.record(event="run_started", fingerprint=self.fingerprint, html_path=str(html_path.resolve()),
                    replay_count=replay_count,
                    replay_of_run_id=previous_start["run_id"] if interrupted_run else None,
                    interrupted_journal_tail=interrupted_journal_tail)
        if replay_count > 1:
            self.record(event="run_failed", reason="interrupted_replay_budget_exhausted")
            raise AssertionError("相同候选的中断重放预算已耗尽；原始证据已保留")

    def record(self, *, event: str, **details) -> None:
        record = {"run_id": self.run_id, "recorded_at_unix_seconds": time.time(),
                  "event": event, **details}
        with self.journal_path.open("a", encoding="utf-8") as journal:
            journal.write(json.dumps(record, ensure_ascii=False, allow_nan=False) + "\n")
            journal.flush()
            os.fsync(journal.fileno())


def _camera_distance(left: list[float], right: list[float]) -> float:
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(left, right)))


COMPARABLE_ONLY_TOGGLE_SELECTOR = (
    "#aa-model-identity-controls "
    "#aa-show-only-current-intelligence-index-version-comparable-models-toggle"
)
METRIC_VARIANT_KEYS = (
    "effective__effective",
    "effective__raw",
    "blended__effective",
    "blended__raw",
)

INTERACTION_RECOVERY_BUDGET_SECONDS = 60
REAL_EVENT_ASSERTION_TIMEOUT_MILLISECONDS = 3000


def _capture_current_camera_pose(page) -> dict:
    return page.evaluate("""() => {
      const {camera,controls}=frontierThreeDimensionalRendererDiagnostics;
      return {position:camera.position.toArray(),quaternion:camera.quaternion.toArray(),
        up:camera.up.toArray(),target:controls.target.toArray(),zoom:camera.zoom};
    }""")


def _restore_camera_pose(page, pose: dict, view_degrees: int = 0) -> None:
    page.evaluate("""({pose,degrees}) => {
      const {camera,controls,requestRender}=frontierThreeDimensionalRendererDiagnostics;
      camera.up.fromArray(pose.up);controls.target.fromArray(pose.target);
      camera.position.fromArray(pose.position).sub(controls.target)
        .applyAxisAngle(camera.up.clone().normalize(),degrees*Math.PI/180).add(controls.target);
      camera.zoom=pose.zoom;camera.updateProjectionMatrix();controls.update();
      if (!degrees) camera.quaternion.fromArray(pose.quaternion);
      camera.updateMatrixWorld();requestRender();
    }""", {"pose": pose, "degrees": view_degrees})


def _camera_pose_is_preserved(page, baseline: dict) -> bool:
    current = _capture_current_camera_pose(page)
    return all(
        _camera_distance(baseline[field], current[field]) < 1e-8
        for field in ("position", "quaternion", "up", "target")
    ) and abs(baseline["zoom"] - current["zoom"]) < 1e-8


def _find_canvas_pointer_position_matching_target_identity(page, target: dict) -> dict:
    """每次重新投影；中心与八个边缘点均核对 DOM、裁剪范围和目标完整身份。"""
    return page.evaluate("""target => {
      const diagnostics=frontierThreeDimensionalRendererDiagnostics;
      const canvas=diagnostics.renderer.domElement, bounds=canvas.getBoundingClientRect();
      const center=target.kind==='displayed_model'
        ? diagnostics.projectedCanvasPositionForModelName(target.name)
        : diagnostics.projectedCanvasPositionForPrunedLineageAncestorName(target.name);
      const radius=target.kind==='displayed_model'
        ? diagnostics.projectedCanvasMarkerRadiiForModelName(target.name)?.whiteBackplateRadius
        // 前身沿用渲染器既有的 18px 固定尺寸及当前标记倍数。
        : 18*frontierThreeDimensionalVisualizationState().markerSizeMultiplier/2;
      const layout={bounds:[bounds.x,bounds.y,bounds.width,bounds.height],
        cameraWorld:diagnostics.camera.matrixWorld.elements.slice(),
        cameraProjection:diagnostics.camera.projectionMatrix.elements.slice(),center,radius,
        devicePixelRatio:window.devicePixelRatio};
      const samples=[];
      if (!center || ![center.clientX,center.clientY,center.normalizedDeviceDepth,radius].every(Number.isFinite))
        return {position:null,layout,samples,reason:'nonfinite_or_missing_projection'};
      if (Math.abs(center.normalizedDeviceDepth)>1)
        return {position:null,layout,samples,reason:'outside_camera_clip_range'};
      const directions=[[0,0],...Array.from({length:8},(_,index)=>[
        Math.cos(index*Math.PI/4),Math.sin(index*Math.PI/4)])];
      for (const [dx,dy] of directions) {
        const point={clientX:center.clientX+dx*radius*.85,clientY:center.clientY+dy*radius*.85};
        let reason=null, hit=null;
        if (![point.clientX,point.clientY].every(Number.isFinite)) reason='nonfinite_pointer';
        else if (point.clientX<Math.max(0,bounds.left) || point.clientX>=Math.min(innerWidth,bounds.right)
          || point.clientY<Math.max(0,bounds.top) || point.clientY>=Math.min(innerHeight,bounds.bottom))
          reason='outside_canvas_or_viewport';
        else if (document.elementFromPoint(point.clientX,point.clientY)!==canvas) reason='canvas_not_dom_receiver';
        else {
          const interaction=diagnostics.pointerInteractionAtCanvasClientCoordinates(point.clientX,point.clientY);
          const model=interaction?.interactionTargetKind==='displayed_model'
            ? FRONTIER_3D_INTERACTION_RELATIONSHIPS.models[interaction.modelIndex] : null;
          hit=interaction ? {kind:interaction.interactionTargetKind,
            name:model?.name??interaction.prunedLineageAncestorNode?.name,
            modelUuid:model?.model_uuid??interaction.prunedLineageAncestorNode?.model_uuid??null,
            base:model?.base_model_name??interaction.prunedLineageAncestorNode?.base_model_name,
            lineageKey:model?.lineage_key??interaction.lineageKey??null} : null;
          if (!hit || hit.kind!==target.kind || hit.name!==target.name
            || hit.modelUuid!==(target.modelUuid??null) || hit.base!==target.base
            || hit.lineageKey!==(target.lineageKey??null)) reason='raycast_identity_mismatch';
        }
        samples.push({point,hit,reason});
        if (!reason) return {position:point,layout,samples,reason:null};
      }
      return {position:null,layout,samples,reason:'no_pickable_sample'};
    }""", target)


def verify_model_lineage_interactions(page, check, *, record_event=None):
    """契约决定目标身份；有界探查只选布置，正式验收必须发送真实鼠标事件。"""
    record_event = record_event or (lambda **event: None)
    deadline = time.monotonic() + INTERACTION_RECOVERY_BUDGET_SECONDS
    original_state = page.evaluate("frontierThreeDimensionalVisualizationState()")
    original_camera = _capture_current_camera_pose(page)
    original_metric = original_state["activeMetricVariantKey"]
    original_pins = original_state["pinnedBaseModelNames"]

    def require(condition, message):
        check(condition, message)
        if not condition:
            raise AssertionError(message)

    def remaining_real_event_timeout_milliseconds():
        remaining = deadline - time.monotonic()
        if remaining <= 0:
            raise AssertionError("真实拾取恢复总预算 60 秒已耗尽")
        return max(1, min(REAL_EVENT_ASSERTION_TIMEOUT_MILLISECONDS, int(remaining * 1000)))

    def wait_for_layout_within_recovery_budget():
        wait_for_frontier_layout_transitions_and_render(page, timeout_ms=remaining_real_event_timeout_milliseconds())
        remaining_real_event_timeout_milliseconds()

    def clear_hover_and_all_pinned_models():
        page.evaluate("""() => {
          for (const name of frontierThreeDimensionalVisualizationState().pinnedBaseModelNames)
            unpinFrontierBaseModel(name);
          clearFrontierHoverState();
        }""")

    def send_real_pointer_event_and_verify_target_state(target, event, predicate, context):
        for layout_attempt in range(2):
            wait_for_layout_within_recovery_budget()
            probe = _find_canvas_pointer_position_matching_target_identity(page, target)
            record_event(event="real_event_preflight", action=event, target=target,
                         layout_attempt=layout_attempt, **context, **probe)
            require(probe["position"] is not None, f"真实事件 {event} 前目标已不可拾取：{target['name']}")
            point = probe["position"]
            if event == "real_model_pin":
                page.mouse.click(point["clientX"], point["clientY"])
            else:
                page.mouse.move(0, 0)
                page.mouse.move(point["clientX"], point["clientY"])
            try:
                page.wait_for_function(predicate, arg=target, timeout=remaining_real_event_timeout_milliseconds())
            except PlaywrightTimeoutError:
                wait_for_layout_within_recovery_budget()
                after = _find_canvas_pointer_position_matching_target_identity(page, target)
                layout_changed = probe["layout"] != after["layout"]
                record_event(event="real_event_failed", action=event, target=target,
                             layout_attempt=layout_attempt, layout_changed=layout_changed,
                             after=after, state=page.evaluate("frontierThreeDimensionalVisualizationState()"),
                             reason="real_event_assertion_timeout", **context)
                if layout_attempt == 0 and layout_changed:
                    continue
                raise AssertionError(f"真实事件 {event} 失败：{target['name']}（布局重试 {layout_attempt}）")
            state = page.evaluate("frontierThreeDimensionalVisualizationState()")
            record_event(event=event, target=target, position=point, state=state, **context)
            return state

    capabilities = page.evaluate("""keys => keys.map(key=>{
      const variant=FRONTIER_3D_VISUALIZATION_DATASET.metric_variants[key];
      const models=variant.three_dimensional_scene.displayed_model_markers;
      const relationships=variant.interaction_relationships;
      // 沿用渲染器的旧 v2 降级及有限坐标规则，能力仍由契约而非运行时成功与否决定。
      const lineages=Object.fromEntries(Object.entries(relationships.lineages||{}).map(([key,nodes])=>[
        key,(Array.isArray(nodes)?nodes:[]).filter(node=>node?.lineage_family_key
          && node?.reasoning_level_label && [node.x,node.y,node.z].every(Number.isFinite)),
      ]).filter(([,nodes])=>nodes.length>=2));
      return {key,markerCount:models.length,
        lineageCount:Object.keys(lineages).length,
        prunedAncestorCount:Object.values(lineages).flat().filter(node=>!node.kept).length,
        candidates:models.map(model=>({kind:'displayed_model',name:model.name,
          modelUuid:model.model_uuid??null,
          base:model.base_model_name,lineageKey:model.lineage_key??null,
          variants:(relationships.base_groups[model.base_model_name]||[]).length,
          lineageNodeCount:(lineages[model.lineage_key]||[]).length,
          ancestors:(lineages[model.lineage_key]||[]).filter(node=>!node.kept).map(node=>({
            kind:'pruned_lineage_ancestor',name:node.name,base:node.base_model_name,
            modelUuid:node.model_uuid??null,
            lineageKey:model.lineage_key}))}))};
    })""", list(METRIC_VARIANT_KEYS))
    record_event(event="contract_capabilities", variants=capabilities)
    needs_lineage = any(variant["lineageCount"] for variant in capabilities)
    needs_ancestor = any(variant["prunedAncestorCount"] for variant in capabilities)
    for capability, exists in (("lineage", needs_lineage), ("pruned_ancestor", needs_ancestor),
                               ("displayed_model", any(variant["markerCount"] for variant in capabilities))):
        if not exists:
            record_event(event="capability_not_applicable", capability=capability,
                         reason="all_metric_contracts_confirm_absence")
            print(f"  · {capability}：四个口径的契约均确认能力不存在")
    ordered_variants = sorted(capabilities, key=lambda variant: variant["key"] != original_metric)
    try:
        clear_hover_and_all_pinned_models()
        for variant in ordered_variants:
            remaining_real_event_timeout_milliseconds()
            _activate_metric_variant(page, variant["key"], timeout_ms=remaining_real_event_timeout_milliseconds())
            require(page.evaluate("frontierThreeDimensionalVisualizationState().displayedModelMarkerCount")
                    == variant["markerCount"], f"{variant['key']} 显示模型数与契约一致（{variant['markerCount']}）")
            if not variant["markerCount"]:
                record_event(event="empty_metric_confirmed", metric_variant=variant["key"], marker_count=0)
                continue
            candidates = [candidate for candidate in variant["candidates"]
                          if (not needs_lineage or candidate["lineageNodeCount"] >= 2)
                          and (not needs_ancestor or candidate["ancestors"])]
            for view_degrees in (0, -90, 90, 180):
                _restore_camera_pose(page, original_camera, view_degrees)
                wait_for_layout_within_recovery_budget()
                baseline = _capture_current_camera_pose(page)
                context = {"metric_variant": variant["key"], "view_degrees": view_degrees,
                           "camera_baseline": baseline}
                record_event(event="view_prepared", **context)
                for candidate in candidates:
                    remaining_real_event_timeout_milliseconds()
                    clear_hover_and_all_pinned_models()
                    wait_for_layout_within_recovery_budget()
                    model_probe = _find_canvas_pointer_position_matching_target_identity(page, candidate)
                    record_event(event="candidate_probe", target=candidate, **model_probe, **context)
                    if model_probe["position"] is None:
                        continue
                    ancestor = None
                    if needs_ancestor:
                        try:
                            page.evaluate("base => pinFrontierBaseModel(base)", candidate["base"])
                            wait_for_layout_within_recovery_budget()
                            for ancestor_candidate in candidate["ancestors"]:
                                remaining_real_event_timeout_milliseconds()
                                probe = _find_canvas_pointer_position_matching_target_identity(page, ancestor_candidate)
                                record_event(event="ancestor_probe", target=ancestor_candidate, **probe, **context)
                                if probe["position"] is not None:
                                    ancestor = ancestor_candidate
                                    break
                        finally:
                            clear_hover_and_all_pinned_models()
                            wait_for_layout_within_recovery_budget()
                        if ancestor is None:
                            continue
                    # 临时 pin/unpin 会改变画布高度，候选布置清理后必须重新投影。
                    cleaned_model_probe = _find_canvas_pointer_position_matching_target_identity(page, candidate)
                    if cleaned_model_probe["position"] is None:
                        record_event(event="candidate_rejected_after_setup_cleanup", target=candidate,
                                     **cleaned_model_probe, **context)
                        continue
                    baseline = _capture_current_camera_pose(page)
                    context["camera_baseline"] = baseline
                    hover_state = send_real_pointer_event_and_verify_target_state(candidate, "real_model_hover", """target => {
                      const state=frontierThreeDimensionalVisualizationState();
                      const model=FRONTIER_3D_INTERACTION_RELATIONSHIPS.models[state.hoveredModelIndex];
                      return model?.name===target.name && model.base_model_name===target.base
                        && (model.model_uuid??null)===(target.modelUuid??null)
                        && (state.hoveredLineageKey??null)===(target.lineageKey??null)
                        && !document.querySelector('#aa-threejs-model-tooltip').hidden;
                    }""", context)
                    require(_camera_pose_is_preserved(page, baseline), "真实鼠标 hover 不改变相机姿态")
                    if needs_lineage:
                        require(hover_state["displayedLineageSegmentEndpointCount"] > 0, "真实鼠标 hover 显示谱系")
                    if needs_ancestor:
                        require(hover_state["displayedPrunedLineageAncestorMarkerCount"] > 0, "谱系显示被裁剪前身 marker")
                    pinned_state = send_real_pointer_event_and_verify_target_state(candidate, "real_model_pin", """target =>
                      frontierThreeDimensionalVisualizationState().pinnedBaseModelNames.includes(target.base)
                    """, context)
                    require(pinned_state["pinnedModelMarkerCount"] == candidate["variants"], "真实鼠标 pin 高亮覆盖全部 reasoning 档位")
                    require(_camera_pose_is_preserved(page, baseline), "真实鼠标 pin 不改变相机姿态")
                    require(page.locator("#aa-pinned-panel").is_visible(), "pin 详情卡在右栏可见")
                    page.mouse.move(0, 0)
                    page.evaluate("clearFrontierHoverState()")
                    wait_for_layout_within_recovery_budget()
                    pin_without_hover_state = page.evaluate("frontierThreeDimensionalVisualizationState()")
                    record_event(event="real_model_pin_without_hover", target=candidate,
                                 state=pin_without_hover_state, **context)
                    require(pin_without_hover_state["hoveredModelIndex"] is None
                            and pin_without_hover_state["hoveredLineageKey"] is None
                            and pin_without_hover_state["hoveredPrunedLineageAncestorName"] is None,
                            "移开鼠标后已清除模型与前身 hover")
                    require(candidate["base"] in pin_without_hover_state["pinnedBaseModelNames"],
                            "移开鼠标后保留真实点击 pin")
                    require(_camera_pose_is_preserved(page, baseline), "清除 hover 不改变相机姿态")
                    if needs_lineage:
                        require(pin_without_hover_state["displayedLineageSegmentEndpointCount"] > 0,
                                "移开鼠标后 pin 常显谱系")
                    if ancestor:
                        send_real_pointer_event_and_verify_target_state(ancestor, "real_ancestor_hover", """target => {
                          const state=frontierThreeDimensionalVisualizationState();
                          return state.hoveredPrunedLineageAncestorName===target.name
                            && state.hoveredLineageKey===target.lineageKey
                            && !document.querySelector('#aa-threejs-model-tooltip').hidden
                            && document.querySelector('#aa-threejs-model-tooltip').textContent.includes(target.name);
                        }""", context)
                        require(_camera_pose_is_preserved(page, baseline), "真实鼠标前身 hover 不改变相机姿态")
                    clear_hover_and_all_pinned_models()
                    wait_for_layout_within_recovery_budget()
                    cleaned = page.evaluate("frontierThreeDimensionalVisualizationState()")
                    require(cleaned["pinnedModelMarkerCount"] == 0, "unpin 清除全部高亮")
                    require(cleaned["displayedLineageSegmentEndpointCount"] == 0, "清除 hover 与 pin 后谱系消失")
                    record_event(event="interaction_verification_completed", target=candidate, **context)
                    return candidate
        require(not any(variant["markerCount"] for variant in capabilities)
                and not needs_lineage and not needs_ancestor, "合法交互目标存在，但所有口径和视角均无法真实拾取")
        return None
    except Exception as error:
        record_event(event="interaction_verification_failed", reason=str(error))
        raise
    finally:
        clear_hover_and_all_pinned_models()
        _activate_metric_variant(page, original_metric)
        _restore_camera_pose(page, original_camera)
        for base in original_pins:
            page.evaluate("base => pinFrontierBaseModel(base)", base)
        wait_for_frontier_layout_transitions_and_render(page)
        record_event(event="original_view_restored", metric_variant=original_metric, camera=_capture_current_camera_pose(page))


def _wait_for_two_animation_frames(page) -> None:
    page.evaluate(
        "() => new Promise(resolve => "
        "requestAnimationFrame(() => requestAnimationFrame(resolve)))"
    )


def _activate_metric_variant(page, metric_variant_key: str, timeout_ms: int = 30000) -> None:
    page.evaluate(
        "key => window.setFrontierMetricCombination(...key.split('__'))",
        metric_variant_key,
    )
    page.wait_for_function(
        "expectedKey => window.frontierThreeDimensionalVisualizationState()"
        ".activeMetricVariantKey === expectedKey",
        arg=metric_variant_key,
        timeout=timeout_ms,
    )
    _wait_for_two_animation_frames(page)


def verify_historical_intelligence_index_version_points_and_comparable_only_toggle(
    page, check
) -> None:
    """历史口径点（analysis_eligibility=false）：虚线样式、tooltip/pin 原因、开关隐藏且不可拾取。"""
    check(
        page.locator(COMPARABLE_ONLY_TOGGLE_SELECTOR).count() == 1,
        "「仅当期可比」开关位于工具栏「模型标识」组",
    )
    check(
        not page.locator(COMPARABLE_ONLY_TOGGLE_SELECTOR).is_checked(),
        "「仅当期可比」默认关闭",
    )
    for metric_variant_key in METRIC_VARIANT_KEYS:
        _activate_metric_variant(page, metric_variant_key)
        expected_historical_model_names = page.evaluate(
            """key => window.FRONTIER_3D_VISUALIZATION_DATASET.metric_variants[key]
              .three_dimensional_scene.displayed_model_markers
              .filter(model => model.analysis_eligibility
                ?.is_analysis_eligible_for_current_metric_variant === false)
              .map(model => model.name)""",
            metric_variant_key,
        )
        state = page.evaluate("() => window.frontierThreeDimensionalVisualizationState()")
        check(
            state["historicalIntelligenceIndexVersionModelMarkerCount"]
            == len(expected_historical_model_names),
            f"{metric_variant_key} 历史口径点数与契约一致（{len(expected_historical_model_names)}）",
        )
        check(
            state["visibleHistoricalIntelligenceIndexVersionModelMarkerCount"]
            == len(expected_historical_model_names),
            f"{metric_variant_key} 开关关闭时历史口径点照常显示",
        )
        check(
            state["historicalIntelligenceIndexVersionStyledModelMarkerCount"]
            == len(expected_historical_model_names)
            and state["currentIntelligenceIndexVersionStyledModelMarkerCount"]
            == state["displayedModelMarkerCount"] - len(expected_historical_model_names),
            f"{metric_variant_key} 历史口径点全部用虚线底板 + 半透明 Logo，当期点全部用实心底板 + 不透明 Logo"
            f"（历史样式 {state['historicalIntelligenceIndexVersionStyledModelMarkerCount']}，"
            f"当期样式 {state['currentIntelligenceIndexVersionStyledModelMarkerCount']}）",
        )
        historical_markers_have_null_analysis_layer_in_contract = page.evaluate(
            """() => {
              const dataset = window.FRONTIER_3D_VISUALIZATION_DATASET;
              const state = window.frontierThreeDimensionalVisualizationState();
              const models = dataset.metric_variants[state.activeMetricVariantKey]
                .three_dimensional_scene.displayed_model_markers;
              return models.every(model =>
                (model.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant
                  === false) === (model.panel?.layer === null)
                || model.analysis_eligibility === undefined);
            }"""
        )
        check(
            historical_markers_have_null_analysis_layer_in_contract,
            f"{metric_variant_key} 历史口径点在契约中不带分析层号",
        )

    _activate_metric_variant(page, "effective__effective")
    default_variant_historical_model_names = page.evaluate(
        """() => window.FRONTIER_3D_VISUALIZATION_DATASET
          .metric_variants.effective__effective.three_dimensional_scene
          .displayed_model_markers
          .filter(model => model.analysis_eligibility
            ?.is_analysis_eligible_for_current_metric_variant === false)
          .map(model => model.name)"""
    )
    if default_variant_historical_model_names:
        frontmost_historical_model = page.evaluate(
            """historicalModelNames => {
              const diagnostics = window.frontierThreeDimensionalRendererDiagnostics;
              for (const modelName of historicalModelNames) {
                const frontmost =
                  diagnostics.frontmostPointerInteractionAtProjectedModelPosition(modelName);
                if (frontmost?.frontmostModelName === modelName) {
                  return {
                    name: modelName,
                    baseModelName: frontmost.frontmostBaseModelName,
                    projectedPosition: frontmost.projectedCanvasPosition,
                  };
                }
              }
              return null;
            }""",
            default_variant_historical_model_names,
        )
        check(frontmost_historical_model is not None, "存在可直接悬停的历史口径点")
        if frontmost_historical_model:
            page.mouse.move(
                frontmost_historical_model["projectedPosition"]["clientX"],
                frontmost_historical_model["projectedPosition"]["clientY"],
            )
            page.wait_for_function(
                "() => !document.querySelector('#aa-threejs-model-tooltip').hidden"
            )
            tooltip_text = page.locator("#aa-threejs-model-tooltip").inner_text()
            check(
                "不参与" in tooltip_text and "历史口径" in tooltip_text,
                "真实鼠标悬停历史口径点时 tooltip 显示原因",
            )
            page.evaluate(
                "baseModelName => window.pinFrontierBaseModel(baseModelName)",
                frontmost_historical_model["baseModelName"],
            )
            check(
                page.locator(
                    "#aa-pinned-panel .aa-pinned-variant-card"
                    ".is-historical-intelligence-index-version "
                    ".aa-pinned-model-status"
                ).count()
                > 0,
                "pin 卡为历史口径档位显示原因",
            )
            page.evaluate(
                "baseModelName => window.unpinFrontierBaseModel(baseModelName)",
                frontmost_historical_model["baseModelName"],
            )
            # 真实点击工具栏会把指针移出画布（pointerleave 本身就会撤掉 tooltip），测不出
            # 「隐藏悬停中的点时撤掉 tooltip」；这里让指针留在该点上，经 API 切换开关。
            page.mouse.move(
                frontmost_historical_model["projectedPosition"]["clientX"],
                frontmost_historical_model["projectedPosition"]["clientY"],
            )
            page.wait_for_function(
                "() => !document.querySelector('#aa-threejs-model-tooltip').hidden"
            )
            page.evaluate(
                "() => window.setShowOnlyCurrentIntelligenceIndexVersionComparableModels(true)"
            )
            _wait_for_two_animation_frames(page)
            state_after_toggle_without_pointer_move = page.evaluate(
                "() => window.frontierThreeDimensionalVisualizationState()"
            )
            check(
                page.locator("#aa-threejs-model-tooltip").is_hidden()
                and state_after_toggle_without_pointer_move["hoveredLineageKey"] is None
                and state_after_toggle_without_pointer_move["hoveredReasoningBaseModelName"] is None,
                "指针仍停在历史口径点上时开启「仅当期可比」，tooltip 与悬停谱系一并撤掉",
            )
            page.evaluate(
                "() => window.setShowOnlyCurrentIntelligenceIndexVersionComparableModels(false)"
            )
            page.mouse.move(1, 1)
            page.evaluate("() => window.clearFrontierHoverState()")

    verify_pinned_relationship_lines_never_dangle_at_hidden_model_markers(page, check)

    page.locator(COMPARABLE_ONLY_TOGGLE_SELECTOR).check()
    page.wait_for_function(
        "() => window.frontierThreeDimensionalVisualizationState()"
        ".showOnlyCurrentIntelligenceIndexVersionComparableModels"
    )
    _wait_for_two_animation_frames(page)
    toggled_state = page.evaluate(
        "() => window.frontierThreeDimensionalVisualizationState()"
    )
    check(
        toggled_state["visibleHistoricalIntelligenceIndexVersionModelMarkerCount"] == 0,
        "开启「仅当期可比」后可见历史口径点为 0",
    )
    check(
        toggled_state["pickableHistoricalIntelligenceIndexVersionModelMarkerCount"] == 0,
        "开启「仅当期可比」后可拾取历史口径点为 0",
    )
    check(
        toggled_state["visibleModelMarkerCount"]
        == toggled_state["displayedModelMarkerCount"]
        - len(default_variant_historical_model_names),
        "开启后只隐藏历史口径点",
    )
    check(
        page.locator("#aa-threejs-model-tooltip").is_hidden(),
        "隐藏悬停中的历史口径点时撤掉 tooltip",
    )
    raycast_hits_on_hidden_historical_points = page.evaluate(
        """historicalModelNames => {
          const diagnostics = window.frontierThreeDimensionalRendererDiagnostics;
          const historicalNameSet = new Set(historicalModelNames);
          return historicalModelNames.filter(modelName => {
            const frontmost =
              diagnostics.frontmostPointerInteractionAtProjectedModelPosition(modelName);
            return frontmost && historicalNameSet.has(frontmost.frontmostModelName);
          });
        }""",
        default_variant_historical_model_names,
    )
    check(
        raycast_hits_on_hidden_historical_points == [],
        "隐藏后在历史口径点投影位置做真实射线拾取不命中任何历史口径点",
    )
    _activate_metric_variant(page, "blended__effective")
    check(
        page.evaluate(
            "() => { const state = window.frontierThreeDimensionalVisualizationState(); "
            "return state.showOnlyCurrentIntelligenceIndexVersionComparableModels && "
            "state.visibleHistoricalIntelligenceIndexVersionModelMarkerCount === 0 && "
            "state.pickableHistoricalIntelligenceIndexVersionModelMarkerCount === 0; }"
        ),
        "切换口径后「仅当期可比」保持生效",
    )
    page.locator(COMPARABLE_ONLY_TOGGLE_SELECTOR).uncheck()
    _activate_metric_variant(page, "effective__effective")
    restored_state = page.evaluate(
        "() => window.frontierThreeDimensionalVisualizationState()"
    )
    check(
        restored_state["visibleHistoricalIntelligenceIndexVersionModelMarkerCount"]
        == len(default_variant_historical_model_names),
        "关闭「仅当期可比」后历史口径点恢复显示",
    )


DANGLING_RELATIONSHIP_LINE_ENDPOINT_SUMMARY_JAVASCRIPT = """() => {
  const diagnostics = window.frontierThreeDimensionalRendererDiagnostics;
  const lineEndpoints = diagnostics.transientRelationshipLineEndpointPositions();
  const markers = diagnostics.displayedModelMarkerPositionsAndVisibility();
  const ancestorPositions = diagnostics.displayedPrunedLineageAncestorMarkerPositions();
  const positionKey = (position) => position.map((value) => value.toFixed(6)).join(',');
  const anchoredPositionKeys = new Set([
    ...markers.filter((marker) => marker.visible).map((marker) => positionKey(marker.position)),
    ...ancestorPositions.map(positionKey),
  ]);
  const hiddenMarkerPositionKeys = new Set(
    markers.filter((marker) => !marker.visible).map((marker) => positionKey(marker.position)),
  );
  const danglingEndpoints = [...lineEndpoints.lineage, ...lineEndpoints.reasoning]
    .map(positionKey)
    .filter((key) => hiddenMarkerPositionKeys.has(key) && !anchoredPositionKeys.has(key));
  return {
    lineageEndpointCount: lineEndpoints.lineage.length,
    reasoningEndpointCount: lineEndpoints.reasoning.length,
    danglingEndpointCount: danglingEndpoints.length,
  };
}"""


def verify_pinned_relationship_lines_never_dangle_at_hidden_model_markers(page, check) -> None:
    """R2-F1：开启「仅当期可比」后，pin 的推理档位/谱系连线只连可见标记，不留两端无点的悬空线。"""
    _activate_metric_variant(page, "effective__effective")
    base_model_names_by_historical_share = page.evaluate(
        """() => {
          const dataset = window.FRONTIER_3D_VISUALIZATION_DATASET.metric_variants.effective__effective;
          const markers = dataset.three_dimensional_scene.displayed_model_markers;
          const baseGroups = dataset.interaction_relationships.base_groups || {};
          const isHistorical = (index) =>
            markers[index].analysis_eligibility?.is_analysis_eligible_for_current_metric_variant === false;
          const entries = Object.entries(baseGroups).filter(([, indices]) => indices.length >= 2);
          return {
            allHistorical: entries.filter(([, indices]) => indices.every(isHistorical)).map(([name]) => name),
            mixed: entries.filter(([, indices]) =>
              indices.some(isHistorical) && !indices.every(isHistorical)).map(([name]) => name),
          };
        }"""
    )
    scenario_base_model_names = (
        base_model_names_by_historical_share["allHistorical"][:3]
        + base_model_names_by_historical_share["mixed"][:3]
    )
    if not scenario_base_model_names:
        print("  · 默认口径没有含历史口径档位的多档位基模型，跳过悬空连线检查")
        return
    for base_model_name in scenario_base_model_names:
        page.evaluate("name => window.pinFrontierBaseModel(name)", base_model_name)
    _wait_for_two_animation_frames(page)
    before_toggle_summary = page.evaluate(DANGLING_RELATIONSHIP_LINE_ENDPOINT_SUMMARY_JAVASCRIPT)
    check(
        before_toggle_summary["reasoningEndpointCount"] > 0,
        f"pin {len(scenario_base_model_names)} 个含历史口径档位的基模型后画出推理档位连线"
        f"（端点 {before_toggle_summary['reasoningEndpointCount']}）",
    )
    page.evaluate("() => window.setShowOnlyCurrentIntelligenceIndexVersionComparableModels(true)")
    _wait_for_two_animation_frames(page)
    after_toggle_summary = page.evaluate(DANGLING_RELATIONSHIP_LINE_ENDPOINT_SUMMARY_JAVASCRIPT)
    check(
        after_toggle_summary["danglingEndpointCount"] == 0,
        "开启「仅当期可比」后推理档位/谱系连线不再连到被隐藏的标记"
        f"（悬空端点 {after_toggle_summary['danglingEndpointCount']}，"
        f"推理端点 {before_toggle_summary['reasoningEndpointCount']}→{after_toggle_summary['reasoningEndpointCount']}，"
        f"谱系端点 {before_toggle_summary['lineageEndpointCount']}→{after_toggle_summary['lineageEndpointCount']}）",
    )
    if base_model_names_by_historical_share["allHistorical"]:
        page.locator("#aa-search-input").fill(base_model_names_by_historical_share["allHistorical"][0])
        hidden_result_row = page.locator(
            "#aa-search-results .aa-result-row",
            has_text=base_model_names_by_historical_share["allHistorical"][0],
        ).first
        check(
            "is-hidden-by-comparable-only-toggle" in (hidden_result_row.get_attribute("class") or ""),
            "搜索结果把全部档位都被「仅当期可比」隐藏的基模型标为已隐藏",
        )
        page.locator("#aa-search-input").fill("")
    page.evaluate("() => window.setShowOnlyCurrentIntelligenceIndexVersionComparableModels(false)")
    _wait_for_two_animation_frames(page)
    restored_summary = page.evaluate(DANGLING_RELATIONSHIP_LINE_ENDPOINT_SUMMARY_JAVASCRIPT)
    check(
        restored_summary["reasoningEndpointCount"] == before_toggle_summary["reasoningEndpointCount"],
        "关闭「仅当期可比」后 pin 的推理档位连线随即恢复（开关会触发连线重绘）",
    )
    for base_model_name in scenario_base_model_names:
        page.evaluate("name => window.unpinFrontierBaseModel(name)", base_model_name)


def verify_pareto_frontier_surface_mesh_renders_with_finite_integer_indices(
    page, check
) -> None:
    """P0-4 回归：实心面网格非空时，切到实心面必须新增三角形，且契约/几何索引全为有限整数。"""
    for metric_variant_key in METRIC_VARIANT_KEYS:
        _activate_metric_variant(page, metric_variant_key)
        contract_mesh_summary = page.evaluate(
            """key => {
              const mesh = window.FRONTIER_3D_VISUALIZATION_DATASET.metric_variants[key]
                .three_dimensional_scene.pareto_frontier_surface_triangle_mesh || {};
              const coordinateFields = ['x_coordinates', 'y_coordinates', 'z_coordinates'];
              const indexFields = ['triangle_vertex_index_a', 'triangle_vertex_index_b',
                'triangle_vertex_index_c'];
              const fields = [...coordinateFields, ...indexFields];
              const isNonEmpty = fields.some(field =>
                mesh[field] !== undefined && (!Array.isArray(mesh[field]) || mesh[field].length > 0));
              const arraysAreArrays = fields.every(field => Array.isArray(mesh[field]));
              const vertexCount = arraysAreArrays ? mesh.x_coordinates.length : 0;
              return {
                isNonEmpty,
                vertexCount,
                triangleCount: arraysAreArrays ? mesh.triangle_vertex_index_a.length : 0,
                coordinatesAreFinite: arraysAreArrays && coordinateFields.every(field =>
                  mesh[field].length === vertexCount &&
                  mesh[field].every(value => typeof value === 'number' && Number.isFinite(value))),
                indicesAreFiniteIntegersWithinRange: arraysAreArrays && indexFields.every(field =>
                  mesh[field].length === mesh.triangle_vertex_index_a.length &&
                  mesh[field].every(value =>
                    Number.isInteger(value) && value >= 0 && value < vertexCount)),
              };
            }""",
            metric_variant_key,
        )
        state = page.evaluate("() => window.frontierThreeDimensionalVisualizationState()")
        check(
            state["nonFiniteContractCoordinateCount"] == 0
            and state["outOfRangeContractTriangleVertexIndexCount"] == 0
            and state["skippedInvalidContractGeometryNames"] == [],
            f"{metric_variant_key} 契约几何无非有限坐标/越界索引"
            f"（nonFinite={state['nonFiniteContractCoordinateCount']}，"
            f"跳过={state['skippedInvalidContractGeometryNames']}）",
        )
        if not contract_mesh_summary["isNonEmpty"]:
            print(f"  · {metric_variant_key} 实心面为合法空网格，跳过三角形增量断言")
            continue
        check(
            contract_mesh_summary["coordinatesAreFinite"]
            and contract_mesh_summary["indicesAreFiniteIntegersWithinRange"]
            and contract_mesh_summary["triangleCount"] > 0,
            f"{metric_variant_key} 契约实心面坐标有限、索引为 [0,n) 内整数"
            f"（{contract_mesh_summary['triangleCount']} 个三角形）",
        )
        page.evaluate("() => window.setParetoFrontierVisualizationStyle('wireframe')")
        _wait_for_two_animation_frames(page)
        wireframe_triangle_count = page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".renderedTriangleCountInLatestFrame"
        )
        page.evaluate("() => window.setParetoFrontierVisualizationStyle('solid')")
        _wait_for_two_animation_frames(page)
        solid_triangle_count = page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".renderedTriangleCountInLatestFrame"
        )
        surface_geometry_summary = page.evaluate(
            "() => window.frontierThreeDimensionalRendererDiagnostics"
            ".paretoFrontierSurfaceGeometrySummary()"
        )
        check(
            solid_triangle_count > wireframe_triangle_count,
            f"{metric_variant_key} 切到实心面后渲染三角形数增加"
            f"（{wireframe_triangle_count} → {solid_triangle_count}）",
        )
        check(
            surface_geometry_summary["visible"]
            and surface_geometry_summary["triangleCount"]
            == contract_mesh_summary["triangleCount"]
            and surface_geometry_summary[
                "allTriangleVertexIndicesAreFiniteIntegersWithinVertexRange"
            ]
            and surface_geometry_summary["allVertexPositionsAreFinite"],
            f"{metric_variant_key} 实心面几何三角形数与契约一致且索引全为有限整数",
        )
    page.evaluate("() => window.setParetoFrontierVisualizationStyle('wireframe')")
    _activate_metric_variant(page, "effective__effective")


def _verify_report_interactions(page, browser_runtime_observation, check, record_event, html_path):
    page.goto(html_path.as_uri())
    page.wait_for_function(
        "() => window.frontierThreeDimensionalVisualizationState && "
        "window.frontierThreeDimensionalVisualizationState().interactiveRenderer === 'threejs'",
        timeout=30000,
    )

    print("\n[1] three.js 注入与模型身份层")
    initial_state = page.evaluate(
        "() => window.frontierThreeDimensionalVisualizationState()"
    )
    page.wait_for_function(
        "() => { const state = "
        "window.frontierThreeDimensionalVisualizationState(); "
        "return state.loadedOrganizationLogoCanvasTextureCount === "
        "state.organizationCount; }"
    )
    initial_state = page.evaluate(
        "() => window.frontierThreeDimensionalVisualizationState()"
    )
    check(initial_state["interactiveRenderer"] == "threejs", "交互渲染器 = three.js")
    check(initial_state["displayedModelMarkerCount"] == page.evaluate(
        "key => FRONTIER_3D_VISUALIZATION_DATASET.metric_variants[key]"
        ".three_dimensional_scene.displayed_model_markers.length",
        initial_state["activeMetricVariantKey"],
    ), "初始显示模型数与契约一致（允许合法空口径）")
    check(
        initial_state["organizationLogoMarkerCount"]
        == initial_state["displayedModelMarkerCount"],
        "每个显示模型都有厂商 Logo marker",
    )
    check(
        initial_state["cameraFacingOrganizationLogoMarkerCount"]
        == initial_state["organizationLogoMarkerCount"],
        "全部厂商 Logo marker 均为 camera-facing Sprite",
    )
    check(
        initial_state["depthTestedOrganizationLogoMarkerCount"]
        == initial_state["organizationLogoMarkerCount"],
        "全部厂商 Logo marker 均参与深度测试",
    )
    check(
        initial_state["depthWritingOrganizationLogoBackplateCount"]
        == initial_state["organizationLogoMarkerCount"],
        "全部厂商 Logo 底板均写入深度缓冲",
    )
    # D-5 已确认着色透出，验证曲面不写深度；实心面/可达面是合法空网格（Pareto<4 或共线）时对象不创建、值为 null
    initial_contract_surface_triangle_counts = page.evaluate(
        """() => {
          const state = window.frontierThreeDimensionalVisualizationState();
          const scene = window.FRONTIER_3D_VISUALIZATION_DATASET
            .metric_variants[state.activeMetricVariantKey].three_dimensional_scene;
          const triangleCount = (mesh) => (mesh?.triangle_vertex_index_a || []).length;
          return {
            pareto: triangleCount(scene.pareto_frontier_surface_triangle_mesh),
            achievable: triangleCount(scene.achievable_frontier_surface_triangle_mesh),
          };
        }"""
    )
    for surface_name, state_key in (
        ("pareto", "paretoFrontierSurfaceWritesDepth"),
        ("achievable", "achievableFrontierSurfaceWritesDepth"),
    ):
        if initial_contract_surface_triangle_counts[surface_name] > 0:
            check(initial_state[state_key] is False, f"{surface_name} 前沿曲面不写入深度缓冲")
        else:
            print(f"  · {surface_name} 前沿曲面为合法空网格，跳过 depthWrite 断言")
            check(initial_state[state_key] is None, f"{surface_name} 合法空网格不创建曲面对象")
    check(
        initial_state["failedOrganizationLogoCanvasTextureCount"] == 0,
        "当前视图全部厂商 Logo 已解码为 CanvasTexture",
    )
    check(page.locator("canvas[data-frontier-threejs-canvas]").count() == 1, "three.js canvas 唯一")
    check(page.evaluate("() => typeof window.Plotly") == "undefined", "交互 HTML 不加载 Plotly")
    check(page.locator("#aa-model-identity-controls").count() == 1, "顶部存在模型标识组")
    check(page.locator("#aa-organization-filter-panel").count() == 1, "右栏存在厂商 Logo 筛选器")
    filter_rows = page.locator(".aa-organization-filter-row").count()
    check(filter_rows == initial_state["organizationCount"], "厂商筛选行数等于当前厂商数")
    check(
        page.locator(".aa-organization-logo-preview").count() == filter_rows,
        "每个厂商筛选行都显示 Logo",
    )

    print("\n[2] 国别外框：默认关闭、颜色+形状图例、可独立开关")
    check(initial_state["countryRegionMarkerVisible"] is False, "国别外框默认关闭")
    check(initial_state["countryRegionMarkerCount"] == 0, "默认不绘制国别外框")
    page.locator("#aa-country-region-marker-toggle").check()
    page.wait_for_function(
        "() => window.frontierThreeDimensionalVisualizationState()"
        ".countryRegionMarkerVisible"
    )
    country_state = page.evaluate(
        "() => window.frontierThreeDimensionalVisualizationState()"
    )
    check(
        country_state["countryRegionMarkerCount"]
        == country_state["displayedModelMarkerCount"],
        "开启后每个显示模型都有国别外框",
    )
    check(page.locator("#aa-country-region-legend").is_visible(), "开启时国别图例可见")
    legend_text = page.locator("#aa-country-region-legend").inner_text()
    check(all(label in legend_text for label in ("中国", "美国", "其他")), "图例覆盖三类地区")
    page.locator("#aa-country-region-marker-toggle").uncheck()
    check(
        page.evaluate(
            "() => !window.frontierThreeDimensionalVisualizationState()"
            ".countryRegionMarkerVisible"
        ),
        "国别外框可关闭",
    )

    print("\n[3] 四种坐标轴组合与相机保持")
    expected_variants = [
        ("effective", "effective", "cost_to_run", "eff_speed"),
        ("effective", "raw", "cost_to_run", "output_speed"),
        (
            "blended",
            "effective",
            "blended_price_cache_input_output_7_to_2_to_1",
            "eff_speed",
        ),
        (
            "blended",
            "raw",
            "blended_price_cache_input_output_7_to_2_to_1",
            "output_speed",
        ),
    ]
    camera_before_metric_switch = initial_state["cameraPosition"]
    for cost_metric, speed_metric, expected_cost_field, expected_speed_field in expected_variants:
        page.evaluate(
            "([costMetric, speedMetric]) => "
            "window.setFrontierMetricCombination(costMetric, speedMetric)",
            [cost_metric, speed_metric],
        )
        page.wait_for_function(
            "expectedKey => window.frontierThreeDimensionalVisualizationState()"
            ".activeMetricVariantKey === expectedKey",
            arg=f"{cost_metric}__{speed_metric}",
        )
        state = page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
        )
        active_metric_variant_key = state["activeMetricVariantKey"]
        check(state["costAxisField"] == expected_cost_field, f"{active_metric_variant_key} 成本字段正确")
        check(state["speedAxisField"] == expected_speed_field, f"{active_metric_variant_key} 速度字段正确")
        check(state["displayedModelMarkerCount"] == page.evaluate(
            "key => FRONTIER_3D_VISUALIZATION_DATASET.metric_variants[key]"
            ".three_dimensional_scene.displayed_model_markers.length", active_metric_variant_key,
        ), f"{active_metric_variant_key} 显示模型数与契约一致（允许零模型）")
        check(
            _camera_distance(camera_before_metric_switch, state["cameraPosition"]) < 1e-8,
            f"{active_metric_variant_key} 切换后保留相机",
        )
    _activate_metric_variant(page, initial_state["activeMetricVariantKey"])

    print("\n[4] 真实拖拽旋转后，hover / pin / 切指标不重置相机")
    canvas = page.locator("canvas[data-frontier-threejs-canvas]")
    canvas_box = canvas.bounding_box()
    assert canvas_box is not None
    camera_before_drag = page.evaluate(
        "() => window.frontierThreeDimensionalVisualizationState().cameraPosition"
    )
    drag_start_x = canvas_box["x"] + canvas_box["width"] * 0.55
    drag_start_y = canvas_box["y"] + canvas_box["height"] * 0.45
    page.mouse.move(drag_start_x, drag_start_y)
    page.mouse.down()
    page.mouse.move(drag_start_x + 150, drag_start_y + 75, steps=10)
    page.mouse.up()
    camera_after_drag = page.evaluate(
        "() => window.frontierThreeDimensionalVisualizationState().cameraPosition"
    )
    check(_camera_distance(camera_before_drag, camera_after_drag) > 0.05, "真实拖拽改变相机")

    verify_model_lineage_interactions(page, check, record_event=record_event)

    print("\n[5] 搜索、厂商过滤、前沿外观")
    original_search_and_filter_metric_variant_key = page.evaluate("frontierThreeDimensionalVisualizationState().activeMetricVariantKey")
    nonempty_search_and_filter_metric_variant_key = page.evaluate("""keys => keys.find(key =>
      FRONTIER_3D_VISUALIZATION_DATASET.metric_variants[key]
        .three_dimensional_scene.displayed_model_markers.length > 0) ?? null
    """, [original_search_and_filter_metric_variant_key, *[
        key for key in METRIC_VARIANT_KEYS if key != original_search_and_filter_metric_variant_key
    ]])
    try:
        if nonempty_search_and_filter_metric_variant_key is not None:
            _activate_metric_variant(page, nonempty_search_and_filter_metric_variant_key)
            search_token = page.evaluate("FRONTIER_3D_INTERACTION_RELATIONSHIPS.models[0].base_model_name").split()[0]
            page.locator("#aa-search-input").fill(search_token)
            page.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
            check(page.locator("#aa-search-results .aa-result-row").count() > 0, "搜索返回基模型")
            page.locator("#aa-organization-filter-panel").evaluate("element => element.open = true")
            first_organization_checkbox = page.locator(
                ".aa-organization-filter-row input[type=checkbox]"
            ).first
            first_organization_checkbox.uncheck()
            filtered_state = page.evaluate(
                "() => window.frontierThreeDimensionalVisualizationState()"
            )
            check(
                filtered_state["visibleOrganizationCount"]
                == filtered_state["organizationCount"] - 1,
                "厂商 checkbox 隐藏一个厂商",
            )
            first_organization_checkbox.check()
            check(
                page.evaluate(
                    "() => window.frontierThreeDimensionalVisualizationState()"
                    ".visibleOrganizationCount === "
                    "window.frontierThreeDimensionalVisualizationState().organizationCount"
                ),
                "厂商 checkbox 可恢复",
            )
            page.locator("#aa-search-input").fill("")
            record_event(event="search_and_organization_filters_verified", metric_variant=nonempty_search_and_filter_metric_variant_key)
        else:
            print("  · 四个口径的契约均无模型，搜索和厂商过滤不适用")
    finally:
        _activate_metric_variant(page, original_search_and_filter_metric_variant_key)

    page.evaluate(
        "() => window.setParetoFrontierVisualizationStyle('solid')"
    )
    check(
        page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".frontierStyle === 'solid'"
        ),
        "切换实心前沿",
    )
    page.evaluate(
        "() => window.setParetoFrontierVisualizationStyle('hidden')"
    )
    check(
        page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".frontierStyle === 'hidden'"
        ),
        "隐藏前沿",
    )
    page.evaluate("() => window.setAchievableFrontierSurfaceVisibility(true)")
    state_with_surface = page.evaluate(
        "() => window.frontierThreeDimensionalVisualizationState()"
    )
    check(
        state_with_surface["achievableFrontierSurfaceVisible"] is True,
        "可达前沿曲面独立开启",
    )
    check(state_with_surface["frontierStyle"] == "hidden", "可达曲面不改变主前沿状态")
    page.evaluate("() => window.setAchievableFrontierSurfaceVisibility(false)")
    page.evaluate(
        "() => window.setParetoFrontierVisualizationStyle('wireframe')"
    )

    print("\n[6] 突出度排名与权重")
    default_ranking = page.evaluate("() => window.frontierStandoutRanking()")
    check(
        default_ranking["selectedFrontierStandoutMetricName"]
        == "trend_residual",
        "默认突出度 = 趋势残差",
    )
    check(page.locator("#aa-standout-weight-controls").is_hidden(), "非加权口径隐藏权重控件")
    check(
        len(default_ranking["ranking"])
        == page.evaluate("frontierThreeDimensionalVisualizationState().paretoFrontierModelCount"),
        "排行覆盖全部前沿模型",
    )
    page.evaluate(
        "() => window.selectFrontierStandoutMetric('weighted_exclusive_hypervolume')"
    )
    check(page.locator("#aa-standout-weight-controls").is_visible(), "加权超体积显示权重控件")
    weighted_ranking_before = page.evaluate(
        "() => window.frontierStandoutRanking()"
    )
    page.evaluate("() => window.setFrontierStandoutAxisWeights(4, 1, 1)")
    weighted_ranking_after = page.evaluate(
        "() => window.frontierStandoutRanking()"
    )
    check(
        weighted_ranking_after["frontierStandoutAxisWeights"][
            "intelligence"
        ]
        == 4,
        "智能权重更新为 4",
    )
    # 默认口径的分析 Pareto 少于 2 个时（例：API 升 family、目录分区被拒，有效速度口径全是历史口径点），
    # 排行最多 1 行，权重无从重排；这是合法的数据状态（页头另有告警），不是交互缺陷
    frontier_model_count_for_weighted_ranking = len(weighted_ranking_before["ranking"])
    if frontier_model_count_for_weighted_ranking < 2:
        print(
            f"  - 跳过「权重变化会重排前沿模型」：当前口径前沿模型 {frontier_model_count_for_weighted_ranking} 个，无从重排"
        )
    check(
        frontier_model_count_for_weighted_ranking < 2
        or [row["name"] for row in weighted_ranking_before["ranking"]]
        != [row["name"] for row in weighted_ranking_after["ranking"]],
        "权重变化会重排前沿模型",
    )
    check(
        _camera_distance(
            camera_after_drag,
            page.evaluate(
                "() => window.frontierThreeDimensionalVisualizationState()"
                ".cameraPosition"
            ),
        )
        < 1e-8,
        "突出度与权重操作不重置相机",
    )

    print("\n[8] 历史口径点样式、原因文案与「仅当期可比」开关（W1-6）")
    verify_historical_intelligence_index_version_points_and_comparable_only_toggle(
        page, check
    )

    print("\n[9] 实心面网格与契约数值（W1-10 阻断断言）")
    verify_pareto_frontier_surface_mesh_renders_with_finite_integer_indices(
        page, check
    )

    print("\n[7] 侧栏、自包含与运行时健康")
    page.locator("#aa-side-panel-toggle").click()
    check(
        page.evaluate(
            "() => !window.frontierThreeDimensionalVisualizationState()"
            ".sidePanelExpanded"
        ),
        "右栏可收起",
    )
    page.locator("#aa-side-panel-toggle").click()
    check(
        page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".sidePanelExpanded"
        ),
        "右栏可展开",
    )
    check(
        browser_runtime_observation.external_network_request_urls == [],
        "自包含 HTML 无外部网络请求",
    )
    check(
        browser_runtime_observation.page_runtime_errors == [],
        "无 JS 运行时错误"
        f"（{browser_runtime_observation.page_runtime_errors}）",
    )


def main() -> int:
    assert HTML_PATH.exists(), f"找不到 HTML: {HTML_PATH}"
    evidence = FrontierInteractionVerificationEvidenceJournal(HTML_PATH)
    print(f"交互验证证据：{evidence.journal_path}（run_id={evidence.run_id}）")
    failures: list[str] = []

    def check(condition: bool, message: str) -> None:
        print(("  ✓ " if condition else "  ✗ ") + message)
        evidence.record(event="assertion", passed=bool(condition), message=message)
        if not condition:
            failures.append(message)

    with sync_playwright() as playwright:
        for context_attempt in range(2):
            browser = None
            page = None
            try:
                browser = launch_requested_frontier_3d_test_browser(playwright)
                evidence.record(event="browser_context_started", context_attempt=context_attempt,
                                browser_version=browser.version)
                page, observation = create_frontier_3d_test_page_with_runtime_observation(browser)
                _verify_report_interactions(page, observation, check, evidence.record, HTML_PATH)
            except Exception as error:
                evidence.record(event="browser_context_failed", context_attempt=context_attempt,
                                reason=str(error), traceback=traceback.format_exc())
                disconnected = browser is not None and (not browser.is_connected() or (page is not None and page.is_closed()))
                verification_exception_chain = []
                chained_verification_error = error
                while chained_verification_error is not None and chained_verification_error not in verification_exception_chain:
                    verification_exception_chain.append(chained_verification_error)
                    chained_verification_error = chained_verification_error.__cause__ or chained_verification_error.__context__
                is_recoverable_browser_context_interruption = isinstance(error, PlaywrightError) and not any(
                    isinstance(chained_verification_error, (AssertionError, PlaywrightTimeoutError))
                    for chained_verification_error in verification_exception_chain
                )
                if context_attempt == 0 and disconnected and is_recoverable_browser_context_interruption and not failures:
                    evidence.record(event="fresh_browser_context_replay", previous_failures=failures)
                    continue
                traceback.print_exc()
                evidence.record(event="run_failed", reason=str(error), failures=failures)
                return 1
            finally:
                if browser is not None and browser.is_connected():
                    browser.close()
            break
    evidence.record(event="run_failed" if failures else "run_completed", failures=failures)
    if failures:
        print(f"\n❌ {len(failures)} 项失败")
        return 1
    print("\n✅ 全部通过")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
