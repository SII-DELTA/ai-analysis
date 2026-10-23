"""默认路径按 checkout 身份隔离，detached HEAD 不影响路径选择。"""
from pathlib import Path
import os
import shutil
import subprocess

import pytest

from src.frontier_3d_worktree_storage_paths import resolve_frontier_3d_storage_paths, refuse_shared_worktree_directory_write


def make_linked_worktree(
    root: Path,
    main: Path,
    name: str,
    shared_directory_relative_paths=("output", "data/raw", "data/processed"),
):
    root.mkdir()
    git_directory = main / ".git" / "worktrees" / name
    git_directory.mkdir(parents=True)
    (git_directory / "commondir").write_text("../..\n")
    (root / ".git").write_text(f"gitdir: {git_directory}\n")
    for relative in shared_directory_relative_paths:
        target = main / relative
        target.mkdir(parents=True, exist_ok=True)
        (root / relative).parent.mkdir(parents=True, exist_ok=True)
        (root / relative).symlink_to(target, target_is_directory=True)


def test_two_detached_worktrees_never_resolve_to_shared_paths(tmp_path):
    main = tmp_path / "main"
    first, second = tmp_path / "first", tmp_path / "second"
    make_linked_worktree(first, main, "first")
    make_linked_worktree(second, main, "second")
    first_paths, second_paths = resolve_frontier_3d_storage_paths(first), resolve_frontier_3d_storage_paths(second)
    for attribute in ["raw_data_directory", "processed_models_csv_path", "output_html_path"]:
        first_path, second_path = getattr(first_paths, attribute), getattr(second_paths, attribute)
        assert first_path.is_relative_to(first)
        assert second_path.is_relative_to(second)
        assert first_path != second_path
    assert resolve_frontier_3d_storage_paths(main).output_html_path == main / "output/frontier_3d.html"


@pytest.mark.parametrize("relative", ["output/report.html", "data/raw/response.json", "data/processed/models.csv"])
@pytest.mark.parametrize(
    "shared_directory_relative_paths",
    [("output", "data/raw", "data/processed"), ("output", "data")],
    ids=["shared-leaf-symlinks", "shared-data-ancestor-symlink"],
)
def test_explicit_shared_leaf_or_ancestor_symlink_and_real_target_writes_are_refused(
    tmp_path, relative, shared_directory_relative_paths,
):
    main, worktree = tmp_path / "main", tmp_path / "task"
    make_linked_worktree(worktree, main, "task", shared_directory_relative_paths)
    for output in [worktree / relative, main / relative]:
        with pytest.raises(ValueError, match="共享"):
            refuse_shared_worktree_directory_write(output, worktree)
    refuse_shared_worktree_directory_write(worktree / "independent-report/report.html", worktree)


@pytest.mark.parametrize("relative", ["output/report.html", "data/raw/response.json", "data/processed/models.csv"])
def test_owned_worktree_directories_remain_writable_without_shared_symlinks(tmp_path, relative):
    main, worktree = tmp_path / "main", tmp_path / "task"
    make_linked_worktree(worktree, main, "task", shared_directory_relative_paths=())
    output_path = worktree / relative
    refuse_shared_worktree_directory_write(output_path, worktree)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text("本任务自有目录", encoding="utf-8")
    assert output_path.read_text(encoding="utf-8") == "本任务自有目录"
    assert not (main / relative).exists()


@pytest.mark.skipif(shutil.which("git") is None or shutil.which("uv") is None, reason="需要 git 和 uv")
def test_real_detached_worktrees_generate_reports_and_cache_inside_each_checkout(tmp_path):
    """Git 提交仅用于 tmp 内测试仓库的基线，不操作当前任务仓库的 refs 或 index。"""
    from src.frontier_3d_visualization_dataset_builder import build_frontier_3d_visualization_dataset, write_frontier_3d_visualization_dataset
    from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe
    import sys

    source = Path(__file__).resolve().parents[2]
    main = tmp_path / "synthetic-main-checkout"
    main.mkdir()
    shutil.copytree(source / "src", main / "src", ignore=shutil.ignore_patterns("__pycache__"))
    for name in ["pyproject.toml", "uv.lock"]:
        shutil.copy(source / name, main / name)

    def git(*args):
        return subprocess.run(["git", "-c", "core.hooksPath=/dev/null", "-C", str(main), *args], check=True, capture_output=True, text=True)

    git("init", "-q")
    git("add", "src", "pyproject.toml", "uv.lock")
    git("-c", "user.name=Frontier Synthetic Fixture", "-c", "user.email=fixture@example.invalid", "commit", "-qm", "测试夹具基线")
    dataset_path = tmp_path / "synthetic-input-contract.json"
    write_frontier_3d_visualization_dataset(build_frontier_3d_visualization_dataset(
        build_frontier_3d_synthetic_fixture_models_dataframe(), since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log",
    ), dataset_path)
    task_environment = {**os.environ, "UV_PROJECT_ENVIRONMENT": str(Path(sys.executable).parent.parent)}
    roots = [tmp_path / "first-detached-checkout", tmp_path / "second-detached-checkout"]
    for index, root in enumerate(roots):
        git("worktree", "add", "--detach", str(root), "HEAD")
        for relative in ["output", "data/raw", "data/processed"]:
            target = main / relative
            target.mkdir(parents=True, exist_ok=True)
            (root / relative).parent.mkdir(parents=True, exist_ok=True)
            (root / relative).symlink_to(target, target_is_directory=True)
        subprocess.run(["uv", "run", "--frozen", "--no-sync", "python", "-m", "src.cli", "--frontier-3d-visualization-dataset-in", str(dataset_path)], cwd=root, env=task_environment, check=True, capture_output=True, text=True, timeout=30)
        subprocess.run(["uv", "run", "--frozen", "--no-sync", "python", "-c", f"from src import fetch_data; import pandas as pd; fetch_data.save(pd.DataFrame([{{'fixture':{index}}}])); fetch_data._write_text_file_atomically(fetch_data.API_LANGUAGE_MODELS_CACHE, '{{}}')"], cwd=root, env=task_environment, check=True, capture_output=True, text=True, timeout=30)
        paths = resolve_frontier_3d_storage_paths(root)
        assert paths.output_html_path.is_file()
        assert paths.processed_models_csv_path.is_file()
        assert (paths.raw_data_directory / "api_language_models.json").read_text() == "{}"
    assert resolve_frontier_3d_storage_paths(roots[0]).processed_models_csv_path.read_text() != resolve_frontier_3d_storage_paths(roots[1]).processed_models_csv_path.read_text()
    assert not list((main / "output").iterdir())
    assert not list((main / "data/raw").iterdir())
    assert not list((main / "data/processed").iterdir())
