# 独立前沿几何比较页

本卡 `ea403` 交付一个可离线打开的自包含 HTML，用相同模型、口径、轴范围和相机比较精确阶梯与 Delaunay 邻接插值。2026-10-23 用户已确认：默认保留邻接插值，标明它不是帕累托面，并提供精确可达前沿切换。

## 授权与实现合同

- 计划来源：本会话的《前沿几何独立比较 demo 实施方案》。用户明确选择了“独立比较页”“先比较两种”，随后要求 `Implement the plan.`，该计划达到 PLAN-READY。
- 能力：读入已有 `frontier_3d_visualization_dataset/v2` 契约，离线生成含 B4 立面、边线、联动视角与四口径量化表的独立比较页。
- 验收：预算放宽时阶梯高度不下降；不可达区空白；同高平台和同平面立面合并；插值参照的原始顶点与三角索引保留；面积和高度误差有可复核定义；四口径与窄屏交互经自动化浏览器验证。
- 非目标：不改正式报告、原有 v2 契约与主 renderer bundle；不实现单调平滑、正式形态选择器或三个历史 UX 建议；不访问 AA 网页，不刷新共享数据，不提交或推送。
- 改动面：新增独立几何模块、产物构建器、比较页资源、构建/验证入口、针对性测试及本文档。
- 风险边界：“精确”相对于输入中已展示且参与本口径分析的 Pareto 点，不包括未收录、被剪枝或历史口径点。

实现按三个可验证切片推进：精确阶梯与可手算指标测试；v2 离线产物及写入隔离；双视图、交互与像素验证。前两组先确认缺失模块的 RED，再实现 GREEN；同平面立面合并另有先失败后通过的行为测试。

## 开工复核与并行边界

计划草稿位于本会话上一回合的 `<proposed_plan>`，本回合用户已允许实施：`MUTATION_ALLOWED=1`。

开工前后本地 `main` 与本任务 HEAD 都为 `0765a10e983ce1df36dd34739e79e920e13f659e`；分叉点也是该提交，base 独有提交数为 0，base 改动路径为空。受控单向吸收与 boundary 校验完成，锁已释放，bootstrap receipt 存在任务 absolute git-dir 中。

matching `origin/main` 为 `c92f11e91f115cf506d529dde7c8a0d6488404d5`，本地 `main` 已包含它，未推进本地 base。此次流程只有匹配远程的 fetch，无 handback 或 push。

并行任务完整清单来源为 Kanban CLI，共 12 张 sibling 卡。软重叠：`86f17` 的输入契约与显示范围、`149d1` 的渲染/轴刻度、`b81b8` 的 B4/O4 后续定型。`149d1` 开工时已修改主 renderer、CSS、`visualize.py` 等；本卡以新增独立文件实现，没有改写或吸收 sibling worktree。与本卡实际新增文件的硬碰撞为空。

```text
LOCAL_BASE_DELTA_INSPECTED=VERIFIED
LOCAL_BASE_ABSORPTION=COMPLETED
SIBLING_TASK_SURVEY=VERIFIED
TASK_INVENTORY_SOURCE=KANBAN_CLI
SIBLING_TASK_COUNT=12
SOFT_OVERLAP_TASK_IDS=86f17,149d1,b81b8
HARD_COLLISION_TASK_IDS=NONE
NO_SIBLING_WORKTREE_MUTATION=VERIFIED
NO_SIBLING_WORK_MERGED=VERIFIED
PLAN_REVISION=NOT_REQUIRED
POST_ABSORPTION_PLAN_FRESHNESS=VERIFIED
ONE_WAY=VERIFIED
BASE_UNCHANGED_BY_TASK=VERIFIED
NO_HANDBACK=VERIFIED
NO_PUSH=VERIFIED
BOOTSTRAP_SEQUENCE=VERIFIED_SYNC_BEFORE_TARGET_REPOSITORY_VALIDATION
BOOTSTRAP_RECEIPT=VERIFIED
```

## 几何和指标接口

`build_exact_achievable_step_geometry` 接收投影平面上的 `(成本预算坐标, 速度下限坐标, 智能分数)` 点和视域边界。输出预算断点、可达高度单元、合并平台、竖直面、三角网格及边线。成本增大、速度下限降低为放宽；没有可行模型时高度为 `None`。立面只连接相邻且都有有限高度的平台，不向箱底或不可达区补面。

断点分格保证平台精确，合并只改变网格分块，不改变函数。复杂度随预算断点数而增长，不承诺审计文字所猜测的最坏情况 O(n)。退化、共线或不足以产生插值面的输入仍能展示精确阶梯；无插值支持时不外推。

比较页内部结构为 `frontier_3d_geometry_comparison/v1`，不升级公共 v2 契约。xy 坐标按输入的 log/linear 刻度转换，并将共同视域归一为 `[0,1]²`，智能分数保持原值。Delaunay 参照沿用原契约的三角索引。历史口径点只作显示背景；缺少明确 `analysis_eligibility` 的输入会被拒绝。

指标与定义：

| 指标 | 定义 |
|---|---|
| 反向面数量比例 | `d智能/d成本 < -1e-9` 或 `d智能/d速度 > 1e-9` 的有效三角面数 / 有效面数；投影退化面排除 |
| 面积加权反向比例 | 反向面的投影面积 / 插值支持域投影面积 |
| 支持域差异率 | 精确可达域为 A、插值支持域为 D，计算 `|A△D| / |A∪D|` |
| 平均绝对智能误差 | 仅在 A∩D 对 `|F-L|` 按投影面积积分后除以面积 |
| 最大绝对智能误差 | 取各阶梯单元与三角形交集顶点的最大误差上确界，含跳变两侧的极限 |
| 模型高差 | 只计展示、参与分析的非 Pareto 点高于插值面的数量及最大高差，凸包外数量单列 |

正式高度积分通过单元/三角形裁剪、在仿射误差零线处分割后求值；不是网格采样近似。四口径分别记录轴范围及投影尺度，不跨刻度比较绝对面积。空分母或无共同域为 `null`，界面显示“不适用”；无模型高出参照时，最大模型高差也为 `null`，与有零误差的共同域区分。

数据日期 `2026-10-02`、输入 SHA256 `dcb0ad7c8108bd2a6c7d734fd86e6104a75714805e9df849359feabed6ae70a2` 的复算如下。此表是绑定快照的记录，不是后续数据的固定验收常量：

| 口径 | 反向面 | 面积加权反向比例 | 共同域智能 MAE | 模型最大高差 |
|---|---:|---:|---:|---:|
| effective__effective | 27/45（60.00%） | 57.68% | 4.536 | 2.650 |
| effective__raw | 22/76（28.95%） | 21.56% | 5.471 | 6.308 |
| blended__effective | 35/86（40.70%） | 38.65% | 4.553 | 0.296 |
| blended__raw | 21/49（42.86%） | 42.84% | 5.432 | 不适用 |

旧审计 36%/39%/46%/58% 与 blended 口径的 8.4 分属于历史数据。当前快照的有效成本口径也有模型高出插值面，不能沿用“只有 blended 有该现象”的旧数据结论。支持域差异、曲面最大绝对误差与模型最大高差是不同统计，不能互相替代。

## 生成与复核

本任务产物默认写入 `KANBAN_TASK_CROSS_TASK_HANDOFF_ARTIFACT_DIRECTORY`；未注入时写入：

`~/.cline/kanban/cross-task-handoff-artifacts/ai-analysis/task-ea403-frontier-geometry-comparison-demo/`

输出包括 HTML、指标 JSON、决策说明和原始输入字节快照，文件名均以 `frontier_3d_geometry_comparison_` 开头。构建器在写入之前拒绝共享 `output/`、`data/raw/`、`data/processed/` 目的地，以及通过符号链接或硬链接覆盖输入的路径。

```bash
npm ci --ignore-scripts
node scripts/build_frontier_3d_geometry_comparison_demo_renderer.mjs
node scripts/build_frontier_3d_geometry_comparison_demo_renderer.mjs --check
uv run --frozen --no-sync python scripts/build_frontier_3d_geometry_comparison_demo.py \
  --visualization-dataset-in output/frontier_3d_visualization_dataset.json

FRONTIER_GEOMETRY_ARTIFACT_DIRECTORY="$HOME/.cline/kanban/cross-task-handoff-artifacts/ai-analysis/task-ea403-frontier-geometry-comparison-demo"
uv run --frozen --no-sync python scripts/verify_frontier_3d_geometry_comparison_demo.py \
  --html "$FRONTIER_GEOMETRY_ARTIFACT_DIRECTORY/frontier_3d_geometry_comparison_demo.html"
uv run --frozen --no-sync python -m pytest -q
```

复现历史结果时，把 `--visualization-dataset-in` 指向产物目录保存的 `frontier_3d_geometry_comparison_source_dataset.json`，并将新产物写到另一个持久目录；不要覆盖作为输入的快照。

浏览器验证使用锁定环境中的 Playwright Chromium，通过真实下拉框、checkbox 和指针事件检查四口径、双相机同步、悬浮联动与资源回收；读取实际画布像素确认线框和红色反向面可见。验证保存 1440、768、390 宽度截图、恶意模型名/空分析集截图和结构化报告。每口径额外进行 160000 个独立预算枚举与重心插值查询，对拍精确面积和智能误差积分。外部 HTTP 请求被阻止并要求尝试次数为 0。

### 本次验证结果

- 新增几何、指标和产物测试：26 项通过。
- 全量默认 Python 测试：269 项通过、7 项按默认规则跳过本机缓存测试，日志保存在持久目录 `python-unit-verification.log`。
- 独立浏览器验证：7 组通过；运行时错误 0、外部 HTTP 请求尝试 0。每口径 160000 个独立预算查询均在声明的数值复核容差内。
- 实际画布中，默认参照实心面蓝色像素为 21589，切为线框后为 5531；标记反向面后红色像素由 138 增为 8519，证明结果确实可见。
- 独立 bundle 与主报告 bundle 的 `--check` 均通过；新增 Python 文件语法检查与全部新增文件行尾空白检查通过。主报告已有源码和 bundle 未修改。

收尾时观察到共享 `output/` 的契约已变更：同为 `2026-10-02` 数据，生成时间变为 `2026-10-21T17:07:29Z`、SHA256 为 `3a266cc2499dbcccd96f53d27446f277b75771526d7e260017ee6a9e6b4675d0`，默认展示数为 207。本卡 demo 使用已保存的开工快照 SHA256 `dcb0ad7c…`、默认展示数 140；没有追逐共享输入变化重写比较依据。本文数字和验证结果均属于该冻结快照。本卡写入路径隔离，未核查共享文件的写入来源。

首次交接目录另保存 `implementation-source-snapshot/`、源码 SHA256 清单和验证汇总。原 12 文件于 2026-10-23 经完整 RVF 后提交为 `d2aaa3a`，并同步至本地 `main` 的 `682a1f6`；该目录保存的是首次实施证据，不代表后续正式报告切换功能的当前状态。

## 历史建议与后续决策

随附决策说明和页面保留 `4c7d1` 三条历史助手 UX 建议原文及来源位置，分别涉及 hover 非支配理由、特化方向、弱化编织面。它们尚无已核查的用户选择，本卡没有将其升级为已批准需求。

用户已选择默认保留 Delaunay 邻接插值参照；正式报告的接入行为见 [默认邻接参照与精确可达切换](frontier-3d-default-neighbor-reference-and-exact-frontier-toggle.md)。W4 可复用纯几何和指标模块，后续 v3 迁移仍需对拍。
