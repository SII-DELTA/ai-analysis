"""离线检查研究目录的来源、版本身份和汇总一致性，不运行任何模型。"""

import argparse
import hashlib
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import unquote, urlparse


RESEARCH_DIRECTORY = Path(__file__).resolve().parent
FULL_GIT_SHA_PATTERN = re.compile(r"[0-9a-f]{40}")
AGGREGATED_RECORD_GROUPS = (
    "projects", "harnesses", "adjacent_projects", "directories_and_specifications",
    "benchmarks", "external_evaluations", "sources",
)


def require_catalog_integrity(integrity_condition_is_satisfied, failure_message):
    """完整性门禁必须在 Python 优化模式下同样执行。"""
    if not integrity_condition_is_satisfied:
        raise ValueError(failure_message)


def validate_catalog():
    catalog_path = RESEARCH_DIRECTORY / "ecosystem-project-evidence-catalog.json"
    catalog = json.loads(catalog_path.read_text())
    source_records = {row["source_id"]: row for row in catalog["sources"]}
    require_catalog_integrity(len(source_records) == len(catalog["sources"]), "来源 ID 重复")
    expected_project_ids = {
        "caveman", "ponytail", "rtk", "headroom", "context-mode", "i-have-adhd",
        "humanizer", "no-ai-slop", "mattpocock-skills", "superpowers", "gstack", "gsd-core",
    }
    require_catalog_integrity(
        {row["project_id"] for row in catalog["projects"]} == expected_project_ids,
        "重点项目 ID 与预期集合不一致",
    )
    require_catalog_integrity(len(catalog["projects"]) == 12, "重点项目数量必须为 12")
    require_catalog_integrity(len(catalog["harnesses"]) == 9, "宿主数量必须为 9")
    require_catalog_integrity(len(catalog["adjacent_projects"]) == 6, "邻近项目数量必须为 6")
    candidate_ids = [row["project_id"] for row in catalog["recommended_baseline_candidates"]]
    require_catalog_integrity(
        len(candidate_ids) == len(set(candidate_ids)) == 8, "基线候选必须为 8 个不同项目",
    )
    require_catalog_integrity(set(candidate_ids) <= expected_project_ids, "基线候选引用未知项目")

    def validate_source_references(value):
        if isinstance(value, dict):
            for key, child in value.items():
                if key == "source_ids":
                    require_catalog_integrity(isinstance(child, list), "source_ids 必须为列表")
                    require_catalog_integrity(
                        set(child) <= source_records.keys(), f"未知来源引用：{child}",
                    )
                validate_source_references(child)
        elif isinstance(value, list):
            for child in value:
                validate_source_references(child)

    validate_source_references(catalog)
    for record in catalog["projects"] + catalog["harnesses"] + catalog["adjacent_projects"]:
        require_catalog_integrity(
            FULL_GIT_SHA_PATTERN.fullmatch(record["revision_observation"]["commit_sha"]),
            f"项目版本不是完整 commit SHA：{record['revision_observation']['commit_sha']}",
        )
    for source in catalog["sources"]:
        for key in ("source_id", "url", "title", "checked_at_utc", "source_type"):
            require_catalog_integrity(source.get(key), f"来源缺少必填字段：{source['source_id']} / {key}")
        require_catalog_integrity(
            urlparse(source["url"]).scheme in {"http", "https"},
            f"来源 URL 必须使用 HTTP 或 HTTPS：{source['source_id']}",
        )
        datetime.fromisoformat(source["checked_at_utc"].replace("Z", "+00:00"))
        for key in ("repository_commit_sha", "file_blob_sha"):
            value = source.get(key)
            if value and value != "unknown":
                require_catalog_integrity(
                    FULL_GIT_SHA_PATTERN.fullmatch(value),
                    f"来源版本不是完整 SHA：{source['source_id']} / {key}",
                )
        immutable_file = re.search(
            r"https://github.com/[^/]+/[^/]+/blob/([0-9a-f]{40})/", source["url"]
        )
        if immutable_file:
            require_catalog_integrity(
                immutable_file.group(1) == source.get("repository_commit_sha"),
                f"固定 GitHub 文件 URL 与来源 commit 不一致：{source['source_id']}",
            )
        if source.get("repository_commit_sha") and source.get("file_blob_sha"):
            require_catalog_integrity(
                source["repository_commit_sha"] != source["file_blob_sha"],
                f"来源 commit 与文件 blob SHA 不得相同：{source['source_id']}",
            )

    evidence_record_ids = {row["benchmark_id"] for row in catalog["benchmarks"]}
    evidence_record_ids |= {row["evaluation_id"] for row in catalog["external_evaluations"]}
    for project in catalog["projects"]:
        for evidence in project.get("published_evaluation_evidence", []):
            if isinstance(evidence, str):
                require_catalog_integrity(evidence in evidence_record_ids, f"未知公开评测引用：{evidence}")
    for evaluation in catalog["external_evaluations"]:
        require_catalog_integrity(
            set(evaluation["project_ids"]) <= expected_project_ids,
            f"外部评测引用未知项目：{evaluation['evaluation_id']}",
        )

    expected_aggregates = {key: [] for key in AGGREGATED_RECORD_GROUPS}
    expected_research_notes = []
    for contribution in catalog["research_contributions"]:
        path = RESEARCH_DIRECTORY / contribution["path"]
        require_catalog_integrity(
            hashlib.sha256(path.read_bytes()).hexdigest() == contribution["sha256"],
            f"调查记录 SHA256 不一致：{contribution['path']}",
        )
        fragment = json.loads(path.read_text())
        for key in AGGREGATED_RECORD_GROUPS:
            expected_aggregates[key].extend(
                dict(row, research_contribution_file=contribution["path"])
                for row in fragment.get(key, [])
            )
        contribution_research_notes = fragment.get("research_notes")
        require_catalog_integrity(
            isinstance(contribution_research_notes, list),
            f"调查备注必须为列表：{contribution['path']}",
        )
        for research_note in contribution_research_notes:
            normalized_research_note = {"note": research_note} if isinstance(research_note, str) else research_note
            require_catalog_integrity(
                isinstance(normalized_research_note, dict)
                and isinstance(normalized_research_note.get("note"), str),
                f"调查备注必须为文本或含字符串 note 的记录：{contribution['path']}",
            )
            expected_research_notes.append(
                dict(normalized_research_note, research_contribution_file=contribution["path"])
            )
    for key, expected in expected_aggregates.items():
        require_catalog_integrity(catalog[key] == expected, f"汇总与调查记录不同步：{key}")
    catalog_research_notes = catalog.get("research_notes")
    require_catalog_integrity(isinstance(catalog_research_notes, list), "汇总研究备注必须为列表")
    for research_note in catalog_research_notes:
        require_catalog_integrity(
            isinstance(research_note, dict) and isinstance(research_note.get("note"), str),
            "汇总研究备注必须为含字符串 note 的记录",
        )
    require_catalog_integrity(
        catalog_research_notes == expected_research_notes,
        "汇总研究备注与调查记录不同步，或元数据及来源路径不一致",
    )

    report_text = (RESEARCH_DIRECTORY / "README.md").read_text()
    require_catalog_integrity(
        not re.search(r"待合并|TODO|FIXME|\{\{", report_text), "研究报告含草稿占位符",
    )
    for target in re.findall(r"\]\(([^)]+)\)", report_text):
        if urlparse(target).scheme or target.startswith("#"):
            continue
        relative_path = unquote(target.split("#")[0])
        if relative_path == "research-validation-results.json":
            continue
        require_catalog_integrity((RESEARCH_DIRECTORY / relative_path).exists(), f"报告本地链接不存在：{target}")

    input_paths = sorted(RESEARCH_DIRECTORY.rglob("*.json"))
    input_paths = [path for path in input_paths if path.name != "research-validation-results.json"]
    for path in input_paths:
        json.loads(path.read_text())
    input_paths += [RESEARCH_DIRECTORY / "README.md", Path(__file__).resolve()]
    return {
        "status": "passed",
        "validated_at_utc": datetime.now(timezone.utc).isoformat(),
        "counts": {key: len(catalog[key]) for key in (
            "projects", "harnesses", "adjacent_projects", "benchmarks",
            "external_evaluations", "sources", "recommended_baseline_candidates", "research_notes",
        )},
        "checks": [
            "JSON 可解析；来源 ID 唯一且引用全部存在",
            "重点项目、宿主和邻近项目固定完整 commit，来源 commit 与 blob 分开",
            "固定 GitHub 文件 URL 与记录的 commit 一致，检查时间可解析",
            "公开评测引用与项目关联完整",
            "汇总内容、归一化研究备注及 SHA256 与四份调查记录一致",
            "报告本地链接存在且无草稿占位符",
        ],
        "input_sha256_by_research_relative_path": {
            str(path.relative_to(RESEARCH_DIRECTORY)): hashlib.sha256(path.read_bytes()).hexdigest()
            for path in input_paths
        },
        "verification_boundaries": [
            "检查目录结构与已采集证据的一致性，不验证上游实验结果真实或可复现",
            "没有安装或运行被调查扩展，没有付费模型调用或公开 benchmark 复跑",
            "没有执行远程链接可达性全量扫描；不可达材料及动态网页限制见来源记录",
            "git diff --check 单独执行，不由本脚本冒充已完成",
        ],
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="离线验证研究证据目录")
    parser.add_argument("--write-validation-report", action="store_true", help="保存本次检查结果")
    arguments = parser.parse_args()
    validation_report = validate_catalog()
    if arguments.write_validation_report:
        (RESEARCH_DIRECTORY / "research-validation-results.json").write_text(
            json.dumps(validation_report, ensure_ascii=False, indent=2) + "\n"
        )
    print(json.dumps({"status": validation_report["status"], "counts": validation_report["counts"]}, ensure_ascii=False))
