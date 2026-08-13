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

    for (const width of REFERENCE_VIEWPORTS) {
      const height = width === 1920 ? 970 : width >= 1024 ? 900 : 844;
      await page.setViewportSize({ width, height });
      const response = await page.goto(bug.route, {
        waitUntil: "domcontentloaded",
      });
      expect(response?.status(), `${bug.route} should load`).toBeLessThan(400);
      await page.locator("body").waitFor({ state: "visible" });
      if (bug.id === 21) {
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
  });
}
