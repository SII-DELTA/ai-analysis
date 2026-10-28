"""从显式来源清单生成历史前沿单文件报告、覆盖矩阵与审计证据。"""
from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
from pathlib import Path

from .frontier_3d_historical_progress import (
    build_historical_progress_dataset, materialize_historical_frame_dataset,
    validate_historical_progress_dataset,
)
from .frontier_3d_historical_sources import load_historical_source_manifest
from .frontier_3d_historical_browser_projection import build_historical_browser_projection_from_validated_dataset
from .frontier_3d_self_contained_html_renderer import (
    _json_for_script_tag, render_frontier_3d_self_contained_html_report,
)
from .frontier_3d_worktree_storage_paths import refuse_shared_worktree_directory_write


def render_historical_progress_html_report(dataset):
    validate_historical_progress_dataset(dataset)
    return _render_validated_historical_progress_html_report(dataset)


def _render_validated_historical_progress_html_report(dataset):
    initial = materialize_historical_frame_dataset(dataset, dataset["initial_historical_frame_id"])
    # 只有 V5 等原始速度数据时，首次加载明确从可用口径开始；后续显式选择不静默换口径。
    initial_frame = next(frame for frame in dataset["frames"] if frame["historical_frame_id"] == dataset["initial_historical_frame_id"])
    if not initial_frame["metric_variant_summaries"]["effective__effective"]["analysis_eligible_model_count"]:
        initial["initial_variant_key"] = "blended__raw"
    document = render_frontier_3d_self_contained_html_report(initial)
    document = document.replace("AI 模型三维 Pareto 前沿", "AI 模型历史 Pareto 前沿", 2)
    css = Path(__file__).with_name("frontier_3d_interactive_report_assets").joinpath("frontier_3d_historical_progress.css").read_text()
    document = document.replace("</head>", f"<style>{css}</style>\n</head>", 1)
    projected = build_historical_browser_projection_from_validated_dataset(dataset)
    historical_script = '<script id="frontier-3d-historical-progress-dataset-json" type="application/json">' + _json_for_script_tag(projected) + "</script>\n"
    document = document.replace('<script id="frontier-3d-visualization-dataset-json"', historical_script + '<script id="frontier-3d-visualization-dataset-json"', 1)
    return document


def historical_coverage_csv(dataset):
    stream = io.StringIO()
    writer = csv.DictWriter(stream, fieldnames=["source_snapshot_id", "intelligence_index_version", "observed_at_utc",
        "observed_at_utc_source", "analysis_sample_policy", "metric_variant", "source_model_count",
        "analysis_eligible_model_count", "pareto_model_count", "estimated_intelligence_count",
        "unknown_estimation_status_count", "unavailable_reason"])
    writer.writeheader()
    source_by_id = {source["source_snapshot_id"]: source for source in dataset["source_snapshots"]}
    for frame in dataset["frames"]:
        if frame["historical_view_mode"] != "observation_replay":
            continue
        source = source_by_id[frame["source_snapshot_id"]]
        for key, summary in frame["metric_variant_summaries"].items():
            writer.writerow({name: frame.get(name, source.get(name)) for name in (
                "source_snapshot_id", "intelligence_index_version", "observed_at_utc", "observed_at_utc_source", "analysis_sample_policy", "source_model_count")}
                | {"metric_variant": key, "pareto_model_count": len(summary["pareto_model_uuids"])}
                | {name: summary[name] for name in ("analysis_eligible_model_count", "estimated_intelligence_count", "unknown_estimation_status_count", "unavailable_reason")})
    return stream.getvalue()


def _write_artifact(path, text):
    refuse_shared_worktree_directory_write(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    # 原子替换和唯一暂存沿用项目的实现，不另写一套文件恢复机制。
    from .fetch_data import _write_text_file_atomically
    _write_text_file_atomically(path, text)


def main(arguments=None):
    parser = argparse.ArgumentParser(description="生成可离线打开的历史 Pareto 前沿双视角报告")
    parser.add_argument("--historical-source-manifest-file", type=Path, required=True, help="带来源 SHA256、版本和观测时间的持久清单")
    parser.add_argument("--output-html-file", type=Path, required=True, help="本任务独立输出位置")
    parser.add_argument("--publication-bundle-directory", type=Path, help="可选：另存适合平台文件限额的预览资源包目录；完整离线 HTML 仍保留")
    options = parser.parse_args(arguments)
    output = options.output_html_file.resolve()
    refuse_shared_worktree_directory_write(output)
    snapshots, outcomes = load_historical_source_manifest(options.historical_source_manifest_file)
    outcomes_path = output.with_suffix(".source-validation.json")
    _write_artifact(outcomes_path, json.dumps(outcomes, ensure_ascii=False, indent=2))
    if not snapshots:
        parser.exit(2, f"没有有效历史来源；逐源失败与自动恢复条件已保存：{outcomes_path}\n")
    print(f"已读取 {len(snapshots)} 份可核验样本，隔离 {sum(outcome['status'] == 'rejected' for outcome in outcomes)} 份来源。", flush=True)
    def report_progress(progress):
        if progress["completed_frame_count"] % 25 == 0:
            print(f"已准备 {progress['completed_frame_count']} 个时间步 · {progress['source_snapshot_id']} · 缓存复用 {progress['cache_reused']}", flush=True)
    dataset = build_historical_progress_dataset(snapshots, frame_cache_directory=output.with_suffix(".verified-frame-cache"), progress_callback=report_progress)
    dataset["source_validation_outcomes"] = outcomes
    dataset_path = output.with_suffix(".historical-dataset.json")
    coverage_path = output.with_suffix(".coverage.csv")
    _write_artifact(dataset_path, json.dumps(dataset, ensure_ascii=False, separators=(",", ":"), allow_nan=False))
    _write_artifact(coverage_path, historical_coverage_csv(dataset))
    _write_artifact(output, _render_validated_historical_progress_html_report(dataset))
    artifacts = [output, dataset_path, coverage_path, outcomes_path]
    receipt = {"status": "generated", "historical_frame_count": len(dataset["frames"]),
               "source_snapshot_count": len(snapshots), "standout_methodology": dataset["standout_methodology"],
               "artifacts": [{"path": str(path), "byte_count": path.stat().st_size,
                              "sha256": hashlib.sha256(path.read_bytes()).hexdigest()} for path in artifacts]}
    if options.publication_bundle_directory:
        from .frontier_3d_historical_report_publication_bundle import write_historical_progress_publication_bundle
        receipt["publication_bundle"] = write_historical_progress_publication_bundle(output, options.publication_bundle_directory)
    _write_artifact(output.with_suffix(".generation-receipt.json"), json.dumps(receipt, ensure_ascii=False, indent=2))
    print(json.dumps(receipt, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
