import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { pagePathFromFile, readContentData } from './lib/content-data.mjs';

const root = process.cwd();
const baseUrl = 'https://www.homeenergyscout.co.uk';
const { pageByPath } = readContentData();
const fallbackLastmod = '2026-04-16';

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

function relative(file) {
  return path.relative(root, file).replace(/\\/g, '/');
}

function getDateStamp() {
  const explicit = process.argv.find((arg) => arg.startsWith('--date='));
  if (explicit) return explicit.split('=')[1];
  return '';
}

function toUrl(relPath) {
  if (relPath === 'index.html') return `${baseUrl}/`;
  return `${baseUrl}/${relPath.replace(/index\.html$/, '')}`;
}

function extractPageConfig(text) {
  const match = text.match(/window\.pageConfig\s*=\s*(\{[\s\S]*?\});?[\s\r\n]*<\/script>/i);
  if (!match) return {};
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(`window.pageConfig = ${match[1]}`, sandbox);
  return sandbox.window.pageConfig || {};
}

function getLastmod(file) {
  const text = fs.readFileSync(file, 'utf8');
  const config = extractPageConfig(text);
  const canonicalPath = config.path || config.canonical || pagePathFromFile(file);
  const page = pageByPath.get(canonicalPath);
  return page?.lastSubstantiveUpdate || page?.reviewedDate || config.lastSubstantiveUpdate || config.reviewedDate || getDateStamp() || fallbackLastmod;
}

const urls = walk(root)
  .map(relative)
  .filter((relPath) => relPath !== '404.html')
  .map((relPath) => {
    const file = path.join(root, relPath);
    return { url: toUrl(relPath), lastmod: getLastmod(file) };
  })
  .sort((a, b) => a.url.localeCompare(b.url, 'en-GB'));

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((entry) => `  <url><loc>${entry.url}</loc><lastmod>${entry.lastmod}</lastmod></url>`),
  '</urlset>',
  ''
].join('\n');

fs.writeFileSync(path.join(root, 'sitemap.xml'), xml, 'utf8');
console.log(`Updated sitemap.xml with ${urls.length} URLs and page-level lastmod dates.`);
