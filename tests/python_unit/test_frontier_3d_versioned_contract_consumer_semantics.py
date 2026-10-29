"""回归旧谱系身份、渲染必需字段及引用的科学语义；仅用合成输入。"""
import copy
import json

import pytest

from src import frontier_3d_self_contained_html_renderer as html_renderer
from src import frontier_3d_visualization_dataset_builder as dataset_builder
from tests.python_unit.test_frontier_3d_v3_deduplicated_contract_and_browser_projection import build_legacy_v3_dataset as build_dataset


METRIC_VARIANT_KEYS = ("effective__effective", "effective__raw", "blended__effective", "blended__raw")
INVALID_METRIC_DEFINITION_NAME_SETS = (
    ("cost_metric_definitions", ()),
    ("cost_metric_definitions", ("effective",)),
    ("cost_metric_definitions", ("blended",)),
    ("cost_metric_definitions", ("effective", "blended", "unsupported_metric")),
    ("speed_metric_definitions", ()),
    ("speed_metric_definitions", ("effective",)),
    ("speed_metric_definitions", ("raw",)),
    ("speed_metric_definitions", ("effective", "raw", "unsupported_metric")),
)


@pytest.fixture(scope="module")
def valid_scientific_and_browser_contracts():
    scientific = build_dataset()
    return scientific, dataset_builder.build_frontier_3d_browser_projection(scientific)


@pytest.fixture(params=(False, True), ids=("scientific", "browser"))
def versioned_contract_and_validator(request, valid_scientific_and_browser_contracts):
    validator = (dataset_builder.validate_frontier_3d_browser_projection if request.param
                 else dataset_builder.validate_frontier_3d_visualization_dataset)
    return copy.deepcopy(valid_scientific_and_browser_contracts[request.param]), validator


def test_historical_v2_lineage_without_creator_or_uuid_can_read_render_and_round_trip(
    tmp_path, valid_scientific_and_browser_contracts,
):
    legacy = dataset_builder.expand_frontier_3d_visualization_dataset_for_scene_consumers(
        valid_scientific_and_browser_contracts[0],
    )
    historical_node_fields = {"name", "base_model_name", "label", "release_date", "x", "y", "z", "intelligence", "kept"}
    for variant in legacy["metric_variants"].values():
        for nodes in variant["interaction_relationships"]["lineages"].values():
            for node in nodes:
                for field in set(node) - historical_node_fields:
                    del node[field]
    original = copy.deepcopy(legacy)
    dataset_builder.validate_frontier_3d_visualization_dataset(legacy)
    legacy_path = tmp_path / "historical-v2-lineages-without-creator-or-uuid.json"
    legacy_path.write_text(json.dumps(legacy, ensure_ascii=False))
    migrated = dataset_builder.read_frontier_3d_visualization_dataset(legacy_path)
    for variant in migrated["metric_variants"].values():
        for nodes in variant["interaction_relationships"]["lineages"].values():
            for reference in nodes:
                model = migrated["models"][reference["model_index"]]
                assert model["creator"] == "?"
                assert model["model_uuid"] is None
                assert model["identity_resolution"] == "legacy_creator_and_name_without_uuid"
    expanded = dataset_builder.expand_frontier_3d_visualization_dataset_for_scene_consumers(migrated)
    for key, variant in legacy["metric_variants"].items():
        for lineage_key, nodes in variant["interaction_relationships"]["lineages"].items():
            assert [
                {field: node[field] for field in historical_node_fields}
                for node in expanded["metric_variants"][key]["interaction_relationships"]["lineages"][lineage_key]
            ] == nodes
    assert html_renderer.render_frontier_3d_self_contained_html_report(legacy, generator_git_commit="synthetic")
    migrated_path = tmp_path / "migrated-historical-v2.json"
    dataset_builder.write_frontier_3d_visualization_dataset(migrated, migrated_path)
    assert dataset_builder.read_frontier_3d_visualization_dataset(migrated_path) == migrated
    assert legacy == original


@pytest.mark.parametrize("field", ("cost_metric_definitions", "speed_metric_definitions"))
def test_metric_control_definitions_are_required(versioned_contract_and_validator, field):
    dataset, validate = versioned_contract_and_validator
    del dataset[field]
    with pytest.raises(ValueError, match=field):
        validate(dataset)


@pytest.mark.parametrize("metric_definition_field,invalid_metric_names", INVALID_METRIC_DEFINITION_NAME_SETS)
def test_metric_control_definition_names_match_exactly_supported_combinations(
    versioned_contract_and_validator, metric_definition_field, invalid_metric_names,
):
    dataset, validate = versioned_contract_and_validator
    supported_definitions = dataset[metric_definition_field]
    dataset[metric_definition_field] = {
        metric_name: supported_definitions.get(metric_name, supported_definitions["effective"])
        for metric_name in invalid_metric_names
    }
    with pytest.raises(ValueError, match=metric_definition_field):
        validate(dataset)


@pytest.mark.parametrize("legacy_v2_input", (False, True), ids=("v3", "v2"))
@pytest.mark.parametrize("metric_definition_field,invalid_metric_names", INVALID_METRIC_DEFINITION_NAME_SETS)
def test_scientific_entrypoints_reject_incompatible_metric_definition_names(
    tmp_path, valid_scientific_and_browser_contracts, legacy_v2_input,
    metric_definition_field, invalid_metric_names,
):
    dataset = copy.deepcopy(valid_scientific_and_browser_contracts[0])
    if legacy_v2_input:
        dataset = dataset_builder.expand_frontier_3d_visualization_dataset_for_scene_consumers(dataset)
    supported_definitions = dataset[metric_definition_field]
    dataset[metric_definition_field] = {
        metric_name: supported_definitions.get(metric_name, supported_definitions["effective"])
        for metric_name in invalid_metric_names
    }
    original = copy.deepcopy(dataset)
    malformed_path = tmp_path / "incompatible-metric-definition-names.json"
    malformed_path.write_text(json.dumps(dataset))
    rejected_output_path = tmp_path / "rejected-contract-output.json"
    for operation in (
        lambda: dataset_builder.read_frontier_3d_visualization_dataset(malformed_path),
        lambda: dataset_builder.write_frontier_3d_visualization_dataset(dataset, rejected_output_path),
        lambda: dataset_builder.build_frontier_3d_browser_projection(dataset),
        lambda: html_renderer.render_frontier_3d_self_contained_html_report(dataset, generator_git_commit="synthetic"),
    ):
        with pytest.raises(ValueError, match=metric_definition_field):
            operation()
        assert dataset == original
    assert not rejected_output_path.exists()


@pytest.mark.parametrize("variant_key", METRIC_VARIANT_KEYS)
@pytest.mark.parametrize("missing_camera_part", ("configuration", "empty", "eye", "center"))
def test_camera_consumed_by_renderer_is_required(versioned_contract_and_validator, variant_key, missing_camera_part):
    dataset, validate = versioned_contract_and_validator
    scene = dataset["metric_variants"][variant_key]["three_dimensional_scene"]
    if missing_camera_part == "configuration":
        del scene["initial_camera_configuration"]
    elif missing_camera_part == "empty":
        scene["initial_camera_configuration"] = {}
    else:
        del scene["initial_camera_configuration"][missing_camera_part]
    with pytest.raises(ValueError, match="initial_camera_configuration"):
        validate(dataset)


@pytest.mark.parametrize("variant_key", METRIC_VARIANT_KEYS)
@pytest.mark.parametrize("coordinate", ("x", "y", "z", "intelligence"))
def test_lineage_coordinates_must_match_referenced_model(versioned_contract_and_validator, variant_key, coordinate):
    dataset, validate = versioned_contract_and_validator
    relationships = dataset["metric_variants"][variant_key]["interaction_relationships"]
    node = next(node for nodes in relationships["lineages"].values() for node in nodes if node["kept"])
    node[coordinate] += 1000
    with pytest.raises(ValueError, match="lineages"):
        validate(dataset)


def test_legacy_lineage_without_public_panel_still_requires_consistent_intelligence(valid_scientific_and_browser_contracts):
    legacy = dataset_builder.expand_frontier_3d_visualization_dataset_for_scene_consumers(
        valid_scientific_and_browser_contracts[0],
    )
    for variant in legacy["metric_variants"].values():
        for nodes in variant["interaction_relationships"]["lineages"].values():
            for node in nodes:
                node.pop("creator", None)
                node.pop("model_uuid", None)
    migrated = dataset_builder.adapt_frontier_3d_visualization_dataset_to_v3(legacy)
    node = next(iter(migrated["metric_variants"]["effective__effective"]["interaction_relationships"]["lineages"].values()))[0]
    node["z"] += 1000
    with pytest.raises(ValueError, match="lineages"):
        dataset_builder.validate_frontier_3d_visualization_dataset(migrated)


@pytest.mark.parametrize("variant_key", METRIC_VARIANT_KEYS)
@pytest.mark.parametrize("group_field", ("base_groups", "reasoning_variant_group_model_indices_by_base_model_name"))
def test_group_indices_must_reference_members_of_the_named_release(versioned_contract_and_validator, variant_key, group_field):
    dataset, validate = versioned_contract_and_validator
    variant = dataset["metric_variants"][variant_key]
    group_name, indices = next(iter(variant["interaction_relationships"][group_field].items()))
    markers = dataset_builder.expand_frontier_3d_visualization_dataset_for_scene_consumers(dataset)["metric_variants"][variant_key]["three_dimensional_scene"]["displayed_model_markers"]
    indices[0] = next(index for index, marker in enumerate(markers) if marker["base_model_name"] != group_name)
    with pytest.raises(ValueError, match=group_field):
        validate(dataset)


@pytest.mark.parametrize("field", ("cost_metric_definitions", "speed_metric_definitions", "initial_camera_configuration"))
def test_scientific_entrypoints_reject_missing_renderer_fields(tmp_path, valid_scientific_and_browser_contracts, field):
    dataset = copy.deepcopy(valid_scientific_and_browser_contracts[0])
    target = dataset if field != "initial_camera_configuration" else dataset["metric_variants"]["effective__effective"]["three_dimensional_scene"]
    del target[field]
    malformed_path = tmp_path / "malformed-v3-contract.json"
    malformed_path.write_text(json.dumps(dataset))
    for operation in (
        lambda: dataset_builder.read_frontier_3d_visualization_dataset(malformed_path),
        lambda: dataset_builder.write_frontier_3d_visualization_dataset(dataset, tmp_path / "rejected-output.json"),
        lambda: dataset_builder.build_frontier_3d_browser_projection(dataset),
        lambda: html_renderer.render_frontier_3d_self_contained_html_report(dataset, generator_git_commit="synthetic"),
    ):
        with pytest.raises(ValueError, match=field):
            operation()
