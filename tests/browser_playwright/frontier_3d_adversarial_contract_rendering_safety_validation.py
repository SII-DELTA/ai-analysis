"""Frontier 3D 前端防御分支的浏览器级回归（R2-F9）：恶意字符串转义、非有限坐标与越界索引兜底。

两类合成契约，全部由 tests/fixtures 的合成模型表构建（不读 data/、output/，不联网）：

1. 恶意字符串契约（经 Python 渲染器与契约校验正常渲染）：模型名 / 厂商名里放
   `</script><img onerror>`、`<!--`、`{{REPORT_CSS}}`、U+2028/U+2029。逐个悬停全部口径的全部标记、
   pin 全部基模型、搜索、打开「如何阅读」，断言没有任何注入的元素或脚本执行，且名字按原文显示。
   该契约同时带「内嵌目录分区被拒」告警文本（R1-03，也含恶意片段）：断言页头醒目显示一行告警、
   按原文显示且不注入元素；非有限注入契约的告警文本为 null，断言页头没有这行告警。
2. 非有限注入契约（绕过 Python 校验，直接改写 HTML 内嵌 JSON）：1e999、"NaN"、null、小数索引、
   越界索引、Plotly bdata 对象、谱系节点坏坐标。断言前端按口径计数、跳过坏几何、坏坐标的标记
   不显示不可拾取、pin 其基模型时连线不连到坏标记、页面没有运行时错误。

用法：
    python scripts/verify_frontier_3d_adversarial_contract_rendering_safety.py [frontier_3d.html]

给出 HTML 时，用该 HTML 内联的渲染器 bundle（验证「这份产物」的前端）；缺省用仓库当前 bundle。
"""
from __future__ import annotations

import copy
import hashlib
import json
import re
import sys
import tempfile
from pathlib import Path

REPOSITORY_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(REPOSITORY_ROOT))

from playwright.sync_api import sync_playwright  # noqa: E402

from tests.browser_playwright.frontier_3d_playwright_verification_support import (  # noqa: E402
    create_frontier_3d_test_page_with_runtime_observation,
    launch_requested_frontier_3d_test_browser,
)
from src.frontier_3d_self_contained_html_renderer import (  # noqa: E402
    _json_for_script_tag,
    render_frontier_3d_self_contained_html_report,
)
from src.frontier_3d_visualization_dataset_builder import (  # noqa: E402
    build_frontier_3d_visualization_dataset,
)
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import (  # noqa: E402
    build_frontier_3d_synthetic_fixture_models_dataframe,
)

ADVERSARIAL_SCRIPT_EXECUTION_COUNTER_GLOBAL_NAME = "__frontier3dAdversarialScriptExecutionCount"
ADVERSARIAL_SCRIPT_CLOSING_TAG_AND_IMAGE_ONERROR_TEXT = (
    '</script><img src="x" onerror="window.'
    + ADVERSARIAL_SCRIPT_EXECUTION_COUNTER_GLOBAL_NAME
    + "=(window."
    + ADVERSARIAL_SCRIPT_EXECUTION_COUNTER_GLOBAL_NAME
    + '||0)+1">'
)
ADVERSARIAL_MODEL_NAME_BY_SYNTHETIC_FIXTURE_MODEL_NAME = {
    "GPT-6 (high)": f"GPT-6 {ADVERSARIAL_SCRIPT_CLOSING_TAG_AND_IMAGE_ONERROR_TEXT} (high)",
    "GPT-6 mini": (
        "GPT-6 <!-- 注释开始 <script>window."
        + ADVERSARIAL_SCRIPT_EXECUTION_COUNTER_GLOBAL_NAME
        + "=99</script> mini"
    ),
    "Mistral Large 4": "Mistral {{REPORT_CSS}}{{VISUALIZATION_DATASET_JSON}} Large 4",
    "DeepSeek V5": "DeepSeek V5  &lt;b&gt;实体&amp;",
    "Claude Legacy 4 (Reasoning)": (
        f"Claude Legacy {ADVERSARIAL_SCRIPT_CLOSING_TAG_AND_IMAGE_ONERROR_TEXT} 4 (Reasoning)"
    ),
}
ADVERSARIAL_CREATOR_NAME_BY_SYNTHETIC_FIXTURE_MODEL_NAME = {
    "Future Lab Model": f"Future {ADVERSARIAL_SCRIPT_CLOSING_TAG_AND_IMAGE_ONERROR_TEXT} Lab",
}
EMBEDDED_RENDERER_BUNDLE_PATTERN = re.compile(
    r"<script>\n(?P<renderer_bundle_text>.*)\n  </script>\n</body>", re.DOTALL
)
EMBEDDED_VISUALIZATION_DATASET_JSON_PATTERN = re.compile(
    r'(<script id="frontier-3d-visualization-dataset-json" type="application/json">)(.*?)(</script>)',
    re.DOTALL,
)
RENDERER_BUNDLE_SHA256_META_PATTERN = re.compile(
    r'(<meta name="frontier-3d-renderer-bundle-sha256" content=")[0-9a-f]+(">)'
)
NON_FINITE_POSITIVE_INFINITY_PLACEHOLDER_TEXT = "__FRONTIER_3D_ADVERSARIAL_POSITIVE_INFINITY__"
# R1-03：没有被接受的内嵌目录分区时，契约顶层溯源带一行告警，前端页头醒目显示
EMBEDDED_MODEL_CATALOG_PARTITION_REJECTION_WARNING_ELEMENT_ID = (
    "aa-report-header-embedded-model-catalog-partition-rejection-warning"
)
ADVERSARIAL_EMBEDDED_MODEL_CATALOG_PARTITION_REJECTION_WARNING_TEXT = (
    "内嵌目录分区被拒（最佳候选 v4.3.2，2026-09-23：版本 family 4.3 ≠ API 版本 family 4.4"
    + ADVERSARIAL_SCRIPT_CLOSING_TAG_AND_IMAGE_ONERROR_TEXT
    + "），有效速度口径暂无当期可比点"
)


def _synthetic_fixture_dataset(models_dataframe) -> dict:
    return build_frontier_3d_visualization_dataset(
        models_dataframe,
        since_months=18,
        max_layers=3,
        hard_age_cutoff_months=36,
        speed_scale="log",
    )


def _adversarial_string_dataset() -> dict:
    models_dataframe = build_frontier_3d_synthetic_fixture_models_dataframe()
    for synthetic_model_name, adversarial_model_name in (
        ADVERSARIAL_MODEL_NAME_BY_SYNTHETIC_FIXTURE_MODEL_NAME.items()
    ):
        models_dataframe.loc[models_dataframe["name"] == synthetic_model_name, "name"] = (
            adversarial_model_name
        )
    for synthetic_model_name, adversarial_creator_name in (
        ADVERSARIAL_CREATOR_NAME_BY_SYNTHETIC_FIXTURE_MODEL_NAME.items()
    ):
        models_dataframe.loc[models_dataframe["name"] == synthetic_model_name, "creator"] = (
            adversarial_creator_name
        )
    dataset = _synthetic_fixture_dataset(models_dataframe)
    for variant in dataset["metric_variants"].values():
        current_view = variant["three_dimensional_scene"].setdefault("current_view", {})
        current_view["cost_metric_note"] = ADVERSARIAL_SCRIPT_CLOSING_TAG_AND_IMAGE_ONERROR_TEXT
        current_view["speed_metric_note"] = "<!-- 口径说明 -->{{REPORT_CSS}}"
    dataset["artificial_analysis_data_provenance"]["artificial_analysis_api_tier"] = (
        ADVERSARIAL_SCRIPT_CLOSING_TAG_AND_IMAGE_ONERROR_TEXT
    )
    dataset["artificial_analysis_data_provenance"]["embedded_model_catalog_partition_rejection_warning_text"] = (
        ADVERSARIAL_EMBEDDED_MODEL_CATALOG_PARTITION_REJECTION_WARNING_TEXT
    )
    return dataset


def _html_with_renderer_bundle(html_text: str, renderer_bundle_text: str | None) -> str:
    if renderer_bundle_text is None:
        return html_text
    embedded_renderer_bundle_match = EMBEDDED_RENDERER_BUNDLE_PATTERN.search(html_text)
    assert embedded_renderer_bundle_match, "渲染出的 HTML 找不到内联渲染器脚本"
    html_text = (
        html_text[: embedded_renderer_bundle_match.start("renderer_bundle_text")]
        + renderer_bundle_text
        + html_text[embedded_renderer_bundle_match.end("renderer_bundle_text") :]
    )
    renderer_bundle_sha256 = hashlib.sha256(renderer_bundle_text.encode("utf-8")).hexdigest()
    return RENDERER_BUNDLE_SHA256_META_PATTERN.sub(
        lambda match: match.group(1) + renderer_bundle_sha256 + match.group(2), html_text
    )


def _non_finite_injected_html_and_expected_counts(renderer_bundle_text: str | None) -> tuple[str, dict]:
    """绕过 Python 契约校验：先正常渲染，再把改坏的契约 JSON 写回 HTML 的数据块。"""
    dataset = _synthetic_fixture_dataset(build_frontier_3d_synthetic_fixture_models_dataframe())
    rendered_html_text = _html_with_renderer_bundle(
        render_frontier_3d_self_contained_html_report(
            dataset,
            generator_git_commit="unknown",
            rendered_at_utc="2026-09-23T00:00:00Z",
        ),
        renderer_bundle_text,
    )
    injected_dataset = copy.deepcopy(dataset)
    default_variant = injected_dataset["metric_variants"][injected_dataset["initial_variant_key"]]
    default_scene = default_variant["three_dimensional_scene"]
    displayed_model_markers = default_scene["displayed_model_markers"]
    base_groups = default_variant["interaction_relationships"].get("base_groups", {})
    multi_variant_base_model_name, multi_variant_model_indices = next(
        (base_model_name, model_indices)
        for base_model_name, model_indices in base_groups.items()
        if len(model_indices) >= 3
    )
    # 标记：多档位基模型的中间档 x=1e999（1 个）；另一个标记 y="NaN"、z=null（2 个）
    non_finite_marker_index = multi_variant_model_indices[1]
    displayed_model_markers[non_finite_marker_index]["x"] = NON_FINITE_POSITIVE_INFINITY_PLACEHOLDER_TEXT
    other_non_finite_marker_index = next(
        model_index
        for model_index in range(len(displayed_model_markers))
        if model_index not in multi_variant_model_indices
    )
    displayed_model_markers[other_non_finite_marker_index]["y"] = "NaN"
    displayed_model_markers[other_non_finite_marker_index]["z"] = None
    expected_counts = {
        "non_finite_marker_names": [
            displayed_model_markers[non_finite_marker_index]["name"],
            displayed_model_markers[other_non_finite_marker_index]["name"],
        ],
        "multi_variant_base_model_name_with_non_finite_marker": multi_variant_base_model_name,
        "non_finite_contract_coordinate_count": 3,
        "out_of_range_contract_triangle_vertex_index_count": 0,
        "skipped_invalid_contract_geometry_names": [],
    }
    # 实心面：1 个 1e999 坐标 + 1 个小数索引（非有限计 2）+ 1 个越界索引
    pareto_surface_mesh = default_scene["pareto_frontier_surface_triangle_mesh"]
    if pareto_surface_mesh["triangle_vertex_index_a"]:
        pareto_surface_mesh["x_coordinates"][0] = NON_FINITE_POSITIVE_INFINITY_PLACEHOLDER_TEXT
        pareto_surface_mesh["triangle_vertex_index_a"][0] = 1.5
        pareto_surface_mesh["triangle_vertex_index_b"][0] = len(pareto_surface_mesh["x_coordinates"]) + 100
        expected_counts["non_finite_contract_coordinate_count"] += 2
        expected_counts["out_of_range_contract_triangle_vertex_index_count"] += 1
        expected_counts["skipped_invalid_contract_geometry_names"].append("pareto_frontier_surface_triangle_mesh")
    # 可达面：坐标字段是 Plotly bdata 对象（旧契约形态）→ 记 1 次结构错误，不把全部索引算作越界
    achievable_surface_mesh = default_scene["achievable_frontier_surface_triangle_mesh"]
    achievable_surface_mesh["x_coordinates"] = {"dtype": "f8", "bdata": "AAAAAAAA8D8="}
    expected_counts["non_finite_contract_coordinate_count"] += 1
    expected_counts["skipped_invalid_contract_geometry_names"].append("achievable_frontier_surface_triangle_mesh")
    # 线框：第一个数值坐标改成字符串 "NaN"
    wireframe_line_segments = default_scene["pareto_frontier_wireframe_line_segments"]
    first_numeric_wireframe_coordinate_position = next(
        (position for position, value in enumerate(wireframe_line_segments["x_coordinates"]) if value is not None),
        None,
    )
    if first_numeric_wireframe_coordinate_position is not None:
        wireframe_line_segments["x_coordinates"][first_numeric_wireframe_coordinate_position] = "NaN"
        expected_counts["non_finite_contract_coordinate_count"] += 1
        expected_counts["skipped_invalid_contract_geometry_names"].insert(
            0, "pareto_frontier_wireframe_line_segments"
        )
    # 谱系：一个 ≥3 代的谱系首节点 x 改成字符串
    lineages = default_variant["interaction_relationships"].get("lineages", {})
    three_generation_lineage_key = next(
        (lineage_key for lineage_key, lineage_nodes in lineages.items() if len(lineage_nodes) >= 3), None
    )
    if three_generation_lineage_key is not None:
        lineages[three_generation_lineage_key][0]["x"] = "bad"
        expected_counts["non_finite_contract_coordinate_count"] += 1

    injected_dataset_json_text = _json_for_script_tag(injected_dataset).replace(
        f'"{NON_FINITE_POSITIVE_INFINITY_PLACEHOLDER_TEXT}"', "1e999"
    )
    assert EMBEDDED_VISUALIZATION_DATASET_JSON_PATTERN.search(rendered_html_text), "找不到内嵌契约 JSON"
    injected_html_text = EMBEDDED_VISUALIZATION_DATASET_JSON_PATTERN.sub(
        lambda match: match.group(1) + injected_dataset_json_text + match.group(3),
        rendered_html_text,
        count=1,
    )
    return injected_html_text, expected_counts


ADVERSARIAL_DOCUMENT_INJECTION_SUMMARY_JAVASCRIPT = """() => ({
  injectedImageElementCount: document.querySelectorAll('img[src="x"]').length,
  adversarialScriptExecutionCount: window.""" + ADVERSARIAL_SCRIPT_EXECUTION_COUNTER_GLOBAL_NAME + """ ?? 0,
})"""

HOVER_EVERY_MARKER_OF_EVERY_VARIANT_JAVASCRIPT = """async () => {
  const dataset = window.FRONTIER_3D_VISUALIZATION_DATASET;
  const tooltip = document.getElementById('aa-threejs-model-tooltip');
  const findings = { hoveredMarkerCount: 0, tooltipElementTagNames: new Set(), namesNotShownVerbatim: [] };
  for (const variantKey of Object.keys(dataset.metric_variants)) {
    await window.setFrontierMetricCombination(...variantKey.split('__'));
    for (const model of dataset.metric_variants[variantKey].three_dimensional_scene.displayed_model_markers) {
      window.showFrontierLineageForModelName(model.name);
      findings.hoveredMarkerCount += 1;
      tooltip.querySelectorAll('*').forEach((element) => findings.tooltipElementTagNames.add(element.tagName));
      if (!tooltip.textContent.includes(model.name)) findings.namesNotShownVerbatim.push(model.name);
    }
    window.clearFrontierHoverState();
    for (const baseModelName of Object.keys(dataset.metric_variants[variantKey].interaction_relationships.base_groups || {})) {
      window.pinFrontierBaseModel(baseModelName);
    }
  }
  return { ...findings, tooltipElementTagNames: [...findings.tooltipElementTagNames].sort() };
}"""

# tooltip 只允许渲染器自己拼的这些标签；出现 IMG / SCRIPT 等即说明模型名没有转义
ALLOWED_TOOLTIP_ELEMENT_TAG_NAMES = {"B", "BR", "DIV", "SPAN", "STRONG", "SMALL", "EM"}


def verify_adversarial_strings_are_rendered_as_text(page, html_path: Path, check) -> None:
    page.goto(html_path.as_uri())
    page.wait_for_function(
        "() => window.frontierThreeDimensionalVisualizationState && "
        "window.frontierThreeDimensionalVisualizationState().interactiveRenderer === 'threejs'",
        timeout=30000,
    )
    partition_rejection_warning = page.locator(f"#{EMBEDDED_MODEL_CATALOG_PARTITION_REJECTION_WARNING_ELEMENT_ID}")
    check(
        partition_rejection_warning.count() == 1 and partition_rejection_warning.is_visible(),
        "契约带「内嵌目录分区被拒」告警时，页头醒目显示一行告警（R1-03）",
    )
    if partition_rejection_warning.count() == 1:
        partition_rejection_warning_text = partition_rejection_warning.inner_text()
        check(
            ADVERSARIAL_EMBEDDED_MODEL_CATALOG_PARTITION_REJECTION_WARNING_TEXT in partition_rejection_warning_text
            and partition_rejection_warning.locator("*").count() == 0,
            "页头告警按原文显示契约里的告警文本，不渲染其中的 HTML"
            f"（实际：{partition_rejection_warning_text[:60]!r}）",
        )
        check(
            partition_rejection_warning.get_attribute("role") == "alert"
            and page.locator(
                f"#frontier-3d-report-header #{EMBEDDED_MODEL_CATALOG_PARTITION_REJECTION_WARNING_ELEMENT_ID}"
            ).count()
            == 1,
            "告警在页头内，且带 role=alert",
        )
    hover_findings = page.evaluate(HOVER_EVERY_MARKER_OF_EVERY_VARIANT_JAVASCRIPT)
    check(hover_findings["hoveredMarkerCount"] > 0, f"逐个悬停全部口径的 {hover_findings['hoveredMarkerCount']} 个标记")
    unexpected_tooltip_tag_names = sorted(
        set(hover_findings["tooltipElementTagNames"]) - ALLOWED_TOOLTIP_ELEMENT_TAG_NAMES
    )
    check(
        not unexpected_tooltip_tag_names,
        f"tooltip 里没有由模型名/厂商名注入的元素（多出的标签：{unexpected_tooltip_tag_names}）",
    )
    check(
        hover_findings["namesNotShownVerbatim"] == [],
        f"含 HTML/占位符/U+2028 的模型名在 tooltip 中按原文显示（未原样显示：{hover_findings['namesNotShownVerbatim'][:3]}）",
    )
    page.locator("#aa-search-input").fill("<img")
    page.locator("#aa-search-input").fill("{{REPORT_CSS}}")
    page.evaluate("() => window.setFrontierHowToReadDrawerOpen(true)")
    injection_summary = page.evaluate(ADVERSARIAL_DOCUMENT_INJECTION_SUMMARY_JAVASCRIPT)
    check(
        injection_summary["injectedImageElementCount"] == 0
        and injection_summary["adversarialScriptExecutionCount"] == 0,
        "悬停、pin、搜索、打开抽屉之后文档里没有注入的 <img>，也没有脚本被执行"
        f"（{injection_summary}）",
    )


def verify_non_finite_contract_values_are_counted_and_skipped(page, html_path: Path, expected_counts: dict, check) -> None:
    page.goto(html_path.as_uri())
    page.wait_for_function(
        "() => window.frontierThreeDimensionalVisualizationState && "
        "window.frontierThreeDimensionalVisualizationState().interactiveRenderer === 'threejs'",
        timeout=30000,
    )
    check(
        page.locator(f"#{EMBEDDED_MODEL_CATALOG_PARTITION_REJECTION_WARNING_ELEMENT_ID}").count() == 0,
        "契约的目录分区拒绝告警为 null 时，页头不显示告警行",
    )
    state = page.evaluate("() => window.frontierThreeDimensionalVisualizationState()")
    check(
        state["nonFiniteContractCoordinateCount"] == expected_counts["non_finite_contract_coordinate_count"],
        f"非有限坐标/索引计数 = {expected_counts['non_finite_contract_coordinate_count']}"
        f"（实际 {state['nonFiniteContractCoordinateCount']}）",
    )
    check(
        state["outOfRangeContractTriangleVertexIndexCount"]
        == expected_counts["out_of_range_contract_triangle_vertex_index_count"],
        f"越界三角索引计数 = {expected_counts['out_of_range_contract_triangle_vertex_index_count']}"
        f"（实际 {state['outOfRangeContractTriangleVertexIndexCount']}；bdata 坐标只记 1 次结构错误）",
    )
    check(
        state["skippedInvalidContractGeometryNames"] == expected_counts["skipped_invalid_contract_geometry_names"],
        f"坏几何被跳过绘制：{state['skippedInvalidContractGeometryNames']}",
    )
    non_finite_marker_visibility = page.evaluate(
        """names => window.frontierThreeDimensionalRendererDiagnostics
          .displayedModelMarkerPositionsAndVisibility()
          .filter((marker) => names.includes(marker.name))
          .map((marker) => marker.visible)""",
        expected_counts["non_finite_marker_names"],
    )
    check(
        non_finite_marker_visibility == [False, False],
        f"坐标非有限的标记不显示、不可拾取（{non_finite_marker_visibility}）",
    )
    page.evaluate(
        "name => window.pinFrontierBaseModel(name)",
        expected_counts["multi_variant_base_model_name_with_non_finite_marker"],
    )
    reasoning_line_endpoints = page.evaluate(
        "() => window.frontierThreeDimensionalRendererDiagnostics"
        ".transientRelationshipLineEndpointPositions().reasoning"
    )
    check(
        all(all(abs(value) < 1e6 for value in endpoint) for endpoint in reasoning_line_endpoints)
        and len(reasoning_line_endpoints) == 0,
        "pin 含坏坐标档位的基模型时，推理档位连线不连到坏标记（中间档坏 → 两段都不画）"
        f"（端点 {len(reasoning_line_endpoints)}）",
    )


def main() -> int:
    renderer_bundle_text = None
    if len(sys.argv) > 1:
        source_html_text = Path(sys.argv[1]).read_text(encoding="utf-8")
        embedded_renderer_bundle_match = EMBEDDED_RENDERER_BUNDLE_PATTERN.search(source_html_text)
        assert embedded_renderer_bundle_match, f"{sys.argv[1]} 找不到内联渲染器脚本"
        renderer_bundle_text = embedded_renderer_bundle_match.group("renderer_bundle_text")
        print(f"使用 {sys.argv[1]} 内联的渲染器 bundle")
    failures: list[str] = []

    def check(condition: bool, message: str) -> None:
        print(("  ✓ " if condition else "  ✗ ") + message)
        if not condition:
            failures.append(message)

    with tempfile.TemporaryDirectory(prefix="frontier-3d-adversarial-contract-") as temporary_directory_text:
        temporary_directory_path = Path(temporary_directory_text)
        adversarial_string_html_text = _html_with_renderer_bundle(
            render_frontier_3d_self_contained_html_report(
                _adversarial_string_dataset(),
                generator_git_commit="unknown",
                rendered_at_utc="2026-09-23T00:00:00Z",
            ),
            renderer_bundle_text,
        )
        embedded_dataset_json_text = EMBEDDED_VISUALIZATION_DATASET_JSON_PATTERN.search(
            adversarial_string_html_text
        ).group(2)
        print("\n[1] 恶意字符串契约：静态检查")
        check(
            "<" not in embedded_dataset_json_text
            and " " not in embedded_dataset_json_text
            and " " not in embedded_dataset_json_text,
            "内嵌契约 JSON 里没有原样的 < 与 U+2028/U+2029",
        )
        json.loads(embedded_dataset_json_text)
        adversarial_string_html_path = temporary_directory_path / "adversarial_strings.html"
        adversarial_string_html_path.write_text(adversarial_string_html_text, encoding="utf-8")

        non_finite_injected_html_text, expected_counts = _non_finite_injected_html_and_expected_counts(
            renderer_bundle_text
        )
        non_finite_injected_html_path = temporary_directory_path / "non_finite_injected.html"
        non_finite_injected_html_path.write_text(non_finite_injected_html_text, encoding="utf-8")

        with sync_playwright() as playwright:
            browser = launch_requested_frontier_3d_test_browser(playwright)
            page, browser_runtime_observation = create_frontier_3d_test_page_with_runtime_observation(browser)
            print("\n[2] 恶意字符串契约：浏览器")
            verify_adversarial_strings_are_rendered_as_text(page, adversarial_string_html_path, check)
            print("\n[3] 非有限注入契约：浏览器")
            verify_non_finite_contract_values_are_counted_and_skipped(
                page, non_finite_injected_html_path, expected_counts, check
            )
            check(
                browser_runtime_observation.page_runtime_errors == [],
                f"无 JS 运行时错误（{browser_runtime_observation.page_runtime_errors[:3]}）",
            )
            check(
                browser_runtime_observation.external_network_request_urls == [],
                f"无外部网络请求（{browser_runtime_observation.external_network_request_urls[:3]}）",
            )
            browser.close()

    if failures:
        print(f"\n❌ {len(failures)} 项失败")
        return 1
    print("\n✅ 恶意字符串与非有限契约的前端防御全部通过")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
