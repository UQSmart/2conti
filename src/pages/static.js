import { APP_NAME } from '../config/app.js';
import { layout } from './layout.js';

export function renderHow(root) {
  root.innerHTML = layout(`
    <section class="hero"><p class="eyebrow">HOW IT WORKS</p><h1>Four inputs. One useful number.</h1></section>
    <section class="card prose">
      <ol><li>Enter the purchase price.</li><li>Estimate how often you'll use it.</li><li>Estimate how long you'll keep it.</li><li>See the real cost per use.</li></ol>
      <h2>Advanced formula</h2><p><strong>Net cost = purchase price + maintenance + consumables − resale value.</strong></p>
      <p>Cost per use is then the net cost divided by the estimated total number of uses.</p>
    </section>
  `, 'how');
}

export function renderAbout(root) {
  root.innerHTML = layout(`
    <section class="hero"><p class="eyebrow">ABOUT</p><h1>${APP_NAME}</h1></section>
    <section class="card prose"><p>${APP_NAME} is a lightweight purchase decision calculator.</p><h2>Privacy</h2><p>Calculations are performed locally in your browser. Recent calculation history is stored only on your device using localStorage. The current version has no user account, backend database or analytics service.</p></section>
  `);
}
