"""冷却期结束后跨工作树复用项目目录，保留覆盖基线与逐 UUID 当期判定。"""

from datetime import datetime, timedelta, timezone
from hashlib import sha256
import json
from pathlib import Path

import pytest

from src import fetch_data
from src.artificial_analysis_catalog_refresh_health import CatalogRefreshHealthStore
from src.artificial_analysis_minimal_model_catalog_refresh import (
    WebsiteCatalogRefreshFailure,
    prepare_minimal_model_catalog_refresh,
)
from tests.fixtures.build_synthetic_artificial_analysis_model_detail_page_html import (
    build_synthetic_artificial_analysis_embedded_model_object,
    build_synthetic_artificial_analysis_model_detail_page_html,
    synthetic_artificial_analysis_model_uuid,
)


CATALOG_PUBLISHED_AT = datetime(2026, 10, 21, tzinfo=timezone.utc)
PROJECT_VERIFIED_CATALOG_MODEL_COUNT = 520


def synthetic_page_and_api_rows(model_count=PROJECT_VERIFIED_CATALOG_MODEL_COUNT):
    objects = [
        build_synthetic_artificial_analysis_embedded_model_object(
            model_id=synthetic_artificial_analysis_model_uuid(index),
            slug=f"model-{index}",
            name=f"模型 {index}",
            intelligence_index=50 + index / 100,
            canonical_output_token_count=1000 + index,
        )
        for index in range(model_count)
    ]
    rows = [
        {
            "id": model["id"],
            "slug": model["slug"],
            "evaluations": {
                "artificial_analysis_intelligence_index": model["intelligenceIndex"]
            },
        }
        for model in objects
    ]
    return (
        build_synthetic_artificial_analysis_model_detail_page_html(
            embedded_model_objects=objects,
            intelligence_index_version_strings=("4.3.2",),
        ),
        rows,
    )


def isolated_health_store(test_directory):
    return CatalogRefreshHealthStore(
        Path.cwd(),
        state_directory=test_directory / "project-refresh-health-state",
        artifact_directory=test_directory / "project-refresh-incident-evidence",
        dispatch_tasks=False,
    )


@pytest.fixture
def published_project_catalog_with_unresolved_incident(tmp_path):
    page_html, api_rows = synthetic_page_and_api_rows()
    health = isolated_health_store(tmp_path)
    prepared = prepare_minimal_model_catalog_refresh(
        api_rows,
        "4.3",
        tmp_path / "producer-verified-catalog-cache",
        health,
        now=CATALOG_PUBLISHED_AT,
        fetch_page=lambda _: page_html,
        sleep=lambda _: None,
    )
    prepared.accept_after_final_guardrails()
    health.record_failure("blocked", {"reason": "合成旧事件"}, CATALOG_PUBLISHED_AT)
    return api_rows, health.read_state()


def blocked_page(_):
    raise WebsiteCatalogRefreshFailure("blocked", "synthetic_http_403")


def test_expired_cooldown_new_worktree_keeps_project_catalog_and_per_uuid_currency(
    tmp_path, published_project_catalog_with_unresolved_incident
):
    api_rows, original_state = published_project_catalog_with_unresolved_incident
    for row in api_rows[:20]:
        row["evaluations"]["artificial_analysis_intelligence_index"] += 1

    restarted_health = isolated_health_store(tmp_path)
    prepared = prepare_minimal_model_catalog_refresh(
        api_rows,
        "4.3",
        tmp_path / "new-worktree-empty-catalog-cache",
        restarted_health,
        now=CATALOG_PUBLISHED_AT + timedelta(days=1),
        fetch_page=blocked_page,
        sleep=lambda _: None,
    )

    assert prepared.status == "failed_reusing_previous_verified_catalog"
    assert prepared.catalog_load_result is not None
    assert len(prepared.catalog_load_result.records_by_model_id) == 520
    assert prepared.catalog_load_result.catalog_vs_api_intelligence_agreement_rate < 0.99
    models = fetch_data._assemble_models_dataframe_with_value_provenance(
        api_rows,
        {},
        prepared.catalog_load_result,
        fetch_data.CostToRunAndOutputTokenCountFallbackValues({}, {}),
        "4.3",
    )
    assert models["intelligence_index_canonical_output_token_count"].gt(0).sum() == 520
    assert models[
        "output_token_count_value_is_from_current_intelligence_index_version"
    ].sum() == 500
    prepared.accept_after_final_guardrails()
    state = restarted_health.read_state()
    assert state["unresolved_incident"]["incident_id"] == original_state[
        "unresolved_incident"
    ]["incident_id"]
    assert state["last_verified_catalog_response_sha256"] == original_state[
        "last_verified_catalog_response_sha256"
    ]


@pytest.mark.parametrize("new_positive_token_count", [260, 363, 364])
def test_expired_cooldown_uses_project_coverage_baseline_and_only_new_promotion_resolves(
    tmp_path,
    published_project_catalog_with_unresolved_incident,
    new_positive_token_count,
):
    api_rows, original_state = published_project_catalog_with_unresolved_incident
    smaller_page, _ = synthetic_page_and_api_rows(new_positive_token_count)
    restarted_health = isolated_health_store(tmp_path)
    prepared = prepare_minimal_model_catalog_refresh(
        api_rows,
        "4.3",
        tmp_path / "new-worktree-empty-catalog-cache",
        restarted_health,
        now=CATALOG_PUBLISHED_AT + timedelta(days=1),
        fetch_page=lambda _: smaller_page,
        sleep=lambda _: None,
    )
    assert restarted_health.read_state()["unresolved_incident"]["incident_id"] == (
        original_state["unresolved_incident"]["incident_id"]
    )
    assert restarted_health.read_state()["last_verified_catalog_response_sha256"] == (
        original_state["last_verified_catalog_response_sha256"]
    )
    if new_positive_token_count < 364:
        assert prepared.status == "failed_reusing_previous_verified_catalog"
        assert len(prepared.catalog_load_result.records_by_model_id) == 520
        assert not prepared.storage.active_response_path.exists()
        evidence = json.loads(
            Path(
                restarted_health.read_state()["unresolved_incident"][
                    "latest_evidence_path"
                ]
            ).read_text()
        )
        assert evidence["failure_reason_code"] == "catalog_positive_token_coverage_collapsed"
        assert evidence["previous_positive_token_count"] == 520
        prepared.accept_after_final_guardrails()
        assert restarted_health.read_state()["unresolved_incident"] is not None
    else:
        assert prepared.status == "pending_final_data_quality_guardrails"
        assert len(prepared.catalog_load_result.records_by_model_id) == 364
        prepared.accept_after_final_guardrails()
        assert prepared.status == "refreshed_and_verified"
        assert restarted_health.read_state()["unresolved_incident"] is None
        assert restarted_health.read_state()["last_verified_catalog_response_sha256"] != (
            original_state["last_verified_catalog_response_sha256"]
        )


@pytest.mark.parametrize("invalid_project_copy_kind", ["sha256", "schema", "api_family"])
def test_expired_cooldown_does_not_reuse_incompatible_project_catalog(
    tmp_path,
    published_project_catalog_with_unresolved_incident,
    invalid_project_copy_kind,
):
    api_rows, state = published_project_catalog_with_unresolved_incident
    health = isolated_health_store(tmp_path)
    project_copy = Path(state["last_verified_catalog_response_path"])
    if invalid_project_copy_kind == "sha256":
        project_copy.write_text(project_copy.read_text() + "\n")
    elif invalid_project_copy_kind == "schema":
        payload = json.loads(project_copy.read_text())
        payload["schema_version"] = "unsupported"
        project_copy.write_text(json.dumps(payload))
        state["last_verified_catalog_response_sha256"] = sha256(
            project_copy.read_bytes()
        ).hexdigest()
        health.save_state(state)

    prepared = prepare_minimal_model_catalog_refresh(
        api_rows,
        "5.0" if invalid_project_copy_kind == "api_family" else "4.3",
        tmp_path / "new-worktree-empty-catalog-cache",
        health,
        now=CATALOG_PUBLISHED_AT + timedelta(days=1),
        fetch_page=blocked_page,
        sleep=lambda _: None,
    )
    assert prepared.status == "failed_reusing_previous_verified_catalog"
    assert prepared.catalog_load_result is None
    prepared.accept_after_final_guardrails()
    assert health.read_state()["unresolved_incident"] is not None
