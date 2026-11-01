import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { costFor, formatMoney } from '../scripts/lib/content-data.mjs';

// Exercise the actual shipped runtime without initialising its DOM shell.
export function runtime() {
  let source = fs.readFileSync('assets/js/site.js', 'utf8');
  source = source.replace('  let hasInitialised = false;', '  window.testRuntime = { calculators, validators, readNumber }; return;\n  let hasInitialised = false;');
  const context = { window: {}, document: {}, console, Intl, setTimeout, clearTimeout };
  vm.runInNewContext(source, context);
  return context.window.testRuntime;
}
export function form(values) {
  const fields = Object.entries(values).map(([name, value]) => ({ name, value: String(value), type: typeof value === 'number' ? 'number' : 'select-one', getAttribute: () => null }));
  return { querySelector: selector => fields.find(field => selector === `[name="${field.name}"]`), querySelectorAll: () => fields };
}
for (const [watts, hours, days, dutyCycle, expected] of [
  [2000,1,1,100,0.5264], [2000,4,1,100,2.1056], [2000,4,30,100,63.168],
  [2000,4,30,65,41.0592], [500,1,1,100,0.1316], [400,1,1,100,0.10528],
  [1500,1,1,100,0.3948], [2000,24,1,100,12.6336]
]) test(`fixed vector ${watts}W ${hours}h ${days}d ${dutyCycle}%`, () => {
  assert.ok(Math.abs(costFor({watts,hours,days,dutyCycle,ratePence:26.32})-expected)<1e-10);
});
test('round only for display', () => assert.equal(formatMoney(63.168), '£63.17'));
test('runtime agrees with 30-day full-power static example', () => {
  const { calculators } = runtime();
  const result = calculators.heater(form({watts:2000,hoursPerDay:4,daysPerWeek:7,dutyCycle:100,tariffPence:26.32}));
  assert.ok(result.stats.some(([label,value]) => /30/.test(label) && value === '£63.17'));
});
test('heater rejects hours above 24', () => {
  const { validators } = runtime();
  assert.ok(validators.heater(form({watts:2000,hoursPerDay:25,daysPerWeek:7,dutyCycle:100,tariffPence:26.32})).some(x=>x.field==='hoursPerDay'));
});
