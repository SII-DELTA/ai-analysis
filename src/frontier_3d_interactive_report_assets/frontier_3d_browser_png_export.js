import * as THREE from "three";

// 离屏上下文仅在导出期间存在；复用只读场景，保持屏幕渲染器与相机状态。
export async function renderFrontierBrowserPng({scene, camera, graphContainer, title, metadataLines, legendLines, pinnedModelNames}) {
  const width = Math.max(1, graphContainer.clientWidth);
  const height = Math.max(1, graphContainer.clientHeight);
  const fontFamily = getComputedStyle(document.body).fontFamily;
  const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const background = dark ? "#111827" : "#ffffff";
  const ink = dark ? "#f3f4f6" : "#17202a";
  const measurementCanvas = document.createElement("canvas");
  const measureContext = measurementCanvas.getContext("2d");
  if (!measureContext) throw new Error("无法创建 PNG 合成画布");
  measureContext.font = `13px ${fontFamily}`;
  function wrappedLines(text) {
    const lines = [];
    let line = "";
    for (const character of String(text)) {
      if (measureContext.measureText(line + character).width > Math.max(50,width-32)) { lines.push(line); line = ""; }
      line += character;
    }
    if (line) lines.push(line);
    return lines;
  }
  const headerLines = [title, ...metadataLines].flatMap(wrappedLines);
  const footerLines = [...legendLines, `固定模型：${pinnedModelNames.length ? pinnedModelNames.join("、") : "无"}`, "数据来源：Artificial Analysis · https://artificialanalysis.ai/"].flatMap(wrappedLines);
  const headerHeight = 20 + headerLines.length * 20;
  const footerHeight = 20 + footerLines.length * 20;
  const output = document.createElement("canvas");
  output.width = width * 2;
  output.height = (height + headerHeight + footerHeight) * 2;
  const context = output.getContext("2d");
  if (!context) throw new Error("无法创建 PNG 合成上下文");
  let exportRenderer;
  window.frontier3dLastPngExportStatus = {inProgress:true,resourcesReleased:false,width:output.width,height:output.height};
  try {
    exportRenderer = new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true});
    exportRenderer.outputColorSpace = THREE.SRGBColorSpace;
    exportRenderer.setPixelRatio(2);
    exportRenderer.setSize(width,height,false);
    const exportCamera = camera.clone();
    exportCamera.aspect = width / height;
    exportCamera.updateProjectionMatrix();
    exportRenderer.render(scene,exportCamera);
    context.scale(2,2);
    context.fillStyle = background;
    context.fillRect(0,0,width,output.height/2);
    context.fillStyle = ink;
    context.textBaseline = "top";
    headerLines.forEach((line,index)=>{
      context.font = `${index===0 ? "600 15" : "13"}px ${fontFamily}`;
      context.fillText(line,16,10+index*20);
    });
    context.drawImage(exportRenderer.domElement,0,headerHeight,width,height);
    const graphBounds = graphContainer.getBoundingClientRect();
    context.save();
    context.beginPath();context.rect(0,headerHeight,width,height);context.clip();
    const annotationLabels = [...graphContainer.querySelectorAll(".aa-threejs-axis-label,.aa-threejs-axis-tick-label,.aa-pinned-model-name-label")]
      .sort((left, right) => (parseInt(getComputedStyle(left).zIndex, 10) || 0) - (parseInt(getComputedStyle(right).zIndex, 10) || 0));
    for (const label of annotationLabels) {
      if (label.hidden || label.style.display === "none") continue;
      const bounds = label.getBoundingClientRect();
      if (!bounds.width || !bounds.height) continue;
      const x = bounds.x - graphBounds.x + bounds.width/2;
      const y = headerHeight + bounds.y - graphBounds.y + bounds.height/2;
      const rotation = /rotate\(([-\d.]+)deg\)/.exec(label.style.transform)?.[1] || 0;
      context.save();
      context.translate(x,y);
      context.rotate(Number(rotation)*Math.PI/180);
      const labelStyle=getComputedStyle(label);
      const fontSize=parseFloat(labelStyle.fontSize) || 12;
      const lineHeight=parseFloat(labelStyle.lineHeight) || fontSize*1.3;
      context.font = `${labelStyle.fontWeight} ${fontSize}px ${fontFamily}`;
      const text = (label.textContent + (label.dataset.directionHint || "")).replace(/\s+/g," ").trim();
      const maximumLineWidth=Math.max(20,label.offsetWidth-8);
      const lines=[];
      let currentLine="";
      for(const character of text){
        if(currentLine && context.measureText(currentLine+character).width>maximumLineWidth){lines.push(currentLine);currentLine="";}
        currentLine+=character;
      }
      if(currentLine)lines.push(currentLine);
      const textWidth=Math.max(...lines.map(line=>context.measureText(line).width),0);
      const textHeight=lines.length*lineHeight;
      context.fillStyle = background;
      context.fillRect(-textWidth/2-3,-textHeight/2-2,textWidth+6,textHeight+4);
      context.fillStyle = ink;
      context.textAlign = "center";
      context.textBaseline = "middle";
      lines.forEach((line,index)=>context.fillText(line,0,(index-(lines.length-1)/2)*lineHeight));
      context.restore();
    }
    context.restore();
    context.font = `13px ${fontFamily}`;
    context.fillStyle = ink;
    footerLines.forEach((line,index)=>context.fillText(line,16,headerHeight+height+10+index*20));
    const blob = await new Promise((resolve,reject)=>output.toBlob(value=>value ? resolve(value) : reject(new Error("浏览器未能编码 PNG")),"image/png"));
    return blob;
  } finally {
    exportRenderer?.dispose();
    exportRenderer?.forceContextLoss();
    exportRenderer?.domElement.remove();
    window.frontier3dLastPngExportStatus = {...window.frontier3dLastPngExportStatus,inProgress:false,resourcesReleased:true};
    measurementCanvas.width = measurementCanvas.height = 0;
    output.width = output.height = 0;
  }
}
