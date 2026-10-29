"""验证三维坐标轴刻度、标题以及相机操作后的投影位置。"""
from __future__ import annotations

import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

from tests.browser_playwright.frontier_3d_playwright_verification_support import (
    create_frontier_3d_test_page_with_runtime_observation,
    launch_requested_frontier_3d_test_browser,
    wait_for_frontier_layout_transitions_and_render,
)

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from src.frontier_3d_worktree_storage_paths import resolve_frontier_3d_storage_paths, refuse_shared_worktree_directory_write
from src.frontier_3d_worktree_storage_paths import resolve_frontier_3d_storage_paths
HTML_PATH = Path(sys.argv[1]) if len(sys.argv) > 1 else resolve_frontier_3d_storage_paths().output_html_path
HTML_PATH = HTML_PATH.resolve()
# 截图目录：缺省与 HTML 同目录（旧行为）；run_all 会设成临时目录，免得往共享的 output/ 写截图（R3-F11）
AXIS_ANNOTATION_SCREENSHOT_DIRECTORY = Path(
    os.environ.get("FRONTIER_3D_AXIS_ANNOTATION_SCREENSHOT_DIRECTORY") or (Path(__file__).resolve().parents[2] / ".frontier-3d-worktree-artifacts" / "axis-annotation-screenshots")
).resolve()
refuse_shared_worktree_directory_write(AXIS_ANNOTATION_SCREENSHOT_DIRECTORY)
AXIS_ANNOTATION_SCREENSHOT_DIRECTORY.mkdir(parents=True, exist_ok=True)


def verify_projected_axis_annotations(page, variant_key):
    wait_for_frontier_layout_transitions_and_render(page)
    failures = page.evaluate(
        """variantKey => {
          const failures = [];
          const dataset = window.FRONTIER_3D_VISUALIZATION_DATASET;
          const axes = dataset.metric_variants[variantKey].three_dimensional_scene
            .three_dimensional_axis_configuration;
          const camera = window.frontierThreeDimensionalRendererDiagnostics.camera;
          const canvas = document.querySelector('canvas').getBoundingClientRect();
          for (const axisName of ['x', 'y', 'z']) {
            const configuration = axes[`${axisName}_axis`];
            const title = document.querySelector(`.aa-threejs-axis-label[data-axis-name="${axisName}"]`);
            if (!title || title.hidden || title.textContent !== configuration.title_text) {
              failures.push(`${axisName}: 标题或单位缺失`);
            }
            const ticks = [...document.querySelectorAll(
              `.aa-threejs-axis-tick-label[data-axis-name="${axisName}"]`,
            )];
            if (ticks.length < 3) failures.push(`${axisName}: 刻度不足`);
            const [minimum, maximum] = configuration.fixed_range;
            const seenValues = new Set();
            ticks.forEach(tick => {
              const value = Number(tick.dataset.axisValue);
              const scaledValue = configuration.scale_type === 'log' ? Math.log10(value) : value;
              if (!Number.isFinite(value) || scaledValue < minimum || scaledValue > maximum ||
                  Number(tick.textContent) !== value || seenValues.has(value)) {
                failures.push(`${axisName}: 错误刻度 ${tick.textContent}`);
              }
              seenValues.add(value);
              // W3 字号增大后可隐藏发生碰撞的刻度；仍校验全部生成值及可见刻度的真实投影。
              if (tick.hidden) return;
              const coordinate = -1 + 2 * (scaledValue - minimum) / (maximum - minimum);
              const position = new window.frontierThreeDimensionalRendererDiagnostics.verificationGeometryConstructors.Vector3(
                axisName === 'x' ? coordinate : -1,
                axisName === 'y' ? coordinate : axisName === 'x' ? 1 : -1,
                axisName === 'z' ? coordinate : -1,
              ).project(camera);
              const bounds = tick.getBoundingClientRect();
              const distance = Math.hypot(
                bounds.x + bounds.width / 2 - canvas.x - (position.x + 1) * canvas.width / 2,
                bounds.y + bounds.height / 2 - canvas.y - (1 - position.y) * canvas.height / 2,
              );
              if (distance > 17) {
                failures.push(`${axisName}: 刻度未随三维位置投影 (${distance})`);
              }
              if (getComputedStyle(tick).pointerEvents !== 'none') {
                failures.push(`${axisName}: 标注阻挡鼠标交互`);
              }
            });
            // 一至两个数量级的对数轴不能留下超过半轴的无刻度区间。
            if (configuration.scale_type === 'log' && maximum - minimum >= 1 && maximum - minimum < 2) {
              const positions = [minimum, ...[...seenValues].map(Math.log10), maximum];
              if (positions.slice(1).some((value, index) =>
                  (value - positions[index]) / (maximum - minimum) > 0.5)) {
                failures.push(`${axisName}: 对数刻度分布不均`);
              }
            }
          }
          for (const label of document.querySelectorAll('.aa-threejs-axis-label, .aa-threejs-axis-tick-label')) {
            if (label.hidden) continue;
            const bounds = label.getBoundingClientRect();
            if (bounds.left < canvas.left || bounds.right > canvas.right ||
                bounds.top < canvas.top || bounds.bottom > canvas.bottom) {
              failures.push(`标注被画布裁切: ${label.textContent}`);
            }
          }
          if (document.querySelectorAll('.aa-threejs-axis-label').length !== 3) {
            failures.push('指标切换后标题重复');
          }
          return failures;
        }""",
        variant_key,
    )
    assert not failures, failures



def verify_constrained_axis_annotations(page, variant_key, require_all_titles):
    """验证可见标注未裁切/互盖，且仍连接原轴；离屏刻度不能伪造到边缘。"""
    wait_for_frontier_layout_transitions_and_render(page)
    result = page.evaluate("""({variantKey, requireAllTitles}) => {
      const failures = [];
      const {camera} = window.frontierThreeDimensionalRendererDiagnostics;
      const axes = window.FRONTIER_3D_VISUALIZATION_DATASET.metric_variants[variantKey]
        .three_dimensional_scene.three_dimensional_axis_configuration;
      const canvas = document.querySelector('canvas').getBoundingClientRect();
      const project = position => {
        const projected = position.project(camera);
        return new window.frontierThreeDimensionalRendererDiagnostics.verificationGeometryConstructors.Vector2((projected.x + 1) * canvas.width / 2,
          (1 - projected.y) * canvas.height / 2);
      };
      const visibleRectangles = [];
      let hiddenOffscreenTicks = 0;
      let visibleTitles = 0;
      for (const label of document.querySelectorAll('.aa-threejs-axis-label, .aa-threejs-axis-tick-label')) {
        const axisName = label.dataset.axisName;
        const isTitle = label.classList.contains('aa-threejs-axis-label');
        const configuration = axes[`${axisName}_axis`];
        const start = project(new window.frontierThreeDimensionalRendererDiagnostics.verificationGeometryConstructors.Vector3(-1, axisName === 'x' ? 1 : -1, -1));
        const end = project(new window.frontierThreeDimensionalRendererDiagnostics.verificationGeometryConstructors.Vector3(axisName === 'x' ? 1 : -1,
          axisName === 'z' ? -1 : 1, axisName === 'z' ? 1 : -1));
        const direction = end.clone().sub(start);
        let anchor;
        if (isTitle) {
          if (label.textContent !== configuration.title_text || (requireAllTitles && label.hidden)) {
            failures.push(`${axisName}: 完整轴名或单位缺失`);
          }
        } else {
          const value = Number(label.dataset.axisValue);
          const scaledValue = configuration.scale_type === 'log' ? Math.log10(value) : value;
          const [minimum, maximum] = configuration.fixed_range;
          const coordinate = -1 + 2 * (scaledValue - minimum) / (maximum - minimum);
          anchor = project(new window.frontierThreeDimensionalRendererDiagnostics.verificationGeometryConstructors.Vector3(axisName === 'x' ? coordinate : -1,
            axisName === 'y' ? coordinate : axisName === 'x' ? 1 : -1,
            axisName === 'z' ? coordinate : -1));
          if (anchor.x < 0 || anchor.x > canvas.width || anchor.y < 0 || anchor.y > canvas.height) {
            if (!label.hidden) failures.push(`${axisName}: 离屏刻度伪造到画布边缘`);
            else hiddenOffscreenTicks += 1;
          }
          if (Number(label.textContent) !== value) failures.push(`${axisName}: 刻度显示数值不准确`);
        }
        if (label.hidden) continue;
        const bounds = label.getBoundingClientRect();
        if (bounds.left < canvas.left || bounds.right > canvas.right || bounds.top < canvas.top || bounds.bottom > canvas.bottom) {
          failures.push(`${axisName}: 可见标注被裁切`);
        }
        const center = new window.frontierThreeDimensionalRendererDiagnostics.verificationGeometryConstructors.Vector2(bounds.x + bounds.width / 2 - canvas.x,
          bounds.y + bounds.height / 2 - canvas.y);
        if (isTitle) {
          visibleTitles += 1;
          const fraction = center.clone().sub(start).dot(direction) / direction.lengthSq();
          if (fraction < -0.001 || fraction > 1.001) failures.push(`${axisName}: 轴名脱离真实轴段`);
          anchor = start.clone().addScaledVector(direction, fraction);
        }
        const displacement = center.clone().sub(anchor);
        if (displacement.length() > (isTitle ? 48 : 16) + 1 ||
            Math.abs(displacement.dot(direction.clone().normalize())) > 1) {
          failures.push(`${axisName}: 标注脱离对应投影锚点`);
        }
        const matrix = new DOMMatrix(getComputedStyle(label).transform);
        visibleRectangles.push({text: label.textContent, center,
          directions: [new window.frontierThreeDimensionalRendererDiagnostics.verificationGeometryConstructors.Vector2(matrix.a, matrix.b), new window.frontierThreeDimensionalRendererDiagnostics.verificationGeometryConstructors.Vector2(matrix.c, matrix.d)],
          halfSizes: [label.offsetWidth / 2, label.offsetHeight / 2]});
      }
      // 旋转标题的外接框可以重叠，文本矩形本身不能相交。
      if (requireAllTitles) visibleRectangles.forEach((first, index) => {
        visibleRectangles.slice(index + 1).forEach(second => {
          const separated = [...first.directions, ...second.directions].some(direction => {
            const radius = rectangle => rectangle.directions.reduce((sum, edge, index) =>
              sum + Math.abs(edge.dot(direction)) * rectangle.halfSizes[index], 0);
            return Math.abs(first.center.clone().sub(second.center).dot(direction)) >= radius(first) + radius(second) - 1;
          });
          if (!separated) failures.push(`标注互相覆盖: ${first.text} / ${second.text}`);
        });
      });
      return {failures, hiddenOffscreenTicks, visibleTitles};
    }""", {'variantKey': variant_key, 'requireAllTitles': require_all_titles})
    assert not result['failures'], result['failures']
    return result


def main():
    with sync_playwright() as playwright:
        browser = launch_requested_frontier_3d_test_browser(playwright)
        page, observation = create_frontier_3d_test_page_with_runtime_observation(browser)
        page.goto(HTML_PATH.as_uri())
        page.wait_for_function("() => window.frontierThreeDimensionalRendererDiagnostics")
        variant_keys = page.evaluate("() => Object.keys(window.FRONTIER_3D_VISUALIZATION_DATASET.metric_variants)")
        initial_variant = page.evaluate("() => window.FRONTIER_3D_VISUALIZATION_DATASET.initial_variant_key")
        verify_projected_axis_annotations(page, initial_variant)
        page.screenshot(path=str(AXIS_ANNOTATION_SCREENSHOT_DIRECTORY / "axis-annotations-default.png"))
        for variant_key in variant_keys:
            page.evaluate("key => window.setFrontierMetricCombination(...key.split('__'))", variant_key)
            verify_projected_axis_annotations(page, variant_key)

        canvas = page.locator('canvas').bounding_box()
        page.mouse.move(canvas['x'] + canvas['width'] / 2, canvas['y'] + canvas['height'] / 2)
        before_rotation = page.locator('.aa-threejs-axis-label').first.get_attribute('style')
        page.mouse.down()
        page.mouse.move(canvas['x'] + canvas['width'] / 2 + 130, canvas['y'] + canvas['height'] / 2 + 30, steps=8)
        page.mouse.up()
        verify_projected_axis_annotations(page, variant_keys[-1])
        assert page.locator('.aa-threejs-axis-label').first.get_attribute('style') != before_rotation
        page.mouse.wheel(0, 120)
        page.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
        verify_projected_axis_annotations(page, variant_keys[-1])
        page.evaluate("() => window.setFrontierSidePanelExpanded(false)")
        page.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
        verify_projected_axis_annotations(page, variant_keys[-1])
        page.screenshot(path=str(AXIS_ANNOTATION_SCREENSHOT_DIRECTORY / "axis-annotations-rotated.png"))
        page.set_viewport_size({'width': 900, 'height': 700})
        verify_projected_axis_annotations(page, variant_keys[-1])

        constrained_page, constrained_observation = create_frontier_3d_test_page_with_runtime_observation(browser)
        constrained_page.set_viewport_size({'width': 320, 'height': 568})
        constrained_page.goto(HTML_PATH.as_uri())
        constrained_page.wait_for_function("() => window.frontierThreeDimensionalRendererDiagnostics")
        for variant_key in variant_keys:
            constrained_page.evaluate("key => window.setFrontierMetricCombination(...key.split('__'))", variant_key)
            verify_constrained_axis_annotations(constrained_page, variant_key, True)
        constrained_page.screenshot(path=str(AXIS_ANNOTATION_SCREENSHOT_DIRECTORY / "axis-annotations-320px.png"))

        constrained_page.set_viewport_size({'width': 1400, 'height': 900})
        constrained_page.reload()
        constrained_page.wait_for_function("() => window.frontierThreeDimensionalRendererDiagnostics")
        canvas = constrained_page.locator('canvas').bounding_box()
        constrained_page.mouse.move(canvas['x'] + canvas['width'] / 2, canvas['y'] + canvas['height'] / 2)
        original_distance = constrained_page.evaluate("() => window.frontierThreeDimensionalRendererDiagnostics.controls.getDistance()")
        constrained_page.mouse.wheel(0, -500)
        constrained_page.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
        assert constrained_page.evaluate("() => window.frontierThreeDimensionalRendererDiagnostics.controls.getDistance()") < original_distance
        verify_constrained_axis_annotations(constrained_page, initial_variant, True)
        constrained_page.screenshot(path=str(AXIS_ANNOTATION_SCREENSHOT_DIRECTORY / "axis-annotations-zoom-in.png"))
        constrained_page.mouse.wheel(0, -3000)
        constrained_page.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
        assert constrained_page.evaluate("() => Math.abs(window.frontierThreeDimensionalRendererDiagnostics.controls.getDistance() - window.frontierThreeDimensionalRendererDiagnostics.controls.minDistance) < 0.01")
        assert verify_constrained_axis_annotations(constrained_page, initial_variant, False)['hiddenOffscreenTicks'] > 0
        constrained_page.screenshot(path=str(AXIS_ANNOTATION_SCREENSHOT_DIRECTORY / "axis-annotations-minimum-distance.png"))
        constrained_page.mouse.wheel(0, 3000)
        constrained_page.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
        verify_projected_axis_annotations(constrained_page, initial_variant)
        assert not constrained_observation.page_runtime_errors, constrained_observation.page_runtime_errors
        assert not constrained_observation.external_network_request_urls, constrained_observation.external_network_request_urls
        constrained_page.close()

        # 复用真实页面覆盖窄对数范围与线性速度，不依赖另一个数据快照。
        alternate_variant = next(key for key in variant_keys if key != initial_variant)
        page.evaluate("key => window.setFrontierMetricCombination(...key.split('__'))", alternate_variant)
        page.evaluate("""key => {
          const axes = window.FRONTIER_3D_VISUALIZATION_DATASET.metric_variants[key]
            .three_dimensional_scene.three_dimensional_axis_configuration;
          axes.x_axis.fixed_range = [Math.log10(2), Math.log10(4)];
          axes.y_axis.scale_type = 'linear';
          axes.y_axis.fixed_range = [0, 250];
          axes.y_axis.title_text = '原始速度 tok/s';
          axes.z_axis.fixed_range = [-48, 12];
        }""", initial_variant)
        page.evaluate("key => window.setFrontierMetricCombination(...key.split('__'))", initial_variant)
        verify_projected_axis_annotations(page, initial_variant)
        for axis_name, expected_values in (
            ('x', [2, 2.5, 3, 3.5, 4]),
            ('y', [0, 50, 100, 150, 200, 250]),
            ('z', [-40, -20, 0]),
        ):
            actual_values = page.locator(
                f'.aa-threejs-axis-tick-label[data-axis-name="{axis_name}"]'
            ).evaluate_all("ticks => ticks.map(tick => Number(tick.dataset.axisValue))")
            assert actual_values == expected_values, (axis_name, actual_values)
        # 只有一个整数幂的区间应保留对数分布，包括小于 1 的刻度。
        page.evaluate("key => window.setFrontierMetricCombination(...key.split('__'))", alternate_variant)
        page.evaluate("""key => {
          const axes = window.FRONTIER_3D_VISUALIZATION_DATASET.metric_variants[key]
            .three_dimensional_scene.three_dimensional_axis_configuration;
          axes.x_axis.fixed_range = [Math.log10(0.003), Math.log10(0.08)];
          axes.y_axis.scale_type = 'log';
          axes.y_axis.fixed_range = [1.4839478374801973, 2.928270877529456];
        }""", initial_variant)
        page.evaluate("key => window.setFrontierMetricCombination(...key.split('__'))", initial_variant)
        verify_projected_axis_annotations(page, initial_variant)
        for axis_name, expected_values in (
            ('x', [0.005, 0.01, 0.02, 0.05]),
            ('y', [50, 100, 200, 500]),
        ):
            actual_values = page.locator(
                f'.aa-threejs-axis-tick-label[data-axis-name="{axis_name}"]'
            ).evaluate_all("ticks => ticks.map(tick => Number(tick.dataset.axisValue))")
            assert actual_values == expected_values, (axis_name, actual_values)
        # 覆盖接近三个数量级的成本轴和未与零点对齐的线性轴。
        page.evaluate("key => window.setFrontierMetricCombination(...key.split('__'))", alternate_variant)
        page.evaluate("""key => {
          const axes = window.FRONTIER_3D_VISUALIZATION_DATASET.metric_variants[key]
            .three_dimensional_scene.three_dimensional_axis_configuration;
          axes.x_axis.fixed_range = [-1.70160201998798, 0.9860327538324996];
          axes.z_axis.fixed_range = [2.24, 58.56];
        }""", initial_variant)
        page.evaluate("key => window.setFrontierMetricCombination(...key.split('__'))", initial_variant)
        verify_projected_axis_annotations(page, initial_variant)
        for axis_name, expected_values in (
            ('x', [0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5]),
            ('z', [10, 20, 30, 40, 50]),
        ):
            actual_values = page.locator(
                f'.aa-threejs-axis-tick-label[data-axis-name="{axis_name}"]'
            ).evaluate_all("ticks => ticks.map(tick => Number(tick.dataset.axisValue))")
            assert actual_values == expected_values, (axis_name, actual_values)
        assert not observation.page_runtime_errors, observation.page_runtime_errors
        assert not observation.external_network_request_urls, observation.external_network_request_urls
        browser.close()
    print('PASS: 全部可用指标组合、真实数值刻度、标题与单位、旋转/缩放/侧栏/resize、320px、放大及恢复、窄对数与线性范围')


if __name__ == '__main__':
    main()
