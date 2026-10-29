# 历史 Pareto 前沿：批准方案与实施记录

## 批准的实现合同

状态：已按批准方案实现。用户在本任务选择双视角、复用现行突出度方法、允许可比估算分参与、按口径开放 V5 后，于本会话明确要求 `implement the plan`。

- 能力：离线查看固定指数版本的发布回溯及真实档案回放，联动三维前沿、最高智能分曲线、突出度名次轨迹和成员进出。
- 范围：不可变来源清单、逐值溯源、UUID 身份归组、统一 release 日期、版本化历史契约、现有渲染器接入和自动验证。
- 非目标：不启用 F1 候选，不接入 Progress Index，不补造历史数值，不修改生产刷新门槛，不推送或部署。
- 验收：同 release 的各 effort 同步出现；不回填未来观测；版本断点与缺席可解释；估算状态三态明确；V5 缺有效速度常数时只开放原始速度；普通报告行为保持兼容。
- 基线：`94e48709169283dc23f31084676484c843d8a7d7`。
- 风险：旧网页观测时间按 mtime 推断，历史样本稀疏，现行突出度方法在小样本中可能不稳定。

## 实施切片

1. 来源恢复与时间规则：先用合成样本验证来源校验、混版拒绝、effort 统一日期及快照缺席。
2. 历史数值与科学契约：在已发布可比全集上复用现行函数，预计算时间步、共享身份引用，校验各帧 v3 契约。
3. 离线交互报告：复用单个 WebGL 场景，添加双视角、曲线和变化解释；验证相机与固定身份保持。
4. 真数据与交接：冻结本机持久归档及 V5 Free API；运行数值、构建、浏览器回归，保存完整来源与验证证据。

## 验证入口

`python -m pytest tests/python_unit/test_frontier_3d_historical_progress.py`

`node --test tests/javascript_unit/frontier_3d_historical_progress.test.js`

`python -m pytest tests/browser_playwright/test_frontier_3d_historical_progress_browser_interactions.py`

`node scripts/build_frontier_3d_threejs_interactive_renderer.mjs --check`

完整生成物与机器回执保存到本任务持久交接目录，不写共享原始数据、共享 output 或共享 Python 环境。

下文生成物体积、覆盖总数与全量验证数字属于修复前固定候选 `118194e5fc22dc53687d7284f3180642944c5879` 的基线记录。修复后的完整报告、发布资源包及最终验证由主会话重新生成，实际源码身份、体积和验证状态以该候选的持久交付回执为准。

## 使用与数据解释

默认展示最新可用 V4.3.2 的固定版本发布回溯。先选指数版本与观测快照，再移动时间滑杆；价格、速度与成绩固定在该快照，同 release 的各 effort 按最早核验发布日期一起出现，各档位保留独立点。该视角回答该版本、该观测样本中的模型随着发布时间增加如何改变前沿，不能视为发布当年已知的成绩或价格。

切到“真实档案 · 观测回放”后，时间轴只包含保留下来的观测。全部版本选项在版本变化处断开曲线并重置成员比较，不作跨版本进步推断；样本缺席不推断为当时不可用。真实档案目前始于 2026-07-09，更早的发布回溯不等于更早的真实观测。

历史侧栏显示所选口径下的最高可比智能分、所选模型的突出度名次轨迹、前沿成员进出和拟合诊断。突出度方法沿用现行四指标，默认趋势残差；切换方法或调整加权超体积权重会更新名次轨迹。固定模型身份与相机跨期保持；模型缺席时显示原因并清除旧值。分析全集不按模型年龄剪枝，显示筛选不改排名。“仅已确认实测”是明确改变分析样本的选项，会重算前沿。

估算标志按已确认实测、估算、未知三态处理。V5 Free API 的估算标志与 token 归一常数未知，因此当前只开放原始速度，且“仅已确认实测”下没有可比模型。这是证据边界，不能以默认 False 或沿用 V4 常数补齐。

## 冻结来源覆盖

以下是包含估算和未知样本时的可比模型数，已通过逐值版本、缺维度、发布时间及坐标有效性护栏；不是原始有分或有成本记录数。

| 观测日期（UTC） | 指数版本 | 原始 UUID 数 | 有效成本 × 有效速度 | 混合单价 × 原始速度 |
| --- | --- | ---: | ---: | ---: |
| 2026-07-09 | V4.1 | 549 | 74 | 274 |
| 2026-07-17 | V4.1 | 576 | 94 | 292 |
| 2026-08-04 | V4.1 | 591 | 122 | 290 |
| 2026-08-14 | V4.1.1 | 608 | 125 | 300 |
| 2026-09-23 | V4.3.2 | 673 | 143 | 339 |
| 2026-10-01 | V4.3.2 | 689 | 129 | 340 |
| 2026-10-02 | V4.3.2 | 689 | 159 | 342 |
| 2026-10-21 | V4.3.2 | 706 | 184 | 366 |
| 2026-10-28 | V5.0 | 716 | 不可用 | 70 |

六份旧 HTML 的观测时间根据文件 mtime 推断，界面和 CSV 均标注；三份 API 的时间来自抓取记录。2026-07-10 批次存在同批 UUID 字段冲突，隔离保留。旧 Git 中缺少精确版本和观测时间的 CSV 未进入分析。10-01 API 搭配较早目录时，只有逐 UUID 智能分一致的 token 数才获得当期资格。历史 release slug 的变更以官方 UUID 关联并留存别名记录，归组未知者单独标记。

修复前冻结报告共 9 份接受样本、2,332 个双视角与样本策略时间步、5,069 条共享模型观测及 2,324 份共享几何。完整逐值来源保存在科学 JSON；覆盖 CSV 与逐源接受/隔离结果另交付。

## 生成与发布

先准备带 SHA256、精确版本和观测时间的 `frontier_3d_historical_source_manifest/v1` 清单。每个来源可声明已核验的原件、归档成员或 Git blob；原件失效时依次有界尝试等价来源，保留原失败，不改输入。冲突或未知来源只隔离该样本，其余样本继续。恢复到清单指定 SHA256 后可重复同一生成命令。

```sh
UV_PROJECT_ENVIRONMENT=/持久位置/本任务独立环境 uv sync --frozen --extra test --extra browser-verification
/持久位置/本任务独立环境/bin/python -m src.frontier_3d_historical_progress_report \
  --historical-source-manifest-file /持久位置/historical-source-manifest.json \
  --output-html-file /持久位置/historical-frontier-progress.html \
  --publication-bundle-directory /持久位置/historical-report-publication-bundle
```

科学契约为 `frontier_3d_historical_progress_dataset/v1`，逐帧物化后按既有科学 v3 校验；浏览器投影为 `frontier_3d_historical_progress_browser_projection/v1`。场景和几何分别 gzip，选帧时才展开，只保留少量解压缓存。快速连续选择只提交最后一次请求，解码失败保留上一有效场景，修复后可重新选择。

完整离线 HTML 可直接在支持 `DecompressionStream` 的现代浏览器打开。修复前基线体积为 192,926,950 字节，科学 JSON 为 974,462,058 字节，另提供无损 gzip 副本（86,267,859 字节，解压 SHA256 一致）。平台预览单文件上限 50 MiB、总计上限 100 MiB，因此另提供入口加三份 gzip 分段资源，修复前发布工具补充任务署名后共 94,495,637 字节；传输清单使用 `frontier_3d_historical_progress_browser_transport/v1`。浏览器核对完整长度与 SHA256 后再解压，失败时保留初始三维场景并显示重试。该资源包需通过平台或本地 HTTP 服务访问，直接离线打开请使用完整单文件 HTML。

发布时通过 `task visualization publish` 指定入口，并按生成回执逐个显式映射 `.gzpart` 资源。不要仅发布入口或把未接受的发布请求标为成功。当前规模接近平台总量限制；未来新增样本超过限制时，生成器明确报错并保留完整离线报告，不删减科学数据。

时间步缓存的指纹包含源数据、准备后的模型值、固定轴域和科学实现依赖。跨重启可复用已校验缓存；损坏缓存带原 SHA256 留存隔离后重建。科学方法指纹与浏览器封装独立，单纯改变封装不会改写科学接受事实。

## 本轮交付位置

持久目录：`/Users/bominzhang/.cline/kanban/cross-task-handoff-artifacts/ai-analysis/task-5c66c-historical-frontier-implementation/`。

- `historical-frontier-progress-lazy-scenes.html`：完整离线交互报告。
- `historical-report-publication-bundle/`：平台预览入口、显式资源及生成回执。
- `historical-frontier-progress.historical-dataset.json`：已逐帧校验的完整科学数据。
- `historical-frontier-progress.coverage.csv`、`historical-frontier-progress.source-validation.json`：覆盖矩阵与来源接受/隔离证据。
- `historical-source-manifest.json`、`prepare-frozen-historical-source-manifest.py`、`frozen-source-responses/`：来源清单与冻结输入。
- `historical-source-manifest.frozen-replay.json`：独立冻结的重放清单，11 份源文件逐个核对 SHA256，可在不读取其他任务或共享缓存的情况下恢复同一输入。
- `historical-frontier-progress.generation-receipt.json`：原生科学生成接受回执；后续浏览器封装回执精确引用该科学 JSON 的 SHA256。
- `delivery-report.md`：最终验证、发布状态、源码快照与统筹交接入口。

修复前固定候选的全量验证：Python 1,010 项通过、5 项默认本机缓存测试跳过；Chromium 63 项通过；JavaScript 20 项通过；bundle 重建结果逐字节一致。修复前完整真实数据报告与发布资源包均通过 14 步浏览器核验；真实 Kanban 查看器也已自动打开并完成切帧，未出现脚本或控制台错误。上述记录不能证明修复后候选已经通过验证或发布。自动推送到用户前台的预览请求与该自动化查看器验证是两项独立事实，详见持久回执。

现行二次趋势拟合在小样本或设计矩阵秩不足时可能不稳定，界面给出样本数和秩，不自行换算法。F1 仍归 51730 后续决定，Progress Index 未接入。触屏详情缺陷与 W5 的实现由相邻任务负责，本任务未合并其 WIP；共用渲染器入口时需保留各自改动并复验最终整合候选。

## 与后续本地 main 的兼容整合

用户后续明确调用 `base-branch-sync`，本任务吸收了本地 `main` 的触屏详情修复及 W5 已提交成果。普通报告继续生成科学 v4；历史报告保持已验证的科学 v3 帧及原始速度、有效速度两种口径。历史来源未留存可核验的任务耗时，不能因为共享口径注册表新增任务速度而自动开放该维度。

历史切帧同步更新 W5 全模型表、表格 CSV 的内容及数据日期，并暂停基于上一帧日期集合的播放；保留表格搜索、排序和当前标签。当前帧全部公共模型记录进入身份表，缺席的固定身份继续清除旧数值。整合验证需同时覆盖历史视图、普通 W5 报告及触屏详情；原实施 RVF 的完成事实单独保留，不将其当作新增整合态的验证结果。
