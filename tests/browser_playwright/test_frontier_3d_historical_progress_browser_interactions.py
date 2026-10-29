"""历史双视角的离线浏览器交互和跨时间状态保持。"""
import pytest
from playwright.sync_api import expect

from src.frontier_3d_historical_progress import build_historical_progress_dataset
from src.frontier_3d_historical_progress_report import render_historical_progress_html_report
from tests.python_unit.test_frontier_3d_historical_progress import model_row, source_snapshot


@pytest.fixture(scope="module")
def historical_report_path(tmp_path_factory):
    earlier = [model_row(1, intelligence=30), model_row(2, date="2025-02-01", intelligence=45, cost=15, estimated=True)]
    later = [*earlier, model_row(3, release="new-model", date="2025-03-01", intelligence=60, cost=8)]
    v5 = model_row(3, release="new-model", date="2025-03-01", intelligence=55, cost=9)
    v5.update(cost_to_run_value_intelligence_index_version="5.0", output_token_count_value_intelligence_index_version="5.0")
    dataset = build_historical_progress_dataset([
        source_snapshot("earlier", earlier), source_snapshot("later", later, observed="2026-02-01T00:00:00Z"),
        source_snapshot("v5", [v5], observed="2026-10-28T00:00:00Z", version="5.0"),
    ])
    path = tmp_path_factory.mktemp("historical-progress-report") / "historical-progress.html"
    path.write_text(render_historical_progress_html_report(dataset))
    return path


@pytest.fixture
def historical_page(page, historical_report_path):
    failures, external_requests = [], []
    page.set_viewport_size({"width": 1440, "height": 1000})
    page.on("pageerror", lambda error: failures.append(str(error)))
    page.on("request", lambda request: external_requests.append(request.url) if request.url.startswith(("https://", "http://")) else None)
    page.route("http://**/*", lambda route: route.abort())
    page.route("https://**/*", lambda route: route.abort())
    page.goto(historical_report_path.as_uri())
    page.wait_for_function("typeof historicalFrontierVisualizationState === 'function'")
    yield page
    assert not failures, failures
    assert not external_requests, external_requests


def test_release_steps_fixed_axes_camera_and_pinned_absence(historical_page):
    page = historical_page
    state = page.evaluate("historicalFrontierVisualizationState()")
    assert state["source_snapshot_id"] == "later"
    assert len(state["current_series_frame_ids"]) == 2
    page.evaluate("pinFrontierBaseModel('研究模型 3')")
    camera = page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition")
    axes = page.evaluate("frontierThreeDimensionalVisualizationState().fixedAxisConfiguration")
    page.locator("#aa-historical-previous-step").click()
    wait_for_historical_frame_render(page)
    assert page.evaluate("frontierThreeDimensionalVisualizationState().cameraPosition") == pytest.approx(camera)
    assert page.evaluate("frontierThreeDimensionalVisualizationState().fixedAxisConfiguration") == axes
    assert len(page.evaluate("frontierThreeDimensionalVisualizationState().pinnedModelUuids")) == 1
    expect(page.locator(".aa-pinned-variant-card")).not_to_contain_text("60")
    expect(page.locator(".aa-pinned-variant-card")).to_contain_text("尚未达到该模型统一发布步")
    assert page.evaluate("FRONTIER_3D_VISUALIZATION_DATASET.metric_variants.effective__effective.three_dimensional_scene.displayed_model_markers.length") == 2
    page.locator("#aa-historical-next-step").click()
    wait_for_historical_frame_render(page)
    expect(page.locator(".aa-pinned-variant-card")).to_contain_text("60")
    assert page.locator("canvas").count() == 1


def test_real_observations_and_version_boundary(historical_page):
    page = historical_page
    page.select_option("#aa-historical-view-mode", "observation_replay")
    wait_for_historical_frame_render(page)
    page.select_option("#aa-historical-index-version", "all_versions")
    wait_for_historical_frame_render(page)
    expect(page.locator("#aa-historical-membership-changes")).to_contain_text("指数版本变化")
    page.select_option("#aa-speed-metric-select", "raw")
    expect(page.locator("#aa-historical-membership-changes")).to_contain_text("重置比较起点")
    assert page.evaluate("historicalFrontierVisualizationState().observed_at_utc") == "2026-10-28T00:00:00Z"
    page.locator("#aa-historical-previous-step").click()
    wait_for_historical_frame_render(page)
    assert page.evaluate("historicalFrontierVisualizationState().observed_at_utc") == "2026-02-01T00:00:00Z"


def test_exploration_table_and_csv_follow_committed_historical_frame(historical_page):
    page = historical_page
    page.locator("#aa-table-view-tab").click()
    page.locator("#aa-all-model-table-search").fill("研究模型")
    rows = page.locator("#aa-all-model-table tbody tr")
    expect(rows).to_have_count(3)
    page.locator("#aa-model-exploration-controls").evaluate("element => element.open = true")
    page.locator("#aa-play-release-date-filter").click()
    expect(page.locator("#aa-play-release-date-filter")).to_have_attribute("aria-pressed", "true")
    page.locator("#aa-historical-previous-step").click()
    wait_for_historical_frame_render(page)
    expect(page.locator("#aa-play-release-date-filter")).to_have_attribute("aria-pressed", "false")
    expect(rows).to_have_count(2)
    expect(page.locator("#aa-all-model-table")).not_to_contain_text("研究模型 3")
    with page.expect_download() as downloaded:
        page.locator("#aa-export-all-model-table-csv").click()
    assert "研究模型 3" not in downloaded.value.path().read_text(encoding="utf-8-sig")

    page.select_option("#aa-historical-view-mode", "observation_replay")
    wait_for_historical_frame_render(page)
    page.select_option("#aa-historical-index-version", "5.0")
    wait_for_historical_frame_render(page)
    page.select_option("#aa-speed-metric-select", "raw")
    expect(rows).to_have_count(1)
    expect(rows).to_contain_text("研究模型 3")
    expect(page.locator("#aa-all-model-table-search")).to_have_value("研究模型")
    assert page.evaluate("serializeFrontierViewState().table.active_tab") == "table"
    with page.expect_download() as downloaded:
        page.locator("#aa-export-all-model-table-csv").click()
    assert downloaded.value.suggested_filename == "frontier-models-2026-10-28.csv"
    exported_csv = downloaded.value.path().read_text(encoding="utf-8-sig")
    assert "研究模型 3" in exported_csv
    assert "研究模型 1" not in exported_csv


def test_measured_policy_and_v5_unavailable_effective_speed(historical_page):
    page = historical_page
    page.select_option("#aa-historical-analysis-sample", "measured_only")
    wait_for_historical_frame_render(page)
    assert page.evaluate("historicalFrontierVisualizationState().metric_variant_summaries.blended__raw.analysis_eligible_model_count") == 2
    page.select_option("#aa-historical-index-version", "5.0")
    wait_for_historical_frame_render(page)
    expect(page.locator("#aa-report-header-intelligence-index-version")).to_contain_text("v5.0")
    expect(page.locator("#aa-report-header-artificial-analysis-api-fetch-date")).to_contain_text("2026-10-28")
    expect(page.locator("#aa-historical-coverage-summary")).to_contain_text("归一常数")
    # Chromium 的 option 可访问性已禁用，Playwright 1.63 的 is_disabled 对选中 option 返回 enabled。
    expect(page.locator('#aa-speed-metric-select option[value="effective"]')).to_have_attribute("disabled", "")
    assert page.locator('#aa-speed-metric-select option[value="effective"]').evaluate("option => option.disabled")
    page.select_option("#aa-speed-metric-select", "raw")
    expect(page.locator("#aa-historical-coverage-summary")).to_contain_text("1 个可比模型")
    assert page.evaluate("setHistoricalFrontierTimelineSelection({historical_frame_id:'does-not-exist'})") is False


@pytest.mark.parametrize("width", [320, 390, 1440])
def test_history_controls_keyboard_and_small_screen(historical_page, width):
    page = historical_page
    page.set_viewport_size({"width": width, "height": 1000})
    page.locator("#aa-historical-progress-controls").evaluate("element => element.open = true")
    expect(page.locator("#aa-historical-current-date")).to_be_visible()
    assert page.locator("#aa-side-panel-body #aa-historical-progress-panel").count() == 1
    page.locator("#aa-historical-step-range").focus()
    page.keyboard.press("Home")
    wait_for_historical_frame_render(page)
    expect(page.locator("#aa-historical-current-date")).to_contain_text("2025-01-01")
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
    page.screenshot(path=str(historical_report_path_for_screenshot(page, width)))


def wait_for_historical_frame_render(page):
    page.wait_for_function("() => { const state=historicalFrontierVisualizationState(); return !state.is_frame_loading && !state.scene_transition.is_active && state.historical_frame_id===state.rendered_historical_frame_id; }")


def test_rapid_selection_commits_only_latest_frame(historical_page):
    page = historical_page
    result = page.evaluate("async () => { const ids=historicalFrontierVisualizationState().current_series_frame_ids; return await Promise.all([setHistoricalFrontierTimelineSelection({historical_frame_id:ids[0]}),setHistoricalFrontierTimelineSelection({historical_frame_id:ids[1]})]); }")
    assert result == [False, True]
    wait_for_historical_frame_render(page)
    assert page.evaluate("historicalFrontierVisualizationState().release_cutoff_date") == "2025-03-01"


def test_decoder_failure_preserves_last_scene_and_recovers(historical_page):
    page = historical_page
    before = page.evaluate("historicalFrontierVisualizationState().rendered_historical_frame_id")
    page.evaluate("() => { window.originalHistoricalDecompressionStream=window.DecompressionStream; window.DecompressionStream=class { constructor(){throw new Error('注入解压失败')} }; }")
    result = page.evaluate("async () => await setHistoricalFrontierTimelineSelection({historical_frame_id:historicalFrontierVisualizationState().current_series_frame_ids[0]})")
    assert result is False
    assert page.evaluate("historicalFrontierVisualizationState().rendered_historical_frame_id") == before
    expect(page.locator("#aa-historical-frame-loading-status")).to_contain_text("保留上一有效场景")
    page.evaluate("() => { window.DecompressionStream=window.originalHistoricalDecompressionStream; }")
    assert page.evaluate("async () => await setHistoricalFrontierTimelineSelection({historical_frame_id:historicalFrontierVisualizationState().current_series_frame_ids[0]})") is True
    wait_for_historical_frame_render(page)


@pytest.mark.parametrize("all_versions", [False, True])
def test_decoder_failure_restores_committed_version_and_timeline(historical_page, all_versions):
    page = historical_page
    if all_versions:
        page.select_option("#aa-historical-view-mode", "observation_replay")
        wait_for_historical_frame_render(page)
        page.select_option("#aa-historical-index-version", "all_versions")
        wait_for_historical_frame_render(page)
    before = page.evaluate("historicalFrontierVisualizationState()")
    selected_version_before = page.locator("#aa-historical-index-version").input_value()
    page.evaluate("() => { window.originalHistoricalDecompressionStream=window.DecompressionStream; window.DecompressionStream=class { constructor(){throw new Error('注入跨版本解压失败')} }; }")
    if all_versions:
        assert page.evaluate("async () => await setHistoricalFrontierTimelineSelection({historical_frame_id:historicalFrontierVisualizationState().current_series_frame_ids[0]})") is False
    else:
        page.select_option("#aa-historical-index-version", "5.0")
    expect(page.locator("#aa-historical-frame-loading-status")).to_contain_text("保留上一有效场景")
    after = page.evaluate("historicalFrontierVisualizationState()")
    assert after["historical_frame_id"] == before["historical_frame_id"]
    assert after["current_series_frame_ids"] == before["current_series_frame_ids"]
    assert after["historical_frame_id"] in after["current_series_frame_ids"]
    expect(page.locator("#aa-historical-index-version")).to_have_value(selected_version_before)
    page.evaluate("() => { window.DecompressionStream=window.originalHistoricalDecompressionStream; }")
    page.locator("#aa-historical-previous-step").click()
    wait_for_historical_frame_render(page)
    assert page.evaluate("historicalFrontierVisualizationState().historical_frame_id") != before["historical_frame_id"]
    expect(page.locator("#aa-historical-index-version")).to_have_value(selected_version_before)


def test_membership_exit_with_missing_tokens_is_explained_as_coverage_loss(page, tmp_path):
    before = model_row(1)
    after = {**before, "intelligence_index_canonical_output_token_count": None}
    dataset = build_historical_progress_dataset([
        source_snapshot("before", [before]),
        source_snapshot("after", [after], observed="2026-02-01T00:00:00Z"),
    ])
    report_path = tmp_path / "historical-missing-token-report.html"
    report_path.write_text(render_historical_progress_html_report(dataset))
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.goto(report_path.as_uri())
    page.wait_for_function("typeof historicalFrontierVisualizationState === 'function'")
    assert page.evaluate("async () => await setHistoricalFrontierTimelineSelection({historical_view_mode:'observation_replay'})") is True
    wait_for_historical_frame_render(page)
    expect(page.locator("#aa-historical-membership-changes")).to_contain_text("退出：研究模型 1 · 缺少")
    expect(page.locator("#aa-historical-membership-changes")).not_to_contain_text("该集合中已非前沿")
    assert page.evaluate("historicalFrontierVisualizationState().metric_variant_summaries.effective__effective.analysis_eligible_model_count") == 0
    assert not errors


def historical_report_path_for_screenshot(page, width):
    from pathlib import Path
    from urllib.parse import unquote, urlparse
    return Path(unquote(urlparse(page.url).path)).parent / f"historical-progress-{width}px.png"


@pytest.fixture(scope="module")
def historical_publication_url(historical_report_path, tmp_path_factory):
    from functools import partial
    from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
    from threading import Thread
    from src.frontier_3d_historical_report_publication_bundle import write_historical_progress_publication_bundle
    directory = tmp_path_factory.mktemp("historical-publication-bundle")
    write_historical_progress_publication_bundle(historical_report_path, directory)
    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(SimpleHTTPRequestHandler, directory=str(directory)))
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{server.server_port}/historical-frontier-progress.html"
    finally:
        server.shutdown()
        server.server_close()
        thread.join()


def test_publication_resource_failure_keeps_scene_and_retry_restores_timeline(page, historical_publication_url):
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.route("**/*.gzpart", lambda route: route.fulfill(status=503, body="注入资源暂时不可用"))
    page.goto(historical_publication_url)
    expect(page.locator("#aa-historical-resource-loading-status")).to_contain_text("保留初始场景")
    assert page.locator("canvas").count() == 1
    assert page.evaluate("frontierThreeDimensionalVisualizationState().displayedModelMarkerCount") == 3
    page.unroute("**/*.gzpart")
    page.get_by_role("button", name="重新载入历史时间轴").click()
    page.wait_for_function("typeof historicalFrontierVisualizationState === 'function'")
    wait_for_historical_frame_render(page)
    page.locator("#aa-historical-previous-step").click()
    wait_for_historical_frame_render(page)
    assert page.evaluate("historicalFrontierVisualizationState().release_cutoff_date") == "2025-01-01"
    assert not errors
