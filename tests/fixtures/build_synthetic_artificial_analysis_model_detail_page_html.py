"""合成 Artificial Analysis 模型详情页 HTML（测试专用 fixture 构造器）。

按真实页面的结构构造：Next.js App Router 把 React Server Component（RSC）payload
切成多段，逐段写成 `<script>self.__next_f.push([1,"<JS 字符串字面量>"])</script>`；
拼接全部片段、按 JSON 字符串解码后，得到的 RSC 文本里内嵌整份模型目录，每个模型对象以
`{"id":"<uuid>","slug":"` 开头；页面还带 `"currentModel":{"id":"<uuid>",...}` 标出本页模型，
正文里有「Artificial Analysis Intelligence Index vX.Y.Z」版本字样。

这里的 UUID、模型名、数值全部是虚构的（不拷贝任何 AA 真实页面片段），只复刻结构：
- 对象键顺序与紧凑分隔符（`{"id":"…","slug":"…"`）与真实 payload 一致；
- RSC 文本会被切到多个 push 片段里，对象可以跨片段；
- 可构造残缺页（截断、无 `</html>`）与「首个带 token 的对象不是本页模型」的负样本。
"""
from __future__ import annotations

import json
from collections.abc import Sequence

SYNTHETIC_ARTIFICIAL_ANALYSIS_MODEL_UUID_PREFIX = "00000000-0000-4000-8000-"


def synthetic_artificial_analysis_model_uuid(synthetic_model_index: int) -> str:
    """生成确定性的虚构 UUID（第 5 段为 12 位十进制序号）。"""
    return f"{SYNTHETIC_ARTIFICIAL_ANALYSIS_MODEL_UUID_PREFIX}{synthetic_model_index:012d}"


def build_synthetic_artificial_analysis_embedded_model_object(
    *,
    model_id: str,
    slug: str,
    name: str,
    intelligence_index: float | None = 50.0,
    intelligence_index_is_estimated: bool | None = False,
    intelligence_index_cost_total_usd: float | None = None,
    canonical_output_token_count: float | None = None,
    intelligence_index_time_per_task_seconds: float | None = None,
    is_reasoning: bool | None = False,
    reasoning_effort_slug: str | None = None,
    release_slug: str | None = None,
    price_1m_blended_7_to_2_to_1: float | None = None,
    include_intelligence_index_fields: bool = True,
) -> dict:
    """构造一个 camelCase 的内嵌模型对象；值为 None 的可选字段整键省略（与真实 payload 一致）。

    `include_intelligence_index_fields=False` 时构造「只有 id/slug/name 的引用对象」，
    解析器应当忽略它（真实页面里大量存在这类对象）。
    """
    embedded_model_object: dict = {"id": model_id, "slug": slug, "name": name}
    if not include_intelligence_index_fields:
        return embedded_model_object
    embedded_model_object["isReasoning"] = is_reasoning
    embedded_model_object["intelligenceIndex"] = intelligence_index
    embedded_model_object["intelligenceIndexIsEstimated"] = intelligence_index_is_estimated
    if intelligence_index_cost_total_usd is not None:
        embedded_model_object["intelligenceIndexCost"] = {
            "total": intelligence_index_cost_total_usd,
            "input": intelligence_index_cost_total_usd * 0.25,
            "output": intelligence_index_cost_total_usd * 0.75,
        }
    if canonical_output_token_count is not None:
        embedded_model_object["canonicalIntelligenceIndexTokenCount"] = {
            "input": int(canonical_output_token_count) * 3,
            "output": canonical_output_token_count,
        }
    if intelligence_index_time_per_task_seconds is not None:
        embedded_model_object["intelligenceIndexTimePerTask"] = (
            intelligence_index_time_per_task_seconds
        )
    if reasoning_effort_slug is not None:
        embedded_model_object["effort"] = {
            "slug": reasoning_effort_slug,
            "label": reasoning_effort_slug,
            "level": 10,
        }
    if release_slug is not None:
        embedded_model_object["release"] = {"slug": release_slug, "name": release_slug}
    embedded_model_object["price1mBlended7To2To1"] = price_1m_blended_7_to_2_to_1
    return embedded_model_object


def _compact_json_text(json_value: object) -> str:
    """与真实 RSC payload 一样使用紧凑分隔符，保证对象以 `{"id":"…","slug":"` 开头。"""
    return json.dumps(json_value, ensure_ascii=False, separators=(",", ":"))


def build_synthetic_react_server_component_payload_text(
    *,
    embedded_model_objects: Sequence[dict],
    current_model_object: dict | None = None,
    place_current_model_marker_after_embedded_model_catalog: bool = False,
) -> str:
    """拼出解码后的 RSC 文本：若干无关行 + currentModel 组件 + 模型目录数组。

    `place_current_model_marker_after_embedded_model_catalog=True` 时 currentModel 组件出现在目录数组
    之后：此时 RSC 文本里第一个模型对象属于目录首条记录（通常是别的模型），用来区分「取 currentModel
    的 UUID」与「取页面第一个目录对象」两种实现（R3-F9）。
    """
    react_server_component_payload_lines = [
        '1:"$Sreact.fragment"',
        '2:I[10001,["10001","static/chunks/synthetic-chunk.js"],"SyntheticComponent"]',
    ]
    current_model_payload_line = (
        '3:["$","div",null,{"className":"synthetic-header","children":[["$","$L1c",null,'
        '{"currentModel":' + _compact_json_text(current_model_object) + "}]]}]"
        if current_model_object is not None
        else None
    )
    if current_model_payload_line is not None and not place_current_model_marker_after_embedded_model_catalog:
        react_server_component_payload_lines.append(current_model_payload_line)
    react_server_component_payload_lines.append(
        '4:["$","$L2",null,{"models":' + _compact_json_text(list(embedded_model_objects)) + "}]"
    )
    if current_model_payload_line is not None and place_current_model_marker_after_embedded_model_catalog:
        react_server_component_payload_lines.append(current_model_payload_line)
    react_server_component_payload_lines.append('5:"$4:metadata"')
    return "\n".join(react_server_component_payload_lines) + "\n"


def build_synthetic_artificial_analysis_model_detail_page_html(
    *,
    embedded_model_objects: Sequence[dict],
    current_model_object: dict | None = None,
    intelligence_index_version_strings: Sequence[str] = ("4.3", "4.3.2"),
    react_server_component_chunk_character_count: int = 257,
    truncate_page_html_to_character_count: int | None = None,
    place_current_model_marker_after_embedded_model_catalog: bool = False,
) -> str:
    """构造一整页合成详情页 HTML。

    - `react_server_component_chunk_character_count`：RSC 文本按该字符数切片（默认取一个
      不整齐的数，让对象、转义序列都可能跨片段）；
    - `truncate_page_html_to_character_count`：给定时把整页截断到该长度，模拟残缺缓存页
      （真实例子：恰 2,048,000 字节、没有 `</html>` 的缓存页）。
    """
    react_server_component_payload_text = build_synthetic_react_server_component_payload_text(
        embedded_model_objects=embedded_model_objects,
        current_model_object=current_model_object,
        place_current_model_marker_after_embedded_model_catalog=(
            place_current_model_marker_after_embedded_model_catalog
        ),
    )
    react_server_component_push_script_elements = []
    for chunk_start_character_offset in range(
        0,
        len(react_server_component_payload_text),
        react_server_component_chunk_character_count,
    ):
        react_server_component_payload_chunk = react_server_component_payload_text[
            chunk_start_character_offset:
            chunk_start_character_offset + react_server_component_chunk_character_count
        ]
        # json.dumps 产出带引号的 JSON 字符串字面量，正好也是合法的 JS 字符串字面量
        javascript_string_literal = json.dumps(
            react_server_component_payload_chunk, ensure_ascii=False
        )
        react_server_component_push_script_elements.append(
            f"<script>self.__next_f.push([1,{javascript_string_literal}])</script>"
        )
    intelligence_index_version_description_elements = "".join(
        f'<span class="synthetic-version-note">Artificial Analysis Intelligence Index '
        f"v{intelligence_index_version_string} incorporates synthetic evaluations</span>"
        for intelligence_index_version_string in intelligence_index_version_strings
    )
    synthetic_page_html = (
        "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"utf-8\"/>"
        "<title>Synthetic Model Detail Page</title></head><body>"
        f"<main>{intelligence_index_version_description_elements}</main>"
        "<script>(self.__next_f=self.__next_f||[]).push([0])</script>"
        + "".join(react_server_component_push_script_elements)
        + "</body></html>\n"
    )
    if truncate_page_html_to_character_count is not None:
        return synthetic_page_html[:truncate_page_html_to_character_count]
    return synthetic_page_html
