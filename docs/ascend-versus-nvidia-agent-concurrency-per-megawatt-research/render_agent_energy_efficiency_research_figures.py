#!/usr/bin/env python3
"""使用 Matplotlib 从离线复算产物绘制可导出的研究图，不重采集数据。"""

import argparse
import csv
import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import font_manager


RESEARCH_DIRECTORY = Path(__file__).resolve().parent


def save_research_figure(figure, output_directory, filename_stem):
    for suffix in ("png", "svg"):
        output_path = output_directory / f"{filename_stem}.{suffix}"
        figure.savefig(output_path, dpi=180)
        if suffix == "svg":
            # Matplotlib路径换行保留分隔符，清除行末空格便于版本控制检查。
            output_path.write_text("\n".join(line.rstrip() for line in output_path.read_text(encoding="utf-8").splitlines()) + "\n", encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--results-directory", type=Path, default=RESEARCH_DIRECTORY / "generated-results")
    parser.add_argument("--figure-directory", type=Path, default=RESEARCH_DIRECTORY / "figures")
    parser.add_argument("--chinese-font-path", type=Path, help="指定支持中文的字体文件")
    arguments = parser.parse_args()
    candidates = [arguments.chinese_font_path] if arguments.chinese_font_path else [
        Path("/System/Library/Fonts/PingFang.ttc"),
        Path("/System/Library/Fonts/STHeiti Light.ttc"),
        Path("/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc"),
        Path("/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc"),
    ]
    font_path = next((path for path in candidates if path.is_file()), None)
    if font_path is None:
        raise SystemExit("未找到中文字体，请用 --chinese-font-path 指定；复算脚本不依赖绘图字体。")
    font_manager.fontManager.addfont(str(font_path))
    plt.rcParams.update({
        "font.family": font_manager.FontProperties(fname=str(font_path)).get_name(),
        "axes.unicode_minus": False,
        "svg.fonttype": "path",
        "figure.facecolor": "#faf8f3",
        "axes.facecolor": "#faf8f3",
        "axes.spines.top": False,
        "axes.spines.right": False,
    })
    arguments.figure_directory.mkdir(parents=True, exist_ok=True)
    result = json.loads((arguments.results_directory / "research-calculation-results.json").read_text(encoding="utf-8"))
    summaries = result["platform_optimized_summaries"]
    points = list(csv.DictReader((arguments.results_directory / "normalized-public-agentperf-measured-points.csv").open(encoding="utf-8")))
    colors = {"H200": "#396678", "B200": "#b85432"}

    figure, axes = plt.subplots(1, 2, figsize=(11, 5), layout="constrained")
    for axis, (speed, ttft) in zip(axes, ((20, 10), (60, 5))):
        for accelerator, color in colors.items():
            filtered = [point for point in points if point["accelerator_model"] == accelerator and float(point["output_speed_p25_tokens_per_second"]) >= speed and float(point["time_to_first_token_p95_seconds"]) <= ttft]
            axis.scatter([int(point["concurrent_agents"]) for point in filtered], [float(point["agents_per_megawatt"]) for point in filtered], color=color, alpha=0.65, s=35, label=f"{accelerator}×8")
            summary = next(row for row in summaries if row["accelerator_model"] == accelerator and row["output_speed_p25_minimum_tokens_per_second"] == speed)
            x, y = summary["best_efficiency_concurrent_agents"], summary["best_observed_agents_per_megawatt"]
            axis.scatter([x], [y], marker="*", s=180, color=color, edgecolors="white", zorder=5)
            axis.annotate(f"{y:,.0f}\n并发 {x}", (x, y), xytext=(0, 12), textcoords="offset points", ha="center", fontsize=10, color=color)
        axis.set_title(f"P25 ≥ {speed} token/s；P95 TTFT ≤ {ttft}s", loc="left", fontsize=12, pad=14)
        axis.set_xlabel("实测并发 Agent 数")
        axis.set_ylabel("并发 Agent／MW 加速器功耗")
        axis.set_ylim(bottom=0, top=axis.get_ylim()[1] * 1.28)
        axis.margins(x=0.18)
        axis.set_xlim(left=0)
        axis.grid(axis="y", alpha=0.15)
        axis.legend(frameon=False, loc="upper left")
    figure.suptitle("DeepSeek V4 Pro 0813（max）：公开合格测点与最佳已测能效", fontsize=15)
    figure.supxlabel("来源：Artificial Analysis；本研究复算｜快照：2026-10-22\n仅计加速器功耗；各平台优化部署，未证明严格等质量", fontsize=10)
    save_research_figure(figure, arguments.figure_directory, "public-measured-agent-energy-efficiency")
    plt.close(figure)

    figure, axis = plt.subplots(figsize=(9, 5), layout="constrained")
    power_grid_kw = [value / 10 for value in range(10, 10001)]
    for speed, color in ((20, "#396678"), (60, "#b85432")):
        reference = next(row for row in summaries if row["accelerator_model"] == "H200" and row["output_speed_p25_minimum_tokens_per_second"] == speed)
        reference_efficiency = reference["best_observed_agents_per_megawatt"]
        axis.plot(power_grid_kw, [reference_efficiency * power / 1000 for power in power_grid_kw], color=color, label=f"达到 H200 {speed} token/s 档能效所需并发")
    axis.set_xscale("log")
    axis.set_yscale("log")
    axis.set_xlabel("假定参与推理的加速器总功耗（kW）")
    axis.set_ylabel("所需合格并发 Agent 数（连续阈值，整数向上取整）")
    axis.set_title("未知硬件的盈亏平衡门槛：条件函数，不是容量预测", loc="left", fontsize=14, pad=16)
    axis.grid(which="both", alpha=0.15)
    axis.legend(frameon=False, loc="upper left")
    figure.supxlabel("需满足相同模型、负载与服务要求；只有功耗边界一致时才可比较", fontsize=10)
    save_research_figure(figure, arguments.figure_directory, "h200-equivalent-energy-efficiency-concurrency-threshold")
    plt.close(figure)
    print(f"已生成两组 PNG／SVG 研究图：{arguments.figure_directory}")


if __name__ == "__main__":
    main()
