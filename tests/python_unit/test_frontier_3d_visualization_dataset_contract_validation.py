"""数据契约：P0-4 bdata 根修与解码兜底、数值语义校验的正反例、D-1 与值溯源新增字段（规格 5.1–5.5）。

全部基于合成 fixture；不联网、不读 output/ 与 data/。
"""
from __future__ import annotations

import base64
import copy
import json
import math

import numpy as np
import pandas as pd
import pytest
from tests.fixtures.build_expanded_frontier_3d_dataset_for_legacy_scene_assertions import build_expanded_frontier_3d_dataset_for_legacy_scene_assertions
from plotly.utils import PlotlyJSONEncoder

from src import frontier_3d_visualization_dataset_builder as dataset_builder
from src import visualize, cli
from src.frontier_3d_self_contained_html_renderer import render_frontier_3d_self_contained_html_report
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import (
    FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE,
    build_frontier_3d_synthetic_fixture_models_dataframe,
)

ALL_METRIC_VARIANT_KEYS = (
    "effective__effective",
    "effective__raw",
    "blended__effective",
    "blended__raw",
)
TRIANGLE_MESH_KEYS_IN_THREE_DIMENSIONAL_SCENE = (
    "pareto_frontier_surface_triangle_mesh",
    "achievable_frontier_surface_triangle_mesh",
)
SPECIFICATION_5_1_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE_KEYS = {
    "artificial_analysis_api_response_fetched_at_utc",
    "artificial_analysis_api_response_fetched_at_utc_source",
    "artificial_analysis_api_intelligence_index_version",
    "artificial_analysis_api_tier",
    "current_intelligence_index_version",
    "embedded_model_catalog_intelligence_index_version",
    "embedded_model_catalog_captured_at_utc",
    "artificial_analysis_website_page_fetch_paused",
    "pruning_reference_date",
    "reference_output_million_tokens_for_effective_speed_normalization_by_intelligence_index_version_family",
    "artificial_analysis_attribution_url",
}
EFFECTIVE_SPEED_AXIS_TITLE_TEXT_FOR_LOG_SCALE = (
    "有效速度（按冗长度归一的生成速度，不含 TTFT 与工具耗时） tok/s（对数）"
)


def _build_synthetic_fixture_dataset(speed_scale: str = "log", **extra_keyword_arguments) -> dict:
    keyword_arguments = {
        "since_months": 18,
        "max_layers": 3,
        "hard_age_cutoff_months": 36,
        "speed_scale": speed_scale,
        "pruning_reference_date": FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE,
    }
    keyword_arguments.update(extra_keyword_arguments)
    return build_expanded_frontier_3d_dataset_for_legacy_scene_assertions(
        build_frontier_3d_synthetic_fixture_models_dataframe(), **keyword_arguments
    )


@pytest.fixture(scope="module")
def synthetic_fixture_dataset_with_log_speed_axis() -> dict:
    return _build_synthetic_fixture_dataset("log")


def _scene(dataset: dict, variant_key: str = "effective__effective") -> dict:
    return dataset["metric_variants"][variant_key]["three_dimensional_scene"]


def _markers_by_name(dataset: dict, variant_key: str) -> dict[str, dict]:
    return {marker["name"]: marker for marker in _scene(dataset, variant_key)["displayed_model_markers"]}


def _empty_triangle_mesh() -> dict:
    return {
        "x_coordinates": [],
        "y_coordinates": [],
        "z_coordinates": [],
        "triangle_vertex_index_a": [],
        "triangle_vertex_index_b": [],
        "triangle_vertex_index_c": [],
    }


def _zero_model_legal_scene() -> dict:
    return {
        "displayed_model_markers": [],
        "pareto_frontier_wireframe_line_segments": {
            "x_coordinates": [],
            "y_coordinates": [],
            "z_coordinates": [],
        },
        "pareto_frontier_surface_triangle_mesh": _empty_triangle_mesh(),
        "achievable_frontier_surface_triangle_mesh": _empty_triangle_mesh(),
        "three_dimensional_axis_configuration": {
            "x_axis": {"title_text": "成本", "scale_type": "log", "fixed_range": [0.0, 1.0]},
            "y_axis": {"title_text": "速度", "scale_type": "log", "fixed_range": [0.0, 1.0]},
            "z_axis": {"title_text": "智能", "scale_type": "linear", "fixed_range": [0.0, 1.0]},
        },
        "current_view": {},
    }


def _zero_model_legal_dataset() -> dict:
    zero_model_variant = {
        "three_dimensional_scene": _zero_model_legal_scene(),
        "interaction_relationships": {},
        "plotly_static_export_trace_data": [],
        "plotly_static_export_layout": {},
    }
    return {
        "schema_version": dataset_builder.LEGACY_FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION,
        "interactive_renderer": "threejs",
        "initial_variant_key": "effective__effective",
        "organization_identity_metadata_by_creator_name": {},
        "metric_variants": {
            variant_key: copy.deepcopy(zero_model_variant) for variant_key in ALL_METRIC_VARIANT_KEYS
        },
    }


def _plotly_typed_array(values, dtype: str, shape: str | None = None) -> dict:
    typed_array = {
        "dtype": dtype,
        "bdata": base64.b64encode(np.asarray(values, dtype=dtype).tobytes()).decode("ascii"),
    }
    if shape is not None:
        typed_array["shape"] = shape
    return typed_array


@pytest.mark.parametrize("speed_scale", ["log", "linear"])
@pytest.mark.parametrize("model_name", ["Gemini 2 Pro", "Gemini 3 Pro"])
@pytest.mark.parametrize("metric_column_name", [
    "cost_to_run", "blended_price_cache_input_output_7_to_2_to_1",
    "eff_speed", "output_speed", "intelligence",
])
@pytest.mark.parametrize("invalid_value", [math.inf, -math.inf, math.nan])
def test_nonfinite_source_coordinates_match_explicit_missing_values_without_mutating_input(
    speed_scale, model_name, metric_column_name, invalid_value,
) -> None:
    models = build_frontier_3d_synthetic_fixture_models_dataframe()
    selected_model = models["name"].eq(model_name)
    models.loc[selected_model, metric_column_name] = invalid_value
    original_models = models.copy(deep=True)
    missing_value_models = models.copy(deep=True)
    missing_value_models.loc[selected_model, metric_column_name] = math.nan
    source_column = dataset_builder.VALUE_SOURCE_COLUMN_NAME_BY_METRIC_COLUMN_NAME.get(metric_column_name)
    if source_column is not None:
        missing_value_models.loc[selected_model, source_column] = None

    datasets = [
        dataset_builder.build_frontier_3d_visualization_dataset(
            model_frame, since_months=18, max_layers=3, hard_age_cutoff_months=36,
            speed_scale=speed_scale,
            pruning_reference_date=FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE,
        )
        for model_frame in (models, missing_value_models)
    ]
    for dataset in datasets:
        dataset_builder.validate_frontier_3d_visualization_dataset(dataset)
        dataset.pop("generated_at")
    assert json.loads(json.dumps(datasets[0], cls=PlotlyJSONEncoder)) == json.loads(
        json.dumps(datasets[1], cls=PlotlyJSONEncoder)
    )
    pd.testing.assert_frame_equal(models, original_models)
    assert models.attrs == original_models.attrs
    assert all(_scene(datasets[0], key)["displayed_model_markers"] for key in ALL_METRIC_VARIANT_KEYS)


def _assert_invalid_contract_rejected_by_all_entry_points(dataset, field_path, artifact_directory) -> None:
    contract_path = artifact_directory / "invalid-frontier-3d-contract.json"
    contract_path.write_text(json.dumps(dataset), encoding="utf-8")
    output_path = artifact_directory / "rejected-frontier-3d-contract.json"
    for operation in (
        lambda: dataset_builder.validate_frontier_3d_visualization_dataset(dataset),
        lambda: dataset_builder.read_frontier_3d_visualization_dataset(contract_path),
        lambda: dataset_builder.write_frontier_3d_visualization_dataset(dataset, output_path),
        lambda: render_frontier_3d_self_contained_html_report(dataset),
    ):
        with pytest.raises(ValueError) as error:
            operation()
        assert field_path in str(error.value)
    assert not output_path.exists()


@pytest.mark.parametrize("variant_key", ALL_METRIC_VARIANT_KEYS)
@pytest.mark.parametrize("axis_name", ["x_axis", "y_axis", "z_axis"])
@pytest.mark.parametrize("invalid_range", [
    None, [], [0], [0, 1, 2], [None, 1], [0, None],
    [math.inf, 1], [-math.inf, 1], [0, math.inf], [math.nan, 1], [0, math.nan],
    [1, 1], [2, 1], [False, 1], [0, True], ["0", 1], [0, "1"],
])
def test_invalid_axis_ranges_are_rejected_by_validation_read_write_and_render(
    variant_key, axis_name, invalid_range, tmp_path,
) -> None:
    dataset = _zero_model_legal_dataset()
    _scene(dataset, variant_key)["three_dimensional_axis_configuration"][axis_name]["fixed_range"] = invalid_range
    _assert_invalid_contract_rejected_by_all_entry_points(
        dataset, f"metric_variants.{variant_key}.three_dimensional_scene."
        f"three_dimensional_axis_configuration.{axis_name}.fixed_range", tmp_path,
    )


@pytest.mark.parametrize("axis_name", ["x_axis", "y_axis", "z_axis"])
@pytest.mark.parametrize("missing_field", ["axis", "fixed_range"])
def test_missing_axis_ranges_are_rejected(axis_name, missing_field, tmp_path) -> None:
    dataset = _zero_model_legal_dataset()
    axes = _scene(dataset)["three_dimensional_axis_configuration"]
    if missing_field == "axis":
        del axes[axis_name]
    else:
        del axes[axis_name]["fixed_range"]
    _assert_invalid_contract_rejected_by_all_entry_points(
        dataset, "metric_variants.effective__effective.three_dimensional_scene."
        f"three_dimensional_axis_configuration.{axis_name}", tmp_path,
    )


@pytest.mark.parametrize("variant_key", ALL_METRIC_VARIANT_KEYS)
@pytest.mark.parametrize("coordinate_key", ["x", "y", "z"])
@pytest.mark.parametrize("invalid_coordinate", [None, math.inf, -math.inf, math.nan, True, False, "1"])
def test_invalid_lineage_coordinates_are_rejected_by_validation_read_write_and_render(
    variant_key, coordinate_key, invalid_coordinate, tmp_path,
) -> None:
    dataset = _zero_model_legal_dataset()
    node = {"x": 1, "y": 2, "z": 3}
    node[coordinate_key] = invalid_coordinate
    dataset["metric_variants"][variant_key]["interaction_relationships"]["lineages"] = {"Google||Gemini pro||non-reasoning": [node]}
    _assert_invalid_contract_rejected_by_all_entry_points(
        dataset, f"metric_variants.{variant_key}.interaction_relationships."
        f"lineages['Google||Gemini pro||non-reasoning'][0].{coordinate_key}", tmp_path,
    )


@pytest.mark.parametrize("coordinate_key", ["x", "y", "z"])
def test_missing_lineage_coordinates_are_rejected(coordinate_key, tmp_path) -> None:
    dataset = _zero_model_legal_dataset()
    node = {"x": 1, "y": 2, "z": 3}
    del node[coordinate_key]
    dataset["metric_variants"]["effective__effective"]["interaction_relationships"]["lineages"] = {"family": [node]}
    _assert_invalid_contract_rejected_by_all_entry_points(
        dataset, f"metric_variants.effective__effective.interaction_relationships.lineages['family'][0].{coordinate_key}",
        tmp_path,
    )


def test_negative_log_projection_ranges_and_finite_lineage_coordinates_remain_valid() -> None:
    dataset = _zero_model_legal_dataset()
    for variant in dataset["metric_variants"].values():
        axes = variant["three_dimensional_scene"]["three_dimensional_axis_configuration"]
        for axis_name in ("x_axis", "y_axis"):
            axes[axis_name]["fixed_range"] = [-2, -1]
        variant["interaction_relationships"]["lineages"] = {"family": [{"x": 0.1, "y": 0.2, "z": -1}]}
    dataset_builder.validate_frontier_3d_visualization_dataset(dataset)


@pytest.mark.parametrize("metric_column_name", [
    "cost_to_run", "blended_price_cache_input_output_7_to_2_to_1",
    "eff_speed", "output_speed", "intelligence",
])
@pytest.mark.parametrize("coordinate_value", [math.inf, -math.inf, math.nan, -1.0, 0.0, 1.0])
def test_coordinate_cleaning_preserves_other_fields_and_finite_intelligence_values(
    metric_column_name, coordinate_value, capsys,
) -> None:
    models = build_frontier_3d_synthetic_fixture_models_dataframe()
    models.loc[0, metric_column_name] = coordinate_value
    expected = models.copy(deep=True)
    is_invalid = not math.isfinite(coordinate_value) or (
        metric_column_name != "intelligence" and coordinate_value <= 0
    )
    if is_invalid:
        expected.loc[0, metric_column_name] = math.nan
        source_column = dataset_builder.VALUE_SOURCE_COLUMN_NAME_BY_METRIC_COLUMN_NAME.get(metric_column_name)
        if source_column is not None:
            expected.loc[0, source_column] = None
    cleaned = dataset_builder._models_dataframe_with_invalid_axis_coordinates_treated_as_missing(models)
    pd.testing.assert_frame_equal(cleaned, expected)
    assert len(capsys.readouterr().out.splitlines()) == int(is_invalid and not math.isnan(coordinate_value))


@pytest.mark.parametrize("relationships, field_suffix", [
    (None, ""), ([], ""),
    ({"lineages": None}, ".lineages"), ({"lineages": []}, ".lineages"),
    ({"lineages": {"family": None}}, ".lineages['family']"),
    ({"lineages": {"family": {}}}, ".lineages['family']"),
    ({"lineages": {"family": [None]}}, ".lineages['family'][0]"),
])
def test_malformed_lineage_containers_are_rejected(relationships, field_suffix, tmp_path) -> None:
    dataset = _zero_model_legal_dataset()
    dataset["metric_variants"]["effective__effective"]["interaction_relationships"] = relationships
    _assert_invalid_contract_rejected_by_all_entry_points(
        dataset, f"metric_variants.effective__effective.interaction_relationships{field_suffix}", tmp_path,
    )


@pytest.mark.parametrize("lineages", [{}, {"family": []}])
def test_empty_lineages_remain_legal(lineages) -> None:
    dataset = _zero_model_legal_dataset()
    dataset["metric_variants"]["effective__effective"]["interaction_relationships"]["lineages"] = lineages
    dataset_builder.validate_frontier_3d_visualization_dataset(dataset)


# ---------------------------------------------------------------- P0-4：bdata 根修与解码兜底


def test_frontier_mesh_passes_plain_python_lists_so_plotly_json_has_no_bdata() -> None:
    import pandas as pd

    pareto_points = pd.DataFrame(
        {
            "cost_to_run": [1.0, 10.0, 100.0, 5.0, 30.0],
            "eff_speed": [300.0, 100.0, 20.0, 50.0, 200.0],
            "intelligence": [30.0, 45.0, 60.0, 40.0, 50.0],
        }
    )
    frontier_mesh_trace = visualize._frontier_mesh(pareto_points, True, "cost_to_run", "eff_speed")
    frontier_mesh_trace_json = frontier_mesh_trace.to_plotly_json()
    for trace_field_name in ("x", "y", "z", "i", "j", "k"):
        field_value = frontier_mesh_trace_json[trace_field_name]
        assert not isinstance(field_value, dict), f"{trace_field_name} 被编码成 bdata: {field_value}"
        assert len(field_value) > 0


def test_triangle_mesh_extraction_decodes_plotly_bdata_typed_arrays() -> None:
    plotly_mesh_trace_with_typed_arrays = {
        "x": _plotly_typed_array([1.0, 2.0, 3.0], "f8"),
        "y": _plotly_typed_array([4.0, 5.0, 6.0], "f4"),
        "z": _plotly_typed_array([7.0, 8.0, 9.0], "f8", shape="3"),
        "i": _plotly_typed_array([0], "i1"),
        "j": _plotly_typed_array([1], "i4"),
        "k": _plotly_typed_array([2], "u2"),
    }
    triangle_mesh = dataset_builder._triangle_mesh_from_plotly_trace(plotly_mesh_trace_with_typed_arrays)
    assert triangle_mesh == {
        "x_coordinates": [1.0, 2.0, 3.0],
        "y_coordinates": [4.0, 5.0, 6.0],
        "z_coordinates": [7.0, 8.0, 9.0],
        "triangle_vertex_index_a": [0],
        "triangle_vertex_index_b": [1],
        "triangle_vertex_index_c": [2],
    }
    assert all(type(index) is int for index in triangle_mesh["triangle_vertex_index_a"])


def test_line_segment_extraction_decodes_bdata_and_keeps_none_separators() -> None:
    line_segments = dataset_builder._line_segments_from_plotly_trace(
        {
            "x": _plotly_typed_array([1.0, 2.0], "f8"),
            "y": [3.0, 4.0, None],
            "z": (5.0, 6.0, None),
        }
    )
    assert line_segments == {
        "x_coordinates": [1.0, 2.0],
        "y_coordinates": [3.0, 4.0, None],
        "z_coordinates": [5.0, 6.0, None],
    }


def test_default_variant_pareto_surface_mesh_has_finite_triangles_after_bdata_fix(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
) -> None:
    """回归 P0-4：实心面从 three.js 上线起就是 ['dtype','bdata']，三角形数为 0。"""
    for variant_key in ALL_METRIC_VARIANT_KEYS:
        surface_mesh = _scene(synthetic_fixture_dataset_with_log_speed_axis, variant_key)[
            "pareto_frontier_surface_triangle_mesh"
        ]
        vertex_count = len(surface_mesh["x_coordinates"])
        if variant_key == "effective__effective":
            assert len(surface_mesh["triangle_vertex_index_a"]) > 0
        for coordinate_axis_name in ("x", "y", "z"):
            assert all(
                isinstance(value, float) and math.isfinite(value)
                for value in surface_mesh[f"{coordinate_axis_name}_coordinates"]
            )
        for vertex_letter in ("a", "b", "c"):
            assert all(
                type(index) is int and 0 <= index < vertex_count
                for index in surface_mesh[f"triangle_vertex_index_{vertex_letter}"]
            )


# ---------------------------------------------------------------- 规格 5.4：校验正例


def test_validation_accepts_synthetic_fixture_dataset_for_log_and_linear_speed_axes(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
) -> None:
    dataset_builder.validate_frontier_3d_visualization_dataset(synthetic_fixture_dataset_with_log_speed_axis)
    dataset_builder.validate_frontier_3d_visualization_dataset(_build_synthetic_fixture_dataset("linear"))


def test_validation_accepts_zero_model_scene_with_empty_meshes() -> None:
    dataset_builder.validate_frontier_3d_visualization_dataset(_zero_model_legal_dataset())


def test_validation_accepts_zero_pareto_empty_surface_mesh_and_wireframe_none_separators(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
) -> None:
    dataset = copy.deepcopy(synthetic_fixture_dataset_with_log_speed_axis)
    scene = _scene(dataset)
    scene["pareto_frontier_surface_triangle_mesh"] = _empty_triangle_mesh()
    scene["pareto_frontier_wireframe_line_segments"] = {
        "x_coordinates": [1.0, 2.0, None, 3.0, 4.0, None],
        "y_coordinates": [1.0, 2.0, None, 3.0, 4.0, None],
        "z_coordinates": [1.0, 2.0, None, 3.0, 4.0, None],
    }
    dataset_builder.validate_frontier_3d_visualization_dataset(dataset)


# ---------------------------------------------------------------- 规格 5.4：校验反例


def _mutate_pareto_surface_mesh_x_to_bdata_dict(scene: dict) -> None:
    scene["pareto_frontier_surface_triangle_mesh"]["x_coordinates"] = _plotly_typed_array([1.0, 2.0], "f8")


def _mutate_pareto_surface_mesh_x_to_listed_bdata_keys(scene: dict) -> None:
    # 旧 bug 的真实形态：list(dict) 只剩下键名
    scene["pareto_frontier_surface_triangle_mesh"]["x_coordinates"] = ["dtype", "bdata"]


def _mutate_scene_to_empty_dict(scene: dict) -> None:
    scene.clear()


def _mutate_first_marker_to_drop_panel(scene: dict) -> None:
    del scene["displayed_model_markers"][0]["panel"]


def _mutate_triangle_index_to_vertex_count(scene: dict) -> None:
    mesh = scene["pareto_frontier_surface_triangle_mesh"]
    mesh["triangle_vertex_index_c"][0] = len(mesh["x_coordinates"])


def _mutate_triangle_index_to_negative(scene: dict) -> None:
    scene["pareto_frontier_surface_triangle_mesh"]["triangle_vertex_index_a"][0] = -1


def _mutate_triangle_index_to_fractional_float(scene: dict) -> None:
    scene["pareto_frontier_surface_triangle_mesh"]["triangle_vertex_index_b"][0] = 1.5


def _mutate_triangle_index_to_boolean(scene: dict) -> None:
    scene["pareto_frontier_surface_triangle_mesh"]["triangle_vertex_index_b"][0] = True


def _mutate_triangle_index_lists_to_unequal_length(scene: dict) -> None:
    scene["pareto_frontier_surface_triangle_mesh"]["triangle_vertex_index_a"].append(0)


def _mutate_mesh_coordinate_to_nan(scene: dict) -> None:
    scene["pareto_frontier_surface_triangle_mesh"]["z_coordinates"][0] = math.nan


def _mutate_mesh_coordinate_count_mismatch(scene: dict) -> None:
    scene["pareto_frontier_surface_triangle_mesh"]["y_coordinates"].pop()


def _mutate_achievable_mesh_coordinate_to_infinity(scene: dict) -> None:
    scene["achievable_frontier_surface_triangle_mesh"]["x_coordinates"][0] = math.inf


def _mutate_wireframe_coordinate_to_string(scene: dict) -> None:
    scene["pareto_frontier_wireframe_line_segments"]["x_coordinates"][0] = "1.0"


def _mutate_marker_coordinate_to_nan(scene: dict) -> None:
    scene["displayed_model_markers"][0]["x"] = math.nan


def _mutate_marker_panel_value_to_nan(scene: dict) -> None:
    scene["displayed_model_markers"][0]["panel"]["eff_speed"] = math.nan


@pytest.mark.parametrize(
    "mutate_scene_into_invalid_contract",
    [
        _mutate_pareto_surface_mesh_x_to_bdata_dict,
        _mutate_pareto_surface_mesh_x_to_listed_bdata_keys,
        _mutate_scene_to_empty_dict,
        _mutate_first_marker_to_drop_panel,
        _mutate_triangle_index_to_vertex_count,
        _mutate_triangle_index_to_negative,
        _mutate_triangle_index_to_fractional_float,
        _mutate_triangle_index_to_boolean,
        _mutate_triangle_index_lists_to_unequal_length,
        _mutate_mesh_coordinate_to_nan,
        _mutate_mesh_coordinate_count_mismatch,
        _mutate_achievable_mesh_coordinate_to_infinity,
        _mutate_wireframe_coordinate_to_string,
        _mutate_marker_coordinate_to_nan,
        _mutate_marker_panel_value_to_nan,
    ],
    ids=lambda mutate_function: mutate_function.__name__.removeprefix("_mutate_"),
)
def test_validation_rejects_semantically_invalid_scene(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
    mutate_scene_into_invalid_contract,
) -> None:
    dataset = copy.deepcopy(synthetic_fixture_dataset_with_log_speed_axis)
    mutate_scene_into_invalid_contract(_scene(dataset))
    with pytest.raises(ValueError, match="effective__effective"):
        dataset_builder.validate_frontier_3d_visualization_dataset(dataset)


def test_validation_rejects_empty_scene_even_when_other_variant_keys_are_present() -> None:
    """旧 verify_metric_semantics 曾断言「空 scene 也合法」，现在必须是反例。"""
    dataset = _zero_model_legal_dataset()
    dataset["metric_variants"]["blended__raw"]["three_dimensional_scene"] = {}
    with pytest.raises(ValueError, match="blended__raw"):
        dataset_builder.validate_frontier_3d_visualization_dataset(dataset)


# ---------------------------------------------------------------- 规格 5.1–5.3：新增字段


def test_dataset_top_level_carries_artificial_analysis_data_provenance_and_utc_timestamps(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
) -> None:
    dataset = synthetic_fixture_dataset_with_log_speed_axis
    provenance = dataset["artificial_analysis_data_provenance"]
    assert SPECIFICATION_5_1_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE_KEYS <= set(provenance)
    assert provenance["pruning_reference_date"] == "2026-09-23"
    assert provenance["current_intelligence_index_version"] == "4.3.2"
    assert provenance["artificial_analysis_attribution_url"] == "https://artificialanalysis.ai/"
    assert dataset["data_date"] == "2026-09-23"
    assert dataset["generated_at"].endswith("Z")


def test_dataset_provenance_always_carries_catalog_partition_rejection_warning_text_key(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
) -> None:
    """R1-03：契约顶层溯源总有 embedded_model_catalog_partition_rejection_warning_text（无问题时 null），

    取数侧给出的告警文本原样透传给前端页头。"""
    assert (
        synthetic_fixture_dataset_with_log_speed_axis["artificial_analysis_data_provenance"][
            "embedded_model_catalog_partition_rejection_warning_text"
        ]
        is None
    )
    models_dataframe = build_frontier_3d_synthetic_fixture_models_dataframe()
    partition_rejection_warning_text = "内嵌目录分区被拒（版本 family 4.3 ≠ API 版本 family 4.4），有效速度口径暂无当期可比点"
    dataset = build_expanded_frontier_3d_dataset_for_legacy_scene_assertions(
        models_dataframe,
        since_months=18,
        max_layers=3,
        hard_age_cutoff_months=36,
        speed_scale="log",
        artificial_analysis_data_provenance={
            **models_dataframe.attrs[
                "artificial_analysis_data_provenance"
            ],
            "embedded_model_catalog_partition_rejection_warning_text": partition_rejection_warning_text,
        },
    )
    assert (
        dataset["artificial_analysis_data_provenance"]["embedded_model_catalog_partition_rejection_warning_text"]
        == partition_rejection_warning_text
    )


def test_pruning_reference_date_and_data_date_default_to_api_fetched_at_date() -> None:
    dataset = build_expanded_frontier_3d_dataset_for_legacy_scene_assertions(
        build_frontier_3d_synthetic_fixture_models_dataframe(),
        since_months=18,
        max_layers=3,
        hard_age_cutoff_months=36,
        speed_scale="log",
    )
    assert dataset["artificial_analysis_data_provenance"]["pruning_reference_date"] == "2026-09-23"
    assert dataset["data_date"] == "2026-09-23"


def test_builder_without_any_reference_date_source_raises_instead_of_using_wall_clock() -> None:
    models_dataframe = build_frontier_3d_synthetic_fixture_models_dataframe()
    models_dataframe.attrs.clear()
    with pytest.raises(ValueError, match="剪枝参考日期"):
        build_expanded_frontier_3d_dataset_for_legacy_scene_assertions(
            models_dataframe,
            since_months=18,
            max_layers=3,
            hard_age_cutoff_months=36,
            speed_scale="log",
        )


def test_every_three_dimensional_scene_is_strict_json_without_nan_or_numpy_scalars(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
) -> None:
    for variant_key, variant in synthetic_fixture_dataset_with_log_speed_axis["metric_variants"].items():
        json.dumps(variant["three_dimensional_scene"], allow_nan=False)
        json.dumps(variant["excluded_models_with_drop_reason"], allow_nan=False)
    json.dumps(
        synthetic_fixture_dataset_with_log_speed_axis["artificial_analysis_data_provenance"],
        allow_nan=False,
    )


def test_variant_counts_split_displayed_models_into_analysis_eligible_and_historical(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
) -> None:
    for variant_key in ALL_METRIC_VARIANT_KEYS:
        variant = synthetic_fixture_dataset_with_log_speed_axis["metric_variants"][variant_key]
        markers = _scene(synthetic_fixture_dataset_with_log_speed_axis, variant_key)[
            "displayed_model_markers"
        ]
        eligible_marker_count = sum(
            marker["analysis_eligibility"]["is_analysis_eligible_for_current_metric_variant"]
            for marker in markers
        )
        assert variant["kept_model_count"] == len(markers)
        assert variant["analysis_eligible_model_count"] == eligible_marker_count
        assert variant["historical_version_value_model_count"] == len(markers) - eligible_marker_count
        assert variant["pareto_model_count"] == sum(marker["panel"]["layer"] == 1 for marker in markers)
        current_view = _scene(synthetic_fixture_dataset_with_log_speed_axis, variant_key)["current_view"]
        assert current_view["analysis_eligible_model_count"] == variant["analysis_eligible_model_count"]
        assert (
            current_view["historical_version_value_model_count"]
            == variant["historical_version_value_model_count"]
        )
        assert current_view["pareto_model_count"] == variant["pareto_model_count"]
        assert current_view["speed_axis_title_text"]
    assert synthetic_fixture_dataset_with_log_speed_axis["metric_variants"]["blended__raw"][
        "historical_version_value_model_count"
    ] == 0
    assert synthetic_fixture_dataset_with_log_speed_axis["metric_variants"]["effective__effective"][
        "historical_version_value_model_count"
    ] > 0


def test_historical_version_marker_has_null_layer_standout_and_normalized_coordinates(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
) -> None:
    historical_marker = _markers_by_name(synthetic_fixture_dataset_with_log_speed_axis, "effective__effective")[
        "Claude Legacy 4 (Reasoning)"
    ]
    assert historical_marker["analysis_eligibility"] == {
        "is_analysis_eligible_for_current_metric_variant": False,
        "ineligibility_reason_codes": [
            "cost_to_run_value_not_from_current_intelligence_index_version",
            "output_token_count_value_not_from_current_intelligence_index_version",
        ],
        "ineligibility_reason_text": "历史口径（v4.1 成本/冗长度），不参与本口径前沿计算",
    }
    assert historical_marker["panel"]["layer"] is None
    assert all(value is None for value in historical_marker["standout_metrics"].values())
    assert all(value is None for value in historical_marker["normalized_improvement_coordinates"].values())
    assert historical_marker["value_provenance"] == {
        "cost_to_run_value_source": "versioned_non_current_fallback_snapshot",
        "cost_to_run_value_intelligence_index_version": "4.1",
        "cost_to_run_value_fetched_at_utc": "2026-07-01",
        "output_token_count_value_source": "versioned_non_current_fallback_snapshot",
        "output_token_count_value_intelligence_index_version": "4.1",
        "output_token_count_value_fetched_at_utc": "2026-07-01",
        "blended_price_cache_hit_price_source": "computed_with_api_cache_hit_price",
    }
    assert historical_marker["artificial_analysis_intelligence_index_is_estimated"] is False

    same_model_in_blended_raw_variant = _markers_by_name(
        synthetic_fixture_dataset_with_log_speed_axis, "blended__raw"
    )["Claude Legacy 4 (Reasoning)"]
    assert same_model_in_blended_raw_variant["analysis_eligibility"][
        "is_analysis_eligible_for_current_metric_variant"
    ]
    assert same_model_in_blended_raw_variant["panel"]["layer"] == 1


def test_analysis_eligible_marker_keeps_numeric_layer_and_standout_values(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
) -> None:
    eligible_marker = _markers_by_name(synthetic_fixture_dataset_with_log_speed_axis, "effective__effective")[
        "GPT-6 (high)"
    ]
    assert eligible_marker["analysis_eligibility"] == {
        "is_analysis_eligible_for_current_metric_variant": True,
        "ineligibility_reason_codes": [],
        "ineligibility_reason_text": None,
    }
    assert isinstance(eligible_marker["panel"]["layer"], float)
    assert eligible_marker["normalized_improvement_coordinates"]["intelligence"] is not None


def test_excluded_models_list_explains_every_scored_model_that_is_not_displayed(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
) -> None:
    default_variant = synthetic_fixture_dataset_with_log_speed_axis["metric_variants"]["effective__effective"]
    excluded_models = default_variant["excluded_models_with_drop_reason"]
    excluded_intelligence_values = [excluded_model["intelligence"] for excluded_model in excluded_models]
    assert excluded_intelligence_values == sorted(excluded_intelligence_values, reverse=True)
    excluded_by_name = {excluded_model["name"]: excluded_model for excluded_model in excluded_models}
    assert "Unscored Model" not in excluded_by_name
    assert {key: value for key, value in excluded_models[0].items() if key not in {"base_model_name", "reasoning_level_label", "reasoning_level_sort_order", "analysis_eligibility"}} == {
        "name": "Speedless Genius (Max Effort)",
        "model_uuid": "00000000-0000-4000-9000-000000000017",
        "creator": "Anthropic",
        "intelligence": 70.0,
        "release_date": "2026-09-01",
        "missing_dimension_names": ["speed"],
        "drop_reason": "缺维度：速度",
        "is_absent_from_accepted_embedded_model_catalog_partition": False,
    }
    assert excluded_by_name["Brand New Model (V-3)"]["missing_dimension_names"] == ["speed"]
    assert excluded_by_name["Brand New Model (V-3)"]["is_absent_from_accepted_embedded_model_catalog_partition"]
    assert excluded_by_name["Gemini 2 Pro"]["drop_reason"] == "过旧(硬截断)"
    assert excluded_by_name["Gemini 2 Pro"]["missing_dimension_names"] == []
    displayed_model_names = set(_markers_by_name(synthetic_fixture_dataset_with_log_speed_axis, "effective__effective"))
    assert displayed_model_names.isdisjoint(excluded_by_name)

    raw_speed_variant_displayed_names = set(
        _markers_by_name(synthetic_fixture_dataset_with_log_speed_axis, "effective__raw")
    )
    assert "Brand New Model (V-3)" in raw_speed_variant_displayed_names


def test_axis_titles_carry_intelligence_index_version_and_effective_speed_definition(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
) -> None:
    axes = _scene(synthetic_fixture_dataset_with_log_speed_axis)["three_dimensional_axis_configuration"]
    assert axes["z_axis"]["title_text"] == "智能指数（AA Intelligence Index v4.3.2）"
    assert axes["y_axis"]["title_text"] == EFFECTIVE_SPEED_AXIS_TITLE_TEXT_FOR_LOG_SCALE
    assert (
        _scene(synthetic_fixture_dataset_with_log_speed_axis)["current_view"]["speed_axis_title_text"]
        == EFFECTIVE_SPEED_AXIS_TITLE_TEXT_FOR_LOG_SCALE
    )
    assert _scene(synthetic_fixture_dataset_with_log_speed_axis, "effective__raw")[
        "three_dimensional_axis_configuration"
    ]["y_axis"]["title_text"] == "原始速度 tok/s（对数）"
    speed_metric_definitions = synthetic_fixture_dataset_with_log_speed_axis["speed_metric_definitions"]
    assert speed_metric_definitions["effective"]["label"] == "有效速度"
    assert speed_metric_definitions["effective"]["axis_title_text"] == (
        "有效速度（按冗长度归一的生成速度，不含 TTFT 与工具耗时）"
    )

    linear_dataset = _build_synthetic_fixture_dataset("linear")
    assert _scene(linear_dataset)["three_dimensional_axis_configuration"]["y_axis"]["title_text"] == (
        "有效速度（按冗长度归一的生成速度，不含 TTFT 与工具耗时） tok/s"
    )
    assert _scene(linear_dataset)["three_dimensional_axis_configuration"]["y_axis"]["scale_type"] == "linear"


def test_non_positive_placeholder_prices_are_treated_as_missing_cost_dimension(capsys) -> None:
    """「无托管定价」的开源权重模型 input=output=0：7:2:1 混合价按公式算出 0，不能上对数轴，
    必须按缺失处理（缺维度：成本），而不是让 log10(0) 把归一化与趋势拟合变成 NaN/崩溃。"""
    models_dataframe = build_frontier_3d_synthetic_fixture_models_dataframe()
    zero_priced_row_mask = models_dataframe["name"].isin(["GPT-6 mini", "Mistral Large 4"])
    models_dataframe.loc[zero_priced_row_mask, "blended_price_cache_input_output_7_to_2_to_1"] = 0.0
    models_dataframe.loc[zero_priced_row_mask, "blended_price_cache_hit_price_source"] = (
        "computed_with_input_price_as_cache_hit_price"
    )
    dataset = build_expanded_frontier_3d_dataset_for_legacy_scene_assertions(
        models_dataframe,
        since_months=18,
        max_layers=3,
        hard_age_cutoff_months=36,
        speed_scale="log",
        pruning_reference_date=FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE,
    )
    dataset_builder.validate_frontier_3d_visualization_dataset(dataset)
    assert "2 个模型的 7:2:1 混合单价 ≤ 0" in capsys.readouterr().out
    for variant_key in ("blended__effective", "blended__raw"):
        displayed_names = set(_markers_by_name(dataset, variant_key))
        assert displayed_names.isdisjoint({"GPT-6 mini", "Mistral Large 4"})
        excluded_by_name = {
            excluded_model["name"]: excluded_model
            for excluded_model in dataset["metric_variants"][variant_key]["excluded_models_with_drop_reason"]
        }
        assert excluded_by_name["GPT-6 mini"]["missing_dimension_names"] == ["cost"]
        assert excluded_by_name["GPT-6 mini"]["drop_reason"] == "缺维度：成本"
        for marker in _scene(dataset, variant_key)["displayed_model_markers"]:
            assert marker["normalized_improvement_coordinates"]["cost_efficiency"] is None or math.isfinite(
                marker["normalized_improvement_coordinates"]["cost_efficiency"]
            )
    gpt_6_mini_in_effective_variant = _markers_by_name(dataset, "effective__effective")["GPT-6 mini"]
    assert gpt_6_mini_in_effective_variant["panel"]["blended_price_cache_input_output_7_to_2_to_1"] is None
    assert gpt_6_mini_in_effective_variant["value_provenance"]["blended_price_cache_hit_price_source"] is None


def test_none_and_blank_creators_map_to_placeholder_organization_identity(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
) -> None:
    identities = synthetic_fixture_dataset_with_log_speed_axis["organization_identity_metadata_by_creator_name"]
    for variant_key in ALL_METRIC_VARIANT_KEYS:
        for marker in _scene(synthetic_fixture_dataset_with_log_speed_axis, variant_key)["displayed_model_markers"]:
            assert marker["creator"] in identities
            assert marker["creator"].strip()
    default_markers = _markers_by_name(synthetic_fixture_dataset_with_log_speed_axis, "effective__effective")
    assert default_markers["Anonymous Creator Model"]["creator"] == "?"
    assert default_markers["Blank Creator Model"]["creator"] == "?"
    assert identities["?"]["country_region_category"] == "unclassified"


# ---------------------------------------------------------------- 审查修复


def test_triangle_mesh_extraction_converts_f8_encoded_integer_indices_to_python_int() -> None:
    """R3-F9：Plotly 以 f8 编码三角索引时，整数值浮点必须转成 int，才能通过契约的整数校验。"""
    triangle_mesh = dataset_builder._triangle_mesh_from_plotly_trace(
        {
            "x": [0.0, 1.0, 2.0, 3.0],
            "y": [0.0, 1.0, 0.0, 1.0],
            "z": [0.0, 0.0, 1.0, 1.0],
            "i": _plotly_typed_array([0.0, 1.0], "f8"),
            "j": _plotly_typed_array([1.0, 2.0], "f8"),
            "k": _plotly_typed_array([2.0, 3.0], "f8"),
        }
    )
    for triangle_vertex_index_list_key in (
        "triangle_vertex_index_a",
        "triangle_vertex_index_b",
        "triangle_vertex_index_c",
    ):
        assert all(type(index) is int for index in triangle_mesh[triangle_vertex_index_list_key])
    assert triangle_mesh["triangle_vertex_index_c"] == [2, 3]


def test_validation_rejects_marker_whose_creator_has_no_identity_metadata(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
) -> None:
    """R2-F5：前端按 creator 查身份元数据，缺失会让 buildModelMarkers 抛 TypeError、整页交互失效。"""
    dataset = copy.deepcopy(synthetic_fixture_dataset_with_log_speed_axis)
    first_marker = _scene(dataset, "effective__effective")["displayed_model_markers"][0]
    first_marker["creator"] = ""
    with pytest.raises(ValueError, match="effective__effective.*creator"):
        dataset_builder.validate_frontier_3d_visualization_dataset(dataset)


def test_validation_explains_legacy_contract_whose_mesh_is_listed_bdata_keys(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
) -> None:
    """R2-F11：9/23 旧契约的网格是 ['dtype','bdata']，报错要直说「旧契约、请重新生成」。"""
    dataset = copy.deepcopy(synthetic_fixture_dataset_with_log_speed_axis)
    _mutate_pareto_surface_mesh_x_to_listed_bdata_keys(_scene(dataset))
    with pytest.raises(ValueError, match="旧契约.*重新生成"):
        dataset_builder.validate_frontier_3d_visualization_dataset(dataset)


# ---------------------------------------------------------------- RVF-002：有效速度全缺时空口径输出合法空场景
EFFECTIVE_SPEED_METRIC_VARIANT_KEYS = ("effective__effective", "blended__effective")
RAW_SPEED_METRIC_VARIANT_KEYS = ("effective__raw", "blended__raw")
INTELLIGENCE_INDEX_VERSION_WITHOUT_CONFIGURED_EFFECTIVE_SPEED_NORMALIZATION_CONSTANT = "4.4"


def _synthetic_fixture_models_dataframe_with_every_effective_speed_missing():
    """token 指数版本改成没有配置归一常数的 4.4，全部有效速度缺失。

    与 R1-03「没有被接受的目录分区、又没有历史 token」同形：有效速度两个口径零模型，
    原始速度两个口径照常有保留模型。
    """
    models_dataframe = build_frontier_3d_synthetic_fixture_models_dataframe()
    models_dataframe["output_token_count_value_intelligence_index_version"] = (
        INTELLIGENCE_INDEX_VERSION_WITHOUT_CONFIGURED_EFFECTIVE_SPEED_NORMALIZATION_CONSTANT
    )
    models_dataframe["eff_speed"] = math.nan
    return models_dataframe


def _build_dataset_with_every_effective_speed_missing(**extra_keyword_arguments) -> dict:
    keyword_arguments = {
        "since_months": 18,
        "max_layers": 3,
        "hard_age_cutoff_months": 36,
        "speed_scale": "log",
        "pruning_reference_date": FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE,
    }
    keyword_arguments.update(extra_keyword_arguments)
    return build_expanded_frontier_3d_dataset_for_legacy_scene_assertions(
        _synthetic_fixture_models_dataframe_with_every_effective_speed_missing(), **keyword_arguments
    )


@pytest.mark.parametrize("speed_scale", ["log", "linear"])
def test_builder_keeps_raw_speed_variants_and_outputs_legal_empty_scene_when_every_effective_speed_is_missing(
    synthetic_fixture_dataset_with_log_speed_axis: dict,
    speed_scale: str,
) -> None:
    """RVF-002 / R1-03：有效速度全缺只让有效速度口径变成合法空场景，不阻断原始速度口径。"""
    dataset = _build_dataset_with_every_effective_speed_missing(
        speed_scale=speed_scale, initial_speed_metric_name="raw"
    )
    dataset_builder.validate_frontier_3d_visualization_dataset(dataset)
    assert dataset["initial_variant_key"] == "effective__raw"

    baseline_dataset = (
        synthetic_fixture_dataset_with_log_speed_axis
        if speed_scale == "log"
        else _build_synthetic_fixture_dataset(speed_scale)
    )
    for raw_speed_variant_key in RAW_SPEED_METRIC_VARIANT_KEYS:
        raw_speed_variant = dataset["metric_variants"][raw_speed_variant_key]
        baseline_raw_speed_variant = baseline_dataset["metric_variants"][raw_speed_variant_key]
        assert raw_speed_variant["kept_model_count"] > 0
        assert raw_speed_variant["kept_model_count"] == baseline_raw_speed_variant["kept_model_count"]
        assert sorted(_markers_by_name(dataset, raw_speed_variant_key)) == sorted(
            _markers_by_name(baseline_dataset, raw_speed_variant_key)
        )

    scored_model_count = int(
        _synthetic_fixture_models_dataframe_with_every_effective_speed_missing()["intelligence"].notna().sum()
    )
    for effective_speed_variant_key in EFFECTIVE_SPEED_METRIC_VARIANT_KEYS:
        effective_speed_variant = dataset["metric_variants"][effective_speed_variant_key]
        empty_scene = _scene(dataset, effective_speed_variant_key)
        assert empty_scene["displayed_model_markers"] == []
        assert effective_speed_variant["kept_model_count"] == 0
        assert effective_speed_variant["pareto_model_count"] == 0
        assert effective_speed_variant["analysis_eligible_model_count"] == 0
        assert effective_speed_variant["historical_version_value_model_count"] == 0
        assert empty_scene["current_view"]["kept_model_count"] == 0
        assert empty_scene["pareto_frontier_wireframe_line_segments"]["x_coordinates"] == []
        for triangle_mesh_key in TRIANGLE_MESH_KEYS_IN_THREE_DIMENSIONAL_SCENE:
            assert empty_scene[triangle_mesh_key]["triangle_vertex_index_a"] == []
        # 空场景的坐标轴仍要可画：每轴两个有限数且上界大于下界
        for axis_configuration in empty_scene["three_dimensional_axis_configuration"].values():
            fixed_range = axis_configuration["fixed_range"]
            assert len(fixed_range) == 2
            assert all(isinstance(value, float) and math.isfinite(value) for value in fixed_range)
            assert fixed_range[1] > fixed_range[0]
        # 有智能分的模型全部列进未上图名单，并说明缺速度
        excluded_models = effective_speed_variant["excluded_models_with_drop_reason"]
        assert len(excluded_models) == scored_model_count
        json.dumps(empty_scene, allow_nan=False)
        json.dumps(excluded_models, allow_nan=False)
        json.dumps(
            cli._figure_from_dataset_variant(dataset, effective_speed_variant_key).to_plotly_json()["layout"], allow_nan=False, cls=PlotlyJSONEncoder
        )


def test_builder_keeps_requested_empty_initial_variant_and_its_static_export_figure_still_builds() -> None:
    """RVF-002：初始口径恰好是空口径时契约照常生成，初始口径不被偷偷改掉；静态导出图可构造。"""
    from src import cli

    dataset = _build_dataset_with_every_effective_speed_missing()
    dataset_builder.validate_frontier_3d_visualization_dataset(dataset)
    assert dataset["initial_variant_key"] == "effective__effective"
    initial_static_export_figure = cli._figure_from_dataset_variant(dataset, dataset["initial_variant_key"])
    assert initial_static_export_figure.layout.scene.xaxis.range is not None
    assert all(
        trace.x is None or len(trace.x) == 0 for trace in initial_static_export_figure.data
    )


def test_builder_still_raises_when_every_metric_variant_has_no_kept_model() -> None:
    """全部四个口径都零模型时仍按原语义报错（剪枝参数或数据整体有问题），不静默输出全空报告。"""
    models_dataframe = build_frontier_3d_synthetic_fixture_models_dataframe()
    models_dataframe["cost_to_run"] = math.nan
    models_dataframe["blended_price_cache_input_output_7_to_2_to_1"] = math.nan
    models_dataframe["blended_price_cache_hit_price_source"] = None
    with pytest.raises(ValueError, match="请放宽参数"):
        build_expanded_frontier_3d_dataset_for_legacy_scene_assertions(
            models_dataframe,
            since_months=18,
            max_layers=3,
            hard_age_cutoff_months=36,
            speed_scale="log",
            pruning_reference_date=FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE,
        )
