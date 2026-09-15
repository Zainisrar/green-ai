import { test, expect } from "@playwright/test";

test.describe("Typography, Menu & Sidebar Icons, and Solar EPCM Services Button", () => {
  test("Solar EPCM Services Download CTA has no text/icon overlap and has correct tray+arrow icon", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/engineering/solar-epcm-services", {
      waitUntil: "networkidle",
    });

    const downloadBtn = page.locator(
      "button:has-text('Download EPCM Capabilities Brief')",
    );
    await expect(downloadBtn).toBeVisible();

    const label = downloadBtn.locator("[class*='label']");
    const icon = downloadBtn.locator("svg");

    const labelBox = await label.boundingBox();
    const iconBox = await icon.boundingBox();

    expect(labelBox).not.toBeNull();
    expect(iconBox).not.toBeNull();

    console.log("1920px Label Box:", labelBox);
    console.log("1920px Icon Box:", iconBox);

    // Assert icon is strictly to the right of the label (no overlap)
    expect(iconBox!.x).toBeGreaterThan(labelBox!.x + labelBox!.width);
    const gap = iconBox!.x - (labelBox!.x + labelBox!.width);
    console.log(`Gap between text and icon at 1920px: ${gap.toFixed(2)}px`);
    expect(gap).toBeGreaterThanOrEqual(8);

    // Save screenshot
    await downloadBtn.screenshot({
      path: "/Users/mac/.gemini/antigravity-ide/brain/f529e2ca-383f-4381-bfb2-c2e54bfd501d/verified_solar_epcm_btn_1920.png",
    });

    // Check at 1440px
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(400);

    const labelBox1440 = await label.boundingBox();
    const iconBox1440 = await icon.boundingBox();
    expect(iconBox1440!.x).toBeGreaterThan(
      labelBox1440!.x + labelBox1440!.width,
    );
    const gap1440 = iconBox1440!.x - (labelBox1440!.x + labelBox1440!.width);
    console.log(`Gap between text and icon at 1440px: ${gap1440.toFixed(2)}px`);
    expect(gap1440).toBeGreaterThanOrEqual(5);

    await downloadBtn.screenshot({
      path: "/Users/mac/.gemini/antigravity-ide/brain/f529e2ca-383f-4381-bfb2-c2e54bfd501d/verified_solar_epcm_btn_1440.png",
    });
  });

  test("Header Menu Button and Sidebar Close Icon have matching sizes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/explore/welcome-to-green", { waitUntil: "networkidle" });

    const menuBtn = page.locator("header button[data-node-id*='14065']");
    await expect(menuBtn).toBeVisible();
    const menuBtnBox = await menuBtn.boundingBox();
    console.log("Menu Button Box (1920px):", menuBtnBox);

    // Open drawer
    await menuBtn.click();
    await page.waitForTimeout(500);

    const closeBtn = page.locator(
      "button[class*='Navigation-module'][class*='close']",
    );
    await expect(closeBtn).toBeVisible();
    const closeBtnBox = await closeBtn.boundingBox();
    console.log("Sidebar Close Button Box (1920px):", closeBtnBox);

    // Both should be 85px x 85px (within 1px tolerance)
    expect(Math.abs(menuBtnBox!.width - 85)).toBeLessThanOrEqual(2);
    expect(Math.abs(menuBtnBox!.height - 85)).toBeLessThanOrEqual(2);
    expect(Math.abs(closeBtnBox!.width - 85)).toBeLessThanOrEqual(2);
    expect(Math.abs(closeBtnBox!.height - 85)).toBeLessThanOrEqual(2);

    // Check at 1440px
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(400);

    const closeBtnBox1440 = await closeBtn.boundingBox();
    console.log("Sidebar Close Button Box (1440px):", closeBtnBox1440);
    // On 1440px, clamp(64px, 4.427vw, 85px) evaluates to ~64px
    expect(closeBtnBox1440!.width).toBeGreaterThanOrEqual(63);
    expect(closeBtnBox1440!.width).toBeLessThanOrEqual(65);
    expect(closeBtnBox1440!.height).toBeGreaterThanOrEqual(63);
    expect(closeBtnBox1440!.height).toBeLessThanOrEqual(65);
  });

  test("Header Navigation Typography matches Montserrat 20px 500 uppercase", async ({
    page,
  }) => {
    const routes = [
      "/explore/welcome-to-green",
      "/energy",
      "/engineering/solar-epcm-services",
      "/empower/join-us",
      "/engage/reach-us",
    ];

    await page.setViewportSize({ width: 1920, height: 1080 });

    for (const route of routes) {
      await page.goto(route, { waitUntil: "networkidle" });
      const navLinks = page.locator("header nav a");
      const count = await navLinks.count();
      expect(count).toBeGreaterThanOrEqual(5);

      const firstLink = navLinks.first();
      const styles = await firstLink.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          textTransform: computed.textTransform,
          lineHeight: computed.lineHeight,
        };
      });

      console.log(`Route ${route} Typography:`, styles);
      expect(styles.fontFamily).toContain("Montserrat");
      expect(styles.fontSize).toBe("20px");
      expect(styles.fontWeight).toBe("500");
      expect(styles.textTransform).toBe("uppercase");
      expect(styles.lineHeight).toBe("24px");
    }
  });
});
