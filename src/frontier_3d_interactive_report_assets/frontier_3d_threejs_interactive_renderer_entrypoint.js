import { LineSegments2 } from "three/addons/lines/LineSegments2.js";
import { LineSegmentsGeometry } from "three/addons/lines/LineSegmentsGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { axisTickValues } from "./frontier_3d_threejs_axis_tick_value_generator.js";
import { matchingBaseModelNames as matchFrontierBaseModelNames } from "./frontier_3d_threejs_base_model_search_matcher.js";
import { solveFrontierAxisAnnotationLayout } from "./frontier_3d_threejs_axis_annotation_layout_solver.js";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME,
  FRONTIER_STANDOUT_METRIC_NAMES,
  calculateFrontierStandoutMetricValues,
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

  const visualizationDataset = JSON.parse(visualizationDatasetElement.textContent);
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

  // 契约顶层数据来源（W1-8 起提供）；旧契约缺该字段时页头降级为「抓取时间未知」等文案，不报错。
  const artificialAnalysisDataProvenance =
    visualizationDataset.artificial_analysis_data_provenance || {};
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
  window.THREE = THREE;

  const threeScene = new THREE.Scene();
  threeScene.background = new THREE.Color(0xffffff);
  const perspectiveCamera = new THREE.PerspectiveCamera(42, 1, 0.01, 100);
  perspectiveCamera.up.set(0, 0, 1);
  let webglRenderer;
  try {
    webglRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
  } catch {
    setRuntimeIssue("webgl_unavailable", "无法启动三维图：当前环境不支持 WebGL，或图形资源不足。请启用浏览器图形加速后重新加载。");
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
    "可旋转的 AI 模型三维 Pareto 前沿",
  );
  graphContainer.replaceChildren(webglRenderer.domElement);

  const orbitControls = new OrbitControls(
    perspectiveCamera,
    webglRenderer.domElement,
  );
  orbitControls.enableDamping = false;
  orbitControls.screenSpacePanning = true;
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
  let allBaseModelNames = [];
  let modelVisualObjectsByModelIndex = [];
  let clickableOrganizationLogoSprites = [];
  let pointerInteractiveModelMarkerSprites = [];
  let clickablePrunedLineageAncestorSprites = [];
  const organizationLogoMaterialsByCreatorName = {};
  const organizationLogoTextureLoadStateByCreatorName = {};
  let frontierWireframeObject = null;
  let frontierSurfaceObject = null;
  let achievableFrontierSurfaceObject = null;
  let transientLineageLineObject = null;
  let transientReasoningVariantLineObject = null;
  let transientSameGenerationLineObject = null;

  let countryRegionMarkerVisible = false;
  // 「仅当期可比」：开启时隐藏历史口径点（W1-6 / D-1），隐藏的点也不可拾取；跨口径切换时保持。
  let showOnlyCurrentIntelligenceIndexVersionComparableModels = false;
  // 当前口径载入时统计的契约数值问题（W1-10 前端兜底）：非有限坐标/索引、越界索引与因此未建的几何。
  let nonFiniteContractCoordinateCount = 0;
  let outOfRangeContractTriangleVertexIndexCount = 0;
  let skippedInvalidContractGeometryNames = [];
  let frontierStyle = "wireframe";
  let achievableFrontierSurfaceVisible = false;
  let sidePanelExpanded = true;
  let hoveredModelIndex = null;
  let hoveredPrunedLineageAncestorName = null;
  let hoveredLineageKey = null;
  let hoveredReasoningBaseModelName = null;
  let pinnedBaseModelNames = new Set();
  const pinnedModelIdentities = new Set();
  const allModelRecordsByIdentity = new Map();
  function stableModelIdentity(model) {
    return model.model_uuid || `legacy:${JSON.stringify([model.creator, model.name])}`;
  }
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
  let renderFrameRequested = false;

  let costMetricSelect;
  let speedMetricSelect;
  let countryRegionMarkerToggle;
  let currentIntelligenceIndexVersionComparableOnlyToggle;
  let reportHeaderModelCountSummary;
  let howToReadDrawerToggleButton;
  let howToReadDrawer;
  let achievableFrontierSurfaceToggle;
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
  plotRegion.appendChild(tooltip);

  const axisAnnotations = [];

  function createAxisAnnotationElement(axisName, labelText, isTitle) {
    const element = document.createElement("div");
    element.className = isTitle ? "aa-threejs-axis-label" : "aa-threejs-axis-tick-label";
    element.dataset.axisName = axisName;
    element.textContent = labelText;
    graphContainer.appendChild(element);
    return element;
  }

  function updateProjectedAxisAnnotations() {
    const canvasWidth = graphContainer.clientWidth;
    const canvasHeight = graphContainer.clientHeight;
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
        element.hidden = false;
        const anchor = project(position);
        return { id, isTitle, anchor, projectedDepth: anchor.depth, width: element.offsetWidth, height: element.offsetHeight };
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
    });
  }

  orbitControls.addEventListener("change", requestThreeDimensionalSceneRender);

  function clearThreeObjectGroup(group) {
    while (group.children.length) {
      const child = group.children.pop();
      child.userData.foregroundMaterial?.dispose();
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

  function addSharedMaterialSprite(material, position, scale, renderOrder) {
    const sprite = new THREE.Sprite(material);
    sprite.position.copy(position);
    sprite.scale.set(scale, scale, 1);
    sprite.renderOrder = renderOrder;
    sprite.userData.sharedMaterial = true;
    modelMarkerGroup.add(sprite);
    return sprite;
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
    if (!currentOrganizationVisibility(model.creator)) return false;
    return !(
      showOnlyCurrentIntelligenceIndexVersionComparableModels &&
      !modelIsAnalysisEligibleForActiveMetricVariant(model)
    );
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
        0.145,
        30,
      );
      const countryRegionCategory = identity.country_region_category;
      const countryRegionSprite = addSharedMaterialSprite(
        countryRegionMaterials[countryRegionCategory] || countryRegionMaterials.unclassified,
        position,
        0.19,
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
        0.11,
        40,
      );
      [backplateSprite, countryRegionSprite, logoSprite].forEach((markerSprite) => {
        markerSprite.userData.modelIndex = modelIndex;
        markerSprite.userData.interactionTargetKind = "displayed_model";
      });
      clickableOrganizationLogoSprites.push(logoSprite);
      pointerInteractiveModelMarkerSprites.push(
        backplateSprite,
        countryRegionSprite,
        logoSprite,
      );

      const paretoRingSprite = addSharedMaterialSprite(
        paretoRingMaterial,
        position,
        0.19,
        45,
      );
      paretoRingSprite.visible = model.panel.layer === 1;
      const standoutHaloSprite = addSharedMaterialSprite(standoutHaloMaterial, position, 0.26, 15);
      standoutHaloSprite.visible = model.panel.layer === 1;
      const pinnedRingSprite = addSharedMaterialSprite(
        pinnedRingMaterial,
        position,
        0.245,
        50,
      );
      pinnedRingSprite.visible = false;

      modelVisualObjectsByModelIndex.push({
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
    applyOrganizationVisibilityToModelMarkers();
    applyPinnedModelVisualEncoding();
    applyStandoutVisualEncoding();
  }

  // 厂商筛选、「仅当期可比」与非有限坐标共同决定标记可见性；不可见的 sprite 同时退出拾取。
  function applyOrganizationVisibilityToModelMarkers() {
    cancelHoverDepartureGracePeriod();
    const hoveredAncestor = clickablePrunedLineageAncestorSprites.find((sprite) => sprite.userData.prunedLineageAncestorNode.name === hoveredPrunedLineageAncestorName)?.userData.prunedLineageAncestorNode;
    if ((hoveredModelIndex !== null && !modelMarkerIsCurrentlyVisible(hoveredModelIndex)) ||
      (hoveredAncestor && !lineageNodePassesCurrentVisibilityFilters(hoveredAncestor))) clearHoverInteractionImmediately();
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
    renderReportHeaderModelCountSummary();
    // 可见性变了，pin/悬停的连线、搜索结果的「已隐藏」标注都要跟着重算
    redrawHoveredAndPinnedRelationships();
    renderSearchResults();
    renderPinnedModelsPanel();
    renderCurrentView();
    if (standoutRankingList) applyStandoutVisualEncoding();
    requestThreeDimensionalSceneRender();
  }

  function setShowOnlyCurrentIntelligenceIndexVersionComparableModels(nextValue) {
    showOnlyCurrentIntelligenceIndexVersionComparableModels = Boolean(nextValue);
    if (currentIntelligenceIndexVersionComparableOnlyToggle) {
      currentIntelligenceIndexVersionComparableOnlyToggle.checked =
        showOnlyCurrentIntelligenceIndexVersionComparableModels;
    }
    // 正在悬停的点被隐藏时同时撤掉 tooltip 与谱系，避免残留指向不可见点的状态。
    if (hoveredModelIndex !== null && !modelMarkerIsCurrentlyVisible(hoveredModelIndex)) {
      setHoveredModelIndex(null);
    }
    applyOrganizationVisibilityToModelMarkers();
    return Promise.resolve(showOnlyCurrentIntelligenceIndexVersionComparableModels);
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
    applyOrganizationVisibilityToModelMarkers();
    return Promise.resolve(countryRegionMarkerVisible);
  }

  function applyFrontierGeometryVisibility() {
    if (frontierWireframeObject) {
      frontierWireframeObject.visible = frontierStyle === "wireframe";
    }
    if (frontierSurfaceObject) {
      frontierSurfaceObject.visible = frontierStyle === "solid";
    }
    if (achievableFrontierSurfaceObject) {
      achievableFrontierSurfaceObject.visible = achievableFrontierSurfaceVisible;
    }
    requestThreeDimensionalSceneRender();
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
    achievableFrontierSurfaceVisible = Boolean(nextVisible);
    if (achievableFrontierSurfaceToggle) {
      achievableFrontierSurfaceToggle.checked = achievableFrontierSurfaceVisible;
    }
    applyFrontierGeometryVisibility();
    return Promise.resolve(achievableFrontierSurfaceVisible);
  }

  function applyInitialCameraConfiguration() {
    const cameraConfiguration = activeThreeDimensionalScene.initial_camera_configuration;
    const eye = cameraConfiguration.eye;
    const center = cameraConfiguration.center;
    perspectiveCamera.position.set(eye.x * 2.2, eye.y * 2.2, eye.z * 2.2);
    orbitControls.target.set(center.x, center.y, center.z);
    orbitControls.update();
  }

  // 谱系节点是否可作为连线端点：被剪枝的前身总会画出自己的标记；已上图（kept）的节点要求其标记当前可见
  // （「仅当期可比」、厂商筛选、非有限坐标都会隐藏标记）。不可见的 kept 节点当作断点，不跨过它连线。
  function lineageNodePassesCurrentVisibilityFilters(node) {
    const creator = node.creator || node.lineage_family_key?.split("||")[0];
    if (creator && !currentOrganizationVisibility(creator)) return false;
    if (showOnlyCurrentIntelligenceIndexVersionComparableModels && !modelIsAnalysisEligibleForActiveMetricVariant(node)) return false;
    if (!node.kept) return true;
    const modelIndex = displayedModelMarkers.findIndex((model) => node.model_uuid ? model.model_uuid === node.model_uuid : model.name === node.name);
    return modelIndex >= 0 && modelMarkerIsCurrentlyVisible(modelIndex);
  }

  function applyRelationshipForegroundVisualEncoding() {
    modelVisualObjectsByModelIndex.forEach((visualObjects, index) => {
      const selected = modelMarkerIsCurrentlyVisible(index) && (modelIsPinned(displayedModelMarkers[index]) || hoveredModelIndex === index);
      for (const sprite of [visualObjects.logoSprite, visualObjects.backplateSprite, visualObjects.countryRegionSprite, visualObjects.paretoRingSprite, visualObjects.pinnedRingSprite, visualObjects.standoutHaloSprite]) {
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
        sprite.renderOrder = selected ? 80 + sprite.userData.normalRenderOrder / 10 : sprite.userData.normalRenderOrder;
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
      sprite.position.copy(normalizedThreeDimensionalPosition(node.x, node.y, node.z));
      sprite.scale.set(0.09, 0.09, 1); sprite.renderOrder = 90;
      sprite.userData = { sharedMaterial: true, interactionTargetKind: "pruned_lineage_ancestor", lineageKey,
        prunedLineageAncestorNode: { ...node, relationship_kind: relationshipKind } };
      transientRelationshipGroup.add(sprite); clickablePrunedLineageAncestorSprites.push(sprite);
    }
    lineageKeys.forEach((lineageKey) => {
      const nodes = lineagesByOrganizationAndTier[lineageKey] || [];
      nodes.forEach((node) => addAncestor(node, lineageKey));
      for (let index = 1; index < nodes.length; index += 1) {
        const previous = nodes[index - 1], current = nodes[index];
        if (!lineageNodePassesCurrentVisibilityFilters(previous) || !lineageNodePassesCurrentVisibilityFilters(current)) continue;
        lineagePositionPairs.push(normalizedThreeDimensionalPosition(previous.x, previous.y, previous.z), normalizedThreeDimensionalPosition(current.x, current.y, current.z));
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
          normalizedThreeDimensionalPosition(representative.node.x, representative.node.y, representative.node.z),
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
    requestThreeDimensionalSceneRender();
  }

  function modelTooltipHtml(model) {
    const identity = organizationIdentityMetadataByCreatorName[model.creator];
    const countryCategoryLabel = {
      china: "中国",
      united_states: "美国",
      other: "其他",
      unclassified: "未分类",
    }[identity.country_region_category];
    const panel = model.panel;
    const isAnalysisEligible = modelIsAnalysisEligibleForActiveMetricVariant(model);
    const tooltipLines = [
      `<strong>${escapeHtml(model.name)}</strong>`,
      `${escapeHtml(model.creator)} · ${countryCategoryLabel}`,
      `发布：${escapeHtml(panel.release_date)}`,
      `智能：${formatNumber(panel.intelligence, 1)}`,
      `${escapeHtml(activeInteractionRelationships.speed_axis_label)}：${formatNumber(panel[activeInteractionRelationships.speed_axis_field], 0)} tok/s`,
      `${escapeHtml(activeInteractionRelationships.cost_axis_label)}：$${formatNumber(panel[activeInteractionRelationships.cost_axis_field], 2)}`,
      isAnalysisEligible
        ? `Pareto 层：${formatNumber(panel.layer, 0)}`
        : "Pareto 层：不参与（历史口径）",
    ];
    if (!isAnalysisEligible) {
      tooltipLines.push(
        `<span class="aa-historical-intelligence-index-version-reason-note">${escapeHtml(historicalIntelligenceIndexVersionReasonText(model))}</span>`,
      );
    }
    return tooltipLines.join("<br>");
  }

  function prunedLineageAncestorTooltipHtml(lineageNode) {
    return [
      `<strong>${escapeHtml(lineageNode.name)}</strong>`,
      lineageNode.relationship_kind === "same_generation_reasoning_variant" ? "同代其他档位 · 已从主散点裁剪" : "谱系前身 · 已从主散点裁剪",
      `发布：${escapeHtml(lineageNode.release_date)}`,
      `智能：${formatNumber(lineageNode.intelligence, 1)}`,
      "固定后可稳定查看前身",
      `${escapeHtml(activeInteractionRelationships.speed_axis_label)}：${formatNumber(lineageNode.y, 0)} tok/s`,
      `${escapeHtml(activeInteractionRelationships.cost_axis_label)}：$${formatNumber(lineageNode.x, 2)}`,
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
    tooltip.innerHTML = modelTooltipHtml(model);
    tooltip.hidden = false;
    if (pointerEvent) positionTooltip(pointerEvent);
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
    hoveredLineageKey = lineageKey;
    hoveredReasoningBaseModelName = null;
    tooltip.innerHTML = prunedLineageAncestorTooltipHtml(
      prunedLineageAncestorNode,
    );
    tooltip.hidden = false;
    if (pointerEvent) positionTooltip(pointerEvent);
    redrawHoveredAndPinnedRelationships();
  }

  function positionTooltip(pointerEvent) {
    const regionBounds = plotRegion.getBoundingClientRect();
    const tooltipLeft = Math.min(
      pointerEvent.clientX - regionBounds.left + 14,
      regionBounds.width - 300,
    );
    const tooltipTop = Math.min(
      pointerEvent.clientY - regionBounds.top + 14,
      regionBounds.height - 180,
    );
    tooltip.style.left = `${Math.max(8, tooltipLeft)}px`;
    tooltip.style.top = `${Math.max(8, tooltipTop)}px`;
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
    if (orbitInteractionActive || !latestPointerCoordinates || webglRenderer.getContext().isContextLost()) return;
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
    const target = interactionTargetAtPointerEvent(event);
    activePrimaryPointerPress = {
      pointerId: event.pointerId, clientX: event.clientX, clientY: event.clientY,
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
  }
  webglRenderer.domElement.addEventListener("pointerup", completeActivePrimaryPointerPress);
  webglRenderer.domElement.addEventListener("pointercancel", (event) => {
    if (activePrimaryPointerPress?.pointerId === event.pointerId) activePrimaryPointerPress = null;
    completedPrimaryPointerPress = null;
    latestPointerCoordinates = null; clearHoverInteractionImmediately();
  });
  webglRenderer.domElement.addEventListener("pointerleave", () => {
    latestPointerCoordinates = null;
    clearHoverInteractionImmediately();
  });
  webglRenderer.domElement.addEventListener("click", (event) => {
    const completedPointerPress = completedPrimaryPointerPress;
    completedPrimaryPointerPress = null;
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
    requestThreeDimensionalSceneRender();
  }

  function togglePinnedBaseModelName(baseModelName) {
    return setBaseModelPinned(baseModelName, !pinnedBaseModelNames.has(baseModelName));
  }

  function frontierModels() {
    return displayedModelMarkers.filter((model) => model.panel?.layer === 1);
  }

  function applyStandoutVisualEncoding() {
    const models = frontierModels();
    const values = calculateFrontierStandoutMetricValues(
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
      const scale = finite ? 0.22 + percentile * 0.1 : 0.24;
      halo.scale.set(scale, scale, 1);
    });
    applyRelationshipForegroundVisualEncoding();
    renderStandoutRanking(models, values);
    requestThreeDimensionalSceneRender();
  }

  function renderStandoutRanking(models, values) {
    if (!standoutRankingList) return;
    const metricDefinition =
      FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME[
        selectedFrontierStandoutMetricName
      ];
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
        const rankingRow = document.createElement("div");
        rankingRow.className = "aa-ranking-row";
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
        value.textContent = Number.isFinite(row.value)
          ? Number(row.value).toFixed(metricDefinition.displayedDecimalPlaces)
          : "-";
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
      intelligence: Number(intelligenceWeight),
      cost: Number(costWeight),
      speed: Number(speedWeight),
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
    allBaseModelNames = Object.keys(baseGroupsByBaseModelName).sort((left, right) =>
      left.localeCompare(right),
    );
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
    group.append(logoStatus, toggleLabel, comparableOnlyToggleLabel);
    return group;
  }

  function buildFrontierControls() {
    const group = createToolbarGroup("前沿外观");
    const segmentedControl = document.createElement("div");
    segmentedControl.className = "aa-segmented-control";
    frontierStyleButtons = [
      ["wireframe", "线框"],
      ["solid", "实心面"],
      ["hidden", "隐藏前沿"],
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
    achievableFrontierSurfaceToggle.addEventListener("change", () =>
      setAchievableFrontierSurfaceVisible(achievableFrontierSurfaceToggle.checked),
    );
    achievableToggleLabel.append(
      achievableFrontierSurfaceToggle,
      document.createTextNode("可达前沿曲面"),
    );
    group.append(segmentedControl, achievableToggleLabel);
    return group;
  }

  function buildStandoutMetricControl() {
    const group = createToolbarGroup("突出度口径");
    standoutMetricSelect = document.createElement("select");
    standoutMetricSelect.id = "aa-standout-metric-select";
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
    const section = createControlSection("aa-search-panel", "搜索与 pin");
    searchInput = document.createElement("input");
    searchInput.id = "aa-search-input";
    searchInput.className = "aa-search-input";
    searchInput.type = "search";
    searchInput.placeholder = "搜索模型，按基模型分组 pin";
    searchResults = document.createElement("div");
    searchResults.id = "aa-search-results";
    searchResults.className = "aa-search-results";
    searchInput.addEventListener("input", renderSearchResults);
    section.append(searchInput, searchResults);
    return section;
  }

  function matchingBaseModelNames(query) {
    return matchFrontierBaseModelNames(allBaseModelNames, query);
  }

  function renderSearchResults() {
    if (!searchResults || !searchInput) return;
    const matchingNames = matchingBaseModelNames(searchInput.value);
    searchResults.replaceChildren(
      ...matchingNames.map((baseModelName) => {
        const row = document.createElement("button");
        row.type = "button";
        row.className = "aa-result-row";
        row.dataset.baseModelName = baseModelName;
        if (pinnedBaseModelNames.has(baseModelName)) row.classList.add("is-pinned");
        const name = document.createElement("span");
        name.className = "aa-truncate";
        name.textContent = baseModelName;
        const action = document.createElement("span");
        action.className = "aa-search-result-pin-button";
        action.textContent = pinnedBaseModelNames.has(baseModelName) ? "取消" : "Pin";
        const baseModelIndices = baseGroupsByBaseModelName[baseModelName] || [];
        const everyVariantIsHiddenByComparableOnlyToggle =
          showOnlyCurrentIntelligenceIndexVersionComparableModels &&
          baseModelIndices.length > 0 &&
          baseModelIndices.every(
            (modelIndex) =>
              !modelIsAnalysisEligibleForActiveMetricVariant(displayedModelMarkers[modelIndex]),
          );
        const everyVariantIsHiddenByCurrentFilter = baseModelIndices.length > 0 && baseModelIndices.every((index) => !modelMarkerIsCurrentlyVisible(index));
        if (everyVariantIsHiddenByCurrentFilter && !everyVariantIsHiddenByComparableOnlyToggle) {
          row.classList.add("is-hidden-by-current-filter");
          name.append(textElement("span", "aa-search-result-hidden-note", "（已被当前筛选隐藏）"));
        }
        if (everyVariantIsHiddenByComparableOnlyToggle) {
          row.classList.add("is-hidden-by-comparable-only-toggle");
          row.title = "全部档位都是历史口径点，已被「仅当期可比」隐藏；pin 后图上看不到它们";
          name.append(
            textElement("span", "aa-search-result-hidden-note", "（已被「仅当期可比」隐藏）"),
          );
        }
        row.append(name, action);
        row.addEventListener("click", () => togglePinnedBaseModelName(baseModelName));
        return row;
      }),
    );
    searchResults.style.display = matchingNames.length ? "block" : "none";
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
      const swatch = document.createElement("span");
      swatch.className = `aa-country-region-swatch is-${className}`;
      swatch.setAttribute("aria-hidden", "true");
      item.append(swatch, document.createTextNode(`${label}（${shapeDescription}）`));
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
    summary.textContent = `厂商筛选（${Object.keys(organizationModelCounts).length}）`;
    const rows = Object.keys(organizationModelCounts)
      .sort((left, right) => left.localeCompare(right))
      .map((creatorName) => {
        const identity = organizationIdentityMetadataByCreatorName[creatorName];
        const row = document.createElement("label");
        row.className = "aa-organization-filter-row";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = !hiddenOrganizationCreatorNames.has(creatorName);
        checkbox.addEventListener("change", () => {
          if (checkbox.checked) hiddenOrganizationCreatorNames.delete(creatorName);
          else hiddenOrganizationCreatorNames.add(creatorName);
          applyOrganizationVisibilityToModelMarkers();
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
  }

  function buildPinnedModelsPanel() {
    pinnedModelsPanel = createControlSection("aa-pinned-panel", "已固定");
    return pinnedModelsPanel;
  }

  function renderPinnedModelsPanel() {
    if (!pinnedModelsPanel) return;
    const pinnedNames = [...pinnedBaseModelNames].sort((left, right) => left.localeCompare(right));
    pinnedModelsPanel.style.display = pinnedNames.length ? "block" : "none";
    const title = textElement("h2", "aa-section-title", `已固定（${pinnedNames.length}）`);
    const list = document.createElement("div");
    list.className = "aa-pinned-list";
    pinnedNames.forEach((baseModelName) => {
      const card = document.createElement("article"); card.className = "aa-pinned-card";
      const header = document.createElement("div"); header.className = "aa-pinned-card-header";
      const removeButton = document.createElement("button");
      removeButton.className = "aa-link-button"; removeButton.type = "button"; removeButton.textContent = "移除";
      removeButton.addEventListener("click", () => setBaseModelPinned(baseModelName, false));
      header.append(textElement("b", "aa-truncate", baseModelName), removeButton); card.append(header);
      for (const identity of pinnedModelIdentities) {
        const model = allModelRecordsByIdentity.get(identity);
        if (!model || model.base_model_name !== baseModelName) continue;
        const currentIndex = displayedModelMarkers.findIndex((candidate) => stableModelIdentity(candidate) === identity);
        const variant = textElement("div", "aa-pinned-variant-card", `${model.name} · 智能 ${formatNumber(model.panel.intelligence, 1)} · ${model.reasoning_level_label}`);
        const reasons = [];
        if (currentIndex < 0) {
          const excluded = (activeMetricVariant.excluded_models_with_drop_reason || []).find((candidate) => candidate.name === model.name);
          reasons.push(`当前口径未上图：${excluded?.drop_reason || "缺少可显示坐标或已被剪枝"}`);
        } else if (!modelMarkerIsCurrentlyVisible(currentIndex)) reasons.push("已被当前筛选隐藏");
        if (currentIndex >= 0 && !modelIsAnalysisEligibleForActiveMetricVariant(displayedModelMarkers[currentIndex])) {
          variant.classList.add("is-historical-intelligence-index-version");
          reasons.push(historicalIntelligenceIndexVersionReasonText(model));
        }
        if (reasons.length) {
          variant.classList.add("is-hidden-by-current-filter");
          variant.append(textElement("div", "aa-historical-intelligence-index-version-reason-note", reasons.join("；")));
        }
        if (!model.model_uuid) variant.append(textElement("div", "aa-muted", "旧契约缺少 UUID，重新生成后可按稳定身份固定"));
        card.append(variant);
      }
      list.append(card);
    });
    pinnedModelsPanel.replaceChildren(title, list);
  }

  function buildStandoutPanel() {
    const panel = createControlSection("aa-standout-panel", "突出度");
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
      slider.addEventListener("input", () => {
        standoutAxisWeights[axisName] = Math.pow(2, Number(slider.value));
        number.value = standoutAxisWeights[axisName].toFixed(2);
        applyStandoutVisualEncoding();
      });
      number.addEventListener("input", () => {
        const weight = Math.min(4, Math.max(0.25, Number(number.value)));
        if (!Number.isFinite(weight)) return;
        standoutAxisWeights[axisName] = weight;
        slider.value = String(Math.log2(weight));
        applyStandoutVisualEncoding();
      });
      row.append(label, slider, number);
      weightBlock.appendChild(row);
      standoutWeightControls[axisName] = { slider, number };
    });
    const rankingTitle = document.createElement("h3");
    rankingTitle.className = "aa-section-title";
    rankingTitle.textContent = "前沿排行 Top 12";
    standoutRankingList = document.createElement("div");
    standoutRankingList.id = "aa-standout-ranking";
    standoutRankingList.className = "aa-ranking-list";
    panel.append(weightBlock, rankingTitle, standoutRankingList);
    renderStandoutWeightControlsVisibility();
    return panel;
  }

  function renderStandoutWeightControlsVisibility() {
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
      ["模型数", String(displayedModelMarkers.length)],
      ["参与分析", String(displayedModelMarkers.length - historicalModelCount)],
      ["历史口径点", String(historicalModelCount)],
      ["全局 Pareto 数", String(frontierModels().length)],
      ["可见 Pareto 数", String(frontierModels().filter((model) => modelMarkerIsCurrentlyVisible(modelIndexByModelName[model.name])).length)],
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
    const reportHeaderChildren = [reportTitle, howToReadDrawerToggleButton, headerMetadataRow];
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
      visibleModelCount === displayedModelCount
        ? `显示 ${displayedModelCount} 个模型`
        : `显示 ${visibleModelCount}/${displayedModelCount} 个模型`,
      `全局 Pareto ${frontierModels().length}`,
      `可见 Pareto ${frontierModels().filter((model) => modelMarkerIsCurrentlyVisible(modelIndexByModelName[model.name])).length}`,
    ];
    if (historicalModelCount) summaryParts.push(`历史口径 ${historicalModelCount}`);
    reportHeaderModelCountSummary.textContent = summaryParts.join(" · ");
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
          "带深色圆环的点是本口径的 Pareto 点：没有其他模型在成本、速度、智能上同时不差且至少一维更好。线框与实心面只由这些点生成，仅作视觉导引。",
        ),
      ),
      howToReadDrawerSection("历史口径点", historicalExplanation),
      howToReadDrawerSection("数据来源", provenanceDefinitions),
    );
  }

  function setSidePanelExpanded(nextExpanded) {
    sidePanelExpanded = Boolean(nextExpanded);
    reportShell.classList.toggle("is-side-panel-collapsed", !sidePanelExpanded);
    sidePanelToggleButton.textContent = sidePanelExpanded ? ">" : "<";
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
      buildStandoutMetricControl(),
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
    body.append(
      buildSearchPanel(),
      buildOrganizationFilterPanel(),
      buildPinnedModelsPanel(),
      buildStandoutPanel(),
      buildCurrentViewPanel(),
    );
    sidePanel.replaceChildren(header, body);
    renderStandoutWeightControlsVisibility();
    setSidePanelExpanded(true);
  }

  function resizeThreeDimensionalRenderer() {
    const width = Math.max(1, graphContainer.clientWidth);
    const height = Math.max(1, graphContainer.clientHeight);
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    if (webglRenderer.getPixelRatio() !== pixelRatio) webglRenderer.setPixelRatio(pixelRatio);
    webglRenderer.setSize(width, height, false);
    for (const line of [transientLineageLineObject, transientReasoningVariantLineObject, transientSameGenerationLineObject]) line?.material.resolution.set(width, height);
    perspectiveCamera.aspect = width / height;
    perspectiveCamera.updateProjectionMatrix();
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
    const visibleOrganizationCount = [...organizationNames].filter(
      (creatorName) => currentOrganizationVisibility(creatorName),
    ).length;
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
    };
  }

  buildUserInterface();
  loadActiveMetricVariant(activeMetricVariantKey, false);
  resizeThreeDimensionalRenderer();

  window.frontierThreeDimensionalVisualizationState =
    frontierThreeDimensionalVisualizationState;
  window.pinFrontierBaseModel = (baseModelName) => setBaseModelPinned(baseModelName, true);
  window.unpinFrontierBaseModel = (baseModelName) => setBaseModelPinned(baseModelName, false);
  window.togglePinnedFrontierBaseModel = togglePinnedBaseModelName;
  window.showFrontierLineageForModelName = (modelName) => {
    const modelIndex = modelIndexByModelName[modelName];
    if (modelIndex === undefined) return false;
    setHoveredModelIndex(modelIndex);
    return true;
  };
  window.clearFrontierHoverState = () => setHoveredModelIndex(null);
  window.matchingFrontierBaseModelNames = matchingBaseModelNames;
  window.setFrontierMetricCombination = activateMetricCombination;
  window.setParetoFrontierVisualizationStyle = setFrontierStyle;
  window.setAchievableFrontierSurfaceVisibility =
    setAchievableFrontierSurfaceVisible;
  window.setCountryRegionMarkerVisibility = setCountryRegionMarkerVisible;
  window.setShowOnlyCurrentIntelligenceIndexVersionComparableModels =
    setShowOnlyCurrentIntelligenceIndexVersionComparableModels;
  window.setFrontierHowToReadDrawerOpen = setHowToReadDrawerOpen;
  window.setFrontierSidePanelExpanded = setSidePanelExpanded;
  window.selectFrontierStandoutMetric = selectFrontierStandoutMetric;
  window.setFrontierStandoutAxisWeights = setStandoutAxisWeights;
  window.frontierStandoutRanking = frontierStandoutRanking;
  window.frontierThreeDimensionalRendererDiagnostics = {
    get surfaceMaterialForVisibilityVerification() { return frontierSurfaceObject?.material; },
    get surfaceRenderOrder() { return frontierSurfaceObject?.renderOrder; },
    markerVisualEncodingSummary: () => modelVisualObjectsByModelIndex.map((objects, index) => ({
      isPareto: displayedModelMarkers[index].panel?.layer === 1,
      paretoRingScale: objects.paretoRingSprite.scale.x,
      backplateScale: objects.backplateSprite.scale.x,
      standoutHaloVisible: objects.standoutHaloSprite.visible,
      standoutHaloScale: objects.standoutHaloSprite.scale.x,
    })),
    camera: perspectiveCamera,
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
