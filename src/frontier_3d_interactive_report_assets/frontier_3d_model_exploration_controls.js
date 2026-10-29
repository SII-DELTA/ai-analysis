import {
  decodeFrontierViewStateHash, encodeFrontierViewStateHash, modelVisibilityForExplorationFilters,
  sortAndFilterFrontierModelTableRows, exportFrontierModelTableCsv, frontierModelTableColumns,
  frontierSensitivityStatusText, isCalendarDate,
} from "./frontier_3d_view_state_and_model_table.js";

const createTextElement = (tag, text, className) => {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  return element;
};
const createButton = (text, id, action) => {
  const button = createTextElement("button", text, "aa-secondary-button");
  button.type = "button";
  if(id)button.id = id;
  button.addEventListener("click", action);
  return button;
};

export function downloadFrontierBrowserArtifact(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function mountFrontierModelExplorationControls({
  dataset, reportShell, toolbar, plotRegion, graphContainer, sidePanel, webglAvailable = true,
  getVariantKey = () => dataset.initial_variant_key,
  getSharedViewState = () => ({}), applySharedViewState = () => {},
  onExplorationFiltersChanged = () => {}, modelPassesSharedFilters = () => true,
  resetCamera = () => {}, setAxisAlignedCameraView = () => {}, exportPng = () => {}, pinModel = () => {},
}) {
  let applyingHash = false;
  let scheduledHashWrite = null;
  let playbackInterval = null;
  let fallbackVariantKey = dataset.initial_variant_key;
  let fallbackSharedViewState = {};
  const fallbackMetricSelects = [];
  const currentVariantKey = () => webglAvailable ? getVariantKey() : fallbackVariantKey;
  const explorationFilters = { measured_only: false, cutoff_date: null, date_mode: "fade", sensitivity_intelligence_half_width: "off" };
  const tableState = { active_tab: webglAvailable ? "chart" : "table", sort_field: "intelligence", sort_direction: "desc", search_text: "", analysis_filter: "all" };
  let currentTableRows = [];
  const bar = createTextElement("nav", "", "aa-exploration-bar");
  bar.id = "aa-model-exploration-bar";
  bar.setAttribute("aria-label", "视图、分享与导出");
  const tabs = createTextElement("div", "", "aa-exploration-tabs");
  tabs.setAttribute("role", "tablist");
  const chartTab = createButton("图表", "aa-chart-view-tab", () => selectTab("chart"));
  const tableTab = createButton("全模型表", "aa-table-view-tab", () => selectTab("table"));
  for (const tab of [chartTab, tableTab]) tab.setAttribute("role", "tab");
  chartTab.setAttribute("aria-controls", graphContainer.id);
  tableTab.setAttribute("aria-controls", "aa-all-model-table-panel");
  tabs.append(chartTab, tableTab);
  if (!webglAvailable) chartTab.disabled = true;
  const reset = createButton("重置视角", "aa-reset-camera-view", resetCamera);
  const cameraViewSelect = document.createElement("select");
  cameraViewSelect.id = "aa-axis-aligned-camera-view";
  cameraViewSelect.setAttribute("aria-label", "轴对齐视角");
  for (const [value, text] of [["", "轴对齐视角"], ["intelligence_cost", "智能 × 成本"], ["intelligence_speed", "智能 × 速度"], ["cost_speed", "成本 × 速度"]]) cameraViewSelect.add(new Option(text, value));
  cameraViewSelect.addEventListener("change", () => { if (cameraViewSelect.value) setAxisAlignedCameraView(cameraViewSelect.value); cameraViewSelect.value = ""; sharedViewChanged(); });
  const copy = createButton("复制视图链接", "aa-copy-frontier-view-link", copyViewLink);
  const png = createButton("导出 2× PNG", "aa-export-frontier-png", async () => {
    png.disabled = true;
    try { await exportPng(); announce("PNG 已生成，包含当前视角、图例、数据日期与 AA 署名。"); }
    catch (error) { announce(`PNG 导出失败：${error?.message || "图形资源不足"}；可重试。`); }
    finally { png.disabled = !webglAvailable; }
  });
  reset.disabled = cameraViewSelect.disabled = png.disabled = !webglAvailable;
  const status = createTextElement("span", "", "aa-exploration-status");
  status.id = "aa-exploration-status";
  status.setAttribute("role", "status");
  const selectableLink = document.createElement("textarea");
  selectableLink.id = "aa-frontier-view-link-fallback";
  selectableLink.setAttribute("aria-label", "可复制的视图链接");
  selectableLink.readOnly = true;
  selectableLink.hidden = true;
  bar.append(tabs, reset, cameraViewSelect, copy, png, status, selectableLink);
  toolbar.before(bar);
  if (!webglAvailable) {
    reportShell.classList.add("is-view-settings-expanded");
    const metadata=createTextElement("p",`数据日期：${dataset.data_date || "未知"} · `,"aa-exploration-note");
    const attribution=createTextElement("a","Artificial Analysis");
    attribution.href="https://artificialanalysis.ai/";
    metadata.append(attribution);
    document.getElementById("frontier-3d-report-header").append(metadata);
    for(const [index,label,definitions] of [[0,"成本口径",dataset.cost_metric_definitions],[1,"速度口径",dataset.speed_metric_definitions]]) {
      const field=createTextElement("label",label,"aa-toolbar-field");
      const select=document.createElement("select");
      select.setAttribute("aria-label",label);
      for(const [value,definition] of Object.entries(definitions))select.add(new Option(definition.label,value));
      select.value=fallbackVariantKey.split("__")[index];
      fallbackMetricSelects.push(select);
      select.addEventListener("change",()=>{
        const key=fallbackMetricSelects.map(control=>control.value).join("__");
        if(dataset.metric_variants[key]){fallbackVariantKey=key;sharedViewChanged();}
      });
      field.append(select);toolbar.append(field);
    }
  }

  const explorationPanel = createTextElement("details", "", "aa-model-exploration-controls");
  explorationPanel.id = "aa-model-exploration-controls";
  explorationPanel.append(createTextElement("summary", "筛选与敏感性 / 日期探索"));
  const measuredOnly = document.createElement("input");
  measuredOnly.type = "checkbox";
  measuredOnly.id = "aa-measured-intelligence-only";
  const measuredLabel = createTextElement("label", "仅实测智能分 ");
  measuredLabel.prepend(measuredOnly);
  measuredOnly.addEventListener("change", () => setExplorationFilters({ measured_only: measuredOnly.checked }));
  const sensitivity = document.createElement("select");
  sensitivity.id = "aa-sensitivity-intelligence-half-width";
  sensitivity.setAttribute("aria-label", "敏感性假设区间");
  for (const [value, text] of [["off", "敏感性标注：关闭"], ["0.5", "智能 ±0.5；成本与速度各 ±10%"], ["1", "智能 ±1；成本与速度各 ±10%"]]) sensitivity.add(new Option(text, value));
  sensitivity.addEventListener("change", () => setExplorationFilters({ sensitivity_intelligence_half_width: sensitivity.value }));
  const dateInput = document.createElement("input");
  dateInput.type = "date";
  dateInput.id = "aa-release-date-cutoff";
  dateInput.setAttribute("aria-label", "发布日期截止日期，留空显示全部");
  dateInput.addEventListener("change", () => { pausePlayback(); setExplorationFilters({ cutoff_date: isCalendarDate(dateInput.value) ? dateInput.value : null }); });
  const dateMode = document.createElement("select");
  dateMode.id = "aa-release-date-visibility-mode";
  dateMode.setAttribute("aria-label", "晚于截止日期的模型");
  dateMode.add(new Option("晚于截止日期：淡出", "fade"));
  dateMode.add(new Option("晚于截止日期：隐藏", "hide"));
  dateMode.addEventListener("change", () => setExplorationFilters({ date_mode: dateMode.value }));
  const play = createButton("播放发布日期", "aa-play-release-date-filter", togglePlayback);
  play.setAttribute("aria-pressed", "false");
  const allDates = createButton("显示全部日期", "aa-show-all-release-dates", () => { pausePlayback(); setExplorationFilters({ cutoff_date: null }); });
  const dateNote = createTextElement("p", "仅探索当前快照的发布日期；按当前价格、速度和评测口径计算。未知发布日期单独保留，不推断日期。", "aa-exploration-note");
  const sensitivityLegend = createTextElement("p", "实线光环：稳健前沿；虚线光环：敏感前沿 / 近前沿。区间为独立假设，不是 AA 置信区间，也不覆盖重定标误差；正式前沿和排名保持全局分析。", "aa-exploration-note");
  sensitivityLegend.id = "aa-sensitivity-legend";
  sensitivityLegend.hidden = true;
  const metricDefinitionNote = createTextElement("p", "任务速度 = 3600 ÷ 智能指数任务耗时（秒）。API 端到端延迟是另一独立测量，不用于补位。", "aa-exploration-note");
  explorationPanel.append(measuredLabel, sensitivity, dateInput, dateMode, play, allDates, dateNote, sensitivityLegend, metricDefinitionNote);
  (sidePanel.querySelector(".aa-side-panel-body") || sidePanel).append(explorationPanel);

  const tablePanel = createTextElement("section", "", "aa-all-model-table-panel");
  tablePanel.id = "aa-all-model-table-panel";
  tablePanel.setAttribute("role", "tabpanel");
  tablePanel.setAttribute("aria-labelledby", tableTab.id);
  const tableTools = createTextElement("div", "", "aa-all-model-table-tools");
  const tableSearch = document.createElement("input");
  tableSearch.type = "search";
  tableSearch.id = "aa-all-model-table-search";
  tableSearch.placeholder = "筛选模型、厂商或 UUID";
  tableSearch.setAttribute("aria-label", tableSearch.placeholder);
  tableSearch.addEventListener("input", () => { tableState.search_text = tableSearch.value; refresh(); scheduleHashWrite(); });
  const analysisFilter = document.createElement("select");
  analysisFilter.id = "aa-all-model-analysis-filter";
  analysisFilter.setAttribute("aria-label", "筛选分析与上图资格");
  for (const [value, label] of [["all", "全部输入记录"], ["eligible", "分析合格"], ["ineligible", "分析不合格"], ["displayed", "本口径已上图"], ["excluded", "本口径未上图"]]) analysisFilter.add(new Option(label, value));
  analysisFilter.addEventListener("change", () => { tableState.analysis_filter = analysisFilter.value; refresh(); scheduleHashWrite(); });
  const csvButton = createButton("导出当前表格 CSV", "aa-export-all-model-table-csv", () => downloadFrontierBrowserArtifact(new Blob([exportFrontierModelTableCsv(currentTableRows)], {type:"text/csv;charset=utf-8"}), `frontier-models-${dataset.data_date || "unknown"}.csv`));
  const counts = createTextElement("p", "", "aa-exploration-note");
  counts.id = "aa-all-model-table-counts";
  const table = document.createElement("table");
  table.id = "aa-all-model-table";
  table.append(createTextElement("caption", "全部模型：含缺值、被剪枝及分析不合格记录；数值保留全局分析口径。"));
  const head = table.createTHead().insertRow();
  for (const column of frontierModelTableColumns) {
    const cell = document.createElement("th");
    cell.scope = "col";
    cell.dataset.sortField = column.key;
    cell.append(createButton(column.label, `aa-sort-model-table-${column.key}`, () => {
      tableState.sort_direction = tableState.sort_field === column.key && tableState.sort_direction === "desc" ? "asc" : "desc";
      tableState.sort_field = column.key;
      refresh();
      scheduleHashWrite();
    }));
    head.append(cell);
  }
  const tableBody = table.createTBody();
  const tableScroll = createTextElement("div", "", "aa-all-model-table-scroll");
  tableScroll.tabIndex = 0;
  tableScroll.setAttribute("aria-label", "可横向与纵向滚动的全部模型表");
  tableScroll.append(table);
  tableTools.append(tableSearch, analysisFilter, csvButton);
  tablePanel.append(tableTools, counts, tableScroll);
  plotRegion.append(tablePanel);
  chartTab.addEventListener("keydown", event => { if (["ArrowRight", "ArrowLeft"].includes(event.key)) { event.preventDefault(); selectTab("table"); tableTab.focus(); } });
  tableTab.addEventListener("keydown", event => { if (webglAvailable && ["ArrowRight", "ArrowLeft"].includes(event.key)) { event.preventDefault(); selectTab("chart"); chartTab.focus(); } });

  function announce(message) { status.textContent = message; }
  function getState() {
    const shared=webglAvailable ? getSharedViewState() : fallbackSharedViewState;
    return { ...shared, version:1, metric_variant_key:currentVariantKey(),
      display:{ ...shared.display, measured_only:explorationFilters.measured_only, sensitivity_intelligence_half_width:explorationFilters.sensitivity_intelligence_half_width },
      date_filter:{cutoff_date:explorationFilters.cutoff_date,mode:explorationFilters.date_mode}, table:{...tableState} };
  }
  function scheduleHashWrite() {
    if (applyingHash || scheduledHashWrite !== null) return;
    scheduledHashWrite = window.setTimeout(() => {
      scheduledHashWrite = null;
      const hash = encodeFrontierViewStateHash(getState());
      if (hash === window.location.hash) return;
      try { window.history.replaceState(window.history.state, "", hash); }
      catch { announce("当前环境无法更新地址栏；复制链接仍可保存视图。 "); }
    }, 0);
  }
  async function copyViewLink() {
    const link = window.location.href.split("#")[0] + encodeFrontierViewStateHash(getState());
    const fileNote = window.location.protocol === "file:" ? " 本地文件分享需同时提供对应 HTML。" : "";
    try {
      await navigator.clipboard.writeText(link);
      selectableLink.hidden = true;
      announce("已复制当前视图链接。" + fileNote);
    } catch {
      selectableLink.hidden = false;
      selectableLink.value = link;
      selectableLink.focus();
      selectableLink.select();
      announce("无法访问剪贴板，链接已选中，可手动复制。" + fileNote);
    }
  }
  function selectTab(tab) {
    tableState.active_tab = !webglAvailable ? "table" : tab;
    const tableActive = tableState.active_tab === "table";
    tablePanel.hidden = !tableActive;
    graphContainer.style.visibility = tableActive ? "hidden" : "";
    chartTab.setAttribute("aria-selected", String(!tableActive));
    tableTab.setAttribute("aria-selected", String(tableActive));
    chartTab.tabIndex = tableActive ? -1 : 0;
    tableTab.tabIndex = tableActive ? 0 : -1;
    refresh();
    scheduleHashWrite();
  }
  function setExplorationFilters(next) {
    Object.assign(explorationFilters, next);
    measuredOnly.checked = explorationFilters.measured_only;
    dateInput.value = explorationFilters.cutoff_date || "";
    dateMode.value = explorationFilters.date_mode;
    sensitivity.value = explorationFilters.sensitivity_intelligence_half_width;
    sensitivityLegend.hidden = sensitivity.value === "off";
    onExplorationFiltersChanged({...explorationFilters});
    refresh();
    scheduleHashWrite();
  }
  function refresh() {
    const variant = dataset.metric_variants[currentVariantKey()];
    const markers = variant?.three_dimensional_scene?.displayed_model_markers || [];
    let rows = variant?.model_analysis_records;
    if (!rows) {
      const byIdentity = new Map((dataset.models || []).map(model=>[model.model_uuid || JSON.stringify([model.creator,model.name]),{...model,is_displayed:false,drop_reason:"旧文件未留存本口径资格或未上图原因"}]));
      for (const model of [...markers, ...(variant?.excluded_models_with_drop_reason || [])]) {
        const identity=model.model_uuid || JSON.stringify([model.creator,model.name]);
        const common=byIdentity.get(identity);
        byIdentity.set(identity, {...common,...model,panel:{...common?.panel,...model.panel,intelligence:model.panel?.intelligence ?? model.intelligence ?? common?.panel?.intelligence,release_date:model.panel?.release_date ?? model.release_date ?? common?.panel?.release_date},is_displayed:markers.includes(model),layer:model.panel?.layer});
      }
      rows = [...byIdentity.values()].map((model, model_index) => ({...model,model_index}));
    }
    const passesSharedFilters=model=>{
      if(!modelPassesSharedFilters(model))return false;
      if(webglAvailable)return true;
      const identity=dataset.organization_identity_metadata_by_creator_name?.[model.creator]?.organization_identity_key;
      if(fallbackSharedViewState.hidden_organization_identity_keys?.includes(identity))return false;
      if(fallbackSharedViewState.display?.comparable_only && model.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant===false)return false;
      const marker=markers.find(candidate=>candidate.model_uuid===model.model_uuid);
      return fallbackSharedViewState.display?.recent_release_grace_period!==false || !marker?.displayed_only_because_of_recent_release_grace_period;
    };
    const visibleRows = rows.filter(model => passesSharedFilters(model) && modelVisibilityForExplorationFilters(model, explorationFilters).visible);
    currentTableRows = sortAndFilterFrontierModelTableRows(visibleRows.map(row => ({...row,
      sensitivity_text: explorationFilters.sensitivity_intelligence_half_width === "off" ? "关闭" : frontierSensitivityStatusText(row.sensitivity_by_intelligence_half_width?.[explorationFilters.sensitivity_intelligence_half_width],row.layer === 1),
    })),tableState);
    const visibleChartCount = markers.filter(model => passesSharedFilters(model) && modelVisibilityForExplorationFilters(model, explorationFilters).visible).length;
    counts.textContent = `全局输入 ${rows.length}；当前筛选表格 ${currentTableRows.length}；本口径已上图 ${markers.length}，可见 ${visibleChartCount}。${dataset.model_table_coverage === "all_input_records" ? "" : "旧文件只覆盖实际留存记录，无法恢复原始输入的全部模型。"} 未知发布日期 ${rows.filter(row => !isCalendarDate(row.panel?.release_date)).length}。`;
    if (tablePanel.hidden || applyingHash) return;
    for (const header of head.cells) header.setAttribute("aria-sort", header.dataset.sortField === tableState.sort_field ? (tableState.sort_direction === "asc" ? "ascending" : "descending") : "none");
    const fragment = document.createDocumentFragment();
    for (const row of currentTableRows) {
      const tr = document.createElement("tr");
      tr.dataset.modelUuid = row.model_uuid || "";
      tr.dataset.dateFaded = String(modelVisibilityForExplorationFilters(row,explorationFilters).faded);
      for (const column of frontierModelTableColumns) {
        const cell = tr.insertCell();
        const value = column.value(row);
        cell.textContent = value == null ? "未知" : typeof value === "number" ? Number(value.toPrecision(6)).toString() : String(value);
        if (column.key === "name" && webglAvailable && row.model_uuid) {
          const button = createButton(row.name, "", () => { pinModel(row); sharedViewChanged(); });
          button.setAttribute("aria-label", `固定 ${row.name}`);
          cell.replaceChildren(button);
        }
      }
      fragment.append(tr);
    }
    tableBody.replaceChildren(fragment);
  }
  function pausePlayback() {
    if (playbackInterval !== null) window.clearInterval(playbackInterval);
    playbackInterval = null;
    play.textContent = "播放发布日期";
    play.setAttribute("aria-pressed", "false");
  }
  function togglePlayback() {
    if (playbackInterval !== null) { pausePlayback(); return; }
    const dates = [...new Set((dataset.models || Object.values(dataset.metric_variants).flatMap(variant=>variant.three_dimensional_scene.displayed_model_markers)).map(row=>row.panel?.release_date).filter(isCalendarDate))].sort();
    if (!dates.length) { announce("没有可核验的发布日期可播放。"); return; }
    let position = explorationFilters.cutoff_date ? dates.findIndex(date=>date > explorationFilters.cutoff_date) : 0;
    if (position < 0) position = 0;
    const step = () => { setExplorationFilters({cutoff_date:dates[position++]}); if (position >= dates.length) pausePlayback(); };
    play.textContent = "暂停发布日期";
    play.setAttribute("aria-pressed", "true");
    playbackInterval = window.setInterval(step, 900);
    step();
  }
  function sharedViewChanged() { refresh(); scheduleHashWrite(); }
  function applyHash() {
    const {state,reason} = decodeFrontierViewStateHash(window.location.hash);
    if (reason) announce(reason);
    if (!state) return;
    pausePlayback();
    if (scheduledHashWrite !== null) window.clearTimeout(scheduledHashWrite);
    scheduledHashWrite = null;
    applyingHash = true;
    try {
      if (state.table) Object.assign(tableState,state.table);
      if(!webglAvailable) {
        fallbackSharedViewState=state;
        if(state.metric_variant_key && dataset.metric_variants[state.metric_variant_key])fallbackVariantKey=state.metric_variant_key;
        else if(state.metric_variant_key)announce("分享口径在本文件中不存在；保留当前口径。");
        fallbackMetricSelects.forEach((select,index)=>{select.value=fallbackVariantKey.split("__")[index];});
      }
      if (state.date_filter) Object.assign(explorationFilters,{cutoff_date:state.date_filter.cutoff_date,date_mode:state.date_filter.mode});
      for (const field of ["measured_only","sensitivity_intelligence_half_width"]) if (state.display?.[field] !== undefined) explorationFilters[field] = state.display[field];
      applySharedViewState(state,announce);
      setExplorationFilters(explorationFilters);
      tableSearch.value = tableState.search_text;
      analysisFilter.value = tableState.analysis_filter;
      selectTab(tableState.active_tab);
    } finally { applyingHash = false; }
    refresh();
  }
  window.addEventListener("hashchange",applyHash);
  window.addEventListener("popstate",applyHash);
  window.addEventListener("pagehide",pausePlayback);
  document.addEventListener("visibilitychange",()=>{if(document.hidden)pausePlayback();});
  const difference = dataset.refresh_difference_report;
  if (difference) {
    const panel = createTextElement("details","","aa-model-exploration-controls");
    panel.id = "aa-refresh-difference-summary";
    panel.append(createTextElement("summary",`刷新差异${dataset.previous_data_date ? ` · 相比 ${dataset.previous_data_date}` : ""}`));
    const messages = difference.status === "comparable" ? [
      `新增 ${difference.added_model_uuids?.length || 0}；本次未出现 ${difference.absent_model_uuids?.length || 0}（不代表退市）。`,
      `字段缺失变化 ${difference.field_missingness_changes?.length || 0}；可比正值变化超过 10%：${difference.metric_changes_exceeding_ten_percent?.length || 0}。`,
      difference.frontier_comparison?.status === "comparable" ? "前沿进出来自匹配的历史科学快照。" : difference.frontier_comparison?.reason,
    ] : [difference.reason];
    for (const message of messages.filter(Boolean)) panel.append(createTextElement("p",message,"aa-exploration-note"));
    const details = createTextElement("pre",JSON.stringify(difference,null,2),"aa-refresh-difference-records");
    panel.append(details);
    (sidePanel.querySelector(".aa-side-panel-body") || sidePanel).append(panel);
    if (difference.index_version_warning) {
      const warning = createTextElement("p",difference.index_version_warning,"aa-report-header-data-quality-warning");
      warning.id = "aa-index-version-change-warning";
      document.getElementById("frontier-3d-report-header").append(warning);
    }
  }
  applyingHash = true;
  selectTab(tableState.active_tab);
  applyingHash = false;
  applyHash();
  refresh();
  return { getState, getFilters:()=>({...explorationFilters}), setExplorationFilters, sharedViewChanged, refresh, announce, pausePlayback };
}
