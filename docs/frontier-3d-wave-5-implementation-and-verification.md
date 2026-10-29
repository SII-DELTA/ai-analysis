# W5 实施与验证记录

本轮按用户批准的五切片方案实施，基线与当前 `HEAD` 均为 `94e48709169283dc23f31084676484c843d8a7d7`。五切片已接入本任务工作区的正式生成入口与版本化 bundle，并完成数据、纯函数与浏览器验证。未创建提交、推送或部署。

## 触屏依赖接入与实际基线

方案要求共享渲染器先接入 `e13d8` 触屏修复。执行中确认该修复已完成原生评审并提交为 `8cd88f9791f1f9d6531f888e10c7dccdbcdb50d5`，但本地 `main` 尚未推进，仍为 `94e4870`。为履行已授权的依赖接入，先核对不可变提交源码及 39 项新增触屏回归，再把该精确源码接入本任务，随后应用 W5；没有改变任何分支引用。此前提出的追加许可问题已撤回，不把可自动补齐的依赖证据转成人工门禁。

来源为 `git show 8cd88f9:src/frontier_3d_interactive_report_assets/frontier_3d_threejs_interactive_renderer_entrypoint.js`，SHA256 为 `348444b0506e72fb9a57658023832b9f2e3cfcbf9458fc789a2fabe861af8e6e`。触屏测试通过三方合并保留该提交与本轮的回归改动，无冲突。源码原件、后续 W5 patch 和 `formal-renderer-source-integration-receipt.json` 已保存在本任务持久交接目录，不依赖另一任务 worktree 存续。

## 实施合同

- 保留原四口径的科学数值、正式前沿、排名、归一化基准和固定轴域；新增任务速度与两种成本的组合。
- 新生成科学契约 `frontier_3d_visualization_dataset/v4` 和浏览器投影 `frontier_3d_browser_projection/v2`；旧科学 v2/v3、浏览器 v1 沿用旧 Schema，不放宽原版本规则。
- 公共模型表覆盖全部输入；实测状态、任务耗时没有可靠来源时保持未知，API 端到端延迟独立保留。
- 复用既有搜索、固定比较、release/effort 分组、档位连线、正交分解口径按钮和 CLI 导出；不重构整体状态管理。
- 不访问 AA 网页，不启动采集，不写共享 `output/`、`data/raw/`、`data/processed/`，不实施 F-15、F-17、O6 或生产排名切换。
- `08b06` 的真实稠密谱系验证、`5c66c` 的真实历史前沿仍是独立交付；本轮不替代它们。

## 五切片的实现与验收

| 切片 | 已实现行为 | 验证与实际状态 |
| --- | --- | --- |
| 视角与分享 | 包围球自动取景；复位只改相机；双击空白复位；三个轴对齐透视视角；白名单 URL 状态；缺失 UUID 解释；复制失败可选中文本 | Node 与三浏览器往返、hash 导航、优先级、窄屏与相机结束写入通过；正式入口已接入 |
| 数据与全表 | 三态实测来源；`3600 / seconds` 任务/小时；六口径；全部输入及未上图原因；表格排序、筛选、CSV、防公式注入；WebGL 失败后保留表格 | Python、Node 和三浏览器通过；数据与模块已落文件，主 bundle 已接入 |
| 刷新差异 | 严格早于当前的 passed 基线；新增、本次未出现、缺值与正值超过 10%；版本门禁；绑定 API、目录、参数的持久科学快照；可靠新入前沿标记 | 合成历史与 CLI 测试通过；旧历史无匹配科学快照时明确不可比，绝不使用当前目录补算 |
| 敏感性与日期 | 智能 ±0.5/±1、成本与速度各 ±10% 的独立区间；稳健、敏感、近前沿；日期淡出/隐藏、显式播放/暂停、未知日期保留 | 合成支配关系覆盖相等边界；浏览器证明筛选和标注不改正式前沿、排名与轴域 |
| 键盘、深色与 PNG | 画布聚焦、方向键、`/`、Esc 浮层优先；CSS 与 Three 随系统主题；2× 离屏 PNG 合成页头、轴、图例、固定名、日期、AA 署名 | 三浏览器下载、失败释放及重试通过；视觉复查修正长轴换行、标注叠放、深色悬停按钮和分数对比度 |

来源语义要求目录记录的 UUID、智能分与当前模型相符，原始 `isEstimated` 必须为布尔值。保留原始标记和来源，不能只看到 `false` 就认定实测。任务耗时还要求当期标记、可核对目录和匹配版本；只接受正有限数值，拒绝布尔值、零、负数、无穷和缺值，端到端延迟不作为替代。

公共表与各口径 `model_analysis_records` 分开保存原记录和分析资格；非分析合格记录的敏感性值为 null。敏感性区间是假设，不是 AA 置信区间，也不覆盖重定标误差。日期只改变当前快照的可见性，持续显示“按当前价格、速度和评测口径计算”。

刷新历史复用已有 passed-history 选择器，跳过 pending/rejected、损坏 JSON、错误列表、时间不符原件；重复或无效 UUID 时继续查更早的合格原件，记录跳过原因，截止时间严格前移。科学快照摘要校验失败也会跳过。绑定使用取数时实际接受的 API 与目录记录，不重读可能已被并发刷新替换的 active 缓存。

## 契约与主要代码

- URL 白名单、优先级和 iframe 复用契约：[frontier-3d-view-state-v1-contract.md](frontier-3d-view-state-v1-contract.md)。普通交互用 `replaceState`，相机结束保存；加载后不自动播放。分享 `file:` 链接须同时提供对应 HTML。
- 科学契约与生成：`frontier_3d_versioned_model_reference_contract.py`、`frontier_3d_visualization_dataset_builder.py`、三个新 Schema。
- 历史与敏感性：`frontier_3d_refresh_difference_history.py`、`frontier_3d_sensitivity_analysis.py`；CLI 成功输出后将绑定快照写至请求输出目录的 `frontier-3d-scientific-snapshot-history/`。
- 浏览器纯函数、控件、相机、PNG、主题：`frontier_3d_view_state_and_model_table.js`、`frontier_3d_model_exploration_controls.js`、`frontier_3d_camera_view_controls.js`、`frontier_3d_browser_png_export.js`、`frontier_3d_model_exploration_and_system_theme.css`。
- 独立几何比较页已补任务速度口径与单位并重建自己的 bundle；F1 golden 比较仍限定原四口径，未切换生产排名。

## 自动验证证据

测试先行记录保存在隔离验证目录：新契约、任务速度、全输入表、敏感性、历史模块与浏览器控件均先验证预期失败，再实施；最后的历史 UUID 自动回退也先得到两项预期失败，再修正通过。

| 检查 | 结果 | 日志 |
| --- | --- | --- |
| Python 全量回归 | 1015 passed、5 skipped | `formal-integrated-python-results.log` |
| 最终数据/CLI/几何定向回归 | 50 passed | `final-data-boundary-tests.log` |
| 最新历史自动回退、数据及 CLI | 45 passed | `final-history-identity-fallback-results.log` |
| Node 纯函数 | 16 passed | `formal-integrated-node-results.log` |
| 接入前完整候选回归 | 192 passed，三个引擎 | `pending-final-browser-results.log` |
| 正式入口全部浏览器回归 | 234 passed，Chromium / Firefox / WebKit，含触屏及窄屏初始取景 | `final-complete-browser-results.log` |
| 后续布局、分享、相机、导出回归 | 63 passed，三个引擎 | `final-header-export-browser-results.log` |
| 最新 PNG 叠放与深色修正后的 W5 回归 | 30 passed，三个引擎 | `final-png-stacking-and-contrast-browser-results.log` |
| 直接取自 `8cd88f9` 的新增触屏回归 | 39 passed、69 deselected，三个引擎 | `reviewed-e13d8-touch-regression-results.log` |
| 深色文字扫描、浅深色/窄屏截图、PNG | 无页面异常、无低于 4.5 的已扫描文字；离屏资源释放 | `formal-implemented-visual-inspection.json` |
| bundle 可重建与空白检查 | 正式主 bundle、独立比较页 bundle 与各自源码逐字节一致；`git diff --check` 通过 | 交接摘要及 bundle 摘要 |

CLI 已通过实际命令以任务速度口径导出 PNG 与 SVG；指标语义、公共契约、内联 bundle 指纹、旧浏览器脚本入口与轴标注也分别核验，日志保留。WebKit 旧偏好测试的 hash 导航竞态已改为同一浏览器 context 新文档验证；非仓库指纹测试的隔离目录移至仓库外，未修改产品逻辑迁就测试。

不同轮次的定向测试存在重叠，不把表中次数相加冒充独立用例数。Python 默认跳过的五项需要本机共享缓存，本轮未启用；已批准的离线与共享目录只读边界保持不变。

接入前用 `pending_renderer_pytest_asset_override.py` 把候选 bundle 和新增 CSS 注入隔离 HTML；接入后关闭此覆盖插件，完整回归直接使用正式 Python 生成入口、主源码、CSS 和版本化主 bundle。正式主 bundle 与已验证候选逐字节一致，SHA256 为 `b356b7eec36343da7475dc72fe11da1d33d2647fbb234c1c0ae2795f5ef327c7`。新生成的浏览器投影 v2 可由正常入口直接使用。

Python 使用本任务独立环境 `UV_PROJECT_ENVIRONMENT=.frontier-3d-worktree-artifacts/wave-5-python-environment uv run --frozen`，缓存、临时测试文件和浏览器安装均在本任务隔离目录，不修改共享 `.venv`。三浏览器由 Playwright 自动运行，未要求人手工验收替代自动化。

## 冻结输入、体积与性能

复用 W4 冻结的 689 模型 CSV，SHA256 为 `3250f623c7cf73540fbb1e46ff47f9cef9849c2f7f8c14a7e2c25dacec6404b3`。按相同日期、参数逐 UUID 比较，原四口径的坐标、层号、突出度和归一化坐标完全相同；显示点数依次为 162、174、169、207。公共表由原来实际保留的 680 条扩展为全部 689 条。

同输入另由归档的原 `94e4870` 源码独立生成科学契约，原四口径逐值一致，证据见 `original-94e4870-source-versus-implemented-numeric-comparison.json`。额外核对早期 W4 持久 JSON 时发现部分浮点尾数不同，因此未把不同生成事件的 JSON 当作本轮逐值相等的唯一基准。

对应原 HTML 为 2,001,115 字节，新正式入口报告为 4,100,749 字节。最近一次隔离生成观测约 0.66 秒与 1.07 秒；完整记录见 `formal-frozen-input-numeric-and-size-comparison.json`。不承诺新功能沿用旧 HTML 固定体积。

窄屏新增回归覆盖 320×568 的初始加载、全部六口径和相机保持。初始控制栏折叠不播放过渡动画，取景使用最终布局；投影改用实际 CSS 尺寸，避免分数像素取整使轴名偏离轴段。

浏览器性能为同机 Chromium 各三次，观测保存在 `formal-implemented-frozen-input-browser-performance.json`。加载至 Logo 就绪的中位数约 424 → 457 毫秒；两帧中位耗时约 33.40 → 33.25 毫秒。相机期间轴标注尺寸 DOM 读取为零；加载时未发出外部请求或页面异常。两帧耗时包含浏览器调度，只记录观测，不作为跨设备 FPS 保证。

冻结 CSV 没有可核验的目录智能分/任务耗时对应证据，因此这份报告的实测状态和任务速度保持未知；六口径换算与资格使用可核对的合成样本验证，未倒灌当前目录。旧契约只能展示原件实际留存的模型，并明确覆盖局限。

## 持久交付与剩余边界

交接根目录：`/Users/bominzhang/.cline/kanban/task-handoff-artifacts/e9f93/wave-5/`。其中保存文档、全部修改源码副本与清单、相对基线的 tracked patch、未跟踪文件副本、精确依赖原件、候选入口/bundle/接入 patch、可重建脚本、日志、截图、数值/性能证据和合成数据预览。交接不依赖 `/tmp`、系统临时目录或其他 task 工作树。

最终预览标题明确标注“合成数据”，不作为真实 AA 模型性能结论。Kanban 发布回执只证明平台接受该预览；没有显示回执时不声称用户已经看到。

能力与验收状态：五切片已经接入正式工作区入口；数值兼容性、数据与纯函数、三浏览器、触屏回归及输出证据见上文。非目标与禁止提交、推送、部署的边界均保持；真实稠密谱系和真实历史前沿继续由独立任务负责。
