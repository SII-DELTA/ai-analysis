# Frontier 3D 近期发布宽限：实施与验收

## 已批准的实现合同

本卡 `86f17` 根据本会话已批准的实现计划实施。原先近期模型可能仅因 Pareto 层数过大而不上图；现在默认给予六个日历月的显示宽限，并允许在页面关闭宽限专属点。

- 范围：剪枝、CLI、v2 契约增量、前端开关及依赖视图、自动化验证、离线模拟、报告重建。
- 验收：零宽限恢复旧集合；缺维及硬截断继续生效；Pareto 不变；开关不改变分析、点位或相机；清理 hover，保留 pin；兼容旧契约。
- 已选择：突出度沿用 `kept ∧ analysis eligible` 集合；新增当期宽限点参与生成时的计算。页面开关不重算分析。
- 已选择：开关保持固定范围。W3 后续可改为按含宽限点的完整显示集合计算固定轴范围。
- 非目标：W2 的 UUID 身份、跨口径 pin、几何与交互重构；W3 的轴范围算法及整体信息架构；W4 的契约 v3 与突出度方法修订；恢复网页抓取。
- 不提交、不推送，不改变共享原始数据；本卡只更新自己的源码和经过验证的共享输出。

实现依次覆盖“剪枝与 CLI 生成完整契约”“浏览器可切换并保持状态一致”“最新缓存的模拟、生成与验收”。对应测试先出现预期失败：Python 拒绝未知宽限参数；Chromium 报告缺少宽限开关。

## 接口与行为

`apply_pruning` 与契约构建使用 `recent_release_frontier_distance_grace_period_months`，默认 6；CLI 对应 `--recent-release-grace-period-months`。只接受非负整数，0 禁用。宽限为参考日前 N 个日历月，起止日期均包含；没有日期及未来日期不享受宽限。

先计算旧剪枝结果，再加入三维齐全、未超过硬截断的宽限点。每个 marker 的 `displayed_only_because_of_recent_release_grace_period` 只标识额外加入的点。历史口径点享受显示宽限，仍无分析层号、突出度及归一化值。`drop_reason` 的值域不变，新增点仍为“保留”。

v2 契约的 provenance 和 `current_view` 记录月数及剪枝参考日；口径及 `current_view` 记录 `recent_release_grace_period_only_model_count` 和 `kept_model_count_without_recent_release_grace_period`。读取旧契约兼容缺字段；新字段必须满足类型、标记数量及当前视图一致性校验。

前端统一判定厂商筛选、仅当期可比、宽限及坏坐标；拾取和关系线使用同一结果。隐藏正在 hover 的点时清理状态。搜索与 pin 卡保留入口并说明隐藏原因，图例显示实际可见计数。开关跨口径保留，刷新页面恢复默认。旧契约和生成月数 0 的报告禁用开关并说明原因。

新增浏览器接口 `setShowModelsDisplayedOnlyBecauseOfRecentReleaseGracePeriod`；现有状态接口增加开关、月数、宽限专属点数与真实可拾取的宽限点数。源码与 bundle 同步重建。

## 2026-10-02 缓存的结果

输入为 689 个模型。126 份输入文件的 SHA256 与 mtime 均已记录并验证未变化；mtime 是目录分区依据，不能仅比较文件内容。模拟禁止网络与凭据读取。

| 口径 | 0 月 | 1 月 | 3 月 | 6 月 | 12 月 | 6 月新增历史口径 | 分析 Pareto |
|---|---:|---:|---:|---:|---:|---:|---:|
| effective__effective | 140 | 144 | 168 | 207 | 261 | 16 | 26 |
| effective__raw | 168 | 170 | 189 | 217 | 265 | 12 | 43 |
| blended__effective | 172 | 172 | 182 | 213 | 268 | 14 | 48 |
| blended__raw | 95 | 111 | 156 | 207 | 267 | 0 | 29 |

四口径的显示层、分析层及 Pareto 标记逐点不变。新增当期点扩大归一化集合：默认口径原 Pareto 中 24 个超体积、25 个垂距发生变化；blended×raw 两项均有 29 个变化。另两口径这两项未变。完整数值差异、1/3/6/12 月新增名单和缺维名单见交接材料。

供 W3 更新说明：此次默认口径实际显示 Kimi 5 个、Thinking Machines 1 个、Inception 2 个模型。历史“这三家整家不上图”的结论不能沿用：当前数据已不同；宽限新增的是其中 Kimi 的 5 个，其余两家本轮没有新增。

## 验证与已知既有失败

- 完整验收入口 9 步全部通过：pytest（271 通过、7 项本地缓存测试默认跳过）、bundle `--check`、HTML 内联 bundle 指纹、指标语义、公共契约、Chromium 公共行为、交互、恶意字符串及坏几何、四口径轴标注与 320px 场景。
- 新宽限 Chromium 验证覆盖六个月、零宽限、零新增点、旧契约和最新真实报告共 5 份 HTML；四口径逐项验证计数、组合筛选、hover 清理、pin 保留恢复、搜索、图例、不可拾取以及排名、点位和相机不变。
- 原 golden JSON 未改；旧行为投影显式以零宽限生成，仅排除新字段。宽限元数据另外测试。
- 额外启用 7 项真实缓存测试：5 通过、2 失败。两项分别写死目录日期 2026-09-23 和 166 条 token 记录，当前实际为 2026-10-02、193 条；已在未修改的 local main `0765a10` 上复现同样失败。本卡不改这两项既有数据断言。
- 没有访问 AA 网页，浏览器无外部网络请求和 JS 运行时错误。独立 Python 验收环境位于持久交接目录，未同步共享 `.venv`。

复验命令：

```sh
uv run --frozen --no-sync pytest -q
node scripts/build_frontier_3d_threejs_interactive_renderer.mjs --check
uv run --frozen --no-sync python scripts/verify_frontier_3d_recent_release_grace_period.py <已生成的HTML> --verification-artifact-directory <持久验收目录>
uv run --frozen --no-sync python scripts/simulate_frontier_3d_recent_release_grace_period.py --simulation-artifact-directory <持久模拟目录>
UV_PROJECT_ENVIRONMENT=<独立验收环境> UV_NO_SYNC=1 bash scripts/run_all_frontier_3d_verifications.sh <已生成的HTML>
```

持久交接根目录：`/Users/bominzhang/.cline/kanban/cross-task-handoff-artifacts/ai-analysis/task-86f17-recent-release-grace-period/2026-10-21/`。其中包括生成报告与 CSV、模拟 JSON/Markdown、浏览器结果与截图、轴标注截图、完整验收日志、local main 既有失败复现日志。共享输出更新前的归档及更新回执也保存在此处，不删除旧产物。

共享 `output/frontier_3d.html` 与契约已更新，原文件保存在 `shared-output-before-grace-period-20261021T171259Z/`。更新回执验证新文件与已验收候选逐字节相同；共享路径的 Chromium 冒烟检查再次确认默认 207、关闭后 140、Pareto 26、相机不变，无网络请求或 JS 错误。默认视图截图和回执分别为 `shared-output-default-view.png`、`shared-output-browser-smoke-verification.json`。

## 基线与共同文件协调记录

实施前固定 local main 与 task HEAD 均为 `0765a10`；匹配远端仅作 fetch，远端已被本地包含，没有推进 base。单向吸收边界、锁释放和 bootstrap receipt 均验证通过，没有 task/base handback 或 push。

Sibling 快照来自 Kanban CLI，共 12 项。`149d1` 当时正修改前端入口与 `visualize.py`，属于硬重叠；双方文件位于独立 worktree。本次按用户“执行顺序一律自行决定，包括有依赖/阻塞”的规则，在本任务独立实施，不读取或合入 sibling WIP。后续整合应核对统一可见性更新与 W2 的 A3，以及共同 bundle。`ea403`、`fc98a` 和后续 W3/W4/W5 等为范围重叠，未改动其工作区。

```text
DRAFTED_PLAN_LOCATION=本会话已批准的 proposed_plan
MUTATION_ALLOWED=1
LOCAL_BASE_DELTA_INSPECTED=VERIFIED
LOCAL_BASE_ABSORPTION=COMPLETED
POST_ABSORPTION_PLAN_FRESHNESS=VERIFIED
SIBLING_TASK_SURVEY=VERIFIED
TASK_INVENTORY_SOURCE=KANBAN_CLI
SIBLING_TASK_COUNT=12
SOFT_OVERLAP_TASK_IDS=ea403,fc98a,22a5b,b81b8,e9f93,5fc95
HARD_COLLISION_TASK_IDS=149d1
PLAN_REVISION=APPLIED
NO_SIBLING_WORKTREE_MUTATION=VERIFIED
NO_SIBLING_WORK_MERGED=VERIFIED
ONE_WAY=VERIFIED
BASE_UNCHANGED_BY_TASK=VERIFIED
NO_HANDBACK=VERIFIED
NO_PUSH=VERIFIED
BOOTSTRAP_SEQUENCE=VERIFIED_SYNC_BEFORE_TARGET_REPOSITORY_VALIDATION
BOOTSTRAP_RECEIPT=VERIFIED
```
