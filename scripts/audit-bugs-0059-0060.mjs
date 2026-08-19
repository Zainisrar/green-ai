import { chromium } from '@playwright/test';
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
const cases = [
  { bug: '0059', path: '/empower/community-voices', selectors: ['canvasPage','canvasTitle','canvasSubtitle','canvasDescription','canvasVerticalTitle','canvasQuote','canvasBottomQuote','canvasSubmitCta','canvasUploadCta'] },
  { bug: '0060', path: '/engage/partner-with-us', selectors: ['canvasPage','canvasTitle','canvasSubtitle','canvasDescription','canvasVerticalTitle','canvasBottomQuote','canvasSubmitCta','canvasDownloadCta'] },
];
for (const item of cases) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 970 } });
  await page.goto(`http://127.0.0.1:5006${item.path}`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(900);
  const result = await page.evaluate((selectors) => {
    const rect = (node) => { if (!node) return null; const r = node.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height), text: (node.textContent || '').trim().slice(0, 180) }; };
    const output = {};
    for (const name of selectors) output[name] = rect(document.querySelector(`[class*="${name}_"]`));
    output.rows = Array.from(document.querySelectorAll('[class*="canvasRow_"]')).map(rect);
    return output;
  }, item.selectors);
  console.log(JSON.stringify({ bug: item.bug, result }, null, 2));
  await page.close();
}
await browser.close();
