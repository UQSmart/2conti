import { CURRENCY_SYMBOLS } from '../config/app.js';

export function money(value, currency = 'EUR', digits = 2) {
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  const n = Number(value) || 0;
  return `${symbol}${n.toFixed(digits)}`;
}

export function number(value, digits = 0) {
  return (Number(value) || 0).toFixed(digits);
}

export function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
