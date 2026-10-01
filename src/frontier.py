"""三维 Pareto 前沿、分层（离前沿距离）、可达前沿曲面，以及均衡剪枝。

方向约定（"更优"）：智能 ↑、运行成本 ↓、速度 ↑。

A 支配 B  ⟺  intel_A ≥ intel_B 且 cost_A ≤ cost_B 且 speed_A ≥ speed_B，
            且三者至少一项严格成立。

D-1「显示但不参与分析」（规格 4.1–4.3）：
- 每个口径按「该口径实际用到的版本敏感字段」判定 analysis eligibility：有效运行成本
  `cost_to_run` 要求成本值来自当期指数版本；有效速度 `eff_speed` 要求输出 token 数来自当期
  版本；7:2:1 混合单价与原始速度与指数版本无关。不看 isEstimated。
- 显示层在全部三维齐全点（含历史口径点）上剥层，保持原有点云；分析层只在 eligible 点上剥层，
  `layer`/`is_pareto` 即分析层。非 eligible 点退出全部分析基准（Pareto、归一化、趋势、
  对照集、超体积、垂距、前沿几何）。
"""
from __future__ import annotations

import numpy as np
import pandas as pd
from scipy.spatial import Delaunay

DIMS = ["intelligence", "cost_to_run", "eff_speed"]

COST_TO_RUN_VALUE_IS_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION_COLUMN_NAME = (
    "cost_to_run_value_is_from_current_intelligence_index_version"
)
OUTPUT_TOKEN_COUNT_VALUE_IS_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION_COLUMN_NAME = (
    "output_token_count_value_is_from_current_intelligence_index_version"
)
ANALYSIS_INELIGIBILITY_REASON_CODE_COST_TO_RUN_VALUE_NOT_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION = (
    "cost_to_run_value_not_from_current_intelligence_index_version"
)
ANALYSIS_INELIGIBILITY_REASON_CODE_OUTPUT_TOKEN_COUNT_VALUE_NOT_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION = (
    "output_token_count_value_not_from_current_intelligence_index_version"
)
# R1-01 (a)：被接受目录分区里，该 UUID 的目录智能分与当期 API 智能分不一致（AA 已重评）→ 目录 token
# 降为非当期。fetch_data 把它写进逐行原因列，D-1 eligibility 用它代替上面的通用 token 原因码。
ANALYSIS_INELIGIBILITY_REASON_CODE_OUTPUT_TOKEN_COUNT_VALUE_CATALOG_INTELLIGENCE_DISAGREES_WITH_CURRENT_API_INTELLIGENCE = (
    "output_token_count_value_catalog_intelligence_disagrees_with_current_api_intelligence"
)
# 同上，但目录或 API 一侧缺智能分、无从核对该 UUID 是否被重评 → 同样不敢标当期
ANALYSIS_INELIGIBILITY_REASON_CODE_OUTPUT_TOKEN_COUNT_VALUE_CATALOG_INTELLIGENCE_NOT_COMPARABLE_WITH_CURRENT_API_INTELLIGENCE = (
    "output_token_count_value_catalog_intelligence_not_comparable_with_current_api_intelligence"
)
# fetch_data 产出的逐行列：token 值为何不是当期（只在「值来源是被接受目录分区、却被逐 UUID 降级」时非空）
OUTPUT_TOKEN_COUNT_VALUE_NON_CURRENT_REASON_CODE_COLUMN_NAME = (
    "output_token_count_value_non_current_reason_code"
)
# 原因码 → 中文补充说明（拼在「v4.3.2 冗长度」之后）
OUTPUT_TOKEN_COUNT_CATALOG_DEMOTION_EXPLANATION_TEXT_BY_REASON_CODE = {
    ANALYSIS_INELIGIBILITY_REASON_CODE_OUTPUT_TOKEN_COUNT_VALUE_CATALOG_INTELLIGENCE_DISAGREES_WITH_CURRENT_API_INTELLIGENCE: (
        "目录智能分与当期 API 不一致，AA 已重评"
    ),
    ANALYSIS_INELIGIBILITY_REASON_CODE_OUTPUT_TOKEN_COUNT_VALUE_CATALOG_INTELLIGENCE_NOT_COMPARABLE_WITH_CURRENT_API_INTELLIGENCE: (
        "目录或当期 API 缺智能分，无从核对是否已重评"
    ),
}
# 调用方显式传入 analysis_eligible_mask、且值溯源列不能解释为何不合格时使用
ANALYSIS_INELIGIBILITY_REASON_CODE_MARKED_INELIGIBLE_BY_CALLER_SUPPLIED_MASK = (
    "marked_analysis_ineligible_by_caller_supplied_mask"
)

# 口径列 → 它依赖的「值是否来自当期版本」列与不合格原因码（按固定顺序：成本在前、token 在后）。
# 不在表中的列（7:2:1 混合单价、原始速度、智能分）与指数版本无关，不产生 eligibility 约束。
VERSION_SENSITIVE_VALUE_CURRENTNESS_COLUMN_AND_REASON_CODE_BY_METRIC_COLUMN_NAME: dict[
    str, tuple[str, str]
] = {
    "cost_to_run": (
        COST_TO_RUN_VALUE_IS_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION_COLUMN_NAME,
        ANALYSIS_INELIGIBILITY_REASON_CODE_COST_TO_RUN_VALUE_NOT_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION,
    ),
    "eff_speed": (
        OUTPUT_TOKEN_COUNT_VALUE_IS_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION_COLUMN_NAME,
        ANALYSIS_INELIGIBILITY_REASON_CODE_OUTPUT_TOKEN_COUNT_VALUE_NOT_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION,
    ),
}
# 原因码 → (中文字段名, 该字段值所属版本的列)，用于拼「历史口径（v4.1 成本/冗长度）」
ANALYSIS_INELIGIBILITY_FIELD_DISPLAY_NAME_AND_VALUE_VERSION_COLUMN_BY_REASON_CODE = {
    ANALYSIS_INELIGIBILITY_REASON_CODE_COST_TO_RUN_VALUE_NOT_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION: (
        "成本",
        "cost_to_run_value_intelligence_index_version",
    ),
    ANALYSIS_INELIGIBILITY_REASON_CODE_OUTPUT_TOKEN_COUNT_VALUE_NOT_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION: (
        "冗长度",
        "output_token_count_value_intelligence_index_version",
    ),
    **{
        catalog_demotion_reason_code: (
            f"冗长度：{catalog_demotion_explanation_text}",
            "output_token_count_value_intelligence_index_version",
        )
        for catalog_demotion_reason_code, catalog_demotion_explanation_text in (
            OUTPUT_TOKEN_COUNT_CATALOG_DEMOTION_EXPLANATION_TEXT_BY_REASON_CODE.items()
        )
    },
}

# 缺维度时的英文维度名（契约 missing_dimension_names）与中文显示名（drop_reason）
FRONTIER_3D_DIMENSION_NAME_INTELLIGENCE = "intelligence"
FRONTIER_3D_DIMENSION_NAME_COST = "cost"
FRONTIER_3D_DIMENSION_NAME_SPEED = "speed"
FRONTIER_3D_DIMENSION_DISPLAY_NAME_BY_DIMENSION_NAME = {
    FRONTIER_3D_DIMENSION_NAME_INTELLIGENCE: "智能",
    FRONTIER_3D_DIMENSION_NAME_COST: "成本",
    FRONTIER_3D_DIMENSION_NAME_SPEED: "速度",
}

ANALYSIS_ELIGIBLE_COLUMN_NAME = "analysis_eligible_for_frontier_3d_metric_variant"
DISPLAY_ELIGIBLE_COLUMN_NAME = "display_eligible_for_frontier_3d_metric_variant"
ANALYSIS_INELIGIBILITY_REASON_CODES_COLUMN_NAME = "analysis_ineligibility_reason_codes"
MISSING_DIMENSION_NAMES_COLUMN_NAME = "missing_dimension_names_for_frontier_3d_metric_variant"


def dims_for(
    cost_metric_column_name: str = "cost_to_run",
    speed_metric_column_name: str = "eff_speed",
) -> list[str]:
    """按所选成本与速度口径返回三维列名。"""
    return ["intelligence", cost_metric_column_name, speed_metric_column_name]


# ----------------------------------------------------------------------------- D-1 analysis eligibility
def _is_true_boolean_flag(flag: object) -> bool:
    """只有真正的布尔 True 才算当期；None / NaN / 其他值一律按非当期。"""
    return isinstance(flag, (bool, np.bool_)) and bool(flag)


def analysis_eligibility_for_frontier_3d_metric_variant(
    df: pd.DataFrame,
    cost_metric_column_name: str = "cost_to_run",
    speed_metric_column_name: str = "eff_speed",
) -> tuple[pd.Series, pd.Series]:
    """按口径判定每行是否参与分析（规格 4.1），返回 (eligible 布尔列, 原因码列表列)。

    只看该口径实际用到的版本敏感字段的 `*_value_is_from_current_intelligence_index_version`，
    不看 isEstimated。表里没有对应的值溯源列（旧 CSV、旧合成表）时按「当期」处理，
    与 D-1 之前的行为一致。缺值行的当期标志为 False，会带上原因码，但它们本来就因缺维度不显示。
    """
    reason_codes_by_row: list[list[str]] = [[] for _ in range(len(df))]
    for metric_column_name in (cost_metric_column_name, speed_metric_column_name):
        currentness_column_and_reason_code = (
            VERSION_SENSITIVE_VALUE_CURRENTNESS_COLUMN_AND_REASON_CODE_BY_METRIC_COLUMN_NAME.get(
                metric_column_name
            )
        )
        if currentness_column_and_reason_code is None:
            continue
        currentness_column_name, reason_code = currentness_column_and_reason_code
        if currentness_column_name not in df.columns:
            continue
        value_is_current = df[currentness_column_name].map(_is_true_boolean_flag)
        # token 值被逐 UUID 降级时（R1-01 (a)），用 fetch_data 写下的专门原因码代替通用码
        specific_reason_codes = (
            df[OUTPUT_TOKEN_COUNT_VALUE_NON_CURRENT_REASON_CODE_COLUMN_NAME].tolist()
            if currentness_column_name == OUTPUT_TOKEN_COUNT_VALUE_IS_FROM_CURRENT_INTELLIGENCE_INDEX_VERSION_COLUMN_NAME
            and OUTPUT_TOKEN_COUNT_VALUE_NON_CURRENT_REASON_CODE_COLUMN_NAME in df.columns
            else [None] * len(df)
        )
        for row_position, is_current in enumerate(value_is_current.to_numpy(bool)):
            if not is_current:
                specific_reason_code = specific_reason_codes[row_position]
                reason_codes_by_row[row_position].append(
                    specific_reason_code
                    if isinstance(specific_reason_code, str) and specific_reason_code
                    else reason_code
                )
    ineligibility_reason_codes = pd.Series(reason_codes_by_row, index=df.index, dtype=object)
    analysis_eligible_mask = ineligibility_reason_codes.map(len).eq(0)
    return analysis_eligible_mask, ineligibility_reason_codes


def format_analysis_ineligibility_reason_text(
    ineligibility_reason_codes: list[str],
    cost_to_run_value_intelligence_index_version: str | None,
    output_token_count_value_intelligence_index_version: str | None,
) -> str | None:
    """中文说明：`历史口径（v4.1 成本/冗长度），不参与本口径前沿计算`；版本按实际值填。"""
    if not ineligibility_reason_codes:
        return None
    value_version_by_version_column_name = {
        "cost_to_run_value_intelligence_index_version": cost_to_run_value_intelligence_index_version,
        "output_token_count_value_intelligence_index_version": (
            output_token_count_value_intelligence_index_version
        ),
    }
    field_display_names_by_version_label: dict[str, list[str]] = {}
    for reason_code in ineligibility_reason_codes:
        field_display_name_and_version_column = (
            ANALYSIS_INELIGIBILITY_FIELD_DISPLAY_NAME_AND_VALUE_VERSION_COLUMN_BY_REASON_CODE.get(reason_code)
        )
        if field_display_name_and_version_column is None:
            field_display_names_by_version_label.setdefault("调用方标记", []).append("不参与分析")
            continue
        field_display_name, value_version_column_name = field_display_name_and_version_column
        value_version = value_version_by_version_column_name.get(value_version_column_name)
        version_label = f"v{value_version}" if value_version else "版本未知"
        field_display_names_by_version_label.setdefault(version_label, []).append(field_display_name)
    version_fragments = "；".join(
        f"{version_label} {'/'.join(field_display_names)}"
        for version_label, field_display_names in field_display_names_by_version_label.items()
    )
    return f"历史口径（{version_fragments}），不参与本口径前沿计算"


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


def _pareto_layer_numbers_on_rows(
    df: pd.DataFrame,
    rows_to_peel_mask: pd.Series,
    cost_metric_column_name: str,
    speed_metric_column_name: str,
) -> pd.Series:
    """只在 `rows_to_peel_mask` 选中的行上做 skyline peeling；其余行层号为 NaN。"""
    layer_numbers = pd.Series(np.nan, index=df.index, dtype=float)
    rows_to_peel = df[rows_to_peel_mask]
    if rows_to_peel.empty:
        return layer_numbers
    layer_numbers.loc[rows_to_peel.index] = _layers_for_points(
        rows_to_peel["intelligence"].to_numpy(float),
        rows_to_peel[cost_metric_column_name].to_numpy(float),
        rows_to_peel[speed_metric_column_name].to_numpy(float),
    ).astype(float)
    return layer_numbers


def add_pareto_layers(
    df: pd.DataFrame,
    cost_metric_column_name: str = "cost_to_run",
    speed_metric_column_name: str = "eff_speed",
    *,
    analysis_eligible_mask: pd.Series | None = None,
) -> pd.DataFrame:
    """给三维齐全的行加分析层 `layer` 与 `is_pareto`；缺维度的行 layer=NaN、is_pareto=False。

    给了 `analysis_eligible_mask` 时只在 eligible 行上剥层（D-1 分析层），非 eligible 行 layer=NaN。
    """
    df = df.copy()
    has_all = df[dims_for(cost_metric_column_name, speed_metric_column_name)].notna().all(axis=1)
    rows_to_peel_mask = has_all
    if analysis_eligible_mask is not None:
        rows_to_peel_mask = has_all & analysis_eligible_mask.reindex(df.index).fillna(False).astype(bool)
    df["layer"] = _pareto_layer_numbers_on_rows(
        df, rows_to_peel_mask, cost_metric_column_name, speed_metric_column_name
    )
    df["is_pareto"] = df["layer"].eq(1)
    return df


def _missing_frontier_3d_dimension_names_by_row(
    df: pd.DataFrame,
    cost_metric_column_name: str,
    speed_metric_column_name: str,
) -> pd.Series:
    dimension_column_name_by_dimension_name = {
        FRONTIER_3D_DIMENSION_NAME_INTELLIGENCE: "intelligence",
        FRONTIER_3D_DIMENSION_NAME_COST: cost_metric_column_name,
        FRONTIER_3D_DIMENSION_NAME_SPEED: speed_metric_column_name,
    }
    dimension_value_is_missing_by_dimension_name = {
        dimension_name: df[dimension_column_name].isna().to_numpy(bool)
        for dimension_name, dimension_column_name in dimension_column_name_by_dimension_name.items()
    }
    return pd.Series(
        [
            [
                dimension_name
                for dimension_name, value_is_missing in dimension_value_is_missing_by_dimension_name.items()
                if value_is_missing[row_position]
            ]
            for row_position in range(len(df))
        ],
        index=df.index,
        dtype=object,
    )


def _resolve_pruning_reference_timestamp(
    pruning_reference_date: object | None,
    legacy_today_argument: object | None,
) -> pd.Timestamp:
    """剪枝参考日期必须由调用方给出（CLI/builder 取 API 抓取日），不再回退到 datetime.now()。"""
    pruning_reference_date_value = (
        pruning_reference_date if pruning_reference_date is not None else legacy_today_argument
    )
    if pruning_reference_date_value is None:
        raise ValueError(
            "apply_pruning 缺少剪枝参考日期：请传 pruning_reference_date（通常取 API 抓取日期），"
            "不再使用运行当天的日期"
        )
    return pd.Timestamp(pruning_reference_date_value).normalize()


# ----------------------------------------------------------------------------- 均衡剪枝
def apply_pruning(
    df: pd.DataFrame,
    since_months: int = 18,
    max_layers: int = 3,
    hard_age_cutoff_months: int = 36,
    today: object | None = None,
    cost_metric_column_name: str = "cost_to_run",
    speed_metric_column_name: str = "eff_speed",
    *,
    analysis_eligible_mask: pd.Series | None = None,
    pruning_reference_date: object | None = None,
) -> pd.DataFrame:
    """标注显示层与分析层（D-1，规格 4.2）。

    - 显示层：在全部三维齐全点（含历史口径点）上剥层 → `display_layer`、`display_is_pareto`，
      保持 D-1 之前的点云；
    - 分析层：只在 `analysis_eligible ∧ 三维齐全` 的点上剥层 → `layer`、`is_pareto`；
      非 eligible 点 layer=NaN、is_pareto=False；
    - `kept = 三维齐全 ∧ (分析 Pareto ∨ 显示 Pareto ∨ (近 since_months 月 ∧ (显示层 ≤ max_layers
      ∨ 分析层 ≤ max_layers))) ∧ ¬早于 hard_age_cutoff_months`（远古模型即便 Pareto 最优也剔除）。
      「分析层 ≤ max_layers」一项保证 eligible 点是否上图只由 eligible 点决定（D-1：历史口径点不得把
      当期可比的近前沿点挤出显示）；对 eligible 点而言，显示层规则蕴含于分析层规则（点集更大，层号只会更大）。

    `pruning_reference_date`（兼容旧名 `today`）必须给出；`analysis_eligible_mask` 缺省时按
    `analysis_eligibility_for_frontier_3d_metric_variant` 从值溯源列判定。
    """
    df = df.copy()
    pruning_reference_timestamp = _resolve_pruning_reference_timestamp(pruning_reference_date, today)
    soft_cut = pruning_reference_timestamp - pd.DateOffset(months=since_months)
    hard_cut = pruning_reference_timestamp - pd.DateOffset(months=hard_age_cutoff_months)

    computed_analysis_eligible_mask, ineligibility_reason_codes = (
        analysis_eligibility_for_frontier_3d_metric_variant(
            df, cost_metric_column_name, speed_metric_column_name
        )
    )
    if analysis_eligible_mask is not None:
        caller_analysis_eligible_mask = analysis_eligible_mask.reindex(df.index).fillna(False).astype(bool)
        ineligibility_reason_codes = pd.Series(
            [
                []
                if is_eligible
                else (
                    reason_codes
                    or [ANALYSIS_INELIGIBILITY_REASON_CODE_MARKED_INELIGIBLE_BY_CALLER_SUPPLIED_MASK]
                )
                for is_eligible, reason_codes in zip(
                    caller_analysis_eligible_mask.to_numpy(bool), ineligibility_reason_codes
                )
            ],
            index=df.index,
            dtype=object,
        )
        computed_analysis_eligible_mask = caller_analysis_eligible_mask
    df[ANALYSIS_ELIGIBLE_COLUMN_NAME] = computed_analysis_eligible_mask.astype(bool)
    df[ANALYSIS_INELIGIBILITY_REASON_CODES_COLUMN_NAME] = ineligibility_reason_codes

    has_all = df[dims_for(cost_metric_column_name, speed_metric_column_name)].notna().all(axis=1)
    df["display_layer"] = _pareto_layer_numbers_on_rows(
        df, has_all, cost_metric_column_name, speed_metric_column_name
    )
    df["display_is_pareto"] = df["display_layer"].eq(1)
    df["layer"] = _pareto_layer_numbers_on_rows(
        df,
        has_all & df[ANALYSIS_ELIGIBLE_COLUMN_NAME],
        cost_metric_column_name,
        speed_metric_column_name,
    )
    df["is_pareto"] = df["layer"].eq(1)

    rdate = df["release_date"]
    recent = (rdate >= soft_cut).fillna(False).astype(bool)
    near_display_frontier = df["display_layer"] <= max_layers
    near_analysis_frontier = df["layer"] <= max_layers
    # 远古硬截断：早于 hard_cut → 删（即使 Pareto）；无日期不算远古（但也不算近期）
    too_old = (rdate < hard_cut).fillna(False).astype(bool)
    # 只按显示层判定「近前沿」时，9/23 数据上默认口径有 10 个 eligible 近期点（分析层 ≤3）被历史口径点
    # 把显示层推到 >3 而未上图——这等于让非当期值影响当期点的去留，违背 D-1；故并入分析层判定（107→117）。
    kept = (
        has_all
        & (
            df["is_pareto"]
            | df["display_is_pareto"]
            | (recent & (near_display_frontier | near_analysis_frontier))
        )
        & ~too_old
    )
    df["kept"] = kept
    df[DISPLAY_ELIGIBLE_COLUMN_NAME] = kept

    missing_dimension_names_by_row = _missing_frontier_3d_dimension_names_by_row(
        df, cost_metric_column_name, speed_metric_column_name
    )
    df[MISSING_DIMENSION_NAMES_COLUMN_NAME] = missing_dimension_names_by_row
    missing_dimension_drop_reason_text = missing_dimension_names_by_row.map(
        lambda missing_dimension_names: "缺维度："
        + "/".join(
            FRONTIER_3D_DIMENSION_DISPLAY_NAME_BY_DIMENSION_NAME[dimension_name]
            for dimension_name in missing_dimension_names
        )
    )
    # 记录剔除原因，便于核查（契约 excluded_models_with_drop_reason 与 CLI 缺维告警使用）
    df["drop_reason"] = np.where(
        ~has_all,
        missing_dimension_drop_reason_text,
        np.where(
            too_old,
            "过旧(硬截断)",
            np.where(
                kept,
                "保留",
                np.where(
                    rdate.isna(),
                    # 无日期既不算远古也不算近期；不写「过旧」，免得与契约里 release_date=null 自相矛盾
                    "发布日期缺失且非前沿",
                    np.where(~recent, "过旧(软窗外且非前沿)", "离前沿太远"),
                ),
            ),
        ),
    )
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
    用三维齐全的模型构建（不限于保留集，以反映真实可达上界）；已由 `apply_pruning` 标注
    analysis eligibility 时只用 eligible 点（D-1：历史口径点不参与可达上界）。
    """
    full = df.dropna(
        subset=dims_for(cost_metric_column_name, speed_metric_column_name)
    )
    if ANALYSIS_ELIGIBLE_COLUMN_NAME in full.columns:
        full = full[full[ANALYSIS_ELIGIBLE_COLUMN_NAME].astype(bool)]
    cost = full[cost_metric_column_name].to_numpy(float)
    speed = full[speed_metric_column_name].to_numpy(float)
    intel = full["intelligence"].to_numpy(float)
    if full.empty:
        # 没有参与分析的点（例：API 升级到新 family、默认口径 eligible 为 0）→ 全 NaN 网格，不对空数组取 min
        all_nan_grid = np.full((ny, nx), np.nan)
        return all_nan_grid.copy(), all_nan_grid.copy(), all_nan_grid

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
    """给 kept ∧ analysis eligible 行加四个突出度指标列 + 归一坐标 g_cost/g_speed/g_intel。

    在 `apply_pruning` 之后调用（需要 kept / is_pareto / analysis eligibility）。四指标与归一化
    min/max、趋势拟合、智能抬升对照集、超体积、垂距一律只在**当前变体的 kept ∧ eligible 集**上
    计算（D-1，规格 4.3）；非 eligible 的 kept 点（历史口径）这些值全为 NaN（契约输出 null）。
    前沿以分析层 is_pareto ∩ kept 界定，与可视前沿一致。没有 eligibility 列（旧调用方）时按全部 eligible。
    加权超体积仅算 w=1 的静态值（供 hover/列）；前端滑杆改权重时在 JS 端用同一算法实时重算。
    """
    df = df.copy()
    for column in STANDOUT_COLUMNS:
        df[column] = np.nan
    kept_and_analysis_eligible_mask = df["kept"].astype(bool)
    if ANALYSIS_ELIGIBLE_COLUMN_NAME in df.columns:
        kept_and_analysis_eligible_mask &= df[ANALYSIS_ELIGIBLE_COLUMN_NAME].astype(bool)
    kept = df[kept_and_analysis_eligible_mask]
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
