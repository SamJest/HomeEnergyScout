# Growth baseline — 1 November 2026

Captured before source changes. Workspace initially contained only an unborn Git repository, no remote or user changes. Fetched SamJest/HomeEnergyScout main and checked out codex/growth-correctness-2026-11-01, tracking origin/main. Base commit: b9637f279f9b4ee8ea195631dfdaf57ac74ff8f5. Git status clean after checkout.

## Inventory and dependency graph

Static HTML/CSS/JS; 58 sitemap routes plus 404. Ten calculator keys: appliance, heater, dehumidifier, loft-insulation, led-lighting, old-fridge-replacement, heater-size, heating-comparison, heated-airer-vs-tumble-dryer, portable-ac-vs-fan. No package manifest, tests or CI workflow at baseline. Netlify publish-root config and CNAME exist; actual hosting provider not verified, preserve settings.

Relevant paths: data/{energy-rates,calculator-defaults,pages}.json; assets/js/site.js; assets/css/styles.css; scripts/lib/content-data.mjs; scripts/{generate-traffic-pages,sync-shared-data,prepare-static-launch,build-sitemap,validate-site}.mjs; running-costs/*/index.html; compare/*/index.html; sizing/heater-room-size-calculator/index.html; methodology/index.html.

energy-rates + calculator-defaults + pages → content-data merge → traffic generator (10 selected template pages, overwrites bodies) → sync-shared-data (tariff inputs only) → prepare-static-launch (metadata/schema/config/shell, not body numbers) → build-sitemap (content dates) → validate-site. Runtime reads embedded pageConfig; no runtime tariff fetch.

## P0 known defects

Current period Q2: electricity 24.67p/kWh, standing 57.21p/day; gas 5.74p/kWh, standing 29.09p/day. validTo 2026-06-30; reviewDue 2026-05-27. Duplicated defaults, summaries, FAQs and HTML; 18 HTML files contain old unit rates. Frozen source accessed date 2026-05-12. Validator run before edits: exit 1, only reported expired reviewDue. It does not validate body amounts. Heater runtime monthly uses 52/12 weeks, table uses 30 daily sessions; duty clamps to 10% despite accepting lower values. readNumber coerces invalid values to zero. Several validators lack hours/day maximum. Heating comparison invents type-specific duty cycles and a cheapest winner.

## P1 / overlap risks

Flagship has duplicate Sources and assumptions; table precedes calculator. Preserve all URLs: general heater calculator serves custom scenarios, 2kW page answers fixed-power/runtime questions, monthly page serves budgeting for one or multiple heaters. No evidence supports redirects. Generation can overwrite editorial changes; templates/data must own changes. Preserve substantive dates except on genuinely changed pages. Raw analytics exports stay outside web root.

## Search baseline (supplied pack; not independently live-access verified)

GSC 31 July–30 October 2026: 116 clicks, 36,132 impressions, 0.321% CTR. Heater flagship 90 clicks/31,700 impressions. Panel 9/438, fan 4/889, 2kW 3/410, oil 2/846, laundry comparison 2/640, sizing 0/370, monthly 1/277. Query export anonymised/incomplete: no traffic forecast. Exact two crawled-not-indexed URLs unavailable in summary; identify in GSC manually. Do not combine unidentified CSV with GSC.

Hypotheses: accurate answer snippets may improve qualified clicks; in-page 400/500W presets may improve engagement; clearly distinct monthly/2kW explanations may reduce confusion. Measure by page/device/query and position mix over comparable 28-day windows. No new URLs warranted this cycle.

## Source check and gates

Official Ofgem unit-rates page and dated Q4 announcement opened on 2026-11-01: confirms 26.32p electricity / 54.83p standing, 7.97p gas / 29.68p standing, GB Direct Debit national averages for 1 October–31 December 2026. Electricity zero VAT; gas includes 5%. No discrepancy from pack. Sources: https://www.ofgem.gov.uk/your-energy-supply/your-energy-bill/energy-price-cap-unit-rates-and-standing-charges and https://www.ofgem.gov.uk/news/changes-energy-price-cap-between-1-october-and-31-december-2026 . Next publication 25 November 2026.

Sequence: arithmetic and stale-output tests → tariff truth and generated static answers → calculator validation/accessibility → existing-page editorial fixes → crawl audit → event privacy/CI → backlog → full regeneration and browser QA. Stop at failing correctness gates. Browser dependency absent initially; install a development-only browser test tool if possible. No measured performance or accessibility score at baseline.

Rollback: review commits against base above; revert approved changes or redeploy last known good release after owner review. No merge or deployment authorised.
