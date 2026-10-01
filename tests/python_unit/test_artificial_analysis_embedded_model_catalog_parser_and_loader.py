"""离线内嵌模型目录：解析器（RSC payload 逐 UUID 抽取）与分区加载器的测试。

合成 fixture 覆盖：正常多模型页、对象跨 RSC 片段、首个带 token 的对象不是本页模型的负样本
（P0-3）、残缺页、分区选择（版本 family × 缓存 mtime 的 UTC 日期）、跨页 UUID 冲突报错、
字段缺失告警。末尾几条打 marker 的测试读取本机 `data/raw` 缓存，复核独立复核给出的真实数字。
"""
from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from pathlib import Path

import pytest

from src import fetch_data
from tests.fixtures.build_synthetic_artificial_analysis_model_detail_page_html import (
    build_synthetic_artificial_analysis_embedded_model_object,
    build_synthetic_artificial_analysis_model_detail_page_html,
    synthetic_artificial_analysis_model_uuid,
)

REPOSITORY_ROOT_DIRECTORY_PATH = Path(__file__).resolve().parents[2]

# 合成目录的规模：须超过分区接受的最小带 token 记录数护栏（默认 50）
SYNTHETIC_CATALOG_MODEL_COUNT_WITH_OUTPUT_TOKEN_COUNT = 60
SYNTHETIC_CATALOG_MODEL_COUNT_WITHOUT_OUTPUT_TOKEN_COUNT = 5


def _synthetic_intelligence_index_for_model_index(synthetic_model_index: int) -> float:
    return round(10.0 + synthetic_model_index * 0.731, 6)


def _synthetic_catalog_embedded_model_objects(
    *,
    intelligence_index_offset: float = 0.0,
    output_token_count_multiplier: float = 1.0,
) -> list[dict]:
    """一份合成「整份目录」：前 60 个带 token/成本，后 5 个只有智能分。"""
    embedded_model_objects = []
    total_model_count = (
        SYNTHETIC_CATALOG_MODEL_COUNT_WITH_OUTPUT_TOKEN_COUNT
        + SYNTHETIC_CATALOG_MODEL_COUNT_WITHOUT_OUTPUT_TOKEN_COUNT
    )
    for synthetic_model_index in range(total_model_count):
        has_output_token_count = (
            synthetic_model_index < SYNTHETIC_CATALOG_MODEL_COUNT_WITH_OUTPUT_TOKEN_COUNT
        )
        embedded_model_objects.append(
            build_synthetic_artificial_analysis_embedded_model_object(
                model_id=synthetic_artificial_analysis_model_uuid(synthetic_model_index),
                slug=f"synthetic-model-{synthetic_model_index}",
                name=f"Synthetic Model {synthetic_model_index}",
                intelligence_index=(
                    _synthetic_intelligence_index_for_model_index(synthetic_model_index)
                    + intelligence_index_offset
                ),
                intelligence_index_is_estimated=synthetic_model_index % 7 == 0,
                intelligence_index_cost_total_usd=(
                    100.0 + synthetic_model_index if has_output_token_count else None
                ),
                canonical_output_token_count=(
                    (1_000_000 + synthetic_model_index * 10_000) * output_token_count_multiplier
                    if has_output_token_count
                    else None
                ),
                intelligence_index_time_per_task_seconds=(
                    30.0 + synthetic_model_index if has_output_token_count else None
                ),
                is_reasoning=synthetic_model_index % 2 == 0,
                reasoning_effort_slug="high" if synthetic_model_index % 2 == 0 else None,
                release_slug=f"synthetic-release-{synthetic_model_index // 3}",
                price_1m_blended_7_to_2_to_1=1.25,
            )
        )
    return embedded_model_objects


def _synthetic_api_intelligence_by_model_id() -> dict[str, float]:
    total_model_count = (
        SYNTHETIC_CATALOG_MODEL_COUNT_WITH_OUTPUT_TOKEN_COUNT
        + SYNTHETIC_CATALOG_MODEL_COUNT_WITHOUT_OUTPUT_TOKEN_COUNT
    )
    return {
        synthetic_artificial_analysis_model_uuid(synthetic_model_index): round(
            _synthetic_intelligence_index_for_model_index(synthetic_model_index), 1
        )
        for synthetic_model_index in range(total_model_count)
    }


def _synthetic_api_cost_total_usd_by_model_id() -> dict[str, float]:
    return {
        synthetic_artificial_analysis_model_uuid(synthetic_model_index): 100.0 + synthetic_model_index
        for synthetic_model_index in range(SYNTHETIC_CATALOG_MODEL_COUNT_WITH_OUTPUT_TOKEN_COUNT)
    }


def _write_cached_model_detail_page(
    cache_directory_path: Path,
    page_file_name: str,
    page_html: str,
    cache_file_modification_time_utc: datetime,
) -> Path:
    cache_directory_path.mkdir(parents=True, exist_ok=True)
    cached_page_path = cache_directory_path / page_file_name
    cached_page_path.write_text(page_html, encoding="utf-8")
    modification_timestamp = cache_file_modification_time_utc.timestamp()
    os.utime(cached_page_path, (modification_timestamp, modification_timestamp))
    return cached_page_path


# ----------------------------------------------------------------------------- 解析器
def test_parser_extracts_every_embedded_model_record_with_snake_case_fields() -> None:
    embedded_model_objects = _synthetic_catalog_embedded_model_objects()
    reference_only_object = build_synthetic_artificial_analysis_embedded_model_object(
        model_id=synthetic_artificial_analysis_model_uuid(999),
        slug="synthetic-reference-only",
        name="Synthetic Reference Only",
        include_intelligence_index_fields=False,
    )
    page_html = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=[reference_only_object, *embedded_model_objects],
        current_model_object=embedded_model_objects[4],
    )

    records_by_model_id = (
        fetch_data.parse_artificial_analysis_embedded_model_catalog_records_from_model_detail_page_html(
            page_html
        )
    )

    # 只有 id/slug/name 的引用对象不算目录记录
    assert synthetic_artificial_analysis_model_uuid(999) not in records_by_model_id
    assert len(records_by_model_id) == len(embedded_model_objects)
    fourth_model_record = records_by_model_id[synthetic_artificial_analysis_model_uuid(4)]
    assert fourth_model_record.name == "Synthetic Model 4"
    assert fourth_model_record.slug == "synthetic-model-4"
    assert fourth_model_record.intelligence_index == pytest.approx(
        _synthetic_intelligence_index_for_model_index(4)
    )
    assert fourth_model_record.intelligence_index_is_estimated is False
    assert fourth_model_record.intelligence_index_cost_total_usd == pytest.approx(104.0)
    assert fourth_model_record.canonical_output_token_count == pytest.approx(1_040_000)
    assert fourth_model_record.intelligence_index_time_per_task_seconds == pytest.approx(34.0)
    assert fourth_model_record.is_reasoning is True
    assert fourth_model_record.reasoning_effort_slug == "high"
    assert fourth_model_record.release_slug == "synthetic-release-1"
    assert fourth_model_record.price_1m_blended_7_to_2_to_1 == pytest.approx(1.25)
    seventh_model_record = records_by_model_id[synthetic_artificial_analysis_model_uuid(7)]
    assert seventh_model_record.intelligence_index_is_estimated is True
    assert seventh_model_record.reasoning_effort_slug is None
    last_model_record = records_by_model_id[synthetic_artificial_analysis_model_uuid(64)]
    assert last_model_record.canonical_output_token_count is None
    assert last_model_record.intelligence_index_cost_total_usd is None


@pytest.mark.parametrize("react_server_component_chunk_character_count", [7, 64, 100_000])
def test_parser_is_independent_of_how_the_payload_is_split_into_push_chunks(
    react_server_component_chunk_character_count: int,
) -> None:
    embedded_model_objects = _synthetic_catalog_embedded_model_objects()[:8]
    page_html = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=embedded_model_objects,
        react_server_component_chunk_character_count=react_server_component_chunk_character_count,
    )
    records_by_model_id = (
        fetch_data.parse_artificial_analysis_embedded_model_catalog_records_from_model_detail_page_html(
            page_html
        )
    )
    assert sorted(records_by_model_id) == sorted(
        embedded_model_object["id"] for embedded_model_object in embedded_model_objects
    )


def test_parser_merges_complementary_fields_of_the_same_uuid_within_one_page() -> None:
    shared_model_id = synthetic_artificial_analysis_model_uuid(1)
    object_with_cost_only = build_synthetic_artificial_analysis_embedded_model_object(
        model_id=shared_model_id,
        slug="synthetic-model-1",
        name="Synthetic Model 1",
        intelligence_index=33.3,
        intelligence_index_cost_total_usd=12.5,
    )
    object_with_output_token_count_only = build_synthetic_artificial_analysis_embedded_model_object(
        model_id=shared_model_id,
        slug="synthetic-model-1",
        name="Synthetic Model 1",
        intelligence_index=33.3,
        canonical_output_token_count=2_500_000,
    )
    page_html = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=[object_with_cost_only, object_with_output_token_count_only],
    )
    merged_record = (
        fetch_data.parse_artificial_analysis_embedded_model_catalog_records_from_model_detail_page_html(
            page_html
        )[shared_model_id]
    )
    assert merged_record.intelligence_index_cost_total_usd == pytest.approx(12.5)
    assert merged_record.canonical_output_token_count == pytest.approx(2_500_000)


def test_parser_raises_value_error_on_conflicting_numbers_for_the_same_uuid_within_one_page() -> None:
    shared_model_id = synthetic_artificial_analysis_model_uuid(2)
    page_html = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=[
            build_synthetic_artificial_analysis_embedded_model_object(
                model_id=shared_model_id,
                slug="synthetic-model-2",
                name="Synthetic Model 2",
                canonical_output_token_count=1_000_000,
            ),
            build_synthetic_artificial_analysis_embedded_model_object(
                model_id=shared_model_id,
                slug="synthetic-model-2",
                name="Synthetic Model 2",
                canonical_output_token_count=9_000_000,
            ),
        ],
    )
    with pytest.raises(ValueError, match=shared_model_id):
        fetch_data.parse_artificial_analysis_embedded_model_catalog_records_from_model_detail_page_html(
            page_html
        )


def test_current_model_output_token_count_comes_from_the_current_model_uuid_itself() -> None:
    embedded_model_objects = _synthetic_catalog_embedded_model_objects()[:10]
    current_model_object = embedded_model_objects[6]
    page_html = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=embedded_model_objects,
        current_model_object=current_model_object,
    )
    assert fetch_data.parse_canonical_output_token_count_from_artificial_analysis_model_detail_page_html(
        page_html
    ) == pytest.approx(1_060_000)


def test_current_model_without_output_token_count_returns_none_even_if_another_model_has_one() -> None:
    """P0-3 负样本：首个带 token 的对象属于别的模型，旧实现会错拿它的值。"""
    other_model_with_output_token_count = build_synthetic_artificial_analysis_embedded_model_object(
        model_id=synthetic_artificial_analysis_model_uuid(11),
        slug="synthetic-other-model-with-tokens",
        name="Synthetic Other Model With Tokens",
        canonical_output_token_count=77_000_000,
    )
    current_model_without_output_token_count = build_synthetic_artificial_analysis_embedded_model_object(
        model_id=synthetic_artificial_analysis_model_uuid(12),
        slug="synthetic-current-model-without-tokens",
        name="Synthetic Current Model Without Tokens",
    )
    page_html = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=[
            other_model_with_output_token_count,
            current_model_without_output_token_count,
        ],
        current_model_object=current_model_without_output_token_count,
    )
    # 确认负样本构造有效：全页首个 token 字段属于另一个模型
    assert page_html.index("canonicalIntelligenceIndexTokenCount") < page_html.rindex(
        synthetic_artificial_analysis_model_uuid(12)
    )
    assert (
        fetch_data.parse_canonical_output_token_count_from_artificial_analysis_model_detail_page_html(
            page_html
        )
        is None
    )


def test_current_model_token_follows_uuid_when_marker_is_reference_only_and_after_the_catalog() -> None:
    """R3-F9：currentModel 只含 id/slug/name 且出现在目录数组之后时，第一个目录对象属于别的模型。

    旧的合成页总把完整的 currentModel 对象放在目录之前，恰好就是「第一条记录」，
    区分不了「按 currentModel 的 UUID 取」与「取页面第一个目录对象」。
    """
    first_catalog_model_with_tokens = build_synthetic_artificial_analysis_embedded_model_object(
        model_id=synthetic_artificial_analysis_model_uuid(21),
        slug="synthetic-first-catalog-model",
        name="Synthetic First Catalog Model",
        canonical_output_token_count=5_000_000,
    )
    current_model_with_tokens = build_synthetic_artificial_analysis_embedded_model_object(
        model_id=synthetic_artificial_analysis_model_uuid(22),
        slug="synthetic-current-model",
        name="Synthetic Current Model",
        canonical_output_token_count=7_000_000,
    )
    reference_only_current_model_object = build_synthetic_artificial_analysis_embedded_model_object(
        model_id=synthetic_artificial_analysis_model_uuid(22),
        slug="synthetic-current-model",
        name="Synthetic Current Model",
        include_intelligence_index_fields=False,
    )
    page_html = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=[first_catalog_model_with_tokens, current_model_with_tokens],
        current_model_object=reference_only_current_model_object,
        place_current_model_marker_after_embedded_model_catalog=True,
    )
    assert page_html.index(synthetic_artificial_analysis_model_uuid(21)) < page_html.index("currentModel")
    assert fetch_data.parse_canonical_output_token_count_from_artificial_analysis_model_detail_page_html(
        page_html
    ) == pytest.approx(7_000_000)


def test_current_model_zero_output_token_count_placeholder_is_treated_as_missing() -> None:
    """R3-F9：AA 用 0 作「未测」占位，不能当成 0 个 token。"""
    current_model_with_zero_tokens = build_synthetic_artificial_analysis_embedded_model_object(
        model_id=synthetic_artificial_analysis_model_uuid(23),
        slug="synthetic-zero-token-model",
        name="Synthetic Zero Token Model",
        canonical_output_token_count=0.0,
    )
    page_html = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=[current_model_with_zero_tokens],
        current_model_object=current_model_with_zero_tokens,
    )
    assert "canonicalIntelligenceIndexTokenCount" in page_html
    assert (
        fetch_data.parse_canonical_output_token_count_from_artificial_analysis_model_detail_page_html(
            page_html
        )
        is None
    )


def test_page_without_current_model_marker_returns_none_for_current_model_output_token_count() -> None:
    page_html = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=_synthetic_catalog_embedded_model_objects()[:3],
        current_model_object=None,
    )
    assert (
        fetch_data.parse_canonical_output_token_count_from_artificial_analysis_model_detail_page_html(
            page_html
        )
        is None
    )
    assert (
        fetch_data.parse_canonical_output_token_count_from_artificial_analysis_model_detail_page_html(
            "<html>无相关字段</html>"
        )
        is None
    )


def test_structure_check_flags_truncated_page_and_page_without_payload_push() -> None:
    complete_page_html = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=_synthetic_catalog_embedded_model_objects()[:5],
    )
    assert (
        fetch_data.find_artificial_analysis_model_detail_page_html_structure_invalidity_reason(
            complete_page_html
        )
        is None
    )
    truncated_page_html = complete_page_html[: len(complete_page_html) // 2]
    assert fetch_data.find_artificial_analysis_model_detail_page_html_structure_invalidity_reason(
        truncated_page_html
    )
    assert fetch_data.find_artificial_analysis_model_detail_page_html_structure_invalidity_reason(
        "<!DOCTYPE html><html><body>没有 RSC payload</body></html>"
    )


# ----------------------------------------------------------------------------- 分区加载器
CURRENT_PARTITION_CACHE_TIME_UTC = datetime(2026, 9, 23, 5, 50, 0, tzinfo=timezone.utc)
CURRENT_PARTITION_LATEST_CACHE_TIME_UTC = datetime(2026, 9, 23, 5, 52, 30, tzinfo=timezone.utc)
STALE_PARTITION_CACHE_TIME_UTC = datetime(2026, 8, 5, 3, 0, 0, tzinfo=timezone.utc)


def _write_standard_synthetic_cache_directory(cache_directory_path: Path) -> None:
    """两页当期（v4.3.2，9/23）+ 一页旧版本（v4.1，8/5，智能分整体偏移）+ 一页残缺页。"""
    current_catalog_objects = _synthetic_catalog_embedded_model_objects()
    _write_cached_model_detail_page(
        cache_directory_path,
        "synthetic-model-0.html",
        build_synthetic_artificial_analysis_model_detail_page_html(
            embedded_model_objects=current_catalog_objects,
            current_model_object=current_catalog_objects[0],
        ),
        CURRENT_PARTITION_CACHE_TIME_UTC,
    )
    _write_cached_model_detail_page(
        cache_directory_path,
        "synthetic-model-1.html",
        build_synthetic_artificial_analysis_model_detail_page_html(
            embedded_model_objects=current_catalog_objects,
            current_model_object=current_catalog_objects[1],
        ),
        CURRENT_PARTITION_LATEST_CACHE_TIME_UTC,
    )
    stale_catalog_objects = _synthetic_catalog_embedded_model_objects(
        intelligence_index_offset=-7.5,
        output_token_count_multiplier=0.25,
    )
    _write_cached_model_detail_page(
        cache_directory_path,
        "synthetic-model-2.html",
        build_synthetic_artificial_analysis_model_detail_page_html(
            embedded_model_objects=stale_catalog_objects,
            current_model_object=stale_catalog_objects[2],
            intelligence_index_version_strings=("4.1",),
        ),
        STALE_PARTITION_CACHE_TIME_UTC,
    )
    complete_page_html = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=current_catalog_objects,
        current_model_object=current_catalog_objects[3],
    )
    _write_cached_model_detail_page(
        cache_directory_path,
        "synthetic-model-3-truncated.html",
        complete_page_html[: len(complete_page_html) * 2 // 3],
        CURRENT_PARTITION_CACHE_TIME_UTC,
    )


def test_loader_accepts_only_the_partition_agreeing_with_api_and_skips_truncated_page(
    tmp_path: Path,
) -> None:
    _write_standard_synthetic_cache_directory(tmp_path)

    catalog_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path,
            _synthetic_api_intelligence_by_model_id(),
            "4.3.2",
            api_intelligence_index_cost_total_usd_by_model_id=_synthetic_api_cost_total_usd_by_model_id(),
        )
    )

    assert catalog_load_result.accepted_partition_intelligence_index_version == "4.3.2"
    assert catalog_load_result.accepted_partition_captured_at_utc == "2026-09-23T05:52:30Z"
    assert catalog_load_result.invalid_page_file_names == ("synthetic-model-3-truncated.html",)
    assert len(catalog_load_result.records_by_model_id) == 65
    # 被接受分区的 token 是当期值（未被 v4.1 页面的 0.25 倍 token 污染）
    assert catalog_load_result.records_by_model_id[
        synthetic_artificial_analysis_model_uuid(10)
    ].canonical_output_token_count == pytest.approx(1_100_000)
    assert catalog_load_result.page_cache_file_modification_time_utc_by_model_id[
        synthetic_artificial_analysis_model_uuid(10)
    ] == "2026-09-23T05:52:30Z"
    assert catalog_load_result.catalog_vs_api_intelligence_agreement_rate == pytest.approx(1.0)
    assert catalog_load_result.catalog_vs_api_cost_agreement_rate == pytest.approx(1.0)
    assert catalog_load_result.catalog_vs_api_cost_compared_model_count == 60

    partition_summaries_by_key = {
        (
            partition_summary.intelligence_index_version_family,
            partition_summary.cache_file_modification_date_utc,
        ): partition_summary
        for partition_summary in catalog_load_result.partition_summaries
    }
    assert set(partition_summaries_by_key) == {("4.3", "2026-09-23"), ("4.1", "2026-08-05")}
    current_partition_summary = partition_summaries_by_key[("4.3", "2026-09-23")]
    assert current_partition_summary.is_accepted is True
    assert current_partition_summary.page_count == 2
    assert current_partition_summary.most_specific_intelligence_index_version == "4.3.2"
    assert current_partition_summary.record_with_output_token_count_count == 60
    stale_partition_summary = partition_summaries_by_key[("4.1", "2026-08-05")]
    assert stale_partition_summary.is_accepted is False
    assert stale_partition_summary.intelligence_agreement_rate_with_api < 0.99
    assert stale_partition_summary.rejection_reasons


def test_loader_marks_page_with_undecodable_payload_chunk_as_invalid(tmp_path: Path) -> None:
    _write_standard_synthetic_cache_directory(tmp_path)
    page_html_with_invalid_escape = build_synthetic_artificial_analysis_model_detail_page_html(
        embedded_model_objects=_synthetic_catalog_embedded_model_objects()[:3],
    ).replace("self.__next_f.push([1,\"", "self.__next_f.push([1,\"\\q", 1)
    _write_cached_model_detail_page(
        tmp_path,
        "synthetic-model-7-undecodable.html",
        page_html_with_invalid_escape,
        CURRENT_PARTITION_CACHE_TIME_UTC,
    )
    catalog_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path,
            _synthetic_api_intelligence_by_model_id(),
            "4.3.2",
        )
    )
    assert "synthetic-model-7-undecodable.html" in catalog_load_result.invalid_page_file_names
    assert catalog_load_result.accepted_partition_intelligence_index_version == "4.3.2"


def test_loader_rejects_partition_whose_version_family_differs_from_known_api_version(
    tmp_path: Path,
) -> None:
    _write_standard_synthetic_cache_directory(tmp_path)
    catalog_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path,
            _synthetic_api_intelligence_by_model_id(),
            "4.4",
        )
    )
    assert catalog_load_result.accepted_partition_intelligence_index_version is None
    assert catalog_load_result.records_by_model_id == {}
    assert all(
        partition_summary.is_accepted is False
        for partition_summary in catalog_load_result.partition_summaries
    )


def test_loader_without_api_version_accepts_partition_by_intelligence_agreement_only(
    tmp_path: Path,
) -> None:
    _write_standard_synthetic_cache_directory(tmp_path)
    catalog_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path,
            _synthetic_api_intelligence_by_model_id(),
            None,
        )
    )
    assert catalog_load_result.accepted_partition_intelligence_index_version == "4.3.2"


def test_loader_rejects_partition_below_minimum_record_with_output_token_count(
    tmp_path: Path,
) -> None:
    _write_standard_synthetic_cache_directory(tmp_path)
    catalog_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path,
            _synthetic_api_intelligence_by_model_id(),
            "4.3.2",
            minimum_record_with_output_token_count_for_partition_acceptance=61,
        )
    )
    assert catalog_load_result.accepted_partition_intelligence_index_version is None


def test_loader_uses_only_the_newest_of_several_accepted_partitions_and_warns(
    tmp_path: Path,
    capsys: pytest.CaptureFixture[str],
) -> None:
    _write_standard_synthetic_cache_directory(tmp_path)
    newer_catalog_objects = _synthetic_catalog_embedded_model_objects(
        output_token_count_multiplier=2.0,
    )
    _write_cached_model_detail_page(
        tmp_path,
        "synthetic-model-5-newer.html",
        build_synthetic_artificial_analysis_model_detail_page_html(
            embedded_model_objects=newer_catalog_objects,
            current_model_object=newer_catalog_objects[5],
        ),
        datetime(2026, 9, 25, 1, 0, 0, tzinfo=timezone.utc),
    )
    catalog_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path,
            _synthetic_api_intelligence_by_model_id(),
            "4.3.2",
        )
    )
    assert catalog_load_result.accepted_partition_captured_at_utc == "2026-09-25T01:00:00Z"
    # 不跨分区取并集：token 全部来自 9/25 分区（2 倍值）
    assert catalog_load_result.records_by_model_id[
        synthetic_artificial_analysis_model_uuid(10)
    ].canonical_output_token_count == pytest.approx(2_200_000)
    captured_output = capsys.readouterr().out
    assert "2026-09-23" in captured_output
    assert "[warn]" in captured_output


def test_loader_raises_value_error_on_cross_page_conflict_inside_the_accepted_partition(
    tmp_path: Path,
) -> None:
    _write_standard_synthetic_cache_directory(tmp_path)
    conflicting_catalog_objects = _synthetic_catalog_embedded_model_objects()
    conflicting_catalog_objects[10]["canonicalIntelligenceIndexTokenCount"]["output"] = 5_555_555
    _write_cached_model_detail_page(
        tmp_path,
        "synthetic-model-6-conflicting.html",
        build_synthetic_artificial_analysis_model_detail_page_html(
            embedded_model_objects=conflicting_catalog_objects,
            current_model_object=conflicting_catalog_objects[6],
        ),
        CURRENT_PARTITION_CACHE_TIME_UTC,
    )
    with pytest.raises(ValueError, match=synthetic_artificial_analysis_model_uuid(10)):
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path,
            _synthetic_api_intelligence_by_model_id(),
            "4.3.2",
        )


def test_loader_warns_once_per_missing_field_with_record_counts(
    tmp_path: Path,
    capsys: pytest.CaptureFixture[str],
) -> None:
    _write_standard_synthetic_cache_directory(tmp_path)
    catalog_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path,
            _synthetic_api_intelligence_by_model_id(),
            "4.3.2",
        )
    )
    missing_field_record_counts = catalog_load_result.missing_field_record_counts_by_field_name
    # 合成目录共 65 个：奇数序号没有 effort（32 个），后 5 个没有 token/成本/time per task
    assert missing_field_record_counts["reasoning_effort_slug"] == 32
    assert missing_field_record_counts["canonical_output_token_count"] == 5
    assert missing_field_record_counts["intelligence_index_time_per_task_seconds"] == 5
    assert "release_slug" not in missing_field_record_counts
    captured_output = capsys.readouterr().out
    assert captured_output.count("reasoning_effort_slug") == 1
    assert "字段缺失" in captured_output


def test_loader_on_missing_cache_directory_returns_empty_result_with_warning(
    tmp_path: Path,
    capsys: pytest.CaptureFixture[str],
) -> None:
    catalog_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path / "does-not-exist",
            _synthetic_api_intelligence_by_model_id(),
            "4.3.2",
        )
    )
    assert catalog_load_result.records_by_model_id == {}
    assert catalog_load_result.accepted_partition_intelligence_index_version is None
    assert catalog_load_result.partition_summaries == ()
    assert "[warn]" in capsys.readouterr().out


def test_intelligence_index_version_family_takes_major_and_minor() -> None:
    assert fetch_data.intelligence_index_version_family("4.3.2") == "4.3"
    assert fetch_data.intelligence_index_version_family("4.1") == "4.1"
    assert fetch_data.intelligence_index_version_family(4.1) == "4.1"
    assert fetch_data.intelligence_index_version_family("v4.1.1") == "4.1"
    assert fetch_data.intelligence_index_version_family(None) is None


# ----------------------------------------------------------------------------- 真实缓存（本机）
LOCAL_ARTIFICIAL_ANALYSIS_MODEL_DETAIL_PAGE_CACHE_DIRECTORY_PATH = (
    REPOSITORY_ROOT_DIRECTORY_PATH / "data" / "raw" / "artificial_analysis_model_detail_page_html"
)
LOCAL_ARTIFICIAL_ANALYSIS_API_LANGUAGE_MODELS_CACHE_PATH = (
    REPOSITORY_ROOT_DIRECTORY_PATH / "data" / "raw" / "api_language_models.json"
)


@pytest.fixture(scope="module")
def local_cached_api_model_rows() -> list[dict]:
    if not LOCAL_ARTIFICIAL_ANALYSIS_API_LANGUAGE_MODELS_CACHE_PATH.is_file():
        pytest.skip("本机没有 API 缓存")
    return json.loads(
        LOCAL_ARTIFICIAL_ANALYSIS_API_LANGUAGE_MODELS_CACHE_PATH.read_text(encoding="utf-8")
    )["data"]


@pytest.fixture(scope="module")
def local_cached_embedded_model_catalog_load_result(
    local_cached_api_model_rows: list[dict],
) -> fetch_data.ArtificialAnalysisEmbeddedModelCatalogLoadResult:
    if not LOCAL_ARTIFICIAL_ANALYSIS_MODEL_DETAIL_PAGE_CACHE_DIRECTORY_PATH.is_dir():
        pytest.skip("本机没有详情页缓存")
    api_intelligence_by_model_id = {
        api_model_row["id"]: (api_model_row.get("evaluations") or {}).get(
            "artificial_analysis_intelligence_index"
        )
        for api_model_row in local_cached_api_model_rows
    }
    api_cost_total_usd_by_model_id = {
        api_model_row["id"]: (
            api_model_row.get("artificial_analysis_intelligence_index_cost") or {}
        ).get("total_cost")
        for api_model_row in local_cached_api_model_rows
    }
    return fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
        LOCAL_ARTIFICIAL_ANALYSIS_MODEL_DETAIL_PAGE_CACHE_DIRECTORY_PATH,
        api_intelligence_by_model_id,
        None,
        api_intelligence_index_cost_total_usd_by_model_id=api_cost_total_usd_by_model_id,
    )


@pytest.mark.requires_local_cached_artificial_analysis_data
def test_local_cache_accepted_partition_is_version_4_3_2(
    local_cached_embedded_model_catalog_load_result: fetch_data.ArtificialAnalysisEmbeddedModelCatalogLoadResult,
) -> None:
    assert (
        local_cached_embedded_model_catalog_load_result.accepted_partition_intelligence_index_version
        == "4.3.2"
    )
    assert local_cached_embedded_model_catalog_load_result.accepted_partition_captured_at_utc.startswith(
        "2026-09-23"
    )


@pytest.mark.requires_local_cached_artificial_analysis_data
def test_local_cache_has_166_current_records_with_output_token_count_among_api_ids(
    local_cached_embedded_model_catalog_load_result: fetch_data.ArtificialAnalysisEmbeddedModelCatalogLoadResult,
    local_cached_api_model_rows: list[dict],
) -> None:
    api_model_ids = {api_model_row["id"] for api_model_row in local_cached_api_model_rows}
    current_records_with_output_token_count_among_api_ids = [
        model_id
        for model_id, catalog_record in local_cached_embedded_model_catalog_load_result.records_by_model_id.items()
        if model_id in api_model_ids
        and catalog_record.canonical_output_token_count is not None
        and catalog_record.canonical_output_token_count > 0
    ]
    assert len(current_records_with_output_token_count_among_api_ids) == 166


@pytest.mark.requires_local_cached_artificial_analysis_data
def test_local_cache_has_exactly_one_truncated_page(
    local_cached_embedded_model_catalog_load_result: fetch_data.ArtificialAnalysisEmbeddedModelCatalogLoadResult,
) -> None:
    assert local_cached_embedded_model_catalog_load_result.invalid_page_file_names == (
        "gpt-5-6-sol-low.html",
    )


@pytest.mark.requires_local_cached_artificial_analysis_data
def test_local_cache_catalog_vs_latest_api_agreement_rates_are_valid_fractions_drift_only_warns(
    local_cached_embedded_model_catalog_load_result: fetch_data.ArtificialAnalysisEmbeddedModelCatalogLoadResult,
) -> None:
    """最新 API 与 9/23 目录相隔多日时自然漂移（2026-10-01 实测成本一致率 79.7%、智能分 97.1%），
    只告警（R1-01 (a)）；这里只校验一致率是有效比例、且确实做了比较。"""
    assert local_cached_embedded_model_catalog_load_result.catalog_vs_api_cost_compared_model_count > 0
    assert 0.0 <= local_cached_embedded_model_catalog_load_result.catalog_vs_api_cost_agreement_rate <= 1.0
    assert (
        0.0
        <= local_cached_embedded_model_catalog_load_result.catalog_vs_api_intelligence_agreement_rate
        <= 1.0
    )


@pytest.mark.requires_local_cached_artificial_analysis_data
def test_local_cache_catalog_agrees_with_same_day_api_response_from_history(
    local_cached_embedded_model_catalog_load_result: fetch_data.ArtificialAnalysisEmbeddedModelCatalogLoadResult,
) -> None:
    """同日抓取的 API 响应（响应历史里与目录分区同一天的那份）与目录的成本、智能分一致率都 ≥99%。"""
    catalog_captured_at_compact_utc_date = (
        local_cached_embedded_model_catalog_load_result.accepted_partition_captured_at_utc[:10].replace("-", "")
    )
    same_day_api_response_history_file_paths = sorted(
        (REPOSITORY_ROOT_DIRECTORY_PATH / "data" / "raw" / fetch_data.ARTIFICIAL_ANALYSIS_API_LANGUAGE_MODELS_RESPONSE_HISTORY_DIRECTORY.name).glob(
            f"artificial_analysis_api_language_models_response_fetched_at_{catalog_captured_at_compact_utc_date}T*.json"
        )
    )
    same_day_api_response_history_file_paths = [
        history_file_path
        for history_file_path in same_day_api_response_history_file_paths
        if fetch_data._GUARDRAIL_PASSED_API_LANGUAGE_MODELS_RESPONSE_HISTORY_FILE_NAME_PATTERN.match(
            history_file_path.name
        )
    ]
    if not same_day_api_response_history_file_paths:
        pytest.skip("响应历史里没有与目录分区同日的 API 响应")
    same_day_api_model_rows = json.loads(
        same_day_api_response_history_file_paths[-1].read_text(encoding="utf-8")
    )["data"]
    same_day_catalog_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            LOCAL_ARTIFICIAL_ANALYSIS_MODEL_DETAIL_PAGE_CACHE_DIRECTORY_PATH,
            {
                api_model_row["id"]: (api_model_row.get("evaluations") or {}).get(
                    "artificial_analysis_intelligence_index"
                )
                for api_model_row in same_day_api_model_rows
            },
            None,
            api_intelligence_index_cost_total_usd_by_model_id={
                api_model_row["id"]: (
                    api_model_row.get("artificial_analysis_intelligence_index_cost") or {}
                ).get("total_cost")
                for api_model_row in same_day_api_model_rows
            },
        )
    )
    assert same_day_catalog_load_result.catalog_vs_api_cost_compared_model_count > 0
    assert same_day_catalog_load_result.catalog_vs_api_cost_agreement_rate >= 0.99
    assert same_day_catalog_load_result.catalog_vs_api_intelligence_agreement_rate >= 0.99


@pytest.mark.requires_local_cached_artificial_analysis_data
def test_local_cache_claude_35_sonnet_current_model_has_no_output_token_count() -> None:
    """P0-3 真实负样本：旧实现会错拿同页首个 token（属于别的模型）。"""
    claude_35_sonnet_page_path = (
        LOCAL_ARTIFICIAL_ANALYSIS_MODEL_DETAIL_PAGE_CACHE_DIRECTORY_PATH / "claude-35-sonnet.html"
    )
    if not claude_35_sonnet_page_path.is_file():
        pytest.skip("本机没有 claude-35-sonnet.html 缓存页")
    assert (
        fetch_data.parse_canonical_output_token_count_from_artificial_analysis_model_detail_page_html(
            claude_35_sonnet_page_path.read_text(encoding="utf-8", errors="ignore")
        )
        is None
    )


# ----------------------------------------------------------------------------- R3-F8：分区接受阈值的边界
def _exact_catalog_intelligence_by_model_id_with_offsets(
    intelligence_offset_by_synthetic_model_index: dict[int, float],
    *,
    default_intelligence_offset: float = 0.0,
) -> dict[str, float]:
    total_model_count = (
        SYNTHETIC_CATALOG_MODEL_COUNT_WITH_OUTPUT_TOKEN_COUNT
        + SYNTHETIC_CATALOG_MODEL_COUNT_WITHOUT_OUTPUT_TOKEN_COUNT
    )
    return {
        synthetic_artificial_analysis_model_uuid(synthetic_model_index): (
            _synthetic_intelligence_index_for_model_index(synthetic_model_index)
            + intelligence_offset_by_synthetic_model_index.get(
                synthetic_model_index, default_intelligence_offset
            )
        )
        for synthetic_model_index in range(total_model_count)
    }


def _write_single_current_partition_cache_directory(cache_directory_path: Path) -> None:
    current_catalog_objects = _synthetic_catalog_embedded_model_objects()
    _write_cached_model_detail_page(
        cache_directory_path,
        "synthetic-model-0.html",
        build_synthetic_artificial_analysis_model_detail_page_html(
            embedded_model_objects=current_catalog_objects,
            current_model_object=current_catalog_objects[0],
        ),
        datetime(2026, 9, 23, 5, 52, 0, tzinfo=timezone.utc),
    )


def test_loader_accepts_partition_with_partial_rescoring_and_keeps_agreement_rate_only_as_diagnostic(
    tmp_path: Path,
    capsys: pytest.CaptureFixture[str],
) -> None:
    """R1-01 (a)：65 个模型里 3 个被重评（+1.0）→ 一致率 95.4%。分区仍被接受（逐 UUID 判定当期），

    分区级一致率只作诊断量记录，低于 99% 时告警。"""
    _write_single_current_partition_cache_directory(tmp_path)
    catalog_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path,
            _exact_catalog_intelligence_by_model_id_with_offsets({3: 1.0, 17: 1.0, 41: 1.0}),
            "4.3.2",
        )
    )
    assert catalog_load_result.accepted_partition_intelligence_index_version == "4.3.2"
    (partition_summary,) = catalog_load_result.partition_summaries
    assert partition_summary.is_accepted is True
    assert partition_summary.rejection_reasons == ()
    assert partition_summary.intelligence_agreement_rate_with_api == pytest.approx(62 / 65)
    assert catalog_load_result.catalog_vs_api_intelligence_agreement_rate == pytest.approx(62 / 65)
    captured_output = capsys.readouterr().out
    assert "[warn]" in captured_output and "95.4%" in captured_output


def test_intelligence_agreement_tolerance_is_five_hundredths_of_an_index_point(tmp_path: Path) -> None:
    """容差 0.05：全部偏 0.04 → 全部一致；全部偏 0.1 → 一致数 0（分区仍按 family 与交集条数接受，

    逐 UUID 当期判定在合表时生效，见 test_fetch_data_value_provenance_blended_price_and_guards）。"""
    _write_single_current_partition_cache_directory(tmp_path)
    within_tolerance_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path,
            _exact_catalog_intelligence_by_model_id_with_offsets({}, default_intelligence_offset=0.04),
            "4.3.2",
        )
    )
    assert within_tolerance_load_result.accepted_partition_intelligence_index_version == "4.3.2"
    assert within_tolerance_load_result.catalog_vs_api_intelligence_agreement_rate == pytest.approx(1.0)
    beyond_tolerance_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path,
            _exact_catalog_intelligence_by_model_id_with_offsets({}, default_intelligence_offset=0.1),
            "4.3.2",
        )
    )
    (beyond_tolerance_partition_summary,) = beyond_tolerance_load_result.partition_summaries
    assert beyond_tolerance_partition_summary.intelligence_agreeing_with_api_model_count == 0
    assert beyond_tolerance_load_result.catalog_vs_api_intelligence_agreement_rate == pytest.approx(0.0)


# ----------------------------------------------------------------------------- R1-01 (a)：分区接受只看 family + 结构 + 交集条数
def test_loader_rejects_partition_whose_token_records_mostly_fall_outside_api_uuid_set(
    tmp_path: Path,
) -> None:
    """带 token 记录数按「与 API 的 UUID 交集」计：交集里只有 10 条 < 最小护栏 50 → 拒绝。"""
    _write_single_current_partition_cache_directory(tmp_path)
    api_intelligence_for_first_ten_models_only = {
        synthetic_artificial_analysis_model_uuid(synthetic_model_index): (
            _synthetic_intelligence_index_for_model_index(synthetic_model_index)
        )
        for synthetic_model_index in range(10)
    }
    catalog_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path,
            api_intelligence_for_first_ten_models_only,
            "4.3.2",
        )
    )
    assert catalog_load_result.accepted_partition_intelligence_index_version is None
    (partition_summary,) = catalog_load_result.partition_summaries
    assert partition_summary.record_with_output_token_count_in_api_uuid_intersection_count == 10
    assert any("交集" in rejection_reason for rejection_reason in partition_summary.rejection_reasons)


def test_loader_without_api_version_infers_current_family_from_best_agreeing_partition_not_newest(
    tmp_path: Path,
) -> None:
    """API 版本未知时按现逻辑推定当期 family（与 API 智能分最一致的分区），更新但跨版本的分区仍拒绝。"""
    _write_single_current_partition_cache_directory(tmp_path)
    newer_other_family_catalog_objects = _synthetic_catalog_embedded_model_objects(
        intelligence_index_offset=-7.5,
        output_token_count_multiplier=0.25,
    )
    _write_cached_model_detail_page(
        tmp_path,
        "synthetic-model-9-newer-other-family.html",
        build_synthetic_artificial_analysis_model_detail_page_html(
            embedded_model_objects=newer_other_family_catalog_objects,
            current_model_object=newer_other_family_catalog_objects[9],
            intelligence_index_version_strings=("4.4",),
        ),
        datetime(2026, 9, 28, 1, 0, 0, tzinfo=timezone.utc),
    )
    catalog_load_result = (
        fetch_data.load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages(
            tmp_path,
            _synthetic_api_intelligence_by_model_id(),
            None,
        )
    )
    assert catalog_load_result.accepted_partition_intelligence_index_version == "4.3.2"
    rejected_partition_summary = next(
        partition_summary
        for partition_summary in catalog_load_result.partition_summaries
        if partition_summary.intelligence_index_version_family == "4.4"
    )
    assert rejected_partition_summary.is_accepted is False
    assert any("family" in rejection_reason for rejection_reason in rejected_partition_summary.rejection_reasons)
