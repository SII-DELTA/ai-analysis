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

import json
import re
from pathlib import Path

import numpy as np
import pandas as pd
import plotly.graph_objects as go
from plotly.colors import qualitative
from scipy.spatial import Delaunay

from .frontier import achievable_frontier_grid

ROOT = Path(__file__).resolve().parent.parent
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


def _build_lineage_payload(df_full: pd.DataFrame, speed_col: str) -> dict:
    """构造注入前端 JS 的数据。

    - models[]（仅 kept，可见节点）：每模型 {name, base_model_name, creator, tier,
      lineage_key, x, y, z, panel}；用于搜索 / pin / 高亮 / 常显注释。
    - base_groups{base_model_name: [models 下标...]}：pin 时整组固定其全部档位。
    - lineages{"creator||tier": [按发布日升序的「每代取最高智能点」节点...]}：**基于全量
      三维齐全的数据（不限 kept）**，使被剪枝的历代前身仍能连成谱系（用户示例 Gemini
      2.5 Pro → 3 Pro → 3.1 Pro 多数前身已被剪枝，故谱系必须越过 kept 取自全量）。
      每个谱系节点自带坐标与标签（含 kept 标记），仅在 hover/pin 时随谱系线显示。
      仅保留 >=2 代的谱系（单代无连线）。
    """
    # —— models / base_groups：仅 kept ——
    kept = df_full[df_full["kept"]].reset_index(drop=True)
    models: list[dict] = []
    for _, r in kept.iterrows():
        name = str(r["name"])
        base, tier = _resolve_lineage(name)
        creator = str(r["creator"]) if pd.notna(r["creator"]) else "?"
        rd = r["release_date"]
        models.append({
            "name": name,
            "base_model_name": base,
            "creator": creator,
            "tier": tier,
            "lineage_key": f"{creator}||{tier}",
            "x": float(r["cost_to_run"]),
            "y": float(r[speed_col]),
            "z": float(r["intelligence"]),
            "panel": {
                "release_date": rd.strftime("%Y-%m-%d") if pd.notna(rd) else "?",
                "intelligence": float(r["intelligence"]),
                "output_speed": float(r["output_speed"]),
                "eff_speed": float(r["eff_speed"]),
                "cost_to_run": float(r["cost_to_run"]),
                "price_blended": float(r["price_blended"]),
                "layer": float(r["layer"]),
            },
        })

    base_groups: dict[str, list[int]] = {}
    for i, m in enumerate(models):
        base_groups.setdefault(m["base_model_name"], []).append(i)

    # —— lineages：全量三维齐全行（含被剪枝的历代前身）——
    kept_names = set(kept["name"].astype(str))
    dims = ["cost_to_run", speed_col, "intelligence"]
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
                "x": float(r["cost_to_run"]),
                "y": float(r[speed_col]),
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

    # 速度轴口径：让前端常显面板（注释 + 侧栏）的速度文案跟随当前 speed_col，
    # 避免默认 raw 图（output_speed 轴）下面板却报告 eff_speed 的口径错位。
    # panel 同时含 output_speed 与 eff_speed，故 JS 用 m.panel[speed_axis_field] 取值。
    speed_axis_label = "有效速度" if speed_col == "eff_speed" else "原始速度"
    return {
        "models": models,
        "base_groups": base_groups,
        "lineages": lineages,
        "speed_axis_field": speed_col,
        "speed_axis_label": speed_axis_label,
    }

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

    # 4) 预留两个「空」trace（追加在 fc 之后，故 fa/fb/fc 下标不漂移、按钮无需改）：
    #    交给注入的 JS 用 Plotly.restyle 动态填充——一个画 pin 高亮光环，一个画谱系连线。
    #    沿用「细线/marker、不挡拾取」原则，避免吞掉下方 kept 节点的 hover。
    fig.add_trace(go.Scatter3d(
        x=[], y=[], z=[], mode="markers",
        name="已固定", showlegend=False, hoverinfo="skip", visible=True,
        marker=dict(size=16, symbol="circle-open", color="#d62728",
                    line=dict(color="#d62728", width=3)),
    ))
    idx_pinned_highlight = len(fig.data) - 1
    fig.add_trace(go.Scatter3d(
        x=[], y=[], z=[], mode="lines+markers+text",
        name="谱系连线", showlegend=False, hoverinfo="skip", visible=True,
        line=dict(color="rgba(70,70,70,0.85)", width=5),
        marker=dict(size=4, color="rgba(70,70,70,0.85)"),
        text=[], textposition="top center", textfont=dict(size=9, color="#333"),
    ))
    idx_lineage_line = len(fig.data) - 1

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

    payload = _build_lineage_payload(df, speed_col)
    payload["pinned_highlight_trace_index"] = idx_pinned_highlight
    payload["lineage_line_trace_index"] = idx_lineage_line
    # scene.annotations 的坐标须用「轴坐标」而非原始值：对数轴下注释的 x/y 必须传
    # log10(value)，Plotly 才会把它放在对应数据位置；若直接传原始值（如成本 $256），
    # Plotly 会按 log10 解读 → 把注释放到 10^256，撑爆自动量程、把所有节点/流形挤到角落。
    # （散点 trace 传原始值由 Plotly 内部取 log，不受影响；故仅注释需此换算。）
    # 下列两个布尔标志告诉注入的 JS：哪些轴是对数轴、需对注释坐标做 log10。
    payload["cost_axis_is_log"] = True          # x 轴（有效运行成本）恒为对数轴
    payload["speed_axis_is_log"] = speed_log    # y 轴（速度）随 --speed-scale 决定
    return fig, payload


GRAPH_DIV_ID = "frontier3d"


# 注入前端的交互 JS 模板。占位符 __LINEAGE_DATA_JSON__ 由 _build_post_script 替换为
# payload 的 JSON。plotly.write_html(post_script=...) 仅对片段做 .replace("{plot_id}", …)，
# 不做 str.format，故此处的 JS 花括号无需转义。
_POST_SCRIPT_TEMPLATE = r"""
(function () {
  var DATA = __LINEAGE_DATA_JSON__;
  window.LINEAGE_DATA = DATA;                       // 测试/调试钩子
  var GD_ID = "frontier3d";
  var HL = DATA.pinned_highlight_trace_index;       // pin 高亮光环 trace 下标
  var LL = DATA.lineage_line_trace_index;           // 谱系连线 trace 下标
  var models = DATA.models;                          // 仅 kept（可见节点）
  var baseGroups = DATA.base_groups;                 // base_model_name -> [model 下标]
  var lineages = DATA.lineages;                      // "creator||tier" -> [谱系节点]

  var nameToIndex = {};
  models.forEach(function (m, i) { nameToIndex[m.name] = i; });
  var allBases = Object.keys(baseGroups).sort(function (a, b) {
    return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
  });

  var pinnedBases = {};   // 集合：base_model_name -> true
  var hoverKey = null;    // 当前 hover 模型所属 lineage_key（临时）
  var gd = null;

  function baseLineageKey(base) {
    var idxs = baseGroups[base];
    return (idxs && idxs.length) ? models[idxs[0]].lineage_key : null;
  }
  function pinnedVariantIndices() {
    var out = [];
    Object.keys(pinnedBases).forEach(function (b) {
      (baseGroups[b] || []).forEach(function (i) { out.push(i); });
    });
    return out;
  }
  function fmt(n, d) {
    if (n === null || n === undefined || isNaN(n)) return "?";
    return Number(n).toFixed(d === undefined ? 1 : d);
  }
  function axisCoord(v, isLog) {
    // 注释（scene.annotations）的坐标须为「轴坐标」：对数轴传 log10(value)，
    // 线性轴传原始值。否则对数轴会把原始值当成 log10 → 注释飞到 10^value、撑爆量程。
    return (isLog && v > 0) ? Math.log10(v) : v;
  }
  function annText(m) {
    var p = m.panel;
    return "<b>" + m.name + "</b><br>智能 " + fmt(p.intelligence) +
      " · " + DATA.speed_axis_label + " " + fmt(p[DATA.speed_axis_field], 0) +
      " tok/s · $" + fmt(p.cost_to_run, 2);
  }
  function matchBases(q) {
    q = (q || "").trim().toLowerCase();
    if (!q) return [];
    return allBases.filter(function (b) {
      return b.toLowerCase().indexOf(q) >= 0;
    }).slice(0, 40);
  }

  // —— 重画：pin 高亮光环 + 常显注释 + 侧栏 + 谱系线 ——
  function rerenderPinned() {
    var idxs = pinnedVariantIndices();
    var xs = [], ys = [], zs = [];
    idxs.forEach(function (i) { var m = models[i]; xs.push(m.x); ys.push(m.y); zs.push(m.z); });
    Plotly.restyle(gd, { x: [xs], y: [ys], z: [zs] }, [HL]);
    var anns = idxs.map(function (i) {
      var m = models[i];
      return {
        x: axisCoord(m.x, DATA.cost_axis_is_log),
        y: axisCoord(m.y, DATA.speed_axis_is_log),
        z: m.z, text: annText(m),
        showarrow: true, arrowhead: 2, arrowsize: 1, arrowwidth: 1, ax: 18, ay: -28,
        font: { size: 10, color: "#222" }, align: "left",
        bgcolor: "rgba(255,255,255,0.9)", bordercolor: "#888", borderwidth: 1, borderpad: 3
      };
    });
    Plotly.relayout(gd, { "scene.annotations": anns });
    renderSidePanel();
    redrawLineage();
  }

  function redrawLineage() {
    var keys = {};
    Object.keys(pinnedBases).forEach(function (b) { var k = baseLineageKey(b); if (k) keys[k] = true; });
    if (hoverKey) keys[hoverKey] = true;
    var xs = [], ys = [], zs = [], txt = [];
    Object.keys(keys).forEach(function (k) {
      var nodes = lineages[k];
      if (!nodes || nodes.length < 2) return;
      nodes.forEach(function (n) { xs.push(n.x); ys.push(n.y); zs.push(n.z); txt.push(n.label); });
      xs.push(null); ys.push(null); zs.push(null); txt.push("");   // 断开多条谱系
    });
    Plotly.restyle(gd, { x: [xs], y: [ys], z: [zs], text: [txt] }, [LL]);
  }

  function togglePin(base) {
    if (pinnedBases[base]) delete pinnedBases[base]; else pinnedBases[base] = true;
    rerenderPinned(); renderResults();
  }

  // —— hover：临时显示所属谱系线（不加注释，避免抖动）——
  // 关键防护：在 plotly_hover 回调里「同步」调用 Plotly.restyle 会强制 gl3d 重绘，
  // 重绘又重新求值光标下的 hover、再次 fire plotly_hover → onHover → restyle …… 形成
  // 无限重入循环：画面卡死、无法拖拽旋转，且 hover 标签因被反复中途重绘而被挤到左上角
  // (0,0) 而非锚在节点旁。两道防护：
  //   ① 去重——谱系 key 未变就不重画，直接打断重入循环（再次 fire 的是同一点）；
  //   ② requestAnimationFrame——把重画移出 hover 回调，避免在 Plotly 计算 hover 标签的
  //      同一帧内改 trace 数据（消除标签跳到左上角的故障）。
  var pendingLineageFrame = null;
  function scheduleLineageRedraw() {
    if (pendingLineageFrame !== null) return;     // 已排程，合并多次请求为一帧
    var raf = window.requestAnimationFrame || function (cb) { return setTimeout(cb, 16); };
    pendingLineageFrame = raf(function () { pendingLineageFrame = null; redrawLineage(); });
  }
  function onHover(ev) {
    var p = ev.points && ev.points[0];
    if (!p || !p.customdata) return;              // 自有 trace(HL/LL)无 customdata，天然跳过
    var mi = nameToIndex[p.customdata[0]];
    if (mi === undefined) return;
    var key = models[mi].lineage_key;
    if (key === hoverKey) return;                 // 去重：同一谱系无需重画（打断重入循环）
    hoverKey = key;
    scheduleLineageRedraw();
  }
  function onUnhover() {
    if (hoverKey === null) return;                // 去重
    hoverKey = null;
    scheduleLineageRedraw();
  }

  // —— DOM：搜索框（左上，避开按钮组）+ 结果列表 + 侧栏（左下）——
  var elSearchWrap, elInput, elResults, elPanel;
  function css(el, s) { for (var k in s) el.style[k] = s[k]; }

  function buildDom() {
    elSearchWrap = document.createElement("div");
    css(elSearchWrap, {
      position: "fixed", top: "10px", left: "132px", zIndex: "1000",
      width: "256px", font: "12px/1.4 -apple-system,Segoe UI,Roboto,sans-serif"
    });
    elInput = document.createElement("input");
    elInput.type = "text";
    elInput.placeholder = "搜索模型并 pin（按基模型分组）…";
    elInput.setAttribute("id", "aa-search-input");
    css(elInput, {
      width: "100%", boxSizing: "border-box", padding: "6px 8px",
      border: "1px solid #bbb", borderRadius: "6px", outline: "none",
      background: "rgba(255,255,255,0.95)", boxShadow: "0 1px 4px rgba(0,0,0,0.12)"
    });
    elResults = document.createElement("div");
    elResults.setAttribute("id", "aa-search-results");
    css(elResults, {
      marginTop: "4px", maxHeight: "40vh", overflowY: "auto",
      background: "rgba(255,255,255,0.97)", border: "1px solid #ddd",
      borderRadius: "6px", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", display: "none"
    });
    elSearchWrap.appendChild(elInput);
    elSearchWrap.appendChild(elResults);
    document.body.appendChild(elSearchWrap);

    elPanel = document.createElement("div");
    elPanel.setAttribute("id", "aa-pinned-panel");
    css(elPanel, {
      position: "fixed", left: "8px", bottom: "8px", zIndex: "1000",
      width: "286px", maxHeight: "46vh", overflowY: "auto",
      background: "rgba(255,255,255,0.95)", border: "1px solid #ddd",
      borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      font: "12px/1.45 -apple-system,Segoe UI,Roboto,sans-serif", display: "none"
    });
    document.body.appendChild(elPanel);

    elInput.addEventListener("input", renderResults);
  }

  function renderResults() {
    var q = elInput.value;
    var hits = matchBases(q);
    elResults.innerHTML = "";
    if (!q.trim() || !hits.length) { elResults.style.display = "none"; return; }
    hits.forEach(function (base) {
      var n = (baseGroups[base] || []).length;
      var row = document.createElement("div");
      var pinned = !!pinnedBases[base];
      css(row, {
        padding: "5px 8px", cursor: "pointer", borderBottom: "1px solid #f0f0f0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: pinned ? "#eef6ff" : "transparent"
      });
      var left = document.createElement("span");
      left.textContent = base;
      css(left, { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginRight: "8px" });
      var right = document.createElement("span");
      right.textContent = (pinned ? "✓ " : "") + n + " 档";
      css(right, { color: pinned ? "#1a7" : "#999", flex: "0 0 auto", fontSize: "11px" });
      row.appendChild(left); row.appendChild(right);
      row.addEventListener("click", function () { togglePin(base); });
      row.addEventListener("mouseenter", function () { if (!pinned) row.style.background = "#f5f5f5"; });
      row.addEventListener("mouseleave", function () { if (!pinnedBases[base]) row.style.background = "transparent"; });
      elResults.appendChild(row);
    });
    elResults.style.display = "block";
  }

  function renderSidePanel() {
    var bases = Object.keys(pinnedBases);
    if (!bases.length) { elPanel.style.display = "none"; elPanel.innerHTML = ""; return; }
    elPanel.innerHTML = "";
    var head = document.createElement("div");
    css(head, { padding: "7px 10px", borderBottom: "1px solid #eee", display: "flex",
      justifyContent: "space-between", alignItems: "center", position: "sticky", top: "0",
      background: "rgba(255,255,255,0.97)" });
    var title = document.createElement("b"); title.textContent = "已固定 " + bases.length + " 个模型";
    var clear = document.createElement("a"); clear.textContent = "全部清除"; clear.href = "javascript:void(0)";
    css(clear, { color: "#c33", textDecoration: "none", fontSize: "11px" });
    clear.addEventListener("click", function () { pinnedBases = {}; rerenderPinned(); renderResults(); });
    head.appendChild(title); head.appendChild(clear);
    elPanel.appendChild(head);

    bases.sort().forEach(function (base) {
      var card = document.createElement("div");
      css(card, { padding: "6px 10px", borderBottom: "1px solid #f3f3f3" });
      var hdr = document.createElement("div");
      css(hdr, { display: "flex", justifyContent: "space-between", alignItems: "baseline" });
      var nm = document.createElement("b"); nm.textContent = base;
      var rm = document.createElement("a"); rm.textContent = "✕"; rm.href = "javascript:void(0)";
      css(rm, { color: "#c33", textDecoration: "none", marginLeft: "8px", flex: "0 0 auto" });
      rm.addEventListener("click", function () { delete pinnedBases[base]; rerenderPinned(); renderResults(); });
      hdr.appendChild(nm); hdr.appendChild(rm);
      card.appendChild(hdr);
      (baseGroups[base] || []).forEach(function (i) {
        var m = models[i], p = m.panel;
        var line = document.createElement("div");
        css(line, { color: "#444", fontSize: "11px", marginTop: "2px" });
        line.textContent = "· " + m.name + " — 智能 " + fmt(p.intelligence) +
          " · " + DATA.speed_axis_label + " " + fmt(p[DATA.speed_axis_field], 0) +
          " · $" + fmt(p.cost_to_run, 2) +
          " · " + p.release_date;
        card.appendChild(line);
      });
      var lk = baseLineageKey(base);
      if (lk && lineages[lk] && lineages[lk].length >= 2) {
        var ln = document.createElement("div");
        css(ln, { color: "#777", fontSize: "11px", marginTop: "2px", fontStyle: "italic" });
        ln.textContent = "谱系 " + lk.replace("||", " · ") + "：" + lineages[lk].length + " 代";
        card.appendChild(ln);
      }
      elPanel.appendChild(card);
    });
    elPanel.style.display = "block";
  }

  function ready(cb) {
    gd = document.getElementById(GD_ID);
    if (gd && gd.on && gd._fullLayout && typeof Plotly !== "undefined") cb();
    else setTimeout(function () { ready(cb); }, 50);
  }

  ready(function () {
    buildDom();
    gd.on("plotly_hover", onHover);
    gd.on("plotly_unhover", onUnhover);
    // —— 测试/调试钩子（headless 断言用）——
    window.aaPinBase = function (b) { pinnedBases[b] = true; rerenderPinned(); renderResults(); };
    window.aaUnpinBase = function (b) { delete pinnedBases[b]; rerenderPinned(); renderResults(); };
    window.aaTogglePin = togglePin;
    window.aaShowLineageForName = function (nm) {
      var mi = nameToIndex[nm]; if (mi === undefined) return false;
      hoverKey = models[mi].lineage_key; redrawLineage(); return true;
    };
    window.aaClearHover = function () { hoverKey = null; redrawLineage(); };
    // 真实事件处理器（含去重 + rAF 排程），供 headless 模拟 plotly_hover 验证重入防护
    window.aaOnHover = onHover;
    window.aaOnUnhover = onUnhover;
    window.aaMatchBases = matchBases;
    window.aaState = function () {
      return {
        pinned: Object.keys(pinnedBases), hoverKey: hoverKey,
        annCount: (gd._fullLayout && gd._fullLayout.scene && gd._fullLayout.scene.annotations || []).length,
        highlightLen: (gd.data[HL].x || []).length,
        lineageLen: (gd.data[LL].x || []).length,
        lineageKeys: Object.keys(lineages).length
      };
    };
  });
})();
"""


def _build_post_script(payload: dict) -> str:
    """把 payload 序列化进 JS 模板，产出注入 HTML 的 post_script。"""
    data_json = json.dumps(payload, ensure_ascii=False)
    return _POST_SCRIPT_TEMPLATE.replace("__LINEAGE_DATA_JSON__", data_json)


def write_html(fig: go.Figure, out: Path, payload: dict | None = None) -> Path:
    out.parent.mkdir(parents=True, exist_ok=True)
    post_script = _build_post_script(payload) if payload is not None else None
    fig.write_html(
        str(out), include_plotlyjs=True, full_html=True,
        div_id=GRAPH_DIV_ID, post_script=post_script,
    )
    return out


def export_static(fig: go.Figure, out: Path):
    try:
        out.parent.mkdir(parents=True, exist_ok=True)
        fig.write_image(str(out), width=1500, height=1000, scale=2)
        return out
    except Exception as e:  # kaleido 缺失或失败
        print(f"[warn] 静态导出失败（需 kaleido）：{e}")
        return None
