import { defineConfig } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:5005";

const port = (() => {
  try {
    return new URL(baseURL).port || "5005";
  } catch {
    return "5005";
  }
})();

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  retries: 0,
  workers: 2,
  use: {
    baseURL,
    headless: true,
    screenshot: "only-on-failure",
    trace: "off",
  },
  webServer: process.env.PLAYWRIGHT_SKIP_WEBSERVER
    ? undefined
    : {
        command: `npx next dev --port ${port}`,
        url: baseURL,
        reuseExistingServer: true,
        timeout: 120_000,
      },
  reporter: [
    ["list"],
    ["json", { outputFile: "test-results/audit-results.json" }],
  ],
});
