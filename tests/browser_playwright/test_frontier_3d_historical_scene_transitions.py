"""历史步进只过渡变化图层，保持真实坐标、相机及画布布局。"""
import pytest

from tests.browser_playwright.test_frontier_3d_historical_progress_browser_interactions import (
    historical_page, historical_report_path, wait_for_historical_frame_render,
)
from src.frontier_3d_historical_progress import build_historical_progress_dataset
from src.frontier_3d_historical_progress_report import render_historical_progress_html_report
from tests.python_unit.test_frontier_3d_historical_progress import model_row, source_snapshot


@pytest.mark.parametrize("width", [320, 390, 1024, 1440])
def test_delayed_decode_does_not_move_or_resize_canvas(historical_page, width):
    page = historical_page
    page.set_viewport_size({"width": width, "height": 1000})
    page.locator("#aa-historical-progress-controls").evaluate("element => element.open = true")
    settle_page_layout(page)
    before = page.locator("canvas").bounding_box()
    explanation = page.locator("#aa-historical-view-explanation").inner_text()
    page.evaluate("""() => {
      const originalText = Response.prototype.text;
      window.releaseHistoricalDecode = null;
      Response.prototype.text = async function() {
        await new Promise(resolve => { window.releaseHistoricalDecode = resolve; });
        Response.prototype.text = originalText;
        return originalText.call(this);
      };
      window.pendingHistoricalSelection = setHistoricalFrontierTimelineSelection({
        historical_frame_id: historicalFrontierVisualizationState().current_series_frame_ids[0]
      });
    }""")
    page.wait_for_function("typeof releaseHistoricalDecode === 'function'")
    assert page.locator("canvas").bounding_box() == pytest.approx(before, abs=0.1)
    assert page.locator("#aa-historical-view-explanation").inner_text() == explanation
    assert page.locator("#aa-historical-frame-loading-status").inner_text() == "正在载入时间步。"
    page.evaluate("releaseHistoricalDecode()")
    assert page.evaluate("pendingHistoricalSelection") is True
    wait_for_historical_frame_render(page)
    page.wait_for_function("!historicalFrontierVisualizationState().scene_transition.is_active")
    assert page.locator("canvas").bounding_box() == pytest.approx(before, abs=0.1)


def test_shared_logo_layers_remain_opaque_during_exit_transition(historical_page):
    page = historical_page
    page.evaluate("""() => {
      window.historicalTransitionSamples = [];
      const sample = () => {
        const state = historicalFrontierVisualizationState().scene_transition;
        historicalTransitionSamples.push(state);
        if (!state.is_active) return;
        requestAnimationFrame(sample);
      };
      window.pendingHistoricalSelection = setHistoricalFrontierTimelineSelection({
        historical_frame_id: historicalFrontierVisualizationState().current_series_frame_ids[0]
      }).then(() => { sample(); return true; });
    }""")
    assert page.evaluate("pendingHistoricalSelection") is True
    page.wait_for_function("historicalTransitionSamples.at(-1)?.is_active === false")
    samples = page.evaluate("historicalTransitionSamples")
    active = [sample for sample in samples if sample["is_active"]]
    assert len(active) >= 2
    assert all(sample["duration_ms"] == 300 and sample["easing"] == "ease-out-quart" for sample in active)
    logos = [layer for sample in active for layer in sample["retained_layers"] if layer["key"].endswith("/logoSprite")]
    assert logos
    assert all(layer["opacity"] == 1 for layer in logos)
    outgoing = [sample["outgoing_layers"] for sample in active]
    exiting_logo = next(layer["key"] for layer in outgoing[0] if layer["key"].endswith("/logoSprite"))
    opacities = [next(layer["opacity"] for layer in layers if layer["key"] == exiting_logo) for layers in outgoing]
    assert opacities[0] > opacities[-1] > 0
    assert opacities == sorted(opacities, reverse=True)
    assert samples[-1]["temporary_material_count"] == 0
    assert samples[-1]["outgoing_layers"] == []


def settle_page_layout(page):
    page.evaluate("""async () => {
      await document.fonts.ready;
      await new Promise(requestAnimationFrame);
      await Promise.all(document.getAnimations().map(animation => animation.finished.catch(() => {})));
      await new Promise(requestAnimationFrame);
    }""")


CAMERA_AND_PROJECTION_SNAPSHOT = """() => {
  const diagnostics = frontierThreeDimensionalRendererDiagnostics;
  const camera = diagnostics.camera;
  return {
    position: camera.position.toArray(), quaternion: camera.quaternion.toArray(),
    up: camera.up.toArray(), target: diagnostics.controls.target.toArray(),
    zoom: camera.zoom, aspect: camera.aspect, near: camera.near, far: camera.far,
    projection: camera.projectionMatrix.toArray(), view: diagnostics.cameraViewState(),
    models: ['研究模型 1', '研究模型 2'].map(name => diagnostics.projectedCanvasPositionForModelName(name)),
  };
}"""


@pytest.mark.parametrize("camera_view", ["default", "rotate", "pan", "zoom", "intelligence_cost", "intelligence_speed", "cost_speed"])
def test_camera_and_shared_model_projection_stable_through_whole_step(historical_page, camera_view):
    page = historical_page
    settle_page_layout(page)
    canvas = page.locator("canvas").bounding_box()
    x, y = canvas["x"] + canvas["width"] * 0.65, canvas["y"] + canvas["height"] * 0.6
    if camera_view in {"rotate", "pan"}:
        page.mouse.move(x, y)
        page.mouse.down(button="right" if camera_view == "pan" else "left")
        page.mouse.move(x + 80, y + 35, steps=5)
        page.mouse.up(button="right" if camera_view == "pan" else "left")
    elif camera_view == "zoom":
        page.mouse.move(x, y)
        page.mouse.wheel(0, -180)
    elif camera_view != "default":
        assert page.evaluate("view => setAxisAlignedFrontierCameraView(view)", camera_view)
    page.evaluate("clearFrontierHoverState()")
    settle_page_layout(page)
    before = page.evaluate(CAMERA_AND_PROJECTION_SNAPSHOT)
    page.evaluate("window.captureHistoricalCameraAndProjection = " + CAMERA_AND_PROJECTION_SNAPSHOT)
    page.evaluate("""() => {
      window.cameraTransitionSamples = [];
      const sample = () => {
        cameraTransitionSamples.push(captureHistoricalCameraAndProjection());
        if (historicalFrontierVisualizationState().scene_transition.is_active) requestAnimationFrame(sample);
      };
      window.pendingHistoricalSelection = setHistoricalFrontierTimelineSelection({
        historical_frame_id: historicalFrontierVisualizationState().current_series_frame_ids[0]
      }).then(() => { sample(); return true; });
    }""")
    assert page.evaluate("pendingHistoricalSelection") is True
    wait_for_historical_frame_render(page)
    samples = page.evaluate("cameraTransitionSamples")
    assert len(samples) >= 3
    for sample in samples:
        for field in ["position", "quaternion", "up", "target", "projection"]:
            assert sample[field] == pytest.approx(before[field], abs=1e-12)
        for field in ["zoom", "aspect", "near", "far", "view"]:
            assert sample[field] == before[field]
        for model, original in zip(sample["models"], before["models"]):
            assert model == pytest.approx(original, abs=1e-8)


def test_rapid_choices_wait_for_active_transition_and_commit_only_latest(historical_page):
    page = historical_page
    result = page.evaluate("""async () => {
      const [first, last] = historicalFrontierVisualizationState().current_series_frame_ids;
      await setHistoricalFrontierTimelineSelection({historical_frame_id:first});
      const transitionsBefore = historicalFrontierVisualizationState().scene_transition.completed_transition_count;
      const outcomes = await Promise.all([
        setHistoricalFrontierTimelineSelection({historical_frame_id:last}),
        setHistoricalFrontierTimelineSelection({historical_frame_id:first}),
        setHistoricalFrontierTimelineSelection({historical_frame_id:last}),
      ]);
      return {outcomes, transitionsBefore, state:historicalFrontierVisualizationState()};
    }""")
    assert result["outcomes"] == [False, False, True]
    assert result["transitionsBefore"] == 0
    assert result["state"]["scene_transition"]["completed_transition_count"] == 1
    assert result["state"]["release_cutoff_date"] == "2025-03-01"
    wait_for_historical_frame_render(page)
    assert page.evaluate("historicalFrontierVisualizationState().scene_transition.completed_transition_count") == 2


def test_reduced_motion_switches_directly_and_finishes_active_transition(historical_page):
    page = historical_page
    page.emulate_media(reduced_motion="reduce")
    assert page.evaluate("async () => await setHistoricalFrontierTimelineSelection({historical_frame_id:historicalFrontierVisualizationState().current_series_frame_ids[0]})")
    state = page.evaluate("historicalFrontierVisualizationState().scene_transition")
    assert not state["is_active"]
    assert state["temporary_material_count"] == 0
    page.emulate_media(reduced_motion="no-preference")
    assert page.evaluate("async () => await setHistoricalFrontierTimelineSelection({historical_frame_id:historicalFrontierVisualizationState().current_series_frame_ids[1]})")
    assert page.evaluate("historicalFrontierVisualizationState().scene_transition.is_active")
    page.emulate_media(reduced_motion="reduce")
    page.wait_for_function("!historicalFrontierVisualizationState().scene_transition.is_active")
    assert page.evaluate("historicalFrontierVisualizationState().scene_transition.temporary_material_count") == 0


def test_cross_version_fades_out_before_switching_axes_and_fading_in(historical_page):
    page = historical_page
    page.select_option("#aa-historical-view-mode", "observation_replay")
    wait_for_historical_frame_render(page)
    page.select_option("#aa-speed-metric-select", "raw")
    page.select_option("#aa-historical-index-version", "all_versions")
    wait_for_historical_frame_render(page)
    before = page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition")
    page.evaluate("""() => {
      window.versionTransitionSamples = [];
      const sample = () => {
        const transition = historicalFrontierVisualizationState().scene_transition;
        versionTransitionSamples.push({transition,
          version: document.getElementById('aa-report-header-intelligence-index-version').textContent,
          axes: frontierThreeDimensionalVisualizationState().fixedAxisConfiguration,
          camera: frontierThreeDimensionalVisualizationState().cameraPosition});
        if (transition.is_active || historicalFrontierVisualizationState().is_frame_loading) requestAnimationFrame(sample);
      };
      window.pendingHistoricalSelection = setHistoricalFrontierTimelineSelection({
        historical_frame_id: historicalFrontierVisualizationState().current_series_frame_ids[1]
      });
      sample();
    }""")
    assert page.evaluate("pendingHistoricalSelection")
    wait_for_historical_frame_render(page)
    samples = page.evaluate("versionTransitionSamples")
    fading_out = [sample for sample in samples if sample["transition"]["phase"] == "fading_out"]
    fading_in = [sample for sample in samples if sample["transition"]["phase"] == "fading_in"]
    assert fading_out and fading_in
    assert all("v5.0" in sample["version"] and not sample["transition"]["incoming_layers"] for sample in fading_out)
    assert all("v4.3.2" in sample["version"] and not sample["transition"]["outgoing_layers"] for sample in fading_in)
    assert fading_out[0]["axes"] != fading_in[0]["axes"]
    assert all(sample["camera"] == pytest.approx(before) for sample in samples)


def test_repeated_steps_release_temporary_objects_and_keep_current_picking(historical_page):
    page = historical_page
    page.wait_for_function("Object.values(frontierThreeDimensionalVisualizationState().organizationLogoTextureLoadStateByCreatorName).every(value => value === 'loaded')")
    result = page.evaluate("""async () => {
      const ids = historicalFrontierVisualizationState().current_series_frame_ids;
      const renderer = frontierThreeDimensionalRendererDiagnostics.renderer;
      const counts = [];
      for (let index = 0; index < 16; index++) {
        await setHistoricalFrontierTimelineSelection({historical_frame_id:ids[index%2]});
        while (historicalFrontierVisualizationState().scene_transition.is_active) await new Promise(requestAnimationFrame);
        const transition = historicalFrontierVisualizationState().scene_transition;
        const outgoingGroup = frontierThreeDimensionalRendererDiagnostics.scene.getObjectByName('historical-scene-non-pickable-outgoing-layers');
        counts.push({geometries:renderer.info.memory.geometries,textures:renderer.info.memory.textures,
          programs:renderer.info.programs.length,outgoing:outgoingGroup.children.length,materials:transition.temporary_material_count});
      }
      const point = frontierThreeDimensionalRendererDiagnostics.projectedCanvasPositionForModelName('研究模型 3');
      return {counts, hit: frontierThreeDimensionalRendererDiagnostics.pointerInteractionAtCanvasClientCoordinates(point.clientX,point.clientY)};
    }""")
    assert result["hit"]["interactionTargetKind"] == "displayed_model"
    assert all(count["outgoing"] == count["materials"] == 0 for count in result["counts"])
    for same_frame in [result["counts"][4::2], result["counts"][5::2]]:
        assert all(count == same_frame[0] for count in same_frame)


@pytest.mark.parametrize("width", [320, 390, 1024, 1440])
def test_decode_failure_keeps_canvas_layout_and_original_objects(historical_page, width):
    page = historical_page
    page.set_viewport_size({"width": width, "height": 1000})
    page.locator("#aa-historical-progress-controls").evaluate("element => element.open = true")
    settle_page_layout(page)
    before = page.locator("canvas").bounding_box()
    objects_before = page.evaluate("frontierThreeDimensionalRendererDiagnostics.scene.children.flatMap(group => group.children.map(object => object.uuid))")
    page.evaluate("() => { window.DecompressionStream = class { constructor() { throw new Error('注入布局验收解码失败'); } }; }")
    assert page.evaluate("async () => await setHistoricalFrontierTimelineSelection({historical_frame_id:historicalFrontierVisualizationState().current_series_frame_ids[0]})") is False
    assert page.locator("canvas").bounding_box() == pytest.approx(before, abs=.1)
    assert page.evaluate("frontierThreeDimensionalRendererDiagnostics.scene.children.flatMap(group => group.children.map(object => object.uuid))") == objects_before
    assert "保留上一有效场景" in page.locator("#aa-historical-frame-loading-status").inner_text()


def test_failed_latest_target_during_version_fade_restores_actually_committed_frame(historical_page):
    page = historical_page
    page.select_option("#aa-speed-metric-select", "raw")
    result = page.evaluate("""async () => {
      const original = DecompressionStream;
      window.pendingVersionSelection = setHistoricalFrontierTimelineSelection({intelligence_index_version:'5.0',source_snapshot_id:'v5',release_cutoff_date:null});
      while (historicalFrontierVisualizationState().scene_transition.phase !== 'fading_out') await new Promise(requestAnimationFrame);
      window.DecompressionStream = class { constructor() { throw new Error('注入等待目标失败'); } };
      const failed = await setHistoricalFrontierTimelineSelection({historical_frame_id:
        JSON.parse(document.getElementById('frontier-3d-historical-progress-dataset-json').textContent).frames.find(frame =>
          frame.historical_view_mode==='observation_replay' && frame.source_snapshot_id==='earlier' && frame.analysis_sample_policy==='include_estimated').historical_frame_id});
      window.DecompressionStream = original;
      return {failed, previous:await pendingVersionSelection, state:historicalFrontierVisualizationState()};
    }""")
    assert result["failed"] is False and result["previous"] is True
    state = result["state"]
    assert state["historical_frame_id"] == state["rendered_historical_frame_id"]
    assert state["intelligence_index_version"] == "5.0"
    assert page.locator("#aa-historical-index-version").input_value() == "5.0"
    assert "v5.0" in page.locator("#aa-report-header-intelligence-index-version").inner_text()


def test_filter_and_png_export_finish_transition_before_using_scene(historical_page):
    page = historical_page
    assert page.evaluate("async () => await setHistoricalFrontierTimelineSelection({historical_frame_id:historicalFrontierVisualizationState().current_series_frame_ids[0]})")
    assert page.evaluate("historicalFrontierVisualizationState().scene_transition.is_active")
    page.evaluate("setFrontierExplorationFilters({cutoff_date:'2025-01-01',date_mode:'fade'})")
    assert not page.evaluate("historicalFrontierVisualizationState().scene_transition.is_active")
    page.evaluate("pinFrontierBaseModel('研究模型 1')")
    result = page.evaluate("""async () => {
      await setHistoricalFrontierTimelineSelection({historical_frame_id:historicalFrontierVisualizationState().current_series_frame_ids[1]});
      const active = historicalFrontierVisualizationState().scene_transition.is_active;
      document.getElementById('aa-export-frontier-png').click();
      return {active, after:historicalFrontierVisualizationState().scene_transition};
    }""")
    assert result["active"]
    assert not result["after"]["is_active"]
    assert result["after"]["temporary_material_count"] == 0
    page.wait_for_function("typeof frontier3dLastPngExportStatus === 'object' && frontier3dLastPngExportStatus.resourcesReleased")
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids.length") == 2


def test_exiting_layers_never_pick_or_reappear_after_transition(historical_page):
    page = historical_page
    result = page.evaluate("""async () => {
      const diagnostics = frontierThreeDimensionalRendererDiagnostics;
      const point = diagnostics.projectedCanvasPositionForModelName('研究模型 3');
      await setHistoricalFrontierTimelineSelection({historical_frame_id:historicalFrontierVisualizationState().current_series_frame_ids[0]});
      const hit = diagnostics.pointerInteractionAtCanvasClientCoordinates(point.clientX,point.clientY);
      return {active:historicalFrontierVisualizationState().scene_transition.is_active,
        name:hit?.interactionTargetKind === 'displayed_model' ? FRONTIER_3D_INTERACTION_RELATIONSHIPS.models[hit.modelIndex].name : null};
    }""")
    assert result["active"] and result["name"] != "研究模型 3"
    wait_for_historical_frame_render(page)
    assert page.evaluate("frontierThreeDimensionalRendererDiagnostics.projectedCanvasPositionForModelName('研究模型 3')") is None


def test_observed_coordinate_and_surface_changes_crossfade_at_real_positions(historical_page, tmp_path):
    page = historical_page
    before = [model_row(1, intelligence=30, cost=5, speed=100),
              model_row(2, intelligence=45, cost=15, speed=150),
              model_row(3, intelligence=60, cost=20, speed=50),
              model_row(4, intelligence=70, cost=30, speed=200)]
    after = [model_row(1, intelligence=35, cost=8, speed=90), *before[1:]]
    dataset = build_historical_progress_dataset([
        source_snapshot("before", before),
        source_snapshot("after", after, observed="2026-02-01T00:00:00Z"),
    ])
    report = tmp_path / "historical-coordinate-and-surface-change.html"
    report.write_text(render_historical_progress_html_report(dataset))
    page.goto(report.as_uri())
    page.wait_for_function("typeof historicalFrontierVisualizationState === 'function'")
    assert page.evaluate("async () => await setHistoricalFrontierTimelineSelection({historical_view_mode:'observation_replay'})")
    wait_for_historical_frame_render(page)
    page.evaluate("setParetoFrontierVisualizationStyle('solid')")
    result = page.evaluate("""async () => {
      const before = frontierThreeDimensionalRendererDiagnostics.displayedModelMarkerPositionsAndVisibility().find(model => model.name==='研究模型 1').position;
      await setHistoricalFrontierTimelineSelection({historical_frame_id:historicalFrontierVisualizationState().current_series_frame_ids[0]});
      const after = frontierThreeDimensionalRendererDiagnostics.displayedModelMarkerPositionsAndVisibility().find(model => model.name==='研究模型 1').position;
      return {before,after,transition:historicalFrontierVisualizationState().scene_transition,
        actualIntelligence:FRONTIER_3D_INTERACTION_RELATIONSHIPS.models.find(model => model.name==='研究模型 1').panel.intelligence};
    }""")
    transition = result["transition"]
    assert transition["is_active"] and result["before"] != result["after"]
    assert result["actualIntelligence"] == 30
    moved_model_key = "00000000-0000-4000-9000-000000000001/logoSprite"
    incoming = next(layer for layer in transition["incoming_layers"] if layer["key"] == moved_model_key)
    outgoing = next(layer for layer in transition["outgoing_layers"] if layer["key"] == moved_model_key)
    assert incoming["position"] == result["after"] and outgoing["position"] == result["before"]
    assert any(layer["key"] == "frontier/surface" for layer in transition["incoming_layers"])
    assert any(layer["key"] == "frontier/surface" for layer in transition["outgoing_layers"])
    assert any(layer["key"].endswith("000000000002/logoSprite") and layer["opacity"] == 1 for layer in transition["retained_layers"])
    wait_for_historical_frame_render(page)
    assert page.evaluate("historicalFrontierVisualizationState().scene_transition.temporary_material_count") == 0
