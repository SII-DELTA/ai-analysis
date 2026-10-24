"""将已验证的预算阶梯算法接入正式报告，保持 v2 网格字段和原始单位。"""
from __future__ import annotations

import math

from .frontier_3d_geometry_comparison import build_exact_achievable_step_geometry


def build_exact_achievable_frontier_geometry_from_scene(scene):
    """仅使用展示且参与当前分析的 Pareto 点；相邻可达平台间保留立面。"""
    axes = scene["three_dimensional_axis_configuration"]
    projected_bounds = [axes[key]["fixed_range"] for key in ("x_axis", "y_axis")]
    raw_coordinates_by_projected_axis_coordinate = [{}, {}]

    def project_coordinate(raw_coordinate, axis_index):
        scale = axes[("x_axis", "y_axis")[axis_index]]["scale_type"]
        if scale not in ("log", "linear"):
            raise ValueError("实际可达前沿仅支持 log/linear 预算轴")
        projected = math.log10(raw_coordinate) if scale == "log" else raw_coordinate
        raw_coordinates_by_projected_axis_coordinate[axis_index][projected] = raw_coordinate
        return projected

    # 沿用旧 v2 的资格降级约定：缺字段时参与分析，只有显式 False 才排除。
    points = [
        [project_coordinate(model["x"], 0), project_coordinate(model["y"], 1), model["z"]]
        for model in scene["displayed_model_markers"]
        if model.get("analysis_eligibility", {}).get("is_analysis_eligible_for_current_metric_variant") is not False
        and model.get("panel", {}).get("layer") == 1
    ]
    geometry = build_exact_achievable_step_geometry(points, projected_bounds)

    def raw_vertex(projected_vertex):
        result = list(projected_vertex)
        for axis_index, axis_name in enumerate(("x_axis", "y_axis")):
            projected = projected_vertex[axis_index]
            if projected in raw_coordinates_by_projected_axis_coordinate[axis_index]:
                result[axis_index] = raw_coordinates_by_projected_axis_coordinate[axis_index][projected]
            elif axes[axis_name]["scale_type"] == "log":
                result[axis_index] = 10 ** projected
        return result

    vertices = [raw_vertex(vertex) for vertex in geometry["triangle_mesh"]["vertices"]]
    triangles = geometry["triangle_mesh"]["triangles"]
    line_vertices = [
        vertex
        for segment in geometry["boundary_line_segments"]
        for vertex in [*map(raw_vertex, segment), [None, None, None]]
    ]
    return {
        "achievable_frontier_geometry_kind": "exact_budget_steps",
        "achievable_frontier_surface_triangle_mesh": {
            **{f"{axis}_coordinates": [vertex[index] for vertex in vertices] for index, axis in enumerate("xyz")},
            **{f"triangle_vertex_index_{axis}": [triangle[index] for triangle in triangles] for index, axis in enumerate("abc")},
        },
        "exact_achievable_frontier_boundary_line_segments": {
            f"{axis}_coordinates": [vertex[index] for vertex in line_vertices] for index, axis in enumerate("xyz")
        },
    }
