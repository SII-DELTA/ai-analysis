"""按 checkout 选择持久默认路径；linked worktree 不借用主仓库的共享符号链接。"""
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


REPOSITORY_ROOT_DIRECTORY = Path(__file__).resolve().parent.parent


@dataclass(frozen=True)
class FrontierThreeDimensionalStoragePaths:
    raw_data_directory: Path
    processed_models_csv_path: Path
    output_html_path: Path


def is_linked_git_worktree(repository_root: Path) -> bool:
    git_entry = repository_root / ".git"
    if not git_entry.is_file():
        return False
    text = git_entry.read_text(encoding="utf-8").strip()
    if not text.startswith("gitdir:"):
        return False
    git_directory = (repository_root / text.removeprefix("gitdir:").strip()).resolve()
    return (git_directory / "commondir").is_file()


def resolve_frontier_3d_storage_paths(repository_root: Path | None = None) -> FrontierThreeDimensionalStoragePaths:
    root = Path(repository_root or REPOSITORY_ROOT_DIRECTORY).resolve()
    if is_linked_git_worktree(root):
        artifacts = root / ".frontier-3d-worktree-artifacts"
        return FrontierThreeDimensionalStoragePaths(
            artifacts / "artificial-analysis-raw-data-cache",
            artifacts / "processed-model-tables" / "models.csv",
            artifacts / "rendered-reports" / "frontier_3d.html",
        )
    return FrontierThreeDimensionalStoragePaths(root / "data/raw", root / "data/processed/models.csv", root / "output/frontier_3d.html")


def refuse_shared_worktree_directory_write(output_path: Path, repository_root: Path | None = None) -> None:
    root = Path(repository_root or REPOSITORY_ROOT_DIRECTORY).resolve()
    if not is_linked_git_worktree(root):
        return
    resolved_output = Path(output_path).resolve()
    for relative in ("output", "data/raw", "data/processed"):
        shared_directory_path = root / relative
        resolved_shared_directory_path = shared_directory_path.resolve()
        # 根目录已解析；路径变化也能识别 data 等祖先目录上的共享符号链接。
        if (
            resolved_shared_directory_path != shared_directory_path
            and resolved_output.is_relative_to(resolved_shared_directory_path)
        ):
            raise ValueError(f"拒绝写入 worktree 的共享目录：{output_path}；请使用本任务隔离目录或显式独立路径")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="输出当前 checkout 的 Frontier 3D 默认路径")
    parser.add_argument("--field", choices=("raw-data-directory", "processed-models-csv-path", "output-html-path"), required=True)
    args = parser.parse_args()
    print(getattr(resolve_frontier_3d_storage_paths(), args.field.replace("-", "_")))
