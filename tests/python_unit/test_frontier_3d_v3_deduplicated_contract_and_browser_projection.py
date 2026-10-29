"""v3 迁移、投影与纯几何边界；全部使用固定合成输入。"""
import copy
import json
import re

import pytest

from src import frontier_3d_visualization_dataset_builder as dataset_builder
from src import frontier_3d_self_contained_html_renderer as html_renderer
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import (
    build_frontier_3d_synthetic_fixture_models_dataframe,
)


def build_dataset():
    return dataset_builder.build_frontier_3d_visualization_dataset(
        build_frontier_3d_synthetic_fixture_models_dataframe(),
        since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log",
    )


def build_legacy_v3_dataset():
    return dataset_builder.adapt_frontier_3d_visualization_dataset_to_v3(
        dataset_builder._build_expanded_frontier_3d_visualization_dataset(
            build_frontier_3d_synthetic_fixture_models_dataframe(),
            since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log",
        )
    )


def test_default_generation_is_pure_geometry_and_deduplicates_models(monkeypatch):
    monkeypatch.setattr(dataset_builder.visualize, "build_figure", lambda *a, **kw: pytest.fail("默认生成不应构造 Plotly 图"))
    monkeypatch.setattr(dataset_builder.visualize.go, "Figure", lambda *a, **kw: pytest.fail("默认生成不应实例化 Plotly Figure"))
    dataset = build_dataset()
    assert dataset["schema_version"] == "frontier_3d_visualization_dataset/v4"
    assert dataset["models"]
    for variant in dataset["metric_variants"].values():
        assert not any(key.startswith("plotly_") for key in variant)
        for marker in variant["three_dimensional_scene"]["displayed_model_markers"]:
            assert "model_index" in marker and "name" not in marker
        for excluded in variant["excluded_models_with_drop_reason"]:
            assert "model_index" in excluded and "name" not in excluded
    dataset_builder.validate_frontier_3d_visualization_dataset(dataset)


def test_projection_round_trip_preserves_interaction_fields_and_input():
    dataset = build_dataset()
    original = copy.deepcopy(dataset)
    document = html_renderer.render_frontier_3d_self_contained_html_report(dataset)
    embedded = json.loads(re.search(r'id="frontier-3d-visualization-dataset-json" type="application/json">(.*?)</script>', document, re.S)[1])
    assert embedded["schema_version"] == "frontier_3d_browser_projection/v2"
    dataset_builder.validate_frontier_3d_browser_projection(embedded)
    expanded = dataset_builder.expand_frontier_3d_visualization_dataset_for_scene_consumers(dataset)
    projected = dataset_builder.expand_frontier_3d_visualization_dataset_for_scene_consumers(embedded)
    for key, variant in expanded["metric_variants"].items():
        projected_variant = projected["metric_variants"][key]
        assert projected_variant["excluded_models_with_drop_reason"] == variant["excluded_models_with_drop_reason"]
        for marker in variant["three_dimensional_scene"]["displayed_model_markers"]:
            marker["standout_metrics"].pop("trend_residual_standard_deviation_units", None)
        assert projected_variant["three_dimensional_scene"]["displayed_model_markers"] == variant["three_dimensional_scene"]["displayed_model_markers"]
    displayed_creators = {marker["creator"] for variant in expanded["metric_variants"].values() for marker in variant["three_dimensional_scene"]["displayed_model_markers"]}
    assert {name for name, identity in embedded["organization_identity_metadata_by_creator_name"].items() if identity.get("logo_visualization_data_url")} == displayed_creators
    assert dataset == original


@pytest.mark.parametrize("mutation,match", [
    (lambda d: d.update(unapproved_field="原始网页"), "unapproved_field"),
    (lambda d: d["metric_variants"]["effective__effective"]["three_dimensional_scene"]["displayed_model_markers"][0].update(model_index=999999), "model_index"),
    (lambda d: d["metric_variants"]["effective__effective"]["three_dimensional_scene"]["displayed_model_markers"][0].update(x=float("inf")), "有限"),
    (lambda d: d["metric_variants"]["effective__effective"]["three_dimensional_scene"]["displayed_model_markers"][0].update(z=999), "公共模型"),
    (lambda d: d["models"][0]["panel"].update(intelligence=10 ** 1000), "有限"),
])
def test_schema_and_reference_failures_are_rejected(mutation, match):
    dataset = build_dataset()
    mutation(dataset)
    with pytest.raises(ValueError, match=match):
        dataset_builder.validate_frontier_3d_visualization_dataset(dataset)


def test_legacy_v2_read_migrates_without_inventing_uuid(tmp_path):
    dataset = build_legacy_v3_dataset()
    legacy = dataset_builder.expand_frontier_3d_visualization_dataset_for_scene_consumers(dataset)
    for variant in legacy["metric_variants"].values():
        for marker in variant["three_dimensional_scene"]["displayed_model_markers"]:
            marker.pop("model_uuid", None)
    path = tmp_path / "legacy-v2.json"
    path.write_text(json.dumps(legacy, ensure_ascii=False))
    migrated = dataset_builder.read_frontier_3d_visualization_dataset(path)
    assert migrated["schema_version"] == "frontier_3d_visualization_dataset/v3"
    for variant in migrated["metric_variants"].values():
        for reference in variant["three_dimensional_scene"]["displayed_model_markers"]:
            model = migrated["models"][reference["model_index"]]
            assert model["model_uuid"] is None
            assert model["identity_resolution"] == "legacy_creator_and_name_without_uuid"


def test_scientific_json_output_is_compact_and_round_trips(tmp_path):
    dataset = build_dataset()
    path = tmp_path / "frontier_3d_visualization_dataset.json"
    dataset_builder.write_frontier_3d_visualization_dataset(dataset, path)
    assert "\n  " not in path.read_text()
    assert dataset_builder.read_frontier_3d_visualization_dataset(path) == dataset


def test_w3_metric_descriptions_and_excluded_effort_identity_survive_projection():
    dataset = build_dataset()
    assert all(definition.get("description") for key in ("cost_metric_definitions", "speed_metric_definitions") for definition in dataset[key].values())
    scientific = dataset_builder.expand_frontier_3d_visualization_dataset_for_scene_consumers(dataset)
    projection = dataset_builder.build_frontier_3d_browser_projection(dataset)
    browser = dataset_builder.expand_frontier_3d_visualization_dataset_for_scene_consumers(projection)
    for key, variant in scientific["metric_variants"].items():
        for excluded in variant["excluded_models_with_drop_reason"]:
            assert excluded["base_model_name"]
            assert isinstance(excluded["reasoning_level_sort_order"], int)
            assert isinstance(excluded["analysis_eligibility"]["is_analysis_eligible_for_current_metric_variant"], bool)
        assert browser["metric_variants"][key]["excluded_models_with_drop_reason"] == variant["excluded_models_with_drop_reason"]
    assert projection["analysis_eligibility_definitions"]
    reference = projection["metric_variants"]["effective__effective"]["three_dimensional_scene"]["displayed_model_markers"][0]
    reference["analysis_eligibility_index"] = 999999
    with pytest.raises(ValueError, match="analysis_eligibility_index"):
        dataset_builder.validate_frontier_3d_browser_projection(projection)


def test_legacy_variant_group_labels_are_preserved_as_reference_differences():
    original = dataset_builder.expand_frontier_3d_visualization_dataset_for_scene_consumers(build_legacy_v3_dataset())
    marker = original["metric_variants"]["effective__raw"]["three_dimensional_scene"]["displayed_model_markers"][0]
    old_base_name = marker["base_model_name"]
    marker["base_model_name"] = "旧契约的口径分组名称"
    variant = original["metric_variants"]["effective__raw"]
    for record in variant["three_dimensional_scene"]["displayed_model_markers"]:
        if record["base_model_name"] == old_base_name:
            record["base_model_name"] = marker["base_model_name"]
    for field in ("base_groups", "reasoning_variant_group_model_indices_by_base_model_name"):
        groups = variant["interaction_relationships"][field]
        if old_base_name in groups:
            groups[marker["base_model_name"]] = groups.pop(old_base_name)
    migrated = dataset_builder.adapt_frontier_3d_visualization_dataset_to_v3(original)
    dataset_builder.validate_frontier_3d_visualization_dataset(migrated)
    expanded = dataset_builder.expand_frontier_3d_visualization_dataset_for_scene_consumers(migrated)
    assert expanded["metric_variants"]["effective__raw"]["three_dimensional_scene"]["displayed_model_markers"][0]["base_model_name"] == marker["base_model_name"]


def test_repeated_excluded_explanations_are_referenced_without_losing_search_fields():
    dataset = build_dataset()
    original = copy.deepcopy(dataset)
    projection = dataset_builder.build_frontier_3d_browser_projection(dataset)
    projected_original = copy.deepcopy(projection)
    reference_count = 0
    for variant in projection["metric_variants"].values():
        for reference in variant["excluded_models_with_drop_reason"]:
            reference_count += 1
            assert "excluded_model_explanation_index" in reference
            assert "drop_reason" not in reference and "missing_dimension_names" not in reference
    assert 0 < len(projection["excluded_model_explanation_definitions"]) < reference_count
    expanded = dataset_builder.expand_frontier_3d_visualization_dataset_for_scene_consumers(projection)
    scientific = dataset_builder.expand_frontier_3d_visualization_dataset_for_scene_consumers(dataset)
    for key, variant in expanded["metric_variants"].items():
        assert variant["excluded_models_with_drop_reason"] == scientific["metric_variants"][key]["excluded_models_with_drop_reason"]
    expanded["metric_variants"]["effective__effective"]["excluded_models_with_drop_reason"][0]["missing_dimension_names"].append("合成修改")
    assert projection == projected_original and dataset == original


@pytest.mark.parametrize("invalid_reference", [-1, True, 999999])
def test_excluded_explanation_indices_reject_wrong_type_and_out_of_bounds(invalid_reference):
    projection = dataset_builder.build_frontier_3d_browser_projection(build_dataset())
    projection["metric_variants"]["effective__effective"]["excluded_models_with_drop_reason"][0]["excluded_model_explanation_index"] = invalid_reference
    with pytest.raises(ValueError, match="excluded_model_explanation_index"):
        dataset_builder.validate_frontier_3d_browser_projection(projection)


def test_excluded_explanation_reference_cannot_mix_conflicting_inline_fields():
    projection = dataset_builder.build_frontier_3d_browser_projection(build_dataset())
    projection["metric_variants"]["effective__effective"]["excluded_models_with_drop_reason"][0]["drop_reason"] = "与共享解释冲突"
    with pytest.raises(ValueError, match="Schema"):
        dataset_builder.validate_frontier_3d_browser_projection(projection)
