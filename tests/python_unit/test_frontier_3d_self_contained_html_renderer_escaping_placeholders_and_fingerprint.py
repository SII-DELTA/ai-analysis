"""自包含 HTML 渲染器：JSON 转义（E1）、一次性占位符替换与产物指纹（W0-5）。

这些测试只关心渲染器本身，因此把契约校验替换为空操作，避免与数据契约的
并行演进（A 切片收紧 validate_frontier_3d_visualization_dataset）互相耦合；
另有一条测试确认渲染器仍会调用真实校验。
"""
from __future__ import annotations

import hashlib
import json
import re
import subprocess
from pathlib import Path

import pytest

from src import frontier_3d_self_contained_html_renderer as renderer_module

ADVERSARIAL_STRING_THAT_MUST_SURVIVE_SCRIPT_TAG_EMBEDDING = (
    "提前闭合</script><script>window.injected=1</script>"
    "大写闭合</SCRIPT >"
    "注释开头<!-- 注释结尾 -->"
    "占位符{{REPORT_CSS}}{{VISUALIZATION_DATASET_JSON}}"
    "{{THREEJS_INTERACTIVE_RENDERER_JAVASCRIPT}}{{GRAPH_DIV_ID}}"
    "行分隔 段分隔 "
    "与号&amp;大于号>"
)

DATASET_SCRIPT_ELEMENT_PATTERN = re.compile(
    r'<script id="frontier-3d-visualization-dataset-json" type="application/json">'
    r"(?P<embedded_dataset_json_text>.*?)</script",
    re.DOTALL | re.IGNORECASE,
)


def _minimal_dataset_with_adversarial_strings() -> dict:
    return {
        "schema_version": "frontier_3d_visualization_dataset/v2",
        "interactive_renderer": "threejs",
        "graph_div_id": "frontier3d",
        "initial_variant_key": "effective__effective",
        "metric_variants": {},
        "organization_identity_metadata_by_creator_name": {},
        "adversarial_payload_for_escaping_test": (
            ADVERSARIAL_STRING_THAT_MUST_SURVIVE_SCRIPT_TAG_EMBEDDING
        ),
        "nested_adversarial_payload_for_escaping_test": {
            "model_names": [ADVERSARIAL_STRING_THAT_MUST_SURVIVE_SCRIPT_TAG_EMBEDDING],
        },
    }


@pytest.fixture
def renderer_with_dataset_validation_disabled(monkeypatch):
    monkeypatch.setattr(
        renderer_module,
        "validate_frontier_3d_visualization_dataset",
        lambda dataset: None,
    )
    return renderer_module


def _render_with_fixed_fingerprint(renderer, dataset: dict) -> str:
    return renderer.render_frontier_3d_self_contained_html_report(
        dataset,
        generator_git_commit="0123456789abcdef0123456789abcdef01234567-dirty",
        rendered_at_utc="2026-09-30T08:00:00Z",
    )


def _embedded_dataset_json_text(rendered_html: str) -> str:
    match = DATASET_SCRIPT_ELEMENT_PATTERN.search(rendered_html)
    assert match, "找不到数据契约 script 元素"
    return match.group("embedded_dataset_json_text")


# ---------------------------------------------------------------- E1：JSON 转义


def test_json_for_script_tag_escapes_every_html_significant_character_and_line_separators():
    serialized = renderer_module._json_for_script_tag(
        {"value": ADVERSARIAL_STRING_THAT_MUST_SURVIVE_SCRIPT_TAG_EMBEDDING}
    )
    for forbidden_raw_character in ("<", ">", "&", " ", " "):
        assert forbidden_raw_character not in serialized
    # 旧实现写入的 `<\!--` 不是合法 JSON 转义，JSON.parse 会直接抛错。
    assert "\\!" not in serialized
    assert json.loads(serialized) == {
        "value": ADVERSARIAL_STRING_THAT_MUST_SURVIVE_SCRIPT_TAG_EMBEDDING
    }


def test_embedded_dataset_round_trips_through_json_parse_without_premature_script_close(
    renderer_with_dataset_validation_disabled,
):
    dataset = _minimal_dataset_with_adversarial_strings()
    rendered_html = _render_with_fixed_fingerprint(
        renderer_with_dataset_validation_disabled, dataset
    )
    embedded_dataset_json_text = _embedded_dataset_json_text(rendered_html)

    # 浏览器在第一个 `</script` 处结束 script 数据；若提前闭合，截出的文本无法还原。
    assert json.loads(embedded_dataset_json_text) == dataset
    lowered_embedded_text = embedded_dataset_json_text.lower()
    assert "<!--" not in lowered_embedded_text
    assert "<script" not in lowered_embedded_text
    assert " " not in embedded_dataset_json_text
    assert " " not in embedded_dataset_json_text
    assert "window.injected" not in rendered_html.replace(
        embedded_dataset_json_text, ""
    )


def test_nan_values_in_dataset_are_serialized_as_json_null(
    renderer_with_dataset_validation_disabled,
):
    dataset = _minimal_dataset_with_adversarial_strings()
    dataset["value_that_is_not_a_number"] = float("nan")
    rendered_html = _render_with_fixed_fingerprint(
        renderer_with_dataset_validation_disabled, dataset
    )
    parsed = json.loads(_embedded_dataset_json_text(rendered_html))
    assert parsed["value_that_is_not_a_number"] is None


# ------------------------------------------------------ 一次性占位符替换


def test_placeholder_literals_inside_dataset_are_not_expanded(
    renderer_with_dataset_validation_disabled,
):
    report_css_text = renderer_module._read_asset_text(
        "frontier_3d_interactive_report.css"
    )
    renderer_bundle_text = renderer_module._read_asset_text(
        "frontier_3d_threejs_interactive_renderer_bundle.js"
    )
    rendered_html = _render_with_fixed_fingerprint(
        renderer_with_dataset_validation_disabled,
        _minimal_dataset_with_adversarial_strings(),
    )
    assert rendered_html.count(report_css_text) == 1
    assert rendered_html.count(renderer_bundle_text) == 1
    parsed = json.loads(_embedded_dataset_json_text(rendered_html))
    assert "{{REPORT_CSS}}" in parsed["adversarial_payload_for_escaping_test"]


def test_single_pass_substitution_does_not_rescan_replacement_values():
    substituted = (
        renderer_module.substitute_frontier_3d_report_template_placeholders_in_single_pass(
            "{{FIRST_PLACEHOLDER}}|{{SECOND_PLACEHOLDER}}",
            {
                "FIRST_PLACEHOLDER": "{{SECOND_PLACEHOLDER}}",
                "SECOND_PLACEHOLDER": "second-value",
            },
        )
    )
    assert substituted == "{{SECOND_PLACEHOLDER}}|second-value"


def test_single_pass_substitution_rejects_unknown_placeholder_names():
    with pytest.raises(ValueError, match="UNKNOWN_TEMPLATE_PLACEHOLDER"):
        renderer_module.substitute_frontier_3d_report_template_placeholders_in_single_pass(
            "<p>{{KNOWN_PLACEHOLDER}}{{UNKNOWN_TEMPLATE_PLACEHOLDER}}</p>",
            {"KNOWN_PLACEHOLDER": "known"},
        )


def test_render_rejects_template_that_contains_unknown_placeholder(
    renderer_with_dataset_validation_disabled, monkeypatch
):
    original_read_asset_text = renderer_module._read_asset_text

    def read_asset_text_with_unknown_placeholder_in_template(asset_name: str) -> str:
        asset_text = original_read_asset_text(asset_name)
        if asset_name == renderer_module.REPORT_DOCUMENT_TEMPLATE_ASSET_NAME:
            return asset_text.replace(
                "</body>", "{{PLACEHOLDER_THAT_NO_RENDERER_PROVIDES}}</body>"
            )
        return asset_text

    monkeypatch.setattr(
        renderer_module,
        "_read_asset_text",
        read_asset_text_with_unknown_placeholder_in_template,
    )
    with pytest.raises(ValueError, match="PLACEHOLDER_THAT_NO_RENDERER_PROVIDES"):
        _render_with_fixed_fingerprint(
            renderer_with_dataset_validation_disabled,
            _minimal_dataset_with_adversarial_strings(),
        )


def test_rendered_html_contains_no_unreplaced_template_placeholders(
    renderer_with_dataset_validation_disabled,
):
    rendered_html = _render_with_fixed_fingerprint(
        renderer_with_dataset_validation_disabled,
        {
            **_minimal_dataset_with_adversarial_strings(),
            "adversarial_payload_for_escaping_test": "",
            "nested_adversarial_payload_for_escaping_test": {},
        },
    )
    assert re.search(r"\{\{[A-Z0-9_]+\}\}", rendered_html) is None


# ------------------------------------------------------------- 产物指纹


def _meta_content_by_name(rendered_html: str, meta_name: str) -> str:
    match = re.search(
        rf'<meta name="{re.escape(meta_name)}" content="(?P<content>[^"]*)">',
        rendered_html,
    )
    assert match, f"缺少 meta {meta_name}"
    return match.group("content")


def test_rendered_html_carries_bundle_sha256_generator_commit_and_render_time_meta(
    renderer_with_dataset_validation_disabled,
):
    rendered_html = _render_with_fixed_fingerprint(
        renderer_with_dataset_validation_disabled,
        _minimal_dataset_with_adversarial_strings(),
    )
    renderer_bundle_text = renderer_module._read_asset_text(
        "frontier_3d_threejs_interactive_renderer_bundle.js"
    )
    assert _meta_content_by_name(
        rendered_html, "frontier-3d-renderer-bundle-sha256"
    ) == hashlib.sha256(renderer_bundle_text.encode("utf-8")).hexdigest()
    assert _meta_content_by_name(
        rendered_html, "frontier-3d-generator-git-commit"
    ) == "0123456789abcdef0123456789abcdef01234567-dirty"
    assert _meta_content_by_name(
        rendered_html, "frontier-3d-rendered-at-utc"
    ) == "2026-09-30T08:00:00Z"


def test_default_render_time_is_utc_iso8601_with_z_suffix(
    renderer_with_dataset_validation_disabled,
):
    rendered_html = renderer_with_dataset_validation_disabled.render_frontier_3d_self_contained_html_report(
        _minimal_dataset_with_adversarial_strings(),
        generator_git_commit="unknown",
    )
    assert re.fullmatch(
        r"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z",
        _meta_content_by_name(rendered_html, "frontier-3d-rendered-at-utc"),
    )


def test_fingerprint_meta_values_are_html_attribute_escaped(
    renderer_with_dataset_validation_disabled,
):
    rendered_html = renderer_with_dataset_validation_disabled.render_frontier_3d_self_contained_html_report(
        _minimal_dataset_with_adversarial_strings(),
        generator_git_commit='abc"><script>window.injected=1</script>',
        rendered_at_utc="2026-09-30T08:00:00Z",
    )
    assert '<meta name="frontier-3d-generator-git-commit" content="abc&quot;&gt;' in (
        rendered_html
    )


def test_generator_git_commit_is_unknown_outside_git_repository(tmp_path: Path):
    assert (
        renderer_module.resolve_frontier_3d_generator_git_commit(tmp_path)
        == "unknown"
    )


def _run_git_in_temporary_repository(repository_path: Path, *git_arguments: str) -> None:
    subprocess.run(
        [
            "git",
            "-c",
            "user.name=Frontier 3D Renderer Test",
            "-c",
            "user.email=frontier-3d-renderer-test@example.invalid",
            "-c",
            "commit.gpgsign=false",
            *git_arguments,
        ],
        cwd=repository_path,
        check=True,
        capture_output=True,
    )


def test_generator_git_commit_marks_tracked_modifications_as_dirty(tmp_path: Path):
    _run_git_in_temporary_repository(tmp_path, "init", "--quiet")
    tracked_file_path = tmp_path / "tracked_file_for_dirty_detection.txt"
    tracked_file_path.write_text("初始内容\n", encoding="utf-8")
    _run_git_in_temporary_repository(tmp_path, "add", tracked_file_path.name)
    _run_git_in_temporary_repository(tmp_path, "commit", "--quiet", "-m", "初始提交")
    head_commit = subprocess.run(
        ["git", "rev-parse", "HEAD"],
        cwd=tmp_path,
        check=True,
        capture_output=True,
        text=True,
    ).stdout.strip()

    assert renderer_module.resolve_frontier_3d_generator_git_commit(tmp_path) == head_commit
    tracked_file_path.write_text("已修改\n", encoding="utf-8")
    assert (
        renderer_module.resolve_frontier_3d_generator_git_commit(tmp_path)
        == f"{head_commit}-dirty"
    )


def test_generator_git_commit_for_this_repository_has_expected_shape():
    assert re.fullmatch(
        r"[0-9a-f]{40}(-dirty)?|unknown",
        renderer_module.resolve_frontier_3d_generator_git_commit(),
    )


# ------------------------------------------------------------- 页头与标题


def test_document_has_single_report_title_and_header_container(
    renderer_with_dataset_validation_disabled,
):
    rendered_html = _render_with_fixed_fingerprint(
        renderer_with_dataset_validation_disabled,
        _minimal_dataset_with_adversarial_strings(),
    )
    assert "<title>AI 模型三维 Pareto 前沿</title>" in rendered_html
    assert '<header id="frontier-3d-report-header"' in rendered_html


def test_render_still_validates_dataset_contract():
    with pytest.raises(ValueError):
        renderer_module.render_frontier_3d_self_contained_html_report(
            {"schema_version": "frontier_3d_visualization_dataset/v0-不存在"}
        )
