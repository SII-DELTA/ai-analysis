"""命令行入口：取数 → 剪枝 → 三维可视化。

    python -m src.cli                       # 均衡默认，输出 output/frontier_3d.html
    python -m src.cli --refresh             # 强制重拉 API 与网页
    python -m src.cli --since-months 12 --layers 2 --speed-scale linear
    python -m src.cli --export png          # 另存静态图
"""
from __future__ import annotations

import argparse
from datetime import datetime
from pathlib import Path

from . import fetch_data, frontier, visualize

ROOT = Path(__file__).resolve().parent.parent


def main() -> None:
    p = argparse.ArgumentParser(description="AA 三维前沿可视化")
    p.add_argument("--since-months", type=int, default=18, help="软窗：近 N 月内为‘近期’")
    p.add_argument("--layers", type=int, default=3, help="保留前 N 层 Pareto（离前沿距离）")
    p.add_argument("--hard-age-cutoff-months", type=int, default=36, help="早于此一律剔除（含 Pareto）")
    p.add_argument("--speed-scale", choices=["log", "linear"], default="log")
    p.add_argument("--refresh", action="store_true", help="忽略缓存，重新拉取")
    p.add_argument("--out", default=str(ROOT / "output" / "frontier_3d.html"))
    p.add_argument("--export", choices=["png", "svg"], default=None, help="另存静态图")
    args = p.parse_args()

    df = fetch_data.build_dataframe(refresh=args.refresh)
    csv = fetch_data.save(df)

    df = frontier.apply_pruning(
        df,
        since_months=args.since_months,
        max_layers=args.layers,
        hard_age_cutoff_months=args.hard_age_cutoff_months,
    )

    kept = df[df["kept"]]
    print(f"\n数据表: {csv}")
    print(f"API 模型总数:            {len(df)}")
    print(f"三维齐全:                {df[frontier.DIMS].notna().all(axis=1).sum()}")
    print(f"保留(kept):              {len(kept)}")
    print(f"  其中 Pareto 最优:      {int(df['is_pareto'].sum())}")
    print("剔除原因分布:")
    for reason, cnt in df.loc[~df["kept"], "drop_reason"].value_counts().items():
        print(f"  - {reason}: {cnt}")
    print("各 Pareto 层模型数(保留集):")
    for layer, cnt in kept["layer"].value_counts().sort_index().items():
        print(f"  - 第 {int(layer)} 层: {cnt}")

    data_date = datetime.now().strftime("%Y-%m-%d")
    fig = visualize.build_figure(df, speed_scale=args.speed_scale, data_date=data_date)
    out = visualize.write_html(fig, Path(args.out))
    print(f"\n✅ 交互式 HTML: {out}")

    if args.export:
        sp = visualize.export_static(fig, Path(args.out).with_suffix("." + args.export))
        if sp:
            print(f"✅ 静态图: {sp}")


if __name__ == "__main__":
    main()
