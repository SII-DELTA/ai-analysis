import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { axisTickValues } from "./frontier_3d_threejs_axis_tick_value_generator.js";
import { matchingModelGroups } from "./frontier_3d_threejs_base_model_search_matcher.js";
import { compareModelReasoningLevels, percentageDifferenceFromBaseline, committedStandoutAxisWeight, formatSignificantNumber, layoutPinnedModelNameAnnotations } from "./frontier_3d_threejs_model_comparison_view_calculations.js";
import { solveFrontierAxisAnnotationLayout } from "./frontier_3d_threejs_axis_annotation_layout_solver.js";
import { expandFrontierModelReferencesForSceneConsumers } from "./frontier_3d_model_reference_expander.js";
import * as THREE from "three";
import { mountFrontierModelExplorationControls, downloadFrontierBrowserArtifact } from "./frontier_3d_model_exploration_controls.js";
import { modelVisibilityForExplorationFilters, intelligenceMeasurementStatusText, frontierSensitivityStatusText, decodeFrontierViewStateHash } from "./frontier_3d_view_state_and_model_table.js";
import { installFrontierCameraViewControls } from "./frontier_3d_camera_view_controls.js";
import { renderFrontierBrowserPng } from "./frontier_3d_browser_png_export.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME,
  FRONTIER_STANDOUT_METRIC_NAMES,
  calculateFrontierStandoutMetricValues,
  calculateWeightedExclusiveHypervolumeSummary,
} from "./frontier_3d_threejs_standout_metric_calculator.js";

(function initializeFrontierThreeDimensionalInteractiveReport() {
  "use strict";

  const runtimeIssuesByKind = new Map();
  const runtimeDiagnosticBanner = document.createElement("div");
  runtimeDiagnosticBanner.id = "frontier-3d-runtime-diagnostic-banner";
  runtimeDiagnosticBanner.setAttribute("role", "alert");
  runtimeDiagnosticBanner.hidden = true;
  document.body.append(runtimeDiagnosticBanner);
  function setRuntimeIssue(kind, message) {
    if (message) runtimeIssuesByKind.set(kind, message);
    else runtimeIssuesByKind.delete(kind);
    runtimeDiagnosticBanner.textContent = [...runtimeIssuesByKind.values()].join("；");
    runtimeDiagnosticBanner.hidden = runtimeIssuesByKind.size === 0;
  }
  window.frontier3dRuntimeDiagnosticStatus = () => Object.fromEntries(runtimeIssuesByKind);
  window.addEventListener("error", (event) => setRuntimeIssue("window_error", `页面错误：${String(event.message || "未知错误").slice(0, 300)}`));
  window.addEventListener("unhandledrejection", (event) => setRuntimeIssue("unhandled_rejection", `页面操作失败：${String(event.reason?.message || event.reason || "未知错误").slice(0, 300)}`));

  const VISUALIZATION_DATASET_ELEMENT_ID = "frontier-3d-visualization-dataset-json";
  const visualizationDatasetElement = document.getElementById(
    VISUALIZATION_DATASET_ELEMENT_ID,
  );
  if (!visualizationDatasetElement) {
    throw new Error("Missing Frontier 3D visualization dataset");
  }

  const visualizationDataset = expandFrontierModelReferencesForSceneConsumers(JSON.parse(visualizationDatasetElement.textContent));
  const metricVariantsByKey = visualizationDataset.metric_variants || {};
  const organizationIdentityMetadataByCreatorName =
    visualizationDataset.organization_identity_metadata_by_creator_name || {};
  let activeMetricVariantKey = visualizationDataset.initial_variant_key;
  if (!metricVariantsByKey[activeMetricVariantKey]) {
    throw new Error(`Missing initial metric variant: ${activeMetricVariantKey}`);
  }

  const graphContainer = document.getElementById(
    visualizationDataset.graph_div_id || "frontier3d",
  );
  const plotRegion = document.getElementById("frontier-3d-plot-region");
  const reportShell = document.getElementById("frontier-3d-report-shell");
  const toolbar = document.getElementById("frontier-3d-toolbar");
  const sidePanel = document.getElementById("frontier-3d-side-panel");
  if (!graphContainer || !plotRegion || !reportShell || !toolbar || !sidePanel) {
    throw new Error("Frontier 3D report document is incomplete");
  }

  const reportHeader = document.getElementById("frontier-3d-report-header");
  let explorationControls = null;
  let cameraViewControls = null;
  const explorationFilters = { measured_only: false, cutoff_date: null, date_mode: "fade", sensitivity_intelligence_half_width: "off" };
  function notifyExplorationViewChanged() { explorationControls?.sharedViewChanged(); }

  // 契约顶层数据来源（W1-8 起提供）；旧契约缺该字段时页头降级为「抓取时间未知」等文案，不报错。
  const artificialAnalysisDataProvenance =
    visualizationDataset.artificial_analysis_data_provenance || {};
  const recentReleaseFrontierDistanceGracePeriodMonths = Number.isInteger(
    artificialAnalysisDataProvenance.recent_release_frontier_distance_grace_period_months,
  ) ? artificialAnalysisDataProvenance.recent_release_frontier_distance_grace_period_months : null;
  // 署名链接固定指向 AA 首页，不取契约中的 URL，避免契约字符串变成可点击的任意链接。
  const ARTIFICIAL_ANALYSIS_ATTRIBUTION_URL = "https://artificialanalysis.ai/";
  const HISTORICAL_INTELLIGENCE_INDEX_VERSION_FALLBACK_REASON_TEXT =
    "历史口径（非当期智能指数版本的成本/冗长度），不参与本口径前沿计算";

  function renderedDocumentMetaContent(metaName) {
    const metaElement = document.querySelector(`meta[name="${metaName}"]`);
    return metaElement ? metaElement.getAttribute("content") || "" : "";
  }

  // 渲染器写入的产物指纹（W0-5），用于在「当前视图」中核对 HTML 由哪个 bundle/提交生成。
  const frontierReportArtifactFingerprint = {
    rendererBundleSha256:
      renderedDocumentMetaContent("frontier-3d-renderer-bundle-sha256") || "unknown",
    generatorGitCommit:
      renderedDocumentMetaContent("frontier-3d-generator-git-commit") || "unknown",
    renderedAtUtc:
      renderedDocumentMetaContent("frontier-3d-rendered-at-utc") || "unknown",
  };

  window.FRONTIER_3D_VISUALIZATION_DATASET = visualizationDataset;

  const threeScene = new THREE.Scene();
  threeScene.background = new THREE.Color(0xffffff);
  const perspectiveCamera = new THREE.PerspectiveCamera(42, 1, 0.01, 100);
  perspectiveCamera.up.set(0, 0, 1);
  let webglRenderer;
  try {
    webglRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: false });
  } catch {
    setRuntimeIssue("webgl_unavailable", "无法启动三维图：当前环境不支持 WebGL，或图形资源不足。请启用浏览器图形加速后重新加载。");
    explorationControls = mountFrontierModelExplorationControls({dataset:visualizationDataset,reportShell,toolbar,plotRegion,graphContainer,sidePanel,webglAvailable:false});
    window.serializeFrontierViewState = explorationControls.getState;
    window.setFrontierExplorationFilters = explorationControls.setExplorationFilters;
    return;
  }
  let webglContextUnavailable = false;
  webglRenderer.domElement.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    webglContextUnavailable = true;
    renderFrameRequested = false;
    clearHoverInteractionImmediately();
    setRuntimeIssue("webgl_context", "三维图的图形上下文已丢失，正在等待浏览器恢复。");
  });
  webglRenderer.domElement.addEventListener("webglcontextrestored", () => {
    webglContextUnavailable = false;
    renderFrameRequested = false;
    resizeThreeDimensionalRenderer();
    setRuntimeIssue("webgl_context", null);
    requestThreeDimensionalSceneRender();
  });
  webglRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  webglRenderer.outputColorSpace = THREE.SRGBColorSpace;
  webglRenderer.domElement.setAttribute("data-frontier-threejs-canvas", "true");
  webglRenderer.domElement.setAttribute(
    "aria-label",
    "可旋转的 AI 模型三维帕累托前沿",
  );
  graphContainer.replaceChildren(webglRenderer.domElement);

  const orbitControls = new OrbitControls(
    perspectiveCamera,
    webglRenderer.domElement,
  );
  orbitControls.enableDamping = false;
  orbitControls.screenSpacePanning = true;
  orbitControls.zoomToCursor = true;
  orbitControls.minDistance = 2.4;
  orbitControls.maxDistance = 14;

  const raycaster = new THREE.Raycaster();
  const normalizedPointerCoordinates = new THREE.Vector2();

  const staticAxesAndGridGroup = new THREE.Group();
  const frontierGeometryGroup = new THREE.Group();
  const modelMarkerGroup = new THREE.Group();
  const transientRelationshipGroup = new THREE.Group();
  threeScene.add(
    staticAxesAndGridGroup,
    frontierGeometryGroup,
    modelMarkerGroup,
    transientRelationshipGroup,
  );

  let activeMetricVariant;
  let activeThreeDimensionalScene;
  let activeInteractionRelationships;
  let displayedModelMarkers = [];
  let baseGroupsByBaseModelName = {};
  let reasoningVariantGroupsByBaseModelName = {};
  let lineagesByOrganizationAndTier = {};
  let modelIndexByModelName = {};
  let modelVisualObjectsByModelIndex = [];
  let clickableOrganizationLogoSprites = [];
  let pointerInteractiveModelMarkerSprites = [];
  let clickablePrunedLineageAncestorSprites = [];
  const organizationLogoMaterialsByCreatorName = {};
  const organizationLogoTextureLoadStateByCreatorName = {};
  let frontierWireframeObject = null;
  let frontierSurfaceObject = null;
  let achievableFrontierSurfaceObject = null;
  let exactAchievableFrontierBoundaryObject = null;
  let transientLineageLineObject = null;
  let transientReasoningVariantLineObject = null;
  let transientSameGenerationLineObject = null;

  let countryRegionMarkerVisible = false;
  // 「仅当期可比」：开启时隐藏历史口径点（W1-6 / D-1），隐藏的点也不可拾取；跨口径切换时保持。
  let showOnlyCurrentIntelligenceIndexVersionComparableModels = false;
  let showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod =
    recentReleaseFrontierDistanceGracePeriodMonths > 0;
  let recentReleaseGracePeriodModelVisibilityToggle;
  // 当前口径载入时统计的契约数值问题（W1-10 前端兜底）：非有限坐标/索引、越界索引与因此未建的几何。
  let nonFiniteContractCoordinateCount = 0;
  let outOfRangeContractTriangleVertexIndexCount = 0;
  let skippedInvalidContractGeometryNames = [];
  let frontierStyle = "wireframe";
  let achievableFrontierSurfaceVisible = false;
  let sidePanelExpanded = !window.matchMedia("(max-width: 640px)").matches;
  let hoveredModelIndex = null;
  let hoveredPrunedLineageAncestorName = null;
  // 保留实际命中节点的关系类型，避免重绘 sprite 后把同代档位改写为谱系前身。
  let hoveredPrunedLineageAncestorNode = null;
  let hoveredLineageKey = null;
  let hoveredReasoningBaseModelName = null;
  let pinnedBaseModelNames = new Set();
  const pinnedModelIdentities = new Set();
  const allModelRecordsByIdentity = new Map();
  function stableModelIdentity(model) {
    return model.model_uuid?.toLowerCase() || `legacy:${JSON.stringify([model.creator, model.name])}`;
  }
  (visualizationDataset.models || []).forEach(model => allModelRecordsByIdentity.set(stableModelIdentity(model),model));
  Object.values(metricVariantsByKey).forEach((variant) => {
    (variant.three_dimensional_scene?.displayed_model_markers || []).forEach((model) => {
      allModelRecordsByIdentity.set(stableModelIdentity(model), model);
    });
  });
  function modelIsPinned(model) {
    return pinnedModelIdentities.has(stableModelIdentity(model));
  }
  function synchronizePinnedBaseModelNameAliases() {
    pinnedBaseModelNames = new Set([...pinnedModelIdentities].map((identity) => allModelRecordsByIdentity.get(identity)?.base_model_name).filter(Boolean));
  }
  function knownIdentitiesForBaseModelName(baseModelName) {
    const identities = [];
    for (const [identity, model] of allModelRecordsByIdentity) {
      if (model.base_model_name === baseModelName) identities.push(identity);
    }
    return identities;
  }
  function allKnownBaseModelIdentitiesArePinned(baseModelName) {
    const identities = knownIdentitiesForBaseModelName(baseModelName);
    return identities.length > 0 && identities.every((identity) => pinnedModelIdentities.has(identity));
  }
  function setBaseModelPinned(baseModelName, shouldBePinned) {
    for (const [identity, model] of allModelRecordsByIdentity) {
      if (model.base_model_name !== baseModelName) continue;
      if (shouldBePinned) pinnedModelIdentities.add(identity);
      else pinnedModelIdentities.delete(identity);
    }
    synchronizePinnedBaseModelNameAliases();
    applyPinnedModelVisualEncoding();
    renderSearchResults();
    return Promise.resolve(true);
  }
  let hiddenOrganizationCreatorNames = new Set();
  let selectedFrontierStandoutMetricName =
    FRONTIER_STANDOUT_METRIC_NAMES.TREND_RESIDUAL;
  let standoutAxisWeights = { intelligence: 1, cost: 1, speed: 1 };
  let latestStandoutValuesByModelName = {};
  let completeFrontierHypervolume = null;
  let latestStandoutRanksByModelName = {};
  let renderFrameRequested = false;
  const MARKER_SIZE_STORAGE_KEY = "frontier3d.marker-size-multiplier";
  const MODEL_MARKER_CSS_PIXEL_SIZES_AT_ONE_MULTIPLIER = Object.freeze({
    logo: 22, backplate: 29, countryRegion: 38, paretoRing: 38, pinnedRing: 49,
    standoutHalo: 52, standoutHaloMinimum: 44, standoutHaloMaximum: 64,
    missingStandoutHalo: 48, prunedLineageAncestor: 18,
  });
  const COMPARISON_FIELDS_STORAGE_KEY = "frontier3d.pinned-comparison-fields";
  function readStoredPreference(key, fallback) {
    try { return JSON.parse(window.localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  }
  function writeStoredPreference(key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* 存储受限时继续使用本页状态。 */ }
  }
  const storedMarkerSizeMultiplier = readStoredPreference(MARKER_SIZE_STORAGE_KEY, 0.5);
  let markerSizeMultiplier = Number.isFinite(storedMarkerSizeMultiplier) ? Math.min(1.5, Math.max(0.5, storedMarkerSizeMultiplier)) : 0.5;
  const optionalComparisonFieldNames = ["output_speed", "eff_speed", "cost_to_run", "blended_price_cache_input_output_7_to_2_to_1", "output_mtokens"];
  const storedComparisonFieldNames = readStoredPreference(COMPARISON_FIELDS_STORAGE_KEY, []);
  const selectedOptionalComparisonFieldNames = new Set(Array.isArray(storedComparisonFieldNames) ? storedComparisonFieldNames.filter(name => optionalComparisonFieldNames.includes(name)) : []);
  let markerSizeSlider;
  let markerSizeOutput;
  let pinnedComparisonPanel;
  let comparisonTableContainer;
  let searchActiveResultIndex = -1;
  let touchDetailsModel = null;
  let latestPrimaryPointerType = null;
  let latestTooltipPointerCoordinates = null;
  const pinnedModelNameLabels = document.createElement("div");
  pinnedModelNameLabels.id = "aa-pinned-model-name-labels";
  graphContainer.append(pinnedModelNameLabels);
  const lineageOverflowDirectionLabels = document.createElement("div");
  lineageOverflowDirectionLabels.id = "aa-lineage-overflow-direction-labels";
  graphContainer.append(lineageOverflowDirectionLabels);

  let costMetricSelect;
  let speedMetricSelect;
  let countryRegionMarkerToggle;
  let currentIntelligenceIndexVersionComparableOnlyToggle;
  let reportHeaderModelCountSummary;
  let howToReadDrawerToggleButton;
  let howToReadDrawer;
  let achievableFrontierSurfaceToggle;
  let frontierGeometryExplanation;
  let frontierGeometryExplanationDisclosureButton;
  let frontierGeometryExplanationAutoCollapseTimeoutId;
  let frontierStyleButtons = [];
  let organizationFilterPanel;
  let pinnedModelsPanel;
  let searchInput;
  let searchResults;
  let standoutMetricSelect;
  let standoutRankingList;
  let standoutWeightControls;
  let currentViewPanel;
  let sidePanelToggleButton;

  const tooltip = document.createElement("div");
  tooltip.id = "aa-threejs-model-tooltip";
  tooltip.className = "aa-threejs-model-tooltip";
  tooltip.hidden = true;
  const modelTooltipBody = document.createElement("div");
  tooltip.append(modelTooltipBody);
  const touchDetailsActions = textElement("div", "aa-touch-details-actions");
  const touchDetailsPinButton = textElement("button", "aa-secondary-button");
  touchDetailsPinButton.type = "button";
  touchDetailsPinButton.addEventListener("click", () => {
    if (touchDetailsModel && hoveredModelIndex !== null) togglePinnedBaseModelName(touchDetailsModel.base_model_name);
  });
  const touchDetailsCloseButton = textElement("button", "aa-secondary-button", "关闭详情");
  touchDetailsCloseButton.type = "button";
  touchDetailsCloseButton.addEventListener("click", clearHoverInteractionImmediately);
  touchDetailsActions.append(touchDetailsCloseButton);
  plotRegion.appendChild(tooltip);

  const axisAnnotations = [];
  let measuredAxisAnnotationSizes = new WeakMap();
  let axisAnnotationSizeMeasurementCount = 0;
  let axisAnnotationMeasurementViewport = "";
  document.fonts?.ready.then(() => {
    measuredAxisAnnotationSizes = new WeakMap();
    requestThreeDimensionalSceneRender();
  });

  function createAxisAnnotationElement(axisName, labelText, isTitle) {
    const element = document.createElement("div");
    element.className = isTitle ? "aa-threejs-axis-label" : "aa-threejs-axis-tick-label";
    element.dataset.axisName = axisName;
    element.textContent = labelText;
    if (isTitle) {
      const direction = axisName === "x" ? "越低越好" : "越高越好";
      element.dataset.directionHint = ` ${axisName === "x" ? "↓" : "↑"} ${direction}`;
      element.setAttribute("aria-label", `${labelText}，${direction}`);
    }
    graphContainer.appendChild(element);
    return element;
  }

  function updateProjectedAxisAnnotations() {
    // 标注沿实际 CSS 像素投影，避免分数高度被 clientHeight 取整后偏离轴端。
    const {width:canvasWidth,height:canvasHeight} = graphContainer.getBoundingClientRect();
    const measurementViewport = `${canvasWidth}:${canvasHeight}:${window.innerWidth}:${window.innerHeight}`;
    if (measurementViewport !== axisAnnotationMeasurementViewport) {
      measuredAxisAnnotationSizes = new WeakMap();
      axisAnnotationMeasurementViewport = measurementViewport;
    }
    const annotationsNeedingMeasurement = axisAnnotations.flatMap((axis) => axis.labels)
      .filter(({ element }) => !measuredAxisAnnotationSizes.has(element));
    // 先批量恢复可测量状态，再集中读取尺寸；旋转和缩放沿用缓存。
    for (const { element } of annotationsNeedingMeasurement) element.hidden = false;
    for (const { element } of annotationsNeedingMeasurement) {
      measuredAxisAnnotationSizes.set(element, { width: element.offsetWidth, height: element.offsetHeight });
      axisAnnotationSizeMeasurementCount += 1;
    }
    const project = (position) => {
      const projected = position.clone().project(perspectiveCamera);
      return { x: (projected.x + 1) * canvasWidth / 2, y: (1 - projected.y) * canvasHeight / 2, depth: projected.z };
    };
    const elementsById = new Map();
    const axes = axisAnnotations.map(({ start, end, labels }, axisIndex) => ({
      projectedStart: project(start), projectedEnd: project(end),
      labels: labels.map(({ element, position, isTitle }, labelIndex) => {
        const id = `${axisIndex}:${labelIndex}`;
        elementsById.set(id, element);
        const anchor = project(position);
        return { id, isTitle, anchor, projectedDepth: anchor.depth, ...measuredAxisAnnotationSizes.get(element) };
      }),
    }));
    for (const label of solveFrontierAxisAnnotationLayout({ canvasWidth, canvasHeight, projectedCenter: project(new THREE.Vector3()), axes })) {
      const element = elementsById.get(label.id);
      element.hidden = label.hidden;
      if (label.hidden) continue;
      element.style.transform = `translate(-50%, -50%) rotate(${label.rotationDegrees}deg)`;
      element.style.left = `${label.x}px`;
      element.style.top = `${label.y}px`;
    }
  }

  function requestThreeDimensionalSceneRender() {
    if (renderFrameRequested || webglContextUnavailable) return;
    renderFrameRequested = true;
    window.requestAnimationFrame(() => {
      renderFrameRequested = false;
      if (webglContextUnavailable) return;
      webglRenderer.render(threeScene, perspectiveCamera);
      updateProjectedAxisAnnotations();
      updatePinnedModelNameLabelPositions();
      updateLineageOverflowDirectionLabelPositions();
    });
  }

  orbitControls.addEventListener("change", requestThreeDimensionalSceneRender);

  function clearThreeObjectGroup(group) {
    while (group.children.length) {
      const child = group.children.pop();
      child.userData.foregroundMaterial?.dispose();
      child.userData.dateFadedMaterial?.dispose();
      // THREE.Sprite 共享模块级 geometry；销毁其中一个会迫使全部 Logo 在下一帧重建 GPU buffer。
      if (!child.isSprite && child.geometry && child.geometry.dispose) {
        child.geometry.dispose();
      }
      if (child.material && child.material.dispose && !child.userData.sharedMaterial) {
        child.material.dispose();
      }
    }
  }

  function scaledAxisValue(rawValue, axisConfiguration) {
    if (axisConfiguration.scale_type === "log") {
      return Math.log10(Math.max(Number(rawValue), Number.MIN_VALUE));
    }
    return Number(rawValue);
  }

  function normalizedAxisValue(rawValue, axisConfiguration) {
    const fixedRange = axisConfiguration.fixed_range;
    const minimumValue = Number(fixedRange[0]);
    const maximumValue = Number(fixedRange[1]);
    const scaledValue = scaledAxisValue(rawValue, axisConfiguration);
    if (!Number.isFinite(scaledValue) || maximumValue === minimumValue) return 0;
    return -1 + (2 * (scaledValue - minimumValue)) / (maximumValue - minimumValue);
  }

  function normalizedThreeDimensionalPosition(x, y, z) {
    const axes = activeThreeDimensionalScene.three_dimensional_axis_configuration;
    return new THREE.Vector3(
      normalizedAxisValue(x, axes.x_axis),
      normalizedAxisValue(y, axes.y_axis),
      normalizedAxisValue(z, axes.z_axis),
    );
  }

  function clampedLineagePosition(node) {
    return normalizedThreeDimensionalPosition(node.x, node.y, node.z).clampScalar(-1, 1);
  }

  function lineageOverflowDirectionText(node) {
    const position = normalizedThreeDimensionalPosition(node.x, node.y, node.z);
    return ["成本", "速度", "智能"].flatMap((name, index) => {
      const value = position.getComponent(index);
      return value < -1 ? [`${name}低于箱体范围 ↓`] : value > 1 ? [`${name}高于箱体范围 ↑`] : [];
    }).join("；");
  }

  function lineObjectFromPositionPairs(positionPairs, color, width = 1) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positionPairs.flatMap((position) => position.toArray()), 3),
    );
    const material = new THREE.LineBasicMaterial({ color, linewidth: width });
    return new THREE.LineSegments(geometry, material);
  }

  function relationshipLineObject(positionPairs, color, width, dashed = false) {
    const geometry = new LineSegmentsGeometry();
    geometry.setPositions(positionPairs.flatMap((position) => position.toArray()));
    const material = new LineMaterial({ color, linewidth: width, transparent: true, opacity: 0.9, depthTest: false, depthWrite: false, dashed });
    material.resolution.set(graphContainer.clientWidth, graphContainer.clientHeight);
    const line = new LineSegments2(geometry, material);
    line.renderOrder = 100;
    if (dashed) line.computeLineDistances();
    return line;
  }

  function buildAxesAndGrid() {
    clearThreeObjectGroup(staticAxesAndGridGroup);
    const corner = (x, y, z) => new THREE.Vector3(x, y, z);
    const boxEdges = [
      [corner(-1, -1, -1), corner(1, -1, -1)],
      [corner(-1, 1, -1), corner(1, 1, -1)],
      [corner(-1, -1, 1), corner(1, -1, 1)],
      [corner(-1, 1, 1), corner(1, 1, 1)],
      [corner(-1, -1, -1), corner(-1, 1, -1)],
      [corner(1, -1, -1), corner(1, 1, -1)],
      [corner(-1, -1, 1), corner(-1, 1, 1)],
      [corner(1, -1, 1), corner(1, 1, 1)],
      [corner(-1, -1, -1), corner(-1, -1, 1)],
      [corner(1, -1, -1), corner(1, -1, 1)],
      [corner(-1, 1, -1), corner(-1, 1, 1)],
      [corner(1, 1, -1), corner(1, 1, 1)],
    ];
    staticAxesAndGridGroup.add(
      lineObjectFromPositionPairs(boxEdges.flat(), 0x64748b),
    );

    axisAnnotations.forEach(({ labels }) => labels.forEach(({ element }) => element.remove()));
    axisAnnotations.length = 0;
    const axes = activeThreeDimensionalScene.three_dimensional_axis_configuration;
    const gridPositionPairs = [];
    const tickPositionPairs = [];
    // 三条有标注的轴是数据立方体的真实边，标题和数值随相机投影更新。
    [
      ["x", corner(-1, 1, -1), corner(1, 1, -1), corner(0, 0.04, 0)],
      ["y", corner(-1, -1, -1), corner(-1, 1, -1), corner(-0.04, 0, 0)],
      ["z", corner(-1, -1, -1), corner(-1, -1, 1), corner(-0.04, 0, 0)],
    ].forEach(([axisName, start, end, tickOffset]) => {
      const axisConfiguration = axes[`${axisName}_axis`];
      const labels = [{
        element: createAxisAnnotationElement(axisName, axisConfiguration.title_text, true),
        position: start.clone().lerp(end, 0.5),
        isTitle: true,
      }];
      tickPositionPairs.push(start, end);
      axisTickValues(axisConfiguration).forEach((value) => {
        const coordinate = normalizedAxisValue(value, axisConfiguration);
        const position = start.clone().lerp(end, (coordinate + 1) / 2);
        tickPositionPairs.push(position, position.clone().add(tickOffset));
        const element = createAxisAnnotationElement(
          axisName,
          Math.abs(value) >= 1e6 || (value !== 0 && Math.abs(value) < 0.001)
            ? value.toExponential()
            : String(value),
          false,
        );
        element.dataset.axisValue = String(value);
        labels.push({ element, position, isTitle: false });
        if (axisName === "x") {
          gridPositionPairs.push(corner(coordinate, -1, -1), corner(coordinate, 1, -1));
        } else if (axisName === "y") {
          gridPositionPairs.push(corner(-1, coordinate, -1), corner(1, coordinate, -1));
        } else {
          gridPositionPairs.push(
            corner(-1, -1, coordinate), corner(-1, 1, coordinate),
            corner(-1, 1, coordinate), corner(1, 1, coordinate),
          );
        }
      });
      axisAnnotations.push({ start, end, labels });
    });
    staticAxesAndGridGroup.add(lineObjectFromPositionPairs(tickPositionPairs, 0x334155));
    const gridObject = lineObjectFromPositionPairs(gridPositionPairs, 0xd8dee6);
    gridObject.material.transparent = true;
    gridObject.material.opacity = 0.72;
    staticAxesAndGridGroup.add(gridObject);
  }

  function isFiniteContractNumber(value) {
    return typeof value === "number" && Number.isFinite(value);
  }

  // 契约数组字段不是数组时（例如 Plotly 的 {"dtype","bdata"} 对象）按「1 个非有限值、0 个元素」计。
  function contractArrayFieldOrEmpty(contractObject, fieldName, invalidValueCounter) {
    const fieldValue = contractObject ? contractObject[fieldName] : undefined;
    if (Array.isArray(fieldValue)) return fieldValue;
    if (fieldValue !== undefined && fieldValue !== null) invalidValueCounter.nonFiniteValueCount += 1;
    return [];
  }

  function recordSkippedInvalidContractGeometry(geometryName, invalidValueCounter) {
    nonFiniteContractCoordinateCount += invalidValueCounter.nonFiniteValueCount;
    outOfRangeContractTriangleVertexIndexCount += invalidValueCounter.outOfRangeIndexCount;
    skippedInvalidContractGeometryNames.push(geometryName);
    console.warn(
      `Frontier 3D 契约几何 ${geometryName} 含非有限坐标/索引或结构不一致，已跳过绘制`,
      invalidValueCounter,
    );
  }

  function splitCoordinateSequenceIntoSegments(lineSegmentsContract, geometryName) {
    const invalidValueCounter = { nonFiniteValueCount: 0, outOfRangeIndexCount: 0 };
    const coordinateSequences = ["x_coordinates", "y_coordinates", "z_coordinates"].map(
      (fieldName) => contractArrayFieldOrEmpty(lineSegmentsContract, fieldName, invalidValueCounter),
    );
    const [xCoordinates, yCoordinates, zCoordinates] = coordinateSequences;
    const lengthsMatch = xCoordinates.length === yCoordinates.length &&
      xCoordinates.length === zCoordinates.length;
    // null/undefined 是断线分隔符；其余非有限值（字符串、NaN）让整条线框作废，而不是被悄悄当作断点。
    coordinateSequences.forEach((sequence) => sequence.forEach((coordinate) => {
      if (coordinate !== null && coordinate !== undefined && !isFiniteContractNumber(coordinate)) {
        invalidValueCounter.nonFiniteValueCount += 1;
      }
    }));
    if (!lengthsMatch || invalidValueCounter.nonFiniteValueCount) {
      recordSkippedInvalidContractGeometry(geometryName, invalidValueCounter);
      return [];
    }
    const positionPairs = [];
    let previousPosition = null;
    for (let index = 0; index < xCoordinates.length; index += 1) {
      const coordinates = [xCoordinates[index], yCoordinates[index], zCoordinates[index]];
      if (coordinates.some((coordinate) => coordinate === null || coordinate === undefined)) {
        previousPosition = null;
        continue;
      }
      const currentPosition = normalizedThreeDimensionalPosition(...coordinates);
      if (previousPosition) positionPairs.push(previousPosition, currentPosition);
      previousPosition = currentPosition;
    }
    return positionPairs;
  }

  function triangleMeshObject(meshContract, materialOptions, geometryName) {
    const invalidValueCounter = { nonFiniteValueCount: 0, outOfRangeIndexCount: 0 };
    const [xCoordinates, yCoordinates, zCoordinates] = [
      "x_coordinates", "y_coordinates", "z_coordinates",
    ].map((fieldName) => contractArrayFieldOrEmpty(meshContract, fieldName, invalidValueCounter));
    const triangleVertexIndexSequences = [
      "triangle_vertex_index_a", "triangle_vertex_index_b", "triangle_vertex_index_c",
    ].map((fieldName) => contractArrayFieldOrEmpty(meshContract, fieldName, invalidValueCounter));
    const vertexCount = xCoordinates.length;
    const triangleCount = triangleVertexIndexSequences[0].length;
    // 坐标字段本身不是数组（如旧契约的 bdata 对象）时顶点数无从得知：只记那 1 次结构错误，
    // 不把全部索引都算成「越界」，免得诊断计数误导排查（R2-F10）。
    const everyCoordinateFieldIsArray = ["x_coordinates", "y_coordinates", "z_coordinates"].every(
      (fieldName) => Array.isArray(meshContract?.[fieldName]),
    );
    [xCoordinates, yCoordinates, zCoordinates].forEach((sequence) => sequence.forEach((coordinate) => {
      if (!isFiniteContractNumber(coordinate)) invalidValueCounter.nonFiniteValueCount += 1;
    }));
    triangleVertexIndexSequences.forEach((sequence) => sequence.forEach((vertexIndex) => {
      if (!isFiniteContractNumber(vertexIndex) || !Number.isInteger(vertexIndex)) {
        invalidValueCounter.nonFiniteValueCount += 1;
      } else if (everyCoordinateFieldIsArray && (vertexIndex < 0 || vertexIndex >= vertexCount)) {
        invalidValueCounter.outOfRangeIndexCount += 1;
      }
    }));
    const structureIsConsistent =
      yCoordinates.length === vertexCount && zCoordinates.length === vertexCount &&
      triangleVertexIndexSequences.every((sequence) => sequence.length === triangleCount);
    if (
      !structureIsConsistent ||
      invalidValueCounter.nonFiniteValueCount ||
      invalidValueCounter.outOfRangeIndexCount
    ) {
      recordSkippedInvalidContractGeometry(geometryName, invalidValueCounter);
      return null;
    }
    // Pareto 点不足或投影共线时契约给出合法的空网格：不建对象，也不计为错误。
    if (!vertexCount || !triangleCount) return null;
    const positions = xCoordinates.flatMap((xCoordinate, index) =>
      normalizedThreeDimensionalPosition(
        xCoordinate,
        yCoordinates[index],
        zCoordinates[index],
      ).toArray(),
    );
    const triangleIndices = [];
    for (let triangleIndex = 0; triangleIndex < triangleCount; triangleIndex += 1) {
      triangleIndices.push(
        triangleVertexIndexSequences[0][triangleIndex],
        triangleVertexIndexSequences[1][triangleIndex],
        triangleVertexIndexSequences[2][triangleIndex],
      );
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setIndex(triangleIndices);
    geometry.computeVertexNormals();
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      ...materialOptions,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.renderOrder = 60;
    return mesh;
  }

  function buildFrontierGeometry() {
    clearThreeObjectGroup(frontierGeometryGroup);
    const wireframePositionPairs = splitCoordinateSequenceIntoSegments(
      activeThreeDimensionalScene.pareto_frontier_wireframe_line_segments,
      "pareto_frontier_wireframe_line_segments",
    );
    frontierWireframeObject = wireframePositionPairs.length
      ? lineObjectFromPositionPairs(wireframePositionPairs, 0x245c9a, 2)
      : null;
    if (frontierWireframeObject) frontierGeometryGroup.add(frontierWireframeObject);

    frontierSurfaceObject = triangleMeshObject(
      activeThreeDimensionalScene.pareto_frontier_surface_triangle_mesh,
      { color: 0x3182bd, opacity: 0.25 },
      "pareto_frontier_surface_triangle_mesh",
    );
    if (frontierSurfaceObject) frontierGeometryGroup.add(frontierSurfaceObject);

    achievableFrontierSurfaceObject = triangleMeshObject(
      activeThreeDimensionalScene.achievable_frontier_surface_triangle_mesh,
      { color: 0x31a354, opacity: 0.2 },
      "achievable_frontier_surface_triangle_mesh",
    );
    if (achievableFrontierSurfaceObject) {
      frontierGeometryGroup.add(achievableFrontierSurfaceObject);
    }
    const exactBoundarySegments = activeThreeDimensionalScene.exact_achievable_frontier_boundary_line_segments;
    const exactBoundaryPositionPairs = exactBoundarySegments
      ? splitCoordinateSequenceIntoSegments(exactBoundarySegments, "exact_achievable_frontier_boundary_line_segments")
      : [];
    exactAchievableFrontierBoundaryObject = exactBoundaryPositionPairs.length
      ? lineObjectFromPositionPairs(exactBoundaryPositionPairs, 0x217a3c, 1)
      : null;
    if (exactAchievableFrontierBoundaryObject) frontierGeometryGroup.add(exactAchievableFrontierBoundaryObject);
    applyFrontierGeometryVisibility();
  }

  function canvasTextureFromDrawing(draw) {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext("2d");
    draw(context, canvas.width, canvas.height);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  function roundedRectanglePath(context, x, y, width, height, radius) {
    const clampedRadius = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.roundRect(x, y, width, height, clampedRadius);
  }

  const whiteLogoBackplateTexture = canvasTextureFromDrawing((context) => {
    roundedRectanglePath(context, 8, 8, 112, 112, 24);
    context.fillStyle = "rgba(255,255,255,0.96)";
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "rgba(71,85,105,0.45)";
    context.stroke();
  });
  // 历史口径点（D-1）：半透明浅灰底板 + 虚线描边，与当期白底板一眼可分，Logo 另用低不透明度材质。
  const historicalIntelligenceIndexVersionLogoBackplateTexture = canvasTextureFromDrawing(
    (context) => {
      roundedRectanglePath(context, 10, 10, 108, 108, 24);
      context.fillStyle = "rgba(241,245,249,0.62)";
      context.fill();
      context.setLineDash([14, 9]);
      context.lineWidth = 6;
      context.strokeStyle = "rgba(71,85,105,0.9)";
      context.stroke();
    },
  );
  // EXPERIMENT_NODE: 历史口径点 Logo 的不透明度（0.42）与虚线底板样式，待与用户对比 0.3/0.5 两档后定。
  const HISTORICAL_INTELLIGENCE_INDEX_VERSION_LOGO_OPACITY = 0.42;
  const paretoRingTexture = canvasTextureFromDrawing((context) => {
    context.beginPath();
    context.arc(64, 64, 53, 0, Math.PI * 2);
    context.lineWidth = 10;
    context.strokeStyle = "rgba(15,23,42,0.66)";
    context.stroke();
  });
  const standoutHaloTexture = canvasTextureFromDrawing((context) => {
    const gradient = context.createRadialGradient(64, 64, 32, 64, 64, 63);
    gradient.addColorStop(0, "rgba(49,130,189,0)");
    gradient.addColorStop(0.65, "rgba(49,130,189,0.32)");
    gradient.addColorStop(1, "rgba(49,130,189,0)");
    context.fillStyle = gradient; context.fillRect(0, 0, 128, 128);
  });
  const missingStandoutHaloTexture = canvasTextureFromDrawing((context) => {
    context.beginPath(); context.arc(64, 64, 54, 0, Math.PI * 2);
    context.setLineDash([8, 8]); context.lineWidth = 5; context.strokeStyle = "rgba(71,85,105,0.8)"; context.stroke();
  });
  const sensitivityRingMaterials = Object.fromEntries([
    ["robust", "#16a34a", false], ["sensitive", "#b45309", true], ["near", "#a855f7", true], ["new_entry", "#0891b2", false],
  ].map(([name,color,dashed]) => [name,spriteMaterial(canvasTextureFromDrawing(context=>{
    context.beginPath();context.arc(64,64,54,0,Math.PI*2);context.lineWidth=6;context.strokeStyle=color;
    if(dashed)context.setLineDash([9,7]);context.stroke();
  }))]));
  const pinnedRingTexture = canvasTextureFromDrawing((context) => {
    context.beginPath();
    context.arc(64, 64, 54, 0, Math.PI * 2);
    context.lineWidth = 12;
    context.strokeStyle = "rgba(234,179,8,0.98)";
    context.stroke();
  });
  const prunedLineageAncestorTexture = canvasTextureFromDrawing((context) => {
    context.beginPath();
    context.arc(64, 64, 42, 0, Math.PI * 2);
    context.fillStyle = "rgba(100,116,139,0.96)";
    context.fill();
    context.lineWidth = 8;
    context.strokeStyle = "rgba(255,255,255,0.98)";
    context.stroke();
  });
  const countryRegionTextures = {
    china: canvasTextureFromDrawing((context) => {
      context.beginPath();
      context.arc(64, 64, 52, 0, Math.PI * 2);
      context.lineWidth = 8;
      context.strokeStyle = "#dc2626";
      context.stroke();
      context.beginPath();
      context.arc(64, 64, 42, 0, Math.PI * 2);
      context.lineWidth = 4;
      context.strokeStyle = "#dc2626";
      context.stroke();
    }),
    united_states: canvasTextureFromDrawing((context) => {
      roundedRectanglePath(context, 12, 12, 104, 104, 25);
      context.lineWidth = 10;
      context.strokeStyle = "#2563eb";
      context.stroke();
    }),
    other: canvasTextureFromDrawing((context) => {
      context.save();
      context.translate(64, 64);
      context.rotate(Math.PI / 4);
      context.strokeStyle = "#4b5563";
      context.lineWidth = 9;
      context.strokeRect(-39, -39, 78, 78);
      context.restore();
    }),
    unclassified: canvasTextureFromDrawing((context) => {
      context.save();
      context.translate(64, 64);
      context.rotate(Math.PI / 4);
      context.strokeStyle = "#9ca3af";
      context.setLineDash([10, 8]);
      context.lineWidth = 9;
      context.strokeRect(-39, -39, 78, 78);
      context.restore();
    }),
  };

  function spriteMaterial(texture, { depthWrite = false } = {}) {
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: true,
      depthWrite,
      alphaTest: 0.02,
      sizeAttenuation: false,
    });
    return material;
  }

  const whiteLogoBackplateMaterial = spriteMaterial(whiteLogoBackplateTexture, {
    depthWrite: true,
  });
  // 与白底板保持相同的深度写入（D-5 定案前不改遮挡语义），只改外观。
  const historicalIntelligenceIndexVersionLogoBackplateMaterial = spriteMaterial(
    historicalIntelligenceIndexVersionLogoBackplateTexture,
    { depthWrite: true },
  );
  const paretoRingMaterial = spriteMaterial(paretoRingTexture);
  const pinnedRingMaterial = spriteMaterial(pinnedRingTexture);
  const standoutHaloMaterial = spriteMaterial(standoutHaloTexture);
  const missingStandoutHaloMaterial = spriteMaterial(missingStandoutHaloTexture);
  const prunedLineageAncestorMaterial = spriteMaterial(
    prunedLineageAncestorTexture,
  );
  prunedLineageAncestorMaterial.depthTest = false;
  const countryRegionMaterials = Object.fromEntries(
    Object.entries(countryRegionTextures).map(([key, texture]) => [key, spriteMaterial(texture)]),
  );
  [
    whiteLogoBackplateMaterial,
    historicalIntelligenceIndexVersionLogoBackplateMaterial,
    paretoRingMaterial,
    standoutHaloMaterial,
    missingStandoutHaloMaterial,
    pinnedRingMaterial,
    prunedLineageAncestorMaterial,
    ...Object.values(countryRegionMaterials),
  ].forEach((material) => {
    material.userData = { sharedMaterial: true };
  });

  function addSharedMaterialSprite(material, position, cssPixelSize, renderOrder) {
    const sprite = new THREE.Sprite(material);
    sprite.position.copy(position);
    setSpriteCssPixelSize(sprite, cssPixelSize);
    sprite.renderOrder = renderOrder;
    sprite.userData.sharedMaterial = true;
    modelMarkerGroup.add(sprite);
    return sprite;
  }

  function setSpriteCssPixelSize(sprite, cssPixelSize) {
    sprite.userData.cssPixelSize = cssPixelSize;
    const scale = cssPixelSize * markerSizeMultiplier * 2 * Math.tan(THREE.MathUtils.degToRad(perspectiveCamera.fov / 2)) / Math.max(1, graphContainer.clientHeight);
    sprite.scale.set(scale, scale, 1);
  }

  function setMarkerSizeMultiplier(nextMultiplier) {
    if (!Number.isFinite(Number(nextMultiplier))) return false;
    markerSizeMultiplier = Math.min(1.5, Math.max(0.5, Number(nextMultiplier)));
    if (markerSizeSlider) markerSizeSlider.value = String(markerSizeMultiplier);
    if (markerSizeOutput) markerSizeOutput.textContent = `${formatSignificantNumber(markerSizeMultiplier)}×`;
    for (const group of [modelMarkerGroup, transientRelationshipGroup]) {
      group.children.filter(child => child.isSprite).forEach(sprite => setSpriteCssPixelSize(sprite, sprite.userData.cssPixelSize));
    }
    writeStoredPreference(MARKER_SIZE_STORAGE_KEY, markerSizeMultiplier);
    requestThreeDimensionalSceneRender();
    notifyExplorationViewChanged();
    return true;
  }

  function currentOrganizationVisibility(creatorName) {
    return !hiddenOrganizationCreatorNames.has(creatorName);
  }

  // 旧契约没有 analysis_eligibility 字段时一律按「参与分析」处理（W1-6 降级约定）。
  function modelIsAnalysisEligibleForActiveMetricVariant(model) {
    return model?.analysis_eligibility?.is_analysis_eligible_for_current_metric_variant !== false;
  }

  function historicalIntelligenceIndexVersionReasonText(model) {
    return (
      model?.analysis_eligibility?.ineligibility_reason_text ||
      HISTORICAL_INTELLIGENCE_INDEX_VERSION_FALLBACK_REASON_TEXT
    );
  }

  function modelMarkerIsCurrentlyVisible(modelIndex) {
    const model = displayedModelMarkers[modelIndex];
    const visualObjects = modelVisualObjectsByModelIndex[modelIndex];
    if (!model || !visualObjects || visualObjects.hasNonFiniteContractCoordinate) return false;
    return modelMarkerHiddenReasonTexts(modelIndex).length === 0;
  }

  function modelMarkerHiddenReasonTexts(modelIndex) {
    const model = displayedModelMarkers[modelIndex];
    if (!model) return [];
    const reasons = [];
    const explorationVisibility = modelVisibilityForExplorationFilters(model,explorationFilters);
    if (!explorationVisibility.visible) reasons.push(explorationVisibility.reason);
    if (!currentOrganizationVisibility(model.creator)) reasons.push("厂商筛选");
    if (showOnlyCurrentIntelligenceIndexVersionComparableModels &&
        !modelIsAnalysisEligibleForActiveMetricVariant(model)) reasons.push("仅当期可比");
    if (!showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod &&
        model.displayed_only_because_of_recent_release_grace_period === true) {
      reasons.push("近期发布宽限已关闭");
    }
    if (modelVisualObjectsByModelIndex[modelIndex]?.hasNonFiniteContractCoordinate) {
      reasons.push("坐标无效");
    }
    return reasons;
  }

  // 历史口径点复用同一张 Logo 纹理（共享加载状态），只换一份低不透明度材质。
  const historicalIntelligenceIndexVersionLogoMaterialsByCreatorName = {};

  function historicalIntelligenceIndexVersionLogoMaterialForCreatorName(
    creatorName,
    currentVersionLogoMaterial,
  ) {
    let historicalLogoMaterial =
      historicalIntelligenceIndexVersionLogoMaterialsByCreatorName[creatorName];
    if (!historicalLogoMaterial) {
      historicalLogoMaterial = currentVersionLogoMaterial.clone();
      historicalLogoMaterial.opacity = HISTORICAL_INTELLIGENCE_INDEX_VERSION_LOGO_OPACITY;
      historicalLogoMaterial.userData = { sharedMaterial: true };
      historicalIntelligenceIndexVersionLogoMaterialsByCreatorName[creatorName] =
        historicalLogoMaterial;
    }
    return historicalLogoMaterial;
  }

  function organizationLogoMaterialForCreatorName(creatorName, identity) {
    const logoCanvas = document.createElement("canvas");
    logoCanvas.width = 256;
    logoCanvas.height = 256;
    const logoCanvasContext = logoCanvas.getContext("2d");
    const logoTexture = new THREE.CanvasTexture(logoCanvas);
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    const logoMaterial = spriteMaterial(logoTexture);
    logoMaterial.userData = { sharedMaterial: true };
    organizationLogoTextureLoadStateByCreatorName[creatorName] = "loading";

    const brandImage = new Image();
    brandImage.onload = () => {
      const imageWidth = Math.max(1, brandImage.naturalWidth);
      const imageHeight = Math.max(1, brandImage.naturalHeight);
      const scale = Math.min(224 / imageWidth, 224 / imageHeight);
      const displayedWidth = imageWidth * scale;
      const displayedHeight = imageHeight * scale;
      logoCanvasContext.clearRect(0, 0, logoCanvas.width, logoCanvas.height);
      logoCanvasContext.drawImage(
        brandImage,
        (logoCanvas.width - displayedWidth) / 2,
        (logoCanvas.height - displayedHeight) / 2,
        displayedWidth,
        displayedHeight,
      );
      logoTexture.needsUpdate = true;
      organizationLogoTextureLoadStateByCreatorName[creatorName] = "loaded";
      requestThreeDimensionalSceneRender();
    };
    brandImage.onerror = () => {
      organizationLogoTextureLoadStateByCreatorName[creatorName] = "failed";
      console.error(`Unable to decode organization brand asset: ${creatorName}`);
    };
    brandImage.src = identity.logo_visualization_data_url;
    return logoMaterial;
  }

  function buildModelMarkers() {
    clearThreeObjectGroup(modelMarkerGroup);
    modelVisualObjectsByModelIndex = [];
    clickableOrganizationLogoSprites = [];
    pointerInteractiveModelMarkerSprites = [];
    displayedModelMarkers.forEach((model, modelIndex) => {
      // 坐标非有限的模型仍建占位 sprite（保持下标对齐），但永不显示、不可拾取，并计入状态。
      const nonFiniteMarkerCoordinateCount = [model.x, model.y, model.z].filter(
        (coordinate) => !isFiniteContractNumber(coordinate),
      ).length;
      nonFiniteContractCoordinateCount += nonFiniteMarkerCoordinateCount;
      const position = nonFiniteMarkerCoordinateCount
        ? new THREE.Vector3()
        : normalizedThreeDimensionalPosition(model.x, model.y, model.z);
      const identity = organizationIdentityMetadataByCreatorName[model.creator];
      const isAnalysisEligible = modelIsAnalysisEligibleForActiveMetricVariant(model);
      const backplateSprite = addSharedMaterialSprite(
        isAnalysisEligible
          ? whiteLogoBackplateMaterial
          : historicalIntelligenceIndexVersionLogoBackplateMaterial,
        position,
        MODEL_MARKER_CSS_PIXEL_SIZES_AT_ONE_MULTIPLIER.backplate,
        30,
      );
      const countryRegionCategory = identity.country_region_category;
      const countryRegionSprite = addSharedMaterialSprite(
        countryRegionMaterials[countryRegionCategory] || countryRegionMaterials.unclassified,
        position,
        MODEL_MARKER_CSS_PIXEL_SIZES_AT_ONE_MULTIPLIER.countryRegion,
        20,
      );
      countryRegionSprite.visible = countryRegionMarkerVisible;

      let logoMaterial = organizationLogoMaterialsByCreatorName[model.creator];
      if (!logoMaterial) {
        logoMaterial = organizationLogoMaterialForCreatorName(
          model.creator,
          identity,
        );
        organizationLogoMaterialsByCreatorName[model.creator] = logoMaterial;
      }
      const logoSprite = addSharedMaterialSprite(
        isAnalysisEligible
          ? logoMaterial
          : historicalIntelligenceIndexVersionLogoMaterialForCreatorName(
            model.creator,
            logoMaterial,
          ),
        position,
        MODEL_MARKER_CSS_PIXEL_SIZES_AT_ONE_MULTIPLIER.logo,
        40,
      );
      [backplateSprite, logoSprite].forEach((markerSprite) => {
        markerSprite.userData.modelIndex = modelIndex;
        markerSprite.userData.interactionTargetKind = "displayed_model";
      });
      clickableOrganizationLogoSprites.push(logoSprite);
      pointerInteractiveModelMarkerSprites.push(
        backplateSprite,
        logoSprite,
      );

      const paretoRingSprite = addSharedMaterialSprite(
        paretoRingMaterial,
        position,
        MODEL_MARKER_CSS_PIXEL_SIZES_AT_ONE_MULTIPLIER.paretoRing,
        45,
      );
      paretoRingSprite.visible = model.panel.layer === 1;
      const standoutHaloSprite = addSharedMaterialSprite(standoutHaloMaterial, position, MODEL_MARKER_CSS_PIXEL_SIZES_AT_ONE_MULTIPLIER.standoutHalo, 15);
      standoutHaloSprite.visible = model.panel.layer === 1;
      const pinnedRingSprite = addSharedMaterialSprite(
        pinnedRingMaterial,
        position,
        MODEL_MARKER_CSS_PIXEL_SIZES_AT_ONE_MULTIPLIER.pinnedRing,
        50,
      );
      pinnedRingSprite.visible = false;

      const sensitivityRingSprite = addSharedMaterialSprite(sensitivityRingMaterials.robust,position,60,48);
      sensitivityRingSprite.visible = false;
      const newFrontierEntrySprite = addSharedMaterialSprite(sensitivityRingMaterials.new_entry,position,70,47);
      newFrontierEntrySprite.visible = false;
      modelVisualObjectsByModelIndex.push({
        sensitivityRingSprite, newFrontierEntrySprite,
        creatorName: model.creator,
        isAnalysisEligible,
        hasNonFiniteContractCoordinate: nonFiniteMarkerCoordinateCount > 0,
        logoSprite,
        backplateSprite,
        countryRegionSprite,
        paretoRingSprite,
        standoutHaloSprite,
        pinnedRingSprite,
      });
    });
    applyModelMarkerVisibilityAndRefreshDependentViews();
    applyPinnedModelVisualEncoding();
    applyStandoutVisualEncoding();
  }

  // 厂商筛选、「仅当期可比」与非有限坐标共同决定标记可见性；不可见的 sprite 同时退出拾取。
  function applyModelMarkerVisibilityAndRefreshDependentViews() {
    cancelHoverDepartureGracePeriod();
    if ((hoveredModelIndex !== null && !modelMarkerIsCurrentlyVisible(hoveredModelIndex)) ||
      (hoveredPrunedLineageAncestorNode && !lineageNodePassesCurrentVisibilityFilters(hoveredPrunedLineageAncestorNode))) clearHoverInteractionImmediately();
    modelVisualObjectsByModelIndex.forEach((visualObjects, modelIndex) => {
      const model = displayedModelMarkers[modelIndex];
      const markerVisible = modelMarkerIsCurrentlyVisible(modelIndex);
      visualObjects.logoSprite.visible = markerVisible;
      visualObjects.backplateSprite.visible = markerVisible;
      visualObjects.countryRegionSprite.visible =
        markerVisible && countryRegionMarkerVisible;
      visualObjects.paretoRingSprite.visible =
        markerVisible && model.panel?.layer === 1;
      visualObjects.standoutHaloSprite.visible = markerVisible && model.panel?.layer === 1;
      visualObjects.pinnedRingSprite.visible =
        markerVisible && modelIsPinned(model);
    });
    applySensitivityAndRefreshEntryRings();
    renderReportHeaderModelCountSummary();
    refreshOrganizationAndCountryRegionVisibleModelCounts();
    renderHowToReadDrawer();
    // 可见性变了，pin/悬停的连线、搜索结果的「已隐藏」标注都要跟着重算
    redrawHoveredAndPinnedRelationships();
    renderSearchResults();
    renderPinnedModelsPanel();
    renderCurrentView();
    if (standoutRankingList) applyStandoutVisualEncoding();
    requestThreeDimensionalSceneRender();
    notifyExplorationViewChanged();
  }

  function setShowOnlyCurrentIntelligenceIndexVersionComparableModels(nextValue) {
    showOnlyCurrentIntelligenceIndexVersionComparableModels = Boolean(nextValue);
    if (currentIntelligenceIndexVersionComparableOnlyToggle) {
      currentIntelligenceIndexVersionComparableOnlyToggle.checked =
        showOnlyCurrentIntelligenceIndexVersionComparableModels;
    }
    applyModelMarkerVisibilityAndRefreshDependentViews();
    return Promise.resolve(showOnlyCurrentIntelligenceIndexVersionComparableModels);
  }

  function setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod(nextValue) {
    showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod =
      recentReleaseFrontierDistanceGracePeriodMonths > 0 && Boolean(nextValue);
    if (recentReleaseGracePeriodModelVisibilityToggle) {
      recentReleaseGracePeriodModelVisibilityToggle.checked =
        showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod;
    }
    applyModelMarkerVisibilityAndRefreshDependentViews();
    return Promise.resolve(showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod);
  }

  function setCountryRegionMarkerVisible(nextVisible) {
    countryRegionMarkerVisible = Boolean(nextVisible);
    if (countryRegionMarkerToggle) {
      countryRegionMarkerToggle.checked = countryRegionMarkerVisible;
    }
    const countryLegend = document.getElementById("aa-country-region-legend");
    if (countryLegend) countryLegend.hidden = !countryRegionMarkerVisible;
    if (countryRegionMarkerVisible && organizationFilterPanel) {
      organizationFilterPanel.open = true;
    }
    applyModelMarkerVisibilityAndRefreshDependentViews();
    return Promise.resolve(countryRegionMarkerVisible);
  }

  function applyFrontierGeometryVisibility() {
    if (frontierWireframeObject) {
      frontierWireframeObject.visible = !achievableFrontierSurfaceVisible && frontierStyle === "wireframe";
    }
    if (frontierSurfaceObject) {
      frontierSurfaceObject.visible = !achievableFrontierSurfaceVisible && frontierStyle === "solid";
    }
    if (achievableFrontierSurfaceObject) {
      achievableFrontierSurfaceObject.visible = achievableFrontierSurfaceVisible;
    }
    if (exactAchievableFrontierBoundaryObject) {
      exactAchievableFrontierBoundaryObject.visible = achievableFrontierSurfaceVisible;
    }
    frontierStyleButtons.forEach((button) => { button.disabled = achievableFrontierSurfaceVisible; });
    renderHowToReadDrawer();
    if (frontierGeometryExplanation) {
      frontierGeometryExplanation.textContent = achievableFrontierSurfaceVisible
        ? "精确预算阶梯：基于本口径已展示且参与分析的 Pareto 点，表示最高可达智能；不可达区留白。"
        : "相邻 Pareto 点的 Delaunay 插值仅作视觉参照，不是帕累托面；面内位置不代表可达模型。";
      updateFrontierGeometryExplanationDisclosureLabel();
    }
    requestThreeDimensionalSceneRender();
    notifyExplorationViewChanged();
  }

  function setFrontierStyle(nextStyle) {
    if (!["wireframe", "solid", "hidden"].includes(nextStyle)) return Promise.resolve(false);
    frontierStyle = nextStyle;
    frontierStyleButtons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        button.dataset.frontierStyle === frontierStyle ? "true" : "false",
      );
    });
    applyFrontierGeometryVisibility();
    return Promise.resolve(true);
  }

  function setAchievableFrontierSurfaceVisible(nextVisible) {
    if (nextVisible && activeThreeDimensionalScene.achievable_frontier_geometry_kind !== "exact_budget_steps") {
      return Promise.resolve(false);
    }
    achievableFrontierSurfaceVisible = Boolean(nextVisible);
    if (achievableFrontierSurfaceToggle) {
      achievableFrontierSurfaceToggle.checked = achievableFrontierSurfaceVisible;
    }
    applyFrontierGeometryVisibility();
    return Promise.resolve(achievableFrontierSurfaceVisible);
  }

  function applyInitialCameraConfiguration() {
    cameraViewControls.resetCamera({commit:false});
  }

  // 谱系节点是否可作为连线端点：被剪枝的前身总会画出自己的标记；已上图（kept）的节点要求其标记当前可见
  // （「仅当期可比」、厂商筛选、非有限坐标都会隐藏标记）。不可见的 kept 节点当作断点，不跨过它连线。
  function lineageNodePassesCurrentVisibilityFilters(node) {
    const creator = node.creator || node.lineage_family_key?.split("||")[0];
    if (creator && !currentOrganizationVisibility(creator)) return false;
    if (showOnlyCurrentIntelligenceIndexVersionComparableModels && !modelIsAnalysisEligibleForActiveMetricVariant(node)) return false;
    const common = allModelRecordsByIdentity.get(stableModelIdentity(node));
    const explorationModel = common || {...node,panel:{release_date:node.release_date}};
    if (!modelVisibilityForExplorationFilters(explorationModel,explorationFilters).visible) return false;
    if (!node.kept) return true;
    const modelIndex = displayedModelMarkers.findIndex((model) => node.model_uuid ? model.model_uuid === node.model_uuid : model.name === node.name);
    return modelIndex >= 0 && modelMarkerIsCurrentlyVisible(modelIndex);
  }

  function applyRelationshipForegroundVisualEncoding() {
    modelVisualObjectsByModelIndex.forEach((visualObjects, index) => {
      const selected = modelMarkerIsCurrentlyVisible(index) && (modelIsPinned(displayedModelMarkers[index]) || hoveredModelIndex === index);
      for (const sprite of [visualObjects.logoSprite, visualObjects.backplateSprite, visualObjects.countryRegionSprite, visualObjects.paretoRingSprite, visualObjects.pinnedRingSprite, visualObjects.standoutHaloSprite,visualObjects.sensitivityRingSprite,visualObjects.newFrontierEntrySprite]) {
        if (!sprite) continue;
        if (!sprite.userData.normalMaterial) {
          sprite.userData.normalMaterial = sprite.material;
          sprite.userData.normalRenderOrder = sprite.renderOrder;
        }
        if (selected && !sprite.userData.foregroundMaterial) {
          sprite.userData.foregroundMaterial = sprite.userData.normalMaterial.clone();
          sprite.userData.foregroundMaterial.depthTest = false;
          sprite.userData.foregroundMaterial.depthWrite = false;
        }
        sprite.material = selected ? sprite.userData.foregroundMaterial : sprite.userData.normalMaterial;
        if (modelVisibilityForExplorationFilters(displayedModelMarkers[index],explorationFilters).faded) {
          if (!sprite.userData.dateFadedMaterial) sprite.userData.dateFadedMaterial = sprite.material.clone();
          sprite.userData.dateFadedMaterial.copy(sprite.material);
          sprite.userData.dateFadedMaterial.opacity = sprite.material.opacity * .24;
          sprite.userData.dateFadedMaterial.depthWrite = false;
          sprite.material = sprite.userData.dateFadedMaterial;
        }
        // 夹紧前身可能投影重叠，选中点应保持在灰色前身（90）上层。
        sprite.renderOrder = selected ? 91 + sprite.userData.normalRenderOrder / 10 : sprite.userData.normalRenderOrder;
      }
    });
    if (frontierWireframeObject) frontierWireframeObject.material.opacity = hoveredModelIndex !== null || hoveredPrunedLineageAncestorName !== null ? 0.25 : 0.9;
  }

  function redrawHoveredAndPinnedRelationships() {
    clearThreeObjectGroup(transientRelationshipGroup);
    clickablePrunedLineageAncestorSprites = [];
    transientLineageLineObject = null; transientReasoningVariantLineObject = null; transientSameGenerationLineObject = null;
    const lineageKeys = new Set(displayedModelMarkers.filter((model, index) => modelIsPinned(model) && modelMarkerIsCurrentlyVisible(index)).map((model) => model.lineage_key).filter(Boolean));
    if (hoveredLineageKey) lineageKeys.add(hoveredLineageKey);
    const lineagePositionPairs = [];
    const displayedAncestorIdentities = new Set();
    function addAncestor(node, lineageKey, relationshipKind = "previous_generation") {
      const identity = stableModelIdentity(node);
      if (node.kept || displayedAncestorIdentities.has(identity) || !lineageNodePassesCurrentVisibilityFilters(node)) return;
      displayedAncestorIdentities.add(identity);
      const sprite = new THREE.Sprite(prunedLineageAncestorMaterial);
      sprite.position.copy(clampedLineagePosition(node));
      setSpriteCssPixelSize(sprite, MODEL_MARKER_CSS_PIXEL_SIZES_AT_ONE_MULTIPLIER.prunedLineageAncestor); sprite.renderOrder = 90;
      sprite.userData = { sharedMaterial: true, interactionTargetKind: "pruned_lineage_ancestor", lineageKey,
        cssPixelSize: MODEL_MARKER_CSS_PIXEL_SIZES_AT_ONE_MULTIPLIER.prunedLineageAncestor,
        prunedLineageAncestorNode: { ...node, relationship_kind: relationshipKind } };
      transientRelationshipGroup.add(sprite); clickablePrunedLineageAncestorSprites.push(sprite);
    }
    lineageKeys.forEach((lineageKey) => {
      const nodes = lineagesByOrganizationAndTier[lineageKey] || [];
      nodes.forEach((node) => addAncestor(node, lineageKey));
      for (let index = 1; index < nodes.length; index += 1) {
        const previous = nodes[index - 1], current = nodes[index];
        if (!lineageNodePassesCurrentVisibilityFilters(previous) || !lineageNodePassesCurrentVisibilityFilters(current)) continue;
        lineagePositionPairs.push(clampedLineagePosition(previous), clampedLineagePosition(current));
      }
    });
    if (lineagePositionPairs.length) {
      transientLineageLineObject = relationshipLineObject(lineagePositionPairs, 0x475569, 3);
      transientRelationshipGroup.add(transientLineageLineObject);
    }
    const hoveredModel = hoveredModelIndex === null ? null : displayedModelMarkers[hoveredModelIndex];
    if (hoveredModel?.lineage_family_key && !lineagesByOrganizationAndTier[hoveredModel.lineage_key]) {
      const candidates = Object.entries(lineagesByOrganizationAndTier).flatMap(([key, nodes]) => nodes.map((node) => ({ key, node })))
        .filter(({ node }) => node.lineage_family_key === hoveredModel.lineage_family_key && node.base_model_name === hoveredModel.base_model_name && lineageNodePassesCurrentVisibilityFilters(node))
        .sort((left, right) => right.node.reasoning_level_sort_order - left.node.reasoning_level_sort_order);
      const representative = candidates[0];
      if (representative) {
        transientSameGenerationLineObject = relationshipLineObject([
          normalizedThreeDimensionalPosition(hoveredModel.x, hoveredModel.y, hoveredModel.z),
          clampedLineagePosition(representative.node),
        ], 0x475569, 3, true);
        transientRelationshipGroup.add(transientSameGenerationLineObject);
        addAncestor(representative.node, representative.key, "same_generation_reasoning_variant");
      }
    }
    const reasoningBaseNames = new Set(displayedModelMarkers.filter((model, index) => modelIsPinned(model) && modelMarkerIsCurrentlyVisible(index)).map((model) => model.base_model_name));
    if (hoveredReasoningBaseModelName) reasoningBaseNames.add(hoveredReasoningBaseModelName);
    const reasoningPairs = [];
    reasoningBaseNames.forEach((name) => {
      const indices = reasoningVariantGroupsByBaseModelName[name] || baseGroupsByBaseModelName[name] || [];
      for (let index = 1; index < indices.length; index += 1) {
        if (!modelMarkerIsCurrentlyVisible(indices[index - 1]) || !modelMarkerIsCurrentlyVisible(indices[index])) continue;
        for (const modelIndex of [indices[index - 1], indices[index]]) {
          const model = displayedModelMarkers[modelIndex]; reasoningPairs.push(normalizedThreeDimensionalPosition(model.x, model.y, model.z));
        }
      }
    });
    if (reasoningPairs.length) {
      transientReasoningVariantLineObject = relationshipLineObject(reasoningPairs, 0xa836aa, 3.5);
      transientRelationshipGroup.add(transientReasoningVariantLineObject);
    }
    applyRelationshipForegroundVisualEncoding();
    applySystemColorSchemeToScene();
    renderLineageOverflowDirectionLabels();
    requestThreeDimensionalSceneRender();
  }

  function renderLineageOverflowDirectionLabels() {
    lineageOverflowDirectionLabels.replaceChildren(...clickablePrunedLineageAncestorSprites.flatMap((sprite, index) => {
      const direction = lineageOverflowDirectionText(sprite.userData.prunedLineageAncestorNode);
      if (!direction) return [];
      const label = textElement("span", "aa-lineage-overflow-direction-label", direction);
      label.dataset.ancestorIndex = String(index);
      return [label];
    }));
    updateLineageOverflowDirectionLabelPositions();
  }

  function updateLineageOverflowDirectionLabelPositions() {
    for (const label of lineageOverflowDirectionLabels.children) {
      const sprite = clickablePrunedLineageAncestorSprites[Number(label.dataset.ancestorIndex)];
      if (!sprite) { label.hidden = true; continue; }
      const position = sprite.position.clone().project(perspectiveCamera);
      label.hidden = Math.abs(position.z) > 1 || Math.abs(position.x) > 1 || Math.abs(position.y) > 1;
      label.style.left = `${Math.max(0, Math.min(graphContainer.clientWidth - label.offsetWidth, (position.x + 1) * graphContainer.clientWidth / 2 + 10))}px`;
      label.style.top = `${Math.max(0, Math.min(graphContainer.clientHeight - label.offsetHeight, (1 - position.y) * graphContainer.clientHeight / 2 + 10))}px`;
    }
  }

  function speedAxisUnit() { return activeInteractionRelationships.speed_axis_field === "intelligence_index_tasks_per_hour" ? "任务/小时" : "tok/s"; }

  function costAxisUnit() {
    return activeInteractionRelationships.cost_axis_unit || visualizationDataset.cost_metric_definitions?.[activeMetricVariantKey.split("__")[0]]?.unit || "USD";
  }

  function modelTooltipHtml(model) {
    const panel = model.panel || {};
    const eligible = modelIsAnalysisEligibleForActiveMetricVariant(model);
    const section = (title, lines) => `<section class="aa-tooltip-section"><b>${title}</b><br>${lines.join("<br>")}</section>`;
    const alternativeValues = [
      ["cost_to_run", "有效运行成本", "USD"],
      ["blended_price_cache_input_output_7_to_2_to_1", "7:2:1 混合单价", "USD/M tokens"],
      ["eff_speed", "有效速度", "tok/s"], ["output_speed", "原始速度", "tok/s"],
    ].filter(([field]) => ![activeInteractionRelationships.cost_axis_field, activeInteractionRelationships.speed_axis_field].includes(field));
    return section("模型身份", [
      `<strong>${escapeHtml(model.name)}</strong>`,
      `${escapeHtml(model.creator)} · ${escapeHtml(model.reasoning_level_label || model.tier || "档位未记录")}`,
      `发布：${escapeHtml(panel.release_date && panel.release_date!=="?" ? panel.release_date : "未知发布日期")}`,
    ]) + section("坐标与备用口径", [
      `智能指数：${formatSignificantNumber(panel.intelligence)}（${intelligenceMeasurementStatusText(model.intelligence_measurement_status)}）`,
      `智能分来源：${escapeHtml(model.intelligence_measurement_evidence?.source ? `已接受的 AA 目录（v${model.intelligence_measurement_evidence.catalog_intelligence_index_version || "未知"}；${model.intelligence_measurement_evidence.catalog_captured_at_utc || "抓取时间未知"}）` : "未知；原始目录标记不作为实测证明")}`,
      `任务速度：${formatSignificantNumber(panel.intelligence_index_tasks_per_hour)} 任务/小时；智能指数任务耗时 ${formatSignificantNumber(panel.artificial_analysis_intelligence_index_time_per_task_seconds)} 秒`,
      ...(model.intelligence_index_task_time_evidence?.unavailability_reason ? [escapeHtml(model.intelligence_index_task_time_evidence.unavailability_reason)] : []),
      `API 端到端延迟（独立字段）：${formatSignificantNumber(panel.median_end_to_end_response_time_seconds)} 秒`,
      `${escapeHtml(activeInteractionRelationships.speed_axis_label)}：${formatSignificantNumber(panel[activeInteractionRelationships.speed_axis_field])} ${speedAxisUnit()}`,
      `${escapeHtml(activeInteractionRelationships.cost_axis_label)}：${formatSignificantNumber(panel[activeInteractionRelationships.cost_axis_field])} ${escapeHtml(costAxisUnit())}`,
      ...alternativeValues.map(([field, label, unit]) => `${label}：${formatSignificantNumber(panel[field])} ${unit}`),
      `冗长度：${formatSignificantNumber(panel.output_mtokens)} M tokens`,
    ]) + section("敏感性假设与刷新", [
      explorationFilters.sensitivity_intelligence_half_width === "off" ? "敏感性标注关闭" : `${frontierSensitivityStatusText(sensitivityClassificationForModel(model),panel.layer===1)}：智能 ±${explorationFilters.sensitivity_intelligence_half_width}；成本、速度各 ±10%；不是 AA 置信区间，不覆盖重定标误差`,
      newlyEnteredFrontierModelUuids().has(stableModelIdentity(model)) ? "本期新入前沿（匹配历史科学快照）" : "前沿进出仅在历史科学快照可比较时标记",
    ]) + section("前沿与突出度", [
      eligible ? `帕累托层级：${formatSignificantNumber(panel.layer)}` : "帕累托层级：不参与（历史口径）",
      `${escapeHtml(FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME[selectedFrontierStandoutMetricName].label)}：${standoutDisplayText(displayedStandoutValueForModel(model))}`,
      `突出度名次：${latestStandoutRanksByModelName[model.name] ? `${latestStandoutRanksByModelName[model.name]} / ${frontierModels().length}` : "未参与前沿排行"}`,
      ...(!eligible ? [escapeHtml(historicalIntelligenceIndexVersionReasonText(model))] : []),
    ]);
  }

  function prunedLineageAncestorTooltipHtml(lineageNode) {
    const direction = lineageOverflowDirectionText(lineageNode);
    return [
      `<strong>${escapeHtml(lineageNode.name)}</strong>`,
      lineageNode.relationship_kind === "same_generation_reasoning_variant" ? "同代其他档位 · 已从主散点裁剪" : "谱系前身 · 已从主散点裁剪",
      `发布：${escapeHtml(lineageNode.release_date)}`,
      `智能指数：${formatSignificantNumber(lineageNode.intelligence)}`,
      `${escapeHtml(activeInteractionRelationships.speed_axis_label)}：${formatSignificantNumber(lineageNode.y)} ${speedAxisUnit()}`,
      `${escapeHtml(activeInteractionRelationships.cost_axis_label)}：${formatSignificantNumber(lineageNode.x)} ${escapeHtml(costAxisUnit())}`,
      ...(direction ? [`箱壁夹紧：${escapeHtml(direction)}；以上数值保留原值。`] : []),
    ].join("<br>");
  }

  function escapeHtml(value) {
    const element = document.createElement("span");
    element.textContent = String(value);
    return element.innerHTML;
  }

  function formatNumber(value, digits = 1) {
    if (value === null || value === undefined || !Number.isFinite(Number(value))) return "?";
    return Number(value).toFixed(digits);
  }

  function synchronizeTouchDetailsActions() {
    if (!touchDetailsModel) return;
    if (hoveredModelIndex === null) {
      touchDetailsPinButton.remove();
    } else {
      touchDetailsPinButton.textContent = allKnownBaseModelIdentitiesArePinned(touchDetailsModel.base_model_name) ? "取消固定全部档位" : "固定全部档位";
      if (!touchDetailsPinButton.parentElement) touchDetailsActions.prepend(touchDetailsPinButton);
    }
    if (!touchDetailsActions.parentElement) tooltip.append(touchDetailsActions);
  }

  function refreshVisibleModelDetails(preserveScrollPosition = true) {
    if (tooltip.hidden) return;
    const model = hoveredModelIndex === null ? null : displayedModelMarkers[hoveredModelIndex];
    const ancestor = model ? null : hoveredPrunedLineageAncestorNode;
    if (!model && !ancestor) return;
    const preservedScrollTop = preserveScrollPosition ? tooltip.scrollTop : 0;
    modelTooltipBody.innerHTML = model ? modelTooltipHtml(model) : prunedLineageAncestorTooltipHtml(ancestor);
    if (touchDetailsModel) {
      touchDetailsModel = model || ancestor;
      synchronizeTouchDetailsActions();
    }
    tooltip.scrollTop = preservedScrollTop;
    if (latestTooltipPointerCoordinates) positionTooltip(latestTooltipPointerCoordinates);
  }

  function setHoveredModelIndex(nextModelIndex, pointerEvent) {
    if (
      nextModelIndex === hoveredModelIndex &&
      hoveredPrunedLineageAncestorName === null
    ) {
      if (pointerEvent && !tooltip.hidden) positionTooltip(pointerEvent);
      return;
    }
    hoveredModelIndex = nextModelIndex;
    hoveredPrunedLineageAncestorName = null;
    hoveredPrunedLineageAncestorNode = null;
    if (nextModelIndex === null) {
      hoveredLineageKey = null;
      hoveredReasoningBaseModelName = null;
      tooltip.hidden = true;
      redrawHoveredAndPinnedRelationships();
      return;
    }
    const model = displayedModelMarkers[nextModelIndex];
    hoveredLineageKey = model.lineage_key;
    hoveredReasoningBaseModelName = model.base_model_name;
    tooltip.hidden = false;
    refreshVisibleModelDetails(false);
    positionTooltip(pointerEvent || { clientX: plotRegion.getBoundingClientRect().left, clientY: plotRegion.getBoundingClientRect().top });
    redrawHoveredAndPinnedRelationships();
  }

  function setHoveredPrunedLineageAncestor(
    lineageKey,
    prunedLineageAncestorNode,
    pointerEvent,
  ) {
    if (
      hoveredPrunedLineageAncestorName === prunedLineageAncestorNode.name &&
      hoveredLineageKey === lineageKey
    ) {
      if (pointerEvent && !tooltip.hidden) positionTooltip(pointerEvent);
      return;
    }
    hoveredModelIndex = null;
    hoveredPrunedLineageAncestorName = prunedLineageAncestorNode.name;
    hoveredPrunedLineageAncestorNode = prunedLineageAncestorNode;
    hoveredLineageKey = lineageKey;
    hoveredReasoningBaseModelName = null;
    tooltip.hidden = false;
    refreshVisibleModelDetails(false);
    positionTooltip(pointerEvent || { clientX: plotRegion.getBoundingClientRect().left, clientY: plotRegion.getBoundingClientRect().top });
    redrawHoveredAndPinnedRelationships();
  }

  function positionTooltip(pointerEvent) {
    latestTooltipPointerCoordinates = { clientX: pointerEvent.clientX, clientY: pointerEvent.clientY };
    const regionBounds = plotRegion.getBoundingClientRect();
    tooltip.style.maxHeight = `${Math.max(0, regionBounds.height - 16)}px`;
    const tooltipBounds = tooltip.getBoundingClientRect();
    const left = Math.min(pointerEvent.clientX - regionBounds.left + 14, regionBounds.width - tooltipBounds.width - 8);
    const top = Math.min(pointerEvent.clientY - regionBounds.top + 14, regionBounds.height - tooltipBounds.height - 8);
    tooltip.style.left = `${Math.max(8, left)}px`;
    tooltip.style.top = `${Math.max(8, top)}px`;
  }

  function openTouchDetails(interactionTarget, pointerEvent) {
    if (!interactionTarget) {
      clearHoverInteractionImmediately();
      return;
    }
    touchDetailsModel = interactionTarget.interactionTargetKind === "displayed_model" ? displayedModelMarkers[interactionTarget.modelIndex] : interactionTarget.prunedLineageAncestorNode;
    tooltip.classList.add("is-touch-details");
    tooltip.setAttribute("role", "dialog");
    tooltip.setAttribute("aria-label", "模型详情");
    applyHoveredInteractionTarget(interactionTarget, pointerEvent, false);
    refreshVisibleModelDetails();
    positionTooltip(pointerEvent);
  }

  function visiblePointerInteractionSprites() {
    return [
      ...pointerInteractiveModelMarkerSprites,
      ...clickablePrunedLineageAncestorSprites,
    ].filter((sprite) => sprite.visible);
  }

  function interactionTargetAtCanvasClientCoordinates(clientX, clientY) {
    const canvasBounds = webglRenderer.domElement.getBoundingClientRect();
    normalizedPointerCoordinates.x =
      ((clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
    normalizedPointerCoordinates.y =
      -((clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;
    raycaster.setFromCamera(normalizedPointerCoordinates, perspectiveCamera);
    const intersections = raycaster.intersectObjects(
      visiblePointerInteractionSprites(),
      false,
    );
    // 前景目标关闭深度测试后，拾取也必须服从其可见绘制层次。
    const foregroundIntersections = intersections.filter((intersection) => !intersection.object.material.depthTest);
    foregroundIntersections.sort((first, second) => second.object.renderOrder - first.object.renderOrder || first.distance - second.distance);
    return (foregroundIntersections[0] || intersections[0])?.object.userData || null;
  }

  function interactionTargetAtPointerEvent(pointerEvent) {
    return interactionTargetAtCanvasClientCoordinates(
      pointerEvent.clientX,
      pointerEvent.clientY,
    );
  }

  // EXPERIMENT_NODE: hover 前身迁移宽限设为 400ms，待密集谱系实测后比较 300/500ms。
  const HOVER_RELATIONSHIP_DEPARTURE_GRACE_PERIOD_MILLISECONDS = 400;
  const POINTER_DRAG_CLICK_SUPPRESSION_DISTANCE_SQUARED = 25;
  let activePrimaryPointerPress = null;
  let completedPrimaryPointerPress = null;
  let suppressNextCanvasClickAfterPointerDrag = false;
  let latestPointerCoordinates = null;
  let pendingPointerMoveFrame = null;
  let hoverDepartureTimeout = null;
  let orbitInteractionActive = false;

  function cancelHoverDepartureGracePeriod() {
    if (hoverDepartureTimeout !== null) window.clearTimeout(hoverDepartureTimeout);
    hoverDepartureTimeout = null;
  }
  function clearHoverInteractionImmediately() {
    touchDetailsModel = null;
    touchDetailsActions.remove();
    tooltip.classList.remove("is-touch-details");
    tooltip.removeAttribute("role");
    tooltip.removeAttribute("aria-label");
    cancelHoverDepartureGracePeriod();
    if (pendingPointerMoveFrame !== null) window.cancelAnimationFrame(pendingPointerMoveFrame);
    pendingPointerMoveFrame = null;
    setHoveredModelIndex(null);
  }
  function applyHoveredInteractionTarget(interactionTarget, pointerEvent, allowDepartureGrace = true) {
    if (!interactionTarget) {
      if (allowDepartureGrace && (hoveredModelIndex !== null || hoveredPrunedLineageAncestorName !== null)) {
        if (hoverDepartureTimeout === null) hoverDepartureTimeout = window.setTimeout(() => {
          hoverDepartureTimeout = null;
          setHoveredModelIndex(null);
        }, HOVER_RELATIONSHIP_DEPARTURE_GRACE_PERIOD_MILLISECONDS);
        return;
      }
      clearHoverInteractionImmediately();
      return;
    }
    cancelHoverDepartureGracePeriod();
    if (interactionTarget.interactionTargetKind === "displayed_model") {
      setHoveredModelIndex(interactionTarget.modelIndex, pointerEvent);
    } else {
      setHoveredPrunedLineageAncestor(interactionTarget.lineageKey, interactionTarget.prunedLineageAncestorNode, pointerEvent);
    }
  }
  function reconcileHoverAtLatestPointerCoordinates(allowDepartureGrace = false) {
    if (touchDetailsModel || orbitInteractionActive || !latestPointerCoordinates || webglRenderer.getContext().isContextLost()) return;
    const { clientX, clientY } = latestPointerCoordinates;
    const bounds = webglRenderer.domElement.getBoundingClientRect();
    if (clientX < bounds.left || clientX > bounds.right || clientY < bounds.top || clientY > bounds.bottom) return;
    applyHoveredInteractionTarget(interactionTargetAtCanvasClientCoordinates(clientX, clientY), latestPointerCoordinates, allowDepartureGrace);
  }
  orbitControls.addEventListener("start", () => {
    orbitInteractionActive = true;
    // OrbitControls 在原地按下时也触发 start；此时保留用户看到的前景目标。
    if (!activePrimaryPointerPress) clearHoverInteractionImmediately();
  });
  orbitControls.addEventListener("end", () => {
    orbitInteractionActive = false;
    if (pendingPointerMoveFrame !== null) window.cancelAnimationFrame(pendingPointerMoveFrame);
    pendingPointerMoveFrame = window.requestAnimationFrame(() => {
      pendingPointerMoveFrame = null;
      reconcileHoverAtLatestPointerCoordinates();
    });
  });
  orbitControls.addEventListener("change", () => {
    clearHoverInteractionImmediately();
    if (!orbitInteractionActive) {
      pendingPointerMoveFrame = window.requestAnimationFrame(() => {
        pendingPointerMoveFrame = null;
        reconcileHoverAtLatestPointerCoordinates();
      });
    }
  });
  webglRenderer.domElement.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    latestPrimaryPointerType = event.pointerType;
    const target = interactionTargetAtPointerEvent(event);
    activePrimaryPointerPress = {
      pointerId: event.pointerId, pointerType: event.pointerType, clientX: event.clientX, clientY: event.clientY,
      interactionTargetForDetails: target,
      displayedModelForClickPinToggle: target?.interactionTargetKind === "displayed_model" ? displayedModelMarkers[target.modelIndex] : null,
    };
    completedPrimaryPointerPress = null;
    latestPointerCoordinates = { clientX: event.clientX, clientY: event.clientY };
    suppressNextCanvasClickAfterPointerDrag = false;
  }, { capture: true });
  webglRenderer.domElement.addEventListener("pointermove", (event) => {
    if (activePrimaryPointerPress?.pointerId === event.pointerId &&
      (event.clientX - activePrimaryPointerPress.clientX) ** 2 + (event.clientY - activePrimaryPointerPress.clientY) ** 2 >= POINTER_DRAG_CLICK_SUPPRESSION_DISTANCE_SQUARED) {
      suppressNextCanvasClickAfterPointerDrag = true;
      clearHoverInteractionImmediately();
    }
    if (event.pointerType === "touch") return;
    latestPointerCoordinates = { clientX: event.clientX, clientY: event.clientY };
    if (orbitInteractionActive || pendingPointerMoveFrame !== null) return;
    pendingPointerMoveFrame = window.requestAnimationFrame(() => {
      pendingPointerMoveFrame = null;
      reconcileHoverAtLatestPointerCoordinates(true);
    });
  });
  function completeActivePrimaryPointerPress(event) {
    if (activePrimaryPointerPress?.pointerId !== event.pointerId) return;
    completedPrimaryPointerPress = activePrimaryPointerPress;
    activePrimaryPointerPress = null;
    if (event.pointerType === "touch" && !suppressNextCanvasClickAfterPointerDrag) {
      latestPointerCoordinates = null;
      openTouchDetails(completedPrimaryPointerPress.interactionTargetForDetails, event);
    }
  }
  webglRenderer.domElement.addEventListener("pointerup", completeActivePrimaryPointerPress);
  webglRenderer.domElement.addEventListener("pointercancel", (event) => {
    if (activePrimaryPointerPress?.pointerId === event.pointerId) activePrimaryPointerPress = null;
    completedPrimaryPointerPress = null;
    latestPointerCoordinates = null; clearHoverInteractionImmediately();
  });
  webglRenderer.domElement.addEventListener("pointerleave", (event) => {
    if (touchDetailsModel) return;
    latestPointerCoordinates = null;
    clearHoverInteractionImmediately();
  });
  webglRenderer.domElement.addEventListener("click", (event) => {
    const completedPointerPress = completedPrimaryPointerPress;
    completedPrimaryPointerPress = null;
    if (latestPrimaryPointerType === "touch" || completedPointerPress?.pointerType === "touch" || event.pointerType === "touch") return;
    if (suppressNextCanvasClickAfterPointerDrag) {
      suppressNextCanvasClickAfterPointerDrag = false; return;
    }
    // 按下时捕获目标，避免松开后的 hover 重算改变重叠模型的点击归属。
    const target = completedPointerPress ? null : interactionTargetAtPointerEvent(event);
    const clickedModel = completedPointerPress ? completedPointerPress.displayedModelForClickPinToggle
      : target?.interactionTargetKind === "displayed_model" ? displayedModelMarkers[target.modelIndex] : null;
    if (clickedModel) togglePinnedBaseModelName(clickedModel.base_model_name);
  });

  function applyPinnedModelVisualEncoding() {
    modelVisualObjectsByModelIndex.forEach((visualObjects, modelIndex) => {
      const model = displayedModelMarkers[modelIndex];
      visualObjects.pinnedRingSprite.visible =
        modelMarkerIsCurrentlyVisible(modelIndex) &&
        modelIsPinned(model);
    });
    redrawHoveredAndPinnedRelationships();
    renderPinnedModelsPanel();
    renderPinnedModelNameLabels();
    synchronizeTouchDetailsActions();
    requestThreeDimensionalSceneRender();
    notifyExplorationViewChanged();
  }

  function togglePinnedBaseModelName(baseModelName) {
    return setBaseModelPinned(baseModelName, !allKnownBaseModelIdentitiesArePinned(baseModelName));
  }

  function setSingleModelPinned(model, pinned = true) {
    if (pinned) pinnedModelIdentities.add(stableModelIdentity(model));
    else pinnedModelIdentities.delete(stableModelIdentity(model));
    synchronizePinnedBaseModelNameAliases();
    applyPinnedModelVisualEncoding();
    renderSearchResults();
  }

  function contractStandoutMetricValue(model) {
    const fieldName = FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME[selectedFrontierStandoutMetricName]?.modelMetricFieldName;
    const value = model?.standout_metrics?.[fieldName];
    return typeof value === "number" && Number.isFinite(value) ? value : NaN;
  }

  function displayedStandoutValueForModel(model) {
    if (!model || !modelIsAnalysisEligibleForActiveMetricVariant(model)) return NaN;
    if (Object.prototype.hasOwnProperty.call(latestStandoutValuesByModelName, model.name)) {
      return latestStandoutValuesByModelName[model.name];
    }
    return contractStandoutMetricValue(model);
  }

  function standoutDisplayText(value) {
    if (selectedFrontierStandoutMetricName === FRONTIER_STANDOUT_METRIC_NAMES.WEIGHTED_EXCLUSIVE_HYPERVOLUME) {
      return Number.isFinite(value) && completeFrontierHypervolume > 0 ? `${formatSignificantNumber(value / completeFrontierHypervolume * 100)}%` : "未记录";
    }
    return formatSignificantNumber(value);
  }

  function frontierModels() {
    return displayedModelMarkers.filter((model) => model.panel?.layer === 1 && [model.x, model.y, model.z].every(isFiniteContractNumber));
  }

  function applyStandoutVisualEncoding() {
    const models = frontierModels();
    const hypervolumeSummary = selectedFrontierStandoutMetricName === FRONTIER_STANDOUT_METRIC_NAMES.WEIGHTED_EXCLUSIVE_HYPERVOLUME
      ? calculateWeightedExclusiveHypervolumeSummary(models, standoutAxisWeights) : null;
    completeFrontierHypervolume = hypervolumeSummary?.completeFrontierHypervolume ?? null;
    const values = hypervolumeSummary?.contributions || calculateFrontierStandoutMetricValues(
      models,
      selectedFrontierStandoutMetricName,
      standoutAxisWeights,
    );
    const finiteValues = values.filter(Number.isFinite);
    latestStandoutValuesByModelName = {};
    models.forEach((model, frontierModelIndex) => {
      const value = values[frontierModelIndex];
      latestStandoutValuesByModelName[model.name] = value;
      const objects = modelVisualObjectsByModelIndex[modelIndexByModelName[model.name]];
      if (!objects) return;
      const finite = Number.isFinite(value);
      const percentile = finite && finiteValues.length > 1
        ? (finiteValues.filter((candidate) => candidate < value).length + (finiteValues.filter((candidate) => candidate === value).length - 1) / 2) / (finiteValues.length - 1)
        : 0.5;
      const halo = objects.standoutHaloSprite;
      const material = finite ? standoutHaloMaterial : missingStandoutHaloMaterial;
      halo.userData.foregroundMaterial?.dispose();
      halo.userData.foregroundMaterial = null;
      halo.userData.normalMaterial = material;
      halo.userData.normalRenderOrder = 15;
      halo.material = material;
      const sizes = MODEL_MARKER_CSS_PIXEL_SIZES_AT_ONE_MULTIPLIER;
      setSpriteCssPixelSize(halo, finite ? sizes.standoutHaloMinimum + percentile * (sizes.standoutHaloMaximum - sizes.standoutHaloMinimum) : sizes.missingStandoutHalo);
    });
    latestStandoutRanksByModelName = {};
    models.map((model, index) => ({ model, value: values[index] })).filter(row => Number.isFinite(row.value))
      .sort((left, right) => right.value - left.value).forEach((row, index) => { latestStandoutRanksByModelName[row.model.name] = index + 1; });
    refreshVisibleModelDetails();
    applyRelationshipForegroundVisualEncoding();
    renderStandoutRanking(models, values);
    renderPinnedComparisonTable();
    requestThreeDimensionalSceneRender();
    notifyExplorationViewChanged();
  }

  function renderStandoutRanking(models, values) {
    if (!standoutRankingList) return;
    const rankedRows = models
      .map((model, index) => ({ model, value: values[index] }))
      .sort((left, right) => {
        const leftValue = Number.isFinite(left.value) ? left.value : -Infinity;
        const rightValue = Number.isFinite(right.value) ? right.value : -Infinity;
        return rightValue - leftValue;
      })
      .slice(0, 12);
    standoutRankingList.replaceChildren(
      ...rankedRows.map((row, index) => {
        const rankingRow = document.createElement("button");
        rankingRow.type = "button";
        rankingRow.className = "aa-ranking-row";
        rankingRow.addEventListener("click", () => setSingleModelPinned(row.model));
        rankingRow.setAttribute("aria-label", `固定 ${row.model.name}`);
        const modelIndex = modelIndexByModelName[row.model.name];
        if (!modelMarkerIsCurrentlyVisible(modelIndex)) {
          rankingRow.classList.add("is-hidden-by-current-filter");
          rankingRow.title = "已被当前筛选隐藏，名次仍按全集计算";
        }
        const modelName = document.createElement("span");
        modelName.className = "aa-truncate";
        modelName.textContent = `${index + 1}. ${row.model.name}`;
        const value = document.createElement("b");
        value.className = "aa-ranking-value";
        value.textContent = standoutDisplayText(row.value);
        value.title = completeFrontierHypervolume === null ? `原始值：${row.value}` : `排他贡献 ${row.value} ÷ 完整前沿超体积 ${completeFrontierHypervolume}`;
        rankingRow.append(modelName, value);
        return rankingRow;
      }),
    );
  }

  function selectFrontierStandoutMetric(frontierStandoutMetricName) {
    if (
      !FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME[frontierStandoutMetricName]
    ) {
      return Promise.resolve(false);
    }
    selectedFrontierStandoutMetricName = frontierStandoutMetricName;
    if (standoutMetricSelect) {
      standoutMetricSelect.value = frontierStandoutMetricName;
    }
    renderStandoutWeightControlsVisibility();
    applyStandoutVisualEncoding();
    return Promise.resolve(true);
  }

  function setStandoutAxisWeights(intelligenceWeight, costWeight, speedWeight) {
    standoutAxisWeights = {
      intelligence: committedStandoutAxisWeight(intelligenceWeight, standoutAxisWeights.intelligence),
      cost: committedStandoutAxisWeight(costWeight, standoutAxisWeights.cost),
      speed: committedStandoutAxisWeight(speedWeight, standoutAxisWeights.speed),
    };
    if (standoutWeightControls) {
      Object.entries(standoutAxisWeights).forEach(([axisName, weight]) => {
        const controls = standoutWeightControls[axisName];
        controls.slider.value = String(Math.log2(weight));
        controls.number.value = weight.toFixed(2);
      });
    }
    applyStandoutVisualEncoding();
  }

  function loadActiveMetricVariant(nextMetricVariantKey, preserveCamera) {
    const nextMetricVariant = metricVariantsByKey[nextMetricVariantKey];
    if (!nextMetricVariant) return false;
    latestPointerCoordinates = null;
    clearHoverInteractionImmediately();
    const preservedCameraPosition = perspectiveCamera.position.clone();
    const preservedCameraQuaternion = perspectiveCamera.quaternion.clone();
    const preservedOrbitTarget = orbitControls.target.clone();

    activeMetricVariantKey = nextMetricVariantKey;
    activeMetricVariant = nextMetricVariant;
    activeThreeDimensionalScene = activeMetricVariant.three_dimensional_scene;
    activeInteractionRelationships = activeMetricVariant.interaction_relationships;
    // 契约数值问题按「当前口径」统计：每次载入口径都从零开始。
    nonFiniteContractCoordinateCount = 0;
    outOfRangeContractTriangleVertexIndexCount = 0;
    skippedInvalidContractGeometryNames = [];
    displayedModelMarkers = activeThreeDimensionalScene.displayed_model_markers || [];
    baseGroupsByBaseModelName = activeInteractionRelationships.base_groups || {};
    reasoningVariantGroupsByBaseModelName =
      activeInteractionRelationships.reasoning_variant_group_model_indices_by_base_model_name || {};
    lineagesByOrganizationAndTier = lineagesWithFiniteContractCoordinates(
      activeInteractionRelationships.lineages || {},
    );
    modelIndexByModelName = {};
    displayedModelMarkers.forEach((model, modelIndex) => {
      modelIndexByModelName[model.name] = modelIndex;
    });
    window.FRONTIER_3D_INTERACTION_RELATIONSHIPS = {
      models: displayedModelMarkers,
      base_groups: baseGroupsByBaseModelName,
      reasoning_variant_group_model_indices_by_base_model_name:
        reasoningVariantGroupsByBaseModelName,
      lineages: lineagesByOrganizationAndTier,
      cost_axis_field: activeInteractionRelationships.cost_axis_field,
      speed_axis_field: activeInteractionRelationships.speed_axis_field,
    };

    displayedModelMarkers.forEach((model) => allModelRecordsByIdentity.set(stableModelIdentity(model), model));
    synchronizePinnedBaseModelNameAliases();
    buildAxesAndGrid();
    buildFrontierGeometry();
    buildModelMarkers();
    applySystemColorSchemeToScene();
    setHoveredModelIndex(null);
    if (preserveCamera) {
      perspectiveCamera.position.copy(preservedCameraPosition);
      perspectiveCamera.quaternion.copy(preservedCameraQuaternion);
      orbitControls.target.copy(preservedOrbitTarget);
      orbitControls.update();
    } else {
      applyInitialCameraConfiguration();
    }
    renderCurrentView();
    renderReportHeaderModelCountSummary();
    renderHowToReadDrawer();
    renderOrganizationFilterPanel();
    renderPinnedModelsPanel();
    renderSearchResults();
    applyStandoutVisualEncoding();
    requestThreeDimensionalSceneRender();
    return true;
  }

  // 谱系节点坐标非有限时丢弃该节点并计数；丢弃后不足两代的谱系不再连线。
  function lineagesWithFiniteContractCoordinates(rawLineagesByKey) {
    const lineagesByKeyWithFiniteNodes = {};
    Object.entries(rawLineagesByKey).forEach(([lineageKey, lineageNodes]) => {
      const finiteLineageNodes = (Array.isArray(lineageNodes) ? lineageNodes : []).filter(
        (lineageNode) => {
          // 旧 v2 未声明家族与档位的推断线不继续作为血缘事实展示。
          if (!lineageNode?.lineage_family_key || !lineageNode?.reasoning_level_label) return false;
          const nonFiniteNodeCoordinateCount = [lineageNode?.x, lineageNode?.y, lineageNode?.z]
            .filter((coordinate) => !isFiniteContractNumber(coordinate)).length;
          nonFiniteContractCoordinateCount += nonFiniteNodeCoordinateCount;
          return nonFiniteNodeCoordinateCount === 0;
        },
      );
      if (finiteLineageNodes.length >= 2) {
        lineagesByKeyWithFiniteNodes[lineageKey] = finiteLineageNodes;
      }
    });
    return lineagesByKeyWithFiniteNodes;
  }

  function activateMetricCombination(costMetricName, speedMetricName) {
    const metricVariantKey = `${costMetricName}__${speedMetricName}`;
    if (metricVariantKey === activeMetricVariantKey) return Promise.resolve(false);
    const loaded = loadActiveMetricVariant(metricVariantKey, true);
    if (loaded) {
      costMetricSelect.value = costMetricName;
      speedMetricSelect.value = speedMetricName;
      notifyExplorationViewChanged();
    }
    return Promise.resolve(loaded);
  }

  function createToolbarGroup(labelText) {
    const group = document.createElement("div");
    group.className = "aa-toolbar-group";
    const label = document.createElement("span");
    label.className = "aa-toolbar-group-label";
    label.textContent = labelText;
    group.appendChild(label);
    return group;
  }

  function createToolbarSelectField(labelText, selectControl) {
    const field = document.createElement("label");
    field.className = "aa-toolbar-field";
    const label = document.createElement("span");
    label.className = "aa-toolbar-field-label";
    label.textContent = labelText;
    field.append(label, selectControl);
    return field;
  }

  function buildMetricControls() {
    const group = createToolbarGroup("坐标轴口径");
    group.id = "aa-metric-controls";
    costMetricSelect = document.createElement("select");
    costMetricSelect.id = "aa-cost-metric-select";
    Object.entries(visualizationDataset.cost_metric_definitions).forEach(
      ([metricName, definition]) => {
        const option = document.createElement("option");
        option.value = metricName;
        option.textContent = definition.label;
        costMetricSelect.appendChild(option);
      },
    );
    speedMetricSelect = document.createElement("select");
    speedMetricSelect.id = "aa-speed-metric-select";
    Object.entries(visualizationDataset.speed_metric_definitions).forEach(
      ([metricName, definition]) => {
        const option = document.createElement("option");
        option.value = metricName;
        option.textContent = definition.label;
        speedMetricSelect.appendChild(option);
      },
    );
    const [costMetricName, speedMetricName] = activeMetricVariantKey.split("__");
    costMetricSelect.value = costMetricName;
    speedMetricSelect.value = speedMetricName;
    costMetricSelect.addEventListener("change", () =>
      activateMetricCombination(costMetricSelect.value, speedMetricSelect.value),
    );
    speedMetricSelect.addEventListener("change", () =>
      activateMetricCombination(costMetricSelect.value, speedMetricSelect.value),
    );
    group.append(
      createToolbarSelectField("成本", costMetricSelect),
      createToolbarSelectField("速度", speedMetricSelect),
    );
    const explanation = textElement("button", "aa-secondary-button", "口径说明");
    explanation.id = "aa-metric-explanation-button";
    explanation.type = "button";
    explanation.addEventListener("click", () => setHowToReadDrawerOpen(true));
    const preset = textElement("button", "aa-secondary-button", "正交分解视角");
    preset.id = "aa-orthogonal-decomposition-preset";
    preset.type = "button";
    preset.title = "切换至 7:2:1 混合单价 × 原始速度，保持相机";
    preset.addEventListener("click", () => activateMetricCombination("blended", "raw"));
    group.append(explanation, preset);
    return group;
  }

  function buildModelIdentityControls() {
    const group = createToolbarGroup("模型标识");
    group.id = "aa-model-identity-controls";
    const logoStatus = document.createElement("span");
    logoStatus.className = "aa-model-identity-logo-status";
    logoStatus.textContent = "厂商 Logo";
    const toggleLabel = document.createElement("label");
    toggleLabel.className = "aa-toggle-row";
    countryRegionMarkerToggle = document.createElement("input");
    countryRegionMarkerToggle.id = "aa-country-region-marker-toggle";
    countryRegionMarkerToggle.type = "checkbox";
    countryRegionMarkerToggle.checked = countryRegionMarkerVisible;
    countryRegionMarkerToggle.addEventListener("change", () =>
      setCountryRegionMarkerVisible(countryRegionMarkerToggle.checked),
    );
    toggleLabel.append(
      countryRegionMarkerToggle,
      document.createTextNode("显示国别外框"),
    );
    const comparableOnlyToggleLabel = document.createElement("label");
    comparableOnlyToggleLabel.className = "aa-toggle-row";
    comparableOnlyToggleLabel.title =
      "隐藏本口径下用到非当期智能指数版本成本或冗长度的「历史口径」点（虚线底板）；隐藏后它们也不可悬停或点选";
    currentIntelligenceIndexVersionComparableOnlyToggle = document.createElement("input");
    currentIntelligenceIndexVersionComparableOnlyToggle.id =
      "aa-show-only-current-intelligence-index-version-comparable-models-toggle";
    currentIntelligenceIndexVersionComparableOnlyToggle.type = "checkbox";
    currentIntelligenceIndexVersionComparableOnlyToggle.checked =
      showOnlyCurrentIntelligenceIndexVersionComparableModels;
    currentIntelligenceIndexVersionComparableOnlyToggle.addEventListener("change", () =>
      setShowOnlyCurrentIntelligenceIndexVersionComparableModels(
        currentIntelligenceIndexVersionComparableOnlyToggle.checked,
      ),
    );
    comparableOnlyToggleLabel.append(
      currentIntelligenceIndexVersionComparableOnlyToggle,
      document.createTextNode("仅当期可比"),
    );
    const graceToggleLabel = document.createElement("label");
    graceToggleLabel.className = "aa-toggle-row";
    graceToggleLabel.title = "仅控制只因近期发布宽限才保留的点；不重算分析、坐标范围或相机";
    recentReleaseGracePeriodModelVisibilityToggle = document.createElement("input");
    recentReleaseGracePeriodModelVisibilityToggle.id =
      "aa-show-models-displayed-only-because-of-recent-release-grace-period-toggle";
    recentReleaseGracePeriodModelVisibilityToggle.type = "checkbox";
    recentReleaseGracePeriodModelVisibilityToggle.checked =
      showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod;
    recentReleaseGracePeriodModelVisibilityToggle.disabled =
      !(recentReleaseFrontierDistanceGracePeriodMonths > 0);
    recentReleaseGracePeriodModelVisibilityToggle.addEventListener("change", () =>
      setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod(
        recentReleaseGracePeriodModelVisibilityToggle.checked,
      ),
    );
    const graceToggleText = recentReleaseFrontierDistanceGracePeriodMonths === null
      ? "近期发布宽限：旧契约未记录"
      : recentReleaseFrontierDistanceGracePeriodMonths === 0
        ? "近期发布宽限：生成时已关闭"
        : `显示近 ${recentReleaseFrontierDistanceGracePeriodMonths} 个月发布的远离前沿模型`;
    graceToggleLabel.append(recentReleaseGracePeriodModelVisibilityToggle, document.createTextNode(graceToggleText));
    group.append(logoStatus, toggleLabel, comparableOnlyToggleLabel, graceToggleLabel);
    const sizeLabel = textElement("label", "aa-marker-size-control", "标记尺寸 ");
    markerSizeSlider = document.createElement("input");
    markerSizeSlider.id = "aa-marker-size-slider";
    markerSizeSlider.type = "range";
    markerSizeSlider.min = "0.5"; markerSizeSlider.max = "1.5"; markerSizeSlider.step = "0.05";
    markerSizeSlider.value = String(markerSizeMultiplier);
    markerSizeSlider.setAttribute("aria-label", "标记尺寸倍数，1 倍对应 Logo 22 像素");
    markerSizeOutput = textElement("output", "", `${formatSignificantNumber(markerSizeMultiplier)}×`);
    markerSizeOutput.htmlFor = markerSizeSlider.id;
    markerSizeSlider.addEventListener("input", () => setMarkerSizeMultiplier(Number(markerSizeSlider.value)));
    sizeLabel.append(markerSizeSlider, markerSizeOutput);
    group.append(sizeLabel);
    return group;
  }

  function updateFrontierGeometryExplanationDisclosureLabel() {
    const geometryLabel = achievableFrontierSurfaceVisible ? "精确可达面" : "非帕累托面";
    const disclosureAction = frontierGeometryExplanation.hidden ? "展开" : "收起";
    frontierGeometryExplanationDisclosureButton.textContent = geometryLabel;
    frontierGeometryExplanationDisclosureButton.setAttribute("aria-label", `${disclosureAction}几何说明：${geometryLabel}`);
    frontierGeometryExplanationDisclosureButton.title = `${disclosureAction}几何说明；展开后一分钟自动收起`;
  }

  function setFrontierGeometryExplanationExpanded(nextExpanded) {
    window.clearTimeout(frontierGeometryExplanationAutoCollapseTimeoutId);
    frontierGeometryExplanation.hidden = !nextExpanded;
    frontierGeometryExplanationDisclosureButton.setAttribute("aria-expanded", String(nextExpanded));
    updateFrontierGeometryExplanationDisclosureLabel();
    if (nextExpanded) {
      // 仅在展开时重新计时；切换几何或口径不改变用户的说明展开状态。
      frontierGeometryExplanationAutoCollapseTimeoutId = window.setTimeout(
        () => setFrontierGeometryExplanationExpanded(false),
        60_000,
      );
    }
  }

  function buildFrontierControls() {
    const group = createToolbarGroup("前沿描绘");
    group.classList.add("aa-frontier-geometry-controls");
    const segmentedControl = document.createElement("div");
    segmentedControl.className = "aa-segmented-control";
    frontierStyleButtons = [
      ["wireframe", "参照线框"],
      ["solid", "参照实心"],
      ["hidden", "隐藏参照"],
    ].map(([styleName, label]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.dataset.frontierStyle = styleName;
      button.setAttribute("aria-pressed", styleName === frontierStyle ? "true" : "false");
      button.addEventListener("click", () => setFrontierStyle(styleName));
      segmentedControl.appendChild(button);
      return button;
    });
    const achievableToggleLabel = document.createElement("label");
    achievableToggleLabel.className = "aa-toggle-row";
    achievableFrontierSurfaceToggle = document.createElement("input");
    achievableFrontierSurfaceToggle.id = "aa-achievable-surface-toggle";
    achievableFrontierSurfaceToggle.type = "checkbox";
    achievableFrontierSurfaceToggle.setAttribute("aria-describedby", "aa-frontier-geometry-explanation");
    achievableFrontierSurfaceToggle.addEventListener("change", () =>
      setAchievableFrontierSurfaceVisible(achievableFrontierSurfaceToggle.checked),
    );
    achievableToggleLabel.append(
      achievableFrontierSurfaceToggle,
      document.createTextNode("实际可达前沿（精确阶梯）"),
    );
    frontierGeometryExplanation = textElement("p", "aa-frontier-geometry-explanation");
    frontierGeometryExplanation.id = "aa-frontier-geometry-explanation";
    frontierGeometryExplanation.setAttribute("role", "status");
    frontierGeometryExplanationDisclosureButton = document.createElement("button");
    frontierGeometryExplanationDisclosureButton.id = "aa-frontier-geometry-explanation-toggle";
    frontierGeometryExplanationDisclosureButton.className = "aa-frontier-geometry-explanation-toggle";
    frontierGeometryExplanationDisclosureButton.type = "button";
    frontierGeometryExplanationDisclosureButton.setAttribute("aria-controls", frontierGeometryExplanation.id);
    frontierGeometryExplanationDisclosureButton.addEventListener("click", () =>
      setFrontierGeometryExplanationExpanded(frontierGeometryExplanation.hidden),
    );
    const achievableToggleAndExplanation = document.createElement("div");
    achievableToggleAndExplanation.className = "aa-frontier-geometry-toggle-and-explanation";
    achievableToggleAndExplanation.append(
      achievableToggleLabel,
      frontierGeometryExplanationDisclosureButton,
      frontierGeometryExplanation,
    );
    group.append(segmentedControl, achievableToggleAndExplanation);
    setFrontierGeometryExplanationExpanded(true);
    return group;
  }

  function buildStandoutMetricControl() {
    const group = createToolbarGroup("突出度口径");
    standoutMetricSelect = document.createElement("select");
    standoutMetricSelect.id = "aa-standout-metric-select";
    standoutMetricSelect.setAttribute("aria-label", "突出度指标");
    Object.entries(FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME).forEach(
      ([frontierStandoutMetricName, definition]) => {
        const option = document.createElement("option");
        option.value = frontierStandoutMetricName;
        option.textContent = definition.label;
        standoutMetricSelect.appendChild(option);
      },
    );
    standoutMetricSelect.value = selectedFrontierStandoutMetricName;
    standoutMetricSelect.addEventListener("change", () =>
      selectFrontierStandoutMetric(standoutMetricSelect.value),
    );
    group.appendChild(standoutMetricSelect);
    return group;
  }

  function createControlSection(id, titleText) {
    const section = document.createElement("section");
    section.className = "aa-control-section";
    section.id = id;
    if (titleText) {
      const title = document.createElement("h2");
      title.className = "aa-section-title";
      title.textContent = titleText;
      section.appendChild(title);
    }
    return section;
  }

  function buildSearchPanel() {
    const section = createControlSection("aa-search-panel", "搜索与固定");
    searchInput = document.createElement("input");
    searchInput.id = "aa-search-input";
    searchInput.className = "aa-search-input";
    searchInput.type = "search";
    searchInput.placeholder = "搜索模型、厂商或档位";
    searchInput.setAttribute("aria-label", "搜索模型、基模型、厂商或档位");
    searchInput.setAttribute("role", "combobox");
    searchInput.setAttribute("aria-expanded", "false");
    searchInput.setAttribute("aria-controls", "aa-search-results");
    searchInput.setAttribute("aria-autocomplete", "list");
    searchResults = textElement("div", "aa-search-results");
    searchResults.id = "aa-search-results";
    searchResults.setAttribute("role", "region");
    searchResults.setAttribute("aria-label", "模型搜索结果");
    searchInput.addEventListener("input", () => { searchActiveResultIndex = -1; renderSearchResults(); });
    searchInput.addEventListener("focus", renderSearchResults);
    section.addEventListener("keydown", (event) => {
      const actions = [...searchResults.querySelectorAll("button")];
      if (event.key === "Escape") {
        event.preventDefault(); searchInput.value = ""; renderSearchResults(); searchInput.focus();
      } else if (["ArrowDown", "ArrowUp"].includes(event.key) && actions.length) {
        event.preventDefault();
        searchActiveResultIndex = searchActiveResultIndex < 0 ? (event.key === "ArrowDown" ? 0 : actions.length - 1)
          : (searchActiveResultIndex + (event.key === "ArrowDown" ? 1 : actions.length - 1)) % actions.length;
        actions.forEach((button, index) => button.classList.toggle("is-keyboard-active", index === searchActiveResultIndex));
        searchInput.setAttribute("aria-activedescendant", actions[searchActiveResultIndex].id);
        actions[searchActiveResultIndex].scrollIntoView({ block: "nearest" });
      } else if (event.key === "Enter" && event.target === searchInput && actions.length) {
        event.preventDefault(); actions[Math.max(0, searchActiveResultIndex)]?.click();
      }
    });
    section.append(searchInput, searchResults);
    return section;
  }

  function currentSearchModelGroups(query) {
    const models = [
      ...displayedModelMarkers.map((model, displayedModelIndex) => ({ ...model, displayedModelIndex })),
      ...(activeMetricVariant?.excluded_models_with_drop_reason || []).map((model) => {
        const known = model.model_uuid ? allModelRecordsByIdentity.get(model.model_uuid) : [...allModelRecordsByIdentity.values()].find(record => record.name === model.name);
        return { ...known, ...model, base_model_name: model.base_model_name || known?.base_model_name || model.name };
      }),
    ];
    const knownIdentities = new Set(models.map(stableModelIdentity));
    for (const record of activeMetricVariant?.model_analysis_records || []) {
      if (!knownIdentities.has(stableModelIdentity(record))) models.push({...record,base_model_name:record.base_model_name || record.name});
    }
    return matchingModelGroups(models, query);
  }

  function matchingBaseModelNames(query) {
    return currentSearchModelGroups(query).groups.map(group => group.baseModelName);
  }

  function renderSearchResults() {
    if (!searchResults || !searchInput) return;
    const { groups, totalGroupCount } = currentSearchModelGroups(searchInput.value);
    const hasQuery = Boolean(searchInput.value.trim());
    const summary = textElement("div", "aa-search-result-summary", `找到 ${totalGroupCount} 组${totalGroupCount > 40 ? "，仅显示前 40 组" : ""}`);
    summary.setAttribute("role", "status");
    searchResults.replaceChildren(summary, ...groups.map(({ baseModelName, models }, groupIndex) => {
      const available = models.filter(model => model.displayedModelIndex !== undefined && !modelVisualObjectsByModelIndex[model.displayedModelIndex]?.hasNonFiniteContractCoordinate);
      const row = document.createElement(available.length ? "button" : "div");
      row.className = "aa-result-row";
      row.dataset.baseModelName = baseModelName;
      if (available.length) {
        row.type = "button";
        row.classList.add("aa-search-result-pin-button");
        row.id = `aa-search-result-action-${groupIndex}`;
        row.addEventListener("click", () => togglePinnedBaseModelName(baseModelName));
      }
      if (pinnedBaseModelNames.has(baseModelName)) row.classList.add("is-pinned");
      const name = textElement("span", "aa-search-result-name", baseModelName);
      const notes = models.slice().sort(compareModelReasoningLevels).map(model => {
        const label = model.reasoning_level_label || model.name;
        if (model.displayedModelIndex === undefined) return `${label}：未上图，${model.drop_reason || "缺少可显示坐标"}${model.missing_dimension_names?.length ? `（缺少 ${model.missing_dimension_names.join("、")}）` : ""}`;
        const reasons = modelMarkerHiddenReasonTexts(model.displayedModelIndex);
        if (reasons.length) row.classList.add("is-hidden-by-model-visibility-filter");
        if (reasons.includes("仅当期可比")) row.classList.add("is-hidden-by-comparable-only-toggle");
        return `${label}：${reasons.length ? `筛选隐藏（${reasons.join("、")}）` : "已上图"}${modelIsAnalysisEligibleForActiveMetricVariant(model) ? "" : `；${historicalIntelligenceIndexVersionReasonText(model)}`}`;
      });
      if (models.filter(model => model.displayedModelIndex !== undefined).every(model => !modelMarkerIsCurrentlyVisible(model.displayedModelIndex))) row.classList.add("is-hidden-by-current-filter");
      row.title = notes.join("；");
      name.append(textElement("span", "aa-search-result-hidden-note", notes.join("；")));
      row.append(name);
      if (available.length) row.append(textElement("span", "aa-search-result-action-label", allKnownBaseModelIdentitiesArePinned(baseModelName) ? "取消固定" : "固定"));
      return row;
    }));
    searchResults.hidden = !hasQuery;
    searchResults.style.display = hasQuery ? "block" : "none";
    searchInput.setAttribute("aria-expanded", String(hasQuery));
    searchInput.removeAttribute("aria-activedescendant");
  }

  function countryRegionLegendElement() {
    const legend = document.createElement("div");
    legend.id = "aa-country-region-legend";
    legend.className = "aa-country-region-legend";
    legend.hidden = !countryRegionMarkerVisible;
    [
      ["china", "中国", "双圆环"],
      ["united-states", "美国", "圆角方环"],
      ["other", "其他 / 未分类", "菱形环"],
    ].forEach(([className, label, shapeDescription]) => {
      const item = document.createElement("span");
      item.className = "aa-country-region-legend-item";
      item.dataset.countryRegionCategory = className === "united-states" ? "united_states" : className;
      item.dataset.visibleCountryRegionModelCount = "0";
      const swatch = document.createElement("span");
      swatch.className = `aa-country-region-swatch is-${className}`;
      swatch.setAttribute("aria-hidden", "true");
      item.append(swatch, document.createTextNode(`${label}（${shapeDescription}）`));
      item.append(textElement("span", "aa-country-region-visible-model-count", " · 0"));
      legend.appendChild(item);
    });
    return legend;
  }

  function buildOrganizationFilterPanel() {
    organizationFilterPanel = document.createElement("details");
    organizationFilterPanel.id = "aa-organization-filter-panel";
    organizationFilterPanel.className = "aa-control-section aa-collapsible-section";
    organizationFilterPanel.open = false;
    return organizationFilterPanel;
  }

  function renderOrganizationFilterPanel() {
    if (!organizationFilterPanel) return;
    const currentOpenState = organizationFilterPanel.open;
    const organizationModelCounts = {};
    displayedModelMarkers.forEach((model) => {
      organizationModelCounts[model.creator] =
        (organizationModelCounts[model.creator] || 0) + 1;
    });
    const summary = document.createElement("summary");
    summary.className = "aa-section-title aa-collapsible-summary";
    summary.id = "aa-organization-filter-count-summary";
    summary.textContent = `厂商筛选（${Object.keys(organizationModelCounts).length}）`;
    const rows = Object.keys(organizationModelCounts)
      .sort((left, right) => left.localeCompare(right))
      .map((creatorName) => {
        const identity = organizationIdentityMetadataByCreatorName[creatorName];
        const row = document.createElement("label");
        row.className = "aa-organization-filter-row";
        row.dataset.creatorName = creatorName;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = !hiddenOrganizationCreatorNames.has(creatorName);
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) hiddenOrganizationCreatorNames.delete(creatorName);
          else hiddenOrganizationCreatorNames.add(creatorName);
          applyModelMarkerVisibilityAndRefreshDependentViews();
        });
        const logo = document.createElement("img");
        logo.className = "aa-organization-logo-preview";
        logo.src = identity.logo_visualization_data_url;
        logo.alt = "";
        const name = document.createElement("span");
        name.className = "aa-truncate";
        name.textContent = creatorName;
        const count = document.createElement("span");
        count.className = "aa-muted";
        count.dataset.visibleOrganizationModelCount = "0";
        count.textContent = String(organizationModelCounts[creatorName]);
        row.append(checkbox, logo, name, count);
        return row;
      });
    const rowContainer = document.createElement("div");
    rowContainer.className = "aa-organization-filter-rows";
    rowContainer.append(...rows);
    organizationFilterPanel.replaceChildren(
      summary,
      countryRegionLegendElement(),
      rowContainer,
    );
    organizationFilterPanel.open = currentOpenState;
    refreshOrganizationAndCountryRegionVisibleModelCounts();
  }

  function refreshOrganizationAndCountryRegionVisibleModelCounts() {
    if (!organizationFilterPanel) return;
    const totalsByCreator = {};
    const visibleByCreator = {};
    const visibleByCountry = {};
    displayedModelMarkers.forEach((model, modelIndex) => {
      totalsByCreator[model.creator] = (totalsByCreator[model.creator] || 0) + 1;
      if (!modelMarkerIsCurrentlyVisible(modelIndex)) return;
      visibleByCreator[model.creator] = (visibleByCreator[model.creator] || 0) + 1;
      const country = ["china", "united_states"].includes(model.country_region_category)
        ? model.country_region_category : "other";
      visibleByCountry[country] = (visibleByCountry[country] || 0) + 1;
    });
    organizationFilterPanel.querySelectorAll(".aa-organization-filter-row").forEach((row) => {
      const visibleCount = visibleByCreator[row.dataset.creatorName] || 0;
      const totalCount = totalsByCreator[row.dataset.creatorName] || 0;
      const count = row.querySelector("[data-visible-organization-model-count]");
      count.dataset.visibleOrganizationModelCount = String(visibleCount);
      count.textContent = visibleCount === totalCount ? String(totalCount) : `${visibleCount}/${totalCount}`;
    });
    organizationFilterPanel.querySelectorAll("[data-country-region-category]").forEach((item) => {
      const visibleCount = visibleByCountry[item.dataset.countryRegionCategory] || 0;
      item.dataset.visibleCountryRegionModelCount = String(visibleCount);
      item.querySelector(".aa-country-region-visible-model-count").textContent = ` · ${visibleCount}`;
    });
    const summary = organizationFilterPanel.querySelector("#aa-organization-filter-count-summary");
    if (summary) summary.textContent = `厂商筛选（${Object.keys(visibleByCreator).length}/${Object.keys(totalsByCreator).length}）`;
  }

  function buildPinnedModelsPanel() {
    pinnedModelsPanel = createControlSection("aa-pinned-panel", "已固定");
    return pinnedModelsPanel;
  }

  function pinnedModelsInDisplayOrder() {
    return [...pinnedBaseModelNames].flatMap(baseName => [...pinnedModelIdentities]
      .map(identity => allModelRecordsByIdentity.get(identity)).filter(model => model?.base_model_name === baseName).sort(compareModelReasoningLevels));
  }

  function activeModelForIdentity(model) {
    return displayedModelMarkers.find(candidate => stableModelIdentity(candidate) === stableModelIdentity(model));
  }

  function pinnedModelStatusText(model) {
    const currentIndex = displayedModelMarkers.findIndex(candidate => stableModelIdentity(candidate) === stableModelIdentity(model));
    if (currentIndex < 0) {
      const excluded = (activeMetricVariant.excluded_models_with_drop_reason || []).find(candidate => candidate.model_uuid ? candidate.model_uuid === model.model_uuid : candidate.name === model.name);
      return `当前口径未上图：${excluded?.drop_reason || "缺少可显示坐标或已被剪枝"}`;
    }
    return [...modelMarkerHiddenReasonTexts(currentIndex), ...(!modelIsAnalysisEligibleForActiveMetricVariant(displayedModelMarkers[currentIndex]) ? [historicalIntelligenceIndexVersionReasonText(displayedModelMarkers[currentIndex])] : [])].join("；") || "当期可比";
  }

  function renderPinnedModelsPanel() {
    if (!pinnedModelsPanel) return;
    const pinnedNames = [...pinnedBaseModelNames];
    pinnedModelsPanel.style.display = pinnedNames.length ? "block" : "none";
    const header = textElement("div", "aa-pinned-header");
    const title = textElement("h2", "aa-section-title", `已固定（${pinnedModelIdentities.size} 档位）`);
    const clear = textElement("button", "aa-link-button", "清空全部");
    clear.id = "aa-clear-all-pinned-models"; clear.type = "button";
    clear.addEventListener("click", () => { pinnedModelIdentities.clear(); synchronizePinnedBaseModelNameAliases(); applyPinnedModelVisualEncoding(); renderSearchResults(); });
    header.append(title, clear);
    const list = textElement("div", "aa-pinned-list");
    pinnedNames.forEach(baseModelName => {
      const card = textElement("article", "aa-pinned-card");
      const cardHeader = textElement("div", "aa-pinned-card-header");
      const removeButton = textElement("button", "aa-link-button", "移除");
      removeButton.type = "button"; removeButton.setAttribute("aria-label", `移除 ${baseModelName} 的全部固定档位`);
      removeButton.addEventListener("click", () => setBaseModelPinned(baseModelName, false));
      cardHeader.append(textElement("b", "aa-truncate", baseModelName), removeButton); card.append(cardHeader);
      for (const model of pinnedModelsInDisplayOrder().filter(model => model.base_model_name === baseModelName)) {
        const current = activeModelForIdentity(model);
        const variant = textElement("div", "aa-pinned-variant-card", `${model.name} · 智能 ${formatSignificantNumber(current?.panel.intelligence ?? model.panel.intelligence)} · ${model.reasoning_level_label || "档位未记录"}`);
        variant.dataset.modelIdentity = stableModelIdentity(model);
        const status = pinnedModelStatusText(model);
        variant.append(textElement("div", "aa-pinned-model-status", status));
        if (!current) variant.classList.add("is-hidden-by-current-filter");
        if (current && !modelIsAnalysisEligibleForActiveMetricVariant(current)) variant.classList.add("is-historical-intelligence-index-version");
        if (!model.model_uuid) variant.append(textElement("div", "aa-muted", "旧契约缺少 UUID，重新生成后可按稳定身份固定"));
        card.append(variant);
      }
      list.append(card);
    });
    pinnedModelsPanel.replaceChildren(header, list);
    renderPinnedComparisonTable();
    renderPinnedModelNameLabels();
  }

  function buildPinnedComparisonPanel() {
    pinnedComparisonPanel = document.createElement("details");
    pinnedComparisonPanel.id = "aa-pinned-comparison-panel";
    const summary = textElement("summary", "aa-section-title", "展开固定模型对比");
    const optionalFields = textElement("fieldset", "aa-comparison-field-controls");
    optionalFields.append(textElement("legend", "", "可选字段（自动保存）"));
    const labels = { output_speed: "原始速度", eff_speed: "有效速度", cost_to_run: "有效运行成本", blended_price_cache_input_output_7_to_2_to_1: "7:2:1 混合单价", output_mtokens: "冗长度" };
    for (const field of optionalComparisonFieldNames) {
      const label = textElement("label", "aa-checkbox-chip");
      const checkbox = document.createElement("input"); checkbox.type = "checkbox"; checkbox.checked = selectedOptionalComparisonFieldNames.has(field);
      checkbox.dataset.comparisonField = field;
      checkbox.addEventListener("change", () => {
        if (checkbox.checked) selectedOptionalComparisonFieldNames.add(field); else selectedOptionalComparisonFieldNames.delete(field);
        writeStoredPreference(COMPARISON_FIELDS_STORAGE_KEY, [...selectedOptionalComparisonFieldNames]);
        renderPinnedComparisonTable();
        notifyExplorationViewChanged();
      });
      label.append(checkbox, document.createTextNode(labels[field])); optionalFields.append(label);
    }
    comparisonTableContainer = textElement("div", "aa-comparison-table-scroll-region");
    comparisonTableContainer.tabIndex = 0;
    comparisonTableContainer.setAttribute("aria-label", "固定模型对比表，可横向滚动");
    pinnedComparisonPanel.append(summary, optionalFields, comparisonTableContainer);
    bindHorizontalOverflowFade(comparisonTableContainer);
    pinnedComparisonPanel.addEventListener("toggle", () => {
      if (pinnedComparisonPanel.open && window.matchMedia("(max-width: 1024px)").matches) setSidePanelExpanded(true);
      syncHorizontalOverflowFades();
      notifyExplorationViewChanged();
    });
    reportShell.append(pinnedComparisonPanel);
  }

  function renderPinnedComparisonTable() {
    if (!pinnedComparisonPanel || !activeMetricVariant) return;
    const models = pinnedModelsInDisplayOrder();
    pinnedComparisonPanel.hidden = models.length === 0;
    pinnedComparisonPanel.querySelector("summary").textContent = `固定模型对比（${models.length} 档位）`;
    const currentModels = models.map(activeModelForIdentity);
    const baselineIndex = currentModels.findIndex(model => model && modelIsAnalysisEligibleForActiveMetricVariant(model) && [model.x, model.y, model.z].every(Number.isFinite));
    const table = document.createElement("table"); table.id = "aa-pinned-comparison-table";
    const caption = textElement("caption", "", baselineIndex >= 0 ? `Δ% 基准：${models[baselineIndex].name}；历史口径不参与基准或最优值高亮；零基准不计算百分比。` : "当前口径没有可比基准；历史口径不参与最优值高亮。");
    const head = document.createElement("thead"), header = document.createElement("tr");
    header.append(textElement("th", "", "指标"));
    models.forEach(model => { const cell = textElement("th", "", model.name); cell.scope = "col"; cell.dataset.modelIdentity = stableModelIdentity(model); header.append(cell); });
    head.append(header);
    const rows = [
      { field: "creator", label: "厂商", identity: true },
      { field: "reasoning_level_label", label: "推理档位", identity: true },
      { field: "release_date", label: "发布日期", identity: true },
      { field: "status", label: "当前状态", identity: true },
      { field: "intelligence", label: "智能指数", higherIsBetter: true },
      { field: activeInteractionRelationships.cost_axis_field, label: activeInteractionRelationships.cost_axis_label, unit: costAxisUnit(), higherIsBetter: false },
      { field: activeInteractionRelationships.speed_axis_field, label: activeInteractionRelationships.speed_axis_label, unit: "tok/s", higherIsBetter: true },
      { field: "layer", label: "帕累托层级", higherIsBetter: false },
      { field: "standout", label: FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME[selectedFrontierStandoutMetricName].label, higherIsBetter: true },
      ...[...selectedOptionalComparisonFieldNames].filter(field => ![activeInteractionRelationships.cost_axis_field, activeInteractionRelationships.speed_axis_field].includes(field)).map(field => ({ field, label: { output_speed: "原始速度", eff_speed: "有效速度", cost_to_run: "有效运行成本", blended_price_cache_input_output_7_to_2_to_1: "7:2:1 混合单价", output_mtokens: "冗长度" }[field], unit: field === "output_mtokens" ? "M tokens" : ["output_speed", "eff_speed"].includes(field) ? "tok/s" : field === "cost_to_run" ? "USD" : "USD/M tokens", higherIsBetter: ["output_speed", "eff_speed"].includes(field) })),
    ];
    const body = document.createElement("tbody");
    for (const row of rows) {
      const tr = document.createElement("tr"); tr.dataset.comparisonField = row.field;
      const label = textElement("th", "", `${row.label}${row.unit ? ` (${row.unit})` : ""}`); label.scope = "row"; tr.append(label);
      const values = models.map((model, index) => {
        if (row.field === "status") return pinnedModelStatusText(model);
        if (row.identity) return model[row.field] ?? model.panel?.[row.field] ?? "未记录";
        const current = currentModels[index];
        return current ? row.field === "standout" ? displayedStandoutValueForModel(current) : current.panel?.[row.field] : null;
      });
      const comparableValues = values.filter((value, index) => currentModels[index] && modelIsAnalysisEligibleForActiveMetricVariant(currentModels[index]) && Number.isFinite(value));
      const best = comparableValues.length ? (row.higherIsBetter ? Math.max(...comparableValues) : Math.min(...comparableValues)) : null;
      values.forEach((value, index) => {
        const cell = document.createElement("td");
        const eligible = currentModels[index] && modelIsAnalysisEligibleForActiveMetricVariant(currentModels[index]);
        cell.textContent = row.identity ? String(value) : !currentModels[index] ? "当前口径缺席" : row.field === "standout" ? standoutDisplayText(value) : formatSignificantNumber(value);
        if (!row.identity && eligible && Number.isFinite(value) && value === best) cell.classList.add("is-best-comparable-value");
        if (!row.identity && eligible && baselineIndex >= 0) {
          const difference = percentageDifferenceFromBaseline(value, values[baselineIndex]);
          if (difference !== null) cell.append(textElement("span", "aa-comparison-delta", ` Δ ${difference > 0 ? "+" : ""}${formatSignificantNumber(difference)}%`));
        }
        if (!eligible) cell.classList.add("is-unavailable-for-comparison");
        tr.append(cell);
      });
      body.append(tr);
    }
    table.append(caption, head, body); comparisonTableContainer.replaceChildren(table);
    syncHorizontalOverflowFade(comparisonTableContainer);
  }

  function renderPinnedModelNameLabels() {
    pinnedModelNameLabels.replaceChildren(...displayedModelMarkers.flatMap((model, index) => {
      if (!modelIsPinned(model) || !modelMarkerIsCurrentlyVisible(index)) return [];
      const label = textElement("span", "aa-pinned-model-name-label", model.name);
      label.dataset.modelIndex = String(index);
      return [label];
    }));
    updatePinnedModelNameLabelPositions();
  }

  function updatePinnedModelNameLabelPositions() {
    const labels = [...pinnedModelNameLabels.children];
    const measuredLabels = labels.map((label, id) => {
      const position = modelVisualObjectsByModelIndex[Number(label.dataset.modelIndex)]?.logoSprite.position;
      const projected = position?.clone().project(perspectiveCamera);
      label.hidden = false;
      return { id, visible: projected && Math.abs(projected.z) <= 1 && Math.abs(projected.x) <= 1 && Math.abs(projected.y) <= 1,
        x: projected ? (projected.x + 1) * graphContainer.clientWidth / 2 + 12 * markerSizeMultiplier : 0,
        y: projected ? (1 - projected.y) * graphContainer.clientHeight / 2 : 0,
        width: label.offsetWidth, height: label.offsetHeight };
    });
    for (const layout of layoutPinnedModelNameAnnotations(graphContainer.clientWidth, graphContainer.clientHeight, measuredLabels)) {
      const label = labels[layout.id]; label.hidden = layout.hidden;
      if (!layout.hidden) { label.style.left = `${layout.x}px`; label.style.top = `${layout.y}px`; }
    }
  }

  function buildStandoutPanel() {
    const panel = createControlSection("aa-standout-panel", "突出度");
    panel.append(buildStandoutMetricControl());
    const description = textElement("p", "aa-weight-note");
    description.id = "aa-standout-metric-description";
    panel.append(description);
    const weightBlock = document.createElement("div");
    weightBlock.id = "aa-standout-weight-controls";
    weightBlock.className = "aa-weight-block";
    standoutWeightControls = {};
    [
      ["intelligence", "智能"],
      ["cost", "成本"],
      ["speed", "速度"],
    ].forEach(([axisName, labelText]) => {
      const row = document.createElement("div");
      row.className = "aa-weight-row";
      const label = document.createElement("span");
      label.textContent = labelText;
      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = "-2";
      slider.max = "2";
      slider.step = "0.05";
      slider.value = "0";
      slider.id = `aa-weight-slider-${axisName}`;
      const number = document.createElement("input");
      number.type = "number";
      number.min = "0.25";
      number.max = "4";
      number.step = "0.05";
      number.value = "1.00";
      number.className = "aa-weight-number";
      number.id = `aa-weight-number-${axisName}`;
      number.setAttribute("aria-label", `${labelText}突出度权重`);
      slider.setAttribute("aria-label", `${labelText}突出度权重滑杆`);
      slider.addEventListener("input", () => {
        standoutAxisWeights[axisName] = Math.pow(2, Number(slider.value));
        number.value = standoutAxisWeights[axisName].toFixed(2);
        applyStandoutVisualEncoding();
      });
      const commitNumber = () => {
        const weight = committedStandoutAxisWeight(number.value, standoutAxisWeights[axisName]);
        standoutAxisWeights[axisName] = weight;
        number.value = weight.toFixed(2);
        slider.value = String(Math.log2(weight));
        applyStandoutVisualEncoding();
      };
      number.addEventListener("blur", commitNumber);
      number.addEventListener("keydown", event => { if (event.key === "Enter") { event.preventDefault(); commitNumber(); } });
      row.append(label, slider, number);
      weightBlock.appendChild(row);
      standoutWeightControls[axisName] = { slider, number };
    });
    const resetWeights = textElement("button", "aa-secondary-button", "重置三个权重为 1");
    resetWeights.type = "button";
    resetWeights.id = "aa-reset-standout-axis-weights";
    resetWeights.addEventListener("click", () => setStandoutAxisWeights(1, 1, 1));
    weightBlock.append(textElement("p", "aa-weight-note", "权重以指数改变归一坐标，仅影响加权超体积；允许 0.25–4。编辑数字后按 Enter 或移出焦点提交。"), resetWeights);
    const rankingTitle = document.createElement("h3");
    rankingTitle.className = "aa-section-title";
    rankingTitle.textContent = "前沿排行（前 12 名）";
    standoutRankingList = document.createElement("div");
    standoutRankingList.id = "aa-standout-ranking";
    standoutRankingList.className = "aa-ranking-list";
    panel.append(weightBlock, rankingTitle, standoutRankingList);
    renderStandoutWeightControlsVisibility();
    return panel;
  }

  function renderStandoutWeightControlsVisibility() {
    const description = document.getElementById("aa-standout-metric-description");
    if (description) description.textContent = {
      trend_residual: "趋势残差：模型智能相对前沿成本与速度趋势拟合的偏离，越高越突出。",
      intelligence_uplift: "智能抬升：与其他前沿参照相比的智能增量；缺少参照时不计算。",
      weighted_exclusive_hypervolume: "加权超体积占比 = 该模型的排他贡献 ÷ 完整前沿超体积。按原始贡献排序，筛选不改变分母。",
      frontier_distance: "到前沿垂距：沿用当前分析方法的几何距离；不表示实际可达的新模型。",
    }[selectedFrontierStandoutMetricName];
    const weightBlock = document.getElementById("aa-standout-weight-controls");
    if (!weightBlock) return;
    weightBlock.hidden = !FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME[
      selectedFrontierStandoutMetricName
    ].usesAdjustableAxisWeights;
  }

  function buildCurrentViewPanel() {
    currentViewPanel = document.createElement("details");
    currentViewPanel.id = "aa-current-view-panel";
    currentViewPanel.className = "aa-control-section aa-current-view-details";
    currentViewPanel.open = true;
    return currentViewPanel;
  }

  function currentViewOfActiveScene() {
    return activeThreeDimensionalScene?.current_view || {};
  }

  // 历史口径点数以前端实际绘制的标记为准（与虚线样式一一对应），不单独信任契约计数。
  function historicalIntelligenceIndexVersionModelCountForActiveVariant() {
    return displayedModelMarkers.filter(
      (model) => !modelIsAnalysisEligibleForActiveMetricVariant(model),
    ).length;
  }

  function currentIntelligenceIndexVersionText() {
    const version = artificialAnalysisDataProvenance.current_intelligence_index_version;
    return version ? `v${String(version).replace(/^v/i, "")}` : "版本未知";
  }

  // 与 API 抓取时间的「按缓存文件时间推断」同一披露口径：版本不是 API 响应给的就注明来源。
  function currentIntelligenceIndexVersionTextWithInferenceNote() {
    const inferredFromAcceptedEmbeddedModelCatalogPartition =
      artificialAnalysisDataProvenance.current_intelligence_index_version_source ===
      "inferred_from_accepted_embedded_model_catalog_partition";
    return `${currentIntelligenceIndexVersionText()}${
      inferredFromAcceptedEmbeddedModelCatalogPartition ? "（按目录分区推定）" : ""
    }`;
  }

  function artificialAnalysisApiFetchDescription() {
    const fetchedAtUtc =
      artificialAnalysisDataProvenance.artificial_analysis_api_response_fetched_at_utc;
    if (!fetchedAtUtc) {
      return { headerText: "抓取时间未知", detailText: "抓取时间未知（契约未记录 API 抓取时间）" };
    }
    const fetchedAtInferredFromCacheFileTime =
      artificialAnalysisDataProvenance.artificial_analysis_api_response_fetched_at_utc_source ===
      "inferred_from_cache_file_modification_time";
    return {
      headerText: `API 抓取于 ${String(fetchedAtUtc).slice(0, 10)}${
        fetchedAtInferredFromCacheFileTime ? "（按缓存文件时间推断）" : ""
      }`,
      detailText: `${fetchedAtUtc}${
        fetchedAtInferredFromCacheFileTime ? "（按缓存文件时间推断）" : "（抓取时记录）"
      }`,
    };
  }

  function reportArtifactFingerprintSummaryText() {
    const { rendererBundleSha256, generatorGitCommit, renderedAtUtc } =
      frontierReportArtifactFingerprint;
    const generatorCommitIsDirty = generatorGitCommit.endsWith("-dirty");
    const generatorCommitWithoutDirtySuffix = generatorGitCommit.replace(/-dirty$/, "");
    const abbreviatedGeneratorCommit = /^[0-9a-f]{40}$/.test(generatorCommitWithoutDirtySuffix)
      ? generatorCommitWithoutDirtySuffix.slice(0, 12)
      : generatorCommitWithoutDirtySuffix;
    return [
      `bundle ${rendererBundleSha256.slice(0, 12)}`,
      `commit ${abbreviatedGeneratorCommit}${generatorCommitIsDirty ? "-dirty" : ""}`,
      `渲染 ${renderedAtUtc}`,
    ].join(" · ");
  }

  function renderCurrentView() {
    if (!currentViewPanel || !activeThreeDimensionalScene) return;
    const view = currentViewOfActiveScene();
    const summary = document.createElement("summary");
    summary.className = "aa-section-title aa-collapsible-summary";
    summary.textContent = "当前视图";
    const definitions = document.createElement("dl");
    definitions.className = "aa-current-view-grid";
    const historicalModelCount = historicalIntelligenceIndexVersionModelCountForActiveVariant();
    [
      ["渲染器", "three.js"],
      ["数据日期", view.data_date || visualizationDataset.data_date || "?"],
      ["智能指数", currentIntelligenceIndexVersionText()],
      ["成本口径", view.cost_metric_label || activeInteractionRelationships.cost_axis_label],
      ["速度口径", view.speed_metric_label || activeInteractionRelationships.speed_axis_label],
      ["可见 / 契约模型数", `${displayedModelMarkers.filter((model, modelIndex) => modelMarkerIsCurrentlyVisible(modelIndex)).length} / ${displayedModelMarkers.length}`],
      ["参与分析（契约全集）", String(displayedModelMarkers.length - historicalModelCount)],
      ["历史口径点", String(historicalModelCount)],
      ["全局 Pareto 数", String(frontierModels().length)],
      ["可见 Pareto 数", String(frontierModels().filter((model) => modelMarkerIsCurrentlyVisible(modelIndexByModelName[model.name])).length)],
      ["近期发布宽限", recentReleaseFrontierDistanceGracePeriodMonths === null
        ? "旧契约未记录"
        : `${recentReleaseFrontierDistanceGracePeriodMonths} 个月 · ${showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod ? "显示" : "隐藏"}宽限专属点`],
      ["宽限专属点", String(displayedModelMarkers.filter((model) => model.displayed_only_because_of_recent_release_grace_period === true).length)],
      ["剪枝参考日", view.pruning_reference_date || artificialAnalysisDataProvenance.pruning_reference_date || "未记录"],
      [
        "产物指纹",
        reportArtifactFingerprintSummaryText(),
        "aa-current-view-report-artifact-fingerprint",
      ],
    ].forEach(([labelText, valueText, descriptionElementId]) => {
      const term = document.createElement("dt");
      term.textContent = labelText;
      const description = document.createElement("dd");
      description.textContent = valueText;
      if (descriptionElementId) {
        description.id = descriptionElementId;
        description.title = [
          `renderer bundle sha256：${frontierReportArtifactFingerprint.rendererBundleSha256}`,
          `generator git commit：${frontierReportArtifactFingerprint.generatorGitCommit}`,
          `rendered at (UTC)：${frontierReportArtifactFingerprint.renderedAtUtc}`,
        ].join("\n");
      }
      definitions.append(term, description);
    });
    currentViewPanel.replaceChildren(summary, definitions);
  }

  function textElement(tagName, className, textContent) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (textContent !== undefined) element.textContent = textContent;
    return element;
  }

  function artificialAnalysisAttributionLinkElement(linkText, elementId) {
    const attributionLink = textElement("a", "aa-artificial-analysis-attribution-link", linkText);
    if (elementId) attributionLink.id = elementId;
    attributionLink.href = ARTIFICIAL_ANALYSIS_ATTRIBUTION_URL;
    attributionLink.target = "_blank";
    attributionLink.rel = "noopener noreferrer";
    return attributionLink;
  }

  // W0-4 页头：唯一标题 + AA 署名 + 抓取日期 + 指数版本 + 模型计数 + 「如何阅读」抽屉入口。
  function buildReportHeader() {
    if (!reportHeader) return;
    const reportTitle =
      reportHeader.querySelector("h1") ||
      textElement("h1", "frontier-3d-report-title", document.title);
    const headerMetadataRow = textElement("div", "aa-report-header-metadata-row");
    headerMetadataRow.id = "aa-report-header-metadata-row";
    headerMetadataRow.tabIndex = 0;
    headerMetadataRow.setAttribute("aria-label", "模型计数与数据来源，窄屏可横向滚动");
    bindHorizontalOverflowFade(headerMetadataRow);
    const attributionLink = artificialAnalysisAttributionLinkElement(
      "数据：Artificial Analysis",
      "aa-report-header-artificial-analysis-attribution-link",
    );
    attributionLink.append(textElement("span", "aa-external-link-glyph", " ↗"));
    const apiFetchDescription = artificialAnalysisApiFetchDescription();
    const apiFetchDate = textElement(
      "span",
      "aa-report-header-metadata-item",
      apiFetchDescription.headerText,
    );
    apiFetchDate.id = "aa-report-header-artificial-analysis-api-fetch-date";
    apiFetchDate.title = apiFetchDescription.detailText;
    const intelligenceIndexVersion = textElement(
      "span",
      "aa-report-header-metadata-item",
      `智能指数 ${currentIntelligenceIndexVersionTextWithInferenceNote()}`,
    );
    intelligenceIndexVersion.id = "aa-report-header-intelligence-index-version";
    reportHeaderModelCountSummary = textElement("span", "aa-report-header-metadata-item");
    reportHeaderModelCountSummary.id = "aa-report-header-model-count-summary";
    headerMetadataRow.append(
      attributionLink,
      apiFetchDate,
      intelligenceIndexVersion,
      reportHeaderModelCountSummary,
    );
    howToReadDrawerToggleButton = textElement(
      "button",
      "aa-how-to-read-drawer-toggle-button",
      "如何阅读 ⓘ",
    );
    howToReadDrawerToggleButton.type = "button";
    howToReadDrawerToggleButton.id = "aa-how-to-read-drawer-toggle";
    howToReadDrawerToggleButton.setAttribute("aria-expanded", "false");
    howToReadDrawerToggleButton.setAttribute("aria-controls", "aa-how-to-read-drawer");
    howToReadDrawerToggleButton.addEventListener("click", () =>
      setHowToReadDrawerOpen(howToReadDrawer.hidden),
    );
    const titleRow = textElement("div", "aa-report-header-title-row");
    const actions = textElement("div", "aa-report-header-actions");
    const viewSettings = textElement("button", "aa-secondary-button", "视图设置");
    viewSettings.type = "button"; viewSettings.id = "aa-view-settings-toggle";
    viewSettings.setAttribute("aria-expanded", "false");
    viewSettings.setAttribute("aria-controls", toolbar.id);
    viewSettings.addEventListener("click", () => {
      const expanded = reportShell.classList.toggle("is-view-settings-expanded");
      viewSettings.setAttribute("aria-expanded", String(expanded));
    });
    actions.append(howToReadDrawerToggleButton, viewSettings);
    titleRow.append(reportTitle, actions);
    const reportHeaderChildren = [titleRow, headerMetadataRow];
    // R1-03：没有被接受的内嵌目录分区时，取数侧写下的告警整行醒目显示（textContent，不解析 HTML）
    const embeddedModelCatalogPartitionRejectionWarningText =
      artificialAnalysisDataProvenance.embedded_model_catalog_partition_rejection_warning_text;
    if (
      typeof embeddedModelCatalogPartitionRejectionWarningText === "string" &&
      embeddedModelCatalogPartitionRejectionWarningText.trim()
    ) {
      const partitionRejectionWarning = textElement(
        "div",
        "aa-report-header-data-quality-warning",
        `⚠ ${embeddedModelCatalogPartitionRejectionWarningText}`,
      );
      partitionRejectionWarning.id =
        "aa-report-header-embedded-model-catalog-partition-rejection-warning";
      partitionRejectionWarning.setAttribute("role", "alert");
      reportHeaderChildren.push(partitionRejectionWarning);
    }
    reportHeader.replaceChildren(...reportHeaderChildren);
  }

  function renderReportHeaderModelCountSummary() {
    if (!reportHeaderModelCountSummary) return;
    const displayedModelCount = displayedModelMarkers.length;
    const visibleModelCount = displayedModelMarkers.filter((model, modelIndex) =>
      modelMarkerIsCurrentlyVisible(modelIndex),
    ).length;
    const historicalModelCount = historicalIntelligenceIndexVersionModelCountForActiveVariant();
    const summaryParts = [
      `全部输入 ${visualizationDataset.model_table_coverage === "all_input_records" ? visualizationDataset.models.length : "未知（旧文件覆盖有限）"}`,
      visibleModelCount === displayedModelCount
        ? `显示 ${displayedModelCount} 个模型`
        : `显示 ${visibleModelCount}/${displayedModelCount} 个模型`,
      `全局 Pareto ${frontierModels().length}`,
      `可见 Pareto ${frontierModels().filter((model) => modelMarkerIsCurrentlyVisible(modelIndexByModelName[model.name])).length}`,
    ];
    const visibleHistoricalCount = displayedModelMarkers.filter((model, modelIndex) =>
      !modelIsAnalysisEligibleForActiveMetricVariant(model) && modelMarkerIsCurrentlyVisible(modelIndex),
    ).length;
    if (historicalModelCount) summaryParts.push(`历史口径 ${visibleHistoricalCount === historicalModelCount ? historicalModelCount : `${visibleHistoricalCount}/${historicalModelCount}`}`);
    reportHeaderModelCountSummary.textContent = summaryParts.join(" · ");
    syncHorizontalOverflowFade(document.getElementById("aa-report-header-metadata-row"));
  }

  function horizontalOverflowStillHasHiddenContent(element) {
    return element.scrollWidth - element.clientWidth > 1 && element.scrollLeft + element.clientWidth < element.scrollWidth - 1;
  }

  function syncHorizontalOverflowFade(element) {
    if (!element) return;
    element.classList.toggle("has-inline-overflow-fade", horizontalOverflowStillHasHiddenContent(element));
  }

  function syncHorizontalOverflowFades() {
    syncHorizontalOverflowFade(document.getElementById("aa-report-header-metadata-row"));
    syncHorizontalOverflowFade(comparisonTableContainer);
    window.requestAnimationFrame(() => {
      syncHorizontalOverflowFade(document.getElementById("aa-report-header-metadata-row"));
      syncHorizontalOverflowFade(comparisonTableContainer);
    });
  }

  function bindHorizontalOverflowFade(element) {
    if (!element || element.dataset.horizontalOverflowFadeBound === "true") return;
    element.dataset.horizontalOverflowFadeBound = "true";
    element.addEventListener("scroll", () => syncHorizontalOverflowFade(element), { passive: true });
    syncHorizontalOverflowFade(element);
  }

  // 抽屉浮在绘图区之上（不改变画布尺寸，避免触发重排与相机投影变化）。
  function buildHowToReadDrawer() {
    howToReadDrawer = document.createElement("section");
    howToReadDrawer.id = "aa-how-to-read-drawer";
    howToReadDrawer.className = "aa-how-to-read-drawer";
    howToReadDrawer.setAttribute("aria-label", "如何阅读本图");
    // tabindex=-1：可被脚本聚焦（打开时焦点落在抽屉本身），但不进入常规 Tab 序列
    howToReadDrawer.tabIndex = -1;
    howToReadDrawer.hidden = true;
    plotRegion.appendChild(howToReadDrawer);
    document.addEventListener("keydown", (keyboardEvent) => {
      if (keyboardEvent.key === "Escape" && !howToReadDrawer.hidden) {
        setHowToReadDrawerOpen(false);
      }
      if (keyboardEvent.key === "Escape" && touchDetailsModel) clearHoverInteractionImmediately();
    });
  }

  function setHowToReadDrawerOpen(nextOpen) {
    if (!howToReadDrawer) return Promise.resolve(false);
    const drawerOpen = Boolean(nextOpen);
    const drawerWasOpen = !howToReadDrawer.hidden;
    const keyboardFocusWasInsideDrawer = howToReadDrawer.contains(document.activeElement);
    if (drawerOpen) renderHowToReadDrawer();
    howToReadDrawer.hidden = !drawerOpen;
    howToReadDrawerToggleButton?.setAttribute("aria-expanded", String(drawerOpen));
    // 抽屉挂在工具栏之后的绘图区里：不移焦点的话键盘用户要 Tab 穿过整个工具栏才能进入抽屉
    if (drawerOpen && !drawerWasOpen) {
      howToReadDrawer.focus({ preventScroll: true });
    } else if (!drawerOpen && drawerWasOpen && keyboardFocusWasInsideDrawer) {
      howToReadDrawerToggleButton?.focus({ preventScroll: true });
    }
    return Promise.resolve(drawerOpen);
  }

  function howToReadDrawerSection(titleText, ...children) {
    const section = textElement("section", "aa-how-to-read-drawer-section");
    section.append(textElement("h3", "aa-how-to-read-drawer-section-title", titleText), ...children);
    return section;
  }

  function renderHowToReadDrawer() {
    if (!howToReadDrawer || !activeThreeDimensionalScene) return;
    const view = currentViewOfActiveScene();
    const axes = activeThreeDimensionalScene.three_dimensional_axis_configuration || {};
    const drawerHeader = textElement("div", "aa-how-to-read-drawer-header");
    const closeButton = textElement("button", "aa-link-button", "关闭");
    closeButton.type = "button";
    closeButton.id = "aa-how-to-read-drawer-close-button";
    closeButton.addEventListener("click", () => setHowToReadDrawerOpen(false));
    drawerHeader.append(textElement("h2", "aa-section-title", "如何阅读"), closeButton);

    const axisDirectionList = textElement("ul", "aa-how-to-read-drawer-list");
    [
      [
        `成本轴 x：${axes.x_axis?.title_text || view.cost_metric_label || "成本"}。越低越好（越便宜）。`,
        view.cost_metric_note ? `口径：${view.cost_metric_note}` : "",
      ],
      [
        `速度轴 y：${view.speed_axis_title_text || axes.y_axis?.title_text || view.speed_metric_label || "速度"}。越高越好。`,
        view.speed_metric_note ? `口径：${view.speed_metric_note}` : "",
      ],
      [`智能轴 z：${axes.z_axis?.title_text || "智能指数"}。越高越好。`, ""],
    ].forEach(([directionText, metricNoteText]) => {
      const item = textElement("li", "", directionText);
      if (metricNoteText) {
        item.append(textElement("div", "aa-how-to-read-drawer-metric-note", metricNoteText));
      }
      axisDirectionList.appendChild(item);
    });

    const historicalModelCount = historicalIntelligenceIndexVersionModelCountForActiveVariant();
    const historicalExplanation = textElement("p", "aa-how-to-read-drawer-paragraph");
    historicalExplanation.append(
      textElement("span", "aa-historical-intelligence-index-version-swatch"),
      document.createTextNode(
        `虚线底板、半透明 Logo 的点是「历史口径」点：本口径用到的成本或冗长度来自非当期智能指数版本（当期为 ${currentIntelligenceIndexVersionText()}）。它们照常显示，但不参与 Pareto、突出度、归一化与前沿几何的计算。当前口径共 ${historicalModelCount} 个；勾选工具栏「仅当期可比」可隐藏它们。`,
      ),
    );

    const provenanceDefinitions = textElement("dl", "aa-current-view-grid");
    const catalogVersion =
      artificialAnalysisDataProvenance.embedded_model_catalog_intelligence_index_version;
    const catalogCapturedAtUtc =
      artificialAnalysisDataProvenance.embedded_model_catalog_captured_at_utc;
    const websitePageFetchPaused =
      artificialAnalysisDataProvenance.artificial_analysis_website_page_fetch_paused;
    const apiTier = artificialAnalysisDataProvenance.artificial_analysis_api_tier;
    [
      ["数据提供方", artificialAnalysisAttributionLinkElement("Artificial Analysis")],
      ["API 抓取", artificialAnalysisApiFetchDescription().detailText],
      [
        "智能指数",
        `${currentIntelligenceIndexVersionTextWithInferenceNote()}${apiTier ? `（API ${apiTier} tier）` : ""}`,
      ],
      [
        "内嵌模型目录",
        catalogVersion
          ? `v${catalogVersion}${catalogCapturedAtUtc ? `，缓存于 ${catalogCapturedAtUtc}` : ""}`
          : "未记录",
      ],
      [
        "网页抓取",
        websitePageFetchPaused === true
          ? "已暂停（只读已有缓存）"
          : websitePageFetchPaused === false ? "已开启" : "未记录",
      ],
      ["剪枝参考日", artificialAnalysisDataProvenance.pruning_reference_date || "未记录"],
    ].forEach(([labelText, valueTextOrElement]) => {
      const description = document.createElement("dd");
      description.append(valueTextOrElement);
      provenanceDefinitions.append(textElement("dt", "", labelText), description);
    });

    howToReadDrawer.replaceChildren(
      drawerHeader,
      howToReadDrawerSection(
        "三个坐标轴",
        axisDirectionList,
        textElement(
          "p",
          "aa-how-to-read-drawer-paragraph",
          "初始视角从「低成本、高速度、高智能」一角看向对角；拖拽旋转，滚轮缩放，右键拖动平移。",
        ),
      ),
      howToReadDrawerSection(
        "Pareto 前沿",
        textElement(
          "p",
          "aa-how-to-read-drawer-paragraph",
          "带深色圆环的点是本口径的 Pareto 点：没有其他模型在成本、速度、智能上同时不差且至少一维更好。默认的 Delaunay 邻接插值连接这些点，仅作视觉参照，不是帕累托面。勾选「实际可达前沿（精确阶梯）」可切换为已展示分析点的精确预算可达面。",
        ),
      ),
      howToReadDrawerSection("历史口径点", historicalExplanation),
      howToReadDrawerSection("口径与正交分解", textElement("p", "aa-how-to-read-drawer-paragraph", [
        ...Object.values(visualizationDataset.cost_metric_definitions || {}).map(definition => definition.description || `${definition.label}：${definition.unit || "USD"}`),
        ...Object.values(visualizationDataset.speed_metric_definitions || {}).map(definition => definition.description || `${definition.label}：生成速度 tok/s`),
        "正交分解视角采用混合单价 × 原始速度，分别观察单价、吞吐与智能。有效成本与有效速度都受到输出长度影响。切换口径保留相机，固定轴域来自该口径完整显示集合；筛选和宽限开关不改变轴域。",
      ].join(" "))),
      howToReadDrawerSection("图例", textElement("p", "aa-how-to-read-drawer-paragraph", [
        "深色环：帕累托身份；金色环：已固定；蓝色光晕：当前突出度的相对大小，虚线光晕表示缺少数值。",
        "紫色实线：同代推理档位；灰色实线：同档位跨代谱系；灰色虚线：同代其他档位参照。灰点：被剪枝的谱系前身；超范围前身夹紧在箱壁，详情用 ↑↓ 提示方向并保留原值。",
        achievableFrontierSurfaceVisible ? "当前显示精确预算阶梯：基于已展示且参与分析的帕累托点。" : `当前${frontierStyle === "hidden" ? "隐藏" : frontierStyle === "solid" ? "显示实心" : "显示线框"} Delaunay 邻接参照，面内位置不代表可达模型。`,
        countryRegionMarkerVisible ? "国别外框已开启：中国双圆环、美国圆角方环、其他菱形环；国别只标识厂商归属。" : "国别外框关闭；开启时同步显示国别图例。",
      ].join(" "))),
      howToReadDrawerSection("未上图模型与厂商", textElement("p", "aa-how-to-read-drawer-paragraph", (() => {
        const excluded = activeMetricVariant.excluded_models_with_drop_reason || [];
        const absentCreators = [...new Set(excluded.map(model => model.creator))].filter(creator => !displayedModelMarkers.some(model => model.creator === creator));
        return `${excluded.length} 个有智能分的模型未上图。可在搜索中按模型或厂商查看实际原因。${absentCreators.map(creator => `${creator}：${[...new Set(excluded.filter(model => model.creator === creator).map(model => model.drop_reason))].join("、")}`).join("；")}`;
      })())),
      howToReadDrawerSection("数据来源", provenanceDefinitions),
      howToReadDrawerSection("品牌与许可", textElement("p", "aa-how-to-read-drawer-paragraph", "本报告使用 Lobe Icons 的 MIT 许可图标与本地品牌资产。品牌名称和商标属于各自权利人，仅用于标识厂商，不表示认可或合作。完整许可见本页源代码的 Lobe Icons MIT 许可声明。")),
    );
  }

  function setSidePanelExpanded(nextExpanded) {
    sidePanelExpanded = Boolean(nextExpanded);
    reportShell.classList.toggle("is-side-panel-collapsed", !sidePanelExpanded);
    const bottomPanel = window.matchMedia("(max-width: 1024px)").matches;
    sidePanelToggleButton.textContent = sidePanelExpanded ? (bottomPanel ? "⌄" : "›") : (bottomPanel ? "⌃" : "‹");
    sidePanelToggleButton.setAttribute("aria-label", `${sidePanelExpanded ? "收起" : "展开"}图表控制栏`);
    sidePanelToggleButton.setAttribute("aria-controls", "aa-side-panel-body");
    sidePanelToggleButton.setAttribute("aria-expanded", String(sidePanelExpanded));
    window.setTimeout(resizeThreeDimensionalRenderer, 210);
  }

  function buildUserInterface() {
    buildReportHeader();
    buildHowToReadDrawer();
    toolbar.replaceChildren(
      buildMetricControls(),
      buildModelIdentityControls(),
      buildFrontierControls(),
    );
    const header = document.createElement("div");
    header.className = "aa-side-panel-header";
    // 报告标题只在页头出现一次；侧栏这里只是收起按钮旁的栏目标签，不是第二个标题。
    const title = document.createElement("div");
    title.className = "aa-side-panel-label";
    title.textContent = "图表控制";
    sidePanelToggleButton = document.createElement("button");
    sidePanelToggleButton.type = "button";
    sidePanelToggleButton.id = "aa-side-panel-toggle";
    sidePanelToggleButton.className = "aa-icon-button";
    sidePanelToggleButton.addEventListener("click", () =>
      setSidePanelExpanded(!sidePanelExpanded),
    );
    header.append(title, sidePanelToggleButton);

    const body = document.createElement("div");
    body.className = "aa-side-panel-body";
    body.id = "aa-side-panel-body";
    body.append(
      buildSearchPanel(),
      buildOrganizationFilterPanel(),
      buildPinnedModelsPanel(),
      buildStandoutPanel(),
      buildCurrentViewPanel(),
    );
    sidePanel.replaceChildren(header, body);
    buildPinnedComparisonPanel();
    renderStandoutWeightControlsVisibility();
    updateResponsiveInterface();
  }

  function updateResponsiveInterface() {
    const narrow = window.matchMedia("(max-width: 640px)").matches;
    const metadata = document.getElementById("aa-report-header-metadata-row");
    const count = document.getElementById("aa-report-header-model-count-summary");
    if (metadata && count) { if (narrow) metadata.prepend(count); else metadata.append(count); }
    syncHorizontalOverflowFades();
    if (pinnedComparisonPanel) {
      if (window.matchMedia("(max-width: 1024px)").matches) pinnedModelsPanel.after(pinnedComparisonPanel);
      else reportShell.append(pinnedComparisonPanel);
    }
    setSidePanelExpanded(sidePanelExpanded);
  }
  window.addEventListener("resize", updateResponsiveInterface);

  function resizeThreeDimensionalRenderer() {
    const width = Math.max(1, graphContainer.clientWidth);
    const height = Math.max(1, graphContainer.clientHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    if (webglRenderer.getPixelRatio() !== pixelRatio) webglRenderer.setPixelRatio(pixelRatio);
    webglRenderer.setSize(width, height, false);
    // 分数 DPR 时让 viewport 与已向下取整的实际帧缓冲一致。
    webglRenderer.setViewport(0, 0, webglRenderer.domElement.width / pixelRatio, webglRenderer.domElement.height / pixelRatio);
    for (const line of [transientLineageLineObject, transientReasoningVariantLineObject, transientSameGenerationLineObject]) line?.material.resolution.set(width, height);
    perspectiveCamera.aspect = width / height;
    perspectiveCamera.updateProjectionMatrix();
    cameraViewControls?.onResize();
    for (const group of [modelMarkerGroup, transientRelationshipGroup]) group.children.filter(child => child.isSprite).forEach(sprite => setSpriteCssPixelSize(sprite, sprite.userData.cssPixelSize));
    if (!tooltip.hidden && latestTooltipPointerCoordinates) positionTooltip(latestTooltipPointerCoordinates);
    requestThreeDimensionalSceneRender();
  }

  const resizeObserver = new ResizeObserver(resizeThreeDimensionalRenderer);
  resizeObserver.observe(graphContainer);
  window.addEventListener("resize", resizeThreeDimensionalRenderer);
  let devicePixelRatioMediaQuery;
  function watchDevicePixelRatioChanges() {
    devicePixelRatioMediaQuery?.removeEventListener("change", watchDevicePixelRatioChanges);
    devicePixelRatioMediaQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
    devicePixelRatioMediaQuery.addEventListener("change", watchDevicePixelRatioChanges);
    resizeThreeDimensionalRenderer();
  }
  watchDevicePixelRatioChanges();

  function projectedCanvasCoordinatesForThreeDimensionalPosition(position) {
    const projectedPosition = position.clone().project(perspectiveCamera);
    const canvasBounds = webglRenderer.domElement.getBoundingClientRect();
    return {
      clientX:
        canvasBounds.left + ((projectedPosition.x + 1) / 2) * canvasBounds.width,
      clientY:
        canvasBounds.top + ((1 - projectedPosition.y) / 2) * canvasBounds.height,
      normalizedDeviceDepth: projectedPosition.z,
    };
  }

  function projectedCanvasPositionForModelName(modelName) {
    const modelIndex = modelIndexByModelName[modelName];
    if (modelIndex === undefined) return null;
    return projectedCanvasCoordinatesForThreeDimensionalPosition(
      modelVisualObjectsByModelIndex[modelIndex].logoSprite.position,
    );
  }

  function projectedCanvasMarkerRadiiForModelName(modelName) {
    const modelIndex = modelIndexByModelName[modelName];
    if (modelIndex === undefined) return null;
    const visualObjects = modelVisualObjectsByModelIndex[modelIndex];
    const cameraRightDirection = new THREE.Vector3().setFromMatrixColumn(
      perspectiveCamera.matrixWorld,
      0,
    );
    const projectedCenter = projectedCanvasCoordinatesForThreeDimensionalPosition(
      visualObjects.logoSprite.position,
    );

    function projectedRadiusForSprite(sprite) {
      if (!sprite.material.sizeAttenuation) {
        return sprite.scale.x * graphContainer.clientHeight / (4 * Math.tan(THREE.MathUtils.degToRad(perspectiveCamera.fov / 2)));
      }
      const projectedRightEdge =
        projectedCanvasCoordinatesForThreeDimensionalPosition(
          sprite.position
            .clone()
            .addScaledVector(cameraRightDirection, sprite.scale.x / 2),
        );
      return Math.hypot(
        projectedRightEdge.clientX - projectedCenter.clientX,
        projectedRightEdge.clientY - projectedCenter.clientY,
      );
    }

    return {
      logoRadius: projectedRadiusForSprite(visualObjects.logoSprite),
      whiteBackplateRadius: projectedRadiusForSprite(
        visualObjects.backplateSprite,
      ),
      countryRegionRadius: projectedRadiusForSprite(
        visualObjects.countryRegionSprite,
      ),
    };
  }

  function projectedCanvasPositionForPrunedLineageAncestorName(
    prunedLineageAncestorName,
  ) {
    const ancestorSprite = clickablePrunedLineageAncestorSprites.find(
      (sprite) =>
        sprite.userData.prunedLineageAncestorNode.name ===
        prunedLineageAncestorName,
    );
    if (!ancestorSprite) return null;
    return projectedCanvasCoordinatesForThreeDimensionalPosition(
      ancestorSprite.position,
    );
  }

  function frontmostPointerInteractionAtProjectedModelPosition(modelName) {
    const projectedCanvasPosition = projectedCanvasPositionForModelName(modelName);
    if (!projectedCanvasPosition) return null;
    const interactionTarget = interactionTargetAtCanvasClientCoordinates(
      projectedCanvasPosition.clientX,
      projectedCanvasPosition.clientY,
    );
    if (interactionTarget?.interactionTargetKind !== "displayed_model") {
      return null;
    }
    const frontmostModel = displayedModelMarkers[interactionTarget.modelIndex];
    return {
      projectedCanvasPosition,
      frontmostModelName: frontmostModel.name,
      frontmostBaseModelName: frontmostModel.base_model_name,
      frontmostLineageKey: frontmostModel.lineage_key,
    };
  }

  // 被剪枝前身的 frontmost 命中校验（复验风险 2）：在其投影位置做与真实悬停相同的射线拾取，
  // 返回最前面命中的是谁；验证脚本据此逐条谱系挑出「悬停能真正命中」的前身，避免被近邻标记遮挡。
  function frontmostPointerInteractionAtProjectedPrunedLineageAncestorPosition(
    prunedLineageAncestorName,
  ) {
    const projectedCanvasPosition =
      projectedCanvasPositionForPrunedLineageAncestorName(prunedLineageAncestorName);
    if (!projectedCanvasPosition) return null;
    const interactionTarget = interactionTargetAtCanvasClientCoordinates(
      projectedCanvasPosition.clientX,
      projectedCanvasPosition.clientY,
    );
    const frontmostInteractionTargetName =
      interactionTarget?.interactionTargetKind === "displayed_model"
        ? displayedModelMarkers[interactionTarget.modelIndex]?.name ?? null
        : interactionTarget?.prunedLineageAncestorNode?.name ?? null;
    return {
      projectedCanvasPosition,
      frontmostInteractionTargetKind: interactionTarget?.interactionTargetKind ?? null,
      frontmostInteractionTargetName,
      frontmostInteractionTargetIsRequestedPrunedLineageAncestor:
        interactionTarget?.interactionTargetKind !== "displayed_model" &&
        frontmostInteractionTargetName === prunedLineageAncestorName,
    };
  }

  // 实心面几何的运行时摘要：供验证脚本断言「三角形数 > 0 且索引全为顶点范围内的有限整数」。
  function paretoFrontierSurfaceGeometrySummary() {
    if (!frontierSurfaceObject) {
      return {
        built: false,
        visible: false,
        vertexCount: 0,
        triangleCount: 0,
        allTriangleVertexIndicesAreFiniteIntegersWithinVertexRange: true,
        allVertexPositionsAreFinite: true,
      };
    }
    const positionAttribute = frontierSurfaceObject.geometry.attributes.position;
    const triangleVertexIndices = Array.from(frontierSurfaceObject.geometry.index.array);
    return {
      built: true,
      visible: frontierSurfaceObject.visible,
      vertexCount: positionAttribute.count,
      triangleCount: triangleVertexIndices.length / 3,
      allTriangleVertexIndicesAreFiniteIntegersWithinVertexRange: triangleVertexIndices.every(
        (vertexIndex) =>
          Number.isInteger(vertexIndex) && vertexIndex >= 0 && vertexIndex < positionAttribute.count,
      ),
      allVertexPositionsAreFinite: Array.from(positionAttribute.array).every(Number.isFinite),
    };
  }

  function frontierThreeDimensionalVisualizationState() {
    const visibleModelCount = displayedModelMarkers.filter((model, modelIndex) =>
      modelMarkerIsCurrentlyVisible(modelIndex),
    ).length;
    const pickableModelIndices = new Set(
      visiblePointerInteractionSprites()
        .filter((sprite) => sprite.userData.interactionTargetKind === "displayed_model")
        .map((sprite) => sprite.userData.modelIndex),
    );
    const historicalModelIndices = displayedModelMarkers
      .map((model, modelIndex) => [model, modelIndex])
      .filter(([model]) => !modelIsAnalysisEligibleForActiveMetricVariant(model))
      .map(([, modelIndex]) => modelIndex);
    const organizationNames = new Set(displayedModelMarkers.map((model) => model.creator));
    const visibleOrganizationCount = new Set(displayedModelMarkers.filter(
      (model, modelIndex) => modelMarkerIsCurrentlyVisible(modelIndex),
    ).map((model) => model.creator)).size;
    const lineagePositionCount = lineObjectEndpointPositions(transientLineageLineObject).length;
    const reasoningPositionCount = lineObjectEndpointPositions(transientReasoningVariantLineObject).length;
    return {
      interactiveRenderer: "threejs",
      activeMetricVariantKey,
      costAxisField: activeInteractionRelationships.cost_axis_field,
      speedAxisField: activeInteractionRelationships.speed_axis_field,
      displayedModelMarkerCount: displayedModelMarkers.length,
      organizationLogoMarkerCount: modelVisualObjectsByModelIndex.length,
      cameraFacingOrganizationLogoMarkerCount: clickableOrganizationLogoSprites.filter(
        (sprite) => sprite.isSprite,
      ).length,
      depthTestedOrganizationLogoMarkerCount:
        clickableOrganizationLogoSprites.filter(
          (sprite) => sprite.material.depthTest,
        ).length,
      depthWritingOrganizationLogoBackplateCount:
        modelVisualObjectsByModelIndex.filter(
          (visualObjects) => visualObjects.backplateSprite.material.depthWrite,
        ).length,
      loadedOrganizationLogoCanvasTextureCount: [...organizationNames].filter(
        (creatorName) =>
          organizationLogoTextureLoadStateByCreatorName[creatorName] === "loaded",
      ).length,
      failedOrganizationLogoCanvasTextureCount: [...organizationNames].filter(
        (creatorName) =>
          organizationLogoTextureLoadStateByCreatorName[creatorName] === "failed",
      ).length,
      countryRegionMarkerVisible,
      countryRegionMarkerCount: countryRegionMarkerVisible ? visibleModelCount : 0,
      organizationCount: organizationNames.size,
      visibleOrganizationCount,
      pinnedBaseModelNames: [...pinnedBaseModelNames],
      orbitInteractionActive,
      pinnedModelUuids: [...pinnedModelIdentities].filter((identity) => !identity.startsWith("legacy:")),
      hoveredModelIndex,
      organizationLogoTextureLoadStateByCreatorName: { ...organizationLogoTextureLoadStateByCreatorName },
      hoveredLineageKey,
      hoveredReasoningBaseModelName,
      hoveredPrunedLineageAncestorName,
      pinnedModelMarkerCount: displayedModelMarkers.filter((model) =>
        modelIsPinned(model),
      ).length,
      displayedLineageSegmentEndpointCount: lineagePositionCount,
      displayedReasoningVariantSegmentEndpointCount: reasoningPositionCount,
      displayedPrunedLineageAncestorMarkerCount:
        clickablePrunedLineageAncestorSprites.length,
      availableLineageCount: Object.keys(lineagesByOrganizationAndTier).length,
      selectedFrontierStandoutMetricName,
      frontierStandoutAxisWeights: { ...standoutAxisWeights },
      paretoFrontierModelCount: frontierModels().length,
      visibleParetoFrontierModelCount: frontierModels().filter((model) => modelMarkerIsCurrentlyVisible(modelIndexByModelName[model.name])).length,
      frontierStyle,
      achievableFrontierSurfaceVisible,
      paretoFrontierWireframeVisible: frontierWireframeObject?.visible ?? false,
      paretoFrontierSurfaceVisible: frontierSurfaceObject?.visible ?? false,
      achievableFrontierSurfaceObjectVisible: achievableFrontierSurfaceObject?.visible ?? false,
      exactAchievableBoundaryVisible: exactAchievableFrontierBoundaryObject?.visible ?? false,
      achievableFrontierGeometryKind: activeThreeDimensionalScene.achievable_frontier_geometry_kind ?? null,
      paretoFrontierSurfaceWritesDepth:
        frontierSurfaceObject?.material.depthWrite ?? null,
      achievableFrontierSurfaceWritesDepth:
        achievableFrontierSurfaceObject?.material.depthWrite ?? null,
      paretoFrontierSurfaceTriangleCount: frontierSurfaceObject
        ? frontierSurfaceObject.geometry.index.count / 3
        : 0,
      renderedTriangleCountInLatestFrame: webglRenderer.info.render.triangles,
      nonFiniteContractCoordinateCount,
      outOfRangeContractTriangleVertexIndexCount,
      skippedInvalidContractGeometryNames: [...skippedInvalidContractGeometryNames],
      visibleModelMarkerCount: visibleModelCount,
      showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod,
      recentReleaseFrontierDistanceGracePeriodMonths,
      recentReleaseGracePeriodOnlyModelMarkerCount: displayedModelMarkers.filter(
        (model) => model.displayed_only_because_of_recent_release_grace_period === true,
      ).length,
      pickableRecentReleaseGracePeriodOnlyModelMarkerCount: displayedModelMarkers.filter(
        (model, modelIndex) => model.displayed_only_because_of_recent_release_grace_period === true && pickableModelIndices.has(modelIndex),
      ).length,
      showOnlyCurrentIntelligenceIndexVersionComparableModels,
      historicalIntelligenceIndexVersionModelMarkerCount: historicalModelIndices.length,
      visibleHistoricalIntelligenceIndexVersionModelMarkerCount: historicalModelIndices.filter(
        (modelIndex) => modelVisualObjectsByModelIndex[modelIndex]?.logoSprite.visible,
      ).length,
      pickableHistoricalIntelligenceIndexVersionModelMarkerCount: historicalModelIndices.filter(
        (modelIndex) => pickableModelIndices.has(modelIndex),
      ).length,
      // R2-F3：历史口径点的视觉编码（虚线底板 + 半透明 Logo）以实际材质计数，供验证脚本按口径断言
      historicalIntelligenceIndexVersionStyledModelMarkerCount: modelVisualObjectsByModelIndex.filter(
        (visualObjects) =>
          visualObjects.backplateSprite.material ===
            historicalIntelligenceIndexVersionLogoBackplateMaterial &&
          visualObjects.logoSprite.material.opacity < 1,
      ).length,
      currentIntelligenceIndexVersionStyledModelMarkerCount: modelVisualObjectsByModelIndex.filter(
        (visualObjects) =>
          visualObjects.backplateSprite.material === whiteLogoBackplateMaterial &&
          visualObjects.logoSprite.material.opacity >= 1,
      ).length,
      howToReadDrawerOpen: howToReadDrawer ? !howToReadDrawer.hidden : false,
      reportArtifactFingerprint: { ...frontierReportArtifactFingerprint },
      sidePanelExpanded,
      markerSizeMultiplier,
      fixedAxisConfiguration: activeThreeDimensionalScene.three_dimensional_axis_configuration,
      cameraPosition: perspectiveCamera.position.toArray(),
    };
  }

  function lineObjectEndpointPositions(lineObject) {
    if (!lineObject) return [];
    if (lineObject.isLineSegments2) {
      const start = lineObject.geometry.attributes.instanceStart;
      const end = lineObject.geometry.attributes.instanceEnd;
      return Array.from({ length: start.count }, (_, index) => [
        [start.getX(index), start.getY(index), start.getZ(index)],
        [end.getX(index), end.getY(index), end.getZ(index)],
      ]).flat();
    }
    const positionAttribute = lineObject.geometry.attributes.position;
    return Array.from({ length: positionAttribute.count }, (_, positionIndex) => [
      positionAttribute.getX(positionIndex),
      positionAttribute.getY(positionIndex),
      positionAttribute.getZ(positionIndex),
    ]);
  }

  // R2-F1：验证脚本用这三组坐标从外部核对「连线端点是否落在被隐藏的标记上」。
  function transientRelationshipLineEndpointPositions() {
    return {
      lineage: lineObjectEndpointPositions(transientLineageLineObject),
      reasoning: lineObjectEndpointPositions(transientReasoningVariantLineObject),
    };
  }

  function displayedModelMarkerPositionsAndVisibility() {
    return modelVisualObjectsByModelIndex.map((visualObjects, modelIndex) => ({
      name: displayedModelMarkers[modelIndex]?.name,
      position: visualObjects.logoSprite.position.toArray(),
      visible: modelMarkerIsCurrentlyVisible(modelIndex),
    }));
  }

  function displayedPrunedLineageAncestorMarkerPositions() {
    return clickablePrunedLineageAncestorSprites.map((sprite) => sprite.position.toArray());
  }

  function frontierStandoutRanking() {
    return {
      selectedFrontierStandoutMetricName,
      frontierStandoutAxisWeights: { ...standoutAxisWeights },
      ranking: frontierModels()
        .map((model) => ({
          name: model.name,
          value: latestStandoutValuesByModelName[model.name],
        }))
        .sort((left, right) => {
          const leftValue = Number.isFinite(left.value) ? left.value : -Infinity;
          const rightValue = Number.isFinite(right.value) ? right.value : -Infinity;
          return rightValue - leftValue;
        }),
      completeFrontierHypervolume,
    };
  }

  function modelAnalysisRecordForModel(model) {
    return (activeMetricVariant?.model_analysis_records || []).find(record=>stableModelIdentity(record)===stableModelIdentity(model));
  }
  function sensitivityClassificationForModel(model) { return modelAnalysisRecordForModel(model)?.sensitivity_by_intelligence_half_width?.[explorationFilters.sensitivity_intelligence_half_width]; }
  function newlyEnteredFrontierModelUuids() {
    const comparison=visualizationDataset.refresh_difference_report?.frontier_comparison;
    return new Set((comparison?.status === "comparable" ? comparison.entered_by_variant?.[activeMetricVariantKey] || [] : []).map(identity=>identity.toLowerCase()));
  }
  function applySensitivityAndRefreshEntryRings() {
    const newlyEntered = newlyEnteredFrontierModelUuids();
    modelVisualObjectsByModelIndex.forEach((objects,index)=>{
      const model=displayedModelMarkers[index];
      const classification=sensitivityClassificationForModel(model);
      const kind=classification?.is_pareto_robust ? "robust" : classification?.is_near_frontier ? "near" : model.panel?.layer===1 && classification?.is_pareto_robust===false ? "sensitive" : null;
      const ring=objects.sensitivityRingSprite;
      if (ring) {
        ring.visible=modelMarkerIsCurrentlyVisible(index) && explorationFilters.sensitivity_intelligence_half_width!=="off" && kind!==null;
        if (kind) {
          ring.material=sensitivityRingMaterials[kind];ring.userData.normalMaterial=ring.material;ring.userData.normalRenderOrder=48;
          ring.userData.foregroundMaterial?.dispose();ring.userData.foregroundMaterial=null;
        }
      }
      if(objects.newFrontierEntrySprite)objects.newFrontierEntrySprite.visible=modelMarkerIsCurrentlyVisible(index) && newlyEntered.has(stableModelIdentity(model));
    });
  }
  let lastAppliedSystemColorScheme = null;
  function applySystemColorSchemeToScene() {
    const dark=window.matchMedia("(prefers-color-scheme: dark)").matches;
    threeScene.background.set(dark ? 0x111827 : 0xffffff);
    const replacements={0x64748b:0xb7c7df,0x334155:0xdde7f3,0xd8dee6:0x43536d,0x245c9a:0x80baff,0x475569:0xb7c7df,0x217a3c:0x5ee89a};
    for(const group of [staticAxesAndGridGroup,frontierGeometryGroup,transientRelationshipGroup]) group.traverse(object=>{
      if(!object.material?.color || object.isSprite)return;
      const material=object.material;
      material.userData.lightThemeColor ??= material.color.getHex();
      material.color.setHex(dark ? replacements[material.userData.lightThemeColor] ?? material.userData.lightThemeColor : material.userData.lightThemeColor);
    });
    if(lastAppliedSystemColorScheme === dark){requestThreeDimensionalSceneRender();return;}
    lastAppliedSystemColorScheme=dark;
    for(const [category,lightColor,dashed] of [["other","#4b5563",false],["unclassified","#64748b",true]]){
      const texture=countryRegionTextures[category],regionContext=texture.image.getContext("2d");
      regionContext.clearRect(0,0,128,128);regionContext.save();regionContext.translate(64,64);regionContext.rotate(Math.PI/4);
      regionContext.strokeStyle=dark ? "#cbd5e1" : lightColor;regionContext.lineWidth=9;
      if(dashed)regionContext.setLineDash([10,8]);regionContext.strokeRect(-39,-39,78,78);regionContext.restore();texture.needsUpdate=true;
    }
    const context=paretoRingTexture.image.getContext("2d");
    context.clearRect(0,0,128,128);context.beginPath();context.arc(64,64,53,0,Math.PI*2);context.lineWidth=10;
    context.strokeStyle=dark ? "#e2e8f0" : "rgba(15,23,42,0.8)";context.stroke();paretoRingTexture.needsUpdate=true;
    requestThreeDimensionalSceneRender();
  }
  cameraViewControls=installFrontierCameraViewControls({camera:perspectiveCamera,controls:orbitControls,canvas:webglRenderer.domElement,graphContainer,
    getBoundingSphere:()=>{const bounds=new THREE.Box3().setFromObject(staticAxesAndGridGroup);return bounds.isEmpty() ? new THREE.Sphere(new THREE.Vector3(),Math.sqrt(3)) : bounds.getBoundingSphere(new THREE.Sphere());},
    getInitialCameraDirection:()=>{const eye=activeThreeDimensionalScene.initial_camera_configuration.eye;return [eye.x,eye.y,eye.z];},
    hitTest:interactionTargetAtCanvasClientCoordinates,onCameraStateCommitted:notifyExplorationViewChanged,
    onDismissOverlay:()=>{
      if(howToReadDrawer && !howToReadDrawer.hidden){setHowToReadDrawerOpen(false);return true;}
      if(touchDetailsModel){clearHoverInteractionImmediately();return true;}
      if(searchResults && !searchResults.hidden && searchInput?.value){
        searchResults.hidden=true;
        searchInput.setAttribute("aria-expanded", "false");
        searchInput.removeAttribute("aria-activedescendant");
        searchActiveResultIndex=-1;
        return true;
      }
      return false;
    },
    onClearSelection:()=>{clearHoverInteractionImmediately();pinnedModelIdentities.clear();synchronizePinnedBaseModelNameAliases();applyPinnedModelVisualEncoding();renderSearchResults();},
    onFocusSearch:()=>{setSidePanelExpanded(true);searchInput?.focus();},requestRender:requestThreeDimensionalSceneRender,
  });
  function sharedFrontierViewState() {
    return {metric_variant_key:activeMetricVariantKey,pinned_model_uuids:[...pinnedModelIdentities].filter(identity=>!identity.startsWith("legacy:")).sort(),
      hidden_organization_identity_keys:[...new Set([...hiddenOrganizationCreatorNames].map(name=>organizationIdentityMetadataByCreatorName[name]?.organization_identity_key).filter(Boolean))].sort(),
      standout_metric:selectedFrontierStandoutMetricName,standout_axis_weights:{...standoutAxisWeights},camera:cameraViewControls.serializeCameraState(),
      display:{comparable_only:showOnlyCurrentIntelligenceIndexVersionComparableModels,recent_release_grace_period:showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod,country_region_markers:countryRegionMarkerVisible,
        achievable_frontier_surface:achievableFrontierSurfaceVisible,frontier_style:frontierStyle,marker_size_multiplier:markerSizeMultiplier,
        pinned_comparison_expanded:Boolean(pinnedComparisonPanel?.open),pinned_comparison_optional_fields:[...selectedOptionalComparisonFieldNames].sort()}};
  }
  function applySharedFrontierViewState(state,announce) {
    if(state.metric_variant_key){
      if(metricVariantsByKey[state.metric_variant_key]){const [cost,speed]=state.metric_variant_key.split("__");activateMetricCombination(cost,speed);}
      else announce("分享口径在本文件中不存在；保留当前口径。");
    }
    if(state.pinned_model_uuids){
      pinnedModelIdentities.clear();
      for(const uuid of state.pinned_model_uuids){
        const identity=uuid.toLowerCase();pinnedModelIdentities.add(identity);
        if(!allModelRecordsByIdentity.has(identity)){
          const name=`缺失模型 ${identity}`;
          allModelRecordsByIdentity.set(identity,{model_uuid:identity,name,creator:"?",base_model_name:name,panel:{intelligence:null,release_date:"?"}});
          announce("部分固定模型在当前文件中缺失，已保留 UUID 与未上图说明。");
        }
      }
      synchronizePinnedBaseModelNameAliases();applyPinnedModelVisualEncoding();
    }
    if(state.hidden_organization_identity_keys){
      const hidden=new Set(state.hidden_organization_identity_keys);
      hiddenOrganizationCreatorNames=new Set(Object.entries(organizationIdentityMetadataByCreatorName).filter(([,metadata])=>hidden.has(metadata.organization_identity_key)).map(([name])=>name));
      renderOrganizationFilterPanel();
    }
    if(state.standout_metric)selectFrontierStandoutMetric(state.standout_metric);
    if(state.standout_axis_weights){const w=state.standout_axis_weights;setStandoutAxisWeights(w.intelligence,w.cost,w.speed);}
    const display=state.display || {};
    if(display.comparable_only!==undefined)setShowOnlyCurrentIntelligenceIndexVersionComparableModels(display.comparable_only);
    if(display.recent_release_grace_period!==undefined)setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod(display.recent_release_grace_period);
    if(display.country_region_markers!==undefined)setCountryRegionMarkerVisible(display.country_region_markers);
    if(display.achievable_frontier_surface!==undefined)setAchievableFrontierSurfaceVisible(display.achievable_frontier_surface);
    if(display.frontier_style)setFrontierStyle(display.frontier_style);
    if(display.marker_size_multiplier!==undefined)setMarkerSizeMultiplier(display.marker_size_multiplier);
    if(display.pinned_comparison_optional_fields){
      selectedOptionalComparisonFieldNames.clear();display.pinned_comparison_optional_fields.forEach(field=>selectedOptionalComparisonFieldNames.add(field));
      pinnedComparisonPanel.querySelectorAll("[data-comparison-field]").forEach(control=>{control.checked=selectedOptionalComparisonFieldNames.has(control.dataset.comparisonField);});
      writeStoredPreference(COMPARISON_FIELDS_STORAGE_KEY,[...selectedOptionalComparisonFieldNames]);renderPinnedComparisonTable();
    }
    if(display.pinned_comparison_expanded!==undefined)pinnedComparisonPanel.open=display.pinned_comparison_expanded;
    if(state.camera)cameraViewControls.restoreCameraState(state.camera);
    applyModelMarkerVisibilityAndRefreshDependentViews();
  }

  // 初始取景使用控制栏的最终尺寸，避免首次折叠动画把相机定在过渡布局。
  const initialSidePanelTransition = sidePanel.style.transition;
  sidePanel.style.transition = "none";
  buildUserInterface();
  loadActiveMetricVariant(activeMetricVariantKey, false);
  resizeThreeDimensionalRenderer();
  explorationControls=mountFrontierModelExplorationControls({dataset:visualizationDataset,reportShell,toolbar,plotRegion,graphContainer,sidePanel,getVariantKey:()=>activeMetricVariantKey,
    getSharedViewState:sharedFrontierViewState,applySharedViewState:applySharedFrontierViewState,
    modelPassesSharedFilters:model=>{
      const active=displayedModelMarkers.find(candidate=>stableModelIdentity(candidate)===stableModelIdentity(model)) || model;
      return currentOrganizationVisibility(model.creator) && (!showOnlyCurrentIntelligenceIndexVersionComparableModels || modelIsAnalysisEligibleForActiveMetricVariant(model)) &&
        (showModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod || !active.displayed_only_because_of_recent_release_grace_period);
    },
    onExplorationFiltersChanged:next=>{Object.assign(explorationFilters,next);applyModelMarkerVisibilityAndRefreshDependentViews();refreshVisibleModelDetails();},
    resetCamera:()=>cameraViewControls.resetCamera(),setAxisAlignedCameraView:cameraViewControls.setAxisAlignedCameraView,pinModel:model=>setSingleModelPinned(model),
    exportPng:async()=>{
      applySystemColorSchemeToScene();
      const blob=await renderFrontierBrowserPng({scene:threeScene,camera:perspectiveCamera,graphContainer,title:document.getElementById("frontier-3d-report-title").textContent,
        metadataLines:[`数据日期：${visualizationDataset.data_date || "未知"}；${activeInteractionRelationships.cost_axis_label} × ${activeInteractionRelationships.speed_axis_label}`,
          `本口径上图 ${displayedModelMarkers.length}；可见 ${displayedModelMarkers.filter((_,index)=>modelMarkerIsCurrentlyVisible(index)).length}；按当前价格、速度和评测口径计算`,
          `智能分显示：${explorationFilters.measured_only ? "仅实测" : "含实测、估算与未知"}；发布日期截止：${explorationFilters.cutoff_date || "全部日期"}（${explorationFilters.date_mode==="hide" ? "隐藏" : "淡出"}，未知日期保留）`],
        legendLines:["圆环：正式前沿；金色：已固定；蓝色：突出度；青色：可靠的新入前沿",
          `前沿几何：${achievableFrontierSurfaceVisible ? "精确可达阶梯（基于已展示分析点）" : frontierStyle==="hidden" ? "已隐藏" : "Delaunay 邻接插值参照，不是帕累托面"}`,
          `突出度：${FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME[selectedFrontierStandoutMetricName].label}；权重（智能 / 成本 / 速度）：${standoutAxisWeights.intelligence} / ${standoutAxisWeights.cost} / ${standoutAxisWeights.speed}`,
          ...(countryRegionMarkerVisible ? ["国别/地区外框：红圆中国；蓝圆角美国；灰菱形其他；虚线菱形未分类"] : []),
          ...(hiddenOrganizationCreatorNames.size ? [`隐藏厂商：${[...hiddenOrganizationCreatorNames].join("、")}`] : []),
          explorationFilters.sensitivity_intelligence_half_width==="off" ? "敏感性标注关闭" : `假设区间：智能 ±${explorationFilters.sensitivity_intelligence_half_width}，成本与速度各 ±10%；实线稳健，虚线敏感/近前沿；不是 AA 置信区间`],
        pinnedModelNames:pinnedModelsInDisplayOrder().map(model=>model.name)});
      downloadFrontierBrowserArtifact(blob,`frontier-${visualizationDataset.data_date || "unknown"}.png`);
      requestThreeDimensionalSceneRender();
    },
  });
  if(!decodeFrontierViewStateHash(window.location.hash).state?.camera)cameraViewControls.resetCamera({commit:false});
  resizeThreeDimensionalRenderer();
  sidePanel.style.transition = initialSidePanelTransition;
  window.serializeFrontierViewState=explorationControls.getState;
  window.setFrontierExplorationFilters=explorationControls.setExplorationFilters;
  window.resetFrontierCameraView=()=>cameraViewControls.resetCamera();
  window.setAxisAlignedFrontierCameraView=cameraViewControls.setAxisAlignedCameraView;
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",applySystemColorSchemeToScene);
  applySystemColorSchemeToScene();

  window.frontierThreeDimensionalVisualizationState =
    frontierThreeDimensionalVisualizationState;
  window.pinFrontierBaseModel = (baseModelName) => setBaseModelPinned(baseModelName, true);
  window.unpinFrontierBaseModel = (baseModelName) => setBaseModelPinned(baseModelName, false);
  window.togglePinnedFrontierBaseModel = togglePinnedBaseModelName;
  window.showFrontierLineageForModelName = (modelName) => {
    const modelIndex = modelIndexByModelName[modelName];
    if (modelIndex === undefined || !modelMarkerIsCurrentlyVisible(modelIndex)) return false;
    setHoveredModelIndex(modelIndex);
    return true;
  };
  window.clearFrontierHoverState = clearHoverInteractionImmediately;
  window.matchingFrontierBaseModelNames = matchingBaseModelNames;
  window.setFrontierMetricCombination = activateMetricCombination;
  window.setParetoFrontierVisualizationStyle = setFrontierStyle;
  window.setAchievableFrontierSurfaceVisibility =
    setAchievableFrontierSurfaceVisible;
  window.setCountryRegionMarkerVisibility = setCountryRegionMarkerVisible;
  window.setShowOnlyCurrentIntelligenceIndexVersionComparableModels =
    setShowOnlyCurrentIntelligenceIndexVersionComparableModels;
  window.setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod =
    setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod;
  window.setFrontierHowToReadDrawerOpen = setHowToReadDrawerOpen;
  window.setFrontierSidePanelExpanded = setSidePanelExpanded;
  window.selectFrontierStandoutMetric = selectFrontierStandoutMetric;
  window.setFrontierStandoutAxisWeights = setStandoutAxisWeights;
  window.setFrontierMarkerSizeMultiplier = setMarkerSizeMultiplier;
  window.frontierStandoutRanking = frontierStandoutRanking;
  window.frontierThreeDimensionalRendererDiagnostics = {
    // 验证只暴露用到的构造器，避免导出整个 THREE 命名空间阻止 tree shaking。
    verificationGeometryConstructors: {
      Vector2: THREE.Vector2, Vector3: THREE.Vector3, Scene: THREE.Scene, Color: THREE.Color,
      CanvasTexture: THREE.CanvasTexture, Sprite: THREE.Sprite, SpriteMaterial: THREE.SpriteMaterial,
      PlaneGeometry: THREE.PlaneGeometry, Mesh: THREE.Mesh,
      PerspectiveCamera: THREE.PerspectiveCamera, OrthographicCamera: THREE.OrthographicCamera,
    },
    get axisAnnotationSizeMeasurementCount() { return axisAnnotationSizeMeasurementCount; },
    get surfaceMaterialForVisibilityVerification() { return frontierSurfaceObject?.material; },
    get surfaceRenderOrder() { return frontierSurfaceObject?.renderOrder; },
    markerVisualEncodingSummary: () => modelVisualObjectsByModelIndex.map((objects, index) => ({
      isPareto: displayedModelMarkers[index].panel?.layer === 1,
      paretoRingScale: objects.paretoRingSprite.scale.x,
      backplateScale: objects.backplateSprite.scale.x,
      standoutHaloVisible: objects.standoutHaloSprite.visible,
      standoutHaloScale: objects.standoutHaloSprite.scale.x,
      logoScale: objects.logoSprite.scale.x,
      logoSizeAttenuation: objects.logoSprite.material.sizeAttenuation,
    })),
    camera: perspectiveCamera,
    scene: threeScene,
    controls: orbitControls,
    renderer: webglRenderer,
    requestRender: requestThreeDimensionalSceneRender,
    pointerInteractionAtCanvasClientCoordinates: interactionTargetAtCanvasClientCoordinates,
    createRelationshipLineForVerification: relationshipLineObject,
    projectedCanvasPositionForModelName,
    projectedCanvasMarkerRadiiForModelName,
    projectedCanvasPositionForPrunedLineageAncestorName,
    frontmostPointerInteractionAtProjectedModelPosition,
    frontmostPointerInteractionAtProjectedPrunedLineageAncestorPosition,
    paretoFrontierSurfaceGeometrySummary,
    transientRelationshipLineEndpointPositions,
    displayedModelMarkerPositionsAndVisibility,
    displayedPrunedLineageAncestorMarkerPositions,
  };
})();
