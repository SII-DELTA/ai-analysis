"""命令行入口：取数 → 数据契约 → 三维 HTML 可视化。

    python -m src.cli                       # 均衡默认，输出 output/frontier_3d.html
    python -m src.cli --refresh             # 刷新 API，并在冷却期结束后受限刷新目录
    python -m src.cli --since-months 12 --layers 2 --speed-scale linear
    python -m src.cli --speed-metric raw        # HTML 初始显示原始速度
    python -m src.cli --cost-metric blended     # HTML 初始显示 7:2:1 混合单价
    python -m src.cli --pruning-reference-date 2026-09-23   # 固定剪枝参考日期（缺省取 API 抓取日期）
    python -m src.cli --processed-models-csv-out /path/to/models.csv
    python -m src.cli --frontier-3d-visualization-dataset-in output/frontier_3d_visualization_dataset.json
    python -m src.cli --export png          # 另存静态图（失败时非零退出）

结尾打印数据新鲜度摘要（API 抓取时间、指数版本、值来源计数、目录分区、各口径计数）、
智能前 20 中未上图模型的缺维告警，以及 V-3（因暂停抓取缺当期 token 的模型）名单。
"""
from __future__ import annotations

import argparse
import sys
from collections import Counter
from datetime import date
from pathlib import Path

import numpy as np
import pandas as pd
import plotly.graph_objects as go

from . import fetch_data, frontier, visualize
from .frontier_3d_self_contained_html_renderer import (
    write_frontier_3d_self_contained_html_report,
)
from .frontier_3d_visualization_dataset_builder import (
    COST_METRIC_DEFINITIONS,
    DEFAULT_COST_METRIC_NAME,
    DEFAULT_FRONTIER_3D_VISUALIZATION_DATASET_FILENAME,
    DEFAULT_HARD_AGE_CUTOFF_MONTHS,
    DEFAULT_MAXIMUM_PARETO_LAYER_COUNT_FOR_RECENT_MODEL_DISPLAY,
    DEFAULT_SINCE_MONTHS_FOR_RECENT_MODEL_SOFT_WINDOW,
    DEFAULT_SPEED_AXIS_SCALE,
    DEFAULT_SPEED_METRIC_NAME,
    SPEED_METRIC_DEFINITIONS,
    build_frontier_3d_visualization_dataset,
    default_frontier_3d_visualization_dataset_path_for_html,
    read_frontier_3d_visualization_dataset,
    write_frontier_3d_visualization_dataset,
)

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_OUTPUT_HTML_PATH = ROOT / "output" / "frontier_3d.html"

SPEED_METRICS = {
    metric_name: (
        metric_definition["column_name"],
        metric_definition["label"],
    )
    for metric_name, metric_definition in SPEED_METRIC_DEFINITIONS.items()
}
COST_METRICS = {
    metric_name: (
        metric_definition["column_name"],
        metric_definition["label"],
        metric_definition["unit"],
    )
    for metric_name, metric_definition in COST_METRIC_DEFINITIONS.items()
}

# 读取已有契约时不再参与计算的剪枝/口径参数：argparse 属性名 → 命令行写法
PRUNING_AND_METRIC_COMPUTATION_ARGUMENT_FLAG_BY_ATTRIBUTE_NAME = {
    "since_months": "--since-months",
    "layers": "--layers",
    "hard_age_cutoff_months": "--hard-age-cutoff-months",
    "speed_scale": "--speed-scale",
    "pruning_reference_date": "--pruning-reference-date",
}
# 读取已有契约时同样不起作用的取数参数（R1-09）：不提示会让人误以为已经刷新过数据
DATA_FETCH_ARGUMENT_FLAG_BY_ATTRIBUTE_NAME = {
    "refresh": "--refresh",
    "allow_artificial_analysis_website_page_fetch": "--allow-artificial-analysis-website-page-fetch",
    "use_previous_run_processed_models_csv_as_fallback": "--use-previous-run-processed-models-csv-as-fallback",
    "processed_models_csv_out": "--processed-models-csv-out",
    "artificial_analysis_raw_data_directory": "--artificial-analysis-raw-data-directory",
    "previous_run_processed_models_csv_in": "--previous-run-processed-models-csv-in",
}
# 缺维告警检查的「智能分最高」模型个数
TOP_INTELLIGENCE_MODEL_COUNT_FOR_MISSING_FROM_CHART_WARNING = 20
# V-3 名单最多逐个列出的模型数（其余只报个数）
MAXIMUM_LISTED_MODEL_NAMES_FOR_V3_MISSING_CURRENT_OUTPUT_TOKEN_WARNING = 50

API_RESPONSE_FETCHED_AT_UTC_SOURCE_DISPLAY_TEXT_BY_SOURCE = {
    fetch_data.API_RESPONSE_FETCHED_AT_UTC_SOURCE_RECORDED_AT_FETCH_TIME: "抓取时记录",
    fetch_data.API_RESPONSE_FETCHED_AT_UTC_SOURCE_INFERRED_FROM_CACHE_FILE_MODIFICATION_TIME: (
        "按缓存文件修改时间推断"
    ),
}
CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_DISPLAY_TEXT_BY_SOURCE = {
    fetch_data.CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_ARTIFICIAL_ANALYSIS_API_RESPONSE: "API 响应",
    fetch_data.CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_ARTIFICIAL_ANALYSIS_API_RESPONSE_FAMILY_REFINED_BY_ACCEPTED_EMBEDDED_MODEL_CATALOG_PARTITION: (
        "API 响应的 family，按被接受的目录分区细化到补丁号"
    ),
    fetch_data.CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_INFERRED_FROM_ACCEPTED_EMBEDDED_MODEL_CATALOG_PARTITION: (
        "按被接受的目录分区推定"
    ),
}


def _figure_from_dataset_variant(dataset: dict, variant_key: str) -> go.Figure:
    variant = dataset["metric_variants"][variant_key]
    return go.Figure(
        data=variant["plotly_static_export_trace_data"],
        layout=variant["plotly_static_export_layout"],
    )


def _initial_variant_key_after_cli_metric_overrides(
    dataset: dict,
    requested_cost_metric_name: str | None,
    requested_speed_metric_name: str | None,
) -> str:
    if requested_cost_metric_name is None and requested_speed_metric_name is None:
        return dataset["initial_variant_key"]

    current_cost_metric_name, current_speed_metric_name = dataset[
        "initial_variant_key"
    ].split("__", 1)
    final_cost_metric_name = requested_cost_metric_name or current_cost_metric_name
    final_speed_metric_name = requested_speed_metric_name or current_speed_metric_name
    final_variant_key = f"{final_cost_metric_name}__{final_speed_metric_name}"
    if final_variant_key not in dataset["metric_variants"]:
        raise ValueError(f"数据契约缺少请求的初始指标组合: {final_variant_key}")
    return final_variant_key


def _iso_calendar_date_command_line_argument(argument_text: str) -> str:
    try:
        return date.fromisoformat(argument_text).isoformat()
    except ValueError as invalid_date_error:
        raise argparse.ArgumentTypeError(
            f"日期格式应为 YYYY-MM-DD，收到 {argument_text!r}"
        ) from invalid_date_error


def _build_command_line_argument_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description="AA 三维前沿可视化")
    # 剪枝/口径参数缺省为 None：读取已有契约时据此判断用户是否显式给了会被忽略的参数
    p.add_argument(
        "--since-months", type=int, default=None,
        help=f"软窗：近 N 月内为‘近期’（缺省 {DEFAULT_SINCE_MONTHS_FOR_RECENT_MODEL_SOFT_WINDOW}）",
    )
    p.add_argument(
        "--layers", type=int, default=None,
        help=(
            "近期模型保留前 N 层 Pareto：显示层号或分析层号 ≤ N 即保留"
            f"（离前沿距离，缺省 {DEFAULT_MAXIMUM_PARETO_LAYER_COUNT_FOR_RECENT_MODEL_DISPLAY}）"
        ),
    )
    p.add_argument(
        "--hard-age-cutoff-months", type=int, default=None,
        help=f"早于此一律剔除（含 Pareto，缺省 {DEFAULT_HARD_AGE_CUTOFF_MONTHS}）",
    )
    p.add_argument(
        "--speed-scale", choices=["log", "linear"], default=None,
        help=f"速度轴刻度（缺省 {DEFAULT_SPEED_AXIS_SCALE}）",
    )
    p.add_argument(
        "--pruning-reference-date",
        type=_iso_calendar_date_command_line_argument,
        default=None,
        help="剪枝参考日期 YYYY-MM-DD（缺省取 API 抓取日期，不用运行当天）",
    )
    p.add_argument(
        "--speed-metric",
        choices=SPEED_METRICS,
        default=None,
        help="HTML 初始速度口径；页面内仍可切换",
    )
    p.add_argument(
        "--cost-metric",
        choices=COST_METRICS,
        default=None,
        help="HTML 初始成本口径；页面内仍可切换",
    )
    p.add_argument("--refresh", action="store_true", help="重新拉取 API；目录冷却期结束后自动受限刷新")
    from .artificial_analysis_minimal_model_catalog_refresh import add_website_catalog_fetch_policy_arguments
    add_website_catalog_fetch_policy_arguments(p)
    p.add_argument("--report-deployment-environment",choices=("development","production"),default="development",
        help="报告环境；开发版持续显示未恢复目录异常，正式部署隐藏开发诊断标记")
    p.add_argument(
        "--use-previous-run-processed-models-csv-as-fallback",
        action="store_true",
        help="把上次产物 data/processed/models.csv 作为非当期回退源（版本未知，默认不读）",
    )
    p.add_argument(
        "--processed-models-csv-out",
        type=Path,
        default=None,
        help="models.csv 输出路径（缺省 data/processed/models.csv）",
    )
    p.add_argument(
        "--previous-run-processed-models-csv-in",
        type=Path,
        default=None,
        help=(
            "--use-previous-run-processed-models-csv-as-fallback 读取的上次 models.csv"
            "（缺省同 --processed-models-csv-out，再缺省 data/processed/models.csv）"
        ),
    )
    p.add_argument(
        "--artificial-analysis-raw-data-directory",
        type=Path,
        default=None,
        help=(
            "原始数据目录（缺省共享的 data/raw）：API 缓存、API 响应历史、列表页与详情页缓存都在其下读写；"
            "指向 scratch 副本即可彩排 --refresh 而不碰共享目录"
        ),
    )
    p.add_argument("--out", default=None,
                   help="输出 HTML 路径；缺省为 output/frontier_3d.html")
    p.add_argument(
        "--frontier-3d-visualization-dataset-out",
        type=Path,
        default=None,
        help=(
            "输出 Frontier 3D 可视化数据契约 JSON；缺省为 HTML 同目录的 "
            f"{DEFAULT_FRONTIER_3D_VISUALIZATION_DATASET_FILENAME}"
        ),
    )
    p.add_argument(
        "--frontier-3d-visualization-dataset-in",
        type=Path,
        default=None,
        help="读取已有 Frontier 3D 可视化数据契约 JSON，跳过取数和指标计算（剪枝/口径参数被忽略）",
    )
    p.add_argument("--export", choices=["png", "svg"], default=None, help="另存静态图（失败时非零退出）")
    return p


# ----------------------------------------------------------------------------- 新鲜度摘要（规格第 6 节）
def _non_current_fallback_value_version_and_earliest_capture_date_text(
    df: pd.DataFrame,
    value_source_column_name: str,
    value_source: str,
    value_intelligence_index_version_column_name: str,
    value_fetched_at_utc_column_name: str,
) -> str:
    """回退值所属指数版本与最早采集日期，例：「（v4.1，最早采集 2026-07-01）」（R4-08）。"""
    if value_intelligence_index_version_column_name not in df.columns or value_fetched_at_utc_column_name not in df.columns:
        return ""
    fallback_rows = df[df[value_source_column_name] == value_source]
    if fallback_rows.empty:
        return ""
    fallback_value_versions = sorted(
        {
            f"v{value_version}" if isinstance(value_version, str) and value_version else "版本未知"
            for value_version in fallback_rows[value_intelligence_index_version_column_name]
        }
    )
    fallback_value_capture_dates = sorted(
        str(fetched_at_utc)[:10]
        for fetched_at_utc in fallback_rows[value_fetched_at_utc_column_name]
        if isinstance(fetched_at_utc, str) and fetched_at_utc
    )
    return (
        f"（{'/'.join(fallback_value_versions)}，最早采集 "
        f"{fallback_value_capture_dates[0] if fallback_value_capture_dates else '未知'}）"
    )


# 新鲜度摘要专用的伪来源：值来源是被接受目录分区、却因该 UUID 智能分与当期 API 不一致被逐个降级（R1-01 (a)）
CATALOG_OUTPUT_TOKEN_COUNT_DEMOTED_PER_UUID_PSEUDO_VALUE_SOURCE_FOR_FRESHNESS_SUMMARY = (
    "artificial_analysis_embedded_model_catalog_accepted_partition_demoted_to_non_current_per_uuid"
)


def _output_token_count_value_source_series_with_catalog_tokens_demoted_per_uuid_split_out(
    df: pd.DataFrame,
) -> pd.Series:
    """token 来源列；被逐 UUID 降为非当期的目录 token 换成伪来源，单独计数，不混进「目录当期」。"""
    output_token_count_value_source_series = df["output_token_count_value_source"].copy()
    if frontier.OUTPUT_TOKEN_COUNT_VALUE_NON_CURRENT_REASON_CODE_COLUMN_NAME not in df.columns:
        return output_token_count_value_source_series
    catalog_token_demoted_per_uuid_mask = (
        output_token_count_value_source_series
        == fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_ACCEPTED_PARTITION
    ) & df[frontier.OUTPUT_TOKEN_COUNT_VALUE_NON_CURRENT_REASON_CODE_COLUMN_NAME].map(
        lambda reason_code: isinstance(reason_code, str) and bool(reason_code)
    )
    output_token_count_value_source_series = output_token_count_value_source_series.astype(object)
    output_token_count_value_source_series[catalog_token_demoted_per_uuid_mask] = (
        CATALOG_OUTPUT_TOKEN_COUNT_DEMOTED_PER_UUID_PSEUDO_VALUE_SOURCE_FOR_FRESHNESS_SUMMARY
    )
    return output_token_count_value_source_series


def _value_source_counts_text(
    value_source_series: pd.Series,
    value_source_display_name_by_value_source: dict[str | None, str],
    value_source_detail_text_by_value_source: dict[str, str] | None = None,
) -> str:
    value_source_detail_text_by_value_source = value_source_detail_text_by_value_source or {}
    value_source_counts = Counter(
        value_source if isinstance(value_source, str) else None for value_source in value_source_series
    )
    count_fragments = [
        f"{value_source_display_name} {value_source_counts.get(value_source, 0)}"
        + (
            value_source_detail_text_by_value_source.get(value_source, "")
            if value_source_counts.get(value_source, 0)
            else ""
        )
        for value_source, value_source_display_name in value_source_display_name_by_value_source.items()
    ]
    unexpected_value_sources = sorted(
        str(value_source)
        for value_source in value_source_counts
        if value_source not in value_source_display_name_by_value_source
    )
    count_fragments.extend(
        f"{unexpected_value_source} {value_source_counts[unexpected_value_source]}"
        for unexpected_value_source in unexpected_value_sources
    )
    return " / ".join(count_fragments)


def _freshness_summary_lines_for_models_dataframe(df: pd.DataFrame) -> list[str]:
    """取数侧的新鲜度摘要：值来源计数（回退值带版本与最早采集日期）、目录分区、网页抓取状态、护栏结果。"""
    non_current_cost_to_run_value_sources = (
        fetch_data.COST_TO_RUN_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT,
        fetch_data.COST_TO_RUN_VALUE_SOURCE_PREVIOUS_RUN_PROCESSED_MODELS_CSV,
    )
    non_current_output_token_count_value_sources = (
        fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT,
        fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_PREVIOUS_RUN_PROCESSED_MODELS_CSV,
    )
    summary_lines = [
        "成本来源："
        + _value_source_counts_text(
            df["cost_to_run_value_source"],
            {
                fetch_data.COST_TO_RUN_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_API_CURRENT_RESPONSE: "API 当期",
                fetch_data.COST_TO_RUN_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT: (
                    "非当期回退（版本化快照）"
                ),
                fetch_data.COST_TO_RUN_VALUE_SOURCE_PREVIOUS_RUN_PROCESSED_MODELS_CSV: "上次 models.csv",
                None: "缺失",
            },
            {
                non_current_value_source: _non_current_fallback_value_version_and_earliest_capture_date_text(
                    df,
                    "cost_to_run_value_source",
                    non_current_value_source,
                    "cost_to_run_value_intelligence_index_version",
                    "cost_to_run_value_fetched_at_utc",
                )
                for non_current_value_source in non_current_cost_to_run_value_sources
            },
        ),
        "token 来源："
        + _value_source_counts_text(
            _output_token_count_value_source_series_with_catalog_tokens_demoted_per_uuid_split_out(df),
            {
                fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_ACCEPTED_PARTITION: (
                    "目录当期"
                ),
                CATALOG_OUTPUT_TOKEN_COUNT_DEMOTED_PER_UUID_PSEUDO_VALUE_SOURCE_FOR_FRESHNESS_SUMMARY: (
                    "目录（智能分与当期 API 不一致，逐 UUID 降为非当期）"
                ),
                fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT: (
                    "非当期回退（版本化快照）"
                ),
                fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_PREVIOUS_RUN_PROCESSED_MODELS_CSV: "上次 models.csv",
                None: "缺失",
            },
            {
                non_current_value_source: _non_current_fallback_value_version_and_earliest_capture_date_text(
                    df,
                    "output_token_count_value_source",
                    non_current_value_source,
                    "output_token_count_value_intelligence_index_version",
                    "output_token_count_value_fetched_at_utc",
                )
                for non_current_value_source in non_current_output_token_count_value_sources
            },
        ),
    ]
    if "blended_price_cache_hit_price_source" in df.columns:
        summary_lines.append(
            "7:2:1 混合价来源："
            + _value_source_counts_text(
                df["blended_price_cache_hit_price_source"],
                {
                    fetch_data.BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_ARTIFICIAL_ANALYSIS_API_NATIVE_BLENDED_PRICE: (
                        "API 原生"
                    ),
                    fetch_data.BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_API_CACHE_HIT_PRICE: (
                        "按 API cache-hit 价计算"
                    ),
                    fetch_data.BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_INPUT_PRICE_AS_CACHE_HIT_PRICE: (
                        "缺 cache-hit 用 input 价代替"
                    ),
                    None: "缺失",
                },
            )
        )

    embedded_model_catalog_load_summary = (
        df.attrs.get(fetch_data.MODELS_DATAFRAME_ATTRS_KEY_EMBEDDED_MODEL_CATALOG_LOAD_SUMMARY) or {}
    )
    if embedded_model_catalog_load_summary:
        accepted_partition_page_count = sum(
            partition_summary.get("page_count") or 0
            for partition_summary in embedded_model_catalog_load_summary.get("partition_summaries", [])
            if partition_summary.get("is_accepted")
        )
        invalid_page_file_names = list(embedded_model_catalog_load_summary.get("invalid_page_file_names") or [])
        summary_lines.append(
            "内嵌目录分区："
            f"v{embedded_model_catalog_load_summary.get('accepted_partition_intelligence_index_version') or '（无被接受分区）'}，"
            f"截至 {embedded_model_catalog_load_summary.get('accepted_partition_captured_at_utc') or '未知'}，"
            f"{accepted_partition_page_count} 页，"
            f"无效页 {len(invalid_page_file_names)} 个"
            + (f"（{', '.join(invalid_page_file_names)}）" if invalid_page_file_names else "")
        )
    else:
        summary_lines.append("内嵌目录分区：未记录（模型表没有目录加载摘要）")
    return summary_lines


def _data_quality_guardrail_result_lines(df: pd.DataFrame) -> list[str]:
    """打印 build_dataframe 的真实护栏结果（不再无条件打印「锚点校验: 通过」）。"""
    guardrail_results = df.attrs.get(fetch_data.MODELS_DATAFRAME_ATTRS_KEY_DATA_QUALITY_GUARDRAIL_RESULTS)
    if not guardrail_results:
        return ["数据质量护栏：未记录（模型表没有护栏结果）"]
    return ["数据质量护栏："] + [
        f"  {guardrail_result_line}"
        for guardrail_result_line in fetch_data.format_data_quality_guardrail_result_lines(guardrail_results)
    ]


def _freshness_summary_lines_for_dataset(
    dataset: dict,
    pruning_reference_date_source_text: str,
) -> list[str]:
    """契约侧的新鲜度摘要：抓取时间与版本、网页抓取状态、剪枝参考日期、各口径计数。"""
    artificial_analysis_data_provenance = dataset.get("artificial_analysis_data_provenance") or {}
    api_response_fetched_at_utc = artificial_analysis_data_provenance.get(
        "artificial_analysis_api_response_fetched_at_utc"
    )
    api_response_fetched_at_utc_source = artificial_analysis_data_provenance.get(
        "artificial_analysis_api_response_fetched_at_utc_source"
    )
    current_intelligence_index_version = artificial_analysis_data_provenance.get(
        "current_intelligence_index_version"
    )
    current_intelligence_index_version_source = artificial_analysis_data_provenance.get(
        "current_intelligence_index_version_source"
    )
    embedded_model_catalog_captured_at_utc = artificial_analysis_data_provenance.get(
        "embedded_model_catalog_captured_at_utc"
    )
    website_page_fetch_paused = artificial_analysis_data_provenance.get(
        "artificial_analysis_website_page_fetch_paused"
    )
    summary_lines = [
        "API 抓取时间："
        + (
            f"{api_response_fetched_at_utc}（"
            + API_RESPONSE_FETCHED_AT_UTC_SOURCE_DISPLAY_TEXT_BY_SOURCE.get(
                api_response_fetched_at_utc_source, str(api_response_fetched_at_utc_source)
            )
            + "）"
            if api_response_fetched_at_utc
            else "抓取时间未知"
        ),
        "当期智能指数版本："
        + (f"v{current_intelligence_index_version}" if current_intelligence_index_version else "未知")
        + (
            "（"
            + CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_DISPLAY_TEXT_BY_SOURCE.get(
                current_intelligence_index_version_source, str(current_intelligence_index_version_source)
            )
            + "）"
            if current_intelligence_index_version_source
            else ""
        )
        + "；API 响应版本："
        + (
            f"v{artificial_analysis_data_provenance['artificial_analysis_api_intelligence_index_version']}"
            if artificial_analysis_data_provenance.get("artificial_analysis_api_intelligence_index_version")
            else "未记录"
        ),
        "网页抓取："
        + (
            f"已暂停（D-12），目录缓存截至 {embedded_model_catalog_captured_at_utc or '未知'}"
            if website_page_fetch_paused is True
            else (
                "已开启受限目录批次刷新（最多每 24 小时一批）"
                if website_page_fetch_paused is False
                else "状态未记录"
            )
        ),
        "剪枝参考日期："
        + f"{artificial_analysis_data_provenance.get('pruning_reference_date') or '未记录'}"
        + f"（{pruning_reference_date_source_text}）",
        "各口径（显示 / 分析 Pareto / 参与分析 / 历史口径）：",
    ]
    refresh_status=artificial_analysis_data_provenance.get("artificial_analysis_embedded_model_catalog_refresh_status")
    refresh_warning=artificial_analysis_data_provenance.get("artificial_analysis_embedded_model_catalog_refresh_warning_text")
    if refresh_status:
        summary_lines.insert(3,"目录刷新状态："+refresh_status)
    if refresh_warning:
        summary_lines.insert(3,"[warn] "+refresh_warning)
    for variant_key, variant in dataset["metric_variants"].items():
        cost_metric_name, speed_metric_name = variant_key.split("__", 1)
        summary_lines.append(
            f"  {variant_key}（{COST_METRIC_DEFINITIONS[cost_metric_name]['label']} × "
            f"{SPEED_METRIC_DEFINITIONS[speed_metric_name]['label']}）："
            f"显示 {variant.get('kept_model_count')}，"
            f"分析 Pareto {variant.get('pareto_model_count')}，"
            f"参与分析 {variant.get('analysis_eligible_model_count', '未记录')}，"
            f"历史口径 {variant.get('historical_version_value_model_count', '未记录')}"
        )
    return summary_lines


def _top_intelligence_models_missing_from_chart_warning_lines(dataset: dict, variant_key: str) -> list[str]:
    """智能前 20（全部有智能分的模型）中未上图的模型及原因（W1-8 缺维告警）。"""
    variant = dataset["metric_variants"][variant_key]
    displayed_model_intelligence_and_name = [
        (float(marker["z"]), str(marker["name"]), None)
        for marker in variant["three_dimensional_scene"]["displayed_model_markers"]
    ]
    excluded_model_intelligence_and_name = [
        (float(excluded_model["intelligence"]), str(excluded_model["name"]), excluded_model)
        for excluded_model in variant.get("excluded_models_with_drop_reason", [])
    ]
    top_intelligence_models = sorted(
        displayed_model_intelligence_and_name + excluded_model_intelligence_and_name,
        key=lambda intelligence_and_name: (-intelligence_and_name[0], intelligence_and_name[1]),
    )[:TOP_INTELLIGENCE_MODEL_COUNT_FOR_MISSING_FROM_CHART_WARNING]
    top_intelligence_models_missing_from_chart = [
        excluded_model for _, _, excluded_model in top_intelligence_models if excluded_model is not None
    ]
    if not top_intelligence_models_missing_from_chart:
        return [
            f"缺维告警：智能前 {TOP_INTELLIGENCE_MODEL_COUNT_FOR_MISSING_FROM_CHART_WARNING} 均已上图（口径 {variant_key}）"
        ]
    warning_lines = [
        f"[warn] 缺维告警：智能前 {TOP_INTELLIGENCE_MODEL_COUNT_FOR_MISSING_FROM_CHART_WARNING} 中未上图 "
        f"{len(top_intelligence_models_missing_from_chart)} 个（口径 {variant_key}）："
    ]
    warning_lines.extend(
        f"  - {excluded_model['name']}（{excluded_model['intelligence']:.1f}）：{excluded_model['drop_reason']}"
        + (
            "；不在目录分区（缺当期 token）"
            if excluded_model.get("is_absent_from_accepted_embedded_model_catalog_partition")
            else ""
        )
        for excluded_model in top_intelligence_models_missing_from_chart
    )
    return warning_lines


def _models_missing_current_output_token_count_from_verified_catalog_lines(
    df: pd.DataFrame,
) -> list[str]:
    """V-3 单列：有智能分、有原始速度、不在被接受的目录分区里、且没有任何有效速度的模型。

    R1-05：目录分区整体被拒（版本 family 不一致、AA 重评、缓存为空）时，全部行都「不在分区」，
    原因是分区被拒而不是暂停抓取，此时只报拒绝原因、不列名单；不在分区但有 v4.1 等快照 token 的
    模型仍以历史口径显示（不参与有效速度口径分析），单独计数，不算「缺席」。
    """
    if "is_absent_from_accepted_embedded_model_catalog_partition" not in df.columns:
        return ["V-3：模型表没有 is_absent_from_accepted_embedded_model_catalog_partition 列，无法统计"]
    embedded_model_catalog_load_summary = (
        df.attrs.get(fetch_data.MODELS_DATAFRAME_ATTRS_KEY_EMBEDDED_MODEL_CATALOG_LOAD_SUMMARY) or {}
    )
    if embedded_model_catalog_load_summary and not embedded_model_catalog_load_summary.get(
        "accepted_partition_intelligence_index_version"
    ):
        partition_rejection_descriptions = [
            f"v{partition_summary.get('most_specific_intelligence_index_version')}"
            f"（{partition_summary.get('cache_file_modification_date_utc')}，"
            f"{partition_summary.get('page_count')} 页）："
            + "；".join(partition_summary.get("rejection_reasons") or ["原因未记录"])
            for partition_summary in embedded_model_catalog_load_summary.get("partition_summaries", [])
        ]
        return [
            "V-3：没有被接受的内嵌目录分区，全部 token 为非当期；这不是暂停抓取造成的个别缺失，名单不适用。"
            + (
                "被拒分区：" + " | ".join(partition_rejection_descriptions)
                if partition_rejection_descriptions
                else "目录缓存没有任何结构有效的详情页"
            )
        ]
    is_absent_from_accepted_catalog_partition = df[
        "is_absent_from_accepted_embedded_model_catalog_partition"
    ].map(lambda flag: isinstance(flag, (bool, np.bool_)) and bool(flag))
    absent_models_with_intelligence_and_raw_speed = (
        is_absent_from_accepted_catalog_partition.astype(bool)
        & df["intelligence"].notna()
        & df["output_speed"].notna()
    )
    effective_speed_is_missing = (
        df["eff_speed"].isna() if "eff_speed" in df.columns else pd.Series(True, index=df.index)
    )
    absent_models_still_displayed_with_historical_output_token_count = int(
        (absent_models_with_intelligence_and_raw_speed & ~effective_speed_is_missing).sum()
    )
    models_missing_current_output_token_count = df[
        absent_models_with_intelligence_and_raw_speed & effective_speed_is_missing
    ].sort_values("intelligence", ascending=False, kind="mergesort")
    v3_lines = [
        f"V-3：{len(models_missing_current_output_token_count)} 个模型缺当期 token"
        "（不在目录分区中），在有效速度口径缺席"
        + ("：" if len(models_missing_current_output_token_count) else "")
    ]
    listed_models = models_missing_current_output_token_count.head(
        MAXIMUM_LISTED_MODEL_NAMES_FOR_V3_MISSING_CURRENT_OUTPUT_TOKEN_WARNING
    )
    v3_lines.extend(
        f"  - {model_row['name']}（{float(model_row['intelligence']):.1f}）"
        for _, model_row in listed_models.iterrows()
    )
    unlisted_model_count = len(models_missing_current_output_token_count) - len(listed_models)
    if unlisted_model_count > 0:
        v3_lines.append(f"  … 另有 {unlisted_model_count} 个未列出")
    if absent_models_still_displayed_with_historical_output_token_count:
        v3_lines.append(
            f"  另有 {absent_models_still_displayed_with_historical_output_token_count} 个不在目录分区的模型"
            "以 v4.1 等历史口径 token 显示（不参与有效速度口径分析，不计入上面的缺席名单）"
        )
    return v3_lines


def print_frontier_3d_data_freshness_summary(
    dataset: dict,
    *,
    models_dataframe: pd.DataFrame | None,
    pruning_reference_date_source_text: str,
) -> None:
    print("\n==== 数据新鲜度摘要 ====")
    freshness_summary_lines = _freshness_summary_lines_for_dataset(dataset, pruning_reference_date_source_text)
    if models_dataframe is not None:
        # 值来源计数与目录分区插在「当期版本」之后、「网页抓取」之前；护栏结果放在最后
        freshness_summary_lines[2:2] = _freshness_summary_lines_for_models_dataframe(models_dataframe)
        freshness_summary_lines.extend(_data_quality_guardrail_result_lines(models_dataframe))
    for freshness_summary_line in freshness_summary_lines:
        print(freshness_summary_line)
    for warning_line in _top_intelligence_models_missing_from_chart_warning_lines(
        dataset, dataset["initial_variant_key"]
    ):
        print(warning_line)
    if models_dataframe is not None:
        for v3_line in _models_missing_current_output_token_count_from_verified_catalog_lines(
            models_dataframe
        ):
            print(v3_line)


# ----------------------------------------------------------------------------- 主流程
def main(command_line_arguments: list[str] | None = None) -> None:
    args = _build_command_line_argument_parser().parse_args(command_line_arguments)

    if args.out is None:
        args.out = str(DEFAULT_OUTPUT_HTML_PATH)

    output_html_path = Path(args.out)
    dataset_output_path = (
        args.frontier_3d_visualization_dataset_out
        or default_frontier_3d_visualization_dataset_path_for_html(output_html_path)
    )

    models_dataframe: pd.DataFrame | None = None
    if args.frontier_3d_visualization_dataset_in is not None:
        ignored_argument_flags = [
            argument_flag
            for attribute_name, argument_flag in PRUNING_AND_METRIC_COMPUTATION_ARGUMENT_FLAG_BY_ATTRIBUTE_NAME.items()
            if getattr(args, attribute_name) is not None
        ] + [
            ("--disable-artificial-analysis-website-page-fetch"
             if attribute_name=="allow_artificial_analysis_website_page_fetch" and args.allow_artificial_analysis_website_page_fetch is False
             else argument_flag)
            for attribute_name, argument_flag in DATA_FETCH_ARGUMENT_FLAG_BY_ATTRIBUTE_NAME.items()
            if getattr(args, attribute_name) not in (None, False) or (
                attribute_name=="allow_artificial_analysis_website_page_fetch" and args.allow_artificial_analysis_website_page_fetch is False)
        ]
        if ignored_argument_flags:
            print(
                "[提示] 读取已有契约时这些参数被忽略："
                + ", ".join(ignored_argument_flags)
                + "（不取数、不刷新；契约里的剪枝与口径计算结果保持不变）"
            )
        dataset = read_frontier_3d_visualization_dataset(
            args.frontier_3d_visualization_dataset_in
        )
        dataset["initial_variant_key"] = _initial_variant_key_after_cli_metric_overrides(
            dataset,
            args.cost_metric,
            args.speed_metric,
        )
        print(f"\n数据契约: {args.frontier_3d_visualization_dataset_in}")
        pruning_reference_date_source_text = "读取自已有契约"
    else:
        models_dataframe = fetch_data.build_dataframe(
            refresh=args.refresh,
            allow_artificial_analysis_website_page_fetch=args.allow_artificial_analysis_website_page_fetch,
            use_previous_run_processed_models_csv_as_fallback=(
                args.use_previous_run_processed_models_csv_as_fallback
            ),
            artificial_analysis_raw_data_directory=args.artificial_analysis_raw_data_directory,
            # 「上次产物」缺省就是本次要覆盖的 --processed-models-csv-out（R1-07），而不是固定的共享路径
            previous_run_processed_models_csv_path=(
                args.previous_run_processed_models_csv_in or args.processed_models_csv_out
            ),
        )
        written_processed_models_csv_path = fetch_data.save(
            models_dataframe, args.processed_models_csv_out
        )
        print(f"\n数据表: {written_processed_models_csv_path}")
        print(f"API 模型总数:            {len(models_dataframe)}")

        if args.pruning_reference_date is not None:
            pruning_reference_date_source_text = "命令行 --pruning-reference-date"
        else:
            pruning_reference_date_source_text = "API 抓取日期"
            artificial_analysis_data_provenance = models_dataframe.attrs.get(
                fetch_data.MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE
            ) or {}
            if not artificial_analysis_data_provenance.get("artificial_analysis_api_response_fetched_at_utc"):
                sys.exit(
                    "API 抓取时间未知，无法确定剪枝参考日期；请用 --pruning-reference-date YYYY-MM-DD 显式指定"
                )

        dataset = build_frontier_3d_visualization_dataset(
            models_dataframe,
            since_months=(
                args.since_months
                if args.since_months is not None
                else DEFAULT_SINCE_MONTHS_FOR_RECENT_MODEL_SOFT_WINDOW
            ),
            max_layers=args.layers if args.layers is not None else DEFAULT_MAXIMUM_PARETO_LAYER_COUNT_FOR_RECENT_MODEL_DISPLAY,
            hard_age_cutoff_months=(
                args.hard_age_cutoff_months
                if args.hard_age_cutoff_months is not None
                else DEFAULT_HARD_AGE_CUTOFF_MONTHS
            ),
            speed_scale=args.speed_scale or DEFAULT_SPEED_AXIS_SCALE,
            initial_cost_metric_name=args.cost_metric or DEFAULT_COST_METRIC_NAME,
            initial_speed_metric_name=args.speed_metric or DEFAULT_SPEED_METRIC_NAME,
            pruning_reference_date=args.pruning_reference_date,
        )
        write_frontier_3d_visualization_dataset(dataset, dataset_output_path)
        print(f"可视化数据契约: {dataset_output_path}")

    initial_variant_key = dataset["initial_variant_key"]
    initial_figure = _figure_from_dataset_variant(dataset, initial_variant_key)
    written_html_report_path = write_frontier_3d_self_contained_html_report(dataset, output_html_path,
        report_deployment_environment=args.report_deployment_environment)
    print(f"\n✅ 交互式 HTML: {written_html_report_path}")

    print_frontier_3d_data_freshness_summary(
        dataset,
        models_dataframe=models_dataframe,
        pruning_reference_date_source_text=pruning_reference_date_source_text,
    )

    if args.export:
        static_export_output_path = Path(args.out).with_suffix("." + args.export)
        static_export_written_path = visualize.export_static(initial_figure, static_export_output_path)
        if static_export_written_path is None:
            # E7：静态导出失败不再吞掉错误（交互式 HTML 已写出，但整体以非零码退出）
            sys.exit(f"静态导出失败：{static_export_output_path}（见上方 [warn]；需要 kaleido）")
        print(f"✅ 静态图: {static_export_written_path}")


if __name__ == "__main__":
    main()
