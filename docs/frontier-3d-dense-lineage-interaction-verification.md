# 稠密报告的真实谱系拾取验证

验证入口仍为 `python scripts/verify_interactions_headless.py <report.html>`。成功返回 0；存在合法目标却无法拾取、真实事件回归、恢复预算耗尽或其他断言失败均返回非零。

## 实现合同

能力：从契约中的模型身份枚举候选，验证模型 hover、click pin、全部推理档位高亮、谱系连线、剪枝前身 tooltip、清理和相机保持。

范围：交互验证脚本、共享布局等待函数和浏览器回归测试。产品渲染代码、科学契约、生成 bundle 和冻结输入不变。

验收：冻结 689 模型报告及现有合成报告跑通完整旧 CLI；新增场景在 Chromium、Firefox、WebKit 执行；v2 和 v3 均覆盖正常谱系、无谱系、全部节点保留、默认口径为空和全空契约。

风险：射线预检能通过而 DOM 事件仍失败，因此射线结果只能决定探查位置，不能单独产生通过结论。

## 候选搜索与恢复

候选身份来自每个口径的 `displayed_model_markers`、`base_groups` 和 `lineages`。谱系能力沿用渲染器既有规则：节点须有 `lineage_family_key`、`reasoning_level_label` 和有限坐标，过滤后至少两代；旧 v2 推断谱系按此降级后，仍验收普通模型交互。中心命中的其他模型不会替换候选身份。中心和半径 85% 的八个方向共九个采样点逐一检查有限坐标、相机裁剪范围、画布和视口边界、DOM 接收元素及射线命中的完整身份。

当前口径先检查原视角的所有合法目标，再检查相对原相机上方向旋转 −90°、+90°、180° 的视角，随后按既有四口径顺序继续。每个口径、视角、目标组合只探查一次。恢复总预算为 60 秒，每次真实事件等待最多 3 秒。状态清理不占用搜索预算。

程序化 pin 仅用于探查前身，随后清除。布局稳定后重新投影，再发送正式的真实鼠标事件。正式 click pin 后移开鼠标并清除 hover，确认真实点击所得 pin 和谱系仍存在，避免 hover 代替 pin 满足常显断言。hover、pin、前身 hover 分别核对准备视角的相机位置、朝向、上方向、控制器目标和缩放。阶段结束清除临时交互并恢复原口径、相机及已有固定项。

真实事件失败后重新检查布局；只有投影或布局确实变化时，允许该动作重算并重发一次。稳定布局下的失败立即报告交互回归，不更换目标或视角。浏览器上下文意外关闭且没有已确认失败时，完整验证最多在新浏览器上下文重放一次；已记录的失败断言、断言异常、超时以及清理异常链中的断言失败均继续阻止成功，不清空失败记录。与上下文关闭无关的异常不触发恢复。

只有四个口径的契约均确认某项能力不存在，才报告该能力不适用。没有剪枝前身仍验证普通模型；有保留谱系则继续验证其连线。合法空口径核对零计数后继续其他口径，全空契约继续执行其余界面及运行时检查。

初始计数按实际 `activeMetricVariantKey` 核对，四口径切换检查后恢复该初始口径。搜索和厂商过滤优先使用当前非空口径，否则按固定顺序选择其他非空口径；只有四个口径全部为空才跳过，操作结束或失败后恢复原口径。

## 持久证据与中断重放

设置 `FRONTIER_3D_INTERACTION_VERIFICATION_ARTIFACT_DIRECTORY` 指定证据目录。缺省使用本工作区的 `.frontier-3d-worktree-artifacts/interaction-verification/`。跨任务交接应指定系统提供的持久交接目录，不能使用 `/tmp`。

`interaction-verification-events.jsonl` 每条记录追加后执行 flush 和 fsync，包含唯一 `run_id`。`run_started` 保存 HTML、嵌入输入和验证源码的 SHA-256、当前 HEAD、HTML 路径及浏览器类型；上下文启动事件保存实际浏览器版本。每次视角准备、候选与前身探查、正式预检、真实事件、失败原因和原视图恢复均保留记录。

相同输入、HTML、HEAD、源码和浏览器类型上，重启后首次遇到未结束的 run，下一次 CLI 调用从新浏览器上下文完整重放，并通过 `replay_of_run_id` 关联原记录。相同候选连续中断超过一次后持续非零退出，直至候选身份改变；不会删除原失败或无限重试。新上下文不复用旧页面的投影、pin 或相机状态。

## 验证切片与命令

第一片先用中心遮挡、换视角、真实事件被阻断三个失败测试确定拾取边界，再实现共享搜索。第二片覆盖换目标、全部不可拾取、布局变化的一次重试及预算。第三片覆盖能力缺失、空契约、旧契约及持久重放，再运行完整 CLI。

使用工作区独立的 Python 环境执行：

```sh
python -m pytest tests/browser_playwright/test_frontier_3d_interaction_verification_candidate_recovery.py --browser chromium --browser firefox --browser webkit
python -m pytest tests/browser_playwright --browser chromium
FRONTIER_3D_INTERACTION_VERIFICATION_ARTIFACT_DIRECTORY=<持久证据目录> python scripts/verify_interactions_headless.py <冻结报告.html>
```

当前生成器默认输出 v4 六口径。v2/v3 兼容场景复用既有 `build_expanded_frontier_3d_dataset_for_legacy_scene_assertions` 四口径夹具入口，再由适配器生成所需版本；遮挡恢复等场景继续使用当前默认生成器，避免升级默认契约后丢失旧版本的兼容验证。

macOS 测试 Firefox 使用现有 `prepare_frontier_3d_isolated_firefox_verification_launcher.py` 为任务独立副本配置应用身份，通过 `FRONTIER_3D_FIREFOX_EXECUTABLE_PATH` 指定启动器，不改共享浏览器缓存。
