import { test } from "@playwright/test";

test("Capture project portfolio open state", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/endeavors/project-portfolio", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const btn = page.locator("button[class*='collapseButton']");
  await btn.click();
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: "/Users/mac/.gemini/antigravity-ide/brain/f529e2ca-383f-4381-bfb2-c2e54bfd501d/test_portfolio_open.png",
  });
});
