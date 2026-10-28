"""离线对比冻结报告的加载、相机帧耗时和轴尺寸读取次数。"""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import platform
import statistics
import sys
import time

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from playwright.sync_api import sync_playwright
from src.frontier_3d_worktree_storage_paths import refuse_shared_worktree_directory_write


def measure_report(browser, path):
    observations = []
    for _ in range(3):
        context = browser.new_context(viewport={"width": 1400, "height": 900})
        page = context.new_page()
        errors, external_requests = [], []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.on("request", lambda request: external_requests.append(request.url) if request.url.startswith(("http://", "https://")) else None)
        page.route("http://**/*", lambda route: route.abort())
        page.route("https://**/*", lambda route: route.abort())
        started = time.perf_counter()
        page.goto(path.resolve().as_uri())
        page.wait_for_function("typeof frontierThreeDimensionalVisualizationState === 'function' && Object.values(frontierThreeDimensionalVisualizationState().organizationLogoTextureLoadStateByCreatorName).every(value => value === 'loaded')")
        page.evaluate("document.fonts.ready")
        page.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
        load_milliseconds = (time.perf_counter() - started) * 1000
        camera_measurements = page.evaluate("""async () => {
          let dimensionReads = 0;
          const descriptors = Object.fromEntries(['offsetWidth', 'offsetHeight'].map(name => [name, Object.getOwnPropertyDescriptor(HTMLElement.prototype, name)]));
          for (const [name, descriptor] of Object.entries(descriptors)) {
            Object.defineProperty(HTMLElement.prototype, name, {...descriptor, get() {
              if (this.classList.contains('aa-threejs-axis-label') || this.classList.contains('aa-threejs-axis-tick-label')) dimensionReads += 1;
              return descriptor.get.call(this);
            }});
          }
          const frameMilliseconds = [];
          try {
            const diagnostics = frontierThreeDimensionalRendererDiagnostics;
            for (let index = 0; index < 12; index += 1) {
              const started = performance.now();
              diagnostics.camera.position.x += 0.001;
              diagnostics.camera.lookAt(diagnostics.controls.target);
              diagnostics.requestRender();
              await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
              frameMilliseconds.push(performance.now() - started);
            }
          } finally {
            for (const [name, descriptor] of Object.entries(descriptors)) Object.defineProperty(HTMLElement.prototype, name, descriptor);
          }
          return {axis_dimension_dom_reads_during_camera_motion: dimensionReads, two_animation_frame_durations_milliseconds: frameMilliseconds};
        }""")
        state = page.evaluate("frontierThreeDimensionalVisualizationState()")
        assert not errors and not external_requests, {"errors": errors, "external_requests": external_requests}
        observations.append({"load_until_logo_ready_milliseconds": load_milliseconds, "displayed_model_count": state["displayedModelMarkerCount"], **camera_measurements})
        context.close()
    return {"runs": observations, "median_load_until_logo_ready_milliseconds": statistics.median(row["load_until_logo_ready_milliseconds"] for row in observations),
            "median_two_animation_frame_duration_milliseconds": statistics.median(value for row in observations for value in row["two_animation_frame_durations_milliseconds"])}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--baseline-html", type=Path, required=True)
    parser.add_argument("--current-html", type=Path, required=True)
    parser.add_argument("--output-json", type=Path, required=True)
    arguments = parser.parse_args()
    refuse_shared_worktree_directory_write(arguments.output_json)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        result = {"browser_version": browser.version, "platform": platform.platform(),
                  "timing_limit": "同机各三次；两帧耗时包含浏览器帧调度，只记录观测，不作为跨设备 FPS 保证",
                  "baseline": measure_report(browser, arguments.baseline_html), "v3": measure_report(browser, arguments.current_html)}
        browser.close()
    arguments.output_json.parent.mkdir(parents=True, exist_ok=True)
    arguments.output_json.write_text(json.dumps(result, ensure_ascii=False, allow_nan=False, indent=2) + "\n")
    assert all(row["axis_dimension_dom_reads_during_camera_motion"] == 0 for row in result["v3"]["runs"]), "相机运动仍在重复测量轴标注"
    assert result["v3"]["runs"][0]["displayed_model_count"] == result["baseline"]["runs"][0]["displayed_model_count"]
    print("已保存冻结输入的浏览器性能观测：" + str(arguments.output_json))


if __name__ == "__main__":
    main()
