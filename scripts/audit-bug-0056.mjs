import { chromium } from '@playwright/test';
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
const page = await browser.newPage({ viewport: { width: 1920, height: 970 } });
await page.goto('http://127.0.0.1:5006/empower/careers-at-green', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(900);
const result = await page.evaluate(() => {
  const pick = (selector) => {
    const node = document.querySelector(selector);
    if (!node) return null;
    const r = node.getBoundingClientRect();
    return { selector, x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height), text: (node.textContent || '').trim().slice(0, 180) };
  };
  return {
    page: pick('[class*="canvasPage"]'),
    title: pick('[class*="canvasTitle"]'),
    subtitle: pick('[class*="canvasSubtitle"]'),
    description: pick('[class*="canvasDescription"]'),
    vertical: pick('[class*="canvasVerticalTitle"]'),
    artwork: pick('[class*="canvasArtwork"]'),
    rows: Array.from(document.querySelectorAll('[class*="canvasRow_"]')).map((row) => ({
      row: pickFor(row),
      label: pickFor(row.querySelector('h2')),
      cta: pickFor(row.querySelector('button, a')),
    })),
    rightQuote: pick('[class*="canvasRightQuote"]'),
    readMore: pick('[class*="canvasReadMore"]'),
    bottomQuote: pick('[class*="canvasBottomQuote"]'),
    cta1: pick('[class*="canvasCtas"] > :first-child'),
    cta2: pick('[class*="canvasCtas"] > :last-child'),
    bodyText: (document.body.innerText || '').slice(0, 1600),
  };
  function pickFor(node) {
    if (!node) return null;
    const r = node.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height), text: (node.textContent || '').trim() };
  }
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
