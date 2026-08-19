import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

await mkdir('/home/ubuntu/green-ai-waaj529/test-results/bug-0052', { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
for (const [name, viewport] of [['desktop', { width: 1920, height: 970 }], ['mobile', { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const response = await page.goto('http://127.0.0.1:5006/ecosystem/community-impact-loop', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `/home/ubuntu/green-ai-waaj529/test-results/bug-0052/baseline-${name}.png`, fullPage: false });
  console.log(JSON.stringify({ name, status: response?.status(), errors, bodyLength: (await page.locator('body').innerText()).length }));
  await page.close();
}
await browser.close();
