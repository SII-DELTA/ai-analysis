import test from "node:test";
import assert from "node:assert/strict";
import { expandFrontierModelReferencesForSceneConsumers } from "../../src/frontier_3d_interactive_report_assets/frontier_3d_model_reference_expander.js";

test("引用展开保留搜索解释、完整 panel 和模型身份，不修改投影", () => {
  const projection = {
    schema_version: "frontier_3d_browser_projection/v1",
    models: [{ name: "模型 A", creator: "厂商", tier: "pro", model_uuid: null, identity_resolution: "legacy_creator_and_name_without_uuid", panel: { intelligence: 40, release_date: "?" } }],
    analysis_eligibility_definitions: [{is_analysis_eligible_for_current_metric_variant: true, ineligibility_reason_codes: []}],
    excluded_model_explanation_definitions: [{drop_reason: "缺少原始速度", missing_dimension_names: ["output_speed"]}],
    metric_variants: { effective__effective: {
      three_dimensional_scene: { displayed_model_markers: [{ model_index: 0, x: 1, y: 2, z: 40, panel: { layer: 1 }, analysis_eligibility_index: 0 }] },
      excluded_models_with_drop_reason: [{ model_index: 0, excluded_model_explanation_index: 0 }],
      interaction_relationships: { lineages: {} },
    } },
  };
  const original = structuredClone(projection);
  const expanded = expandFrontierModelReferencesForSceneConsumers(projection);
  const variant = expanded.metric_variants.effective__effective;
  assert.equal(variant.three_dimensional_scene.displayed_model_markers[0].name, "模型 A");
  assert.equal(variant.three_dimensional_scene.displayed_model_markers[0].panel.intelligence, 40);
  assert.equal(variant.excluded_models_with_drop_reason[0].drop_reason, "缺少原始速度");
  assert.equal(variant.excluded_models_with_drop_reason[0].tier, "pro");
  variant.three_dimensional_scene.displayed_model_markers[0].analysis_eligibility.ineligibility_reason_codes.push("合成修改");
  variant.excluded_models_with_drop_reason[0].missing_dimension_names.push("合成修改");
  assert.deepEqual(projection, original);
  projection.metric_variants.effective__effective.three_dimensional_scene.displayed_model_markers[0].model_index = 99;
  assert.throws(() => expandFrontierModelReferencesForSceneConsumers(projection), /model_index/);
  projection.metric_variants.effective__effective.three_dimensional_scene.displayed_model_markers[0].model_index = 0;
  projection.metric_variants.effective__effective.excluded_models_with_drop_reason[0].excluded_model_explanation_index = 9;
  assert.throws(() => expandFrontierModelReferencesForSceneConsumers(projection), /excluded_model_explanation_index/);
  projection.metric_variants.effective__effective.excluded_models_with_drop_reason[0] = {model_index: 0, drop_reason: "旧投影内联解释", missing_dimension_names: ["output_speed"]};
  assert.equal(expandFrontierModelReferencesForSceneConsumers(projection).metric_variants.effective__effective.excluded_models_with_drop_reason[0].drop_reason, "旧投影内联解释");
});
