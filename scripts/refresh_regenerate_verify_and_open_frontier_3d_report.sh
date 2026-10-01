#!/usr/bin/env bash
# 一键入口：（可选刷新 Artificial Analysis API →）重新生成 Frontier 3D 报告 → 全量验证 → 打开。
#
# 两条路径：
#   离线路径（默认）：由已有数据契约 JSON 重渲染 HTML → 验证 → 打开；不联网、不需要 API key。
#   刷新路径（--refresh）：python -m src.cli --refresh → CLI 打印新鲜度摘要 → 验证 → 打开。
#                         D-12 暂停网页抓取期间，--refresh 只拉 API，不抓 artificialanalysis.ai 网页。
#
# 以 a0e79 任务的 scripts/refresh_frontier_3d.sh 为底改写：
#   - 去掉单独的 fetch_api(refresh=True) 预拉取：CLI 的 --refresh 本身就会拉 API，原脚本等于拉两遍；
#   - 去掉 curl 抓 /models 列表页：D-12 期间不发任何网页请求（curl 回退思路移交「最小化抓取」独立任务评估）；
#   - 不再依赖 .venv/bin/python，所有 Python 调用一律 `uv run --frozen`（尊重调用方的 UV_PROJECT_ENVIRONMENT）；
#   - API key 只在刷新路径检查「是否已配置」，绝不打印或回显 key、也不输出 .env 的任何内容。
#
# 兼容 macOS 自带的 bash 3.2。
set -euo pipefail

REPOSITORY_ROOT_DIRECTORY="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPTS_DIRECTORY="${REPOSITORY_ROOT_DIRECTORY}/scripts"
DEFAULT_OUTPUT_HTML_PATH="${REPOSITORY_ROOT_DIRECTORY}/output/frontier_3d.html"
# EXPERIMENT_NODE: 离线路径缺省是「重渲染已有契约」；是否改为「由 data/raw 缓存重算契约」（改完指标代码后更有用，但依赖本机缓存齐全）待实验
DEFAULT_EXISTING_FRONTIER_3D_VISUALIZATION_DATASET_PATH="${REPOSITORY_ROOT_DIRECTORY}/output/frontier_3d_visualization_dataset.json"
# 本地托管只绑定回环地址，不对局域网暴露
LOCAL_REPORT_HTTP_SERVER_BIND_ADDRESS="127.0.0.1"
# 本地 HTTP 服务就绪等待上限（秒）；uv 冷启动较慢的机器可能需要调大
LOCAL_REPORT_HTTP_SERVER_READINESS_TIMEOUT_SECONDS=30

print_usage() {
  cat <<'EOF'
用法：
  scripts/refresh_regenerate_verify_and_open_frontier_3d_report.sh [选项]

路径（二选一，缺省为离线路径并读取 output/frontier_3d_visualization_dataset.json）：
  --from-existing-dataset PATH  离线路径：由已有数据契约 JSON 重渲染 HTML；不联网、不需要 API key
  --refresh                     刷新路径：python -m src.cli --refresh（D-12 暂停网页抓取期间只拉 API），
                                需要环境变量或仓库 .env 中已配置 ARTIFICIAL_ANALYSIS_API_KEY

其他选项：
  --out PATH                    输出 HTML 路径（缺省 output/frontier_3d.html；契约写在同目录）
  --skip-verify                 跳过 scripts/run_all_frontier_3d_verifications.sh（产物将标注「未验证」）
  --host PORT                   用 http://127.0.0.1:PORT/ 本地托管报告（只绑定 127.0.0.1），Ctrl-C 结束
  --no-open                     不自动打开浏览器
  -h, --help                    显示本帮助

任一子步骤失败时以非零码退出。所有 Python 调用走 `uv run --frozen`；在 worktree 里请先设置
UV_PROJECT_ENVIRONMENT 指向独立的虚拟环境目录（仓库 .venv 是符号链接时，本脚本会拒绝运行）。
EOF
}

fail_with_usage_error() {
  echo "错误：$1" >&2
  echo "（用 --help 查看用法）" >&2
  exit 2
}

absolute_path_relative_to_caller_working_directory() {
  case "$1" in
    /*) printf '%s\n' "$1" ;;
    *) printf '%s\n' "${PWD}/$1" ;;
  esac
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

artificial_analysis_api_key_is_configured() {
  # 只判断「是否已配置」：环境变量非空，或仓库 .env 里存在 ARTIFICIAL_ANALYSIS_API_KEY=<非空> 这一行。
  # grep -q 不输出匹配内容，stderr 也丢弃；绝不打印、回显 key 或 .env 的任何内容。
  # R3-F1：不能写 [[ -n "$KEY" ]]——用户 bash -x 调试时 xtrace 会把展开后的 key 明文打到 stderr。
  # ${KEY+set} 只展开成 "set" 或空串，${#KEY} 只展开成长度，xtrace 里看不到 key 本身（兼容 bash 3.2 与 set -u）。
  if [[ -n "${ARTIFICIAL_ANALYSIS_API_KEY+set}" ]] && [[ "${#ARTIFICIAL_ANALYSIS_API_KEY}" -gt 0 ]]; then
    return 0
  fi
  local repository_dotenv_file_path="${REPOSITORY_ROOT_DIRECTORY}/.env"
  # R3-F10：`KEY=""` / `KEY=''` 这类空引号不算已配置（可选引号之后必须还有一个非空白、非引号字符）
  [[ -f "$repository_dotenv_file_path" ]] \
    && grep -qE "^[[:space:]]*(export[[:space:]]+)?ARTIFICIAL_ANALYSIS_API_KEY=[\"']?[^[:space:]\"']" \
      "$repository_dotenv_file_path" 2>/dev/null
}

print_unverified_report_warning_banner() {
  cat <<'EOF'

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!  未验证：已按 --skip-verify 跳过全部验证步骤                   !!
!!  本次报告未经 pytest / bundle --check / 契约 / Playwright 验证  !!
!!  请勿当作已验收产物分享；需要时运行：                           !!
!!  scripts/run_all_frontier_3d_verifications.sh <html>             !!
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

EOF
}

print_existing_dataset_freshness_summary() {
  # 离线路径的数据新鲜度：只读契约 JSON 中的日期字段（旧契约缺字段时显示「未知」）
  uv run --frozen python - "$1" <<'PYTHON_EXISTING_DATASET_FRESHNESS_SUMMARY'
import json
import sys

with open(sys.argv[1], encoding="utf-8") as existing_dataset_file:
    existing_dataset = json.load(existing_dataset_file)
data_provenance = existing_dataset.get("artificial_analysis_data_provenance")
print(f"    契约数据日期 data_date：{existing_dataset.get('data_date') or '未知'}")
print(f"    契约生成时间 generated_at：{existing_dataset.get('generated_at') or '未知'}")
if not data_provenance:
    print("    契约没有 artificial_analysis_data_provenance（W1-8 之前生成的旧契约）：API 抓取时间与指数版本未知")
    raise SystemExit(0)
print(
    "    API 抓取时间："
    f"{data_provenance.get('artificial_analysis_api_response_fetched_at_utc') or '未知'}"
    f"（来源：{data_provenance.get('artificial_analysis_api_response_fetched_at_utc_source') or '未知'}）"
)
print(
    "    当期智能指数版本："
    f"{data_provenance.get('current_intelligence_index_version') or '未知'}"
)
PYTHON_EXISTING_DATASET_FRESHNESS_SUMMARY
}

open_path_or_url_in_default_browser() {
  if command -v open >/dev/null 2>&1; then
    open "$1"
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$1" >/dev/null 2>&1
  else
    echo "提示：找不到 open / xdg-open，请手动打开：$1"
  fi
}

local_tcp_port_accepts_connections() {
  (exec 3<>"/dev/tcp/${LOCAL_REPORT_HTTP_SERVER_BIND_ADDRESS}/$1") >/dev/null 2>&1
}

# ----------------------------------------------------------------------------- 参数解析
REFRESH_ARTIFICIAL_ANALYSIS_API_REQUESTED=0
EXISTING_FRONTIER_3D_VISUALIZATION_DATASET_PATH=""
SKIP_VERIFICATION_REQUESTED=0
LOCAL_REPORT_HTTP_SERVER_PORT=""
OUTPUT_HTML_PATH="$DEFAULT_OUTPUT_HTML_PATH"
OPEN_REPORT_IN_BROWSER_REQUESTED=1

while [[ $# -gt 0 ]]; do
  case "$1" in
    --refresh)
      REFRESH_ARTIFICIAL_ANALYSIS_API_REQUESTED=1
      shift
      ;;
    --from-existing-dataset)
      [[ $# -ge 2 && -n "$2" ]] || fail_with_usage_error "--from-existing-dataset 需要一个 PATH"
      EXISTING_FRONTIER_3D_VISUALIZATION_DATASET_PATH="$(absolute_path_relative_to_caller_working_directory "$2")"
      shift 2
      ;;
    --skip-verify)
      SKIP_VERIFICATION_REQUESTED=1
      shift
      ;;
    --host)
      [[ $# -ge 2 && -n "$2" ]] || fail_with_usage_error "--host 需要一个 PORT"
      LOCAL_REPORT_HTTP_SERVER_PORT="$2"
      shift 2
      ;;
    --out)
      [[ $# -ge 2 && -n "$2" ]] || fail_with_usage_error "--out 需要一个 PATH"
      OUTPUT_HTML_PATH="$(absolute_path_relative_to_caller_working_directory "$2")"
      shift 2
      ;;
    --no-open)
      OPEN_REPORT_IN_BROWSER_REQUESTED=0
      shift
      ;;
    -h|--help)
      print_usage
      exit 0
      ;;
    *)
      fail_with_usage_error "未知参数：$1"
      ;;
  esac
done

if [[ "$REFRESH_ARTIFICIAL_ANALYSIS_API_REQUESTED" -eq 1 && -n "$EXISTING_FRONTIER_3D_VISUALIZATION_DATASET_PATH" ]]; then
  fail_with_usage_error "--refresh 与 --from-existing-dataset 互斥：前者重新取数，后者只重渲染已有契约"
fi
if [[ -n "$LOCAL_REPORT_HTTP_SERVER_PORT" ]]; then
  # 10# 强制十进制，避免 0080 这类前导零被当成八进制
  if [[ ! "$LOCAL_REPORT_HTTP_SERVER_PORT" =~ ^[0-9]{1,5}$ ]] \
    || (( 10#$LOCAL_REPORT_HTTP_SERVER_PORT < 1 || 10#$LOCAL_REPORT_HTTP_SERVER_PORT > 65535 )); then
    fail_with_usage_error "--host 的 PORT 必须是 1–65535 的整数，实际为：${LOCAL_REPORT_HTTP_SERVER_PORT}"
  fi
  LOCAL_REPORT_HTTP_SERVER_PORT="$((10#$LOCAL_REPORT_HTTP_SERVER_PORT))"
fi
if [[ "$REFRESH_ARTIFICIAL_ANALYSIS_API_REQUESTED" -eq 0 && -z "$EXISTING_FRONTIER_3D_VISUALIZATION_DATASET_PATH" ]]; then
  EXISTING_FRONTIER_3D_VISUALIZATION_DATASET_PATH="$DEFAULT_EXISTING_FRONTIER_3D_VISUALIZATION_DATASET_PATH"
fi

if ! command -v uv >/dev/null 2>&1; then
  echo "错误：找不到 uv；本脚本的 Python 调用一律走 uv run --frozen" >&2
  exit 2
fi
refuse_to_run_uv_against_symlinked_repository_virtual_environment

cd "$REPOSITORY_ROOT_DIRECTORY"
mkdir -p "$(dirname "$OUTPUT_HTML_PATH")"

# ----------------------------------------------------------------------------- 1. 生成
if [[ "$REFRESH_ARTIFICIAL_ANALYSIS_API_REQUESTED" -eq 1 ]]; then
  if ! artificial_analysis_api_key_is_configured; then
    echo "错误：刷新路径需要 ARTIFICIAL_ANALYSIS_API_KEY（环境变量，或仓库根 .env 中的一行）。" >&2
    echo "      不需要联网时请改用离线路径：--from-existing-dataset PATH" >&2
    exit 1
  fi
  echo "==> [1/3 生成·刷新路径] python -m src.cli --refresh"
  echo "    D-12 暂停网页抓取期间只拉 Artificial Analysis API，不抓网页；新鲜度摘要见 CLI 输出末尾"
  uv run --frozen python -m src.cli --refresh --out "$OUTPUT_HTML_PATH"
else
  if [[ ! -f "$EXISTING_FRONTIER_3D_VISUALIZATION_DATASET_PATH" ]]; then
    echo "错误：数据契约不存在：${EXISTING_FRONTIER_3D_VISUALIZATION_DATASET_PATH}" >&2
    echo "      先用 --refresh 生成，或用 --from-existing-dataset 指定已有契约" >&2
    exit 1
  fi
  echo "==> [1/3 生成·离线路径] 由已有数据契约重渲染（不联网、不需要 API key）"
  echo "    数据契约：${EXISTING_FRONTIER_3D_VISUALIZATION_DATASET_PATH}"
  print_existing_dataset_freshness_summary "$EXISTING_FRONTIER_3D_VISUALIZATION_DATASET_PATH"
  offline_rerender_command_line_interface_exit_code=0
  uv run --frozen python -m src.cli \
    --frontier-3d-visualization-dataset-in "$EXISTING_FRONTIER_3D_VISUALIZATION_DATASET_PATH" \
    --out "$OUTPUT_HTML_PATH" || offline_rerender_command_line_interface_exit_code=$?
  if [[ "$offline_rerender_command_line_interface_exit_code" -ne 0 ]]; then
    # 旧契约（例：实心面仍是 Plotly bdata 编码 ['dtype','bdata']）会被契约校验拒绝，这是有意的 P0-4 检测
    echo "错误：由已有契约重渲染失败（退出码 ${offline_rerender_command_line_interface_exit_code}）。" >&2
    echo "      若提示契约校验失败，说明该契约由旧版管线生成：先不带 --from-existing-dataset" >&2
    echo "      重新生成契约（python -m src.cli --out <html>，只读本机缓存），再重渲染。" >&2
    exit "$offline_rerender_command_line_interface_exit_code"
  fi
fi
if [[ ! -f "$OUTPUT_HTML_PATH" ]]; then
  echo "错误：CLI 结束但未找到输出 HTML：${OUTPUT_HTML_PATH}" >&2
  exit 1
fi

# ----------------------------------------------------------------------------- 2. 验证
REPORT_VERIFICATION_STATUS_TEXT=""
if [[ "$SKIP_VERIFICATION_REQUESTED" -eq 1 ]]; then
  echo "==> [2/3 验证] 已跳过（--skip-verify）"
  print_unverified_report_warning_banner
  REPORT_VERIFICATION_STATUS_TEXT="未验证（--skip-verify）"
else
  echo "==> [2/3 验证] scripts/run_all_frontier_3d_verifications.sh"
  if ! bash "${SCRIPTS_DIRECTORY}/run_all_frontier_3d_verifications.sh" "$OUTPUT_HTML_PATH"; then
    echo "错误：验证未全部通过，停止（不打开报告）。报告：${OUTPUT_HTML_PATH}" >&2
    exit 1
  fi
  REPORT_VERIFICATION_STATUS_TEXT="已验证（全部通过）"
fi

# ----------------------------------------------------------------------------- 3. 打开 / 托管
echo
echo "报告：${OUTPUT_HTML_PATH}"
echo "验证状态：${REPORT_VERIFICATION_STATUS_TEXT}"
if [[ "$SKIP_VERIFICATION_REQUESTED" -eq 1 ]]; then
  print_unverified_report_warning_banner
fi

if [[ -n "$LOCAL_REPORT_HTTP_SERVER_PORT" ]]; then
  if local_tcp_port_accepts_connections "$LOCAL_REPORT_HTTP_SERVER_PORT"; then
    echo "错误：${LOCAL_REPORT_HTTP_SERVER_BIND_ADDRESS}:${LOCAL_REPORT_HTTP_SERVER_PORT} 已被占用" >&2
    exit 1
  fi
  local_report_url="http://${LOCAL_REPORT_HTTP_SERVER_BIND_ADDRESS}:${LOCAL_REPORT_HTTP_SERVER_PORT}/$(basename "$OUTPUT_HTML_PATH")"
  # R3-F2：只托管一个仅含报告副本的临时目录。直接托管 HTML 所在目录时，--out ./frontier_3d.html
  # 会把仓库根（.env 里的真实 key、.git）一起暴露在 127.0.0.1 上。
  local_report_hosting_directory="$(mktemp -d "${TMPDIR:-/tmp}/frontier-3d-report-hosting-only-the-report.XXXXXX")"
  cp "$OUTPUT_HTML_PATH" "${local_report_hosting_directory}/$(basename "$OUTPUT_HTML_PATH")"
  echo "==> [3/3 托管] ${local_report_url}（只绑定 ${LOCAL_REPORT_HTTP_SERVER_BIND_ADDRESS}；只托管报告副本；Ctrl-C 结束）"
  uv run --frozen python -m http.server "$LOCAL_REPORT_HTTP_SERVER_PORT" \
    --bind "$LOCAL_REPORT_HTTP_SERVER_BIND_ADDRESS" \
    --directory "$local_report_hosting_directory" &
  local_report_http_server_process_id=$!
  # Ctrl-C 是结束托管的正常方式：停服务并以 0 退出；其他退出路径也保证不留下后台服务与临时目录
  trap 'kill "$local_report_http_server_process_id" 2>/dev/null || true; rm -rf "$local_report_hosting_directory"' EXIT
  trap 'kill "$local_report_http_server_process_id" 2>/dev/null || true; rm -rf "$local_report_hosting_directory"; echo; echo "已停止本地托管"; exit 0' INT TERM
  local_report_http_server_waited_seconds=0
  until local_tcp_port_accepts_connections "$LOCAL_REPORT_HTTP_SERVER_PORT"; do
    if ! kill -0 "$local_report_http_server_process_id" 2>/dev/null; then
      echo "错误：本地 HTTP 服务启动失败" >&2
      exit 1
    fi
    if [[ "$local_report_http_server_waited_seconds" -ge "$LOCAL_REPORT_HTTP_SERVER_READINESS_TIMEOUT_SECONDS" ]]; then
      echo "错误：本地 HTTP 服务 ${LOCAL_REPORT_HTTP_SERVER_READINESS_TIMEOUT_SECONDS} 秒内未就绪" >&2
      exit 1
    fi
    sleep 1
    local_report_http_server_waited_seconds=$((local_report_http_server_waited_seconds + 1))
  done
  if [[ "$OPEN_REPORT_IN_BROWSER_REQUESTED" -eq 1 ]]; then
    open_path_or_url_in_default_browser "$local_report_url"
  fi
  wait "$local_report_http_server_process_id"
elif [[ "$OPEN_REPORT_IN_BROWSER_REQUESTED" -eq 1 ]]; then
  echo "==> [3/3 打开] ${OUTPUT_HTML_PATH}"
  open_path_or_url_in_default_browser "$OUTPUT_HTML_PATH"
else
  echo "==> [3/3 打开] 已跳过（--no-open）"
fi
