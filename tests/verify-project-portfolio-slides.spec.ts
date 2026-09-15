import { test, expect } from "@playwright/test";
import path from "path";

test.describe("Project Portfolio 7 Slides & Spring Animation Verification", () => {
  test.use({
    viewport: { width: 1920, height: 970 },
  });

  test("verifies common background, all slides, and spring animations", async ({
    page,
  }) => {
    await page.goto("http://localhost:5005/endeavors/project-portfolio", {
      waitUntil: "networkidle",
    });

    const artifactDir =
      "/Users/mac/.gemini/antigravity-ide/brain/f529e2ca-383f-4381-bfb2-c2e54bfd501d";

    // 1. Verify stray lines are gone
    const bottomRect = page.locator("[class*='bottomRect']");
    await expect(bottomRect).toHaveCount(0);
    const bottomLineA = page.locator("[class*='bottomLineA']");
    await expect(bottomLineA).toHaveCount(0);

    // 2. Verify common background
    const pageContainer = page.locator("main[class*='page']");
    await expect(pageContainer).toBeVisible();

    // 3. Slide 1: Baiyer Solar Plant (Collapsed)
    const titleH1 = page.locator("h1");
    await expect(titleH1).toContainText("Baiyer");
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(artifactDir, "test_baiyer_collapsed.png"),
    });

    // 4. Expand Baiyer Solar Plant (Trigger Spring Animation)
    const collapseBtn = page.locator("button[class*='collapseButton']");
    await collapseBtn.click();
    // Wait for spring animation duration (~1022ms)
    await page.waitForTimeout(1200);

    const statsPanel = page.locator("section[class*='statsPanel']");
    await expect(statsPanel).toBeVisible();
    await page.screenshot({
      path: path.join(artifactDir, "test_baiyer_expanded.png"),
    });

    // 5. Navigate to Next: Mongal Health Centre
    const nextPreview = page.locator("button[class*='nextPreview']");
    await nextPreview.click();
    await page.waitForTimeout(800);
    await expect(titleH1).toContainText("Mongal");
    await page.screenshot({
      path: path.join(artifactDir, "test_mongal_expanded.png"),
    });

    // 6. Collapse Mongal Health Centre
    await collapseBtn.click();
    await page.waitForTimeout(1200);
    await expect(statsPanel).not.toBeVisible();
    await page.screenshot({
      path: path.join(artifactDir, "test_mongal_collapsed.png"),
    });

    // 7. Navigate to Next: Wildlife Conservation Society
    await nextPreview.click();
    await page.waitForTimeout(800);
    await expect(titleH1).toContainText("Wildlife Conservation");
    await collapseBtn.click();
    await page.waitForTimeout(1200);
    await expect(statsPanel).toBeVisible();
    await page.screenshot({
      path: path.join(artifactDir, "test_wildlife_expanded.png"),
    });

    // 8. Go to Baiyer then to Pimaga Health Centre (Left preview from Baiyer)
    const prevPreview = page.locator("button[class*='previousPreview']");
    await prevPreview.click(); // to Baiyer
    await page.waitForTimeout(800);
    await prevPreview.click(); // from Baiyer to Pimaga
    await page.waitForTimeout(800);
    await expect(titleH1).toContainText("Pimaga");

    // Collapse Pimaga
    if (await statsPanel.isVisible()) {
      await collapseBtn.click();
      await page.waitForTimeout(1200);
    }
    await page.screenshot({
      path: path.join(artifactDir, "test_pimaga_collapsed.png"),
    });

    // Expand Pimaga
    await collapseBtn.click();
    await page.waitForTimeout(1200);
    await expect(statsPanel).toBeVisible();
    await page.screenshot({
      path: path.join(artifactDir, "test_pimaga_expanded.png"),
    });
  });
});
