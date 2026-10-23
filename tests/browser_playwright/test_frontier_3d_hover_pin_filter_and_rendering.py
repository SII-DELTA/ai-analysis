"""W2 用真实鼠标和 DOM 结果验证交互，不以 setter 返回值代替成功。"""
import pytest
from playwright.sync_api import expect


METRIC_COMBINATIONS = [("effective", "effective"), ("effective", "raw"), ("blended", "effective"), ("blended", "raw")]


def hover_rear_model_then_move_to_overlapping_front_model(page):
    """只布置合成模型和相机，hover 与点击均由真实鼠标触发。"""
    points = page.evaluate("""async () => {
      const scene=FRONTIER_3D_VISUALIZATION_DATASET.metric_variants.effective__effective.three_dimensional_scene;
      const axes=scene.three_dimensional_axis_configuration;
      const valueAtNormalizedCoordinate=(axis,coordinate)=>{
        const value=axis.fixed_range[0]+(coordinate+1)/2*(axis.fixed_range[1]-axis.fixed_range[0]);
        return axis.scale_type==='log'?10**value:value;
      };
      const rearModel=scene.displayed_model_markers.find(model=>model.name==='Qwen4 Max (high)');
      const frontModel=scene.displayed_model_markers.find(model=>model.name==='Gemini 3 Pro');
      scene.displayed_model_markers.forEach(model=>{model.x=1e9;});
      for (const [model,x,y] of [[rearModel,-0.08,0.4],[frontModel,0.02,-0.4]]) {
        model.x=valueAtNormalizedCoordinate(axes.x_axis,x);
        model.y=valueAtNormalizedCoordinate(axes.y_axis,y);
        model.z=valueAtNormalizedCoordinate(axes.z_axis,0);
      }
      // 相同口径的 setter 不重建场景，必须切走再切回来载入布置后的契约。
      await setFrontierMetricCombination('blended','raw');
      await setFrontierMetricCombination('effective','effective');
      const diagnostics=frontierThreeDimensionalRendererDiagnostics;
      diagnostics.camera.position.set(0,-5,0);
      diagnostics.controls.target.set(0,0,0);
      diagnostics.controls.update();diagnostics.requestRender();
      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
      const rearPosition=diagnostics.projectedCanvasPositionForModelName(rearModel.name);
      const radius=diagnostics.projectedCanvasMarkerRadiiForModelName(rearModel.name).logoRadius;
      return {
        exposedRearEdge:{clientX:rearPosition.clientX-radius*0.8,clientY:rearPosition.clientY},
        overlap:{clientX:rearPosition.clientX+radius*0.5,clientY:rearPosition.clientY},
      };
    }""")
    overlap = points["overlap"]
    assert frontmost_model_name_at_pointer_coordinates(page, overlap) == "Gemini 3 Pro"
    exposed_rear_edge = points["exposedRearEdge"]
    page.mouse.move(exposed_rear_edge["clientX"], exposed_rear_edge["clientY"])
    expect(page.locator("#aa-threejs-model-tooltip strong")).to_have_text("Qwen4 Max (high)")
    page.mouse.move(overlap["clientX"], overlap["clientY"])
    page.evaluate("new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))")
    expect(page.locator("#aa-threejs-model-tooltip strong")).to_have_text("Qwen4 Max (high)")
    assert frontmost_model_name_at_pointer_coordinates(page, overlap) == "Qwen4 Max (high)"
    return overlap


def frontmost_model_name_at_pointer_coordinates(page, point):
    return page.evaluate("""point=>{
      const target=frontierThreeDimensionalRendererDiagnostics.pointerInteractionAtCanvasClientCoordinates(point.clientX,point.clientY);
      return target?.interactionTargetKind==='displayed_model'?FRONTIER_3D_INTERACTION_RELATIONSHIPS.models[target.modelIndex].name:null;
    }""", point)


def test_stationary_click_preserves_hovered_rear_model_at_overlap(frontier_page):
    page = frontier_page
    overlap = hover_rear_model_then_move_to_overlapping_front_model(page)
    hovered_model_index = page.evaluate("frontierThreeDimensionalVisualizationState().hoveredModelIndex")
    page.mouse.down()
    expect(page.locator("#aa-threejs-model-tooltip")).to_be_visible()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().hoveredModelIndex") == hovered_model_index
    assert frontmost_model_name_at_pointer_coordinates(page, overlap) == "Qwen4 Max (high)"
    page.mouse.up()
    expect(page.locator(".aa-pinned-card")).to_have_count(1)
    expect(page.locator(".aa-pinned-card")).to_contain_text("Qwen4 Max")
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedBaseModelNames") == ["Qwen4 Max"]


def test_real_drag_returning_to_overlapping_model_does_not_pin(frontier_page):
    page = frontier_page
    overlap = hover_rear_model_then_move_to_overlapping_front_model(page)
    before_drag_camera = page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition")
    page.evaluate("""() => {
      window.frontierDragVerificationLatestPointerCoordinates=null;
      frontierThreeDimensionalRendererDiagnostics.renderer.domElement.addEventListener('pointermove',event=>{
        window.frontierDragVerificationLatestPointerCoordinates={clientX:event.clientX,clientY:event.clientY};
      });
    }""")
    page.mouse.down()
    page.mouse.move(overlap["clientX"]+80, overlap["clientY"]+40, steps=12)
    assert page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition") != pytest.approx(before_drag_camera, abs=1e-6)
    expect(page.locator("#aa-threejs-model-tooltip")).to_be_hidden()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().hoveredModelIndex") is None
    page.mouse.move(overlap["clientX"], overlap["clientY"], steps=12)
    # WebKit 可在下一渲染帧前完成整段鼠标动作；等绘制更新相机矩阵后再检验实际松开坐标。
    page.evaluate("new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))")
    release_pointer_coordinates = page.evaluate("window.frontierDragVerificationLatestPointerCoordinates")
    assert release_pointer_coordinates is not None
    # 松开时仍命中可点击模型，避免「没有固定」只是因为终点落在空白处。
    assert frontmost_model_name_at_pointer_coordinates(page, release_pointer_coordinates) == "Gemini 3 Pro"
    page.mouse.up()
    expect(page.locator(".aa-pinned-card")).to_have_count(0)
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedBaseModelNames") == []


@pytest.mark.parametrize("cost,speed", METRIC_COMBINATIONS)
def test_pin_survives_metric_roundtrip_and_hidden_creator_clears_hover(frontier_page, cost, speed):
    page = frontier_page
    page.evaluate("([cost,speed])=>setFrontierMetricCombination(cost,speed)", [cost, speed])
    before_camera = page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition")
    page.locator("#aa-search-input").fill("Qwen4 Max")
    page.locator('.aa-result-row[data-base-model-name="Qwen4 Max"]').click()
    expect(page.locator(".aa-pinned-card")).to_have_count(1)
    page.evaluate("setFrontierMetricCombination('blended','raw')")
    expect(page.locator(".aa-pinned-card")).to_have_count(1)
    page.evaluate("([cost,speed])=>setFrontierMetricCombination(cost,speed)", [cost, speed])
    expect(page.locator(".aa-pinned-card")).to_have_count(1)
    assert page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition") == pytest.approx(before_camera, abs=1e-10)
    page.locator("#aa-organization-filter-panel summary").click()
    ranking_before = page.evaluate("JSON.stringify(frontierStandoutRanking())")
    global_pareto_count = page.evaluate("frontierThreeDimensionalVisualizationState().paretoFrontierModelCount")
    page.evaluate("showFrontierLineageForModelName('Gemini 3 Pro')")
    expect(page.locator("#aa-threejs-model-tooltip")).to_be_visible()
    page.locator(".aa-organization-filter-row").filter(has_text="Google").locator("input").uncheck()
    expect(page.locator("#aa-threejs-model-tooltip")).to_be_hidden()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().hoveredLineageKey") is None
    assert page.evaluate("frontierThreeDimensionalVisualizationState().displayedPrunedLineageAncestorMarkerCount") == 0
    assert page.evaluate("JSON.stringify(frontierStandoutRanking())") == ranking_before
    state = page.evaluate("frontierThreeDimensionalVisualizationState()")
    assert state["paretoFrontierModelCount"] == global_pareto_count
    assert state["visibleParetoFrontierModelCount"] <= global_pareto_count
    expect(page.locator("#frontier-3d-report-header")).to_contain_text("全局 Pareto")


def test_pointer_drag_suppresses_hover_and_does_not_pin(frontier_page):
    page = frontier_page
    position = page.evaluate("frontierThreeDimensionalRendererDiagnostics.projectedCanvasPositionForModelName('Gemini 3 Pro')")
    page.mouse.move(position["clientX"], position["clientY"])
    page.wait_for_function("!document.querySelector('#aa-threejs-model-tooltip').hidden")
    page.mouse.down()
    page.mouse.move(position["clientX"] + 80, position["clientY"] + 40, steps=12)
    expect(page.locator("#aa-threejs-model-tooltip")).to_be_hidden()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().hoveredModelIndex") is None
    page.mouse.up()
    expect(page.locator(".aa-pinned-card")).to_have_count(0)


def test_transparent_surfaces_preserve_visible_logo_pixels(frontier_page):
    page = frontier_page
    # 相机正对 z=0 曲面；洋红 logo 位于其后，白底 logo 与其他标记被移开。
    observation = page.evaluate("""async () => {
      const d=frontierThreeDimensionalRendererDiagnostics, THREE=window.THREE;
      const canvas=document.createElement('canvas'); canvas.width=canvas.height=32;
      canvas.getContext('2d').fillStyle='#ff00ff'; canvas.getContext('2d').fillRect(0,0,32,32);
      const texture=new THREE.CanvasTexture(canvas);
      const sprite=new THREE.Sprite(new THREE.SpriteMaterial({map:texture, depthWrite:false}));
      sprite.position.set(0,0,-0.5); sprite.scale.set(0.6,0.6,1); sprite.renderOrder=40;
      const geometry=new THREE.PlaneGeometry(2,2);
      const material=d.surfaceMaterialForVisibilityVerification;
      const surface=new THREE.Mesh(geometry,material.clone()); surface.renderOrder=d.surfaceRenderOrder;
      const scene=new THREE.Scene(); scene.background=new THREE.Color('#ffffff'); scene.add(sprite,surface);
      const camera=new THREE.PerspectiveCamera(42,1,0.01,100); camera.position.set(0,0,3); camera.lookAt(0,0,0);
      const renderer=d.renderer; renderer.render(scene,camera);
      const gl=renderer.getContext(), pixel=new Uint8Array(4);
      gl.readPixels(Math.floor(gl.drawingBufferWidth/2),Math.floor(gl.drawingBufferHeight/2),1,1,gl.RGBA,gl.UNSIGNED_BYTE,pixel);
      const result=Array.from(pixel);
      geometry.dispose();surface.material.dispose();sprite.material.dispose();texture.dispose();d.requestRender();
      return result;
    }""")
    assert observation[0] > 130 and observation[2] > 130 and observation[1] < 100, observation


def test_pareto_identity_ring_does_not_change_with_standout_metric(frontier_page):
    page = frontier_page
    before = page.evaluate("frontierThreeDimensionalRendererDiagnostics.markerVisualEncodingSummary()")
    page.evaluate("selectFrontierStandoutMetric('weighted_exclusive_hypervolume')")
    after = page.evaluate("frontierThreeDimensionalRendererDiagnostics.markerVisualEncodingSummary()")
    assert [m["paretoRingScale"] for m in before] == [m["paretoRingScale"] for m in after]
    assert all(m["paretoRingScale"] >= m["backplateScale"] * 1.25 for m in after if m["isPareto"])
    assert all(m["standoutHaloVisible"] for m in after if m["isPareto"])


def test_pin_uuid_survives_missing_variant_and_model_rename(frontier_page):
    page = frontier_page
    missing_base = page.evaluate("""() => {
      const variants=FRONTIER_3D_VISUALIZATION_DATASET.metric_variants;
      const effective=variants.effective__effective.interaction_relationships.base_groups;
      return Object.keys(variants.blended__raw.interaction_relationships.base_groups).find(name=>!(name in effective));
    }""")
    assert missing_base
    page.evaluate("setFrontierMetricCombination('blended','raw')")
    page.evaluate("name=>pinFrontierBaseModel(name)", missing_base)
    page.evaluate("setFrontierMetricCombination('effective','effective')")
    expect(page.locator(".aa-pinned-card")).to_contain_text("当前口径未上图")
    page.evaluate("setFrontierMetricCombination('blended','raw')")
    assert page.locator(".aa-pinned-card").filter(has_text="当前口径未上图").count() == 0
    page.evaluate("name=>unpinFrontierBaseModel(name)", missing_base)
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    before = page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids")
    page.evaluate("""() => {
      const variant=FRONTIER_3D_VISUALIZATION_DATASET.metric_variants.effective__effective;
      variant.three_dimensional_scene.displayed_model_markers.forEach(model=>{
        if (model.base_model_name==='Qwen4 Max') {model.name=model.name.replace('Qwen4 Max','Qwen4 Renamed');model.base_model_name='Qwen4 Renamed';}
      });
      for (const field of ['base_groups','reasoning_variant_group_model_indices_by_base_model_name']) {
        const groups=variant.interaction_relationships[field];groups['Qwen4 Renamed']=groups['Qwen4 Max'];delete groups['Qwen4 Max'];
      }
    }""")
    page.evaluate("setFrontierMetricCombination('effective','effective')")
    expect(page.locator(".aa-pinned-card")).to_contain_text("Qwen4 Renamed")
    assert page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids") == before


def test_relationship_line_width_changes_actual_rendered_pixel_width(frontier_page):
    widths = frontier_page.evaluate("""() => {
      const d=frontierThreeDimensionalRendererDiagnostics, THREE=window.THREE, renderer=d.renderer;
      const camera=new THREE.OrthographicCamera(-1,1,1,-1,0.01,10);camera.position.z=3;
      const scene=new THREE.Scene();scene.background=new THREE.Color('white');
      const gl=renderer.getContext(); const widths=[];
      for (const requestedWidth of [1,3.5]) {
        const line=d.createRelationshipLineForVerification([new THREE.Vector3(-0.8,0,0),new THREE.Vector3(0.8,0,0)],0x000000,requestedWidth);
        scene.add(line);renderer.render(scene,camera);
        const pixels=new Uint8Array(4*21);
        gl.readPixels(Math.floor(gl.drawingBufferWidth/2),Math.floor(gl.drawingBufferHeight/2)-10,1,21,gl.RGBA,gl.UNSIGNED_BYTE,pixels);
        widths.push(Array.from({length:21},(_,i)=>pixels[i*4]<150).filter(Boolean).length);
        scene.remove(line);line.geometry.dispose();line.material.dispose();
      }
      d.requestRender();return widths;
    }""")
    assert widths[1] >= widths[0] + 2, widths


def test_pinned_foreground_target_remains_pickable_above_nearer_normal_marker(frontier_page):
    page = frontier_page
    overlap = hover_rear_model_then_move_to_overlapping_front_model(page)
    page.evaluate("pinFrontierBaseModel('Qwen4 Max')")
    page.mouse.move(0, 0)
    expect(page.locator("#aa-threejs-model-tooltip")).to_be_hidden()
    assert page.evaluate("frontierThreeDimensionalVisualizationState().hoveredModelIndex") is None
    assert frontmost_model_name_at_pointer_coordinates(page, overlap) == "Qwen4 Max (high)"
