"""生成 AA Intelligence × verbosity 排名报告。

本模块复用主可视化管线里的 verbosity 口径：
`output_mtokens = intelligence / intelligence_index_per_m_output_tokens`。
它只负责表格型分析报告，不参与三维 Pareto 前沿计算。
"""
from __future__ import annotations

import math
import re
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import pandas as pd

from .fetch_data import (
    API_LANGUAGE_MODELS_FREE_URL,
    fetch_api,
    fetch_page,
    load_cost_and_output_token_fallbacks,
    parse_intel_per_m_by_model_id,
)


ROOT = Path(__file__).resolve().parent.parent
DEFAULT_REPORT_PATH = ROOT / "output" / "model_intelligence_verbosity_report.md"
DEFAULT_UNDER_30M_CSV_PATH = (
    ROOT / "data" / "processed" / "models_under_30m_output_tokens_ranked_by_intelligence.csv"
)
DEFAULT_UNDER_30M_TABLE_PATH = (
    ROOT / "data" / "processed" / "models_under_30m_output_tokens_ranked_by_intelligence.md"
)

MODEL_CATALOG_ENTRY_PATTERN = re.compile(
    r'\{"id":"(?P<id>[0-9a-f-]{36})",'
    r'"slug":"(?P<slug>[^"]+)",'
    r'"name":"(?P<name>(?:[^"\\]|\\.)*)",'
    r'"shortName":"(?P<short>(?:[^"\\]|\\.)*)",'
    r'"deprecated":(?P<deprecated>true|false),'
    r'"isReasoning":(?P<is_reasoning>true|false),'
    r'"creator":\{'
)


@dataclass(frozen=True)
class ModelIntelligenceVerbosityReportPaths:
    """一次报告生成写出的全部本地产物路径。"""

    report_markdown_path: Path
    under_30m_markdown_table_path: Path
    under_30m_csv_path: Path


@dataclass(frozen=True)
class ModelIntelligenceVerbosityReportResult:
    """报告生成结果与关键计数。"""

    paths: ModelIntelligenceVerbosityReportPaths
    api_model_count: int
    reasoning_flag_count: int
    verbosity_model_count: int
    under_30m_model_count: int
    under_30m_reasoning_model_count: int
    under_30m_non_reasoning_model_count: int


def parse_reasoning_flags_by_model_id(page_html: str) -> dict[str, bool]:
    """从 AA 模型页目录解析 `{model_id: is_reasoning}`。"""
    normalized_page_html = page_html.replace('\\"', '"').replace("\\\\", "\\")
    return {
        match.group("id"): match.group("is_reasoning") == "true"
        for match in MODEL_CATALOG_ENTRY_PATTERN.finditer(normalized_page_html)
    }


def build_model_intelligence_verbosity_dataframe(refresh: bool = False) -> pd.DataFrame:
    """拉取 AA 当前模型数据并合并 reasoning 标记与 verbosity。"""
    api_rows = fetch_api(refresh=refresh)
    page_html = fetch_page(refresh=refresh)

    current_intelligence_per_million_output_tokens_by_model_id = (
        parse_intel_per_m_by_model_id(page_html)
    )
    _, fallback_intelligence_per_million_output_tokens_by_model_id = (
        load_cost_and_output_token_fallbacks()
    )

    intelligence_per_million_output_tokens_by_model_id = dict(
        fallback_intelligence_per_million_output_tokens_by_model_id
    )
    intelligence_per_million_output_tokens_by_model_id.update(
        current_intelligence_per_million_output_tokens_by_model_id
    )

    reasoning_flag_by_model_id = parse_reasoning_flags_by_model_id(page_html)
    rows: list[dict] = []
    for model in api_rows:
        model_id = model["id"]
        evaluations = model.get("evaluations") or {}
        intelligence_index = evaluations.get("artificial_analysis_intelligence_index")
        intelligence_per_million_output_tokens = (
            intelligence_per_million_output_tokens_by_model_id.get(model_id)
        )
        verbosity_m_output_tokens = math.nan
        if intelligence_index is not None and intelligence_per_million_output_tokens:
            verbosity_m_output_tokens = (
                float(intelligence_index) / float(intelligence_per_million_output_tokens)
            )

        is_reasoning = reasoning_flag_by_model_id.get(model_id)
        rows.append(
            {
                "model_id": model_id,
                "slug": model.get("slug"),
                "model": model.get("name"),
                "creator": (model.get("model_creator") or {}).get("name"),
                "mode": (
                    "reasoning"
                    if is_reasoning is True
                    else "non-reasoning"
                    if is_reasoning is False
                    else "unknown"
                ),
                "release_date": model.get("release_date") or "",
                "aa_intelligence_index": (
                    float(intelligence_index) if intelligence_index is not None else math.nan
                ),
                "verbosity_m_output_tokens": verbosity_m_output_tokens,
                "verbosity_source": (
                    "current_page"
                    if model_id in current_intelligence_per_million_output_tokens_by_model_id
                    else "fallback_snapshot"
                    if model_id in fallback_intelligence_per_million_output_tokens_by_model_id
                    else ""
                ),
            }
        )

    frame = pd.DataFrame(rows)
    frame.attrs["api_model_count"] = len(api_rows)
    frame.attrs["reasoning_flag_count"] = len(reasoning_flag_by_model_id)
    frame.attrs["current_page_verbosity_model_count"] = len(
        current_intelligence_per_million_output_tokens_by_model_id
    )
    frame.attrs["fallback_verbosity_model_count"] = len(
        fallback_intelligence_per_million_output_tokens_by_model_id
    )
    return frame


def filter_models_under_output_token_limit(
    frame: pd.DataFrame,
    output_token_limit_millions: float = 30.0,
) -> pd.DataFrame:
    """筛出 verbosity 低于给定百万输出 token 阈值的模型，并按智能降序排序。"""
    filtered = frame[
        frame["aa_intelligence_index"].notna()
        & frame["verbosity_m_output_tokens"].notna()
        & (frame["verbosity_m_output_tokens"] < output_token_limit_millions)
    ].copy()
    return _rank_by_intelligence(filtered)


def filter_non_reasoning_models_ranked_by_intelligence(frame: pd.DataFrame) -> pd.DataFrame:
    """筛出 non-reasoning 模型，并按智能降序排序。"""
    filtered = frame[
        (frame["mode"] == "non-reasoning") & frame["aa_intelligence_index"].notna()
    ].copy()
    return _rank_by_intelligence(filtered)


def write_model_intelligence_verbosity_report(
    refresh: bool = False,
    output_token_limit_millions: float = 30.0,
    report_markdown_path: Path = DEFAULT_REPORT_PATH,
    under_30m_markdown_table_path: Path = DEFAULT_UNDER_30M_TABLE_PATH,
    under_30m_csv_path: Path = DEFAULT_UNDER_30M_CSV_PATH,
) -> ModelIntelligenceVerbosityReportResult:
    """生成 Markdown 报告、完整 Markdown 表和 CSV 明细。"""
    frame = build_model_intelligence_verbosity_dataframe(refresh=refresh)
    under_limit_ranked = filter_models_under_output_token_limit(
        frame, output_token_limit_millions=output_token_limit_millions
    )
    non_reasoning_ranked = filter_non_reasoning_models_ranked_by_intelligence(frame)

    under_30m_markdown_table_path.parent.mkdir(parents=True, exist_ok=True)
    under_30m_csv_path.parent.mkdir(parents=True, exist_ok=True)
    report_markdown_path.parent.mkdir(parents=True, exist_ok=True)

    _write_dataframe_csv(under_limit_ranked, under_30m_csv_path)
    _write_under_limit_markdown_table(
        under_limit_ranked,
        output_token_limit_millions=output_token_limit_millions,
        path=under_30m_markdown_table_path,
    )
    _write_report_markdown(
        frame=frame,
        under_limit_ranked=under_limit_ranked,
        non_reasoning_ranked=non_reasoning_ranked,
        output_token_limit_millions=output_token_limit_millions,
        path=report_markdown_path,
    )

    return ModelIntelligenceVerbosityReportResult(
        paths=ModelIntelligenceVerbosityReportPaths(
            report_markdown_path=report_markdown_path,
            under_30m_markdown_table_path=under_30m_markdown_table_path,
            under_30m_csv_path=under_30m_csv_path,
        ),
        api_model_count=int(frame.attrs["api_model_count"]),
        reasoning_flag_count=int(frame.attrs["reasoning_flag_count"]),
        verbosity_model_count=int(frame["verbosity_m_output_tokens"].notna().sum()),
        under_30m_model_count=len(under_limit_ranked),
        under_30m_reasoning_model_count=int((under_limit_ranked["mode"] == "reasoning").sum()),
        under_30m_non_reasoning_model_count=int(
            (under_limit_ranked["mode"] == "non-reasoning").sum()
        ),
    )


def _rank_by_intelligence(frame: pd.DataFrame) -> pd.DataFrame:
    ranked = frame.sort_values(
        ["aa_intelligence_index", "release_date", "model"],
        ascending=[False, False, False],
    ).reset_index(drop=True)
    ranked.insert(0, "rank", range(1, len(ranked) + 1))
    return ranked


def _write_dataframe_csv(frame: pd.DataFrame, path: Path) -> None:
    output_columns = [
        "rank",
        "model",
        "creator",
        "mode",
        "aa_intelligence_index",
        "verbosity_m_output_tokens",
        "release_date",
        "slug",
        "verbosity_source",
        "model_id",
    ]
    frame.loc[:, output_columns].to_csv(path, index=False)


def _write_under_limit_markdown_table(
    frame: pd.DataFrame,
    output_token_limit_millions: float,
    path: Path,
) -> None:
    lines = [
        f"# Models Under {output_token_limit_millions:g}M Output Tokens, Ranked by AA Intelligence",
        "",
        (
            "Filter: `verbosity_m_output_tokens < "
            f"{output_token_limit_millions:g}`, where "
            "`verbosity_m_output_tokens = AA Intelligence Index / "
            "intelligence_index_per_m_output_tokens`. Includes both reasoning and "
            "non-reasoning models."
        ),
        "",
    ]
    lines.extend(
        _markdown_table_lines(
            frame,
            columns=[
                ("rank", "#"),
                ("model", "Model"),
                ("creator", "Creator"),
                ("mode", "Mode"),
                ("aa_intelligence_index", "AA Intelligence"),
                ("verbosity_m_output_tokens", "Verbosity (M output tokens)"),
                ("release_date", "Release"),
            ],
        )
    )
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def _write_report_markdown(
    frame: pd.DataFrame,
    under_limit_ranked: pd.DataFrame,
    non_reasoning_ranked: pd.DataFrame,
    output_token_limit_millions: float,
    path: Path,
) -> None:
    generated_at = datetime.now(ZoneInfo("Asia/Shanghai")).strftime("%Y-%m-%d %H:%M %Z")
    under_limit_reasoning_count = int((under_limit_ranked["mode"] == "reasoning").sum())
    under_limit_non_reasoning_count = int(
        (under_limit_ranked["mode"] == "non-reasoning").sum()
    )
    verbosity_model_count = int(frame["verbosity_m_output_tokens"].notna().sum())
    top_under_limit = under_limit_ranked.head(25)
    top_non_reasoning = non_reasoning_ranked.head(25)
    if top_under_limit.empty:
        threshold_summary_line = (
            f"- **No model is under {output_token_limit_millions:g}M output tokens** "
            "with the currently available Intelligence and verbosity data."
        )
        tradeoff_summary_line = (
            "- **Main tradeoff:** The selected verbosity threshold is below the "
            "observed eligible set, so this report can only show the metric definitions, "
            "non-reasoning reference table, and source coverage."
        )
    else:
        threshold_summary_line = (
            f"- **Best model under {output_token_limit_millions:g}M output tokens:** "
            f"{_cell(top_under_limit.iloc[0]['model'])} leads with AA Intelligence "
            f"{_format_number(top_under_limit.iloc[0]['aa_intelligence_index'])} at "
            f"{_format_number(top_under_limit.iloc[0]['verbosity_m_output_tokens'])}M "
            "output tokens."
        )
        tradeoff_summary_line = (
            "- **Main tradeoff:** Several reasoning models remain below the verbosity "
            "threshold and outrank the best non-reasoning models by raw Intelligence; "
            "the strongest non-reasoning entries are still competitive while often "
            "using fewer output tokens."
        )

    lines = [
        "# Artificial Analysis Intelligence and Verbosity Report",
        "",
        "## Executive Summary",
        "",
        threshold_summary_line,
        (
            f"- **Coverage:** {len(under_limit_ranked)} models meet the "
            f"`<{output_token_limit_millions:g}M` verbosity filter: "
            f"{under_limit_reasoning_count} reasoning and "
            f"{under_limit_non_reasoning_count} non-reasoning."
        ),
        tradeoff_summary_line,
        "",
        "## Metric Definitions",
        "",
        (
            "- **AA Intelligence** is "
            "`evaluations.artificial_analysis_intelligence_index` from the Artificial "
            "Analysis language models API."
        ),
        (
            "- **Verbosity (M output tokens)** is the existing effective-speed HTML "
            "generation metric: `AA Intelligence / intelligence_index_per_m_output_tokens`."
        ),
        (
            "- **Mode** comes from the Artificial Analysis model-page UUID catalog "
            "`isReasoning` flag."
        ),
        "",
        "## Top Models Under the Verbosity Threshold",
        "",
        (
            f"These are the top 25 models with verbosity under "
            f"{output_token_limit_millions:g}M output tokens, regardless of reasoning mode."
        ),
        "",
    ]
    lines.extend(
        _markdown_table_lines(
            top_under_limit,
            columns=[
                ("rank", "#"),
                ("model", "Model"),
                ("mode", "Mode"),
                ("aa_intelligence_index", "AA Intelligence"),
                ("verbosity_m_output_tokens", "Verbosity M"),
                ("release_date", "Release"),
            ],
        )
    )
    lines.extend(
        [
            "",
            "## Best Non-Reasoning Models",
            "",
            "This table keeps the earlier non-reasoning view and adds the same verbosity metric.",
            "",
        ]
    )
    lines.extend(
        _markdown_table_lines(
            top_non_reasoning,
            columns=[
                ("rank", "#"),
                ("model", "Model"),
                ("aa_intelligence_index", "AA Intelligence"),
                ("verbosity_m_output_tokens", "Verbosity M"),
                ("release_date", "Release"),
            ],
        )
    )
    lines.extend(
        [
            "",
            f"## Full Under-{output_token_limit_millions:g}M Table",
            "",
            (
                "The complete table is also written as a separate Markdown file and CSV "
                "for audit and spreadsheet use."
            ),
            "",
        ]
    )
    lines.extend(
        _markdown_table_lines(
            under_limit_ranked,
            columns=[
                ("rank", "#"),
                ("model", "Model"),
                ("creator", "Creator"),
                ("mode", "Mode"),
                ("aa_intelligence_index", "AA Intelligence"),
                ("verbosity_m_output_tokens", "Verbosity M"),
                ("release_date", "Release"),
            ],
        )
    )
    lines.extend(
        [
            "",
            "## Caveats",
            "",
            (
                f"- The API returned {int(frame.attrs['api_model_count'])} models and "
                f"the page catalog returned {int(frame.attrs['reasoning_flag_count'])} "
                "reasoning flags."
            ),
            (
                f"- Verbosity was available for {verbosity_model_count} models after "
                "combining the current AA page with the versioned AA fallback snapshot "
                "used by the existing effective-speed pipeline."
            ),
            (
                "- The ranking is by raw AA Intelligence only; cost, latency, output "
                "speed, and Pareto frontier position are not used in this report."
            ),
            "",
            "## Source Context",
            "",
            f"- Generated at: {generated_at}",
            f"- API endpoint used by the current key: `{API_LANGUAGE_MODELS_FREE_URL}`",
            "- Reasoning flags and current verbosity fields: `https://artificialanalysis.ai/models`",
            "- Fallback verbosity snapshot: `data/reference/artificial_analysis_intelligence_index_cost_and_output_token_fallback_snapshot.csv`",
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
