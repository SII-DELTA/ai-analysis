"""兼容旧验证命令；实现已迁至 tests/browser_playwright。"""
from pathlib import Path
import runpy
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
if __name__ == "__main__":
    runpy.run_module("tests.browser_playwright.frontier_3d_threejs_browser_contract_validation", run_name="__main__")
