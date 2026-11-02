import fs from 'node:fs';
import path from 'node:path';
import { htmlFiles, staleIssues } from './audit-site.mjs';
import { assetManifest } from './lib/versioned-assets.mjs';
import { readContentData } from './lib/content-data.mjs';

const baseUrl=(process.env.HES_BASE_URL || 'https://www.homeenergyscout.co.uk').replace(/\/$/,'');
const directory=process.env.HES_EVIDENCE_DIR || 'test-results/live';
const period=readContentData().energyRates.currentPeriod;
const report={checkedAt:new Date().toISOString(),baseUrl,routes:[],assets:[],issues:[]};
const headers=response=>Object.fromEntries(['server','content-type','cache-control','age','strict-transport-security','x-content-type-options','referrer-policy'].map(k=>[k,response.headers.get(k)]).filter(([,v])=>v));
const normalise=s=>s.replace(/\r\n?/g,'\n');
const indexable=htmlFiles().filter(f=>f!=='404.html');
for(let i=0;i<indexable.length;i+=4) {
 await Promise.all(indexable.slice(i,i+4).map(async file=>{
  const route=file==='index.html'?'/':'/'+file.replaceAll('\\','/').replace(/index\.html$/,'');
  try {
   const response=await fetch(baseUrl+route,{signal:AbortSignal.timeout(30000),headers:{'Cache-Control':'no-cache'}});
   const html=await response.text();
   report.routes.push({route,status:response.status,headers:headers(response)});
   if(response.status!==200) report.issues.push(`${route}: HTTP ${response.status}`);
   if(normalise(html)!==normalise(fs.readFileSync(file,'utf8'))) report.issues.push(`${route}: live HTML differs from release checkout`);
   if(!html.includes(`href="${baseUrl+route}"`) || !html.includes(period.id)) report.issues.push(`${route}: canonical or source-period mismatch`);
   if(staleIssues(html).length) report.issues.push(`${route}: stale tariff content`);
  } catch(error) {report.issues.push(`${route}: ${error.message}`);}
 }));
}
for(const url of Object.values(assetManifest())) {
 const response=await fetch(baseUrl+url,{signal:AbortSignal.timeout(30000)});
 const bytes=Buffer.from(await response.arrayBuffer());
 const matches=bytes.equals(fs.readFileSync(url.slice(1)));
 report.assets.push({url,status:response.status,matchesRelease:matches,headers:headers(response)});
 if(response.status!==200 || !matches) report.issues.push(`${url}: deployed bytes mismatch`);
}
for(const route of ['/sitemap.xml','/robots.txt','/missing-live-qa-route/']) {
 const response=await fetch(baseUrl+route,{signal:AbortSignal.timeout(30000),headers:{'Cache-Control':'no-cache'}});
 const text=await response.text();const expected=route.includes('missing-')?404:200;
 if(response.status!==expected) report.issues.push(`${route}: HTTP ${response.status}, expected ${expected}`);
 if(route==='/sitemap.xml' && normalise(text)!==normalise(fs.readFileSync('sitemap.xml','utf8'))) report.issues.push('Sitemap differs from release');
 if(route==='/robots.txt' && normalise(text)!==normalise(fs.readFileSync('robots.txt','utf8'))) report.issues.push('Robots differs from release');
 report.routes.push({route,status:response.status,headers:headers(response)});
}
report.routes.sort((a,b)=>a.route.localeCompare(b.route));
fs.mkdirSync(directory,{recursive:true});
fs.writeFileSync(path.join(directory,'static-live-report.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({baseUrl,checkedRoutes:report.routes.length,checkedAssets:report.assets.length,issues:report.issues},null,2));
if(report.issues.length)process.exitCode=1;
