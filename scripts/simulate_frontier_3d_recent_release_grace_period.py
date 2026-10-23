"""离线比较 0/1/3/6/12 月宽限，保存完整新增名单、输入指纹与突出度差异。"""
from __future__ import annotations

import argparse
import contextlib
import hashlib
import io
import json
import sys
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import numpy as np
import pandas as pd

from src import fetch_data, frontier
from src import frontier_3d_visualization_dataset_builder as builder


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--simulation-artifact-directory", type=Path, required=True)
    arguments = parser.parse_args()
    artifact_directory = arguments.simulation_artifact_directory.resolve()
    artifact_directory.mkdir(parents=True, exist_ok=True)
    source_paths = [
        fetch_data.API_LANGUAGE_MODELS_CACHE,
        fetch_data.ARTIFICIAL_ANALYSIS_MODELS_LIST_PAGE_HTML_CACHE_PATH,
        fetch_data.VERSIONED_COST_AND_OUTPUT_TOKEN_FALLBACK_SNAPSHOT,
        *sorted(fetch_data.ARTIFICIAL_ANALYSIS_MODEL_DETAIL_PAGE_HTML_CACHE_DIRECTORY.glob("*.html")),
    ]
    input_fingerprints = {
        str(path.resolve()): {
            "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
            "mtime_ns": path.stat().st_mtime_ns,
        }
        for path in source_paths if path.is_file()
    }
    load_log = io.StringIO()
    with (
        patch("requests.sessions.Session.request", side_effect=RuntimeError("离线模拟禁止网络请求")),
        patch.object(fetch_data, "get_api_key", side_effect=RuntimeError("离线模拟不读取凭据")),
        contextlib.redirect_stdout(load_log),
    ):
        models = fetch_data.build_dataframe(refresh=False, allow_artificial_analysis_website_page_fetch=False)
    (artifact_directory / "offline-data-load-log.txt").write_text(load_log.getvalue(), encoding="utf-8")
    provenance = builder.artificial_analysis_data_provenance_from_models_dataframe(models)
    reference_date = builder._api_response_fetched_at_calendar_date_text(provenance)
    models = builder._models_dataframe_with_non_positive_axis_values_treated_as_missing(models)
    reference_timestamp = pd.Timestamp(reference_date)
    result = {"pruning_reference_date": reference_date, "model_count": len(models), "input_fingerprints": input_fingerprints, "variants": {}}
    report_lines = [
        "# 近期发布模型宽限离线模拟", "",
        f"剪枝参考日：{reference_date}；输入模型数：{len(models)}。只读本地缓存，网络与凭据读取均被禁止。", "",
        "| 口径 | 0 月 | 1 月 | 3 月 | 6 月 | 12 月 | 6 月新增历史口径 | 分析 Pareto |",
        "|---|---:|---:|---:|---:|---:|---:|---:|",
    ]
    for cost_name, cost_definition in builder.COST_METRIC_DEFINITIONS.items():
        for speed_name, speed_definition in builder.SPEED_METRIC_DEFINITIONS.items():
            variant_key = f"{cost_name}__{speed_name}"
            cost_column, speed_column = cost_definition["column_name"], speed_definition["column_name"]
            baseline = frontier.apply_pruning(models, pruning_reference_date=reference_date,
                cost_metric_column_name=cost_column, speed_metric_column_name=speed_column,
                recent_release_frontier_distance_grace_period_months=0)
            baseline_metrics = frontier.add_standout_metrics(baseline, cost_column, speed_column)
            variant_result = {"baseline_kept": int(baseline["kept"].sum()), "analysis_pareto_count": int((baseline["kept"] & baseline["is_pareto"]).sum()), "grace": {}}
            for months in (1, 3, 6, 12):
                expanded = frontier.apply_pruning(models, pruning_reference_date=reference_date,
                    cost_metric_column_name=cost_column, speed_metric_column_name=speed_column,
                    recent_release_frontier_distance_grace_period_months=months)
                for column in ("layer", "display_layer", "is_pareto", "display_is_pareto"):
                    pd.testing.assert_series_equal(baseline[column], expanded[column])
                added = expanded[expanded[frontier.DISPLAYED_ONLY_BECAUSE_OF_RECENT_RELEASE_GRACE_PERIOD_COLUMN_NAME]]
                recent = expanded["release_date"].between(reference_timestamp - pd.DateOffset(months=months), reference_timestamp)
                missing = expanded[recent & expanded["drop_reason"].str.startswith("缺维度")]
                record = {
                    "kept": int(expanded["kept"].sum()),
                    "added_historical": int((~added[frontier.ANALYSIS_ELIGIBLE_COLUMN_NAME]).sum()),
                    "added": [{"name": row["name"], "creator": row["creator"], "release_date": row["release_date"].date().isoformat(), "analysis_eligible": bool(row[frontier.ANALYSIS_ELIGIBLE_COLUMN_NAME])} for _, row in added.sort_values("name").iterrows()],
                    "recent_missing_dimensions": [{"name": row["name"], "drop_reason": row["drop_reason"]} for _, row in missing.iterrows()],
                }
                if months == 6:
                    expanded_metrics = frontier.add_standout_metrics(expanded, cost_column, speed_column)
                    original_pareto_indices = baseline.index[baseline["kept"] & baseline["is_pareto"]]
                    record["original_pareto_standout_changes"] = {}
                    for column in frontier.STANDOUT_COLUMNS:
                        before = baseline_metrics.loc[original_pareto_indices, column].to_numpy(float)
                        after = expanded_metrics.loc[original_pareto_indices, column].to_numpy(float)
                        record["original_pareto_standout_changes"][column] = {
                            "changed_count": int((~np.isclose(before, after, equal_nan=True)).sum()),
                            "maximum_absolute_difference": float(np.nanmax(np.abs(before - after))) if len(before) else None,
                        }
                variant_result["grace"][months] = record
            result["variants"][variant_key] = variant_result
            counts = [variant_result["baseline_kept"], *(variant_result["grace"][months]["kept"] for months in (1, 3, 6, 12))]
            report_lines.append(f"| {variant_key} | " + " | ".join(map(str, counts)) + f" | {variant_result['grace'][6]['added_historical']} | {variant_result['analysis_pareto_count']} |")
    for variant_key, variant_result in result["variants"].items():
        for months, record in variant_result["grace"].items():
            report_lines.extend(["", f"## {variant_key}：{months} 个月新增名单", ""])
            report_lines.extend(f"- {model['name']}（{model['creator']}；{model['release_date']}；{'当期可比' if model['analysis_eligible'] else '历史口径'}）" for model in record["added"])
    # 同时记录内容与时间：现有目录加载器按缓存 mtime 分区，不能只校验字节内容。
    for path in source_paths:
        if path.is_file():
            fingerprint = input_fingerprints[str(path.resolve())]
            assert hashlib.sha256(path.read_bytes()).hexdigest() == fingerprint["sha256"] and path.stat().st_mtime_ns == fingerprint["mtime_ns"], "模拟期间输入缓存已变，请重新运行"
    (artifact_directory / "recent-release-grace-period-simulation.json").write_text(json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False) + "\n", encoding="utf-8")
    (artifact_directory / "recent-release-grace-period-simulation.md").write_text("\n".join(report_lines) + "\n", encoding="utf-8")
    print("\n".join(report_lines[:10]))
    print(f"完整新增名单、输入指纹与突出度差异：{artifact_directory}")


if __name__ == "__main__":
    main()
