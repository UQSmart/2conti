(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=a(n);fetch(n.href,r)}})();const h="PricePerUse",A="Understand what your purchase really costs you.",L=20,P=["EUR","USD","GBP"],N={EUR:"€",USD:"$",GBP:"£"},R=["times","hours","days","km"],q=["day","week","month","year"],O=["months","years"],_={day:365,week:52,month:12,year:1};function g(t,e){const a=Number(t)||0;return e==="months"?a/12:a}function H(t,e){return(Number(t)||0)*(_[e]??0)}function I(t,e,a,s){return H(t,e)*g(a,s)}function M(t,e,a){return(Number(t)||0)*g(e,a)}function k(t,e){return(Number(t)||0)*e}function Y({price:t,maintenancePerYear:e,consumablePerUse:a,resaleValue:s,totalUses:n,lifetimeValue:r,lifetimeUnit:c}){const i=Number(t)||0,S=M(e,r,c),E=k(a,n),T=Number(s)||0;return i+S+E-T}function d(t,e){return!e||e<=0?0:t/e}function D(t,e){const a=Number(e)||0;return a<=0?0:t/a}function V(t,e,a){const s=g(e,a);return s<=0?0:t/(s*52)}function b(t){const e=I(t.usageQuantity,t.usagePeriod,t.lifetimeValue,t.lifetimeUnit),a=d(Number(t.price)||0,e),s=Y({...t,totalUses:e}),n=d(s,e),r=Number(t.targetCostPerUse)||1,c=D(s,r),i=V(c,t.lifetimeValue,t.lifetimeUnit);return{...t,totalUses:e,purchaseCostPerUse:a,netCost:s,realCostPerUse:n,targetCostPerUse:r,requiredUses:c,requiredPerWeek:i,scenarios:{half:d(s,e/2),expected:n,double:d(s,e*2)}}}const f="ppu-history-v1";function U(){try{return JSON.parse(localStorage.getItem(f)||"[]")}catch{return[]}}function F(t){const e=U(),s=[{...t,savedAt:new Date().toISOString()},...e].slice(0,L);return localStorage.setItem(f,JSON.stringify(s)),s}function W(){localStorage.removeItem(f)}function o(t,e="EUR",a=2){const s=N[e]||e,n=Number(t)||0;return`${s}${n.toFixed(a)}`}function u(t,e=0){return(Number(t)||0).toFixed(e)}function l(t=""){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function p(t,e="calculator"){return`
    <header class="site-header">
      <a class="brand" href="#/">${h}</a>
      <nav class="nav">
        <a class="${e==="calculator"?"active":""}" href="#/">Calculator</a>
        <a class="${e==="compare"?"active":""}" href="#/compare">Compare</a>
        <a class="${e==="history"?"active":""}" href="#/history">History</a>
        <a class="${e==="how"?"active":""}" href="#/how-it-works">How it works</a>
      </nav>
    </header>
    <main class="container">${t}</main>
    <footer class="footer"><span>${h}</span><a href="#/about">About & Privacy</a></footer>
  `}function y(t,e){return t.map(a=>`<option value="${a}" ${a===e?"selected":""}>${a}</option>`).join("")}function B(){const t=new URLSearchParams(location.search);return{name:t.get("name")||"",currency:t.get("currency")||"EUR",price:t.get("price")||"",usageQuantity:t.get("usage")||3,usageUnit:t.get("unit")||"times",usagePeriod:t.get("period")||"week",lifetimeValue:t.get("life")||4,lifetimeUnit:t.get("lifeUnit")||"years",maintenancePerYear:t.get("maint")||0,consumablePerUse:t.get("cons")||0,resaleValue:t.get("resale")||0,targetCostPerUse:t.get("target")||1}}function Q(t){const e=B();t.innerHTML=p(`
    <section class="hero">
      <p class="eyebrow">IS IT WORTH IT?</p>
      <h1>${A}</h1>
      <p class="muted">Enter the price, estimate how much you'll use it, and see the real cost per use.</p>
    </section>

    <section class="card calculator-card">
      <form id="calculator-form">
        <label>What are you buying?<input name="name" placeholder="e.g. Dyson Airwrap" value="${l(e.name)}"></label>
        <div class="grid-2">
          <label>Price<div class="input-row"><select name="currency">${y(P,e.currency)}</select><input name="price" type="number" min="0" step="0.01" value="${e.price}" required></div></label>
          <label>How long will you keep it?<div class="input-row"><input name="lifetimeValue" type="number" min="0.1" step="0.1" value="${e.lifetimeValue}" required><select name="lifetimeUnit">${y(O,e.lifetimeUnit)}</select></div></label>
        </div>
        <label>How much will you use it?<div class="input-row triple"><input name="usageQuantity" type="number" min="0.01" step="0.01" value="${e.usageQuantity}" required><select name="usageUnit">${y(R,e.usageUnit)}</select><select name="usagePeriod">${y(q,e.usagePeriod)}</select></div></label>
        <details class="advanced"><summary>Advanced calculation</summary>
          <div class="grid-2">
            <label>Maintenance per year<input name="maintenancePerYear" type="number" min="0" step="0.01" value="${e.maintenancePerYear}"></label>
            <label>Consumables per use<input name="consumablePerUse" type="number" min="0" step="0.01" value="${e.consumablePerUse}"></label>
            <label>Expected resale value<input name="resaleValue" type="number" min="0" step="0.01" value="${e.resaleValue}"></label>
            <label>Target cost per use<input name="targetCostPerUse" type="number" min="0.01" step="0.01" value="${e.targetCostPerUse}"></label>
          </div>
        </details>
        <button class="primary" type="submit">Calculate</button>
      </form>
    </section>
    <section id="results"></section>
  `,"calculator");const a=t.querySelector("#calculator-form"),s=t.querySelector("#results");a.addEventListener("submit",n=>{n.preventDefault();const r=new FormData(a),c=Object.fromEntries(r.entries()),i=b(c);F(i),G(s,i)})}function G(t,e){const a=e.usageUnit==="times"?"use":e.usageUnit.replace(/s$/,"");t.innerHTML=`
    <section class="result-card card">
      <p class="eyebrow">${l(e.name||"YOUR RESULT")}</p>
      <div class="hero-number">${o(e.realCostPerUse,e.currency)}</div>
      <div class="hero-label">per ${a}</div>
      <div class="metrics">
        <div><strong>${o(e.price,e.currency)}</strong><span>Purchase price</span></div>
        <div><strong>${u(e.totalUses)}</strong><span>Estimated ${e.usageUnit}</span></div>
        <div><strong>${o(e.netCost,e.currency)}</strong><span>Estimated net cost</span></div>
      </div>
      <div class="scenario-grid">
        <div><span>Half the usage</span><strong>${o(e.scenarios.half,e.currency)}</strong></div>
        <div><span>Expected usage</span><strong>${o(e.scenarios.expected,e.currency)}</strong></div>
        <div><span>Double the usage</span><strong>${o(e.scenarios.double,e.currency)}</strong></div>
      </div>
      <div class="break-even">
        <h3>To reach ${o(e.targetCostPerUse,e.currency)} per ${a}</h3>
        <p>You need about <strong>${u(e.requiredUses)}</strong> ${e.usageUnit}, or <strong>${u(e.requiredPerWeek,1)}</strong> per week over the selected lifetime.</p>
      </div>
      <div class="actions"><button id="share" class="secondary">Share</button><a class="secondary link-btn" href="#/compare">Compare</a></div>
    </section>`,t.querySelector("#share").addEventListener("click",async()=>{const s=new URLSearchParams({name:e.name||"",currency:e.currency,price:e.price,usage:e.usageQuantity,unit:e.usageUnit,period:e.usagePeriod,life:e.lifetimeValue,lifeUnit:e.lifetimeUnit,maint:e.maintenancePerYear||0,cons:e.consumablePerUse||0,resale:e.resaleValue||0,target:e.targetCostPerUse||1}),n=`${location.origin}${location.pathname}?${s.toString()}#/`;navigator.share?await navigator.share({title:"PricePerUse calculation",url:n}):(await navigator.clipboard.writeText(n),alert("Share link copied to clipboard."))})}function j(t,e){const a=b(t),s=b(e),n=a.realCostPerUse<=s.realCostPerUse?"A":"B",r=Math.max(a.realCostPerUse,s.realCostPerUse),c=Math.min(a.realCostPerUse,s.realCostPerUse),i=r>0?(r-c)/r*100:0;return{a,b:s,lower:n,differencePct:i}}function v(t){return`
    <div class="compare-product">
      <h2>Product ${t}</h2>
      <label>Name<input name="${t}_name" placeholder="Product ${t}"></label>
      <label>Currency<select name="${t}_currency">${P.map(e=>`<option>${e}</option>`).join("")}</select></label>
      <label>Price<input name="${t}_price" type="number" min="0" step="0.01" required></label>
      <label>Usage per week<input name="${t}_usageQuantity" type="number" min="0.01" step="0.01" value="3" required></label>
      <input type="hidden" name="${t}_usageUnit" value="times"><input type="hidden" name="${t}_usagePeriod" value="week">
      <label>Lifetime (years)<input name="${t}_lifetimeValue" type="number" min="0.1" step="0.1" value="4" required></label>
      <input type="hidden" name="${t}_lifetimeUnit" value="years">
      <details class="advanced"><summary>Advanced</summary>
        <label>Maintenance/year<input name="${t}_maintenancePerYear" type="number" min="0" step="0.01" value="0"></label>
        <label>Consumables/use<input name="${t}_consumablePerUse" type="number" min="0" step="0.01" value="0"></label>
        <label>Resale value<input name="${t}_resaleValue" type="number" min="0" step="0.01" value="0"></label>
      </details>
      <input type="hidden" name="${t}_targetCostPerUse" value="1">
    </div>`}function $(t,e){const a={};for(const[s,n]of t.entries())s.startsWith(`${e}_`)&&(a[s.slice(2)]=n);return a}function K(t){t.innerHTML=p(`
    <section class="hero"><p class="eyebrow">COMPARE</p><h1>Which option gives you more value?</h1></section>
    <section class="card"><form id="compare-form"><div class="compare-grid">${v("A")}${v("B")}</div><button class="primary" type="submit">Compare</button></form></section>
    <section id="comparison-result"></section>
  `,"compare"),t.querySelector("#compare-form").addEventListener("submit",e=>{e.preventDefault();const a=new FormData(e.currentTarget),s=j($(a,"A"),$(a,"B")),n=s.lower==="A"?s.a:s.b,r=s.lower==="A"?s.b:s.a;t.querySelector("#comparison-result").innerHTML=`
      <section class="card result-card">
        <h2>Comparison</h2>
        <div class="comparison-table">
          <div></div><strong>${l(s.a.name||"Product A")}</strong><strong>${l(s.b.name||"Product B")}</strong>
          <span>Purchase price</span><span>${o(s.a.price,s.a.currency)}</span><span>${o(s.b.price,s.b.currency)}</span>
          <span>Total uses</span><span>${u(s.a.totalUses)}</span><span>${u(s.b.totalUses)}</span>
          <span>Net cost</span><span>${o(s.a.netCost,s.a.currency)}</span><span>${o(s.b.netCost,s.b.currency)}</span>
          <span>Cost per use</span><span>${o(s.a.realCostPerUse,s.a.currency)}</span><span>${o(s.b.realCostPerUse,s.b.currency)}</span>
        </div>
        <div class="insight"><strong>${l(n.name||`Product ${s.lower}`)}</strong> has an estimated cost per use about <strong>${u(s.differencePct,1)}%</strong> lower than ${l(r.name||"the alternative")}.</div>
      </section>`})}function w(t){const e=U();t.innerHTML=p(`
    <section class="hero"><p class="eyebrow">HISTORY</p><h1>Recent calculations</h1><p class="muted">Stored only in this browser.</p></section>
    <section class="card">
      ${e.length?`<div class="history-list">${e.map((a,s)=>`<article class="history-item"><div><strong>${l(a.name||"Unnamed purchase")}</strong><span>${new Date(a.savedAt).toLocaleString()}</span></div><div class="history-value">${o(a.realCostPerUse,a.currency)}/use</div></article>`).join("")}</div><button id="clear-history" class="secondary danger">Clear history</button>`:'<p class="muted">No calculations saved yet.</p>'}
    </section>
  `,"history"),t.querySelector("#clear-history")?.addEventListener("click",()=>{W(),w(t)})}function J(t){t.innerHTML=p(`
    <section class="hero"><p class="eyebrow">HOW IT WORKS</p><h1>Four inputs. One useful number.</h1></section>
    <section class="card prose">
      <ol><li>Enter the purchase price.</li><li>Estimate how often you'll use it.</li><li>Estimate how long you'll keep it.</li><li>See the real cost per use.</li></ol>
      <h2>Advanced formula</h2><p><strong>Net cost = purchase price + maintenance + consumables − resale value.</strong></p>
      <p>Cost per use is then the net cost divided by the estimated total number of uses.</p>
    </section>
  `,"how")}function z(t){t.innerHTML=p(`
    <section class="hero"><p class="eyebrow">ABOUT</p><h1>${h}</h1></section>
    <section class="card prose"><p>${h} is a lightweight purchase decision calculator.</p><h2>Privacy</h2><p>Calculations are performed locally in your browser. Recent calculation history is stored only on your device using localStorage. The current version has no user account, backend database or analytics service.</p></section>
  `)}const m=document.querySelector("#app");function C(){const t=location.hash.replace(/^#/,"")||"/";return t==="/compare"?K(m):t==="/history"?w(m):t==="/how-it-works"?J(m):t==="/about"?z(m):Q(m)}window.addEventListener("hashchange",C);C();
