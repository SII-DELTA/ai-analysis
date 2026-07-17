"""Frontier 3D three.js 端到端 headless 交互验证。"""
from __future__ import annotations

import math
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
HTML_PATH = (
    Path(sys.argv[1])
    if len(sys.argv) > 1
    else REPOSITORY_ROOT / "output" / "frontier_3d.html"
).resolve()


def _camera_distance(left: list[float], right: list[float]) -> float:
    return math.sqrt(sum((a - b) ** 2 for a, b in zip(left, right)))


def main() -> int:
    assert HTML_PATH.exists(), f"找不到 HTML: {HTML_PATH}"
    failures: list[str] = []

    def check(condition: bool, message: str) -> None:
        print(("  ✓ " if condition else "  ✗ ") + message)
        if not condition:
            failures.append(message)

    with sync_playwright() as playwright:
        try:
            browser = playwright.chromium.launch(headless=True, channel="chromium")
        except Exception:
            browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1400, "height": 900})
        runtime_errors: list[str] = []
        external_network_requests: list[str] = []
        page.on("pageerror", lambda error: runtime_errors.append(str(error)))
        page.on(
            "request",
            lambda request: external_network_requests.append(request.url)
            if request.url.startswith(("http://", "https://"))
            else None,
        )
        page.goto(HTML_PATH.as_uri())
        page.wait_for_function(
            "() => window.aaState && window.aaState().interactiveRenderer === 'threejs'",
            timeout=30000,
        )

        print("\n[1] three.js 注入与模型身份层")
        initial_state = page.evaluate("() => window.aaState()")
        check(initial_state["interactiveRenderer"] == "threejs", "交互渲染器 = three.js")
        check(initial_state["displayedModelMarkerCount"] > 0, "存在显示模型")
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
        page.wait_for_function("() => window.aaState().countryRegionMarkerVisible")
        country_state = page.evaluate("() => window.aaState()")
        check(
            country_state["countryRegionMarkerCount"]
            == country_state["displayedModelMarkerCount"],
            "开启后每个显示模型都有国别外框",
        )
        check(page.locator("#aa-country-region-legend").is_visible(), "开启时国别图例可见")
        legend_text = page.locator("#aa-country-region-legend").inner_text()
        check(all(label in legend_text for label in ("中国", "美国", "其他")), "图例覆盖三类地区")
        page.locator("#aa-country-region-marker-toggle").uncheck()
        check(page.evaluate("() => !window.aaState().countryRegionMarkerVisible"), "国别外框可关闭")

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
                "([costMetric, speedMetric]) => window.aaSetMetricCombination(costMetric, speedMetric)",
                [cost_metric, speed_metric],
            )
            page.wait_for_function(
                "expectedKey => window.aaState().activeMetricKey === expectedKey",
                arg=f"{cost_metric}__{speed_metric}",
            )
            state = page.evaluate("() => window.aaState()")
            check(state["costAxisField"] == expected_cost_field, f"{state['activeMetricKey']} 成本字段正确")
            check(state["speedAxisField"] == expected_speed_field, f"{state['activeMetricKey']} 速度字段正确")
            check(state["displayedModelMarkerCount"] > 0, f"{state['activeMetricKey']} 有模型")
            check(
                _camera_distance(camera_before_metric_switch, state["cameraPosition"]) < 1e-8,
                f"{state['activeMetricKey']} 切换后保留相机",
            )
        page.evaluate("() => window.aaSetMetricCombination('effective', 'effective')")
        page.wait_for_function("() => window.aaState().activeMetricKey === 'effective__effective'")

        print("\n[4] 真实拖拽旋转后，hover / pin / 切指标不重置相机")
        canvas = page.locator("canvas[data-frontier-threejs-canvas]")
        canvas_box = canvas.bounding_box()
        assert canvas_box is not None
        camera_before_drag = page.evaluate("() => window.aaState().cameraPosition")
        drag_start_x = canvas_box["x"] + canvas_box["width"] * 0.55
        drag_start_y = canvas_box["y"] + canvas_box["height"] * 0.45
        page.mouse.move(drag_start_x, drag_start_y)
        page.mouse.down()
        page.mouse.move(drag_start_x + 150, drag_start_y + 75, steps=10)
        page.mouse.up()
        camera_after_drag = page.evaluate("() => window.aaState().cameraPosition")
        check(_camera_distance(camera_before_drag, camera_after_drag) > 0.05, "真实拖拽改变相机")

        lineage_pick = page.evaluate(
            """() => {
              const relationships = window.LINEAGE_DATA;
              for (const [base, indices] of Object.entries(relationships.base_groups)) {
                const model = relationships.models[indices[0]];
                const lineage = relationships.lineages[model.lineage_key];
                if (lineage && lineage.length >= 2) return {base, name: model.name, variants: indices.length};
              }
              return null;
            }"""
        )
        assert lineage_pick is not None
        page.evaluate("name => window.aaShowLineageForName(name)", lineage_pick["name"])
        page.wait_for_function("() => window.aaState().lineageLen > 0")
        hover_state = page.evaluate("() => window.aaState()")
        check(hover_state["hoverKey"] is not None, "hover 显示谱系")
        check(
            _camera_distance(camera_after_drag, hover_state["cameraPosition"]) < 1e-8,
            "hover 谱系不重置相机",
        )
        page.evaluate("() => window.aaClearHover()")
        check(page.evaluate("() => window.aaState().lineageLen === 0"), "清除 hover 后谱系消失")

        page.evaluate("base => window.aaPinBase(base)", lineage_pick["base"])
        pinned_state = page.evaluate("() => window.aaState()")
        check(lineage_pick["base"] in pinned_state["pinned"], "pin 保存基模型")
        check(
            pinned_state["highlightLen"] == lineage_pick["variants"],
            "pin 高亮覆盖全部 reasoning 档位",
        )
        check(pinned_state["lineageLen"] > 0, "pin 常显谱系")
        check(
            _camera_distance(camera_after_drag, pinned_state["cameraPosition"]) < 1e-8,
            "pin 不重置相机",
        )
        check(page.locator("#aa-pinned-panel").is_visible(), "pin 详情卡在右栏可见")
        page.evaluate("base => window.aaUnpinBase(base)", lineage_pick["base"])
        check(page.evaluate("() => window.aaState().highlightLen === 0"), "unpin 清除高亮")

        print("\n[5] 搜索、厂商过滤、前沿外观")
        search_token = lineage_pick["base"].split()[0]
        page.locator("#aa-search-input").fill(search_token)
        page.wait_for_timeout(50)
        check(page.locator("#aa-search-results .aa-result-row").count() > 0, "搜索返回基模型")
        page.locator("#aa-organization-filter-panel").evaluate("element => element.open = true")
        first_organization_checkbox = page.locator(
            ".aa-organization-filter-row input[type=checkbox]"
        ).first
        first_organization_checkbox.uncheck()
        filtered_state = page.evaluate("() => window.aaState()")
        check(
            filtered_state["visibleOrganizationCount"]
            == filtered_state["organizationCount"] - 1,
            "厂商 checkbox 隐藏一个厂商",
        )
        first_organization_checkbox.check()
        check(
            page.evaluate(
                "() => window.aaState().visibleOrganizationCount === window.aaState().organizationCount"
            ),
            "厂商 checkbox 可恢复",
        )

        page.evaluate("() => window.aaSetFrontierStyle('solid')")
        check(page.evaluate("() => window.aaState().frontierStyle === 'solid'"), "切换实心前沿")
        page.evaluate("() => window.aaSetFrontierStyle('hidden')")
        check(page.evaluate("() => window.aaState().frontierStyle === 'hidden'"), "隐藏前沿")
        page.evaluate("() => window.aaSetAchievableSurfaceVisible(true)")
        state_with_surface = page.evaluate("() => window.aaState()")
        check(state_with_surface["achievableSurfaceVisible"] is True, "可达前沿曲面独立开启")
        check(state_with_surface["frontierStyle"] == "hidden", "可达曲面不改变主前沿状态")
        page.evaluate("() => window.aaSetAchievableSurfaceVisible(false)")
        page.evaluate("() => window.aaSetFrontierStyle('wireframe')")

        print("\n[6] 突出度排名与权重")
        default_ranking = page.evaluate("() => window.aaStandoutRanking()")
        check(default_ranking["metric"] == "C", "默认突出度 = 趋势残差")
        check(page.locator("#aa-standout-weight-controls").is_hidden(), "非加权口径隐藏权重控件")
        check(len(default_ranking["ranking"]) == initial_state["frontierCount"], "排行覆盖全部前沿模型")
        page.evaluate("() => window.aaSelectStandoutMetric('A')")
        check(page.locator("#aa-standout-weight-controls").is_visible(), "加权超体积显示权重控件")
        weighted_ranking_before = page.evaluate("() => window.aaStandoutRanking()")
        page.evaluate("() => window.aaSetWeights(4, 1, 1)")
        weighted_ranking_after = page.evaluate("() => window.aaStandoutRanking()")
        check(weighted_ranking_after["weights"]["intelligence"] == 4, "智能权重更新为 4")
        check(
            [row["name"] for row in weighted_ranking_before["ranking"]]
            != [row["name"] for row in weighted_ranking_after["ranking"]],
            "权重变化会重排前沿模型",
        )
        check(
            _camera_distance(camera_after_drag, page.evaluate("() => window.aaState().cameraPosition"))
            < 1e-8,
            "突出度与权重操作不重置相机",
        )

        print("\n[7] 侧栏、自包含与运行时健康")
        page.locator("#aa-side-panel-toggle").click()
        check(page.evaluate("() => !window.aaState().sidePanelExpanded"), "右栏可收起")
        page.locator("#aa-side-panel-toggle").click()
        check(page.evaluate("() => window.aaState().sidePanelExpanded"), "右栏可展开")
        check(external_network_requests == [], "自包含 HTML 无外部网络请求")
        check(runtime_errors == [], f"无 JS 运行时错误（{runtime_errors}）")
        browser.close()

    if failures:
        print(f"\n❌ {len(failures)} 项失败")
        return 1
    print("\n✅ 全部通过")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
