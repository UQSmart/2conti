const PERIODS_PER_YEAR = {
  day: 365,
  week: 52,
  month: 12,
  year: 1,
};

export function lifetimeToYears(value, unit) {
  const numeric = Number(value) || 0;
  return unit === 'months' ? numeric / 12 : numeric;
}

export function calculateUsesPerYear(quantity, period) {
  const q = Number(quantity) || 0;
  return q * (PERIODS_PER_YEAR[period] ?? 0);
}

export function calculateTotalUses(quantity, period, lifetimeValue, lifetimeUnit) {
  return calculateUsesPerYear(quantity, period) * lifetimeToYears(lifetimeValue, lifetimeUnit);
}

export function calculateMaintenanceTotal(maintenancePerYear, lifetimeValue, lifetimeUnit) {
  return (Number(maintenancePerYear) || 0) * lifetimeToYears(lifetimeValue, lifetimeUnit);
}

export function calculateConsumablesTotal(consumablePerUse, totalUses) {
  return (Number(consumablePerUse) || 0) * totalUses;
}

export function calculateNetCost({ price, maintenancePerYear, consumablePerUse, resaleValue, totalUses, lifetimeValue, lifetimeUnit }) {
  const purchasePrice = Number(price) || 0;
  const maintenance = calculateMaintenanceTotal(maintenancePerYear, lifetimeValue, lifetimeUnit);
  const consumables = calculateConsumablesTotal(consumablePerUse, totalUses);
  const resale = Number(resaleValue) || 0;
  return purchasePrice + maintenance + consumables - resale;
}

export function calculateCostPerUse(cost, totalUses) {
  if (!totalUses || totalUses <= 0) return 0;
  return cost / totalUses;
}

export function calculateRequiredUses(netCost, targetCostPerUse) {
  const target = Number(targetCostPerUse) || 0;
  if (target <= 0) return 0;
  return netCost / target;
}

export function requiredFrequencyPerWeek(requiredUses, lifetimeValue, lifetimeUnit) {
  const years = lifetimeToYears(lifetimeValue, lifetimeUnit);
  if (years <= 0) return 0;
  return requiredUses / (years * 52);
}
