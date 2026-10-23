"""兼容旧的浏览器验证支持模块路径。"""
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
from tests.browser_playwright.frontier_3d_playwright_verification_support import (
    BrowserRuntimeObservation, launch_requested_frontier_3d_test_browser, create_frontier_3d_test_page_with_runtime_observation,
)
