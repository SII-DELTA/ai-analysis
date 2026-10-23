"""Frontier 3D Playwright 验证脚本共享的浏览器启动与运行时观测。"""
from __future__ import annotations

import os
from dataclasses import dataclass, field

from playwright.sync_api import Browser, Page, Playwright


def wait_for_frontier_layout_transitions_and_render(page: Page) -> None:
    """等侧栏 CSS transition 真正结束，再等待 ResizeObserver 后的绘制。"""
    page.wait_for_function("document.getAnimations().every(animation => !animation.pending && animation.playState !== 'running')", timeout=10000)
    page.evaluate("new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))")


@dataclass
class BrowserRuntimeObservation:
    """浏览器验证期间收集的页面错误与外部网络请求。"""

    page_runtime_errors: list[str] = field(default_factory=list)
    external_network_request_urls: list[str] = field(default_factory=list)


def launch_requested_frontier_3d_test_browser(playwright: Playwright) -> Browser:
    """按环境变量启动浏览器，并兼容没有系统 Chromium channel 的环境。"""
    requested_browser_name = os.environ.get("FRONTIER_3D_TEST_BROWSER", "chromium")
    requested_browser_type = getattr(playwright, requested_browser_name)
    if requested_browser_name == "firefox" and os.environ.get("FRONTIER_3D_FIREFOX_EXECUTABLE_PATH"):
        return requested_browser_type.launch(headless=True, executable_path=os.environ["FRONTIER_3D_FIREFOX_EXECUTABLE_PATH"])
    if requested_browser_name == "chromium":
        try:
            return requested_browser_type.launch(headless=True, channel="chromium")
        except Exception:
            return requested_browser_type.launch(headless=True)
    return requested_browser_type.launch(headless=True)


def create_frontier_3d_test_page_with_runtime_observation(
    browser: Browser,
) -> tuple[Page, BrowserRuntimeObservation]:
    """创建统一 viewport 的页面，并挂载自包含/运行时健康观测器。"""
    page = browser.new_page(viewport={"width": 1400, "height": 900})
    observation = BrowserRuntimeObservation()
    page.on(
        "pageerror",
        lambda error: observation.page_runtime_errors.append(str(error)),
    )
    page.on(
        "request",
        lambda request: observation.external_network_request_urls.append(request.url)
        if request.url.startswith(("http://", "https://"))
        else None,
    )
    return page, observation
