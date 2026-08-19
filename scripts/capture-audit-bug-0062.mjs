import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
for (const item of [{name:'desktop',width:1920,height:970},{name:'mobile',width:390,height:844}]) {
  const page = await browser.newPage({viewport:{width:item.width,height:item.height},deviceScaleFactor:1});
  const errors=[]; const failedRequests=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('requestfailed',r=>failedRequests.push({url:r.url(),failure:r.failure()?.errorText}));
  const response=await page.goto('http://127.0.0.1:5006/engage/investor-relations',{waitUntil:'networkidle',timeout:60000});
  await page.waitForTimeout(800);
  await fs.mkdir('/home/ubuntu/green-ai-waaj529/test-results/bug-0062',{recursive:true});
  await page.screenshot({path:`/home/ubuntu/green-ai-waaj529/test-results/bug-0062/baseline-${item.name}.png`,fullPage:false});
  const audit=await page.evaluate(()=>{const r=e=>{if(!e)return null;const b=e.getBoundingClientRect();return{x:Math.round(b.x),y:Math.round(b.y),width:Math.round(b.width),height:Math.round(b.height),text:(e.textContent||'').trim().slice(0,160)}};return {page:r(document.querySelector('[class*="page"]')),header:r(document.querySelector('[class*="headerSection"]')),title:r(document.querySelector('[class*="mainTitle"]')),sub:r(document.querySelector('[class*="subHeadline"]')),description:r(document.querySelector('[class*="description"]')),vertical:r(document.querySelector('[class*="verticalTitle"]')),collage:r(document.querySelector('[class*="rightCollage"]')),rows:Array.from(document.querySelectorAll('[class*="row_"]')).map(r),quote:r(document.querySelector('[class*="quoteCard"]')),bottom:r(document.querySelector('[class*="bottomQuote"]')),download:r(document.querySelector('[class*="downloadCta"]')),eoi:r(document.querySelector('[class*="eoiCta"]'))}});
  console.log(JSON.stringify({viewport:item.name,status:response?.status(),errors,failedRequests,audit},null,2)); await page.close();
}
await browser.close();
