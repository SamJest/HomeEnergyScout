import fs from 'node:fs';
import path from 'node:path';

export const root = process.cwd();
export const baseUrl = 'https://www.homeenergyscout.co.uk';

export function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

export function readContentData() {
  const energyRates = readJson('data/energy-rates.json');
  const calculatorDefaults = readJson('data/calculator-defaults.json');
  const pageData = readJson('data/pages.json');
  const pages = pageData.pages || [];
  const pageByPath = new Map(pages.map((page) => [page.path, page]));
  return { energyRates, calculatorDefaults, pages, pageByPath };
}

export function ensureCanonical(input) {
  if (!input) return '/';
  let value = String(input).trim();
  if (!value.startsWith('/')) value = `/${value}`;
  if (!value.endsWith('/')) value = `${value}/`;
  return value;
}

export function pagePathFromFile(file) {
  const rel = path.relative(root, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/index\.html$/, '')}`;
}

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function stripTags(value) {
  return String(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function decodeHtml(value) {
  return String(value)
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

export function getSourceRecords(page, energyRates) {
  const current = energyRates.currentPeriod;
  const sourceMap = {
    [current.id]: {
      id: current.id,
      name: current.sourceName,
      url: current.sourceUrl,
      accessed: '2026-05-12',
      note: `${current.label}; electricity ${current.electricityUnitRatePence}p/kWh, gas ${current.gasUnitRatePence}p/kWh.`
    }
  };
  return (page.dataSources || []).map((id) => sourceMap[id]).filter(Boolean);
}

export function mergePageConfig(config, page, energyRates, calculatorDefaults) {
  if (!page) return config;
  const calculatorKey = page.calculatorKey || config.calculatorKey;
  const merged = {
    ...config,
    title: page.title || config.title,
    description: page.description || config.description,
    path: page.path || config.path,
    canonical: page.path || config.canonical,
    navKey: page.navKey || config.navKey,
    breadcrumbs: page.breadcrumbs || config.breadcrumbs,
    pageType: page.pageType || config.pageType,
    calculatorKey,
    contentCluster: page.contentCluster || config.contentCluster,
    reviewedDate: page.reviewedDate || config.reviewedDate,
    lastSubstantiveUpdate: page.lastSubstantiveUpdate || config.lastSubstantiveUpdate,
    dataSources: getSourceRecords(page, energyRates),
    relatedRoutes: page.relatedRoutes || config.relatedRoutes,
    faq: page.faq || config.faq,
    energyRates: {
      currentPeriod: energyRates.currentPeriod
    }
  };

  if (calculatorKey && calculatorDefaults.calculators?.[calculatorKey]) {
    merged.calculatorDefaults = {
      [calculatorKey]: calculatorDefaults.calculators[calculatorKey]
    };
  }

  return Object.fromEntries(Object.entries(merged).filter(([, value]) => value !== undefined));
}

export function formatMoney(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: value < 10 ? 2 : 2,
    maximumFractionDigits: 2
  }).format(value);
}

export function costFor({ watts, hours = 1, days = 1, dutyCycle = 100, ratePence }) {
  return (watts / 1000) * hours * days * (dutyCycle / 100) * (ratePence / 100);
}

export function targetFileForPath(canonicalPath) {
  const clean = ensureCanonical(canonicalPath);
  return clean === '/' ? path.join(root, 'index.html') : path.join(root, clean.slice(1), 'index.html');
}
