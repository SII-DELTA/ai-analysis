"""把 Frontier 3D 可视化数据契约渲染为单文件 HTML。"""
from __future__ import annotations

import html
import json
from importlib import resources
from pathlib import Path
from typing import Any

from plotly.offline import get_plotlyjs
from plotly.utils import PlotlyJSONEncoder

from .frontier_3d_visualization_dataset_builder import (
    validate_frontier_3d_visualization_dataset,
)

ASSET_PACKAGE = "src.frontier_3d_interactive_report_assets"


def _read_asset_text(asset_name: str) -> str:
    return (
        resources.files(ASSET_PACKAGE)
        .joinpath(asset_name)
        .read_text(encoding="utf-8")
    )


def _json_for_script_tag(value: dict[str, Any]) -> str:
    return (
        json.dumps(value, ensure_ascii=False, cls=PlotlyJSONEncoder)
        .replace("</", "<\\/")
        .replace("<!--", "<\\!--")
    )


def render_frontier_3d_self_contained_html_report(dataset: dict[str, Any]) -> str:
    validate_frontier_3d_visualization_dataset(dataset)
    template = _read_asset_text("frontier_3d_self_contained_report_document.html")
    css = _read_asset_text("frontier_3d_interactive_report.css")
    javascript = _read_asset_text("frontier_3d_interactive_report.js")
    title = "AI 模型三维前沿"
    replacements = {
        "{{REPORT_TITLE}}": html.escape(title),
        "{{GRAPH_DIV_ID}}": html.escape(dataset.get("graph_div_id", "frontier3d")),
        "{{REPORT_CSS}}": css,
        "{{PLOTLY_JAVASCRIPT}}": get_plotlyjs(),
        "{{VISUALIZATION_DATASET_JSON}}": _json_for_script_tag(dataset),
        "{{REPORT_JAVASCRIPT}}": javascript,
    }
    rendered_html = template
    for placeholder, value in replacements.items():
        rendered_html = rendered_html.replace(placeholder, value)
    return rendered_html


def write_frontier_3d_self_contained_html_report(
    dataset: dict[str, Any],
    output_html_path: Path,
) -> Path:
    output_html_path.parent.mkdir(parents=True, exist_ok=True)
    output_html_path.write_text(
        render_frontier_3d_self_contained_html_report(dataset),
        encoding="utf-8",
    )
    return output_html_path
