"""实际控件切换两种几何，默认保留邻接参照并清楚解释其含义。"""
import pytest
from playwright.sync_api import expect


def _state(page):
    return page.evaluate("frontierThreeDimensionalVisualizationState()")


def _capture_rendered_scene(page, destination):
    page.evaluate("""() => {
      // WebGL 不保留帧缓冲；截图期间持续请求真实场景渲染，避免截到已丢弃的缓冲。
      window.frontierGeometryScreenshotRenderLoopActive = true;
      const renderScreenshotFrame = () => {
        if (!window.frontierGeometryScreenshotRenderLoopActive) return;
        frontierThreeDimensionalRendererDiagnostics.requestRender();
        requestAnimationFrame(renderScreenshotFrame);
      };
      renderScreenshotFrame();
      return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }""")
    try:
        page.screenshot(path=str(destination))
    finally:
        page.evaluate("window.frontierGeometryScreenshotRenderLoopActive = false")


def test_neighbor_interpolation_is_default_and_exact_frontier_replaces_it(frontier_page, tmp_path):
    page = frontier_page
    explanation = page.locator("#aa-frontier-geometry-explanation")
    expect(explanation).to_be_visible()
    expect(explanation).to_contain_text("不是帕累托面")
    toggle = page.get_by_label("实际可达前沿（精确阶梯）", exact=True)
    expect(toggle).not_to_be_checked()
    before = _state(page)
    assert before["frontierStyle"] == "wireframe"
    assert before["paretoFrontierWireframeVisible"]
    page.locator('[data-frontier-style="solid"]').click()
    camera_before = page.evaluate("frontierThreeDimensionalRendererDiagnostics.camera.position.toArray()")
    toggle.check()
    exact = _state(page)
    assert exact["achievableFrontierSurfaceVisible"]
    assert exact["achievableFrontierSurfaceObjectVisible"]
    assert exact["exactAchievableBoundaryVisible"]
    assert not exact["paretoFrontierWireframeVisible"]
    assert not exact["paretoFrontierSurfaceVisible"]
    page.evaluate("() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
    assert _state(page)["renderedTriangleCountInLatestFrame"] > before["renderedTriangleCountInLatestFrame"]
    expect(explanation).to_contain_text("已展示且参与分析")
    expect(page.locator('[data-frontier-style="solid"]')).to_be_disabled()
    assert page.evaluate("frontierThreeDimensionalRendererDiagnostics.camera.position.toArray()") == camera_before
    _capture_rendered_scene(page, tmp_path / "exact-achievable-frontier-desktop.png")
    toggle.uncheck()
    restored = _state(page)
    assert restored["frontierStyle"] == "solid"
    assert restored["paretoFrontierSurfaceVisible"]
    assert not restored["achievableFrontierSurfaceObjectVisible"]
    assert not restored["exactAchievableBoundaryVisible"]
    expect(explanation).to_contain_text("不是帕累托面")
    _capture_rendered_scene(page, tmp_path / "neighbor-interpolation-reference-desktop.png")
    page.set_viewport_size({"width": 390, "height": 844})
    page.locator(".aa-frontier-geometry-toggle-and-explanation").scroll_into_view_if_needed()
    expect(explanation).to_be_visible()
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
    assert explanation.evaluate("element => element.scrollWidth <= element.clientWidth + 1")
    assert explanation.bounding_box()["x"] >= 0
    assert explanation.bounding_box()["x"] + explanation.bounding_box()["width"] <= 391
    toggle.check()
    _capture_rendered_scene(page, tmp_path / "exact-achievable-frontier-mobile.png")


def test_exact_geometry_selection_survives_metric_switch_and_keyboard_toggle(frontier_page):
    page = frontier_page
    toggle = page.get_by_label("实际可达前沿（精确阶梯）", exact=True)
    toggle.focus()
    page.keyboard.press("Space")
    expect(toggle).to_be_checked()
    for cost in ("effective", "blended"):
        for speed in ("effective", "raw"):
            page.evaluate("([cost,speed])=>setFrontierMetricCombination(cost,speed)", [cost, speed])
            state = _state(page)
            assert state["achievableFrontierSurfaceVisible"]
            assert state["achievableFrontierSurfaceObjectVisible"]
            assert state["achievableFrontierGeometryKind"] == "exact_budget_steps"
            assert not state["paretoFrontierWireframeVisible"]
            assert not state["paretoFrontierSurfaceVisible"]
    toggle.focus()
    page.keyboard.press("Space")
    expect(toggle).not_to_be_checked()
    assert _state(page)["paretoFrontierWireframeVisible"]


@pytest.mark.parametrize("viewport_width", [1440, 390])
def test_geometry_explanation_stays_next_to_its_toggle(frontier_page, viewport_width, tmp_path):
    page = frontier_page
    page.set_viewport_size({"width": viewport_width, "height": 900})
    control = page.locator(".aa-frontier-geometry-toggle-and-explanation")
    control.scroll_into_view_if_needed()
    toggle_label = control.locator("label")
    disclosure = page.locator("#aa-frontier-geometry-explanation-toggle")
    explanation = page.locator("#aa-frontier-geometry-explanation")
    expect(disclosure).to_contain_text("非帕累托面")
    expect(disclosure).to_have_attribute("aria-controls", explanation.get_attribute("id"))
    expect(disclosure).to_have_attribute("aria-expanded", "true")
    expect(explanation).to_be_visible()
    label_bounds = toggle_label.bounding_box()
    disclosure_bounds = disclosure.bounding_box()
    assert abs(label_bounds["y"] - disclosure_bounds["y"]) < 8
    assert 0 <= disclosure_bounds["x"] - (label_bounds["x"] + label_bounds["width"]) <= 12
    for element in (toggle_label, disclosure, explanation):
        bounds = element.bounding_box()
        assert 0 <= bounds["x"]
        assert bounds["x"] + bounds["width"] <= viewport_width + 1
        assert element.evaluate("element => element.scrollWidth <= element.clientWidth + 1")
    _capture_rendered_scene(page, tmp_path / f"geometry-explanation-expanded-{viewport_width}.png")
    disclosure.click()
    expect(explanation).to_be_hidden()
    expect(disclosure).to_have_attribute("aria-expanded", "false")
    expect(disclosure).to_contain_text("非帕累托面")
    page.get_by_label("实际可达前沿（精确阶梯）", exact=True).check()
    expect(explanation).to_be_hidden()
    expect(disclosure).to_contain_text("精确可达面")
    disclosure.focus()
    page.keyboard.press("Enter")
    expect(explanation).to_be_visible()
    expect(explanation).to_contain_text("已展示且参与分析")
    page.keyboard.press("Space")
    expect(explanation).to_be_hidden()
    _capture_rendered_scene(page, tmp_path / f"geometry-explanation-collapsed-{viewport_width}.png")


def test_geometry_explanation_collapses_after_one_minute_and_restarts_on_reopen(frontier_page):
    page = frontier_page
    page.clock.install()
    page.clock.pause_at(page.evaluate("Date.now()"))
    page.reload()
    page.wait_for_function("typeof frontierThreeDimensionalVisualizationState === 'function'")
    explanation = page.locator("#aa-frontier-geometry-explanation")
    disclosure = page.locator("#aa-frontier-geometry-explanation-toggle")
    expect(explanation).to_be_visible()
    page.clock.fast_forward(59_999)
    expect(explanation).to_be_visible()
    page.clock.fast_forward(1)
    expect(explanation).to_be_hidden()
    expect(disclosure).to_have_attribute("aria-expanded", "false")
    expect(disclosure).to_contain_text("非帕累托面")

    disclosure.click()
    page.clock.fast_forward(30_000)
    disclosure.click()
    page.clock.fast_forward(10_000)
    disclosure.click()
    # 旧计时器应被取消，重新展开的说明享有完整一分钟。
    page.clock.fast_forward(20_000)
    expect(explanation).to_be_visible()
    page.get_by_label("实际可达前沿（精确阶梯）", exact=True).check()
    expect(disclosure).to_contain_text("精确可达面")
    page.clock.fast_forward(39_999)
    expect(explanation).to_be_visible()
    page.clock.fast_forward(1)
    expect(explanation).to_be_hidden()
    assert _state(page)["achievableFrontierSurfaceObjectVisible"]
