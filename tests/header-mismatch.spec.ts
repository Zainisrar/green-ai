import { test } from "@playwright/test";
import { FIGMA_BUGS } from "./figma-bug-manifest";

test("Find all routes with header mismatch compared to Explore", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 970 });

  const uniqueRoutes = Array.from(new Set(FIGMA_BUGS.map((b) => b.route)));
  const mismatches: Array<{ route: string; reason: string }> = [];

  for (const r of uniqueRoutes) {
    await page
      .goto(r, { waitUntil: "domcontentloaded", timeout: 15000 })
      .catch(() => null);
    await page.waitForTimeout(450);

    const info = await page.evaluate(() => {
      const h = document.querySelector("header[data-site-header]");
      if (!h) return { found: false };
      const links = Array.from(h.querySelectorAll("nav a"));
      if (links.length === 0) return { found: true, noLinks: true };
      const firstLink = links[0].getBoundingClientRect();
      const btn = h.querySelector("button[class*='menuButton']");
      const btnRect = btn ? btn.getBoundingClientRect() : null;
      const cs = window.getComputedStyle(links[0]);
      return {
        found: true,
        firstLeft: Math.round(firstLink.left),
        firstTop: Math.round(firstLink.top),
        fontSize: cs.fontSize,
        btnWidth: btnRect ? Math.round(btnRect.width) : null,
      };
    });

    if (!info.found) {
      mismatches.push({ route: r, reason: "No header found" });
    } else if (info.noLinks) {
      mismatches.push({ route: r, reason: "Header has no nav links" });
    } else {
      // Explore baseline: firstLeft: 1076, firstTop: 47, fontSize: 20px, btnWidth: 85
      const diffs = [];
      if (Math.abs(info.firstLeft! - 1076) > 5)
        diffs.push(`left: ${info.firstLeft} (exp: 1076)`);
      if (Math.abs(info.firstTop! - 47) > 3)
        diffs.push(`top: ${info.firstTop} (exp: 47)`);
      if (info.fontSize !== "20px")
        diffs.push(`fontSize: ${info.fontSize} (exp: 20px)`);
      if (info.btnWidth && Math.abs(info.btnWidth - 85) > 5)
        diffs.push(`btnWidth: ${info.btnWidth} (exp: 85)`);

      if (diffs.length > 0) {
        mismatches.push({ route: r, reason: diffs.join(", ") });
      }
    }
  }

  console.log("\n================ HEADER MISMATCH AUDIT ================");
  console.log(`Total routes checked: ${uniqueRoutes.length}`);
  console.log(`Routes with mismatches: ${mismatches.length}`);
  for (const m of mismatches) {
    console.log(`- ${m.route}: ${m.reason}`);
  }
});
