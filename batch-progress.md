# Batch progress

## Batch 1
### Completed
- Chose the working brand direction: **Home Energy Scout**
- Created the static site root structure with shared assets and documentation files
- Built the first homepage foundation
- Added trust and legal page foundations: About, Methodology, Contact, Privacy and Terms
- Added root technical files: `robots.txt` and `sitemap.xml`
- Established the first shared CSS and JS layer for layout, metadata, breadcrumbs, schema basics and footer/header rendering

## Batch 2
### Completed
- Built live hub pages for `/running-costs/`, `/savings/`, `/sizing/`, `/compare/` and `/guides/`
- Improved the homepage so it routes into real section hubs instead of future concepts
- Strengthened navigation and footer structure around the main utility pillars
- Improved section layouts, card systems, hub intros and related-route modules
- Expanded sitemap coverage for the live section pages

## Batch 3
### Completed
- Built the first two live calculators:
  - `/running-costs/appliance-running-cost/`
  - `/running-costs/electric-heater-running-cost/`
- Added reusable calculator handling in shared JS for form binding, result rendering and event tracking
- Expanded shared CSS for tool layouts, result cards, example panels, assumptions blocks and form states
- Upgraded the running-costs hub to feature the new live tools and stronger next-click routes
- Refined the homepage so the first live calculators are surfaced above broader section browsing
- Updated the methodology page so it now explains the real logic used by the live calculators
- Updated sitemap and next-batch documentation

### Improved from previous batches
- The site now has genuinely useful answer pages instead of only section architecture
- Homepage copy is more concrete and less forward-looking
- Running-cost pages now show a repeatable calculator-page template for future tools
- Trust signals are closer to the answer, with reviewed dates, formulas, example assumptions and direct methodology links

### Quality issues fixed
- Removed more “planned” wording from core entry pages
- Tightened the gap between calculator result and explanation
- Improved ad-ready layout handling so side modules do not break the main answer flow
- Replaced abstract mentions of tools with live links to working pages

### Remaining after Batch 3
- The running-cost cluster still needs dedicated appliance pages like tumble dryer, kettle and immersion heater
- Savings, sizing and compare sections still need live calculators, not just hub structures
- Comparison-page templates need live examples rather than only hub logic
- More internal links should be added as soon as adjacent live pages exist

### Next batch focus
- Build the next two calculators:
  - dehumidifier running cost calculator
  - loft insulation savings calculator
- Add supporting pages tightly linked to those tools
- Expand the shared calculator pattern without duplicating intent
- Keep improving wording and hierarchy on the homepage and hub pages now that real tools exist

### Architecture decisions
- Calculator pages follow a stable pattern: answer summary, tool, result, worked examples, assumptions, practical advice, related links and FAQ
- Shared JS now supports future calculators through `data-calculator` hooks instead of one-off page scripts
- Event tracking is being structured around calculator inputs, result views and related-link clicks from the start

### Risks / weak spots
- Appliance-specific intent pages still do not exist yet, so the general appliance calculator has to carry broad intent
- Heater comparisons and room-sizing pathways are still one click away rather than fully live
- Some hubs still mention planned pages that need to become real before Batch 6


## Batch 4
### Completed
- Built two more live calculators:
  - `/running-costs/dehumidifier-running-cost/`
  - `/savings/loft-insulation-savings/`
- Expanded the shared calculator system so Batch 3 tooling now supports both running-cost and savings/payback logic
- Upgraded the running-costs hub and savings hub so they route into live pages rather than mostly describing planned coverage
- Added tightly linked supporting pages around the new tools:
  - `/sizing/dehumidifier-size-by-room/`
  - `/guides/dehumidifier-for-drying-clothes/`
  - `/savings/led-lighting-savings/`
  - `/savings/draught-proofing-savings/`
  - `/running-costs/heated-airer-running-cost/`
  - `/running-costs/immersion-heater-running-cost/`
- Refined the homepage so it surfaces all live tools clearly and gives stronger next-click pathways
- Updated methodology to explain the new dehumidifier and loft insulation logic
- Updated sitemap and next-batch documentation

### Improved from previous batches
- The savings section now has a genuinely useful live calculator rather than only hub-level framing
- The running-cost cluster now has a more coherent laundry and damp-control pathway instead of isolated appliance logic
- Homepage copy is more concrete and less roadmap-like
- Related-link modules now point to live adjacent pages much more often

### Quality issues fixed
- Removed more “planned” language from the running-cost and savings hubs
- Tightened homepage entry points so readers hit live tools faster
- Improved internal-link relevance around dehumidifier, clothes drying and loft-insulation decisions
- Extended calculator interpretation blocks so new pages explain the answer rather than just outputting values

### Remaining after Batch 4
- The site still needs more appliance-specific pages in the running-cost cluster
- Sizing pages are only beginning to go live and need heater/radiator depth
- Comparison pages still need real live verdict pages rather than mainly hub structure
- Savings coverage still needs thermostat, glazing and old-appliance replacement depth

### Next batch focus
- Build the next two calculators:
  - radiator or heater room size calculator
  - heating option comparison calculator
- Add live comparison-support pages around heaters, clothes drying and gas-vs-electric decisions
- Improve mobile-first calculator UX again now that there are two calculator types live
- Keep tightening page intros and related-link logic where any wording still feels too generic

### Architecture decisions
- The shared calculator engine now supports both direct cost outputs and simple payback/savings outputs
- Supporting pages are being added around live tools as small, tightly scoped routes rather than broad blog-like articles
- Laundry, damp-control and heat-loss pathways are becoming the first real interconnected topic clusters

### Risks / weak spots
- Some support pages are still lighter than the main calculators and will need expansion as adjacent calculators go live
- Compare pages need real verdict-led entries soon so the site does not over-rely on hub pages for decision intent
- Running-cost coverage is growing, but several high-intent appliance pages still sit one layer away from dedicated tools

## Batch 5
### Completed
- Built the final two core launch calculators:
  - `/sizing/heater-room-size-calculator/`
  - `/compare/heating-option-comparison/`
- Expanded the shared calculator engine again so it now supports room-sizing logic and verdict-led comparison logic without page-specific scripts
- Added a live heater sizing cluster and comparison cluster around the new tools:
  - `/compare/oil-radiator-vs-fan-heater/`
  - `/compare/dehumidifier-vs-heating-to-dry-clothes/`
  - `/compare/heated-airer-vs-tumble-dryer/`
  - `/compare/gas-vs-electric-heating/`
  - `/sizing/radiator-size-by-room/`
  - `/sizing/heater-wattage-by-room/`
- Improved the homepage so all 6 core calculators are visible and the heating pathway is now much clearer
- Upgraded the compare and sizing hubs so they now behave like live sections rather than mainly architecture placeholders
- Tightened internal linking across heater, sizing, laundry-drying and dehumidifier routes
- Updated methodology so it explains the new room-sizing and comparison logic now in use
- Updated sitemap and packaging

### Improved from previous batches
- The site now has live coverage across all four core pillars rather than only running costs and early savings
- The compare section now contains real verdict pages and a working calculator instead of mostly hub logic
- The sizing section now has a stronger practical route from room dimensions to likely heater choice and then into running cost or comparison pages
- Homepage utility is stronger because the main live tools are surfaced immediately and the best next-click routes are clearer

### Quality issues fixed
- Replaced more generic section copy with direct household decision framing
- Improved mobile-first calculator UX by keeping result interpretation close to the answer and reducing dead-end pathways
- Tightened meta title patterns on the new live pages so they reflect clear search intent
- Reduced orphan-like behaviour on dehumidifier and heated-airer pages by adding stronger cross-cluster routes

### Remaining after Batch 5
- The running-cost cluster still needs more dedicated appliance pages such as tumble dryer, dishwasher, washing machine, kettle, electric shower and underfloor heating
- Savings coverage still needs thermostat, glazing and old-fridge replacement depth
- Some support pages remain lighter than the main calculators and should be expanded with better examples and FAQs in later batches
- Guides coverage is still thinner than the core utility sections and should be used to support live decision routes rather than broaden into generic content

### Next batch focus
- Expand supporting pages significantly around the strongest live clusters
- Improve earlier copy quality and interpretation depth before adding too many more page types
- Tighten metadata and hierarchy patterns across the whole site
- Improve layout consistency, related-link logic and page speed discipline as page count grows

### Architecture decisions
- Shared calculator logic now supports four patterns: direct running cost, savings/payback, room sizing, and verdict-led comparisons
- Comparison tools are being built around scenario-fit and likely runtime behaviour rather than pretending all options can be judged on wattage alone
- Sizing pages now sit as an active bridge between raw running-cost pages and final comparison decisions

### Risks / weak spots
- Some comparison verdicts still use broad practical assumptions rather than appliance-specific measured test data, so methodology clarity remains important
- Several high-intent running-cost pages still rely on the general appliance calculator until dedicated pages go live
- The site is now much more interconnected, so later batches need to watch carefully for duplicate intent and overlinking


## Batch 6

### Completed
- Added 6 new dedicated running-cost pages: tumble dryer, dishwasher, washing machine, kettle, electric shower, and underfloor heating.
- Added 3 new savings pages: smart thermostat savings, double glazing savings, and old fridge replacement savings.
- Added 2 new cluster-support pages: portable AC vs fan cost, and electric heating costs explained.
- Reworked the running-costs, savings, and guides hubs so they route users into deeper live content instead of leaning too heavily on the original core calculators.
- Improved the homepage by surfacing newly expanded answer pages and tightening the sense that the project is already a useful answer engine, not just a calculator shell.
- Updated the sitemap and shared styling for new card and review patterns.

### Improved from previous batches
- Reduced the gap between live calculators and surrounding support content by adding more specific high-intent pages.
- Improved internal-link pathways between laundry, heating, hot-water, controls, and appliance-upgrade routes.
- Tightened wording on the core hubs so they talk about current live utility rather than future build intent.
- Improved content breadth in the strongest clusters without adding fluffy blog-style pages.

### Quality issues fixed
- The running-cost hub was too dependent on a small set of live calculators. It now feels like a broader section with clear entry points for common household questions.
- The savings hub had a good calculator but lacked enough decision-depth around controls, glazing and replacement logic.
- The guides hub was too thin and now better supports the heating and clothes-drying clusters.

### Remaining work
- More supporting pages are still needed to reach a fuller launch footprint around heating comparisons, radiator sizing and appliance replacement decisions.
- Some older support pages are still lighter than the newer Batch 6 pages and should be strengthened in later refinement passes.
- Metadata patterns are more coherent now, but later batches should do a full consistency sweep across every page title and description.
- Additional ad-ready layout zoning should be introduced carefully without harming the current clean UX.

### Architecture decisions
- Continued with the static directory-based route approach because it remains easy to scale, easy to hand off, and straightforward to convert into generated workflows later.
- Kept support pages within the same reusable page shell rather than introducing a second design system for non-calculator pages.
- Preserved calculator logic as shared JS while expanding content around the tools, keeping the site tool-first rather than blog-first.

### Risks or weak spots still to improve
- Comparison depth is better than before, but some decision pages still need richer scenario handling.
- Not all older pages yet match the fuller answer depth of the newest pages.
- There is still no dedicated ad-zone system, only layout space that is compatible with future ad placements.



## Batch 7

### Completed
- Reworked the compare hub so it now acts as a proper decision centre rather than mainly a list of existing comparison pages.
- Added 3 new comparison pages:
  - `/compare/repair-vs-replace-old-appliance/`
  - `/compare/heated-airer-vs-dehumidifier/`
  - `/compare/panel-heater-vs-oil-radiator/`
- Strengthened older comparison pages with fuller verdict structure, clearer scenario guidance and more useful next-step links:
  - `/compare/dehumidifier-vs-heating-to-dry-clothes/`
  - `/compare/heated-airer-vs-tumble-dryer/`
  - `/compare/gas-vs-electric-heating/`
- Upgraded several older support pages that were thinner than newer sections:
  - `/savings/led-lighting-savings/`
  - `/savings/draught-proofing-savings/`
  - `/sizing/dehumidifier-size-by-room/`
  - `/guides/dehumidifier-for-drying-clothes/`
- Refined the homepage so stronger decision pages are surfaced earlier and the “cost → size → compare” pathway is clearer.
- Added new shared styling for decision cards, pathway blocks and compare-page support sections.
- Updated sitemap, README and next-batch planning.

### Improved from previous batches
- The compare section now feels much more like a practical decision system and much less like a set of isolated verdict pages.
- Older support pages are closer in quality to the stronger Batch 6 additions, reducing the sense that different clusters were built to different standards.
- Internal linking is more intent-led, especially around indoor drying, heater choice and repair-versus-replace decisions.
- The homepage now does a better job of surfacing the site’s strongest utility routes rather than mostly listing tools.

### Quality issues fixed
- Several older pages were too short to carry the weight of their search intent and now include fuller practical framing, examples and related routes.
- The compare hub previously leaned too hard on broad section copy and not enough on live household decisions.
- Some comparison pages answered the verdict but did not route users clearly into the next best tool or guide.
- The site still supports future ad placements, but the main utility pathways now remain clearer and more deliberate.

### Remaining work
- Savings and payback depth still needs another serious cluster pass to match the growing strength of running-cost and comparison routes.
- Methodology language should be tightened further on pages where the verdict depends more on scenario assumptions than on direct calculation.
- Some older calculator pages could still use richer FAQs, worked examples or more confident interpretation.
- A full-site metadata and naming consistency pass is still needed before the final refinement batches.

### Next batch focus
- Build deeper savings and payback cluster coverage.
- Improve trust and methodology consistency on the most assumption-heavy pages.
- Continue upgrading older pages before adding too many more new sections.
- Tighten metadata, hierarchy and internal linking patterns across the whole project.

### Architecture decisions
- Kept the static directory-based route structure and continued to grow the site by strengthening clusters instead of adding disconnected volume.
- Continued using one shared design system for tools, guides and verdict pages to keep handoff simple and future generator conversion straightforward.
- Treated comparison pages as a first-class content type that can be deeper than a standard support page without needing a separate template engine.

### Risks or weak spots still to improve
- Some comparison verdicts still depend on directional reasoning rather than fully evidence-based measured product data, so methodology clarity remains important.
- The site has more breadth now, which raises the risk of uneven quality if later batches add pages faster than they refine old ones.
- There is still no dedicated structured data file pipeline; schema readiness exists through page configuration and consistent layout, but could be formalised further later.


## Batch 8

### Completed
- Deepened the savings cluster with 4 new pages:
  - `/savings/cavity-wall-insulation-savings/`
  - `/savings/hot-water-cylinder-jacket-savings/`
  - `/savings/radiator-valves-and-room-controls-savings/`
  - `/guides/payback-vs-comfort-upgrades/`
- Reworked the savings hub so it more clearly separates quick-payback measures, medium-cost insulation work and comfort-led upgrades.
- Strengthened the methodology page with clearer explanation of payback framing, comfort-led decisions and where rougher judgement is deliberate.
- Improved the homepage so savings and payback routes feel more live and better connected to the rest of the site.
- Upgraded older pages that were lighter or less explicit about trust and next-step logic:
  - `/running-costs/appliance-running-cost/`
  - `/savings/double-glazing-savings/`
  - `/savings/old-fridge-replacement-savings/`
- Expanded shared JS with cleaner schema injection support and extended shared CSS for trust strips, assumption tables, page meta chips and reserved ad-zone notes.
- Cleaned and regenerated the sitemap so it reflects the current full route set.

### Improved from previous batches
- The savings cluster now does a better job of distinguishing between upgrades with strong financial cases and upgrades that are more about comfort or condition.
- Older pages are closer in quality to the stronger later-batch pages, reducing the sense that some sections were built much earlier.
- Methodology and trust language are clearer on pages where broad averages would otherwise feel misleading.

### Quality issues fixed
- Reduced more generic “this could help” language in savings routes and replaced it with clearer judgement about when a measure is strong, fair or weak.
- Improved older running-cost and savings pages that lacked enough cross-links into the replacement and payback clusters.
- Cleaned the sitemap formatting and made the site shell more consistent about schema support.

### Remaining work
- A full-site refinement pass is still needed to tighten metadata, hierarchy and internal-link consistency page by page.
- Some older calculators and support pages still need deeper FAQ, worked-example and result-interpretation polish to match the strongest clusters.
- The site is ad-ready in layout terms, but the reserved ad zones still need a more formal system in the final polish batches.

### Next batch focus
- Do a broad full-site refinement pass before adding much more new content.
- Tighten titles, descriptions, page intros and related-link blocks so the whole site feels like one coherent product.
- Improve ad-ready layout zones, schema readiness and internal-link consistency across all hubs and live pages.
- Fix any remaining naming inconsistencies, thin sections or clunky older markup before the final packaging batch.

### Architecture decisions
- Kept the project on the same static directory-based structure because it remains handoff-friendly and easy to inspect.
- Continued using shared CSS and JS rather than introducing page-level exceptions, so the site remains scalable and easier to convert later.
- Extended schema support in the site shell so page-level schema can be passed through `pageConfig` without duplicating boilerplate.

### Risks or weak spots still to improve
- Page quality is much more even now, but a few older routes still feel lighter than the best Batch 7 and 8 pages.
- Some hubs are strong at routing, but internal linking still needs a deliberate final sweep to avoid weak or repetitive “next clicks”.
- The site is now large enough that final-batch QA needs to watch carefully for inconsistent reviewed dates, metadata patterns and repeated copy structures.


## Batch 8

### Improved from previous batches
- The savings section now handles the difference between quick-payback wins and comfort-led upgrades more honestly.
- Methodology language is clearer about where the site is directional rather than exact.
- Older pages in the savings cluster are closer in tone and structure to the stronger later-batch pages.

### Quality issues fixed
- Reduced the risk of overselling financial payback where comfort is the bigger driver.
- Added stronger pathways from newer savings pages back into methodology and compare routes.
- Tightened some thinner older pages so the site feels less uneven across clusters.

### Remaining work
- A full-site quality-control pass is still needed across intros, metadata consistency, internal linking and ad-ready layout zones.
- Some older calculator pages still need to match the stronger clarity of later pages.
- Final packaging and handoff documents still need a last polish in Batch 10.

### Architecture decisions
- Continued treating savings content as tightly scoped decision support rather than broad explanatory content.
- Kept shared JS and shared CSS evolving rather than adding page-specific systems.
- Strengthened the trust layer by making methodology and page-level assumptions more explicit.

### Risks or weak spots still to improve
- Metadata consistency still needs one final sweep across the whole project.
- A few older pages still carry slightly more generic intros than the strongest later pages.
- Final ad-zone handling should be checked again before handoff.

## Batch 9

### Completed
- Ran a full-site refinement pass focused on existing pages rather than adding more footprint.
- Normalised review-date wording across the site so pages now use a real review date instead of batch-language.
- Improved shared JS for better schema readiness:
  - global organisation schema support
  - automatic FAQ schema generation from on-page FAQ blocks
  - cleaner analytics readiness through `dataLayer` event pushes
  - viewability tracking hooks for reserved ad slots
- Improved shared CSS for:
  - jump-link clusters
  - review/trust strips
  - clearer ad-slot treatment
  - more polished sticky-header behaviour on larger screens
- Tightened homepage, methodology and section-hub wording so the site reads less like a staged batch build and more like a finished utility product.
- Upgraded older core calculator pages with clearer intros and jump links.
- Fixed the sitemap root URL issue and regenerated sitemap formatting with consistent `lastmod` values.

### Improved from previous batches
- The site now feels more coherent as one product rather than a set of clusters added over time.
- Trust signals are stronger because review dates, methodology language and FAQ schema are more consistent.
- Ad-readiness is more deliberate: reserved ad space is now trackable and visually separated from the answer flow.

### Quality issues fixed
- Removed more “batchy” or roadmap-style language from high-traffic entry pages.
- Tightened older calculator intros that were weaker than later pages.
- Improved technical readiness for rich results and measurement without adding backend complexity.
- Corrected the sitemap root entry and made sitemap output cleaner for handoff.

### Remaining work
- Batch 10 should focus on final polish, final documentation cleanup, and handoff packaging.
- A few medium-priority support pages could still use one more wording pass if time allows.
- Final QA should confirm there are no stale descriptions, weak related-link modules or odd layout regressions.

### Next batch focus
- Final cross-site polish.
- Final documentation cleanup.
- Final ZIP packaging in a clean root-ready structure for handoff to Codex.

### Architecture decisions
- Preserved the static directory-based structure for clarity and handoff simplicity.
- Kept all quality improvements within the shared asset layer where possible so the site remains easy to scale later.
- Continued avoiding unnecessary build-tool complexity ahead of the final handoff.

### Risks / weak spots
- Some support pages are naturally lighter than calculator pages because their job is narrower, so final Batch 10 QA should make sure that still feels intentional rather than thin.
- Rich schema support is improved, but a future generated workflow would make consistency easier at larger scale.


## Batch 8
### Remaining work
- Full-site QA and handoff packaging still required.
- README and handoff docs still needed a final consistency pass.
- Final root-ready ZIP still needed to be produced.

## Batch 9
### Remaining work
- One final pass was still needed to clean documentation drift, tighten shared assets and package the finished handoff.

## Batch 10
### Completed
- Ran a final whole-project pass on the current site structure and packaged the full project as the final root-ready handoff.
- Corrected documentation drift so core project files now reflect the finished state rather than an earlier batch.
- Added `FINAL-HANDOFF.md` to make the project easier to continue in Codex without re-reading the whole history first.
- Added a root `404.html` so static hosting has a consistent not-found experience instead of falling back to a server default page.
- Cleaned remaining shared-asset comments and finalised handoff-ready documentation.

### Improved from previous batches
- The repository now reads like a finished product handoff rather than an in-progress milestone.
- Core documentation is clearer about the current scope, structure and safest next steps.
- Final packaging is cleaner and easier to drop into static hosting or pass into follow-on automation work.

### Quality issues fixed
- README batch status was out of date and is now corrected.
- The project lacked a dedicated handoff note for future implementation work.
- Static hosting now has a project-level not-found page instead of depending on platform defaults.

### Final launch footprint
- homepage
- 5 live section hubs
- trust/legal pages
- 6 core calculators
- 24+ supporting pages
- shared CSS/JS architecture
- sitemap, robots, schema and analytics-readiness foundations

### Architecture decisions
- Kept the site as clean static HTML/CSS/JS for the handoff build because it remains easy to host, audit and migrate into generated workflows later.
- Preserved the directory-route structure and page shell conventions so future automation can template repeated patterns without changing public URLs.

### Risks / weak spots still to watch in future work
- Real-world tariffs, appliance efficiencies and retrofit costs vary widely, so methodology and reviewed dates should be maintained carefully.
- Some future growth would benefit from a data-driven generator layer to reduce repetition risk as page count increases.
- A production favicon/image set and live analytics configuration are still implementation tasks rather than content tasks.


## Batch 11

### Completed
- Started the second 10-batch refinement cycle focused on launch readiness rather than new content.
- Rebuilt the homepage so the opening message is sharper, the first-click logic is clearer and the strongest live routes are easier to understand quickly.
- Improved shared navigation and footer output in `assets/js/site.js` so the site now has:
  - clearer top-level section labels
  - a lighter utility-nav layer for methodology and about links
  - a more useful launch-ready footer with direct starting points and trust/contact routes
- Added shared styling refinements in `assets/css/styles.css` for:
  - cleaner header stacking
  - stronger launch-homepage layout blocks
  - section-entry cards
  - footer utility pills
  - more polished sticky-header behaviour on scroll
- Reworked the five section hubs so they now use more consistent structure:
  - tighter hero copy
  - clearer “best starting point” guidance
  - jump-link navigation
  - more explicit “use this when / do not stop here when” framing
  - stronger next-step routing
- Updated README and next-batch documentation to reflect the new refinement cycle.

### Improved from previous batches
- The homepage now behaves more like a launch homepage and less like a general overview page.
- Section hubs are more consistent with one another, which makes the overall site feel more intentionally edited.
- Navigation and footer language are more useful for real users because they point toward actions and routes instead of just restating the site structure.

### Quality issues fixed
- Reduced vague “browse the site” style wording on key entry pages.
- Improved first-click clarity so users can identify their best route faster.
- Tightened section-entry hierarchy so each hub now explains when it is the right place to start.
- Improved footer usefulness for launch by surfacing starting tools and trust links more clearly.

### Remaining work
- Calculator UX still needs its own refinement pass across validation, helper text, result readability and mobile flow.
- Older calculator pages should feel more consistent with the stronger launch-ready hub pages.
- Additional launch-readiness passes are still needed for metadata, internal linking, accessibility and performance polish.

### Next batch focus
- Refine the calculator experience only.
- Improve validation states, helper text, assumption framing and result scanability on the core calculators.
- Tighten mobile interaction patterns for forms and result modules.

### Architecture decisions
- Continued to improve the shared JS layer instead of creating page-specific navigation or footer markup.
- Kept the refinement scope limited to existing pages and shared assets, with no new page creation.
- Treated homepage and hub-page clarity as a launch blocker worth fixing before lower-level polish work.

### Risks / weak spots
- Because the site is still hand-authored static HTML, consistency improvements need deliberate repeat passes to keep older calculator pages aligned with newer shared patterns.
- The new header/footer structure should continue to be watched during later accessibility and mobile QA passes.


## Batch 12

### Completed
- Upgraded the shared calculator engine so all 6 core calculators now support cleaner validation, clearer invalid states, and live result refreshing when users change values.
- Improved result rendering so calculator pages now show a clearer assumptions block and more explicit next-step guidance instead of stopping at the headline number.
- Added structured form sections, helper panels, and stronger result helper text to the 6 core calculator pages:
  - `/running-costs/appliance-running-cost/`
  - `/running-costs/electric-heater-running-cost/`
  - `/running-costs/dehumidifier-running-cost/`
  - `/savings/loft-insulation-savings/`
  - `/sizing/heater-room-size-calculator/`
  - `/compare/heating-option-comparison/`
- Improved mobile and desktop calculator layout behaviour with clearer field grouping, inline error treatment, and sticky result handling that drops back to static positioning on smaller screens.
- Tightened the action framing around the calculators so users are told what to compare or check next, not just shown a number.

### Improved from previous batches
- Calculator pages now feel more like launch-ready tools and less like solid first versions.
- The results are easier to interpret because the key assumptions and likely next decisions sit inside the result flow rather than elsewhere on the page.
- Validation is more trustworthy because contradictory or empty inputs now trigger visible feedback instead of quietly producing a misleading answer.
- Mobile form flow is cleaner because the inputs are grouped into clearer sections with less visual sprawl.

### Quality issues fixed
- Removed a common failure case where the comparison calculator could compare the same heater type against itself.
- Fixed the weak invalid-state experience where forms looked acceptable even when the inputs did not make sense.
- Reduced the risk of dead-end results by adding explicit next-step guidance inside the calculators.
- Improved result readability by separating assumptions, interpretation and next actions into clearer blocks.

### Remaining after Batch 12
- Metadata, schema and snippet readiness still need their own dedicated refinement pass.
- Related-link modules across older support pages still need a consistency sweep.
- Some calculator helper text can still be tightened further once the site gets a full copy-edit pass.
- Accessibility-specific form improvements should still get a dedicated pass later in the refinement cycle.

### Next batch focus
- Review metadata and on-page SEO execution across the current project.
- Tighten page titles, meta descriptions, breadcrumb consistency, canonicals, sitemap quality and schema readiness.
- Improve FAQ usefulness where the current questions are accurate but still a little basic.
- Keep the focus on improving existing files only.

### Architecture decisions
- Kept the calculators within the shared JS system rather than adding per-page scripts, so validation and rendering upgrades apply consistently across all core tools.
- Chose live recalculation on change as a progressive enhancement while preserving the explicit submit button for users who prefer a clearer action point.
- Moved more explanation into the result panel itself so the answer remains useful even when ad slots or side modules are present later.

### Risks / weak spots still to improve
- Some calculators still rely on simple directional assumptions rather than appliance-specific measured data, so the methodology wording remains important.
- Live recalculation adds convenience but needs a later accessibility pass to confirm the balance between automatic updates and user control feels right.
- The core calculators are much better now, but some non-calculator pages still need equivalent launch-polish work in later batches.


## Batch 13
### Completed
- tightened page titles and descriptions on the homepage, trust pages, section hubs and core calculators so search snippets are more specific and more useful
- improved shared metadata handling in `assets/js/site.js` with cleaner social meta output, canonical handling and better JSON-LD structure
- removed duplicate schema injection so pages do not emit overlapping structured-data blocks
- added FAQ sections to the main section hubs where snippet value was previously weak
- regenerated `sitemap.xml` after the metadata pass

### Improved from previous batches
- the section hubs now have better search-snippet support instead of relying almost entirely on body copy
- core calculator pages have clearer UK intent in their titles and descriptions
- the shared schema layer is cleaner and closer to launch-ready output
- trust and legal pages are easier to understand from search results because the metadata is less bare

### Quality issues fixed
- removed duplicate schema output from the shared JS
- tightened generic title patterns such as plain “Compare” or “Guides” where they were too broad for launch
- improved FAQ usefulness on hub pages that previously had no structured question-and-answer content
- regenerated the sitemap so the current page set is reflected cleanly

### Remaining after Batch 13
- internal linking still needs a deeper consistency pass across older pages
- some older page intros and FAQ blocks are still lighter than the best recent pages
- accessibility, semantic markup and ad-slot resilience still need dedicated passes

### Next batch focus
- improve internal linking logic across the whole site
- tighten hub pathways, related-link modules and “what to do next” patterns on older pages
- keep improving existing files only without adding new routes

### Architecture decisions
- metadata remains page-driven through `window.pageConfig`, but Batch 13 hardens the shared JS so one place controls canonical, social meta and structured data
- hub pages now carry concise FAQ blocks where they add real snippet value rather than relying on generic intro text alone

### Risks / weak spots
- some page descriptions are still intentionally conservative to avoid over-claiming exactness in search results
- future batch work should avoid adding more schema types unless they clearly improve launch quality


## Batch 14

### Completed
- Ran an internal-linking and pathway refinement pass across the existing site without adding any new pages.
- Added a new shared related-pathways layer in `assets/js/site.js` so key pages now surface stronger follow-on routes instead of ending at one answer.
- Added new shared styling in `assets/css/styles.css` for clearer pathway cards and paired-route sections.
- Strengthened the homepage and all 5 section hubs with more deliberate paired-route sections so users can move from first click to next sensible step more easily.
- Updated project documentation for the pre-deploy refinement cycle.

### Improved from previous batches
- Internal linking is now more consistent across hubs and major live pages, rather than depending only on each page's original manual link block.
- The site does a better job of routing users from a cost answer into a sizing, savings, compare or methodology page when that is the real next step.
- The hub pages now feel more editorially deliberate and more useful as launch pages because they show route pairings, not just topic groups.

### Quality issues fixed
- Reduced dead-end behaviour on key live pages by adding stronger “what next?” modules.
- Tightened the jump from hub pages into the right adjacent section.
- Reduced the risk that users stop at a baseline number when the better action is a comparison, sizing check or payback route.

### Remaining work
- Some older page copy still repeats similar sentence patterns and can be edited harder in Batch 15.
- Trust and methodology wording is good, but a final copy pass should make it sound even more edited and less system-generated.
- Before first deploy, the project still needs a final content-polish pass rather than more structural expansion.

### Next batch focus
- Copy editing and launch-tone polish only.
- Tighten weaker intros, FAQ answers and interpretation blocks across existing pages.
- Prepare the project for transfer into Codex or heavier deploy work after Batch 15.

### Architecture decisions
- Kept the build static and page-based, but improved cross-page usefulness through a shared pathways layer rather than adding new templates or page types.
- Preserved the current URL footprint to keep launch readiness and deployment simplicity intact.

### Risks / weak spots still to improve
- Shared pathway modules improve consistency, but the last visible quality gap is now copy polish rather than architecture.
- Batch 15 should avoid adding more structure and focus instead on making the existing writing feel sharper and more human.


## Batch 15

### Completed
- Ran a copy-editing pass across the homepage, all 5 section hubs and the 6 core calculators.
- Tightened lead paragraphs, quick-answer wording, result-panel wording and several section intros so pages read more like a finished product and less like a staged build.
- Reduced repeated phrasing in shared pathway copy inside `assets/js/site.js`, especially around “useful when / use this when” wording.
- Improved FAQ and support wording on high-traffic entry pages so the site sounds more edited, less repetitive and more direct.
- Added `CODEX-DEPLOY-PROMPT.md` for the first deploy-focused Codex pass.

### Improved from previous batches
- The homepage is sharper and less explanatory.
- The section hubs now read more consistently as launch pages rather than internal project milestones.
- Core calculator pages guide the user more cleanly from headline answer to next action.
- Shared related-pathway modules now vary their language more naturally and feel less templated.

### Quality issues fixed
- Reduced repetitive sentence starts and repeated “useful when” patterns.
- Tightened places where the copy still sounded slightly generated or over-explained.
- Improved result and helper copy so pages are more confident without sounding salesy.
- Prepared a cleaner handoff into deploy-focused work by documenting the next Codex pass directly.

### Remaining work
- Real-browser QA, Lighthouse testing and deployment configuration still need to be handled in the next heavier pass.
- Social preview assets, favicons and host-specific configuration are still missing.
- Structured data should be validated externally before first deployment.

### Handoff note
Batch 15 is the last light-touch refinement batch before heavier Codex and deployment work.
