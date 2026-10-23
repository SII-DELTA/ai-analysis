# OpenAnalysis.ai：开发 agent、插件与 skill 生态初步调查

资料检查日期：2026-10-23。交付类型：公开资料研究、证据目录与后续评测建议。没有安装被调查扩展，没有运行付费模型，也没有将任何公开实验标为本任务复跑。

用户提出的目标是比较相近能力、持续跟踪新模型发布后的效果；本轮确认以**软件开发 agent 为主，交付生态与证据地图**。维护协作与用户数据反馈闭环属于用户描述的 Theseus 方向，本报告只记录与可比较性有关的背景，不设计那两套系统。以下选样、分组和栏目建议是本次分析，不是用户已经批准的网站实现需求。

结构化记录见 [项目与证据目录](ecosystem-project-evidence-catalog.json)。它汇总 12 个重点项目、9 个宿主、6 个邻近项目，以及评测、来源和首批基线建议。各组原始调查记录保存在 [research-contributions](research-contributions/)，来源包含检查时间、仓库 commit、文件 blob SHA 与适用范围；两种 SHA 不互换。

## 主要判断

**这个方向值得继续，但市场定位需要比“给 skills 做排行榜”更具体。** 已存在同任务横评、多模型技能评测与 token 优化排行榜。OpenAnalysis 的候选价值，是把这些分散结果整理成可审计、按任务与版本查询的证据，并补上“用户是否更容易理解和作出决定”的评价。是否存在足够大的持续监测缺口，仍需对维护频率与用户需求进一步验证。

| 初查判断 | 对 OpenAnalysis 的含义 |
|---|---|
| 同类横评已经存在 | [THOL](https://github.com/pi-infected/token-harness-optimizer-leaderboard)、[JetBrains 系列](https://blog.jetbrains.com/ai/2026/07/ponytail-skill-claude-tested/)应作为方法和竞争参照，不能宣传为首个横评平台。 |
| 多代模型与技能增益也已有公开展示 | [SkillsBench](https://www.skillsbench.ai/)已做有／无任务技能的配对；本次未确认其对每次模型发布完整重跑的保证。多代模型图与持续受控实验不是同一证据。 |
| “省 token”至少包含四种不同干预 | 精简 prose、减少不必要代码、压缩工具输入、减少往返或委派上下文，应分别比较。局部压缩率不能直接替代总成本。 |
| 输出体验的公开证据较薄弱且不一致 | 有自测、规则清单和模型盲评，但不能把它们合称真人用户研究或跨宿主效果。 |
| 项目名不足以标识被测对象 | 原版 Caveman 与当前套件、RTK 不同 edition、GSD 开发分支与稳定 tag，必须分别锁定。 |
| 一个总冠军榜很容易误导 | 应先给同一宿主、模型、任务集下相对基础对照的增益，再呈现质量、成本、时间与交互负担的取舍。 |

## 1. 比较单位：包装形式和能力机制分开

本报告使用三个相互独立的分类轴：

| 轴 | 记录内容 | 为什么需要 |
|---|---|---|
| 包装形式 | harness/runtime、规则文件、单个 skill、skillset、plugin、MCP/CLI/proxy、完整 workflow | plugin 可以同时装载 skill、hook 和工具；“装了同名 skill”不保证干预相同。 |
| 干预机制 | 回答压缩、实现精简、上下文选择／压缩、批量工具执行、持久记忆、呈现与澄清、流程约束 | 能力相似的项目可能跨包装类别；同一个项目也可能覆盖多个机制。 |
| 生效与计量范围 | 成稿、某轮、工具 payload、完整会话、跨会话项目；显式调用、自动选择、hook 强制注入 | 回答变短、单次工具输出变小、总任务便宜，分别需要不同证据。 |

[Agent Skills 规范](https://agentskills.io/specification)定义了 `SKILL.md`、可选脚本和参考文件等包装约定；它并不统一所有宿主的调用政策与权限。[Claude Code plugin](https://code.claude.com/docs/en/plugins)可以包含 skills、agents、hooks 与 MCP；[OpenCode](https://opencode.ai/docs/skills/)又有自己的按需发现和加载规则。因此后续基准必须记录实际注入与工具调用，而不仅记录安装目录。

本文所说“质量”也分两层：交付代码或工件是否正确、完整；用户是否得到足够且可信的信息。少写代码、少写文字、少问问题都只能作为描述量，不能单独当质量分。

## 2. 宿主生态概览

下表是公开接口和产品边界调查，没有逐宿主运行兼容性测试。许可证描述按所列源码范围读取；公开 GitHub 页面、开放模型与开源宿主互不等价。

| 宿主 | 在生态中的角色 | 与比较有关的边界 |
|---|---|---|
| [Codex CLI](https://github.com/openai/codex) | 本地编程 agent、项目指令与 skills、自动化执行背景 | CLI 仓库 Apache-2.0；源码 commit 不等于已安装 binary，模型、配置与交互模式仍需固定。 |
| [Claude Code](https://github.com/anthropics/claude-code) | 此次许多扩展和横评的主要宿主 | 固定的公开仓库 LICENSE 指向商业条款；不能把含示例插件的仓库当产品引擎已开源。 |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | 开源终端 agent，支持 MCP 与 extensions | 当前 README 对部分用户转向 Antigravity CLI、最新模型适配有提示；后者应另作产品身份，不能继承旧分数。 |
| [OpenCode](https://github.com/anomalyco/opencode) | skills、事件插件、MCP 与自定义工具可组合 | 当前默认分支是 `dev`；官网说明与某个稳定 binary 的一致性需要在实测时核验。 |
| [Pi](https://github.com/earendil-works/pi) | 最小可扩展宿主，将 extensions、skills、prompts、themes 打包分发 | 已从 `badlogic/pi-mono` 迁移；历史名称、包名及锁定方式需要保留。 |
| [oh-my-pi](https://github.com/can1357/oh-my-pi) | Pi 的独立 fork，将编辑格式、检索、模型角色与技能管理内建 | 和 Pi 分开列版本；宿主工具本身改变时，不能把收益都归给外挂 skill。 |
| [OpenHands](https://github.com/OpenHands/OpenHands) | 当前主仓库是 Agent Canvas；运行核心另在 [Software Agent SDK](https://github.com/OpenHands/software-agent-sdk) | 历史 benchmark 中的 OpenHands 身份需要追到 agent 实现、SDK 与配置，不能只固定控制界面。 |
| [Cline](https://github.com/cline/cline) | 共享引擎覆盖 CLI、桌面与 IDE，含 rules、skills、插件和 MCP | 主仓库 Apache-2.0；README 明确 JetBrains plugin 当前不公开源码，各表面也不保证能力完全一致。 |
| [Aider](https://github.com/Aider-AI/aider) | 结对编程及 repository map，是内建上下文选择的参照 | 本轮未确认原生 `SKILL.md`/plugin 装载接口，不类推其他宿主安装方式；README 的模型例子也不是当期完整兼容清单。 |

本轮没有制定“所有宿主都必须运行同一模型”的假设。扩展增益可在每个受支持的宿主—模型组合内做配对；只有确实支持相同模型、端点与条件时，才进一步比较宿主。其他组合保留为不同产品配置。

## 3. Token 效率：五个重点项目

| 项目 | 实际干预 | 证据解读与下一步 |
|---|---|---|
| [Caveman](https://github.com/JuliusBrussee/caveman) | 原版主要约束回答 prose；当前已扩展到输入处理、模型／effort 路由等组件 | 把历史 voice skill 和当前 suite 分开。回答例子的降幅不能外推到整段编程任务，当前套件也不能继承旧版评测结果。 |
| [Ponytail](https://github.com/DietrichGebert/ponytail) | 先看现成代码、标准库和平台能力，减少不必要实现；另含 review/audit 等能力 | 主要是实现选择与范围控制。需要检查功能完整、验证与错误处理，不能仅按 LOC 判断胜出。 |
| [RTK](https://github.com/rtk-ai/rtk) | 过滤和压缩 shell 工具输出，当前也有 engine/proxy 产品边界 | 本地输出压缩和输入估算不能代表总账单；按 OSS/core、engine/proxy 与实际启用项分组。 |
| [Headroom](https://github.com/headroomlabs-ai/headroom) | proxy/library/MCP 等入口，按内容压缩并允许取回原文；还组合其他能力 | 同时计入压缩器、检索、重试和 cache 影响；先限定单一模式，避免把整套效果归给一个算法。 |
| [Context Mode](https://github.com/mksglu/context-mode) | 工具在 sandbox 中执行，只回传提取结果；结合搜索、连续性和代码化分析 | 更接近上下文与工具执行系统。单条 payload 的大幅缩小无法证明会话总成本或跨 compaction 正确性改善。 |

**版本与许可证是研究结果的一部分。** 当前固定 Caveman `LICENSE` 为 Apache-2.0，历史原版属于另一版本；旧搜索摘要中的许可组合不能自动沿用。RTK 的 core 与 engine/proxy 许可不同；Context Mode 当前为 ELv2。目录按组件保存实际读取的许可，不将“源码可读”一律写成 OSI 开源，也不在本报告作商业使用的法律判断。

### 为什么节省率经常无法直接比较

对于一次完整任务，总成本至少可能包含新输入、cache read/write、输出、reasoning、额外模型路由或压缩调用，以及工具基础设施成本。provider 的 usage 字段可能已把 reasoning 计入 output，**不能把重叠字段再次相加**。订阅限额、API 牌价模型和实际美元账单也要分别记录。

工具输出减少后，还可能出现额外检索、重读、debug 或错误恢复；输入重写也可能破坏缓存前缀。短任务中，skill 本身的注入开销可能超过节省；长任务则受历史重发、cache 和重试影响。后续评测应同时给出局部压缩量与完整任务结果，并把冷启动、热缓存、索引建立和重复使用拆开。

### 公开数字应该怎样读

下表各行是不同实验，不能按节省率排序。JetBrains 系列采用相近任务来源，但 effort、版本和有效样本并不完全相同。

| 实验 | 模型／宿主／样本 | 公开结果的实际计量范围 | 关键限制 |
|---|---|---|---|
| [JetBrains：Caveman](https://blog.jetbrains.com/ai/2026/07/speak-to-ai-agents-like-cavemen-tosave-tokens/) | Sonnet 5 low；Claude Code 2.1.200；82 个可比较配对任务 | 输出 tokens 约 592k→542k，**−8.5%**；不是 LOC 或整段任务总 token | 强制激活；未给完整 skill commit。质量检验未发现显著差异，不证明等价。 |
| [JetBrains：RTK v0.43.0](https://blog.jetbrains.com/ai/2026/07/rtk-claude-code-token-savings/) | Sonnet 5；Claude Code 2.1.201；low 为 80 clean pairs | low 的典型任务成本 **+7.6%**；high 分组约 +0.1% | 命令输出变小没有转化为这组条件下的成本下降；不能外推到当前 engine/proxy。 |
| [JetBrains：Ponytail v4.8.4](https://blog.jetbrains.com/ai/2026/07/ponytail-skill-claude-tested/) | Sonnet 5 medium；Claude Code 2.1.201；80 pairs | 典型任务成本 **−10.3%**；累计写出代码约 −15.4%，并非最终 diff | 成本配对检验 p=.004，但 bootstrap 中位区间触零；代码差异 p=.088。安全与可访问性未专项覆盖。 |
| [作者：Ponytail 5](https://github.com/DietrichGebert/ponytail/blob/09c434ab73ca43761c5d8b0c5d341926c2fba710/benchmarks/results/2026-10-07-agentic.md) | Opus 5.5 default；Claude Code 2.1.288；39 tasks × 3 arms × 5 runs | 相对无 skill，任务中位比值的几何平均成本 **−26%**，95% 区间 −36%～−16% | 禁用 Bash，代码与测试事后执行；仅 18 个任务有隐藏执行检查（87/90 对 86/90），不能称全部任务质量等价。 |
| [Tura：eza 移植](https://github.com/Tura-AI/benchmark/blob/da58a15d35b5284db2abfd233378093a2689dc5c/blog_data/token-saving-plugin-eza/README.md) | gpt-5.6-sol high；Codex CLI 0.144.1；1 个任务，每组 2 runs | 公开了三个插件与匹配基础对照的分数、usage 与 modeled cost | 小样本、较大组内波动，且对照来自此前运行；只作描述证据。exit 0 不代表 52 项断言全部通过。 |

[当前 Caveman README](https://github.com/JuliusBrussee/caveman/blob/b4531dfc05a3ef0ba93b57e8bfa5f48564a4b4d6/README.md)还明确将“简洁回答”作为对照：其引用的旧 3.1.0 规则中，普通 voice 额外中位减少约 3%，更强的 ultracave 约 35%，并有约 1,160 输入 token 的规则开销；该组规则尚未重跑。这是应加入廉价短提示对照的具体理由，并不是当前套件的端到端收益。

原版 Caveman 已追溯到 [2026-04-04 的提交](https://github.com/JuliusBrussee/caveman/tree/af5375d6f0151b1441f638d855f6829f5e6724df)：当时的约 75% 主张主要由示例支持。当前 voice、输入压缩和路由分别保存证据，不继承这项比例。

JetBrains、Tura 都处于开发工具市场；它们外部于被测项目，但不因此自动中立。THOL 的维护者同时开发参评工具。目录保留这些关系以及作者自测身份，评价重点是可审计条件、原始材料和能否复现。

## 4. 交互体验：四个重点项目

| 项目 | “何时、呈现什么、怎样呈现／提问”的机制 | 已有证据与限制 |
|---|---|---|
| [i-have-adhd](https://github.com/ayghri/i-have-adhd) | 回答或动作前置、步骤分块、明确状态；同时对错误、模糊需求和解释请求设例外 | 有公开单轮自测，14 cases × 3 trials × 2 conditions；综合分提高，但 release gate 为 **FAILED**。其中一个需编辑仓库的案例被禁用工具，使任务不可满足；另有无证据定因的退步。不是对特定认知群体的临床或真人可用性证据。 |
| [Humanizer](https://github.com/blader/humanizer) | 识别并编辑重复文风模式，要求保持事实、声音和技术内容；主要处理成稿 | README 的 16/16 偏好来自外部使用者的模型盲评报告，全部计划试次未完成，被测版本未对应当前 3.1.0。不能解释成人类用户研究，也不证明长程 agent 沟通变好。 |
| [No AI Slop](https://github.com/petergyang/no-ai-slop) | 编辑、检测和草拟模式，清理公式化表达并保留作者声音 | `eval.md` 是自检清单，本次未找到固定提交所对应的公开量化配对结果。禁词命中数不是可读性、真实性或交互价值的替代指标。 |
| [Matt Pocock Skills](https://github.com/mattpocock/skills) | `grilling` 按决策依赖组成轮次，给推荐答案；`grill-me` 与 `grill-with-docs` 提供不同上下文和持久化方式 | 实际指令可读，本次未找到这些技能的同任务配对收益。遍历全部设计树可能增加用户负担，推荐答案也可能引导迎合；这些是待实验权衡，不是已证实缺陷。 |

原始材料包括 [i-have-adhd 自测报告](https://github.com/ayghri/i-have-adhd/blob/1ecea1993b7fce257ffbd686c070948b5e07eda6/evals/RESULTS.md)、[Humanizer 外部使用者报告](https://github.com/blader/humanizer/issues/229)、[no-ai-slop 自检清单](https://github.com/petergyang/no-ai-slop/blob/000650b156983f5159695b441477f4e63b25dc85/skills/no-ai-slop/eval.md)及 [grilling 指令](https://github.com/mattpocock/skills/blob/5beb35b040e3de97e54fa9e386d7e42d15c295c2/skills/productivity/grilling/SKILL.md)。实验条件与检查范围另见 [交互证据记录](research-contributions/interaction-experience-evidence.json)。

这里存在三个不同的目标：成稿是否读起来清楚；用户是否及时知道真实状态；agent 是否在必要时问到了关键问题。它们可以相互促进，也可能冲突。例如持续“给下一步”对未完成任务有用，对已完成的一步请求则可能增加噪声；不问问题可以减少打断，也可能把缺失需求变成返工。

**中文与偏好边界：**多数现有材料以英文规则和模型评分为主。英文 word budget、标点禁令、短句偏好不能直接转换为中文效果。本轮记录适用性未知；后续应测试中文技术术语、保留语、信息密度，以及偏好短答和需要解释的不同读者。不得以 AI detector 通过率替代这些目标。

## 5. 完整开发工作流：三个重点项目

| 项目 | 与交互有关的设计 | 为什么需要整流程评价 |
|---|---|---|
| [Superpowers](https://github.com/obra/superpowers) | 组合澄清、设计、计划、实施和审查；当前 brainstorming 强调先读已有上下文，明确小任务可直接处理 | v7.0.1 的发布说明调整了上一版令人厌烦的提问行为，说明同一项目名的交互政策会变化。已有内部行为评测与窄回归实验，不等于完整 workflow 的外部效益横评。 |
| [gstack](https://github.com/garrytan/gstack) | 角色化命令；`office-hours` 使用带背景、推荐与权衡的 decision brief，并受运行时状态与偏好影响 | 有 native 提问 payload 捕获和隔离测试设施；其 `question_captured` 明确 `workflowCompleted:false`。出现一个正确问题，不代表用户完成了决策，更不代表最终交付成功。 |
| [GSD Core](https://github.com/open-gsd/gsd-core) | Discuss→Plan→Execute→Verify→Ship；重任务使用 fresh context，主会话协调并读取持久决策文件 | 当前默认分支为 `next`，观察到稳定 tag `v1.18.0`，两者 commit 不同。主会话变小不代表所有执行者的总 token、总时间变少。 |

本次核对 GSD 的 README 与 questioning 文件在两个所读 ref 的 blob 相同，但没有据此推断整个仓库等价。旧 `gsd-build/get-shit-done` 已指向新仓库。原始材料包括 [Superpowers v7.0.1 发布说明](https://github.com/obra/superpowers/releases/tag/v7.0.1)、[gstack 交互测试说明](https://github.com/garrytan/gstack/blob/b04cc35832183a89ed71eed628de15a6f315a1a8/docs/TESTING_INTERNALS.md)及 [GSD v1.18.0](https://github.com/open-gsd/gsd-core/releases/tag/v1.18.0)。版本、讨论模式、并行度、状态文件和更新策略都应成为实验条件。详见 [工作流与评测证据](research-contributions/workflow-and-benchmark-evidence.json)。

## 6. 邻近生态：保留边界，避免遗漏替代机制

| 项目 | 值得观察的机制 | 本轮定位 |
|---|---|---|
| [Serena](https://github.com/oraios/serena) | 符号级检索、引用、语义改写与 REPL 工具接口 | 精准上下文选择参照；agent 自述推荐不是独立效果测量。Serena application 与 SolidLSP 许可分别记录。 |
| [LLMLingua](https://github.com/microsoft/LLMLingua) | 使用模型或编码器选择保留的 prompt token | 研究背景；RAG／单轮压缩结果不能直接外推为开发会话收益。 |
| [TOON](https://github.com/toon-format/toon) | JSON 数据模型的紧凑表示，针对字段一致的数据 | 表示层优化参照；复杂嵌套和异构数据不保证更省。 |
| [Karpathy-Inspired Guidelines](https://github.com/multica-ai/andrej-karpathy-skills) | 用少量原则限制假设、复杂度和修改范围 | 短规则对照候选；项目是对观点的整理，不表述为 Karpathy 本人背书。 |
| [Spec Kit](https://github.com/github/spec-kit) | 规格、模板、可组合流程及质量关口 | 完整 workflow 的后续扩展候选；不同 preset/bundle 要分开。 |
| [BMad Method](https://github.com/bmad-code-org/BMAD-METHOD) | 分级流程、角色与持久上下文 | 当前 main README 区分 preview 和稳定线，不能用预计发布日期代替实际发行验证。 |

这些项目仅做概览，没有把其性能数字纳入本报告的已审计比较。技能发现方面，[skills.sh](https://skills.sh/docs) 的官方说明以 CLI 安装遥测组织排行榜，适合发现流行项目；安装量与安全扫描均不能替代效果测量。

## 7. 已有评测覆盖了什么

| 评测／研究 | 可以复用的部分 | 比较和证据边界 |
|---|---|---|
| [SkillsBench](https://www.skillsbench.ai/) | 版本化真实任务、确定性 verifier、有／无任务技能、调用率、多模型／宿主展示 | v1.1 为 87 tasks、8 domains；被测干预主要是任务专属 curated bundle，不是任意同类插件榜。网站观察到 `recomputed 2026-07-16`；没有确认逐模型发布全量重跑保证。 |
| [SWE-Skills-Bench](https://arxiv.org/abs/2603.15401v1) | 真实仓库、需求与 acceptance checks，可研究 marginal skill utility | 49 skills、约 565 task instances 的 preliminary 论文实验使用 Haiku 4.5／Claude Code，并让 agent 自主发现根目录 skill。本次 GitHub API 返回 404，但作者 HF 数据可达；不声称完整 runner 可复现。 |
| [THOL](https://github.com/pi-infected/token-harness-optimizer-leaderboard) | end-to-end 成功率、成本、时间、安装/调用证据、隔离与控制方差 | 维护者同时开发参评工具 tokenade；其按成功 run 聚合的成本需与所有尝试的花费、失败率一起读。不能当跨全部宿主的结论。 |
| [CAVEWOMAN](https://github.com/danielle34/cavewoman) | 分开考察输入语言压缩和输出约束，同时看正确性、价格模型与语义保持 | 语言压缩研究，不是当前完整 Caveman suite 或软件开发 workflow 的验收。不能把“删用户 prompt 语法”的结果等同所有工具上下文压缩。 |
| [ReqClarifyBench](https://arxiv.org/abs/2610.13022v1) | 341 个仓库级开发任务、多 persona、逐需求覆盖与文档质量分开 | 使用模拟用户及模型 judge；发布材料指向 Zenodo v1，本次未下载或执行，重用许可尚未核实。 |
| [AskBench](https://github.com/jialeuuz/askbench) | 缺失信息与错误前提场景、主动澄清、最后答案与 checkpoints | 偏通用 QA；judge 同时模拟用户和评分可能耦合偏差。所读代码 commit 与论文 v2 日期不同，未证明完整对应。 |
| [Ask or Assume](https://github.com/nedwards99/ask-or-assume) | 完整／隐藏 issue、交互对照、分离不确定性检测角色与最终 resolve rate | 模拟 oracle 用户比真实开发者配合；额外 Intent Agent 的调用也要计入开销。论文与当前仓库新增模型分开。 |

[SkillsBench v1.1 发布汇总](https://www.skillsbench.ai/blogs/skillsbench-1-1)给出平均 resolution 33.9%→50.5%（**+16.6 个百分点**）；[SWE-Skills-Bench 原论文](https://arxiv.org/abs/2603.15401v1)给出 89.8%→91.0%（**+1.2 个百分点**）。它们的任务、模型、激活、初始难度和技能单位不同，**不能据此判断哪套技能更好，也不能合并成一个技能平均增益**。后者报告的最高 450.8% 开销是 input+output token 增幅，不是美元账单增长。来源和条件见目录对应 benchmark 记录。

本轮覆盖这些代表性来源，不构成所有竞品的穷尽调查。没有找到某种横评时，结论是“在所查材料内未证实”，不是“整个生态不存在”。

## 8. 首批八个基线候选

这是后续实验的选样建议，**不是效果排名或安装推荐**。先一次启用一个项目的选定组件，再研究组合；单独启用组件仍不证明已隔离其内部每种机制。原生宿主和简单提示是每组必备对照，不计入八个项目。

| 候选 | 比较组与首批目的 | 进入实验前要锁定 |
|---|---|---|
| Caveman voice | 输出精简：和无扩展、“简洁回答”短提示比较 | 原版历史 skill 与当前 voice 分别记录，关闭 suite 其他组件；确认实际注入。 |
| Ponytail | 实现精简：和无扩展、简单 YAGNI 提示比较 | 强度、hook、被测 skill、任务规格与质量检查。 |
| RTK OSS/core | 工具输出：命令密集、日志／测试诊断任务 | edition、过滤器、命令覆盖率及原文恢复路径；不混入 proxy。 |
| Headroom 的单一压缩模式 | 工具／上下文输入：和原文、简单确定性过滤比较 | 入口、算法、阈值、取回原文、cache 条件及压缩器总成本。 |
| i-have-adhd | 开发状态与动作信息呈现 | 每轮规则、调用方式、任务是否允许工具；修正自测不可满足场景。 |
| Humanizer | 成稿文风：与相同事实原文配对 | 当前 skill 内容、输入稿及事实保持检查；独立于 agent loop 实验。 |
| no-ai-slop | 同类成稿干预：与 Humanizer、简单清晰写作提示比较 | 编辑／检测模式、事实与作者声音约束；不按禁词数量决定胜负。 |
| Matt Pocock grilling | 需求澄清：明确任务、关键歧义和偏好变化任务 | 单独 skill 与完整 pack、上下文持久化、提问轮次及用户反馈条件。 |

Context Mode 留作工具执行与会话连续性的后续专题；Superpowers、gstack、GSD 则进入完整工作流专题。它们值得研究，但需要多阶段、状态恢复、用户参与及全部执行者成本的设计，不能只套用单轮 token 测试。这个安排是按可解释的干预范围分组，不代表质量较差。

## 9. 后续评测应如何回答用户关心的问题

### 9.1 效率必须在质量与完整开销旁边呈现

主报告同时列：功能／需求通过率，所有尝试总花费，每次成功交付成本，完成时间与失败／返工情况。成功率＝成功运行数／全部运行数；每次成功交付成本＝全部运行总花费／成功运行数，失败花费计入分子。零成功时标为“无成功交付／未定义”，不记零成本。只成功 run 的条件均值可以补充展示，但不能隐藏失败造成的成本。LOC、prose token、工具 payload 和缓存命中率是解释指标。

质量首先用独立 acceptance checks、隐藏测试及工件完整性验证。UI 功能不能因原生组件较短就忽略需求、平台和可访问性。无统计显著差异不证明质量等价；样本不足时保留不确定性。小样本试验先校准自然波动，再决定正式任务数与重复次数；本轮不伪造功效估算或实验预算。

### 9.2 信息呈现与提问使用不同场景

| 场景 | 应观察的能力 | 避免的错误奖励 |
|---|---|---|
| 一个明确、可直接完成的小修改 | 直接行动、报告实际结果 | 因问题少就把遗漏验证或虚假完成算好。 |
| “支持 CSV 导入”且关键产品语义未定 | 问出会改变验收的决策，说明推荐和权衡 | 用提问数量或穷尽问题树代替需求解决。 |
| 缺失事实可从仓库配置查到 | 先查环境，减少无价值打断 | 把向用户索取环境中已有答案视为谨慎。 |
| 用户改主意、只回答部分问题 | 保留已确认事项，更新依赖与规格 | 把推荐答案的默认接受误作真实偏好。 |
| 长任务部分成功、测试失败或尚未验证 | 及时、准确说明进度、障碍和需要的决定 | 为追求短答删去关键失败，或无证据给出根因。 |
| 原文含专业术语、事实、引用和作者声音 | 清楚表达且保持含义与技术内容 | 禁词越少得分越高，或虚构细节来显得具体。 |

评分至少分开记录事实准确、必要信息覆盖、行动可执行性、问题相关性、已解决歧义、最终需求满足及用户交互成本。模拟用户实验用于扩大可重复覆盖；真人阅读、决策正确性和实际负担需要另做知情参与研究，二者不合并成一个分数。模型 judge 采用盲化、顺序交换、明确 rubric 和人工抽检，并记录 judge 版本。

### 9.3 跨模型发布追踪采用两种受控比较

1. **固定扩展，观察模型变化。**任务、扩展内容、宿主、工具和配置保持固定，在受支持的新模型上重跑基础对照与候选，测量增益是否保留、消失或反转。
2. **固定模型，观察扩展变化。**新旧扩展在相同任务和模型条件下比较，防止把模型升级的收益记给 skill 更新。

每个实验身份至少包含 provider 与实际 model ID／可得 fingerprint、effort、harness 版本、扩展 commit 与组件、激活证据、任务／verifier 版本、环境和工具、采样配置、运行日期、价格版本、cache 与初始状态。服务端 alias 无法固定时明确标注可复现性限制。宿主升级或新增工具也产生新的比较条件。

历史结果保留原身份，新增版本标为待重测；不要把旧分数移到新模型名下。模型发布先触发筛选面板，再按差异扩展任务覆盖；筛选结果与正式结果分别展示。仅价格变化时，可以对冻结 usage 重新计价，但明确标为复算，不标成模型重跑。跨会话记忆与索引实验预先规定初始状态和冷／热条件，防止各组相互污染。

## 10. OpenAnalysis 的栏目与定位建议

建议首期围绕三个读者问题组织内容：

- **有哪些同类方案？**按能力检索，展示机制、适用范围、组件、版本和宿主支持；项目热度用于发现，不用于效果排名。
- **现有证据能证明什么？**项目自测与外部评测并列，展开模型、任务、激活、计量口径、原始轨迹及局限；未测试保持未知。
- **换了模型还值得用吗？**按版本查看相对基础对照的增益和变动，展示质量、成本、时间、交互负担的可比前沿与不确定性。

其差异化是一个待验证的产品假设：持续、可审计的条件化比较，以及开发沟通的结果评价。THOL 已接近第一部分；SkillsBench 已覆盖技能使用与多模型；skills.sh 已解决大量发现与分发需求。应复用可授权、可核验的公开任务和轨迹，先建立证据卡与版本历史，后决定哪些缺口值得自行实验。

这些建议不包含用户数据采集、维护者协作平台或网站实现。若未来将 Theseus 加入，应使用同一冻结评测规范与普通参评流程，披露共同所有者关系，让其报告可以包含负面结果；可按质量、成本、完成时间和交互负担呈现 Pareto 取舍。模型智能指数与 workflow 成功率属于不同量，不直接叠到现有 Frontier 3D 的坐标中。

## 11. 阅读证据目录与交付边界

目录将来源性质、可复现材料、实际运行和因果解释分开。上游有代码、测试或自述，不自动升级为已证明收益；本任务也没有验证安装、实际触发或模型行为。

- `projects`：12 个重点项目及其组件、激活、声明、公开证据和局限。
- `harnesses`、`adjacent_projects`：宿主与邻近机制概览，深度低于重点项目。
- `benchmarks`、`external_evaluations`：任务、模型、样本、计量范围与复现状态。
- `sources`：一手出处、检查日期与可得的仓库／文件身份；动态网页与不可达材料另标。
- `recommended_baseline_candidates`、`model_release_tracking_recommendation`：本次建议，不是已运行实验。

本次完成的是研究材料与结构验证。离线检查可重复执行：

```bash
python3 docs/openanalysis-agent-harness-plugin-skill-ecosystem-investigation/validate_research_evidence_catalog.py --write-validation-report
git diff --check
```

[检查脚本](validate_research_evidence_catalog.py)验证引用、完整 commit、输入 SHA256、汇总一致性和本地链接；结果保存在 [研究验证记录](research-validation-results.json)。来源中的付费实验、作者测试和第三方结果均没有在本任务复跑；来源外部更新、数据污染、用户模拟与真实人类行为之间的差距仍然存在。
