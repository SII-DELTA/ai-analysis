"""项目级网页目录异常：跨工作树去重、持久证据与诊断 Task 启动。"""

from __future__ import annotations

from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from hashlib import sha256
from pathlib import Path
from uuid import uuid4
import fcntl
import json
import os
import subprocess
from xml.sax.saxutils import escape

from .artificial_analysis_guardrail_validated_json_response_storage import (
    write_json_file_atomically,
    write_text_file_atomically,
)


def utc_timestamp(value: datetime) -> str:
    return (
        value.astimezone(timezone.utc)
        .isoformat(timespec="seconds")
        .replace("+00:00", "Z")
    )


def parse_utc_timestamp(value: str) -> datetime:
    return datetime.fromisoformat(value.replace("Z", "+00:00"))


def resolve_main_repository_directory(project_directory: Path) -> Path:
    common_directory = subprocess.run(
        ["git", "rev-parse", "--path-format=absolute", "--git-common-dir"],
        cwd=project_directory,
        capture_output=True,
        text=True,
        check=True,
        timeout=10,
    ).stdout.strip()
    return Path(common_directory).resolve().parent


class CatalogRefreshHealthStore:
    def __init__(
        self,
        project_directory: Path,
        *,
        state_directory: Path | None = None,
        artifact_directory: Path | None = None,
        dispatch_tasks: bool = True,
    ):
        self.project_directory = resolve_main_repository_directory(project_directory)
        project_key = sha256(str(self.project_directory).encode()).hexdigest()[:20]
        persistent_root = (
            Path.home()
            / ".cline/kanban/cross-task-handoff-artifacts"
            / "artificial-analysis-website-catalog-refresh"
            / project_key
        )
        self.state_directory = Path(
            state_directory
            or os.environ.get(
                "ARTIFICIAL_ANALYSIS_CATALOG_REFRESH_HEALTH_DIRECTORY",
                persistent_root / "project-refresh-health-state",
            )
        )
        self.artifact_directory = Path(
            artifact_directory or self.state_directory / "incident-evidence"
        )
        self.dispatch_tasks = dispatch_tasks
        self.state_path = (
            self.state_directory / "website-catalog-refresh-health-state.json"
        )

    def read_state(self) -> dict:
        if not self.state_path.exists():
            return {"unresolved_incident": None}
        # 已有状态损坏时不能静默清空，否则会重复创建 Task、消除未恢复告警。
        state = json.loads(self.state_path.read_text())
        if not isinstance(state, dict) or "unresolved_incident" not in state:
            raise ValueError("网页目录异常状态格式无效，不能自动清空或重新派发")
        if state["unresolved_incident"] is not None and not isinstance(
            state["unresolved_incident"], dict
        ):
            raise ValueError("未恢复异常必须是结构化事件，不能静默清除")
        return state

    @contextmanager
    def locked_state(self, *, nonblocking: bool = False):
        self.state_directory.mkdir(parents=True, exist_ok=True)
        with (self.state_directory / "website-catalog-refresh-health-state.lock").open(
            "a"
        ) as stream:
            try:
                fcntl.flock(
                    stream, fcntl.LOCK_EX | (fcntl.LOCK_NB if nonblocking else 0)
                )
            except BlockingIOError:
                yield None
                return
            try:
                yield self.read_state()
            finally:
                fcntl.flock(stream, fcntl.LOCK_UN)

    def save_state(self, state: dict) -> None:
        write_json_file_atomically(self.state_path, state)

    def record_failure(self, failure_kind: str, evidence: dict, now: datetime) -> None:
        if failure_kind not in {"blocked", "structure_change"}:
            return
        with self.locked_state() as state:
            incident = state.get("unresolved_incident")
            if not incident:
                incident = {
                    "incident_id": str(uuid4()),
                    "first_failure_at_utc": utc_timestamp(now),
                    "failure_count": 0,
                    "diagnostic_task_dispatch_status": "not_requested",
                }
                snapshot_directory = (
                    self.artifact_directory
                    / incident["incident_id"]
                    / "generator-source-files-observed-at-first-failure"
                )
                for filename in (
                    "fetch_data.py",
                    "artificial_analysis_minimal_model_catalog_refresh.py",
                    "artificial_analysis_catalog_refresh_health.py",
                    "artificial_analysis_guardrail_validated_json_response_storage.py",
                ):
                    source_path = Path(__file__).with_name(filename)
                    write_text_file_atomically(
                        snapshot_directory / filename,
                        source_path.read_text(encoding="utf-8"),
                    )
                incident["generator_source_snapshot_directory"] = str(
                    snapshot_directory
                )
                incident["previous_verified_catalog_response_path"] = state.get(
                    "last_verified_catalog_response_path"
                )
            incident.update(
                last_failure_at_utc=utc_timestamp(now),
                failure_kind=failure_kind,
                failure_count=incident["failure_count"] + 1,
            )
            evidence_path = (
                self.artifact_directory
                / incident["incident_id"]
                / f"failure-observed-at-{now.strftime('%Y%m%dT%H%M%S')}-{uuid4().hex[:8]}.json"
            )
            write_json_file_atomically(
                evidence_path,
                {
                    "incident_id": incident["incident_id"],
                    "observed_at_utc": utc_timestamp(now),
                    "failure_kind": failure_kind,
                    **evidence,
                },
            )
            incident["latest_evidence_path"] = str(evidence_path)
            state["unresolved_incident"] = incident
            self.save_state(state)
        if self.dispatch_tasks:
            self.ensure_diagnostic_task_started()

    def resolve_after_verified_catalog_promoted(self, now: datetime) -> None:
        with self.locked_state() as state:
            self.resolve_in_locked_state(state, now)

    def resolve_in_locked_state(self, state: dict, now: datetime) -> None:
        """调用方持有项目锁，目录晋升与事件恢复共享同一临界区。"""
        incident = state.get("unresolved_incident")
        if incident:
            write_json_file_atomically(
                self.artifact_directory
                / incident["incident_id"]
                / "resolved-after-verified-catalog-promotion.json",
                {**incident, "resolved_at_utc": utc_timestamp(now)},
            )
        state["unresolved_incident"] = None
        state["last_verified_catalog_refresh_at_utc"] = utc_timestamp(now)
        self.save_state(state)

    def publish_verified_response_in_locked_state(
        self, state: dict, response_path: Path
    ) -> None:
        """发布不可变数值副本，其他工作树可在冷却期复用，不依赖生产者工作树存活。"""
        response_text = response_path.read_text(encoding="utf-8")
        digest = sha256(response_text.encode()).hexdigest()
        published_path = (
            self.state_directory
            / "guardrail-validated-model-catalog-responses"
            / f"guardrail-validated-model-catalog-response-sha256-{digest}.json"
        )
        if not published_path.exists():
            write_text_file_atomically(published_path, response_text)
        elif sha256(published_path.read_bytes()).hexdigest() != digest:
            raise ValueError("项目已验证目录副本校验失败，不能覆盖或声明恢复")
        state["last_verified_catalog_response_path"] = str(published_path)
        state["last_verified_catalog_response_sha256"] = digest

    def ensure_diagnostic_task_started(self) -> None:
        """创建结果不确定时只回查；不重复发出 create，启动重试始终使用同一 Task。"""
        with self.locked_state() as state:
            incident = state.get("unresolved_incident")
            if (
                not incident
                or incident.get("diagnostic_task_dispatch_status") == "started"
            ):
                return
            try:
                command = self._kanban_command()
            except ValueError:
                incident["diagnostic_task_dispatch_status"] = (
                    "waiting_for_valid_kanban_command_configuration"
                )
                self.save_state(state)
                return
            if not command:
                incident["diagnostic_task_dispatch_status"] = (
                    "waiting_for_kanban_command"
                )
                self.save_state(state)
                return
            marker = (
                "artificial-analysis-catalog-refresh-incident:"
                + incident["incident_id"]
            )
            try:
                if incident.get("task_creation_requested") and not incident.get(
                    "diagnostic_task_id"
                ):
                    listing = self._run_kanban(command, ["task", "list"])
                    matches = [
                        task
                        for task in self._task_records(listing)
                        if marker in str(task.get("prompt", ""))
                    ]
                    if len(matches) != 1:
                        incident["diagnostic_task_dispatch_status"] = (
                            "creation_result_requires_reconciliation"
                        )
                        self.save_state(state)
                        return
                    incident["diagnostic_task_id"] = matches[0]["id"]
                if not incident.get("diagnostic_task_id"):
                    prompt = self._diagnostic_task_prompt(incident, marker)
                    incident["task_creation_requested"] = True
                    incident["diagnostic_task_dispatch_status"] = (
                        "creation_result_requires_reconciliation"
                    )
                    self.save_state(state)
                    result = self._run_kanban(
                        command,
                        [
                            "task",
                            "create",
                            "--title",
                            "[RESEARCH]诊断 AA 网页目录刷新异常",
                            "--prompt",
                            prompt,
                        ],
                    )
                    write_json_file_atomically(
                        self.artifact_directory
                        / incident["incident_id"]
                        / "diagnostic-task-creation-receipt.json",
                        result,
                    )
                    incident["diagnostic_task_id"] = result["task"]["id"]
                    incident["diagnostic_task_dispatch_status"] = (
                        "created_pending_start"
                    )
                    self.save_state(state)
                self._run_kanban(
                    command,
                    ["task", "start", "--task-id", incident["diagnostic_task_id"]],
                )
                incident["diagnostic_task_dispatch_status"] = "started"
            except (
                OSError,
                subprocess.SubprocessError,
                ValueError,
                KeyError,
                TypeError,
            ):
                # 只保留类型化状态；CLI 异常文本可能带入环境或服务内部信息。
                incident["diagnostic_task_dispatch_status"] = (
                    "created_pending_start"
                    if incident.get("diagnostic_task_id")
                    else "creation_result_requires_reconciliation"
                )
            self.save_state(state)

    @staticmethod
    def _task_records(value):
        if isinstance(value, dict):
            if "id" in value and "prompt" in value:
                yield value
            else:
                for child in value.values():
                    yield from CatalogRefreshHealthStore._task_records(child)
        elif isinstance(value, list):
            for child in value:
                yield from CatalogRefreshHealthStore._task_records(child)

    def _diagnostic_task_prompt(self, incident: dict, marker: str) -> str:
        context = escape(
            f"事件标识 {marker}。用户在 fc98a 中要求：连续封禁或结构异常只开启一个诊断 Task；复用已验证旧目录，未恢复时开发页持续告警。此处为自动整理的授权摘要，不冒充用户逐字引文。首次异常 {incident['first_failure_at_utc']}；当前类别 {incident['failure_kind']}；持久证据 {incident['latest_evidence_path']}。证据只含脱敏状态和结构摘要，不含原始 HTML 或 API key。"
            f"故障生成器源码已持久快照：{incident.get('generator_source_snapshot_directory','未记录')}；上一份项目级已验证目录：{incident.get('previous_verified_catalog_response_path') or '尚无项目级数值副本'}。main 可能尚未包含生成器的未提交实现，应优先核对快照，不假定新 Task 的 checkout 等于故障代码。"
        )
        return (
            '<task-initial-prompt schema-version="1">'
            '<task-agent-authored-context declared-origin="agent-inference">'
            + context
            + "</task-agent-authored-context>"
            "<task-current-phase-intent>只读分析已保存证据、解析器和已验证目录，定位封禁或页面结构变化，提交原因、影响与修复建议。不得额外抓取 AA 网页或自动修复，不读取或打印 API key。报告保存到 Kanban 持久交接目录。关闭本卡不等于恢复；只有新目录通过完整校验并晋升后异常状态才自动 resolve。</task-current-phase-intent>"
            '<task-startup-setting-decisions><task-startup-setting-decision setting-name="startInPlanMode" action="inherit-default">继承实际 Settings 默认，不因只读调查覆盖。</task-startup-setting-decision></task-startup-setting-decisions>'
            "</task-initial-prompt>"
        )

    @staticmethod
    def _kanban_command() -> list[str] | None:
        configured = os.environ.get(
            "ARTIFICIAL_ANALYSIS_DIAGNOSTIC_KANBAN_COMMAND_JSON"
        )
        if configured:
            command = json.loads(configured)
            if (
                not isinstance(command, list)
                or not command
                or not all(isinstance(v, str) for v in command)
            ):
                raise ValueError("诊断 Kanban 命令必须是非空参数数组")
            return command
        directory = Path.home() / ".nvm/versions/node/v24.12.0/bin"
        return (
            [str(directory / "node"), str(directory / "kanban")]
            if (directory / "kanban").exists()
            else None
        )

    def _run_kanban(self, command: list[str], arguments: list[str]) -> dict:
        result = subprocess.run(
            [*command, *arguments, "--project-path", str(self.project_directory)],
            cwd=self.project_directory,
            capture_output=True,
            text=True,
            check=True,
            timeout=30,
        )
        return json.loads(result.stdout)
