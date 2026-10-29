import * as THREE from "three";

export function cameraDistanceToFitBoundingSphere({radius,verticalFieldOfViewDegrees,canvasWidth,canvasHeight,paddingCssPixels=56}) {
  if (![radius,verticalFieldOfViewDegrees,canvasWidth,canvasHeight].every(value=>Number.isFinite(value) && value>0) || verticalFieldOfViewDegrees>=180) throw new Error("自动取景需要有效包围球、视场与画布尺寸");
  const horizontalUsableFraction = Math.max(.4,1-2*paddingCssPixels/canvasWidth);
  const verticalUsableFraction = Math.max(.4,1-2*paddingCssPixels/canvasHeight);
  const tangent = Math.tan(THREE.MathUtils.degToRad(verticalFieldOfViewDegrees/2));
  const limitingHalfAngle = Math.atan(tangent*Math.min(verticalUsableFraction,horizontalUsableFraction*canvasWidth/canvasHeight));
  return radius/Math.sin(limitingHalfAngle)*1.04;
}

export function installFrontierCameraViewControls({camera,controls,canvas,graphContainer,getBoundingSphere,getInitialCameraDirection,hitTest,onCameraStateCommitted,onDismissOverlay,onClearSelection,onFocusSearch,requestRender}) {
  let automaticFraming = true;
  let selectedAxisView = null;
  let lastFramedViewport = `${window.innerWidth}:${window.innerHeight}`;
  const cameraDirections = {intelligence_cost:[0,-1,0],intelligence_speed:[1,0,0],cost_speed:[0,0,1]};
  function updateOrbitCameraUp(up) {
    camera.up.fromArray(up).normalize();
    // three 0.185.1 在构造时缓存 up 变换；恢复相机方向时同步这两个缓存。
    controls._quat.setFromUnitVectors(camera.up,new THREE.Vector3(0,1,0));
    controls._quatInverse.copy(controls._quat).invert();
  }
  function frameBoundingSphere(commit=true) {
    const sphere = getBoundingSphere();
    const width = Math.max(1,graphContainer.clientWidth),height = Math.max(1,graphContainer.clientHeight);
    camera.aspect = width/height;
    const distance = cameraDistanceToFitBoundingSphere({radius:Math.max(sphere.radius,.01),verticalFieldOfViewDegrees:camera.fov,canvasWidth:width,canvasHeight:height});
    const direction = new THREE.Vector3(...(selectedAxisView ? cameraDirections[selectedAxisView] : getInitialCameraDirection())).normalize();
    updateOrbitCameraUp(selectedAxisView === "cost_speed" ? [0,1,0] : [0,0,1]);
    controls.target.copy(sphere.center);
    camera.position.copy(sphere.center).addScaledVector(direction,distance);
    camera.near = .01;
    camera.far = Math.max(100,distance*4);
    controls.maxDistance = Math.max(14,distance*3);
    camera.updateProjectionMatrix();
    controls.update();
    requestRender();
    if (commit) onCameraStateCommitted();
  }
  function resetCamera({commit=true}={}) { automaticFraming=true;selectedAxisView=null;frameBoundingSphere(commit); }
  function setAxisAlignedCameraView(view) {
    if (!cameraDirections[view]) return false;
    automaticFraming=true;selectedAxisView=view;frameBoundingSphere();return true;
  }
  function restoreCameraState(state) {
    automaticFraming=false;
    updateOrbitCameraUp(state.up);
    controls.target.fromArray(state.target);
    camera.position.fromArray(state.position);
    const distance=camera.position.distanceTo(controls.target);
    controls.maxDistance=Math.max(controls.maxDistance,distance*1.01);
    controls.minDistance=Math.min(controls.minDistance,distance*.99);
    camera.far=Math.max(100,distance*4);
    camera.updateProjectionMatrix();
    controls.update();
    requestRender();
  }
  canvas.tabIndex=0;
  canvas.setAttribute("aria-label","可旋转的 AI 模型三维帕累托前沿；方向键旋转，斜杠搜索，Escape 关闭浮层或清除固定，双击空白重置视角");
  canvas.addEventListener("dblclick",event=>{if (!hitTest(event.clientX,event.clientY)) resetCamera();});
  controls.addEventListener("start",()=>{automaticFraming=false;});
  controls.addEventListener("end",onCameraStateCommitted);
  document.addEventListener("keydown",event=>{
    const editing=event.target.closest?.("input,textarea,select,[contenteditable='true']");
    if (event.key === "Escape") {
      if (onDismissOverlay()) { event.preventDefault();event.stopImmediatePropagation();return; }
      if (editing) return;
      onClearSelection();event.preventDefault();event.stopImmediatePropagation();return;
    }
    if (editing || event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === "/") {event.preventDefault();onFocusSearch();return;}
    if (event.target !== canvas || !["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    automaticFraming=false;
    const offset=camera.position.clone().sub(controls.target);
    const horizontal=event.key === "ArrowLeft" || event.key === "ArrowRight";
    const axis=horizontal ? camera.up.clone() : new THREE.Vector3().crossVectors(camera.up,offset).normalize();
    offset.applyAxisAngle(axis,(event.key === "ArrowLeft" || event.key === "ArrowUp" ? 1 : -1)*Math.PI/36);
    if (Math.abs(offset.clone().normalize().dot(camera.up)) < .995) camera.position.copy(controls.target).add(offset);
    controls.update();requestRender();onCameraStateCommitted();
  },true);
  return {resetCamera,setAxisAlignedCameraView,restoreCameraState,
    serializeCameraState:()=>Object.fromEntries([["position",camera.position],["target",controls.target],["up",camera.up]].map(([name,vector])=>[name,vector.toArray().map(value=>Math.abs(value)<1e-10 ? 0 : Number(value.toPrecision(12)))])),
    onResize:()=>{
      const viewport=`${window.innerWidth}:${window.innerHeight}`;
      if(automaticFraming && viewport!==lastFramedViewport)frameBoundingSphere(false);
      lastFramedViewport=viewport;
    },
  };
}
