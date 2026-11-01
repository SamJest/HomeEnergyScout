import { spawnSync } from 'node:child_process';
import { readContentData } from './lib/content-data.mjs';
import { rateIssues } from './audit-site.mjs';
const issues=rateIssues(readContentData().energyRates.currentPeriod);
if(issues.length) throw new Error(issues.join('; '));
for(const script of ['generate-traffic-pages','sync-shared-data','prepare-static-launch','build-sitemap','validate-site','audit-site']) {
  const result=spawnSync(process.execPath,[`scripts/${script}.mjs`],{stdio:'inherit'});
  if(result.status!==0) process.exit(result.status || 1);
}
