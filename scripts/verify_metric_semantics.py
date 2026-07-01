"""指标口径的最小回归验证。"""
from __future__ import annotations

import math
import sys
from pathlib import Path

REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(REPOSITORY_ROOT))

from src import cli, fetch_data, frontier


class _FakeApiResponse:
    def __init__(self, status_code: int, payload: dict):
        self.status_code = status_code
        self._payload = payload

    def raise_for_status(self) -> None:
        assert self.status_code < 400

    def json(self) -> dict:
        return self._payload


def main() -> None:
    native_pricing = {
        "price_1m_blended_7_to_2_to_1": 9.99,
        "price_1m_cache_hit_tokens": 1.0,
        "price_1m_input_tokens": 2.0,
        "price_1m_output_tokens": 3.0,
    }
    assert fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1(native_pricing) == 9.99

    component_pricing = {
        "price_1m_cache_hit_tokens": 1.0,
        "price_1m_input_tokens": 2.0,
        "price_1m_output_tokens": 3.0,
    }
    assert fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1(component_pricing) == 1.4
    assert math.isnan(
        fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1(
            {"price_1m_input_tokens": 2.0, "price_1m_output_tokens": 3.0}
        )
    )

    assert frontier.dims_for(
        cost_metric_column_name="blended_price_cache_input_output_7_to_2_to_1",
        speed_metric_column_name="eff_speed",
    ) == [
        "intelligence",
        "blended_price_cache_input_output_7_to_2_to_1",
        "eff_speed",
    ]
    assert cli.DEFAULT_SPEED_METRIC_NAME == "effective"
    assert cli.DEFAULT_COST_METRIC_NAME == "effective"
    assert cli.DEFAULT_OUTPUT_HTML_PATH.name == "frontier_3d.html"

    requested_urls = []
    original_get = fetch_data.requests.get

    def fake_get(url, **kwargs):
        requested_urls.append((url, kwargs["params"]["page"]))
        if url == fetch_data.API_LANGUAGE_MODELS_PRO_URL:
            return _FakeApiResponse(403, {})
        page = kwargs["params"]["page"]
        return _FakeApiResponse(
            200,
            {
                "data": [{"id": f"model-{page}"}],
                "pagination": {"has_more": page == 1},
            },
        )

    try:
        fetch_data.requests.get = fake_get
        rows, selected_api_url = fetch_data._fetch_paginated_language_models("test-key")
    finally:
        fetch_data.requests.get = original_get
    assert requested_urls == [
        (fetch_data.API_LANGUAGE_MODELS_PRO_URL, 1),
        (fetch_data.API_LANGUAGE_MODELS_FREE_URL, 1),
        (fetch_data.API_LANGUAGE_MODELS_FREE_URL, 2),
    ]
    assert rows == [{"id": "model-1"}, {"id": "model-2"}]
    assert selected_api_url == fetch_data.API_LANGUAGE_MODELS_FREE_URL
    print("✅ 指标口径验证通过")


if __name__ == "__main__":
    main()
