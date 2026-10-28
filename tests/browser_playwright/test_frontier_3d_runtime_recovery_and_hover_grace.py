"""有界故障恢复与真实指针时序；所有等待都依赖事件或受控时钟。"""
from playwright.sync_api import expect
import pytest


def test_hover_departure_grace_keeps_then_removes_pruned_ancestors(frontier_page):
    page = frontier_page
    point = page.evaluate("frontierThreeDimensionalRendererDiagnostics.projectedCanvasPositionForModelName('Gemini 3 Pro')")
    page.mouse.move(point["clientX"], point["clientY"])
    page.wait_for_function("frontierThreeDimensionalVisualizationState().displayedPrunedLineageAncestorMarkerCount > 0")
    page.clock.install()
    canvas = page.locator("canvas[data-frontier-threejs-canvas]").bounding_box()
    page.mouse.move(canvas["x"] + 3, canvas["y"] + 3)
    page.clock.run_for(20)
    page.clock.run_for(200)
    assert page.evaluate("frontierThreeDimensionalVisualizationState().displayedPrunedLineageAncestorMarkerCount") > 0
    page.clock.run_for(250)
    expect(page.locator("#aa-threejs-model-tooltip")).to_be_hidden()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().displayedPrunedLineageAncestorMarkerCount") == 0


def test_wheel_hover_matches_actual_pointer_target(frontier_page):
    page = frontier_page
    point = page.evaluate("frontierThreeDimensionalRendererDiagnostics.projectedCanvasPositionForModelName('Gemini 3 Pro')")
    page.mouse.move(point["clientX"], point["clientY"])
    page.wait_for_function("!document.querySelector('#aa-threejs-model-tooltip').hidden")
    page.mouse.wheel(0, 900)
    page.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
    result = page.evaluate("""point => {
      const target=frontierThreeDimensionalRendererDiagnostics.pointerInteractionAtCanvasClientCoordinates(point.clientX,point.clientY);
      const state=frontierThreeDimensionalVisualizationState();
      return {actual:target?.modelIndex ?? null, hovered:state.hoveredModelIndex, ancestor:target?.prunedLineageAncestorNode?.name ?? null, hoveredAncestor:state.hoveredPrunedLineageAncestorName};
    }""", point)
    assert result["actual"] == result["hovered"]
    assert result["ancestor"] == result["hoveredAncestor"]


@pytest.mark.expects_webgl_context_loss
def test_webgl_context_recovers_without_extra_user_interaction(frontier_page):
    page = frontier_page
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    before = page.evaluate("frontierThreeDimensionalVisualizationState()")
    # requestAnimationFrame 在上下文丢失期间可能暂停；超时使用独立 timer，避免测试悬挂。
    result = page.evaluate("""async () => {
      const d=frontierThreeDimensionalRendererDiagnostics;
      const renderer=d.renderer, canvas=renderer.domElement;
      const extension=renderer.getContext().getExtension('WEBGL_lose_context');
      if (!extension) return {extensionSupported:false};
      const waitForEvent = eventName => new Promise((resolve,reject) => {
        const timer=setTimeout(()=>reject(new Error(`等待 ${eventName} 超时`)),8000);
        canvas.addEventListener(eventName,()=>{clearTimeout(timer);resolve();},{once:true});
      });
      const lost=waitForEvent('webglcontextlost'); extension.loseContext(); await lost;
      const bannerVisible=!document.querySelector('#frontier-3d-runtime-diagnostic-banner').hidden;
      // 恢复必须在 loss 事件已完成派发之后请求，不能在 loss 监听器内同步请求。
      const restored=waitForEvent('webglcontextrestored');
      setTimeout(()=>extension.restoreContext(),100);
      await restored;
      return {extensionSupported:true,bannerVisible};
    }""")
    assert result["extensionSupported"], "此浏览器未提供 WEBGL_lose_context，不能声称恢复已验证"
    assert result["bannerVisible"]
    page.wait_for_function("!Object.hasOwn(frontier3dRuntimeDiagnosticStatus(),'webgl_context') && frontierThreeDimensionalVisualizationState().renderedTriangleCountInLatestFrame > 0")
    expect(page.locator("#frontier-3d-runtime-diagnostic-banner")).to_be_hidden()
    after = page.evaluate("frontierThreeDimensionalVisualizationState()")
    assert after["pinnedModelUuids"] == before["pinnedModelUuids"]
    assert after["activeMetricVariantKey"] == before["activeMetricVariantKey"]


def test_webgl_unavailable_has_visible_error(page, synthetic_frontier_report_path):
    page.add_init_script("""const original=HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext=function(kind,...args){
        return String(kind).startsWith('webgl') ? null : original.call(this,kind,...args);
      };""")
    page.goto(synthetic_frontier_report_path.as_uri())
    expect(page.locator("#frontier-3d-runtime-diagnostic-banner")).to_contain_text("不支持 WebGL")


def test_runtime_errors_are_reported_and_dpr_is_refreshed(frontier_page):
    page = frontier_page
    page.evaluate("window.dispatchEvent(new ErrorEvent('error',{message:'合成运行时错误'}))")
    expect(page.locator("#frontier-3d-runtime-diagnostic-banner")).to_contain_text("合成运行时错误")
    page.evaluate("""() => {
      window.dispatchEvent(new PromiseRejectionEvent('unhandledrejection',{promise:Promise.resolve(),reason:new Error('合成拒绝')}));
      Object.defineProperty(window,'devicePixelRatio',{configurable:true,value:1.5});
      window.dispatchEvent(new Event('resize'));
    }""")
    expect(page.locator("#frontier-3d-runtime-diagnostic-banner")).to_contain_text("合成拒绝")
    assert page.evaluate("frontierThreeDimensionalRendererDiagnostics.renderer.getPixelRatio()") == 1.5
    assert page.evaluate("""() => {
      const gl=frontierThreeDimensionalRendererDiagnostics.renderer.getContext();
      const viewport=gl.getParameter(gl.VIEWPORT);
      return viewport[2] <= gl.drawingBufferWidth && viewport[3] <= gl.drawingBufferHeight;
    }""")
