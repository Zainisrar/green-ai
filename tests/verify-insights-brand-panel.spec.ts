import { test, expect } from "@playwright/test";

const routes = [
  { path: "/insights/solar-hotel", name: "Solar Hotel" },
  { path: "/insights/solar-home", name: "Solar Home" },
  { path: "/insights/solar-urban", name: "Solar Urban" },
  { path: "/insights/solar-mining", name: "Solar Mining" },
];

test.describe("Insights logo green background panel audit", () => {
  for (const route of routes) {
    test(`Verify ${route.name} (${route.path}) has exactly one logo green bg panel and no duplicate left shape`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(route.path, { waitUntil: "networkidle" });

      // Check that duplicate left shape is completely absent
      const duplicateShape = page.locator("[class*='left-shape']");
      await expect(duplicateShape).toHaveCount(0);

      // Check that FigmaBrandPanel logo and rectangle exist
      const brandPanel = page.locator("[data-node-id='7077:3753']");
      await expect(brandPanel).toBeVisible();

      // Check rectangle polygon inside brand panel
      const rectangle = brandPanel.locator("[data-node-id='7077:3754'] img");
      await expect(rectangle).toBeVisible();

      // Check logo inside brand panel
      const logo = brandPanel.locator("[data-node-id='7077:3755'] img");
      await expect(logo).toBeVisible();

      // Capture screenshot for visual inspection
      const filename = `verified_${route.name.toLowerCase().replace(/\s+/g, "_")}.png`;
      await page.screenshot({
        path: `/Users/mac/.gemini/antigravity-ide/brain/f529e2ca-383f-4381-bfb2-c2e54bfd501d/${filename}`,
      });
      console.log(`Saved screenshot: ${filename}`);
    });
  }
});
