(() => {
  const baseUrl = 'https://www.homeenergyscout.co.uk';
  const pageConfig = window.pageConfig || {};
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
  const canonicalUrl = `${baseUrl}${pageConfig.canonical || '/'}`;
  const reviewedDate = '2026-04-16';
  const defaultSocialImagePath = '/assets/img/social-share.png';
  const socialImagePath = pageConfig.socialImage || defaultSocialImagePath;
  const socialImageUrl = socialImagePath.startsWith('http') ? socialImagePath : `${baseUrl}${socialImagePath}`;
  const socialImageAlt = pageConfig.socialImageAlt || 'Home Energy Scout UK household energy tools and calculators';
  const shouldIndex = !pageConfig.noindex;


  const relatedPathways = {
    '/': {
      heading: 'Best next routes from the homepage',
      intro: 'Most visitors do better when they pick the route that matches the real household question rather than browsing everything.',
      note: 'If you already know the appliance, use the calculator or dedicated page first. If the question is about replacing, comparing or sizing, use the second step instead of stopping at a raw cost.',
      links: [
        { href: '/running-costs/appliance-running-cost/', eyebrow: 'Start with a number', title: 'Appliance running cost calculator', text: 'Best first click when you know the wattage or label details and want a cost baseline.' },
        { href: '/sizing/heater-room-size-calculator/', eyebrow: 'Check the fit', title: 'Heater room size calculator', text: 'Best when a cold room may be a sizing problem rather than a tariff problem.' },
        { href: '/compare/heating-option-comparison/', eyebrow: 'Choose between options', title: 'Heating option comparison', text: 'Best when two heating methods look similar but the practical verdict is not obvious.' }
      ]
    },
    '/running-costs/': {
      heading: 'Best next moves after a running-cost page',
      intro: 'A cost estimate is usually the first step, not the last one.',
      links: [
        { href: '/compare/', eyebrow: 'Then compare', title: 'Move into compare pages', text: 'Go here when the next question is whether another method is cheaper or better fitted.' },
        { href: '/savings/', eyebrow: 'Then reduce it', title: 'Look for savings and payback', text: 'Go here once the current cost is clear and you want to reduce it.' },
        { href: '/methodology/', eyebrow: 'Then sense-check', title: 'Review the assumptions', text: 'Check how usage patterns and tariffs affect the estimate before treating it as exact.' }
      ]
    },
    '/savings/': {
      heading: 'Best next moves after a savings page',
      intro: 'Savings pages work best when they lead into the right practical decision rather than stopping at a payback number.',
      links: [
        { href: '/guides/payback-vs-comfort-upgrades/', eyebrow: 'Judge the trade-off', title: 'Payback vs comfort upgrades', text: 'Best when a slower financial return may still make sense because comfort improves.' },
        { href: '/running-costs/', eyebrow: 'Baseline first', title: 'Return to running costs', text: 'Helpful when you still need a better sense of the current cost before judging the saving.' },
        { href: '/methodology/', eyebrow: 'Check the logic', title: 'How the estimates work', text: 'See where savings logic is stronger and where it is more directional.' }
      ]
    },
    '/sizing/': {
      heading: 'Best next moves after a sizing page',
      intro: 'Sizing pages are there to stop the wrong comparison happening too early.',
      links: [
        { href: '/running-costs/electric-heater-running-cost/', eyebrow: 'Cost the sized option', title: 'Electric heater running cost', text: 'Use this after you have a rough heater size and want a realistic bill estimate.' },
        { href: '/compare/heating-option-comparison/', eyebrow: 'Choose the style', title: 'Heating option comparison', text: 'Useful once the room size is clearer and you are choosing between heater types.' },
        { href: '/methodology/', eyebrow: 'Check assumptions', title: 'Methodology', text: 'Review the room and insulation assumptions behind the quick sizing guidance.' }
      ]
    },
    '/compare/': {
      heading: 'Best next moves after a comparison page',
      intro: 'A comparison is more reliable when the baseline cost and room fit are already roughly right.',
      links: [
        { href: '/running-costs/', eyebrow: 'Cost baseline', title: 'Return to running costs', text: 'Useful if you still need a simple cost baseline for one option on its own.' },
        { href: '/sizing/', eyebrow: 'Room fit first', title: 'Check sizing', text: 'Helpful when the room or appliance may be wrong for the job.' },
        { href: '/guides/electric-heating-costs-explained/', eyebrow: 'Need context', title: 'Electric heating costs explained', text: 'Read this when the kWh logic is clear but the verdict still feels unintuitive.' }
      ]
    },
    '/guides/': {
      heading: 'Best next moves after a guide',
      intro: 'Guides should send you back into a useful tool or decision page, not strand you in reading mode.',
      links: [
        { href: '/running-costs/', eyebrow: 'Go back to a number', title: 'Running-cost tools', text: 'Use a calculator or dedicated cost page when you are ready to test the idea against your own case.' },
        { href: '/compare/', eyebrow: 'Turn context into a decision', title: 'Comparison routes', text: 'Best when the guide helped but you still need a verdict between two options.' },
        { href: '/methodology/', eyebrow: 'Check the assumptions', title: 'Methodology', text: 'Read this if you want to know how the estimate logic is built.' }
      ]
    },
    '/running-costs/appliance-running-cost/': {
      heading: 'Best next steps after the general appliance calculator',
      intro: 'Once you have the baseline number, the useful next move is usually a more specific route.',
      links: [
        { href: '/running-costs/kettle-running-cost/', eyebrow: 'Kitchen use', title: 'Kettle running cost', text: 'Good example of a low-cost habit that adds up through frequency rather than a huge wattage.' },
        { href: '/running-costs/tumble-dryer-running-cost/', eyebrow: 'Higher-use appliance', title: 'Tumble dryer running cost', text: 'Better when the next question is a bigger annual appliance cost rather than a quick kitchen check.' },
        { href: '/compare/repair-vs-replace-old-appliance/', eyebrow: 'Decision route', title: 'Repair vs replace old appliance', text: 'Open this when the cost result is pushing you towards a replacement decision.' }
      ]
    },
    '/running-costs/electric-heater-running-cost/': {
      heading: 'What usually comes next after heater running cost',
      intro: 'People usually move from a single heater cost into sizing or comparison next.',
      links: [
        { href: '/sizing/heater-room-size-calculator/', eyebrow: 'Check the fit', title: 'Heater room size calculator', text: 'Use this when the room may need more heat than the current setup can realistically deliver.' },
        { href: '/compare/oil-radiator-vs-fan-heater/', eyebrow: 'Compare two options', title: 'Oil radiator vs fan heater', text: 'Helpful when the real question is not cost alone but room feel and warm-up speed.' },
        { href: '/guides/electric-heating-costs-explained/', eyebrow: 'Understand the maths', title: 'Electric heating costs explained', text: 'Read this if the result feels harsh and you want to know what is really driving it.' }
      ]
    },
    '/running-costs/dehumidifier-running-cost/': {
      heading: 'Best next steps after dehumidifier running cost',
      intro: 'Dehumidifier questions often turn into drying, sizing or method-choice questions quite quickly.',
      links: [
        { href: '/sizing/dehumidifier-size-by-room/', eyebrow: 'Check capacity', title: 'Dehumidifier size by room', text: 'Best when weak performance may be a sizing issue rather than a running-cost issue.' },
        { href: '/compare/dehumidifier-vs-heating-to-dry-clothes/', eyebrow: 'Compare methods', title: 'Dehumidifier vs heating to dry clothes', text: 'Go here when the next question is whether another drying method is actually cheaper or better.' },
        { href: '/guides/dehumidifier-for-drying-clothes/', eyebrow: 'Use it better', title: 'Using a dehumidifier for drying clothes', text: 'Practical setup guidance for getting better results from the same appliance.' }
      ]
    },
    '/savings/loft-insulation-savings/': {
      heading: 'Best next steps after loft insulation savings',
      intro: 'Loft insulation is usually part of a wider heat-loss or payback decision.',
      links: [
        { href: '/savings/cavity-wall-insulation-savings/', eyebrow: 'Next insulation route', title: 'Cavity wall insulation savings', text: 'Useful if the loft is not the only likely heat-loss problem in the home.' },
        { href: '/guides/payback-vs-comfort-upgrades/', eyebrow: 'Judge the return', title: 'Payback vs comfort upgrades', text: 'Read this when the headline payback does not fully capture the decision.' },
        { href: '/methodology/', eyebrow: 'Assumptions', title: 'How the savings estimates work', text: 'See how the UK-focused saving and payback assumptions are built.' }
      ]
    },
    '/sizing/heater-room-size-calculator/': {
      heading: 'Best next steps after the heater size result',
      intro: 'Once the likely heat requirement is clearer, move into cost or comparison rather than guessing from style alone.',
      links: [
        { href: '/running-costs/electric-heater-running-cost/', eyebrow: 'Cost it', title: 'Electric heater running cost', text: 'Estimate what the sized heater is likely to cost in real use.' },
        { href: '/compare/heating-option-comparison/', eyebrow: 'Choose between types', title: 'Heating option comparison', text: 'Use this to compare heater styles once the room size is not the main unknown.' },
        { href: '/sizing/radiator-size-by-room/', eyebrow: 'Broader sizing route', title: 'Radiator size by room', text: 'Helpful if the decision is shifting towards fixed heating rather than portable room heat.' }
      ]
    },
    '/compare/heating-option-comparison/': {
      heading: 'Best next steps after the heating comparison result',
      intro: 'A verdict is more useful when you can sanity-check both the room fit and the cost baseline.',
      links: [
        { href: '/sizing/heater-room-size-calculator/', eyebrow: 'Check room fit', title: 'Heater room size calculator', text: 'Use this when the chosen heater style still feels marginal for the room.' },
        { href: '/running-costs/electric-heater-running-cost/', eyebrow: 'Check the bill impact', title: 'Electric heater running cost', text: 'Get a more direct cost read for the option you are leaning towards.' },
        { href: '/compare/oil-radiator-vs-fan-heater/', eyebrow: 'Read a focused verdict', title: 'Oil radiator vs fan heater', text: 'Use a narrower comparison page when you already know the two main candidates.' }
      ]
    }
  };

  function renderRelatedPathways() {
    const mount = document.getElementById('main-content');
    if (!mount || !pageConfig.path) return;
    const config = relatedPathways[pageConfig.path] || relatedPathways[pageConfig.canonical || ''];
    if (!config || pageConfig.path === '/contact/' || pageConfig.path === '/privacy/' || pageConfig.path === '/terms/' || pageConfig.path === '/about/' || pageConfig.path === '/404.html') return;

    const section = document.createElement('section');
    section.className = 'page-section pathways-section';
    section.innerHTML = `
      <div class="container">
        <div class="pathways-panel">
          <div class="section-head">
            <div>
              <h2>${config.heading}</h2>
              <p>${config.intro}</p>
            </div>
          </div>
          <div class="pathways-grid">
            ${config.links.map((link) => `
              <a class="pathway-link-card" href="${link.href}" data-track-link>
                <span class="eyebrow">${link.eyebrow}</span>
                <strong>${link.title}</strong>
                <span>${link.text}</span>
              </a>`).join('')}
          </div>
          ${config.note ? `<p class="pathways-note">${config.note}</p>` : ''}
        </div>
      </div>`;
    mount.appendChild(section);
  }

  function upsertMeta(name, content, attribute = 'name') {
    let element = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  }

  function removeMeta(name, attribute = 'name') {
    const element = document.querySelector(`meta[${attribute}="${name}"]`);
    if (element) element.remove();
  }

  function setDocumentMeta() {
    if (pageConfig.title) {
      document.title = pageConfig.title;
      upsertMeta('og:title', pageConfig.title, 'property');
      upsertMeta('twitter:title', pageConfig.title);
    }
    if (pageConfig.description) {
      upsertMeta('description', pageConfig.description);
      upsertMeta('og:description', pageConfig.description, 'property');
      upsertMeta('twitter:description', pageConfig.description);
    }
    upsertMeta('og:type', pageConfig.ogType || 'website', 'property');
    upsertMeta('og:url', canonicalUrl, 'property');
    upsertMeta('og:site_name', 'Home Energy Scout', 'property');
    upsertMeta('og:locale', 'en_GB', 'property');
    upsertMeta('og:image', socialImageUrl, 'property');
    upsertMeta('og:image:alt', socialImageAlt, 'property');
    upsertMeta('og:image:width', '1200', 'property');
    upsertMeta('og:image:height', '630', 'property');
    upsertMeta('twitter:card', 'summary_large_image');
    upsertMeta('twitter:image', socialImageUrl);
    upsertMeta('twitter:image:alt', socialImageAlt);
    if (pageConfig.twitterHandle) {
      upsertMeta('twitter:site', pageConfig.twitterHandle);
    } else {
      removeMeta('twitter:site');
    }
    upsertMeta('author', 'Home Energy Scout');
    upsertMeta('application-name', 'Home Energy Scout');
    upsertMeta('theme-color', '#0f172a');
    upsertMeta('robots', shouldIndex ? 'index,follow,max-image-preview:large' : 'noindex,follow,noarchive,max-image-preview:large');

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }

  function renderHeader() {
    const mount = document.getElementById('site-header');
    if (!mount) return;
    if (mount.childElementCount) return;
    const navItems = navigation
      .map(
        (item) =>
          `<a href="${item.href}" ${
            item.key === pageConfig.navKey ? 'aria-current="page"' : ''
          } data-track-link>${item.label}</a>`
      )
      .join('');
    const utilityItems = utilityNav
      .map((item) => `<a href="${item.href}" data-track-link>${item.label}</a>`)
      .join('');
    mount.innerHTML = `
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

  function renderBreadcrumbs() {
    const mount = document.getElementById('breadcrumbs');
    if (!mount || !pageConfig.breadcrumbs || !pageConfig.breadcrumbs.length) return;
    if (mount.childElementCount) return;
    const items = [{ label: 'Home', href: '/' }, ...pageConfig.breadcrumbs];
    mount.innerHTML = `
      <nav class="breadcrumbs container" aria-label="Breadcrumb">
        <ol>
          ${items
            .map(
              (item, index) => `<li>${
                index === items.length - 1
                  ? `<span aria-current="page">${item.label}</span>`
                  : `<a href="${item.href}" data-track-link>${item.label}</a>`
              }</li>`
            )
            .join('')}
        </ol>
      </nav>`;
  }

  function renderFooter() {
    const mount = document.getElementById('site-footer');
    if (!mount) return;
    if (mount.childElementCount) return;
    mount.innerHTML = `
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

  function toggleScrolledState() {
    const root = document.documentElement;
    if (window.scrollY > 16) {
      root.classList.add('is-scrolled');
    } else {
      root.classList.remove('is-scrolled');
    }
  }

  function upsertJsonLd(id, data) {
    let node = document.getElementById(id);
    if (!node) {
      node = document.createElement('script');
      node.type = 'application/ld+json';
      node.id = id;
      document.head.appendChild(node);
    }
    node.textContent = JSON.stringify(data);
  }

  function extractFaqSchema() {
    const items = Array.from(document.querySelectorAll('details.faq-item')).map((item) => {
      const question = item.dataset.question || item.querySelector('summary')?.textContent?.trim();
      const answer = item.querySelector('.faq-body')?.textContent?.trim();
      if (!question || !answer) return null;
      return {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer.replace(/\s+/g, ' ').trim()
        }
      };
    }).filter(Boolean);
    if (!items.length) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items
    };
  }

  function getSchemaPageType() {
    if (pageConfig.schemaType) return pageConfig.schemaType;
    switch (pageConfig.path) {
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

  function renderSchema() {
    if (pageConfig.noindex || !pageConfig.title || !pageConfig.description) return;
    if (document.getElementById('hes-page-schema')) return;

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
      '@type': getSchemaPageType(),
      '@id': `${canonicalUrl}#webpage`,
      name: pageConfig.title,
      description: pageConfig.description,
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

    if (pageConfig.breadcrumbs && pageConfig.breadcrumbs.length) {
      pageNode.breadcrumb = { '@id': `${canonicalUrl}#breadcrumbs` };
    }

    if (pageConfig.pageType === 'calculator') {
      pageNode.mainEntity = { '@id': `${canonicalUrl}#calculator` };
    }

    graph.push(pageNode);

    if (pageConfig.pageType === 'calculator') {
      graph.push({
        '@type': 'SoftwareApplication',
        '@id': `${canonicalUrl}#calculator`,
        name: document.querySelector('h1')?.textContent?.trim() || pageConfig.title,
        description: pageConfig.description,
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

    if (pageConfig.breadcrumbs && pageConfig.breadcrumbs.length) {
      const items = [{ label: 'Home', href: '/' }, ...pageConfig.breadcrumbs].map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: `${baseUrl}${item.href}`
      }));
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumbs`,
        itemListElement: items
      });
    }

    const faqSchema = extractFaqSchema();
    if (faqSchema) {
      graph.push({
        ...faqSchema,
        '@id': `${canonicalUrl}#faq`
      });
    }

    if (Array.isArray(pageConfig.schema)) {
      pageConfig.schema.forEach((schema) => graph.push(schema));
    }

    const seen = new Set();
    const dedupedGraph = graph.filter((item) => {
      const type = Array.isArray(item['@type']) ? item['@type'].join('|') : item['@type'];
      const identity = item['@id'] || item.url || item.name || JSON.stringify(item);
      const key = `${type}|${identity}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    upsertJsonLd('hes-page-schema', { '@context': 'https://schema.org', '@graph': dedupedGraph });
  }

  window.dataLayer = window.dataLayer || [];
  window.homeEnergyScout = window.homeEnergyScout || {
    queue: [],
    track(eventName, payload) {
      const eventPayload = { event: eventName, page: pageConfig.path, ...payload, timestamp: new Date().toISOString() };
      this.queue.push(eventPayload);
      window.dataLayer.push(eventPayload);
      if (window.console && typeof window.console.debug === 'function') {
        console.debug('[Home Energy Scout event]', eventName, payload);
      }
    }
  };

  function addFaqTracking() {
    document.querySelectorAll('details.faq-item').forEach((item) =>
      item.addEventListener('toggle', () => {
        if (item.open) {
          window.homeEnergyScout.track('faq_toggle', {
            question: item.dataset.question || item.querySelector('summary')?.textContent?.trim() || 'FAQ',
            page: pageConfig.path
          });
        }
      })
    );
  }

  function getLinkContext(link) {
    if (link.dataset.trackContext) return link.dataset.trackContext;

    const contexts = [
      ['.nav-links', 'primary-nav'],
      ['.nav-utility', 'utility-nav'],
      ['.breadcrumbs', 'breadcrumbs'],
      ['.hero-panel, .page-hero-panel', 'hero'],
      ['.button-row', 'button-row'],
      ['.result-route-grid', 'calculator-result-route'],
      ['.result-next', 'calculator-next-step'],
      ['.section-index', 'section-index'],
      ['.link-grid', 'link-grid'],
      ['.related-list', 'sidebar-related'],
      ['.pathways-panel', 'pathways'],
      ['.site-footer', 'footer']
    ];

    const matched = contexts.find(([selector]) => link.closest(selector));
    return matched ? matched[1] : 'page-link';
  }

  function getLinkSectionHeading(link) {
    const container = link.closest('section, article, aside, nav, header, footer, .result-panel, .pathways-panel');
    if (!container) return '';

    const heading = container.querySelector('h1, h2, h3');
    return heading ? heading.textContent.trim() : '';
  }

  function getLinkPosition(link) {
    const scope =
      link.closest('.nav-links, .nav-utility, .breadcrumbs, .button-row, .result-route-grid, .result-next, .section-index, .link-grid, .related-list, .pathways-panel, .site-footer') ||
      document;
    const links = Array.from(scope.querySelectorAll('a[data-track-link]'));
    const index = links.indexOf(link);
    return index >= 0 ? index + 1 : undefined;
  }

  function addInternalLinkTracking() {
    document.querySelectorAll('a[data-track-link]').forEach((link) =>
      link.addEventListener('click', () =>
        window.homeEnergyScout.track('internal_related_click', {
          target: link.getAttribute('href'),
          label: link.textContent.trim(),
          context: getLinkContext(link),
          sectionHeading: getLinkSectionHeading(link),
          position: getLinkPosition(link),
          page: pageConfig.path
        })
      )
    );
  }

  function addAdSlotTracking() {
    if (!('IntersectionObserver' in window)) return;
    const observed = new WeakSet();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !observed.has(entry.target)) {
          observed.add(entry.target);
          window.homeEnergyScout.track('ad_slot_viewable', {
            slotLabel: entry.target.getAttribute('aria-label') || 'Future advertising placement',
            page: pageConfig.path
          });
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.ad-slot').forEach((slot) => observer.observe(slot));
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 2
    }).format(value);
  }

  function formatNumber(value, digits = 1) {
    return new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    }).format(value);
  }

  function readNumber(form, name) {
    const field = form.querySelector(`[name="${name}"]`);
    const raw = field?.value ?? '';
    if (raw === '') return 0;
    const value = Number(raw);
    return Number.isFinite(value) ? value : 0;
  }

  function formatValue(value, suffix = '') {
    if (value === undefined || value === null || value === '') return '-';
    return `${value}${suffix}`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function clearFieldErrors(form) {
    form.querySelectorAll('.field-error').forEach((node) => node.remove());
    form.querySelectorAll('.field.has-error').forEach((node) => node.classList.remove('has-error'));
    const summary = form.querySelector('.form-errors');
    if (summary) summary.remove();
  }

  function applyFieldErrors(form, errors) {
    clearFieldErrors(form);
    if (!errors.length) return null;
    const summary = document.createElement('div');
    summary.className = 'form-errors';
    summary.setAttribute('role', 'alert');
    summary.tabIndex = -1;
    summary.innerHTML = `<strong>Check these inputs:</strong><ul>${errors.map((error) => `<li>${escapeHtml(error.message)}</li>`).join('')}</ul>`;
    form.prepend(summary);
    errors.forEach((error) => {
      const field = form.querySelector(`[name="${error.field}"]`);
      if (!field) return;
      const wrapper = field.closest('.field') || field.parentElement;
      if (wrapper) wrapper.classList.add('has-error');
      const hint = document.createElement('p');
      hint.className = 'field-error';
      hint.textContent = error.message;
      field.insertAdjacentElement('afterend', hint);
      field.setAttribute('aria-invalid', 'true');
    });
    return summary;
  }

  function clearInvalidState(form) {
    form.querySelectorAll('[aria-invalid="true"]').forEach((field) => field.removeAttribute('aria-invalid'));
  }

  function createRoute(href, label, text, eyebrow = 'Best next click') {
    return { href, label, text, eyebrow };
  }

  function renderRouteCards(routes) {
    if (!routes?.length) return '';

    return `
      <div class="result-routes">
        <h3>Best next clicks</h3>
        <div class="result-route-grid">
          ${routes
            .map(
              (route) => `
            <a class="result-route-card" href="${route.href}" data-track-link data-track-context="calculator-result-route">
              <span class="eyebrow">${escapeHtml(route.eyebrow || 'Best next click')}</span>
              <strong>${escapeHtml(route.label)}</strong>
              <span>${escapeHtml(route.text)}</span>
            </a>`
            )
            .join('')}
        </div>
      </div>`;
  }

  function renderResult(panel, result, origin = 'submit') {
    panel.dataset.state = 'ready';
    panel.setAttribute('aria-busy', 'false');
    panel.innerHTML = `
      <span class="result-banner">Estimate ready</span>
      <p class="result-lead">${escapeHtml(result.answer)}</p>
      <div class="result-grid">
        ${result.stats
          .map(
            ([label, value]) => `
          <div class="result-stat">
            <span class="result-label">${escapeHtml(label)}</span>
            <span class="result-value">${escapeHtml(value)}</span>
          </div>`
          )
          .join('')}
      </div>
      ${result.assumptions?.length ? `<div class="result-assumptions"><ul>${result.assumptions.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>` : ''}
      <div class="result-interpretation">
        <h3>What this means</h3>
        <p>${escapeHtml(result.interpretation)}</p>
      </div>
      ${result.nextSteps?.length ? `<div class="result-next"><h3>What to do next</h3><ul>${result.nextSteps.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>` : ''}
      ${renderRouteCards(result.nextRoutes)}
      <div class="result-note">${escapeHtml(result.note)}</div>`;
    if (origin === 'submit') panel.focus();
  }

  function renderValidationState(panel, message) {
    panel.dataset.state = 'invalid';
    panel.setAttribute('aria-busy', 'false');
    panel.innerHTML = `
      <span class="result-banner result-banner--warning">Check the inputs</span>
      <p class="result-lead">${escapeHtml(message)}</p>
      <p class="result-helper">Use realistic values and keep the room, usage and tariff inputs aligned with how you actually use the appliance or heater.</p>`;
  }

  function applianceCalculator(form) {
    const watts = readNumber(form, 'watts');
    const minutesPerUse = readNumber(form, 'minutesPerUse');
    const usesPerWeek = readNumber(form, 'usesPerWeek');
    const tariff = readNumber(form, 'tariffPence') / 100;
    const standbyWatts = readNumber(form, 'standbyWatts');
    const standbyHoursPerDay = readNumber(form, 'standbyHoursPerDay');

    const kwhPerUse = (watts / 1000) * (minutesPerUse / 60);
    const costPerUse = kwhPerUse * tariff;
    const weeklyKwh = kwhPerUse * usesPerWeek;
    const annualKwh = weeklyKwh * 52;
    const annualStandbyKwh = standbyWatts > 0 ? (standbyWatts / 1000) * standbyHoursPerDay * 365 : 0;
    const annualStandbyCost = annualStandbyKwh * tariff;
    const annualCost = annualKwh * tariff + annualStandbyCost;
    const monthlyCost = annualCost / 12;
    const intensity =
      annualCost < 30
        ? 'This is a light-use cost for most households.'
        : annualCost < 120
        ? 'This sits in the middle of the usual household range.'
        : 'This is a noticeable running cost, especially if the appliance is used more often than average.';

    return {
      answer: `${formatCurrency(costPerUse)} per use, about ${formatCurrency(monthlyCost)} per month, and roughly ${formatCurrency(annualCost)} per year with your current inputs.`,
      stats: [
        ['Cost per use', formatCurrency(costPerUse)],
        ['Monthly estimate', formatCurrency(monthlyCost)],
        ['Yearly estimate', formatCurrency(annualCost)],
        ['Yearly electricity use', `${formatNumber(annualKwh, 1)} kWh`]
      ],
      interpretation: `${intensity}${annualStandbyCost > 1 ? ` Around ${formatCurrency(annualStandbyCost)} a year comes from standby alone.` : ''} Changing the tariff or the number of uses per week usually shifts the answer more than small wattage differences.`,
      assumptions: [
        `Tariff used: ${formatValue(readNumber(form, 'tariffPence'), 'p/kWh')}`,
        `Typical use pattern: ${formatValue(minutesPerUse, ' minutes per use')} and ${formatValue(usesPerWeek, ' uses per week')}`,
        standbyWatts > 0 ? `Standby included at ${formatValue(standbyWatts, 'W')} for ${formatValue(standbyHoursPerDay, ' hours a day')}` : 'No standby load included'
      ],
      nextSteps: [
        'Compare the result with a dedicated appliance page if cycle type matters, such as tumble dryers or dishwashers.',
        'If the yearly cost looks high, check whether standby or long usage time is doing most of the damage.'
      ],
      nextRoutes: [
        createRoute('/running-costs/', 'Browse dedicated running-cost pages', 'Move from a generic estimate into the most relevant dedicated appliance cost route.', 'Go broader'),
        createRoute('/compare/repair-vs-replace-old-appliance/', 'Repair vs replace old appliance', 'Use this when the annual cost is high enough to make replacement worth considering.', 'Make a decision'),
        createRoute('/methodology/', 'Check how the estimate works', 'Sense-check the assumptions before treating this as a replacement or budgeting decision.', 'Review the logic')
      ],
      note: 'Formula used: (watts / 1000) x hours used x tariff. Standby is added separately when entered.',
      tracking: {
        tool: 'appliance_running_cost',
        annualCost: Number(annualCost.toFixed(2))
      }
    };
  }

  function heaterCalculator(form) {
    const watts = readNumber(form, 'watts');
    const hoursPerDay = readNumber(form, 'hoursPerDay');
    const daysPerWeek = readNumber(form, 'daysPerWeek');
    const tariff = readNumber(form, 'tariffPence') / 100;
    const dutyCycle = Math.max(0.1, Math.min(1, readNumber(form, 'dutyCycle') / 100));
    const heaterType = form.querySelector('[name="heaterType"]')?.value || 'Electric heater';

    const fullPowerDailyCost = (watts / 1000) * hoursPerDay * tariff;
    const dailyCost = fullPowerDailyCost * dutyCycle;
    const weeklyCost = dailyCost * daysPerWeek;
    const annualCost = weeklyCost * 52;
    const monthlyCost = annualCost / 12;

    let scenario = 'For steady all-evening use, electric heating costs add up quickly.';
    if (dutyCycle <= 0.55) {
      scenario = 'This assumes the heater cycles down for a fair part of the time, which is more realistic in a warmed-up room than running flat out throughout.';
    } else if (dutyCycle >= 0.9) {
      scenario = 'This is close to full-power operation. That can happen in a cold room, with doors open, or when a heater is too small for the space.';
    }

    return {
      answer: `${formatCurrency(dailyCost)} per day and about ${formatCurrency(annualCost)} per year at your chosen usage pattern.`,
      stats: [
        ['Daily estimate', formatCurrency(dailyCost)],
        ['Weekly estimate', formatCurrency(weeklyCost)],
        ['Monthly estimate', formatCurrency(monthlyCost)],
        ['Flat-out cost per day', formatCurrency(fullPowerDailyCost)]
      ],
      interpretation: `${heaterType} uses electricity at the same cost per kWh as any other electric resistance heater. The main difference is how long it stays near full power and how well it suits the room. ${scenario}`,
      assumptions: [
        `Tariff used: ${formatValue(readNumber(form, 'tariffPence'), 'p/kWh')}`,
        `Usage pattern: ${formatValue(hoursPerDay, ' hours a day')} for ${formatValue(daysPerWeek, ' days a week')}`,
        `Average output factor: ${formatValue(Math.round(dutyCycle * 100), '%')}`
      ],
      nextSteps: [
        'If the cost looks steep, check whether the heater is oversized for the job or running in a poorly insulated room.',
        'Use the room-size calculator before comparing heater styles or brands.'
      ],
      nextRoutes: [
        createRoute('/sizing/heater-room-size-calculator/', 'Check the room size first', 'Make sure the heater and room are actually a sensible match before comparing models.', 'Check the fit'),
        createRoute('/compare/heating-option-comparison/', 'Compare heater types', 'Use the same room and usage pattern to see which heating style is likely to suit better.', 'Compare options'),
        createRoute('/compare/oil-radiator-vs-fan-heater/', 'Read a focused heater verdict', 'Move to a narrower comparison when the shortlist is already down to common room-heating options.', 'Get a verdict')
      ],
      note: `This result uses a ${Math.round(dutyCycle * 100)}% average output factor. At 100%, the heater would cost ${formatCurrency(fullPowerDailyCost)} per day for the same hours.`,
      tracking: {
        tool: 'electric_heater_running_cost',
        annualCost: Number(annualCost.toFixed(2)),
        dutyCycle: Math.round(dutyCycle * 100)
      }
    };
  }

  function dehumidifierCalculator(form) {
    const watts = readNumber(form, 'watts');
    const hoursPerDay = readNumber(form, 'hoursPerDay');
    const daysPerWeek = readNumber(form, 'daysPerWeek');
    const tariff = readNumber(form, 'tariffPence') / 100;
    const targetMode = form.querySelector('[name="usageMode"]')?.value || 'general';
    const extractionLitres = readNumber(form, 'extractionLitres');

    const dailyKwh = (watts / 1000) * hoursPerDay;
    const dailyCost = dailyKwh * tariff;
    const weeklyCost = dailyCost * daysPerWeek;
    const annualCost = weeklyCost * 52;
    const monthlyCost = annualCost / 12;
    const litresPerHour = extractionLitres > 0 && hoursPerDay > 0 ? extractionLitres / hoursPerDay : 0;

    let interpretation = 'For general damp control, a mid-size compressor dehumidifier often lands in the low-to-middle running-cost range compared with direct electric heating.';
    if (targetMode === 'laundry') {
      interpretation = 'For drying clothes indoors, a dehumidifier is often cheaper to run than adding extra electric heat, but it may take longer than a tumble dryer and works best in a closed room.';
    } else if (targetMode === 'persistent-damp') {
      interpretation = 'If the unit needs to run for long stretches because the room stays cold or damp, the yearly cost becomes noticeable and it is worth checking whether ventilation, insulation or heating patterns are part of the problem.';
    }

    return {
      answer: `${formatCurrency(dailyCost)} per day, about ${formatCurrency(monthlyCost)} per month, and roughly ${formatCurrency(annualCost)} per year with this dehumidifier usage pattern.`,
      stats: [
        ['Daily estimate', formatCurrency(dailyCost)],
        ['Weekly estimate', formatCurrency(weeklyCost)],
        ['Yearly estimate', formatCurrency(annualCost)],
        ['Daily electricity use', `${formatNumber(dailyKwh, 1)} kWh`]
      ],
      interpretation: `${interpretation}${litresPerHour > 0 ? ` At your chosen inputs, the unit is set up to remove roughly ${formatNumber(litresPerHour, 1)} litres per hour while it is running.` : ''}`,
      assumptions: [
        `Tariff used: ${formatValue(readNumber(form, 'tariffPence'), 'p/kWh')}`,
        `Runtime used: ${formatValue(hoursPerDay, ' hours a day')} for ${formatValue(daysPerWeek, ' days a week')}`,
        extractionLitres > 0 ? `Daily moisture removal target entered: ${formatValue(extractionLitres, ' litres')}` : 'No daily moisture-removal target entered'
      ],
      nextSteps: [
        'If you are mainly drying clothes, compare this result with a heated airer or tumble dryer route.',
        'If runtime is long because the room stays damp, check insulation, background heat and ventilation rather than only appliance cost.'
      ],
      nextRoutes:
        targetMode === 'laundry'
          ? [
              createRoute('/compare/heated-airer-vs-dehumidifier/', 'Compare with a heated airer', 'See whether the lower-cost drying route still suits the room and your routine.', 'Compare drying methods'),
              createRoute('/compare/dehumidifier-vs-heating-to-dry-clothes/', 'Compare with extra heating', 'Useful when the real question is whether more background heat would work out better.', 'Compare methods'),
              createRoute('/guides/dehumidifier-for-drying-clothes/', 'Use a dehumidifier better for laundry', 'Tighten setup and room use before assuming the appliance itself is the problem.', 'Improve setup')
            ]
          : [
              createRoute('/sizing/dehumidifier-size-by-room/', 'Check dehumidifier size by room', 'Weak performance is often a capacity problem before it is a cost problem.', 'Check capacity'),
              createRoute('/compare/dehumidifier-vs-heating-to-dry-clothes/', 'Compare against heating', 'Useful if damp control and drying are both pushing up runtime.', 'Compare methods'),
              createRoute('/guides/dehumidifier-for-drying-clothes/', 'Read the practical setup guide', 'Use this when runtime feels high and you want better real-world results from the same unit.', 'Use it better')
            ],
      note: 'Formula used: (watts / 1000) x hours per day x tariff. The result does not include any indirect heating effect from the unit itself.',
      tracking: {
        tool: 'dehumidifier_running_cost',
        annualCost: Number(annualCost.toFixed(2))
      }
    };
  }

  function loftInsulationCalculator(form) {
    const annualHeatingCost = readNumber(form, 'annualHeatingCost');
    const currentDepth = readNumber(form, 'currentDepth');
    const topUpCost = readNumber(form, 'upgradeCost');
    const homeType = form.querySelector('[name="homeType"]')?.value || 'semi';
    const heatingFuel = form.querySelector('[name="heatingFuel"]')?.value || 'gas';

    let savingRate = 0.11;
    if (currentDepth >= 250) {
      savingRate = 0.03;
    } else if (currentDepth >= 150) {
      savingRate = 0.06;
    } else if (currentDepth >= 100) {
      savingRate = 0.08;
    } else if (currentDepth >= 50) {
      savingRate = 0.1;
    } else {
      savingRate = 0.13;
    }

    if (homeType === 'detached') savingRate += 0.015;
    if (homeType === 'flat') savingRate -= 0.03;
    if (heatingFuel === 'electric') savingRate += 0.025;
    if (heatingFuel === 'heat-pump') savingRate -= 0.015;

    savingRate = Math.max(0.02, Math.min(0.18, savingRate));
    const annualSaving = annualHeatingCost * savingRate;
    const monthlySaving = annualSaving / 12;
    const simplePayback = annualSaving > 0 ? topUpCost / annualSaving : 0;

    let verdict = 'This looks like a sensible top-up rather than a dramatic bill-cutting project.';
    if (simplePayback > 0 && simplePayback <= 4) {
      verdict = 'This looks strong on simple payback terms, especially if the loft is currently under-insulated.';
    } else if (simplePayback > 8) {
      verdict = 'This still may be worthwhile for comfort and slower heat loss, but the financial payback is likely to feel slower.';
    }

    return {
      answer: `A rough saving of ${formatCurrency(annualSaving)} a year, with simple payback in about ${formatNumber(simplePayback, 1)} years at your chosen installation cost.`,
      stats: [
        ['Yearly saving', formatCurrency(annualSaving)],
        ['Monthly saving', formatCurrency(monthlySaving)],
        ['Saving rate used', `${formatNumber(savingRate * 100, 1)}%`],
        ['Simple payback', `${formatNumber(simplePayback, 1)} years`]
      ],
      interpretation: `${verdict} The biggest drivers are how little insulation is there now, how much you already spend on heating, and whether the loft is easy to top up without awkward access or remedial work.`,
      assumptions: [
        `Annual heating spend entered: ${formatCurrency(annualHeatingCost)}`,
        `Current loft insulation depth: ${formatValue(currentDepth, 'mm')}`,
        `Simple install cost used for payback: ${formatCurrency(topUpCost)}`
      ],
      nextSteps: [
        'Use the payback as a rough sorting tool, then sense-check the job against access, disruption and comfort gains.',
        'If the payback looks weak, it may still be worth doing when the loft is clearly under-insulated or already being accessed for other work.'
      ],
      nextRoutes: [
        createRoute('/guides/payback-vs-comfort-upgrades/', 'Judge payback against comfort', 'Use this when the financial case is not clear-cut but the loft still feels like a practical weak point.', 'Interpret the result'),
        createRoute('/savings/cavity-wall-insulation-savings/', 'Compare another fabric upgrade', 'See whether another insulation route belongs on the shortlist alongside loft work.', 'Compare upgrades'),
        createRoute('/methodology/', 'Check the savings assumptions', 'Review how the saving rate and payback logic were built before treating this as a firm return.', 'Review the logic')
      ],
      note: 'This is a UK-focused estimate using annual heating spend as the baseline. It is intended for rough direction, not a quote or a substitute for a survey.',
      tracking: {
        tool: 'loft_insulation_savings',
        annualSaving: Number(annualSaving.toFixed(2)),
        paybackYears: Number(simplePayback.toFixed(1))
      }
    };
  }

  function ledLightingCalculator(form) {
    const bulbCount = readNumber(form, 'bulbCount');
    const oldWatts = readNumber(form, 'oldWatts');
    const ledWatts = readNumber(form, 'ledWatts');
    const hoursPerDay = readNumber(form, 'hoursPerDay');
    const tariff = readNumber(form, 'tariffPence') / 100;
    const replacementCost = readNumber(form, 'replacementCost');

    const wattsSavedPerBulb = Math.max(0, oldWatts - ledWatts);
    const dailyKwhSaved = (wattsSavedPerBulb * bulbCount * hoursPerDay) / 1000;
    const annualKwhSaved = dailyKwhSaved * 365;
    const annualSaving = annualKwhSaved * tariff;
    const monthlySaving = annualSaving / 12;
    const simplePayback = annualSaving > 0 ? replacementCost / annualSaving : 0;

    let verdict = 'This looks like a sensible quick-win saving, especially if these bulbs are used most evenings.';
    if (annualSaving >= 75 && simplePayback > 0 && simplePayback <= 2) {
      verdict = 'This looks strong financially. Regularly used halogen-style lighting often pays back quickly once switched to LED.';
    } else if (annualSaving < 20) {
      verdict = 'This is still a real saving, but it looks more like a tidy-up upgrade than a major bill-cutting move.';
    }

    const paybackLabel = annualSaving > 0 ? `${formatNumber(simplePayback, 1)} years` : 'No financial payback';

    return {
      answer: `A swap like this could save about ${formatCurrency(annualSaving)} a year, with simple payback in roughly ${paybackLabel.toLowerCase()}.`,
      stats: [
        ['Yearly saving', formatCurrency(annualSaving)],
        ['Monthly saving', formatCurrency(monthlySaving)],
        ['Electricity saved', `${formatNumber(annualKwhSaved, 1)} kWh/year`],
        ['Simple payback', paybackLabel]
      ],
      interpretation: `${verdict} The strongest LED cases are nearly always the fittings that stay on for hours at a time, not the bulbs in rooms used only occasionally.`,
      assumptions: [
        `Bulbs compared: ${formatNumber(bulbCount, 0)} fittings`,
        `Old vs new wattage: ${formatValue(oldWatts, 'W')} down to ${formatValue(ledWatts, 'W')}`,
        `Runtime used: ${formatValue(hoursPerDay, ' hours a day')} at ${formatValue(readNumber(form, 'tariffPence'), 'p/kWh')}`
      ],
      nextSteps: [
        'Use the result to prioritise the highest-use rooms first rather than trying to swap every low-use bulb immediately.',
        'If the payback looks modest, compare it with other low-cost routes such as draught proofing before spending more on slower upgrades.'
      ],
      nextRoutes: [
        createRoute('/savings/draught-proofing-savings/', 'Compare another quick-payback route', 'Useful when you want to judge whether another lower-cost upgrade deserves attention first.', 'Compare quick wins'),
        createRoute('/savings/loft-insulation-savings/', 'Compare against a bigger upgrade', 'See how this quick lighting payback stacks up against a larger fabric-improvement decision.', 'Compare payback'),
        createRoute('/methodology/', 'Check the savings assumptions', 'Review why this calculator is strongest when runtime is clear and the bulbs are used regularly.', 'Review the logic')
      ],
      note: 'This LED estimate assumes the old bulbs and the replacement LEDs are used for the same hours. It is strongest for regularly used rooms and much weaker for occasional-use fittings.',
      tracking: {
        tool: 'led_lighting_savings',
        annualSaving: Number(annualSaving.toFixed(2)),
        paybackYears: Number((annualSaving > 0 ? simplePayback : 0).toFixed(1))
      }
    };
  }

  function oldFridgeReplacementCalculator(form) {
    const currentType = form.querySelector('[name="currentType"]')?.value || 'fridge-freezer';
    const ageBand = form.querySelector('[name="ageBand"]')?.value || '15-19';
    const usageContext = form.querySelector('[name="usageContext"]')?.value || 'main';
    const replacementKwh = readNumber(form, 'replacementKwh');
    const replacementCost = readNumber(form, 'replacementCost');
    const tariff = readNumber(form, 'tariffPence') / 100;

    const currentUseLookup = {
      undercounter: { '8-14': 220, '15-19': 310, '20+': 420 },
      'fridge-freezer': { '8-14': 320, '15-19': 430, '20+': 580 },
      large: { '8-14': 470, '15-19': 620, '20+': 820 }
    };

    let currentKwh = currentUseLookup[currentType]?.[ageBand] || 430;
    if (usageContext === 'second') currentKwh *= 0.92;

    const currentAnnualCost = currentKwh * tariff;
    const newAnnualCost = replacementKwh * tariff;
    const annualSaving = currentAnnualCost - newAnnualCost;
    const monthlySaving = annualSaving / 12;
    const simplePayback = annualSaving > 0 ? replacementCost / annualSaving : 0;

    let verdict = 'This replacement looks more like a long-term efficiency tidy-up than a fast financial win.';
    if (usageContext === 'second' && annualSaving > 0) {
      verdict = 'For a second fridge, the bigger question is often whether you need to keep one running at all, not just whether a newer one is cheaper.';
    } else if (annualSaving > 60 && simplePayback > 0 && simplePayback <= 5) {
      verdict = 'This looks reasonably strong for an appliance replacement. An older all-year fridge can justify replacement faster than many other household upgrades.';
    } else if (annualSaving <= 0) {
      verdict = 'On energy use alone, this replacement looks weak. The case would need to rest more on reliability, size, noise or food-safety concerns.';
    }

    const paybackLabel = annualSaving > 0 ? `${formatNumber(simplePayback, 1)} years` : 'No financial payback';

    return {
      answer: annualSaving > 0
        ? `Replacing this fridge could save about ${formatCurrency(annualSaving)} a year in electricity, with simple payback in roughly ${paybackLabel.toLowerCase()}.`
        : `At these inputs, the replacement does not create a strong electricity saving on its own. ${verdict}`,
      stats: [
        ['Estimated current cost', formatCurrency(currentAnnualCost)],
        ['Estimated new cost', formatCurrency(newAnnualCost)],
        ['Yearly saving', formatCurrency(annualSaving)],
        ['Simple payback', paybackLabel]
      ],
      interpretation: `${verdict} The biggest drivers are how old the current fridge is, whether it runs all year as a main appliance, and how efficient the replacement model really is on its energy label.`,
      assumptions: [
        `Current fridge estimate: ${currentType} from the ${ageBand} age band`,
        `Replacement label figure used: ${formatNumber(replacementKwh, 0)} kWh/year`,
        `Electricity rate used: ${formatValue(readNumber(form, 'tariffPence'), 'p/kWh')}`
      ],
      nextSteps: [
        'If the payback looks weak, do not force the replacement case on energy alone. Reliability and appliance condition may matter more.',
        'If this is a second fridge, question the need for an always-on spare before assuming a new one is the best answer.'
      ],
      nextRoutes: [
        createRoute('/compare/repair-vs-replace-old-appliance/', 'Broaden the replacement decision', 'Use this when repair cost, age and remaining life matter as much as the electricity saving.', 'Make the decision'),
        createRoute('/running-costs/appliance-running-cost/', 'Check another appliance baseline', 'Useful if you want to compare this fridge decision with other household running costs first.', 'Check another cost'),
        createRoute('/methodology/', 'Review the assumptions', 'See how the current-fridge estimate is built and where this tool is directional rather than exact.', 'Review the logic')
      ],
      note: 'This fridge tool estimates the old appliance from age and type, then compares it with the new model kWh figure you enter. It is most useful as a shopping or replacement filter, not a guarantee of exact annual bills.',
      tracking: {
        tool: 'old_fridge_replacement_savings',
        annualSaving: Number(annualSaving.toFixed(2)),
        paybackYears: Number((annualSaving > 0 ? simplePayback : 0).toFixed(1))
      }
    };
  }

  function heaterSizeCalculator(form) {
    const length = readNumber(form, 'roomLength');
    const width = readNumber(form, 'roomWidth');
    const height = readNumber(form, 'ceilingHeight');
    const tariff = readNumber(form, 'tariffPence') / 100;
    const hoursPerDay = readNumber(form, 'hoursPerDay');
    const insulation = form.querySelector('[name="insulation"]')?.value || 'average';
    const exposure = form.querySelector('[name="exposure"]')?.value || 'average';
    const usePattern = form.querySelector('[name="usePattern"]')?.value || 'main';

    const area = length * width;
    const volume = area * height;
    let wattsPerM3 = 45;
    if (insulation === 'good') wattsPerM3 *= 0.9;
    if (insulation === 'poor') wattsPerM3 *= 1.15;
    if (exposure === 'sheltered') wattsPerM3 *= 0.95;
    if (exposure === 'exposed') wattsPerM3 *= 1.1;
    if (usePattern === 'background') wattsPerM3 *= 0.95;
    if (usePattern === 'quick') wattsPerM3 *= 1.15;

    const suggestedWatts = Math.max(500, Math.round((volume * wattsPerM3) / 50) * 50);
    const nearestSize = Math.ceil(suggestedWatts / 250) * 250;
    const hourlyCostFullPower = (nearestSize / 1000) * tariff;
    const annualCostAtFullPower = hourlyCostFullPower * hoursPerDay * 120;
    const oversizeMargin = nearestSize - suggestedWatts;
    let fitText = `A heater around ${nearestSize}W is the nearest common size above the estimate.`;
    if (oversizeMargin >= 400) {
      fitText = `The estimate sits between common sizes, so a ${nearestSize}W model may be slightly oversized unless the room is cold or draughty.`;
    }

    let interpretation = 'This is a room-heating size guide, not a guarantee of comfort. Window quality, outside temperature, and how quickly you want the room warm will still matter.';
    if (suggestedWatts > 2500) {
      interpretation = 'This is a fairly high room-heating requirement. It is worth asking whether the room is poorly insulated or whether a plug-in electric heater is the right long-term approach.';
    } else if (suggestedWatts < 1000) {
      interpretation = 'This is a small or relatively easy room to heat on paper. In these rooms, oversizing can be less useful than choosing a heater with simple controls and the right use pattern.';
    }

    return {
      answer: `A room of this size likely needs about ${formatNumber(suggestedWatts, 0)}W of electric heat for normal use, with a common heater size of around ${nearestSize}W.`,
      stats: [
        ['Room area', `${formatNumber(area, 1)} m2`],
        ['Room volume', `${formatNumber(volume, 1)} m3`],
        ['Suggested heat output', `${formatNumber(suggestedWatts, 0)} W`],
        ['Full-power hourly cost', formatCurrency(hourlyCostFullPower)]
      ],
      interpretation: `${fitText} ${interpretation}`,
      assumptions: [
        `Room size used: ${formatValue(length, 'm')} x ${formatValue(width, 'm')} x ${formatValue(height, 'm')}`,
        `Context: ${insulation} insulation, ${exposure} exposure, ${usePattern} heating pattern`,
        `Electricity rate used for cost context: ${formatValue(readNumber(form, 'tariffPence'), 'p/kWh')}`
      ],
      nextSteps: [
        'Treat the wattage output as a starting point, then compare heater styles that match how you actually use the room.',
        'If the suggested size is high, check whether insulation or draughts are making electric heating a poor fit.'
      ],
      nextRoutes: [
        createRoute('/running-costs/electric-heater-running-cost/', 'Cost the suggested heater size', 'Turn the size output into a more realistic running-cost estimate for your usage pattern.', 'Cost the option'),
        createRoute('/compare/heating-option-comparison/', 'Compare heater styles for the room', 'Once the size looks sensible, use the comparison tool to pick the better fit.', 'Compare options'),
        createRoute('/sizing/radiator-size-by-room/', 'Check radiator sizing instead', 'Useful when the room may be better suited to fixed heating than a portable plug-in heater.', 'Consider fixed heating')
      ],
      note: `This estimate uses a simple room-volume method. At ${nearestSize}W for ${hoursPerDay} hours a day across a 120-day heating season, that would be about ${formatCurrency(annualCostAtFullPower)} if it stayed at full output throughout.`,
      tracking: {
        tool: 'heater_room_size',
        suggestedWatts,
        roomArea: Number(area.toFixed(1))
      }
    };
  }

  function heatingComparisonCalculator(form) {
    const optionA = form.querySelector('[name="optionA"]')?.value || 'fan';
    const optionB = form.querySelector('[name="optionB"]')?.value || 'oil';
    const roomArea = readNumber(form, 'roomArea');
    const hoursPerDay = readNumber(form, 'hoursPerDay');
    const daysPerWeek = readNumber(form, 'daysPerWeek');
    const tariff = readNumber(form, 'tariffPence') / 100;
    const useCase = form.querySelector('[name="useCase"]')?.value || 'steady';

    const presets = {
      fan: {
        label: 'Fan heater',
        watts: 2000,
        coverage: 18,
        baseDuty: { quick: 0.65, steady: 0.82, occasional: 0.45 },
        note: 'Fast warm-up, but usually less pleasant for longer steady heating.'
      },
      oil: {
        label: 'Oil-filled radiator',
        watts: 1500,
        coverage: 15,
        baseDuty: { quick: 0.8, steady: 0.58, occasional: 0.5 },
        note: 'Better fit for steadier use once the room is up to temperature.'
      },
      panel: {
        label: 'Panel heater',
        watts: 1500,
        coverage: 15,
        baseDuty: { quick: 0.78, steady: 0.63, occasional: 0.52 },
        note: 'Simple direct room heat, often chosen for fixed daily heating rather than spot heat.'
      },
      infrared: {
        label: 'Infrared heater',
        watts: 1200,
        coverage: 10,
        baseDuty: { quick: 0.48, steady: 0.5, occasional: 0.32 },
        note: 'Best for spot heat where you want to warm people or a small zone rather than the whole room.'
      }
    };

    function evaluate(key) {
      const preset = presets[key];
      const roomLoad = Math.max(0.8, Math.min(1.25, roomArea / preset.coverage));
      const duty = Math.max(0.25, Math.min(1, preset.baseDuty[useCase] * roomLoad));
      const dailyCost = (preset.watts / 1000) * hoursPerDay * tariff * duty;
      const annualCost = dailyCost * daysPerWeek * 52;
      return { ...preset, duty, dailyCost, annualCost };
    }

    const a = evaluate(optionA);
    const b = evaluate(optionB);
    const cheaper = a.annualCost <= b.annualCost ? a : b;
    const dearer = cheaper === a ? b : a;
    const diff = Math.abs(a.annualCost - b.annualCost);
    const diffPct = dearer.annualCost > 0 ? diff / dearer.annualCost : 0;
    const focusedPairRoutes = {
      'fan-oil': createRoute('/compare/oil-radiator-vs-fan-heater/', 'Read the oil radiator vs fan heater verdict', 'Use a narrower comparison page when those are the two realistic options.', 'Read the focused page'),
      'oil-panel': createRoute('/compare/panel-heater-vs-oil-radiator/', 'Read the panel heater vs oil radiator verdict', 'Useful when the shortlist is down to these steadier room-heating styles.', 'Read the focused page')
    };
    const pairKey = [optionA, optionB].sort().join('-');
    const focusedPairRoute = focusedPairRoutes[pairKey];

    let verdict = `${cheaper.label} comes out cheaper by about ${formatCurrency(diff)} a year for this room and usage pattern.`;
    if (diffPct < 0.1) {
      verdict = `There is only a small cost gap here. For this room and usage pattern, comfort, controls and how you use the heater may matter more than the headline running-cost difference.`;
    }

    let interpretation = `${a.label}: ${a.note} ${b.label}: ${b.note}`;
    if (roomArea > 18 && (optionA === 'fan' || optionB === 'fan')) {
      interpretation += ' In a larger room, a fan heater often looks less attractive for longer steady heating because it tends to spend more time near full power and can feel harsher to sit with.';
    }
    if (useCase === 'occasional' && (optionA === 'infrared' || optionB === 'infrared')) {
      interpretation += ' Infrared often looks best when you only need short bursts of local heat rather than full-room comfort.';
    }

    return {
      answer: verdict,
      stats: [
        [`${a.label} annual cost`, formatCurrency(a.annualCost)],
        [`${b.label} annual cost`, formatCurrency(b.annualCost)],
        ['Cheaper option', cheaper.label],
        ['Typical cost gap', formatCurrency(diff)]
      ],
      interpretation,
      assumptions: [
        `Room area entered: ${formatValue(roomArea, 'm2')}`,
        `Usage pattern: ${formatValue(hoursPerDay, ' hours a day')} for ${formatValue(daysPerWeek, ' days a week')}`,
        `Use case selected: ${useCase}`
      ],
      nextSteps: [
        'If the gap is small, size and comfort usually matter more than chasing the cheapest-looking annual number.',
        'Use the room-size tool first when you are not sure both heater types are actually suitable for the space.'
      ],
      nextRoutes: [
        createRoute('/sizing/heater-room-size-calculator/', 'Check room fit before deciding', 'Make sure both heater types are genuinely suitable for the space before trusting the verdict.', 'Check the fit'),
        createRoute('/running-costs/electric-heater-running-cost/', 'Cost the likely winner directly', 'Use a single-heater running-cost check once you know which option you are leaning towards.', 'Cost the winner'),
        focusedPairRoute || createRoute('/guides/electric-heating-costs-explained/', 'Read the electric heating guide', 'Use the guide when the maths is clear but the practical verdict still feels unintuitive.', 'Add context')
      ],
      note: 'This comparison uses typical wattages and usage-pattern duty-cycle assumptions. All direct electric heaters pay the same price per kWh; the main difference is how long they stay near full output and whether they suit the room and use case.',
      tracking: {
        tool: 'heating_option_comparison',
        cheaperOption: cheaper.label,
        annualGap: Number(diff.toFixed(2))
      }
    };
  }

  function heatedAirerVsTumbleDryerCalculator(form) {
    const airerWatts = readNumber(form, 'airerWatts');
    const airerHoursPerLoad = readNumber(form, 'airerHoursPerLoad');
    const tumbleKwhPerLoad = readNumber(form, 'tumbleKwhPerLoad');
    const loadsPerWeek = readNumber(form, 'loadsPerWeek');
    const tariff = readNumber(form, 'tariffPence') / 100;
    const laundryPressure = form.querySelector('[name="laundryPressure"]')?.value || 'moderate';

    const airerCostPerLoad = (airerWatts / 1000) * airerHoursPerLoad * tariff;
    const tumbleCostPerLoad = tumbleKwhPerLoad * tariff;
    const airerAnnualCost = airerCostPerLoad * loadsPerWeek * 52;
    const tumbleAnnualCost = tumbleCostPerLoad * loadsPerWeek * 52;
    const cheaperLabel = airerAnnualCost <= tumbleAnnualCost ? 'Heated airer' : 'Tumble dryer';
    const costGap = Math.abs(airerAnnualCost - tumbleAnnualCost);

    let verdict = `${cheaperLabel} comes out cheaper by about ${formatCurrency(costGap)} a year at this laundry volume.`;
    if (laundryPressure === 'high') {
      verdict += ' If you are pushing through repeated family loads, the tumble dryer may still earn its keep on speed and turnaround alone.';
    } else if (costGap >= 120) {
      verdict += ' That is a meaningful gap, so the cheaper option is likely to feel different on the bill over a full year.';
    }

    let interpretation = 'A heated airer usually wins on direct cost per load, but it trades away speed, throughput and convenience.';
    if (laundryPressure === 'low') {
      interpretation = 'For a lighter household laundry routine, the heated airer often looks good because the slower drying time is easier to live with.';
    } else if (laundryPressure === 'high') {
      interpretation = 'For a heavier weekly laundry routine, the tumble dryer can still be the better household choice even when it is clearly dearer, because repeated slow drying starts to cost time and convenience instead of just electricity.';
    }

    return {
      answer: verdict,
      stats: [
        ['Heated airer cost per load', formatCurrency(airerCostPerLoad)],
        ['Tumble dryer cost per load', formatCurrency(tumbleCostPerLoad)],
        ['Heated airer yearly cost', formatCurrency(airerAnnualCost)],
        ['Tumble dryer yearly cost', formatCurrency(tumbleAnnualCost)]
      ],
      interpretation,
      assumptions: [
        `Laundry volume used: ${formatValue(loadsPerWeek, ' loads a week')}`,
        `Heated airer setup: ${formatValue(airerWatts, 'W')} for ${formatValue(airerHoursPerLoad, ' hours per load')}`,
        `Tumble dryer figure used: ${formatValue(tumbleKwhPerLoad, ' kWh per load')} at ${formatValue(readNumber(form, 'tariffPence'), 'p/kWh')}`
      ],
      nextSteps: [
        'If the direct cost gap is large, decide whether speed and repeated-load convenience are still worth paying for.',
        'If indoor moisture is part of the problem, compare the heated airer route with a dehumidifier setup before deciding.'
      ],
      nextRoutes: [
        createRoute('/running-costs/heated-airer-running-cost/', 'Check heated airer running cost', 'Move into the dedicated airer cost page if you want to test a more specific rack routine.', 'Check the airer cost'),
        createRoute('/running-costs/tumble-dryer-running-cost/', 'Check tumble dryer running cost', 'Use the dedicated page when cycle type or dryer model changes the comparison.', 'Check the dryer cost'),
        createRoute('/compare/heated-airer-vs-dehumidifier/', 'Compare a lower-cost alternative', 'Useful when the real alternative to the airer is a dehumidifier rather than a tumble dryer.', 'Compare alternatives')
      ],
      note: 'This comparison treats both options as if they handle the same number of loads. It is strongest when your routine is consistent and weakest when one option changes how often you wash or dry clothes.',
      tracking: {
        tool: 'heated_airer_vs_tumble_dryer',
        cheaperOption: cheaperLabel,
        annualGap: Number(costGap.toFixed(2))
      }
    };
  }

  function portableAcVsFanCalculator(form) {
    const fanWatts = readNumber(form, 'fanWatts');
    const fanHoursPerDay = readNumber(form, 'fanHoursPerDay');
    const acWatts = readNumber(form, 'acWatts');
    const acHoursPerDay = readNumber(form, 'acHoursPerDay');
    const hotDaysPerYear = readNumber(form, 'hotDaysPerYear');
    const tariff = readNumber(form, 'tariffPence') / 100;
    const coolingNeed = form.querySelector('[name="coolingNeed"]')?.value || 'comfort';

    const fanDailyCost = (fanWatts / 1000) * fanHoursPerDay * tariff;
    const acDailyCost = (acWatts / 1000) * acHoursPerDay * tariff;
    const fanSeasonCost = fanDailyCost * hotDaysPerYear;
    const acSeasonCost = acDailyCost * hotDaysPerYear;
    const costGap = Math.abs(acSeasonCost - fanSeasonCost);
    const cheaperLabel = fanSeasonCost <= acSeasonCost ? 'Fan' : 'Portable AC';

    let verdict = `${cheaperLabel} is cheaper by about ${formatCurrency(costGap)} across the hot-weather season with these inputs.`;
    if (coolingNeed === 'sleep') {
      verdict += ' Bedrooms that become genuinely hard to sleep in can still justify the higher portable AC cost if airflow alone is not enough.';
    } else if (coolingNeed === 'heatwave') {
      verdict += ' If the room becomes genuinely unmanageable in heatwaves, that extra spend may still buy a meaningfully better result rather than just a nicer headline number.';
    }

    let interpretation = 'A fan is usually the cost winner because it uses far less power, but it mostly improves how the room feels rather than removing heat from it.';
    if (coolingNeed === 'work') {
      interpretation = 'For work or study spaces, the real question is whether comfort airflow is enough or whether actual temperature reduction is needed to stay productive.';
    } else if (coolingNeed === 'heatwave') {
      interpretation = 'For severe overheating, portable AC does a different job from a fan. The higher cost only makes sense when you really need cooling rather than just air movement.';
    }

    return {
      answer: verdict,
      stats: [
        ['Fan cost per hot day', formatCurrency(fanDailyCost)],
        ['Portable AC cost per hot day', formatCurrency(acDailyCost)],
        ['Fan seasonal cost', formatCurrency(fanSeasonCost)],
        ['Portable AC seasonal cost', formatCurrency(acSeasonCost)]
      ],
      interpretation,
      assumptions: [
        `Season used: ${formatValue(hotDaysPerYear, ' hot days a year')}`,
        `Fan setup: ${formatValue(fanWatts, 'W')} for ${formatValue(fanHoursPerDay, ' hours a day')}`,
        `Portable AC setup: ${formatValue(acWatts, 'W')} for ${formatValue(acHoursPerDay, ' hours a day')}`
      ],
      nextSteps: [
        'If the cost gap is huge but the room only feels mildly stuffy, try the fan-first route before spending portable AC money.',
        'If sleep, sun exposure or equipment heat make the room genuinely hard to use, judge the higher portable AC cost against the comfort problem it actually solves.'
      ],
      nextRoutes: [
        createRoute('/running-costs/appliance-running-cost/', 'Test your exact appliance wattage', 'Use the general appliance calculator if you want to model a specific fan or portable AC unit.', 'Check exact wattage'),
        createRoute('/compare/gas-vs-electric-heating/', 'Broaden the room-conditioning decision', 'Useful when your question is growing into a wider comfort and energy setup issue.', 'Broaden the decision'),
        createRoute('/methodology/', 'Review the comparison assumptions', 'Check where this is a pure cost comparison and where room experience matters more than the maths.', 'Review the logic')
      ],
      note: 'This tool compares electricity cost only. It does not assume a fan and a portable AC solve the same comfort problem equally well, which is why the verdict depends on whether you need airflow or actual cooling.',
      tracking: {
        tool: 'portable_ac_vs_fan',
        cheaperOption: cheaperLabel,
        seasonalGap: Number(costGap.toFixed(2))
      }
    };
  }


  const validators = {
    appliance(form) {
      const errors = [];
      const watts = readNumber(form, 'watts');
      const minutesPerUse = readNumber(form, 'minutesPerUse');
      const usesPerWeek = readNumber(form, 'usesPerWeek');
      const tariff = readNumber(form, 'tariffPence');
      const standbyWatts = readNumber(form, 'standbyWatts');
      const standbyHours = readNumber(form, 'standbyHoursPerDay');
      if (watts <= 0) errors.push({ field: 'watts', message: 'Enter a power rating above 0 watts.' });
      if (minutesPerUse <= 0) errors.push({ field: 'minutesPerUse', message: 'Enter a realistic time per use.' });
      if (usesPerWeek < 0) errors.push({ field: 'usesPerWeek', message: 'Uses per week cannot be negative.' });
      if (tariff <= 0) errors.push({ field: 'tariffPence', message: 'Enter an electricity rate above 0 pence per kWh.' });
      if (standbyWatts > 0 && standbyHours <= 0) errors.push({ field: 'standbyHoursPerDay', message: 'If you enter standby watts, add the standby hours per day as well.' });
      if (standbyHours > 24) errors.push({ field: 'standbyHoursPerDay', message: 'Standby hours per day cannot be more than 24.' });
      return errors;
    },
    heater(form) {
      const errors = [];
      const watts = readNumber(form, 'watts');
      const hoursPerDay = readNumber(form, 'hoursPerDay');
      const daysPerWeek = readNumber(form, 'daysPerWeek');
      const tariff = readNumber(form, 'tariffPence');
      const dutyCycle = readNumber(form, 'dutyCycle');
      if (watts <= 0) errors.push({ field: 'watts', message: 'Enter a heater wattage above 0W.' });
      if (hoursPerDay <= 0) errors.push({ field: 'hoursPerDay', message: 'Enter at least some heating time per day.' });
      if (daysPerWeek <= 0 || daysPerWeek > 7) errors.push({ field: 'daysPerWeek', message: 'Days per week should be between 1 and 7.' });
      if (tariff <= 0) errors.push({ field: 'tariffPence', message: 'Enter an electricity rate above 0 pence per kWh.' });
      if (dutyCycle <= 0 || dutyCycle > 100) errors.push({ field: 'dutyCycle', message: 'Average output should be between 1% and 100%.' });
      return errors;
    },
    dehumidifier(form) {
      const errors = [];
      const watts = readNumber(form, 'watts');
      const hoursPerDay = readNumber(form, 'hoursPerDay');
      const daysPerWeek = readNumber(form, 'daysPerWeek');
      const tariff = readNumber(form, 'tariffPence');
      const extractionLitres = readNumber(form, 'extractionLitres');
      if (watts <= 0) errors.push({ field: 'watts', message: 'Enter a dehumidifier wattage above 0W.' });
      if (hoursPerDay <= 0) errors.push({ field: 'hoursPerDay', message: 'Enter some running time per day.' });
      if (daysPerWeek <= 0 || daysPerWeek > 7) errors.push({ field: 'daysPerWeek', message: 'Days per week should be between 1 and 7.' });
      if (tariff <= 0) errors.push({ field: 'tariffPence', message: 'Enter an electricity rate above 0 pence per kWh.' });
      if (extractionLitres < 0) errors.push({ field: 'extractionLitres', message: 'Extraction amount cannot be negative.' });
      return errors;
    },
    'loft-insulation'(form) {
      const errors = [];
      const annualHeatingCost = readNumber(form, 'annualHeatingCost');
      const currentDepth = readNumber(form, 'currentDepth');
      const upgradeCost = readNumber(form, 'upgradeCost');
      if (annualHeatingCost <= 0) errors.push({ field: 'annualHeatingCost', message: 'Enter your yearly heating spend before any loft upgrade.' });
      if (currentDepth < 0) errors.push({ field: 'currentDepth', message: 'Current insulation depth cannot be negative.' });
      if (upgradeCost <= 0) errors.push({ field: 'upgradeCost', message: 'Enter an installation cost above GBP 0 to get a payback estimate.' });
      return errors;
    },
    'led-lighting'(form) {
      const errors = [];
      const bulbCount = readNumber(form, 'bulbCount');
      const oldWatts = readNumber(form, 'oldWatts');
      const ledWatts = readNumber(form, 'ledWatts');
      const hoursPerDay = readNumber(form, 'hoursPerDay');
      const tariff = readNumber(form, 'tariffPence');
      const replacementCost = readNumber(form, 'replacementCost');
      if (bulbCount <= 0) errors.push({ field: 'bulbCount', message: 'Enter how many bulbs you are comparing.' });
      if (oldWatts <= 0) errors.push({ field: 'oldWatts', message: 'Enter the wattage of the current bulbs.' });
      if (ledWatts <= 0) errors.push({ field: 'ledWatts', message: 'Enter the wattage of the LED replacement.' });
      if (oldWatts > 0 && ledWatts >= oldWatts) errors.push({ field: 'ledWatts', message: 'The LED wattage should be lower than the current bulb wattage to show a saving.' });
      if (hoursPerDay <= 0 || hoursPerDay > 24) errors.push({ field: 'hoursPerDay', message: 'Enter realistic daily use between 0 and 24 hours.' });
      if (tariff <= 0) errors.push({ field: 'tariffPence', message: 'Enter an electricity rate above 0 pence per kWh.' });
      if (replacementCost < 0) errors.push({ field: 'replacementCost', message: 'Replacement cost cannot be negative.' });
      return errors;
    },
    'old-fridge-replacement'(form) {
      const errors = [];
      const replacementKwh = readNumber(form, 'replacementKwh');
      const replacementCost = readNumber(form, 'replacementCost');
      const tariff = readNumber(form, 'tariffPence');
      if (replacementKwh <= 0) errors.push({ field: 'replacementKwh', message: 'Enter the replacement fridge label figure in kWh per year.' });
      if (replacementCost <= 0) errors.push({ field: 'replacementCost', message: 'Enter the replacement price to show a payback estimate.' });
      if (tariff <= 0) errors.push({ field: 'tariffPence', message: 'Enter an electricity rate above 0 pence per kWh.' });
      return errors;
    },
    'heater-size'(form) {
      const errors = [];
      const length = readNumber(form, 'roomLength');
      const width = readNumber(form, 'roomWidth');
      const height = readNumber(form, 'ceilingHeight');
      const tariff = readNumber(form, 'tariffPence');
      const hours = readNumber(form, 'hoursPerDay');
      if (length <= 0) errors.push({ field: 'roomLength', message: 'Enter a room length above 0 metres.' });
      if (width <= 0) errors.push({ field: 'roomWidth', message: 'Enter a room width above 0 metres.' });
      if (height < 2 || height > 4) errors.push({ field: 'ceilingHeight', message: 'Use a realistic ceiling height between 2m and 4m.' });
      if (tariff <= 0) errors.push({ field: 'tariffPence', message: 'Enter an electricity rate above 0 pence per kWh.' });
      if (hours <= 0) errors.push({ field: 'hoursPerDay', message: 'Enter some heating time per day to show the cost context.' });
      return errors;
    },
    'heating-comparison'(form) {
      const errors = [];
      const optionA = form.querySelector('[name="optionA"]')?.value;
      const optionB = form.querySelector('[name="optionB"]')?.value;
      const roomArea = readNumber(form, 'roomArea');
      const hours = readNumber(form, 'hoursPerDay');
      const days = readNumber(form, 'daysPerWeek');
      const tariff = readNumber(form, 'tariffPence');
      if (optionA === optionB) errors.push({ field: 'optionB', message: 'Choose two different heater types to make the comparison useful.' });
      if (roomArea <= 0) errors.push({ field: 'roomArea', message: 'Enter a room area above 0 square metres.' });
      if (hours <= 0) errors.push({ field: 'hoursPerDay', message: 'Enter some heating time per day.' });
      if (days <= 0 || days > 7) errors.push({ field: 'daysPerWeek', message: 'Days per week should be between 1 and 7.' });
      if (tariff <= 0) errors.push({ field: 'tariffPence', message: 'Enter an electricity rate above 0 pence per kWh.' });
      return errors;
    },
    'heated-airer-vs-tumble-dryer'(form) {
      const errors = [];
      const airerWatts = readNumber(form, 'airerWatts');
      const airerHoursPerLoad = readNumber(form, 'airerHoursPerLoad');
      const tumbleKwhPerLoad = readNumber(form, 'tumbleKwhPerLoad');
      const loadsPerWeek = readNumber(form, 'loadsPerWeek');
      const tariff = readNumber(form, 'tariffPence');
      if (airerWatts <= 0) errors.push({ field: 'airerWatts', message: 'Enter a heated airer wattage above 0W.' });
      if (airerHoursPerLoad <= 0 || airerHoursPerLoad > 24) errors.push({ field: 'airerHoursPerLoad', message: 'Use a realistic heated airer runtime between 0 and 24 hours per load.' });
      if (tumbleKwhPerLoad <= 0) errors.push({ field: 'tumbleKwhPerLoad', message: 'Enter the tumble dryer kWh figure per load.' });
      if (loadsPerWeek <= 0 || loadsPerWeek > 21) errors.push({ field: 'loadsPerWeek', message: 'Use a realistic number of loads per week.' });
      if (tariff <= 0) errors.push({ field: 'tariffPence', message: 'Enter an electricity rate above 0 pence per kWh.' });
      return errors;
    },
    'portable-ac-vs-fan'(form) {
      const errors = [];
      const fanWatts = readNumber(form, 'fanWatts');
      const fanHoursPerDay = readNumber(form, 'fanHoursPerDay');
      const acWatts = readNumber(form, 'acWatts');
      const acHoursPerDay = readNumber(form, 'acHoursPerDay');
      const hotDaysPerYear = readNumber(form, 'hotDaysPerYear');
      const tariff = readNumber(form, 'tariffPence');
      if (fanWatts <= 0) errors.push({ field: 'fanWatts', message: 'Enter a fan wattage above 0W.' });
      if (fanHoursPerDay <= 0 || fanHoursPerDay > 24) errors.push({ field: 'fanHoursPerDay', message: 'Use realistic daily fan hours between 0 and 24.' });
      if (acWatts <= 0) errors.push({ field: 'acWatts', message: 'Enter a portable AC wattage above 0W.' });
      if (acHoursPerDay <= 0 || acHoursPerDay > 24) errors.push({ field: 'acHoursPerDay', message: 'Use realistic daily portable AC hours between 0 and 24.' });
      if (hotDaysPerYear <= 0 || hotDaysPerYear > 180) errors.push({ field: 'hotDaysPerYear', message: 'Use a realistic number of warm or hot days per year.' });
      if (tariff <= 0) errors.push({ field: 'tariffPence', message: 'Enter an electricity rate above 0 pence per kWh.' });
      return errors;
    }
  };

  const calculators = {
    appliance: applianceCalculator,
    heater: heaterCalculator,
    dehumidifier: dehumidifierCalculator,
    'loft-insulation': loftInsulationCalculator,
    'led-lighting': ledLightingCalculator,
    'old-fridge-replacement': oldFridgeReplacementCalculator,
    'heater-size': heaterSizeCalculator,
    'heating-comparison': heatingComparisonCalculator,
    'heated-airer-vs-tumble-dryer': heatedAirerVsTumbleDryerCalculator,
    'portable-ac-vs-fan': portableAcVsFanCalculator
  };

  function bindCalculators() {
    document.querySelectorAll('form[data-calculator]').forEach((form) => {
      const calculatorKey = form.dataset.calculator;
      const calculator = calculators[calculatorKey];
      const validator = validators[calculatorKey];
      const panel = document.getElementById(form.dataset.resultsTarget);
      if (!calculator || !panel) return;
      panel.setAttribute('role', 'status');
      panel.setAttribute('aria-live', 'polite');
      panel.setAttribute('aria-atomic', 'true');
      panel.setAttribute('tabindex', '-1');

      const idleHtml =
        panel.innerHTML ||
        '<span class="result-banner">Waiting for inputs</span><h2>Your result</h2><p class="result-lead">Enter your details and calculate to see the cost, saving estimate, and a quick interpretation.</p>';

      const run = (origin = 'submit') => {
        panel.setAttribute('aria-busy', 'true');
        const errors = validator ? validator(form) : [];
        clearInvalidState(form);
        if (errors.length) {
          const summary = applyFieldErrors(form, errors);
          renderValidationState(panel, 'A few inputs need checking before this estimate becomes useful.');
          if (origin === 'submit') {
            summary?.focus();
            window.homeEnergyScout.track('calculator_validation_error', {
              page: pageConfig.path,
              tool: calculatorKey,
              origin,
              errorCount: errors.length
            });
          }
          return;
        }
        clearFieldErrors(form);
        const result = calculator(form);
        renderResult(panel, result, origin);
        if (origin === 'submit') {
          window.homeEnergyScout.track('calculator_result_view', {
            page: pageConfig.path,
            origin,
            ...result.tracking
          });
        }
      };

      const liveRun = (() => {
        let timer;
        return () => {
          clearTimeout(timer);
          timer = setTimeout(() => run('live'), 160);
        };
      })();

      form.addEventListener('submit', (event) => {
        event.preventDefault();
        run('submit');
      });

      form.addEventListener('reset', () =>
        setTimeout(() => {
          clearFieldErrors(form);
          clearInvalidState(form);
          panel.dataset.state = 'idle';
          panel.setAttribute('aria-busy', 'false');
          panel.innerHTML = idleHtml;
        }, 0)
      );

      form.querySelectorAll('input, select').forEach((field) => {
        field.addEventListener('change', () => {
          window.homeEnergyScout.track('calculator_input_change', {
            page: pageConfig.path,
            field: field.name
          });
          liveRun();
        });
        if (field.tagName === 'INPUT' && field.type === 'number') {
          field.addEventListener('input', liveRun);
        }
      });

      run('initial');
    });
  }

  let hasInitialised = false;

  function init() {
    if (hasInitialised) return;
    hasInitialised = true;
    setDocumentMeta();
    renderHeader();
    renderBreadcrumbs();
    renderFooter();
    renderSchema();
    renderRelatedPathways();
    toggleScrolledState();
    window.addEventListener('scroll', toggleScrolledState, { passive: true });
    addFaqTracking();
    addInternalLinkTracking();
    addAdSlotTracking();
    bindCalculators();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
