"""Plotly 三维可视化：智能 × 可切换速度 × 可切换成本 + Pareto 前沿流形。

- Scatter3d：保留的模型，按厂商着色；Pareto 最优点用黑色空心圈叠加强调。
- 前沿流形：Pareto 最优点在 (log成本, 速度) 平面做 Delaunay 三角化、抬升 z=智能，
  织成"在每个成本/速度处由最智能模型编织的曲面"。**默认画线框**（Scatter3d 线，不挡下方
  节点悬浮）；可切半透明实心 Mesh3d（观感更好，但触发 Plotly 痼疾——盖住其下方节点 hover）。
- 可选 Surface：可达前沿 F(成本预算,速度下限)=max 智能（阶梯面，按钮/图例可开）。

坐标：x=有效运行成本或 7:2:1 混合单价（对数）、y=有效速度或原始速度（可对数）、
z=智能指数。每种组合分别计算 Pareto、剪枝、前沿与轴范围。
"""
from __future__ import annotations

import re
import warnings
from functools import lru_cache
from pathlib import Path

import numpy as np
import pandas as pd
import plotly.graph_objects as go
from plotly.colors import qualitative

from . import frontier
from .frontier_3d_pure_scene_geometry import (
    build_delaunay_neighbor_reference_geometry,
    build_legacy_achievable_step_geometry_for_v2_comparison,
    plotly_coordinate_keywords_from_scene_geometry,
)

PALETTE = qualitative.Dark24 + qualitative.Light24

# 契约 marker.value_provenance 的字段（与 fetch_data 的值溯源列同名，规格 5.3）
DISPLAYED_MODEL_MARKER_VALUE_PROVENANCE_COLUMN_NAMES = (
    "cost_to_run_value_source",
    "cost_to_run_value_intelligence_index_version",
    "cost_to_run_value_fetched_at_utc",
    "output_token_count_value_source",
    "output_token_count_value_intelligence_index_version",
    "output_token_count_value_fetched_at_utc",
    "blended_price_cache_hit_price_source",
)
SPEED_AXIS_UNIT_TEXT = "tok/s"


def _finite_float_or_none(raw_value: object) -> float | None:
    """契约里的数值：有限浮点原样输出，NaN/Inf/None/非数值一律输出 None（→ JSON null）。"""
    if raw_value is None or isinstance(raw_value, bool):
        return None
    try:
        float_value = float(raw_value)
    except (TypeError, ValueError):
        return None
    return float_value if np.isfinite(float_value) else None


def _text_or_none(raw_value: object) -> str | None:
    """契约里的可空字符串：None / NaN / NaT → None，其余转成字符串。"""
    if raw_value is None or isinstance(raw_value, str):
        return raw_value
    if pd.isna(raw_value):
        return None
    return str(raw_value)


def _boolean_or_none(raw_value: object) -> bool | None:
    if isinstance(raw_value, (bool, np.bool_)):
        return bool(raw_value)
    return None


def speed_axis_title_text_with_unit_and_scale(speed_axis_name_text: str, speed_log: bool) -> str:
    """速度轴完整标题：`<轴名> tok/s（对数）`；线性轴不带「（对数）」。"""
    return f"{speed_axis_name_text} {SPEED_AXIS_UNIT_TEXT}" + ("（对数）" if speed_log else "")


def intelligence_axis_title_text_with_intelligence_index_version(
    current_intelligence_index_version: str | None,
) -> str:
    """z 轴标题带当期指数版本（W0-4）：`智能指数（AA Intelligence Index v4.3.2）`。"""
    if current_intelligence_index_version:
        return f"智能指数（AA Intelligence Index v{current_intelligence_index_version}）"
    return "智能指数（AA Intelligence Index，版本未知）"


# ── 模型名解析：基模型分组 + 谱系（creator+tier）分组 ────────────────────────
# Artificial Analysis 把同一基模型的每个 reasoning 档位作为独立条目返回（名字带
# 末尾括号后缀，如 "(low)"/"(Reasoning, Max Effort)"）。下列关键词用于把这些「纯档位
# 后缀」从模型名末尾剥离，得到「基模型名」——保留 "(Preview)"/"(May 2026)"/"(32B)"
# 这类区分不同代/规格的后缀。
REASONING_SUFFIX_KEYWORDS = {
    "reasoning", "non-reasoning", "non reasoning", "adaptive reasoning",
    "thinking", "high", "medium", "low", "minimal", "xhigh", "max",
    "high effort", "low effort", "max effort", "medium effort", "xhigh effort",
}
REASONING_LEVEL_SORT_ORDER_BY_NORMALIZED_LABEL = {
    "non-reasoning": 0,
    "minimal": 10,
    "low": 20,
    "medium": 30,
    "high": 40,
    "xhigh": 50,
    "max effort": 60,
}

# tier（产品档位）按优先序匹配：长词/更具体的在前，避免 "flash-lite" 被 "flash"/"lite"
# 抢先命中。未命中任何关键词的归 "(default)"（如 OpenAI o 系、gpt-oss、Grok 主线）。
TIER_KEYWORDS_BY_PRIORITY = [
    "flash-lite", "flash lite", "flash", "mini", "nano", "lite",
    "pro", "opus", "sonnet", "haiku", "deep think", "codex", "instant",
    "max", "plus", "ultra",
]
TIER_DEFAULT = "(default)"

# 误判兜底：把 name 子串 → (强制 base_model_name, 强制 tier)。初版留空；当发现某些模型
# 落错谱系（如想把 o 系/gpt-oss 从 OpenAI "(default)" 主线拆出）时在此手填。
LINEAGE_TIER_OVERRIDES: dict[str, tuple[str, str]] = {}

_TRAILING_PAREN_RE = re.compile(r"\s*\(([^()]*)\)\s*$")


def _is_reasoning_suffix_segment(segment: str) -> bool:
    # fallback 只修饰推理配置，不能单独把一个括号组认成推理档位。
    return segment in REASONING_SUFFIX_KEYWORDS or segment.endswith(" fallback")


def _is_pure_reasoning_suffix(segments: list[str]) -> bool:
    return bool(segments) and any(s in REASONING_SUFFIX_KEYWORDS for s in segments) and all(
        _is_reasoning_suffix_segment(s) for s in segments
    )


@lru_cache(maxsize=2048)
def _warn_about_unrecognized_model_name_suffix(name: str, suffix: str) -> None:
    normalized = suffix.lower()
    if ("based on" in normalized or "fallback" in normalized or
        re.search(r"\b(?:preview|instruct|beta|alpha|release|january|february|march|april|may|june|july|august|september|october|november|december)\b", normalized) or
        re.fullmatch(r"[\d\s./'_-]+", normalized) or
        re.fullmatch(r"\d+(?:\.\d+)?\s*[bm](?:\s*a\d+[bm])?", normalized)):
        return
    warnings.warn(f"模型名包含未识别的括号后缀，保留原文：{name!r}", RuntimeWarning, stacklevel=3)


def _explicit_lineage_family_key(creator: str, base_model_name: str) -> str | None:
    """仅连接有显式家族规则的产品；不以厂商或泛化 tier 猜测血缘。"""
    if creator == "Google":
        match = re.fullmatch(r"Gemini \d+(?:\.\d+)* (Pro|Flash-Lite|Flash)(?: Preview)?", base_model_name, re.I)
        return f"Google||Gemini {match[1].lower()}" if match else None
    if creator == "Anthropic":
        match = re.fullmatch(
            r"Claude (?:(Opus|Sonnet|Haiku) \d+(?:\.\d+)*|\d+(?:\.\d+)* (Opus|Sonnet|Haiku))",
            base_model_name, re.I,
        )
        return f"Anthropic||Claude {(match[1] or match[2]).lower()}" if match else None
    return None


def _parse_base_model_name(name: str, *, warn_unrecognized_suffix: bool = True) -> str:
    """反复剥离模型名末尾的纯 reasoning 档位括号组，得到基模型名。

    当且仅当某末尾括号内**所有逗号分段**都是 reasoning 关键词时才剥离，
    例如 "Claude Opus 4.8 (Adaptive Reasoning, Max Effort)" → "Claude Opus 4.8"；
    而 "GPT-5.5 Instant (May 2026)"、"Gemini 3.1 Pro Preview" 原样保留。
    """
    s = (name or "").strip()
    while True:
        m = _TRAILING_PAREN_RE.search(s)
        if not m:
            break
        segments = [seg.strip().lower() for seg in m.group(1).split(",")]
        if _is_pure_reasoning_suffix(segments):
            s = s[: m.start()].strip()
        else:
            if warn_unrecognized_suffix:
                _warn_about_unrecognized_model_name_suffix(name, m.group(1))
            break
    return s


def _reasoning_level_label_and_sort_order(name: str) -> tuple[str, int]:
    """返回用于同基模型 reasoning 档位连线的稳定标签与排序。

    未带纯 reasoning 后缀的模型视为 non-reasoning；未知后缀保留可读名称，
    排在已知档位之后并按名称稳定排序。
    """
    s = (name or "").strip()
    suffix_segments: list[str] = []
    while True:
        m = _TRAILING_PAREN_RE.search(s)
        if not m:
            break
        segments = [seg.strip().lower() for seg in m.group(1).split(",")]
        if _is_pure_reasoning_suffix(segments):
            suffix_segments = [seg for seg in segments if not seg.endswith(" fallback")] + suffix_segments
            s = s[: m.start()].strip()
        else:
            break
    if not suffix_segments:
        return "non-reasoning", REASONING_LEVEL_SORT_ORDER_BY_NORMALIZED_LABEL["non-reasoning"]

    normalized = " ".join(suffix_segments).replace("non reasoning", "non-reasoning")
    if "max" in suffix_segments or "max effort" in normalized:
        label = "max effort"
    elif "xhigh" in normalized:
        label = "xhigh"
    elif "high" in normalized:
        label = "high"
    elif "medium" in normalized:
        label = "medium"
    elif "low" in normalized:
        label = "low"
    elif "minimal" in normalized:
        label = "minimal"
    elif "non-reasoning" in normalized:
        label = "non-reasoning"
    else:
        label = " / ".join(suffix_segments)
    sort_order = REASONING_LEVEL_SORT_ORDER_BY_NORMALIZED_LABEL.get(
        label,
        1000 + sum(ord(ch) for ch in label.lower()),
    )
    return label, sort_order


def _classify_tier(base_model_name: str) -> str:
    """按优先序在基模型名上做「非字母包裹」匹配，返回产品档位 tier。"""
    low = base_model_name.lower()
    for kw in TIER_KEYWORDS_BY_PRIORITY:
        if re.search(r"(?<![a-z])" + re.escape(kw) + r"(?![a-z])", low):
            return kw
    return TIER_DEFAULT


def _resolve_lineage(name: str) -> tuple[str, str]:
    """返回 (base_model_name, tier)，先查人工 override，再走解析规则。"""
    for needle, (base, tier) in LINEAGE_TIER_OVERRIDES.items():
        if needle in name:
            return base, tier
    base = _parse_base_model_name(name)
    return base, _classify_tier(base)


def model_analysis_eligibility(r) -> dict:
    # D-1（规格 5.3）：没有 eligibility 列（旧调用方）时按「参与分析」输出
    if frontier.ANALYSIS_ELIGIBLE_COLUMN_NAME not in r.index:
        return {
            "is_analysis_eligible_for_current_metric_variant": True,
            "ineligibility_reason_codes": [],
            "ineligibility_reason_text": None,
        }
    raw_ineligibility_reason_codes = r.get(frontier.ANALYSIS_INELIGIBILITY_REASON_CODES_COLUMN_NAME)
    ineligibility_reason_codes = (
        list(raw_ineligibility_reason_codes)
        if isinstance(raw_ineligibility_reason_codes, (list, tuple))
        else []
    )
    return {
        "is_analysis_eligible_for_current_metric_variant": bool(
            r[frontier.ANALYSIS_ELIGIBLE_COLUMN_NAME]
        ),
        "ineligibility_reason_codes": ineligibility_reason_codes,
        "ineligibility_reason_text": frontier.format_analysis_ineligibility_reason_text(
            ineligibility_reason_codes,
            _text_or_none(r.get("cost_to_run_value_intelligence_index_version")),
            _text_or_none(r.get("output_token_count_value_intelligence_index_version")),
        ),
    }


def build_model_relationship_configuration_resolver_for_models_dataframe(df_full):
    release_base_names: dict[tuple[str, str], set[str]] = {}
    for _, row in df_full.iterrows():
        release_slug = _text_or_none(row.get("artificial_analysis_release_slug"))
        if release_slug:
            creator = _text_or_none(row.get("creator")) or "?"
            release_identity = (_text_or_none(row.get("creator_uuid")) or creator, release_slug)
            release_base_names.setdefault(release_identity, set()).add(_parse_base_model_name(str(row["name"]), warn_unrecognized_suffix=False))
    release_labels = {identity: min(names, key=lambda name: (len(name), name)) for identity, names in release_base_names.items()}

    def relationship_configuration(row):
        name = str(row["name"])
        creator = _text_or_none(row.get("creator")) or "?"
        release_slug = _text_or_none(row.get("artificial_analysis_release_slug"))
        if not release_slug:
            base, tier = _resolve_lineage(name)
            level, sort_order = _reasoning_level_label_and_sort_order(name)
            return base, tier, level, sort_order, _explicit_lineage_family_key(creator, base)
        identity = (_text_or_none(row.get("creator_uuid")) or creator, release_slug)
        base = release_labels[identity]
        family = _explicit_lineage_family_key(creator, base)
        if list(release_labels.values()).count(base) > 1:
            base = f"{base} [{creator} / {release_slug}]"
        effort_slug = _text_or_none(row.get("artificial_analysis_reasoning_effort_slug"))
        if _boolean_or_none(row.get("artificial_analysis_is_reasoning_model")) is False:
            level = "non-reasoning"
        elif effort_slug:
            level = effort_slug.casefold().replace("_", " ").replace("-effort", " effort")
            if level == "max":
                level = "max effort"
        else:
            level = "reasoning（档位未知）"
        return base, _classify_tier(base), level, REASONING_LEVEL_SORT_ORDER_BY_NORMALIZED_LABEL.get(level, 1000), family

    return relationship_configuration


def _build_lineage_payload(
    df_full: pd.DataFrame,
    cost_metric_column_name: str,
    cost_metric_label: str,
    cost_metric_unit: str,
    speed_metric_column_name: str,
    speed_metric_label: str,
) -> dict:
    """构造注入前端 JS 的数据。

    - models[]（仅 kept，可见节点）：每模型 {name, base_model_name, creator, tier,
      lineage_key, x, y, z, panel}；用于搜索 / pin / 高亮 / 侧栏详情。
    - base_groups{base_model_name: [models 下标...]}：pin 时整组固定其全部档位。
    - lineages{"显式家族||推理档位": [按发布日升序的同档位节点...]}：**基于全量
      三维齐全的数据（不限 kept）**，使被剪枝的历代前身仍能连成谱系（用户示例 Gemini
      2.5 Pro → 3 Pro → 3.1 Pro 多数前身已被剪枝，故谱系必须越过 kept 取自全量）。
      每个谱系节点自带坐标与标签（含 kept 标记），仅在 hover/pin 时随谱系线显示。
      仅保留 >=2 代的谱系（单代无连线）。
    """
    # —— models / base_groups：仅 kept ——
    def _field_or_none(r, name):
        # 突出度/归一坐标由 add_standout_metrics 写入；缺列或 NaN → None(→ JS null)。
        return _finite_float_or_none(r[name]) if name in r.index else None

    def _value_provenance(r) -> dict:
        return {
            column_name: _text_or_none(r.get(column_name))
            for column_name in DISPLAYED_MODEL_MARKER_VALUE_PROVENANCE_COLUMN_NAMES
        }

    relationship_configuration = build_model_relationship_configuration_resolver_for_models_dataframe(df_full)

    kept = df_full[df_full["kept"]].reset_index(drop=True)
    models: list[dict] = []
    for _, r in kept.iterrows():
        name = str(r["name"])
        base, tier, reasoning_level_label, reasoning_level_sort_order, lineage_family_key = relationship_configuration(r)
        creator = str(r["creator"]) if pd.notna(r["creator"]) else "?"
        rd = r["release_date"]
        models.append({
            "name": name,
            "model_uuid": _text_or_none(r.get("id")),
            "creator_uuid": _text_or_none(r.get("creator_uuid")),
            "artificial_analysis_release_slug": _text_or_none(r.get("artificial_analysis_release_slug")),
            "artificial_analysis_reasoning_effort_slug": _text_or_none(r.get("artificial_analysis_reasoning_effort_slug")),
            "artificial_analysis_is_reasoning_model": _boolean_or_none(r.get("artificial_analysis_is_reasoning_model")),
            "base_model_name": base,
            "reasoning_level_label": reasoning_level_label,
            "reasoning_level_sort_order": reasoning_level_sort_order,
            "creator": creator,
            "tier": tier,
            "lineage_family_key": lineage_family_key,
            "lineage_key": f"{lineage_family_key}||{reasoning_level_label}" if lineage_family_key else None,
            "x": float(r[cost_metric_column_name]),
            "y": float(r[speed_metric_column_name]),
            "z": float(r["intelligence"]),
            "displayed_only_because_of_recent_release_grace_period": bool(
                r.get(frontier.DISPLAYED_ONLY_BECAUSE_OF_RECENT_RELEASE_GRACE_PERIOD_COLUMN_NAME, False)
            ),
            # panel 里可能缺失的数值（跨口径列、非 eligible 点的分析层号）一律输出 None（规格 5.3）
            "panel": {
                "release_date": rd.strftime("%Y-%m-%d") if pd.notna(rd) else "?",
                "intelligence": _finite_float_or_none(r["intelligence"]),
                "output_mtokens": _finite_float_or_none(r.get("output_mtokens")),
                "output_speed": _finite_float_or_none(r["output_speed"]),
                "eff_speed": _finite_float_or_none(r["eff_speed"]),
                "cost_to_run": _finite_float_or_none(r["cost_to_run"]),
                "blended_price_cache_input_output_7_to_2_to_1": _finite_float_or_none(
                    r["blended_price_cache_input_output_7_to_2_to_1"]
                ),
                "layer": _finite_float_or_none(r["layer"]),
                "output_mtokens": _field_or_none(r, "output_mtokens"),
            },
            "analysis_eligibility": model_analysis_eligibility(r),
            "value_provenance": _value_provenance(r),
            "artificial_analysis_intelligence_index_is_estimated": _boolean_or_none(
                r.get("artificial_analysis_intelligence_index_is_estimated")
            ),
            # 四个突出度值（加权超体积为 w=1 静态值；JS 端按滑杆权重实时重算）
            "standout_metrics": {
                "trend_residual": _field_or_none(r, "standout_trend_residual"),
                "trend_residual_standard_deviation_units": _field_or_none(
                    r, "standout_trend_residual_sigma"
                ),
                "intelligence_uplift": _field_or_none(r, "standout_intelligence_uplift"),
                "weighted_exclusive_hypervolume": _field_or_none(
                    r, "standout_weighted_hypervolume"
                ),
                "frontier_distance": _field_or_none(r, "standout_frontier_distance"),
            },
            # 归一改进坐标（JS 实时重算加权超体积只需该坐标与权重，无需回传轴范围）
            "normalized_improvement_coordinates": {
                "cost_efficiency": _field_or_none(r, "g_cost"),
                "speed": _field_or_none(r, "g_speed"),
                "intelligence": _field_or_none(r, "g_intel"),
            },
        })

    base_groups: dict[str, list[int]] = {}
    for i, m in enumerate(models):
        base_groups.setdefault(m["base_model_name"], []).append(i)
    reasoning_variant_groups: dict[str, list[int]] = {
        base: sorted(
            indices,
            key=lambda i: (
                models[i]["reasoning_level_sort_order"],
                models[i]["reasoning_level_label"].lower(),
                models[i]["name"].lower(),
            ),
        )
        for base, indices in base_groups.items()
        if len(indices) >= 2
    }

    # 同家族同档位逐代连接；同代其他档位不再被冒充为「前身」。
    kept_model_uuids = {m["model_uuid"] for m in models if m["model_uuid"]}
    kept_names = {m["name"] for m in models}
    dims = [cost_metric_column_name, speed_metric_column_name, "intelligence"]
    complete = df_full[df_full[dims].notna().all(axis=1)]
    per_key_generations: dict[str, dict[str, dict]] = {}
    for _, r in complete.iterrows():
        name = str(r["name"])
        base, _, level, level_sort_order, family = relationship_configuration(r)
        creator = str(r["creator"]) if pd.notna(r["creator"]) else "?"
        rd = r["release_date"]
        if family is None or pd.isna(rd):
            continue
        key = f"{family}||{level}"
        model_uuid = _text_or_none(r.get("id"))
        node = {
            "name": name, "model_uuid": model_uuid, "creator": creator,
            "base_model_name": base, "label": base, "lineage_family_key": family,
            "reasoning_level_label": level, "reasoning_level_sort_order": level_sort_order,
            "release_date": rd.strftime("%Y-%m-%d"),
            "x": float(r[cost_metric_column_name]), "y": float(r[speed_metric_column_name]),
            "z": float(r["intelligence"]), "intelligence": float(r["intelligence"]),
            "kept": model_uuid in kept_model_uuids if model_uuid else name in kept_names,
            "analysis_eligibility": model_analysis_eligibility(r),
        }
        generations = per_key_generations.setdefault(key, {})
        previous = generations.get(base)
        # 同代同档位的重复记录按 UUID 稳定去重，不借最高智能分挑选别的档位。
        if previous is None or (model_uuid or name) < (previous["model_uuid"] or previous["name"]):
            generations[base] = node
    lineages = {
        key: sorted(generations.values(), key=lambda node: (node["release_date"], node["base_model_name"]))
        for key, generations in per_key_generations.items() if len(generations) >= 2
    }

    return {
        "models": models,
        "base_groups": base_groups,
        "reasoning_variant_group_model_indices_by_base_model_name": reasoning_variant_groups,
        "lineages": lineages,
        "cost_axis_field": cost_metric_column_name,
        "cost_axis_label": cost_metric_label,
        "cost_axis_unit": cost_metric_unit,
        "speed_axis_field": speed_metric_column_name,
        "speed_axis_label": speed_metric_label,
    }

# RVF-002：某口径剪枝后零 kept、又没有任何三维齐全的谱系节点（如有效速度全缺）时的兜底轴范围。
# 对数轴以 log10 为单位：成本 0.1–1000，速度 1–1000 tok/s；线性轴为原值：速度 0–1000、智能 0–100。
# EXPERIMENT_NODE: 空口径兜底轴范围用固定常数，还是改取全量数据里该轴已有值的范围（与其他口径对齐）
FALLBACK_COST_AXIS_LOG10_RANGE_FOR_EMPTY_SCENE_WITHOUT_PLOTTABLE_VALUES = (-1.0, 3.0)
FALLBACK_SPEED_AXIS_LOG10_RANGE_FOR_EMPTY_SCENE_WITHOUT_PLOTTABLE_VALUES = (0.0, 3.0)
FALLBACK_SPEED_AXIS_LINEAR_RANGE_FOR_EMPTY_SCENE_WITHOUT_PLOTTABLE_VALUES = (0.0, 1000.0)
FALLBACK_INTELLIGENCE_AXIS_LINEAR_RANGE_FOR_EMPTY_SCENE_WITHOUT_PLOTTABLE_VALUES = (0.0, 100.0)


def _fixed_axis_ranges(
    kept: pd.DataFrame,
    payload: dict,
    cost_metric_column_name: str,
    speed_metric_column_name: str,
    speed_log: bool,
) -> tuple[list, list, list]:
    """固定轴域只使用生成时完整、有限的显示模型；谱系前身由渲染层夹紧。"""
    dimensions = [cost_metric_column_name, speed_metric_column_name, "intelligence"]
    coordinates = kept[dimensions].to_numpy(dtype=float)
    valid = np.isfinite(coordinates).all(axis=1) & (coordinates[:, 0] > 0)
    if speed_log:
        valid &= coordinates[:, 1] > 0
    costs, speeds, intels = coordinates[valid].T.tolist()

    def log_range(vals, pad=0.04, fallback_log10_range_for_empty_scene=None):
        # RVF-002：空场景（零 kept 且零谱系节点）没有值可取 min/max，用兜底范围让坐标轴仍可画
        if not vals:
            return list(fallback_log10_range_for_empty_scene)
        lo, hi = min(vals), max(vals)
        l0, l1 = np.log10(lo), np.log10(hi)
        m = (l1 - l0) * pad or 0.1
        return [l0 - m, l1 + m]

    def lin_range(vals, pad=0.05, fallback_linear_range_for_empty_scene=None):
        if not vals:
            return list(fallback_linear_range_for_empty_scene)
        lo, hi = min(vals), max(vals)
        m = (hi - lo) * pad or 1.0
        return [lo - m, hi + m]

    x_range = log_range(                                         # 成本恒对数
        costs,
        fallback_log10_range_for_empty_scene=FALLBACK_COST_AXIS_LOG10_RANGE_FOR_EMPTY_SCENE_WITHOUT_PLOTTABLE_VALUES,
    )
    y_range = (
        log_range(
            speeds,
            fallback_log10_range_for_empty_scene=(
                FALLBACK_SPEED_AXIS_LOG10_RANGE_FOR_EMPTY_SCENE_WITHOUT_PLOTTABLE_VALUES
            ),
        )
        if speed_log
        else [max(0.0, bound) for bound in lin_range(
            speeds,
            fallback_linear_range_for_empty_scene=(
                FALLBACK_SPEED_AXIS_LINEAR_RANGE_FOR_EMPTY_SCENE_WITHOUT_PLOTTABLE_VALUES
            ),
        )]
    )
    z_range = lin_range(
        intels,
        fallback_linear_range_for_empty_scene=(
            FALLBACK_INTELLIGENCE_AXIS_LINEAR_RANGE_FOR_EMPTY_SCENE_WITHOUT_PLOTTABLE_VALUES
        ),
    )
    return x_range, y_range, z_range


HOVER_TMPL = (
    "<b>%{customdata[0]}</b><br>"
    "厂商: %{customdata[1]} · 发布: %{customdata[2]}<br>"
    "智能指数: %{customdata[3]:.1f}<br>"
    "原始速度: %{customdata[4]:.0f} tok/s · 冗长度: %{customdata[8]:.1f}M 输出tok<br>"
    "有效速度: %{customdata[9]:.0f} tok/s（按版本参考冗长度归一）<br>"
    "有效运行成本(跑完评测实花): $%{customdata[5]:.2f}<br>"
    "7:2:1 混合单价: $%{customdata[6]:.2f}/M · Pareto层: %{customdata[7]:.0f}<br>"
    "突出度｜趋势残差 %{customdata[10]:.1f} · 智能抬升 %{customdata[11]:.1f}"
    " · 加权超体积 %{customdata[12]:.3f} · 到前沿垂距 %{customdata[13]:.3f}"
    "<extra></extra>"
)


def _creator_colors(creators) -> dict:
    uniq = sorted({c for c in creators if isinstance(c, str)})
    return {c: PALETTE[i % len(PALETTE)] for i, c in enumerate(uniq)}


def _customdata(df: pd.DataFrame) -> np.ndarray:
    """构造保留原始类型(字符串/浮点)的 customdata，避免被 numpy 统一成字符串。"""

    def col_or_nan(name: str) -> list:
        # 突出度列由 add_standout_metrics 写入；某些调用路径可能未算，缺列则填 NaN。
        return (df[name].astype(float).tolist()
                if name in df.columns else [float("nan")] * len(df))

    cols = [
        df["name"].fillna("?").tolist(),
        df["creator"].fillna("?").tolist(),
        df["release_date"].dt.strftime("%Y-%m-%d").fillna("?").tolist(),
        df["intelligence"].astype(float).tolist(),
        df["output_speed"].astype(float).tolist(),
        df["cost_to_run"].astype(float).tolist(),
        df["blended_price_cache_input_output_7_to_2_to_1"].astype(float).tolist(),
        df["layer"].astype(float).tolist(),
        df["output_mtokens"].astype(float).tolist(),
        df["eff_speed"].astype(float).tolist(),
        col_or_nan("standout_trend_residual"),
        col_or_nan("standout_intelligence_uplift"),
        col_or_nan("standout_weighted_hypervolume"),
        col_or_nan("standout_frontier_distance"),
    ]
    return np.array(cols, dtype=object).T


def _frontier_mesh(pareto, speed_log, cost_metric_column_name, speed_metric_column_name):
    mesh, _ = build_delaunay_neighbor_reference_geometry(pareto, speed_log, cost_metric_column_name, speed_metric_column_name)
    if not mesh["triangle_vertex_index_a"]:
        return None
    return go.Mesh3d(**plotly_coordinate_keywords_from_scene_geometry(mesh),
        intensity=mesh["z_coordinates"], colorscale="Viridis", opacity=0.45,
        showscale=False, flatshading=True, name="前沿流形 (Pareto 编织)", hoverinfo="skip", showlegend=True)


def _frontier_wireframe(pareto, speed_log, cost_metric_column_name, speed_metric_column_name):
    mesh, wire = build_delaunay_neighbor_reference_geometry(pareto, speed_log, cost_metric_column_name, speed_metric_column_name)
    if not mesh["triangle_vertex_index_a"]:
        return None
    return go.Scatter3d(**plotly_coordinate_keywords_from_scene_geometry(wire), mode="lines",
        line=dict(color="rgba(50,80,150,0.6)", width=3),
        name="前沿流形 (线框·不挡悬浮)", hoverinfo="skip", showlegend=True)


def _achievable_frontier_step_mesh(pareto, cost_metric_column_name, speed_metric_column_name):
    mesh = build_legacy_achievable_step_geometry_for_v2_comparison(pareto, cost_metric_column_name, speed_metric_column_name)
    return go.Mesh3d(**plotly_coordinate_keywords_from_scene_geometry(mesh),
        color="rgba(49,130,189,0.62)", opacity=0.32, flatshading=True,
        name="可达前沿曲面", showlegend=True, visible="legendonly", hoverinfo="skip")


def build_frontier_3d_scene_and_interaction_payload(
    df: pd.DataFrame,
    speed_scale: str = "log",
    data_date: str | None = None,
    cost_metric_column_name: str = "cost_to_run",
    cost_metric_label: str = "有效运行成本",
    cost_metric_unit: str = "USD",
    speed_metric_column_name: str = "eff_speed",
    speed_metric_label: str = "有效速度",
    *,
    speed_metric_axis_title_text: str | None = None,
    current_intelligence_index_version: str | None = None,
    reference_output_million_tokens_by_intelligence_index_version_family: dict | None = None,
) -> tuple[dict, dict]:
    """复用 v2 的身份、口径说明和轴范围，直接输出纯几何场景。"""
    kept = df[df["kept"]].copy()
    pareto = kept[kept["is_pareto"]]
    speed_log = speed_scale == "log"
    payload = _build_lineage_payload(df, cost_metric_column_name, cost_metric_label,
        cost_metric_unit, speed_metric_column_name, speed_metric_label)
    x_range, y_range, z_range = _fixed_axis_ranges(kept, payload,
        cost_metric_column_name, speed_metric_column_name, speed_log)
    is_eff = speed_metric_column_name == "eff_speed"
    reference_output_million_tokens_text = "、".join(
        f"v{version_family}：{reference_output_million_tokens:g}M"
        for version_family, reference_output_million_tokens in sorted(
            (reference_output_million_tokens_by_intelligence_index_version_family or {}).items()
        )
    )
    speed_note = (
        "有效速度 = 原始速度 ÷（跑完智能指数的输出 token 数 ÷ 该版本参考 token 量"
        + (f"，{reference_output_million_tokens_text}" if reference_output_million_tokens_text else "")
        + "），惩罚冗长推理模型；不含 TTFT 与工具耗时，跨指数版本不可比"
        if is_eff
        else "原始 median tok/s"
    )
    speed_axis_title_text = speed_axis_title_text_with_unit_and_scale(
        speed_metric_axis_title_text or speed_metric_label, speed_log
    )
    intelligence_axis_title_text = intelligence_axis_title_text_with_intelligence_index_version(
        current_intelligence_index_version
    )
    if frontier.ANALYSIS_ELIGIBLE_COLUMN_NAME in kept.columns:
        analysis_eligible_kept_model_count = int(
            kept[frontier.ANALYSIS_ELIGIBLE_COLUMN_NAME].astype(bool).sum()
        )
    else:
        analysis_eligible_kept_model_count = int(len(kept))
    cost_note = (
        "跑完 Intelligence Index 的实际总花费"
        if cost_metric_column_name == "cost_to_run"
        else "AA 7:2:1 cache-hit/input/output 混合单价"
    )
    payload["current_view"] = {
        "data_date": data_date or "?",
        "cost_metric_label": cost_metric_label,
        "cost_metric_unit": cost_metric_unit,
        "cost_metric_note": cost_note,
        "speed_metric_label": speed_metric_label,
        "speed_metric_note": speed_note,
        "speed_axis_title_text": speed_axis_title_text,
        "kept_model_count": int(len(kept)),
        "pareto_model_count": int(len(pareto)),
        "analysis_eligible_model_count": analysis_eligible_kept_model_count,
        "historical_version_value_model_count": int(len(kept)) - analysis_eligible_kept_model_count,
    }
    mesh, wire = build_delaunay_neighbor_reference_geometry(pareto, speed_log,
        cost_metric_column_name, speed_metric_column_name)
    scene = {
        "displayed_model_markers": payload["models"],
        "pareto_frontier_wireframe_line_segments": wire,
        "pareto_frontier_surface_triangle_mesh": mesh,
        "achievable_frontier_surface_triangle_mesh": build_legacy_achievable_step_geometry_for_v2_comparison(
            pareto, cost_metric_column_name, speed_metric_column_name),
        "three_dimensional_axis_configuration": {
            "x_axis": {"title_text": f"{cost_metric_label} {cost_metric_unit}（对数）", "scale_type": "log", "fixed_range": x_range},
            "y_axis": {"title_text": speed_axis_title_text, "scale_type": "log" if speed_log else "linear", "fixed_range": y_range},
            "z_axis": {"title_text": intelligence_axis_title_text, "scale_type": "linear", "fixed_range": z_range},
        },
        "initial_camera_configuration": {
            "eye": {"x": -1.7, "y": 1.7, "z": 1.1}, "center": {"x": 0.0, "y": 0.0, "z": 0.0}, "up": {"x": 0.0, "y": 0.0, "z": 1.0},
        },
        "current_view": payload["current_view"],
    }
    return scene, payload


def build_figure(
    df: pd.DataFrame,
    speed_scale: str = "log",
    data_date: str | None = None,
    cost_metric_column_name: str = "cost_to_run",
    cost_metric_label: str = "有效运行成本",
    cost_metric_unit: str = "USD",
    speed_metric_column_name: str = "eff_speed",
    speed_metric_label: str = "有效速度",
    *,
    speed_metric_axis_title_text: str | None = None,
    current_intelligence_index_version: str | None = None,
    reference_output_million_tokens_by_intelligence_index_version_family: dict | None = None,
) -> tuple[go.Figure, dict]:
    """`speed_metric_axis_title_text` 是速度轴名（不含单位与刻度类型，缺省用 label）；
    `current_intelligence_index_version` 写进 z 轴标题；有效速度的归一常数写进口径说明。

    零 kept 的口径（如有效速度全缺）输出合法空场景：无散点、空 Pareto 与空网格、兜底轴范围
    （RVF-002 / R1-03，其他口径不受影响）；「全部口径都零模型」的报错由契约构建器负责。
    """
    kept = df[df["kept"]].copy()
    speed_log = speed_scale == "log"
    colors = _creator_colors(kept["creator"])

    fig = go.Figure()

    # 1) 按厂商着色的散点（Pareto 点稍大）
    n_scatter = 0
    for creator, g in kept.groupby("creator", dropna=False):
        is_p = g["is_pareto"].to_numpy(bool)
        fig.add_trace(go.Scatter3d(
            x=g[cost_metric_column_name],
            y=g[speed_metric_column_name],
            z=g["intelligence"],
            mode="markers",
            name=str(creator),
            legendgroup="creators", legendgrouptitle_text="厂商",
            marker=dict(
                size=np.where(is_p, 7.5, 4.0),
                color=colors.get(creator, "#888888"),
                opacity=0.9,
            ),
            customdata=_customdata(g), hovertemplate=HOVER_TMPL,
        ))
        n_scatter += 1

    # 2) Pareto 强调：黑色空心圈叠加（同时兼作突出度视觉编码载体：JS 按选中指标改 marker.size）
    pareto = kept[kept["is_pareto"]]
    fig.add_trace(go.Scatter3d(
        x=pareto[cost_metric_column_name],
        y=pareto[speed_metric_column_name],
        z=pareto["intelligence"],
        mode="markers", name=f"Pareto 最优 ({len(pareto)})",
        marker=dict(size=12, symbol="circle-open", color="black",
                    line=dict(color="black", width=2)),
        customdata=_customdata(pareto), hovertemplate=HOVER_TMPL,
    ))
    idx_pareto_emphasis = len(fig.data) - 1

    # 3) 前沿流形：线框（默认显、不挡悬浮）+ 实心面（可切换）+ 可达前沿曲面（可切换）
    wire = _frontier_wireframe(
        pareto, speed_log, cost_metric_column_name, speed_metric_column_name
    )
    mesh = _frontier_mesh(
        pareto, speed_log, cost_metric_column_name, speed_metric_column_name
    )
    has_frontier = wire is not None and mesh is not None
    fa = fb = None
    if has_frontier:
        fig.add_trace(wire)                       # 线框，默认 visible=True
        fa = len(fig.data) - 1
        mesh.update(visible="legendonly")         # 实心面，默认隐（图例可点）
        fig.add_trace(mesh)
        fb = len(fig.data) - 1
    surf = _achievable_frontier_step_mesh(
        pareto, cost_metric_column_name, speed_metric_column_name
    )
    fig.add_trace(surf)
    fc = len(fig.data) - 1

    # 4) 预留四个「空」trace（追加在前沿之后，故 fa/fb/fc 下标不漂移）：
    #    交给注入的 JS 用 Plotly.restyle 动态填充：pin 高亮、谱系连线、
    #    谱系节点 hover marker、同基模型 reasoning 档位连线。
    #    沿用「细线/marker、不挡拾取」原则，避免吞掉下方 kept 节点的 hover。
    fig.add_trace(go.Scatter3d(
        x=[], y=[], z=[], mode="markers",
        name="已固定", showlegend=False, hoverinfo="skip", visible=True,
        marker=dict(size=16, symbol="circle-open", color="#d62728",
                    line=dict(color="#d62728", width=3)),
    ))
    idx_pinned_highlight = len(fig.data) - 1
    fig.add_trace(go.Scatter3d(
        x=[], y=[], z=[], mode="lines",
        name="谱系连线", showlegend=False, hoverinfo="skip", visible=True,
        line=dict(color="rgba(70,70,70,0.85)", width=5),
    ))
    idx_lineage_line = len(fig.data) - 1
    # 谱系节点拆两条：原单条可 hover 的「谱系节点」marker 会与其正下方的 kept 散点争夺
    # Plotly 拾取——光标在节点附近（非正中）时最近点在两者间来回翻 → hover 反复 on/off = 闪烁。
    #   ① 灰色装饰层 hoverinfo="skip"：只作视觉强调，画 kept 谱系节点（其 hover 交给底层散点，
    #      与之重合也无妨，因装饰层不参与拾取）；
    #   ② 剪枝前身悬浮层：可 hover、带 hovertemplate，只画「不在 kept 散点中的历代前身」
    #      （孤立点、无重合，故不引入拾取争夺），保留查看被剪枝前身信息的唯一途径。
    # JS redrawLineage 按 nameToIndex 把谱系节点分流填充进这两条。
    fig.add_trace(go.Scatter3d(
        x=[], y=[], z=[], mode="markers",
        name="谱系节点", showlegend=False, hoverinfo="skip", visible=True,
        marker=dict(size=5, color="rgba(70,70,70,0.82)"),
    ))
    idx_lineage_node_grey_decoration_marker = len(fig.data) - 1
    fig.add_trace(go.Scatter3d(
        x=[], y=[], z=[], mode="markers",
        name="谱系剪枝前身节点", showlegend=False, visible=True,
        marker=dict(size=5, color="rgba(70,70,70,0.82)"),
        hovertemplate=(
            "<b>%{customdata[0]}</b><br>"
            "基模型: %{customdata[1]}<br>"
            "谱系: %{customdata[2]}<br>"
            "发布: %{customdata[3]} · kept: %{customdata[7]}<br>"
            "智能指数: %{customdata[4]:.1f}<br>"
            f"{speed_metric_label}: %{{customdata[6]:.1f}}<br>"
            f"{cost_metric_label}: $%{{customdata[5]:.2f}} {cost_metric_unit}"
            "<extra>谱系剪枝前身节点</extra>"
        ),
    ))
    idx_lineage_pruned_ancestor_hover_marker = len(fig.data) - 1
    fig.add_trace(go.Scatter3d(
        x=[], y=[], z=[], mode="lines",
        name="Reasoning 档位", showlegend=False, hoverinfo="skip", visible=True,
        line=dict(color="rgba(168,54,170,0.92)", width=6),
    ))
    idx_reasoning_variant_line = len(fig.data) - 1

    payload = _build_lineage_payload(
        df,
        cost_metric_column_name,
        cost_metric_label,
        cost_metric_unit,
        speed_metric_column_name,
        speed_metric_label,
    )
    payload["pinned_highlight_trace_index"] = idx_pinned_highlight
    payload["lineage_line_trace_index"] = idx_lineage_line
    payload["lineage_node_grey_decoration_marker_trace_index"] = (
        idx_lineage_node_grey_decoration_marker
    )
    payload["lineage_pruned_ancestor_hover_marker_trace_index"] = (
        idx_lineage_pruned_ancestor_hover_marker
    )
    payload["reasoning_variant_line_trace_index"] = idx_reasoning_variant_line
    payload["pareto_emphasis_trace_index"] = idx_pareto_emphasis
    payload["frontier_wireframe_trace_index"] = fa
    payload["frontier_mesh_trace_index"] = fb
    payload["achievable_surface_trace_index"] = fc
    # 开关、筛选与 hover 均复用完整显示集合的轴域，不扩张历史前身范围。
    x_range, y_range, z_range = _fixed_axis_ranges(
        kept,
        payload,
        cost_metric_column_name,
        speed_metric_column_name,
        speed_log,
    )

    is_eff = speed_metric_column_name == "eff_speed"
    reference_output_million_tokens_text = "、".join(
        f"v{version_family}：{reference_output_million_tokens:g}M"
        for version_family, reference_output_million_tokens in sorted(
            (reference_output_million_tokens_by_intelligence_index_version_family or {}).items()
        )
    )
    speed_note = (
        "有效速度 = 原始速度 ÷（跑完智能指数的输出 token 数 ÷ 该版本参考 token 量"
        + (f"，{reference_output_million_tokens_text}" if reference_output_million_tokens_text else "")
        + "），惩罚冗长推理模型；不含 TTFT 与工具耗时，跨指数版本不可比"
        if is_eff
        else "原始 median tok/s"
    )
    speed_axis_title_text = speed_axis_title_text_with_unit_and_scale(
        speed_metric_axis_title_text or speed_metric_label, speed_log
    )
    intelligence_axis_title_text = intelligence_axis_title_text_with_intelligence_index_version(
        current_intelligence_index_version
    )
    if frontier.ANALYSIS_ELIGIBLE_COLUMN_NAME in kept.columns:
        analysis_eligible_kept_model_count = int(
            kept[frontier.ANALYSIS_ELIGIBLE_COLUMN_NAME].astype(bool).sum()
        )
    else:
        analysis_eligible_kept_model_count = int(len(kept))
    cost_note = (
        "跑完 Intelligence Index 的实际总花费"
        if cost_metric_column_name == "cost_to_run"
        else "AA 7:2:1 cache-hit/input/output 混合单价"
    )
    payload["current_view"] = {
        "data_date": data_date or "?",
        "cost_metric_label": cost_metric_label,
        "cost_metric_unit": cost_metric_unit,
        "cost_metric_note": cost_note,
        "speed_metric_label": speed_metric_label,
        "speed_metric_note": speed_note,
        "speed_axis_title_text": speed_axis_title_text,
        "kept_model_count": int(len(kept)),
        "pareto_model_count": int(len(pareto)),
        "analysis_eligible_model_count": analysis_eligible_kept_model_count,
        "historical_version_value_model_count": int(len(kept)) - analysis_eligible_kept_model_count,
    }
    fig.update_layout(
        title=dict(
            text=f"AI 模型三维前沿：智能 × {speed_metric_label} × {cost_metric_label}",
            x=0.5, xanchor="center",
            font=dict(size=18),
        ),
        font=dict(size=13),
        scene=dict(
            uirevision="ai-frontier-3d-camera",
            xaxis=dict(title=dict(text=f"{cost_metric_label} {cost_metric_unit}（对数）",
                                  font=dict(size=13)),
                       type="log",
                       range=x_range, autorange=False,
                       backgroundcolor="rgb(248,248,250)",
                       tickfont=dict(size=12)),
            yaxis=dict(title=dict(text=speed_axis_title_text,
                                  font=dict(size=13)),
                       type="log" if speed_log else "linear",
                       range=y_range, autorange=False,
                       tickfont=dict(size=12)),
            zaxis=dict(title=dict(text=intelligence_axis_title_text,
                                  font=dict(size=13)),
                       range=z_range, autorange=False,
                       tickfont=dict(size=12)),
            # 默认视角：从（低费用, 高速度, 高智能）看向（高费用, 低速度, 低智能）
            # 视线方向 = center(0,0,0) − eye = (+1.7, -1.7, -1.1) → +x 高费用 / −y 低速度 / −z 低智能
            camera=dict(eye=dict(x=-1.7, y=1.7, z=1.1)),
        ),
        uirevision="ai-frontier-3d-user-view",
        legend=dict(
            itemsizing="constant", x=0.99, y=0.99, xanchor="right",
            font=dict(size=13), bgcolor="rgba(255,255,255,0.72)",
        ),
        hoverlabel=dict(font=dict(size=13)),
        margin=dict(l=0, r=150, t=56, b=0),
    )
    return fig, payload


GRAPH_DIV_ID = "frontier3d"


def build_plotly_static_export_figure_from_scene(scene: dict) -> go.Figure:
    """仅静态导出时把已计算的场景装配成 Plotly 图，避免再算剪枝或指标。"""
    models = scene["displayed_model_markers"]
    colors = _creator_colors(model["creator"] for model in models)
    figure = go.Figure()
    for creator_name in sorted(colors):
        creator_models = [model for model in models if model["creator"] == creator_name]
        figure.add_trace(go.Scatter3d(
            x=[model["x"] for model in creator_models],
            y=[model["y"] for model in creator_models],
            z=[model["z"] for model in creator_models],
            mode="markers", name=creator_name,
            marker=dict(color=colors[creator_name], size=[7.5 if model["panel"].get("layer") == 1 else 4.0 for model in creator_models]),
            text=[model["name"] for model in creator_models],
        ))
    pareto = [model for model in models if model["panel"].get("layer") == 1]
    figure.add_trace(go.Scatter3d(
        x=[model["x"] for model in pareto], y=[model["y"] for model in pareto], z=[model["z"] for model in pareto],
        mode="markers", name=f"Pareto 最优 ({len(pareto)})",
        marker=dict(size=12, symbol="circle-open", color="black", line=dict(color="black", width=2)),
    ))
    figure.add_trace(go.Scatter3d(
        **plotly_coordinate_keywords_from_scene_geometry(scene["pareto_frontier_wireframe_line_segments"]),
        mode="lines", line=dict(color="rgba(50,80,150,0.6)", width=3), name="Delaunay 邻接参照（非帕累托面）",
    ))
    for field, name in (("pareto_frontier_surface_triangle_mesh", "邻接参照面"), ("achievable_frontier_surface_triangle_mesh", "精确可达前沿")):
        figure.add_trace(go.Mesh3d(
            **plotly_coordinate_keywords_from_scene_geometry(scene[field]),
            color="rgba(49,130,189,0.62)", opacity=0.32, flatshading=True,
            name=name, visible="legendonly", hoverinfo="skip",
        ))
    axes = {}
    for source_name, target_name in (("x_axis", "xaxis"), ("y_axis", "yaxis"), ("z_axis", "zaxis")):
        axis = scene["three_dimensional_axis_configuration"][source_name]
        axes[target_name] = dict(title=dict(text=axis["title_text"]), type=axis["scale_type"], range=axis["fixed_range"], autorange=False)
    current_view = scene.get("current_view", {})
    figure.update_layout(
        title=dict(text=f"AI 模型三维前沿：智能 × {current_view.get('speed_metric_label', '速度')} × {current_view.get('cost_metric_label', '成本')}", x=0.5),
        scene={**axes, "camera": scene.get("initial_camera_configuration", {})},
        font=dict(size=13), margin=dict(l=0, r=150, t=56, b=0),
    )
    return figure


def export_static(fig: go.Figure, out: Path):
    from .frontier_3d_worktree_storage_paths import refuse_shared_worktree_directory_write
    refuse_shared_worktree_directory_write(out)
    try:
        out.parent.mkdir(parents=True, exist_ok=True)
        fig.write_image(str(out), width=1500, height=1000, scale=2)
        return out
    except Exception as e:  # kaleido 缺失或失败
        print(f"[warn] 静态导出失败（需 kaleido）：{e}")
        return None
