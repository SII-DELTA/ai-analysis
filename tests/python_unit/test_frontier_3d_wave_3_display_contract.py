"""W3 只扩展显示契约，不改变分析数值。"""
import numpy as np
import pandas as pd

from src import visualize
from src.frontier_3d_visualization_dataset_builder import build_frontier_3d_visualization_dataset
from src.frontier_3d_organization_identity_metadata_registry import _generated_wordmark_svg, _generated_monogram_svg
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe


def test_axis_range_uses_only_complete_finite_displayed_rows():
    displayed = pd.DataFrame({"cost": [10, 100, 1e9, np.inf], "speed": [20, 200, np.nan, 3], "intelligence": [40, 60, 1, 1]})
    lineages = {"lineages": {"history": [{"x": 1e30, "y": 1e30, "z": 1e30}]}}
    actual = visualize._fixed_axis_ranges(displayed, lineages, "cost", "speed", False)
    expected = visualize._fixed_axis_ranges(displayed.iloc[:2], {"lineages": {}}, "cost", "speed", False)
    assert actual == expected
    assert actual[1][1] < 210


def test_v2_additions_include_tokens_metric_explanations_and_excluded_identity():
    dataset = build_frontier_3d_visualization_dataset(build_frontier_3d_synthetic_fixture_models_dataframe(), since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log")
    assert dataset["schema_version"].endswith("/v2")
    assert all(definition["description"] for definitions in [dataset["cost_metric_definitions"], dataset["speed_metric_definitions"]] for definition in definitions.values())
    for variant in dataset["metric_variants"].values():
        assert all("output_mtokens" in marker["panel"] for marker in variant["three_dimensional_scene"]["displayed_model_markers"])
        assert variant["excluded_models_with_drop_reason"]
        for model in variant["excluded_models_with_drop_reason"]:
            assert model["model_uuid"]
            assert model["base_model_name"]
            assert isinstance(model["reasoning_level_sort_order"], int)
            assert "is_analysis_eligible_for_current_metric_variant" in model["analysis_eligibility"]


def test_wordmark_and_monogram_fallbacks_have_distinct_square_layouts():
    wordmark = _generated_wordmark_svg("Future & Laboratory")
    monogram = _generated_monogram_svg("Future & Laboratory")
    assert 'viewBox="0 0 256 256"' in wordmark
    assert 'viewBox="0 0 256 256"' in monogram
    assert "Future &amp; Laboratory</text>" in wordmark
    assert "Future &amp; Laboratory</text>" not in monogram
