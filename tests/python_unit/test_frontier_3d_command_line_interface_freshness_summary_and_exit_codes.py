"""CLI（规格第 6 节）：新参数透传、剪枝参考日期、新鲜度摘要、缺维告警、V-3 单列、
读取已有契约时忽略参数的提示、`--export` 失败的非零退出码。

`fetch_data.build_dataframe` 被替换为返回合成 fixture，不联网、不读 key、不写共享目录。
"""
from __future__ import annotations

import json
from pathlib import Path

import pytest

from src import cli, fetch_data, visualize
from src import frontier_3d_visualization_dataset_builder as dataset_builder
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import (
    FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE,
    build_frontier_3d_synthetic_fixture_models_dataframe,
)


def _synthetic_fixture_models_dataframe_with_full_build_dataframe_attrs():
    models_dataframe = build_frontier_3d_synthetic_fixture_models_dataframe()
    models_dataframe.attrs[fetch_data.MODELS_DATAFRAME_ATTRS_KEY_DATA_QUALITY_GUARDRAIL_RESULTS] = [
        {
            "guardrail_name": "api_language_model_count_at_least_minimum",
            "guardrail_status": fetch_data.DATA_QUALITY_GUARDRAIL_STATUS_PASSED,
            "guardrail_detail_text": "合成 fixture 的护栏结果",
        }
    ]
    models_dataframe.attrs[fetch_data.MODELS_DATAFRAME_ATTRS_KEY_EMBEDDED_MODEL_CATALOG_LOAD_SUMMARY] = {
        "accepted_partition_intelligence_index_version": "4.3.2",
        "accepted_partition_captured_at_utc": "2026-09-23T05:52:49Z",
        "accepted_partition_record_count": 22,
        "invalid_page_file_names": ["synthetic-truncated-page.html"],
        "partition_summaries": [
            {
                "intelligence_index_version_family": "4.3",
                "most_specific_intelligence_index_version": "4.3.2",
                "cache_file_modification_date_utc": "2026-09-23",
                "page_count": 54,
                "record_with_output_token_count_count": 166,
                "intelligence_agreement_rate_with_api": 1.0,
                "is_accepted": True,
                "rejection_reasons": [],
            }
        ],
    }
    return models_dataframe


@pytest.fixture
def command_line_calls_recorded_with_synthetic_models_dataframe(monkeypatch, tmp_path: Path) -> dict:
    recorded_calls: dict = {"build_dataframe_keyword_arguments": None, "saved_csv_paths": []}

    def fake_build_dataframe(refresh: bool = False, **keyword_arguments):
        recorded_calls["build_dataframe_keyword_arguments"] = {"refresh": refresh, **keyword_arguments}
        return _synthetic_fixture_models_dataframe_with_full_build_dataframe_attrs()

    def fake_save(models_dataframe, processed_models_csv_output_path=None):
        recorded_calls["saved_csv_paths"].append(processed_models_csv_output_path)
        output_path = Path(processed_models_csv_output_path or tmp_path / "default-models.csv")
        output_path.write_text("synthetic\n", encoding="utf-8")
        return output_path

    monkeypatch.setattr(fetch_data, "build_dataframe", fake_build_dataframe)
    monkeypatch.setattr(fetch_data, "save", fake_save)
    return recorded_calls


def _run_command_line_and_capture_standard_output(capsys, command_line_arguments: list[str]) -> str:
    cli.main(command_line_arguments)
    return capsys.readouterr().out


def test_command_line_passes_new_switches_and_writes_processed_models_csv_to_requested_path(
    command_line_calls_recorded_with_synthetic_models_dataframe: dict,
    tmp_path: Path,
    capsys,
) -> None:
    processed_models_csv_output_path = tmp_path / "models.csv"
    _run_command_line_and_capture_standard_output(
        capsys,
        [
            "--out",
            str(tmp_path / "frontier_3d.html"),
            "--processed-models-csv-out",
            str(processed_models_csv_output_path),
            "--allow-artificial-analysis-website-page-fetch",
            "--use-previous-run-processed-models-csv-as-fallback",
        ],
    )
    assert command_line_calls_recorded_with_synthetic_models_dataframe["build_dataframe_keyword_arguments"] == {
        "refresh": False,
        "allow_artificial_analysis_website_page_fetch": True,
        "use_previous_run_processed_models_csv_as_fallback": True,
        "artificial_analysis_raw_data_directory": None,
        # 「上次产物」缺省读本次要覆盖的 --processed-models-csv-out（R1-07）
        "previous_run_processed_models_csv_path": processed_models_csv_output_path,
    }
    assert command_line_calls_recorded_with_synthetic_models_dataframe["saved_csv_paths"] == [
        processed_models_csv_output_path
    ]
    assert (tmp_path / "frontier_3d.html").is_file()


def test_command_line_derives_pruning_reference_date_from_api_fetched_at_or_explicit_argument(
    command_line_calls_recorded_with_synthetic_models_dataframe: dict,
    tmp_path: Path,
    capsys,
) -> None:
    _run_command_line_and_capture_standard_output(capsys, ["--out", str(tmp_path / "derived" / "frontier_3d.html")])
    derived_dataset = json.loads(
        (tmp_path / "derived" / dataset_builder.DEFAULT_FRONTIER_3D_VISUALIZATION_DATASET_FILENAME).read_text(
            encoding="utf-8"
        )
    )
    assert (
        derived_dataset["artificial_analysis_data_provenance"]["pruning_reference_date"]
        == FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE
    )
    assert derived_dataset["data_date"] == FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE

    _run_command_line_and_capture_standard_output(
        capsys,
        [
            "--out",
            str(tmp_path / "explicit" / "frontier_3d.html"),
            "--pruning-reference-date",
            "2026-01-31",
        ],
    )
    explicit_dataset = json.loads(
        (tmp_path / "explicit" / dataset_builder.DEFAULT_FRONTIER_3D_VISUALIZATION_DATASET_FILENAME).read_text(
            encoding="utf-8"
        )
    )
    assert explicit_dataset["artificial_analysis_data_provenance"]["pruning_reference_date"] == "2026-01-31"
    # data_date 仍是 API 抓取日；剪枝参考日期只影响剪枝
    assert explicit_dataset["data_date"] == FRONTIER_3D_SYNTHETIC_FIXTURE_PRUNING_REFERENCE_DATE


def test_command_line_rejects_malformed_pruning_reference_date(capsys) -> None:
    with pytest.raises(SystemExit) as raised_system_exit:
        cli.main(["--pruning-reference-date", "2026/09/23"])
    assert raised_system_exit.value.code == 2
    assert "YYYY-MM-DD" in capsys.readouterr().err


def test_command_line_prints_freshness_summary_missing_dimension_warning_and_v3_list(
    command_line_calls_recorded_with_synthetic_models_dataframe: dict,
    tmp_path: Path,
    capsys,
) -> None:
    standard_output = _run_command_line_and_capture_standard_output(
        capsys, ["--out", str(tmp_path / "frontier_3d.html")]
    )
    for expected_summary_fragment in (
        "数据新鲜度摘要",
        "API 抓取时间：2026-09-23T05:50:32Z（按缓存文件修改时间推断）",
        "当期智能指数版本：v4.3.2",
        "成本来源：API 当期 ",
        "token 来源：目录当期 ",
        "内嵌目录分区：v4.3.2，截至 2026-09-23T05:52:49Z，54 页，无效页 1 个（synthetic-truncated-page.html）",
        "网页抓取：已暂停（D-12），目录缓存截至 2026-09-23T05:52:49Z",
        "剪枝参考日期：2026-09-23（API 抓取日期）",
        "[通过] api_language_model_count_at_least_minimum",
    ):
        assert expected_summary_fragment in standard_output, expected_summary_fragment
    for variant_key in ("effective__effective", "effective__raw", "blended__effective", "blended__raw"):
        assert f"{variant_key}（" in standard_output
    assert "分析 Pareto" in standard_output and "历史口径" in standard_output

    assert "智能前 20 中未上图" in standard_output
    assert "Speedless Genius (Max Effort)（70.0）：缺维度：速度" in standard_output
    assert "1 个模型缺当期 token（不在目录分区中），在有效速度口径缺席" in standard_output
    assert "Brand New Model (V-3)" in standard_output


def test_reading_existing_dataset_warns_that_pruning_and_metric_arguments_are_ignored(
    tmp_path: Path,
    capsys,
) -> None:
    existing_dataset_path = tmp_path / "existing_frontier_3d_visualization_dataset.json"
    dataset_builder.write_frontier_3d_visualization_dataset(
        dataset_builder.build_frontier_3d_visualization_dataset(
            build_frontier_3d_synthetic_fixture_models_dataframe(),
            since_months=18,
            max_layers=3,
            hard_age_cutoff_months=36,
            speed_scale="log",
        ),
        existing_dataset_path,
    )
    standard_output = _run_command_line_and_capture_standard_output(
        capsys,
        [
            "--frontier-3d-visualization-dataset-in",
            str(existing_dataset_path),
            "--out",
            str(tmp_path / "rerendered.html"),
            "--since-months",
            "6",
            "--speed-scale",
            "linear",
            "--pruning-reference-date",
            "2026-01-01",
        ],
    )
    assert "读取已有契约时这些参数被忽略" in standard_output
    for ignored_argument_name in ("--since-months", "--speed-scale", "--pruning-reference-date"):
        assert ignored_argument_name in standard_output
    assert "--layers" not in standard_output.split("读取已有契约时这些参数被忽略")[1].splitlines()[0]
    assert (tmp_path / "rerendered.html").is_file()


def test_reading_existing_dataset_without_pruning_arguments_prints_no_ignored_argument_hint(
    tmp_path: Path,
    capsys,
) -> None:
    existing_dataset_path = tmp_path / "existing_frontier_3d_visualization_dataset.json"
    dataset_builder.write_frontier_3d_visualization_dataset(
        dataset_builder.build_frontier_3d_visualization_dataset(
            build_frontier_3d_synthetic_fixture_models_dataframe(),
            since_months=18,
            max_layers=3,
            hard_age_cutoff_months=36,
            speed_scale="log",
        ),
        existing_dataset_path,
    )
    standard_output = _run_command_line_and_capture_standard_output(
        capsys,
        [
            "--frontier-3d-visualization-dataset-in",
            str(existing_dataset_path),
            "--out",
            str(tmp_path / "rerendered.html"),
        ],
    )
    assert "读取已有契约时这些参数被忽略" not in standard_output


def test_static_export_failure_exits_with_non_zero_status(
    command_line_calls_recorded_with_synthetic_models_dataframe: dict,
    monkeypatch,
    tmp_path: Path,
) -> None:
    monkeypatch.setattr(visualize, "export_static", lambda figure, output_path: None)
    with pytest.raises(SystemExit) as raised_system_exit:
        cli.main(["--out", str(tmp_path / "frontier_3d.html"), "--export", "png"])
    assert raised_system_exit.value.code not in (0, None)


# ----------------------------------------------------------------------------- 审查修复
def test_command_line_passes_raw_data_directory_and_previous_run_csv_path_defaulting_to_csv_out(
    command_line_calls_recorded_with_synthetic_models_dataframe: dict,
    tmp_path: Path,
    capsys,
) -> None:
    """R1-07：原始数据目录与上次 models.csv 读取路径可重定向；后者缺省同 --processed-models-csv-out。"""
    processed_models_csv_output_path = tmp_path / "scratch-models.csv"
    rehearsal_raw_data_directory_path = tmp_path / "rehearsal-raw"
    _run_command_line_and_capture_standard_output(
        capsys,
        [
            "--out",
            str(tmp_path / "frontier_3d.html"),
            "--processed-models-csv-out",
            str(processed_models_csv_output_path),
            "--artificial-analysis-raw-data-directory",
            str(rehearsal_raw_data_directory_path),
        ],
    )
    recorded_keyword_arguments = command_line_calls_recorded_with_synthetic_models_dataframe[
        "build_dataframe_keyword_arguments"
    ]
    assert recorded_keyword_arguments["artificial_analysis_raw_data_directory"] == (
        rehearsal_raw_data_directory_path
    )
    assert recorded_keyword_arguments["previous_run_processed_models_csv_path"] == (
        processed_models_csv_output_path
    )

    explicit_previous_run_csv_path = tmp_path / "explicit-previous-run.csv"
    _run_command_line_and_capture_standard_output(
        capsys,
        [
            "--out",
            str(tmp_path / "frontier_3d.html"),
            "--processed-models-csv-out",
            str(processed_models_csv_output_path),
            "--previous-run-processed-models-csv-in",
            str(explicit_previous_run_csv_path),
        ],
    )
    assert command_line_calls_recorded_with_synthetic_models_dataframe["build_dataframe_keyword_arguments"][
        "previous_run_processed_models_csv_path"
    ] == explicit_previous_run_csv_path


def test_v3_list_reports_rejected_catalog_partition_instead_of_blaming_paused_page_fetch(
    command_line_calls_recorded_with_synthetic_models_dataframe: dict,
    monkeypatch,
    tmp_path: Path,
    capsys,
) -> None:
    """R1-05：目录分区整体被拒时，全部行都「不在分区」，不能把原因归到暂停抓取。"""

    def fake_build_dataframe_with_rejected_catalog_partition(refresh: bool = False, **keyword_arguments):
        models_dataframe = _synthetic_fixture_models_dataframe_with_full_build_dataframe_attrs()
        models_dataframe["is_absent_from_accepted_embedded_model_catalog_partition"] = True
        models_dataframe.attrs[fetch_data.MODELS_DATAFRAME_ATTRS_KEY_EMBEDDED_MODEL_CATALOG_LOAD_SUMMARY] = {
            "accepted_partition_intelligence_index_version": None,
            "accepted_partition_captured_at_utc": None,
            "accepted_partition_record_count": 0,
            "invalid_page_file_names": [],
            "partition_summaries": [
                {
                    "intelligence_index_version_family": "4.3",
                    "most_specific_intelligence_index_version": "4.3.2",
                    "cache_file_modification_date_utc": "2026-09-23",
                    "page_count": 54,
                    "record_with_output_token_count_count": 166,
                    "intelligence_agreement_rate_with_api": 0.9791,
                    "is_accepted": False,
                    "rejection_reasons": ["与 API 智能分一致率 97.9% < 99%"],
                }
            ],
        }
        return models_dataframe

    monkeypatch.setattr(fetch_data, "build_dataframe", fake_build_dataframe_with_rejected_catalog_partition)
    standard_output = _run_command_line_and_capture_standard_output(
        capsys, ["--out", str(tmp_path / "frontier_3d.html")]
    )
    v3_output_lines = [line for line in standard_output.splitlines() if line.startswith("V-3")]
    assert v3_output_lines, standard_output
    assert "因暂停抓取" not in "\n".join(v3_output_lines)
    assert "没有被接受的内嵌目录分区" in v3_output_lines[0]
    assert "与 API 智能分一致率 97.9% < 99%" in v3_output_lines[0]


def test_v3_list_keeps_only_models_without_any_effective_speed_and_counts_historical_display_separately(
    command_line_calls_recorded_with_synthetic_models_dataframe: dict,
    monkeypatch,
    tmp_path: Path,
    capsys,
) -> None:
    """R1-05：不在分区但有 v4.1 快照 token 的模型仍以历史口径显示，不算「在有效速度口径缺席」。"""

    def fake_build_dataframe_with_absent_model_having_snapshot_token(refresh: bool = False, **keyword_arguments):
        models_dataframe = _synthetic_fixture_models_dataframe_with_full_build_dataframe_attrs()
        models_dataframe.loc[
            models_dataframe["name"] == "Kimi K3", "is_absent_from_accepted_embedded_model_catalog_partition"
        ] = True
        return models_dataframe

    monkeypatch.setattr(
        fetch_data, "build_dataframe", fake_build_dataframe_with_absent_model_having_snapshot_token
    )
    standard_output = _run_command_line_and_capture_standard_output(
        capsys, ["--out", str(tmp_path / "frontier_3d.html")]
    )
    v3_section_text = standard_output[standard_output.index("V-3") :]
    assert "1 个模型缺当期 token（不在目录分区中），在有效速度口径缺席" in v3_section_text
    assert "Brand New Model (V-3)" in v3_section_text
    assert "另有 1 个不在目录分区的模型以 v4.1 等历史口径 token 显示" in v3_section_text
    assert "  - Kimi K3" not in v3_section_text


def test_freshness_summary_states_version_and_earliest_capture_date_of_non_current_fallback_values(
    command_line_calls_recorded_with_synthetic_models_dataframe: dict,
    tmp_path: Path,
    capsys,
) -> None:
    """R4-08：回退值要写出所属版本与最早采集日期，只看摘要也知道历史值有多旧。"""
    standard_output = _run_command_line_and_capture_standard_output(
        capsys, ["--out", str(tmp_path / "frontier_3d.html")]
    )
    cost_source_line = next(line for line in standard_output.splitlines() if line.startswith("成本来源："))
    token_source_line = next(line for line in standard_output.splitlines() if line.startswith("token 来源："))
    for value_source_line in (cost_source_line, token_source_line):
        assert "非当期回退（版本化快照） 2（v4.1，最早采集 2026-07-01）" in value_source_line, value_source_line


def test_reading_existing_dataset_also_names_ignored_data_fetch_switches(
    tmp_path: Path,
    capsys,
) -> None:
    """R1-09：读已有契约时 --refresh 等取数开关同样被忽略，必须提示，免得误以为刷新过。"""
    existing_dataset_path = tmp_path / "existing_frontier_3d_visualization_dataset.json"
    dataset_builder.write_frontier_3d_visualization_dataset(
        dataset_builder.build_frontier_3d_visualization_dataset(
            build_frontier_3d_synthetic_fixture_models_dataframe(),
            since_months=18,
            max_layers=3,
            hard_age_cutoff_months=36,
            speed_scale="log",
        ),
        existing_dataset_path,
    )
    standard_output = _run_command_line_and_capture_standard_output(
        capsys,
        [
            "--frontier-3d-visualization-dataset-in",
            str(existing_dataset_path),
            "--out",
            str(tmp_path / "rerendered.html"),
            "--refresh",
            "--allow-artificial-analysis-website-page-fetch",
            "--use-previous-run-processed-models-csv-as-fallback",
        ],
    )
    ignored_hint_line = standard_output.split("读取已有契约时这些参数被忽略")[1].splitlines()[0]
    for ignored_argument_flag in (
        "--refresh",
        "--allow-artificial-analysis-website-page-fetch",
        "--use-previous-run-processed-models-csv-as-fallback",
    ):
        assert ignored_argument_flag in ignored_hint_line


def test_freshness_summary_counts_catalog_tokens_demoted_per_uuid_separately_from_current_catalog_tokens() -> None:
    """R1-01 (a)：值来源仍是目录、但因该模型智能分与当期 API 不一致被逐 UUID 降为非当期的 token，

    在「token 来源」里单独计数，不混进「目录当期」。"""
    models_dataframe = _synthetic_fixture_models_dataframe_with_full_build_dataframe_attrs()
    catalog_token_row_positions = [
        row_position
        for row_position, value_source in enumerate(models_dataframe["output_token_count_value_source"])
        if value_source
        == fetch_data.OUTPUT_TOKEN_COUNT_VALUE_SOURCE_ARTIFICIAL_ANALYSIS_EMBEDDED_MODEL_CATALOG_ACCEPTED_PARTITION
    ]
    demoted_row_position = catalog_token_row_positions[0]
    models_dataframe["output_token_count_value_non_current_reason_code"] = [
        (
            "output_token_count_value_catalog_intelligence_disagrees_with_current_api_intelligence"
            if row_position == demoted_row_position
            else None
        )
        for row_position in range(len(models_dataframe))
    ]
    token_source_summary_line = next(
        summary_line
        for summary_line in cli._freshness_summary_lines_for_models_dataframe(models_dataframe)
        if summary_line.startswith("token 来源：")
    )
    assert f"目录当期 {len(catalog_token_row_positions) - 1}" in token_source_summary_line
    assert "目录（智能分与当期 API 不一致，逐 UUID 降为非当期） 1" in token_source_summary_line


def test_command_line_writes_report_and_static_export_when_initial_effective_speed_variant_has_no_model(
    command_line_calls_recorded_with_synthetic_models_dataframe: dict,
    monkeypatch,
    tmp_path: Path,
    capsys,
) -> None:
    """RVF-002 / R1-03：有效速度全缺（token 版本没有归一常数）时，缺省初始口径 effective__effective
    是合法空场景；HTML、契约与 `--export` 静态导出照常完成，原始速度口径照常显示模型。"""

    def fake_build_dataframe_with_every_effective_speed_missing(refresh: bool = False, **keyword_arguments):
        models_dataframe = _synthetic_fixture_models_dataframe_with_full_build_dataframe_attrs()
        models_dataframe["output_token_count_value_intelligence_index_version"] = "4.4"
        models_dataframe["eff_speed"] = float("nan")
        return models_dataframe

    static_export_figures_by_output_path: dict = {}

    def fake_export_static(figure, output_path):
        static_export_figures_by_output_path[output_path] = figure
        return output_path

    monkeypatch.setattr(fetch_data, "build_dataframe", fake_build_dataframe_with_every_effective_speed_missing)
    monkeypatch.setattr(visualize, "export_static", fake_export_static)
    output_html_path = tmp_path / "frontier_3d.html"
    standard_output = _run_command_line_and_capture_standard_output(
        capsys, ["--out", str(output_html_path), "--export", "png"]
    )

    assert output_html_path.exists()
    dataset = dataset_builder.read_frontier_3d_visualization_dataset(
        dataset_builder.default_frontier_3d_visualization_dataset_path_for_html(output_html_path)
    )
    assert dataset["initial_variant_key"] == "effective__effective"
    assert dataset["metric_variants"]["effective__effective"]["kept_model_count"] == 0
    assert dataset["metric_variants"]["effective__raw"]["kept_model_count"] > 0
    assert "effective__effective（有效运行成本 × 有效速度）：显示 0" in standard_output
    assert list(static_export_figures_by_output_path) == [output_html_path.with_suffix(".png")]
