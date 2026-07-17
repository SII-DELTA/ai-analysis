"""Frontier 3D three.js 浏览器公共行为验证。"""
from __future__ import annotations

import os
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

REPOSITORY_ROOT = Path(__file__).resolve().parent.parent
HTML_PATH = (
    Path(sys.argv[1])
    if len(sys.argv) > 1
    else REPOSITORY_ROOT / "output" / "frontier_3d.html"
).resolve()


def main() -> None:
    assert HTML_PATH.exists(), f"找不到 HTML: {HTML_PATH}"
    with sync_playwright() as playwright:
        requested_browser_name = os.environ.get(
            "FRONTIER_3D_TEST_BROWSER", "chromium"
        )
        requested_browser_type = getattr(playwright, requested_browser_name)
        if requested_browser_name == "chromium":
            try:
                browser = requested_browser_type.launch(
                    headless=True, channel="chromium"
                )
            except Exception:
                browser = requested_browser_type.launch(headless=True)
        else:
            browser = requested_browser_type.launch(headless=True)
        page = browser.new_page(viewport={"width": 1400, "height": 900})
        runtime_errors: list[str] = []
        external_network_requests: list[str] = []
        page.on("pageerror", lambda error: runtime_errors.append(str(error)))
        page.on(
            "request",
            lambda request: external_network_requests.append(request.url)
            if request.url.startswith(("http://", "https://"))
            else None,
        )
        page.goto(HTML_PATH.as_uri())
        page.wait_for_function(
            "() => window.aaState && window.aaState().interactiveRenderer === 'threejs'",
            timeout=30000,
        )

        initial_state = page.evaluate("() => window.aaState()")
        assert initial_state["interactiveRenderer"] == "threejs"
        assert initial_state["displayedModelMarkerCount"] > 0
        assert initial_state["organizationLogoMarkerCount"] == initial_state[
            "displayedModelMarkerCount"
        ]
        assert initial_state["countryRegionMarkerVisible"] is False
        assert initial_state["countryRegionMarkerCount"] == 0

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

        page.locator("#aa-country-region-marker-toggle").check()
        page.wait_for_function(
            "() => window.aaState().countryRegionMarkerVisible === true"
        )
        country_enabled_state = page.evaluate("() => window.aaState()")
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
            "() => window.aaState().visibleOrganizationCount < "
            "window.aaState().organizationCount"
        )

        assert external_network_requests == [], external_network_requests
        assert runtime_errors == [], runtime_errors
        assert page.evaluate("() => typeof window.Plotly") == "undefined"
        browser.close()

    print("✅ Frontier 3D three.js 浏览器公共行为验证通过")


if __name__ == "__main__":
    main()
