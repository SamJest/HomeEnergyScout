import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readContentData } from '../scripts/lib/content-data.mjs';
import { rateIssues, staleIssues } from '../scripts/audit-site.mjs';
test('one rate resolves calculator defaults and copy tokens',()=>{
  const {energyRates,calculatorDefaults,pages}=readContentData();
  for(const defaults of Object.values(calculatorDefaults.calculators)) assert.equal(defaults.tariffPence,energyRates.currentPeriod.electricityUnitRatePence);
  assert.ok(!JSON.stringify(pages).includes('{{'));
});
test('date gate fails before/after validity, review due and malformed fields',()=>{
  const p=readContentData().energyRates.currentPeriod;
  assert.deepEqual(rateIssues(p,'2026-11-01'),[]);
  for(const d of ['2026-09-30','2026-11-26','2027-01-01'])assert.ok(rateIssues(p,d).length);
  assert.ok(rateIssues({...p,checkedOn:'bad'},'2026-11-01').length);
});
test('injected stale body or schema fails independently of defaults',()=>{
  for(const text of ['<p>24.67p/kWh</p>','<p>gas 5.74</p>','{"id":"ofgem-price-cap-2026-q2"}']) assert.equal(staleIssues(text).length,1);
  assert.deepEqual(staleIssues('<p>26.32p/kWh</p>'),[]);
});
