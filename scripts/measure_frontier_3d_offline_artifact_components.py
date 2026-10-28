"""在同一冻结输入上量化 v2、首阶段投影和 v3，并核对科学数值与几何。"""
from __future__ import annotations

import argparse
import copy
import hashlib
import json
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from src.frontier_3d_self_contained_html_renderer import _json_for_script_tag
from src.frontier_3d_visualization_dataset_builder import expand_frontier_3d_visualization_dataset_for_scene_consumers
from src.frontier_3d_worktree_storage_paths import refuse_shared_worktree_directory_write

DATASET_PATTERN = re.compile(r'<script id="frontier-3d-visualization-dataset-json" type="application/json">(.*?)</script>', re.S)
BUNDLE_PATTERN = re.compile(r'<script>\n(.*)\n  </script>\n</body>', re.S)
CSS_PATTERN = re.compile(r'<style>\n(.*?)\n  </style>', re.S)


def measure_frontier_3d_html_components(document):
    matches = [pattern.findall(document) for pattern in (DATASET_PATTERN, BUNDLE_PATTERN, CSS_PATTERN)]
    if any(len(values) != 1 for values in matches):
        raise ValueError("报告必须恰含一份契约、renderer bundle 和样式")
    embedded, bundle, stylesheet = [values[0] for values in matches]
    sizes = {"total_html_utf8_bytes": len(document.encode()), "embedded_browser_dataset_utf8_bytes": len(embedded.encode()),
             "renderer_javascript_bundle_utf8_bytes": len(bundle.encode()), "inline_stylesheet_utf8_bytes": len(stylesheet.encode())}
    sizes["document_structure_utf8_bytes"] = sizes["total_html_utf8_bytes"] - sum(value for key, value in sizes.items() if key != "total_html_utf8_bytes")
    dataset = json.loads(embedded)
    expanded = expand_frontier_3d_visualization_dataset_for_scene_consumers(dataset)
    sizes["embedded_dataset_detail"] = {
        "shared_models_serialized_utf8_bytes": len(_json_for_script_tag(dataset.get("models", [])).encode()),
        "organization_logos_serialized_utf8_bytes": sum(len(_json_for_script_tag(identity["logo_visualization_data_url"]).encode()) for identity in dataset["organization_identity_metadata_by_creator_name"].values() if identity.get("logo_visualization_data_url")),
        "organization_logo_count": sum(bool(identity.get("logo_visualization_data_url")) for identity in dataset["organization_identity_metadata_by_creator_name"].values()),
        "displayed_model_count_by_variant": {key: len(variant["three_dimensional_scene"]["displayed_model_markers"]) for key, variant in expanded["metric_variants"].items()},
        "geometry_serialized_utf8_bytes": sum(len(_json_for_script_tag(value).encode()) for variant in dataset["metric_variants"].values() for field, value in variant["three_dimensional_scene"].items() if field.endswith(("triangle_mesh", "line_segments"))),
    }
    return sizes


def compare_scientific_values_and_geometry(baseline, scientific_dataset):
    current = expand_frontier_3d_visualization_dataset_for_scene_consumers(scientific_dataset)
    results = {}
    for key, baseline_variant in baseline["metric_variants"].items():
        baseline_scene = baseline_variant["three_dimensional_scene"]
        scene = current["metric_variants"][key]["three_dimensional_scene"]
        def numerical_marker_values(markers):
            return {model.get("model_uuid") or (model["creator"], model["name"]): {
                **{axis: model[axis] for axis in "xyz"}, "layer": model["panel"].get("layer"),
                "standout_metrics": model["standout_metrics"], "normalized_improvement_coordinates": model["normalized_improvement_coordinates"],
                "analysis_eligibility": model.get("analysis_eligibility"),
            } for model in markers}
        geometry_fields = [field for field in baseline_scene if field.endswith(("triangle_mesh", "line_segments")) or field == "three_dimensional_axis_configuration"]
        results[key] = {"scientific_values_identical": numerical_marker_values(baseline_scene["displayed_model_markers"]) == numerical_marker_values(scene["displayed_model_markers"]),
                        "geometry_and_axes_identical": all(baseline_scene[field] == scene[field] for field in geometry_fields)}
    return results


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--baseline-html", type=Path, required=True)
    parser.add_argument("--current-html", type=Path, required=True)
    parser.add_argument("--scientific-dataset", type=Path, required=True)
    parser.add_argument("--output-json", type=Path, required=True)
    arguments = parser.parse_args()
    refuse_shared_worktree_directory_write(arguments.output_json)
    baseline_document = arguments.baseline_html.read_text()
    baseline_text = DATASET_PATTERN.search(baseline_document)[1]
    baseline = json.loads(baseline_text)
    first_stage = copy.deepcopy(baseline)
    creators = {model["creator"] for variant in first_stage["metric_variants"].values() for model in variant["three_dimensional_scene"]["displayed_model_markers"]}
    for variant in first_stage["metric_variants"].values():
        variant.pop("plotly_static_export_trace_data", None)
        variant.pop("plotly_static_export_layout", None)
    for name, identity in first_stage["organization_identity_metadata_by_creator_name"].items():
        if name not in creators:
            identity.pop("logo_visualization_data_url", None)
    scientific_dataset = json.loads(arguments.scientific_dataset.read_text())
    first_stage_document = baseline_document.replace(baseline_text, _json_for_script_tag(first_stage), 1)
    measurements = {"baseline": measure_frontier_3d_html_components(baseline_document),
                    "first_stage_projection": measure_frontier_3d_html_components(first_stage_document),
                    "v3": measure_frontier_3d_html_components(arguments.current_html.read_text()),
                    "scientific_contract_file_utf8_bytes": arguments.scientific_dataset.stat().st_size,
                    "scientific_and_geometry_parity": compare_scientific_values_and_geometry(baseline, scientific_dataset),
                    "input_file_sha256": {str(path): hashlib.sha256(path.read_bytes()).hexdigest() for path in (arguments.baseline_html, arguments.current_html, arguments.scientific_dataset)}}
    measurements["budgets"] = {"first_stage_maximum_bytes": 3_100_000, "first_stage_met": measurements["first_stage_projection"]["total_html_utf8_bytes"] <= 3_100_000,
                               "v3_maximum_bytes": 2_200_000, "v3_met": measurements["v3"]["total_html_utf8_bytes"] <= 2_200_000}
    arguments.output_json.parent.mkdir(parents=True, exist_ok=True)
    arguments.output_json.write_text(json.dumps(measurements, ensure_ascii=False, allow_nan=False, indent=2) + "\n")
    assert all(all(result.values()) for result in measurements["scientific_and_geometry_parity"].values()), "数值或几何对拍失败，证据已保存"
    print(json.dumps({"v2_bytes": measurements['baseline']['total_html_utf8_bytes'], "first_stage_bytes": measurements['first_stage_projection']['total_html_utf8_bytes'], "v3_bytes": measurements['v3']['total_html_utf8_bytes'], "budgets": measurements['budgets']}, ensure_ascii=False))
    if not all((measurements["budgets"]["first_stage_met"], measurements["budgets"]["v3_met"])):
        raise SystemExit("体积预算未达标，保留能力并查看测量证据")


if __name__ == "__main__":
    main()
