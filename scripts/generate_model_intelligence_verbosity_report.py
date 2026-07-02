"""生成 AA Intelligence × verbosity 排名报告。

用法：
    python3 scripts/generate_model_intelligence_verbosity_report.py
    python3 scripts/generate_model_intelligence_verbosity_report.py --refresh
    python3 scripts/generate_model_intelligence_verbosity_report.py --output-token-limit-millions 30
"""
from __future__ import annotations

import argparse
import sys
from pathlib import Path

REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPOSITORY_ROOT))

from src.model_intelligence_verbosity_report import (  # noqa: E402
    DEFAULT_REPORT_PATH,
    DEFAULT_UNDER_30M_CSV_PATH,
    DEFAULT_UNDER_30M_TABLE_PATH,
    write_model_intelligence_verbosity_report,
)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="生成 Artificial Analysis Intelligence × verbosity 排名报告"
    )
    parser.add_argument("--refresh", action="store_true", help="忽略缓存，重新拉取 AA API 与模型页")
    parser.add_argument(
        "--output-token-limit-millions",
        type=float,
        default=30.0,
        help="完整表的 verbosity 阈值，单位为百万输出 token",
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
        default=DEFAULT_UNDER_30M_TABLE_PATH,
        help="完整 under-limit Markdown 表输出路径",
    )
    parser.add_argument(
        "--under-limit-csv-out",
        type=Path,
        default=DEFAULT_UNDER_30M_CSV_PATH,
        help="完整 under-limit CSV 输出路径",
    )
    args = parser.parse_args()

    result = write_model_intelligence_verbosity_report(
        refresh=args.refresh,
        output_token_limit_millions=args.output_token_limit_millions,
        report_markdown_path=args.report_out,
        under_30m_markdown_table_path=args.under_limit_table_out,
        under_30m_csv_path=args.under_limit_csv_out,
    )

    print(f"API 模型数: {result.api_model_count}")
    print(f"reasoning 标记数: {result.reasoning_flag_count}")
    print(f"含 verbosity 模型数: {result.verbosity_model_count}")
    print(
        f"< {args.output_token_limit_millions:g}M 输出 token 模型数: "
        f"{result.under_30m_model_count} "
        f"(reasoning={result.under_30m_reasoning_model_count}, "
        f"non-reasoning={result.under_30m_non_reasoning_model_count})"
    )
    print(f"报告: {result.paths.report_markdown_path}")
    print(f"完整 Markdown 表: {result.paths.under_30m_markdown_table_path}")
    print(f"完整 CSV 表: {result.paths.under_30m_csv_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
