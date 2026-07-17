"""Plotly 三维可视化：智能 × 可切换速度 × 可切换成本 + Pareto 前沿流形。

- Scatter3d：保留的模型，按厂商着色；Pareto 最优点用黑色空心圈叠加强调。
- 前沿流形：Pareto 最优点在 (log成本, 速度) 平面做 Delaunay 三角化、抬升 z=智能，
  织成"在每个成本/速度处由最智能模型编织的曲面"。**默认画线框**（Scatter3d 线，不挡下方
  节点悬浮）；可切半透明实心 Mesh3d（观感更好，但触发 Plotly 痼疾——盖住其下方节点 hover）。
- 可选 Surface：可达前沿 F(成本预算,速度下限)=max 智能（阶梯面，按钮/图例可开）。

坐标：x=有效运行成本或 7:2:1 混合单价（对数）、y=有效速度或原始速度（可对数）、
z=智能指数。每种组合分别计算 Pareto、剪枝、前沿与轴范围。
"""
from __future__ import annotations

import re
from pathlib import Path

import numpy as np
import pandas as pd
import plotly.graph_objects as go
from plotly.colors import qualitative
from scipy.spatial import Delaunay

PALETTE = qualitative.Dark24 + qualitative.Light24

# ── 模型名解析：基模型分组 + 谱系（creator+tier）分组 ────────────────────────
# Artificial Analysis 把同一基模型的每个 reasoning 档位作为独立条目返回（名字带
# 末尾括号后缀，如 "(low)"/"(Reasoning, Max Effort)"）。下列关键词用于把这些「纯档位
# 后缀」从模型名末尾剥离，得到「基模型名」——保留 "(Preview)"/"(May 2026)"/"(32B)"
# 这类区分不同代/规格的后缀。
REASONING_SUFFIX_KEYWORDS = {
    "reasoning", "non-reasoning", "non reasoning", "adaptive reasoning",
    "thinking", "high", "medium", "low", "minimal", "xhigh",
    "high effort", "low effort", "max effort", "medium effort",
}
REASONING_LEVEL_SORT_ORDER_BY_NORMALIZED_LABEL = {
    "non-reasoning": 0,
    "minimal": 10,
    "low": 20,
    "medium": 30,
    "high": 40,
    "xhigh": 50,
    "max effort": 60,
}

# tier（产品档位）按优先序匹配：长词/更具体的在前，避免 "flash-lite" 被 "flash"/"lite"
# 抢先命中。未命中任何关键词的归 "(default)"（如 OpenAI o 系、gpt-oss、Grok 主线）。
TIER_KEYWORDS_BY_PRIORITY = [
    "flash-lite", "flash lite", "flash", "mini", "nano", "lite",
    "pro", "opus", "sonnet", "haiku", "deep think", "codex", "instant",
    "max", "plus", "ultra",
]
TIER_DEFAULT = "(default)"

# 误判兜底：把 name 子串 → (强制 base_model_name, 强制 tier)。初版留空；当发现某些模型
# 落错谱系（如想把 o 系/gpt-oss 从 OpenAI "(default)" 主线拆出）时在此手填。
LINEAGE_TIER_OVERRIDES: dict[str, tuple[str, str]] = {}

_TRAILING_PAREN_RE = re.compile(r"\s*\(([^()]*)\)\s*$")


def _parse_base_model_name(name: str) -> str:
    """反复剥离模型名末尾的纯 reasoning 档位括号组，得到基模型名。

    当且仅当某末尾括号内**所有逗号分段**都是 reasoning 关键词时才剥离，
    例如 "Claude Opus 4.8 (Adaptive Reasoning, Max Effort)" → "Claude Opus 4.8"；
    而 "GPT-5.5 Instant (May 2026)"、"Gemini 3.1 Pro Preview" 原样保留。
    """
    s = (name or "").strip()
    while True:
        m = _TRAILING_PAREN_RE.search(s)
        if not m:
            break
        segments = [seg.strip().lower() for seg in m.group(1).split(",")]
        if segments and all(seg in REASONING_SUFFIX_KEYWORDS for seg in segments):
            s = s[: m.start()].strip()
        else:
            break
    return s


def _reasoning_level_label_and_sort_order(name: str) -> tuple[str, int]:
    """返回用于同基模型 reasoning 档位连线的稳定标签与排序。

    未带纯 reasoning 后缀的模型视为 non-reasoning；未知后缀保留可读名称，
    排在已知档位之后并按名称稳定排序。
    """
    s = (name or "").strip()
    suffix_segments: list[str] = []
    while True:
        m = _TRAILING_PAREN_RE.search(s)
        if not m:
            break
        segments = [seg.strip().lower() for seg in m.group(1).split(",")]
        if segments and all(seg in REASONING_SUFFIX_KEYWORDS for seg in segments):
            suffix_segments = segments + suffix_segments
            s = s[: m.start()].strip()
        else:
            break
    if not suffix_segments:
        return "non-reasoning", REASONING_LEVEL_SORT_ORDER_BY_NORMALIZED_LABEL["non-reasoning"]

    normalized = " ".join(suffix_segments).replace("non reasoning", "non-reasoning")
    if "max effort" in normalized:
        label = "max effort"
    elif "xhigh" in normalized:
        label = "xhigh"
    elif "high" in normalized:
        label = "high"
    elif "medium" in normalized:
        label = "medium"
    elif "low" in normalized:
        label = "low"
    elif "minimal" in normalized:
        label = "minimal"
    elif "non-reasoning" in normalized:
        label = "non-reasoning"
    else:
        label = " / ".join(suffix_segments)
    sort_order = REASONING_LEVEL_SORT_ORDER_BY_NORMALIZED_LABEL.get(
        label,
        1000 + sum(ord(ch) for ch in label.lower()),
    )
    return label, sort_order


def _classify_tier(base_model_name: str) -> str:
    """按优先序在基模型名上做「非字母包裹」匹配，返回产品档位 tier。"""
    low = base_model_name.lower()
    for kw in TIER_KEYWORDS_BY_PRIORITY:
        if re.search(r"(?<![a-z])" + re.escape(kw) + r"(?![a-z])", low):
            return kw
    return TIER_DEFAULT


def _resolve_lineage(name: str) -> tuple[str, str]:
    """返回 (base_model_name, tier)，先查人工 override，再走解析规则。"""
    for needle, (base, tier) in LINEAGE_TIER_OVERRIDES.items():
        if needle in name:
            return base, tier
    base = _parse_base_model_name(name)
    return base, _classify_tier(base)


def _build_lineage_payload(
    df_full: pd.DataFrame,
    cost_metric_column_name: str,
    cost_metric_label: str,
    cost_metric_unit: str,
    speed_metric_column_name: str,
    speed_metric_label: str,
) -> dict:
    """构造注入前端 JS 的数据。

    - models[]（仅 kept，可见节点）：每模型 {name, base_model_name, creator, tier,
      lineage_key, x, y, z, panel}；用于搜索 / pin / 高亮 / 侧栏详情。
    - base_groups{base_model_name: [models 下标...]}：pin 时整组固定其全部档位。
    - lineages{"creator||tier": [按发布日升序的「每代取最高智能点」节点...]}：**基于全量
      三维齐全的数据（不限 kept）**，使被剪枝的历代前身仍能连成谱系（用户示例 Gemini
      2.5 Pro → 3 Pro → 3.1 Pro 多数前身已被剪枝，故谱系必须越过 kept 取自全量）。
      每个谱系节点自带坐标与标签（含 kept 标记），仅在 hover/pin 时随谱系线显示。
      仅保留 >=2 代的谱系（单代无连线）。
    """
    # —— models / base_groups：仅 kept ——
    def _field_or_none(r, name):
        # 突出度/归一坐标由 add_standout_metrics 写入；缺列或 NaN → None(→ JS null)。
        return float(r[name]) if name in r.index and pd.notna(r[name]) else None

    kept = df_full[df_full["kept"]].reset_index(drop=True)
    models: list[dict] = []
    for _, r in kept.iterrows():
        name = str(r["name"])
        base, tier = _resolve_lineage(name)
        reasoning_level_label, reasoning_level_sort_order = (
            _reasoning_level_label_and_sort_order(name)
        )
        creator = str(r["creator"]) if pd.notna(r["creator"]) else "?"
        rd = r["release_date"]
        models.append({
            "name": name,
            "base_model_name": base,
            "reasoning_level_label": reasoning_level_label,
            "reasoning_level_sort_order": reasoning_level_sort_order,
            "creator": creator,
            "tier": tier,
            "lineage_key": f"{creator}||{tier}",
            "x": float(r[cost_metric_column_name]),
            "y": float(r[speed_metric_column_name]),
            "z": float(r["intelligence"]),
            "panel": {
                "release_date": rd.strftime("%Y-%m-%d") if pd.notna(rd) else "?",
                "intelligence": float(r["intelligence"]),
                "output_speed": float(r["output_speed"]),
                "eff_speed": float(r["eff_speed"]),
                "cost_to_run": float(r["cost_to_run"]),
                "blended_price_cache_input_output_7_to_2_to_1": float(
                    r["blended_price_cache_input_output_7_to_2_to_1"]
                ),
                "layer": float(r["layer"]),
            },
            # 四个突出度值（加权超体积为 w=1 静态值；JS 端按滑杆权重实时重算）
            "standout": {
                "trend_residual": _field_or_none(r, "standout_trend_residual"),
                "trend_residual_sigma": _field_or_none(r, "standout_trend_residual_sigma"),
                "intelligence_uplift": _field_or_none(r, "standout_intelligence_uplift"),
                "weighted_hypervolume": _field_or_none(r, "standout_weighted_hypervolume"),
                "frontier_distance": _field_or_none(r, "standout_frontier_distance"),
            },
            # 归一改进坐标（JS 实时重算加权超体积只需 g + 权重，无需回传轴范围）
            "g": {
                "c": _field_or_none(r, "g_cost"),
                "s": _field_or_none(r, "g_speed"),
                "i": _field_or_none(r, "g_intel"),
            },
        })

    base_groups: dict[str, list[int]] = {}
    for i, m in enumerate(models):
        base_groups.setdefault(m["base_model_name"], []).append(i)
    reasoning_variant_groups: dict[str, list[int]] = {
        base: sorted(
            indices,
            key=lambda i: (
                models[i]["reasoning_level_sort_order"],
                models[i]["reasoning_level_label"].lower(),
                models[i]["name"].lower(),
            ),
        )
        for base, indices in base_groups.items()
        if len(indices) >= 2
    }

    # —— lineages：全量三维齐全行（含被剪枝的历代前身）——
    kept_names = set(kept["name"].astype(str))
    dims = [cost_metric_column_name, speed_metric_column_name, "intelligence"]
    complete = df_full[df_full[dims].notna().all(axis=1)].copy()
    # 每个 creator||tier 内按基模型分代，每代取最高智能点为代表
    per_key_generations: dict[str, dict[str, dict]] = {}
    for _, r in complete.iterrows():
        name = str(r["name"])
        base, tier = _resolve_lineage(name)
        creator = str(r["creator"]) if pd.notna(r["creator"]) else "?"
        key = f"{creator}||{tier}"
        z = float(r["intelligence"])
        gens = per_key_generations.setdefault(key, {})
        cur = gens.get(base)
        if cur is None or z > cur["z"]:
            rd = r["release_date"]
            gens[base] = {
                "name": name,
                "base_model_name": base,
                "label": base,
                "release_date": rd.strftime("%Y-%m-%d") if pd.notna(rd) else "?",
                "x": float(r[cost_metric_column_name]),
                "y": float(r[speed_metric_column_name]),
                "z": z,
                "intelligence": z,
                "kept": name in kept_names,
            }
    lineages: dict[str, list[dict]] = {}
    for key, gens in per_key_generations.items():
        # release_date 为 "%Y-%m-%d" 字符串或 "?"（缺失）。直接按字符串排序会让
        # "?"(0x3F > 数字字符) 排到末端、被当作「最新」一代，使谱系顺序反序。
        # 用 (是否有日期, 日期) 作为键：缺失者(False)下沉到最前（视为最早/未知），
        # 有日期者(True)之间仍按时间升序，相对顺序不变。
        nodes = sorted(
            gens.values(),
            key=lambda n: (n["release_date"] != "?", n["release_date"]),
        )
        if len(nodes) >= 2:
            lineages[key] = nodes

    return {
        "models": models,
        "base_groups": base_groups,
        "reasoning_variant_group_model_indices_by_base_model_name": reasoning_variant_groups,
        "lineages": lineages,
        "cost_axis_field": cost_metric_column_name,
        "cost_axis_label": cost_metric_label,
        "cost_axis_unit": cost_metric_unit,
        "speed_axis_field": speed_metric_column_name,
        "speed_axis_label": speed_metric_label,
    }

def _fixed_axis_ranges(
    kept: pd.DataFrame,
    payload: dict,
    cost_metric_column_name: str,
    speed_metric_column_name: str,
    speed_log: bool,
) -> tuple[list, list, list]:
    """计算固定坐标轴范围 (x_cost, y_speed, z_intelligence)。

    范围 = (kept 散点 ∪ payload 全部谱系节点) 的并集 + 留白。谱系节点取自全量三维齐全
    数据（含被剪枝的历代前身），其成本/速度可能超出 kept 散点范围；把范围固定到二者并集，
    使 hover 画谱系时坐标轴不再 autorange 扩张 → 消除「谱系扩范围→点位移→hover/unhover
    抖动」。对数轴的 range 须以 log10 为单位。
    """
    costs = [float(v) for v in kept[cost_metric_column_name] if pd.notna(v)]
    speeds = [float(v) for v in kept[speed_metric_column_name] if pd.notna(v)]
    intels = [float(v) for v in kept["intelligence"] if pd.notna(v)]
    for nodes in payload["lineages"].values():
        for n in nodes:
            costs.append(n["x"]); speeds.append(n["y"]); intels.append(n["z"])

    def log_range(vals, pad=0.04):
        lo, hi = min(vals), max(vals)
        l0, l1 = np.log10(lo), np.log10(hi)
        m = (l1 - l0) * pad or 0.1
        return [l0 - m, l1 + m]

    def lin_range(vals, pad=0.05):
        lo, hi = min(vals), max(vals)
        m = (hi - lo) * pad or 1.0
        return [lo - m, hi + m]

    x_range = log_range(costs)                                  # 成本恒对数
    y_range = log_range(speeds) if speed_log else lin_range(speeds)
    z_range = lin_range(intels)
    return x_range, y_range, z_range


HOVER_TMPL = (
    "<b>%{customdata[0]}</b><br>"
    "厂商: %{customdata[1]} · 发布: %{customdata[2]}<br>"
    "智能指数: %{customdata[3]:.1f}<br>"
    "原始速度: %{customdata[4]:.0f} tok/s · 冗长度: %{customdata[8]:.1f}M 输出tok<br>"
    "有效速度: %{customdata[9]:.0f} tok/s（按中位冗长归一）<br>"
    "有效运行成本(跑完评测实花): $%{customdata[5]:.2f}<br>"
    "7:2:1 混合单价: $%{customdata[6]:.2f}/M · Pareto层: %{customdata[7]:.0f}<br>"
    "突出度｜趋势残差 %{customdata[10]:.1f} · 智能抬升 %{customdata[11]:.1f}"
    " · 加权超体积 %{customdata[12]:.3f} · 到前沿垂距 %{customdata[13]:.3f}"
    "<extra></extra>"
)


def _creator_colors(creators) -> dict:
    uniq = sorted({c for c in creators if isinstance(c, str)})
    return {c: PALETTE[i % len(PALETTE)] for i, c in enumerate(uniq)}


def _customdata(df: pd.DataFrame) -> np.ndarray:
    """构造保留原始类型(字符串/浮点)的 customdata，避免被 numpy 统一成字符串。"""

    def col_or_nan(name: str) -> list:
        # 突出度列由 add_standout_metrics 写入；某些调用路径可能未算，缺列则填 NaN。
        return (df[name].astype(float).tolist()
                if name in df.columns else [float("nan")] * len(df))

    cols = [
        df["name"].fillna("?").tolist(),
        df["creator"].fillna("?").tolist(),
        df["release_date"].dt.strftime("%Y-%m-%d").fillna("?").tolist(),
        df["intelligence"].astype(float).tolist(),
        df["output_speed"].astype(float).tolist(),
        df["cost_to_run"].astype(float).tolist(),
        df["blended_price_cache_input_output_7_to_2_to_1"].astype(float).tolist(),
        df["layer"].astype(float).tolist(),
        df["output_mtokens"].astype(float).tolist(),
        df["eff_speed"].astype(float).tolist(),
        col_or_nan("standout_trend_residual"),
        col_or_nan("standout_intelligence_uplift"),
        col_or_nan("standout_weighted_hypervolume"),
        col_or_nan("standout_frontier_distance"),
    ]
    return np.array(cols, dtype=object).T


def _frontier_mesh(
    pareto: pd.DataFrame,
    speed_log: bool,
    cost_metric_column_name: str,
    speed_metric_column_name: str,
):
    if len(pareto) < 4:
        return None
    cost = pareto[cost_metric_column_name].to_numpy(float)
    speed = pareto[speed_metric_column_name].to_numpy(float)
    intel = pareto["intelligence"].to_numpy(float)
    # 2D 投影做三角剖分（与可视轴一致：x=log成本, y=log/线性速度），各轴归一化避免畸形三角
    px = np.log10(cost)
    py = np.log10(speed) if speed_log else speed

    def norm(v):
        rng = v.max() - v.min()
        return (v - v.min()) / rng if rng else v * 0.0

    pts = np.column_stack([norm(px), norm(py)])
    try:
        tri = Delaunay(pts)
    except Exception:
        return None
    i, j, k = tri.simplices[:, 0], tri.simplices[:, 1], tri.simplices[:, 2]
    return go.Mesh3d(
        x=cost, y=speed, z=intel, i=i, j=j, k=k,
        intensity=intel, colorscale="Viridis", opacity=0.45,
        showscale=False, flatshading=True, name="前沿流形 (Pareto 编织)",
        hoverinfo="skip", showlegend=True,
    )


def _frontier_wireframe(
    pareto: pd.DataFrame,
    speed_log: bool,
    cost_metric_column_name: str,
    speed_metric_column_name: str,
):
    """与 _frontier_mesh 同样的 Delaunay 三角化，但只画三角形的边（Scatter3d 线）。

    线只占极细像素，几乎不参与 3D 拾取缓冲 —— 故其下方/后方的散点仍可正常悬浮，
    规避了 Mesh3d/Surface 半透明面吞掉下方节点 hover（label + 三维定位线）的 Plotly 痼疾。
    """
    if len(pareto) < 4:
        return None
    cost = pareto[cost_metric_column_name].to_numpy(float)
    speed = pareto[speed_metric_column_name].to_numpy(float)
    intel = pareto["intelligence"].to_numpy(float)
    px = np.log10(cost)
    py = np.log10(speed) if speed_log else speed

    def norm(v):
        rng = v.max() - v.min()
        return (v - v.min()) / rng if rng else v * 0.0

    try:
        tri = Delaunay(np.column_stack([norm(px), norm(py)]))
    except Exception:
        return None
    edges = set()
    for s in tri.simplices:
        for a, b in ((s[0], s[1]), (s[1], s[2]), (s[2], s[0])):
            edges.add((min(int(a), int(b)), max(int(a), int(b))))
    xs, ys, zs = [], [], []
    for a, b in edges:
        xs += [cost[a], cost[b], None]
        ys += [speed[a], speed[b], None]
        zs += [intel[a], intel[b], None]
    return go.Scatter3d(
        x=xs, y=ys, z=zs, mode="lines",
        line=dict(color="rgba(50,80,150,0.6)", width=3),
        name="前沿流形 (线框·不挡悬浮)", hoverinfo="skip", showlegend=True,
    )


def _achievable_frontier_step_mesh(
    pareto: pd.DataFrame,
    cost_metric_column_name: str,
    speed_metric_column_name: str,
) -> go.Mesh3d:
    """用当前可见 Pareto 节点构造 rectilinear step mesh。

    每个水平 plateau 使用不共享顶点的两个三角形，避免 Plotly 在相邻 cell
    间插值形成斜坡。网格锚点取 Pareto 节点自身的成本/速度边界，每个 Pareto
    点都会作为某个 plateau 的顶点出现，且该顶点 z 等于该点 intelligence。
    """
    if pareto.empty:
        return go.Mesh3d(
            x=[], y=[], z=[], i=[], j=[], k=[],
            name="可达前沿曲面", visible="legendonly", showlegend=True,
            hoverinfo="skip",
        )

    points = pareto[
        [cost_metric_column_name, speed_metric_column_name, "intelligence"]
    ].dropna().copy()
    points = points[
        (points[cost_metric_column_name] > 0)
        & (points[speed_metric_column_name] > 0)
    ]
    if points.empty:
        return go.Mesh3d(
            x=[], y=[], z=[], i=[], j=[], k=[],
            name="可达前沿曲面", visible="legendonly", showlegend=True,
            hoverinfo="skip",
        )

    costs = np.sort(points[cost_metric_column_name].astype(float).unique())
    speeds = np.sort(points[speed_metric_column_name].astype(float).unique())
    if len(costs) == 1:
        cost_upper = costs[0] * 1.08 if costs[0] > 0 else costs[0] + 1.0
    else:
        cost_upper = costs[-1] * (costs[-1] / costs[-2]) ** 0.25
    if len(speeds) == 1:
        speed_lower = speeds[0] / 1.08 if speeds[0] > 0 else speeds[0] - 1.0
    else:
        speed_lower = max(
            speeds[0] / (speeds[1] / speeds[0]) ** 0.25,
            np.nextafter(0.0, 1.0),
        )
    x_edges = np.r_[costs, cost_upper]
    y_edges = np.r_[speed_lower, speeds]

    point_cost = points[cost_metric_column_name].to_numpy(float)
    point_speed = points[speed_metric_column_name].to_numpy(float)
    point_intel = points["intelligence"].to_numpy(float)

    xs: list[float] = []
    ys: list[float] = []
    zs: list[float] = []
    ii: list[int] = []
    jj: list[int] = []
    kk: list[int] = []

    def best_intelligence_at(cost_budget: float, speed_floor: float) -> float | None:
        feasible = (point_cost <= cost_budget) & (point_speed >= speed_floor)
        if not feasible.any():
            return None
        return float(point_intel[feasible].max())

    for x_index in range(len(x_edges) - 1):
        for y_index in range(len(y_edges) - 1):
            z_value = best_intelligence_at(x_edges[x_index], y_edges[y_index + 1])
            if z_value is None:
                continue
            vertex_offset = len(xs)
            xs.extend([x_edges[x_index], x_edges[x_index + 1], x_edges[x_index + 1], x_edges[x_index]])
            ys.extend([y_edges[y_index], y_edges[y_index], y_edges[y_index + 1], y_edges[y_index + 1]])
            zs.extend([z_value, z_value, z_value, z_value])
            ii.extend([vertex_offset, vertex_offset])
            jj.extend([vertex_offset + 1, vertex_offset + 2])
            kk.extend([vertex_offset + 2, vertex_offset + 3])

    return go.Mesh3d(
        x=xs, y=ys, z=zs, i=ii, j=jj, k=kk,
        color="rgba(49,130,189,0.62)",
        opacity=0.32,
        flatshading=True,
        name="可达前沿曲面",
        showlegend=True,
        visible="legendonly",
        hoverinfo="skip",
    )


def build_figure(
    df: pd.DataFrame,
    speed_scale: str = "log",
    data_date: str | None = None,
    cost_metric_column_name: str = "cost_to_run",
    cost_metric_label: str = "有效运行成本",
    cost_metric_unit: str = "USD",
    speed_metric_column_name: str = "eff_speed",
    speed_metric_label: str = "有效速度",
) -> tuple[go.Figure, dict]:
    kept = df[df["kept"]].copy()
    if kept.empty:
        raise ValueError("剪枝后无保留模型，请放宽参数")
    speed_log = speed_scale == "log"
    colors = _creator_colors(kept["creator"])

    fig = go.Figure()

    # 1) 按厂商着色的散点（Pareto 点稍大）
    n_scatter = 0
    for creator, g in kept.groupby("creator", dropna=False):
        is_p = g["is_pareto"].to_numpy(bool)
        fig.add_trace(go.Scatter3d(
            x=g[cost_metric_column_name],
            y=g[speed_metric_column_name],
            z=g["intelligence"],
            mode="markers",
            name=str(creator),
            legendgroup="creators", legendgrouptitle_text="厂商",
            marker=dict(
                size=np.where(is_p, 7.5, 4.0),
                color=colors.get(creator, "#888888"),
                opacity=0.9,
            ),
            customdata=_customdata(g), hovertemplate=HOVER_TMPL,
        ))
        n_scatter += 1

    # 2) Pareto 强调：黑色空心圈叠加（同时兼作突出度视觉编码载体：JS 按选中指标改 marker.size）
    pareto = kept[kept["is_pareto"]]
    fig.add_trace(go.Scatter3d(
        x=pareto[cost_metric_column_name],
        y=pareto[speed_metric_column_name],
        z=pareto["intelligence"],
        mode="markers", name=f"Pareto 最优 ({len(pareto)})",
        marker=dict(size=12, symbol="circle-open", color="black",
                    line=dict(color="black", width=2)),
        customdata=_customdata(pareto), hovertemplate=HOVER_TMPL,
    ))
    idx_pareto_emphasis = len(fig.data) - 1

    # 3) 前沿流形：线框（默认显、不挡悬浮）+ 实心面（可切换）+ 可达前沿曲面（可切换）
    wire = _frontier_wireframe(
        pareto, speed_log, cost_metric_column_name, speed_metric_column_name
    )
    mesh = _frontier_mesh(
        pareto, speed_log, cost_metric_column_name, speed_metric_column_name
    )
    has_frontier = wire is not None and mesh is not None
    fa = fb = None
    if has_frontier:
        fig.add_trace(wire)                       # 线框，默认 visible=True
        fa = len(fig.data) - 1
        mesh.update(visible="legendonly")         # 实心面，默认隐（图例可点）
        fig.add_trace(mesh)
        fb = len(fig.data) - 1
    surf = _achievable_frontier_step_mesh(
        pareto, cost_metric_column_name, speed_metric_column_name
    )
    fig.add_trace(surf)
    fc = len(fig.data) - 1

    # 4) 预留四个「空」trace（追加在前沿之后，故 fa/fb/fc 下标不漂移）：
    #    交给注入的 JS 用 Plotly.restyle 动态填充：pin 高亮、谱系连线、
    #    谱系节点 hover marker、同基模型 reasoning 档位连线。
    #    沿用「细线/marker、不挡拾取」原则，避免吞掉下方 kept 节点的 hover。
    fig.add_trace(go.Scatter3d(
        x=[], y=[], z=[], mode="markers",
        name="已固定", showlegend=False, hoverinfo="skip", visible=True,
        marker=dict(size=16, symbol="circle-open", color="#d62728",
                    line=dict(color="#d62728", width=3)),
    ))
    idx_pinned_highlight = len(fig.data) - 1
    fig.add_trace(go.Scatter3d(
        x=[], y=[], z=[], mode="lines",
        name="谱系连线", showlegend=False, hoverinfo="skip", visible=True,
        line=dict(color="rgba(70,70,70,0.85)", width=5),
    ))
    idx_lineage_line = len(fig.data) - 1
    # 谱系节点拆两条：原单条可 hover 的「谱系节点」marker 会与其正下方的 kept 散点争夺
    # Plotly 拾取——光标在节点附近（非正中）时最近点在两者间来回翻 → hover 反复 on/off = 闪烁。
    #   ① 灰色装饰层 hoverinfo="skip"：只作视觉强调，画 kept 谱系节点（其 hover 交给底层散点，
    #      与之重合也无妨，因装饰层不参与拾取）；
    #   ② 剪枝前身悬浮层：可 hover、带 hovertemplate，只画「不在 kept 散点中的历代前身」
    #      （孤立点、无重合，故不引入拾取争夺），保留查看被剪枝前身信息的唯一途径。
    # JS redrawLineage 按 nameToIndex 把谱系节点分流填充进这两条。
    fig.add_trace(go.Scatter3d(
        x=[], y=[], z=[], mode="markers",
        name="谱系节点", showlegend=False, hoverinfo="skip", visible=True,
        marker=dict(size=5, color="rgba(70,70,70,0.82)"),
    ))
    idx_lineage_node_grey_decoration_marker = len(fig.data) - 1
    fig.add_trace(go.Scatter3d(
        x=[], y=[], z=[], mode="markers",
        name="谱系剪枝前身节点", showlegend=False, visible=True,
        marker=dict(size=5, color="rgba(70,70,70,0.82)"),
        hovertemplate=(
            "<b>%{customdata[0]}</b><br>"
            "基模型: %{customdata[1]}<br>"
            "谱系: %{customdata[2]}<br>"
            "发布: %{customdata[3]} · kept: %{customdata[7]}<br>"
            "智能指数: %{customdata[4]:.1f}<br>"
            f"{speed_metric_label}: %{{customdata[6]:.1f}}<br>"
            f"{cost_metric_label}: $%{{customdata[5]:.2f}} {cost_metric_unit}"
            "<extra>谱系剪枝前身节点</extra>"
        ),
    ))
    idx_lineage_pruned_ancestor_hover_marker = len(fig.data) - 1
    fig.add_trace(go.Scatter3d(
        x=[], y=[], z=[], mode="lines",
        name="Reasoning 档位", showlegend=False, hoverinfo="skip", visible=True,
        line=dict(color="rgba(168,54,170,0.92)", width=6),
    ))
    idx_reasoning_variant_line = len(fig.data) - 1

    payload = _build_lineage_payload(
        df,
        cost_metric_column_name,
        cost_metric_label,
        cost_metric_unit,
        speed_metric_column_name,
        speed_metric_label,
    )
    payload["pinned_highlight_trace_index"] = idx_pinned_highlight
    payload["lineage_line_trace_index"] = idx_lineage_line
    payload["lineage_node_grey_decoration_marker_trace_index"] = (
        idx_lineage_node_grey_decoration_marker
    )
    payload["lineage_pruned_ancestor_hover_marker_trace_index"] = (
        idx_lineage_pruned_ancestor_hover_marker
    )
    payload["reasoning_variant_line_trace_index"] = idx_reasoning_variant_line
    payload["pareto_emphasis_trace_index"] = idx_pareto_emphasis
    payload["frontier_wireframe_trace_index"] = fa
    payload["frontier_mesh_trace_index"] = fb
    payload["achievable_surface_trace_index"] = fc
    # 固定坐标轴范围 = (kept 散点 ∪ 全部谱系节点) 并集 + 留白，并关闭 autorange。
    # 谱系线基于「全量三维齐全数据」，含被剪枝的历代前身，其成本/速度可能落在 kept
    # 散点范围之外。若用 autorange，则 hover 画出谱系 → 范围扩张 → 所有点位移 → hover
    # 点移出光标 → unhover → 范围回缩 → …… 抖动（尤以谱系跨度大的 Qwen 等明显）。
    # 把范围预先固定到「所有可能绘制的几何」之并集后，画/撤谱系不再改变范围，消除抖动。
    x_range, y_range, z_range = _fixed_axis_ranges(
        kept,
        payload,
        cost_metric_column_name,
        speed_metric_column_name,
        speed_log,
    )

    is_eff = speed_metric_column_name == "eff_speed"
    speed_note = ("有效速度=原始速度÷相对冗长度(按中位归一)，惩罚冗长推理模型"
                  if is_eff else "原始 median tok/s")
    cost_note = (
        "跑完 Intelligence Index 的实际总花费"
        if cost_metric_column_name == "cost_to_run"
        else "AA 7:2:1 cache-hit/input/output 混合单价"
    )
    payload["current_view"] = {
        "data_date": data_date or "?",
        "cost_metric_label": cost_metric_label,
        "cost_metric_unit": cost_metric_unit,
        "cost_metric_note": cost_note,
        "speed_metric_label": speed_metric_label,
        "speed_metric_note": speed_note,
        "kept_model_count": int(len(kept)),
        "pareto_model_count": int(len(pareto)),
    }
    fig.update_layout(
        title=dict(
            text=f"AI 模型三维前沿：智能 × {speed_metric_label} × {cost_metric_label}",
            x=0.5, xanchor="center",
            font=dict(size=18),
        ),
        font=dict(size=13),
        scene=dict(
            uirevision="ai-frontier-3d-camera",
            xaxis=dict(title=dict(text=f"{cost_metric_label} {cost_metric_unit}（对数）",
                                  font=dict(size=13)),
                       type="log",
                       range=x_range, autorange=False,
                       backgroundcolor="rgb(248,248,250)",
                       tickfont=dict(size=12)),
            yaxis=dict(title=dict(text=f"{speed_metric_label} tok/s" + ("（对数）" if speed_log else ""),
                                  font=dict(size=13)),
                       type="log" if speed_log else "linear",
                       range=y_range, autorange=False,
                       tickfont=dict(size=12)),
            zaxis=dict(title=dict(text="智能指数 (AA Intelligence Index)",
                                  font=dict(size=13)),
                       range=z_range, autorange=False,
                       tickfont=dict(size=12)),
            # 默认视角：从（低费用, 高速度, 高智能）看向（高费用, 低速度, 低智能）
            # 视线方向 = center(0,0,0) − eye = (+1.7, -1.7, -1.1) → +x 高费用 / −y 低速度 / −z 低智能
            camera=dict(eye=dict(x=-1.7, y=1.7, z=1.1)),
        ),
        uirevision="ai-frontier-3d-user-view",
        legend=dict(
            itemsizing="constant", x=0.99, y=0.99, xanchor="right",
            font=dict(size=13), bgcolor="rgba(255,255,255,0.72)",
        ),
        hoverlabel=dict(font=dict(size=13)),
        margin=dict(l=0, r=150, t=56, b=0),
    )
    return fig, payload


GRAPH_DIV_ID = "frontier3d"


def export_static(fig: go.Figure, out: Path):
    try:
        out.parent.mkdir(parents=True, exist_ok=True)
        fig.write_image(str(out), width=1500, height=1000, scale=2)
        return out
    except Exception as e:  # kaleido 缺失或失败
        print(f"[warn] 静态导出失败（需 kaleido）：{e}")
        return None
