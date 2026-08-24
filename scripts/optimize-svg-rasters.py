#!/usr/bin/env python3
"""
Shrink base64-embedded raster images inside SVG files.

Why this exists: several "SVGs" exported from Figma are not really vector art --
they are a thin vector wrapper around a huge embedded JPEG/PNG. public/images/
service/bg.svg is 12.3 MB and declares width="1920", yet the JPEG inside it is
4096 px wide. It is used as a CSS `background: url(...)`, so the browser downloads
all 12.3 MB before the section can paint, and nothing can optimise it: Next.js
image optimisation never touches CSS backgrounds, and an SVG is opaque to it.

Because SVG scales its embedded rasters to the coordinate space set by the
<image> element, shrinking the embedded pixels does not change layout at all.

What it does, conservatively:
  * only rewrites the base64 payload of data:image/(jpeg|png) URIs
  * every other byte of the SVG is left exactly as it was
  * downscales an embedded raster to at most the SVG's own declared width
    (never below MIN_TARGET_WIDTH), capped at MAX_WIDTH
  * KEEPS THE RESULT ONLY IF THE WHOLE FILE GETS SMALLER
  * never changes a filename, so no CSS or import has to change

Safe to revert:  git checkout -- public/

Usage:
    python3 scripts/optimize-svg-rasters.py --dry-run   # report only
    python3 scripts/optimize-svg-rasters.py             # apply
"""

import base64
import io
import os
import re
import sys

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required:  python3 -m pip install --user Pillow")

ROOT = "public"
MIN_BYTES = 500_000  # only bother with genuinely heavy SVGs
MAX_WIDTH = 1920
MIN_TARGET_WIDTH = 640  # never shrink an embedded raster below this
JPEG_QUALITY = 82
DRY_RUN = "--dry-run" in sys.argv

DATA_URI = re.compile(r"data:image/(jpeg|jpg|png);base64,([A-Za-z0-9+/=]+)")
SVG_WIDTH = re.compile(r"<svg[^>]*?\bwidth=\"([0-9.]+)", re.IGNORECASE)


def target_width(svg_text: str) -> int:
    """Widest the embedded raster ever needs to be, from the SVG's own header."""
    m = SVG_WIDTH.search(svg_text)
    declared = int(float(m.group(1))) if m else MAX_WIDTH
    return max(MIN_TARGET_WIDTH, min(declared, MAX_WIDTH))


def shrink_payload(fmt: str, payload: str, cap: int) -> str | None:
    """Re-encode one embedded raster. Returns new base64, or None to keep as-is."""
    try:
        raw = base64.b64decode(payload)
        im = Image.open(io.BytesIO(raw))
        im.load()
    except Exception:
        return None

    if im.width > cap:
        im = im.resize((cap, max(1, round(im.height * cap / im.width))), Image.LANCZOS)

    buf = io.BytesIO()
    if fmt == "png":
        im.save(buf, "PNG", optimize=True)
    else:
        if im.mode in ("RGBA", "LA", "P"):
            im = im.convert("RGB")
        im.save(buf, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)

    if buf.tell() >= len(raw):
        return None
    return base64.b64encode(buf.getvalue()).decode("ascii")


def process(path: str) -> tuple[int, int, int] | None:
    before = os.path.getsize(path)
    if before < MIN_BYTES:
        return None
    with open(path, encoding="utf8", errors="strict") as fh:
        text = fh.read()

    cap = target_width(text)
    changed = 0
    out: list[str] = []
    cursor = 0

    for m in DATA_URI.finditer(text):
        fmt = "png" if m.group(1) == "png" else "jpeg"
        new_payload = shrink_payload(fmt, m.group(2), cap)
        if new_payload is None:
            continue
        out.append(text[cursor : m.start(2)])
        out.append(new_payload)
        cursor = m.end(2)
        changed += 1

    if not changed:
        return None
    out.append(text[cursor:])
    new_text = "".join(out)
    after = len(new_text.encode("utf8"))

    # Only accept a net win on the file as a whole.
    if after >= before:
        return None

    if not DRY_RUN:
        # Write to a sibling temp then swap, so an interrupted write can never
        # leave a half-written SVG in place of a working one.
        tmp = path + ".tmp"
        with open(tmp, "w", encoding="utf8") as fh:
            fh.write(new_text)
        os.replace(tmp, path)
    return (before, after, changed)


def main() -> None:
    results = []
    for dirpath, _dirnames, filenames in os.walk(ROOT):
        for name in filenames:
            if not name.lower().endswith(".svg"):
                continue
            path = os.path.join(dirpath, name)
            try:
                outcome = process(path)
            except Exception as exc:
                print(f"  !! skipped {path}: {exc}", flush=True)
                continue
            if outcome:
                before, after, n = outcome
                results.append((before, after, path, n))
                print(
                    f"  {before / 1048576:6.2f}M -> {after / 1048576:5.2f}M  "
                    f"({n} embedded raster{'s' if n > 1 else ''})  {path}",
                    flush=True,
                )

    if not results:
        print("no SVGs improved.")
        return
    b = sum(r[0] for r in results)
    a = sum(r[1] for r in results)
    verb = "would shrink" if DRY_RUN else "shrank"
    print(
        f"\n{verb} {len(results)} SVG(s): {b / 1048576:.1f} MB -> {a / 1048576:.1f} MB "
        f"(saved {(b - a) / 1048576:.1f} MB, {100 - 100 * a / b:.0f}%)"
    )


if __name__ == "__main__":
    main()
