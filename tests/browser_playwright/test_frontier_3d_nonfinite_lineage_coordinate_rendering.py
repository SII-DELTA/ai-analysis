"""非有限坐标按缺值处理后，四个口径均保留实际点位差异和三轴刻度。"""
import json
import math

import pytest

from src.frontier_3d_self_contained_html_renderer import write_frontier_3d_self_contained_html_report
from src.frontier_3d_visualization_dataset_builder import build_frontier_3d_visualization_dataset
from tests.fixtures.build_frontier_3d_synthetic_fixture_models_dataframe import build_frontier_3d_synthetic_fixture_models_dataframe


@pytest.mark.parametrize("speed_scale", ["log", "linear"])
@pytest.mark.parametrize("model_name", ["Gemini 2 Pro", "Gemini 3 Pro"])
@pytest.mark.parametrize("metric_column_name", ["output_speed", "intelligence"])
def test_nonfinite_coordinates_preserve_finite_distinct_positions_and_axis_ticks(
    page, tmp_path, speed_scale, model_name, metric_column_name,
):
    models = build_frontier_3d_synthetic_fixture_models_dataframe()
    models.loc[models["name"].eq(model_name), metric_column_name] = math.inf
    dataset = build_frontier_3d_visualization_dataset(
        models, since_months=18, max_layers=3, hard_age_cutoff_months=36, speed_scale=speed_scale,
    )
    report_path = tmp_path / "nonfinite-coordinate-frontier-3d.html"
    write_frontier_3d_self_contained_html_report(dataset, report_path)
    page_errors, external_requests = [], []
    page.on("pageerror", lambda error: page_errors.append(str(error)))
    page.on("request", lambda request: external_requests.append(request.url)
            if request.url.startswith(("http://", "https://")) else None)
    page.route("http://**/*", lambda route: route.abort())
    page.route("https://**/*", lambda route: route.abort())
    page.set_viewport_size({"width": 1400, "height": 900})
    page.goto(report_path.as_uri())
    page.wait_for_function("typeof frontierThreeDimensionalVisualizationState === 'function'")
    observations = {}
    for cost_metric in ("effective", "blended"):
        for speed_metric in ("effective", "raw"):
            variant_key = f"{cost_metric}__{speed_metric}"
            page.evaluate("([cost,speed]) => setFrontierMetricCombination(cost,speed)", [cost_metric, speed_metric])
            page.wait_for_function(
                "key => frontierThreeDimensionalVisualizationState().activeMetricVariantKey === key",
                arg=variant_key,
            )
            page.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")
            scene = dataset["metric_variants"][variant_key]["three_dimensional_scene"]
            positions = page.evaluate(
                "frontierThreeDimensionalRendererDiagnostics.displayedModelMarkerPositionsAndVisibility()"
            )
            assert len(positions) == len(scene["displayed_model_markers"])
            axes = {}
            for coordinate_index, coordinate_key in enumerate(("x", "y", "z")):
                fixed_range = scene["three_dimensional_axis_configuration"][f"{coordinate_key}_axis"]["fixed_range"]
                assert all(math.isfinite(endpoint) for endpoint in fixed_range)
                assert fixed_range[0] < fixed_range[1]
                coordinates = {marker["position"][coordinate_index] for marker in positions}
                assert all(math.isfinite(coordinate) for coordinate in coordinates)
                assert len(coordinates) > 1
                tick_count = page.locator(
                    f'.aa-threejs-axis-tick-label[data-axis-name="{coordinate_key}"]'
                ).count()
                assert tick_count > 0
                axes[coordinate_key] = {
                    "fixed_range": fixed_range, "distinct_position_count": len(coordinates),
                    "axis_tick_count": tick_count,
                }
            observations[variant_key] = {"axes": axes, "marker_count": len(positions)}
    assert not page_errors, page_errors
    assert not external_requests, external_requests
    page.screenshot(path=str(tmp_path / "nonfinite-coordinate-frontier-3d.png"))
    (tmp_path / "browser-observations.json").write_text(json.dumps({
        "injected_model_name": model_name, "injected_column_name": metric_column_name,
        "speed_scale": speed_scale, "metric_variants": observations,
        "page_errors": page_errors, "external_requests": external_requests,
    }, ensure_ascii=False, indent=2, allow_nan=False), encoding="utf-8")
