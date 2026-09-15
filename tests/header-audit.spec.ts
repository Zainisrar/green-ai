import { test } from "@playwright/test";

test("Audit header menus geometry and styles across routes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 970 });

  const routes = [
    "/explore/welcome-to-green",
    "/energy",
    "/engineering/products",
    "/expertise",
    "/empower/join-us",
    "/engage/reach-us",
    "/enlighten/insights-articles",
    "/enlighten/events-webinars",
    "/home/renewable-energy-the-core",
    "/ecosystem/supplier-code-of-conduct",
    "/ecosystem/client-partnerships",
    "/endeavors/project-portfolio",
    "/engage/become-a-supplier",
  ];

  for (const r of routes) {
    await page.goto(r, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(400);

    const headerInfo = await page.evaluate(() => {
      const h = document.querySelector("header[data-site-header], header");
      if (!h) return { found: false };
      const hRect = h.getBoundingClientRect();
      const nav = h.querySelector("nav");
      const navRect = nav ? nav.getBoundingClientRect() : null;
      const links = Array.from(h.querySelectorAll("nav a")).map((a) => {
        const r = a.getBoundingClientRect();
        const cs = window.getComputedStyle(a);
        return {
          text: a.textContent?.trim(),
          left: Math.round(r.left),
          top: Math.round(r.top),
          width: Math.round(r.width),
          height: Math.round(r.height),
          fontSize: cs.fontSize,
          textTransform: cs.textTransform,
          fontFamily: cs.fontFamily.split(",")[0],
          color: cs.color,
        };
      });
      const btn = h.querySelector("button[class*='menuButton']");
      const btnRect = btn ? btn.getBoundingClientRect() : null;
      return {
        found: true,
        headerClass: h.className,
        headerRect: {
          top: Math.round(hRect.top),
          left: Math.round(hRect.left),
          width: Math.round(hRect.width),
          height: Math.round(hRect.height),
        },
        navRect: navRect
          ? {
              top: Math.round(navRect.top),
              left: Math.round(navRect.left),
              width: Math.round(navRect.width),
              height: Math.round(navRect.height),
            }
          : null,
        btnRect: btnRect
          ? {
              top: Math.round(btnRect.top),
              left: Math.round(btnRect.left),
              width: Math.round(btnRect.width),
              height: Math.round(btnRect.height),
            }
          : null,
        links,
      };
    });

    console.log(`\n=== Route: ${r} ===`);
    console.log("Header:", JSON.stringify(headerInfo.headerRect));
    console.log("Nav:", JSON.stringify(headerInfo.navRect));
    console.log("Btn:", JSON.stringify(headerInfo.btnRect));
    console.log("Links:", JSON.stringify(headerInfo.links));
  }
});
