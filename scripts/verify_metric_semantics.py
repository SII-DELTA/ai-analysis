"""指标口径的最小回归验证。"""
from __future__ import annotations

import math
import sys
from pathlib import Path

import numpy as np
import pandas as pd

REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPOSITORY_ROOT))

from src import cli, fetch_data, frontier, visualize
from src import frontier_3d_visualization_dataset_builder as dataset_builder


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


def _verify_achievable_frontier_step_mesh() -> None:
    """可达曲面应由水平阶梯 cell 组成，并锚定每个可见 Pareto 节点。"""
    pareto = pd.DataFrame(
        [
            ("A", 70.0, 1.0, 100.0),
            ("B", 80.0, 2.0, 80.0),
            ("C", 90.0, 4.0, 50.0),
        ],
        columns=["name", "intelligence", "cost_to_run", "eff_speed"],
    )
    pareto["kept"] = True
    pareto["is_pareto"] = True

    mesh = visualize._achievable_frontier_step_mesh(
        pareto,
        cost_metric_column_name="cost_to_run",
        speed_metric_column_name="eff_speed",
    )
    xs = np.asarray(mesh.x, dtype=float)
    ys = np.asarray(mesh.y, dtype=float)
    zs = np.asarray(mesh.z, dtype=float)
    ii = np.asarray(mesh.i, dtype=int)
    jj = np.asarray(mesh.j, dtype=int)
    kk = np.asarray(mesh.k, dtype=int)

    assert len(xs) > 0 and len(ii) > 0, "可达曲面 mesh 不应为空"
    for _, row in pareto.iterrows():
        anchored = (
            np.isclose(xs, row["cost_to_run"])
            & np.isclose(ys, row["eff_speed"])
            & np.isclose(zs, row["intelligence"])
        ).any()
        assert anchored, f"{row['name']} 缺少同坐标同 z 的可达曲面锚点"

    assert len(ii) == len(jj) == len(kk), "mesh 三角索引长度不一致"
    for a, b, c in zip(ii, jj, kk):
        tri_z = zs[[a, b, c]]
        assert np.allclose(tri_z, tri_z[0]), f"可达曲面出现非水平三角形: {tri_z}"
    print("✅ 可达前沿阶梯 mesh 几何验证通过")


class _FakeApiResponse:
    def __init__(self, status_code: int, payload: dict):
        self.status_code = status_code
        self._payload = payload

    def raise_for_status(self) -> None:
        assert self.status_code < 400

    def json(self) -> dict:
        return self._payload


def _verify_artificial_analysis_model_detail_page_output_token_fallback() -> None:
    escaped_model_detail_page_html = (
        r'{\"canonicalIntelligenceIndexTokenCount\":'
        r'{\"input\":1000000,\"output\":30000000}}'
    )
    assert (
        fetch_data.parse_canonical_output_token_count_from_artificial_analysis_model_detail_page_html(
            escaped_model_detail_page_html
        )
        == 30_000_000
    )
    assert (
        fetch_data.parse_canonical_output_token_count_from_artificial_analysis_model_detail_page_html(
            '{"canonicalIntelligenceIndexTokenCount":{"output":0}}'
        )
        is None
    )
    assert (
        fetch_data.parse_canonical_output_token_count_from_artificial_analysis_model_detail_page_html(
            "<html>无相关字段</html>"
        )
        is None
    )

    model_dataframe = pd.DataFrame(
        [
            {
                "slug": "model-requiring-detail-page-fallback",
                "intelligence": 60.0,
                "output_speed": 100.0,
                "cost_to_run": 20.0,
                "intel_per_m_output": math.nan,
            },
            {
                "slug": "model-already-containing-output-token-metric",
                "intelligence": 50.0,
                "output_speed": 90.0,
                "cost_to_run": 15.0,
                "intel_per_m_output": 4.0,
            },
            {
                "slug": "model-missing-required-cost-dimension",
                "intelligence": 40.0,
                "output_speed": 80.0,
                "cost_to_run": math.nan,
                "intel_per_m_output": math.nan,
            },
        ]
    )
    requested_model_detail_pages: list[tuple[str, bool]] = []
    original_fetch_model_detail_page_html = (
        fetch_data.fetch_artificial_analysis_model_detail_page_html
    )

    def fake_fetch_model_detail_page_html(
        model_slug: str,
        refresh: bool = False,
    ) -> str:
        requested_model_detail_pages.append((model_slug, refresh))
        return escaped_model_detail_page_html

    try:
        fetch_data.fetch_artificial_analysis_model_detail_page_html = (
            fake_fetch_model_detail_page_html
        )
        filled_row_count = (
            fetch_data.fill_missing_intelligence_per_million_output_tokens_from_artificial_analysis_model_detail_pages(
                model_dataframe,
                refresh=True,
            )
        )
    finally:
        fetch_data.fetch_artificial_analysis_model_detail_page_html = (
            original_fetch_model_detail_page_html
        )

    assert filled_row_count == 1
    assert requested_model_detail_pages == [
        ("model-requiring-detail-page-fallback", True)
    ]
    assert model_dataframe.loc[0, "intel_per_m_output"] == 2.0
    assert model_dataframe.loc[1, "intel_per_m_output"] == 4.0
    assert math.isnan(model_dataframe.loc[2, "intel_per_m_output"])
    print("✅ Artificial Analysis 模型详情页输出 token 回退验证通过")


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
    assert (
        dataset_builder.FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION
        == "frontier_3d_visualization_dataset/v2"
    )
    assert (
        dataset_builder.DEFAULT_FRONTIER_3D_VISUALIZATION_DATASET_FILENAME
        == "frontier_3d_visualization_dataset.json"
    )
    assert set(cli.COST_METRICS) == {"effective", "blended"}
    assert set(cli.SPEED_METRICS) == {"effective", "raw"}
    empty_variant = {
        "three_dimensional_scene": {},
        "interaction_relationships": {},
        "plotly_static_export_trace_data": [],
        "plotly_static_export_layout": {},
    }
    empty_variant_template = {
        "effective__effective": dict(empty_variant),
        "effective__raw": dict(empty_variant),
        "blended__effective": dict(empty_variant),
        "blended__raw": dict(empty_variant),
    }
    dataset_builder.validate_frontier_3d_visualization_dataset(
        {
            "schema_version": dataset_builder.FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION,
            "interactive_renderer": "threejs",
            "initial_variant_key": "effective__effective",
            "organization_identity_metadata_by_creator_name": {},
            "metric_variants": empty_variant_template,
        }
    )
    dataset_with_raw_initial_metric_variant = {
        "initial_variant_key": "effective__raw",
        "metric_variants": empty_variant_template,
    }
    assert (
        cli._initial_variant_key_after_cli_metric_overrides(
            dataset_with_raw_initial_metric_variant, None, None
        )
        == "effective__raw"
    )
    assert (
        cli._initial_variant_key_after_cli_metric_overrides(
            dataset_with_raw_initial_metric_variant, "blended", None
        )
        == "blended__raw"
    )
    assert (
        cli._initial_variant_key_after_cli_metric_overrides(
            dataset_with_raw_initial_metric_variant, "blended", "effective"
        )
        == "blended__effective"
    )

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

    _verify_artificial_analysis_model_detail_page_output_token_fallback()
    _verify_standout_metrics()
    _verify_achievable_frontier_step_mesh()


if __name__ == "__main__":
    main()
