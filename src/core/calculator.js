import {
  calculateTotalUses,
  calculateNetCost,
  calculateCostPerUse,
  calculateRequiredUses,
  requiredFrequencyPerWeek,
} from './formulas.js';

export function calculateProduct(input) {
  const totalUses = calculateTotalUses(input.usageQuantity, input.usagePeriod, input.lifetimeValue, input.lifetimeUnit);
  const purchaseCostPerUse = calculateCostPerUse(Number(input.price) || 0, totalUses);
  const netCost = calculateNetCost({ ...input, totalUses });
  const realCostPerUse = calculateCostPerUse(netCost, totalUses);
  const targetCostPerUse = Number(input.targetCostPerUse) || 1;
  const requiredUses = calculateRequiredUses(netCost, targetCostPerUse);
  const requiredPerWeek = requiredFrequencyPerWeek(requiredUses, input.lifetimeValue, input.lifetimeUnit);

  return {
    ...input,
    totalUses,
    purchaseCostPerUse,
    netCost,
    realCostPerUse,
    targetCostPerUse,
    requiredUses,
    requiredPerWeek,
    scenarios: {
      half: calculateCostPerUse(netCost, totalUses / 2),
      expected: realCostPerUse,
      double: calculateCostPerUse(netCost, totalUses * 2),
    },
  };
}
