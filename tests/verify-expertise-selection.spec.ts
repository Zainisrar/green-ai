import { test, expect } from "@playwright/test";

test.describe("Expertise Slider and Grid Consistency", () => {
  test("aligns all selected slider items with grid view and vice versa", async ({
    page,
  }) => {
    await page.goto("/expertise");
    await page.waitForLoadState("networkidle");

    const sliderTab = page.locator('button[data-node-id="7077:3722"]');
    const gridTab = page.locator('button[data-node-id="7077:3718"]');
    const heroHeading = page.locator('h1[data-node-id="7077:3711"]');
    const exploreBtn = page.locator('a[data-node-id="7077:3746"]');
    const selectedBadge = page.locator('button[data-node-id="7077:3738"] b');

    // Test cases for slider panels
    const sliderCases = [
      {
        nodeId: "7077:3787", // Healthcare (index 0)
        expectedHighlight: "HEALTHCARE",
        expectedLabel: "Powering Healthcare",
        expectedSlug: "/expertise/powering-healthcare",
      },
      {
        nodeId: "7077:3790", // Home (index 1)
        expectedHighlight: "HOME",
        expectedLabel: "Powering Home",
        expectedSlug: "/expertise/powering-home",
      },
      {
        nodeId: "7077:3796", // Corporate (index 2)
        expectedHighlight: "CORPORATE",
        expectedLabel: "Powering Corporate",
        expectedSlug: "/expertise/powering-corporate",
      },
      {
        nodeId: "7077:3802", // Rural (index 3)
        expectedHighlight: "RURAL",
        expectedLabel: "Powering Rural",
        expectedSlug: "/expertise/powering-rural",
      },
      {
        nodeId: "7077:3807", // Telecom (index 4)
        expectedHighlight: "TELECOM",
        expectedLabel: "Powering Telecom",
        expectedSlug: "/expertise/powering-telecom",
      },
      {
        nodeId: "7077:3810", // Communities (index 5)
        expectedHighlight: "COMMUNITIES",
        expectedLabel: "Powering Communities",
        expectedSlug: "/expertise/powering-communities",
      },
    ];

    for (const c of sliderCases) {
      // Switch to slider view
      await sliderTab.click();
      await expect(sliderTab).toHaveAttribute("aria-pressed", "true");

      // Click the slider panel
      const panel = page.locator(`button[data-node-id="${c.nodeId}"]`);
      await panel.click();

      // Verify in slider view
      await expect(heroHeading).toContainText("POWERING");
      await expect(heroHeading).toContainText(c.expectedHighlight);

      // Switch to grid view
      await gridTab.click();
      await expect(gridTab).toHaveAttribute("aria-pressed", "true");

      // Verify in grid view that same solution is selected
      await expect(heroHeading).toContainText("POWERING");
      await expect(heroHeading).toContainText(c.expectedHighlight);
      await expect(selectedBadge).toHaveText(c.expectedLabel);
      await expect(exploreBtn).toHaveAttribute("href", c.expectedSlug);
    }

    // Now test selecting in grid view and switching to slider view
    const gridCases = [
      {
        nodeId: "7077:3725", // Healthcare (item 0)
        expectedHighlight: "HEALTHCARE",
        expectedSliderPanelNodeId: "7077:3787",
      },
      {
        nodeId: "7077:3726", // Communities (item 1)
        expectedHighlight: "COMMUNITIES",
        expectedSliderPanelNodeId: "7077:3810",
      },
      {
        nodeId: "7077:3727", // Rural (item 2)
        expectedHighlight: "RURAL",
        expectedSliderPanelNodeId: "7077:3802",
      },
      {
        nodeId: "7077:3728", // Corporate (item 3)
        expectedHighlight: "CORPORATE",
        expectedSliderPanelNodeId: "7077:3796",
      },
      {
        nodeId: "7077:3729", // Telecom (item 4)
        expectedHighlight: "TELECOM",
        expectedSliderPanelNodeId: "7077:3807",
      },
      {
        nodeId: "7077:3730", // Home (item 5)
        expectedHighlight: "HOME",
        expectedSliderPanelNodeId: "7077:3790",
      },
    ];

    for (const gc of gridCases) {
      // Ensure on grid view
      await gridTab.click();
      const card = page.locator(`button[data-node-id="${gc.nodeId}"]`);
      await card.click();

      await expect(heroHeading).toContainText("POWERING");
      await expect(heroHeading).toContainText(gc.expectedHighlight);

      // Switch to slider view
      await sliderTab.click();
      await expect(heroHeading).toContainText("POWERING");
      await expect(heroHeading).toContainText(gc.expectedHighlight);
      const activeSliderCard = page.locator(
        `button[data-node-id="${gc.expectedSliderPanelNodeId}"]`,
      );
      await expect(activeSliderCard).toHaveAttribute("aria-pressed", "true");
    }
  });
});
