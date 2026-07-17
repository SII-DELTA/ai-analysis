"""Frontier 3D 厂商身份、总部地区分类与 Logo 资产注册表。"""
from __future__ import annotations

import html
from dataclasses import dataclass
from enum import Enum
from importlib import resources
from urllib.parse import quote

ORGANIZATION_IDENTITY_ASSET_PACKAGE = "src.frontier_3d_organization_identity_assets"


class CountryRegionCategory(str, Enum):
    """三类可视国别标记及无法安全分类的兜底状态。"""

    CHINA = "china"
    UNITED_STATES = "united_states"
    OTHER = "other"
    UNCLASSIFIED = "unclassified"


@dataclass(frozen=True)
class OrganizationIdentityRegistration:
    """一个 creator 的总部地区与可选品牌资产注册。"""

    country_region_category: CountryRegionCategory
    headquarters_country_code_iso_3166_1_alpha_2: str
    logo_asset_slug: str | None
    logo_asset_source: str | None


def _chinese_organization_identity(
    *,
    logo_asset_slug: str | None,
    logo_asset_source: str = "lobehub-icons-static-svg@1.93.0",
) -> OrganizationIdentityRegistration:
    return OrganizationIdentityRegistration(
        country_region_category=CountryRegionCategory.CHINA,
        headquarters_country_code_iso_3166_1_alpha_2="CN",
        logo_asset_slug=logo_asset_slug,
        logo_asset_source=logo_asset_source if logo_asset_slug else None,
    )


def _united_states_organization_identity(
    *,
    logo_asset_slug: str | None,
    logo_asset_source: str = "lobehub-icons-static-svg@1.93.0",
) -> OrganizationIdentityRegistration:
    return OrganizationIdentityRegistration(
        country_region_category=CountryRegionCategory.UNITED_STATES,
        headquarters_country_code_iso_3166_1_alpha_2="US",
        logo_asset_slug=logo_asset_slug,
        logo_asset_source=logo_asset_source if logo_asset_slug else None,
    )


def _other_country_organization_identity(
    *,
    headquarters_country_code_iso_3166_1_alpha_2: str,
    logo_asset_slug: str | None,
    logo_asset_source: str = "lobehub-icons-static-svg@1.93.0",
) -> OrganizationIdentityRegistration:
    return OrganizationIdentityRegistration(
        country_region_category=CountryRegionCategory.OTHER,
        headquarters_country_code_iso_3166_1_alpha_2=(
            headquarters_country_code_iso_3166_1_alpha_2
        ),
        logo_asset_slug=logo_asset_slug,
        logo_asset_source=logo_asset_source if logo_asset_slug else None,
    )

# 地区语义固定为厂商/实验室总部或主要组织归属，不描述训练数据、部署地点或成员国籍。
# Logo slug 对应随仓库版本化的 LobeHub Icons SVG；暂无合适品牌资产的厂商使用完整名称
# wordmark fallback。未来 AA 新增 creator 时走 unclassified，避免静默误归“其他”。
_ORGANIZATION_IDENTITY_REGISTRATION_BY_CREATOR_NAME: dict[
    str, OrganizationIdentityRegistration
] = {
    "AI21 Labs": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="IL",
        logo_asset_slug="ai21-brand-color",
    ),
    "Alibaba": _chinese_organization_identity(logo_asset_slug="alibaba-brand-color"),
    "Allen Institute for AI": _united_states_organization_identity(
        logo_asset_slug="ai2-color"
    ),
    "Amazon": _united_states_organization_identity(logo_asset_slug="aws-brand-color"),
    "Anthropic": _united_states_organization_identity(logo_asset_slug="anthropic"),
    "Arcee AI": _united_states_organization_identity(logo_asset_slug="arcee-color"),
    "Baidu": _chinese_organization_identity(logo_asset_slug="baidu-brand-color"),
    "ByteDance Seed": _chinese_organization_identity(
        logo_asset_slug="bytedance-brand-color"
    ),
    "China Mobile": _chinese_organization_identity(
        logo_asset_slug="china-mobile",
        logo_asset_source="official_organization_website_static_asset@2026-07-18",
    ),
    "Cohere": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="CA",
        logo_asset_slug="cohere-color",
    ),
    "Databricks": _united_states_organization_identity(
        logo_asset_slug="dbrx-brand-color"
    ),
    "Deep Cogito": _united_states_organization_identity(
        logo_asset_slug="deepcogito-color"
    ),
    "DeepSeek": _chinese_organization_identity(logo_asset_slug="deepseek-color"),
    "Google": _united_states_organization_identity(logo_asset_slug="google-brand-color"),
    "IBM": _united_states_organization_identity(logo_asset_slug="ibm"),
    "Inception": _united_states_organization_identity(logo_asset_slug="inception"),
    "InclusionAI": _chinese_organization_identity(
        logo_asset_slug="inclusion-ai",
        logo_asset_source="official_organization_website_static_asset@2026-07-18",
    ),
    "Kimi": _chinese_organization_identity(logo_asset_slug="kimi-color"),
    "Korea Telecom": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="KR",
        logo_asset_slug="korea-telecom",
        logo_asset_source="official_organization_website_static_asset@2026-07-18",
    ),
    "KwaiKAT": _chinese_organization_identity(logo_asset_slug="kwaikat-text-color"),
    "LG AI Research": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="KR", logo_asset_slug="lg-color"
    ),
    "Liquid AI": _united_states_organization_identity(logo_asset_slug="liquid"),
    "LongCat": _chinese_organization_identity(logo_asset_slug="longcat-color"),
    "MBZUAI Institute of Foundation Models": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="AE",
        logo_asset_slug="mbzuai-ifm",
        logo_asset_source="official_organization_website_static_asset@2026-07-18",
    ),
    "Meta": _united_states_organization_identity(logo_asset_slug="meta-brand-color"),
    "Microsoft": _united_states_organization_identity(logo_asset_slug="microsoft-color"),
    "MiniMax": _chinese_organization_identity(logo_asset_slug="minimax-color"),
    "Mistral": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="FR",
        logo_asset_slug="mistral-color",
    ),
    "Motif Technologies": _united_states_organization_identity(
        logo_asset_slug="motif-technologies",
        logo_asset_source="official_organization_website_static_asset@2026-07-18",
    ),
    "Multiverse Computing": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="ES",
        logo_asset_slug="multiverse-computing",
        logo_asset_source="official_organization_website_static_asset@2026-07-18",
    ),
    "NVIDIA": _united_states_organization_identity(logo_asset_slug="nvidia-color"),
    "Nanbeige": _chinese_organization_identity(
        logo_asset_slug="nanbeige",
        logo_asset_source="huggingface_organization_avatar@2026-07-18",
    ),
    "Naver": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="KR",
        logo_asset_slug="naver",
        logo_asset_source="simple-icons@16.26.0",
    ),
    "Nex AGI": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="SG",
        logo_asset_slug="nex-agi",
        logo_asset_source="official_organization_website_static_asset@2026-07-18",
    ),
    "Nous Research": _united_states_organization_identity(
        logo_asset_slug="nousresearch"
    ),
    "OpenAI": _united_states_organization_identity(logo_asset_slug="openai"),
    "OpenBMB": _chinese_organization_identity(
        logo_asset_slug="openbmb",
        logo_asset_source="github_organization_avatar@2026-07-18",
    ),
    "OpenChat": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="ZZ",
        logo_asset_slug="openchat-color",
    ),
    "Perplexity": _united_states_organization_identity(
        logo_asset_slug="perplexity-color"
    ),
    "Prime Intellect": _united_states_organization_identity(
        logo_asset_slug="prime-intellect",
        logo_asset_source="official_organization_website_static_asset@2026-07-18",
    ),
    "Reka AI": _united_states_organization_identity(
        logo_asset_slug="reka-ai",
        logo_asset_source="official_organization_website_static_asset@2026-07-18",
    ),
    "Sarvam": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="IN",
        logo_asset_slug="sarvam",
        logo_asset_source="official_organization_website_static_asset@2026-07-18",
    ),
    "ServiceNow": _united_states_organization_identity(
        logo_asset_slug="servicenow",
        logo_asset_source="wikimedia_commons_pd_textlogo@2026-07-18",
    ),
    "Snowflake": _united_states_organization_identity(logo_asset_slug="snowflake-color"),
    "SpaceXAI": _united_states_organization_identity(logo_asset_slug="xai"),
    "StepFun": _chinese_organization_identity(logo_asset_slug="stepfun-color"),
    "Swiss AI Initiative": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="CH",
        logo_asset_slug="swiss-ai-initiative",
        logo_asset_source="official_organization_website_static_asset@2026-07-18",
    ),
    "TII UAE": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="AE", logo_asset_slug="tii-color"
    ),
    "Tencent": _chinese_organization_identity(logo_asset_slug="tencent-brand-color"),
    "Thinking Machines": _united_states_organization_identity(
        logo_asset_slug="thinking-machines",
        logo_asset_source="official_organization_website_static_asset@2026-07-18",
    ),
    "Trillion Labs": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="KR",
        logo_asset_slug="trillion-labs",
        logo_asset_source="official_organization_website_static_asset@2026-07-18",
    ),
    "Upstage": _other_country_organization_identity(
        headquarters_country_code_iso_3166_1_alpha_2="KR",
        logo_asset_slug="upstage-color",
    ),
    "Xiaomi": _chinese_organization_identity(logo_asset_slug="xiaomimimo"),
    "Z AI": _chinese_organization_identity(logo_asset_slug="zai"),
}


def known_organization_creator_names() -> frozenset[str]:
    """返回显式维护的 AA creator 名称集合。"""
    return frozenset(_ORGANIZATION_IDENTITY_REGISTRATION_BY_CREATOR_NAME)


def _svg_data_url(svg_text: str) -> str:
    return "data:image/svg+xml;charset=utf-8," + quote(svg_text, safe="")


def _generated_wordmark_svg(creator_name: str, *, unknown: bool) -> str:
    escaped_name = html.escape(creator_name)
    words = [word for word in creator_name.replace("-", " ").split() if word]
    monogram = "".join(word[0] for word in words[:3]).upper() or "?"
    accent = "#6b7280" if unknown else "#334155"
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="128" '
        'viewBox="0 0 256 128" role="img">'
        f'<title>{escaped_name}</title>'
        '<rect x="4" y="4" width="248" height="120" rx="24" fill="#ffffff" '
        f'stroke="{accent}" stroke-width="8"/>'
        f'<text x="128" y="72" text-anchor="middle" font-family="Arial,sans-serif" '
        f'font-size="48" font-weight="700" fill="{accent}">{html.escape(monogram)}</text>'
        f'<text x="128" y="105" text-anchor="middle" font-family="Arial,sans-serif" '
        f'font-size="14" fill="#334155">{escaped_name[:30]}</text>'
        "</svg>"
    )


def _versioned_logo_svg(logo_slug: str | None) -> str | None:
    if not logo_slug:
        return None
    logo_resource = resources.files(ORGANIZATION_IDENTITY_ASSET_PACKAGE).joinpath(
        f"{logo_slug}.svg"
    )
    if not logo_resource.is_file():
        return None
    return logo_resource.read_text(encoding="utf-8")


def organization_identity_metadata_for_creator_name(creator_name: str) -> dict:
    """把 AA creator 转成前端可直接使用的稳定身份元数据。"""
    known_metadata = _ORGANIZATION_IDENTITY_REGISTRATION_BY_CREATOR_NAME.get(
        creator_name
    )
    if known_metadata is None:
        country_region_category = CountryRegionCategory.UNCLASSIFIED
        headquarters_country_code = "ZZ"
        logo_slug = None
        registered_logo_asset_source = None
        is_known_creator = False
    else:
        country_region_category = known_metadata.country_region_category
        headquarters_country_code = (
            known_metadata.headquarters_country_code_iso_3166_1_alpha_2
        )
        logo_slug = known_metadata.logo_asset_slug
        registered_logo_asset_source = known_metadata.logo_asset_source
        is_known_creator = True

    versioned_logo_svg = _versioned_logo_svg(logo_slug)
    if versioned_logo_svg is not None:
        logo_asset_kind = "curated_svg"
        logo_svg = versioned_logo_svg
    else:
        logo_asset_kind = (
            "generated_wordmark_fallback"
            if is_known_creator
            else "generated_monogram_fallback"
        )
        logo_svg = _generated_wordmark_svg(
            creator_name,
            unknown=not is_known_creator,
        )

    return {
        "organization_identity_key": creator_name.casefold().replace(" ", "-"),
        "organization_display_name": creator_name,
        "headquarters_country_code_iso_3166_1_alpha_2": headquarters_country_code,
        "country_region_category": country_region_category.value,
        "country_region_classification_basis": (
            "organization_headquarters_or_primary_institutional_origin"
        ),
        "logo_asset_kind": logo_asset_kind,
        "logo_asset_source": (
            registered_logo_asset_source
            if versioned_logo_svg is not None
            else "generated_local_fallback"
        ),
        "logo_visualization_data_url": _svg_data_url(logo_svg),
    }


def organization_identity_metadata_by_creator_name(
    creator_names,
) -> dict[str, dict]:
    """为本次数据集中出现的 creator 构建排序稳定的身份注册表。"""
    normalized_creator_names = sorted(
        {
            str(creator_name)
            for creator_name in creator_names
            if creator_name is not None and str(creator_name).strip()
        },
        key=str.casefold,
    )
    return {
        creator_name: organization_identity_metadata_for_creator_name(creator_name)
        for creator_name in normalized_creator_names
    }
