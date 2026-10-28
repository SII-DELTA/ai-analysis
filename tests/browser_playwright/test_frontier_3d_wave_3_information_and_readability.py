"""W3 的可见行为：口径解释、搜索、固定比较、尺寸、触屏与窄屏。"""
from playwright.sync_api import expect
import pytest
import copy
import re

from src.frontier_3d_self_contained_html_renderer import write_frontier_3d_self_contained_html_report


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
        page.add_init_script("Object.defineProperty(window,'localStorage',{get(){throw new Error('storage unavailable')}})")
    page.goto(synthetic_frontier_report_path.as_uri())
    page.wait_for_function("typeof setFrontierMarkerSizeMultiplier === 'function'")
    assert page.evaluate("frontierThreeDimensionalVisualizationState().markerSizeMultiplier") == .5
    page.evaluate("setFrontierMarkerSizeMultiplier(1.25)")
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    page.locator("#aa-pinned-comparison-panel > summary").click()
    page.locator('[data-comparison-field="output_mtokens"]').first.check()
    page.reload()
    page.wait_for_function("typeof setFrontierMarkerSizeMultiplier === 'function'")
    assert page.evaluate("frontierThreeDimensionalVisualizationState().markerSizeMultiplier") == (.5 if storage_throws else 1.25)
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    page.locator("#aa-pinned-comparison-panel > summary").click()
    assert page.locator('[data-comparison-field="output_mtokens"]').first.is_checked() is (not storage_throws)
    assert not errors
    context.close()


def test_legacy_v2_degrades_without_new_fields(frontier_page, synthetic_frontier_dataset, tmp_path):
    dataset = copy.deepcopy(synthetic_frontier_dataset)
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
          const d=frontierThreeDimensionalRendererDiagnostics, THREE=window.THREE;
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
    page.evaluate("clearFrontierHoverState(); showFrontierLineageForModelName('Qwen4 Max (high)')")
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
