#!/usr/bin/env python3
"""Remove near-black backgrounds from Moringa scroll JPG frames → transparent PNG."""
from __future__ import annotations

import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Install Pillow: python3 -m pip install pillow", file=sys.stderr)
    sys.exit(1)

SEQ_DIR = Path(__file__).resolve().parents[1] / "public" / "hero" / "moringa" / "sequence"
FRAME_COUNT = 90
# Pixels at or below this RGB level become transparent (JPG black + compression)
THRESHOLD = 42
# Soft edge band above threshold for smoother bottle edges
SOFTNESS = 28


def alpha_from_rgb(r: int, g: int, b: int) -> int:
    peak = max(r, g, b)
    if peak <= THRESHOLD:
        return 0
    if peak >= THRESHOLD + SOFTNESS:
        return 255
    # Linear fade in the softness band
    return int(255 * (peak - THRESHOLD) / SOFTNESS)


def remove_background(src: Path, dest: Path) -> None:
    img = Image.open(src).convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, _ = pixels[x, y]
            a = alpha_from_rgb(r, g, b)
            pixels[x, y] = (r, g, b, a)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, format="PNG", optimize=True)


def main() -> None:
    processed = 0
    for i in range(1, FRAME_COUNT + 1):
        stem = f"ezgif-frame-{i:03d}"
        jpg = SEQ_DIR / f"{stem}.jpg"
        if not jpg.exists():
            print(f"skip missing {jpg.name}")
            continue
        png = SEQ_DIR / f"{stem}.png"
        remove_background(jpg, png)
        processed += 1
        if i <= 3 or i == FRAME_COUNT:
            print(f"saved {png.name}")

    print(f"done: {processed} frames → {SEQ_DIR}")


if __name__ == "__main__":
    main()
