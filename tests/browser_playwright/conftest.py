"""每次测试会话自建合成 HTML，不读取共享 output 或真实缓存。"""
from pathlib import Path
import os

import pytest

from src.frontier_3d_self_contained_html_renderer import write_frontier_3d_self_contained_html_report
from src.frontier_3d_visualization_dataset_builder import build_frontier_3d_visualization_dataset
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe


@pytest.fixture(scope="session")
def browser_type_launch_args(browser_type_launch_args, browser_name):
    executable = os.environ.get("FRONTIER_3D_FIREFOX_EXECUTABLE_PATH")
    if browser_name == "firefox" and executable:
        return {**browser_type_launch_args, "executable_path": executable}
    return browser_type_launch_args


@pytest.fixture(scope="session")
def synthetic_frontier_dataset():
    return build_frontier_3d_visualization_dataset(
        build_frontier_3d_synthetic_fixture_models_dataframe(),
        since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale="log",
    )


@pytest.fixture(scope="session")
def synthetic_frontier_report_path(tmp_path_factory, synthetic_frontier_dataset):
    path = tmp_path_factory.mktemp("frontier-3d-synthetic-reports") / "frontier_3d.html"
    write_frontier_3d_self_contained_html_report(synthetic_frontier_dataset, path)
    return path


@pytest.fixture
def frontier_page(page, synthetic_frontier_report_path, request):
    errors, requests, console_failures = [], [], []
    page.set_viewport_size({"width": 1400, "height": 900})
    page.on("pageerror", lambda error: errors.append(str(error)))
    def observe_console(message):
        if message.type not in {"warning", "error"}:
            return
        expected_context_loss = request.node.get_closest_marker("expects_webgl_context_loss") and "WebGL context was lost." in message.text
        if expected_context_loss or "GPU stall due to ReadPixels" in message.text:
            request.node.user_properties.append(("expected_browser_console_diagnostic", message.text))
        else:
            console_failures.append(message.text)
    page.on("console", observe_console)
    page.on("request", lambda request: requests.append(request.url) if request.url.startswith(("http://", "https://")) else None)
    page.route("http://**/*", lambda route: route.abort())
    page.route("https://**/*", lambda route: route.abort())
    page.goto(synthetic_frontier_report_path.as_uri())
    page.wait_for_function("typeof frontierThreeDimensionalVisualizationState === 'function'")
    page.wait_for_function("Object.values(frontierThreeDimensionalVisualizationState().organizationLogoTextureLoadStateByCreatorName).every(value => value === 'loaded')")
    yield page
    assert not errors, errors
    assert not requests, requests
    assert not console_failures, console_failures
