import { APP_TAGLINE, SUPPORTED_CURRENCIES, USAGE_UNITS, USAGE_PERIODS, LIFETIME_UNITS } from '../config/app.js';
import { calculateProduct } from '../core/calculator.js';
import { saveCalculation } from '../storage/local-storage.js';
import { money, number, escapeHtml } from '../ui/helpers.js';
import { layout } from './layout.js';

function optionList(items, selected) {
  return items.map((x) => `<option value="${x}" ${x === selected ? 'selected' : ''}>${x}</option>`).join('');
}

function defaultsFromUrl() {
  const p = new URLSearchParams(location.search);
  return {
    name: p.get('name') || '', currency: p.get('currency') || 'EUR', price: p.get('price') || '',
    usageQuantity: p.get('usage') || 3, usageUnit: p.get('unit') || 'times', usagePeriod: p.get('period') || 'week',
    lifetimeValue: p.get('life') || 4, lifetimeUnit: p.get('lifeUnit') || 'years', maintenancePerYear: p.get('maint') || 0,
    consumablePerUse: p.get('cons') || 0, resaleValue: p.get('resale') || 0, targetCostPerUse: p.get('target') || 1,
  };
}

export function renderHome(root) {
  const d = defaultsFromUrl();
  root.innerHTML = layout(`
    <section class="hero">
      <p class="eyebrow">IS IT WORTH IT?</p>
      <h1>${APP_TAGLINE}</h1>
      <p class="muted">Enter the price, estimate how much you'll use it, and see the real cost per use.</p>
    </section>

    <section class="card calculator-card">
      <form id="calculator-form">
        <label>What are you buying?<input name="name" placeholder="e.g. Dyson Airwrap" value="${escapeHtml(d.name)}"></label>
        <div class="grid-2">
          <label>Price<div class="input-row"><select name="currency">${optionList(SUPPORTED_CURRENCIES, d.currency)}</select><input name="price" type="number" min="0" step="0.01" value="${d.price}" required></div></label>
          <label>How long will you keep it?<div class="input-row"><input name="lifetimeValue" type="number" min="0.1" step="0.1" value="${d.lifetimeValue}" required><select name="lifetimeUnit">${optionList(LIFETIME_UNITS, d.lifetimeUnit)}</select></div></label>
        </div>
        <label>How much will you use it?<div class="input-row triple"><input name="usageQuantity" type="number" min="0.01" step="0.01" value="${d.usageQuantity}" required><select name="usageUnit">${optionList(USAGE_UNITS, d.usageUnit)}</select><select name="usagePeriod">${optionList(USAGE_PERIODS, d.usagePeriod)}</select></div></label>
        <details class="advanced"><summary>Advanced calculation</summary>
          <div class="grid-2">
            <label>Maintenance per year<input name="maintenancePerYear" type="number" min="0" step="0.01" value="${d.maintenancePerYear}"></label>
            <label>Consumables per use<input name="consumablePerUse" type="number" min="0" step="0.01" value="${d.consumablePerUse}"></label>
            <label>Expected resale value<input name="resaleValue" type="number" min="0" step="0.01" value="${d.resaleValue}"></label>
            <label>Target cost per use<input name="targetCostPerUse" type="number" min="0.01" step="0.01" value="${d.targetCostPerUse}"></label>
          </div>
        </details>
        <button class="primary" type="submit">Calculate</button>
      </form>
    </section>
    <section id="results"></section>
  `, 'calculator');

  const form = root.querySelector('#calculator-form');
  const results = root.querySelector('#results');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fd = new FormData(form);
    const input = Object.fromEntries(fd.entries());
    const calc = calculateProduct(input);
    saveCalculation(calc);
    renderResult(results, calc);
  });
}

function renderResult(target, r) {
  const unitLabel = r.usageUnit === 'times' ? 'use' : r.usageUnit.replace(/s$/, '');
  target.innerHTML = `
    <section class="result-card card">
      <p class="eyebrow">${escapeHtml(r.name || 'YOUR RESULT')}</p>
      <div class="hero-number">${money(r.realCostPerUse, r.currency)}</div>
      <div class="hero-label">per ${unitLabel}</div>
      <div class="metrics">
        <div><strong>${money(r.price, r.currency)}</strong><span>Purchase price</span></div>
        <div><strong>${number(r.totalUses)}</strong><span>Estimated ${r.usageUnit}</span></div>
        <div><strong>${money(r.netCost, r.currency)}</strong><span>Estimated net cost</span></div>
      </div>
      <div class="scenario-grid">
        <div><span>Half the usage</span><strong>${money(r.scenarios.half, r.currency)}</strong></div>
        <div><span>Expected usage</span><strong>${money(r.scenarios.expected, r.currency)}</strong></div>
        <div><span>Double the usage</span><strong>${money(r.scenarios.double, r.currency)}</strong></div>
      </div>
      <div class="break-even">
        <h3>To reach ${money(r.targetCostPerUse, r.currency)} per ${unitLabel}</h3>
        <p>You need about <strong>${number(r.requiredUses)}</strong> ${r.usageUnit}, or <strong>${number(r.requiredPerWeek, 1)}</strong> per week over the selected lifetime.</p>
      </div>
      <div class="actions"><button id="share" class="secondary">Share</button><a class="secondary link-btn" href="#/compare">Compare</a></div>
    </section>`;

  target.querySelector('#share').addEventListener('click', async () => {
    const params = new URLSearchParams({
      name: r.name || '', currency: r.currency, price: r.price, usage: r.usageQuantity, unit: r.usageUnit,
      period: r.usagePeriod, life: r.lifetimeValue, lifeUnit: r.lifetimeUnit, maint: r.maintenancePerYear || 0,
      cons: r.consumablePerUse || 0, resale: r.resaleValue || 0, target: r.targetCostPerUse || 1,
    });
    const url = `${location.origin}${location.pathname}?${params.toString()}#/`;
    if (navigator.share) await navigator.share({ title: 'PricePerUse calculation', url });
    else {
      await navigator.clipboard.writeText(url);
      alert('Share link copied to clipboard.');
    }
  });
}
