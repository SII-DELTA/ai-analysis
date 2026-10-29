"""F1 方法学候选的四口径 golden diff；不参与产品契约生成或前端排名。"""
from __future__ import annotations

import math
import numpy as np
from scipy.optimize import least_squares
from scipy.stats import spearmanr

from . import frontier
from .frontier_3d_visualization_dataset_builder import (
    expand_frontier_3d_visualization_dataset_for_scene_consumers,
    validate_frontier_3d_visualization_dataset,
)


def finite_number_or_none(value):
    return float(value) if value is not None and math.isfinite(float(value)) else None


def distances_to_other_models_dominated_region(improvement_points):
    """到他者向较差方向延伸的支配域并集的 L2 距离；已被支配时为零。"""
    result = []
    for index, point in enumerate(improvement_points):
        others = np.delete(improvement_points, index, axis=0)
        result.append(float(np.linalg.norm(np.maximum(point - others, 0), axis=1).min()) if len(others) else None)
    return result


def robust_frontier_trend_fit_diagnostics(intelligence, log_cost, speed_axis, is_pareto):
    """候选采用 Huber 二次趋势；样本不足或秩不足时保持未知，不换拟合集。"""
    # EXPERIMENT_NODE: Huber 二次趋势与单调趋势的取舍待 golden diff 审阅后实验。
    parameter_count = 6
    fitted_count = int(is_pareto.sum())
    result = {"fit_method": "huber_quadratic_frontier_only", "fit_sample_count": fitted_count,
              "parameter_count": parameter_count, "residuals": [None] * len(intelligence),
              "standard_deviation_units": [None] * len(intelligence),
              "leverage": [None] * len(intelligence), "high_leverage_threshold": 0.5}
    if fitted_count < 3 * parameter_count:
        return {**result, "status": "insufficient_frontier_samples"}
    predictors = np.column_stack([log_cost, speed_axis])
    center, scale = predictors[is_pareto].mean(axis=0), predictors[is_pareto].std(axis=0)
    predictors = (predictors - center) / np.where(scale > 0, scale, 1)
    u, v = predictors.T
    design = np.column_stack([np.ones(len(u)), u, v, u * u, u * v, v * v])
    fitted_design = design[is_pareto]
    rank = int(np.linalg.matrix_rank(fitted_design))
    result.update(design_rank=rank, design_condition_number=finite_number_or_none(np.linalg.cond(fitted_design)))
    if rank < parameter_count:
        return {**result, "status": "rank_deficient"}
    initial, *_ = np.linalg.lstsq(fitted_design, intelligence[is_pareto], rcond=None)
    initial_residual = intelligence[is_pareto] - fitted_design @ initial
    robust_scale = float(np.median(np.abs(initial_residual - np.median(initial_residual))) * 1.4826) or 1.0
    fit = least_squares(lambda coefficients: fitted_design @ coefficients - intelligence[is_pareto], initial, loss="huber", f_scale=robust_scale)
    if not fit.success:
        return {**result, "status": "optimizer_not_converged"}
    residuals = intelligence - design @ fit.x
    residual_sum_of_squares = float(np.square(residuals[is_pareto]).sum())
    sigma = math.sqrt(residual_sum_of_squares / (fitted_count - parameter_count))
    leverage = np.einsum("ij,ji->i", fitted_design, np.linalg.pinv(fitted_design))
    leverage_by_model = [None] * len(intelligence)
    for model_index, value in zip(np.flatnonzero(is_pareto), leverage):
        leverage_by_model[int(model_index)] = float(value)
    return {**result, "status": "fitted", "residuals": list(map(float, residuals)),
            "standard_deviation_units": [finite_number_or_none(value / sigma) if sigma else None for value in residuals],
            "residual_sum_of_squares": residual_sum_of_squares, "residual_standard_deviation": sigma,
            "leverage": leverage_by_model, "high_leverage_model_indices": [int(index) for index in np.flatnonzero(is_pareto) if leverage_by_model[index] > 0.5]}


def intelligence_uplift_excluding_same_catalog_release(models):
    """未知 release 不猜家族；缺少可证明的外部对照时输出 null。"""
    results = []
    for index, model in enumerate(models):
        release = model.get("artificial_analysis_release_slug")
        identity = (model.get("creator_uuid") or model["creator"], release)
        if not release:
            results.append({"value": None, "reason": "missing_catalog_release", "comparison_model_indices": []})
            continue
        peers = [other_index for other_index, other in enumerate(models) if other_index != index
                 and other.get("artificial_analysis_release_slug")
                 and (other.get("creator_uuid") or other["creator"], other["artificial_analysis_release_slug"]) != identity
                 and other["x"] <= model["x"] and other["y"] >= model["y"]]
        results.append({"value": model["z"] - max(models[other]["z"] for other in peers) if peers else None,
                        "reason": None if peers else "no_other_release_within_budget", "comparison_model_indices": peers})
    return results


def _finite_pair_spearman(left, right):
    pairs = [(a, b) for a, b in zip(left, right) if a is not None and b is not None and math.isfinite(a) and math.isfinite(b)]
    if len(pairs) < 3 or len({a for a, _ in pairs}) < 2 or len({b for _, b in pairs}) < 2:
        return {"coefficient": None, "pair_count": len(pairs)}
    a, b = zip(*pairs)
    return {"coefficient": finite_number_or_none(spearmanr(a, b).statistic), "pair_count": len(pairs)}


def _ranks(values, names):
    ordered = sorted((index for index, value in enumerate(values) if value is not None), key=lambda index: (-values[index], names[index]))
    return {index: rank + 1 for rank, index in enumerate(ordered)}


def build_standout_methodology_golden_comparison(dataset):
    validate_frontier_3d_visualization_dataset(dataset)
    expanded = expand_frontier_3d_visualization_dataset_for_scene_consumers(dataset)
    variants = {}
    for key, variant in expanded["metric_variants"].items():
        if key.endswith("__tasks_per_hour"):
            continue  # F1 候选仍限定批准的原四口径，任务速度未加入排名方法实验。
        models = [model for model in variant["three_dimensional_scene"]["displayed_model_markers"]
                  if model.get("analysis_eligibility", {}).get("is_analysis_eligible_for_current_metric_variant") is not False]
        if not models:
            variants[key] = {"status": "no_analysis_eligible_models", "models": []}
            continue
        cost, speed, intelligence = np.array([[model[axis] for model in models] for axis in "xyz"])
        speed_log = variant["three_dimensional_scene"]["three_dimensional_axis_configuration"]["y_axis"]["scale_type"] == "log"
        is_pareto = np.array([model["panel"].get("layer") == 1 for model in models])
        names = [model["name"] for model in models]
        normalized = np.column_stack(frontier._normalized_improvement_coords(cost, speed, intelligence, speed_log))
        distances = distances_to_other_models_dominated_region(normalized)
        trend = robust_frontier_trend_fit_diagnostics(intelligence, np.log10(cost), np.log10(speed) if speed_log else speed, is_pareto)
        uplift = intelligence_uplift_excluding_same_catalog_release(models)
        baseline = {metric: [finite_number_or_none(model["standout_metrics"].get(metric)) for model in models] for metric in ("frontier_distance", "trend_residual", "intelligence_uplift", "weighted_exclusive_hypervolume")}
        candidates = {"frontier_distance": distances, "trend_residual": trend["residuals"], "intelligence_uplift": [row["value"] for row in uplift]}
        ranks = {metric: (_ranks([value if is_pareto[index] else None for index, value in enumerate(baseline[metric])], names),
                          _ranks([value if is_pareto[index] else None for index, value in enumerate(values)], names)) for metric, values in candidates.items()}
        sensitivity = []
        # EXPERIMENT_NODE: 按四口径参考点敏感性结果选择固定语义参照，当前产品继续原算法。
        for pad in (0.01, 0.05, 0.1, 0.2):
            coordinates = np.column_stack(frontier._normalized_improvement_coords(cost, speed, intelligence, speed_log, pad=pad))
            values = frontier._exclusive_hypervolume_contributions(coordinates[is_pareto]) if is_pareto.any() else []
            indices = np.flatnonzero(is_pareto)
            ranked = sorted(zip(indices, values), key=lambda pair: (-pair[1], names[pair[0]]))
            raw_axes = [np.log10(cost), np.log10(speed) if speed_log else speed, intelligence]
            reference = []
            for axis_index, values_in_axis in enumerate(raw_axes):
                lower, upper = float(values_in_axis.min()), float(values_in_axis.max())
                margin = (upper - lower) * pad if upper > lower else (abs(upper) * pad or 1)
                value = upper + margin if axis_index == 0 else lower - margin
                reference.append(10 ** value if axis_index == 0 or axis_index == 1 and speed_log else value)
            sensitivity.append({"normalization_pad": pad, "raw_reference_point_cost_speed_intelligence": reference,
                                "top_three": [names[index] for index, _ in ranked[:3]],
                                "contributions": [{"model_uuid": models[index].get("model_uuid"), "name": names[index], "value": float(value)} for index, value in ranked]})
        rows = []
        for index in np.flatnonzero(is_pareto):
            rows.append({"model_uuid": models[index].get("model_uuid"), "name": names[index], "catalog_release": models[index].get("artificial_analysis_release_slug"),
                         "baseline": {metric: values[index] for metric, values in baseline.items()},
                         "candidate": {metric: values[index] for metric, values in candidates.items()},
                         "rank_diff": {metric: {"baseline": old.get(index), "candidate": new.get(index)} for metric, (old, new) in ranks.items()},
                         "trend_leverage": trend["leverage"][index], "trend_high_leverage": trend["leverage"][index] is not None and trend["leverage"][index] > 0.5,
                         "uplift_comparison": uplift[index]})
        pareto_indices = np.flatnonzero(is_pareto)
        variants[key] = {"status": "review_required", "models": rows, "trend_fit": trend,
                         "analysis_model_catalog_in_model_index_order": [
                             {"model_uuid": model.get("model_uuid"), "name": model["name"], "creator": model["creator"],
                              "catalog_release": model.get("artificial_analysis_release_slug"),
                              "cost": model["x"], "speed": model["y"], "intelligence": model["z"]} for model in models],
                         "axis_metric_definitions": {field: variant["interaction_relationships"].get(field) for field in ("cost_axis_field", "cost_axis_label", "cost_axis_unit", "speed_axis_field", "speed_axis_label")},
                         "frontier_distance_hypervolume_spearman": {
                             "baseline": _finite_pair_spearman([baseline["frontier_distance"][i] for i in pareto_indices], [baseline["weighted_exclusive_hypervolume"][i] for i in pareto_indices]),
                             "candidate": _finite_pair_spearman([distances[i] for i in pareto_indices], [baseline["weighted_exclusive_hypervolume"][i] for i in pareto_indices])},
                         "hypervolume_reference_point_sensitivity": sensitivity}
    return {"schema_version": "frontier_3d_standout_methodology_golden_comparison/v1", "status": "user_review_required_before_ranking_changes",
            "data_date": dataset.get("data_date"), "production_rankings_changed": False,
            "intelligence_index_version": (dataset.get("artificial_analysis_data_provenance") or {}).get("current_intelligence_index_version"),
            "candidate_trend_choice": "Huber 二次稳健趋势；仅前沿拟合，n<3p 或秩不足时保留未知",
            "reference_point_decision": "本轮只量化当前动态归一参考点的敏感性；固定语义参考点须另行选择",
            "metric_variants": variants}
