"""命令行入口：取数 → 剪枝 → 三维可视化。

    python -m src.cli                       # 均衡默认，输出 output/frontier_3d.html
    python -m src.cli --refresh             # 强制重拉 API 与网页
    python -m src.cli --since-months 12 --layers 2 --speed-scale linear
    python -m src.cli --speed-metric raw        # HTML 初始显示原始速度
    python -m src.cli --cost-metric blended     # HTML 初始显示 7:2:1 混合单价
    python -m src.cli --export png          # 另存静态图
"""
from __future__ import annotations

import argparse
from datetime import datetime
from pathlib import Path

from . import fetch_data, frontier, visualize

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_OUTPUT_HTML_PATH = ROOT / "output" / "frontier_3d.html"
DEFAULT_SPEED_METRIC_NAME = "effective"
DEFAULT_COST_METRIC_NAME = "effective"

# 速度口径 -> (数据列, 轴标签)
SPEED_METRICS = {
    "effective": ("eff_speed", "有效速度"),
    "raw": ("output_speed", "原始速度"),
}
COST_METRICS = {
    "effective": ("cost_to_run", "有效运行成本", "USD"),
    "blended": (
        "blended_price_cache_input_output_7_to_2_to_1",
        "7:2:1 混合单价",
        "USD/M tokens",
    ),
}


def main() -> None:
    p = argparse.ArgumentParser(description="AA 三维前沿可视化")
    p.add_argument("--since-months", type=int, default=18, help="软窗：近 N 月内为‘近期’")
    p.add_argument("--layers", type=int, default=3, help="保留前 N 层 Pareto（离前沿距离）")
    p.add_argument("--hard-age-cutoff-months", type=int, default=36, help="早于此一律剔除（含 Pareto）")
    p.add_argument("--speed-scale", choices=["log", "linear"], default="log")
    p.add_argument(
        "--speed-metric",
        choices=SPEED_METRICS,
        default=DEFAULT_SPEED_METRIC_NAME,
        help="HTML 初始速度口径；页面内仍可切换",
    )
    p.add_argument(
        "--cost-metric",
        choices=COST_METRICS,
        default=DEFAULT_COST_METRIC_NAME,
        help="HTML 初始成本口径；页面内仍可切换",
    )
    p.add_argument("--refresh", action="store_true", help="忽略缓存，重新拉取")
    p.add_argument("--out", default=None,
                   help="输出 HTML 路径；缺省为 output/frontier_3d.html")
    p.add_argument("--export", choices=["png", "svg"], default=None, help="另存静态图")
    args = p.parse_args()

    if args.out is None:
        args.out = str(DEFAULT_OUTPUT_HTML_PATH)

    df = fetch_data.build_dataframe(refresh=args.refresh)
    csv = fetch_data.save(df)

    print(f"\n数据表: {csv}")
    print(f"API 模型总数:            {len(df)}")

    data_date = datetime.now().strftime("%Y-%m-%d")
    metric_variants = {}
    for cost_metric_name, (
        cost_metric_column_name,
        cost_metric_label,
        cost_metric_unit,
    ) in COST_METRICS.items():
        for speed_metric_name, (
            speed_metric_column_name,
            speed_metric_label,
        ) in SPEED_METRICS.items():
            variant_key = f"{cost_metric_name}__{speed_metric_name}"
            variant_df = frontier.apply_pruning(
                df,
                since_months=args.since_months,
                max_layers=args.layers,
                hard_age_cutoff_months=args.hard_age_cutoff_months,
                cost_metric_column_name=cost_metric_column_name,
                speed_metric_column_name=speed_metric_column_name,
            )
            fig, lineage_payload = visualize.build_figure(
                variant_df,
                speed_scale=args.speed_scale,
                data_date=data_date,
                cost_metric_column_name=cost_metric_column_name,
                cost_metric_label=cost_metric_label,
                cost_metric_unit=cost_metric_unit,
                speed_metric_column_name=speed_metric_column_name,
                speed_metric_label=speed_metric_label,
            )
            metric_variants[variant_key] = (fig, lineage_payload)
            print(
                f"{variant_key}: kept={int(variant_df['kept'].sum())}, "
                f"Pareto={int(variant_df['is_pareto'].sum())}"
            )

    initial_variant_key = f"{args.cost_metric}__{args.speed_metric}"
    initial_figure, initial_lineage_payload = metric_variants[initial_variant_key]
    out = visualize.write_html(
        initial_figure,
        Path(args.out),
        initial_lineage_payload,
        metric_variants=metric_variants,
        initial_variant_key=initial_variant_key,
    )
    print(f"\n✅ 交互式 HTML: {out}")

    if args.export:
        sp = visualize.export_static(
            initial_figure, Path(args.out).with_suffix("." + args.export)
        )
        if sp:
            print(f"✅ 静态图: {sp}")


if __name__ == "__main__":
    main()
