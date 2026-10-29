const HISTORICAL_SCENE_TRANSITION_DURATION_MS = 300;

function equalNumericArrays(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function equalGeometry(left, right) {
  if (left === right) return true;
  const attributes = Object.keys(left.attributes);
  if (attributes.length !== Object.keys(right.attributes).length) return false;
  if (Boolean(left.index) !== Boolean(right.index)) return false;
  if (left.index && !equalNumericArrays(left.index.array, right.index.array)) return false;
  return attributes.every(name => right.attributes[name]
    && left.attributes[name].itemSize === right.attributes[name].itemSize
    && equalNumericArrays(left.attributes[name].array, right.attributes[name].array));
}

function equalVisualLayer(left, right) {
  const materialFields = ["type", "opacity", "map", "depthTest", "depthWrite", "alphaTest", "side", "blending", "sizeAttenuation", "linewidth", "dashed"];
  return left.type === right.type && left.visible === right.visible && left.renderOrder === right.renderOrder
    && left.position.equals(right.position) && left.quaternion.equals(right.quaternion) && left.scale.equals(right.scale)
    && materialFields.every(field => left.material[field] === right.material[field])
    && left.material.color?.getHex() === right.material.color?.getHex()
    && (left.isSprite || equalGeometry(left.geometry, right.geometry));
}

// 过渡只改变独立材质的透明度；模型与几何始终停留在前后两个真实位置。
export function createHistoricalSceneTransition({ outgoingGroup, requestRender, disposeObject, reducedMotionMediaQuery }) {
  let transition = null;
  let isBuildingScene = false;
  let completedTransitionCount = 0;
  const layerDescription = layer => ({ key: layer.key, object_uuid: layer.object.uuid,
    opacity: layer.object.material.opacity, position: layer.object.position.toArray() });

  function restoreMaterial(layer) {
    if (!layer.transitionMaterial) return;
    if (layer.object.material === layer.transitionMaterial) layer.object.material = layer.originalMaterial;
    layer.transitionMaterial.dispose();
    layer.transitionMaterial = null;
  }

  function setLayerOpacity(layer, fraction) {
    if (!layer.transitionMaterial) {
      layer.originalMaterial = layer.object.material;
      layer.transitionMaterial = layer.originalMaterial.clone();
    } else if (layer.object.material !== layer.transitionMaterial) {
      // 悬停或固定操作可能重选编码材质，继续在新编码上乘过渡透明度。
      layer.originalMaterial = layer.object.material;
      layer.transitionMaterial.copy(layer.originalMaterial);
    }
    layer.transitionMaterial.transparent = true;
    layer.transitionMaterial.depthWrite = false;
    layer.transitionMaterial.opacity = layer.originalMaterial.opacity * fraction;
    layer.object.material = layer.transitionMaterial;
  }

  function disposeOutgoingLayers(current) {
    for (const layer of current.outgoingLayers) {
      restoreMaterial(layer);
      outgoingGroup.remove(layer.object);
      disposeObject(layer.object);
    }
    current.outgoingLayers = [];
  }

  function commitScene(current) {
    isBuildingScene = true;
    try {
      current.rebuildScene();
      const beforeByKey = new Map(current.outgoingLayers.map(layer => [layer.key, layer]));
      const retained = new Set();
      for (const layer of current.getLayers()) {
        const previous = beforeByKey.get(layer.key);
        if (!current.versionBoundary && previous && equalVisualLayer(previous.object, layer.object)) {
          const parent = layer.object.parent;
          parent.remove(layer.object);
          previous.object.userData.modelIndex = layer.object.userData.modelIndex;
          layer.replaceObject(previous.object);
          disposeObject(layer.object);
          parent.add(previous.object);
          current.retainedLayers.push(previous);
          retained.add(previous);
        } else if (layer.object.visible) {
          current.incomingLayers.push(layer);
          setLayerOpacity(layer, 0);
        }
      }
      current.outgoingLayers = current.outgoingLayers.filter(layer => {
        if (retained.has(layer)) return false;
        if (layer.object.visible) return true;
        outgoingGroup.remove(layer.object);
        disposeObject(layer.object);
        return false;
      });
      current.onLayersReconciled();
      current.hasCommitted = true;
      current.resolveCommitted();
    } finally {
      isBuildingScene = false;
    }
  }

  function finish() {
    if (!transition || isBuildingScene) return;
    const current = transition;
    if (!current.hasCommitted) commitScene(current);
    disposeOutgoingLayers(current);
    current.incomingLayers.forEach(restoreMaterial);
    transition = null;
    completedTransitionCount += 1;
    current.resolveSettled();
    requestRender();
  }

  function advance(now) {
    if (!transition) return false;
    if (reducedMotionMediaQuery.matches) { finish(); return false; }
    const current = transition;
    const phaseDuration = current.versionBoundary ? HISTORICAL_SCENE_TRANSITION_DURATION_MS / 2 : HISTORICAL_SCENE_TRANSITION_DURATION_MS;
    const progress = Math.min(1, Math.max(0, (now - current.startedAt) / phaseDuration));
    const eased = 1 - (1 - progress) ** 4;
    current.outgoingLayers.forEach(layer => setLayerOpacity(layer, 1 - eased));
    if (current.hasCommitted) current.incomingLayers.forEach(layer => setLayerOpacity(layer, eased));
    if (progress === 1) {
      if (!current.hasCommitted) {
        // 先清除旧版，再提交新版坐标与刻度，禁止两版轴域混合显示。
        disposeOutgoingLayers(current);
        commitScene(current);
        current.startedAt = Math.max(now, performance.now());
        current.phase = "fading_in";
      } else finish();
    }
    return transition !== null;
  }

  function replaceScene({ getLayers, rebuildScene, onLayersReconciled, versionBoundary = false }) {
    finish();
    if (reducedMotionMediaQuery.matches) { rebuildScene(); return Promise.resolve(); }
    let resolveCommitted, resolveSettled;
    const committed = new Promise(resolve => { resolveCommitted = resolve; });
    const settled = new Promise(resolve => { resolveSettled = resolve; });
    const outgoingLayers = getLayers();
    outgoingLayers.forEach(layer => outgoingGroup.add(layer.object));
    transition = { getLayers, rebuildScene, onLayersReconciled, versionBoundary,
      outgoingLayers, incomingLayers: [], retainedLayers: [], hasCommitted: false,
      phase: versionBoundary ? "fading_out" : "crossfading", startedAt: performance.now(),
      resolveCommitted, resolveSettled, settled };
    if (!versionBoundary) {
      commitScene(transition);
      transition.startedAt = performance.now();
    }
    requestRender();
    return committed;
  }

  reducedMotionMediaQuery.addEventListener("change", () => { if (reducedMotionMediaQuery.matches) finish(); });
  return {
    replaceScene, advance, finish,
    whenSettled: () => transition?.settled || Promise.resolve(),
    isPickable: object => object.parent !== outgoingGroup && object.material.opacity > 0,
    diagnostics: () => ({ is_active: transition !== null, phase: transition?.phase || "idle",
      duration_ms: HISTORICAL_SCENE_TRANSITION_DURATION_MS, easing: "ease-out-quart",
      version_boundary: transition?.versionBoundary || false,
      retained_layers: (transition?.retainedLayers || []).map(layerDescription),
      incoming_layers: (transition?.incomingLayers || []).map(layerDescription),
      outgoing_layers: (transition?.outgoingLayers || []).map(layerDescription),
      temporary_material_count: [...(transition?.incomingLayers || []), ...(transition?.outgoingLayers || [])].filter(layer => layer.transitionMaterial).length,
      completed_transition_count: completedTransitionCount }),
  };
}
