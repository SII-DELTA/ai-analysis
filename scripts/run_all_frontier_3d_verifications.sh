#!/usr/bin/env bash
# 依次运行 Frontier 3D 的全部验证，逐步汇总「通过 / 失败」；任一步失败时最终以非零码退出。
#
# 用法：
#   scripts/run_all_frontier_3d_verifications.sh [--allow-html-renderer-bundle-differing-from-repository-renderer-bundle] <frontier_3d.html>
#
# 步骤（某一步失败不会中断后续步骤，全部跑完再汇总）：
#   1. pytest（tests/python_unit；读本机 data/raw 缓存的测试默认跳过，见 tests/python_unit/conftest.py）
#   2. node scripts/build_frontier_3d_threejs_interactive_renderer.mjs --check（bundle 与入口源码逐字节一致）
#   3. HTML 内联的渲染器 bundle 与仓库 bundle 一致（R2-F4：本脚本验收的是「新生成的 HTML」，旧 HTML
#      不能拿旧前端冒充当前前端通过验收；要验证归档的旧 HTML 时加上面的开关，本步改为只告警）
#   4. scripts/verify_metric_semantics.py（指标口径回归，合成数据）
#   5. scripts/verify_frontier_3d_threejs_public_contract.py <html>（合成契约 + HTML 内嵌的真实契约：校验、value_provenance、历史口径计数）
#   6. scripts/verify_frontier_3d_threejs_browser_contract.py <html>（Playwright）
#   7. scripts/verify_interactions_headless.py <html>（Playwright）
#   8. scripts/verify_frontier_3d_adversarial_contract_rendering_safety.py <html>（Playwright；用该 HTML 的前端
#      渲染合成的恶意字符串 / 非有限契约，回归 tooltip 转义与坏几何兜底）
#   9. scripts/verify_frontier_3d_axis_annotations.py <html>（Playwright；截图写到临时目录，不写进 HTML 所在目录）
#
# 所有 Python 调用都走 `uv run --frozen`，尊重调用方已设置的 UV_PROJECT_ENVIRONMENT。
# 兼容 macOS 自带的 bash 3.2（不用关联数组、mapfile 等 bash 4 特性）。
set -euo pipefail

REPOSITORY_ROOT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTIER_3D_THREEJS_BUNDLE_BUILD_SCRIPT_RELATIVE_PATH="scripts/build_frontier_3d_threejs_interactive_renderer.mjs"

print_usage() {
  cat <<'EOF'
用法：
  scripts/run_all_frontier_3d_verifications.sh [--allow-html-renderer-bundle-differing-from-repository-renderer-bundle] <frontier_3d.html>

依次运行 pytest、bundle --check、HTML 内联 bundle 与仓库 bundle 一致性、指标口径回归、公共数据契约验证
与四个 Playwright 浏览器验证，最后汇总每步通过/失败；任一步失败则以非零码退出。

  --allow-html-renderer-bundle-differing-from-repository-renderer-bundle
      验证归档的旧 HTML 时使用：HTML 内联 bundle 与仓库 bundle 不一致只告警、不判失败。

所有 Python 调用走 `uv run --frozen`；在 worktree 里请先设置 UV_PROJECT_ENVIRONMENT
指向独立的虚拟环境目录（仓库 .venv 是指向主 checkout 的符号链接时，本脚本会拒绝运行）。
EOF
}

refuse_to_run_uv_against_symlinked_repository_virtual_environment() {
  # worktree 里的 .venv 常是指向主 checkout 的符号链接；未设置 UV_PROJECT_ENVIRONMENT 时
  # uv run 会同步甚至重建它，可能破坏主 checkout 的环境，所以直接拒绝。
  if [[ -z "${UV_PROJECT_ENVIRONMENT:-}" && -L "${REPOSITORY_ROOT_DIRECTORY}/.venv" ]]; then
    echo "错误：${REPOSITORY_ROOT_DIRECTORY}/.venv 是符号链接，且未设置 UV_PROJECT_ENVIRONMENT。" >&2
    echo "      uv run 可能同步/重建该环境并波及主 checkout；请先 export UV_PROJECT_ENVIRONMENT=<独立目录>。" >&2
    exit 2
  fi
}

ALLOW_HTML_RENDERER_BUNDLE_DIFFERING_FROM_REPOSITORY_RENDERER_BUNDLE=0
if [[ "${1:-}" == "--allow-html-renderer-bundle-differing-from-repository-renderer-bundle" ]]; then
  ALLOW_HTML_RENDERER_BUNDLE_DIFFERING_FROM_REPOSITORY_RENDERER_BUNDLE=1
  shift
fi

case "${1:-}" in
  -h|--help)
    print_usage
    exit 0
    ;;
  "")
    echo "错误：缺少 <frontier_3d.html> 参数" >&2
    print_usage >&2
    exit 2
    ;;
esac
if [[ $# -ne 1 ]]; then
  echo "错误：只接受一个参数 <frontier_3d.html>，实际收到 $# 个" >&2
  print_usage >&2
  exit 2
fi

if [[ ! -f "$1" ]]; then
  echo "错误：HTML 文件不存在：$1" >&2
  exit 2
fi
FRONTIER_3D_HTML_ABSOLUTE_PATH="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"

if ! command -v uv >/dev/null 2>&1; then
  echo "错误：找不到 uv；本脚本的 Python 调用一律走 uv run --frozen" >&2
  exit 2
fi
refuse_to_run_uv_against_symlinked_repository_virtual_environment

cd "$REPOSITORY_ROOT_DIRECTORY"

VERIFICATION_STEP_NAMES=()
VERIFICATION_STEP_OUTCOMES=()
VERIFICATION_STEP_DURATIONS_SECONDS=()
FAILED_VERIFICATION_STEP_COUNT=0

run_verification_step() {
  local verification_step_name="$1"
  shift
  local step_started_at_seconds="$SECONDS"
  local verification_step_outcome
  echo
  echo "==> [${verification_step_name}] $*"
  if "$@"; then
    verification_step_outcome="通过"
  else
    verification_step_outcome="失败（退出码 $?）"
    FAILED_VERIFICATION_STEP_COUNT=$((FAILED_VERIFICATION_STEP_COUNT + 1))
  fi
  VERIFICATION_STEP_NAMES+=("$verification_step_name")
  VERIFICATION_STEP_OUTCOMES+=("$verification_step_outcome")
  VERIFICATION_STEP_DURATIONS_SECONDS+=("$((SECONDS - step_started_at_seconds))")
}

check_committed_bundle_matches_fresh_build_byte_for_byte() {
  # 构建脚本若还不认识 --check，直接运行会改写已提交的 bundle；此时判本步失败而不执行构建。
  if ! grep -q -- '--check' "$FRONTIER_3D_THREEJS_BUNDLE_BUILD_SCRIPT_RELATIVE_PATH"; then
    echo "失败：${FRONTIER_3D_THREEJS_BUNDLE_BUILD_SCRIPT_RELATIVE_PATH} 尚不支持 --check；为避免改写已提交 bundle，未执行构建。" >&2
    return 1
  fi
  if ! command -v node >/dev/null 2>&1; then
    echo "失败：找不到 node，无法做 bundle --check" >&2
    return 1
  fi
  node "$FRONTIER_3D_THREEJS_BUNDLE_BUILD_SCRIPT_RELATIVE_PATH" --check
}

check_html_inline_renderer_bundle_matches_repository_renderer_bundle() {
  # 浏览器验证测的是 HTML 里内联的前端；它必须就是（已通过 --check 的）仓库 bundle，否则两边脱节。
  uv run --frozen python - "$FRONTIER_3D_HTML_ABSOLUTE_PATH" \
    "src/frontier_3d_interactive_report_assets/frontier_3d_threejs_interactive_renderer_bundle.js" \
    "$ALLOW_HTML_RENDERER_BUNDLE_DIFFERING_FROM_REPOSITORY_RENDERER_BUNDLE" \
    <<'PYTHON_HTML_INLINE_RENDERER_BUNDLE_MATCHES_REPOSITORY_RENDERER_BUNDLE'
import hashlib
import re
import sys

html_path, repository_renderer_bundle_path, differing_bundle_is_allowed = sys.argv[1], sys.argv[2], sys.argv[3] == "1"
html_text = open(html_path, encoding="utf-8").read()
recorded_bundle_sha256_match = re.search(r'<meta name="frontier-3d-renderer-bundle-sha256" content="([0-9a-f]+)">', html_text)
inline_renderer_bundle_match = re.search(r"<script>\n(?P<bundle>.*)\n  </script>\n</body>", html_text, re.DOTALL)
if not recorded_bundle_sha256_match or not inline_renderer_bundle_match:
    print("失败：HTML 缺少 renderer bundle 指纹 meta 或内联渲染器脚本")
    raise SystemExit(1)
inline_bundle_sha256 = hashlib.sha256(inline_renderer_bundle_match.group("bundle").encode("utf-8")).hexdigest()
repository_bundle_sha256 = hashlib.sha256(open(repository_renderer_bundle_path, "rb").read()).hexdigest()
print(f"HTML 内联 bundle sha256：{inline_bundle_sha256}（meta 记录 {recorded_bundle_sha256_match.group(1)}）")
print(f"仓库 bundle sha256：    {repository_bundle_sha256}")
if inline_bundle_sha256 != recorded_bundle_sha256_match.group(1):
    print("失败：内联 bundle 与 meta 记录的 sha256 不一致（HTML 在渲染后被改动过）")
    raise SystemExit(1)
if inline_bundle_sha256 != repository_bundle_sha256:
    if differing_bundle_is_allowed:
        print("告警：HTML 由另一版前端渲染（已按开关放行）；后续浏览器验证测的是 HTML 里那一版前端")
        raise SystemExit(0)
    print("失败：HTML 由另一版前端渲染，浏览器验证结果不代表仓库当前前端；请重新渲染该 HTML，")
    print("      或在验证归档的旧 HTML 时加 --allow-html-renderer-bundle-differing-from-repository-renderer-bundle")
    raise SystemExit(1)
print("通过：HTML 内联 bundle 就是仓库当前 bundle")
PYTHON_HTML_INLINE_RENDERER_BUNDLE_MATCHES_REPOSITORY_RENDERER_BUNDLE
}

run_verification_step "pytest" \
  uv run --frozen --extra test pytest
run_verification_step "bundle --check" \
  check_committed_bundle_matches_fresh_build_byte_for_byte
run_verification_step "HTML 内联 bundle = 仓库 bundle" \
  check_html_inline_renderer_bundle_matches_repository_renderer_bundle
run_verification_step "verify_metric_semantics.py" \
  uv run --frozen python scripts/verify_metric_semantics.py
run_verification_step "verify_frontier_3d_threejs_public_contract.py" \
  uv run --frozen python scripts/verify_frontier_3d_threejs_public_contract.py "$FRONTIER_3D_HTML_ABSOLUTE_PATH"
run_verification_step "verify_frontier_3d_threejs_browser_contract.py" \
  uv run --frozen --extra browser-verification python scripts/verify_frontier_3d_threejs_browser_contract.py "$FRONTIER_3D_HTML_ABSOLUTE_PATH"
run_verification_step "verify_interactions_headless.py" \
  uv run --frozen --extra browser-verification python scripts/verify_interactions_headless.py "$FRONTIER_3D_HTML_ABSOLUTE_PATH"
run_verification_step "verify_frontier_3d_adversarial_contract_rendering_safety.py" \
  uv run --frozen --extra browser-verification python scripts/verify_frontier_3d_adversarial_contract_rendering_safety.py "$FRONTIER_3D_HTML_ABSOLUTE_PATH"
# 轴标注截图写到临时目录（R3-F11）：一键脚本缺省验证 output/frontier_3d.html，不应往共享 output/ 留截图
FRONTIER_3D_AXIS_ANNOTATION_SCREENSHOT_DIRECTORY="$(mktemp -d "${TMPDIR:-/tmp}/frontier-3d-axis-annotation-screenshots.XXXXXX")"
export FRONTIER_3D_AXIS_ANNOTATION_SCREENSHOT_DIRECTORY
echo
echo "轴标注截图目录：${FRONTIER_3D_AXIS_ANNOTATION_SCREENSHOT_DIRECTORY}"
run_verification_step "verify_frontier_3d_axis_annotations.py" \
  uv run --frozen --extra browser-verification python scripts/verify_frontier_3d_axis_annotations.py "$FRONTIER_3D_HTML_ABSOLUTE_PATH"

echo
echo "==================== Frontier 3D 验证汇总 ===================="
echo "HTML：${FRONTIER_3D_HTML_ABSOLUTE_PATH}"
for verification_step_index in "${!VERIFICATION_STEP_NAMES[@]}"; do
  printf '  %-52s %-18s %ss\n' \
    "${VERIFICATION_STEP_NAMES[$verification_step_index]}" \
    "${VERIFICATION_STEP_OUTCOMES[$verification_step_index]}" \
    "${VERIFICATION_STEP_DURATIONS_SECONDS[$verification_step_index]}"
done
TOTAL_VERIFICATION_STEP_COUNT="${#VERIFICATION_STEP_NAMES[@]}"
echo "合计：${TOTAL_VERIFICATION_STEP_COUNT} 步，通过 $((TOTAL_VERIFICATION_STEP_COUNT - FAILED_VERIFICATION_STEP_COUNT))，失败 ${FAILED_VERIFICATION_STEP_COUNT}"

if [[ "$FAILED_VERIFICATION_STEP_COUNT" -gt 0 ]]; then
  echo "结论：验证未全部通过" >&2
  exit 1
fi
echo "结论：全部验证通过"
