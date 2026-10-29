# Frontier 3D 视图分享契约 v1

面向离线 HTML、未来网页与 iframe 的公共显示状态。本契约不依赖网站框架，可由 `a0c95` 复用；不包含凭据、采集配置或历史分析输入。

地址格式为 `#frontier-view-state-v1=<encodeURIComponent(JSON.stringify(state))>`。解码器只接受 `version: 1`，逐字段采用白名单；无法解析或版本不支持时保留当前视图并给出说明。字段不合法时仅忽略该字段。URL 有效字段优先于本地偏好和页面默认。

```json
{
  "version": 1,
  "metric_variant_key": "effective__effective",
  "pinned_model_uuids": ["12345678-1234-1234-1234-123456789abc"],
  "hidden_organization_identity_keys": [],
  "standout_metric": "trend_residual",
  "standout_axis_weights": {"intelligence": 1, "cost": 1, "speed": 1},
  "display": {
    "measured_only": false,
    "comparable_only": false,
    "recent_release_grace_period": true,
    "country_region_markers": false,
    "achievable_frontier_surface": false,
    "frontier_style": "wireframe",
    "marker_size_multiplier": 0.5,
    "sensitivity_intelligence_half_width": "off"
  },
  "camera": {
    "position": [-4, 4, 3],
    "target": [0, 0, 0],
    "up": [0, 0, 1]
  },
  "date_filter": {"cutoff_date": null, "mode": "fade"},
  "table": {
    "active_tab": "chart",
    "sort_field": "intelligence",
    "sort_direction": "desc",
    "search_text": "",
    "analysis_filter": "all"
  }
}
```

| 字段 | 约束 |
| --- | --- |
| `metric_variant_key` | `effective` / `blended` 成本与 `effective` / `raw` / `tasks_per_hour` 速度的组合；旧文件没有的口径不应用并说明原因 |
| `pinned_model_uuids` | 有效 UUID，去重；模型缺失时保留身份和解释，不按名称猜测替代模型 |
| `hidden_organization_identity_keys` | 厂商稳定身份，使用科学契约的 `organization_identity_key`，不使用显示名作为分享身份 |
| `standout_metric` | 既有四种突出度标识符；不切换生产排名方法 |
| `standout_axis_weights` | 三个有限数，范围 0.25–4 |
| `display` | 白名单布尔项；样式为 `wireframe` / `solid` / `hidden`；标记大小 0.5–1.5；敏感性为 `off` / `0.5` / `1`；固定比较的 `pinned_comparison_expanded` 与白名单 `pinned_comparison_optional_fields` 也可分享，并优先于本地偏好 |
| `camera` | 三组有限三元组，各分量绝对值不超过 1,000,000；位置与目标不重合，up 非零；继续使用透视相机 |
| `date_filter` | 截止日期为有效 `YYYY-MM-DD` 或 null；模式 `fade` / `hide`；播放状态不序列化，加载后始终暂停 |
| `table` | `chart` / `table` 标签、白名单列、`asc` / `desc`、最多 256 字符查询、`all` / `eligible` / `ineligible` / `displayed` / `excluded` 分析筛选 |

普通交互通过 `history.replaceState` 更新 hash，不为拖动的每一帧写 URL；相机操作结束时保存。支持 hash 导航，应用外部状态时抑制反向写入，避免循环。未知外部 hash 不作为可执行指令。

复制失败时提供已选中的文本链接。`file:` 链接只描述本机文件与视图，分享者必须同时提供对应 HTML；此状态不携带数据集本体。它也不会重新计算前沿、排名、归一化或轴域。

表格的查询与分析筛选仅限定表格行；全局的厂商、当期可比、实测和日期可见性同步作用于图表、拾取、搜索说明、详情、连线、表格与计数。日期探索始终基于当前快照的价格、速度和评测口径，不能解释成真实历史前沿。

代码入口为 `frontier_3d_view_state_and_model_table.js` 的 `sanitizeFrontierViewState`、`encodeFrontierViewStateHash`、`decodeFrontierViewStateHash`；Node 测试覆盖往返、白名单、数值与版本错误。
