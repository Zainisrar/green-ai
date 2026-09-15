import { test, expect } from "@playwright/test";

test("Verify Renewable Energy The Core font-family and line breaks", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/home/renewable-energy-the-core", {
    waitUntil: "networkidle",
  });

  const headline = page.locator(".panel-headline-r .panel-headline-text");
  await expect(headline).toBeVisible();

  const styles = await headline.evaluate((el) => {
    const cs = window.getComputedStyle(el);
    return {
      fontFamily: cs.fontFamily,
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      lineHeight: cs.lineHeight,
      textTransform: cs.textTransform,
      innerHTML: el.innerHTML,
    };
  });

  console.log("Headline styles and innerHTML:", styles);
  expect(styles.fontFamily).toContain("Raleway");
  expect(styles.fontWeight).toBe("600");
  expect(styles.fontSize).toBe("40px");

  // Check that the container contains RENEWABLE ENERGY and THE CORE on separate lines
  expect(styles.innerHTML).toContain("<br>");
  expect(styles.innerHTML).toContain("RENEWABLE ENERGY");
  expect(styles.innerHTML).toContain("THE CORE");

  // Capture screenshot of the R panel area
  const rPanel = page.locator(".d6-panel-copy--1");
  await rPanel.screenshot({
    path: "/Users/mac/.gemini/antigravity-ide/brain/f529e2ca-383f-4381-bfb2-c2e54bfd501d/verified_renewable_energy_core.png",
  });

  console.log("Saved verified_renewable_energy_core.png");
});
