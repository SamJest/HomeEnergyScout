import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { readContentData, costFor, formatMoney } from './lib/content-data.mjs';

export function rateIssues(period, today = new Date().toISOString().slice(0,10)) {
  const issues = [];
  for (const key of ['validFrom','validTo','reviewDue','checkedOn']) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(period[key] || '') || !Number.isFinite(Date.parse(period[key]))) issues.push(`Invalid ${key}`);
  }
  if (today < period.validFrom || today > period.validTo || today > period.reviewDue) issues.push('Tariff is outside validity/review deadline');
  if (period.checkedOn > today || period.validFrom > period.validTo) issues.push('Invalid tariff chronology');
  for (const key of ['electricityUnitRatePence','gasUnitRatePence','electricityStandingChargePencePerDay','gasStandingChargePencePerDay'])
    if (!Number.isFinite(period[key]) || period[key] <= 0) issues.push(`Invalid ${key}`);
  if (!period.electricityVat || !period.gasVat || 'vatIncluded' in period) issues.push('Fuel-specific VAT required');
  return issues;
}
export function staleIssues(text) {
  return /24\.67|5\.74|57\.21|29\.09|ofgem-price-cap-2026-q2|1 April to 30 June 2026|\{\{(?:rate|cost):?/.test(text) ? ['Stale/unresolved tariff content'] : [];
}
export function htmlFiles(dir = '.') {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e => {
    if (e.name.startsWith('.') || ['node_modules','test-results','playwright-report','docs','tests'].includes(e.name)) return [];
    const full = path.join(dir,e.name);
    return e.isDirectory() ? htmlFiles(full) : e.name.endsWith('.html') ? [full] : [];
  });
}
export function audit() {
  const { energyRates } = readContentData();
  const rate = energyRates.currentPeriod;
  const issues = rateIssues(rate).map(message=>({priority:'P0',file:'data/energy-rates.json',message}));
  const seen = { title:new Set(), description:new Set(), canonical:new Set() };
  const sitemap = fs.readFileSync('sitemap.xml','utf8');
  for (const file of htmlFiles()) {
    const text = fs.readFileSync(file,'utf8');
    const add = (message,priority='P1') => issues.push({priority,file,message});
    staleIssues(text).forEach(x=>add(x,'P0'));
    for (const [key,re] of Object.entries({title:/<title>(.*?)<\/title>/s,description:/<meta name="description" content="([^"]+)"/,canonical:/<link rel="canonical" href="([^"]+)"/})) {
      const value = text.match(re)?.[1];
      if (!value || seen[key].has(value)) add(`Missing/duplicate ${key}`);
      seen[key].add(value);
    }
    if ((text.match(/<h1\b/g)||[]).length !== 1) add('Expected one H1');
    const canonical = text.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const expected = 'https://www.homeenergyscout.co.uk/' + (file === 'index.html' ? '' : file.replaceAll('\\','/').replace(/index\.html$/,''));
    if(canonical!==expected && file!=='404.html') add('Canonical differs from route','P0');
    if(file!=='404.html' && (!sitemap.includes(`<loc>${expected}</loc>`) || /<meta name="robots" content="[^"]*noindex/.test(text))) add('Sitemap/indexability conflict','P0');
    const configText = text.match(/window\.pageConfig\s*=\s*(\{[\s\S]*?\});?\s*<\/script>/)?.[1];
    if(configText) {
      const config = vm.runInNewContext('('+configText+')');
      if(config.energyRates?.currentPeriod?.id !== rate.id) add('Embedded period mismatch','P0');
    }
    // Validate every generated numeric table cell against raw formula inputs.
    for(const table of text.matchAll(/<table class="comparison-table">([\s\S]*?)<\/table>/g)) {
      if(!table[1].includes('Cost per hour')) continue;
      const hours = +(table[1].match(/<th>([\d.]+) hours<\/th>/)?.[1] || 4);
      for(const row of table[1].matchAll(/<tr>\s*<td\b[^>]*>([\d.]+)(kW|W)<\/td>([\s\S]*?)<\/tr>/g)) {
        const watts = +row[1]*(row[2]==='kW'?1000:1);
        const actual = [...row[3].matchAll(/<td\b[^>]*>(.*?)<\/td>/g)].map(x=>x[1]);
        const expectedCells = [[1,1,100],[hours,1,100],[hours,7,100],[hours,30,100],[hours,30,65]].slice(0,actual.length).map(([h,d,duty])=>formatMoney(costFor({watts,hours:h,days:d,dutyCycle:duty,ratePence:rate.electricityUnitRatePence})));
        if(JSON.stringify(actual)!==JSON.stringify(expectedCells)) add(`Cost table mismatch for ${watts}W`,'P0');
      }
    }
  }
  return { checkedOn: new Date().toISOString().slice(0,10), routes:htmlFiles().length-1, issues };
}
if(process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report=audit(); console.log(JSON.stringify(report,null,2));
  if(report.issues.length) process.exitCode=1;
}
