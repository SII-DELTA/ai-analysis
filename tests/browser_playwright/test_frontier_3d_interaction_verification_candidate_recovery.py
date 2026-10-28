"""验证器必须经真实事件完成拾取，遮挡恢复不能掩盖交互回归。"""
import copy
from contextlib import nullcontext
import json
import math

import pytest

from src.frontier_3d_self_contained_html_renderer import write_frontier_3d_self_contained_html_report
from src.frontier_3d_visualization_dataset_builder import (
    build_frontier_3d_visualization_dataset,
    expand_frontier_3d_visualization_dataset_for_scene_consumers,
    validate_frontier_3d_visualization_dataset,
)
from src.frontier_3d_versioned_model_reference_contract import adapt_frontier_3d_visualization_dataset_to_v3
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe

from tests.browser_playwright import frontier_3d_hover_pin_filter_interaction_validation as validation
from tests.browser_playwright.frontier_3d_playwright_verification_support import wait_for_frontier_layout_transitions_and_render


def require_success(condition, message):
    assert condition, message


def arrange_overlapping_lineage_model(page, *, completely_occluded=False):
    """仅布置坐标与视角；验收事件由待测验证器发送。"""
    page.evaluate("""async completelyOccluded => {
      const variant=FRONTIER_3D_VISUALIZATION_DATASET.metric_variants.effective__effective;
      const scene=variant.three_dimensional_scene;
      const axes=scene.three_dimensional_axis_configuration;
      const value=(axis,coordinate)=>{
        const result=axis.fixed_range[0]+(coordinate+1)/2*(axis.fixed_range[1]-axis.fixed_range[0]);
        return axis.scale_type==='log'?10**result:result;
      };
      const setPosition=(model,x,y,z)=>Object.assign(model,{
        x:value(axes.x_axis,x),y:value(axes.y_axis,y),z:value(axes.z_axis,z),
      });
      scene.displayed_model_markers.forEach(model=>setPosition(model,100,0,0));
      const target=scene.displayed_model_markers.find(model=>model.name==='Gemini 3 Pro');
      const occluder=scene.displayed_model_markers.find(model=>model.name==='Qwen4 Max (high)');
      setPosition(target,0,0.4,0);
      setPosition(occluder,completelyOccluded?0:0.025,-0.4,0);
      const lineage=variant.interaction_relationships.lineages[target.lineage_key];
      lineage.forEach((node,index)=>setPosition(node,node.kept?0:-0.5-index*.2,0.4,0));
      await setFrontierMetricCombination('blended','raw');
      await setFrontierMetricCombination('effective','effective');
      const diagnostics=frontierThreeDimensionalRendererDiagnostics;
      diagnostics.camera.position.set(0,-5,0);
      diagnostics.controls.target.set(0,0,0);
      diagnostics.controls.update();diagnostics.requestRender();
    }""", completely_occluded)
    wait_for_frontier_layout_transitions_and_render(page)


def test_center_occlusion_uses_exposed_edge_for_real_hover_and_pin(frontier_page):
    page = frontier_page
    arrange_overlapping_lineage_model(page)
    assert page.evaluate("""frontierThreeDimensionalRendererDiagnostics
      .frontmostPointerInteractionAtProjectedModelPosition('Gemini 3 Pro').frontmostModelName""") != "Gemini 3 Pro"
    events = []
    result = validation.verify_model_lineage_interactions(page, require_success, record_event=lambda **event: events.append(event))
    assert result["name"] == "Gemini 3 Pro"
    assert {event["event"] for event in events} >= {"real_model_hover", "real_model_pin", "real_ancestor_hover"}
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedBaseModelNames") == []


def test_occluded_current_view_recovers_with_bounded_camera_rotation(frontier_page):
    page = frontier_page
    arrange_overlapping_lineage_model(page, completely_occluded=True)
    original_position = page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition")
    events = []
    result = validation.verify_model_lineage_interactions(page, require_success, record_event=lambda **event: events.append(event))
    assert result["name"] == "Gemini 3 Pro"
    assert any(event.get("view_degrees") in [-90, 90, 180] for event in events if event["event"] == "real_model_hover")
    assert page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition") == pytest.approx(original_position)


def test_stable_real_event_block_does_not_try_another_candidate(frontier_page):
    page = frontier_page
    arrange_overlapping_lineage_model(page)
    page.evaluate("""() => {
      const canvas=frontierThreeDimensionalRendererDiagnostics.renderer.domElement;
      canvas.addEventListener('pointermove',event=>event.stopImmediatePropagation(),true);
    }""")
    events = []
    with pytest.raises(AssertionError, match="真实事件"):
        validation.verify_model_lineage_interactions(page, require_success, record_event=lambda **event: events.append(event))
    assert len([event for event in events if event["event"] == "candidate_probe"]) == 1
    assert not any(event["event"] == "real_model_hover" for event in events)


def test_unpickable_first_candidate_does_not_hide_next_legal_target(frontier_page):
    page = frontier_page
    arrange_overlapping_lineage_model(page)
    page.evaluate("""async () => {
      const models=FRONTIER_3D_VISUALIZATION_DATASET.metric_variants.effective__effective
        .three_dimensional_scene.displayed_model_markers;
      const target=models.find(model=>model.name==='Gemini 3 Pro');
      const first=models.find(model=>model.name==='Qwen4 Max (high)');
      first.lineage_key=target.lineage_key;first.x=1e9;
      await setFrontierMetricCombination('blended','raw');
      await setFrontierMetricCombination('effective','effective');
    }""")
    events = []
    result = validation.verify_model_lineage_interactions(page, require_success, record_event=lambda **event: events.append(event))
    probes = [event for event in events if event["event"] == "candidate_probe"]
    assert probes[0]["target"]["name"] == "Qwen4 Max (high)"
    assert probes[0]["position"] is None
    assert result["name"] == "Gemini 3 Pro"
    assert probes[1]["target"]["name"] == result["name"]


def test_all_candidates_blocked_fail_instead_of_becoming_not_applicable(frontier_page):
    page = frontier_page
    page.evaluate("""() => {
      const overlay=document.createElement('div');
      overlay.style.cssText='position:fixed;inset:0;z-index:99999';document.body.append(overlay);
    }""")
    events = []
    with pytest.raises(AssertionError, match="合法交互目标存在"):
        validation.verify_model_lineage_interactions(page, require_success, record_event=lambda **event: events.append(event))
    probes = [event for event in events if event["event"] == "candidate_probe"]
    identities = [(event["metric_variant"], event["view_degrees"], event["target"]["name"]) for event in probes]
    assert len(identities) == len(set(identities)) == 16
    assert {event["view_degrees"] for event in probes} == {0, -90, 90, 180}
    assert not any(event["event"] == "capability_not_applicable" for event in events)
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedBaseModelNames") == []


def test_real_click_block_is_a_regression_after_successful_hover(frontier_page, monkeypatch):
    page = frontier_page
    arrange_overlapping_lineage_model(page)
    monkeypatch.setattr(validation, "REAL_EVENT_ASSERTION_TIMEOUT_MILLISECONDS", 300)
    page.evaluate("""() => {
      frontierThreeDimensionalRendererDiagnostics.renderer.domElement.addEventListener(
        'click',event=>event.stopImmediatePropagation(),true);
    }""")
    events = []
    with pytest.raises(AssertionError, match="真实事件 real_model_pin"):
        validation.verify_model_lineage_interactions(page, require_success, record_event=lambda **event: events.append(event))
    assert len([event for event in events if event["event"] == "candidate_probe"]) == 1
    assert any(event["event"] == "real_model_hover" for event in events)
    assert not any(event["event"] == "real_model_pin" for event in events)


def test_changed_layout_reprojects_once_then_retries_real_event(frontier_page, monkeypatch):
    page = frontier_page
    arrange_overlapping_lineage_model(page)
    monkeypatch.setattr(validation, "REAL_EVENT_ASSERTION_TIMEOUT_MILLISECONDS", 500)
    page.evaluate("""() => {
      const canvas=frontierThreeDimensionalRendererDiagnostics.renderer.domElement;
      canvas.addEventListener('pointermove',event=>{
        event.stopImmediatePropagation();canvas.parentElement.style.maxWidth='640px';
      },{capture:true,once:true});
    }""")
    events = []
    validation.verify_model_lineage_interactions(page, require_success, record_event=lambda **event: events.append(event))
    failed_events = [event for event in events if event["event"] == "real_event_failed"]
    assert len(failed_events) == 1
    assert failed_events[0]["layout_changed"]
    assert any(event["event"] == "real_model_hover" for event in events)


def test_repeated_layout_changes_do_not_create_unbounded_event_retries(frontier_page, monkeypatch):
    page = frontier_page
    arrange_overlapping_lineage_model(page)
    monkeypatch.setattr(validation, "REAL_EVENT_ASSERTION_TIMEOUT_MILLISECONDS", 300)
    page.evaluate("""() => {
      const canvas=frontierThreeDimensionalRendererDiagnostics.renderer.domElement;
      let width=640;
      canvas.addEventListener('pointermove',event=>{
        event.stopImmediatePropagation();width-=30;canvas.parentElement.style.maxWidth=width+'px';
      },{capture:true});
    }""")
    events = []
    with pytest.raises(AssertionError, match="真实事件"):
        validation.verify_model_lineage_interactions(page, require_success, record_event=lambda **event: events.append(event))
    failed_events = [event for event in events if event["event"] == "real_event_failed"]
    assert len(failed_events) == 2
    assert [event["layout_attempt"] for event in failed_events] == [0, 1]


def test_recovery_deadline_fails_and_restores_camera_and_metric(frontier_page, monkeypatch):
    page = frontier_page
    pose = validation._capture_current_camera_pose(page)
    monkeypatch.setattr(validation, "INTERACTION_RECOVERY_BUDGET_SECONDS", .001)
    with pytest.raises(AssertionError, match="总预算"):
        validation.verify_model_lineage_interactions(page, require_success)
    assert validation._camera_pose_is_preserved(page, pose)
    assert page.evaluate("frontierThreeDimensionalVisualizationState().activeMetricVariantKey") == "effective__effective"


def build_frontier_report_with_requested_interaction_capabilities(report_path, scenario, contract_version):
    models = build_frontier_3d_synthetic_fixture_models_dataframe()
    parameters = dict(since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log")
    if scenario == "no_lineage":
        models = models[~models["name"].str.startswith("Gemini")]
    elif scenario == "all_nodes_kept":
        parameters.update(since_months=120, max_layers=100, hard_age_cutoff_months=120)
    elif scenario in ("empty_default_metric", "all_empty"):
        models["eff_speed"] = math.nan
        models["output_token_count_value_intelligence_index_version"] = "4.4"
    dataset = build_frontier_3d_visualization_dataset(models, **parameters)
    if scenario == "all_empty" or contract_version == "v2":
        dataset = expand_frontier_3d_visualization_dataset_for_scene_consumers(dataset)
    if scenario == "all_empty":
        for key in validation.METRIC_VARIANT_KEYS:
            cost, speed = key.split("__")
            empty_variant = copy.deepcopy(dataset["metric_variants"][f"{cost}__effective"])
            if speed == "raw":
                empty_variant["interaction_relationships"]["speed_axis_field"] = "output_speed"
            dataset["metric_variants"][key] = empty_variant
        if contract_version == "v3":
            dataset = adapt_frontier_3d_visualization_dataset_to_v3(dataset)
    if contract_version == "v2":
        for variant in dataset["metric_variants"].values():
            for model in variant["three_dimensional_scene"]["displayed_model_markers"]:
                model.pop("model_uuid", None)
            for nodes in variant["interaction_relationships"]["lineages"].values():
                for node in nodes:
                    node.pop("model_uuid", None)
            for model in variant["excluded_models_with_drop_reason"]:
                model.pop("model_uuid", None)
    assert dataset["schema_version"].endswith(f"/{contract_version}")
    validate_frontier_3d_visualization_dataset(dataset)
    write_frontier_3d_self_contained_html_report(dataset, report_path)


@pytest.mark.parametrize("contract_version", ["v2", "v3"])
@pytest.mark.parametrize("scenario", ["normal", "no_lineage", "all_nodes_kept", "empty_default_metric", "all_empty"])
def test_contract_capabilities_define_applicability_and_preserve_other_checks(
    frontier_page, tmp_path, scenario, contract_version,
):
    page = frontier_page
    path = tmp_path / f"{scenario}-{contract_version}.html"
    build_frontier_report_with_requested_interaction_capabilities(path, scenario, contract_version)
    page.goto(path.as_uri())
    page.wait_for_function("typeof frontierThreeDimensionalVisualizationState==='function'")
    events = []
    # 完整旧 CLI 的阶段函数也需接受合法空口径，保留其余 DOM、相机与渲染断言。
    from tests.browser_playwright.frontier_3d_playwright_verification_support import BrowserRuntimeObservation
    validation._verify_report_interactions(page, BrowserRuntimeObservation(), require_success,
                                           lambda **event: events.append(event), path)
    actual_events = {event["event"] for event in events}
    absent_capabilities = {event["capability"] for event in events if event["event"] == "capability_not_applicable"}
    if scenario == "all_empty":
        assert absent_capabilities == {"displayed_model", "lineage", "pruned_ancestor"}
        assert "real_model_hover" not in actual_events
        assert len([event for event in events if event["event"] == "empty_metric_confirmed"]) == 4
    else:
        assert {"real_model_hover", "real_model_pin"} <= actual_events
        if scenario == "no_lineage":
            assert absent_capabilities == {"lineage", "pruned_ancestor"}
        elif scenario == "all_nodes_kept":
            assert absent_capabilities == {"pruned_ancestor"}
        else:
            assert not absent_capabilities
            assert "real_ancestor_hover" in actual_events
        if scenario == "empty_default_metric":
            hovered = next(event for event in events if event["event"] == "real_model_hover")
            assert hovered["metric_variant"] == "effective__raw"


def read_persisted_interaction_verification_events(directory):
    return [json.loads(line) for line in (directory / "interaction-verification-events.jsonl").read_text().splitlines() if line]


def test_interrupted_run_replays_in_fresh_context_without_erasing_failure(
    tmp_path, synthetic_frontier_report_path, monkeypatch, browser_name, playwright,
):
    monkeypatch.setenv("FRONTIER_3D_INTERACTION_VERIFICATION_ARTIFACT_DIRECTORY", str(tmp_path))
    monkeypatch.setenv("FRONTIER_3D_TEST_BROWSER", browser_name)
    monkeypatch.setattr(validation, "HTML_PATH", synthetic_frontier_report_path)
    monkeypatch.setattr(validation, "sync_playwright", lambda: nullcontext(playwright))
    interrupted = validation.FrontierInteractionVerificationEvidenceJournal(synthetic_frontier_report_path)
    interrupted.record(event="real_event_failed", reason="机器中断前保留的失败证据")
    assert validation.main() == 0
    events = read_persisted_interaction_verification_events(tmp_path)
    starts = [event for event in events if event["event"] == "run_started"]
    assert len(starts) == 2
    assert starts[1]["replay_count"] == 1
    assert starts[1]["replay_of_run_id"] == interrupted.run_id
    assert any(event["run_id"] == interrupted.run_id and event["event"] == "real_event_failed" for event in events)
    assert events[-1]["event"] == "run_completed"
    assert starts[1]["fingerprint"]["head_commit"]
    assert any(event["event"] == "browser_context_started" and event["browser_version"] for event in events)


@pytest.mark.parametrize("recover_after_first_closure", [False, True])
def test_closed_browser_context_gets_only_one_fresh_context_replay(
    tmp_path, synthetic_frontier_report_path, monkeypatch, browser_name, playwright,
    recover_after_first_closure,
):
    from playwright.sync_api import Error as PlaywrightError
    monkeypatch.setenv("FRONTIER_3D_INTERACTION_VERIFICATION_ARTIFACT_DIRECTORY", str(tmp_path))
    monkeypatch.setenv("FRONTIER_3D_TEST_BROWSER", browser_name)
    monkeypatch.setattr(validation, "HTML_PATH", synthetic_frontier_report_path)
    monkeypatch.setattr(validation, "sync_playwright", lambda: nullcontext(playwright))
    contexts = []
    original_verification = validation._verify_report_interactions
    def close_context(page, *arguments):
        contexts.append(page.context)
        if recover_after_first_closure and len(contexts) == 2:
            return original_verification(page, *arguments)
        page.context.close()
        raise PlaywrightError("注入浏览器上下文关闭")
    monkeypatch.setattr(validation, "_verify_report_interactions", close_context)
    assert validation.main() == (0 if recover_after_first_closure else 1)
    assert len(contexts) == 2
    assert contexts[0] is not contexts[1]
    events = read_persisted_interaction_verification_events(tmp_path)
    assert len([event for event in events if event["event"] == "fresh_browser_context_replay"]) == 1
    assert len([event for event in events if event["event"] == "browser_context_failed"]) == (1 if recover_after_first_closure else 2)
    assert events[-1]["event"] == ("run_completed" if recover_after_first_closure else "run_failed")


def test_persistent_replay_budget_is_bounded(tmp_path, synthetic_frontier_report_path, monkeypatch):
    monkeypatch.setenv("FRONTIER_3D_INTERACTION_VERIFICATION_ARTIFACT_DIRECTORY", str(tmp_path))
    first = validation.FrontierInteractionVerificationEvidenceJournal(synthetic_frontier_report_path)
    second = validation.FrontierInteractionVerificationEvidenceJournal(synthetic_frontier_report_path)
    assert first.run_id != second.run_id
    with pytest.raises(AssertionError, match="中断重放预算已耗尽"):
        validation.FrontierInteractionVerificationEvidenceJournal(synthetic_frontier_report_path)
    with pytest.raises(AssertionError, match="中断重放预算已耗尽"):
        validation.FrontierInteractionVerificationEvidenceJournal(synthetic_frontier_report_path)
    events = read_persisted_interaction_verification_events(tmp_path)
    assert len([event for event in events if event["event"] == "run_started"]) == 4
    assert events[-1]["reason"] == "interrupted_replay_budget_exhausted"


def test_interrupted_journal_write_keeps_original_bytes_and_links_replay(
    tmp_path, synthetic_frontier_report_path, monkeypatch,
):
    monkeypatch.setenv("FRONTIER_3D_INTERACTION_VERIFICATION_ARTIFACT_DIRECTORY", str(tmp_path))
    interrupted = validation.FrontierInteractionVerificationEvidenceJournal(synthetic_frontier_report_path)
    with interrupted.journal_path.open("ab") as journal:
        journal.write(b'{"event":"real_event_failed","reason":"\xe4\xb8')
    original_bytes = interrupted.journal_path.read_bytes()
    replay = validation.FrontierInteractionVerificationEvidenceJournal(synthetic_frontier_report_path)
    assert replay.journal_path.read_bytes().startswith(original_bytes + b"\n")
    replay_start = json.loads(replay.journal_path.read_bytes().splitlines()[-1])
    assert replay_start["replay_of_run_id"] == interrupted.run_id
    assert replay_start["replay_count"] == 1
    assert replay_start["interrupted_journal_tail"]
