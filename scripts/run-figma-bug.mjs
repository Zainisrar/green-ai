import { spawnSync } from "node:child_process";

const rawId = process.argv[2] ?? "21";
if (rawId !== "all" && !/^\d+$/.test(rawId)) {
  console.error("Usage: npm run bugs:test -- <21-100|all>");
  process.exit(1);
}

const result = spawnSync(
  "npx",
  ["playwright", "test", "tests/figma-bugs.spec.ts"],
  {
    env: { ...process.env, FIGMA_BUG_ID: rawId },
    stdio: "inherit",
  },
);
process.exit(result.status ?? 1);
