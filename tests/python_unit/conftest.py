"""pytest 全局配置：按需启用依赖本机 Artificial Analysis 缓存的测试。

带 marker `requires_local_cached_artificial_analysis_data` 的测试会读取 `data/raw/`
（13 个 worktree 共享的符号链接目录，内容随本机抓取历史而变）。它们默认跳过，
以下任一方式显式启用：

- 命令行选项 `--run-tests-requiring-local-cached-artificial-analysis-data`；
- 环境变量 `RUN_TESTS_REQUIRING_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA=1`
  （也接受 true / yes / on，不区分大小写）；
- `-m` 表达式正向选中该 marker，例如 `-m requires_local_cached_artificial_analysis_data`
  （与 pyproject.toml 中 marker 描述的用法一致；`-m "not ..."` 不算启用）。
"""
from __future__ import annotations

import os
import re

import pytest

REQUIRES_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA_MARKER_NAME = (
    "requires_local_cached_artificial_analysis_data"
)
RUN_TESTS_REQUIRING_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA_COMMAND_LINE_OPTION = (
    "--run-tests-requiring-local-cached-artificial-analysis-data"
)
RUN_TESTS_REQUIRING_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA_ENVIRONMENT_VARIABLE_NAME = (
    "RUN_TESTS_REQUIRING_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA"
)
ENVIRONMENT_VARIABLE_VALUES_TREATED_AS_ENABLED = {"1", "true", "yes", "on"}


def pytest_addoption(parser: pytest.Parser) -> None:
    parser.addoption(
        RUN_TESTS_REQUIRING_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA_COMMAND_LINE_OPTION,
        action="store_true",
        default=False,
        help=(
            "运行读取本机 data/raw 缓存的测试（marker "
            f"{REQUIRES_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA_MARKER_NAME}）；"
            "默认跳过。等价于设置环境变量 "
            f"{RUN_TESTS_REQUIRING_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA_ENVIRONMENT_VARIABLE_NAME}=1"
        ),
    )


def _marker_expression_positively_selects_local_cached_data_marker(
    marker_expression: str,
) -> bool:
    """`-m` 表达式里出现该 marker 且没有被 `not` 否定时，视为显式启用。

    只做文本判断，不解析完整的布尔表达式：`-m "a or requires_…"` 视为启用，
    `-m "not requires_…"` 不启用。
    """
    marker_word_pattern = rf"\b{REQUIRES_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA_MARKER_NAME}\b"
    if not re.search(marker_word_pattern, marker_expression):
        return False
    return not re.search(rf"\bnot\s+{marker_word_pattern}", marker_expression)


def _tests_requiring_local_cached_artificial_analysis_data_are_enabled(
    config: pytest.Config,
) -> bool:
    if config.getoption(
        RUN_TESTS_REQUIRING_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA_COMMAND_LINE_OPTION
    ):
        return True
    environment_variable_value = os.environ.get(
        RUN_TESTS_REQUIRING_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA_ENVIRONMENT_VARIABLE_NAME,
        "",
    )
    if environment_variable_value.strip().lower() in ENVIRONMENT_VARIABLE_VALUES_TREATED_AS_ENABLED:
        return True
    return _marker_expression_positively_selects_local_cached_data_marker(
        config.getoption("markexpr", default="") or ""
    )


def pytest_collection_modifyitems(
    config: pytest.Config,
    items: list[pytest.Item],
) -> None:
    if _tests_requiring_local_cached_artificial_analysis_data_are_enabled(config):
        return
    skip_marker_for_tests_requiring_local_cached_data = pytest.mark.skip(
        reason=(
            "读取本机 data/raw 缓存的测试默认跳过；用 "
            f"{RUN_TESTS_REQUIRING_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA_COMMAND_LINE_OPTION} 或 "
            f"{RUN_TESTS_REQUIRING_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA_ENVIRONMENT_VARIABLE_NAME}=1 启用"
        )
    )
    for collected_test_item in items:
        if collected_test_item.get_closest_marker(
            REQUIRES_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA_MARKER_NAME
        ) is not None:
            collected_test_item.add_marker(skip_marker_for_tests_requiring_local_cached_data)
