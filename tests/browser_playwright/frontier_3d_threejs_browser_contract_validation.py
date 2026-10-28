"""Frontier 3D three.js 浏览器公共行为验证。"""
from __future__ import annotations

import hashlib
import re
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
FRONTIER_3D_REPORT_DOCUMENT_TITLE = "AI 模型三维 Pareto 前沿"
ARTIFICIAL_ANALYSIS_ATTRIBUTION_URL = "https://artificialanalysis.ai/"


def verify_rendered_artifact_fingerprint_meta_matches_embedded_bundle() -> dict:
    """W0-5：三个指纹 meta 存在且格式正确，bundle sha256 与内联脚本逐字节一致。"""
    rendered_html_text = HTML_PATH.read_text(encoding="utf-8")
    fingerprint_meta_content_by_name = {
        meta_name: match.group("content")
        for meta_name in (
            "frontier-3d-renderer-bundle-sha256",
            "frontier-3d-generator-git-commit",
            "frontier-3d-rendered-at-utc",
        )
        if (
            match := re.search(
                rf'<meta name="{meta_name}" content="(?P<content>[^"]*)">',
                rendered_html_text,
            )
        )
    }
    assert len(fingerprint_meta_content_by_name) == 3, fingerprint_meta_content_by_name
    embedded_renderer_bundle_match = re.search(
        r"<script>\n(?P<renderer_bundle_text>.*)\n  </script>\n</body>",
        rendered_html_text,
        re.DOTALL,
    )
    assert embedded_renderer_bundle_match, "找不到内联的 three.js 渲染器脚本"
    assert fingerprint_meta_content_by_name["frontier-3d-renderer-bundle-sha256"] == (
        hashlib.sha256(
            embedded_renderer_bundle_match.group("renderer_bundle_text").encode("utf-8")
        ).hexdigest()
    ), (
        "内联 bundle 与 meta 记录的 renderer bundle sha256 不一致（HTML 在渲染后被改动过）；"
        "是否与仓库当前 bundle 一致由 run_all 的「HTML 内联 bundle = 仓库 bundle」一步检查"
    )
    assert re.fullmatch(
        r"[0-9a-f]{40}(-dirty)?|unknown",
        fingerprint_meta_content_by_name["frontier-3d-generator-git-commit"],
    ), fingerprint_meta_content_by_name
    assert re.fullmatch(
        r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z",
        fingerprint_meta_content_by_name["frontier-3d-rendered-at-utc"],
    ), fingerprint_meta_content_by_name
    return fingerprint_meta_content_by_name


def verify_report_header_attribution_and_how_to_read_drawer(
    page, fingerprint_meta_content_by_name: dict
) -> None:
    """W0-4：唯一标题、AA 署名链接、抓取日期/版本/计数、「如何阅读」抽屉与当前视图指纹行。"""
    header = page.locator("#frontier-3d-report-header")
    assert header.is_visible(), "页头不可见"
    assert page.locator("h1").count() == 1, "全页应只有一个标题"
    assert page.locator("h1").inner_text() == FRONTIER_3D_REPORT_DOCUMENT_TITLE
    assert page.title() == FRONTIER_3D_REPORT_DOCUMENT_TITLE
    assert "Frontier 3D" not in page.locator("body").inner_text(), "侧栏仍重复旧标题"

    attribution_links = header.locator(
        f'a[href="{ARTIFICIAL_ANALYSIS_ATTRIBUTION_URL}"]'
    )
    assert attribution_links.count() == 1, "页头缺少 artificialanalysis.ai 署名链接"
    assert attribution_links.first.is_visible()
    assert "Artificial Analysis" in attribution_links.first.inner_text()
    assert attribution_links.first.get_attribute("target") == "_blank"
    assert set(
        (attribution_links.first.get_attribute("rel") or "").split()
    ) >= {"noopener", "noreferrer"}

    provenance = page.evaluate(
        "() => window.FRONTIER_3D_VISUALIZATION_DATASET"
        ".artificial_analysis_data_provenance || {}"
    )
    fetch_date_text = page.locator(
        "#aa-report-header-artificial-analysis-api-fetch-date"
    ).inner_text()
    fetched_at_utc = provenance.get("artificial_analysis_api_response_fetched_at_utc")
    if fetched_at_utc:
        assert fetched_at_utc[:10] in fetch_date_text, fetch_date_text
        if provenance.get("artificial_analysis_api_response_fetched_at_utc_source") == (
            "inferred_from_cache_file_modification_time"
        ):
            assert "按缓存文件时间推断" in fetch_date_text, fetch_date_text
    else:
        assert fetch_date_text == "抓取时间未知", fetch_date_text
    version_text = page.locator("#aa-report-header-intelligence-index-version").inner_text()
    current_version = provenance.get("current_intelligence_index_version")
    assert (f"v{current_version}" if current_version else "版本未知") in version_text
    if provenance.get("current_intelligence_index_version_source") == (
        "inferred_from_accepted_embedded_model_catalog_partition"
    ):
        assert "按目录分区推定" in version_text, version_text
    # R1-03：契约顶层溯源带「内嵌目录分区被拒」告警时页头显示一行告警，null 时不显示
    partition_rejection_warning_text = provenance.get(
        "embedded_model_catalog_partition_rejection_warning_text"
    )
    partition_rejection_warning = page.locator(
        "#aa-report-header-embedded-model-catalog-partition-rejection-warning"
    )
    if partition_rejection_warning_text:
        assert partition_rejection_warning.count() == 1 and partition_rejection_warning.is_visible()
        assert partition_rejection_warning_text in partition_rejection_warning.inner_text()
    else:
        assert partition_rejection_warning.count() == 0, "没有目录分区拒绝告警时页头不应显示告警行"
    model_count_summary_text = page.locator(
        "#aa-report-header-model-count-summary"
    ).inner_text()
    state = page.evaluate("() => window.frontierThreeDimensionalVisualizationState()")
    assert f"显示 {state['displayedModelMarkerCount']} 个模型" in model_count_summary_text
    assert f"Pareto {state['paretoFrontierModelCount']}" in model_count_summary_text

    canvas_box_before_drawer = page.locator(
        "canvas[data-frontier-threejs-canvas]"
    ).bounding_box()
    drawer = page.locator("#aa-how-to-read-drawer")
    assert drawer.is_hidden(), "「如何阅读」抽屉默认应收起"
    page.locator("#aa-how-to-read-drawer-toggle").click()
    assert drawer.is_visible(), "点击「如何阅读」后抽屉未展开"
    assert page.locator("#aa-how-to-read-drawer-toggle").get_attribute(
        "aria-expanded"
    ) == "true"
    drawer_text = drawer.inner_text()
    current_view = page.evaluate(
        """() => {
          const dataset = window.FRONTIER_3D_VISUALIZATION_DATASET;
          const key = window.frontierThreeDimensionalVisualizationState().activeMetricVariantKey;
          return dataset.metric_variants[key].three_dimensional_scene.current_view || {};
        }"""
    )
    for expected_fragment in (
        "三个坐标轴",
        "越低越好",
        "越高越好",
        "历史口径",
        "仅当期可比",
        current_view.get("cost_metric_note") or "",
        current_view.get("speed_metric_note") or "",
    ):
        assert expected_fragment in drawer_text, expected_fragment
    assert drawer.locator(f'a[href="{ARTIFICIAL_ANALYSIS_ATTRIBUTION_URL}"]').count() == 1
    assert page.locator(
        "canvas[data-frontier-threejs-canvas]"
    ).bounding_box() == canvas_box_before_drawer, "抽屉不应改变画布尺寸"
    page.keyboard.press("Escape")
    assert drawer.is_hidden(), "Escape 未关闭抽屉"

    page.locator("#aa-how-to-read-drawer-toggle").focus()
    page.keyboard.press("Enter")
    assert drawer.is_visible(), "键盘 Enter 未展开抽屉"
    focus_is_inside_drawer_after_keyboard_open = page.evaluate(
        "() => document.getElementById('aa-how-to-read-drawer').contains(document.activeElement)"
    )
    assert focus_is_inside_drawer_after_keyboard_open, (
        "键盘打开「如何阅读」后焦点应进入抽屉，实际停在 "
        + page.evaluate("() => document.activeElement.id || document.activeElement.tagName")
    )
    page.keyboard.press("Escape")
    assert drawer.is_hidden(), "焦点在抽屉内时 Escape 未关闭抽屉"
    focused_element_id_after_escape = page.evaluate("() => document.activeElement.id")
    assert focused_element_id_after_escape == "aa-how-to-read-drawer-toggle", (
        f"Escape 关闭抽屉后焦点应回到触发按钮，实际为 {focused_element_id_after_escape!r}"
    )

    fingerprint_row_text = page.locator(
        "#aa-current-view-report-artifact-fingerprint"
    ).inner_text()
    assert (
        fingerprint_meta_content_by_name["frontier-3d-renderer-bundle-sha256"][:12]
        in fingerprint_row_text
    ), fingerprint_row_text
    assert (
        fingerprint_meta_content_by_name["frontier-3d-rendered-at-utc"]
        in fingerprint_row_text
    ), fingerprint_row_text
    assert state["reportArtifactFingerprint"]["rendererBundleSha256"] == (
        fingerprint_meta_content_by_name["frontier-3d-renderer-bundle-sha256"]
    )
    assert isinstance(state["nonFiniteContractCoordinateCount"], int)
    assert state["nonFiniteContractCoordinateCount"] >= 0


def main() -> None:
    assert HTML_PATH.exists(), f"找不到 HTML: {HTML_PATH}"
    fingerprint_meta_content_by_name = (
        verify_rendered_artifact_fingerprint_meta_matches_embedded_bundle()
    )
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
        assert initial_state["interactiveRenderer"] == "threejs"
        assert initial_state["displayedModelMarkerCount"] > 0
        assert initial_state["organizationLogoMarkerCount"] == initial_state[
            "displayedModelMarkerCount"
        ]
        assert initial_state["countryRegionMarkerVisible"] is False
        assert initial_state["countryRegionMarkerCount"] == 0
        assert initial_state["depthTestedOrganizationLogoMarkerCount"] == (
            initial_state["displayedModelMarkerCount"]
        )
        assert initial_state["depthWritingOrganizationLogoBackplateCount"] == (
            initial_state["displayedModelMarkerCount"]
        )
        # D-5 已确认着色透出，验证曲面不写深度；合法空网格（Pareto<4 或共线）时曲面对象不创建、值为 null
        initial_contract_surface_triangle_counts = page.evaluate(
            """() => {
              const state = window.frontierThreeDimensionalVisualizationState();
              const scene = window.FRONTIER_3D_VISUALIZATION_DATASET
                .metric_variants[state.activeMetricVariantKey].three_dimensional_scene;
              const triangleCount = (mesh) => (mesh?.triangle_vertex_index_a || []).length;
              return {
                paretoFrontierSurfaceWritesDepth:
                  triangleCount(scene.pareto_frontier_surface_triangle_mesh),
                achievableFrontierSurfaceWritesDepth:
                  triangleCount(scene.achievable_frontier_surface_triangle_mesh),
              };
            }"""
        )
        for state_key, contract_triangle_count in initial_contract_surface_triangle_counts.items():
            if contract_triangle_count > 0:
                assert initial_state[state_key] is False, state_key
            else:
                print(f"  · {state_key}：合法空网格，跳过 depthWrite 断言")
                assert initial_state[state_key] is None, state_key
        assert initial_state["failedOrganizationLogoCanvasTextureCount"] == 0
        verify_report_header_attribution_and_how_to_read_drawer(
            page, fingerprint_meta_content_by_name
        )

        brand_asset_decode_failures = page.evaluate(
            """async () => {
              const dataset = window.FRONTIER_3D_VISUALIZATION_DATASET;
              const displayedCreators = new Set(Object.values(dataset.metric_variants).flatMap(
                variant => variant.three_dimensional_scene.displayed_model_markers.map(model => model.creator),
              ));
              const identities = [...displayedCreators].map(name => dataset.organization_identity_metadata_by_creator_name[name]);
              const results = await Promise.all(
                identities.map((identity) => new Promise((resolve) => {
                  const brandImage = new Image();
                  brandImage.onload = () => resolve(null);
                  brandImage.onerror = () => resolve(identity.organization_display_name);
                  brandImage.src = identity.logo_visualization_data_url;
                })),
              );
              return results.filter(Boolean);
            }"""
        )
        assert brand_asset_decode_failures == [], brand_asset_decode_failures

        assert page.locator("canvas[data-frontier-threejs-canvas]").count() == 1
        assert page.locator("#aa-country-region-marker-toggle").count() == 1
        assert page.locator("#aa-organization-filter-panel").count() == 1
        organization_filter_row_count = page.locator(
            "#aa-organization-filter-panel .aa-organization-filter-row"
        ).count()
        assert organization_filter_row_count > 0
        assert page.locator(
            "#aa-organization-filter-panel .aa-organization-logo-preview"
        ).count() == organization_filter_row_count

        selected_marker = page.evaluate(
            """() => {
              const diagnostics =
                window.frontierThreeDimensionalRendererDiagnostics;
              const models =
                window.FRONTIER_3D_INTERACTION_RELATIONSHIPS.models;
              const projectedModels = models.map((model) => ({
                ...model,
                projectedPosition:
                  diagnostics.projectedCanvasPositionForModelName(model.name),
              }));
              const cardinalDirections = [
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: -1, y: 0 },
                { x: 0, y: -1 },
              ];
              let bestCandidate = null;
              for (const projectedModel of projectedModels) {
                const frontmostInteraction =
                  diagnostics.frontmostPointerInteractionAtProjectedModelPosition(
                    projectedModel.name,
                  );
                if (
                  !frontmostInteraction ||
                  frontmostInteraction.frontmostModelName !== projectedModel.name
                ) continue;
                const markerRadii =
                  diagnostics.projectedCanvasMarkerRadiiForModelName(
                    projectedModel.name,
                  );
                for (const direction of cardinalDirections) {
                  const countryRegionTestRadius =
                    markerRadii.whiteBackplateRadius +
                    (markerRadii.countryRegionRadius -
                      markerRadii.whiteBackplateRadius) * 0.25;
                  const testPoint = {
                    clientX:
                      projectedModel.projectedPosition.clientX +
                      direction.x * countryRegionTestRadius,
                    clientY:
                      projectedModel.projectedPosition.clientY +
                      direction.y * countryRegionTestRadius,
                  };
                  const nearestOtherModelDistance = Math.min(
                    ...projectedModels
                      .filter(
                        (otherModel) =>
                          otherModel.name !== projectedModel.name,
                      )
                      .map((otherModel) => Math.hypot(
                        otherModel.projectedPosition.clientX -
                          testPoint.clientX,
                        otherModel.projectedPosition.clientY -
                          testPoint.clientY,
                      )),
                  );
                  if (
                    !bestCandidate ||
                    nearestOtherModelDistance >
                      bestCandidate.nearestOtherModelDistance
                  ) {
                    bestCandidate = {
                      baseModelName:
                        frontmostInteraction.frontmostBaseModelName,
                      lineageKey: frontmostInteraction.frontmostLineageKey,
                      projectedPosition: projectedModel.projectedPosition,
                      markerRadii,
                      direction,
                      nearestOtherModelDistance,
                    };
                  }
                }
              }
              return bestCandidate;
            }"""
        )
        assert selected_marker is not None
        marker_center = selected_marker["projectedPosition"]
        base_model_name = selected_marker["baseModelName"]

        page.mouse.move(marker_center["clientX"], marker_center["clientY"])
        page.mouse.down()
        page.mouse.move(marker_center["clientX"] + 12, marker_center["clientY"])
        page.mouse.move(marker_center["clientX"], marker_center["clientY"])
        page.mouse.up()
        page.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
        assert base_model_name not in page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".pinnedBaseModelNames"
        )

        canvas_box = page.locator(
            "canvas[data-frontier-threejs-canvas]"
        ).bounding_box()
        assert canvas_box is not None
        empty_canvas_position = {
            "clientX": canvas_box["x"] + 2,
            "clientY": canvas_box["y"] + 2,
        }

        def dispatch_pointer_moves_in_one_browser_task(
            pointer_positions: list[dict],
        ) -> None:
            page.evaluate(
                """pointerPositions => {
                  const canvas = document.querySelector(
                    'canvas[data-frontier-threejs-canvas]',
                  );
                  for (const pointerPosition of pointerPositions) {
                    canvas.dispatchEvent(new PointerEvent('pointermove', {
                      bubbles: true,
                      clientX: pointerPosition.clientX,
                      clientY: pointerPosition.clientY,
                      pointerId: 73,
                      pointerType: 'mouse',
                    }));
                  }
                }""",
                pointer_positions,
            )
            page.evaluate("() => new Promise(requestAnimationFrame)")
            page.evaluate("() => new Promise(requestAnimationFrame)")

        dispatch_pointer_moves_in_one_browser_task(
            [marker_center, empty_canvas_position]
        )
        assert page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".hoveredLineageKey"
        ) is None
        dispatch_pointer_moves_in_one_browser_task(
            [empty_canvas_position, marker_center]
        )
        assert page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".hoveredLineageKey"
        ) == selected_marker["lineageKey"]

        marker_direction = selected_marker["direction"]
        marker_radii = selected_marker["markerRadii"]
        white_backplate_test_radius = (
            marker_radii["logoRadius"] + marker_radii["whiteBackplateRadius"]
        ) / 2
        page.mouse.click(
            marker_center["clientX"]
            + marker_direction["x"] * white_backplate_test_radius,
            marker_center["clientY"]
            + marker_direction["y"] * white_backplate_test_radius,
        )
        assert base_model_name in page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".pinnedBaseModelNames"
        )
        page.evaluate(
            "baseModelName => window.unpinFrontierBaseModel(baseModelName)",
            base_model_name,
        )

        page.evaluate("() => window.setCountryRegionMarkerVisibility(true)")
        country_region_test_radius = marker_radii["whiteBackplateRadius"] + (
            marker_radii["countryRegionRadius"]
            - marker_radii["whiteBackplateRadius"]
        ) * 0.25
        page.mouse.click(
            marker_center["clientX"]
            + marker_direction["x"] * country_region_test_radius,
            marker_center["clientY"]
            + marker_direction["y"] * country_region_test_radius,
        )
        assert base_model_name in page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".pinnedBaseModelNames"
        )
        page.evaluate(
            "baseModelName => window.unpinFrontierBaseModel(baseModelName)",
            base_model_name,
        )
        page.evaluate("() => window.setCountryRegionMarkerVisibility(false)")

        page.locator("#aa-country-region-marker-toggle").check()
        page.wait_for_function(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".countryRegionMarkerVisible === true"
        )
        country_enabled_state = page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
        )
        assert country_enabled_state["countryRegionMarkerCount"] == (
            country_enabled_state["displayedModelMarkerCount"]
        )
        assert page.locator("#aa-country-region-legend").is_visible()

        first_filter_checkbox = page.locator(
            "#aa-organization-filter-panel "
            ".aa-organization-filter-row input[type=checkbox]"
        ).first
        first_filter_checkbox.uncheck()
        page.wait_for_function(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".visibleOrganizationCount < "
            "window.frontierThreeDimensionalVisualizationState().organizationCount"
        )

        assert browser_runtime_observation.external_network_request_urls == [], (
            browser_runtime_observation.external_network_request_urls
        )
        assert browser_runtime_observation.page_runtime_errors == [], (
            browser_runtime_observation.page_runtime_errors
        )
        assert page.evaluate("() => typeof window.Plotly") == "undefined"
        browser.close()

    print("✅ Frontier 3D three.js 浏览器公共行为验证通过")


if __name__ == "__main__":
    main()
