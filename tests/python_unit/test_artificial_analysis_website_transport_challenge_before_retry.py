"""验证有界读取挑战页后立即停止，普通 503 继续遵守重试预算。"""

from datetime import datetime, timedelta, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from types import SimpleNamespace
import json
import subprocess

import pytest
import requests

from src import artificial_analysis_minimal_model_catalog_refresh as minimal_refresh
from src.artificial_analysis_catalog_refresh_health import CatalogRefreshHealthStore


@pytest.fixture
def isolated_challenge_http_server(monkeypatch):
    response = SimpleNamespace(
        status_codes=[503],
        body=b"<html><title>Just a moment...</title></html>",
        observed_requests=[],
    )

    class ChallengeResponseHandler(BaseHTTPRequestHandler):
        def do_GET(self):
            response.observed_requests.append(self.path)
            status_index = min(len(response.observed_requests) - 1, len(response.status_codes) - 1)
            self.send_response(response.status_codes[status_index])
            self.send_header("Content-Length", str(len(response.body)))
            self.end_headers()
            try:
                self.wfile.write(response.body)
            except BrokenPipeError:
                pass

        def log_message(self, *args):
            pass

    monkeypatch.setenv("NO_PROXY", "127.0.0.1")
    monkeypatch.setenv("no_proxy", "127.0.0.1")
    server = ThreadingHTTPServer(("127.0.0.1", 0), ChallengeResponseHandler)
    response.url = f"http://127.0.0.1:{server.server_port}/isolated-model-detail"
    server_thread = Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    try:
        yield response
    finally:
        server.shutdown()
        server.server_close()
        server_thread.join(timeout=5)


def install_isolated_page_transport(monkeypatch, response, transport):
    """requests 与真实 curl 均只连接本地服务，TLS 失败由测试合成。"""
    request_calls = []
    curl_commands = []
    sleeps = []
    system_run = subprocess.run

    def local_requests_get(url, **kwargs):
        assert url == response.url
        request_calls.append(url)
        if transport == "curl":
            raise requests.exceptions.SSLError("合成 TLS 错误")
        # 直接发送已准备的本地请求，保持全局禁止外部 Session.request 的护栏。
        session = requests.Session()
        prepared = session.prepare_request(
            requests.Request("GET", url, headers=kwargs["headers"])
        )
        return session.send(
            prepared,
            timeout=kwargs["timeout"],
            allow_redirects=kwargs["allow_redirects"],
            stream=kwargs["stream"],
        )

    def local_curl_only(command, **kwargs):
        if command[0] == "/usr/bin/curl":
            assert command[-1] == response.url
            assert not {"-k", "--insecure", "-L", "--location"}.intersection(command)
            curl_commands.append(command)
        return system_run(command, **kwargs)

    monkeypatch.setattr(requests, "get", local_requests_get)
    monkeypatch.setattr(subprocess, "run", local_curl_only)
    return SimpleNamespace(
        client=minimal_refresh.BoundedWebsiteCatalogPageClient(sleep=sleeps.append),
        request_calls=request_calls,
        curl_commands=curl_commands,
        sleeps=sleeps,
    )


def prepare_isolated_refresh(tmp_path, transport, response, *, now, health=None):
    health = health or CatalogRefreshHealthStore(
        Path.cwd(),
        state_directory=tmp_path / "isolated-health-state",
        artifact_directory=tmp_path / "isolated-incident-evidence",
        dispatch_tasks=False,
    )
    result = minimal_refresh.prepare_minimal_model_catalog_refresh(
        [
            {
                "id": f"00000000-0000-4000-8000-{index:012d}",
                "slug": f"synthetic-model-{index}",
                "evaluations": {"artificial_analysis_intelligence_index": 50},
            }
            for index in range(3)
        ],
        "4.3",
        tmp_path / "isolated-numeric-catalog-responses",
        health,
        now=now,
        fetch_page=lambda _: transport.client(response.url),
        sleep=lambda _: None,
    )
    return result, health


@pytest.mark.parametrize("transport_name", ["requests", "curl"])
@pytest.mark.parametrize(
    "challenge_body",
    [b"<html><title>Just a moment...</title></html>", b"<html>cf-chl-managed</html>"],
)
def test_503_challenge_stops_batch_and_records_only_one_unresolved_episode(
    tmp_path, monkeypatch, isolated_challenge_http_server, transport_name, challenge_body
):
    response = isolated_challenge_http_server
    response.body = challenge_body
    transport = install_isolated_page_transport(monkeypatch, response, transport_name)
    now = datetime.now(timezone.utc)
    result, health = prepare_isolated_refresh(tmp_path, transport, response, now=now)

    assert result.status == "failed_reusing_previous_verified_catalog"
    incident = health.read_state()["unresolved_incident"]
    assert incident is not None
    assert incident["failure_kind"] == "blocked"
    assert incident["failure_count"] == 1
    evidence = json.loads(Path(incident["latest_evidence_path"]).read_text())
    assert evidence["failure_reason_code"] == "website_returned_verification_challenge"
    assert len(response.observed_requests) == len(transport.request_calls) == 1
    assert transport.client.http_attempt_count == (2 if transport_name == "curl" else 1)
    assert transport.sleeps == ([30] if transport_name == "curl" else [])

    repeated, _ = prepare_isolated_refresh(
        tmp_path, transport, response, now=now + timedelta(hours=1), health=health
    )
    assert repeated.status == "skipped_refresh_cooldown"
    assert health.read_state()["unresolved_incident"] == incident
    assert [path.name for path in health.artifact_directory.iterdir()] == [incident["incident_id"]]
    assert len(response.observed_requests) == 1


def test_plain_503_still_retries_and_recovers_within_two_attempts(
    monkeypatch, isolated_challenge_http_server
):
    response = isolated_challenge_http_server
    response.body = b"<html>temporarily unavailable</html>"
    response.status_codes = [503, 200]
    transport = install_isolated_page_transport(monkeypatch, response, "requests")
    assert transport.client(response.url) == response.body.decode()
    assert len(response.observed_requests) == transport.client.http_attempt_count == 2
    assert transport.sleeps == [30]


@pytest.mark.parametrize("transport_name", ["requests", "curl"])
def test_plain_503_uses_six_attempt_budget_without_false_blocked_episode(
    tmp_path, monkeypatch, isolated_challenge_http_server, transport_name
):
    response = isolated_challenge_http_server
    response.body = b"<html>temporarily unavailable</html>"
    transport = install_isolated_page_transport(monkeypatch, response, transport_name)
    result, health = prepare_isolated_refresh(
        tmp_path, transport, response, now=datetime.now(timezone.utc)
    )
    assert result.status == "failed_reusing_previous_verified_catalog"
    assert transport.client.http_attempt_count == 6
    assert len(response.observed_requests) == (3 if transport_name == "curl" else 6)
    assert health.read_state()["unresolved_incident"] is None


@pytest.mark.parametrize("transport_name", ["requests", "curl"])
def test_challenge_detection_does_not_bypass_body_byte_limit(
    monkeypatch, isolated_challenge_http_server, transport_name
):
    response = isolated_challenge_http_server
    response.body = b"cf-chl-managed" + b"x" * 64
    monkeypatch.setattr(minimal_refresh, "MAXIMUM_WEBSITE_PAGE_BYTES", 32)
    transport = install_isolated_page_transport(monkeypatch, response, transport_name)
    with pytest.raises(minimal_refresh.WebsiteCatalogRefreshFailure) as caught:
        transport.client(response.url)
    assert caught.value.reason_code != "website_returned_verification_challenge"
    assert len(response.observed_requests) == 1
