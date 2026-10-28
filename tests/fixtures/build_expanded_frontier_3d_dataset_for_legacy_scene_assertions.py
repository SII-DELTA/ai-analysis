"""既有场景断言复用 v3 真实生成链路，在断言入口展开引用。"""
from src.frontier_3d_visualization_dataset_builder import (
    build_frontier_3d_visualization_dataset,
    expand_frontier_3d_visualization_dataset_for_scene_consumers,
    validate_frontier_3d_visualization_dataset,
)


def build_expanded_frontier_3d_dataset_for_legacy_scene_assertions(*args, **kwargs):
    dataset = build_frontier_3d_visualization_dataset(*args, **kwargs)
    validate_frontier_3d_visualization_dataset(dataset)
    return expand_frontier_3d_visualization_dataset_for_scene_consumers(dataset)
