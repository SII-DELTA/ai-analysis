"""生成 AA 智能指数 × 冗长度（verbosity）排名报告。

数据来自 `fetch_data.build_dataframe`：智能分取 AA API，冗长度取被接受的内嵌模型目录分区里的
当期输出 token 数（不再解析列表页）。默认暂停网页抓取（D-12），只离线解析已有缓存。

冗长度阈值缺省跟随当期中位数：阈值 = （v4.1 时期旧阈值 30M ÷ v4.1 快照中位数 21.24M）× 当期中位数；
`--output-token-limit-multiple-of-current-median` 改倍数，`--output-token-limit-millions` 显式指定绝对阈值（二者互斥）。

用法（先设 `UV_PROJECT_ENVIRONMENT`，见 README）：
    uv run python scripts/generate_model_intelligence_verbosity_report.py
    uv run python scripts/generate_model_intelligence_verbosity_report.py --refresh
    uv run python scripts/generate_model_intelligence_verbosity_report.py --output-token-limit-millions 30 \\
        --report-out <路径> --under-limit-table-out <路径> --under-limit-csv-out <路径>
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPOSITORY_ROOT))

from src.model_intelligence_verbosity_report import (  # noqa: E402
    DEFAULT_MODELS_UNDER_OUTPUT_TOKEN_VERBOSITY_THRESHOLD_CSV_PATH,
    DEFAULT_MODELS_UNDER_OUTPUT_TOKEN_VERBOSITY_THRESHOLD_MARKDOWN_TABLE_PATH,
    DEFAULT_OUTPUT_TOKEN_LIMIT_MULTIPLE_OF_CURRENT_INTELLIGENCE_INDEX_VERSION_MEDIAN,
    DEFAULT_REPORT_PATH,
    write_model_intelligence_verbosity_report,
)


def main(command_line_arguments: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="生成 Artificial Analysis 智能指数 × 冗长度排名报告（当期指数版本的输出 token 数）"
    )
    parser.add_argument(
        "--refresh",
        action="store_true",
        help="忽略 API 缓存重新拉取 AA API（网页抓取默认暂停，只刷新 API）",
    )
    parser.add_argument(
        "--allow-artificial-analysis-website-page-fetch",
        action="store_true",
        help="显式允许按需抓取缺当期 token 的 AA 详情页（默认暂停，D-12）",
    )
    output_token_limit_argument_group = parser.add_mutually_exclusive_group()
    output_token_limit_argument_group.add_argument(
        "--output-token-limit-multiple-of-current-median",
        type=float,
        default=None,
        help=(
            "冗长度阈值 = 该倍数 × 当期指数版本的输出 token 中位数；缺省 "
            f"{DEFAULT_OUTPUT_TOKEN_LIMIT_MULTIPLE_OF_CURRENT_INTELLIGENCE_INDEX_VERSION_MEDIAN:.4f}"
            "（= v4.1 时期旧阈值 30M ÷ v4.1 快照中位数 21.24M）"
        ),
    )
    output_token_limit_argument_group.add_argument(
        "--output-token-limit-millions",
        type=float,
        default=None,
        help="显式指定冗长度阈值（百万输出 token），覆盖按中位数推导的阈值",
    )
    parser.add_argument(
        "--report-out",
        type=Path,
        default=DEFAULT_REPORT_PATH,
        help="报告 Markdown 输出路径",
    )
    parser.add_argument(
        "--under-limit-table-out",
        type=Path,
        default=DEFAULT_MODELS_UNDER_OUTPUT_TOKEN_VERBOSITY_THRESHOLD_MARKDOWN_TABLE_PATH,
        help="阈值内完整 Markdown 表输出路径",
    )
    parser.add_argument(
        "--under-limit-csv-out",
        type=Path,
        default=DEFAULT_MODELS_UNDER_OUTPUT_TOKEN_VERBOSITY_THRESHOLD_CSV_PATH,
        help="阈值内完整 CSV 输出路径",
    )
    args = parser.parse_args(command_line_arguments)

    try:
        result = write_model_intelligence_verbosity_report(
            refresh=args.refresh,
            allow_artificial_analysis_website_page_fetch=args.allow_artificial_analysis_website_page_fetch,
            output_token_limit_millions=args.output_token_limit_millions,
            output_token_limit_multiple_of_current_median=args.output_token_limit_multiple_of_current_median,
            report_markdown_path=args.report_out,
            under_output_token_limit_markdown_table_path=args.under_limit_table_out,
            under_output_token_limit_csv_path=args.under_limit_csv_out,
        )
    except ValueError as threshold_argument_error:
        parser.error(str(threshold_argument_error))

    resolved_threshold = result.resolved_output_token_verbosity_threshold
    print(f"智能指数版本: v{result.current_intelligence_index_version or '未知'}")
    print(f"API 模型数: {result.api_model_count}")
    print(f"reasoning 标记数: {result.reasoning_flag_count}")
    print(f"含当期冗长度模型数: {result.verbosity_model_count}")
    print(
        "只有非当期 token 数、不参与排名的模型数: "
        f"{result.non_current_intelligence_index_version_output_token_count_model_count}"
    )
    print(f"冗长度阈值: {resolved_threshold.derivation_text()}")
    print(
        f"< {resolved_threshold.output_token_limit_millions:.1f}M 输出 token 模型数: "
        f"{result.under_output_token_limit_model_count} "
        f"(reasoning={result.under_output_token_limit_reasoning_model_count}, "
        f"non-reasoning={result.under_output_token_limit_non_reasoning_model_count})"
    )
    print(f"报告: {result.paths.report_markdown_path}")
    print(f"完整 Markdown 表: {result.paths.under_output_token_limit_markdown_table_path}")
    print(f"完整 CSV 表: {result.paths.under_output_token_limit_csv_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
