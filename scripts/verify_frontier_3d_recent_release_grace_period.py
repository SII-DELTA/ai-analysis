"""用真实 Chromium 验证宽限开关、组合筛选与旧契约；产物保存在显式持久目录。"""
from __future__ import annotations

import argparse
import copy
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import pandas as pd
from playwright.sync_api import sync_playwright

from src.frontier_3d_self_contained_html_renderer import write_frontier_3d_self_contained_html_report
from src.frontier_3d_visualization_dataset_builder import build_frontier_3d_visualization_dataset, expand_frontier_3d_visualization_dataset_for_scene_consumers
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe
from frontier_3d_playwright_verification_support import (
    create_frontier_3d_test_page_with_runtime_observation,
    launch_requested_frontier_3d_test_browser,
)

GRACE_TOGGLE_SELECTOR = "#aa-show-models-displayed-only-because-of-recent-release-grace-period-toggle"


def _synthetic_dataset(months: int, *, recent_dominated_models: bool = True) -> dict:
    models = build_frontier_3d_synthetic_fixture_models_dataframe()
    if recent_dominated_models:
        models.loc[models["name"].str.startswith("Laggard Chain"), "release_date"] = pd.Timestamp("2026-09-01")
    return build_frontier_3d_visualization_dataset(
        models, since_months=18, max_layers=3, hard_age_cutoff_months=36,
        speed_scale="log", recent_release_frontier_distance_grace_period_months=months,
    )


def _analysis_and_camera_snapshot(page) -> dict:
    return page.evaluate("""() => ({
      ranking: window.frontierStandoutRanking(),
      positions: window.frontierThreeDimensionalRendererDiagnostics
        .displayedModelMarkerPositionsAndVisibility().map(({name, position}) => ({name, position})),
      camera: window.frontierThreeDimensionalRendererDiagnostics.camera.position.toArray(),
      cameraQuaternion: window.frontierThreeDimensionalRendererDiagnostics.camera.quaternion.toArray(),
      orbitTarget: window.frontierThreeDimensionalRendererDiagnostics.controls.target.toArray(),
      surface: window.frontierThreeDimensionalRendererDiagnostics.paretoFrontierSurfaceGeometrySummary(),
      paretoCount: window.frontierThreeDimensionalVisualizationState().paretoFrontierModelCount
    })""")


def _assert_visible_count_and_legend_counts(page, expected: int) -> None:
    state = page.evaluate("() => window.frontierThreeDimensionalVisualizationState()")
    assert state["visibleModelMarkerCount"] == expected, state
    assert f"显示 {expected}" in page.locator("#aa-report-header-model-count-summary").inner_text()
    actual_visible = page.evaluate("""() => window.frontierThreeDimensionalRendererDiagnostics
      .displayedModelMarkerPositionsAndVisibility().filter(model => model.visible).length""")
    assert actual_visible == expected
    organization_visible_counts = page.locator("[data-visible-organization-model-count]").evaluate_all(
        "elements => elements.map(element => Number(element.dataset.visibleOrganizationModelCount))"
    )
    assert sum(organization_visible_counts) == expected, organization_visible_counts
    country_visible_counts = page.locator("[data-visible-country-region-model-count]").evaluate_all(
        "elements => elements.map(element => Number(element.dataset.visibleCountryRegionModelCount))"
    )
    assert sum(country_visible_counts) == expected, country_visible_counts


def verify_report(page, html_path: Path, screenshot_directory: Path) -> dict:
    page.goto(html_path.as_uri())
    page.wait_for_function("() => typeof window.frontierThreeDimensionalVisualizationState === 'function'")
    toggle = page.locator(GRACE_TOGGLE_SELECTOR)
    assert toggle.count() == 1, "缺少近期发布宽限开关"
    dataset = page.evaluate("() => window.FRONTIER_3D_VISUALIZATION_DATASET")
    months = dataset.get("artificial_analysis_data_provenance", {}).get("recent_release_frontier_distance_grace_period_months")
    if months is None or months == 0:
        assert toggle.is_disabled() and not toggle.is_checked()
        note = "未记录" if months is None else "生成时已关闭"
        assert note in toggle.locator("..").inner_text()
        return {"file": str(html_path), "grace_months": months, "disabled_control": True}
    assert toggle.is_checked()
    results = []
    for variant_key, variant in expand_frontier_3d_visualization_dataset_for_scene_consumers(dataset)["metric_variants"].items():
        cost, speed = variant_key.split("__")
        page.evaluate("([cost, speed]) => window.setFrontierMetricCombination(cost, speed)", [cost, speed])
        page.evaluate("() => window.setShowOnlyCurrentIntelligenceIndexVersionComparableModels(false)")
        page.evaluate("() => window.setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod(true)")
        markers = variant["three_dimensional_scene"]["displayed_model_markers"]
        baseline_markers = [marker for marker in markers if not marker["displayed_only_because_of_recent_release_grace_period"]]
        grace_markers = [marker for marker in markers if marker["displayed_only_because_of_recent_release_grace_period"]]
        _assert_visible_count_and_legend_counts(page, len(markers))
        before = _analysis_and_camera_snapshot(page)
        if grace_markers:
            target = grace_markers[0]
            page.evaluate("base => window.pinFrontierBaseModel(base)", target["base_model_name"])
            page.locator("#aa-search-input").fill(target["base_model_name"])
            assert page.evaluate("name => window.showFrontierLineageForModelName(name)", target["name"])
            hovered_state = page.evaluate("() => window.frontierThreeDimensionalVisualizationState()")
            assert markers[hovered_state["hoveredModelIndex"]]["name"] == target["name"]
            assert page.locator("#aa-threejs-model-tooltip").is_visible()
            # W2 只为显式家族绘制谱系；未知家族仍可悬停，不能要求伪造谱系键。
            assert (hovered_state["hoveredLineageKey"] is not None) == bool(target.get("lineage_family_key"))
        toggle.uncheck()
        _assert_visible_count_and_legend_counts(page, variant["kept_model_count_without_recent_release_grace_period"])
        assert _analysis_and_camera_snapshot(page) == before
        state = page.evaluate("() => window.frontierThreeDimensionalVisualizationState()")
        assert state["pickableRecentReleaseGracePeriodOnlyModelMarkerCount"] == 0
        if grace_markers:
            assert state["hoveredModelIndex"] is None
            assert state["hoveredLineageKey"] is None and state["hoveredReasoningBaseModelName"] is None
            assert page.locator("#aa-threejs-model-tooltip").is_hidden()
            assert target["base_model_name"] in state["pinnedBaseModelNames"]
            assert "近期发布宽限" in page.locator("#aa-search-results").inner_text()
            assert "近期发布宽限" in page.locator("#aa-pinned-panel").inner_text()
            assert not page.evaluate("name => window.showFrontierLineageForModelName(name)", target["name"])
        page.evaluate("() => window.setShowOnlyCurrentIntelligenceIndexVersionComparableModels(true)")
        comparable_baseline_count = sum(marker["analysis_eligibility"]["is_analysis_eligible_for_current_metric_variant"] for marker in baseline_markers)
        _assert_visible_count_and_legend_counts(page, comparable_baseline_count)
        assert _analysis_and_camera_snapshot(page) == before
        toggle.check()
        comparable_expanded_count = sum(marker["analysis_eligibility"]["is_analysis_eligible_for_current_metric_variant"] for marker in markers)
        _assert_visible_count_and_legend_counts(page, comparable_expanded_count)
        assert _analysis_and_camera_snapshot(page) == before
        toggle.uncheck()
        # 厂商筛选与宽限、当期可比取交集；保留所有筛选行，避免无法重新启用。
        organization_panel = page.locator("#aa-organization-filter-panel")
        organization_panel.evaluate("element => element.open = true")
        first_checkbox = organization_panel.locator(".aa-organization-filter-row input").first
        hidden_creator = first_checkbox.locator("..").get_attribute("data-creator-name")
        first_checkbox.uncheck()
        expected_filtered_count = sum(
            marker["analysis_eligibility"]["is_analysis_eligible_for_current_metric_variant"] and marker["creator"] != hidden_creator
            for marker in baseline_markers
        )
        _assert_visible_count_and_legend_counts(page, expected_filtered_count)
        organization_panel.locator(".aa-organization-filter-row input").first.check()
        page.evaluate("() => window.setShowOnlyCurrentIntelligenceIndexVersionComparableModels(false)")
        toggle.check()
        _assert_visible_count_and_legend_counts(page, len(markers))
        assert _analysis_and_camera_snapshot(page) == before
        if grace_markers:
            restored = page.evaluate("() => window.frontierThreeDimensionalVisualizationState()")
            assert target["base_model_name"] in restored["pinnedBaseModelNames"]
            assert "近期发布宽限" not in page.locator("#aa-pinned-panel").inner_text()
            page.evaluate("base => window.unpinFrontierBaseModel(base)", target["base_model_name"])
        # 切到其他口径后，开关仍保持关闭，再恢复为下一轮测试的初始状态。
        toggle.uncheck()
        other_key = next(key for key in dataset["metric_variants"] if key != variant_key)
        page.evaluate("values => window.setFrontierMetricCombination(...values)", other_key.split("__"))
        assert not toggle.is_checked()
        page.evaluate("values => window.setFrontierMetricCombination(...values)", variant_key.split("__"))
        assert not toggle.is_checked()
        toggle.check()
        results.append({"variant": variant_key, "kept": len(markers), "grace_only": len(grace_markers)})
    page.screenshot(path=str(screenshot_directory / f"{html_path.stem}.png"), full_page=True)
    return {"file": str(html_path), "grace_months": months, "variants": results}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("html", type=Path, nargs="?")
    parser.add_argument("--verification-artifact-directory", type=Path, required=True)
    arguments = parser.parse_args()
    artifact_directory = arguments.verification_artifact_directory.resolve()
    artifact_directory.mkdir(parents=True, exist_ok=True)
    datasets = {
        "synthetic-six-month-grace": _synthetic_dataset(6),
        "synthetic-zero-month-grace": _synthetic_dataset(0),
        "synthetic-no-grace-only-points": _synthetic_dataset(6, recent_dominated_models=False),
    }
    legacy = copy.deepcopy(datasets["synthetic-zero-month-grace"])
    legacy["artificial_analysis_data_provenance"].pop("recent_release_frontier_distance_grace_period_months")
    for variant in legacy["metric_variants"].values():
        for key in ("recent_release_grace_period_only_model_count", "kept_model_count_without_recent_release_grace_period"):
            variant.pop(key)
            variant["three_dimensional_scene"]["current_view"].pop(key)
        for key in ("recent_release_frontier_distance_grace_period_months", "pruning_reference_date"):
            variant["three_dimensional_scene"]["current_view"].pop(key)
        for marker in variant["three_dimensional_scene"]["displayed_model_markers"]:
            marker.pop("displayed_only_because_of_recent_release_grace_period")
    datasets["synthetic-legacy-without-grace-metadata"] = legacy
    html_paths = [write_frontier_3d_self_contained_html_report(dataset, artifact_directory / f"{name}.html") for name, dataset in datasets.items()]
    if arguments.html:
        html_paths.append(arguments.html.resolve())
    with sync_playwright() as playwright:
        browser = launch_requested_frontier_3d_test_browser(playwright)
        page, observation = create_frontier_3d_test_page_with_runtime_observation(browser)
        results = [verify_report(page, path, artifact_directory) for path in html_paths]
        assert observation.page_runtime_errors == [], observation.page_runtime_errors
        assert observation.external_network_request_urls == [], observation.external_network_request_urls
        browser.close()
    (artifact_directory / "recent-release-grace-period-browser-verification-results.json").write_text(
        json.dumps(results, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"✅ 近期发布宽限浏览器验证通过，已验证 {len(html_paths)} 份报告；产物：{artifact_directory}")


if __name__ == "__main__":
    main()
