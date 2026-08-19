import { chromium } from '@playwright/test';
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
const page = await browser.newPage({ viewport: { width: 1920, height: 970 } });
await page.goto('http://127.0.0.1:5006/ecosystem/community-impact-loop', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
const result = await page.evaluate(() => {
  const pick = (selector) => {
    const node = document.querySelector(selector);
    if (!node) return null;
    const r = node.getBoundingClientRect();
    return { selector, x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height), text: (node.textContent || '').trim().slice(0, 100) };
  };
  return {
    canvas: pick('[data-figma-responsive="desktop"] > *'),
    title: pick('[class*="canvasHeaderContent"] h1'),
    vertical: pick('[class*="canvasVerticalImage"] img'),
    menu: pick('[class*="canvasMenu"]'),
    callout: pick('[class*="canvasCallout"]'),
    panel: pick('[class*="canvasPanel"]'),
    quote: pick('[class*="canvasQuote"]'),
    ctas: pick('[class*="canvasCtas"]'),
    buttons: [...document.querySelectorAll('[class*="canvasCtas"] button, [class*="canvasCtas"] a')].map((node) => { const r=node.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height), text:(node.textContent||'').trim() }; }),
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
