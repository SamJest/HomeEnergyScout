# Final handoff

## What this is
This is the completed Batch 15 launch-readiness handoff build for **Home Energy Scout**, a UK-first static utility site about household energy running costs, savings, sizing and practical decisions.

## What is in scope
- clean static HTML site with directory routes
- shared CSS design system
- shared JS for layout rendering, metadata, schema and calculator behaviour
- section hubs, calculators, support pages and trust/legal pages
- technical files ready for straightforward static hosting

## Recommended first checks after handoff
1. Open the homepage and each main hub on mobile width first.
2. Test all 6 core calculators and confirm result blocks, validation and tracking hooks still behave as expected.
3. Check internal link pathways from the main calculator pages into savings, sizing and compare routes.
4. Replace placeholder analytics or ad tags only after preserving current layout spacing and hierarchy.
5. Update reviewed dates and methodology wording only when assumptions or formulas materially change.
6. If you add pages, run `node scripts/build-sitemap.mjs`. If you change page metadata or shared shell output, run `node scripts/prepare-static-launch.mjs`, then read `DEPLOYMENT.md` and run `node scripts/validate-site.mjs` before the first live deploy.

## Good next steps for Codex
- convert repeated page structures into generator templates while preserving current URLs
- move page metadata and related-link modules into a structured data source if the lightweight scaffold workflow ever becomes too manual
- add more high-intent calculator and comparison pages inside the existing pillars
- extend QA into repeatable browser-based regression checks alongside the current validator
- add production analytics and advertising configuration only once the live privacy disclosures are final

## Things not to break
- clean URLs and existing slugs
- answer-first page structure
- UK-focused wording and assumptions
- strong cross-links between costs, sizing, savings and compare pages
- room for future display ad placements without pushing the answer below the fold
