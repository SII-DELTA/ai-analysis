"""Frontier 3D three.js 浏览器公共行为验证。"""
from __future__ import annotations

import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

from frontier_3d_playwright_verification_support import (
    create_frontier_3d_test_page_with_runtime_observation,
    launch_requested_frontier_3d_test_browser,
)

REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
HTML_PATH = (
    Path(sys.argv[1])
    if len(sys.argv) > 1
    else REPOSITORY_ROOT / "output" / "frontier_3d.html"
).resolve()


def main() -> None:
    assert HTML_PATH.exists(), f"找不到 HTML: {HTML_PATH}"
    with sync_playwright() as playwright:
        browser = launch_requested_frontier_3d_test_browser(playwright)
        page, browser_runtime_observation = (
            create_frontier_3d_test_page_with_runtime_observation(browser)
        )
        page.goto(HTML_PATH.as_uri())
        page.wait_for_function(
            "() => window.frontierThreeDimensionalVisualizationState && "
            "window.frontierThreeDimensionalVisualizationState().interactiveRenderer === 'threejs'",
            timeout=30000,
        )

        initial_state = page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
        )
        page.wait_for_function(
            "() => { const state = "
            "window.frontierThreeDimensionalVisualizationState(); "
            "return state.loadedOrganizationLogoCanvasTextureCount === "
            "state.organizationCount; }"
        )
        initial_state = page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
        )
        assert initial_state["interactiveRenderer"] == "threejs"
        assert initial_state["displayedModelMarkerCount"] > 0
        assert initial_state["organizationLogoMarkerCount"] == initial_state[
            "displayedModelMarkerCount"
        ]
        assert initial_state["countryRegionMarkerVisible"] is False
        assert initial_state["countryRegionMarkerCount"] == 0
        assert initial_state["depthTestedOrganizationLogoMarkerCount"] == (
            initial_state["displayedModelMarkerCount"]
        )
        assert initial_state["depthWritingOrganizationLogoBackplateCount"] == (
            initial_state["displayedModelMarkerCount"]
        )
        assert initial_state["paretoFrontierSurfaceWritesDepth"] is True
        assert initial_state["achievableFrontierSurfaceWritesDepth"] is True
        assert initial_state["failedOrganizationLogoCanvasTextureCount"] == 0

        brand_asset_decode_failures = page.evaluate(
            """async () => {
              const identities = Object.values(
                window.FRONTIER_3D_VISUALIZATION_DATASET
                  .organization_identity_metadata_by_creator_name,
              );
              const results = await Promise.all(
                identities.map((identity) => new Promise((resolve) => {
                  const brandImage = new Image();
                  brandImage.onload = () => resolve(null);
                  brandImage.onerror = () => resolve(identity.organization_display_name);
                  brandImage.src = identity.logo_visualization_data_url;
                })),
              );
              return results.filter(Boolean);
            }"""
        )
        assert brand_asset_decode_failures == [], brand_asset_decode_failures

        assert page.locator("canvas[data-frontier-threejs-canvas]").count() == 1
        assert page.locator("#aa-country-region-marker-toggle").count() == 1
        assert page.locator("#aa-organization-filter-panel").count() == 1
        organization_filter_row_count = page.locator(
            "#aa-organization-filter-panel .aa-organization-filter-row"
        ).count()
        assert organization_filter_row_count > 0
        assert page.locator(
            "#aa-organization-filter-panel .aa-organization-logo-preview"
        ).count() == organization_filter_row_count

        selected_marker = page.evaluate(
            """() => {
              const diagnostics =
                window.frontierThreeDimensionalRendererDiagnostics;
              const models =
                window.FRONTIER_3D_INTERACTION_RELATIONSHIPS.models;
              const projectedModels = models.map((model) => ({
                ...model,
                projectedPosition:
                  diagnostics.projectedCanvasPositionForModelName(model.name),
              }));
              const cardinalDirections = [
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: -1, y: 0 },
                { x: 0, y: -1 },
              ];
              let bestCandidate = null;
              for (const projectedModel of projectedModels) {
                const frontmostInteraction =
                  diagnostics.frontmostPointerInteractionAtProjectedModelPosition(
                    projectedModel.name,
                  );
                if (
                  !frontmostInteraction ||
                  frontmostInteraction.frontmostModelName !== projectedModel.name
                ) continue;
                const markerRadii =
                  diagnostics.projectedCanvasMarkerRadiiForModelName(
                    projectedModel.name,
                  );
                for (const direction of cardinalDirections) {
                  const countryRegionTestRadius =
                    markerRadii.whiteBackplateRadius +
                    (markerRadii.countryRegionRadius -
                      markerRadii.whiteBackplateRadius) * 0.25;
                  const testPoint = {
                    clientX:
                      projectedModel.projectedPosition.clientX +
                      direction.x * countryRegionTestRadius,
                    clientY:
                      projectedModel.projectedPosition.clientY +
                      direction.y * countryRegionTestRadius,
                  };
                  const nearestOtherModelDistance = Math.min(
                    ...projectedModels
                      .filter(
                        (otherModel) =>
                          otherModel.name !== projectedModel.name,
                      )
                      .map((otherModel) => Math.hypot(
                        otherModel.projectedPosition.clientX -
                          testPoint.clientX,
                        otherModel.projectedPosition.clientY -
                          testPoint.clientY,
                      )),
                  );
                  if (
                    !bestCandidate ||
                    nearestOtherModelDistance >
                      bestCandidate.nearestOtherModelDistance
                  ) {
                    bestCandidate = {
                      baseModelName:
                        frontmostInteraction.frontmostBaseModelName,
                      lineageKey: frontmostInteraction.frontmostLineageKey,
                      projectedPosition: projectedModel.projectedPosition,
                      markerRadii,
                      direction,
                      nearestOtherModelDistance,
                    };
                  }
                }
              }
              return bestCandidate;
            }"""
        )
        assert selected_marker is not None
        marker_center = selected_marker["projectedPosition"]
        base_model_name = selected_marker["baseModelName"]

        page.mouse.move(marker_center["clientX"], marker_center["clientY"])
        page.mouse.down()
        page.mouse.move(marker_center["clientX"] + 12, marker_center["clientY"])
        page.mouse.move(marker_center["clientX"], marker_center["clientY"])
        page.mouse.up()
        page.wait_for_timeout(50)
        assert base_model_name not in page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".pinnedBaseModelNames"
        )

        canvas_box = page.locator(
            "canvas[data-frontier-threejs-canvas]"
        ).bounding_box()
        assert canvas_box is not None
        empty_canvas_position = {
            "clientX": canvas_box["x"] + 2,
            "clientY": canvas_box["y"] + 2,
        }

        def dispatch_pointer_moves_in_one_browser_task(
            pointer_positions: list[dict],
        ) -> None:
            page.evaluate(
                """pointerPositions => {
                  const canvas = document.querySelector(
                    'canvas[data-frontier-threejs-canvas]',
                  );
                  for (const pointerPosition of pointerPositions) {
                    canvas.dispatchEvent(new PointerEvent('pointermove', {
                      bubbles: true,
                      clientX: pointerPosition.clientX,
                      clientY: pointerPosition.clientY,
                      pointerId: 73,
                      pointerType: 'mouse',
                    }));
                  }
                }""",
                pointer_positions,
            )
            page.evaluate("() => new Promise(requestAnimationFrame)")
            page.evaluate("() => new Promise(requestAnimationFrame)")

        dispatch_pointer_moves_in_one_browser_task(
            [marker_center, empty_canvas_position]
        )
        assert page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".hoveredLineageKey"
        ) is None
        dispatch_pointer_moves_in_one_browser_task(
            [empty_canvas_position, marker_center]
        )
        assert page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".hoveredLineageKey"
        ) == selected_marker["lineageKey"]

        marker_direction = selected_marker["direction"]
        marker_radii = selected_marker["markerRadii"]
        white_backplate_test_radius = (
            marker_radii["logoRadius"] + marker_radii["whiteBackplateRadius"]
        ) / 2
        page.mouse.click(
            marker_center["clientX"]
            + marker_direction["x"] * white_backplate_test_radius,
            marker_center["clientY"]
            + marker_direction["y"] * white_backplate_test_radius,
        )
        assert base_model_name in page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".pinnedBaseModelNames"
        )
        page.evaluate(
            "baseModelName => window.unpinFrontierBaseModel(baseModelName)",
            base_model_name,
        )

        page.evaluate("() => window.setCountryRegionMarkerVisibility(true)")
        country_region_test_radius = marker_radii["whiteBackplateRadius"] + (
            marker_radii["countryRegionRadius"]
            - marker_radii["whiteBackplateRadius"]
        ) * 0.25
        page.mouse.click(
            marker_center["clientX"]
            + marker_direction["x"] * country_region_test_radius,
            marker_center["clientY"]
            + marker_direction["y"] * country_region_test_radius,
        )
        assert base_model_name in page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".pinnedBaseModelNames"
        )
        page.evaluate(
            "baseModelName => window.unpinFrontierBaseModel(baseModelName)",
            base_model_name,
        )
        page.evaluate("() => window.setCountryRegionMarkerVisibility(false)")

        page.locator("#aa-country-region-marker-toggle").check()
        page.wait_for_function(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".countryRegionMarkerVisible === true"
        )
        country_enabled_state = page.evaluate(
            "() => window.frontierThreeDimensionalVisualizationState()"
        )
        assert country_enabled_state["countryRegionMarkerCount"] == (
            country_enabled_state["displayedModelMarkerCount"]
        )
        assert page.locator("#aa-country-region-legend").is_visible()

        first_filter_checkbox = page.locator(
            "#aa-organization-filter-panel "
            ".aa-organization-filter-row input[type=checkbox]"
        ).first
        first_filter_checkbox.uncheck()
        page.wait_for_function(
            "() => window.frontierThreeDimensionalVisualizationState()"
            ".visibleOrganizationCount < "
            "window.frontierThreeDimensionalVisualizationState().organizationCount"
        )

        assert browser_runtime_observation.external_network_request_urls == [], (
            browser_runtime_observation.external_network_request_urls
        )
        assert browser_runtime_observation.page_runtime_errors == [], (
            browser_runtime_observation.page_runtime_errors
        )
        assert page.evaluate("() => typeof window.Plotly") == "undefined"
        browser.close()

    print("✅ Frontier 3D three.js 浏览器公共行为验证通过")


if __name__ == "__main__":
    main()
