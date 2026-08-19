import { chromium } from '@playwright/test';
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
const page = await browser.newPage({ viewport: { width: 1920, height: 970 } });
await page.goto('http://127.0.0.1:5006/ecosystem/technology-innovation-alliances', { waitUntil: 'networkidle' });
await page.waitForTimeout(900);
const result = await page.evaluate(() => {
  const pick = (selector) => {
    const node = document.querySelector(selector);
    if (!node) return null;
    const r = node.getBoundingClientRect();
    const style = getComputedStyle(node);
    return { selector, x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height), display: style.display, position: style.position, color: style.color, opacity: style.opacity, zIndex: style.zIndex, visibility: style.visibility, text: (node.textContent || '').trim().slice(0, 120) };
  };
  return {
    page: pick('[class*="page"]'),
    main: pick('[class*="headerBlock"]'),
    header: pick('[class*="canvasHeader"]'),
    title: pick('h1'),
    cards: pick('[class*="card"]'),
    card1: pick('[class*="cardImage"]'),
    quote: pick('[class*="bottomQuote"] h2'),
    leftBracket: pick('[class*="quoteBracketLeft"]'),
    rightBracket: pick('[class*="quoteBracketRight"]'),
    ctas: pick('[class*="partnerCta"]'),
    frameworkCta: pick('[class*="frameworkCta"]'),
    vertical: pick('[class*="verticalTitle"]'),
    background: pick('[class*="rightCollage"]'),
    bodyText: (document.body.innerText || '').slice(0, 1500),
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
