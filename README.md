# AA 三维前沿：智能 × 速度 × 有效运行成本

Artificial Analysis（AA）官网的模型对比图基本都是二维，唯独缺一张**三维**图——
把 **智能、速度、有效运行成本** 三个维度放在一起看，并找出**最优前沿流形**：
在每个（成本, 速度）组合下，由“最智能模型”编织出的那张曲面（3D Pareto 前沿）。

本项目把这张图做出来，产出一个**可旋转的自包含交互式 HTML**。生成产物默认写入
`output/frontier_3d.html`，同时写出供前端复渲染的
`output/frontier_3d_visualization_dataset.json`；`output/` 与 `data/processed/` 是本地生成目录，
不纳入版本控制。

## 三个维度与数据口径

| 维度 | 字段 | 来源 |
|---|---|---|
| **智能** | `evaluations.artificial_analysis_intelligence_index` | AA API |
| **有效速度（默认）** | `eff_speed` —— 原始速度 ÷ 相对冗长度 | AA API + 网页 payload |
| **有效运行成本（默认）** | `artificial_analysis_intelligence_index_cost.total_cost` —— **跑完整套 Intelligence Index 的实测美元花费** | AA API，网页 payload / 上次 CSV 补齐 |

> 关键：第三维是 **“Cost to Run Artificial Analysis Intelligence Index”**（跑完评测的总花费，
> 例如 Gemini 3 Pro Preview (high) ≈ **\$819.84**），**不是**每百万 token 的混合价（\$/M）。
> 新版 Free API 已原生暴露该字段，但当前只覆盖部分模型；其余仍从
> `https://artificialanalysis.ai/models` 页面内嵌 payload、本地上次 CSV、以及版本化 fallback
> snapshot 按模型 UUID 补齐。

非正的成本/速度（如无托管定价的开源权重模型，AA 占位为 0）既非真“免费”、也无法在对数轴表示，
一律视为缺失、排除出三维前沿。

### 成本口径：有效运行成本，且为何不用套餐折算

成本轴 `cost_to_run` 是 **“Cost to Run Intelligence Index”**——跑完整套评测**实际烧掉的 token 数 ×
各档 token 单价**。它**已按各模型真实 token 消耗（含冗长输出与不可见的思维链 / reasoning token）加权**，
因此本质是一种**有效成本**：同样跑完一套任务，冗长的推理模型烧更多 token → 更贵（部分模型单次评测可吐
~190M token，简洁模型仅几 M）。这与下面可选的「有效速度」轴是**同一冗长度信号的两个投影**——成本轴看
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

### 默认速度口径：有效速度（speed ÷ verbosity）

原始 `tok/s` 衡量的是 token 流的**吞吐**，不是“多久拿到完整答案”。同一套评测下，各模型的输出
token 量（**冗长度**）相差 **~100 倍**（约 2.6M → 260M），推理模型尤其冗长：一个 300 tok/s 但吐
100M token 的模型，拿到完整答案远慢于 50 tok/s 吐 3M 的简洁模型。为此提供可切换的**有效速度**轴：

```
冗长度 output_mtokens = 智能 / intelligence_index_per_m_output_tokens   （跑完整套指数的输出token量，百万）
有效速度 eff_speed     = 原始速度 ÷ 相对冗长度，  相对冗长度 = 冗长度 / 全样本中位冗长度
```

归一到中位冗长度后，有效速度仍是 tok/s 量纲、可与原始速度同轴比较；归一常数只缩放坐标轴、不改变
排名或 Pareto 关系。页面内可随时切换为原始速度；`--speed-metric raw` 可指定 HTML 初始口径。

> **取舍（为何是“备选”而非替换）**：实测在 248 个三维齐全模型上，有效速度与成本轴的秩相关
> 从 −0.25 升到 **−0.45**、与智能轴从 −0.12 升到 **−0.54**——它把“冗长度”这个变量同时灌进了
> 成本与智能两轴，削弱了三维的正交性、让点云更扁。原始速度回答“流式响应有多跟手”，有效速度回答
> “多久拿到答案”：两个真实但不同的问题，故二者并存；本项目以有效速度为默认。

### 可选成本口径：7:2:1 混合单价

页面内可把有效运行成本替换为 AA 推荐的每百万 token 混合单价：

```text
7:2:1 混合单价 = (7 × cache-hit 单价 + 2 × input 单价 + output 单价) / 10
```

Pro API 原生字段为 `pricing.price_1m_blended_7_to_2_to_1`；Free API 不返回该成品字段时，
由 `price_1m_cache_hit_tokens`、`price_1m_input_tokens`、`price_1m_output_tokens` 计算。
没有 cache-hit 单价的模型不参与该成本口径下的 Pareto 前沿。

## 方法学：最优前沿与剪枝

- **方向约定（更优）**：智能 ↑、有效运行成本 ↓、速度 ↑。
- **3D Pareto 支配**：`A 支配 B` ⟺ 三维均不劣且至少一维严格优。
- **Pareto 分层（skyline peeling）**：第 1 层 = 非支配集（**最优前沿**），剥离后重复；
  层号即“离前沿的距离”。
- **前沿流形**：把第 1 层（Pareto 最优）的点投影到 (log成本, 速度) 平面做 **Delaunay 三角化**、
  抬升 z=智能，织成“在每个成本/速度处由最智能模型编织的流形”。**默认以线框呈现**，可一键切换半透明实心面
  （见下「交互」说明其取舍）。
- **可达前沿曲面（可选副视图）**：`F(成本预算 c, 速度下限 s) = max{智能 | cost≤c 且 speed≥s}`，
  单调阶梯面，按钮/图例里可开。
- **剪枝（均衡档，默认）**：剔除**过旧**与**离前沿太远**的模型：
  `保留 = Pareto最优点 ∪ (近 since-months 月 ∧ 处于前 layers 层)`，
  再减去早于 `hard-age-cutoff-months` 的“远古”模型（即便 Pareto 最优）。
  所有阈值均可调（见下）。

## 突出度指标：一个 SOTA 模型比前沿趋势领先多少

Pareto 层号只回答「在不在前沿」，不回答「有多突出」。这里给**四个互补的连续标量**度量
「一个前沿(SOTA)模型比其余 Pareto 最优构成的**趋势**领先多少」，页面右上「突出度」面板里用
**指标选择器**切换：选中的口径同时驱动 **Pareto 黑色空心圈的大小（越突出圈越大）** 与下方
**前沿排行榜**。四指标一律在当前口径的显示集(kept)上计算，前沿与图上一致。

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

```bash
# 1) 安装依赖（建议虚拟环境）
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt

# 2) 配置 API key（任选其一）
export ARTIFICIAL_ANALYSIS_API_KEY="aa_xxx"   # 设备级（已写入 ~/.zshenv / ~/.zshrc）
# 或：cp .env.example .env 后填入

# 3) 生成交互式 HTML 与前端复渲染数据契约（默认均衡剪枝）
.venv/bin/python -m src.cli
# → output/frontier_3d.html
# → output/frontier_3d_visualization_dataset.json
```

### 参数

| 参数 | 默认 | 含义 |
|---|---|---|
| `--since-months` | 18 | 软窗：近 N 月内算“近期” |
| `--layers` | 3 | 保留前 N 层 Pareto（离前沿距离） |
| `--hard-age-cutoff-months` | 36 | 早于此一律剔除（含 Pareto） |
| `--speed-scale` | `log` | 速度轴 `log` 或 `linear` |
| `--speed-metric` | `effective` | HTML 初始速度口径：`effective` / `raw`；页面内仍可切换 |
| `--cost-metric` | `effective` | HTML 初始成本口径：`effective` / `blended`；页面内仍可切换 |
| `--refresh` | 关 | 忽略 `data/raw/` 缓存，重新拉取 |
| `--export` | 无 | 另存静态图 `png` / `svg`（需 kaleido） |
| `--out` | `output/frontier_3d.html` | 输出路径；所有指标组合统一在同一个 HTML 内 |
| `--frontier-3d-visualization-dataset-out` | HTML 同目录的 `frontier_3d_visualization_dataset.json` | 输出前端可渲染的数据契约 |
| `--frontier-3d-visualization-dataset-in` | 无 | 读取既有数据契约并直接重渲染 HTML，跳过 API 取数和指标计算 |

```bash
# 更激进/更聚焦前沿
.venv/bin/python -m src.cli --since-months 12 --layers 2
# 初始显示原始速度 × 7:2:1 混合单价（页面内仍可切换）
.venv/bin/python -m src.cli --speed-metric raw --cost-metric blended
# 重新拉取最新数据 + 导出静态图
.venv/bin/python -m src.cli --refresh --export png
# 前端迭代：复用上次数据契约重渲染 HTML（无需 API key / 网络）
.venv/bin/python -m src.cli \
  --frontier-3d-visualization-dataset-in output/frontier_3d_visualization_dataset.json
```

### 打开与本地托管

`output/frontier_3d.html` 是自包含单文件 HTML，Plotly、数据契约与前端交互资源都已内联，
因此可以直接打开：

```bash
open output/frontier_3d.html
```

也可以把 `output/` 作为静态目录本地托管，便于在浏览器里固定使用 URL、刷新调试或分享给同机其他工具：

```bash
.venv/bin/python -m http.server 8765 --bind 127.0.0.1 --directory output
# 浏览器打开：http://127.0.0.1:8765/frontier_3d.html
```

如果只改前端资源或 HTML renderer，优先复用现有
`output/frontier_3d_visualization_dataset.json` 走 `--frontier-3d-visualization-dataset-in`，
避免反复重算 Pareto 指标。需要重新生成数据契约但仍可复用 `data/raw/` 缓存时，运行无
`--frontier-3d-visualization-dataset-in` 的默认生成命令；需要重拉 AA API 与网页时，必须加
`--refresh`（或清理 `data/raw/` 缓存）。

## 交互

- 拖拽旋转、滚轮缩放；悬浮看 名称/厂商/发布日期/智能/原始速度/冗长度/有效速度/有效运行成本/混合价/
  Pareto 层，以及**四个突出度值**（趋势残差 / 智能抬升 / 加权超体积 / 到前沿垂距）。
- 右上角可独立切换成本口径（有效运行成本 / 7:2:1 混合单价）和速度口径（有效速度 / 原始速度）；
  四种组合各自重新计算 Pareto、剪枝、前沿和轴范围。
- 其下的「**突出度**」面板：指标选择器决定哪个口径驱动 **Pareto 圈的大小（越突出越大）** 与
  **前沿排行榜**；选「加权超体积」时 3 个轴权重滑杆(智能/成本/速度，各带输入框)可用，拖动即时重排
  （见上「突出度指标」节的权重语义）。
- 右侧图例按**厂商**着色，可点选过滤；**Pareto 最优** 点用黑色空心圈强调。
- 顶部按钮分两组：左组切前沿样式 `前沿线框` / `前沿实心面` / `隐藏前沿` / `仅散点`，
  右组独立开关 `+可达前沿曲面` / `−可达前沿曲面`（两组互不干扰）。
- **为什么默认线框**：Plotly 3D 有一处已知痼疾——半透明 `Mesh3d`/`Surface` 会赢得深度拾取缓冲，
  且 `hoverinfo=skip` 会把**其下方/后方节点**的悬浮面板与三维定位线一并吞掉（曲面上方的点不受影响）。
  线框只占极细像素、几乎不参与拾取，故默认用线框 → **所有节点都能正常悬浮**；需要实心观感时切「前沿实心面」
  （此时被它盖住的节点悬浮会暂时失效，属该模式的已知取舍）。

## 结构

```
data/reference/  # 版本化 fallback snapshot：AA 页面退化时补齐历史成本/冗长度
src/fetch_data.py   # 拉新版分页 API + 网页补齐，派生有效速度与 7:2:1 混合单价
src/frontier.py     # 按所选成本/速度口径做 3D Pareto 分层、可达前沿、剪枝与四个突出度指标
src/visualize.py    # 生成 Plotly traces/layout 与谱系 payload（不再负责主路径 HTML 拼装）
src/frontier_3d_visualization_dataset_builder.py     # 取 Plotly 图与交互 payload，写成稳定 JSON 数据契约
src/frontier_3d_self_contained_html_renderer.py      # 把数据契约 + 前端资源内联成单文件 HTML
src/frontier_3d_interactive_report_assets/           # HTML/CSS/JS 前端资源
src/cli.py          # 串联：取数 → 数据契约 → 单文件 HTML
```

## 说明

- 智能分一律取自 API；有效运行成本优先取 API、网页/上次 CSV 补齐。图上标题标注数据拉取日期。
- AA API 免费、限 1000 次/天；`data/raw/` 会缓存原始 API JSON 与网页，默认复用、`--refresh` 重拉。
- `.env` 含真实密钥、已被 `.gitignore` 排除，请勿提交；如密钥外泄可在 AA 平台轮换。
