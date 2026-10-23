"""使用入库的合成模型表生成验证页面，不联网、不读取真实缓存。"""
from pathlib import Path
import argparse
import sys

REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPOSITORY_ROOT))
from src.frontier_3d_self_contained_html_renderer import write_frontier_3d_self_contained_html_report
from src.frontier_3d_visualization_dataset_builder import build_frontier_3d_visualization_dataset, write_frontier_3d_visualization_dataset
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-html-path", type=Path, default=REPOSITORY_ROOT / ".frontier-3d-worktree-artifacts/verification-synthetic-reports/frontier_3d.html")
    args = parser.parse_args()
    dataset = build_frontier_3d_visualization_dataset(build_frontier_3d_synthetic_fixture_models_dataframe(), since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log")
    write_frontier_3d_visualization_dataset(dataset, args.output_html_path.with_name("frontier_3d_visualization_dataset.json"))
    write_frontier_3d_self_contained_html_report(dataset, args.output_html_path)
    print(args.output_html_path.resolve())


if __name__ == "__main__":
    main()
