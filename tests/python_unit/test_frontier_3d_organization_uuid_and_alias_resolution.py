"""厂商 UUID 优先，名称别名兼容，未注册的显示厂商发出构建告警。"""
from src.frontier_3d_organization_identity_metadata_registry import organization_identity_metadata_for_creator_name


def test_registered_uuid_survives_display_name_change_and_ifm_alias_is_known():
    original = organization_identity_metadata_for_creator_name("OpenAI")
    creator_uuid = original["creator_uuid_aliases"][0]
    renamed = organization_identity_metadata_for_creator_name("更名后的 OpenAI", creator_uuid=creator_uuid)
    assert renamed["country_region_category"] == original["country_region_category"]
    assert renamed["organization_identity_key"] == creator_uuid
    assert renamed["registration_status"] == "registered_uuid"
    alias = organization_identity_metadata_for_creator_name("Institute of Foundation Models")
    assert alias["country_region_category"] == "other"
    assert alias["logo_asset_kind"] == "curated_svg"


def test_build_warns_only_about_unregistered_creators_in_display_union(capsys):
    from src.frontier_3d_visualization_dataset_builder import build_frontier_3d_visualization_dataset
    from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe
    models = build_frontier_3d_synthetic_fixture_models_dataframe()
    models.loc[models.index[0], "creator"] = "正在显示的未注册厂商"
    models.loc[models["name"] == "Speedless Genius (Max Effort)", "creator"] = "仅被排除的未注册厂商"
    build_frontier_3d_visualization_dataset(models, since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log")
    warning = capsys.readouterr().err
    assert "正在显示的未注册厂商" in warning
    assert "仅被排除的未注册厂商" not in warning
