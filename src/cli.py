"""命令行入口：取数 → 数据契约 → 三维 HTML 可视化。

    python -m src.cli                       # 均衡默认，输出 output/frontier_3d.html
    python -m src.cli --refresh             # 强制重拉 API 与网页
    python -m src.cli --since-months 12 --layers 2 --speed-scale linear
    python -m src.cli --speed-metric raw        # HTML 初始显示原始速度
    python -m src.cli --cost-metric blended     # HTML 初始显示 7:2:1 混合单价
    python -m src.cli --frontier-3d-visualization-dataset-in output/frontier_3d_visualization_dataset.json
    python -m src.cli --export png          # 另存静态图
"""
from __future__ import annotations

import argparse
from datetime import datetime
from pathlib import Path

import plotly.graph_objects as go

from . import fetch_data, visualize
from .frontier_3d_self_contained_html_renderer import (
    write_frontier_3d_self_contained_html_report,
)
from .frontier_3d_visualization_dataset_builder import (
    COST_METRIC_DEFINITIONS,
    DEFAULT_COST_METRIC_NAME,
    DEFAULT_FRONTIER_3D_VISUALIZATION_DATASET_FILENAME,
    DEFAULT_SPEED_METRIC_NAME,
    SPEED_METRIC_DEFINITIONS,
    build_frontier_3d_visualization_dataset,
    default_frontier_3d_visualization_dataset_path_for_html,
    read_frontier_3d_visualization_dataset,
    write_frontier_3d_visualization_dataset,
)

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_OUTPUT_HTML_PATH = ROOT / "output" / "frontier_3d.html"

SPEED_METRICS = {
    metric_name: (
        metric_definition["column_name"],
        metric_definition["label"],
    )
    for metric_name, metric_definition in SPEED_METRIC_DEFINITIONS.items()
}
COST_METRICS = {
    metric_name: (
        metric_definition["column_name"],
        metric_definition["label"],
        metric_definition["unit"],
    )
    for metric_name, metric_definition in COST_METRIC_DEFINITIONS.items()
}


def _figure_from_dataset_variant(dataset: dict, variant_key: str) -> go.Figure:
    variant = dataset["metric_variants"][variant_key]
    return go.Figure(
        data=variant["plotly_static_export_trace_data"],
        layout=variant["plotly_static_export_layout"],
    )


def _initial_variant_key_after_cli_metric_overrides(
    dataset: dict,
    requested_cost_metric_name: str | None,
    requested_speed_metric_name: str | None,
) -> str:
    if requested_cost_metric_name is None and requested_speed_metric_name is None:
        return dataset["initial_variant_key"]

    current_cost_metric_name, current_speed_metric_name = dataset[
        "initial_variant_key"
    ].split("__", 1)
    final_cost_metric_name = requested_cost_metric_name or current_cost_metric_name
    final_speed_metric_name = requested_speed_metric_name or current_speed_metric_name
    final_variant_key = f"{final_cost_metric_name}__{final_speed_metric_name}"
    if final_variant_key not in dataset["metric_variants"]:
        raise ValueError(f"数据契约缺少请求的初始指标组合: {final_variant_key}")
    return final_variant_key


def main() -> None:
    p = argparse.ArgumentParser(description="AA 三维前沿可视化")
    p.add_argument("--since-months", type=int, default=18, help="软窗：近 N 月内为‘近期’")
    p.add_argument("--layers", type=int, default=3, help="保留前 N 层 Pareto（离前沿距离）")
    p.add_argument("--hard-age-cutoff-months", type=int, default=36, help="早于此一律剔除（含 Pareto）")
    p.add_argument("--speed-scale", choices=["log", "linear"], default="log")
    p.add_argument(
        "--speed-metric",
        choices=SPEED_METRICS,
        default=None,
        help="HTML 初始速度口径；页面内仍可切换",
    )
    p.add_argument(
        "--cost-metric",
        choices=COST_METRICS,
        default=None,
        help="HTML 初始成本口径；页面内仍可切换",
    )
    p.add_argument("--refresh", action="store_true", help="忽略缓存，重新拉取")
    p.add_argument("--out", default=None,
                   help="输出 HTML 路径；缺省为 output/frontier_3d.html")
    p.add_argument(
        "--frontier-3d-visualization-dataset-out",
        type=Path,
        default=None,
        help=(
            "输出 Frontier 3D 可视化数据契约 JSON；缺省为 HTML 同目录的 "
            f"{DEFAULT_FRONTIER_3D_VISUALIZATION_DATASET_FILENAME}"
        ),
    )
    p.add_argument(
        "--frontier-3d-visualization-dataset-in",
        type=Path,
        default=None,
        help="读取已有 Frontier 3D 可视化数据契约 JSON，跳过取数和指标计算",
    )
    p.add_argument("--export", choices=["png", "svg"], default=None, help="另存静态图")
    args = p.parse_args()

    if args.out is None:
        args.out = str(DEFAULT_OUTPUT_HTML_PATH)

    output_html_path = Path(args.out)
    dataset_output_path = (
        args.frontier_3d_visualization_dataset_out
        or default_frontier_3d_visualization_dataset_path_for_html(output_html_path)
    )

    if args.frontier_3d_visualization_dataset_in is not None:
        dataset = read_frontier_3d_visualization_dataset(
            args.frontier_3d_visualization_dataset_in
        )
        dataset["initial_variant_key"] = _initial_variant_key_after_cli_metric_overrides(
            dataset,
            args.cost_metric,
            args.speed_metric,
        )
        print(f"\n数据契约: {args.frontier_3d_visualization_dataset_in}")
    else:
        df = fetch_data.build_dataframe(refresh=args.refresh)
        csv = fetch_data.save(df)
        print(f"\n数据表: {csv}")
        print(f"API 模型总数:            {len(df)}")

        dataset = build_frontier_3d_visualization_dataset(
            df,
            since_months=args.since_months,
            max_layers=args.layers,
            hard_age_cutoff_months=args.hard_age_cutoff_months,
            speed_scale=args.speed_scale,
            initial_cost_metric_name=args.cost_metric or DEFAULT_COST_METRIC_NAME,
            initial_speed_metric_name=args.speed_metric or DEFAULT_SPEED_METRIC_NAME,
            data_date=datetime.now().strftime("%Y-%m-%d"),
        )
        write_frontier_3d_visualization_dataset(dataset, dataset_output_path)
        print(f"可视化数据契约: {dataset_output_path}")
        for variant_key, variant in dataset["metric_variants"].items():
            print(
                f"{variant_key}: kept={variant['kept_model_count']}, "
                f"Pareto={variant['pareto_model_count']}"
            )

    initial_variant_key = dataset["initial_variant_key"]
    initial_figure = _figure_from_dataset_variant(dataset, initial_variant_key)
    out = write_frontier_3d_self_contained_html_report(dataset, output_html_path)
    print(f"\n✅ 交互式 HTML: {out}")

    if args.export:
        sp = visualize.export_static(
            initial_figure, Path(args.out).with_suffix("." + args.export)
        )
        if sp:
            print(f"✅ 静态图: {sp}")


if __name__ == "__main__":
    main()
