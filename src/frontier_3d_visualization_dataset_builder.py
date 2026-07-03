"""构建 Frontier 3D HTML 的稳定可视化数据契约。"""
from __future__ import annotations

from datetime import datetime
from pathlib import Path
from typing import Any

import pandas as pd
from plotly.utils import PlotlyJSONEncoder
import json

from . import frontier, visualize

FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION = (
    "frontier_3d_visualization_dataset/v1"
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
            metric_variants[variant_key] = {
                "plotly_data": figure_json["data"],
                "plotly_layout": figure_json["layout"],
                "data": figure_json["data"],
                "layout": figure_json["layout"],
                "interaction_payload": interaction_payload,
                "payload": interaction_payload,
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
        "generated_at": datetime.now().isoformat(timespec="seconds"),
        "data_date": data_date,
        "graph_div_id": visualize.GRAPH_DIV_ID,
        "initial_variant_key": initial_variant_key,
        "speed_scale": speed_scale,
        "cost_metric_definitions": COST_METRIC_DEFINITIONS,
        "speed_metric_definitions": SPEED_METRIC_DEFINITIONS,
        "metric_variants": metric_variants,
    }


def validate_frontier_3d_visualization_dataset(dataset: dict[str, Any]) -> None:
    """验证 renderer 依赖的最小契约，避免生成半坏 HTML。"""
    if dataset.get("schema_version") != FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION:
        raise ValueError("Frontier 3D visualization dataset schema_version 不匹配")
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
        for required_key in ("data", "layout", "payload"):
            if required_key not in variant:
                raise ValueError(f"{variant_key} 缺少 {required_key}")


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
