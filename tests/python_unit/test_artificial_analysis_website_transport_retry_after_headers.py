"""用隔离本地 HTTP 服务验证 TLS curl 回退的响应头与停止边界。"""

from datetime import datetime, timedelta, timezone
from email.utils import format_datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from types import SimpleNamespace
import subprocess

import pytest
import requests

from src import artificial_analysis_minimal_model_catalog_refresh as minimal_refresh
from src.artificial_analysis_catalog_refresh_health import (
    CatalogRefreshHealthStore,
    parse_utc_timestamp,
)


@pytest.fixture
def isolated_website_http_server(monkeypatch):
    """只监听回环地址，记录真实 curl 请求，不访问 AA 或真实 Kanban。"""
    response = SimpleNamespace(
        status_code=429,
        headers={"retry-after": "604800"},
        body=b"blocked",
        send_early_hints=False,
        observed_requests=[],
    )

    class WebsiteResponseHandler(BaseHTTPRequestHandler):
        protocol_version = "HTTP/1.1"

        def do_GET(self):
            response.observed_requests.append((self.path, dict(self.headers)))
            if response.send_early_hints:
                self.wfile.write(b"HTTP/1.1 103 Early Hints\r\nRetry-After: 1\r\n\r\n")
            self.send_response(response.status_code)
            for name, value in response.headers.items():
                self.send_header(name, value)
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
    server = ThreadingHTTPServer(("127.0.0.1", 0), WebsiteResponseHandler)
    response.url = f"http://127.0.0.1:{server.server_port}/model-detail"
    server_thread = Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    try:
        yield response
    finally:
        server.shutdown()
        server.server_close()
        server_thread.join(timeout=5)


@pytest.fixture
def isolated_tls_fallback_client(monkeypatch):
    request_calls = []
    curl_commands = []
    sleeps = []
    run_system_command = subprocess.run

    def fail_python_tls_request(url, **kwargs):
        request_calls.append((url, kwargs))
        raise requests.exceptions.SSLError("合成 TLS 错误，仅触发本地 curl 回退")

    def record_system_curl(command, **kwargs):
        if command[0] == "/usr/bin/curl":
            assert not {"-k", "--insecure", "-L", "--location"}.intersection(command)
            curl_commands.append(command)
        return run_system_command(command, **kwargs)

    monkeypatch.setattr(requests, "get", fail_python_tls_request)
    monkeypatch.setattr(subprocess, "run", record_system_curl)
    return SimpleNamespace(
        client=minimal_refresh.BoundedWebsiteCatalogPageClient(sleep=sleeps.append),
        request_calls=request_calls,
        curl_commands=curl_commands,
        sleeps=sleeps,
    )


@pytest.mark.parametrize("status_code,use_http_date", [(429, False), (403, True)])
def test_curl_fallback_preserves_retry_after_and_stops_without_retrying(
    isolated_website_http_server, isolated_tls_fallback_client, status_code, use_http_date
):
    response = isolated_website_http_server
    fallback = isolated_tls_fallback_client
    earliest_retry = datetime.now(timezone.utc).replace(microsecond=0) + timedelta(days=7)
    response.status_code = status_code
    response.headers = {
        "retry-after": (
            format_datetime(earliest_retry, usegmt=True) if use_http_date else "604800"
        )
    }
    response.send_early_hints = True

    with pytest.raises(minimal_refresh.WebsiteCatalogRefreshFailure) as caught:
        fallback.client(response.url)

    assert caught.value.kind == "blocked"
    assert caught.value.evidence["http_status_code"] == status_code
    assert parse_utc_timestamp(caught.value.evidence["retry_after_utc"]) >= earliest_retry
    assert len(fallback.request_calls) == len(fallback.curl_commands) == 1
    assert fallback.client.http_attempt_count == 2
    assert fallback.sleeps == [30]
    assert len(response.observed_requests) == 1
    assert response.observed_requests[0][1]["User-Agent"] == (
        minimal_refresh.WEBSITE_CATALOG_REQUEST_USER_AGENT
    )


def test_curl_retry_after_extends_persisted_refresh_cooldown(
    tmp_path, isolated_website_http_server, isolated_tls_fallback_client
):
    response = isolated_website_http_server
    fallback = isolated_tls_fallback_client
    now = datetime.now(timezone.utc)
    health = CatalogRefreshHealthStore(
        Path.cwd(),
        state_directory=tmp_path / "isolated-refresh-health",
        artifact_directory=tmp_path / "isolated-refresh-evidence",
        dispatch_tasks=False,
    )
    api_rows = [
        {
            "id": "00000000-0000-4000-8000-000000000001",
            "slug": "synthetic-model",
            "evaluations": {"artificial_analysis_intelligence_index": 50},
        }
    ]
    result = minimal_refresh.prepare_minimal_model_catalog_refresh(
        api_rows,
        "4.3",
        tmp_path / "isolated-numeric-responses",
        health,
        now=now,
        fetch_page=lambda _: fallback.client(response.url),
        sleep=lambda _: None,
    )
    next_allowed = parse_utc_timestamp(
        health.read_state()["next_website_catalog_refresh_allowed_at_utc"]
    )
    assert next_allowed >= now + timedelta(days=7) - timedelta(seconds=1)
    assert result.status == "failed_reusing_previous_verified_catalog"

    restarted = minimal_refresh.prepare_minimal_model_catalog_refresh(
        api_rows,
        "4.3",
        tmp_path / "isolated-numeric-responses",
        health,
        now=now + timedelta(days=2),
        fetch_page=lambda _: pytest.fail("服务器冷却期内不得再次发出请求"),
        sleep=lambda _: None,
    )
    assert restarted.status == "skipped_refresh_cooldown"
    assert fallback.client.http_attempt_count == 2
    assert len(response.observed_requests) == 1


def test_curl_preserves_body_that_looks_like_another_http_response(
    isolated_website_http_server, isolated_tls_fallback_client
):
    response = isolated_website_http_server
    response.status_code = 200
    response.headers = {}
    response.body = b"HTTP/1.1 429 Fake Body\r\nRetry-After: 1\r\n\r\n<html>body</html>"
    response.send_early_hints = True
    assert isolated_tls_fallback_client.client(response.url) == response.body.decode()


def test_curl_does_not_follow_redirects(
    isolated_website_http_server, isolated_tls_fallback_client
):
    response = isolated_website_http_server
    response.status_code = 302
    response.headers = {"Location": "/redirect-target"}
    with pytest.raises(minimal_refresh.WebsiteCatalogRefreshFailure) as caught:
        isolated_tls_fallback_client.client(response.url)
    assert caught.value.reason_code == "website_returned_unexpected_redirect"
    assert len(response.observed_requests) == 1


def test_curl_body_limit_counts_body_bytes_without_response_headers(
    monkeypatch, isolated_website_http_server, isolated_tls_fallback_client
):
    response = isolated_website_http_server
    response.status_code = 200
    response.headers = {"X-Synthetic-Long-Header": "a" * 200}
    response.body = b"<html>synthetic body</html>"
    monkeypatch.setattr(minimal_refresh, "MAXIMUM_WEBSITE_PAGE_BYTES", len(response.body))
    assert isolated_tls_fallback_client.client(response.url) == response.body.decode()
    response.body += b"x"
    with pytest.raises(minimal_refresh.WebsiteCatalogRefreshFailure):
        isolated_tls_fallback_client.client(response.url)
    assert isolated_tls_fallback_client.client.http_attempt_count == 4


def test_tls_curl_fallback_shares_two_attempts_per_page_and_six_attempts_per_batch(
    isolated_website_http_server, isolated_tls_fallback_client
):
    response = isolated_website_http_server
    fallback = isolated_tls_fallback_client
    response.status_code = 200
    response.headers = {}
    response.body = b"<html>synthetic model detail</html>"
    for _ in range(3):
        assert fallback.client(response.url) == response.body.decode()

    with pytest.raises(minimal_refresh.WebsiteCatalogRefreshFailure) as caught:
        fallback.client(response.url)
    assert caught.value.reason_code == "http_attempt_budget_exhausted"
    assert fallback.client.http_attempt_count == 6
    assert len(fallback.request_calls) == len(fallback.curl_commands) == 3
    assert len(response.observed_requests) == 3
