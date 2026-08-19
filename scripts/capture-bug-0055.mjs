import { chromium } from '@playwright/test';
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
for (const item of [{ name: 'desktop', width: 1920, height: 970 }, { name: 'mobile', width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport: { width: item.width, height: item.height }, deviceScaleFactor: 1 });
  const errors = [];
  const failedRequests = [];
  page.on('pageerror', (error) => errors.push(String(error)));
  page.on('requestfailed', (request) => failedRequests.push({ url: request.url(), failure: request.failure()?.errorText }));
  const response = await page.goto('http://127.0.0.1:5006/empower/team-green', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `/home/ubuntu/green-ai-waaj529/test-results/bug-0055/baseline-${item.name}.png`, fullPage: false });
  console.log(JSON.stringify({ name: item.name, status: response?.status(), errors, failedRequests, bodyLength: (await page.locator('body').innerText()).length }));
  await page.close();
}
await browser.close();
