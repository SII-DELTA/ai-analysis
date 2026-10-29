import assert from "node:assert/strict";
import test from "node:test";
import {
  encodeFrontierViewStateHash, decodeFrontierViewStateHash, sanitizeFrontierViewState,
  modelVisibilityForExplorationFilters, sortAndFilterFrontierModelTableRows, exportFrontierModelTableCsv,
  frontierModelTableAnalysisEligibility,
} from "../../src/frontier_3d_interactive_report_assets/frontier_3d_view_state_and_model_table.js";
import {cameraDistanceToFitBoundingSphere} from "../../src/frontier_3d_interactive_report_assets/frontier_3d_camera_view_controls.js";

test("URL 状态往返只保留白名单与有限值，未知版本不应用", () => {
  const state = {version:1, metric_variant_key:"effective__tasks_per_hour", pinned_model_uuids:["12345678-1234-1234-1234-123456789abc"],
    camera:{position:[1,2,3],target:[0,0,0],up:[0,1,0]}, unexpected:"secret", display:{measured_only:true}, table:{sort_field:"intelligence", sort_direction:"desc", active_tab:"table"}};
  assert.deepEqual(decodeFrontierViewStateHash(encodeFrontierViewStateHash(state)).state, sanitizeFrontierViewState(state));
  assert.equal(sanitizeFrontierViewState(state).unexpected, undefined);
  assert.equal(sanitizeFrontierViewState({...state,camera:{position:[Infinity,0,0]}}).camera, undefined);
  assert.equal(decodeFrontierViewStateHash("#frontier-view-state-v2=%7B%7D").state, null);
  assert.equal(decodeFrontierViewStateHash("#frontier-view-state-v1=%").state, null);
});

test("日期与实测筛选只改变可见性，未知日期不被推断", () => {
  const model = {name:"A",intelligence_measurement_status:"measured",panel:{release_date:"2026-10-28"},layer:1};
  assert.equal(modelVisibilityForExplorationFilters(model,{measured_only:true,cutoff_date:"2026-10-01",date_mode:"hide"}).visible,false);
  assert.equal(modelVisibilityForExplorationFilters(model,{cutoff_date:"2026-10-01",date_mode:"fade"}).faded,true);
  assert.equal(modelVisibilityForExplorationFilters({...model,panel:{release_date:"?"}},{cutoff_date:"2026-10-01",date_mode:"hide"}).visible,true);
  assert.equal(model.layer,1);
  assert.equal(modelVisibilityForExplorationFilters({...model,intelligence_measurement_status:"unknown"},{measured_only:true}).visible,false);
});

test("表格缺值置后、排序稳定且 CSV 防公式注入并保留单位和来源", () => {
  const rows = [{model_index:0,name:"=1+2",creator:"A",panel:{intelligence:null}},
    {model_index:1,name:"高分",creator:"A",panel:{intelligence:20}},
    {model_index:2,name:"低分",creator:"A",panel:{intelligence:10}}];
  assert.deepEqual(sortAndFilterFrontierModelTableRows(rows,{sort_field:"intelligence",sort_direction:"desc"}).map(row=>row.model_index),[1,2,0]);
  const csv=exportFrontierModelTableCsv(rows);
  assert.match(csv,/任务\/小时/);
  assert.match(csv,/来源/);
  assert.match(csv,/'=1\+2/);
  assert.match(csv,/\r\n/);
});

test("包围球取景为窄屏和轴标注留白",()=>{
  const desktop=cameraDistanceToFitBoundingSphere({radius:Math.sqrt(3),verticalFieldOfViewDegrees:42,canvasWidth:1100,canvasHeight:700});
  const narrow=cameraDistanceToFitBoundingSphere({radius:Math.sqrt(3),verticalFieldOfViewDegrees:42,canvasWidth:320,canvasHeight:600});
  assert.ok(narrow>desktop);
  assert.ok(Math.sqrt(3)/narrow < Math.sin(Math.atan(Math.tan(21*Math.PI/180)*(320-112)/600)));
  assert.throws(()=>cameraDistanceToFitBoundingSphere({radius:NaN,verticalFieldOfViewDegrees:42,canvasWidth:320,canvasHeight:600}));
});

test("旧文件未知资格不伪装成不合格，已展示层号保留旧默认语义",()=>{
  assert.equal(frontierModelTableAnalysisEligibility({is_displayed:true,layer:1}),true);
  assert.equal(frontierModelTableAnalysisEligibility({is_displayed:false}),null);
  assert.equal(frontierModelTableAnalysisEligibility({analysis_eligibility:{is_analysis_eligible_for_current_metric_variant:true},missing_dimension_names:['speed']}),false);
  assert.deepEqual(sortAndFilterFrontierModelTableRows([{model_index:0,name:'未知',is_displayed:false}],{analysis_filter:'ineligible'}),[]);
});
