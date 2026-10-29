import { calculateWeightedExclusiveHypervolumeSummary, FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME } from "./frontier_3d_threejs_standout_metric_calculator.js";
import { decodeHistoricalDatasetTransport, decodeHistoricalFramePayload } from "./frontier_3d_historical_frame_decoder.js";

export function historicalSeriesFrames(dataset, selection) {
  return dataset.frames.filter(frame => frame.historical_view_mode === selection.historical_view_mode
    && frame.analysis_sample_policy === selection.analysis_sample_policy
    && (selection.intelligence_index_version === "all_versions" || frame.intelligence_index_version === selection.intelligence_index_version)
    && (selection.historical_view_mode === "observation_replay" || frame.source_snapshot_id === selection.source_snapshot_id))
    .sort((left, right) => (left.release_cutoff_date || left.observed_at_utc).localeCompare(right.release_cutoff_date || right.observed_at_utc));
}

export function materializeHistoricalFrame(dataset, frame) {
  const models = frame.model_observation_indices.map(index => {
    if (!Number.isInteger(index) || index < 0 || index >= dataset.model_observations.length) throw new Error("历史模型观测引用越界");
    return dataset.model_observations[index];
  });
  const metricVariants = Object.fromEntries(Object.entries(frame.scientific_dataset.metric_variants).map(([key, variant]) => {
    const { historical_scene_geometry_definition_index: index, ...scene } = variant.three_dimensional_scene;
    if (!Number.isInteger(index) || index < 0 || index >= dataset.scene_geometry_definitions.length) throw new Error("历史几何引用越界");
    return [key, { ...variant, three_dimensional_scene: { ...scene, ...dataset.scene_geometry_definitions[index] } }];
  }));
  return { ...dataset.scientific_dataset_shared_metadata, ...frame.scientific_dataset, metric_variants: metricVariants, models };
}

export function historicalMembershipChanges(previous, current, variantKey) {
  const boundary = Boolean(previous && previous.intelligence_index_version !== current.intelligence_index_version);
  const before = new Set(previous?.metric_variant_summaries[variantKey]?.pareto_model_uuids || []);
  const after = new Set(current.metric_variant_summaries[variantKey]?.pareto_model_uuids || []);
  return { methodology_boundary: boundary,
    entered_model_uuids: boundary || !previous ? [] : [...after].filter(identifier => !before.has(identifier)),
    left_model_uuids: boundary || !previous ? [] : [...before].filter(identifier => !after.has(identifier)) };
}

export function historicalModelAbsenceReason(dataset, frame, modelUuid) {
  const observation = dataset.frames.find(candidate => candidate.source_snapshot_id === frame.source_snapshot_id && candidate.historical_view_mode === "observation_replay" && candidate.analysis_sample_policy === "include_estimated");
  const record = observation?.model_observation_indices.map(index => dataset.model_observations[index]).find(model => model.model_uuid === modelUuid);
  if (!record) return "本次样本缺席或没有可用智能分，未借用其他日期数值";
  if (frame.analysis_sample_policy === "measured_only" && record.artificial_analysis_intelligence_index_is_estimated !== false) return "仅已确认实测：该模型为估算或估算状态未知，未纳入当前分析样本";
  if (frame.historical_view_mode === "release_retrospective") {
    const first = dataset.frames.filter(candidate => candidate.source_snapshot_id === frame.source_snapshot_id && candidate.historical_view_mode === "release_retrospective" && candidate.analysis_sample_policy === "include_estimated")
      .find(candidate => candidate.model_observation_indices.some(index => dataset.model_observations[index].model_uuid === modelUuid));
    if (!first) return "缺少已核验的发布日期，未加入发布回溯";
    if (first.release_cutoff_date > frame.release_cutoff_date) return `尚未达到该模型统一发布步（${first.release_cutoff_date}）`;
  }
  return "该时点缺少所选口径需要的可比维度";
}

export function historicalFrontierMembershipExitReason(dataset, frame, scientificDataset, variantKey, modelUuid) {
  const variant = scientificDataset.metric_variants[variantKey];
  const matchesModel = reference => (reference.model_uuid || scientificDataset.models[reference.model_index]?.model_uuid) === modelUuid;
  const marker = variant.three_dimensional_scene.displayed_model_markers.find(matchesModel);
  if (marker) {
    if (![marker.x, marker.y, marker.z].every(Number.isFinite)) return "该时点缺少所选口径需要的可比维度";
    const eligibility = marker.analysis_eligibility;
    return eligibility?.is_analysis_eligible_for_current_metric_variant === false
      ? eligibility.ineligibility_reason_text || "所选口径下不具备分析资格"
      : "该集合中已非前沿";
  }
  const excluded = variant.excluded_models_with_drop_reason?.find(matchesModel);
  return excluded?.drop_reason || historicalModelAbsenceReason(dataset, frame, modelUuid);
}

export function historicalStepPath(points) {
  let previous = null;
  return points.map(point => {
    if (!point || !Number.isFinite(point.y)) { previous = null; return ""; }
    const command = !previous || previous.version !== point.version ? `M${point.x},${point.y}` : `H${point.x}V${point.y}`;
    previous = point;
    return command;
  }).join("");
}

export function historicalRankingForFrame(dataset, frame, variantKey, metricName, weights) {
  const original = frame.metric_variant_summaries[variantKey]?.rankings_by_metric[metricName] || [];
  if (metricName !== "weighted_exclusive_hypervolume" || Object.values(weights).every(value => value === 1)) return original;
  let models = frame.metric_variant_summaries[variantKey].normalized_frontier_models;
  if (!models) {
    const scientific = materializeHistoricalFrame(dataset, frame);
    const markers = scientific.metric_variants[variantKey].three_dimensional_scene.displayed_model_markers;
    const members = new Set(frame.metric_variant_summaries[variantKey].pareto_model_uuids);
    models = markers.map(marker => ({ ...scientific.models[marker.model_index], ...marker })).filter(model => members.has(model.model_uuid));
  }
  const summary = calculateWeightedExclusiveHypervolumeSummary(models, weights);
  return models.map((model, index) => ({ model_uuid: model.model_uuid, value: summary.contributions[index] }))
    .sort((left, right) => right.value - left.value || left.model_uuid.localeCompare(right.model_uuid))
    .map((row, index) => ({ ...row, rank: index + 1 }));
}

export async function initializeHistoricalProgressController(replaceScientificDataset) {
  const embedded = document.getElementById("frontier-3d-historical-progress-dataset-json");
  if (!embedded) return;
  let dataset = JSON.parse(embedded.textContent);
  if (dataset.schema_version === "frontier_3d_historical_progress_browser_transport/v1") {
    const loadingStatus = document.createElement("p");
    loadingStatus.id = "aa-historical-resource-loading-status";
    loadingStatus.setAttribute("role", "status");
    loadingStatus.textContent = "正在载入历史时间轴，当前场景可继续浏览。";
    document.getElementById("frontier-3d-toolbar").before(loadingStatus);
    try {
      dataset = await decodeHistoricalDatasetTransport(dataset);
      if (dataset.schema_version !== "frontier_3d_historical_progress_browser_projection/v1") throw new Error("历史资源中的投影版本不匹配");
      loadingStatus.remove();
    } catch (error) {
      loadingStatus.textContent = `历史时间轴载入失败，保留初始场景：${String(error.message || error)}。`;
      const retry = document.createElement("button"); retry.type = "button"; retry.textContent = "重新载入历史时间轴";
      retry.addEventListener("click", () => { loadingStatus.remove(); initializeHistoricalProgressController(replaceScientificDataset); });
      loadingStatus.append(retry);
      return;
    }
  }
  if (!["frontier_3d_historical_progress_dataset/v1", "frontier_3d_historical_progress_browser_projection/v1"].includes(dataset.schema_version)) throw new Error("历史数据契约版本不匹配");
  const byId = new Map(dataset.frames.map(frame => [frame.historical_frame_id, frame]));
  let activeFrame = byId.get(dataset.initial_historical_frame_id);
  let selectedVersion = activeFrame.intelligence_index_version;
  let trajectoryModelUuid = null;
  let currentSeries = [];
  let lastRenderedFrame = activeFrame;
  let lastRenderedSelectedVersion = selectedVersion;
  // 既有诊断对象已展开引用，但保留原 schema 标签；恢复时按展开后的 v2 场景使用。
  let lastRenderedScientificDataset = { ...window.FRONTIER_3D_VISUALIZATION_DATASET, schema_version: "frontier_3d_visualization_dataset/v2" };
  let selectionRequestSequence = 0;
  let isFrameLoading = false;
  let weightedRankingCacheSignature = "";
  const weightedRankingCacheByFrameId = new Map();
  const sourceById = new Map(dataset.source_snapshots.map(source => [source.source_snapshot_id, source]));

  const element = (tag, text, id) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (id) node.id = id;
    return node;
  };
  const labeledSelect = (parent, label, id) => {
    const field = element("label", label);
    const select = element("select", undefined, id);
    field.append(select); parent.append(field); return select;
  };
  const option = (value, label) => { const node = element("option", label); node.value = value; return node; };
  const button = (label, id, action) => { const node = element("button", label, id); node.type = "button"; node.addEventListener("click", action); return node; };
  const controls = element("details", undefined, "aa-historical-progress-controls");
  controls.open = !matchMedia("(max-width: 640px)").matches;
  const summary = element("summary", "历史视图");
  const fields = element("div", undefined, "aa-historical-progress-fields");
  const modeSelect = labeledSelect(fields, "历史视角", "aa-historical-view-mode");
  modeSelect.append(option("release_retrospective", "固定版本 · 发布回溯"), option("observation_replay", "真实档案 · 观测回放"));
  const versionSelect = labeledSelect(fields, "指数版本", "aa-historical-index-version");
  const sourceSelect = labeledSelect(fields, "数值观测快照", "aa-historical-source-snapshot");
  const sampleSelect = labeledSelect(fields, "分析样本", "aa-historical-analysis-sample");
  sampleSelect.append(option("include_estimated", "包含估算，未知另标"), option("measured_only", "仅已确认实测"));
  const timeline = element("div", undefined, "aa-historical-timeline");
  const previousButton = button("上一步", "aa-historical-previous-step", () => selectIndex(Number(range.value) - 1));
  const nextButton = button("下一步", "aa-historical-next-step", () => selectIndex(Number(range.value) + 1));
  const range = element("input", undefined, "aa-historical-step-range");
  range.type = "range"; range.min = "0"; range.step = "1"; range.setAttribute("aria-label", "选择历史时间步");
  const dateLabel = element("output", undefined, "aa-historical-current-date");
  dateLabel.htmlFor = range.id;
  timeline.append(previousButton, range, nextButton, dateLabel);
  const explanation = element("p", undefined, "aa-historical-view-explanation");
  explanation.setAttribute("role", "status");
  controls.append(summary, fields, timeline, explanation);
  const rejectedSources = (dataset.source_validation_outcomes || []).filter(source => source.status === "rejected");
  if (rejectedSources.length) controls.append(element("p", `采用 ${dataset.source_snapshots.length} 份验证样本；隔离 ${rejectedSources.length} 份来源：${rejectedSources.map(source => `${source.source_snapshot_id}（${source.rejection_reason}）`).join("；")}`));
  document.getElementById("frontier-3d-toolbar").before(controls);

  const panel = element("details", undefined, "aa-historical-progress-panel");
  panel.className = "aa-control-section"; panel.open = true;
  panel.append(element("summary", "历史进步与贡献者"));
  const coverage = element("p", undefined, "aa-historical-coverage-summary");
  const chartTitle = element("h3", "可比候选集最高智能分");
  const scoreChart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  scoreChart.id = "aa-historical-intelligence-chart";
  const trajectorySelect = labeledSelect(panel, "名次轨迹模型", "aa-historical-trajectory-model");
  const rankChart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  rankChart.id = "aa-historical-rank-chart";
  const methodNote = element("p", undefined, "aa-historical-method-note");
  const changes = element("div", undefined, "aa-historical-membership-changes");
  panel.append(coverage, chartTitle, scoreChart, trajectorySelect.parentElement, rankChart, methodNote, changes);
  document.getElementById("aa-search-panel").after(panel);

  const activeVariantKey = () => window.frontierThreeDimensionalVisualizationState().activeMetricVariantKey;
  const standoutSettings = () => window.frontierStandoutRanking();
  const sourceLabel = source => `${source.observed_at_utc.replace("T", " ").replace("Z", " UTC")} · ${source.source_model_count} 模型${source.observed_at_utc_source === "inferred_from_cache_file_modification_time" ? " · 时间推断" : ""}${source.intelligence_index_version_resolution === "api_family_refined_by_paired_catalog" ? " · 补丁版本据配套目录细化" : ""}`;
  const versions = [...new Set(dataset.source_snapshots.map(source => source.intelligence_index_version))]
    .sort((left, right) => right.localeCompare(left, undefined, { numeric: true }));

  function synchronizeControls() {
    modeSelect.value = activeFrame.historical_view_mode;
    sampleSelect.value = activeFrame.analysis_sample_policy;
    versionSelect.replaceChildren(...versions.map(version => option(version, `V${version}`)));
    if (activeFrame.historical_view_mode === "observation_replay") versionSelect.prepend(option("all_versions", "全部版本，分段显示"));
    versionSelect.value = selectedVersion;
    const sources = dataset.source_snapshots.filter(source => selectedVersion === "all_versions" || source.intelligence_index_version === selectedVersion);
    sourceSelect.replaceChildren(...sources.map(source => option(source.source_snapshot_id, sourceLabel(source))));
    sourceSelect.value = activeFrame.source_snapshot_id;
    sourceSelect.disabled = activeFrame.historical_view_mode === "observation_replay";
    currentSeries = historicalSeriesFrames(dataset, { ...activeFrame, intelligence_index_version: selectedVersion });
    range.max = String(Math.max(0, currentSeries.length - 1));
    range.value = String(currentSeries.indexOf(activeFrame));
    range.setAttribute("aria-valuetext", activeFrame.release_cutoff_date || activeFrame.observed_at_utc);
    previousButton.disabled = Number(range.value) <= 0;
    nextButton.disabled = Number(range.value) >= currentSeries.length - 1;
    const source = sourceById.get(activeFrame.source_snapshot_id);
    const dateText = activeFrame.historical_view_mode === "release_retrospective" ? `发布截止 ${activeFrame.release_cutoff_date}` : `档案观测 ${activeFrame.observed_at_utc.slice(0, 10)}`;
    dateLabel.value = `${dateText} · ${Number(range.value) + 1}/${currentSeries.length}`;
    summary.textContent = `历史视图 · ${dateText} · V${activeFrame.intelligence_index_version}`;
    explanation.textContent = activeFrame.historical_view_mode === "release_retrospective"
      ? `数值固定在 ${sourceLabel(source)}。已确认同 release 的各 effort 按最早发布日期同步步进；归组未知者保留 AA 日期并另标。价格、速度和成绩不代表发布当年已知状态。`
      : `仅回放保留的观测，不插值、不回填未来数值。${sourceLabel(source)}；样本缺席不代表模型当时不可用。`;
  }

  async function selectFrame(frame, replaceScene = true) {
    if (!frame) return false;
    const requestSequence = ++selectionRequestSequence;
    activeFrame = frame;
    synchronizeControls();
    isFrameLoading = replaceScene;
    controls.setAttribute("aria-busy", String(isFrameLoading));
    panel.setAttribute("aria-busy", String(isFrameLoading));
    if (!replaceScene) { renderHistoricalDetails(); return true; }
    const selectionDescription = explanation.textContent;
    explanation.textContent = `正在载入时间步。${selectionDescription}`;
    try {
      const payload = await decodeHistoricalFramePayload(dataset, frame);
      if (requestSequence !== selectionRequestSequence) return false;
      const scientific = materializeHistoricalFrame({ ...dataset, scene_geometry_definitions: payload.scene_geometry_definitions }, { ...frame, scientific_dataset: payload.scientific_dataset });
      isFrameLoading = false;
      replaceScientificDataset(scientific, modelUuid => historicalModelAbsenceReason(dataset, frame, modelUuid));
      lastRenderedFrame = frame;
      lastRenderedSelectedVersion = selectedVersion;
      lastRenderedScientificDataset = scientific;
      explanation.textContent = selectionDescription;
      return true;
    } catch (error) {
      if (requestSequence !== selectionRequestSequence) return false;
      activeFrame = lastRenderedFrame;
      selectedVersion = lastRenderedSelectedVersion;
      isFrameLoading = false;
      synchronizeControls();
      if (lastRenderedScientificDataset) replaceScientificDataset(lastRenderedScientificDataset, modelUuid => historicalModelAbsenceReason(dataset, lastRenderedFrame, modelUuid));
      explanation.textContent = `时间步载入失败，保留上一有效场景：${String(error.message || error)}。可以继续选择其他时间步。`;
      return false;
    } finally {
      if (requestSequence === selectionRequestSequence) {
        controls.setAttribute("aria-busy", "false"); panel.setAttribute("aria-busy", "false");
      }
    }
  }
  function selectIndex(index) { return selectFrame(currentSeries[Math.min(currentSeries.length - 1, Math.max(0, index))]); }
  function selectMatching(nextSelection) {
    const selection = { ...activeFrame, intelligence_index_version: selectedVersion, ...nextSelection };
    const candidates = historicalSeriesFrames(dataset, selection);
    if (!candidates.length) return false;
    const next = selection.release_cutoff_date && selection.historical_view_mode === "release_retrospective"
      ? [...candidates].reverse().find(frame => frame.release_cutoff_date <= selection.release_cutoff_date) || candidates[0]
      : candidates.at(-1);
    selectedVersion = selection.intelligence_index_version;
    return selectFrame(next);
  }
  modeSelect.addEventListener("change", () => {
    const version = selectedVersion === "all_versions" ? activeFrame.intelligence_index_version : selectedVersion;
    selectMatching({ historical_view_mode: modeSelect.value, intelligence_index_version: version });
  });
  versionSelect.addEventListener("change", () => {
    const source = dataset.source_snapshots.filter(source => versionSelect.value === "all_versions" || source.intelligence_index_version === versionSelect.value).at(-1);
    selectMatching({ intelligence_index_version: versionSelect.value, source_snapshot_id: source.source_snapshot_id, release_cutoff_date: null });
  });
  sourceSelect.addEventListener("change", () => selectMatching({ source_snapshot_id: sourceSelect.value, release_cutoff_date: null }));
  sampleSelect.addEventListener("change", () => selectMatching({ analysis_sample_policy: sampleSelect.value }));
  range.addEventListener("input", () => selectIndex(Number(range.value)));
  trajectorySelect.addEventListener("change", () => { trajectoryModelUuid = trajectorySelect.value; renderHistoricalDetails(); });

  function drawChart(svg, values, label, ranks = false, referenceValues = values) {
    svg.replaceChildren(); svg.setAttribute("viewBox", "0 0 360 150"); svg.setAttribute("role", "img"); svg.setAttribute("aria-label", label);
    const svgNode = (tag, attributes, text) => {
      const node = document.createElementNS(svg.namespaceURI, tag);
      Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
      if (text !== undefined) node.textContent = text;
      svg.append(node); return node;
    };
    const finite = values.filter(value => Number.isFinite(value.value));
    if (!finite.length) { svgNode("text", { x: 12, y: 65 }, "该区间暂无可比数据或前沿名次"); return; }
    const times = currentSeries.map(frame => Date.parse(frame.release_cutoff_date || frame.observed_at_utc));
    const firstTime = times[0], duration = times.at(-1) - firstTime || 1;
    const referenceFinite = referenceValues.filter(value => Number.isFinite(value.value));
    const lower = ranks ? 1 : Math.min(...referenceFinite.map(value => value.value));
    const upper = Math.max(lower + 1, ...referenceFinite.map(value => value.value));
    const points = values.map(item => Number.isFinite(item.value) ? {
      x: 35 + 305 * (Date.parse(item.frame.release_cutoff_date || item.frame.observed_at_utc) - firstTime) / duration,
      y: ranks ? 18 + 100 * (item.value - lower) / (upper - lower) : 118 - 100 * (item.value - lower) / (upper - lower),
      version: item.frame.intelligence_index_version, item,
    } : null);
    svgNode("path", { d: "M35,15V120H345", class: "aa-history-chart-axis" });
    svgNode("path", { d: historicalStepPath(points), class: "aa-history-chart-line" });
    svgNode("text", { x: 2, y: 22 }, ranks ? "1" : upper.toFixed(1));
    svgNode("text", { x: 2, y: 118 }, ranks ? upper.toFixed(0) : lower.toFixed(1));
    svgNode("text", { x: 35, y: 143 }, (currentSeries[0].release_cutoff_date || currentSeries[0].observed_at_utc).slice(0, 10));
    svgNode("text", { x: 345, y: 143, "text-anchor": "end" }, (currentSeries.at(-1).release_cutoff_date || currentSeries.at(-1).observed_at_utc).slice(0, 10));
    points.filter(Boolean).forEach(point => {
      const circle = svgNode("circle", { cx: point.x, cy: point.y, r: point.item.frame === activeFrame ? 4.5 : 2.5, class: "aa-history-chart-point" });
      const title = document.createElementNS(svg.namespaceURI, "title"); title.textContent = `${point.item.frame.release_cutoff_date || point.item.frame.observed_at_utc} · V${point.version} · ${point.item.value}`; circle.append(title);
      circle.addEventListener("click", () => selectFrame(point.item.frame));
    });
  }

  function renderHistoricalDetails() {
    if (isFrameLoading) return;
    const variantKey = activeVariantKey();
    const details = activeFrame.metric_variant_summaries[variantKey];
    const settings = standoutSettings();
    const metric = settings.selectedFrontierStandoutMetricName;
    const rankingSignature = JSON.stringify([variantKey, metric, settings.frontierStandoutAxisWeights, currentSeries.map(frame => frame.historical_frame_id)]);
    if (weightedRankingCacheSignature !== rankingSignature) { weightedRankingCacheSignature = rankingSignature; weightedRankingCacheByFrameId.clear(); }
    const rankings = currentSeries.map(frame => {
      if (!weightedRankingCacheByFrameId.has(frame.historical_frame_id)) weightedRankingCacheByFrameId.set(frame.historical_frame_id, historicalRankingForFrame(dataset, frame, variantKey, metric, settings.frontierStandoutAxisWeights));
      return weightedRankingCacheByFrameId.get(frame.historical_frame_id);
    });
    const currentIndex = currentSeries.indexOf(activeFrame);
    const currentRanking = rankings[currentIndex] || [];
    const visibleSeries = currentSeries.slice(0, currentIndex + 1);
    const known = new Set(rankings.slice(0, currentIndex + 1).flat().map(row => row.model_uuid));
    const trajectoryChoices = [...known].sort((left, right) => (dataset.models_by_uuid[left]?.name || left).localeCompare(dataset.models_by_uuid[right]?.name || right));
    if (!known.has(trajectoryModelUuid)) trajectoryModelUuid = currentRanking[0]?.model_uuid || trajectoryChoices[0] || null;
    trajectorySelect.replaceChildren(...trajectoryChoices.map(identifier => option(identifier, dataset.models_by_uuid[identifier]?.name || identifier)));
    trajectorySelect.value = trajectoryModelUuid || "";
    const unresolvedIdentityCount = activeFrame.model_observation_indices.filter(index => dataset.release_identity_resolution_by_model_uuid?.[dataset.model_observations[index].model_uuid] === "unresolved_release_group").length;
    coverage.textContent = `${details.analysis_eligible_model_count} 个可比模型 · ${details.pareto_model_uuids.length} 个前沿成员 · 其中估算 ${details.estimated_intelligence_count}，估算状态未知 ${details.unknown_estimation_status_count}；release 归组未知 ${unresolvedIdentityCount}。${details.unavailable_reason || ""}`;
    const scoreValues = currentSeries.map(frame => ({ frame, value: frame.metric_variant_summaries[variantKey].highest_comparable_intelligence }));
    drawChart(scoreChart, scoreValues.slice(0, currentIndex + 1), "同版本可比候选集最高智能分，版本断点不连接", false, scoreValues);
    const rankValues = currentSeries.map((frame, index) => ({ frame, value: rankings[index].find(row => row.model_uuid === trajectoryModelUuid)?.rank ?? null }));
    drawChart(rankChart, rankValues.slice(0, currentIndex + 1), `${dataset.models_by_uuid[trajectoryModelUuid]?.name || "所选模型"}的${FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME[metric].label}前沿名次轨迹`, true, rankValues);
    methodNote.textContent = `现行方法 · ${FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME[metric].label}；分析全集不按年龄删除模型。名次只解释该时点的比较，分值不作跨日期增长量。${details.small_sample_warning || ""} F1 候选未启用。`;
    const change = historicalMembershipChanges(currentSeries[currentIndex - 1], activeFrame, variantKey);
    changes.replaceChildren(element("h3", "前沿成员进出"));
    if (change.methodology_boundary) changes.append(element("p", "指数版本变化，重置比较起点；不把两版成员差异解释为进步。"));
    else if (!currentIndex) changes.append(element("p", "当前序列起点，不推断更早日期的成员。"));
    else {
      const list = element("ul");
      for (const identifier of change.entered_model_uuids) list.append(element("li", `进入：${dataset.models_by_uuid[identifier]?.name || identifier}`));
      for (const identifier of change.left_model_uuids) list.append(element("li", `退出：${dataset.models_by_uuid[identifier]?.name || identifier} · ${historicalFrontierMembershipExitReason(dataset, activeFrame, window.FRONTIER_3D_VISUALIZATION_DATASET, variantKey, identifier)}`));
      changes.append(list.childNodes.length ? list : element("p", "前沿成员未变化。"));
      if (activeFrame.historical_view_mode === "observation_replay") changes.append(element("p", "档案间也可能发生价格、速度、评测或覆盖变化，此处不作因果归因。"));
    }
    const speedSelect = document.getElementById("aa-speed-metric-select");
    const costName = variantKey.split("__")[0];
    for (const choice of speedSelect.options) {
      const reason = activeFrame.metric_variant_summaries[`${costName}__${choice.value}`]?.unavailable_reason;
      choice.disabled = Boolean(reason && reason.includes("归一常数")); choice.title = reason || "";
    }
  }

  window.addEventListener("frontier-3d-view-updated", renderHistoricalDetails);
  window.setHistoricalFrontierTimelineSelection = selection => {
    if (selection.historical_frame_id) {
      const next = byId.get(selection.historical_frame_id);
      if (!next) return false;
      selectedVersion = next.intelligence_index_version;
      return selectFrame(next);
    }
    return selectMatching(selection);
  };
  window.historicalFrontierVisualizationState = () => ({ ...activeFrame, scientific_dataset: undefined, scientific_dataset_compressed_base64_gzip: undefined,
    rendered_historical_frame_id: lastRenderedFrame.historical_frame_id, is_frame_loading: isFrameLoading,
    current_series_frame_ids: currentSeries.map(frame => frame.historical_frame_id),
    selected_trajectory_model_uuid: trajectoryModelUuid,
    source_observed_at_utc_source: sourceById.get(activeFrame.source_snapshot_id).observed_at_utc_source,
    methodology_implementation_sha256: dataset.standout_methodology.methodology_implementation_sha256 });
  selectFrame(activeFrame, false);
}
