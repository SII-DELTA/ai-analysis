export const FRONTIER_STANDOUT_METRIC_NAMES = Object.freeze({
  TREND_RESIDUAL: "trend_residual",
  INTELLIGENCE_UPLIFT: "intelligence_uplift",
  WEIGHTED_EXCLUSIVE_HYPERVOLUME: "weighted_exclusive_hypervolume",
  FRONTIER_DISTANCE: "frontier_distance",
});

export const FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME = Object.freeze({
  [FRONTIER_STANDOUT_METRIC_NAMES.TREND_RESIDUAL]: {
    label: "趋势残差",
    displayedDecimalPlaces: 1,
    usesAdjustableAxisWeights: false,
    modelMetricFieldName: "trend_residual",
  },
  [FRONTIER_STANDOUT_METRIC_NAMES.INTELLIGENCE_UPLIFT]: {
    label: "智能抬升",
    displayedDecimalPlaces: 1,
    usesAdjustableAxisWeights: false,
    modelMetricFieldName: "intelligence_uplift",
  },
  [FRONTIER_STANDOUT_METRIC_NAMES.WEIGHTED_EXCLUSIVE_HYPERVOLUME]: {
    label: "加权超体积",
    displayedDecimalPlaces: 3,
    usesAdjustableAxisWeights: true,
    modelMetricFieldName: "weighted_exclusive_hypervolume",
  },
  [FRONTIER_STANDOUT_METRIC_NAMES.FRONTIER_DISTANCE]: {
    label: "到前沿垂距",
    displayedDecimalPlaces: 3,
    usesAdjustableAxisWeights: false,
    modelMetricFieldName: "frontier_distance",
  },
});

function calculateOriginAnchoredRectangleUnionArea(rectangles) {
  const rectanglesSortedByDescendingWidth = rectangles
    .slice()
    .sort((left, right) => right[0] - left[0] || right[1] - left[1]);
  let unionArea = 0;
  let maximumCoveredHeight = 0;
  rectanglesSortedByDescendingWidth.forEach(([width, height]) => {
    if (height > maximumCoveredHeight) {
      unionArea += width * (height - maximumCoveredHeight);
      maximumCoveredHeight = height;
    }
  });
  return unionArea;
}

function calculateThreeDimensionalHypervolume(points) {
  if (!points.length) return 0;
  const pointsSortedByDescendingIntelligence = points
    .slice()
    .sort((left, right) => right[2] - left[2]);
  let hypervolume = 0;
  let previousIntelligenceCoordinate = null;
  const costAndSpeedRectangles = [];
  pointsSortedByDescendingIntelligence.forEach(
    ([costEfficiencyCoordinate, speedCoordinate, intelligenceCoordinate]) => {
      if (previousIntelligenceCoordinate !== null) {
        hypervolume +=
          calculateOriginAnchoredRectangleUnionArea(costAndSpeedRectangles) *
          (previousIntelligenceCoordinate - intelligenceCoordinate);
      }
      costAndSpeedRectangles.push([costEfficiencyCoordinate, speedCoordinate]);
      previousIntelligenceCoordinate = intelligenceCoordinate;
    },
  );
  return (
    hypervolume +
    calculateOriginAnchoredRectangleUnionArea(costAndSpeedRectangles) *
      previousIntelligenceCoordinate
  );
}

function calculateWeightedExclusiveHypervolumeValues(
  frontierModels,
  standoutAxisWeights,
) {
  const weightedNormalizedImprovementPoints = frontierModels.map((model) => {
    const coordinates = model.normalized_improvement_coordinates;
    return [
      Math.pow(coordinates.cost_efficiency, standoutAxisWeights.cost),
      Math.pow(coordinates.speed, standoutAxisWeights.speed),
      Math.pow(coordinates.intelligence, standoutAxisWeights.intelligence),
    ];
  });
  const completeFrontierHypervolume = calculateThreeDimensionalHypervolume(
    weightedNormalizedImprovementPoints,
  );
  return weightedNormalizedImprovementPoints.map(
    (unusedPoint, excludedPointIndex) =>
      completeFrontierHypervolume -
      calculateThreeDimensionalHypervolume(
        weightedNormalizedImprovementPoints.filter(
          (unusedOtherPoint, otherPointIndex) =>
            excludedPointIndex !== otherPointIndex,
        ),
      ),
  );
}

export function calculateFrontierStandoutMetricValues(
  frontierModels,
  selectedStandoutMetricName,
  standoutAxisWeights,
) {
  const metricDefinition =
    FRONTIER_STANDOUT_METRIC_DEFINITIONS_BY_NAME[selectedStandoutMetricName];
  if (!metricDefinition) {
    throw new Error(`Unknown frontier standout metric: ${selectedStandoutMetricName}`);
  }
  if (metricDefinition.usesAdjustableAxisWeights) {
    return calculateWeightedExclusiveHypervolumeValues(
      frontierModels,
      standoutAxisWeights,
    );
  }
  return frontierModels.map((model) => {
    const value = model.standout_metrics[metricDefinition.modelMetricFieldName];
    return value === null || value === undefined || !isFinite(value) ? NaN : value;
  });
}
