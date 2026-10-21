"""API 与网页目录共用的唯一暂存、响应历史及原子文件写入机制。"""

from __future__ import annotations

import json
import os
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4


def enforce_worktree_storage_boundary_when_available(path: Path) -> None:
    """复用 W2 的存储边界策略；旧基线上不存在该模块，不另建一套路径策略。"""
    try:
        from .frontier_3d_worktree_storage_paths import (
            refuse_shared_worktree_directory_write,
        )
    except ModuleNotFoundError as error:
        if error.name != __package__ + ".frontier_3d_worktree_storage_paths":
            raise
    else:
        refuse_shared_worktree_directory_write(path)


def finalize_guardrail_validated_response_history(
    pending_path: Path, outcome_path: Path
) -> None:
    enforce_worktree_storage_boundary_when_available(pending_path)
    enforce_worktree_storage_boundary_when_available(outcome_path)
    os.replace(pending_path, outcome_path)


def write_text_file_atomically(target_file_path: Path, file_text: str) -> None:
    enforce_worktree_storage_boundary_when_available(target_file_path)
    target_file_path.parent.mkdir(parents=True, exist_ok=True)
    temporary_path = target_file_path.with_name(
        target_file_path.name
        + f".by_process_{os.getpid()}_{uuid4().hex}.partial_write_in_progress"
    )
    try:
        with temporary_path.open("x", encoding="utf-8") as stream:
            stream.write(file_text)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary_path, target_file_path)
    finally:
        temporary_path.unlink(missing_ok=True)


def write_json_file_atomically(path: Path, payload: dict) -> None:
    write_text_file_atomically(
        path,
        json.dumps(payload, ensure_ascii=False, allow_nan=False, separators=(",", ":")),
    )


@dataclass
class GuardrailValidatedJsonResponseStorage:
    active_response_path: Path
    history_directory: Path
    pending_response_path: Path | None = None
    pending_history_path: Path | None = None

    def stage(
        self,
        payload: dict,
        *,
        response_name_prefix: str,
        pending_response_path: Path | None = None,
        pending_history_path: Path | None = None,
    ) -> None:
        timestamp = str(payload["fetched_at_utc"]).replace("-", "").replace(":", "")
        identifier = (
            f"{timestamp}_by_process_{os.getpid()}_refresh_attempt_{uuid4().hex[:12]}"
        )
        filename = f"{response_name_prefix}_fetched_at_{identifier}_pending_data_quality_guardrail_validation.json"
        self.pending_response_path = (
            pending_response_path or self.active_response_path.with_name(filename)
        )
        self.pending_history_path = (
            pending_history_path or self.history_directory / filename
        )
        write_json_file_atomically(self.pending_history_path, payload)
        write_json_file_atomically(self.pending_response_path, payload)

    def reject(self) -> None:
        self._finish_history("_rejected_by_data_quality_guardrails")
        if self.pending_response_path:
            self.pending_response_path.unlink(missing_ok=True)

    def promote(self, *, archive_existing: bool = True) -> None:
        if self.pending_response_path is None:
            return
        # 旧缓存原样归档；哈希避免同秒不同内容被静默覆盖。
        if archive_existing and self.active_response_path.exists():
            import hashlib

            previous = self.active_response_path.read_text(encoding="utf-8")
            captured_at = json.loads(previous).get(
                "fetched_at_utc", "unknown_capture_time"
            )
            digest = hashlib.sha256(previous.encode()).hexdigest()[:16]
            previous_path = (
                self.history_directory
                / f"previous_verified_response_{captured_at.replace(':', '')}_{digest}.json"
            )
            if not previous_path.exists():
                write_text_file_atomically(previous_path, previous)
        enforce_worktree_storage_boundary_when_available(self.pending_response_path)
        enforce_worktree_storage_boundary_when_available(self.active_response_path)
        # 先确认护栏已通过的历史；后续替换失败或进程中断仍保留可重试的暂存响应。
        # accepted history 记录校验结果，因此允许它先于 active 晋升完成。
        self._finish_history("")
        os.replace(self.pending_response_path, self.active_response_path)
        self.pending_response_path = None

    def _finish_history(self, suffix: str) -> None:
        if self.pending_history_path and self.pending_history_path.exists():
            completed_path = self.pending_history_path.with_name(
                self.pending_history_path.name.replace(
                    "_pending_data_quality_guardrail_validation.json", suffix + ".json"
                )
            )
            finalize_guardrail_validated_response_history(
                self.pending_history_path, completed_path
            )
            self.pending_history_path = None
