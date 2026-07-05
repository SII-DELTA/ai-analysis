(function () {
  var DATASET_ELEMENT_ID = "frontier-3d-visualization-dataset-json";
  var rawDatasetElement = document.getElementById(DATASET_ELEMENT_ID);
  if (!rawDatasetElement) throw new Error("Missing frontier 3D visualization dataset script tag");

  var VISUALIZATION_DATASET = JSON.parse(rawDatasetElement.textContent);
  var METRIC_VARIANTS = VISUALIZATION_DATASET.metric_variants || {};
  var ACTIVE_METRIC_KEY = VISUALIZATION_DATASET.initial_variant_key;
  if (!METRIC_VARIANTS[ACTIVE_METRIC_KEY]) {
    throw new Error("Missing initial frontier 3D metric variant: " + ACTIVE_METRIC_KEY);
  }

  var DATA = METRIC_VARIANTS[ACTIVE_METRIC_KEY].payload;
  window.FRONTIER_3D_VISUALIZATION_DATASET = VISUALIZATION_DATASET;
  window.LINEAGE_DATA = DATA;

  var GD_ID = VISUALIZATION_DATASET.graph_div_id || "frontier3d";
  var gd = null;
  var shell = null;
  var sidePanel = null;
  var sidePanelExpanded = true;

  var HL, LL, LN, RV, FW, FM, AS, models, baseGroups, reasoningVariantGroups,
      lineages, nameToIndex, allBases;

  function loadMetricPayload(nextData) {
    DATA = nextData;
    window.LINEAGE_DATA = DATA;
    HL = DATA.pinned_highlight_trace_index;
    LL = DATA.lineage_line_trace_index;
    LN = DATA.lineage_node_trace_index;
    RV = DATA.reasoning_variant_line_trace_index;
    FW = DATA.frontier_wireframe_trace_index;
    FM = DATA.frontier_mesh_trace_index;
    AS = DATA.achievable_surface_trace_index;
    models = DATA.models || [];
    baseGroups = DATA.base_groups || {};
    reasoningVariantGroups = DATA.reasoning_variant_group_model_indices_by_base_model_name || {};
    lineages = DATA.lineages || {};
    nameToIndex = {};
    models.forEach(function (m, i) { nameToIndex[m.name] = i; });
    allBases = Object.keys(baseGroups).sort(function (a, b) {
      return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    });
  }
  loadMetricPayload(DATA);

  var pinnedBases = {};
  var hoverLineageKey = null;
  var hoverReasoningBase = null;
  var pendingHoverStateClearTimer = null;
  var hoverStateClearDelayMilliseconds = 180;
  var frontierStyle = "wireframe";
  var achievableSurfaceVisible = false;
  var pinnedCardVisibleFieldKeys = {};

  var elInput, elResults, elPinnedPanel, elCostMetricSelect, elSpeedMetricSelect,
      elCurrentViewPanel, elSidePanelToggleButton, elAchievableSurfaceToggle,
      elFrontierStyleButtons, elPinnedCardFieldControls;

  function fmt(n, d) {
    if (n === null || n === undefined || isNaN(n)) return "?";
    return Number(n).toFixed(d === undefined ? 1 : d);
  }

  var PINNED_CARD_VISIBLE_FIELDS_STORAGE_KEY = "frontier3d.pinnedCardVisibleFieldKeys.v1";
  var PINNED_CARD_FIELD_DEFINITIONS = [
    {
      key: "reasoning_level_label", label: "档位",
      value: function (m) { return m.reasoning_level_label; }
    },
    {
      key: "intelligence", label: "智能",
      value: function (m) { return fmt(m.panel.intelligence, 1); }
    },
    {
      key: "selected_speed_metric", label: "当前速度",
      value: function (m) { return fmt(m.panel[DATA.speed_axis_field], 0) + " tok/s"; }
    },
    {
      key: "selected_cost_metric", label: "当前成本",
      value: function (m) { return "$" + fmt(m.panel[DATA.cost_axis_field], 2); }
    },
    {
      key: "release_date", label: "发布日期",
      value: function (m) { return m.panel.release_date; }
    },
    {
      key: "effective_speed", label: "有效速度",
      value: function (m) { return fmt(m.panel.eff_speed, 0) + " tok/s"; }
    },
    {
      key: "output_speed", label: "原始速度",
      value: function (m) { return fmt(m.panel.output_speed, 0) + " tok/s"; }
    },
    {
      key: "effective_cost", label: "运行成本",
      value: function (m) { return "$" + fmt(m.panel.cost_to_run, 2); }
    },
    {
      key: "blended_price", label: "混合单价",
      value: function (m) {
        return "$" + fmt(m.panel.blended_price_cache_input_output_7_to_2_to_1, 2) + "/M";
      }
    },
    {
      key: "pareto_layer", label: "Pareto 层",
      value: function (m) { return fmt(m.panel.layer, 0); }
    }
  ];
  var DEFAULT_PINNED_CARD_VISIBLE_FIELD_KEYS = [
    "reasoning_level_label",
    "intelligence",
    "selected_speed_metric",
    "selected_cost_metric",
    "release_date"
  ];

  function loadPinnedCardVisibleFieldKeys() {
    var defaults = {};
    DEFAULT_PINNED_CARD_VISIBLE_FIELD_KEYS.forEach(function (key) { defaults[key] = true; });
    try {
      var raw = window.localStorage && window.localStorage.getItem(PINNED_CARD_VISIBLE_FIELDS_STORAGE_KEY);
      if (!raw) return defaults;
      var parsed = JSON.parse(raw);
      var next = {};
      PINNED_CARD_FIELD_DEFINITIONS.forEach(function (field) {
        next[field.key] = !!parsed[field.key];
      });
      return next;
    } catch (err) {
      return defaults;
    }
  }
  pinnedCardVisibleFieldKeys = loadPinnedCardVisibleFieldKeys();

  function savePinnedCardVisibleFieldKeys() {
    try {
      if (window.localStorage) {
        window.localStorage.setItem(
          PINNED_CARD_VISIBLE_FIELDS_STORAGE_KEY,
          JSON.stringify(pinnedCardVisibleFieldKeys)
        );
      }
    } catch (err) {
      // localStorage can be unavailable in restricted browser contexts.
    }
  }

  function baseLineageKey(base) {
    var idxs = baseGroups[base];
    return (idxs && idxs.length) ? models[idxs[0]].lineage_key : null;
  }

  function pinnedVariantIndices() {
    var out = [];
    Object.keys(pinnedBases).forEach(function (base) {
      (baseGroups[base] || []).forEach(function (i) { out.push(i); });
    });
    return out;
  }

  function matchBases(query) {
    query = (query || "").trim().toLowerCase();
    if (!query) return [];
    return allBases.filter(function (base) {
      return base.toLowerCase().indexOf(query) >= 0;
    }).slice(0, 40);
  }

  // ── 3D 相机保持（非默认坐标轴组合下 拖拽后 hover 视角被拉回默认 的根因修复）──────────
  // 根因：非默认坐标轴组合的 gl3d 场景由 activateMetricCombination 的 Plotly.react 重建。gl3d 的
  // restyle 重绘会把相机复位到 uirevision 的「用户编辑基线」(preGUI)；该基线在 react 时被按 layout 里
  // 写死的默认相机 seed。而**真实鼠标拖拽旋转虽更新了 live GL 相机 + _fullLayout.scene.camera，却不更新
  // preGUI 基线**（唯有显式 Plotly.relayout 才把相机记为「用户编辑」写进 preGUI）。于是在 react 重建过的
  // 场景上：拖拽 → hover 触发 restyle → 相机按仍是默认的 preGUI 基线被拉回默认视角。默认组合由初始 newPlot
  // 建立、其拖拽会正确进入 preGUI，故不受影响——这正是「只有默认组合修好过」的机制来源。
  // 修法（installSceneCameraDragCommit）：监听 gl3d 拖拽结束发出的 plotly_relayout(scene.camera)，用一次显式
  // Plotly.relayout 把当前视角「提交」进 preGUI 基线，之后任何 restyle 都按当前视角复位、不再跳。
  // 三个关键工程点（都是实测踩过的坑）：
  //  1) 提交在**拖拽时**发生（不在 hover/restyle 路径），故既有 [4c-guard]「hover 期间不显式回填 camera」仍成立。
  //  2) 提交源必须是 _fullLayout.scene.camera（Plotly 自身的相机表示），**不能**用 _scene.getCamera() 的 live
  //     相机：在 blended 等非均匀 aspectratio 的场景下，relayout(getCamera()) 会被 gl3d 重新归一化而每次漂移，
  //     配合去重就成了无限重入 relayout、冻结整张图。_fullLayout.scene.camera 是拖拽已写好的值，relayout 它幂等。
  //  3) 双重防重入：committingSceneCamera 在途标志吞掉本次 relayout 自身补发的 plotly_relayout；
  //     lastCommittedSceneCameraEye 去重挡掉「相机没变还反复提交」。二者缺一，非均匀 aspectratio 下都可能死循环。
  var committingSceneCamera = false;
  var lastCommittedSceneCameraEye = null;

  function sceneCameraFromLayout() {
    if (!gd || !gd._fullLayout || !gd._fullLayout.scene) return null;
    var cam = gd._fullLayout.scene.camera;
    if (!cam || !cam.eye || !cam.center || !cam.up) return null;
    return {
      eye: { x: cam.eye.x, y: cam.eye.y, z: cam.eye.z },
      center: { x: cam.center.x, y: cam.center.y, z: cam.center.z },
      up: { x: cam.up.x, y: cam.up.y, z: cam.up.z }
    };
  }

  function sceneCameraEyeChangedSinceCommit(camera) {
    var prev = lastCommittedSceneCameraEye;
    if (!prev) return true;
    var eps = 1e-4;
    return ["x", "y", "z"].some(function (axis) {
      return Math.abs((camera.eye[axis] || 0) - (prev[axis] || 0)) > eps;
    });
  }

  function releaseSceneCameraCommitLatch() {
    committingSceneCamera = false;
  }

  // 把 _fullLayout.scene.camera（= 拖拽后 Plotly 已写好的当前视角）显式提交进 uirevision 基线(preGUI)。
  function commitSceneCameraToUiRevision() {
    if (committingSceneCamera) return Promise.resolve();
    var camera = sceneCameraFromLayout();
    if (!camera || !sceneCameraEyeChangedSinceCommit(camera)) return Promise.resolve();
    committingSceneCamera = true;
    lastCommittedSceneCameraEye = { x: camera.eye.x, y: camera.eye.y, z: camera.eye.z };
    return Plotly.relayout(gd, { "scene.camera": camera }).then(
      releaseSceneCameraCommitLatch, releaseSceneCameraCommitLatch
    );
  }

  function installSceneCameraDragCommit() {
    if (!gd || !gd.on) return;
    gd.on("plotly_relayout", function (eventData) {
      if (!eventData) return;
      var touchedCamera = Object.keys(eventData).some(function (k) {
        return k === "scene.camera" || k.indexOf("scene.camera.") === 0;
      });
      if (touchedCamera) commitSceneCameraToUiRevision();
    });
  }

  function restyleTraceVisible(traceIndex, visibleValue) {
    if (!gd || traceIndex === null || traceIndex === undefined) return Promise.resolve();
    if (!traceAt(traceIndex)) return Promise.resolve();
    return Plotly.restyle(gd, { visible: [visibleValue] }, [traceIndex]);
  }

  function traceAt(traceIndex) {
    if (!gd || traceIndex === null || traceIndex === undefined || !gd.data) return null;
    if (traceIndex < 0 || traceIndex >= gd.data.length) return null;
    return gd.data[traceIndex] || null;
  }

  function restyleTraceData(traceIndex, update) {
    if (!traceAt(traceIndex)) return Promise.resolve();
    return Plotly.restyle(gd, update, [traceIndex]);
  }

  function clearPlotlyDragCovers() {
    document.querySelectorAll(".dragcover").forEach(function (el) {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    });
  }

  function releasePlotlyInteractionState() {
    clearPlotlyDragCovers();
    if (!gd || !gd._fullLayout || !gd._fullLayout.scene || !gd._fullLayout.scene._scene) return;
    var glplot = gd._fullLayout.scene._scene.glplot;
    if (!glplot) return;
    glplot._mouseRotating = false;
    glplot._prevButtons = 0;
    glplot._stopped = false;
    if (glplot.mouseListener) glplot.mouseListener.buttons = 0;
  }

  function schedulePlotlyDragCoverClear(delayMilliseconds) {
    window.setTimeout(clearPlotlyDragCovers, delayMilliseconds);
  }

  function releasePlotlyDragCoverSoon() {
    releasePlotlyInteractionState();
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(function () {
        clearPlotlyDragCovers();
        window.requestAnimationFrame(clearPlotlyDragCovers);
      });
    }
    [50, 100, 200, 400, 800, 1200, 1600].forEach(schedulePlotlyDragCoverClear);
  }

  function traceArrayLength(traceIndex, fieldName) {
    var trace = traceAt(traceIndex);
    var values = trace && trace[fieldName];
    return Array.isArray(values) ? values.length : 0;
  }

  function traceMarkerSizeArrayLength(traceIndex) {
    var trace = traceAt(traceIndex);
    var markerSize = trace && trace.marker && trace.marker.size;
    return Array.isArray(markerSize) ? markerSize.length : 0;
  }

  function applyFrontierTraceVisibility() {
    var wireVisible = frontierStyle === "wireframe" ? true : "legendonly";
    var meshVisible = frontierStyle === "solid" ? true : "legendonly";
    var surfaceVisible = achievableSurfaceVisible ? true : "legendonly";
    return Promise.all([
      restyleTraceVisible(FW, wireVisible),
      restyleTraceVisible(FM, meshVisible),
      restyleTraceVisible(AS, surfaceVisible)
    ]);
  }

  function setFrontierStyle(nextStyle) {
    frontierStyle = nextStyle;
    if (elFrontierStyleButtons) {
      elFrontierStyleButtons.forEach(function (button) {
        button.setAttribute("aria-pressed", button.getAttribute("data-frontier-style") === frontierStyle ? "true" : "false");
      });
    }
    return applyFrontierTraceVisibility();
  }

  function setAchievableSurfaceVisible(nextVisible) {
    achievableSurfaceVisible = !!nextVisible;
    if (elAchievableSurfaceToggle) elAchievableSurfaceToggle.checked = achievableSurfaceVisible;
    return applyFrontierTraceVisibility();
  }

  function renderCurrentView() {
    if (!elCurrentViewPanel) return;
    var view = DATA.current_view || {};
    elCurrentViewPanel.innerHTML = "";
    var title = document.createElement("summary");
    title.className = "aa-section-title aa-collapsible-summary";
    title.textContent = "当前视图";
    elCurrentViewPanel.appendChild(title);

    var dl = document.createElement("dl");
    dl.className = "aa-current-view-grid";
    [
      ["数据日期", view.data_date || VISUALIZATION_DATASET.data_date || "?"],
      ["成本口径", (view.cost_metric_label || DATA.cost_axis_label) + "，" + (view.cost_metric_note || "")],
      ["速度口径", (view.speed_metric_label || DATA.speed_axis_label) + "，" + (view.speed_metric_note || "")],
      ["模型数", String(view.kept_model_count || models.length)],
      ["Pareto 数", String(view.pareto_model_count || frontierModels().length)]
    ].forEach(function (row) {
      var dt = document.createElement("dt");
      var dd = document.createElement("dd");
      dt.textContent = row[0];
      dd.textContent = row[1];
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
    elCurrentViewPanel.appendChild(dl);
  }

  function setSidePanelExpanded(nextExpanded) {
    sidePanelExpanded = !!nextExpanded;
    if (shell) shell.classList.toggle("is-side-panel-collapsed", !sidePanelExpanded);
    if (elSidePanelToggleButton) {
      elSidePanelToggleButton.textContent = sidePanelExpanded ? ">" : "<";
      elSidePanelToggleButton.title = sidePanelExpanded ? "收起控制栏" : "展开控制栏";
      elSidePanelToggleButton.setAttribute("aria-expanded", sidePanelExpanded ? "true" : "false");
    }
    if (gd && Plotly && Plotly.Plots) {
      window.setTimeout(function () { Plotly.Plots.resize(gd); }, 210);
    }
  }

  function createSection(id, titleText) {
    var section = document.createElement("section");
    section.className = "aa-control-section";
    if (id) section.id = id;
    if (titleText) {
      var title = document.createElement("h2");
      title.className = "aa-section-title";
      title.textContent = titleText;
      section.appendChild(title);
    }
    return section;
  }

  function createToolbarGroup(labelText) {
    var group = document.createElement("div");
    group.className = "aa-toolbar-group";
    if (labelText) {
      var label = document.createElement("span");
      label.className = "aa-toolbar-group-label";
      label.textContent = labelText;
      group.appendChild(label);
    }
    return group;
  }

  function createToolbarSelectField(inlineLabelText, selectControl) {
    var field = document.createElement("label");
    field.className = "aa-toolbar-field";
    var span = document.createElement("span");
    span.className = "aa-toolbar-field-label";
    span.textContent = inlineLabelText;
    field.appendChild(span);
    field.appendChild(selectControl);
    return field;
  }

  function buildMetricControlsDom() {
    var group = createToolbarGroup("坐标轴口径");
    group.id = "aa-metric-controls";

    elCostMetricSelect = document.createElement("select");
    elCostMetricSelect.id = "aa-cost-metric-select";
    [["effective", "有效运行成本"], ["blended", "7:2:1 混合单价"]].forEach(function (item) {
      var option = document.createElement("option");
      option.value = item[0];
      option.textContent = item[1];
      elCostMetricSelect.appendChild(option);
    });
    group.appendChild(createToolbarSelectField("成本", elCostMetricSelect));

    elSpeedMetricSelect = document.createElement("select");
    elSpeedMetricSelect.id = "aa-speed-metric-select";
    [["effective", "有效速度"], ["raw", "原始速度"]].forEach(function (item) {
      var option = document.createElement("option");
      option.value = item[0];
      option.textContent = item[1];
      elSpeedMetricSelect.appendChild(option);
    });
    group.appendChild(createToolbarSelectField("速度", elSpeedMetricSelect));

    var initialParts = ACTIVE_METRIC_KEY.split("__");
    elCostMetricSelect.value = initialParts[0];
    elSpeedMetricSelect.value = initialParts[1];
    elCostMetricSelect.addEventListener("change", activateSelectedMetricCombination);
    elSpeedMetricSelect.addEventListener("change", activateSelectedMetricCombination);
    return group;
  }

  function buildFrontierControlsDom() {
    var group = createToolbarGroup("前沿外观");
    var segmented = document.createElement("div");
    segmented.className = "aa-segmented-control";
    elFrontierStyleButtons = [];
    [
      ["wireframe", "线框"],
      ["solid", "实心面"],
      ["hidden", "隐藏前沿"]
    ].forEach(function (item) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = item[1];
      button.setAttribute("data-frontier-style", item[0]);
      button.setAttribute("aria-pressed", item[0] === frontierStyle ? "true" : "false");
      button.addEventListener("click", function () { setFrontierStyle(item[0]); });
      segmented.appendChild(button);
      elFrontierStyleButtons.push(button);
    });
    group.appendChild(segmented);

    var toggleLabel = document.createElement("label");
    toggleLabel.className = "aa-toggle-row";
    elAchievableSurfaceToggle = document.createElement("input");
    elAchievableSurfaceToggle.id = "aa-achievable-surface-toggle";
    elAchievableSurfaceToggle.type = "checkbox";
    elAchievableSurfaceToggle.checked = achievableSurfaceVisible;
    elAchievableSurfaceToggle.addEventListener("change", function () {
      setAchievableSurfaceVisible(elAchievableSurfaceToggle.checked);
    });
    toggleLabel.appendChild(elAchievableSurfaceToggle);
    toggleLabel.appendChild(document.createTextNode("可达前沿曲面"));
    group.appendChild(toggleLabel);
    return group;
  }

  function buildSearchDom() {
    var section = createSection("aa-search-panel", "搜索与 pin");
    elInput = document.createElement("input");
    elInput.type = "text";
    elInput.id = "aa-search-input";
    elInput.className = "aa-search-input";
    elInput.placeholder = "搜索模型，按基模型分组 pin";
    elResults = document.createElement("div");
    elResults.id = "aa-search-results";
    elResults.className = "aa-search-results";
    section.appendChild(elInput);
    section.appendChild(elResults);
    elInput.addEventListener("input", renderResults);
    return section;
  }

  function buildPinnedCardFieldsDom() {
    // Demo A: 固定卡片字段做成可折叠分区，默认收起（10 个复选框体量大，收起以免拥挤）。
    var section = document.createElement("details");
    section.id = "aa-pinned-card-field-controls";
    section.className = "aa-control-section aa-collapsible-section";
    var summary = document.createElement("summary");
    summary.className = "aa-section-title aa-collapsible-summary";
    summary.textContent = "固定卡片字段";
    section.appendChild(summary);
    elPinnedCardFieldControls = document.createElement("div");
    elPinnedCardFieldControls.className = "aa-pinned-card-field-grid";
    PINNED_CARD_FIELD_DEFINITIONS.forEach(function (field) {
      var label = document.createElement("label");
      label.className = "aa-checkbox-chip";
      var input = document.createElement("input");
      input.type = "checkbox";
      input.checked = !!pinnedCardVisibleFieldKeys[field.key];
      input.setAttribute("data-pinned-card-field-key", field.key);
      input.addEventListener("change", function () {
        pinnedCardVisibleFieldKeys[field.key] = input.checked;
        savePinnedCardVisibleFieldKeys();
        renderSidePanel();
      });
      label.appendChild(input);
      label.appendChild(document.createTextNode(field.label));
      elPinnedCardFieldControls.appendChild(label);
    });
    section.appendChild(elPinnedCardFieldControls);
    return section;
  }

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
  var standoutAxisWeights = { intelligence: 1, cost: 1, speed: 1 };
  var WEIGHT_AXES = [
    { key: "intelligence", label: "智能" },
    { key: "cost", label: "成本" },
    { key: "speed", label: "速度" }
  ];
  var elStandoutPanel, elStandoutMetricSelect, elStandoutRankingList,
      elWeightResetButton, elWeightAvailabilityNote, elWeightBlock;
  var weightSliderControls = {};

  function frontierModels() {
    return models.filter(function (m) { return m.panel && m.panel.layer === 1; });
  }

  function originAnchoredUnionArea(rects) {
    var sorted = rects.slice().sort(function (a, b) { return (b[0] - a[0]) || (b[1] - a[1]); });
    var area = 0;
    var maxY = 0;
    for (var i = 0; i < sorted.length; i++) {
      var x = sorted[i][0];
      var y = sorted[i][1];
      if (y > maxY) {
        area += x * (y - maxY);
        maxY = y;
      }
    }
    return area;
  }

  function hypervolume3d(points) {
    if (!points.length) return 0;
    var sorted = points.slice().sort(function (a, b) { return b[2] - a[2]; });
    var vol = 0;
    var prevZ = null;
    var rects = [];
    for (var i = 0; i < sorted.length; i++) {
      var z = sorted[i][2];
      if (prevZ !== null) vol += originAnchoredUnionArea(rects) * (prevZ - z);
      rects.push([sorted[i][0], sorted[i][1]]);
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
    var sizes = vals.map(function (v) {
      if (!isFinite(v)) return 8;
      return (hi > lo) ? (9 + 19 * (v - lo) / (hi - lo)) : 15;
    });
    restyleTraceData(DATA.pareto_emphasis_trace_index, { "marker.size": [sizes] });
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
      line.className = "aa-ranking-row";
      var left = document.createElement("span");
      left.className = "aa-truncate";
      left.textContent = (rank + 1) + ". " + row.name;
      var right = document.createElement("b");
      right.className = "aa-ranking-value";
      right.textContent = isFinite(row.value) ? Number(row.value).toFixed(spec.digits) : "-";
      line.appendChild(left);
      line.appendChild(right);
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
    // Demo A: 权重块（说明 + 3 轴滑块 + 重置）只在「加权超体积」口径下显示，其他口径整块隐藏并禁用。
    var enabled = STANDOUT_METRIC_REGISTRY[activeStandoutMetricKey].weighted;
    if (elWeightBlock) {
      elWeightBlock.style.display = enabled ? "block" : "none";
      // 隐藏时一并禁用块内控件：既让不可见控件无法 tab 聚焦，也保持“仅加权超体积口径可调”的语义。
      var controls = elWeightBlock.querySelectorAll("input, button");
      for (var i = 0; i < controls.length; i++) controls[i].disabled = !enabled;
    }
  }

  function buildStandoutMetricSelectDom() {
    // Demo A: 突出度口径 select 放顶部工具栏；权重块与排行留右栏。
    var group = createToolbarGroup("突出度口径");
    elStandoutMetricSelect = document.createElement("select");
    elStandoutMetricSelect.id = "aa-standout-metric-select";
    [["C", "趋势残差"], ["B", "智能抬升"], ["A", "加权超体积"], ["D", "到前沿垂距"]].forEach(function (item) {
      var option = document.createElement("option");
      option.value = item[0];
      option.textContent = item[1];
      elStandoutMetricSelect.appendChild(option);
    });
    elStandoutMetricSelect.value = activeStandoutMetricKey;
    elStandoutMetricSelect.addEventListener("change", function () {
      selectStandoutMetric(elStandoutMetricSelect.value);
    });
    group.appendChild(elStandoutMetricSelect);
    return group;
  }

  function buildStandoutControlsDom() {
    // Demo A: 口径 select 已挪到顶部工具栏（buildStandoutMetricSelectDom）；
    // 这里只保留权重块（可整块显隐）与 Top12 排行。
    elStandoutPanel = createSection("aa-standout-panel", "突出度");

    elWeightBlock = document.createElement("div");
    elWeightBlock.className = "aa-weight-block";

    elWeightAvailabilityNote = document.createElement("p");
    elWeightAvailabilityNote.className = "aa-weight-note";
    elWeightAvailabilityNote.textContent = "轴权重 w=2^s，仅加权超体积口径下可调。";
    elWeightBlock.appendChild(elWeightAvailabilityNote);

    WEIGHT_AXES.forEach(function (axis) {
      var row = document.createElement("div");
      row.className = "aa-weight-row";
      var label = document.createElement("span");
      label.textContent = axis.label;
      var slider = document.createElement("input");
      slider.type = "range";
      slider.min = "-2";
      slider.max = "2";
      slider.step = "0.05";
      slider.value = "0";
      slider.id = "aa-weight-slider-" + axis.key;
      var numberInput = document.createElement("input");
      numberInput.type = "number";
      numberInput.min = "0.25";
      numberInput.max = "4";
      numberInput.step = "0.05";
      numberInput.value = "1.00";
      numberInput.id = "aa-weight-number-" + axis.key;
      numberInput.className = "aa-weight-number";
      slider.addEventListener("input", function () { onWeightSliderInput(axis.key); });
      numberInput.addEventListener("input", function () { onWeightNumberInput(axis.key); });
      row.appendChild(label);
      row.appendChild(slider);
      row.appendChild(numberInput);
      elWeightBlock.appendChild(row);
      weightSliderControls[axis.key] = { slider: slider, numberInput: numberInput };
    });

    elWeightResetButton = document.createElement("button");
    elWeightResetButton.type = "button";
    elWeightResetButton.id = "aa-weight-reset";
    elWeightResetButton.className = "aa-secondary-button";
    elWeightResetButton.textContent = "重置权重";
    elWeightResetButton.addEventListener("click", function () { setStandoutAxisWeights(1, 1, 1); });
    elWeightBlock.appendChild(elWeightResetButton);
    elStandoutPanel.appendChild(elWeightBlock);

    var rankTitle = document.createElement("h3");
    rankTitle.className = "aa-section-title";
    rankTitle.textContent = "前沿排行 Top 12";
    rankTitle.style.marginTop = "12px";
    elStandoutPanel.appendChild(rankTitle);
    elStandoutRankingList = document.createElement("div");
    elStandoutRankingList.id = "aa-standout-ranking";
    elStandoutRankingList.className = "aa-ranking-list";
    elStandoutPanel.appendChild(elStandoutRankingList);
    updateWeightControlsAvailability();
    return elStandoutPanel;
  }

  function buildPinnedPanelDom() {
    elPinnedPanel = createSection("aa-pinned-panel", "已固定");
    elPinnedPanel.style.display = "none";
    return elPinnedPanel;
  }

  function buildDom() {
    shell = document.getElementById("frontier-3d-report-shell");
    sidePanel = document.getElementById("frontier-3d-side-panel");
    if (!sidePanel) {
      sidePanel = document.createElement("aside");
      sidePanel.id = "frontier-3d-side-panel";
      sidePanel.className = "frontier-3d-side-panel";
      document.body.appendChild(sidePanel);
    }

    sidePanel.innerHTML = "";
    var header = document.createElement("div");
    header.className = "aa-side-panel-header";
    var title = document.createElement("div");
    title.className = "aa-side-panel-title";
    title.textContent = "Frontier 3D";
    elSidePanelToggleButton = document.createElement("button");
    elSidePanelToggleButton.type = "button";
    elSidePanelToggleButton.id = "aa-side-panel-toggle";
    elSidePanelToggleButton.className = "aa-icon-button";
    elSidePanelToggleButton.addEventListener("click", function () {
      setSidePanelExpanded(!sidePanelExpanded);
    });
    header.appendChild(title);
    header.appendChild(elSidePanelToggleButton);
    sidePanel.appendChild(header);

    // Demo A: 顶部横向工具栏承载坐标轴口径 / 前沿外观 / 突出度口径。
    var toolbar = document.getElementById("frontier-3d-toolbar");
    if (!toolbar) {
      toolbar = document.createElement("div");
      toolbar.id = "frontier-3d-toolbar";
      toolbar.className = "frontier-3d-toolbar";
      if (shell) shell.insertBefore(toolbar, shell.firstChild);
    }
    toolbar.innerHTML = "";
    toolbar.appendChild(buildMetricControlsDom());
    toolbar.appendChild(buildFrontierControlsDom());
    toolbar.appendChild(buildStandoutMetricSelectDom());

    // Demo A: 右侧精简栏——搜索/pin → 已固定 → 突出度(权重块 + 排行)
    //         → 固定卡片字段(可折叠，默认收起) → 当前视图(details，默认展开)。
    var body = document.createElement("div");
    body.className = "aa-side-panel-body";
    body.appendChild(buildSearchDom());
    body.appendChild(buildPinnedPanelDom());
    body.appendChild(buildStandoutControlsDom());
    body.appendChild(buildPinnedCardFieldsDom());
    elCurrentViewPanel = document.createElement("details");
    elCurrentViewPanel.id = "aa-current-view-panel";
    elCurrentViewPanel.className = "aa-control-section aa-current-view-details";
    elCurrentViewPanel.open = true;
    body.appendChild(elCurrentViewPanel);
    sidePanel.appendChild(body);
    setSidePanelExpanded(true);
    renderCurrentView();
  }

  function renderResults() {
    if (!elResults || !elInput) return;
    var query = elInput.value;
    var hits = matchBases(query);
    elResults.innerHTML = "";
    if (!query.trim() || !hits.length) {
      elResults.style.display = "none";
      return;
    }
    hits.forEach(function (base) {
      var n = (baseGroups[base] || []).length;
      var row = document.createElement("div");
      var pinned = !!pinnedBases[base];
      row.className = "aa-result-row" + (pinned ? " is-pinned" : "");
      row.dataset.baseModelName = base;
      var left = document.createElement("span");
      left.className = "aa-truncate";
      left.textContent = base;
      var actions = document.createElement("span");
      actions.className = "aa-search-result-actions";
      var count = document.createElement("span");
      count.className = "aa-muted";
      count.textContent = n + " 档";
      var pinButton = document.createElement("button");
      pinButton.type = "button";
      pinButton.className = "aa-search-result-pin-button";
      pinButton.textContent = pinned ? "取消" : "Pin";
      pinButton.setAttribute("aria-label", (pinned ? "取消固定 " : "固定 ") + base);
      pinButton.addEventListener("click", function (ev) {
        ev.stopPropagation();
        togglePin(base);
      });
      actions.appendChild(count);
      actions.appendChild(pinButton);
      row.appendChild(left);
      row.appendChild(actions);
      row.addEventListener("click", function () { togglePin(base); });
      elResults.appendChild(row);
    });
    elResults.style.display = "block";
  }

  function visiblePinnedCardFieldDefinitions() {
    return PINNED_CARD_FIELD_DEFINITIONS.filter(function (field) {
      return !!pinnedCardVisibleFieldKeys[field.key];
    });
  }

  function createPinnedVariantCard(model) {
    var card = document.createElement("article");
    card.className = "aa-pinned-variant-card";

    var title = document.createElement("div");
    title.className = "aa-pinned-variant-title";
    title.textContent = model.name;
    card.appendChild(title);

    var fields = visiblePinnedCardFieldDefinitions();
    if (fields.length) {
      var grid = document.createElement("dl");
      grid.className = "aa-pinned-variant-field-grid";
      fields.forEach(function (field) {
        var item = document.createElement("div");
        item.className = "aa-pinned-variant-field";
        var label = document.createElement("dt");
        label.textContent = field.label;
        var value = document.createElement("dd");
        value.textContent = field.value(model);
        item.appendChild(label);
        item.appendChild(value);
        grid.appendChild(item);
      });
      card.appendChild(grid);
    }

    return card;
  }

  function renderSidePanel() {
    if (!elPinnedPanel) return;
    var bases = Object.keys(pinnedBases).sort();
    elPinnedPanel.innerHTML = "";
    var title = document.createElement("h2");
    title.className = "aa-section-title";
    title.textContent = "已固定";
    elPinnedPanel.appendChild(title);
    if (!bases.length) {
      elPinnedPanel.style.display = "none";
      return;
    }

    var header = document.createElement("div");
    header.className = "aa-pinned-header";
    var count = document.createElement("span");
    count.textContent = bases.length + " 个基模型";
    var clear = document.createElement("button");
    clear.type = "button";
    clear.className = "aa-link-button";
    clear.textContent = "全部清除";
    clear.addEventListener("click", function () {
      pinnedBases = {};
      rerenderPinned();
      renderResults();
    });
    header.appendChild(count);
    header.appendChild(clear);
    elPinnedPanel.appendChild(header);

    var list = document.createElement("div");
    list.className = "aa-pinned-list";
    bases.forEach(function (base) {
      var card = document.createElement("div");
      card.className = "aa-pinned-card";
      var cardHeader = document.createElement("div");
      cardHeader.className = "aa-pinned-card-header";
      var name = document.createElement("b");
      name.className = "aa-truncate";
      name.textContent = base;
      var remove = document.createElement("button");
      remove.type = "button";
      remove.className = "aa-link-button";
      remove.textContent = "移除";
      remove.addEventListener("click", function () {
        delete pinnedBases[base];
        rerenderPinned();
        renderResults();
      });
      cardHeader.appendChild(name);
      cardHeader.appendChild(remove);
      card.appendChild(cardHeader);
      var variantCards = document.createElement("div");
      variantCards.className = "aa-pinned-variant-card-list";
      (baseGroups[base] || []).forEach(function (i) {
        variantCards.appendChild(createPinnedVariantCard(models[i]));
      });
      card.appendChild(variantCards);
      var lineageKey = baseLineageKey(base);
      if (lineageKey && lineages[lineageKey] && lineages[lineageKey].length >= 2) {
        var lineageNote = document.createElement("div");
        lineageNote.className = "aa-lineage-note";
        lineageNote.textContent = "谱系 " + lineageKey.replace("||", " · ") + ": " + lineages[lineageKey].length + " 代";
        card.appendChild(lineageNote);
      }
      list.appendChild(card);
    });
    elPinnedPanel.appendChild(list);
    elPinnedPanel.style.display = "block";
  }

  function redrawLineage() {
    var keys = {};
    Object.keys(pinnedBases).forEach(function (base) {
      var key = baseLineageKey(base);
      if (key) keys[key] = true;
    });
    if (hoverLineageKey) keys[hoverLineageKey] = true;

    var lineXs = [], lineYs = [], lineZs = [];
    var nodeXs = [], nodeYs = [], nodeZs = [], nodeCustomdata = [];
    Object.keys(keys).forEach(function (key) {
      var nodes = lineages[key];
      if (!nodes || nodes.length < 2) return;
      nodes.forEach(function (node) {
        lineXs.push(node.x);
        lineYs.push(node.y);
        lineZs.push(node.z);
        nodeXs.push(node.x);
        nodeYs.push(node.y);
        nodeZs.push(node.z);
        nodeCustomdata.push([
          node.name,
          node.base_model_name,
          key.replace("||", " · "),
          node.release_date,
          node.intelligence,
          node.x,
          node.y,
          node.kept ? "yes" : "no"
        ]);
      });
      lineXs.push(null);
      lineYs.push(null);
      lineZs.push(null);
    });
    restyleTraceData(LL, { x: [lineXs], y: [lineYs], z: [lineZs] });
    restyleTraceData(LN, {
      x: [nodeXs], y: [nodeYs], z: [nodeZs], customdata: [nodeCustomdata]
    });
  }

  function reasoningIndicesForBase(base) {
    return reasoningVariantGroups[base] || baseGroups[base] || [];
  }

  function redrawReasoningVariants() {
    var bases = {};
    Object.keys(pinnedBases).forEach(function (base) { bases[base] = true; });
    if (hoverReasoningBase) bases[hoverReasoningBase] = true;

    var xs = [], ys = [], zs = [];
    Object.keys(bases).sort().forEach(function (base) {
      var indices = reasoningIndicesForBase(base);
      if (!indices || indices.length < 2) return;
      indices.forEach(function (i) {
        var m = models[i];
        xs.push(m.x);
        ys.push(m.y);
        zs.push(m.z);
      });
      xs.push(null);
      ys.push(null);
      zs.push(null);
    });
    restyleTraceData(RV, { x: [xs], y: [ys], z: [zs] });
  }

  var pendingConnectionFrame = null;
  function scheduleConnectionRedraw() {
    if (pendingConnectionFrame !== null) return;
    var raf = window.requestAnimationFrame || function (cb) { return setTimeout(cb, 16); };
    pendingConnectionFrame = raf(function () {
      pendingConnectionFrame = null;
      redrawLineage();
      redrawReasoningVariants();
    });
  }

  function rerenderPinned() {
    var idxs = pinnedVariantIndices();
    var xs = [], ys = [], zs = [], customdata = [];
    idxs.forEach(function (i) {
      var m = models[i];
      xs.push(m.x);
      ys.push(m.y);
      zs.push(m.z);
      customdata.push([m.name]);
    });
    var pinnedTraceUpdate = restyleTraceData(HL, {
      x: [xs], y: [ys], z: [zs], customdata: [customdata]
    }).then(function () {
      releasePlotlyDragCoverSoon();
    });
    renderSidePanel();
    redrawLineage();
    redrawReasoningVariants();
    return pinnedTraceUpdate;
  }

  function togglePin(base) {
    if (pinnedBases[base]) delete pinnedBases[base];
    else pinnedBases[base] = true;
    var pinnedUpdate = rerenderPinned();
    renderResults();
    return pinnedUpdate;
  }

  function modelFromPlotlyPoint(point) {
    if (!point || !point.customdata) return null;
    var modelIndex = nameToIndex[point.customdata[0]];
    if (modelIndex !== undefined) return models[modelIndex];
    if (point.customdata.length >= 3) {
      return {
        name: point.customdata[0],
        base_model_name: point.customdata[1],
        lineage_key: String(point.customdata[2]).replace(" · ", "||"),
      };
    }
    return null;
  }

  function onHover(ev) {
    cancelPendingHoverStateClear();
    var model = modelFromPlotlyPoint(ev.points && ev.points[0]);
    if (!model) return;
    var changed = false;
    if (model.lineage_key !== hoverLineageKey) {
      hoverLineageKey = model.lineage_key;
      changed = true;
    }
    if (model.base_model_name !== hoverReasoningBase) {
      hoverReasoningBase = model.base_model_name;
      changed = true;
    }
    if (changed) scheduleConnectionRedraw();
  }

  function cancelPendingHoverStateClear() {
    if (pendingHoverStateClearTimer === null) return;
    clearTimeout(pendingHoverStateClearTimer);
    pendingHoverStateClearTimer = null;
  }

  function clearHoverStateImmediately() {
    cancelPendingHoverStateClear();
    if (hoverLineageKey === null && hoverReasoningBase === null) return false;
    hoverLineageKey = null;
    hoverReasoningBase = null;
    scheduleConnectionRedraw();
    return true;
  }

  function onUnhover() {
    if (hoverLineageKey === null && hoverReasoningBase === null) return;
    if (pendingHoverStateClearTimer !== null) return;
    pendingHoverStateClearTimer = setTimeout(function () {
      pendingHoverStateClearTimer = null;
      if (hoverLineageKey === null && hoverReasoningBase === null) return;
      hoverLineageKey = null;
      hoverReasoningBase = null;
      scheduleConnectionRedraw();
    }, hoverStateClearDelayMilliseconds);
  }

  function onClick(ev) {
    var model = modelFromPlotlyPoint(ev.points && ev.points[0]);
    if (!model) return;
    if (!baseGroups[model.base_model_name]) return;
    var baseModelName = model.base_model_name;
    releasePlotlyDragCoverSoon();
    clearHoverStateImmediately();
    window.setTimeout(function () {
      releasePlotlyDragCoverSoon();
      var pinnedUpdate = togglePin(baseModelName);
      Promise.resolve(pinnedUpdate).then(releasePlotlyDragCoverSoon);
    }, 0);
  }

  function activateSelectedMetricCombination() {
    return activateMetricCombination(elCostMetricSelect.value, elSpeedMetricSelect.value);
  }

  function activateMetricCombination(costMetricName, speedMetricName) {
    var key = costMetricName + "__" + speedMetricName;
    var variant = METRIC_VARIANTS[key];
    if (!variant || key === ACTIVE_METRIC_KEY) return Promise.resolve(false);
    pinnedBases = {};
    hoverLineageKey = null;
    hoverReasoningBase = null;
    ACTIVE_METRIC_KEY = key;
    // 用户选择「切换坐标轴组合时保留当前视角」：react 前先把当前相机提交进 uirevision 基线，
    // 这样 react（uirevision 不变）会沿用用户当前（可能刚拖拽过的）视角，而非回到写死的默认相机。
    return commitSceneCameraToUiRevision().then(function () {
      return Plotly.react(gd, variant.data, variant.layout);
    }).then(function () {
      loadMetricPayload(variant.payload);
      if (elCostMetricSelect) elCostMetricSelect.value = costMetricName;
      if (elSpeedMetricSelect) elSpeedMetricSelect.value = speedMetricName;
      renderCurrentView();
      renderResults();
      renderSidePanel();
      applyFrontierTraceVisibility();
      applyStandoutVisualEncoding();
      return true;
    });
  }

  function ready(cb) {
    gd = document.getElementById(GD_ID);
    if (!gd || typeof Plotly === "undefined") {
      setTimeout(function () { ready(cb); }, 50);
      return;
    }
    buildDom();
    var initialVariant = METRIC_VARIANTS[ACTIVE_METRIC_KEY];
    Plotly.newPlot(gd, initialVariant.data, initialVariant.layout, { responsive: true }).then(function () {
      cb();
    });
  }

  ready(function () {
    gd.on("plotly_hover", onHover);
    gd.on("plotly_unhover", onUnhover);
    gd.on("plotly_click", onClick);
    installSceneCameraDragCommit();  // 拖拽后把视角提交进 uirevision 基线，防非默认组合 hover 拉回默认视角
    applyFrontierTraceVisibility();
    applyStandoutVisualEncoding();
    // Demo A: 顶部工具栏占用高度后，让 3D 图重新适配主区。
    if (Plotly && Plotly.Plots) Plotly.Plots.resize(gd);

    window.aaPinBase = function (base) { pinnedBases[base] = true; rerenderPinned(); renderResults(); };
    window.aaUnpinBase = function (base) { delete pinnedBases[base]; rerenderPinned(); renderResults(); };
    window.aaTogglePin = togglePin;
    window.aaShowLineageForName = function (name) {
      var modelIndex = nameToIndex[name];
      if (modelIndex === undefined) return false;
      hoverLineageKey = models[modelIndex].lineage_key;
      hoverReasoningBase = models[modelIndex].base_model_name;
      redrawLineage();
      redrawReasoningVariants();
      return true;
    };
    window.aaClearHover = function () {
      clearHoverStateImmediately();
    };
    window.aaOnHover = onHover;
    window.aaOnUnhover = onUnhover;
    window.aaOnClick = onClick;
    window.aaMatchBases = matchBases;
    window.aaSetMetricCombination = activateMetricCombination;
    window.aaSetFrontierStyle = setFrontierStyle;
    window.aaSetAchievableSurfaceVisible = setAchievableSurfaceVisible;
    window.aaSetSidePanelExpanded = setSidePanelExpanded;
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
      return {
        activeMetricKey: ACTIVE_METRIC_KEY,
        costAxisField: DATA.cost_axis_field,
        speedAxisField: DATA.speed_axis_field,
        pinned: Object.keys(pinnedBases),
        hoverKey: hoverLineageKey,
        hoverReasoningBase: hoverReasoningBase,
        annCount: (gd._fullLayout && gd._fullLayout.scene && gd._fullLayout.scene.annotations || []).length,
        highlightLen: traceArrayLength(HL, "x"),
        lineageLen: traceArrayLength(LL, "x"),
        lineageNodeLen: traceArrayLength(LN, "x"),
        reasoningVariantLineLen: traceArrayLength(RV, "x"),
        lineageKeys: Object.keys(lineages).length,
        standoutMetric: activeStandoutMetricKey,
        standoutWeights: {
          intelligence: standoutAxisWeights.intelligence,
          cost: standoutAxisWeights.cost,
          speed: standoutAxisWeights.speed
        },
        pinnedCardVisibleFields: Object.keys(pinnedCardVisibleFieldKeys).filter(function (key) {
          return pinnedCardVisibleFieldKeys[key];
        }),
        paretoMarkerSizeLen: traceMarkerSizeArrayLength(DATA.pareto_emphasis_trace_index),
        frontierCount: frontierModels().length,
        frontierStyle: frontierStyle,
        achievableSurfaceVisible: achievableSurfaceVisible,
        sidePanelExpanded: sidePanelExpanded
      };
    };
  });
})();
