"""为 macOS 27 的测试 Firefox 配置独立应用数据身份，不接触日常浏览器目录。

先把 Firefox 安装到本任务 .frontier-3d-worktree-artifacts 下，再传入其 executable 路径。
对应上游问题：https://github.com/microsoft/playwright/issues/42768
"""
import argparse
from pathlib import Path
import shlex


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--firefox-executable-path", type=Path, required=True)
    args = parser.parse_args()
    root = Path(__file__).resolve().parent.parent
    artifacts = root / ".frontier-3d-worktree-artifacts"
    executable = args.firefox_executable_path.resolve()
    if not executable.is_relative_to(artifacts.resolve()):
        parser.error("只允许配置本任务隔离目录内的测试 Firefox，不修改共享缓存或用户浏览器")
    resources = executable.parents[2] / "Contents/Resources"
    configuration = resources / "browser/frontier-3d-isolated-browser-verification-application.ini"
    text = (resources / "application.ini").read_text()
    configuration.write_text(text.replace("Vendor=Mozilla", "Vendor=FrontierThreeDimensionalVerification").replace("Name=Firefox", "Name=FrontierThreeDimensionalFirefoxVerification"))
    launcher = artifacts / "browser-launch-wrappers/firefox-verification"
    launcher.parent.mkdir(parents=True, exist_ok=True)
    launcher.write_text(f'#!/bin/sh\nexec {shlex.quote(str(executable))} -app {shlex.quote(str(configuration))} "$@"\n')
    launcher.chmod(0o755)
    print(launcher)


if __name__ == "__main__":
    main()
