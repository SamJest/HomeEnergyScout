# Growth implementation and review report — 1 November 2026

Implemented on `codex/growth-correctness-2026-11-01`, based on `b9637f279f9b4ee8ea195631dfdaf57ac74ff8f5` from `origin/main`. Local branch/diff only: **no push, PR, merge or deployment was performed**. Review with `git diff origin/main...HEAD`. The baseline and initially failing regression tests were committed first.

## Follow-up fixes and re-review — 2 November 2026

All three review findings are addressed:

- **Cached code/CSS:** `scripts/lib/versioned-assets.mjs` emits SHA-256 content-fingerprinted copies. Static preparation rewrites all 57 HTML files to the current versions. Hashes and emitted bytes are stable across Windows/Linux line endings; changed source bytes change the URL. Previously published copies are retained for cached older HTML. The audit rejects stale/missing copies and references. Existing host headers are unchanged.
- **VAT source of truth:** a shared formatter derives zero-rated/included/excluded descriptions from each fuel's VAT metadata. Both generators use it in source notes, panels and calculator scope notes. Invalid percentages or missing inclusion flags for nonzero tax now fail the gate. An isolated fixture switches electricity to included 20% VAT and gas to zero, executes both generators, and verifies that all three rendering paths follow those fields. Actual tariff facts and dates were unchanged.
- **Analytics consistency:** the new event family uses the form's calculator key for `tool` across views, submits, results and errors. Legacy successful-result events retain historical identifiers for compatibility. Unit tests check both naming families; browser smoke verifies new result identifiers on all ten calculators.

Two regression tests failed before the fixes (unversioned URLs and inconsistent event IDs). Final full unit run: **41/41 pass**, including five new regression/integration tests. The temporary fixtures are isolated and removed after checking their resolved parent directory. Final static validation passes for 57 HTML files / 56 routes, with zero audit issues. Repeat-build verification now includes emitted JS/CSS: **60 outputs unchanged byte-for-byte**, with an unchanged asset inventory. `git diff --check` passes; sitemap contents and substantive update dates did not change in this follow-up.

Fresh headless Edge 156.0.4314.58 browser run: **42/42 route/viewport checks pass**, covering 320/390/1280px, all ten calculators, custom tariffs, errors/reset, keyboard focus, offline use and matching event identifiers. Evidence: [browser report](qa/review-browser-2026-11-02.json), [static audit](qa/review-static-audit-2026-11-02.json), [390px screenshot](qa/review-heater-390.png). Local PerformanceObserver samples remain unthrottled lab diagnostics; the original performance table below documents the first work cycle rather than a production comparison.

Re-reviewed the source, generated output, asset retention/cache behaviour, tax rendering paths, compatibility of analytics payloads and test coverage. **No further actionable findings were identified.** Production hosting/CDN behaviour, analytics ingestion, GitHub CI execution and a human screen-reader session remain unverified as documented below. No merge or publishing action was taken.

## P0: tariff accuracy and calculator correctness

- Verified Ofgem's current unit-rates page and dated Q4 announcement on 1 November. Electricity 26.32p/kWh, standing 54.83p/day, zero-rated VAT; gas 7.97p/kWh, standing 29.68p/day, includes 5% VAT. Effective 1 October–31 December 2026, national GB Direct Debit averages. The cap does not cover Northern Ireland, guarantee an individual's tariff or limit their total bill. No factual discrepancy from the pack; actual repository count is 56 indexable routes rather than its approximate 58.
- `data/energy-rates.json` is the dated tariff authority, with history and separate fuel VAT fields. `data/calculator-defaults.json` now holds usage assumptions, with tariffs derived at build time. `data/pages.json` uses formula tokens for rate-sensitive snippets, summaries and FAQs. `scripts/lib/content-data.mjs` resolves them and embeds current data in static pageConfig, with real checkedOn provenance.
- `scripts/generate-traffic-pages.mjs` regenerates the ten existing template routes, including body tables and facts. `scripts/sync-shared-data.mjs` updates other calculator defaults, a formula-derived microwave example and source/scope notes. No runtime tariff fetch; static answers remain visible to crawlers and when JavaScript is unavailable.
- `assets/js/site.js` now rejects blank, nonfinite, negative and excessive numeric inputs across all ten tools. Bounds cover daily hours, weekly schedules, output, power, tariffs, room dimensions and other inputs. Zero-output heating is rejected; optional standby/extraction values may be zero. The heater no longer silently clamps low output to 10%.
- Heater daily/weekly/30-day results now agree with static examples. A 30-day estimate uses 30/7 weeks of the selected schedule; a yearly scenario explicitly assumes 52 weeks. Full-power default: 2000W, 4h/day, 7 days/week, 100% output. Daily £2.11, 30-day £63.17; 65% illustration £41.06. Raw calculations precede display rounding.
- Heating comparison removes invented heater-specific duty cycles and the categorical cheapest winner. Users set a shared power/output; both costs are equal under equal input, with explicit comfort and service limitations. Laundry guidance distinguishes hourly power from energy per completed dry load and extra heating from already-required heating.
- Build and validator fail on expired effective dates or source-review deadlines. The static audit checks known stale rates/period IDs, embedded period, resolved tokens, generated table arithmetic, metadata uniqueness, sitemap and canonical agreement. Fixtures prove that deliberately injected old content and invalid dates fail.

## P1: existing-page usefulness, accessibility and measurement

- Preserved every original canonical URL, navigation structure and 56-route sitemap footprint. Added zero new public pages, redirects, monetisation or infrastructure changes.
- Flagship calculator appears before the reference table; added keyboard-accessible 400/500/1000/1500/2000W and custom presets, 1/2/4/8h choices and 24-hour mathematical examples. Removed its duplicated Sources and assumptions panel. Its revised title/snippet contains a genuine rate-linked answer.
- The 2kW page now answers fixed 1–24h scenarios. The monthly page explains heater count, actual schedules and one-device versus whole-home scope. Fan/panel/oil pages retain their own context and updated examples; sizing gets a clearer rough-sizing use case. Energy-only costs explicitly exclude standing charges; source notes explain tax, GB scope and boiler/heat-pump comparison limits.
- Added numeric mobile keyboard hints, practical bounds and ARIA-linked field errors. Submit focuses the error summary or successful result. Cancelled pending live timers on submit/reset after a real browser test exposed a focus-stealing race. Initial/preset/live calculations avoid unsolicited full-result announcements; explicit submission can announce results. Reset recalculates known defaults.
- Retained the visual identity. Added wrapping presets, focus outlines, grid shrink protection and readable stacked cost-table cells at narrow widths. No new runtime dependencies or third-party scripts. The development-only Playwright dependency is used for QA.
- Preserved legacy event names and added documented aliases, viewport form views, source outbound clicks and tariff-override counts. Delegated related-link tracking handles links created in result panels. The event allowlist excludes raw costs, entered dimensions/tariffs/output, labels, URL queries and identifiers. No collector/cookie/storage was added. Existing consumers must use one event naming family to avoid alias double-counting.
- New pull-request/manual/weekly CI runs unit tests, build, idempotence, diff check and browser smoke; it never deploys. Page walks exclude dependencies, tests, temporary references and documentation. Normalised legacy mixed line endings to make regeneration stable; broad HTML config/shell diffs do not imply broad lastmod changes. Dates changed only on the ten tariff-dependent generated pages, other changed calculator pages, laundry comparison and methodology.

## P2: restrained experiments

The [90-day backlog](GROWTH_EXPERIMENT_BACKLOG.md) keeps growth on existing URLs: snippets, presets and clearer distinct intents. Basket/sharing and equivalent-load laundry tools remain evidence-gated. No new tool page was justified. Day 0/30/60/90 scorecards distinguish GSC evidence, event counts, seasonality and unknown production engagement; no traffic, ranking or revenue forecast is claimed.

## Executed verification

| Command / check | Result |
| --- | --- |
| Original `node scripts/validate-site.mjs` | Exit 1: expired reviewDue 2026-05-27, recorded before edits |
| Initial `node --test tests/math.test.mjs` | 9 pass / 2 fail: 30-day disagreement and >24h acceptance, before fixing either |
| Final `node --test tests/*.test.mjs` | Exit 0: 36 tests pass, all ten calculator families, independent expected outputs, tariff/duty/schedule bounds, zero/negative/blank/NaN/Infinity/maxima, date and stale fixtures |
| `node scripts/build.mjs` | Exit 0: ten existing pages generated; 57 HTML files validate; 56 indexable routes; static audit zero issues |
| `node scripts/check-idempotence.mjs` | Exit 0: all 58 static outputs (57 HTML plus sitemap) unchanged byte-for-byte after full regeneration |
| `node tests/browser-smoke.mjs`, bundled Playwright 1.62.1, installed headless Edge 156.0.4314.58 | Exit 0: 14 routes × 320/390/1280px = 42 passes; all ten calculators initialise, validate and reset; labels, error descriptions, focus, no body overflow or JS exceptions |
| Flagship browser scenarios at all widths | PASS: £63.17 default, 500W preset/custom 30p tariff, £41.06 at 65%, 400W offline calculation £8.21; keyboard Enter, result focus, dynamic related clicks and outbound source events; entered estimate/dimension fields absent from dataLayer |
| Local sitemap, robots, missing route | PASS: HTTP 200/200/404 respectively; static validator checks all internal targets and hashes, canonical metadata and required assets |
| Source links | The only external href in public HTML is Ofgem's current unit-rates page; opened successfully. Dated Q4 announcement also opened successfully for verification |
| `git diff --check` | Exit 0 after removing generator trailing whitespace |

The first browser attempt was blocked by Windows sandbox profile access; rerun outside the sandbox with approval. Browser QA then exposed the debounce/focus bug (fixed). Another run stopped because `robots.txt` navigation triggered a download; corrected the local text MIME type and checked it through an HTTP request. Neither failed attempt was counted as a final pass. A temporary baseline archive was used to capture original-main screenshots; raw growth-pack analytics exports were never added to the site.

Machine-readable evidence: [browser report](qa/browser-report.json), [static audit](qa/static-audit.json). Before/after first screens: [320 before](qa/before-heater-320.png) / [after](qa/heater-320.png), [390 before](qa/before-heater-390.png) / [after](qa/heater-390.png), [1280 before](qa/before-heater-1280.png) / [after](qa/heater-1280.png). Calculator screenshots: [320](qa/heater-calculator-320.png), [390](qa/heater-calculator-390.png), [1280](qa/heater-calculator-1280.png). Flagship mobile and desktop captures were visually inspected.

Local, unthrottled headless diagnostics on the final run:

| Width | Home LCP / CLS | Heater LCP / CLS |
| --- | --- | --- |
| 320px | 244ms / 0 | 164ms / 0.0524 |
| 390px | 204ms / 0 | 112ms / 0.0464 |
| 1280px | 176ms / 0 | 96ms / 0.0181 |

These are PerformanceObserver lab samples over the scripted session, including interactions; **not** production Core Web Vitals, controlled performance benchmarks or Lighthouse scores. No throttling or real-device testing. INP, Lighthouse, production headers/CDN, production analytics delivery and a human screen-reader session were **not run/measured**. Existing mobile header density was retained; no redesign was attempted.

## Acceptance matrix and limits

R-01–R-11: PASS, source/date/static/formula/boundary/browser evidence above. R-12: PASS for tested viewports, visible answer and no body overflow; screenshots supplied. R-13: PASS for automated labels, ARIA descriptions, keyboard submit and summary/result focus; human screen-reader review NOT RUN. R-14–R-17: PASS locally, source browsing, static link/sitemap validation, HTTP smoke and repeat builds. R-18: PASS for in-memory payload/submit behaviour; production collector NOT RUN. R-19: NOT RUN, requires approved release and comparable observation windows. R-20: PASS, zero new public URLs.

CI has been authored but **not executed on GitHub**. Exact two crawled-not-indexed URLs are not established by the supplied summary; inspect GSC details manually. Hosting provider and production cache/security headers are not verified; CNAME, netlify.toml and _headers are unchanged. Financial/trust correctness checks pass locally; release still requires owner review and deployment-date source verification. The static audit cannot prove arbitrary future editorial prose semantically accurate; use it alongside editorial review.

## Review and rollback

Please review the revised full-power defaults, 30-day schedule definition, equal-input comparison, snippet wording and event mapping before merge or publication. Confirm the hosting provider, lawful analytics configuration and exact GSC indexing cases. Next source review is due **25 November 2026**; do not deploy this artifact after its review/validity gates fail without a real source update.

See [rate-update runbook](RATE_UPDATE_RUNBOOK.md), [event schema](EVENT_TRACKING.md) and [baseline](GROWTH_BASELINE_2026-11-01.md). Revert the relevant commits or redeploy the previous approved artifact through review. Prefer targeted rollback of presentation/experiments while retaining verified tariff corrections: returning wholesale to original main restores expired Q2 prices. No automatic publishing action is included.

Edited source families: data/{energy-rates,calculator-defaults,pages}.json; assets/js/site.js; assets/css/styles.css; scripts/{lib/content-data,generate-traffic-pages,sync-shared-data,prepare-static-launch,build-sitemap,validate-site,dev-server}.mjs; new scripts/{audit-site,build,check-idempotence}.mjs; existing route HTML and sitemap.xml; tests/{math.test,rates.test,browser-smoke}.mjs; package.json; .gitignore; .github/workflows/validate.yml; README.md; docs and QA evidence. Full exact paths are available in the branch diff.
