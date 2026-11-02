# Growth experiments and 90-day scorecard

Prepared 1 November 2026. Zero new public URLs in this cycle. The supplied GSC export supports improving existing answers; it does not establish demand for a new basket, sharing tool or additional laundry calculator. Observations start on an owner-approved release date, not this branch date.

| Hypothesis / target | User value and cost | Measure / observation | Stop or rollback | Status |
| --- | --- | --- | --- | --- |
| Clear answer snippet, flagship heater URL | Exact full-power answer and editable assumptions; small editorial change | GSC clicks, impressions, CTR, position by device/query; at least 28 comparable days, longer if few clicks | Revert title/description if query relevance deteriorates; separate seasonality and rank changes | Implemented for review |
| In-page 400/500/1000/1500/2000W presets | Faster scenario entry without more URLs; small JS/HTML change | calculate_submit / calculator_view and validation_error / calculate_submit, segmented by tool and device; 28 days | Fix or revert controls if validation or task completion worsens; retain accurate rate answers | Implemented for review |
| Distinct 2kW and monthly explanations | Clear fixed-runtime answer versus household budgeting; small content change | GSC landing-page/query mix and related_click destination; 28–56 days | Revise confusing passages if overlap persists; no automatic canonical consolidation | Implemented for review |
| Multi-appliance basket or share scenario | Potentially useful if repeated multi-device tasks emerge; medium implementation cost | First collect explicit feedback and repeat scenario demand; no inferred revenue | Do not build without evidence of a task the existing calculator cannot serve; privacy review of URLs | Deferred; no new route |
| Laundry comparison by completed load | Equivalent dryness and measured kWh; medium research/tool cost | Obtain model-specific manufacturer data or measurements for same load size, temperature and dryness | Do not rank by wattage alone; stop if comparable measurements unavailable | Caveats improved; tool deferred |
| Buyer/partner routes | Could help a later equipment decision; commercial review required | Check genuine user need, terms and visible disclosures before any integration | No affiliate, ads or referral code in this branch | Proposal only |

## Measurement baseline and checkpoints

Supplied GSC baseline: 31 July–30 October 2026, 116 clicks / 36,132 impressions, 0.321% weighted CTR. Flagship 90 clicks / 31,700 impressions. October alone: 87 clicks / 25,065 impressions, 0.347% CTR. Do not treat these as forecasts or compare them to a different-duration post-release window. Query exports are incomplete and anonymised; do not combine the unidentified CSV with GSC.

| Checkpoint after approved release | Record | Decision |
| --- | --- | --- |
| Day 0 | Release commit/date; comparable previous 28-day GSC export; page/device/query mix; event collector status; smoke evidence | Confirm baseline and event definitions; no numeric growth target invented |
| Day 30 | Clicks, impressions, CTR, position and query mix for flagship, panel, fan, oil, 2kW, monthly, sizing and laundry; calculator views, submissions, errors, rate overrides, result and related/outbound clicks | Fix usability errors first; investigate low-sample changes before attribution |
| Day 60 | Repeat comparable windows; inspect destination paths and overlapping query intent; qualitative task feedback | Keep useful experiments; edit weak snippets; establish basket/laundry need |
| Day 90 | Same scorecard, seasonal/context notes, exact-indexing report, measured implementation cost | Continue, revise or revert each experiment; new URLs remain evidence-gated |

Event engagement baseline is **not measured**: no production collector was installed or contacted. Page views cannot be inferred from calculator events, and event counts are not unique people. Do not claim conversion, ranking or revenue uplift without evidence. Identify the two crawled-not-indexed URLs in GSC manually; no URLs or causes were invented.
