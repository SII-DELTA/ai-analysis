"""W5 合成输入：完整记录、当前来源、六口径与独立扰动区间。"""
import copy
import math

import pytest

from src.frontier_3d_visualization_dataset_builder import (
    build_frontier_3d_visualization_dataset,
    build_frontier_3d_browser_projection,
    validate_frontier_3d_visualization_dataset,
)
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import (
    build_frontier_3d_synthetic_fixture_models_dataframe,
)


def build_wave_5_dataset():
    models = build_frontier_3d_synthetic_fixture_models_dataframe()
    models["artificial_analysis_intelligence_index_time_per_task_seconds"] = 120.0
    models["intelligence_index_time_per_task_value_is_from_current_intelligence_index_version"] = True
    models["intelligence_measurement_status"] = "measured"
    models["intelligence_measurement_catalog_intelligence"] = models["intelligence"]
    models["intelligence_measurement_source"] = "artificial_analysis_embedded_model_catalog_accepted_partition"
    models["artificial_analysis_intelligence_index_is_estimated"] = False
    models.loc[models.index[1], "intelligence_measurement_status"] = "estimated"
    models.loc[models.index[1], "artificial_analysis_intelligence_index_is_estimated"] = True
    models.loc[models.index[2], "intelligence_measurement_status"] = "unknown"
    models.loc[models.index[2], "intelligence_measurement_catalog_intelligence"] = math.nan
    models.loc[models.index[2], "intelligence_index_time_per_task_value_is_from_current_intelligence_index_version"] = False
    models.loc[models.index[3], "release_date"] = None
    return models, build_frontier_3d_visualization_dataset(
        models, since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log",
    )


def test_six_variants_complete_public_table_and_task_seconds_conversion():
    models, dataset = build_wave_5_dataset()
    assert dataset["schema_version"] == "frontier_3d_visualization_dataset/v4"
    assert len(dataset["models"]) == len(models)
    assert len(dataset["metric_variants"]) == 6
    by_uuid = {model["model_uuid"]: model for model in dataset["models"]}
    assert by_uuid[models.iloc[0]["id"]]["panel"]["intelligence_index_tasks_per_hour"] == 30
    assert by_uuid[models.iloc[2]["id"]]["panel"]["intelligence_index_tasks_per_hour"] is None
    assert any(model["panel"]["intelligence"] is None for model in dataset["models"])
    for variant in dataset["metric_variants"].values():
        assert sorted(record["model_index"] for record in variant["model_analysis_records"]) == list(range(len(models)))
    validate_frontier_3d_visualization_dataset(dataset)
    projection = build_frontier_3d_browser_projection(dataset)
    assert projection["schema_version"] == "frontier_3d_browser_projection/v2"
    assert len(projection["models"]) == len(models)


def test_unknown_source_never_infers_measured_from_unverified_raw_flag():
    models = build_frontier_3d_synthetic_fixture_models_dataframe()
    models["artificial_analysis_intelligence_index_time_per_task_seconds"] = 120
    models["intelligence_index_time_per_task_value_is_from_current_intelligence_index_version"] = True
    dataset = build_frontier_3d_visualization_dataset(models, since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log")
    assert {model["intelligence_measurement_status"] for model in dataset["models"]} == {"unknown"}
    assert all(model["panel"]["intelligence_index_tasks_per_hour"] is None for model in dataset["models"])


def test_sensitivity_interval_boundaries_and_ineligible_unknown():
    from src.frontier_3d_sensitivity_analysis import classify_frontier_sensitivity_intervals
    # 最大化智能和速度、最小化成本；A 在所有扰动中都严格支配 C。
    result = classify_frontier_sensitivity_intervals([
        {"intelligence": 20, "cost": 10, "speed": 100, "eligible": True},
        {"intelligence": 19.8, "cost": 10.2, "speed": 99, "eligible": True},
        {"intelligence": 1, "cost": 100, "speed": 1, "eligible": True},
        {"intelligence": 100, "cost": 1, "speed": 1000, "eligible": False},
    ], intelligence_half_width=0.5)
    assert result[0] == {"is_pareto_robust": False, "is_near_frontier": False}
    assert result[1] == {"is_pareto_robust": False, "is_near_frontier": True}
    assert result[2] == {"is_pareto_robust": False, "is_near_frontier": False}
    assert result[3] == {"is_pareto_robust": None, "is_near_frontier": None}


@pytest.mark.parametrize("half_width,robust",[(0.5,True),(1,False)])
def test_sensitivity_equal_interval_boundary_is_not_strict_dominance(half_width,robust):
    from src.frontier_3d_sensitivity_analysis import classify_frontier_sensitivity_intervals
    result=classify_frontier_sensitivity_intervals([
        {"intelligence":20,"cost":9,"speed":11,"eligible":True},
        {"intelligence":19,"cost":11,"speed":9,"eligible":True},
    ],intelligence_half_width=half_width)
    assert result[0]["is_pareto_robust"] is robust
    assert result[1]["is_near_frontier"] is True


def test_equal_original_models_remain_formal_frontier_but_are_sensitive():
    from src.frontier_3d_sensitivity_analysis import classify_frontier_sensitivity_intervals
    point={"intelligence":20,"cost":10,"speed":10,"eligible":True}
    result=classify_frontier_sensitivity_intervals([point,dict(point)],intelligence_half_width=.5)
    assert result == [{"is_pareto_robust":False,"is_near_frontier":False}]*2


def test_old_schema_still_rejects_six_variants():
    _, dataset = build_wave_5_dataset()
    dataset["schema_version"] = "frontier_3d_visualization_dataset/v3"
    with pytest.raises(ValueError):
        validate_frontier_3d_visualization_dataset(dataset)


def test_all_input_records_without_coordinates_still_have_usable_table():
    models = build_frontier_3d_synthetic_fixture_models_dataframe().iloc[:2].copy()
    models["intelligence"] = math.nan
    dataset = build_frontier_3d_visualization_dataset(models, since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log")
    assert len(dataset["models"]) == 2
    assert all(variant["kept_model_count"] == 0 for variant in dataset["metric_variants"].values())


def test_frozen_original_four_variants_keep_values_layers_and_ranking():
    from src.frontier_3d_visualization_dataset_builder import _build_expanded_frontier_3d_visualization_dataset, expand_frontier_3d_visualization_dataset_for_scene_consumers
    models=build_frontier_3d_synthetic_fixture_models_dataframe()
    parameters=dict(since_months=18,max_layers=3,hard_age_cutoff_months=36,speed_scale="log")
    original=_build_expanded_frontier_3d_visualization_dataset(models,**parameters)
    current=expand_frontier_3d_visualization_dataset_for_scene_consumers(build_frontier_3d_visualization_dataset(models,**parameters))
    for key,variant in original["metric_variants"].items():
        markers=current["metric_variants"][key]["three_dimensional_scene"]["displayed_model_markers"]
        for previous,now in zip(variant["three_dimensional_scene"]["displayed_model_markers"],markers,strict=True):
            for field in ("model_uuid","x","y","z","standout_metrics","normalized_improvement_coordinates"):
                assert now[field] == previous[field]
            assert now["panel"]["layer"] == previous["panel"]["layer"]


@pytest.mark.parametrize("seconds", [0,-1,math.inf,-math.inf,math.nan,True,False])
def test_invalid_task_seconds_never_fall_back_to_api_latency(seconds):
    models=build_frontier_3d_synthetic_fixture_models_dataframe().iloc[:2].copy()
    models["artificial_analysis_intelligence_index_time_per_task_seconds"] = seconds
    models["intelligence_index_time_per_task_value_is_from_current_intelligence_index_version"] = True
    models["intelligence_measurement_catalog_intelligence"] = models["intelligence"]
    models["intelligence_measurement_source"] = "artificial_analysis_embedded_model_catalog_accepted_partition"
    models["median_end_to_end_response_time_seconds"] = 1
    dataset=build_frontier_3d_visualization_dataset(models,since_months=18,max_layers=3,hard_age_cutoff_months=36,speed_scale="log")
    assert all(model["panel"]["intelligence_index_tasks_per_hour"] is None for model in dataset["models"])
    assert all(model["panel"]["median_end_to_end_response_time_seconds"] == 1 for model in dataset["models"])


@pytest.mark.parametrize("score_difference,expected_status", [(0.01, "measured"), (0.05, "measured"), (-0.05, "measured"), (0.05001, "unknown")])
def test_catalog_score_rounding_uses_existing_source_agreement_tolerance(score_difference, expected_status):
    from src import fetch_data
    models = build_frontier_3d_synthetic_fixture_models_dataframe().iloc[:1].copy()
    models["intelligence_measurement_catalog_intelligence"] = models["intelligence"] + score_difference
    models["intelligence_measurement_source"] = "artificial_analysis_embedded_model_catalog_accepted_partition"
    models["artificial_analysis_intelligence_index_time_per_task_seconds"] = 40.0
    models["intelligence_index_time_per_task_value_is_from_current_intelligence_index_version"] = True
    row = models.iloc[0]
    source_verified = fetch_data._embedded_model_catalog_output_token_count_demotion_reason_code(
        row["intelligence_measurement_catalog_intelligence"], row["intelligence"],
    ) is None
    assert source_verified == (expected_status == "measured")
    dataset = build_frontier_3d_visualization_dataset(models, since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log")
    model = dataset["models"][0]
    assert model["intelligence_measurement_status"] == expected_status
    assert model["panel"]["intelligence_index_tasks_per_hour"] == (90.0 if source_verified else None)
    assert model["intelligence_index_task_time_evidence"]["is_verified_current"] == source_verified
    validate_frontier_3d_visualization_dataset(dataset)


def test_recent_release_simulator_derives_all_registered_speed_metrics_without_mutating_input(tmp_path, monkeypatch):
    import json
    import sys
    from scripts import simulate_frontier_3d_recent_release_grace_period as simulator
    models, _ = build_wave_5_dataset()
    assert "intelligence_index_tasks_per_hour" not in models
    original_models = models.copy(deep=True)
    monkeypatch.setattr(simulator.fetch_data, "build_dataframe", lambda **kwargs: models)
    missing_source = tmp_path / "nonexistent-synthetic-source"
    for field in ("API_LANGUAGE_MODELS_CACHE", "ARTIFICIAL_ANALYSIS_MODELS_LIST_PAGE_HTML_CACHE_PATH",
                  "VERSIONED_COST_AND_OUTPUT_TOKEN_FALLBACK_SNAPSHOT", "ARTIFICIAL_ANALYSIS_MODEL_DETAIL_PAGE_HTML_CACHE_DIRECTORY"):
        monkeypatch.setattr(simulator.fetch_data, field, missing_source)
    output_directory = tmp_path / "synthetic-recent-release-simulation-artifacts"
    monkeypatch.setattr(sys, "argv", ["simulate_frontier_3d_recent_release_grace_period.py", "--simulation-artifact-directory", str(output_directory)])
    simulator.main()
    result = json.loads((output_directory / "recent-release-grace-period-simulation.json").read_text())
    assert set(result["variants"]) == {f"{cost}__{speed}" for cost in ("effective", "blended") for speed in ("effective", "raw", "tasks_per_hour")}
    for key in ("effective__tasks_per_hour", "blended__tasks_per_hour"):
        assert result["variants"][key]["baseline_kept"] > 0
        assert set(result["variants"][key]["grace"]) == {"1", "3", "6", "12"}
    import pandas as pd
    pd.testing.assert_frame_equal(models, original_models)
