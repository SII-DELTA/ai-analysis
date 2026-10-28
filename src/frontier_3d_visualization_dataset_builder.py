"""构建 v3 纯几何科学契约，读取入口兼容 v2；所有数值为有限数或 null。"""
from __future__ import annotations

import base64
import math
import sys
from datetime import date, datetime, timezone
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
import json
from uuid import UUID

from . import frontier, visualize
from .fetch_data import MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE
from .frontier_3d_organization_identity_metadata_registry import (
    organization_identity_metadata_by_creator_name,
)
from .frontier_3d_versioned_model_reference_contract import (
    adapt_frontier_3d_visualization_dataset_to_v3,
    expand_frontier_3d_visualization_dataset_for_scene_consumers as expand_frontier_3d_visualization_dataset_for_scene_consumers,
    build_frontier_3d_browser_projection as build_frontier_3d_browser_projection,
    validate_frontier_3d_browser_projection as validate_frontier_3d_browser_projection,
)

LEGACY_FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION = "frontier_3d_visualization_dataset/v2"
FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION = "frontier_3d_visualization_dataset/v3"
DEFAULT_SPEED_METRIC_NAME = "effective"
DEFAULT_COST_METRIC_NAME = "effective"
DEFAULT_FRONTIER_3D_VISUALIZATION_DATASET_FILENAME = (
    "frontier_3d_visualization_dataset.json"
)

# 缺省的剪枝与口径参数（CLI 未显式给出时使用；契约读入路径据此判断参数是否被忽略）
DEFAULT_SINCE_MONTHS_FOR_RECENT_MODEL_SOFT_WINDOW = 18
DEFAULT_MAXIMUM_PARETO_LAYER_COUNT_FOR_RECENT_MODEL_DISPLAY = 3
DEFAULT_HARD_AGE_CUTOFF_MONTHS = 36
DEFAULT_SPEED_AXIS_SCALE = "log"
# creator 缺失（None/NaN/空串/全空白）时统一显示的占位厂商名
PLACEHOLDER_CREATOR_NAME_FOR_MISSING_OR_BLANK_CREATOR = "?"

# label 是工具栏按钮等短标签；axis_title_text 是坐标轴名（不含单位与刻度类型，
# 完整轴标题 = `<axis_title_text> tok/s（对数）`，见 visualize.speed_axis_title_text_with_unit_and_scale）
SPEED_METRIC_DEFINITIONS = {
    "effective": {
        "column_name": "eff_speed",
        "label": "有效速度",
        "axis_title_text": "有效速度（按冗长度归一的生成速度，不含 TTFT 与工具耗时）",
        "description": "按当前指数版本参考输出 token 量归一的生成速度；不含 TTFT 或工具耗时。",
    },
    "raw": {
        "column_name": "output_speed",
        "label": "原始速度",
        "axis_title_text": "原始速度",
        "description": "原始生成吞吐量，单位为 tok/s。",
    },
}

COST_METRIC_DEFINITIONS = {
    "effective": {
        "column_name": "cost_to_run",
        "label": "有效运行成本",
        "unit": "USD",
        "description": "同一智能指数测试的总运行成本，单位为 USD。",
    },
    "blended": {
        "column_name": "blended_price_cache_input_output_7_to_2_to_1",
        "label": "7:2:1 混合单价",
        "unit": "USD/M tokens",
        "description": "缓存命中输入、普通输入与输出按 7:2:1 合成的每百万 token 单价。",
    },
}


def _trace_by_index(figure_data: list[dict], trace_index: int | None) -> dict:
    if trace_index is None or trace_index < 0 or trace_index >= len(figure_data):
        return {}
    return figure_data[trace_index]


def _is_plotly_typed_array_specification(raw_value: object) -> bool:
    return isinstance(raw_value, dict) and "dtype" in raw_value and "bdata" in raw_value


def _decode_plotly_typed_array_to_flat_list(typed_array_specification: dict) -> list:
    """解码 Plotly 6 的 `{"dtype","bdata"[, "shape"]}`（base64 的 numpy 原始字节），展平成 Python 列表。"""
    decoded_array = np.frombuffer(
        base64.b64decode(typed_array_specification["bdata"]),
        dtype=np.dtype(typed_array_specification["dtype"]),
    )
    return decoded_array.ravel().tolist()


def _plain_python_list_from_plotly_trace_field(raw_value: object) -> list:
    """把 trace 字段统一成 Python 列表：bdata 兜底解码、numpy 数组 `.tolist()`、numpy 标量转原生。

    P0-4：旧实现直接 `list(trace["x"])`，遇到 bdata 字典只剩 `["dtype","bdata"]` 两个键名。
    """
    if raw_value is None:
        return []
    if _is_plotly_typed_array_specification(raw_value):
        return _decode_plotly_typed_array_to_flat_list(raw_value)
    if isinstance(raw_value, np.ndarray):
        return raw_value.ravel().tolist()
    return [value.item() if isinstance(value, np.generic) else value for value in raw_value]


def _line_segments_from_plotly_trace(trace: dict) -> dict:
    return {
        "x_coordinates": _plain_python_list_from_plotly_trace_field(trace.get("x")),
        "y_coordinates": _plain_python_list_from_plotly_trace_field(trace.get("y")),
        "z_coordinates": _plain_python_list_from_plotly_trace_field(trace.get("z")),
    }


def _triangle_vertex_indices_from_plotly_trace_field(raw_value: object) -> list:
    # 整数值的浮点（bdata 以 f8 编码索引时）转成 int；非整数保持原样，交给契约校验报错
    return [
        int(value)
        if isinstance(value, float) and math.isfinite(value) and value.is_integer()
        else value
        for value in _plain_python_list_from_plotly_trace_field(raw_value)
    ]


def _triangle_mesh_from_plotly_trace(trace: dict) -> dict:
    return {
        "x_coordinates": _plain_python_list_from_plotly_trace_field(trace.get("x")),
        "y_coordinates": _plain_python_list_from_plotly_trace_field(trace.get("y")),
        "z_coordinates": _plain_python_list_from_plotly_trace_field(trace.get("z")),
        "triangle_vertex_index_a": _triangle_vertex_indices_from_plotly_trace_field(trace.get("i")),
        "triangle_vertex_index_b": _triangle_vertex_indices_from_plotly_trace_field(trace.get("j")),
        "triangle_vertex_index_c": _triangle_vertex_indices_from_plotly_trace_field(trace.get("k")),
    }


def _axis_configuration(plotly_axis_configuration: dict) -> dict:
    axis_title = plotly_axis_configuration.get("title", {})
    if isinstance(axis_title, str):
        axis_title_text = axis_title
    else:
        axis_title_text = axis_title.get("text", "")
    return {
        "title_text": axis_title_text,
        "scale_type": plotly_axis_configuration.get("type", "linear"),
        "fixed_range": _plain_python_list_from_plotly_trace_field(
            plotly_axis_configuration.get("range", [])
        ),
    }


def _three_dimensional_scene_from_plotly_figure_and_interaction_payload(
    figure_data: list[dict],
    figure_layout: dict,
    interaction_payload: dict,
    organization_identity_metadata: dict[str, dict],
) -> dict:
    scene_layout = figure_layout.get("scene", {})
    displayed_model_markers: list[dict] = []
    for model in interaction_payload["models"]:
        creator_name = model["creator"]
        enriched_model = dict(model)
        enriched_model["organization_identity_key"] = (
            organization_identity_metadata[creator_name]["organization_identity_key"]
        )
        enriched_model["country_region_category"] = organization_identity_metadata[
            creator_name
        ]["country_region_category"]
        displayed_model_markers.append(enriched_model)

    frontier_wireframe_trace = _trace_by_index(
        figure_data,
        interaction_payload.get("frontier_wireframe_trace_index"),
    )
    frontier_surface_trace = _trace_by_index(
        figure_data,
        interaction_payload.get("frontier_mesh_trace_index"),
    )
    achievable_surface_trace = _trace_by_index(
        figure_data,
        interaction_payload.get("achievable_surface_trace_index"),
    )
    camera = scene_layout.get("camera", {})
    return {
        "displayed_model_markers": displayed_model_markers,
        "pareto_frontier_wireframe_line_segments": _line_segments_from_plotly_trace(
            frontier_wireframe_trace
        ),
        "pareto_frontier_surface_triangle_mesh": _triangle_mesh_from_plotly_trace(
            frontier_surface_trace
        ),
        "achievable_frontier_surface_triangle_mesh": _triangle_mesh_from_plotly_trace(
            achievable_surface_trace
        ),
        "three_dimensional_axis_configuration": {
            "x_axis": _axis_configuration(scene_layout.get("xaxis", {})),
            "y_axis": _axis_configuration(scene_layout.get("yaxis", {})),
            "z_axis": _axis_configuration(scene_layout.get("zaxis", {})),
        },
        "initial_camera_configuration": {
            "eye": dict(camera.get("eye", {"x": -1.7, "y": 1.7, "z": 1.1})),
            "center": dict(camera.get("center", {"x": 0.0, "y": 0.0, "z": 0.0})),
            "up": dict(camera.get("up", {"x": 0.0, "y": 0.0, "z": 1.0})),
        },
        "current_view": interaction_payload.get("current_view", {}),
    }


def _interaction_relationships(interaction_payload: dict) -> dict:
    return {
        "base_groups": interaction_payload.get("base_groups", {}),
        "reasoning_variant_group_model_indices_by_base_model_name": (
            interaction_payload.get(
                "reasoning_variant_group_model_indices_by_base_model_name", {}
            )
        ),
        "lineages": interaction_payload.get("lineages", {}),
        "cost_axis_field": interaction_payload.get("cost_axis_field"),
        "cost_axis_label": interaction_payload.get("cost_axis_label"),
        "cost_axis_unit": interaction_payload.get("cost_axis_unit"),
        "speed_axis_field": interaction_payload.get("speed_axis_field"),
        "speed_axis_label": interaction_payload.get("speed_axis_label"),
    }


# 值溯源列：某个口径列的值被按缺失处理时，同步清空的来源列
VALUE_SOURCE_COLUMN_NAME_BY_METRIC_COLUMN_NAME = {
    "blended_price_cache_input_output_7_to_2_to_1": "blended_price_cache_hit_price_source",
}


def _models_dataframe_with_invalid_axis_coordinates_treated_as_missing(df: pd.DataFrame) -> pd.DataFrame:
    """五个坐标来源列的非有限值，以及成本/速度的非正值，均在剪枝与谱系构建前按缺失处理。

    仅修改输入副本中的异常字段，不重算其他口径；有限智能分保持原值。
    同时清空对应的值来源列，避免「值缺失但来源非空」，按指标汇总已提供异常值的告警。
    """
    df = df.copy()
    metric_column_display_label_by_column_name = {
        metric_definition["column_name"]: metric_definition["label"]
        for metric_definition in (*COST_METRIC_DEFINITIONS.values(), *SPEED_METRIC_DEFINITIONS.values())
    }
    metric_column_display_label_by_column_name["intelligence"] = "智能分"
    for metric_column_name, metric_column_display_label in metric_column_display_label_by_column_name.items():
        if metric_column_name not in df.columns:
            continue
        numeric_metric_values = pd.to_numeric(df[metric_column_name], errors="coerce")
        invalid_value_row_mask = (~np.isfinite(numeric_metric_values)).fillna(True)
        invalid_value_description = "为非有限数"
        if metric_column_name != "intelligence":
            invalid_value_row_mask |= numeric_metric_values.le(0)
            invalid_value_description = "≤ 0 或为非有限数"
        if not invalid_value_row_mask.any():
            continue
        invalid_provided_value_count = int((invalid_value_row_mask & df[metric_column_name].notna()).sum())
        if invalid_provided_value_count:
            print(
                f"[warn] {invalid_provided_value_count} 个模型的 {metric_column_display_label} "
                f"{invalid_value_description}，按缺失处理"
            )
        df.loc[invalid_value_row_mask, metric_column_name] = np.nan
        value_source_column_name = VALUE_SOURCE_COLUMN_NAME_BY_METRIC_COLUMN_NAME.get(metric_column_name)
        if value_source_column_name in df.columns:
            df[value_source_column_name] = df[value_source_column_name].astype(object)
            df.loc[invalid_value_row_mask, value_source_column_name] = None
    return df


def _creator_name_or_placeholder(raw_creator_name: object) -> str:
    if raw_creator_name is None or (not isinstance(raw_creator_name, str) and pd.isna(raw_creator_name)):
        return PLACEHOLDER_CREATOR_NAME_FOR_MISSING_OR_BLANK_CREATOR
    creator_name = str(raw_creator_name)
    return creator_name if creator_name.strip() else PLACEHOLDER_CREATOR_NAME_FOR_MISSING_OR_BLANK_CREATOR


def _iso_calendar_date_text(raw_date_value: object) -> str:
    """把 'YYYY-MM-DD' / ISO 时间戳 / date / Timestamp 规范成 'YYYY-MM-DD'。"""
    if isinstance(raw_date_value, (datetime, date, pd.Timestamp)):
        return pd.Timestamp(raw_date_value).strftime("%Y-%m-%d")
    return date.fromisoformat(str(raw_date_value).strip()[:10]).isoformat()


def _api_response_fetched_at_calendar_date_text(artificial_analysis_data_provenance: dict) -> str | None:
    fetched_at_utc = artificial_analysis_data_provenance.get(
        "artificial_analysis_api_response_fetched_at_utc"
    )
    return _iso_calendar_date_text(fetched_at_utc) if fetched_at_utc else None


def artificial_analysis_data_provenance_from_models_dataframe(df: pd.DataFrame) -> dict[str, Any]:
    """取 fetch_data.build_dataframe 挂在 df.attrs 的数据溯源；旧表/合成表没有时返回空 dict。"""
    return dict(df.attrs.get(MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE) or {})


def _is_true_boolean_value(raw_value: object) -> bool:
    return isinstance(raw_value, (bool, np.bool_)) and bool(raw_value)


def _excluded_models_with_drop_reason(variant_df: pd.DataFrame) -> list[dict[str, Any]]:
    """有智能分但未上图的模型；此计算视图在 v3 输出时转为公共表引用。"""
    scored_but_not_displayed = variant_df[
        variant_df["intelligence"].notna() & ~variant_df["kept"].astype(bool)
    ]
    scored_but_not_displayed = scored_but_not_displayed.assign(
        _name_sort_key=scored_but_not_displayed["name"].astype(str)
    ).sort_values(["intelligence", "_name_sort_key"], ascending=[False, True], kind="mergesort")
    excluded_models = []
    relationship_configuration = visualize.build_model_relationship_configuration_resolver_for_models_dataframe(variant_df)
    for _, row in scored_but_not_displayed.iterrows():
        release_date = row.get("release_date")
        base_name, _, reasoning_level, reasoning_order, _ = relationship_configuration(row)
        excluded_models.append(
            {
                "name": str(row["name"]),
                "model_uuid": visualize._text_or_none(row.get("id")),
                "base_model_name": base_name,
                "reasoning_level_label": reasoning_level,
                "reasoning_level_sort_order": reasoning_order,
                "analysis_eligibility": visualize.model_analysis_eligibility(row),
                "creator": _creator_name_or_placeholder(row.get("creator")),
                "intelligence": float(row["intelligence"]),
                "release_date": (
                    pd.Timestamp(release_date).strftime("%Y-%m-%d") if pd.notna(release_date) else None
                ),
                "missing_dimension_names": list(
                    row.get(frontier.MISSING_DIMENSION_NAMES_COLUMN_NAME) or []
                ),
                "drop_reason": str(row["drop_reason"]),
                "is_absent_from_accepted_embedded_model_catalog_partition": _is_true_boolean_value(
                    row.get("is_absent_from_accepted_embedded_model_catalog_partition")
                ),
            }
        )
    return excluded_models


def _build_expanded_frontier_3d_visualization_dataset(
    df: pd.DataFrame,
    *,
    since_months: int,
    max_layers: int,
    hard_age_cutoff_months: int,
    speed_scale: str,
    initial_cost_metric_name: str = DEFAULT_COST_METRIC_NAME,
    initial_speed_metric_name: str = DEFAULT_SPEED_METRIC_NAME,
    data_date: str | None = None,
    pruning_reference_date: object | None = None,
    artificial_analysis_data_provenance: dict | None = None,
    recent_release_frontier_distance_grace_period_months: int = (
        frontier.DEFAULT_RECENT_RELEASE_FRONTIER_DISTANCE_GRACE_PERIOD_MONTHS
    ),
) -> dict[str, Any]:
    """把已合并的 AA DataFrame 转成前端可直接渲染的数据契约。

    - `artificial_analysis_data_provenance` 缺省取 `df.attrs`（fetch_data.build_dataframe 写入）；
    - 剪枝参考日期：显式参数 → API 抓取日期（UTC）→ `data_date`；三者都没有时报错，
      不再用运行当天的日期（W1-8）；
    - `data_date`：显式参数 → API 抓取日期 → 剪枝参考日期。
    """
    artificial_analysis_data_provenance = dict(
        artificial_analysis_data_provenance
        if artificial_analysis_data_provenance is not None
        else artificial_analysis_data_provenance_from_models_dataframe(df)
    )
    api_response_fetched_at_calendar_date_text = _api_response_fetched_at_calendar_date_text(
        artificial_analysis_data_provenance
    )
    if pruning_reference_date is not None:
        pruning_reference_date_text = _iso_calendar_date_text(pruning_reference_date)
    elif api_response_fetched_at_calendar_date_text is not None:
        pruning_reference_date_text = api_response_fetched_at_calendar_date_text
    elif data_date is not None:
        pruning_reference_date_text = _iso_calendar_date_text(data_date)
    else:
        raise ValueError(
            "缺少剪枝参考日期：请传 pruning_reference_date，或在数据溯源里提供 API 抓取时间"
            "（artificial_analysis_api_response_fetched_at_utc），或传 data_date"
        )
    data_date = data_date or api_response_fetched_at_calendar_date_text or pruning_reference_date_text
    artificial_analysis_data_provenance["pruning_reference_date"] = pruning_reference_date_text
    artificial_analysis_data_provenance["recent_release_frontier_distance_grace_period_months"] = (
        recent_release_frontier_distance_grace_period_months
    )
    for specification_5_1_provenance_key in (
        "artificial_analysis_api_response_fetched_at_utc",
        "artificial_analysis_api_response_fetched_at_utc_source",
        "artificial_analysis_api_intelligence_index_version",
        "artificial_analysis_api_tier",
        "current_intelligence_index_version",
        "embedded_model_catalog_intelligence_index_version",
        "embedded_model_catalog_captured_at_utc",
        # R1-03：没有被接受的目录分区时前端页头显示的一行告警；无问题时 null
        "embedded_model_catalog_partition_rejection_warning_text",
        "artificial_analysis_website_page_fetch_paused",
        "reference_output_million_tokens_for_effective_speed_normalization_by_intelligence_index_version_family",
        "artificial_analysis_attribution_url",
    ):
        artificial_analysis_data_provenance.setdefault(specification_5_1_provenance_key, None)

    df = _models_dataframe_with_invalid_axis_coordinates_treated_as_missing(df)
    df["creator"] = df["creator"].map(_creator_name_or_placeholder)
    metric_variants: dict[str, dict[str, Any]] = {}
    creator_uuid_by_creator_name: dict[str, str] = {}
    if "creator_uuid" in df.columns:
        for creator_name, rows in df.groupby("creator"):
            creator_uuid_values = (visualize._text_or_none(value) for value in rows["creator_uuid"])
            creator_uuids = {value for value in creator_uuid_values if value is not None}
            if len(creator_uuids) > 1:
                raise ValueError(f"同一厂商显示名对应多个 UUID，不能合并：{creator_name}")
            if creator_uuids:
                creator_uuid_by_creator_name[creator_name] = creator_uuids.pop()
    organization_identity_metadata = organization_identity_metadata_by_creator_name(df["creator"], creator_uuid_by_creator_name=creator_uuid_by_creator_name)

    for cost_metric_name, cost_metric_definition in COST_METRIC_DEFINITIONS.items():
        for speed_metric_name, speed_metric_definition in SPEED_METRIC_DEFINITIONS.items():
            variant_key = f"{cost_metric_name}__{speed_metric_name}"
            cost_metric_column_name = cost_metric_definition["column_name"]
            speed_metric_column_name = speed_metric_definition["column_name"]
            variant_df = frontier.apply_pruning(
                df,
                since_months=since_months,
                max_layers=max_layers,
                hard_age_cutoff_months=hard_age_cutoff_months,
                cost_metric_column_name=cost_metric_column_name,
                speed_metric_column_name=speed_metric_column_name,
                pruning_reference_date=pruning_reference_date_text,
                recent_release_frontier_distance_grace_period_months=(
                    recent_release_frontier_distance_grace_period_months
                ),
            )
            variant_df = frontier.add_standout_metrics(
                variant_df,
                cost_metric_column_name=cost_metric_column_name,
                speed_metric_column_name=speed_metric_column_name,
                speed_log=(speed_scale == "log"),
            )
            three_dimensional_scene, interaction_payload = visualize.build_frontier_3d_scene_and_interaction_payload(
                variant_df,
                speed_scale=speed_scale,
                data_date=data_date,
                cost_metric_column_name=cost_metric_column_name,
                cost_metric_label=cost_metric_definition["label"],
                cost_metric_unit=cost_metric_definition["unit"],
                speed_metric_column_name=speed_metric_column_name,
                speed_metric_label=speed_metric_definition["label"],
                speed_metric_axis_title_text=speed_metric_definition["axis_title_text"],
                current_intelligence_index_version=artificial_analysis_data_provenance.get(
                    "current_intelligence_index_version"
                ),
                reference_output_million_tokens_by_intelligence_index_version_family=(
                    artificial_analysis_data_provenance.get(
                        "reference_output_million_tokens_for_effective_speed_normalization_by_intelligence_index_version_family"
                    )
                ),
            )
            recent_release_grace_period_only_model_count = int(
                variant_df[frontier.DISPLAYED_ONLY_BECAUSE_OF_RECENT_RELEASE_GRACE_PERIOD_COLUMN_NAME].sum()
            )
            recent_release_grace_period_counts = {
                "recent_release_grace_period_only_model_count": recent_release_grace_period_only_model_count,
                "kept_model_count_without_recent_release_grace_period": (
                    len(interaction_payload["models"]) - recent_release_grace_period_only_model_count
                ),
            }
            interaction_payload["current_view"].update(
                recent_release_frontier_distance_grace_period_months=(
                    recent_release_frontier_distance_grace_period_months
                ),
                pruning_reference_date=pruning_reference_date_text,
                **recent_release_grace_period_counts,
            )
            for marker in three_dimensional_scene["displayed_model_markers"]:
                identity = organization_identity_metadata[marker["creator"]]
                marker["organization_identity_key"] = identity["organization_identity_key"]
                marker["country_region_category"] = identity["country_region_category"]
            metric_variants[variant_key] = {
                "three_dimensional_scene": three_dimensional_scene,
                "interaction_relationships": _interaction_relationships(
                    interaction_payload
                ),
                "kept_model_count": len(interaction_payload["models"]),
                **recent_release_grace_period_counts,
                # 分析层 Pareto（非 eligible 点 layer 为 null，不计入）
                "pareto_model_count": sum(
                    1
                    for model in interaction_payload["models"]
                    if model["panel"]["layer"] == 1
                ),
                "analysis_eligible_model_count": interaction_payload["current_view"][
                    "analysis_eligible_model_count"
                ],
                "historical_version_value_model_count": interaction_payload["current_view"][
                    "historical_version_value_model_count"
                ],
                "excluded_models_with_drop_reason": _excluded_models_with_drop_reason(variant_df),
            }
            if not interaction_payload["models"]:
                # RVF-002 / R1-03：单个口径零模型（如有效速度全缺）只输出合法空场景并告警，不阻断其他口径
                print(
                    f"[warn] 口径 {variant_key}（{cost_metric_definition['label']} × "
                    f"{speed_metric_definition['label']}）剪枝后没有可显示的模型"
                    "（该口径的维度值全部缺失或全部被剪枝），输出空场景；其他口径不受影响"
                )

    if all(metric_variant["kept_model_count"] == 0 for metric_variant in metric_variants.values()):
        raise ValueError("所有口径剪枝后都没有保留模型，请放宽参数或检查成本/速度数据")

    displayed_creators = {marker["creator"] for variant in metric_variants.values() for marker in variant["three_dimensional_scene"]["displayed_model_markers"]}
    unregistered_displayed_creators = sorted(name for name in displayed_creators if organization_identity_metadata[name]["registration_status"].startswith("unregistered"))
    if unregistered_displayed_creators:
        print("[warn] 四口径显示并集中存在未注册厂商：" + "、".join(unregistered_displayed_creators), file=sys.stderr)

    initial_variant_key = f"{initial_cost_metric_name}__{initial_speed_metric_name}"
    if initial_variant_key not in metric_variants:
        raise ValueError(f"未知初始指标组合: {initial_variant_key}")

    return {
        "schema_version": LEGACY_FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION,
        "interactive_renderer": "threejs",
        "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "data_date": data_date,
        "artificial_analysis_data_provenance": artificial_analysis_data_provenance,
        "graph_div_id": visualize.GRAPH_DIV_ID,
        "initial_variant_key": initial_variant_key,
        "speed_scale": speed_scale,
        "cost_metric_definitions": COST_METRIC_DEFINITIONS,
        "speed_metric_definitions": SPEED_METRIC_DEFINITIONS,
        "organization_identity_metadata_by_creator_name": (
            organization_identity_metadata
        ),
        "metric_variants": metric_variants,
    }


REQUIRED_THREE_DIMENSIONAL_SCENE_KEYS = (
    "displayed_model_markers",
    "pareto_frontier_wireframe_line_segments",
    "pareto_frontier_surface_triangle_mesh",
    "achievable_frontier_surface_triangle_mesh",
    "three_dimensional_axis_configuration",
)
TRIANGLE_MESH_KEYS_IN_THREE_DIMENSIONAL_SCENE = (
    "pareto_frontier_surface_triangle_mesh",
    "achievable_frontier_surface_triangle_mesh",
)
COORDINATE_LIST_KEYS = ("x_coordinates", "y_coordinates", "z_coordinates")
TRIANGLE_VERTEX_INDEX_LIST_KEYS = (
    "triangle_vertex_index_a",
    "triangle_vertex_index_b",
    "triangle_vertex_index_c",
)


# Plotly 类型化数组规格里可能出现的键名；旧契约的网格坐标就是这些键名组成的数组
PLOTLY_TYPED_ARRAY_SPECIFICATION_KEY_NAMES = frozenset({"dtype", "bdata", "shape"})


def _is_finite_json_number(value: object) -> bool:
    return (
        isinstance(value, (int, float, np.integer, np.floating))
        and not isinstance(value, (bool, np.bool_))
        and math.isfinite(float(value))
    )


def _is_json_integer(value: object) -> bool:
    return isinstance(value, (int, np.integer)) and not isinstance(value, (bool, np.bool_))


def _validate_coordinate_lists(
    coordinate_container: object,
    field_path: str,
    *,
    allow_none_as_line_break_separator: bool,
) -> int:
    """三组坐标都是等长数组、元素为有限数（线段允许 null 作断线分隔）；返回坐标个数。"""
    if not isinstance(coordinate_container, dict):
        raise ValueError(f"{field_path} 应为对象，实际是 {type(coordinate_container).__name__}")
    coordinate_counts = set()
    for coordinate_list_key in COORDINATE_LIST_KEYS:
        coordinate_values = coordinate_container.get(coordinate_list_key)
        if not isinstance(coordinate_values, list):
            raise ValueError(
                f"{field_path}.{coordinate_list_key} 应为数组（疑似 Plotly bdata 未解码），"
                f"实际是 {type(coordinate_values).__name__}"
            )
        if coordinate_values and set(coordinate_values) <= PLOTLY_TYPED_ARRAY_SPECIFICATION_KEY_NAMES:
            # R2-F11：旧管线把 {"dtype","bdata"} 字典 list() 成了键名数组（P0-4 的真实形态）
            raise ValueError(
                f"{field_path}.{coordinate_list_key} 是 {coordinate_values!r}：这是旧版管线生成的旧契约，"
                "网格被错误地展开成 Plotly bdata 的键名。请用当前管线重新生成契约"
                "（python -m src.cli --out <html>，只读本机缓存），不要直接重渲染旧契约"
            )
        for coordinate_position, coordinate_value in enumerate(coordinate_values):
            if coordinate_value is None and allow_none_as_line_break_separator:
                continue
            if not _is_finite_json_number(coordinate_value):
                raise ValueError(
                    f"{field_path}.{coordinate_list_key}[{coordinate_position}] 不是有限数: "
                    f"{coordinate_value!r}"
                )
        coordinate_counts.add(len(coordinate_values))
    if len(coordinate_counts) != 1:
        raise ValueError(f"{field_path} 的 x/y/z 坐标个数不一致: {sorted(coordinate_counts)}")
    return coordinate_counts.pop()


def _validate_triangle_mesh(triangle_mesh: object, field_path: str) -> None:
    """顶点坐标有限；三组索引等长、为 [0, 顶点数) 内的整数。三角形数为 0 是合法空网格
    （Pareto 点 <4 或投影共线时 Delaunay 无解）。"""
    vertex_count = _validate_coordinate_lists(
        triangle_mesh, field_path, allow_none_as_line_break_separator=False
    )
    triangle_index_list_lengths = set()
    for triangle_vertex_index_list_key in TRIANGLE_VERTEX_INDEX_LIST_KEYS:
        triangle_vertex_indices = triangle_mesh.get(triangle_vertex_index_list_key)
        if not isinstance(triangle_vertex_indices, list):
            raise ValueError(
                f"{field_path}.{triangle_vertex_index_list_key} 应为数组（疑似 Plotly bdata 未解码），"
                f"实际是 {type(triangle_vertex_indices).__name__}"
            )
        for index_position, triangle_vertex_index in enumerate(triangle_vertex_indices):
            if not _is_json_integer(triangle_vertex_index) or not (
                0 <= int(triangle_vertex_index) < vertex_count
            ):
                raise ValueError(
                    f"{field_path}.{triangle_vertex_index_list_key}[{index_position}] "
                    f"不是 [0, {vertex_count}) 内的整数: {triangle_vertex_index!r}"
                )
        triangle_index_list_lengths.add(len(triangle_vertex_indices))
    if len(triangle_index_list_lengths) != 1:
        raise ValueError(
            f"{field_path} 的三组三角形顶点索引长度不一致: {sorted(triangle_index_list_lengths)}"
        )


def _validate_displayed_model_markers(displayed_model_markers: object, field_path: str) -> None:
    if not isinstance(displayed_model_markers, list):
        raise ValueError(f"{field_path} 应为数组")
    seen_model_uuids = set()
    for marker_position, displayed_model_marker in enumerate(displayed_model_markers):
        marker_field_path = f"{field_path}[{marker_position}]"
        if not isinstance(displayed_model_marker, dict):
            raise ValueError(f"{marker_field_path} 应为对象")
        model_uuid = displayed_model_marker.get("model_uuid")
        if model_uuid is not None:
            try:
                normalized_uuid = str(UUID(model_uuid)) if isinstance(model_uuid, str) else None
            except ValueError:
                normalized_uuid = None
            if normalized_uuid is None or normalized_uuid in seen_model_uuids:
                raise ValueError(f"{marker_field_path}.model_uuid 不是有效且唯一的模型 UUID")
            seen_model_uuids.add(normalized_uuid)
        for coordinate_key in ("x", "y", "z"):
            if not _is_finite_json_number(displayed_model_marker.get(coordinate_key)):
                raise ValueError(
                    f"{marker_field_path}.{coordinate_key} 不是有限数: "
                    f"{displayed_model_marker.get(coordinate_key)!r}"
                    f"（模型 {displayed_model_marker.get('name')!r}）"
                )
        marker_panel = displayed_model_marker.get("panel")
        if not isinstance(marker_panel, dict):
            raise ValueError(
                f"{marker_field_path} 缺少 panel（模型 {displayed_model_marker.get('name')!r}）"
            )
        for panel_key, panel_value in marker_panel.items():
            if isinstance(panel_value, float) and not math.isfinite(panel_value):
                raise ValueError(
                    f"{marker_field_path}.panel.{panel_key} 是非有限数 {panel_value!r}，应输出 null"
                )


def _validate_three_dimensional_scene(three_dimensional_scene: object, variant_key: str) -> None:
    field_path = f"metric_variants.{variant_key}.three_dimensional_scene"
    if not isinstance(three_dimensional_scene, dict):
        raise ValueError(f"{field_path} 应为对象")
    missing_scene_keys = [
        scene_key for scene_key in REQUIRED_THREE_DIMENSIONAL_SCENE_KEYS if scene_key not in three_dimensional_scene
    ]
    if missing_scene_keys:
        raise ValueError(f"{field_path} 缺少 {', '.join(missing_scene_keys)}（空 scene 不是合法契约）")
    _validate_displayed_model_markers(
        three_dimensional_scene["displayed_model_markers"], f"{field_path}.displayed_model_markers"
    )
    _validate_coordinate_lists(
        three_dimensional_scene["pareto_frontier_wireframe_line_segments"],
        f"{field_path}.pareto_frontier_wireframe_line_segments",
        allow_none_as_line_break_separator=True,
    )
    for triangle_mesh_key in TRIANGLE_MESH_KEYS_IN_THREE_DIMENSIONAL_SCENE:
        _validate_triangle_mesh(three_dimensional_scene[triangle_mesh_key], f"{field_path}.{triangle_mesh_key}")
    if not isinstance(three_dimensional_scene["three_dimensional_axis_configuration"], dict):
        raise ValueError(f"{field_path}.three_dimensional_axis_configuration 应为对象")
    for axis_name in ("x_axis", "y_axis", "z_axis"):
        axis_field_path = f"{field_path}.three_dimensional_axis_configuration.{axis_name}"
        axis_configuration = three_dimensional_scene["three_dimensional_axis_configuration"].get(axis_name)
        if not isinstance(axis_configuration, dict):
            raise ValueError(f"{axis_field_path} 应为对象")
        fixed_range = axis_configuration.get("fixed_range")
        if (
            not isinstance(fixed_range, list)
            or len(fixed_range) != 2
            or not all(_is_finite_json_number(endpoint) for endpoint in fixed_range)
            or fixed_range[0] >= fixed_range[1]
        ):
            raise ValueError(f"{axis_field_path}.fixed_range 固定范围必须是两个严格递增的有限数: {fixed_range!r}")


def _validate_lineage_coordinates(interaction_relationships: object, variant_key: str) -> None:
    field_path = f"metric_variants.{variant_key}.interaction_relationships"
    if not isinstance(interaction_relationships, dict):
        raise ValueError(f"{field_path} 应为对象")
    lineages = interaction_relationships.get("lineages", {})
    if not isinstance(lineages, dict):
        raise ValueError(f"{field_path}.lineages 应为对象")
    for lineage_key, lineage_nodes in lineages.items():
        lineage_field_path = f"{field_path}.lineages[{lineage_key!r}]"
        if not isinstance(lineage_nodes, list):
            raise ValueError(f"{lineage_field_path} 应为数组")
        for node_position, lineage_node in enumerate(lineage_nodes):
            node_field_path = f"{lineage_field_path}[{node_position}]"
            if not isinstance(lineage_node, dict):
                raise ValueError(f"{node_field_path} 应为对象")
            for coordinate_key in ("x", "y", "z"):
                if not _is_finite_json_number(lineage_node.get(coordinate_key)):
                    raise ValueError(f"{node_field_path}.{coordinate_key} 不是有限数: {lineage_node.get(coordinate_key)!r}")



def _validate_recent_release_grace_period_metadata(dataset: dict[str, Any]) -> None:
    """兼容无宽限字段的旧 v2；新契约的标记、设置与统计必须彼此一致。"""
    provenance = dataset.get("artificial_analysis_data_provenance") or {}
    months_key = "recent_release_frontier_distance_grace_period_months"
    metadata_recorded = months_key in provenance
    months = provenance.get(months_key)
    if metadata_recorded and (not _is_json_integer(months) or months < 0):
        raise ValueError("近期发布宽限月数必须是非负整数")
    marker_key = frontier.DISPLAYED_ONLY_BECAUSE_OF_RECENT_RELEASE_GRACE_PERIOD_COLUMN_NAME
    for variant_key, variant in dataset["metric_variants"].items():
        scene = variant["three_dimensional_scene"]
        markers = scene["displayed_model_markers"]
        for marker in markers:
            if (metadata_recorded or marker_key in marker) and not isinstance(marker.get(marker_key), bool):
                raise ValueError(f"{variant_key}.{marker_key} 宽限标记必须是布尔值")
        grace_count = sum(marker.get(marker_key) is True for marker in markers)
        if grace_count and (not metadata_recorded or months == 0):
            raise ValueError(f"{variant_key} 宽限关闭或未记录时不能含宽限专属点")
        if not metadata_recorded:
            continue
        counts = {
            "recent_release_grace_period_only_model_count": grace_count,
            "kept_model_count_without_recent_release_grace_period": len(markers) - grace_count,
        }
        current_view = scene.get("current_view")
        if not isinstance(current_view, dict):
            raise ValueError(f"{variant_key} 宽限契约缺少 current_view")
        if (
            not _is_json_integer(current_view.get(months_key))
            or current_view[months_key] != months
            or current_view.get("pruning_reference_date") != provenance.get("pruning_reference_date")
        ):
            raise ValueError(f"{variant_key} 宽限设置或剪枝参考日与 provenance 不一致")
        for count_key, expected in counts.items():
            if not _is_json_integer(variant.get(count_key)) or variant[count_key] != expected:
                raise ValueError(f"{variant_key}.{count_key} 宽限计数与标记不一致")
            if not _is_json_integer(current_view.get(count_key)) or current_view[count_key] != expected:
                raise ValueError(f"{variant_key}.current_view.{count_key} 宽限计数不一致")
        if not _is_json_integer(variant.get("kept_model_count")) or variant["kept_model_count"] != len(markers):
            raise ValueError(f"{variant_key} 宽限契约的保留总数与标记不一致")


def validate_frontier_3d_visualization_dataset(dataset: dict[str, Any]) -> None:
    """验证 renderer 依赖的契约结构与数值语义（规格 5.4），避免生成半坏 HTML。

    数值语义：网格/线段坐标为有限数（线段允许 null 断线）；三角索引为 [0, n) 内整数且三组等长；
    显示点与谱系节点 x/y/z 有限，显示点带 panel 且 panel 里没有 NaN；三轴范围有限且严格递增。
    零模型、零 Pareto 的空网格是合法场景；
    缺键的空 scene 不合法。
    """
    if dataset.get("schema_version") == FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION:
        from .frontier_3d_versioned_model_reference_contract import validate_versioned_frontier_3d_model_reference_contract
        validate_versioned_frontier_3d_model_reference_contract(dataset, browser_projection=False)
        return
    if dataset.get("schema_version") != LEGACY_FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION:
        raise ValueError("Frontier 3D visualization dataset schema_version 不匹配")
    if dataset.get("interactive_renderer") != "threejs":
        raise ValueError("Frontier 3D visualization dataset interactive_renderer 不匹配")
    initial_variant_key = dataset.get("initial_variant_key")
    metric_variants = dataset.get("metric_variants")
    if not isinstance(metric_variants, dict) or not metric_variants:
        raise ValueError("Frontier 3D visualization dataset 缺少 metric_variants")
    if initial_variant_key not in metric_variants:
        raise ValueError("Frontier 3D visualization dataset 初始 variant 不存在")
    expected_variant_keys = {
        f"{cost_metric_name}__{speed_metric_name}"
        for cost_metric_name in COST_METRIC_DEFINITIONS
        for speed_metric_name in SPEED_METRIC_DEFINITIONS
    }
    missing_variant_keys = expected_variant_keys - set(metric_variants)
    if missing_variant_keys:
        raise ValueError(
            "Frontier 3D visualization dataset 缺少指标组合: "
            + ", ".join(sorted(missing_variant_keys))
        )
    for variant_key, variant in metric_variants.items():
        for required_key in (
            "three_dimensional_scene",
            "interaction_relationships",
        ):
            if required_key not in variant:
                raise ValueError(f"{variant_key} 缺少 {required_key}")
        _validate_three_dimensional_scene(variant["three_dimensional_scene"], variant_key)
        _validate_lineage_coordinates(variant["interaction_relationships"], variant_key)
    _validate_recent_release_grace_period_metadata(dataset)
    organization_identity_metadata = dataset.get(
        "organization_identity_metadata_by_creator_name"
    )
    if not isinstance(organization_identity_metadata, dict):
        raise ValueError("Frontier 3D visualization dataset 缺少厂商身份元数据")
    # R2-F5：前端按 marker.creator 取身份元数据（国别、Logo）；缺一个就会在 buildModelMarkers 抛错、
    # 整页交互失效。builder 已把缺失/空白 creator 规范成占位厂商名，这里拦住绕过 builder 的契约。
    for variant_key, variant in metric_variants.items():
        for marker_position, displayed_model_marker in enumerate(
            variant["three_dimensional_scene"]["displayed_model_markers"]
        ):
            marker_creator_name = displayed_model_marker.get("creator")
            if not isinstance(marker_creator_name, str) or marker_creator_name not in organization_identity_metadata:
                raise ValueError(
                    f"{variant_key}.three_dimensional_scene.displayed_model_markers[{marker_position}].creator "
                    f"{marker_creator_name!r} 没有厂商身份元数据（模型 {displayed_model_marker.get('name')!r}）"
                )


def write_frontier_3d_visualization_dataset(
    dataset: dict[str, Any],
    output_path: Path,
) -> Path:
    from .frontier_3d_worktree_storage_paths import refuse_shared_worktree_directory_write
    refuse_shared_worktree_directory_write(output_path)
    dataset = adapt_frontier_3d_visualization_dataset_to_v3(dataset)
    validate_frontier_3d_visualization_dataset(dataset)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(dataset, ensure_ascii=False, separators=(",", ":"), allow_nan=False),
        encoding="utf-8",
    )
    return output_path


def read_frontier_3d_visualization_dataset(input_path: Path) -> dict[str, Any]:
    dataset = json.loads(input_path.read_text(encoding="utf-8"))
    validate_frontier_3d_visualization_dataset(dataset)
    dataset = adapt_frontier_3d_visualization_dataset_to_v3(dataset)
    validate_frontier_3d_visualization_dataset(dataset)
    return dataset


def default_frontier_3d_visualization_dataset_path_for_html(
    output_html_path: Path,
) -> Path:
    return output_html_path.with_name(DEFAULT_FRONTIER_3D_VISUALIZATION_DATASET_FILENAME)


def build_frontier_3d_visualization_dataset(df: pd.DataFrame, **parameters) -> dict[str, Any]:
    """默认输出 v3；计算与科学数值保持既有口径，不创建 Plotly 图。"""
    return adapt_frontier_3d_visualization_dataset_to_v3(
        _build_expanded_frontier_3d_visualization_dataset(df, **parameters)
    )
