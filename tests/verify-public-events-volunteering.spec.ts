import { test, expect } from "@playwright/test";

test("verify public events and volunteering page, modals and enquiry popup", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 970 });
  await page.goto("/engage/public-events-volunteering", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(2000);

  // 1. Screenshot main page
  await page.screenshot({
    path: "/Users/mac/.gemini/antigravity-ide/brain/c5a9fa9f-2134-4a9a-b34b-e8e1ff9bf714/.tempmediaStorage/events_main_screen.png",
  });

  const exploreBtns = page.getByRole("button", { name: "Explore" });
  console.log("Total explore buttons:", await exploreBtns.count());

  // 2. Open Explore 0: Why We Engage
  await exploreBtns.nth(0).click();
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: "/Users/mac/.gemini/antigravity-ide/brain/c5a9fa9f-2134-4a9a-b34b-e8e1ff9bf714/.tempmediaStorage/events_modal_why_we_engage.png",
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);

  // 3. Open Explore 4: Past Highlights
  await exploreBtns.nth(4).click();
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: "/Users/mac/.gemini/antigravity-ide/brain/c5a9fa9f-2134-4a9a-b34b-e8e1ff9bf714/.tempmediaStorage/events_modal_past_highlights.png",
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
});
