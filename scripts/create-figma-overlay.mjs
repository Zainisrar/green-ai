import { spawnSync } from "node:child_process";

const [figma, browser, output = "test-results/figma-overlay.png"] =
  process.argv.slice(2);
if (!figma || !browser) {
  console.error(
    "Usage: npm run bugs:overlay -- <figma.png> <browser.png> [output.png]",
  );
  process.exit(1);
}

const result = spawnSync(
  "magick",
  [
    figma,
    browser,
    "-define",
    "compose:args=50",
    "-compose",
    "blend",
    "-composite",
    output,
  ],
  { stdio: "inherit" },
);
if (result.error?.code === "ENOENT") {
  console.error("ImageMagick is required for overlay generation.");
}
process.exit(result.status ?? 1);
