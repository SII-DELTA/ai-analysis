# AA 三维前沿：智能 × 速度 × 有效运行成本

Artificial Analysis（AA）官网的模型对比图基本都是二维，唯独缺一张**三维**图——
把 **智能、速度、有效运行成本** 三个维度放在一起看，并找出三维 **Pareto 前沿**：
不存在「更便宜、更快且更聪明」的其他模型的那批模型。

本项目把这张图做出来，产出一个**可旋转的自包含交互式 HTML**。生成产物默认写入
`output/frontier_3d.html`，同时写出供前端复渲染的
`output/frontier_3d_visualization_dataset.json`；`output/` 与 `data/processed/` 是本地生成目录，
不纳入版本控制。

数据：[Artificial Analysis](https://artificialanalysis.ai/)。页面页头带「数据：Artificial Analysis ↗」署名链接，
并注明 API 抓取日期与智能指数版本（AA 免费 API 要求署名）。

## 扩展分析

- [OpenAnalysis.ai：开发 agent、插件与 skill 生态初步调查](docs/openanalysis-agent-harness-plugin-skill-ecosystem-investigation/)（含 token 效率、交互体验、公开评测与首批基线候选）
- [AI 智能增长趋势与经济影响分析](docs/artificial-analysis-intelligence-growth-and-economic-impact-analysis/)
- [Artificial Analysis 数据源调查](docs/artificial-analysis-provided-data-source-analysis/)（含 2026-09 的指数重定标、内嵌模型目录与 time per task 调查）
- [三维 Pareto 前沿可视化：全面审计与改进路线图（2026-09-30）](docs/frontier-3d-pareto-visualization-full-audit-and-improvement-roadmap-2026-09-30/)

## 三个维度与数据口径

| 维度 | 来源 | 版本 | 回退策略 | 字段 |
|---|---|---|---|---|
| **智能**（z 轴） | AA API | 当期（z 轴标题写明版本，如 `AA Intelligence Index v4.3.2`） | 无回退；缺失即不上图 | `evaluations.artificial_analysis_intelligence_index` → `intelligence` |
| **有效运行成本**（x 轴，默认） | AA API `artificial_analysis_intelligence_index_cost.total_cost` | API 值一律为当期 | 版本化快照（v4.1，2026-08-04 缓存单批提取，**非当期**）；上次 `data/processed/models.csv` 仅在显式开关 `--use-previous-run-processed-models-csv-as-fallback` 时读取（版本未知，按非当期处理） | `cost_to_run`，溯源列 `cost_to_run_value_source` / `…_intelligence_index_version` / `…_fetched_at_utc` / `…_is_from_current_intelligence_index_version` |
| **7:2:1 混合单价**（x 轴，可选） | AA API 分项单价计算 | 与指数版本无关 | 缺 cache-hit 价时按 AA 惯例用 input 价代替；缺 input 或 output 则缺失 | `blended_price_cache_input_output_7_to_2_to_1`，来源列 `blended_price_cache_hit_price_source` |
| **有效速度**（y 轴，默认） | 原始速度取 AA API；输出 token 数取详情页内嵌模型目录（被接受的分区） | token 数按其所属版本分别归一 | token 数回退到版本化快照（v4.1，非当期）；同上的显式开关 | `eff_speed`，由 `output_speed` 与 `intelligence_index_canonical_output_token_count` 派生；溯源列 `output_token_count_value_*` |
| **原始速度**（y 轴，可选） | AA API | 与指数版本无关 | 无回退 | `performance.median_output_tokens_per_second` → `output_speed` |
| **任务速度**（y 轴，可选） | 可核对当期的目录智能指数任务耗时 | UUID、智能分及指数版本均须相符 | 无回退；缺证时保持未知，API 端到端延迟独立展示 | `intelligence_index_tasks_per_hour = 3600 / artificial_analysis_intelligence_index_time_per_task_seconds`，单位任务/小时 |

- 成本与 token 数的回退快照：
  `data/reference/artificial_analysis_intelligence_index_v4_1_single_batch_cost_and_output_token_fallback_snapshot_captured_2026_08_04.csv`
  （v4.1 口径，存原始 token 数；从 8/4 的无冲突完整批次提取，时间按缓存 mtime 推断。7/1 旧快照保留供追溯，不再默认使用）。
- 回退值**照常显示，但不参与该口径的分析**，见下「显示但不参与分析（D-1）」。
- 非正的成本、速度或混合价一律视为缺失，排除出三维前沿。例如无托管定价的开源权重模型，AA 把价格占位为 0，既不是真「免费」，也无法在对数轴上表示。
- `/models` 列表页**不再是值来源**：其 payload 已改为 camelCase，旧的 snake_case 解析 0 命中，只在护栏里醒目告警。
- **内嵌目录分区的接受与逐模型当期判定（R1-01 (a)）**：详情页缓存按「(页面指数版本 family, 缓存 mtime 的 UTC 日期)」分区。
  分区被接受的条件只有三条：版本 family 与当期一致（API 版本已知时与 API 比；未知时推定为与 API 智能分一致率最高的分区的 family）、
  页面结构有效、与 API 的 UUID 交集里带 token 的记录 ≥ 50 条；多个合格时只用 mtime 最新的一个，被接受分区内同一 UUID 跨页冲突直接报错。
  分区级智能分一致率**不再是门槛**，只作诊断量记录，低于 99% 时告警。被接受分区里，某个模型的目录 token 只有在该模型的目录智能分与
  当期 API 智能分一致（差 ≤ 0.05）时才算当期；不一致（AA 已重评）的降为非当期——值来源仍记目录、版本如实写，
  `output_token_count_value_non_current_reason_code` 记 `output_token_count_value_catalog_intelligence_disagrees_with_current_api_intelligence`，
  它在有效速度口径里按历史口径点显示、不参与分析。同日数据（9/23 目录 + 9/23 API）下 166 个当期 token 全部保留；
  相隔 8 天（9/23 目录 + 10/01 API）时 AA 已重评 11 个模型，它们的目录 token 降为非当期，当期 token 为 155 个。

> 关键：成本轴是 **“Cost to Run Artificial Analysis Intelligence Index”**（跑完整套评测的实测美元花费），
> **不是**每百万 token 的混合价（\$/M）。

### 成本口径：有效运行成本，且为何不用套餐折算

成本轴 `cost_to_run` 是 **“Cost to Run Intelligence Index”**——跑完整套评测**实际烧掉的 token 数 ×
各档 token 单价**。它**已按各模型真实 token 消耗（含冗长输出与不可见的思维链 / reasoning token）加权**，
因此本质是一种**有效成本**：同样跑完一套任务，冗长的推理模型烧更多 token，也就更贵。这与下面的「有效速度」轴是**同一冗长度信号的两个投影**——成本轴看
「冗长让你多花多少钱」，有效速度轴看「冗长让你多等多久」。所以它**不是**每百万 token 牌价（\$/M）。

> **为什么底层单价用 API 牌价，而非编程/订阅套餐（Claude Max、ChatGPT Plus、Cursor、Copilot…）的折算价？**
> 两条原因（均来自一次专项调研）：
> 1. **没有可靠的公开数据**：套餐有效成本目前只有第三方估算博客与盈亏平衡计算器，无权威、机读、持续更新的
>    数据集；套餐底层 per-token 计量不公开、限流频繁变动、有效成本高度依赖「使用强度假设」。
> 2. **与速度轴不可比**：本图的速度来自 AA 在 **pay-per-token API 端点** 上的实测；套餐走的是另一条服务
>    路径（不同限流、可能不同量化/路由），其成本无法与 API 实测速度拼到同一行——强行混用 ＝ 把两条服务
>    路径的数据缝在一起，失去物理意义。
>
> 故成本轴保持在「API 牌价上的实际 token 花费」这一与速度**同源、可比**的口径。（注：OpenRouter 等
> 跨供应商聚合，给的也只是不同供应商的 **API** 牌价，仍非套餐口径，故同样未采用。）

### 默认速度口径：有效速度（按冗长度归一的生成速度）

原始 `tok/s` 衡量的是 token 流的**吞吐**，不是“多久拿到完整答案”。同一套评测下，各模型的输出
token 量（**冗长度**）相差可达两个数量级，推理模型尤其冗长：一个 tok/s 很高但极其冗长的模型，拿到完整答案
可能远慢于一个 tok/s 较低但简洁的模型。为此默认使用**有效速度**轴：

```
冗长度   output_mtokens = intelligence_index_canonical_output_token_count / 1e6
         （跑完整套智能指数的输出 token 原始数，取自详情页内嵌模型目录，单位：百万）
有效速度 eff_speed      = 原始速度 ÷ (冗长度 / 归一常数[该 token 值的指数版本 family])
归一常数（百万 token，固定值）= {"4.3": 87.0, "4.1": 21.0}（各版本 token 中位数）
```

- 轴标题：「有效速度（按冗长度归一的生成速度，不含 TTFT 与工具耗时） tok/s（对数）」；工具栏按钮等短标签仍写「有效速度」。
- 归一常数只缩放坐标轴，不改变同一版本内的排名与 Pareto 关系；它按指数版本分别固定并写入数据契约。跨版本的速度不可比，由 D-1 排除出分析来保证。
- token 数的版本未知或不在常数表中时，`eff_speed` 为缺失，并汇总告警一次。
- 旁证（5a9d1，9/23 目录）：按 AA 自己的每任务耗时 `intelligenceIndexTimePerTask`（秒）排名，「token 数 ÷ 速度」的 Spearman 为 0.952（n=150），原始速度只有 0.595。详见数据源调查。
- 页面内可随时切换为原始速度；`--speed-metric raw` 可指定 HTML 初始口径。

> **取舍（为何两者并存，默认有效速度）**：有效速度把「冗长度」同时灌进了速度轴与成本轴（有效运行成本
> 也按 token 消耗加权），会提高速度与成本、智能两轴的相关性，削弱三维的正交性，点云更扁。原始速度回答
> 「流式响应有多跟手」，有效速度回答「多久拿到答案」：两个真实但不同的问题，故二者并存；本项目默认用有效速度，
> 原始速度作为可切换口径。

### 可选成本口径：7:2:1 混合单价

页面内可把有效运行成本替换为 AA 推荐的每百万 token 混合单价：

```text
7:2:1 混合单价 = (7 × cache-hit 单价 + 2 × input 单价 + output 单价) / 10
缺 cache-hit 单价时（AA 惯例用 input 代替）= (9 × input 单价 + output 单价) / 10
```

- 由 API 的 `price_1m_cache_hit_tokens`、`price_1m_input_tokens`、`price_1m_output_tokens` 计算。
  AA API（含本项目使用的 Free 端点）**不返回**成品字段 `price_1m_blended_7_to_2_to_1`：9/23 缓存中出现 0 次。代码仍保留「若 API 将来出现该字段则优先采用」的分支。
- 每个值的来源记在 `blended_price_cache_hit_price_source`：`computed_with_api_cache_hit_price`、`computed_with_input_price_as_cache_hit_price`、`artificial_analysis_api_native_blended_price`，或 `None`（缺失）。
- 详情页内嵌目录也有 AA 原生混合价，但 API 刷新后它会过期，所以只用于核对，不作为值来源。
  核对结果：缺 cache-hit 的模型中，与 (9×input+output)/10 一致的有 168/178，其余差异来自 API 价格四舍五入。

## 方法学：前沿、剪枝与「显示但不参与分析」

- **方向约定（更优）**：智能 ↑、成本 ↓、速度 ↑。
- **3D Pareto 支配**：`A 支配 B` ⟺ 三维均不劣且至少一维严格优。
- **Pareto 分层（skyline peeling）**：第 1 层 = 非支配集（**Pareto 前沿**），剥离后重复；
  层号即“离前沿的距离”。
- **前沿线框 / 实心面（视觉导引）**：把分析层第 1 层的点投影到 **(log 成本, log 速度) 平面**（各轴归一化）上做
  Delaunay 三角化，再按 z = 智能抬起。它是 Pareto 点之间的**邻接插值，仅作视觉导引**：三角面内部不是可达的模型，
  也不保证单调；按支配方向判定，有相当比例的三角面是「反向面」。默认以线框呈现，可一键切换半透明实心面。
  「在给定预算下能达到多高智能」请看下面的可达前沿曲面。
- **可达前沿曲面（可选副视图）**：`F(成本预算 c, 速度下限 s) = max{智能 | cost≤c 且 speed≥s}`，
  单调阶梯面，可从顶部工具栏独立开启。
- **剪枝（均衡档，默认）**：剔除**过旧**与**离前沿太远**的模型：
  `保留 = 三维齐全 ∧ (分析 Pareto 点 ∪ 显示 Pareto 点 ∪ (近 since-months 月 ∧ (显示层号 ≤ layers ∨ 分析层号 ≤ layers)) ∪ 发布宽限内的模型)`，
  再减去早于 `hard-age-cutoff-months` 的“远古”模型（即便 Pareto 最优）。
  **近期发布宽限默认 6 个日历月**，包含起止日期，结束日为剪枝参考日；无日期或晚于参考日的模型不享受宽限。
  宽限只放开离前沿距离，不能补回缺维；历史口径点同样享受显示宽限，继续退出全部分析计算。
  `--recent-release-grace-period-months 0` 恢复原剪枝集合，且不把宽限专属点写进契约。
  页面“模型标识”里的开关默认开启，只控制**仅因宽限才保留**的点，原本可显示的近期模型不受它影响。
  生成时，新增的当期宽限点加入现有 `kept ∧ analysis eligible` 突出度与归一化计算集合，部分突出度数值可能变化；
  Pareto 分层在剪枝前完成，宽限不改变层级。页面开关只筛选显示，不重算分析、坐标范围或相机。
  「分析层号 ≤ layers」一项保证参与分析的点是否上图只由参与分析的点决定（D-1：历史口径点不得把当期可比的
  近前沿点挤出显示）；对参与分析的点，显示层号 ≤ layers 蕴含分析层号 ≤ layers，所以它只会多保留、不会少保留。
  9/23 数据上默认口径因此多显示 10 个当期点（只按显示层号是 107，现为 117）。
  剪枝参考日期缺省取 **API 抓取日期**（不是运行当天），可用 `--pruning-reference-date` 指定。
  所有阈值均可调（见下）。每个未上图模型的原因写在数据契约的 `excluded_models_with_drop_reason`
  中（缺维度：成本 / 速度 / 智能、过旧(硬截断)、过旧(软窗外且非前沿)、离前沿太远、发布日期缺失且非前沿）。
  宽限新增点的 `drop_reason` 仍为“保留”；被页面开关隐藏不等于被生成时剪枝，不进入剔除名单。

### 显示但不参与分析（D-1）

AA 在 2026-08-14 到 09-23 之间把智能指数从 v4.1 重定标到 v4.3。缺当期成本或 token 数的模型只能用 v4.1
回退值，与当期智能分不是同一口径。规则如下：

1. **按口径、按值来源判定是否参与分析**：只看该口径**实际用到的字段**是否来自当期指数版本
   （`*_value_is_from_current_intelligence_index_version`），不看 `isEstimated`（它只表示智能分是否估算）。

   | 口径 key | 成本列 | 速度列 | 参与分析的条件 |
   |---|---|---|---|
   | `effective__effective`（默认） | `cost_to_run` | `eff_speed` | 成本当期 **且** token 数当期 |
   | `effective__raw` | `cost_to_run` | `output_speed` | 成本当期 |
   | `blended__effective` | 混合单价 | `eff_speed` | token 数当期 |
   | `blended__raw` | 混合单价 | `output_speed` | 恒参与（单价与原始速度与指数版本无关） |
   | `effective__tasks_per_hour` | `cost_to_run` | 任务/小时 | 成本当期 **且** 任务耗时可核对当期 |
   | `blended__tasks_per_hour` | 混合单价 | 任务/小时 | 任务耗时可核对当期 |

2. **照常显示，但退出全部分析计算**：
   - 显示层（`display_layer`）在全部三维齐全点（含历史口径点）上剥层；历史口径点按显示层号决定去留，
     当期点另按分析层号保留（见上「剪枝」），所以点云比只按显示层号剪枝时略大；
   - 分析层（`layer` / `is_pareto`）只在参与分析的点上剥层；
   - Pareto 前沿、线框、实心面、可达面、归一化范围、趋势拟合、智能抬升对照集、超体积、垂距与四个突出度，
     都只用「显示且参与分析」的点。不参与分析的点，其层号与突出度为空。
3. **历史口径点的样式**：半透明虚线底板加半透明 Logo。tooltip 显示「Pareto 层：不参与（历史口径）」并注明原因，
   如「历史口径（v4.1 成本/冗长度），不参与本口径前沿计算」；pin 卡为虚线卡片并附原因。
4. **「仅当期可比」开关**（工具栏「模型标识」组）：开启后隐藏历史口径点，它们也不可悬浮或点击；切换口径后开关状态保持。
5. 页头与「当前视图」显示历史口径点数与参与分析数；契约每个口径另有 `analysis_eligible_model_count`
   与 `historical_version_value_model_count`。

## 突出度指标：一个 SOTA 模型比前沿趋势领先多少

Pareto 层号只回答「在不在前沿」，不回答「有多突出」。这里给**四个互补的连续标量**度量
「一个前沿(SOTA)模型比其余 Pareto 最优构成的**趋势**领先多少」，页面右上「突出度」面板里用
**指标选择器**切换：选中的口径同时驱动 **突出度光晕的大小（按秩映射）** 与下方
**前沿排行榜**。四指标一律在当前口径「显示且参与分析」的点上计算，前沿与图上一致。

| 口径 | 定义 | 轴对称？ |
|---|---|---|
| **趋势残差**（默认头牌） | 在前沿点上二次多项式最小二乘拟合趋势面 `Î=trend(log成本, 速度)`，取 `智能 − 趋势面`。最贴「stands out from the trend」。 | 否（沿智能轴量） |
| **智能抬升（留一）** | `智能(M) − max{智能(j): j≠M, 成本j≤成本M, 速度j≥速度M}`：本模型在自身预算内比其余最优者聪明多少。最可解释。 | 否 |
| **加权超体积** | 归一空间 (g成本,g速度,g智能)∈[0,1]³ 的**排他超体积贡献**（移除该点后前沿收缩的体积），参考点=最差角。唯一吃 3 个可调轴权重、可实时重排。 | 默认对称 |
| **到前沿垂距** | 移除该前沿点后，取其余前沿点在归一空间的 Delaunay 三角网，求该点到三角网的最短欧氏距离（用户最初的朴素想法）。 | 是 |

### 加权超体积的 3 个轴权重（诚实说明）

**为什么线性权重没用**：纯超体积对**线性**轴权重不变——把每个归一轴乘一个权重，只是让所有模型的
体积同乘一个常数 `w智能·w成本·w速度`，**排名纹丝不动**。所以线性滑杆是个「看起来能调、其实什么都
没变」的陷阱。

**故用指数权重** `ḡ = g^w`（`w=2^s`，滑杆 s∈[−2,2]，s=0→w=1）：指数单调保序 →**前沿成员不变**，
只改各点的贡献量级 → 才能真正重排。语义（因 g∈(0,1)）：`w>1` 使 `g^w` 更小，**只有该轴接近满分的
模型才在该轴拿到 credit**（放大该轴的区分度）；`w<1` 相反、拉平该轴。默认 `w=(1,1,1)` 退化为纯对称
排他超体积贡献；三个滑杆仅在选中「加权超体积」时可用。Python 端只预算 `w=1` 的静态值（供 hover），
拖滑杆时在浏览器里用同一算法**实时重算**排他超体积并重排、重设光环。

## 用法

依赖以 `pyproject.toml` + `uv.lock` 为准（Python 3.12，见 `.python-version`）。`requirements.txt` 只供不用 uv 的旧入口（`pip install -r requirements.txt`），下界与 pyproject 对齐（plotly ≥ 6.0、kaleido ≥ 1.0 等），由 pytest 校验两者不脱节。
所有 Python 命令统一用 `uv run --frozen python …`：

```bash
# 1) 安装 uv 后首次运行会按 uv.lock 建立环境（测试与浏览器验证依赖在 extras 里）
uv sync --extra test --extra browser-verification
uv run --frozen python -m playwright install chromium   # 只有跑浏览器验证才需要

# 2) 配置 API key（任选其一；只有刷新 API 时才需要）
export ARTIFICIAL_ANALYSIS_API_KEY="aa_xxx"
# 或：cp .env.example .env 后填入

# 3) 生成交互式 HTML、数据契约与模型表（默认均衡剪枝；默认复用 data/raw 缓存、不联网）
uv run --frozen python -m src.cli
# → output/frontier_3d.html
# → output/frontier_3d_visualization_dataset.json
# → data/processed/models.csv
```

> **在 git worktree 里运行**：worktree 中的 `.venv` 常是指向主 checkout 的符号链接，直接 `uv run` 会同步甚至重建
> 主 checkout 的环境。请先把 `UV_PROJECT_ENVIRONMENT` 指向该 worktree 独立的环境目录，并用 `--frozen` 禁止改锁：
> `UV_PROJECT_ENVIRONMENT=<独立目录> uv run --frozen python -m src.cli …`。两个一键脚本在「`.venv` 是符号链接且未设该变量」时会拒绝运行。

### 最小化网页目录刷新与异常诊断（D-12）

- 普通运行只读缓存；`--refresh` 刷新 API，并在冷却期结束后自动抓取 2–3 个详情页，从每页内嵌目录提取数值 JSON。不是逐模型抓取；新 HTML 不落盘。
- 网页目录最多每 24 小时一批，失败也进入冷却期；API 可独立刷新。用 `--disable-artificial-analysis-website-page-fetch` 禁止本次网页请求；原 `--allow-artificial-analysis-website-page-fetch` 保留，但不能绕过限额。
- 使用项目真实 UA，页间至少 10 秒；重试与 TLS 的系统 curl 回退共用每批六次尝试上限。403、429 或验证挑战立即停止；不关闭 TLS 校验、不跟随重定向。
- 新目录沿用 API 的唯一暂存、响应历史、护栏后原子替换机制。版本 family、≥50 条带 token 的 API UUID 交集及逐 UUID 当期判定保持；新批次要求两页完整且精确版本相同，UUID 冲突或覆盖骤降则拒绝。
- 失败复用已验证旧目录，并记录真实日期。连续封禁或结构异常只创建并启动一个诊断 Task；跨重启、跨工作树去重。只有新目录通过完整校验并晋升后才 resolve。
- 默认 `--report-deployment-environment development`：故障未恢复时，每次新生成 HTML（包括已有契约重渲染）都会显示醒目开发告警。`production` 隐藏开发诊断标记，数据新鲜度说明仍保留。
- 已有 HTML 原位保留；归档脚本只读源文件，生成压缩备份、SHA256 清单和逐批数值目录。历史回退默认改为 8/4 单批 v4.1，仍不参与分析。

AA 条款风险沿用审计记录；降低频率与只存 JSON 不等于已取得许可。详细状态、诊断配置与归档方法见 [D-12 实施说明](docs/artificial-analysis-minimal-website-catalog-refresh-and-diagnostics.md)。

### 参数

| 参数 | 默认 | 含义 |
|---|---|---|
| `--since-months` | 18 | 软窗：近 N 月内算“近期” |
| `--layers` | 3 | 近期模型保留前 N 层：显示层号或分析层号 ≤ N 即保留（层号即离前沿的距离） |
| `--hard-age-cutoff-months` | 36 | 早于此一律剔除（含 Pareto） |
| `--recent-release-grace-period-months` | 6 | 发布在近 N 个日历月内的完整模型免受层数限制；非负整数，0 关闭。读取已有契约时显式传入会提示被忽略 |
| `--speed-scale` | `log` | 速度轴 `log` 或 `linear` |
| `--pruning-reference-date` | API 抓取日期 | 剪枝参考日期 `YYYY-MM-DD`；不再用运行当天 |
| `--speed-metric` | `effective` | HTML 初始速度口径：`effective` / `raw` / `tasks_per_hour`；页面内仍可切换 |
| `--cost-metric` | `effective` | HTML 初始成本口径：`effective` / `blended`；页面内仍可切换 |
| `--refresh` | 关 | 刷新 API，并在冷却期允许时受限更新网页目录；只刷新 API 时同时传入 `--disable-artificial-analysis-website-page-fetch` |
| `--allow-artificial-analysis-website-page-fetch` | `--refresh` 时自动 | 显式请求受限目录刷新，不能绕过冷却期 |
| `--disable-artificial-analysis-website-page-fetch` | 关 | 禁止本次网页请求，只用 API 与已有目录 |
| `--report-deployment-environment` | `development` | `production` 隐藏开发诊断标记，保留新鲜度说明 |
| `--use-previous-run-processed-models-csv-as-fallback` | 关 | 把上次产物 models.csv 作为非当期回退源（版本未知） |
| `--processed-models-csv-out` | `data/processed/models.csv` | 模型表输出路径 |
| `--previous-run-processed-models-csv-in` | 同 `--processed-models-csv-out` | 上一个开关读取的「上次 models.csv」路径 |
| `--artificial-analysis-raw-data-directory` | `data/raw` | 原始数据目录：读写 API 与数值目录 JSON 及响应历史，旧 HTML 缓存只读。指向隔离副本即可彩排 `--refresh`，不碰共享目录 |
| `--export` | 无 | 另存静态图 `png` / `svg`（需 extra `static-image-export`，即 kaleido）；失败时以非零码退出 |
| `--out` | `output/frontier_3d.html` | 输出路径；所有指标组合统一在同一个 HTML 内 |
| `--frontier-3d-visualization-dataset-out` | HTML 同目录的 `frontier_3d_visualization_dataset.json` | 输出前端可渲染的数据契约 |
| `--frontier-3d-visualization-dataset-in` | 无 | 读取既有数据契约并直接重渲染 HTML，跳过取数和指标计算；此时剪枝、口径与取数参数（含 `--refresh`）都被忽略，并打印提示 |

```bash
# 更激进/更聚焦前沿
uv run --frozen python -m src.cli --since-months 12 --layers 2
# 初始显示原始速度 × 7:2:1 混合单价（页面内仍可切换）
uv run --frozen python -m src.cli --speed-metric raw --cost-metric blended
# 重新拉取 API（不抓网页）+ 导出静态图
uv run --frozen --extra static-image-export python -m src.cli --refresh --disable-artificial-analysis-website-page-fetch --export png
# 前端迭代：复用上次数据契约重渲染 HTML（无需 API key / 网络）
uv run --frozen python -m src.cli \
  --frontier-3d-visualization-dataset-in output/frontier_3d_visualization_dataset.json
# 彩排刷新：先把 data/raw 复制到持久隔离目录（目标目录须不存在），所有读写都落在副本里。
# 必须用 -L：worktree 里 data/raw 是指向主 checkout 的符号链接，macOS 的 cp -R 默认只复制链接本身，
# 「副本」会仍指向共享目录，彩排的 --refresh 就会改写共享的 data/raw
cp -RpL data/raw .frontier-3d-worktree-artifacts/rehearsal-artificial-analysis-raw-data-cache
uv run --frozen python -m src.cli --refresh \
  --artificial-analysis-raw-data-directory .frontier-3d-worktree-artifacts/rehearsal-artificial-analysis-raw-data-cache \
  --processed-models-csv-out .frontier-3d-worktree-artifacts/rehearsal-processed-model-tables/models.csv \
  --out .frontier-3d-worktree-artifacts/rehearsal-rendered-reports/frontier_3d.html
```

彩排（W1-13）怎么看结果——按新规则，下列情况**不算**故障：目录 vs API 智能分一致率 < 99% 的告警（只要被接受分区仍是
当期 family，被 AA 重评的少数模型会逐个降为非当期，其余 token 照常参与分析）；目录 vs API 成本一致率告警；非当期回退成本
占比告警。下列情况应**停下来、不晋升**：任一护栏「失败」（含 API 当期成本骤降）；分区接受护栏「告警」、页头出现
「内嵌目录分区被拒」（多半是 API 升了 family，有效速度口径没有当期可比点）；当期 token 为 0；默认口径分析 Pareto 为 0。
离线模拟（同日数据、+4.3 顶层版本、API 升 4.4、2% 模型重评、新增 5 个模型、只返回 400 个模型）的结果见
`docs/frontier-3d-pareto-visualization-full-audit-and-improvement-roadmap-2026-09-30/README.md`。

CLI 结尾会打印**数据新鲜度摘要**，内容包括：

- API 抓取时间及其来源（旧缓存按文件时间推断）、当期指数版本；
- 成本、token 数与混合价的来源计数（回退值注明所属版本与最早采集日期），目录分区（版本、日期、页数、无效页）与网页抓取状态；
- 剪枝参考日期；各口径的显示数、分析 Pareto 数、参与分析数与历史口径点数；
- **真实的数据质量护栏结果**（通过 / 失败 / 告警 / 跳过）；
- 「智能前 20 中未上图」的缺维告警，以及 V-3 名单（不在目录分区、且连历史口径 token 都没有的模型；目录分区整体被拒时
  改为报拒绝原因，不把原因归到暂停抓取）。目录缓存里有结构有效的页却没有任何被接受的分区时（例：API 升到新 family 4.4），护栏
  `embedded_model_catalog_partition_accepted_when_structurally_valid_detail_pages_exist` 记「告警」并写出最佳候选分区的一致率与拒绝原因；
  契约顶层 `artificial_analysis_data_provenance.embedded_model_catalog_partition_rejection_warning_text` 同时写一行告警
  （无问题时为 null），HTML 页头整行醒目显示，例如「内嵌目录分区被拒（…版本 family 4.3 ≠ API 版本 family 4.4），有效速度口径暂无当期可比点」。

护栏一览（判「失败」的会让 CLI 以非零码退出；`--refresh` 时新响应不替换缓存）：

| 护栏 | 判定 |
|---|---|
| `api_language_model_count_at_least_minimum` | API 模型数 < 500 → 失败 |
| `current_artificial_analysis_api_cost_to_run_value_count_positive` | API 当期成本 0 条 → 失败 |
| `current_artificial_analysis_api_cost_to_run_value_count_not_collapsed_versus_previous_guardrail_passed_response` | 与响应历史中上一份通过护栏的响应相比，API 当期成本条数骤降 > 30% → 失败；没有可比基线时改用绝对下限：< 100 条 → 失败（R1-04） |
| `non_current_fallback_cost_to_run_share_at_most_maximum` | 非当期回退成本占比 > 0.70 → 只告警（R1-04） |
| `embedded_model_catalog_vs_api_cost_to_run_agreement_rate` | 被接受分区的目录成本与 API 一致率 < 99% → 只告警（目录成本不是值来源） |
| `embedded_model_catalog_vs_api_intelligence_agreement_rate` | 被接受分区的智能分一致率 < 99% → 只告警（不一致的模型已逐个降为非当期） |
| `embedded_model_catalog_partition_accepted_when_structurally_valid_detail_pages_exist` | 有结构有效的分区却没有被接受的 → 告警（R1-03：保住 raw 速度口径，页头醒目提示） |
| `api_intelligence_index_version_family_matches_embedded_model_catalog_partition` | API 版本与被接受分区 family 不一致 → 失败 |

阈值都标了 `EXPERIMENT_NODE`（`rg 'EXPERIMENT_NODE:' src/fetch_data.py`）。

### 一键脚本

```bash
# 离线：由已有数据契约重渲染 → 全量验证 → 打开（不联网、不需要 key）
scripts/refresh_regenerate_verify_and_open_frontier_3d_report.sh --from-existing-dataset output/frontier_3d_visualization_dataset.json
# 刷新：只拉 API → 生成契约与 HTML → 全量验证 → 打开（需要 key，脚本绝不打印 key）
scripts/refresh_regenerate_verify_and_open_frontier_3d_report.sh --refresh
# 其他选项：--out PATH、--skip-verify（产物标注「未验证」）、--host PORT（只绑定 127.0.0.1，只托管报告副本所在的临时目录）、--no-open
```

旧版管线生成的契约（例如实心面仍是 Plotly `bdata` 编码）会被契约校验拒绝。遇到这种情况，先不带
`--frontier-3d-visualization-dataset-in` 重新生成一次契约。

### 打开与本地托管

`output/frontier_3d.html` 是自包含单文件 HTML，three.js bundle、厂商 Logo、数据契约与前端交互资源都已内联，
因此可以直接打开：

```bash
open output/frontier_3d.html
```

也可以把 `output/` 作为静态目录本地托管，便于在浏览器里固定使用 URL、刷新调试或分享给同机其他工具
（不要托管仓库根：`.env` 与 `.git` 会一起暴露；一键脚本的 `--host` 只托管报告副本所在的临时目录）：

```bash
uv run --frozen python -m http.server 8765 --bind 127.0.0.1 --directory output
# 浏览器打开：http://127.0.0.1:8765/frontier_3d.html
```

HTML 的 `<meta>` 带产物指纹：`frontier-3d-renderer-bundle-sha256`、`frontier-3d-generator-git-commit`（工作区有改动时加 `-dirty`）、
`frontier-3d-rendered-at-utc`；「当前视图」面板也显示同一行指纹，便于判断打开的是不是最新产物。

如果只改前端资源或 HTML renderer，优先复用现有
`output/frontier_3d_visualization_dataset.json` 走 `--frontier-3d-visualization-dataset-in`，
避免反复重算 Pareto 指标。需要重新生成数据契约但仍可复用 `data/raw/` 缓存时，运行无
`--frontier-3d-visualization-dataset-in` 的默认生成命令；需要重拉 AA API 时加 `--refresh`。

### 冗长度报告

```bash
uv run --frozen python scripts/generate_model_intelligence_verbosity_report.py \
  --report-out <报告.md> --under-limit-table-out <表.md> --under-limit-csv-out <表.csv>
```

冗长度只取当期指数版本的 token 数，即被接受的内嵌目录分区；v4.1 快照的 token 数不参与排名，报告里只计数说明。
报告会写明智能指数版本、API 抓取时间、目录分区与数据来源。

冗长度阈值缺省跟随当期中位数：阈值 = （v4.1 时期旧阈值 30M ÷ v4.1 快照 377 个模型的中位数 21.24M ≈ 1.413）
× 当期指数版本的输出 token 中位数。指数重定标后 token 规模整体变大（v4.3.2 中位数约 87M，阈值约 123M），
固定 30M 会让筛选口径漂移。`--output-token-limit-multiple-of-current-median` 改倍数，
`--output-token-limit-millions` 显式指定绝对阈值（二者互斥）。报告、阈值内 Markdown 表与 CSV 都写明阈值、
换算方法与当期中位数；CSV 另有每行「冗长度 ÷ 当期中位数」列。缺省产物为
`data/processed/models_under_output_token_verbosity_threshold_ranked_by_intelligence.{md,csv}`
（文件名不再带阈值数值）。

## 交互

- **页头与说明**：标题、如何阅读、模型计数、AA 署名、API 抓取日期及智能指数版本。抓取时间或版本由目录/文件时间推定时明确标注。≤640px 把计数放到元数据行最前，横滑可见其他信息。「口径说明」和「如何阅读」都可打开包含口径、方向、动态图例、历史点和未上图厂商原因的说明，Esc 关闭。
- **口径与相机**：独立选择两种成本与有效速度 / 原始速度 / 任务速度；「正交分解视角」切换至混合单价 × 原始速度并保持相机。拖拽旋转、滚轮围绕光标缩放、右键平移；重置、双击空白和三个轴对齐视角只调整相机。六口径各自在生成时用完整、有限的显示模型固定轴域，含宽限点和历史口径点；筛选、宽限开关、hover 和固定都不重算轴域。超范围谱系前身夹紧到箱壁，详情显示方向和原始数值。
- **标记与图例**：标记保持恒定 CSS 像素，默认 0.5×，滑杆为 0.5–1.5×，1× 对应 Logo 容器 22px；各层等比缩放，偏好自动保存。深色环是帕累托身份，金色环是已固定，蓝色光晕是当前突出度，缺数值时使用虚线光晕。历史口径点为虚线底板与半透明 Logo。国别外框默认关闭，开启时同步显示中国双圆环、美国圆角方环、其他菱形环的图例；外框不参与拾取。
- **详情与触屏**：桌面 hover 显示身份、三轴/备用口径与冗长度、帕累托层级和当前突出度数值及名次；成本按契约单位显示，小数保留有效位。详情按实际尺寸限制在绘图区内。触屏首次轻点打开可滚动详情卡，通过卡内按钮固定；拖拽和随后的合成 click 不固定模型。
- **搜索**：可按完整模型名、基模型、厂商或档位检索，包含未上图记录和实际排除原因。筛选隐藏与历史口径分别说明；最多显示 40 组并提示总组数。↑↓ 选择可操作结果、Enter 固定、Esc 关闭；完全不可显示的结果只给原因。
- **固定与比较**：桌面点击模型固定全部档位，排行按钮只固定对应模型，单档位组同样可用。身份沿用 UUID，档位按升序显示；切口径缺席会注明原因，恢复口径后自动重新显示。侧栏提供摘要、逐组移除和清空全部，画布显示固定模型名。底部对比表按需展开且最高 40vh，模型档位为列、指标为行；默认包含身份、三轴、层级和当前突出度，备用口径与冗长度可选并保存到 localStorage。Δ% 以首个当前可比固定模型为基准，历史口径不参与基准和最优值高亮，零基准不计算百分比。
- **突出度**：侧栏选择指标并查看说明。加权超体积展示「排他贡献 ÷ 完整前沿超体积」的百分比，原始贡献值和排序保持不变；筛选不改变分母或排行。三个权重支持即时滑杆、数字草稿编辑、失焦或 Enter 提交到 0.25–4，以及一键重置为三个 1。
- **几何与筛选**：默认使用 Delaunay 邻接参照，可选参照线框、实心或隐藏；「实际可达前沿（精确阶梯）」独立切换至精确预算阶梯与立面。邻接参照不是帕累托面，面内位置不代表可达模型。保留相邻且一分钟自动折叠的说明。厂商筛选、「仅当期可比」与六个月近期发布宽限只改变可见性，保留固定状态并显示隐藏原因。
- **窄屏**：≤1200px 页头稳定两行，≤1024px 控制栏移到下方，收起固定 44px；≤640px 工具栏收入「视图设置」且控制栏初始收起。窄屏对比表复用下方面板，避免同时压缩画布。存储不可用时，本页仍可正常编辑尺寸与比较字段。
- **分享与全模型表**：复制当前口径、固定 UUID、厂商筛选、显示开关、相机与日期/表格状态；有效 URL 字段优先于本地偏好，复制失败提供可选中文本。离线分享还须提供对应 HTML。全模型表保留全部输入，包括缺智能分与被剪枝模型，支持排序、筛选和当前 CSV；WebGL 不可用时仍可使用。旧文件只能展示实际留存记录。协议见 [视图分享契约 v1](docs/frontier-3d-view-state-v1-contract.md)。
- **实测、日期与敏感性**：仅实测筛选隐藏估算与未知，但不改变全局排名。日期可淡出或隐藏晚于截止的模型，未知日期保留；播放默认暂停，始终按当前价格、速度和评测口径计算。敏感性默认关闭，可假设智能 ±0.5/±1、成本和速度各 ±10%，展示稳健、敏感与近前沿；这些区间不是 AA 置信区间，也不覆盖重定标误差。
- **刷新、主题与导出**：比较严格早于本次的合格响应，说明新增、本次未出现、缺值和超过 10% 的可比变化；前沿进出只用匹配来源、版本和参数的历史科学快照，不用当前目录补算。界面和 Three 场景跟随系统主题；画布可聚焦，方向键旋转，`/` 搜索，Esc 优先关闭浮层。浏览器可导出含轴、图例、固定名、日期和 AA 署名的 2× PNG，CLI PNG/SVG 继续保留。

本地品牌 SVG 优先，缺少资产的已注册厂商使用完整名称 wordmark，未知厂商使用 monogram；两类 fallback 均使用方形容器。品牌资产来源、Lobe Icons MIT 许可和商标说明见 [资产来源](src/frontier_3d_organization_identity_assets/THIRD_PARTY_ASSET_SOURCES.md)。HTML 已内嵌许可，不依赖 CDN。

### Provider 粒度与权限记录

2026-10-28 复核了 [2026-09-30 审计收录的 3c8b8 调查结论](docs/frontier-3d-pareto-visualization-full-audit-and-improvement-roadmap-2026-09-30/README.md)：免费 API 没有 provider 粒度；当时 `/language/providers*` 需要 Commercial 权限，Pro 请求也返回 403。这是历史权限记录，本轮未联网重新探测。当前模型点代表模型聚合值，不提供 `(model, provider)` 比较，也没有据此过滤 provider 的量化版本。该能力仍需独立的数据与权限方案。

### 修改 three.js 前端资源

生成 HTML 不要求安装 Node.js，因为版本化 bundle 已随仓库提交。修改 three.js renderer 源码后运行：

```bash
npm ci
npm run build:frontier-3d-threejs
node scripts/build_frontier_3d_threejs_interactive_renderer.mjs --check   # 已提交 bundle 与入口源码逐字节一致
uv run --frozen python -m src.cli \
  --frontier-3d-visualization-dataset-in output/frontier_3d_visualization_dataset.json
```

`--export png/svg` 继续使用 Plotly/Kaleido 静态导出适配器；当前静态图不包含交互 HTML 的
Logo 与国别外框。

## 测试与验证

```bash
# 单元、性质、契约与冒烟测试（读本机 data/raw 缓存的测试默认跳过）
uv run --frozen python -m pytest
# 连同读本机缓存的测试一起跑（三种开关任选其一）
uv run --frozen python -m pytest --run-tests-requiring-local-cached-artificial-analysis-data
RUN_TESTS_REQUIRING_LOCAL_CACHED_ARTIFICIAL_ANALYSIS_DATA=1 uv run --frozen python -m pytest
uv run --frozen python -m pytest -m requires_local_cached_artificial_analysis_data

# 全量验证（11 步：Python/Node、三浏览器合成页面、bundle --check、HTML 内联指纹、指标与数据契约、
# 4 个 Playwright 浏览器验证，其中一个用该 HTML 的前端渲染合成的恶意字符串 / 非有限契约）
scripts/run_all_frontier_3d_verifications.sh  # 无参数自建合成报告；也可显式传独立 HTML 路径
# 验证归档的旧 HTML（其内联 bundle 不是仓库当前 bundle）时，把「bundle 一致」一步降为告警
scripts/run_all_frontier_3d_verifications.sh --allow-html-renderer-bundle-differing-from-repository-renderer-bundle <旧.html>
```

- 数据契约 golden（合成 fixture）变更后需要重写：
  `RUN_REGENERATE_FRONTIER_3D_VISUALIZATION_DATASET_GOLDEN_PROJECTION=1 uv run --frozen python -m pytest tests/python_unit/test_frontier_3d_visualization_dataset_golden.py`。
  重写后需人工审阅 diff。
- `verify_frontier_3d_axis_annotations.py` 把截图写到环境变量 `FRONTIER_3D_AXIS_ANNOTATION_SCREENSHOT_DIRECTORY`
  指定的目录；缺省为本 checkout 的 `.frontier-3d-worktree-artifacts/axis-annotation-screenshots/`，不会写到共享目录。

### 隔离路径与浏览器验证（W2 / W3）

主 checkout 保留 `output/`、`data/raw`、`data/processed` 默认路径；linked worktree（包括 detached HEAD）
默认改用 `.frontier-3d-worktree-artifacts/` 下的 `rendered-reports/`、
`artificial-analysis-raw-data-cache/` 和 `processed-model-tables/`。显式独立路径参数继续有效，
写入共享符号链接或其真实目标会报错。旧缓存需要显式复制，保留 mtime，不能仅复制符号链接；不自动回退共享缓存。

```bash
export UV_PROJECT_ENVIRONMENT="$PWD/.frontier-3d-worktree-artifacts/python-environment"
uv sync --frozen --all-extras
npm ci
uv run --frozen --no-sync --all-extras python -m playwright install chromium firefox webkit
scripts/run_all_frontier_3d_verifications.sh
```

Python 单元测试只读合成 fixture，真实缓存用例默认跳过。浏览器测试由 session fixture 自建 HTML，
不读取真实缓存或密钥，三浏览器均检查异常与外部请求，包含像素、拖拽、固定、筛选与 WebGL 恢复断言。
旧的 `scripts/verify_*.py` 命令仍可调用，实现迁至 `tests/browser_playwright/`。

macOS 27 若 Firefox 报 `Could not find profile folder`，可按
[上游问题](https://github.com/microsoft/playwright/issues/42768) 为任务内安装创建独立应用身份；
不需要修改日常浏览器或系统权限：

```bash
export PLAYWRIGHT_BROWSERS_PATH="$PWD/.frontier-3d-worktree-artifacts/playwright-browser-installations"
uv run --frozen --no-sync --all-extras python -m playwright install firefox
# 将下面参数换成本次安装的 Firefox 可执行文件；安装器会打印位置。
uv run --frozen --no-sync --all-extras python scripts/prepare_frontier_3d_isolated_firefox_verification_launcher.py \
  --firefox-executable-path "$PLAYWRIGHT_BROWSERS_PATH/firefox-1543/firefox/Nightly.app/Contents/MacOS/firefox"
unset PLAYWRIGHT_BROWSERS_PATH
export FRONTIER_3D_FIREFOX_EXECUTABLE_PATH="$PWD/.frontier-3d-worktree-artifacts/browser-launch-wrappers/firefox-verification"
scripts/run_all_frontier_3d_verifications.sh
```

可显式运行 `bash scripts/install_frontier_3d_pre_commit_hook.sh` 启用暂存候选验证。
安装器不覆盖已有 hook 或 `core.hooksPath`；Git hooks 目录由同仓库 worktree 共享，故本任务不自动安装。
钩子验证 index 快照中的单元测试、Node 测试和 bundle 一致性，避免未暂存文件掩盖错误。
CI 只运行锁定依赖及合成 fixture；不运行真实数据刷新。能力对等状态见
[渲染器能力清单](docs/frontier-3d-renderer-capability-parity-checklist.md)。

W3 实施范围、验证记录与边界见 [W3 交付说明](docs/frontier-3d-wave-3-implementation-and-verification.md)。
W5 的实现、兼容性、验证和体积/性能记录见 [W5 交付说明](docs/frontier-3d-wave-5-implementation-and-verification.md)。

## 数据契约（科学数据 v4、浏览器投影 v2）

新磁盘 JSON 写为紧凑的 `frontier_3d_visualization_dataset/v4`；读取入口继续接受有效的 v2/v3，并保留原版本校验规则，
缺少 UUID 的旧记录明确标记为 `legacy_creator_and_name_without_uuid`，不推测真实 UUID。
新 HTML 使用独立的 `frontier_3d_browser_projection/v2`，继续读取旧投影 v1。完整科学契约先校验，投影后再单独校验。

- 顶层 `models` 集中保存全部输入的名称、UUID、目录 release/effort、厂商、公共 `panel` 和值溯源；
  各口径的显示点、未上图记录和谱系节点通过 `model_index` 引用，并保存坐标、分析资格及指标等差异。
  六口径的 `model_analysis_records` 逐一覆盖公共表，并保存分析资格、未上图原因和敏感性状态。
- 浏览器投影只带显示并集的 logo；重复的分析资格存入
  `analysis_eligibility_definitions`，引用通过 `analysis_eligibility_index` 指向它。
  重复的未上图解释存入 `excluded_model_explanation_definitions`，由
  `excluded_model_explanation_index` 引用；浏览器展开后保留完整缺维、原因和目录缺席标记。
  与公共 panel 相同的坐标及与厂商表相同的身份字段通过继承还原。
- 搜索需要的排除原因、UUID、基模型、推理档位、分析资格和口径 `description` 保留。
  `trend_residual_standard_deviation_units` 和厂商注册来源等审计字段留在完整科学契约。
- 默认生成不创建 Plotly 图或保存 Plotly 导出副本；只有 `--export png/svg` 才从场景装配静态图。
- 需要旧场景形状的 Python 消费方可调用
  `expand_frontier_3d_visualization_dataset_for_scene_consumers` 获取独立副本。
  以下字段说明均指展开后的场景视图。

Schema 位于 [src/frontier_3d_contract_schemas](src/frontier_3d_contract_schemas)：科学契约与浏览器投影
各有版本入口，共享明确的允许字段；使用本地 `referencing.Registry` 注册公共 Schema，校验不联网。
数值、模型/分析资格引用、三角索引和坐标与公共模型字段的一致性另作语义校验。
实现、冻结输入体积及方法学候选见 [W4 实现与验证](docs/frontier-3d-wave-4-implementation-and-verification.md)。

- 顶层 `artificial_analysis_data_provenance`，包括：
  - API 抓取时间及其来源、API 版本与 tier；
  - 当期指数版本、目录分区版本与截至时间；
  - 网页抓取是否暂停、剪枝参考日期、`recent_release_frontier_distance_grace_period_months` 宽限月数；
  - 有效速度各版本归一常数、AA 署名 URL。
- 顶层 `data_date` 取 API 抓取日期，`generated_at` 为 UTC。
- 每个口径包括：
  - `analysis_eligible_model_count`、`historical_version_value_model_count`；
  - `recent_release_grace_period_only_model_count`（宽限专属点数）、`kept_model_count_without_recent_release_grace_period`（关闭宽限后的保留数）；
  - `excluded_models_with_drop_reason`：有智能分但未上图的模型，写明缺哪一维与剪枝原因；W3 增补 UUID、基模型、档位标签/顺序、分析资格，供搜索解释使用；
  - `current_view` 中的 `speed_axis_title_text`、`cost_metric_note`、`speed_metric_note`。
    其中也记录宽限月数、剪枝参考日和上述宽限计数；分析计数始终指契约全集，页面筛选不会改写它们。
- 每个显示点包括：
  - `displayed_only_because_of_recent_release_grace_period`：仅因宽限保留时为 true，其余为 false；旧 v2 没有此字段时沿用原显示行为；
  - `analysis_eligibility`：是否参与本口径分析、原因码与原因文案；
  - `value_provenance`：成本与 token 数的来源、版本、采集时间，以及混合价来源；
  - `artificial_analysis_intelligence_index_is_estimated`。
  - 非参与分析点的 `panel.layer` 为 `null`；W3 增补 `panel.output_mtokens`（M tokens），成本/速度定义增补统一 `description`。旧契约缺字段时降级显示；名称式浏览器接口与超体积数组接口保留。契约里不出现 NaN。
- 契约校验会拒绝以下情况：
  - 非有限数坐标（线段允许 `null` 作断线）；
  - 越界或非整数的三角索引；
  - 缺 `panel` 或 x/y/z 非有限的 marker；
  - 空 scene。
- 零模型或 Pareto 点不足时的空网格合法。

## 结构

```
data/reference/     # 版本化回退快照（v4.1 成本与原始 token 数，2026-07-01 采集；非当期，只显示不参与分析）
docs/artificial-analysis-intelligence-growth-and-economic-impact-analysis/  # 智能增长、成本趋势与经济影响分析及源数据快照
docs/artificial-analysis-provided-data-source-analysis/  # AA 数据源、端点差异、指数重定标与内嵌目录调查
src/fetch_data.py   # 拉分页 API；离线解析详情页内嵌模型目录；值溯源、混合价、有效速度与数据质量护栏
src/frontier.py     # 按口径判定是否参与分析（D-1）；显示层/分析层 Pareto、可达前沿、剪枝与四个突出度指标
src/visualize.py    # 生成前沿几何/谱系数据，并保留 Plotly 静态导出 figure
src/frontier_3d_visualization_dataset_builder.py     # 写 v4 六口径科学契约，读取兼容 v2/v3
src/frontier_3d_versioned_model_reference_contract.py # 公共模型引用、浏览器投影与 Schema/语义校验
src/frontier_3d_pure_scene_geometry.py               # 不依赖 Plotly 对象的邻接几何与迁移对拍
src/frontier_3d_self_contained_html_renderer.py      # 把数据契约 + 前端资源内联成单文件 HTML（含产物指纹）
src/frontier_3d_interactive_report_assets/           # HTML/CSS/three.js renderer 源码与版本化 bundle
src/frontier_3d_organization_identity_metadata_registry.py  # 54 家厂商地区分类与 Logo 注册表
src/frontier_3d_organization_identity_assets/        # 版本化品牌 SVG 与来源说明
src/model_intelligence_verbosity_report.py           # 智能 × 冗长度排名报告（当期 token 数）
src/cli.py          # 串联：取数 → 数据契约 → 单文件 HTML → 新鲜度摘要
scripts/            # 一键脚本、全量验证、bundle 构建与 --check、快照转换与各验证脚本
tests/python_unit/  # pytest：冒烟、解析器 fixture、Pareto 性质测试、契约反例、golden
tests/fixtures/     # 合成详情页与合成模型表 fixture、golden 投影
```

## 说明

- 智能分一律取自 API；有效运行成本取 API，缺失时用带版本号的回退快照，且回退值不参与分析。
  页头与 z 轴标题标注数据抓取日期与智能指数版本。
- AA API 免费、限 1000 次/天；`data/raw/` 保存 API 与数值目录 JSON，旧网页缓存只读。默认复用，`--refresh` 刷新 API，并在冷却期允许时受限更新目录，不新增 HTML 缓存。
- `.env` 含真实密钥、已被 `.gitignore` 排除，请勿提交；如密钥外泄可在 AA 平台轮换。
