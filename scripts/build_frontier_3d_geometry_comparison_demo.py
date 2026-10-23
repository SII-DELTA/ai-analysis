"""从已有 v2 契约离线生成独立前沿几何比较页，不抓取数据。"""
from __future__ import annotations

import argparse
import os
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from src.frontier_3d_geometry_comparison_artifact_builder import write_geometry_comparison_artifacts


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--visualization-dataset-in", type=Path, required=True, help="只读的 frontier_3d_visualization_dataset/v2 JSON")
    parser.add_argument("--artifact-directory", type=Path, default=Path(os.environ.get(
        "KANBAN_TASK_CROSS_TASK_HANDOFF_ARTIFACT_DIRECTORY",
        str(Path.home() / ".cline/kanban/cross-task-handoff-artifacts/ai-analysis/task-ea403-frontier-geometry-comparison-demo"),
    )), help="持久产物目录；拒绝写入共享数据目录")
    arguments = parser.parse_args()
    try:
        artifacts = write_geometry_comparison_artifacts(arguments.visualization_dataset_in, arguments.artifact_directory)
    except (ValueError, OSError) as error:
        parser.exit(1, f"比较页生成失败：{error}\n")
    for kind, path in artifacts.items():
        print(f"{kind}: {path.resolve()}")


if __name__ == "__main__":
    main()
