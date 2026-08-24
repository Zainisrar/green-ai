import { existsSync, lstatSync, rmSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { platform } from "node:os";

const projectRoot = process.cwd();
// Both dist directories must be cleaned (see next.config.ts): `.next` for
// build/start, `.next-dev` for the dev server.
const distDirs = [".next", ".next-dev"];
const cacheDirs = distDirs.map((distDir) =>
  join(
    process.env.LOCALAPPDATA || process.env.TMP || "/tmp",
    "next-cache",
    `greenai-master${distDir === ".next" ? "" : distDir}`,
  ),
);

const removePath = (target) => {
  if (!existsSync(target)) return;
  try {
    rmSync(target, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 });
  } catch {
    if (platform() === "win32") {
      execSync(`cmd /c rmdir /s /q "${target}"`, { stdio: "ignore" });
    } else {
      throw new Error(`Failed to remove ${target}`);
    }
  }
};

for (const distDir of distDirs) {
  const nextPath = join(projectRoot, distDir);
  if (!existsSync(nextPath)) continue;
  const isLink = lstatSync(nextPath).isSymbolicLink();
  removePath(nextPath);
  console.log(`Removed ${distDir} ${isLink ? "junction link" : "folder"}.`);
}

for (const cacheDir of cacheDirs) {
  if (existsSync(cacheDir)) {
    removePath(cacheDir);
    console.log(`Cleared cache at ${cacheDir}`);
  }
}

console.log("Next.js cache cleared. Run pnpm dev to restart.");
