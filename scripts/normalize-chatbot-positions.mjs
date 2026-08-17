#!/usr/bin/env node
/**
 * Normalizes all D6Chatbot figmaCanvas triggerStyle blocks to the canonical
 * Figma position: top: 899, left: 1498, width: 418, right: "auto", bottom: "auto"
 *
 * The "Let's Talk Energy" button is at node 7080:56395:
 *   Group 1171276641  x:1498 y:899  w:418 h:60  (canvas-space)
 * The inner SVG wrapper (chat-panel.svg) renders 52px tall inside that group.
 */
import fs from "fs";
import path from "path";
import { glob } from "glob";

// Files to skip (Articles has a 2-page canvas at 1788, intentionally different)
const SKIP_FILES = [
  "Articles/Articles.tsx",
];

// The canonical triggerStyle to emit
const CANONICAL = `{
            top: 899,
            right: "auto",
            bottom: "auto",
            left: 1498,
            width: 418,
          }`;

// Regex that matches a triggerStyle={{ ... }} block with any of the old values
const TRIGGER_STYLE_RE =
  /triggerStyle=\{\{\s*top:\s*\d+,\s*right:\s*["']auto["'],\s*bottom:\s*["']auto["'],\s*left:\s*\d+,\s*width:\s*\d+,\s*\}\}/gs;

const files = await glob("src/app/components/**/*.tsx", { cwd: process.cwd() });

let changed = 0;
for (const file of files) {
  if (SKIP_FILES.some((skip) => file.includes(skip))) continue;
  const abs = path.resolve(process.cwd(), file);
  let src = fs.readFileSync(abs, "utf8");
  if (!src.includes('triggerVariant="figmaCanvas"')) continue;

  const updated = src.replace(TRIGGER_STYLE_RE, `triggerStyle={${CANONICAL}}`);
  if (updated !== src) {
    fs.writeFileSync(abs, updated, "utf8");
    console.log("✔ Normalized:", file);
    changed++;
  }
}

console.log(`\nDone. ${changed} files updated.`);
