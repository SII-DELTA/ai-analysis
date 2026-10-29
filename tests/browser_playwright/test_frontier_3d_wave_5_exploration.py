"""W5 浏览器验收：分享、全表、日期、键盘、主题与离屏截图。"""
import json
import re
import struct

import pytest
from playwright.sync_api import expect

from src.frontier_3d_self_contained_html_renderer import write_frontier_3d_self_contained_html_report
from tests.python_unit.test_frontier_3d_wave_5_dataset_and_sensitivity import build_wave_5_dataset
from tests.browser_playwright.frontier_3d_projected_axis_annotation_validation import verify_constrained_axis_annotations
from tests.browser_playwright.frontier_3d_playwright_verification_support import wait_for_frontier_layout_transitions_and_render


@pytest.fixture(scope="session")
def wave_5_report_path(tmp_path_factory):
    _,dataset=build_wave_5_dataset()
    path=tmp_path_factory.mktemp("frontier-wave-5-browser")/"frontier_wave_5.html"
    write_frontier_3d_self_contained_html_report(dataset,path)
    return path


@pytest.fixture(scope="session")
def wave_5_uppercase_uuid_report_path(tmp_path_factory):
    _, dataset = build_wave_5_dataset()
    identity = "abcdefab-cdef-4abc-9def-abcdefabcdef"
    dataset["models"][0]["model_uuid"] = identity.upper()
    dataset["refresh_difference_report"] = {"frontier_comparison": {
        "status": "comparable", "reason": None,
        "entered_by_variant": {key: [identity] for key in dataset["metric_variants"]},
        "exited_by_variant": {},
    }}
    path = tmp_path_factory.mktemp("frontier-wave-5-uppercase-uuid-browser") / "frontier_wave_5_uppercase_uuid.html"
    write_frontier_3d_self_contained_html_report(dataset, path)
    return path


@pytest.fixture
def wave_5_page(page,wave_5_report_path):
    errors=[]
    page.on("pageerror",lambda error:errors.append(str(error)))
    page.route("https://**/*",lambda route:route.abort())
    page.route("http://**/*",lambda route:route.abort())
    page.set_viewport_size({"width":1400,"height":900})
    page.goto(wave_5_report_path.as_uri())
    yield page
    assert not errors,errors


def test_wave_5_controls_and_complete_table(wave_5_page):
    page=wave_5_page
    expect(page.locator("#aa-table-view-tab")).to_be_visible()
    page.locator("#aa-table-view-tab").click()
    expect(page.locator("#aa-all-model-table tbody tr")).to_have_count(24)
    expect(page.locator("#aa-all-model-table")).to_contain_text("未知")
    page.locator("#aa-all-model-table-search").fill("Qwen4 Max")
    expect(page.locator("#aa-all-model-table tbody tr")).to_have_count(3)
    with page.expect_download() as event:
        page.locator("#aa-export-all-model-table-csv").click()
    csv=event.value.path().read_text(encoding="utf-8-sig")
    assert "任务/小时" in csv and "来源" in csv and "Qwen4 Max" in csv


def test_search_reopens_after_escape_on_input_focus_and_metric_change(wave_5_page):
    page = wave_5_page
    search = page.locator("#aa-search-input")
    results = page.locator("#aa-search-results")
    search.fill("Qwen")
    expect(results).to_be_visible()
    expect(results).to_contain_text("Qwen4 Max")
    search.press("Escape")
    expect(results).to_be_hidden()
    search.fill("Gemini")
    expect(results).to_be_visible()
    expect(results).to_contain_text("Gemini 3 Pro")
    search.press("Escape")
    expect(search).to_have_attribute("aria-expanded", "false")
    page.locator("canvas[data-frontier-threejs-canvas]").focus()
    search.focus()
    expect(results).to_be_visible()
    expect(search).to_have_attribute("aria-expanded", "true")
    search.press("Escape")
    page.evaluate("setFrontierMetricCombination('blended','raw')")
    expect(results).to_be_visible()
    expect(results).to_contain_text("Gemini 3 Pro")
    search.fill("Qwen")
    page.locator(".aa-search-result-pin-button", has_text="Qwen4 Max").click()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids.length") == 3


def test_new_frontier_highlight_and_tooltip_match_normalized_uuid(wave_5_page, wave_5_uppercase_uuid_report_path):
    page = wave_5_page
    page.goto(wave_5_uppercase_uuid_report_path.as_uri())
    page.wait_for_function("typeof frontierThreeDimensionalVisualizationState === 'function'")
    assert page.evaluate("showFrontierLineageForModelName('Qwen4 Max (high)')") is True
    expect(page.locator("#aa-threejs-model-tooltip")).to_contain_text("本期新入前沿（匹配历史科学快照）")
    visible_entry_rings = page.evaluate("""() => {
      const rings = [];
      frontierThreeDimensionalRendererDiagnostics.scene.traverse(object => {
        if (object.isSprite && (object.userData.normalRenderOrder ?? object.renderOrder) === 47 && object.visible) rings.push(object);
      });
      return rings.length;
    }""")
    assert visible_entry_rings == 1


def test_hash_round_trip_navigation_and_clipboard_failure(wave_5_page):
    page=wave_5_page
    page.wait_for_function("typeof serializeFrontierViewState === 'function'")
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    page.evaluate("setFrontierMetricCombination('blended','raw')")
    page.evaluate("setFrontierMarkerSizeMultiplier(1.2)")
    page.locator("#aa-pinned-comparison-panel > summary").click()
    page.locator('[data-comparison-field="output_mtokens"]').first.check()
    page.evaluate("setFrontierExplorationFilters({measured_only:true,cutoff_date:'2026-07-01',date_mode:'hide'})")
    page.wait_for_function("location.hash.startsWith('#frontier-view-state-v1=') && (()=>{const state=JSON.parse(decodeURIComponent(location.hash.split('=')[1]));return state.display.measured_only && state.date_filter.cutoff_date==='2026-07-01' && state.display.pinned_comparison_optional_fields.includes('output_mtokens')})()")
    state=page.evaluate("serializeFrontierViewState()")
    url=page.url
    page.reload()
    page.wait_for_function("typeof serializeFrontierViewState === 'function'")
    assert page.evaluate("serializeFrontierViewState()") == state
    assert page.locator('[data-comparison-field="output_mtokens"]').first.is_checked()
    changed={**state,"metric_variant_key":"effective__tasks_per_hour"}
    page.evaluate("state => {location.hash='#frontier-view-state-v1='+encodeURIComponent(JSON.stringify(state));}",changed)
    page.wait_for_function("frontierThreeDimensionalVisualizationState().activeMetricVariantKey === 'effective__tasks_per_hour'")
    page.evaluate("() => Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async()=>{throw new Error('denied')}}})")
    page.locator("#aa-copy-frontier-view-link").click()
    expect(page.locator("#aa-frontier-view-link-fallback")).to_be_visible()
    expect(page.locator("#aa-exploration-status")).to_contain_text("对应 HTML")
    assert url.split("#")[0] in page.locator("#aa-frontier-view-link-fallback").input_value()


def test_filters_preserve_analysis_and_remove_pickable_points(wave_5_page):
    page=wave_5_page
    page.wait_for_function("typeof frontierThreeDimensionalVisualizationState === 'function'")
    before=page.evaluate("frontierThreeDimensionalVisualizationState()")
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    page.evaluate("setFrontierExplorationFilters({measured_only:true,cutoff_date:'2026-01-01',date_mode:'hide',sensitivity_intelligence_half_width:'1'})")
    after=page.evaluate("frontierThreeDimensionalVisualizationState()")
    assert after["paretoFrontierModelCount"] == before["paretoFrontierModelCount"]
    assert after["fixedAxisConfiguration"] == before["fixedAxisConfiguration"]
    assert after["visibleModelMarkerCount"] < before["visibleModelMarkerCount"]
    hidden=page.evaluate("frontierThreeDimensionalRendererDiagnostics.displayedModelMarkerPositionsAndVisibility().find(model=>model.name==='Qwen4 Max (high)')")
    assert hidden["visible"] is False
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids.length") == 3


def test_keyboard_theme_narrow_screen_and_camera_reset(wave_5_page):
    page=wave_5_page
    canvas=page.locator("canvas[data-frontier-threejs-canvas]")
    expect(canvas).to_have_attribute("tabindex","0")
    initial=page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition")
    canvas.focus()
    canvas.press("ArrowLeft")
    assert page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition") != initial
    canvas.press("/")
    expect(page.locator("#aa-search-input")).to_be_focused()
    page.locator("#aa-search-input").fill("/模型")
    expect(page.locator("#aa-search-input")).to_have_value("/模型")
    page.locator("#aa-reset-camera-view").click()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition") == pytest.approx(initial)
    page.emulate_media(color_scheme="dark")
    page.wait_for_function("frontierThreeDimensionalRendererDiagnostics.scene.background.getHexString() === '111827'")
    page.set_viewport_size({"width":320,"height":900})
    page.wait_for_timeout(240)
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
    page.set_viewport_size({"width":320,"height":568})
    page.evaluate("setFrontierSidePanelExpanded(false)")
    wait_for_frontier_layout_transitions_and_render(page)
    page.evaluate("resetFrontierCameraView()")
    for variant_key in page.evaluate("Object.keys(FRONTIER_3D_VISUALIZATION_DATASET.metric_variants)"):
        page.evaluate("key=>setFrontierMetricCombination(...key.split('__'))", variant_key)
        verify_constrained_axis_annotations(page,variant_key,True)
    page.locator("#aa-table-view-tab").click()
    expect(page.locator("#aa-all-model-table-panel")).to_be_visible()
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")


def test_png_download_preserves_view_and_releases_resources(wave_5_page):
    page=wave_5_page
    page.wait_for_function("typeof serializeFrontierViewState === 'function'")
    before=page.evaluate("serializeFrontierViewState()")
    width=page.locator("canvas[data-frontier-threejs-canvas]").bounding_box()["width"]
    with page.expect_download() as event:
        page.locator("#aa-export-frontier-png").click()
    png=event.value.path().read_bytes()
    assert png[:8] == b"\x89PNG\r\n\x1a\n"
    dimensions=struct.unpack(">II",png[16:24])
    assert dimensions[0] == round(width)*2 and dimensions[1] > 500
    assert page.evaluate("serializeFrontierViewState()") == before
    assert page.evaluate("frontier3dLastPngExportStatus.resourcesReleased") is True


def test_initial_narrow_framing_keeps_axis_titles_across_all_six_variants(wave_5_page, wave_5_report_path):
    page = wave_5_page
    page.set_viewport_size({"width":320,"height":568})
    page.goto(wave_5_report_path.as_uri())
    page.wait_for_function("typeof serializeFrontierViewState === 'function'")
    camera = page.evaluate("serializeFrontierViewState().camera")
    for variant_key in page.evaluate("Object.keys(FRONTIER_3D_VISUALIZATION_DATASET.metric_variants)"):
        page.evaluate("key=>setFrontierMetricCombination(...key.split('__'))", variant_key)
        verify_constrained_axis_annotations(page,variant_key,True)
        assert page.evaluate("serializeFrontierViewState().camera") == camera


def test_webgl_unavailable_keeps_full_semantic_table(page,wave_5_report_path):
    page.add_init_script("""(() => {const original=HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext=function(type,...args){return type.startsWith('webgl') ? null : original.call(this,type,...args)}})()""")
    page.goto(wave_5_report_path.as_uri())
    expect(page.locator("#aa-all-model-table-panel")).to_be_visible()
    expect(page.locator("#aa-all-model-table tbody tr")).to_have_count(24)
    expect(page.locator("#aa-export-all-model-table-csv")).to_be_enabled()
    expect(page.locator("#aa-export-frontier-png")).to_be_disabled()
    page.locator("#aa-all-model-table-search").fill("Qwen4 Max")
    expect(page.locator("#aa-all-model-table tbody tr")).to_have_count(3)
    page.evaluate("""() => {const key=FRONTIER_3D_VISUALIZATION_DATASET.organization_identity_metadata_by_creator_name.Alibaba.organization_identity_key;
      location.hash='#frontier-view-state-v1='+encodeURIComponent(JSON.stringify({version:1,metric_variant_key:'blended__raw',hidden_organization_identity_keys:[key],display:{measured_only:true}}));}""")
    expect(page.locator("#aa-all-model-table tbody tr")).to_have_count(0)
    expect(page.locator("#frontier-3d-report-header")).to_contain_text("Artificial Analysis")


def test_date_fade_hide_unknown_date_and_playback(wave_5_page):
    page=wave_5_page
    page.wait_for_function("typeof setFrontierExplorationFilters === 'function'")
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    ranking=page.evaluate("JSON.stringify(frontierStandoutRanking())")
    page.evaluate("setFrontierExplorationFilters({cutoff_date:'2026-01-01',date_mode:'fade',sensitivity_intelligence_half_width:'0.5'})")
    assert page.evaluate("showFrontierLineageForModelName('Qwen4 Max (high)')") is True
    expect(page.locator("#aa-threejs-model-tooltip")).to_contain_text("不是 AA 置信区间")
    point=page.evaluate("frontierThreeDimensionalRendererDiagnostics.projectedCanvasPositionForModelName('Qwen4 Max (high)')")
    page.evaluate("setFrontierExplorationFilters({date_mode:'hide'})")
    assert page.evaluate("showFrontierLineageForModelName('Qwen4 Max (high)')") is False
    target=page.evaluate("p=>{const t=frontierThreeDimensionalRendererDiagnostics.pointerInteractionAtCanvasClientCoordinates(p.clientX,p.clientY);return t?.interactionTargetKind==='displayed_model'?FRONTIER_3D_INTERACTION_RELATIONSHIPS.models[t.modelIndex].name:null}",point)
    assert target != "Qwen4 Max (high)"
    assert page.evaluate("frontierThreeDimensionalRendererDiagnostics.displayedModelMarkerPositionsAndVisibility().find(row=>row.name==='DeepSeek V5').visible") is True
    assert page.evaluate("frontierThreeDimensionalVisualizationState().displayedReasoningVariantSegmentEndpointCount") == 0
    assert page.evaluate("JSON.stringify(frontierStandoutRanking())") == ranking
    page.locator("#aa-model-exploration-controls > summary").click()
    expect(page.locator("#aa-play-release-date-filter")).to_have_attribute("aria-pressed","false")
    page.locator("#aa-play-release-date-filter").click()
    expect(page.locator("#aa-play-release-date-filter")).to_have_attribute("aria-pressed","true")
    page.locator("#aa-play-release-date-filter").click()
    paused=page.evaluate("serializeFrontierViewState().date_filter.cutoff_date")
    page.wait_for_timeout(1000)
    assert page.evaluate("serializeFrontierViewState().date_filter.cutoff_date") == paused
    page.locator("#aa-show-all-release-dates").click()
    assert page.evaluate("serializeFrontierViewState().date_filter.cutoff_date") is None


def test_camera_hash_commits_at_end_double_click_and_escape_priority(wave_5_page):
    page=wave_5_page
    page.wait_for_function("typeof serializeFrontierViewState === 'function'")
    page.evaluate("setFrontierMarkerSizeMultiplier(1)")
    page.wait_for_function("location.hash.startsWith('#frontier-view-state-v1=')")
    before_hash=page.url
    history_length=page.evaluate("history.length")
    canvas=page.locator("canvas[data-frontier-threejs-canvas]")
    bounds=canvas.bounding_box()
    page.mouse.move(bounds["x"]+12,bounds["y"]+12)
    page.mouse.down()
    page.mouse.move(bounds["x"]+100,bounds["y"]+65,steps=5)
    assert page.url == before_hash
    page.mouse.up()
    page.wait_for_function("url=>location.href!==url",arg=before_hash)
    assert page.evaluate("history.length") == history_length
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    canvas.dblclick(position={"x":10,"y":10})
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids.length") == 3
    page.evaluate("setFrontierHowToReadDrawerOpen(true)")
    page.keyboard.press("Escape")
    expect(page.locator("#aa-how-to-read-drawer")).to_be_hidden()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids.length") == 3
    canvas.focus()
    canvas.press("Escape")
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids.length") == 0


def test_missing_uuid_and_unknown_hash_version_explain_without_guessing(wave_5_page):
    page=wave_5_page
    page.wait_for_function("typeof serializeFrontierViewState === 'function'")
    missing="aaaaaaaa-aaaa-4aaa-9aaa-aaaaaaaaaaaa"
    page.evaluate("uuid=>{location.hash='#frontier-view-state-v1='+encodeURIComponent(JSON.stringify({version:1,pinned_model_uuids:[uuid]}));}",missing)
    expect(page.locator("#aa-pinned-panel")).to_contain_text("缺失模型")
    assert page.evaluate("serializeFrontierViewState().pinned_model_uuids") == [missing]
    before=page.evaluate("serializeFrontierViewState()")
    page.evaluate("location.hash='#frontier-view-state-v2=%7B%7D'")
    expect(page.locator("#aa-exploration-status")).to_contain_text("版本不支持")
    assert page.evaluate("serializeFrontierViewState()") == before


def test_png_failure_releases_resources_and_allows_retry(wave_5_page):
    page=wave_5_page
    page.wait_for_function("typeof serializeFrontierViewState === 'function'")
    before=page.evaluate("serializeFrontierViewState()")
    page.evaluate("""() => {window.originalWave5CanvasContext=HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext=function(type,...args){return type.startsWith('webgl') ? null : originalWave5CanvasContext.call(this,type,...args)};}""")
    page.locator("#aa-export-frontier-png").click()
    expect(page.locator("#aa-exploration-status")).to_contain_text("PNG 导出失败")
    assert page.evaluate("frontier3dLastPngExportStatus.resourcesReleased") is True
    assert page.evaluate("serializeFrontierViewState()") == before
    page.evaluate("() => {HTMLCanvasElement.prototype.getContext=originalWave5CanvasContext;}")
    with page.expect_download():
        page.locator("#aa-export-frontier-png").click()
    assert page.evaluate("frontier3dLastPngExportStatus.resourcesReleased") is True
