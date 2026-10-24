"""正式报告的实际可达几何：预算阈值精确，旧契约输入保持只读。"""
import copy
import json
import re

import pytest

from src.frontier_3d_exact_achievable_frontier_scene_geometry import (
    build_exact_achievable_frontier_geometry_from_scene,
)


def _scene(speed_scale="log"):
    def marker(cost, speed, intelligence, eligible=True, layer=1):
        return {"x": cost, "y": speed, "z": intelligence,
                "analysis_eligibility": {"is_analysis_eligible_for_current_metric_variant": eligible},
                "panel": {"layer": layer}}
    return {
        "three_dimensional_axis_configuration": {
            "x_axis": {"scale_type": "log", "fixed_range": [0, 2]},
            "y_axis": {"scale_type": speed_scale, "fixed_range": [0, 2] if speed_scale == "log" else [0, 100]},
            "z_axis": {"scale_type": "linear", "fixed_range": [0, 100]},
        },
        "displayed_model_markers": [marker(10, 10, 40), marker(50, 50, 60),
                                    marker(1, 100, 99, False), marker(1, 100, 98, True, 2)],
    }


@pytest.mark.parametrize("speed_scale", ["log", "linear"])
@pytest.mark.parametrize("analysis_eligibility_field_state", [
    "complete", "missing_eligibility_object", "missing_eligibility_flag",
])
def test_exact_scene_geometry_uses_raw_budget_thresholds_and_only_analysis_pareto_points(
    speed_scale, analysis_eligibility_field_state,
):
    scene = _scene(speed_scale)
    for model in scene["displayed_model_markers"]:
        # 每种旧契约形态都保留显式 False，确保降级不会重新纳入被排除点。
        if model["analysis_eligibility"]["is_analysis_eligible_for_current_metric_variant"] is False:
            continue
        if analysis_eligibility_field_state == "missing_eligibility_object":
            model.pop("analysis_eligibility")
        elif analysis_eligibility_field_state == "missing_eligibility_flag":
            model["analysis_eligibility"].pop("is_analysis_eligible_for_current_metric_variant")
    original = copy.deepcopy(scene)
    result = build_exact_achievable_frontier_geometry_from_scene(scene)
    mesh = result["achievable_frontier_surface_triangle_mesh"]
    assert scene == original
    assert result["achievable_frontier_geometry_kind"] == "exact_budget_steps"
    assert set(mesh["z_coordinates"]) == {40, 60}
    assert any(value == pytest.approx(50) for value in mesh["x_coordinates"])
    assert any(value == pytest.approx(50) for value in mesh["y_coordinates"])
    # 可达面只延伸到更宽松的成本上限和速度下限，不封到智能轴底部。
    assert min(mesh["x_coordinates"]) == pytest.approx(10)
    assert max(mesh["x_coordinates"]) == pytest.approx(100)
    assert min(mesh["y_coordinates"]) == pytest.approx(1 if speed_scale == "log" else 0)
    assert max(mesh["y_coordinates"]) == pytest.approx(50)
    assert result["exact_achievable_frontier_boundary_line_segments"]["x_coordinates"]


def test_exact_scene_geometry_is_empty_when_no_analysis_pareto_model_is_available():
    scene = _scene()
    for model in scene["displayed_model_markers"]:
        model["analysis_eligibility"]["is_analysis_eligible_for_current_metric_variant"] = False
    result = build_exact_achievable_frontier_geometry_from_scene(scene)
    assert all(values == [] for values in result["achievable_frontier_surface_triangle_mesh"].values())
    assert all(values == [] for values in result["exact_achievable_frontier_boundary_line_segments"].values())


@pytest.mark.parametrize("analysis_eligibility_field_state", [
    "complete", "missing_eligibility_object", "missing_eligibility_flag",
])
def test_rendering_legacy_v2_replaces_sampled_surface_without_mutating_source(
    analysis_eligibility_field_state,
):
    from plotly.utils import PlotlyJSONEncoder
    from src.frontier_3d_self_contained_html_renderer import render_frontier_3d_self_contained_html_report
    from src.frontier_3d_visualization_dataset_builder import build_frontier_3d_visualization_dataset
    from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe
    dataset = json.loads(json.dumps(build_frontier_3d_visualization_dataset(
        build_frontier_3d_synthetic_fixture_models_dataframe(), since_months=18,
        max_layers=3, hard_age_cutoff_months=36, speed_scale="log",
    ), cls=PlotlyJSONEncoder))
    for variant in dataset["metric_variants"].values():
        scene = variant["three_dimensional_scene"]
        scene.pop("achievable_frontier_geometry_kind", None)
        scene.pop("exact_achievable_frontier_boundary_line_segments", None)
        # 模拟历史 v2 的空采样网格；页面必须由原始模型预算阈值构建真实阶梯。
        scene["achievable_frontier_surface_triangle_mesh"] = {
            key: [] for key in scene["achievable_frontier_surface_triangle_mesh"]
        }
        for model in scene["displayed_model_markers"]:
            if analysis_eligibility_field_state == "missing_eligibility_object":
                model.pop("analysis_eligibility")
            elif analysis_eligibility_field_state == "missing_eligibility_flag":
                model["analysis_eligibility"].pop("is_analysis_eligible_for_current_metric_variant")
    original = copy.deepcopy(dataset)
    document = render_frontier_3d_self_contained_html_report(dataset)
    embedded = json.loads(re.search(r'id="frontier-3d-visualization-dataset-json" type="application/json">(.*?)</script>', document, re.S)[1])
    assert dataset == original
    assert set(embedded["metric_variants"]) == {
        "effective__effective", "effective__raw", "blended__effective", "blended__raw",
    }
    for key, variant in embedded["metric_variants"].items():
        scene = variant["three_dimensional_scene"]
        assert scene["achievable_frontier_geometry_kind"] == "exact_budget_steps"
        assert scene["achievable_frontier_surface_triangle_mesh"]["triangle_vertex_index_a"]
        assert scene["exact_achievable_frontier_boundary_line_segments"]["x_coordinates"]
        assert scene["pareto_frontier_surface_triangle_mesh"] == original["metric_variants"][key]["three_dimensional_scene"]["pareto_frontier_surface_triangle_mesh"]
        assert scene["pareto_frontier_wireframe_line_segments"] == original["metric_variants"][key]["three_dimensional_scene"]["pareto_frontier_wireframe_line_segments"]
