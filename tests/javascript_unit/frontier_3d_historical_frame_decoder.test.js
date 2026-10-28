import test from "node:test";
import assert from "node:assert/strict";
import { gzipSync } from "node:zlib";
import { createHash } from "node:crypto";
import { decodeHistoricalDatasetTransport, decodeHistoricalFramePayload } from "../../src/frontier_3d_interactive_report_assets/frontier_3d_historical_frame_decoder.js";

const encoded = object => gzipSync(JSON.stringify(object)).toString("base64");

test("只解压选定场景引用的几何，未选择的坏数据不阻断当前帧", async () => {
  const scientific = { metric_variants: { blended__raw: { three_dimensional_scene: { historical_scene_geometry_definition_index: 0 } } } };
  const dataset = { scene_geometry_definitions_compressed_base64_gzip: [encoded({ marker: "准确的几何" }), "broken"] };
  const frame = { historical_frame_id: "selected", scientific_dataset_compressed_base64_gzip: encoded(scientific) };
  const loaded = await decodeHistoricalFramePayload(dataset, frame);
  assert.deepEqual(loaded.scientific_dataset, scientific);
  assert.deepEqual(loaded.scene_geometry_definitions[0], { marker: "准确的几何" });
  assert.equal(loaded.scene_geometry_definitions[1], undefined);
});

test("损坏压缩帧明确拒绝，修复后可重新载入", async () => {
  const dataset = { scene_geometry_definitions_compressed_base64_gzip: [] };
  const frame = { historical_frame_id: "retry", scientific_dataset_compressed_base64_gzip: "broken" };
  await assert.rejects(decodeHistoricalFramePayload(dataset, frame));
  frame.scientific_dataset_compressed_base64_gzip = encoded({ metric_variants: {} });
  assert.deepEqual((await decodeHistoricalFramePayload(dataset, frame)).scientific_dataset, { metric_variants: {} });
});

test("分段传输先校验完整字节与 SHA256，再还原原始投影", async () => {
  const original = { schema_version: "frontier_3d_historical_progress_browser_projection/v1", message: "所有历史场景均保留" };
  const compressed = gzipSync(JSON.stringify(original));
  const split = Math.floor(compressed.length / 2);
  const segments = { "first.gzpart": compressed.subarray(0, split), "second.gzpart": compressed.subarray(split) };
  const transport = { schema_version: "frontier_3d_historical_progress_browser_transport/v1", payload_segment_urls: Object.keys(segments),
    compressed_payload_byte_count: compressed.length, compressed_payload_sha256: createHash("sha256").update(compressed).digest("hex") };
  const fetchSegment = async url => new Response(segments[url]);
  assert.deepEqual(await decodeHistoricalDatasetTransport(transport, fetchSegment), original);
  await assert.rejects(decodeHistoricalDatasetTransport({ ...transport, compressed_payload_sha256: "0".repeat(64) }, fetchSegment), /SHA256/);
  await assert.rejects(decodeHistoricalDatasetTransport(transport, async () => new Response("不可用", { status: 503 })), /503/);
  await assert.rejects(decodeHistoricalDatasetTransport({ ...transport, payload_segment_urls: ["https://example.com/unauthorized.gzpart"] }, fetchSegment), /清单无效/);
});
