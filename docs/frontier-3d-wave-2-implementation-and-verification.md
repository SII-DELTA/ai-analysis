# Frontier 3D Wave 2 实施与验收记录

任务 `149d1`；用户在本会话批准前一条完整实施方案，并在计划阶段确认 D-5 使用着色透出。

## 实现合同

- 能力：修复曲面遮挡、档位谱系、hover/固定/筛选联动、视觉编码、运行时恢复和默认路径隔离。
- 验收：纯函数、Python、合成页面三浏览器、可见像素、故障恢复、双 worktree 隔离、bundle 指纹。
- 非目标：W3 信息布局、W4 release/effort 根治与几何默认选择，不提交、不推送、不部署，不访问 AA 网页。
- 接口：v2 增加 UUID、家族与档位信息，保留名称式公开适配和旧 v2 兼容。
- 风险：透明绘制顺序、胖线端点诊断、旧契约身份降级、浏览器上下文恢复时序。

## 实施分组

1. H2/O3：能力清单、纯函数抽取、Node 回归。
2. P0-5/A5/E2/E7：档位解析、UUID、显式家族与同档位谱系、空厂商覆盖、线性轴。
3. A1/A2/A3/A4：统一拾取时序、400ms 宽限、UUID 固定、可见性贯穿。
4. D-5/B1/B2/E3：透明面、宽线、身份环与光晕、错误及恢复。
5. T2/T5/T8：pytest-playwright、隔离默认路径、兼容入口、hook、合成 CI。
6. 验收与持久交接：记录命令、结果、剩余限制及能力差异。

## 开工核查

- local main 与 task HEAD：`0765a10`；无 base 增量，单向同步边界和 bootstrap receipt 已验证，锁已释放。
- 相邻任务清单来自 Kanban CLI，12 张。86f17、ea403、fc98a 均无源码 WIP，仅软重叠；不吸收 sibling 分支。
- 修订：保留公共可见性入口供近期模型开关接入；不修改最小化抓取或几何 demo 语义。
- 计划阶段基线：Python 237 passed / 7 skipped；bundle 重建一致；Chromium/WebKit 合成页可绘制。
- 计划阶段验证缺口：Firefox profile 启动失败；WebGL 恢复尚无有效断言，必须补成有超时的测试。

## 实现结果与能力差异

- H2/O3：建立能力清单，抽取刻度、搜索与投影标注布局三个纯函数模块。
- P0-4/B1/B2：两种透明曲面不写深度，关系线使用胖线，固定 Pareto 身份环与突出度光晕分离；前景拾取与绘制层次一致。
- P0-5/A5：识别 Max、Xhigh Effort、fallback 修饰词；UUID 进入 v2 marker 与谱系节点，显式家族按档位逐代连线，未知家族不画跨代线。
- A1–A4：OrbitControls 操作期间停拾取，结束及滚轮后重新命中；400ms 离开宽限；固定记录跨口径及改名保留，缺席/隐藏原因可见。
- A3：隐藏厂商清理 hover、关系线和前身；搜索、固定卡及排行标注隐藏状态，全局和可见 Pareto 分别计数；筛选不改变排行数值。
- E2/E3/E7：保留既有空 creator 修复并增加覆盖，线性速度轴非负；图形上下文丢失/恢复、WebGL 不可用、异常与 DPR 更新均有测试。
- T2/T5/T8：session 自建合成 HTML，浏览器脚本迁移且旧命令兼容；按 linked worktree 隔离默认读写，阻止共享目录写入；提供显式 hook 安装及合成 CI。

## 验证结果

| 验证 | 结果 | 证据 |
|---|---|---|
| Python 单元/性质/契约/CLI/隔离/hook | 265 passed，7 skipped | `python-unit-tests-final.log`；跳过的是显式依赖真实缓存的用例 |
| Node 纯函数 | 3 passed | 全量入口日志 |
| Chromium / Firefox / WebKit | 45 passed | 每引擎 15 项，含像素线宽、透明 logo、拖拽、宽限、UUID、筛选、故障恢复 |
| 一键入口 | 11/11 通过 | `complete-verification.log` |
| 真实缓存数据的契约、浏览器、交互、轴标注 | 四项通过 | `cached-real-data-*.log` |
| bundle / HTML 指纹、无外部请求、恶意字符串与非有限契约 | 通过 | 一键入口与浏览器日志 |
| 双真实 detached worktree | 通过 | HTML、CSV、raw 分别写入各自 checkout，模拟共享目录保持为空 |
| `git diff --check` 与 JS 语法 | 通过 | 本任务最终检查 |

新测试曾确认名称解析、缺失 UUID、负速度轴、缺少显式可见 Pareto 计数等预期失败，再实现对应修复。
golden 更新前逐点核对：既有模型集合、三维数值、突出度、归一坐标、分析资格和值来源均不变；差异为身份字段、谱系和轴范围。
唯一的 Python 告警来自合成模型 `Brand New Model (V-3)` 的未知后缀，原文被保留。
Firefox 故障注入测试单独放行并记录预期的 `WebGL context was lost.` 警告，其他页面的 console.error/warning 仍会失败。

macOS 27 的 Firefox profile 启动问题已通过任务内浏览器的独立应用身份解决，未修改日常浏览器或系统权限；
方案和准备脚本见 README，依据为 [Playwright 上游问题](https://github.com/microsoft/playwright/issues/42768)。
CI workflow 已编写，本轮未推送，因此没有远端 CI 运行结果。pre-commit 安装器仅在测试夹具仓库执行，当前仓库未安装 hook。

## 真实缓存报告

从共享目录只读复制 API JSON 与最新三份既有详情页缓存，合计约 12MB，并保留 mtime；未复制整套约 400MB 缓存。
生成进程把 requests 网络入口替换为拒绝函数，不访问 AA 网页或 API。最终目录护栏选中 2026-10-02 的一个有效分区。
输入 SHA256、mtime 与复制位置保存在 `explicit-read-only-cache-copy-manifest.json`。

- API 模型数：689；API 日期：2026-10-02；目录 v4.3.2，截至 2026-10-02T15:10:04Z。
- effective×effective：显示 140、分析 Pareto 26、参与分析 90、历史口径 50。
- effective×raw：显示 168、分析 Pareto 43、参与分析 109、历史口径 59。
- blended×effective：显示 172、分析 Pareto 48、参与分析 122、历史口径 50。
- blended×raw：显示 95、分析 Pareto 29、参与分析 95、历史口径 0。

这是离线重算，不是数据刷新；列表页缓存未复制而产生告警，列表页不作为值来源。
高智能但缺维或被现有剪枝排除的模型仍由契约给出原因；近期模型宽限期由 86f17 负责。

## 持久交接与集成边界

交接目录：`/Users/bominzhang/.cline/worktrees/149d1/frontier-3d-wave-2-implementation-handoff-2026-10-21/`。
该目录包含真实缓存 HTML/JSON、截图、日志、复制清单与源码候选 SHA256，独立于临时目录。
当前 task HEAD 与 local main 保持 `0765a10`；实现位于本任务未提交工作树，未推送、未部署。

收尾快照共 13 张 sibling 卡，来源仍为 Kanban CLI，无降级。86f17 与 fc98a 在本卡实施期间产生了共同文件 WIP；
ea403 使用独立几何原型文件。发现收尾重叠后，本卡产品源码候选固定，仅继续独立验证和交接；没有修改或吸收 sibling 工作。
后续集成须同时保留 86f17 的近期模型开关、fc98a 的目录刷新与本卡状态/路径语义，重新生成一次 bundle；不能直接覆盖共同文件。

```text
LOCAL_BASE_DELTA_INSPECTED=VERIFIED
LOCAL_BASE_ABSORPTION=COMPLETED
SIBLING_TASK_SURVEY=VERIFIED
TASK_INVENTORY_SOURCE=KANBAN_CLI
NO_SIBLING_WORKTREE_MUTATION=VERIFIED
NO_SIBLING_WORK_MERGED=VERIFIED
PLAN_REVISION=APPLIED
POST_ABSORPTION_PLAN_FRESHNESS=VERIFIED
ONE_WAY=VERIFIED
BASE_UNCHANGED_BY_TASK=VERIFIED
NO_HANDBACK=VERIFIED
NO_PUSH=VERIFIED
BOOTSTRAP_SEQUENCE=VERIFIED_SYNC_BEFORE_TARGET_REPOSITORY_VALIDATION
BOOTSTRAP_RECEIPT=VERIFIED
```
