"""Frontier 3D three.js 端到端 headless 交互验证。"""
from __future__ import annotations

import math
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

from frontier_3d_playwright_verification_support import (
    create_frontier_3d_test_page_with_runtime_observation,
    launch_requested_frontier_3d_test_browser,
)

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
        browser = launch_requested_frontier_3d_test_browser(playwright)
        page, browser_runtime_observation = (
            create_frontier_3d_test_page_with_runtime_observation(browser)
        )
        page.goto(HTML_PATH.as_uri())
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
        check(
            initial_state["paretoFrontierSurfaceWritesDepth"] is True
            and initial_state["achievableFrontierSurfaceWritesDepth"] is True,
            "前沿曲面均写入深度缓冲",
        )
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
            check(state["displayedModelMarkerCount"] > 0, f"{active_metric_variant_key} 有模型")
            check(
                _camera_distance(camera_before_metric_switch, state["cameraPosition"]) < 1e-8,
                f"{active_metric_variant_key} 切换后保留相机",
            )
        page.evaluate(
            "() => window.setFrontierMetricCombination('effective', 'effective')"
        )
        page.wait_for_function(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".activeMetricVariantKey === 'effective__effective'"
        )

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

        lineage_pick = page.evaluate(
            """() => {
              const relationships = window.FRONTIER_3D_INTERACTION_RELATIONSHIPS;
              const diagnostics = window.frontierThreeDimensionalRendererDiagnostics;
              for (const projectedModel of relationships.models) {
                const frontmostInteraction =
                  diagnostics.frontmostPointerInteractionAtProjectedModelPosition(
                    projectedModel.name,
                  );
                if (!frontmostInteraction) continue;
                const lineage =
                  relationships.lineages[frontmostInteraction.frontmostLineageKey];
                const prunedAncestor = lineage?.find((node) => !node.kept);
                if (lineage && lineage.length >= 2 && prunedAncestor) {
                  const baseModelName = frontmostInteraction.frontmostBaseModelName;
                  return {
                    base: baseModelName,
                    name: frontmostInteraction.frontmostModelName,
                    lineageKey: frontmostInteraction.frontmostLineageKey,
                    variants: relationships.base_groups[baseModelName].length,
                    prunedAncestorName: prunedAncestor.name,
                    projectedModelPosition:
                      frontmostInteraction.projectedCanvasPosition,
                  };
                }
              }
              return null;
            }"""
        )
        assert lineage_pick is not None
        projected_model_position = lineage_pick["projectedModelPosition"]
        page.mouse.move(
            projected_model_position["clientX"],
            projected_model_position["clientY"],
        )
        page.wait_for_function(
            "expectedLineageKey => "
            "window.frontierThreeDimensionalVisualizationState()"
            ".hoveredLineageKey === expectedLineageKey",
            arg=lineage_pick["lineageKey"],
        )
        hover_state = page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
        )
        check(
            hover_state["displayedLineageSegmentEndpointCount"] > 0,
            "真实鼠标 hover 显示谱系",
        )
        check(
            hover_state["displayedPrunedLineageAncestorMarkerCount"] > 0,
            "谱系显示被裁剪的历代前身 marker",
        )
        check(
            _camera_distance(camera_after_drag, hover_state["cameraPosition"]) < 1e-8,
            "hover 谱系不重置相机",
        )
        page.mouse.click(
            projected_model_position["clientX"],
            projected_model_position["clientY"],
        )
        page.wait_for_function(
            "expectedBaseModelName => "
            "window.frontierThreeDimensionalVisualizationState()"
            ".pinnedBaseModelNames.includes(expectedBaseModelName)",
            arg=lineage_pick["base"],
        )
        pinned_state = page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
        )
        check(
            lineage_pick["base"] in pinned_state["pinnedBaseModelNames"],
            "真实鼠标 click pin 保存基模型",
        )
        check(
            pinned_state["pinnedModelMarkerCount"] == lineage_pick["variants"],
            "pin 高亮覆盖全部 reasoning 档位",
        )
        check(
            pinned_state["displayedLineageSegmentEndpointCount"] > 0,
            "pin 常显谱系",
        )
        check(
            _camera_distance(camera_after_drag, pinned_state["cameraPosition"]) < 1e-8,
            "pin 不重置相机",
        )
        check(page.locator("#aa-pinned-panel").is_visible(), "pin 详情卡在右栏可见")
        projected_pruned_ancestor_position = page.evaluate(
            "name => window.frontierThreeDimensionalRendererDiagnostics"
            ".projectedCanvasPositionForPrunedLineageAncestorName(name)",
            lineage_pick["prunedAncestorName"],
        )
        assert projected_pruned_ancestor_position is not None
        page.mouse.move(
            projected_pruned_ancestor_position["clientX"],
            projected_pruned_ancestor_position["clientY"],
        )
        page.wait_for_function(
            "expectedAncestorName => "
            "window.frontierThreeDimensionalVisualizationState()"
            ".hoveredPrunedLineageAncestorName === expectedAncestorName",
            arg=lineage_pick["prunedAncestorName"],
        )
        check(
            page.locator("#aa-threejs-model-tooltip").is_visible(),
            "真实鼠标 hover 被裁剪前身时显示详情",
        )
        page.evaluate("() => window.clearFrontierHoverState()")
        page.evaluate(
            "baseModelName => window.unpinFrontierBaseModel(baseModelName)",
            lineage_pick["base"],
        )
        check(
            page.evaluate(
                "() => window.frontierThreeDimensionalVisualizationState()"
                ".pinnedModelMarkerCount === 0"
            ),
            "unpin 清除高亮",
        )
        check(
            page.evaluate(
                "() => window.frontierThreeDimensionalVisualizationState()"
                ".displayedLineageSegmentEndpointCount === 0"
            ),
            "清除 hover 与 pin 后谱系消失",
        )

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
            == initial_state["paretoFrontierModelCount"],
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
        check(
            [row["name"] for row in weighted_ranking_before["ranking"]]
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
        browser.close()

    if failures:
        print(f"\n❌ {len(failures)} 项失败")
        return 1
    print("\n✅ 全部通过")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
