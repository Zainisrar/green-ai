import { expect, test } from "@playwright/test";
import {
  FIGMA_BUGS,
  getFigmaBug,
  REFERENCE_VIEWPORTS,
} from "./figma-bug-manifest";

const selectedId = process.env.FIGMA_BUG_ID ?? "21";
const selectedBugs =
  selectedId === "all"
    ? FIGMA_BUGS
    : [getFigmaBug(Number(selectedId))].filter((entry) => entry !== undefined);

for (const bug of selectedBugs) {
  test(`bug-${String(bug.id).padStart(4, "0")} ${bug.title}`, async ({
    page,
  }) => {
    await page.route("**/api/explore/why-green", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: "{}",
      }),
    );
    await page.route("**/api/explore/global-snapshot", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: "{}",
      }),
    );
    await page.route("**/api/explore/fast-fact-stats", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: "{}",
      }),
    );
    await page.route("**/api/evolution/our-story-milestone", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: "{}",
      }),
    );
    await page.route("**/api/evolution/vision-mission", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: "{}",
      }),
    );

    for (const width of REFERENCE_VIEWPORTS) {
      const height = width === 1920 ? 970 : width >= 1024 ? 900 : 844;
      await page.setViewportSize({ width, height });
      const response = await page.goto(bug.route, {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status(), `${bug.route} should load`).toBeLessThan(400);
      await page.locator("body").waitFor({ state: "visible" });
      if ([21, 22, 23, 24, 25].includes(bug.id)) {
        await page.waitForFunction(
          ({ expectedWidth, expectedHeight }) => {
            if (expectedWidth <= 1200) {
              return Boolean(
                document.querySelector('[data-figma-responsive="mobile"]'),
              );
            }

            const canvas = document.querySelector<HTMLElement>(
              '[data-figma-responsive="desktop"]',
            );
            if (!canvas) return false;
            const expectedScale = Math.min(
              expectedWidth / 1920,
              expectedHeight / 970,
            );
            const transform = getComputedStyle(canvas).transform;
            if (transform === "none") return expectedScale === 1;
            return Math.abs(new DOMMatrix(transform).a - expectedScale) < 0.001;
          },
          { expectedWidth: width, expectedHeight: height },
        );
      } else {
        await page.waitForTimeout(750);
      }
      await page.addStyleTag({
        content: "nextjs-portal{display:none!important}",
      });
      if (width === 1920 && [21, 22, 23, 24, 25].includes(bug.id)) {
        const menuTops = await page
          .locator('[data-site-header] nav[aria-label="Primary navigation"] a')
          .evaluateAll((links) =>
            links.map((link) => link.getBoundingClientRect().top),
          );
        expect(new Set(menuTops.map((top) => Math.round(top))).size).toBe(1);
      }
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth + 1,
          ),
        )
        .toBe(true);
      await page.screenshot({
        path: `test-results/bug-${String(bug.id).padStart(4, "0")}-${width}.png`,
        fullPage: false,
      });
    }

    if (bug.id === 22) {
      await page.setViewportSize({ width: 1920, height: 970 });
      await page.goto(bug.route, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(750);
      await page
        .locator('[data-node-id="7077:14892"]')
        .click({ position: { x: 120, y: 25 } });
      await expect(
        page.getByRole("heading", { name: "REQUEST A CONSULTATION" }),
      ).toBeVisible();
      await expect(page.getByLabel("Close modal")).toBeVisible();
    }

    if (bug.id === 23) {
      await page.setViewportSize({ width: 1920, height: 970 });
      await page.goto(bug.route, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(750);
      await page.locator('[data-node-id="7077:6563"]').click();
      await expect(
        page.getByRole("heading", { name: "CONNECT WITH GREEN" }),
      ).toBeVisible();
      await expect(page.getByLabel("Close modal")).toBeVisible();
    }
  });
}
