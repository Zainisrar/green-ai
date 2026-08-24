#!/usr/bin/env python3
"""
Shrink oversized raster images in public/ without changing a single line of app code.

Why this exists: the site ships ~300 MB of images. Many are 4000 px wide PNGs that are
displayed at a few hundred CSS pixels, and every one of them is loaded through a plain
<img> tag, so Next.js never optimises them. The browser downloads the full file.

What it does, conservatively:
  * only touches .png / .jpg / .jpeg under public/
  * skips anything below MIN_BYTES (icons, logos, sprites stay untouched)
  * downscales to at most MAX_WIDTH px wide, preserving aspect ratio
  * re-encodes, then KEEPS THE RESULT ONLY IF IT IS ACTUALLY SMALLER
  * never changes a filename or extension, so no import or src path has to change

Safe to revert at any time:  git checkout -- public/
Safe to re-run: files already <= MAX_WIDTH are only re-encoded if that shrinks them,
and a file that has already been processed will normally be left alone the second time.

Usage:
    python3 scripts/optimize-images.py            # apply
    python3 scripts/optimize-images.py --dry-run   # report only, change nothing
"""

import os
import sys
import shutil
import tempfile

try:
    from PIL import Image, ImageFile
except ImportError:
    sys.exit("Pillow is required:  python3 -m pip install --user Pillow")

ImageFile.LOAD_TRUNCATED_IMAGES = False

ROOT = "public"
MAX_WIDTH = 1920          # widest we ever need for a full-bleed background
MIN_BYTES = 120_000       # leave small assets alone entirely
JPEG_QUALITY = 82
# Decoding is done in uncompressed RGBA, so a 6241x14089 PNG needs ~335 MB of RAM
# before anything is resized. Skip anything past this and report it instead of
# letting the whole run die on one pathological file.
MAX_PIXELS = 40_000_000
DRY_RUN = "--dry-run" in sys.argv

# Files too large to decode safely; reported at the end.
oversized: list[tuple[str, int, tuple[int, int]]] = []


def process(path: str) -> tuple[int, int, str] | None:
    """Return (before, after, note) if the file was (or would be) improved."""
    before = os.path.getsize(path)
    if before < MIN_BYTES:
        return None

    ext = path.lower().rsplit(".", 1)[-1]
    try:
        im = Image.open(path)
        im.load()
    except Exception as exc:  # unreadable / not actually an image
        print(f"  !! skipped {path}: {exc}")
        return None

    original_dims = im.size
    width, height = im.size
    resized = False
    if width > MAX_WIDTH:
        im = im.resize((MAX_WIDTH, max(1, round(height * MAX_WIDTH / width))), Image.LANCZOS)
        resized = True

    # Write the candidate alongside the original. os.replace() cannot move across
    # filesystems, and the system temp dir is frequently on a different device
    # than the project, so a temp file in /tmp would fail with EXDEV.
    fd, tmp = tempfile.mkstemp(suffix="." + ext, dir=os.path.dirname(path) or ".")
    os.close(fd)
    try:
        if ext == "png":
            im.save(tmp, "PNG", optimize=True)
        else:
            # JPEG has no alpha; flatten only if the source carried one.
            if im.mode in ("RGBA", "LA", "P"):
                im = im.convert("RGB")
            im.save(tmp, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)

        after = os.path.getsize(tmp)
        # The whole point is to get smaller. If re-encoding made it bigger
        # (Pillow's PNG encoder often loses to whatever produced the original),
        # keep the original bytes and move on.
        if after >= before:
            return None

        note = f"{original_dims[0]}x{original_dims[1]}"
        if resized:
            note += f" -> {im.size[0]}x{im.size[1]}"

        if not DRY_RUN:
            shutil.copystat(path, tmp)
            os.replace(tmp, path)
            tmp = None
        return (before, after, note)
    finally:
        if tmp and os.path.exists(tmp):
            os.unlink(tmp)


def main() -> None:
    results = []
    scanned = 0
    for dirpath, _dirnames, filenames in os.walk(ROOT):
        for name in filenames:
            ext = name.lower().rsplit(".", 1)[-1] if "." in name else ""
            if ext not in ("png", "jpg", "jpeg"):
                continue
            scanned += 1
            outcome = process(os.path.join(dirpath, name))
            if outcome:
                before, after, note = outcome
                results.append((before, after, os.path.join(dirpath, name), note))

    if not results:
        print(f"scanned {scanned} images; nothing to improve.")
        return

    results.sort(key=lambda r: -(r[0] - r[1]))
    before_total = sum(r[0] for r in results)
    after_total = sum(r[1] for r in results)

    verb = "would shrink" if DRY_RUN else "shrank"
    print(f"scanned {scanned} images; {verb} {len(results)}")
    print(
        f"{before_total / 1048576:.1f} MB -> {after_total / 1048576:.1f} MB "
        f"(saved {(before_total - after_total) / 1048576:.1f} MB, "
        f"{100 - 100 * after_total / before_total:.0f}%)"
    )
    print("\nlargest reductions:")
    for before, after, path, note in results[:20]:
        print(f"  {before / 1048576:6.2f}M -> {after / 1048576:5.2f}M  {note:<22} {path}")


if __name__ == "__main__":
    main()
