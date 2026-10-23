import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 比较页独立启动，不复用或改写主报告的可变状态。
try {
  const comparisonDataset = JSON.parse(document.getElementById("frontier-geometry-comparison-dataset").textContent);
  const metricVariants = comparisonDataset.metric_variants;
  const element = (id) => document.getElementById(id);
  const number = (value, digits = 2) => value == null ? "不适用" : Number(value).toLocaleString("zh-CN", { maximumFractionDigits: digits });
  const percentage = (value) => value == null ? "不适用" : `${number(value * 100)}%`;
  let activeVariantKey = comparisonDataset.initial_variant_key;
  let hoveredModelIndex = null;
  let renderRequested = false;
  let synchronizingCamera = false;
  const markerTextureCache = new Map();
  const sharedMarkerResources = [];

  function canvasTexture(draw) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 96;
    const context = canvas.getContext("2d");
    draw(context);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }
  const markerDiscTexture = canvasTexture((context) => {
    context.fillStyle = "#345d7f";
    context.beginPath(); context.arc(48, 48, 27, 0, Math.PI * 2); context.fill();
  });
  const paretoRingTexture = canvasTexture((context) => {
    context.strokeStyle = "#172d43"; context.lineWidth = 8;
    context.beginPath(); context.arc(48, 48, 37, 0, Math.PI * 2); context.stroke();
  });
  const hoverRingTexture = canvasTexture((context) => {
    context.strokeStyle = "#b53322"; context.lineWidth = 8;
    context.beginPath(); context.arc(48, 48, 37, 0, Math.PI * 2); context.stroke();
  });
  sharedMarkerResources.push(markerDiscTexture, paretoRingTexture, hoverRingTexture);

  function requestRender() {
    if (renderRequested) return;
    renderRequested = true;
    requestAnimationFrame(() => {
      renderRequested = false;
      for (const viewport of viewports) {
        viewport.renderer.render(viewport.scene, viewport.camera);
        updateAxisLabels(viewport);
      }
    });
  }

  function createViewport(kind) {
    const container = element(`comparison-${kind}-viewport`);
    const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setClearColor(0xffffff);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute("aria-label", kind === "exact" ? "精确阶梯三维画布" : "Delaunay 参照三维画布");
    container.append(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 100);
    camera.up.set(0, 0, 1);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = false;
    controls.minDistance = 2;
    controls.maxDistance = 12;
    const group = new THREE.Group();
    scene.add(group);
    const viewport = { kind, container, renderer, scene, camera, controls, group, models: [], axisLabels: [], selectedMarker: null, pointerPressed: false };
    controls.addEventListener("change", () => {
      if (synchronizingCamera) return;
      synchronizingCamera = true;
      for (const other of viewports) if (other !== viewport) {
        other.camera.position.copy(camera.position);
        other.camera.quaternion.copy(camera.quaternion);
        other.camera.zoom = camera.zoom;
        other.controls.target.copy(controls.target);
        other.controls.update();
      }
      synchronizingCamera = false;
      requestRender();
    });
    container.addEventListener("pointerdown", () => { viewport.pointerPressed = true; setHoveredModel(null); });
    container.addEventListener("pointerup", () => { viewport.pointerPressed = false; });
    container.addEventListener("pointercancel", () => { viewport.pointerPressed = false; setHoveredModel(null); });
    container.addEventListener("pointerleave", () => { if (!viewport.pointerPressed) setHoveredModel(null); });
    container.addEventListener("pointermove", (event) => {
      if (viewport.pointerPressed) return;
      const bounds = renderer.domElement.getBoundingClientRect();
      const pointer = new THREE.Vector2(2 * (event.clientX - bounds.left) / bounds.width - 1, 1 - 2 * (event.clientY - bounds.top) / bounds.height);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(pointer, camera);
      const intersection = raycaster.intersectObjects(viewport.models, false)[0];
      setHoveredModel(intersection ? intersection.object.userData.modelIndex : null);
    });
    renderer.domElement.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      element("comparison-runtime-error").hidden = false;
      element("comparison-runtime-error").textContent = "三维绘图上下文暂时丢失，等待浏览器恢复。";
    });
    renderer.domElement.addEventListener("webglcontextrestored", () => {
      element("comparison-runtime-error").hidden = true; requestRender();
    });
    new ResizeObserver(() => {
      renderer.setSize(container.clientWidth, container.clientHeight, false);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      requestRender();
    }).observe(container);
    return viewport;
  }

  const viewports = [createViewport("exact"), createViewport("reference")];
  function worldPosition(projectedPosition) {
    const intelligenceRange = metricVariants[activeVariantKey].axes.z_axis.fixed_range;
    return new THREE.Vector3(
      projectedPosition[0] * 2 - 1,
      projectedPosition[1] * 2 - 1,
      (projectedPosition[2] - intelligenceRange[0]) / (intelligenceRange[1] - intelligenceRange[0]) * 2 - 1,
    );
  }

  function surfaceColor(intelligence) {
    const [minimum, maximum] = metricVariants[activeVariantKey].axes.z_axis.fixed_range;
    const fraction = THREE.MathUtils.clamp((intelligence - minimum) / (maximum - minimum), 0, 1);
    return new THREE.Color().setHSL(0.57, 0.58, 0.35 + 0.31 * fraction);
  }

  function createTriangleMesh(mesh, reverseOnly = false) {
    const vertices = [], colors = [];
    const classifications = metricVariants[activeVariantKey].reference_reverse_triangle_classification;
    mesh.triangles.forEach((indices, triangleIndex) => {
      if (reverseOnly && classifications[triangleIndex] !== true) return;
      for (const index of indices) {
        const position = mesh.vertices[index];
        vertices.push(...worldPosition(position).toArray());
        colors.push(...surfaceColor(position[2]).toArray());
      }
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide, transparent: true, opacity: reverseOnly ? 0.58 : 0.32,
      depthTest: true, depthWrite: false, vertexColors: !reverseOnly,
      color: reverseOnly ? 0xb82d22 : 0xffffff,
      polygonOffset: reverseOnly, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
    });
    const object = new THREE.Mesh(geometry, material);
    object.renderOrder = reverseOnly ? 52 : 51;
    return object;
  }

  function createLineSegments(segments, color = 0x345d7f, opacity = 0.6) {
    const positions = segments.flatMap((segment) => segment.flatMap((position) => worldPosition(position).toArray()));
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
  }

  function markerTexture(creator) {
    if (markerTextureCache.has(creator)) return markerTextureCache.get(creator);
    const metadata = comparisonDataset.organization_identity_metadata_by_creator_name[creator];
    const dataUrl = metadata?.logo_visualization_data_url;
    // 只接受自包含图片，契约不能触发远程图片请求。
    if (typeof dataUrl !== "string" || !/^data:image\/(svg\+xml|png|jpeg|webp);/.test(dataUrl)) return markerDiscTexture;
    const texture = new THREE.TextureLoader().load(dataUrl, requestRender, undefined, () => requestRender());
    texture.colorSpace = THREE.SRGBColorSpace;
    markerTextureCache.set(creator, texture);
    return texture;
  }

  function createSprite(texture, position, scale, opacity = 1) {
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity, depthTest: false, depthWrite: false });
    const sprite = new THREE.Sprite(material);
    sprite.position.copy(position);
    sprite.scale.set(scale, scale, 1);
    sprite.renderOrder = 100;
    return sprite;
  }

  function addAxisLabel(viewport, text, position, title = false, offset = [0, 0]) {
    const label = document.createElement("span");
    label.className = `axis-label${title ? " axis-title" : ""}`;
    label.textContent = text;
    viewport.container.append(label);
    viewport.axisLabels.push({ element: label, position, offset, title });
  }

  function addAxes(viewport) {
    const variant = metricVariants[activeVariantKey];
    const [intelligenceMinimum, intelligenceMaximum] = variant.axes.z_axis.fixed_range;
    const axisSegments = [
      [[0, 1, intelligenceMinimum], [1, 1, intelligenceMinimum]],
      [[0, 0, intelligenceMinimum], [0, 1, intelligenceMinimum]],
      [[0, 1, intelligenceMinimum], [0, 1, intelligenceMaximum]],
    ];
    viewport.group.add(createLineSegments(axisSegments, 0x63758a, 0.85));
    const gridSegments = [];
    for (const fraction of [0, 0.25, 0.5, 0.75, 1]) {
      gridSegments.push([[fraction, 0, intelligenceMinimum], [fraction, 1, intelligenceMinimum]]);
      gridSegments.push([[0, fraction, intelligenceMinimum], [1, fraction, intelligenceMinimum]]);
    }
    viewport.group.add(createLineSegments(gridSegments, 0xd6dfe8, 0.55));
    addAxisLabel(viewport, "成本", new THREE.Vector3(1.12, 1, -1), true, [4, 9]);
    addAxisLabel(viewport, "速度", new THREE.Vector3(-1, -1.12, -1), true, [-10, 12]);
    addAxisLabel(viewport, "智能", new THREE.Vector3(-1, 1, 1.12), true, [-10, -4]);
    for (const [axisIndex, axisName] of ["x_axis", "y_axis", "z_axis"].entries()) {
      const axis = variant.axes[axisName];
      for (const fraction of [0.15, 0.5, 0.85]) {
        const projectedValue = axis.fixed_range[0] + fraction * (axis.fixed_range[1] - axis.fixed_range[0]);
        const value = axis.scale_type === "log" ? 10 ** projectedValue : projectedValue;
        const labelPosition = new THREE.Vector3(-1, axisIndex === 1 ? -1 : 1, -1);
        labelPosition.setComponent(axisIndex, fraction * 2 - 1);
        addAxisLabel(viewport, number(value, value < 1 ? 3 : 1), labelPosition, false, axisIndex === 2 ? [-30, -6] : [-8, 9]);
      }
    }
  }

  function updateAxisLabels(viewport) {
    const occupiedBounds = [];
    for (const label of [...viewport.axisLabels].sort((first, second) => Number(second.title) - Number(first.title))) {
      const projected = label.position.clone().project(viewport.camera);
      label.element.hidden = projected.z < -1 || projected.z > 1;
      const left = THREE.MathUtils.clamp((projected.x + 1) / 2 * viewport.container.clientWidth + label.offset[0], 3, viewport.container.clientWidth - label.element.offsetWidth - 3);
      let top = THREE.MathUtils.clamp((1 - projected.y) / 2 * viewport.container.clientHeight + label.offset[1], 3, viewport.container.clientHeight - 18);
      for (let attempt = 0; attempt < 10; attempt++) {
        const collision = occupiedBounds.some((bounds) => left < bounds.right + 3 && left + label.element.offsetWidth > bounds.left - 3 && top < bounds.bottom + 3 && top + 14 > bounds.top - 3);
        if (!collision) break;
        top += top + 32 < viewport.container.clientHeight ? 17 : -17;
      }
      label.element.style.left = `${left}px`;
      label.element.style.top = `${top}px`;
      occupiedBounds.push({ left, right: left + label.element.offsetWidth, top, bottom: top + 14 });
    }
  }

  function clearViewportGeometry(viewport) {
    for (const label of viewport.axisLabels) label.element.remove();
    viewport.axisLabels = [];
    viewport.group.traverse((object) => {
      object.geometry?.dispose();
      if (object.material) for (const material of Array.isArray(object.material) ? object.material : [object.material]) material.dispose();
    });
    viewport.group.clear();
    viewport.models = [];
  }

  function rebuildVariantGeometry() {
    const variant = metricVariants[activeVariantKey];
    setHoveredModel(null);
    for (const viewport of viewports) {
      clearViewportGeometry(viewport);
      addAxes(viewport);
      const mesh = viewport.kind === "exact" ? variant.exact_step_geometry.triangle_mesh : variant.reference_triangle_mesh;
      viewport.surface = createTriangleMesh(mesh);
      viewport.group.add(viewport.surface);
      if (viewport.kind === "exact") {
        viewport.wireframe = createLineSegments(variant.exact_step_geometry.boundary_line_segments);
      } else {
        const uniqueEdges = new Set();
        for (const triangle of mesh.triangles) for (let index = 0; index < 3; index++) {
          uniqueEdges.add([triangle[index], triangle[(index + 1) % 3]].sort((a, b) => a - b).join(","));
        }
        viewport.wireframe = createLineSegments([...uniqueEdges].map((edge) => edge.split(",").map((index) => mesh.vertices[Number(index)])));
        viewport.reverseOverlay = createTriangleMesh(mesh, true);
        viewport.group.add(viewport.reverseOverlay);
      }
      viewport.group.add(viewport.wireframe);
      variant.displayed_models.forEach((model, modelIndex) => {
        const position = worldPosition(model.projected_position);
        const opacity = model.analysis_eligible ? 0.95 : 0.28;
        if (model.is_pareto) viewport.group.add(createSprite(paretoRingTexture, position, 0.085));
        const sprite = createSprite(markerTexture(model.creator), position, 0.055, opacity);
        sprite.userData.modelIndex = modelIndex;
        viewport.models.push(sprite);
        viewport.group.add(sprite);
      });
      viewport.selectedMarker = createSprite(hoverRingTexture, new THREE.Vector3(), 0.115);
      viewport.selectedMarker.visible = false;
      viewport.selectedMarker.renderOrder = 110;
      viewport.group.add(viewport.selectedMarker);
    }
    element("comparison-exact-empty").hidden = variant.exact_pareto_points.length > 0;
    element("comparison-reference-empty").hidden = variant.reference_triangle_mesh.triangles.length > 0;
    element("comparison-variant-summary").textContent = `展示 ${variant.displayed_models.length} · 分析 Pareto ${variant.exact_pareto_points.length} · 历史口径 ${variant.displayed_models.filter((model) => !model.analysis_eligible).length}`;
    element("comparison-axis-units").textContent = `成本 ${variant.cost_axis_unit} · 速度 tok/s · 智能指数 ${comparisonDataset.artificial_analysis_intelligence_index_version || "版本未知"} · ${variant.projection_plane_description}`;
    for (const cell of document.querySelectorAll("[data-metric-variant-column]")) {
      cell.classList.toggle("selected-variant-column", cell.dataset.metricVariantColumn === activeVariantKey);
    }
    applyReferenceDisplaySettings();
    requestRender();
  }

  function setHoveredModel(modelIndex) {
    hoveredModelIndex = modelIndex;
    const variant = metricVariants[activeVariantKey];
    const model = modelIndex == null ? null : variant.displayed_models[modelIndex];
    for (const viewport of viewports) if (viewport.selectedMarker) {
      viewport.selectedMarker.visible = Boolean(model);
      if (model) viewport.selectedMarker.position.copy(worldPosition(model.projected_position));
    }
    element("comparison-hover-name").textContent = model ? model.name : "悬浮模型查看同一位置";
    element("comparison-hover-values").textContent = model
      ? `成本 ${number(model.raw_position[0])} ${variant.cost_axis_unit} · 速度 ${number(model.raw_position[1])} tok/s · 智能 ${number(model.raw_position[2])} · ${!model.analysis_eligible ? "历史口径，不参与本口径分析" : model.is_pareto ? "分析 Pareto 点" : "参与分析的非 Pareto 点"}`
      : "两个视图的模型标识与数值一致。";
    requestRender();
  }

  function applyReferenceDisplaySettings() {
    const reference = viewports[1];
    if (!reference.surface) return;
    reference.surface.visible = !element("comparison-reference-wireframe-only").checked;
    reference.reverseOverlay.visible = element("comparison-highlight-reverse-triangles").checked;
    requestRender();
  }

  function resetCameras() {
    synchronizingCamera = true;
    for (const viewport of viewports) {
      viewport.camera.position.set(-3.4, 4.3, 3.1);
      viewport.camera.zoom = 1;
      viewport.controls.target.set(0, 0, 0);
      viewport.controls.update();
    }
    synchronizingCamera = false;
    setHoveredModel(null);
    requestRender();
  }

  const metricRows = [
    ["反向三角面（数量 / 有效面数）", (metrics) => `${metrics.reverse_triangle_count} / ${metrics.nondegenerate_projected_triangle_count}`],
    ["反向面比例（按面数）", (metrics) => percentage(metrics.reverse_triangle_count_fraction)],
    ["反向面比例（按投影面积）", (metrics) => percentage(metrics.reverse_projected_area_fraction)],
    ["支持域差异率 |A△D| / |A∪D|", (metrics) => percentage(metrics.support_symmetric_difference_area_fraction)],
    ["共同定义域：智能平均绝对误差", (metrics) => number(metrics.common_support_mean_absolute_intelligence_error, 3)],
    ["共同定义域：智能最大绝对误差", (metrics) => number(metrics.common_support_maximum_absolute_intelligence_error, 3)],
    ["高于插值面的非 Pareto 模型数", (metrics) => number(metrics.eligible_non_pareto_models_above_reference_count, 0)],
    ["上述模型的最大高差（智能分）", (metrics) => number(metrics.maximum_eligible_non_pareto_model_intelligence_excess_above_reference, 3)],
    ["插值凸包外的非 Pareto 模型数", (metrics) => number(metrics.eligible_non_pareto_models_outside_reference_support_count, 0)],
    ["精确可达域 / 共同视域面积", (metrics) => percentage(metrics.exact_reachable_projected_area)],
    ["插值支持域 / 共同视域面积", (metrics) => percentage(metrics.reference_support_projected_area)],
    ["共同定义域 / 共同视域面积", (metrics) => percentage(metrics.common_support_projected_area)],
    ["合并后的水平平台 / 立面", (metrics) => `${metrics.exact_horizontal_platform_rectangle_count} / ${metrics.exact_vertical_wall_rectangle_count}`],
  ];
  function populateMetricsTable() {
    const table = element("comparison-metrics-table");
    const headerRow = table.createTHead().insertRow();
    const metricHeader = document.createElement("th");
    metricHeader.scope = "col";
    metricHeader.textContent = "几何指标";
    headerRow.append(metricHeader);
    for (const [key, variant] of Object.entries(metricVariants)) {
      const header = document.createElement("th");
      header.scope = "col"; header.textContent = variant.label;
      header.dataset.metricVariantColumn = key; headerRow.append(header);
    }
    const body = table.createTBody();
    for (const [label, format] of metricRows) {
      const row = body.insertRow();
      const rowHeader = document.createElement("th");
      rowHeader.scope = "row"; rowHeader.textContent = label; row.append(rowHeader);
      for (const [key, variant] of Object.entries(metricVariants)) {
        const cell = row.insertCell(); cell.textContent = format(variant.metrics);
        cell.dataset.metricVariantColumn = key;
      }
    }
  }

  const selector = element("comparison-metric-variant");
  for (const [key, variant] of Object.entries(metricVariants)) {
    const option = document.createElement("option"); option.value = key; option.textContent = variant.label;
    selector.append(option);
  }
  selector.value = activeVariantKey;
  selector.addEventListener("change", () => { activeVariantKey = selector.value; rebuildVariantGeometry(); });
  element("comparison-reset-camera").addEventListener("click", resetCameras);
  element("comparison-reference-wireframe-only").addEventListener("change", applyReferenceDisplaySettings);
  element("comparison-highlight-reverse-triangles").addEventListener("change", applyReferenceDisplaySettings);
  element("comparison-source-date").textContent = `数据 ${comparisonDataset.data_date || "日期未知"} · 离线快照`;
  element("comparison-source-fingerprint").textContent = `输入 SHA256 ${comparisonDataset.source_dataset_sha256.slice(0, 12)}`;
  element("comparison-source-fingerprint").title = comparisonDataset.source_dataset_sha256;
  element("comparison-exactness-scope").textContent = comparisonDataset.exactness_scope;
  for (const suggestion of comparisonDataset.historical_assistant_ux_suggestions_verbatim) {
    const quote = document.createElement("blockquote"); quote.textContent = suggestion;
    element("comparison-historical-suggestions").append(quote);
  }
  element("comparison-historical-source").textContent = `来源：${comparisonDataset.historical_assistant_ux_suggestion_source}`;
  populateMetricsTable();
  rebuildVariantGeometry();
  resetCameras();

  // 只读诊断用于自动化验证；用户交互始终走真实控件和指针事件。
  window.frontierGeometryComparisonDiagnostics = {
    snapshot: () => ({
      activeVariantKey, hoveredModelIndex,
      hoveredModelName: hoveredModelIndex == null ? null : metricVariants[activeVariantKey].displayed_models[hoveredModelIndex].name,
      viewports: viewports.map((viewport) => ({
        kind: viewport.kind, cameraPosition: viewport.camera.position.toArray(), cameraTarget: viewport.controls.target.toArray(),
        highlightedModelName: viewport.selectedMarker.visible ? metricVariants[activeVariantKey].displayed_models[hoveredModelIndex]?.name : null,
        surfaceVisible: viewport.surface.visible,
        surfaceTriangleCount: viewport.surface.geometry.attributes.position.count / 3,
        rendererGeometryCount: viewport.renderer.info.memory.geometries,
        reverseOverlayVisible: viewport.reverseOverlay?.visible || false,
      })),
    }),
    projectedModelPositions: (viewportIndex = 0) => {
      const viewport = viewports[viewportIndex];
      return metricVariants[activeVariantKey].displayed_models.map((model, index) => {
        const projected = worldPosition(model.projected_position).project(viewport.camera);
        return { index, name: model.name, x: (projected.x + 1) / 2 * viewport.container.clientWidth, y: (1 - projected.y) / 2 * viewport.container.clientHeight, depth: projected.z };
      }).sort((first, second) => first.depth - second.depth);
    },
  };
  window.addEventListener("pagehide", () => {
    for (const viewport of viewports) { clearViewportGeometry(viewport); viewport.controls.dispose(); viewport.renderer.dispose(); }
    for (const texture of [...sharedMarkerResources, ...markerTextureCache.values()]) texture.dispose();
  });
} catch (error) {
  const errorElement = document.getElementById("comparison-runtime-error");
  errorElement.hidden = false;
  errorElement.textContent = `比较页无法绘制：${error.message}`;
  throw error;
}
