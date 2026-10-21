"""渲染时读取当前持久异常，旧契约重渲染同样显示开发告警。"""

from __future__ import annotations

import html
from pathlib import Path

from .artificial_analysis_catalog_refresh_health import CatalogRefreshHealthStore


def add_unresolved_catalog_refresh_development_banner(
    document: str,
    *,
    report_deployment_environment: str = "development",
    health_store=None,
    catalog_captured_at_utc: str | None = None,
) -> str:
    if report_deployment_environment not in {"development", "production"}:
        raise ValueError("报告环境必须为 development 或 production")
    if report_deployment_environment == "production":
        return document
    store = health_store or CatalogRefreshHealthStore(
        Path(__file__).resolve().parents[1]
    )
    try:
        incident = store.read_state().get("unresolved_incident")
    except (OSError, ValueError):
        incident = {
            "failure_kind": "状态读取失败，不能确认故障已恢复",
            "first_failure_at_utc": "未知",
        }
    if not incident:
        return document
    kind = {
        "blocked": "网页请求被封禁或限流",
        "structure_change": "网页目录结构或数据校验异常",
    }.get(incident.get("failure_kind"), incident.get("failure_kind", "原因待核查"))
    diagnostic_task = (
        "诊断 Task " + str(incident["diagnostic_task_id"])
        if incident.get("diagnostic_task_id")
        else "诊断 Task 待创建／核对"
    )
    dispatch_status = {
        "started": "已启动",
        "created_pending_start": "已创建，待启动",
        "creation_result_requires_reconciliation": "创建结果待核对",
        "not_requested": "待派发",
        "waiting_for_kanban_command": "等待 Kanban 可用",
        "waiting_for_valid_kanban_command_configuration": "Kanban 配置待修复",
    }.get(incident.get("diagnostic_task_dispatch_status"), "状态未记录")
    text = (
        f"开发诊断：{kind}，尚未恢复。首次发现 {incident.get('first_failure_at_utc','未知')}；"
        f"当前复用目录日期 {catalog_captured_at_utc or '未知或无可用目录'}；{diagnostic_task}"
        f"（{dispatch_status}）。"
    )
    banner = (
        '<aside id="frontier-3d-unresolved-catalog-refresh-development-warning" role="alert" '
        'style="flex:0 0 auto;padding:10px 14px;border-bottom:2px solid #c2410c;'
        'background:#fff1db;color:#7c2d12;font-size:14px;line-height:1.5;overflow-wrap:anywhere">'
        + html.escape(text)
        + "</aside>\n"
    )
    return document.replace(
        '<header id="frontier-3d-report-header"',
        banner + '<header id="frontier-3d-report-header"',
        1,
    )
