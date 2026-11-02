import fs from 'node:fs';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import path from 'node:path';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const baseUrl=(process.env.HES_BASE_URL || 'http://127.0.0.1:8097').replace(/\/$/,'');
const evidenceDir=process.env.HES_EVIDENCE_DIR || 'test-results';
const server=process.env.HES_BASE_URL ? null : spawn(process.execPath,['scripts/dev-server.mjs','8097'],{stdio:'pipe'});
if(server) await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',code=>reject(new Error(`Server exited ${code}`)));});
const browser=await chromium.launch({headless:true,...(process.env.BROWSER_PATH ? {executablePath:process.env.BROWSER_PATH} : {})});
const report={baseUrl,browser:browser.version(),checks:[],metrics:[]};
fs.mkdirSync(evidenceDir,{recursive:true});
try {
 if(!process.env.HES_BASE_URL && fs.existsSync('test-results/baseline-location.txt')) {
  const baselineRoot=fs.readFileSync('test-results/baseline-location.txt','utf8').trim();
  const baselineServer=spawn(process.execPath,[path.resolve('scripts/dev-server.mjs'),'8098'],{cwd:baselineRoot,stdio:'pipe'});
  try {
   await new Promise((resolve,reject)=>{baselineServer.stdout.once('data',resolve);baselineServer.once('error',reject);});
   for(const width of [320,390,1280]) {
    const page=await browser.newPage({viewport:{width,height:900}});
    await page.goto('http://127.0.0.1:8098/running-costs/electric-heater-running-cost/');
    await page.screenshot({path:`test-results/before-heater-${width}.png`});await page.close();
   }
  } finally {baselineServer.kill();}
 }
 const routes=['/','/running-costs/electric-heater-running-cost/','/running-costs/2kw-heater-cost-per-hour/','/running-costs/panel-heater-running-cost/','/sizing/heater-room-size-calculator/','/compare/dehumidifier-vs-heating-to-dry-clothes/','/running-costs/appliance-running-cost/','/compare/heating-option-comparison/','/running-costs/dehumidifier-running-cost/','/savings/loft-insulation-savings/','/savings/led-lighting-savings/','/savings/old-fridge-replacement-savings/','/compare/heated-airer-vs-tumble-dryer/','/compare/portable-ac-vs-fan-cost/'];
 for(const width of [320,390,1280]) {
  const page=await browser.newPage({viewport:{width,height:900}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
    window.qaMetrics={lcp:0,cls:0};
    new PerformanceObserver(list=>{for(const entry of list.getEntries())window.qaMetrics.lcp=entry.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
    new PerformanceObserver(list=>{for(const entry of list.getEntries())if(!entry.hadRecentInput)window.qaMetrics.cls+=entry.value;}).observe({type:'layout-shift',buffered:true});
  });
  for(const route of routes) {
   const response=await page.goto(baseUrl+route);assert.equal(response.status(),200,route);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('input:not([type="hidden"]),select').evaluateAll(fields=>fields.filter(f=>!f.labels?.length).length),0,`Unlabelled field ${route}`);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://www.homeenergyscout.co.uk'+route);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`Overflow ${width} ${route}`);
   const form=page.locator('form[data-calculator]');
   if(await form.count()) {
    const target=await form.getAttribute('data-results-target');const panel=page.locator('#'+target);
    assert.equal(await panel.getAttribute('data-state'),'ready',route);
    assert.ok(!/NaN|Infinity/.test(await panel.innerText()));
    const first=form.locator('input[type="number"]').first();
    await first.fill('-1');await form.locator('button[type="submit"]').click();
    assert.equal(await panel.getAttribute('data-state'),'invalid');
    assert.equal(await first.getAttribute('aria-invalid'),'true');
    const errorId=await first.getAttribute('aria-describedby');assert.ok(errorId && await page.locator('#'+errorId.split(' ').at(-1)).count());
    assert.equal(await page.locator('.form-errors').evaluate(el=>document.activeElement===el),true,`Error focus ${width} ${route}`);
    await form.locator('button[type="reset"]').click();await page.waitForTimeout(250);
    assert.equal(await panel.getAttribute('data-state'),'ready');
    await form.locator('button[type="submit"]').click();
    const toolKey=await form.getAttribute('data-calculator');
    assert.equal(await page.evaluate(()=>window.dataLayer.filter(e=>e.event==='result_view').at(-1)?.tool),toolKey,'Result/view/submit tool identifiers agree');
    if(route.includes('electric-heater-running-cost')) {
     assert.ok((await panel.innerText()).includes('£63.17'));
     await form.locator('[data-preset-value="500"]').click();assert.equal(await form.locator('[name="watts"]').inputValue(),'500');
     await form.locator('[name="tariffPence"]').fill('30');await form.locator('button[type="submit"]').click();
     assert.ok((await panel.innerText()).includes('£18.00'));
     await form.locator('button[type="reset"]').click();await page.waitForTimeout(250);
     await form.locator('[name="dutyCycle"]').fill('65');await form.locator('button[type="submit"]').click();assert.ok((await panel.innerText()).includes('£41.06'));
     await page.context().setOffline(true);
     await form.locator('[name="watts"]').fill('400');await form.locator('button[type="submit"]').click();assert.ok((await panel.innerText()).includes('£8.21'));
     await page.context().setOffline(false);
     const events=await page.evaluate(()=>window.dataLayer);assert.ok(events.some(e=>e.event==='calculate_submit'));
     assert.ok(events.every(e=>!('annualCost' in e)&&!('roomArea' in e)&&!('dutyCycle' in e)));
     await form.locator('button[type="reset"]').click();await page.waitForTimeout(250);
     await form.locator('[name="watts"]').focus();await page.keyboard.press('Enter');
     assert.equal(await panel.evaluate(el=>document.activeElement===el),true,'Keyboard submission focuses result');
     await page.evaluate(()=>document.addEventListener('click',e=>e.preventDefault(),{once:true,capture:true}));
     await panel.locator('a[data-track-link]').first().click();
     assert.ok(await page.evaluate(()=>window.dataLayer.some(e=>e.event==='related_click'&&e.context==='calculator-result-route')));
     await page.evaluate(()=>document.addEventListener('click',e=>e.preventDefault(),{once:true,capture:true}));
     await page.locator('#sources a[href^="https://www.ofgem.gov.uk"]').first().click();
     assert.ok(await page.evaluate(()=>window.dataLayer.some(e=>e.event==='outbound_click')));
     await page.locator('#calculator').screenshot({path:`${evidenceDir}/heater-calculator-${width}.png`});
    }
   }
   if(route==='/' || route.includes('electric-heater-running-cost')) {
    await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
    await page.waitForTimeout(150);
    await page.screenshot({path:`${evidenceDir}/${route==='/'?'home':'heater'}-${width}.png`});
    report.metrics.push({width,route,...await page.evaluate(()=>window.qaMetrics),note:'Headless browser, unthrottled; lab diagnostic, not field CWV. INP unmeasured.'});
   }
   report.checks.push({width,route,status:'PASS'});
  }
  assert.deepEqual(errors,[]);await page.close();
 }
 const page=await browser.newPage();
 assert.equal((await page.goto(baseUrl+'/sitemap.xml')).status(),200);
 assert.equal((await page.request.get(baseUrl+'/robots.txt')).status(),200);
 assert.equal((await page.goto(baseUrl+'/missing-qa-route/')).status(),404);
 fs.writeFileSync(path.join(evidenceDir,'browser-report.json'),JSON.stringify(report,null,2));
 console.log(JSON.stringify(report,null,2));
} finally { await browser.close();server?.kill(); }
