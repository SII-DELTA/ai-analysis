(function () {
  var DATASET_ELEMENT_ID = "frontier-3d-visualization-dataset-json";
  var rawDatasetElement = document.getElementById(DATASET_ELEMENT_ID);
  if (!rawDatasetElement) throw new Error("Missing frontier 3D visualization dataset script tag");
  var VISUALIZATION_DATASET = JSON.parse(rawDatasetElement.textContent);
  var METRIC_VARIANTS = VISUALIZATION_DATASET.metric_variants || {};
  var ACTIVE_METRIC_KEY = VISUALIZATION_DATASET.initial_variant_key;
  if (!METRIC_VARIANTS[ACTIVE_METRIC_KEY]) throw new Error("Missing initial frontier 3D metric variant: " + ACTIVE_METRIC_KEY);
  var DATA = METRIC_VARIANTS[ACTIVE_METRIC_KEY].payload;
  window.FRONTIER_3D_VISUALIZATION_DATASET = VISUALIZATION_DATASET;
  window.LINEAGE_DATA = DATA;                       // 测试/调试钩子
  var GD_ID = VISUALIZATION_DATASET.graph_div_id || "frontier3d";
  var HL, LL, models, baseGroups, lineages, nameToIndex, allBases;
  function loadMetricPayload(nextData) {
    DATA = nextData;
    window.LINEAGE_DATA = DATA;
    HL = DATA.pinned_highlight_trace_index;
    LL = DATA.lineage_line_trace_index;
    models = DATA.models;
    baseGroups = DATA.base_groups;
    lineages = DATA.lineages;
    nameToIndex = {};
    models.forEach(function (m, i) { nameToIndex[m.name] = i; });
    allBases = Object.keys(baseGroups).sort(function (a, b) {
      return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    });
  }
  loadMetricPayload(DATA);

  var pinnedBases = {};   // 集合：base_model_name -> true
  var hoverKey = null;    // 当前 hover 模型所属 lineage_key（临时）
  var gd = null;

  function baseLineageKey(base) {
    var idxs = baseGroups[base];
    return (idxs && idxs.length) ? models[idxs[0]].lineage_key : null;
  }
  function pinnedVariantIndices() {
    var out = [];
    Object.keys(pinnedBases).forEach(function (b) {
      (baseGroups[b] || []).forEach(function (i) { out.push(i); });
    });
    return out;
  }
  function fmt(n, d) {
    if (n === null || n === undefined || isNaN(n)) return "?";
    return Number(n).toFixed(d === undefined ? 1 : d);
  }
  function axisCoord(v, isLog) {
    // 注释（scene.annotations）的坐标须为「轴坐标」：对数轴传 log10(value)，
    // 线性轴传原始值。否则对数轴会把原始值当成 log10 → 注释飞到 10^value、撑爆量程。
    return (isLog && v > 0) ? Math.log10(v) : v;
  }
  function annText(m) {
    var p = m.panel;
    return "<b>" + m.name + "</b><br>智能 " + fmt(p.intelligence) +
      " · " + DATA.speed_axis_label + " " + fmt(p[DATA.speed_axis_field], 0) +
      " tok/s · " + DATA.cost_axis_label + " $" +
      fmt(p[DATA.cost_axis_field], 2) + " " + DATA.cost_axis_unit;
  }
  function matchBases(q) {
    q = (q || "").trim().toLowerCase();
    if (!q) return [];
    return allBases.filter(function (b) {
      return b.toLowerCase().indexOf(q) >= 0;
    }).slice(0, 40);
  }
  // 3D 视角保持：完全交给 layout/scene 的 uirevision（见 build_figure）。restyle / relayout
  // (scene.annotations) / Plotly.react 在 uirevision 不变时都会保住用户拖拽出的 camera，
  // 已在 headless [4c]/[7] 与 exp_uirevision 实测证实。此前的「快照 camera → 异步更新完再
  // Plotly.relayout 回填」是多余的第二道保险：一旦快照在用户拖拽前/页面加载时被捕获成默认
  // 视角，延迟回填就把视角强行拉回默认——正是「hover 后 1-2 秒视角回默认」的根因，故删除。

  // —— 重画：pin 高亮光环 + 常显注释 + 侧栏 + 谱系线 ——
  function rerenderPinned() {
    var idxs = pinnedVariantIndices();
    var xs = [], ys = [], zs = [];
    idxs.forEach(function (i) { var m = models[i]; xs.push(m.x); ys.push(m.y); zs.push(m.z); });
    var anns = idxs.map(function (i) {
      var m = models[i];
      return {
        x: axisCoord(m.x, DATA.cost_axis_is_log),
        y: axisCoord(m.y, DATA.speed_axis_is_log),
        z: m.z, text: annText(m),
        showarrow: true, arrowhead: 2, arrowsize: 1, arrowwidth: 1, ax: 18, ay: -28,
        font: { size: 10, color: "#222" }, align: "left",
        bgcolor: "rgba(255,255,255,0.9)", bordercolor: "#888", borderwidth: 1, borderpad: 3
      };
    });
    Plotly.restyle(gd, { x: [xs], y: [ys], z: [zs] }, [HL]).then(function () {
      return Plotly.relayout(gd, { "scene.annotations": anns });
    });
    renderSidePanel();
    redrawLineage();
  }

  function redrawLineage() {
    var keys = {};
    Object.keys(pinnedBases).forEach(function (b) { var k = baseLineageKey(b); if (k) keys[k] = true; });
    if (hoverKey) keys[hoverKey] = true;
    var xs = [], ys = [], zs = [], txt = [];
    Object.keys(keys).forEach(function (k) {
      var nodes = lineages[k];
      if (!nodes || nodes.length < 2) return;
      nodes.forEach(function (n) { xs.push(n.x); ys.push(n.y); zs.push(n.z); txt.push(n.label); });
      xs.push(null); ys.push(null); zs.push(null); txt.push("");   // 断开多条谱系
    });
    Plotly.restyle(gd, { x: [xs], y: [ys], z: [zs], text: [txt] }, [LL]);
  }

  function togglePin(base) {
    if (pinnedBases[base]) delete pinnedBases[base]; else pinnedBases[base] = true;
    rerenderPinned(); renderResults();
  }

  // —— hover：临时显示所属谱系线（不加注释，避免抖动）——
  // 关键防护：在 plotly_hover 回调里「同步」调用 Plotly.restyle 会强制 gl3d 重绘，
  // 重绘又重新求值光标下的 hover、再次 fire plotly_hover → onHover → restyle …… 形成
  // 无限重入循环：画面卡死、无法拖拽旋转，且 hover 标签因被反复中途重绘而被挤到左上角
  // (0,0) 而非锚在节点旁。两道防护：
  //   ① 去重——谱系 key 未变就不重画，直接打断重入循环（再次 fire 的是同一点）；
  //   ② requestAnimationFrame——把重画移出 hover 回调，避免在 Plotly 计算 hover 标签的
  //      同一帧内改 trace 数据（消除标签跳到左上角的故障）。
  var pendingLineageFrame = null;
  function scheduleLineageRedraw() {
    if (pendingLineageFrame !== null) return;     // 已排程，合并多次请求为一帧
    var raf = window.requestAnimationFrame || function (cb) { return setTimeout(cb, 16); };
    pendingLineageFrame = raf(function () { pendingLineageFrame = null; redrawLineage(); });
  }
  function onHover(ev) {
    var p = ev.points && ev.points[0];
    if (!p || !p.customdata) return;              // 自有 trace(HL/LL)无 customdata，天然跳过
    var mi = nameToIndex[p.customdata[0]];
    if (mi === undefined) return;
    var key = models[mi].lineage_key;
    if (key === hoverKey) return;                 // 去重：同一谱系无需重画（打断重入循环）
    hoverKey = key;
    scheduleLineageRedraw();
  }
  function onUnhover() {
    if (hoverKey === null) return;                // 去重
    hoverKey = null;
    scheduleLineageRedraw();
  }

  // —— DOM：搜索框（左上，避开按钮组）+ 结果列表 + 侧栏（左下）——
  var elSearchWrap, elInput, elResults, elPanel, elCostMetricSelect, elSpeedMetricSelect;
  function css(el, s) { for (var k in s) el.style[k] = s[k]; }

  // ═══ 突出度指标：视觉编码(改 Pareto 光环大小) + 排行侧栏 + 可调轴权重(仅加权超体积) ═══
  var STANDOUT_METRIC_REGISTRY = {
    C: { label: "趋势残差", weighted: false, digits: 1,
         get: function (m) { return m.standout ? m.standout.trend_residual : null; } },
    B: { label: "智能抬升", weighted: false, digits: 1,
         get: function (m) { return m.standout ? m.standout.intelligence_uplift : null; } },
    A: { label: "加权超体积", weighted: true, digits: 3, get: null },
    D: { label: "到前沿垂距", weighted: false, digits: 3,
         get: function (m) { return m.standout ? m.standout.frontier_distance : null; } }
  };
  var activeStandoutMetricKey = "C";
  var standoutAxisWeights = { intelligence: 1, cost: 1, speed: 1 };   // 指数权重 w=2^s
  var WEIGHT_AXES = [
    { key: "intelligence", label: "智能" },
    { key: "cost", label: "成本" },
    { key: "speed", label: "速度" }
  ];
  var elStandoutPanel, elStandoutMetricSelect, elStandoutRankingList,
      elWeightResetButton, elWeightAvailabilityNote;
  var weightSliderControls = {};   // axisKey -> { slider, numberInput }

  function frontierModels() {
    // 与 Pareto 黑色空心圈 trace 的点序一致（同一 kept 顺序 filter is_pareto=layer===1）
    return models.filter(function (m) { return m.panel && m.panel.layer === 1; });
  }

  // —— 归一空间 3D 排他超体积（镜像 frontier.py 的 Python 版）——
  function originAnchoredUnionArea(rects) {
    var s = rects.slice().sort(function (a, b) { return (b[0] - a[0]) || (b[1] - a[1]); });
    var area = 0, maxY = 0;
    for (var i = 0; i < s.length; i++) {
      var x = s[i][0], y = s[i][1];
      if (y > maxY) { area += x * (y - maxY); maxY = y; }
    }
    return area;
  }
  function hypervolume3d(points) {
    if (!points.length) return 0;
    var s = points.slice().sort(function (a, b) { return b[2] - a[2]; });
    var vol = 0, prevZ = null, rects = [];
    for (var i = 0; i < s.length; i++) {
      var z = s[i][2];
      if (prevZ !== null) vol += originAnchoredUnionArea(rects) * (prevZ - z);
      rects.push([s[i][0], s[i][1]]);
      prevZ = z;
    }
    vol += originAnchoredUnionArea(rects) * prevZ;
    return vol;
  }
  function exclusiveHypervolumeContributions(points) {
    var full = hypervolume3d(points);
    return points.map(function (unused, k) {
      var rest = points.filter(function (unused2, j) { return j !== k; });
      return full - hypervolume3d(rest);
    });
  }
  function weightedExclusiveHypervolumeValues(frontier) {
    // 指数权重进坐标 ḡ=g^w（单调保序 → 前沿成员不变，只改各点贡献量级）
    var pts = frontier.map(function (m) {
      return [Math.pow(m.g.c, standoutAxisWeights.cost),
              Math.pow(m.g.s, standoutAxisWeights.speed),
              Math.pow(m.g.i, standoutAxisWeights.intelligence)];
    });
    return exclusiveHypervolumeContributions(pts);
  }
  function standoutValuesForFrontier(frontier) {
    var spec = STANDOUT_METRIC_REGISTRY[activeStandoutMetricKey];
    if (spec.weighted) return weightedExclusiveHypervolumeValues(frontier);
    return frontier.map(function (m) {
      var v = spec.get(m);
      return (v === null || v === undefined || isNaN(v)) ? NaN : v;
    });
  }

  function applyStandoutVisualEncoding() {
    if (!gd) return;
    var frontier = frontierModels();
    var vals = standoutValuesForFrontier(frontier);
    var finite = vals.filter(function (v) { return isFinite(v); });
    var lo = finite.length ? Math.min.apply(null, finite) : 0;
    var hi = finite.length ? Math.max.apply(null, finite) : 1;
    // 归一到光环直径 [9,28]；无值(NaN，如无预算内他者的极端点)给最小圈 8
    var sizes = vals.map(function (v) {
      if (!isFinite(v)) return 8;
      return (hi > lo) ? (9 + 19 * (v - lo) / (hi - lo)) : 15;
    });
    // 与 rerenderPinned/redrawLineage 一致：直接 restyle 即可，uirevision 已保住 3D 视角
    // （不要再手动快照+回填 camera——stale 快照的延迟回填正是视角回默认的根因）
    Plotly.restyle(gd, { "marker.size": [sizes] }, [DATA.pareto_emphasis_trace_index]);
    renderStandoutRankingPanel(frontier, vals);
  }

  function renderStandoutRankingPanel(frontier, vals) {
    if (!elStandoutRankingList) return;
    var spec = STANDOUT_METRIC_REGISTRY[activeStandoutMetricKey];
    var ranked = frontier.map(function (m, i) { return { name: m.name, value: vals[i] }; })
      .sort(function (a, b) {
        var av = isFinite(a.value) ? a.value : -Infinity;
        var bv = isFinite(b.value) ? b.value : -Infinity;
        return bv - av;
      }).slice(0, 12);
    elStandoutRankingList.innerHTML = "";
    ranked.forEach(function (row, rank) {
      var line = document.createElement("div");
      css(line, { display: "flex", justifyContent: "space-between",
        padding: "3px 10px", borderBottom: "1px solid #f3f3f3", gap: "8px" });
      var left = document.createElement("span");
      left.textContent = (rank + 1) + ". " + row.name;
      css(left, { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" });
      var right = document.createElement("b");
      right.textContent = isFinite(row.value) ? Number(row.value).toFixed(spec.digits) : "—";
      css(right, { flex: "0 0 auto", color: "#1558b0" });
      line.appendChild(left); line.appendChild(right);
      elStandoutRankingList.appendChild(line);
    });
  }

  function selectStandoutMetric(key) {
    if (!STANDOUT_METRIC_REGISTRY[key]) return;
    activeStandoutMetricKey = key;
    if (elStandoutMetricSelect) elStandoutMetricSelect.value = key;
    updateWeightControlsAvailability();
    applyStandoutVisualEncoding();
  }
  function onWeightSliderInput(axisKey) {
    standoutAxisWeights[axisKey] = Math.pow(2, parseFloat(weightSliderControls[axisKey].slider.value));
    weightSliderControls[axisKey].numberInput.value = Number(standoutAxisWeights[axisKey]).toFixed(2);
    applyStandoutVisualEncoding();
  }
  function onWeightNumberInput(axisKey) {
    var w = parseFloat(weightSliderControls[axisKey].numberInput.value);
    if (!isFinite(w) || w <= 0) return;
    w = Math.min(4, Math.max(0.25, w));
    standoutAxisWeights[axisKey] = w;
    weightSliderControls[axisKey].slider.value = String(Math.log(w) / Math.log(2));
    applyStandoutVisualEncoding();
  }
  function setStandoutAxisWeights(wIntelligence, wCost, wSpeed) {
    standoutAxisWeights.intelligence = wIntelligence;
    standoutAxisWeights.cost = wCost;
    standoutAxisWeights.speed = wSpeed;
    syncWeightControlInputs();
    applyStandoutVisualEncoding();
  }
  function syncWeightControlInputs() {
    WEIGHT_AXES.forEach(function (axis) {
      var ctl = weightSliderControls[axis.key];
      if (!ctl) return;
      ctl.slider.value = String(Math.log(standoutAxisWeights[axis.key]) / Math.log(2));
      ctl.numberInput.value = Number(standoutAxisWeights[axis.key]).toFixed(2);
    });
  }
  function updateWeightControlsAvailability() {
    var enabled = STANDOUT_METRIC_REGISTRY[activeStandoutMetricKey].weighted;
    WEIGHT_AXES.forEach(function (axis) {
      var ctl = weightSliderControls[axis.key];
      if (!ctl) return;
      ctl.slider.disabled = !enabled;
      ctl.numberInput.disabled = !enabled;
    });
    if (elWeightResetButton) elWeightResetButton.disabled = !enabled;
    if (elWeightAvailabilityNote) elWeightAvailabilityNote.style.color = enabled ? "#666" : "#bbb";
  }

  function buildStandoutControlsDom() {
    elStandoutPanel = document.createElement("div");
    elStandoutPanel.setAttribute("id", "aa-standout-panel");
    css(elStandoutPanel, {
      position: "fixed", top: "52px", right: "10px", zIndex: "1000",
      width: "262px", maxHeight: "80vh", overflowY: "auto",
      padding: "8px 0 4px", border: "1px solid #ddd", borderRadius: "8px",
      background: "rgba(255,255,255,0.96)", boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      font: "12px/1.45 -apple-system,Segoe UI,Roboto,sans-serif"
    });

    // 标题可点折叠：展开时面板会盖住右侧厂商图例，折叠即让出图例(可点选过滤)
    var title = document.createElement("div");
    css(title, { padding: "0 10px 6px", fontWeight: "bold", borderBottom: "1px solid #eee",
      cursor: "pointer", userSelect: "none" });
    var caret = document.createElement("span");
    caret.textContent = "▾ ";
    title.appendChild(caret);
    title.appendChild(document.createTextNode("突出度指标（圈越大越突出）"));
    elStandoutPanel.appendChild(title);

    var body = document.createElement("div");
    title.addEventListener("click", function () {
      var collapsed = body.style.display === "none";
      body.style.display = collapsed ? "block" : "none";
      caret.textContent = collapsed ? "▾ " : "▸ ";
    });
    elStandoutPanel.appendChild(body);

    var selRow = document.createElement("div");
    css(selRow, { padding: "6px 10px" });
    selRow.appendChild(document.createTextNode("口径 "));
    elStandoutMetricSelect = document.createElement("select");
    elStandoutMetricSelect.setAttribute("id", "aa-standout-metric-select");
    [["C", "趋势残差（领先趋势面）"], ["B", "智能抬升（留一）"],
     ["A", "加权超体积（可调权重）"], ["D", "到前沿垂距"]].forEach(function (item) {
      var o = document.createElement("option");
      o.value = item[0]; o.textContent = item[1];
      elStandoutMetricSelect.appendChild(o);
    });
    elStandoutMetricSelect.value = activeStandoutMetricKey;
    elStandoutMetricSelect.addEventListener("change", function () {
      selectStandoutMetric(elStandoutMetricSelect.value);
    });
    selRow.appendChild(elStandoutMetricSelect);
    body.appendChild(selRow);

    elWeightAvailabilityNote = document.createElement("div");
    css(elWeightAvailabilityNote, { padding: "0 10px 4px", color: "#bbb", fontSize: "11px" });
    elWeightAvailabilityNote.textContent = "轴权重 w=2^s（仅「加权超体积」生效；w>1 放大该轴区分度）";
    body.appendChild(elWeightAvailabilityNote);

    WEIGHT_AXES.forEach(function (axis) {
      var row = document.createElement("div");
      css(row, { display: "flex", alignItems: "center", gap: "6px", padding: "2px 10px" });
      var lab = document.createElement("span");
      lab.textContent = axis.label; css(lab, { width: "28px", flex: "0 0 auto" });
      var slider = document.createElement("input");
      slider.type = "range"; slider.min = "-2"; slider.max = "2"; slider.step = "0.05";
      slider.value = "0"; slider.setAttribute("id", "aa-weight-slider-" + axis.key);
      css(slider, { flex: "1 1 auto", minWidth: "0" });
      var numberInput = document.createElement("input");
      numberInput.type = "number"; numberInput.min = "0.25"; numberInput.max = "4";
      numberInput.step = "0.05"; numberInput.value = "1.00";
      numberInput.setAttribute("id", "aa-weight-number-" + axis.key);
      css(numberInput, { width: "52px", flex: "0 0 auto", boxSizing: "border-box" });
      slider.addEventListener("input", function () { onWeightSliderInput(axis.key); });
      numberInput.addEventListener("input", function () { onWeightNumberInput(axis.key); });
      row.appendChild(lab); row.appendChild(slider); row.appendChild(numberInput);
      body.appendChild(row);
      weightSliderControls[axis.key] = { slider: slider, numberInput: numberInput };
    });

    var resetRow = document.createElement("div");
    css(resetRow, { padding: "4px 10px 8px", borderBottom: "1px solid #eee" });
    elWeightResetButton = document.createElement("button");
    elWeightResetButton.setAttribute("id", "aa-weight-reset");
    elWeightResetButton.textContent = "重置权重=1";
    elWeightResetButton.addEventListener("click", function () { setStandoutAxisWeights(1, 1, 1); });
    resetRow.appendChild(elWeightResetButton);
    body.appendChild(resetRow);

    var rankTitle = document.createElement("div");
    css(rankTitle, { padding: "6px 10px 2px", fontWeight: "bold", color: "#333" });
    rankTitle.textContent = "排行（前沿·Top 12）";
    body.appendChild(rankTitle);
    elStandoutRankingList = document.createElement("div");
    elStandoutRankingList.setAttribute("id", "aa-standout-ranking");
    body.appendChild(elStandoutRankingList);

    document.body.appendChild(elStandoutPanel);
    updateWeightControlsAvailability();
  }

  function buildDom() {
    var metricControls = document.createElement("div");
    metricControls.setAttribute("id", "aa-metric-controls");
    css(metricControls, {
      position: "fixed", top: "10px", right: "10px", zIndex: "1000",
      padding: "6px 8px", border: "1px solid #ddd", borderRadius: "6px",
      background: "rgba(255,255,255,0.96)", boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
      font: "12px/1.4 -apple-system,Segoe UI,Roboto,sans-serif"
    });
    metricControls.appendChild(document.createTextNode("成本 "));
    elCostMetricSelect = document.createElement("select");
    elCostMetricSelect.setAttribute("id", "aa-cost-metric-select");
    [["effective", "有效运行成本"], ["blended", "7:2:1 混合单价"]].forEach(function (item) {
      var option = document.createElement("option");
      option.value = item[0]; option.textContent = item[1];
      elCostMetricSelect.appendChild(option);
    });
    metricControls.appendChild(elCostMetricSelect);
    metricControls.appendChild(document.createTextNode("　速度 "));
    elSpeedMetricSelect = document.createElement("select");
    elSpeedMetricSelect.setAttribute("id", "aa-speed-metric-select");
    [["effective", "有效速度"], ["raw", "原始速度"]].forEach(function (item) {
      var option = document.createElement("option");
      option.value = item[0]; option.textContent = item[1];
      elSpeedMetricSelect.appendChild(option);
    });
    metricControls.appendChild(elSpeedMetricSelect);
    var initialParts = ACTIVE_METRIC_KEY.split("__");
    elCostMetricSelect.value = initialParts[0];
    elSpeedMetricSelect.value = initialParts[1];
    document.body.appendChild(metricControls);

    elSearchWrap = document.createElement("div");
    css(elSearchWrap, {
      position: "fixed", top: "10px", left: "132px", zIndex: "1000",
      width: "256px", font: "12px/1.4 -apple-system,Segoe UI,Roboto,sans-serif"
    });
    elInput = document.createElement("input");
    elInput.type = "text";
    elInput.placeholder = "搜索模型并 pin（按基模型分组）…";
    elInput.setAttribute("id", "aa-search-input");
    css(elInput, {
      width: "100%", boxSizing: "border-box", padding: "6px 8px",
      border: "1px solid #bbb", borderRadius: "6px", outline: "none",
      background: "rgba(255,255,255,0.95)", boxShadow: "0 1px 4px rgba(0,0,0,0.12)"
    });
    elResults = document.createElement("div");
    elResults.setAttribute("id", "aa-search-results");
    css(elResults, {
      marginTop: "4px", maxHeight: "40vh", overflowY: "auto",
      background: "rgba(255,255,255,0.97)", border: "1px solid #ddd",
      borderRadius: "6px", boxShadow: "0 2px 8px rgba(0,0,0,0.12)", display: "none"
    });
    elSearchWrap.appendChild(elInput);
    elSearchWrap.appendChild(elResults);
    document.body.appendChild(elSearchWrap);

    elPanel = document.createElement("div");
    elPanel.setAttribute("id", "aa-pinned-panel");
    css(elPanel, {
      position: "fixed", left: "8px", bottom: "8px", zIndex: "1000",
      width: "286px", maxHeight: "46vh", overflowY: "auto",
      background: "rgba(255,255,255,0.95)", border: "1px solid #ddd",
      borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
      font: "12px/1.45 -apple-system,Segoe UI,Roboto,sans-serif", display: "none"
    });
    document.body.appendChild(elPanel);

    elInput.addEventListener("input", renderResults);
    elCostMetricSelect.addEventListener("change", activateSelectedMetricCombination);
    elSpeedMetricSelect.addEventListener("change", activateSelectedMetricCombination);

    buildStandoutControlsDom();
  }

  function activateSelectedMetricCombination() {
    return activateMetricCombination(elCostMetricSelect.value, elSpeedMetricSelect.value);
  }

  function activateMetricCombination(costMetricName, speedMetricName) {
    var key = costMetricName + "__" + speedMetricName;
    var variant = METRIC_VARIANTS[key];
    if (!variant || key === ACTIVE_METRIC_KEY) return Promise.resolve(false);
    pinnedBases = {};
    hoverKey = null;
    ACTIVE_METRIC_KEY = key;
    return Plotly.react(gd, variant.data, variant.layout).then(function () {
      loadMetricPayload(variant.payload);
      renderResults();
      renderSidePanel();
      applyStandoutVisualEncoding();   // 前沿随口径变，重设光环大小 + 排行榜
      return true;
    });
  }

  function renderResults() {
    var q = elInput.value;
    var hits = matchBases(q);
    elResults.innerHTML = "";
    if (!q.trim() || !hits.length) { elResults.style.display = "none"; return; }
    hits.forEach(function (base) {
      var n = (baseGroups[base] || []).length;
      var row = document.createElement("div");
      var pinned = !!pinnedBases[base];
      css(row, {
        padding: "5px 8px", cursor: "pointer", borderBottom: "1px solid #f0f0f0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: pinned ? "#eef6ff" : "transparent"
      });
      var left = document.createElement("span");
      left.textContent = base;
      css(left, { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginRight: "8px" });
      var right = document.createElement("span");
      right.textContent = (pinned ? "✓ " : "") + n + " 档";
      css(right, { color: pinned ? "#1a7" : "#999", flex: "0 0 auto", fontSize: "11px" });
      row.appendChild(left); row.appendChild(right);
      row.addEventListener("click", function () { togglePin(base); });
      row.addEventListener("mouseenter", function () { if (!pinned) row.style.background = "#f5f5f5"; });
      row.addEventListener("mouseleave", function () { if (!pinnedBases[base]) row.style.background = "transparent"; });
      elResults.appendChild(row);
    });
    elResults.style.display = "block";
  }

  function renderSidePanel() {
    var bases = Object.keys(pinnedBases);
    if (!bases.length) { elPanel.style.display = "none"; elPanel.innerHTML = ""; return; }
    elPanel.innerHTML = "";
    var head = document.createElement("div");
    css(head, { padding: "7px 10px", borderBottom: "1px solid #eee", display: "flex",
      justifyContent: "space-between", alignItems: "center", position: "sticky", top: "0",
      background: "rgba(255,255,255,0.97)" });
    var title = document.createElement("b"); title.textContent = "已固定 " + bases.length + " 个模型";
    var clear = document.createElement("a"); clear.textContent = "全部清除"; clear.href = "javascript:void(0)";
    css(clear, { color: "#c33", textDecoration: "none", fontSize: "11px" });
    clear.addEventListener("click", function () { pinnedBases = {}; rerenderPinned(); renderResults(); });
    head.appendChild(title); head.appendChild(clear);
    elPanel.appendChild(head);

    bases.sort().forEach(function (base) {
      var card = document.createElement("div");
      css(card, { padding: "6px 10px", borderBottom: "1px solid #f3f3f3" });
      var hdr = document.createElement("div");
      css(hdr, { display: "flex", justifyContent: "space-between", alignItems: "baseline" });
      var nm = document.createElement("b"); nm.textContent = base;
      var rm = document.createElement("a"); rm.textContent = "✕"; rm.href = "javascript:void(0)";
      css(rm, { color: "#c33", textDecoration: "none", marginLeft: "8px", flex: "0 0 auto" });
      rm.addEventListener("click", function () { delete pinnedBases[base]; rerenderPinned(); renderResults(); });
      hdr.appendChild(nm); hdr.appendChild(rm);
      card.appendChild(hdr);
      (baseGroups[base] || []).forEach(function (i) {
        var m = models[i], p = m.panel;
        var line = document.createElement("div");
        css(line, { color: "#444", fontSize: "11px", marginTop: "2px" });
        line.textContent = "· " + m.name + " — 智能 " + fmt(p.intelligence) +
          " · " + DATA.speed_axis_label + " " + fmt(p[DATA.speed_axis_field], 0) +
          " · " + DATA.cost_axis_label + " $" + fmt(p[DATA.cost_axis_field], 2) +
          " · " + p.release_date;
        card.appendChild(line);
      });
      var lk = baseLineageKey(base);
      if (lk && lineages[lk] && lineages[lk].length >= 2) {
        var ln = document.createElement("div");
        css(ln, { color: "#777", fontSize: "11px", marginTop: "2px", fontStyle: "italic" });
        ln.textContent = "谱系 " + lk.replace("||", " · ") + "：" + lineages[lk].length + " 代";
        card.appendChild(ln);
      }
      elPanel.appendChild(card);
    });
    elPanel.style.display = "block";
  }

  function ready(cb) {
    gd = document.getElementById(GD_ID);
    if (!gd || typeof Plotly === "undefined") {
      setTimeout(function () { ready(cb); }, 50);
      return;
    }
    var initialVariant = METRIC_VARIANTS[ACTIVE_METRIC_KEY];
    Plotly.newPlot(gd, initialVariant.data, initialVariant.layout, { responsive: true }).then(function () {
      cb();
    });
  }

  ready(function () {
    buildDom();
    gd.on("plotly_hover", onHover);
    gd.on("plotly_unhover", onUnhover);
    applyStandoutVisualEncoding();   // 初始按默认指标(趋势残差)编码光环 + 排行榜
    // —— 测试/调试钩子（headless 断言用）——
    window.aaPinBase = function (b) { pinnedBases[b] = true; rerenderPinned(); renderResults(); };
    window.aaUnpinBase = function (b) { delete pinnedBases[b]; rerenderPinned(); renderResults(); };
    window.aaTogglePin = togglePin;
    window.aaShowLineageForName = function (nm) {
      var mi = nameToIndex[nm]; if (mi === undefined) return false;
      hoverKey = models[mi].lineage_key; redrawLineage(); return true;
    };
    window.aaClearHover = function () { hoverKey = null; redrawLineage(); };
    // 真实事件处理器（含去重 + rAF 排程），供 headless 模拟 plotly_hover 验证重入防护
    window.aaOnHover = onHover;
    window.aaOnUnhover = onUnhover;
    window.aaMatchBases = matchBases;
    window.aaSetMetricCombination = activateMetricCombination;
    // —— 突出度钩子 ——
    window.aaSelectStandoutMetric = selectStandoutMetric;
    window.aaSetWeights = function (wIntelligence, wCost, wSpeed) {
      setStandoutAxisWeights(wIntelligence, wCost, wSpeed);
    };
    window.aaStandoutRanking = function () {
      var frontier = frontierModels();
      var vals = standoutValuesForFrontier(frontier);
      return {
        metric: activeStandoutMetricKey,
        weights: {
          intelligence: standoutAxisWeights.intelligence,
          cost: standoutAxisWeights.cost,
          speed: standoutAxisWeights.speed
        },
        ranking: frontier.map(function (m, i) { return { name: m.name, value: vals[i] }; })
          .sort(function (a, b) {
            var av = isFinite(a.value) ? a.value : -Infinity;
            var bv = isFinite(b.value) ? b.value : -Infinity;
            return bv - av;
          })
      };
    };
    window.aaState = function () {
      var paretoSize = gd.data[DATA.pareto_emphasis_trace_index].marker.size;
      return {
        activeMetricKey: ACTIVE_METRIC_KEY,
        costAxisField: DATA.cost_axis_field,
        speedAxisField: DATA.speed_axis_field,
        pinned: Object.keys(pinnedBases), hoverKey: hoverKey,
        annCount: (gd._fullLayout && gd._fullLayout.scene && gd._fullLayout.scene.annotations || []).length,
        highlightLen: (gd.data[HL].x || []).length,
        lineageLen: (gd.data[LL].x || []).length,
        lineageKeys: Object.keys(lineages).length,
        standoutMetric: activeStandoutMetricKey,
        standoutWeights: {
          intelligence: standoutAxisWeights.intelligence,
          cost: standoutAxisWeights.cost,
          speed: standoutAxisWeights.speed
        },
        paretoMarkerSizeLen: Array.isArray(paretoSize) ? paretoSize.length : 0,
        frontierCount: frontierModels().length
      };
    };
  });
})();
