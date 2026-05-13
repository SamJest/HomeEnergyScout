import fs from 'node:fs';
import path from 'node:path';
import { readContentData, root } from './lib/content-data.mjs';

const { calculatorDefaults } = readContentData();
const sharedTariff = calculatorDefaults.defaultElectricityRatePence;

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
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
  if (text !== original) {
    fs.writeFileSync(file, text, 'utf8');
    updated += 1;
  }
}

console.log(`Synced shared electricity tariff default (${sharedTariff}p/kWh) across ${updated} HTML files.`);
