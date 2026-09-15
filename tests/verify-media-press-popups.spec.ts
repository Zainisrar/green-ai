import { test, expect } from "@playwright/test";

test("debug explore button click", async ({ page }) => {
  page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
  page.on("pageerror", (err) => console.log("PAGE ERR:", err));

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/engage/media-press", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const result = await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button")).filter((b) =>
      b.textContent?.includes("Explore"),
    );
    console.log("Found buttons in DOM:", btns.length);
    if (btns.length > 0) {
      btns[0].click();
      return {
        clicked: true,
        btn0Text: btns[0].textContent,
        btn0Class: btns[0].className,
      };
    }
    return { clicked: false };
  });
  console.log("Evaluation result:", result);
  await page.waitForTimeout(1000);

  const hasLatest = await page.evaluate(
    () => !!document.querySelector("#latest-press-title"),
  );
  console.log("Has latest-press-title after DOM click:", hasLatest);
  expect(hasLatest).toBe(true);
});
