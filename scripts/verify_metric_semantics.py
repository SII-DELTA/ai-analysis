"""指标口径的最小回归验证。"""
from __future__ import annotations

import math
import sys
from pathlib import Path

import numpy as np
import pandas as pd

REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPOSITORY_ROOT))

from src import cli, fetch_data, frontier


def _grid_hypervolume(points: np.ndarray, n: int = 200) -> float:
    """独立 oracle：在单位立方 [0,1]^3 上数被支配格子占比，作为超体积对拍参照。"""
    axis = (np.arange(n) + 0.5) / n
    gx, gy, gz = np.meshgrid(axis, axis, axis, indexing="ij")
    occupied = np.zeros((n, n, n), dtype=bool)
    for x, y, z in points:
        occupied |= (gx <= x) & (gy <= y) & (gz <= z)
    return float(occupied.mean())


def _verify_standout_metrics() -> None:
    """四个突出度指标的语义回归（合成 df，无网络）。"""
    rng = np.random.default_rng(0)

    # 超体积核心与排他贡献对拍网格法（独立实现）
    for _ in range(3):
        pts = rng.uniform(0.15, 0.95, size=(6, 3))
        assert abs(frontier._hypervolume3d(pts) - _grid_hypervolume(pts)) < 0.012
    pts = rng.uniform(0.15, 0.95, size=(5, 3))
    ehvc = frontier._exclusive_hypervolume_contributions(pts, (1.0, 1.0, 1.0))
    assert (ehvc >= -1e-9).all(), f"排他贡献出现负值: {ehvc}"
    full = _grid_hypervolume(pts)
    for k in range(len(pts)):
        expected = full - _grid_hypervolume(np.delete(pts, k, axis=0))
        assert abs(ehvc[k] - expected) < 0.015, f"EHVC[{k}] 对拍失败"
    # 指数加权保序：前沿成员数不变（>0 的个数不变）
    ehvc_weighted = frontier._exclusive_hypervolume_contributions(pts, (4.0, 1.0, 0.5))
    assert (ehvc_weighted > 0).sum() == (ehvc > 0).sum(), "指数加权改变了前沿成员数"

    # add_standout_metrics 语义（已知前沿的合成 6 点）
    rows = [
        ("A", 80, 10, 100), ("B", 90, 100, 80), ("C", 95, 500, 50),
        ("D", 70, 5, 120), ("E", 60, 50, 60), ("F", 85, 200, 70),
    ]
    df = pd.DataFrame(rows, columns=["name", "intelligence", "cost_to_run", "eff_speed"])
    df["creator"] = "X"
    df["release_date"] = pd.Timestamp("2026-01-01")
    df["output_speed"] = df["eff_speed"]
    df["output_mtokens"] = 1.0
    df["blended_price_cache_input_output_7_to_2_to_1"] = df["cost_to_run"]
    df = frontier.apply_pruning(df, since_months=999, max_layers=99, hard_age_cutoff_months=9999)
    df = frontier.add_standout_metrics(df, "cost_to_run", "eff_speed", speed_log=True)
    kept = df[df["kept"]].set_index("name")
    frontier_names = set(kept[kept["is_pareto"]].index)
    assert frontier_names == {"A", "B", "C", "D"}, frontier_names

    for name, row in kept.iterrows():
        uplift = row["standout_intelligence_uplift"]
        hypervolume = row["standout_weighted_hypervolume"]
        distance = row["standout_frontier_distance"]
        if name in frontier_names:
            assert math.isnan(uplift) or uplift >= -1e-9, f"{name} 前沿抬升为负"
            assert hypervolume > 0, f"{name} 前沿超体积应>0"
            assert distance >= 0, f"{name} 前沿垂距应≥0"
        else:
            assert uplift < 0, f"{name} 非前沿抬升应<0"
            assert hypervolume == 0, f"{name} 非前沿超体积应=0"
            assert distance == 0, f"{name} 非前沿垂距应=0"
    assert math.isnan(kept.loc["D", "standout_intelligence_uplift"]), "D 应无预算内他者→NaN"
    for column in ("g_cost", "g_speed", "g_intel"):
        values = kept[column].to_numpy(float)
        assert ((values > 0) & (values < 1)).all(), f"{column} 越界 (0,1)"
    print("✅ 突出度指标语义验证通过")


class _FakeApiResponse:
    def __init__(self, status_code: int, payload: dict):
        self.status_code = status_code
        self._payload = payload

    def raise_for_status(self) -> None:
        assert self.status_code < 400

    def json(self) -> dict:
        return self._payload


def main() -> None:
    native_pricing = {
        "price_1m_blended_7_to_2_to_1": 9.99,
        "price_1m_cache_hit_tokens": 1.0,
        "price_1m_input_tokens": 2.0,
        "price_1m_output_tokens": 3.0,
    }
    assert fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1(native_pricing) == 9.99

    component_pricing = {
        "price_1m_cache_hit_tokens": 1.0,
        "price_1m_input_tokens": 2.0,
        "price_1m_output_tokens": 3.0,
    }
    assert fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1(component_pricing) == 1.4
    assert math.isnan(
        fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1(
            {"price_1m_input_tokens": 2.0, "price_1m_output_tokens": 3.0}
        )
    )

    assert frontier.dims_for(
        cost_metric_column_name="blended_price_cache_input_output_7_to_2_to_1",
        speed_metric_column_name="eff_speed",
    ) == [
        "intelligence",
        "blended_price_cache_input_output_7_to_2_to_1",
        "eff_speed",
    ]
    assert cli.DEFAULT_SPEED_METRIC_NAME == "effective"
    assert cli.DEFAULT_COST_METRIC_NAME == "effective"
    assert cli.DEFAULT_OUTPUT_HTML_PATH.name == "frontier_3d.html"

    original_processed_dir = fetch_data.PROCESSED
    try:
        fetch_data.PROCESSED = REPOSITORY_ROOT / "nonexistent-processed-dir-for-fallback-test"
        fallback_cost_by_model_id, fallback_intel_per_m_by_model_id = (
            fetch_data.load_cost_and_output_token_fallbacks()
        )
    finally:
        fetch_data.PROCESSED = original_processed_dir
    assert fetch_data.VERSIONED_COST_AND_OUTPUT_TOKEN_FALLBACK_SNAPSHOT.exists()
    assert len(fallback_cost_by_model_id) >= 250
    assert len(fallback_intel_per_m_by_model_id) >= 300

    requested_urls = []
    original_get = fetch_data.requests.get

    def fake_get(url, **kwargs):
        requested_urls.append((url, kwargs["params"]["page"]))
        if url == fetch_data.API_LANGUAGE_MODELS_PRO_URL:
            return _FakeApiResponse(403, {})
        page = kwargs["params"]["page"]
        return _FakeApiResponse(
            200,
            {
                "data": [{"id": f"model-{page}"}],
                "pagination": {"has_more": page == 1},
            },
        )

    try:
        fetch_data.requests.get = fake_get
        rows, selected_api_url = fetch_data._fetch_paginated_language_models("test-key")
    finally:
        fetch_data.requests.get = original_get
    assert requested_urls == [
        (fetch_data.API_LANGUAGE_MODELS_PRO_URL, 1),
        (fetch_data.API_LANGUAGE_MODELS_FREE_URL, 1),
        (fetch_data.API_LANGUAGE_MODELS_FREE_URL, 2),
    ]
    assert rows == [{"id": "model-1"}, {"id": "model-2"}]
    assert selected_api_url == fetch_data.API_LANGUAGE_MODELS_FREE_URL
    print("✅ 指标口径验证通过")

    _verify_standout_metrics()


if __name__ == "__main__":
    main()
