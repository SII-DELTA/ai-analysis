#!/usr/bin/env python3
"""离线复算冻结的 AgentPerf 测点，不下载模型或替换缺失实测。"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import math
from pathlib import Path
import re


RESEARCH_DIRECTORY = Path(__file__).resolve().parent
CURRENT_SNAPSHOT_NAME = "artificial-analysis-agentperf-deepseek-v4-pro-0813-current-snapshot.json"
LEGACY_SNAPSHOT_NAME = "artificial-analysis-agentperf-deepseek-v4-pro-0424-h200-legacy-snapshot.json"
CONFIGURATION_SNAPSHOT_NAME = "artificial-analysis-agentperf-configuration-details-snapshot.json"
SERVICE_REQUIREMENTS = ((20, 10), (60, 5))
TARGET_ACCELERATORS = (
    "Ascend 910", "Ascend 910B", "Ascend 910C", "Ascend 950PR",
    "Ascend 950DT", "H100", "H200", "B200",
)


def checked_number(value: object, field_name: str, *, positive: bool = False) -> float:
    """拒绝缺失、布尔值、非有限数和非法符号，防止缺项变成零容量。"""
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        raise ValueError(f"{field_name} 必须是数值，实际为 {value!r}")
    result = float(value)
    if not math.isfinite(result) or result < 0 or (positive and result == 0):
        raise ValueError(f"{field_name} 必须是有限{'正' if positive else '非负'}数")
    return result


def checked_positive_integer(value: object, field_name: str) -> int:
    result = checked_number(value, field_name, positive=True)
    if not result.is_integer():
        raise ValueError(f"{field_name} 必须是正整数")
    return int(result)


def agents_per_megawatt(concurrent_agents: object, total_power_watts: object) -> float:
    """功率输入已经是全部被测加速器之和，不再乘卡数。"""
    concurrent_agents = checked_positive_integer(concurrent_agents, "concurrent_agents")
    total_power_watts = checked_number(total_power_watts, "total_power_watts", positive=True)
    return 1_000_000 * concurrent_agents / total_power_watts


def normalize_public_points(snapshot: dict, configuration_details: dict | None = None) -> list[dict]:
    if snapshot.get("schemaVersion") != 1 or snapshot.get("modelSlug") != "deepseek-v4-pro":
        raise ValueError("不支持的快照结构或模型分组")
    if snapshot.get("modelName") != "DeepSeek V4 Pro 0813 (max)":
        raise ValueError("禁止将其他 checkpoint 或推理档位混入 0813 主表")
    audit = snapshot["indexAssociationAudit"]
    if audit["pagePointIndexesWithoutModelMembership"] or audit["pagePointIndexesWithMultipleModelMemberships"]:
        raise ValueError("原始测点的模型关联不完整或有歧义")
    if audit["totalPagePointsWithModelMembership"] != snapshot["allPagePointCount"]:
        raise ValueError("原始页面测点关联审计数量不一致")
    expected_indexes = set()
    for group in snapshot["targetModelGroups"]:
        for view in group["views"].values():
            expected_indexes.update(view["frontier"])
            expected_indexes.update(item[0] for item in view["nearby"])
    actual_indexes = [point["sourcePointIndex"] for point in snapshot["points"]]
    if set(actual_indexes) != expected_indexes or len(actual_indexes) != len(set(actual_indexes)):
        raise ValueError("主模型公开测点遗漏或重复；必须采集所有视图的 frontier 与 nearby 并集")

    normalized_points = []
    for point in snapshot["points"]:
        configuration = snapshot["configs"][point["configId"]]
        configuration_specification = configuration["spec"]
        accelerator_name = snapshot["systems"][point["systemId"]]["chipShortName"]
        used_count = checked_positive_integer(configuration["acceleratorsUsed"], "acceleratorsUsed")
        measured_count = checked_positive_integer(point["powerGpuCount"], "powerGpuCount")
        if measured_count != used_count:
            raise ValueError(f"{point['sourcePointId']} 功耗覆盖卡数与实际用卡数不一致")
        concurrency = checked_positive_integer(point["concurrency"], "concurrency")
        power_watts = checked_number(point["powerAvgTotalW"], "powerAvgTotalW", positive=True)
        declared_revision = None
        configuration_source = None
        if configuration_details is not None:
            full_configuration = configuration_details["configurationRecordsById"][point["configId"]]["record"]
            if full_configuration["modelLabel"] != snapshot["modelName"] or full_configuration["chipShortName"] != accelerator_name:
                raise ValueError("详细配置的模型/硬件与测点不一致")
            revision_match = re.search(r"deepseek-ai/DeepSeek-V4-Pro-0813\s*@\s*([0-9a-f]{40})", full_configuration["launchCommand"])
            declared_revision = revision_match.group(1) if revision_match else None
            configuration_source = configuration_details["source"]["resolvedUrl"]
        normalized_points.append({
            "source_point_identifier": point["sourcePointId"],
            "source_point_index": point["sourcePointIndex"],
            "configuration_identifier": point["configId"],
            "accelerator_model": accelerator_name,
            "accelerators_used": used_count,
            "power_measurement_accelerator_count": measured_count,
            "model_checkpoint_label": snapshot["modelName"],
            "configuration_declared_checkpoint_revision_hash": declared_revision,
            "checkpoint_identity_evidence": "AA 模型分组和配置命令注释声明；未独立校验逐运行实际加载的权重内容",
            "reasoning_effort": "max",
            "run_date_utc": point["runDate"],
            "concurrent_agents": concurrency,
            "output_speed_p25_tokens_per_second": checked_number(point["outputSpeedByPercentile"]["p25"], "p25"),
            "time_to_first_token_p95_seconds": checked_number(point["ttftP95"], "ttftP95"),
            "measured_accelerator_total_power_watts": power_watts,
            "agents_per_megawatt": agents_per_megawatt(concurrency, power_watts),
            "weight_precision_label": configuration_specification.get("precision"),
            "serving_framework": configuration_specification.get("inferenceEngine"),
            "serving_framework_version": configuration_specification.get("inferenceFrameworkVersion"),
            "configuration_submitted_by": configuration_specification.get("submittedBy"),
            "execution_topology": configuration_specification.get("executionTopology"),
            "comparison_group": "platform_optimized_public_measurement",
            "strict_cross_platform_comparability": "not_established",
            "quality_evidence_status": "未独立验证各运行质量等价；以公开优化实测展示",
            "power_boundary": "accelerator_die_and_hbm_only",
            "evidence_tier": "public_measured_point",
            "source_url": snapshot["source"]["resolvedUrl"],
            "source_response_sha256": snapshot["source"]["responseBodySha256"],
            "source_retrieved_at_utc": snapshot["source"]["retrievalCompletedUtc"],
            "configuration_details_source_url": configuration_source,
        })
    return normalized_points


def passes_service_requirement(point: dict, output_speed_minimum: float, ttft_maximum: float) -> bool:
    return (
        point["output_speed_p25_tokens_per_second"] >= output_speed_minimum
        and point["time_to_first_token_p95_seconds"] <= ttft_maximum
    )


def summarize_service_requirement(points: list[dict], accelerator: str, speed: float, ttft: float) -> dict:
    matching_points = [point for point in points if point["accelerator_model"] == accelerator]
    passing_points = [point for point in matching_points if passes_service_requirement(point, speed, ttft)]
    summary = {
        "accelerator_model": accelerator,
        "output_speed_p25_minimum_tokens_per_second": speed,
        "time_to_first_token_p95_maximum_seconds": ttft,
        "published_point_count": len(matching_points),
        "passing_published_point_count": len(passing_points),
        "status": "published_passing_points" if passing_points else (
            "no_passing_published_point" if matching_points else "no_published_target_model_point"
        ),
        "best_observed_agents_per_megawatt": None,
        "best_efficiency_point_identifier": None,
        "best_efficiency_concurrent_agents": None,
        "best_efficiency_measured_total_power_watts": None,
        "best_efficiency_configuration_identifier": None,
        "maximum_observed_passing_concurrent_agents": None,
        "maximum_concurrency_point_identifier": None,
        "maximum_concurrency_point_agents_per_megawatt": None,
        "maximum_concurrency_measured_total_power_watts": None,
        "maximum_concurrency_configuration_identifier": None,
        "is_proven_capacity_limit": False,
    }
    if passing_points:
        # 相同结果按来源索引稳定选点，不把测试日期差异解释为重复实验。
        best_efficiency = max(passing_points, key=lambda point: (point["agents_per_megawatt"], -point["source_point_index"]))
        maximum_concurrency = max(passing_points, key=lambda point: (point["concurrent_agents"], point["agents_per_megawatt"], -point["source_point_index"]))
        summary.update({
            "best_observed_agents_per_megawatt": best_efficiency["agents_per_megawatt"],
            "best_efficiency_point_identifier": best_efficiency["source_point_identifier"],
            "best_efficiency_concurrent_agents": best_efficiency["concurrent_agents"],
            "best_efficiency_measured_total_power_watts": best_efficiency["measured_accelerator_total_power_watts"],
            "best_efficiency_configuration_identifier": best_efficiency["configuration_identifier"],
            "maximum_observed_passing_concurrent_agents": maximum_concurrency["concurrent_agents"],
            "maximum_concurrency_point_identifier": maximum_concurrency["source_point_identifier"],
            "maximum_concurrency_point_agents_per_megawatt": maximum_concurrency["agents_per_megawatt"],
            "maximum_concurrency_measured_total_power_watts": maximum_concurrency["measured_accelerator_total_power_watts"],
            "maximum_concurrency_configuration_identifier": maximum_concurrency["configuration_identifier"],
        })
    return summary


def verify_historical_reference(snapshot: dict) -> list[dict]:
    if snapshot.get("modelSlug") != "deepseek-v4-pro-0424":
        raise ValueError("历史基准模型必须与 0813 主模型分开")
    historical_rows = []
    for speed, ttft in SERVICE_REQUIREMENTS:
        searches = [search for search in snapshot["capacitySearches"] if search["sloSpeedMin"] == speed]
        if len(searches) != 1:
            raise ValueError(f"历史 {speed} 档搜索缺失或重复")
        search = searches[0]
        if search["model"]["slug"] != "deepseek-v4-pro-0424" or search["model"]["name"] != "DeepSeek V4 Pro 0424 (Max)" or search["chipShortName"] != "H200":
            raise ValueError("历史搜索内部模型、推理档位或硬件身份不符")
        if not search["converged"] or search["sloTtftMax"] != ttft or search["sloSpeedPercentile"] != "p25":
            raise ValueError("历史搜索服务等级或收敛状态不符")
        matching_iterations = [iteration for iteration in snapshot["iterations"] if iteration["rwltCapacitySearchId"] == search["id"]]
        passing_iteration = next(iteration for iteration in matching_iterations if iteration["target"] == search["maxPassingTarget"])
        failing_iteration = next(iteration for iteration in matching_iterations if iteration["target"] == search["firstFailingTarget"])
        if not passing_iteration["passed"] or failing_iteration["passed"]:
            raise ValueError("历史通过/失败边界不符")
        for iteration in matching_iterations:
            computed_passed = iteration["p25OutputSpeed"] >= speed and iteration["p95Ttft"] <= ttft
            if computed_passed != iteration["passed"]:
                raise ValueError("历史迭代通过状态与原始速度/TTFT不一致")
        watts = checked_number(search["runtimePowerKw"], "runtimePowerKw", positive=True) * 1000
        result = agents_per_megawatt(search["maxPassingTarget"], watts)
        if round(result) != {20: 2594, 60: 1786}[speed]:
            raise ValueError("无法复现用户提供的历史 H200 示例")
        historical_rows.append({
            "model_checkpoint_label": search["model"]["name"],
            "search_identifier": search["id"],
            "configuration_identifier": search["configId"],
            "output_speed_p25_minimum_tokens_per_second": speed,
            "time_to_first_token_p95_maximum_seconds": ttft,
            "maximum_passing_concurrent_agents": search["maxPassingTarget"],
            "first_failing_concurrent_agents": search["firstFailingTarget"],
            "measured_accelerator_total_power_watts": watts,
            "agents_per_megawatt": result,
            "source_url": snapshot["source"]["resolvedUrl"],
            "source_retrieved_at_utc": snapshot["source"]["retrievalCompletedUtc"],
            "run_date_utc": search["runDate"],
        })
    return historical_rows


def write_json(path: Path, value: object) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2, allow_nan=False) + "\n", encoding="utf-8")


def write_csv(path: Path, rows: list[dict]) -> None:
    if not rows:
        raise ValueError(f"不能写入无结构的空表 {path.name}")
    with path.open("w", encoding="utf-8", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=list(rows[0]), lineterminator="\n")
        writer.writeheader()
        for row in rows:
            writer.writerow({key: json.dumps(value, ensure_ascii=False, allow_nan=False) if isinstance(value, (dict, list)) else value for key, value in row.items()})


def build_break_even_rows(summary_rows: list[dict]) -> list[dict]:
    """输出未知设备所需达到的阈值，功率网格是自变量而不是硬件预测。"""
    rows = []
    h200_rows = [row for row in summary_rows if row["accelerator_model"] == "H200"]
    for reference in h200_rows:
        if reference["best_observed_agents_per_megawatt"] is None:
            raise ValueError("缺少 H200 参考，不能生成盈亏平衡阈值")
        for total_power_watts in (1000, 4000, 7600, 15200, 30400, 60800, 121600, 972800):
            required_concurrency = reference["best_observed_agents_per_megawatt"] * total_power_watts / 1_000_000
            rows.append({
                "output_speed_p25_minimum_tokens_per_second": reference["output_speed_p25_minimum_tokens_per_second"],
                "time_to_first_token_p95_maximum_seconds": reference["time_to_first_token_p95_maximum_seconds"],
                "reference_accelerator_model": "H200",
                "reference_point_identifier": reference["best_efficiency_point_identifier"],
                "reference_agents_per_megawatt": reference["best_observed_agents_per_megawatt"],
                "assumed_total_accelerator_power_watts": total_power_watts,
                "required_continuous_concurrent_agents": required_concurrency,
                "minimum_integer_concurrent_agents": math.ceil(required_concurrency),
                "evidence_tier": "conditional_break_even_threshold_not_capacity_prediction",
                "power_grid_interpretation": "自变量；如用 950W×N 模组规格，仅是预算情景，不是同边界实测",
            })
    return rows


def build_memory_necessary_condition_tables(theoretical_evidence: dict) -> tuple[list[dict], list[dict]]:
    """计算有明确布局前提的字节预算，不把显存余量换成 Agent 容量。"""
    weight_payload = theoretical_evidence["model_specification"]["checkpoint_payload_bytes_from_index"]
    memory_rows = []
    for decimal_gb in (32, 64, 80, 96, 112, 128, 141, 144, 180, 192):
        capacity_bytes = decimal_gb * 1_000_000_000
        memory_rows.append({
            "hbm_decimal_gigabytes_per_physical_package": decimal_gb,
            "assumed_physical_package_count": 8,
            "published_checkpoint_payload_bytes": weight_payload,
            "aggregate_capacity_bytes": 8 * capacity_bytes,
            "aggregate_capacity_minus_published_payload_bytes": 8 * capacity_bytes - weight_payload,
            "minimum_packages_for_published_payload_only": math.ceil(weight_payload / capacity_bytes),
            "evidence_tier": "conditional_aggregate_memory_necessary_condition",
            "assumption": "发布权重完整驻留、无重编码/裁剪/卸载、单副本；不含KV/工作区/复制/分片约束",
        })
    cache_rows = []
    for context_tokens in (32768, 131072, 1048576):
        for index_bytes in (68, 132):
            main_entries = 61 * min(context_tokens, 128) + 30 * (context_tokens // 4) + 31 * (context_tokens // 128)
            payload = main_entries * 584 + 30 * (context_tokens // 4) * index_bytes
            expected = next(row for row in theoretical_evidence["architecture_aware_kv_payload_model"]["cache_payload_examples"] if row["context_tokens"] == context_tokens and row["index_entry_bytes"] == index_bytes)
            if payload != expected["single_logical_copy_main_and_indexer_payload_bytes"]:
                raise ValueError("KV结构payload推导与独立证据计算不一致")
            cache_rows.append({
                "context_tokens": context_tokens,
                "main_cache_entry_bytes": 584,
                "index_cache_entry_bytes": index_bytes,
                "single_logical_copy_payload_bytes": payload,
                "single_logical_copy_payload_gibibytes": payload / 2**30,
                "evidence_tier": "conditional_cache_layout_payload_not_physical_hbm",
                "assumption": "特定vLLM布局、单逻辑副本；排除分页/尾态/草稿/工作区/复制，不认定为AA或Ascend实际布局",
            })
    return memory_rows, cache_rows


def export_evidence_tables(hardware_evidence: dict, theoretical_evidence: dict, snapshots: list[dict], output_directory: Path) -> None:
    source_rows = [{
        "source_identifier": source["source_id"],
        "source_url": source["url"],
        "source_title": source["title"],
        "publisher": source["publisher"],
        "published_on": source["published_on"],
        "retrieved_at_or_accessed_on": source["accessed_on"],
        "source_locator": source.get("locator"),
        "evidence_scope": source["supported_fact_scope"],
        "response_body_sha256": None,
    } for source in hardware_evidence["sources"]]
    source_rows.extend({
        "source_identifier": f"model-theory-{identifier}",
        "source_url": source["url"],
        "source_title": identifier,
        "publisher": "DeepSeek / vLLM 官方仓库",
        "published_on": None,
        "retrieved_at_or_accessed_on": source["retrieved_at_utc"],
        "source_locator": source.get("evidence_line_numbers"),
        "evidence_scope": "固定 revision 的模型/索引/实现，限理论预算，非硬件实测",
        "response_body_sha256": source["sha256"],
    } for identifier, source in theoretical_evidence["sources"].items())
    source_rows.extend({
        "source_identifier": snapshot["evidenceKind"],
        "source_url": snapshot["source"]["resolvedUrl"],
        "source_title": snapshot["evidenceKind"],
        "publisher": "Artificial Analysis",
        "published_on": None,
        "retrieved_at_or_accessed_on": snapshot["source"]["retrievalCompletedUtc"],
        "source_locator": "嵌入结构化记录；定位方式见对应冻结JSON",
        "evidence_scope": snapshot["source"]["extractionMethod"],
        "response_body_sha256": snapshot["source"]["responseBodySha256"],
    } for snapshot in snapshots)
    write_csv(output_directory / "primary-source-evidence-register.csv", source_rows)
    write_csv(output_directory / "hardware-product-evidence-matrix.csv", [{
        "product_evidence_identifier": product["product_evidence_id"],
        "product_name": product["product_name"],
        "physical_entity_boundary": product["entity_boundary"],
        "commercial_status_as_of_cutoff": product["commercial_status_as_of_cutoff"],
        "memory_and_device_count_evidence": {key: value for key, value in product.items() if any(word in key for word in ("memory_", "physical_", "runtime_", "dies_"))},
        "interconnect_evidence": product.get("interconnect"),
        "power_evidence_with_boundary": product.get("power_evidence"),
        "missing_evidence": product["missing_evidence"],
        "source_identifiers": product["source_ids"],
    } for product in hardware_evidence["hardware_product_evidence"]])


def recompute(source_directory: Path, output_directory: Path, supporting_evidence_directory: Path = RESEARCH_DIRECTORY) -> dict:
    current_path = source_directory / CURRENT_SNAPSHOT_NAME
    legacy_path = source_directory / LEGACY_SNAPSHOT_NAME
    configuration_path = source_directory / CONFIGURATION_SNAPSHOT_NAME
    theoretical_path = supporting_evidence_directory / "model-memory-and-theoretical-analysis-evidence.json"
    hardware_path = supporting_evidence_directory / "hardware-product-and-deployment-evidence.json"
    methodology_path = source_directory / "artificial-analysis-agentperf-methodology-snapshot.json"
    current = json.loads(current_path.read_text(encoding="utf-8"))
    legacy = json.loads(legacy_path.read_text(encoding="utf-8"))
    configurations = json.loads(configuration_path.read_text(encoding="utf-8"))
    theoretical = json.loads(theoretical_path.read_text(encoding="utf-8"))
    hardware = json.loads(hardware_path.read_text(encoding="utf-8"))
    methodology = json.loads(methodology_path.read_text(encoding="utf-8"))
    points = normalize_public_points(current, configurations)
    historical = verify_historical_reference(legacy)
    summaries = [summarize_service_requirement(points, accelerator, speed, ttft) for accelerator in TARGET_ACCELERATORS for speed, ttft in SERVICE_REQUIREMENTS]
    break_even = build_break_even_rows(summaries)
    memory_rows, cache_rows = build_memory_necessary_condition_tables(theoretical)
    output_directory.mkdir(parents=True, exist_ok=True)
    write_csv(output_directory / "normalized-public-agentperf-measured-points.csv", points)
    write_csv(output_directory / "platform-optimized-observed-energy-efficiency-summary.csv", summaries)
    write_csv(output_directory / "historical-h200-reference-recalculation.csv", historical)
    write_csv(output_directory / "h200-equivalent-energy-efficiency-required-concurrency.csv", break_even)
    write_csv(output_directory / "published-checkpoint-aggregate-memory-necessary-conditions.csv", memory_rows)
    write_csv(output_directory / "conditional-main-cache-and-indexer-payload.csv", cache_rows)
    export_evidence_tables(hardware, theoretical, [current, legacy, configurations, methodology], output_directory)
    result = {
        "schema_version": 1,
        "model_checkpoint_label": current["modelName"],
        "service_requirement_origin": "本研究沿用 20/60 tokens/s 与 P95 TTFT 10/5秒，不是新版 AA 固定分档",
        "published_point_count": len(points),
        "configuration_count": len(current["configs"]),
        "strict_cross_platform_comparison": {
            "status": "not_established",
            "reasons": ["缺少昇腾与 H100 的同模型 AgentPerf 测点", "运行间量化/KV格式、缓存层级及软件配置未形成统一控制组", "配置声明同一权重revision，但缺逐运行加载内容核验与同负载质量等价验证"],
        },
        "platform_optimized_summaries": summaries,
        "historical_reference": historical,
        "interpretation": "离线筛选公开测点；不是新硬件实测，不宣称未测并发的真实上限或等质量纯芯片排名",
        "source_snapshot_file_sha256": {path.name: hashlib.sha256(path.read_bytes()).hexdigest() for path in (current_path, legacy_path, configuration_path, methodology_path, theoretical_path, hardware_path)},
    }
    write_json(output_directory / "research-calculation-results.json", result)
    artifacts = sorted(path for path in output_directory.iterdir() if path.suffix in {".csv", ".json"} and path.name != "calculation-artifact-manifest.json")
    write_json(output_directory / "calculation-artifact-manifest.json", {
        "source_retrieved_at_utc": current["source"]["retrievalCompletedUtc"],
        "artifacts_sha256": {path.name: hashlib.sha256(path.read_bytes()).hexdigest() for path in artifacts},
    })
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-directory", type=Path, default=RESEARCH_DIRECTORY / "source-evidence", help="冻结证据目录")
    parser.add_argument("--supporting-evidence-directory", type=Path, default=RESEARCH_DIRECTORY, help="产品与模型理论证据所在目录")
    parser.add_argument("--output-directory", type=Path, default=RESEARCH_DIRECTORY / "generated-results", help="复算产物目录")
    arguments = parser.parse_args()
    result = recompute(arguments.source_directory, arguments.output_directory, arguments.supporting_evidence_directory)
    print(f"已复算 {result['published_point_count']} 个公开测点、{result['configuration_count']} 个配置；历史示例核验通过。")
    for row in result["platform_optimized_summaries"]:
        if row["best_observed_agents_per_megawatt"] is not None:
            print(f"{row['accelerator_model']}，P25≥{row['output_speed_p25_minimum_tokens_per_second']}：{row['best_observed_agents_per_megawatt']:.2f} agents/MW")


if __name__ == "__main__":
    main()
