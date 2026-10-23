"""取数与合并：智能、速度、价格、当期运行成本来自 API，冗长度（输出 token）来自详情页内嵌目录。

三个维度与各自的值来源，按模型 UUID（API `id` == 内嵌目录对象 `id`）精确合并：

    智能  evaluations.artificial_analysis_intelligence_index        —— API（当期）
    速度  performance.median_output_tokens_per_second               —— API（当期）
    成本  artificial_analysis_intelligence_index_cost.total_cost    —— API（当期）
          → 缺失时回退版本化快照（v4.1，非当期）
    冗长度 canonicalIntelligenceIndexTokenCount.output              —— 详情页内嵌目录的被接受分区（当期）
          → 缺失时回退版本化快照（v4.1，非当期）

每个成本/冗长度值都带「值溯源」列：来源、所属指数版本、抓取时间、是否当期版本
（见规格 1.2/1.3）。下游（frontier / builder）据此判定「历史口径」点是否参与分析。

网页目录按 D-12 最小化刷新：`--refresh` 默认刷新 API 并在冷却期结束后抓 2–3 页；
显式禁用时只读已有目录；新 HTML 不落盘。离线目录加载器按「(页面指数版本 family, 缓存 mtime 的
UTC 日期)」分区，只采用版本 family 与当期一致的**一个**分区，禁止跨分区/跨版本取并集；
被接受分区里的 token 再逐 UUID 判定当期：该 UUID 的目录智能分与当期 API 一致才算当期（R1-01 (a)）。
"""
from __future__ import annotations

import argparse
import dataclasses
import json
import math
import os
import re
import sys
import uuid
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd
import requests

from .frontier import (
    ANALYSIS_INELIGIBILITY_REASON_CODE_OUTPUT_TOKEN_COUNT_VALUE_CATALOG_INTELLIGENCE_DISAGREES_WITH_CURRENT_API_INTELLIGENCE,
    ANALYSIS_INELIGIBILITY_REASON_CODE_OUTPUT_TOKEN_COUNT_VALUE_CATALOG_INTELLIGENCE_NOT_COMPARABLE_WITH_CURRENT_API_INTELLIGENCE,
    OUTPUT_TOKEN_COUNT_VALUE_NON_CURRENT_REASON_CODE_COLUMN_NAME,
)
from .artificial_analysis_guardrail_validated_json_response_storage import (
    write_text_file_atomically,GuardrailValidatedJsonResponseStorage,
    finalize_guardrail_validated_response_history,
)

try:
    from dotenv import load_dotenv
except ImportError:  # pragma: no cover
    load_dotenv = None

ROOT = Path(__file__).resolve().parent.parent
from .frontier_3d_worktree_storage_paths import resolve_frontier_3d_storage_paths, refuse_shared_worktree_directory_write

RAW = resolve_frontier_3d_storage_paths().raw_data_directory
PROCESSED = resolve_frontier_3d_storage_paths().processed_models_csv_path.parent
REFERENCE = ROOT / "data" / "reference"
# 版本化回退快照：从 8/4 无冲突的精确 v4.1 批次提取，时间按缓存 mtime 推断；
# 7/1 的旧换算快照仍保留用于追溯，不再作默认值来源。
ARTIFICIAL_ANALYSIS_INTELLIGENCE_INDEX_V4_1_COST_TO_RUN_AND_CANONICAL_OUTPUT_TOKEN_COUNT_FALLBACK_SNAPSHOT_PATH = (
    REFERENCE
    / "artificial_analysis_intelligence_index_v4_1_single_batch_cost_and_output_token_fallback_snapshot_captured_2026_08_04.csv"
)
# 兼容旧名：旧脚本只用它判断「版本化快照存在」
VERSIONED_COST_AND_OUTPUT_TOKEN_FALLBACK_SNAPSHOT = (
    ARTIFICIAL_ANALYSIS_INTELLIGENCE_INDEX_V4_1_COST_TO_RUN_AND_CANONICAL_OUTPUT_TOKEN_COUNT_FALLBACK_SNAPSHOT_PATH
)

API_LANGUAGE_MODELS_PRO_URL = "https://artificialanalysis.ai/api/v2/language/models"
API_LANGUAGE_MODELS_FREE_URL = "https://artificialanalysis.ai/api/v2/language/models/free"
API_LANGUAGE_MODELS_CACHE = RAW / "api_language_models.json"
# 每次真实拉取 API 另存一份带时间戳的完整响应（data/raw 已被 gitignore 覆盖）
ARTIFICIAL_ANALYSIS_API_LANGUAGE_MODELS_RESPONSE_HISTORY_DIRECTORY = (
    RAW / "artificial_analysis_api_language_models_response_history"
)
PAGE_URL = "https://artificialanalysis.ai/models"
ARTIFICIAL_ANALYSIS_MODELS_LIST_PAGE_HTML_CACHE_PATH = RAW / "models_page.html"
ARTIFICIAL_ANALYSIS_MODEL_DETAIL_PAGE_HTML_CACHE_DIRECTORY = (
    RAW / "artificial_analysis_model_detail_page_html"
)
# AA 免费 API 要求署名；契约与页头引用该链接
ARTIFICIAL_ANALYSIS_ATTRIBUTION_URL = "https://artificialanalysis.ai/"

# ----------------------------------------------------------------------------- 值来源枚举（规格 1.3）
COST_TO_RUN_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_API_CURRENT_RESPONSE = (
    "artificial_analysis_api_current_response"
)
COST_TO_RUN_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT = (
    "versioned_non_current_fallback_snapshot"
)
COST_TO_RUN_VALUE_SOURCE_PREVIOUS_RUN_PROCESSED_MODELS_CSV = "previous_run_processed_models_csv"
COST_TO_RUN_VALUE_SOURCE_ALLOWED_VALUES = frozenset(
    {
        COST_TO_RUN_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_API_CURRENT_RESPONSE,
        COST_TO_RUN_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT,
        COST_TO_RUN_VALUE_SOURCE_PREVIOUS_RUN_PROCESSED_MODELS_CSV,
        None,
    }
)
OUTPUT_TOKEN_COUNT_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_ACCEPTED_PARTITION = (
    "artificial_analysis_embedded_model_catalog_accepted_partition"
)
OUTPUT_TOKEN_COUNT_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT = (
    "versioned_non_current_fallback_snapshot"
)
OUTPUT_TOKEN_COUNT_VALUE_SOURCE_PREVIOUS_RUN_PROCESSED_MODELS_CSV = (
    "previous_run_processed_models_csv"
)
OUTPUT_TOKEN_COUNT_VALUE_SOURCE_ALLOWED_VALUES = frozenset(
    {
        OUTPUT_TOKEN_COUNT_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_ACCEPTED_PARTITION,
        OUTPUT_TOKEN_COUNT_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT,
        OUTPUT_TOKEN_COUNT_VALUE_SOURCE_PREVIOUS_RUN_PROCESSED_MODELS_CSV,
        None,
    }
)
BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_ARTIFICIAL_ANALYSIS_API_NATIVE_BLENDED_PRICE = (
    "artificial_analysis_api_native_blended_price"
)
BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_API_CACHE_HIT_PRICE = (
    "computed_with_api_cache_hit_price"
)
BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_INPUT_PRICE_AS_CACHE_HIT_PRICE = (
    "computed_with_input_price_as_cache_hit_price"
)
BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_ALLOWED_VALUES = frozenset(
    {
        BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_ARTIFICIAL_ANALYSIS_API_NATIVE_BLENDED_PRICE,
        BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_API_CACHE_HIT_PRICE,
        BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_INPUT_PRICE_AS_CACHE_HIT_PRICE,
        None,
    }
)
API_RESPONSE_FETCHED_AT_UTC_SOURCE_RECORDED_AT_FETCH_TIME = "recorded_at_fetch_time"
API_RESPONSE_FETCHED_AT_UTC_SOURCE_INFERRED_FROM_CACHE_FILE_MODIFICATION_TIME = (
    "inferred_from_cache_file_modification_time"
)
CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_ARTIFICIAL_ANALYSIS_API_RESPONSE = (
    "artificial_analysis_api_response"
)
CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_INFERRED_FROM_ACCEPTED_EMBEDDED_MODEL_CATALOG_PARTITION = (
    "inferred_from_accepted_embedded_model_catalog_partition"
)
# API 顶层版本是 JSON 数值（如 4.3），表达不了补丁号；同 family 的被接受目录分区更具体（4.3.2）时显示后者（R1-08）
CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_ARTIFICIAL_ANALYSIS_API_RESPONSE_FAMILY_REFINED_BY_ACCEPTED_EMBEDDED_MODEL_CATALOG_PARTITION = (
    "artificial_analysis_api_response_family_refined_by_accepted_embedded_model_catalog_partition"
)

# ----------------------------------------------------------------------------- 有效速度（规格 1.5）
# 有效速度 = 原始速度 / (该行输出 token(百万) / 该行 token 所属指数版本的参考 token 量)。
# 取值：v4.3.2 目录 166 个模型 token 中位数 86.87M；v4.1 快照 377 个模型中位数 21.24M。
# 常数只缩放坐标，同一版本内不改变排名与 Pareto；跨版本速度不可比（由 D-1 排除出分析保证）。
# EXPERIMENT_NODE: 归一常数取中位数还是其他分位/固定参考任务量，以及是否跨指数版本统一为一个常数
REFERENCE_OUTPUT_MILLION_TOKENS_FOR_EFFECTIVE_SPEED_NORMALIZATION_BY_INTELLIGENCE_INDEX_VERSION_FAMILY = {
    "4.3": 87.0,
    "4.1": 21.0,
}

# ----------------------------------------------------------------------------- 目录分区与护栏阈值
# 逐 UUID 判定「目录智能分与当期 API 一致」的绝对容差（R1-01 (a)：一致才把该 UUID 的目录 token 标当期）
EMBEDDED_MODEL_CATALOG_INTELLIGENCE_AGREEMENT_ABSOLUTE_TOLERANCE = 0.05
# 分区级智能分一致率不再是接受门槛（R1-01 (a)），只作诊断量：低于此值告警。
# 实测同一指数版本约一周的自然漂移：7/10→7/17 一致率 98.6%，7/17→8/04 97.9%（AA 陆续重评个别模型）。
# EXPERIMENT_NODE: 分区级智能分一致率的告警线取 99% 是否合适（一周漂移实测 97.9%–98.6%，告警会较常见）
EMBEDDED_MODEL_CATALOG_PARTITION_INTELLIGENCE_AGREEMENT_RATE_WITH_API_BELOW_WHICH_TO_WARN = 0.99
# 分区接受条件之一：与 API 的 UUID 交集里带 token 的记录数下限
# EXPERIMENT_NODE: 分区接受的最小「与 API UUID 交集带 token 记录数」护栏取 50 是否合适（真实 9/23 分区为 166 条）
EMBEDDED_MODEL_CATALOG_PARTITION_MINIMUM_RECORD_WITH_OUTPUT_TOKEN_COUNT = 50
CATALOG_VS_API_COST_TO_RUN_AGREEMENT_MAXIMUM_RELATIVE_ERROR = 0.001
# 目录 vs API 的成本/智能一致率护栏：低于此值只告警（warning_only）——V-2 之后目录成本不是值来源，
# 智能分不一致的 UUID 已逐个降为非当期（R1-01 (a)）
CATALOG_VS_API_AGREEMENT_RATE_BELOW_WHICH_GUARDRAIL_WARNS = 0.99
MINIMUM_API_LANGUAGE_MODEL_COUNT_FOR_GUARDRAIL = 500
# R1-04：API 当期成本条数与响应历史中「上一份通过护栏的响应」相比骤降超过此比例 → 失败；
# 没有可比基线（首次刷新、离线跑共享缓存、历史目录为空）时改用绝对下限。
# 实测：9/23 Free 响应有 151 条 API 当期成本；7/1 Free 响应只有 69 条（覆盖曾大幅波动）。
# EXPERIMENT_NODE: API 当期成本条数「骤降」阈值取 30% 是否合适（AA 正常下架/重测会带来多大的周间波动未实测）
MAXIMUM_CURRENT_API_COST_TO_RUN_VALUE_COUNT_RELATIVE_DROP_VERSUS_PREVIOUS_GUARDRAIL_PASSED_RESPONSE = 0.30
# EXPERIMENT_NODE: 无可比基线时 API 当期成本条数的绝对下限取 100 是否合适（9/23 实测 151 条）
MINIMUM_CURRENT_API_COST_TO_RUN_VALUE_COUNT_WITHOUT_COMPARABLE_PREVIOUS_RESPONSE = 100
# 非当期回退成本占全部有成本行的比例：超过上限只告警（R1-04 降为 warning_only；D-1 已保证非当期值
# 不参与分析，真正的「API 成本大面积消失」由上面的骤降护栏拦截）。实测 9/23：242/393 ≈ 0.616。
# EXPERIMENT_NODE: 非当期回退成本占比告警线取 0.70（实测 0.616）是否合适
MAXIMUM_NON_CURRENT_FALLBACK_COST_TO_RUN_SHARE_OF_ALL_COST_TO_RUN_ROWS = 0.70

DATA_QUALITY_GUARDRAIL_STATUS_PASSED = "passed"
DATA_QUALITY_GUARDRAIL_STATUS_FAILED = "failed"
DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY = "warning_only"
DATA_QUALITY_GUARDRAIL_STATUS_SKIPPED_NOT_APPLICABLE = "skipped_not_applicable"
# 目录缓存里有结构有效的详情页、却没有任何被接受的分区时（例：API 升级到新 family 4.4、缓存全是
# 别的 family），当期 token 全部清零、有效速度口径没有参与分析的点。这里醒目告警并写出最佳候选分区
# 的一致率与拒绝原因，而不是让两项目录护栏静默「跳过」（R1-03 / R4-01）。
# 已拍板（R1-03）：维持「告警」——effective×raw、blended×raw 口径仍可用，不让整条管线停摆；
# 同时在契约顶层溯源写 embedded_model_catalog_partition_rejection_warning_text，前端页头醒目显示。
EMBEDDED_MODEL_CATALOG_WITHOUT_ACCEPTED_PARTITION_GUARDRAIL_STATUS = DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY

# build_dataframe 把本次取数的元数据挂在 DataFrame.attrs 上，供 CLI / builder 读取
MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE = "artificial_analysis_data_provenance"
MODELS_DATAFRAME_ATTRS_KEY_DATA_QUALITY_GUARDRAIL_RESULTS = (
    "artificial_analysis_data_quality_guardrail_results"
)
MODELS_DATAFRAME_ATTRS_KEY_EMBEDDED_MODEL_CATALOG_LOAD_SUMMARY = (
    "artificial_analysis_embedded_model_catalog_load_summary"
)


# ----------------------------------------------------------------------------- 通用小工具
def _utc_iso8601_timestamp_text(datetime_value: datetime) -> str:
    return datetime_value.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def _cache_file_modification_time_utc(cache_file_path: Path) -> datetime:
    return datetime.fromtimestamp(cache_file_path.stat().st_mtime, tz=timezone.utc)


def _optional_float(raw_value: object) -> float | None:
    """数值 → float；None / bool / 非数值 / NaN → None。"""
    if raw_value is None or isinstance(raw_value, bool):
        return None
    try:
        converted_value = float(raw_value)
    except (TypeError, ValueError):
        return None
    return None if math.isnan(converted_value) else converted_value


def _positive_float_or_none(raw_value: object) -> float | None:
    """非正数是 AA「无定价 / 未测」的 0 占位，与缺失同义。"""
    converted_value = _optional_float(raw_value)
    return converted_value if converted_value is not None and converted_value > 0 else None


# ----------------------------------------------------------------------------- 指数版本（规格 1.1）
_INTELLIGENCE_INDEX_VERSION_NUMBER_PATTERN = re.compile(r"(\d+(?:\.\d+)*)")


def normalize_intelligence_index_version_string(raw_version: object) -> str | None:
    """API 顶层版本可能是数值（如 4.1）或字符串（如 "4.3.2"、"v4.1.1"）；统一成 "4.3.2" 形式。"""
    if raw_version is None or isinstance(raw_version, bool):
        return None
    if isinstance(raw_version, float) and math.isnan(raw_version):
        return None
    version_number_match = _INTELLIGENCE_INDEX_VERSION_NUMBER_PATTERN.search(str(raw_version))
    return version_number_match.group(1) if version_number_match else None


def intelligence_index_version_family(version_string: object) -> str | None:
    """取 `major.minor`（"4.3.2" → "4.3"）；「是否当期」一律按 family 比较。"""
    normalized_version_string = normalize_intelligence_index_version_string(version_string)
    if normalized_version_string is None:
        return None
    return ".".join(normalized_version_string.split(".")[:2])


def _intelligence_index_version_sort_key(version_string: str) -> tuple[int, ...]:
    return tuple(int(version_part) for version_part in version_string.split("."))


# ----------------------------------------------------------------------------- 密钥
def get_api_key() -> str:
    if load_dotenv is not None:
        load_dotenv(ROOT / ".env")
    key = os.environ.get("ARTIFICIAL_ANALYSIS_API_KEY")
    if not key:
        sys.exit(
            "缺少 ARTIFICIAL_ANALYSIS_API_KEY：请 export 该环境变量，或在项目根写 .env"
        )
    return key


# ----------------------------------------------------------------------------- API 取数（带缓存与元数据，规格 1.6）
def _fetch_paginated_language_models_with_response_top_level_metadata(
    api_key: str,
) -> tuple[list[dict], dict]:
    """优先取 Pro 完整字段；权限不足时自动回退 Free 分页端点。

    返回 (rows, {"source_url", "tier", "intelligence_index_version"})；后两项取自第 1 页响应
    顶层（AA 响应本来就带，旧实现把它们丢掉了）。
    """
    rows: list[dict] = []
    page = 1
    selected_api_url = API_LANGUAGE_MODELS_PRO_URL
    first_page_response_top_level_metadata = {"tier": None, "intelligence_index_version": None}
    while True:
        resp = requests.get(
            selected_api_url,
            params={"page": page},
            headers={"x-api-key": api_key},
            timeout=120,
        )
        if (
            page == 1
            and selected_api_url == API_LANGUAGE_MODELS_PRO_URL
            and resp.status_code == 403
        ):
            selected_api_url = API_LANGUAGE_MODELS_FREE_URL
            continue
        resp.raise_for_status()
        payload = resp.json()
        if page == 1:
            first_page_response_top_level_metadata = {
                "tier": payload.get("tier"),
                "intelligence_index_version": payload.get("intelligence_index_version"),
            }
        rows.extend(payload["data"])
        if not payload.get("pagination", {}).get("has_more"):
            break
        page += 1
    return rows, {"source_url": selected_api_url, **first_page_response_top_level_metadata}


def _fetch_paginated_language_models(api_key: str) -> tuple[list[dict], str]:
    """兼容旧调用方：只返回 (rows, 实际使用的端点 URL)。"""
    rows, response_top_level_metadata = (
        _fetch_paginated_language_models_with_response_top_level_metadata(api_key)
    )
    return rows, response_top_level_metadata["source_url"]


def _write_text_file_atomically(target_file_path: Path, file_text: str) -> None:
    """API 与数值目录复用唯一暂存文件的原子写入；并发写入不会共享 .partial 文件。"""
    write_text_file_atomically(target_file_path,file_text)


# 响应历史文件名的护栏状态后缀（R1-04 / 复验风险 8）：刷新得到的新响应先以「待护栏校验」后缀写入历史，
# 护栏通过后改名去掉后缀，失败则改名为「被护栏拒绝」后缀。不带这两种后缀的历史文件 = 曾被采用为缓存
# 的响应（通过护栏，或护栏引入之前就在用的旧缓存），只有它们能当「上一份通过护栏的响应」基线。
API_LANGUAGE_MODELS_RESPONSE_HISTORY_FILE_NAME_SUFFIX_PENDING_DATA_QUALITY_GUARDRAIL_VALIDATION = (
    "_pending_data_quality_guardrail_validation"
)
API_LANGUAGE_MODELS_RESPONSE_HISTORY_FILE_NAME_SUFFIX_REJECTED_BY_DATA_QUALITY_GUARDRAILS = (
    "_rejected_by_data_quality_guardrails"
)
_GUARDRAIL_PASSED_API_LANGUAGE_MODELS_RESPONSE_HISTORY_FILE_NAME_PATTERN = re.compile(
    r"^artificial_analysis_api_language_models_response_fetched_at_(?P<fetched_at_compact_utc>\d{8}T\d{6}Z)"
    r"(?:_inferred_from_cache_file_modification_time)?\.json$"
)
# 每次刷新独有的文件名标记（进程号 + 随机串）：暂存文件、「待护栏校验 / 被护栏拒绝」历史文件都带它，
# 抓取时间落在同一秒的两次刷新也不会写到同一个文件（RVF-001 及其残留加固）
_REFRESH_ATTEMPT_UNIQUE_FILE_NAME_TOKEN_PATTERN = re.compile(r"_by_process_\d+_refresh_attempt_[0-9a-f]{12}$")


def _new_refresh_attempt_unique_file_name_token() -> str:
    return f"_by_process_{os.getpid()}_refresh_attempt_{uuid.uuid4().hex[:12]}"


def _api_language_models_response_history_file_name(
    fetched_at_datetime_utc: datetime,
    *,
    fetched_at_inferred_from_cache_file_modification_time: bool = False,
    data_quality_guardrail_status_file_name_suffix: str = "",
) -> str:
    return (
        "artificial_analysis_api_language_models_response_fetched_at_"
        f"{fetched_at_datetime_utc.astimezone(timezone.utc).strftime('%Y%m%dT%H%M%SZ')}"
        + (
            "_inferred_from_cache_file_modification_time"
            if fetched_at_inferred_from_cache_file_modification_time
            else ""
        )
        + data_quality_guardrail_status_file_name_suffix
        + ".json"
    )


def _api_language_models_response_history_file_path_with_guardrail_status_suffix(
    pending_response_history_file_path: Path,
    replacement_file_name_suffix: str,
) -> Path:
    """把「待护栏校验」后缀换成 replacement_file_name_suffix（通过时为空串，失败时为「被拒绝」后缀）。

    通过时连本次刷新的独有标记一起去掉：通过护栏的历史必须是纯时间戳名，才会被当作后续骤降护栏的
    基线，也才能与下次刷新归档旧缓存时的同名副本去重（同一秒两次都通过时后者覆盖前者，二者都是
    通过护栏的响应）。被拒的历史保留标记，同一秒的多次被拒互不覆盖。
    """
    pending_suffix_with_extension = (
        API_LANGUAGE_MODELS_RESPONSE_HISTORY_FILE_NAME_SUFFIX_PENDING_DATA_QUALITY_GUARDRAIL_VALIDATION + ".json"
    )
    if not pending_response_history_file_path.name.endswith(pending_suffix_with_extension):
        raise ValueError(f"不是待护栏校验的响应历史文件：{pending_response_history_file_path}")
    response_history_file_name_stem_without_pending_suffix = pending_response_history_file_path.name[
        : -len(pending_suffix_with_extension)
    ]
    if not replacement_file_name_suffix:
        response_history_file_name_stem_without_pending_suffix = (
            _REFRESH_ATTEMPT_UNIQUE_FILE_NAME_TOKEN_PATTERN.sub(
                "", response_history_file_name_stem_without_pending_suffix
            )
        )
    return pending_response_history_file_path.with_name(
        response_history_file_name_stem_without_pending_suffix + replacement_file_name_suffix + ".json"
    )


def mark_refreshed_api_language_models_response_history_file_with_guardrail_outcome(
    pending_response_history_file_path: Path,
    *,
    data_quality_guardrails_passed: bool,
) -> Path:
    """护栏有结论后，给本次刷新写进响应历史的文件改名：通过 → 去掉后缀；失败 → 「被护栏拒绝」后缀。"""
    pending_response_history_file_path = Path(pending_response_history_file_path)
    outcome_response_history_file_path = _api_language_models_response_history_file_path_with_guardrail_status_suffix(
        pending_response_history_file_path,
        ""
        if data_quality_guardrails_passed
        else API_LANGUAGE_MODELS_RESPONSE_HISTORY_FILE_NAME_SUFFIX_REJECTED_BY_DATA_QUALITY_GUARDRAILS,
    )
    finalize_guardrail_validated_response_history(pending_response_history_file_path,outcome_response_history_file_path)
    return outcome_response_history_file_path


def _current_api_cost_to_run_value_count_in_api_language_models_response_rows(api_model_rows: list[dict]) -> int:
    """API 当期成本条数 = artificial_analysis_intelligence_index_cost.total_cost 为正数的行数。"""
    return sum(
        1
        for api_model_row in api_model_rows
        if _positive_float_or_none(
            (api_model_row.get("artificial_analysis_intelligence_index_cost") or {}).get("total_cost")
        )
        is not None
    )


def find_previous_guardrail_passed_api_language_models_response_in_history(
    response_history_directory: Path | None,
    current_response_fetched_at_utc: str | None,
) -> tuple[Path, int] | None:
    """在响应历史里找「上一份通过护栏的响应」，返回 (路径, 其 API 当期成本条数)；没有可比基线时返回 None。

    只认不带「待护栏校验 / 被护栏拒绝」后缀的文件；抓取时间必须严格早于本次响应（排除本次响应
    自身的归档副本）；取其中最新的一份。文件损坏（不是 JSON、没有 data 列表）时跳过。
    """
    if response_history_directory is None or not Path(response_history_directory).is_dir():
        return None
    current_response_fetched_at_compact_utc = (
        datetime.strptime(current_response_fetched_at_utc, "%Y-%m-%dT%H:%M:%SZ").strftime("%Y%m%dT%H%M%SZ")
        if current_response_fetched_at_utc
        else None
    )
    candidate_history_file_paths_by_fetched_at = []
    for history_file_path in Path(response_history_directory).glob("*.json"):
        history_file_name_match = _GUARDRAIL_PASSED_API_LANGUAGE_MODELS_RESPONSE_HISTORY_FILE_NAME_PATTERN.match(
            history_file_path.name
        )
        if history_file_name_match is None:
            continue
        history_fetched_at_compact_utc = history_file_name_match.group("fetched_at_compact_utc")
        if (
            current_response_fetched_at_compact_utc is not None
            and history_fetched_at_compact_utc >= current_response_fetched_at_compact_utc
        ):
            continue
        candidate_history_file_paths_by_fetched_at.append((history_fetched_at_compact_utc, history_file_path))
    for _, history_file_path in sorted(candidate_history_file_paths_by_fetched_at, reverse=True):
        try:
            history_api_model_rows = json.loads(history_file_path.read_text(encoding="utf-8"))["data"]
        except (ValueError, KeyError, TypeError, OSError):
            print(f"[warn] 响应历史文件无法解析，不作比较基线：{history_file_path.name}")
            continue
        if not isinstance(history_api_model_rows, list):
            continue
        return history_file_path, _current_api_cost_to_run_value_count_in_api_language_models_response_rows(
            history_api_model_rows
        )
    return None


def _archive_existing_api_language_models_cache_into_response_history(
    api_language_models_cache_path: Path,
    response_history_directory: Path,
) -> Path | None:
    """刷新覆盖共享缓存之前，先把旧缓存原样复制进响应历史（R1-02）。

    文件名里的时间取缓存记录的 fetched_at_utc；旧缓存没有记录时按文件 mtime 推断，并在文件名里
    注明 `_inferred_from_cache_file_modification_time`。同名文件已存在（例：该响应抓取时已归档）
    则不重复写。返回归档路径（没有旧缓存时返回 None）。
    """
    if not api_language_models_cache_path.exists():
        return None
    previous_api_cache_text = api_language_models_cache_path.read_text(encoding="utf-8")
    recorded_fetched_at_datetime_utc = None
    try:
        recorded_fetched_at_text = json.loads(previous_api_cache_text).get("fetched_at_utc")
        if recorded_fetched_at_text:
            recorded_fetched_at_datetime_utc = datetime.strptime(
                recorded_fetched_at_text, "%Y-%m-%dT%H:%M:%SZ"
            ).replace(tzinfo=timezone.utc)
    except (ValueError, AttributeError):
        recorded_fetched_at_datetime_utc = None
    archived_api_cache_path = response_history_directory / (
        _api_language_models_response_history_file_name(recorded_fetched_at_datetime_utc)
        if recorded_fetched_at_datetime_utc is not None
        else _api_language_models_response_history_file_name(
            _cache_file_modification_time_utc(api_language_models_cache_path),
            fetched_at_inferred_from_cache_file_modification_time=True,
        )
    )
    if not archived_api_cache_path.exists():
        _write_text_file_atomically(archived_api_cache_path, previous_api_cache_text)
    return archived_api_cache_path


def refreshed_api_language_models_response_pending_cache_replacement_path(
    api_language_models_cache_path: Path,
    refreshed_response_fetched_at_datetime_utc: datetime,
    *,
    refresh_attempt_unique_file_name_token: str | None = None,
) -> Path:
    """刷新得到、尚未通过数据质量护栏的新响应暂存在缓存旁的这个文件里——每次刷新各用一个。

    文件名带本次抓取时间、进程号与随机后缀（RVF-001）：并发的两次 `--refresh` 不会写到同一个暂存
    文件，护栏通过后晋升进共享缓存的只能是本次刷新自己写下、自己校验过的响应；若所有刷新共用一个
    暂存路径，刷新 A 校验期间刷新 B 覆盖暂存并被护栏拒绝，A 晋升时就会把 B 被拒的响应装进缓存。
    """
    return api_language_models_cache_path.with_name(
        api_language_models_cache_path.stem
        + ".refreshed_response_fetched_at_"
        + refreshed_response_fetched_at_datetime_utc.astimezone(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
        + (refresh_attempt_unique_file_name_token or _new_refresh_attempt_unique_file_name_token())
        + "_pending_data_quality_guardrail_validation.json"
    )


def replace_api_language_models_cache_with_refreshed_response_after_guardrails_passed(
    refreshed_response_pending_cache_replacement_path: Path,
    api_language_models_cache_path: Path,
) -> None:
    """护栏通过后，用暂存的新响应原子替换共享缓存（同目录 os.replace）。"""
    GuardrailValidatedJsonResponseStorage(api_language_models_cache_path,api_language_models_cache_path.parent,
        pending_response_path=refreshed_response_pending_cache_replacement_path).promote(archive_existing=False)


def load_artificial_analysis_api_language_models_with_response_metadata(
    refresh: bool = False,
    *,
    api_language_models_cache_path: Path | None = None,
    api_language_models_response_history_directory: Path | None = None,
    defer_api_language_models_cache_replacement_until_guardrails_pass: bool = False,
) -> tuple[list[dict], dict]:
    """读 API 缓存（或 refresh 时真实拉取），返回 (rows, metadata)。

    metadata 键：source_url, tier, intelligence_index_version（统一为字符串）, fetched_at_utc,
    fetched_at_utc_source, refreshed_response_pending_cache_replacement_path,
    refreshed_response_history_file_path_pending_guardrail_validation。旧缓存没有记录
    抓取时间时，按缓存文件 mtime（UTC）推断并如实标注 `inferred_from_cache_file_modification_time`
    ——绝不用当前时间冒充。

    刷新时（R1-02）：先把旧缓存归档进响应历史，再把新响应写进响应历史；
    `defer_api_language_models_cache_replacement_until_guardrails_pass=True` 时新响应只写到
    缓存旁的暂存文件（路径见 metadata），由调用方在护栏通过后调用
    `replace_api_language_models_cache_with_refreshed_response_after_guardrails_passed` 替换；
    此时写进响应历史的那份带「待护栏校验」后缀，调用方用
    `mark_refreshed_api_language_models_response_history_file_with_guardrail_outcome` 按护栏结论改名。
    否则立即原子替换缓存，历史文件不带后缀。
    """
    api_language_models_cache_path = Path(
        api_language_models_cache_path
        if api_language_models_cache_path is not None
        else API_LANGUAGE_MODELS_CACHE
    )
    response_history_directory = Path(
        api_language_models_response_history_directory
        if api_language_models_response_history_directory is not None
        else ARTIFICIAL_ANALYSIS_API_LANGUAGE_MODELS_RESPONSE_HISTORY_DIRECTORY
    )
    if api_language_models_cache_path.exists() and not refresh:
        cached_api_response = json.loads(
            api_language_models_cache_path.read_text(encoding="utf-8")
        )
        recorded_fetched_at_utc = cached_api_response.get("fetched_at_utc")
        if recorded_fetched_at_utc:
            fetched_at_utc = recorded_fetched_at_utc
            fetched_at_utc_source = API_RESPONSE_FETCHED_AT_UTC_SOURCE_RECORDED_AT_FETCH_TIME
        else:
            fetched_at_utc = _utc_iso8601_timestamp_text(
                _cache_file_modification_time_utc(api_language_models_cache_path)
            )
            fetched_at_utc_source = (
                API_RESPONSE_FETCHED_AT_UTC_SOURCE_INFERRED_FROM_CACHE_FILE_MODIFICATION_TIME
            )
        return cached_api_response["data"], {
            "source_url": cached_api_response.get("source_url"),
            "tier": cached_api_response.get("tier"),
            "intelligence_index_version": normalize_intelligence_index_version_string(
                cached_api_response.get("intelligence_index_version")
            ),
            "fetched_at_utc": fetched_at_utc,
            "fetched_at_utc_source": fetched_at_utc_source,
            "refreshed_response_pending_cache_replacement_path": None,
            "refreshed_response_history_file_path_pending_guardrail_validation": None,
        }

    # 全部分页取完才落盘：中途分页失败时不写任何文件
    rows, response_top_level_metadata = (
        _fetch_paginated_language_models_with_response_top_level_metadata(get_api_key())
    )
    fetched_at_datetime_utc = datetime.now(timezone.utc)
    fetched_at_utc = _utc_iso8601_timestamp_text(fetched_at_datetime_utc)
    api_response_cache_payload = {
        "source_url": response_top_level_metadata["source_url"],
        "tier": response_top_level_metadata["tier"],
        "intelligence_index_version": response_top_level_metadata["intelligence_index_version"],
        "fetched_at_utc": fetched_at_utc,
        "data": rows,
    }
    _archive_existing_api_language_models_cache_into_response_history(
        api_language_models_cache_path, response_history_directory
    )
    # 延后替换缓存时，新响应在历史里先带「本次刷新独有标记 + 待护栏校验」后缀，护栏有结论后由调用方
    # 改名（R1-04）；暂存文件用同一个标记，便于对照同一次刷新的两份文件
    refresh_attempt_unique_file_name_token = _new_refresh_attempt_unique_file_name_token()
    refreshed_response_history_file_path = response_history_directory / _api_language_models_response_history_file_name(
        fetched_at_datetime_utc,
        data_quality_guardrail_status_file_name_suffix=(
            refresh_attempt_unique_file_name_token
            + API_LANGUAGE_MODELS_RESPONSE_HISTORY_FILE_NAME_SUFFIX_PENDING_DATA_QUALITY_GUARDRAIL_VALIDATION
            if defer_api_language_models_cache_replacement_until_guardrails_pass
            else ""
        ),
    )
    refreshed_response_pending_cache_replacement_path = (
        refreshed_api_language_models_response_pending_cache_replacement_path(
            api_language_models_cache_path,
            fetched_at_datetime_utc,
            refresh_attempt_unique_file_name_token=refresh_attempt_unique_file_name_token,
        )
    )
    response_storage=GuardrailValidatedJsonResponseStorage(api_language_models_cache_path,response_history_directory)
    response_storage.stage(api_response_cache_payload,response_name_prefix="artificial_analysis_api_language_models_response",
        pending_response_path=refreshed_response_pending_cache_replacement_path,
        pending_history_path=refreshed_response_history_file_path)
    if not defer_api_language_models_cache_replacement_until_guardrails_pass:
        response_storage.promote(archive_existing=False)
        refreshed_response_pending_cache_replacement_path=None
    return rows, {
        "source_url": response_top_level_metadata["source_url"],
        "tier": response_top_level_metadata["tier"],
        "intelligence_index_version": normalize_intelligence_index_version_string(
            response_top_level_metadata["intelligence_index_version"]
        ),
        "fetched_at_utc": fetched_at_utc,
        "fetched_at_utc_source": API_RESPONSE_FETCHED_AT_UTC_SOURCE_RECORDED_AT_FETCH_TIME,
        "refreshed_response_pending_cache_replacement_path": (
            str(refreshed_response_pending_cache_replacement_path)
            if refreshed_response_pending_cache_replacement_path is not None
            else None
        ),
        "refreshed_response_history_file_path_pending_guardrail_validation": (
            str(refreshed_response_history_file_path)
            if defer_api_language_models_cache_replacement_until_guardrails_pass
            else None
        ),
    }


def fetch_api(refresh: bool = False) -> list[dict]:
    """兼容旧签名：只返回 API 模型行。"""
    rows, _ = load_artificial_analysis_api_language_models_with_response_metadata(refresh)
    return rows


# ----------------------------------------------------------------------------- 网页（默认暂停抓取，D-12）
ARTIFICIAL_ANALYSIS_WEBSITE_PAGE_FETCH_PAUSED_NOTICE_TEXT = (
    "[info] 已暂停网页抓取（D-12）：只读已有缓存，不发网页请求"
)
_artificial_analysis_website_page_fetch_paused_notice_already_printed = False


def _print_artificial_analysis_website_page_fetch_paused_notice_once() -> None:
    global _artificial_analysis_website_page_fetch_paused_notice_already_printed
    if _artificial_analysis_website_page_fetch_paused_notice_already_printed:
        return
    print(ARTIFICIAL_ANALYSIS_WEBSITE_PAGE_FETCH_PAUSED_NOTICE_TEXT)
    _artificial_analysis_website_page_fetch_paused_notice_already_printed = True


def _read_legacy_website_html_cache_without_network_requests(
    page_html_cache_path: Path,
    *,
    allow_artificial_analysis_website_page_fetch: bool,
) -> str | None:
    """旧单页接口只读 HTML 缓存；新网页请求统一经过受限批次入口，不再保存新 HTML。"""
    if not allow_artificial_analysis_website_page_fetch:
        _print_artificial_analysis_website_page_fetch_paused_notice_once()
    if page_html_cache_path.exists():
        return page_html_cache_path.read_text(encoding="utf-8", errors="ignore")
    return None


def fetch_artificial_analysis_models_page_html(
    refresh: bool = False,
    *,
    allow_artificial_analysis_website_page_fetch: bool = False,
) -> str | None:
    """旧调用方兼容入口；`build_dataframe` 已不调用它（列表页只读缓存、从不联网，R3-F3）。"""
    return _read_legacy_website_html_cache_without_network_requests(
        ARTIFICIAL_ANALYSIS_MODELS_LIST_PAGE_HTML_CACHE_PATH,
        allow_artificial_analysis_website_page_fetch=allow_artificial_analysis_website_page_fetch,
    )


def fetch_artificial_analysis_model_detail_page_html(
    model_slug: str,
    refresh: bool = False,
    *,
    allow_artificial_analysis_website_page_fetch: bool = False,
    model_detail_page_html_cache_directory: Path | None = None,
) -> str | None:
    """兼容旧调用，只读既有 HTML；受限网页刷新通过 build_dataframe 执行。"""
    cache_directory = (
        Path(model_detail_page_html_cache_directory)
        if model_detail_page_html_cache_directory is not None
        else ARTIFICIAL_ANALYSIS_MODEL_DETAIL_PAGE_HTML_CACHE_DIRECTORY
    )
    return _read_legacy_website_html_cache_without_network_requests(
        cache_directory / f"{model_slug}.html",
        allow_artificial_analysis_website_page_fetch=allow_artificial_analysis_website_page_fetch,
    )


# ----------------------------------------------------------------------------- 列表页（只做告警，不再是值来源）
# AA 已把 payload 改为 camelCase，这两个 snake_case 正则在真实缓存上 0 命中；保留解析函数
# 只为「解析 0 条」的醒目告警与旧调用方兼容（V-2：成本全部可由 API 提供）。
_COST_RE = re.compile(r'"intelligence_index_cost":\{"total_cost":([0-9.eE+-]+)')
_MID_RE = re.compile(r'"model_id":"([0-9a-f-]{36})"')
_PERM_RE = re.compile(r'"intelligence_index_per_m_output_tokens":([0-9.eE+-]+)')


def parse_cost_by_model_id(page_html: str) -> dict[str, float]:
    """从列表页 payload 解析 {model_id(uuid): total_cost}（snake_case 旧格式）。

    每个带 total_cost 的对象里，最近的前一个 `model_id` 就是该记录所属模型。
    非正 total_cost 是「无托管定价」的占位，不收录。
    """
    u = page_html.replace('\\"', '"').replace("\\\\", "\\")
    out: dict[str, float] = {}
    for m in _COST_RE.finditer(u):
        back = u[max(0, m.start() - 12000):m.start()]
        mids = _MID_RE.findall(back)
        if not mids:
            continue
        mid = mids[-1]
        cost = float(m.group(1))
        if cost <= 0:
            continue
        if mid not in out or cost < out[mid]:
            out[mid] = cost
    return out


def parse_intel_per_m_by_model_id(page_html: str) -> dict[str, float]:
    """解析 {model_id(uuid): intelligence_index_per_m_output_tokens}（snake_case 旧格式）。"""
    u = page_html.replace('\\"', '"').replace("\\\\", "\\")
    out: dict[str, float] = {}
    for m in _PERM_RE.finditer(u):
        back = u[max(0, m.start() - 12000):m.start()]
        mids = _MID_RE.findall(back)
        if not mids:
            continue
        val = float(m.group(1))
        if val > 0:
            out.setdefault(mids[-1], val)
    return out


# ----------------------------------------------------------------------------- 详情页内嵌目录解析（规格 2.2）
# 「展开循环」写法 "[^"\\]*(?:\\.[^"\\]*)*"：与 (?:[^"\\]|\\.)* 匹配结果相同，
# 在 3–4MB 的真实缓存页上快约 4.5 倍（逐字符交替分支是主要耗时）
_NEXT_JS_REACT_SERVER_COMPONENT_PAYLOAD_PUSH_PATTERN = re.compile(
    r'self\.__next_f\.push\(\[1,"([^"\\]*(?:\\.[^"\\]*)*)"\]\)'
)
_ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_OBJECT_START_PATTERN = re.compile(
    r'\{"id":"([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})","slug":"'
)
_ARTIFICIAL_ANALYSIS_CURRENT_MODEL_ID_PATTERN = re.compile(
    r'"currentModel":\{"id":"([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})"'
)
_ARTIFICIAL_ANALYSIS_INTELLIGENCE_INDEX_VERSION_STRING_PATTERN = re.compile(
    r"Intelligence Index v(\d+(?:\.\d+)+)"
)


@dataclass(frozen=True)
class ArtificialAnalysisEmbeddedModelCatalogRecord:
    """详情页 RSC payload 里内嵌的一条模型目录记录（字段已转为 snake_case，缺失为 None）。"""

    name: str | None
    slug: str | None
    intelligence_index: float | None
    intelligence_index_is_estimated: bool | None
    intelligence_index_cost_total_usd: float | None
    canonical_output_token_count: float | None
    # 单位：秒（图表字段 timePerTask 才是分钟，V-4）
    intelligence_index_time_per_task_seconds: float | None
    is_reasoning: bool | None
    reasoning_effort_slug: str | None
    release_slug: str | None
    price_1m_blended_7_to_2_to_1: float | None


ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_RECORD_FIELD_NAMES = tuple(
    record_field.name for record_field in dataclasses.fields(ArtificialAnalysisEmbeddedModelCatalogRecord)
)


class ArtificialAnalysisModelDetailPageReactServerComponentPayloadDecodeError(ValueError):
    """RSC 片段无法按 JSON 字符串解码（页面结构问题，与「同 UUID 值冲突」区分开）。"""


def _decode_next_js_react_server_component_payload_text_from_page_html(page_html: str) -> str:
    """拼接全部 `self.__next_f.push([1,"..."])` 片段，每段按 JSON 字符串解码。"""
    decoded_payload_chunks = []
    for payload_chunk_index, escaped_payload_chunk in enumerate(
        _NEXT_JS_REACT_SERVER_COMPONENT_PAYLOAD_PUSH_PATTERN.findall(page_html)
    ):
        try:
            decoded_payload_chunks.append(json.loads('"' + escaped_payload_chunk + '"'))
        except json.JSONDecodeError as decode_error:
            raise ArtificialAnalysisModelDetailPageReactServerComponentPayloadDecodeError(
                f"RSC payload 第 {payload_chunk_index} 段无法按 JSON 字符串解码: {decode_error}"
            ) from decode_error
    return "".join(decoded_payload_chunks)


def _slug_from_nested_object_or_string(raw_value: object) -> str | None:
    if isinstance(raw_value, dict):
        nested_slug = raw_value.get("slug")
        return nested_slug if isinstance(nested_slug, str) else None
    return raw_value if isinstance(raw_value, str) else None


def _embedded_model_catalog_record_from_embedded_model_object(
    embedded_model_object: dict,
) -> ArtificialAnalysisEmbeddedModelCatalogRecord:
    intelligence_index_cost = embedded_model_object.get("intelligenceIndexCost")
    canonical_token_count = embedded_model_object.get("canonicalIntelligenceIndexTokenCount")
    release = embedded_model_object.get("release")
    intelligence_index_is_estimated = embedded_model_object.get("intelligenceIndexIsEstimated")
    is_reasoning = embedded_model_object.get("isReasoning")
    return ArtificialAnalysisEmbeddedModelCatalogRecord(
        name=embedded_model_object.get("name"),
        slug=embedded_model_object.get("slug"),
        intelligence_index=_optional_float(embedded_model_object.get("intelligenceIndex")),
        intelligence_index_is_estimated=(
            intelligence_index_is_estimated if isinstance(intelligence_index_is_estimated, bool) else None
        ),
        intelligence_index_cost_total_usd=(
            _optional_float(intelligence_index_cost.get("total"))
            if isinstance(intelligence_index_cost, dict)
            else None
        ),
        canonical_output_token_count=(
            _optional_float(canonical_token_count.get("output"))
            if isinstance(canonical_token_count, dict)
            else None
        ),
        intelligence_index_time_per_task_seconds=_optional_float(
            embedded_model_object.get("intelligenceIndexTimePerTask")
        ),
        is_reasoning=is_reasoning if isinstance(is_reasoning, bool) else None,
        reasoning_effort_slug=_slug_from_nested_object_or_string(embedded_model_object.get("effort")),
        release_slug=(
            _slug_from_nested_object_or_string(release) if isinstance(release, dict) else None
        ),
        price_1m_blended_7_to_2_to_1=_optional_float(
            embedded_model_object.get("price1mBlended7To2To1")
        ),
    )


def _embedded_model_catalog_field_values_agree(first_value: object, second_value: object) -> bool:
    if isinstance(first_value, float) and isinstance(second_value, float):
        return abs(first_value - second_value) <= 1e-9 * max(1.0, abs(first_value), abs(second_value))
    return first_value == second_value


def _merge_embedded_model_catalog_records_or_raise(
    model_id: str,
    existing_record: ArtificialAnalysisEmbeddedModelCatalogRecord,
    incoming_record: ArtificialAnalysisEmbeddedModelCatalogRecord,
    conflict_context_description: str,
) -> ArtificialAnalysisEmbeddedModelCatalogRecord:
    """字段互补合并；同一字段两边都有值且不一致 → ValueError（显式报错，不静默择一）。"""
    merged_field_values = {}
    for record_field_name in ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_RECORD_FIELD_NAMES:
        existing_value = getattr(existing_record, record_field_name)
        incoming_value = getattr(incoming_record, record_field_name)
        if existing_value is None:
            merged_field_values[record_field_name] = incoming_value
        elif incoming_value is None or _embedded_model_catalog_field_values_agree(
            existing_value, incoming_value
        ):
            merged_field_values[record_field_name] = existing_value
        else:
            raise ValueError(
                f"内嵌目录同一 UUID {model_id} 的字段 {record_field_name} 冲突："
                f"{existing_value!r} ≠ {incoming_value!r}（{conflict_context_description}）"
            )
    return ArtificialAnalysisEmbeddedModelCatalogRecord(**merged_field_values)


def parse_artificial_analysis_embedded_model_catalog_records_from_model_detail_page_html(
    page_html: str,
) -> dict[str, ArtificialAnalysisEmbeddedModelCatalogRecord]:
    """从一页详情页 HTML 抽取整份内嵌模型目录 {uuid: record}。

    在拼接解码后的 RSC 文本里定位 `{"id":"<uuid>","slug":"`，用 `raw_decode` 取完整对象；
    只收含 `intelligenceIndex` 或 `intelligenceIndexIsEstimated` 的对象（其余是只有
    id/slug/name 的引用）。同页同 UUID 多次出现时字段互补合并，值冲突抛 ValueError。
    """
    return _parse_embedded_model_catalog_records_from_react_server_component_payload_text(
        _decode_next_js_react_server_component_payload_text_from_page_html(page_html)
    )


def _parse_embedded_model_catalog_records_from_react_server_component_payload_text(
    react_server_component_payload_text: str,
) -> dict[str, ArtificialAnalysisEmbeddedModelCatalogRecord]:
    json_decoder = json.JSONDecoder()
    records_by_model_id: dict[str, ArtificialAnalysisEmbeddedModelCatalogRecord] = {}
    for embedded_model_object_start_match in _ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_OBJECT_START_PATTERN.finditer(
        react_server_component_payload_text
    ):
        try:
            embedded_model_object, _ = json_decoder.raw_decode(
                react_server_component_payload_text,
                embedded_model_object_start_match.start(),
            )
        except json.JSONDecodeError:
            # 结构校验已排除残缺页；这里只可能是字符串内容恰好像对象开头，跳过即可
            continue
        if (
            "intelligenceIndex" not in embedded_model_object
            and "intelligenceIndexIsEstimated" not in embedded_model_object
        ):
            continue
        model_id = embedded_model_object["id"]
        incoming_record = _embedded_model_catalog_record_from_embedded_model_object(
            embedded_model_object
        )
        if model_id in records_by_model_id:
            records_by_model_id[model_id] = _merge_embedded_model_catalog_records_or_raise(
                model_id,
                records_by_model_id[model_id],
                incoming_record,
                "同页多次出现",
            )
        else:
            records_by_model_id[model_id] = incoming_record
    return records_by_model_id


def parse_canonical_output_token_count_from_artificial_analysis_model_detail_page_html(
    page_html: str,
) -> float | None:
    """返回本页 `currentModel` 自身的输出 token 数（修 P0-3：不再取「全页首个匹配」）。

    找不到 currentModel、或目录中该 UUID 的对象没有 token（或非正）→ None。
    """
    try:
        react_server_component_payload_text = (
            _decode_next_js_react_server_component_payload_text_from_page_html(page_html)
        )
    except ArtificialAnalysisModelDetailPageReactServerComponentPayloadDecodeError:
        return None
    current_model_id_match = _ARTIFICIAL_ANALYSIS_CURRENT_MODEL_ID_PATTERN.search(
        react_server_component_payload_text
    )
    if current_model_id_match is None:
        return None
    current_model_id = current_model_id_match.group(1)
    current_model_record = _parse_embedded_model_catalog_records_from_react_server_component_payload_text(
        react_server_component_payload_text
    ).get(current_model_id)
    if current_model_record is None:
        return None
    return _positive_float_or_none(current_model_record.canonical_output_token_count)


def find_artificial_analysis_model_detail_page_html_structure_invalidity_reason(
    page_html: str,
) -> str | None:
    """结构校验：返回无效原因（中文），有效返回 None。

    残缺缓存页（例：恰 2,048,000 字节、没有 `</html>`）的残片不得取数。
    """
    if not page_html.rstrip().endswith("</html>"):
        return "页面去尾空白后不以 </html> 结尾（疑似截断的残缺缓存页）"
    if _NEXT_JS_REACT_SERVER_COMPONENT_PAYLOAD_PUSH_PATTERN.search(page_html) is None:
        return "页面不含任何 self.__next_f.push([1,\"...\"]) RSC 片段"
    return None


# ----------------------------------------------------------------------------- 目录分区加载器（规格 2.2）
@dataclass(frozen=True)
class ArtificialAnalysisEmbeddedModelCatalogPartitionSummary:
    """一个缓存批次分区 = (页面指数版本 family, 缓存 mtime 的 UTC 日期)。"""

    intelligence_index_version_family: str | None
    cache_file_modification_date_utc: str
    page_intelligence_index_versions: tuple[str, ...]
    most_specific_intelligence_index_version: str | None
    page_file_names: tuple[str, ...]
    page_count: int
    latest_cache_file_modification_time_utc: str
    record_count: int
    record_with_output_token_count_count: int
    # 接受条件（R1-01 (a)）：与 API 的 UUID 交集里带 token 的记录数 ≥ 最小护栏
    record_with_output_token_count_in_api_uuid_intersection_count: int
    intelligence_compared_with_api_model_count: int
    intelligence_agreeing_with_api_model_count: int
    # 诊断量（不再是接受门槛）：低于告警线时打印告警
    intelligence_agreement_rate_with_api: float | None
    value_conflict_descriptions: tuple[str, ...]
    meets_acceptance_criteria: bool
    is_accepted: bool
    rejection_reasons: tuple[str, ...]


@dataclass(frozen=True)
class ArtificialAnalysisEmbeddedModelCatalogLoadResult:
    """离线目录加载结果；只含**一个**被接受分区的记录（或为空）。"""

    cache_directory: str
    records_by_model_id: dict[str, ArtificialAnalysisEmbeddedModelCatalogRecord]
    accepted_partition_intelligence_index_version: str | None
    accepted_partition_captured_at_utc: str | None
    page_cache_file_modification_time_utc_by_model_id: dict[str, str]
    invalid_page_file_names: tuple[str, ...]
    invalid_page_reasons_by_file_name: dict[str, str]
    partition_summaries: tuple[ArtificialAnalysisEmbeddedModelCatalogPartitionSummary, ...]
    catalog_vs_api_cost_agreement_rate: float | None
    catalog_vs_api_cost_compared_model_count: int
    catalog_vs_api_intelligence_agreement_rate: float | None
    catalog_vs_api_intelligence_compared_model_count: int
    missing_field_record_counts_by_field_name: dict[str, int] = field(default_factory=dict)


@dataclass
class _ParsedCachedModelDetailPage:
    page_file_name: str
    cache_file_modification_time_utc: datetime
    page_intelligence_index_versions: tuple[str, ...]
    records_by_model_id: dict[str, ArtificialAnalysisEmbeddedModelCatalogRecord]
    in_page_value_conflict_description: str | None


def _intelligence_agreement_counts_with_api(
    records_by_model_id: dict[str, ArtificialAnalysisEmbeddedModelCatalogRecord],
    api_intelligence_by_model_id: dict[str, object],
) -> tuple[int, int]:
    """返回 (可比对的 UUID 数, 一致数)；一致 = |目录 − API| ≤ 容差。"""
    compared_model_count = 0
    agreeing_model_count = 0
    for model_id, catalog_record in records_by_model_id.items():
        api_intelligence_index = _optional_float(api_intelligence_by_model_id.get(model_id))
        if api_intelligence_index is None or catalog_record.intelligence_index is None:
            continue
        compared_model_count += 1
        if (
            abs(api_intelligence_index - catalog_record.intelligence_index)
            <= EMBEDDED_MODEL_CATALOG_INTELLIGENCE_AGREEMENT_ABSOLUTE_TOLERANCE + 1e-9
        ):
            agreeing_model_count += 1
    return compared_model_count, agreeing_model_count


def _cost_agreement_counts_with_api(
    records_by_model_id: dict[str, ArtificialAnalysisEmbeddedModelCatalogRecord],
    api_intelligence_index_cost_total_usd_by_model_id: dict[str, object],
) -> tuple[int, int]:
    """返回 (可比对的 UUID 数, 一致数)；两边都 > 0 才比对，一致 = 相对误差 < 0.1%。"""
    compared_model_count = 0
    agreeing_model_count = 0
    for model_id, catalog_record in records_by_model_id.items():
        api_cost_total_usd = _positive_float_or_none(
            api_intelligence_index_cost_total_usd_by_model_id.get(model_id)
        )
        catalog_cost_total_usd = _positive_float_or_none(
            catalog_record.intelligence_index_cost_total_usd
        )
        if api_cost_total_usd is None or catalog_cost_total_usd is None:
            continue
        compared_model_count += 1
        if (
            abs(catalog_cost_total_usd - api_cost_total_usd) / api_cost_total_usd
            < CATALOG_VS_API_COST_TO_RUN_AGREEMENT_MAXIMUM_RELATIVE_ERROR
        ):
            agreeing_model_count += 1
    return compared_model_count, agreeing_model_count


def _empty_embedded_model_catalog_load_result(
    cache_directory: Path,
    *,
    invalid_page_reasons_by_file_name: dict[str, str] | None = None,
    partition_summaries: tuple[ArtificialAnalysisEmbeddedModelCatalogPartitionSummary, ...] = (),
) -> ArtificialAnalysisEmbeddedModelCatalogLoadResult:
    invalid_page_reasons_by_file_name = invalid_page_reasons_by_file_name or {}
    return ArtificialAnalysisEmbeddedModelCatalogLoadResult(
        cache_directory=str(cache_directory),
        records_by_model_id={},
        accepted_partition_intelligence_index_version=None,
        accepted_partition_captured_at_utc=None,
        page_cache_file_modification_time_utc_by_model_id={},
        invalid_page_file_names=tuple(sorted(invalid_page_reasons_by_file_name)),
        invalid_page_reasons_by_file_name=invalid_page_reasons_by_file_name,
        partition_summaries=partition_summaries,
        catalog_vs_api_cost_agreement_rate=None,
        catalog_vs_api_cost_compared_model_count=0,
        catalog_vs_api_intelligence_agreement_rate=None,
        catalog_vs_api_intelligence_compared_model_count=0,
        missing_field_record_counts_by_field_name={},
    )


def load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
    cache_directory: Path | str,
    api_intelligence_by_model_id: dict[str, object],
    api_intelligence_index_version: object = None,
    *,
    api_intelligence_index_cost_total_usd_by_model_id: dict[str, object] | None = None,
    minimum_record_with_output_token_count_for_partition_acceptance: int = (
        EMBEDDED_MODEL_CATALOG_PARTITION_MINIMUM_RECORD_WITH_OUTPUT_TOKEN_COUNT
    ),
) -> ArtificialAnalysisEmbeddedModelCatalogLoadResult:
    """只读已有详情页缓存，按分区规则返回**一个**被接受分区的内嵌目录。

    规则（规格 2.2，R1-01 (a) 修订）：
    1. 结构校验不过的页（残缺、无 RSC 片段、片段解码失败）记为无效页，告警并跳过；
    2. 页面版本 = 页内「Intelligence Index vX」中最具体的一个；按 (版本 family, mtime UTC 日期) 分区；
    3. 接受条件：版本 family 与当期一致（API 版本已知时与 API 比；未知时推定当期 family = 与 API
       智能分一致率最高的分区的 family）、与 API 的 UUID 交集里带 token 的记录数 ≥ 最小护栏。
       分区级智能分一致率**不再是门槛**，只作诊断量记录，低于 99% 时告警；
       逐 UUID 的当期判定（目录智能分与 API 一致才算当期）在合表时做；
    4. 只用一个分区（多个合格时取 mtime 最新者并告警其余）；被采用分区内同 UUID 冲突 → ValueError；
    5. 字段缺失按字段计数告警一次，缺失值保留为 None、不做推断。
    """
    cache_directory = Path(cache_directory)
    api_intelligence_index_cost_total_usd_by_model_id = (
        api_intelligence_index_cost_total_usd_by_model_id or {}
    )
    api_intelligence_index_version_family = intelligence_index_version_family(
        api_intelligence_index_version
    )
    if not cache_directory.is_dir():
        print(f"[warn] 详情页缓存目录不存在，内嵌目录为空（当期 token 全缺）：{cache_directory}")
        return _empty_embedded_model_catalog_load_result(cache_directory)

    invalid_page_reasons_by_file_name: dict[str, str] = {}
    parsed_pages_by_partition_key: dict[tuple[str | None, str], list[_ParsedCachedModelDetailPage]] = (
        defaultdict(list)
    )
    for cached_page_path in sorted(cache_directory.glob("*.html")):
        page_html = cached_page_path.read_text(encoding="utf-8", errors="ignore")
        structure_invalidity_reason = (
            find_artificial_analysis_model_detail_page_html_structure_invalidity_reason(page_html)
        )
        in_page_value_conflict_description = None
        page_records_by_model_id: dict[str, ArtificialAnalysisEmbeddedModelCatalogRecord] = {}
        if structure_invalidity_reason is None:
            try:
                page_records_by_model_id = (
                    parse_artificial_analysis_embedded_model_catalog_records_from_model_detail_page_html(
                        page_html
                    )
                )
            except ArtificialAnalysisModelDetailPageReactServerComponentPayloadDecodeError as decode_error:
                structure_invalidity_reason = str(decode_error)
            except ValueError as in_page_value_conflict_error:
                in_page_value_conflict_description = (
                    f"{cached_page_path.name}: {in_page_value_conflict_error}"
                )
        if structure_invalidity_reason is not None:
            invalid_page_reasons_by_file_name[cached_page_path.name] = structure_invalidity_reason
            continue
        page_intelligence_index_versions = tuple(
            sorted(
                set(_ARTIFICIAL_ANALYSIS_INTELLIGENCE_INDEX_VERSION_STRING_PATTERN.findall(page_html)),
                key=_intelligence_index_version_sort_key,
            )
        )
        most_specific_page_version = (
            page_intelligence_index_versions[-1] if page_intelligence_index_versions else None
        )
        cache_file_modification_time_utc = _cache_file_modification_time_utc(cached_page_path)
        partition_key = (
            intelligence_index_version_family(most_specific_page_version),
            cache_file_modification_time_utc.date().isoformat(),
        )
        parsed_pages_by_partition_key[partition_key].append(
            _ParsedCachedModelDetailPage(
                page_file_name=cached_page_path.name,
                cache_file_modification_time_utc=cache_file_modification_time_utc,
                page_intelligence_index_versions=page_intelligence_index_versions,
                records_by_model_id=page_records_by_model_id,
                in_page_value_conflict_description=in_page_value_conflict_description,
            )
        )
    for invalid_page_file_name, invalidity_reason in sorted(invalid_page_reasons_by_file_name.items()):
        print(f"[warn] 详情页缓存结构无效，已跳过、不取残片数据：{invalid_page_file_name}（{invalidity_reason}）")

    # 逐分区合并记录、统计一致率、判定是否合格
    partition_candidates = []
    for partition_key, parsed_pages in parsed_pages_by_partition_key.items():
        partition_records_by_model_id: dict[str, ArtificialAnalysisEmbeddedModelCatalogRecord] = {}
        partition_record_page_time_by_model_id: dict[str, datetime] = {}
        value_conflict_descriptions = []
        for parsed_page in sorted(parsed_pages, key=lambda page: page.page_file_name):
            if parsed_page.in_page_value_conflict_description is not None:
                value_conflict_descriptions.append(parsed_page.in_page_value_conflict_description)
            for model_id, page_record in parsed_page.records_by_model_id.items():
                if model_id in partition_records_by_model_id:
                    try:
                        partition_records_by_model_id[model_id] = (
                            _merge_embedded_model_catalog_records_or_raise(
                                model_id,
                                partition_records_by_model_id[model_id],
                                page_record,
                                f"跨页，页面 {parsed_page.page_file_name}",
                            )
                        )
                    except ValueError as cross_page_conflict_error:
                        value_conflict_descriptions.append(str(cross_page_conflict_error))
                        continue
                    partition_record_page_time_by_model_id[model_id] = max(
                        partition_record_page_time_by_model_id[model_id],
                        parsed_page.cache_file_modification_time_utc,
                    )
                else:
                    partition_records_by_model_id[model_id] = page_record
                    partition_record_page_time_by_model_id[model_id] = (
                        parsed_page.cache_file_modification_time_utc
                    )
        page_intelligence_index_versions = tuple(
            sorted(
                {
                    page_version
                    for parsed_page in parsed_pages
                    for page_version in parsed_page.page_intelligence_index_versions
                },
                key=_intelligence_index_version_sort_key,
            )
        )
        most_specific_versions = [
            parsed_page.page_intelligence_index_versions[-1]
            for parsed_page in parsed_pages
            if parsed_page.page_intelligence_index_versions
        ]
        most_specific_partition_version = (
            max(most_specific_versions, key=_intelligence_index_version_sort_key)
            if most_specific_versions
            else None
        )
        intelligence_compared_count, intelligence_agreeing_count = (
            _intelligence_agreement_counts_with_api(
                partition_records_by_model_id, api_intelligence_by_model_id
            )
        )
        intelligence_agreement_rate = (
            intelligence_agreeing_count / intelligence_compared_count
            if intelligence_compared_count
            else None
        )
        record_with_output_token_count_count = sum(
            1
            for catalog_record in partition_records_by_model_id.values()
            if _positive_float_or_none(catalog_record.canonical_output_token_count) is not None
        )
        record_with_output_token_count_in_api_uuid_intersection_count = sum(
            1
            for model_id, catalog_record in partition_records_by_model_id.items()
            if model_id in api_intelligence_by_model_id
            and _positive_float_or_none(catalog_record.canonical_output_token_count) is not None
        )
        rejection_reasons = []
        if (
            record_with_output_token_count_in_api_uuid_intersection_count
            < minimum_record_with_output_token_count_for_partition_acceptance
        ):
            rejection_reasons.append(
                f"与 API 的 UUID 交集里带 token 记录 "
                f"{record_with_output_token_count_in_api_uuid_intersection_count} 条 < 最小护栏 "
                f"{minimum_record_with_output_token_count_for_partition_acceptance}"
            )
        partition_candidates.append(
            {
                "partition_key": partition_key,
                "parsed_pages": parsed_pages,
                "records_by_model_id": partition_records_by_model_id,
                "record_page_time_by_model_id": partition_record_page_time_by_model_id,
                "value_conflict_descriptions": value_conflict_descriptions,
                "page_intelligence_index_versions": page_intelligence_index_versions,
                "most_specific_partition_version": most_specific_partition_version,
                "latest_cache_file_modification_time_utc": max(
                    parsed_page.cache_file_modification_time_utc for parsed_page in parsed_pages
                ),
                "intelligence_compared_count": intelligence_compared_count,
                "intelligence_agreeing_count": intelligence_agreeing_count,
                "intelligence_agreement_rate": intelligence_agreement_rate,
                "record_with_output_token_count_count": record_with_output_token_count_count,
                "record_with_output_token_count_in_api_uuid_intersection_count": (
                    record_with_output_token_count_in_api_uuid_intersection_count
                ),
                "rejection_reasons": rejection_reasons,
            }
        )

    # 当期版本 family：API 已知时取 API；未知时推定为「与 API 智能分一致率最高」的分区的 family
    # （同率取 mtime 最新）。一致率在这里只用来识别版本，不作接受门槛（R1-01 (a)）。
    # EXPERIMENT_NODE: API 版本未知时按「一致率最高的分区」推定当期 family；是否改为要求一致率下限或直接视为无当期目录
    current_intelligence_index_version_family_for_partition_acceptance = (
        api_intelligence_index_version_family
    )
    if current_intelligence_index_version_family_for_partition_acceptance is None:
        partition_candidates_with_known_version_family = [
            candidate for candidate in partition_candidates if candidate["partition_key"][0] is not None
        ]
        if partition_candidates_with_known_version_family:
            best_agreeing_partition_candidate = max(
                partition_candidates_with_known_version_family,
                key=lambda candidate: (
                    candidate["intelligence_agreement_rate"]
                    if candidate["intelligence_agreement_rate"] is not None
                    else -1.0,
                    candidate["latest_cache_file_modification_time_utc"],
                ),
            )
            current_intelligence_index_version_family_for_partition_acceptance = (
                best_agreeing_partition_candidate["partition_key"][0]
            )
            print(
                "[warn] API 版本未知，按与 API 智能分一致率最高的目录分区推定当期 family："
                f"{current_intelligence_index_version_family_for_partition_acceptance}"
            )
    if current_intelligence_index_version_family_for_partition_acceptance is not None:
        version_family_comparison_label = (
            "API 版本 family"
            if api_intelligence_index_version_family is not None
            else "推定的当期 family（API 版本未知）"
        )
        for candidate in partition_candidates:
            if candidate["partition_key"][0] != current_intelligence_index_version_family_for_partition_acceptance:
                candidate["rejection_reasons"].insert(
                    0,
                    f"版本 family {candidate['partition_key'][0]} ≠ {version_family_comparison_label} "
                    f"{current_intelligence_index_version_family_for_partition_acceptance}",
                )

    qualified_partition_candidates = sorted(
        (candidate for candidate in partition_candidates if not candidate["rejection_reasons"]),
        key=lambda candidate: candidate["latest_cache_file_modification_time_utc"],
        reverse=True,
    )
    selected_partition_candidate = (
        qualified_partition_candidates[0] if qualified_partition_candidates else None
    )
    for superseded_partition_candidate in qualified_partition_candidates[1:]:
        superseded_partition_candidate["rejection_reasons"].append(
            "合格但被更新的合格分区取代（只采用一个分区，禁止跨分区取并集）"
        )

    partition_summaries = tuple(
        ArtificialAnalysisEmbeddedModelCatalogPartitionSummary(
            intelligence_index_version_family=candidate["partition_key"][0],
            cache_file_modification_date_utc=candidate["partition_key"][1],
            page_intelligence_index_versions=candidate["page_intelligence_index_versions"],
            most_specific_intelligence_index_version=candidate["most_specific_partition_version"],
            page_file_names=tuple(
                sorted(parsed_page.page_file_name for parsed_page in candidate["parsed_pages"])
            ),
            page_count=len(candidate["parsed_pages"]),
            latest_cache_file_modification_time_utc=_utc_iso8601_timestamp_text(
                candidate["latest_cache_file_modification_time_utc"]
            ),
            record_count=len(candidate["records_by_model_id"]),
            record_with_output_token_count_count=candidate["record_with_output_token_count_count"],
            record_with_output_token_count_in_api_uuid_intersection_count=candidate[
                "record_with_output_token_count_in_api_uuid_intersection_count"
            ],
            intelligence_compared_with_api_model_count=candidate["intelligence_compared_count"],
            intelligence_agreeing_with_api_model_count=candidate["intelligence_agreeing_count"],
            intelligence_agreement_rate_with_api=candidate["intelligence_agreement_rate"],
            value_conflict_descriptions=tuple(candidate["value_conflict_descriptions"]),
            meets_acceptance_criteria=any(
                candidate is qualified_partition_candidate
                for qualified_partition_candidate in qualified_partition_candidates
            ),
            is_accepted=candidate is selected_partition_candidate,
            rejection_reasons=tuple(candidate["rejection_reasons"]),
        )
        for candidate in sorted(
            partition_candidates,
            key=lambda candidate: candidate["latest_cache_file_modification_time_utc"],
        )
    )

    if selected_partition_candidate is None:
        print(
            "[warn] 没有被接受的内嵌目录分区：当期 token 全缺，有效速度口径只剩非当期回退值。"
            f"分区：{[(summary.intelligence_index_version_family, summary.cache_file_modification_date_utc, summary.page_count, list(summary.rejection_reasons)) for summary in partition_summaries]}"
        )
        return _empty_embedded_model_catalog_load_result(
            cache_directory,
            invalid_page_reasons_by_file_name=invalid_page_reasons_by_file_name,
            partition_summaries=partition_summaries,
        )
    if selected_partition_candidate["value_conflict_descriptions"]:
        raise ValueError(
            "被采用的内嵌目录分区 "
            f"{selected_partition_candidate['partition_key']} 内同 UUID 值冲突：\n  "
            + "\n  ".join(selected_partition_candidate["value_conflict_descriptions"])
        )
    for superseded_partition_candidate in qualified_partition_candidates[1:]:
        print(
            "[warn] 另有合格的内嵌目录分区未被采用（只用 mtime 最新的一个，不取并集）："
            f"版本 {superseded_partition_candidate['most_specific_partition_version']}，"
            f"日期 {superseded_partition_candidate['partition_key'][1]}，"
            f"{len(superseded_partition_candidate['parsed_pages'])} 页"
        )
    for candidate in partition_candidates:
        if candidate is not selected_partition_candidate and candidate["value_conflict_descriptions"]:
            print(
                f"[warn] 未采用的内嵌目录分区 {candidate['partition_key']} 内有 "
                f"{len(candidate['value_conflict_descriptions'])} 处同 UUID 值冲突（未使用其数据）"
            )

    selected_partition_intelligence_agreement_rate = selected_partition_candidate["intelligence_agreement_rate"]
    if (
        selected_partition_intelligence_agreement_rate is None
        or selected_partition_intelligence_agreement_rate
        < EMBEDDED_MODEL_CATALOG_PARTITION_INTELLIGENCE_AGREEMENT_RATE_WITH_API_BELOW_WHICH_TO_WARN
    ):
        print(
            f"[warn] 被接受的内嵌目录分区 v{selected_partition_candidate['most_specific_partition_version']} "
            "与 API 智能分一致率 "
            + (
                f"{selected_partition_intelligence_agreement_rate:.1%}"
                f"（{selected_partition_candidate['intelligence_agreeing_count']}/"
                f"{selected_partition_candidate['intelligence_compared_count']}）"
                if selected_partition_intelligence_agreement_rate is not None
                else "无从计算（UUID 交集里没有可比对的智能分）"
            )
            + f" < {EMBEDDED_MODEL_CATALOG_PARTITION_INTELLIGENCE_AGREEMENT_RATE_WITH_API_BELOW_WHICH_TO_WARN:.0%}："
            "AA 重评过的模型，其目录 token 逐个降为非当期（分区仍被接受）"
        )
    selected_records_by_model_id = selected_partition_candidate["records_by_model_id"]
    cost_compared_count, cost_agreeing_count = _cost_agreement_counts_with_api(
        selected_records_by_model_id, api_intelligence_index_cost_total_usd_by_model_id
    )
    missing_field_record_counts_by_field_name = {
        record_field_name: missing_record_count
        for record_field_name in ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_RECORD_FIELD_NAMES
        if (
            missing_record_count := sum(
                1
                for catalog_record in selected_records_by_model_id.values()
                if getattr(catalog_record, record_field_name) is None
            )
        )
        > 0
    }
    if missing_field_record_counts_by_field_name:
        print(
            f"[warn] 内嵌目录分区 v{selected_partition_candidate['most_specific_partition_version']} "
            f"字段缺失（按字段计数，共 {len(selected_records_by_model_id)} 条记录；缺失值保留为空、不做推断）："
            + "，".join(
                f"{record_field_name} {missing_record_count}"
                for record_field_name, missing_record_count in missing_field_record_counts_by_field_name.items()
            )
        )
    return ArtificialAnalysisEmbeddedModelCatalogLoadResult(
        cache_directory=str(cache_directory),
        records_by_model_id=selected_records_by_model_id,
        accepted_partition_intelligence_index_version=selected_partition_candidate[
            "most_specific_partition_version"
        ],
        accepted_partition_captured_at_utc=_utc_iso8601_timestamp_text(
            selected_partition_candidate["latest_cache_file_modification_time_utc"]
        ),
        page_cache_file_modification_time_utc_by_model_id={
            model_id: _utc_iso8601_timestamp_text(page_time)
            for model_id, page_time in selected_partition_candidate["record_page_time_by_model_id"].items()
        },
        invalid_page_file_names=tuple(sorted(invalid_page_reasons_by_file_name)),
        invalid_page_reasons_by_file_name=invalid_page_reasons_by_file_name,
        partition_summaries=partition_summaries,
        catalog_vs_api_cost_agreement_rate=(
            cost_agreeing_count / cost_compared_count if cost_compared_count else None
        ),
        catalog_vs_api_cost_compared_model_count=cost_compared_count,
        catalog_vs_api_intelligence_agreement_rate=selected_partition_candidate[
            "intelligence_agreement_rate"
        ],
        catalog_vs_api_intelligence_compared_model_count=selected_partition_candidate[
            "intelligence_compared_count"
        ],
        missing_field_record_counts_by_field_name=missing_field_record_counts_by_field_name,
    )


# ----------------------------------------------------------------------------- 混合价（规格 1.3）
def calculate_blended_price_cache_input_output_7_to_2_to_1_with_cache_hit_price_source(
    pricing: dict,
) -> tuple[float, str | None]:
    """返回 (7:2:1 混合单价, cache-hit 价来源)。

    API 原生 `price_1m_blended_7_to_2_to_1` 存在时直接采用；否则 (7×cache_hit + 2×input + output)/10，
    缺 cache-hit 时按 AA 惯例用 input 代替 = (9×input + output)/10（与 AA 原生值 168/178 一致，
    其余差异来自 API 价格舍入）；input 或 output 缺失 → NaN。
    不用详情页目录的原生 blended 作为值：API 刷新后目录价格会过期（目录值只用于核对）。
    """
    native_blended_price = _optional_float(pricing.get("price_1m_blended_7_to_2_to_1"))
    if native_blended_price is not None:
        return (
            native_blended_price,
            BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_ARTIFICIAL_ANALYSIS_API_NATIVE_BLENDED_PRICE,
        )
    input_price = _optional_float(pricing.get("price_1m_input_tokens"))
    output_price = _optional_float(pricing.get("price_1m_output_tokens"))
    if input_price is None or output_price is None:
        return math.nan, None
    cache_hit_price = _optional_float(pricing.get("price_1m_cache_hit_tokens"))
    if cache_hit_price is None:
        return (
            (7 * input_price + 2 * input_price + output_price) / 10,
            BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_INPUT_PRICE_AS_CACHE_HIT_PRICE,
        )
    return (
        (7 * cache_hit_price + 2 * input_price + output_price) / 10,
        BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_API_CACHE_HIT_PRICE,
    )


def calculate_blended_price_cache_input_output_7_to_2_to_1(pricing: dict) -> float:
    """兼容旧签名：只返回混合单价。"""
    blended_price, _ = (
        calculate_blended_price_cache_input_output_7_to_2_to_1_with_cache_hit_price_source(pricing)
    )
    return blended_price


# ----------------------------------------------------------------------------- 非当期回退值（规格 1.4）
@dataclass(frozen=True)
class ArtificialAnalysisMetricValueWithProvenance:
    """一个回退值及其溯源：来源枚举、所属指数版本（未知为 None）、采集时间（ISO8601，未知为 None）。"""

    value: float
    value_source: str
    intelligence_index_version: str | None
    fetched_at_utc: str | None


@dataclass(frozen=True)
class CostToRunAndOutputTokenCountFallbackValues:
    cost_to_run_fallback_value_by_model_id: dict[str, ArtificialAnalysisMetricValueWithProvenance]
    canonical_output_token_count_fallback_value_by_model_id: dict[
        str, ArtificialAnalysisMetricValueWithProvenance
    ]


VERSIONED_FALLBACK_SNAPSHOT_REQUIRED_COLUMN_NAMES = (
    "id",
    "name",
    "intelligence_index_version",
    "captured_at_date",
    "cost_to_run_usd",
    "intelligence_index_canonical_output_token_count",
)


def load_cost_and_output_token_fallbacks(
    *,
    versioned_fallback_snapshot_path: Path | None = None,
    use_previous_run_processed_models_csv_as_fallback: bool = False,
    previous_run_processed_models_csv_path: Path | None = None,
) -> CostToRunAndOutputTokenCountFallbackValues:
    """读取非当期回退值：默认**只读**版本化快照；上次产物 models.csv 仅在显式开关时读取。

    优先级：版本化快照（版本已知）> 上次 models.csv（版本未知，记 None → 视为非当期）。
    """
    versioned_fallback_snapshot_path = Path(
        versioned_fallback_snapshot_path
        if versioned_fallback_snapshot_path is not None
        else ARTIFICIAL_ANALYSIS_INTELLIGENCE_INDEX_V4_1_COST_TO_RUN_AND_CANONICAL_OUTPUT_TOKEN_COUNT_FALLBACK_SNAPSHOT_PATH
    )
    cost_to_run_fallback_value_by_model_id: dict[str, ArtificialAnalysisMetricValueWithProvenance] = {}
    canonical_output_token_count_fallback_value_by_model_id: dict[
        str, ArtificialAnalysisMetricValueWithProvenance
    ] = {}

    if versioned_fallback_snapshot_path.exists():
        versioned_fallback_snapshot = pd.read_csv(
            versioned_fallback_snapshot_path,
            dtype={"id": str, "name": str, "intelligence_index_version": str, "captured_at_date": str},
        )
        missing_snapshot_column_names = [
            required_column_name
            for required_column_name in VERSIONED_FALLBACK_SNAPSHOT_REQUIRED_COLUMN_NAMES
            if required_column_name not in versioned_fallback_snapshot.columns
        ]
        if missing_snapshot_column_names:
            raise ValueError(
                f"版本化回退快照缺列 {missing_snapshot_column_names}：{versioned_fallback_snapshot_path}"
            )
        for snapshot_row in versioned_fallback_snapshot.itertuples(index=False):
            snapshot_intelligence_index_version = normalize_intelligence_index_version_string(
                snapshot_row.intelligence_index_version
            )
            snapshot_captured_at_date = (
                snapshot_row.captured_at_date if isinstance(snapshot_row.captured_at_date, str) else None
            )
            snapshot_cost_to_run_usd = _positive_float_or_none(snapshot_row.cost_to_run_usd)
            if snapshot_cost_to_run_usd is not None:
                cost_to_run_fallback_value_by_model_id.setdefault(
                    snapshot_row.id,
                    ArtificialAnalysisMetricValueWithProvenance(
                        value=snapshot_cost_to_run_usd,
                        value_source=COST_TO_RUN_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT,
                        intelligence_index_version=snapshot_intelligence_index_version,
                        fetched_at_utc=snapshot_captured_at_date,
                    ),
                )
            snapshot_output_token_count = _positive_float_or_none(
                snapshot_row.intelligence_index_canonical_output_token_count
            )
            if snapshot_output_token_count is not None:
                canonical_output_token_count_fallback_value_by_model_id.setdefault(
                    snapshot_row.id,
                    ArtificialAnalysisMetricValueWithProvenance(
                        value=snapshot_output_token_count,
                        value_source=OUTPUT_TOKEN_COUNT_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT,
                        intelligence_index_version=snapshot_intelligence_index_version,
                        fetched_at_utc=snapshot_captured_at_date,
                    ),
                )
    else:
        print(f"[warn] 版本化回退快照不存在，非当期回退为空：{versioned_fallback_snapshot_path}")

    if use_previous_run_processed_models_csv_as_fallback:
        previous_run_processed_models_csv_path = Path(
            previous_run_processed_models_csv_path
            if previous_run_processed_models_csv_path is not None
            else PROCESSED / "models.csv"
        )
        _add_previous_run_processed_models_csv_fallback_values(
            previous_run_processed_models_csv_path,
            cost_to_run_fallback_value_by_model_id,
            canonical_output_token_count_fallback_value_by_model_id,
        )

    return CostToRunAndOutputTokenCountFallbackValues(
        cost_to_run_fallback_value_by_model_id=cost_to_run_fallback_value_by_model_id,
        canonical_output_token_count_fallback_value_by_model_id=(
            canonical_output_token_count_fallback_value_by_model_id
        ),
    )


def _add_previous_run_processed_models_csv_fallback_values(
    previous_run_processed_models_csv_path: Path,
    cost_to_run_fallback_value_by_model_id: dict[str, ArtificialAnalysisMetricValueWithProvenance],
    canonical_output_token_count_fallback_value_by_model_id: dict[
        str, ArtificialAnalysisMetricValueWithProvenance
    ],
) -> None:
    """显式开关下补读上次 models.csv（只填快照没有的模型）；值版本未知，记为 None。

    token 优先读新格式列 `intelligence_index_canonical_output_token_count`；旧格式只有
    `intel_per_m_output` 时按同行 `intelligence / intel_per_m_output × 1e6` 还原上次使用的 token 数。
    """
    if not previous_run_processed_models_csv_path.exists():
        print(f"[warn] 上次产物 models.csv 不存在，忽略该回退源：{previous_run_processed_models_csv_path}")
        return
    try:
        previous_run_processed_models = pd.read_csv(previous_run_processed_models_csv_path)
    except (ValueError, OSError, UnicodeDecodeError, pd.errors.EmptyDataError) as read_error:
        print(f"[warn] 读取上次产物 models.csv 失败，忽略该回退源：{read_error}")
        return
    if "id" not in previous_run_processed_models.columns:
        print("[warn] 上次产物 models.csv 缺 id 列，忽略该回退源")
        return
    fetched_at_utc = _utc_iso8601_timestamp_text(
        _cache_file_modification_time_utc(previous_run_processed_models_csv_path)
    )
    for previous_run_row in previous_run_processed_models.to_dict("records"):
        model_id = previous_run_row["id"]
        previous_run_cost_to_run = _positive_float_or_none(previous_run_row.get("cost_to_run"))
        if previous_run_cost_to_run is not None:
            cost_to_run_fallback_value_by_model_id.setdefault(
                model_id,
                ArtificialAnalysisMetricValueWithProvenance(
                    value=previous_run_cost_to_run,
                    value_source=COST_TO_RUN_VALUE_SOURCE_PREVIOUS_RUN_PROCESSED_MODELS_CSV,
                    intelligence_index_version=None,
                    fetched_at_utc=fetched_at_utc,
                ),
            )
        previous_run_output_token_count = _positive_float_or_none(
            previous_run_row.get("intelligence_index_canonical_output_token_count")
        )
        if previous_run_output_token_count is None:
            previous_run_intelligence = _positive_float_or_none(previous_run_row.get("intelligence"))
            previous_run_intelligence_per_million_output_tokens = _positive_float_or_none(
                previous_run_row.get("intel_per_m_output")
            )
            if (
                previous_run_intelligence is not None
                and previous_run_intelligence_per_million_output_tokens is not None
            ):
                previous_run_output_token_count = (
                    previous_run_intelligence / previous_run_intelligence_per_million_output_tokens * 1e6
                )
        if previous_run_output_token_count is not None:
            canonical_output_token_count_fallback_value_by_model_id.setdefault(
                model_id,
                ArtificialAnalysisMetricValueWithProvenance(
                    value=previous_run_output_token_count,
                    value_source=OUTPUT_TOKEN_COUNT_VALUE_SOURCE_PREVIOUS_RUN_PROCESSED_MODELS_CSV,
                    intelligence_index_version=None,
                    fetched_at_utc=fetched_at_utc,
                ),
            )


# ----------------------------------------------------------------------------- 合并成表
def _determine_current_intelligence_index_version(
    api_response_metadata: dict,
    embedded_model_catalog_load_result: ArtificialAnalysisEmbeddedModelCatalogLoadResult,
) -> tuple[str | None, str | None]:
    """当期版本 = API 响应顶层版本；旧缓存没有时按被接受的目录分区版本推定（并告警）。

    API 版本是被接受分区版本的前缀（4.3 vs 4.3.2，同 family）时显示更具体的分区版本，
    原始 API 值仍保留在 `artificial_analysis_api_intelligence_index_version` 供溯源（R1-08）。
    「是否当期」一律按 family 比较，不受这里取哪个显示值影响。
    """
    api_intelligence_index_version = api_response_metadata.get("intelligence_index_version")
    catalog_partition_version = (
        embedded_model_catalog_load_result.accepted_partition_intelligence_index_version
    )
    if api_intelligence_index_version is not None:
        if catalog_partition_version is not None and str(catalog_partition_version).startswith(
            f"{api_intelligence_index_version}."
        ):
            return (
                catalog_partition_version,
                CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_ARTIFICIAL_ANALYSIS_API_RESPONSE_FAMILY_REFINED_BY_ACCEPTED_EMBEDDED_MODEL_CATALOG_PARTITION,
            )
        return (
            api_intelligence_index_version,
            CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_ARTIFICIAL_ANALYSIS_API_RESPONSE,
        )
    if catalog_partition_version is not None:
        print(
            "[warn] API 缓存缺少 intelligence_index_version，按目录分区版本推定："
            f"v{catalog_partition_version}（下次 --refresh 起持久化 API 顶层版本）"
        )
        return (
            catalog_partition_version,
            CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_INFERRED_FROM_ACCEPTED_EMBEDDED_MODEL_CATALOG_PARTITION,
        )
    print("[warn] 当期智能指数版本未知：API 缓存没有版本字段，也没有被接受的目录分区")
    return None, None


def _value_is_from_current_intelligence_index_version(
    value_intelligence_index_version: str | None,
    current_intelligence_index_version: str | None,
) -> bool:
    value_version_family = intelligence_index_version_family(value_intelligence_index_version)
    current_version_family = intelligence_index_version_family(current_intelligence_index_version)
    return (
        value_version_family is not None
        and current_version_family is not None
        and value_version_family == current_version_family
    )


def _embedded_model_catalog_output_token_count_demotion_reason_code(
    catalog_intelligence_index: object,
    api_intelligence_index: object,
) -> str | None:
    """逐 UUID 判定被接受分区里的目录 token 能否算当期（R1-01 (a)）。

    该 UUID 的目录智能分与当期 API 智能分一致（|差| ≤ 0.05）→ None（可算当期）；
    不一致（AA 已重评，目录里的 token 属于重评前的那次运行）→ 不一致原因码；
    任一侧缺智能分、无从核对 → 不可比原因码。两种原因码都把 token 降为非当期。
    """
    catalog_intelligence_value = _optional_float(catalog_intelligence_index)
    api_intelligence_value = _optional_float(api_intelligence_index)
    if catalog_intelligence_value is None or api_intelligence_value is None:
        return ANALYSIS_INELIGIBILITY_REASON_CODE_OUTPUT_TOKEN_COUNT_VALUE_CATALOG_INTELLIGENCE_NOT_COMPARABLE_WITH_CURRENT_API_INTELLIGENCE
    if (
        abs(catalog_intelligence_value - api_intelligence_value)
        <= EMBEDDED_MODEL_CATALOG_INTELLIGENCE_AGREEMENT_ABSOLUTE_TOLERANCE + 1e-9
    ):
        return None
    return ANALYSIS_INELIGIBILITY_REASON_CODE_OUTPUT_TOKEN_COUNT_VALUE_CATALOG_INTELLIGENCE_DISAGREES_WITH_CURRENT_API_INTELLIGENCE


def _assemble_models_dataframe_with_value_provenance(
    api_model_rows: list[dict],
    api_response_metadata: dict,
    embedded_model_catalog_load_result: ArtificialAnalysisEmbeddedModelCatalogLoadResult,
    fallback_values: CostToRunAndOutputTokenCountFallbackValues,
    current_intelligence_index_version: str | None,
) -> pd.DataFrame:
    rows = []
    for m in api_model_rows:
        model_id = m["id"]
        ev = m.get("evaluations") or {}
        pr = m.get("pricing") or {}
        performance = m.get("performance") or {}
        blended_price, blended_price_cache_hit_price_source = (
            calculate_blended_price_cache_input_output_7_to_2_to_1_with_cache_hit_price_source(pr)
        )

        # 成本：API 当期值 > 版本化快照 > （显式开关）上次 models.csv
        api_cost_to_run = _positive_float_or_none(
            (m.get("artificial_analysis_intelligence_index_cost") or {}).get("total_cost")
        )
        if api_cost_to_run is not None:
            cost_to_run = api_cost_to_run
            cost_to_run_value_source = COST_TO_RUN_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_API_CURRENT_RESPONSE
            cost_to_run_value_intelligence_index_version = current_intelligence_index_version
            cost_to_run_value_fetched_at_utc = api_response_metadata.get("fetched_at_utc")
            # API 响应本身就是当期数据，与版本字段是否已知无关
            cost_to_run_value_is_current = True
        else:
            cost_fallback_value = fallback_values.cost_to_run_fallback_value_by_model_id.get(model_id)
            cost_to_run = cost_fallback_value.value if cost_fallback_value else math.nan
            cost_to_run_value_source = cost_fallback_value.value_source if cost_fallback_value else None
            cost_to_run_value_intelligence_index_version = (
                cost_fallback_value.intelligence_index_version if cost_fallback_value else None
            )
            cost_to_run_value_fetched_at_utc = (
                cost_fallback_value.fetched_at_utc if cost_fallback_value else None
            )
            cost_to_run_value_is_current = bool(cost_fallback_value) and (
                _value_is_from_current_intelligence_index_version(
                    cost_to_run_value_intelligence_index_version,
                    current_intelligence_index_version,
                )
            )

        # 输出 token：被接受的目录分区 > 版本化快照 > （显式开关）上次 models.csv
        catalog_record = embedded_model_catalog_load_result.records_by_model_id.get(model_id)
        catalog_output_token_count = (
            _positive_float_or_none(catalog_record.canonical_output_token_count)
            if catalog_record
            else None
        )
        if catalog_output_token_count is not None:
            output_token_count = catalog_output_token_count
            output_token_count_value_source = (
                OUTPUT_TOKEN_COUNT_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_ACCEPTED_PARTITION
            )
            output_token_count_value_intelligence_index_version = (
                embedded_model_catalog_load_result.accepted_partition_intelligence_index_version
            )
            output_token_count_value_fetched_at_utc = (
                embedded_model_catalog_load_result.page_cache_file_modification_time_utc_by_model_id.get(
                    model_id
                )
            )
            # 值来源仍记目录、版本如实写分区版本；只有该 UUID 智能分与当期 API 一致才可能算当期
            output_token_count_value_non_current_reason_code = (
                _embedded_model_catalog_output_token_count_demotion_reason_code(
                    catalog_record.intelligence_index,
                    ev.get("artificial_analysis_intelligence_index"),
                )
            )
        else:
            output_token_count_value_non_current_reason_code = None
            token_fallback_value = (
                fallback_values.canonical_output_token_count_fallback_value_by_model_id.get(model_id)
            )
            output_token_count = token_fallback_value.value if token_fallback_value else math.nan
            output_token_count_value_source = (
                token_fallback_value.value_source if token_fallback_value else None
            )
            output_token_count_value_intelligence_index_version = (
                token_fallback_value.intelligence_index_version if token_fallback_value else None
            )
            output_token_count_value_fetched_at_utc = (
                token_fallback_value.fetched_at_utc if token_fallback_value else None
            )
        output_token_count_value_is_current = (
            output_token_count_value_source is not None
            and output_token_count_value_non_current_reason_code is None
            and _value_is_from_current_intelligence_index_version(
                output_token_count_value_intelligence_index_version,
                current_intelligence_index_version,
            )
        )

        rows.append(
            {
                "id": model_id,
                "slug": m.get("slug"),
                "name": m.get("name"),
                "creator": (m.get("model_creator") or {}).get("name"),
                "release_date": m.get("release_date"),
                "intelligence": ev.get("artificial_analysis_intelligence_index"),
                "coding_index": ev.get("artificial_analysis_coding_index"),
                "math_index": ev.get("artificial_analysis_math_index"),
                "output_speed": performance.get("median_output_tokens_per_second"),
                "ttft_s": performance.get("median_time_to_first_token_seconds"),
                "blended_price_cache_input_output_7_to_2_to_1": blended_price,
                "blended_price_cache_hit_price_source": blended_price_cache_hit_price_source,
                "price_input": pr.get("price_1m_input_tokens"),
                "price_output": pr.get("price_1m_output_tokens"),
                "price_cache_hit": pr.get("price_1m_cache_hit_tokens"),
                "price_cache_write": pr.get("price_1m_cache_write_tokens"),
                "cost_to_run": cost_to_run,
                "cost_to_run_value_source": cost_to_run_value_source,
                "cost_to_run_value_intelligence_index_version": cost_to_run_value_intelligence_index_version,
                "cost_to_run_value_fetched_at_utc": cost_to_run_value_fetched_at_utc,
                "cost_to_run_value_is_from_current_intelligence_index_version": cost_to_run_value_is_current,
                "intelligence_index_canonical_output_token_count": output_token_count,
                "output_token_count_value_source": output_token_count_value_source,
                "output_token_count_value_intelligence_index_version": (
                    output_token_count_value_intelligence_index_version
                ),
                "output_token_count_value_fetched_at_utc": output_token_count_value_fetched_at_utc,
                "output_token_count_value_is_from_current_intelligence_index_version": (
                    output_token_count_value_is_current
                ),
                OUTPUT_TOKEN_COUNT_VALUE_NON_CURRENT_REASON_CODE_COLUMN_NAME: (
                    output_token_count_value_non_current_reason_code
                ),
                "artificial_analysis_intelligence_index_is_estimated": (
                    catalog_record.intelligence_index_is_estimated if catalog_record else None
                ),
                "artificial_analysis_is_reasoning_model": (
                    catalog_record.is_reasoning if catalog_record else None
                ),
                "artificial_analysis_reasoning_effort_slug": (
                    catalog_record.reasoning_effort_slug if catalog_record else None
                ),
                "artificial_analysis_release_slug": (
                    catalog_record.release_slug if catalog_record else None
                ),
                "artificial_analysis_intelligence_index_time_per_task_seconds": (
                    catalog_record.intelligence_index_time_per_task_seconds if catalog_record else None
                ),
                "is_absent_from_accepted_embedded_model_catalog_partition": catalog_record is None,
            }
        )
    df = pd.DataFrame(rows)
    # 可能全为 None 的字符串/布尔列保持 object dtype，None 不被转成 NaN
    df["release_date"] = pd.to_datetime(df["release_date"], errors="coerce")
    # 非正的速度是「未测速」的占位 0，无法在对数轴表示 → 缺失（成本已在上面按正值筛选）
    df.loc[df["output_speed"].fillna(-1) <= 0, "output_speed"] = np.nan
    # 非正的混合价同理：API 对「无托管定价」的开源权重模型给 input=output=0 且无 cache-hit，
    # 算出 0 既不是真免费也无法上对数轴 → 缺失，来源一并清空（与 builder 的兜底一致）
    zero_or_negative_blended_price_row_mask = (
        df["blended_price_cache_input_output_7_to_2_to_1"].fillna(1) <= 0
    )
    df.loc[
        zero_or_negative_blended_price_row_mask, "blended_price_cache_input_output_7_to_2_to_1"
    ] = np.nan
    df.loc[zero_or_negative_blended_price_row_mask, "blended_price_cache_hit_price_source"] = None
    return df


def build_dataframe(
    refresh: bool = False,
    *,
    allow_artificial_analysis_website_page_fetch: bool | None = None,
    use_previous_run_processed_models_csv_as_fallback: bool = False,
    embedded_model_catalog_cache_directory: Path | None = None,
    versioned_fallback_snapshot_path: Path | None = None,
    artificial_analysis_raw_data_directory: Path | None = None,
    previous_run_processed_models_csv_path: Path | None = None,
    catalog_refresh_health_store=None,
) -> pd.DataFrame:
    """取数并合并成模型表（每行一个 API 模型，带值溯源列）。

    - 默认离线读取；`refresh=True` 在 24 小时冷却期结束后自动受限刷新目录；
      列表页不再是值来源，无论是否开启网页抓取都只读缓存、从不联网（R3-F3）；
    - `artificial_analysis_raw_data_directory` 缺省按 checkout 选择独立缓存目录（主 checkout 仍为 `data/raw`）；给出时 API 缓存、API 响应历史、
      列表页缓存与详情页缓存都改在该目录下读写（R1-07：可在 scratch 副本上完整彩排 `--refresh`）；
    - `embedded_model_catalog_cache_directory` 缺省为原始数据目录下的详情页缓存目录；
    - `versioned_fallback_snapshot_path` 缺省为 v4.1 版本化快照；
    - `previous_run_processed_models_csv_path` 缺省为 `data/processed/models.csv`（仅在显式开启回退时读取）；
    - 本次取数的元数据挂在 `df.attrs`（键见 `MODELS_DATAFRAME_ATTRS_KEY_*`）：数据溯源（规格 5.1 除
      `pruning_reference_date` 外的全部键）、护栏结果、目录分区摘要。
    护栏失败抛 `ArtificialAnalysisDataQualityGuardrailViolationError`；`refresh=True` 时新响应只有在
    护栏全部通过后才替换共享 API 缓存（R1-02），失败时旧缓存保持原样。
    """
    global _artificial_analysis_website_page_fetch_paused_notice_already_printed
    _artificial_analysis_website_page_fetch_paused_notice_already_printed = False
    if artificial_analysis_raw_data_directory is not None:
        artificial_analysis_raw_data_directory = Path(artificial_analysis_raw_data_directory)
        api_language_models_cache_path = (
            artificial_analysis_raw_data_directory / API_LANGUAGE_MODELS_CACHE.name
        )
        api_language_models_response_history_directory = (
            artificial_analysis_raw_data_directory
            / ARTIFICIAL_ANALYSIS_API_LANGUAGE_MODELS_RESPONSE_HISTORY_DIRECTORY.name
        )
        models_list_page_html_cache_path = (
            artificial_analysis_raw_data_directory
            / ARTIFICIAL_ANALYSIS_MODELS_LIST_PAGE_HTML_CACHE_PATH.name
        )
        default_embedded_model_catalog_cache_directory = (
            artificial_analysis_raw_data_directory
            / ARTIFICIAL_ANALYSIS_MODEL_DETAIL_PAGE_HTML_CACHE_DIRECTORY.name
        )
    else:
        api_language_models_cache_path = API_LANGUAGE_MODELS_CACHE
        api_language_models_response_history_directory = (
            ARTIFICIAL_ANALYSIS_API_LANGUAGE_MODELS_RESPONSE_HISTORY_DIRECTORY
        )
        models_list_page_html_cache_path = ARTIFICIAL_ANALYSIS_MODELS_LIST_PAGE_HTML_CACHE_PATH
        default_embedded_model_catalog_cache_directory = (
            ARTIFICIAL_ANALYSIS_MODEL_DETAIL_PAGE_HTML_CACHE_DIRECTORY
        )
    embedded_model_catalog_cache_directory = Path(
        embedded_model_catalog_cache_directory
        if embedded_model_catalog_cache_directory is not None
        else default_embedded_model_catalog_cache_directory
    )
    website_page_fetch_enabled=(refresh if allow_artificial_analysis_website_page_fetch is None
                                else allow_artificial_analysis_website_page_fetch)
    if allow_artificial_analysis_website_page_fetch is False:
        _print_artificial_analysis_website_page_fetch_paused_notice_once()
    elif not website_page_fetch_enabled:
        print("[info] 本次未请求网页刷新，读取已验证目录缓存")

    api_model_rows, api_response_metadata = (
        load_artificial_analysis_api_language_models_with_response_metadata(
            refresh,
            api_language_models_cache_path=api_language_models_cache_path,
            api_language_models_response_history_directory=api_language_models_response_history_directory,
            defer_api_language_models_cache_replacement_until_guardrails_pass=True,
        )
    )
    if (
        api_response_metadata["fetched_at_utc_source"]
        == API_RESPONSE_FETCHED_AT_UTC_SOURCE_INFERRED_FROM_CACHE_FILE_MODIFICATION_TIME
    ):
        print(
            "[warn] API 缓存没有记录抓取时间，按缓存文件修改时间推断："
            f"{api_response_metadata['fetched_at_utc']}（下次 --refresh 起如实记录）"
        )

    # 列表页不再是值来源（camelCase 后 snake_case 正则 0 命中）；只读已有缓存做醒目告警，
    # 即使显式开启网页抓取也不为它联网（R3-F3：D-12 最小化抓取，列表页不属于必要请求）
    models_list_page_html = (
        models_list_page_html_cache_path.read_text(encoding="utf-8", errors="ignore")
        if models_list_page_html_cache_path.exists()
        else None
    )
    models_list_page_snake_case_cost_record_count = (
        len(parse_cost_by_model_id(models_list_page_html)) if models_list_page_html is not None else 0
    )

    fallback_values = load_cost_and_output_token_fallbacks(
        versioned_fallback_snapshot_path=versioned_fallback_snapshot_path,
        use_previous_run_processed_models_csv_as_fallback=use_previous_run_processed_models_csv_as_fallback,
        previous_run_processed_models_csv_path=previous_run_processed_models_csv_path,
    )
    api_intelligence_by_model_id = {
        m["id"]: (m.get("evaluations") or {}).get("artificial_analysis_intelligence_index")
        for m in api_model_rows
    }
    api_intelligence_index_cost_total_usd_by_model_id = {
        m["id"]: (m.get("artificial_analysis_intelligence_index_cost") or {}).get("total_cost")
        for m in api_model_rows
    }

    from .artificial_analysis_minimal_model_catalog_refresh import (
        NUMERIC_CATALOG_RESPONSE_FILENAME, load_numeric_model_catalog_response,
        prepare_minimal_model_catalog_refresh, seed_verified_numeric_catalog_from_legacy_load_result,
    )
    from .artificial_analysis_catalog_refresh_health import CatalogRefreshHealthStore
    numeric_catalog_raw_directory=api_language_models_cache_path.parent
    numeric_catalog_response_path=numeric_catalog_raw_directory/NUMERIC_CATALOG_RESPONSE_FILENAME
    catalog_refresh_preparation=None

    def load_catalog_and_assemble_models_dataframe(prepared_catalog=None):
        embedded_model_catalog_load_result=prepared_catalog
        if embedded_model_catalog_load_result is None and numeric_catalog_response_path.exists():
            embedded_model_catalog_load_result=load_numeric_model_catalog_response(
                numeric_catalog_response_path,api_model_rows,api_response_metadata.get("intelligence_index_version"))
        if embedded_model_catalog_load_result is None:
            embedded_model_catalog_load_result = (
                load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
                    embedded_model_catalog_cache_directory,
                    api_intelligence_by_model_id,
                    api_response_metadata.get("intelligence_index_version"),
                    api_intelligence_index_cost_total_usd_by_model_id=(
                        api_intelligence_index_cost_total_usd_by_model_id
                    ),
                )
            )
        current_intelligence_index_version, current_intelligence_index_version_source = (
            _determine_current_intelligence_index_version(
                api_response_metadata, embedded_model_catalog_load_result
            )
        )
        models_dataframe = _assemble_models_dataframe_with_value_provenance(
            api_model_rows,
            api_response_metadata,
            embedded_model_catalog_load_result,
            fallback_values,
            current_intelligence_index_version,
        )
        return (
            models_dataframe,
            embedded_model_catalog_load_result,
            current_intelligence_index_version,
            current_intelligence_index_version_source,
        )

    (
        df,
        embedded_model_catalog_load_result,
        current_intelligence_index_version,
        current_intelligence_index_version_source,
    ) = load_catalog_and_assemble_models_dataframe()
    if website_page_fetch_enabled:
        catalog_refresh_preparation=prepare_minimal_model_catalog_refresh(
            api_model_rows,api_response_metadata.get("intelligence_index_version"),
            numeric_catalog_raw_directory,
            catalog_refresh_health_store or CatalogRefreshHealthStore(ROOT),
            previous_verified_catalog_load_result=embedded_model_catalog_load_result,
        )
        if catalog_refresh_preparation.catalog_load_result is not None:
            (
                df,
                embedded_model_catalog_load_result,
                current_intelligence_index_version,
                current_intelligence_index_version_source,
            ) = load_catalog_and_assemble_models_dataframe(catalog_refresh_preparation.catalog_load_result)
        if catalog_refresh_preparation.warning_text:
            print("[warn] "+catalog_refresh_preparation.warning_text)

    _add_effective_speed(df)
    refreshed_response_pending_cache_replacement_path = api_response_metadata.get(
        "refreshed_response_pending_cache_replacement_path"
    )
    refreshed_response_history_file_path_pending_guardrail_validation = api_response_metadata.get(
        "refreshed_response_history_file_path_pending_guardrail_validation"
    )
    try:
        guardrail_results = _validate(
            df,
            embedded_model_catalog_load_result=embedded_model_catalog_load_result,
            api_response_metadata=api_response_metadata,
            artificial_analysis_models_list_page_html_cache_was_found=models_list_page_html is not None,
            artificial_analysis_models_list_page_snake_case_cost_record_count=(
                models_list_page_snake_case_cost_record_count
            ),
            api_language_models_response_history_directory=api_language_models_response_history_directory,
        )
    except ArtificialAnalysisDataQualityGuardrailViolationError:
        if catalog_refresh_preparation:
            catalog_refresh_preparation.reject_after_final_guardrails()
        rejected_response_history_file_path = None
        if refreshed_response_history_file_path_pending_guardrail_validation is not None:
            rejected_response_history_file_path = (
                mark_refreshed_api_language_models_response_history_file_with_guardrail_outcome(
                    Path(refreshed_response_history_file_path_pending_guardrail_validation),
                    data_quality_guardrails_passed=False,
                )
            )
        if refreshed_response_pending_cache_replacement_path is not None:
            # 暂存文件按次唯一命名（RVF-001），被拒后不删就会逐次堆积；同样内容已以「被护栏拒绝」后缀留在响应历史
            Path(refreshed_response_pending_cache_replacement_path).unlink(missing_ok=True)
            print(
                "[error] 刷新得到的 API 新响应没有通过数据质量护栏，未替换共享缓存 "
                f"{api_language_models_cache_path}（旧缓存保持原样，离线重跑不受影响）；"
                f"新响应保留在响应历史 {rejected_response_history_file_path}（带「被护栏拒绝」后缀，不作后续比较基线），"
                f"本次刷新的暂存文件 {refreshed_response_pending_cache_replacement_path} 已删除"
            )
        raise
    if refreshed_response_history_file_path_pending_guardrail_validation is not None:
        mark_refreshed_api_language_models_response_history_file_with_guardrail_outcome(
            Path(refreshed_response_history_file_path_pending_guardrail_validation),
            data_quality_guardrails_passed=True,
        )
    if refreshed_response_pending_cache_replacement_path is not None:
        replace_api_language_models_cache_with_refreshed_response_after_guardrails_passed(
            Path(refreshed_response_pending_cache_replacement_path), api_language_models_cache_path
        )
        print(f"[info] 护栏全部通过，已用刷新得到的 API 新响应替换缓存 {api_language_models_cache_path}")
    # API 历史与 active 都成功持久化后，目录才可晋升并解除 incident。
    if catalog_refresh_preparation:
        catalog_refresh_preparation.accept_after_final_guardrails()
    # 迁移本身不 resolve 异常；只在刷新或显式指定隔离缓存路径时写入数值缓存。
    if refresh or artificial_analysis_raw_data_directory is not None:
        seed_verified_numeric_catalog_from_legacy_load_result(numeric_catalog_raw_directory,embedded_model_catalog_load_result)
    df.attrs[MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE] = {
        "artificial_analysis_api_response_fetched_at_utc": api_response_metadata["fetched_at_utc"],
        "artificial_analysis_api_response_fetched_at_utc_source": api_response_metadata[
            "fetched_at_utc_source"
        ],
        "artificial_analysis_api_intelligence_index_version": api_response_metadata[
            "intelligence_index_version"
        ],
        "artificial_analysis_api_tier": api_response_metadata["tier"],
        "artificial_analysis_api_source_url": api_response_metadata["source_url"],
        "current_intelligence_index_version": current_intelligence_index_version,
        "current_intelligence_index_version_source": current_intelligence_index_version_source,
        "embedded_model_catalog_intelligence_index_version": (
            embedded_model_catalog_load_result.accepted_partition_intelligence_index_version
        ),
        "embedded_model_catalog_captured_at_utc": (
            embedded_model_catalog_load_result.accepted_partition_captured_at_utc
        ),
        # R1-03：没有被接受分区时给前端页头的一行醒目告警；有被接受分区时为 None
        "embedded_model_catalog_partition_rejection_warning_text": (
            embedded_model_catalog_partition_rejection_warning_text(embedded_model_catalog_load_result)
        ),
        "artificial_analysis_website_page_fetch_paused": allow_artificial_analysis_website_page_fetch is False,
        "artificial_analysis_website_page_fetch_policy": (
            "automatic_on_api_refresh" if allow_artificial_analysis_website_page_fetch is None else
            "explicitly_requested" if allow_artificial_analysis_website_page_fetch else "explicitly_disabled"),
        "artificial_analysis_embedded_model_catalog_refresh_status": (
            catalog_refresh_preparation.status if catalog_refresh_preparation else "not_requested_using_cached_catalog"),
        "artificial_analysis_embedded_model_catalog_refresh_warning_text": (
            catalog_refresh_preparation.warning_text if catalog_refresh_preparation else None),
        "reference_output_million_tokens_for_effective_speed_normalization_by_intelligence_index_version_family": dict(
            REFERENCE_OUTPUT_MILLION_TOKENS_FOR_EFFECTIVE_SPEED_NORMALIZATION_BY_INTELLIGENCE_INDEX_VERSION_FAMILY
        ),
        "artificial_analysis_attribution_url": ARTIFICIAL_ANALYSIS_ATTRIBUTION_URL,
    }
    df.attrs[MODELS_DATAFRAME_ATTRS_KEY_DATA_QUALITY_GUARDRAIL_RESULTS] = [
        dataclasses.asdict(guardrail_result) for guardrail_result in guardrail_results
    ]
    df.attrs[MODELS_DATAFRAME_ATTRS_KEY_EMBEDDED_MODEL_CATALOG_LOAD_SUMMARY] = {
        "cache_directory": embedded_model_catalog_load_result.cache_directory,
        "accepted_partition_intelligence_index_version": (
            embedded_model_catalog_load_result.accepted_partition_intelligence_index_version
        ),
        "accepted_partition_captured_at_utc": (
            embedded_model_catalog_load_result.accepted_partition_captured_at_utc
        ),
        "accepted_partition_record_count": len(embedded_model_catalog_load_result.records_by_model_id),
        "invalid_page_file_names": list(embedded_model_catalog_load_result.invalid_page_file_names),
        "catalog_vs_api_cost_agreement_rate": embedded_model_catalog_load_result.catalog_vs_api_cost_agreement_rate,
        "catalog_vs_api_cost_compared_model_count": (
            embedded_model_catalog_load_result.catalog_vs_api_cost_compared_model_count
        ),
        "catalog_vs_api_intelligence_agreement_rate": (
            embedded_model_catalog_load_result.catalog_vs_api_intelligence_agreement_rate
        ),
        "catalog_vs_api_intelligence_compared_model_count": (
            embedded_model_catalog_load_result.catalog_vs_api_intelligence_compared_model_count
        ),
        "missing_field_record_counts_by_field_name": dict(
            embedded_model_catalog_load_result.missing_field_record_counts_by_field_name
        ),
        "partition_summaries": [
            {
                "intelligence_index_version_family": partition_summary.intelligence_index_version_family,
                "most_specific_intelligence_index_version": (
                    partition_summary.most_specific_intelligence_index_version
                ),
                "cache_file_modification_date_utc": partition_summary.cache_file_modification_date_utc,
                "page_count": partition_summary.page_count,
                "record_with_output_token_count_count": (
                    partition_summary.record_with_output_token_count_count
                ),
                "record_with_output_token_count_in_api_uuid_intersection_count": (
                    partition_summary.record_with_output_token_count_in_api_uuid_intersection_count
                ),
                "intelligence_agreement_rate_with_api": partition_summary.intelligence_agreement_rate_with_api,
                "is_accepted": partition_summary.is_accepted,
                "rejection_reasons": list(partition_summary.rejection_reasons),
            }
            for partition_summary in embedded_model_catalog_load_result.partition_summaries
        ],
    }
    return df


def _add_effective_speed(df: pd.DataFrame) -> None:
    """派生「冗长度」与「有效速度」两列（原地），规格 1.5。

    冗长度 output_mtokens = 跑完整套智能指数的输出 token 数(百万)，直接由原始 token 数得出。
    有效速度 eff_speed = 原始速度 / (output_mtokens / 该行 token 所属版本 family 的参考 token 量)，
        保留 tok/s 量纲；token 版本未知或无常数 → NaN（汇总告警一次）。
    兼容列 intel_per_m_output 仅在 token 来自当期版本时 = intelligence / output_mtokens，否则 NaN
    （不再拼接新版智能分与旧版 token）。
    """
    df["output_mtokens"] = df["intelligence_index_canonical_output_token_count"] / 1e6
    df.loc[df["output_mtokens"].fillna(-1) <= 0, "output_mtokens"] = np.nan
    reference_output_million_tokens = (
        df["output_token_count_value_intelligence_index_version"]
        .map(intelligence_index_version_family)
        .map(
            REFERENCE_OUTPUT_MILLION_TOKENS_FOR_EFFECTIVE_SPEED_NORMALIZATION_BY_INTELLIGENCE_INDEX_VERSION_FAMILY
        )
        .astype(float)
    )
    df["eff_speed"] = df["output_speed"] / (df["output_mtokens"] / reference_output_million_tokens)
    df.loc[df["eff_speed"].fillna(-1) <= 0, "eff_speed"] = np.nan
    rows_without_effective_speed_normalization_constant = (
        df["output_mtokens"].notna() & df["output_speed"].notna() & reference_output_million_tokens.isna()
    )
    if rows_without_effective_speed_normalization_constant.any():
        unknown_version_value_counts = Counter(
            str(version_string)
            for version_string in df.loc[
                rows_without_effective_speed_normalization_constant,
                "output_token_count_value_intelligence_index_version",
            ]
        )
        print(
            f"[warn] {int(rows_without_effective_speed_normalization_constant.sum())} 行的 token 值"
            f"指数版本未知或没有归一常数（{dict(unknown_version_value_counts)}），有效速度 eff_speed 置空"
        )
    intelligence_values = pd.to_numeric(df["intelligence"], errors="coerce")
    df["intel_per_m_output"] = np.where(
        df["output_token_count_value_is_from_current_intelligence_index_version"].astype(bool)
        & df["output_mtokens"].notna()
        & (intelligence_values.fillna(-1) > 0),
        intelligence_values / df["output_mtokens"],
        np.nan,
    )


# ----------------------------------------------------------------------------- 护栏（规格 3）
def _best_candidate_rejected_embedded_model_catalog_partition_summary(
    embedded_model_catalog_load_result: ArtificialAnalysisEmbeddedModelCatalogLoadResult,
) -> ArtificialAnalysisEmbeddedModelCatalogPartitionSummary | None:
    """没有被接受分区时，挑「最接近被接受」的候选分区用于告警：与 API 智能分一致率最高，同率取最新。"""
    if not embedded_model_catalog_load_result.partition_summaries:
        return None
    return max(
        embedded_model_catalog_load_result.partition_summaries,
        key=lambda partition_summary: (
            partition_summary.intelligence_agreement_rate_with_api
            if partition_summary.intelligence_agreement_rate_with_api is not None
            else -1.0,
            partition_summary.latest_cache_file_modification_time_utc,
        ),
    )


def embedded_model_catalog_partition_rejection_warning_text(
    embedded_model_catalog_load_result: ArtificialAnalysisEmbeddedModelCatalogLoadResult,
) -> str | None:
    """契约顶层溯源 `embedded_model_catalog_partition_rejection_warning_text`（R1-03）：

    有被接受分区 → None；否则给前端页头一行醒目告警，写明拒绝原因（最佳候选分区）或缓存为空。
    """
    if embedded_model_catalog_load_result.records_by_model_id:
        return None
    best_candidate_partition_summary = _best_candidate_rejected_embedded_model_catalog_partition_summary(
        embedded_model_catalog_load_result
    )
    if best_candidate_partition_summary is None:
        return (
            "内嵌目录分区缺失（目录缓存没有结构有效的详情页"
            f"，无效页 {len(embedded_model_catalog_load_result.invalid_page_file_names)} 个），"
            "有效速度口径暂无当期可比点"
        )
    return (
        f"内嵌目录分区被拒（共 {len(embedded_model_catalog_load_result.partition_summaries)} 个候选分区；"
        f"最佳候选 v{best_candidate_partition_summary.most_specific_intelligence_index_version}"
        f"，{best_candidate_partition_summary.cache_file_modification_date_utc}："
        + "；".join(best_candidate_partition_summary.rejection_reasons or ("原因未记录",))
        + "），有效速度口径暂无当期可比点"
    )


class ArtificialAnalysisDataQualityGuardrailViolationError(AssertionError):
    """数据质量护栏失败（继承 AssertionError，兼容旧的 assert 式调用方）。"""


@dataclass(frozen=True)
class ArtificialAnalysisDataQualityGuardrailResult:
    guardrail_name: str
    guardrail_status: str
    guardrail_detail_text: str


def _validate(
    df: pd.DataFrame,
    *,
    embedded_model_catalog_load_result: ArtificialAnalysisEmbeddedModelCatalogLoadResult | None = None,
    api_response_metadata: dict | None = None,
    artificial_analysis_models_list_page_html_cache_was_found: bool | None = None,
    artificial_analysis_models_list_page_snake_case_cost_record_count: int = 0,
    api_language_models_response_history_directory: Path | None = None,
) -> list[ArtificialAnalysisDataQualityGuardrailResult]:
    """按来源统计的护栏；任一失败抛 ArtificialAnalysisDataQualityGuardrailViolationError。

    不再要求「有成本行 ≥ 250」也不再用模型名锚点：去掉非当期回退后当期成本只有约 151 条，
    旧断言会让管线直接失败；名称锚点在列表页 0 命中时一直空转。
    `api_language_models_response_history_directory` 给出时，API 当期成本条数与其中上一份通过护栏
    的响应比较（骤降 > 30% 失败）；没有可比基线时用绝对下限 100（R1-04）。
    """
    api_response_metadata = api_response_metadata or {}
    guardrail_results: list[ArtificialAnalysisDataQualityGuardrailResult] = []

    def record_guardrail(guardrail_name: str, guardrail_status: str, guardrail_detail_text: str) -> None:
        guardrail_results.append(
            ArtificialAnalysisDataQualityGuardrailResult(
                guardrail_name, guardrail_status, guardrail_detail_text
            )
        )

    record_guardrail(
        "api_language_model_count_at_least_minimum",
        DATA_QUALITY_GUARDRAIL_STATUS_PASSED
        if len(df) >= MINIMUM_API_LANGUAGE_MODEL_COUNT_FOR_GUARDRAIL
        else DATA_QUALITY_GUARDRAIL_STATUS_FAILED,
        f"API 模型数 {len(df)}（下限 {MINIMUM_API_LANGUAGE_MODEL_COUNT_FOR_GUARDRAIL}）",
    )

    rows_with_cost_to_run = df["cost_to_run"].notna()
    current_api_cost_to_run_count = int(
        (
            rows_with_cost_to_run
            & (
                df["cost_to_run_value_source"]
                == COST_TO_RUN_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_API_CURRENT_RESPONSE
            )
        ).sum()
    )
    record_guardrail(
        "current_artificial_analysis_api_cost_to_run_value_count_positive",
        DATA_QUALITY_GUARDRAIL_STATUS_PASSED
        if current_api_cost_to_run_count > 0
        else DATA_QUALITY_GUARDRAIL_STATUS_FAILED,
        f"API 当期成本 {current_api_cost_to_run_count} 条",
    )

    previous_guardrail_passed_response = find_previous_guardrail_passed_api_language_models_response_in_history(
        api_language_models_response_history_directory,
        api_response_metadata.get("fetched_at_utc"),
    )
    if previous_guardrail_passed_response is not None and previous_guardrail_passed_response[1] > 0:
        previous_response_history_file_path, previous_current_api_cost_to_run_count = (
            previous_guardrail_passed_response
        )
        current_api_cost_to_run_count_relative_drop = (
            previous_current_api_cost_to_run_count - current_api_cost_to_run_count
        ) / previous_current_api_cost_to_run_count
        record_guardrail(
            "current_artificial_analysis_api_cost_to_run_value_count_not_collapsed_versus_previous_guardrail_passed_response",
            DATA_QUALITY_GUARDRAIL_STATUS_PASSED
            if current_api_cost_to_run_count_relative_drop
            <= MAXIMUM_CURRENT_API_COST_TO_RUN_VALUE_COUNT_RELATIVE_DROP_VERSUS_PREVIOUS_GUARDRAIL_PASSED_RESPONSE
            else DATA_QUALITY_GUARDRAIL_STATUS_FAILED,
            f"API 当期成本 {current_api_cost_to_run_count} 条 vs 上一份通过护栏的响应 "
            f"{previous_response_history_file_path.name} 的 {previous_current_api_cost_to_run_count} 条："
            + (
                f"骤降 {current_api_cost_to_run_count_relative_drop:.1%}"
                if current_api_cost_to_run_count_relative_drop > 0
                else f"变化 {-current_api_cost_to_run_count_relative_drop:+.1%}"
            )
            + "（骤降上限 "
            f"{MAXIMUM_CURRENT_API_COST_TO_RUN_VALUE_COUNT_RELATIVE_DROP_VERSUS_PREVIOUS_GUARDRAIL_PASSED_RESPONSE:.0%}）",
        )
    else:
        record_guardrail(
            "current_artificial_analysis_api_cost_to_run_value_count_not_collapsed_versus_previous_guardrail_passed_response",
            DATA_QUALITY_GUARDRAIL_STATUS_PASSED
            if current_api_cost_to_run_count
            >= MINIMUM_CURRENT_API_COST_TO_RUN_VALUE_COUNT_WITHOUT_COMPARABLE_PREVIOUS_RESPONSE
            else DATA_QUALITY_GUARDRAIL_STATUS_FAILED,
            f"API 当期成本 {current_api_cost_to_run_count} 条；响应历史里没有可比的上一份通过护栏的响应，"
            f"改用绝对下限 {MINIMUM_CURRENT_API_COST_TO_RUN_VALUE_COUNT_WITHOUT_COMPARABLE_PREVIOUS_RESPONSE}"
            + (
                "（低于下限：疑似骤降）"
                if current_api_cost_to_run_count
                < MINIMUM_CURRENT_API_COST_TO_RUN_VALUE_COUNT_WITHOUT_COMPARABLE_PREVIOUS_RESPONSE
                else ""
            ),
        )

    cost_to_run_row_count = int(rows_with_cost_to_run.sum())
    non_current_fallback_cost_to_run_count = int(
        (
            rows_with_cost_to_run
            & ~df["cost_to_run_value_is_from_current_intelligence_index_version"].astype(bool)
        ).sum()
    )
    non_current_fallback_cost_to_run_share = (
        non_current_fallback_cost_to_run_count / cost_to_run_row_count if cost_to_run_row_count else 0.0
    )
    record_guardrail(
        "non_current_fallback_cost_to_run_share_at_most_maximum",
        DATA_QUALITY_GUARDRAIL_STATUS_PASSED
        if non_current_fallback_cost_to_run_share
        <= MAXIMUM_NON_CURRENT_FALLBACK_COST_TO_RUN_SHARE_OF_ALL_COST_TO_RUN_ROWS
        else DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY,
        f"非当期回退成本 {non_current_fallback_cost_to_run_count}/{cost_to_run_row_count} = "
        f"{non_current_fallback_cost_to_run_share:.1%}"
        f"（告警线 {MAXIMUM_NON_CURRENT_FALLBACK_COST_TO_RUN_SHARE_OF_ALL_COST_TO_RUN_ROWS:.0%}，超过只告警；"
        "API 成本大面积消失由骤降护栏拦截）",
    )

    accepted_catalog_partition_version = (
        embedded_model_catalog_load_result.accepted_partition_intelligence_index_version
        if embedded_model_catalog_load_result is not None
        else None
    )
    catalog_has_accepted_partition = (
        embedded_model_catalog_load_result is not None
        and bool(embedded_model_catalog_load_result.records_by_model_id)
    )
    for (
        guardrail_name,
        dimension_description,
        agreement_rate,
        compared_model_count,
        guardrail_warning_only_explanation,
    ) in (
        (
            "embedded_model_catalog_vs_api_cost_to_run_agreement_rate",
            "成本（相对误差 < 0.1%）",
            embedded_model_catalog_load_result.catalog_vs_api_cost_agreement_rate
            if embedded_model_catalog_load_result is not None
            else None,
            embedded_model_catalog_load_result.catalog_vs_api_cost_compared_model_count
            if embedded_model_catalog_load_result is not None
            else 0,
            "目录成本不是值来源，成本一律取 API",
        ),
        (
            "embedded_model_catalog_vs_api_intelligence_agreement_rate",
            f"智能分（容差 {EMBEDDED_MODEL_CATALOG_INTELLIGENCE_AGREEMENT_ABSOLUTE_TOLERANCE}）",
            embedded_model_catalog_load_result.catalog_vs_api_intelligence_agreement_rate
            if embedded_model_catalog_load_result is not None
            else None,
            embedded_model_catalog_load_result.catalog_vs_api_intelligence_compared_model_count
            if embedded_model_catalog_load_result is not None
            else 0,
            "智能分不一致的 UUID 其目录 token 已逐个降为非当期",
        ),
    ):
        if not catalog_has_accepted_partition or agreement_rate is None:
            record_guardrail(
                guardrail_name,
                DATA_QUALITY_GUARDRAIL_STATUS_SKIPPED_NOT_APPLICABLE,
                f"目录 vs API {dimension_description}：无被接受的目录分区或 UUID 交集为空，无从比对",
            )
            continue
        record_guardrail(
            guardrail_name,
            DATA_QUALITY_GUARDRAIL_STATUS_PASSED
            if agreement_rate >= CATALOG_VS_API_AGREEMENT_RATE_BELOW_WHICH_GUARDRAIL_WARNS
            else DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY,
            f"目录 vs API {dimension_description}一致率 {agreement_rate:.2%}（n={compared_model_count}，"
            f"低于 {CATALOG_VS_API_AGREEMENT_RATE_BELOW_WHICH_GUARDRAIL_WARNS:.0%} 只告警：{guardrail_warning_only_explanation}）",
        )

    if embedded_model_catalog_load_result is not None:
        current_output_token_count_row_count = (
            int(
                df["output_token_count_value_is_from_current_intelligence_index_version"]
                .map(lambda flag: isinstance(flag, (bool, np.bool_)) and bool(flag))
                .sum()
            )
            if "output_token_count_value_is_from_current_intelligence_index_version" in df.columns
            else 0
        )
        demoted_catalog_output_token_count_row_count = (
            int(df[OUTPUT_TOKEN_COUNT_VALUE_NON_CURRENT_REASON_CODE_COLUMN_NAME].notna().sum())
            if OUTPUT_TOKEN_COUNT_VALUE_NON_CURRENT_REASON_CODE_COLUMN_NAME in df.columns
            else 0
        )
        if catalog_has_accepted_partition:
            record_guardrail(
                "embedded_model_catalog_partition_accepted_when_structurally_valid_detail_pages_exist",
                DATA_QUALITY_GUARDRAIL_STATUS_PASSED,
                f"被接受的目录分区 v{accepted_catalog_partition_version}，"
                f"当期 token {current_output_token_count_row_count} 条"
                + (
                    f"；另有 {demoted_catalog_output_token_count_row_count} 条目录 token 因该模型智能分与当期 API "
                    "不一致（或无从核对）逐个降为非当期"
                    if demoted_catalog_output_token_count_row_count
                    else ""
                ),
            )
        elif not embedded_model_catalog_load_result.partition_summaries:
            record_guardrail(
                "embedded_model_catalog_partition_accepted_when_structurally_valid_detail_pages_exist",
                EMBEDDED_MODEL_CATALOG_WITHOUT_ACCEPTED_PARTITION_GUARDRAIL_STATUS,
                "目录缓存没有任何结构有效的详情页"
                f"（无效页 {len(embedded_model_catalog_load_result.invalid_page_file_names)} 个，"
                f"目录 {embedded_model_catalog_load_result.cache_directory}）："
                f"当期 token {current_output_token_count_row_count} 条，有效速度口径没有参与分析的点",
            )
        else:
            best_candidate_partition_summary = _best_candidate_rejected_embedded_model_catalog_partition_summary(
                embedded_model_catalog_load_result
            )
            best_candidate_agreement_rate = best_candidate_partition_summary.intelligence_agreement_rate_with_api
            record_guardrail(
                "embedded_model_catalog_partition_accepted_when_structurally_valid_detail_pages_exist",
                EMBEDDED_MODEL_CATALOG_WITHOUT_ACCEPTED_PARTITION_GUARDRAIL_STATUS,
                f"有 {len(embedded_model_catalog_load_result.partition_summaries)} 个结构有效的目录分区，"
                "但没有一个被接受：当期 token "
                f"{current_output_token_count_row_count} 条，有效速度口径没有参与分析的点。最佳候选分区 "
                f"v{best_candidate_partition_summary.most_specific_intelligence_index_version}"
                f"（{best_candidate_partition_summary.cache_file_modification_date_utc}，"
                f"{best_candidate_partition_summary.page_count} 页）与 API 智能分一致率 "
                + (
                    f"{best_candidate_agreement_rate:.1%}"
                    f"（{best_candidate_partition_summary.intelligence_agreeing_with_api_model_count}/"
                    f"{best_candidate_partition_summary.intelligence_compared_with_api_model_count}）"
                    if best_candidate_agreement_rate is not None
                    else "无从计算"
                )
                + "；拒绝原因："
                + "；".join(best_candidate_partition_summary.rejection_reasons),
            )

    api_intelligence_index_version = api_response_metadata.get("intelligence_index_version")
    if api_intelligence_index_version is None or accepted_catalog_partition_version is None:
        record_guardrail(
            "api_intelligence_index_version_family_matches_embedded_model_catalog_partition",
            DATA_QUALITY_GUARDRAIL_STATUS_SKIPPED_NOT_APPLICABLE,
            f"API 版本 {api_intelligence_index_version} / 目录分区版本 {accepted_catalog_partition_version}："
            "至少一方未知，无从比对",
        )
    else:
        record_guardrail(
            "api_intelligence_index_version_family_matches_embedded_model_catalog_partition",
            DATA_QUALITY_GUARDRAIL_STATUS_PASSED
            if intelligence_index_version_family(api_intelligence_index_version)
            == intelligence_index_version_family(accepted_catalog_partition_version)
            else DATA_QUALITY_GUARDRAIL_STATUS_FAILED,
            f"API 版本 v{api_intelligence_index_version} vs 目录分区版本 v{accepted_catalog_partition_version}",
        )

    if artificial_analysis_models_list_page_html_cache_was_found is None:
        # 调用方没提供列表页信息（如单测直接调用）→ 不做该项检查
        pass
    elif not artificial_analysis_models_list_page_html_cache_was_found:
        record_guardrail(
            "artificial_analysis_models_list_page_snake_case_cost_record_count",
            DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY,
            "列表页缓存缺失（暂停抓取不补抓）；列表页已不是值来源",
        )
    elif artificial_analysis_models_list_page_snake_case_cost_record_count == 0:
        record_guardrail(
            "artificial_analysis_models_list_page_snake_case_cost_record_count",
            DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY,
            "列表页 snake_case 成本解析 0 条（AA payload 已改 camelCase）；列表页已不是值来源，成本取自 API",
        )
    else:
        record_guardrail(
            "artificial_analysis_models_list_page_snake_case_cost_record_count",
            DATA_QUALITY_GUARDRAIL_STATUS_PASSED,
            f"列表页 snake_case 成本解析 {artificial_analysis_models_list_page_snake_case_cost_record_count} 条（仅作核对，不是值来源）",
        )

    for guardrail_result in guardrail_results:
        if guardrail_result.guardrail_status == DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY:
            print(f"[warn] 护栏告警 {guardrail_result.guardrail_name}：{guardrail_result.guardrail_detail_text}")
    failed_guardrail_results = [
        guardrail_result
        for guardrail_result in guardrail_results
        if guardrail_result.guardrail_status == DATA_QUALITY_GUARDRAIL_STATUS_FAILED
    ]
    if failed_guardrail_results:
        raise ArtificialAnalysisDataQualityGuardrailViolationError(
            "数据质量护栏失败：\n  "
            + "\n  ".join(format_data_quality_guardrail_result_lines(guardrail_results))
        )
    return guardrail_results


DATA_QUALITY_GUARDRAIL_STATUS_DISPLAY_TEXT_BY_STATUS = {
    DATA_QUALITY_GUARDRAIL_STATUS_PASSED: "通过",
    DATA_QUALITY_GUARDRAIL_STATUS_FAILED: "失败",
    DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY: "告警",
    DATA_QUALITY_GUARDRAIL_STATUS_SKIPPED_NOT_APPLICABLE: "跳过",
}


def format_data_quality_guardrail_result_lines(
    guardrail_results: list[ArtificialAnalysisDataQualityGuardrailResult] | list[dict],
) -> list[str]:
    """把护栏结果（dataclass 或 df.attrs 里的 dict）格式化为中文行，供 main()/CLI 打印。"""
    formatted_lines = []
    for guardrail_result in guardrail_results:
        guardrail_result_fields = (
            guardrail_result if isinstance(guardrail_result, dict) else dataclasses.asdict(guardrail_result)
        )
        formatted_lines.append(
            f"[{DATA_QUALITY_GUARDRAIL_STATUS_DISPLAY_TEXT_BY_STATUS.get(guardrail_result_fields['guardrail_status'], guardrail_result_fields['guardrail_status'])}] "
            f"{guardrail_result_fields['guardrail_name']}：{guardrail_result_fields['guardrail_detail_text']}"
        )
    return formatted_lines


# ----------------------------------------------------------------------------- 写出与命令行
def save(df: pd.DataFrame, processed_models_csv_output_path: Path | None = None) -> Path:
    resolved_processed_models_csv_output_path = (
        Path(processed_models_csv_output_path)
        if processed_models_csv_output_path is not None
        else PROCESSED / "models.csv"
    )
    refuse_shared_worktree_directory_write(resolved_processed_models_csv_output_path)
    resolved_processed_models_csv_output_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(resolved_processed_models_csv_output_path, index=False)
    return resolved_processed_models_csv_output_path


def main(
    refresh: bool = False,
    *,
    allow_artificial_analysis_website_page_fetch: bool | None = None,
    use_previous_run_processed_models_csv_as_fallback: bool = False,
    processed_models_csv_output_path: Path | None = None,
    artificial_analysis_raw_data_directory: Path | None = None,
    previous_run_processed_models_csv_path: Path | None = None,
) -> None:
    df = build_dataframe(
        refresh,
        allow_artificial_analysis_website_page_fetch=allow_artificial_analysis_website_page_fetch,
        use_previous_run_processed_models_csv_as_fallback=use_previous_run_processed_models_csv_as_fallback,
        artificial_analysis_raw_data_directory=artificial_analysis_raw_data_directory,
        previous_run_processed_models_csv_path=(
            previous_run_processed_models_csv_path
            if previous_run_processed_models_csv_path is not None
            else processed_models_csv_output_path
        ),
    )
    written_processed_models_csv_path = save(df, processed_models_csv_output_path)
    artificial_analysis_data_provenance = df.attrs[
        MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE
    ]
    embedded_model_catalog_load_summary = df.attrs[
        MODELS_DATAFRAME_ATTRS_KEY_EMBEDDED_MODEL_CATALOG_LOAD_SUMMARY
    ]
    models_with_intelligence_raw_speed_and_cost_to_run = df.dropna(
        subset=["intelligence", "output_speed", "cost_to_run"]
    )
    models_with_intelligence_effective_speed_and_cost_to_run = df.dropna(
        subset=["intelligence", "eff_speed", "cost_to_run"]
    )
    print(f"API 模型: {len(df)}")
    print(
        "API 抓取时间: "
        f"{artificial_analysis_data_provenance['artificial_analysis_api_response_fetched_at_utc']}"
        f"（{artificial_analysis_data_provenance['artificial_analysis_api_response_fetched_at_utc_source']}）"
    )
    print(
        f"当期智能指数版本: v{artificial_analysis_data_provenance['current_intelligence_index_version']}"
        f"（{artificial_analysis_data_provenance['current_intelligence_index_version_source']}）"
    )
    print(
        "成本来源计数: "
        f"{dict(Counter(str(value_source) for value_source in df['cost_to_run_value_source']))}"
    )
    print(
        "token 来源计数: "
        f"{dict(Counter(str(value_source) for value_source in df['output_token_count_value_source']))}"
    )
    print(
        "内嵌目录分区: "
        f"v{embedded_model_catalog_load_summary['accepted_partition_intelligence_index_version']}，"
        f"截至 {embedded_model_catalog_load_summary['accepted_partition_captured_at_utc']}，"
        f"无效页 {embedded_model_catalog_load_summary['invalid_page_file_names']}"
    )
    print(f"含冗长度(输出token量): {df['output_mtokens'].notna().sum()}")
    print(f"三维齐全(智能/原始速度/成本): {len(models_with_intelligence_raw_speed_and_cost_to_run)}")
    print(f"三维齐全(智能/有效速度/成本): {len(models_with_intelligence_effective_speed_and_cost_to_run)}")
    print("数据质量护栏:")
    for guardrail_result_line in format_data_quality_guardrail_result_lines(
        df.attrs[MODELS_DATAFRAME_ATTRS_KEY_DATA_QUALITY_GUARDRAIL_RESULTS]
    ):
        print(f"  {guardrail_result_line}")
    print(f"已写出: {written_processed_models_csv_path}")


def _parse_fetch_data_command_line_arguments(command_line_arguments: list[str] | None = None):
    command_line_argument_parser = argparse.ArgumentParser(
        description="刷新 Artificial Analysis API 与受限网页目录，合并值溯源并写出 models.csv"
    )
    command_line_argument_parser.add_argument(
        "--refresh", action="store_true", help="重拉 API，并在目录冷却期结束后自动抓取 2–3 页"
    )
    from .artificial_analysis_minimal_model_catalog_refresh import add_website_catalog_fetch_policy_arguments
    add_website_catalog_fetch_policy_arguments(command_line_argument_parser)
    command_line_argument_parser.add_argument(
        "--use-previous-run-processed-models-csv-as-fallback",
        action="store_true",
        help="把上次产物 data/processed/models.csv 作为非当期回退源（版本未知）",
    )
    command_line_argument_parser.add_argument(
        "--processed-models-csv-out",
        type=Path,
        default=None,
        help="models.csv 输出路径（缺省按 checkout 选择的 models.csv 路径）",
    )
    command_line_argument_parser.add_argument(
        "--artificial-analysis-raw-data-directory",
        type=Path,
        default=None,
        help=(
            "原始数据目录（缺省按 checkout 选择的原始缓存目录）：API 缓存、API 响应历史、列表页与详情页缓存都在其下读写；"
            "指向 scratch 副本即可彩排 --refresh 而不碰共享目录"
        ),
    )
    command_line_argument_parser.add_argument(
        "--previous-run-processed-models-csv-in",
        type=Path,
        default=None,
        help="上次产物 models.csv 的读取路径（缺省同 --processed-models-csv-out，再缺省按 checkout 选择的 models.csv 路径）",
    )
    return command_line_argument_parser.parse_args(command_line_arguments)


if __name__ == "__main__":
    parsed_command_line_arguments = _parse_fetch_data_command_line_arguments()
    main(
        refresh=parsed_command_line_arguments.refresh,
        allow_artificial_analysis_website_page_fetch=(
            parsed_command_line_arguments.allow_artificial_analysis_website_page_fetch
        ),
        use_previous_run_processed_models_csv_as_fallback=(
            parsed_command_line_arguments.use_previous_run_processed_models_csv_as_fallback
        ),
        processed_models_csv_output_path=parsed_command_line_arguments.processed_models_csv_out,
        artificial_analysis_raw_data_directory=(
            parsed_command_line_arguments.artificial_analysis_raw_data_directory
        ),
        previous_run_processed_models_csv_path=(
            parsed_command_line_arguments.previous_run_processed_models_csv_in
        ),
    )
