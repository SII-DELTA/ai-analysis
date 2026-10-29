"""历史科学契约的浏览器投影：场景与几何逐份压缩，避免启动时展开全部场景。"""
from __future__ import annotations

import base64
import gzip
import json

HISTORICAL_BROWSER_PROJECTION_SCHEMA_VERSION = "frontier_3d_historical_progress_browser_projection/v1"


def _compressed_json_base64(value):
    content = json.dumps(value, ensure_ascii=False, separators=(",", ":"), allow_nan=False).encode()
    return base64.b64encode(gzip.compress(content, compresslevel=6, mtime=0)).decode("ascii")


def build_historical_browser_projection_from_validated_dataset(dataset):
    """只改变存储方式，保留科学值；逐值完整溯源另随科学 JSON 交付。"""
    result = {key: value for key, value in dataset.items()
              if key not in ("frames", "scene_geometry_definitions", "model_observation_value_provenance")}
    result["schema_version"] = HISTORICAL_BROWSER_PROJECTION_SCHEMA_VERSION
    result["projected_from_schema_version"] = dataset["schema_version"]
    result["scene_geometry_definitions_compressed_base64_gzip"] = [
        _compressed_json_base64(geometry) for geometry in dataset["scene_geometry_definitions"]
    ]
    result["frames"] = []
    for frame in dataset["frames"]:
        projected = {key: value for key, value in frame.items() if key not in ("scientific_dataset", "metric_variant_summaries")}
        projected["scientific_dataset_compressed_base64_gzip"] = _compressed_json_base64(frame["scientific_dataset"])
        projected["metric_variant_summaries"] = {}
        for key, summary in frame["metric_variant_summaries"].items():
            members = set(summary["pareto_model_uuids"])
            models = []
            for marker in frame["scientific_dataset"]["metric_variants"][key]["three_dimensional_scene"]["displayed_model_markers"]:
                information = dataset["model_observations"][frame["model_observation_indices"][marker["model_index"]]]
                if information["model_uuid"] in members:
                    models.append({"model_uuid": information["model_uuid"],
                                   "normalized_improvement_coordinates": marker["normalized_improvement_coordinates"]})
            projected["metric_variant_summaries"][key] = {**summary, "normalized_frontier_models": models}
        result["frames"].append(projected)
    return result
