"""历史时间步、现行突出度数值和 v3 科学场景的共享引用契约。"""
from __future__ import annotations

import copy
import gzip
import hashlib
import inspect
import json
import math
import zlib
from functools import lru_cache
from pathlib import Path
from uuid import uuid4
from datetime import datetime, timezone

import numpy as np
import pandas as pd
from jsonschema import Draft202012Validator, FormatChecker

from . import fetch_data, frontier, visualize
from .frontier_3d_historical_sources import finite_number_or_none, normalized_index_version
from .frontier_3d_organization_identity_metadata_registry import organization_identity_metadata_by_creator_name
from .frontier_3d_pure_scene_geometry import empty_triangle_mesh
from .frontier_3d_versioned_model_reference_contract import (
    adapt_frontier_3d_visualization_dataset_to_v3,
    expand_frontier_3d_visualization_dataset_for_scene_consumers,
)
from .frontier_3d_visualization_dataset_builder import (
    COST_METRIC_DEFINITIONS, SPEED_METRIC_DEFINITIONS, _interaction_relationships,
    _excluded_models_with_drop_reason, _models_dataframe_with_invalid_axis_coordinates_treated_as_missing,
    validate_frontier_3d_visualization_dataset,
)

HISTORICAL_PROGRESS_SCHEMA_VERSION = "frontier_3d_historical_progress_dataset/v1"
HISTORICAL_ANALYSIS_SAMPLE_POLICIES = ("include_estimated", "measured_only")
# 历史来源未留存可核验的任务耗时，v3 帧沿用已经批准的两种速度口径。
HISTORICAL_SUPPORTED_SPEED_METRIC_DEFINITIONS = {
    name: SPEED_METRIC_DEFINITIONS[name] for name in ("effective", "raw")
}
STANDOUT_COLUMN_BY_METRIC = {
    "trend_residual": "standout_trend_residual",
    "intelligence_uplift": "standout_intelligence_uplift",
    "weighted_exclusive_hypervolume": "standout_weighted_hypervolume",
    "frontier_distance": "standout_frontier_distance",
}
SCENE_GEOMETRY_FIELD_NAMES = (
    "pareto_frontier_wireframe_line_segments", "pareto_frontier_surface_triangle_mesh",
    "achievable_frontier_surface_triangle_mesh", "exact_achievable_frontier_boundary_line_segments",
)


def _canonical_json(value):
    return json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":"), allow_nan=False)


def _calendar_date_or_none(value):
    try:
        parsed = pd.Timestamp(value)
        return parsed.date().isoformat() if pd.notna(parsed) else None
    except (ValueError, TypeError):
        return None


def _prepared_dataframe(snapshot, identity_by_uuid, first_release_date_by_group):
    rows = []
    version = snapshot["intelligence_index_version"]
    for original in snapshot["rows"]:
        row = dict(original)
        identity = identity_by_uuid[row["id"]]
        row["artificial_analysis_release_slug"] = identity.get("artificial_analysis_release_slug")
        row["artificial_analysis_reasoning_effort_slug"] = identity.get("artificial_analysis_reasoning_effort_slug")
        group = (row.get("creator_uuid") or row["creator"], row.get("artificial_analysis_release_slug") or row["id"])
        row["model_first_release_date"] = first_release_date_by_group.get(group)
        for metric in ("cost_to_run", "output_token_count"):
            # 历史入口必须显式给资格；不触发旧 CSV 缺溯源列时的兼容放行。
            value_version = normalized_index_version(row.get(f"{metric}_value_intelligence_index_version"))
            row[f"{metric}_value_is_from_current_intelligence_index_version"] = value_version == version
            row.setdefault(f"{metric}_value_source", "historical_snapshot_declared_value")
            row.setdefault(f"{metric}_value_fetched_at_utc", snapshot["observed_at_utc"])
        if row.get("output_token_count_catalog_intelligence_agrees") is False:
            row["output_token_count_value_is_from_current_intelligence_index_version"] = False
        for field in ("intelligence", "cost_to_run", "output_speed", "blended_price_cache_input_output_7_to_2_to_1", "intelligence_index_canonical_output_token_count"):
            row[field] = finite_number_or_none(row.get(field))
        token_count = row["intelligence_index_canonical_output_token_count"]
        row["output_mtokens"] = token_count / 1e6 if token_count and token_count > 0 else None
        reference = fetch_data.REFERENCE_OUTPUT_MILLION_TOKENS_FOR_EFFECTIVE_SPEED_NORMALIZATION_BY_INTELLIGENCE_INDEX_VERSION_FAMILY.get(
            fetch_data.intelligence_index_version_family(row.get("output_token_count_value_intelligence_index_version")))
        row["eff_speed"] = (row["output_speed"] * reference / row["output_mtokens"]
                            if reference and row["output_mtokens"] and row["output_speed"] is not None else None)
        rows.append(row)
    dataframe = pd.DataFrame(rows).sort_values("id", kind="stable").reset_index(drop=True)
    dataframe["release_date"] = pd.to_datetime(dataframe["release_date"], errors="coerce")
    for column in ("intelligence", "cost_to_run", "output_speed", "eff_speed", "blended_price_cache_input_output_7_to_2_to_1", "output_mtokens"):
        dataframe[column] = pd.to_numeric(dataframe[column], errors="coerce")
    return _models_dataframe_with_invalid_axis_coordinates_treated_as_missing(dataframe)


def _methodology_metadata():
    functions = (frontier.add_standout_metrics, frontier._normalized_improvement_coords,
                 frontier._trend_residuals, frontier._loo_intelligence_uplift,
                 frontier._exclusive_hypervolume_contributions, frontier._hypervolume3d,
                 frontier._origin_anchored_union_area, frontier._frontier_distances,
                 frontier._point_triangle_distance_squared)
    return {"methodology_name": "现行生产四项突出度公式",
            "methodology_implementation_sha256": hashlib.sha256("\n".join(inspect.getsource(function) for function in functions).encode()).hexdigest(),
            "analysis_population_policy": "all_comparable_models_released_by_cutoff_without_age_pruning",
            "cross_date_value_comparison_supported": False, "f1_candidate_methods_enabled": False}


def _build_frame_scientific_dataset(dataframe, snapshot, shared_metadata, axis_domains):
    version = snapshot["intelligence_index_version"]
    component_provenance = snapshot.get("source_component_provenance", {})
    provenance = {
        "artificial_analysis_api_response_fetched_at_utc": component_provenance.get("artificial_analysis_api_response_fetched_at_utc"),
        "artificial_analysis_api_response_fetched_at_utc_source": component_provenance.get("artificial_analysis_api_response_fetched_at_utc_source"),
        "current_intelligence_index_version": version,
        "current_intelligence_index_version_source": "verified_historical_source_manifest",
        "embedded_model_catalog_intelligence_index_version": component_provenance.get("embedded_model_catalog_intelligence_index_version"),
        "embedded_model_catalog_captured_at_utc": component_provenance.get("embedded_model_catalog_captured_at_utc"),
        "reference_output_million_tokens_for_effective_speed_normalization_by_intelligence_index_version_family": dict(fetch_data.REFERENCE_OUTPUT_MILLION_TOKENS_FOR_EFFECTIVE_SPEED_NORMALIZATION_BY_INTELLIGENCE_INDEX_VERSION_FAMILY),
        "artificial_analysis_website_page_fetch_paused": True,
        "recent_release_frontier_distance_grace_period_months": 0,
        "pruning_reference_date": snapshot["observed_at_utc"][:10],
        "artificial_analysis_attribution_url": "https://artificialanalysis.ai/",
    }
    variants, summaries = {}, {}
    for cost_name, cost_definition in COST_METRIC_DEFINITIONS.items():
        for speed_name, speed_definition in HISTORICAL_SUPPORTED_SPEED_METRIC_DEFINITIONS.items():
            key = f"{cost_name}__{speed_name}"
            cost, speed = cost_definition["column_name"], speed_definition["column_name"]
            eligible, reasons = frontier.analysis_eligibility_for_frontier_3d_metric_variant(dataframe, cost, speed)
            variant = frontier.add_pareto_layers(dataframe, cost, speed, analysis_eligible_mask=eligible)
            variant[frontier.ANALYSIS_ELIGIBLE_COLUMN_NAME] = eligible
            variant[frontier.ANALYSIS_INELIGIBILITY_REASON_CODES_COLUMN_NAME] = reasons
            variant["kept"] = variant[frontier.dims_for(cost, speed)].notna().all(axis=1)
            variant["drop_reason"] = "缺少该时点与口径所需的可比维度"
            variant[frontier.MISSING_DIMENSION_NAMES_COLUMN_NAME] = [
                [column for column in frontier.dims_for(cost, speed) if pd.isna(row[column])]
                for _, row in variant.iterrows()
            ]
            variant = frontier.add_standout_metrics(variant, cost, speed)
            scene, payload = visualize.build_frontier_3d_scene_and_interaction_payload(
                variant, data_date=snapshot["observed_at_utc"][:10], cost_metric_column_name=cost,
                cost_metric_label=cost_definition["label"], cost_metric_unit=cost_definition["unit"],
                speed_metric_column_name=speed, speed_metric_label=speed_definition["label"],
                speed_metric_axis_title_text=speed_definition["axis_title_text"],
                current_intelligence_index_version=version,
                reference_output_million_tokens_by_intelligence_index_version_family=provenance["reference_output_million_tokens_for_effective_speed_normalization_by_intelligence_index_version_family"],
            )
            # v3 已有精确可达面；历史包不再重复保存旧平台网格。
            scene["achievable_frontier_surface_triangle_mesh"] = empty_triangle_mesh()
            if (version, key) in axis_domains:
                for axis, bounds in zip(("x_axis", "y_axis", "z_axis"), axis_domains[(version, key)]):
                    scene["three_dimensional_axis_configuration"][axis]["fixed_range"] = list(bounds)
            for marker in scene["displayed_model_markers"]:
                identity = shared_metadata["organization_identity_metadata_by_creator_name"][marker["creator"]]
                marker.update(organization_identity_key=identity["organization_identity_key"], country_region_category=identity["country_region_category"])
            scene["current_view"].update(recent_release_frontier_distance_grace_period_months=0,
                                           pruning_reference_date=snapshot["observed_at_utc"][:10],
                                           recent_release_grace_period_only_model_count=0,
                                           kept_model_count_without_recent_release_grace_period=len(payload["models"]))
            comparable = variant[variant["kept"] & eligible]
            pareto = comparable[comparable["is_pareto"]]
            variants[key] = {
                "three_dimensional_scene": scene, "interaction_relationships": _interaction_relationships(payload),
                "kept_model_count": len(payload["models"]), "pareto_model_count": len(pareto),
                "analysis_eligible_model_count": len(comparable),
                "historical_version_value_model_count": int((variant["kept"] & ~eligible).sum()),
                "recent_release_grace_period_only_model_count": 0,
                "kept_model_count_without_recent_release_grace_period": len(payload["models"]),
                "excluded_models_with_drop_reason": _excluded_models_with_drop_reason(variant),
            }
            rankings = {}
            for metric, column in STANDOUT_COLUMN_BY_METRIC.items():
                ranked = pareto[pareto[column].notna()].sort_values([column, "id"], ascending=[False, True], kind="stable")
                rankings[metric] = [{"model_uuid": row["id"], "value": float(row[column]), "rank": rank + 1}
                                    for rank, (_, row) in enumerate(ranked.iterrows())]
            fit_population = pareto if len(pareto) >= 6 else comparable
            if len(fit_population):
                u, v = np.log10(fit_population[cost].to_numpy(float)), np.log10(fit_population[speed].to_numpy(float))
                design = np.column_stack([np.ones(len(u)), u, v, u * u, u * v, v * v])
                design_rank = int(np.linalg.matrix_rank(design))
            else:
                design_rank = 0
            fit_diagnostic = {"fit_sample_count": len(fit_population), "parameter_count": 6,
                              "design_matrix_rank": design_rank, "uses_full_comparable_sample_fallback": len(pareto) < 6}
            no_normalizer = fetch_data.intelligence_index_version_family(version) not in provenance["reference_output_million_tokens_for_effective_speed_normalization_by_intelligence_index_version_family"]
            summaries[key] = {
                "analysis_eligible_model_count": len(comparable), "pareto_model_uuids": pareto["id"].tolist(),
                "highest_comparable_intelligence": finite_number_or_none(comparable["intelligence"].max()),
                "rankings_by_metric": rankings,
                "unavailable_reason": "该指数版本缺少已核验的有效速度归一常数" if speed_name == "effective" and no_normalizer else ("该时点没有该口径的可比模型" if comparable.empty else None),
                "trend_fit_diagnostic": fit_diagnostic,
                "small_sample_warning": f"拟合样本 {len(fit_population)}，设计矩阵秩 {design_rank}/6；现行二次趋势在小样本或秩不足时可能不稳定" if len(fit_population) < 18 or design_rank < 6 else None,
                "estimated_intelligence_count": int(comparable["artificial_analysis_intelligence_index_is_estimated"].map(lambda value: isinstance(value, (bool, np.bool_)) and bool(value)).sum()),
                "unknown_estimation_status_count": int(comparable["artificial_analysis_intelligence_index_is_estimated"].isna().sum()),
            }
    expanded = {**shared_metadata, "schema_version": "frontier_3d_visualization_dataset/v2",
                "data_date": snapshot["observed_at_utc"][:10], "artificial_analysis_data_provenance": provenance,
                "metric_variants": variants}
    return adapt_frontier_3d_visualization_dataset_to_v3(expanded), summaries


def _cached_frame_scientific_dataset(dataframe, snapshot, shared, axis_domains, cache_directory, generator_sha256):
    if cache_directory is None:
        scientific, summaries = _build_frame_scientific_dataset(dataframe, snapshot, shared, axis_domains)
        return scientific, summaries, False
    from .frontier_3d_worktree_storage_paths import refuse_shared_worktree_directory_write
    cache_directory = Path(cache_directory).resolve()
    refuse_shared_worktree_directory_write(cache_directory / "historical-frame.json.gz")
    snapshot_domains = {key: value for (version, key), value in axis_domains.items() if version == snapshot["intelligence_index_version"]}
    fingerprint = hashlib.sha256(_canonical_json([generator_sha256, snapshot, snapshot_domains, dataframe.to_json(orient="split", date_format="iso")]).encode()).hexdigest()
    path = cache_directory / f"historical-frame-input-sha256-{fingerprint}.json.gz"
    if path.exists():
        try:
            cached = json.loads(gzip.decompress(path.read_bytes()))
            if cached["input_sha256"] != fingerprint or hashlib.sha256(_canonical_json(cached["payload"]).encode()).hexdigest() != cached["payload_sha256"]:
                raise ValueError("时间步缓存校验失败")
            scientific = {**shared, **cached["payload"]["scientific_dataset"]}
            validate_frontier_3d_visualization_dataset(scientific)
            return scientific, cached["payload"]["summaries"], True
        except (OSError, EOFError, zlib.error, ValueError, KeyError, TypeError):
            rejected_hash = hashlib.sha256(path.read_bytes()).hexdigest()
            path.rename(path.with_name(path.name + f".rejected-sha256-{rejected_hash}"))
    scientific, summaries = _build_frame_scientific_dataset(dataframe, snapshot, shared, axis_domains)
    payload = {"scientific_dataset": {key: scientific[key] for key in ("models", "metric_variants", "data_date", "artificial_analysis_data_provenance")}, "summaries": summaries}
    container = {"input_sha256": fingerprint, "payload_sha256": hashlib.sha256(_canonical_json(payload).encode()).hexdigest(), "payload": payload}
    cache_directory.mkdir(parents=True, exist_ok=True)
    pending = path.with_name(path.name + f".pending-{uuid4().hex}")
    try:
        pending.write_bytes(gzip.compress(_canonical_json(container).encode(), mtime=0))
        pending.replace(path)
    finally:
        pending.unlink(missing_ok=True)
    return scientific, summaries, False


def build_historical_progress_dataset(snapshots, *, frame_cache_directory=None, progress_callback=None):
    if not snapshots:
        raise ValueError("没有可验证的历史样本；请恢复清单中的来源后重试")
    snapshots = sorted(copy.deepcopy(snapshots), key=lambda snapshot: (snapshot["observed_at_utc"], snapshot["source_snapshot_id"]))
    identity_by_uuid, identity_alias_changes = {}, []
    for snapshot in snapshots:
        snapshot["intelligence_index_version"] = normalized_index_version(snapshot["intelligence_index_version"])
        for row in snapshot["rows"]:
            previous = identity_by_uuid.get(row["id"], {})
            if previous.get("artificial_analysis_release_slug") and row.get("artificial_analysis_release_slug") and previous["artificial_analysis_release_slug"] != row["artificial_analysis_release_slug"]:
                identity_alias_changes.append({"model_uuid": row["id"], "previous_release_slug": previous["artificial_analysis_release_slug"], "next_release_slug": row["artificial_analysis_release_slug"], "identity_observed_at_utc": snapshot["observed_at_utc"]})
            identity_by_uuid[row["id"]] = {**previous, **{key: value for key, value in row.items() if value is not None}}
    first_dates = {}
    for snapshot in snapshots:
        for row in snapshot["rows"]:
            identity = identity_by_uuid[row["id"]]
            group = (row.get("creator_uuid") or row["creator"], identity.get("artificial_analysis_release_slug") or row["id"])
            date = _calendar_date_or_none(row.get("release_date"))
            if date:
                first_dates[group] = min(first_dates.get(group, date), date)
    generated_at = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    organization_metadata = organization_identity_metadata_by_creator_name({row["creator"] for snapshot in snapshots for row in snapshot["rows"]})
    shared = {"schema_version": "frontier_3d_visualization_dataset/v3", "interactive_renderer": "threejs",
              "generated_at": generated_at, "graph_div_id": visualize.GRAPH_DIV_ID, "initial_variant_key": "effective__effective",
              "speed_scale": "log", "cost_metric_definitions": COST_METRIC_DEFINITIONS,
              "speed_metric_definitions": HISTORICAL_SUPPORTED_SPEED_METRIC_DEFINITIONS,
              "organization_identity_metadata_by_creator_name": organization_metadata}
    prepared = {snapshot["source_snapshot_id"]: _prepared_dataframe(snapshot, identity_by_uuid, first_dates) for snapshot in snapshots}
    axis_domains = {}
    for snapshot in snapshots:
        dataframe = prepared[snapshot["source_snapshot_id"]]
        for cost_name, cost_definition in COST_METRIC_DEFINITIONS.items():
            for speed_name, speed_definition in HISTORICAL_SUPPORTED_SPEED_METRIC_DEFINITIONS.items():
                cost, speed = cost_definition["column_name"], speed_definition["column_name"]
                complete = dataframe[dataframe[frontier.dims_for(cost, speed)].notna().all(axis=1)]
                if complete.empty:
                    continue
                ranges = visualize._fixed_axis_ranges(complete, {}, cost, speed, True)
                key = (snapshot["intelligence_index_version"], f"{cost_name}__{speed_name}")
                previous = axis_domains.get(key, ranges)
                axis_domains[key] = [[min(old[0], new[0]), max(old[1], new[1])] for old, new in zip(previous, ranges)]
    dependency_names = ("frontier_3d_historical_progress.py", "frontier_3d_historical_sources.py", "fetch_data.py", "frontier.py", "visualize.py",
                        "frontier_3d_visualization_dataset_builder.py", "frontier_3d_versioned_model_reference_contract.py",
                        "frontier_3d_pure_scene_geometry.py", "frontier_3d_exact_achievable_frontier_scene_geometry.py",
                        "frontier_3d_geometry_comparison.py", "frontier_3d_organization_identity_metadata_registry.py")
    dependency_paths = [Path(__file__).with_name(name) for name in dependency_names]
    dependency_paths += sorted(Path(__file__).with_name("frontier_3d_contract_schemas").glob("*.json"))
    generator_sha256 = hashlib.sha256(b"".join(path.name.encode() + path.read_bytes() for path in dependency_paths)).hexdigest()
    dataset = {"schema_version": HISTORICAL_PROGRESS_SCHEMA_VERSION, "generated_at": generated_at,
               "historical_generator_implementation_sha256": generator_sha256,
               "standout_methodology": _methodology_metadata(), "scientific_dataset_shared_metadata": shared,
               "models_by_uuid": {identifier: {key: row.get(key) for key in ("name", "creator", "artificial_analysis_release_slug")}
                                  for identifier, row in sorted(identity_by_uuid.items())},
               "release_identity_resolution_by_model_uuid": {identifier: "official_release_slug" if row.get("artificial_analysis_release_slug") else "unresolved_release_group" for identifier, row in identity_by_uuid.items()},
               "source_snapshots": [{key: value for key, value in snapshot.items() if key != "rows"} | {"source_model_count": len(snapshot["rows"])} for snapshot in snapshots],
               "identity_alias_changes": identity_alias_changes, "model_observations": [],
               "model_observation_value_provenance": [], "scene_geometry_definitions": [], "frames": []}
    observation_indices, geometry_indices = {}, {}
    for snapshot in snapshots:
        dataframe = prepared[snapshot["source_snapshot_id"]]
        plottable_date_rows = dataframe["intelligence"].notna() & dataframe["output_speed"].notna() & (dataframe["cost_to_run"].notna() | dataframe["blended_price_cache_input_output_7_to_2_to_1"].notna())
        observed_date = snapshot["observed_at_utc"][:10]
        observed_release_mask = dataframe["model_first_release_date"].isna() | (dataframe["model_first_release_date"] <= observed_date)
        dates = sorted(dataframe.loc[plottable_date_rows & observed_release_mask, "model_first_release_date"].dropna().unique())
        source_row_by_uuid = {row["id"]: row for row in snapshot["rows"]}
        for mode in ("release_retrospective", "observation_replay"):
            for policy in HISTORICAL_ANALYSIS_SAMPLE_POLICIES:
                for cutoff in (dates if mode == "release_retrospective" else [None]):
                    selected = dataframe[observed_release_mask]
                    if cutoff is not None:
                        selected = selected[selected["model_first_release_date"].notna() & (selected["model_first_release_date"] <= cutoff)]
                    if policy == "measured_only":
                        selected = selected[selected["artificial_analysis_intelligence_index_is_estimated"].map(lambda value: isinstance(value, (bool, np.bool_)) and not bool(value))]
                    scientific, summaries, cache_reused = _cached_frame_scientific_dataset(selected.copy(), snapshot, shared, axis_domains, frame_cache_directory, generator_sha256)
                    indices = []
                    for model in scientific.pop("models"):
                        source_row = source_row_by_uuid[model["model_uuid"]]
                        value_provenance = {"source_snapshot_id": snapshot["source_snapshot_id"], "values_by_field": {}}
                        for field, metric in (("intelligence", "intelligence"), ("cost_to_run", "cost_to_run"), ("output_speed", "output_speed"), ("blended_price_cache_input_output_7_to_2_to_1", "blended_price"), ("intelligence_index_canonical_output_token_count", "output_token_count")):
                            if source_row.get(field) is not None:
                                value_provenance["values_by_field"][field] = {
                                    "source": source_row.get(f"{metric}_value_source") or snapshot.get("source_kind", "verified_historical_snapshot"),
                                    "intelligence_index_version": source_row.get(f"{metric}_value_intelligence_index_version", snapshot["intelligence_index_version"] if metric in ("intelligence", "cost_to_run", "output_token_count") else None),
                                    "observed_at_utc": source_row.get(f"{metric}_value_fetched_at_utc") or snapshot["observed_at_utc"],
                                    "version_resolution": snapshot.get("intelligence_index_version_resolution", "declared_verified_snapshot_version") if metric in ("intelligence", "cost_to_run") else "explicit_value_version" if metric == "output_token_count" else "independent_of_intelligence_index_version",
                                }
                        encoded = _canonical_json([model, value_provenance])
                        if encoded not in observation_indices:
                            observation_indices[encoded] = len(dataset["model_observations"])
                            dataset["model_observations"].append(model)
                            dataset["model_observation_value_provenance"].append(value_provenance)
                        indices.append(observation_indices[encoded])
                    frame_scientific = {key: scientific[key] for key in ("metric_variants", "data_date", "artificial_analysis_data_provenance")}
                    for variant in frame_scientific["metric_variants"].values():
                        scene = variant["three_dimensional_scene"]
                        geometry = {field: scene.pop(field) for field in SCENE_GEOMETRY_FIELD_NAMES if field in scene}
                        geometry_key = hashlib.sha256(_canonical_json(geometry).encode()).hexdigest()
                        if geometry_key not in geometry_indices:
                            geometry_indices[geometry_key] = len(dataset["scene_geometry_definitions"])
                            dataset["scene_geometry_definitions"].append(geometry)
                        scene["historical_scene_geometry_definition_index"] = geometry_indices[geometry_key]
                    frame_id = hashlib.sha256(_canonical_json([snapshot["source_snapshot_id"], mode, policy, cutoff]).encode()).hexdigest()[:20]
                    dataset["frames"].append({"historical_frame_id": f"historical-frame-{frame_id}",
                                              "historical_view_mode": mode, "analysis_sample_policy": policy,
                                              "source_snapshot_id": snapshot["source_snapshot_id"],
                                              "intelligence_index_version": snapshot["intelligence_index_version"],
                                              "observed_at_utc": snapshot["observed_at_utc"], "release_cutoff_date": cutoff,
                                              "model_observation_indices": indices, "scientific_dataset": frame_scientific,
                                              "metric_variant_summaries": summaries})
                    if progress_callback:
                        progress_callback({"completed_frame_count": len(dataset["frames"]), "source_snapshot_id": snapshot["source_snapshot_id"], "cache_reused": cache_reused})
    available = [frame for frame in dataset["frames"] if frame["historical_view_mode"] == "release_retrospective" and frame["analysis_sample_policy"] == "include_estimated"
                 and frame["metric_variant_summaries"]["effective__effective"]["analysis_eligible_model_count"]]
    initial = max(available or dataset["frames"], key=lambda frame: (tuple(map(int, frame["intelligence_index_version"].split("."))), frame["observed_at_utc"], frame["release_cutoff_date"] or ""))
    dataset["initial_historical_frame_id"] = initial["historical_frame_id"]
    validate_historical_progress_dataset(dataset)
    return dataset


def materialize_historical_frame_dataset(dataset, historical_frame_id):
    frame = next((frame for frame in dataset["frames"] if frame["historical_frame_id"] == historical_frame_id), None)
    if frame is None:
        raise ValueError("历史时间步不存在")
    indices = frame["model_observation_indices"]
    if any(isinstance(index, bool) or not isinstance(index, int) or not 0 <= index < len(dataset["model_observations"]) for index in indices):
        raise ValueError("历史模型观测引用越界")
    scientific = copy.deepcopy({**dataset["scientific_dataset_shared_metadata"], **frame["scientific_dataset"],
                               "models": [dataset["model_observations"][index] for index in indices]})
    for variant in scientific["metric_variants"].values():
        scene = variant["three_dimensional_scene"]
        index = scene.pop("historical_scene_geometry_definition_index")
        if isinstance(index, bool) or not isinstance(index, int) or not 0 <= index < len(dataset["scene_geometry_definitions"]):
            raise ValueError("历史几何引用越界")
        scene.update(copy.deepcopy(dataset["scene_geometry_definitions"][index]))
    return scientific


def validate_historical_progress_dataset(dataset):
    errors = _historical_schema_validator().iter_errors(dataset)
    first_error = next(errors, None)
    if first_error:
        raise ValueError(f"历史报告契约无效：{first_error.message}")
    if len(dataset["model_observation_value_provenance"]) != len(dataset["model_observations"]):
        raise ValueError("历史模型观测与逐值溯源引用不一致")
    frame_ids = [frame["historical_frame_id"] for frame in dataset["frames"]]
    if len(set(frame_ids)) != len(frame_ids) or dataset["initial_historical_frame_id"] not in frame_ids:
        raise ValueError("历史时间步身份不唯一或初始引用无效")
    for frame in dataset["frames"]:
        validate_frontier_3d_visualization_dataset(materialize_historical_frame_dataset(dataset, frame["historical_frame_id"]))
    _canonical_json(dataset)


@lru_cache(maxsize=1)
def _historical_schema_validator():
    path = Path(__file__).with_name("frontier_3d_contract_schemas") / "frontier_3d_historical_progress_v1.schema.json"
    return Draft202012Validator(json.loads(path.read_text()), format_checker=FormatChecker())
