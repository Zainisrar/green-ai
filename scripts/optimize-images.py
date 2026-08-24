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
import time

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

# Progress is recorded here so an interrupted run can be resumed, and so no file
# is ever re-encoded twice (each JPEG re-encode costs a little quality).
# Delete this file to force a full re-scan.
STATE_FILE = ".image-optimizer-state"

# Stop cleanly after this many seconds instead of being killed mid-file. Some of
# these PNGs take 10-20s each, so a full pass over ~900 files does not fit in one
# run; the state file makes repeated runs converge. 0 disables the budget.
TIME_BUDGET = float(os.environ.get("IMAGE_OPT_BUDGET", "150"))

# Files too large to decode safely; reported at the end.
oversized: list[tuple[str, int, tuple[int, int]]] = []


def process(path: str) -> tuple[int, int, str] | None:
    """Return (before, after, note) if the file was (or would be) improved."""
    before = os.path.getsize(path)
    ext = path.lower().rsplit(".", 1)[-1]
    try:
        im = Image.open(path)
        # Check dimensions from the header before committing to a full decode.
        if im.size[0] * im.size[1] > MAX_PIXELS:
            oversized.append((path, before, im.size))
            im.close()
            return None
        # Small files are not worth re-encoding, but their dimensions still
        # need checking above so highly compressed oversized images are
        # included in the safety report.
        if before < MIN_BYTES:
            im.close()
            return None
        im.load()
    except Exception as exc:  # unreadable / not actually an image
        print(f"  !! skipped {path}: {exc}")
        return None

    original_dims = im.size
    # Pillow does not carry these through every resize/convert operation. Keep
    # them explicitly so replacing a JPEG never changes its display rotation
    # or colour profile.
    jpeg_exif = im.info.get("exif") if ext != "png" else None
    jpeg_icc_profile = im.info.get("icc_profile") if ext != "png" else None
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
            save_options = {
                "quality": JPEG_QUALITY,
                "optimize": True,
                "progressive": True,
            }
            if jpeg_exif:
                save_options["exif"] = jpeg_exif
            if jpeg_icc_profile:
                save_options["icc_profile"] = jpeg_icc_profile
            im.save(tmp, "JPEG", **save_options)

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
    # Resume support. Re-encoding a JPEG repeatedly degrades it a little each
    # time, so remember what has already been handled and never touch it twice.
    # Also lets a long run be stopped and restarted without losing progress.
    done: set[str] = set()
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE, encoding="utf8") as fh:
            done = {line.strip() for line in fh if line.strip()}

    candidates: list[tuple[int, str]] = []
    for dirpath, _dirnames, filenames in os.walk(ROOT):
        for name in filenames:
            ext = name.lower().rsplit(".", 1)[-1] if "." in name else ""
            if ext not in ("png", "jpg", "jpeg"):
                continue
            p = os.path.join(dirpath, name)
            if p in done:
                continue
            try:
                candidates.append((os.path.getsize(p), p))
            except OSError:
                continue

    # Biggest files first: that is where the payload actually lives, and it means
    # an interrupted run still delivers most of the benefit.
    candidates.sort(reverse=True)

    results = []
    scanned = 0
    started = time.monotonic()
    timed_out = False

    state = open(STATE_FILE, "a", encoding="utf8")
    try:
        for _size, path in candidates:
            if TIME_BUDGET and time.monotonic() - started > TIME_BUDGET:
                timed_out = True
                break
            scanned += 1
            outcome = process(path)
            if not DRY_RUN:
                state.write(path + "\n")
                state.flush()
            if outcome:
                before, after, note = outcome
                results.append((before, after, path, note))
                print(
                    f"  {before / 1048576:6.2f}M -> {after / 1048576:5.2f}M  "
                    f"{note:<22} {path}",
                    flush=True,
                )
    finally:
        state.close()

    remaining = len(candidates) - scanned
    if results:
        results.sort(key=lambda r: -(r[0] - r[1]))
        before_total = sum(r[0] for r in results)
        after_total = sum(r[1] for r in results)
        verb = "would shrink" if DRY_RUN else "shrank"
        print(f"\nprocessed {scanned} images; {verb} {len(results)}")
        print(
            f"{before_total / 1048576:.1f} MB -> {after_total / 1048576:.1f} MB "
            f"(saved {(before_total - after_total) / 1048576:.1f} MB, "
            f"{100 - 100 * after_total / before_total:.0f}%)"
        )
    else:
        print(f"\nprocessed {scanned} images; nothing to improve.")

    if oversized:
        print(
            f"\nskipped {len(oversized)} file(s) too large to decode safely "
            f"(over {MAX_PIXELS / 1_000_000:.0f} megapixels). These need manual attention:"
        )
        for path, size, dims in sorted(oversized, key=lambda r: -r[1]):
            print(f"  {size / 1048576:6.2f}M  {dims[0]}x{dims[1]}  {path}")

    if timed_out or remaining:
        print(
            f"\n{remaining} file(s) not yet examined. Run the script again to continue "
            f"(already-processed files are recorded in {STATE_FILE} and will be skipped)."
        )


if __name__ == "__main__":
    main()
