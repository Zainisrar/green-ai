import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

await mkdir('/home/ubuntu/green-ai-waaj529/test-results/bug-0053', { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
for (const [name, viewport] of [['desktop', { width: 1920, height: 970 }], ['mobile', { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  const consoleErrors = [];
  const failedRequests = [];
  const badResponses = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('requestfailed', (request) => failedRequests.push({ url: request.url(), failure: request.failure()?.errorText }));
  page.on('response', (response) => { if (response.status() >= 400) badResponses.push({ url: response.url(), status: response.status() }); });
  const response = await page.goto('http://127.0.0.1:5006/ecosystem/technology-innovation-alliances', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `/home/ubuntu/green-ai-waaj529/test-results/bug-0053/baseline-${name}.png`, fullPage: false });
  console.log(JSON.stringify({ name, status: response?.status(), errors, consoleErrors, failedRequests, badResponses, bodyLength: (await page.locator('body').innerText()).length }));
  await page.close();
}
await browser.close();
