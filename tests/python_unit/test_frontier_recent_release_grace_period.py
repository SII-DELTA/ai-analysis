"""近期发布宽限：只绕过层数限制，并保留零宽限的旧行为。"""
from __future__ import annotations

import copy

import pandas as pd
import pytest

from src import frontier
from src import frontier_3d_visualization_dataset_builder as dataset_builder
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import (
    build_frontier_3d_synthetic_fixture_models_dataframe,
)


def _four_layer_models_with_last_release_date(release_date: str | None) -> pd.DataFrame:
    return pd.DataFrame(
        [
            {
                "name": f"Synthetic Dominance Layer {layer}",
                "creator": "Meta",
                "release_date": pd.Timestamp(release_date if layer == 4 else "2026-01-01")
                if layer != 4 or release_date else pd.NaT,
                "intelligence": 110.0 - layer * 10,
                "cost_to_run": float(layer),
                "eff_speed": 110.0 - layer * 10,
                "cost_to_run_value_is_from_current_intelligence_index_version": True,
                "output_token_count_value_is_from_current_intelligence_index_version": True,
            }
            for layer in range(1, 5)
        ]
    )


def _prune(models: pd.DataFrame, months: int = 6) -> pd.DataFrame:
    return frontier.apply_pruning(
        models,
        pruning_reference_date="2026-08-31",
        recent_release_frontier_distance_grace_period_months=months,
    )


@pytest.mark.parametrize(
    ("release_date", "is_kept"),
    [("2026-02-28", True), ("2026-02-27", False), ("2026-08-31", True),
     ("2026-09-01", False), (None, False)],
)
def test_grace_period_uses_inclusive_calendar_month_boundaries_and_rejects_unknown_or_future_dates(
    release_date, is_kept,
) -> None:
    pruned = _prune(_four_layer_models_with_last_release_date(release_date))
    assert bool(pruned.iloc[-1]["kept"]) is is_kept
    assert bool(pruned.iloc[-1]["displayed_only_because_of_recent_release_grace_period"]) is is_kept
    assert not pruned.iloc[:3]["displayed_only_because_of_recent_release_grace_period"].any()


def test_default_six_month_grace_and_zero_grace_preserve_expected_sets_and_drop_reasons() -> None:
    models = _four_layer_models_with_last_release_date("2026-08-01")
    baseline = _prune(models, 0)
    assert baseline["kept"].tolist() == [True, True, True, False]
    assert baseline["drop_reason"].tolist() == ["保留", "保留", "保留", "离前沿太远"]
    assert not baseline["displayed_only_because_of_recent_release_grace_period"].any()
    default = frontier.apply_pruning(models, pruning_reference_date="2026-08-31")
    assert default["kept"].all()
    assert default["drop_reason"].eq("保留").all()
    for column in ("layer", "display_layer", "is_pareto", "display_is_pareto"):
        pd.testing.assert_series_equal(default[column], baseline[column])


@pytest.mark.parametrize("missing_dimension", ["intelligence", "cost_to_run", "eff_speed"])
def test_grace_never_repairs_missing_dimensions(missing_dimension) -> None:
    models = _four_layer_models_with_last_release_date("2026-08-01")
    models.loc[3, missing_dimension] = float("nan")
    pruned = _prune(models)
    assert not pruned.iloc[-1]["kept"]
    assert not pruned.iloc[-1]["displayed_only_because_of_recent_release_grace_period"]
    assert pruned.iloc[-1]["drop_reason"].startswith("缺维度")


@pytest.mark.parametrize(("release_date", "is_kept"), [("2023-08-30", False), ("2023-08-31", True)])
def test_hard_age_cutoff_still_wins_even_when_grace_is_longer(release_date, is_kept) -> None:
    pruned = _prune(_four_layer_models_with_last_release_date(release_date), 48)
    assert bool(pruned.iloc[-1]["kept"]) is is_kept
    if not is_kept:
        assert pruned.iloc[-1]["drop_reason"] == "过旧(硬截断)"


def test_historical_grace_point_stays_outside_analysis_and_standout_calculation() -> None:
    models = _four_layer_models_with_last_release_date("2026-08-01")
    models.loc[3, "cost_to_run_value_is_from_current_intelligence_index_version"] = False
    pruned = frontier.add_standout_metrics(_prune(models))
    historical = pruned.iloc[-1]
    assert historical["kept"]
    assert historical["displayed_only_because_of_recent_release_grace_period"]
    assert not historical[frontier.ANALYSIS_ELIGIBLE_COLUMN_NAME]
    assert not historical["is_pareto"]
    assert historical[frontier.STANDOUT_COLUMNS].isna().all()


def test_current_grace_points_join_existing_kept_analysis_normalization_population() -> None:
    models = _four_layer_models_with_last_release_date("2026-08-01")
    baseline = frontier.add_standout_metrics(_prune(models, 0))
    expanded = frontier.add_standout_metrics(_prune(models, 6))
    assert expanded.iloc[-1][["g_cost", "g_speed", "g_intel"]].notna().all()
    assert not baseline.loc[:2, "g_cost"].equals(expanded.loc[:2, "g_cost"])


@pytest.mark.parametrize("invalid_months", [-1, 1.5, True, "6"])
def test_pruning_rejects_non_integer_or_negative_grace_months(invalid_months) -> None:
    with pytest.raises(ValueError, match="非负整数"):
        _prune(_four_layer_models_with_last_release_date("2026-08-01"), invalid_months)


def build_synthetic_dataset_with_recent_dominated_models(months=6) -> dict:
    models = build_frontier_3d_synthetic_fixture_models_dataframe()
    models.loc[models["name"].str.startswith("Laggard Chain"), "release_date"] = pd.Timestamp("2026-09-01")
    return dataset_builder.build_frontier_3d_visualization_dataset(
        models, since_months=18, max_layers=3, hard_age_cutoff_months=36,
        speed_scale="log", pruning_reference_date="2026-09-23",
        recent_release_frontier_distance_grace_period_months=months,
    )


def test_contract_records_grace_only_markers_counts_reference_date_and_preserves_frontier_geometry() -> None:
    expanded = build_synthetic_dataset_with_recent_dominated_models()
    baseline = build_synthetic_dataset_with_recent_dominated_models(0)
    dataset_builder.validate_frontier_3d_visualization_dataset(expanded)
    assert expanded["artificial_analysis_data_provenance"]["recent_release_frontier_distance_grace_period_months"] == 6
    for key, variant in expanded["metric_variants"].items():
        scene = variant["three_dimensional_scene"]
        markers = scene["displayed_model_markers"]
        grace_only = [model for model in markers if model["displayed_only_because_of_recent_release_grace_period"]]
        assert grace_only, key
        assert variant["recent_release_grace_period_only_model_count"] == len(grace_only)
        assert variant["kept_model_count_without_recent_release_grace_period"] == baseline["metric_variants"][key]["kept_model_count"]
        assert variant["kept_model_count"] == variant["kept_model_count_without_recent_release_grace_period"] + len(grace_only)
        assert scene["current_view"]["recent_release_frontier_distance_grace_period_months"] == 6
        assert scene["current_view"]["pruning_reference_date"] == "2026-09-23"
        assert variant["pareto_model_count"] == baseline["metric_variants"][key]["pareto_model_count"]
        for geometry in ("pareto_frontier_wireframe_line_segments", "pareto_frontier_surface_triangle_mesh", "achievable_frontier_surface_triangle_mesh"):
            assert scene[geometry] == baseline["metric_variants"][key]["three_dimensional_scene"][geometry]


@pytest.mark.parametrize("corruption", ["marker_boolean", "grace_count", "baseline_count", "months", "zero_months_with_grace"])
def test_contract_rejects_malformed_grace_metadata(corruption) -> None:
    dataset = build_synthetic_dataset_with_recent_dominated_models()
    variant = dataset["metric_variants"]["effective__effective"]
    if corruption == "marker_boolean":
        variant["three_dimensional_scene"]["displayed_model_markers"][0]["displayed_only_because_of_recent_release_grace_period"] = "false"
    elif corruption == "grace_count":
        variant["recent_release_grace_period_only_model_count"] += 1
    elif corruption == "baseline_count":
        variant["kept_model_count_without_recent_release_grace_period"] -= 1
    elif corruption == "months":
        dataset["artificial_analysis_data_provenance"]["recent_release_frontier_distance_grace_period_months"] = -1
    else:
        dataset["artificial_analysis_data_provenance"]["recent_release_frontier_distance_grace_period_months"] = 0
    with pytest.raises(ValueError, match="宽限|grace_period"):
        dataset_builder.validate_frontier_3d_visualization_dataset(dataset)


def test_legacy_contract_without_grace_metadata_is_still_accepted() -> None:
    dataset = copy.deepcopy(build_synthetic_dataset_with_recent_dominated_models(0))
    dataset["artificial_analysis_data_provenance"].pop("recent_release_frontier_distance_grace_period_months")
    for variant in dataset["metric_variants"].values():
        variant.pop("recent_release_grace_period_only_model_count")
        variant.pop("kept_model_count_without_recent_release_grace_period")
        scene = variant["three_dimensional_scene"]
        for name in ("recent_release_frontier_distance_grace_period_months", "pruning_reference_date", "recent_release_grace_period_only_model_count", "kept_model_count_without_recent_release_grace_period"):
            scene["current_view"].pop(name)
        for marker in scene["displayed_model_markers"]:
            marker.pop("displayed_only_because_of_recent_release_grace_period")
    dataset_builder.validate_frontier_3d_visualization_dataset(dataset)
