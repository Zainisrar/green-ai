import { test } from "@playwright/test";

test("Capture project portfolio", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/endeavors/project-portfolio", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);
  await page.screenshot({
    path: "/Users/mac/.gemini/antigravity-ide/brain/f529e2ca-383f-4381-bfb2-c2e54bfd501d/test_portfolio_loaded.png",
  });
});
