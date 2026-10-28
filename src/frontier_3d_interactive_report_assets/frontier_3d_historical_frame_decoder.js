// 缓存只保留少量已解压场景；选择时的序号由控制器负责，较晚完成的旧请求不能覆盖新选择。
const decodedCacheByDataset = new WeakMap();

async function decodeGzipJsonBlob(blob) {
  if (typeof DecompressionStream !== "function") throw new Error("浏览器缺少 gzip 解码能力，请使用支持 DecompressionStream 的浏览器");
  return JSON.parse(await new Response(blob.stream().pipeThrough(new DecompressionStream("gzip"))).text());
}

async function decodeBase64GzipJson(encoded) {
  const bytes = Uint8Array.from(atob(encoded), character => character.charCodeAt(0));
  return decodeGzipJsonBlob(new Blob([bytes]));
}

export async function decodeHistoricalDatasetTransport(transport, fetchPayloadSegment = globalThis.fetch) {
  if (transport.schema_version !== "frontier_3d_historical_progress_browser_transport/v1"
      || !Array.isArray(transport.payload_segment_urls) || !transport.payload_segment_urls.length
      || transport.payload_segment_urls.some(url => typeof url !== "string" || !/^[a-z0-9-]+\.gzpart$/.test(url))) throw new Error("历史报告分段资源清单无效");
  const segments = await Promise.all(transport.payload_segment_urls.map(async url => {
    const response = await fetchPayloadSegment(url);
    if (!response.ok) throw new Error(`历史报告资源读取失败：${url}（${response.status}）`);
    return response.arrayBuffer();
  }));
  const compressed = new Blob(segments);
  if (compressed.size !== transport.compressed_payload_byte_count) throw new Error("历史报告资源总长度不匹配");
  const digest = await globalThis.crypto.subtle.digest("SHA-256", await compressed.arrayBuffer());
  const digestHex = [...new Uint8Array(digest)].map(value => value.toString(16).padStart(2, "0")).join("");
  if (digestHex !== transport.compressed_payload_sha256) throw new Error("历史报告资源 SHA256 不匹配");
  return decodeGzipJsonBlob(compressed);
}

function boundedCachedDecode(cache, key, encoded, maximumEntries) {
  if (cache.has(key)) return cache.get(key);
  const pending = decodeBase64GzipJson(encoded).catch(error => { if (cache.get(key) === pending) cache.delete(key); throw error; });
  cache.set(key, pending);
  while (cache.size > maximumEntries) cache.delete(cache.keys().next().value);
  return pending;
}

export async function decodeHistoricalFramePayload(dataset, frame) {
  if (frame.scientific_dataset) return { scientific_dataset: frame.scientific_dataset, scene_geometry_definitions: dataset.scene_geometry_definitions };
  let cache = decodedCacheByDataset.get(dataset);
  if (!cache) { cache = { frames: new Map(), geometries: new Map() }; decodedCacheByDataset.set(dataset, cache); }
  const scientific = await boundedCachedDecode(cache.frames, frame.historical_frame_id, frame.scientific_dataset_compressed_base64_gzip, 4);
  if (!scientific || !scientific.metric_variants) throw new Error("历史时间步场景结构无效");
  const definitions = dataset.scene_geometry_definitions_compressed_base64_gzip;
  const loadedDefinitions = new Array(definitions.length);
  await Promise.all(Object.values(scientific.metric_variants).map(async variant => {
    const index = variant.three_dimensional_scene.historical_scene_geometry_definition_index;
    if (!Number.isInteger(index) || index < 0 || index >= definitions.length) throw new Error("历史几何引用越界");
    const geometry = await boundedCachedDecode(cache.geometries, index, definitions[index], 8);
    if (!geometry || typeof geometry !== "object" || Array.isArray(geometry)) throw new Error("历史几何结构无效");
    loadedDefinitions[index] = geometry;
  }));
  return { scientific_dataset: scientific, scene_geometry_definitions: loadedDefinitions };
}
