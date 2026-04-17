import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const root = process.cwd();
const baseUrl = 'https://www.homeenergyscout.co.uk';
const socialImageUrl = `${baseUrl}/assets/img/social-share.png`;
const socialImageAlt = 'Home Energy Scout UK household energy tools and calculators';
const reviewedDate = '2026-04-16';

const navigation = [
  { href: '/running-costs/', label: 'Running costs', key: 'running-costs' },
  { href: '/savings/', label: 'Savings', key: 'savings' },
  { href: '/sizing/', label: 'Sizing', key: 'sizing' },
  { href: '/compare/', label: 'Compare', key: 'compare' },
  { href: '/guides/', label: 'Guides', key: 'guides' }
];

const utilityNav = [
  { href: '/methodology/', label: 'How estimates work' },
  { href: '/about/', label: 'About' }
];

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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripTags(value) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function decodeHtml(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function extractPageConfig(text) {
  const match = text.match(/window\.pageConfig\s*=\s*(\{[\s\S]*?\});?[\s\r\n]*<\/script>/i);
  if (!match) return null;
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(`window.pageConfig = ${match[1]}`, sandbox);
  return sandbox.window.pageConfig;
}

function getHeadValue(text, pattern) {
  const match = text.match(pattern);
  return match ? decodeHtml(match[1].trim()) : '';
}

function getCanonicalUrl(config) {
  return `${baseUrl}${config.canonical || '/'}`;
}

function getSchemaPageType(config) {
  if (config.schemaType) return config.schemaType;
  switch (config.path) {
    case '/about/':
      return 'AboutPage';
    case '/contact/':
      return 'ContactPage';
    case '/privacy/':
      return 'PrivacyPolicy';
    case '/terms/':
      return 'TermsOfService';
    case '/running-costs/':
    case '/savings/':
    case '/sizing/':
    case '/compare/':
    case '/guides/':
      return 'CollectionPage';
    default:
      return 'WebPage';
  }
}

function buildLaunchMeta(config, title, description) {
  const canonicalUrl = getCanonicalUrl(config);
  const robots = config.noindex ? 'noindex,follow,noarchive,max-image-preview:large' : 'index,follow,max-image-preview:large';
  return [
    '  <!-- launch-meta:start -->',
    `  <link rel="canonical" href="${canonicalUrl}">`,
    '  <meta property="og:type" content="website">',
    '  <meta property="og:site_name" content="Home Energy Scout">',
    '  <meta property="og:locale" content="en_GB">',
    `  <meta property="og:title" content="${escapeHtml(title)}">`,
    `  <meta property="og:description" content="${escapeHtml(description)}">`,
    `  <meta property="og:url" content="${canonicalUrl}">`,
    `  <meta property="og:image" content="${socialImageUrl}">`,
    '  <meta property="og:image:width" content="1200">',
    '  <meta property="og:image:height" content="630">',
    `  <meta property="og:image:alt" content="${socialImageAlt}">`,
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:title" content="${escapeHtml(title)}">`,
    `  <meta name="twitter:description" content="${escapeHtml(description)}">`,
    `  <meta name="twitter:image" content="${socialImageUrl}">`,
    `  <meta name="twitter:image:alt" content="${socialImageAlt}">`,
    '  <meta name="theme-color" content="#0f172a">',
    `  <meta name="robots" content="${robots}">`,
    '  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">',
    '  <link rel="icon" href="/favicon.ico" sizes="any">',
    '  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">',
    '  <link rel="manifest" href="/site.webmanifest">',
    '  <!-- launch-meta:end -->'
  ].join('\n');
}

function extractFaqSchema(text) {
  const details = Array.from(text.matchAll(/<details[^>]*class="[^"]*faq-item[^"]*"[^>]*?(?:data-question="([^"]*)")?[^>]*>([\s\S]*?)<\/details>/gi));
  const items = [];

  for (const [, dataQuestion = '', inner] of details) {
    const summaryMatch = inner.match(/<summary>([\s\S]*?)<\/summary>/i);
    const bodyMatch = inner.match(/<div[^>]*class="[^"]*faq-body[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    const question = decodeHtml((dataQuestion || summaryMatch?.[1] || '').trim());
    const answer = decodeHtml(stripTags(bodyMatch?.[1] || ''));
    if (!question || !answer) continue;
    items.push({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    });
  }

  if (!items.length) return null;

  return {
    '@type': 'FAQPage',
    mainEntity: items
  };
}

function buildSchema(config, title, description, text) {
  if (config.noindex) return '';

  const canonicalUrl = getCanonicalUrl(config);
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'Home Energy Scout',
      url: baseUrl,
      logo: `${baseUrl}/assets/img/logo.svg`,
      areaServed: 'GB'
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'Home Energy Scout',
      inLanguage: 'en-GB',
      description: 'UK household energy running cost, savings, sizing and comparison guidance.',
      publisher: { '@id': `${baseUrl}/#organization` }
    }
  ];

  const pageNode = {
    '@type': getSchemaPageType(config),
    '@id': `${canonicalUrl}#webpage`,
    name: title,
    description,
    url: canonicalUrl,
    inLanguage: 'en-GB',
    dateModified: reviewedDate,
    isPartOf: { '@id': `${baseUrl}/#website` },
    publisher: { '@id': `${baseUrl}/#organization` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: socialImageUrl
    },
    about: 'UK home energy running costs, savings and practical household decisions'
  };

  if (config.breadcrumbs?.length) {
    pageNode.breadcrumb = { '@id': `${canonicalUrl}#breadcrumbs` };
  }

  if (config.pageType === 'calculator') {
    pageNode.mainEntity = { '@id': `${canonicalUrl}#calculator` };
  }

  graph.push(pageNode);

  if (config.pageType === 'calculator') {
    const heading = getHeadValue(text, /<h1>([\s\S]*?)<\/h1>/i) || title;
    graph.push({
      '@type': 'SoftwareApplication',
      '@id': `${canonicalUrl}#calculator`,
      name: heading,
      description,
      applicationCategory: 'CalculatorApplication',
      operatingSystem: 'Any',
      inLanguage: 'en-GB',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
      url: canonicalUrl,
      isPartOf: { '@id': `${canonicalUrl}#webpage` },
      publisher: { '@id': `${baseUrl}/#organization` }
    });
  }

  if (config.breadcrumbs?.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumbs`,
      itemListElement: [{ label: 'Home', href: '/' }, ...config.breadcrumbs].map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: `${baseUrl}${item.href}`
      }))
    });
  }

  const faqSchema = extractFaqSchema(text);
  if (faqSchema) {
    graph.push({
      ...faqSchema,
      '@id': `${canonicalUrl}#faq`
    });
  }

  if (Array.isArray(config.schema)) {
    graph.push(...config.schema);
  }

  return [
    '  <!-- launch-schema:start -->',
    '  <script id="hes-page-schema" type="application/ld+json">',
    `  ${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}`,
    '  </script>',
    '  <!-- launch-schema:end -->'
  ].join('\n');
}

function buildHeader(config) {
  const utilityItems = utilityNav
    .map((item) => `<a href="${item.href}" data-track-link>${item.label}</a>`)
    .join('');
  const navItems = navigation
    .map((item) => `<a href="${item.href}"${item.key === config.navKey ? ' aria-current="page"' : ''} data-track-link>${item.label}</a>`)
    .join('');

  return `
      <header class="site-header">
        <div class="container nav-stack">
          <div class="nav-utility" aria-label="Secondary">
            ${utilityItems}
          </div>
          <div class="nav-row">
            <a class="brand-mark" href="/" aria-label="Home Energy Scout homepage">
              <span class="brand-dot" aria-hidden="true">&#9889;</span>
              <span class="brand-copy">
                <span class="brand-name">Home Energy Scout</span>
                <span class="brand-tag">UK home energy costs, savings and sizing</span>
              </span>
            </a>
            <nav class="nav-links" aria-label="Primary">${navItems}</nav>
          </div>
        </div>
      </header>`;
}

function buildBreadcrumbs(config) {
  if (!config.breadcrumbs?.length) return '';
  const items = [{ label: 'Home', href: '/' }, ...config.breadcrumbs];
  return `
      <nav class="breadcrumbs container" aria-label="Breadcrumb">
        <ol>
          ${items.map((item, index) => `<li>${
            index === items.length - 1
              ? `<span aria-current="page">${escapeHtml(item.label)}</span>`
              : `<a href="${item.href}" data-track-link>${escapeHtml(item.label)}</a>`
          }</li>`).join('')}
        </ol>
      </nav>`;
}

function buildFooter() {
  return `
      <footer class="site-footer">
        <div class="container footer-grid footer-grid--launch">
          <div class="footer-brand">
            <h2>Home Energy Scout</h2>
            <p>UK-first household energy tools for running costs, savings, sizing and practical compare decisions. Built to help you get to a sensible answer fast, then make the next decision with clearer assumptions.</p>
            <div class="footer-pills">
              <span>UK-first assumptions</span>
              <span>Estimate-led, not quote-led</span>
              <span>Built for mobile use</span>
            </div>
          </div>
          <div class="footer-nav">
            <div>
              <h3>Start here</h3>
              <ul>
                <li><a href="/running-costs/appliance-running-cost/" data-track-link>Appliance running cost calculator</a></li>
                <li><a href="/running-costs/electric-heater-running-cost/" data-track-link>Electric heater running cost</a></li>
                <li><a href="/savings/loft-insulation-savings/" data-track-link>Loft insulation savings</a></li>
                <li><a href="/compare/heating-option-comparison/" data-track-link>Heating option comparison</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-nav">
            <div>
              <h3>Browse sections</h3>
              <ul>
                <li><a href="/running-costs/" data-track-link>Running costs</a></li>
                <li><a href="/savings/" data-track-link>Savings</a></li>
                <li><a href="/sizing/" data-track-link>Sizing</a></li>
                <li><a href="/compare/" data-track-link>Compare</a></li>
                <li><a href="/guides/" data-track-link>Guides</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-nav">
            <div>
              <h3>Trust and contact</h3>
              <ul>
                <li><a href="/methodology/" data-track-link>How the estimates work</a></li>
                <li><a href="/about/" data-track-link>About Home Energy Scout</a></li>
                <li><a href="/contact/" data-track-link>Contact</a></li>
                <li><a href="/privacy/" data-track-link>Privacy</a></li>
                <li><a href="/terms/" data-track-link>Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="container footer-note">
          <p>Home Energy Scout gives UK-focused estimates and practical guidance. It does not provide supplier quotes, installer sign-off, or tailored professional advice.</p>
        </div>
      </footer>`;
}

function stripStaticBlock(text, startMarker, endMarker) {
  const regex = new RegExp(`\\n\\s*${startMarker}[\\s\\S]*?${endMarker}`, 'i');
  return text.replace(regex, '');
}

function replaceMount(text, id, markerName, innerHtml) {
  const regex = new RegExp(
    `<div id="${id}">(?:\\s*<!-- ${markerName}:start -->[\\s\\S]*?<!-- ${markerName}:end -->\\s*)?<\\/div>`,
    'i'
  );

  return text.replace(
    regex,
    `<div id="${id}">\n  <!-- ${markerName}:start -->${innerHtml}\n  <!-- ${markerName}:end -->\n  </div>`
  );
}

for (const file of walk(root)) {
  let text = fs.readFileSync(file, 'utf8');
  const config = extractPageConfig(text);
  if (!config) continue;

  const title = getHeadValue(text, /<title>([\s\S]*?)<\/title>/i) || config.title || '';
  const description = getHeadValue(text, /<meta name="description" content="([\s\S]*?)"/i) || config.description || '';

  const launchMeta = buildLaunchMeta(config, title, description);
  const schemaBlock = buildSchema(config, title, description, text);

  text = stripStaticBlock(text, '<!-- launch-meta:start -->', '<!-- launch-meta:end -->');
  text = stripStaticBlock(text, '<!-- launch-schema:start -->', '<!-- launch-schema:end -->');

  text = text.replace(/(<meta name="description" content="[\s\S]*?">)/i, `$1\n${launchMeta}`);
  text = text.replace(/(<script[^>]*>\s*window\.pageConfig[\s\S]*?<\/script>)/i, `$1${schemaBlock ? `\n${schemaBlock}` : ''}`);

  text = replaceMount(text, 'site-header', 'static-header', buildHeader(config));
  if (config.breadcrumbs?.length) {
    text = replaceMount(text, 'breadcrumbs', 'static-breadcrumbs', buildBreadcrumbs(config));
  } else {
    text = replaceMount(text, 'breadcrumbs', 'static-breadcrumbs', '');
  }
  text = replaceMount(text, 'site-footer', 'static-footer', buildFooter());

  fs.writeFileSync(file, text, 'utf8');
}

console.log(`Prepared ${walk(root).length} HTML files for static launch output.`);
