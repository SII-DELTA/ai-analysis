"""最小化抓取的请求预算、失败保全与持久事件回归。"""

from datetime import datetime, timedelta, timezone
from pathlib import Path
import json

import pytest

from src.artificial_analysis_minimal_model_catalog_refresh import (
    NUMERIC_CATALOG_RESPONSE_FILENAME,
    prepare_minimal_model_catalog_refresh,
    load_numeric_model_catalog_response,
    seed_verified_numeric_catalog_from_legacy_load_result,
    BoundedWebsiteCatalogPageClient,
)
from src.artificial_analysis_catalog_refresh_health import CatalogRefreshHealthStore
from tests.fixtures.build_synthetic_artificial_analysis_model_detail_page_html import (
    build_synthetic_artificial_analysis_embedded_model_object,
    build_synthetic_artificial_analysis_model_detail_page_html,
    synthetic_artificial_analysis_model_uuid,
)


NOW = datetime(2026, 10, 21, tzinfo=timezone.utc)


def synthetic_catalog_and_api_rows(count=60, *, token_scale=1):
    objects = [
        build_synthetic_artificial_analysis_embedded_model_object(
            model_id=synthetic_artificial_analysis_model_uuid(i),
            slug=f"model-{i}",
            name=f"模型 {i}",
            intelligence_index=50 + i / 100,
            canonical_output_token_count=(1000 + i) * token_scale,
        )
        for i in range(count)
    ]
    rows = [
        {
            "id": o["id"],
            "slug": o["slug"],
            "name": o["name"],
            "release_date": f"2026-10-{1+i%20:02d}",
            "model_creator": {"id": str(i % 3)},
            "evaluations": {
                "artificial_analysis_intelligence_index": o["intelligenceIndex"]
            },
        }
        for i, o in enumerate(objects)
    ]
    html = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=objects, intelligence_index_version_strings=("4.3.2",)
    )
    return html, rows


def health_store(tmp_path):
    return CatalogRefreshHealthStore(
        Path.cwd(),
        state_directory=tmp_path / "health",
        artifact_directory=tmp_path / "evidence",
        dispatch_tasks=False,
    )


def test_two_pages_stage_numeric_only_then_promote_after_caller_guardrails(tmp_path):
    html, rows = synthetic_catalog_and_api_rows()
    urls = []
    result = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        health_store(tmp_path),
        now=NOW,
        fetch_page=lambda url: urls.append(url) or html,
        sleep=lambda _: None,
    )
    assert result.status == "pending_final_data_quality_guardrails"
    assert len(urls) == 2 and len(set(urls)) == 2
    assert not list(tmp_path.rglob("*.html"))
    assert not result.storage.active_response_path.exists()
    result.accept_after_final_guardrails()
    assert (
        len(
            load_numeric_model_catalog_response(
                result.storage.active_response_path, rows, "4.3"
            ).records_by_model_id
        )
        == 60
    )


def test_uuid_conflict_rejects_batch_preserves_active_and_creates_one_episode(tmp_path):
    html, rows = synthetic_catalog_and_api_rows()
    conflicting, _ = synthetic_catalog_and_api_rows(token_scale=2)
    store = health_store(tmp_path)
    good = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        store,
        now=NOW,
        fetch_page=lambda _: html,
        sleep=lambda _: None,
    )
    good.accept_after_final_guardrails()
    original = good.storage.active_response_path.read_bytes()
    responses = iter([html, conflicting])
    failed = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        store,
        now=NOW + timedelta(days=1),
        fetch_page=lambda _: next(responses),
        sleep=lambda _: None,
    )
    assert failed.status == "failed_reusing_previous_verified_catalog"
    incident = store.read_state()["unresolved_incident"]
    assert good.storage.active_response_path.read_bytes() == original
    again = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        store,
        now=NOW + timedelta(days=2),
        fetch_page=lambda _: "<html>结构变了</html>",
        sleep=lambda _: None,
    )
    assert (
        store.read_state()["unresolved_incident"]["incident_id"]
        == incident["incident_id"]
    )
    assert again.status == "failed_reusing_previous_verified_catalog"


def test_cooldown_survives_restart_and_success_resolves_only_after_final_guards(
    tmp_path,
):
    html, rows = synthetic_catalog_and_api_rows()
    store = health_store(tmp_path)
    prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        store,
        now=NOW,
        fetch_page=lambda _: "<html>结构变了</html>",
        sleep=lambda _: None,
    )
    incident_id = store.read_state()["unresolved_incident"]["incident_id"]
    restarted = health_store(tmp_path)

    def forbidden(_):
        pytest.fail("冷却期不应发出请求")

    result = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        restarted,
        now=NOW + timedelta(hours=1),
        fetch_page=forbidden,
        sleep=lambda _: None,
    )
    assert result.status == "skipped_refresh_cooldown"
    good = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        restarted,
        now=NOW + timedelta(days=1),
        fetch_page=lambda _: html,
        sleep=lambda _: None,
    )
    assert restarted.read_state()["unresolved_incident"]["incident_id"] == incident_id
    good.accept_after_final_guardrails()
    assert restarted.read_state()["unresolved_incident"] is None


def test_final_guardrail_rejection_never_promotes_or_resolves(tmp_path):
    html, rows = synthetic_catalog_and_api_rows()
    store = health_store(tmp_path)
    store.record_failure("structure_change", {"reason": "旧故障"}, NOW)
    result = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        store,
        now=NOW,
        fetch_page=lambda _: html,
        sleep=lambda _: None,
    )
    result.reject_after_final_guardrails()
    assert not result.storage.active_response_path.exists()
    assert store.read_state()["unresolved_incident"] is not None


def test_below_99_percent_intelligence_agreement_does_not_reject_catalog(tmp_path):
    html, rows = synthetic_catalog_and_api_rows()
    for row in rows:
        row["evaluations"]["artificial_analysis_intelligence_index"] += 10
    result = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        health_store(tmp_path),
        now=NOW,
        fetch_page=lambda _: html,
        sleep=lambda _: None,
    )
    assert result.status == "pending_final_data_quality_guardrails"
    assert result.catalog_load_result.catalog_vs_api_intelligence_agreement_rate == 0


def test_blocked_stops_immediately_and_server_retry_after_extends_cooldown(
    tmp_path, monkeypatch
):
    _, rows = synthetic_catalog_and_api_rows()
    import requests

    calls = []

    class Response:
        status_code = 429
        headers = {"Retry-After": "604800"}

        def close(self):
            pass

    def get(url, **kwargs):
        calls.append(kwargs)
        return Response()

    monkeypatch.setattr(requests, "get", get)
    client = BoundedWebsiteCatalogPageClient(sleep=lambda _: None)
    store = health_store(tmp_path)
    result = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        store,
        now=NOW,
        fetch_page=client,
        sleep=lambda _: None,
    )
    assert len(calls) == 1
    assert calls[0]["allow_redirects"] is False
    assert "x-api-key" not in calls[0]["headers"]
    assert (
        store.read_state()["next_website_catalog_refresh_allowed_at_utc"] > "2026-10-22"
    )
    assert store.read_state()["unresolved_incident"]["failure_kind"] == "blocked"
    assert result.status == "failed_reusing_previous_verified_catalog"


def test_concurrent_refresh_skips_without_requests(tmp_path):
    _, rows = synthetic_catalog_and_api_rows()
    store = health_store(tmp_path)
    with store.locked_state():
        result = prepare_minimal_model_catalog_refresh(
            rows,
            "4.3",
            tmp_path / "raw",
            store,
            now=NOW,
            fetch_page=lambda _: pytest.fail("并发刷新不得请求"),
            sleep=lambda _: None,
        )
    assert result.status == "skipped_concurrent_refresh"


def test_same_second_pending_and_history_names_are_unique(tmp_path):
    from src.artificial_analysis_guardrail_validated_json_response_storage import (
        GuardrailValidatedJsonResponseStorage,
    )

    stores = [
        GuardrailValidatedJsonResponseStorage(
            tmp_path / "active.json", tmp_path / "history"
        )
        for _ in range(2)
    ]
    for i, store in enumerate(stores):
        store.stage(
            {"fetched_at_utc": "2026-10-21T00:00:00Z", "number": i},
            response_name_prefix="synthetic_catalog",
        )
    assert stores[0].pending_response_path != stores[1].pending_response_path
    stores[1].reject()
    stores[0].promote()
    assert json.loads((tmp_path / "active.json").read_text())["number"] == 0


@pytest.fixture
def staged_json_response_storage_with_previous_verified_active(tmp_path):
    from src.artificial_analysis_guardrail_validated_json_response_storage import (
        GuardrailValidatedJsonResponseStorage,
        write_json_file_atomically,
    )

    storage = GuardrailValidatedJsonResponseStorage(
        tmp_path / "active.json", tmp_path / "history"
    )
    write_json_file_atomically(
        storage.active_response_path,
        {"fetched_at_utc": "2026-10-20T00:00:00Z", "number": 0},
    )
    storage.stage(
        {"fetched_at_utc": "2026-10-21T00:00:00Z", "number": 1},
        response_name_prefix="synthetic_catalog",
    )
    write_json_file_atomically(
        storage.history_directory / "existing_unrelated_accepted_response.json",
        {"fetched_at_utc": "2026-10-19T00:00:00Z", "number": 2},
    )
    return storage


def test_history_finalization_failure_preserves_active_and_pending_then_allows_retry(
    staged_json_response_storage_with_previous_verified_active, monkeypatch
):
    from src import artificial_analysis_guardrail_validated_json_response_storage as response_storage

    storage = staged_json_response_storage_with_previous_verified_active
    original_active = storage.active_response_path.read_bytes()
    pending_response = storage.pending_response_path
    pending_history = storage.pending_history_path

    def fail_history_finalization(*_):
        raise OSError("模拟历史确认失败")

    with monkeypatch.context() as failure_injection:
        failure_injection.setattr(
            response_storage,
            "finalize_guardrail_validated_response_history",
            fail_history_finalization,
        )
        with pytest.raises(OSError, match="模拟历史确认失败"):
            storage.promote()
    assert storage.active_response_path.read_bytes() == original_active
    assert storage.pending_response_path == pending_response
    assert storage.pending_history_path == pending_history
    assert pending_response.read_bytes() == pending_history.read_bytes()

    storage.promote()
    assert json.loads(storage.active_response_path.read_text())["number"] == 1
    assert not pending_response.exists()
    assert not pending_history.exists()


def test_active_replacement_failure_retains_accepted_history_and_allows_retry(
    staged_json_response_storage_with_previous_verified_active, monkeypatch
):
    from src import artificial_analysis_guardrail_validated_json_response_storage as response_storage

    storage = staged_json_response_storage_with_previous_verified_active
    original_active = storage.active_response_path.read_bytes()
    pending_response = storage.pending_response_path
    unrelated_history = storage.history_directory / "existing_unrelated_accepted_response.json"
    unrelated_history_content = unrelated_history.read_bytes()
    accepted_history = storage.pending_history_path.with_name(
        storage.pending_history_path.name.replace(
            "_pending_data_quality_guardrail_validation.json", ".json"
        )
    )
    original_replace = response_storage.os.replace

    def fail_active_replacement(source, target):
        if target == storage.active_response_path:
            raise OSError("模拟 active 替换失败")
        return original_replace(source, target)

    with monkeypatch.context() as failure_injection:
        failure_injection.setattr(response_storage.os, "replace", fail_active_replacement)
        with pytest.raises(OSError, match="模拟 active 替换失败"):
            storage.promote()
    assert storage.active_response_path.read_bytes() == original_active
    assert pending_response.read_bytes() == accepted_history.read_bytes()
    assert storage.pending_response_path == pending_response
    assert unrelated_history.read_bytes() == unrelated_history_content
    history_after_failed_promotion = {
        path.name: path.read_bytes() for path in storage.history_directory.glob("*.json")
    }

    storage.promote()
    assert storage.active_response_path.read_bytes() == accepted_history.read_bytes()
    assert storage.pending_response_path is None
    assert storage.pending_history_path is None
    assert {
        path.name: path.read_bytes() for path in storage.history_directory.glob("*.json")
    } == history_after_failed_promotion


@pytest.mark.parametrize("interrupt_after_active_replacement", [False, True])
def test_process_interruption_during_active_replacement_keeps_accepted_history(
    staged_json_response_storage_with_previous_verified_active,
    interrupt_after_active_replacement,
):
    import subprocess
    import sys

    storage = staged_json_response_storage_with_previous_verified_active
    original_active = storage.active_response_path.read_bytes()
    pending_response = storage.pending_response_path
    pending_history = storage.pending_history_path
    accepted_history = pending_history.with_name(
        pending_history.name.replace(
            "_pending_data_quality_guardrail_validation.json", ".json"
        )
    )
    interrupted_process = subprocess.run(
        [
            sys.executable,
            "-c",
            """
import os
from pathlib import Path
import sys
from src.artificial_analysis_guardrail_validated_json_response_storage import GuardrailValidatedJsonResponseStorage

storage = GuardrailValidatedJsonResponseStorage(
    Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3]), Path(sys.argv[4])
)
original_replace = os.replace
def interrupt_during_active_replacement(source, target):
    if target == storage.active_response_path:
        if sys.argv[5] == "after":
            original_replace(source, target)
        os._exit(23)
    return original_replace(source, target)
os.replace = interrupt_during_active_replacement
storage.promote()
""",
            str(storage.active_response_path),
            str(storage.history_directory),
            str(pending_response),
            str(pending_history),
            "after" if interrupt_after_active_replacement else "before",
        ],
        cwd=Path(__file__).resolve().parents[2],
        capture_output=True,
        text=True,
        timeout=10,
    )
    assert interrupted_process.returncode == 23, interrupted_process.stderr
    assert not pending_history.exists()
    if interrupt_after_active_replacement:
        assert storage.active_response_path.read_bytes() == accepted_history.read_bytes()
        assert not pending_response.exists()
        return
    assert storage.active_response_path.read_bytes() == original_active
    assert accepted_history.read_bytes() == pending_response.read_bytes()

    # 重启后的对象可继续晋升，accepted history 已在中断前完成。
    recovered_storage = type(storage)(
        storage.active_response_path,
        storage.history_directory,
        pending_response_path=pending_response,
    )
    recovered_storage.promote()
    assert storage.active_response_path.read_bytes() == accepted_history.read_bytes()


def test_slow_old_candidate_cannot_clear_newer_incident(tmp_path):
    html, rows = synthetic_catalog_and_api_rows()
    store = health_store(tmp_path)
    old = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        store,
        now=NOW,
        fetch_page=lambda _: html,
        sleep=lambda _: None,
    )
    prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        store,
        now=NOW + timedelta(days=1),
        fetch_page=lambda _: "<html>结构变了</html>",
        sleep=lambda _: None,
    )
    incident = store.read_state()["unresolved_incident"]["incident_id"]
    old.accept_after_final_guardrails()
    assert old.status == "superseded_by_newer_refresh_attempt"
    assert not old.storage.active_response_path.exists()
    assert store.read_state()["unresolved_incident"]["incident_id"] == incident


@pytest.mark.parametrize(
    "malformed_name", [{"unexpected_nested_name": True}, ["unexpected-name-list"]]
)
def test_invalid_legacy_catalog_migration_keeps_html_usable_without_numeric_active(
    tmp_path, malformed_name
):
    from src import fetch_data

    _, api_rows = synthetic_catalog_and_api_rows()
    objects = [
        build_synthetic_artificial_analysis_embedded_model_object(
            model_id=row["id"],
            slug=row["slug"],
            name=row["name"],
            intelligence_index=row["evaluations"][
                "artificial_analysis_intelligence_index"
            ],
            canonical_output_token_count=1000 + index,
        )
        for index, row in enumerate(api_rows)
    ]
    objects[0]["name"] = malformed_name
    legacy_catalog_directory = tmp_path / "legacy-model-detail-page-cache"
    legacy_catalog_directory.mkdir()
    legacy_page_path = legacy_catalog_directory / "synthetic-legacy-catalog.html"
    legacy_page_path.write_text(
        build_synthetic_artificial_analysis_model_detail_page_html(
            embedded_model_objects=objects,
            intelligence_index_version_strings=("4.3.2",),
        )
    )
    original_legacy_page_bytes = legacy_page_path.read_bytes()
    api_intelligence_by_model_id = {
        row["id"]: row["evaluations"]["artificial_analysis_intelligence_index"]
        for row in api_rows
    }
    legacy_catalog = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            legacy_catalog_directory, api_intelligence_by_model_id, "4.3"
        )
    )
    assert len(legacy_catalog.records_by_model_id) == 60
    assert legacy_catalog.records_by_model_id[api_rows[0]["id"]].name == malformed_name

    numeric_catalog_directory = tmp_path / "numeric-catalog-cache"
    seed_verified_numeric_catalog_from_legacy_load_result(
        numeric_catalog_directory, legacy_catalog
    )

    assert not (numeric_catalog_directory / NUMERIC_CATALOG_RESPONSE_FILENAME).exists()
    assert not list(numeric_catalog_directory.rglob("*.json"))
    assert legacy_page_path.read_bytes() == original_legacy_page_bytes
    reloaded_legacy_catalog = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            legacy_catalog_directory, api_intelligence_by_model_id, "4.3"
        )
    )
    assert reloaded_legacy_catalog.records_by_model_id == legacy_catalog.records_by_model_id


def test_invalid_slug_in_legacy_load_result_is_rejected_before_numeric_storage(tmp_path):
    from dataclasses import replace
    from src import fetch_data

    page_html, api_rows = synthetic_catalog_and_api_rows()
    records = fetch_data.parse_artificial_analysis_embedded_model_catalog_records_from_model_detail_page_html(
        page_html
    )
    model_id = api_rows[0]["id"]
    records[model_id] = replace(records[model_id], slug={"unexpected_nested_slug": True})
    legacy_catalog = replace(
        fetch_data._empty_embedded_model_catalog_load_result(tmp_path),
        records_by_model_id=records,
        accepted_partition_intelligence_index_version="4.3.2",
        accepted_partition_captured_at_utc="2026-10-21T00:00:00Z",
    )

    seed_verified_numeric_catalog_from_legacy_load_result(tmp_path, legacy_catalog)

    assert not (tmp_path / NUMERIC_CATALOG_RESPONSE_FILENAME).exists()
    assert not list(tmp_path.rglob("*.json"))
    assert records[model_id].canonical_output_token_count > 0


def test_schema_valid_legacy_catalog_migration_still_creates_loadable_numeric_active(
    tmp_path,
):
    from src import fetch_data

    page_html, api_rows = synthetic_catalog_and_api_rows()
    legacy_catalog_directory = tmp_path / "legacy-model-detail-page-cache"
    legacy_catalog_directory.mkdir()
    legacy_page_path = legacy_catalog_directory / "synthetic-legacy-catalog.html"
    legacy_page_path.write_text(page_html)
    original_legacy_page_bytes = legacy_page_path.read_bytes()
    legacy_catalog = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            legacy_catalog_directory,
            {
                row["id"]: row["evaluations"]["artificial_analysis_intelligence_index"]
                for row in api_rows
            },
            "4.3",
        )
    )
    numeric_catalog_directory = tmp_path / "numeric-catalog-cache"

    seed_verified_numeric_catalog_from_legacy_load_result(
        numeric_catalog_directory, legacy_catalog
    )

    numeric_catalog = load_numeric_model_catalog_response(
        numeric_catalog_directory / NUMERIC_CATALOG_RESPONSE_FILENAME,
        api_rows,
        "4.3",
    )
    assert numeric_catalog.records_by_model_id == legacy_catalog.records_by_model_id
    assert legacy_page_path.read_bytes() == original_legacy_page_bytes


def test_http_retry_and_page_replacement_share_six_attempt_budget(
    tmp_path, monkeypatch
):
    import requests

    _, rows = synthetic_catalog_and_api_rows()
    calls = []

    class Response:
        status_code = 503
        headers = {}

        def iter_content(self, chunk_size):
            yield b"<html>temporarily unavailable</html>"

        def close(self):
            pass

    monkeypatch.setattr(
        requests, "get", lambda url, **kwargs: calls.append(url) or Response()
    )
    client = BoundedWebsiteCatalogPageClient(sleep=lambda _: None)
    result = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        health_store(tmp_path),
        now=NOW,
        fetch_page=client,
        sleep=lambda _: None,
    )
    assert len(calls) == 6 and len(set(calls)) == 3
    assert result.status == "failed_reusing_previous_verified_catalog"


def test_tls_curl_fallback_preserves_certificate_checks_and_counts_attempt(monkeypatch):
    import requests
    import subprocess

    html, _ = synthetic_catalog_and_api_rows()

    def ssl_failure(*args, **kwargs):
        raise requests.exceptions.SSLError("合成 TLS 错误")

    monkeypatch.setattr(requests, "get", ssl_failure)
    commands = []

    def curl(command, **kwargs):
        commands.append(command)
        return subprocess.CompletedProcess(
            command, 0, stdout=("HTTP/1.1 200 OK\r\n\r\n" + html + "\n200").encode(), stderr=b""
        )

    monkeypatch.setattr(subprocess, "run", curl)
    client = BoundedWebsiteCatalogPageClient(sleep=lambda _: None)
    assert client("https://artificialanalysis.ai/models/synthetic") == html
    assert client.http_attempt_count == 2
    assert (
        len(commands) == 1
        and "--insecure" not in commands[0]
        and "-k" not in commands[0]
    )


def test_positive_token_coverage_collapse_rejects_even_above_absolute_floor(tmp_path):
    html, rows = synthetic_catalog_and_api_rows(count=120)
    store = health_store(tmp_path)
    previous = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        store,
        now=NOW,
        fetch_page=lambda _: html,
        sleep=lambda _: None,
    )
    previous.accept_after_final_guardrails()
    original = previous.storage.active_response_path.read_bytes()
    smaller, _ = synthetic_catalog_and_api_rows(count=60)
    result = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        store,
        now=NOW + timedelta(days=1),
        fetch_page=lambda _: smaller,
        sleep=lambda _: None,
    )
    assert result.status == "failed_reusing_previous_verified_catalog"
    assert previous.storage.active_response_path.read_bytes() == original


def test_changed_field_type_is_recorded_as_structure_incident_before_storage(tmp_path):
    _, rows = synthetic_catalog_and_api_rows()
    objects = [
        build_synthetic_artificial_analysis_embedded_model_object(
            model_id=row["id"],
            slug=row["slug"],
            name=row["name"],
            intelligence_index=row["evaluations"][
                "artificial_analysis_intelligence_index"
            ],
            canonical_output_token_count=1000 + i,
        )
        for i, row in enumerate(rows)
    ]
    objects[0]["name"] = {"unexpected_nested_field": True}
    html = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=objects
    )
    store = health_store(tmp_path)
    result = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "raw",
        store,
        now=NOW,
        fetch_page=lambda _: html,
        sleep=lambda _: None,
    )
    assert result.status == "failed_reusing_previous_verified_catalog"
    assert (
        store.read_state()["unresolved_incident"]["failure_kind"] == "structure_change"
    )
    assert not result.storage.active_response_path.exists()

    evidence = json.loads(
        Path(
            store.read_state()["unresolved_incident"]["latest_evidence_path"]
        ).read_text()
    )
    schema = evidence["last_received_page_structure_without_values"][
        "model_field_names_and_types"
    ]
    assert "dict" in schema["name"]["types"]
    assert "self.__next_f.push" not in json.dumps(evidence)


def test_other_worktree_reuses_published_verified_catalog_without_requests_or_resolving_incident(
    tmp_path,
):
    from src.artificial_analysis_minimal_model_catalog_refresh import (
        WebsiteCatalogRefreshFailure,
    )

    html, rows = synthetic_catalog_and_api_rows()
    store = health_store(tmp_path)
    first = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "producer-cache",
        store,
        now=NOW,
        fetch_page=lambda _: html,
        sleep=lambda _: None,
    )
    first.accept_after_final_guardrails()

    def forbidden(_):
        pytest.fail("另一工作树应复用已验证目录，不能重复请求")

    consumer = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "consumer-cache",
        store,
        now=NOW + timedelta(hours=1),
        fetch_page=forbidden,
        sleep=lambda _: None,
    )
    assert consumer.catalog_load_result is not None
    consumer.accept_after_final_guardrails()
    assert consumer.status == "reused_project_verified_catalog_without_page_requests"

    def blocked(_):
        raise WebsiteCatalogRefreshFailure("blocked", "synthetic_http_403")

    prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "producer-cache",
        store,
        now=NOW + timedelta(days=1),
        fetch_page=blocked,
        sleep=lambda _: None,
    )
    incident = store.read_state()["unresolved_incident"]["incident_id"]
    late_consumer = prepare_minimal_model_catalog_refresh(
        rows,
        "4.3",
        tmp_path / "another-consumer-cache",
        store,
        now=NOW + timedelta(days=1, hours=1),
        fetch_page=forbidden,
        sleep=lambda _: None,
    )
    late_consumer.accept_after_final_guardrails()
    assert (
        late_consumer.status == "reused_project_verified_catalog_without_page_requests"
    )
    assert store.read_state()["unresolved_incident"]["incident_id"] == incident
