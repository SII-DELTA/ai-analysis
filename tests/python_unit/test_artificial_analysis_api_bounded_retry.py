"""API 的暂时故障可恢复；普通 4xx、过长 Retry-After 不触发盲重试。"""
import requests
import pytest

from src import fetch_data


class ApiResponse:
    def __init__(self, status_code, retry_after=None):
        self.status_code = status_code
        self.headers = {"Retry-After": retry_after} if retry_after is not None else {}

    def close(self):
        pass


@pytest.mark.parametrize("responses,expected_waits", [
    ([ApiResponse(429, "2"), ApiResponse(503), ApiResponse(200)], [2, 1]),
    ([requests.ConnectionError("暂时断连"), ApiResponse(200)], [0.5]),
    ([ApiResponse(404)], []),
    ([ApiResponse(403)], []),
])
def test_only_recoverable_api_failures_retry_with_a_bound(monkeypatch, responses, expected_waits):
    remaining = list(responses)
    def get(*args, **kwargs):
        response = remaining.pop(0)
        if isinstance(response, Exception):
            raise response
        return response
    waits = []
    monkeypatch.setattr(requests, "get", get)
    monkeypatch.setattr(fetch_data.time, "sleep", waits.append)
    response = fetch_data._request_api_language_models_page_with_bounded_retry("https://example.invalid/api", page=1, api_key="synthetic-test-key")
    assert response is responses[-1]
    assert waits == expected_waits
    assert not remaining


def test_retry_after_longer_than_budget_stops_without_requesting_early(monkeypatch):
    monkeypatch.setattr(requests, "get", lambda *args, **kwargs: ApiResponse(429, "86400"))
    monkeypatch.setattr(fetch_data.time, "sleep", lambda delay: pytest.fail("不可无限等待或提前重试"))
    with pytest.raises(requests.HTTPError, match="Retry-After"):
        fetch_data._request_api_language_models_page_with_bounded_retry("https://example.invalid/api", page=1, api_key="synthetic-test-key")
