"""验证研究结论会受到影响的边界：功率单位、缺项、模型身份及测点选择。"""

import copy
import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

from recompute_agent_concurrency_energy_efficiency import (
    CURRENT_SNAPSHOT_NAME,
    LEGACY_SNAPSHOT_NAME,
    RESEARCH_DIRECTORY,
    agents_per_megawatt,
    normalize_public_points,
    passes_service_requirement,
    recompute,
    summarize_service_requirement,
    verify_historical_reference,
)


class AgentEnergyEfficiencyResearchChecks(unittest.TestCase):
    def setUp(self):
        source_path = RESEARCH_DIRECTORY / "source-evidence" / CURRENT_SNAPSHOT_NAME
        self.snapshot = json.loads(source_path.read_text(encoding="utf-8"))

    def test_total_watts_are_not_multiplied_by_accelerator_count(self):
        self.assertAlmostEqual(agents_per_megawatt(11, 4240), 2594.3396226415093)
        points = normalize_public_points(self.snapshot)
        measured = next(point for point in points if point["source_point_index"] == 340)
        self.assertAlmostEqual(measured["agents_per_megawatt"], 4751.302230976338, places=6)
        self.assertEqual(measured["power_measurement_accelerator_count"], 8)

    def test_missing_nonfinite_or_invalid_power_is_never_zero_capacity(self):
        for invalid_power in (None, 0, -1, float("nan"), float("inf"), True):
            with self.subTest(invalid_power=invalid_power), self.assertRaises(ValueError):
                agents_per_megawatt(8, invalid_power)
        with self.assertRaises(ValueError):
            agents_per_megawatt(1.5, 4000)

    def test_both_speed_and_ttft_requirements_apply_including_exact_boundary(self):
        point = {"output_speed_p25_tokens_per_second": 60, "time_to_first_token_p95_seconds": 5}
        self.assertTrue(passes_service_requirement(point, 60, 5))
        self.assertFalse(passes_service_requirement({**point, "time_to_first_token_p95_seconds": 5.001}, 60, 5))
        self.assertFalse(passes_service_requirement({**point, "output_speed_p25_tokens_per_second": 59.999}, 60, 5))

    def test_best_efficiency_is_not_always_maximum_concurrency(self):
        common = {"accelerator_model": "synthetic", "output_speed_p25_tokens_per_second": 80, "time_to_first_token_p95_seconds": 1}
        points = [
            {**common, "source_point_identifier": "efficient", "source_point_index": 1, "configuration_identifier": "a", "concurrent_agents": 10, "measured_accelerator_total_power_watts": 1000, "agents_per_megawatt": 10000},
            {**common, "source_point_identifier": "more-agents", "source_point_index": 2, "configuration_identifier": "b", "concurrent_agents": 12, "measured_accelerator_total_power_watts": 2000, "agents_per_megawatt": 6000},
        ]
        result = summarize_service_requirement(points, "synthetic", 60, 5)
        self.assertEqual(result["best_efficiency_point_identifier"], "efficient")
        self.assertEqual(result["maximum_observed_passing_concurrent_agents"], 12)
        self.assertEqual(result["maximum_concurrency_measured_total_power_watts"], 2000)
        self.assertFalse(result["is_proven_capacity_limit"])
        self.assertEqual(summarize_service_requirement(points, "absent", 60, 5)["status"], "no_published_target_model_point")
        self.assertEqual(summarize_service_requirement(points, "synthetic", 100, 5)["status"], "no_passing_published_point")

    def test_cross_model_missing_points_and_power_coverage_are_rejected(self):
        mutations = [
            lambda snapshot: snapshot.update(modelName="DeepSeek V4 Pro 0424 (max)"),
            lambda snapshot: snapshot["points"].pop(),
            lambda snapshot: snapshot["points"].append(copy.deepcopy(snapshot["points"][0])),
            lambda snapshot: snapshot["points"][0].update(powerGpuCount=7),
        ]
        for mutate in mutations:
            snapshot = copy.deepcopy(self.snapshot)
            mutate(snapshot)
            with self.assertRaises(ValueError):
                normalize_public_points(snapshot)

    def test_embedded_legacy_model_and_hardware_identity_must_match(self):
        original = json.loads((RESEARCH_DIRECTORY / "source-evidence" / LEGACY_SNAPSHOT_NAME).read_text(encoding="utf-8"))
        for field, replacement in (("slug", "deepseek-v4-pro"), ("name", "DeepSeek V4 Pro 0813 (max)"), ("chipShortName", "B200")):
            snapshot = copy.deepcopy(original)
            if field == "chipShortName":
                snapshot["capacitySearches"][0][field] = replacement
            else:
                snapshot["capacitySearches"][0]["model"][field] = replacement
            with self.assertRaises(ValueError):
                verify_historical_reference(snapshot)

    def test_offline_artifacts_are_deterministic_and_reference_is_reproduced(self):
        with tempfile.TemporaryDirectory(prefix="agent-energy-research-verification-") as directory:
            output_directory = Path(directory)
            result = recompute(RESEARCH_DIRECTORY / "source-evidence", output_directory)
            first_run = {path.name: path.read_bytes() for path in output_directory.iterdir()}
            recompute(RESEARCH_DIRECTORY / "source-evidence", output_directory)
            self.assertEqual(first_run, {path.name: path.read_bytes() for path in output_directory.iterdir()})
            self.assertEqual([round(row["agents_per_megawatt"]) for row in result["historical_reference"]], [2594, 1786])
            self.assertEqual(result["published_point_count"], 25)
            self.assertEqual(result["strict_cross_platform_comparison"]["status"], "not_established")
            self.assertTrue(all(row["best_observed_agents_per_megawatt"] is None for row in result["platform_optimized_summaries"] if row["accelerator_model"] == "H100"))


class PublicEvidenceFlightDecoderChecks(unittest.TestCase):
    @staticmethod
    def load_collector():
        path = RESEARCH_DIRECTORY / "source-evidence" / "capture_public_agentperf_evidence.py"
        specification = importlib.util.spec_from_file_location("public_agentperf_evidence_collector", path)
        module = importlib.util.module_from_spec(specification)
        specification.loader.exec_module(module)
        return module

    def test_unicode_multiline_text_record_uses_utf8_bytes_and_keeps_following_json(self):
        text = "中文启动命令\n第二行🧠"
        flight = f"1:T{len(text.encode('utf-8')):x},{text}2:" + json.dumps({"launchCommand": "$1"}) + "\n"
        pieces = (flight[:12], flight[12:])
        html = "".join("<script>self.__next_f.push(" + json.dumps([1, piece], ensure_ascii=False) + ")</script>" for piece in pieces)
        records, texts = self.load_collector().decode_nextjs_flight_records(html.encode("utf-8"))
        self.assertEqual(texts, {"1": text})
        self.assertEqual(records, [{"launchCommand": "$1"}])

    def test_truncated_long_text_record_is_rejected(self):
        flight = '0:{"preceding":true}\n1:Tff,短文本'
        html = "<script>self.__next_f.push(" + json.dumps([1, flight]) + ")</script>"
        with self.assertRaises(ValueError):
            self.load_collector().decode_nextjs_flight_records(html.encode("utf-8"))


if __name__ == "__main__":
    unittest.main()
