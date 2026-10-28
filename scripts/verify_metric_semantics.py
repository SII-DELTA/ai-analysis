"""指标口径的最小回归验证（合成数据为主，不联网、不读 output/ 与 data/processed/）。

覆盖：7:2:1 混合价与 cache-hit 价来源、详情页 token 只取 currentModel（P0-3）、网页抓取暂停时
不发请求（D-12）、版本化回退快照、突出度语义、D-1 历史口径点不改变分析 Pareto、可达阶梯面、
实心面不再被 Plotly 编成 bdata（P0-4），以及契约校验的正例（零模型场景、零 Pareto 空网格）与
反例（空 scene、bdata、索引越界、缺 panel）。
"""
from __future__ import annotations

import copy
import math
import sys
import tempfile
from pathlib import Path

import numpy as np
import pandas as pd

REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPOSITORY_ROOT))

from src import cli, fetch_data, frontier, visualize
from src import frontier_3d_visualization_dataset_builder as dataset_builder
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import (  # noqa: E402
    FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE,
    build_frontier_3d_synthetic_fixture_models_dataframe,
)
from tests.fixtures.build_synthetic_artificial_analysis_model_detail_page_html import (  # noqa: E402
    build_synthetic_artificial_analysis_embedded_model_object,
    build_synthetic_artificial_analysis_model_detail_page_html,
    synthetic_artificial_analysis_model_uuid,
)

# 合成数据的固定剪枝参考日期（剪枝不再使用运行当天的日期）
FIXED_PRUNING_REFERENCE_DATE_FOR_SYNTHETIC_STANDOUT_CHECK = "2026-01-01"
# 固定基线：下列入库 v4.1 快照采集于 2026-08-04，含成本 129 条、原始输出 token 166 条。
EXPECTED_VERSIONED_FALLBACK_SNAPSHOT_PATH = (
    REPOSITORY_ROOT
    / "data"
    / "reference"
    / "artificial_analysis_intelligence_index_v4_1_single_batch_cost_and_output_token_fallback_snapshot_captured_2026_08_04.csv"
)
EXPECTED_VERSIONED_FALLBACK_SNAPSHOT_COST_TO_RUN_MODEL_COUNT = 129
EXPECTED_VERSIONED_FALLBACK_SNAPSHOT_CANONICAL_OUTPUT_TOKEN_COUNT_MODEL_COUNT = 166


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
    df = frontier.apply_pruning(
        df,
        since_months=999,
        max_layers=99,
        hard_age_cutoff_months=9999,
        pruning_reference_date=FIXED_PRUNING_REFERENCE_DATE_FOR_SYNTHETIC_STANDOUT_CHECK,
    )
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

    # D-1：加一个支配所有点的历史口径点（v4.1 成本与 token），分析 Pareto 与突出度不变
    rows_with_provenance = pd.DataFrame(rows, columns=["name", "intelligence", "cost_to_run", "eff_speed"])
    rows_with_provenance["cost_to_run_value_is_from_current_intelligence_index_version"] = True
    rows_with_provenance["output_token_count_value_is_from_current_intelligence_index_version"] = True
    dominating_historical_point = {
        "name": "H",
        "intelligence": 99.0,
        "cost_to_run": 0.01,
        "eff_speed": 10_000.0,
        "cost_to_run_value_is_from_current_intelligence_index_version": False,
        "output_token_count_value_is_from_current_intelligence_index_version": False,
    }
    rows_with_historical_point = pd.concat(
        [rows_with_provenance, pd.DataFrame([dominating_historical_point])], ignore_index=True
    )
    for dataframe_to_complete in (rows_with_provenance, rows_with_historical_point):
        dataframe_to_complete["creator"] = "X"
        dataframe_to_complete["release_date"] = pd.Timestamp("2026-01-01")
    scored_without_historical_point, scored_with_historical_point = (
        frontier.add_standout_metrics(
            frontier.apply_pruning(
                dataframe_to_score,
                since_months=999,
                max_layers=99,
                hard_age_cutoff_months=9999,
                pruning_reference_date=FIXED_PRUNING_REFERENCE_DATE_FOR_SYNTHETIC_STANDOUT_CHECK,
            )
        ).set_index("name")
        for dataframe_to_score in (rows_with_provenance, rows_with_historical_point)
    )
    analysis_pareto_names_with_historical_point = set(
        scored_with_historical_point.index[scored_with_historical_point["is_pareto"]]
    )
    assert analysis_pareto_names_with_historical_point == frontier_names, (
        analysis_pareto_names_with_historical_point
    )
    assert scored_with_historical_point.loc["H", "kept"], "历史口径点应照常显示"
    assert scored_with_historical_point.loc["H", "display_is_pareto"], "历史口径点在显示层是 Pareto"
    assert math.isnan(scored_with_historical_point.loc["H", "layer"]), "历史口径点不应有分析层号"
    pd.testing.assert_frame_equal(
        scored_without_historical_point[frontier.STANDOUT_COLUMNS],
        scored_with_historical_point.loc[
            scored_without_historical_point.index, frontier.STANDOUT_COLUMNS
        ],
    )
    print("✅ D-1 历史口径点不改变分析 Pareto 与突出度")


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


def _verify_artificial_analysis_model_detail_page_output_token_parsing() -> None:
    """P0-3：只取 currentModel 自身的 token；页面首个带 token 的对象不是本模型时也不能错拿。"""
    other_model_id = synthetic_artificial_analysis_model_uuid(1)
    current_model_id = synthetic_artificial_analysis_model_uuid(2)
    other_model_object = build_synthetic_artificial_analysis_embedded_model_object(
        model_id=other_model_id,
        slug="synthetic-other-model",
        name="Synthetic Other Model",
        canonical_output_token_count=99_000_000,
    )
    current_model_object = build_synthetic_artificial_analysis_embedded_model_object(
        model_id=current_model_id,
        slug="synthetic-current-model",
        name="Synthetic Current Model",
        canonical_output_token_count=30_000_000,
    )
    parse_token = (
        fetch_data.parse_canonical_output_token_count_from_artificial_analysis_model_detail_page_html
    )
    assert (
        parse_token(
            build_synthetic_artificial_analysis_model_detail_page_html(
                embedded_model_objects=[other_model_object, current_model_object],
                current_model_object={"id": current_model_id, "slug": "synthetic-current-model"},
            )
        )
        == 30_000_000
    )
    # 没有 currentModel：旧实现会拿「全页首个匹配」，现在必须返回 None
    assert (
        parse_token(
            build_synthetic_artificial_analysis_model_detail_page_html(
                embedded_model_objects=[other_model_object, current_model_object],
            )
        )
        is None
    )
    current_model_object_without_tokens = build_synthetic_artificial_analysis_embedded_model_object(
        model_id=current_model_id,
        slug="synthetic-current-model",
        name="Synthetic Current Model",
    )
    assert (
        parse_token(
            build_synthetic_artificial_analysis_model_detail_page_html(
                embedded_model_objects=[other_model_object, current_model_object_without_tokens],
                current_model_object={"id": current_model_id, "slug": "synthetic-current-model"},
            )
        )
        is None
    )
    assert parse_token("<html>无相关字段</html>") is None
    print("✅ Artificial Analysis 模型详情页 token 只取 currentModel 验证通过")


def _verify_website_page_fetch_paused_by_default_sends_no_request() -> None:
    """D-12：默认暂停网页抓取，缓存缺失时返回 None，不发任何请求。"""
    original_get = fetch_data.requests.get

    def fail_on_any_network_request(*arguments, **keyword_arguments):
        raise AssertionError(f"暂停抓取时不应发请求: {arguments}")

    try:
        fetch_data.requests.get = fail_on_any_network_request
        with tempfile.TemporaryDirectory() as empty_model_detail_page_cache_directory:
            assert (
                fetch_data.fetch_artificial_analysis_model_detail_page_html(
                    "synthetic-model-without-cache",
                    refresh=True,
                    model_detail_page_html_cache_directory=Path(empty_model_detail_page_cache_directory),
                )
                is None
            )
    finally:
        fetch_data.requests.get = original_get
    print("✅ 网页抓取默认暂停（D-12）验证通过")


def _verify_frontier_mesh_is_not_encoded_as_plotly_bdata() -> None:
    """P0-4：实心面 trace 传 Python 列表，契约里是有限数与合法索引，三角形数 > 0。"""
    dataset = dataset_builder.build_frontier_3d_visualization_dataset(
        build_frontier_3d_synthetic_fixture_models_dataframe(),
        since_months=18,
        max_layers=3,
        hard_age_cutoff_months=36,
        speed_scale="log",
        pruning_reference_date=FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE,
    )
    dataset_builder.validate_frontier_3d_visualization_dataset(dataset)
    default_variant = dataset["metric_variants"]["effective__effective"]
    surface_mesh = default_variant["three_dimensional_scene"]["pareto_frontier_surface_triangle_mesh"]
    assert len(surface_mesh["triangle_vertex_index_a"]) > 0, "默认口径实心面三角形数应 > 0"
    assert all(isinstance(value, float) for value in surface_mesh["x_coordinates"])
    from src.cli import _figure_from_dataset_variant
    mesh_traces = [trace for trace in _figure_from_dataset_variant(dataset, "effective__effective").to_plotly_json()["data"] if trace.get("type") == "mesh3d"]
    assert mesh_traces and not isinstance(mesh_traces[0]["x"], dict), "实心面 trace 仍被编码成 bdata"
    print("✅ 实心面不再被 Plotly 编码成 bdata（P0-4）验证通过")


def _verify_dataset_validation_positive_and_negative_examples() -> None:
    zero_model_scene = {
        "displayed_model_markers": [],
        "pareto_frontier_wireframe_line_segments": {
            "x_coordinates": [], "y_coordinates": [], "z_coordinates": [],
        },
        "pareto_frontier_surface_triangle_mesh": {
            "x_coordinates": [], "y_coordinates": [], "z_coordinates": [],
            "triangle_vertex_index_a": [], "triangle_vertex_index_b": [], "triangle_vertex_index_c": [],
        },
        "achievable_frontier_surface_triangle_mesh": {
            "x_coordinates": [], "y_coordinates": [], "z_coordinates": [],
            "triangle_vertex_index_a": [], "triangle_vertex_index_b": [], "triangle_vertex_index_c": [],
        },
        "three_dimensional_axis_configuration": {
            "x_axis": {"title_text": "成本", "scale_type": "log", "fixed_range": [0.0, 1.0]},
            "y_axis": {"title_text": "速度", "scale_type": "log", "fixed_range": [0.0, 1.0]},
            "z_axis": {"title_text": "智能", "scale_type": "linear", "fixed_range": [0.0, 1.0]},
        },
        "current_view": {},
    }
    zero_model_variant = {
        "three_dimensional_scene": zero_model_scene,
        "interaction_relationships": {},
        "plotly_static_export_trace_data": [],
        "plotly_static_export_layout": {},
    }
    zero_model_dataset = {
        "schema_version": dataset_builder.LEGACY_FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION,
        "interactive_renderer": "threejs",
        "initial_variant_key": "effective__effective",
        "organization_identity_metadata_by_creator_name": {},
        "metric_variants": {
            variant_key: copy.deepcopy(zero_model_variant)
            for variant_key in ("effective__effective", "effective__raw", "blended__effective", "blended__raw")
        },
    }
    # 正例：零模型、零 Pareto 的合法场景（全部网格为空）
    dataset_builder.validate_frontier_3d_visualization_dataset(zero_model_dataset)

    def assert_validation_rejects(invalid_dataset: dict, description: str) -> None:
        try:
            dataset_builder.validate_frontier_3d_visualization_dataset(invalid_dataset)
        except ValueError:
            return
        raise AssertionError(f"契约校验应拒绝：{description}")

    # 反例：空 scene（旧版本曾断言它合法）
    empty_scene_dataset = copy.deepcopy(zero_model_dataset)
    for variant in empty_scene_dataset["metric_variants"].values():
        variant["three_dimensional_scene"] = {}
    assert_validation_rejects(empty_scene_dataset, "空 scene")

    # 反例：实心面坐标是 bdata 键名（P0-4 的真实形态）
    listed_bdata_dataset = copy.deepcopy(zero_model_dataset)
    listed_bdata_dataset["metric_variants"]["effective__effective"]["three_dimensional_scene"][
        "pareto_frontier_surface_triangle_mesh"
    ]["x_coordinates"] = ["dtype", "bdata"]
    assert_validation_rejects(listed_bdata_dataset, "实心面坐标为 ['dtype','bdata']")

    # 反例：三角索引越界
    out_of_range_index_dataset = copy.deepcopy(zero_model_dataset)
    out_of_range_mesh = out_of_range_index_dataset["metric_variants"]["effective__effective"][
        "three_dimensional_scene"
    ]["pareto_frontier_surface_triangle_mesh"]
    out_of_range_mesh.update(
        x_coordinates=[0.0, 1.0, 2.0], y_coordinates=[0.0, 1.0, 0.0], z_coordinates=[1.0, 1.0, 1.0],
        triangle_vertex_index_a=[0], triangle_vertex_index_b=[1], triangle_vertex_index_c=[3],
    )
    assert_validation_rejects(out_of_range_index_dataset, "三角索引越界")

    # 反例：显示点缺 panel
    missing_panel_dataset = copy.deepcopy(zero_model_dataset)
    missing_panel_dataset["metric_variants"]["effective__effective"]["three_dimensional_scene"][
        "displayed_model_markers"
    ] = [{"name": "缺 panel 的点", "x": 1.0, "y": 1.0, "z": 1.0}]
    assert_validation_rejects(missing_panel_dataset, "显示点缺 panel")
    print("✅ 契约校验正例（零模型/零 Pareto）与反例（空 scene/bdata/越界/缺 panel）验证通过")


def main() -> None:
    native_pricing = {
        "price_1m_blended_7_to_2_to_1": 9.99,
        "price_1m_cache_hit_tokens": 1.0,
        "price_1m_input_tokens": 2.0,
        "price_1m_output_tokens": 3.0,
    }
    assert fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1(native_pricing) == 9.99
    assert fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1_with_cache_hit_price_source(
        native_pricing
    ) == (9.99, fetch_data.BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_ARTIFICIAL_ANALYSIS_API_NATIVE_BLENDED_PRICE)

    component_pricing = {
        "price_1m_cache_hit_tokens": 1.0,
        "price_1m_input_tokens": 2.0,
        "price_1m_output_tokens": 3.0,
    }
    assert fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1(component_pricing) == 1.4
    assert fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1_with_cache_hit_price_source(
        component_pricing
    ) == (1.4, fetch_data.BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_API_CACHE_HIT_PRICE)
    # P0-6：缺 cache-hit 价时按 AA 惯例用 input 价代替 = (9×input + output)/10，不再是 NaN
    blended_price_without_cache_hit, blended_price_source_without_cache_hit = (
        fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1_with_cache_hit_price_source(
            {"price_1m_input_tokens": 2.0, "price_1m_output_tokens": 3.0}
        )
    )
    assert math.isclose(blended_price_without_cache_hit, (9 * 2.0 + 3.0) / 10)
    assert (
        blended_price_source_without_cache_hit
        == fetch_data.BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_INPUT_PRICE_AS_CACHE_HIT_PRICE
    )
    # input 或 output 缺失 → NaN，来源 None
    blended_price_without_output, blended_price_source_without_output = (
        fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1_with_cache_hit_price_source(
            {"price_1m_input_tokens": 2.0, "price_1m_cache_hit_tokens": 1.0}
        )
    )
    assert math.isnan(blended_price_without_output) and blended_price_source_without_output is None

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
        == "frontier_3d_visualization_dataset/v3"
    )
    assert (
        dataset_builder.DEFAULT_FRONTIER_3D_VISUALIZATION_DATASET_FILENAME
        == "frontier_3d_visualization_dataset.json"
    )
    assert set(cli.COST_METRICS) == {"effective", "blended"}
    assert set(cli.SPEED_METRICS) == {"effective", "raw"}
    # 契约校验的正例与反例见 _verify_dataset_validation_positive_and_negative_examples
    # （旧版本在这里断言「空 scene 也合法」，现在空 scene 是反例）
    empty_variant_template = {
        variant_key: {}
        for variant_key in ("effective__effective", "effective__raw", "blended__effective", "blended__raw")
    }
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

    # 默认只读入库的版本化快照（v4.1），不读上次产物 data/processed/models.csv
    default_versioned_fallback_snapshot_path = (
        fetch_data.ARTIFICIAL_ANALYSIS_INTELLIGENCE_INDEX_V4_1_COST_TO_RUN_AND_CANONICAL_OUTPUT_TOKEN_COUNT_FALLBACK_SNAPSHOT_PATH
    )
    assert (
        default_versioned_fallback_snapshot_path == EXPECTED_VERSIONED_FALLBACK_SNAPSHOT_PATH
    ), (
        f"默认版本化回退快照不匹配：期望 {EXPECTED_VERSIONED_FALLBACK_SNAPSHOT_PATH}，"
        f"实际 {default_versioned_fallback_snapshot_path}"
    )
    assert default_versioned_fallback_snapshot_path.is_file(), (
        f"默认版本化回退快照文件不存在：{default_versioned_fallback_snapshot_path}"
    )
    fallback_values = fetch_data.load_cost_and_output_token_fallbacks()
    for metric_label, fallback_value_by_model_id, expected_model_count, expected_value_source in (
        (
            "成本",
            fallback_values.cost_to_run_fallback_value_by_model_id,
            EXPECTED_VERSIONED_FALLBACK_SNAPSHOT_COST_TO_RUN_MODEL_COUNT,
            fetch_data.COST_TO_RUN_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT,
        ),
        (
            "原始输出 token",
            fallback_values.canonical_output_token_count_fallback_value_by_model_id,
            EXPECTED_VERSIONED_FALLBACK_SNAPSHOT_CANONICAL_OUTPUT_TOKEN_COUNT_MODEL_COUNT,
            fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT,
        ),
    ):
        assert len(fallback_value_by_model_id) == expected_model_count, (
            f"{metric_label}回退记录数：期望 {expected_model_count}，实际 {len(fallback_value_by_model_id)}"
        )
        for model_id, fallback_value in fallback_value_by_model_id.items():
            for metadata_field_name, expected_metadata_value in (
                ("value_source", expected_value_source),
                ("intelligence_index_version", "4.1"),
                ("fetched_at_utc", "2026-08-04"),
            ):
                actual_metadata_value = getattr(fallback_value, metadata_field_name)
                assert actual_metadata_value == expected_metadata_value, (
                    f"{metric_label}回退值 {model_id} 的 {metadata_field_name}："
                    f"期望 {expected_metadata_value!r}，实际 {actual_metadata_value!r}"
                )

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

    _verify_artificial_analysis_model_detail_page_output_token_parsing()
    _verify_website_page_fetch_paused_by_default_sends_no_request()
    _verify_standout_metrics()
    _verify_achievable_frontier_step_mesh()
    _verify_frontier_mesh_is_not_encoded_as_plotly_bdata()
    _verify_dataset_validation_positive_and_negative_examples()


if __name__ == "__main__":
    main()
