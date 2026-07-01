"""三维 Pareto 前沿、分层（离前沿距离）、可达前沿曲面，以及均衡剪枝。

方向约定（"更优"）：智能 ↑、运行成本 ↓、速度 ↑。

A 支配 B  ⟺  intel_A ≥ intel_B 且 cost_A ≤ cost_B 且 speed_A ≥ speed_B，
            且三者至少一项严格成立。
"""
from __future__ import annotations

from datetime import datetime

import numpy as np
import pandas as pd

DIMS = ["intelligence", "cost_to_run", "eff_speed"]


def dims_for(
    cost_metric_column_name: str = "cost_to_run",
    speed_metric_column_name: str = "eff_speed",
) -> list[str]:
    """按所选成本与速度口径返回三维列名。"""
    return ["intelligence", cost_metric_column_name, speed_metric_column_name]


# ----------------------------------------------------------------------------- Pareto 分层
def _layers_for_points(intel: np.ndarray, cost: np.ndarray, speed: np.ndarray) -> np.ndarray:
    """skyline peeling：第 1 层=非支配集，剥离后重复。返回每点层号(从 1 起)。"""
    n = len(intel)
    layer = np.zeros(n, dtype=int)
    remaining = np.ones(n, dtype=bool)
    cur = 1
    while remaining.any():
        idx = np.where(remaining)[0]
        I, C, S = intel[idx], cost[idx], speed[idx]
        # dominated[k] = 是否存在 idx 中另一点支配 idx[k]
        # 向量化：对每个点 k，检查是否有 j 满足 三维不劣 且 至少一维严格优
        ge_i = I[None, :] >= I[:, None]      # j 的智能 ≥ k
        le_c = C[None, :] <= C[:, None]      # j 的成本 ≤ k
        ge_s = S[None, :] >= S[:, None]      # j 的速度 ≥ k
        strict = (I[None, :] > I[:, None]) | (C[None, :] < C[:, None]) | (S[None, :] > S[:, None])
        dominated_by = ge_i & le_c & ge_s & strict
        np.fill_diagonal(dominated_by, False)
        dominated = dominated_by.any(axis=1)
        front = idx[~dominated]
        layer[front] = cur
        remaining[front] = False
        cur += 1
    return layer


def add_pareto_layers(
    df: pd.DataFrame,
    cost_metric_column_name: str = "cost_to_run",
    speed_metric_column_name: str = "eff_speed",
) -> pd.DataFrame:
    """给三维齐全的行加 `layer` 与 `is_pareto`；缺维度的行 layer=NaN、is_pareto=False。"""
    df = df.copy()
    dims = dims_for(cost_metric_column_name, speed_metric_column_name)
    df["layer"] = np.nan
    df["is_pareto"] = False
    full = df.dropna(subset=dims)
    if full.empty:
        return df
    layers = _layers_for_points(
        full["intelligence"].to_numpy(float),
        full[cost_metric_column_name].to_numpy(float),
        full[speed_metric_column_name].to_numpy(float),
    )
    df.loc[full.index, "layer"] = layers
    df.loc[full.index, "is_pareto"] = layers == 1
    return df


# ----------------------------------------------------------------------------- 均衡剪枝
def apply_pruning(
    df: pd.DataFrame,
    since_months: int = 18,
    max_layers: int = 3,
    hard_age_cutoff_months: int = 36,
    today: datetime | None = None,
    cost_metric_column_name: str = "cost_to_run",
    speed_metric_column_name: str = "eff_speed",
) -> pd.DataFrame:
    """标注 `kept`：保留 = Pareto最优点 ∪ (近 since_months 月 ∧ 前 max_layers 层)，
    再剔除早于 hard_age_cutoff_months 的"远古"模型（即便 Pareto 最优）。
    缺三维者一律不保留。"""
    df = add_pareto_layers(
        df,
        cost_metric_column_name=cost_metric_column_name,
        speed_metric_column_name=speed_metric_column_name,
    )
    today = pd.Timestamp(today or datetime.now())
    soft_cut = today - pd.DateOffset(months=since_months)
    hard_cut = today - pd.DateOffset(months=hard_age_cutoff_months)

    has_all = df[dims_for(cost_metric_column_name, speed_metric_column_name)].notna().all(axis=1)
    rdate = df["release_date"]
    recent = rdate >= soft_cut
    near = df["layer"] <= max_layers

    kept = has_all & (df["is_pareto"] | (recent & near))
    # 远古硬截断：早于 hard_cut 或无日期且非近 期 -> 删（即使 Pareto）
    too_old = rdate < hard_cut
    kept = kept & ~too_old.fillna(False)

    df["kept"] = kept
    # 记录剔除原因，便于核查
    reason = np.where(~has_all, "缺维度",
              np.where(too_old.fillna(False), "过旧(硬截断)",
              np.where(kept, "保留",
              np.where(~recent, "过旧(软窗外且非前沿)", "离前沿太远"))))
    df["drop_reason"] = reason
    return df


# ----------------------------------------------------------------------------- 可达前沿曲面（可选副视图）
def achievable_frontier_grid(
    df: pd.DataFrame,
    nx: int = 40,
    ny: int = 40,
    cost_metric_column_name: str = "cost_to_run",
    speed_metric_column_name: str = "eff_speed",
):
    """F(成本预算 c, 速度下限 s) = max{intel | cost≤c 且 speed≥s}。

    返回 (Cgrid_log, Sgrid, Z)，C 轴取 log10(成本)。无可行点处 Z=NaN。
    用三维齐全的模型构建（不限于保留集，以反映真实可达上界）。
    """
    full = df.dropna(
        subset=dims_for(cost_metric_column_name, speed_metric_column_name)
    )
    cost = full[cost_metric_column_name].to_numpy(float)
    speed = full[speed_metric_column_name].to_numpy(float)
    intel = full["intelligence"].to_numpy(float)

    cx = np.linspace(np.log10(cost.min()), np.log10(cost.max()), nx)
    sy = np.linspace(speed.min(), speed.max(), ny)
    Z = np.full((ny, nx), np.nan)
    log_cost = np.log10(cost)
    for a, c in enumerate(cx):
        for b, s in enumerate(sy):
            mask = (log_cost <= c) & (speed >= s)
            if mask.any():
                Z[b, a] = intel[mask].max()
    Cg, Sg = np.meshgrid(cx, sy)
    return Cg, Sg, Z
