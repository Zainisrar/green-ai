import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
  });

  console.log("=== 1. VERIFYING SOLAR EPCM SERVICES DOWNLOAD CTA ===");
  await page.goto("http://localhost:3005/engineering/solar-epcm-services", {
    waitUntil: "networkidle",
  });

  const downloadCta = page.locator(
    "button:has-text('Download EPCM Capabilities Brief')",
  );
  await downloadCta.waitFor({ state: "visible" });

  const ctaBox = await downloadCta.boundingBox();
  console.log("Download CTA Bounding Box:", ctaBox);

  const labelLocator = downloadCta.locator(
    "span:has-text('Download EPCM Capabilities Brief')",
  );
  const iconLocator = downloadCta.locator("svg");

  const labelBox = await labelLocator.boundingBox();
  const iconBox = await iconLocator.boundingBox();

  console.log("Label Box:", labelBox);
  console.log("Icon Box:", iconBox);

  if (labelBox && iconBox) {
    const gap = iconBox.x - (labelBox.x + labelBox.width);
    console.log(`Horizontal gap between label and icon: ${gap.toFixed(2)}px`);
    if (gap >= 0) {
      console.log("✅ SUCCESS: Icon does NOT overlap text!");
    } else {
      console.error("❌ FAILURE: Icon overlaps text by", Math.abs(gap), "px");
    }
  }

  // Screenshot button
  await downloadCta.screenshot({
    path: "/Users/mac/.gemini/antigravity-ide/brain/f529e2ca-383f-4381-bfb2-c2e54bfd501d/verified_download_btn_1920.png",
  });
  console.log("Saved verified_download_btn_1920.png");

  // Also check at 1440px
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(500);

  const labelBox1440 = await labelLocator.boundingBox();
  const iconBox1440 = await iconLocator.boundingBox();
  if (labelBox1440 && iconBox1440) {
    const gap1440 = iconBox1440.x - (labelBox1440.x + labelBox1440.width);
    console.log(
      `1440px Horizontal gap between label and icon: ${gap1440.toFixed(2)}px`,
    );
    if (gap1440 >= 0) {
      console.log("✅ SUCCESS at 1440px: Icon does NOT overlap text!");
    } else {
      console.error(
        "❌ FAILURE at 1440px: Icon overlaps text by",
        Math.abs(gap1440),
        "px",
      );
    }
  }
  await downloadCta.screenshot({
    path: "/Users/mac/.gemini/antigravity-ide/brain/f529e2ca-383f-4381-bfb2-c2e54bfd501d/verified_download_btn_1440.png",
  });

  console.log("\n=== 2. VERIFYING MENU BUTTON & SIDEBAR CLOSE ICON SIZING ===");
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("http://localhost:3005/explore/welcome-to-green", {
    waitUntil: "networkidle",
  });

  const menuBtn = page.locator("header button[aria-label*='navigation']");
  const menuBtnBox = await menuBtn.boundingBox();
  console.log("Header Menu Button Box (1920px):", menuBtnBox);

  // Click to open sidebar
  await menuBtn.click();
  await page.waitForTimeout(600);

  const closeBtn = page.locator("button[aria-label*='Close navigation']");
  await closeBtn.waitFor({ state: "visible" });
  const closeBtnBox = await closeBtn.boundingBox();
  console.log("Sidebar Close Button Box (1920px):", closeBtnBox);

  console.log(
    `Menu button width: ${menuBtnBox.width}px, height: ${menuBtnBox.height}px`,
  );
  console.log(
    `Close button width: ${closeBtnBox.width}px, height: ${closeBtnBox.height}px`,
  );
  if (
    Math.abs(menuBtnBox.width - closeBtnBox.width) < 2 &&
    Math.abs(menuBtnBox.height - closeBtnBox.height) < 2
  ) {
    console.log(
      "✅ SUCCESS: Header Menu Button and Sidebar Close Button have matching dimensions!",
    );
  } else {
    console.warn("⚠️ Dimensions differ slightly:", menuBtnBox, closeBtnBox);
  }

  // Close navigation
  await closeBtn.click();
  await page.waitForTimeout(500);

  console.log("\n=== 3. VERIFYING TYPOGRAPHY ACROSS PAGES ===");
  const testRoutes = [
    "/explore/welcome-to-green",
    "/energy",
    "/engineering/solar-epcm-services",
    "/empower/join-us",
  ];

  for (const route of testRoutes) {
    await page.goto(`http://localhost:3005${route}`, {
      waitUntil: "networkidle",
    });
    const navItem = page.locator("header nav a").first();
    const styles = await navItem.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        textTransform: computed.textTransform,
        lineHeight: computed.lineHeight,
      };
    });
    console.log(`Route ${route} nav typography:`, styles);
  }

  await browser.close();
  console.log("\nAll checks completed!");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
