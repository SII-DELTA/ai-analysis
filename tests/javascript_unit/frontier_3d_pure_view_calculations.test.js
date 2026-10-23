import test from "node:test";
import assert from "node:assert/strict";
import { axisTickValues } from "../../src/frontier_3d_interactive_report_assets/frontier_3d_threejs_axis_tick_value_generator.js";
import { matchingBaseModelNames } from "../../src/frontier_3d_interactive_report_assets/frontier_3d_threejs_base_model_search_matcher.js";
import { solveFrontierAxisAnnotationLayout } from "../../src/frontier_3d_interactive_report_assets/frontier_3d_threejs_axis_annotation_layout_solver.js";

test("线性与对数刻度位于范围内且单调，退化范围不生成刻度", () => {
  for (const [scale_type, fixed_range] of [["linear", [0, 125]], ["log", [-2, 3]], ["log", [1, 1.2]]]) {
    const values = axisTickValues({ scale_type, fixed_range });
    assert.ok(values.length >= 3);
    assert.ok(values.every((value, index) => Number.isFinite(value) && (!index || value > values[index - 1])));
    assert.ok(values.every((value) => {
      const scaled = scale_type === "log" ? Math.log10(value) : value;
      return scaled >= fixed_range[0] - 1e-10 && scaled <= fixed_range[1] + 1e-10;
    }));
  }
  for (const fixed_range of [[1, 1], [2, 1], [0, Infinity]]) {
    assert.deepEqual(axisTickValues({ scale_type: "linear", fixed_range }), []);
  }
});

test("搜索使用稳定大小写及空白归一，不修改调用方数组", () => {
  const names = ["GPT-6 Sol", "Gemini 3 Pro", "GPT-6 Luna"];
  assert.deepEqual(matchingBaseModelNames(names, "  gPt-6   sOl "), ["GPT-6 Sol"]);
  assert.deepEqual(matchingBaseModelNames(names, ""), []);
  assert.equal(matchingBaseModelNames(Array.from({ length: 50 }, (_, i) => `GPT ${i}`), "gpt").length, 40);
  assert.equal(names.length, 3);
});

test("标注布局保持刻度真实锚点，标题优先且不越界", () => {
  const layout = solveFrontierAxisAnnotationLayout({
    canvasWidth: 390, canvasHeight: 300, projectedCenter: { x: 195, y: 150 },
    axes: [{ projectedStart: { x: 30, y: 230 }, projectedEnd: { x: 360, y: 230 }, labels: [
      { id: "title", isTitle: true, anchor: { x: 195, y: 230 }, projectedDepth: 0, width: 200, height: 20 },
      { id: "tick", isTitle: false, anchor: { x: 120, y: 230 }, projectedDepth: 0, width: 30, height: 14 },
      { id: "clipped", isTitle: false, anchor: { x: 220, y: 230 }, projectedDepth: 2, width: 30, height: 14 },
    ] }],
  });
  assert.equal(layout.find((x) => x.id === "title").hidden, false);
  assert.equal(layout.find((x) => x.id === "tick").x, 120);
  assert.equal(layout.find((x) => x.id === "clipped").hidden, true);
  for (const label of layout.filter((x) => !x.hidden)) {
    assert.ok(label.x >= 2 && label.x <= 388 && label.y >= 2 && label.y <= 298);
  }
});
