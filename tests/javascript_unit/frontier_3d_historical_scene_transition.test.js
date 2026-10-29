import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { createHistoricalSceneTransition } from "../../src/frontier_3d_interactive_report_assets/frontier_3d_historical_scene_transition.js";

function transitionFixture() {
  const scene = new THREE.Scene(), currentGroup = new THREE.Group(), outgoingGroup = new THREE.Group();
  scene.add(currentGroup, outgoingGroup);
  const material = new THREE.SpriteMaterial({ opacity: .24, transparent: true });
  const disposedObjects = [];
  const reducedMotion = { matches: false, addEventListener() {} };
  const transition = createHistoricalSceneTransition({ outgoingGroup, reducedMotionMediaQuery: reducedMotion,
    requestRender() {}, disposeObject: object => disposedObjects.push(object) });
  let layers = [];
  function makeLayer(key, x, opacity = .24) {
    const object = new THREE.Sprite(opacity === .24 ? material : new THREE.SpriteMaterial({ opacity, transparent: true }));
    object.position.x = x;
    currentGroup.add(object);
    const entry = { key, object, replaceObject: replacement => { entry.object = replacement; } };
    return entry;
  }
  return { transition, currentGroup, outgoingGroup, reducedMotion, material, disposedObjects, makeLayer,
    setLayers: next => { layers = next; }, getLayers: () => layers };
}

test("共有子图层复用原对象，坐标变化只在两个真实位置交叉淡化且保留日期透明度", async () => {
  const fixture = transitionFixture();
  const before = [fixture.makeLayer("stable/logo", 0), fixture.makeLayer("moved/logo", -1)];
  fixture.setLayers(before);
  const originals = before.map(layer => layer.object);
  let after;
  await fixture.transition.replaceScene({ getLayers: fixture.getLayers, onLayersReconciled() {}, rebuildScene() {
    after = [fixture.makeLayer("stable/logo", 0), fixture.makeLayer("moved/logo", 1)];
    fixture.setLayers(after);
  } });
  assert.equal(after[0].object, originals[0]);
  assert.equal(after[0].object.material, fixture.material);
  assert.equal(fixture.material.opacity, .24);
  assert.equal(after[1].object.material.opacity, 0);
  assert.equal(fixture.transition.isPickable(originals[1]), false);
  assert.equal(fixture.transition.isPickable(after[1].object), false);
  const now = performance.now();
  fixture.transition.advance(now + 90);
  const middle = fixture.transition.diagnostics();
  assert.deepEqual(middle.incoming_layers[0].position, [1, 0, 0]);
  assert.deepEqual(middle.outgoing_layers[0].position, [-1, 0, 0]);
  assert.ok(middle.incoming_layers[0].opacity > 0 && middle.incoming_layers[0].opacity < .24);
  assert.ok(middle.outgoing_layers[0].opacity > 0 && middle.outgoing_layers[0].opacity < .24);
  assert.equal(fixture.transition.isPickable(after[1].object), true);
  assert.equal(fixture.material.opacity, .24);
  fixture.transition.advance(now + 310);
  assert.equal(after[1].object.material, fixture.material);
  assert.equal(fixture.outgoingGroup.children.length, 0);
  assert.equal(fixture.transition.diagnostics().temporary_material_count, 0);
  assert.ok(fixture.disposedObjects.includes(originals[1]));
});

test("跨版本在淡出后才提交新版，待完成 Promise 不提前通过", async () => {
  const fixture = transitionFixture();
  fixture.setLayers([fixture.makeLayer("model/logo", -1)]);
  let commitCount = 0, settled = false;
  const committed = fixture.transition.replaceScene({ getLayers: fixture.getLayers, onLayersReconciled() {}, versionBoundary: true,
    rebuildScene() { commitCount++; fixture.setLayers([fixture.makeLayer("model/logo", 1)]); } });
  fixture.transition.whenSettled().then(() => { settled = true; });
  const now = performance.now();
  fixture.transition.advance(now + 60);
  assert.equal(commitCount, 0);
  assert.equal(fixture.transition.diagnostics().phase, "fading_out");
  fixture.transition.advance(now + 151);
  await committed;
  assert.equal(commitCount, 1);
  assert.equal(settled, false);
  assert.equal(fixture.transition.diagnostics().phase, "fading_in");
  assert.equal(fixture.transition.diagnostics().outgoing_layers.length, 0);
  fixture.transition.advance(now + 310);
  await fixture.transition.whenSettled();
  assert.equal(settled, true);
});

test("变化曲面保持前后顶点，不生成变形网格或修改原材质", async () => {
  const fixture = transitionFixture();
  const positionsBefore = [0, 0, 0, 1, 0, 0, 0, 1, 0];
  const positionsAfter = [0, 0, 1, 1, 0, 1, 0, 1, 1];
  function surfaceLayer(positions) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const object = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ opacity: .25, transparent: true }));
    fixture.currentGroup.add(object);
    const entry = { key: "frontier/surface", object, replaceObject: replacement => { entry.object = replacement; } };
    return entry;
  }
  const before = surfaceLayer(positionsBefore);
  fixture.setLayers([before]);
  let after;
  await fixture.transition.replaceScene({ getLayers: fixture.getLayers, onLayersReconciled() {}, rebuildScene() {
    after = surfaceLayer(positionsAfter);
    fixture.setLayers([after]);
  } });
  const now = performance.now();
  fixture.transition.advance(now + 100);
  assert.deepEqual([...before.object.geometry.attributes.position.array], positionsBefore);
  assert.deepEqual([...after.object.geometry.attributes.position.array], positionsAfter);
  assert.ok(before.object.material.opacity > 0 && before.object.material.opacity < .25);
  assert.ok(after.object.material.opacity > 0 && after.object.material.opacity < .25);
  assert.equal(fixture.transition.diagnostics().temporary_material_count, 2);
  fixture.transition.advance(now + 310);
  assert.equal(after.object.material.opacity, .25);
  assert.equal(fixture.outgoingGroup.children.length, 0);
});

test("强制结束和减少动态效果不留下过渡材质或退出对象", async () => {
  const fixture = transitionFixture();
  fixture.setLayers([fixture.makeLayer("model/logo", -1)]);
  let commits = 0;
  const replace = () => fixture.transition.replaceScene({ getLayers: fixture.getLayers, onLayersReconciled() {}, versionBoundary: true,
    rebuildScene() { commits++; fixture.setLayers([fixture.makeLayer("model/logo", commits)]); } });
  const committed = replace();
  fixture.transition.finish();
  await committed;
  assert.equal(commits, 1);
  assert.equal(fixture.transition.diagnostics().is_active, false);
  assert.equal(fixture.transition.diagnostics().temporary_material_count, 0);
  assert.equal(fixture.outgoingGroup.children.length, 0);
  fixture.reducedMotion.matches = true;
  await replace();
  assert.equal(commits, 2);
  assert.equal(fixture.transition.diagnostics().is_active, false);
});
