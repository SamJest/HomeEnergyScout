import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {
  pagePathFromFile,
  readContentData
} from './lib/content-data.mjs';

const root = process.cwd();
const issues = [];
const htmlFiles = [];
const { energyRates } = readContentData();
const currentEnergyPeriod = energyRates.currentPeriod;
const currentElectricityRate = String(currentEnergyPeriod.electricityUnitRatePence);

const requiredHeadSnippets = [
  '<link rel="canonical"',
  '<meta property="og:title"',
  '<meta property="og:description"',
  '<meta property="og:url"',
  '<meta property="og:image"',
  '<meta name="twitter:card"',
  '<meta name="twitter:title"',
  '<meta name="twitter:description"',
  '<meta name="twitter:image"',
  '<link rel="manifest" href="/site.webmanifest">',
  '<link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">'
];

const forbiddenPhrases = [
  'project-stage placeholder',
  'before public launch',
  'build stage',
  'foundation privacy page'
];

const requiredStaticShellMarkers = [
  { marker: '<!-- launch-meta:start -->', message: 'missing prerendered launch metadata block' },
  { marker: '<!-- static-header:start -->', message: 'missing prerendered static header shell' },
  { marker: '<!-- static-footer:start -->', message: 'missing prerendered static footer shell' }
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.isFile() && /\.html$/i.test(entry.name)) {
      htmlFiles.push(full);
    }
  }
}

function relative(file) {
  return path.relative(root, file).replace(/\\/g, '/');
}

function extractPageConfig(text) {
  const match = text.match(/window\.pageConfig\s*=\s*(\{[\s\S]*?\});?[\s\r\n]*<\/script>/i);
  if (!match) return null;
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(`window.pageConfig = ${match[1]}`, sandbox);
  return sandbox.window.pageConfig;
}

function addIssue(file, message) {
  issues.push(`${file} - ${message}`);
}

walk(root);

if (new Date(`${currentEnergyPeriod.reviewDue}T00:00:00Z`) < new Date()) {
  addIssue('data/energy-rates.json', `energy rates are past reviewDue ${currentEnergyPeriod.reviewDue}`);
}

for (const file of htmlFiles) {
  const rel = relative(file);
  const text = fs.readFileSync(file, 'utf8');
  const config = extractPageConfig(text);
  const ids = new Set(Array.from(text.matchAll(/\sid="([^"]+)"/g)).map((match) => match[1]));
  const canonicalPath = config?.path || config?.canonical || pagePathFromFile(file);

  if (!config) {
    addIssue(rel, 'missing window.pageConfig');
    continue;
  }

  for (const phrase of forbiddenPhrases) {
    if (text.toLowerCase().includes(phrase)) {
      addIssue(rel, `contains pre-launch placeholder copy: "${phrase}"`);
    }
  }

  if (text.includes('SearchAction')) {
    addIssue(rel, 'contains SearchAction even though the site has no live search feature');
  }

  for (const snippet of requiredHeadSnippets) {
    if (!text.includes(snippet)) {
      addIssue(rel, `missing required head markup: ${snippet}`);
    }
  }

  for (const requirement of requiredStaticShellMarkers) {
    if (!text.includes(requirement.marker)) {
      addIssue(rel, requirement.message);
    }
  }

  if (config.breadcrumbs?.length && !text.includes('<!-- static-breadcrumbs:start -->')) {
    addIssue(rel, 'missing prerendered static breadcrumb trail');
  }

  if (config.noindex) {
    if (text.includes('id="hes-page-schema"')) {
      addIssue(rel, 'noindex page should not include prerendered page schema');
    }
  } else {
    if (!text.includes('<!-- launch-schema:start -->')) {
      addIssue(rel, 'missing prerendered page schema block');
    }
    if (!text.includes('id="hes-page-schema"')) {
      addIssue(rel, 'missing prerendered page schema script');
    }
  }

  for (const tariffMatch of text.matchAll(/<input[^>]+name="tariffPence"[^>]*>/g)) {
    const valueMatch = tariffMatch[0].match(/\svalue="([^"]+)"/i);
    if (!valueMatch) {
      addIssue(rel, 'tariffPence input is missing a shared default value');
    } else if (Number(valueMatch[1]) !== Number(currentElectricityRate)) {
      addIssue(rel, `tariffPence input uses ${valueMatch[1]}p instead of shared ${currentElectricityRate}p default`);
    }
  }

  if (config.contentCluster && config.relatedRoutes?.length < 2) {
    addIssue(rel, `cluster page ${config.contentCluster} needs at least two relatedRoutes in pageConfig`);
  }

  if (config.pageType === 'calculator' && config.contentCluster && !text.includes('source-note') && !text.includes('source-panel')) {
    addIssue(rel, 'cluster calculator page is missing visible source notes');
  }

  if (Array.isArray(config.faq) && config.faq.length) {
    const visibleQuestions = Array.from(text.matchAll(/<details[^>]*class="[^"]*faq-item[^"]*"[^>]*data-question="([^"]*)"/gi)).map((match) => match[1]);
    for (const item of config.faq) {
      if (!visibleQuestions.includes(item.question)) {
        addIssue(rel, `pageConfig FAQ is not visible on page: ${item.question}`);
      }
    }
  }

  const canonicalMatch = text.match(/<link rel="canonical" href="([^"]+)"/i);
  const expectedCanonical = `https://www.homeenergyscout.co.uk${config.canonical || canonicalPath || '/'}`;
  if (!canonicalMatch) {
    addIssue(rel, 'missing canonical tag');
  } else if (canonicalMatch[1] !== expectedCanonical) {
    addIssue(rel, `canonical mismatch: expected ${expectedCanonical}`);
  }

  const titleMatch = text.match(/<title>([\s\S]*?)<\/title>/i);
  const descriptionMatch = text.match(/<meta name="description" content="([\s\S]*?)"/i);
  if (titleMatch && config.title && titleMatch[1].trim() !== config.title) {
    addIssue(rel, 'head title does not match pageConfig.title');
  }
  if (descriptionMatch && config.description && descriptionMatch[1].trim() !== config.description) {
    addIssue(rel, 'meta description does not match pageConfig.description');
  }

  const robotsMatch = text.match(/<meta name="robots" content="([^"]+)"/i);
  if (config.noindex) {
    if (!robotsMatch || !robotsMatch[1].includes('noindex')) {
      addIssue(rel, 'noindex page is missing a noindex robots tag');
    }
  } else if (!robotsMatch || !robotsMatch[1].startsWith('index,follow')) {
    addIssue(rel, 'indexable page is missing the standard robots tag');
  }

  for (const hrefMatch of text.matchAll(/href="([^"]+)"/g)) {
    const href = hrefMatch[1];
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    if (href.startsWith('#')) {
      if (!ids.has(href.slice(1))) addIssue(rel, `missing same-page anchor target: ${href}`);
      continue;
    }

    const [rawPath, hash] = href.split('#');
    if (!rawPath.startsWith('/')) continue;
    let target = rawPath === '/' ? path.join(root, 'index.html') : path.join(root, rawPath.slice(1), rawPath.endsWith('/') ? 'index.html' : '');
    if (rawPath !== '/' && !rawPath.endsWith('/')) {
      target = path.join(root, rawPath.slice(1));
    }

    if (!fs.existsSync(target)) {
      addIssue(rel, `missing internal target: ${href}`);
      continue;
    }

    if (hash) {
      const targetText = fs.readFileSync(target, 'utf8');
      const targetIds = new Set(Array.from(targetText.matchAll(/\sid="([^"]+)"/g)).map((match) => match[1]));
      if (!targetIds.has(hash)) addIssue(rel, `missing target anchor: ${href}`);
    }
  }
}

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = new Set(Array.from(sitemap.matchAll(/<loc>(.*?)<\/loc>/g)).map((match) => match[1]));
const expectedUrls = new Set(
  htmlFiles
    .filter((file) => relative(file) !== '404.html')
    .map((file) => {
      const rel = relative(file);
      return rel === 'index.html'
        ? 'https://www.homeenergyscout.co.uk/'
        : `https://www.homeenergyscout.co.uk/${rel.replace(/index\.html$/, '')}`;
    })
);

for (const url of expectedUrls) {
  if (!sitemapUrls.has(url)) addIssue('sitemap.xml', `missing URL: ${url}`);
}

for (const asset of [
  'assets/img/favicon.svg',
  'assets/img/logo.svg',
  'assets/img/social-share.png',
  'assets/img/apple-touch-icon.png',
  'assets/img/icon-192.png',
  'assets/img/icon-512.png',
  'favicon.ico',
  'site.webmanifest'
]) {
  if (!fs.existsSync(path.join(root, asset))) addIssue(asset, 'missing asset');
}

if (issues.length) {
  console.error('Validation failed:');
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`Validation passed for ${htmlFiles.length} HTML files.`);
