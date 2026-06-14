import { existsSync, lstatSync, rmSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";
import { platform } from "node:os";

const projectRoot = process.cwd();
const nextPath = join(projectRoot, ".next");
const cacheDir = join(
  process.env.LOCALAPPDATA || process.env.TMP || "/tmp",
  "next-cache",
  "greenai-master",
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

if (existsSync(nextPath)) {
  const stat = lstatSync(nextPath);
  if (stat.isSymbolicLink()) {
    removePath(nextPath);
    console.log("Removed .next junction link.");
  } else {
    removePath(nextPath);
    console.log("Removed .next folder.");
  }
}

if (existsSync(cacheDir)) {
  removePath(cacheDir);
  console.log(`Cleared cache at ${cacheDir}`);
}

console.log("Next.js cache cleared. Run pnpm dev to restart.");
