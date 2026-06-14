import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 0,
  workers: 2,
  use: {
    baseURL: 'http://localhost:5000',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'off',
  },
  reporter: [['list'], ['json', { outputFile: 'test-results/audit-results.json' }]],
});
