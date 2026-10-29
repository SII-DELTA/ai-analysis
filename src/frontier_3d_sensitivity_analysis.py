"""在独立假设区间内确定性判定前沿敏感性，不修改正式层号或排名。"""
from __future__ import annotations

import math
import numpy as np


def classify_frontier_sensitivity_intervals(records, *, intelligence_half_width):
    if intelligence_half_width not in (0.5, 1):
        raise ValueError("智能分扰动只支持 ±0.5 或 ±1")
    result = [{"is_pareto_robust": None, "is_near_frontier": None} for _ in records]
    indices = [index for index, record in enumerate(records)
               if record.get("eligible") is True
               and all(isinstance(record.get(field), (int, float)) and not isinstance(record[field], bool)
                       and math.isfinite(record[field]) for field in ("intelligence", "cost", "speed"))
               and record["cost"] > 0 and record["speed"] > 0]
    if not indices:
        return result
    original = np.array([[records[index]["intelligence"], -records[index]["cost"], records[index]["speed"]] for index in indices])
    half_widths = np.column_stack((np.full(len(indices), intelligence_half_width), -original[:, 1] * .1, original[:, 2] * .1))
    best, worst = original + half_widths, original - half_widths

    def is_dominated(candidate, opponents, own_index):
        dominates = np.all(opponents >= candidate, axis=1) & np.any(opponents > candidate, axis=1)
        dominates[own_index] = False
        return bool(np.any(dominates))

    for position, index in enumerate(indices):
        result[index] = {
            "is_pareto_robust": not is_dominated(worst[position], best, position),
            "is_near_frontier": is_dominated(original[position], original, position)
                                and not is_dominated(best[position], worst, position),
        }
    return result
