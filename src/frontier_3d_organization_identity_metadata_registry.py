"""Frontier 3D 厂商身份、总部地区分类与 Logo 资产注册表。"""
from __future__ import annotations

import html
from importlib import resources
from urllib.parse import quote

ORGANIZATION_IDENTITY_ASSET_PACKAGE = "src.frontier_3d_organization_identity_assets"

# 地区语义固定为厂商/实验室总部或主要组织归属，不描述训练数据、部署地点或成员国籍。
# Logo slug 对应随仓库版本化的 LobeHub Icons SVG；暂无合适品牌资产的厂商使用完整名称
# wordmark fallback。未来 AA 新增 creator 时走 unclassified，避免静默误归“其他”。
_ORGANIZATION_COUNTRY_AND_LOGO_SLUG_BY_CREATOR_NAME: dict[
    str, tuple[str, str, str | None]
] = {
    "AI21 Labs": ("other", "IL", "ai21-brand-color"),
    "Alibaba": ("china", "CN", "alibaba-brand-color"),
    "Allen Institute for AI": ("united_states", "US", "ai2-color"),
    "Amazon": ("united_states", "US", "aws-brand-color"),
    "Anthropic": ("united_states", "US", "anthropic"),
    "Arcee AI": ("united_states", "US", "arcee-color"),
    "Baidu": ("china", "CN", "baidu-brand-color"),
    "ByteDance Seed": ("china", "CN", "bytedance-brand-color"),
    "China Mobile": ("china", "CN", None),
    "Cohere": ("other", "CA", "cohere-color"),
    "Databricks": ("united_states", "US", "dbrx-brand-color"),
    "Deep Cogito": ("united_states", "US", "deepcogito-color"),
    "DeepSeek": ("china", "CN", "deepseek-color"),
    "Google": ("united_states", "US", "google-brand-color"),
    "IBM": ("united_states", "US", "ibm"),
    "Inception": ("united_states", "US", "inception"),
    "InclusionAI": ("china", "CN", None),
    "Kimi": ("china", "CN", "kimi-color"),
    "Korea Telecom": ("other", "KR", None),
    "KwaiKAT": ("china", "CN", "kwaikat-text-color"),
    "LG AI Research": ("other", "KR", "lg-color"),
    "Liquid AI": ("united_states", "US", "liquid"),
    "LongCat": ("china", "CN", "longcat-color"),
    "MBZUAI Institute of Foundation Models": ("other", "AE", None),
    "Meta": ("united_states", "US", "meta-brand-color"),
    "Microsoft": ("united_states", "US", "microsoft-color"),
    "MiniMax": ("china", "CN", "minimax-color"),
    "Mistral": ("other", "FR", "mistral-color"),
    "Motif Technologies": ("united_states", "US", None),
    "Multiverse Computing": ("other", "ES", None),
    "NVIDIA": ("united_states", "US", "nvidia-color"),
    "Nanbeige": ("china", "CN", None),
    "Naver": ("other", "KR", None),
    "Nex AGI": ("other", "SG", None),
    "Nous Research": ("united_states", "US", "nousresearch"),
    "OpenAI": ("united_states", "US", "openai"),
    "OpenBMB": ("china", "CN", None),
    "OpenChat": ("other", "ZZ", "openchat-color"),
    "Perplexity": ("united_states", "US", "perplexity-color"),
    "Prime Intellect": ("united_states", "US", None),
    "Reka AI": ("united_states", "US", None),
    "Sarvam": ("other", "IN", None),
    "ServiceNow": ("united_states", "US", None),
    "Snowflake": ("united_states", "US", "snowflake-color"),
    "SpaceXAI": ("united_states", "US", "xai"),
    "StepFun": ("china", "CN", "stepfun-color"),
    "Swiss AI Initiative": ("other", "CH", None),
    "TII UAE": ("other", "AE", "tii-color"),
    "Tencent": ("china", "CN", "tencent-brand-color"),
    "Thinking Machines": ("united_states", "US", None),
    "Trillion Labs": ("other", "KR", None),
    "Upstage": ("other", "KR", "upstage-color"),
    "Xiaomi": ("china", "CN", "xiaomimimo"),
    "Z AI": ("china", "CN", "zai"),
}


def known_organization_creator_names() -> frozenset[str]:
    """返回显式维护的 AA creator 名称集合。"""
    return frozenset(_ORGANIZATION_COUNTRY_AND_LOGO_SLUG_BY_CREATOR_NAME)


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
    known_metadata = _ORGANIZATION_COUNTRY_AND_LOGO_SLUG_BY_CREATOR_NAME.get(
        creator_name
    )
    if known_metadata is None:
        country_region_category = "unclassified"
        headquarters_country_code = "ZZ"
        logo_slug = None
        is_known_creator = False
    else:
        country_region_category, headquarters_country_code, logo_slug = known_metadata
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
        "country_region_category": country_region_category,
        "country_region_classification_basis": (
            "organization_headquarters_or_primary_institutional_origin"
        ),
        "logo_asset_kind": logo_asset_kind,
        "logo_asset_source": (
            "lobehub-icons-static-svg@1.93.0"
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
