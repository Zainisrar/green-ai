import { existsSync, lstatSync, mkdirSync, rmSync, symlinkSync } from "node:fs";
import { join } from "node:path";
import { platform } from "node:os";

const projectRoot = process.cwd();
const nextPath = join(projectRoot, ".next");
const isWin = platform() === "win32";

if (!isWin) {
  // On macOS/Linux, if .next is a symlink to an old cache directory, remove it so Next uses a clean local .next
  if (existsSync(nextPath)) {
    const stat = lstatSync(nextPath);
    if (stat.isSymbolicLink()) {
      rmSync(nextPath, { recursive: true, force: true });
      console.log("Cleaned old symbolic link for .next");
    }
  }
  process.exit(0);
}

const cacheDir = join(
  process.env.LOCALAPPDATA || process.env.TMP || "/tmp",
  "next-cache",
  "greenai-master",
);

mkdirSync(cacheDir, { recursive: true });

// Clean stale pages cache if present
const stalePages = join(cacheDir, "server", "pages");
if (existsSync(stalePages)) {
  rmSync(stalePages, { recursive: true, force: true });
}

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

symlinkSync(cacheDir, nextPath, "junction");
console.log(`Linked .next -> ${cacheDir}`);

