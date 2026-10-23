# 研究执行与验证记录

本记录区分公开来源的硬件测量、本地离线复算与研究交付。资料截止2026-10-22；最终代码及证据由本次任务提交固定。

## 来源与授权

- Kanban任务：`dc9db`；工作区为本任务的`ai-analysis` worktree。
- 原始任务要求比较昇腾910／950与H100、H200、B200，在给定每路速度下的并发Agent／MW，并允许实际量或理论量。
- 本会话规划时，用户选择“以最新版为主”和“严格与优化两组结果”，随后明确要求实施计划。
- 主模型固定为Pro0813（max）；原始0424数字仅作方法复算。本报告没有将旧研究中的产品状态或数值当作当前事实。
- 历史任务`dc60c`仅提供检索线索。曾尝试登记引用关系，服务返回`relation_endpoint_task_card_permanently_removed`；该任务卡已永久删除，未伪造成功关系或历史交付状态。

## 开工基线与隔离

批准计划的位置为本会话的`proposed_plan`；实现目标仅为当前研究目录，不涉及Frontier3D的源代码、依赖或现有README。

基线与任务HEAD在开工时同为`0387bbfddfb4e6fdc366d474ae443aa46e2db19a`。按单向同步流程完成匹配远端检查：本地main已包含origin/main，没有推进main；任务无WIP、无吸收冲突。base锁已释放，bootstrap receipt已写入task git-dir并验证。全部研究与测试在锁外执行。

```text
DRAFTED_PLAN_LOCATION=当前会话已批准的proposed_plan
MUTATION_ALLOWED=1
LOCAL_BASE_DELTA_INSPECTED=VERIFIED
LOCAL_BASE_ABSORPTION=COMPLETED
SIBLING_TASK_SURVEY=VERIFIED
TASK_INVENTORY_SOURCE=KANBAN_CLI
SIBLING_TASK_COUNT=14
SOFT_OVERLAP_TASK_IDS=NONE
HARD_COLLISION_TASK_IDS=NONE
NO_SIBLING_WORKTREE_MUTATION=VERIFIED
NO_SIBLING_WORK_MERGED=VERIFIED
PLAN_REVISION=NOT_REQUIRED
POST_ABSORPTION_PLAN_FRESHNESS=VERIFIED
ONE_WAY=VERIFIED
BASE_UNCHANGED_BY_TASK=VERIFIED
NO_HANDBACK=VERIFIED
NO_PUSH=VERIFIED
BOOTSTRAP_SEQUENCE=VERIFIED_SYNC_BEFORE_TARGET_REPOSITORY_VALIDATION
BOOTSTRAP_RECEIPT=VERIFIED
```

14个同仓任务中，149d1与ea403有活跃工作，但未覆盖本研究目录；软重叠清单、硬碰撞清单均为空。未编辑或合并其他任务的工作。

## 已执行检查

使用已冻结的真实公开数据运行完整离线CLI，复算25点、5个配置及四个最优结果；独立检查原始记录后再次确认结果和比值。历史搜索的全部9次迭代同时检查速度与TTFT，通过／失败状态一致，复算取整为2594／1786。

自动化检查覆盖：

1. 总功率按W使用，历史kW正确转换；没有按8张卡重复乘总功率。
2. P25速度和P95 TTFT双门槛，恰好等于边界时通过。
3. 最佳效率与最大已测并发独立选择，汇总保留各自点ID、配置和功耗。
4. 缺失硬件与无合格点分别标记，不转成零容量；拒绝缺失、非有限值和非法功率。
5. 主模型、历史搜索内部模型／硬件身份以及测点完整性守卫。
6. 功耗覆盖设备数等于配置实际用卡数；模型关联无孤点或多重归属。
7. 离线复算结果逐字节一致，来源与计算产物SHA256一致。
8. Next.js长文本按UTF-8字节解码，保留中文、多行文本及后续JSON；截断文本拒绝采集。
9. 报告四个数字与比值、产品来源引用、本地Markdown链接和图像文件完整性。

执行结果见[机器验证记录](research-validation-results.json)。命令：

```bash
python3 docs/ascend-versus-nvidia-agent-concurrency-per-megawatt-research/recompute_agent_concurrency_energy_efficiency.py
python3 -m unittest discover -s docs/ascend-versus-nvidia-agent-concurrency-per-megawatt-research -p 'test_*.py' -v
python3 docs/ascend-versus-nvidia-agent-concurrency-per-megawatt-research/verify_research_artifacts.py
git diff --check
```

两组图由Matplotlib3.10.7生成，PNG和SVG均保留。已目视检查中文、数字、标题、坐标、图例和脚注；修正了并发轴出现负数的初版问题。未改项目依赖，绘图包安装于uv隔离环境。

## 独立复核与修正

三项独立复核分别覆盖数据与配置、产品规格与商业状态、模型与理论公式。复核提出并已处理：历史搜索内部身份守卫、最大并发对应功耗字段、1024卡须限定为产品上限、最大值公式限定硬件、原版910的300W／310W口径并存，以及1M上下文的精确token数。

理论证据的10行权重预算、6行缓存payload、16行功率门槛另行算术复核通过。以上是本次研究的独立复核，不标称为正式RVF审查。

## 解释边界与交付状态

- 本地验证没有运行模型，不证明实测可重复性、端到端质量等价或真实容量上限；未租用GPU/NPU。
- 产品状态依据截止日可核验的一手资料；规格上限与厂商商用声明不等于逐订单交付调查。
- AA快照保留所需结构化字段与配置。响应hash标识本次采集响应，但仅凭提取片段不能重构整页HTML；本研究没有将整页或权重入库。
- 报告、证据、脚本、CSV／JSON和图表持久保存在任务目录。仅在当前任务工作区提交；没有回灌main、push或部署。
