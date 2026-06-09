"""取数与合并：智能/速度/价格来自 API，运行成本来自网页内嵌 payload。

三个维度分布在两个数据源，按模型 UUID（API `id` == 网页 `model_id`）精确合并：

    智能  evaluations.artificial_analysis_intelligence_index   —— API
    速度  median_output_tokens_per_second                      —— API
    成本  intelligence_index_cost.total_cost（Cost to Run）     —— 网页 payload

API 不暴露 "Cost to Run"，只能从 https://artificialanalysis.ai/models 的
Next.js RSC 内嵌 JSON 中解析；每条带 total_cost 的记录里最近的 `model_id`
即其所属模型，UUID 与 API 的 `id` 一一对应。
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

API_URL = "https://artificialanalysis.ai/api/v2/data/llms/models"
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
def fetch_api(refresh: bool = False) -> list[dict]:
    cache = RAW / "api_models.json"
    if cache.exists() and not refresh:
        return json.loads(cache.read_text())["data"]
    resp = requests.get(API_URL, headers={"x-api-key": get_api_key()}, timeout=120)
    resp.raise_for_status()
    payload = resp.json()
    RAW.mkdir(parents=True, exist_ok=True)
    cache.write_text(json.dumps(payload))
    return payload["data"]


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
        # 若同一 model_id 出现多条（理论上不会），取最小成本端点
        if mid not in out or cost < out[mid]:
            out[mid] = cost
    return out


# ----------------------------------------------------------------------------- 合并成表
def build_dataframe(refresh: bool = False) -> pd.DataFrame:
    api = fetch_api(refresh)
    cost_by_id = parse_cost_by_model_id(fetch_page(refresh))

    rows = []
    for m in api:
        ev = m.get("evaluations") or {}
        pr = m.get("pricing") or {}
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
                "output_speed": m.get("median_output_tokens_per_second"),
                "ttft_s": m.get("median_time_to_first_token_seconds"),
                "price_blended": pr.get("price_1m_blended_3_to_1"),
                "price_input": pr.get("price_1m_input_tokens"),
                "price_output": pr.get("price_1m_output_tokens"),
                "cost_to_run": cost_by_id.get(m["id"]),
            }
        )
    df = pd.DataFrame(rows)
    df["release_date"] = pd.to_datetime(df["release_date"], errors="coerce")
    # 非正的成本/速度是“无定价/未测速”的占位 0（如无托管定价的开源权重模型），
    # 既非真“免费”、也无法在对数轴表示——一律视为缺失，排除出三维前沿。
    import numpy as np
    for c in ("cost_to_run", "output_speed"):
        df.loc[df[c].fillna(-1) <= 0, c] = np.nan
    _validate(df, cost_by_id)
    return df


def _validate(df: pd.DataFrame, cost_by_id: dict[str, float]) -> None:
    assert len(df) >= 500, f"API 模型数异常: {len(df)}"
    assert len(cost_by_id) >= 300, f"成本记录数异常: {len(cost_by_id)}"
    for name_sub, expected in COST_ANCHORS.items():
        hit = df[df["name"] == name_sub]
        assert not hit.empty, f"锚点模型缺失: {name_sub}"
        got = hit.iloc[0]["cost_to_run"]
        assert got is not None and abs(got - expected) / expected < 0.02, (
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
    print(f"API 模型: {len(df)}")
    print(f"含运行成本: {df['cost_to_run'].notna().sum()}")
    print(f"三维齐全(智能/速度/成本): {len(full)}")
    print(f"锚点校验: 通过 ({', '.join(COST_ANCHORS)})")
    print(f"已写出: {out}")


if __name__ == "__main__":
    main(refresh="--refresh" in sys.argv)
