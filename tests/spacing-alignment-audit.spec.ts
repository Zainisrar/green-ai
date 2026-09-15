import { test, expect } from "@playwright/test";
import { FIGMA_BUGS } from "./figma-bug-manifest";

export interface SpacingAlignmentIssue {
  route: string;
  viewport: number;
  type: string;
  detail: string;
  element?: string;
}

const auditIssues: SpacingAlignmentIssue[] = [];

test.describe("All Pages Spacing and Alignment Audit", () => {
  // Audit all unique routes from the manifest
  const uniqueBugs = Array.from(
    new Map(FIGMA_BUGS.map((b) => [b.route, b])).values(),
  );

  for (const bug of uniqueBugs) {
    test(`${bug.route} spacing & alignment (${bug.title})`, async ({
      page,
    }) => {
      // Mock CMS endpoints to avoid network variability during visual testing
      await page.route("**/api/**", (route) =>
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ data: [] }),
        }),
      );

      for (const width of [1920, 1440, 1024, 390]) {
        const height = width === 1920 ? 970 : width >= 1024 ? 900 : 844;
        await page.setViewportSize({ width, height });

        const response = await page.goto(bug.route, {
          waitUntil: "domcontentloaded",
          timeout: 20000,
        });

        expect(response?.status(), `${bug.route} should load`).toBeLessThan(
          400,
        );
        await page.waitForTimeout(400);

        const metrics = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientWidth = docEl.clientWidth;
          const hasHorizontalOverflow = scrollWidth > clientWidth + 3;

          let overflowElement = "";
          if (hasHorizontalOverflow) {
            for (const el of document.querySelectorAll("*")) {
              const r = el.getBoundingClientRect();
              if (r.right > clientWidth + 5 && r.width < 5000) {
                const tag = el.tagName.toLowerCase();
                const cls = el.className
                  ? `.${String(el.className).split(" ")[0]}`
                  : "";
                overflowElement = `${tag}${cls}`;
                break;
              }
            }
          }

          // Check header baseline alignment on desktop
          let headerNavUnaligned = false;
          let headerNavDiff = 0;
          const navLinks = Array.from(
            document.querySelectorAll(
              '[data-site-header] nav a, header nav a, [class*="Header"] nav a',
            ),
          );
          if (navLinks.length > 2 && window.innerWidth >= 1200) {
            const tops = navLinks.map((l) =>
              Math.round(l.getBoundingClientRect().top),
            );
            const minTop = Math.min(...tops);
            const maxTop = Math.max(...tops);
            headerNavDiff = maxTop - minTop;
            if (headerNavDiff > 4) {
              headerNavUnaligned = true;
            }
          }

          // Check buttons: icon distance and overflow
          const buttonIssues = [];
          const buttons = Array.from(
            document.querySelectorAll(
              "button, a.btn, a[class*='btn'], a[class*='Button'], a[class*='explore']",
            ),
          );
          for (const btn of buttons) {
            const bRect = btn.getBoundingClientRect();
            if (bRect.width === 0 || bRect.height === 0) continue;
            const text =
              (btn as HTMLElement).innerText?.trim() ?? btn.textContent?.trim();
            const icon = btn.querySelector("svg, img");
            if (text && icon) {
              const iRect = icon.getBoundingClientRect();
              if (
                iRect.right > bRect.right + 2 ||
                iRect.left < bRect.left - 2
              ) {
                buttonIssues.push({
                  btn: text.slice(0, 20),
                  issue: "Icon extends outside button bounds",
                });
              }
            }
          }

          // Check Figma canvas top gap or letterboxing
          const desktopCanvas = document.querySelector(
            '[data-figma-responsive="desktop"]',
          );
          let canvasTopGap = 0;
          if (desktopCanvas && window.innerWidth >= 1200) {
            const cRect = desktopCanvas.getBoundingClientRect();
            canvasTopGap = Math.round(cRect.top);
          }

          return {
            scrollWidth,
            clientWidth,
            hasHorizontalOverflow,
            overflowElement,
            headerNavUnaligned,
            headerNavDiff,
            buttonIssues,
            canvasTopGap,
          };
        });

        if (metrics.hasHorizontalOverflow) {
          auditIssues.push({
            route: bug.route,
            viewport: width,
            type: "HORIZONTAL_OVERFLOW",
            detail: `scrollWidth ${metrics.scrollWidth}px > clientWidth ${metrics.clientWidth}px`,
            element: metrics.overflowElement,
          });
        }

        if (metrics.headerNavUnaligned) {
          auditIssues.push({
            route: bug.route,
            viewport: width,
            type: "HEADER_NAV_MISALIGNED",
            detail: `Navigation links vertical difference is ${metrics.headerNavDiff}px`,
          });
        }

        if (metrics.buttonIssues.length > 0) {
          auditIssues.push({
            route: bug.route,
            viewport: width,
            type: "BUTTON_ICON_MISALIGNED",
            detail: JSON.stringify(metrics.buttonIssues),
          });
        }

        if (Math.abs(metrics.canvasTopGap) > 10) {
          auditIssues.push({
            route: bug.route,
            viewport: width,
            type: "CANVAS_TOP_OFFSET",
            detail: `Canvas top offset is ${metrics.canvasTopGap}px`,
          });
        }
      }
    });
  }

  test.afterAll(async () => {
    console.log(
      "\n================ SPACING & ALIGNMENT AUDIT FINDINGS ================",
    );
    const grouped: Record<string, SpacingAlignmentIssue[]> = {};
    for (const issue of auditIssues) {
      if (!grouped[issue.type]) grouped[issue.type] = [];
      grouped[issue.type].push(issue);
    }
    for (const [type, list] of Object.entries(grouped)) {
      console.log(`\n### Issue Type: ${type} (${list.length} occurrences)`);
      for (const item of list.slice(0, 10)) {
        console.log(
          `  - [${item.viewport}px] ${item.route}: ${item.detail} ${item.element ? `(element: ${item.element})` : ""}`,
        );
      }
      if (list.length > 10) {
        console.log(`  ... and ${list.length - 10} more`);
      }
    }
  });
});
