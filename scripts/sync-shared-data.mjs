import fs from 'node:fs';
import path from 'node:path';
import { readContentData, root, costFor, formatMoney } from './lib/content-data.mjs';

const { calculatorDefaults, energyRates } = readContentData();
const source = energyRates.currentPeriod;
const sharedTariff = calculatorDefaults.defaultElectricityRatePence;

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith(".") || ["node_modules", "test-results", "playwright-report", "docs", "tests", "codex-growth-pack"].includes(entry.name)) continue;
      walk(full, acc);
    } else if (entry.isFile() && /\.html$/i.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

let updated = 0;

for (const file of walk(root)) {
  let text = fs.readFileSync(file, 'utf8');
  const original = text;
  text = text.replace(
    /(<input\b(?=[^>]*\bname="tariffPence")[^>]*\bvalue=")([^"]+)(")/g,
    `$1${sharedTariff}$3`
  );
  text = text.replace(/<p data-rate-example="microwave">[\s\S]*?<\/p>/,
    `<p data-rate-example="microwave">Illustrative wall-input power: 800W for 10 minutes uses ${(800/1000*10/60).toFixed(3)}kWh. At ${sharedTariff}p/kWh (${source.label}, checked ${source.checkedOn}) that costs ${formatMoney(costFor({watts:800,hours:10/60,ratePence:sharedTariff}))} per use, excluding standing charges. Use input power from the rating plate, not the microwave cooking-output rating.</p>`);
  if (text.includes('data-calculator=') || file.endsWith(path.join('methodology','index.html'))) {
    const note = `<!-- tariff-note:start --><section class="page-section"><div class="container source-panel"><h2>Tariff benchmark and calculation scope</h2><p>Checked ${source.checkedOn}: <a href="${source.sourceUrl}" data-track-link>${source.label}</a>. ${source.paymentMethod} national averages for England, Scotland and Wales, not Northern Ireland. Electricity ${sharedTariff}p/kWh and ${source.electricityStandingChargePencePerDay}p/day standing charge, zero-rated for VAT; gas ${source.gasUnitRatePence}p/kWh and ${source.gasStandingChargePencePerDay}p/day standing charge, includes 5% VAT.</p><p>Enter your own unit rate: supplier, region, meter and payment method affect prices. Running costs and savings show energy only; standing charges are additional to a full household bill and usually remain payable regardless of appliance use. Average-output factors are scenarios, not measured thermostat behaviour. For delivered gas heat, divide the fuel rate by boiler seasonal efficiency. Different heating and drying methods may provide different comfort or outcomes.</p></div></section><!-- tariff-note:end -->`;
    text = text.includes('<!-- tariff-note:start -->') ? text.replace(/<!-- tariff-note:start -->[\s\S]*?<!-- tariff-note:end -->/,note) : text.replace('</main>',`${note}\n</main>`);
  }
  if (text !== original) {
    fs.writeFileSync(file, text, 'utf8');
    updated += 1;
  }
}

console.log(`Synced shared electricity tariff default (${sharedTariff}p/kWh) across ${updated} HTML files.`);
