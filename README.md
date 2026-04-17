# Home Energy Scout

Home Energy Scout is a UK-first static utility site focused on household energy running costs, savings, room sizing and practical comparison decisions.

## Project status
This repository is the **Batch 15 launch-readiness refinement build**. The initial 10-batch build is complete, and this second cycle focuses on improving the existing site without adding new content.

## Current live scope
- homepage with direct routes into the strongest live tools and sections
- live hubs for:
  - `/running-costs/`
  - `/savings/`
  - `/sizing/`
  - `/compare/`
  - `/guides/`
- trust and legal pages:
  - `/about/`
  - `/methodology/`
  - `/contact/`
  - `/privacy/`
  - `/terms/`
- 6 core calculators across running costs, savings, sizing and comparison
- 24+ supporting pages across:
  - dedicated appliance running costs
  - indoor drying decisions
  - insulation and controls savings
  - appliance replacement logic
  - heater sizing and heating comparisons
  - practical decision guides

## Shared implementation
- `assets/css/styles.css` contains the shared design system and layout rules
- `assets/js/site.js` handles header/footer rendering, breadcrumbs, metadata, schema injection and interaction tracking hooks
- all pages use directory-style routes with `index.html` for simple static hosting
- the structure is clean enough to keep as plain static HTML or migrate into a generator later without rebuilding the information architecture

## Final launch notes
- user-facing pages avoid batch language and are written as live utility pages
- calculators are built on shared logic rather than one-off page scripts
- section hubs are designed to route users into the next practical step, not strand them at one answer
- layout patterns keep room for future display ad placement without breaking the main answer flow

## Local use
Serve the project through a local static server so clean directory URLs work as intended.
Use `node scripts/scaffold-page.mjs --template=support --path=/guides/example-page/ --title="Example page | Home Energy Scout" --description="Short description" --navKey=guides --parentLabel=Guides --parentPath=/guides/` when you need a new page scaffold that already follows the shared shell and launch pipeline.
Run `node scripts/prepare-static-launch.mjs` after any structural page, metadata or shared shell edit so the prerendered meta, schema, header, breadcrumbs and footer stay in sync.
Run `node scripts/build-sitemap.mjs` after adding or removing pages so `sitemap.xml` stays in sync automatically.
Run `node scripts/validate-site.mjs` before first deploy to check metadata, prerendered launch blocks, anchors, sitemap coverage and launch-placeholder drift.

## Handoff files worth reading first
- `FINAL-HANDOFF.md`
- `DEPLOYMENT.md`
- `architecture.md`
- `content-model.md`
- `methodology-notes.md`
- `batch-progress.md`

## Build rule preserved in the handoff
Every batch in the build reviewed existing files first, improved earlier work, then added new work. That history is preserved in `batch-progress.md` so later Codex work can see how the current structure evolved.


## Batch 15 refinement notes
- this pass focused on copy editing, FAQ tightening, wording consistency, and cleaner next-step phrasing across the strongest entry pages
- no new pages were added; the goal was to make the existing site feel more edited and closer to first-deploy quality
- a dedicated Codex handoff prompt is included in `CODEX-DEPLOY-PROMPT.md`
