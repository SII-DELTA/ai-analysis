"""Plotly 三维可视化：智能 × 速度 × 有效运行成本 + Pareto 前沿流形。

- Scatter3d：保留的模型，按厂商着色；Pareto 最优点用黑色空心圈叠加强调。
- 前沿流形：Pareto 最优点在 (log成本, 速度) 平面做 Delaunay 三角化、抬升 z=智能，
  织成"在每个成本/速度处由最智能模型编织的曲面"。**默认画线框**（Scatter3d 线，不挡下方
  节点悬浮）；可切半透明实心 Mesh3d（观感更好，但触发 Plotly 痼疾——盖住其下方节点 hover）。
- 可选 Surface：可达前沿 F(成本预算,速度下限)=max 智能（阶梯面，按钮/图例可开）。

坐标：x=有效运行成本(对数轴, USD)、y=输出速度(tokens/s, 可对数)、z=智能指数。
  x 轴=「跑完整套 Intelligence Index 的实测花费」——已按各模型实际消耗 token 量（含冗长输出与
  思维链 reasoning token）加权，本质是「有效成本」而非每百万 token 牌价；底层单价取自 API 公开
  牌价（不含编程/订阅套餐折扣，原因见 README「成本口径」一节）。
"""
from __future__ import annotations

from pathlib import Path

import numpy as np
import pandas as pd
import plotly.graph_objects as go
from plotly.colors import qualitative
from scipy.spatial import Delaunay

from .frontier import achievable_frontier_grid

ROOT = Path(__file__).resolve().parent.parent
PALETTE = qualitative.Dark24 + qualitative.Light24

HOVER_TMPL = (
    "<b>%{customdata[0]}</b><br>"
    "厂商: %{customdata[1]} · 发布: %{customdata[2]}<br>"
    "智能指数: %{customdata[3]:.1f}<br>"
    "原始速度: %{customdata[4]:.0f} tok/s · 冗长度: %{customdata[8]:.1f}M 输出tok<br>"
    "有效速度: %{customdata[9]:.0f} tok/s（按中位冗长归一）<br>"
    "有效运行成本(跑完评测实花): $%{customdata[5]:.2f}<br>"
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
        df["output_mtokens"].astype(float).tolist(),
        df["eff_speed"].astype(float).tolist(),
    ]
    return np.array(cols, dtype=object).T


def _frontier_mesh(pareto: pd.DataFrame, speed_log: bool, speed_col: str = "output_speed"):
    if len(pareto) < 4:
        return None
    cost = pareto["cost_to_run"].to_numpy(float)
    speed = pareto[speed_col].to_numpy(float)
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


def _frontier_wireframe(pareto: pd.DataFrame, speed_log: bool, speed_col: str = "output_speed"):
    """与 _frontier_mesh 同样的 Delaunay 三角化，但只画三角形的边（Scatter3d 线）。

    线只占极细像素，几乎不参与 3D 拾取缓冲 —— 故其下方/后方的散点仍可正常悬浮，
    规避了 Mesh3d/Surface 半透明面吞掉下方节点 hover（label + 三维定位线）的 Plotly 痼疾。
    """
    if len(pareto) < 4:
        return None
    cost = pareto["cost_to_run"].to_numpy(float)
    speed = pareto[speed_col].to_numpy(float)
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


def _achievable_surface(df: pd.DataFrame, speed_col: str = "output_speed") -> go.Surface:
    Cg_log, Sg, Z = achievable_frontier_grid(df, speed_col=speed_col)
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
    speed_col: str = "output_speed",
    speed_label: str = "输出速度",
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
            x=g["cost_to_run"], y=g[speed_col], z=g["intelligence"],
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
        x=pareto["cost_to_run"], y=pareto[speed_col], z=pareto["intelligence"],
        mode="markers", name=f"Pareto 最优 ({len(pareto)})",
        marker=dict(size=12, symbol="circle-open", color="black",
                    line=dict(color="black", width=2)),
        customdata=_customdata(pareto), hovertemplate=HOVER_TMPL,
    ))

    # 3) 前沿流形：线框（默认显、不挡悬浮）+ 实心面（可切换）+ 可达前沿曲面（可切换）
    wire = _frontier_wireframe(pareto, speed_log, speed_col)
    mesh = _frontier_mesh(pareto, speed_log, speed_col)
    has_frontier = wire is not None and mesh is not None
    fa = fb = None
    if has_frontier:
        fig.add_trace(wire)                       # 线框，默认 visible=True
        fa = len(fig.data) - 1
        mesh.update(visible="legendonly")         # 实心面，默认隐（图例可点）
        fig.add_trace(mesh)
        fb = len(fig.data) - 1
    surf = _achievable_surface(df, speed_col)     # 自带 visible="legendonly"
    fig.add_trace(surf)
    fc = len(fig.data) - 1

    # 按钮：左组切前沿样式（线框/实心/隐藏/仅散点），右组独立开关可达前沿曲面。
    # 用 targeted restyle（args 第二项=目标 trace 下标）使两组互不干扰，散点恒显。
    updatemenus = []
    if has_frontier:
        updatemenus.append(dict(
            type="buttons", direction="right", x=0.01, y=0.99, xanchor="left",
            pad=dict(t=2, r=4), showactive=True,
            buttons=[
                dict(label="前沿线框", method="restyle",
                     args=[{"visible": [True, "legendonly"]}, [fa, fb]]),
                dict(label="前沿实心面", method="restyle",
                     args=[{"visible": ["legendonly", True]}, [fa, fb]]),
                dict(label="隐藏前沿", method="restyle",
                     args=[{"visible": ["legendonly", "legendonly"]}, [fa, fb]]),
                dict(label="仅散点", method="restyle",
                     args=[{"visible": ["legendonly", "legendonly", "legendonly"]}, [fa, fb, fc]]),
            ],
        ))
    updatemenus.append(dict(
        type="buttons", direction="right", x=0.99, y=0.99, xanchor="right",
        pad=dict(t=2, l=4), showactive=True,
        buttons=[
            dict(label="+可达前沿曲面", method="restyle", args=[{"visible": [True]}, [fc]]),
            dict(label="−可达前沿曲面", method="restyle", args=[{"visible": ["legendonly"]}, [fc]]),
        ],
    ))

    subtitle =(f"数据：Artificial Analysis · 拉取于 {data_date}"
                if data_date else "数据：Artificial Analysis")
    is_eff = speed_col == "eff_speed"
    speed_note = ("有效速度=原始速度÷相对冗长度(按中位归一)，惩罚冗长推理模型"
                  if is_eff else "原始 median tok/s")
    fig.update_layout(
        title=dict(
            text=f"AI 模型三维前沿：智能 × {speed_label} × 有效运行成本<br>"
                 f"<sub>{subtitle} · 成本=有效运行成本：跑完评测实花(含冗长/思维链token·基于API牌价·非$/M) · "
                 f"速度口径={speed_note} · "
                 f"共 {len(kept)} 模型，其中 {len(pareto)} 个 Pareto 最优</sub>",
            x=0.5, xanchor="center",
        ),
        scene=dict(
            xaxis=dict(title="有效运行成本 USD（对数）", type="log",
                       backgroundcolor="rgb(248,248,250)"),
            yaxis=dict(title=f"{speed_label} tok/s" + ("（对数）" if speed_log else ""),
                       type="log" if speed_log else "linear"),
            zaxis=dict(title="智能指数 (AA Intelligence Index)"),
            camera=dict(eye=dict(x=1.7, y=-1.7, z=1.1)),
        ),
        legend=dict(itemsizing="constant", x=1.02, y=1, font=dict(size=10)),
        margin=dict(l=0, r=0, t=90, b=0),
        updatemenus=updatemenus,
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
