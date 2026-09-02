import './styles/main.css';
import { renderHome } from './pages/home.js';
import { renderCompare } from './pages/compare.js';
import { renderHistory } from './pages/history.js';
import { renderHow, renderAbout } from './pages/static.js';

const root = document.querySelector('#app');

function route() {
  const path = location.hash.replace(/^#/, '') || '/';
  if (path === '/compare') return renderCompare(root);
  if (path === '/history') return renderHistory(root);
  if (path === '/how-it-works') return renderHow(root);
  if (path === '/about') return renderAbout(root);
  return renderHome(root);
}

window.addEventListener('hashchange', route);
route();
