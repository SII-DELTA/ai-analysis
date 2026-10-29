"""从显式、带校验值的持久来源清单读取历史样本；不修改任何输入缓存。"""
from __future__ import annotations

import hashlib
import json
import math
import re
import subprocess
import tarfile
from datetime import datetime, timezone
from pathlib import Path
from uuid import UUID

from . import fetch_data

HISTORICAL_SOURCE_MANIFEST_SCHEMA_VERSION = "frontier_3d_historical_source_manifest/v1"


def finite_number_or_none(value):
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        return None
    return float(value) if math.isfinite(value) else None


def normalized_index_version(value):
    version = fetch_data.normalize_intelligence_index_version_string(value)
    if version and version.isdigit():
        version += ".0"
    return version


def _timestamp(value):
    parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    if parsed.tzinfo is None:
        raise ValueError("观测时间必须带时区")
    return parsed.astimezone(timezone.utc)


def read_verified_historical_source_bytes(specification, manifest_directory):
    """原件失效时有界尝试归档、Git 对象；失败历史保留在返回的证据中。"""
    expected_sha256 = specification["sha256"]
    if not re.fullmatch(r"[0-9a-f]{64}", expected_sha256):
        raise ValueError("来源缺少有效 SHA256")
    failures = []

    def resolved(path):
        return (manifest_directory / path).resolve()

    def checked(content, recovered_from):
        if hashlib.sha256(content).hexdigest() != expected_sha256:
            raise ValueError("来源 SHA256 不匹配")
        return content, {"sha256": expected_sha256, "path": specification.get("path"),
                         "recovered_from": recovered_from, "prior_read_failures": list(failures)}

    try:
        return checked(resolved(specification["path"]).read_bytes(), None)
    except (OSError, ValueError, KeyError, TypeError) as error:
        failures.append(str(error))
    if specification.get("archive_path") and specification.get("archive_member"):
        try:
            with tarfile.open(resolved(specification["archive_path"]), "r:*") as archive:
                member = archive.getmember(specification["archive_member"])
                if not member.isfile() or member.size > 32 * 1024 * 1024:
                    raise ValueError("归档成员不是允许大小的普通文件")
                return checked(archive.extractfile(member).read(), "archive")
        except (OSError, ValueError, KeyError, tarfile.TarError) as error:
            failures.append(str(error))
    if specification.get("git_blob_oid") and specification.get("git_repository_path"):
        try:
            oid = specification["git_blob_oid"]
            if not re.fullmatch(r"[0-9a-f]{40,64}", oid):
                raise ValueError("Git 对象 ID 无效")
            content = subprocess.run(
                ["git", "cat-file", "blob", oid], cwd=resolved(specification["git_repository_path"]),
                capture_output=True, check=True, timeout=20,
            ).stdout
            return checked(content, "git_object")
        except (OSError, ValueError, subprocess.SubprocessError) as error:
            failures.append(str(error))
    raise ValueError("所有等价来源均不可验证：" + "；".join(failures))


def _provenance_fields(version, observed_at, source_name):
    return {
        f"{metric}_value_{suffix}": value
        for metric in ("intelligence", "cost_to_run", "output_token_count", "output_speed", "blended_price")
        for suffix, value in (("source", source_name), ("intelligence_index_version", None if metric in ("output_speed", "blended_price") else version),
                              ("fetched_at_utc", observed_at))
    }


def _legacy_page_rows(content, source):
    text = content.decode("utf-8")
    invalidity = fetch_data.find_artificial_analysis_model_detail_page_html_structure_invalidity_reason(text)
    if invalidity:
        raise ValueError(invalidity)
    versions = fetch_data._ARTIFICIAL_ANALYSIS_INTELLIGENCE_INDEX_VERSION_STRING_PATTERN.findall(text)
    if not versions or normalized_index_version(max(versions, key=fetch_data._intelligence_index_version_sort_key)) != source["intelligence_index_version"]:
        raise ValueError("HTML 精确指数版本与清单不一致")
    # 生产解析器负责页内 UUID 冲突与结构校验；完整对象补出历史回放必需的日期与速度。
    fetch_data.parse_artificial_analysis_embedded_model_catalog_records_from_model_detail_page_html(text)
    payload = fetch_data._decode_next_js_react_server_component_payload_text_from_page_html(text)
    decoder = json.JSONDecoder()
    objects = {}
    for match in fetch_data._ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_OBJECT_START_PATTERN.finditer(payload):
        try:
            row, _ = decoder.raw_decode(payload, match.start())
        except ValueError:
            continue
        if "intelligenceIndex" in row and "creator" in row:
            previous = objects.get(row["id"])
            if previous is not None and previous != row:
                raise ValueError("同页完整模型对象冲突，不选择其中一份")
            objects[row["id"]] = row
    rows = []
    for identifier, row in objects.items():
        creator = row.get("creator") or {}
        rows.append({
            "id": identifier, "name": row.get("name"), "slug": row.get("slug"),
            "creator": creator.get("name") or "?", "creator_uuid": creator.get("id"),
            "release_date": row.get("releaseDate"),
            "intelligence": finite_number_or_none(row.get("intelligenceIndex")),
            "cost_to_run": finite_number_or_none((row.get("intelligenceIndexCost") or {}).get("total")),
            "output_speed": finite_number_or_none((row.get("timescaleData") or {}).get("medianOutputSpeed")),
            "blended_price_cache_input_output_7_to_2_to_1": finite_number_or_none(row.get("price1mBlended7To2To1")),
            "intelligence_index_canonical_output_token_count": finite_number_or_none((row.get("canonicalIntelligenceIndexTokenCount") or {}).get("output")),
            "artificial_analysis_intelligence_index_is_estimated": row.get("intelligenceIndexIsEstimated"),
            "artificial_analysis_release_slug": (row.get("release") or {}).get("slug"),
            "artificial_analysis_reasoning_effort_slug": fetch_data._slug_from_nested_object_or_string(row.get("effort")),
            "artificial_analysis_is_reasoning_model": row.get("isReasoning"),
            "historical_speed_measurement_context": {"prompt_type": "long", "performance_data_source": row.get("performanceDataSource")},
            **_provenance_fields(source["intelligence_index_version"], source["observed_at_utc"], "verified_historical_html_catalog"),
        })
    return rows


def _api_rows(content, catalog_content, source):
    payload = json.loads(content)
    if not isinstance(payload, dict):
        raise ValueError("API 响应顶层必须是对象")
    version = normalized_index_version(payload.get("intelligence_index_version"))
    expected_version = source["intelligence_index_version"]
    if version is None or fetch_data.intelligence_index_version_family(version) != fetch_data.intelligence_index_version_family(expected_version):
        raise ValueError("API 指数版本与清单不一致")
    if version != expected_version and version.count(".") > 1:
        raise ValueError("API 明确的补丁版本与配套目录不一致")
    pagination = payload.get("pagination")
    if pagination is None:
        pagination = {}
    if not isinstance(pagination, dict):
        raise ValueError("API pagination 必须是对象")
    if pagination.get("has_more") or pagination.get("total_pages", 1) > 1:
        raise ValueError("API 文件仅为部分分页，不能冒充完整快照")
    if not isinstance(payload.get("data"), list):
        raise ValueError("API 缺少模型数组")
    catalog = json.loads(catalog_content) if catalog_content else {}
    if not isinstance(catalog, dict):
        raise ValueError("数值目录顶层必须是对象")
    catalog_version = normalized_index_version(catalog.get("intelligence_index_version"))
    if catalog and catalog_version != expected_version:
        raise ValueError("配套目录精确版本不匹配")
    if version != expected_version and not catalog:
        raise ValueError("API 只提供版本 family，缺少精确补丁版本证据")
    source["intelligence_index_version_resolution"] = "api_family_refined_by_paired_catalog" if version != expected_version else "explicit_api_version"
    catalog_records = catalog.get("records_by_model_id", {})
    if not isinstance(catalog_records, dict):
        raise ValueError("数值目录的 UUID 记录表无效")
    api_observed_at = payload.get("fetched_at_utc") or source["observed_at_utc"]
    catalog_observed_at = catalog.get("fetched_at_utc") or source["observed_at_utc"]
    if _timestamp(api_observed_at) > _timestamp(source["observed_at_utc"]) or (catalog and _timestamp(catalog_observed_at) > _timestamp(source["observed_at_utc"])):
        raise ValueError("快照观测时间早于组成它的数值观测")
    source["source_component_provenance"] = {
        "artificial_analysis_api_response_fetched_at_utc": api_observed_at,
        "artificial_analysis_api_response_fetched_at_utc_source": "recorded_at_fetch_time" if payload.get("fetched_at_utc") else source["observed_at_utc_source"],
        "embedded_model_catalog_intelligence_index_version": catalog_version,
        "embedded_model_catalog_captured_at_utc": catalog_observed_at if catalog else None,
    }
    rows = []
    for row in payload["data"]:
        if not isinstance(row, dict) or any(row.get(key) is not None and not isinstance(row[key], dict) for key in ("model_creator", "evaluations", "artificial_analysis_intelligence_index_cost", "pricing", "performance")):
            raise ValueError("API 模型记录的字段结构无效")
        identifier = row["id"]
        record = catalog_records.get(identifier, {})
        if not isinstance(record, dict):
            raise ValueError("数值目录模型记录必须是对象")
        intelligence = finite_number_or_none((row.get("evaluations") or {}).get("artificial_analysis_intelligence_index"))
        catalog_intelligence = finite_number_or_none(record.get("intelligence_index"))
        agrees = intelligence is not None and catalog_intelligence is not None and abs(intelligence - catalog_intelligence) <= .05
        blended, blended_source = fetch_data.calculate_blended_price_cache_input_output_7_to_2_to_1_with_cache_hit_price_source(row.get("pricing") or {})
        result = {
            "id": identifier, "name": row.get("name"), "slug": row.get("slug"),
            "creator": (row.get("model_creator") or {}).get("name") or "?",
            "creator_uuid": (row.get("model_creator") or {}).get("id"), "release_date": row.get("release_date"),
            "intelligence": intelligence,
            "cost_to_run": finite_number_or_none((row.get("artificial_analysis_intelligence_index_cost") or {}).get("total_cost")),
            "output_speed": finite_number_or_none((row.get("performance") or {}).get("median_output_tokens_per_second")),
            "blended_price_cache_input_output_7_to_2_to_1": finite_number_or_none(blended),
            "blended_price_cache_hit_price_source": blended_source,
            "intelligence_index_canonical_output_token_count": finite_number_or_none(record.get("canonical_output_token_count")),
            "artificial_analysis_intelligence_index_is_estimated": record.get("intelligence_index_is_estimated") if agrees else None,
            "artificial_analysis_release_slug": record.get("release_slug"),
            "artificial_analysis_reasoning_effort_slug": record.get("reasoning_effort_slug"),
            "artificial_analysis_is_reasoning_model": record.get("is_reasoning"),
            "historical_speed_measurement_context": {"prompt_type": "long", "performance_data_source": "api_model_aggregate"},
            **_provenance_fields(expected_version, api_observed_at, "verified_historical_api_response"),
        }
        result.update(output_token_count_value_source="verified_historical_numeric_catalog" if record else None,
                      output_token_count_value_fetched_at_utc=catalog_observed_at if record else None,
                      output_token_count_value_intelligence_index_version=catalog_version,
                      output_token_count_catalog_intelligence_agrees=agrees)
        rows.append(result)
    return rows


def load_historical_source_manifest(manifest_path):
    """逐源隔离失败，保留恢复证据；机器缺口不阻断其他已验证样本。"""
    manifest_path = Path(manifest_path).resolve()
    manifest = json.loads(manifest_path.read_text())
    if manifest.get("schema_version") != HISTORICAL_SOURCE_MANIFEST_SCHEMA_VERSION:
        raise ValueError("历史来源清单 schema_version 不匹配")
    snapshots, outcomes = [], []
    identifiers = set()
    for source in manifest["sources"]:
        identifier = source["source_snapshot_id"]
        if identifier in identifiers:
            raise ValueError("来源快照 ID 重复")
        identifiers.add(identifier)
        outcome = {"source_snapshot_id": identifier, "status": "rejected", "source_evidence": []}
        try:
            if source.get("quarantine_reason"):
                raise ValueError(source["quarantine_reason"])
            source = {**source, "observed_at_utc": _timestamp(source["observed_at_utc"]).isoformat().replace("+00:00", "Z"),
                      "intelligence_index_version": normalized_index_version(source["intelligence_index_version"])}
            if source["observed_at_utc_source"] not in {"recorded_at_fetch_time", "inferred_from_cache_file_modification_time"}:
                raise ValueError("观测时间来源未知，不允许作严格回放")
            primary_field = "html_source_file" if source["source_kind"] == "legacy_html" else "api_response_file"
            content, evidence = read_verified_historical_source_bytes(source[primary_field], manifest_path.parent)
            outcome["source_evidence"].append(evidence)
            if source["source_kind"] == "legacy_html":
                rows = _legacy_page_rows(content, source)
                source["intelligence_index_version_resolution"] = "explicit_html_version"
                source["source_component_provenance"] = {
                    "artificial_analysis_api_response_fetched_at_utc": None,
                    "artificial_analysis_api_response_fetched_at_utc_source": None,
                    "embedded_model_catalog_intelligence_index_version": source["intelligence_index_version"],
                    "embedded_model_catalog_captured_at_utc": source["observed_at_utc"],
                }
            elif source["source_kind"] == "api_with_catalog":
                catalog_content = None
                if source.get("numeric_catalog_file"):
                    catalog_content, evidence = read_verified_historical_source_bytes(source["numeric_catalog_file"], manifest_path.parent)
                    outcome["source_evidence"].append(evidence)
                rows = _api_rows(content, catalog_content, source)
            else:
                raise ValueError("不支持的历史来源类型")
            if not rows:
                raise ValueError("来源没有可核验模型记录")
            if any(not isinstance(row.get("id"), str) for row in rows):
                raise ValueError("模型 UUID 必须是字符串")
            uuids = [str(UUID(row["id"])) for row in rows]
            if len(set(uuids)) != len(uuids):
                raise ValueError("同一快照 UUID 重复")
            for row, identifier in zip(rows, uuids):
                row["id"] = identifier
            outcome["status"] = "accepted_for_historical_variant_validation"
            snapshots.append({key: source[key] for key in ("source_snapshot_id", "source_kind", "intelligence_index_version", "intelligence_index_version_resolution", "observed_at_utc", "observed_at_utc_source", "source_component_provenance")}
                             | {"rows": rows, "source_evidence": outcome["source_evidence"], "source_warnings": []})
        except (OSError, ValueError, KeyError, TypeError) as error:
            outcome["rejection_reason"] = str(error)
            outcome["automatic_recheck_condition"] = "原件或等价归档恢复为清单中的 SHA256 后，重新运行同一清单"
        outcomes.append(outcome)
    return snapshots, outcomes
