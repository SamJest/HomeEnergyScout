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
  return { querySelector: selector => fields.find(field => selector === `[name="${field.name}"]`), querySelectorAll: () => fields.filter(x=>x.type==='number') };
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

const samples = {
  appliance:{watts:2000,minutesPerUse:60,usesPerWeek:7,tariffPence:26.32,standbyWatts:0,standbyHoursPerDay:0},
  heater:{watts:2000,hoursPerDay:4,daysPerWeek:7,dutyCycle:100,tariffPence:26.32},
  dehumidifier:{watts:300,hoursPerDay:4,daysPerWeek:7,tariffPence:26.32,extractionLitres:0},
  'loft-insulation':{annualHeatingCost:1000,currentDepth:0,upgradeCost:500},
  'led-lighting':{bulbCount:10,oldWatts:50,ledWatts:5,hoursPerDay:4,tariffPence:26.32,replacementCost:50},
  'old-fridge-replacement':{replacementKwh:200,replacementCost:400,tariffPence:26.32},
  'heater-size':{roomLength:4,roomWidth:3,ceilingHeight:2.4,hoursPerDay:4,tariffPence:26.32},
  'heating-comparison':{optionA:'oil',optionB:'fan',roomArea:15,watts:2000,dutyCycle:100,hoursPerDay:4,daysPerWeek:7,tariffPence:26.32},
  'heated-airer-vs-tumble-dryer':{airerWatts:300,airerHoursPerLoad:4,tumbleKwhPerLoad:2,loadsPerWeek:3,tariffPence:26.32},
  'portable-ac-vs-fan':{fanWatts:50,fanHoursPerDay:4,acWatts:1000,acHoursPerDay:4,hotDaysPerYear:30,tariffPence:26.32}
};
for(const [key,values] of Object.entries(samples)) {
  test(`${key}: valid fixed scenario and finite result`,()=>{
    const {calculators,validators}=runtime();
    assert.equal(validators[key](form(values)).length,0);
    const result=calculators[key](form(values));assert.ok(result.stats.length);
    assert.ok(!/NaN|Infinity|undefined/.test(JSON.stringify(result)));
  });
  test(`${key}: rejects nonfinite, blank, negative and extreme numeric inputs`,()=>{
    const {validators}=runtime();
    for(const [field,value] of Object.entries(values).filter(([,v])=>typeof v==='number')) {
      for(const invalid of [NaN,Infinity,-1,1e30,'']) {
        const f=form({...values,[field]:invalid});
        // A number input can expose blank/invalid strings, as in a real DOM.
        const input=f.querySelector(`[name="${field}"]`);input.type='number';
        assert.ok(validators[key](f).some(x=>x.field===field),`${key} ${field} ${invalid}`);
      }
    }
  });
}
test('independent expected outputs for every calculator family',()=>{
  const {calculators}=runtime();
  const has=(key,value)=>assert.ok(calculators[key](form(samples[key])).stats.some(([,v])=>v===value),key+' '+value);
  has('appliance','£0.53');has('heater','£63.17');has('dehumidifier','£0.32');
  has('loft-insulation','£130.00');has('led-lighting','£172.92');has('old-fridge-replacement','£60.54');
  has('heater-size','1,300 W');has('heating-comparison','£766.44');
  has('heated-airer-vs-tumble-dryer','£0.32');has('portable-ac-vs-fan','£1.58');
});
test('heater duty and schedule boundaries and override',()=>{
  const {calculators,validators}=runtime();const p=samples.heater;
  for(const [field,value] of [['watts',0],['dutyCycle',0],['dutyCycle',101],['daysPerWeek',8],['hoursPerDay',25]])assert.ok(validators.heater(form({...p,[field]:value})).length);
  assert.equal(validators.heater(form({...p,watts:100000,hoursPerDay:24,dutyCycle:1,tariffPence:1000})).length,0);
  assert.ok(calculators.heater(form({...p,dutyCycle:5})).stats.some(([,v])=>v==='£3.16'));
  assert.ok(calculators.heater(form({...p,tariffPence:30})).stats.some(([,v])=>v==='£72.00'));
});
