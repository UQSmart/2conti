import { calculateProduct } from './calculator.js';

export function compareProducts(productA, productB) {
  const a = calculateProduct(productA);
  const b = calculateProduct(productB);

  const lower = a.realCostPerUse <= b.realCostPerUse ? 'A' : 'B';
  const high = Math.max(a.realCostPerUse, b.realCostPerUse);
  const low = Math.min(a.realCostPerUse, b.realCostPerUse);
  const differencePct = high > 0 ? ((high - low) / high) * 100 : 0;

  return { a, b, lower, differencePct };
}
