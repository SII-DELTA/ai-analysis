"""v4 公共模型表、v2/v3 兼容与浏览器投影；保留既有科学指标数值。"""
from __future__ import annotations

import copy
import json
import math
from functools import lru_cache
from pathlib import Path
from uuid import UUID

from jsonschema import Draft202012Validator
from referencing import Registry, Resource

from .frontier_3d_exact_achievable_frontier_scene_geometry import build_exact_achievable_frontier_geometry_from_scene

SCIENTIFIC_CONTRACT_SCHEMA_VERSION = "frontier_3d_visualization_dataset/v4"
BROWSER_PROJECTION_SCHEMA_VERSION = "frontier_3d_browser_projection/v2"
PREVIOUS_SCIENTIFIC_CONTRACT_SCHEMA_VERSION = "frontier_3d_visualization_dataset/v3"
PREVIOUS_BROWSER_PROJECTION_SCHEMA_VERSION = "frontier_3d_browser_projection/v1"
LEGACY_SCENE_SCHEMA_VERSION = "frontier_3d_visualization_dataset/v2"
SCHEMA_DIRECTORY = Path(__file__).with_name("frontier_3d_contract_schemas")
MARKER_VARIANT_FIELD_NAMES = frozenset({
    "x", "y", "z", "analysis_eligibility", "standout_metrics", "normalized_improvement_coordinates",
    "displayed_only_because_of_recent_release_grace_period",
})
LINEAGE_MODEL_INFORMATION_FIELD_NAMES = frozenset({
    "name", "model_uuid", "creator", "base_model_name", "lineage_family_key",
    "reasoning_level_label", "reasoning_level_sort_order",
})
EXCLUDED_MODEL_EXPLANATION_FIELD_NAMES = (
    "missing_dimension_names", "drop_reason", "is_absent_from_accepted_embedded_model_catalog_partition",
)
EXCLUDED_MODEL_REFERENCE_FIELD_NAMES = frozenset((*EXCLUDED_MODEL_EXPLANATION_FIELD_NAMES, "analysis_eligibility"))
MODEL_REASONING_GROUP_INFORMATION_FIELD_NAMES = ("base_model_name", "tier", "reasoning_level_label", "reasoning_level_sort_order")
TOP_LEVEL_SCIENTIFIC_CONTRACT_FIELD_NAMES = frozenset({
    "schema_version", "interactive_renderer", "generated_at", "data_date", "artificial_analysis_data_provenance",
    "graph_div_id", "initial_variant_key", "speed_scale", "cost_metric_definitions", "speed_metric_definitions",
    "organization_identity_metadata_by_creator_name", "metric_variants", "models",
})


def _identity_key(model_information):
    model_uuid = model_information.get("model_uuid")
    if model_uuid is not None:
        try:
            return ("uuid", str(UUID(model_uuid)))
        except (ValueError, TypeError, AttributeError) as error:
            raise ValueError("model_uuid 不是有效的模型 UUID") from error
    return ("legacy_creator_and_name_without_uuid", model_information.get("creator", "?"), model_information.get("name"))


def adapt_frontier_3d_visualization_dataset_to_v3(dataset):
    """v2 只在入口迁移；缺失 UUID 明确降级，不从相似名称推测真实身份。"""
    if dataset.get("schema_version") in (SCIENTIFIC_CONTRACT_SCHEMA_VERSION, PREVIOUS_SCIENTIFIC_CONTRACT_SCHEMA_VERSION):
        return copy.deepcopy(dataset)
    if dataset.get("schema_version") != LEGACY_SCENE_SCHEMA_VERSION:
        raise ValueError("Frontier 3D visualization dataset schema_version 不匹配")
    from .frontier_3d_visualization_dataset_builder import validate_frontier_3d_visualization_dataset
    validate_frontier_3d_visualization_dataset(dataset)
    result = {key: copy.deepcopy(value) for key, value in dataset.items() if key in TOP_LEVEL_SCIENTIFIC_CONTRACT_FIELD_NAMES}
    result["schema_version"] = PREVIOUS_SCIENTIFIC_CONTRACT_SCHEMA_VERSION
    models = result["models"] = []
    model_index_by_identity = {}

    def reference_for_model_information(information):
        information = copy.deepcopy(information)
        information.setdefault("model_uuid", None)
        identity_key = _identity_key(information)
        if identity_key not in model_index_by_identity:
            model_index_by_identity[identity_key] = len(models)
            # 历史 v2 谱系可能未记录厂商；沿用既有占位，不从名称推测厂商或 UUID。
            models.append({"creator": information.get("creator", "?"),
                           "identity_resolution": "model_uuid" if information["model_uuid"] else "legacy_creator_and_name_without_uuid"})
        model_index = model_index_by_identity[identity_key]
        common = models[model_index]
        reference = {"model_index": model_index}
        for key, value in information.items():
            if key == "panel":
                existing_panel = common.setdefault("panel", {})
                for field, panel_value in value.items():
                    if field in existing_panel and existing_panel[field] != panel_value:
                        raise ValueError(f"同一模型的公共字段不一致：{identity_key!r}.panel.{field}")
                    existing_panel[field] = panel_value
            else:
                if key in common and common[key] != value:
                    if key in MODEL_REASONING_GROUP_INFORMATION_FIELD_NAMES:
                        reference[key] = value
                        continue
                    raise ValueError(f"同一模型的公共字段不一致：{identity_key!r}.{key}")
                common[key] = value
        return reference

    # 先注册显示点，随后合并未上图和谱系记录，避免把缺失字段覆盖成空值。
    for variant in result["metric_variants"].values():
        for field in ("plotly_static_export_trace_data", "plotly_static_export_layout"):
            variant.pop(field, None)
        scene = variant["three_dimensional_scene"]
        scene.update(build_exact_achievable_frontier_geometry_from_scene(scene))
        references = []
        for marker in scene["displayed_model_markers"]:
            information = {key: value for key, value in marker.items() if key not in MARKER_VARIANT_FIELD_NAMES and key != "panel"}
            information["panel"] = {key: value for key, value in marker["panel"].items() if key != "layer"}
            reference = reference_for_model_information(information)
            reference.update({key: value for key, value in marker.items() if key in MARKER_VARIANT_FIELD_NAMES})
            reference["panel"] = {"layer": marker["panel"].get("layer")}
            references.append(reference)
        scene["displayed_model_markers"] = references
        exclusions = []
        for excluded in variant.get("excluded_models_with_drop_reason", []):
            information = {key: excluded[key] for key in ("name", "creator", "model_uuid") if key in excluded}
            information["panel"] = {"intelligence": excluded["intelligence"], "release_date": excluded.get("release_date") or "?"}
            reference = reference_for_model_information(information)
            common = models[reference["model_index"]]
            for field in MODEL_REASONING_GROUP_INFORMATION_FIELD_NAMES:
                if field in excluded:
                    if field in common and common[field] != excluded[field]:
                        reference[field] = excluded[field]
                    else:
                        common[field] = excluded[field]
            reference.update({key: value for key, value in excluded.items() if key in EXCLUDED_MODEL_REFERENCE_FIELD_NAMES})
            exclusions.append(reference)
        variant["excluded_models_with_drop_reason"] = exclusions
        for key, nodes in variant["interaction_relationships"].get("lineages", {}).items():
            references = []
            for node in nodes:
                information = {field: value for field, value in node.items() if field in LINEAGE_MODEL_INFORMATION_FIELD_NAMES}
                reference = reference_for_model_information(information)
                reference.update({field: value for field, value in node.items() if field not in LINEAGE_MODEL_INFORMATION_FIELD_NAMES})
                references.append(reference)
            variant["interaction_relationships"]["lineages"][key] = references
    return result


def expand_frontier_3d_visualization_dataset_for_scene_consumers(dataset):
    """给现有场景消费者提供 v2 形状的只读副本；磁盘与 HTML 仍使用引用契约。"""
    if dataset.get("schema_version") == LEGACY_SCENE_SCHEMA_VERSION:
        return copy.deepcopy(dataset)
    if dataset.get("schema_version") not in (SCIENTIFIC_CONTRACT_SCHEMA_VERSION, BROWSER_PROJECTION_SCHEMA_VERSION,
                                            PREVIOUS_SCIENTIFIC_CONTRACT_SCHEMA_VERSION, PREVIOUS_BROWSER_PROJECTION_SCHEMA_VERSION):
        raise ValueError("Frontier 3D visualization dataset schema_version 不匹配")
    result = copy.deepcopy(dataset)
    models = result.pop("models")
    eligibility_definitions = result.pop("analysis_eligibility_definitions", [])
    excluded_model_explanation_definitions = result.pop("excluded_model_explanation_definitions", [])
    result["schema_version"] = LEGACY_SCENE_SCHEMA_VERSION

    def model_information(reference):
        index = reference.get("model_index")
        if not isinstance(index, int) or isinstance(index, bool) or not 0 <= index < len(models):
            raise ValueError(f"model_index 引用越界或不是整数：{index!r}")
        return {key: copy.deepcopy(value) for key, value in models[index].items() if key != "identity_resolution"}

    def expanded_reference_fields(reference):
        fields = {key: value for key, value in reference.items() if key not in ("model_index", "analysis_eligibility_index", "excluded_model_explanation_index")}
        if "analysis_eligibility_index" in reference:
            index = reference["analysis_eligibility_index"]
            if not isinstance(index, int) or isinstance(index, bool) or not 0 <= index < len(eligibility_definitions):
                raise ValueError(f"analysis_eligibility_index 引用越界：{index!r}")
            fields["analysis_eligibility"] = copy.deepcopy(eligibility_definitions[index])
        if "excluded_model_explanation_index" in reference:
            index = reference["excluded_model_explanation_index"]
            if not isinstance(index, int) or isinstance(index, bool) or not 0 <= index < len(excluded_model_explanation_definitions):
                raise ValueError(f"excluded_model_explanation_index 引用越界：{index!r}")
            fields.update(copy.deepcopy(excluded_model_explanation_definitions[index]))
        return fields

    for variant in result["metric_variants"].values():
        scene = variant["three_dimensional_scene"]
        markers = []
        for reference in scene["displayed_model_markers"]:
            common = model_information(reference)
            if dataset.get("schema_version") in (BROWSER_PROJECTION_SCHEMA_VERSION, PREVIOUS_BROWSER_PROJECTION_SCHEMA_VERSION):
                identity = dataset["organization_identity_metadata_by_creator_name"].get(common["creator"], {})
                for field in ("creator_uuid", "organization_identity_key", "country_region_category"):
                    if field not in common and field in identity:
                        common[field] = identity[field]
            common_panel = common.pop("panel", {})
            relationships = variant["interaction_relationships"]
            common.update(x=common_panel.get(relationships.get("cost_axis_field")),
                          y=common_panel.get(relationships.get("speed_axis_field")),
                          z=common_panel.get("intelligence"))
            common.update(expanded_reference_fields(reference))
            common["panel"] = {**common_panel, **reference.get("panel", {})}
            markers.append(common)
        scene["displayed_model_markers"] = markers
        exclusions = []
        for reference in variant.get("excluded_models_with_drop_reason", []):
            common = model_information(reference)
            panel = common.get("panel", {})
            excluded = {key: common.get(key) for key in ("name", "creator", "model_uuid")}
            excluded.update({key: common[key] for key in MODEL_REASONING_GROUP_INFORMATION_FIELD_NAMES if key in common})
            excluded.update(intelligence=panel.get("intelligence"), release_date=None if panel.get("release_date") == "?" else panel.get("release_date"))
            excluded.update(expanded_reference_fields(reference))
            exclusions.append(excluded)
        variant["excluded_models_with_drop_reason"] = exclusions
        for key, references in variant["interaction_relationships"].get("lineages", {}).items():
            variant["interaction_relationships"]["lineages"][key] = [
                {**{field: value for field, value in model_information(reference).items() if field in LINEAGE_MODEL_INFORMATION_FIELD_NAMES},
                 **expanded_reference_fields(reference)}
                for reference in references
            ]
    return result


def _require_finite_json_numbers(value, field_path="dataset"):
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        try:
            finite = math.isfinite(float(value))
        except OverflowError:
            finite = False
        if not finite:
            raise ValueError(f"{field_path} 不是浏览器可表示的有限数")
    if isinstance(value, dict):
        for key, child in value.items():
            _require_finite_json_numbers(child, f"{field_path}.{key}")
    elif isinstance(value, list):
        for index, child in enumerate(value):
            _require_finite_json_numbers(child, f"{field_path}[{index}]")


@lru_cache(maxsize=4)
def _schema_validator(browser_projection, schema_version):
    current = schema_version in (SCIENTIFIC_CONTRACT_SCHEMA_VERSION, BROWSER_PROJECTION_SCHEMA_VERSION)
    common = json.loads((SCHEMA_DIRECTORY / ("frontier_3d_model_reference_contract_common_v2.schema.json" if current else "frontier_3d_model_reference_contract_common.schema.json")).read_text())
    filename = ("frontier_3d_browser_projection_v2.schema.json" if browser_projection else "frontier_3d_scientific_dataset_v4.schema.json") if current else ("frontier_3d_browser_projection_v1.schema.json" if browser_projection else "frontier_3d_scientific_dataset_v3.schema.json")
    schema = json.loads((SCHEMA_DIRECTORY / filename).read_text())
    registry = Registry().with_resource(common["$id"], Resource.from_contents(common))
    Draft202012Validator.check_schema(common)
    Draft202012Validator.check_schema(schema)
    return Draft202012Validator(schema, registry=registry)


def validate_versioned_frontier_3d_model_reference_contract(dataset, *, browser_projection):
    _require_finite_json_numbers(dataset)
    error = next(_schema_validator(browser_projection, dataset.get("schema_version")).iter_errors(dataset), None)
    if error:
        field_path = ".".join(map(str, error.absolute_path))
        raise ValueError(f"JSON Schema 校验失败 {field_path}：{error.message}")
    identities = set()
    for model in dataset["models"]:
        identity = _identity_key(model)
        if identity in identities:
            raise ValueError("models 公共表存在重复模型身份")
        identities.add(identity)
        expected = "model_uuid" if model.get("model_uuid") else "legacy_creator_and_name_without_uuid"
        if model.get("identity_resolution", "model_uuid") != expected:
            raise ValueError("identity_resolution 与 model_uuid 不一致")
    if dataset["schema_version"] in (SCIENTIFIC_CONTRACT_SCHEMA_VERSION, BROWSER_PROJECTION_SCHEMA_VERSION):
        for key, variant in dataset["metric_variants"].items():
            indices = [record["model_index"] for record in variant["model_analysis_records"]]
            if sorted(indices) != list(range(len(dataset["models"]))):
                raise ValueError(f"{key}.model_analysis_records 必须唯一覆盖全部公共模型")
            displayed_indices = {marker["model_index"] for marker in variant["three_dimensional_scene"]["displayed_model_markers"]}
            if any(not 0 <= index < len(dataset["models"]) for index in displayed_indices):
                raise ValueError(f"{key}.displayed_model_markers.model_index 引用越界")
            for record in variant["model_analysis_records"]:
                if record["is_displayed"] != (record["model_index"] in displayed_indices):
                    raise ValueError(f"{key}.model_analysis_records 上图状态与场景引用不一致")
                eligibility = record.get("analysis_eligibility")
                if eligibility is None:
                    eligibility_index = record.get("analysis_eligibility_index")
                    definitions = dataset.get("analysis_eligibility_definitions", [])
                    if not isinstance(eligibility_index, int) or not 0 <= eligibility_index < len(definitions):
                        raise ValueError(f"{key}.model_analysis_records.analysis_eligibility_index 引用越界")
                    eligibility = definitions[eligibility_index]
                if record["missing_dimension_names"] or not eligibility["is_analysis_eligible_for_current_metric_variant"]:
                    if any(value is not None for classification in record["sensitivity_by_intelligence_half_width"].values() for value in classification.values()):
                        raise ValueError(f"{key} 不合格记录的敏感性必须保持未知")
    expanded = expand_frontier_3d_visualization_dataset_for_scene_consumers(dataset)
    from .frontier_3d_visualization_dataset_builder import validate_frontier_3d_visualization_dataset, _validate_coordinate_lists
    validate_frontier_3d_visualization_dataset(expanded)
    for key, variant in expanded["metric_variants"].items():
        scene = variant["three_dimensional_scene"]
        marker_count = len(scene["displayed_model_markers"])
        relationships = variant["interaction_relationships"]
        for marker in scene["displayed_model_markers"]:
            panel = marker["panel"]
            for axis_name, field in (("x", relationships.get("cost_axis_field")), ("y", relationships.get("speed_axis_field")), ("z", "intelligence")):
                if field in panel and marker[axis_name] != panel[field]:
                    raise ValueError(f"{key}.{axis_name} 与公共模型字段 {field} 不一致")
                if scene["three_dimensional_axis_configuration"][f"{axis_name}_axis"]["scale_type"] == "log" and marker[axis_name] <= 0:
                    raise ValueError(f"{key}.{axis_name} 对数轴坐标必须为正值")
        for lineage_key, lineage_nodes in relationships.get("lineages", {}).items():
            lineage_node_references = dataset["metric_variants"][key]["interaction_relationships"]["lineages"][lineage_key]
            for lineage_node_index, lineage_node in enumerate(lineage_nodes):
                lineage_node_field_path = f"{key}.lineages[{lineage_key!r}][{lineage_node_index}]"
                common_model_panel = dataset["models"][lineage_node_references[lineage_node_index]["model_index"]].get("panel", {})
                for axis_name, field in (("x", relationships.get("cost_axis_field")), ("y", relationships.get("speed_axis_field")), ("z", "intelligence")):
                    if field in common_model_panel and lineage_node[axis_name] != common_model_panel[field]:
                        raise ValueError(f"{lineage_node_field_path}.{axis_name} 与公共模型字段 {field} 不一致")
                if "intelligence" in lineage_node and lineage_node["z"] != lineage_node["intelligence"]:
                    raise ValueError(f"{lineage_node_field_path}.z 与 intelligence 不一致")
        for group in ("base_groups", "reasoning_variant_group_model_indices_by_base_model_name"):
            for base_model_name, indices in relationships.get(group, {}).items():
                if any(isinstance(index, bool) or not isinstance(index, int) or not 0 <= index < marker_count for index in indices):
                    raise ValueError(f"{key}.{group} 模型索引越界")
                if any(scene["displayed_model_markers"][index].get("base_model_name") != base_model_name for index in indices):
                    raise ValueError(f"{key}.{group}[{base_model_name!r}] 引用的模型不属于该 base_model_name 分组")
        for axis in scene["three_dimensional_axis_configuration"].values():
            bounds = axis["fixed_range"]
            if len(bounds) != 2 or not bounds[0] < bounds[1]:
                raise ValueError(f"{key} 坐标轴固定范围无效")
        if "exact_achievable_frontier_boundary_line_segments" in scene:
            _validate_coordinate_lists(scene["exact_achievable_frontier_boundary_line_segments"], f"{key}.exact_achievable_frontier_boundary_line_segments", allow_none_as_line_break_separator=True)


def build_frontier_3d_browser_projection(dataset):
    """完整契约先校验，随后投影并单独校验；保留四口径搜索解释能力。"""
    from .frontier_3d_visualization_dataset_builder import validate_frontier_3d_visualization_dataset
    validate_frontier_3d_visualization_dataset(dataset)
    result = adapt_frontier_3d_visualization_dataset_to_v3(dataset)
    result["schema_version"] = BROWSER_PROJECTION_SCHEMA_VERSION if result["schema_version"] == SCIENTIFIC_CONTRACT_SCHEMA_VERSION else PREVIOUS_BROWSER_PROJECTION_SCHEMA_VERSION
    for model in result["models"]:
        if model.get("model_uuid"):
            model.pop("identity_resolution", None)
        identity = result["organization_identity_metadata_by_creator_name"].get(model["creator"], {})
        for field in ("creator_uuid", "organization_identity_key", "country_region_category"):
            if field in model and model[field] == identity.get(field):
                model.pop(field)
    displayed_creator_names = {result["models"][marker["model_index"]]["creator"] for variant in result["metric_variants"].values() for marker in variant["three_dimensional_scene"]["displayed_model_markers"]}
    for name, identity in result["organization_identity_metadata_by_creator_name"].items():
        if name not in displayed_creator_names:
            identity.pop("logo_visualization_data_url", None)
        for audit_field in ("creator_uuid_aliases", "creator_name_aliases", "country_region_classification_basis", "logo_asset_source"):
            identity.pop(audit_field, None)
    for variant in result["metric_variants"].values():
        for marker in variant["three_dimensional_scene"]["displayed_model_markers"]:
            marker.get("standout_metrics", {}).pop("trend_residual_standard_deviation_units", None)
            panel = result["models"][marker["model_index"]].get("panel", {})
            relationships = variant["interaction_relationships"]
            # 坐标已在公共 panel 的原始指标中保存；只有差异值才留在投影引用上。
            for axis, field in (("x", relationships.get("cost_axis_field")), ("y", relationships.get("speed_axis_field")), ("z", "intelligence")):
                if marker.get(axis) is not None and marker.get(axis) == panel.get(field):
                    marker.pop(axis)
    eligibility_definitions = result.setdefault("analysis_eligibility_definitions", [])
    eligibility_index_by_serialized_definition = {json.dumps(definition, ensure_ascii=False, sort_keys=True): index for index, definition in enumerate(eligibility_definitions)}
    for variant in result["metric_variants"].values():
        references = [*variant["three_dimensional_scene"]["displayed_model_markers"], *variant["excluded_models_with_drop_reason"], *variant.get("model_analysis_records", []),
                      *(node for nodes in variant["interaction_relationships"].get("lineages", {}).values() for node in nodes)]
        for reference in references:
            if "analysis_eligibility" not in reference:
                continue
            definition = reference.pop("analysis_eligibility")
            serialized = json.dumps(definition, ensure_ascii=False, sort_keys=True)
            if serialized not in eligibility_index_by_serialized_definition:
                eligibility_index_by_serialized_definition[serialized] = len(eligibility_definitions)
                eligibility_definitions.append(definition)
            reference["analysis_eligibility_index"] = eligibility_index_by_serialized_definition[serialized]
    explanation_definitions = result.setdefault("excluded_model_explanation_definitions", [])
    explanation_index_by_serialized_definition = {json.dumps(definition, ensure_ascii=False, sort_keys=True): index for index, definition in enumerate(explanation_definitions)}
    for variant in result["metric_variants"].values():
        for reference in variant["excluded_models_with_drop_reason"]:
            if "excluded_model_explanation_index" in reference:
                continue
            explanation = {field: reference.pop(field) for field in EXCLUDED_MODEL_EXPLANATION_FIELD_NAMES if field in reference}
            serialized = json.dumps(explanation, ensure_ascii=False, sort_keys=True)
            if serialized not in explanation_index_by_serialized_definition:
                explanation_index_by_serialized_definition[serialized] = len(explanation_definitions)
                explanation_definitions.append(explanation)
            reference["excluded_model_explanation_index"] = explanation_index_by_serialized_definition[serialized]
    validate_frontier_3d_browser_projection(result)
    return result


def validate_frontier_3d_browser_projection(dataset):
    validate_versioned_frontier_3d_model_reference_contract(dataset, browser_projection=True)
