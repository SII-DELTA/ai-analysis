"""Frontier 3D three.js 端到端 headless 交互验证。"""
from __future__ import annotations

import json
import math
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

from tests.browser_playwright.frontier_3d_playwright_verification_support import (
    create_frontier_3d_test_page_with_runtime_observation,
    launch_requested_frontier_3d_test_browser,
)

REPOSITORY_ROOT = Path(__file__).resolve().parents[2]
from src.frontier_3d_worktree_storage_paths import resolve_frontier_3d_storage_paths
HTML_PATH = (
    Path(sys.argv[1])
    if len(sys.argv) > 1
    else resolve_frontier_3d_storage_paths().output_html_path
).resolve()


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


def _wait_for_two_animation_frames(page) -> None:
    page.evaluate(
        "() => new Promise(resolve => "
        "requestAnimationFrame(() => requestAnimationFrame(resolve)))"
    )


def _activate_metric_variant(page, metric_variant_key: str) -> None:
    page.evaluate(
        "key => window.setFrontierMetricCombination(...key.split('__'))",
        metric_variant_key,
    )
    page.wait_for_function(
        "expectedKey => window.frontierThreeDimensionalVisualizationState()"
        ".activeMetricVariantKey === expectedKey",
        arg=metric_variant_key,
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

        # 复验风险 2：真实数据里「投影最孤立」的被剪枝前身仍可能被近邻标记遮挡（S2：o3 与 Claude
        # Opus 4.6 只差约 9px，悬停命中后者而超时）。改为逐条谱系尝试：程序化 pin 该谱系的基模型让前身
        # 显示，用与真实悬停相同的射线拾取（frontmost 命中校验）找出能被悬停真正命中的前身；
        # 都找不到才失败，并打印每条谱系每个前身最前面命中的是谁。
        lineage_pick_candidates = page.evaluate(
            """() => {
              const relationships = window.FRONTIER_3D_INTERACTION_RELATIONSHIPS;
              const diagnostics = window.frontierThreeDimensionalRendererDiagnostics;
              const candidates = [];
              const seenLineageKeys = new Set();
              for (const projectedModel of relationships.models) {
                const frontmostInteraction =
                  diagnostics.frontmostPointerInteractionAtProjectedModelPosition(
                    projectedModel.name,
                  );
                if (!frontmostInteraction) continue;
                const lineageKey = frontmostInteraction.frontmostLineageKey;
                if (seenLineageKeys.has(lineageKey)) continue;
                const lineage = relationships.lineages[lineageKey];
                if (!lineage || lineage.length < 2 || !lineage.some((node) => !node.kept)) continue;
                seenLineageKeys.add(lineageKey);
                const baseModelName = frontmostInteraction.frontmostBaseModelName;
                candidates.push({
                  base: baseModelName,
                  name: frontmostInteraction.frontmostModelName,
                  lineageKey,
                  variants: relationships.base_groups[baseModelName].length,
                  projectedModelPosition: frontmostInteraction.projectedCanvasPosition,
                });
              }
              return candidates;
            }"""
        )
        lineage_pick = None
        frontmost_hit_check_diagnostics = []
        for lineage_pick_candidate in lineage_pick_candidates:
            page.evaluate(
                "baseModelName => window.pinFrontierBaseModel(baseModelName)",
                lineage_pick_candidate["base"],
            )
            _wait_for_two_animation_frames(page)
            hoverable_pruned_ancestor_check = page.evaluate(
                """lineageKey => {
                  const relationships = window.FRONTIER_3D_INTERACTION_RELATIONSHIPS;
                  const diagnostics = window.frontierThreeDimensionalRendererDiagnostics;
                  const displayedModelPositions = relationships.models
                    .map((model) => diagnostics.projectedCanvasPositionForModelName(model.name))
                    .filter(Boolean);
                  const prunedAncestorChecks = (relationships.lineages[lineageKey] || [])
                    .filter((node) => !node.kept)
                    .map((node) => ({
                      name: node.name,
                      frontmostCheck:
                        diagnostics.frontmostPointerInteractionAtProjectedPrunedLineageAncestorPosition(
                          node.name,
                        ),
                    }))
                    .filter((candidate) => candidate.frontmostCheck);
                  for (const candidate of prunedAncestorChecks) {
                    const position = candidate.frontmostCheck.projectedCanvasPosition;
                    candidate.nearestOtherDistance = Math.min(
                      Infinity,
                      ...prunedAncestorChecks
                        .filter((other) => other.name !== candidate.name)
                        .map((other) => other.frontmostCheck.projectedCanvasPosition)
                        .concat(displayedModelPositions)
                        .map((other) => Math.hypot(other.clientX - position.clientX, other.clientY - position.clientY)),
                    );
                  }
                  // 同一谱系里优先取投影最孤立、且 frontmost 命中的正是它自己的前身
                  prunedAncestorChecks.sort((left, right) => right.nearestOtherDistance - left.nearestOtherDistance);
                  const hoverablePrunedAncestor = prunedAncestorChecks.find(
                    (candidate) => candidate.frontmostCheck.frontmostInteractionTargetIsRequestedPrunedLineageAncestor,
                  );
                  return {
                    hoverablePrunedAncestor: hoverablePrunedAncestor
                      ? {
                          name: hoverablePrunedAncestor.name,
                          position: hoverablePrunedAncestor.frontmostCheck.projectedCanvasPosition,
                          nearestOtherDistance: hoverablePrunedAncestor.nearestOtherDistance,
                        }
                      : null,
                    occludedPrunedAncestors: prunedAncestorChecks
                      .filter((candidate) => !candidate.frontmostCheck.frontmostInteractionTargetIsRequestedPrunedLineageAncestor)
                      .map((candidate) => ({
                        name: candidate.name,
                        frontmostInteractionTargetName: candidate.frontmostCheck.frontmostInteractionTargetName,
                        nearestOtherDistance: candidate.nearestOtherDistance,
                      })),
                  };
                }""",
                lineage_pick_candidate["lineageKey"],
            )
            page.evaluate(
                "baseModelName => window.unpinFrontierBaseModel(baseModelName)",
                lineage_pick_candidate["base"],
            )
            page.evaluate("() => window.clearFrontierHoverState()")
            frontmost_hit_check_diagnostics.append(
                {"lineageKey": lineage_pick_candidate["lineageKey"], **hoverable_pruned_ancestor_check}
            )
            if hoverable_pruned_ancestor_check["hoverablePrunedAncestor"] is not None:
                lineage_pick = {
                    **lineage_pick_candidate,
                    "prunedAncestorName": hoverable_pruned_ancestor_check["hoverablePrunedAncestor"]["name"],
                    "hoverablePrunedAncestor": hoverable_pruned_ancestor_check["hoverablePrunedAncestor"],
                }
                break
        if lineage_pick is None:
            print("    frontmost 命中校验诊断（每条谱系每个被剪枝前身最前面命中的是谁）：")
            for frontmost_hit_check_diagnostic in frontmost_hit_check_diagnostics:
                print(f"      {json.dumps(frontmost_hit_check_diagnostic, ensure_ascii=False)}")
        check(
            lineage_pick is not None,
            f"逐条谱系做 frontmost 命中校验，找到能被悬停真正命中的被剪枝前身（尝试 {len(frontmost_hit_check_diagnostics)} 条谱系）",
        )
        assert lineage_pick is not None
        # W3 固定对比栏会改变画布高度，解除临时固定后重新取当前投影。
        _wait_for_two_animation_frames(page)
        projected_model_position = page.evaluate(
            "name => window.frontierThreeDimensionalRendererDiagnostics.projectedCanvasPositionForModelName(name)",
            lineage_pick["name"],
        )
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
        # 前身可能覆盖中心，选择当前仍能拾取到目标模型的实际可见位置。
        projected_model_position = page.evaluate(
            """name => {
              const d=window.frontierThreeDimensionalRendererDiagnostics;
              const center=d.projectedCanvasPositionForModelName(name);
              const radius=d.projectedCanvasMarkerRadiiForModelName(name).whiteBackplateRadius*.85;
              for (const [dx,dy] of [[0,0],[1,0],[-1,0],[0,1],[0,-1]]) {
                const point={clientX:center.clientX+dx*radius,clientY:center.clientY+dy*radius};
                const target=d.pointerInteractionAtCanvasClientCoordinates(point.clientX,point.clientY);
                if(target?.interactionTargetKind==='displayed_model' && FRONTIER_3D_INTERACTION_RELATIONSHIPS.models[target.modelIndex].name===name)return point;
              }
              return null;
            }""",
            lineage_pick["name"],
        )
        assert projected_model_position, "所选谱系模型没有可点击的可见位置"
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
        # 前身已在上面按 frontmost 命中校验选定（同谱系里投影最孤立且能被真正命中者）；pin 后再取一次
        # 投影位置（相机未变，应与校验时一致）。
        _wait_for_two_animation_frames(page)
        most_isolated_pruned_ancestor = {
            **lineage_pick["hoverablePrunedAncestor"],
            "position": page.evaluate(
                "ancestorName => window.frontierThreeDimensionalRendererDiagnostics"
                ".projectedCanvasPositionForPrunedLineageAncestorName(ancestorName)",
                lineage_pick["prunedAncestorName"],
            )
            or lineage_pick["hoverablePrunedAncestor"]["position"],
        }
        print(
            "    被剪枝前身取 frontmost 命中校验通过、投影最孤立者："
            f"{most_isolated_pruned_ancestor['name']}"
            f"（谱系 {lineage_pick['lineageKey']}，最近邻 {most_isolated_pruned_ancestor['nearestOtherDistance']:.1f}px）"
        )
        projected_pruned_ancestor_position = most_isolated_pruned_ancestor["position"]
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
        browser.close()

    if failures:
        print(f"\n❌ {len(failures)} 项失败")
        return 1
    print("\n✅ 全部通过")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
