"""F1 候选方法只产出审阅数据，不改产品排名。"""
import numpy as np
import pytest

from src.frontier_3d_standout_methodology_golden_comparison import (
    distances_to_other_models_dominated_region,
    robust_frontier_trend_fit_diagnostics,
    intelligence_uplift_excluding_same_catalog_release,
)


def test_dominated_region_distance_is_zero_for_dominated_points_and_positive_at_boundary():
    distances = distances_to_other_models_dominated_region(np.array([[0.2, 0.2, 0.2], [0.5, 0.5, 0.5], [0.8, 0.1, 0.5]]))
    assert distances[0] == 0
    assert distances[1] > 0
    assert distances[2] == pytest.approx(0.3)


def test_trend_fit_does_not_silently_change_fit_set_when_underpowered_or_rank_deficient():
    for count in (5, 20):
        result = robust_frontier_trend_fit_diagnostics(np.arange(count, dtype=float), np.ones(count), np.ones(count), np.ones(count, dtype=bool))
        assert result["status"] in {"insufficient_frontier_samples", "rank_deficient"}
        assert all(value is None for value in result["residuals"])


def test_intelligence_uplift_excludes_sibling_efforts_and_keeps_missing_alternatives_unknown():
    models = [
        {"creator": "厂商", "artificial_analysis_release_slug": "release-a", "x": 2, "y": 10, "z": 60},
        {"creator": "厂商", "artificial_analysis_release_slug": "release-a", "x": 1, "y": 20, "z": 59},
        {"creator": "其他厂商", "artificial_analysis_release_slug": "release-b", "x": 1, "y": 20, "z": 40},
    ]
    result = intelligence_uplift_excluding_same_catalog_release(models)
    assert result[0]["value"] == 20
    assert result[0]["comparison_model_indices"] == [2]
    assert result[2]["value"] == -19
    assert intelligence_uplift_excluding_same_catalog_release(models[:2])[0]["value"] is None


def test_robust_fit_records_sample_variance_and_finite_leverage():
    u, v = np.meshgrid(np.linspace(0, 2, 6), np.linspace(0, 3, 6))
    intelligence = 20 + 2 * u.ravel() + v.ravel() + 0.1 * u.ravel() ** 2
    intelligence[-1] += 10
    result = robust_frontier_trend_fit_diagnostics(intelligence, u.ravel(), v.ravel(), np.ones(36, dtype=bool))
    assert result["status"] == "fitted"
    assert all(np.isfinite(result["leverage"]))
    assert result["residual_standard_deviation"] ** 2 == pytest.approx(result["residual_sum_of_squares"] / 30)


def test_golden_diff_contains_resolvable_comparison_indices_and_keeps_source_unchanged():
    import copy
    import json
    from src.frontier_3d_standout_methodology_golden_comparison import build_standout_methodology_golden_comparison
    from tests.python_unit.test_frontier_3d_v3_deduplicated_contract_and_browser_projection import build_dataset
    dataset = build_dataset()
    original = copy.deepcopy(dataset)
    comparison = build_standout_methodology_golden_comparison(dataset)
    assert len(comparison["metric_variants"]) == 4
    for variant in comparison["metric_variants"].values():
        catalog = variant["analysis_model_catalog_in_model_index_order"]
        for model in variant["models"]:
            assert all(0 <= index < len(catalog) for index in model["uplift_comparison"]["comparison_model_indices"])
        assert len(variant["hypervolume_reference_point_sensitivity"]) == 4
    json.dumps(comparison, allow_nan=False)
    assert dataset == original
