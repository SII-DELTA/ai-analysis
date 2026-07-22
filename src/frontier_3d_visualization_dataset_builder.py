"""构建 Frontier 3D HTML 的稳定可视化数据契约。"""
from __future__ import annotations

from datetime import datetime
from pathlib import Path
from typing import Any

import pandas as pd
from plotly.utils import PlotlyJSONEncoder
import json

from . import frontier, visualize
from .frontier_3d_organization_identity_metadata_registry import (
    organization_identity_metadata_by_creator_name,
)

FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION = (
    "frontier_3d_visualization_dataset/v2"
)
DEFAULT_SPEED_METRIC_NAME = "effective"
DEFAULT_COST_METRIC_NAME = "effective"
DEFAULT_FRONTIER_3D_VISUALIZATION_DATASET_FILENAME = (
    "frontier_3d_visualization_dataset.json"
)

SPEED_METRIC_DEFINITIONS = {
    "effective": {
        "column_name": "eff_speed",
        "label": "有效速度",
    },
    "raw": {
        "column_name": "output_speed",
        "label": "原始速度",
    },
}

COST_METRIC_DEFINITIONS = {
    "effective": {
        "column_name": "cost_to_run",
        "label": "有效运行成本",
        "unit": "USD",
    },
    "blended": {
        "column_name": "blended_price_cache_input_output_7_to_2_to_1",
        "label": "7:2:1 混合单价",
        "unit": "USD/M tokens",
    },
}


def _trace_by_index(figure_data: list[dict], trace_index: int | None) -> dict:
    if trace_index is None or trace_index < 0 or trace_index >= len(figure_data):
        return {}
    return figure_data[trace_index]


def _line_segments_from_plotly_trace(trace: dict) -> dict:
    return {
        "x_coordinates": list(trace.get("x", [])),
        "y_coordinates": list(trace.get("y", [])),
        "z_coordinates": list(trace.get("z", [])),
    }


def _triangle_mesh_from_plotly_trace(trace: dict) -> dict:
    return {
        "x_coordinates": list(trace.get("x", [])),
        "y_coordinates": list(trace.get("y", [])),
        "z_coordinates": list(trace.get("z", [])),
        "triangle_vertex_index_a": list(trace.get("i", [])),
        "triangle_vertex_index_b": list(trace.get("j", [])),
        "triangle_vertex_index_c": list(trace.get("k", [])),
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
        "fixed_range": list(plotly_axis_configuration.get("range", [])),
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


def build_frontier_3d_visualization_dataset(
    df: pd.DataFrame,
    *,
    since_months: int,
    max_layers: int,
    hard_age_cutoff_months: int,
    speed_scale: str,
    initial_cost_metric_name: str = DEFAULT_COST_METRIC_NAME,
    initial_speed_metric_name: str = DEFAULT_SPEED_METRIC_NAME,
    data_date: str | None = None,
) -> dict[str, Any]:
    """把已合并的 AA DataFrame 转成前端可直接渲染的数据契约。"""
    data_date = data_date or datetime.now().strftime("%Y-%m-%d")
    metric_variants: dict[str, dict[str, Any]] = {}
    organization_identity_metadata = organization_identity_metadata_by_creator_name(
        df["creator"].fillna("?").astype(str)
    )

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
            )
            variant_df = frontier.add_standout_metrics(
                variant_df,
                cost_metric_column_name=cost_metric_column_name,
                speed_metric_column_name=speed_metric_column_name,
                speed_log=(speed_scale == "log"),
            )
            figure, interaction_payload = visualize.build_figure(
                variant_df,
                speed_scale=speed_scale,
                data_date=data_date,
                cost_metric_column_name=cost_metric_column_name,
                cost_metric_label=cost_metric_definition["label"],
                cost_metric_unit=cost_metric_definition["unit"],
                speed_metric_column_name=speed_metric_column_name,
                speed_metric_label=speed_metric_definition["label"],
            )
            figure_json = figure.to_plotly_json()
            three_dimensional_scene = (
                _three_dimensional_scene_from_plotly_figure_and_interaction_payload(
                    figure_json["data"],
                    figure_json["layout"],
                    interaction_payload,
                    organization_identity_metadata,
                )
            )
            metric_variants[variant_key] = {
                "three_dimensional_scene": three_dimensional_scene,
                "interaction_relationships": _interaction_relationships(
                    interaction_payload
                ),
                "plotly_static_export_trace_data": figure_json["data"],
                "plotly_static_export_layout": figure_json["layout"],
                "kept_model_count": len(interaction_payload["models"]),
                "pareto_model_count": sum(
                    1
                    for model in interaction_payload["models"]
                    if model["panel"]["layer"] == 1
                ),
            }

    initial_variant_key = f"{initial_cost_metric_name}__{initial_speed_metric_name}"
    if initial_variant_key not in metric_variants:
        raise ValueError(f"未知初始指标组合: {initial_variant_key}")

    return {
        "schema_version": FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION,
        "interactive_renderer": "threejs",
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "data_date": data_date,
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


def validate_frontier_3d_visualization_dataset(dataset: dict[str, Any]) -> None:
    """验证 renderer 依赖的最小契约，避免生成半坏 HTML。"""
    if dataset.get("schema_version") != FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION:
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
            "plotly_static_export_trace_data",
            "plotly_static_export_layout",
        ):
            if required_key not in variant:
                raise ValueError(f"{variant_key} 缺少 {required_key}")
    organization_identity_metadata = dataset.get(
        "organization_identity_metadata_by_creator_name"
    )
    if not isinstance(organization_identity_metadata, dict):
        raise ValueError("Frontier 3D visualization dataset 缺少厂商身份元数据")


def write_frontier_3d_visualization_dataset(
    dataset: dict[str, Any],
    output_path: Path,
) -> Path:
    validate_frontier_3d_visualization_dataset(dataset)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(dataset, ensure_ascii=False, indent=2, cls=PlotlyJSONEncoder),
        encoding="utf-8",
    )
    return output_path


def read_frontier_3d_visualization_dataset(input_path: Path) -> dict[str, Any]:
    dataset = json.loads(input_path.read_text(encoding="utf-8"))
    validate_frontier_3d_visualization_dataset(dataset)
    return dataset


def default_frontier_3d_visualization_dataset_path_for_html(
    output_html_path: Path,
) -> Path:
    return output_html_path.with_name(DEFAULT_FRONTIER_3D_VISUALIZATION_DATASET_FILENAME)
