"""T3 golden：合成 fixture → 数据契约的稳定投影，与入库的 golden JSON 逐项比较。

- 固定剪枝参考日期（fixture 的 API 抓取日 2026-09-23），不依赖运行当天；
- 投影剔除易变或与语义无关的字段：`generated_at`、Plotly 静态导出 trace/layout
  （随 Plotly 版本变化）、厂商 logo 的 data URL（体积大且只来自注册表）；
- 浮点统一保留 10 位有效数字，避免不同平台的末位舍入差异；
- 对数速度轴覆盖全部四个口径；线性速度轴只收默认口径（线性轴改变的是 Delaunay 投影、
  突出度归一化与轴范围，其余字段与对数轴相同，全收会让 golden 膨胀到约 0.5MB）。

契约语义有意变更时重写 golden：
    RUN_REGENERATE_FRONTIER_3D_VISUALIZATION_DATASET_GOLDEN_PROJECTION=1 uv run --frozen pytest \
        tests/python_unit/test_frontier_3d_visualization_dataset_golden.py
重写后该测试标记为 skip 并提示；提交前人工审阅 golden 的 diff。
"""
from __future__ import annotations

import json
import math
import os
from pathlib import Path

import pytest

from src import frontier_3d_visualization_dataset_builder as dataset_builder
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import (
    FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE,
    build_frontier_3d_synthetic_fixture_models_dataframe,
)

FRONTIER_3D_VISUALIZATION_DATASET_GOLDEN_PROJECTION_PATH = (
    Path(__file__).resolve().parents[1]
    / "fixtures"
    / "frontier_3d_visualization_dataset_golden_projection_for_synthetic_fixture_models_dataframe.json"
)
REGENERATE_GOLDEN_PROJECTION_ENVIRONMENT_VARIABLE_NAME = (
    "RUN_REGENERATE_FRONTIER_3D_VISUALIZATION_DATASET_GOLDEN_PROJECTION"
)
GOLDEN_PROJECTION_FLOAT_SIGNIFICANT_DIGIT_COUNT = 10
SPEED_SCALES_COVERED_BY_GOLDEN_PROJECTION = ("log", "linear")
# 每种速度轴刻度收进 golden 的口径；None 表示全部口径
METRIC_VARIANT_KEYS_IN_GOLDEN_PROJECTION_BY_SPEED_SCALE = {
    "log": None,
    "linear": ("effective__effective",),
}
# 不进 golden 的契约顶层字段：易变（生成时刻）或由 Plotly 版本决定的静态导出
DATASET_TOP_LEVEL_KEYS_EXCLUDED_FROM_GOLDEN_PROJECTION = frozenset({"generated_at"})
METRIC_VARIANT_KEYS_EXCLUDED_FROM_GOLDEN_PROJECTION = frozenset(
    {"plotly_static_export_trace_data", "plotly_static_export_layout"}
)
ORGANIZATION_IDENTITY_KEYS_EXCLUDED_FROM_GOLDEN_PROJECTION = frozenset({"logo_visualization_data_url", "creator_uuid", "creator_uuid_aliases", "creator_name_aliases", "registration_status"})
RECENT_RELEASE_GRACE_PERIOD_ADDITIVE_KEYS_EXCLUDED_FROM_LEGACY_GOLDEN = frozenset({
    "recent_release_frontier_distance_grace_period_months",
    "displayed_only_because_of_recent_release_grace_period",
    "recent_release_grace_period_only_model_count",
    "kept_model_count_without_recent_release_grace_period",
})


def _without_recent_release_grace_period_additions(value):
    """旧 golden 验证零宽限旧行为；新增字段由专门的宽限契约测试验证。"""
    if isinstance(value, dict):
        return {
            key: _without_recent_release_grace_period_additions(child)
            for key, child in value.items()
            if key not in RECENT_RELEASE_GRACE_PERIOD_ADDITIVE_KEYS_EXCLUDED_FROM_LEGACY_GOLDEN
        }
    if isinstance(value, list):
        return [_without_recent_release_grace_period_additions(child) for child in value]
    return value


def _round_floats_to_significant_digits(json_value):
    if isinstance(json_value, bool) or json_value is None:
        return json_value
    if isinstance(json_value, float):
        if not math.isfinite(json_value):
            raise ValueError(f"golden 投影里出现非有限浮点: {json_value!r}")
        return float(f"{json_value:.{GOLDEN_PROJECTION_FLOAT_SIGNIFICANT_DIGIT_COUNT}g}")
    if isinstance(json_value, dict):
        return {key: _round_floats_to_significant_digits(value) for key, value in json_value.items()}
    if isinstance(json_value, (list, tuple)):
        return [_round_floats_to_significant_digits(value) for value in json_value]
    return json_value


def project_frontier_3d_visualization_dataset_for_golden_comparison(
    dataset: dict,
    metric_variant_keys_to_keep: tuple[str, ...] | None = None,
) -> dict:
    projected_dataset = {
        key: value
        for key, value in dataset.items()
        if key not in DATASET_TOP_LEVEL_KEYS_EXCLUDED_FROM_GOLDEN_PROJECTION
        and key not in {"metric_variants", "organization_identity_metadata_by_creator_name"}
    }
    projected_dataset["organization_identity_metadata_by_creator_name"] = {
        creator_name: {
            key: value
            for key, value in organization_identity.items()
            if key not in ORGANIZATION_IDENTITY_KEYS_EXCLUDED_FROM_GOLDEN_PROJECTION
        }
        for creator_name, organization_identity in dataset[
            "organization_identity_metadata_by_creator_name"
        ].items()
    }
    projected_dataset["metric_variants"] = {
        variant_key: {
            key: value
            for key, value in variant.items()
            if key not in METRIC_VARIANT_KEYS_EXCLUDED_FROM_GOLDEN_PROJECTION
        }
        for variant_key, variant in dataset["metric_variants"].items()
        if metric_variant_keys_to_keep is None or variant_key in metric_variant_keys_to_keep
    }
    projected_dataset = _without_recent_release_grace_period_additions(projected_dataset)
    for definitions in (projected_dataset["cost_metric_definitions"], projected_dataset["speed_metric_definitions"]):
        for definition in definitions.values():
            definition.pop("description", None)
    for variant in projected_dataset["metric_variants"].values():
        variant["three_dimensional_scene"]["current_view"].pop("pruning_reference_date", None)
        for marker in variant["three_dimensional_scene"]["displayed_model_markers"]:
            for field in ("creator_uuid", "artificial_analysis_release_slug", "artificial_analysis_reasoning_effort_slug", "artificial_analysis_is_reasoning_model"):
                marker.pop(field, None)
            marker["panel"].pop("output_mtokens", None)
        for excluded in variant["excluded_models_with_drop_reason"]:
            for field in ("model_uuid", "base_model_name", "reasoning_level_label", "reasoning_level_sort_order", "analysis_eligibility"):
                excluded.pop(field, None)
    # 经一次严格 JSON 往返：确认可序列化（无 NaN、无 numpy 标量），并统一 tuple → list
    return _round_floats_to_significant_digits(
        json.loads(json.dumps(projected_dataset, ensure_ascii=False, allow_nan=False))
    )


def _golden_projection_of_synthetic_fixture_dataset_for_every_speed_scale() -> dict:
    return {
        speed_scale: project_frontier_3d_visualization_dataset_for_golden_comparison(
            dataset_builder._build_expanded_frontier_3d_visualization_dataset(
                build_frontier_3d_synthetic_fixture_models_dataframe(),
                since_months=18,
                max_layers=3,
                hard_age_cutoff_months=36,
                speed_scale=speed_scale,
                pruning_reference_date=FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE,
                recent_release_frontier_distance_grace_period_months=0,
            ),
            METRIC_VARIANT_KEYS_IN_GOLDEN_PROJECTION_BY_SPEED_SCALE[speed_scale],
        )
        for speed_scale in SPEED_SCALES_COVERED_BY_GOLDEN_PROJECTION
    }


def test_synthetic_fixture_dataset_projection_matches_committed_golden() -> None:
    actual_golden_projection = _golden_projection_of_synthetic_fixture_dataset_for_every_speed_scale()
    if os.environ.get(REGENERATE_GOLDEN_PROJECTION_ENVIRONMENT_VARIABLE_NAME, "").strip() == "1":
        FRONTIER_3D_VISUALIZATION_DATASET_GOLDEN_PROJECTION_PATH.write_text(
            json.dumps(actual_golden_projection, ensure_ascii=False, indent=1, sort_keys=True) + "\n",
            encoding="utf-8",
        )
        pytest.skip(f"已重写 golden：{FRONTIER_3D_VISUALIZATION_DATASET_GOLDEN_PROJECTION_PATH}")
    assert FRONTIER_3D_VISUALIZATION_DATASET_GOLDEN_PROJECTION_PATH.is_file(), (
        "缺少 golden 文件；设置 "
        f"{REGENERATE_GOLDEN_PROJECTION_ENVIRONMENT_VARIABLE_NAME}=1 生成后人工审阅"
    )
    expected_golden_projection = json.loads(
        FRONTIER_3D_VISUALIZATION_DATASET_GOLDEN_PROJECTION_PATH.read_text(encoding="utf-8")
    )
    for speed_scale in SPEED_SCALES_COVERED_BY_GOLDEN_PROJECTION:
        for variant_key in expected_golden_projection[speed_scale]["metric_variants"]:
            assert (
                actual_golden_projection[speed_scale]["metric_variants"][variant_key]
                == expected_golden_projection[speed_scale]["metric_variants"][variant_key]
            ), f"{speed_scale} / {variant_key} 与 golden 不一致"
    assert actual_golden_projection == expected_golden_projection


def test_golden_projection_excludes_volatile_generated_at_and_is_stable_across_rebuilds() -> None:
    first_projection = _golden_projection_of_synthetic_fixture_dataset_for_every_speed_scale()
    second_projection = _golden_projection_of_synthetic_fixture_dataset_for_every_speed_scale()
    assert first_projection == second_projection
    for speed_scale in SPEED_SCALES_COVERED_BY_GOLDEN_PROJECTION:
        assert "generated_at" not in first_projection[speed_scale]
        for variant in first_projection[speed_scale]["metric_variants"].values():
            assert "plotly_static_export_trace_data" not in variant
