import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { solveFrontierAxisAnnotationLayout } from "../../src/frontier_3d_interactive_report_assets/frontier_3d_threejs_axis_annotation_layout_solver.js";

test("320px 长速度轴名仍为三个轴标题保留不重叠的位置", () => {
  const input = JSON.parse(readFileSync(new URL("../fixtures/frontier_3d_320px_long_speed_axis_title_layout.json", import.meta.url)));
  const original = structuredClone(input);
  const layout = solveFrontierAxisAnnotationLayout(input);
  assert.equal(layout.length, 3);
  assert.ok(layout.every((label) => !label.hidden));
  assert.ok(layout.every((label) => label.x >= 2 && label.x <= input.canvasWidth - 2 && label.y >= 2 && label.y <= input.canvasHeight - 2));
  assert.deepEqual(input, original);
});
