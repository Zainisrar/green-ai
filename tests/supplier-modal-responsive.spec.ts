import { expect, test } from "@playwright/test";

const viewports = [
  { name: "figma-desktop", width: 1920, height: 970 },
  { name: "desktop-laptop", width: 1366, height: 768 },
  { name: "tablet", width: 1024, height: 768 },
  { name: "mobile", width: 390, height: 844 },
] as const;

for (const viewport of viewports) {
  test(`supplier modal remains usable at ${viewport.name}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/ecosystem/key-supply-categories", {
      waitUntil: "domcontentloaded",
    });

    const responsiveMode = viewport.width > 1200 ? "desktop" : "mobile";
    await expect(
      page.locator(`[data-figma-responsive="${responsiveMode}"]`),
    ).toBeVisible();
    await page.waitForTimeout(500);

    await page
      .getByRole("button", { name: "Supplying to GREEN?" })
      .filter({ visible: true })
      .click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await page.waitForTimeout(350);
    await expect(
      dialog.getByRole("heading", { name: "SUPPLYING TO GREEN?" }),
    ).toBeVisible();
    await expect(dialog.getByPlaceholder("ORGANIZATION")).toHaveCount(0);
    await expect(dialog.locator('select[name="consultationType"]')).toHaveCount(
      0,
    );
    await expect(dialog.locator('select[name="supplyType"]')).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Submit" })).toBeVisible();

    const box = await dialog.boundingBox();
    if (!box) throw new Error("Supplier dialog has no layout box");
    expect(box.x).toBeGreaterThanOrEqual(-1);
    expect(box.y).toBeGreaterThanOrEqual(-1);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 1);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height + 1);

    if (viewport.name === "figma-desktop") {
      expect(box.x).toBeCloseTo(110, 0);
      expect(box.y).toBeCloseTo(162.87, 1);
      expect(box.width).toBeCloseTo(1688, 0);
      expect(box.height).toBeCloseTo(665, 0);
    }

    const horizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(horizontalOverflow).toBeLessThanOrEqual(1);

    await page.screenshot({
      path: `test-results/supplier-modal-${viewport.name}.png`,
      fullPage: false,
    });
  });
}
