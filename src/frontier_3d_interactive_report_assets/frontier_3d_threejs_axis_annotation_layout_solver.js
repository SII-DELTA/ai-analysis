// 输入均为屏幕坐标与已测量尺寸；不访问 DOM、相机或 THREE，便于直接复验布局。
export function solveFrontierAxisAnnotationLayout(configuration) {
  const axes = configuration.axes;
  const titleConstraint = axis => {
    const title = axis.labels.find(label => label.isTitle);
    return title ? Math.max(title.width, title.height) / Math.max(1, Math.hypot(axis.projectedEnd.x - axis.projectedStart.x, axis.projectedEnd.y - axis.projectedStart.y)) : 0;
  };
  // 先放置相对于投影轴段最长的标题，避免短轴标题被其他标题挤走。
  const axesByDescendingTitleConstraint = axes.slice().sort((left, right) => titleConstraint(right) - titleConstraint(left));
  const titleIds = new Set(axes.flatMap(axis => axis.labels.filter(label => label.isTitle).map(label => label.id)));
  const titleOrders = [axesByDescendingTitleConstraint, axes, axes.slice().reverse(),
    [axes[1], axes[2], axes[0]], [axes[2], axes[0], axes[1]], [axes[0], axes[2], axes[1]], [axes[1], axes[0], axes[2]]];
  let bestLayout = [], maximumVisibleTitleCount = -1;
  for (const titleOrder of titleOrders) {
    const layout = solveAxisAnnotationLayoutWithOrderedTitles(configuration, titleOrder.filter(Boolean));
    const visibleTitleCount = layout.filter(label => titleIds.has(label.id) && !label.hidden).length;
    if (visibleTitleCount > maximumVisibleTitleCount) { bestLayout = layout; maximumVisibleTitleCount = visibleTitleCount; }
    if (visibleTitleCount === titleIds.size) return layout;
  }
  return bestLayout;
}

function solveAxisAnnotationLayoutWithOrderedTitles({ canvasWidth, canvasHeight, projectedCenter, axes }, titleAxes) {
  const occupiedRectangles = [];
  const result = [];
  const dot = (first, second) => first.x * second.x + first.y * second.y;
  const subtract = (first, second) => ({ x: first.x - second.x, y: first.y - second.y });
  const scaled = (vector, scale) => ({ x: vector.x * scale, y: vector.y * scale });
  const perpendicular = (vector) => ({ x: -vector.y, y: vector.x });
  const projectedHalfSize = (rectangle, direction) => rectangle.directions.reduce(
    (sum, axis, index) => sum + Math.abs(dot(axis, direction)) * rectangle.halfSizes[index], 0,
  );
  for (const renderTitles of [true, false]) {
    for (const { projectedStart, projectedEnd, labels } of renderTitles ? titleAxes : axes) {
      const axisDirection = subtract(projectedEnd, projectedStart);
      const length = Math.hypot(axisDirection.x, axisDirection.y);
      const unitAxis = length ? scaled(axisDirection, 1 / length) : { x: 1, y: 0 };
      let outwardDirection = perpendicular(unitAxis);
      const midpoint = { x: (projectedStart.x + projectedEnd.x) / 2, y: (projectedStart.y + projectedEnd.y) / 2 };
      if (dot(outwardDirection, subtract(midpoint, projectedCenter)) < 0) outwardDirection = scaled(outwardDirection, -1);
      let titleAngle = Math.atan2(axisDirection.y, axisDirection.x) * 180 / Math.PI;
      if (titleAngle > 90) titleAngle -= 180;
      if (titleAngle < -90) titleAngle += 180;
      for (const label of labels.filter((candidate) => candidate.isTitle === renderTitles)) {
        const rotationDegrees = label.isTitle ? titleAngle : 0;
        const output = { id: label.id, hidden: true, rotationDegrees };
        result.push(output);
        if (label.projectedDepth < -1 || label.projectedDepth > 1 || length < 1) continue;
        const radians = rotationDegrees * Math.PI / 180;
        const halfWidth = (Math.abs(Math.cos(radians)) * label.width + Math.abs(Math.sin(radians)) * label.height) / 2;
        const halfHeight = (Math.abs(Math.sin(radians)) * label.width + Math.abs(Math.cos(radians)) * label.height) / 2;
        const labelDirection = label.isTitle ? unitAxis : { x: 1, y: 0 };
        const rectangle = { directions: [labelDirection, perpendicular(labelDirection)], halfSizes: [label.width / 2, label.height / 2] };
        const preferredFraction = dot(subtract(label.anchor, projectedStart), axisDirection) / (length * length);
        for (const offset of label.isTitle ? [48, 24, -48, -24, 0, 40, -40, 32, -32, 16, -16, 8, -8] : [16, -16, 8, -8, 0]) {
          let minimumFraction = label.isTitle ? 0 : preferredFraction;
          let maximumFraction = label.isTitle ? 1 : preferredFraction;
          for (const [coordinate, canvasSize, halfSize] of [["x", canvasWidth, halfWidth], ["y", canvasHeight, halfHeight]]) {
            const minimumAnchor = Math.max(0, halfSize + 2 - outwardDirection[coordinate] * offset);
            const maximumAnchor = Math.min(canvasSize, canvasSize - halfSize - 2 - outwardDirection[coordinate] * offset);
            const direction = axisDirection[coordinate];
            if (Math.abs(direction) < 1e-8) {
              if (projectedStart[coordinate] < minimumAnchor || projectedStart[coordinate] > maximumAnchor) maximumFraction = -1;
            } else {
              const first = (minimumAnchor - projectedStart[coordinate]) / direction;
              const last = (maximumAnchor - projectedStart[coordinate]) / direction;
              minimumFraction = Math.max(minimumFraction, Math.min(first, last));
              maximumFraction = Math.min(maximumFraction, Math.max(first, last));
            }
            if (minimumAnchor > maximumAnchor) maximumFraction = -1;
          }
          if (minimumFraction > maximumFraction) continue;
          const preferredVisibleFraction = Math.max(minimumFraction, Math.min(preferredFraction, maximumFraction));
          const titleFractions = [preferredVisibleFraction, minimumFraction, maximumFraction,
            ...Array.from({ length: 7 }, (_, index) => minimumFraction + (maximumFraction - minimumFraction) * (index + 1) / 8)];
          for (const fraction of label.isTitle ? titleFractions : [preferredFraction]) {
            const center = {
              x: projectedStart.x + axisDirection.x * fraction + outwardDirection.x * offset,
              y: projectedStart.y + axisDirection.y * fraction + outwardDirection.y * offset,
            };
            if (occupiedRectangles.some((other) => ![...rectangle.directions, ...other.directions].some(
              (direction) => Math.abs(dot(subtract(center, other.center), direction)) >=
                projectedHalfSize(rectangle, direction) + projectedHalfSize(other, direction) + 2,
            ))) continue;
            Object.assign(output, { hidden: false, ...center });
            occupiedRectangles.push({ ...rectangle, center });
            break;
          }
          if (!output.hidden) break;
        }
      }
    }
  }
  return result;
}
