// 只在浏览器内展开显示副本；单文件保留去重引用，旧 v2 仍可直接读取。
export function expandFrontierModelReferencesForSceneConsumers(dataset) {
  if (dataset.schema_version === "frontier_3d_visualization_dataset/v2") return dataset;
  if (!["frontier_3d_browser_projection/v1", "frontier_3d_visualization_dataset/v3"].includes(dataset.schema_version)) {
    throw new Error("不支持的 Frontier 3D 数据契约版本");
  }
  const lineageModelFields = ["name", "model_uuid", "creator", "base_model_name", "lineage_family_key", "reasoning_level_label", "reasoning_level_sort_order"];
  const informationForReference = (reference) => {
    const index = reference.model_index;
    if (!Number.isInteger(index) || index < 0 || index >= dataset.models.length) {
      throw new Error(`model_index 引用越界：${index}`);
    }
    const { identity_resolution, ...information } = dataset.models[index];
    return information;
  };
  const referenceOverrides = ({ model_index, analysis_eligibility_index, excluded_model_explanation_index, ...fields }) => {
    if (analysis_eligibility_index !== undefined) {
      if (!Number.isInteger(analysis_eligibility_index) || analysis_eligibility_index < 0 || analysis_eligibility_index >= (dataset.analysis_eligibility_definitions?.length || 0)) {
        throw new Error(`analysis_eligibility_index 引用越界：${analysis_eligibility_index}`);
      }
      const definition = dataset.analysis_eligibility_definitions[analysis_eligibility_index];
      fields.analysis_eligibility = { ...definition };
      if (Array.isArray(definition.ineligibility_reason_codes)) fields.analysis_eligibility.ineligibility_reason_codes = [...definition.ineligibility_reason_codes];
    }
    if (excluded_model_explanation_index !== undefined) {
      if (!Number.isInteger(excluded_model_explanation_index) || excluded_model_explanation_index < 0 || excluded_model_explanation_index >= (dataset.excluded_model_explanation_definitions?.length || 0)) {
        throw new Error(`excluded_model_explanation_index 引用越界：${excluded_model_explanation_index}`);
      }
      const explanation = dataset.excluded_model_explanation_definitions[excluded_model_explanation_index];
      Object.assign(fields, explanation, { missing_dimension_names: [...explanation.missing_dimension_names] });
    }
    return fields;
  };
  const metricVariants = Object.fromEntries(Object.entries(dataset.metric_variants).map(([key, variant]) => [key, {
    ...variant,
    three_dimensional_scene: {
      ...variant.three_dimensional_scene,
      displayed_model_markers: variant.three_dimensional_scene.displayed_model_markers.map((reference) => {
        const information = informationForReference(reference);
        const identity = dataset.organization_identity_metadata_by_creator_name?.[information.creator] || {};
        return { ...Object.fromEntries(["creator_uuid", "organization_identity_key", "country_region_category"].filter((field) => field in identity).map((field) => [field, identity[field]])), ...information,
          x: information.panel?.[variant.interaction_relationships?.cost_axis_field],
          y: information.panel?.[variant.interaction_relationships?.speed_axis_field],
          z: information.panel?.intelligence,
          ...referenceOverrides(reference), panel: { ...information.panel, ...reference.panel } };
      }),
    },
    excluded_models_with_drop_reason: (variant.excluded_models_with_drop_reason || []).map((reference) => {
      const information = informationForReference(reference);
      return { name: information.name, creator: information.creator, model_uuid: information.model_uuid,
        ...Object.fromEntries(["base_model_name", "tier", "reasoning_level_label", "reasoning_level_sort_order"].filter((field) => field in information).map((field) => [field, information[field]])),
        intelligence: information.panel?.intelligence,
        release_date: information.panel?.release_date === "?" ? null : information.panel?.release_date,
        ...referenceOverrides(reference) };
    }),
    interaction_relationships: {
      ...variant.interaction_relationships,
      lineages: Object.fromEntries(Object.entries(variant.interaction_relationships?.lineages || {}).map(([lineageKey, references]) => [lineageKey,
        references.map((reference) => {
          const information = informationForReference(reference);
          return { ...Object.fromEntries(lineageModelFields.filter((field) => field in information).map((field) => [field, information[field]])), ...referenceOverrides(reference) };
        }),
      ])),
    },
  }]));
  return { ...dataset, metric_variants: metricVariants };
}
