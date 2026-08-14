import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  retries: 0,
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:5005",
    headless: true,
    screenshot: "only-on-failure",
    trace: "off",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:5005",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results/audit-results.json" }],
  ],
});
