"""把 Frontier 3D 可视化数据契约渲染为单文件 HTML。"""
from __future__ import annotations

import hashlib
import html
import json
import copy
import re
import subprocess
from datetime import datetime, timezone
from importlib import resources
from pathlib import Path
from typing import Any

from plotly.utils import PlotlyJSONEncoder

from .frontier_3d_visualization_dataset_builder import (
    validate_frontier_3d_visualization_dataset,
)
from .frontier_3d_exact_achievable_frontier_scene_geometry import (
    build_exact_achievable_frontier_geometry_from_scene,
)

ASSET_PACKAGE = "src.frontier_3d_interactive_report_assets"
REPORT_DOCUMENT_TEMPLATE_ASSET_NAME = "frontier_3d_self_contained_report_document.html"
REPORT_CSS_ASSET_NAME = "frontier_3d_interactive_report.css"
THREEJS_INTERACTIVE_RENDERER_BUNDLE_ASSET_NAME = (
    "frontier_3d_threejs_interactive_renderer_bundle.js"
)
# 页面唯一标题；侧栏不再重复「Frontier 3D」，前端页头读取同一文案。
FRONTIER_3D_REPORT_DOCUMENT_TITLE = "AI 模型三维 Pareto 前沿"
GENERATOR_GIT_COMMIT_WHEN_UNRESOLVABLE = "unknown"
REPOSITORY_ROOT_DIRECTORY = Path(__file__).resolve().parent.parent

# 模板占位符形如 {{UPPER_SNAKE_CASE}}；只扫描模板本身，替换值不会被再次扫描。
TEMPLATE_PLACEHOLDER_PATTERN = re.compile(r"\{\{([A-Z][A-Z0-9_]*)\}\}")

# JSON 结构字符不含 < > &，它们只可能出现在字符串里，整体替换为 \uXXXX 转义仍是合法 JSON；
# 这样数据里的 </script>、<!--、& 实体都无法改变 HTML 解析状态。U+2028/U+2029 一并转义，
# 避免任何把 JSON 当作 JS 源码处理的下游工具在行分隔符处断行。
HTML_SIGNIFICANT_CHARACTER_JSON_ESCAPES = {
    "<": "\\u003c",
    ">": "\\u003e",
    "&": "\\u0026",
    " ": "\\u2028",
    " ": "\\u2029",
}
HTML_SIGNIFICANT_CHARACTER_PATTERN = re.compile(
    "[" + "".join(re.escape(character) for character in HTML_SIGNIFICANT_CHARACTER_JSON_ESCAPES) + "]"
)


def _read_asset_text(asset_name: str) -> str:
    return (
        resources.files(ASSET_PACKAGE)
        .joinpath(asset_name)
        .read_text(encoding="utf-8")
    )


def _json_for_script_tag(value: dict[str, Any]) -> str:
    """序列化为可以原样嵌入 `<script type="application/json">` 的 JSON 文本。"""
    serialized_json_text = json.dumps(value, ensure_ascii=False, cls=PlotlyJSONEncoder)
    return HTML_SIGNIFICANT_CHARACTER_PATTERN.sub(
        lambda match: HTML_SIGNIFICANT_CHARACTER_JSON_ESCAPES[match.group(0)],
        serialized_json_text,
    )


def substitute_frontier_3d_report_template_placeholders_in_single_pass(
    template_text: str,
    replacement_text_by_placeholder_name: dict[str, str],
) -> str:
    """一次性替换模板占位符；模板中出现未提供的占位符时抛 ValueError。

    逐个 str.replace 会让先替换进来的数据（例如契约里的 `{{REPORT_CSS}}` 字面量）
    被后续替换再次展开，这里用单次 re.sub，替换值不会再被扫描。
    """
    unknown_placeholder_names = sorted(
        {
            placeholder_name
            for placeholder_name in TEMPLATE_PLACEHOLDER_PATTERN.findall(template_text)
            if placeholder_name not in replacement_text_by_placeholder_name
        }
    )
    if unknown_placeholder_names:
        raise ValueError(
            "Frontier 3D 报告模板含有渲染器未提供的占位符: "
            + ", ".join(unknown_placeholder_names)
        )
    return TEMPLATE_PLACEHOLDER_PATTERN.sub(
        lambda match: replacement_text_by_placeholder_name[match.group(1)],
        template_text,
    )


def compute_frontier_3d_renderer_bundle_sha256(renderer_bundle_text: str) -> str:
    return hashlib.sha256(renderer_bundle_text.encode("utf-8")).hexdigest()


def resolve_frontier_3d_generator_git_commit(
    repository_directory: Path = REPOSITORY_ROOT_DIRECTORY,
) -> str:
    """返回生成器所在仓库的 HEAD 提交；已跟踪文件有改动时加 `-dirty`，取不到为 unknown。"""
    try:
        head_commit = subprocess.run(
            ["git", "rev-parse", "--verify", "HEAD"],
            cwd=repository_directory,
            check=True,
            capture_output=True,
            text=True,
            timeout=10,
        ).stdout.strip()
        # EXPERIMENT_NODE: 「dirty」只看已跟踪文件（与 git describe --dirty 一致）；是否把未跟踪文件也算作改动待实验。
        tracked_changes = subprocess.run(
            ["git", "status", "--porcelain", "--untracked-files=no"],
            cwd=repository_directory,
            check=True,
            capture_output=True,
            text=True,
            timeout=10,
        ).stdout.strip()
    except (OSError, subprocess.SubprocessError):
        return GENERATOR_GIT_COMMIT_WHEN_UNRESOLVABLE
    if not re.fullmatch(r"[0-9a-f]{40}", head_commit):
        return GENERATOR_GIT_COMMIT_WHEN_UNRESOLVABLE
    return f"{head_commit}-dirty" if tracked_changes else head_commit


def current_utc_time_as_iso8601_with_z_suffix() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def render_frontier_3d_self_contained_html_report(
    dataset: dict[str, Any],
    *,
    generator_git_commit: str | None = None,
    rendered_at_utc: str | None = None,
    report_deployment_environment: str = "development",
) -> str:
    """渲染单文件 HTML；指纹参数缺省时现场计算（测试可注入固定值）。"""
    validate_frontier_3d_visualization_dataset(dataset)
    # 旧 v2 的可达网格是采样结果。页面按同一输入重建精确预算阶梯，不改调用方快照。
    dataset = copy.deepcopy(dataset)
    for variant in dataset.get("metric_variants", {}).values():
        scene = variant.get("three_dimensional_scene")
        if scene is not None:
            scene.update(build_exact_achievable_frontier_geometry_from_scene(scene))
    template = _read_asset_text(REPORT_DOCUMENT_TEMPLATE_ASSET_NAME)
    css = _read_asset_text(REPORT_CSS_ASSET_NAME)
    threejs_interactive_renderer_javascript = _read_asset_text(
        THREEJS_INTERACTIVE_RENDERER_BUNDLE_ASSET_NAME
    )
    if generator_git_commit is None:
        generator_git_commit = resolve_frontier_3d_generator_git_commit()
    if rendered_at_utc is None:
        rendered_at_utc = current_utc_time_as_iso8601_with_z_suffix()
    replacement_text_by_placeholder_name = {
        "REPORT_TITLE": html.escape(FRONTIER_3D_REPORT_DOCUMENT_TITLE),
        "FRONTIER_3D_RENDERER_BUNDLE_SHA256": html.escape(
            compute_frontier_3d_renderer_bundle_sha256(
                threejs_interactive_renderer_javascript
            )
        ),
        "FRONTIER_3D_GENERATOR_GIT_COMMIT": html.escape(generator_git_commit),
        "FRONTIER_3D_RENDERED_AT_UTC": html.escape(rendered_at_utc),
        "GRAPH_DIV_ID": html.escape(dataset.get("graph_div_id", "frontier3d")),
        "REPORT_CSS": css,
        "VISUALIZATION_DATASET_JSON": _json_for_script_tag(dataset),
        "THREEJS_INTERACTIVE_RENDERER_JAVASCRIPT": (
            threejs_interactive_renderer_javascript
        ),
    }
    document = substitute_frontier_3d_report_template_placeholders_in_single_pass(
        template,
        replacement_text_by_placeholder_name,
    )
    from .frontier_3d_development_catalog_refresh_incident_banner import add_unresolved_catalog_refresh_development_banner
    return add_unresolved_catalog_refresh_development_banner(document,
        report_deployment_environment=report_deployment_environment,
        catalog_captured_at_utc=(dataset.get("artificial_analysis_data_provenance") or {}).get("embedded_model_catalog_captured_at_utc"))


def write_frontier_3d_self_contained_html_report(
    dataset: dict[str, Any],
    output_html_path: Path,
    *,
    report_deployment_environment: str = "development",
) -> Path:
    from .frontier_3d_worktree_storage_paths import refuse_shared_worktree_directory_write
    refuse_shared_worktree_directory_write(output_html_path)
    output_html_path.parent.mkdir(parents=True, exist_ok=True)
    output_html_path.write_text(
        render_frontier_3d_self_contained_html_report(dataset,report_deployment_environment=report_deployment_environment),
        encoding="utf-8",
    )
    return output_html_path
