#!/usr/bin/env python3
"""自动检查研究产物的来源关联、离线复算、报告数字和本地链接。"""

import csv
import hashlib
import json
import math
from pathlib import Path
import re
import subprocess
import sys
import tempfile

from recompute_agent_concurrency_energy_efficiency import RESEARCH_DIRECTORY, recompute


def require(condition, message):
    if not condition:
        raise ValueError(message)


def main():
    root = RESEARCH_DIRECTORY
    generated = root / "generated-results"
    hardware = json.loads((root / "hardware-product-and-deployment-evidence.json").read_text(encoding="utf-8"))
    source_identifiers = [source["source_id"] for source in hardware["sources"]]
    require(len(source_identifiers) == len(set(source_identifiers)), "产品来源ID重复")
    known_sources = set(source_identifiers)
    for section in ("hardware_product_evidence", "model_deployment_and_quality_evidence", "material_conflicts_and_missing_evidence"):
        for record in hardware[section]:
            require(set(record.get("source_ids", [])) <= known_sources, f"{section}含未知来源ID")

    manifest = json.loads((generated / "calculation-artifact-manifest.json").read_text(encoding="utf-8"))
    for name, digest in manifest["artifacts_sha256"].items():
        require(hashlib.sha256((generated / name).read_bytes()).hexdigest() == digest, f"计算产物hash不符：{name}")
    result = json.loads((generated / "research-calculation-results.json").read_text(encoding="utf-8"))
    for name, digest in result["source_snapshot_file_sha256"].items():
        source_path = root / name if (root / name).exists() else root / "source-evidence" / name
        require(hashlib.sha256(source_path.read_bytes()).hexdigest() == digest, f"源证据hash不符：{name}")
    with tempfile.TemporaryDirectory(prefix="agent-energy-artifact-reproduction-") as directory:
        recompute(root / "source-evidence", Path(directory))
        for name in [*manifest["artifacts_sha256"], "calculation-artifact-manifest.json"]:
            require((Path(directory) / name).read_bytes() == (generated / name).read_bytes(), f"离线复算字节不一致：{name}")

    report = (root / "README.md").read_text(encoding="utf-8")
    checked_local_links = 0
    for document in root.glob("*.md"):
        for link in re.findall(r"\]\(([^)]+)\)", document.read_text(encoding="utf-8")):
            if "://" in link or link.startswith("#"):
                continue
            target = document.parent / link.split("#")[0]
            # 当前验证成功后才写入自己的回执；其他本地链接必须事先存在。
            require(target.exists() or target == root / "research-validation-results.json", f"本地链接不存在：{document.name} -> {link}")
            checked_local_links += 1

    snapshot = json.loads((root / "source-evidence" / "artificial-analysis-agentperf-deepseek-v4-pro-0813-current-snapshot.json").read_text(encoding="utf-8"))
    raw_points = snapshot["points"]
    winning_points = []
    for hardware_name in ("H200", "B200"):
        for speed, ttft in ((20, 10), (60, 5)):
            eligible = [point for point in raw_points if snapshot["systems"][point["systemId"]]["chipShortName"] == hardware_name and point["outputSpeedByPercentile"]["p25"] >= speed and point["ttftP95"] <= ttft]
            winner = max(eligible, key=lambda point: point["concurrency"] / point["powerAvgTotalW"])
            independently_computed = winner["concurrency"] * 1_000_000 / winner["powerAvgTotalW"]
            summary = next(row for row in result["platform_optimized_summaries"] if row["accelerator_model"] == hardware_name and row["output_speed_p25_minimum_tokens_per_second"] == speed)
            require(math.isclose(independently_computed, summary["best_observed_agents_per_megawatt"], rel_tol=1e-12), "独立复算与汇总不符")
            require(f"{independently_computed:,.4f}" in report, "报告缺少对应四位小数结果或数字已漂移")
            winning_points.append({"accelerator_model": hardware_name, "minimum_speed": speed, "source_point_index": winner["sourcePointIndex"], "agents_per_megawatt": independently_computed})
    for speed in (20, 60):
        h200 = next(row for row in winning_points if row["accelerator_model"] == "H200" and row["minimum_speed"] == speed)
        b200 = next(row for row in winning_points if row["accelerator_model"] == "B200" and row["minimum_speed"] == speed)
        require(f"{b200['agents_per_megawatt'] / h200['agents_per_megawatt']:.2f}×" in report, "报告比值与结果不符")
    for point in raw_points:
        configuration = snapshot["configs"][point["configId"]]
        require(configuration["acceleratorsUsed"] == point["powerGpuCount"], "实际用卡与功耗覆盖卡数不符")
    for figure in root.glob("figures/*.png"):
        require(figure.read_bytes().startswith(b"\x89PNG\r\n\x1a\n"), f"无效PNG：{figure.name}")
    require(len(list(root.glob("figures/*.png"))) == 2, "缺少研究PNG图")
    require(len(list(root.glob("figures/*.svg"))) == 2, "缺少研究SVG图")

    tests = subprocess.run([sys.executable, "-m", "unittest", "discover", "-s", str(root), "-p", "test_*.py", "-v"], capture_output=True, text=True)
    require(tests.returncode == 0, tests.stdout + tests.stderr)
    test_count = int(re.search(r"Ran (\d+) tests", tests.stderr).group(1))
    validation = {
        "validation_status": "passed",
        "validation_scope": "本地研究证据与离线计算，不代表硬件实测、部署或正式RVF",
        "unit_test_count": test_count,
        "hardware_primary_source_count": len(hardware["sources"]),
        "hardware_product_evidence_count": len(hardware["hardware_product_evidence"]),
        "deployment_evidence_count": len(hardware["model_deployment_and_quality_evidence"]),
        "published_point_count": len(raw_points),
        "linked_configuration_count": len(snapshot["configs"]),
        "calculation_artifact_hashes_verified": len(manifest["artifacts_sha256"]),
        "all_calculation_artifacts_reproduced_byte_for_byte": True,
        "source_snapshot_hashes_verified": len(result["source_snapshot_file_sha256"]),
        "local_markdown_link_count_checked": checked_local_links,
        "independently_recomputed_winning_points": winning_points,
        "historical_reference_rounded_agents_per_megawatt": [round(row["agents_per_megawatt"]) for row in result["historical_reference"]],
        "figure_file_checks": "2 PNG签名与2 SVG文件存在；视觉检查另见验证记录",
        "network_calls_during_validation": 0,
    }
    (root / "research-validation-results.json").write_text(json.dumps(validation, ensure_ascii=False, indent=2, allow_nan=False) + "\n", encoding="utf-8")
    print(f"研究验证通过：{test_count}项测试、{len(raw_points)}个公开测点、{len(manifest['artifacts_sha256'])}个计算产物hash与本地链接。")


if __name__ == "__main__":
    main()
