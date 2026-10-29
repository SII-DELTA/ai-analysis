"""读取既有 v2 契约，生成独立、自包含、可复核的前沿几何比较产物。"""
from __future__ import annotations

import copy
import hashlib
import json
import math
from pathlib import Path
import re

from .frontier_3d_geometry_comparison import (
    build_exact_achievable_step_geometry,
    compare_reference_interpolation_with_exact_steps,
)
from .frontier_3d_self_contained_html_renderer import _json_for_script_tag
from .frontier_3d_visualization_dataset_builder import validate_frontier_3d_visualization_dataset


REPOSITORY_ROOT_DIRECTORY = Path(__file__).resolve().parent.parent
COMPARISON_ASSETS_DIRECTORY = Path(__file__).with_name("frontier_3d_geometry_comparison_assets")
HISTORICAL_ASSISTANT_SUGGESTION_SOURCE = (
    "/Users/bominzhang/.claude/projects/-Users-bominzhang--cline-worktrees-4c7d1-ai-analysis/"
    "cd8711d6-4092-4159-8a0c-6434ac82a99a.jsonl:1382"
)
HISTORICAL_ASSISTANT_UX_SUGGESTIONS_VERBATIM = [
    '1. **hover 里直接说明"它凭什么在前沿"**——列出它在成本/速度上分别压过哪些邻居（把非支配理由摆出来）；',
    '2. **给前沿点标注"特化方向"**（智能特化/成本特化/速度特化/均衡），让峰谷一眼可解释；',
    '3. **弱化/去掉那张编织面**——因为正是"面"诱导了"比邻居高/低=好/坏"的错误读法，改成只按厂商散点 + 谱系线。',
]
COMPARISON_ARTIFACT_FILENAMES_BY_KIND = {
    "html": "frontier_3d_geometry_comparison_demo.html",
    "metrics": "frontier_3d_geometry_comparison_metrics.json",
    "decision_brief": "frontier_3d_geometry_comparison_decision_brief.md",
    "source_snapshot": "frontier_3d_geometry_comparison_source_dataset.json",
}


def _project_axis_coordinate_to_common_view(value, axis_configuration):
    scale_type = axis_configuration["scale_type"]
    lower, upper = axis_configuration["fixed_range"]
    if scale_type not in ("log", "linear") or not all(math.isfinite(bound) for bound in (lower, upper)) or lower >= upper:
        raise ValueError("比较页要求有效的 log/linear 轴刻度与固定范围")
    if scale_type == "log":
        if value <= 0:
            raise ValueError("对数轴坐标必须为正")
        value = math.log10(value)
    return (value - lower) / (upper - lower)


def build_geometry_comparison_dataset(source_dataset, source_dataset_sha256):
    """同一输入决定几何与统计；不改源契约，也不重算 Delaunay 邻接。"""
    validate_frontier_3d_visualization_dataset(source_dataset)
    from .frontier_3d_visualization_dataset_builder import expand_frontier_3d_visualization_dataset_for_scene_consumers
    source_schema_version = source_dataset["schema_version"]
    source_dataset = expand_frontier_3d_visualization_dataset_for_scene_consumers(source_dataset)
    comparison_variants = {}
    displayed_creators = set()
    for variant_key, variant in source_dataset["metric_variants"].items():
        scene = variant["three_dimensional_scene"]
        axes = copy.deepcopy(scene["three_dimensional_axis_configuration"])
        if axes["z_axis"]["scale_type"] != "linear":
            raise ValueError("比较页智能轴必须为线性刻度")
        _project_axis_coordinate_to_common_view(0, axes["z_axis"])

        def projected_position(raw_position):
            return [
                _project_axis_coordinate_to_common_view(raw_position[0], axes["x_axis"]),
                _project_axis_coordinate_to_common_view(raw_position[1], axes["y_axis"]),
                float(raw_position[2]),
            ]

        displayed_models = []
        for marker in scene["displayed_model_markers"]:
            eligibility = marker.get("analysis_eligibility", {}).get("is_analysis_eligible_for_current_metric_variant")
            if type(eligibility) is not bool:
                raise ValueError(f"{variant_key}: marker 缺少明确的 analysis_eligibility")
            raw_position = [marker[axis] for axis in "xyz"]
            displayed_models.append({
                "name": marker["name"], "creator": marker["creator"],
                "raw_position": raw_position, "projected_position": projected_position(raw_position),
                "analysis_eligible": eligibility,
                "is_pareto": eligibility and marker["panel"]["layer"] == 1,
            })
            displayed_creators.add(marker["creator"])
        pareto_models = [model for model in displayed_models if model["is_pareto"]]
        pareto_points = [model["projected_position"] for model in pareto_models]
        original_reference = scene["pareto_frontier_surface_triangle_mesh"]
        raw_reference_vertices = list(zip(*(original_reference[f"{axis}_coordinates"] for axis in "xyz")))
        raw_pareto_positions = {tuple(model["raw_position"]) for model in pareto_models}
        if any(tuple(vertex) not in raw_pareto_positions for vertex in raw_reference_vertices):
            raise ValueError(f"{variant_key}: 插值参照含非展示分析 Pareto 锚点，不能作同集合比较")
        reference_mesh = {
            "vertices": [projected_position(vertex) for vertex in raw_reference_vertices],
            "triangles": [list(indices) for indices in zip(*(original_reference[f"triangle_vertex_index_{axis}"] for axis in "abc"))],
        }
        step_geometry = build_exact_achievable_step_geometry(pareto_points)
        metrics, reverse_classification = compare_reference_interpolation_with_exact_steps(step_geometry, reference_mesh, displayed_models)
        metric_names = variant_key.split("__")
        cost_label = "有效运行成本" if metric_names[0] == "effective" else "7:2:1 混合单价"
        speed_label = {"effective": "有效速度", "raw": "原始速度", "tasks_per_hour": "任务速度"}[metric_names[1]]
        projection_description = " × ".join(
            ("对数" if axes[axis]["scale_type"] == "log" else "线性") + name
            for axis, name in (("x_axis", "成本"), ("y_axis", "速度"))
        )
        # EXPERIMENT_NODE: 默认已选邻接插值参照，后续实验是否需要增加单调平滑比较方案。
        comparison_variants[variant_key] = {
            "label": f"{cost_label} × {speed_label}",
            "cost_axis_unit": "USD" if metric_names[0] == "effective" else "USD/M tokens",
            "speed_axis_unit": "任务/小时" if metric_names[1] == "tasks_per_hour" else "tok/s",
            "axes": axes, "projection_plane_description": projection_description,
            "displayed_models": displayed_models, "exact_pareto_points": pareto_points,
            "exact_step_geometry": step_geometry, "reference_triangle_mesh": reference_mesh,
            "reference_reverse_triangle_classification": reverse_classification,
            "metrics": metrics,
        }
    return {
        "schema_version": "frontier_3d_geometry_comparison/v1",
        "source_dataset_schema_version": source_schema_version,
        "source_dataset_sha256": source_dataset_sha256,
        "data_date": source_dataset.get("data_date"),
        "initial_variant_key": source_dataset["initial_variant_key"],
        "artificial_analysis_intelligence_index_version": source_dataset.get("artificial_analysis_data_provenance", {}).get("current_intelligence_index_version"),
        "exactness_scope": "精确性限于输入契约中已展示、参与本口径分析的 Pareto 点集合；不代表未收录模型或真实连续模型。",
        "metric_variants": comparison_variants,
        "organization_identity_metadata_by_creator_name": {
            creator: source_dataset["organization_identity_metadata_by_creator_name"][creator]
            for creator in sorted(displayed_creators)
        },
        "historical_assistant_ux_suggestions_verbatim": HISTORICAL_ASSISTANT_UX_SUGGESTIONS_VERBATIM,
        "historical_assistant_ux_suggestion_source": HISTORICAL_ASSISTANT_SUGGESTION_SOURCE,
    }


def comparison_metrics_document(comparison_dataset):
    return {
        key: value for key, value in comparison_dataset.items()
        if key not in ("metric_variants", "organization_identity_metadata_by_creator_name")
    } | {
        "method": {
            "projected_view_bounds": [[0, 1], [0, 1]],
            "area_unit": "共同视域投影面积归一为 1；各口径、各轴刻度单独计算，不跨口径比较绝对面积。",
            "reverse_face_definition": "投影平面归一坐标中，d智能/d成本 < -1e-9 或 d智能/d速度 > 1e-9；投影退化面不参与比例。",
            "support_symmetric_difference_definition": "A 为精确可达域，D 为插值支持域；|A△D|/|A∪D|。",
            "height_error_definition": "在 A∩D 中，按投影面积积分 |F-L|；平台与三角形裁剪，在仿射误差的零线处分割后精确积分。最大误差取各裁剪多边形顶点的上确界。",
            "empty_domain_policy": "分母为零时给 null，页面显示不适用；模型凸包外不外推。",
            "model_excess_scope": "只计已展示、参与分析、非 Pareto 的模型。最大高差无命中时为 null，凸包外另计。",
        },
        "metric_variants": {
            key: {"label": variant["label"], "projection_plane_description": variant["projection_plane_description"], "axes": variant["axes"], **variant["metrics"]}
            for key, variant in comparison_dataset["metric_variants"].items()
        },
    }


def _decision_brief_markdown(comparison_dataset):
    lines = [
        "# 前沿几何比较与待决事项", "",
        f"数据日期：{comparison_dataset['data_date']}；输入 SHA256：`{comparison_dataset['source_dataset_sha256']}`。", "",
        comparison_dataset["exactness_scope"], "",
        "## 本次比较", "",
        "阶梯面包含同高合并平台、相邻可达平台间立面与边线；不可达区不补面、不向箱底封口。Delaunay 使用原契约的顶点与三角索引。", "",
        "| 口径 | 反向面 | 面积加权反向比例 | 支持域差异率 | 智能 MAE | 最大绝对误差 | 模型最大高差 |",
        "|---|---:|---:|---:|---:|---:|---:|",
    ]
    def number(value, percentage=False):
        return "不适用" if value is None else (f"{100 * value:.2f}%" if percentage else f"{value:.4f}")
    for variant in comparison_dataset["metric_variants"].values():
        metrics = variant["metrics"]
        lines.append("| " + " | ".join([
            variant["label"], f"{metrics['reverse_triangle_count']}/{metrics['nondegenerate_projected_triangle_count']}",
            number(metrics["reverse_projected_area_fraction"], True),
            number(metrics["support_symmetric_difference_area_fraction"], True),
            number(metrics["common_support_mean_absolute_intelligence_error"]),
            number(metrics["common_support_maximum_absolute_intelligence_error"]),
            number(metrics["maximum_eligible_non_pareto_model_intelligence_excess_above_reference"]),
        ]) + " |")
    lines.extend([
        "", "完整定义、视域和按口径的计数见同目录 metrics.json；高度误差只在共同定义域比较，凸包外没有外推。", "",
        "旧审计的反向比例和 blended 口径 8.4 分来自历史数据。本次数字均来自输入快照；不得把历史数值当作当前验收常量。", "",
        "## 已确认的默认描绘", "",
        "默认保留 Delaunay 邻接插值，仅作视觉参照，不是帕累托面；正式报告提供切换到精确阶梯可达面的开关。单调平滑近似未纳入首批实现。", "",
        "## 4c7d1 历史助手建议原文", "",
        "以下三项为历史助手提出的 UX 建议，尚无已核查的用户选择；它们不是本卡新增实施要求。", "",
        *HISTORICAL_ASSISTANT_UX_SUGGESTIONS_VERBATIM, "",
        f"来源：`{HISTORICAL_ASSISTANT_SUGGESTION_SOURCE}`。只摘录这三条建议，不复制整个会话。", "",
    ])
    return "\n".join(lines)


def _validate_artifact_destination_paths(source_path, destination_paths):
    shared_directories = [(REPOSITORY_ROOT_DIRECTORY / relative).resolve() for relative in ("output", "data/raw", "data/processed")]
    for path in destination_paths:
        resolved = path.resolve()
        if resolved == source_path.resolve() or (path.exists() and path.samefile(source_path)):
            raise ValueError("比较产物不能覆盖输入契约")
        if any(resolved.is_relative_to(shared) for shared in shared_directories):
            raise ValueError("比较产物不能写入共享 output、data/raw 或 data/processed 目录")


def write_geometry_comparison_artifacts(source_path: Path, artifact_directory: Path):
    source_path, artifact_directory = Path(source_path), Path(artifact_directory)
    artifact_paths = {kind: artifact_directory / filename for kind, filename in COMPARISON_ARTIFACT_FILENAMES_BY_KIND.items()}
    _validate_artifact_destination_paths(source_path, artifact_paths.values())
    source_bytes = source_path.read_bytes()
    comparison_dataset = build_geometry_comparison_dataset(json.loads(source_bytes), hashlib.sha256(source_bytes).hexdigest())
    template = (COMPARISON_ASSETS_DIRECTORY / "frontier_3d_geometry_comparison_document.html").read_text(encoding="utf-8")
    replacements = {
        "COMPARISON_CSS": (COMPARISON_ASSETS_DIRECTORY / "frontier_3d_geometry_comparison.css").read_text(encoding="utf-8"),
        "COMPARISON_DATASET_JSON": _json_for_script_tag(comparison_dataset),
        "COMPARISON_RENDERER_BUNDLE": (COMPARISON_ASSETS_DIRECTORY / "frontier_3d_geometry_comparison_renderer_bundle.js").read_text(encoding="utf-8"),
    }
    # 只扫描模板本身，数据中的标签样字符串不能成为二次替换指令。
    html = re.sub(r"\{\{([A-Z_]+)\}\}", lambda match: replacements[match[1]], template)
    artifact_directory.mkdir(parents=True, exist_ok=True)
    artifact_paths["source_snapshot"].write_bytes(source_bytes)
    artifact_paths["html"].write_text(html, encoding="utf-8")
    artifact_paths["metrics"].write_text(json.dumps(comparison_metrics_document(comparison_dataset), ensure_ascii=False, indent=2, allow_nan=False) + "\n", encoding="utf-8")
    artifact_paths["decision_brief"].write_text(_decision_brief_markdown(comparison_dataset), encoding="utf-8")
    return artifact_paths
