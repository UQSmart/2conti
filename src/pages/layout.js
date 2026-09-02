import { APP_NAME } from '../config/app.js';

export function layout(content, active = 'calculator') {
  return `
    <header class="site-header">
      <a class="brand" href="#/">${APP_NAME}</a>
      <nav class="nav">
        <a class="${active === 'calculator' ? 'active' : ''}" href="#/">Calculator</a>
        <a class="${active === 'compare' ? 'active' : ''}" href="#/compare">Compare</a>
        <a class="${active === 'history' ? 'active' : ''}" href="#/history">History</a>
        <a class="${active === 'how' ? 'active' : ''}" href="#/how-it-works">How it works</a>
      </nav>
    </header>
    <main class="container">${content}</main>
    <footer class="footer"><span>${APP_NAME}</span><a href="#/about">About & Privacy</a></footer>
  `;
}
