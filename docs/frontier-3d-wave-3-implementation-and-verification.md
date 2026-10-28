# Frontier 3D W3 实施与验证

## 实施合同

用户在本会话明确要求实施已批准方案。基线 HEAD 与 local main 均为 `4dfa8047b3172a6d522f062bbfd15841719b4bee`。范围为 C1–C6、B3/B5–B8、D1–D3、H1/H2；保留 W2 状态机、Delaunay 默认、精确阶梯切换和六个月显示宽限。

不实施契约 v3、产物瘦身、生产输入有限性校验、分析归一化或突出度方法变更。不提交、不推送、不同步回主分支、不部署，不访问 artificialanalysis.ai 网页。共享目录只读，验证产物进入当前任务 `.frontier-3d-worktree-artifacts/wave-3-implementation-2026-10-28/`；需要证明“非 Git 目录”的 Python 测试工作文件放在同任务的 `../frontier-3d-wave-3-verification-artifacts/`，其余结果与日志均汇总回前述目录。

## 验收切片

1. 搜索与解释：完整字段和排除原因、40 组总数、真实按钮与键盘；v2 增补及旧契约降级。先写纯函数和契约测试，再验证浏览器。
2. 固定与突出度：UUID、档位排序、跨口径缺席恢复、清空、名称标注、底部字段持久化与百分比；超体积分母、权重草稿与提交。先写计算和浏览器断言，再实现。
3. 显示与窄屏：固定轴域、夹紧谱系、恒定 CSS 像素、0.5–1.5×、触屏详情、页头顺序与下方控制栏。覆盖有限完整集合、缩放和三浏览器多尺寸。
4. 文档与交付：README、能力清单、来源许可、冻结数据回归及持久证据；按统筹协议回报 ca0af。

## 影响面与兼容性

修改 `visualize.py` 的交互 payload 与固定轴域、v2 builder、品牌 fallback、three.js 入口及共享纯计算、HTML/CSS、bundle、相应单元/浏览器测试及文档。名称式浏览器接口、既有字段、超体积数组接口继续保留。

主要风险为较小标记的拾取面积、窄屏面板高度和旧契约缺少新增字段；以实际浏览器边界与旧接口回归核验。Python 全程使用 `uv run --frozen --no-sync`，测试缓存和截图留在任务隔离目录。

## 验证结果

2026-10-28 完成实施与验证。实际 HEAD 仍为 `4dfa8047b3172a6d522f062bbfd15841719b4bee`，全部改动尚未提交。执行期间 local main 前进到 `f3690702286400a5c5706cf42889a7f497026ba4`，仅涉及两项测试修正，与 W3 共同实现入口没有新增重叠；本轮按约定没有同步。

| 检查 | 结果 |
|---|---|
| Python 单元、性质、契约与冒烟 | 419 通过，7 项本机缓存用例按默认设置跳过 |
| Node 纯计算 | 9 通过，含搜索、档位、百分比、权重、超体积分母、轴与名称避让 |
| Chromium / Firefox / WebKit 合成报告矩阵 | 123 通过，包含 W2 回归、W3 详情/对比/键盘、旧契约、存储故障、DPR、触屏与运行时恢复 |
| 冻结数据生成和逐点对拍 | 四口径显示点数 207 / 217 / 213 / 207 不变；三轴、突出度与归一化坐标无差异 |
| 旧 golden 的原字段 | 仅 10 个轴域边界值发生预期变化；分析数值不变，新增字段单独记录 |
| 冻结报告三浏览器截图 | 320 / 390 / 640 / 750 / 901 / 935 / 960 / 1200px 与桌面；共 27 张默认布局，并补组合筛选、固定表和 tooltip |
| 实际 WebGL 像素 | 0.5× / 1× / 1.5×、DPR 1 / 2、两档距离；1× Logo 容器为 22 CSS px（抗锯齿容差 1px） |
| 公共契约、浏览器公共行为、恶意字符串及坏几何、轴标注、完整交互脚本 | 全部通过；无意外外部请求或 JS 运行时错误 |
| bundle 与 HTML 指纹、`git diff --check` | 通过，HTML 内联 bundle 与当前仓库 bundle 一致 |

Python 日志中的两个告警分别为已有 pandas 类型转换告警和合成 `V-3` 名称后缀告警；浏览器合成数据保留后者，未通过屏蔽意外浏览器错误换取通过。

### 旧指标脚本的等价核验

当前 HEAD 的 `scripts/verify_metric_semantics.py` 仍硬编码旧快照 296 / 377 计数，直接运行会失败。该基线问题已由 local main `f3690702` 修正，本轮没有把其他任务的提交同步进来。将该提交的修正版脚本保存为不可变副本，以本任务源码及同一环境执行，全部指标检查通过。原失败日志、修正版源码 SHA256、来源 commit、等价执行回执均保留；没有把原脚本的失败历史改写为成功。

### 自动化边界与恢复

共享 `.venv` 缺少 `pytest-playwright`，因此建立任务独立环境，并使用锁定 extras；没有修改共享环境。Firefox 使用任务内副本和既有独立应用身份 launcher，未修改日常浏览器或共享浏览器安装。

三浏览器验证真实轻点、卡内固定与合成 click 抑制；触屏拖拽在 Chromium 使用原生 CDP 手势，在 Firefox/WebKit 使用合成 PointerEvent（测试内替代不存在的原生捕获身份）。桌面拖拽继续使用真实鼠标。未把物理手机硬件验证计为通过。

### 能力差异与兼容性

- v2 只增补 `panel.output_mtokens`、口径 `description` 和排除记录的 UUID、基模型、档位及分析资格；既有字段、名称式浏览器接口及超体积数组返回接口保留。
- 固定表排除历史口径的最优值与基准百分比；缺席保留身份与原因，恢复口径后重新显示。拥挤的名称逐行避让，无法容纳或离屏的标签隐藏，侧栏和表格仍保留完整记录。
- 正常点轴域改用生成时完整有限显示集合，历史前身夹紧并给方向提示。夹紧前身可能重叠，因此选中模型保持在灰色前身上层，绘制与拾取一致；新增专门的重叠回归。
- 放大后桌面轴刻度同样避让，标题按约束程度及有限的三轴次序尝试布局；标题保持在真实轴段附近，不伪造刻度锚点。小数 DPR 下视口统一到实际帧缓冲像素边界。
- README、能力清单、方形 wordmark/monogram、`new Image()` + `CanvasTexture` 文档和 Lobe Icons MIT/商标声明已更新。Provider 权限结论只复核历史记录，没有重新探测。
- 契约 v3/瘦身仍归 `b81b8` / `d4957`，生产输入及谱系契约有限性边界归 `3a02e`。没有扩大到方法学、部署或远端操作。

## 持久交付与复验

产物根目录：`/Users/bominzhang/.cline/worktrees/22a5b/ai-analysis/.frontier-3d-worktree-artifacts/wave-3-implementation-2026-10-28/`。

关键文件：`final-verification-command-receipts.json`、`candidate-source-manifest.json`、`golden-numeric-compatibility-evidence.json`、`frozen-input-generation-evidence.json`、`frozen-browser-layout-and-interaction-evidence.json`、`kanban-implementation-preview-publish-receipt.json`。初始失败与后续通过日志分开保存，不覆盖原失败历史。

`frozen-regenerated-frontier-3d.html` 是新 v2 冻结数据的离线报告；`legacy-frozen-rerendered-frontier-3d.html` 用于旧 v2 降级。实施预览已通过 Kanban 发布（`status=published`），这仅表示任务预览发布，不代表生产部署或客户端实际展示已核验。

复验环境与命令：

```bash
export UV_PROJECT_ENVIRONMENT="$PWD/.frontier-3d-worktree-artifacts/wave-3-implementation-2026-10-28/python-environment"
export FRONTIER_3D_FIREFOX_EXECUTABLE_PATH="$PWD/.frontier-3d-worktree-artifacts/browser-launch-wrappers/firefox-verification"
uv run --frozen --no-sync pytest tests/python_unit -o cache_dir=.frontier-3d-worktree-artifacts/wave-3-implementation-2026-10-28/pytest-cache --basetemp=../frontier-3d-wave-3-verification-artifacts/python-unit-repeat
node --test tests/javascript_unit/*.test.js
uv run --frozen --no-sync pytest tests/browser_playwright --browser chromium --browser firefox --browser webkit -o cache_dir=.frontier-3d-worktree-artifacts/wave-3-implementation-2026-10-28/pytest-cache --basetemp=.frontier-3d-worktree-artifacts/wave-3-implementation-2026-10-28/browser-repeat
node scripts/build_frontier_3d_threejs_interactive_renderer.mjs --check
```

未运行新的 RVF，未提交、推送、同步、部署或移动任务到 Done。后续集成须另获授权，并复核当时 local main 与精确候选。

以上计数与指纹只记录实施阶段截止状态，不预写后续检查的通过数。独立 RVF run 目录：`/Users/bominzhang/.cline/worktrees/22a5b/frontier-3d-wave-3-rvf-review-2026-10-28`。
