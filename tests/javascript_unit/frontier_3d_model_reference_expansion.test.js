import test from "node:test";
import assert from "node:assert/strict";
import { expandFrontierModelReferencesForSceneConsumers } from "../../src/frontier_3d_interactive_report_assets/frontier_3d_model_reference_expander.js";

test("引用展开保留搜索解释、完整 panel 和模型身份，不修改投影", () => {
  const projection = {
    schema_version: "frontier_3d_browser_projection/v1",
    models: [{ name: "模型 A", creator: "厂商", model_uuid: null, identity_resolution: "legacy_creator_and_name_without_uuid", panel: { intelligence: 40, release_date: "?" } }],
    analysis_eligibility_definitions: [{is_analysis_eligible_for_current_metric_variant: true, ineligibility_reason_codes: []}],
    metric_variants: { effective__effective: {
      three_dimensional_scene: { displayed_model_markers: [{ model_index: 0, x: 1, y: 2, z: 40, panel: { layer: 1 }, analysis_eligibility_index: 0 }] },
      excluded_models_with_drop_reason: [{ model_index: 0, drop_reason: "缺少原始速度", missing_dimension_names: ["output_speed"] }],
      interaction_relationships: { lineages: {} },
    } },
  };
  const original = structuredClone(projection);
  const expanded = expandFrontierModelReferencesForSceneConsumers(projection);
  const variant = expanded.metric_variants.effective__effective;
  assert.equal(variant.three_dimensional_scene.displayed_model_markers[0].name, "模型 A");
  assert.equal(variant.three_dimensional_scene.displayed_model_markers[0].panel.intelligence, 40);
  assert.equal(variant.excluded_models_with_drop_reason[0].drop_reason, "缺少原始速度");
  variant.three_dimensional_scene.displayed_model_markers[0].analysis_eligibility.ineligibility_reason_codes.push("合成修改");
  assert.deepEqual(projection, original);
  projection.metric_variants.effective__effective.three_dimensional_scene.displayed_model_markers[0].model_index = 99;
  assert.throws(() => expandFrontierModelReferencesForSceneConsumers(projection), /model_index/);
});
