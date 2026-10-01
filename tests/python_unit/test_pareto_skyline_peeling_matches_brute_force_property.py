"""性质测试：Pareto 剥层与三维超体积对拍独立的暴力 oracle。

- `frontier._layers_for_points`（向量化 skyline peeling）与 O(n²) 逐对支配判定的
  逐层剥离结果逐点一致；覆盖重复点、并列值、n=0/1。
- `frontier._hypervolume3d`（按 z 切片 × 阶梯面积）与坐标压缩格点 oracle 一致。
  坐标压缩后每个格子要么整体落在某个 [0,x]×[0,y]×[0,z] 盒内、要么与所有盒内部不交，
  所以 oracle 是精确值，只留浮点舍入容差。

方向约定与 src/frontier.py 相同：智能 ↑、成本 ↓、速度 ↑。
"""
from __future__ import annotations

import math

import numpy as np
from hypothesis import HealthCheck, example, given, settings
from hypothesis import strategies as st

from src import frontier

# 不写 hypothesis 示例数据库（database=None）；hypothesis 仍会生成自带 .gitignore 的 .hypothesis/constants 缓存，
# 不影响 git status。首个用例含 numpy 预热，关掉 deadline
PROPERTY_TEST_HYPOTHESIS_SETTINGS = settings(
    max_examples=400,
    deadline=None,
    database=None,
    suppress_health_check=[HealthCheck.too_slow],
)

HYPERVOLUME_ORACLE_RELATIVE_TOLERANCE = 1e-9
HYPERVOLUME_ORACLE_ABSOLUTE_TOLERANCE = 1e-12

# 小整数网格上取值 → 高概率出现并列值与完全重复的点
TIE_HEAVY_COORDINATE_VALUES = [0.0, 1.0, 2.0, 3.0]


def _single_axis_coordinate_strategy() -> st.SearchStrategy[float]:
    return st.one_of(
        st.sampled_from(TIE_HEAVY_COORDINATE_VALUES),
        st.floats(min_value=-1e6, max_value=1e6, allow_nan=False, allow_infinity=False),
    )


@st.composite
def _intelligence_cost_speed_point_lists_with_duplicates(
    draw: st.DrawFn,
    max_distinct_point_count: int = 25,
    max_duplicated_point_count: int = 8,
) -> list[tuple[float, float, float]]:
    """先抽不重复约束的点，再从中抽若干点原样复制并打乱顺序。"""
    distinct_points = draw(
        st.lists(
            st.tuples(
                _single_axis_coordinate_strategy(),
                _single_axis_coordinate_strategy(),
                _single_axis_coordinate_strategy(),
            ),
            max_size=max_distinct_point_count,
        )
    )
    if not distinct_points:
        return []
    duplicated_point_indices = draw(
        st.lists(
            st.integers(min_value=0, max_value=len(distinct_points) - 1),
            max_size=max_duplicated_point_count,
        )
    )
    all_points = distinct_points + [distinct_points[index] for index in duplicated_point_indices]
    return draw(st.permutations(all_points))


def _point_dominates(
    dominating_candidate: tuple[float, float, float],
    dominated_candidate: tuple[float, float, float],
) -> bool:
    """A 支配 B ⟺ 智能不低、成本不高、速度不低，且至少一项严格更优。"""
    candidate_intelligence, candidate_cost, candidate_speed = dominating_candidate
    other_intelligence, other_cost, other_speed = dominated_candidate
    is_no_worse_on_every_axis = (
        candidate_intelligence >= other_intelligence
        and candidate_cost <= other_cost
        and candidate_speed >= other_speed
    )
    is_strictly_better_on_some_axis = (
        candidate_intelligence > other_intelligence
        or candidate_cost < other_cost
        or candidate_speed > other_speed
    )
    return is_no_worse_on_every_axis and is_strictly_better_on_some_axis


def _brute_force_skyline_peeling_layer_numbers(
    points: list[tuple[float, float, float]],
) -> list[int]:
    """O(n²)·层数 的逐对支配判定：每轮取剩余点中的非支配集为一层，剥离后重复。"""
    layer_number_by_point_index = [0] * len(points)
    remaining_point_indices = set(range(len(points)))
    current_layer_number = 1
    while remaining_point_indices:
        non_dominated_point_indices = {
            point_index
            for point_index in remaining_point_indices
            if not any(
                _point_dominates(points[other_index], points[point_index])
                for other_index in remaining_point_indices
                if other_index != point_index
            )
        }
        for point_index in non_dominated_point_indices:
            layer_number_by_point_index[point_index] = current_layer_number
        remaining_point_indices -= non_dominated_point_indices
        current_layer_number += 1
    return layer_number_by_point_index


def _vectorized_skyline_peeling_layer_numbers(
    points: list[tuple[float, float, float]],
) -> list[int]:
    point_matrix = np.array(points, dtype=float).reshape(-1, 3)
    layer_numbers = frontier._layers_for_points(
        point_matrix[:, 0], point_matrix[:, 1], point_matrix[:, 2]
    )
    return [int(layer_number) for layer_number in layer_numbers]


@PROPERTY_TEST_HYPOTHESIS_SETTINGS
@given(points=_intelligence_cost_speed_point_lists_with_duplicates())
@example(points=[])
@example(points=[(1.0, 1.0, 1.0)])
@example(points=[(1.0, 1.0, 1.0), (1.0, 1.0, 1.0)])
@example(points=[(2.0, 1.0, 1.0), (1.0, 1.0, 1.0), (1.0, 1.0, 1.0)])
def test_vectorized_skyline_peeling_matches_brute_force_dominance_peeling(
    points: list[tuple[float, float, float]],
) -> None:
    assert _vectorized_skyline_peeling_layer_numbers(points) == (
        _brute_force_skyline_peeling_layer_numbers(points)
    )


@PROPERTY_TEST_HYPOTHESIS_SETTINGS
@given(points=_intelligence_cost_speed_point_lists_with_duplicates())
def test_every_point_beyond_first_layer_is_dominated_by_some_point_of_previous_layer(
    points: list[tuple[float, float, float]],
) -> None:
    """与暴力 oracle 无关的独立刻画：第 k 层（k>1）的每个点都被第 k-1 层某点支配。"""
    layer_numbers = _vectorized_skyline_peeling_layer_numbers(points)
    for point_index, layer_number in enumerate(layer_numbers):
        if layer_number == 1:
            continue
        previous_layer_points = [
            points[other_index]
            for other_index, other_layer_number in enumerate(layer_numbers)
            if other_layer_number == layer_number - 1
        ]
        assert any(
            _point_dominates(previous_layer_point, points[point_index])
            for previous_layer_point in previous_layer_points
        )


def test_skyline_peeling_of_zero_points_returns_empty_layer_array() -> None:
    empty_coordinates = np.array([], dtype=float)
    layer_numbers = frontier._layers_for_points(
        empty_coordinates, empty_coordinates, empty_coordinates
    )
    assert layer_numbers.shape == (0,)


def test_skyline_peeling_of_identical_points_puts_all_in_first_layer() -> None:
    identical_points = [(3.0, 2.0, 5.0)] * 4
    assert _vectorized_skyline_peeling_layer_numbers(identical_points) == [1, 1, 1, 1]


# ----------------------------------------------------------------------------- 超体积
def _coordinate_compressed_grid_hypervolume_oracle(points: np.ndarray) -> float:
    """参考点=原点、各轴越大越好：∪ [0,x]×[0,y]×[0,z] 的体积（坐标压缩格点，精确）。"""
    if len(points) == 0:
        return 0.0
    grid_edges_per_axis = [
        np.unique(np.concatenate([[0.0], points[:, axis_index]])) for axis_index in range(3)
    ]
    upper_x, upper_y, upper_z = np.meshgrid(
        grid_edges_per_axis[0][1:],
        grid_edges_per_axis[1][1:],
        grid_edges_per_axis[2][1:],
        indexing="ij",
    )
    width_x, width_y, width_z = np.meshgrid(
        np.diff(grid_edges_per_axis[0]),
        np.diff(grid_edges_per_axis[1]),
        np.diff(grid_edges_per_axis[2]),
        indexing="ij",
    )
    # 格子的上角被某点在三轴上都不小于 ⇒ 整个格子落在该点的盒内
    grid_cell_is_covered = np.zeros(upper_x.shape, dtype=bool)
    for point_x, point_y, point_z in points:
        grid_cell_is_covered |= (upper_x <= point_x) & (upper_y <= point_y) & (upper_z <= point_z)
    return float((width_x * width_y * width_z)[grid_cell_is_covered].sum())


def _unit_cube_coordinate_strategy() -> st.SearchStrategy[float]:
    return st.one_of(
        st.sampled_from([0.25, 0.5, 0.75, 1.0]),
        st.floats(min_value=0.01, max_value=1.0, allow_nan=False, allow_infinity=False),
    )


@PROPERTY_TEST_HYPOTHESIS_SETTINGS
@given(
    points=st.lists(
        st.tuples(
            _unit_cube_coordinate_strategy(),
            _unit_cube_coordinate_strategy(),
            _unit_cube_coordinate_strategy(),
        ),
        max_size=8,
    )
)
@example(points=[])
@example(points=[(0.5, 0.5, 0.5)])
@example(points=[(0.5, 0.5, 0.5), (0.5, 0.5, 0.5)])
@example(points=[(1.0, 0.25, 0.25), (0.25, 1.0, 0.25), (0.25, 0.25, 1.0)])
def test_hypervolume3d_matches_coordinate_compressed_grid_oracle(
    points: list[tuple[float, float, float]],
) -> None:
    point_matrix = np.array(points, dtype=float).reshape(-1, 3)
    assert math.isclose(
        frontier._hypervolume3d(point_matrix),
        _coordinate_compressed_grid_hypervolume_oracle(point_matrix),
        rel_tol=HYPERVOLUME_ORACLE_RELATIVE_TOLERANCE,
        abs_tol=HYPERVOLUME_ORACLE_ABSOLUTE_TOLERANCE,
    )


def test_hypervolume_oracle_matches_hand_computed_three_box_union() -> None:
    """oracle 自检：三个互不支配的盒按容斥原理手算并体积。

    盒 A=[0,1]×[0,.25]×[0,.25]、B、C 为其轮换；单盒 = 0.0625，两两交 = 0.25³，
    三者交也 = 0.25³，容斥：3×0.0625 − 3×0.015625 + 0.015625 = 0.15625。
    """
    three_rotated_boxes = np.array(
        [(1.0, 0.25, 0.25), (0.25, 1.0, 0.25), (0.25, 0.25, 1.0)]
    )
    assert math.isclose(
        _coordinate_compressed_grid_hypervolume_oracle(three_rotated_boxes), 0.15625
    )
