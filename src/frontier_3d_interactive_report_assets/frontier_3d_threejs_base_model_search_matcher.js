const normalizeSearchText = (value) => String(value ?? "").trim().replace(/\s+/g, " ").toLowerCase();

export function matchingBaseModelNames(baseModelNames, query, resultLimit = 40) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return [];
  return baseModelNames.filter((name) => normalizeSearchText(name).includes(normalizedQuery)).slice(0, resultLimit);
}

export function matchingModelGroups(models, query, resultLimit = 40) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return { groups: [], totalGroupCount: 0 };
  const modelsByBaseName = new Map();
  const matchingBaseNames = new Set();
  for (const model of models) {
    const baseName = model.base_model_name || model.name;
    if (!modelsByBaseName.has(baseName)) modelsByBaseName.set(baseName, []);
    modelsByBaseName.get(baseName).push(model);
    if ([model.name, baseName, model.creator, model.reasoning_level_label, model.tier].some(value => normalizeSearchText(value).includes(normalizedQuery))) matchingBaseNames.add(baseName);
  }
  return {
    totalGroupCount: matchingBaseNames.size,
    groups: [...matchingBaseNames].slice(0, resultLimit).map(baseModelName => ({ baseModelName, models: modelsByBaseName.get(baseModelName) })),
  };
}
