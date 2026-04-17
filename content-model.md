# Content Model

## Page-level fields
Suggested fields for future scale:
- slug
- title
- category
- page_type
- tool_type
- hero_summary
- user_goal
- primary_inputs
- default_assumptions
- worked_examples
- faq
- related_pages
- reviewed_date
- country
- language
- status

## Current live page types
### Homepage
Purpose:
- route users quickly into the right live section
- explain the site promise fast
- support trust and future ad placements

### Hub page
Purpose:
- act as a practical entry page for a content pillar
- group related future pages into useful clusters
- route users into the next best section
- show methodology and trust cues without becoming bloated

Current hub sections include:
- quick answer block
- cluster/topic groups
- related routes
- next-click pathways
- use-this-section guidance
- methodology note
- ad-compatible side slot

### Trust and legal pages
Purpose:
- explain the site
- explain the methodology
- support contact and compliance basics

## Calculator configuration model
Planned future fields:
- id
- slug
- page_path
- calculator_name
- inputs
- validation_rules
- default_values
- formulas
- outputs
- interpretation_rules
- result_summary_template
- disclaimer_text
- reviewed_date

## Internal linking model
Every important page should eventually link to:
- parent hub
- sibling pages with similar user intent
- the next best page after the answer
- methodology where assumptions matter
- comparison/savings/running-cost pages where the question naturally branches

## Batch 2 model update
The content hierarchy now has stable top-level hubs, which means future page data can attach to a known parent section from the start.


## Batch 3 live calculator notes
- `page_type: calculator`
- `tool_type: running_cost`
- `primary_inputs` now actively used on-page through shared form handling
- `default_assumptions` must be visible beside the tool, not hidden in documentation only
- `worked_examples` and `interpretation_text` are mandatory for live calculator pages


## Batch 4 model notes
- Added a clearer distinction between live calculator pages and supporting route pages
- Supporting route pages can be narrower practical pages linked around a live tool, such as clothes drying usage, room sizing, or low-cost savings alternatives
- Calculator configs now need to support both:
  - direct cost outputs
  - savings and simple payback outputs
- New cluster tags emerging:
  - laundry and moisture control
  - fabric heat-loss reduction


## Final model note
The launch build now has enough repeated page structure that a future Codex pass could move page metadata, assumptions, FAQs, related links and calculator settings into structured data files without changing public URLs.
