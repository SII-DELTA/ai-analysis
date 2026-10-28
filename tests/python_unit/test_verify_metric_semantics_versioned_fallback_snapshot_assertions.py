"""指标脚本必须固定验证入库快照，并拒绝缺记录或溯源污染。"""
from dataclasses import replace
from pathlib import Path

import pytest

from scripts import verify_metric_semantics
from src import fetch_data


EXPECTED_COMMITTED_VERSIONED_FALLBACK_SNAPSHOT_PATH = (
    Path(__file__).resolve().parents[2]
    / "data"
    / "reference"
    / "artificial_analysis_intelligence_index_v4_1_single_batch_cost_and_output_token_fallback_snapshot_captured_2026_08_04.csv"
)
FALLBACK_METRIC_ATTRIBUTE_NAMES_LABELS_AND_EXPECTED_COUNTS = [
    ("cost_to_run_fallback_value_by_model_id", "成本", 129),
    ("canonical_output_token_count_fallback_value_by_model_id", "原始输出 token", 166),
]


def test_metric_semantics_accepts_committed_august_4_versioned_fallback_snapshot() -> None:
    verify_metric_semantics.main()


def test_metric_semantics_rejects_july_1_default_versioned_fallback_snapshot(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.setattr(
        fetch_data,
        "ARTIFICIAL_ANALYSIS_INTELLIGENCE_INDEX_V4_1_COST_TO_RUN_AND_CANONICAL_OUTPUT_TOKEN_COUNT_FALLBACK_SNAPSHOT_PATH",
        EXPECTED_COMMITTED_VERSIONED_FALLBACK_SNAPSHOT_PATH.with_name(
            "artificial_analysis_intelligence_index_v4_1_cost_to_run_and_canonical_output_token_count_fallback_snapshot_captured_2026_07_01.csv"
        ),
    )

    with pytest.raises(AssertionError, match="默认版本化回退快照不匹配"):
        verify_metric_semantics.main()


def test_metric_semantics_rejects_missing_committed_versioned_fallback_snapshot_file(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    original_path_is_file = Path.is_file
    monkeypatch.setattr(
        Path,
        "is_file",
        lambda path: path != EXPECTED_COMMITTED_VERSIONED_FALLBACK_SNAPSHOT_PATH
        and original_path_is_file(path),
    )

    with pytest.raises(AssertionError, match="默认版本化回退快照文件不存在"):
        verify_metric_semantics.main()


@pytest.mark.parametrize(
    ("fallback_values_attribute_name", "metric_label", "expected_count"),
    FALLBACK_METRIC_ATTRIBUTE_NAMES_LABELS_AND_EXPECTED_COUNTS,
)
def test_metric_semantics_rejects_missing_metric_fallback_record(
    monkeypatch: pytest.MonkeyPatch,
    fallback_values_attribute_name: str,
    metric_label: str,
    expected_count: int,
) -> None:
    fallback_values = fetch_data.load_cost_and_output_token_fallbacks()
    metric_fallback_values_by_model_id = getattr(fallback_values, fallback_values_attribute_name)
    metric_fallback_values_by_model_id.popitem()
    monkeypatch.setattr(fetch_data, "load_cost_and_output_token_fallbacks", lambda: fallback_values)

    with pytest.raises(AssertionError) as snapshot_assertion_error:
        verify_metric_semantics.main()

    assert str(snapshot_assertion_error.value) == (
        f"{metric_label}回退记录数：期望 {expected_count}，实际 {expected_count - 1}"
    )


@pytest.mark.parametrize(
    ("fallback_values_attribute_name", "metric_label", "expected_count"),
    FALLBACK_METRIC_ATTRIBUTE_NAMES_LABELS_AND_EXPECTED_COUNTS,
)
@pytest.mark.parametrize(
    ("metadata_field_name", "invalid_metadata_value", "expected_metadata_value"),
    [
        ("intelligence_index_version", "4.3", "4.1"),
        ("fetched_at_utc", "2026-07-01", "2026-08-04"),
        ("value_source", "previous_run_processed_models_csv", "versioned_non_current_fallback_snapshot"),
    ],
)
def test_metric_semantics_rejects_metric_fallback_metadata_corruption_without_count_change(
    monkeypatch: pytest.MonkeyPatch,
    fallback_values_attribute_name: str,
    metric_label: str,
    expected_count: int,
    metadata_field_name: str,
    invalid_metadata_value: str,
    expected_metadata_value: str,
) -> None:
    fallback_values = fetch_data.load_cost_and_output_token_fallbacks()
    metric_fallback_values_by_model_id = getattr(fallback_values, fallback_values_attribute_name)
    last_model_id = next(reversed(metric_fallback_values_by_model_id))
    metric_fallback_values_by_model_id[last_model_id] = replace(
        metric_fallback_values_by_model_id[last_model_id],
        **{metadata_field_name: invalid_metadata_value},
    )
    assert len(metric_fallback_values_by_model_id) == expected_count
    monkeypatch.setattr(fetch_data, "load_cost_and_output_token_fallbacks", lambda: fallback_values)

    with pytest.raises(AssertionError) as snapshot_assertion_error:
        verify_metric_semantics.main()

    assertion_message = str(snapshot_assertion_error.value)
    assert metric_label in assertion_message
    assert last_model_id in assertion_message
    assert (
        f"{metadata_field_name}：期望 {expected_metadata_value!r}，实际 {invalid_metadata_value!r}"
        in assertion_message
    )
