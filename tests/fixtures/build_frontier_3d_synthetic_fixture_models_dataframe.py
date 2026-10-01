"""T3 合成 fixture：构造一张「形如 fetch_data.build_dataframe 输出」的模型表（测试专用）。

按分支覆盖构造，不硬凑数量；全部模型名、数值都是虚构的，不来自 AA 真实数据：
- 谱系：Google「Pro」档位三代（2 Pro 早于硬截断、2.5 Pro 在软窗外且被支配、3 Pro 保留），
  用来覆盖「被剪枝的前身仍连成谱系」；
- reasoning 档位：同一基模型 `Qwen4 Max` 的 (low)/(medium)/(high) 三档；
- 厂商：中国（Alibaba、DeepSeek、Moonshot AI）、美国（OpenAI、Google、Anthropic、Meta、xAI）、
  其他（Mistral）、未注册（Future Unmapped Laboratory）、None、空串；
- 剪枝五个分支：缺维度（缺速度、缺成本）、过旧(硬截断)、保留、过旧(软窗外且非前沿)、离前沿太远
  （Meta 的四级支配链，max_layers=3 时最后两级被剪）；
- 当期与历史口径混合（D-1）：成本、token 各自可能来自 v4.1 回退快照；其中一个历史口径点在
  两个有效成本口径里会支配几乎所有当期点，用来证明它不改变分析层 Pareto；
- V-3：一个 9/23 之后上架、不在目录分区、缺当期 token 的新模型（有效速度口径缺席）；
- 一个没有智能分的模型（不应出现在 excluded_models_with_drop_reason 里）。

剪枝参考日期固定为 `FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE`（2026-09-23），
与数据溯源里的 API 抓取日期一致；测试不得依赖运行当天的日期。
"""
from __future__ import annotations

import math

import pandas as pd

FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE = "2026-09-23"
FRONTIER_3D_SYNTHETIC_FIXTURE_CURRENT_INTELLIGENCE_INDEX_VERSION = "4.3.2"
FRONTIER_3D_SYNTHETIC_FIXTURE_NON_CURRENT_INTELLIGENCE_INDEX_VERSION = "4.1"
FRONTIER_3D_SYNTHETIC_FIXTURE_API_RESPONSE_FETCHED_AT_UTC = "2026-09-23T05:50:32Z"
FRONTIER_3D_SYNTHETIC_FIXTURE_EMBEDDED_MODEL_CATALOG_CAPTURED_AT_UTC = "2026-09-23T05:52:49Z"
FRONTIER_3D_SYNTHETIC_FIXTURE_NON_CURRENT_FALLBACK_SNAPSHOT_CAPTURED_AT_DATE = "2026-07-01"
FRONTIER_3D_SYNTHETIC_FIXTURE_REFERENCE_OUTPUT_MILLION_TOKENS_BY_VERSION_FAMILY = {
    "4.3": 87.0,
    "4.1": 21.0,
}

# 模型表 attrs 的键（与 fetch_data.MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE 相同；
# 这里写字面量，让 fixture 不依赖 fetch_data 的导入副作用）
MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE_FOR_SYNTHETIC_FIXTURE = (
    "artificial_analysis_data_provenance"
)

_COST_SOURCE_API = "artificial_analysis_api_current_response"
_COST_SOURCE_SNAPSHOT = "versioned_non_current_fallback_snapshot"
_TOKEN_SOURCE_CATALOG = "artificial_analysis_embedded_model_catalog_accepted_partition"
_TOKEN_SOURCE_SNAPSHOT = "versioned_non_current_fallback_snapshot"

# 值来源组合的简写：C = 当期（API 成本 / 目录 token），H = 历史口径（v4.1 快照），- = 缺失
# 列：name, creator, release_date, intelligence, cost_to_run, output_speed,
#     output_million_tokens, blended_price, 成本来源, token 来源, is_estimated, is_reasoning, 不在目录分区
_SYNTHETIC_FIXTURE_MODEL_ROW_SPECIFICATIONS: list[tuple] = [
    # —— 同一基模型的三个 reasoning 档位（中国厂商）——
    ("Qwen4 Max (high)", "Alibaba", "2026-08-01", 60.0, 400.0, 60.0, 100.0, 6.0, "C", "C", False, True, False),
    ("Qwen4 Max (medium)", "Alibaba", "2026-08-01", 55.0, 200.0, 70.0, 60.0, 6.0, "C", "C", False, True, False),
    ("Qwen4 Max (low)", "Alibaba", "2026-08-01", 48.0, 90.0, 80.0, 30.0, 6.0, "C", "C", False, True, False),
    ("DeepSeek V5", "DeepSeek", "2026-05-01", 50.0, 40.0, 40.0, 40.0, 1.2, "C", "C", False, True, False),
    # —— 美国厂商 ——
    ("GPT-6 (high)", "OpenAI", "2026-07-01", 65.0, 900.0, 90.0, 120.0, 12.0, "C", "C", False, True, False),
    ("GPT-6 mini", "OpenAI", "2026-06-15", 45.0, 30.0, 150.0, 25.0, 1.5, "C", "C", False, False, False),
    # 谱系 Google||pro：三代，前两代被剪枝（硬截断 / 软窗外且被支配）
    ("Gemini 3 Pro", "Google", "2025-11-01", 58.0, 300.0, 120.0, 80.0, 5.0, "C", "C", False, True, False),
    ("Gemini 2.5 Pro", "Google", "2025-03-01", 40.0, 250.0, 100.0, 70.0, 5.0, "C", "C", True, True, False),
    ("Gemini 2 Pro", "Google", "2023-06-01", 30.0, 100.0, 60.0, 50.0, 4.0, "C", "C", True, False, False),
    # —— 其他国家 / 未注册 / None / 空串厂商 ——
    ("Mistral Large 4", "Mistral", "2026-02-01", 42.0, 60.0, 70.0, 35.0, 2.0, "C", "C", False, False, False),
    ("Future Lab Model", "Future Unmapped Laboratory", "2026-04-01", 38.0, 20.0, 50.0, 20.0, 0.8, "C", "C", False, False, False),
    ("Anonymous Creator Model", None, "2026-03-01", 35.0, 15.0, 55.0, 18.0, 0.6, "C", "C", False, False, False),
    ("Blank Creator Model", "", "2026-03-15", 33.0, 12.0, 45.0, 15.0, 0.5, "C", "C", False, False, False),
    # —— 「离前沿太远」：Meta 四级支配链（近期），max_layers=3 时 C、D 被剪 ——
    ("Laggard Chain A", "Meta", "2026-01-01", 20.0, 500.0, 10.0, 40.0, 9.0, "C", "C", False, False, False),
    ("Laggard Chain B", "Meta", "2026-01-01", 19.0, 600.0, 9.0, 40.0, 10.0, "C", "C", False, False, False),
    ("Laggard Chain C", "Meta", "2026-01-01", 18.0, 700.0, 8.0, 40.0, 11.0, "C", "C", False, False, False),
    ("Laggard Chain D", "Meta", "2026-01-01", 17.0, 800.0, 7.0, 40.0, 12.0, "C", "C", False, False, False),
    # —— 缺维度 ——
    ("Speedless Genius (Max Effort)", "Anthropic", "2026-09-01", 70.0, 1000.0, math.nan, 150.0, 20.0, "C", "C", False, True, False),
    ("Costless Model", "xAI", "2026-05-20", 52.0, math.nan, 80.0, 45.0, math.nan, "-", "C", False, True, False),
    # —— D-1 历史口径 ——
    # 成本与 token 都是 v4.1：在两个有效成本口径里便宜且（有效速度下）极快，会支配几乎所有当期点
    ("Claude Legacy 4 (Reasoning)", "Anthropic", "2026-01-15", 62.0, 5.0, 100.0, 10.0, 3.0, "H", "H", False, True, False),
    # 成本当期、token 历史：effective__raw 参与，含有效速度的口径不参与
    ("Kimi K3", "Moonshot AI", "2026-06-01", 47.0, 70.0, 60.0, 12.0, 1.0, "C", "H", False, True, False),
    # token 当期、成本历史：blended__effective 参与，含有效成本的口径不参与
    ("Grok 5", "xAI", "2026-04-15", 54.0, 80.0, 70.0, 50.0, 4.0, "H", "C", False, True, False),
    # —— V-3：9/23 之后上架、不在目录分区、缺当期 token ——
    ("Brand New Model (V-3)", "OpenAI", "2026-09-20", 56.0, 150.0, 200.0, math.nan, 3.0, "C", "-", None, None, True),
    # —— 没有智能分：不应进入 excluded_models_with_drop_reason ——
    ("Unscored Model", "Mistral", "2026-07-01", math.nan, 10.0, 90.0, 10.0, 0.4, "C", "C", None, None, False),
]


def _synthetic_model_uuid(synthetic_model_row_index: int) -> str:
    return f"00000000-0000-4000-9000-{synthetic_model_row_index:012d}"


def _synthetic_model_slug(model_name: str) -> str:
    return "".join(
        character if character.isalnum() else "-" for character in model_name.lower()
    ).strip("-")


def frontier_3d_synthetic_fixture_artificial_analysis_data_provenance() -> dict:
    """与 fetch_data.build_dataframe 写入 df.attrs 的数据溯源同构（除 pruning_reference_date）。"""
    return {
        "artificial_analysis_api_response_fetched_at_utc": (
            FRONTIER_3D_SYNTHETIC_FIXTURE_API_RESPONSE_FETCHED_AT_UTC
        ),
        "artificial_analysis_api_response_fetched_at_utc_source": (
            "inferred_from_cache_file_modification_time"
        ),
        "artificial_analysis_api_intelligence_index_version": None,
        "artificial_analysis_api_tier": None,
        "artificial_analysis_api_source_url": "https://artificialanalysis.ai/api/v2/language/models/free",
        "current_intelligence_index_version": (
            FRONTIER_3D_SYNTHETIC_FIXTURE_CURRENT_INTELLIGENCE_INDEX_VERSION
        ),
        "current_intelligence_index_version_source": (
            "inferred_from_accepted_embedded_model_catalog_partition"
        ),
        "embedded_model_catalog_intelligence_index_version": (
            FRONTIER_3D_SYNTHETIC_FIXTURE_CURRENT_INTELLIGENCE_INDEX_VERSION
        ),
        "embedded_model_catalog_captured_at_utc": (
            FRONTIER_3D_SYNTHETIC_FIXTURE_EMBEDDED_MODEL_CATALOG_CAPTURED_AT_UTC
        ),
        "artificial_analysis_website_page_fetch_paused": True,
        "reference_output_million_tokens_for_effective_speed_normalization_by_intelligence_index_version_family": dict(
            FRONTIER_3D_SYNTHETIC_FIXTURE_REFERENCE_OUTPUT_MILLION_TOKENS_BY_VERSION_FAMILY
        ),
        "artificial_analysis_attribution_url": "https://artificialanalysis.ai/",
    }


def build_frontier_3d_synthetic_fixture_models_dataframe() -> pd.DataFrame:
    """返回合成模型表（列与 fetch_data.build_dataframe 输出中本可视化用到的列一致）。"""
    synthetic_model_rows = []
    for synthetic_model_row_index, (
        model_name,
        creator_name,
        release_date_text,
        intelligence,
        cost_to_run,
        output_speed,
        output_million_tokens,
        blended_price,
        cost_value_currentness_code,
        token_value_currentness_code,
        intelligence_index_is_estimated,
        is_reasoning_model,
        is_absent_from_accepted_catalog_partition,
    ) in enumerate(_SYNTHETIC_FIXTURE_MODEL_ROW_SPECIFICATIONS):
        cost_value_is_current = cost_value_currentness_code == "C"
        token_value_is_current = token_value_currentness_code == "C"
        cost_value_source = {
            "C": _COST_SOURCE_API,
            "H": _COST_SOURCE_SNAPSHOT,
            "-": None,
        }[cost_value_currentness_code]
        token_value_source = {
            "C": _TOKEN_SOURCE_CATALOG,
            "H": _TOKEN_SOURCE_SNAPSHOT,
            "-": None,
        }[token_value_currentness_code]
        cost_value_version = {
            "C": FRONTIER_3D_SYNTHETIC_FIXTURE_CURRENT_INTELLIGENCE_INDEX_VERSION,
            "H": FRONTIER_3D_SYNTHETIC_FIXTURE_NON_CURRENT_INTELLIGENCE_INDEX_VERSION,
            "-": None,
        }[cost_value_currentness_code]
        token_value_version = {
            "C": FRONTIER_3D_SYNTHETIC_FIXTURE_CURRENT_INTELLIGENCE_INDEX_VERSION,
            "H": FRONTIER_3D_SYNTHETIC_FIXTURE_NON_CURRENT_INTELLIGENCE_INDEX_VERSION,
            "-": None,
        }[token_value_currentness_code]
        cost_value_fetched_at = {
            "C": FRONTIER_3D_SYNTHETIC_FIXTURE_API_RESPONSE_FETCHED_AT_UTC,
            "H": FRONTIER_3D_SYNTHETIC_FIXTURE_NON_CURRENT_FALLBACK_SNAPSHOT_CAPTURED_AT_DATE,
            "-": None,
        }[cost_value_currentness_code]
        token_value_fetched_at = {
            "C": FRONTIER_3D_SYNTHETIC_FIXTURE_EMBEDDED_MODEL_CATALOG_CAPTURED_AT_UTC,
            "H": FRONTIER_3D_SYNTHETIC_FIXTURE_NON_CURRENT_FALLBACK_SNAPSHOT_CAPTURED_AT_DATE,
            "-": None,
        }[token_value_currentness_code]
        reference_output_million_tokens = (
            FRONTIER_3D_SYNTHETIC_FIXTURE_REFERENCE_OUTPUT_MILLION_TOKENS_BY_VERSION_FAMILY.get(
                ".".join(token_value_version.split(".")[:2]) if token_value_version else "",
                math.nan,
            )
        )
        effective_speed = output_speed / (output_million_tokens / reference_output_million_tokens)
        synthetic_model_rows.append(
            {
                "id": _synthetic_model_uuid(synthetic_model_row_index),
                "slug": _synthetic_model_slug(model_name),
                "name": model_name,
                "creator": creator_name,
                "release_date": pd.Timestamp(release_date_text),
                "intelligence": intelligence,
                "output_speed": output_speed,
                "blended_price_cache_input_output_7_to_2_to_1": blended_price,
                "blended_price_cache_hit_price_source": (
                    None if math.isnan(blended_price) else "computed_with_api_cache_hit_price"
                ),
                "cost_to_run": cost_to_run,
                "cost_to_run_value_source": cost_value_source,
                "cost_to_run_value_intelligence_index_version": cost_value_version,
                "cost_to_run_value_fetched_at_utc": cost_value_fetched_at,
                "cost_to_run_value_is_from_current_intelligence_index_version": cost_value_is_current,
                "intelligence_index_canonical_output_token_count": output_million_tokens * 1e6,
                "output_token_count_value_source": token_value_source,
                "output_token_count_value_intelligence_index_version": token_value_version,
                "output_token_count_value_fetched_at_utc": token_value_fetched_at,
                "output_token_count_value_is_from_current_intelligence_index_version": (
                    token_value_is_current
                ),
                "output_mtokens": output_million_tokens,
                "eff_speed": effective_speed,
                "artificial_analysis_intelligence_index_is_estimated": intelligence_index_is_estimated,
                "artificial_analysis_is_reasoning_model": is_reasoning_model,
                "is_absent_from_accepted_embedded_model_catalog_partition": (
                    is_absent_from_accepted_catalog_partition
                ),
            }
        )
    synthetic_models_dataframe = pd.DataFrame(synthetic_model_rows)
    synthetic_models_dataframe.attrs[
        MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE_FOR_SYNTHETIC_FIXTURE
    ] = frontier_3d_synthetic_fixture_artificial_analysis_data_provenance()
    return synthetic_models_dataframe
