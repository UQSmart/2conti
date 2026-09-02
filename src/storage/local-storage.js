import { HISTORY_LIMIT } from '../config/app.js';

const KEY = 'ppu-history-v1';

export function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveCalculation(calculation) {
  const history = getHistory();
  const item = { ...calculation, savedAt: new Date().toISOString() };
  const next = [item, ...history].slice(0, HISTORY_LIMIT);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}
