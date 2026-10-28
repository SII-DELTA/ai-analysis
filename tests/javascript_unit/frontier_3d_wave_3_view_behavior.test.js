import test from "node:test";
import assert from "node:assert/strict";
import { matchingModelGroups } from "../../src/frontier_3d_interactive_report_assets/frontier_3d_threejs_base_model_search_matcher.js";
import { compareModelReasoningLevels, percentageDifferenceFromBaseline, committedStandoutAxisWeight, formatSignificantNumber, layoutPinnedModelNameAnnotations } from "../../src/frontier_3d_interactive_report_assets/frontier_3d_threejs_model_comparison_view_calculations.js";
import { calculateWeightedExclusiveHypervolumeSummary, calculateFrontierStandoutMetricValues } from "../../src/frontier_3d_interactive_report_assets/frontier_3d_threejs_standout_metric_calculator.js";

test("搜索完整名称、基模型、厂商与档位，保留未上图原因并报告全部组数", () => {
  const records = [
    { name: "Alpha (high effort)", base_model_name: "Alpha", creator: "Future Lab", reasoning_level_label: "high" },
    { name: "Alpha (low)", base_model_name: "Alpha", creator: "Future Lab", reasoning_level_label: "low" },
    { name: "Invisible", base_model_name: "Invisible", creator: "Missing Lab", drop_reason: "缺少速度" },
  ];
  for (const query of ["HIGH EFFORT", "alpha", "  FUTURE   lab ", "low"]) assert.equal(matchingModelGroups(records, query).groups[0].baseModelName, "Alpha");
  assert.equal(matchingModelGroups(records, "missing").groups[0].models[0].drop_reason, "缺少速度");
  const many = Array.from({ length: 53 }, (_, index) => ({ name: `Model ${index}`, base_model_name: `Model ${index}` }));
  assert.equal(matchingModelGroups(many, "model").totalGroupCount, 53);
  assert.equal(matchingModelGroups(many, "model").groups.length, 40);
  assert.deepEqual(matchingModelGroups(records, " ").groups, []);
});

test("档位升序且稳定，空值和零基准不计算百分比，小成本不显示为零", () => {
  const models = [{ name: "high", reasoning_level_sort_order: 3 }, { name: "low", reasoning_level_sort_order: 1 }, { name: "medium", reasoning_level_sort_order: 2 }];
  assert.deepEqual(models.sort(compareModelReasoningLevels).map(model => model.name), ["low", "medium", "high"]);
  assert.equal(percentageDifferenceFromBaseline(15, 10), 50);
  for (const baseline of [0, null, undefined, NaN]) assert.equal(percentageDifferenceFromBaseline(15, baseline), null);
  assert.equal(percentageDifferenceFromBaseline(null, 10), null);
  assert.equal(formatSignificantNumber(0.00012345), "0.000123");
  assert.equal(formatSignificantNumber(null), "未记录");
});

test("权重仅提交有限值，清空回到原值，钳位至 0.25–4", () => {
  for (const draft of ["", " ", "abc", "Infinity"]) assert.equal(committedStandoutAxisWeight(draft, 1.5), 1.5);
  assert.equal(committedStandoutAxisWeight("0", 1), 0.25);
  assert.equal(committedStandoutAxisWeight("9", 1), 4);
  assert.equal(committedStandoutAxisWeight("2.5", 1), 2.5);
});

test("超体积分母为完整前沿体积，保留旧数组接口及原始数值", () => {
  const models = [[1, .5, 1], [.5, 1, 1]].map(([cost_efficiency, speed, intelligence]) => ({ normalized_improvement_coordinates: { cost_efficiency, speed, intelligence } }));
  const weights = { cost: 1, speed: 1, intelligence: 1 };
  const summary = calculateWeightedExclusiveHypervolumeSummary(models, weights);
  assert.deepEqual(summary.contributions, [.25, .25]);
  assert.equal(summary.completeFrontierHypervolume, .75);
  assert.deepEqual(calculateFrontierStandoutMetricValues(models, "weighted_exclusive_hypervolume", weights), summary.contributions);
  assert.deepEqual(calculateWeightedExclusiveHypervolumeSummary([], weights), { contributions: [], completeFrontierHypervolume: 0 });
});

test("密集固定名称在画布内逐行避让，离屏名称不显示", () => {
  const layout = layoutPinnedModelNameAnnotations(300, 200, [0, 1, 2].map(id => ({ id, x: 100, y: 100, width: 150, height: 20, visible: id !== 2 })));
  assert.equal(layout[0].hidden, false);
  assert.equal(layout[1].hidden, false);
  assert.ok(Math.abs(layout[0].y - layout[1].y) >= 22);
  assert.equal(layout[2].hidden, true);
  for (const label of layout.filter(label => !label.hidden)) assert.ok(label.x >= 0 && label.x + 150 <= 300 && label.y >= 0 && label.y + 20 <= 200);
});
