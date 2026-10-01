"""生成 AA 智能指数 × 冗长度（verbosity）排名报告。

数据来源（W1-10 起）：复用 `fetch_data.build_dataframe` 的模型表与值溯源列——
- 智能分：AA API `evaluations.artificial_analysis_intelligence_index`（当期指数版本）；
- 冗长度：`intelligence_index_canonical_output_token_count / 1e6`，即跑完整套智能指数的输出 token 数
  （百万）。**只取 token 值来自当期指数版本的行**（被接受的内嵌模型目录分区）；v4.1 回退快照的
  token 与当期智能分不是同一口径（v4.3.2 中位数约 87M，v4.1 约 21M），不进入排名，只计数说明；
  目录 token 因该模型智能分与当期 API 不一致（AA 已重评）被逐 UUID 降为非当期的，同样不进入排名，
  按非当期原因单独计数说明（它们版本仍是当期，不是跨版本重定标）；
- reasoning 模式：内嵌模型目录的 `isReasoning`（`artificial_analysis_is_reasoning_model`）；
- 冗长度阈值（2026-10-02 起）缺省跟随当期指数版本的 token 中位数：
  阈值 = （v4.1 时期旧阈值 30M ÷ v4.1 快照中位数 21.236883M）× 当期中位数，
  `output_token_limit_millions` 可显式覆盖。
不再读取或解析列表页（models_page.html）：AA 已把其 payload 改为 camelCase，旧的 snake_case
正则 0 命中。本模块只负责表格型分析报告，不参与三维 Pareto 前沿计算。
"""
from __future__ import annotations

import math
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

import pandas as pd

from . import fetch_data, frontier


ROOT = Path(__file__).resolve().parent.parent
DEFAULT_REPORT_PATH = ROOT / "output" / "model_intelligence_verbosity_report.md"
# 文件名不带阈值数值：阈值随当期中位数变化，具体值写在表头与 CSV 列里
DEFAULT_MODELS_UNDER_OUTPUT_TOKEN_VERBOSITY_THRESHOLD_CSV_PATH = (
    ROOT
    / "data"
    / "processed"
    / "models_under_output_token_verbosity_threshold_ranked_by_intelligence.csv"
)
DEFAULT_MODELS_UNDER_OUTPUT_TOKEN_VERBOSITY_THRESHOLD_MARKDOWN_TABLE_PATH = (
    ROOT
    / "data"
    / "processed"
    / "models_under_output_token_verbosity_threshold_ranked_by_intelligence.md"
)

# 阈值跟随当期中位数（用户 2026-10-02 拍板）：指数重定标后 token 规模整体变大（v4.1 快照中位数
# 21.236883M → v4.3.2 目录中位数约 87M），固定 30M 会让阈值在分布中的相对位置漂移。
# 倍数 = v4.1 时期旧阈值 ÷ v4.1 中位数，让阈值保持「约 1.41 倍中位数」的相对位置。
REFERENCE_OUTPUT_TOKEN_LIMIT_MILLIONS_USED_IN_INTELLIGENCE_INDEX_V4_1_ERA = 30.0
# 取值：data/reference/ 下 v4.1 回退快照（2026-07-01 采集）377 个模型输出 token 数的中位数
REFERENCE_MEDIAN_OUTPUT_MILLION_TOKENS_OF_INTELLIGENCE_INDEX_V4_1_FALLBACK_SNAPSHOT = 21.236883
# EXPERIMENT_NODE: 阈值取「旧阈值÷旧中位数」倍的当期中位数；是否改为固定分位数（如 P40），或按 reasoning/non-reasoning 分别取中位数
DEFAULT_OUTPUT_TOKEN_LIMIT_MULTIPLE_OF_CURRENT_INTELLIGENCE_INDEX_VERSION_MEDIAN = (
    REFERENCE_OUTPUT_TOKEN_LIMIT_MILLIONS_USED_IN_INTELLIGENCE_INDEX_V4_1_ERA
    / REFERENCE_MEDIAN_OUTPUT_MILLION_TOKENS_OF_INTELLIGENCE_INDEX_V4_1_FALLBACK_SNAPSHOT
)
OUTPUT_TOKEN_VERBOSITY_THRESHOLD_DERIVATION_METHOD_MULTIPLE_OF_CURRENT_INTELLIGENCE_INDEX_VERSION_MEDIAN = (
    "multiple_of_current_intelligence_index_version_median"
)
OUTPUT_TOKEN_VERBOSITY_THRESHOLD_DERIVATION_METHOD_EXPLICIT_OUTPUT_TOKEN_LIMIT_MILLIONS = (
    "explicit_output_token_limit_millions"
)

# 非当期 token 行按「为何不是当期」归类计数（RVF-003）：逐行原因列非空时用它（目录 token 被逐 UUID
# 降级，版本仍是当期），否则归为通用的「值版本不是当期版本」（v4.1 回退快照等跨版本重定标）
NON_CURRENT_OUTPUT_TOKEN_COUNT_REASON_CODE_VALUE_NOT_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION = (
    frontier.ANALYSIS_INELIGIBILITY_REASON_CODE_OUTPUT_TOKEN_COUNT_VALUE_NOT_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION
)

VERBOSITY_MODE_REASONING = "reasoning"
VERBOSITY_MODE_NON_REASONING = "non-reasoning"
VERBOSITY_MODE_UNKNOWN = "unknown"


@dataclass(frozen=True)
class ModelIntelligenceVerbosityReportPaths:
    """一次报告生成写出的全部本地产物路径。"""

    report_markdown_path: Path
    under_output_token_limit_markdown_table_path: Path
    under_output_token_limit_csv_path: Path


@dataclass(frozen=True)
class ResolvedOutputTokenVerbosityThreshold:
    """本次报告实际使用的冗长度阈值及其来历（写进报告与 CSV）。

    当期没有任何带当期 token 数的模型时，按中位数推导的阈值为 NaN（阈值内表格为空）。
    """

    output_token_limit_millions: float
    derivation_method: str
    output_token_limit_multiple_of_current_median: float | None
    current_intelligence_index_version_median_output_million_tokens: float
    current_intelligence_index_version_model_count_with_output_token_count: int
    current_intelligence_index_version: str | None

    def derivation_text(self) -> str:
        version_label = _intelligence_index_version_label(self.current_intelligence_index_version)
        current_median = self.current_intelligence_index_version_median_output_million_tokens
        current_median_text = (
            f"当期（{version_label}）{self.current_intelligence_index_version_model_count_with_output_token_count} "
            f"个模型的输出 token 中位数 {_format_number(current_median)}M"
            if not math.isnan(current_median)
            else f"当期（{version_label}）没有带当期 token 数的模型"
        )
        if (
            self.derivation_method
            == OUTPUT_TOKEN_VERBOSITY_THRESHOLD_DERIVATION_METHOD_EXPLICIT_OUTPUT_TOKEN_LIMIT_MILLIONS
        ):
            relative_position_text = (
                f"，约为中位数的 {self.output_token_limit_millions / current_median:.2f} 倍"
                if not math.isnan(current_median)
                else "，无法给出它在当期分布中的位置"
            )
            return (
                f"阈值 {_format_number(self.output_token_limit_millions)}M 由 "
                f"`--output-token-limit-millions` 显式指定（{current_median_text}{relative_position_text}）。"
                f"缺省规则是按 v4.1 时期旧阈值 "
                f"{REFERENCE_OUTPUT_TOKEN_LIMIT_MILLIONS_USED_IN_INTELLIGENCE_INDEX_V4_1_ERA:g}M ÷ "
                "v4.1 快照中位数 "
                f"{_format_number(REFERENCE_MEDIAN_OUTPUT_MILLION_TOKENS_OF_INTELLIGENCE_INDEX_V4_1_FALLBACK_SNAPSHOT)}M "
                "的倍数跟随当期中位数。"
            )
        multiple = self.output_token_limit_multiple_of_current_median
        multiple_origin_text = (
            f"倍数 {multiple:.3f} = v4.1 时期旧阈值 "
            f"{REFERENCE_OUTPUT_TOKEN_LIMIT_MILLIONS_USED_IN_INTELLIGENCE_INDEX_V4_1_ERA:g}M ÷ "
            "v4.1 快照 377 个模型的输出 token 中位数 "
            f"{_format_number(REFERENCE_MEDIAN_OUTPUT_MILLION_TOKENS_OF_INTELLIGENCE_INDEX_V4_1_FALLBACK_SNAPSHOT)}M，"
            "让阈值在指数重定标后保持相对位置"
            if multiple is not None
            and math.isclose(
                multiple, DEFAULT_OUTPUT_TOKEN_LIMIT_MULTIPLE_OF_CURRENT_INTELLIGENCE_INDEX_VERSION_MEDIAN
            )
            else (
                f"倍数 {multiple:.3f} 由 `--output-token-limit-multiple-of-current-median` 指定"
                f"（缺省倍数是 v4.1 时期旧阈值 "
                f"{REFERENCE_OUTPUT_TOKEN_LIMIT_MILLIONS_USED_IN_INTELLIGENCE_INDEX_V4_1_ERA:g}M ÷ "
                "v4.1 快照中位数 "
                f"{_format_number(REFERENCE_MEDIAN_OUTPUT_MILLION_TOKENS_OF_INTELLIGENCE_INDEX_V4_1_FALLBACK_SNAPSHOT)}M）"
            )
        )
        if math.isnan(self.output_token_limit_millions):
            return (
                f"当期（{version_label}）没有任何模型带当期指数版本的输出 token 数，无法按中位数计算阈值，"
                f"阈值内表格为空（{multiple_origin_text}）。"
            )
        return (
            f"阈值 {_format_number(self.output_token_limit_millions)}M = {multiple:.3f} × "
            f"{current_median_text}；{multiple_origin_text}。"
        )


@dataclass(frozen=True)
class ModelIntelligenceVerbosityReportResult:
    """报告生成结果与关键计数。"""

    paths: ModelIntelligenceVerbosityReportPaths
    api_model_count: int
    reasoning_flag_count: int
    verbosity_model_count: int
    under_output_token_limit_model_count: int
    under_output_token_limit_reasoning_model_count: int
    under_output_token_limit_non_reasoning_model_count: int
    resolved_output_token_verbosity_threshold: ResolvedOutputTokenVerbosityThreshold
    current_intelligence_index_version: str | None = None
    non_current_intelligence_index_version_output_token_count_model_count: int = 0


def _optional_text(raw_value: object) -> str | None:
    if raw_value is None:
        return None
    if isinstance(raw_value, float) and math.isnan(raw_value):
        return None
    return str(raw_value)


def _release_date_text(raw_release_date: object) -> str:
    if raw_release_date is None or pd.isna(raw_release_date):
        return ""
    return pd.Timestamp(raw_release_date).strftime("%Y-%m-%d")


def _verbosity_mode_from_is_reasoning_flag(is_reasoning_flag: object) -> str:
    if is_reasoning_flag is True:
        return VERBOSITY_MODE_REASONING
    if is_reasoning_flag is False:
        return VERBOSITY_MODE_NON_REASONING
    return VERBOSITY_MODE_UNKNOWN


def _non_current_output_token_count_reason_code_for_model_row(model_row: dict) -> str:
    """非当期 token 行为何不是当期：逐行原因列（目录 token 逐 UUID 降级）优先，否则为版本不是当期。"""
    specific_non_current_reason_code = model_row.get(
        frontier.OUTPUT_TOKEN_COUNT_VALUE_NON_CURRENT_REASON_CODE_COLUMN_NAME
    )
    if isinstance(specific_non_current_reason_code, str) and specific_non_current_reason_code:
        return specific_non_current_reason_code
    return NON_CURRENT_OUTPUT_TOKEN_COUNT_REASON_CODE_VALUE_NOT_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION


def build_model_intelligence_verbosity_dataframe_from_models_dataframe(
    models_dataframe: pd.DataFrame,
) -> pd.DataFrame:
    """由 `fetch_data.build_dataframe` 的模型表构造冗长度报告表（纯函数，便于测试）。

    verbosity 只取当期指数版本的 token 数；非当期 token 的行 verbosity 为 NaN、来源为空串，
    总数计入 attrs 的 `non_current_intelligence_index_version_output_token_count_model_count`，
    并按非当期原因（v4.1 回退快照 / 目录 token 逐 UUID 降级）分别计入
    `non_current_output_token_count_model_count_by_non_current_reason_code` 与
    `non_current_output_token_count_intelligence_index_versions_by_non_current_reason_code`。
    """
    artificial_analysis_data_provenance = dict(
        models_dataframe.attrs.get(
            fetch_data.MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE, {}
        )
    )
    verbosity_rows: list[dict] = []
    non_current_output_token_count_versions: set[str] = set()
    non_current_output_token_count_model_count = 0
    non_current_output_token_count_model_count_by_non_current_reason_code: dict[str, int] = {}
    non_current_output_token_count_versions_by_non_current_reason_code: dict[str, set[str]] = {}
    for model_row in models_dataframe.to_dict("records"):
        output_token_count = model_row.get("intelligence_index_canonical_output_token_count")
        has_output_token_count = output_token_count is not None and not pd.isna(output_token_count)
        output_token_count_is_current = bool(
            model_row.get("output_token_count_value_is_from_current_intelligence_index_version")
        )
        output_token_count_version = _optional_text(
            model_row.get("output_token_count_value_intelligence_index_version")
        )
        if has_output_token_count and output_token_count_is_current:
            verbosity_m_output_tokens = float(output_token_count) / 1e6
            verbosity_source = _optional_text(model_row.get("output_token_count_value_source")) or ""
            verbosity_intelligence_index_version = output_token_count_version or ""
            verbosity_value_fetched_at_utc = (
                _optional_text(model_row.get("output_token_count_value_fetched_at_utc")) or ""
            )
        else:
            verbosity_m_output_tokens = math.nan
            verbosity_source = ""
            verbosity_intelligence_index_version = ""
            verbosity_value_fetched_at_utc = ""
            if has_output_token_count:
                non_current_output_token_count_model_count += 1
                non_current_output_token_count_versions.add(output_token_count_version or "未知版本")
                non_current_reason_code = _non_current_output_token_count_reason_code_for_model_row(
                    model_row
                )
                non_current_output_token_count_model_count_by_non_current_reason_code[
                    non_current_reason_code
                ] = (
                    non_current_output_token_count_model_count_by_non_current_reason_code.get(
                        non_current_reason_code, 0
                    )
                    + 1
                )
                non_current_output_token_count_versions_by_non_current_reason_code.setdefault(
                    non_current_reason_code, set()
                ).add(output_token_count_version or "未知版本")
        intelligence_index = model_row.get("intelligence")
        verbosity_rows.append(
            {
                "model_id": model_row.get("id"),
                "slug": model_row.get("slug"),
                "model": model_row.get("name"),
                "creator": model_row.get("creator"),
                "mode": _verbosity_mode_from_is_reasoning_flag(
                    model_row.get("artificial_analysis_is_reasoning_model")
                ),
                "release_date": _release_date_text(model_row.get("release_date")),
                "aa_intelligence_index": (
                    float(intelligence_index)
                    if intelligence_index is not None and not pd.isna(intelligence_index)
                    else math.nan
                ),
                "verbosity_m_output_tokens": verbosity_m_output_tokens,
                "verbosity_source": verbosity_source,
                "verbosity_intelligence_index_version": verbosity_intelligence_index_version,
                "verbosity_value_fetched_at_utc": verbosity_value_fetched_at_utc,
            }
        )

    frame = pd.DataFrame(verbosity_rows)
    frame.attrs["api_model_count"] = len(models_dataframe)
    frame.attrs["reasoning_flag_count"] = int(
        frame["mode"].isin([VERBOSITY_MODE_REASONING, VERBOSITY_MODE_NON_REASONING]).sum()
    )
    frame.attrs["current_intelligence_index_version"] = artificial_analysis_data_provenance.get(
        "current_intelligence_index_version"
    )
    frame.attrs["artificial_analysis_data_provenance"] = artificial_analysis_data_provenance
    frame.attrs["embedded_model_catalog_load_summary"] = dict(
        models_dataframe.attrs.get(
            fetch_data.MODELS_DATAFRAME_ATTRS_KEY_EMBEDDED_MODEL_CATALOG_LOAD_SUMMARY, {}
        )
    )
    frame.attrs["non_current_intelligence_index_version_output_token_count_model_count"] = (
        non_current_output_token_count_model_count
    )
    frame.attrs["non_current_intelligence_index_version_output_token_count_versions"] = sorted(
        non_current_output_token_count_versions
    )
    frame.attrs["non_current_output_token_count_model_count_by_non_current_reason_code"] = (
        non_current_output_token_count_model_count_by_non_current_reason_code
    )
    frame.attrs["non_current_output_token_count_intelligence_index_versions_by_non_current_reason_code"] = {
        non_current_reason_code: sorted(version_texts)
        for non_current_reason_code, version_texts in (
            non_current_output_token_count_versions_by_non_current_reason_code.items()
        )
    }
    return frame


def build_model_intelligence_verbosity_dataframe(
    refresh: bool = False,
    *,
    allow_artificial_analysis_website_page_fetch: bool = False,
) -> pd.DataFrame:
    """取 AA 模型表（默认暂停网页抓取，只读已有目录缓存；`refresh` 只刷新 API）并构造报告表。"""
    models_dataframe = fetch_data.build_dataframe(
        refresh=refresh,
        allow_artificial_analysis_website_page_fetch=allow_artificial_analysis_website_page_fetch,
    )
    return build_model_intelligence_verbosity_dataframe_from_models_dataframe(models_dataframe)


def _positive_finite_number_or_raise(argument_name: str, argument_value: float) -> float:
    numeric_value = float(argument_value)
    if not math.isfinite(numeric_value) or numeric_value <= 0:
        raise ValueError(f"{argument_name} 必须是有限正数，收到 {argument_value!r}")
    return numeric_value


def resolve_output_token_verbosity_threshold(
    frame: pd.DataFrame,
    *,
    output_token_limit_millions: float | None = None,
    output_token_limit_multiple_of_current_median: float | None = None,
) -> ResolvedOutputTokenVerbosityThreshold:
    """确定冗长度阈值（百万输出 token）。

    - 显式 `output_token_limit_millions` 优先；
    - 否则 = 倍数（缺省 `DEFAULT_OUTPUT_TOKEN_LIMIT_MULTIPLE_OF_CURRENT_INTELLIGENCE_INDEX_VERSION_MEDIAN`）
      × 当期指数版本 token 中位数（只取 `verbosity_m_output_tokens` 非空的行，即当期 token）；
    - 两者同时给出、或非有限正数时报 ValueError。
    """
    if output_token_limit_millions is not None and output_token_limit_multiple_of_current_median is not None:
        raise ValueError(
            "output_token_limit_millions 与 output_token_limit_multiple_of_current_median 只能给一个"
        )
    current_output_million_tokens = frame["verbosity_m_output_tokens"].dropna()
    current_median_output_million_tokens = (
        float(current_output_million_tokens.median()) if len(current_output_million_tokens) else math.nan
    )
    common_fields = {
        "current_intelligence_index_version_median_output_million_tokens": current_median_output_million_tokens,
        "current_intelligence_index_version_model_count_with_output_token_count": len(
            current_output_million_tokens
        ),
        "current_intelligence_index_version": frame.attrs.get("current_intelligence_index_version"),
    }
    if output_token_limit_millions is not None:
        return ResolvedOutputTokenVerbosityThreshold(
            output_token_limit_millions=_positive_finite_number_or_raise(
                "output_token_limit_millions", output_token_limit_millions
            ),
            derivation_method=OUTPUT_TOKEN_VERBOSITY_THRESHOLD_DERIVATION_METHOD_EXPLICIT_OUTPUT_TOKEN_LIMIT_MILLIONS,
            output_token_limit_multiple_of_current_median=None,
            **common_fields,
        )
    multiple = _positive_finite_number_or_raise(
        "output_token_limit_multiple_of_current_median",
        (
            output_token_limit_multiple_of_current_median
            if output_token_limit_multiple_of_current_median is not None
            else DEFAULT_OUTPUT_TOKEN_LIMIT_MULTIPLE_OF_CURRENT_INTELLIGENCE_INDEX_VERSION_MEDIAN
        ),
    )
    return ResolvedOutputTokenVerbosityThreshold(
        output_token_limit_millions=multiple * current_median_output_million_tokens,
        derivation_method=OUTPUT_TOKEN_VERBOSITY_THRESHOLD_DERIVATION_METHOD_MULTIPLE_OF_CURRENT_INTELLIGENCE_INDEX_VERSION_MEDIAN,
        output_token_limit_multiple_of_current_median=multiple,
        **common_fields,
    )


def filter_models_under_output_token_limit(
    frame: pd.DataFrame,
    output_token_limit_millions: float,
) -> pd.DataFrame:
    """筛出当期冗长度低于给定百万输出 token 阈值的模型，并按智能降序排序（阈值为 NaN 时为空）。"""
    filtered = frame[
        frame["aa_intelligence_index"].notna()
        & frame["verbosity_m_output_tokens"].notna()
        & (frame["verbosity_m_output_tokens"] < output_token_limit_millions)
    ].copy()
    return _rank_by_intelligence(filtered)


def filter_non_reasoning_models_ranked_by_intelligence(frame: pd.DataFrame) -> pd.DataFrame:
    """筛出 non-reasoning 模型，并按智能降序排序。"""
    filtered = frame[
        (frame["mode"] == VERBOSITY_MODE_NON_REASONING) & frame["aa_intelligence_index"].notna()
    ].copy()
    return _rank_by_intelligence(filtered)


def write_model_intelligence_verbosity_report(
    refresh: bool = False,
    output_token_limit_millions: float | None = None,
    report_markdown_path: Path = DEFAULT_REPORT_PATH,
    under_output_token_limit_markdown_table_path: Path = (
        DEFAULT_MODELS_UNDER_OUTPUT_TOKEN_VERBOSITY_THRESHOLD_MARKDOWN_TABLE_PATH
    ),
    under_output_token_limit_csv_path: Path = DEFAULT_MODELS_UNDER_OUTPUT_TOKEN_VERBOSITY_THRESHOLD_CSV_PATH,
    *,
    output_token_limit_multiple_of_current_median: float | None = None,
    allow_artificial_analysis_website_page_fetch: bool = False,
) -> ModelIntelligenceVerbosityReportResult:
    """生成 Markdown 报告、完整 Markdown 表和 CSV 明细。

    阈值缺省跟随当期中位数（见 `resolve_output_token_verbosity_threshold`）；
    `output_token_limit_millions` 显式覆盖，与 `output_token_limit_multiple_of_current_median` 互斥。
    """
    frame = build_model_intelligence_verbosity_dataframe(
        refresh=refresh,
        allow_artificial_analysis_website_page_fetch=allow_artificial_analysis_website_page_fetch,
    )
    resolved_threshold = resolve_output_token_verbosity_threshold(
        frame,
        output_token_limit_millions=output_token_limit_millions,
        output_token_limit_multiple_of_current_median=output_token_limit_multiple_of_current_median,
    )
    under_limit_ranked = filter_models_under_output_token_limit(
        frame, output_token_limit_millions=resolved_threshold.output_token_limit_millions
    )
    non_reasoning_ranked = filter_non_reasoning_models_ranked_by_intelligence(frame)

    under_output_token_limit_markdown_table_path.parent.mkdir(parents=True, exist_ok=True)
    under_output_token_limit_csv_path.parent.mkdir(parents=True, exist_ok=True)
    report_markdown_path.parent.mkdir(parents=True, exist_ok=True)

    _write_dataframe_csv(under_limit_ranked, resolved_threshold, under_output_token_limit_csv_path)
    _write_under_limit_markdown_table(
        under_limit_ranked,
        resolved_threshold=resolved_threshold,
        path=under_output_token_limit_markdown_table_path,
    )
    _write_report_markdown(
        frame=frame,
        under_limit_ranked=under_limit_ranked,
        non_reasoning_ranked=non_reasoning_ranked,
        resolved_threshold=resolved_threshold,
        path=report_markdown_path,
    )

    return ModelIntelligenceVerbosityReportResult(
        paths=ModelIntelligenceVerbosityReportPaths(
            report_markdown_path=report_markdown_path,
            under_output_token_limit_markdown_table_path=under_output_token_limit_markdown_table_path,
            under_output_token_limit_csv_path=under_output_token_limit_csv_path,
        ),
        api_model_count=int(frame.attrs["api_model_count"]),
        reasoning_flag_count=int(frame.attrs["reasoning_flag_count"]),
        verbosity_model_count=int(frame["verbosity_m_output_tokens"].notna().sum()),
        under_output_token_limit_model_count=len(under_limit_ranked),
        under_output_token_limit_reasoning_model_count=int(
            (under_limit_ranked["mode"] == VERBOSITY_MODE_REASONING).sum()
        ),
        under_output_token_limit_non_reasoning_model_count=int(
            (under_limit_ranked["mode"] == VERBOSITY_MODE_NON_REASONING).sum()
        ),
        resolved_output_token_verbosity_threshold=resolved_threshold,
        current_intelligence_index_version=frame.attrs["current_intelligence_index_version"],
        non_current_intelligence_index_version_output_token_count_model_count=int(
            frame.attrs["non_current_intelligence_index_version_output_token_count_model_count"]
        ),
    )


def _rank_by_intelligence(frame: pd.DataFrame) -> pd.DataFrame:
    ranked = frame.sort_values(
        ["aa_intelligence_index", "release_date", "model"],
        ascending=[False, False, False],
    ).reset_index(drop=True)
    ranked.insert(0, "rank", range(1, len(ranked) + 1))
    return ranked


def _write_dataframe_csv(
    frame: pd.DataFrame,
    resolved_threshold: ResolvedOutputTokenVerbosityThreshold,
    path: Path,
) -> None:
    # 阈值与换算方式逐行写入，CSV 脱离报告单独流转时也能读出筛选口径
    frame = frame.assign(
        verbosity_multiple_of_current_intelligence_index_version_median=(
            frame["verbosity_m_output_tokens"]
            / resolved_threshold.current_intelligence_index_version_median_output_million_tokens
        ),
        verbosity_threshold_m_output_tokens=resolved_threshold.output_token_limit_millions,
        verbosity_threshold_derivation_method=resolved_threshold.derivation_method,
        current_intelligence_index_version_median_m_output_tokens=(
            resolved_threshold.current_intelligence_index_version_median_output_million_tokens
        ),
    )
    output_columns = [
        "rank",
        "model",
        "creator",
        "mode",
        "aa_intelligence_index",
        "verbosity_m_output_tokens",
        "verbosity_multiple_of_current_intelligence_index_version_median",
        "release_date",
        "slug",
        "verbosity_source",
        "verbosity_intelligence_index_version",
        "verbosity_value_fetched_at_utc",
        "verbosity_threshold_m_output_tokens",
        "verbosity_threshold_derivation_method",
        "current_intelligence_index_version_median_m_output_tokens",
        "model_id",
    ]
    frame.loc[:, output_columns].to_csv(path, index=False)


def _intelligence_index_version_label(intelligence_index_version: object) -> str:
    return f"v{intelligence_index_version}" if intelligence_index_version else "版本未知"


def _write_under_limit_markdown_table(
    frame: pd.DataFrame,
    resolved_threshold: ResolvedOutputTokenVerbosityThreshold,
    path: Path,
) -> None:
    output_token_limit_text = _format_number(resolved_threshold.output_token_limit_millions)
    current_intelligence_index_version = resolved_threshold.current_intelligence_index_version
    lines = [
        f"# 冗长度低于 {output_token_limit_text}M 输出 token 的模型（按 AA 智能指数排序）",
        "",
        resolved_threshold.derivation_text(),
        "",
        (
            f"筛选条件：`verbosity_m_output_tokens < {output_token_limit_text}`，其中 "
            "`verbosity_m_output_tokens = intelligence_index_canonical_output_token_count / 1e6`"
            "（跑完整套智能指数的输出 token 数，取自被接受的内嵌模型目录分区，指数版本 "
            f"{_intelligence_index_version_label(current_intelligence_index_version)}）。"
            "只含 token 值属于当期指数版本的模型；reasoning 与 non-reasoning 都包含。"
        ),
        "",
    ]
    lines.extend(
        _markdown_table_lines(
            frame,
            columns=[
                ("rank", "#"),
                ("model", "模型"),
                ("creator", "厂商"),
                ("mode", "模式"),
                ("aa_intelligence_index", "AA 智能指数"),
                ("verbosity_m_output_tokens", "冗长度（百万输出 token）"),
                ("release_date", "发布日期"),
            ],
        )
    )
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def _non_current_output_token_count_versions_text(version_texts: list[str]) -> str:
    return "/".join(
        _intelligence_index_version_label(version_text) if version_text != "未知版本" else version_text
        for version_text in version_texts
    )


def _non_current_output_token_count_explanation_line(frame: pd.DataFrame) -> str:
    """「非当期 token 不参与排名」一行：按非当期原因分别计数、分别说明（RVF-003）。

    v4.1 回退快照是跨版本重定标、token 规模不同；目录 token 被逐 UUID 降级时版本仍是当期，
    原因是该模型智能分与当期 API 不一致（AA 已重评）或无从核对，不能说成「回退快照、重定标」。
    """
    non_current_model_count = int(
        frame.attrs.get("non_current_intelligence_index_version_output_token_count_model_count", 0)
    )
    if not non_current_model_count:
        return "- **非当期 token 不参与排名：** 本次没有只带非当期 token 数的模型。"
    # 没有分原因计数的旧表：全部按「值版本不是当期」说明（与 RVF-003 之前一致）
    model_count_by_non_current_reason_code = frame.attrs.get(
        "non_current_output_token_count_model_count_by_non_current_reason_code",
        {
            NON_CURRENT_OUTPUT_TOKEN_COUNT_REASON_CODE_VALUE_NOT_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION: (
                non_current_model_count
            )
        },
    )
    versions_by_non_current_reason_code = frame.attrs.get(
        "non_current_output_token_count_intelligence_index_versions_by_non_current_reason_code",
        {
            NON_CURRENT_OUTPUT_TOKEN_COUNT_REASON_CODE_VALUE_NOT_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION: (
                frame.attrs.get("non_current_intelligence_index_version_output_token_count_versions", [])
            )
        },
    )
    # 固定顺序：跨版本回退在前，目录逐 UUID 降级的已知原因其次，未知原因码最后
    ordered_non_current_reason_codes = [
        NON_CURRENT_OUTPUT_TOKEN_COUNT_REASON_CODE_VALUE_NOT_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION,
        *frontier.OUTPUT_TOKEN_COUNT_CATALOG_DEMOTION_EXPLANATION_TEXT_BY_REASON_CODE,
    ]
    ordered_non_current_reason_codes += sorted(
        set(model_count_by_non_current_reason_code) - set(ordered_non_current_reason_codes)
    )
    non_current_reason_fragments = []
    for non_current_reason_code in ordered_non_current_reason_codes:
        reason_model_count = model_count_by_non_current_reason_code.get(non_current_reason_code, 0)
        if not reason_model_count:
            continue
        reason_versions_text = _non_current_output_token_count_versions_text(
            versions_by_non_current_reason_code.get(non_current_reason_code, [])
        )
        catalog_demotion_explanation_text = (
            frontier.OUTPUT_TOKEN_COUNT_CATALOG_DEMOTION_EXPLANATION_TEXT_BY_REASON_CODE.get(
                non_current_reason_code
            )
        )
        if (
            non_current_reason_code
            == NON_CURRENT_OUTPUT_TOKEN_COUNT_REASON_CODE_VALUE_NOT_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION
        ):
            non_current_reason_fragments.append(
                f"{reason_model_count} 个模型只有 {reason_versions_text or '非当期'} 回退快照的 token 数，"
                "与当期智能分不是同一口径（跨版本重定标后 token 规模不同）"
            )
        elif catalog_demotion_explanation_text is not None:
            non_current_reason_fragments.append(
                f"{reason_model_count} 个模型{catalog_demotion_explanation_text}"
                f"（{reason_versions_text or '版本未知'} 目录 token 逐 UUID 降为非当期）"
            )
        else:
            non_current_reason_fragments.append(
                f"{reason_model_count} 个模型的 token 因 `{non_current_reason_code}` 降为非当期"
                f"（{reason_versions_text or '版本未知'}）"
            )
    return (
        f"- **非当期 token 不参与排名：** 共 {non_current_model_count} 个模型的 token 数不是当期口径，"
        "本报告不使用：" + "；".join(non_current_reason_fragments) + "。"
    )


def _data_source_and_intelligence_index_version_lines(frame: pd.DataFrame) -> list[str]:
    """「数据来源与指数版本」一节：版本、抓取时间、目录分区、token 来源与非当期计数、署名。"""
    provenance = frame.attrs.get("artificial_analysis_data_provenance") or {}
    catalog_load_summary = frame.attrs.get("embedded_model_catalog_load_summary") or {}
    current_intelligence_index_version = frame.attrs.get("current_intelligence_index_version")
    current_version_source_text = {
        fetch_data.CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_ARTIFICIAL_ANALYSIS_API_RESPONSE: (
            "取自 API 响应顶层 intelligence_index_version"
        ),
        fetch_data.CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_ARTIFICIAL_ANALYSIS_API_RESPONSE_FAMILY_REFINED_BY_ACCEPTED_EMBEDDED_MODEL_CATALOG_PARTITION: (
            "API 响应的 family，按被接受的目录分区细化到补丁号"
        ),
        fetch_data.CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_INFERRED_FROM_ACCEPTED_EMBEDDED_MODEL_CATALOG_PARTITION: (
            "API 缓存缺少版本字段，按被接受的目录分区版本推定"
        ),
    }.get(provenance.get("current_intelligence_index_version_source"), "来源未记录")
    api_fetched_at_utc = provenance.get("artificial_analysis_api_response_fetched_at_utc")
    api_fetched_at_text = (
        f"{api_fetched_at_utc}"
        + (
            "（按缓存文件时间推断）"
            if provenance.get("artificial_analysis_api_response_fetched_at_utc_source")
            == fetch_data.API_RESPONSE_FETCHED_AT_UTC_SOURCE_INFERRED_FROM_CACHE_FILE_MODIFICATION_TIME
            else ""
        )
        if api_fetched_at_utc
        else "抓取时间未知"
    )
    catalog_version = provenance.get(
        "embedded_model_catalog_intelligence_index_version"
    ) or catalog_load_summary.get("accepted_partition_intelligence_index_version")
    catalog_captured_at_utc = provenance.get(
        "embedded_model_catalog_captured_at_utc"
    ) or catalog_load_summary.get("accepted_partition_captured_at_utc")
    current_verbosity_model_count = int(frame["verbosity_m_output_tokens"].notna().sum())
    current_verbosity_median = frame["verbosity_m_output_tokens"].median()
    website_page_fetch_paused = provenance.get("artificial_analysis_website_page_fetch_paused")
    attribution_url = provenance.get(
        "artificial_analysis_attribution_url", fetch_data.ARTIFICIAL_ANALYSIS_ATTRIBUTION_URL
    )
    lines = [
        (
            f"- **智能指数版本：** {_intelligence_index_version_label(current_intelligence_index_version)}"
            f"（{current_version_source_text}）。"
        ),
        (
            "- **智能分：** AA API `evaluations.artificial_analysis_intelligence_index`；"
            f"API 响应抓取时间 {api_fetched_at_text}；端点 "
            f"`{provenance.get('artificial_analysis_api_source_url') or fetch_data.API_LANGUAGE_MODELS_FREE_URL}`。"
        ),
        (
            "- **冗长度：** AA 模型详情页内嵌模型目录的 `canonicalIntelligenceIndexTokenCount.output`"
            f"（被接受的目录分区：{_intelligence_index_version_label(catalog_version)}，"
            f"缓存截至 {catalog_captured_at_utc or '未知'}）；"
            f"{current_verbosity_model_count} 个模型有当期值"
            + (
                f"，中位数 {_format_number(current_verbosity_median)}M。"
                if current_verbosity_model_count
                else "。"
            )
        ),
        _non_current_output_token_count_explanation_line(frame),
        (
            "- **reasoning 模式：** 内嵌模型目录的 `isReasoning`；"
            f"{int(frame.attrs.get('reasoning_flag_count', 0))} 个模型有标记，其余记为 unknown。"
        ),
        (
            "- **网页抓取：** "
            + (
                "已暂停（D-12），只离线解析已有缓存，不发网页请求。"
                if website_page_fetch_paused is not False
                else "本次显式允许按需抓取缺当期 token 的详情页。"
            )
            + "列表页不再作为数据来源（payload 已改为 camelCase，旧的 snake_case 正则 0 命中）。"
        ),
        f"- **数据：** Artificial Analysis（{attribution_url}）。",
    ]
    return lines


def _write_report_markdown(
    frame: pd.DataFrame,
    under_limit_ranked: pd.DataFrame,
    non_reasoning_ranked: pd.DataFrame,
    resolved_threshold: ResolvedOutputTokenVerbosityThreshold,
    path: Path,
) -> None:
    output_token_limit_text = _format_number(resolved_threshold.output_token_limit_millions)
    generated_at_utc = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    current_intelligence_index_version_label = _intelligence_index_version_label(
        frame.attrs.get("current_intelligence_index_version")
    )
    under_limit_reasoning_count = int((under_limit_ranked["mode"] == VERBOSITY_MODE_REASONING).sum())
    under_limit_non_reasoning_count = int(
        (under_limit_ranked["mode"] == VERBOSITY_MODE_NON_REASONING).sum()
    )
    top_under_limit = under_limit_ranked.head(25)
    top_non_reasoning = non_reasoning_ranked.head(25)
    if top_under_limit.empty:
        threshold_summary_line = (
            f"- **没有模型的当期冗长度低于 {output_token_limit_text}M 输出 token。**"
        )
    else:
        threshold_summary_line = (
            f"- **冗长度低于 {output_token_limit_text}M 的最强模型：** "
            f"{_cell(top_under_limit.iloc[0]['model'])}，AA 智能指数 "
            f"{_format_number(top_under_limit.iloc[0]['aa_intelligence_index'])}，"
            f"冗长度 {_format_number(top_under_limit.iloc[0]['verbosity_m_output_tokens'])}M 输出 token。"
        )

    lines = [
        f"# Artificial Analysis 智能指数 × 冗长度报告（{current_intelligence_index_version_label}）",
        "",
        "## 摘要",
        "",
        threshold_summary_line,
        (
            f"- **覆盖：** {len(under_limit_ranked)} 个模型满足 "
            f"`<{output_token_limit_text}M` 冗长度条件：reasoning "
            f"{under_limit_reasoning_count} 个，non-reasoning {under_limit_non_reasoning_count} 个。"
        ),
        f"- {resolved_threshold.derivation_text()}",
        "",
        "## 数据来源与指数版本",
        "",
    ]
    lines.extend(_data_source_and_intelligence_index_version_lines(frame))
    lines.extend(
        [
            "",
            "## 指标定义",
            "",
            (
                "- **AA 智能指数**：AA API 的 "
                "`evaluations.artificial_analysis_intelligence_index`"
                f"（{current_intelligence_index_version_label}）。"
            ),
            (
                "- **冗长度（百万输出 token）**：`intelligence_index_canonical_output_token_count / 1e6`，"
                "即跑完整套智能指数的输出 token 数；与三维前沿「有效速度」口径所用的 token 数相同。"
            ),
            "- **模式**：内嵌模型目录的 `isReasoning`。",
            "",
            "## 冗长度阈值内的前 25 名",
            "",
            (
                f"冗长度低于 {output_token_limit_text}M 输出 token 的前 25 个模型，"
                "不区分 reasoning 模式。"
            ),
            "",
        ]
    )
    lines.extend(
        _markdown_table_lines(
            top_under_limit,
            columns=[
                ("rank", "#"),
                ("model", "模型"),
                ("mode", "模式"),
                ("aa_intelligence_index", "AA 智能指数"),
                ("verbosity_m_output_tokens", "冗长度 M"),
                ("release_date", "发布日期"),
            ],
        )
    )
    lines.extend(
        [
            "",
            "## 最强的 non-reasoning 模型",
            "",
            "保留早先的 non-reasoning 视角，并附同一冗长度指标（无当期 token 数的留空）。",
            "",
        ]
    )
    lines.extend(
        _markdown_table_lines(
            top_non_reasoning,
            columns=[
                ("rank", "#"),
                ("model", "模型"),
                ("aa_intelligence_index", "AA 智能指数"),
                ("verbosity_m_output_tokens", "冗长度 M"),
                ("release_date", "发布日期"),
            ],
        )
    )
    lines.extend(
        [
            "",
            f"## 冗长度低于 {output_token_limit_text}M 的完整表",
            "",
            "完整表另存为单独的 Markdown 与 CSV，便于审计与表格处理。",
            "",
        ]
    )
    lines.extend(
        _markdown_table_lines(
            under_limit_ranked,
            columns=[
                ("rank", "#"),
                ("model", "模型"),
                ("creator", "厂商"),
                ("mode", "模式"),
                ("aa_intelligence_index", "AA 智能指数"),
                ("verbosity_m_output_tokens", "冗长度 M"),
                ("release_date", "发布日期"),
            ],
        )
    )
    lines.extend(
        [
            "",
            "## 注意事项",
            "",
            f"- API 返回 {int(frame.attrs['api_model_count'])} 个模型。",
            (
                "- 排名只按 AA 智能指数；成本、延迟、输出速度与 Pareto 前沿位置都不参与本报告。"
            ),
            (
                "- 冗长度阈值跟随当期中位数：指数重定标后 token 规模整体变大，固定阈值会让筛选口径漂移；"
                f"旧报告使用固定 "
                f"{REFERENCE_OUTPUT_TOKEN_LIMIT_MILLIONS_USED_IN_INTELLIGENCE_INDEX_V4_1_ERA:g}M "
                "阈值，与本报告的模型数不可直接比较。"
            ),
            "",
            "## 生成信息",
            "",
            f"- 生成时间（UTC）：{generated_at_utc}",
        ]
    )
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def _markdown_table_lines(frame: pd.DataFrame, columns: list[tuple[str, str]]) -> list[str]:
    alignments = []
    for column_name, _ in columns:
        alignments.append(
            "---:"
            if column_name in {"rank", "aa_intelligence_index", "verbosity_m_output_tokens"}
            else "---"
        )

    lines = [
        "| " + " | ".join(label for _, label in columns) + " |",
        "| " + " | ".join(alignments) + " |",
    ]
    for row in frame.itertuples(index=False):
        values = []
        for column_name, _ in columns:
            values.append(_cell(getattr(row, column_name)))
        lines.append("| " + " | ".join(values) + " |")
    return lines


def _cell(value: object) -> str:
    if value is None:
        return ""
    if isinstance(value, float):
        if math.isnan(value):
            return ""
        return _format_number(value)
    return str(value).replace("|", "\\|")


def _format_number(value: float) -> str:
    return f"{float(value):.1f}"
