"""一键脚本 scripts/refresh_regenerate_verify_and_open_frontier_3d_report.sh 的安全回归（R3-F1 / R3-F2 / R3-F10）。

在 tmp 里搭一个假仓库：脚本副本 + 合成的 `.env`（内容是哨兵字符串，不是真实 key）；PATH 前置一个
桩 `uv`，把 `python -m src.cli` 换成「写一份占位 HTML」，其余 `python ...` 调用转给系统 python3。
不联网、不读真实 .env、不写共享目录。
"""
from __future__ import annotations

import os
import shutil
import socket
import subprocess
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

import pytest

REPOSITORY_ROOT_DIRECTORY_PATH = Path(__file__).resolve().parents[2]
ONE_CLICK_SCRIPT_RELATIVE_PATH = Path("scripts/refresh_regenerate_verify_and_open_frontier_3d_report.sh")
SYNTHETIC_API_KEY_SENTINEL_VALUE = "SYNTHETIC_API_KEY_SENTINEL_FOR_ONE_CLICK_SCRIPT_TEST_0123456789"
SYNTHETIC_DOTENV_SENTINEL_TEXT = "ARTIFICIAL_ANALYSIS_API_KEY=SYNTHETIC_DOTENV_SENTINEL_FOR_ONE_CLICK_SCRIPT_TEST"

STUB_UV_SCRIPT_TEXT = f"""#!/bin/bash
# 桩 uv：丢掉 run/--frozen/--extra X，直到 python；src.cli 只写占位 HTML，其余转给系统 python3
arguments=("$@")
while [[ ${{#arguments[@]}} -gt 0 && "${{arguments[0]}}" != "python" ]]; do
  arguments=("${{arguments[@]:1}}")
done
arguments=("${{arguments[@]:1}}")
if [[ "${{arguments[0]:-}}" == "-m" && "${{arguments[1]:-}}" == "src.cli" ]]; then
  output_html_path=""
  for (( argument_index = 0; argument_index < ${{#arguments[@]}}; argument_index++ )); do
    if [[ "${{arguments[$argument_index]}}" == "--out" ]]; then
      output_html_path="${{arguments[$((argument_index + 1))]}}"
    fi
  done
  mkdir -p "$(dirname "$output_html_path")"
  printf '<!doctype html><title>placeholder</title>\\n' > "$output_html_path"
  exit 0
fi
exec {sys.executable} "${{arguments[@]}}"
"""


def _fake_repository_with_one_click_script(tmp_path: Path) -> tuple[Path, dict[str, str]]:
    fake_repository_path = tmp_path / "fake-repository"
    (fake_repository_path / "scripts").mkdir(parents=True)
    shutil.copy(
        REPOSITORY_ROOT_DIRECTORY_PATH / ONE_CLICK_SCRIPT_RELATIVE_PATH,
        fake_repository_path / ONE_CLICK_SCRIPT_RELATIVE_PATH,
    )
    (fake_repository_path / "src").mkdir()
    shutil.copy(
        REPOSITORY_ROOT_DIRECTORY_PATH / "src/frontier_3d_worktree_storage_paths.py",
        fake_repository_path / "src/frontier_3d_worktree_storage_paths.py",
    )
    (fake_repository_path / ".env").write_text(SYNTHETIC_DOTENV_SENTINEL_TEXT + "\n", encoding="utf-8")
    (fake_repository_path / "existing_frontier_3d_visualization_dataset.json").write_text(
        '{"data_date": "2026-09-23"}', encoding="utf-8"
    )
    stub_binary_directory_path = tmp_path / "stub-binaries"
    stub_binary_directory_path.mkdir()
    stub_uv_path = stub_binary_directory_path / "uv"
    stub_uv_path.write_text(STUB_UV_SCRIPT_TEXT, encoding="utf-8")
    stub_uv_path.chmod(0o755)
    subprocess_environment = {
        "PATH": f"{stub_binary_directory_path}:/usr/bin:/bin",
        "HOME": str(tmp_path),
        "UV_PROJECT_ENVIRONMENT": str(tmp_path / "nonexistent-uv-project-environment"),
        "HTTP_PROXY": "http://127.0.0.1:9",
        "HTTPS_PROXY": "http://127.0.0.1:9",
    }
    return fake_repository_path, subprocess_environment


@pytest.mark.skipif(shutil.which("bash") is None, reason="需要 bash")
def test_refresh_path_under_bash_xtrace_never_prints_api_key_value(tmp_path: Path) -> None:
    """R3-F1：`bash -x` 调试时，「是否已配置 key」的判断不能把 key 展开进 xtrace 输出。"""
    fake_repository_path, subprocess_environment = _fake_repository_with_one_click_script(tmp_path)
    completed_process = subprocess.run(
        [
            "bash",
            "-x",
            str(fake_repository_path / ONE_CLICK_SCRIPT_RELATIVE_PATH),
            "--refresh",
            "--skip-verify",
            "--no-open",
            "--out",
            str(tmp_path / "out" / "frontier_3d.html"),
        ],
        env={**subprocess_environment, "ARTIFICIAL_ANALYSIS_API_KEY": SYNTHETIC_API_KEY_SENTINEL_VALUE},
        cwd=fake_repository_path,
        capture_output=True,
        text=True,
        timeout=120,
    )
    assert completed_process.returncode == 0, completed_process.stderr[-2000:]
    assert SYNTHETIC_API_KEY_SENTINEL_VALUE not in completed_process.stdout
    assert SYNTHETIC_API_KEY_SENTINEL_VALUE not in completed_process.stderr


@pytest.mark.skipif(shutil.which("bash") is None, reason="需要 bash")
@pytest.mark.parametrize(
    ("dotenv_line_text", "expected_to_count_as_configured"),
    [
        ('ARTIFICIAL_ANALYSIS_API_KEY=""', False),
        ("ARTIFICIAL_ANALYSIS_API_KEY=''", False),
        ("ARTIFICIAL_ANALYSIS_API_KEY=", False),
        ('ARTIFICIAL_ANALYSIS_API_KEY="synthetic-non-empty"', True),
        ("export ARTIFICIAL_ANALYSIS_API_KEY=synthetic-non-empty", True),
    ],
)
def test_dotenv_precheck_treats_empty_quoted_key_as_not_configured(
    tmp_path: Path,
    dotenv_line_text: str,
    expected_to_count_as_configured: bool,
) -> None:
    """R3-F10：`.env` 里是空引号时预检应提示缺 key，而不是放行后再由 CLI 报错。"""
    fake_repository_path, subprocess_environment = _fake_repository_with_one_click_script(tmp_path)
    (fake_repository_path / ".env").write_text(dotenv_line_text + "\n", encoding="utf-8")
    completed_process = subprocess.run(
        [
            "bash",
            str(fake_repository_path / ONE_CLICK_SCRIPT_RELATIVE_PATH),
            "--refresh",
            "--skip-verify",
            "--no-open",
            "--out",
            str(tmp_path / "out" / "frontier_3d.html"),
        ],
        env=subprocess_environment,
        cwd=fake_repository_path,
        capture_output=True,
        text=True,
        timeout=120,
    )
    assert (completed_process.returncode == 0) is expected_to_count_as_configured, completed_process.stderr
    if not expected_to_count_as_configured:
        assert "需要 ARTIFICIAL_ANALYSIS_API_KEY" in completed_process.stderr


def _free_local_tcp_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as probe_socket:
        probe_socket.bind(("127.0.0.1", 0))
        return probe_socket.getsockname()[1]


def _http_get_status_and_body(url: str) -> tuple[int, str]:
    no_proxy_opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    try:
        with no_proxy_opener.open(url, timeout=5) as http_response:
            return http_response.status, http_response.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as http_error:
        return http_error.code, ""


@pytest.mark.skipif(shutil.which("bash") is None, reason="需要 bash")
def test_local_hosting_serves_only_the_report_not_the_directory_holding_it(tmp_path: Path) -> None:
    """R3-F2：`--out ./frontier_3d.html` 放在仓库根时，--host 不得把 .env / .git 一起托管出去。"""
    fake_repository_path, subprocess_environment = _fake_repository_with_one_click_script(tmp_path)
    local_report_http_server_port = _free_local_tcp_port()
    one_click_script_process = subprocess.Popen(
        [
            "bash",
            str(fake_repository_path / ONE_CLICK_SCRIPT_RELATIVE_PATH),
            "--from-existing-dataset",
            "existing_frontier_3d_visualization_dataset.json",
            "--out",
            "./frontier_3d.html",
            "--skip-verify",
            "--no-open",
            "--host",
            str(local_report_http_server_port),
        ],
        env=subprocess_environment,
        cwd=fake_repository_path,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        start_new_session=True,
    )
    try:
        report_url = f"http://127.0.0.1:{local_report_http_server_port}/frontier_3d.html"
        deadline_monotonic_seconds = time.monotonic() + 60
        report_status_code = None
        while time.monotonic() < deadline_monotonic_seconds:
            try:
                report_status_code, _ = _http_get_status_and_body(report_url)
                break
            except (urllib.error.URLError, ConnectionError, OSError):
                if one_click_script_process.poll() is not None:
                    break
                time.sleep(0.3)
        assert report_status_code == 200, one_click_script_process.stdout.read() if one_click_script_process.poll() is not None else "托管未就绪"
        dotenv_status_code, dotenv_body_text = _http_get_status_and_body(
            f"http://127.0.0.1:{local_report_http_server_port}/.env"
        )
        assert dotenv_status_code == 404
        assert "SYNTHETIC_DOTENV_SENTINEL" not in dotenv_body_text
        dataset_status_code, _ = _http_get_status_and_body(
            f"http://127.0.0.1:{local_report_http_server_port}/existing_frontier_3d_visualization_dataset.json"
        )
        assert dataset_status_code == 404
    finally:
        os.killpg(one_click_script_process.pid, 15)
        one_click_script_process.wait(timeout=30)
