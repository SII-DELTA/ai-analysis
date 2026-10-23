"""每批两至三个详情页，只保留经过校验的数值目录，不缓存新 HTML。"""

from __future__ import annotations

from dataclasses import asdict, dataclass, replace
from datetime import datetime, timedelta, timezone
from email.parser import BytesHeaderParser
from email.utils import parsedate_to_datetime
from hashlib import sha256
from pathlib import Path
from urllib.parse import quote
from uuid import UUID, uuid4
import json
import math
import re
import subprocess
import time

import requests

from .artificial_analysis_catalog_refresh_health import (
    CatalogRefreshHealthStore,
    parse_utc_timestamp,
    utc_timestamp,
)
from .artificial_analysis_guardrail_validated_json_response_storage import (
    GuardrailValidatedJsonResponseStorage,
)

NUMERIC_CATALOG_RESPONSE_FILENAME = (
    "artificial_analysis_embedded_model_catalog_response.json"
)
NUMERIC_CATALOG_RESPONSE_SCHEMA_VERSION = (
    "artificial_analysis_embedded_model_catalog_response/v1"
)
WEBSITE_CATALOG_REQUEST_USER_AGENT = (
    "ai-analysis-frontier-3d/0.1.0 (model-catalog-refresh)"
)
# EXPERIMENT_NODE: 目录刷新最小间隔 24 小时、页间间隔 10 秒、覆盖骤降 30% 是否适合新模型集中发布期
MINIMUM_CATALOG_REFRESH_INTERVAL = timedelta(hours=24)
MAXIMUM_WEBSITE_PAGE_BYTES = 12 * 1024 * 1024


def add_website_catalog_fetch_policy_arguments(parser) -> None:
    group = parser.add_mutually_exclusive_group()
    group.add_argument(
        "--allow-artificial-analysis-website-page-fetch",
        action="store_true",
        default=None,
        help="显式请求受限目录刷新（仍遵守每 24 小时一批及 2–3 页上限）",
    )
    group.add_argument(
        "--disable-artificial-analysis-website-page-fetch",
        action="store_false",
        dest="allow_artificial_analysis_website_page_fetch",
        help="本次禁止网页请求；只刷新 API 并读取已验证目录",
    )


class WebsiteCatalogRefreshFailure(ValueError):
    def __init__(self, kind: str, reason_code: str, evidence: dict | None = None):
        self.kind = kind
        self.reason_code = reason_code
        self.evidence = evidence or {}
        super().__init__(reason_code)


def observe_catalog_field_names_and_types_without_values(page_html: str) -> dict:
    """诊断仅保留有限字段名与类型，不保留页面、模型值或 RSC 原文。"""
    from . import fetch_data

    observation = {
        "has_closing_html_tag": page_html.rstrip().endswith("</html>"),
        "rsc_push_occurrence_count": page_html.count("self.__next_f.push"),
    }
    try:
        decoded = fetch_data._decode_next_js_react_server_component_payload_text_from_page_html(
            page_html
        )
    except ValueError:
        observation["rsc_decode_status"] = "failed"
        return observation
    fields = {}
    sampled = 0
    for (
        match
    ) in fetch_data._ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_OBJECT_START_PATTERN.finditer(
        decoded
    ):
        try:
            model, _ = json.JSONDecoder().raw_decode(decoded, match.start())
        except ValueError:
            continue
        sampled += 1
        for field, value in list(model.items())[:128]:
            field = field[:128]
            if field not in fields and len(fields) >= 128:
                continue
            summary = fields.setdefault(
                field, {"types": set(), "nested_object_field_names": set()}
            )
            summary["types"].add(type(value).__name__)
            if isinstance(value, dict):
                summary["nested_object_field_names"].update(
                    str(key)[:128] for key in list(value)[:24]
                )
        if sampled >= 32:
            break
    observation.update(
        rsc_decode_status="decoded",
        model_object_sample_count=sampled,
        model_field_names_and_types={
            field: {key: sorted(values) for key, values in summary.items()}
            for field, summary in sorted(fields.items())
        },
    )
    return observation


class BoundedWebsiteCatalogPageClient:
    """所有重试与 curl 回退共用六次 HTTP 尝试上限，不跟随重定向。"""

    def __init__(self, *, sleep=time.sleep):
        self.sleep = sleep
        self.http_attempt_count = 0

    def __call__(self, url: str) -> str:
        for attempt in range(2):
            if self.http_attempt_count >= 6:
                raise WebsiteCatalogRefreshFailure(
                    "transport_failure", "http_attempt_budget_exhausted"
                )
            self.http_attempt_count += 1
            try:
                response = requests.get(
                    url,
                    headers={"User-Agent": WEBSITE_CATALOG_REQUEST_USER_AGENT},
                    timeout=30,
                    allow_redirects=False,
                    stream=True,
                )
                try:
                    if (
                        response.status_code in {401, 403, 429}
                        or 300 <= response.status_code < 400
                    ):
                        self._check_status(response.status_code, response.headers)
                    contents = bytearray()
                    for chunk in response.iter_content(chunk_size=65536):
                        contents.extend(chunk)
                        if len(contents) > MAXIMUM_WEBSITE_PAGE_BYTES:
                            raise WebsiteCatalogRefreshFailure(
                                "structure_change", "website_page_exceeded_byte_limit"
                            )
                    page_html = contents.decode("utf-8", errors="replace")
                    self._check_status(response.status_code, response.headers, page_html)
                    return page_html
                finally:
                    response.close()
            except requests.exceptions.SSLError:
                if attempt or self.http_attempt_count >= 6:
                    break
                self.sleep(30)
                self.http_attempt_count += 1
                return self._fetch_with_system_curl(url)
            except requests.RequestException:
                if attempt:
                    break
                self.sleep(30)
            except WebsiteCatalogRefreshFailure as failure:
                if failure.kind != "transport_failure" or attempt:
                    raise
                self.sleep(30)
        raise WebsiteCatalogRefreshFailure(
            "transport_failure", "website_request_failed_after_bounded_retry"
        )

    @staticmethod
    def _check_status(status_code: int, headers: dict, page_html: str = "") -> None:
        if 300 <= status_code < 400:
            raise WebsiteCatalogRefreshFailure(
                "structure_change",
                "website_returned_unexpected_redirect",
                {"http_status_code": status_code},
            )
        if status_code in {401, 403, 429}:
            evidence = {"http_status_code": status_code}
            retry_after = headers.get("Retry-After")
            if retry_after:
                try:
                    target = datetime.now(timezone.utc) + timedelta(
                        seconds=max(0, int(retry_after))
                    )
                except ValueError:
                    try:
                        target = parsedate_to_datetime(retry_after)
                    except (ValueError, TypeError, OverflowError):
                        target = None
                if target:
                    evidence["retry_after_utc"] = utc_timestamp(target)
            raise WebsiteCatalogRefreshFailure(
                "blocked", "website_rejected_automated_request", evidence
            )
        if re.search(
            r"cf-chl-|<title>\s*(?:Just a moment|Access Denied)", page_html, re.I
        ):
            raise WebsiteCatalogRefreshFailure(
                "blocked",
                "website_returned_verification_challenge",
                {"http_status_code": status_code},
            )
        if status_code != 200:
            raise WebsiteCatalogRefreshFailure(
                "transport_failure",
                "website_http_response_not_successful",
                {"http_status_code": status_code},
            )

    def _fetch_with_system_curl(self, url: str) -> str:
        try:
            response = subprocess.run(
                [
                    "/usr/bin/curl",
                    "--silent",
                    "--show-error",
                    "--include",
                    "--suppress-connect-headers",
                    "--max-time",
                    "30",
                    "--max-filesize",
                    str(MAXIMUM_WEBSITE_PAGE_BYTES),
                    "--user-agent",
                    WEBSITE_CATALOG_REQUEST_USER_AGENT,
                    "--write-out",
                    "\n%{http_code}",
                    url,
                ],
                capture_output=True,
                check=True,
                timeout=35,
            )
            content, code = response.stdout.rsplit(b"\n", 1)
            # 只读取最终响应前的头块；1xx 头不生效，最终正文即使像 HTTP 头也原样保留。
            while True:
                header_block, content = content.split(b"\r\n\r\n", 1)
                status_line, _, header_fields = header_block.partition(b"\r\n")
                if not status_line.startswith(b"HTTP/"):
                    raise ValueError("curl 响应缺少 HTTP 状态行")
                header_status_code = int(status_line.split()[1])
                if header_status_code >= 200:
                    break
            if header_status_code != int(code):
                raise ValueError("curl 最终响应头与状态码不一致")
            headers = requests.structures.CaseInsensitiveDict(
                BytesHeaderParser().parsebytes(header_fields).items()
            )
            if header_status_code in {401, 403, 429} or 300 <= header_status_code < 400:
                self._check_status(header_status_code, headers)
            if len(content) > MAXIMUM_WEBSITE_PAGE_BYTES:
                raise WebsiteCatalogRefreshFailure(
                    "structure_change", "website_page_exceeded_byte_limit"
                )
            page_html = content.decode("utf-8", errors="replace")
            self._check_status(header_status_code, headers, page_html)
            return page_html
        except (OSError, subprocess.SubprocessError, ValueError) as error:
            if isinstance(error, WebsiteCatalogRefreshFailure):
                raise
            raise WebsiteCatalogRefreshFailure(
                "transport_failure", "system_curl_fallback_failed"
            ) from None


def select_minimal_model_catalog_source_page_urls(api_rows: list[dict]) -> list[str]:
    candidates = [
        row
        for row in api_rows
        if row.get("slug")
        and (row.get("evaluations") or {}).get("artificial_analysis_intelligence_index")
        is not None
    ]
    candidates.sort(
        key=lambda row: (
            str(row.get("release_date") or ""),
            float(
                (row.get("evaluations") or {}).get(
                    "artificial_analysis_intelligence_index"
                )
                or 0
            ),
            str(row["slug"]),
        ),
        reverse=True,
    )
    if not candidates:
        return []

    def creator(row):
        return (row.get("model_creator") or {}).get("id") or (
            row.get("model_creator") or {}
        ).get("name")

    first = candidates.pop(0)
    different_creator = next(
        (i for i, row in enumerate(candidates) if creator(row) != creator(first)), 0
    )
    selected = [first]
    if candidates:
        selected.append(candidates.pop(different_creator))
    selected.extend(candidates)
    urls = []
    for row in selected:
        # slug 只作为单一路径段，拒绝斜杠、查询和跨站重定向。
        if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9._-]*", str(row["slug"])):
            continue
        url = "https://artificialanalysis.ai/models/" + quote(str(row["slug"]), safe="")
        if url not in urls:
            urls.append(url)
        if len(urls) == 3:
            break
    return urls


def _records_from_verified_numeric_payload(payload: dict):
    from . import fetch_data

    if payload.get("schema_version") != NUMERIC_CATALOG_RESPONSE_SCHEMA_VERSION:
        raise ValueError("数值目录 schema_version 不受支持")
    if not fetch_data.normalize_intelligence_index_version_string(
        payload.get("intelligence_index_version")
    ):
        raise ValueError("数值目录缺少指数版本")
    parse_utc_timestamp(payload["fetched_at_utc"])
    result = {}
    strings = {"name", "slug", "reasoning_effort_slug", "release_slug"}
    booleans = {"intelligence_index_is_estimated", "is_reasoning"}
    for model_id, fields in payload["records_by_model_id"].items():
        UUID(model_id)
        if set(fields) != set(
            fetch_data.ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_RECORD_FIELD_NAMES
        ):
            raise ValueError("数值目录模型字段集合不匹配")
        for key, value in fields.items():
            if value is None:
                continue
            valid = (
                isinstance(value, str)
                if key in strings
                else (
                    isinstance(value, bool)
                    if key in booleans
                    else isinstance(value, (int, float))
                    and not isinstance(value, bool)
                    and math.isfinite(value)
                )
            )
            if not valid:
                raise ValueError("数值目录字段类型不匹配")
        result[model_id] = fetch_data.ArtificialAnalysisEmbeddedModelCatalogRecord(
            **fields
        )
    return result


def load_numeric_model_catalog_response(path: Path, api_rows: list[dict], api_version):
    from . import fetch_data

    payload = json.loads(path.read_text())
    records = _records_from_verified_numeric_payload(payload)
    family = fetch_data.intelligence_index_version_family(
        payload["intelligence_index_version"]
    )
    if (
        api_version is not None
        and family != fetch_data.intelligence_index_version_family(api_version)
    ):
        return None
    api_intelligence = {
        row["id"]: (row.get("evaluations") or {}).get(
            "artificial_analysis_intelligence_index"
        )
        for row in api_rows
    }
    positive_token_count = sum(
        (record.canonical_output_token_count or 0) > 0
        for model_id, record in records.items()
        if model_id in api_intelligence
    )
    if positive_token_count < 50:
        return None
    compared, agreeing = 0, 0
    for model_id, record in records.items():
        intelligence = api_intelligence.get(model_id)
        if intelligence is not None and record.intelligence_index is not None:
            compared += 1
            agreeing += abs(float(intelligence) - record.intelligence_index) <= 0.05
    empty = fetch_data._empty_embedded_model_catalog_load_result(path.parent)
    cost_compared, cost_agreeing = fetch_data._cost_agreement_counts_with_api(
        records,
        {
            row["id"]: (
                row.get("artificial_analysis_intelligence_index_cost") or {}
            ).get("total_cost")
            for row in api_rows
        },
    )
    source_pages = payload.get("source_pages") or []
    source_page_names = tuple(
        page.get("file_name") or page["source_url"]
        for page in source_pages
        if page.get("file_name") or page.get("parsed_record_count")
    )
    missing_field_record_counts_by_field_name = {
        field_name: missing_record_count
        for field_name in fetch_data.ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_RECORD_FIELD_NAMES
        if (
            missing_record_count := sum(
                getattr(record, field_name) is None for record in records.values()
            )
        )
        > 0
    }
    if missing_field_record_counts_by_field_name:
        print(
            f"[warn] 内嵌目录分区 v{payload['intelligence_index_version']} "
            f"字段缺失（按字段计数，共 {len(records)} 条记录；缺失值保留为空、不做推断）："
            + "，".join(
                f"{field_name} {missing_record_count}"
                for field_name, missing_record_count in missing_field_record_counts_by_field_name.items()
            )
        )
    partition = fetch_data.ArtificialAnalysisEmbeddedModelCatalogPartitionSummary(
        intelligence_index_version_family=family,
        cache_file_modification_date_utc=parse_utc_timestamp(payload["fetched_at_utc"])
        .date()
        .isoformat(),
        page_intelligence_index_versions=(payload["intelligence_index_version"],),
        most_specific_intelligence_index_version=payload["intelligence_index_version"],
        page_file_names=source_page_names,
        page_count=len(source_page_names),
        latest_cache_file_modification_time_utc=payload["fetched_at_utc"],
        record_count=len(records),
        record_with_output_token_count_count=sum(
            (r.canonical_output_token_count or 0) > 0 for r in records.values()
        ),
        record_with_output_token_count_in_api_uuid_intersection_count=positive_token_count,
        intelligence_compared_with_api_model_count=compared,
        intelligence_agreeing_with_api_model_count=agreeing,
        intelligence_agreement_rate_with_api=agreeing / compared if compared else None,
        value_conflict_descriptions=(),
        meets_acceptance_criteria=True,
        is_accepted=True,
        rejection_reasons=(),
    )
    return replace(
        empty,
        records_by_model_id=records,
        accepted_partition_intelligence_index_version=payload[
            "intelligence_index_version"
        ],
        accepted_partition_captured_at_utc=payload["fetched_at_utc"],
        page_cache_file_modification_time_utc_by_model_id={
            model_id: payload["fetched_at_utc"] for model_id in records
        },
        partition_summaries=(partition,),
        catalog_vs_api_cost_agreement_rate=(
            cost_agreeing / cost_compared if cost_compared else None
        ),
        catalog_vs_api_cost_compared_model_count=cost_compared,
        catalog_vs_api_intelligence_agreement_rate=(
            agreeing / compared if compared else None
        ),
        catalog_vs_api_intelligence_compared_model_count=compared,
        missing_field_record_counts_by_field_name=missing_field_record_counts_by_field_name,
    )


def seed_verified_numeric_catalog_from_legacy_load_result(
    raw_directory: Path, load_result
) -> None:
    """只迁移已被原加载器接受的单批目录；旧 HTML 保持原位，迁移不代表故障恢复。"""
    path = Path(raw_directory) / NUMERIC_CATALOG_RESPONSE_FILENAME
    if path.exists() or not load_result.records_by_model_id:
        return
    payload = {
        "schema_version": NUMERIC_CATALOG_RESPONSE_SCHEMA_VERSION,
        "intelligence_index_version": load_result.accepted_partition_intelligence_index_version,
        "fetched_at_utc": load_result.accepted_partition_captured_at_utc,
        "fetched_at_utc_source": "inferred_from_cache_file_modification_time",
        "source_kind": "read_only_migration_from_accepted_legacy_html_partition",
        "source_pages": [
            {"file_name": name}
            for summary in load_result.partition_summaries
            if summary.is_accepted
            for name in summary.page_file_names
        ],
        "records_by_model_id": {
            key: asdict(record)
            for key, record in load_result.records_by_model_id.items()
        },
    }
    try:
        _records_from_verified_numeric_payload(payload)
    except (ValueError, TypeError, KeyError):
        print("[warn] 旧目录未通过数值 schema 校验，跳过迁移并保留原目录来源。")
        return
    storage = GuardrailValidatedJsonResponseStorage(
        path,
        Path(raw_directory)
        / "artificial_analysis_embedded_model_catalog_response_history",
    )
    storage.stage(
        payload,
        response_name_prefix="artificial_analysis_embedded_model_catalog_response",
    )
    storage.promote()


@dataclass
class PreparedMinimalModelCatalogRefresh:
    status: str
    storage: GuardrailValidatedJsonResponseStorage
    health: CatalogRefreshHealthStore
    now: datetime
    catalog_load_result: object = None
    warning_text: str | None = None
    fetched_page_count: int = 0
    reused_project_verified_response_sha256: str | None = None

    def accept_after_final_guardrails(self) -> None:
        if self.status == "pending_final_data_quality_guardrails":
            with self.health.locked_state() as state:
                if self.reused_project_verified_response_sha256 is not None:
                    if (
                        state.get("last_verified_catalog_response_sha256")
                        != self.reused_project_verified_response_sha256
                    ):
                        self.storage.reject()
                        self.status = "superseded_by_newer_refresh_attempt"
                        return
                    self.storage.promote()
                    self.status = (
                        "reused_project_verified_catalog_without_page_requests"
                    )
                    return
                if state.get("last_refresh_attempt_started_at_utc") != utc_timestamp(
                    self.now
                ):
                    self.storage.reject()
                    self.status = "superseded_by_newer_refresh_attempt"
                    return
                self.storage.promote()
                self.health.publish_verified_response_in_locked_state(
                    state, self.storage.active_response_path
                )
                self.health.resolve_in_locked_state(state, self.now)
                self.status = "refreshed_and_verified"

    def reject_after_final_guardrails(self) -> None:
        self.storage.reject()
        self.status = "rejected_by_final_data_quality_guardrails"


def prepare_minimal_model_catalog_refresh(
    api_rows: list[dict],
    api_version,
    raw_directory: Path,
    health: CatalogRefreshHealthStore,
    *,
    now: datetime | None = None,
    fetch_page=None,
    sleep=time.sleep,
    previous_verified_catalog_load_result=None,
):
    from . import fetch_data

    now = now or datetime.now(timezone.utc)
    storage = GuardrailValidatedJsonResponseStorage(
        Path(raw_directory) / NUMERIC_CATALOG_RESPONSE_FILENAME,
        Path(raw_directory)
        / "artificial_analysis_embedded_model_catalog_response_history",
    )
    previous = (
        previous_verified_catalog_load_result
        if previous_verified_catalog_load_result is not None
        and previous_verified_catalog_load_result.records_by_model_id
        else None
    )
    if storage.active_response_path.exists():
        numeric_previous = load_numeric_model_catalog_response(
            storage.active_response_path, api_rows, api_version
        )
        if numeric_previous is not None:
            previous = numeric_previous
    if health.dispatch_tasks and health.read_state().get("unresolved_incident"):
        health.ensure_diagnostic_task_started()
    result = PreparedMinimalModelCatalogRefresh(
        "skipped_refresh_cooldown", storage, health, now, previous
    )
    fetch_page = fetch_page or BoundedWebsiteCatalogPageClient(sleep=sleep)
    observed_pages = []
    last_received_page_html = None
    try:
        with health.locked_state(nonblocking=True) as state:
            if state is None:
                result.status = "skipped_concurrent_refresh"
                return result
            project_verified_payload = None
            project_verified_response_sha256 = None
            project_verified_path = state.get("last_verified_catalog_response_path")
            if project_verified_path:
                try:
                    project_verified_path = Path(project_verified_path)
                    contents = project_verified_path.read_bytes()
                    digest = sha256(contents).hexdigest()
                    if digest != state.get("last_verified_catalog_response_sha256"):
                        raise ValueError("项目已验证目录哈希不匹配")
                    project_verified_catalog = load_numeric_model_catalog_response(
                        project_verified_path, api_rows, api_version
                    )
                    if project_verified_catalog is not None and (
                        previous is None
                        or project_verified_catalog.accepted_partition_captured_at_utc
                        > previous.accepted_partition_captured_at_utc
                    ):
                        # 冷却期只控制请求；已验证副本始终提供失败回退与覆盖骤降基线。
                        previous = project_verified_catalog
                        result.catalog_load_result = previous
                        project_verified_payload = json.loads(contents)
                        project_verified_response_sha256 = digest
                except (OSError, ValueError, KeyError, TypeError):
                    result.warning_text = "项目已验证目录副本不可用，本次继续使用本地已有目录。"
            next_allowed = state.get("next_website_catalog_refresh_allowed_at_utc")
            if next_allowed and now < parse_utc_timestamp(next_allowed):
                if project_verified_payload is not None:
                    storage.stage(
                        project_verified_payload,
                        response_name_prefix="artificial_analysis_embedded_model_catalog_response",
                    )
                    result.status = "pending_final_data_quality_guardrails"
                    result.reused_project_verified_response_sha256 = (
                        project_verified_response_sha256
                    )
                return result
            state["next_website_catalog_refresh_allowed_at_utc"] = utc_timestamp(
                now + MINIMUM_CATALOG_REFRESH_INTERVAL
            )
            state["last_refresh_attempt_started_at_utc"] = utc_timestamp(now)
            health.save_state(state)
            batch_id = str(uuid4())
            merged = {}
            exact_version = None
            valid_pages = 0
            api_ids = {row["id"] for row in api_rows}
            started = time.monotonic()
            for url in select_minimal_model_catalog_source_page_urls(api_rows):
                last_received_page_html = None
                if time.monotonic() - started > 600:
                    raise WebsiteCatalogRefreshFailure(
                        "structure_change", "collection_batch_exceeded_time_window"
                    )
                if observed_pages:
                    sleep(10)
                try:
                    page_html = fetch_page(url)
                    last_received_page_html = page_html
                except WebsiteCatalogRefreshFailure as failure:
                    observed_pages.append(
                        {"source_url": url, "failure_reason_code": failure.reason_code}
                    )
                    if failure.kind == "transport_failure":
                        continue
                    raise
                observed = {
                    "source_url": url,
                    "html_sha256": sha256(page_html.encode()).hexdigest(),
                    "html_byte_count": len(page_html.encode()),
                }
                observed_pages.append(observed)
                if re.search(
                    r"cf-chl-|<title>\s*(?:Just a moment|Access Denied)",
                    page_html,
                    re.I,
                ):
                    raise WebsiteCatalogRefreshFailure(
                        "blocked", "website_returned_verification_challenge"
                    )
                reason = fetch_data.find_artificial_analysis_model_detail_page_html_structure_invalidity_reason(
                    page_html
                )
                if reason:
                    raise WebsiteCatalogRefreshFailure(
                        "structure_change",
                        "website_page_structure_invalid",
                        {
                            "has_closing_html_tag": page_html.rstrip().endswith(
                                "</html>"
                            ),
                            "rsc_push_occurrence_count": page_html.count(
                                "self.__next_f.push"
                            ),
                        },
                    )
                versions = fetch_data._ARTIFICIAL_ANALYSIS_INTELLIGENCE_INDEX_VERSION_STRING_PATTERN.findall(
                    page_html
                )
                version = (
                    max(versions, key=fetch_data._intelligence_index_version_sort_key)
                    if versions
                    else None
                )
                if not version or (exact_version and version != exact_version):
                    raise WebsiteCatalogRefreshFailure(
                        "structure_change", "page_versions_missing_or_not_identical"
                    )
                if (
                    api_version is not None
                    and fetch_data.intelligence_index_version_family(version)
                    != fetch_data.intelligence_index_version_family(api_version)
                ):
                    raise WebsiteCatalogRefreshFailure(
                        "structure_change", "catalog_version_family_disagrees_with_api"
                    )
                exact_version = version
                try:
                    records = fetch_data.parse_artificial_analysis_embedded_model_catalog_records_from_model_detail_page_html(
                        page_html
                    )
                    observed["parsed_record_count"] = len(records)
                    for model_id, record in records.items():
                        merged[model_id] = (
                            fetch_data._merge_embedded_model_catalog_records_or_raise(
                                model_id, merged[model_id], record, "本次数值目录采集"
                            )
                            if model_id in merged
                            else record
                        )
                except ValueError:
                    raise WebsiteCatalogRefreshFailure(
                        "structure_change", "embedded_catalog_decode_or_uuid_conflict"
                    ) from None
                valid_pages += 1
                positive = sum(
                    (record.canonical_output_token_count or 0) > 0
                    for model_id, record in merged.items()
                    if model_id in api_ids
                )
                if valid_pages >= 2 and positive >= 50 and api_ids.issubset(merged):
                    break
            if valid_pages < 2:
                raise WebsiteCatalogRefreshFailure(
                    "transport_failure", "fewer_than_two_valid_detail_pages"
                )
            positive = sum(
                (record.canonical_output_token_count or 0) > 0
                for model_id, record in merged.items()
                if model_id in api_ids
            )
            previous_positive = (
                sum(
                    (record.canonical_output_token_count or 0) > 0
                    for model_id, record in previous.records_by_model_id.items()
                    if model_id in api_ids
                )
                if previous
                else 0
            )
            if positive < 50 or (
                previous_positive and positive < previous_positive * 0.7
            ):
                raise WebsiteCatalogRefreshFailure(
                    "structure_change",
                    "catalog_positive_token_coverage_collapsed",
                    {
                        "positive_token_count": positive,
                        "previous_positive_token_count": previous_positive,
                    },
                )
            payload = {
                "schema_version": NUMERIC_CATALOG_RESPONSE_SCHEMA_VERSION,
                "intelligence_index_version": exact_version,
                "fetched_at_utc": utc_timestamp(now),
                "fetched_at_utc_source": "recorded_at_fetch_time",
                "collection_attempt_id": batch_id,
                "source_pages": observed_pages,
                "records_by_model_id": {
                    key: asdict(record) for key, record in merged.items()
                },
            }
            try:
                _records_from_verified_numeric_payload(payload)
            except (ValueError, TypeError, KeyError):
                raise WebsiteCatalogRefreshFailure(
                    "structure_change", "catalog_numeric_field_schema_invalid"
                ) from None
            storage.stage(
                payload,
                response_name_prefix="artificial_analysis_embedded_model_catalog_response",
            )
            result.catalog_load_result = load_numeric_model_catalog_response(
                storage.pending_response_path, api_rows, api_version
            )
            result.status = "pending_final_data_quality_guardrails"
            result.fetched_page_count = valid_pages
    except (WebsiteCatalogRefreshFailure, requests.RequestException) as error:
        failure = (
            error
            if isinstance(error, WebsiteCatalogRefreshFailure)
            else WebsiteCatalogRefreshFailure(
                "transport_failure", "website_transport_error"
            )
        )
        storage.reject()
        retry_after = failure.evidence.get("retry_after_utc")
        if retry_after:
            with health.locked_state() as state:
                state["next_website_catalog_refresh_allowed_at_utc"] = utc_timestamp(
                    max(
                        parse_utc_timestamp(
                            state["next_website_catalog_refresh_allowed_at_utc"]
                        ),
                        parse_utc_timestamp(retry_after),
                    )
                )
                health.save_state(state)
        health.record_failure(
            failure.kind,
            {
                "failure_reason_code": failure.reason_code,
                "source_pages": observed_pages,
                "last_received_page_structure_without_values": (
                    observe_catalog_field_names_and_types_without_values(
                        last_received_page_html
                    )
                    if last_received_page_html
                    else None
                ),
                "previous_verified_catalog_captured_at_utc": (
                    previous.accepted_partition_captured_at_utc if previous else None
                ),
                **failure.evidence,
            },
            now,
        )
        result.status = "failed_reusing_previous_verified_catalog"
        captured_at = (
            previous.accepted_partition_captured_at_utc if previous else "无可用旧目录"
        )
        result.warning_text = f"网页目录刷新失败（{failure.reason_code}）；停止本批请求，复用已验证目录：{captured_at}。"
    return result
