"""冗长度报告（W1-10）：改用 fetch_data 值溯源列里的当期 token 数，不再解析列表页。

- verbosity（百万输出 token）只取「token 值来自当期指数版本」的行（被接受的内嵌目录分区）；
  v4.1 回退快照的 token 与 v4.3 智能分不同口径，不进入排名，只计数说明；
- reasoning 模式取目录 `isReasoning`（`artificial_analysis_is_reasoning_model`），缺失为 unknown；
- 报告写明智能指数版本、API 抓取时间、目录分区与 AA 署名；
- 生成过程不读列表页（models_page.html），不调用 snake_case 解析器。

用 T3 合成 fixture（`build_frontier_3d_synthetic_fixture_models_dataframe`），不读共享目录。
"""
from __future__ import annotations

import math
from pathlib import Path

import pandas as pd
import pytest

from src import fetch_data
from src import model_intelligence_verbosity_report
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import (
    build_frontier_3d_synthetic_fixture_models_dataframe,
)


def _verbosity_row_for_model_name(verbosity_frame: pd.DataFrame, model_name: str) -> pd.Series:
    matching_rows = verbosity_frame[verbosity_frame["model"] == model_name]
    assert len(matching_rows) == 1, model_name
    return matching_rows.iloc[0]


def test_verbosity_uses_only_current_intelligence_index_version_output_token_counts() -> None:
    verbosity_frame = (
        model_intelligence_verbosity_report.build_model_intelligence_verbosity_dataframe_from_models_dataframe(
            build_frontier_3d_synthetic_fixture_models_dataframe()
        )
    )
    current_token_row = _verbosity_row_for_model_name(verbosity_frame, "GPT-6 mini")
    assert current_token_row["verbosity_m_output_tokens"] == pytest.approx(25.0)
    assert (
        current_token_row["verbosity_source"]
        == fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_ACCEPTED_PARTITION
    )
    assert current_token_row["verbosity_intelligence_index_version"] == "4.3.2"
    for historical_token_model_name in ("Claude Legacy 4 (Reasoning)", "Kimi K3"):
        historical_token_row = _verbosity_row_for_model_name(
            verbosity_frame, historical_token_model_name
        )
        assert math.isnan(historical_token_row["verbosity_m_output_tokens"])
        assert historical_token_row["verbosity_source"] == ""
    assert (
        verbosity_frame.attrs["non_current_intelligence_index_version_output_token_count_model_count"]
        == 2
    )
    assert verbosity_frame.attrs["current_intelligence_index_version"] == "4.3.2"


CATALOG_INTELLIGENCE_DISAGREES_WITH_CURRENT_API_INTELLIGENCE_TOKEN_REASON_CODE = (
    "output_token_count_value_catalog_intelligence_disagrees_with_current_api_intelligence"
)
CATALOG_INTELLIGENCE_NOT_COMPARABLE_WITH_CURRENT_API_INTELLIGENCE_TOKEN_REASON_CODE = (
    "output_token_count_value_catalog_intelligence_not_comparable_with_current_api_intelligence"
)


def _synthetic_fixture_models_dataframe_with_catalog_tokens_demoted_per_uuid(
    non_current_reason_code_by_demoted_model_name: dict[str, str],
) -> pd.DataFrame:
    """合成表里把指定模型的目录 token 逐 UUID 降为非当期（R1-01 (a)）：值来源仍是目录、版本仍是 4.3.2。"""
    models_dataframe = build_frontier_3d_synthetic_fixture_models_dataframe()
    models_dataframe["output_token_count_value_non_current_reason_code"] = [
        non_current_reason_code_by_demoted_model_name.get(model_name)
        for model_name in models_dataframe["name"]
    ]
    demoted_model_mask = models_dataframe["name"].isin(
        list(non_current_reason_code_by_demoted_model_name)
    )
    assert int(demoted_model_mask.sum()) == len(non_current_reason_code_by_demoted_model_name)
    assert set(models_dataframe.loc[demoted_model_mask, "output_token_count_value_source"]) == {
        fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_ACCEPTED_PARTITION
    }
    assert set(
        models_dataframe.loc[demoted_model_mask, "output_token_count_value_intelligence_index_version"]
    ) == {"4.3.2"}
    models_dataframe.loc[
        demoted_model_mask, "output_token_count_value_is_from_current_intelligence_index_version"
    ] = False
    return models_dataframe


def _non_current_output_token_count_report_line(verbosity_frame: pd.DataFrame) -> str:
    return next(
        report_line
        for report_line in model_intelligence_verbosity_report._data_source_and_intelligence_index_version_lines(
            verbosity_frame
        )
        if report_line.startswith("- **非当期 token 不参与排名：**")
    )


def test_non_current_output_token_counts_are_counted_and_explained_per_non_current_reason() -> None:
    """RVF-003：目录 token 因智能分与当期 API 不一致（AA 已重评）被逐 UUID 降级时，版本仍是当期 4.3.2，

    不能被说成「只有 v4.3.2 回退快照的 token 数（重定标后 token 规模不同）」；
    v4.1 回退快照（跨版本重定标）与目录逐 UUID 降级（含两种原因码）分别计数、分别说明。"""
    verbosity_frame = model_intelligence_verbosity_report.build_model_intelligence_verbosity_dataframe_from_models_dataframe(
        _synthetic_fixture_models_dataframe_with_catalog_tokens_demoted_per_uuid(
            {
                "GPT-6 (high)": CATALOG_INTELLIGENCE_DISAGREES_WITH_CURRENT_API_INTELLIGENCE_TOKEN_REASON_CODE,
                "Mistral Large 4": CATALOG_INTELLIGENCE_DISAGREES_WITH_CURRENT_API_INTELLIGENCE_TOKEN_REASON_CODE,
                "DeepSeek V5": CATALOG_INTELLIGENCE_NOT_COMPARABLE_WITH_CURRENT_API_INTELLIGENCE_TOKEN_REASON_CODE,
            }
        )
    )
    for demoted_model_name in ("GPT-6 (high)", "Mistral Large 4", "DeepSeek V5"):
        demoted_row = _verbosity_row_for_model_name(verbosity_frame, demoted_model_name)
        assert math.isnan(demoted_row["verbosity_m_output_tokens"])
    assert (
        verbosity_frame.attrs["non_current_intelligence_index_version_output_token_count_model_count"]
        == 5
    )
    assert verbosity_frame.attrs[
        "non_current_output_token_count_model_count_by_non_current_reason_code"
    ] == {
        "output_token_count_value_not_from_current_intelligence_index_version": 2,
        CATALOG_INTELLIGENCE_DISAGREES_WITH_CURRENT_API_INTELLIGENCE_TOKEN_REASON_CODE: 2,
        CATALOG_INTELLIGENCE_NOT_COMPARABLE_WITH_CURRENT_API_INTELLIGENCE_TOKEN_REASON_CODE: 1,
    }

    non_current_report_line = _non_current_output_token_count_report_line(verbosity_frame)
    assert "共 5 个模型" in non_current_report_line
    assert "2 个模型只有 v4.1 回退快照" in non_current_report_line
    assert "v4.3.2 回退快照" not in non_current_report_line
    assert "2 个模型目录智能分与当期 API 不一致，AA 已重评" in non_current_report_line
    assert "1 个模型目录或当期 API 缺智能分，无从核对是否已重评" in non_current_report_line
    assert "v4.3.2 目录 token 逐 UUID 降为非当期" in non_current_report_line


def test_non_current_output_token_count_line_for_only_catalog_tokens_demoted_per_uuid_never_mentions_fallback_snapshot_rescaling() -> None:
    """只有目录逐 UUID 降级、没有回退快照时，整行不得出现「回退快照」「重定标」字样。"""
    models_dataframe = _synthetic_fixture_models_dataframe_with_catalog_tokens_demoted_per_uuid(
        {"GPT-6 (high)": CATALOG_INTELLIGENCE_DISAGREES_WITH_CURRENT_API_INTELLIGENCE_TOKEN_REASON_CODE}
    )
    historical_token_mask = (
        models_dataframe["output_token_count_value_source"]
        == fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT
    )
    models_dataframe = models_dataframe[~historical_token_mask].reset_index(drop=True)
    models_dataframe.attrs = build_frontier_3d_synthetic_fixture_models_dataframe().attrs
    verbosity_frame = model_intelligence_verbosity_report.build_model_intelligence_verbosity_dataframe_from_models_dataframe(
        models_dataframe
    )
    non_current_report_line = _non_current_output_token_count_report_line(verbosity_frame)
    assert "共 1 个模型" in non_current_report_line
    assert "1 个模型目录智能分与当期 API 不一致，AA 已重评" in non_current_report_line
    assert "回退快照" not in non_current_report_line
    assert "重定标" not in non_current_report_line


def test_reasoning_mode_comes_from_embedded_catalog_is_reasoning_flag() -> None:
    verbosity_frame = (
        model_intelligence_verbosity_report.build_model_intelligence_verbosity_dataframe_from_models_dataframe(
            build_frontier_3d_synthetic_fixture_models_dataframe()
        )
    )
    assert _verbosity_row_for_model_name(verbosity_frame, "Qwen4 Max (low)")["mode"] == "reasoning"
    assert _verbosity_row_for_model_name(verbosity_frame, "GPT-6 mini")["mode"] == "non-reasoning"
    assert _verbosity_row_for_model_name(verbosity_frame, "Brand New Model (V-3)")["mode"] == "unknown"


def test_under_limit_ranking_excludes_non_current_token_models() -> None:
    verbosity_frame = (
        model_intelligence_verbosity_report.build_model_intelligence_verbosity_dataframe_from_models_dataframe(
            build_frontier_3d_synthetic_fixture_models_dataframe()
        )
    )
    under_limit_ranked = model_intelligence_verbosity_report.filter_models_under_output_token_limit(
        verbosity_frame, output_token_limit_millions=50.0
    )
    ranked_model_names = list(under_limit_ranked["model"])
    assert "GPT-6 mini" in ranked_model_names
    assert "Claude Legacy 4 (Reasoning)" not in ranked_model_names
    assert "Kimi K3" not in ranked_model_names
    assert "Unscored Model" not in ranked_model_names
    assert list(under_limit_ranked["rank"]) == list(range(1, len(under_limit_ranked) + 1))


def _fail_if_models_list_page_is_read(*positional_arguments, **keyword_arguments):
    raise AssertionError("冗长度报告不应再读取或解析列表页（models_page.html）")


def test_report_generation_reads_models_dataframe_not_list_page_and_states_version_and_sources(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    received_build_dataframe_keyword_arguments: list[dict] = []

    def _build_dataframe_returning_synthetic_fixture(refresh=False, **keyword_arguments):
        received_build_dataframe_keyword_arguments.append(
            {"refresh": refresh, **keyword_arguments}
        )
        return build_frontier_3d_synthetic_fixture_models_dataframe()

    monkeypatch.setattr(fetch_data, "build_dataframe", _build_dataframe_returning_synthetic_fixture)
    monkeypatch.setattr(
        fetch_data, "fetch_artificial_analysis_models_page_html", _fail_if_models_list_page_is_read
    )
    monkeypatch.setattr(fetch_data, "parse_intel_per_m_by_model_id", _fail_if_models_list_page_is_read)

    report_markdown_path = tmp_path / "model_intelligence_verbosity_report.md"
    report_result = model_intelligence_verbosity_report.write_model_intelligence_verbosity_report(
        refresh=False,
        output_token_limit_millions=50.0,
        report_markdown_path=report_markdown_path,
        under_output_token_limit_markdown_table_path=tmp_path / "under_limit_table.md",
        under_output_token_limit_csv_path=tmp_path / "under_limit_table.csv",
    )
    assert received_build_dataframe_keyword_arguments == [
        {"refresh": False, "allow_artificial_analysis_website_page_fetch": False}
    ]
    assert report_result.verbosity_model_count == int(
        (
            build_frontier_3d_synthetic_fixture_models_dataframe()[
                "output_token_count_value_is_from_current_intelligence_index_version"
            ]
        ).sum()
    )
    report_markdown_text = report_markdown_path.read_text(encoding="utf-8")
    assert "v4.3.2" in report_markdown_text
    assert "内嵌模型目录" in report_markdown_text
    assert "2026-09-23T05:50:32Z" in report_markdown_text
    assert "按缓存文件时间推断" in report_markdown_text
    assert "https://artificialanalysis.ai/" in report_markdown_text
    assert "2 个模型只有 v4.1" in report_markdown_text
    assert "intelligence_index_per_m_output_tokens" not in report_markdown_text
    assert "https://artificialanalysis.ai/models" not in report_markdown_text
    under_limit_csv_frame = pd.read_csv(tmp_path / "under_limit_table.csv")
    assert "verbosity_intelligence_index_version" in under_limit_csv_frame.columns
    assert "Claude Legacy 4 (Reasoning)" not in set(under_limit_csv_frame["model"])
