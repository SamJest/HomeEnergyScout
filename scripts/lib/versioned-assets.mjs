import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

export const sharedAssets = ['/assets/js/site.js', '/assets/css/styles.css'];
export function fingerprint(content) {
  // Git may check authored files out as CRLF on Windows; emitted bytes are canonical.
  const bytes = content.replace(/\r\n?/g, '\n');
  return { bytes, hash: createHash('sha256').update(bytes).digest('hex').slice(0,16) };
}
export function assetManifest(root = process.cwd()) {
  return Object.fromEntries(sharedAssets.map(url => {
    const { hash } = fingerprint(fs.readFileSync(path.join(root,url.slice(1)), 'utf8'));
    return [url, url.replace(/(\.[^.]+)$/, `.${hash}$1`)];
  }));
}
export function emitVersionedAssets(root = process.cwd()) {
  const manifest = assetManifest(root);
  for (const [url, versioned] of Object.entries(manifest)) {
    const source = path.join(root,url.slice(1));
    fs.writeFileSync(path.join(root,versioned.slice(1)), fingerprint(fs.readFileSync(source,'utf8')).bytes);
    // Keep previous immutable copies so cached HTML from an earlier release still works.
  }
  return manifest;
}
export function emittedAssetFiles(root = process.cwd()) {
  return sharedAssets.flatMap(url => {
    const directory = path.dirname(url.slice(1));
    const stem = path.basename(url,path.extname(url));
    const extension = path.extname(url).slice(1);
    const pattern = new RegExp(`^${stem}\\.[a-f0-9]{16}\\.${extension}$`);
    return fs.readdirSync(path.join(root,directory)).filter(name=>pattern.test(name)).map(name=>path.join(directory,name));
  });
}
export function rewriteAssetReferences(html, manifest) {
  for (const [url, versioned] of Object.entries(manifest)) {
    const pattern = url.replaceAll('.', '\\.').replace(/\\\.(js|css)$/, '(?:\\.[a-f0-9]{16})?\\.$1');
    html = html.replace(new RegExp(`${pattern}(?:\\?[^"'\\s>]*)?`, 'g'),versioned);
  }
  return html;
}
