import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();

function parseArgs(argv) {
  const args = {};
  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const [rawKey, ...rest] = arg.slice(2).split('=');
    args[rawKey] = rest.length ? rest.join('=') : 'true';
  }
  return args;
}

function usage() {
  console.log([
    'Usage:',
    '  node scripts/scaffold-page.mjs --template=support --path=/guides/new-page/ --title="New page | Home Energy Scout" --description="Short description" --navKey=guides --parentLabel=Guides --parentPath=/guides/',
    '',
    'Templates:',
    '  support, calculator, hub, trust',
    '',
    'Optional flags:',
    '  --kicker=Guide',
    '  --draft=true'
  ].join('\n'));
}

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    usage();
    process.exit(1);
  }
}

function ensureCanonical(input) {
  if (!input) return '/';
  let value = input.trim();
  if (!value.startsWith('/')) value = `/${value}`;
  if (!value.endsWith('/')) value = `${value}/`;
  return value;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function titleToLabel(title) {
  return title.replace(/\s*\|\s*Home Energy Scout\s*$/i, '').trim();
}

function createPageConfig({ title, description, canonical, navKey, template, parentLabel, parentPath, draft }) {
  const breadcrumbs = [];
  if (parentLabel && parentPath) {
    breadcrumbs.push({ label: parentLabel, href: ensureCanonical(parentPath) });
  }
  breadcrumbs.push({ label: titleToLabel(title), href: canonical });

  const config = {
    title,
    description,
    path: canonical,
    canonical,
    navKey: navKey || '',
    breadcrumbs
  };

  if (template === 'calculator') config.pageType = 'calculator';
  if (draft === 'true') config.noindex = true;

  return JSON.stringify(config);
}

function supportBody(label, kicker) {
  return `
  <main id="main-content">
    <section class="page-hero">
      <div class="container">
        <div class="page-hero-panel">
          <span class="kicker">${escapeHtml(kicker)}</span>
          <h1>${escapeHtml(label)}</h1>
          <p class="lead">Write the user-facing introduction here. Keep it practical, UK-first, and answer-led.</p>
          <div class="page-meta">
            <span>UK-focused guidance</span>
            <span>Answer-led route page</span>
            <span>Expand only when the next decision is clearer</span>
          </div>
          <div class="jump-links">
            <a href="#overview">Overview</a>
            <a href="#examples">Examples</a>
            <a href="#related">Related pages</a>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section" id="overview">
      <div class="container two-col">
        <article class="card">
          <h2>Main answer</h2>
          <p>Replace this with the short, direct answer or framing block that explains what the page is for.</p>
        </article>
        <article class="card">
          <h2>What affects the answer most</h2>
          <p>Replace this with the inputs, assumptions or household conditions that shift the verdict most.</p>
        </article>
      </div>
    </section>

    <section class="page-section" id="examples">
      <div class="container two-col">
        <article class="example-panel">
          <h2>Worked examples</h2>
          <p>Add realistic examples only when they help users sense-check the main answer.</p>
        </article>
        <article class="assumption-panel">
          <h2>How to use this page</h2>
          <p>Explain what users should compare, estimate or click next after reading the page.</p>
        </article>
      </div>
    </section>

    <section class="page-section" id="related">
      <div class="container aside-layout">
        <div>
          <div class="section-head">
            <div>
              <h2>Related pages</h2>
              <p>Link only to the next genuinely useful routes.</p>
            </div>
          </div>
          <div class="section-index">
            <a href="/methodology/" data-track-link><strong>Methodology</strong><span>Replace these starter links with the best real follow-on routes.</span></a>
          </div>
        </div>
        <aside>
          <div class="ad-slot" aria-label="Future advertising placement">
            <strong>Reserved layout zone</strong>
            <span>Keep this space stable for future ad rollout without interrupting the main answer flow.</span>
          </div>
        </aside>
      </div>
    </section>
  </main>`;
}

function calculatorBody(label, kicker) {
  return `
  <main id="main-content">
    <section class="page-hero">
      <div class="container">
        <div class="page-hero-panel">
          <span class="kicker">${escapeHtml(kicker)}</span>
          <h1>${escapeHtml(label)}</h1>
          <p class="lead">Write the user-facing calculator intro here. Explain the decision clearly before the form starts.</p>
          <div class="answer-summary">
            <strong>Quick answer</strong>
            <p>Replace this with a short framing block that tells users what the tool is best at and where it becomes rougher.</p>
          </div>
          <div class="page-meta">
            <span>UK-focused estimate</span>
            <span>Calculator route</span>
            <span>Built for practical next-step decisions</span>
          </div>
          <div class="jump-links">
            <a href="#tool">Calculator</a>
            <a href="#examples">Worked examples</a>
            <a href="#assumptions">How it is calculated</a>
            <a href="#related">Related pages</a>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section" id="tool">
      <div class="container tool-grid">
        <article class="form-panel">
          <h2>Enter your details</h2>
          <p class="form-intro">Replace the placeholder fields, help text and calculator key with the real tool inputs.</p>
          <form data-calculator="replace-me" data-results-target="replace-results" novalidate>
            <fieldset class="form-section">
              <legend>Main inputs</legend>
              <div class="form-grid">
                <div class="field">
                  <label for="example-input">Example input</label>
                  <input id="example-input" name="exampleInput" type="number" min="0" step="1" value="0">
                  <p class="help-text">Replace this placeholder field before launch.</p>
                </div>
              </div>
            </fieldset>
            <div class="form-actions">
              <button class="button" type="submit">Calculate</button>
              <button class="button-secondary" type="reset">Reset</button>
            </div>
          </form>
        </article>
        <aside id="replace-results" class="result-panel" data-state="idle">
          <span class="result-banner">Waiting for inputs</span>
          <h2>Your result</h2>
          <p class="result-lead">Replace this scaffold with the real calculator output logic in <code>assets/js/site.js</code>.</p>
          <p class="result-helper">The layout is ready; the formula, validation and interpretation still need wiring in.</p>
        </aside>
      </div>
    </section>

    <section class="page-section" id="examples">
      <div class="container two-col">
        <article class="example-panel">
          <h2>Worked examples</h2>
          <p>Add realistic example scenarios that help users trust the tool and sanity-check their own inputs.</p>
        </article>
        <article class="assumption-panel" id="assumptions">
          <h2>How this is calculated</h2>
          <p>Explain the formula, defaults and where the tool becomes directional rather than precise.</p>
        </article>
      </div>
    </section>

    <section class="page-section" id="related">
      <div class="container aside-layout">
        <div>
          <div class="section-head">
            <div>
              <h2>Related pages</h2>
              <p>Keep only the strongest next clicks once the result is ready.</p>
            </div>
          </div>
          <div class="section-index">
            <a href="/methodology/" data-track-link><strong>Methodology</strong><span>Replace these starter links with the right support and comparison routes.</span></a>
          </div>
        </div>
        <aside>
          <div class="ad-slot" aria-label="Future advertising placement">
            <strong>Reserved layout zone</strong>
            <span>Keep the calculator flow clear even when future ad units are introduced.</span>
          </div>
        </aside>
      </div>
    </section>
  </main>`;
}

function hubBody(label, kicker) {
  return `
  <main id="main-content">
    <section class="page-hero">
      <div class="container">
        <div class="page-hero-panel">
          <span class="kicker">${escapeHtml(kicker)}</span>
          <h1>${escapeHtml(label)}</h1>
          <p class="lead">Write the hub promise here. The job of the hub is to route users into the right question, not to summarise everything.</p>
        </div>
      </div>
    </section>

    <section class="page-section">
      <div class="container">
        <div class="section-head">
          <div>
            <h2>Best routes from this hub</h2>
            <p>Replace the starter cards with the highest-intent live entry pages in this section.</p>
          </div>
        </div>
        <div class="section-entry-grid">
          <article class="card section-entry-card">
            <span class="kicker">Cluster</span>
            <h3><a href="/methodology/" data-track-link>Replace this route</a></h3>
            <p>Use this scaffold card to point toward the strongest next click in the section.</p>
          </article>
        </div>
      </div>
    </section>
  </main>`;
}

function trustBody(label, kicker) {
  return `
  <main id="main-content">
    <section class="page-hero">
      <div class="container">
        <div class="page-hero-panel">
          <span class="kicker">${escapeHtml(kicker)}</span>
          <h1>${escapeHtml(label)}</h1>
          <p class="lead">Write the plain, user-facing explanation here. Trust pages should be clear and calm, not filler.</p>
        </div>
      </div>
    </section>

    <section class="page-section">
      <div class="container two-col">
        <article class="card">
          <h2>Main information</h2>
          <p>Replace this with the actual trust, contact or policy content before publication.</p>
        </article>
        <article class="card">
          <h2>What users should know</h2>
          <p>Use this area for limits, scope, responsibilities or contact routes where appropriate.</p>
        </article>
      </div>
    </section>
  </main>`;
}

function buildBody(template, label, kicker) {
  switch (template) {
    case 'calculator':
      return calculatorBody(label, kicker);
    case 'hub':
      return hubBody(label, kicker);
    case 'trust':
      return trustBody(label, kicker);
    default:
      return supportBody(label, kicker);
  }
}

const args = parseArgs(process.argv.slice(2));
const template = (args.template || 'support').toLowerCase();
const canonical = ensureCanonical(args.path);
const title = args.title;
const description = args.description;
const navKey = args.navKey || '';
const label = titleToLabel(title || '');
const kicker = args.kicker || (template === 'calculator' ? 'Calculator' : template === 'hub' ? 'Section' : template === 'trust' ? 'Information' : 'Guide');
const draft = args.draft || 'false';

assert(['support', 'calculator', 'hub', 'trust'].includes(template), 'Unsupported template.');
assert(title, 'Missing required --title value.');
assert(description, 'Missing required --description value.');
assert(canonical !== '/', 'Use a dedicated directory path rather than /.');

const targetDir = path.join(root, canonical.slice(1));
const targetFile = path.join(targetDir, 'index.html');

if (fs.existsSync(targetFile)) {
  console.error(`Refusing to overwrite existing file: ${targetFile}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <script>window.pageConfig=${createPageConfig({ title, description, canonical, navKey, template, parentLabel: args.parentLabel, parentPath: args.parentPath, draft })};</script>
  <script defer src="/assets/js/site.js"></script>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div id="site-header"></div>
  <div id="breadcrumbs"></div>
${buildBody(template, label, kicker)}
  <div id="site-footer"></div>
</body>
</html>
`;

fs.writeFileSync(targetFile, html, 'utf8');

execFileSync(process.execPath, [path.join(root, 'scripts', 'prepare-static-launch.mjs')], { stdio: 'inherit', cwd: root });
execFileSync(process.execPath, [path.join(root, 'scripts', 'build-sitemap.mjs')], { stdio: 'inherit', cwd: root });

console.log(`Scaffolded ${template} page at ${targetFile}`);
console.log('Next steps: replace scaffold copy, wire any new calculator logic, then run node scripts/validate-site.mjs before deploy.');
