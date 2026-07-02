# Available 模型漏斗与缺失维度模型聚类

调查时间：2026-07-02  
分析范围：当前代码实际使用的新 Free 端点结果，默认视图 `effective__effective`。  
默认视图含义：

```text
x = cost_to_run
y = eff_speed
z = intelligence
```

`eff_speed` 的输入链路：

```text
output_mtokens = intelligence / intel_per_m_output
eff_speed = output_speed / (output_mtokens / median(output_mtokens))
```

因此默认图至少需要：

```text
intelligence
cost_to_run
output_speed
intel_per_m_output
```

## Available、三维齐全、Displayed 的区别

调查时当前 key 对 Pro 端点返回 403，代码实际使用 Free 端点：

```text
selected_url = https://artificialanalysis.ai/api/v2/language/models/free
```

模型漏斗：

| 阶段 | 数量 | 含义 |
|---|---:|---|
| API available | 525 | Free API 返回的模型行数 |
| `intelligence` 非空 | 513 | 有新版 Intelligence Index |
| `cost_to_run` 非空 | 296 | 有运行完整 Intelligence Index 的成本 |
| `output_speed` 非空 | 294 | 有新端点 performance speed |
| `intel_per_m_output` 非空 | 378 | 有 verbosity / 输出 token 量侧度量 |
| `eff_speed` 非空 | 263 | 能算有效速度 |
| 默认三维齐全 | 251 | `intelligence + cost_to_run + eff_speed` 均非空 |
| 默认 displayed / kept | 约 143 | 三维齐全后再经过 Pareto/近期/层数剪枝 |

`kept` 的逻辑在 `src/frontier.py`：

```text
kept =
  has_all_required_dimensions
  AND (
    is_pareto
    OR (recent_within_since_months AND layer <= max_layers)
  )
  AND not_older_than_hard_age_cutoff
```

默认参数：

```text
since_months = 18
max_layers = 3
hard_age_cutoff_months = 36
```

所以约 140 个显示模型不是 top-N，而是：

1. 先排除缺维度模型。
2. 对三维齐全模型做 Pareto 分层。
3. 保留 Pareto 或近期且接近前沿的模型。
4. 硬剔除过旧模型。

## 默认缺维度总体情况

525 个 API available 模型中：

```text
默认三维齐全: 251
默认缺至少一个维度: 274
```

按默认三维字段看，缺失组合为：

| 缺默认维度组合 | 数量 | 说明 |
|---|---:|---|
| `cost_to_run + eff_speed` | 205 | 最大类，同时缺运行成本和有效速度 |
| `eff_speed` | 45 | 有智能和运行成本，但不能算有效速度 |
| `cost_to_run` | 12 | 只缺运行成本，最容易恢复 |
| `intelligence + cost_to_run + eff_speed` | 12 | 连新版 Intelligence 分数也缺 |

按根字段拆解：

| 根缺失组合 | 数量 |
|---|---:|
| `cost_to_run + output_speed + intel_per_m_output` | 108 |
| `cost_to_run + output_speed` | 70 |
| `output_speed` | 45 |
| `cost_to_run + intel_per_m_output` | 27 |
| `cost_to_run` | 12 |
| `intelligence + cost_to_run + output_speed + intel_per_m_output` | 8 |
| `intelligence + cost_to_run + intel_per_m_output` | 4 |

字段级 blocker 排序：

| 缺失字段 | 缺失模型数，占 274 缺维度模型 |
|---|---:|
| `output_speed` | 231 |
| `cost_to_run` | 229 |
| `intel_per_m_output` | 147 |
| `intelligence` | 12 |

## 按恢复难度聚类

| Cluster | 数量 | 恢复要求 |
|---|---:|---|
| 深度缺失：成本 + 速度 + verbosity | 116 | 需要同时补 `cost_to_run`、`output_speed`、`intel_per_m_output`，其中 8 个还缺 `intelligence` |
| 缺成本 + 新速度 | 70 | 需要补 `cost_to_run` 与 `output_speed` |
| 只缺新速度 | 45 | 需要补 `output_speed` |
| 缺成本 + verbosity | 31 | 需要补 `cost_to_run` 与 `intel_per_m_output`，其中 4 个还缺 `intelligence` |
| 只缺成本 | 12 | 只需补 `cost_to_run` 即可进入默认三维候选 |

### 旧端点可恢复性

旧端点对缺失维度的帮助有限：

- 在缺新 `output_speed` 的模型中，旧端点只有 8 个有正速度可补。
- 旧端点不提供 `cost_to_run`。
- 旧端点不提供 `intel_per_m_output`。

因此旧端点可以帮助恢复少量 speed gap，但无法解决主缺口。`cost_to_run` 和 `intel_per_m_output` 仍需要页面 payload、Pro endpoint、或版本化 fallback。

## 按 creator 聚类

缺默认维度最多的 creator：

| Creator | 缺维度模型数 | 主要缺口 |
|---|---:|---|
| Google | 41 | 成本、速度、verbosity |
| DeepSeek | 26 | 速度、成本、verbosity |
| Alibaba | 25 | 速度、成本、verbosity |
| Anthropic | 22 | 成本、速度、verbosity；部分新 reasoning 缺 intelligence |
| OpenAI | 22 | 成本、verbosity、速度；部分新/实时模型缺 intelligence |
| Mistral | 16 | 成本、verbosity |
| Meta | 11 | 成本、verbosity |
| xAI | 11 | 速度、成本 |
| IBM | 7 | 速度、成本 |
| Upstage | 7 | 速度、成本 |

解释：

- 这不是简单的厂商质量排名。大厂模型数量多、reasoning/effort 档位多、旧模型多，天然更容易出现在缺失列表里。
- 需要看缺失字段类型，而不是只看 creator 总数。

## 按发布时间聚类

| Release bucket | 缺维度数 | 特征 |
|---|---:|---|
| `<=2024` | 82 | verbosity 缺失尤其严重，很多旧模型缺 `intel_per_m_output` |
| `2025 H1` | 70 | 成本、速度、verbosity 都较缺 |
| `2025 H2` | 72 | 成本和速度缺失多，verbosity 明显改善 |
| `2026+` | 50 | 主要是新模型缺成本/速度；缺 intelligence 的模型集中在这一段 |

可解释模式：

- 旧模型常缺新版 verbosity 或成本回填。
- 新模型常有新版 index 框架痕迹，但 cost/speed/verbosity 尚未齐全。
- 最新 high effort / adaptive reasoning 档位可能有速度或价格，但暂无正式 Intelligence Index 分数。

## 按模型形态聚类

基于模型名称做粗粒度规则分类：

| 模型形态 | 缺维度数 | 主要缺口 |
|---|---:|---|
| general/other | 122 | 成本、速度、verbosity |
| reasoning/effort variant | 94 | 速度、成本；缺 intelligence 的模型主要在这里 |
| small/open-weight size-labeled | 33 | 成本、速度 |
| coding-specialized | 10 | 全部缺成本，部分缺速度/verbosity |
| preview/experimental | 9 | 几乎全缺成本、速度、verbosity |
| multimodal/vision-ish | 6 | 全缺成本，部分缺 speed/verbosity |

注意：这是启发式分类，不是 AA 官方 taxonomy。它用于定位数据缺口类型，而不是产品分类。

## 典型缺失模式

### 1. 只缺成本

数量：12

代表：

- `Claude Sonnet 5 (Non-reasoning, High Effort)`
- `Gemma 4 31B (Reasoning)`
- `Command A+`
- `North Mini Code`
- `LFM2.5-VL-1.6B`

这些模型已有 intelligence、speed、verbosity。只要补 `cost_to_run`，就能进入默认三维候选集。

### 2. 只缺新速度

数量：45

代表：

- `Qwen3 0.6B (Non-reasoning)`
- `Qwen3 0.6B (Reasoning)`
- `Qwen3 Max Thinking`
- `Nova Pro`
- `Nova 2.0 Omni`

这些模型已有 cost 和 verbosity，但新端点没有正 `performance.median_output_tokens_per_second`。旧端点只恢复其中少数模型的 speed，因此主要仍依赖 AA 更新 performance 数据。

### 3. 缺成本 + 新速度

数量：70

代表：

- `Qwen3 VL 4B`
- `Claude 3.7 Sonnet (Reasoning)`
- 多个 IBM / LG / Upstage / Liquid AI 模型

这些模型有 verbosity，但没有 cost 和 speed。补旧端点通常不够，至少还需要 `cost_to_run` 来源。

### 4. 缺成本 + verbosity

数量：31

代表：

- `Jamba 1.6 Large`
- `Qwen2.5 Turbo`
- `QwQ 32B`
- `Claude 4.1 Opus`
- `DeepSeek R1 Distill Llama 70B`

这些模型可能有 speed，但不能算有效速度，因为缺 `intel_per_m_output`。若只切到 raw speed，仍会因为缺 `cost_to_run` 被默认有效成本图排除。

### 5. 深度缺失

数量：116

代表：

- 旧 Qwen Chat / Qwen1.5 / Qwen2 系列
- Jamba 1.5 系列
- 部分 Perplexity / Cohere / OpenAI realtime / experimental 模型
- 部分 2026+ 高 effort 但尚未完整评测的模型

这些模型通常缺多个关键维度，短期不适合强行纳入三维 Pareto 图。

## 与搜索不可见的关系

当前前端搜索索引只包含 `kept` 模型，也就是已显示模型。缺维度模型不会进入 Pareto 分层，也不会进入 `kept`，因此也不会被搜索命中。

这意味着用户看到“搜索不到某模型”可能有三种完全不同原因：

1. 模型不在当前 API 主表里。
2. 模型在 API 主表里，但缺默认三维字段。
3. 模型三维齐全，但被 Pareto/近期/层数剪枝排除。

当前 KAT V2 属于第 1 类。许多其他模型属于第 2 类。旧模型或离前沿较远模型可能属于第 3 类。

## 建议的生成日志

为了避免误解，应在生成时输出以下漏斗：

```text
API available rows
source endpoint selected
intelligence coverage
cost_to_run coverage by source
output_speed coverage
intel_per_m_output coverage by source
dimension complete count by metric variant
kept/displayed count by metric variant
drop_reason count by metric variant
important missing models by configured watchlist
```

建议把 drop reason 拆得更细：

```text
missing_intelligence
missing_cost_to_run
missing_output_speed
missing_intel_per_m_output
pruned_far_from_frontier
pruned_outside_soft_recency_window
pruned_by_hard_age_cutoff
```

当前 `drop_reason = 缺维度` 太粗，无法解释模型为什么不可见。

