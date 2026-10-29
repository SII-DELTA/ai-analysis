"""W3 的可见行为：口径解释、搜索、固定比较、尺寸、触屏与窄屏。"""
from playwright.sync_api import expect
import pandas as pd
import pytest
import re
from uuid import UUID

from src.frontier_3d_self_contained_html_renderer import write_frontier_3d_self_contained_html_report
from src.frontier_3d_visualization_dataset_builder import build_frontier_3d_visualization_dataset, expand_frontier_3d_visualization_dataset_for_scene_consumers
from tests.browser_playwright.frontier_3d_playwright_verification_support import wait_for_frontier_layout_transitions_and_render
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe


@pytest.fixture(scope="session")
def same_generation_pruned_variant_report_path(tmp_path_factory):
    models = build_frontier_3d_synthetic_fixture_models_dataframe()
    low_reasoning_variant = models.loc[models["name"] == "Gemini 2.5 Pro"].copy()
    low_reasoning_variant["id"] = str(UUID(int=20001))
    low_reasoning_variant["name"] = "Gemini 2.5 Pro (low)"
    low_reasoning_variant["intelligence"] = 80
    models_with_low_reasoning_variant = pd.concat([models, low_reasoning_variant], ignore_index=True)
    models_with_low_reasoning_variant.attrs = models.attrs.copy()
    dataset = build_frontier_3d_visualization_dataset(
        models_with_low_reasoning_variant,
        since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log",
    )
    report_path = tmp_path_factory.mktemp("frontier-3d-same-generation-pruned-variant-reports") / "frontier_3d.html"
    write_frontier_3d_self_contained_html_report(dataset, report_path)
    return report_path


def test_search_identity_reasons_keyboard_and_pinned_comparison(frontier_page):
    page = frontier_page
    search = page.locator("#aa-search-input")
    search.fill("Alibaba")
    expect(page.locator(".aa-result-row")).to_have_count(1)
    search.press("ArrowDown")
    search.press("Enter")
    expect(page.locator(".aa-pinned-card")).to_contain_text("Qwen4 Max")
    names = page.locator(".aa-pinned-variant-card").all_text_contents()
    assert "low" in names[0] and "high" in names[-1], names
    page.locator("#aa-pinned-comparison-panel > summary").click()
    expect(page.locator("#aa-pinned-comparison-table thead")).to_contain_text("Qwen4 Max")
    expect(page.locator("#aa-pinned-comparison-table")).to_contain_text("Δ")
    search.fill("Speedless Genius")
    expect(page.locator("#aa-search-results")).to_contain_text("未上图")
    expect(page.locator("#aa-search-results")).to_contain_text("缺")
    expect(page.locator("#aa-search-results .aa-search-result-pin-button")).to_have_count(0)
    search.press("Escape")
    expect(page.locator("#aa-search-results")).not_to_be_visible()
    page.locator("#aa-clear-all-pinned-models").click()
    expect(page.locator(".aa-pinned-card")).to_have_count(0)


def test_weight_draft_clamping_reset_and_hypervolume_percentage(frontier_page):
    page = frontier_page
    page.select_option("#aa-standout-metric-select", "weighted_exclusive_hypervolume")
    weight = page.locator("#aa-weight-number-intelligence")
    weight.fill("")
    assert page.evaluate("frontierThreeDimensionalVisualizationState().frontierStandoutAxisWeights.intelligence") == 1
    weight.fill("20")
    weight.press("Enter")
    expect(weight).to_have_value("4.00")
    page.locator("#aa-reset-standout-axis-weights").click()
    expect(weight).to_have_value("1.00")
    expect(page.locator("#aa-standout-ranking")).to_contain_text("%")
    page.locator("#aa-standout-ranking button").first.click()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids.length") == 1


def test_constant_marker_pixels_preset_and_fixed_axes(frontier_page):
    page = frontier_page
    page.evaluate("setFrontierMarkerSizeMultiplier(1)")
    before = page.evaluate("frontierThreeDimensionalRendererDiagnostics.projectedCanvasMarkerRadiiForModelName('Qwen4 Max (high)')")
    assert before["logoRadius"] == pytest.approx(11, abs=.1)
    page.evaluate("() => { const d=frontierThreeDimensionalRendererDiagnostics; d.camera.position.multiplyScalar(1.5); d.controls.update(); d.requestRender(); }")
    after = page.evaluate("frontierThreeDimensionalRendererDiagnostics.projectedCanvasMarkerRadiiForModelName('Qwen4 Max (high)')")
    assert after == pytest.approx(before, abs=.1)
    axes = page.evaluate("frontierThreeDimensionalVisualizationState().fixedAxisConfiguration")
    page.evaluate("setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod(false)")
    page.evaluate("setShowOnlyCurrentIntelligenceIndexVersionComparableModels(true)")
    assert page.evaluate("frontierThreeDimensionalVisualizationState().fixedAxisConfiguration") == axes
    camera = page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition")
    page.locator("#aa-orthogonal-decomposition-preset").click()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().activeMetricVariantKey") == "blended__raw"
    assert page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition") == pytest.approx(camera)


@pytest.mark.parametrize("width", [320, 390, 640, 901, 935, 960, 1400])
def test_responsive_header_control_panel_and_tooltip_boundaries(frontier_page, width):
    page = frontier_page
    page.set_viewport_size({"width": width, "height": 900})
    page.wait_for_timeout(240)
    page.evaluate("setFrontierSidePanelExpanded(false)")
    page.wait_for_timeout(240)
    if width <= 1024:
        assert page.locator("#frontier-3d-side-panel").bounding_box()["height"] == pytest.approx(44, abs=1)
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
    if width <= 640:
        assert page.locator("#aa-report-header-metadata-row > :first-child").get_attribute("id") == "aa-report-header-model-count-summary"
        expect(page.locator("#aa-view-settings-toggle")).to_be_visible()
    page.locator("#aa-metric-explanation-button").evaluate("button => button.click()")
    expect(page.locator("#aa-how-to-read-drawer")).to_be_visible()
    expect(page.locator("#aa-how-to-read-drawer")).to_contain_text("图例")


def test_tooltip_values_and_real_bounds(frontier_page):
    page = frontier_page
    page.evaluate("setFrontierMetricCombination('blended','raw')")
    page.evaluate("showFrontierLineageForModelName('Gemini 3 Pro')")
    tooltip = page.locator("#aa-threejs-model-tooltip")
    expect(tooltip).to_contain_text("USD/M tokens")
    expect(tooltip).to_contain_text("冗长度")
    expect(tooltip).to_contain_text("突出度名次")
    point = page.evaluate("frontierThreeDimensionalRendererDiagnostics.projectedCanvasPositionForModelName('Gemini 3 Pro')")
    page.mouse.move(point["clientX"], point["clientY"])
    expect(tooltip).to_be_visible()
    bounds = tooltip.bounding_box()
    region = page.locator("#frontier-3d-plot-region").bounding_box()
    assert bounds["x"] >= region["x"] and bounds["y"] >= region["y"]
    assert bounds["x"] + bounds["width"] <= region["x"] + region["width"]
    assert bounds["y"] + bounds["height"] <= region["y"] + region["height"]


@pytest.mark.parametrize("storage_throws", [False, True])
def test_preference_persistence_and_storage_failure(browser, synthetic_frontier_report_path, storage_throws):
    context = browser.new_context(viewport={"width": 1400, "height": 900})
    page = context.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    if storage_throws:
        context.add_init_script("Object.defineProperty(window,'localStorage',{get(){throw new Error('storage unavailable')}})")
    page.goto(synthetic_frontier_report_path.as_uri())
    page.wait_for_function("typeof setFrontierMarkerSizeMultiplier === 'function'")
    assert page.evaluate("frontierThreeDimensionalVisualizationState().markerSizeMultiplier") == .5
    page.evaluate("setFrontierMarkerSizeMultiplier(1.25)")
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    page.locator("#aa-pinned-comparison-panel > summary").click()
    page.locator('[data-comparison-field="output_mtokens"]').first.check()
    # 用同一浏览器 context 的新文档验证本地偏好，避免 URL 状态或 hash 导航代替持久化。
    page.wait_for_function("location.hash.startsWith('#frontier-view-state-v1=') && JSON.parse(decodeURIComponent(location.hash.split('=')[1])).display.pinned_comparison_optional_fields.includes('output_mtokens')")
    page.close()
    page = context.new_page()
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(synthetic_frontier_report_path.as_uri())
    page.wait_for_function("typeof setFrontierMarkerSizeMultiplier === 'function'")
    assert page.evaluate("frontierThreeDimensionalVisualizationState().markerSizeMultiplier") == (.5 if storage_throws else 1.25)
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    page.locator("#aa-pinned-comparison-panel > summary").click()
    assert page.locator('[data-comparison-field="output_mtokens"]').first.is_checked() is (not storage_throws)
    assert not errors
    context.close()


def test_legacy_v2_degrades_without_new_fields(frontier_page, synthetic_frontier_dataset, tmp_path):
    from tests.python_unit.test_frontier_3d_v3_deduplicated_contract_and_browser_projection import build_legacy_v3_dataset
    dataset = expand_frontier_3d_visualization_dataset_for_scene_consumers(build_legacy_v3_dataset())
    for definitions in [dataset["cost_metric_definitions"], dataset["speed_metric_definitions"]]:
        for definition in definitions.values():
            definition.pop("description", None)
    for variant in dataset["metric_variants"].values():
        variant["interaction_relationships"].pop("cost_axis_unit", None)
        for model in variant["three_dimensional_scene"]["displayed_model_markers"]:
            model.pop("model_uuid", None)
            model["panel"].pop("output_mtokens", None)
        for model in variant["excluded_models_with_drop_reason"]:
            for field in ["model_uuid", "base_model_name", "reasoning_level_label", "reasoning_level_sort_order", "analysis_eligibility", "tier"]:
                model.pop(field, None)
    path = tmp_path / "legacy-v2-report.html"
    write_frontier_3d_self_contained_html_report(dataset, path)
    page = frontier_page
    page.goto(path.as_uri())
    page.wait_for_function("typeof pinFrontierBaseModel === 'function'")
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    expect(page.locator("#aa-pinned-panel")).to_contain_text("旧契约缺少 UUID")
    page.evaluate("showFrontierLineageForModelName('Qwen4 Max (high)')")
    expect(page.locator("#aa-threejs-model-tooltip")).to_contain_text("冗长度：未记录")
    page.locator("#aa-search-input").fill("Speedless")
    expect(page.locator("#aa-search-results")).to_contain_text("未上图")


def test_touch_tap_opens_scrollable_details_and_synthetic_click_does_not_pin(browser, synthetic_frontier_report_path):
    context = browser.new_context(has_touch=True, viewport={"width": 390, "height": 844})
    page = context.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(synthetic_frontier_report_path.as_uri())
    page.wait_for_function("typeof frontierThreeDimensionalRendererDiagnostics !== 'undefined'")
    page.wait_for_function("Object.values(frontierThreeDimensionalVisualizationState().organizationLogoTextureLoadStateByCreatorName).every(value => value === 'loaded')")
    page.evaluate("new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))")
    point = page.evaluate("""() => {
      const d=frontierThreeDimensionalRendererDiagnostics;
      return FRONTIER_3D_INTERACTION_RELATIONSHIPS.models.map(model=>d.frontmostPointerInteractionAtProjectedModelPosition(model.name))
        .find(result=>result && result.projectedCanvasPosition.clientX>30 && result.projectedCanvasPosition.clientX<360 && result.projectedCanvasPosition.clientY>130 && result.projectedCanvasPosition.clientY<680).projectedCanvasPosition;
    }""")
    page.touchscreen.tap(point["clientX"], point["clientY"])
    tooltip = page.locator("#aa-threejs-model-tooltip")
    expect(tooltip).to_be_visible()
    expect(tooltip).to_have_attribute("role", "dialog")
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids.length") == 0
    page.locator("canvas").dispatch_event("click", {"clientX": point["clientX"], "clientY": point["clientY"]})
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids.length") == 0
    tooltip.get_by_role("button", name="固定全部档位", exact=True).click()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids.length") > 0
    tooltip.get_by_role("button", name="关闭详情").click()
    page.evaluate("frontierThreeDimensionalVisualizationState().pinnedBaseModelNames.forEach(name=>unpinFrontierBaseModel(name))")
    page.evaluate("new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))")
    canvas = page.locator("canvas")
    if browser.browser_type.name == "chromium":
        session = context.new_cdp_session(page)
        session.send("Input.dispatchTouchEvent", {"type": "touchStart", "touchPoints": [{"x": point["clientX"], "y": point["clientY"]}]})
        session.send("Input.dispatchTouchEvent", {"type": "touchMove", "touchPoints": [{"x": point["clientX"] + 60, "y": point["clientY"]}]})
        session.send("Input.dispatchTouchEvent", {"type": "touchEnd", "touchPoints": []})
        session.detach()
    else:
        # 合成 PointerEvent 不注册原生 pointer ID；仅在这段测试手势中替代捕获 API。
        canvas.evaluate("element=>{element.setPointerCapture=()=>{};element.releasePointerCapture=()=>{}}")
        press = {"pointerType": "touch", "pointerId": 21, "button": 0, "buttons": 1, "clientX": point["clientX"], "clientY": point["clientY"]}
        canvas.dispatch_event("pointerdown", press)
        canvas.dispatch_event("pointermove", {**press, "clientX": point["clientX"] + 60})
        canvas.dispatch_event("pointerup", {**press, "clientX": point["clientX"] + 60, "buttons": 0})
    canvas.dispatch_event("click", {"clientX": point["clientX"], "clientY": point["clientY"]})
    expect(tooltip).to_be_hidden()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids.length") == 0
    assert not errors
    context.close()


@pytest.mark.parametrize("device_pixel_ratio", [1, 2])
def test_marker_css_pixels_match_actual_webgl_pixels_at_zoom_and_dpr(browser, synthetic_frontier_report_path, device_pixel_ratio):
    context = browser.new_context(viewport={"width": 1400, "height": 900}, device_scale_factor=device_pixel_ratio)
    page = context.new_page()
    page.goto(synthetic_frontier_report_path.as_uri())
    page.wait_for_function("typeof frontierThreeDimensionalRendererDiagnostics !== 'undefined'")
    for multiplier in [.5, 1, 1.5]:
        page.evaluate("value=>setFrontierMarkerSizeMultiplier(value)", multiplier)
        measured_widths = page.evaluate("""() => {
          const d=frontierThreeDimensionalRendererDiagnostics, THREE=d.verificationGeometryConstructors;
          const encoding=d.markerVisualEncodingSummary()[0];
          if (encoding.logoSizeAttenuation !== false) throw new Error('标记仍随透视衰减');
          const sprite=new THREE.Sprite(new THREE.SpriteMaterial({color:0xff00ff,sizeAttenuation:encoding.logoSizeAttenuation}));
          sprite.scale.set(encoding.logoScale,encoding.logoScale,1);
          const scene=new THREE.Scene(); scene.background=new THREE.Color('white'); scene.add(sprite);
          const camera=d.camera.clone();
          const result=[3,10].map(distance=>{
            camera.position.set(0,-distance,0);camera.lookAt(0,0,0);camera.updateMatrixWorld();
            d.renderer.render(scene,camera);
            const gl=d.renderer.getContext(),row=new Uint8Array(gl.drawingBufferWidth*4);
            gl.readPixels(0,Math.floor(gl.drawingBufferHeight/2),gl.drawingBufferWidth,1,gl.RGBA,gl.UNSIGNED_BYTE,row);
            let count=0;for(let index=0;index<row.length;index+=4) if(row[index]>180 && row[index+1]<100 && row[index+2]>180)count++;
            return count/d.renderer.getPixelRatio();
          });
          sprite.material.dispose(); d.requestRender(); return result;
        }""")
        assert measured_widths == pytest.approx([22 * multiplier] * 2, abs=1)
    context.close()


def test_out_of_range_ancestor_is_clamped_with_visible_direction_hint(frontier_page):
    page = frontier_page
    page.evaluate("""() => {
      const nodes=Object.values(FRONTIER_3D_INTERACTION_RELATIONSHIPS.lineages).flat();
      nodes.filter(node=>!node.kept).forEach(node=>{node.x=1e12;});
      showFrontierLineageForModelName('Gemini 3 Pro');
    }""")
    expect(page.locator("#aa-lineage-overflow-direction-labels")).to_contain_text("成本高于箱体范围 ↑")
    positions = page.evaluate("frontierThreeDimensionalRendererDiagnostics.displayedPrunedLineageAncestorMarkerPositions()")
    assert positions
    assert all(-1 <= value <= 1 for point in positions for value in point)


QWEN4_MAX_TIER_UUIDS = {
    "00000000-0000-4000-9000-000000000000",
    "00000000-0000-4000-9000-000000000001",
    "00000000-0000-4000-9000-000000000002",
}


def pinned_model_uuids(page):
    return set(page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids"))


def pin_only_qwen4_max_high_from_ranking(page):
    page.locator("#aa-standout-ranking button").filter(has_text="Qwen4 Max (high)").click()
    assert pinned_model_uuids(page) == {"00000000-0000-4000-9000-000000000000"}
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedBaseModelNames") == ["Qwen4 Max"]


def clickable_qwen4_max_projection(page):
    return page.evaluate("""() => {
      const names = FRONTIER_3D_INTERACTION_RELATIONSHIPS.models
        .filter(model => model.base_model_name === "Qwen4 Max").map(model => model.name);
      const diagnostics = frontierThreeDimensionalRendererDiagnostics;
      return names.map(name => diagnostics.frontmostPointerInteractionAtProjectedModelPosition(name))
        .find(hit => hit && names.includes(hit.frontmostModelName) && document.elementFromPoint(hit.projectedCanvasPosition.clientX, hit.projectedCanvasPosition.clientY)?.tagName === "CANVAS") || null;
    }""")


def horizontal_overflow_fade_state(page, selector):
    return page.evaluate("""selector => {
      const element = document.querySelector(selector);
      const style = getComputedStyle(element);
      const mask = `${style.maskImage || ""} ${style.webkitMaskImage || ""}`;
      const overflows = element.scrollWidth - element.clientWidth > 1;
      const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;
      return { overflows, atEnd, faded: mask.includes("gradient") };
    }""", selector)


def test_partial_base_model_pin_completes_remaining_tiers_before_clearing(frontier_page):
    page = frontier_page
    pin_only_qwen4_max_high_from_ranking(page)
    search = page.locator("#aa-search-input")
    search.fill("Qwen4 Max")
    action = page.locator(".aa-search-result-action-label")
    expect(action).to_have_count(1)
    expect(action).to_have_text("固定")
    expect(page.locator(".aa-search-result-pin-button")).to_have_class(re.compile(r"\bis-pinned\b"))
    hit = clickable_qwen4_max_projection(page)
    assert hit, "合成场景里没有可点击的 Qwen4 Max 标记"
    page.mouse.click(hit["projectedCanvasPosition"]["clientX"], hit["projectedCanvasPosition"]["clientY"])
    assert pinned_model_uuids(page) == QWEN4_MAX_TIER_UUIDS
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedBaseModelNames") == ["Qwen4 Max"]
    expect(action).to_have_text("取消固定")
    action.click()
    assert pinned_model_uuids(page) == set()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedBaseModelNames") == []
    expect(action).to_have_text("固定")


def test_touch_partial_pin_button_uses_whole_group_state(browser, synthetic_frontier_report_path):
    context = browser.new_context(has_touch=True, viewport={"width": 1400, "height": 900})
    page = context.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(synthetic_frontier_report_path.as_uri())
    page.wait_for_function("typeof frontierThreeDimensionalVisualizationState === 'function'")
    page.wait_for_function("Object.values(frontierThreeDimensionalVisualizationState().organizationLogoTextureLoadStateByCreatorName).every(value => value === 'loaded')")
    pin_only_qwen4_max_high_from_ranking(page)
    hit = clickable_qwen4_max_projection(page)
    assert hit, "合成场景里没有可轻点的 Qwen4 Max 标记"
    point = hit["projectedCanvasPosition"]
    page.touchscreen.tap(point["clientX"], point["clientY"])
    tooltip = page.locator("#aa-threejs-model-tooltip")
    expect(tooltip).to_contain_text(hit["frontmostModelName"])
    tooltip.get_by_role("button", name="固定全部档位", exact=True).click()
    assert pinned_model_uuids(page) == QWEN4_MAX_TIER_UUIDS
    expect(tooltip.get_by_role("button", name="取消固定全部档位", exact=True)).to_be_visible()
    assert not errors
    context.close()


def tap_visible_model_details(page, base_model_name="Qwen4 Max"):
    hit = page.evaluate("""baseName => {
      const diagnostics = frontierThreeDimensionalRendererDiagnostics;
      return FRONTIER_3D_INTERACTION_RELATIONSHIPS.models
        .filter(model => model.base_model_name === baseName)
        .map(model => diagnostics.frontmostPointerInteractionAtProjectedModelPosition(model.name))
        .find(hit => hit?.frontmostBaseModelName === baseName &&
          document.elementFromPoint(hit.projectedCanvasPosition.clientX, hit.projectedCanvasPosition.clientY)?.tagName === "CANVAS");
    }""", base_model_name)
    assert hit, f"没有可轻点的 {base_model_name} 标记"
    point = hit["projectedCanvasPosition"]
    page.touchscreen.tap(point["clientX"], point["clientY"])
    tooltip = page.locator("#aa-threejs-model-tooltip")
    expect(tooltip).to_be_visible()
    expect(tooltip.locator("strong")).to_have_text(hit["frontmostModelName"])
    expect(tooltip).to_have_attribute("role", "dialog")
    return hit


def expect_closed_touch_details(page):
    tooltip = page.locator("#aa-threejs-model-tooltip")
    expect(tooltip).to_be_hidden()
    expect(tooltip.locator(".aa-touch-details-actions")).to_have_count(0)
    assert "is-touch-details" not in tooltip.get_attribute("class")
    assert tooltip.get_attribute("role") is None
    assert tooltip.get_attribute("aria-label") is None


@pytest.mark.browser_context_args(has_touch=True)
def test_repeated_real_touch_taps_reuse_one_details_action_bar(frontier_page):
    page = frontier_page
    page.evaluate("""() => {
      window.frontierDetailsTouchEvents = [];
      for (const type of ["pointerdown", "pointerup"]) document.addEventListener(type, event => {
        if (event.pointerType === "touch") frontierDetailsTouchEvents.push({
          type, trusted: event.isTrusted, canvas: event.target.tagName === "CANVAS"
        });
      }, true);
    }""")
    for _ in range(3):
        tap_visible_model_details(page)
        assert pinned_model_uuids(page) == set()
    assert page.evaluate("frontierDetailsTouchEvents") == [
        {"type": event_type, "trusted": True, "canvas": True}
        for _ in range(3) for event_type in ("pointerdown", "pointerup")
    ]
    tooltip = page.locator("#aa-threejs-model-tooltip")
    expect(tooltip.locator(".aa-touch-details-actions")).to_have_count(1)
    expect(tooltip.get_by_role("button")).to_have_count(2)
    tooltip.get_by_role("button", name="固定全部档位", exact=True).click()
    assert pinned_model_uuids(page) == QWEN4_MAX_TIER_UUIDS


@pytest.mark.browser_context_args(has_touch=True)
@pytest.mark.parametrize("update_entry", ["metric_select", "metric_api", "weight_number", "weight_slider", "weight_api"])
def test_open_touch_details_refresh_standout_without_reopening(frontier_page, update_entry):
    page = frontier_page
    if update_entry.startswith("weight"):
        page.select_option("#aa-standout-metric-select", "weighted_exclusive_hypervolume")
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    hit = tap_visible_model_details(page)
    model_name = hit["frontmostModelName"]
    tooltip = page.locator("#aa-threejs-model-tooltip")
    old_ranking = page.evaluate("frontierStandoutRanking()")
    if update_entry == "metric_select":
        page.select_option("#aa-standout-metric-select", "weighted_exclusive_hypervolume")
    elif update_entry == "metric_api":
        page.evaluate("selectFrontierStandoutMetric('weighted_exclusive_hypervolume')")
    elif update_entry == "weight_number":
        page.locator("#aa-weight-number-intelligence").fill("4")
        page.locator("#aa-weight-number-intelligence").press("Enter")
    elif update_entry == "weight_slider":
        page.locator("#aa-weight-slider-intelligence").focus()
        page.locator("#aa-weight-slider-intelligence").press("End")
    else:
        tooltip.get_by_role("button", name="取消固定全部档位", exact=True).focus()
        page.evaluate("setFrontierStandoutAxisWeights(4, 1, 1)")
        expect(tooltip.get_by_role("button", name="取消固定全部档位", exact=True)).to_be_focused()
    ranking = page.evaluate("frontierStandoutRanking()")
    assert ranking != old_ranking
    ranking_row = page.locator("#aa-standout-ranking button").filter(has_text=model_name)
    value = ranking_row.locator(".aa-ranking-value").inner_text()
    label = page.locator("#aa-standout-metric-select option:checked").inner_text()
    expect(tooltip).to_be_visible()
    expect(tooltip.locator("strong")).to_have_text(model_name)
    expect(tooltip).to_contain_text(f"{label}：{value}")
    rank = next(index + 1 for index, row in enumerate(ranking["ranking"]) if row["name"] == model_name)
    expect(tooltip).to_contain_text(f"突出度名次：{rank} / {len(ranking['ranking'])}")
    assert value.endswith("%")
    identity = page.evaluate("name => FRONTIER_3D_INTERACTION_RELATIONSHIPS.models.find(model => model.name === name).model_uuid", model_name)
    assert comparison_standout_text_by_identity(page)[identity].startswith(value)
    expect(tooltip.locator(".aa-touch-details-actions")).to_have_count(1)
    assert pinned_model_uuids(page) == QWEN4_MAX_TIER_UUIDS


@pytest.mark.browser_context_args(has_touch=True)
def test_open_touch_details_follow_every_pin_entry_and_partial_group_state(frontier_page):
    page = frontier_page
    tap_visible_model_details(page)
    tooltip = page.locator("#aa-threejs-model-tooltip")
    pin_button = tooltip.get_by_role("button").first

    def expect_pins(identities):
        assert pinned_model_uuids(page) == identities
        sidebar_identities = set(page.locator(".aa-pinned-variant-card").evaluate_all("cards => cards.map(card => card.dataset.modelIdentity)"))
        assert sidebar_identities == identities
        expect(tooltip).to_be_visible()
        expect(pin_button).to_have_text("取消固定全部档位" if identities == QWEN4_MAX_TIER_UUIDS else "固定全部档位")
        expect(tooltip.locator(".aa-touch-details-actions")).to_have_count(1)

    pin_only_qwen4_max_high_from_ranking(page)
    expect_pins({"00000000-0000-4000-9000-000000000000"})
    pin_button.click()
    expect_pins(QWEN4_MAX_TIER_UUIDS)
    pin_button.click()
    expect_pins(set())
    for expression, identities in [
        ("pinFrontierBaseModel('Qwen4 Max')", QWEN4_MAX_TIER_UUIDS),
        ("unpinFrontierBaseModel('Qwen4 Max')", set()),
        ("togglePinnedFrontierBaseModel('Qwen4 Max')", QWEN4_MAX_TIER_UUIDS),
        ("togglePinnedFrontierBaseModel('Qwen4 Max')", set()),
    ]:
        pin_button.focus()
        page.evaluate(expression)
        expect_pins(identities)
        expect(pin_button).to_be_focused()
    page.locator("#aa-search-input").fill("Qwen4 Max")
    page.locator(".aa-search-result-pin-button").click()
    expect_pins(QWEN4_MAX_TIER_UUIDS)
    page.get_by_role("button", name="移除 Qwen4 Max 的全部固定档位", exact=True).click()
    expect_pins(set())
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    page.locator("#aa-clear-all-pinned-models").click()
    expect_pins(set())


@pytest.mark.browser_context_args(has_touch=True)
@pytest.mark.parametrize("viewport", [{"width": 1400, "height": 900}, {"width": 390, "height": 844}, {"width": 320, "height": 720}])
def test_touch_details_preserve_scroll_and_close_restore_hover_and_metric_state(frontier_page, viewport):
    page = frontier_page
    page.set_viewport_size(viewport)
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    if viewport["width"] <= 640:
        page.locator("#aa-view-settings-toggle").click()
        page.evaluate("setFrontierSidePanelExpanded(true)")
    else:
        page.locator("#aa-pinned-comparison-panel > summary").click()
        page.evaluate("setFrontierSidePanelExpanded(false)")
    wait_for_frontier_layout_transitions_and_render(page)
    tap_visible_model_details(page)
    tooltip = page.locator("#aa-threejs-model-tooltip")
    close_button = tooltip.get_by_role("button", name="关闭详情")
    close_button.focus()
    scroll_top = tooltip.evaluate("element => { element.scrollTop = 70; return element.scrollTop; }")
    assert scroll_top > 0, "展开控制栏或对比表后详情应实际产生滚动"
    page.evaluate("selectFrontierStandoutMetric('weighted_exclusive_hypervolume')")
    page.evaluate("setFrontierStandoutAxisWeights(4, .5, 2)")
    assert tooltip.evaluate("element => element.scrollTop") == pytest.approx(scroll_top, abs=1)
    expect(close_button).to_be_focused()
    bounds = tooltip.bounding_box()
    region = page.locator("#frontier-3d-plot-region").bounding_box()
    assert bounds["x"] >= region["x"] and bounds["y"] >= region["y"]
    assert bounds["x"] + bounds["width"] <= region["x"] + region["width"]
    assert bounds["y"] + bounds["height"] <= region["y"] + region["height"]
    close_button.click()
    expect_closed_touch_details(page)
    tap_visible_model_details(page)
    page.keyboard.press("Escape")
    expect_closed_touch_details(page)
    before = page.evaluate("frontierThreeDimensionalVisualizationState()")
    for cost, speed in [("blended", "raw"), ("blended", "effective"), ("effective", "effective")]:
        tap_visible_model_details(page)
        page.evaluate("([cost, speed]) => setFrontierMetricCombination(cost, speed)", [cost, speed])
        expect_closed_touch_details(page)
        assert pinned_model_uuids(page) == QWEN4_MAX_TIER_UUIDS
        assert page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition") == pytest.approx(before["cameraPosition"])
    tap_visible_model_details(page)
    # 合成取消事件没有原生 pointer ID，只在分发期间替代 OrbitControls 的捕获释放。
    page.locator("canvas").evaluate("""element => {
      const releasePointerCapture = element.releasePointerCapture;
      element.releasePointerCapture = () => {};
      try { element.dispatchEvent(new PointerEvent("pointercancel", {pointerType: "touch", pointerId: 99})); }
      finally { element.releasePointerCapture = releasePointerCapture; }
    }""")
    expect_closed_touch_details(page)
    hit = clickable_qwen4_max_projection(page)
    assert hit
    point = hit["projectedCanvasPosition"]
    page.mouse.move(point["clientX"], point["clientY"])
    expect(tooltip).to_be_visible()
    expect(tooltip.locator("strong")).to_have_text(hit["frontmostModelName"])
    expect(tooltip.get_by_role("button")).to_have_count(0)


@pytest.mark.browser_context_args(has_touch=True)
def test_touch_details_switch_model_and_ancestor_action_ownership(frontier_page):
    page = frontier_page
    tap_visible_model_details(page)
    page.locator("#aa-threejs-model-tooltip").get_by_role("button", name="固定全部档位", exact=True).click()
    tap_visible_model_details(page, "Gemini 3 Pro")
    tooltip = page.locator("#aa-threejs-model-tooltip")
    expect(tooltip.get_by_role("button")).to_have_count(2)
    tooltip.get_by_role("button", name="固定全部档位", exact=True).click()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedBaseModelNames.sort()") == ["Gemini 3 Pro", "Qwen4 Max"]
    wait_for_frontier_layout_transitions_and_render(page)
    hit = page.evaluate("""() => {
      const diagnostics = frontierThreeDimensionalRendererDiagnostics;
      for (const node of Object.values(FRONTIER_3D_INTERACTION_RELATIONSHIPS.lineages).flat().filter(node => !node.kept)) {
        const center = diagnostics.projectedCanvasPositionForPrunedLineageAncestorName(node.name);
        if (!center) continue;
        for (const [offsetX, offsetY] of [[0, 0], [-3, 0], [3, 0], [0, -3], [0, 3]]) {
          const clientX = center.clientX + offsetX, clientY = center.clientY + offsetY;
          const target = diagnostics.pointerInteractionAtCanvasClientCoordinates(clientX, clientY);
          if (target?.interactionTargetKind === "pruned_lineage_ancestor" && target.prunedLineageAncestorNode.name === node.name &&
              document.elementFromPoint(clientX, clientY)?.tagName === "CANVAS") {
            return {projectedCanvasPosition: {clientX, clientY}, frontmostInteractionTargetName: node.name};
          }
        }
      }
      return null;
    }""")
    assert hit, page.evaluate("""() => ({
      message: "没有可轻点的谱系前身",
      tooltip: document.querySelector("#aa-threejs-model-tooltip").getBoundingClientRect().toJSON(),
      ancestors: Object.values(FRONTIER_3D_INTERACTION_RELATIONSHIPS.lineages).flat().filter(node => !node.kept)
        .map(node => frontierThreeDimensionalRendererDiagnostics.frontmostPointerInteractionAtProjectedPrunedLineageAncestorPosition(node.name))
    })""")
    point = hit["projectedCanvasPosition"]
    page.touchscreen.tap(point["clientX"], point["clientY"])
    expect(tooltip.locator("strong")).to_have_text(hit["frontmostInteractionTargetName"])
    expect(tooltip).to_contain_text("谱系前身")
    expect(tooltip.get_by_role("button")).to_have_count(1)
    expect(tooltip.get_by_role("button", name="关闭详情")).to_be_visible()
    page.evaluate("selectFrontierStandoutMetric('intelligence_uplift')")
    expect(tooltip.locator("strong")).to_have_text(hit["frontmostInteractionTargetName"])
    tap_visible_model_details(page)
    expect(tooltip.get_by_role("button", name="取消固定全部档位", exact=True)).to_be_visible()
    page.locator("#aa-organization-filter-panel summary").click()
    page.locator(".aa-organization-filter-row").filter(has_text="Alibaba").locator("input").uncheck()
    expect_closed_touch_details(page)


@pytest.mark.browser_context_args(has_touch=True)
@pytest.mark.parametrize("interaction_mode", ["mouse", "touch"])
def test_pruned_same_generation_details_keep_interaction_relationship_after_refresh(
    frontier_page, same_generation_pruned_variant_report_path, interaction_mode,
):
    page = frontier_page
    page.goto(same_generation_pruned_variant_report_path.as_uri())
    page.wait_for_function("typeof frontierThreeDimensionalRendererDiagnostics !== 'undefined'")
    page.wait_for_function("Object.values(frontierThreeDimensionalVisualizationState().organizationLogoTextureLoadStateByCreatorName).every(value => value === 'loaded')")
    tooltip = page.locator("#aa-threejs-model-tooltip")

    def open_pruned_gemini_details(source_model_name, expected_relationship_kind):
        assert page.evaluate("name => showFrontierLineageForModelName(name)", source_model_name)
        wait_for_frontier_layout_transitions_and_render(page)
        point = page.evaluate("""expectedRelationshipKind => {
          const diagnostics = frontierThreeDimensionalRendererDiagnostics;
          const center = diagnostics.projectedCanvasPositionForPrunedLineageAncestorName('Gemini 2.5 Pro');
          if (!center) return null;
          for (const [offsetX, offsetY] of [[0, 0], [-3, 0], [3, 0], [0, -3], [0, 3]]) {
            const clientX = center.clientX + offsetX, clientY = center.clientY + offsetY;
            const target = diagnostics.pointerInteractionAtCanvasClientCoordinates(clientX, clientY);
            if (target?.interactionTargetKind === 'pruned_lineage_ancestor' &&
                target.prunedLineageAncestorNode.name === 'Gemini 2.5 Pro' &&
                target.prunedLineageAncestorNode.relationship_kind === expectedRelationshipKind &&
                document.elementFromPoint(clientX, clientY)?.tagName === 'CANVAS') return {clientX, clientY};
          }
          return null;
        }""", expected_relationship_kind)
        assert point, f"没有可真实命中的 {expected_relationship_kind} 灰点"
        if interaction_mode == "touch":
            page.touchscreen.tap(point["clientX"], point["clientY"])
        else:
            page.mouse.move(point["clientX"], point["clientY"])
        expect(tooltip).to_be_visible()
        expect(tooltip.locator("strong")).to_have_text("Gemini 2.5 Pro")

    def expect_relationship_details(relationship_label):
        expect(tooltip).to_be_visible()
        expect(tooltip.locator("strong")).to_have_text("Gemini 2.5 Pro")
        expect(tooltip).to_contain_text(f"{relationship_label} · 已从主散点裁剪")
        expect(tooltip.get_by_role("button")).to_have_count(1 if interaction_mode == "touch" else 0)
        if interaction_mode == "touch":
            expect(tooltip.get_by_role("button", name="关闭详情")).to_be_visible()

    open_pruned_gemini_details("Gemini 2.5 Pro (low)", "same_generation_reasoning_variant")
    expect_relationship_details("同代其他档位")
    assert pinned_model_uuids(page) == set()
    for update in [
        "selectFrontierStandoutMetric('weighted_exclusive_hypervolume')",
        "setFrontierStandoutAxisWeights(4, .5, 2)",
        "pinFrontierBaseModel('Gemini 2.5 Pro')",
        "selectFrontierStandoutMetric('intelligence_uplift')",
        "unpinFrontierBaseModel('Gemini 2.5 Pro')",
    ]:
        page.evaluate(update)
        expect_relationship_details("同代其他档位")
    if interaction_mode == "touch":
        tooltip.get_by_role("button", name="关闭详情").click()
        expect_closed_touch_details(page)
    else:
        page.evaluate("clearFrontierHoverState()")
        expect(tooltip).to_be_hidden()
    open_pruned_gemini_details("Gemini 3 Pro", "previous_generation")
    expect_relationship_details("谱系前身")
    page.evaluate("setFrontierStandoutAxisWeights(1, 1, 1)")
    expect_relationship_details("谱系前身")


def comparison_standout_text_by_identity(page):
    return page.evaluate("""() => {
      const headers = [...document.querySelectorAll("#aa-pinned-comparison-table thead th")].slice(1);
      const cells = [...document.querySelectorAll("#aa-pinned-comparison-table tr[data-comparison-field='standout'] td")];
      return Object.fromEntries(headers.map((header, index) => [header.dataset.modelIdentity, cells[index].textContent]));
    }""")


def formatted_contract_metric(page, model_name, metric_field):
    """与界面 formatSignificantNumber 相同：3 位有效数字后再去掉 JS Number 的尾随零。"""
    return page.evaluate(
        """({ modelName, metricField }) => {
          const model = FRONTIER_3D_INTERACTION_RELATIONSHIPS.models.find((item) => item.name === modelName);
          if (!model) throw new Error(`missing model ${modelName}`);
          const value = model.standout_metrics?.[metricField];
          if (typeof value !== "number" || !Number.isFinite(value)) {
            throw new Error(`missing finite ${metricField} for ${modelName}`);
          }
          return Number(value.toPrecision(3)).toString();
        }""",
        {"modelName": model_name, "metricField": metric_field},
    )


def test_eligible_non_frontier_standout_reuses_contract_without_joining_ranking(frontier_page):
    page = frontier_page
    mistral_trend = formatted_contract_metric(page, "Mistral Large 4", "trend_residual")
    assert page.evaluate("""() => {
      const model = FRONTIER_3D_INTERACTION_RELATIONSHIPS.models.find((item) => item.name === "Mistral Large 4");
      return model.panel.layer !== 1 && model.analysis_eligibility.is_analysis_eligible_for_current_metric_variant === true;
    }""")
    page.evaluate("showFrontierLineageForModelName('Mistral Large 4')")
    tooltip = page.locator("#aa-threejs-model-tooltip")
    expect(tooltip).to_contain_text(f"趋势残差：{mistral_trend}")
    expect(tooltip).to_contain_text("未参与前沿排行")
    expect(tooltip).not_to_contain_text("趋势残差：未记录")
    page.evaluate("showFrontierLineageForModelName('Claude Legacy 4 (Reasoning)')")
    expect(tooltip).to_contain_text("趋势残差：未记录")
    expect(tooltip).to_contain_text("未参与前沿排行")
    expect(tooltip).to_contain_text("历史口径")
    ranking_names = page.evaluate("frontierStandoutRanking().ranking.map(row => row.name)")
    assert "Mistral Large 4" not in ranking_names
    assert "Claude Legacy 4 (Reasoning)" not in ranking_names
    pin_only_qwen4_max_high_from_ranking(page)
    page.evaluate("pinFrontierBaseModel('Mistral Large 4')")
    page.evaluate("pinFrontierBaseModel('Claude Legacy 4')")
    page.locator("#aa-pinned-comparison-panel > summary").click()
    standout = comparison_standout_text_by_identity(page)
    qwen_ranking_value = page.locator("#aa-standout-ranking button").filter(has_text="Qwen4 Max (high)").locator(".aa-ranking-value").inner_text()
    assert qwen_ranking_value != "未记录"
    assert standout["00000000-0000-4000-9000-000000000000"].startswith(qwen_ranking_value)
    assert standout["00000000-0000-4000-9000-000000000009"].startswith(mistral_trend)
    assert standout["00000000-0000-4000-9000-000000000019"].startswith("未记录")
    page.select_option("#aa-standout-metric-select", "weighted_exclusive_hypervolume")
    ranking_value = page.locator("#aa-standout-ranking button").filter(has_text="Qwen4 Max (high)").locator(".aa-ranking-value")
    before_weight_change = page.evaluate("frontierStandoutRanking().ranking.find(row => row.name === 'Qwen4 Max (high)').value")
    page.evaluate("showFrontierLineageForModelName('Qwen4 Max (high)')")
    expect(tooltip).to_contain_text(f"加权超体积：{ranking_value.inner_text()}")
    page.locator("#aa-weight-number-intelligence").fill("4")
    page.locator("#aa-weight-number-intelligence").press("Enter")
    after_weight_change = page.evaluate("frontierStandoutRanking().ranking.find(row => row.name === 'Qwen4 Max (high)').value")
    assert before_weight_change != after_weight_change
    expect(tooltip).to_contain_text(f"加权超体积：{ranking_value.inner_text()}")
    assert page.evaluate("""() => FRONTIER_3D_INTERACTION_RELATIONSHIPS.models.find((item) => item.name === "Mistral Large 4").standout_metrics.weighted_exclusive_hypervolume""") == 0
    weighted = comparison_standout_text_by_identity(page)
    assert weighted["00000000-0000-4000-9000-000000000009"].startswith("0%")
    assert weighted["00000000-0000-4000-9000-000000000019"].startswith("未记录")
    assert "Mistral Large 4" not in page.evaluate("frontierStandoutRanking().ranking.map(row => row.name)")


def test_horizontal_overflow_fade_tracks_remaining_content(frontier_page):
    page = frontier_page
    header = "#aa-report-header-metadata-row"
    table = ".aa-comparison-table-scroll-region"
    desktop = horizontal_overflow_fade_state(page, header)
    assert desktop["faded"] == (desktop["overflows"] and not desktop["atEnd"])
    for base_name in ("Qwen4 Max", "Gemini 3 Pro", "Mistral Large 4", "Claude Legacy 4"):
        page.evaluate("name => pinFrontierBaseModel(name)", base_name)
    page.locator("#aa-pinned-comparison-panel > summary").click()
    for width in (750, 390):
        page.set_viewport_size({"width": width, "height": 900})
        page.wait_for_function("document.getAnimations().every(animation => !animation.pending && animation.playState !== 'running')")
        for selector in (header, table):
            page.evaluate("selector => { document.querySelector(selector).scrollLeft = 0; }", selector)
            page.wait_for_function("""selector => {
              const element = document.querySelector(selector);
              const mask = `${getComputedStyle(element).maskImage || ""} ${getComputedStyle(element).webkitMaskImage || ""}`;
              return element.scrollWidth > element.clientWidth + 1 && mask.includes("gradient");
            }""", arg=selector)
            page.evaluate("selector => { document.querySelector(selector).scrollLeft = document.querySelector(selector).scrollWidth; }", selector)
            page.wait_for_function("""selector => {
              const element = document.querySelector(selector);
              const mask = `${getComputedStyle(element).maskImage || ""} ${getComputedStyle(element).webkitMaskImage || ""}`;
              return element.scrollLeft + element.clientWidth >= element.scrollWidth - 1 && !mask.includes("gradient");
            }""", arg=selector)
            region = page.locator(selector).bounding_box()
            last_item = page.locator("#aa-pinned-comparison-table thead th").last if selector == table else page.locator("#aa-report-header-metadata-row > :last-child")
            last_box = last_item.bounding_box()
            assert last_box["x"] + last_box["width"] <= region["x"] + region["width"] + 2


def test_hovered_model_stays_pickable_when_ancestor_overlaps(frontier_page):
    page = frontier_page
    result = page.evaluate("""() => {
      const model=FRONTIER_3D_INTERACTION_RELATIONSHIPS.models.find(model=>model.name==='Gemini 3 Pro');
      Object.values(FRONTIER_3D_INTERACTION_RELATIONSHIPS.lineages).flat().filter(node=>!node.kept).forEach(node=>{node.x=model.x;node.y=model.y;node.z=model.z});
      showFrontierLineageForModelName(model.name);
      return frontierThreeDimensionalRendererDiagnostics.frontmostPointerInteractionAtProjectedModelPosition(model.name);
    }""")
    assert result and result["frontmostModelName"] == "Gemini 3 Pro"
