"""只读 passed API 历史和绑定科学快照；绝不使用当期目录重建历史。"""
from __future__ import annotations

import hashlib
import json
import math
from datetime import datetime
from decimal import Decimal
from pathlib import Path
from uuid import UUID

from .fetch_data import (
    find_previous_guardrail_passed_api_language_models_response_in_history,
    normalize_intelligence_index_version_string,
)
from .frontier_3d_worktree_storage_paths import refuse_shared_worktree_directory_write


def _canonical_json_bytes(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"), allow_nan=False).encode("utf-8")


def response_content_sha256(response):
    return hashlib.sha256(_canonical_json_bytes(response)).hexdigest()


def _api_response_identity_sha256(response):
    identity = {field: response.get(field) for field in ("data", "fetched_at_utc", "source_url", "tier", "intelligence_index_version")}
    identity["intelligence_index_version"] = normalize_intelligence_index_version_string(identity["intelligence_index_version"])
    return response_content_sha256(identity)


def _rows_by_uuid(response):
    rows = response.get("data")
    if not isinstance(rows, list):
        raise ValueError("API 响应缺少模型列表")
    result = {}
    for row in rows:
        if not isinstance(row, dict):
            raise ValueError("API 模型记录不是对象")
        try:
            identity = str(UUID(row["id"]))
        except (ValueError, TypeError, KeyError, AttributeError) as error:
            raise ValueError("API 模型 UUID 缺失或无效") from error
        if identity in result:
            raise ValueError("API 响应存在重复 UUID，不能唯一比较")
        result[identity] = row
    return result


def _numeric_field(row, path):
    value = row
    for component in path:
        value = value.get(component) if isinstance(value, dict) else None
    if not isinstance(value, (int, float)) or isinstance(value, bool):
        return None
    try:
        return float(value) if math.isfinite(value) else None
    except OverflowError:
        return None


API_DIFFERENCE_METRIC_PATHS = {
    "intelligence": ("evaluations", "artificial_analysis_intelligence_index"),
    "cost_to_run": ("artificial_analysis_intelligence_index_cost", "total_cost"),
    "output_speed": ("performance", "median_output_tokens_per_second"),
    "median_end_to_end_response_time_seconds": ("performance", "median_end_to_end_response_time_seconds"),
    "price_input": ("pricing", "price_1m_input_tokens"),
    "price_output": ("pricing", "price_1m_output_tokens"),
    "price_cache_hit": ("pricing", "price_1m_cache_hit_tokens"),
}


def _not_comparable(reason):
    return {"status": "not_comparable", "reason": reason, "entered_by_variant": {}, "exited_by_variant": {}}


def bind_scientific_snapshot_to_response(dataset, response, *, catalog_source_identity):
    response_rows = _rows_by_uuid(response)
    scientific_models = {str(UUID(model["model_uuid"])): model for model in dataset["models"] if model.get("model_uuid")}
    if set(scientific_models) != set(response_rows) or len(scientific_models) != len(dataset["models"]):
        raise ValueError("科学快照模型 UUID 与绑定 API 响应不一致")
    for identity, model in scientific_models.items():
        intelligence = _numeric_field(response_rows[identity], API_DIFFERENCE_METRIC_PATHS["intelligence"])
        if intelligence != model.get("panel", {}).get("intelligence"):
            raise ValueError("科学快照智能分与绑定 API 响应不一致")
    dataset["snapshot_source_binding"] = {
        "api_response_sha256": _api_response_identity_sha256(response),
        "api_response_fetched_at_utc": response.get("fetched_at_utc"),
        "api_source_url": response.get("source_url"), "api_tier": response.get("tier"),
        "api_intelligence_index_version": response.get("intelligence_index_version"),
        "catalog_source_identity": catalog_source_identity,
        "analysis_parameters": dict(dataset["analysis_parameters"]),
    }


def compare_bound_scientific_frontiers(current_dataset, previous_dataset):
    current = current_dataset.get("snapshot_source_binding") or {}
    previous = previous_dataset.get("snapshot_source_binding") or {}
    for binding in (current, previous):
        if not binding.get("api_response_sha256") or not binding.get("catalog_source_identity", {}).get("sha256"):
            return _not_comparable("缺少与响应绑定的目录来源和科学快照；未用当前目录补算历史。")
    for field in ("api_source_url", "api_tier"):
        if current.get(field) is None or current.get(field) != previous.get(field):
            return _not_comparable("API 来源、层级或指数版本未知或不匹配。")
    api_versions = [normalize_intelligence_index_version_string(binding.get("api_intelligence_index_version")) for binding in (current, previous)]
    if not api_versions[0] or api_versions[0] != api_versions[1]:
        return _not_comparable("API 来源、层级或指数版本未知或不匹配。")
    catalog_versions = [normalize_intelligence_index_version_string(binding["catalog_source_identity"].get("intelligence_index_version")) for binding in (current,previous)]
    if not catalog_versions[0] or catalog_versions[0] != catalog_versions[1]:
        return _not_comparable("目录快照版本未知或不匹配。")
    if current_dataset.get("analysis_parameters") != previous_dataset.get("analysis_parameters"):
        return _not_comparable("分析参数不同；前沿进出不可比较。")
    for dataset in (current_dataset, previous_dataset):
        if dataset["analysis_parameters"] != dataset["snapshot_source_binding"].get("analysis_parameters"):
            return _not_comparable("科学快照的分析参数与来源绑定不一致。")
    current_version = normalize_intelligence_index_version_string(current_dataset.get("artificial_analysis_data_provenance", {}).get("current_intelligence_index_version"))
    previous_version = normalize_intelligence_index_version_string(previous_dataset.get("artificial_analysis_data_provenance", {}).get("current_intelligence_index_version"))
    if not current_version or current_version != previous_version:
        return _not_comparable("科学快照的智能指数版本未知或不同。")

    variant_keys = current_dataset["metric_variants"].keys() & previous_dataset["metric_variants"].keys()
    if any("model_analysis_records" not in dataset["metric_variants"][key]
           for dataset in (current_dataset, previous_dataset) for key in variant_keys):
        return _not_comparable("历史科学快照缺少完整分析成员；不能从显示子集推断前沿进出。")

    def frontier_identities(dataset, variant_key):
        return {str(UUID(dataset["models"][record["model_index"]]["model_uuid"]))
                for record in dataset["metric_variants"][variant_key]["model_analysis_records"]
                if record.get("layer") == 1 and dataset["models"][record["model_index"]].get("model_uuid")}

    entered, exited = {}, {}
    for key in variant_keys:
        current_members, previous_members = frontier_identities(current_dataset, key), frontier_identities(previous_dataset, key)
        entered[key], exited[key] = sorted(current_members - previous_members), sorted(previous_members - current_members)
    return {"status": "comparable", "reason": None, "entered_by_variant": entered, "exited_by_variant": exited}


def _read_bound_scientific_snapshot(path):
    from .frontier_3d_visualization_dataset_builder import validate_frontier_3d_visualization_dataset
    wrapper = json.loads(path.read_text(encoding="utf-8"))
    dataset = wrapper["dataset"]
    if wrapper["scientific_dataset_sha256"] != response_content_sha256(dataset):
        raise ValueError("科学快照摘要不匹配")
    validate_frontier_3d_visualization_dataset(dataset)
    return dataset


def build_refresh_difference_report(current_response, response_history_directory, *, current_dataset=None, scientific_snapshot_history_directory=None):
    report = {"status": "not_comparable", "reason": None, "baseline_identity": None, "previous_data_date": None,
              "index_comparison_status": "unknown", "index_version_warning": None, "added_model_uuids": [], "skipped_history_records": [],
              "absent_model_uuids": [], "field_missingness_changes": [], "metric_changes_exceeding_ten_percent": [],
              "frontier_comparison": _not_comparable("缺少匹配科学快照；未用当前目录补算历史。")}
    timestamp = current_response.get("fetched_at_utc")
    if not timestamp:
        report["reason"] = "当期 API 抓取时间未知，无法选择严格早于当期的响应。"
        return report
    try:
        current_rows = _rows_by_uuid(current_response)
    except ValueError as error:
        report["reason"] = str(error)
        return report
    search_before_timestamp = timestamp
    while True:
        try:
            selected = find_previous_guardrail_passed_api_language_models_response_in_history(response_history_directory, search_before_timestamp)
        except (ValueError, TypeError):
            selected = None
        if selected is None:
            report["reason"] = "没有严格早于本次响应且模型 UUID 可唯一核对的合格 API 历史。"
            return report
        path, _ = selected
        timestamp_from_filename = datetime.strptime(path.name.split("_fetched_at_")[-1][:16], "%Y%m%dT%H%M%SZ").strftime("%Y-%m-%dT%H:%M:%SZ")
        try:
            previous = json.loads(path.read_text(encoding="utf-8"))
            previous_rows = _rows_by_uuid(previous)
            break
        except (ValueError, OSError, TypeError) as error:
            report["skipped_history_records"].append({"response_filename": path.name, "reason": str(error)})
            # 截止时间严格前移，自动补查更早原件；保留坏记录与跳过原因。
            search_before_timestamp = timestamp_from_filename
    previous_timestamp = previous.get("fetched_at_utc") or timestamp_from_filename
    previous["fetched_at_utc"] = previous_timestamp
    if previous_timestamp >= timestamp:
        report["reason"] = "历史响应原件的时间不早于当期，未作为比较基线。"
        return report
    report["baseline_identity"] = {"response_filename": path.name, "response_sha256": _api_response_identity_sha256(previous), "fetched_at_utc": previous_timestamp}
    report["previous_data_date"] = previous_timestamp[:10] if "-" in previous_timestamp else f"{previous_timestamp[:4]}-{previous_timestamp[4:6]}-{previous_timestamp[6:8]}"
    report["status"] = "comparable"
    report["added_model_uuids"] = sorted(current_rows.keys() - previous_rows.keys())
    report["absent_model_uuids"] = sorted(previous_rows.keys() - current_rows.keys())
    current_version = normalize_intelligence_index_version_string(current_response.get("intelligence_index_version"))
    previous_version = normalize_intelligence_index_version_string(previous.get("intelligence_index_version"))
    compatible = current_version is not None and previous_version is not None and current_version == previous_version
    report["index_comparison_status"] = "compatible" if compatible else ("unknown" if current_version is None or previous_version is None else "changed")
    if not compatible:
        report["index_version_warning"] = f"指数版本 {previous_version or '未知'} → {current_version or '未知'}；停止智能分、指数成本、任务速度与前沿进出比较。"
    for identity in sorted(current_rows.keys() & previous_rows.keys()):
        for field, metric_path in API_DIFFERENCE_METRIC_PATHS.items():
            old, new = _numeric_field(previous_rows[identity], metric_path), _numeric_field(current_rows[identity], metric_path)
            if (old is None) != (new is None):
                report["field_missingness_changes"].append({"model_uuid": identity, "field": field, "previous_missing": old is None, "current_missing": new is None})
            if not compatible and field in ("intelligence", "cost_to_run"):
                continue
            if old is not None and new is not None and old > 0 and new > 0 and abs(Decimal(str(new)) - Decimal(str(old))) > Decimal(str(old)) * Decimal("0.1"):
                report["metric_changes_exceeding_ten_percent"].append({"model_uuid": identity, "field": field, "previous": old, "current": new, "relative_change": (new-old)/old})
    if compatible and current_dataset and scientific_snapshot_history_directory:
        for snapshot_path in sorted(Path(scientific_snapshot_history_directory).glob("*.json")):
            try:
                snapshot = _read_bound_scientific_snapshot(snapshot_path)
                binding = snapshot.get("snapshot_source_binding", {})
                if binding.get("api_response_sha256") != report["baseline_identity"]["response_sha256"]:
                    continue
                comparison = compare_bound_scientific_frontiers(current_dataset, snapshot)
                report["frontier_comparison"] = comparison
                if comparison["status"] == "comparable":
                    comparison["baseline_scientific_snapshot_filename"] = snapshot_path.name
                    previous_models = {str(UUID(model["model_uuid"])): model for model in snapshot["models"] if model.get("model_uuid")}
                    for model in current_dataset["models"]:
                        identity = str(UUID(model["model_uuid"])) if model.get("model_uuid") else None
                        previous_model = previous_models.get(identity)
                        if not previous_model:
                            continue
                        for field in ("eff_speed", "intelligence_index_tasks_per_hour", "artificial_analysis_intelligence_index_time_per_task_seconds", "blended_price_cache_input_output_7_to_2_to_1"):
                            old = _numeric_field(previous_model, ("panel", field))
                            new = _numeric_field(model, ("panel", field))
                            change = {"model_uuid": identity, "field": field, "comparison_source": "bound_scientific_snapshot"}
                            if (old is None) != (new is None):
                                report["field_missingness_changes"].append({**change,"previous_missing":old is None,"current_missing":new is None})
                            if field == "eff_speed":
                                from .fetch_data import intelligence_index_version_family
                                family = intelligence_index_version_family(current_dataset["artificial_analysis_data_provenance"].get("current_intelligence_index_version"))
                                if any(intelligence_index_version_family(record.get("value_provenance", {}).get("output_token_count_value_intelligence_index_version")) != family for record in (model,previous_model)):
                                    continue
                            if field in ("intelligence_index_tasks_per_hour", "artificial_analysis_intelligence_index_time_per_task_seconds"):
                                if not all(record.get("intelligence_index_task_time_evidence", {}).get("is_verified_current") is True for record in (model,previous_model)):
                                    continue
                            if old is not None and new is not None and old > 0 and new > 0 and abs(Decimal(str(new))-Decimal(str(old))) > Decimal(str(old))*Decimal("0.1"):
                                report["metric_changes_exceeding_ten_percent"].append({**change,"previous":old,"current":new,"relative_change":(new-old)/old})
                    break
            except (OSError, ValueError, KeyError, TypeError):
                continue
    return report


def save_bound_scientific_snapshot(dataset, history_directory):
    from .frontier_3d_visualization_dataset_builder import validate_frontier_3d_visualization_dataset
    if not dataset.get("snapshot_source_binding"):
        return None
    validate_frontier_3d_visualization_dataset(dataset)
    digest = response_content_sha256(dataset)
    path = Path(history_directory) / f"frontier_3d_scientific_snapshot_{digest}.json"
    refuse_shared_worktree_directory_write(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    payload = _canonical_json_bytes({"scientific_dataset_sha256": digest, "dataset": dataset})
    try:
        with path.open("xb") as output:
            output.write(payload)
    except FileExistsError:
        if path.read_bytes() != payload:
            raise ValueError("同摘要的历史快照内容不一致")
    return path


def attach_refresh_difference_report_from_cached_sources(dataset, raw_data_directory, snapshot_history_directory, *, accepted_source_records=None):
    raw_directory = Path(raw_data_directory)
    if not accepted_source_records:
        dataset["refresh_difference_report"] = {"status": "not_comparable", "reason": "未提供可绑定的 API 响应原件。"}
        dataset["previous_data_date"] = None
        return
    # 使用取数时保留的实际接受记录；不重读可能已被另一个刷新替换的 active 缓存。
    response = accepted_source_records["api_response"]
    catalog_identity = accepted_source_records["catalog_source_identity"]
    bind_scientific_snapshot_to_response(dataset, response, catalog_source_identity=catalog_identity)
    report = build_refresh_difference_report(response, raw_directory / "artificial_analysis_api_language_models_response_history",
        current_dataset=dataset, scientific_snapshot_history_directory=snapshot_history_directory)
    dataset["refresh_difference_report"], dataset["previous_data_date"] = report, report["previous_data_date"]
