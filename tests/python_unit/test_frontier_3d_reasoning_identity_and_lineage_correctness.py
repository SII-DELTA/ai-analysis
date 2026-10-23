"""W2：验证名称解析、UUID、同档位谱系与线性速度轴。"""

import pytest
import warnings
from uuid import UUID
import pandas as pd

from src import visualize
from src.frontier_3d_visualization_dataset_builder import build_frontier_3d_visualization_dataset
from src.frontier_3d_visualization_dataset_builder import validate_frontier_3d_visualization_dataset
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe


@pytest.mark.parametrize("name,base,level", [
    ("DeepSeek V4 Pro 0813 (Max)", "DeepSeek V4 Pro 0813", "max effort"),
    ("Claude Sonnet 5 (Adaptive Reasoning, Xhigh Effort, Default Fallback)", "Claude Sonnet 5", "xhigh"),
    ("Claude Opus 5 (Reasoning, Max Effort, Opus 4.8 Fallback)", "Claude Opus 5", "max effort"),
    ("Qwen3.8 Max (0902)", "Qwen3.8 Max (0902)", "non-reasoning"),
    ("Quasar 438B (max, based on GLM-5.2)", "Quasar 438B (max, based on GLM-5.2)", "non-reasoning"),
    ("Model (32B)", "Model (32B)", "non-reasoning"),
])
def test_reasoning_suffixes_preserve_identity_annotations(name, base, level):
    assert visualize._parse_base_model_name(name) == base
    assert visualize._reasoning_level_label_and_sort_order(name)[0] == level


def build_dataset(models=None, speed_scale="log"):
    return build_frontier_3d_visualization_dataset(
        models if models is not None else build_frontier_3d_synthetic_fixture_models_dataframe(),
        since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale=speed_scale,
    )


def test_model_uuid_survives_across_metric_variants_and_display_name_change():
    models = build_frontier_3d_synthetic_fixture_models_dataframe()
    original = build_dataset(models)
    changed = models.copy(deep=True)
    changed["name"] = changed["name"].str.replace("Qwen4 Max", "Qwen4 Renamed", regex=False)
    renamed = build_dataset(changed)
    for key, variant in original["metric_variants"].items():
        before = variant["three_dimensional_scene"]["displayed_model_markers"]
        after = renamed["metric_variants"][key]["three_dimensional_scene"]["displayed_model_markers"]
        assert {m["model_uuid"] for m in before} == {m["model_uuid"] for m in after}
        assert all(m["model_uuid"] for m in before)


def test_unknown_families_never_join_by_generic_creator_tier():
    for variant in build_dataset()["metric_variants"].values():
        markers = variant["three_dimensional_scene"]["displayed_model_markers"]
        assert all(m["lineage_key"] is None for m in markers if m["creator"] == "OpenAI")
        for nodes in variant["interaction_relationships"]["lineages"].values():
            assert len({n["reasoning_level_label"] for n in nodes}) == 1
            assert len({n["base_model_name"] for n in nodes}) == len(nodes)
            assert all(n["release_date"] != "?" for n in nodes)


def test_each_reasoning_level_has_its_own_cross_generation_lineage():
    models = build_frontier_3d_synthetic_fixture_models_dataframe()
    rows = []
    for generation_index, generation in enumerate(["2.5", "3.5"]):
        for level_index, level in enumerate(["low", "high"]):
            row = models.iloc[0].copy()
            row["id"] = str(UUID(int=10000 + 10 * generation_index + level_index))
            row["name"], row["creator"] = f"Gemini {generation} Flash ({level})", "Google"
            row["release_date"] = pd.Timestamp(f"2026-0{generation_index + 1}-01")
            row["intelligence"] = 30 + generation_index * 10 + level_index
            rows.append(row)
    extended = pd.concat([models, pd.DataFrame(rows)], ignore_index=True)
    extended.attrs = models.attrs.copy()
    for variant in build_dataset(extended)["metric_variants"].values():
        series = variant["interaction_relationships"]["lineages"]
        for level in ["low", "high"]:
            nodes = series[f"Google||Gemini flash||{level}"]
            assert [n["base_model_name"] for n in nodes] == ["Gemini 2.5 Flash", "Gemini 3.5 Flash"]
            assert {n["reasoning_level_label"] for n in nodes} == {level}


def test_linear_speed_axis_never_extends_below_zero_and_empty_creator_is_normalized():
    for variant in build_dataset(speed_scale="linear")["metric_variants"].values():
        scene = variant["three_dimensional_scene"]
        lower, upper = scene["three_dimensional_axis_configuration"]["y_axis"]["fixed_range"]
        assert 0 <= lower < upper
        assert all(m["creator"].strip() for m in scene["displayed_model_markers"])


def test_unrecognized_suffix_warns_without_stripping_valid_annotations():
    with pytest.warns(RuntimeWarning, match="未识别"):
        assert visualize._parse_base_model_name("Future Model (unknown experimental effort)") == "Future Model (unknown experimental effort)"
    with warnings.catch_warnings(record=True) as captured:
        for name in ["Example (0902)", "Example (June 2026)", "Example (32B)", "Quasar 438B (max, based on GLM-5.2)"]:
            visualize._parse_base_model_name(name)
        assert not captured


@pytest.mark.parametrize("invalid_uuid", ["", "display-name", 123])
def test_optional_uuid_is_validated_without_requiring_it_from_legacy_v2(invalid_uuid):
    dataset = build_dataset()
    dataset["metric_variants"]["effective__effective"]["three_dimensional_scene"]["displayed_model_markers"][0]["model_uuid"] = invalid_uuid
    with pytest.raises(ValueError, match="UUID"):
        validate_frontier_3d_visualization_dataset(dataset)
