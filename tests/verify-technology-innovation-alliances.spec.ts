import { test, expect } from "@playwright/test";

test("capture updated screens and popups", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 970 });
  await page.goto("/ecosystem/technology-innovation-alliances", {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1000);

  // 1. Screenshot main page
  await page.screenshot({
    path: "/Users/mac/.gemini/antigravity-ide/brain/c5a9fa9f-2134-4a9a-b34b-e8e1ff9bf714/.tempmediaStorage/main_screen_updated.png",
  });

  // 2. Click "Become a Technology Partner" to verify reused ProductEnquiry modal from elements page
  const partnerBtn = page.getByRole("button", {
    name: "Become a Technology Partner",
  });
  await partnerBtn.click();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: "/Users/mac/.gemini/antigravity-ide/brain/c5a9fa9f-2134-4a9a-b34b-e8e1ff9bf714/.tempmediaStorage/tech_partner_enquiry_modal.png",
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);

  // 3. Open Modal 1: Why We Partner
  await page.getByRole("heading", { name: "Why We Partner" }).click();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: "/Users/mac/.gemini/antigravity-ide/brain/c5a9fa9f-2134-4a9a-b34b-e8e1ff9bf714/.tempmediaStorage/modal_why_we_partner.png",
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);

  // 4. Open Modal 2: Current Technology Collaborators
  await page.getByRole("heading", { name: "Current Technology" }).click();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: "/Users/mac/.gemini/antigravity-ide/brain/c5a9fa9f-2134-4a9a-b34b-e8e1ff9bf714/.tempmediaStorage/modal_current_collaborators.png",
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);

  // 5. Open Modal 3: Research & Co-Development
  await page
    .getByRole("heading", { name: "Research & Co-Development" })
    .click();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: "/Users/mac/.gemini/antigravity-ide/brain/c5a9fa9f-2134-4a9a-b34b-e8e1ff9bf714/.tempmediaStorage/modal_research_co_dev.png",
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);

  // 6. Open Modal 4: Become an Innovation Partner
  await page.getByRole("heading", { name: "Become an Innovation" }).click();
  await page.waitForTimeout(800);
  await page.screenshot({
    path: "/Users/mac/.gemini/antigravity-ide/brain/c5a9fa9f-2134-4a9a-b34b-e8e1ff9bf714/.tempmediaStorage/modal_become_innovation_partner.png",
  });
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
});
