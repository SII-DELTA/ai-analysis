"""比较产物由 v2 离线生成，输入、共享目录和主报告保持原样。"""
from __future__ import annotations

import copy
import hashlib
import json
import os
from pathlib import Path

import pytest
from plotly.utils import PlotlyJSONEncoder

from src.frontier_3d_geometry_comparison_artifact_builder import (
    build_geometry_comparison_dataset,
    write_geometry_comparison_artifacts,
)
from src.frontier_3d_visualization_dataset_builder import build_frontier_3d_visualization_dataset
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe


@pytest.fixture(scope="module")
def source_dataset():
    dataset = build_frontier_3d_visualization_dataset(
        build_frontier_3d_synthetic_fixture_models_dataframe(),
        since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log",
    )
    # 和实际 v2 磁盘契约一致：静态适配器中的 ndarray 经 Plotly 编码后再读取。
    return json.loads(json.dumps(dataset, cls=PlotlyJSONEncoder))


def test_comparison_preserves_source_delaunay_indices_and_excludes_historical_anchors(source_dataset):
    source_before = copy.deepcopy(source_dataset)
    comparison = build_geometry_comparison_dataset(source_dataset, "synthetic-source-sha256")
    assert comparison["source_dataset_sha256"] == "synthetic-source-sha256"
    assert len(comparison["metric_variants"]) == 4
    for key, variant in comparison["metric_variants"].items():
        scene = source_dataset["metric_variants"][key]["three_dimensional_scene"]
        original_mesh = scene["pareto_frontier_surface_triangle_mesh"]
        assert variant["reference_triangle_mesh"]["triangles"] == [
            list(indices) for indices in zip(*(original_mesh[f"triangle_vertex_index_{axis}"] for axis in "abc"))
        ]
        assert len(variant["exact_pareto_points"]) == sum(
            model["analysis_eligible"] and model["is_pareto"] for model in variant["displayed_models"]
        )
        assert all(model["analysis_eligible"] for model in variant["displayed_models"] if model["is_pareto"])
    assert source_dataset == source_before


def test_linear_speed_projection_keeps_axis_scale_in_comparison_metadata(source_dataset):
    source = copy.deepcopy(source_dataset)
    for variant in source["metric_variants"].values():
        axis = variant["three_dimensional_scene"]["three_dimensional_axis_configuration"]["y_axis"]
        axis["scale_type"] = "linear"
        axis["fixed_range"] = [0, 10000]
    comparison = build_geometry_comparison_dataset(source, "linear-test")
    assert all(variant["projection_plane_description"] == "对数成本 × 线性速度" for variant in comparison["metric_variants"].values())


def test_artifacts_are_self_contained_escaped_and_input_is_not_overwritten(source_dataset, tmp_path):
    source = copy.deepcopy(source_dataset)
    first_scene = next(iter(source["metric_variants"].values()))["three_dimensional_scene"]
    source["models"][first_scene["displayed_model_markers"][0]["model_index"]]["name"] = '</script><img src="https://example.invalid/x" onerror="window.injected=1">'
    source_path = tmp_path / "source.json"
    source_path.write_text(json.dumps(source), encoding="utf-8")
    original_bytes = source_path.read_bytes()
    destination = tmp_path / "comparison-artifacts"
    artifacts = write_geometry_comparison_artifacts(source_path, destination)
    html = artifacts["html"].read_text()
    assert '<script src=' not in html
    assert '</script><img' not in html
    assert '\\u003c/script\\u003e' in html
    assert "历史助手建议" in html
    assert "hover 里直接说明" in artifacts["decision_brief"].read_text()
    assert artifacts["source_snapshot"].read_bytes() == original_bytes
    assert source_path.read_bytes() == original_bytes
    metrics = json.loads(artifacts["metrics"].read_text())
    assert metrics["source_dataset_sha256"] == hashlib.sha256(original_bytes).hexdigest()
    assert len(metrics["metric_variants"]) == 4


def test_shared_output_destination_and_symlinked_output_files_are_rejected(source_dataset, tmp_path):
    source_path = tmp_path / "source.json"
    source_path.write_text(json.dumps(source_dataset))
    shared_output = Path(__file__).resolve().parents[2] / "output"
    with pytest.raises(ValueError, match="共享"):
        write_geometry_comparison_artifacts(source_path, shared_output)
    destination = tmp_path / "comparison-artifacts"
    destination.mkdir()
    (destination / "frontier_3d_geometry_comparison_source_dataset.json").symlink_to(source_path)
    with pytest.raises(ValueError, match="输入"):
        write_geometry_comparison_artifacts(source_path, destination)


def test_missing_analysis_eligibility_is_rejected_instead_of_silently_treating_points_as_current(source_dataset):
    source = copy.deepcopy(source_dataset)
    next(iter(source["metric_variants"].values()))["three_dimensional_scene"]["displayed_model_markers"][0].pop("analysis_eligibility")
    with pytest.raises(ValueError, match="analysis_eligibility"):
        build_geometry_comparison_dataset(source, "missing-eligibility")


def test_hardlinked_input_cannot_be_overwritten_by_an_artifact(source_dataset, tmp_path):
    source = tmp_path / "source.json"
    source.write_text(json.dumps(source_dataset))
    original_bytes = source.read_bytes()
    destination = tmp_path / "comparison-artifacts"
    destination.mkdir()
    os.link(source, destination / "frontier_3d_geometry_comparison_metrics.json")
    with pytest.raises(ValueError, match="输入"):
        write_geometry_comparison_artifacts(source, destination)
    assert source.read_bytes() == original_bytes


def test_degenerate_intelligence_axis_is_rejected_before_rendering(source_dataset):
    source = copy.deepcopy(source_dataset)
    next(iter(source["metric_variants"].values()))["three_dimensional_scene"]["three_dimensional_axis_configuration"]["z_axis"]["fixed_range"] = [5, 5]
    with pytest.raises(ValueError, match="固定范围"):
        build_geometry_comparison_dataset(source, "invalid-intelligence-range")
