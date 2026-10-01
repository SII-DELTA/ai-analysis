"""一次性转换：把旧回退快照的「每百万输出 token 的智能」比值还原成原始输出 token 数。

背景（计划 W1-5、规格 1.4）：旧快照
`data/reference/artificial_analysis_intelligence_index_cost_and_output_token_fallback_snapshot.csv`
（列 id,name,cost_to_run,intel_per_m_output；2026-07-01 采集，提交 d68051a）只存了比值
`intel_per_m_output = 智能 / 输出 token(百万)`。下游用「新版智能 ÷ 旧比值」反推 token，
在 AA 把指数从 v4.1 重定标到 v4.3 之后会把新旧版本拼在一起（P0-1）。本脚本用**采集当日**的
API 智能分还原原始 token 数，并把指数版本、采集日写进文件，此后不再依赖比值。

    token 原始数 = 7/1 API 智能分 / intel_per_m_output × 1e6

- 7/1 智能分取 `data/raw/api_language_models_free.json`（只读缓存；377/377 可覆盖；
  该 API 与 v4.1 目录分区智能分一致率 93%，故版本标 "4.1"）。
- API 智能分只保留 1 位小数，还原出的 token 数相对误差约 ≤ 0.05/智能分（智能分 3.4 时约 1.5%），
  因此四舍五入到整数即可，不假装更高精度。
- 成本列原样保留（单位美元）；缺失保持为空。

复现（旧 CSV 已在转换后删除，可从 git 取回）：

    git show d68051a:data/reference/artificial_analysis_intelligence_index_cost_and_output_token_fallback_snapshot.csv \\
        > /path/to/scratch/legacy_snapshot.csv
    uv run python scripts/convert_legacy_intelligence_per_million_output_token_fallback_snapshot_to_raw_token_counts.py \\
        --legacy-snapshot-csv /path/to/scratch/legacy_snapshot.csv \\
        --converted-snapshot-csv /path/to/scratch/converted.csv

只读输入、只写 `--converted-snapshot-csv` 指定的一个文件；不联网。
"""
from __future__ import annotations

import argparse
import json
import math
from pathlib import Path

import pandas as pd

REPOSITORY_ROOT_DIRECTORY_PATH = Path(__file__).resolve().parent.parent
DEFAULT_LEGACY_INTELLIGENCE_PER_MILLION_OUTPUT_TOKEN_FALLBACK_SNAPSHOT_CSV_PATH = (
    REPOSITORY_ROOT_DIRECTORY_PATH
    / "data"
    / "reference"
    / "artificial_analysis_intelligence_index_cost_and_output_token_fallback_snapshot.csv"
)
DEFAULT_ARTIFICIAL_ANALYSIS_API_LANGUAGE_MODELS_RESPONSE_CAPTURED_2026_07_01_JSON_PATH = (
    REPOSITORY_ROOT_DIRECTORY_PATH / "data" / "raw" / "api_language_models_free.json"
)
DEFAULT_CONVERTED_RAW_TOKEN_COUNT_FALLBACK_SNAPSHOT_CSV_PATH = (
    REPOSITORY_ROOT_DIRECTORY_PATH
    / "data"
    / "reference"
    / "artificial_analysis_intelligence_index_v4_1_cost_to_run_and_canonical_output_token_count_fallback_snapshot_captured_2026_07_01.csv"
)
DEFAULT_LEGACY_SNAPSHOT_INTELLIGENCE_INDEX_VERSION = "4.1"
DEFAULT_LEGACY_SNAPSHOT_CAPTURED_AT_DATE = "2026-07-01"
CONVERTED_SNAPSHOT_COLUMN_NAMES = [
    "id",
    "name",
    "intelligence_index_version",
    "captured_at_date",
    "cost_to_run_usd",
    "intelligence_index_canonical_output_token_count",
]


def _positive_float_or_none(raw_value: object) -> float | None:
    if raw_value is None or isinstance(raw_value, bool):
        return None
    try:
        converted_value = float(raw_value)
    except (TypeError, ValueError):
        return None
    if math.isnan(converted_value) or converted_value <= 0:
        return None
    return converted_value


def convert_legacy_intelligence_per_million_output_token_fallback_snapshot_to_raw_token_counts(
    legacy_snapshot: pd.DataFrame,
    api_intelligence_index_captured_same_day_by_model_id: dict[str, object],
    *,
    intelligence_index_version: str,
    captured_at_date: str,
) -> pd.DataFrame:
    """纯函数：旧快照 DataFrame + 同日 API 智能分 → 新格式快照 DataFrame。"""
    converted_snapshot_rows = []
    for legacy_snapshot_row in legacy_snapshot.to_dict("records"):
        same_day_intelligence_index = _positive_float_or_none(
            api_intelligence_index_captured_same_day_by_model_id.get(legacy_snapshot_row["id"])
        )
        intelligence_per_million_output_tokens = _positive_float_or_none(
            legacy_snapshot_row.get("intel_per_m_output")
        )
        canonical_output_token_count = (
            round(same_day_intelligence_index / intelligence_per_million_output_tokens * 1e6)
            if same_day_intelligence_index is not None
            and intelligence_per_million_output_tokens is not None
            else None
        )
        converted_snapshot_rows.append(
            {
                "id": legacy_snapshot_row["id"],
                "name": legacy_snapshot_row.get("name"),
                "intelligence_index_version": intelligence_index_version,
                "captured_at_date": captured_at_date,
                "cost_to_run_usd": _positive_float_or_none(legacy_snapshot_row.get("cost_to_run")),
                "intelligence_index_canonical_output_token_count": canonical_output_token_count,
            }
        )
    converted_snapshot = pd.DataFrame(converted_snapshot_rows, columns=CONVERTED_SNAPSHOT_COLUMN_NAMES)
    converted_snapshot["intelligence_index_canonical_output_token_count"] = converted_snapshot[
        "intelligence_index_canonical_output_token_count"
    ].astype("Int64")
    return converted_snapshot


def _parse_command_line_arguments() -> argparse.Namespace:
    command_line_argument_parser = argparse.ArgumentParser(
        description=(
            "把旧回退快照的 intel_per_m_output 比值还原为原始输出 token 数（一次性、只读输入、不联网）"
        )
    )
    command_line_argument_parser.add_argument(
        "--legacy-snapshot-csv",
        type=Path,
        default=DEFAULT_LEGACY_INTELLIGENCE_PER_MILLION_OUTPUT_TOKEN_FALLBACK_SNAPSHOT_CSV_PATH,
        help="旧快照 CSV（列 id,name,cost_to_run,intel_per_m_output）；已删除时用 git show d68051a:<路径> 取回",
    )
    command_line_argument_parser.add_argument(
        "--api-language-models-response-json",
        type=Path,
        default=DEFAULT_ARTIFICIAL_ANALYSIS_API_LANGUAGE_MODELS_RESPONSE_CAPTURED_2026_07_01_JSON_PATH,
        help="与旧快照同日采集的 API 响应缓存（取 evaluations.artificial_analysis_intelligence_index）",
    )
    command_line_argument_parser.add_argument(
        "--converted-snapshot-csv",
        type=Path,
        default=DEFAULT_CONVERTED_RAW_TOKEN_COUNT_FALLBACK_SNAPSHOT_CSV_PATH,
        help="输出的新格式快照 CSV",
    )
    command_line_argument_parser.add_argument(
        "--intelligence-index-version",
        default=DEFAULT_LEGACY_SNAPSHOT_INTELLIGENCE_INDEX_VERSION,
        help="写入每行的指数版本（默认 4.1）",
    )
    command_line_argument_parser.add_argument(
        "--captured-at-date",
        default=DEFAULT_LEGACY_SNAPSHOT_CAPTURED_AT_DATE,
        help="写入每行的采集日 YYYY-MM-DD（默认 2026-07-01）",
    )
    return command_line_argument_parser.parse_args()


def main() -> None:
    parsed_command_line_arguments = _parse_command_line_arguments()
    legacy_snapshot = pd.read_csv(
        parsed_command_line_arguments.legacy_snapshot_csv, dtype={"id": str, "name": str}
    )
    api_language_models_response = json.loads(
        parsed_command_line_arguments.api_language_models_response_json.read_text(encoding="utf-8")
    )
    api_model_rows = (
        api_language_models_response["data"]
        if isinstance(api_language_models_response, dict)
        else api_language_models_response
    )
    api_intelligence_index_captured_same_day_by_model_id = {
        api_model_row["id"]: (api_model_row.get("evaluations") or {}).get(
            "artificial_analysis_intelligence_index"
        )
        for api_model_row in api_model_rows
    }
    converted_snapshot = (
        convert_legacy_intelligence_per_million_output_token_fallback_snapshot_to_raw_token_counts(
            legacy_snapshot,
            api_intelligence_index_captured_same_day_by_model_id,
            intelligence_index_version=parsed_command_line_arguments.intelligence_index_version,
            captured_at_date=parsed_command_line_arguments.captured_at_date,
        )
    )
    parsed_command_line_arguments.converted_snapshot_csv.parent.mkdir(parents=True, exist_ok=True)
    converted_snapshot.to_csv(parsed_command_line_arguments.converted_snapshot_csv, index=False)
    converted_output_token_count_values = converted_snapshot[
        "intelligence_index_canonical_output_token_count"
    ]
    print(f"旧快照行数: {len(legacy_snapshot)}")
    print(
        "还原出 token 数的行: "
        f"{int(converted_output_token_count_values.notna().sum())}/{len(converted_snapshot)}"
    )
    print(f"有成本的行: {int(converted_snapshot['cost_to_run_usd'].notna().sum())}")
    if converted_output_token_count_values.notna().any():
        print(
            "token 中位数（百万）: "
            f"{float(converted_output_token_count_values.dropna().astype(float).median()) / 1e6:.2f}"
        )
    print(f"已写出: {parsed_command_line_arguments.converted_snapshot_csv}")


if __name__ == "__main__":
    main()
