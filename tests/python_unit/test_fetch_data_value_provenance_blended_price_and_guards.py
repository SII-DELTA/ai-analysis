"""fetch_data 取数：值溯源列、混合价来源、API 缓存元数据、暂停网页抓取、回退快照与护栏。

全部用 tmp 目录里的合成缓存；`requests.get` 默认被替换成「一旦调用就失败」，
证明默认（暂停网页抓取）路径不发任何请求。不读共享的 `output/` 与 `data/processed/`。
"""
from __future__ import annotations

import dataclasses
import json
import math
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

import numpy as np
import pandas as pd
import pytest

from src import fetch_data
from tests.fixtures.build_synthetic_artificial_analysis_model_detail_page_html import (
    build_synthetic_artificial_analysis_embedded_model_object,
    build_synthetic_artificial_analysis_model_detail_page_html,
    synthetic_artificial_analysis_model_uuid,
)

REPOSITORY_ROOT_DIRECTORY_PATH = Path(__file__).resolve().parents[2]

SYNTHETIC_API_MODEL_ROW_COUNT = 520
SYNTHETIC_CATALOG_MODEL_COUNT_WITH_OUTPUT_TOKEN_COUNT = 60
SYNTHETIC_CATALOG_MODEL_COUNT = 65
# 0–39 与 400–519 有 API 当期成本（共 160 条）：须 ≥ R1-04 的绝对下限 100；40–49、100–119 留给快照回退，
# 300 留给上次 models.csv 回退
SYNTHETIC_API_MODEL_INDEXES_WITH_API_COST = frozenset(range(0, 40)) | frozenset(range(400, 520))
SYNTHETIC_SNAPSHOT_MODEL_INDEXES = list(range(40, 50)) + list(range(100, 120))
SYNTHETIC_API_RESPONSE_FETCHED_AT_UTC = "2026-09-23T05:50:32Z"
SYNTHETIC_CATALOG_PAGE_CACHE_TIME_UTC = datetime(2026, 9, 23, 5, 52, 0, tzinfo=timezone.utc)


class _NetworkRequestAttemptedError(AssertionError):
    """测试里任何网络请求都应当是意料之外的。"""


def _requests_get_that_fails_if_called(*positional_arguments, **keyword_arguments):
    raise _NetworkRequestAttemptedError(
        f"不应发出网络请求: {positional_arguments} {keyword_arguments}"
    )


def _get_api_key_that_fails_if_called() -> str:
    raise _NetworkRequestAttemptedError("不应读取 API key")


def _synthetic_intelligence_index(synthetic_model_index: int) -> float:
    return round(10.0 + (synthetic_model_index % 97) * 0.4, 1)


def _synthetic_output_token_count(synthetic_model_index: int) -> float:
    return float(1_000_000 + synthetic_model_index * 10_000)


def _synthetic_api_model_row(synthetic_model_index: int) -> dict:
    pricing = {
        "price_1m_input_tokens": 2.0,
        "price_1m_output_tokens": 3.0,
        "price_1m_cache_hit_tokens": 1.0 if synthetic_model_index % 3 == 0 else None,
        "price_1m_cache_write_tokens": None,
    }
    if synthetic_model_index == 1:
        pricing["price_1m_output_tokens"] = None
    if synthetic_model_index == 2:
        pricing["price_1m_blended_7_to_2_to_1"] = 9.99
    api_cost_total_usd = (
        100.0 + synthetic_model_index
        if synthetic_model_index in SYNTHETIC_API_MODEL_INDEXES_WITH_API_COST
        else None
    )
    return {
        "id": synthetic_artificial_analysis_model_uuid(synthetic_model_index),
        "name": f"Synthetic Model {synthetic_model_index}",
        "slug": f"synthetic-model-{synthetic_model_index}",
        "release_date": "2026-01-15",
        "model_creator": {"id": "synthetic-creator", "name": "Synthetic Lab"},
        "evaluations": {
            "artificial_analysis_intelligence_index": _synthetic_intelligence_index(
                synthetic_model_index
            ),
            "artificial_analysis_coding_index": None,
            "artificial_analysis_math_index": None,
        },
        "artificial_analysis_intelligence_index_cost": (
            {"total_cost": api_cost_total_usd} if api_cost_total_usd is not None else None
        ),
        "pricing": pricing,
        "performance": {
            "median_output_tokens_per_second": 50.0 + synthetic_model_index % 10,
            "median_time_to_first_token_seconds": 1.0,
        },
    }


def _synthetic_catalog_embedded_model_objects() -> list[dict]:
    embedded_model_objects = []
    for synthetic_model_index in range(SYNTHETIC_CATALOG_MODEL_COUNT):
        has_output_token_count = (
            synthetic_model_index < SYNTHETIC_CATALOG_MODEL_COUNT_WITH_OUTPUT_TOKEN_COUNT
        )
        embedded_model_objects.append(
            build_synthetic_artificial_analysis_embedded_model_object(
                model_id=synthetic_artificial_analysis_model_uuid(synthetic_model_index),
                slug=f"synthetic-model-{synthetic_model_index}",
                name=f"Synthetic Model {synthetic_model_index}",
                intelligence_index=_synthetic_intelligence_index(synthetic_model_index) + 0.01,
                intelligence_index_is_estimated=synthetic_model_index == 7,
                intelligence_index_cost_total_usd=(
                    100.0 + synthetic_model_index if has_output_token_count else None
                ),
                canonical_output_token_count=(
                    _synthetic_output_token_count(synthetic_model_index)
                    if has_output_token_count
                    else None
                ),
                intelligence_index_time_per_task_seconds=(
                    40.0 + synthetic_model_index if has_output_token_count else None
                ),
                is_reasoning=synthetic_model_index % 2 == 0,
                reasoning_effort_slug="medium" if synthetic_model_index % 2 == 0 else None,
                release_slug=f"synthetic-release-{synthetic_model_index}",
                price_1m_blended_7_to_2_to_1=1.7,
            )
        )
    return embedded_model_objects


def _write_synthetic_api_language_models_cache(
    api_language_models_cache_path: Path,
    *,
    include_response_metadata: bool,
) -> None:
    api_language_models_cache_path.parent.mkdir(parents=True, exist_ok=True)
    cached_api_response = {
        "source_url": fetch_data.API_LANGUAGE_MODELS_FREE_URL,
        "data": [
            _synthetic_api_model_row(synthetic_model_index)
            for synthetic_model_index in range(SYNTHETIC_API_MODEL_ROW_COUNT)
        ],
    }
    if include_response_metadata:
        cached_api_response["tier"] = "free"
        cached_api_response["intelligence_index_version"] = "4.3.2"
        cached_api_response["fetched_at_utc"] = SYNTHETIC_API_RESPONSE_FETCHED_AT_UTC
    api_language_models_cache_path.write_text(json.dumps(cached_api_response), encoding="utf-8")
    legacy_cache_modification_timestamp = datetime(
        2026, 9, 23, 5, 50, 32, tzinfo=timezone.utc
    ).timestamp()
    os.utime(
        api_language_models_cache_path,
        (legacy_cache_modification_timestamp, legacy_cache_modification_timestamp),
    )


def _write_synthetic_catalog_detail_page(
    model_detail_page_html_cache_directory: Path,
    page_file_name: str,
    *,
    cache_file_modification_time_utc: datetime = SYNTHETIC_CATALOG_PAGE_CACHE_TIME_UTC,
    intelligence_index_version_strings: tuple[str, ...] = ("4.3", "4.3.2"),
) -> None:
    embedded_model_objects = _synthetic_catalog_embedded_model_objects()
    model_detail_page_html_cache_directory.mkdir(parents=True, exist_ok=True)
    cached_page_path = model_detail_page_html_cache_directory / page_file_name
    cached_page_path.write_text(
        build_synthetic_artificial_analysis_model_detail_page_html(
            embedded_model_objects=embedded_model_objects,
            current_model_object=embedded_model_objects[0],
            intelligence_index_version_strings=intelligence_index_version_strings,
        ),
        encoding="utf-8",
    )
    modification_timestamp = cache_file_modification_time_utc.timestamp()
    os.utime(cached_page_path, (modification_timestamp, modification_timestamp))


def _write_synthetic_versioned_fallback_snapshot(versioned_fallback_snapshot_path: Path) -> None:
    versioned_fallback_snapshot_path.parent.mkdir(parents=True, exist_ok=True)
    pd.DataFrame(
        [
            {
                "id": synthetic_artificial_analysis_model_uuid(synthetic_model_index),
                "name": f"Synthetic Model {synthetic_model_index}",
                "intelligence_index_version": "4.1",
                "captured_at_date": "2026-07-01",
                "cost_to_run_usd": 50.0 + synthetic_model_index,
                "intelligence_index_canonical_output_token_count": 21_000_000.0
                + synthetic_model_index,
            }
            for synthetic_model_index in SYNTHETIC_SNAPSHOT_MODEL_INDEXES
        ]
    ).to_csv(versioned_fallback_snapshot_path, index=False)


@dataclasses.dataclass(frozen=True)
class SyntheticArtificialAnalysisCacheLayout:
    raw_directory_path: Path
    api_language_models_cache_path: Path
    model_detail_page_html_cache_directory_path: Path
    versioned_fallback_snapshot_path: Path
    processed_directory_path: Path


@pytest.fixture
def synthetic_artificial_analysis_cache_layout(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> SyntheticArtificialAnalysisCacheLayout:
    """把 fetch_data 的全部路径常量指到 tmp，并禁止网络与 key。"""
    raw_directory_path = tmp_path / "raw"
    cache_layout = SyntheticArtificialAnalysisCacheLayout(
        raw_directory_path=raw_directory_path,
        api_language_models_cache_path=raw_directory_path / "api_language_models.json",
        model_detail_page_html_cache_directory_path=(
            raw_directory_path / "artificial_analysis_model_detail_page_html"
        ),
        versioned_fallback_snapshot_path=(
            tmp_path / "reference" / "synthetic_v4_1_fallback_snapshot.csv"
        ),
        processed_directory_path=tmp_path / "processed",
    )
    monkeypatch.setattr(fetch_data, "RAW", raw_directory_path)
    monkeypatch.setattr(
        fetch_data, "API_LANGUAGE_MODELS_CACHE", cache_layout.api_language_models_cache_path
    )
    monkeypatch.setattr(
        fetch_data,
        "ARTIFICIAL_ANALYSIS_API_LANGUAGE_MODELS_RESPONSE_HISTORY_DIRECTORY",
        raw_directory_path / "artificial_analysis_api_language_models_response_history",
    )
    monkeypatch.setattr(
        fetch_data,
        "ARTIFICIAL_ANALYSIS_MODELS_LIST_PAGE_HTML_CACHE_PATH",
        raw_directory_path / "models_page.html",
    )
    monkeypatch.setattr(
        fetch_data,
        "ARTIFICIAL_ANALYSIS_MODEL_DETAIL_PAGE_HTML_CACHE_DIRECTORY",
        cache_layout.model_detail_page_html_cache_directory_path,
    )
    monkeypatch.setattr(
        fetch_data,
        "ARTIFICIAL_ANALYSIS_INTELLIGENCE_INDEX_V4_1_COST_TO_RUN_AND_CANONICAL_OUTPUT_TOKEN_COUNT_FALLBACK_SNAPSHOT_PATH",
        cache_layout.versioned_fallback_snapshot_path,
    )
    monkeypatch.setattr(fetch_data, "PROCESSED", cache_layout.processed_directory_path)
    monkeypatch.setattr(fetch_data.requests, "get", _requests_get_that_fails_if_called)
    monkeypatch.setattr(fetch_data, "get_api_key", _get_api_key_that_fails_if_called)
    monkeypatch.setattr(
        fetch_data, "_artificial_analysis_website_page_fetch_paused_notice_already_printed", False
    )

    _write_synthetic_api_language_models_cache(
        cache_layout.api_language_models_cache_path, include_response_metadata=True
    )
    _write_synthetic_catalog_detail_page(
        cache_layout.model_detail_page_html_cache_directory_path, "synthetic-model-0.html"
    )
    _write_synthetic_catalog_detail_page(
        cache_layout.model_detail_page_html_cache_directory_path, "synthetic-model-1.html"
    )
    _write_synthetic_versioned_fallback_snapshot(cache_layout.versioned_fallback_snapshot_path)
    # 列表页缓存：camelCase payload，snake_case 正则解析 0 条（与真实现状一致）
    (raw_directory_path / "models_page.html").write_text(
        '<html><script>self.__next_f.push([1,"{\\"intelligenceIndexCost\\":{\\"total\\":1}}"])'
        "</script></html>",
        encoding="utf-8",
    )
    return cache_layout


def _row_for_synthetic_model_index(
    models_dataframe: pd.DataFrame, synthetic_model_index: int
) -> pd.Series:
    matching_rows = models_dataframe[
        models_dataframe["id"] == synthetic_artificial_analysis_model_uuid(synthetic_model_index)
    ]
    assert len(matching_rows) == 1
    return matching_rows.iloc[0]


# ----------------------------------------------------------------------------- 混合价
def test_blended_price_uses_api_cache_hit_price_when_present() -> None:
    blended_price, cache_hit_price_source = (
        fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1_with_cache_hit_price_source(
            {
                "price_1m_cache_hit_tokens": 1.0,
                "price_1m_input_tokens": 2.0,
                "price_1m_output_tokens": 3.0,
            }
        )
    )
    assert blended_price == pytest.approx(1.4)
    assert (
        cache_hit_price_source
        == fetch_data.BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_API_CACHE_HIT_PRICE
    )


def test_blended_price_uses_input_price_as_cache_hit_price_when_cache_hit_missing() -> None:
    blended_price, cache_hit_price_source = (
        fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1_with_cache_hit_price_source(
            {"price_1m_input_tokens": 2.0, "price_1m_output_tokens": 3.0}
        )
    )
    # AA 惯例：缺 cache-hit 价时按 input 价代替 → (9×input + output) / 10
    assert blended_price == pytest.approx(2.1)
    assert (
        cache_hit_price_source
        == fetch_data.BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_INPUT_PRICE_AS_CACHE_HIT_PRICE
    )
    assert fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1(
        {"price_1m_input_tokens": 2.0, "price_1m_output_tokens": 3.0}
    ) == pytest.approx(2.1)


def test_blended_price_prefers_api_native_field_and_is_missing_without_input_or_output() -> None:
    native_blended_price, native_source = (
        fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1_with_cache_hit_price_source(
            {
                "price_1m_blended_7_to_2_to_1": 9.99,
                "price_1m_cache_hit_tokens": 1.0,
                "price_1m_input_tokens": 2.0,
                "price_1m_output_tokens": 3.0,
            }
        )
    )
    assert native_blended_price == pytest.approx(9.99)
    assert (
        native_source
        == fetch_data.BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_ARTIFICIAL_ANALYSIS_API_NATIVE_BLENDED_PRICE
    )
    missing_blended_price, missing_source = (
        fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1_with_cache_hit_price_source(
            {"price_1m_cache_hit_tokens": 1.0, "price_1m_input_tokens": 2.0}
        )
    )
    assert math.isnan(missing_blended_price)
    assert missing_source is None


def test_assembled_models_dataframe_treats_zero_hosted_price_placeholder_blended_price_as_missing() -> None:
    """集成修复（D 切片）：API 对「无托管定价」的开源权重模型给 input=output=0 且无 cache-hit，
    P0-6 之后算出的混合价是 (9×0+0)/10=0，既不是真免费也无法上对数轴 → 应为 NaN 且来源为 None；
    正常定价行不受影响。"""
    zero_hosted_price_placeholder_api_model_row = _synthetic_api_model_row(5)
    zero_hosted_price_placeholder_api_model_row["pricing"] = {
        "price_1m_input_tokens": 0,
        "price_1m_output_tokens": 0,
        "price_1m_cache_hit_tokens": None,
        "price_1m_cache_write_tokens": None,
    }
    normally_priced_api_model_row = _synthetic_api_model_row(4)
    assembled_models_dataframe = fetch_data._assemble_models_dataframe_with_value_provenance(
        [zero_hosted_price_placeholder_api_model_row, normally_priced_api_model_row],
        {"fetched_at_utc": SYNTHETIC_API_RESPONSE_FETCHED_AT_UTC},
        fetch_data._empty_embedded_model_catalog_load_result(Path("synthetic-empty-catalog")),
        fetch_data.CostToRunAndOutputTokenCountFallbackValues({}, {}),
        "4.3.2",
    )
    zero_hosted_price_placeholder_row = _row_for_synthetic_model_index(assembled_models_dataframe, 5)
    assert math.isnan(zero_hosted_price_placeholder_row["blended_price_cache_input_output_7_to_2_to_1"])
    assert zero_hosted_price_placeholder_row["blended_price_cache_hit_price_source"] is None
    normally_priced_row = _row_for_synthetic_model_index(assembled_models_dataframe, 4)
    assert normally_priced_row["blended_price_cache_input_output_7_to_2_to_1"] == pytest.approx(2.1)
    assert (
        normally_priced_row["blended_price_cache_hit_price_source"]
        == fetch_data.BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_INPUT_PRICE_AS_CACHE_HIT_PRICE
    )


# ----------------------------------------------------------------------------- API 缓存元数据
def test_api_cache_with_recorded_metadata_returns_it(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
) -> None:
    api_model_rows, api_response_metadata = (
        fetch_data.load_artificial_analysis_api_language_models_with_response_metadata(refresh=False)
    )
    assert len(api_model_rows) == SYNTHETIC_API_MODEL_ROW_COUNT
    assert api_response_metadata == {
        "source_url": fetch_data.API_LANGUAGE_MODELS_FREE_URL,
        "tier": "free",
        "intelligence_index_version": "4.3.2",
        "fetched_at_utc": SYNTHETIC_API_RESPONSE_FETCHED_AT_UTC,
        "fetched_at_utc_source": fetch_data.API_RESPONSE_FETCHED_AT_UTC_SOURCE_RECORDED_AT_FETCH_TIME,
        "refreshed_response_pending_cache_replacement_path": None,
        "refreshed_response_history_file_path_pending_guardrail_validation": None,
    }
    assert fetch_data.fetch_api(refresh=False) == api_model_rows


def test_legacy_api_cache_infers_fetched_at_from_file_modification_time_not_current_time(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
) -> None:
    _write_synthetic_api_language_models_cache(
        synthetic_artificial_analysis_cache_layout.api_language_models_cache_path,
        include_response_metadata=False,
    )
    _, api_response_metadata = (
        fetch_data.load_artificial_analysis_api_language_models_with_response_metadata(refresh=False)
    )
    assert api_response_metadata["tier"] is None
    assert api_response_metadata["intelligence_index_version"] is None
    assert api_response_metadata["fetched_at_utc"] == "2026-09-23T05:50:32Z"
    assert (
        api_response_metadata["fetched_at_utc_source"]
        == fetch_data.API_RESPONSE_FETCHED_AT_UTC_SOURCE_INFERRED_FROM_CACHE_FILE_MODIFICATION_TIME
    )


class _FakeApiResponse:
    def __init__(self, status_code: int, response_payload: dict) -> None:
        self.status_code = status_code
        self._response_payload = response_payload

    def raise_for_status(self) -> None:
        if self.status_code >= 400:
            raise fetch_data.requests.HTTPError(f"HTTP {self.status_code}")

    def json(self) -> dict:
        return self._response_payload


def _fake_requests_get_serving_only_the_free_language_models_api(requested_urls: list):
    def fake_requests_get(url, **keyword_arguments):
        if url not in (fetch_data.API_LANGUAGE_MODELS_PRO_URL, fetch_data.API_LANGUAGE_MODELS_FREE_URL):
            raise _NetworkRequestAttemptedError(f"不应请求网页: {url}")
        requested_page_number = keyword_arguments["params"]["page"]
        requested_urls.append((url, requested_page_number))
        if url == fetch_data.API_LANGUAGE_MODELS_PRO_URL:
            return _FakeApiResponse(403, {})
        return _FakeApiResponse(
            200,
            {
                "tier": "free",
                "intelligence_index_version": 4.3,
                "pagination": {"page": requested_page_number, "has_more": requested_page_number == 1},
                "data": [{"id": f"synthetic-api-model-{requested_page_number}"}],
            },
        )

    return fake_requests_get


def test_api_refresh_persists_top_level_metadata_fetch_time_and_response_history(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    requested_urls: list = []
    monkeypatch.setattr(
        fetch_data.requests,
        "get",
        _fake_requests_get_serving_only_the_free_language_models_api(requested_urls),
    )
    monkeypatch.setattr(fetch_data, "get_api_key", lambda: "synthetic-test-key")
    previous_api_cache_text = (
        synthetic_artificial_analysis_cache_layout.api_language_models_cache_path.read_text(
            encoding="utf-8"
        )
    )

    api_model_rows, api_response_metadata = (
        fetch_data.load_artificial_analysis_api_language_models_with_response_metadata(refresh=True)
    )

    assert requested_urls == [
        (fetch_data.API_LANGUAGE_MODELS_PRO_URL, 1),
        (fetch_data.API_LANGUAGE_MODELS_FREE_URL, 1),
        (fetch_data.API_LANGUAGE_MODELS_FREE_URL, 2),
    ]
    assert api_model_rows == [{"id": "synthetic-api-model-1"}, {"id": "synthetic-api-model-2"}]
    assert api_response_metadata["tier"] == "free"
    assert api_response_metadata["intelligence_index_version"] == "4.3"
    assert (
        api_response_metadata["fetched_at_utc_source"]
        == fetch_data.API_RESPONSE_FETCHED_AT_UTC_SOURCE_RECORDED_AT_FETCH_TIME
    )
    written_cache = json.loads(
        synthetic_artificial_analysis_cache_layout.api_language_models_cache_path.read_text(
            encoding="utf-8"
        )
    )
    assert set(written_cache) == {
        "source_url",
        "tier",
        "intelligence_index_version",
        "fetched_at_utc",
        "data",
    }
    assert written_cache["fetched_at_utc"] == api_response_metadata["fetched_at_utc"]
    response_history_file_paths = sorted(
        (
            synthetic_artificial_analysis_cache_layout.raw_directory_path
            / "artificial_analysis_api_language_models_response_history"
        ).glob("artificial_analysis_api_language_models_response_fetched_at_*Z.json")
    )
    # 刷新前的旧缓存（抓取于 2026-09-23T05:50:32Z）先原样归档，再写入本次新响应（R1-02）
    assert len(response_history_file_paths) == 2
    response_history_texts_by_file_name = {
        response_history_file_path.name: response_history_file_path.read_text(encoding="utf-8")
        for response_history_file_path in response_history_file_paths
    }
    assert (
        response_history_texts_by_file_name.pop(
            "artificial_analysis_api_language_models_response_fetched_at_20260923T055032Z.json"
        )
        == previous_api_cache_text
    )
    assert [json.loads(text) for text in response_history_texts_by_file_name.values()] == [written_cache]


def test_legacy_paginated_fetch_helper_keeps_rows_and_selected_url_return_shape(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    requested_urls: list = []
    monkeypatch.setattr(
        fetch_data.requests,
        "get",
        _fake_requests_get_serving_only_the_free_language_models_api(requested_urls),
    )
    api_model_rows, selected_api_url = fetch_data._fetch_paginated_language_models(
        "synthetic-test-key"
    )
    assert api_model_rows == [{"id": "synthetic-api-model-1"}, {"id": "synthetic-api-model-2"}]
    assert selected_api_url == fetch_data.API_LANGUAGE_MODELS_FREE_URL


# ----------------------------------------------------------------------------- 暂停网页抓取（D-12）
def test_paused_page_fetch_reads_cache_only_and_skips_missing_pages_without_requests(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
    capsys: pytest.CaptureFixture[str],
) -> None:
    assert fetch_data.fetch_artificial_analysis_model_detail_page_html(
        "synthetic-model-without-cache", refresh=True
    ) is None
    cached_page_html = fetch_data.fetch_artificial_analysis_model_detail_page_html(
        "synthetic-model-0", refresh=True
    )
    assert cached_page_html is not None and "currentModel" in cached_page_html
    synthetic_artificial_analysis_cache_layout.raw_directory_path.joinpath(
        "models_page.html"
    ).unlink()
    assert fetch_data.fetch_artificial_analysis_models_page_html(refresh=True) is None
    captured_output = capsys.readouterr().out
    assert captured_output.count("已暂停网页抓取（D-12）") == 1


def test_build_dataframe_default_sends_no_web_request_even_with_refresh(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
    monkeypatch: pytest.MonkeyPatch,
    capsys: pytest.CaptureFixture[str],
) -> None:
    """refresh=True 在暂停时只刷新 API；任何网页请求都会让 fake 抛错。"""
    requested_urls: list = []
    monkeypatch.setattr(
        fetch_data.requests,
        "get",
        _fake_requests_get_serving_only_the_free_language_models_api(requested_urls),
    )
    monkeypatch.setattr(fetch_data, "get_api_key", lambda: "synthetic-test-key")
    monkeypatch.setattr(
        fetch_data,
        "_fetch_paginated_language_models_with_response_top_level_metadata",
        lambda api_key: (
            [
                _synthetic_api_model_row(synthetic_model_index)
                for synthetic_model_index in range(SYNTHETIC_API_MODEL_ROW_COUNT)
            ],
            {
                "source_url": fetch_data.API_LANGUAGE_MODELS_FREE_URL,
                "tier": "free",
                "intelligence_index_version": "4.3.2",
            },
        ),
    )
    models_dataframe = fetch_data.build_dataframe(refresh=True)
    assert len(models_dataframe) == SYNTHETIC_API_MODEL_ROW_COUNT
    assert requested_urls == []
    assert capsys.readouterr().out.count("已暂停网页抓取（D-12）") == 1


# ----------------------------------------------------------------------------- 值溯源列
REQUIRED_VALUE_PROVENANCE_COLUMN_NAMES = [
    "intelligence_index_canonical_output_token_count",
    "output_mtokens",
    "intel_per_m_output",
    "cost_to_run_value_source",
    "cost_to_run_value_intelligence_index_version",
    "cost_to_run_value_fetched_at_utc",
    "output_token_count_value_source",
    "output_token_count_value_intelligence_index_version",
    "output_token_count_value_fetched_at_utc",
    "cost_to_run_value_is_from_current_intelligence_index_version",
    "output_token_count_value_is_from_current_intelligence_index_version",
    "artificial_analysis_intelligence_index_is_estimated",
    "artificial_analysis_is_reasoning_model",
    "artificial_analysis_reasoning_effort_slug",
    "artificial_analysis_release_slug",
    "artificial_analysis_intelligence_index_time_per_task_seconds",
    "is_absent_from_accepted_embedded_model_catalog_partition",
    "blended_price_cache_hit_price_source",
    "eff_speed",
    "id",
    "slug",
    "name",
    "creator",
    "release_date",
    "intelligence",
    "coding_index",
    "math_index",
    "output_speed",
    "ttft_s",
    "blended_price_cache_input_output_7_to_2_to_1",
    "price_input",
    "price_output",
    "price_cache_hit",
    "price_cache_write",
    "cost_to_run",
]


def test_build_dataframe_emits_every_value_provenance_column(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
) -> None:
    models_dataframe = fetch_data.build_dataframe(False)
    missing_column_names = [
        required_column_name
        for required_column_name in REQUIRED_VALUE_PROVENANCE_COLUMN_NAMES
        if required_column_name not in models_dataframe.columns
    ]
    assert missing_column_names == []


def test_build_dataframe_current_api_cost_and_current_catalog_output_token_count(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
) -> None:
    models_dataframe = fetch_data.build_dataframe(refresh=False)
    fully_current_row = _row_for_synthetic_model_index(models_dataframe, 5)

    assert fully_current_row["cost_to_run"] == pytest.approx(105.0)
    assert (
        fully_current_row["cost_to_run_value_source"]
        == fetch_data.COST_TO_RUN_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_API_CURRENT_RESPONSE
    )
    assert fully_current_row["cost_to_run_value_intelligence_index_version"] == "4.3.2"
    assert fully_current_row["cost_to_run_value_fetched_at_utc"] == SYNTHETIC_API_RESPONSE_FETCHED_AT_UTC
    assert bool(fully_current_row["cost_to_run_value_is_from_current_intelligence_index_version"])

    assert fully_current_row["intelligence_index_canonical_output_token_count"] == pytest.approx(
        1_050_000
    )
    assert fully_current_row["output_mtokens"] == pytest.approx(1.05)
    assert (
        fully_current_row["output_token_count_value_source"]
        == fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_ACCEPTED_PARTITION
    )
    assert fully_current_row["output_token_count_value_intelligence_index_version"] == "4.3.2"
    assert fully_current_row["output_token_count_value_fetched_at_utc"] == "2026-09-23T05:52:00Z"
    assert bool(
        fully_current_row["output_token_count_value_is_from_current_intelligence_index_version"]
    )
    assert fully_current_row["intel_per_m_output"] == pytest.approx(
        _synthetic_intelligence_index(5) / 1.05
    )
    assert fully_current_row["eff_speed"] == pytest.approx(
        fully_current_row["output_speed"] / (1.05 / 87.0)
    )
    assert not bool(fully_current_row["is_absent_from_accepted_embedded_model_catalog_partition"])
    assert fully_current_row["artificial_analysis_release_slug"] == "synthetic-release-5"
    assert fully_current_row["artificial_analysis_intelligence_index_time_per_task_seconds"] == pytest.approx(45.0)

    estimated_row = _row_for_synthetic_model_index(models_dataframe, 7)
    assert estimated_row["artificial_analysis_intelligence_index_is_estimated"] == True  # noqa: E712
    assert estimated_row["artificial_analysis_is_reasoning_model"] == False  # noqa: E712
    assert estimated_row["artificial_analysis_reasoning_effort_slug"] is None
    reasoning_row = _row_for_synthetic_model_index(models_dataframe, 8)
    assert reasoning_row["artificial_analysis_is_reasoning_model"] == True  # noqa: E712
    assert reasoning_row["artificial_analysis_reasoning_effort_slug"] == "medium"


def test_build_dataframe_non_current_snapshot_values_carry_version_and_capture_date(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
) -> None:
    models_dataframe = fetch_data.build_dataframe(refresh=False)

    # 45：API 无成本 → v4.1 快照成本；token 仍来自当期目录
    snapshot_cost_row = _row_for_synthetic_model_index(models_dataframe, 45)
    assert snapshot_cost_row["cost_to_run"] == pytest.approx(95.0)
    assert (
        snapshot_cost_row["cost_to_run_value_source"]
        == fetch_data.COST_TO_RUN_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT
    )
    assert snapshot_cost_row["cost_to_run_value_intelligence_index_version"] == "4.1"
    assert snapshot_cost_row["cost_to_run_value_fetched_at_utc"] == "2026-07-01"
    assert not bool(snapshot_cost_row["cost_to_run_value_is_from_current_intelligence_index_version"])
    assert bool(
        snapshot_cost_row["output_token_count_value_is_from_current_intelligence_index_version"]
    )

    # 105：成本与 token 都来自 v4.1 快照 → intel_per_m_output 不再拼接新旧版本（NaN）
    snapshot_token_row = _row_for_synthetic_model_index(models_dataframe, 105)
    assert (
        snapshot_token_row["output_token_count_value_source"]
        == fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT
    )
    assert snapshot_token_row["output_token_count_value_intelligence_index_version"] == "4.1"
    assert snapshot_token_row["output_token_count_value_fetched_at_utc"] == "2026-07-01"
    assert not bool(
        snapshot_token_row["output_token_count_value_is_from_current_intelligence_index_version"]
    )
    assert math.isnan(snapshot_token_row["intel_per_m_output"])
    snapshot_output_million_tokens = (21_000_000.0 + 105) / 1e6
    assert snapshot_token_row["output_mtokens"] == pytest.approx(snapshot_output_million_tokens)
    assert snapshot_token_row["eff_speed"] == pytest.approx(
        snapshot_token_row["output_speed"] / (snapshot_output_million_tokens / 21.0)
    )
    assert bool(snapshot_token_row["is_absent_from_accepted_embedded_model_catalog_partition"])

    # 300：哪里都没有 → 来源 None，非当期，eff_speed NaN
    value_missing_row = _row_for_synthetic_model_index(models_dataframe, 300)
    assert math.isnan(value_missing_row["cost_to_run"])
    assert value_missing_row["cost_to_run_value_source"] is None
    assert value_missing_row["output_token_count_value_source"] is None
    assert not bool(value_missing_row["cost_to_run_value_is_from_current_intelligence_index_version"])
    assert math.isnan(value_missing_row["eff_speed"])
    assert value_missing_row["artificial_analysis_intelligence_index_is_estimated"] is None


def test_build_dataframe_blended_price_source_column(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
) -> None:
    models_dataframe = fetch_data.build_dataframe(refresh=False)
    cache_hit_row = _row_for_synthetic_model_index(models_dataframe, 3)
    assert cache_hit_row["blended_price_cache_input_output_7_to_2_to_1"] == pytest.approx(1.4)
    assert (
        cache_hit_row["blended_price_cache_hit_price_source"]
        == fetch_data.BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_API_CACHE_HIT_PRICE
    )
    input_as_cache_hit_row = _row_for_synthetic_model_index(models_dataframe, 4)
    assert input_as_cache_hit_row["blended_price_cache_input_output_7_to_2_to_1"] == pytest.approx(2.1)
    assert (
        input_as_cache_hit_row["blended_price_cache_hit_price_source"]
        == fetch_data.BLENDED_PRICE_CACHE_HIT_PRICE_SOURCE_COMPUTED_WITH_INPUT_PRICE_AS_CACHE_HIT_PRICE
    )
    missing_output_price_row = _row_for_synthetic_model_index(models_dataframe, 1)
    assert math.isnan(missing_output_price_row["blended_price_cache_input_output_7_to_2_to_1"])
    assert missing_output_price_row["blended_price_cache_hit_price_source"] is None


def test_build_dataframe_records_data_provenance_and_guardrail_results_in_attrs(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
) -> None:
    models_dataframe = fetch_data.build_dataframe(refresh=False)
    artificial_analysis_data_provenance = models_dataframe.attrs[
        fetch_data.MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE
    ]
    assert artificial_analysis_data_provenance["artificial_analysis_api_response_fetched_at_utc"] == (
        SYNTHETIC_API_RESPONSE_FETCHED_AT_UTC
    )
    assert artificial_analysis_data_provenance["artificial_analysis_api_intelligence_index_version"] == "4.3.2"
    assert artificial_analysis_data_provenance["artificial_analysis_api_tier"] == "free"
    assert artificial_analysis_data_provenance["current_intelligence_index_version"] == "4.3.2"
    assert artificial_analysis_data_provenance["embedded_model_catalog_intelligence_index_version"] == "4.3.2"
    assert artificial_analysis_data_provenance["embedded_model_catalog_captured_at_utc"] == (
        "2026-09-23T05:52:00Z"
    )
    assert artificial_analysis_data_provenance["artificial_analysis_website_page_fetch_paused"] is True
    assert artificial_analysis_data_provenance[
        "reference_output_million_tokens_for_effective_speed_normalization_by_intelligence_index_version_family"
    ] == {"4.3": 87.0, "4.1": 21.0}
    assert artificial_analysis_data_provenance["artificial_analysis_attribution_url"] == (
        "https://artificialanalysis.ai/"
    )
    guardrail_results = models_dataframe.attrs[
        fetch_data.MODELS_DATAFRAME_ATTRS_KEY_DATA_QUALITY_GUARDRAIL_RESULTS
    ]
    assert all(
        guardrail_result["guardrail_status"] != fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_FAILED
        for guardrail_result in guardrail_results
    )
    # 列表页 snake_case 解析 0 条 → 告警（不失败）
    assert any(
        guardrail_result["guardrail_status"] == fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY
        for guardrail_result in guardrail_results
    )


def test_legacy_api_cache_infers_current_version_from_accepted_catalog_partition(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
    capsys: pytest.CaptureFixture[str],
) -> None:
    _write_synthetic_api_language_models_cache(
        synthetic_artificial_analysis_cache_layout.api_language_models_cache_path,
        include_response_metadata=False,
    )
    models_dataframe = fetch_data.build_dataframe(refresh=False)
    artificial_analysis_data_provenance = models_dataframe.attrs[
        fetch_data.MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE
    ]
    assert artificial_analysis_data_provenance["current_intelligence_index_version"] == "4.3.2"
    assert artificial_analysis_data_provenance["artificial_analysis_api_intelligence_index_version"] is None
    assert (
        artificial_analysis_data_provenance["artificial_analysis_api_response_fetched_at_utc_source"]
        == fetch_data.API_RESPONSE_FETCHED_AT_UTC_SOURCE_INFERRED_FROM_CACHE_FILE_MODIFICATION_TIME
    )
    assert "API 缓存缺少 intelligence_index_version，按目录分区版本推定" in capsys.readouterr().out
    assert _row_for_synthetic_model_index(models_dataframe, 5)[
        "cost_to_run_value_intelligence_index_version"
    ] == "4.3.2"


# ----------------------------------------------------------------------------- 回退：models.csv 改显式开关
def _write_previous_run_processed_models_csv(processed_directory_path: Path) -> None:
    processed_directory_path.mkdir(parents=True, exist_ok=True)
    pd.DataFrame(
        [
            {
                "id": synthetic_artificial_analysis_model_uuid(300),
                "intelligence": _synthetic_intelligence_index(300),
                "cost_to_run": 999.0,
                "intel_per_m_output": _synthetic_intelligence_index(300) / 4.0,
            }
        ]
    ).to_csv(processed_directory_path / "models.csv", index=False)


def test_previous_run_processed_models_csv_is_not_read_by_default(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
) -> None:
    _write_previous_run_processed_models_csv(
        synthetic_artificial_analysis_cache_layout.processed_directory_path
    )
    models_dataframe = fetch_data.build_dataframe(refresh=False)
    assert math.isnan(_row_for_synthetic_model_index(models_dataframe, 300)["cost_to_run"])


def test_previous_run_processed_models_csv_fallback_requires_explicit_switch_and_has_unknown_version(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
    capsys: pytest.CaptureFixture[str],
) -> None:
    _write_previous_run_processed_models_csv(
        synthetic_artificial_analysis_cache_layout.processed_directory_path
    )
    models_dataframe = fetch_data.build_dataframe(
        refresh=False,
        use_previous_run_processed_models_csv_as_fallback=True,
    )
    previous_run_row = _row_for_synthetic_model_index(models_dataframe, 300)
    assert previous_run_row["cost_to_run"] == pytest.approx(999.0)
    assert (
        previous_run_row["cost_to_run_value_source"]
        == fetch_data.COST_TO_RUN_VALUE_SOURCE_PREVIOUS_RUN_PROCESSED_MODELS_CSV
    )
    assert previous_run_row["cost_to_run_value_intelligence_index_version"] is None
    assert not bool(previous_run_row["cost_to_run_value_is_from_current_intelligence_index_version"])
    assert (
        previous_run_row["output_token_count_value_source"]
        == fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_PREVIOUS_RUN_PROCESSED_MODELS_CSV
    )
    assert previous_run_row["output_mtokens"] == pytest.approx(4.0)
    # token 版本未知 → 没有归一常数 → eff_speed NaN，并汇总告警一次
    assert math.isnan(previous_run_row["eff_speed"])
    assert capsys.readouterr().out.count("有效速度") >= 1


# ----------------------------------------------------------------------------- 显式开启网页抓取
def test_allowed_page_fetch_fetches_only_rows_lacking_current_tokens_then_reloads_catalog(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    model_detail_page_html_cache_directory_path = (
        synthetic_artificial_analysis_cache_layout.model_detail_page_html_cache_directory_path
    )
    for cached_page_path in model_detail_page_html_cache_directory_path.glob("*.html"):
        cached_page_path.unlink()
    # 只剩一页旧版本（v4.1、智能分对不上）的缓存 → 没有被接受的分区
    stale_embedded_model_objects = [
        build_synthetic_artificial_analysis_embedded_model_object(
            model_id=synthetic_artificial_analysis_model_uuid(synthetic_model_index),
            slug=f"synthetic-model-{synthetic_model_index}",
            name=f"Synthetic Model {synthetic_model_index}",
            intelligence_index=_synthetic_intelligence_index(synthetic_model_index) - 9.0,
            canonical_output_token_count=123.0,
        )
        for synthetic_model_index in range(SYNTHETIC_CATALOG_MODEL_COUNT)
    ]
    (model_detail_page_html_cache_directory_path / "synthetic-stale.html").write_text(
        build_synthetic_artificial_analysis_model_detail_page_html(
            embedded_model_objects=stale_embedded_model_objects,
            intelligence_index_version_strings=("4.1",),
        ),
        encoding="utf-8",
    )
    current_page_html = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=_synthetic_catalog_embedded_model_objects(),
        current_model_object=_synthetic_catalog_embedded_model_objects()[0],
    )
    requested_page_urls: list[str] = []

    class _FakePageResponse:
        text = current_page_html

        def raise_for_status(self) -> None:
            return None

    def fake_requests_get(url, **keyword_arguments):
        if not url.startswith(fetch_data.PAGE_URL + "/"):
            raise _NetworkRequestAttemptedError(f"只应请求详情页: {url}")
        requested_page_urls.append(url)
        return _FakePageResponse()

    monkeypatch.setattr(fetch_data.requests, "get", fake_requests_get)

    models_dataframe = fetch_data.build_dataframe(
        refresh=False,
        allow_artificial_analysis_website_page_fetch=True,
    )

    # 缺当期 token、且智能/速度/成本齐全的行：0..49（API 或快照成本）+ 100..119（快照成本）+ 400..519（API 成本）
    expected_requested_slugs = sorted(
        f"synthetic-model-{synthetic_model_index}"
        for synthetic_model_index in list(range(0, 50)) + list(range(100, 120)) + list(range(400, 520))
    )
    assert sorted(url.rsplit("/", 1)[1] for url in requested_page_urls) == expected_requested_slugs
    refreshed_row = _row_for_synthetic_model_index(models_dataframe, 5)
    assert (
        refreshed_row["output_token_count_value_source"]
        == fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_ACCEPTED_PARTITION
    )
    assert models_dataframe.attrs[
        fetch_data.MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE
    ]["artificial_analysis_website_page_fetch_paused"] is False


# ----------------------------------------------------------------------------- 护栏
def _synthetic_models_dataframe_for_guardrail_checks(
    *,
    total_model_count: int = 673,
    current_api_cost_count: int = 151,
    non_current_fallback_cost_count: int = 0,
) -> pd.DataFrame:
    guardrail_check_rows = []
    for synthetic_model_index in range(total_model_count):
        if synthetic_model_index < current_api_cost_count:
            cost_to_run = 10.0 + synthetic_model_index
            cost_to_run_value_source = (
                fetch_data.COST_TO_RUN_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_API_CURRENT_RESPONSE
            )
        elif synthetic_model_index < current_api_cost_count + non_current_fallback_cost_count:
            cost_to_run = 5.0 + synthetic_model_index
            cost_to_run_value_source = (
                fetch_data.COST_TO_RUN_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT
            )
        else:
            cost_to_run = math.nan
            cost_to_run_value_source = None
        guardrail_check_rows.append(
            {
                "id": synthetic_artificial_analysis_model_uuid(synthetic_model_index),
                "name": f"Synthetic Model {synthetic_model_index}",
                "cost_to_run": cost_to_run,
                "cost_to_run_value_source": cost_to_run_value_source,
                "cost_to_run_value_is_from_current_intelligence_index_version": (
                    cost_to_run_value_source
                    == fetch_data.COST_TO_RUN_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_API_CURRENT_RESPONSE
                ),
            }
        )
    return pd.DataFrame(guardrail_check_rows)


def test_validate_passes_with_only_151_current_api_costs_and_the_rest_missing() -> None:
    guardrail_results = fetch_data._validate(_synthetic_models_dataframe_for_guardrail_checks())
    assert guardrail_results
    assert all(
        guardrail_result.guardrail_status != fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_FAILED
        for guardrail_result in guardrail_results
    )


def test_validate_fails_without_any_current_api_cost() -> None:
    with pytest.raises(fetch_data.ArtificialAnalysisDataQualityGuardrailViolationError):
        fetch_data._validate(
            _synthetic_models_dataframe_for_guardrail_checks(
                current_api_cost_count=0, non_current_fallback_cost_count=200
            )
        )


def test_validate_non_current_fallback_cost_share_above_maximum_only_warns() -> None:
    """R1-04：「非当期回退成本占比 ≤ 0.70」降为 warning_only（D-1 已保证非当期值不参与分析）。"""
    guardrail_results = fetch_data._validate(
        _synthetic_models_dataframe_for_guardrail_checks(
            current_api_cost_count=150, non_current_fallback_cost_count=400
        )
    )
    guardrail_status_by_name = {
        guardrail_result.guardrail_name: guardrail_result.guardrail_status
        for guardrail_result in guardrail_results
    }
    assert guardrail_status_by_name["non_current_fallback_cost_to_run_share_at_most_maximum"] == (
        fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY
    )


def test_validate_fails_below_minimum_api_model_count() -> None:
    with pytest.raises(fetch_data.ArtificialAnalysisDataQualityGuardrailViolationError):
        fetch_data._validate(
            _synthetic_models_dataframe_for_guardrail_checks(total_model_count=499)
        )


def test_validate_catalog_vs_api_agreement_below_99_percent_only_warns_but_family_mismatch_fails(
    tmp_path: Path,
) -> None:
    """R1-01 (a)：V-2 之后目录成本不是值来源 → 成本一致率护栏 warning_only；分区级智能一致率只作诊断，

    <99% 告警（逐 UUID 判定当期）；API 与被接受分区的版本 family 不一致仍判失败。"""
    _write_synthetic_catalog_detail_page(tmp_path, "synthetic-model-0.html")
    agreeing_catalog_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path,
            {
                synthetic_artificial_analysis_model_uuid(synthetic_model_index): _synthetic_intelligence_index(
                    synthetic_model_index
                )
                for synthetic_model_index in range(SYNTHETIC_CATALOG_MODEL_COUNT)
            },
            "4.3.2",
        )
    )
    assert agreeing_catalog_load_result.accepted_partition_intelligence_index_version == "4.3.2"
    guardrail_check_dataframe = _synthetic_models_dataframe_for_guardrail_checks()
    fetch_data._validate(
        guardrail_check_dataframe,
        embedded_model_catalog_load_result=agreeing_catalog_load_result,
        api_response_metadata={"intelligence_index_version": "4.3.2"},
    )
    drifted_guardrail_results = fetch_data._validate(
        guardrail_check_dataframe,
        embedded_model_catalog_load_result=dataclasses.replace(
            agreeing_catalog_load_result,
            catalog_vs_api_cost_agreement_rate=0.7,
            catalog_vs_api_cost_compared_model_count=100,
            catalog_vs_api_intelligence_agreement_rate=0.979,
            catalog_vs_api_intelligence_compared_model_count=100,
        ),
    )
    drifted_guardrail_status_by_name = {
        guardrail_result.guardrail_name: guardrail_result.guardrail_status
        for guardrail_result in drifted_guardrail_results
    }
    assert drifted_guardrail_status_by_name["embedded_model_catalog_vs_api_cost_to_run_agreement_rate"] == (
        fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY
    )
    assert drifted_guardrail_status_by_name["embedded_model_catalog_vs_api_intelligence_agreement_rate"] == (
        fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY
    )
    with pytest.raises(fetch_data.ArtificialAnalysisDataQualityGuardrailViolationError):
        fetch_data._validate(
            guardrail_check_dataframe,
            embedded_model_catalog_load_result=agreeing_catalog_load_result,
            api_response_metadata={"intelligence_index_version": "4.4"},
        )


# ----------------------------------------------------------------------------- R1-04：API 当期成本条数骤降护栏
def _write_api_language_models_response_history_file(
    response_history_directory_path: Path,
    history_file_name: str,
    *,
    api_cost_row_count: int,
    total_row_count: int = 600,
) -> None:
    response_history_directory_path.mkdir(parents=True, exist_ok=True)
    (response_history_directory_path / history_file_name).write_text(
        json.dumps(
            {
                "data": [
                    {
                        "id": synthetic_artificial_analysis_model_uuid(synthetic_model_index),
                        "artificial_analysis_intelligence_index_cost": (
                            {"total_cost": 10.0 + synthetic_model_index}
                            if synthetic_model_index < api_cost_row_count
                            else None
                        ),
                    }
                    for synthetic_model_index in range(total_row_count)
                ]
            }
        ),
        encoding="utf-8",
    )


def _guardrail_result_by_name(guardrail_results) -> dict:
    return {guardrail_result.guardrail_name: guardrail_result for guardrail_result in guardrail_results}


CURRENT_API_COST_COUNT_COLLAPSE_GUARDRAIL_NAME = (
    "current_artificial_analysis_api_cost_to_run_value_count_not_collapsed_versus_previous_guardrail_passed_response"
)


def test_validate_fails_when_current_api_cost_count_drops_over_30_percent_versus_previous_passed_response(
    tmp_path: Path,
) -> None:
    response_history_directory_path = tmp_path / "artificial_analysis_api_language_models_response_history"
    _write_api_language_models_response_history_file(
        response_history_directory_path,
        "artificial_analysis_api_language_models_response_fetched_at_20260923T055032Z.json",
        api_cost_row_count=220,
    )
    api_response_metadata = {"fetched_at_utc": "2026-09-30T00:00:00Z"}
    # 220 → 160：降 27.3%，通过
    passing_guardrail_results = fetch_data._validate(
        _synthetic_models_dataframe_for_guardrail_checks(current_api_cost_count=160),
        api_response_metadata=api_response_metadata,
        api_language_models_response_history_directory=response_history_directory_path,
    )
    passing_guardrail_result = _guardrail_result_by_name(passing_guardrail_results)[
        CURRENT_API_COST_COUNT_COLLAPSE_GUARDRAIL_NAME
    ]
    assert passing_guardrail_result.guardrail_status == fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_PASSED
    assert "220" in passing_guardrail_result.guardrail_detail_text
    # 220 → 151：降 31.4% > 30%，失败
    with pytest.raises(fetch_data.ArtificialAnalysisDataQualityGuardrailViolationError, match="骤降"):
        fetch_data._validate(
            _synthetic_models_dataframe_for_guardrail_checks(current_api_cost_count=151),
            api_response_metadata=api_response_metadata,
            api_language_models_response_history_directory=response_history_directory_path,
        )


def test_validate_ignores_rejected_pending_and_same_response_history_files_when_choosing_baseline(
    tmp_path: Path,
) -> None:
    response_history_directory_path = tmp_path / "artificial_analysis_api_language_models_response_history"
    _write_api_language_models_response_history_file(
        response_history_directory_path,
        "artificial_analysis_api_language_models_response_fetched_at_20260901T000000Z.json",
        api_cost_row_count=160,
    )
    for ignored_history_file_name in (
        # 护栏失败的响应、尚待护栏校验的响应、本次响应自身（同一抓取时间）都不能当基线
        "artificial_analysis_api_language_models_response_fetched_at_20260920T000000Z"
        "_rejected_by_data_quality_guardrails.json",
        "artificial_analysis_api_language_models_response_fetched_at_20260925T000000Z"
        "_pending_data_quality_guardrail_validation.json",
        "artificial_analysis_api_language_models_response_fetched_at_20260930T000000Z.json",
    ):
        _write_api_language_models_response_history_file(
            response_history_directory_path, ignored_history_file_name, api_cost_row_count=500
        )
    guardrail_result = _guardrail_result_by_name(
        fetch_data._validate(
            _synthetic_models_dataframe_for_guardrail_checks(current_api_cost_count=151),
            api_response_metadata={"fetched_at_utc": "2026-09-30T00:00:00Z"},
            api_language_models_response_history_directory=response_history_directory_path,
        )
    )[CURRENT_API_COST_COUNT_COLLAPSE_GUARDRAIL_NAME]
    assert guardrail_result.guardrail_status == fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_PASSED
    assert "20260901T000000Z" in guardrail_result.guardrail_detail_text


def test_validate_uses_absolute_minimum_of_100_current_api_costs_without_comparable_previous_response(
    tmp_path: Path,
) -> None:
    for history_directory_argument in (None, tmp_path / "empty-response-history"):
        guardrail_result = _guardrail_result_by_name(
            fetch_data._validate(
                _synthetic_models_dataframe_for_guardrail_checks(current_api_cost_count=100),
                api_language_models_response_history_directory=history_directory_argument,
            )
        )[CURRENT_API_COST_COUNT_COLLAPSE_GUARDRAIL_NAME]
        assert guardrail_result.guardrail_status == fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_PASSED
        assert "100" in guardrail_result.guardrail_detail_text
        with pytest.raises(fetch_data.ArtificialAnalysisDataQualityGuardrailViolationError):
            fetch_data._validate(
                _synthetic_models_dataframe_for_guardrail_checks(current_api_cost_count=99),
                api_language_models_response_history_directory=history_directory_argument,
            )


# ----------------------------------------------------------------------------- 有效速度常数与版本化快照
def test_effective_speed_normalization_constants_by_version_family() -> None:
    assert (
        fetch_data.REFERENCE_OUTPUT_MILLION_TOKENS_FOR_EFFECTIVE_SPEED_NORMALIZATION_BY_INTELLIGENCE_INDEX_VERSION_FAMILY
        == {"4.3": 87.0, "4.1": 21.0}
    )


VERSIONED_FALLBACK_SNAPSHOT_EXPECTED_COLUMN_NAMES = [
    "id",
    "name",
    "intelligence_index_version",
    "captured_at_date",
    "cost_to_run_usd",
    "intelligence_index_canonical_output_token_count",
]


def test_committed_versioned_fallback_snapshot_stores_raw_token_counts_with_version() -> None:
    committed_snapshot_path = (
        REPOSITORY_ROOT_DIRECTORY_PATH
        / "data"
        / "reference"
        / "artificial_analysis_intelligence_index_v4_1_cost_to_run_and_canonical_output_token_count_fallback_snapshot_captured_2026_07_01.csv"
    )
    assert committed_snapshot_path == (
        fetch_data.ARTIFICIAL_ANALYSIS_INTELLIGENCE_INDEX_V4_1_COST_TO_RUN_AND_CANONICAL_OUTPUT_TOKEN_COUNT_FALLBACK_SNAPSHOT_PATH
    )
    committed_snapshot = pd.read_csv(committed_snapshot_path, dtype={"intelligence_index_version": str})
    assert list(committed_snapshot.columns) == VERSIONED_FALLBACK_SNAPSHOT_EXPECTED_COLUMN_NAMES
    assert len(committed_snapshot) == 377
    assert set(committed_snapshot["intelligence_index_version"]) == {"4.1"}
    assert set(committed_snapshot["captured_at_date"]) == {"2026-07-01"}
    assert int(committed_snapshot["cost_to_run_usd"].notna().sum()) == 296
    assert int(committed_snapshot["intelligence_index_canonical_output_token_count"].notna().sum()) == 377
    median_output_million_tokens = (
        committed_snapshot["intelligence_index_canonical_output_token_count"].median() / 1e6
    )
    assert median_output_million_tokens == pytest.approx(21.24, abs=0.01)
    legacy_snapshot_path = (
        REPOSITORY_ROOT_DIRECTORY_PATH
        / "data"
        / "reference"
        / "artificial_analysis_intelligence_index_cost_and_output_token_fallback_snapshot.csv"
    )
    assert not legacy_snapshot_path.exists()


def test_load_fallbacks_reads_committed_snapshot_only_by_default(
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    poisoned_processed_directory_path = tmp_path / "processed"
    poisoned_processed_directory_path.mkdir()
    (poisoned_processed_directory_path / "models.csv").write_text("这不是 CSV\x00", encoding="utf-8")
    monkeypatch.setattr(fetch_data, "PROCESSED", poisoned_processed_directory_path)

    fallback_values = fetch_data.load_cost_and_output_token_fallbacks()

    assert len(fallback_values.cost_to_run_fallback_value_by_model_id) == 296
    assert len(fallback_values.canonical_output_token_count_fallback_value_by_model_id) == 377
    any_cost_fallback_value = next(
        iter(fallback_values.cost_to_run_fallback_value_by_model_id.values())
    )
    assert (
        any_cost_fallback_value.value_source
        == fetch_data.COST_TO_RUN_VALUE_SOURCE_VERSIONED_NON_CURRENT_FALLBACK_SNAPSHOT
    )
    assert any_cost_fallback_value.intelligence_index_version == "4.1"
    assert any_cost_fallback_value.fetched_at_utc == "2026-07-01"


CONVERSION_SCRIPT_PATH = (
    REPOSITORY_ROOT_DIRECTORY_PATH
    / "scripts"
    / "convert_legacy_intelligence_per_million_output_token_fallback_snapshot_to_raw_token_counts.py"
)


def test_conversion_script_derives_raw_token_counts_from_intelligence_and_ratio(tmp_path: Path) -> None:
    legacy_snapshot_path = tmp_path / "legacy_snapshot.csv"
    pd.DataFrame(
        [
            {"id": "synthetic-a", "name": "Synthetic A", "cost_to_run": 12.5, "intel_per_m_output": 2.0},
            {"id": "synthetic-b", "name": "Synthetic B", "cost_to_run": None, "intel_per_m_output": 4.0},
        ]
    ).to_csv(legacy_snapshot_path, index=False)
    api_response_path = tmp_path / "api_language_models_free.json"
    api_response_path.write_text(
        json.dumps(
            {
                "data": [
                    {"id": "synthetic-a", "evaluations": {"artificial_analysis_intelligence_index": 30.0}},
                    {"id": "synthetic-b", "evaluations": {"artificial_analysis_intelligence_index": 10}},
                ]
            }
        ),
        encoding="utf-8",
    )
    converted_snapshot_path = tmp_path / "converted_snapshot.csv"

    completed_process = subprocess.run(
        [
            sys.executable,
            str(CONVERSION_SCRIPT_PATH),
            "--legacy-snapshot-csv",
            str(legacy_snapshot_path),
            "--api-language-models-response-json",
            str(api_response_path),
            "--converted-snapshot-csv",
            str(converted_snapshot_path),
        ],
        cwd=REPOSITORY_ROOT_DIRECTORY_PATH,
        capture_output=True,
        text=True,
        check=False,
    )

    assert completed_process.returncode == 0, completed_process.stderr
    converted_snapshot = pd.read_csv(converted_snapshot_path, dtype={"intelligence_index_version": str})
    assert list(converted_snapshot.columns) == VERSIONED_FALLBACK_SNAPSHOT_EXPECTED_COLUMN_NAMES
    assert converted_snapshot["intelligence_index_canonical_output_token_count"].tolist() == [
        15_000_000,
        2_500_000,
    ]
    assert converted_snapshot["cost_to_run_usd"].iloc[0] == pytest.approx(12.5)
    assert math.isnan(converted_snapshot["cost_to_run_usd"].iloc[1])
    assert set(converted_snapshot["intelligence_index_version"]) == {"4.1"}
    assert set(converted_snapshot["captured_at_date"]) == {"2026-07-01"}


# ----------------------------------------------------------------------------- 刷新：护栏通过后才替换共享缓存（R1-02）
def _fake_refreshed_api_response_rows_and_metadata(api_model_row_count: int):
    return lambda api_key: (
        [
            _synthetic_api_model_row(synthetic_model_index)
            for synthetic_model_index in range(api_model_row_count)
        ],
        {
            "source_url": fetch_data.API_LANGUAGE_MODELS_FREE_URL,
            "tier": "free",
            "intelligence_index_version": "4.3.2",
        },
    )


def _api_language_models_response_history_json_texts(
    cache_layout: SyntheticArtificialAnalysisCacheLayout,
) -> dict[str, str]:
    response_history_directory_path = (
        cache_layout.raw_directory_path / "artificial_analysis_api_language_models_response_history"
    )
    return {
        history_file_path.name: history_file_path.read_text(encoding="utf-8")
        for history_file_path in sorted(response_history_directory_path.glob("*.json"))
    }


def test_refresh_that_fails_guardrails_keeps_previous_api_cache_and_archives_it(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
    monkeypatch: pytest.MonkeyPatch,
    capsys: pytest.CaptureFixture[str],
) -> None:
    """刷新得到的新响应没过护栏时，共享缓存保持原样，旧缓存另有备份，离线重跑不被卡死。"""
    api_language_models_cache_path = (
        synthetic_artificial_analysis_cache_layout.api_language_models_cache_path
    )
    previous_api_cache_text = api_language_models_cache_path.read_text(encoding="utf-8")
    monkeypatch.setattr(fetch_data, "get_api_key", lambda: "synthetic-test-key")
    # 新响应只有 100 个模型 → 「API 模型数 ≥ 500」护栏失败
    monkeypatch.setattr(
        fetch_data,
        "_fetch_paginated_language_models_with_response_top_level_metadata",
        _fake_refreshed_api_response_rows_and_metadata(100),
    )

    with pytest.raises(fetch_data.ArtificialAnalysisDataQualityGuardrailViolationError):
        fetch_data.build_dataframe(refresh=True)

    assert api_language_models_cache_path.read_text(encoding="utf-8") == previous_api_cache_text
    response_history_json_texts = _api_language_models_response_history_json_texts(
        synthetic_artificial_analysis_cache_layout
    )
    assert previous_api_cache_text in response_history_json_texts.values(), "旧缓存没有备份进响应历史"
    assert any(
        len(json.loads(history_json_text)["data"]) == 100
        for history_json_text in response_history_json_texts.values()
    ), "没通过护栏的新响应也应留在响应历史里供排查"
    # R1-04 / 复验风险 8：护栏失败的响应在文件名上可区分，不会被后续刷新当作「上一份通过护栏的响应」
    rejected_history_file_names = [
        history_file_name
        for history_file_name, history_json_text in response_history_json_texts.items()
        if len(json.loads(history_json_text)["data"]) == 100
    ]
    assert len(rejected_history_file_names) == 1
    assert rejected_history_file_names[0].endswith("_rejected_by_data_quality_guardrails.json")
    assert "未替换" in capsys.readouterr().out

    monkeypatch.setattr(
        fetch_data,
        "_fetch_paginated_language_models_with_response_top_level_metadata",
        _requests_get_that_fails_if_called,
    )
    offline_models_dataframe = fetch_data.build_dataframe(refresh=False)
    assert len(offline_models_dataframe) == SYNTHETIC_API_MODEL_ROW_COUNT


def test_refresh_that_passes_guardrails_replaces_cache_and_archives_previous_cache(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    api_language_models_cache_path = (
        synthetic_artificial_analysis_cache_layout.api_language_models_cache_path
    )
    previous_api_cache_text = api_language_models_cache_path.read_text(encoding="utf-8")
    monkeypatch.setattr(fetch_data, "get_api_key", lambda: "synthetic-test-key")
    monkeypatch.setattr(
        fetch_data,
        "_fetch_paginated_language_models_with_response_top_level_metadata",
        _fake_refreshed_api_response_rows_and_metadata(SYNTHETIC_API_MODEL_ROW_COUNT + 1),
    )

    models_dataframe = fetch_data.build_dataframe(refresh=True)

    assert len(models_dataframe) == SYNTHETIC_API_MODEL_ROW_COUNT + 1
    replaced_api_cache = json.loads(api_language_models_cache_path.read_text(encoding="utf-8"))
    assert len(replaced_api_cache["data"]) == SYNTHETIC_API_MODEL_ROW_COUNT + 1
    assert previous_api_cache_text in _api_language_models_response_history_json_texts(
        synthetic_artificial_analysis_cache_layout
    ).values()
    leftover_temporary_file_names = sorted(
        cache_directory_entry.name
        for cache_directory_entry in api_language_models_cache_path.parent.iterdir()
        # 暂存的新响应（api_language_models.refreshed_response_pending_….json）与原子写的临时文件都不应残留
        if cache_directory_entry.name.startswith(api_language_models_cache_path.stem)
        and cache_directory_entry.name != api_language_models_cache_path.name
    )
    assert leftover_temporary_file_names == []
    response_history_file_names = list(
        _api_language_models_response_history_json_texts(synthetic_artificial_analysis_cache_layout)
    )
    assert len(response_history_file_names) == 2
    assert not any(
        history_file_name.endswith(
            ("_pending_data_quality_guardrail_validation.json", "_rejected_by_data_quality_guardrails.json")
        )
        for history_file_name in response_history_file_names
    )


def test_refresh_whose_current_api_cost_count_collapses_versus_previous_cache_fails_and_keeps_cache(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """旧缓存（归档为上一份通过护栏的响应）有 160 条 API 当期成本，新响应只剩 110 条（降 31%）→ 失败。"""
    api_language_models_cache_path = (
        synthetic_artificial_analysis_cache_layout.api_language_models_cache_path
    )
    previous_api_cache_text = api_language_models_cache_path.read_text(encoding="utf-8")

    def fetch_refreshed_rows_with_fifty_api_costs_removed(api_key):
        refreshed_rows, refreshed_metadata = _fake_refreshed_api_response_rows_and_metadata(
            SYNTHETIC_API_MODEL_ROW_COUNT
        )(api_key)
        for refreshed_row in refreshed_rows[400:450]:
            refreshed_row["artificial_analysis_intelligence_index_cost"] = None
        return refreshed_rows, refreshed_metadata

    monkeypatch.setattr(fetch_data, "get_api_key", lambda: "synthetic-test-key")
    monkeypatch.setattr(
        fetch_data,
        "_fetch_paginated_language_models_with_response_top_level_metadata",
        fetch_refreshed_rows_with_fifty_api_costs_removed,
    )
    with pytest.raises(fetch_data.ArtificialAnalysisDataQualityGuardrailViolationError, match="骤降"):
        fetch_data.build_dataframe(refresh=True)
    assert api_language_models_cache_path.read_text(encoding="utf-8") == previous_api_cache_text


def test_refresh_archives_legacy_cache_without_recorded_fetch_time_under_inferred_name(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    _write_synthetic_api_language_models_cache(
        synthetic_artificial_analysis_cache_layout.api_language_models_cache_path,
        include_response_metadata=False,
    )
    legacy_api_cache_text = (
        synthetic_artificial_analysis_cache_layout.api_language_models_cache_path.read_text(
            encoding="utf-8"
        )
    )
    monkeypatch.setattr(fetch_data, "get_api_key", lambda: "synthetic-test-key")
    monkeypatch.setattr(
        fetch_data,
        "_fetch_paginated_language_models_with_response_top_level_metadata",
        _fake_refreshed_api_response_rows_and_metadata(SYNTHETIC_API_MODEL_ROW_COUNT),
    )
    fetch_data.build_dataframe(refresh=True)
    archived_legacy_cache_file_names = [
        history_file_name
        for history_file_name, history_json_text in _api_language_models_response_history_json_texts(
            synthetic_artificial_analysis_cache_layout
        ).items()
        if history_json_text == legacy_api_cache_text
    ]
    assert archived_legacy_cache_file_names == [
        "artificial_analysis_api_language_models_response_fetched_at_20260923T055032Z"
        "_inferred_from_cache_file_modification_time.json"
    ]


def test_interleaved_refresh_rejected_by_guardrails_cannot_be_promoted_by_concurrent_passing_refresh(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """RVF-001：两次 `--refresh` 交错时，刷新 A 晋升进共享缓存的只能是 A 自己通过护栏的响应。

    内存交错复现：刷新 A 写完暂存、进入护栏校验时，刷新 B 完整跑一遍（写自己的暂存 → 护栏拒绝）；
    随后 A 护栏通过并晋升。暂存路径若被所有刷新共用，A 会把 B 被拒的响应装进缓存。
    """
    api_language_models_cache_path = (
        synthetic_artificial_analysis_cache_layout.api_language_models_cache_path
    )
    refresh_a_api_model_row_count_that_passes_guardrails = SYNTHETIC_API_MODEL_ROW_COUNT + 1
    # 100 个模型 → 「API 模型数 ≥ 500」护栏失败
    refresh_b_api_model_row_count_rejected_by_guardrails = 100
    successive_refresh_api_model_row_counts = iter(
        [
            refresh_a_api_model_row_count_that_passes_guardrails,
            refresh_b_api_model_row_count_rejected_by_guardrails,
        ]
    )

    def fetch_refresh_a_then_refresh_b_api_response(api_key):
        return _fake_refreshed_api_response_rows_and_metadata(
            next(successive_refresh_api_model_row_counts)
        )(api_key)

    # 两次刷新的抓取时间落在不同秒，避免响应历史文件名相撞（本用例只考察缓存暂存文件）
    successive_refresh_fetched_at_datetimes_utc = iter(
        [
            datetime(2026, 9, 24, 0, 0, 0, tzinfo=timezone.utc),
            datetime(2026, 9, 24, 0, 0, 5, tzinfo=timezone.utc),
        ]
    )

    class _DatetimeWithSuccessiveRefreshFetchedAtTimes(datetime):
        @classmethod
        def now(cls, tz=None):
            return next(successive_refresh_fetched_at_datetimes_utc)

    real_validate = fetch_data._validate
    refresh_b_guardrail_violation_errors: list[Exception] = []

    def validate_with_refresh_b_running_to_completion_inside_refresh_a_validation(
        models_dataframe, **keyword_arguments
    ):
        if len(models_dataframe) == refresh_a_api_model_row_count_that_passes_guardrails:
            try:
                fetch_data.build_dataframe(refresh=True)
            except fetch_data.ArtificialAnalysisDataQualityGuardrailViolationError as guardrail_violation_error:
                refresh_b_guardrail_violation_errors.append(guardrail_violation_error)
        return real_validate(models_dataframe, **keyword_arguments)

    monkeypatch.setattr(fetch_data, "datetime", _DatetimeWithSuccessiveRefreshFetchedAtTimes)
    monkeypatch.setattr(fetch_data, "get_api_key", lambda: "synthetic-test-key")
    monkeypatch.setattr(
        fetch_data,
        "_fetch_paginated_language_models_with_response_top_level_metadata",
        fetch_refresh_a_then_refresh_b_api_response,
    )
    monkeypatch.setattr(
        fetch_data, "_validate", validate_with_refresh_b_running_to_completion_inside_refresh_a_validation
    )

    refresh_a_models_dataframe = fetch_data.build_dataframe(refresh=True)

    assert len(refresh_b_guardrail_violation_errors) == 1, "刷新 B 应被护栏拒绝"
    assert len(refresh_a_models_dataframe) == refresh_a_api_model_row_count_that_passes_guardrails
    promoted_api_cache = json.loads(api_language_models_cache_path.read_text(encoding="utf-8"))
    assert len(promoted_api_cache["data"]) == refresh_a_api_model_row_count_that_passes_guardrails, (
        "共享缓存被装入了刷新 B 被护栏拒绝的响应"
    )
    assert promoted_api_cache["fetched_at_utc"] == "2026-09-24T00:00:00Z"
    response_history_json_texts = _api_language_models_response_history_json_texts(
        synthetic_artificial_analysis_cache_layout
    )
    assert {
        history_file_name: len(json.loads(history_json_text)["data"])
        for history_file_name, history_json_text in response_history_json_texts.items()
    } == {
        "artificial_analysis_api_language_models_response_fetched_at_20260923T055032Z.json": (
            SYNTHETIC_API_MODEL_ROW_COUNT
        ),
        "artificial_analysis_api_language_models_response_fetched_at_20260924T000000Z.json": (
            refresh_a_api_model_row_count_that_passes_guardrails
        ),
        "artificial_analysis_api_language_models_response_fetched_at_20260924T000005Z"
        "_rejected_by_data_quality_guardrails.json": refresh_b_api_model_row_count_rejected_by_guardrails,
    }
    leftover_cache_sibling_file_names = sorted(
        cache_directory_entry.name
        for cache_directory_entry in api_language_models_cache_path.parent.iterdir()
        if cache_directory_entry.name.startswith(api_language_models_cache_path.stem)
        and cache_directory_entry.name != api_language_models_cache_path.name
    )
    assert leftover_cache_sibling_file_names == [], "各次刷新的暂存文件在晋升或被拒后都不应残留"


# ----------------------------------------------------------------------------- 列表页不再随开关联网（R3-F3）
def test_build_dataframe_never_requests_models_list_page_even_when_page_fetch_allowed(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """列表页已不是值来源：缓存缺失时只让护栏记「告警」，不发列表页请求（D-12 最小化抓取）。"""
    synthetic_artificial_analysis_cache_layout.raw_directory_path.joinpath("models_page.html").unlink()
    requested_urls: list[str] = []

    def fake_requests_get_recording_every_url(url, **keyword_arguments):
        requested_urls.append(url)
        raise fetch_data.requests.ConnectionError(f"合成的连接失败 {url}")

    monkeypatch.setattr(fetch_data.requests, "get", fake_requests_get_recording_every_url)
    models_dataframe = fetch_data.build_dataframe(
        refresh=False,
        allow_artificial_analysis_website_page_fetch=True,
    )
    assert fetch_data.PAGE_URL not in requested_urls
    assert all(requested_url.startswith(fetch_data.PAGE_URL + "/") for requested_url in requested_urls)
    list_page_guardrail_results = [
        guardrail_result
        for guardrail_result in models_dataframe.attrs[
            fetch_data.MODELS_DATAFRAME_ATTRS_KEY_DATA_QUALITY_GUARDRAIL_RESULTS
        ]
        if guardrail_result["guardrail_name"]
        == "artificial_analysis_models_list_page_snake_case_cost_record_count"
    ]
    assert [guardrail_result["guardrail_status"] for guardrail_result in list_page_guardrail_results] == [
        fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY
    ]


# ----------------------------------------------------------------------------- 原始数据目录可重定向（R1-07）
def test_build_dataframe_reads_and_refreshes_only_inside_requested_raw_data_directory(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
    tmp_path: Path,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    import shutil

    rehearsal_raw_data_directory_path = tmp_path / "rehearsal-copy-of-raw-data-directory"
    shutil.copytree(
        synthetic_artificial_analysis_cache_layout.raw_directory_path,
        rehearsal_raw_data_directory_path,
        copy_function=shutil.copy2,
    )
    rehearsal_api_cache_path = rehearsal_raw_data_directory_path / "api_language_models.json"
    rehearsal_api_cache = json.loads(rehearsal_api_cache_path.read_text(encoding="utf-8"))
    rehearsal_api_cache["fetched_at_utc"] = "2026-09-24T01:02:03Z"
    rehearsal_api_cache_path.write_text(json.dumps(rehearsal_api_cache), encoding="utf-8")
    default_api_cache_text = synthetic_artificial_analysis_cache_layout.api_language_models_cache_path.read_text(
        encoding="utf-8"
    )

    offline_models_dataframe = fetch_data.build_dataframe(
        refresh=False,
        artificial_analysis_raw_data_directory=rehearsal_raw_data_directory_path,
    )
    assert offline_models_dataframe.attrs[
        fetch_data.MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE
    ]["artificial_analysis_api_response_fetched_at_utc"] == "2026-09-24T01:02:03Z"
    assert offline_models_dataframe.attrs[
        fetch_data.MODELS_DATAFRAME_ATTRS_KEY_EMBEDDED_MODEL_CATALOG_LOAD_SUMMARY
    ]["cache_directory"] == str(
        rehearsal_raw_data_directory_path / "artificial_analysis_model_detail_page_html"
    )

    monkeypatch.setattr(fetch_data, "get_api_key", lambda: "synthetic-test-key")
    monkeypatch.setattr(
        fetch_data,
        "_fetch_paginated_language_models_with_response_top_level_metadata",
        _fake_refreshed_api_response_rows_and_metadata(SYNTHETIC_API_MODEL_ROW_COUNT + 2),
    )
    fetch_data.build_dataframe(
        refresh=True,
        artificial_analysis_raw_data_directory=rehearsal_raw_data_directory_path,
    )
    assert len(json.loads(rehearsal_api_cache_path.read_text(encoding="utf-8"))["data"]) == (
        SYNTHETIC_API_MODEL_ROW_COUNT + 2
    )
    assert synthetic_artificial_analysis_cache_layout.api_language_models_cache_path.read_text(
        encoding="utf-8"
    ) == default_api_cache_text
    assert not (
        synthetic_artificial_analysis_cache_layout.raw_directory_path
        / "artificial_analysis_api_language_models_response_history"
    ).exists()
    assert list(
        (rehearsal_raw_data_directory_path / "artificial_analysis_api_language_models_response_history").glob(
            "*.json"
        )
    )


def test_previous_run_processed_models_csv_fallback_reads_the_requested_path(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
    tmp_path: Path,
) -> None:
    requested_previous_run_directory_path = tmp_path / "requested-previous-run"
    _write_previous_run_processed_models_csv(requested_previous_run_directory_path)
    models_dataframe = fetch_data.build_dataframe(
        refresh=False,
        use_previous_run_processed_models_csv_as_fallback=True,
        previous_run_processed_models_csv_path=requested_previous_run_directory_path / "models.csv",
    )
    assert _row_for_synthetic_model_index(models_dataframe, 300)["cost_to_run"] == pytest.approx(999.0)


# ----------------------------------------------------------------------------- 「是否当期」按 family 比较（R3-F5）
def test_api_version_4_3_number_and_catalog_partition_4_3_2_keep_catalog_values_current(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
) -> None:
    """--refresh 之后的真实形态：API 顶层版本是数值 4.3，目录分区是 4.3.2，快照是 4.1。"""
    api_language_models_cache_path = (
        synthetic_artificial_analysis_cache_layout.api_language_models_cache_path
    )
    refreshed_shape_api_cache = json.loads(api_language_models_cache_path.read_text(encoding="utf-8"))
    refreshed_shape_api_cache["intelligence_index_version"] = 4.3
    api_language_models_cache_path.write_text(json.dumps(refreshed_shape_api_cache), encoding="utf-8")

    models_dataframe = fetch_data.build_dataframe(refresh=False)

    embedded_model_catalog_load_summary = models_dataframe.attrs[
        fetch_data.MODELS_DATAFRAME_ATTRS_KEY_EMBEDDED_MODEL_CATALOG_LOAD_SUMMARY
    ]
    assert embedded_model_catalog_load_summary["accepted_partition_intelligence_index_version"] == "4.3.2"
    catalog_row = _row_for_synthetic_model_index(models_dataframe, 5)
    assert catalog_row["output_token_count_value_intelligence_index_version"] == "4.3.2"
    assert bool(catalog_row["output_token_count_value_is_from_current_intelligence_index_version"])
    assert bool(catalog_row["cost_to_run_value_is_from_current_intelligence_index_version"])
    snapshot_row = _row_for_synthetic_model_index(models_dataframe, 110)
    assert snapshot_row["output_token_count_value_intelligence_index_version"] == "4.1"
    assert not bool(snapshot_row["output_token_count_value_is_from_current_intelligence_index_version"])
    assert not bool(snapshot_row["cost_to_run_value_is_from_current_intelligence_index_version"])
    assert fetch_data._value_is_from_current_intelligence_index_version("4.3.2", "4.3")
    assert not fetch_data._value_is_from_current_intelligence_index_version("4.1", "4.3")


# ----------------------------------------------------------------------------- 目录整体被拒不能静默（R1-03 / R4-01 的诊断部分）
def test_rejected_catalog_partition_is_reported_with_best_candidate_agreement_not_silently_skipped(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
) -> None:
    """API 升到新 family（4.4）→ 唯一的 4.3 分区被拒：护栏告警（R1-03 维持 warning_only），

    detail 写出最佳候选分区与拒绝原因；契约顶层溯源带一行醒目的拒绝告警文本。"""
    api_language_models_cache_path = (
        synthetic_artificial_analysis_cache_layout.api_language_models_cache_path
    )
    next_family_api_cache = json.loads(api_language_models_cache_path.read_text(encoding="utf-8"))
    next_family_api_cache["intelligence_index_version"] = 4.4
    api_language_models_cache_path.write_text(json.dumps(next_family_api_cache), encoding="utf-8")

    models_dataframe = fetch_data.build_dataframe(refresh=False)

    guardrail_results_by_name = {
        guardrail_result["guardrail_name"]: guardrail_result
        for guardrail_result in models_dataframe.attrs[
            fetch_data.MODELS_DATAFRAME_ATTRS_KEY_DATA_QUALITY_GUARDRAIL_RESULTS
        ]
    }
    catalog_partition_acceptance_guardrail_result = guardrail_results_by_name[
        "embedded_model_catalog_partition_accepted_when_structurally_valid_detail_pages_exist"
    ]
    assert catalog_partition_acceptance_guardrail_result["guardrail_status"] == (
        fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY
    )
    assert "family" in catalog_partition_acceptance_guardrail_result["guardrail_detail_text"]
    assert "当期 token 0 条" in catalog_partition_acceptance_guardrail_result["guardrail_detail_text"]
    partition_rejection_warning_text = models_dataframe.attrs[
        fetch_data.MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE
    ]["embedded_model_catalog_partition_rejection_warning_text"]
    assert partition_rejection_warning_text is not None
    assert "内嵌目录分区被拒" in partition_rejection_warning_text
    assert "4.4" in partition_rejection_warning_text
    assert "有效速度口径暂无当期可比点" in partition_rejection_warning_text


def test_partial_rescoring_keeps_partition_and_demotes_only_rescored_catalog_tokens(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
) -> None:
    """R1-01 (a)：65 个目录模型里 2 个被 AA 重评（API 智能分 +1）→ 分区仍被接受；

    这 2 个的目录 token 降为非当期（值来源仍记目录、版本如实写 4.3.2、记专门原因码），其余仍当期。"""
    api_language_models_cache_path = (
        synthetic_artificial_analysis_cache_layout.api_language_models_cache_path
    )
    rescored_api_cache = json.loads(api_language_models_cache_path.read_text(encoding="utf-8"))
    for api_model_row in rescored_api_cache["data"][:2]:
        api_model_row["evaluations"]["artificial_analysis_intelligence_index"] += 1.0
    api_language_models_cache_path.write_text(json.dumps(rescored_api_cache), encoding="utf-8")

    models_dataframe = fetch_data.build_dataframe(refresh=False)

    assert models_dataframe.attrs[fetch_data.MODELS_DATAFRAME_ATTRS_KEY_EMBEDDED_MODEL_CATALOG_LOAD_SUMMARY][
        "accepted_partition_intelligence_index_version"
    ] == "4.3.2"
    for rescored_model_index in (0, 1):
        rescored_row = _row_for_synthetic_model_index(models_dataframe, rescored_model_index)
        assert rescored_row["output_token_count_value_source"] == (
            fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_ACCEPTED_PARTITION
        )
        assert rescored_row["output_token_count_value_intelligence_index_version"] == "4.3.2"
        assert not bool(rescored_row["output_token_count_value_is_from_current_intelligence_index_version"])
        assert rescored_row["output_token_count_value_non_current_reason_code"] == (
            "output_token_count_value_catalog_intelligence_disagrees_with_current_api_intelligence"
        )
        assert math.isnan(rescored_row["intel_per_m_output"])
    unchanged_row = _row_for_synthetic_model_index(models_dataframe, 5)
    assert bool(unchanged_row["output_token_count_value_is_from_current_intelligence_index_version"])
    assert unchanged_row["output_token_count_value_non_current_reason_code"] is None
    current_catalog_token_row_count = int(
        models_dataframe["output_token_count_value_is_from_current_intelligence_index_version"]
        .map(lambda flag: flag is True or flag is np.True_)
        .sum()
    )
    assert current_catalog_token_row_count == SYNTHETIC_CATALOG_MODEL_COUNT_WITH_OUTPUT_TOKEN_COUNT - 2

    guardrail_status_by_name = {
        guardrail_result["guardrail_name"]: guardrail_result["guardrail_status"]
        for guardrail_result in models_dataframe.attrs[
            fetch_data.MODELS_DATAFRAME_ATTRS_KEY_DATA_QUALITY_GUARDRAIL_RESULTS
        ]
    }
    assert guardrail_status_by_name[
        "embedded_model_catalog_partition_accepted_when_structurally_valid_detail_pages_exist"
    ] == fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_PASSED
    assert guardrail_status_by_name["embedded_model_catalog_vs_api_intelligence_agreement_rate"] == (
        fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_WARNING_ONLY
    )
    assert models_dataframe.attrs[fetch_data.MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE][
        "embedded_model_catalog_partition_rejection_warning_text"
    ] is None


def test_catalog_partition_acceptance_guardrail_passes_on_accepted_partition(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
) -> None:
    models_dataframe = fetch_data.build_dataframe(refresh=False)
    guardrail_status_by_name = {
        guardrail_result["guardrail_name"]: guardrail_result["guardrail_status"]
        for guardrail_result in models_dataframe.attrs[
            fetch_data.MODELS_DATAFRAME_ATTRS_KEY_DATA_QUALITY_GUARDRAIL_RESULTS
        ]
    }
    assert guardrail_status_by_name[
        "embedded_model_catalog_partition_accepted_when_structurally_valid_detail_pages_exist"
    ] == fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_PASSED


def test_current_version_display_refines_api_family_to_catalog_patch_version(
    synthetic_artificial_analysis_cache_layout: SyntheticArtificialAnalysisCacheLayout,
) -> None:
    """R1-08：API 顶层版本是数值 4.3，表达不了 4.3.2；同 family 的被接受分区是 4.3.2 时显示更具体的版本。"""
    api_language_models_cache_path = (
        synthetic_artificial_analysis_cache_layout.api_language_models_cache_path
    )
    refreshed_shape_api_cache = json.loads(api_language_models_cache_path.read_text(encoding="utf-8"))
    refreshed_shape_api_cache["intelligence_index_version"] = 4.3
    api_language_models_cache_path.write_text(json.dumps(refreshed_shape_api_cache), encoding="utf-8")

    artificial_analysis_data_provenance = fetch_data.build_dataframe(refresh=False).attrs[
        fetch_data.MODELS_DATAFRAME_ATTRS_KEY_ARTIFICIAL_ANALYSIS_DATA_PROVENANCE
    ]
    assert artificial_analysis_data_provenance["current_intelligence_index_version"] == "4.3.2"
    assert artificial_analysis_data_provenance["current_intelligence_index_version_source"] == (
        fetch_data.CURRENT_INTELLIGENCE_INDEX_VERSION_SOURCE_ARTIFICIAL_ANALYSIS_API_RESPONSE_FAMILY_REFINED_BY_ACCEPTED_EMBEDDED_MODEL_CATALOG_PARTITION
    )
    assert artificial_analysis_data_provenance["artificial_analysis_api_intelligence_index_version"] == "4.3"
