#!/usr/bin/env bash
# 钩子验证暂存快照，避免工作区里未暂存的修复掩盖即将提交的错误。
set -euo pipefail
REPOSITORY_ROOT_DIRECTORY="$(git rev-parse --show-toplevel)"
STAGED_VERIFICATION_PARENT_DIRECTORY="${REPOSITORY_ROOT_DIRECTORY}/.frontier-3d-worktree-artifacts/staged-candidate-verifications"
mkdir -p "$STAGED_VERIFICATION_PARENT_DIRECTORY"
STAGED_VERIFICATION_DIRECTORY="$(mktemp -d "${STAGED_VERIFICATION_PARENT_DIRECTORY}/candidate.XXXXXX")"
trap 'rm -rf "$STAGED_VERIFICATION_DIRECTORY"' EXIT
git checkout-index --all --prefix="${STAGED_VERIFICATION_DIRECTORY}/"
if [[ -d "${REPOSITORY_ROOT_DIRECTORY}/node_modules" ]]; then
  ln -s "${REPOSITORY_ROOT_DIRECTORY}/node_modules" "${STAGED_VERIFICATION_DIRECTORY}/node_modules"
fi
export UV_PROJECT_ENVIRONMENT="${UV_PROJECT_ENVIRONMENT:-${REPOSITORY_ROOT_DIRECTORY}/.frontier-3d-worktree-artifacts/python-environment}"
cd "$STAGED_VERIFICATION_DIRECTORY"
uv run --frozen --all-extras pytest -q tests/python_unit
node --test tests/javascript_unit/*.test.js
node scripts/build_frontier_3d_threejs_interactive_renderer.mjs --check
