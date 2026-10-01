"""D-1「显示但不参与分析」：按口径判定 analysis eligibility、两次 Pareto 剥层、剪枝五个分支、
突出度与归一化只用 eligible 点（规格 4.1–4.3）。

全部用合成数据、固定剪枝参考日期；不联网、不读 output/ 与 data/。
"""
from __future__ import annotations

import math

import numpy as np
import pandas as pd
import pytest

from src import frontier
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import (
    FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE,
    build_frontier_3d_synthetic_fixture_models_dataframe,
)

COST_TO_RUN_COLUMN_NAME = "cost_to_run"
BLENDED_PRICE_COLUMN_NAME = "blended_price_cache_input_output_7_to_2_to_1"
EFFECTIVE_SPEED_COLUMN_NAME = "eff_speed"
RAW_OUTPUT_SPEED_COLUMN_NAME = "output_speed"

COST_REASON_CODE = "cost_to_run_value_not_from_current_intelligence_index_version"
TOKEN_REASON_CODE = "output_token_count_value_not_from_current_intelligence_index_version"

METRIC_VARIANT_COLUMN_NAMES_BY_VARIANT_KEY = {
    "effective__effective": (COST_TO_RUN_COLUMN_NAME, EFFECTIVE_SPEED_COLUMN_NAME),
    "effective__raw": (COST_TO_RUN_COLUMN_NAME, RAW_OUTPUT_SPEED_COLUMN_NAME),
    "blended__effective": (BLENDED_PRICE_COLUMN_NAME, EFFECTIVE_SPEED_COLUMN_NAME),
    "blended__raw": (BLENDED_PRICE_COLUMN_NAME, RAW_OUTPUT_SPEED_COLUMN_NAME),
}

FIXED_PRUNING_REFERENCE_DATE = pd.Timestamp("2026-09-23")


def _four_value_currentness_combinations_dataframe() -> pd.DataFrame:
    """四行：成本当期/历史 × token 当期/历史，其余维度齐全。"""
    rows = []
    for cost_value_is_current in (True, False):
        for token_value_is_current in (True, False):
            rows.append(
                {
                    "name": f"cost={cost_value_is_current},token={token_value_is_current}",
                    "creator": "X",
                    "release_date": pd.Timestamp("2026-06-01"),
                    "intelligence": 50.0,
                    COST_TO_RUN_COLUMN_NAME: 10.0,
                    BLENDED_PRICE_COLUMN_NAME: 1.0,
                    EFFECTIVE_SPEED_COLUMN_NAME: 100.0,
                    RAW_OUTPUT_SPEED_COLUMN_NAME: 100.0,
                    "cost_to_run_value_is_from_current_intelligence_index_version": cost_value_is_current,
                    "output_token_count_value_is_from_current_intelligence_index_version": (
                        token_value_is_current
                    ),
                    # isEstimated 与 eligibility 无关：故意给历史口径点标 False、当期点标 True
                    "artificial_analysis_intelligence_index_is_estimated": (
                        cost_value_is_current and token_value_is_current
                    ),
                }
            )
    return pd.DataFrame(rows)


# ---------------------------------------------------------------- 规格 4.1：四口径 eligibility


@pytest.mark.parametrize(
    ("variant_key", "expected_eligibility_by_cost_and_token_currentness"),
    [
        (
            "effective__effective",
            {(True, True): True, (True, False): False, (False, True): False, (False, False): False},
        ),
        (
            "effective__raw",
            {(True, True): True, (True, False): True, (False, True): False, (False, False): False},
        ),
        (
            "blended__effective",
            {(True, True): True, (True, False): False, (False, True): True, (False, False): False},
        ),
        (
            "blended__raw",
            {(True, True): True, (True, False): True, (False, True): True, (False, False): True},
        ),
    ],
)
def test_analysis_eligibility_only_looks_at_value_currentness_of_fields_used_by_metric_variant(
    variant_key: str,
    expected_eligibility_by_cost_and_token_currentness: dict,
) -> None:
    models_dataframe = _four_value_currentness_combinations_dataframe()
    cost_column_name, speed_column_name = METRIC_VARIANT_COLUMN_NAMES_BY_VARIANT_KEY[variant_key]
    analysis_eligible_mask, ineligibility_reason_codes = (
        frontier.analysis_eligibility_for_frontier_3d_metric_variant(
            models_dataframe, cost_column_name, speed_column_name
        )
    )
    for row_index, row in models_dataframe.iterrows():
        currentness_key = (
            row["cost_to_run_value_is_from_current_intelligence_index_version"],
            row["output_token_count_value_is_from_current_intelligence_index_version"],
        )
        expected_is_eligible = expected_eligibility_by_cost_and_token_currentness[currentness_key]
        assert bool(analysis_eligible_mask.loc[row_index]) is expected_is_eligible, row["name"]
        assert (ineligibility_reason_codes.loc[row_index] == []) is expected_is_eligible


def test_analysis_ineligibility_reason_codes_list_every_offending_field_in_fixed_order() -> None:
    models_dataframe = _four_value_currentness_combinations_dataframe()
    _, ineligibility_reason_codes = frontier.analysis_eligibility_for_frontier_3d_metric_variant(
        models_dataframe, COST_TO_RUN_COLUMN_NAME, EFFECTIVE_SPEED_COLUMN_NAME
    )
    assert list(ineligibility_reason_codes) == [
        [],
        [TOKEN_REASON_CODE],
        [COST_REASON_CODE],
        [COST_REASON_CODE, TOKEN_REASON_CODE],
    ]


def test_models_dataframe_without_value_provenance_columns_is_treated_as_all_analysis_eligible() -> None:
    """旧的合成表/旧 CSV 没有值溯源列：按「全部当期」处理（与 D-1 之前的行为一致）。"""
    models_dataframe = _four_value_currentness_combinations_dataframe().drop(
        columns=[
            "cost_to_run_value_is_from_current_intelligence_index_version",
            "output_token_count_value_is_from_current_intelligence_index_version",
        ]
    )
    analysis_eligible_mask, ineligibility_reason_codes = (
        frontier.analysis_eligibility_for_frontier_3d_metric_variant(
            models_dataframe, COST_TO_RUN_COLUMN_NAME, EFFECTIVE_SPEED_COLUMN_NAME
        )
    )
    assert analysis_eligible_mask.all()
    assert all(reason_codes == [] for reason_codes in ineligibility_reason_codes)


def test_analysis_ineligibility_reason_text_names_actual_versions_and_fields() -> None:
    assert frontier.format_analysis_ineligibility_reason_text([], "4.1", "4.1") is None
    assert frontier.format_analysis_ineligibility_reason_text(
        [COST_REASON_CODE, TOKEN_REASON_CODE], "4.1", "4.1"
    ) == "历史口径（v4.1 成本/冗长度），不参与本口径前沿计算"
    assert frontier.format_analysis_ineligibility_reason_text(
        [TOKEN_REASON_CODE], "4.3.2", "4.1"
    ) == "历史口径（v4.1 冗长度），不参与本口径前沿计算"
    assert frontier.format_analysis_ineligibility_reason_text(
        [COST_REASON_CODE, TOKEN_REASON_CODE], "4.1", None
    ) == "历史口径（v4.1 成本；版本未知 冗长度），不参与本口径前沿计算"


CATALOG_INTELLIGENCE_DISAGREES_TOKEN_REASON_CODE = (
    "output_token_count_value_catalog_intelligence_disagrees_with_current_api_intelligence"
)


def test_analysis_eligibility_uses_specific_reason_code_for_rescored_catalog_token() -> None:
    """R1-01 (a)：目录 token 因该 UUID 智能分与当期 API 不一致被降为非当期时，带专门原因码。"""
    models_dataframe = _four_value_currentness_combinations_dataframe()
    models_dataframe[frontier.OUTPUT_TOKEN_COUNT_VALUE_NON_CURRENT_REASON_CODE_COLUMN_NAME] = [
        None,
        CATALOG_INTELLIGENCE_DISAGREES_TOKEN_REASON_CODE,
        None,
        None,
    ]
    _, ineligibility_reason_codes = frontier.analysis_eligibility_for_frontier_3d_metric_variant(
        models_dataframe, COST_TO_RUN_COLUMN_NAME, EFFECTIVE_SPEED_COLUMN_NAME
    )
    assert list(ineligibility_reason_codes) == [
        [],
        [CATALOG_INTELLIGENCE_DISAGREES_TOKEN_REASON_CODE],
        [COST_REASON_CODE],
        [COST_REASON_CODE, TOKEN_REASON_CODE],
    ]
    assert (
        frontier.ANALYSIS_INELIGIBILITY_REASON_CODE_OUTPUT_TOKEN_COUNT_VALUE_CATALOG_INTELLIGENCE_DISAGREES_WITH_CURRENT_API_INTELLIGENCE
        == CATALOG_INTELLIGENCE_DISAGREES_TOKEN_REASON_CODE
    )


def test_analysis_ineligibility_reason_text_explains_rescored_catalog_token() -> None:
    assert frontier.format_analysis_ineligibility_reason_text(
        [CATALOG_INTELLIGENCE_DISAGREES_TOKEN_REASON_CODE], "4.3.2", "4.3.2"
    ) == "历史口径（v4.3.2 冗长度：目录智能分与当期 API 不一致，AA 已重评），不参与本口径前沿计算"
    assert frontier.format_analysis_ineligibility_reason_text(
        [COST_REASON_CODE, CATALOG_INTELLIGENCE_DISAGREES_TOKEN_REASON_CODE], "4.1", "4.3.2"
    ) == (
        "历史口径（v4.1 成本；v4.3.2 冗长度：目录智能分与当期 API 不一致，AA 已重评），"
        "不参与本口径前沿计算"
    )


# ---------------------------------------------------------------- 规格 4.2：剪枝参考日期与五个分支


def test_apply_pruning_requires_explicit_pruning_reference_date_instead_of_wall_clock() -> None:
    models_dataframe = build_frontier_3d_synthetic_fixture_models_dataframe()
    with pytest.raises(ValueError, match="剪枝参考日期"):
        frontier.apply_pruning(models_dataframe)


def test_apply_pruning_accepts_legacy_today_keyword_as_pruning_reference_date() -> None:
    models_dataframe = build_frontier_3d_synthetic_fixture_models_dataframe()
    pruned_with_legacy_keyword = frontier.apply_pruning(
        models_dataframe, today=FIXED_PRUNING_REFERENCE_DATE
    )
    pruned_with_new_keyword = frontier.apply_pruning(
        models_dataframe, pruning_reference_date=FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE
    )
    pd.testing.assert_series_equal(
        pruned_with_legacy_keyword["kept"], pruned_with_new_keyword["kept"]
    )


def _pruned_synthetic_fixture_for_default_metric_variant() -> pd.DataFrame:
    return frontier.apply_pruning(
        build_frontier_3d_synthetic_fixture_models_dataframe(),
        since_months=18,
        max_layers=3,
        hard_age_cutoff_months=36,
        pruning_reference_date=FIXED_PRUNING_REFERENCE_DATE,
    ).set_index("name")


def test_pruning_covers_all_five_drop_reason_branches_with_refined_missing_dimension_text() -> None:
    pruned = _pruned_synthetic_fixture_for_default_metric_variant()
    assert pruned.loc["Speedless Genius (Max Effort)", "drop_reason"] == "缺维度：速度"
    assert pruned.loc["Costless Model", "drop_reason"] == "缺维度：成本"
    assert pruned.loc["Unscored Model", "drop_reason"] == "缺维度：智能"
    assert pruned.loc["Brand New Model (V-3)", "drop_reason"] == "缺维度：速度"
    assert pruned.loc["Gemini 2 Pro", "drop_reason"] == "过旧(硬截断)"
    assert pruned.loc["Gemini 2.5 Pro", "drop_reason"] == "过旧(软窗外且非前沿)"
    assert pruned.loc["GPT-6 (high)", "drop_reason"] == "保留"
    assert set(pruned["drop_reason"]) >= {
        "缺维度：速度",
        "缺维度：成本",
        "过旧(硬截断)",
        "过旧(软窗外且非前沿)",
        "离前沿太远",
        "保留",
    }
    for model_name, row in pruned.iterrows():
        assert (row["drop_reason"] == "保留") is bool(row["kept"]), model_name


def test_missing_dimension_names_are_recorded_per_model_for_metric_variant() -> None:
    pruned = _pruned_synthetic_fixture_for_default_metric_variant()
    assert pruned.loc["Speedless Genius (Max Effort)", "missing_dimension_names_for_frontier_3d_metric_variant"] == [
        "speed"
    ]
    assert pruned.loc["Costless Model", "missing_dimension_names_for_frontier_3d_metric_variant"] == ["cost"]
    assert pruned.loc["GPT-6 (high)", "missing_dimension_names_for_frontier_3d_metric_variant"] == []


def test_pruning_result_follows_the_given_reference_date_not_the_wall_clock() -> None:
    """R3-F6：剪枝结果只由传入的参考日期决定。

    旧版本 monkeypatch 了 frontier.datetime，但 frontier 早已不引用它，替换是空操作、测试恒真。
    这里改为用两个相距很远的参考日期：若实现偷偷改用「今天」，两次结果会相同而被抓住。
    """
    pruned_at_fixture_date = _pruned_synthetic_fixture_for_default_metric_variant()
    pruned_at_far_future_date = frontier.apply_pruning(
        build_frontier_3d_synthetic_fixture_models_dataframe(),
        since_months=18,
        max_layers=3,
        hard_age_cutoff_months=36,
        pruning_reference_date="2031-01-01",
    ).set_index("name")
    rows_with_all_three_dimensions = pruned_at_fixture_date["drop_reason"].map(
        lambda drop_reason: not str(drop_reason).startswith("缺维度")
    )
    assert pruned_at_fixture_date.loc[rows_with_all_three_dimensions, "kept"].any()
    # 2031-01-01 的硬截断线是 2028-01-01：fixture 里全部（2023–2026 年发布的）模型都过旧
    assert not pruned_at_far_future_date.loc[rows_with_all_three_dimensions, "kept"].any()
    assert set(pruned_at_far_future_date.loc[rows_with_all_three_dimensions, "drop_reason"]) == {
        "过旧(硬截断)"
    }
    repeated_pruned_at_fixture_date = _pruned_synthetic_fixture_for_default_metric_variant()
    pd.testing.assert_series_equal(pruned_at_fixture_date["kept"], repeated_pruned_at_fixture_date["kept"])
    pd.testing.assert_series_equal(
        pruned_at_fixture_date["drop_reason"], repeated_pruned_at_fixture_date["drop_reason"]
    )


# ---------------------------------------------------------------- R3-F7：kept 规则的每个分支都要被钉住


def _kept_rule_branch_model_row(
    name: str,
    release_date_text: str | None,
    intelligence: float,
    cost_to_run: float,
    effective_speed: float,
    *,
    values_are_current: bool = True,
) -> dict:
    return {
        "name": name,
        "creator": "Synthetic Lab",
        "release_date": pd.Timestamp(release_date_text) if release_date_text else pd.NaT,
        "intelligence": intelligence,
        COST_TO_RUN_COLUMN_NAME: cost_to_run,
        BLENDED_PRICE_COLUMN_NAME: 1.0,
        EFFECTIVE_SPEED_COLUMN_NAME: effective_speed,
        RAW_OUTPUT_SPEED_COLUMN_NAME: effective_speed,
        "cost_to_run_value_is_from_current_intelligence_index_version": values_are_current,
        "output_token_count_value_is_from_current_intelligence_index_version": values_are_current,
    }


def _pruned_kept_rule_branch_models(model_rows: list[dict]) -> pd.DataFrame:
    return frontier.apply_pruning(
        pd.DataFrame(model_rows),
        since_months=18,
        max_layers=3,
        hard_age_cutoff_months=36,
        pruning_reference_date=FIXED_PRUNING_REFERENCE_DATE,
    ).set_index("name")


def _assert_kept_if_and_only_if_drop_reason_is_kept(pruned: pd.DataFrame) -> None:
    for model_name, pruned_row in pruned.iterrows():
        assert bool(pruned_row["kept"]) is (pruned_row["drop_reason"] == "保留"), model_name


def test_model_older_than_hard_cutoff_is_dropped_even_when_it_is_pareto_optimal() -> None:
    """README：远古模型即便 Pareto 最优也剔除；且 drop_reason 与 kept 一致。"""
    pruned = _pruned_kept_rule_branch_models(
        [
            _kept_rule_branch_model_row("Ancient Dominator", "2021-01-01", 90.0, 1.0, 900.0),
            _kept_rule_branch_model_row("Recent Current Model", "2026-06-01", 50.0, 10.0, 100.0),
        ]
    )
    ancient_row = pruned.loc["Ancient Dominator"]
    assert bool(ancient_row["is_pareto"]) and bool(ancient_row["display_is_pareto"])
    assert not bool(ancient_row["kept"])
    assert ancient_row["drop_reason"] == "过旧(硬截断)"
    _assert_kept_if_and_only_if_drop_reason_is_kept(pruned)


def test_non_recent_historical_version_display_pareto_point_is_kept_only_via_display_pareto_clause() -> None:
    """9/23 真实数据里四口径分别有 1/1/3/0 个点只靠「显示 Pareto」一项上图。"""
    pruned = _pruned_kept_rule_branch_models(
        [
            # 软窗外（2024-06 早于 2025-03-23）、硬截断内、历史口径、显示层第 1 层
            _kept_rule_branch_model_row(
                "Old Historical Display Pareto", "2024-06-01", 70.0, 2.0, 500.0, values_are_current=False
            ),
            _kept_rule_branch_model_row("Recent Current Model", "2026-06-01", 50.0, 10.0, 100.0),
        ]
    )
    historical_row = pruned.loc["Old Historical Display Pareto"]
    assert not bool(historical_row["analysis_eligible_for_frontier_3d_metric_variant"])
    assert not bool(historical_row["is_pareto"])
    assert bool(historical_row["display_is_pareto"])
    assert bool(historical_row["kept"])
    assert historical_row["drop_reason"] == "保留"
    _assert_kept_if_and_only_if_drop_reason_is_kept(pruned)


def test_soft_window_boundary_date_counts_as_recent() -> None:
    """发布日期恰好等于软窗起点（参考日 − since_months）的非前沿点算「近期」而保留。"""
    soft_window_start_date_text = (FIXED_PRUNING_REFERENCE_DATE - pd.DateOffset(months=18)).strftime(
        "%Y-%m-%d"
    )
    pruned = _pruned_kept_rule_branch_models(
        [
            _kept_rule_branch_model_row("Frontier Model", "2026-06-01", 60.0, 5.0, 200.0),
            _kept_rule_branch_model_row(
                "Boundary Date Second Layer Model", soft_window_start_date_text, 50.0, 10.0, 100.0
            ),
            _kept_rule_branch_model_row(
                "One Day Before Boundary Second Layer Model",
                (pd.Timestamp(soft_window_start_date_text) - pd.DateOffset(days=1)).strftime("%Y-%m-%d"),
                49.0,
                11.0,
                99.0,
            ),
        ]
    )
    assert pruned.loc["Boundary Date Second Layer Model", "layer"] == 2
    assert bool(pruned.loc["Boundary Date Second Layer Model", "kept"])
    assert not bool(pruned.loc["One Day Before Boundary Second Layer Model", "kept"])
    assert pruned.loc["One Day Before Boundary Second Layer Model", "drop_reason"] == "过旧(软窗外且非前沿)"
    _assert_kept_if_and_only_if_drop_reason_is_kept(pruned)


def test_undated_non_frontier_model_drop_reason_says_release_date_is_missing() -> None:
    """R1-10：发布日期缺失、又不在前沿上时，不能写成自相矛盾的「过旧(软窗外且非前沿)」。"""
    pruned = _pruned_kept_rule_branch_models(
        [
            _kept_rule_branch_model_row("Frontier Model", "2026-06-01", 60.0, 5.0, 200.0),
            _kept_rule_branch_model_row("Undated Dominated Model", None, 50.0, 10.0, 100.0),
            _kept_rule_branch_model_row("Undated Frontier Model", None, 70.0, 50.0, 50.0),
        ]
    )
    assert pruned.loc["Undated Dominated Model", "drop_reason"] == "发布日期缺失且非前沿"
    assert not bool(pruned.loc["Undated Dominated Model", "kept"])
    assert pruned.loc["Undated Frontier Model", "drop_reason"] == "保留"
    _assert_kept_if_and_only_if_drop_reason_is_kept(pruned)


def test_value_currentness_flag_accepts_only_true_booleans() -> None:
    """R3-F9：NaN / None / 字符串 'True' 都按非当期处理（真实 CSV 回读后可能出现这些形态）。"""
    assert frontier._is_true_boolean_flag(True)
    assert frontier._is_true_boolean_flag(np.True_)
    for non_current_flag in (False, np.False_, None, math.nan, np.nan, "True", 1, 1.0):
        assert not frontier._is_true_boolean_flag(non_current_flag), non_current_flag


# ---------------------------------------------------------------- 规格 4.2：显示层 vs 分析层


def test_historical_version_point_is_displayed_but_excluded_from_analysis_layers() -> None:
    pruned = _pruned_synthetic_fixture_for_default_metric_variant()
    historical_point = pruned.loc["Claude Legacy 4 (Reasoning)"]
    assert not historical_point["analysis_eligible_for_frontier_3d_metric_variant"]
    assert historical_point["analysis_ineligibility_reason_codes"] == [
        COST_REASON_CODE,
        TOKEN_REASON_CODE,
    ]
    assert historical_point["display_is_pareto"]
    assert historical_point["kept"]
    assert historical_point["display_eligible_for_frontier_3d_metric_variant"]
    assert math.isnan(historical_point["layer"])
    assert not historical_point["is_pareto"]


def test_display_eligible_column_equals_kept_and_analysis_pareto_points_are_always_kept() -> None:
    pruned = _pruned_synthetic_fixture_for_default_metric_variant()
    assert (pruned["display_eligible_for_frontier_3d_metric_variant"] == pruned["kept"]).all()
    analysis_pareto_points_not_too_old = pruned[
        pruned["is_pareto"] & (pruned["drop_reason"] != "过旧(硬截断)")
    ]
    assert not analysis_pareto_points_not_too_old.empty
    assert analysis_pareto_points_not_too_old["kept"].all()


def test_display_layers_peel_all_complete_points_like_before_d1() -> None:
    """显示层 = 在全部三维齐全点（含历史口径点）上剥层，保持 D-1 前的点云。"""
    models_dataframe = build_frontier_3d_synthetic_fixture_models_dataframe()
    pruned = frontier.apply_pruning(
        models_dataframe, pruning_reference_date=FIXED_PRUNING_REFERENCE_DATE
    )
    complete_rows = pruned.dropna(subset=frontier.dims_for())
    expected_display_layers = frontier._layers_for_points(
        complete_rows["intelligence"].to_numpy(float),
        complete_rows[COST_TO_RUN_COLUMN_NAME].to_numpy(float),
        complete_rows[EFFECTIVE_SPEED_COLUMN_NAME].to_numpy(float),
    )
    np.testing.assert_array_equal(
        complete_rows["display_layer"].to_numpy(float), expected_display_layers.astype(float)
    )


def _analysis_pareto_model_names(pruned: pd.DataFrame) -> set[str]:
    return set(pruned.loc[pruned["kept"] & pruned["is_pareto"], "name"])


def _current_only_models_dataframe() -> pd.DataFrame:
    models_dataframe = build_frontier_3d_synthetic_fixture_models_dataframe()
    both_values_current = (
        models_dataframe["cost_to_run_value_is_from_current_intelligence_index_version"]
        & models_dataframe["output_token_count_value_is_from_current_intelligence_index_version"]
    )
    return models_dataframe[both_values_current].reset_index(drop=True)


def _dominating_historical_version_point_row() -> dict:
    """一个在所有维度上都优于全部当期点的历史口径点（v4.1 成本与 token）。"""
    return {
        "id": "00000000-0000-4000-9000-999999999999",
        "slug": "dominating-historical-point",
        "name": "Dominating Historical Point",
        "creator": "Anthropic",
        "release_date": pd.Timestamp("2026-09-01"),
        "intelligence": 99.0,
        "output_speed": 10_000.0,
        "blended_price_cache_input_output_7_to_2_to_1": 0.001,
        "cost_to_run": 0.001,
        "eff_speed": 10_000.0,
        "output_mtokens": 1.0,
        "cost_to_run_value_is_from_current_intelligence_index_version": False,
        "output_token_count_value_is_from_current_intelligence_index_version": False,
        "cost_to_run_value_intelligence_index_version": "4.1",
        "output_token_count_value_intelligence_index_version": "4.1",
    }


@pytest.mark.parametrize(
    "variant_key", ["effective__effective", "effective__raw", "blended__effective"]
)
def test_dominating_historical_version_point_does_not_change_analysis_pareto_or_standout(
    variant_key: str,
) -> None:
    cost_column_name, speed_column_name = METRIC_VARIANT_COLUMN_NAMES_BY_VARIANT_KEY[variant_key]
    current_only_models = _current_only_models_dataframe()
    models_with_dominating_historical_point = pd.concat(
        [current_only_models, pd.DataFrame([_dominating_historical_version_point_row()])],
        ignore_index=True,
    )

    def prune_and_score(models_dataframe: pd.DataFrame) -> pd.DataFrame:
        pruned = frontier.apply_pruning(
            models_dataframe,
            since_months=999,
            max_layers=99,
            hard_age_cutoff_months=9999,
            pruning_reference_date=FIXED_PRUNING_REFERENCE_DATE,
            cost_metric_column_name=cost_column_name,
            speed_metric_column_name=speed_column_name,
        )
        return frontier.add_standout_metrics(
            pruned,
            cost_metric_column_name=cost_column_name,
            speed_metric_column_name=speed_column_name,
            speed_log=True,
        )

    baseline = prune_and_score(current_only_models)
    with_historical_point = prune_and_score(models_with_dominating_historical_point)

    assert _analysis_pareto_model_names(with_historical_point) == _analysis_pareto_model_names(baseline)
    historical_row = with_historical_point.set_index("name").loc["Dominating Historical Point"]
    assert historical_row["kept"] and historical_row["display_is_pareto"]
    assert not historical_row["is_pareto"]
    for standout_column_name in frontier.STANDOUT_COLUMNS:
        assert math.isnan(historical_row[standout_column_name]), standout_column_name

    # 当期点的分析层号、突出度与归一坐标（依赖 min/max）完全不受影响
    baseline_by_name = baseline.set_index("name")
    with_historical_by_name = with_historical_point.set_index("name")
    for column_name in ["layer", *frontier.STANDOUT_COLUMNS]:
        pd.testing.assert_series_equal(
            baseline_by_name[column_name],
            with_historical_by_name.loc[baseline_by_name.index, column_name],
            check_names=False,
        )


def test_historical_version_points_cannot_push_eligible_near_frontier_recent_point_out_of_display() -> None:
    """D-1 回归：历史口径点把 eligible 点的显示层推高时，eligible 点是否上图仍只由分析层决定。

    构造：一个近期 eligible 点，分析层 = 2（只被一个当期点支配）；再叠 3 个逐层支配它的历史口径点，
    使其显示层 = 5 > max_layers=3。旧规则（只看显示层）会把它剪掉；D-1 要求它仍然上图。
    """
    def model_row(name: str, intelligence: float, cost: float, speed: float, is_current: bool) -> dict:
        return {
            "name": name,
            "creator": "X",
            "release_date": pd.Timestamp("2026-08-01"),
            "intelligence": intelligence,
            COST_TO_RUN_COLUMN_NAME: cost,
            BLENDED_PRICE_COLUMN_NAME: cost,
            EFFECTIVE_SPEED_COLUMN_NAME: speed,
            RAW_OUTPUT_SPEED_COLUMN_NAME: speed,
            "cost_to_run_value_is_from_current_intelligence_index_version": is_current,
            "output_token_count_value_is_from_current_intelligence_index_version": is_current,
        }

    models_dataframe = pd.DataFrame(
        [
            model_row("current dominator", 60.0, 5.0, 200.0, True),
            model_row("eligible near-frontier point", 50.0, 10.0, 100.0, True),
            model_row("historical layer 1", 90.0, 1.0, 900.0, False),
            model_row("historical layer 2", 80.0, 2.0, 800.0, False),
            model_row("historical layer 3", 70.0, 3.0, 700.0, False),
        ]
    )
    pruned = frontier.apply_pruning(
        models_dataframe,
        since_months=18,
        max_layers=3,
        hard_age_cutoff_months=36,
        pruning_reference_date=FIXED_PRUNING_REFERENCE_DATE,
        cost_metric_column_name=COST_TO_RUN_COLUMN_NAME,
        speed_metric_column_name=EFFECTIVE_SPEED_COLUMN_NAME,
    ).set_index("name")

    eligible_point = pruned.loc["eligible near-frontier point"]
    assert eligible_point["layer"] == 2
    assert eligible_point["display_layer"] == 5
    assert bool(eligible_point["kept"])
    assert eligible_point["drop_reason"] == "保留"


def test_blended_raw_variant_lets_historical_version_point_join_analysis() -> None:
    """blended×raw 不依赖版本敏感字段：历史口径点照常参与分析。"""
    models_with_dominating_historical_point = pd.concat(
        [_current_only_models_dataframe(), pd.DataFrame([_dominating_historical_version_point_row()])],
        ignore_index=True,
    )
    pruned = frontier.apply_pruning(
        models_with_dominating_historical_point,
        pruning_reference_date=FIXED_PRUNING_REFERENCE_DATE,
        cost_metric_column_name=BLENDED_PRICE_COLUMN_NAME,
        speed_metric_column_name=RAW_OUTPUT_SPEED_COLUMN_NAME,
    )
    assert pruned["analysis_eligible_for_frontier_3d_metric_variant"].all()
    assert _analysis_pareto_model_names(pruned) == {"Dominating Historical Point"}


def test_standout_metrics_equal_those_computed_on_eligible_kept_subset_alone() -> None:
    models_dataframe = build_frontier_3d_synthetic_fixture_models_dataframe()
    pruned = frontier.apply_pruning(
        models_dataframe, pruning_reference_date=FIXED_PRUNING_REFERENCE_DATE
    )
    scored = frontier.add_standout_metrics(pruned)
    eligible_kept_rows = scored[
        scored["kept"] & scored["analysis_eligible_for_frontier_3d_metric_variant"]
    ]
    assert eligible_kept_rows[frontier.STANDOUT_COLUMNS].notna().any(axis=None)
    ineligible_kept_rows = scored[
        scored["kept"] & ~scored["analysis_eligible_for_frontier_3d_metric_variant"]
    ]
    assert not ineligible_kept_rows.empty
    assert ineligible_kept_rows[frontier.STANDOUT_COLUMNS].isna().all(axis=None)

    eligible_subset_only = pruned[
        pruned["kept"] & pruned["analysis_eligible_for_frontier_3d_metric_variant"]
    ].copy()
    rescored_subset = frontier.add_standout_metrics(eligible_subset_only)
    pd.testing.assert_frame_equal(
        eligible_kept_rows[frontier.STANDOUT_COLUMNS],
        rescored_subset[frontier.STANDOUT_COLUMNS],
    )
    normalized_coordinate_values = eligible_kept_rows[["g_cost", "g_speed", "g_intel"]].to_numpy(float)
    assert ((normalized_coordinate_values > 0) & (normalized_coordinate_values < 1)).all()


def test_achievable_frontier_grid_ignores_analysis_ineligible_points() -> None:
    models_with_dominating_historical_point = pd.concat(
        [_current_only_models_dataframe(), pd.DataFrame([_dominating_historical_version_point_row()])],
        ignore_index=True,
    )
    pruned = frontier.apply_pruning(
        models_with_dominating_historical_point,
        pruning_reference_date=FIXED_PRUNING_REFERENCE_DATE,
    )
    _, _, achievable_intelligence_grid = frontier.achievable_frontier_grid(pruned, nx=8, ny=8)
    assert np.nanmax(achievable_intelligence_grid) < 99.0


def test_achievable_frontier_grid_returns_all_nan_grid_when_no_point_is_analysis_eligible() -> None:
    """R1-11：API 升级到新 family 后默认口径参与分析点为 0，不能对空数组取 min 而崩溃。"""
    pruned = frontier.apply_pruning(
        pd.DataFrame([_dominating_historical_version_point_row()]),
        pruning_reference_date=FIXED_PRUNING_REFERENCE_DATE,
    )
    cost_grid, speed_grid, achievable_intelligence_grid = frontier.achievable_frontier_grid(
        pruned, nx=4, ny=3
    )
    assert achievable_intelligence_grid.shape == (3, 4)
    assert cost_grid.shape == speed_grid.shape == (3, 4)
    assert np.isnan(achievable_intelligence_grid).all()
