"""通过真实浏览器控件、指针与像素验证独立比较页，证据写入持久目录。"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

import numpy as np
from playwright.sync_api import sync_playwright
from plotly.utils import PlotlyJSONEncoder

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from src.frontier_3d_geometry_comparison_artifact_builder import write_geometry_comparison_artifacts
from src.frontier_3d_visualization_dataset_builder import build_frontier_3d_visualization_dataset
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe


def _render_frame(page):
    page.evaluate("() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")


def _snapshot(page):
    return page.evaluate("window.frontierGeometryComparisonDiagnostics.snapshot()")


def _independent_midpoint_metric_crosscheck(comparison_dataset, resolution=400):
    """独立数值对拍只作验证；正式产物仍使用精确裁剪积分。"""
    axis = (np.arange(resolution) + 0.5) / resolution
    cost_grid, speed_grid = np.meshgrid(axis, axis)
    cost_queries, speed_queries = cost_grid.ravel(), speed_grid.ravel()
    results = {}
    for variant_key, variant in comparison_dataset["metric_variants"].items():
        exact_heights = np.full(cost_queries.shape, np.nan)
        reference_heights = np.full(cost_queries.shape, np.nan)
        for cost, speed, intelligence in variant["exact_pareto_points"]:
            feasible = (cost_queries >= cost) & (speed_queries <= speed)
            exact_heights[feasible] = np.fmax(exact_heights[feasible], intelligence)
        mesh = variant["reference_triangle_mesh"]
        for indices in mesh["triangles"]:
            first, second, third = np.asarray([mesh["vertices"][index] for index in indices])
            first_edge, second_edge = second - first, third - first
            determinant = first_edge[0] * second_edge[1] - first_edge[1] * second_edge[0]
            if abs(determinant) < 1e-14:
                continue
            cost_delta, speed_delta = cost_queries - first[0], speed_queries - first[1]
            first_weight = (cost_delta * second_edge[1] - speed_delta * second_edge[0]) / determinant
            second_weight = (first_edge[0] * speed_delta - first_edge[1] * cost_delta) / determinant
            inside = (first_weight >= 0) & (second_weight >= 0) & (first_weight + second_weight <= 1)
            reference_heights[inside] = first[2] + first_weight[inside] * first_edge[2] + second_weight[inside] * second_edge[2]
        attainable, supported = np.isfinite(exact_heights), np.isfinite(reference_heights)
        common = attainable & supported
        metrics = variant["metrics"]
        sampled = {
            "exact_reachable_projected_area": float(attainable.mean()),
            "reference_support_projected_area": float(supported.mean()),
            "common_support_projected_area": float(common.mean()),
        }
        for field, value in sampled.items():
            assert abs(value - metrics[field]) < 0.008, (variant_key, field, value, metrics[field])
        if common.any():
            sampled["common_support_mean_absolute_intelligence_error"] = float(np.abs(exact_heights[common] - reference_heights[common]).mean())
            assert abs(sampled["common_support_mean_absolute_intelligence_error"] - metrics["common_support_mean_absolute_intelligence_error"]) < 0.1
            assert np.abs(exact_heights[common] - reference_heights[common]).max() <= metrics["common_support_maximum_absolute_intelligence_error"] + 1e-8
        results[variant_key] = sampled
    return {"resolution": resolution, "sample_count_per_variant": resolution ** 2, "method": "独立逐模型预算枚举与三角形重心插值，固定中点网格数值复核", "metric_variants": results}


def _canvas_pixel_statistics(page, viewport_index):
    return page.locator(".viewport canvas").nth(viewport_index).evaluate("""canvas => {
      const context = canvas.getContext('webgl2');
      const pixels = new Uint8Array(canvas.width * canvas.height * 4);
      context.readPixels(0, 0, canvas.width, canvas.height, context.RGBA, context.UNSIGNED_BYTE, pixels);
      let bluePixelCount = 0, redPixelCount = 0, nonwhitePixelCount = 0;
      for (let index = 0; index < pixels.length; index += 4) {
        const [red, green, blue] = pixels.slice(index, index + 3);
        if (blue > red + 12 && blue > green + 2) bluePixelCount++;
        if (red > green + 20 && red > blue + 20) redPixelCount++;
        if (Math.min(red, green, blue) < 235) nonwhitePixelCount++;
      }
      return {bluePixelCount, redPixelCount, nonwhitePixelCount};
    }""")


def _hover_visible_model(page):
    candidates = page.evaluate("window.frontierGeometryComparisonDiagnostics.projectedModelPositions(0)")
    bounds = page.locator("#comparison-exact-viewport").bounding_box()
    for candidate in candidates:
        if not (5 < candidate["x"] < bounds["width"] - 5 and 5 < candidate["y"] < bounds["height"] - 5 and -1 < candidate["depth"] < 1):
            continue
        page.mouse.move(bounds["x"] + candidate["x"], bounds["y"] + candidate["y"])
        state = _snapshot(page)
        if state["hoveredModelName"]:
            assert all(viewport["highlightedModelName"] == state["hoveredModelName"] for viewport in state["viewports"])
            assert page.locator("#comparison-hover-name").inner_text() == state["hoveredModelName"]
            return state["hoveredModelName"]
    raise AssertionError("没有通过真实指针命中任何可见模型")


def _assert_linked_cameras(state):
    first, second = state["viewports"]
    for field in ("cameraPosition", "cameraTarget"):
        assert max(abs(left - right) for left, right in zip(first[field], second[field])) < 1e-8


def _open_observed_page(browser, html_path, errors, external_requests):
    page = browser.new_page(viewport={"width": 1440, "height": 1080})
    page.on("pageerror", lambda error: errors.append(str(error)))
    def block_external_request(route):
        external_requests.append(route.request.url)
        route.abort()
    page.route("https://**/*", block_external_request)
    page.route("http://**/*", block_external_request)
    page.goto(html_path.resolve().as_uri(), wait_until="load")
    page.wait_for_function("window.frontierGeometryComparisonDiagnostics !== undefined")
    _render_frame(page)
    assert page.locator("#comparison-runtime-error").is_hidden()
    return page


def verify_comparison_demo(html_path, verification_directory):
    verification_directory.mkdir(parents=True, exist_ok=True)
    observed_errors, external_requests = [], []
    report = {"html": str(html_path.resolve()), "checks": [], "runtime_errors": observed_errors, "external_requests": external_requests}
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = _open_observed_page(browser, html_path, observed_errors, external_requests)
        try:
            initial_state = _snapshot(page)
            assert page.locator(".viewport canvas").count() == 2
            _assert_linked_cameras(initial_state)
            first_pixels = [_canvas_pixel_statistics(page, index) for index in (0, 1)]
            assert all(pixels["nonwhitePixelCount"] > 1000 for pixels in first_pixels)
            report["initial_pixel_statistics"] = first_pixels
            comparison_dataset = json.loads(page.locator("#frontier-geometry-comparison-dataset").text_content())
            report["independent_midpoint_metric_crosscheck"] = _independent_midpoint_metric_crosscheck(comparison_dataset)
            report["checks"].append("四口径指标以每口径 160000 个独立预算查询数值对拍")

            variant_keys = page.locator("#comparison-metric-variant option").evaluate_all("options => options.map(option => option.value)")
            assert len(variant_keys) == 4
            for _ in range(2):
                for variant_key in variant_keys:
                    page.locator("#comparison-metric-variant").select_option(variant_key)
                    _render_frame(page)
                    state = _snapshot(page)
                    _assert_linked_cameras(state)
                    assert state["activeVariantKey"] == variant_key
                    assert state["hoveredModelName"] is None
                    assert page.locator("thead .selected-variant-column").count() == 1
                    assert all(viewport["rendererGeometryCount"] <= 8 for viewport in state["viewports"])
            report["checks"].append("四口径切换、清理悬浮、同列高亮及多轮切换资源回收")

            page.locator("#comparison-metric-variant").select_option(initial_state["activeVariantKey"])
            _render_frame(page)
            hovered_name = _hover_visible_model(page)
            report["hovered_model_name"] = hovered_name
            report["checks"].append("真实指针悬浮、两侧同模型高亮及安全文本显示")

            bounds = page.locator("#comparison-reference-viewport").bounding_box()
            page.mouse.move(bounds["x"] + bounds["width"] * 0.5, bounds["y"] + bounds["height"] * 0.5)
            page.mouse.down()
            page.mouse.move(bounds["x"] + bounds["width"] * 0.65, bounds["y"] + bounds["height"] * 0.55, steps=12)
            page.mouse.up()
            _render_frame(page)
            rotated_state = _snapshot(page)
            _assert_linked_cameras(rotated_state)
            assert max(abs(left - right) for left, right in zip(rotated_state["viewports"][0]["cameraPosition"], initial_state["viewports"][0]["cameraPosition"])) > 0.1
            page.mouse.wheel(0, 180)
            _render_frame(page)
            _assert_linked_cameras(_snapshot(page))
            page.locator("#comparison-reset-camera").click()
            _render_frame(page)
            reset_state = _snapshot(page)
            _assert_linked_cameras(reset_state)
            assert max(abs(left - right) for left, right in zip(reset_state["viewports"][0]["cameraPosition"], initial_state["viewports"][0]["cameraPosition"])) < 1e-8
            report["checks"].append("从参照视图拖拽、滚轮缩放同步及双视角复位")

            solid_pixels = _canvas_pixel_statistics(page, 1)
            page.locator("#comparison-reference-wireframe-only").check()
            _render_frame(page)
            wireframe_pixels = _canvas_pixel_statistics(page, 1)
            assert solid_pixels["bluePixelCount"] > wireframe_pixels["bluePixelCount"] + 100
            assert _snapshot(page)["viewports"][0]["surfaceVisible"]
            page.locator("#comparison-reference-wireframe-only").uncheck()
            _render_frame(page)
            before_highlight = _canvas_pixel_statistics(page, 1)
            page.locator("#comparison-highlight-reverse-triangles").check()
            _render_frame(page)
            after_highlight = _canvas_pixel_statistics(page, 1)
            assert after_highlight["redPixelCount"] > before_highlight["redPixelCount"] + 100
            page.screenshot(path=str(verification_directory / "comparison-desktop-reverse-triangles.png"), full_page=True)
            page.locator("#comparison-highlight-reverse-triangles").uncheck()
            report["checks"].append("像素断言：实心/线框切换与反向面红色标记实际改变画布")
            report["rendering_pixel_statistics"] = {"solid": solid_pixels, "wireframe": wireframe_pixels, "before_reverse": before_highlight, "after_reverse": after_highlight}

            for width, height in [(1440, 1080), (768, 1024), (390, 844)]:
                page.set_viewport_size({"width": width, "height": height})
                _render_frame(page)
                assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1")
                first = page.locator("[data-comparison-pane=exact]").bounding_box()
                second = page.locator("[data-comparison-pane=reference]").bounding_box()
                if width > 960:
                    assert abs(first["y"] - second["y"]) < 1 and second["x"] > first["x"]
                else:
                    assert second["y"] >= first["y"] + first["height"]
                assert page.locator(".metrics-scroll-region").evaluate("element => element.scrollWidth > element.clientWidth") == (width < 820)
                page.screenshot(path=str(verification_directory / f"comparison-width-{width}.png"), full_page=True)
            report["checks"].append("1440/768/390 响应式布局、表格独立横滚与截图")

            # 合成的恶意模型名和空分析集，不修改真实快照与共享数据。
            fixture_dataset = build_frontier_3d_visualization_dataset(build_frontier_3d_synthetic_fixture_models_dataframe(), since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log")
            fixture_dataset = json.loads(json.dumps(fixture_dataset, cls=PlotlyJSONEncoder))
            injection_text = '</script><img src="https://example.invalid/injected" onerror="window.injected=1">'
            for fixture_variant in fixture_dataset["metric_variants"].values():
                for index, model in enumerate(fixture_variant["three_dimensional_scene"]["displayed_model_markers"]):
                    model["name"] = f"合成模型{index} {injection_text}"
            empty_key = list(fixture_dataset["metric_variants"])[-1]
            empty_scene = fixture_dataset["metric_variants"][empty_key]["three_dimensional_scene"]
            for model in empty_scene["displayed_model_markers"]:
                model["analysis_eligibility"]["is_analysis_eligible_for_current_metric_variant"] = False
                model["panel"]["layer"] = None
            for key in empty_scene["pareto_frontier_surface_triangle_mesh"]:
                empty_scene["pareto_frontier_surface_triangle_mesh"][key] = []
            fixture_source = verification_directory / "adversarial-and-empty-analysis-source-dataset.json"
            fixture_source.write_text(json.dumps(fixture_dataset), encoding="utf-8")
            fixture_artifacts = write_geometry_comparison_artifacts(fixture_source, verification_directory / "adversarial-and-empty-analysis-comparison")
            fixture_page = _open_observed_page(browser, fixture_artifacts["html"], observed_errors, external_requests)
            malicious_hover_name = _hover_visible_model(fixture_page)
            assert injection_text in malicious_hover_name
            assert not fixture_page.evaluate("Boolean(window.injected)")
            assert fixture_page.locator('img[src="https://example.invalid/injected"]').count() == 0
            fixture_page.locator("#comparison-metric-variant").select_option(empty_key)
            _render_frame(fixture_page)
            assert fixture_page.locator("#comparison-exact-empty").is_visible()
            assert fixture_page.locator("#comparison-reference-empty").is_visible()
            assert all(viewport["surfaceTriangleCount"] == 0 for viewport in _snapshot(fixture_page)["viewports"])
            fixture_page.screenshot(path=str(verification_directory / "comparison-empty-analysis.png"), full_page=True)
            fixture_page.close()
            report["checks"].append("恶意字符串不执行、不请求网络；空分析集双侧空态正常显示")
            assert observed_errors == []
            assert external_requests == []
            report["status"] = "passed"
        except Exception as error:
            report["status"] = "failed"
            report["failure"] = str(error)
            page.screenshot(path=str(verification_directory / "comparison-verification-failure.png"), full_page=True)
            raise
        finally:
            (verification_directory / "browser-verification-report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            browser.close()
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--html", type=Path, required=True)
    parser.add_argument("--verification-artifact-directory", type=Path)
    arguments = parser.parse_args()
    destination = arguments.verification_artifact_directory or arguments.html.parent / "browser-verification"
    report = verify_comparison_demo(arguments.html, destination)
    print(f"独立比较页浏览器验证通过：{len(report['checks'])} 组；证据：{destination.resolve()}")


if __name__ == "__main__":
    main()
