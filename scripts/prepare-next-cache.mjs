import { existsSync, lstatSync, mkdirSync, rmSync, symlinkSync } from "node:fs";
import { join } from "node:path";
import { platform } from "node:os";

const projectRoot = process.cwd();
// Dev and production builds use separate dist directories (see next.config.ts),
// so this script must prepare whichever one the caller is about to write to.
const distDir = process.argv[2] || ".next";
const nextPath = join(projectRoot, distDir);
const isWin = platform() === "win32";

if (!isWin) {
  // On macOS/Linux, if the dist dir is a symlink to an old cache directory,
  // remove it so Next uses a clean local directory.
  if (existsSync(nextPath)) {
    const stat = lstatSync(nextPath);
    if (stat.isSymbolicLink()) {
      rmSync(nextPath, { recursive: true, force: true });
      console.log(`Cleaned old symbolic link for ${distDir}`);
    }
  }
  process.exit(0);
}

const cacheDir = join(
  process.env.LOCALAPPDATA || process.env.TMP || "/tmp",
  "next-cache",
  `greenai-master${distDir === ".next" ? "" : distDir}`,
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
    console.log(
      `Removing local ${distDir} folder (OneDrive sync causes cache corruption)...`,
    );
    rmSync(nextPath, { recursive: true, force: true });
  } else {
    console.log(`${distDir} already points to local cache.`);
    process.exit(0);
  }
}

symlinkSync(cacheDir, nextPath, "junction");
console.log(`Linked ${distDir} -> ${cacheDir}`);

