"""Plotly 三维可视化：智能 × 速度 × 运行成本 + Pareto 前沿流形。

- Scatter3d：保留的模型，按厂商着色；Pareto 最优点用黑色空心圈叠加强调。
- Mesh3d：把 Pareto 最优点在 (log成本, 速度) 平面做 Delaunay 三角化、抬升
  z=智能，织成半透明前沿流形——"在每个成本/速度处由最智能模型编织的曲面"。
- 可选 Surface：可达前沿 F(成本预算,速度下限)=max 智能（阶梯面，默认随图例可开）。

坐标：x=运行成本(对数轴, USD)、y=输出速度(tokens/s, 可对数)、z=智能指数。
"""
from __future__ import annotations

from pathlib import Path

import numpy as np
import pandas as pd
import plotly.graph_objects as go
from plotly.colors import qualitative
from scipy.spatial import Delaunay

from .frontier import DIMS, achievable_frontier_grid

ROOT = Path(__file__).resolve().parent.parent
PALETTE = qualitative.Dark24 + qualitative.Light24

HOVER_TMPL = (
    "<b>%{customdata[0]}</b><br>"
    "厂商: %{customdata[1]} · 发布: %{customdata[2]}<br>"
    "智能指数: %{customdata[3]:.1f}<br>"
    "输出速度: %{customdata[4]:.0f} tok/s<br>"
    "运行成本: $%{customdata[5]:.2f}<br>"
    "混合价: $%{customdata[6]:.2f}/M · Pareto层: %{customdata[7]:.0f}"
    "<extra></extra>"
)


def _creator_colors(creators) -> dict:
    uniq = sorted({c for c in creators if isinstance(c, str)})
    return {c: PALETTE[i % len(PALETTE)] for i, c in enumerate(uniq)}


def _customdata(df: pd.DataFrame) -> np.ndarray:
    """构造保留原始类型(字符串/浮点)的 customdata，避免被 numpy 统一成字符串。"""
    cols = [
        df["name"].fillna("?").tolist(),
        df["creator"].fillna("?").tolist(),
        df["release_date"].dt.strftime("%Y-%m-%d").fillna("?").tolist(),
        df["intelligence"].astype(float).tolist(),
        df["output_speed"].astype(float).tolist(),
        df["cost_to_run"].astype(float).tolist(),
        df["price_blended"].astype(float).tolist(),
        df["layer"].astype(float).tolist(),
    ]
    return np.array(cols, dtype=object).T


def _frontier_mesh(pareto: pd.DataFrame, speed_log: bool):
    if len(pareto) < 4:
        return None
    cost = pareto["cost_to_run"].to_numpy(float)
    speed = pareto["output_speed"].to_numpy(float)
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


def _achievable_surface(df: pd.DataFrame) -> go.Surface:
    Cg_log, Sg, Z = achievable_frontier_grid(df)
    return go.Surface(
        x=10 ** Cg_log, y=Sg, z=Z,
        colorscale="Blues", opacity=0.30, showscale=False,
        name="可达前沿 F(成本,速度)", showlegend=True, visible="legendonly",
        hoverinfo="skip",
    )


def build_figure(
    df: pd.DataFrame,
    speed_scale: str = "log",
    data_date: str | None = None,
) -> go.Figure:
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
            x=g["cost_to_run"], y=g["output_speed"], z=g["intelligence"],
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

    # 2) Pareto 强调：黑色空心圈叠加
    pareto = kept[kept["is_pareto"]]
    fig.add_trace(go.Scatter3d(
        x=pareto["cost_to_run"], y=pareto["output_speed"], z=pareto["intelligence"],
        mode="markers", name=f"Pareto 最优 ({len(pareto)})",
        marker=dict(size=12, symbol="circle-open", color="black",
                    line=dict(color="black", width=2)),
        customdata=_customdata(pareto), hovertemplate=HOVER_TMPL,
    ))

    # 3) 前沿流形 + 可达前沿曲面（trace 列表末尾，供按钮翻转）
    mesh = _frontier_mesh(pareto, speed_log)
    has_mesh = mesh is not None
    if has_mesh:
        fig.add_trace(mesh)
    fig.add_trace(_achievable_surface(df))

    base = [True] * (n_scatter + 1)  # 散点 + Pareto 叠加，始终可见

    def vis(mesh_on, surf_on):
        v = list(base)
        if has_mesh:
            v.append(mesh_on)
        v.append(surf_on if surf_on else False)
        return v

    subtitle = (f"数据：Artificial Analysis · 拉取于 {data_date}"
                if data_date else "数据：Artificial Analysis")
    fig.update_layout(
        title=dict(
            text="AI 模型三维前沿：智能 × 速度 × 运行成本<br>"
                 f"<sub>{subtitle} · 成本=跑完 Intelligence Index 的花费(非 $/M) · "
                 f"共 {len(kept)} 模型，其中 {len(pareto)} 个 Pareto 最优</sub>",
            x=0.5, xanchor="center",
        ),
        scene=dict(
            xaxis=dict(title="运行成本 USD（对数）", type="log",
                       backgroundcolor="rgb(248,248,250)"),
            yaxis=dict(title="输出速度 tok/s" + ("（对数）" if speed_log else ""),
                       type="log" if speed_log else "linear"),
            zaxis=dict(title="智能指数 (AA Intelligence Index)"),
            camera=dict(eye=dict(x=1.7, y=-1.7, z=1.1)),
        ),
        legend=dict(itemsizing="constant", x=1.02, y=1, font=dict(size=10)),
        margin=dict(l=0, r=0, t=90, b=0),
        updatemenus=[dict(
            type="buttons", direction="right", x=0.5, y=0.99, xanchor="center",
            buttons=[
                dict(label="散点+前沿流形", method="update", args=[{"visible": vis(True, False)}]),
                dict(label="加可达前沿曲面", method="update", args=[{"visible": vis(True, True)}]),
                dict(label="仅散点", method="update", args=[{"visible": vis(False, False)}]),
            ],
        )],
    )
    return fig


def write_html(fig: go.Figure, out: Path) -> Path:
    out.parent.mkdir(parents=True, exist_ok=True)
    fig.write_html(str(out), include_plotlyjs=True, full_html=True)
    return out


def export_static(fig: go.Figure, out: Path):
    try:
        out.parent.mkdir(parents=True, exist_ok=True)
        fig.write_image(str(out), width=1500, height=1000, scale=2)
        return out
    except Exception as e:  # kaleido 缺失或失败
        print(f"[warn] 静态导出失败（需 kaleido）：{e}")
        return None
