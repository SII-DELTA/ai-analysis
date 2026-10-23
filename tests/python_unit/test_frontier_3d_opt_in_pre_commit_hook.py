"""在独立测试仓库验证 hook 路由和不覆盖安装；不安装当前任务的 hook。"""
from pathlib import Path
import os
import shutil
import subprocess

import pytest


def make_hook_fixture_repository(tmp_path, monkeypatch):
    # 合成仓库不继承宿主或验证器注入的 Git 配置；monkeypatch 在每项测试后恢复环境。
    for environment_variable_name in tuple(os.environ):
        if environment_variable_name in {"GIT_CONFIG", "GIT_CONFIG_COUNT", "GIT_CONFIG_PARAMETERS"} or environment_variable_name.startswith(("GIT_CONFIG_KEY_", "GIT_CONFIG_VALUE_")):
            monkeypatch.delenv(environment_variable_name)
    monkeypatch.setenv("GIT_CONFIG_NOSYSTEM", "1")
    monkeypatch.setenv("GIT_CONFIG_SYSTEM", os.devnull)
    monkeypatch.setenv("GIT_CONFIG_GLOBAL", os.devnull)
    source = Path(__file__).resolve().parents[2]
    root = tmp_path / "hook-fixture-repository"
    root.mkdir()
    subprocess.run(["git", "-c", "core.hooksPath=/dev/null", "init", "-q", str(root)], check=True)
    (root / ".githooks").mkdir()
    shutil.copy(source / ".githooks/frontier-3d-pre-commit", root / ".githooks/frontier-3d-pre-commit")
    (root / "scripts").mkdir()
    (root / "scripts/verify_frontier_3d_staged_commit_candidate.sh").write_text('#!/bin/bash\ntouch "$(git rev-parse --show-toplevel)/hook-executed"\n')
    return source, root


@pytest.mark.skipif(shutil.which("git") is None or shutil.which("bash") is None, reason="需要 git 和 bash")
def test_hook_routes_only_relevant_staged_paths(tmp_path, monkeypatch):
    _, root = make_hook_fixture_repository(tmp_path, monkeypatch)
    (root / "notes.md").write_text("普通文档")
    subprocess.run(["git", "-C", str(root), "add", "notes.md"], check=True)
    subprocess.run(["bash", str(root / ".githooks/frontier-3d-pre-commit")], cwd=root, check=True)
    assert not (root / "hook-executed").exists()
    (root / "src").mkdir()
    (root / "src/feature.py").write_text("# 合成源码\n")
    subprocess.run(["git", "-C", str(root), "add", "src/feature.py"], check=True)
    subprocess.run(["bash", str(root / ".githooks/frontier-3d-pre-commit")], cwd=root, check=True)
    assert (root / "hook-executed").is_file()


@pytest.mark.skipif(shutil.which("git") is None or shutil.which("bash") is None, reason="需要 git 和 bash")
def test_installer_never_overwrites_existing_hook_or_hooks_path(tmp_path, monkeypatch):
    source, root = make_hook_fixture_repository(tmp_path, monkeypatch)
    install = ["bash", str(source / "scripts/install_frontier_3d_pre_commit_hook.sh")]
    subprocess.run(install, cwd=root, check=True, capture_output=True)
    hook = root / ".git/hooks/pre-commit"
    original_target = hook.readlink()
    assert hook.resolve() == root / ".githooks/frontier-3d-pre-commit"
    existing_hook_install_result = subprocess.run(install, cwd=root, capture_output=True, text=True)
    assert existing_hook_install_result.returncode == 2
    assert "已存在 pre-commit" in existing_hook_install_result.stderr
    assert hook.readlink() == original_target
    hook.unlink()
    subprocess.run(["git", "-C", str(root), "config", "core.hooksPath", "custom-hooks"], check=True)
    existing_hooks_path_install_result = subprocess.run(install, cwd=root, capture_output=True, text=True)
    assert existing_hooks_path_install_result.returncode == 2
    assert "已配置 core.hooksPath" in existing_hooks_path_install_result.stderr
    assert not hook.exists() and not hook.is_symlink()
    assert not (root / "custom-hooks").exists()
    assert subprocess.run(["git", "-C", str(root), "config", "--get", "core.hooksPath"], check=True, capture_output=True, text=True).stdout.strip() == "custom-hooks"


@pytest.mark.skipif(shutil.which("git") is None, reason="需要 git")
def test_hook_fixture_ignores_inherited_git_configuration_without_modifying_its_source(tmp_path, monkeypatch):
    inherited_git_configuration_path = tmp_path / "synthetic-inherited-git-configuration"
    inherited_git_configuration_text = "[core]\n\thooksPath = inherited-hooks\n\texcludesFile = inherited-excludes\n"
    inherited_git_configuration_path.write_text(inherited_git_configuration_text)
    for configuration_source_variable_name in ["GIT_CONFIG", "GIT_CONFIG_SYSTEM", "GIT_CONFIG_GLOBAL"]:
        monkeypatch.setenv(configuration_source_variable_name, str(inherited_git_configuration_path))
    monkeypatch.setenv("GIT_CONFIG_PARAMETERS", "'core.hooksPath'='parameter-inherited-hooks'")
    monkeypatch.setenv("GIT_CONFIG_COUNT", "2")
    for configuration_index, configuration_key in enumerate(["core.hooksPath", "core.excludesFile"]):
        monkeypatch.setenv(f"GIT_CONFIG_KEY_{configuration_index}", configuration_key)
        monkeypatch.setenv(f"GIT_CONFIG_VALUE_{configuration_index}", os.devnull)

    _, root = make_hook_fixture_repository(tmp_path, monkeypatch)

    for configuration_key in ["core.hooksPath", "core.excludesFile"]:
        inherited_configuration_lookup_result = subprocess.run(
            ["git", "-C", str(root), "config", "--get", configuration_key], capture_output=True, text=True,
        )
        assert inherited_configuration_lookup_result.returncode == 1
        assert inherited_configuration_lookup_result.stdout == ""
    assert inherited_git_configuration_path.read_text() == inherited_git_configuration_text
