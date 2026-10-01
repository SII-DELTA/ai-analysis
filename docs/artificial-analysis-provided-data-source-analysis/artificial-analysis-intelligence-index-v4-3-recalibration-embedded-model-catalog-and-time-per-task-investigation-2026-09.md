# 2026-09 调查记录：智能指数 v4.1→v4.3 重定标、详情页内嵌模型目录与 time per task

调查时间：2026-09-30。
数据：2026-09-23 的 AA API 缓存（`data/raw/api_language_models.json`，673 个模型）与 122 个详情页 HTML 缓存（`data/raw/artificial_analysis_model_detail_page_html/`）。全程**只读缓存，不联网**（D-12 暂停网页抓取）。
复算方式：用两套互相独立的解析实现交叉核对。一套是生产代码 `src/fetch_data.py` 的内嵌目录加载器，另一套是独立复核脚本；后者按 Next.js RSC payload 逐 UUID `raw_decode`，与生产实现不共享代码。两套结果逐项一致。独立复核脚本只留在当时调查任务的临时目录里、**没有入库**，读者无法直接复现这项交叉核对；文中结论以入库的生产加载器为准，关键计数（被接受分区 v4.3.2、166 条当期 token、1 个残缺页、成本一致率）可用 `uv run python -m pytest --run-tests-requiring-local-cached-artificial-analysis-data` 在本机缓存上复核。
注意：AA 数据会随时间变化，文中计数是 9/23 缓存的快照，应作为数据源行为的证据，而不是永久常量。

## 结论摘要

1. **AA 在 2026-08-14 到 09-23 之间把智能指数从 v4.1 重定标到 v4.3**。当前缓存版本为 v4.3.2。重定标后，同一 UUID 的智能分 99.7% 发生变化，差值中位数为 −5.0 分。旧版本的成本和 token 数不能与新版智能分拼在一起用，否则就是审计 P0-1 的「混版点」。
2. **详情页内嵌的模型目录是按模型拆分的成本、token 数与 time per task 的唯一来源**。Free API 没有 token 计数字段，列表页 payload 已改为 camelCase。每个详情页都内嵌同一份全量目录（v4.3.2 为 673 条）。
3. **`isEstimated` 只表示智能分是否为估算**。估算分的 496 个模型在目录里一律没有 token 数、成本和 time per task。
4. **5a9d1 的结论只在秩相关层面成立**：Spearman(AA time per task, 每任务输出 token ÷ 中位速度) = **0.952（n=150）**。「比值约 0.95」依赖假设的任务数，结论不稳健。
5. **暂停抓取（D-12）的代价（V-3）**：9/23 之后上架的新模型没有当期 token 数，因此在两个「有效速度」口径中缺席。可免抓取的替代指标是 API 的 `median_end_to_end_response_time_seconds`，它与 time per task 的 Spearman 为 0.747。

## 1. 指数 v4.1→v4.3 重定标证据

### 1.1 缓存按页面版本字符串分区

每个详情页都带有 `Intelligence Index vX.Y[.Z]` 字样。下表按该版本字符串把缓存页分区，再把各分区内嵌的智能分与 9/23 API 智能分逐一比对。计数单位是「页 × UUID」，容差 0.05。

| 页面版本 | 页数 | 缓存日期 | 与 9/23 API 智能分一致率 |
|---|---:|---|---:|
| v4.1 | 56 | 2026-07-09 – 2026-08-05 | 220 / 30,401 = **0.7%** |
| v4.1.1 | 12 | 2026-08-14 | 72 / 7,128 = **1.0%** |
| v4.3 / v4.3.2 | 54 | 2026-09-23 | 35,856 / 35,856 = **100%** |

- 同一 UUID 从 v4.1（8/05 分区）到 v4.3.2 的智能分：可比 577 个，其中 99.7% 的差值 ≥ 0.05，差值中位数为 −5.01。
  例：Claude Opus 5 (Adaptive Reasoning, Max Effort) 从 60.7 变为 50.8；GPT-5.6 Sol (max) 从 58.9 变为 47.0。这是整体重定标，不是个别模型重测。
- 残缺缓存页只有 1 个：`gpt-5-6-sol-low.html`，恰为 2,048,000 字节，去尾空白后不以 `</html>` 结尾。加载器把它判为无效页并跳过，不从残片中取数；它对应的模型仍能从其他页的全量目录中取到。
- 9/23 分区内，同一 UUID 跨页值冲突为 0。v4.1 的 2026-07-10 分区有 42 处当天值漂移，但该分区未被采用，不取其数据。

### 1.2 加载器采用的分区规则（`load_artificial_analysis_embedded_model_catalog_from_cached_model_detail_pages`）

1. 先做结构校验：残缺页记为无效并告警。
2. 按「页面版本 family（major.minor）× 缓存 mtime 的 UTC 日期」分区。v4.1 横跨多个日期，会被拆成多个分区，这些分区都不会被接受。
3. 接受条件（2026-10-01 按 R1-01 (a) 修订，三项同时满足）：版本 family 与当期一致（API 版本已知时与 API 比；未知时推定为与 API 智能分
   一致率最高的分区的 family）；结构有效；与 API 的 UUID 交集里带 token 的记录数 ≥ 50。分区级智能分一致率不再是门槛，只作诊断量，
   低于 99% 时告警（同一版本约一周的自然漂移实测为 97.9%–98.6%，旧的 ≥ 99% 门槛会让一周后的刷新整体拒收目录）。
4. 只采用**一个**被接受的分区（当前为 9/23 的 v4.3.2，54 页）。禁止跨分区、跨版本取并集。
5. 被接受的分区内，同一 UUID 跨页冲突时显式报错。
6. 被接受的分区内逐 UUID 判定当期：该模型的目录智能分与当期 API 智能分差 ≤ 0.05 才算当期；不一致（AA 已重评）的 token 降为非当期，
   值来源仍记目录、版本如实写，并记原因码 `output_token_count_value_catalog_intelligence_disagrees_with_current_api_intelligence`。

### 1.3 对本项目的影响

- 旧回退链把 7/1 采集的 v4.1 成本与 token 比值，与 9/23 的 v4.3 智能分拼在一起：默认 136 个点中，65 个成本非当期、65 个冗长度被缩放。
- 现在每个值都带来源、所属版本和采集时间（`*_value_source` / `*_value_intelligence_index_version` / `*_value_fetched_at_utc`）。
- 非当期值只用于显示，不参与分析（D-1，见仓库 README「显示但不参与分析」一节）。
- 回退快照已改为原始 token 数，并在文件名里带上版本号：`data/reference/artificial_analysis_intelligence_index_v4_1_cost_to_run_and_canonical_output_token_count_fallback_snapshot_captured_2026_07_01.csv`。

## 2. 内嵌模型目录字段

每个详情页的 RSC payload（多段 `self.__next_f.push([1,"…"])`）里，每个模型对象都以 `{"id":"<uuid>","slug":"…` 开头。解析时先把各段拼接起来并按 JSON 字符串解码，再从每个对象起点用 `json.JSONDecoder().raw_decode` 取出完整对象；只保留含 `intelligenceIndex` 或 `intelligenceIndexIsEstimated` 的对象。

| RSC 字段 | 项目字段（`ArtificialAnalysisEmbeddedModelCatalogRecord` → DataFrame 列） | 含义与单位 | v4.3.2 目录非空条数（共 673） |
|---|---|---|---:|
| `intelligenceIndex` | `intelligence_index`（只用于分区一致率护栏，智能分仍取 API） | 智能指数分 | 664 |
| `intelligenceIndexIsEstimated` | `artificial_analysis_intelligence_index_is_estimated` | 智能分是否为估算（见第 3 节） | 673 |
| `intelligenceIndexCost.total` | `intelligence_index_cost_total_usd`（只用于护栏：151 条正值与 API `total_cost` 完全相同，另 6 条为 0 占位） | 跑完整套指数的美元成本 | 157 |
| `canonicalIntelligenceIndexTokenCount.output` | `intelligence_index_canonical_output_token_count`（`output_mtokens` = ÷1e6） | 跑完整套指数的输出 token 原始数 | 166 |
| `intelligenceIndexTimePerTask` | `artificial_analysis_intelligence_index_time_per_task_seconds` | 每任务耗时，**单位：秒**（图表字段 `timePerTask` 才是分钟） | 150 |
| `isReasoning` | `artificial_analysis_is_reasoning_model` | 是否推理模型 | 673 |
| `effort`（对象取 `.slug`，或直接为字符串） | `artificial_analysis_reasoning_effort_slug` | 推理档位 | 164 |
| `release.slug` | `artificial_analysis_release_slug` | 所属发布（同一发布的各档位共享） | 673 |
| `price1mBlended7To2To1` | `price_1m_blended_7_to_2_to_1`（只用于核对，不作为值来源） | AA 原生 7:2:1 混合单价 | 454 |

- 详情页的「本模型」由 `"currentModel":{"id":"<uuid>"` 指定。旧实现取「全页第一个 token 匹配」：23 个页面拿到的是 Gemini 3.5 Flash (high) 的值，另 1 页拿到了其他模型的值（P0-3）。现在只读 currentModel 这个 UUID 自己的值，找不到就返回 None。
- 目录成本不是新增的值来源（V-2）：9/23 目录的 151 条成本与 API 完全相同。目录的价值在于 token（166）、原生混合价（454）、time per task（150），以及 isEstimated / isReasoning / effort / release。

## 3. `isEstimated` 的含义

v4.3.2 目录中 `intelligenceIndexIsEstimated` 与目录里其他测量值的共现情况：

| isEstimated | 有 token 数 | 成本 > 0 | 有 time per task | 模型数 |
|---|---|---|---|---:|
| true | 否 | 否 | 否 | 496 |
| false | 是 | 是 | 是 | 143 |
| false | 是 | 是 | 否 | 8 |
| false | 是 | 否 | 是 | 7 |
| false | 是 | 否 | 否 | 8 |
| false | 否 | 否 | 否 | 11 |

- `isEstimated=true` 表示 AA 没有让该模型跑完整套当期指数，智能分是估算的。这类模型在目录里没有 token 数、成本和 time per task。
- 它**只描述智能分**，不能引申为「价格与速度也是当期实测」：价格、速度来自 API 的独立测量。因此 D-1 判定按「该口径实际用到的字段的值来源与版本」来做，不看 isEstimated。
- 按发布年份统计的估算占比（有智能分且标记非空；发布日期取 API）：

| 发布年份 | v4.3.2（9/23 目录） | v4.1（8/05 目录） |
|---|---:|---:|
| 2022 | 1/1 | 1/1 |
| 2023 | 19/19 | 19/19 |
| 2024 | 72/73 | 68/73 |
| **≤2024 合计** | **92/93 = 98.9%** | 88/93 = 94.6% |
| 2025 | 262/285 = 91.9% | 237/285 = 83.2% |
| 2026 | 142/286 = 49.7% | 78/199 = 39.2% |

## 4. 5a9d1：AA time per task 与「每任务输出 token ÷ 中位速度」

样本：v4.3.2 目录与 9/23 API 的交集，要求 `intelligenceIndexTimePerTask > 0`、`canonicalIntelligenceIndexTokenCount.output > 0`、API `median_output_tokens_per_second > 0`，共 **n = 150**。

| 比较（与 AA time per task，秒） | Spearman ρ | n |
|---|---:|---:|
| 输出 token 数 ÷ 原始中位速度（= 本项目「有效速度」的倒数方向） | **0.952** | 150 |
| API `median_end_to_end_response_time_seconds` | 0.747 | 150 |
| 1 ÷ 原始中位速度 | 0.595 | 150 |

- **数值支持的近似关系**：按 AA 自己的每任务耗时排名，「token 数 ÷ 速度」的排名几乎完全一致（ρ=0.952）。这支持「有效速度」回答「多久拿到答案」这一解读，也好于原始速度（0.595）。每任务 token = 总 token ÷ 任务数；当任务数对所有模型相同时，这个常数不影响秩相关。
- **比值不稳健，只能连同任务数假设一起写**：
  - time per task ÷ (每任务 token ÷ 速度) 这个比值与假设的任务数成正比。
  - 由 API `artificial_analysis_intelligence_index_cost.total_cost ÷ cost_per_task.total_cost` 推得的每模型任务数为 804–3794，中位数 1647（n=151）。
  - 任务数取中位数 1647 时，比值中位数为 **0.53**；各模型用自己的推算任务数时为 0.52（n=143）。
  - 要让比值恰为 0.95，需假设任务数约 2928。所以 5a9d1 的「比值约 0.95」不能当作事实写入。
- **未核实的耗时边界**：`intelligenceIndexTimePerTask` 是否包含 TTFT、工具调用或检索耗时、重试与排队，AA 没有公开说明，本调查也未核实。「有效速度」只按冗长度归一生成速度，不含 TTFT 与工具耗时（轴标题已写明）。

## 5. V-3：暂停网页抓取（D-12）的影响与免抓取替代指标

- 暂停抓取后，当期 token 数只能来自已缓存的 9/23 目录。9/23 之后上架的模型有 API 成本和速度，但没有当期 token，因此在两个「有效速度」口径（含默认口径）中**完全缺席**，只出现在两个原始速度口径里。
- 9/23 API 与 9/23 目录同日时，这一类是 0 个。
- **2026-10-02 补记（API 抓取于 2026-10-01T19:05Z，目录仍停在 9/23）**：
  - 这一类出现了 15 个，包括 Claude Sonnet 5.5 各档、GPT-6.1 Sol 各档、MiMo-V2.6-Flash 等。
  - 另有 11 个模型被 AA 在这 8 天内重评，目录智能分与 API 不再一致（一致率 97.1%），其目录 token 逐个降为非当期。默认口径里，10 个 9/22 发布的 GPT-6 Luna/Sol 档位因此成为历史口径点。
  - 目录 vs API 成本一致率降到 79.7%（n=148），只告警。
  - 这说明新模型发布后的头一两周目录最容易过期。
- CLI 结尾的新鲜度摘要会单列「N 个模型因暂停抓取缺当期 token（不在目录分区中），在有效速度口径缺席」及名单。数据列 `is_absent_from_accepted_embedded_model_catalog_partition` 已就位。
- 免抓取的替代指标是 API 原生的 `median_end_to_end_response_time_seconds`：覆盖 347/673 个模型，与 AA time per task 的 Spearman 为 0.747（n=150）。它低于 token 归一的 0.952，但高于原始速度的 0.595。它作为第三速度口径（F-6）和「最小化抓取」卡的候选，**未进入 Wave 1 实现**。

## 6. 2026-07-17 补记（吸收自 a0e79 任务，已改写）

a0e79 任务在 2026-07-17 复测时记录了以下事实。此处保留其中仍成立的部分，并更正「页面退化」的说法：

1. **Free 列表 API 不提供**「跑完 Intelligence Index 的输出 token 数」或 `intelligence_index_per_m_output_tokens`。9/23 缓存再次确认：API 中既没有 token 计数字段，`price_1m_blended_7_to_2_to_1` 也出现 0 次。
2. 无 Pro 订阅时，Pro 列表端点与 `language/models/{slug}` 都返回 **403**。**响应体未读到，不能据此断言 Pro schema 里也没有 token 字段**；开通后应先抽样确认。
3. `artificial_analysis_intelligence_index_cost.total_cost` 是美元成本，**不能**用 `$/M` 单价反推 token 数：成本里混有 input、cache 与 reasoning 的用量，缺少分解。
4. **更正：`/models` 列表页不是「退化」，而是 payload 改为 camelCase**。9/23 缓存中，旧的 snake_case 正则（`"intelligence_index_cost":{"total_cost"`、`"intelligence_index_per_m_output_tokens"`）命中 **0** 次，camelCase 的 `"intelligenceIndexCost":{` 命中 23 次。旧解析器因此返回空表，「锚点校验: 通过」却照常打印（P0-2）。现在列表页不再作为值来源，解析到 0 条时醒目告警；成本全部取自 API。
5. 新模型「有 API 成本和速度、却没有有效速度」：原因是缺 token 数，旧实现里还叠加了列表页 0 命中。a0e79 当时的修法是抓详情页 UI 文案「Output tokens from Intelligence Index」（如 `21M`）反推比值。现在改为读详情页**内嵌目录**的 `canonicalIntelligenceIndexTokenCount.output` 原始数，不经过 UI 文案，也不再用比值。缓存目录为 `data/raw/artificial_analysis_model_detail_page_html/`。
6. a0e79 的 curl 回退（绕开本机 LibreSSL 偶发 SSLEOF）没有移植，移交「最小化抓取」独立任务评估。本任务期间网页抓取默认暂停。

## 7. 7:2:1 混合单价（W1-7）

- API 中 `price_1m_blended_7_to_2_to_1` 出现 **0 次**。仓库 README 旧文「Pro API 原生字段为 …」不成立，已更正。
- 计算方式为 (7×cache-hit + 2×input + output)/10。缺 cache-hit 价时，按 AA 惯例用 input 价代替，即 (9×input + output)/10。与 AA 目录原生值比对，缺 cache-hit 的 178 个模型中有 168 个一致，其余差异来自 API 价格四舍五入。
- 来源记录在 `blended_price_cache_hit_price_source` 中，取值为 `computed_with_api_cache_hit_price` / `computed_with_input_price_as_cache_hit_price`；API 将来若出现原生字段，取值为 `artificial_analysis_api_native_blended_price`。
- 「无托管定价」的开源权重模型，API 给出 input=output=0 且没有 cache-hit 价，算出的 0 视为缺失（9/23 数据中 22 个）。
- 不采用目录原生值作为值来源：API 刷新后，目录价格会过期。目录值只用于核对。
