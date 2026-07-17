import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

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
  const textureLoader = new THREE.TextureLoader();

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
  const organizationLogoMaterialsByCreatorName = {};
  let frontierWireframeObject = null;
  let frontierSurfaceObject = null;
  let achievableFrontierSurfaceObject = null;
  let transientLineageLineObject = null;
  let transientReasoningVariantLineObject = null;

  let countryRegionMarkerVisible = false;
  let frontierStyle = "wireframe";
  let achievableFrontierSurfaceVisible = false;
  let sidePanelExpanded = true;
  let hoveredModelIndex = null;
  let hoveredLineageKey = null;
  let hoveredReasoningBaseModelName = null;
  let pinnedBaseModelNames = new Set();
  let hiddenOrganizationCreatorNames = new Set();
  let activeStandoutMetricKey = "C";
  let standoutAxisWeights = { intelligence: 1, cost: 1, speed: 1 };
  let latestStandoutValuesByModelName = {};
  let renderFrameRequested = false;

  let costMetricSelect;
  let speedMetricSelect;
  let countryRegionMarkerToggle;
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

  const axisLabelElements = {
    x: createAxisLabelElement("x"),
    y: createAxisLabelElement("y"),
    z: createAxisLabelElement("z"),
  };

  function createAxisLabelElement(axisName) {
    const element = document.createElement("div");
    element.className = `aa-threejs-axis-label aa-threejs-axis-label-${axisName}`;
    element.setAttribute("aria-hidden", "true");
    plotRegion.appendChild(element);
    return element;
  }

  function requestThreeDimensionalSceneRender() {
    if (renderFrameRequested) return;
    renderFrameRequested = true;
    window.requestAnimationFrame(() => {
      renderFrameRequested = false;
      webglRenderer.render(threeScene, perspectiveCamera);
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
    const boxMinimum = -1;
    const boxMaximum = 1;
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

    const gridPositionPairs = [];
    [-0.5, 0, 0.5].forEach((gridCoordinate) => {
      gridPositionPairs.push(
        corner(boxMinimum, gridCoordinate, boxMinimum),
        corner(boxMaximum, gridCoordinate, boxMinimum),
        corner(gridCoordinate, boxMinimum, boxMinimum),
        corner(gridCoordinate, boxMaximum, boxMinimum),
        corner(boxMinimum, boxMaximum, gridCoordinate),
        corner(boxMaximum, boxMaximum, gridCoordinate),
        corner(boxMinimum, gridCoordinate, boxMinimum),
        corner(boxMinimum, gridCoordinate, boxMaximum),
      );
    });
    const gridObject = lineObjectFromPositionPairs(gridPositionPairs, 0xd8dee6);
    gridObject.material.transparent = true;
    gridObject.material.opacity = 0.72;
    staticAxesAndGridGroup.add(gridObject);

    const axes = activeThreeDimensionalScene.three_dimensional_axis_configuration;
    axisLabelElements.x.textContent = axes.x_axis.title_text;
    axisLabelElements.y.textContent = axes.y_axis.title_text;
    axisLabelElements.z.textContent = axes.z_axis.title_text;
  }

  function splitCoordinateSequenceIntoSegments(xCoordinates, yCoordinates, zCoordinates) {
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

  function triangleMeshObject(meshContract, materialOptions) {
    if (!meshContract || !meshContract.x_coordinates.length) return null;
    const positions = meshContract.x_coordinates.flatMap((xCoordinate, index) =>
      normalizedThreeDimensionalPosition(
        xCoordinate,
        meshContract.y_coordinates[index],
        meshContract.z_coordinates[index],
      ).toArray(),
    );
    const triangleIndices = [];
    for (let triangleIndex = 0; triangleIndex < meshContract.triangle_vertex_index_a.length; triangleIndex += 1) {
      triangleIndices.push(
        meshContract.triangle_vertex_index_a[triangleIndex],
        meshContract.triangle_vertex_index_b[triangleIndex],
        meshContract.triangle_vertex_index_c[triangleIndex],
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
    const wireframeContract =
      activeThreeDimensionalScene.pareto_frontier_wireframe_line_segments;
    const wireframePositionPairs = splitCoordinateSequenceIntoSegments(
      wireframeContract.x_coordinates,
      wireframeContract.y_coordinates,
      wireframeContract.z_coordinates,
    );
    frontierWireframeObject = wireframePositionPairs.length
      ? lineObjectFromPositionPairs(wireframePositionPairs, 0x245c9a, 2)
      : null;
    if (frontierWireframeObject) frontierGeometryGroup.add(frontierWireframeObject);

    frontierSurfaceObject = triangleMeshObject(
      activeThreeDimensionalScene.pareto_frontier_surface_triangle_mesh,
      { color: 0x3182bd, opacity: 0.25, depthWrite: false },
    );
    if (frontierSurfaceObject) frontierGeometryGroup.add(frontierSurfaceObject);

    achievableFrontierSurfaceObject = triangleMeshObject(
      activeThreeDimensionalScene.achievable_frontier_surface_triangle_mesh,
      { color: 0x31a354, opacity: 0.2, depthWrite: false },
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

  function spriteMaterial(texture) {
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      alphaTest: 0.02,
    });
    return material;
  }

  const whiteLogoBackplateMaterial = spriteMaterial(whiteLogoBackplateTexture);
  const paretoRingMaterial = spriteMaterial(paretoRingTexture);
  const pinnedRingMaterial = spriteMaterial(pinnedRingTexture);
  const countryRegionMaterials = Object.fromEntries(
    Object.entries(countryRegionTextures).map(([key, texture]) => [key, spriteMaterial(texture)]),
  );
  [
    whiteLogoBackplateMaterial,
    paretoRingMaterial,
    pinnedRingMaterial,
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

  function buildModelMarkers() {
    clearThreeObjectGroup(modelMarkerGroup);
    modelVisualObjectsByModelIndex = [];
    clickableOrganizationLogoSprites = [];
    displayedModelMarkers.forEach((model, modelIndex) => {
      const position = normalizedThreeDimensionalPosition(model.x, model.y, model.z);
      const identity = organizationIdentityMetadataByCreatorName[model.creator];
      const backplateSprite = addSharedMaterialSprite(
        whiteLogoBackplateMaterial,
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
        const logoTexture = textureLoader.load(
          identity.logo_visualization_data_url,
          (loadedTexture) => {
            loadedTexture.colorSpace = THREE.SRGBColorSpace;
            requestThreeDimensionalSceneRender();
          },
        );
        logoTexture.colorSpace = THREE.SRGBColorSpace;
        logoMaterial = spriteMaterial(logoTexture);
        logoMaterial.userData = { sharedMaterial: true };
        organizationLogoMaterialsByCreatorName[model.creator] = logoMaterial;
      }
      const logoSprite = addSharedMaterialSprite(logoMaterial, position, 0.11, 40);
      logoSprite.userData.modelIndex = modelIndex;
      clickableOrganizationLogoSprites.push(logoSprite);

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
        logoSprite,
        backplateSprite,
        countryRegionSprite,
        paretoRingSprite,
        pinnedRingSprite,
      });
    });
    applyOrganizationVisibilityToModelMarkers();
    applyPinnedModelVisualEncoding();
    applyStandoutVisualEncoding();
  }

  function applyOrganizationVisibilityToModelMarkers() {
    modelVisualObjectsByModelIndex.forEach((visualObjects, modelIndex) => {
      const model = displayedModelMarkers[modelIndex];
      const organizationVisible = currentOrganizationVisibility(model.creator);
      visualObjects.logoSprite.visible = organizationVisible;
      visualObjects.backplateSprite.visible = organizationVisible;
      visualObjects.countryRegionSprite.visible =
        organizationVisible && countryRegionMarkerVisible;
      visualObjects.paretoRingSprite.visible =
        organizationVisible && model.panel.layer === 1;
      visualObjects.pinnedRingSprite.visible =
        organizationVisible && pinnedBaseModelNames.has(model.base_model_name);
    });
    requestThreeDimensionalSceneRender();
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

  function redrawHoveredAndPinnedRelationships() {
    clearThreeObjectGroup(transientRelationshipGroup);
    transientLineageLineObject = null;
    transientReasoningVariantLineObject = null;
    const lineageKeys = new Set();
    pinnedBaseModelNames.forEach((baseModelName) => {
      const modelIndices = baseGroupsByBaseModelName[baseModelName] || [];
      if (modelIndices.length) lineageKeys.add(displayedModelMarkers[modelIndices[0]].lineage_key);
    });
    if (hoveredLineageKey) lineageKeys.add(hoveredLineageKey);
    const lineagePositionPairs = [];
    lineageKeys.forEach((lineageKey) => {
      const nodes = lineagesByOrganizationAndTier[lineageKey] || [];
      for (let index = 1; index < nodes.length; index += 1) {
        const previousNode = nodes[index - 1];
        const currentNode = nodes[index];
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
    return [
      `<strong>${escapeHtml(model.name)}</strong>`,
      `${escapeHtml(model.creator)} · ${countryCategoryLabel}`,
      `发布：${escapeHtml(panel.release_date)}`,
      `智能：${formatNumber(panel.intelligence, 1)}`,
      `${escapeHtml(activeInteractionRelationships.speed_axis_label)}：${formatNumber(panel[activeInteractionRelationships.speed_axis_field], 0)} tok/s`,
      `${escapeHtml(activeInteractionRelationships.cost_axis_label)}：$${formatNumber(panel[activeInteractionRelationships.cost_axis_field], 2)}`,
      `Pareto 层：${formatNumber(panel.layer, 0)}`,
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
    if (nextModelIndex === hoveredModelIndex) {
      if (pointerEvent && !tooltip.hidden) positionTooltip(pointerEvent);
      return;
    }
    hoveredModelIndex = nextModelIndex;
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

  function visibleClickableLogoSprites() {
    return clickableOrganizationLogoSprites.filter((sprite) => sprite.visible);
  }

  function modelIndexAtPointerEvent(pointerEvent) {
    const canvasBounds = webglRenderer.domElement.getBoundingClientRect();
    normalizedPointerCoordinates.x =
      ((pointerEvent.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
    normalizedPointerCoordinates.y =
      -((pointerEvent.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;
    raycaster.setFromCamera(normalizedPointerCoordinates, perspectiveCamera);
    const intersections = raycaster.intersectObjects(visibleClickableLogoSprites(), false);
    return intersections.length ? intersections[0].object.userData.modelIndex : null;
  }

  let pendingPointerMoveFrame = null;
  webglRenderer.domElement.addEventListener("pointermove", (pointerEvent) => {
    if (pendingPointerMoveFrame !== null) return;
    pendingPointerMoveFrame = window.requestAnimationFrame(() => {
      pendingPointerMoveFrame = null;
      setHoveredModelIndex(modelIndexAtPointerEvent(pointerEvent), pointerEvent);
    });
  });
  webglRenderer.domElement.addEventListener("pointerleave", () => {
    setHoveredModelIndex(null);
  });
  webglRenderer.domElement.addEventListener("click", (pointerEvent) => {
    const modelIndex = modelIndexAtPointerEvent(pointerEvent);
    if (modelIndex === null) return;
    togglePinnedBaseModelName(displayedModelMarkers[modelIndex].base_model_name);
  });

  function applyPinnedModelVisualEncoding() {
    modelVisualObjectsByModelIndex.forEach((visualObjects, modelIndex) => {
      const model = displayedModelMarkers[modelIndex];
      visualObjects.pinnedRingSprite.visible =
        currentOrganizationVisibility(model.creator) &&
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

  const standoutMetricRegistry = {
    C: {
      label: "趋势残差",
      digits: 1,
      weighted: false,
      value: (model) => model.standout?.trend_residual,
    },
    B: {
      label: "智能抬升",
      digits: 1,
      weighted: false,
      value: (model) => model.standout?.intelligence_uplift,
    },
    A: { label: "加权超体积", digits: 3, weighted: true },
    D: {
      label: "到前沿垂距",
      digits: 3,
      weighted: false,
      value: (model) => model.standout?.frontier_distance,
    },
  };

  function frontierModels() {
    return displayedModelMarkers.filter((model) => model.panel?.layer === 1);
  }

  function originAnchoredUnionArea(rectangles) {
    const sortedRectangles = rectangles
      .slice()
      .sort((left, right) => right[0] - left[0] || right[1] - left[1]);
    let area = 0;
    let maximumY = 0;
    sortedRectangles.forEach(([x, y]) => {
      if (y > maximumY) {
        area += x * (y - maximumY);
        maximumY = y;
      }
    });
    return area;
  }

  function hypervolumeThreeDimensional(points) {
    if (!points.length) return 0;
    const sortedPoints = points.slice().sort((left, right) => right[2] - left[2]);
    let volume = 0;
    let previousZ = null;
    const rectangles = [];
    sortedPoints.forEach(([x, y, z]) => {
      if (previousZ !== null) {
        volume += originAnchoredUnionArea(rectangles) * (previousZ - z);
      }
      rectangles.push([x, y]);
      previousZ = z;
    });
    return volume + originAnchoredUnionArea(rectangles) * previousZ;
  }

  function weightedExclusiveHypervolumeValues(models) {
    const points = models.map((model) => [
      Math.pow(model.g.c, standoutAxisWeights.cost),
      Math.pow(model.g.s, standoutAxisWeights.speed),
      Math.pow(model.g.i, standoutAxisWeights.intelligence),
    ]);
    const fullVolume = hypervolumeThreeDimensional(points);
    return points.map((unusedPoint, pointIndex) =>
      fullVolume -
      hypervolumeThreeDimensional(
        points.filter((unusedOtherPoint, otherIndex) => pointIndex !== otherIndex),
      ),
    );
  }

  function standoutValuesForFrontierModels(models) {
    const metricDefinition = standoutMetricRegistry[activeStandoutMetricKey];
    if (metricDefinition.weighted) return weightedExclusiveHypervolumeValues(models);
    return models.map((model) => {
      const value = metricDefinition.value(model);
      return value === null || value === undefined || !isFinite(value) ? NaN : value;
    });
  }

  function applyStandoutVisualEncoding() {
    const models = frontierModels();
    const values = standoutValuesForFrontierModels(models);
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
    const metricDefinition = standoutMetricRegistry[activeStandoutMetricKey];
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
          ? Number(row.value).toFixed(metricDefinition.digits)
          : "-";
        rankingRow.append(modelName, value);
        return rankingRow;
      }),
    );
  }

  function selectStandoutMetric(metricKey) {
    if (!standoutMetricRegistry[metricKey]) return Promise.resolve(false);
    activeStandoutMetricKey = metricKey;
    if (standoutMetricSelect) standoutMetricSelect.value = metricKey;
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
    displayedModelMarkers = activeThreeDimensionalScene.displayed_model_markers || [];
    baseGroupsByBaseModelName = activeInteractionRelationships.base_groups || {};
    reasoningVariantGroupsByBaseModelName =
      activeInteractionRelationships.reasoning_variant_group_model_indices_by_base_model_name || {};
    lineagesByOrganizationAndTier = activeInteractionRelationships.lineages || {};
    modelIndexByModelName = {};
    displayedModelMarkers.forEach((model, modelIndex) => {
      modelIndexByModelName[model.name] = modelIndex;
    });
    allBaseModelNames = Object.keys(baseGroupsByBaseModelName).sort((left, right) =>
      left.localeCompare(right),
    );
    window.LINEAGE_DATA = {
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
    renderOrganizationFilterPanel();
    renderPinnedModelsPanel();
    renderSearchResults();
    applyStandoutVisualEncoding();
    requestThreeDimensionalSceneRender();
    return true;
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
    group.append(logoStatus, toggleLabel);
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
    Object.entries(standoutMetricRegistry).forEach(([metricKey, definition]) => {
      const option = document.createElement("option");
      option.value = metricKey;
      option.textContent = definition.label;
      standoutMetricSelect.appendChild(option);
    });
    standoutMetricSelect.value = activeStandoutMetricKey;
    standoutMetricSelect.addEventListener("change", () =>
      selectStandoutMetric(standoutMetricSelect.value),
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
        variant.textContent = `${model.name} · 智能 ${formatNumber(model.panel.intelligence, 1)} · ${model.reasoning_level_label}`;
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
    weightBlock.hidden = !standoutMetricRegistry[activeStandoutMetricKey].weighted;
  }

  function buildCurrentViewPanel() {
    currentViewPanel = document.createElement("details");
    currentViewPanel.id = "aa-current-view-panel";
    currentViewPanel.className = "aa-control-section aa-current-view-details";
    currentViewPanel.open = true;
    return currentViewPanel;
  }

  function renderCurrentView() {
    if (!currentViewPanel || !activeThreeDimensionalScene) return;
    const view = activeThreeDimensionalScene.current_view || {};
    const summary = document.createElement("summary");
    summary.className = "aa-section-title aa-collapsible-summary";
    summary.textContent = "当前视图";
    const definitions = document.createElement("dl");
    definitions.className = "aa-current-view-grid";
    [
      ["渲染器", "three.js"],
      ["数据日期", view.data_date || visualizationDataset.data_date || "?"],
      ["成本口径", view.cost_metric_label || activeInteractionRelationships.cost_axis_label],
      ["速度口径", view.speed_metric_label || activeInteractionRelationships.speed_axis_label],
      ["模型数", String(displayedModelMarkers.length)],
      ["Pareto 数", String(frontierModels().length)],
    ].forEach(([labelText, valueText]) => {
      const term = document.createElement("dt");
      term.textContent = labelText;
      const description = document.createElement("dd");
      description.textContent = valueText;
      definitions.append(term, description);
    });
    currentViewPanel.replaceChildren(summary, definitions);
  }

  function setSidePanelExpanded(nextExpanded) {
    sidePanelExpanded = Boolean(nextExpanded);
    reportShell.classList.toggle("is-side-panel-collapsed", !sidePanelExpanded);
    sidePanelToggleButton.textContent = sidePanelExpanded ? ">" : "<";
    sidePanelToggleButton.setAttribute("aria-expanded", String(sidePanelExpanded));
    window.setTimeout(resizeThreeDimensionalRenderer, 210);
  }

  function buildUserInterface() {
    toolbar.replaceChildren(
      buildMetricControls(),
      buildModelIdentityControls(),
      buildFrontierControls(),
      buildStandoutMetricControl(),
    );
    const header = document.createElement("div");
    header.className = "aa-side-panel-header";
    const title = document.createElement("div");
    title.className = "aa-side-panel-title";
    title.textContent = "Frontier 3D";
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

  function publicState() {
    const visibleModelCount = displayedModelMarkers.filter((model) =>
      currentOrganizationVisibility(model.creator),
    ).length;
    const organizationNames = new Set(displayedModelMarkers.map((model) => model.creator));
    const visibleOrganizationCount = [...organizationNames].filter(
      (creatorName) => currentOrganizationVisibility(creatorName),
    ).length;
    const lineagePositionCount = transientLineageLineObject
      ? transientLineageLineObject.geometry.attributes.position.count
      : 0;
    const reasoningPositionCount = transientReasoningVariantLineObject
      ? transientReasoningVariantLineObject.geometry.attributes.position.count
      : 0;
    return {
      interactiveRenderer: "threejs",
      activeMetricKey: activeMetricVariantKey,
      costAxisField: activeInteractionRelationships.cost_axis_field,
      speedAxisField: activeInteractionRelationships.speed_axis_field,
      displayedModelMarkerCount: displayedModelMarkers.length,
      organizationLogoMarkerCount: modelVisualObjectsByModelIndex.length,
      cameraFacingOrganizationLogoMarkerCount: clickableOrganizationLogoSprites.filter(
        (sprite) => sprite.isSprite,
      ).length,
      countryRegionMarkerVisible,
      countryRegionMarkerCount: countryRegionMarkerVisible ? visibleModelCount : 0,
      organizationCount: organizationNames.size,
      visibleOrganizationCount,
      pinned: [...pinnedBaseModelNames],
      hoverKey: hoveredLineageKey,
      hoverReasoningBase: hoveredReasoningBaseModelName,
      highlightLen: displayedModelMarkers.filter((model) =>
        pinnedBaseModelNames.has(model.base_model_name),
      ).length,
      lineageLen: lineagePositionCount,
      reasoningVariantLineLen: reasoningPositionCount,
      lineageKeys: Object.keys(lineagesByOrganizationAndTier).length,
      standoutMetric: activeStandoutMetricKey,
      standoutWeights: { ...standoutAxisWeights },
      frontierCount: frontierModels().length,
      frontierStyle,
      achievableSurfaceVisible: achievableFrontierSurfaceVisible,
      sidePanelExpanded,
      cameraPosition: perspectiveCamera.position.toArray(),
    };
  }

  function publicStandoutRanking() {
    return {
      metric: activeStandoutMetricKey,
      weights: { ...standoutAxisWeights },
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

  window.aaState = publicState;
  window.aaPinBase = (baseModelName) => {
    pinnedBaseModelNames.add(baseModelName);
    applyPinnedModelVisualEncoding();
  };
  window.aaUnpinBase = (baseModelName) => {
    pinnedBaseModelNames.delete(baseModelName);
    applyPinnedModelVisualEncoding();
  };
  window.aaTogglePin = togglePinnedBaseModelName;
  window.aaShowLineageForName = (modelName) => {
    const modelIndex = modelIndexByModelName[modelName];
    if (modelIndex === undefined) return false;
    setHoveredModelIndex(modelIndex);
    return true;
  };
  window.aaClearHover = () => setHoveredModelIndex(null);
  window.aaMatchBases = matchingBaseModelNames;
  window.aaSetMetricCombination = activateMetricCombination;
  window.aaSetFrontierStyle = setFrontierStyle;
  window.aaSetAchievableSurfaceVisible = setAchievableFrontierSurfaceVisible;
  window.aaSetCountryRegionMarkerVisible = setCountryRegionMarkerVisible;
  window.aaSetSidePanelExpanded = setSidePanelExpanded;
  window.aaSelectStandoutMetric = selectStandoutMetric;
  window.aaSetWeights = setStandoutAxisWeights;
  window.aaStandoutRanking = publicStandoutRanking;
  window.aaThreeDimensionalRenderer = {
    camera: perspectiveCamera,
    controls: orbitControls,
    renderer: webglRenderer,
    requestRender: requestThreeDimensionalSceneRender,
  };
})();
