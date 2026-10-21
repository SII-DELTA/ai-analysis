import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME,
  FRONTIER_STANDOUT_METRIC_NAMES,
  calculateFrontierStandoutMetricValues,
} from "./frontier_3d_threejs_standout_metric_calculator.js";

(function initializeFrontierThreeDimensionalInteractiveReport() {
  "use strict";

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
  window.THREE = THREE;

  const threeScene = new THREE.Scene();
  threeScene.background = new THREE.Color(0xffffff);
  const perspectiveCamera = new THREE.PerspectiveCamera(42, 1, 0.01, 100);
  perspectiveCamera.up.set(0, 0, 1);
  const webglRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    preserveDrawingBuffer: true,
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
  let sidePanelExpanded = true;
  let hoveredModelIndex = null;
  let hoveredPrunedLineageAncestorName = null;
  let hoveredLineageKey = null;
  let hoveredReasoningBaseModelName = null;
  let pinnedBaseModelNames = new Set();
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
    const projectToCanvas = (position) => {
      const projected = position.clone().project(perspectiveCamera);
      return new THREE.Vector2(
        (projected.x + 1) * canvasWidth / 2,
        (1 - projected.y) * canvasHeight / 2,
      );
    };
    const projectedCenter = projectToCanvas(new THREE.Vector3());
    const occupiedLabelRectangles = [];
    // 先布局完整轴名，再让拥挤刻度让位，避免窄屏上数值遮住单位。
    for (const renderTitles of [true, false]) {
      axisAnnotations.forEach(({ start, end, labels }) => {
        const projectedStart = projectToCanvas(start);
        const projectedEnd = projectToCanvas(end);
        const axisDirection = projectedEnd.clone().sub(projectedStart);
        const outwardDirection = new THREE.Vector2(-axisDirection.y, axisDirection.x).normalize();
        const projectedMidpoint = projectToCanvas(start.clone().lerp(end, 0.5));
        if (outwardDirection.dot(projectedMidpoint.sub(projectedCenter)) < 0) {
          outwardDirection.negate();
        }
        let titleAngle = Math.atan2(axisDirection.y, axisDirection.x) * 180 / Math.PI;
        if (titleAngle > 90) titleAngle -= 180;
        if (titleAngle < -90) titleAngle += 180;
        labels.filter(({ isTitle }) => isTitle === renderTitles).forEach(({ element, position, isTitle }) => {
          const projected = position.clone().project(perspectiveCamera);
          element.hidden = projected.z < -1 || projected.z > 1 || axisDirection.length() < 1;
          if (element.hidden) return;
          const anchorPosition = projectToCanvas(position);
          element.style.transform = `translate(-50%, -50%) rotate(${isTitle ? titleAngle : 0}deg)`;
          const measuredBounds = element.getBoundingClientRect();
          const halfWidth = measuredBounds.width / 2;
          const halfHeight = measuredBounds.height / 2;
          const labelDirection = isTitle ? axisDirection.clone().normalize() : new THREE.Vector2(1, 0);
          const labelNormal = new THREE.Vector2(-labelDirection.y, labelDirection.x);
          const labelRectangle = {
            directions: [labelDirection, labelNormal],
            halfSizes: [element.offsetWidth / 2, element.offsetHeight / 2],
          };
          const preferredFraction = anchorPosition.clone().sub(projectedStart).dot(axisDirection) / axisDirection.lengthSq();
          let selectedLabelPosition = null;
          // 标题可沿同一轴的可见片段滑动；刻度始终保留自己的真实投影锚点。
          for (const offset of isTitle ? [48, 24, -48, -24, 0] : [16, -16, 8, -8, 0]) {
            let minimumFraction = isTitle ? 0 : preferredFraction;
            let maximumFraction = isTitle ? 1 : preferredFraction;
            for (const [coordinate, canvasSize, halfSize] of [
              ["x", canvasWidth, halfWidth], ["y", canvasHeight, halfHeight],
            ]) {
              const minimumAnchor = Math.max(0, halfSize + 2 - outwardDirection[coordinate] * offset);
              const maximumAnchor = Math.min(canvasSize, canvasSize - halfSize - 2 - outwardDirection[coordinate] * offset);
              const direction = axisDirection[coordinate];
              if (Math.abs(direction) < 1e-8) {
                if (projectedStart[coordinate] < minimumAnchor || projectedStart[coordinate] > maximumAnchor) {
                  maximumFraction = -1;
                }
              } else {
                const firstFraction = (minimumAnchor - projectedStart[coordinate]) / direction;
                const lastFraction = (maximumAnchor - projectedStart[coordinate]) / direction;
                minimumFraction = Math.max(minimumFraction, Math.min(firstFraction, lastFraction));
                maximumFraction = Math.min(maximumFraction, Math.max(firstFraction, lastFraction));
              }
              if (minimumAnchor > maximumAnchor) maximumFraction = -1;
            }
            if (minimumFraction > maximumFraction) continue;
            const preferredVisibleFraction = THREE.MathUtils.clamp(preferredFraction, minimumFraction, maximumFraction);
            for (const fraction of isTitle
              ? [preferredVisibleFraction, minimumFraction, maximumFraction]
              : [preferredFraction]) {
              const candidate = projectedStart.clone().addScaledVector(axisDirection, fraction)
                .addScaledVector(outwardDirection, offset);
              // 用旋转矩形的分离轴判定相交，不能把斜标题的整个外接框都当作遮挡。
              if (canvasWidth < 900 && occupiedLabelRectangles.some((other) => ![...labelRectangle.directions, ...other.directions]
                .some((direction) => {
                  const projectedHalfSize = (rectangle) => rectangle.directions.reduce(
                    (sum, rectangleDirection, index) => sum + Math.abs(rectangleDirection.dot(direction)) * rectangle.halfSizes[index], 0,
                  );
                  return Math.abs(candidate.clone().sub(other.center).dot(direction)) >=
                    projectedHalfSize(labelRectangle) + projectedHalfSize(other) + 2;
                }))) continue;
              selectedLabelPosition = candidate;
              occupiedLabelRectangles.push({ ...labelRectangle, center: candidate });
              break;
            }
            if (selectedLabelPosition) break;
          }
          element.hidden = !selectedLabelPosition;
          if (selectedLabelPosition) {
            element.style.left = `${selectedLabelPosition.x}px`;
            element.style.top = `${selectedLabelPosition.y}px`;
          }
        });
      });
    }
  }

  function axisTickValues(axisConfiguration) {
    const [minimum, maximum] = axisConfiguration.fixed_range.map(Number);
    const span = maximum - minimum;
    if (!Number.isFinite(span) || span <= 0) return [];
    if (axisConfiguration.scale_type === "log" && span >= 1) {
      const exponentStep = Math.max(1, Math.ceil(span / 6));
      const values = [];
      for (let exponent = Math.ceil(minimum); exponent <= maximum; exponent += exponentStep) {
        values.push(10 ** exponent);
      }
      if (values.length >= 3) return values;
      // 整数幂不足时补入 2、5 倍刻度，避免线性步长挤在对数轴高值端。
      values.length = 0;
      for (let exponent = Math.floor(minimum); exponent <= maximum; exponent += 1) {
        for (const multiplier of [1, 2, 5]) {
          const scaledValue = exponent + Math.log10(multiplier);
          if (scaledValue >= minimum && scaledValue <= maximum) {
            values.push(Number((multiplier * 10 ** exponent).toPrecision(12)));
          }
        }
      }
      return values;
    }
    // 窄对数区间在原始数值上选刻度，再用与模型相同的变换定位。
    const rawMinimum = axisConfiguration.scale_type === "log" ? 10 ** minimum : minimum;
    const rawMaximum = axisConfiguration.scale_type === "log" ? 10 ** maximum : maximum;
    const approximateStep = (rawMaximum - rawMinimum) / 5;
    const magnitude = 10 ** Math.floor(Math.log10(approximateStep));
    let step = [1, 2, 5, 10].find((factor) => factor * magnitude >= approximateStep) * magnitude;
    // 向上取整的间隔可能只留下两个刻度；减半补足覆盖，已有密集刻度保持不变。
    if (Math.floor(rawMaximum / step) - Math.ceil(rawMinimum / step) < 2) step /= 2;
    const values = [];
    for (let index = Math.ceil(rawMinimum / step); index <= Math.floor(rawMaximum / step); index += 1) {
      values.push(Number((index * step).toPrecision(12)));
    }
    return values;
  }

  function requestThreeDimensionalSceneRender() {
    if (renderFrameRequested) return;
    renderFrameRequested = true;
    window.requestAnimationFrame(() => {
      renderFrameRequested = false;
      webglRenderer.render(threeScene, perspectiveCamera);
      updateProjectedAxisAnnotations();
    });
  }

  orbitControls.addEventListener("change", requestThreeDimensionalSceneRender);

  function clearThreeObjectGroup(group) {
    while (group.children.length) {
      const child = group.children.pop();
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
    if (!isFinite(scaledValue) || maximumValue === minimumValue) return 0;
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
      depthWrite: true,
      ...materialOptions,
    });
    return new THREE.Mesh(geometry, material);
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
  const prunedLineageAncestorMaterial = spriteMaterial(
    prunedLineageAncestorTexture,
  );
  const countryRegionMaterials = Object.fromEntries(
    Object.entries(countryRegionTextures).map(([key, texture]) => [key, spriteMaterial(texture)]),
  );
  [
    whiteLogoBackplateMaterial,
    historicalIntelligenceIndexVersionLogoBackplateMaterial,
    paretoRingMaterial,
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
    return modelMarkerHiddenReasonTexts(modelIndex).length === 0;
  }

  function modelMarkerHiddenReasonTexts(modelIndex) {
    const model = displayedModelMarkers[modelIndex];
    if (!model) return [];
    const reasons = [];
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
        0.15,
        10,
      );
      paretoRingSprite.visible = model.panel.layer === 1;
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
        pinnedRingSprite,
      });
    });
    applyModelMarkerVisibilityAndRefreshDependentViews();
    applyPinnedModelVisualEncoding();
    applyStandoutVisualEncoding();
  }

  // 统一更新筛选及其关联视图；只改变可见性，不重建坐标轴、几何或突出度计算集合。
  function applyModelMarkerVisibilityAndRefreshDependentViews() {
    if (hoveredModelIndex !== null && !modelMarkerIsCurrentlyVisible(hoveredModelIndex)) {
      setHoveredModelIndex(null);
    }
    modelVisualObjectsByModelIndex.forEach((visualObjects, modelIndex) => {
      const model = displayedModelMarkers[modelIndex];
      const markerVisible = modelMarkerIsCurrentlyVisible(modelIndex);
      visualObjects.logoSprite.visible = markerVisible;
      visualObjects.backplateSprite.visible = markerVisible;
      visualObjects.countryRegionSprite.visible =
        markerVisible && countryRegionMarkerVisible;
      visualObjects.paretoRingSprite.visible =
        markerVisible && model.panel?.layer === 1;
      visualObjects.pinnedRingSprite.visible =
        markerVisible && pinnedBaseModelNames.has(model.base_model_name);
    });
    renderReportHeaderModelCountSummary();
    renderCurrentView();
    refreshOrganizationAndCountryRegionVisibleModelCounts();
    renderPinnedModelsPanel();
    // 可见性变了，pin/悬停的连线、搜索结果的「已隐藏」标注都要跟着重算
    redrawHoveredAndPinnedRelationships();
    renderSearchResults();
    requestThreeDimensionalSceneRender();
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
  function lineageNodeMarkerIsCurrentlyDrawn(lineageNode) {
    if (!lineageNode.kept) return true;
    const modelIndex = modelIndexByModelName[lineageNode.name];
    return modelIndex !== undefined && modelMarkerIsCurrentlyVisible(modelIndex);
  }

  function redrawHoveredAndPinnedRelationships() {
    clearThreeObjectGroup(transientRelationshipGroup);
    clickablePrunedLineageAncestorSprites = [];
    transientLineageLineObject = null;
    transientReasoningVariantLineObject = null;
    const lineageKeys = new Set();
    pinnedBaseModelNames.forEach((baseModelName) => {
      const modelIndices = baseGroupsByBaseModelName[baseModelName] || [];
      if (modelIndices.length) lineageKeys.add(displayedModelMarkers[modelIndices[0]].lineage_key);
    });
    if (hoveredLineageKey) lineageKeys.add(hoveredLineageKey);
    const lineagePositionPairs = [];
    const displayedPrunedAncestorNames = new Set();
    lineageKeys.forEach((lineageKey) => {
      const nodes = lineagesByOrganizationAndTier[lineageKey] || [];
      nodes.forEach((lineageNode) => {
        if (lineageNode.kept || displayedPrunedAncestorNames.has(lineageNode.name)) {
          return;
        }
        displayedPrunedAncestorNames.add(lineageNode.name);
        const ancestorSprite = new THREE.Sprite(prunedLineageAncestorMaterial);
        ancestorSprite.position.copy(
          normalizedThreeDimensionalPosition(
            lineageNode.x,
            lineageNode.y,
            lineageNode.z,
          ),
        );
        ancestorSprite.scale.set(0.09, 0.09, 1);
        ancestorSprite.renderOrder = 35;
        ancestorSprite.userData = {
          sharedMaterial: true,
          interactionTargetKind: "pruned_lineage_ancestor",
          lineageKey,
          prunedLineageAncestorNode: lineageNode,
        };
        transientRelationshipGroup.add(ancestorSprite);
        clickablePrunedLineageAncestorSprites.push(ancestorSprite);
      });
      for (let index = 1; index < nodes.length; index += 1) {
        const previousNode = nodes[index - 1];
        const currentNode = nodes[index];
        if (
          !lineageNodeMarkerIsCurrentlyDrawn(previousNode) ||
          !lineageNodeMarkerIsCurrentlyDrawn(currentNode)
        ) {
          continue;
        }
        lineagePositionPairs.push(
          normalizedThreeDimensionalPosition(previousNode.x, previousNode.y, previousNode.z),
          normalizedThreeDimensionalPosition(currentNode.x, currentNode.y, currentNode.z),
        );
      }
    });
    if (lineagePositionPairs.length) {
      transientLineageLineObject = lineObjectFromPositionPairs(
        lineagePositionPairs,
        0x475569,
        4,
      );
      transientRelationshipGroup.add(transientLineageLineObject);
    }

    const reasoningBaseModelNames = new Set(pinnedBaseModelNames);
    if (hoveredReasoningBaseModelName) {
      reasoningBaseModelNames.add(hoveredReasoningBaseModelName);
    }
    const reasoningPositionPairs = [];
    reasoningBaseModelNames.forEach((baseModelName) => {
      const modelIndices =
        reasoningVariantGroupsByBaseModelName[baseModelName] ||
        baseGroupsByBaseModelName[baseModelName] ||
        [];
      for (let index = 1; index < modelIndices.length; index += 1) {
        // 相邻两档都可见才连线：被隐藏（或坐标非有限）的档位不留两端无点的悬空线段
        if (
          !modelMarkerIsCurrentlyVisible(modelIndices[index - 1]) ||
          !modelMarkerIsCurrentlyVisible(modelIndices[index])
        ) {
          continue;
        }
        const previousModel = displayedModelMarkers[modelIndices[index - 1]];
        const currentModel = displayedModelMarkers[modelIndices[index]];
        reasoningPositionPairs.push(
          normalizedThreeDimensionalPosition(previousModel.x, previousModel.y, previousModel.z),
          normalizedThreeDimensionalPosition(currentModel.x, currentModel.y, currentModel.z),
        );
      }
    });
    if (reasoningPositionPairs.length) {
      transientReasoningVariantLineObject = lineObjectFromPositionPairs(
        reasoningPositionPairs,
        0xa836aa,
        4,
      );
      transientRelationshipGroup.add(transientReasoningVariantLineObject);
    }
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
      "谱系前身 · 已从主散点裁剪",
      `发布：${escapeHtml(lineageNode.release_date)}`,
      `智能：${formatNumber(lineageNode.intelligence, 1)}`,
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
    if (value === null || value === undefined || !isFinite(Number(value))) return "?";
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
    return intersections.length ? intersections[0].object.userData : null;
  }

  function interactionTargetAtPointerEvent(pointerEvent) {
    return interactionTargetAtCanvasClientCoordinates(
      pointerEvent.clientX,
      pointerEvent.clientY,
    );
  }

  function applyHoveredInteractionTarget(interactionTarget, pointerEvent) {
    if (!interactionTarget) {
      setHoveredModelIndex(null, pointerEvent);
      return;
    }
    if (interactionTarget.interactionTargetKind === "displayed_model") {
      setHoveredModelIndex(interactionTarget.modelIndex, pointerEvent);
      return;
    }
    setHoveredPrunedLineageAncestor(
      interactionTarget.lineageKey,
      interactionTarget.prunedLineageAncestorNode,
      pointerEvent,
    );
  }

  const POINTER_DRAG_CLICK_SUPPRESSION_DISTANCE_IN_CSS_PIXELS = 5;
  const POINTER_DRAG_CLICK_SUPPRESSION_DISTANCE_SQUARED =
    POINTER_DRAG_CLICK_SUPPRESSION_DISTANCE_IN_CSS_PIXELS ** 2;
  let activePrimaryPointerPress = null;
  let suppressNextCanvasClickAfterPointerDrag = false;
  let latestPointerMoveEvent = null;
  let pendingPointerMoveFrame = null;
  webglRenderer.domElement.addEventListener("pointerdown", (pointerEvent) => {
    if (pointerEvent.button !== 0) return;
    activePrimaryPointerPress = {
      pointerId: pointerEvent.pointerId,
      clientX: pointerEvent.clientX,
      clientY: pointerEvent.clientY,
    };
    suppressNextCanvasClickAfterPointerDrag = false;
  });
  webglRenderer.domElement.addEventListener("pointermove", (pointerEvent) => {
    if (
      activePrimaryPointerPress?.pointerId === pointerEvent.pointerId &&
      (pointerEvent.clientX - activePrimaryPointerPress.clientX) ** 2 +
        (pointerEvent.clientY - activePrimaryPointerPress.clientY) ** 2 >=
        POINTER_DRAG_CLICK_SUPPRESSION_DISTANCE_SQUARED
    ) {
      suppressNextCanvasClickAfterPointerDrag = true;
    }
    latestPointerMoveEvent = pointerEvent;
    if (pendingPointerMoveFrame !== null) return;
    pendingPointerMoveFrame = window.requestAnimationFrame(() => {
      pendingPointerMoveFrame = null;
      const pointerEventToProcess = latestPointerMoveEvent;
      latestPointerMoveEvent = null;
      if (!pointerEventToProcess) return;
      applyHoveredInteractionTarget(
        interactionTargetAtPointerEvent(pointerEventToProcess),
        pointerEventToProcess,
      );
    });
  });
  function clearActivePrimaryPointerPress(pointerEvent) {
    if (activePrimaryPointerPress?.pointerId === pointerEvent.pointerId) {
      activePrimaryPointerPress = null;
    }
  }
  webglRenderer.domElement.addEventListener(
    "pointerup",
    clearActivePrimaryPointerPress,
  );
  webglRenderer.domElement.addEventListener(
    "pointercancel",
    clearActivePrimaryPointerPress,
  );
  webglRenderer.domElement.addEventListener("pointerleave", () => {
    if (pendingPointerMoveFrame !== null) {
      window.cancelAnimationFrame(pendingPointerMoveFrame);
      pendingPointerMoveFrame = null;
    }
    latestPointerMoveEvent = null;
    setHoveredModelIndex(null);
  });
  webglRenderer.domElement.addEventListener("click", (pointerEvent) => {
    if (suppressNextCanvasClickAfterPointerDrag) {
      suppressNextCanvasClickAfterPointerDrag = false;
      return;
    }
    const interactionTarget = interactionTargetAtPointerEvent(pointerEvent);
    if (interactionTarget?.interactionTargetKind !== "displayed_model") return;
    togglePinnedBaseModelName(
      displayedModelMarkers[interactionTarget.modelIndex].base_model_name,
    );
  });

  function applyPinnedModelVisualEncoding() {
    modelVisualObjectsByModelIndex.forEach((visualObjects, modelIndex) => {
      const model = displayedModelMarkers[modelIndex];
      visualObjects.pinnedRingSprite.visible =
        modelMarkerIsCurrentlyVisible(modelIndex) &&
        pinnedBaseModelNames.has(model.base_model_name);
    });
    redrawHoveredAndPinnedRelationships();
    renderPinnedModelsPanel();
    requestThreeDimensionalSceneRender();
  }

  function togglePinnedBaseModelName(baseModelName) {
    if (pinnedBaseModelNames.has(baseModelName)) {
      pinnedBaseModelNames.delete(baseModelName);
    } else {
      pinnedBaseModelNames.add(baseModelName);
    }
    applyPinnedModelVisualEncoding();
    renderSearchResults();
    return Promise.resolve(true);
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
    const finiteValues = values.filter((value) => isFinite(value));
    const minimumValue = finiteValues.length ? Math.min(...finiteValues) : 0;
    const maximumValue = finiteValues.length ? Math.max(...finiteValues) : 1;
    latestStandoutValuesByModelName = {};
    models.forEach((model, frontierModelIndex) => {
      const value = values[frontierModelIndex];
      latestStandoutValuesByModelName[model.name] = value;
      const displayedModelIndex = modelIndexByModelName[model.name];
      const paretoRingSprite =
        modelVisualObjectsByModelIndex[displayedModelIndex]?.paretoRingSprite;
      if (!paretoRingSprite) return;
      const normalizedValue =
        isFinite(value) && maximumValue > minimumValue
          ? (value - minimumValue) / (maximumValue - minimumValue)
          : 0.45;
      const scale = 0.145 + normalizedValue * 0.065;
      paretoRingSprite.scale.set(scale, scale, 1);
    });
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
        const leftValue = isFinite(left.value) ? left.value : -Infinity;
        const rightValue = isFinite(right.value) ? right.value : -Infinity;
        return rightValue - leftValue;
      })
      .slice(0, 12);
    standoutRankingList.replaceChildren(
      ...rankedRows.map((row, index) => {
        const rankingRow = document.createElement("div");
        rankingRow.className = "aa-ranking-row";
        const modelName = document.createElement("span");
        modelName.className = "aa-truncate";
        modelName.textContent = `${index + 1}. ${row.model.name}`;
        const value = document.createElement("b");
        value.className = "aa-ranking-value";
        value.textContent = isFinite(row.value)
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

    pinnedBaseModelNames = new Set();
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
    const normalizedQuery = String(query || "").trim().toLocaleLowerCase();
    if (!normalizedQuery) return [];
    return allBaseModelNames
      .filter((baseModelName) =>
        baseModelName.toLocaleLowerCase().includes(normalizedQuery),
      )
      .slice(0, 40);
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
        const hiddenModelIndices = baseModelIndices.filter((modelIndex) =>
          !modelMarkerIsCurrentlyVisible(modelIndex),
        );
        if (hiddenModelIndices.length) {
          const reasons = [...new Set(hiddenModelIndices.flatMap(modelMarkerHiddenReasonTexts))];
          const hiddenNote = `（${hiddenModelIndices.length}/${baseModelIndices.length} 档位已隐藏：${reasons.join("、")}）`;
          row.classList.add("is-hidden-by-model-visibility-filter");
          if (showOnlyCurrentIntelligenceIndexVersionComparableModels &&
              baseModelIndices.every((modelIndex) => !modelIsAnalysisEligibleForActiveMetricVariant(displayedModelMarkers[modelIndex]))) {
            row.classList.add("is-hidden-by-comparable-only-toggle");
          }
          row.title = hiddenNote;
          name.append(
            textElement("span", "aa-search-result-hidden-note", hiddenNote),
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

  function renderPinnedModelsPanel() {
    if (!pinnedModelsPanel) return;
    const pinnedNames = [...pinnedBaseModelNames].sort((left, right) =>
      left.localeCompare(right),
    );
    pinnedModelsPanel.style.display = pinnedNames.length ? "block" : "none";
    const title = document.createElement("h2");
    title.className = "aa-section-title";
    title.textContent = `已固定（${pinnedNames.length}）`;
    const list = document.createElement("div");
    list.className = "aa-pinned-list";
    pinnedNames.forEach((baseModelName) => {
      const card = document.createElement("article");
      card.className = "aa-pinned-card";
      const header = document.createElement("div");
      header.className = "aa-pinned-card-header";
      const name = document.createElement("b");
      name.className = "aa-truncate";
      name.textContent = baseModelName;
      const removeButton = document.createElement("button");
      removeButton.className = "aa-link-button";
      removeButton.type = "button";
      removeButton.textContent = "移除";
      removeButton.addEventListener("click", () => togglePinnedBaseModelName(baseModelName));
      header.append(name, removeButton);
      card.appendChild(header);
      (baseGroupsByBaseModelName[baseModelName] || []).forEach((modelIndex) => {
        const model = displayedModelMarkers[modelIndex];
        const variant = document.createElement("div");
        variant.className = "aa-pinned-variant-card";
        const variantSummary = document.createElement("div");
        variantSummary.textContent = `${model.name} · 智能 ${formatNumber(model.panel.intelligence, 1)} · ${model.reasoning_level_label}`;
        variant.appendChild(variantSummary);
        const hiddenReasons = modelMarkerHiddenReasonTexts(modelIndex);
        if (hiddenReasons.length) {
          variant.appendChild(textElement("div", "aa-muted", `已隐藏：${hiddenReasons.join("、")}`));
        }
        if (!modelIsAnalysisEligibleForActiveMetricVariant(model)) {
          variant.classList.add("is-historical-intelligence-index-version");
          const reasonNote = document.createElement("div");
          reasonNote.className = "aa-historical-intelligence-index-version-reason-note";
          reasonNote.textContent = historicalIntelligenceIndexVersionReasonText(model);
          variant.appendChild(reasonNote);
        }
        card.appendChild(variant);
      });
      list.appendChild(card);
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
        if (!isFinite(weight)) return;
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
      ["可见 / 契约模型数", `${displayedModelMarkers.filter((model, modelIndex) => modelMarkerIsCurrentlyVisible(modelIndex)).length} / ${displayedModelMarkers.length}`],
      ["参与分析（契约全集）", String(displayedModelMarkers.length - historicalModelCount)],
      ["历史口径点", String(historicalModelCount)],
      ["Pareto 数", String(frontierModels().length)],
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
      `Pareto ${frontierModels().length}`,
    ];
    const visibleHistoricalCount = displayedModelMarkers.filter((model, modelIndex) =>
      !modelIsAnalysisEligibleForActiveMetricVariant(model) && modelMarkerIsCurrentlyVisible(modelIndex),
    ).length;
    if (historicalModelCount) summaryParts.push(`历史口径 ${visibleHistoricalCount === historicalModelCount ? historicalModelCount : `${visibleHistoricalCount}/${historicalModelCount}`}`);
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
    webglRenderer.setSize(width, height, false);
    perspectiveCamera.aspect = width / height;
    perspectiveCamera.updateProjectionMatrix();
    requestThreeDimensionalSceneRender();
  }

  const resizeObserver = new ResizeObserver(resizeThreeDimensionalRenderer);
  resizeObserver.observe(graphContainer);

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
    const visibleOrganizationCount = new Set(displayedModelMarkers.filter(
      (model, modelIndex) => modelMarkerIsCurrentlyVisible(modelIndex),
    ).map((model) => model.creator)).size;
    const lineagePositionCount = transientLineageLineObject
      ? transientLineageLineObject.geometry.attributes.position.count
      : 0;
    const reasoningPositionCount = transientReasoningVariantLineObject
      ? transientReasoningVariantLineObject.geometry.attributes.position.count
      : 0;
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
      hoveredLineageKey,
      hoveredReasoningBaseModelName,
      hoveredPrunedLineageAncestorName,
      pinnedModelMarkerCount: displayedModelMarkers.filter((model) =>
        pinnedBaseModelNames.has(model.base_model_name),
      ).length,
      displayedLineageSegmentEndpointCount: lineagePositionCount,
      displayedReasoningVariantSegmentEndpointCount: reasoningPositionCount,
      displayedPrunedLineageAncestorMarkerCount:
        clickablePrunedLineageAncestorSprites.length,
      availableLineageCount: Object.keys(lineagesByOrganizationAndTier).length,
      selectedFrontierStandoutMetricName,
      frontierStandoutAxisWeights: { ...standoutAxisWeights },
      paretoFrontierModelCount: frontierModels().length,
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
      cameraPosition: perspectiveCamera.position.toArray(),
    };
  }

  function lineObjectEndpointPositions(lineObject) {
    if (!lineObject) return [];
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
          const leftValue = isFinite(left.value) ? left.value : -Infinity;
          const rightValue = isFinite(right.value) ? right.value : -Infinity;
          return rightValue - leftValue;
        }),
    };
  }

  buildUserInterface();
  loadActiveMetricVariant(activeMetricVariantKey, false);
  resizeThreeDimensionalRenderer();

  window.frontierThreeDimensionalVisualizationState =
    frontierThreeDimensionalVisualizationState;
  window.pinFrontierBaseModel = (baseModelName) => {
    pinnedBaseModelNames.add(baseModelName);
    applyPinnedModelVisualEncoding();
  };
  window.unpinFrontierBaseModel = (baseModelName) => {
    pinnedBaseModelNames.delete(baseModelName);
    applyPinnedModelVisualEncoding();
  };
  window.togglePinnedFrontierBaseModel = togglePinnedBaseModelName;
  window.showFrontierLineageForModelName = (modelName) => {
    const modelIndex = modelIndexByModelName[modelName];
    if (modelIndex === undefined || !modelMarkerIsCurrentlyVisible(modelIndex)) return false;
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
  window.setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod =
    setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod;
  window.setFrontierHowToReadDrawerOpen = setHowToReadDrawerOpen;
  window.setFrontierSidePanelExpanded = setSidePanelExpanded;
  window.selectFrontierStandoutMetric = selectFrontierStandoutMetric;
  window.setFrontierStandoutAxisWeights = setStandoutAxisWeights;
  window.frontierStandoutRanking = frontierStandoutRanking;
  window.frontierThreeDimensionalRendererDiagnostics = {
    camera: perspectiveCamera,
    controls: orbitControls,
    renderer: webglRenderer,
    requestRender: requestThreeDimensionalSceneRender,
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
