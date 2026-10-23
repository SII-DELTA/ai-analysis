#!/usr/bin/env bash
# 仅在用户显式运行本安装器时写 Git hook，不覆盖已有配置或 hook。
set -euo pipefail
REPOSITORY_ROOT_DIRECTORY="$(git rev-parse --show-toplevel)"
if [[ -n "$(git config --get core.hooksPath || true)" ]]; then
  echo "已配置 core.hooksPath；请在现有 pre-commit 中显式调用 .githooks/frontier-3d-pre-commit，不覆盖现有设置。" >&2
  exit 2
fi
GIT_HOOKS_DIRECTORY="$(git rev-parse --git-path hooks)"
mkdir -p "$GIT_HOOKS_DIRECTORY"
if [[ -e "${GIT_HOOKS_DIRECTORY}/pre-commit" || -L "${GIT_HOOKS_DIRECTORY}/pre-commit" ]]; then
  echo "已存在 pre-commit；请合并调用，不覆盖现有 hook。" >&2
  exit 2
fi
ln -s "${REPOSITORY_ROOT_DIRECTORY}/.githooks/frontier-3d-pre-commit" "${GIT_HOOKS_DIRECTORY}/pre-commit"
echo "已启用 Frontier 3D 暂存候选验证；此 Git hooks 目录由同仓库 worktree 共享。"
