"""只读原 HTML、逐文件校验持久归档，并按精确版本与 UTC 日期抽取数值。"""

from __future__ import annotations

from collections import defaultdict
from dataclasses import asdict
from datetime import datetime, timezone
from hashlib import sha256
from pathlib import Path
import csv
import json
import os
import tarfile

from .artificial_analysis_guardrail_validated_json_response_storage import (
    write_json_file_atomically,
)
from .artificial_analysis_minimal_model_catalog_refresh import (
    NUMERIC_CATALOG_RESPONSE_SCHEMA_VERSION,
)


def archive_and_extract_legacy_catalogs(
    source_directory: Path,
    destination_directory: Path,
    *,
    historical_capture_date: str = "2026-08-04",
) -> dict:
    from . import fetch_data

    source_directory = source_directory.resolve()
    destination_directory = destination_directory.resolve()
    if destination_directory.is_relative_to(source_directory):
        raise ValueError("归档目标必须位于原 HTML 目录之外")
    paths = sorted(source_directory.glob("*.html"))
    if not paths:
        raise ValueError("没有可归档的 HTML")
    manifest = {
        path.name: {
            "sha256": sha256(path.read_bytes()).hexdigest(),
            "byte_count": path.stat().st_size,
            "cache_mtime_utc": datetime.fromtimestamp(
                path.stat().st_mtime, timezone.utc
            ).isoformat(),
        }
        for path in paths
    }
    destination_directory.mkdir(parents=True, exist_ok=True)
    archive_path = (
        destination_directory
        / "original-artificial-analysis-model-detail-page-html-read-only-backup.tar.gz"
    )
    if (
        archive_path.exists()
        or archive_path.with_name(archive_path.name + ".failed-verification").exists()
    ):
        raise FileExistsError("备份目录已有归档，拒绝覆盖；请使用新的持久目录")
    try:
        with tarfile.open(archive_path, "x:gz", compresslevel=6) as archive:
            for path in paths:
                archive.add(
                    path,
                    arcname="artificial_analysis_model_detail_page_html/" + path.name,
                    recursive=False,
                )
        with tarfile.open(archive_path, "r:gz") as archive:
            for path in paths:
                archived = archive.extractfile(
                    "artificial_analysis_model_detail_page_html/" + path.name
                ).read()
                if (
                    sha256(archived).hexdigest() != manifest[path.name]["sha256"]
                    or sha256(path.read_bytes()).hexdigest()
                    != manifest[path.name]["sha256"]
                ):
                    raise ValueError("归档校验失败或源文件在归档期间发生变化")
    except Exception:
        # 不保留外观像完整备份、实则中断的文件；原 HTML 从不修改。
        if archive_path.exists():
            archive_path.rename(
                archive_path.with_name(archive_path.name + ".failed-verification")
            )
        raise
    partitions = defaultdict(list)
    invalid_pages = {}
    for path in paths:
        text = path.read_text(encoding="utf-8", errors="ignore")
        reason = fetch_data.find_artificial_analysis_model_detail_page_html_structure_invalidity_reason(
            text
        )
        if reason:
            invalid_pages[path.name] = reason
            continue
        versions = fetch_data._ARTIFICIAL_ANALYSIS_INTELLIGENCE_INDEX_VERSION_STRING_PATTERN.findall(
            text
        )
        if not versions:
            invalid_pages[path.name] = "页面缺少指数版本"
            continue
        version = max(versions, key=fetch_data._intelligence_index_version_sort_key)
        try:
            records = fetch_data.parse_artificial_analysis_embedded_model_catalog_records_from_model_detail_page_html(
                text
            )
        except ValueError:
            invalid_pages[path.name] = "页面解码或页内 UUID 字段冲突"
            continue
        captured = datetime.fromtimestamp(path.stat().st_mtime, timezone.utc)
        partitions[(version, captured.date().isoformat())].append(
            (path, captured, records)
        )
    numeric_paths = []
    rejected_partitions = []
    historical_snapshot_path = None
    for (version, capture_date), pages in sorted(partitions.items()):
        merged = {}
        try:
            for path, captured, records in pages:
                for model_id, record in records.items():
                    merged[model_id] = (
                        fetch_data._merge_embedded_model_catalog_records_or_raise(
                            model_id, merged[model_id], record, "旧 HTML 数值迁移"
                        )
                        if model_id in merged
                        else record
                    )
        except ValueError:
            rejected_partitions.append(
                {
                    "version": version,
                    "capture_date": capture_date,
                    "reason": "同批目录 UUID 字段冲突，不取并集",
                    "page_file_names": [p.name for p, _, _ in pages],
                }
            )
            continue
        captured_at = (
            max(captured for _, captured, _ in pages)
            .isoformat(timespec="seconds")
            .replace("+00:00", "Z")
        )
        payload = {
            "schema_version": NUMERIC_CATALOG_RESPONSE_SCHEMA_VERSION,
            "intelligence_index_version": version,
            "fetched_at_utc": captured_at,
            "fetched_at_utc_source": "inferred_from_cache_file_modification_time",
            "source_pages": [
                {"file_name": p.name, **manifest[p.name]} for p, _, _ in pages
            ],
            "records_by_model_id": {
                key: asdict(record) for key, record in merged.items()
            },
        }
        numeric_path = (
            destination_directory
            / "numeric-catalog-responses-by-exact-version-and-capture-date"
            / f"artificial-analysis-catalog-v{version}-captured-{capture_date}.json"
        )
        write_json_file_atomically(numeric_path, payload)
        numeric_paths.append(str(numeric_path))
        if version == "4.1" and capture_date == historical_capture_date:
            historical_snapshot_path = (
                destination_directory
                / f"artificial_analysis_intelligence_index_v4_1_single_batch_cost_and_output_token_fallback_snapshot_captured_{capture_date.replace('-','_')}.csv"
            )
            fields = [
                "id",
                "name",
                "intelligence_index_version",
                "captured_at_date",
                "cost_to_run_usd",
                "intelligence_index_canonical_output_token_count",
            ]
            with historical_snapshot_path.open(
                "x", encoding="utf-8", newline=""
            ) as stream:
                writer = csv.DictWriter(stream, fieldnames=fields, lineterminator="\n")
                writer.writeheader()
                for model_id, record in sorted(merged.items()):
                    cost = fetch_data._positive_float_or_none(
                        record.intelligence_index_cost_total_usd
                    )
                    tokens = fetch_data._positive_float_or_none(
                        record.canonical_output_token_count
                    )
                    if cost or tokens:
                        writer.writerow(
                            dict(
                                zip(
                                    fields,
                                    [
                                        model_id,
                                        record.name,
                                        version,
                                        capture_date,
                                        cost,
                                        tokens,
                                    ],
                                )
                            )
                        )
            write_json_file_atomically(
                historical_snapshot_path.with_suffix(".provenance.json"),
                {
                    "snapshot_path": historical_snapshot_path.name,
                    "capture_time_source": "inferred_from_cache_file_modification_time",
                    "exact_intelligence_index_version": version,
                    "capture_date_utc": capture_date,
                    "source_page_file_names": [p.name for p, _, _ in pages],
                    "source_page_sha256_by_file_name": {
                        p.name: manifest[p.name]["sha256"] for p, _, _ in pages
                    },
                    "historical_only_never_analysis_eligible": True,
                },
            )
    summary = {
        "archive_path": str(archive_path),
        "archive_sha256": sha256(archive_path.read_bytes()).hexdigest(),
        "archive_byte_count": archive_path.stat().st_size,
        "source_files": manifest,
        "invalid_page_reasons": invalid_pages,
        "rejected_partitions": rejected_partitions,
        "numeric_response_paths": numeric_paths,
        "historical_snapshot_path": (
            str(historical_snapshot_path) if historical_snapshot_path else None
        ),
    }
    write_json_file_atomically(
        destination_directory
        / "verified-original-html-backup-and-numeric-extraction-manifest.json",
        summary,
    )
    return summary
