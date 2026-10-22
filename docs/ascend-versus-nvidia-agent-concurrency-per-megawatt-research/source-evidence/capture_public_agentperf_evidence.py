#!/usr/bin/env python3
"""使用标准库冻结 AA 公开证据；输出文件不得已存在，避免覆写已有快照。"""

import argparse
import collections
import datetime
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import urllib.request


CURRENT_FILENAME = "artificial-analysis-agentperf-deepseek-v4-pro-0813-current-snapshot.json"
LEGACY_FILENAME = "artificial-analysis-agentperf-deepseek-v4-pro-0424-h200-legacy-snapshot.json"
CONFIGURATION_FILENAME = "artificial-analysis-agentperf-configuration-details-snapshot.json"
METHODOLOGY_FILENAME = "artificial-analysis-agentperf-methodology-snapshot.json"


def fetch_source_response(url, timeout_seconds):
    started = datetime.datetime.now(datetime.timezone.utc).isoformat()
    with urllib.request.urlopen(url, timeout=timeout_seconds) as response:
        response_bytes = response.read()
        source = {
            "requestedUrl": url,
            "resolvedUrl": response.geturl(),
            "retrievalStartedUtc": started,
            "retrievalCompletedUtc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "httpStatus": response.status,
            "responseBodySha256": hashlib.sha256(response_bytes).hexdigest(),
            "responseBodyBytes": len(response_bytes),
            "httpResponseHeaders": {
                key: value for key, value in response.headers.items()
                if key.lower() in {"date", "etag", "last-modified", "content-type", "content-length"}
            },
        }
    return response_bytes, source


def decode_nextjs_flight_records(response_bytes):
    flight_chunks = []
    for payload in re.findall(r"self\.__next_f\.push\((.*?)\)</script>", response_bytes.decode("utf-8")):
        try:
            chunk = json.loads(payload)
            if len(chunk) > 1 and chunk[0] == 1:
                flight_chunks.append(chunk[1])
        except (ValueError, TypeError):
            continue
    flight_text = "".join(flight_chunks)
    flight_bytes = flight_text.encode("utf-8")
    records = []
    text_records = {}
    cursor = 0
    while cursor < len(flight_bytes):
        if flight_bytes[cursor:cursor + 1] == b"\n":
            cursor += 1
            continue
        header = re.compile(rb"([0-9a-f]*):").match(flight_bytes, cursor)
        if not header:
            raise ValueError(f"Flight 记录边界无法解析，字节位置 {cursor}。")
        payload_start = header.end()
        # T 记录长度是 UTF-8 字节数；正文可有换行，下一记录也不保证另起一行。
        text_header = re.compile(rb"T([0-9a-f]+),").match(flight_bytes, payload_start)
        if text_header:
            cursor = text_header.end() + int(text_header.group(1), 16)
            if cursor > len(flight_bytes):
                raise ValueError("Flight 长文本记录不完整，停止采集。")
            text_records[header.group(1).decode()] = flight_bytes[text_header.end():cursor].decode("utf-8")
            continue
        end = flight_bytes.find(b"\n", payload_start)
        if end < 0:
            end = len(flight_bytes)
        try:
            records.append(json.loads(flight_bytes[payload_start:end]))
        except ValueError:
            pass
        cursor = end + 1
    if not records:
        raise ValueError("未找到可解析的 Next.js Flight JSON 记录，停止采集。")
    return records, text_records


def walk_json_objects(value, path=""):
    if isinstance(value, dict):
        yield path, value
        for key, child in value.items():
            yield from walk_json_objects(child, f"{path}/{key}")
    elif isinstance(value, list):
        for index, child in enumerate(value):
            yield from walk_json_objects(child, f"{path}/{index}")


def capture_current_model_points(timeout_seconds):
    response_bytes, source = fetch_source_response(
        "https://artificialanalysis.ai/hardware-inference-stack/datacenter", timeout_seconds
    )
    records, _ = decode_nextjs_flight_records(response_bytes)
    agent_perf = next(value for _, value in walk_json_objects(records)
                      if {"systems", "configs", "points", "models"} <= value.keys())
    model_slug = "deepseek-v4-pro"
    model_name = next(value["name"] for _, value in walk_json_objects(records)
                      if value.get("slug") == model_slug and "name" in value)
    if "DeepSeek V4 Pro 0813" not in model_name:
        raise ValueError("主模型别名已指向其他版本，停止采集；需先更新研究版本及快照文件名。")
    memberships = collections.defaultdict(set)
    for model, groups in agent_perf["models"].items():
        for group in groups:
            for view in group["views"].values():
                # 所有视图的 nearby 同样属于公开测点，不能仅采集 frontier。
                for index in view["frontier"]:
                    memberships[index].add(model)
                for nearby in view["nearby"]:
                    memberships[nearby[0]].add(model)
    missing = sorted(set(range(len(agent_perf["points"]))) - set(memberships))
    ambiguous = {str(index): sorted(models) for index, models in memberships.items() if len(models) > 1}
    if missing or ambiguous:
        raise ValueError("公开测点与模型关联不完整或有歧义，停止采集，避免误归类。")
    requested_hardware = {"H100", "H200", "B200"}
    systems = {key: value for key, value in agent_perf["systems"].items()
               if value["chipShortName"] in requested_hardware}
    indexes = sorted(index for index, models in memberships.items()
                     if model_slug in models and agent_perf["points"][index]["systemId"] in systems)
    points = [dict(agent_perf["points"][index], sourcePointIndex=index,
                   sourcePointId=f"aa-agentperf:{model_slug}:points:{index}") for index in indexes]
    if not points:
        raise ValueError("主模型没有目标硬件公开点，停止采集。")
    source["extractionMethod"] = (
        "解码 Next.js Flight；定位 agentPerf；汇总所有模型视图 frontier 与 nearby[*][0] 的并集；"
        "验证全页测点恰好关联一个模型；保留目标模型和硬件的全部公开点。"
    )
    return {
        "schemaVersion": 1,
        "evidenceKind": "artificial-analysis-agentperf-current-model-public-measured-points",
        "source": source,
        "modelSlug": model_slug,
        "modelName": model_name,
        "allPagePointCount": len(agent_perf["points"]),
        "indexAssociationAudit": {
            "totalPagePointsWithModelMembership": len(memberships),
            "pagePointIndexesWithoutModelMembership": missing,
            "pagePointIndexesWithMultipleModelMemberships": ambiguous,
        },
        "targetHardwareRequested": sorted(requested_hardware),
        "systems": systems,
        "targetModelGroups": [group for group in agent_perf["models"][model_slug]
                              if group["systemId"] in systems],
        "points": points,
        "configs": {point["configId"]: agent_perf["configs"][point["configId"]] for point in points},
        "targetHardwareWithoutPublishedModelPoints": sorted(
            requested_hardware - {systems[point["systemId"]]["chipShortName"] for point in points}
        ),
        "fieldInterpretations": {
            "sourcePointId": "采集器生成的快照内定位符，非 AA 原生运行 ID；通过响应 SHA256 绑定 points[sourcePointIndex]。",
            "powerAvgTotalW": "被测加速卡集合的平均总瓦数，不得再乘卡数；GPU die + HBM，不含 CPU、网络、制冷。",
            "powerGpuCount": "功耗统计覆盖的实际 GPU 数，需与配置 acceleratorsUsed 交叉核对。",
            "numberOfChips": "系统目录标称卡数，不能替代实际用卡数。",
            "serverThroughput": "包含 KV-cache 命中输入的总 token 吞吐量，不能据此除以逐请求速度推算 Agent 并发。",
            "sloPolicy": "20/60 tokens/s 与 P95 TTFT 10/5 s 为研究沿用约束，并非当前方法页重新声明的固定档位。",
        },
    }


def capture_legacy_h200_searches(timeout_seconds):
    response_bytes, source = fetch_source_response("https://artificialanalysis.ai/articles/aa-agentperf/", timeout_seconds)
    records, _ = decode_nextjs_flight_records(response_bytes)
    root = next(value for _, value in walk_json_objects(records)
                if {"capacitySearches", "iterations"} <= value.keys())
    searches = [search for search in root["capacitySearches"]
                if search.get("chipShortName") == "H200"
                and search["model"]["slug"] == "deepseek-v4-pro-0424" and search["sloSpeedMin"] in (20, 60)]
    if len(searches) != 2:
        raise ValueError("旧版 H200 示例不再恰好对应两档搜索，停止采集，需人工复核源页变化。")
    search_ids = {search["id"] for search in searches}
    source["extractionMethod"] = "解析 Flight JSON，保存 H200 / 0424 / 20与60档全部搜索对象及关联迭代。"
    return {
        "schemaVersion": 1,
        "evidenceKind": "artificial-analysis-agentperf-legacy-h200-capacity-searches",
        "source": source,
        "modelSlug": "deepseek-v4-pro-0424",
        "capacitySearches": searches,
        "iterations": [item for item in root["iterations"] if item["rwltCapacitySearchId"] in search_ids],
        "sourceObjectKeys": list(root),
        "fieldInterpretations": {"runtimePowerKw": "逐搜索实测加速卡总功耗，单位 kW，不能替换成额定 TDP。"},
    }


def capture_configuration_details(configuration_ids, timeout_seconds):
    response_bytes, source = fetch_source_response(
        "https://artificialanalysis.ai/hardware-inference-stack/configs?model=deepseek-v4-pro", timeout_seconds
    )
    records, text_records = decode_nextjs_flight_records(response_bytes)
    configurations = {}
    for path, value in walk_json_objects(records):
        if value.get("id") not in configuration_ids:
            continue
        value = dict(value)
        reference = re.fullmatch(r"\$([0-9a-f]+)", value.get("launchCommand") or "")
        if reference:
            value["launchCommandFlightReference"] = value["launchCommand"]
            value["launchCommand"] = text_records.get(reference.group(1))
        configurations[value["id"]] = {"sourcePath": path, "record": value}
    source["extractionMethod"] = "按配置原生 ID 匹配完整配置；按 UTF-8 字节长度展开 launchCommand 的 Flight T 引用。"
    return {
        "schemaVersion": 1,
        "evidenceKind": "artificial-analysis-agentperf-linked-configuration-details",
        "source": source,
        "configurationRecordsById": configurations,
        "requestedConfigIds": sorted(configuration_ids),
        "missingConfigIds": sorted(configuration_ids - set(configurations)),
    }


class VisibleMethodologyTextParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.excluded_depth = 0
        self.fragments = []

    def handle_starttag(self, tag, attrs):
        if tag in ("script", "style"):
            self.excluded_depth += 1

    def handle_endtag(self, tag):
        if tag in ("script", "style"):
            self.excluded_depth -= 1

    def handle_data(self, value):
        if not self.excluded_depth:
            self.fragments.append(value)


def capture_methodology_observations(timeout_seconds):
    response_bytes, source = fetch_source_response("https://artificialanalysis.ai/methodology/agentperf", timeout_seconds)
    parser = VisibleMethodologyTextParser()
    parser.feed(response_bytes.decode("utf-8"))
    visible_text = " ".join(" ".join(parser.fragments).split())
    source["extractionMethod"] = "排除 script/style 后检查方法页可见文本，仅保存研究相关结构化观察。"
    return {
        "schemaVersion": 1,
        "evidenceKind": "artificial-analysis-agentperf-methodology-observations",
        "source": source,
        "sourceTextChecks": {
            "containsP25": "P25" in visible_text,
            "containsCachedPromptTokens": "prompt tokens served from KV cache" in visible_text,
            "containsMeasuredAcceleratorPower": "measured accelerator power under load" in visible_text,
            "containsRatedTdp": "rather than rated TDP" in visible_text,
            "containsFixed20TokensPerSecond": bool(re.search(r"20\s+tokens/?s", visible_text, re.I)),
            "containsFixed60TokensPerSecond": bool(re.search(r"60\s+tokens/?s", visible_text, re.I)),
        },
        "methodObservations": {
            "power": "加速卡 GPU die + HBM 的实测功耗；不使用额定 TDP。",
            "throughput": "服务端输入与输出总吞吐量，包含 KV-cache 命中输入。",
            "speed": "首 token 之后的请求级输出速度，默认 P25。",
            "fixedSloStatus": "固定服务档位须由研究单独定义，并检查 sourceTextChecks 是否显示源页变化。",
        },
    }


def main():
    parser = argparse.ArgumentParser(description="采集 AA 公开证据到新的持久目录，不覆写已有冻结快照。")
    parser.add_argument("--output-directory", type=Path, required=True)
    parser.add_argument("--timeout-seconds", type=int, default=90)
    args = parser.parse_args()
    filenames = (CURRENT_FILENAME, LEGACY_FILENAME, CONFIGURATION_FILENAME, METHODOLOGY_FILENAME)
    if any((args.output_directory / filename).exists() for filename in filenames):
        parser.error("输出目录中存在冻结快照；请指定新的持久目录。")
    current = capture_current_model_points(args.timeout_seconds)
    legacy = capture_legacy_h200_searches(args.timeout_seconds)
    configuration_ids = set(current["configs"]) | {search["configId"] for search in legacy["capacitySearches"]}
    configurations = capture_configuration_details(configuration_ids, args.timeout_seconds)
    methodology = capture_methodology_observations(args.timeout_seconds)
    args.output_directory.mkdir(parents=True, exist_ok=True)
    for filename, evidence in zip(filenames, (current, legacy, configurations, methodology)):
        with (args.output_directory / filename).open("x", encoding="utf-8") as output:
            json.dump(evidence, output, ensure_ascii=False, indent=2)
            output.write("\n")
    print(json.dumps({"结果": "证据快照已保存", "目录": str(args.output_directory),
                      "新版测点数": len(current["points"]), "完整配置数": len(configurations["configurationRecordsById"]),
                      "缺少主模型测点的硬件": current["targetHardwareWithoutPublishedModelPoints"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
