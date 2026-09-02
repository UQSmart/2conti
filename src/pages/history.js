import { getHistory, clearHistory } from '../storage/local-storage.js';
import { money, escapeHtml } from '../ui/helpers.js';
import { layout } from './layout.js';

export function renderHistory(root) {
  const history = getHistory();
  root.innerHTML = layout(`
    <section class="hero"><p class="eyebrow">HISTORY</p><h1>Recent calculations</h1><p class="muted">Stored only in this browser.</p></section>
    <section class="card">
      ${history.length ? `<div class="history-list">${history.map((h,i)=>`<article class="history-item"><div><strong>${escapeHtml(h.name || 'Unnamed purchase')}</strong><span>${new Date(h.savedAt).toLocaleString()}</span></div><div class="history-value">${money(h.realCostPerUse,h.currency)}/use</div></article>`).join('')}</div><button id="clear-history" class="secondary danger">Clear history</button>` : '<p class="muted">No calculations saved yet.</p>'}
    </section>
  `, 'history');
  root.querySelector('#clear-history')?.addEventListener('click', () => { clearHistory(); renderHistory(root); });
}
