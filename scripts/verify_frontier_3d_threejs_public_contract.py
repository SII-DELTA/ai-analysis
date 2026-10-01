"""Frontier 3D three.js 公共数据契约与厂商身份行为验证。

用法：
    python scripts/verify_frontier_3d_threejs_public_contract.py [<frontier_3d.html>]
- 总是验证：厂商身份注册表，以及由合成模型表构建的契约；
- 给出 HTML 路径时，另外从 HTML 中取出内嵌的数据契约，验证契约校验（有限数坐标、索引范围等）、
  每个显示点都带 `value_provenance` 与 `analysis_eligibility`，以及各口径历史口径点计数与 marker 一致。
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

import pandas as pd

REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPOSITORY_ROOT))

from src.frontier_3d_visualization_dataset_builder import (  # noqa: E402
    FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION,
    build_frontier_3d_visualization_dataset,
    validate_frontier_3d_visualization_dataset,
)
from src.frontier_3d_organization_identity_metadata_registry import (  # noqa: E402
    known_organization_creator_names,
    organization_identity_metadata_for_creator_name,
)
from src.cli import _figure_from_dataset_variant  # noqa: E402


def _synthetic_models_with_chinese_united_states_and_other_creators() -> pd.DataFrame:
    rows = [
        ("Qwen Contract Model", "Alibaba", 92.0, 8.0, 130.0),
        ("GPT Contract Model", "OpenAI", 94.0, 12.0, 105.0),
        ("Mistral Contract Model", "Mistral", 88.0, 5.0, 150.0),
        ("Unknown Contract Model", "Future Unmapped Laboratory", 82.0, 3.0, 90.0),
        ("Unattributed Contract Model", None, 80.0, 2.0, 85.0),
    ]
    dataframe = pd.DataFrame(
        rows,
        columns=["name", "creator", "intelligence", "cost_to_run", "eff_speed"],
    )
    dataframe["release_date"] = pd.Timestamp("2026-01-01")
    dataframe["output_speed"] = dataframe["eff_speed"] * 1.2
    dataframe["output_mtokens"] = 10.0
    dataframe["blended_price_cache_input_output_7_to_2_to_1"] = (
        dataframe["cost_to_run"] / 2.0
    )
    return dataframe


FRONTIER_3D_EMBEDDED_VISUALIZATION_DATASET_SCRIPT_TAG_PATTERN = re.compile(
    r'<script id="frontier-3d-visualization-dataset-json" type="application/json">(.*?)</script>',
    re.DOTALL,
)
DISPLAYED_MODEL_MARKER_VALUE_PROVENANCE_REQUIRED_KEYS = (
    "cost_to_run_value_source",
    "cost_to_run_value_intelligence_index_version",
    "cost_to_run_value_fetched_at_utc",
    "output_token_count_value_source",
    "output_token_count_value_intelligence_index_version",
    "output_token_count_value_fetched_at_utc",
    "blended_price_cache_hit_price_source",
)


def verify_frontier_3d_visualization_dataset_embedded_in_rendered_html(
    rendered_frontier_3d_html_path: Path,
) -> None:
    """验证渲染产物里内嵌的真实数据契约（不是合成契约）。"""
    rendered_html_text = rendered_frontier_3d_html_path.read_text(encoding="utf-8")
    embedded_dataset_matches = FRONTIER_3D_EMBEDDED_VISUALIZATION_DATASET_SCRIPT_TAG_PATTERN.findall(
        rendered_html_text
    )
    assert len(embedded_dataset_matches) == 1, "HTML 中应恰有一段内嵌数据契约"
    embedded_dataset = json.loads(embedded_dataset_matches[0])
    validate_frontier_3d_visualization_dataset(embedded_dataset)
    assert "artificial_analysis_data_provenance" in embedded_dataset
    for variant_key, variant in embedded_dataset["metric_variants"].items():
        displayed_model_markers = variant["three_dimensional_scene"]["displayed_model_markers"]
        for displayed_model_marker in displayed_model_markers:
            value_provenance = displayed_model_marker.get("value_provenance")
            assert isinstance(value_provenance, dict), (
                f"{variant_key}：{displayed_model_marker['name']} 缺 value_provenance"
            )
            missing_value_provenance_keys = [
                required_key
                for required_key in DISPLAYED_MODEL_MARKER_VALUE_PROVENANCE_REQUIRED_KEYS
                if required_key not in value_provenance
            ]
            assert not missing_value_provenance_keys, (
                f"{variant_key}：{displayed_model_marker['name']} 的 value_provenance 缺 "
                f"{missing_value_provenance_keys}"
            )
            assert isinstance(displayed_model_marker.get("analysis_eligibility"), dict), (
                f"{variant_key}：{displayed_model_marker['name']} 缺 analysis_eligibility"
            )
        historical_version_marker_count = sum(
            displayed_model_marker["analysis_eligibility"][
                "is_analysis_eligible_for_current_metric_variant"
            ]
            is False
            for displayed_model_marker in displayed_model_markers
        )
        assert historical_version_marker_count == variant["historical_version_value_model_count"], (
            f"{variant_key}：历史口径 marker 数 {historical_version_marker_count} 与契约计数 "
            f"{variant['historical_version_value_model_count']} 不一致"
        )
        pareto_surface_triangle_count = len(
            variant["three_dimensional_scene"]["pareto_frontier_surface_triangle_mesh"][
                "triangle_vertex_index_a"
            ]
        )
        print(
            f"    {variant_key}：显示 {len(displayed_model_markers)}、分析 Pareto "
            f"{variant['pareto_model_count']}、历史口径 {historical_version_marker_count}、"
            f"实心面三角形 {pareto_surface_triangle_count}"
        )
    print(f"✅ 内嵌数据契约验证通过：{rendered_frontier_3d_html_path}")


def main() -> None:
    known_creator_names = known_organization_creator_names()
    assert len(known_creator_names) == 54
    assert {"Alibaba", "OpenAI", "Mistral", "Z AI"}.issubset(known_creator_names)
    assert organization_identity_metadata_for_creator_name("Alibaba")[
        "logo_asset_kind"
    ] == "curated_svg"
    known_identity_metadata = [
        organization_identity_metadata_for_creator_name(creator_name)
        for creator_name in known_creator_names
    ]
    assert sum(
        identity_metadata["logo_asset_kind"] == "curated_svg"
        for identity_metadata in known_identity_metadata
    ) == 54
    assert sum(
        identity_metadata["logo_asset_kind"] == "generated_wordmark_fallback"
        for identity_metadata in known_identity_metadata
    ) == 0
    assert organization_identity_metadata_for_creator_name("Naver")[
        "logo_asset_source"
    ] == "simple-icons@16.26.0"
    assert organization_identity_metadata_for_creator_name("China Mobile")[
        "logo_asset_source"
    ] == "official_organization_website_static_asset@2026-07-18"

    dataset = build_frontier_3d_visualization_dataset(
        _synthetic_models_with_chinese_united_states_and_other_creators(),
        since_months=999,
        max_layers=99,
        hard_age_cutoff_months=9999,
        speed_scale="log",
        data_date="2026-07-18",
    )

    assert FRONTIER_3D_VISUALIZATION_DATASET_SCHEMA_VERSION == (
        "frontier_3d_visualization_dataset/v2"
    )
    validate_frontier_3d_visualization_dataset(dataset)
    assert dataset["interactive_renderer"] == "threejs"

    identities = dataset["organization_identity_metadata_by_creator_name"]
    assert identities["Alibaba"]["country_region_category"] == "china"
    assert identities["OpenAI"]["country_region_category"] == "united_states"
    assert identities["Mistral"]["country_region_category"] == "other"
    assert identities["Future Unmapped Laboratory"]["country_region_category"] == (
        "unclassified"
    )
    assert identities["Future Unmapped Laboratory"]["logo_asset_kind"] == (
        "generated_monogram_fallback"
    )
    assert identities["?"]["country_region_category"] == "unclassified"
    assert identities["?"]["logo_asset_kind"] == "generated_monogram_fallback"

    for identity in identities.values():
        assert identity["organization_display_name"]
        assert identity["logo_visualization_data_url"].startswith("data:image/svg+xml")

    expected_variant_keys = {
        "effective__effective",
        "effective__raw",
        "blended__effective",
        "blended__raw",
    }
    assert set(dataset["metric_variants"]) == expected_variant_keys
    for variant in dataset["metric_variants"].values():
        scene = variant["three_dimensional_scene"]
        relationships = variant["interaction_relationships"]
        assert scene["displayed_model_markers"]
        assert scene["three_dimensional_axis_configuration"]["x_axis"]["scale_type"] == (
            "log"
        )
        assert "pareto_frontier_wireframe_line_segments" in scene
        assert "pareto_frontier_surface_triangle_mesh" in scene
        assert "achievable_frontier_surface_triangle_mesh" in scene
        assert "base_groups" in relationships
        assert "lineages" in relationships
        for displayed_model_marker in scene["displayed_model_markers"]:
            assert "standout_metrics" in displayed_model_marker
            assert "normalized_improvement_coordinates" in displayed_model_marker
            assert "standout" not in displayed_model_marker
            assert "g" not in displayed_model_marker
        assert "data" not in variant
        assert "layout" not in variant
        assert "payload" not in variant
        assert all(
            displayed_model_marker["creator"] in identities
            for displayed_model_marker in scene["displayed_model_markers"]
        )

    static_export_figure = _figure_from_dataset_variant(
        dataset, dataset["initial_variant_key"]
    )
    assert len(static_export_figure.data) > 0

    print("✅ Frontier 3D three.js 公共数据契约验证通过")

    if len(sys.argv) > 1:
        verify_frontier_3d_visualization_dataset_embedded_in_rendered_html(Path(sys.argv[1]))


if __name__ == "__main__":
    main()
