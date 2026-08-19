import { chromium } from '@playwright/test';
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
const page = await browser.newPage({ viewport: { width: 1920, height: 970 } });
await page.goto('http://127.0.0.1:5006/empower/team-green', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(900);
const result = await page.evaluate(() => {
  const pick = (selector) => {
    const node = document.querySelector(selector);
    if (!node) return null;
    const r = node.getBoundingClientRect();
    const s = getComputedStyle(node);
    return { selector, x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height), display: s.display, position: s.position, text: (node.textContent || '').trim().slice(0, 180) };
  };
  return {
    page: pick('[class*="canvasPage"]'),
    header: pick('[class*="canvasHeader"]'),
    title: pick('[class*="canvasHeader"] h1'),
    subtitle: pick('[class*="canvasHeader"] h2'),
    description: pick('[class*="canvasHeader"] p'),
    vertical: pick('[class*="canvasVerticalTitle"]'),
    artwork: pick('[class*="canvasArtwork"]'),
    quote: pick('[class*="canvasQuote"]'),
    quoteText: pick('[class*="canvasQuote"] p'),
    cta1: pick('[class*="canvasCtas"] > :first-child'),
    cta2: pick('[class*="canvasCtas"] > :last-child'),
    bodyText: (document.body.innerText || '').slice(0, 1200),
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
