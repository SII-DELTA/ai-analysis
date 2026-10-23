"""独立 demo 的精确阶梯几何与插值误差；不改主报告的 v2 几何路径。

成本预算沿第一坐标增大为放宽，速度下限沿第二坐标减小为放宽。
坐标已按输入轴刻度投影，默认归一到共同视域 [0,1]²；智能保留原始分数。
"""
from __future__ import annotations

from collections import defaultdict
import math

import numpy as np


PROJECTED_GEOMETRY_AREA_TOLERANCE = 1e-14
REVERSE_TRIANGLE_GRADIENT_TOLERANCE = 1e-9
MODEL_INTELLIGENCE_EXCESS_TOLERANCE = 1e-8


def highest_achievable_intelligence(pareto_points, cost_budget, speed_floor):
    """精确包含预算阈值；没有满足两个预算的模型时返回 None。"""
    feasible_intelligence_values = [
        intelligence
        for cost, speed, intelligence in pareto_points
        if cost <= cost_budget and speed >= speed_floor
    ]
    return max(feasible_intelligence_values, default=None)


def _merge_collinear_boundary_segments(segments):
    intervals_by_line = defaultdict(list)
    for first_vertex, second_vertex in segments:
        varying_axis = next(index for index in range(3) if first_vertex[index] != second_vertex[index])
        fixed_coordinates = tuple(first_vertex[index] for index in range(3) if index != varying_axis)
        intervals_by_line[(varying_axis, *fixed_coordinates)].append(
            sorted((first_vertex[varying_axis], second_vertex[varying_axis]))
        )
    merged_segments = []
    for (varying_axis, *fixed_coordinates), intervals in sorted(intervals_by_line.items()):
        merged_intervals = []
        for interval_start, interval_end in sorted(intervals):
            if merged_intervals and interval_start <= merged_intervals[-1][1]:
                merged_intervals[-1][1] = max(merged_intervals[-1][1], interval_end)
            else:
                merged_intervals.append([interval_start, interval_end])
        for interval_start, interval_end in merged_intervals:
            first_vertex, second_vertex = list(fixed_coordinates), list(fixed_coordinates)
            first_vertex.insert(varying_axis, interval_start)
            second_vertex.insert(varying_axis, interval_end)
            merged_segments.append([first_vertex, second_vertex])
    return merged_segments


def _merge_coplanar_vertical_wall_rectangles(rectangles):
    intervals_by_plane_and_heights = defaultdict(list)
    for vertices in rectangles:
        varying_axis = 1 if vertices[0][0] == vertices[1][0] else 0
        fixed_axis = 1 - varying_axis
        lower, upper = sorted((vertices[0][2], vertices[2][2]))
        key = (varying_axis, vertices[0][fixed_axis], lower, upper)
        intervals_by_plane_and_heights[key].append(sorted((vertices[0][varying_axis], vertices[1][varying_axis])))
    merged_rectangles = []
    for (varying_axis, fixed_coordinate, lower, upper), intervals in sorted(intervals_by_plane_and_heights.items()):
        merged_intervals = []
        for start, end in sorted(intervals):
            if merged_intervals and start <= merged_intervals[-1][1]:
                merged_intervals[-1][1] = max(end, merged_intervals[-1][1])
            else:
                merged_intervals.append([start, end])
        for start, end in merged_intervals:
            vertices = [[fixed_coordinate, fixed_coordinate, height] for height in (lower, lower, upper, upper)]
            for vertex, coordinate in zip(vertices, (start, end, end, start)):
                vertex[varying_axis] = coordinate
            merged_rectangles.append(vertices)
    return merged_rectangles


def build_exact_achievable_step_geometry(pareto_points, projected_axis_bounds=((0, 1), (0, 1))):
    """按预算断点精确分格，合并同高平台，仅连接两侧都可达的高度跳变。

    不向未知高度或箱底封口。合并降低实际网格量，不承诺最坏情况 O(n) 复杂度。
    """
    points = [tuple(float(value) for value in point) for point in pareto_points]
    if any(len(point) != 3 or not all(math.isfinite(value) for value in point) for point in points):
        raise ValueError("阶梯锚点必须是三个有限数")
    if len(projected_axis_bounds) != 2 or any(
        len(bounds) != 2 or not all(math.isfinite(value) for value in bounds) or bounds[0] >= bounds[1]
        for bounds in projected_axis_bounds
    ):
        raise ValueError("共同投影视域必须是两个递增的有限区间")
    (cost_minimum, cost_maximum), (speed_minimum, speed_maximum) = projected_axis_bounds
    cost_budget_edges = sorted({cost_minimum, cost_maximum, *(cost for cost, _, _ in points if cost_minimum < cost < cost_maximum)})
    speed_floor_edges = sorted({speed_minimum, speed_maximum, *(speed for _, speed, _ in points if speed_minimum < speed < speed_maximum)})
    heights = [
        [highest_achievable_intelligence(points, (left + right) / 2, (bottom + top) / 2)
         for left, right in zip(cost_budget_edges, cost_budget_edges[1:])]
        for bottom, top in zip(speed_floor_edges, speed_floor_edges[1:])
    ]

    # 横向同高游程再向相邻速度区间延伸；不会跨越不可达单元或凹角。
    active_rectangles = {}
    completed_rectangles = []
    for speed_index, row in enumerate(heights):
        cost_index = 0
        current_rectangles = {}
        while cost_index < len(row):
            height = row[cost_index]
            if height is None:
                cost_index += 1
                continue
            run_start = cost_index
            while cost_index < len(row) and row[cost_index] == height:
                cost_index += 1
            run_key = (run_start, cost_index, height)
            previous_span = active_rectangles.pop(run_key, (speed_index, speed_index))
            current_rectangles[run_key] = (previous_span[0], speed_index + 1)
        completed_rectangles.extend(active_rectangles.items())
        active_rectangles = current_rectangles
    completed_rectangles.extend(active_rectangles.items())

    horizontal_rectangles = [
        [cost_budget_edges[start], cost_budget_edges[end], speed_floor_edges[bottom], speed_floor_edges[top], height]
        for (start, end, height), (bottom, top) in completed_rectangles
    ]
    mesh = {"vertices": [], "triangles": []}

    def append_rectangle(vertices):
        offset = len(mesh["vertices"])
        mesh["vertices"].extend(vertices)
        mesh["triangles"].extend([[offset, offset + 1, offset + 2], [offset, offset + 2, offset + 3]])

    for left, right, bottom, top, height in horizontal_rectangles:
        append_rectangle([[left, bottom, height], [right, bottom, height], [right, top, height], [left, top, height]])

    vertical_rectangles, boundary_segments = [], []
    speed_cell_count, cost_cell_count = len(heights), len(heights[0])
    for speed_index, row in enumerate(heights):
        for cost_index, height in enumerate(row):
            if height is None:
                continue
            left, right = cost_budget_edges[cost_index:cost_index + 2]
            bottom, top = speed_floor_edges[speed_index:speed_index + 2]
            neighbors = [
                (cost_index - 1, speed_index, [left, bottom, height], [left, top, height]),
                (cost_index + 1, speed_index, [right, bottom, height], [right, top, height]),
                (cost_index, speed_index - 1, [left, bottom, height], [right, bottom, height]),
                (cost_index, speed_index + 1, [left, top, height], [right, top, height]),
            ]
            for neighbor_cost_index, neighbor_speed_index, first_vertex, second_vertex in neighbors:
                neighbor_height = (
                    heights[neighbor_speed_index][neighbor_cost_index]
                    if 0 <= neighbor_cost_index < cost_cell_count and 0 <= neighbor_speed_index < speed_cell_count
                    else None
                )
                if neighbor_height != height:
                    boundary_segments.append([first_vertex, second_vertex])
                if neighbor_height is None or neighbor_height == height:
                    continue
                if neighbor_cost_index < cost_index or neighbor_speed_index < speed_index:
                    continue
                opposite_first_vertex = [*first_vertex[:2], neighbor_height]
                opposite_second_vertex = [*second_vertex[:2], neighbor_height]
                wall = [first_vertex, second_vertex, opposite_second_vertex, opposite_first_vertex]
                vertical_rectangles.append(wall)

    vertical_rectangles = _merge_coplanar_vertical_wall_rectangles(vertical_rectangles)
    for wall in vertical_rectangles:
        append_rectangle(wall)
        boundary_segments.extend([[wall[0], wall[3]], [wall[1], wall[2]]])
    return {
        "projected_axis_bounds": [list(bounds) for bounds in projected_axis_bounds],
        "cost_budget_edges": cost_budget_edges,
        "speed_floor_edges": speed_floor_edges,
        "attainable_intelligence_by_speed_floor_and_cost_budget_cell": heights,
        "horizontal_platform_rectangles": horizontal_rectangles,
        "vertical_wall_rectangles": vertical_rectangles,
        "triangle_mesh": mesh,
        "boundary_line_segments": _merge_collinear_boundary_segments(boundary_segments),
    }


def _clip_projected_polygon_to_half_plane(polygon, affine_coefficients):
    """保留 a*x+b*y+c≥0 一侧，线性插值得到精确交点。"""
    if not polygon:
        return []
    clipped_polygon = []
    previous_vertex = np.asarray(polygon[-1], dtype=float)
    previous_value = float(np.dot(affine_coefficients[:2], previous_vertex) + affine_coefficients[2])
    for raw_vertex in polygon:
        current_vertex = np.asarray(raw_vertex, dtype=float)
        current_value = float(np.dot(affine_coefficients[:2], current_vertex) + affine_coefficients[2])
        if (current_value >= 0) != (previous_value >= 0):
            intersection = previous_vertex + previous_value / (previous_value - current_value) * (current_vertex - previous_vertex)
            clipped_polygon.append(intersection.tolist())
        if current_value >= 0:
            clipped_polygon.append(current_vertex.tolist())
        previous_vertex, previous_value = current_vertex, current_value
    return clipped_polygon


def _clip_projected_polygon_to_rectangle(polygon, left, right, bottom, top):
    for coefficients in [(1, 0, -left), (-1, 0, right), (0, 1, -bottom), (0, -1, top)]:
        polygon = _clip_projected_polygon_to_half_plane(polygon, coefficients)
    return polygon


def _polygon_area_and_affine_integral(polygon, affine_coefficients=(0, 0, 0)):
    """凸多边形扇形剖分；仿射函数的三角形积分为面积乘三个顶点值的均值。"""
    area, integral = 0.0, 0.0
    for vertex_index in range(1, len(polygon) - 1):
        vertices = np.asarray([polygon[0], polygon[vertex_index], polygon[vertex_index + 1]], dtype=float)
        differences = vertices[1:] - vertices[0]
        triangle_area = abs(float(np.linalg.det(differences))) / 2
        values = vertices @ np.asarray(affine_coefficients[:2]) + affine_coefficients[2]
        area += triangle_area
        integral += triangle_area * float(np.mean(values))
    return area, integral


def _reference_triangle_planes(reference_mesh):
    triangle_planes = []
    for indices in reference_mesh["triangles"]:
        vertices = np.asarray([reference_mesh["vertices"][index] for index in indices], dtype=float)
        projected_area = abs(float(np.linalg.det(vertices[1:, :2] - vertices[0, :2]))) / 2
        if projected_area <= PROJECTED_GEOMETRY_AREA_TOLERANCE:
            triangle_planes.append(None)
            continue
        coefficients = np.linalg.solve(np.column_stack([vertices[:, :2], np.ones(3)]), vertices[:, 2])
        triangle_planes.append((vertices, coefficients, projected_area))
    return triangle_planes


def compare_reference_interpolation_with_exact_steps(step_geometry, reference_mesh, displayed_models):
    """按共同视域计算面积与绝对误差，绝不对凸包外插值或把空域误报为零误差。"""
    costs, speeds = step_geometry["cost_budget_edges"], step_geometry["speed_floor_edges"]
    heights = step_geometry["attainable_intelligence_by_speed_floor_and_cost_budget_cell"]
    finite_cells = [
        (left, right, bottom, top, heights[speed_index][cost_index])
        for speed_index, (bottom, top) in enumerate(zip(speeds, speeds[1:]))
        for cost_index, (left, right) in enumerate(zip(costs, costs[1:]))
        if heights[speed_index][cost_index] is not None
    ]
    exact_area = sum((right - left) * (top - bottom) for left, right, bottom, top, _ in finite_cells)
    reference_area = common_area = absolute_error_integral = maximum_absolute_error = reverse_area = 0.0
    triangle_planes = _reference_triangle_planes(reference_mesh)
    reverse_classification = []
    for triangle_plane in triangle_planes:
        if triangle_plane is None:
            reverse_classification.append(None)
            continue
        vertices, coefficients, _ = triangle_plane
        reverse = bool(coefficients[0] < -REVERSE_TRIANGLE_GRADIENT_TOLERANCE or coefficients[1] > REVERSE_TRIANGLE_GRADIENT_TOLERANCE)
        reverse_classification.append(reverse)
        projected_polygon = vertices[:, :2].tolist()
        view_polygon = _clip_projected_polygon_to_rectangle(projected_polygon, costs[0], costs[-1], speeds[0], speeds[-1])
        clipped_triangle_area, _ = _polygon_area_and_affine_integral(view_polygon)
        reference_area += clipped_triangle_area
        if reverse:
            reverse_area += clipped_triangle_area
        minimum_cost, minimum_speed = vertices[:, :2].min(axis=0)
        maximum_cost, maximum_speed = vertices[:, :2].max(axis=0)
        for left, right, bottom, top, intelligence in finite_cells:
            if right <= minimum_cost or left >= maximum_cost or top <= minimum_speed or bottom >= maximum_speed:
                continue
            common_polygon = _clip_projected_polygon_to_rectangle(projected_polygon, left, right, bottom, top)
            polygon_area, _ = _polygon_area_and_affine_integral(common_polygon)
            if polygon_area <= PROJECTED_GEOMETRY_AREA_TOLERANCE:
                continue
            common_area += polygon_area
            error_coefficients = np.array([-coefficients[0], -coefficients[1], intelligence - coefficients[2]])
            for sign in (1, -1):
                same_sign_polygon = _clip_projected_polygon_to_half_plane(common_polygon, sign * error_coefficients)
                _, signed_integral = _polygon_area_and_affine_integral(same_sign_polygon, error_coefficients)
                absolute_error_integral += abs(signed_integral)
            maximum_absolute_error = max(maximum_absolute_error, *(
                abs(float(np.dot(error_coefficients[:2], vertex) + error_coefficients[2]))
                for vertex in common_polygon
            ))

    above_reference = []
    outside_count = inside_count = 0
    for model in displayed_models:
        if not model["analysis_eligible"] or model["is_pareto"]:
            continue
        position = np.asarray(model["projected_position"], dtype=float)
        interpolated_intelligence = None
        for triangle_plane in triangle_planes:
            if triangle_plane is None:
                continue
            vertices, coefficients, _ = triangle_plane
            barycentric = np.linalg.solve((vertices[1:, :2] - vertices[0, :2]).T, position[:2] - vertices[0, :2])
            if np.all(barycentric >= -1e-10) and barycentric.sum() <= 1 + 1e-10:
                interpolated_intelligence = float(np.dot(coefficients[:2], position[:2]) + coefficients[2])
                break
        if interpolated_intelligence is None:
            outside_count += 1
        else:
            inside_count += 1
            excess = float(position[2] - interpolated_intelligence)
            if excess > MODEL_INTELLIGENCE_EXCESS_TOLERANCE:
                above_reference.append({"name": model["name"], "intelligence_excess": excess})

    valid_triangle_count = sum(value is not None for value in reverse_classification)
    reverse_triangle_count = sum(value is True for value in reverse_classification)
    union_area = exact_area + reference_area - common_area
    symmetric_difference_area = max(0.0, exact_area + reference_area - 2 * common_area)
    metrics = {
        "reference_triangle_count": len(reference_mesh["triangles"]),
        "nondegenerate_projected_triangle_count": valid_triangle_count,
        "reverse_triangle_count": reverse_triangle_count,
        "reverse_triangle_count_fraction": reverse_triangle_count / valid_triangle_count if valid_triangle_count else None,
        "reverse_projected_area_fraction": reverse_area / reference_area if reference_area > PROJECTED_GEOMETRY_AREA_TOLERANCE else None,
        "exact_reachable_projected_area": exact_area,
        "reference_support_projected_area": reference_area,
        "common_support_projected_area": common_area,
        "support_symmetric_difference_area_fraction": min(1.0, symmetric_difference_area / union_area) if union_area > PROJECTED_GEOMETRY_AREA_TOLERANCE else None,
        "common_support_mean_absolute_intelligence_error": absolute_error_integral / common_area if common_area > PROJECTED_GEOMETRY_AREA_TOLERANCE else None,
        "common_support_maximum_absolute_intelligence_error": maximum_absolute_error if common_area > PROJECTED_GEOMETRY_AREA_TOLERANCE else None,
        "eligible_non_pareto_models_inside_reference_support_count": inside_count,
        "eligible_non_pareto_models_outside_reference_support_count": outside_count,
        "eligible_non_pareto_models_above_reference_count": len(above_reference),
        "maximum_eligible_non_pareto_model_intelligence_excess_above_reference": max((model["intelligence_excess"] for model in above_reference), default=None),
        "eligible_non_pareto_models_above_reference": sorted(above_reference, key=lambda model: -model["intelligence_excess"]),
        "exact_horizontal_platform_rectangle_count": len(step_geometry["horizontal_platform_rectangles"]),
        "exact_vertical_wall_rectangle_count": len(step_geometry["vertical_wall_rectangles"]),
    }
    return metrics, reverse_classification
