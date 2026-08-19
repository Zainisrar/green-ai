import { chromium } from '@playwright/test';
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
const page = await browser.newPage({ viewport: { width: 1920, height: 970 } });
await page.goto('http://127.0.0.1:5006/empower/women-in-energy', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(900);
const result = await page.evaluate(() => {
  const rect = (node) => {
    if (!node) return null;
    const r = node.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height), text: (node.textContent || '').trim().slice(0, 180) };
  };
  return {
    page: rect(document.querySelector('[class*="canvasPage"]')),
    title: rect(document.querySelector('[class*="canvasTitle"]')),
    subtitle: rect(document.querySelector('[class*="canvasSubtitle"]')),
    description: rect(document.querySelector('[class*="canvasDescription"]')),
    vertical: rect(document.querySelector('[class*="canvasVerticalTitle"]')),
    artwork: rect(document.querySelector('[class*="canvasArtwork"]')),
    cards: Array.from(document.querySelectorAll('[class*="canvasCard_"]')).map((card) => ({
      card: rect(card),
      title: rect(card.querySelector('h2')),
      image: rect(card.querySelector('img')),
      description: rect(card.querySelector('p')),
      cta: rect(card.querySelector('button, a')),
    })),
    rightQuote: rect(document.querySelector('[class*="canvasRightQuote"]')),
    bottomQuote: rect(document.querySelector('[class*="canvasBottomQuote"]')),
    readMore: rect(document.querySelector('[class*="canvasReadMore"]')),
    cta1: rect(document.querySelector('[class*="canvasProspectusCta"]')),
    cta2: rect(document.querySelector('[class*="canvasJoinCta"]')),
    bodyText: (document.body.innerText || '').slice(0, 1800),
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
