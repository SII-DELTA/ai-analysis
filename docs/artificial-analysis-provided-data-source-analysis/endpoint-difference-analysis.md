# Artificial Analysis API 端点差异分析

调查时间：2026-07-02  
粒度：每行一个 Artificial Analysis 模型 UUID。  
对比端点：

```text
旧端点：
https://artificialanalysis.ai/api/v2/data/llms/models

新 Pro 端点：
https://artificialanalysis.ai/api/v2/language/models

新 Free 端点：
https://artificialanalysis.ai/api/v2/language/models/free
```

当前项目代码优先请求新 Pro 端点；当前 key 对 Pro 端点返回 403 后，实际使用新 Free 端点。

## 当前访问结果

| 端点 | 当前状态 | 返回模型数 | 备注 |
|---|---:|---:|---|
| 旧 `data/llms/models` | 200 | 550 | 非分页，旧 schema |
| 新 `language/models` | 403 | 0 | 当前 key 无 Pro 权限 |
| 新 `language/models/free` | 200 | 525 | 分页，当前代码实际使用 |

集合关系：

```text
old_ids = 550
new_free_ids = 525
common_ids = 525
old_only_ids = 25
new_only_ids = 0
```

这说明新 Free 端点在调查时是旧端点的严格子集，而不是等价替代。

## 旧端点中存在但新 Free 端点缺失的模型

旧端点比新 Free 端点多 25 个模型。按 creator 聚合：

| Creator | old-only 模型数 |
|---|---:|
| Allen Institute for AI | 10 |
| Nous Research | 7 |
| KwaiKAT | 2 |
| ServiceNow | 2 |
| Trillion Labs | 2 |
| Deep Cogito | 1 |
| Naver | 1 |

其中 KwaiKAT 的两个模型是：

| id | slug | name |
|---|---|---|
| `fb112343-c82c-4b43-afea-996bd5101d62` | `kat-coder-pro-v1` | `KAT-Coder-Pro V1` |
| `fc4223e8-4586-4ca1-97ca-bb55ff586947` | `kat-coder-pro-v2` | `KAT Coder Pro V2` |

这两个模型仍在旧端点中，并且当前 `/models` 页面 payload 中也能找到。当前图找不到它们的直接原因是：当前实现以新 Free 端点为模型主表，新 Free 端点不返回这两个模型。

## Schema 差异

### Top-level 字段

旧端点 top-level：

```text
evaluations
id
median_output_tokens_per_second
median_time_to_first_answer_token
median_time_to_first_token_seconds
model_creator
name
pricing
release_date
slug
```

新 Free 端点 top-level：

```text
artificial_analysis_intelligence_index_cost
evaluations
id
model_creator
name
performance
pricing
release_date
slug
```

主要变化：

- 新端点把性能字段移入 `performance`。
- 新端点新增 `artificial_analysis_intelligence_index_cost`，但覆盖很低。
- 旧端点 `model_creator` 含 `slug`，新 Free 端点的 `model_creator` 只有 `id/name`。
- 旧端点有更多 benchmark 细项。

### Evaluation 字段

旧端点 `evaluations` 字段：

```text
aime
aime_25
artificial_analysis_coding_index
artificial_analysis_intelligence_index
artificial_analysis_math_index
gpqa
hle
ifbench
lcr
livecodebench
math_500
mmlu_pro
scicode
tau2
tau_banking
terminalbench_hard
terminalbench_v2_1
```

新 Free 端点 `evaluations` 字段：

```text
artificial_analysis_agentic_index
artificial_analysis_coding_index
artificial_analysis_intelligence_index
```

含义：

- 新 Free 端点更像新版指数 API 的精简视图。
- 如果需要新版 Intelligence Index 口径，应使用新端点的 `artificial_analysis_intelligence_index`。
- 如果需要 Math Index 或 benchmark 细分项，新 Free 端点不足，旧端点更完整。

### Performance 字段

旧端点：

```text
median_output_tokens_per_second
median_time_to_first_answer_token
median_time_to_first_token_seconds
```

新 Free 端点：

```text
performance.median_end_to_end_response_time_seconds
performance.median_output_tokens_per_second
performance.median_time_to_first_answer_token_seconds
performance.median_time_to_first_token_seconds
```

注意：共同 ID 上的 speed 值不是简单字段迁移。调查时两端点同时有正 `median_output_tokens_per_second` 的 294 个模型中，294 个值都不完全相同：

| 指标 | 数值 |
|---|---:|
| 同时有正速度的共同模型 | 294 |
| 中位相对绝对差 | 6.84% |
| P90 相对绝对差 | 23.38% |
| 大于 20% 差异的模型 | 38 |
| 最大相对绝对差 | 117.83% |

因此，新端点 performance 可能是新版测量快照、不同 provider 口径、或不同聚合方式，不能在没有产品决策的情况下直接替换旧端点速度。

### Pricing 字段

旧端点 `pricing` 字段：

```text
price_1m_blended_3_to_1
price_1m_input_tokens
price_1m_output_tokens
```

新 Free 端点 `pricing` 字段：

```text
price_1m_cache_hit_tokens
price_1m_cache_write_tokens
price_1m_input_tokens
price_1m_output_tokens
```

字段覆盖率：

| 字段 | 旧端点非空 | 新 Free 非空 |
|---|---:|---:|
| `pricing.price_1m_input_tokens` | 550 | 382 |
| `pricing.price_1m_output_tokens` | 550 | 382 |
| `pricing.price_1m_blended_3_to_1` | 550 | 0 |
| `pricing.price_1m_cache_hit_tokens` | 0 | 186 |
| `pricing.price_1m_cache_write_tokens` | 0 | 47 |
| `pricing.price_1m_blended_7_to_2_to_1` | 0 | 0 |

重要结论：新 Free 端点没有直接返回 `price_1m_blended_7_to_2_to_1` 成品字段。当前项目的 7:2:1 单价来自以下计算：

```text
7:2:1 = (7 * cache_hit + 2 * input + output) / 10
```

该计算只能覆盖同时具备 cache-hit、input、output 三项价格的模型。调查时新 Free 端点中可计算 7:2:1 的模型约 186 个，且正值约 179 个。

## 共同字段一致性

共同 525 个模型中：

| 逻辑字段 | 两端点一致性 |
|---|---|
| `id` | 完全一致 |
| `name` | 完全一致 |
| `slug` | 完全一致 |
| `creator.name` | 完全一致 |
| `release_date` | 共同非空时一致 |
| `artificial_analysis_intelligence_index` | 共同非空时一致 |
| `artificial_analysis_coding_index` | 共同非空时一致 |
| `price_1m_input_tokens` | 多数一致，少量差异最大约 0.005，像四舍五入 |
| `price_1m_output_tokens` | 多数一致，少量差异最大约 0.005，像四舍五入 |
| `median_output_tokens_per_second` | 明显不一致，不应视为同一字段简单迁移 |

## Cost to Run 覆盖

旧端点不提供 `artificial_analysis_intelligence_index_cost.total_cost`。

新 Free 端点提供：

| 字段 | 新 Free 非空 | 新 Free 正值 |
|---|---:|---:|
| `artificial_analysis_intelligence_index_cost.total_cost` | 75 | 73 |

当前项目仍需要页面 payload / fallback 来补齐大部分 `cost_to_run`。

## KAT-Coder-Pro V2 案例

`KAT Coder Pro V2` 的状态：

- 旧端点存在。
- 当前 `/models` 页面 payload 中存在。
- 新 Free 端点不存在。
- 当前版本化 fallback snapshot 不包含它。
- 当前页面 payload 对它没有解析器需要的 `intelligence_index_cost.total_cost` / `intelligence_index_per_m_output_tokens`。

因此当前实现以新 Free 端点为主表时，KAT V2 根本不会进入 DataFrame；即便恢复旧端点作为主表，也还需要成本和 verbosity 的有效 fallback，才能进入默认 `effective__effective` 三维图。

## 建议的 source-of-truth 分层

若目标是保留新版 Intelligence Index 口径，同时避免模型目录缩水，建议采用分层数据源：

| 字段族 | 建议来源 | 理由 |
|---|---|---|
| 模型主目录 `id/slug/name/creator/release_date` | 旧端点为主，新端点校验 | 旧端点覆盖更全，新 Free 是严格子集 |
| 新版 `artificial_analysis_intelligence_index` | 新端点为主 | 用户判断其对应新版指数公式，应作一手来源 |
| `artificial_analysis_coding_index` / `agentic_index` | 新端点为主，旧端点补充需标注 | 新端点是新版 schema，但覆盖更少 |
| Math Index 与 benchmark 细项 | 旧端点补充 | 新 Free 基本不提供 |
| `output_speed` / TTFT | 需要产品决策 | 旧/新值差异明显，不能无声替换 |
| `cost_to_run` | 新端点优先，页面 payload/fallback 补齐 | 新端点覆盖太低 |
| `intel_per_m_output` / verbosity | 页面 payload/fallback | 当前 Free API 不直接提供 |
| 7:2:1 混合单价 | 新端点 cache-hit/input/output 派生 | 新端点没有成品字段，覆盖有限 |

## 自动化检查建议

每次刷新数据时建议输出或测试以下指标：

```text
old_endpoint_rows
new_free_endpoint_rows
common_id_count
old_only_id_count
new_only_id_count
new_endpoint_pro_accessible
new_intelligence_coverage
cost_to_run_coverage_by_source
intel_per_m_output_coverage_by_source
output_speed_coverage_by_source
dimension_complete_count_by_metric_variant
kept_count_by_metric_variant
```

特别需要加一个 guard：当 `old_only_id_count` 中出现历史 Pareto 或用户关心的厂商时，生成日志应明确 warning，而不是静默消失。

