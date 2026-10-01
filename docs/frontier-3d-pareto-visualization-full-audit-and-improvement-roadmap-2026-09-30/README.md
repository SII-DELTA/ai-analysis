# Pareto 前沿三维可视化（Frontier 3D）：全面审计与改进路线图

> 审计日 2026-09-30 ｜ 基线 HEAD `379d7b7`（本地 main）｜ Kanban 任务 ca0af ｜ 本文件是计划条目 W0-1「报告入库」的产物

**本文件的来源**

- **审计**：7 个维度的只读审计（history、methodology、data-pipeline、renderer-architecture、ux-product、live-browser、tests-infra），每个维度配 1 名独立核验者逐条复核，然后汇总，最后做完整性评审（workflow `wf_0729e422-0d9`）。
- **四方交叉验证**：Claude 子 agent、Codex、Kimi Code、Cursor Grok 4.7 分别对 116 条结论独立投票，以多数票为准；平票由主 agent 裁决。
- **主 agent 独立复核**：没有复用审计脚本，而是重写解析器，对全部 P0 和 Wave 0–1 的前提逐条离线复算（V-1..V-5）。
- 以上更正已全部并入正文。被推翻的数字不再出现在正文里，只在第 9 节和附录 C 以「原值 → 更正值」的形式留痕。

**编号与标注约定**

- **编号稳定**：P0-1..P0-13、P1-A1..P1-H2、O1..O6、F-1..F-17、T0..T8、D-1..D-12、W0-1..W0-7、W1-1..W1-13。后续 Kanban 卡按编号引用。被否决或降级的条目保留原编号，并注明新状态。
- **【完整性评审补充】**：完整性评审新增或修正的内容。**【交叉验证修正】**：四方投票多数意见带来的修改。**【V-x】**：主 agent 独立复核的结论。
- 文中的 `文件:行号` 都以基线 `379d7b7` 为准。「来源」列里的审计原始条目 ID（HIST-xx、METH-xx、DATA-xx、RA-xx、UX-xx、LB-xx、TI-xx）指审计 workflow 的中间产物。它们保存在审计 scratch 目录，没有入库。

---

## 0. 摘要

- **结论**：这是一个可以演示的 beta。算法内核可靠；**数据管线当前不可信**；three.js 运行时稳定；交互与信息设计相对 Plotly 版有功能倒退；工程化几乎为零。修好 P0-1 之前，不要用这张图对外下「谁在前沿、谁最突出」这类结论。
- **最严重的问题（P0-1）**：AA 在 8/14 到 9/23 之间把智能指数从 v4.1 重定标到 v4.3.x，管线没有察觉。回退链把旧成本、旧 token 比值和新版智能分拼在一起：
  - 默认口径的 136 个点中，65 个成本不是当期值，65 个冗长度是缩放出来的；
  - 另有 31 个实测模型明明有当期 token，却用了旧值；
  - 按用户对 D-1 的拍板修正之后，默认口径的 Pareto 点预期为 **22 个**（V-1）。
- **其余 P0**：列表页解析 0 命中，却打印「锚点校验: 通过」（P0-2）；详情页解析取了别的模型的值（P0-3，目前潜伏）；「实心面」从上线起就没有渲染过（P0-4）；混合价错误地排除了 123 个模型（P0-6）；文档中有误导性结论（P0-7）；冗长度报告在导入时崩溃（P0-8）；产物过期且没有指纹（P0-9）；页面没有 AA 署名（P0-10）；API key 明文扩散（P0-11）。另有两项【完整性评审补充】：网页抓取违反 AA 使用条款（P0-12），缺维模型静默消失（P0-13）。P0-5 在交叉验证后降为 P1-高。
- **交叉验证**：所有 P0 的事实断言都成立；唯一被否决的是新功能 F-15，已取消。独立复核推翻了投票中的一条勘误（「D-1 Pareto≈29」），确认原报告的 22 是正确的。
- **处置**：
  - 本任务 ca0af 实施 Wave 0（止血）和 Wave 1（测试地基 + 数据可信度）；
  - Wave 2–5 拆成 Kanban 卡；
  - 「最小化抓取」另开独立卡（第 0 张卡）；
  - 对外托管另有已建卡 a0c95。
- **需要用户本人处理**：P0-11，到 AA 平台轮换 API key。

---

## 1. 现状与成熟度

### 1.1 系统架构（基线 `379d7b7`）

```
数据源（src/fetch_data.py::build_dataframe）
  ├─ AA Free 分页 API（673 模型；total_cost 仅约 151–157 个有值；Free API 无 token 计数字段）
  ├─ /models 列表页 ── 已改 camelCase；snake_case 正则 0 命中（静默）
  ├─ 模型详情页 HTML（122 页 / 402MB；每页内嵌约 150 个模型的目录；只补 NaN 行、取「首个匹配」）
  │    └─ 缓存混有三个指数版本：v4.1（7/9–8/5 抓取）、v4.1.1（8/14）、v4.3.2（9/23）
  └─ 回退链：data/processed/models.csv（上次产物，写回 → 自我续命）→ data/reference 7/1 快照（v4.1 口径）
         │ 派生：output_mtokens = 新智能 ÷ 旧比值；eff_speed = speed ÷ (冗长度/全样本中位)；7:2:1 混合价
         ▼
src/frontier.py：3D Pareto 剥层 → 剪枝(today=now()) → 四项突出度（趋势残差/智能抬升/加权超体积/到前沿垂距）
         ▼
src/visualize.py::build_figure：每个口径一份完整 Plotly figure + interaction_payload（含 5 个死占位 trace）
         ▼ figure.to_plotly_json() → 按 trace 下标反解几何（Plotly 6 bdata 坑）
src/frontier_3d_visualization_dataset_builder.py → v2 契约 JSON（4.9MB；含 0.8–0.9MB Plotly 静态导出、59 家 logo）
         ├─→ cli --export：Plotly/kaleido 静态图（另一套视觉语言）
         ▼
src/frontier_3d_self_contained_html_renderer.py（str.replace 内联 bundle + JSON）
         ▼
output/frontier_3d.html（3.4MB）← bundle 784KB（esbuild，入库；window.THREE 阻止 tree-shake；可逐字节重建）
                                   ← entrypoint.js（1998 行单 IIFE，约 46 个可变 let，19 个 window 全局）
验证：scripts/verify_*.py ×5（手动运行；无 CI、无 pytest、无锁版本；需要临时 Playwright 环境）
```

W1-3 之后（D-12）：刷新默认只拉 API，网页抓取改为显式开关；已有详情页缓存只做离线解析，并且只采用与当期 API 版本一致的单一分区。

### 1.2 成熟度判断

| 层 | 成熟度 | 依据 |
|---|---|---|
| 算法内核（Pareto 剥层、加权超体积） | 高 | 4 个口径下与暴力 O(n²) 对拍零差异；JS 与 Python 的超体积差值为 0；与格点 oracle 对拍误差 ≤1.7e-16 |
| 数据管道 | **低，当前不可信** | 两代指数的数据混用且自我续命；列表页解析 0 命中也不报错；锚点校验空转却仍打印「通过」；抓取方式不合规（P0-12） |
| 契约与构建 | 中低 | Pareto 实心面 mesh 被 bdata 编码破坏；契约校验只查键；几何与 Plotly 耦合。bundle 构建可逐字节复现 |
| three.js 运行时 | 中高 | 按需渲染，静止时 0 次 rAF；切换口径 60 次无内存泄漏；9e8bc、b9670、c17ce、aafa3 这类卡死/重置问题全部不再复现 |
| 交互与信息设计 | 中低 | 相比 Plotly 版功能倒退：tooltip、pin 卡、口径说明、重置权重都没了；实心面、关系线、Pareto 环三处视觉编码失效；移动端基本不可用 |
| 工程化 | 低 | 没有 CI、测试框架、锁版本；验证环境不可复现；生成物和数据目录在 13 个 worktree 间共享；现有 5 个验证脚本在 HEAD 上全绿，却检测不出任何一个 P0（附录 A） |

**总评**：可演示的 beta。修复数据口径（P0-1）之前，不建议用这张图对外下「谁在前沿、谁最突出」这类结论。默认突出度排行的前 5 名中有 3 名建立在失真数据上（其中 2 名只凭仓库数据即可复现，第 3 名需要 9/23 的详情页缓存）。

---

## 2. P0 缺陷（正确性、崩溃、误导性结论、合规与安全）

### 2.0 P0 总览

| 编号 | 标题 | 最终优先级 | 落地位置 |
|---|---|---|---|
| P0-1 | 两代智能指数数据混用，默认前沿系统性失真 | P0（critical） | W1-3、W1-5、W1-6、W1-8 |
| P0-2 | 列表页解析 0 命中，锚点校验空转 | P0 | W1-4 |
| P0-3 | 详情页 token 解析取「全页首个匹配」 | P0（潜伏缺陷，仍随 W1-3 修复）【交叉验证修正】 | W1-3 |
| P0-4 | 实心面从未渲染；半透明曲面遮挡 logo | P0 | 数据侧 W1-10；深度遮挡 W2（D-5） |
| P0-5 | 推理档位与谱系解析错误 | **降为 P1-高**【交叉验证修正】 | 短期修复 W2；根治 W4 |
| P0-6 | 7:2:1 混合价错误排除 123 个模型 | P0（2:2 平票，裁决维持在 Wave 1） | W1-7 |
| P0-7 | 文档中的误导性结论 | P0 | W0-3 |
| P0-8 | 冗长度报告导入即崩溃 | P0 | W0-2、W1-10 |
| P0-9 | 用户手里的 HTML 过期且无版本指纹 | P0 | W0-5、W1-13 |
| P0-10 | 页面无 AA 署名与数据来源 | P0 | W0-4 |
| P0-11 | AA API key 明文扩散 | P0（需用户本人处理） | 不建卡 |
| P0-12 | 网页抓取违反 AA 网站使用条款【完整性评审补充】 | P0 | D-12：W1-3 暂停抓取；第 0 张卡 |
| P0-13 | 缺维模型静默消失，智能分最高的模型不在图上【完整性评审补充】 | P0 级提示 | W1-8 告警；W3 搜索显示原因 |

### P0-1 两代智能指数数据混用，回退链自我续命，默认前沿系统性失真

**来源**：HIST-05、METH-01、DATA-01、DATA-08、TI-02，以及三位核验者的 missed_issues。**严重度**：critical。**工作量**：L（分两期）。

**问题**

- `fetch_data.py:292-298` 的回退顺序是 `models.csv` 优先，其次才是 7/1 快照；`:441-445` 每次运行都把结果写回 `models.csv`，旧值因此一直续命。
- `:230-237` 的详情页补齐只处理 NaN 行，新鲜的 token 数永远排在旧回退值后面，`--refresh` 也刷不掉。
- `:409` 用「新智能分 ÷ 旧比值」反推冗长度。

**证据**（已复现；数字均为离线可复现口径，见附录 C）

- AA 在 8/14 到 9/23 之间完成了重定标。512 个共同模型中有 509 个分数变化（按 >2% 阈值计同样是 509），中位比值 0.708。新旧成本比的中位数为 1.59，54 个可对照模型（当期 API 对照 7/1 快照）的变化全部超过 2%。
- 默认口径保留（kept）的 136 个点中：
  - 65 个成本不是 API 当期值：48 个来自 v4.1 快照，17 个来自旧 csv；
  - 65 个冗长度是缩放出来的【V-5】，缩放系数 0.545–2.72，中位约 0.667。
- 32 个 Pareto 点中，12 个成本非当期，9 个冗长度被冻结。
- **isEstimated 与值来源的关系**：
  - 在默认口径内，上述 65 个非当期成本模型在 AA 上都标为 `intelligenceIndexIsEstimated=true`，71 个 API 成本模型都为 false；
  - 但全表另有 **4 个**非当期成本模型标为 `isEstimated=false`【V-5】，可见二者不是充要关系；
  - 因此 D-1 的判定依据改为「字段的值来源」（第 8 节）。
- 另有 31 个实测模型，9/23 的详情页缓存里已有当期 token 数，管线却用了旧值：
  - 冗长度被低估 1.17–3.69 倍；有效速度经中位数重归一后被高估 **1.06–3.35 倍**【V-5】。
  - 其中有若干个 Pareto 点：活抓取口径为 5 个，离线复算为 8 个，以 W1-13 的复算结果为准。
  - 例如 GPT-5.6 Luna (Non-reasoning) 用的仍是旧值 1.37M，而 AA 的当期值在 9/23 缓存中为 2.36M。
- 默认突出度排行前 5 名中有 3 名建立在失真数据上。
- 把能替换的值都换成当期值后（离线复算），Pareto 点从 32 个变为 36 个。成员变化不大，但坐标整体失真。
- 【V-2】9/23 的目录**没有带来任何新的当期成本**：它的 151 条成本与 API 的 151 条完全相同，另 6 条是 0 占位。所以成本来源只有两类：「API」和「非当期回退」。

**修法（第一期，W1-5，不依赖决策）**

1. 把 `models.csv` 移出默认回退链，改为显式开关 `--use-previous-run-processed-models-csv-as-fallback`。
2. 回退源改存原始量（`intelligence_index_canonical_output_token_count`、`cost_to_run`），不再存比值；快照文件名带上指数版本号。
3. 每个值记录来源、指数版本和抓取时间（`cost_to_run_value_source`、`output_token_count_value_source` 以及对应的版本列、时间列），写入 csv 和契约。
4. 按 UUID 用 9/23 目录的当期 token 覆盖旧值，修正上面 31 个过期 token。**成本不必覆盖**，因为目录成本与 API 完全相同（V-2）。`output_mtokens` 直接由 token 数得出，不再由「新智能 ÷ 旧比值」反推。
5. 采集 `intelligenceIndexIsEstimated`、`isReasoning`、`effort`、`release`，写成 DataFrame 列和契约 panel。`is_estimated` 只表示「智能分是否为估算」，不能引申为价格和速度都是当期实测。
6. 【交叉验证修正】改写 `_validate` 的 `n_cost ≥ 250` 断言（`fetch_data.py:423`）。去掉非当期回退后，当期成本只剩 151 条，这条断言必然失败。改为按来源统计的护栏：当期来源条数 >0、非当期回退占比有上限、版本一致；再加一条回归用例，证明只有 151 条当期成本时也能生成有效报告。
7. 【交叉验证修正】AA API 响应顶层本来就带 `intelligence_index_version` 和 `tier`，是 `fetch_api` 把它们丢掉了。W1-8 直接持久化这两个字段，并用作版本护栏。

**修法（第二期，W1-6，按 D-1 的拍板结果）**

- 按口径分别计算两列：
  - `display_eligible_for_frontier_3d_metric_variant`：是否显示。沿用现有剪枝规则，另加一项「近期 ∧ 分析层号 ≤ layers」：
    历史口径点不得把当期可比的近前沿点挤出显示（D-1）。9/23 数据上默认口径因此多显示 10 个当期点（107→117），
    点云并非完全不变；
  - `analysis_eligible_for_frontier_3d_metric_variant`：是否参与分析。
- analysis_eligible 的判定**依据该口径实际用到的字段的值来源和版本，不依据 isEstimated**：
  - 用到有效成本或有效速度（依赖 token 数）的口径，要求这些值来自当期版本；
  - blended×raw 口径只依赖单价和原始速度，与指数版本无关，全部点都参与。
- analysis_eligible=False 的点退出**所有**分析基准：Pareto 分层、归一化 min/max、趋势拟合、智能抬升的对照集合、超体积、垂距、前沿线框、实心面和可达面。这些点的 `is_pareto=False`，突出度为 None。
- 渲染端：
  - 这些点降低不透明度并加虚线背板；
  - tooltip 注明「历史口径（v4.1 成本/冗长度），不参与本口径前沿计算」；
  - 工具栏加「仅当期可比」开关。
- 验收预期：默认口径 analysis_eligible 子集的 Pareto 数为 **22**（V-1）；「历史口径」点在默认口径 **41** 个（9/23 数据实测，
  显示 117），在 blended×raw 口径为 0。「约 65」是旧管线点云上的计数：新管线默认不再读上次 models.csv、有效速度按
  版本分别归一，旧点云中 25 个历史口径点不再上图。是否为这些点放宽显示规则属于待拍板事项（审查 R4-03），定案前以 41 验收。

**【V-3】新风险：暂停抓取的直接后果**

- 9/23 之后上架的模型有 API 成本和速度，但没有当期 token，所以它们在两个「有效速度」口径（含默认口径）中**完全缺席**，只会出现在两个原始速度口径里。
- W1-8 的新鲜度摘要和缺维告警要把这类模型单独列出，写成「N 个新模型因暂停抓取缺当期 token」。
- 免抓取的替代指标：API 原生的 `median_end_to_end_response_time_seconds`，覆盖 347 个模型。它与 AA time per task 的 Spearman 为 0.75，低于 token 归一化的 0.95，高于原始速度的 0.60。该指标作为候选写进第 0 张卡和 F-6，不进 Wave 1。

### P0-2 列表页解析器 0 命中，锚点校验空转却打印「通过」

**来源**：DATA-06、TI-16（核验修正）、DATA 核验者 missed #5/#7。**工作量**：S。**落地**：W1-4。

- **根因**：AA 把 payload 改成了 camelCase。`models_page.html` 里仍有 23 个 `initialModels` 对象带 `intelligenceIndexCost`（独立复核：snake_case 命中 0，camelCase 命中 23）。失效的是 `fetch_data.py:132-135` 的 snake_case 正则，页面本身没有退化。
- **后果**：
  - `:428-434` 的两个锚点永远走「跳过」分支，`:458` 却无条件打印「锚点校验: 通过」；
  - 锚点期望值（7.677 和 819.84）本身就是 v4.1 口径；
  - `:429-430` 按名字 `assert not hit.empty`，模型一改名就会中断整个管线。
- **修法**：
  - 列表页（已暂停抓取，只读缓存）解析为 0 条时醒目告警，不再静默通过。
  - `COST_ANCHORS` 名称锚点改为「API 与详情页目录在 UUID 交集上成本一致率 ≥99%、智能分一致率 ≥99%」，找不到时只告警，不 assert。
    【2026-10-01 决策修订（R1-01 (a)）】两项一致率护栏都降为 warning_only：V-2 之后目录成本不是值来源；智能分不一致的模型改为逐 UUID 降为非当期。见下文「Wave 0–1 决策落地」。
  - `main()` 不再无条件打印「锚点校验: 通过」。
  - 如果保留列表页解析，就改成 camelCase，并配一份裁剪过的 fixture 测试。

### P0-3 详情页 token 解析取「全页首个匹配」（潜伏缺陷）

**来源**：METH-12、DATA-02。**工作量**：S。**落地**：W1-3。**状态**：【交叉验证修正】按潜伏缺陷处理，但仍随 W1-3 修复。完整性评审曾建议降为 P1 并入 O2；投票结果是 3 票同意维持、1 票主张降级。

- 122 个缓存页中，有 23 页的首个匹配返回 Gemini 3.5 Flash (high) 的 75383395，另有 1 页返回其他模型的值（V 复核）。
- 这些模型目前都没有成本，所以已被污染的行数为 0。但详情页缓存会被永久复用（`fetch_data.py:110`），一旦这些模型有了成本，就会静默拿到别人的冗长度。
- **修法**：先定位 `"currentModel":{"id":"<行 UUID>"`，用 `json.JSONDecoder.raw_decode` 取出完整对象，只在对象内部读取，并断言 id 与行 id 相等。回归测试加入「首个对象不是本模型」的负样本（例如 `claude-35-sonnet.html` 应返回 None）。这部分与 W1-3 的离线目录解析器合并实现。

### P0-4 「实心面」从上线起就没渲染过；半透明曲面把后方 logo 整块抹掉，但仍可拾取

**来源**：RA-01、METH-02、DATA-04、UX-01、LB-01、RA-02、LB-02，以及 UX、LB 核验者的 missed_issues。**工作量**：S。**落地**：数据侧在 W1-10，深度遮挡在 W2（按 D-5）。

- **实心面**：
  - `dataset_builder.py:65-73` 对 **figure 级** `to_plotly_json()` 的结果调用 `list()`。Plotly 6.8.0 会把 numpy 数组编码成 `{dtype,bdata}`，于是 4 个口径的 mesh 都变成了 `["dtype","bdata"]`（V 复核：四个口径全部如此）。
  - `.venv` 在 07-09 就装上了 plotly 6.8.0，早于 9b08b48（07-18），所以 three.js 版的实心面从第一天起就是空的。
  - `entrypoint.js:313-320` 的 `normalizedAxisValue` 遇到非有限值直接返回 0，把错误悄悄吞掉了；损坏的 mesh 仍会按长度 2 去建网格。
- **深度遮挡**：
  - `entrypoint.js:452-463` 给曲面设了 `depthWrite:true`，renderOrder 为 0，因此先于 sprite 绘制。开启 opacity 0.2 的可达曲面后，16–29 个 logo 被整块剔除，却仍能 hover 和点击（拾取只对 sprite 做 raycast）。
  - 这个行为是 7247b6f 有意引入的，并写进了两处断言：`verify_frontier_3d_threejs_browser_contract.py:61-62` 和 `verify_interactions_headless.py:84-86`（第二处为【交叉验证修正】补充）。
  - 同一 mesh 内的各个平台之间，也会因为绘制顺序互相遮挡。
- **修法**：
  1. 根修：在 `visualize._frontier_mesh` 中把 x/y/z/i/j/k 转成 `.tolist()`；`_triangle_mesh_from_plotly_trace` 再加一层 bdata 解码兜底。更彻底的方案见 O1。
  2. 契约校验改为数值校验：坐标全部为有限数；索引是 `[0,n)` 内的整数；三组索引等长。Pareto 点不足 4 个或投影共线时，允许合法的空网格。
  3. 前端遇到非有限的坐标或索引时**不建网格**，并在状态中暴露 `nonFiniteContractCoordinateCount`【交叉验证修正】。
  4. 两种曲面都改为 `depthWrite:false`、renderOrder >50，放在 sprite 之后绘制，让后方 logo 被染色但仍然可见，同时消除自遮挡。这一步以 D-5 为准，在 W2 动手前向用户确认一次。
  5. 实心面按 z 值着顶点色，否则无光照的单色面看不出形状。
  6. 断言：新增阻断断言「切到实心面后三角形数增加，且索引全为有限整数」。两处 depthWrite 断言在 D-5 定案前保留，定案后再改期望值。
- **执行顺序**【交叉验证修正】：必须先修 bdata、重新生成数据契约，再重渲染。只用旧 JSON 重渲染，实心面仍然是空的。

### P0-5 推理档位与谱系解析错误，画出伪谱系线（已降为 P1-高）

**来源**：METH-13、DATA-09、UX-05、UX-06 及核验修正。**工作量**：短期 S，根治 M。**状态**：【交叉验证修正】2:2 平票，裁决降为 P1-高。理由是它只影响 hover/pin 时的关系线和 pin 卡标签，不改变 Pareto 和突出度的数值。**落地**：短期修复在 W2 卡，根治在 W4 卡。

- **问题**：`visualize.py:30-34` 的关键词表缺少单独的 `max`、`xhigh effort` 和 `* fallback`，没有后缀的推理模型会被默认标成 non-reasoning。
- **后果**（V 复核）：
  - 默认口径下有 19 个基模型名残留括号后缀，其中 18 个是档位，另 1 个是日期（`GPT-5.5 Instant (June 2026)`）。这些档位都被当成了独立的基模型。
  - kept 中有 37 个模型本地标为 non-reasoning，而 AA 标为 `isReasoning=true`。
  - `visualize.py:47-51` 的 tier 关键词含 `max`，于是生成了伪谱系：`OpenAI||max`（GPT-5.6 Luna/Terra/Sol 连到 GPT-6 Astra/Luna/Sol）、`Z AI||max`（GLM-5.2 (max) → GLM-5.3 (max)）。其余 `…||max` 中，Qwen3 Max 这类属于正常 tier，需要逐个甄别。
  - `OpenAI||(default)` 把 17 代模型串成一条线，覆盖 38 个点。
- **修法**：
  - 短期（W2）：
    - 关键词补上 `max`、`xhigh effort`、`* fallback`；
    - 保留 `(0902)` 这类日期后缀；`based on …` 是出处说明，不剥离；
    - 参数化测试要覆盖 Quasar 438B（max, based on GLM-5.2）这类跨厂商衍生负例；
    - 只对无法识别的括号后缀告警，日期和参数规模这类合法括号不告警。
  - 根治（W4）：按 UUID 合并目录中的 `release.slug`、`effort.slug/level`、`isReasoning`（W1-5 已提供这些列）。同一基模型的各档位按 release 分组；跨代谱系另需显式的家族映射，映射未知时不画线。

### P0-6 7:2:1 混合价错误排除了 123 个模型

**来源**：METH-11。**工作量**：S。**落地**：W1-7。**优先级**：2:2 平票，裁决维持在 Wave 1 修复。改动量为 S，而且顺带修正了 blended 口径的前沿完整性。

- `fetch_data.py:276-288` 在缺少 cache-hit 单价时返回 NaN。
- AA 的惯例是缺 cache-hit 价时用 input 价代替：
  - 用目录自身的分价计算，缺 cache-hit 的 178 个模型全部满足 `price1mBlended7To2To1 = (9×input+output)/10`；
  - 用 API 的分价计算只有 168/178 吻合，其余差异来自 API 价格的四舍五入（V 复核）。
- 后果：智能分和原始速度齐全的 123 个模型缺少混合价。effective 口径的 Pareto 点中有 5 个在 blended 口径下「消失」，容易被误读成被支配。
- **修法**：
  - 优先采用目录中同版本的 AA 原生 `price1mBlended7To2To1`；
  - 没有原生值时，缺 cache-hit 价就用 input 价代替，即 (9×input+output)/10；
  - 新增 `blended_price_cache_hit_price_source`，取值为 native_catalog / computed_with_cache_hit / assumed_equal_to_input_price；
  - 与 API 舍入价对拍时，使用有依据的容差。
- **文档**：README:79 声称「Pro API 原生字段为…」，但这个字段在两个 API 端点中都出现 0 次，与 README:81 一并修正。
- **修复后的模拟结果**：blended__effective 的 kept 从 146 变为 172、Pareto 从 50 变为 59；blended__raw 从 66/20 变为 77/23；原有的 Pareto 点没有一个变成被支配。

### P0-7 文档中的误导性结论

**来源**：METH 核验者 missed #2、METH-03、HIST-04、METH-10。**工作量**：S。**落地**：W0-3。

- `docs/artificial-analysis-intelligence-growth-and-economic-impact-analysis/README.md:11,:116` 断言「所有模型按同一版本（v4.0）回溯打分，不存在口径漂移」。实际上当前版本是 v4.3.2，2024 年及更早的模型 99–100% 是估算分。
  - 修法：立即加更正注记；智能增长曲线的结论需要重新审视。
- `README.md:89-93` 把 Delaunay 网描述成「在每个成本/速度处由最智能模型编织」，平面写成「(log 成本, 速度)」。
  - 实际算法是在 (log 成本, log 速度) 平面上对 Pareto 点做邻接插值。
  - 反向面的比例（V 复核）：effective__effective 36%、effective__raw 39%、blended__effective 46%、blended__raw 58%。**判定口径**：在 log–log 平面上，三角面的梯度在成本或速度任一方向上与支配方向相反。
  - 修法：先把文字改为「(log 成本, log 速度) 平面上 Pareto 点的邻接插值，仅作视觉导引」；几何表达等 D-2 的 demo 结论。
- `README.md:55,66-69` 的统计数字已经过时，标题里「备选」与「默认」的说法自相矛盾。

### P0-8 冗长度报告在导入时就崩溃

**来源**：DATA-05、TI-01。**工作量**：S。**落地**：W0-2 修导入，W1-10 改用目录数据并重新生成报告。

- `model_intelligence_verbosity_report.py:18-23,81` 仍在导入 `fetch_page`，而它已在 111ba45 改名（V 复核：ImportError 复现）。
- 只修导入还不够：它依赖的两个解析器都是 0 命中，产出也会是错的。应改为复用目录数据，并加一条「import 所有 src 模块」的冒烟测试。
- 完整性评审曾建议降为 P1，理由是它不在 3D 管线内（`src/cli.py:19-33` 不导入它）。投票为 3 票维持、1 票主张降级，因此维持 P0。

### P0-9 用户手里的 HTML 没有轴刻度修复，产物也没有版本指纹

**来源**：HIST-01、RA-11。**工作量**：S。**落地**：W0-5 加指纹，W1-13 重新生成。

- `output/frontier_3d.html` 生成于 9/23，早于 8c6e827（9/29 恢复轴刻度），产物中 `aa-threejs-axis-tick-label` 出现 0 次（V 复核）。
- 【交叉验证修正】不能只拿现有的 `output/frontier_3d_visualization_dataset.json` 重渲染。那份 JSON 本身带着 P0-4 的 bdata 损坏，重渲染后实心面仍然是空的，现有断言也拦不住。正确的顺序是：W1-10 修 bdata → 重新生成契约 → 渲染 HTML（W1-13）。
- **长期修法**：
  - HTML 写入 `<meta>`：`renderer_bundle_sha256`、`generator_git_commit`、`rendered_at_utc`，并在「当前视图」中显示一行；
  - CLI 发现已有产物的 bundle 哈希与当前不一致时，给出醒目提示；
  - E1 的转义修复（见 P1-E1）一并落地。

### P0-10 合规：页面没有 AA 署名和数据来源

**来源**：UX-07。**工作量**：S。**落地**：W0-4。

- AA 文档原文：「Attribution is required for all use of our free API」。当前页面没有可见标题，没有任何 `<a>` 链接，HTML 中「Artificial Analysis」字样出现 0 次（V 复核）。
- **修法**：加一行紧凑 header。
  - 标题「AI 模型三维 Pareto 前沿」。侧栏已有「Frontier 3D」标签，header 不再重复它【交叉验证修正】。
  - 「数据：Artificial Analysis（链接 https://artificialanalysis.ai/）」、数据日期、智能指数版本（v4.3.x）、可见模型数与 Pareto 数。等 W1-8 落地真实抓取时间后，日期才能写成「数据抓取于」【交叉验证修正】。
  - 「如何阅读 ⓘ」抽屉：先放三轴的方向约定和口径说明，复用契约里现成但没有渲染的 `current_view.cost_metric_note` 和 `speed_metric_note`。
  - 这同时解决了 5fc95-(1)。
- 【完整性评审补充】：
  - z 轴标题写死为「智能指数 (AA Intelligence Index)」（`visualize.py:735`），不带版本号。header 和轴标题都应显示 v4.3.x。
  - HTML 没有附带 Lobe Icons 的 MIT 许可声明和商标声明；three.js 的许可只保留在 bundle 末尾的注释里。这两项放进 W3（H1）。
  - `THIRD_PARTY_ASSET_SOURCES.md` 称资产「由 TextureLoader 加载」，实际代码是 `new Image()` 加 CanvasTexture（`entrypoint.js:632-667`），需要更正（W3）。

### P0-11 安全：AA API key 明文扩散，且从未轮换

**来源**：HIST-23（核验后定为 medium，仍列在 P0，放在 Wave 0 处理）。**工作量**：S。**落地**：需要用户本人处理，不建卡。

- AA API key 明文出现在若干会话日志与 RVF 产物中，**需要轮换**。计数为：9 个 Claude 会话、12 个 codex 会话、20 个 RVF 产物，其中包括发给外部 reviewer 的上下文；审计过程本身又有 2 个中间文件带入了它。
- 这些计数没有经过交叉验证或独立复核：为了不接触 key 本身，所有投票者和独立复核都刻意跳过了这一项。
- **修法**：
  1. 用户本人在 AA 平台轮换 key；新 key 只放在不入库的 shell 环境文件或 `.env`（已被 gitignore）中。
  2. 【交叉验证修正】泄漏主要来自 agent 的工具输入输出（读取环境或配置、命令回显），以及 RVF 向外部 reviewer 打包上下文。UserPromptSubmit hook 只能覆盖用户自己输入的 prompt，只作补充。应当：
     - 加 PreToolUse 守卫，拦截打印环境变量或密钥文件的命令；
     - RVF 打包 reviewer 上下文时统一脱敏，脱敏规则不要假设固定的字符格式；
     - 评估是否清洗已有的 RVF 产物。
     - 脱敏 hook 属于 my-ai-setup 仓库，另行处理。
  3. 以后的审计只统计命中数，不回显匹配内容。

### P0-12 合规：网页抓取违反 AA 网站使用条款【完整性评审补充】

**来源**：完整性评审 A 节。**落地**：D-12。W1-3 先暂停抓取；最小化抓取另开第 0 张卡。

- **条款**：AA《Website Terms of Use》v1.0（2024-04-28）：
  - 第 3.3(b)(vi) 条明文禁止用脚本抓取或挖掘站点数据："use software or automated agents or scripts … to generate automated searches, requests, or queries to (or to strip, scrape, or mine data from) the Site"。只有搜索引擎可以建索引，而且 "but not caches or archives of such materials"。
  - 第 2.1 条只授予个人、非商业许可。
  - robots.txt 为 `Allow: /`，但这不改变条款的约束。
- **管线现状**：
  - `src/fetch_data.py:42` 定义了伪装成 Chrome 的 UA，`:114` 用它抓取页面；
  - 抓取对象是 `/models` 列表页（`:39`）和逐个详情页（`:222-262`）；该循环没有限速，`--refresh` 时会全量重抓；
  - 详情页缓存目前有 122 页，共 402MB。
- **为什么绕不开**：按模型拆分的成本和 token 数只存在于网页上。Free API 没有 token 计数字段（已核实）。
- **原报告的问题**：P0-10 只处理了署名；O2 却建议以「详情页内嵌目录」为主数据源，并把整页做成 gzip 存档。P0-1 第 4 步、P0-3、P0-8 也都依赖抓取。这些条目现在都标注「受 D-12 约束」。
- **用户决策（D-12）**：
  - 长期走「最小化抓取」，方案设计另开独立 Kanban 任务（第 0 张卡）；
  - 本任务先暂停抓取：刷新默认只拉 API，页面抓取改为显式开关 `--allow-artificial-analysis-website-page-fetch`（默认关闭），已有缓存只做离线解析；
  - **本任务不新增任何抓取逻辑**。

### P0-13 缺维模型静默消失，当前智能分最高的模型不在图上【完整性评审补充】

**来源**：完整性评审 A 节、历史卡 706fd。**落地**：W1-8 的契约导出与 CLI 告警；页面内搜索显示「未上图原因」放在 W3（C5）。

- **数据**：
  - `Claude Opus 5.5 (Adaptive Reasoning, Max Effort, Default Fallback)` 的智能分为 57.6，但缺速度，4 个口径都没有显示它；图上的最高分只有 56.0（V 复核）。
  - 706fd 里用户点名的 `KAT Coder Pro V2` 至今在 4 个口径中都缺失（成本和速度均为 NaN）。
  - 默认口径下，有智能分但缺维的模型共 349 个，其中近 18 个月内的有 222 个。
- **代码**：
  - `src/frontier.py:110-114` 算出的 `drop_reason` 在全仓库没有任何读取方；
  - `src/visualize.py:168` 只导出 kept 集；
  - `entrypoint.js:1473-1481` 的搜索范围仅限已显示的 `base_groups`。
- **修法**：
  - 契约导出 `excluded_models_with_drop_reason`，逐条写明缺哪一维、剪枝原因；
  - CLI 对「智能前 20 名中未上图」的模型打印告警，并单列 V-3 这一类（9/23 后上架、因暂停抓取缺当期 token 的新模型）；
  - W3：搜索命中未上图的模型时，显示「未上图：缺速度（AA 尚未测）」这类原因；侧栏或墙面投影展示「高智能但缺维」的模型。

---

## 3. P1 改进

「工作量」列同时注明落地的卡：W2/W3/W4 指对应的 Kanban 卡，W1-x 指本任务的条目。

### P1-A 交互状态机

| # | 问题与修法 | 来源 | 工作量 · 落地 |
|---|---|---|---|
| A1 | 拖拽旋转时仍逐帧做 hover 拾取（60 步中切换 17 次、涉及 11 个模型，每次都重建谱系几何）；滚轮缩放后 tooltip 停在已移开的模型上。修法：监听 OrbitControls 的 `start`/`end`，交互期间清空 hover 并跳过拾取，`end` 时用最后的指针位置补拾取一次；非拖拽引起的 `change`（滚轮）用最后的指针位置重新拾取 | RA-03, LB-03, LB-04 | S · W2 |
| A2 | 切换口径会清空 pin（`entrypoint.js:1276`，从 Plotly 版 a38a9b8:1188 延续下来）。修法：与新口径的 `base_groups` 取交集后保留；不在新口径中的灰显并注明原因，切回时恢复 | HIST-18, RA-07, UX-02, LB-05 | S · W2 |
| A3 | 厂商筛选没有贯穿到各处：隐藏厂商后，它的谱系线、档位线、前身点仍在绘制且可 hover（只在被 pin 的模型所属厂商被隐藏时出现）；排行、搜索、Pareto 计数不受影响；黑名单语义导致切换口径后新出现的厂商自动可见。修法：redraw 时跳过隐藏厂商，并在筛选变化时触发 redraw；**隐藏正在 hover 的厂商时同时清除 hover 状态和 tooltip**【交叉验证修正】；pin 卡和排行灰显注明，并区分全局计数与可见计数；排行保持在全集上计算（**见 D-9**）。【交叉验证修正】黑名单语义先接受为现状；如果要提供「只看所选厂商」，再按口径保存可见厂商白名单，不要只加一个 `filterMode` 字段 | RA-16, LB-06, UX-25, LB-18, RA 核验者 missed #4 | S · W2 |
| A4 | 被剪枝的谱系前身几乎无法 hover 到（实测 14 次只成功 1 次；核验者确认了机理，但没有复跑成功率）：指针一离开模型，hover 触发的前身 sprite 就被销毁。修法【交叉验证修正】：先加 300–500ms 宽限期，与 A1 的拖拽期停拾取统一设计，不单独加定时器；提示「pin 后可稳定查看前身」；tooltip 或侧栏提供可点击的谱系时间线 | LB-07 | M · W2（计划未显式排卡，建议随 A1 一并处理） |
| A5 | 【完整性评审补充】谱系线每代只取智能最高的档位（`visualize.py:248-262`；`entrypoint.js:855-862` 只连接谱系节点；`:926` 把被剪枝的节点一律标为「谱系前身」）。实测 hover 的点不在灰线上的比例：effective__effective 62/126（其中 18 个也没有紫线连接）、effective__raw 45、blended__effective 60、blended__raw 12。例如 hover `Gemini 3.5 Flash (minimal)` 时，灰线经过的是同代的 `Gemini 3.5 Flash (medium)`，后者却被标成「前身」。修法：谱系按 (lineage_key, reasoning_level) 分线；没有同档位时，用虚线把 hover 点连到本代代表点；tooltip 区分「同代其他档位」和「前代」。与 P0-5 根治、F-12 联动 | 完整性评审 C 节 | M · W2 |

### P1-B 视觉编码

| # | 问题与修法 | 来源 | 工作量 · 落地 |
|---|---|---|---|
| B1 | `linewidth` 在 WebGL 下恒为 1px，关系线还被 logo 背板的深度挡住。修法：改用 `LineSegments2 + LineMaterial`（谱系 3px、档位 3.5px），高亮层设 `depthTest:false`，hover 时把线框 opacity 降到 0.25；hover 和 pin 的目标放进最后绘制的前景组，修复「黄环套在 Google logo 上」的错认。【交叉验证修正】`LineSegments2`、`LineMaterial` 在 `three/examples/jsm/lines` 下，目前没有打进 bundle，需要重新打包 | RA-06, UX-03, LB-08, UX 核验者 missed #2 | M · W2 |
| B2 | Pareto 身份与突出度共用同一个环：最小的环被背板完全盖住；在超体积或垂距口径下，32 个里有 20 个几乎看不见；突出度为 NaN 时环取 0.45，反而比很多有值的环大。修法：固定大小、始终可见的 Pareto 环（外径 ≥ 背板的 1.25 倍），加一层按秩或分位数映射的突出度光晕，NaN 用虚线环 | UX-04, UX 核验者 missed #3, METH-08 | S · W2 |
| B3 | 没有视觉编码图例（Pareto 环、pin 环、紫线、灰线、灰点、线框、绿色阶梯都没说明）。修法：绘图区左下角加一个动态图例浮卡，把国别图例也并进来 | UX-08, LB-13 | S · W3 |
| B4 | 可达曲面只有水平平台。修法：补竖直立面和平台边线，**立面只向更宽松的预算方向延伸，不可达区域保持空白**【交叉验证修正】；合并同高的格子（约 1000 块降到 O(n)）；按 z 做明度渐变。**必须在 P0-4 之后做**。同时删除死代码 `frontier.py:119-148`。完成后顺带检查 blended__effective 中那个 270° 凹角对应的平台是否有冗余回退边 | HIST-09, METH-04, UX-16, LB-09（核验后定为 ux） | M · W2-demo 先做，W4 定型 |
| B5 | 用户要求的「icon 缩小一半」丢失了。修法：把 7 个尺寸魔数收敛进 `MODEL_MARKER_SPRITE_SCALE_CONFIGURATION`，工具栏加「标记尺寸」滑杆（0.5–1.5×，存 localStorage，读写包 try/catch），滑杆分别覆盖背板、logo、各类环。**默认值按 D-7**：先给用户看 0.5× 与 1.0× 两档对比再定。直接复用既有计划《overhaul-axis-visualization-stateful-cascade》的任务 A（含其中的突出度环）【交叉验证修正】 | HIST-06 | S · W3 |
| B6 | 字号（5fc95-6）：引入 `--frontier-3d-ui-base-font-size`，正文 15–16px，轴标题 14px（保留现有的 650 字重），刻度 13px。【交叉验证修正】先用 rem 和统一字号变量放大，并验证窄屏；A−/A+ 按钮视阅读收益再决定；国别图例与国别标记要么同时默认显示，要么同时关闭 | HIST-07, UX-27 | S · W3 |
| B7 | 密集遮挡：默认视角下 63/136 个模型在自身投影中心不是最前的目标（这是上界）。性价比最高的三步：`zoomToCursor=true`（与 F-2 合并，不重复实现）；logo 改为屏幕恒定尺寸（`sizeAttenuation=false`，设像素上下限）；国别外框不参与拾取（它会让命中面积增大约 72%）。多目标列表和 Top-N 常驻标签可以之后再做。【完整性评审补充】固定轴范围的设计理由已经失效：`visualize.py:288-323` 把全部历史谱系节点并入轴范围（原本是为了避开 Plotly autorange 的抖动），实测 kept 点在各口径只占立方体体积的 55%–78%。改为只按显示的点计算，超出范围的前身夹紧到箱壁，并用箭头提示 | LB-12（修正）, LB 核验者 missed #2/#3, UX-26, 完整性评审 C 节 | S→M · W3 |
| B8 | fallback 字母标是 256×128，在 22px 下看起来像空框；宽幅 wordmark 在小尺寸下成了一条细线。修法：fallback 改为 1:1 方形，并为 wordmark 类厂商补 icon mark。【交叉验证修正】`registry.py:290-298` 中两类 fallback（`generated_wordmark_fallback`、`generated_monogram_fallback`）调用的是同一个生成器，产出的视觉完全相同，名实不符，要拆分成两个生成器 | LB-20 | M · W3 |

### P1-C 信息架构与可读性

| # | 问题与修法 | 来源 | 工作量 · 落地 |
|---|---|---|---|
| C1 | tooltip 只剩 7 行，比 Plotly 版少很多：缺原始速度、冗长度、有效成本、混合价、突出度值与名次；成本单位写死为 `$`（`:918`、`:930`），所以「$0.57」实为 USD/M tokens，且小数只保留 2 位。修法：分三段显示（身份；带单位、并用灰字附另一口径的三轴数值；前沿层级与突出度名次）；panel 契约里加上 `output_mtokens`。【交叉验证修正】成本单位直接读取契约中现有但前端零引用的 `cost_axis_unit`；tooltip 定位不要再用写死的 300/180px，改用实际尺寸，否则扩充内容后会溢出 | HIST-03, RA-08, UX-11, LB-13, LB-21 | S · W3 |
| C2 | 口径说明：契约里的 `cost_metric_note`、`speed_metric_note` 要渲染出来（header 抽屉已在 W0-4 先行）；每个下拉框旁加 ⓘ；解释文本统一放进契约的 `metric_explanations` 字段。【交叉验证修正】给 blended×raw 口径加「正交分解视角」的预设与说明，以替代被否决的 F-15 | UX-10, LB-13 | S · W3 |
| C3 | pin 卡片：按档位排序。【交叉验证修正】原报告写的「一行修复」如果直接替换，会让单档位模型的 pin 卡变空（reasoning 分组只覆盖 8/54 个基模型），必须带回退：`(reasoningVariantGroupsByBaseModelName[b] ?? baseGroupsByBaseModelName[b] ?? [])`。另外：改成表格形式，列可配置并存 localStorage（恢复 Plotly 时代的「固定卡片字段」）；加「清空全部」；面板限高 40vh 并保留滚动；画布上为 pin 的模型加 CSS2D 名称标签。与 F-10 对比模式合并设计 | HIST-03, UX-15, LB-23, RA 核验者 missed #1 | M · W3 |
| C4 | 突出度控件：把口径下拉移到侧栏的「突出度」卡片内；恢复权重说明和「重置权重」按钮；修复权重输入框的 bug（清空时立即变成 0.25，越界值钳位后框内不回写）；排行行可点击联动；超体积显示为占**完整前沿超体积**的百分比（`calculator.js:88-90` 已经算出 `completeFrontierHypervolume`，但没有返回）；删除看似可点、实际不可点的「厂商 Logo」胶囊 | UX-13, UX-14, LB-16, LB-17 | S · W3 |
| C5 | 搜索：同时索引完整模型名、基模型名、厂商和档位，做空白与大小写归一；修复结果行的按钮样式（不撑满、Pin 被裁）；支持 ↑↓/Enter/Esc；结果超过 40 条时提示总数。【交叉验证修正】结果行里的 Pin 现在是 span 冒充的按钮，要改成真正的 `<button>`；归一化改用 `toLowerCase`，不用 `toLocaleLowerCase`（避免 locale 陷阱）。【完整性评审补充】能命中未上图的模型并显示原因（依赖 P0-13 在 W1-8 导出的 `excluded_models_with_drop_reason`） | HIST-22, UX-12, RA-15 | S · W3 |
| C6 | 术语中文化（pin 改「固定」、「Pareto 层」改「前沿层级（1 为最优）」，删除「渲染器 three.js」一行）；轴标题加「越便宜越好」这类方向提示。注：默认相机已经从理想角看过去，UX-09 所说的「右上被误读」不成立，因此定为 low。【交叉验证修正】中文化范围扩到 aria-label 和轴标题 | UX-28, UX-09（修正） | S · W3 |

### P1-D 窄屏与触屏

| # | 问题与修法 | 来源 | 工作量 · 落地 |
|---|---|---|---|
| D1 | 分段按钮固定 `height:30px`，文字被裁；宽度 ≤900px 时「收起」侧栏反而变高（`flex-grow:27` 没被覆盖）；箭头方向不对；折叠按钮没有 aria-label。修法：用 `min-height` 加 `nowrap`，折叠状态设 `flex:0 0 44px`，改用 chevron 图标并补 aria 属性 | RA-09, UX-17, LB-11 | S · W3 |
| D2 | 触屏轻点不会产生 pointermove，tooltip 从不出现，点一下就直接 pin。修法：按 `pointerType==='touch'` 分支处理，第一次轻点显示详情卡，卡内放「固定」按钮 | RA-10（已复现）, UX-18, LB-10 | M · W3 |
| D3 | 宽度 ≤600px 时把工具栏收进「视图设置」抽屉（390px 下工具栏占了 20% 高度） | UX-18 | M · W3 |

### P1-E 稳健性

| # | 问题与修法 | 来源 | 工作量 · 落地 |
|---|---|---|---|
| E1 | `_json_for_script_tag` 生成的 `<\!--` 是非法 JSON 转义（V 复核：`JSON.parse("<\!--")` 报错；当前数据中出现 0 次，属于潜伏缺陷）；模板按顺序替换，数据中出现占位符字面量时存在注入可能。修法：改为 `<`/`>`/`&` 转义，并用一次 `re.sub` 替换所有占位符 | RA-04 | S · W0-5 |
| E2 | creator 为空串时报 `KeyError('')`，只在 kept 模型上触发。修法：统一使用 `normalize_creator_name_for_frontier_3d()` | RA-19 | S · W2 |
| E3 | WebGL 上下文恢复后画面保持空白（three.js r185 内部已处理丢失与重建，应用只缺在恢复时 `requestRender`）；WebGL 不可用时没有降级提示；DPR 变化后不更新；没有 `window error`/`unhandledrejection` 诊断条 | RA-17（修正）, HIST-19 | S · W2 |
| E4 | 厂商注册表按显示名做键：IFM 改名后已失效（注册表键为「MBZUAI Institute of Foundation Models」，数据中为「Institute of Foundation Models」），6 个厂商未注册（AI9Stars、Apodex、Celeris、Institute of Foundation Models、SK Telecom、Sapiens AI），而且没有任何告警。修法：以 creator UUID 为主键，名字作别名；构建时打印未注册且正在显示的厂商；补登上述厂商。【交叉验证修正】注册表确实是 54 家，README 的「54 家」计数没有错，真正过时的是 README:202「未来未注册 creator 才使用兜底」的措辞（当前已有未注册厂商在图上），而且兜底实际生成的是字母徽标，不是 wordmark。补登时同步更新验证脚本中硬编码的计数 | HIST-16, DATA-10（均降为 low） | S · W4（短期先补别名和构建告警） |
| E5 | 「数据日期」其实是构建日期（`cli.py:154`）；剪枝的 today 取当前时钟（`frontier.py:94`）；API 缓存没有记录 `fetched_at` 和指数版本。修法（W1-8）：缓存写入 `{source_url, tier, intelligence_index_version, fetched_at_utc, data}`；旧缓存没有抓取时间时标为 unknown 并告警，不得用迁移时刻冒充；剪枝和显示的日期都取抓取时间；CLI 增加 `--pruning-reference-date`；数据超过 14 天显示陈旧提示。注：随日期漂移的是 kept 集合（136→123），Pareto 集合没变 | DATA-11, TI-06（修正）, METH-14 | S · W1-8 |
| E6 | HTTP 请求没有 Session、Retry 和 429 处理；当前环境是 Python 3.9 + LibreSSL（urllib3 报 NotOpenSSLWarning；SSLEOF 需联网才能复现，核验时没有触发）。【交叉验证修正】修法：共用 `requests.Session`，挂 urllib3 Retry（只重试连接错误、429 和选定的 5xx，有上限退避，尊重 Retry-After，不重试普通 4xx）；缓存 Pro 403 的判定，但要有期限、可显式重探，凭据变更时失效；**不引入 curl 回退**，用 T0 的环境迁移解决 LibreSSL 问题，只有迁移后仍能复现兼容问题时才考虑 curl。a0e79 的 curl 思路移交第 0 张卡评估 | DATA-07, TI-13 | M · W4 |
| E7 | `export_static` 失败被吞掉，退出码仍为 0（`visualize.py:757-764`）；`cli.py:165` 即使没传 `--export` 也会构造 Plotly Figure。【完整性评审补充】`--speed-scale linear` 实测能构建，但速度轴的 fixed_range 含负值（如 `[-236.5, 5048.3]`，原因是 `visualize.py:315-318` 的留白没有下限）；`--frontier-3d-visualization-dataset-in` 会静默忽略 `--since-months`、`--layers`、`--speed-scale` 等参数（`cli.py:130-138`），应给出提示 | TI-13, HIST 核验者 missed #6, 完整性评审 F 节 | S · 导出失败码在 W1-10；其余在 W2 |

### P1-F 方法学修订

| # | 问题与修法 | 来源 | 工作量 · 落地 |
|---|---|---|---|
| F1 | 突出度四指标修订（具体取舍见 D-4）。①到前沿垂距是无符号的，Delaunay 面以下有 9–17 个点仍得正分，建议换成「到他者支配域的 L2 距离」。多数核验者测得它与超体积排他贡献的 Spearman 为 0.80–0.91，但 Kimi 复算为 −0.158，分歧未决，拍板前必须看 golden diff。②趋势残差对高杠杆端点有压缩，σ 用了 ddof=0。**不建议直接改成 PRESS**，因为 h≈0.75 时它主要反映外推误差；应改用单调或稳健趋势，对 h>0.5 的点加「高杠杆」标记，σ 改用 √(RSS/(n−p))；n<3p 时给 NaN，不要静默换拟合集。③智能抬升：端点模型为 NaN，被排到最后；有 8/26 个的对比对象是自家兄弟档位（按 AA release 分组为 11/26；依赖 P0-5 的分组修复）。④加权超体积对 pad 敏感（默认 0.05，改到 0.2 时前三名中换掉 1 名），参考点应固定在有语义的位置。【交叉验证修正】除 golden diff 外，还要加合成支配、边界、秩不足和参考点敏感性检验 | METH-05, 06（修正）, 07, 08（修正） | M · W4 |
| F2 | 有效速度的轴名「tok/s」有误导性：它实际约等于 1/生成时长，不含 TTFT 和工具耗时。修法（W1-9）：轴名改为「有效速度（按冗长度归一的生成速度，不含 TTFT 与工具耗时）」；归一常数改为按指数版本分别设定的固定值 `reference_output_million_tokens_for_effective_speed_normalization` 并写入契约（目前 `fetch_data.py:411` 取全样本中位数，每次刷新都会漂移；跨版本不做速度比较），加 `EXPERIMENT_NODE:` 注释。README 写明 5a9d1 的结论，要求见 V-4：只报 Spearman(time per task, 每任务输出 token ÷ 中位速度) = 0.952（n=150）；比值依赖任务数假设，只能连同假设一起写；`intelligenceIndexTimePerTask` 的单位是秒 | HIST-10, METH-09, DATA-14, DATA-19 | S · W1-9、W1-12 |
| F3 | 剪枝顺序是先分层后硬截断，可能造成前沿空洞（当前数据影响为 0）；`frontier.py:104` 的注释与代码不一致；无日期的行被错误标注 `drop_reason`。【交叉验证修正】无日期的 Pareto 点可以凭身份一直保留，需要明确剪枝口径 | METH-14 | S · W4 |
| F4 | 死字段 `math_index`（100% 为 NaN）；未使用的 `agentic_index`、E2E 响应时间；「API 返回 0 成本时回退旧值」是有意设计，但在版本背景下需要重新评估。【交叉验证修正】`ttft_s`、`coding_index` 同样没有消费方。【完整性评审补充】契约中每个模型都带 `trend_residual_standard_deviation_units`，前端从没用过；`entrypoint.js:50` 的 `preserveDrawingBuffer:true` 没有消费方，在移动端却有性能代价，改为只在 F-9 导出 PNG 时开启 | DATA-18（修正）, 完整性评审 F 节 | S · W4 |

### P1-G 性能与体积

| # | 问题与修法 | 来源 | 工作量 · 落地 |
|---|---|---|---|
| G1 | HTML 瘦身：Plotly 静态导出约 0.8–0.9MB，35 家未显示厂商的 logo 0.39MB，默认分隔符的空格 0.2MB，`window.THREE` 阻止 tree-shake 0.2MB。修法：内联一份瘦身副本（必须**在校验之后**做，因为校验要求这些键存在；JSON 文件保持完整，保证 `--export` 路径可用）；logo 只保留四口径并集中出现的 24 家；紧凑分隔符；测试钩子按需挂载；给内嵌契约定义允许字段并单独校验。预期从 3.4MB 降到约 1.8–2.2MB，并加体积上限断言。【交叉验证修正】磁盘上的 JSON 用 indent=2，多占约 2.5MB（4.89MB → 紧凑后约 2.4MB），一并改为紧凑格式 | HIST-14, DATA-12, RA-05, LB-19, TI-11, TI-12 | M · W4 |
| G2 | 轴标注的读写交替（layout thrash）：标签尺寸改为缓存；「动态选外侧棱」（旋转后是否遮挡**未证实**） | HIST-15（降为 low） | M · 未排卡 |

### P1-H 文档

| # | 内容 | 来源 | 工作量 · 落地 |
|---|---|---|---|
| H1 | 按当前实现重写 README「交互」一节。需修正的过期描述：`:102/:195` 写「右上」、`:193-194` 的 hover 字段、`:207-210` 的四个样式按钮和 ± 按钮、`:244` 的「图上标题」、`:202` 的「未来」兜底。补写点击即 pin、灰色前身点、紫线等。补「数据源、版本、回退策略」表（W1-12 先行），写明详情页补齐和指数版本变化。新增「开发与验证」章节。吸收 a0e79 的补记。删除 12 个死 CSS 类之前，先决定哪些随 P1-C3 复活。【完整性评审补充】写入 3c8b8 的 provider 端点与权限结论（免费 API 不提供 provider 粒度；`/language/providers*` 端点仅 Commercial 可用，Pro 也返回 403）；补 Lobe Icons MIT 许可与商标声明；更正 `THIRD_PARTY_ASSET_SOURCES.md` 中「由 TextureLoader 加载」的说法 | HIST-12, UX-29, LB-22, DATA-17, TI-20（修正）, RA-18, UX-30 | S · W3 |
| H2 | 新建 `docs/frontier-3d-renderer-capability-parity-checklist.md`，列出 Plotly 时代的能力与 three.js 实现的对照、状态和对应断言；今后涉及渲染层的大改，提交正文必须附「能力对等差异」。【交叉验证修正】放到 W2 卡开头 | HIST-02（修正） | M · W2 开头，W3 收尾 |

---

## 4. Overhaul 与架构级提案

### O1 契约直接由纯几何生成（schema v3），Plotly 降为可选适配器

**来源**：RA-13、TI-18、HIST-14。**工作量**：L。**落地**：W4。

- **动机**：P0-4 的 bdata 损坏，正是「从 Plotly JSON 按 trace 下标反解几何」这层耦合造成的。three.js 路径因此仍强依赖 Plotly；约 0.9MB 是死数据；5 个占位 trace 是死代码；前端还要把相机 eye 乘上魔数 ×2.2。
- **方案**：
  - 新建 `src/frontier_3d_scene_geometry_builder.py`，输出纯 Python 结构：`pareto_frontier_wireframe_line_segments`、`pareto_frontier_surface_triangle_mesh`、`achievable_frontier_rectilinear_step_triangle_mesh`（含立面）、`three_dimensional_axis_configuration`（写明单位，例如对数轴是 log10 指数）、`initial_camera_configuration`（直接用 three.js 世界坐标）；
  - dataset builder 只做组装；`build_plotly_static_export_figure_from_scene_contract()` 只在 `--export` 时现算；
  - 删除占位 trace 和下标字段；前端校验 `schema_version` 前缀，不匹配时显示错误遮罩。
- **风险**：静态导出的外观可能变化；v2 契约的消费者需要迁移。
- **分阶段**：
  1. P0-4 的最小修复（W1-10 已做）；
  2. 先把现有几何原样提取成纯函数，与修正后的 v2 做等价对拍；
  3. 等价之后再加立面（O4 的语义变化与等价提取分开提交）；
  4. 切换到 v3，删除 Plotly 中转；
  5. 由 D-6 决定是否移除 kaleido。

### O2 数据源改为「详情页内嵌目录」，值级别可溯源（受 D-12 约束）

**来源**：DATA-03（修正）、METH-01、HIST-05、DATA-08、DATA-09、TI-21。**工作量**：L。

- **动机**：
  - 每个详情页都内嵌了约 150 个模型的 canonical token 数和 `intelligenceIndexTimePerTask`，以及 673 个模型的 `isReasoning`、`isEstimated`、`effort`、`release` 和原生混合价；
  - 目录中的成本与 API 一致，但**不增加任何当期成本**（V-2）；
  - 现在却要抓 122 页、402MB，只为取一个整数。
- **【完整性评审补充 / D-12】合规约束**：AA 条款禁止脚本抓取，也禁止缓存和存档。原方案中的「抓 2–3 页取并集」「整页 HTML 改为可选的 gzip 存档」**作废**。拆成两部分：
  - **本任务（W1-3）**：只写离线解析器，读已有缓存，**不新增任何抓取逻辑**。
    - `parse_artificial_analysis_embedded_model_catalog_records_from_model_detail_page_html()`：按 UUID 用 `json.JSONDecoder.raw_decode` 抽取每个内嵌模型对象。
    - `load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages()`，具体规则：
      - 对每个缓存页先做结构校验。残缺页（例如 `gpt-5-6-sol-low.html`，恰好 2,048,000 字节，没有结束标签；V 复核：残缺页仅此一页）标为无效并告警，不得从残片中取数。
      - 读出页面里的「Intelligence Index vX」版本字符串，按版本分区；文件 mtime 只作为抓取时间。
      - 只采用与当期 API 版本一致、且内嵌智能分与 API 一致率 ≥99% 的单一分区。目前是 9/23 的 v4.3.2 分区，共 54 页，一致率 100%。
        【2026-10-01 决策修订（R1-01 (a)）】接受条件改为「版本 family 与当期一致 + 结构有效 + 与 API 的 UUID 交集带 token 记录 ≥ 50」；
        分区级一致率只作诊断量（<99% 告警），被接受分区内逐 UUID 判定当期（该模型目录智能分与 API 差 ≤ 0.05 才算当期）。
      - 禁止跨批次、跨版本取并集；同一 UUID 在批次内冲突时显式报错。
      - 设最小记录数护栏；每条记录带 `catalog_captured_at_utc`；`effort`、`release` 等字段缺失时告警，不静默置空。
  - **第 0 张卡（最小化抓取）**：决定抓哪几页、多久抓一次、UA、限速、只存抽取出的数值 JSON（不存整页）、402MB 旧缓存如何处置、被封禁时降级为只用 API。
- **风险**：
  - AA 的页面结构可能再变，必须配 fixture 测试，并在解析 0 条时报错（吸取 P0-2 的教训）。
  - 【交叉验证修正】O2 会成为 token、time per task、档位元数据的单点依赖，而且这些字段只有它有；结构漂移已有实证（camelCase 改名、三个版本的缓存）。所以降级路径（只用 API，并在新鲜度摘要中醒目提示）必须先于依赖它的功能落地。
- **分阶段**：
  1. 随 P0-1 第一期落地离线解析器和来源列（W1-3、W1-5）；
  2. 迁移冗长度报告（P0-8，W1-10）和谱系元数据（P0-5 根治，W4）；
  3. 由第 0 张卡恢复受控刷新，并处置大体积缓存。

### O3 前端渐进式模块化与单一状态源（按 D-8）

**来源**：RA-12（范围按核验修正缩小）、TI-19。**工作量**：M（不做一次性的 L 级大拆分）。**落地**：① 在 W2 开头，其余在 W4。

- **动机**：A3 这类「某个 setter 忘了联动」的遗漏，是分散状态直接导致的；纯函数目前只能通过浏览器间接测试。核验者纠正：历史上的回归主要来自 Plotly gl3d，不能拿来论证大重构。
- **方案**：
  1. 抽出 `frontier_3d_threejs_axis_tick_value_generator.js`、`frontier_3d_threejs_base_model_search_matcher.js` 和标注布局求解，用 `node --test` 做单元测试（W2 开头）；
  2. 引入一个轻量的 `frontier_3d_view_state_store.js`（`dispatch`/`subscribe`），承载 hover、pin、筛选、口径和前沿样式，面板与关系线由状态派生（有证据时再上）；
  3. 测试 API 改为显式的 `window.frontier3dInteractiveReportPublicApi`，其余钩子只在 `?frontier3dTestDiagnostics=1` 时挂载；
  4. 加 `// @ts-check`、JSDoc 和 eslint。
- **风险**：重构期间容易出现回归。前置条件是 T2 的「可见结果」断言先就位。

### O4 前沿几何语义重构（由 D-2 决定）

**来源**：HIST-04（修正）、METH-03、METH-04。**工作量**：M。**落地**：W2-demo 出并排 demo，W4 定型。

- 让阶梯可达面（attainment surface）成为「精确」表达：Pareto 点正是阶梯面上平台的**角点**。实测 137 个中 136 个为 90° 凸角，1 个为 270° 凹角（blended__effective 口径）【交叉验证修正】。
- Delaunay 网降级为「Pareto 点邻接网（近似，仅视觉导引）」，或者对它做单调投影。
- 把两个开关合并成一个选择器：「前沿形态：阶梯（精确）/ 平滑（近似）/ 隐藏」。
- tooltip 里说明该点为什么是前沿点：在哪条轴上胜过哪些邻居（4c7d1 的方案①）。
- 依赖：P0-4 的深度修复，以及 P1-B4 的立面。

### O5 测试金字塔与 CI（见第 7 节）

**来源**：TI-04（修正）、HIST-13、RA-14、LB-14。**工作量**：L。【交叉验证修正】CI 以本地一键入口加 git hook 为主，GitHub Actions 只跑锁定版本的单元测试和合成 fixture 层，详见 T5。

### O6 标记实例化渲染（延后实验）

**来源**：RA-20。**工作量**：L。**落地**：暂不实施，保留 `EXPERIMENT_NODE:`。

- 当前每个模型 5 个 sprite，约 308 次 draw call，单帧渲染约 0.6ms，不是瓶颈。
- 等模型数超过约 400、或做移动端优化时再实施：纹理图集加 `InstancedBufferGeometry` 的 billboard，拾取改为 CPU 端投影。
- 在源码中用 `EXPERIMENT_NODE:` 注释标记这个选择点。

---

## 5. 新功能提案（按价值与成本比排序）

| 编号 | 功能 | 价值 | 成本 | 来源 | 依赖 · 落地 |
|---|---|---|---|---|---|
| F-1 | 一键脚本 `scripts/refresh_regenerate_verify_and_open_frontier_3d_report.sh`，参数 `--refresh`、`--from-existing-dataset`、`--skip-verify`、`--host PORT`，分两条路径。离线路径：由现有数据契约重渲染 → 验证 → 打开，不需要 key。刷新路径：`cli --refresh`（D-12 暂停期间只拉 API）→ 新鲜度摘要 → 验证 → 打开。【交叉验证修正】只在刷新路径检查 key，绝不打印 key；托管默认只绑定 127.0.0.1；任一子步骤失败就以非零码退出；`--skip-verify` 在输出中标明「未验证」；以 a0e79 的 `refresh_frontier_3d.sh` 为底改写，去掉重复拉 API 和 curl 步骤；另配 `scripts/run_all_frontier_3d_verifications.sh`。这是用户**最高频的请求**，至少出现 7 次 | 很高 | S | HIST-17, DATA-15 | P0-1 第一期 · **W1-11** |
| F-2 | 重置视角按钮、双击复位、`zoomToCursor`（与 B7 合并，不重复实现）、按包围球自动取景 | 高 | S | LB-15, RA-15, UX-23 | — · W5 |
| F-3 | 区分「实测/估算」，提供「仅实测」筛选 | 高 | M | DATA-08 | P0-1；第 0 张卡恢复目录刷新 · W5 |
| F-4 | 视图状态写入 URL hash（口径、pin、隐藏厂商、突出度、权重、相机），加「复制链接」；参数设计与 a0c95 协调 | 高 | M | UX-20, RA-15 | A2 · W5 |
| F-5 | 数据刷新变更报告与历史快照：新增或消失的模型、前沿成员进出、数值跳变超过 10%、**指数版本变化醒目告警**；契约写入 `previous_data_date`，前端可以高亮「本期新入前沿」。W1-8 已把每次刷新的 API 响应另存到 `data/raw/artificial_analysis_api_language_models_response_history/` | 高（能防止 P0-1 再次潜伏） | M | DATA-16 | E5 · W5 |
| F-6 | 第三种速度口径：AA 官方 `time_per_task`（与当期版本一致，覆盖约 150 个模型；用倒数显示为「任务/小时」）。`intelligenceIndexTimePerTask` 的单位是**秒**（图表字段 `timePerTask` 是分钟）。【交叉验证修正】在非默认成本视图中覆盖率降到约 63%，需要护栏和说明。【V-3】免抓取的候选：API 原生 `median_end_to_end_response_time_seconds`（覆盖 347 个，与 time per task 的 Spearman 0.75） | 中高 | M | DATA-14, METH-09, HIST-10 | O2、第 0 张卡；是否设为默认见 D-3 · W5 |
| F-7 | 预设视角：智能×成本、智能×速度、成本×速度，轴对齐，可先不换正交相机。【交叉验证修正】含 blended×raw 的「正交分解」预设（替代被否决的 F-15） | 中高 | M | UX-23 | F-2 · W5 |
| F-8 | 「表格视图」标签页：可排序的全部模型，兼作读屏替代；加 CSV 导出 | 中高 | M | UX-19, LB 核验者 missed #5 | — · W5 |
| F-9 | 导出 PNG：2× 离屏渲染，合成轴标注、图例、header 和署名；只在导出时开启 `preserveDrawingBuffer` | 中 | M | UX-21 | P0-10, B3 · W5 |
| F-10 | 模型对比抽屉：多个 pin 并排显示，最优值高亮，给出 Δ%。**已并入 C3**（W3） | 中 | M | UX-24 | C3 · W3 |
| F-11 | 稳健前沿：在 ε 容差（智能分 ±0.5/±1、成本和速度 ±10%）下标记 `is_pareto_robust` / `is_near_frontier`，用实线与虚线光环区分。注意估算分和重定标带来的不确定性远大于这个 ε | 中 | M | METH-15 | F-3 · W5 |
| F-12 | 家族视图：同一 release 的各档位连成 effort 曲线，并提供「排除同基模型」的家族级突出度。并入 P0-5 根治与 F1③ | 中 | M | METH-13, METH-07 | P0-5 根治 · W4/W5 |
| F-13 | 键盘操作：canvas 可聚焦，方向键旋转，`/` 聚焦搜索，Esc 清除；补 aria | 中 | M | UX-19 | — · W5 |
| F-14 | 深色模式：CSS 变量，three 场景颜色随系统切换 | 低中 | M | UX-31 | — · W5 |
| F-15 | ~~正交分解视图：智能 × 每 token 单价 × 原始速度~~。**已否决并取消**【交叉验证修正】：事实断言以 3:1 被否决，这个组合已经存在，就是 blended×raw 口径，它的问题只是 P0-6 缺了 123 个模型。改为在 C2/F-7 中给 blended×raw 加「正交分解视角」预设与说明（S） | — | — | METH-10 | — |
| F-16 | 时间回放：**只做「按发布日期淡出和过滤」**，并注明「按当前价格、速度和当前评测口径计算」；不宣称这是历史前沿；回放对象是当前快照中的模型。【交叉验证修正】依赖改为 **D-10**；成本由 L 降为 M | 中 | M | UX-22（修正） | D-10 · W5 |
| F-17 | 【完整性评审补充】provider 级数据点：以 (model, provider) 为数据点，并过滤量化降级的 provider（3c8b8 的原始需求）。状态为「**阻塞于 AA Commercial 授权**」：免费 API 不提供 provider 粒度，`/language/providers*` 仅 Commercial 可用，Pro 返回 403；已有起草好的询价邮件。只登记，不实施 | 中 | — | 3c8b8 | Commercial 授权 · W5 登记 |

---

## 6. 历史需求追踪

### 6.1 演进时间线

| 时间 | 事件 | 意义 |
|---|---|---|
| 06-08 | c46a7 立项。用户原话是「one manifold weaved by most intelligent model at given cost, speed combination」，145bdc8 用 Plotly + Delaunay 实现 | 「前沿流形」的原始定义 |
| 06-09~18 | 加入有效速度轴，默认改为线框，加入搜索/pin/谱系，随后是一串 gl3d 修复 | Plotly 回归期开始 |
| 07-01 | 四口径切换、相机保持、突出度四指标（cb5bf48） | 方法学主体成形 |
| 07-02~05 | 数据契约与 HTML 拆分（ec449ba），5fc95 清单驱动交互重做（b70a8cb 引入阶梯面），改为顶部工具栏，修复 hover 闪烁（a38a9b8） | Plotly 版功能最完整的时期 |
| 07-18 | three.js 重写（9b08b48/7247b6f，两个提交都没有正文）。交互脚本断言 117→53，另在两个新契约脚本补了约 42 条，但**能力级断言丢失**（轴标题、hover 字段、pin 卡字段） | 五类 Plotly 回归一次性消除，同时开始出现「静默缺失」型回归 |
| 07-22 | 指针状态机修复（4f3e0ca）。同日用户提出「icon 缩小一半」，该需求随 aa377 会话丢失 | |
| 07-23 | 111ba45 从详情页补 output token。`fetch_page` 在此改名，导致冗长度报告失效 | |
| 8/14~9/23 | **AA 智能指数从 v4.1 重定标到 v4.3.x**：512 个共同模型中 509 个分数变化，中位比值 0.708。管线没有察觉 | 数据层开始静默腐化 |
| 09-23 | 刷新产物 | |
| 09-29 | 8c6e827 恢复轴刻度，但主 checkout 的产物**没有重新渲染** | |

### 6.2 Kanban 与会话需求

| 需求/卡 | 当前状态 | 依据 | 建议动作 |
|---|---|---|---|
| 5fc95（母卡） | 部分完成 | 以下 (1)–(7) 分项 | 【交叉验证修正】母卡**不关闭**：在卡内勾销 (2)(3)(7)，其余子项链接到 W2/W3/demo 卡，整卡保留到子项收口 |
| 5fc95-(1) 副标题过长，细节另放 | 做过头了 | three.js 页面没有任何可见标题、来源或署名；口径 note 在契约里但没有渲染（`entrypoint.js:1700-1723`） | 紧凑 header 加「如何阅读」抽屉（P0-10 / W0-4，C2 / W3） |
| 5fc95-(2) 突出度面板遮挡图例 | 已完成 | 已改为侧栏整列（`entrypoint.js:1756-1762`） | 在母卡内勾销 |
| 5fc95-(3) 可达曲面两个按钮合并 | 已完成 | 已改为单个复选框（`entrypoint.js:1409-1420`） | 在母卡内勾销 |
| 5fc95-(4) 可达曲面悬空、有斜线 | 部分完成 | 斜线已消除；4 个口径下 Pareto 点 137/137 都落在平台角点上；但没有立面，也没有铺满坐标箱 | 补立面与边线（P1-B4），需在 P0-4 之后做 |
| 5fc95-(4b)「仅散点」与「隐藏前沿」看不出差异 | **以新形式复发** | 「仅散点」按钮已删，但「实心面」与「隐藏前沿」的画面逐像素相同 | P0-4 |
| 5fc95-(5) hover 时点亮同模型各 reasoning 档位 | 部分完成 | 紫线已画，但 WebGL 线宽恒为 1px，还被背板深度遮挡；分组漏掉 18 个档位；没有光环、没有淡化无关点、没有图例 | P0-5 + P1-B1 + P1-A5 |
| 5fc95-(6) 整体放大字体 | 未完成 | 正文 14px，刻度与工具栏 12px；轴标题反而比 Plotly 版的 13px 更小 | P1-B6 |
| 5fc95-(7) 点击或 hover 即可 pin | 已完成（有缺陷） | 点击 logo 即 pin（`:1112-1122`）；没有操作提示；触屏上与查看详情冲突 | 在母卡内勾销，移动端问题并入 P1-D |
| 9e8bc pin 卡死/白屏 | 已失效 | 56af9d3/ab06398 做了针对性修复，之后 three.js 重写；多轮实测点击 pin 耗时 6ms，无 long task、无 pageerror | 【交叉验证修正】关闭依据写「Plotly restyle 路径已删除」，并附 W1-13 的真实点击与搜索 pin 测试结果；补诊断条（P1-E3） |
| b9670 非默认口径下 hover 重置相机 | 已完成 | 6848f81；three.js 下 3 种非默认组合各 hover 8 个模型，相机不变 | 关闭（Kanban trash） |
| c17ce uniform3fv TypeError | 已失效 | Plotly 代码已删；worktree 的未提交改动针对的文件已不存在 | 关闭（Kanban trash，自动存 patch） |
| bd25c 默认相机方向 | 已完成 | 662f5fa | 关闭 |
| aafa3 hover 闪烁 | 原卡已完成（a38a9b8），但在拖拽中换了形式复发 | 60 步拖拽中 tooltip 在 11 个模型间切换 17 次 | 关闭原卡；复发形式由 P1-A1（W2）承接 |
| d4e70 / b969b 厂商 logo 与国别外框 | 已完成 | 9b08b48、7247b6f、4f3e0ca；d4e70 与 b969b 重复，worktree 无改动 | 关闭；遗留的 icon 尺寸问题由 P1-B5 承接 |
| 9bfe3 生成含 DeepSeek V4 Flash 0731 的 HTML | 已完成 | 4 个口径都显示该模型（显示数分别为 136/122/146/66）；遗留「搜全名搜不到」（HIST-22） | 关闭；搜索问题并入 P1-C5 |
| 7a66f 轴刻度丢失 | 源码已修，产物未刷新 | 8c6e827；`output/frontier_3d.html` 中 `aa-threejs-axis-tick-label` 命中 0 次 | W1-13 重新生成后关闭（P0-9） |
| 5a9d1 有效速度来源调研 | 有结论，没落文档 | 【V-4】AA 的 Time per Task 与「每任务输出 token ÷ 中位速度」的 Spearman = **0.952（n=150）**，成立；两者比值依赖假设的任务数，不稳健，只能连同假设一起写。`intelligenceIndexTimePerTask` 的单位是**秒**。Time per Task 同样不含 TTFT 和工具耗时；只有 AA-Briefcase 口径计入工具时间 | W1-12 用 9/23 目录重算、写明公式、单位和样本量后写入 docs，然后关闭（Kanban trash） |
| a0e79 用最新 AA 数据重生成 | 已被 111ba45 取代 | 未提交改动与 111ba45 冲突（`fetch_data.py:37`、`README.md:205`）；解析精度更低（取页面上的「14M」） | 见 6.3 |
| aa377「icon 缩小一半」（不在看板上） | **需求丢失** | 会话 jsonl 第 11 行有 queue-operation；7 个尺寸魔数都没动 | P1-B5（W3），复用既有计划的任务 A；默认值按 D-7 |
| 4c7d1 用户质疑「前沿连线反直觉」 | **未决** | 助手核实支配关系无误，给了三个 UX 方案，用户没有回复 | D-2 并排 demo（W2-demo 附三个方案原文） |
| 706fd 缺维模型不在图上【完整性评审补充】 | **问题仍在** | 用户点名的 `KAT Coder Pro V2` 在 4 个口径中都缺失；当前智能最高的 Claude Opus 5.5 (… Max Effort …) 也不在图上 | P0-13（W1-8 告警，W3 搜索显示原因） |
| 3c8b8 (model, provider) 维度【完整性评审补充】 | 需求和结论都没进文档 | 用户原始需求见 codex 会话记录；结论：免费 API 不提供 provider 粒度，`/language/providers*` 仅 Commercial，Pro 返回 403；已起草询价邮件。docs 中仅 `endpoint-difference-analysis.md:170` 一处提及 provider | F-17（阻塞于授权）；H1 写入端点与权限结论；第 0 张卡可沿用这封邮件询问网站数据授权 |
| dc60c、1c7f8 | 与本主题无关 | — | — |

### 6.3 遗留未合入工作的处置（D-11 授权，W0-7 执行）

【交叉验证修正】多数意见是「方向同意，但要改做法」：尽量用可恢复的手段；每一项执行前先核对；结果逐项写进交付说明。

| 对象 | 处置 | 来源 |
|---|---|---|
| `output/` 下 Plotly 时代的残留：4 个 HTML、1 个 SVG，以及【完整性评审补充】`browser-visual-checks/` 下 07-02 生成的 7 张截图 | **移入归档目录 `output/archived-plotly-era-renderer-artifacts-before-threejs-rewrite/`，不直接删除**，操作可逆。否则误打开时会复现早已修好的 pin 卡死或 TypeError，造成「又复发了」的误判。`output/` 是 13 个 worktree 共享的符号链接目录，只移动这些列了名的文件 | HIST-01, 完整性评审 E 节 |
| `output/model_intelligence_verbosity_report.md`（07-02，v4.1 口径，写着「GPT-5.5 (medium) … 50.4」，容易被误引）【完整性评审补充】 | 由 W1-10 重新生成覆盖 | 完整性评审 E 节 |
| a0e79 worktree（基于 a38a9b8，fetch_data 加了约 150 行，另有 docs 改动和两个脚本） | 丢弃 `fetch_data.py` 改动和 `verify_intel_per_m_model_page_parse.py`。按 111ba45 的机制重写，保留三样：①07-17 的 docs 补记（Free API 没有 per_m、Pro 返回 403），并把其中「页面退化」改写为「payload 改为 camelCase，snake_case 正则 0 命中」【交叉验证修正】，按现行 README 结构重写，不要三路合并旧 diff；②curl 回退思路移交第 0 张卡评估；③一键刷新脚本（去掉重复拉 API 和冗余 curl，并入 F-1）。有价值的内容并入 W1 之后，用 Kanban trash 关卡（自动存 patch，可恢复） | HIST-11, DATA-15 |
| 已完成或已失效的卡：7a66f、b969b、d4e70、b9670、aafa3、bd25c、9bfe3、c17ce、9e8bc | 一律用 `kanban task trash`：会清理对应 worktree，并把未提交改动存成 patch，可恢复。**放在 W1-13 验收之后执行**，关闭依据用新产物的实测结果 | HIST-20 修正 |
| 5a9d1 | W1-12 写入文档后 trash | — |
| 孤儿 worktree 74657（不对应任何卡） | 先核对 `git log main..HEAD` 和 `git status --ignored`，确认没有独有内容后再 `git worktree remove`；一并清理 worktree 根目录下的空目录 cfc07 | HIST-20 修正 |
| 6 个 RVF attempt worktree | **逐个**核对：run 是否已 finalize、`fix.patch` 是否已落盘、补丁是否已等价落进 main（9/23 的 2 个各有 1 个 main 之外的提交，另有 4 个有未提交改动）。全部满足才移除；任何一项不满足就保留，并在交付说明中列出。**禁止批量 `--force`** | HIST-20 |
| 已合入 main 的具名分支 `feature/frontier-3d-threejs-organization-logo-country-markers` | 不在授权范围内，只列为建议 | 交叉验证补充 |
| 两次丢失的用户意图（aa377 尺寸、4c7d1 连线） | 分别由 P1-B5（W3）和 D-2 demo（W2-demo）承接 | HIST-04, HIST-06 |

---

## 7. 测试与工程化基建

**T2 的动机**：现有 5 个验证脚本在 HEAD 上**全部通过**，但对本报告里的 P0 缺陷一个都检测不出来（附录 A）。

| 阶段 | 内容 | 来源 | 工作量 · 落地 |
|---|---|---|---|
| T0 环境 | 新增 `pyproject.toml`（requires-python ≥3.11，依赖给出上下界，kaleido ≥1.0）、`uv.lock`、`.python-version`=3.12，放弃 CLT 自带的 Python 3.9 + LibreSSL（已 EOL，且会触发 SSLEOF；这一点明显更优，直接采用）；新增 `[project.optional-dependencies] test`（pytest、pytest-playwright、jsonschema、hypothesis）；README 统一用 `uv run python -m src.cli`，npm 统一用 `npm ci`；package.json 加 `"type":"module"` 和 `"engines":{"node":">=18"}`。【交叉验证修正】playwright 依赖此前完全没有声明。worktree 中的 `.venv` 是指向主 checkout 的符号链接，开发时用 `UV_PROJECT_ENVIRONMENT` 指向独立目录，不要覆盖主 checkout 的 venv | TI-13, HIST-13, DATA-07, TI-07 | M · **W1-1** |
| T1 冒烟与单元 | ①导入所有 `src` 模块；对真正的 CLI 做 `--help` 冒烟（能拦住 P0-8 这类问题）。②Pareto 剥层与暴力解的 hypothesis 性质测试，剪枝五个分支（固定参考日期）。③**解析器 fixture 测试**：裁剪后的 camelCase 列表页、多模型详情页（含「首个对象不是本模型」的负样本）、内嵌目录片段。④**来源统计断言**：页面解析条数 >0，回退占比有上限，版本一致；只有 151 条当期成本时 `_validate` 仍能通过。⑤JSON Schema（draft 2020-12）契约校验，含反例（空 scene、缺 panel、bdata 数组、索引越界）；把 `verify_metric_semantics.py:264-284` 里「空 scene 也合法」的断言改为反例，同时保留「零模型的合法场景」正例。⑥JS 与 Python 超体积对拍（fixture 容差 1e-12）。⑦`node --test` 覆盖刻度生成和搜索匹配（依赖 O3①，在 W2） | TI-01, TI-16, TI-05, DATA-13, TI-07, TI-19, TI 核验者 missed #4 | M · **W1-2**（⑦在 W2） |
| T2 浏览器「可见结果」断言 | 用 session 级 fixture **自己构建被测 HTML**，不再读共享的 `output/`。新增断言：切到实心面后三角形数增加（W1-10 先行）；可达曲面开关前后被挡 logo 的保留率；拖拽中 tooltip 变化次数为 0；滚轮缩放后 tooltip 与指针下的实际目标一致；切换口径后 pin 保留；隐藏厂商后其关系线端点数归零；390px 下按钮 `scrollHeight ≤ clientHeight`，折叠后图区变高；4 种口径参数化的 hover/pin 且相机不变；搜索点选 pin 且无 >200ms 的 long task；收集 console.error/warning；WebGL 上下文丢失后能恢复。【交叉验证修正】两处 depthWrite 断言（`browser_contract.py:61-62`、`interactions_headless.py:84-86`）在 D-5 定案前保留，W2 定案后同步改期望值；断言按修复所在的波次分批启用。【完整性评审补充】现有结论全部来自 Chromium（`frontier_3d_playwright_verification_support.py:18-27` 已支持用 `FRONTIER_3D_TEST_BROWSER` 切换浏览器）；59 个 logo 中有 20 多个 SVG 只有 viewBox、没有 width/height，需要在 WebKit/Safari 与 Firefox 上验证 | TI-03, TI-09, LB-14, RA-14, 完整性评审 D 节 | M · W2 |
| T3 合成 fixture 与 golden | 【交叉验证修正】4 方一致认为它原本没有被排进任何一波，而 T5 和 golden 验收都依赖它，因此**提前到 Wave 1**。新增 `tests/fixtures/build_frontier_3d_synthetic_fixture_models_dataframe.py`，按分支覆盖构造合成数据，不硬凑数量：覆盖带被剪枝前身的谱系、≥3 个档位、中/美/其他/未注册/None/空串厂商、对数与线性轴、当期与历史口径混合；固定剪枝参考日期，生成 golden JSON 时剔除 `generated_at` 这类易变字段；依赖真实数据的测试加 marker，只在本地显式运行 | TI-08, TI-06 | M · **W1-2** |
| T4 构建守卫 | `scripts/build_frontier_3d_threejs_interactive_renderer.mjs --check`：以 `write:false` 构建后与提交的 bundle 逐字节比较（独立复核确认 bundle 可逐字节重建，方案可行）；`.gitattributes` 把 bundle 标为 `-diff linguist-generated`；后续再加：bundle 头部 banner 写入源码哈希，构建脚本去掉正则后处理 | HIST-21, TI-14, RA-14 | S · **W0-6** |
| T5 一键入口与 CI | `scripts/run_all_frontier_3d_verifications.sh`（W1-11 先行，串起 pytest、bundle `--check` 和 3 个 Playwright 脚本）。【交叉验证修正】以本地一键入口加 git hook 为主；GitHub Actions 只跑锁定版本的单元测试和合成 fixture 层（真实数据有 400MB 以上，且需要 key）；浏览器矩阵加 WebKit 与 Firefox；「最新依赖」job 等锁文件稳定后再加 | TI-04（修正）, HIST-13 | M · W1-11 + W2 |
| T6 质量工具 | ruff（当前 0 问题；先单独提交一次 format）、mypy（当前 3 个错误）、eslint 9（当前 0 问题）、pre-commit。【交叉验证修正】先实测基线再引入 | TI-17 | S · W4 |
| T7 视觉回归（DOM 优先） | 布局类回归优先用包围盒重叠和刻度投影断言；WebGL 画布像素基线只作为本地可选项（跨 GPU 容易抖动，稳定性未验证） | TI-10（修正） | M · W4 |
| T8 杂项与隔离 | 验证脚本改用过度指定的命名并迁入 `tests/browser_playwright/`，截图写到 pytest 的 tmp 目录，去掉 7 处 `page.wait_for_timeout` 固定等待；Serena 追加 typescript 语言服务并忽略 bundle。【交叉验证修正】worktree 之间共享的不只是 `output/`，还有 `data/raw` 与 `data/processed`（回退链会从共享的 `processed/models.csv` 读取再写回），隔离时要一并处理；隔离目录按 worktree 或任务 id 命名，不按分支名（worktree 大多是 detached HEAD） | TI-15, TI-02, TI-22 | M · W2 |

---

## 8. 决策记录

范围决策：**Wave 0–1 在本任务 ca0af 实施，Wave 2–5 拆成 Kanban 卡**（用户拍板）。

### D-1 65 个「v4.3 智能分 + v4.1 旧成本/旧 token」混版点的处理

- **选项**：
  - (a) **剔除**：口径完全一致；但老模型和小厂商大量消失（65 点覆盖 19 家厂商，剔除后只剩 13 家）。剔除后默认口径 Pareto 为 **22**：这是按 W1-5/W1-6 的完整实现（当期成本 + 当期 token）算出的结果，【V-1】；只剔除成本、不修 token 时为 29。
  - (b) 保留显示，但标为「历史口径」，不参与 Pareto 判定和突出度排名。
  - (c) 保留并参与计算，只做视觉标注：前沿仍然失真。
  - (d) 维持现状：不可接受。
- **原推荐**：(b)，另加「仅实测」开关。
- **交叉验证**：事实 4:0 成立。修法 1:3，多数主张修改：
  - 判定依据改为按字段的值来源，不用 isEstimated（Kimi 举出反例，全表经 V-5 核实为 4 个）；
  - 区分 display_eligible / analysis_eligible，按口径分别计算（Claude）；
  - 不合格的点必须退出**所有**分析基准（Codex）。
- **用户拍板**：**照常显示，但不参与本口径的全部分析计算**（Pareto、几何、归一化、突出度）。判定按口径和值来源；blended×raw 不受影响。这些点标注为「历史口径」，另加「仅当期可比」开关。
- **落地**：W1-5、W1-6；W1-13 以默认口径 Pareto = 22 为验收预期值。

### D-2 默认的「前沿流形」几何

- **选项**：
  - (a) Delaunay 线框（现状）：观感平滑，但反向面比例为 36%/39%/46%/58%（判定口径见 P0-7）；最多 8.4 分的被支配点高出曲面，这只发生在 blended 口径，默认口径的问题是反向面【交叉验证修正】。
  - (b) 阶梯可达面加立面：严格对应用户原话「给定成本、速度下的最高智能」，但棱角多。
  - (c) 两者都提供，阶梯为「精确」，平滑为「近似」，另加单调插值选项。
- **原推荐**：(c)，默认用阶梯。
- **用户拍板**：**先做并排 demo 再定**，比较 Delaunay、带立面的阶梯面、单调平滑近似三种。【交叉验证】Codex 主张先做「阶梯 + 邻接插值参照」两种，单调平滑延后。demo 卡先交这两种，第三种视成本决定。
- **落地**：W2-demo 卡（附 4c7d1 的三个 UX 方案原文）；定型在 W4（O4）。

### D-3 默认速度轴

- **选项**：(a) 有效速度（改名后）；(b) AA `time_per_task`（与当期版本一致，覆盖约 150 个）；(c) 原始速度。
- **结论（默认采纳，明显占优）**：保持「有效速度」为默认，但改名并固定归一常数（W1-9）；AA `time_per_task` 作为第三口径，排在后续卡（F-6 / W5）。
- 【V-3】暂停抓取期间，新模型在有效速度口径中缺席。免抓取的候选指标 `median_end_to_end_response_time_seconds` 由第 0 张卡与 F-6 评估。

### D-4 突出度指标修订范围

- **原推荐**：
  - ① 垂距换成支配域距离；
  - ② 先做「样本内残差 + 高杠杆标记」的 S 方案，σ 改无偏；
  - ③ 智能抬升默认排除同基模型，并提供开关；
  - ④ 超体积参考点固定在有语义的位置；
  - 所有排名变化以 golden diff 交用户审。
- **交叉验证**（2:2，modify）：
  - ① 新旧指标的 Spearman 存在分歧：多数测得 0.80–0.91，Kimi 测得 −0.158。拍板前必须看排名 golden diff。
  - 换掉旧垂距后，它不再作为 UI 选项（Claude），或者保留为定义清楚的互补指标（Codex），这一点待定。
  - ③ 的同基分组以 AA `release.slug` 为准，作为显式的比较模式。
  - 除 golden diff 外，还要加合成支配、边界、秩不足和参考点敏感性检验。
- **状态**：**未拍板**。在 W4 卡（F1）中以 golden diff 形式交用户审。

### D-5 半透明曲面的遮挡语义

- **选项**：(a) 真遮挡（`depthWrite:true`，即 7247b6f 的有意改动）；(b) 着色透出（`depthWrite:false`，在 sprite 之后绘制）。
- **结论（默认采纳，明显占优）**：`depthWrite:false`，且 renderOrder >50。由于这推翻了一次有意的提交，**W2 卡在动手前向用户确认一次**。定案前，两处 depthWrite 断言保持不变。

### D-6 Plotly/kaleido 静态导出的去留

- **选项**：(a) 保留，改为从 v3 几何现算；(b) 改用页面内「导出 PNG」加 Playwright 截图，只保留一条渲染路径。
- **原推荐**：先做 (a)（O1 第④步），F-9 上线后再议 (b)。交叉验证 3:1 同意。
- **状态**：沿用推荐，W4 卡再议。

### D-7 标记尺寸默认值

- **事实**：07-22 的「缩小到一半」在 aa377 会话中得到确认；07-18 的「点更大」没有检索到原文，事实断言标为需裁决（1 票确认，3 票无法核实）。
- **交叉验证**：修法 2:2。两票主张保持 1.0×，并提供 0.5× 预览对比；两票同意默认 0.5×。
- **结论**：加滑杆；默认值由 **W3 卡先做 0.5×/1.0× 两档对比给用户看，再定**。

### D-8 前端重构范围

- **结论（默认采纳）**：(b) 渐进式——先抽纯函数（W2 开头），再视证据引入轻量 store（W4）。不做一次性拆成 7 个模块的 L 级重构。

### D-9 厂商筛选是否影响前沿和排行

- **结论（默认采纳）**：(b) 前沿保持在全集上计算；显示全局前沿，隐藏的项灰显并注明，区分全局计数与可见计数。A3（W2）按此实现。

### D-10 时间回放语义

- **结论（默认采纳）**：(b) 只做「按发布日期淡出和过滤」，注明按当前价格、速度和评测口径计算，不宣称是历史前沿。F-16 依赖此项（W5）。

### D-11 破坏性操作授权

- **用户拍板**：授权四项：
  - 处理 `output/` 下的 Plotly 残留；
  - 关闭已落地或已失效的卡；
  - 清理孤儿或失效的 worktree；
  - 丢弃 a0e79 的代码改动。
- 附带条件：若交叉验证的多数票与建议冲突，以多数票为准；把握不高时再确认。
- **按多数票调整后的做法**（W0-7，详见 6.3）：
  - output 残留改为归档，不删除；
  - 关卡一律走 Kanban trash，可恢复；
  - 5fc95 母卡不关闭；
  - RVF worktree 逐个核对，禁止批量 `--force`；
  - 孤儿 worktree 先核对独有内容再移除；
  - 已合入的具名分支只列为建议。

### D-12 抓取合规（新增，见 P0-12）

- **背景**：
  - AA《Website Terms of Use》v1.0（2024-04-28）第 3.3(b)(vi) 条明文禁止用脚本抓取或挖掘站点数据，只允许搜索引擎建索引，而且不得缓存或存档；
  - 第 2.1 条只授予个人、非商业许可；
  - robots.txt 为 `Allow: /`；
  - 按模型拆分的成本和 token 数只存在于网页上，Free API 没有 token 计数字段（已核实）。
- **完整性评审给出的选项**：(a) 只用 API，接受缺口；(b) 向 AA 申请许可或 Pro/Commercial（可沿用 3c8b8 起草的询价邮件，补一句网站数据使用授权的询问）；(c) 自担风险继续抓取，但降频、使用真实 UA、不做存档。
- **用户拍板**：
  - 长期走「**最小化抓取**」，方案设计**另开独立 Kanban 任务**（第 0 张卡），本任务不涉及；
  - **本任务先暂停抓取**：刷新默认只拉 API，页面抓取改为显式开关，已有缓存只做离线解析。
- **影响**：
  - O2 改为只读缓存的离线解析器；
  - F-3、F-6 依赖第 0 张卡恢复目录刷新；
  - 对外托管（a0c95）开工前，必须先确认 AA 数据再分发的许可范围。

---

## 9. 交叉验证与独立复核

### 9.1 方法

- **四方投票**：Claude 子 agent、Codex、Kimi Code、Cursor Grok 4.7 在隔离进程中，按同一套 rubric 对 116 条结论独立投票，分为 A（数据与方法学，26 条）、B（渲染、UX 与 P1，47 条）、C（历史、清理、测试与路线，43 条）三批。4 方 × 3 批全部交卷，每方各 116 条。
- **每条投三类票**：
  - 事实断言：成立 / 不成立 / 弃权；
  - 修法：同意 / 修改 / 反对；
  - 优先级：同意 / 应更高 / 应更低。
- 以多数票为准。平票和「需裁决」的条目由主 agent 裁决，把握不高时交给用户。
- **主 agent 独立复核**：投票者都是 LLM，可能共享同一份误导性证据。所以对本任务要动手的全部 P0 和 Wave 0–1 前提，主 agent 没有复用审计脚本，而是重写了一套解析器：按 Next.js RSC payload 逐 UUID `raw_decode`，只读缓存，不联网。

### 9.2 总体结论

- 所有 P0 的事实断言都获「成立」，其中数据与方法学一批（A 批）为 4:0。
- 唯一被否决的是 **F-15**：事实断言以 3:1 被否决，修法一栏投票为「同意 1、修改 1、反对 2」，由主 agent 裁决取消。
- 新功能 F-2..F-14、F-16 的事实断言多为「需裁决」。原因是投票者对价值判断类断言选择了弃权，并不是被否决；这些条目的修法都以同意或修改为主。
- 多数条目的修法获同意，也有不少条目按「修改」意见调整了做法，全部已写进正文，并标注【交叉验证修正】。

### 9.3 平票与需裁决项的裁决

| 条目 | 票型 | 裁决 | 理由 |
|---|---|---|---|
| F-15 | 事实 1:3 被否决；修法 同意1/修改1/反对2 | **推翻**，取消该功能 | 「正交分解视图」已经存在，就是 blended×raw 口径，它的问题只是 P0-6 缺了 123 个模型。改为在 C2/F-7 给 blended×raw 加「正交分解视角」的预设与说明（S）。修改票和反对票其实都主张这么处理 |
| P0-5 优先级 | 应更低 2 : 同意 2 | **修正**：降为 P1-高 | 不影响 Pareto 与突出度数值，只影响关系线与 pin 卡标签 |
| P0-6 优先级 | 应更低 2 : 同意 2 | **成立**：维持在 Wave 1 修复 | 改动量为 S，而且顺带修正了 blended 口径的前沿完整性 |
| D-7 | 事实 1 确认 / 3 无法核实；修法 2:2 | 待定：交给用户 | W3 卡先做 0.5×/1.0× 两档对比，再由用户定 |
| D-2 demo 方案数 | Codex 主张先做两种 | **修正**：demo 先交两种 | 阶梯（精确）与邻接插值（参照）先交，单调平滑视成本决定 |

### 9.4 交叉验证修正清单（按多数意见，已写入正文）

| # | 修正内容 | 判定 | 正文位置 |
|---|---|---|---|
| 1 | D-1 的判定依据改为字段的值来源，不用 isEstimated；引入按口径计算的 `display_eligible` / `analysis_eligible`；不合格的点退出所有分析基准；blended×raw 口径中估算点正常参与 | 修正 | P0-1 第二期、D-1 |
| 2 | `_validate` 的 `n_cost ≥ 250` 必须改写为来源统计护栏（去掉回退后只剩 151 条当期成本，必然失败） | 修正（新增遗漏） | P0-1 第一期第 6 步、T1④ |
| 3 | API 顶层本来就带 `intelligence_index_version` 和 `tier`，要持久化并用作版本护栏 | 修正（新增遗漏） | P0-1 第 7 步、E5 |
| 4 | 详情页缓存有残缺页（`gpt-5-6-sol-low.html`），且混有三个版本；离线加载器要做结构校验，按版本/批次分区，禁止跨版本取并集 | 修正 | O2 |
| 5 | T3 提前到 Wave 1；O3① 与 H2 放到 W2 卡开头 | 修正 | T3、O3、H2 |
| 6 | P0-5 降为 P1-高；P0-3 按潜伏缺陷处理，但仍随 W1-3 修复；其余 P0 维持 | 修正 | 2.0 总览 |
| 7 | P0-4/P0-9 的顺序：先修 bdata、重新生成契约，再重渲染；`verify_interactions_headless.py:84-86` 也断言了 depthWrite，两处断言在 D-5 定案前都保留；契约校验改为「坐标非有限就不建网格」 | 修正 | P0-4、P0-9、T2 |
| 8 | P0-10：侧栏已有「Frontier 3D」，不重复放；日期要等 W1-8 落地真实抓取时间后，才能称为「数据抓取于」 | 修正 | P0-10 |
| 9 | 5a9d1 的数字写进文档前先重核：比值不稳健，只报 Spearman；时间单位为秒 | 修正（比值被推翻，Spearman 成立，见 V-4） | 6.2、F2 |
| 10 | 清理改用可恢复的做法：Kanban trash、output 归档、逐个核对 RVF、先核对 74657、5fc95 母卡保留、9e8bc 的关闭依据、a0e79 补记的措辞 | 修正 | 6.3、D-11 |
| 11a | 交叉引用：A3→**D-9**、F-16→**D-10**、Wave 4 的依赖→**D-8** | 修正 | A3、F-16、第 10 节 |
| 11b | 数字改用离线可复现值并注明口径：501→**509**（>2% 阈值）、47→**54**、Pareto 变化 34→**36** | 修正 | P0-1、6.1、附录 C |
| 11c | 「Pareto 点是阶梯凸角」改为「平台角点」（136/137 为凸角，1/137 为凹角） | 修正 | O4、B4、6.2 |
| 11d | ~~勘误「D-1 选项 (a) 的 Pareto 实为约 29，不是 20–22」~~ | **推翻**（被 V-1 推翻；原报告的 22 成立） | D-1 |
| 11e | Delaunay 反向面的比例写明判定口径 | 修正 | P0-7、D-2 |
| 12 | 其他遗漏，归入对应卡：<br>• W2：B1 的 `LineSegments2` 需要重新打包；隐藏正在 hover 的厂商时清除 hover 状态。<br>• W3：tooltip 定位写死了 300/180px；搜索的 Pin 用 span 冒充按钮；归一化用了 `toLocaleLowerCase`；C6 的范围扩到 aria-label 与轴标题。<br>• W4：`ttft_s`、`coding_index` 是死字段；无日期的 Pareto 点会一直保留；磁盘 JSON 用 indent=2。<br>• W2/T8：`data/raw` 与 `data/processed` 一并隔离，按 worktree 或任务 id 命名 | 修正（补充） | 各对应条目 |
| 13 | 仍需用户确认的分歧：D-7 默认尺寸；D-2 demo 方案数 | 待定 | D-2、D-7 |

### 9.5 独立复核结果

**精确复现（结论与数字都成立）**

| 条目 | 复核结果 | 判定 |
|---|---|---|
| P0-1 | 默认 136 点中 65 个成本非当期；31 个有当期 token 却用了旧值（冗长度被低估 1.17–3.69 倍）。缓存版本分区与 API 智能分的一致率：v4.1 分区（56 页）0.7%，v4.1.1（12 页）1.0%，9/23 的 v4.3.2（54 页）100%（35,856/35,856）；分区内 UUID 冲突为 0 | 成立 |
| P0-2 | 列表页 snake_case 命中 0，camelCase 命中 23 | 成立 |
| P0-3 | 23 页的首个匹配返回 Gemini 3.5 Flash (high) 的值，另有 1 页返回其他模型；已污染行数为 0，确认是潜伏缺陷 | 成立 |
| P0-4 | 四个口径的实心面都是 `['dtype','bdata']` | 成立 |
| P0-5 | 默认口径 37 个推理模型被标为 non-reasoning；19 个基模型名残留档位后缀；伪谱系 `OpenAI\|\|max`，另有 4 个 `…\|\|max`，其中 Qwen3 Max 这类属于正常 tier | 成立 |
| P0-6 | 123 个模型；缺 cache-hit 时，AA 原生 blended 与 (9i+o)/10 的一致数用 API 价计算为 168/178，其余差异来自 API 价格四舍五入 | 成立 |
| P0-7 / P0-8 / P0-9 / P0-10 | 文档断言有误；ImportError 复现；产物生成于 9/23，早于 8c6e827 的 9/29，刻度类名 0 次；HTML 中 AA 字样 0 次 | 成立 |
| E1 | `JSON.parse("<\!--")` 报错；当前数据中出现 0 次，属于潜伏缺陷 | 成立 |
| Delaunay 反向面 | 36%/39%/46%/58%；判定口径：log–log 平面上，三角面梯度在成本或速度任一方向与支配方向相反 | 成立（补充了口径） |
| 缺维 | `Claude Opus 5.5 (… Max Effort …)` 57.6 分，缺速度；图上最高分 56.0 | 成立 |
| 其他前提 | `drop_reason` 没有消费方；只保留当期成本（151 条）时 `n_cost≥250` 必然失败；API 顶层有 `tier`/`intelligence_index_version`；残缺页只有 `gpt-5-6-sol-low.html`；bundle 可逐字节重建，W0-6 的 `--check` 可行；契约的 `cost/speed_metric_note` 没有被渲染，侧栏已有「Frontier 3D」 | 成立 |

**修正与新发现**

| 编号 | 内容 | 判定 |
|---|---|---|
| **V-1** | 撤回投票中的勘误「D-1 Pareto≈29」。按 W1-5/W1-6 的完整实现（当期成本 + 当期 token；未剪枝的三维齐全集 n=143），默认口径 Pareto = **22**；只剔除成本、不修 token 时才是 29。W1-13 验收以 22 为预期值 | **推翻**（推翻的是勘误；原报告的 22 成立） |
| **V-2** | 9/23 的目录**不增加任何当期成本**：它的 151 条成本与 API 的 151 条完全相同，另 6 条是 0 占位。目录的价值只在于 token（166 条）、原生 blended（454 条）、time per task（150 条），以及 isEstimated/isReasoning/effort/release。成本来源只分两类：API、非当期回退；W1-5 的「按 UUID 覆盖成本」是空操作，不必实现 | 修正 |
| **V-3** | 新风险，是 D-12 暂停抓取的直接后果：9/23 之后上架的模型缺当期 token，在两个有效速度口径（含默认口径）中完全缺席。W1-8 的新鲜度摘要和缺维告警要单列这一类。免抓取的替代指标 `median_end_to_end_response_time_seconds` 覆盖 347 个模型，与 AA time per task 的 Spearman 为 0.75（token 归一化为 0.95，原始速度为 0.60），作为候选写进第 0 张卡和 F-6，不进 Wave 1 | 修正（新增风险） |
| **V-4** | 5a9d1：Spearman(time per task, 每任务输出 token ÷ 速度) = **0.952（n=150）**，成立。「比值 0.95」不稳健，它依赖假设的任务数：API 的 `total_cost / cost_per_task` 给出的每模型任务数在 804–3794 之间，取中位数时比值为 0.53。文档只报秩相关，比值要连同假设一起写；`intelligenceIndexTimePerTask` 的单位是**秒**（图表字段 `timePerTask` 是分钟） | 修正（Spearman 成立；比值被推翻） |
| **V-5** | 小修：冗长度被缩放的是 **65** 个，不是 64 个；有效速度经中位数重归一后被高估 **1.06–3.35** 倍，不是 1.2–3.7 倍；「非当期成本但 isEstimated=false」全表有 **4** 个，不是 6 个，默认口径内为 0，两种判定在默认口径上结果相同，但「按值来源判定」的原则不变；v4.1 分区对应的抓取时间是 **7/9–8/5**，不只是 7 月 | 修正 |

### 9.6 未复核的范围

- **P0-11**（API key 泄露）：为了不接触 key 本身，刻意跳过。四方投票也全部弃权。
- W2 及以后各卡中的 P1、overhaul 条目沿用四方投票的结论，由各卡在动手前按「审计结论多方核验」惯例再核一次。

---

## 10. 执行路线

### 10.1 本任务 ca0af：Wave 0（止血）

| 编号 | 内容 | 对应条目 |
|---|---|---|
| W0-1 | 报告入库：本文件 | — |
| W0-2 | 修冗长度报告的导入：`src/model_intelligence_verbosity_report.py:18-23,81` 改用 `fetch_artificial_analysis_models_page_html`（W1-10 再迁到目录数据源） | P0-8 |
| W0-3 | 文档更正：<br>• 智能增长分析 README 的 `:11,:116` 加更正注记（当前 v4.3.2；≤2024 年的模型 99–100% 是估算分）；<br>• `README.md:89-93` 改为准确的 Delaunay 描述；<br>• 删除 `README.md:55,66-69` 中过时的统计，一并修正标题中「备选」与「默认」的矛盾 | P0-7 |
| W0-4 | 页头与署名：在 `frontier_3d_self_contained_report_document.html` 加一行紧凑 header（标题、AA 链接、数据日期、指数版本、模型数与 Pareto 数、「如何阅读 ⓘ」抽屉）；z 轴标题带上版本号；改 `entrypoint.js` 的 `buildUserInterface`/`renderCurrentView` 和 css，然后 `npm ci && npm run build:frontier-3d-threejs` 重新打包 | P0-10、C2（部分） |
| W0-5 | 产物指纹与转义：renderer 写入 `renderer_bundle_sha256`、`generator_git_commit`、`rendered_at_utc` 的 `<meta>`，并在「当前视图」中显示；`_json_for_script_tag` 改为 `<`/`>`/`&` 转义；模板改为一次性 `re.sub` 替换占位符 | P0-9、E1 |
| W0-6 | bundle 守卫：构建脚本加 `--check` 模式；新增 `.gitattributes` | T4 |
| W0-7 | 已授权的清理（按交叉验证调整后的做法，详见 6.3）：output 残留归档；Kanban 关卡放在 W1-13 验收之后执行；逐个核对 worktree | D-11 |

### 10.2 本任务 ca0af：Wave 1（测试地基 + 数据可信度）

测试先行：每个修复先写失败的 pytest，再改实现。

| 编号 | 内容 | 对应条目 |
|---|---|---|
| W1-1 | 环境：`pyproject.toml`、`uv.lock`、`.python-version`、`package.json` 的 type/engines；README 命令改为 `uv run python -m src.cli` | T0 |
| W1-2 | 测试地基：`tests/python_unit/`、`tests/fixtures/`；冒烟、性质测试、解析器 fixture、契约反例；T3 合成 fixture 与 golden。测试不读共享的 `output/` 与 `data/processed/` | T1、T3 |
| W1-3 | 暂停抓取与离线目录解析器：新增 `--allow-artificial-analysis-website-page-fetch`（默认关闭，关闭时只读缓存并打印「已暂停网页抓取（D-12）」）；离线目录解析与按版本分区的加载器；详情页 token 改按 `currentModel` 定位 | P0-12/D-12、O2（离线部分）、P0-3 |
| W1-4 | 解析器与护栏：列表页 0 条时醒目告警；锚点改为 UUID 交集一致率 ≥99%（2026-10-01 起低于 99% 只告警，R1-01 (a)）；不再无条件打印「通过」 | P0-2 |
| W1-5 | 值级别可溯源：csv 回退改为显式开关；存原始量；加来源、版本、时间列；按 UUID 覆盖 31 个过期 token；采集 isEstimated/isReasoning/effort/release；改写 `n_cost≥250` 护栏 | P0-1 第一期 |
| W1-6 | 显示但不参与分析：按口径计算 display_eligible / analysis_eligible；`frontier.py` 中不合格的点退出所有分析基准；契约 marker 加 `analysis_eligibility`；渲染端的历史口径样式与「仅当期可比」开关；README 说明规则 | P0-1 第二期、D-1 |
| W1-7 | 混合价：原生 `price1mBlended7To2To1` 优先；缺 cache-hit 时用 input 价；加来源列；修正 README:79/:81 | P0-6 |
| W1-8 | 抓取时间与版本：API 缓存写入 `{source_url, tier, intelligence_index_version, fetched_at_utc, data}`；每次刷新另存一份历史响应；`data_date` 与剪枝参考日期取 `fetched_at`；`--pruning-reference-date`；新鲜度摘要；缺维告警与 `excluded_models_with_drop_reason`，单列 V-3 类新模型 | E5、P0-13、V-3 |
| W1-9 | 速度轴改名，并按版本固定归一常数（带 `EXPERIMENT_NODE:`） | F2、D-3 |
| W1-10 | P0-4 数据侧修复与契约数值校验：`.tolist()` 根修与 bdata 解码兜底；语义校验；非有限值不建网格；冗长度报告改用目录并重新生成；`--export` 失败时返回非零码；新增「实心面三角形数增加」的阻断断言；两处 depthWrite 断言保留 | P0-4（数据侧）、P0-8、E7（部分） |
| W1-11 | 一键入口：`refresh_regenerate_verify_and_open_frontier_3d_report.sh` 与 `run_all_frontier_3d_verifications.sh` | F-1、T5（本地部分） |
| W1-12 | 文档：在 `docs/artificial-analysis-provided-data-source-analysis/` 新增 2026-09 调查记录，内容为指数重定标证据、内嵌目录字段、isEstimated 的含义、5a9d1 结论（按 V-4 的要求写）、吸收 a0e79 补记；README 的「三个维度与数据口径」表改为「来源 / 版本 / 回退策略 / 字段」 | F2、H1（部分）、5a9d1 |
| W1-13 | 重新生成与验收（顺序固定：先修 bdata，再生成契约，最后渲染 HTML）：`--refresh` 只拉 API（约 5 次调用，不抓网页），合并已缓存的 9/23 目录，生成契约与 HTML，跑全量验证，结果写进提交正文；然后执行 W0-7 中依赖验收结果的 Kanban 关闭步骤 | P0-9、验收 |

### 10.3 Wave 0/1 执行顺序（按依赖排序）

1. `npm ci` 与 T0 环境（W1-1）；
2. W0-2/W0-3 文档与导入修复，W0-5 渲染器修复，W0-6 bundle 守卫；
3. W0-4 header（改 entrypoint 并重新打包）；
4. W1-2 测试地基与 T3；
5. W1-3 / W1-4 / W1-5 / W1-6 / W1-7 / W1-8 / W1-9 / W1-10：数据与契约；
6. W1-11 / W1-12；
7. W1-13 最终生成、验证，并入库报告（W0-1）；
8. W0-7 清理与看板。

### 10.4 Kanban 拆卡（Wave 2–5，依赖本任务 ca0af）

| 卡 | 内容 | 依赖 |
|---|---|---|
| **第 0 张卡：最小化抓取方案设计与实现（D-12）** | 分七项：<br>• 合规底线：记录条款风险；如有需要，沿用 3c8b8 草稿邮件向 AA 申请授权。<br>• 抓什么：每次刷新只抓 2–3 个详情页取内嵌目录，替代逐模型抓 122 页；设计挑页规则和多页并集的护栏（同版本、同批次、UUID 冲突报错）。<br>• 怎么抓：真实 UA、限速与退避（吸收 a0e79 的 curl 回退思路），并设刷新频率上限。<br>• 存什么：只存抽取出的数值 JSON（带版本与抓取时间），不存整页 HTML；决定 402MB 旧缓存如何处置。<br>• 失败时：被封禁或页面改版时降级为只用 API。<br>• 收尾：恢复「冗长度与目录」的自动刷新，解除本任务加的暂停默认值。<br>• 候选：评估 V-3 的 `median_end_to_end_response_time_seconds` | 方案设计可立即开始；改代码要等 ca0af 合入 main |
| **W2 渲染正确性与交互状态机** | 分五组：<br>• 开头：H2 能力对等清单；O3① 纯函数抽取，配 `node --test`。<br>• P0-4 深度：动手前确认 D-5，改完同步两处 depthWrite 断言的期望值。<br>• P0-5 短期修复（已降为 P1-高）。<br>• A1、A2、A3（按 D-9）、A4、A5；B1（需重新打包 `LineSegments2`）、B2；E2、E3；E7 的补充项。<br>• T2 可见结果断言；T5（本地入口加 git hook 为主，GitHub Actions 只跑锁定版本单元测试与合成 fixture 层，浏览器矩阵加 WebKit/Firefox）；T8 隔离（output、`data/raw`、`data/processed`，按 worktree 或任务 id 命名）。<br>每个条目都附交叉验证的修改意见 | ca0af |
| **W2-demo 前沿几何并排 demo（D-2）** | 分四步：<br>• 先补 B4 立面：只向更宽松的预算方向延伸，不可达区域保持空白。<br>• 并排展示「阶梯可达面（精确）」与「Delaunay 邻接插值（参照）」，单调平滑作为可选的第三方案。<br>• 量化表按口径分列（8.4 分只出现在 blended 口径，默认口径的问题是反向面）。<br>• 附上 4c7d1 的三个 UX 方案原文，由用户选定默认 | ca0af；与 W2 并行 |
| **W3 信息架构与可读性** | 分四组：<br>• C1–C6（C2 含 blended×raw 正交分解预设；C3 与 F-10 合并；C5 能命中未上图的模型）；B3；B5（按 D-7 先做两档对比）；B6；B7（与 F-2 合并 zoomToCursor；轴范围只按显示的点计算）；B8。<br>• D1–D3。<br>• H1 README 重写（含 3c8b8 结论、Lobe Icons 许可与商标声明、`THIRD_PARTY_ASSET_SOURCES.md` 更正）；H2 收尾。<br>• P0-13 的页面内部分 | W2 |
| **W4 架构与方法学** | 分四组：<br>• O1 契约 v3 纯几何与 G1 瘦身（HTML ≤2.2MB；先与修正后的 v2 等价对拍，再加立面；保留四口径并集 24 家 logo；内嵌契约定义允许字段；磁盘 JSON 紧凑化）。<br>• O4 前沿形态选择器与 B4 立面（按 demo 结论）。<br>• F1 突出度修订（D-4，golden diff 交用户审）；P0-5 根治（改用 release/effort 分组）。<br>• O3 渐进模块化（按 **D-8**，轻量 store 有证据再上）；E4 注册表改 UUID；E6 HTTP Retry（不引入 curl）；F3/F4；T6（先实测基线）；T7 | W2、W2-demo 结论，以及 D-2、D-4、D-6、**D-8** |
| **W5 新功能** | 顺序：F-2 → F-4 → F-5 → F-3 → F-6 → F-7（含 blended×raw「正交分解」预设）→ F-8 → F-9 → F-11 → F-12 → F-13 → F-14 → F-16（按 **D-10**）。<br>• F-10 已并入 C3；F-12 并入 P0-5 根治与 F1③；**F-15 已否决并取消**；F-17 只登记（阻塞于 Commercial 授权）。<br>• F-3、F-6 依赖第 0 张卡恢复目录刷新。<br>• O6 保留 `EXPERIMENT_NODE:`，暂不实施。<br>• F-4 的 URL 参数设计与 a0c95 协调 | W3、W4；F-3/F-6 另依赖第 0 张卡 |
| **需要用户本人处理（不建卡）** | P0-11：在 AA 平台轮换 key。脱敏 hook 属于 my-ai-setup 仓库，另行处理 | — |
| **已建卡 a0c95：对外托管、iframe 嵌入与对外 API** | backlog，按用户要求暂不细化。开工前必须先确认 AA 数据再分发的许可范围（第 2.1 条只授予个人、非商业许可，与第 0 张卡相关），并补齐第三方资产的许可声明 | ca0af；许可确认 |

各卡的通用约束：

- 开工先读本文件；
- 动手前对本卡要改的条目重新核实前提（代码可能已被前序卡改动），与本文件冲突时以实测为准，并在交付说明中写明；
- 不访问 artificialanalysis.ai 网页（第 0 张卡除外）；
- 不打印、不提交 API key；
- `output/`、`data/raw`、`data/processed` 是共享的符号链接目录，只读。

---

## 附录 A 验证基线

**现有验证套件在基线 HEAD 上的结果【完整性评审补充】**

- 对新渲染的 HTML 跑了现有 5 个验证脚本，全部 exit 0：
  - browser_contract：「公共行为验证通过」
  - interactions_headless：「全部通过」
  - axis_annotations：PASS
  - metric_semantics：4 段均通过
  - public_contract：通过
- 但 P0-4 仍然存在：实心面契约在 4 个口径中都是 `['dtype','bdata']`，而 `browser_contract.py:61` 的 `paretoFrontierSurfaceWritesDepth is True` 检查的恰恰是这个空 mesh 的材质标志。
- **结论**：现有套件对本报告的 P0 缺陷一个都检测不出来。这是 T2 最有力的论据。
- 附带复核了 P0-9：在代码副本中用重渲染命令执行成功，产物 3,399,470 字节，含 `aa-threejs-axis-tick-label`；主 checkout 的旧产物中计数为 0。注意：这份重渲染产物的实心面依然为空，见 P0-9 的执行顺序。
- bundle 可以逐字节重建（独立复核），因此 T4/W0-6 的 `--check` 可行。

**Wave 0–1 的验收基准**（W1-13）

- `uv run pytest tests/python_unit` 全部通过：冒烟、解析器 fixture、性质测试、契约反例。
- `node scripts/build_frontier_3d_threejs_interactive_renderer.mjs --check` 退出码为 0。
- `scripts/run_all_frontier_3d_verifications.sh`：3 个 Playwright 脚本加 `verify_metric_semantics`、`public_contract` 全绿。
- 新产物抽查：
  - `aa-threejs-axis-tick-label` 计数 >0；
  - header 含 artificialanalysis.ai 链接；
  - 契约中 `pareto_frontier_surface_triangle_mesh` 为有限数值，浏览器切到实心面后三角形数增加；
  - 每个显示点都有 value_source；
  - 各口径 analysis_eligible 子集上的 Pareto 数（默认口径预期 **22**）和「历史口径」点数（默认口径 41（9/23 实测；旧点云上约 65，见 W1-6），blended×raw 为 0）与离线复算一致；
  - 只有 151 条当期成本时 `_validate` 仍能通过；残缺缓存页被识别为无效；
  - 71 个当期实测模型的成本与 token 与 AA 目录一致（误差 <0.1%）。
- 用 Playwright 截图检查 header、历史口径点的样式、「仅当期可比」开关和新鲜度摘要；冗长度报告脚本能完整运行。

### Wave 0–1 决策落地（2026-10-01，W1-13 前置）

Wave 0–1 对抗评审与复验后，主 agent 对待决项拍板如下，已实现并配测试（测试先失败、实现后通过）：

- **R1-01 选 (a)：逐 UUID 判定当期。**
  - 目录分区的接受条件改为三条：版本 family 与当期一致（API 版本已知时与 API 比；未知时推定为与 API 智能分一致率最高的分区的 family）、
    结构有效、与 API 的 UUID 交集里带 token 的记录 ≥ 50。分区级智能分一致率不再是门槛，只作诊断量记录，<99% 时告警。
  - 被接受分区内，某模型的目录 token 只有在该模型的目录智能分与当期 API 智能分一致（容差 0.05）时才标当期。不一致的降为非当期：
    值来源仍记目录，版本字段如实写（4.3.2），新列 `output_token_count_value_non_current_reason_code` 记
    `output_token_count_value_catalog_intelligence_disagrees_with_current_api_intelligence`（任一侧缺智能分时记
    `…_not_comparable_with_current_api_intelligence`）。D-1 eligibility 用这个专门原因码，tooltip 文案为
    「历史口径（v4.3.2 冗长度：目录智能分与当期 API 不一致，AA 已重评），不参与本口径前沿计算」。
  - 「目录 vs API 成本一致率」护栏降为 warning_only；「目录 vs API 智能分一致率」护栏同样只告警。
  - 不变的：被接受分区内同 UUID 跨页冲突仍抛错；版本 family 不同（4.1、4.4）的分区仍拒绝。
- **R1-03：维持 warning_only，但不再静默。** 没有被接受分区时，契约顶层 `artificial_analysis_data_provenance` 新增
  `embedded_model_catalog_partition_rejection_warning_text`（无问题时 null），HTML 页头整行醒目显示（`role="alert"`，按纯文本渲染）。
  对抗安全脚本用含恶意片段的合成契约断言：有告警时页头显示且不注入元素，null 时不显示。
- **R1-04 选 (b)+(a)：** 新护栏 `current_artificial_analysis_api_cost_to_run_value_count_not_collapsed_versus_previous_guardrail_passed_response`：
  API 当期成本条数与响应历史中**上一份通过护栏的响应**相比骤降 > 30% → 失败；没有可比基线时用「≥ 100 条」绝对下限。
  为区分护栏失败的响应（复验风险 8），刷新写进响应历史的新响应先带 `_pending_data_quality_guardrail_validation` 后缀，
  护栏通过后去掉后缀，失败则改为 `_rejected_by_data_quality_guardrails`；带后缀的文件不作基线。原「非当期回退成本占比 ≤ 0.70」改为 warning_only。
  两个阈值都写了 `EXPERIMENT_NODE`。
- **复验风险 2：** `scripts/verify_interactions_headless.py` 选「被剪枝前身」时，逐条谱系 pin 后用前端新增的诊断函数
  `frontmostPointerInteractionAtProjectedPrunedLineageAncestorPosition` 做与真实悬停相同的射线拾取，找到能被真正命中的前身才用；
  都找不到才失败并打印每个前身最前面命中的是谁。另外「权重变化会重排前沿模型」在当前口径前沿模型 < 2 个时跳过（目录分区被拒时
  默认口径 Pareto 为 0，属合法数据状态）。
- **R4-11：** `requirements.txt` 下界与 pyproject 对齐（numpy ≥ 1.26、plotly ≥ 6.0、kaleido ≥ 1.0 等），文件头注明「以 pyproject.toml / uv.lock 为准，
  本文件仅供不用 uv 的旧入口」，pytest 校验两者不脱节。没有改主 checkout 的 `.venv`。

**W1-13 彩排离线模拟（新规则，2026-10-01 重跑）。** 以 9/23 共享缓存为底，`cp -RLp` 复制 data/raw 到 scratch，
`--artificial-analysis-raw-data-directory` 指向副本，分页抓取用 monkeypatch 的假 requests（Pro 403 → Free 分页），走真实 CLI 入口，
`--pruning-reference-date 2026-09-23`。四口径格式为「显示 / 分析 Pareto / 参与分析 / 历史口径」。

| 场景 | CLI | 目录分区 | 当期 token（逐 UUID 降级） | effective×effective | effective×raw | blended×effective | blended×raw | 缓存 | 关键护栏 |
|---|---|---|---|---|---|---|---|---|---|
| S0 不刷新 | exit 0 | v4.3.2 接受 | 166（0） | 117/22/76/41 | 134/27/87/47 | 147/34/103/44 | 77/23/77/0 | 未动 | 全部通过（版本比对跳过：缓存无版本字段） |
| S1 顶层 4.3 | exit 0 | v4.3.2 接受 | 166（0） | 117/22/76/41 | 134/27/87/47 | 147/34/103/44 | 77/23/77/0 | 替换 | 全部通过 |
| S2 API 升 4.4 | exit 0 | 全部拒绝（family 4.3 ≠ 4.4） | 0（0） | 123/0/0/123 | 134/27/87/47 | 134/0/0/134 | 77/23/77/0 | 替换 | 分区接受护栏告警；页头显示「内嵌目录分区被拒…有效速度口径暂无当期可比点」 |
| S3 2% 模型 +0.5 | exit 0 | v4.3.2 接受 | 163（3：Celeris-1、MiniMax-M2.7、Step 5 Preview） | 116/21/73/43 | 134/28/88/46 | 144/32/101/43 | 77/23/77/0 | 替换 | 智能分一致率 98.04% 告警 |
| S4 新增 5 个模型 | exit 0 | v4.3.2 接受 | 166（0） | 117/22/76/41 | 139/29/92/47 | 147/34/103/44 | 78/23/78/0 | 替换 | 全部通过 |
| S5 只返回 400 个 | 护栏异常，无 HTML | — | — | — | — | — | — | 未动 | 模型数 400 < 500、API 当期成本 85 条较上一份 151 条骤降 → 失败；新响应在历史里带 `_rejected_by_data_quality_guardrails` |

S3 随机重评 13 个模型，其中只有 3 个在目录里有 token，所以只有这 3 个降级；旧规则下整个分区被拒、默认口径 Pareto 为 0，新规则下为 21。
S2 是新规则下仍会让有效速度口径失去当期可比点的情形（API 升 family），由页头告警与分区接受护栏告警提示，raw 速度口径照常可用。

**W1-13 彩排的停止条件（新规则）**：任一护栏「失败」；分区接受护栏「告警」或页头出现「内嵌目录分区被拒」；当期 token 为 0；
默认口径分析 Pareto 为 0。智能分 / 成本一致率告警、非当期回退占比告警**不是**停止条件。彩排命令保持 `cp -RL`（见仓库 README）。

## 附录 B 核验修正与矛盾消解（审计汇总阶段，已按交叉验证与独立复核更新）

- 「实心面失效」不是环境升级后才出现的回归：plotly 6.8.0 在 07-09 安装，早于 three.js 重写，所以它**从没工作过**。单个 trace 的 `to_plotly_json()` 仍返回 ndarray，只有 figure 级才会编码成 bdata。
- 锚点校验被跳过的根因是列表页改成了 **camelCase**，不是「页面退化」。页面里仍有 23 个可用对象。
- 冗长度偏差的准确口径：只用 9/23 当期目录对照时，156 个可比模型中有 102 个偏差 >5%，中位比值 0.572。DATA-01 原先给的 225/171 混入了 7–8 月的旧目录。
- AA Time per Task 与有效速度的关系：以独立复核为准，Spearman(time per task, 每任务输出 token ÷ 速度) = 0.952（n=150）。「比值中位 0.95」依赖假设的任务数，不作为结论（V-4）。方法学页那句引文只出自 GDP.pdf 一节，结论主要依据数值对拍。
- UX-09 所说「成本轴右上被误读为最优」不成立：默认相机是从理想角看过去的。
- RA-17：three.js r185 内部已经处理了上下文丢失与重建，应用只需在恢复时 `requestRender`，不需要把纹理 `needsUpdate` 设为 true。
- RA-12：历史回归主要来自 Plotly gl3d 本身，不能作为大重构的论据。window 全局是 19 个，不是 17 个。
- METH-06：PRESS 残差在 h≈0.75 时主要反映外推误差，不宜直接替换。
- HIST-04 与 METH-03 都降为 medium：Pareto 成员判定是正确的，问题出在表达方式和文档描述。
- LB-09 的类型改为 ux-issue：137 个 Pareto 点都是平台角点（136 个凸角、1 个凹角）。
- DATA-15「DeepSeek 只在两个视图中」有误：汇总阶段复查过，4 个口径都有显示。
- 完整性评审「已核实，无需修改」的项：pin 按基模型粒度生效（设计如此）；window 全局变量 19 个；`verify_frontier_3d_threejs_browser_contract.py:61-62` 断言的位置；7:2:1 混合价缺失的原因（API 中 673 行都没有原生 blended 字段，397 行缺 cache-hit 价）。
- 完整性评审排除的推测：突出度对剪枝窗口的依赖为 0。
- 未证实、仅供参考：
  - 轴标注挂在固定棱上，旋转后是否遮挡点云、拖拽时是否卡顿，都没有实测（HIST-15）；
  - TI-10 中 WebGL 像素基线的稳定性没有验证；
  - A4 的「14 次只成功 1 次」没有复跑（机理已确认）；
  - E6 的 SSLEOF 需要联网才能复现。

## 附录 C 数字口径说明

审计阶段有些数字来自核验时的活抓取，与离线缓存复算的结果不同。**正文一律采用离线可复现的值**，下表列出差异，避免后续核验者误判为夸大。

| 指标 | 原报告（活抓取或早期口径） | 正文采用（离线复算） | 说明 |
|---|---|---|---|
| 重定标后分数变化的共同模型数 | 501/512 | **509/512** | 在 >2% 阈值等各种容差下都是 509 |
| 新旧成本可对照模型数 | 47 | **54** | 当期 API 对照 7/1 快照，全部变化 >2% |
| 全部换为当期值后的 Pareto 数 | 34 | **36** | 由 32 变为 36 |
| 被缩放的冗长度个数 | 64 | **65** | V-5 |
| 31 个过期 token 模型的有效速度高估倍数 | 1.2–3.7 | **1.06–3.35** | 经中位数重归一后（V-5）；冗长度低估 1.17–3.69 倍 |
| 31 个过期 token 模型中的 Pareto 点数 | 5 | 8（Kimi 离线复算） | 以 W1-13 复算为准 |
| GPT-5.6 Luna (Non-reasoning) 的当期 token | 4.85M | 2.36M（9/23 缓存） | 管线用的旧值是 1.37M |
| 默认突出度前 5 名中失真的个数 | 3 | 3（2 名只凭仓库数据可复现） | 第 3 名需要 9/23 详情页缓存 |
| 「非当期成本但 isEstimated=false」 | 6（Kimi） | **4**（全表；默认口径 0） | V-5 |
| D-1 选项 (a) 的默认口径 Pareto | 20–22 | **22** | 当期成本 + 当期 token（V-1）；只剔成本不修 token 为 29 |
| 5a9d1 | 比值中位 0.95；Spearman 0.94–0.97 | **Spearman 0.952（n=150）** | 比值依赖任务数假设，不作结论（V-4） |
| v4.1 缓存分区的抓取时间 | 7 月 | **7/9–8/5** | V-5 |

## 附录 D 脚本说明

审计和复核用的脚本与日志都在审计 scratch 目录中，**没有入库**；只读缓存，不联网，不触碰 API key。需要复现时，由各卡按下列说明重写或取用。

- **独立复核脚本**（主 agent 全新编写，不复用审计脚本）：
  - `extract_embedded_catalog_from_cached_detail_pages.py`：从缓存的 AA 详情页解出 Next.js RSC payload，按 UUID 用 `raw_decode` 抽取内嵌模型目录；
  - `probe_page_structure.py`：探查页面结构、识别残缺页；
  - `analyze_catalog_partitions.py`：按指数版本给缓存分区，计算与 API 智能分的一致率和 UUID 冲突；
  - `analyze_value_provenance_of_processed_models.py`：按字段复原每个值的来源（API、v4.1 快照、旧 csv）；
  - `analyze_default_view_stale_tokens_and_list_page.py`：统计默认口径的过期 token，以及列表页 snake_case/camelCase 命中数；
  - `analyze_reasoning_suffix_parsing.py`：档位后缀与伪谱系；
  - `analyze_d1_eligible_pareto.py`：D-1 各种剔除口径下的 Pareto 数（V-1）；
  - `analyze_followups.py`：目录成本与 API 成本对拍、E2E 响应时间覆盖率等后续问题（V-2、V-3）；
  - `bundle-reproducibility-check/`：bundle 逐字节重建检查。
- **交叉验证**：
  - `frontier_3d_audit_consolidated_claims_report.md`：投票用的 116 条结论清单；
  - `frontier_3d_cross_model_claim_validation_voter_instructions_template.md`：投票 rubric；
  - `launch_external_cross_model_claim_validation_voters.sh`：在隔离进程中启动外部投票者；
  - `tally_cross_model_claim_validation_votes.py`：计票，生成 `cross_model_claim_validation_tally_report.md`（逐条结论与逐票理由）。
- **完整性评审**：
  - `axis_range_check.py`：轴范围占用率，以及 A5 的 hover 与灰线统计；
  - `svg_natural_size_check.py`：SVG natural size；
  - `uplift_pruning_dependence.py`：突出度对剪枝窗口的依赖；
  - `build_linear.py`：`--speed-scale linear` 的构建；
  - 5 个 `verify_*.log`：附录 A 的基线结果；
  - `aa_terms.txt`：条款原文摘录。
- **本任务新增、入库的脚本**（W0-6、W1-11）：
  - `scripts/build_frontier_3d_threejs_interactive_renderer.mjs --check`：bundle 守卫；
  - `scripts/refresh_regenerate_verify_and_open_frontier_3d_report.sh`：一键刷新、重生成、验证、打开；
  - `scripts/run_all_frontier_3d_verifications.sh`：全量验证入口。
