"""冒烟测试：src 模块全部可导入、真正的命令行入口 `--help` 退出码为 0、
scripts/*.py 全部可编译、scripts/*.sh 语法正确。

不联网、不读 `output/` 与 `data/processed/`：`--help` 在 argparse 解析阶段即退出，
不会触发取数；子进程环境里剔除 ARTIFICIAL_ANALYSIS_API_KEY，证明 `--help` 不依赖 key。
读取 `data/raw` 缓存的检查单独打 marker，默认跳过（见 conftest.py）。
"""
from __future__ import annotations

import importlib
import json
import os
import py_compile
import shutil
import subprocess
import sys
from pathlib import Path

import pytest

REPOSITORY_ROOT_DIRECTORY_PATH = Path(__file__).resolve().parents[2]
SOURCE_PACKAGE_DIRECTORY_PATH = REPOSITORY_ROOT_DIRECTORY_PATH / "src"
SCRIPTS_DIRECTORY_PATH = REPOSITORY_ROOT_DIRECTORY_PATH / "scripts"

# 计划 W1-2 点名必须可导入的模块；下方还会自动发现 src/ 下其余顶层模块一并导入
SOURCE_MODULE_NAMES_REQUIRED_TO_IMPORT_CLEANLY = [
    "src.cli",
    "src.fetch_data",
    "src.frontier",
    "src.visualize",
    "src.frontier_3d_visualization_dataset_builder",
    "src.frontier_3d_self_contained_html_renderer",
    "src.frontier_3d_organization_identity_metadata_registry",
    "src.model_intelligence_verbosity_report",
]

# 本任务新增的一键 shell 入口：必须支持 `--help`
ONE_CLICK_SHELL_SCRIPT_FILE_NAMES_REQUIRED_TO_SUPPORT_HELP = [
    "refresh_regenerate_verify_and_open_frontier_3d_report.sh",
    "run_all_frontier_3d_verifications.sh",
]

# 子进程超时：--help 只做导入与参数解析，正常 < 10 秒
COMMAND_LINE_HELP_SUBPROCESS_TIMEOUT_SECONDS = 120


def _discovered_top_level_source_module_names() -> list[str]:
    return sorted(
        f"src.{source_file_path.stem}"
        for source_file_path in SOURCE_PACKAGE_DIRECTORY_PATH.glob("*.py")
        if source_file_path.stem != "__init__"
    )


def _python_script_paths_that_define_argparse_command_line() -> list[Path]:
    """只对真正的 CLI（定义了 argparse.ArgumentParser）跑 `--help`；
    Playwright 验证脚本按位置参数读 HTML 路径，不是 argparse CLI。"""
    return sorted(
        script_path
        for script_path in SCRIPTS_DIRECTORY_PATH.glob("*.py")
        if "argparse.ArgumentParser(" in script_path.read_text(encoding="utf-8")
    )


def _subprocess_environment_without_artificial_analysis_api_key() -> dict[str, str]:
    subprocess_environment = dict(os.environ)
    subprocess_environment.pop("ARTIFICIAL_ANALYSIS_API_KEY", None)
    subprocess_environment["PYTHONDONTWRITEBYTECODE"] = "1"
    return subprocess_environment


def _run_command_line_and_capture_output(
    command_line_arguments: list[str],
) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        command_line_arguments,
        cwd=REPOSITORY_ROOT_DIRECTORY_PATH,
        env=_subprocess_environment_without_artificial_analysis_api_key(),
        capture_output=True,
        text=True,
        timeout=COMMAND_LINE_HELP_SUBPROCESS_TIMEOUT_SECONDS,
        check=False,
    )


def test_required_source_modules_all_exist_in_source_package_directory() -> None:
    discovered_source_module_names = set(_discovered_top_level_source_module_names())
    missing_required_source_module_names = sorted(
        set(SOURCE_MODULE_NAMES_REQUIRED_TO_IMPORT_CLEANLY) - discovered_source_module_names
    )
    assert missing_required_source_module_names == []


@pytest.mark.parametrize(
    "source_module_name",
    sorted(
        set(SOURCE_MODULE_NAMES_REQUIRED_TO_IMPORT_CLEANLY)
        | set(_discovered_top_level_source_module_names())
    ),
)
def test_source_module_imports_without_error(source_module_name: str) -> None:
    importlib.import_module(source_module_name)


def test_source_command_line_module_help_exits_with_status_zero() -> None:
    completed_process = _run_command_line_and_capture_output(
        [sys.executable, "-m", "src.cli", "--help"]
    )
    assert completed_process.returncode == 0, completed_process.stderr
    assert "usage:" in completed_process.stdout


def test_model_intelligence_verbosity_report_generator_is_detected_as_argparse_command_line() -> None:
    argparse_script_file_names = {
        script_path.name for script_path in _python_script_paths_that_define_argparse_command_line()
    }
    assert "generate_model_intelligence_verbosity_report.py" in argparse_script_file_names


@pytest.mark.parametrize(
    "argparse_script_path",
    _python_script_paths_that_define_argparse_command_line(),
    ids=lambda script_path: script_path.name,
)
def test_argparse_python_script_help_exits_with_status_zero(argparse_script_path: Path) -> None:
    completed_process = _run_command_line_and_capture_output(
        [sys.executable, str(argparse_script_path), "--help"]
    )
    assert completed_process.returncode == 0, completed_process.stderr
    assert "usage:" in completed_process.stdout


@pytest.mark.parametrize(
    "python_script_path",
    sorted(SCRIPTS_DIRECTORY_PATH.glob("*.py")),
    ids=lambda script_path: script_path.name,
)
def test_python_script_compiles_without_syntax_error(
    python_script_path: Path,
    tmp_path: Path,
) -> None:
    # 字节码写到 tmp_path，避免在 scripts/ 下留下 __pycache__
    py_compile.compile(
        str(python_script_path),
        cfile=str(tmp_path / f"{python_script_path.stem}.pyc"),
        doraise=True,
    )


@pytest.mark.parametrize(
    "shell_script_path",
    sorted(SCRIPTS_DIRECTORY_PATH.glob("*.sh")),
    ids=lambda script_path: script_path.name,
)
def test_shell_script_passes_bash_syntax_check(shell_script_path: Path) -> None:
    bash_executable_path = shutil.which("bash")
    if bash_executable_path is None:
        pytest.skip("本机没有 bash，无法做 shell 语法检查")
    completed_process = _run_command_line_and_capture_output(
        [bash_executable_path, "-n", str(shell_script_path)]
    )
    assert completed_process.returncode == 0, completed_process.stderr


@pytest.mark.parametrize(
    "one_click_shell_script_file_name",
    ONE_CLICK_SHELL_SCRIPT_FILE_NAMES_REQUIRED_TO_SUPPORT_HELP,
)
def test_one_click_shell_script_help_exits_with_status_zero(
    one_click_shell_script_file_name: str,
) -> None:
    bash_executable_path = shutil.which("bash")
    if bash_executable_path is None:
        pytest.skip("本机没有 bash，无法运行 shell 入口")
    shell_script_path = SCRIPTS_DIRECTORY_PATH / one_click_shell_script_file_name
    assert shell_script_path.is_file()
    completed_process = _run_command_line_and_capture_output(
        [bash_executable_path, str(shell_script_path), "--help"]
    )
    assert completed_process.returncode == 0, completed_process.stderr
    assert "用法" in completed_process.stdout


@pytest.mark.requires_local_cached_artificial_analysis_data
def test_local_cached_artificial_analysis_api_language_models_response_is_readable() -> None:
    """只读检查：本机 API 缓存是合法 JSON，且 `data` 为非空模型列表。"""
    api_language_models_cache_path = (
        REPOSITORY_ROOT_DIRECTORY_PATH / "data" / "raw" / "api_language_models.json"
    )
    if not api_language_models_cache_path.is_file():
        pytest.skip(f"本机没有 API 缓存: {api_language_models_cache_path}")
    cached_api_response = json.loads(api_language_models_cache_path.read_text(encoding="utf-8"))
    cached_model_rows = cached_api_response["data"]
    assert isinstance(cached_model_rows, list)
    assert len(cached_model_rows) > 0
    assert all("id" in cached_model_row for cached_model_row in cached_model_rows)
