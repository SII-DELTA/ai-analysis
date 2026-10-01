"""R4-11：旧入口 requirements.txt 与 pyproject.toml 的依赖下界一致，且文件头注明以 pyproject / uv.lock 为准。

pyproject.toml（+ uv.lock）是依赖的唯一权威来源；requirements.txt 只服务不用 uv 的旧入口
（`pip install -r requirements.txt`）。两者下界脱节时，旧入口会装出 plotly 5 / kaleido 0.2
这类与契约构建、静态导出不兼容的版本。
"""
from __future__ import annotations

import re
import tomllib
from pathlib import Path

REPOSITORY_ROOT_DIRECTORY_PATH = Path(__file__).resolve().parents[2]
LEGACY_REQUIREMENTS_TXT_PATH = REPOSITORY_ROOT_DIRECTORY_PATH / "requirements.txt"
PYPROJECT_TOML_PATH = REPOSITORY_ROOT_DIRECTORY_PATH / "pyproject.toml"
# requirements.txt 必须覆盖的 pyproject 可选依赖组：静态导出（--export png/svg）
PYPROJECT_OPTIONAL_DEPENDENCY_GROUP_NAMES_MIRRORED_BY_LEGACY_REQUIREMENTS_TXT = ("static-image-export",)
REQUIREMENT_NAME_AND_LOWER_BOUND_PATTERN = re.compile(
    r"^\s*(?P<distribution_name>[A-Za-z0-9_.\-]+)\s*>=\s*(?P<lower_bound_version>[0-9][0-9A-Za-z.]*)"
)


def _distribution_lower_bound_by_normalized_name(requirement_lines: list[str]) -> dict[str, str]:
    lower_bound_by_normalized_name = {}
    for requirement_line in requirement_lines:
        requirement_text = requirement_line.split("#", 1)[0].strip()
        if not requirement_text:
            continue
        requirement_match = REQUIREMENT_NAME_AND_LOWER_BOUND_PATTERN.match(requirement_text)
        assert requirement_match, f"依赖声明缺少 >= 下界：{requirement_text!r}"
        normalized_distribution_name = requirement_match.group("distribution_name").lower().replace("_", "-")
        lower_bound_by_normalized_name[normalized_distribution_name] = requirement_match.group(
            "lower_bound_version"
        )
    return lower_bound_by_normalized_name


def _pyproject_lower_bound_by_normalized_name_for_legacy_entrypoint() -> dict[str, str]:
    pyproject = tomllib.loads(PYPROJECT_TOML_PATH.read_text(encoding="utf-8"))
    mirrored_requirement_lines = list(pyproject["project"]["dependencies"])
    for optional_dependency_group_name in PYPROJECT_OPTIONAL_DEPENDENCY_GROUP_NAMES_MIRRORED_BY_LEGACY_REQUIREMENTS_TXT:
        mirrored_requirement_lines.extend(
            pyproject["project"]["optional-dependencies"][optional_dependency_group_name]
        )
    return _distribution_lower_bound_by_normalized_name(mirrored_requirement_lines)


def test_legacy_requirements_txt_lower_bounds_equal_pyproject_lower_bounds() -> None:
    legacy_lower_bound_by_name = _distribution_lower_bound_by_normalized_name(
        LEGACY_REQUIREMENTS_TXT_PATH.read_text(encoding="utf-8").splitlines()
    )
    assert legacy_lower_bound_by_name == _pyproject_lower_bound_by_normalized_name_for_legacy_entrypoint()
    assert legacy_lower_bound_by_name["plotly"] == "6.0"
    assert legacy_lower_bound_by_name["kaleido"] == "1.0"


def test_legacy_requirements_txt_header_names_pyproject_and_uv_lock_as_authoritative() -> None:
    legacy_requirements_header_comment_text = "\n".join(
        requirement_line
        for requirement_line in LEGACY_REQUIREMENTS_TXT_PATH.read_text(encoding="utf-8").splitlines()[:5]
        if requirement_line.startswith("#")
    )
    assert "以 pyproject.toml / uv.lock 为准" in legacy_requirements_header_comment_text
    assert "不用 uv 的旧入口" in legacy_requirements_header_comment_text
