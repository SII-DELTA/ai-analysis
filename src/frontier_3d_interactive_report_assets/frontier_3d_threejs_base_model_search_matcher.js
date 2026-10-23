// 只匹配既有基模型名；完整字段索引与键盘导航由 W3 扩展。
export function matchingBaseModelNames(baseModelNames, query, resultLimit = 40) {
  const normalize = (value) => String(value ?? "").trim().replace(/\s+/g, " ").toLowerCase();
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];
  return baseModelNames.filter((name) => normalize(name).includes(normalizedQuery)).slice(0, resultLimit);
}
