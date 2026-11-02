# Rate updates and reviewable releases

As checked 1 November 2026, Ofgem's [unit rates](https://www.ofgem.gov.uk/your-energy-supply/your-energy-bill/energy-price-cap-unit-rates-and-standing-charges) and [Q4 announcement](https://www.ofgem.gov.uk/news/changes-energy-price-cap-between-1-october-and-31-december-2026) agree: 1 October–31 December 2026, GB Direct Debit national averages, electricity 26.32p/kWh and 54.83p/day standing, zero VAT; gas 7.97p/kWh and 29.68p/day standing, includes 5% VAT. Northern Ireland, fixed tariffs and multi-rate schedules require their own inputs. These are not a household's guaranteed unit rates or a bill limit.

Next published review is scheduled for **25 November 2026** for January–March 2027. The gate permits the reviewDue date and fails the next day if no review is recorded; it also fails before validFrom and after validTo. A rate period must have a checkedOn date, positive finite rates and separate fuel VAT records. Do not merely move the review date to suppress a failure.

1. Open current official sources and record payment method, territory, validity, standing charges and fuel-specific tax treatment. If new evidence conflicts with this file, prefer the authority and log the discrepancy.
2. Edit `data/energy-rates.json` currentPeriod, retaining the previous period in history. Preserve source URLs, checkedOn, reviewDue and the caveats. A source check is not automatically a substantive page change.
3. Calculator tariff values are derived in `readContentData()`. Do not add repeated tariff numbers back to calculator-defaults.json. Keep only usage defaults there. For a successor period, migrate page dataSources to the new period ID. Use `{{rate}}` and `{{cost:watts:hours:days}}` in data/pages.json for shared-rate amounts; raw calculation precedes currency formatting.
4. Change body template logic in `scripts/generate-traffic-pages.mjs`, not only generated HTML. It regenerates exactly the ten pages with template fields in data/pages.json. The ten current routes already existed before this work. Custom tariff inputs stay authoritative at runtime; no tariff fetch is required.
5. Update reviewedDate and lastSubstantiveUpdate only for pages whose facts, formulas or explanatory content meaningfully changed. Keep old dates on untouched pages. The build must not invent dates from the clock.
6. Run the checks below. Review a second build and inspect the full source and generated diff. Capture browser results at 320, 390 and 1280px. Treat a failing accuracy test as a release blocker.
7. Request owner review of the branch/diff, including comparison assumptions and event mapping. Merge/publish only after approval. Preserve current host configuration until the provider is confirmed. For a preview, serve the checkout locally; no deployment happens here.

```text
node --test tests/*.test.mjs
node scripts/build.mjs
node scripts/check-idempotence.mjs
node scripts/dev-server.mjs 8087
```

The build runs traffic generation → shared static data/examples → static shell/schema → sitemap → validator → rendered-rate/SEO audit. Source, test and dependency directories are excluded from page walks. audit-site emits a machine-readable priority report and fails on stale embedded/body rates, invalid dates, canonical conflicts, duplicate metadata and wrong formula-derived table cells. validate-site additionally checks static metadata/shell, assets, internal links and hash targets. The audit targets known tariff markers and generated tables; it is not a general semantic proof of arbitrary future prose.

Review corrections, 2 November 2026: static preparation emits content-fingerprinted copies of authored `assets/js/site.js` and `assets/css/styles.css`, then rewrites every page to those immutable URLs. Edit the authored files and run the build; commit the generated copies and HTML together. Fingerprints use canonical LF bytes for deterministic Windows/Linux output. Keep previously published fingerprint copies available for cached HTML; remove old copies only through a separate retention review. The audit rejects missing/stale copies or references; idempotence includes generated assets as well as HTML/sitemap. Host/cache settings remain unchanged.

VAT descriptions in both generators now derive from `electricityVat` / `gasVat`. A nonzero percentage requires an explicit `included` boolean; malformed records fail the build. Store the retail rates appropriate to the stated tax treatment and verify them against the official source. Update any period-specific free-text notes when changing period; those remain dated editorial records.

Optional development-only browser testing: `npm install --ignore-scripts --no-package-lock`, `npx playwright install chromium`, then `node tests/browser-smoke.mjs`. No browser dependency ships to visitors. PLAYWRIGHT_MODULE can point at an existing Playwright index.mjs; BROWSER_PATH can select an installed Chromium/Edge binary. CI also installs browser OS dependencies. CI is pull-request/manual/weekly validation only, with no deployment job; it has not been run on GitHub in this task.

Rollback after an approved release: revert the relevant growth commit(s) through review or redeploy the previous known-good static artifact. Do not reset over another person's changes. A full rollback to the original main also restores expired Q2 tariffs, so use a targeted rollback that retains verified rate corrections whenever possible.
