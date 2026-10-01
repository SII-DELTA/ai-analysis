"""冗长度报告阈值跟随当期中位数（用户 2026-10-02 拍板，R4-10 选 (b)）。

- 缺省阈值 = 「v4.1 时期旧阈值 30M ÷ v4.1 快照 token 中位数 21.236883M」× 当期指数版本的 token 中位数：
  指数重定标后 token 规模整体变大（v4.3.2 中位数约 87M），固定 30M 会让阈值的相对位置漂移；
- `--output-token-limit-millions` 仍可显式覆盖；与倍数参数互斥；
- 报告与 CSV 写明阈值、换算方法、旧阈值、当期中位数与版本；
- 产物文件名不再硬编码 30m；
- 当期没有任何 token 数时阈值为 NaN、阈值内表格为空，并在报告中说明。

用 T3 合成 fixture，不读共享目录。
"""
from __future__ import annotations

import math
import subprocess
import sys
from pathlib import Path

import pandas as pd
import pytest

from src import fetch_data
from src import model_intelligence_verbosity_report as verbosity_report
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import (
    build_frontier_3d_synthetic_fixture_models_dataframe,
)

REPOSITORY_ROOT = Path(__file__).resolve().parents[2]


def _synthetic_fixture_verbosity_frame() -> pd.DataFrame:
    return verbosity_report.build_model_intelligence_verbosity_dataframe_from_models_dataframe(
        build_frontier_3d_synthetic_fixture_models_dataframe()
    )


def test_default_multiple_is_v4_1_era_threshold_divided_by_v4_1_snapshot_median() -> None:
    assert verbosity_report.REFERENCE_OUTPUT_TOKEN_LIMIT_MILLIONS_USED_IN_INTELLIGENCE_INDEX_V4_1_ERA == 30.0
    assert (
        verbosity_report.REFERENCE_MEDIAN_OUTPUT_MILLION_TOKENS_OF_INTELLIGENCE_INDEX_V4_1_FALLBACK_SNAPSHOT
        == pytest.approx(21.236883)
    )
    assert (
        verbosity_report.DEFAULT_OUTPUT_TOKEN_LIMIT_MULTIPLE_OF_CURRENT_INTELLIGENCE_INDEX_VERSION_MEDIAN
        == pytest.approx(30.0 / 21.236883)
    )


def test_default_threshold_is_multiple_times_current_version_median() -> None:
    verbosity_frame = _synthetic_fixture_verbosity_frame()
    current_median = float(verbosity_frame["verbosity_m_output_tokens"].median())
    assert not math.isnan(current_median)

    resolved_threshold = verbosity_report.resolve_output_token_verbosity_threshold(verbosity_frame)

    assert resolved_threshold.derivation_method == (
        verbosity_report.OUTPUT_TOKEN_VERBOSITY_THRESHOLD_DERIVATION_METHOD_MULTIPLE_OF_CURRENT_INTELLIGENCE_INDEX_VERSION_MEDIAN
    )
    assert resolved_threshold.current_intelligence_index_version_median_output_million_tokens == pytest.approx(
        current_median
    )
    assert resolved_threshold.output_token_limit_millions == pytest.approx(
        current_median * 30.0 / 21.236883
    )
    assert resolved_threshold.current_intelligence_index_version == "4.3.2"
    assert resolved_threshold.current_intelligence_index_version_model_count_with_output_token_count == int(
        verbosity_frame["verbosity_m_output_tokens"].notna().sum()
    )


def test_custom_multiple_scales_current_median() -> None:
    verbosity_frame = _synthetic_fixture_verbosity_frame()
    current_median = float(verbosity_frame["verbosity_m_output_tokens"].median())
    resolved_threshold = verbosity_report.resolve_output_token_verbosity_threshold(
        verbosity_frame, output_token_limit_multiple_of_current_median=0.5
    )
    assert resolved_threshold.output_token_limit_millions == pytest.approx(current_median * 0.5)
    assert resolved_threshold.output_token_limit_multiple_of_current_median == pytest.approx(0.5)


def test_explicit_output_token_limit_millions_overrides_median_multiple() -> None:
    verbosity_frame = _synthetic_fixture_verbosity_frame()
    resolved_threshold = verbosity_report.resolve_output_token_verbosity_threshold(
        verbosity_frame, output_token_limit_millions=30.0
    )
    assert resolved_threshold.output_token_limit_millions == pytest.approx(30.0)
    assert resolved_threshold.derivation_method == (
        verbosity_report.OUTPUT_TOKEN_VERBOSITY_THRESHOLD_DERIVATION_METHOD_EXPLICIT_OUTPUT_TOKEN_LIMIT_MILLIONS
    )
    assert resolved_threshold.output_token_limit_multiple_of_current_median is None
    # 显式阈值也要报出当期中位数，便于读者判断它在当期分布中的位置
    assert not math.isnan(resolved_threshold.current_intelligence_index_version_median_output_million_tokens)


@pytest.mark.parametrize(
    "keyword_arguments",
    [
        {"output_token_limit_millions": 30.0, "output_token_limit_multiple_of_current_median": 1.0},
        {"output_token_limit_millions": 0.0},
        {"output_token_limit_millions": -1.0},
        {"output_token_limit_millions": math.nan},
        {"output_token_limit_multiple_of_current_median": 0.0},
        {"output_token_limit_multiple_of_current_median": math.inf},
    ],
)
def test_conflicting_or_non_positive_threshold_arguments_are_rejected(keyword_arguments: dict) -> None:
    with pytest.raises(ValueError):
        verbosity_report.resolve_output_token_verbosity_threshold(
            _synthetic_fixture_verbosity_frame(), **keyword_arguments
        )


def test_without_any_current_output_token_count_threshold_is_nan_and_under_limit_table_is_empty() -> None:
    models_dataframe = build_frontier_3d_synthetic_fixture_models_dataframe()
    models_dataframe["output_token_count_value_is_from_current_intelligence_index_version"] = False
    verbosity_frame = verbosity_report.build_model_intelligence_verbosity_dataframe_from_models_dataframe(
        models_dataframe
    )
    resolved_threshold = verbosity_report.resolve_output_token_verbosity_threshold(verbosity_frame)
    assert math.isnan(resolved_threshold.output_token_limit_millions)
    assert "无法" in resolved_threshold.derivation_text()
    under_limit_ranked = verbosity_report.filter_models_under_output_token_limit(
        verbosity_frame, output_token_limit_millions=resolved_threshold.output_token_limit_millions
    )
    assert under_limit_ranked.empty


def test_default_output_paths_do_not_hardcode_30m() -> None:
    for default_path in (
        verbosity_report.DEFAULT_MODELS_UNDER_OUTPUT_TOKEN_VERBOSITY_THRESHOLD_CSV_PATH,
        verbosity_report.DEFAULT_MODELS_UNDER_OUTPUT_TOKEN_VERBOSITY_THRESHOLD_MARKDOWN_TABLE_PATH,
    ):
        assert "30m" not in default_path.name.lower()
        assert "verbosity_threshold" in default_path.name


def test_written_report_and_csv_state_threshold_and_its_derivation(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    monkeypatch.setattr(
        fetch_data,
        "build_dataframe",
        lambda refresh=False, **keyword_arguments: build_frontier_3d_synthetic_fixture_models_dataframe(),
    )
    report_markdown_path = tmp_path / "report.md"
    under_limit_markdown_table_path = tmp_path / "under_limit_table.md"
    under_limit_csv_path = tmp_path / "under_limit_table.csv"

    report_result = verbosity_report.write_model_intelligence_verbosity_report(
        report_markdown_path=report_markdown_path,
        under_output_token_limit_markdown_table_path=under_limit_markdown_table_path,
        under_output_token_limit_csv_path=under_limit_csv_path,
    )

    resolved_threshold = report_result.resolved_output_token_verbosity_threshold
    expected_threshold_text = f"{resolved_threshold.output_token_limit_millions:.1f}M"
    expected_median_text = (
        f"{resolved_threshold.current_intelligence_index_version_median_output_million_tokens:.1f}M"
    )
    for markdown_path in (report_markdown_path, under_limit_markdown_table_path):
        markdown_text = markdown_path.read_text(encoding="utf-8")
        assert expected_threshold_text in markdown_text
        assert expected_median_text in markdown_text
        assert "30M" in markdown_text  # 旧阈值
        assert "21.2M" in markdown_text  # v4.1 中位数
        assert "v4.3.2" in markdown_text
        assert "中位数" in markdown_text
    report_markdown_text = report_markdown_path.read_text(encoding="utf-8")
    assert "阈值沿用 v4.1 时期的设定" not in report_markdown_text

    under_limit_csv_frame = pd.read_csv(under_limit_csv_path)
    assert not under_limit_csv_frame.empty
    assert under_limit_csv_frame["verbosity_threshold_m_output_tokens"].to_numpy() == pytest.approx(
        [resolved_threshold.output_token_limit_millions] * len(under_limit_csv_frame)
    )
    assert set(under_limit_csv_frame["verbosity_threshold_derivation_method"]) == {
        verbosity_report.OUTPUT_TOKEN_VERBOSITY_THRESHOLD_DERIVATION_METHOD_MULTIPLE_OF_CURRENT_INTELLIGENCE_INDEX_VERSION_MEDIAN
    }
    assert (
        under_limit_csv_frame["verbosity_m_output_tokens"]
        < resolved_threshold.output_token_limit_millions
    ).all()
    assert under_limit_csv_frame["verbosity_multiple_of_current_intelligence_index_version_median"].to_numpy() == (
        pytest.approx(
            (
                under_limit_csv_frame["verbosity_m_output_tokens"]
                / resolved_threshold.current_intelligence_index_version_median_output_million_tokens
            ).to_numpy()
        )
    )
    assert report_result.under_output_token_limit_model_count == len(under_limit_csv_frame)


def test_generator_command_line_rejects_both_threshold_arguments_together() -> None:
    completed_process = subprocess.run(
        [
            sys.executable,
            str(REPOSITORY_ROOT / "scripts" / "generate_model_intelligence_verbosity_report.py"),
            "--output-token-limit-millions",
            "30",
            "--output-token-limit-multiple-of-current-median",
            "1.4",
        ],
        capture_output=True,
        text=True,
        cwd=REPOSITORY_ROOT,
        timeout=60,
    )
    assert completed_process.returncode == 2
    assert "not allowed with argument" in completed_process.stderr


def test_generator_command_line_help_lists_median_multiple_argument() -> None:
    completed_process = subprocess.run(
        [
            sys.executable,
            str(REPOSITORY_ROOT / "scripts" / "generate_model_intelligence_verbosity_report.py"),
            "--help",
        ],
        capture_output=True,
        text=True,
        cwd=REPOSITORY_ROOT,
        timeout=60,
    )
    assert completed_process.returncode == 0
    assert "--output-token-limit-multiple-of-current-median" in completed_process.stdout
    assert "--output-token-limit-millions" in completed_process.stdout
