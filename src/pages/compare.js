import { SUPPORTED_CURRENCIES } from '../config/app.js';
import { compareProducts } from '../core/comparison.js';
import { money, number, escapeHtml } from '../ui/helpers.js';
import { layout } from './layout.js';

function productForm(prefix) {
  return `
    <div class="compare-product">
      <h2>Product ${prefix}</h2>
      <label>Name<input name="${prefix}_name" placeholder="Product ${prefix}"></label>
      <label>Currency<select name="${prefix}_currency">${SUPPORTED_CURRENCIES.map(c=>`<option>${c}</option>`).join('')}</select></label>
      <label>Price<input name="${prefix}_price" type="number" min="0" step="0.01" required></label>
      <label>Usage per week<input name="${prefix}_usageQuantity" type="number" min="0.01" step="0.01" value="3" required></label>
      <input type="hidden" name="${prefix}_usageUnit" value="times"><input type="hidden" name="${prefix}_usagePeriod" value="week">
      <label>Lifetime (years)<input name="${prefix}_lifetimeValue" type="number" min="0.1" step="0.1" value="4" required></label>
      <input type="hidden" name="${prefix}_lifetimeUnit" value="years">
      <details class="advanced"><summary>Advanced</summary>
        <label>Maintenance/year<input name="${prefix}_maintenancePerYear" type="number" min="0" step="0.01" value="0"></label>
        <label>Consumables/use<input name="${prefix}_consumablePerUse" type="number" min="0" step="0.01" value="0"></label>
        <label>Resale value<input name="${prefix}_resaleValue" type="number" min="0" step="0.01" value="0"></label>
      </details>
      <input type="hidden" name="${prefix}_targetCostPerUse" value="1">
    </div>`;
}

function extract(fd, prefix) {
  const o = {};
  for (const [k,v] of fd.entries()) if (k.startsWith(`${prefix}_`)) o[k.slice(2)] = v;
  return o;
}

export function renderCompare(root) {
  root.innerHTML = layout(`
    <section class="hero"><p class="eyebrow">COMPARE</p><h1>Which option gives you more value?</h1></section>
    <section class="card"><form id="compare-form"><div class="compare-grid">${productForm('A')}${productForm('B')}</div><button class="primary" type="submit">Compare</button></form></section>
    <section id="comparison-result"></section>
  `, 'compare');

  root.querySelector('#compare-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const c = compareProducts(extract(fd, 'A'), extract(fd, 'B'));
    const winner = c.lower === 'A' ? c.a : c.b;
    const loser = c.lower === 'A' ? c.b : c.a;
    root.querySelector('#comparison-result').innerHTML = `
      <section class="card result-card">
        <h2>Comparison</h2>
        <div class="comparison-table">
          <div></div><strong>${escapeHtml(c.a.name || 'Product A')}</strong><strong>${escapeHtml(c.b.name || 'Product B')}</strong>
          <span>Purchase price</span><span>${money(c.a.price,c.a.currency)}</span><span>${money(c.b.price,c.b.currency)}</span>
          <span>Total uses</span><span>${number(c.a.totalUses)}</span><span>${number(c.b.totalUses)}</span>
          <span>Net cost</span><span>${money(c.a.netCost,c.a.currency)}</span><span>${money(c.b.netCost,c.b.currency)}</span>
          <span>Cost per use</span><span>${money(c.a.realCostPerUse,c.a.currency)}</span><span>${money(c.b.realCostPerUse,c.b.currency)}</span>
        </div>
        <div class="insight"><strong>${escapeHtml(winner.name || `Product ${c.lower}`)}</strong> has an estimated cost per use about <strong>${number(c.differencePct,1)}%</strong> lower than ${escapeHtml(loser.name || 'the alternative')}.</div>
      </section>`;
  });
}
