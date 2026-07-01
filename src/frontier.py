"""三维 Pareto 前沿、分层（离前沿距离）、可达前沿曲面，以及均衡剪枝。

方向约定（"更优"）：智能 ↑、运行成本 ↓、速度 ↑。

A 支配 B  ⟺  intel_A ≥ intel_B 且 cost_A ≤ cost_B 且 speed_A ≥ speed_B，
            且三者至少一项严格成立。
"""
from __future__ import annotations

from datetime import datetime

import numpy as np
import pandas as pd
from scipy.spatial import Delaunay

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


# ----------------------------------------------------------------------------- 突出度指标
# 「一个 SOTA(Pareto 最优)模型比其余 Pareto 最优构成的**趋势**领先多少」的连续标量。
# 同时给出四个互补口径（详见 README「突出度指标」节）：
#   趋势残差(trend_residual)   —— 沿智能轴，相对前沿趋势面的领先量（默认头牌，最贴题意）。
#   智能抬升(intelligence_uplift) —— 留一：在本模型预算内，其余模型能达到的最高智能与本模型之差。
#   加权超体积(weighted_hypervolume) —— 归一空间的排他超体积贡献，唯一吃 3 个可调轴权重、可实时重排。
#   到前沿垂距(frontier_distance) —— 移除本点后，本点到其余前沿三角网的最短欧氏距离（轴对称）。


def _normalized_improvement_coords(
    cost: np.ndarray,
    speed: np.ndarray,
    intel: np.ndarray,
    speed_log: bool,
    pad: float = 0.05,
) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """把三维映射到归一改进坐标 (g_cost, g_speed, g_intel)∈(0,1)，**越大越好**。

    成本取 log10 后「越便宜越大」，速度按 speed_log 决定是否取 log10「越快越大」，
    智能线性「越高越大」。每轴用 kept 集自身 min/max + pad 留白归一，使所有点严格落在
    (0,1) 内 → 参考点原点 (0,0,0) 恒被所有点支配（供超体积用最差角作参考）。

    ponytail: 用 kept 集实际 min/max（而非可视固定轴范围）——自足、无需回传轴范围，
    且数据铺满 (pad,1-pad) 使超体积数值分辨率更高；两者都是合法单调归一，不改指标语义。
    """

    def norm_axis(vals: np.ndarray, bigger_is_better: bool) -> np.ndarray:
        lo, hi = float(np.min(vals)), float(np.max(vals))
        span = hi - lo
        margin = span * pad if span > 0 else (abs(hi) * pad or 1.0)
        lo_padded, hi_padded = lo - margin, hi + margin
        g = (vals - lo_padded) / (hi_padded - lo_padded)
        return g if bigger_is_better else (1.0 - g)

    log_cost = np.log10(cost)
    speed_axis = np.log10(speed) if speed_log else speed
    g_cost = norm_axis(log_cost, bigger_is_better=False)     # 越便宜 → g 越大
    g_speed = norm_axis(speed_axis, bigger_is_better=True)
    g_intel = norm_axis(intel, bigger_is_better=True)
    return g_cost, g_speed, g_intel


def _origin_anchored_union_area(rects: np.ndarray) -> float:
    """锚定原点的矩形并面积：∪ [0,x]×[0,y]。= (x,y) 非支配点织的阶梯面积。"""
    if len(rects) == 0:
        return 0.0
    # x 降序、同 x 时 y 降序：扫描时用 max_y 记录「x 更大者的最高 y」，新点高出部分才计入
    order = np.lexsort((-rects[:, 1], -rects[:, 0]))
    area = 0.0
    max_y = 0.0
    for idx in order:
        x, y = rects[idx, 0], rects[idx, 1]
        if y > max_y:
            area += x * (y - max_y)
            max_y = y
    return area


def _hypervolume3d(points: np.ndarray) -> float:
    """3D 超体积（参考点=原点，最大化）：∪ [0,x]×[0,y]×[0,z] 的体积。

    沿 z 降序切片：每层横截面 = 「z≥当前」点集在 (x,y) 上锚定原点的并面积（阶梯），
    面积×Δz 累积。N≤~60，直接实现足够快。
    """
    if len(points) == 0:
        return 0.0
    p = points[np.argsort(-points[:, 2])]      # z 降序
    volume = 0.0
    prev_z = None
    rects: list[tuple[float, float]] = []
    for k in range(len(p)):
        z = p[k, 2]
        if prev_z is not None:
            volume += _origin_anchored_union_area(np.array(rects)) * (prev_z - z)
        rects.append((p[k, 0], p[k, 1]))
        prev_z = z
    volume += _origin_anchored_union_area(np.array(rects)) * prev_z
    return volume


def _exclusive_hypervolume_contributions(
    g_points: np.ndarray,
    weights: tuple[float, float, float] = (1.0, 1.0, 1.0),
) -> np.ndarray:
    """排他超体积贡献：contribution(M) = HV(全体) − HV(全体 \\ {M})。

    g_points 列序 = (g_cost, g_speed, g_intel)；weights 同序（成本/速度/智能）。
    权重经**指数**进坐标 ḡ = g^w（单调保序 → 前沿成员不变，只改各点贡献量级），
    因纯超体积对**线性**轴权重不变（缩放全体积同一常数、排名不动），故必须用指数才能重排。
    输入应为互不支配的前沿点（其余点排他贡献为 0，无需传入）。
    """
    w_cost, w_speed, w_intel = weights
    pts = np.column_stack([
        g_points[:, 0] ** w_cost,
        g_points[:, 1] ** w_speed,
        g_points[:, 2] ** w_intel,
    ])
    full = _hypervolume3d(pts)
    out = np.empty(len(pts))
    for k in range(len(pts)):
        out[k] = full - _hypervolume3d(np.delete(pts, k, axis=0))
    return out


def _loo_intelligence_uplift(
    intel: np.ndarray, cost: np.ndarray, speed: np.ndarray
) -> np.ndarray:
    """留一·智能抬升：uplift(M) = intel(M) − max{intel(j): j≠M, cost_j≤cost_M, speed_j≥speed_M}。

    = 「本模型比其余在其预算(成本上限∧速度下限)内能达到的最高智能」领先多少。
    前沿点 ≥0（无人在其预算内更聪明）；预算内无他者时 NaN（如最便宜且最快的极端点）。
    """
    le_cost = cost[None, :] <= cost[:, None]    # j 成本 ≤ k
    ge_speed = speed[None, :] >= speed[:, None]  # j 速度 ≥ k
    within_budget = le_cost & ge_speed
    np.fill_diagonal(within_budget, False)
    intel_within = np.where(within_budget, intel[None, :], -np.inf)
    best_other = intel_within.max(axis=1)
    return np.where(np.isfinite(best_other), intel - best_other, np.nan)


def _trend_residuals(
    intel: np.ndarray, u: np.ndarray, v: np.ndarray, is_pareto: np.ndarray
) -> tuple[np.ndarray, np.ndarray]:
    """趋势残差：在前沿点上二次多项式最小二乘拟合 Î=trend(log成本 u, 速度轴 v)，
    返回每点 (intel − 拟合面) 及其按前沿残差 σ 标准化后的值。

    前沿点 <6 无法稳健定二次面时，回退到在全 kept 上拟合。
    """
    def design(uu, vv):
        return np.column_stack([np.ones_like(uu), uu, vv, uu * uu, uu * vv, vv * vv])

    fit_mask = is_pareto if int(is_pareto.sum()) >= 6 else np.ones(len(intel), bool)
    coef, *_ = np.linalg.lstsq(design(u[fit_mask], v[fit_mask]), intel[fit_mask], rcond=None)
    residual = intel - design(u, v) @ coef
    sigma = float(np.std(residual[fit_mask])) or 1.0
    return residual, residual / sigma


def _point_triangle_distance_squared(p, a, b, c) -> float:
    """点 p 到三角形 abc 的最短距离平方（Ericson 最近点法，自动 clamp 到边/顶点）。"""
    ab, ac, ap = b - a, c - a, p - a
    d1, d2 = ab @ ap, ac @ ap
    if d1 <= 0 and d2 <= 0:
        return float(ap @ ap)
    bp = p - b
    d3, d4 = ab @ bp, ac @ bp
    if d3 >= 0 and d4 <= d3:
        return float(bp @ bp)
    vc = d1 * d4 - d3 * d2
    if vc <= 0 and d1 >= 0 and d3 <= 0:
        t = d1 / (d1 - d3)
        q = a + t * ab
        return float((p - q) @ (p - q))
    cp = p - c
    d5, d6 = ab @ cp, ac @ cp
    if d6 >= 0 and d5 <= d6:
        return float(cp @ cp)
    vb = d5 * d2 - d1 * d6
    if vb <= 0 and d2 >= 0 and d6 <= 0:
        t = d2 / (d2 - d6)
        q = a + t * ac
        return float((p - q) @ (p - q))
    va = d3 * d6 - d5 * d4
    if va <= 0 and (d4 - d3) >= 0 and (d5 - d6) >= 0:
        t = (d4 - d3) / ((d4 - d3) + (d5 - d6))
        q = b + t * (c - b)
        return float((p - q) @ (p - q))
    denom = 1.0 / (va + vb + vc)
    q = a + ab * (vb * denom) + ac * (vc * denom)
    return float((p - q) @ (p - q))


def _frontier_distances(
    g_cost: np.ndarray,
    g_speed: np.ndarray,
    g_intel: np.ndarray,
    is_pareto: np.ndarray,
) -> np.ndarray:
    """到留一前沿的垂距：对每个前沿点 M，移除 M 后取其余前沿点在归一 (g_cost,g_speed)
    平面做 Delaunay、抬升 g_intel，求 M 到该三角网的**最短欧氏距离**（轴对称）。非前沿点 0。

    ponytail: 用精确「点到三角形 3D 距离」在所有三角面取 min——落在投影凸包外的极端前沿点
    会自动 clamp 到最近边/顶点，无需单独的「最近顶点」兜底；只有其余前沿点 <3（无法三角化）
    时退回最近邻距离。
    """
    n = len(g_intel)
    out = np.zeros(n)
    frontier_idx = np.where(is_pareto)[0]
    coords = np.column_stack([g_cost, g_speed, g_intel])
    for m in frontier_idx:
        others = [j for j in frontier_idx if j != m]
        if not others:
            continue
        p = coords[m]
        if len(others) < 3:
            out[m] = float(np.linalg.norm(coords[others] - p, axis=1).min())
            continue
        projection = np.column_stack([g_cost[others], g_speed[others]])
        try:
            tri = Delaunay(projection)
        except Exception:
            out[m] = float(np.linalg.norm(coords[others] - p, axis=1).min())
            continue
        best_sq = np.inf
        for simplex in tri.simplices:
            a, b, c = (coords[others[simplex[0]]],
                       coords[others[simplex[1]]],
                       coords[others[simplex[2]]])
            best_sq = min(best_sq, _point_triangle_distance_squared(p, a, b, c))
        out[m] = float(np.sqrt(best_sq))
    return out


STANDOUT_COLUMNS = [
    "standout_trend_residual",
    "standout_trend_residual_sigma",
    "standout_intelligence_uplift",
    "standout_weighted_hypervolume",
    "standout_frontier_distance",
    "g_cost",
    "g_speed",
    "g_intel",
]


def add_standout_metrics(
    df: pd.DataFrame,
    cost_metric_column_name: str = "cost_to_run",
    speed_metric_column_name: str = "eff_speed",
    speed_log: bool = True,
) -> pd.DataFrame:
    """给 kept 行加四个突出度指标列 + 归一坐标 g_cost/g_speed/g_intel。

    在 `apply_pruning` 之后调用（需要 kept / is_pareto）。四指标一律在**当前变体的 kept 集**
    （= 屏幕上显示的模型）上计算，前沿以全局 is_pareto ∩ kept 界定，与可视前沿一致。
    加权超体积仅算 w=1 的静态值（供 hover/列）；前端滑杆改权重时在 JS 端用同一算法实时重算。
    """
    df = df.copy()
    for column in STANDOUT_COLUMNS:
        df[column] = np.nan
    kept = df[df["kept"]]
    if kept.empty:
        return df
    idx = kept.index
    intel = kept["intelligence"].to_numpy(float)
    cost = kept[cost_metric_column_name].to_numpy(float)
    speed = kept[speed_metric_column_name].to_numpy(float)
    is_pareto = kept["is_pareto"].to_numpy(bool)

    g_cost, g_speed, g_intel = _normalized_improvement_coords(
        cost, speed, intel, speed_log
    )
    u = np.log10(cost)
    v = np.log10(speed) if speed_log else speed
    residual, residual_sigma = _trend_residuals(intel, u, v, is_pareto)
    uplift = _loo_intelligence_uplift(intel, cost, speed)
    weighted_hypervolume = np.zeros(len(kept))
    if is_pareto.any():
        weighted_hypervolume[is_pareto] = _exclusive_hypervolume_contributions(
            np.column_stack([g_cost, g_speed, g_intel])[is_pareto], (1.0, 1.0, 1.0)
        )
    frontier_distance = _frontier_distances(g_cost, g_speed, g_intel, is_pareto)

    df.loc[idx, "standout_trend_residual"] = residual
    df.loc[idx, "standout_trend_residual_sigma"] = residual_sigma
    df.loc[idx, "standout_intelligence_uplift"] = uplift
    df.loc[idx, "standout_weighted_hypervolume"] = weighted_hypervolume
    df.loc[idx, "standout_frontier_distance"] = frontier_distance
    df.loc[idx, "g_cost"] = g_cost
    df.loc[idx, "g_speed"] = g_speed
    df.loc[idx, "g_intel"] = g_intel
    return df
