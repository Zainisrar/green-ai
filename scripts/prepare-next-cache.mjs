import { existsSync, lstatSync, mkdirSync, rmSync, symlinkSync } from "node:fs";
import { join } from "node:path";
import { platform } from "node:os";

const projectRoot = process.cwd();
const nextPath = join(projectRoot, ".next");
const cacheDir = join(
  process.env.LOCALAPPDATA || process.env.TMP || "/tmp",
  "next-cache",
  "greenai-master",
);

mkdirSync(cacheDir, { recursive: true });

if (existsSync(nextPath)) {
  const stat = lstatSync(nextPath);
  if (stat.isDirectory() && !stat.isSymbolicLink()) {
    console.log("Removing local .next folder (OneDrive sync causes cache corruption)...");
    rmSync(nextPath, { recursive: true, force: true });
  } else {
    console.log(".next already points to local cache.");
    process.exit(0);
  }
}

if (platform() === "win32") {
  symlinkSync(cacheDir, nextPath, "junction");
} else {
  symlinkSync(cacheDir, nextPath, "dir");
}

console.log(`Linked .next -> ${cacheDir}`);
