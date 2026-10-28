"""历史报告的时间、版本与不可变来源行为；模型和数值均为合成。"""
from __future__ import annotations

import copy
import base64
import gzip
import hashlib
import io
import json
import tarfile
from pathlib import Path

import pytest

from src.frontier_3d_historical_progress import (
    build_historical_progress_dataset,
    materialize_historical_frame_dataset,
    validate_historical_progress_dataset,
)
from src.frontier_3d_historical_sources import load_historical_source_manifest


def model_row(number, *, release="research-model", date="2025-01-01", estimated=False,
              intelligence=40, cost=10, speed=100, token_version="4.3.2"):
    return {
        "id": f"00000000-0000-4000-9000-{number:012d}", "name": f"研究模型 {number}",
        "slug": f"research-model-{number}", "creator": "OpenAI",
        "creator_uuid": "e67e56e3-15cd-43db-b679-da4660a69f41", "release_date": date,
        "intelligence": intelligence, "cost_to_run": cost, "output_speed": speed,
        "blended_price_cache_input_output_7_to_2_to_1": cost / 10,
        "intelligence_index_canonical_output_token_count": 87_000_000,
        "artificial_analysis_release_slug": release,
        "artificial_analysis_reasoning_effort_slug": "high" if number % 2 else "low",
        "artificial_analysis_is_reasoning_model": True,
        "artificial_analysis_intelligence_index_is_estimated": estimated,
        "cost_to_run_value_intelligence_index_version": "4.3.2",
        "output_token_count_value_intelligence_index_version": token_version,
    }


def source_snapshot(identifier, rows, *, observed="2026-01-01T00:00:00Z", version="4.3.2"):
    return {"source_snapshot_id": identifier, "intelligence_index_version": version,
            "observed_at_utc": observed, "observed_at_utc_source": "recorded_at_fetch_time",
            "source_component_provenance": {
                "artificial_analysis_api_response_fetched_at_utc": observed,
                "artificial_analysis_api_response_fetched_at_utc_source": "recorded_at_fetch_time",
                "embedded_model_catalog_intelligence_index_version": version,
                "embedded_model_catalog_captured_at_utc": observed,
            },
            "rows": rows, "source_evidence": [], "source_warnings": []}


def historical_fixture_dataset():
    earlier = [model_row(1, intelligence=30), model_row(2, date="2025-02-01", intelligence=45, cost=15)]
    later = [*earlier, model_row(3, release="new-model", date="2025-03-01", intelligence=60, cost=8)]
    return build_historical_progress_dataset([
        source_snapshot("earlier", earlier),
        source_snapshot("later", later, observed="2026-02-01T00:00:00Z"),
    ])


def test_reasoning_efforts_share_earliest_release_step_and_keep_separate_points():
    dataset = historical_fixture_dataset()
    frames = [frame for frame in dataset["frames"] if frame["source_snapshot_id"] == "later"
              and frame["historical_view_mode"] == "release_retrospective"
              and frame["analysis_sample_policy"] == "include_estimated"]
    assert [frame["release_cutoff_date"] for frame in frames] == ["2025-01-01", "2025-03-01"]
    first = materialize_historical_frame_dataset(dataset, frames[0]["historical_frame_id"])
    assert len(first["metric_variants"]["effective__effective"]["three_dimensional_scene"]["displayed_model_markers"]) == 2


def test_observation_replay_keeps_absent_variants_out_and_preserves_real_dates():
    dataset = historical_fixture_dataset()
    replay = [frame for frame in dataset["frames"] if frame["historical_view_mode"] == "observation_replay"
              and frame["analysis_sample_policy"] == "include_estimated"]
    assert [frame["observed_at_utc"] for frame in replay] == ["2026-01-01T00:00:00Z", "2026-02-01T00:00:00Z"]
    first = materialize_historical_frame_dataset(dataset, replay[0]["historical_frame_id"])
    assert {model["model_uuid"] for model in first["models"]} == {model_row(1)["id"], model_row(2)["id"]}


def test_estimated_and_unknown_are_excluded_only_by_explicit_measured_analysis_policy():
    snapshot = source_snapshot("estimates", [model_row(1), model_row(2, estimated=True), model_row(3, estimated=None)])
    dataset = build_historical_progress_dataset([snapshot])
    counts = {frame["analysis_sample_policy"]: frame["metric_variant_summaries"]["blended__raw"]["analysis_eligible_model_count"]
              for frame in dataset["frames"] if frame["historical_view_mode"] == "observation_replay"}
    assert counts == {"include_estimated": 3, "measured_only": 1}


def test_mixed_version_tokens_do_not_enter_effective_speed_analysis():
    dataset = build_historical_progress_dataset([source_snapshot("mixed", [model_row(1), model_row(2, token_version="4.1")])])
    frame = dataset["frames"][-2]
    assert frame["metric_variant_summaries"]["effective__effective"]["analysis_eligible_model_count"] == 1
    assert frame["metric_variant_summaries"]["blended__raw"]["analysis_eligible_model_count"] == 2


def test_v5_raw_speed_available_without_inventing_normalization_constant():
    row = model_row(1)
    row["cost_to_run_value_intelligence_index_version"] = "5.0"
    row["output_token_count_value_intelligence_index_version"] = "5.0"
    dataset = build_historical_progress_dataset([source_snapshot("v5", [row], version="5.0")])
    frame = dataset["frames"][0]
    assert frame["metric_variant_summaries"]["blended__raw"]["analysis_eligible_model_count"] == 1
    assert "归一常数" in frame["metric_variant_summaries"]["effective__effective"]["unavailable_reason"]


def test_fixed_axis_domains_across_retrospective_frames():
    dataset = historical_fixture_dataset()
    frames = [frame for frame in dataset["frames"] if frame["source_snapshot_id"] == "later"]
    axes = [materialize_historical_frame_dataset(dataset, frame["historical_frame_id"])["metric_variants"]["blended__raw"]
            ["three_dimensional_scene"]["three_dimensional_axis_configuration"] for frame in frames]
    assert all(axis == axes[0] for axis in axes)
    validate_historical_progress_dataset(dataset)
    json.dumps(dataset, allow_nan=False)


def test_corrupt_frame_reference_is_rejected():
    dataset = historical_fixture_dataset()
    dataset["frames"][0]["model_observation_indices"][0] = 999999
    with pytest.raises(ValueError):
        validate_historical_progress_dataset(dataset)


def test_lazy_browser_projection_preserves_scientific_scene_and_geometry_values():
    from src.frontier_3d_historical_browser_projection import build_historical_browser_projection_from_validated_dataset
    dataset = historical_fixture_dataset()
    before = json.dumps(dataset, sort_keys=True)
    projected = build_historical_browser_projection_from_validated_dataset(dataset)
    assert projected["schema_version"] == "frontier_3d_historical_progress_browser_projection/v1"
    for original, frame in zip(dataset["frames"], projected["frames"]):
        assert "scientific_dataset" not in frame
        decoded = json.loads(gzip.decompress(base64.b64decode(frame["scientific_dataset_compressed_base64_gzip"])))
        assert decoded == original["scientific_dataset"]
    for original, encoded in zip(dataset["scene_geometry_definitions"], projected["scene_geometry_definitions_compressed_base64_gzip"]):
        assert json.loads(gzip.decompress(base64.b64decode(encoded))) == original
    assert json.dumps(dataset, sort_keys=True) == before


def test_publication_bundle_preserves_exact_projection_bytes_and_offline_original(tmp_path):
    from src.frontier_3d_historical_report_publication_bundle import write_historical_progress_publication_bundle
    payload = json.dumps({"schema_version": "frontier_3d_historical_progress_browser_projection/v1", "frames": [{"value": "历史科学数值"}]}, ensure_ascii=False)
    prefix = '<html><script id="frontier-3d-historical-progress-dataset-json" type="application/json">'
    original = prefix + payload + '</script></html>'
    source = tmp_path / "self-contained.html"
    source.write_text(original)
    receipt = write_historical_progress_publication_bundle(source, tmp_path / "publication")
    entry = Path(receipt["artifacts"][0]["path"]).read_text()
    transport = json.loads(entry[len(prefix):entry.index("</script>")])
    compressed = b"".join((tmp_path / "publication" / name).read_bytes() for name in transport["payload_segment_urls"])
    assert gzip.decompress(compressed) == payload.encode()
    assert hashlib.sha256(compressed).hexdigest() == transport["compressed_payload_sha256"]
    assert source.read_text() == original
    assert receipt["scientific_values_changed"] is False


def test_large_collinear_frontier_explicitly_reports_fit_rank_deficiency():
    rows = [model_row(number, release=f"separate-release-{number}", intelligence=number + 10, cost=number + 1)
            for number in range(1, 21)]
    dataset = build_historical_progress_dataset([source_snapshot("collinear", rows)])
    summary = dataset["frames"][-2]["metric_variant_summaries"]["effective__raw"]
    assert summary["trend_fit_diagnostic"]["fit_sample_count"] == 20
    assert summary["trend_fit_diagnostic"]["design_matrix_rank"] < 6
    assert "秩" in summary["small_sample_warning"]


@pytest.mark.parametrize("corruption_kind", ["invalid_header", "truncated_stream", "invalid_deflate"])
def test_frame_cache_resumes_and_recovers_corruption_without_reusing_bad_values(tmp_path, monkeypatch, corruption_kind):
    from src import frontier_3d_historical_progress as historical_progress
    snapshots = [source_snapshot("cached", [model_row(1)])]
    first = build_historical_progress_dataset(snapshots, frame_cache_directory=tmp_path)
    original = historical_progress._build_frame_scientific_dataset
    monkeypatch.setattr(historical_progress, "_build_frame_scientific_dataset", lambda *arguments: pytest.fail("已验证缓存未被复用"))
    events = []
    resumed = build_historical_progress_dataset(snapshots, frame_cache_directory=tmp_path, progress_callback=events.append)
    assert all(event["cache_reused"] for event in events)
    assert resumed["frames"][0]["metric_variant_summaries"] == first["frames"][0]["metric_variant_summaries"]
    monkeypatch.setattr(historical_progress, "_build_frame_scientific_dataset", original)
    cached_path = next(tmp_path.glob("*.json.gz"))
    cached_bytes = cached_path.read_bytes()
    corrupted_bytes = {
        "invalid_header": b"corrupt",
        "truncated_stream": cached_bytes[:len(cached_bytes) // 2],
        "invalid_deflate": cached_bytes[:10] + b"\x07" + cached_bytes[11:],
    }[corruption_kind]
    cached_path.write_bytes(corrupted_bytes)
    recovered = build_historical_progress_dataset(snapshots, frame_cache_directory=tmp_path)
    rejected_path = cached_path.with_name(cached_path.name + f".rejected-sha256-{hashlib.sha256(corrupted_bytes).hexdigest()}")
    assert rejected_path.read_bytes() == corrupted_bytes
    assert recovered["frames"] == first["frames"]
    monkeypatch.setattr(historical_progress, "_build_frame_scientific_dataset", lambda *arguments: pytest.fail("重建后的缓存未被复用"))
    events.clear()
    build_historical_progress_dataset(snapshots, frame_cache_directory=tmp_path, progress_callback=events.append)
    assert all(event["cache_reused"] for event in events)


def test_future_release_never_enters_observation_or_release_analysis():
    dataset = build_historical_progress_dataset([source_snapshot("before-future", [
        model_row(1), model_row(2, release="future-release", date="2027-01-01", intelligence=100),
    ])])
    for frame in dataset["frames"]:
        assert frame["metric_variant_summaries"]["blended__raw"]["highest_comparable_intelligence"] == 40
        assert frame["release_cutoff_date"] != "2027-01-01"


def test_creator_rename_preserves_historical_labels_and_registered_identity():
    earlier = model_row(1)
    earlier["creator"] = "Moonshot AI"
    later = {**earlier, "creator": "Kimi"}
    dataset = build_historical_progress_dataset([
        source_snapshot("before-rename", [earlier]), source_snapshot("after-rename", [later], observed="2026-02-01T00:00:00Z"),
    ])
    first = materialize_historical_frame_dataset(dataset, dataset["frames"][0]["historical_frame_id"])
    assert first["models"][0]["creator"] == "Moonshot AI"
    assert set(first["organization_identity_metadata_by_creator_name"]) == {"Moonshot AI", "Kimi"}


@pytest.mark.parametrize("invalid_row", [[], {"id": "invalid", "performance": []}, {"id": 123}])
def test_malformed_api_record_is_isolated_with_a_recheck_condition(tmp_path, invalid_row):
    manifest = write_source_manifest(tmp_path, [
        ("valid", {"intelligence_index_version": 5, "data": [api_model(model_row(1)["id"])]}, "5.0"),
        ("malformed", {"intelligence_index_version": 5, "data": [invalid_row]}, "5.0"),
    ])
    snapshots, outcomes = load_historical_source_manifest(manifest)
    assert len(snapshots) == 1
    assert outcomes[1]["status"] == "rejected"
    assert outcomes[1]["automatic_recheck_condition"]


@pytest.mark.parametrize("invalid_pagination", [["unexpected"], "unexpected", [], 1])
def test_malformed_api_pagination_is_isolated_and_preserves_source_evidence(tmp_path, invalid_pagination):
    valid_payload = {"intelligence_index_version": 5, "data": [api_model(model_row(1)["id"])]}
    manifest = write_source_manifest(tmp_path, [
        ("valid-before", valid_payload, "5.0"),
        ("invalid-pagination", {**valid_payload, "pagination": invalid_pagination}, "5.0"),
        ("valid-after", valid_payload, "5.0"),
    ])
    snapshots, outcomes = load_historical_source_manifest(manifest)
    assert [snapshot["source_snapshot_id"] for snapshot in snapshots] == ["valid-before", "valid-after"]
    assert outcomes[1]["status"] == "rejected"
    assert "pagination" in outcomes[1]["rejection_reason"]
    assert outcomes[1]["source_evidence"][0]["sha256"]
    assert outcomes[1]["automatic_recheck_condition"]


def test_report_cli_persists_malformed_source_failures_and_generates_valid_history(tmp_path):
    from src.frontier_3d_historical_progress_report import main
    valid_payload = {"intelligence_index_version": 5, "data": [api_model(model_row(1)["id"])]}
    manifest = write_source_manifest(tmp_path, [
        ("valid", valid_payload, "5.0"),
        ("invalid-pagination", {**valid_payload, "pagination": ["unexpected"]}, "5.0"),
        ("invalid-uuid", {**valid_payload, "data": [api_model(123)]}, "5.0"),
    ])
    report_path = tmp_path / "isolated-source-failures-report.html"
    assert main(["--historical-source-manifest-file", str(manifest), "--output-html-file", str(report_path)]) == 0
    outcomes = json.loads(report_path.with_suffix(".source-validation.json").read_text())
    assert [outcome["status"] for outcome in outcomes] == ["accepted_for_historical_variant_validation", "rejected", "rejected"]
    assert all(outcome["source_evidence"] and outcome["automatic_recheck_condition"] for outcome in outcomes[1:])
    assert report_path.is_file()
    assert report_path.with_suffix(".generation-receipt.json").is_file()


@pytest.mark.parametrize("with_catalog", [False, True])
def test_component_and_value_provenance_keep_actual_observation_times(tmp_path, with_catalog):
    api_observed_at = "2025-12-01T00:00:00Z"
    catalog_observed_at = "2025-12-15T00:00:00Z"
    version = "4.3.2" if with_catalog else "5.0"
    identifier = model_row(1)["id"]
    manifest = write_source_manifest(tmp_path, [("composite", {
        "intelligence_index_version": version, "fetched_at_utc": api_observed_at,
        "data": [api_model(identifier)],
    }, version)])
    if with_catalog:
        catalog = {"intelligence_index_version": version, "fetched_at_utc": catalog_observed_at,
                   "records_by_model_id": {identifier: {"intelligence_index": 40,
                       "canonical_output_token_count": 87_000_000, "intelligence_index_is_estimated": False}}}
        content = json.dumps(catalog).encode()
        catalog_path = tmp_path / "paired-numeric-catalog.json"
        catalog_path.write_bytes(content)
        document = json.loads(manifest.read_text())
        document["sources"][0]["numeric_catalog_file"] = {"path": catalog_path.name, "sha256": hashlib.sha256(content).hexdigest()}
        manifest.write_text(json.dumps(document))
    snapshots, outcomes = load_historical_source_manifest(manifest)
    assert outcomes[0]["status"] == "accepted_for_historical_variant_validation"
    dataset = build_historical_progress_dataset(snapshots)
    for frame in dataset["frames"]:
        provenance = frame["scientific_dataset"]["artificial_analysis_data_provenance"]
        assert provenance["artificial_analysis_api_response_fetched_at_utc"] == api_observed_at
        assert provenance["embedded_model_catalog_intelligence_index_version"] == (version if with_catalog else None)
        assert provenance["embedded_model_catalog_captured_at_utc"] == (catalog_observed_at if with_catalog else None)
    for observation in dataset["model_observation_value_provenance"]:
        for field, provenance in observation["values_by_field"].items():
            assert provenance["observed_at_utc"] == (catalog_observed_at if field == "intelligence_index_canonical_output_token_count" else api_observed_at)


def api_model(identifier, intelligence=40):
    return {"id": identifier, "name": "合成 API 模型", "slug": "synthetic-api-model", "release_date": "2025-01-01",
            "model_creator": {"id": "e67e56e3-15cd-43db-b679-da4660a69f41", "name": "OpenAI"},
            "evaluations": {"artificial_analysis_intelligence_index": intelligence},
            "artificial_analysis_intelligence_index_cost": {"total_cost": 10},
            "pricing": {"price_1m_input_tokens": 1, "price_1m_output_tokens": 3},
            "performance": {"median_output_tokens_per_second": 100}}


def write_source_manifest(directory, payloads):
    sources = []
    for identifier, payload, expected_version in payloads:
        path = directory / f"{identifier}.json"
        content = json.dumps(payload).encode()
        path.write_bytes(content)
        sources.append({"source_snapshot_id": identifier, "source_kind": "api_with_catalog",
                        "intelligence_index_version": expected_version,
                        "observed_at_utc": "2026-01-01T00:00:00Z", "observed_at_utc_source": "recorded_at_fetch_time",
                        "api_response_file": {"path": path.name, "sha256": hashlib.sha256(content).hexdigest()}})
    path = directory / "historical-source-manifest.json"
    path.write_text(json.dumps({"schema_version": "frontier_3d_historical_source_manifest/v1", "sources": sources}))
    return path


def test_invalid_source_is_isolated_without_preventing_valid_history(tmp_path):
    manifest = write_source_manifest(tmp_path, [
        ("valid", {"intelligence_index_version": 5, "data": [api_model(model_row(1)["id"])]}, "5.0"),
        ("wrong-version", {"intelligence_index_version": 4.3, "data": [api_model(model_row(2)["id"])]}, "5.0"),
    ])
    snapshots, evidence = load_historical_source_manifest(manifest)
    assert len(snapshots) == 1
    assert evidence[1]["status"] == "rejected"
    assert snapshots[0]["rows"][0]["artificial_analysis_intelligence_index_is_estimated"] is None


def test_missing_or_corrupt_source_recovers_from_verified_archive_without_overwriting(tmp_path):
    payload = {"intelligence_index_version": 5, "data": [api_model(model_row(1)["id"])]}
    manifest = write_source_manifest(tmp_path, [("recover", payload, "5.0")])
    document = json.loads(manifest.read_text())
    source = document["sources"][0]["api_response_file"]
    original = (tmp_path / source["path"]).read_bytes()
    archive = tmp_path / "persistent-source-backup.tar.gz"
    with tarfile.open(archive, "w:gz") as stream:
        information = tarfile.TarInfo("api-response.json")
        information.size = len(original)
        stream.addfile(information, io.BytesIO(original))
    source.update(archive_path=archive.name, archive_member="api-response.json")
    manifest.write_text(json.dumps(document))
    (tmp_path / source["path"]).write_text("损坏的旧输入")
    snapshots, evidence = load_historical_source_manifest(manifest)
    assert len(snapshots) == 1
    assert evidence[0]["source_evidence"][0]["recovered_from"] == "archive"
    assert (tmp_path / source["path"]).read_text() == "损坏的旧输入"
