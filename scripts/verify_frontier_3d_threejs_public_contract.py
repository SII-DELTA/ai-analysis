"""Frontier 3D three.js 公共数据契约与厂商身份行为验证。"""
from __future__ import annotations

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

    static_export_figure = _figure_from_dataset_variant(
        dataset, dataset["initial_variant_key"]
    )
    assert len(static_export_figure.data) > 0

    print("✅ Frontier 3D three.js 公共数据契约验证通过")


if __name__ == "__main__":
    main()
