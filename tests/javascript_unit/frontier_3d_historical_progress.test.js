import test from "node:test";
import assert from "node:assert/strict";
import { gzipSync, gunzipSync } from "node:zlib";
import * as historicalController from "../../src/frontier_3d_interactive_report_assets/frontier_3d_historical_progress_controller.js";
import { historicalSeriesFrames, materializeHistoricalFrame, historicalMembershipChanges, historicalStepPath, historicalModelAbsenceReason } from "../../src/frontier_3d_interactive_report_assets/frontier_3d_historical_progress_controller.js";

const frame = (id, mode, source, date, version = "4.3.2", members = []) => ({
  historical_frame_id: id, historical_view_mode: mode, source_snapshot_id: source,
  observed_at_utc: `${date}T00:00:00Z`, release_cutoff_date: date,
  intelligence_index_version: version, analysis_sample_policy: "include_estimated",
  model_observation_indices: [], scientific_dataset: { metric_variants: {} },
  metric_variant_summaries: { blended__raw: { pareto_model_uuids: members } },
});

test("发布回溯只使用选定的观测快照", () => {
  const dataset = { frames: [frame("early", "release_retrospective", "early", "2025-01-01"), frame("later", "release_retrospective", "later", "2025-03-01")] };
  assert.deepEqual(historicalSeriesFrames(dataset, { historical_view_mode: "release_retrospective", source_snapshot_id: "early", analysis_sample_policy: "include_estimated", intelligence_index_version: "4.3.2" }).map(item => item.historical_frame_id), ["early"]);
});

test("档案日期排序且可以跨版本分段展示", () => {
  const dataset = { frames: [frame("v5", "observation_replay", "v5", "2026-10-28", "5.0"), frame("v4", "observation_replay", "v4", "2026-09-23")] };
  assert.deepEqual(historicalSeriesFrames(dataset, { historical_view_mode: "observation_replay", intelligence_index_version: "all_versions", analysis_sample_policy: "include_estimated" }).map(item => item.historical_frame_id), ["v4", "v5"]);
});

test("模型引用越界不会变成零坐标", () => {
  assert.throws(() => materializeHistoricalFrame({ model_observations: [], scientific_dataset_shared_metadata: {} }, { model_observation_indices: [0], scientific_dataset: {} }), /引用/);
});

test("版本变化重置成员比较，不声称新模型击败旧版本模型", () => {
  const changes = historicalMembershipChanges(frame("a", "observation_replay", "a", "2026-09-23", "4.3.2", ["old"]), frame("b", "observation_replay", "b", "2026-10-28", "5.0", ["new"]), "blended__raw");
  assert.equal(changes.methodology_boundary, true);
  assert.deepEqual(changes.entered_model_uuids, []);
  assert.deepEqual(changes.left_model_uuids, []);
});

test("缺失日期或版本断点不连线，正常区间使用阶梯曲线", () => {
  assert.equal(historicalStepPath([{ x: 0, y: 1, version: "4" }, { x: 2, y: 3, version: "4" }, null, { x: 4, y: 2, version: "4" }, { x: 5, y: 4, version: "5" }]), "M0,1H2V3M4,2M5,4");
});

test("固定模型被实测样本规则排除时，原因不会冒充剪枝或缺少坐标", () => {
  const observation = { ...frame("observed", "observation_replay", "same", "2026-01-01"), model_observation_indices: [0] };
  const dataset = { frames: [observation], model_observations: [{ model_uuid: "estimated", artificial_analysis_intelligence_index_is_estimated: true }] };
  assert.match(historicalModelAbsenceReason(dataset, { ...observation, analysis_sample_policy: "measured_only" }, "estimated"), /估算/);
  assert.match(historicalModelAbsenceReason(dataset, observation, "missing"), /本次样本缺席/);
});

function installHistoricalControllerBoundary(context, configureDataset = () => {}) {
  const previousGlobals = { window: globalThis.window, document: globalThis.document, matchMedia: globalThis.matchMedia };
  context.after(() => Object.assign(globalThis, previousGlobals));
  const elementsById = new Map();
  class BoundaryElement {
    constructor() { this.childNodes = []; this.listeners = new Map(); this.textContent = ""; this.value = ""; }
    set id(value) { this.identifier = value; elementsById.set(value, this); }
    get id() { return this.identifier; }
    get options() { return this.childNodes; }
    append(...children) { children.forEach(child => { child.parentElement = this; this.childNodes.push(child); }); }
    prepend(...children) { this.childNodes.unshift(...children); }
    replaceChildren(...children) { this.childNodes = []; this.append(...children); }
    setAttribute(name, value) { this[name] = value; }
    addEventListener(name, listener) { this.listeners.set(name, listener); }
    before() {}
    after() {}
  }
  const element = id => { const node = new BoundaryElement(); node.id = id; return node; };
  const frames = [
    frame("release-early", "release_retrospective", "later", "2025-01-01"),
    frame("release-later", "release_retrospective", "later", "2025-03-01"),
    frame("replay-early", "observation_replay", "earlier", "2026-01-01"),
    frame("replay-later", "observation_replay", "later", "2026-02-01"),
    frame("replay-v5", "observation_replay", "v5", "2026-10-28", "5.0"),
    frame("release-v5", "release_retrospective", "v5", "2025-03-01", "5.0"),
  ];
  for (const item of frames) {
    if (item.historical_view_mode === "observation_replay") item.release_cutoff_date = null;
    item.metric_variant_summaries.blended__raw = { pareto_model_uuids: [], rankings_by_metric: { trend_residual: [] }, analysis_eligible_model_count: 0, highest_comparable_intelligence: null };
    item.scientific_dataset.metric_variants.blended__raw = { three_dimensional_scene: { historical_scene_geometry_definition_index: 0, displayed_model_markers: [] }, excluded_models_with_drop_reason: [] };
    item.scientific_dataset_compressed_base64_gzip = gzipSync(JSON.stringify(item.scientific_dataset)).toString("base64");
    delete item.scientific_dataset;
  }
  const dataset = { schema_version: "frontier_3d_historical_progress_browser_projection/v1", frames,
    initial_historical_frame_id: "release-later", model_observations: [], models_by_uuid: {},
    source_snapshots: ["earlier", "later", "v5"].map((id, index) => ({ source_snapshot_id: id,
      intelligence_index_version: index === 2 ? "5.0" : "4.3.2", observed_at_utc: `2026-0${index + 1}-01T00:00:00Z`, observed_at_utc_source: "recorded_at_fetch_time", source_model_count: 1 })),
    scene_geometry_definitions_compressed_base64_gzip: [gzipSync("{}").toString("base64")],
    standout_methodology: {}, scientific_dataset_shared_metadata: {},
  };
  configureDataset(dataset);
  element("frontier-3d-historical-progress-dataset-json").textContent = JSON.stringify(dataset);
  element("frontier-3d-toolbar"); element("aa-search-panel"); element("aa-speed-metric-select");
  globalThis.document = { getElementById: id => elementsById.get(id), createElement: () => new BoundaryElement(), createElementNS: () => new BoundaryElement() };
  globalThis.matchMedia = () => ({ matches: false });
  const windowListeners = new Map();
  const initial = frames.find(item => item.historical_frame_id === dataset.initial_historical_frame_id);
  const initialScientific = JSON.parse(gunzipSync(Buffer.from(initial.scientific_dataset_compressed_base64_gzip, "base64")));
  globalThis.window = { FRONTIER_3D_VISUALIZATION_DATASET: { ...initialScientific, models: initial.model_observation_indices.map(index => dataset.model_observations[index]) },
    frontierThreeDimensionalVisualizationState: () => ({ activeMetricVariantKey: "blended__raw" }),
    frontierStandoutRanking: () => ({ selectedFrontierStandoutMetricName: "trend_residual", frontierStandoutAxisWeights: { intelligence: 1, cost: 1, speed: 1 } }),
    addEventListener: (name, listener) => windowListeners.set(name, listener),
  };
  return { elementsById, replaceScientificDataset: scientific => {
    window.FRONTIER_3D_VISUALIZATION_DATASET = scientific;
    windowListeners.get("frontier-3d-view-updated")?.();
  } };
}

for (const allVersions of [false, true]) {
  test(`解码失败完整恢复上次成功选择及时间序列，全部版本=${allVersions}`, async context => {
    const { elementsById, replaceScientificDataset } = installHistoricalControllerBoundary(context);
    await historicalController.initializeHistoricalProgressController(replaceScientificDataset);
    if (allVersions) {
      assert.equal(await window.setHistoricalFrontierTimelineSelection({ historical_view_mode: "observation_replay" }), true);
      assert.equal(await window.setHistoricalFrontierTimelineSelection({ intelligence_index_version: "all_versions" }), true);
    }
    const before = window.historicalFrontierVisualizationState();
    const selectedVersionBefore = elementsById.get("aa-historical-index-version").value;
    const originalDecompressionStream = globalThis.DecompressionStream;
    context.after(() => { globalThis.DecompressionStream = originalDecompressionStream; });
    globalThis.DecompressionStream = class { constructor() { throw new Error("注入解压失败"); } };
    const selection = allVersions ? { historical_frame_id: "replay-early" } : { intelligence_index_version: "5.0", source_snapshot_id: "v5", release_cutoff_date: null };
    assert.equal(await window.setHistoricalFrontierTimelineSelection(selection), false);
    const after = window.historicalFrontierVisualizationState();
    assert.equal(after.historical_frame_id, before.historical_frame_id);
    assert.equal(after.rendered_historical_frame_id, before.rendered_historical_frame_id);
    assert.equal(elementsById.get("aa-historical-index-version").value, selectedVersionBefore);
    assert.deepEqual(after.current_series_frame_ids, before.current_series_frame_ids);
    assert.ok(after.current_series_frame_ids.includes(after.historical_frame_id));
    assert.match(elementsById.get("aa-historical-frame-loading-status").textContent, /保留上一有效场景/);
    globalThis.DecompressionStream = originalDecompressionStream;
    assert.equal(await window.setHistoricalFrontierTimelineSelection(selection), true);
    assert.equal(window.historicalFrontierVisualizationState().is_frame_loading, false);
    assert.deepEqual(await Promise.all([
      window.setHistoricalFrontierTimelineSelection({ historical_frame_id: "release-early" }),
      window.setHistoricalFrontierTimelineSelection({ historical_frame_id: "release-later" }),
    ]), [false, true]);
    assert.equal(window.historicalFrontierVisualizationState().rendered_historical_frame_id, "release-later");
  });
}

test("实际控制器把公共观测表中仍保留的缺维度模型解释为覆盖缺失", async context => {
  const { elementsById, replaceScientificDataset } = installHistoricalControllerBoundary(context, dataset => {
    dataset.initial_historical_frame_id = "replay-later";
    dataset.model_observations = [{ model_uuid: "model" }];
    dataset.models_by_uuid.model = { name: "缺维度的模型" };
    for (const item of dataset.frames.filter(item => ["replay-early", "replay-later"].includes(item.historical_frame_id))) {
      item.model_observation_indices = [0];
      const before = item.historical_frame_id === "replay-early";
      item.metric_variant_summaries.blended__raw.pareto_model_uuids = before ? ["model"] : [];
      const scientific = JSON.parse(gunzipSync(Buffer.from(item.scientific_dataset_compressed_base64_gzip, "base64")));
      scientific.metric_variants.blended__raw.excluded_models_with_drop_reason = before ? [] : [{ model_index: 0, missing_dimension_names: ["output_speed"], drop_reason: "缺少该时点与口径所需的可比维度" }];
      item.scientific_dataset_compressed_base64_gzip = gzipSync(JSON.stringify(scientific)).toString("base64");
    }
  });
  await historicalController.initializeHistoricalProgressController(replaceScientificDataset);
  const exitText = elementsById.get("aa-historical-membership-changes").childNodes[1].childNodes[0].textContent;
  assert.match(exitText, /退出：缺维度的模型.*缺少.*可比维度/);
  assert.doesNotMatch(exitText, /已非前沿/);
});

test("前沿成员退出按当前口径的坐标和分析资格解释，覆盖缺失不当作竞争结果", () => {
  const observation = { ...frame("after", "observation_replay", "after", "2026-02-01"), model_observation_indices: [0] };
  const dataset = { frames: [observation], model_observations: [{ model_uuid: "model" }] };
  const scientific = { models: dataset.model_observations, metric_variants: { blended__raw: {
    three_dimensional_scene: { displayed_model_markers: [] }, excluded_models_with_drop_reason: [
      { model_index: 0, missing_dimension_names: ["eff_speed"], drop_reason: "缺少该时点与口径所需的可比维度" },
    ],
  } } };
  const exitReason = () => historicalController.historicalFrontierMembershipExitReason(dataset, observation, scientific, "blended__raw", "model");
  assert.match(exitReason(), /缺少.*可比维度/);
  const variant = scientific.metric_variants.blended__raw;
  variant.excluded_models_with_drop_reason = [];
  const marker = { model_uuid: "model", x: 1, y: 2, z: 3, analysis_eligibility: { is_analysis_eligible_for_current_metric_variant: false, ineligibility_reason_text: "成本来自其他指数版本" } };
  variant.three_dimensional_scene.displayed_model_markers = [marker];
  assert.equal(exitReason(), "成本来自其他指数版本");
  marker.analysis_eligibility.is_analysis_eligible_for_current_metric_variant = true;
  assert.equal(exitReason(), "该集合中已非前沿");
  marker.y = null;
  assert.match(exitReason(), /缺少.*可比维度/);
  variant.three_dimensional_scene.displayed_model_markers = [];
  observation.model_observation_indices = [];
  assert.match(exitReason(), /本次样本缺席/);
});
