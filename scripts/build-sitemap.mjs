import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const baseUrl = 'https://www.homeenergyscout.co.uk';

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
  return new Date().toISOString().slice(0, 10);
}

function toUrl(relPath) {
  if (relPath === 'index.html') return `${baseUrl}/`;
  return `${baseUrl}/${relPath.replace(/index\.html$/, '')}`;
}

const lastmod = getDateStamp();
const urls = walk(root)
  .map(relative)
  .filter((relPath) => relPath !== '404.html')
  .map(toUrl)
  .sort((a, b) => a.localeCompare(b, 'en-GB'));

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((url) => `  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`),
  '</urlset>',
  ''
].join('\n');

fs.writeFileSync(path.join(root, 'sitemap.xml'), xml, 'utf8');
console.log(`Updated sitemap.xml with ${urls.length} URLs and lastmod ${lastmod}.`);
