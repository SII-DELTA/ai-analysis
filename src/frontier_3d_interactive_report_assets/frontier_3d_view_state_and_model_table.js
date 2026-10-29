// URL 契约与可见性是纯显示逻辑；不重算前沿、排名、归一化或轴域。
const viewStateHashPrefix = "#frontier-view-state-v1=";
const uuidPattern = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
const metricVariantPattern = /^(effective|blended)__(effective|raw|tasks_per_hour)$/;
const isFiniteNumberInRange = (value, minimum, maximum) => typeof value === "number" && Number.isFinite(value) && value >= minimum && value <= maximum;
export const isCalendarDate = value => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;

export function sanitizeFrontierViewState(input) {
  if (!input || input.version !== 1 || typeof input !== "object" || Array.isArray(input)) return null;
  const state = { version: 1 };
  if (typeof input.metric_variant_key === "string" && metricVariantPattern.test(input.metric_variant_key)) state.metric_variant_key = input.metric_variant_key;
  for (const [field, valid] of [["pinned_model_uuids", value => uuidPattern.test(value)], ["hidden_organization_identity_keys", value => value.length > 0 && value.length <= 200]]) {
    if (Array.isArray(input[field])) state[field] = [...new Set(input[field].filter(value => typeof value === "string" && valid(value)).slice(0, 1024))];
  }
  if (["trend_residual", "intelligence_uplift", "frontier_distance", "weighted_exclusive_hypervolume"].includes(input.standout_metric)) state.standout_metric = input.standout_metric;
  const weights = input.standout_axis_weights;
  if (weights && ["intelligence", "cost", "speed"].every(field => isFiniteNumberInRange(weights[field], .25, 4))) state.standout_axis_weights = Object.fromEntries(["intelligence", "cost", "speed"].map(field => [field, weights[field]]));
  const display = input.display;
  if (display && typeof display === "object") {
    state.display = {};
    for (const field of ["measured_only", "comparable_only", "recent_release_grace_period", "country_region_markers", "achievable_frontier_surface", "pinned_comparison_expanded"]) if (typeof display[field] === "boolean") state.display[field] = display[field];
    if(Array.isArray(display.pinned_comparison_optional_fields))state.display.pinned_comparison_optional_fields=[...new Set(display.pinned_comparison_optional_fields.filter(field=>["output_speed","eff_speed","cost_to_run","blended_price_cache_input_output_7_to_2_to_1","output_mtokens"].includes(field)))];
    if (["wireframe", "solid", "hidden"].includes(display.frontier_style)) state.display.frontier_style = display.frontier_style;
    if (isFiniteNumberInRange(display.marker_size_multiplier, .5, 1.5)) state.display.marker_size_multiplier = display.marker_size_multiplier;
    if (["off", "0.5", "1"].includes(display.sensitivity_intelligence_half_width)) state.display.sensitivity_intelligence_half_width = display.sensitivity_intelligence_half_width;
  }
  const camera = input.camera;
  const vectorIsValid = value => Array.isArray(value) && value.length === 3 && value.every(number => isFiniteNumberInRange(number, -1e6, 1e6));
  if (camera && [camera.position, camera.target, camera.up].every(vectorIsValid) && Math.hypot(...camera.up) > 1e-6 && Math.hypot(...camera.position.map((value,index) => value-camera.target[index])) > 1e-6) {
    state.camera = { position: [...camera.position], target: [...camera.target], up: [...camera.up] };
  }
  if (input.date_filter && (input.date_filter.cutoff_date === null || isCalendarDate(input.date_filter.cutoff_date)) && ["fade", "hide"].includes(input.date_filter.mode)) {
    state.date_filter = { cutoff_date: input.date_filter.cutoff_date, mode: input.date_filter.mode };
  }
  if (input.table && typeof input.table === "object") {
    state.table = {};
    if (["chart", "table"].includes(input.table.active_tab)) state.table.active_tab = input.table.active_tab;
    if (frontierModelTableColumns.some(column => column.key === input.table.sort_field)) state.table.sort_field = input.table.sort_field;
    if (["asc", "desc"].includes(input.table.sort_direction)) state.table.sort_direction = input.table.sort_direction;
    if (typeof input.table.search_text === "string") state.table.search_text = input.table.search_text.slice(0, 256);
    if (["all", "eligible", "ineligible", "displayed", "excluded"].includes(input.table.analysis_filter)) state.table.analysis_filter = input.table.analysis_filter;
  }
  return state;
}

export function encodeFrontierViewStateHash(state) {
  const sanitized = sanitizeFrontierViewState(state);
  if (!sanitized) throw new Error("视图状态版本无效");
  return viewStateHashPrefix + encodeURIComponent(JSON.stringify(sanitized));
}

export function decodeFrontierViewStateHash(hash) {
  if (!hash) return { state: null, reason: null };
  if (!hash.startsWith(viewStateHashPrefix)) return { state: null, reason: hash.startsWith("#frontier-view-state-") ? "分享状态版本不支持，已保留当前视图。" : null };
  try {
    if (hash.length > 131072) throw new Error();
    const state = sanitizeFrontierViewState(JSON.parse(decodeURIComponent(hash.slice(viewStateHashPrefix.length))));
    return { state, reason: state ? null : "分享状态版本不支持，已保留当前视图。" };
  } catch { return { state: null, reason: "分享状态无法解析，已保留当前视图。" }; }
}

export function modelVisibilityForExplorationFilters(model, filters = {}) {
  if (filters.measured_only && model.intelligence_measurement_status !== "measured") return { visible: false, faded: false, reason: "智能分未经核验为实测" };
  const release = model.panel?.release_date;
  const afterCutoff = isCalendarDate(filters.cutoff_date) && isCalendarDate(release) && release > filters.cutoff_date;
  return { visible: !(afterCutoff && filters.date_mode === "hide"), faded: Boolean(afterCutoff && filters.date_mode === "fade"), reason: afterCutoff ? "晚于所选发布日期" : null };
}

export const intelligenceMeasurementStatusText = status => ({ measured: "实测", estimated: "估算", unknown: "未知" })[status] || "未知";
export function frontierSensitivityStatusText(classification, isPareto) {
  if (classification?.is_pareto_robust == null) return "不可分析";
  if (classification.is_pareto_robust) return "稳健前沿";
  if (classification.is_near_frontier) return "近前沿";
  return isPareto ? "敏感前沿" : "非前沿";
}

export function frontierModelTableAnalysisEligibility(row) {
  if(row.missing_dimension_names?.length)return false;
  const recorded=row.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant;
  if(typeof recorded === "boolean")return recorded;
  if(row.is_displayed && Number.isFinite(row.layer))return true;
  return null;
}

export const frontierModelTableColumns = [
  { key: "name", label: "模型", value: row => row.name },
  { key: "creator", label: "厂商", value: row => row.creator },
  { key: "model_uuid", label: "模型 UUID", value: row => row.model_uuid },
  { key: "intelligence", label: "智能分（分）", value: row => row.panel?.intelligence },
  { key: "measurement_status", label: "智能分状态", value: row => intelligenceMeasurementStatusText(row.intelligence_measurement_status) },
  { key: "catalog_estimated_flag", label: "目录原始 isEstimated", value: row => row.artificial_analysis_intelligence_index_is_estimated },
  { key: "cost_to_run", label: "有效运行成本（USD）", value: row => row.panel?.cost_to_run },
  { key: "blended_price_cache_input_output_7_to_2_to_1", label: "7:2:1 混合单价（USD/M tokens）", value: row => row.panel?.blended_price_cache_input_output_7_to_2_to_1 },
  { key: "eff_speed", label: "有效速度（tok/s）", value: row => row.panel?.eff_speed },
  { key: "output_speed", label: "原始速度（tok/s）", value: row => row.panel?.output_speed },
  { key: "intelligence_index_tasks_per_hour", label: "任务速度（任务/小时）", value: row => row.panel?.intelligence_index_tasks_per_hour },
  { key: "artificial_analysis_intelligence_index_time_per_task_seconds", label: "智能指数任务耗时（秒）", value: row => row.panel?.artificial_analysis_intelligence_index_time_per_task_seconds },
  { key: "task_time_unavailability_reason", label: "任务速度缺失原因", value: row => row.intelligence_index_task_time_evidence?.unavailability_reason },
  { key: "median_end_to_end_response_time_seconds", label: "API 端到端延迟（秒，独立字段）", value: row => row.panel?.median_end_to_end_response_time_seconds },
  { key: "release_date", label: "发布日期", value: row => row.panel?.release_date === "?" ? null : row.panel?.release_date },
  { key: "eligibility", label: "分析资格", value: row => frontierModelTableAnalysisEligibility(row) === true ? "合格" : frontierModelTableAnalysisEligibility(row) === false ? "不合格" : "未知（旧文件未记录）" },
  { key: "layer", label: "正式前沿层号", value: row => row.layer },
  { key: "drop_reason", label: "上图状态与原因", value: row => row.drop_reason },
  { key: "sensitivity", label: "敏感性（假设区间）", value: row => row.sensitivity_text || "关闭" },
  { key: "sources", label: "数值与状态来源", value: row => JSON.stringify({ ...row.value_provenance, intelligence:row.intelligence_measurement_evidence, intelligence_index_task_time:row.intelligence_index_task_time_evidence,
    api_end_to_end_latency:"Artificial Analysis API performance.median_end_to_end_response_time_seconds" }) },
];

export function sortAndFilterFrontierModelTableRows(rows, state = {}) {
  const query = (state.search_text || "").trim().toLocaleLowerCase();
  const column = frontierModelTableColumns.find(column => column.key === state.sort_field) || frontierModelTableColumns.find(column => column.key === "intelligence");
  const direction = state.sort_direction === "asc" ? 1 : -1;
  return rows.filter(row => {
    if (query && !`${row.name} ${row.creator} ${row.model_uuid || ""}`.toLocaleLowerCase().includes(query)) return false;
    const eligible = frontierModelTableAnalysisEligibility(row);
    return !((state.analysis_filter === "eligible" && eligible!==true) || (state.analysis_filter === "ineligible" && eligible!==false)
      || (state.analysis_filter === "displayed" && !row.is_displayed) || (state.analysis_filter === "excluded" && row.is_displayed));
  }).sort((left, right) => {
    const a = column.value(left), b = column.value(right);
    const aMissing = a == null || (typeof a === "number" && !Number.isFinite(a));
    const bMissing = b == null || (typeof b === "number" && !Number.isFinite(b));
    if (aMissing || bMissing) return Number(aMissing) - Number(bMissing) || left.model_index - right.model_index;
    return (typeof a === "number" && typeof b === "number" ? a - b : String(a).localeCompare(String(b), "zh-CN")) * direction || left.model_index - right.model_index;
  });
}

export function exportFrontierModelTableCsv(rows) {
  const cell = value => {
    let text = value == null ? "" : String(value);
    if (typeof value === "string" && /^[\s\u0000-\u001f]*[=+\-@]/u.test(text)) text = "'" + text;
    return '"' + text.replaceAll('"', '""') + '"';
  };
  return "\ufeff" + [frontierModelTableColumns.map(column => cell(column.label)).join(","), ...rows.map(row => frontierModelTableColumns.map(column => cell(column.value(row))).join(","))].join("\r\n") + "\r\n";
}
