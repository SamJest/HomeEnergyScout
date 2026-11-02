import fs from 'node:fs';
import path from 'node:path';
import {
  costFor,
  escapeHtml,
  formatMoney,
  formatVatTreatment,
  mergePageConfig,
  readContentData,
  root,
  targetFileForPath
} from './lib/content-data.mjs';

const { energyRates, calculatorDefaults, pages } = readContentData();
const rate = energyRates.currentPeriod.electricityUnitRatePence;
const gasRate = energyRates.currentPeriod.gasUnitRatePence;
const source = energyRates.currentPeriod;
const generatedPages = pages.filter((page) => page.template);

function pageConfigFor(page) {
  return mergePageConfig({
    title: page.title,
    description: page.description,
    path: page.path,
    canonical: page.path,
    navKey: page.navKey,
    breadcrumbs: page.breadcrumbs,
    pageType: page.pageType,
    calculatorKey: page.calculatorKey
  }, page, energyRates, calculatorDefaults);
}

function layout(page, body) {
  const config = pageConfigFor(page);
  return `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <script>window.pageConfig = ${JSON.stringify(config)};</script>
  <script defer src="/assets/js/site.js"></script>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div id="site-header"></div>
  <div id="breadcrumbs"></div>
${body}
  <div id="site-footer"></div>
</body>
</html>
`.replace(/[ \t]+$/gm, '');
}

function sourceNote() {
  return `<p class="source-note">${source.electricityUnitRatePence}p/kWh electricity (${formatVatTreatment(source.electricityVat)}), ${source.gasUnitRatePence}p/kWh gas (${formatVatTreatment(source.gasVat)}): ${escapeHtml(source.label)}. ${escapeHtml(source.paymentMethod)} national averages for England, Scotland and Wales, not Northern Ireland. Checked ${source.checkedOn}. Your supplier, region, payment method and meter type affect your tariff. Energy-only costs exclude standing charges.</p>`;
}

function sourcePanel() {
  return `<aside class="source-panel">
    <h2>Sources and assumptions</h2>
    <ul class="compact-list">
      <li><a href="${source.sourceUrl}" data-track-link>${escapeHtml(source.sourceName)}</a>: ${escapeHtml(source.label)}.</li>
      <li>Electricity rate used in tables and default calculators: ${source.electricityUnitRatePence}p/kWh.</li>
      <li>Standing charges are not added to appliance-only examples because you usually pay them whether or not this heater is used.</li>
      <li>Figures are estimates, not supplier quotes or installer advice.</li>
      <li>Checked ${source.checkedOn}. Electricity: ${formatVatTreatment(source.electricityVat)}; gas: ${formatVatTreatment(source.gasVat)}. GB averages do not cover Northern Ireland.</li>
      <li>Standing charges: electricity ${source.electricityStandingChargePencePerDay}p/day; gas ${source.gasStandingChargePencePerDay}p/day, excluded here.</li>
      <li>Gas unit price is not delivered-heat cost: divide by boiler seasonal efficiency. Heat pumps use a different efficiency model. Equal expenditure does not imply equal comfort.</li>
    </ul>
  </aside>`;
}

function cost(watts, hours = 1, days = 1, dutyCycle = 100) {
  return costFor({ watts, hours, days, dutyCycle, ratePence: rate });
}

function costTable({ caption, hoursPerDay = 4, days = 30, includeDuty = true }) {
  const watts = [400, 500, 1000, 1500, 2000, 2500];
  return `<div class="table-wrap cost-table-wrap">
    <table class="comparison-table">
      <caption>${escapeHtml(caption)} — ${escapeHtml(source.label)}, energy only</caption>
      <thead>
        <tr>
          <th>Heater size</th>
          <th>Cost per hour</th>
          <th>${hoursPerDay} hours</th>
          <th>7 days at ${hoursPerDay}h/day</th>
          <th>30 days at ${hoursPerDay}h/day</th>
          ${includeDuty ? '<th>30 days at illustrative 65% output</th>' : ''}
        </tr>
      </thead>
      <tbody>
        ${watts.map((watt) => `<tr>
          <td data-label="Heater size">${watt >= 1000 ? `${watt / 1000}kW` : `${watt}W`}</td>
          <td data-label="Per hour">${formatMoney(cost(watt))}</td>
          <td data-label="${hoursPerDay} hours">${formatMoney(cost(watt, hoursPerDay))}</td>
          <td data-label="7 days at ${hoursPerDay}h/day">${formatMoney(cost(watt, hoursPerDay, 7))}</td>
          <td data-label="30 days at ${hoursPerDay}h/day">${formatMoney(cost(watt, hoursPerDay, days))}</td>
          ${includeDuty ? `<td data-label="30 days at illustrative 65%">${formatMoney(cost(watt, hoursPerDay, days, 65))}</td>` : ''}
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`;
}

function faq(page) {
  if (!page.faq?.length) return '';
  return `<section class="page-section" id="faq">
    <div class="container">
      <div class="section-head">
        <div>
          <h2>Frequently asked questions</h2>
          <p>Short answers to the questions this page is built to solve.</p>
        </div>
      </div>
      <div class="faq-grid">
        ${page.faq.map((item) => `<details class="faq-item card" data-question="${escapeHtml(item.question)}">
          <summary>${escapeHtml(item.question)}</summary>
          <div class="faq-body"><p>${escapeHtml(item.answer)}</p></div>
        </details>`).join('')}
      </div>
    </div>
  </section>`;
}

function related(page) {
  return `<section class="page-section" id="related">
    <div class="container aside-layout">
      <div>
        <div class="section-head">
          <div>
            <h2>Best next clicks</h2>
            <p>Use these routes when the answer moves from cost into fit, comfort or a wider decision.</p>
          </div>
        </div>
        <div class="section-index">
          ${(page.relatedRoutes || []).map((route) => `<a href="${route.href}" data-track-link>
            <strong>${escapeHtml(route.title)}</strong>
            <span>${escapeHtml(route.text)}</span>
          </a>`).join('')}
        </div>
      </div>
      <aside>
        <div class="ad-slot" aria-label="Future advertising placement">
          <strong>Reserved layout zone</strong>
          <span>Kept below the main answer and calculator path so future display ads do not interrupt the calculation.</span>
        </div>
      </aside>
    </div>
  </section>`;
}

function flagshipPage(page) {
  const defaults = calculatorDefaults.calculators.heater;
  const twoKwHour = formatMoney(cost(2000));
  const twoKwFourHours = formatMoney(cost(2000, 4));
  const twoKwMonth = formatMoney(cost(2000, 4, 30));
  const twoKwMonthDuty = formatMoney(cost(2000, 4, 30, 65));

  return layout(page, `  <main id="main-content">
    <section class="page-hero">
      <div class="container">
        <div class="page-hero-panel">
          <span class="kicker">Running cost calculator</span>
          <h1>Electric heater running cost calculator</h1>
          <p class="lead">Work out what an electric heater costs per hour, per day, per week or per month in a UK home using current electricity assumptions and your own use pattern.</p>
          <div class="answer-summary answer-summary--strong">
            <strong>Quick answer</strong>
            <p>A 2kW electric heater costs about ${twoKwHour} per hour at full power using ${rate}p/kWh electricity. Four hours costs about ${twoKwFourHours}; four hours every day for 30 days costs about ${twoKwMonth} at full power, or about ${twoKwMonthDuty} with an illustrative 65% average output. Energy only; standing charges excluded.</p>
            ${sourceNote()}
          </div>
          <div class="page-meta">
            <span>Last reviewed: ${page.reviewedDate}</span>
            <span>UK-focused estimate</span>
            <span>Uses current Ofgem benchmark rate</span>
          </div>
          <div class="jump-links">
            <a href="#calculator">Calculator</a>
            <a href="#cost-table">Cost table</a>
            <a href="#exact-answers">Exact answers</a>
            <a href="#heater-types">Heater types</a>
            <a href="#sources">Sources</a>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section" id="calculator">
      <div class="container calculator-stack">
        <article class="form-panel">
          <h2>Enter your heater details</h2>
          <p class="form-intro">Use this when the table is too blunt. The duty-cycle input lets you model a thermostat-controlled heater that does not stay at full power all evening.</p>
          <div class="form-tip"><strong>What duty cycle means</strong><p>100% means full power throughout. 65% is an illustration, not a measured default for all heaters. Start at 100% when unknown.</p></div>
          <form data-calculator="heater" data-results-target="heater-results" novalidate>
            <fieldset class="form-section">
              <legend>Heater and room use</legend>
              <div class="preset-row" role="group" aria-label="Wattage presets">${[400,500,1000,1500,2000].map(w => `<button type="button" class="button-secondary" data-preset-field="watts" data-preset-value="${w}">${w}W</button>`).join('')}<button type="button" class="button-secondary" data-preset-field="watts">Custom wattage</button></div>
              <div class="preset-row" role="group" aria-label="Daily runtime presets">${[1,2,4,8].map(h => `<button type="button" class="button-secondary" data-preset-field="hoursPerDay" data-preset-value="${h}">${h}h/day</button>`).join('')}</div>
              <div class="form-grid">
                <div class="field"><label for="heaterType">Heater type</label><select id="heaterType" name="heaterType"><option>Fan heater</option><option>Oil-filled radiator</option><option>Panel heater</option><option>Infrared heater</option><option>Other electric heater</option></select></div>
                <div class="field"><label for="watts">Power rating (watts)</label><input id="watts" name="watts" type="number" inputmode="decimal" min="1" max="100000" step="1" value="${defaults.watts}"></div>
                <div class="field"><label for="hoursPerDay">Hours used per day</label><input id="hoursPerDay" name="hoursPerDay" type="number" inputmode="decimal" min="0.01" max="24" step="0.5" value="${defaults.hoursPerDay}"></div>
                <div class="field"><label for="daysPerWeek">Days used per week</label><input id="daysPerWeek" name="daysPerWeek" type="number" min="1" max="7" step="1" value="${defaults.daysPerWeek}"></div>
                <div class="field"><label for="dutyCycle">Average output while in use (%)</label><input id="dutyCycle" name="dutyCycle" type="number" min="1" max="100" step="1" value="${defaults.dutyCycle}"></div>
                <div class="field"><label for="tariffPence">Electricity rate (p/kWh)</label><input id="tariffPence" name="tariffPence" type="number" min="1" step="0.01" value="${defaults.tariffPence}"></div>
              </div>
            </fieldset>
            <div class="button-row"><button class="button" type="submit">Calculate running cost</button><button class="button-secondary" type="reset">Reset</button></div>
          </form>
        </article>
        <aside id="heater-results" class="result-panel" data-state="idle">
          <span class="result-banner">Estimate ready</span>
          <h2>Your result</h2>
          <p class="result-lead">Enter your details and calculate to see the estimated heater cost, yearly impact and practical interpretation.</p>
          <p class="result-helper">The default electricity rate is ${rate}p/kWh from the current Ofgem benchmark. Replace it with your actual tariff if you know it.</p>
        </aside>
      </div>
    </section>

    <section class="page-section" id="cost-table">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>Electric heater running cost table</h2>
            <p>Use this as the fast full-power benchmark before adjusting for thermostat cycling, room size or your own tariff.</p>
          </div>
        </div>
        ${costTable({ caption: `Electric heater costs at ${rate}p/kWh electricity`, hoursPerDay: 4 })}
        ${sourceNote()}
      </div>
    </section>

    <section class="page-section" id="exact-answers">
      <div class="container page-grid">
        <div>
          <div class="section-head">
            <div>
              <h2>Common wattage and runtime questions</h2>
              <p>Full-power energy costs using the dated benchmark above.</p>
            </div>
          </div>
          <div class="tool-highlight-grid">
            <article class="tool-highlight"><strong>400W or 500W for one hour?</strong><p>400W: ${formatMoney(cost(400))}; 500W: ${formatMoney(cost(500))}. Lower power may provide less heat.</p></article>
            <article class="tool-highlight"><strong>2kW for 2, 8 or 24 hours?</strong><p>2 hours: ${formatMoney(cost(2000,2))}; 8 hours: ${formatMoney(cost(2000,8))}; 24 hours: ${formatMoney(cost(2000,24))}. The 24-hour figure is arithmetic, not a recommendation to leave a portable heater unattended.</p></article>
            <article class="tool-highlight"><strong>How much does a 2kW heater cost per hour?</strong><p>About ${twoKwHour} per hour at full power with ${rate}p/kWh electricity.</p></article>
            <article class="tool-highlight"><strong>How much does a 2kW heater cost for four hours?</strong><p>About ${twoKwFourHours} at full power, before any thermostat cycling is allowed for.</p></article>
            <article class="tool-highlight"><strong>How much does electric heating cost per month?</strong><p>A 2kW heater used four hours daily costs about ${twoKwMonth} over 30 days at full power.</p></article>
            <article class="tool-highlight"><strong>Is electric heating expensive?</strong><p>It can be for regular room or whole-home heat because electricity costs ${rate}p/kWh versus ${gasRate}p/kWh gas on the current benchmark.</p></article>
          </div>
        </div>
        <aside class="assumption-panel"><h2>What changes the cost?</h2><p>The rate, wattage, hours and actual thermostat runtime determine electricity use. 65% is an illustration only. See the dated source section below.</p></aside>
      </div>
    </section>

    <section class="page-section" id="heater-types">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>Electric heater running cost by type</h2>
            <p>At the same wattage and runtime, direct electric heaters cost the same per kWh. The practical difference is how they feel and how long they stay near full output.</p>
          </div>
        </div>
        <div class="table-wrap">
          <table class="comparison-table">
            <caption>Common heater-type cost logic</caption>
            <thead><tr><th>Heater type</th><th>Typical cost angle</th><th>Best fit</th><th>Useful next page</th></tr></thead>
            <tbody>
              <tr><td>Fan heater</td><td>Fast heat, often 2kW, about ${twoKwHour}/hour at full power.</td><td>Short bursts and quick warm-up.</td><td><a href="/running-costs/fan-heater-running-cost/" data-track-link>Fan heater running cost</a></td></tr>
              <tr><td>Oil-filled radiator</td><td>Same kWh logic, but steadier heat and thermostat cycling can change real use.</td><td>Longer room sessions where comfort matters.</td><td><a href="/running-costs/oil-filled-radiator-running-cost/" data-track-link>Oil-filled radiator running cost</a></td></tr>
              <tr><td>Panel heater</td><td>Simple direct electric heat; controls and schedule matter.</td><td>Regular room heating with sensible timers.</td><td><a href="/running-costs/panel-heater-running-cost/" data-track-link>Panel heater running cost</a></td></tr>
              <tr><td>Infrared heater</td><td>Often lower wattage, but only cheaper if targeted heat solves the job.</td><td>Spot comfort rather than whole-room heating.</td><td><a href="/running-costs/infrared-heater-running-cost/" data-track-link>Infrared heater running cost</a></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="page-section" id="sources">
      <div class="container two-col">
        <article class="assumption-panel">
          <h2>Formula used</h2>
          <p><code>(watts / 1000) x hours used x electricity price per kWh x average output factor</code></p>
          <p>For example, a 2kW heater for four hours at full power uses 8kWh. At ${rate}p/kWh, that is ${twoKwFourHours}.</p>
        </article>
        ${sourcePanel()}
      </div>
    </section>
    ${faq(page)}
    ${related(page)}
  </main>`);
}

function guidePage(page) {
  const primaryHour = formatMoney(cost(page.primaryWatts));
  const sessionCost = formatMoney(cost(page.primaryWatts, page.defaultHours));
  const monthlyCost = formatMoney(cost(page.primaryWatts, page.defaultHours, 30));
  const dutyMonthly = formatMoney(cost(page.primaryWatts, page.defaultHours, 30, 65));
  const sizeLabel = page.primaryWatts >= 1000 ? `${page.primaryWatts / 1000}kW` : `${page.primaryWatts}W`;

  return layout(page, `  <main id="main-content">
    <section class="page-hero">
      <div class="container">
        <div class="page-hero-panel">
          <span class="kicker">${escapeHtml(page.kicker)}</span>
          <h1>${escapeHtml(page.h1)}</h1>
          <p class="lead">${escapeHtml(page.lead)}</p>
          <div class="answer-summary answer-summary--strong">
            <strong>Quick answer</strong>
            <p>${escapeHtml(page.summary)}</p>
          </div>
          <div class="page-meta">
            <span>Last reviewed: ${page.reviewedDate}</span>
            <span>UK-focused estimate</span>
            <span>Uses current Ofgem benchmark rate</span>
          </div>
          <div class="jump-links">
            <a href="#answer">Answer</a>
            <a href="#cost-table">Cost table</a>
            <a href="#formula">Formula</a>
            <a href="#related">Related pages</a>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section" id="answer">
      <div class="container two-col">
        <article class="quick-answer">
          <h2>The practical answer</h2>
          <p>${escapeHtml(page.angle)}</p>
          ${page.path.includes('2kw-heater-cost-per-hour') ? `<h2>2kW at full power: 1 to 24 hours</h2><ul>${[1,2,4,8,24].map(h => `<li>${h} ${h === 1 ? 'hour' : 'hours'}: ${formatMoney(cost(2000,h))} (${2*h}kWh)</li>`).join('')}</ul><p>24 hours is a mathematical upper-use example, not advice to leave a portable heater unattended. Follow the appliance instructions. <a href="/running-costs/electric-heater-running-cost/#calculator">Adjust wattage, hours and tariff in the calculator</a>.</p>` : ''}
          ${page.path.includes('electric-heating-cost-per-month') ? `<h2>Budget for your schedule and heater count</h2><p>The figures below model one heater, not a whole home. At 2kW for 4 hours every day, one heater uses 240kWh in 30 days (${formatMoney(cost(2000,4,30))}); two identical heaters use 480kWh (${formatMoney(cost(2000,4,30)*2)}). Add each heater separately if ratings or schedules differ.</p><p>For five days per week, a 30-day estimate uses 30/7 weeks: ${formatMoney(cost(2000,4,30)*5/7)} for one heater. Calendar months and holidays differ. Standing charges and other household appliances are additional. <a href="/running-costs/electric-heater-running-cost/#calculator">Use the calculator for a weekly schedule</a>.</p>` : ''}
          <div class="kpi-strip">
            <div class="kpi-chip"><strong>${primaryHour}</strong><span>${sizeLabel} per hour</span></div>
            <div class="kpi-chip"><strong>${sessionCost}</strong><span>${page.defaultHours} hours at full power</span></div>
            <div class="kpi-chip"><strong>${monthlyCost}</strong><span>30 days at ${page.defaultHours}h/day</span></div>
          </div>
          ${sourceNote()}
        </article>
        ${sourcePanel()}
      </div>
    </section>

    <section class="page-section" id="cost-table">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>Running cost table</h2>
            <p>The full-power column is the benchmark. The 65% column is an illustration, not a prediction of thermostat behaviour. Actual output depends on heat loss, settings and weather.</p>
          </div>
        </div>
        ${costTable({ caption: `Electric heating examples at ${rate}p/kWh`, hoursPerDay: page.defaultHours })}
      </div>
    </section>

    <section class="page-section" id="formula">
      <div class="container two-col">
        <article class="assumption-panel">
          <h2>Formula used</h2>
          <p><code>(watts / 1000) x hours x electricity price per kWh</code></p>
          <p>For this page's ${sizeLabel} example, ${page.defaultHours} hours at full output costs ${sessionCost}. Used the same way for 30 days, it costs ${monthlyCost}; at 65% average output it is closer to ${dutyMonthly}.</p>
        </article>
        <article class="example-panel">
          <h2>How to use the result</h2>
          <ul class="compact-list">
            <li>Use your own tariff if it differs from ${rate}p/kWh.</li>
            <li>For thermostat-controlled heaters, compare full power with a lower average-output scenario.</li>
            <li>If the cost looks high, check room size and insulation before assuming a different heater type solves it.</li>
          </ul>
        </article>
      </div>
    </section>
    ${faq(page)}
    ${related(page)}
  </main>`);
}

for (const page of generatedPages) {
  const html = page.template === 'electric-heater-flagship' ? flagshipPage(page) : guidePage(page);
  const targetFile = targetFileForPath(page.path);
  fs.mkdirSync(path.dirname(targetFile), { recursive: true });
  fs.writeFileSync(targetFile, html, 'utf8');
  console.log(`Generated ${path.relative(root, targetFile)}`);
}
