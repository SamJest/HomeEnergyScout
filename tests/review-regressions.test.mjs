import fs from 'node:fs';
import vm from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fingerprint, rewriteAssetReferences, emitVersionedAssets } from '../scripts/lib/versioned-assets.mjs';
import { formatVatTreatment } from '../scripts/lib/content-data.mjs';
import { rateIssues } from '../scripts/audit-site.mjs';

function removeFixture(root) {
  assert.equal(path.dirname(path.resolve(root)),path.resolve(os.tmpdir()));
  fs.rmSync(root,{recursive:true,force:true});
}

test('static HTML loads fingerprinted calculator JS and CSS', () => {
  const html = fs.readFileSync('running-costs/electric-heater-running-cost/index.html', 'utf8');
  assert.match(html, /src="\/assets\/js\/site\.[a-f0-9]{16}\.js"/);
  assert.match(html, /href="\/assets\/css\/styles\.[a-f0-9]{16}\.css"/);
});

test('asset URLs change with bytes and replace old fingerprints without changing across line endings', () => {
  assert.equal(fingerprint('a\r\nb\r\n').hash,fingerprint('a\nb\n').hash);
  assert.notEqual(fingerprint('a').hash,fingerprint('b').hash);
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'hes-assets-'));
  try {
    fs.mkdirSync(path.join(root,'assets/js'),{recursive:true});
    fs.mkdirSync(path.join(root,'assets/css'),{recursive:true});
    fs.writeFileSync(path.join(root,'assets/js/site.js'),'old\r\n');
    fs.writeFileSync(path.join(root,'assets/css/styles.css'),'body{}\r\n');
    const first=emitVersionedAssets(root);
    fs.writeFileSync(path.join(root,'assets/js/site.js'),'new\n');
    const second=emitVersionedAssets(root);
    assert.notEqual(first['/assets/js/site.js'],second['/assets/js/site.js']);
    assert.ok(fs.existsSync(path.join(root,first['/assets/js/site.js'].slice(1))), 'Previous immutable copies remain available for cached HTML');
    assert.equal(first['/assets/css/styles.css'],second['/assets/css/styles.css']);
    const html=`<script src="${first['/assets/js/site.js']}"></script><link href="/assets/css/styles.css">`;
    const rewritten=rewriteAssetReferences(html,second);
    assert.ok(rewritten.includes(second['/assets/js/site.js']));
    assert.equal(rewriteAssetReferences(rewritten,second),rewritten);
    assert.equal(fs.readFileSync(path.join(root,second['/assets/js/site.js'].slice(1)),'utf8'),'new\n');
  } finally {removeFixture(root);}
});

test('VAT rendering follows zero, included and excluded metadata; malformed tax is rejected', () => {
  assert.equal(formatVatTreatment({percent:0}),'zero-rated for VAT');
  assert.equal(formatVatTreatment({percent:5,included:true}),'includes 5% VAT');
  assert.equal(formatVatTreatment({percent:20,included:false}),'excludes 20% VAT');
  const period=JSON.parse(fs.readFileSync('data/energy-rates.json')).currentPeriod;
  for(const value of [undefined,{percent:-1},{percent:101},{percent:5},{percent:NaN}]) {
    assert.throws(()=>formatVatTreatment(value));
    assert.ok(rateIssues({...period,electricityVat:value},'2026-11-02').some(x=>x.includes('VAT')));
  }
});

test('both static generators follow changed fuel tax metadata', () => {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'hes-tax-'));
  try {
    fs.cpSync('scripts',path.join(root,'scripts'),{recursive:true});
    fs.cpSync('data',path.join(root,'data'),{recursive:true});
    const rateFile=path.join(root,'data/energy-rates.json');
    const data=JSON.parse(fs.readFileSync(rateFile));
    data.currentPeriod.electricityVat={percent:20,included:true};
    data.currentPeriod.gasVat={percent:0};
    fs.writeFileSync(rateFile,JSON.stringify(data));
    for(const script of ['generate-traffic-pages','sync-shared-data']) {
      const result=spawnSync(process.execPath,[path.join(root,`scripts/${script}.mjs`)],{cwd:root,encoding:'utf8'});
      assert.equal(result.status,0,result.stderr);
    }
    const html=fs.readFileSync(path.join(root,'running-costs/electric-heater-running-cost/index.html'),'utf8');
    assert.ok(html.includes('electricity (includes 20% VAT)'));
    assert.ok(html.includes('gas (zero-rated for VAT)'));
    assert.ok(html.includes('standing charge, includes 20% VAT; gas'));
    assert.ok(html.includes('Electricity: includes 20% VAT; gas: zero-rated for VAT'));
  } finally {removeFixture(root);}
});

test('new result events use the same tool key as views and submissions', () => {
  let source = fs.readFileSync('assets/js/site.js', 'utf8');
  source = source.replace('  let hasInitialised = false;', '  return;\n  let hasInitialised = false;');
  const context = { window: { pageConfig: { calculatorKey: 'heater' } }, document: {}, console, Intl };
  vm.runInNewContext(source, context);
  context.window.homeEnergyScout.track('calculator_result_view', { tool: 'electric_heater_running_cost', origin: 'submit' }, 'heater');
  const events = context.window.dataLayer;
  assert.equal(events.find(e => e.event === 'calculator_result_view').tool, 'electric_heater_running_cost');
  assert.equal(events.find(e => e.event === 'result_view').tool, 'heater');
});
