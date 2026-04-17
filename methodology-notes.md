# Methodology Notes

## Core principle
The site should give practical estimates that are useful enough to support a decision, while staying honest about what drives uncertainty.

## Running costs
Base formula:
- power in kW × hours used × unit rate in £/kWh

Important notes:
- some appliances cycle on and off rather than drawing full power constantly
- some pages should show a range where exact wattage varies widely
- user-entered tariff should be preferred where possible

## Savings
Savings pages should:
- start with likely annual savings direction
- explain what the saving depends on
- include a simple payback view where cost data is known
- avoid pretending a single saving number fits every household

## Sizing
Sizing pages should:
- use practical room assumptions
- explain where insulation, ceiling height, damp load, and occupancy change the answer
- avoid fake precision
- route users to running-cost and comparison pages afterwards

## Comparisons
Comparison pages should:
- give a verdict first
- explain when the verdict changes
- compare like with like
- include scenario guidance, not just a headline table

## Batch 2 update
The methodology is still foundational, but the live section hubs now make it clearer where each page type belongs and how users should move between them.


## Batch 4 notes
- Added dehumidifier running cost logic using direct rated-power cost calculation and usage-mode based interpretation
- Added loft insulation savings logic using annual heating spend as the baseline and a simple savings-rate model based on current loft insulation depth, home type and fuel type
- Extended calculator engine support from pure running-cost outputs to savings/payback outputs
- Continued the principle that assumptions must be visible on-page close to the result rather than hidden in documentation only


## Final handoff note
Reviewed dates and methodology wording should only be updated when formulas, cost assumptions or decision logic materially change.
