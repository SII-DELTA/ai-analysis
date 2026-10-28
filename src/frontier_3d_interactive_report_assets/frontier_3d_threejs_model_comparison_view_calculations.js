export function compareModelReasoningLevels(left, right) {
  return (left.reasoning_level_sort_order ?? 0) - (right.reasoning_level_sort_order ?? 0)
    || String(left.name).localeCompare(String(right.name));
}

export function percentageDifferenceFromBaseline(value, baseline) {
  if (!Number.isFinite(value) || !Number.isFinite(baseline) || baseline === 0) return null;
  return (value - baseline) / Math.abs(baseline) * 100;
}

export function committedStandoutAxisWeight(draft, previousWeight) {
  if (String(draft).trim() === "" || !Number.isFinite(Number(draft))) return previousWeight;
  return Math.min(4, Math.max(0.25, Number(draft)));
}

export function formatSignificantNumber(value, significantDigits = 3) {
  return Number.isFinite(value) ? Number(value.toPrecision(significantDigits)).toString() : "未记录";
}

export function layoutPinnedModelNameAnnotations(canvasWidth, canvasHeight, labels) {
  const occupied = [];
  return labels.map(label => {
    if (!label.visible || label.width > canvasWidth || label.height > canvasHeight) return { id: label.id, hidden: true };
    const x = Math.max(0, Math.min(canvasWidth - label.width, label.x));
    for (let step = 0; step <= Math.ceil(canvasHeight / (label.height + 2)) * 2; step += 1) {
      const offset = Math.ceil(step / 2) * (step % 2 ? 1 : -1) * (label.height + 2);
      const y = Math.max(0, Math.min(canvasHeight - label.height, label.y + offset));
      if (occupied.some(other => x < other.right + 2 && x + label.width + 2 > other.x && y < other.bottom + 2 && y + label.height + 2 > other.y)) continue;
      occupied.push({ x, y, right: x + label.width, bottom: y + label.height });
      return { id: label.id, hidden: false, x, y };
    }
    return { id: label.id, hidden: true };
  });
}
