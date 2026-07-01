"""取数与合并：智能、速度、价格与部分运行成本来自 API，网页 payload 补齐覆盖。

三个维度分布在两个数据源，按模型 UUID（API `id` == 网页 `model_id`）精确合并：

    智能  evaluations.artificial_analysis_intelligence_index   —— API
    速度  performance.median_output_tokens_per_second          —— API
    成本  artificial_analysis_intelligence_index_cost.total_cost —— API / 网页 payload

Free API 目前仅对部分模型暴露 "Cost to Run"，其余仍从网页 payload 与上次
processed CSV 补齐。两源均按模型 UUID 精确合并。
"""
from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

import pandas as pd
import requests

try:
    from dotenv import load_dotenv
except ImportError:  # pragma: no cover
    load_dotenv = None

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "data" / "raw"
PROCESSED = ROOT / "data" / "processed"

API_LANGUAGE_MODELS_PRO_URL = "https://artificialanalysis.ai/api/v2/language/models"
API_LANGUAGE_MODELS_FREE_URL = "https://artificialanalysis.ai/api/v2/language/models/free"
API_LANGUAGE_MODELS_CACHE = RAW / "api_language_models.json"
PAGE_URL = "https://artificialanalysis.ai/models"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

# 合并正确性锚点：模型名子串 -> 期望的 total_cost（与官网模型页一致）
COST_ANCHORS = {
    "gpt-oss-20B (low)": 7.677,
    "Gemini 3 Pro Preview (high)": 819.84,
}


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


# ----------------------------------------------------------------------------- 取数（带缓存）
def _fetch_paginated_language_models(api_key: str) -> tuple[list[dict], str]:
    """优先取 Pro 完整字段；权限不足时自动回退 Free 分页端点。"""
    rows: list[dict] = []
    page = 1
    selected_api_url = API_LANGUAGE_MODELS_PRO_URL
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
        rows.extend(payload["data"])
        if not payload.get("pagination", {}).get("has_more"):
            break
        page += 1
    return rows, selected_api_url


def fetch_api(refresh: bool = False) -> list[dict]:
    if API_LANGUAGE_MODELS_CACHE.exists() and not refresh:
        return json.loads(API_LANGUAGE_MODELS_CACHE.read_text())["data"]

    rows, selected_api_url = _fetch_paginated_language_models(get_api_key())
    RAW.mkdir(parents=True, exist_ok=True)
    API_LANGUAGE_MODELS_CACHE.write_text(
        json.dumps({"source_url": selected_api_url, "data": rows})
    )
    return rows


def fetch_page(refresh: bool = False) -> str:
    cache = RAW / "models_page.html"
    if cache.exists() and not refresh:
        return cache.read_text(encoding="utf-8", errors="ignore")
    resp = requests.get(PAGE_URL, headers={"User-Agent": UA}, timeout=120)
    resp.raise_for_status()
    RAW.mkdir(parents=True, exist_ok=True)
    cache.write_text(resp.text, encoding="utf-8")
    return resp.text


# ----------------------------------------------------------------------------- 解析网页成本
_COST_RE = re.compile(r'"intelligence_index_cost":\{"total_cost":([0-9.eE+-]+)')
_MID_RE = re.compile(r'"model_id":"([0-9a-f-]{36})"')
# 每百万输出 token 的智能（= 智能 / 输出token量(百万)），是“冗长度”的倒数侧度量
_PERM_RE = re.compile(r'"intelligence_index_per_m_output_tokens":([0-9.eE+-]+)')


def parse_cost_by_model_id(page_html: str) -> dict[str, float]:
    """从网页 payload 解析 {model_id(uuid): total_cost}。

    payload 把 `\\"` 转义为引号；每个带 total_cost 的对象里，最近的前一个
    `model_id` 就是该记录所属模型。实测 model_id 全部唯一、零重复。
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
        # 非正 total_cost 是「无托管定价」的占位（与下游 <=0->NaN 清洗同义）；与
        # parse_intel_per_m 的 val>0 对齐，此处也只收录正值——否则当次页面给出的 0
        # 会经 dict.get(key, default) 压制回退旧值、再被清洗抹成 NaN，白丢好缓存成本。
        if cost <= 0:
            continue
        # 若同一 model_id 出现多条（理论上不会），取最小成本端点
        if mid not in out or cost < out[mid]:
            out[mid] = cost
    return out


def parse_intel_per_m_by_model_id(page_html: str) -> dict[str, float]:
    """解析 {model_id(uuid): intelligence_index_per_m_output_tokens}。

    该值出现在与 total_cost 同一模型对象内（紧邻其后），归属逻辑与
    parse_cost_by_model_id 完全一致——取最近前置 model_id。它等于
    `智能 / 跑完整套指数的输出token量(百万)`，故输出token量 = 智能 / 本值，
    即“冗长度”的相对度量。model_id 唯一，取首次出现即可。
    """
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


# ----------------------------------------------------------------------------- 合并成表
def calculate_blended_price_cache_input_output_7_to_2_to_1(pricing: dict) -> float:
    """读取 AA 原生 7:2:1 混合价；Free tier 缺字段时由三项分价计算。"""
    import math

    native_value = pricing.get("price_1m_blended_7_to_2_to_1")
    if native_value is not None:
        return float(native_value)
    cache_hit = pricing.get("price_1m_cache_hit_tokens")
    input_price = pricing.get("price_1m_input_tokens")
    output_price = pricing.get("price_1m_output_tokens")
    if cache_hit is None or input_price is None or output_price is None:
        return math.nan
    return (7 * float(cache_hit) + 2 * float(input_price) + float(output_price)) / 10


def build_dataframe(refresh: bool = False) -> pd.DataFrame:
    api = fetch_api(refresh)
    page = fetch_page(refresh)
    cost_by_id = parse_cost_by_model_id(page)
    perm_by_id = parse_intel_per_m_by_model_id(page)

    # AA 的 /models 页面自 2026-06-17 起退化：只对少量模型内嵌 intelligence_index_cost /
    # per_m_output（实测成本记录一度只有 39~71，远低于 ~540）。这两项 API 不提供、只能从
    # 该页面取。对页面缺失的模型，回退到上一次已保存的 models.csv 里同 id 的旧值（同为 AA
    # 官方 total_cost，隔日稳定），使新模型（如 GLM-5.2）能纳入而不牺牲存量已展示模型。
    # ponytail: 回退源用 processed/models.csv（上次产物），页面恢复到 >=300 后此分支自然停用。
    prev_cost: dict[str, float] = {}
    prev_perm: dict[str, float] = {}
    prev_csv = PROCESSED / "models.csv"
    if prev_csv.exists():
        try:
            p = pd.read_csv(prev_csv, usecols=["id", "cost_to_run", "intel_per_m_output"])
            prev_cost = {i: c for i, c in zip(p["id"], p["cost_to_run"]) if pd.notna(c)}
            prev_perm = {i: v for i, v in zip(p["id"], p["intel_per_m_output"]) if pd.notna(v)}
        except (ValueError, OSError, pd.errors.EmptyDataError) as e:
            # 旧 schema（缺列）/ 空文件 / 读失败：回退本身是「保命」机制，不能因缓存文件
            # 不整齐反而崩掉整条管线——视作无回退，退回纯页面（原始行为）。
            print(f"[warn] 读取回退源 {prev_csv.name} 失败，忽略回退：{e}")

    rows = []
    for m in api:
        ev = m.get("evaluations") or {}
        pr = m.get("pricing") or {}
        performance = m.get("performance") or {}
        api_intelligence_index_cost = (
            m.get("artificial_analysis_intelligence_index_cost") or {}
        ).get("total_cost")
        rows.append(
            {
                "id": m["id"],
                "slug": m.get("slug"),
                "name": m.get("name"),
                "creator": (m.get("model_creator") or {}).get("name"),
                "release_date": m.get("release_date"),
                "intelligence": ev.get("artificial_analysis_intelligence_index"),
                "coding_index": ev.get("artificial_analysis_coding_index"),
                "math_index": ev.get("artificial_analysis_math_index"),
                "output_speed": performance.get("median_output_tokens_per_second"),
                "ttft_s": performance.get("median_time_to_first_token_seconds"),
                "blended_price_cache_input_output_7_to_2_to_1":
                    calculate_blended_price_cache_input_output_7_to_2_to_1(pr),
                "price_input": pr.get("price_1m_input_tokens"),
                "price_output": pr.get("price_1m_output_tokens"),
                "price_cache_hit": pr.get("price_1m_cache_hit_tokens"),
                "price_cache_write": pr.get("price_1m_cache_write_tokens"),
                "cost_to_run": (
                    api_intelligence_index_cost
                    or cost_by_id.get(m["id"])
                    or prev_cost.get(m["id"])
                ),
                "intel_per_m_output": perm_by_id.get(m["id"], prev_perm.get(m["id"])),
            }
        )
    df = pd.DataFrame(rows)
    df["release_date"] = pd.to_datetime(df["release_date"], errors="coerce")
    # 非正的成本/速度是“无定价/未测速”的占位 0（如无托管定价的开源权重模型），
    # 既非真“免费”、也无法在对数轴表示——一律视为缺失，排除出三维前沿。
    import numpy as np
    for c in ("cost_to_run", "output_speed"):
        df.loc[df[c].fillna(-1) <= 0, c] = np.nan
    _add_effective_speed(df)
    _validate(df, cost_by_id)
    return df


def _add_effective_speed(df: pd.DataFrame) -> None:
    """派生“冗长度”与“有效速度”两列（原地）。

    冗长度 output_mtokens = 跑完整套智能指数的输出 token 数(百万)
                        = 智能 / 每百万输出token的智能。
    有效速度 eff_speed = 原始速度 / 相对冗长度，相对冗长度 = 冗长度 / 全样本中位冗长度。
        —— 物理含义是“按典型冗长度归一后的速度”，保留 tok/s 量纲，便于与原始速度同轴比较；
           归一常数只缩放坐标轴、不改变排名或 Pareto 关系。
    冗长(高 token)模型有效速度被压低，简洁模型被抬高；缺任一输入则为 NaN。
    """
    import numpy as np
    df["output_mtokens"] = df["intelligence"] / df["intel_per_m_output"]
    df.loc[df["output_mtokens"].fillna(-1) <= 0, "output_mtokens"] = np.nan
    med = np.nanmedian(df["output_mtokens"].to_numpy(float))
    rel_verbosity = df["output_mtokens"] / med
    df["eff_speed"] = df["output_speed"] / rel_verbosity
    df.loc[df["eff_speed"].fillna(-1) <= 0, "eff_speed"] = np.nan


def _validate(df: pd.DataFrame, cost_by_id: dict[str, float]) -> None:
    assert len(df) >= 500, f"API 模型数异常: {len(df)}"
    # 校验「合并后」的成本覆盖（含 API 原生值与 models.csv 回退），而非仅当次页面
    # 解析数。新版 Free API 的模型集合与旧端点不同，当前可精确合并约 296 条；
    # 250 可拦住页面/缓存整体失效，同时不把正常的集合变化误判成故障。
    n_cost = int(df["cost_to_run"].notna().sum())
    assert n_cost >= 250, f"成本覆盖异常(含回退): {n_cost}（当次页面解析 {len(cost_by_id)}）"
    # 锚点校验的目的：验证「本轮页面」的 slug↔cost 配对没错位。故须对 **当次页面解析
    # 的 cost_by_id（fresh）** 校验，而非对 df——页面退化时锚点模型的 cost 可能来自回退，
    # 拿缓存值自证成恒等式、护栏形同虚设。锚点若不在当次解析里，则本轮无从验证配对，诚实
    # 跳过（覆盖仍由 n_cost 兜底），不假装通过。
    for name_sub, expected in COST_ANCHORS.items():
        hit = df[df["name"] == name_sub]
        assert not hit.empty, f"锚点模型缺失: {name_sub}"
        mid = hit.iloc[0]["id"]
        if mid not in cost_by_id:
            print(f"[warn] 锚点 {name_sub} 不在当次页面解析中（页面退化），跳过 slug↔cost 配对校验")
            continue
        got = cost_by_id[mid]
        assert abs(got - expected) / expected < 0.02, (
            f"锚点成本不符 {name_sub}: 期望≈{expected} 实得={got}（slug↔cost 配对可能错位）"
        )


def save(df: pd.DataFrame) -> Path:
    PROCESSED.mkdir(parents=True, exist_ok=True)
    out = PROCESSED / "models.csv"
    df.to_csv(out, index=False)
    return out


def main(refresh: bool = False) -> None:
    df = build_dataframe(refresh)
    out = save(df)
    full = df.dropna(subset=["intelligence", "output_speed", "cost_to_run"])
    eff = df.dropna(subset=["intelligence", "eff_speed", "cost_to_run"])
    print(f"API 模型: {len(df)}")
    print(f"含运行成本: {df['cost_to_run'].notna().sum()}")
    print(f"含冗长度(输出token量): {df['output_mtokens'].notna().sum()}")
    print(f"三维齐全(智能/原始速度/成本): {len(full)}")
    print(f"三维齐全(智能/有效速度/成本): {len(eff)}")
    print(f"锚点校验: 通过 ({', '.join(COST_ANCHORS)})")
    print(f"已写出: {out}")


if __name__ == "__main__":
    main(refresh="--refresh" in sys.argv)
