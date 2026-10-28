"""直接生成原始单位的几何数组；不创建 Plotly 对象。"""
from __future__ import annotations

import numpy as np
from scipy.spatial import Delaunay, QhullError


def empty_triangle_mesh():
    return {key: [] for key in (
        "x_coordinates", "y_coordinates", "z_coordinates",
        "triangle_vertex_index_a", "triangle_vertex_index_b", "triangle_vertex_index_c",
    )}


def build_delaunay_neighbor_reference_geometry(pareto, speed_log, cost_column, speed_column):
    """保持 v2 的归一化投影、三角顺序和边排序；共线点输出空几何。"""
    mesh = empty_triangle_mesh()
    wire = {f"{axis}_coordinates": [] for axis in "xyz"}
    if len(pareto) < 4:
        return mesh, wire
    coordinates = pareto[[cost_column, speed_column, "intelligence"]].to_numpy(float)
    projected = coordinates[:, :2].copy()
    projected[:, 0] = np.log10(projected[:, 0])
    if speed_log:
        projected[:, 1] = np.log10(projected[:, 1])
    for index in range(2):
        values = projected[:, index]
        value_range = values.max() - values.min()
        projected[:, index] = (values - values.min()) / value_range if value_range else values * 0.0
    try:
        triangles = Delaunay(projected).simplices
    except QhullError:
        return mesh, wire
    mesh.update({f"{axis}_coordinates": coordinates[:, index].tolist() for index, axis in enumerate("xyz")})
    mesh.update({f"triangle_vertex_index_{axis}": triangles[:, index].tolist() for index, axis in enumerate("abc")})
    edges = {tuple(sorted((int(a), int(b)))) for triangle in triangles for a, b in (
        (triangle[0], triangle[1]), (triangle[1], triangle[2]), (triangle[2], triangle[0]),
    )}
    for a, b in sorted(edges):
        for index, axis in enumerate("xyz"):
            wire[f"{axis}_coordinates"].extend([float(coordinates[a, index]), float(coordinates[b, index]), None])
    return mesh, wire


def build_legacy_achievable_step_geometry_for_v2_comparison(pareto, cost_column, speed_column):
    """保留旧 v2 平台网格，供迁移对拍和旧 Plotly 调用方使用。"""
    mesh = empty_triangle_mesh()
    points = pareto[[cost_column, speed_column, "intelligence"]].dropna()
    points = points[(points[cost_column] > 0) & (points[speed_column] > 0)]
    if points.empty:
        return mesh
    costs = np.sort(points[cost_column].astype(float).unique())
    speeds = np.sort(points[speed_column].astype(float).unique())
    cost_upper = costs[-1] * ((costs[-1] / costs[-2]) ** 0.25 if len(costs) > 1 else 1.08)
    speed_lower = max(speeds[0] / ((speeds[1] / speeds[0]) ** 0.25 if len(speeds) > 1 else 1.08), np.nextafter(0.0, 1.0))
    x_edges = np.r_[costs, cost_upper]
    y_edges = np.r_[speed_lower, speeds]
    point_cost, point_speed, point_intelligence = points[[cost_column, speed_column, "intelligence"]].to_numpy(float).T
    for x_index in range(len(costs)):
        for y_index in range(len(speeds)):
            feasible = (point_cost <= x_edges[x_index]) & (point_speed >= y_edges[y_index + 1])
            if not feasible.any():
                continue
            intelligence = float(point_intelligence[feasible].max())
            offset = len(mesh["x_coordinates"])
            mesh["x_coordinates"].extend(map(float, (x_edges[x_index], x_edges[x_index + 1], x_edges[x_index + 1], x_edges[x_index])))
            mesh["y_coordinates"].extend(map(float, (y_edges[y_index], y_edges[y_index], y_edges[y_index + 1], y_edges[y_index + 1])))
            mesh["z_coordinates"].extend([intelligence] * 4)
            mesh["triangle_vertex_index_a"].extend([offset, offset])
            mesh["triangle_vertex_index_b"].extend([offset + 1, offset + 2])
            mesh["triangle_vertex_index_c"].extend([offset + 2, offset + 3])
    return mesh


def plotly_coordinate_keywords_from_scene_geometry(geometry):
    """只转换字段名；保留坐标原值与断线分隔。"""
    return {
        **{axis: geometry[f"{axis}_coordinates"] for axis in "xyz"},
        **{axis: geometry[f"triangle_vertex_index_{source}"] for axis, source in zip("ijk", "abc") if f"triangle_vertex_index_{source}" in geometry},
    }
