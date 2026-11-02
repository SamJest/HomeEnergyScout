# Privacy-aware event hooks

The existing in-memory `window.dataLayer` remains the integration point. No tracking library, cookie, identifier, persistent storage, network collector, advertising or commercial link was added. Existing production analytics, if configured by the owner, must be mapped to these events with the applicable privacy/consent settings before measurement. Production ingestion has not been verified.

| Event | Meaning | Safe dimensions |
| --- | --- | --- |
| calculator_view | First time each form intersects the viewport; initialisation fallback if IntersectionObserver unavailable | page, tool |
| calculate_submit | Explicit calculation submission, including invalid submissions | page, tool |
| result_view | A successful explicit submission, not initial, preset, reset or debounced rerenders | page, tool, origin |
| validation_error | Invalid explicit submission | page, tool, origin, errorCount |
| unit_rate_override | Tariff field change committed by the user, not each keystroke | page, tool |
| related_click | Tracked same-origin link, including dynamically rendered result links | page, target pathname, context |
| outbound_click | HTTP(S) external link | page, destination hostname, context |

Legacy `calculator_submit`, `calculator_result_view`, `calculator_validation_error`, `internal_link_click` events are preserved; new names above are aliases in dataLayer. Configure a report to use **one** naming family so it does not double-count. The legacy queue holds the original event only. Existing calculator_input_change, faq_toggle and ad_slot_view hook names remain; the global allowlist deliberately drops raw estimates, room dimensions, tariffs, selected duty, free text, link labels/headings, query strings and user identifiers. No monetary result should be sent to analytics. Consumers depending on old estimate dimensions must update their mappings.

Review correction, 2 November 2026: all new calculator events use the form's `data-calculator` key for `tool` (for example `heater`). Legacy successful-result events retain their historical identifiers (for example `electric_heater_running_cost`). Use the new event family for consistent per-tool completion ratios; do not join its `tool` dimension directly to legacy result events.

Use submissions / calculator views as a form engagement count ratio, errors / submissions for validation friction, successful results / submissions for completion, and related_click by context/target for next-step usefulness. These are event ratios, not deduplicated user conversion rates. Use the device dimension of the existing analytics collector if available; do not add fingerprinting. Rate changes are counts only. Separate outbound source consultation from internal next steps. Capture comparable 28-day windows and annotate releases and source-period changes.

Browser tests inspect dataLayer for successful submissions, outbound clicks and absence of entered-cost/dimension payloads. No live analytics dashboard or production event delivery was tested.
