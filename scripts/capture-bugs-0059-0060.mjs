import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
const routes = [
  { bug: '0059', path: '/empower/community-voices' },
  { bug: '0060', path: '/engage/partner-with-us' },
];
for (const route of routes) {
  for (const viewport of [{ name: 'desktop', width: 1920, height: 970 }, { name: 'mobile', width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
    const errors = [];
    const failedRequests = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('requestfailed', (request) => failedRequests.push({ url: request.url(), failure: request.failure()?.errorText }));
    const response = await page.goto(`http://127.0.0.1:5006${route.path}`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(900);
    const dir = `/home/ubuntu/green-ai-waaj529/test-results/bug-${route.bug}`;
    await fs.mkdir(dir, { recursive: true });
    await page.screenshot({ path: `${dir}/baseline-${viewport.name}.png`, fullPage: false });
    console.log(JSON.stringify({ bug: route.bug, viewport: viewport.name, status: response?.status(), errors, failedRequests, bodyLength: (await page.locator('body').innerText()).length }));
    await page.close();
  }
}
await browser.close();
