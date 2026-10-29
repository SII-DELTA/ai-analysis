"""刷新差异不接受 pending/rejected，不用当期目录倒灌历史。"""
import copy
import json
from pathlib import Path

import pytest

from tests.python_unit.test_frontier_3d_wave_5_dataset_and_sensitivity import build_wave_5_dataset


def response(timestamp, version="4.3.2", score=20, cost=10):
    return {"fetched_at_utc": timestamp, "intelligence_index_version":version, "source_url":"https://example.test/api", "tier":"free",
        "data":[{"id":"12345678-1234-1234-1234-123456789abc", "evaluations":{"artificial_analysis_intelligence_index":score},
            "artificial_analysis_intelligence_index_cost":{"total_cost":cost}}]}


def response_for_scientific_models(dataset, timestamp):
    result=response(timestamp)
    result["data"]=[{"id":model["model_uuid"],"evaluations":{"artificial_analysis_intelligence_index":model["panel"]["intelligence"]}} for model in dataset["models"]]
    return result


def write_response(directory, timestamp, payload, suffix=""):
    compact=timestamp.replace("-", "").replace(":", "")
    path=directory/f"artificial_analysis_api_language_models_response_fetched_at_{compact}{suffix}.json"
    path.write_text(json.dumps(payload))
    return path


def test_strict_passed_history_skips_corrupt_pending_rejected_and_current(tmp_path):
    from src.frontier_3d_refresh_difference_history import build_refresh_difference_report
    current=response("2026-10-28T12:00:00Z",cost=11)
    expected=write_response(tmp_path,"2026-10-20T12:00:00Z",response("2026-10-20T12:00:00Z"))
    write_response(tmp_path,"2026-10-21T12:00:00Z",{}).write_text("broken")
    write_response(tmp_path,"2026-10-22T12:00:00Z",{},"_pending_data_quality_guardrail_validation")
    write_response(tmp_path,"2026-10-23T12:00:00Z",{},"_rejected_by_data_quality_guardrails")
    write_response(tmp_path,"2026-10-28T12:00:00Z",current)
    report=build_refresh_difference_report(current,tmp_path)
    assert report["baseline_identity"]["response_filename"] == expected.name
    assert report["metric_changes_exceeding_ten_percent"] == []
    assert report["frontier_comparison"]["status"] == "not_comparable"
    current["data"][0]["artificial_analysis_intelligence_index_cost"]["total_cost"]=11.00001
    assert len(build_refresh_difference_report(current,tmp_path)["metric_changes_exceeding_ten_percent"]) == 1


@pytest.mark.parametrize("version", [None,"4.4.0"])
def test_version_unknown_or_changed_stops_version_sensitive_comparison(tmp_path,version):
    from src.frontier_3d_refresh_difference_history import build_refresh_difference_report
    write_response(tmp_path,"2026-10-20T12:00:00Z",response("2026-10-20T12:00:00Z"))
    report=build_refresh_difference_report(response("2026-10-28T12:00:00Z",version,score=40,cost=100),tmp_path)
    assert report["index_comparison_status"] != "compatible"
    assert report["metric_changes_exceeding_ten_percent"] == []


def test_duplicate_uuid_is_explicitly_not_comparable(tmp_path):
    from src.frontier_3d_refresh_difference_history import build_refresh_difference_report
    previous=response("2026-10-20T12:00:00Z")
    previous["data"] *= 2
    write_response(tmp_path,previous["fetched_at_utc"],previous)
    assert build_refresh_difference_report(response("2026-10-28T12:00:00Z"),tmp_path)["status"] == "not_comparable"


@pytest.mark.parametrize("invalid_history_rows", [
    [{"id": "not-a-uuid"}],
    response("2026-10-21T12:00:00Z")["data"] * 2,
])
def test_unusable_model_identity_history_falls_back_to_older_passed_response(tmp_path, invalid_history_rows):
    from src.frontier_3d_refresh_difference_history import build_refresh_difference_report
    expected = write_response(tmp_path,"2026-10-20T12:00:00Z",response("2026-10-20T12:00:00Z"))
    unusable = response("2026-10-21T12:00:00Z")
    unusable["data"] = invalid_history_rows
    write_response(tmp_path,unusable["fetched_at_utc"],unusable)
    report = build_refresh_difference_report(response("2026-10-28T12:00:00Z"),tmp_path)
    assert report["status"] == "comparable"
    assert report["baseline_identity"]["response_filename"] == expected.name
    assert report["skipped_history_records"][0]["reason"]


def test_snapshot_binding_roundtrip_and_parameter_mismatch(tmp_path):
    from src.frontier_3d_refresh_difference_history import bind_scientific_snapshot_to_response, save_bound_scientific_snapshot, compare_bound_scientific_frontiers
    _, dataset=build_wave_5_dataset()
    previous=response_for_scientific_models(dataset,"2026-10-20T12:00:00Z")
    bind_scientific_snapshot_to_response(dataset,previous,catalog_source_identity={"sha256":"a"*64,"intelligence_index_version":"4.3.2"})
    path=save_bound_scientific_snapshot(dataset,tmp_path)
    assert json.loads(path.read_text())["dataset"]["snapshot_source_binding"] == dataset["snapshot_source_binding"]
    current=copy.deepcopy(dataset)
    assert compare_bound_scientific_frontiers(current,dataset)["status"] == "comparable"
    current["analysis_parameters"]["max_layers"] += 1
    assert compare_bound_scientific_frontiers(current,dataset)["status"] == "not_comparable"


def test_snapshot_refuses_unrelated_api_identity_and_intelligence():
    from src.frontier_3d_refresh_difference_history import bind_scientific_snapshot_to_response
    _,dataset=build_wave_5_dataset()
    with pytest.raises(ValueError,match="UUID"):
        bind_scientific_snapshot_to_response(dataset,response("2026-10-20T12:00:00Z"),catalog_source_identity={"sha256":"a"*64})
    current=response_for_scientific_models(dataset,"2026-10-20T12:00:00Z")
    current["data"][0]["evaluations"]["artificial_analysis_intelligence_index"] += 1
    with pytest.raises(ValueError,match="智能分"):
        bind_scientific_snapshot_to_response(dataset,current,catalog_source_identity={"sha256":"a"*64})


def test_matching_scientific_snapshot_compares_task_speed_without_rebuilding_history(tmp_path,monkeypatch):
    from src.frontier_3d_refresh_difference_history import bind_scientific_snapshot_to_response, save_bound_scientific_snapshot, build_refresh_difference_report
    from src import frontier_3d_visualization_dataset_builder as builder
    models,previous_dataset=build_wave_5_dataset()
    previous=response_for_scientific_models(previous_dataset,"2026-10-20T12:00:00Z")
    write_response(tmp_path,previous["fetched_at_utc"],previous)
    catalog_source={"sha256":"a"*64,"intelligence_index_version":"4.3.2"}
    bind_scientific_snapshot_to_response(previous_dataset,previous,catalog_source_identity=catalog_source)
    save_bound_scientific_snapshot(previous_dataset,tmp_path/"scientific-history")
    models.loc[models.index[0],"artificial_analysis_intelligence_index_time_per_task_seconds"]=60
    current_dataset=builder.build_frontier_3d_visualization_dataset(models,since_months=18,max_layers=3,hard_age_cutoff_months=36,speed_scale="log")
    current=response_for_scientific_models(current_dataset,"2026-10-28T12:00:00Z")
    bind_scientific_snapshot_to_response(current_dataset,current,catalog_source_identity=catalog_source)
    monkeypatch.setattr(builder,"build_frontier_3d_visualization_dataset",lambda *a,**kw:pytest.fail("不能用当前目录补算历史"))
    report=build_refresh_difference_report(current,tmp_path,current_dataset=current_dataset,scientific_snapshot_history_directory=tmp_path/"scientific-history")
    assert report["frontier_comparison"]["status"] == "comparable"
    assert any(change["field"] == "intelligence_index_tasks_per_hour" and change["relative_change"] == 1 for change in report["metric_changes_exceeding_ten_percent"])


@pytest.mark.parametrize("malformed_cost", [[1], "损坏的嵌套成本"])
def test_malformed_nested_history_automatically_uses_older_passed_baseline(tmp_path, malformed_cost):
    from src import fetch_data
    from src.frontier_3d_refresh_difference_history import build_refresh_difference_report
    expected = write_response(tmp_path, "2026-10-20T12:00:00Z", response("2026-10-20T12:00:00Z"))
    malformed = response("2026-10-21T12:00:00Z")
    malformed["data"][0]["artificial_analysis_intelligence_index_cost"] = malformed_cost
    malformed_path = write_response(tmp_path, malformed["fetched_at_utc"], malformed)
    original_bytes = malformed_path.read_bytes()
    assert fetch_data.find_previous_guardrail_passed_api_language_models_response_in_history(
        tmp_path, "2026-10-28T12:00:00Z"
    ) == (expected, 1)
    report = build_refresh_difference_report(response("2026-10-28T12:00:00Z"), tmp_path)
    assert report["status"] == "comparable"
    assert report["baseline_identity"]["response_filename"] == expected.name
    assert malformed_path.read_bytes() == original_bytes


def build_single_model_bound_scientific_snapshot(timestamp, *, model_uuid="abcdefab-cdef-4abc-9def-abcdefabcdef", task_seconds=120):
    import pandas as pd
    from src.frontier_3d_visualization_dataset_builder import build_frontier_3d_visualization_dataset, validate_frontier_3d_visualization_dataset
    from src.frontier_3d_refresh_difference_history import bind_scientific_snapshot_to_response
    from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe
    models = build_frontier_3d_synthetic_fixture_models_dataframe().iloc[:1].copy()
    models["id"] = model_uuid
    models["release_date"] = pd.Timestamp("2023-10-25")
    models["artificial_analysis_intelligence_index_time_per_task_seconds"] = task_seconds
    models["intelligence_index_time_per_task_value_is_from_current_intelligence_index_version"] = True
    models["intelligence_measurement_catalog_intelligence"] = models["intelligence"]
    models["intelligence_measurement_source"] = "artificial_analysis_embedded_model_catalog_accepted_partition"
    models.attrs["artificial_analysis_data_provenance"]["artificial_analysis_api_response_fetched_at_utc"] = timestamp
    dataset = build_frontier_3d_visualization_dataset(models, since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log")
    api_response = response_for_scientific_models(dataset, timestamp)
    bind_scientific_snapshot_to_response(dataset, api_response, catalog_source_identity={"sha256": "a" * 64, "intelligence_index_version": "4.3.2"})
    validate_frontier_3d_visualization_dataset(dataset)
    return dataset, api_response


def test_age_cutoff_visibility_change_never_changes_scientific_frontier_membership():
    from src.frontier_3d_refresh_difference_history import compare_bound_scientific_frontiers
    previous, _ = build_single_model_bound_scientific_snapshot("2026-10-24T12:00:00Z")
    current, _ = build_single_model_bound_scientific_snapshot("2026-10-26T12:00:00Z")
    for key in current["metric_variants"]:
        before = previous["metric_variants"][key]["model_analysis_records"][0]
        after = current["metric_variants"][key]["model_analysis_records"][0]
        assert before["layer"] == after["layer"] == 1
        assert before["analysis_eligibility"]["is_analysis_eligible_for_current_metric_variant"] is True
        assert after["analysis_eligibility"] == before["analysis_eligibility"]
        assert before["is_displayed"] is True and after["is_displayed"] is False
    for newer, older in ((current, previous), (previous, current)):
        comparison = compare_bound_scientific_frontiers(newer, older)
        assert comparison["status"] == "comparable"
        assert all(not identities for identities in comparison["entered_by_variant"].values())
        assert all(not identities for identities in comparison["exited_by_variant"].values())


def test_incomplete_historical_membership_is_explicitly_not_comparable():
    from src.frontier_3d_refresh_difference_history import compare_bound_scientific_frontiers
    current, _ = build_single_model_bound_scientific_snapshot("2026-10-24T12:00:00Z")
    previous = copy.deepcopy(current)
    for variant in previous["metric_variants"].values():
        variant.pop("model_analysis_records")
    assert compare_bound_scientific_frontiers(current, previous)["status"] == "not_comparable"


@pytest.mark.parametrize("previous_version,current_version", [("v4.3.2", "4.3.2"), ("4.3.2", "v4.3.2")])
def test_equivalent_index_version_spellings_share_identity_and_compare_bound_history(tmp_path, previous_version, current_version):
    from src import fetch_data
    from src.frontier_3d_refresh_difference_history import (
        _api_response_identity_sha256, bind_scientific_snapshot_to_response,
        build_refresh_difference_report, save_bound_scientific_snapshot,
    )
    previous_dataset, previous = build_single_model_bound_scientific_snapshot("2026-10-20T12:00:00Z")
    previous["intelligence_index_version"] = previous_version
    write_response(tmp_path, previous["fetched_at_utc"], previous)
    cache_path = tmp_path / "synthetic-api-cache.json"
    cache_path.write_text(json.dumps(previous))
    rows, metadata = fetch_data.load_artificial_analysis_api_language_models_with_response_metadata(
        refresh=False, api_language_models_cache_path=cache_path,
    )
    accepted_previous = {**metadata, "data": rows}
    assert accepted_previous["intelligence_index_version"] == "4.3.2"
    assert _api_response_identity_sha256(previous) == _api_response_identity_sha256(accepted_previous)
    catalog = {"sha256": "a" * 64, "intelligence_index_version": "4.3.2"}
    bind_scientific_snapshot_to_response(previous_dataset, accepted_previous, catalog_source_identity=catalog)
    save_bound_scientific_snapshot(previous_dataset, tmp_path / "scientific-history")
    current_dataset, current = build_single_model_bound_scientific_snapshot("2026-10-24T12:00:00Z", task_seconds=60)
    current["intelligence_index_version"] = current_version
    current_dataset["artificial_analysis_data_provenance"]["current_intelligence_index_version"] = current_version
    bind_scientific_snapshot_to_response(current_dataset, current, catalog_source_identity={**catalog, "intelligence_index_version": current_version})
    report = build_refresh_difference_report(current, tmp_path, current_dataset=current_dataset, scientific_snapshot_history_directory=tmp_path / "scientific-history")
    assert report["index_comparison_status"] == "compatible"
    assert report["index_version_warning"] is None
    assert report["frontier_comparison"]["status"] == "comparable"
    assert previous["intelligence_index_version"] == previous_version
    assert current_dataset["snapshot_source_binding"]["api_intelligence_index_version"] == current_version
    assert any(change["field"] == "intelligence_index_tasks_per_hour" for change in report["metric_changes_exceeding_ten_percent"])
    previous["data"][0]["evaluations"]["artificial_analysis_intelligence_index"] = 20
    write_response(tmp_path, previous["fetched_at_utc"], previous)
    assert any(change["field"] == "intelligence" for change in build_refresh_difference_report(current, tmp_path)["metric_changes_exceeding_ten_percent"])


def test_uuid_spelling_does_not_create_frontier_changes_or_lose_historical_metric_association(tmp_path):
    from src.frontier_3d_refresh_difference_history import build_refresh_difference_report, save_bound_scientific_snapshot
    previous_dataset, previous = build_single_model_bound_scientific_snapshot("2026-10-20T12:00:00Z")
    write_response(tmp_path, previous["fetched_at_utc"], previous)
    save_bound_scientific_snapshot(previous_dataset, tmp_path / "scientific-history")
    current_dataset, current = build_single_model_bound_scientific_snapshot(
        "2026-10-24T12:00:00Z", model_uuid=previous_dataset["models"][0]["model_uuid"].upper(), task_seconds=60,
    )
    report = build_refresh_difference_report(current, tmp_path, current_dataset=current_dataset, scientific_snapshot_history_directory=tmp_path / "scientific-history")
    comparison = report["frontier_comparison"]
    assert comparison["status"] == "comparable"
    assert all(not identities for identities in comparison["entered_by_variant"].values())
    assert all(not identities for identities in comparison["exited_by_variant"].values())
    changes = [change for change in report["metric_changes_exceeding_ten_percent"] if change["field"] == "intelligence_index_tasks_per_hour"]
    assert len(changes) == 1 and changes[0]["relative_change"] == 1
    assert changes[0]["model_uuid"] == previous_dataset["models"][0]["model_uuid"]
