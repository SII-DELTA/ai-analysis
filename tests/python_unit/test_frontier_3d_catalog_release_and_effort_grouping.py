"""目录 release/effort 优先于名称后缀；跨代仍只采用显式家族映射。"""
from src import visualize
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe


def test_release_groups_ignore_misleading_suffixes_and_follow_catalog_effort():
    models = build_frontier_3d_synthetic_fixture_models_dataframe().iloc[:3].copy()
    models["name"] = ["Catalog Model (high)", "Catalog Model Alternate", "Catalog Model (low)"]
    models["artificial_analysis_release_slug"] = ["catalog-release-1"] * 3
    models["artificial_analysis_reasoning_effort_slug"] = ["low", "medium", "high"]
    models["artificial_analysis_is_reasoning_model"] = True
    models["kept"] = True
    models["layer"] = 1
    payload = visualize._build_lineage_payload(models, "cost_to_run", "成本", "USD", "eff_speed", "速度")
    assert len(payload["base_groups"]) == 1
    assert [model["reasoning_level_label"] for model in payload["models"]] == ["low", "medium", "high"]
    assert list(payload["reasoning_variant_group_model_indices_by_base_model_name"].values()) == [[0, 1, 2]]
    assert not payload["lineages"]


def test_identical_display_names_with_different_release_slugs_never_share_a_group():
    models = build_frontier_3d_synthetic_fixture_models_dataframe().iloc[:2].copy()
    models["name"] = "Catalog Model"
    models["artificial_analysis_release_slug"] = ["release-a", "release-b"]
    models["artificial_analysis_reasoning_effort_slug"] = "low"
    models["artificial_analysis_is_reasoning_model"] = True
    models["kept"] = True
    models["layer"] = 1
    payload = visualize._build_lineage_payload(models, "cost_to_run", "成本", "USD", "eff_speed", "速度")
    assert len(payload["base_groups"]) == 2
