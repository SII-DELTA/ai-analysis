"""离线生成 F1 四口径 golden diff，供用户选择方法；不修改产品。"""
import argparse
import hashlib
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from src.frontier_3d_visualization_dataset_builder import read_frontier_3d_visualization_dataset
from src.frontier_3d_standout_methodology_golden_comparison import build_standout_methodology_golden_comparison
from src.frontier_3d_worktree_storage_paths import refuse_shared_worktree_directory_write


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-dataset", type=Path, required=True)
    parser.add_argument("--output-directory", type=Path, required=True)
    arguments = parser.parse_args()
    refuse_shared_worktree_directory_write(arguments.output_directory)
    comparison = build_standout_methodology_golden_comparison(read_frontier_3d_visualization_dataset(arguments.source_dataset))
    comparison["source_dataset_sha256"] = hashlib.sha256(arguments.source_dataset.read_bytes()).hexdigest()
    assert len(comparison["metric_variants"]) == 4 and comparison["production_rankings_changed"] is False
    arguments.output_directory.mkdir(parents=True, exist_ok=True)
    destination = arguments.output_directory / "frontier-3d-standout-methodology-four-variant-golden-diff.json"
    refuse_shared_worktree_directory_write(destination)
    destination.write_text(json.dumps(comparison, ensure_ascii=False, allow_nan=False, indent=2) + "\n")
    lines = ["# F1 四口径方法学 golden diff", "", "当前产品数值和排名保持不变，候选方法等待用户审阅。", "", "| 口径 | 前沿模型数 | 稳健拟合 | 旧距离与超体积相关 | 支配域距离与超体积相关 |", "|---|---:|---|---:|---:|"]
    for key, variant in comparison["metric_variants"].items():
        correlations = variant.get("frontier_distance_hypervolume_spearman", {})
        lines.append(f"| {key} | {len(variant['models'])} | {variant.get('trend_fit', {}).get('status')} | {correlations.get('baseline', {}).get('coefficient')} | {correlations.get('candidate', {}).get('coefficient')} |")
    lines.extend(["", "候选趋势：Huber 二次拟合，仅使用当前前沿，n<3p 或秩不足时保留未知；σ=√(RSS/(n−p))，杠杆值大于 0.5 单列。", "", "智能抬升排除同厂商同目录 release 的全部档位，release 未知及无外部预算对照分别保留原因。", "", "参考点敏感性包含 pad=0.01/0.05/0.1/0.2 的真实单位参考点、完整贡献和前三名；固定语义参考点尚未替用户选择。", "", f"完整数据：[{destination.name}]({destination.name})", ""])
    (arguments.output_directory / "frontier-3d-standout-methodology-review.md").write_text("\n".join(lines))
    print(f"已生成四口径 golden diff：{destination}")


if __name__ == "__main__":
    main()
