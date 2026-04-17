# Codex prompt: first deployable version of Home Energy Scout

You are taking over a real static website project that is already substantially built.

Your job is **not** to add more content topics.
Your job is to take the existing project and turn it into a **first deployable, launch-quality website** with exceptional execution standards.

## Project context
- Project name: **Home Energy Scout**
- Market: **UK-first**
- Site type: **static utility website**
- Main purpose: answer practical household energy questions around running costs, savings, sizing and comparisons
- Monetisation direction: future display ads, without ruining UX
- Current status: the site already has homepage, section hubs, trust/legal pages, 6 core calculators, and 24+ supporting pages
- Constraint: **do not expand the page footprint unless a tiny supporting asset or config file is necessary for deployment or quality**

## Your priorities
1. **Make the current site deployable**
2. **Improve launch quality, not content volume**
3. **Preserve the existing information architecture**
4. **Do not turn it into a blog or redesign it into something generic**
5. **Treat this as a production hardening pass**

## Files to review first
- `README.md`
- `FINAL-HANDOFF.md`
- `architecture.md`
- `content-model.md`
- `batch-progress.md`
- `assets/css/styles.css`
- `assets/js/site.js`
- `sitemap.xml`
- the homepage, 5 hub pages, 6 core calculators, and trust pages

## Required outcome
Produce a deploy-ready static site with:
- clean static hosting compatibility
- strong Lighthouse performance/accessibility/SEO baseline
- validated structured data output
- consistent metadata and canonicals
- clean navigation and footer behaviour
- robust calculator UX in a real browser
- analytics/event hook readiness preserved
- sensible ad-slot resilience without cluttering the UX
- host-ready files for first deployment

## Allowed additions
You may add only what is necessary to make launch and deployment materially better, for example:
- favicon and app icon assets
- social share image asset(s)
- deployment config for the chosen host
- redirects or header config if needed
- lightweight QA or validation notes
- tiny utility files that improve hosting, caching or indexing

## Do not do these
- do not add new topic pages
- do not add a CMS
- do not add a backend
- do not rewrite the brand direction
- do not bloat the JS
- do not introduce a complex framework migration unless there is a very strong technical reason
- do not fill gaps with generic SEO text

## What to improve
### 1. Deployment readiness
- make the project cleanly deployable to a sensible static host
- add any required config files
- make sure directory-style routes work correctly on the chosen host
- preserve `robots.txt`, `sitemap.xml`, canonicals and static assets correctly

### 2. Performance
Use Lighthouse-style priorities and fix the highest-impact issues first. Pay special attention to fast loading and avoiding render-blocking or wasteful front-end patterns. citeturn946631search2turn946631search5turn946631search14turn946631search20

### 3. Accessibility and semantics
Preserve and improve semantic HTML, document structure, link clarity, labels, and keyboard usability. Good HTML structure and clear link text are core accessibility foundations. citeturn946631search0turn946631search3turn946631search18

### 4. Structured data and search readiness
Keep JSON-LD clean, representative of visible content, and aligned with Google’s general structured data guidance. Validate rather than assume. Google recommends JSON-LD and stresses that structured data should match the page content and remain accessible to crawlers. citeturn946631search1turn946631search4turn946631search16

### 5. UX hardening
- improve calculator interaction polish
- tighten mobile spacing and sticky behaviour where needed
- make error handling and result handling feel production-ready
- keep the site calm, useful and practical

### 6. Final QA
- test for broken links
- test all calculators
- test metadata output
- test schema output
- test core pages on mobile and desktop assumptions
- document any remaining known limitations honestly

## Working style
- review all existing files before changing them
- improve existing work before adding small deployment assets
- keep changes deliberate and traceable
- prefer simple, durable solutions over clever ones
- preserve UK English and the current tone
- leave the project in a clean root-ready structure

## Deliverables
1. updated full project
2. concise deployment notes
3. a clear summary of:
   - what was improved
   - what was fixed
   - what remains
   - any manual steps still needed before going live
