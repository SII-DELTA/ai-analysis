"""连续故障只派发一次，成功恢复才解除开发页告警。"""

from datetime import timedelta
import subprocess

from src.frontier_3d_development_catalog_refresh_incident_banner import (
    add_unresolved_catalog_refresh_development_banner,
)
from tests.python_unit.test_artificial_analysis_minimal_catalog_refresh import (
    NOW,
    health_store,
)


def test_dispatch_create_once_start_retry_same_task_and_next_episode_is_distinct(
    tmp_path, monkeypatch
):
    store = health_store(tmp_path)
    calls = []
    monkeypatch.setattr(store, "_kanban_command", lambda: ["fake-kanban"])

    def run(command, arguments):
        calls.append(arguments)
        if arguments[:2] == ["task", "create"]:
            return {"task": {"id": "diagnostic-1"}}
        if len([a for a in calls if a[:2] == ["task", "start"]]) == 1:
            raise subprocess.TimeoutExpired("start", 30)
        return {"ok": True}

    monkeypatch.setattr(store, "_run_kanban", run)
    store.record_failure("blocked", {"reason_code": "http_403"}, NOW)
    incident_id = store.read_state()["unresolved_incident"]["incident_id"]
    store.ensure_diagnostic_task_started()
    store.record_failure(
        "structure_change", {"reason_code": "rsc_missing"}, NOW + timedelta(days=1)
    )
    store.ensure_diagnostic_task_started()
    assert len([a for a in calls if a[:2] == ["task", "create"]]) == 1
    assert [a[-1] for a in calls if a[:2] == ["task", "start"]] == [
        "diagnostic-1",
        "diagnostic-1",
    ]
    assert store.read_state()["unresolved_incident"]["incident_id"] == incident_id
    store.resolve_after_verified_catalog_promoted(NOW + timedelta(days=2))
    store.record_failure("blocked", {}, NOW + timedelta(days=3))
    assert store.read_state()["unresolved_incident"]["incident_id"] != incident_id


def test_uncertain_creation_only_reconciles_without_replaying_create(
    tmp_path, monkeypatch
):
    store = health_store(tmp_path)
    monkeypatch.setattr(store, "_kanban_command", lambda: ["fake-kanban"])
    created = []

    def run(command, arguments):
        if arguments[:2] == ["task", "create"]:
            created.append(
                {
                    "id": "created-before-timeout",
                    "prompt": arguments[arguments.index("--prompt") + 1],
                }
            )
            raise subprocess.TimeoutExpired("create", 30)
        if arguments[:2] == ["task", "list"]:
            return {"tasks": created}
        assert arguments[-1] == "created-before-timeout"
        return {"ok": True}

    monkeypatch.setattr(store, "_run_kanban", run)
    store.record_failure("blocked", {}, NOW)
    store.ensure_diagnostic_task_started()
    store.ensure_diagnostic_task_started()
    assert len(created) == 1
    assert (
        store.read_state()["unresolved_incident"]["diagnostic_task_dispatch_status"]
        == "started"
    )


def test_cached_contract_render_stays_flagged_until_verified_success_and_production_omits(
    tmp_path,
):
    store = health_store(tmp_path)
    document = (
        '<html><body><header id="frontier-3d-report-header"></header></body></html>'
    )
    store.record_failure("structure_change", {}, NOW)
    with store.locked_state() as state:
        state["unresolved_incident"][
            "diagnostic_task_id"
        ] = '<img src=x onerror="bad()">'
        store.save_state(state)
    rendered = add_unresolved_catalog_refresh_development_banner(
        document, health_store=store, catalog_captured_at_utc="2026-10-02"
    )
    assert 'role="alert"' in rendered and "2026-10-02" in rendered
    assert "&lt;img" in rendered and "<img" not in rendered
    assert (
        add_unresolved_catalog_refresh_development_banner(
            document, health_store=store, report_deployment_environment="production"
        )
        == document
    )
    store.resolve_after_verified_catalog_promoted(NOW)
    assert (
        add_unresolved_catalog_refresh_development_banner(document, health_store=store)
        == document
    )
