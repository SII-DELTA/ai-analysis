# Artificial Analysis 数据源调查索引

本文档目录记录当前项目对 Artificial Analysis 提供数据的取数链路、两个 API 端点差异、模型可用性漏斗、以及缺失维度模型的聚类分析。

调查时间：2026-07-02（初稿）；2026-09-30 补充调查（指数 v4.1→v4.3 重定标、内嵌模型目录、time per task，见下方新文档）。  
调查对象：当前仓库 `src/fetch_data.py`、`src/frontier.py`、`src/cli.py` 的实际行为，以及同日只读拉取的 Artificial Analysis API / 页面 payload。  
注意：Artificial Analysis 数据会随时间变化。文中的计数是调查时刻的快照，应作为数据源行为证据，而不是永久常量。

## 文档

- [2026-09 调查记录：智能指数 v4.1→v4.3 重定标、详情页内嵌模型目录与 time per task](artificial-analysis-intelligence-index-v4-3-recalibration-embedded-model-catalog-and-time-per-task-investigation-2026-09.md)
  - 重定标证据：缓存分区一致率 0.7% / 1.0% / 100%，同 UUID 智能分 99.7% 变化。
  - 内嵌目录字段表与覆盖率；`isEstimated` 的含义（只描述智能分）。
  - 5a9d1：time per task 与「token ÷ 速度」的 Spearman 0.952（n=150），比值依赖任务数假设。
  - V-3：暂停抓取的影响与 API `median_end_to_end_response_time_seconds` 替代指标（ρ=0.747）。
  - 吸收 a0e79 的 2026-07-17 补记：列表页 payload 改为 camelCase，snake_case 正则 0 命中。

- [端点差异与混合数据源策略](endpoint-difference-analysis.md)
  - 对比旧端点 `api/v2/data/llms/models` 与新端点 `api/v2/language/models/free`。
  - 记录模型集合、schema、字段覆盖率、值一致性、7:2:1 单价字段、KAT 模型缺失原因。
  - 给出较稳妥的 hybrid source-of-truth 策略。

- [可用模型漏斗与缺失维度模型聚类](available-model-and-missing-dimension-analysis.md)
  - 解释为什么 500 多个 API 模型最终只显示约 140 个。
  - 拆解默认图 `effective__effective` 下的缺失维度类型。
  - 按缺失字段、厂商、发布时间、模型命名/类型聚类。
  - 标注哪些缺失可以由旧端点、页面 payload 或 fallback 辅助恢复。

## 当前取数链路摘要

> 本节已按 2026-09-30 的实现更新；下方「关键结论」仍是 2026-07-02 初稿的调查结论。

当前实现的主入口是 `src/fetch_data.py` 的 `build_dataframe`：

1. **API**：优先请求 Pro 端点 `https://artificialanalysis.ai/api/v2/language/models`；当前 key 返回 403 时，自动回退 Free 端点 `https://artificialanalysis.ai/api/v2/language/models/free`。
   - 缓存为 `data/raw/api_language_models.json`，写入 `source_url`、`tier`、`intelligence_index_version`、`fetched_at_utc`。
   - 旧缓存没有抓取时间时，按缓存文件 mtime 推断，并如实标注「按缓存文件时间推断」。
   - 每次 `--refresh` 另存一份带时间戳的响应到 `data/raw/artificial_analysis_api_language_models_response_history/`；覆盖前先把旧缓存原样归档进同一目录。
   - 刷新得到的新响应先暂存，数据质量护栏全部通过后才替换共享缓存；护栏失败时旧缓存保持原样。
   - `--artificial-analysis-raw-data-directory` 可把全部原始数据读写改到别的目录（例如 scratch 副本），用于彩排刷新。
2. **网页抓取默认暂停（D-12）**：列表页和详情页只读已有缓存，缺失即跳过，不发网页请求；只有显式加 `--allow-artificial-analysis-website-page-fetch` 才会按需抓详情页。列表页已不是值来源，无论开关如何都只读缓存、不为它联网。
3. **详情页内嵌模型目录**：从 `data/raw/artificial_analysis_model_detail_page_html/` 离线解析。按「版本 family × 缓存日期」分区，只采用一个版本 family 与当期一致、与 API 的 UUID 交集带 token 记录 ≥ 50 的分区（当前为 9/23 的 v4.3.2；分区级智能分一致率只作诊断，< 99% 告警），用它提供输出 token 数、isEstimated、isReasoning、effort、release 与 time per task；其中 token 逐模型判定当期——该模型目录智能分与 API 一致才算当期，AA 已重评的降为非当期（R1-01 (a)）。
4. **值来源**：
   - 成本 `cost_to_run`：API `artificial_analysis_intelligence_index_cost.total_cost`（当期）→ 版本化快照（v4.1，非当期）→（仅显式开关 `--use-previous-run-processed-models-csv-as-fallback`）上次 `data/processed/models.csv`（版本未知，按非当期处理）。
   - 输出 token 数：被接受的目录分区（当期）→ 版本化快照（v4.1，非当期）→（同一开关）上次 models.csv。
   - 版本化快照：`data/reference/artificial_analysis_intelligence_index_v4_1_cost_to_run_and_canonical_output_token_count_fallback_snapshot_captured_2026_07_01.csv`。内容为 v4.1 口径，2026-07-01 采集，存原始 token 数（不再存比值）。上次 models.csv 作为回退需显式开关。
   - 每个值都带来源、所属指数版本与采集时间列（`*_value_source` / `*_value_intelligence_index_version` / `*_value_fetched_at_utc` / `*_value_is_from_current_intelligence_index_version`）。
   - 列表页 `https://artificialanalysis.ai/models` **不再是值来源**：payload 已改为 camelCase，snake_case 正则 0 命中，只在护栏里醒目告警。

默认图使用：

```text
z = intelligence
x = cost_to_run
y = eff_speed

output_mtokens = intelligence_index_canonical_output_token_count / 1e6
eff_speed      = output_speed / (output_mtokens / 归一常数[该 token 值的指数版本 family])
归一常数       = {"4.3": 87.0, "4.1": 21.0}（百万 token；各版本 token 中位数，固定值）
```

因此默认图需要同时具备：

```text
intelligence + cost_to_run + output_speed + intelligence_index_canonical_output_token_count
```

缺少其中任一关键输入，模型就无法进入默认三维 Pareto 候选集。成本或 token 来自非当期版本的模型照常显示，但不参与该口径的 Pareto 与各项分析（D-1），详见仓库 README。

## 关键结论

1. 新 Free 端点不是旧端点的等价替代。调查时旧端点返回 550 个模型，新 Free 端点返回 525 个模型，并且新 Free 端点是旧端点的严格子集。
2. KAT-Coder-Pro V1 / V2 仍存在于旧端点和 `/models` 页面 payload 中，但不在新 Free 端点模型清单中。因此当前实现以新 Free 端点为主表时，KAT 行在进入 DataFrame 前已经消失。
3. 新 Free 端点提供新版 Intelligence Index 相关分数，但也丢失了旧端点中的许多细分评测字段，尤其是 `artificial_analysis_math_index` 和多项 benchmark 子分数。
4. 新 Free 端点没有直接返回 `price_1m_blended_7_to_2_to_1` 成品字段。当前项目的 7:2:1 混合单价是用 `cache_hit/input/output` 三项价格计算出来的。
5. 约 140 个显示模型不是硬编码 top-N，而是“维度齐全漏斗 + Pareto/近期/层数剪枝”叠加后的结果。
6. 对于当前默认图，缺维度模型主要卡在 `cost_to_run`、`output_speed`、`intel_per_m_output` 三类字段。旧端点只能恢复很少一部分缺失的新速度字段，不能恢复 `cost_to_run` 或 `intel_per_m_output`。

## 建议维护原则

- 不要把 Free `language/models` 端点直接当作完整模型目录。
- 若要保留新版 Intelligence Index 语义，应把新端点作为 `intelligence` 及 index-linked 字段的一手来源。
- 旧端点可以作为模型目录和非新版 index 字段的补充来源，但应明确标注哪些字段来自旧口径。
- `cost_to_run` 取 API，缺失时用带版本号的回退快照；输出 token 数取被接受的内嵌目录分区。不要假设列表页 JSON 键仍可用（2026-09 起为 camelCase）；回退值必须带版本号，与当期值分开标注。
- 搜索和可视模型数量应在 UI 或生成日志中明确区分：
  - API available
  - 三维齐全
  - kept/displayed
  - Pareto

