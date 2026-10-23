"""独立几何比较：用枚举 oracle 和可手算积分检验语义。"""
from __future__ import annotations

import math

import numpy as np
import pytest

from src.frontier_3d_geometry_comparison import (
    build_exact_achievable_step_geometry,
    compare_reference_interpolation_with_exact_steps,
    highest_achievable_intelligence,
)


def _triangle_mesh(vertices, triangles=((0, 1, 2),)):
    return {"vertices": vertices, "triangles": list(triangles)}


def test_steps_only_extend_to_looser_budgets_and_join_finite_neighbors():
    points = [(1.0, 1.0, 2.0), (2.0, 2.0, 4.0)]
    geometry = build_exact_achievable_step_geometry(points, ((0, 3), (0, 3)))
    assert geometry["attainable_intelligence_by_speed_floor_and_cost_budget_cell"] == [
        [None, 2.0, 4.0], [None, None, 4.0], [None, None, None]
    ]
    assert len(geometry["horizontal_platform_rectangles"]) == 2
    walls = geometry["vertical_wall_rectangles"]
    assert len(walls) == 1
    assert {tuple(vertex) for vertex in walls[0]} == {
        (2, 0, 2), (2, 1, 2), (2, 1, 4), (2, 0, 4)
    }
    assert geometry["boundary_line_segments"]
    for vertex in geometry["triangle_mesh"]["vertices"]:
        assert vertex[0] >= 1 and vertex[1] <= 2 and vertex[2] >= 2


def test_exact_queries_include_thresholds_and_respect_nextafter_boundaries():
    points = [(1.0, 2.0, 7.0)]
    assert highest_achievable_intelligence(points, 1, 2) == 7
    assert highest_achievable_intelligence(points, np.nextafter(1.0, 0), 2) is None
    assert highest_achievable_intelligence(points, 1, np.nextafter(2.0, 3)) is None
    assert highest_achievable_intelligence(points, 2, 1) == 7


def test_coplanar_walls_merge_across_irrelevant_budget_breakpoints():
    geometry = build_exact_achievable_step_geometry(
        [(1, 1, 2), (2, 2, 4), (1.5, 0.5, 1)], ((0, 3), (0, 3))
    )
    assert len(geometry["vertical_wall_rectangles"]) == 1


@pytest.mark.parametrize("point_count", [0, 1, 2, 3, 12])
def test_cells_match_independent_enumeration_and_are_monotone(point_count):
    generator = np.random.default_rng(914)
    points = generator.uniform(0.1, 0.9, (point_count, 3)).tolist()
    geometry = build_exact_achievable_step_geometry(points)
    costs, speeds = geometry["cost_budget_edges"], geometry["speed_floor_edges"]
    heights = geometry["attainable_intelligence_by_speed_floor_and_cost_budget_cell"]
    for speed_index, row in enumerate(heights):
        for cost_index, height in enumerate(row):
            cost_budget = (costs[cost_index] + costs[cost_index + 1]) / 2
            speed_floor = (speeds[speed_index] + speeds[speed_index + 1]) / 2
            feasible = [z for cost, speed, z in points if cost <= cost_budget and speed >= speed_floor]
            assert height == (max(feasible) if feasible else None)
            if height is not None:
                assert all(value is not None and value >= height for value in row[cost_index:])
                assert all(heights[index][cost_index] >= height for index in range(speed_index + 1))


def test_equal_heights_merge_without_internal_walls_and_preserve_concave_boundary():
    geometry = build_exact_achievable_step_geometry([(0.2, 0.5, 4), (0.5, 0.8, 4), (0.2, 0.5, 4)])
    assert len(geometry["horizontal_platform_rectangles"]) == 2
    assert geometry["vertical_wall_rectangles"] == []
    assert highest_achievable_intelligence([(0.2, 0.5, 4), (0.5, 0.8, 4)], 0.3, 0.7) is None


def test_single_plateau_merges_to_one_rectangle_and_empty_input_has_no_geometry():
    geometry = build_exact_achievable_step_geometry([(0.2, 0.8, 4), (0.4, 0.4, 4)])
    assert len(geometry["horizontal_platform_rectangles"]) == 1
    empty = build_exact_achievable_step_geometry([])
    assert empty["triangle_mesh"] == {"vertices": [], "triangles": []}
    assert empty["boundary_line_segments"] == []


def test_clipped_support_areas_and_constant_height_error_have_known_values():
    geometry = build_exact_achievable_step_geometry([(0.5, 0.5, 2)])
    reference = _triangle_mesh([(0, 0, 5), (1, 0, 5), (0, 1, 5)])
    metrics, classification = compare_reference_interpolation_with_exact_steps(geometry, reference, [])
    assert metrics["exact_reachable_projected_area"] == pytest.approx(0.25)
    assert metrics["reference_support_projected_area"] == pytest.approx(0.5)
    assert metrics["common_support_projected_area"] == pytest.approx(0.125)
    assert metrics["support_symmetric_difference_area_fraction"] == pytest.approx(0.8)
    assert metrics["common_support_mean_absolute_intelligence_error"] == pytest.approx(3)
    assert metrics["common_support_maximum_absolute_intelligence_error"] == pytest.approx(3)
    assert classification == [False]


def test_absolute_affine_error_integrates_both_sides_of_zero_crossing():
    geometry = build_exact_achievable_step_geometry([(0, 1, 1)])
    reference = _triangle_mesh([(0, 0, 1), (1, 0, 2), (0, 1, 0)])
    metrics, _ = compare_reference_interpolation_with_exact_steps(geometry, reference, [])
    assert metrics["common_support_mean_absolute_intelligence_error"] == pytest.approx(1 / 3)
    assert metrics["common_support_maximum_absolute_intelligence_error"] == pytest.approx(1)
    assert metrics["reverse_triangle_count"] == 0


def test_reverse_faces_are_area_weighted_and_vertical_faces_are_excluded():
    geometry = build_exact_achievable_step_geometry([(0, 1, 1)])
    reference = _triangle_mesh(
        [(0, 0, 1), (1, 0, 0), (0, 1, 2), (1, 1, 1), (0, 0, 4)],
        [(0, 1, 2), (1, 3, 2), (0, 4, 1)],
    )
    metrics, classification = compare_reference_interpolation_with_exact_steps(geometry, reference, [])
    assert classification == [True, True, None]
    assert metrics["nondegenerate_projected_triangle_count"] == 2
    assert metrics["reverse_triangle_count_fraction"] == 1
    assert metrics["reverse_projected_area_fraction"] == 1


def test_face_count_and_projected_area_weighting_give_different_results():
    geometry = build_exact_achievable_step_geometry([(0, 1, 1)])
    reference = _triangle_mesh(
        [(0, 0, 1), (1, 0, 0), (0, 1, 2), (1, 1, 1), (0.5, 1, 0.5), (1, 0.5, 1.5)],
        [(0, 1, 2), (3, 4, 5)],
    )
    metrics, classification = compare_reference_interpolation_with_exact_steps(geometry, reference, [])
    assert classification == [True, False]
    assert metrics["reverse_triangle_count_fraction"] == pytest.approx(0.5)
    assert metrics["reverse_projected_area_fraction"] == pytest.approx(0.8)


def test_speed_threshold_jump_creates_a_wall_parallel_to_the_cost_axis():
    geometry = build_exact_achievable_step_geometry([(1, 1, 4), (2, 2, 2)], ((0, 3), (0, 3)))
    assert len(geometry["vertical_wall_rectangles"]) == 1
    assert {tuple(vertex) for vertex in geometry["vertical_wall_rectangles"][0]} == {
        (2, 1, 2), (3, 1, 2), (3, 1, 4), (2, 1, 4)
    }


def test_historical_and_pareto_models_are_excluded_from_model_excess_statistics():
    geometry = build_exact_achievable_step_geometry([(0, 1, 3)])
    reference = _triangle_mesh([(0, 0, 5), (1, 0, 5), (0, 1, 5)])
    models = [
        {"name": "高出参照", "projected_position": [0.2, 0.2, 6], "analysis_eligible": True, "is_pareto": False},
        {"name": "凸包外", "projected_position": [0.8, 0.8, 4], "analysis_eligible": True, "is_pareto": False},
        {"name": "历史口径", "projected_position": [0.2, 0.2, 99], "analysis_eligible": False, "is_pareto": False},
        {"name": "前沿", "projected_position": [0.2, 0.2, 99], "analysis_eligible": True, "is_pareto": True},
    ]
    metrics, _ = compare_reference_interpolation_with_exact_steps(geometry, reference, models)
    assert metrics["eligible_non_pareto_models_above_reference_count"] == 1
    assert metrics["eligible_non_pareto_models_outside_reference_support_count"] == 1
    assert metrics["maximum_eligible_non_pareto_model_intelligence_excess_above_reference"] == 1


def test_empty_support_is_not_reported_as_zero_error():
    geometry = build_exact_achievable_step_geometry([])
    metrics, _ = compare_reference_interpolation_with_exact_steps(geometry, _triangle_mesh([], []), [])
    assert metrics["reverse_triangle_count_fraction"] is None
    assert metrics["common_support_mean_absolute_intelligence_error"] is None
    assert metrics["support_symmetric_difference_area_fraction"] is None


@pytest.mark.parametrize("points,bounds", [([(math.nan, 1, 1)], ((0, 1), (0, 1))), ([], ((1, 0), (0, 1)))])
def test_invalid_geometry_fails_instead_of_emitting_nonfinite_numbers(points, bounds):
    with pytest.raises(ValueError):
        build_exact_achievable_step_geometry(points, bounds)
