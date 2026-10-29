"""既有场景断言复用 v3 真实生成链路，在断言入口展开引用。"""
from src.frontier_3d_visualization_dataset_builder import (
    _build_expanded_frontier_3d_visualization_dataset,
    expand_frontier_3d_visualization_dataset_for_scene_consumers,
    validate_frontier_3d_visualization_dataset,
)


def build_expanded_frontier_3d_dataset_for_legacy_scene_assertions(*args, **kwargs):
    # 历史四口径断言继续使用冻结的旧生成入口；v4 的全部记录和两种新口径由 W5 测试覆盖。
    from src.frontier_3d_versioned_model_reference_contract import adapt_frontier_3d_visualization_dataset_to_v3
    dataset = adapt_frontier_3d_visualization_dataset_to_v3(_build_expanded_frontier_3d_visualization_dataset(*args, **kwargs))
    validate_frontier_3d_visualization_dataset(dataset)
    return expand_frontier_3d_visualization_dataset_for_scene_consumers(dataset)
