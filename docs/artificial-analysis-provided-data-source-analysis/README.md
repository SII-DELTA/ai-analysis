# Artificial Analysis 数据源调查索引

本文档目录记录当前项目对 Artificial Analysis 提供数据的取数链路、两个 API 端点差异、模型可用性漏斗、以及缺失维度模型的聚类分析。

调查时间：2026-07-02  
调查对象：当前仓库 `src/fetch_data.py`、`src/frontier.py`、`src/cli.py` 的实际行为，以及同日只读拉取的 Artificial Analysis API / 页面 payload。  
注意：Artificial Analysis 数据会随时间变化。文中的计数是调查时刻的快照，应作为数据源行为证据，而不是永久常量。

## 文档

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

当前实现的主 API 入口在 `src/fetch_data.py`：

1. 优先请求 Pro 端点 `https://artificialanalysis.ai/api/v2/language/models`。
2. 当前 key 对 Pro 端点返回 403 时，自动回退 Free 端点 `https://artificialanalysis.ai/api/v2/language/models/free`。
3. 从 API 行构建模型主表。
4. 从 `https://artificialanalysis.ai/models` 页面 payload 解析：
   - `intelligence_index_cost.total_cost`
   - `intelligence_index_per_m_output_tokens`
5. 对页面缺失的成本与 verbosity 字段，依次回退：
   - 本地上次 `data/processed/models.csv`
   - 版本化 `data/reference/artificial_analysis_intelligence_index_cost_and_output_token_fallback_snapshot.csv`

默认图使用：

```text
z = intelligence
x = cost_to_run
y = eff_speed

eff_speed = output_speed / relative_verbosity
relative_verbosity = output_mtokens / median(output_mtokens)
output_mtokens = intelligence / intel_per_m_output
```

因此默认图需要同时具备：

```text
intelligence + cost_to_run + output_speed + intel_per_m_output
```

缺少其中任一关键输入，模型就无法进入默认三维 Pareto 候选集。

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
- `cost_to_run` 与 `intel_per_m_output` 当前仍应保留页面 payload / fallback 机制。
- 搜索和可视模型数量应在 UI 或生成日志中明确区分：
  - API available
  - 三维齐全
  - kept/displayed
  - Pareto

