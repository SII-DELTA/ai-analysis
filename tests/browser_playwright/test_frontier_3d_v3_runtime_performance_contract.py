"""缓存尺寸和帧缓冲策略从真实浏览器状态验证。"""


def test_axis_measurements_are_reused_for_camera_movement_and_refreshed_for_resize(frontier_page):
    page = frontier_page
    page.evaluate("document.fonts.ready")
    page.wait_for_function("document.getAnimations().every(animation => animation.playState !== 'running')")
    page.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
    observation = page.evaluate("""async () => {
      const diagnostics = frontierThreeDimensionalRendererDiagnostics;
      const before = diagnostics.axisAnnotationSizeMeasurementCount;
      diagnostics.camera.position.x += 0.01;
      diagnostics.camera.lookAt(diagnostics.controls.target);
      diagnostics.requestRender();
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      return {before, after: diagnostics.axisAnnotationSizeMeasurementCount,
        preserveDrawingBuffer: diagnostics.renderer.getContext().getContextAttributes().preserveDrawingBuffer,
        entireThreeNamespaceExposed: typeof window.THREE !== 'undefined'};
    }""")
    assert observation["before"] > 0
    assert observation["after"] == observation["before"]
    assert not observation["preserveDrawingBuffer"]
    assert not observation["entireThreeNamespaceExposed"]
    page.set_viewport_size({"width": 1000, "height": 700})
    page.wait_for_function("before => frontierThreeDimensionalRendererDiagnostics.axisAnnotationSizeMeasurementCount > before", arg=observation["before"])
