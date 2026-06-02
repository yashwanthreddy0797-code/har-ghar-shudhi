#!/usr/bin/env python3
"""
Optimize Moringa hero scroll frames for the web.

Aligns each frame by the central bottle region (ignores side capsules/particles)
so the jar stays locked horizontally during scroll playback.

Usage:
  python3 scripts/optimize-moringa-sequence.py
  python3 scripts/optimize-moringa-sequence.py --source "/path/to/frames"
"""
from __future__ import annotations

import argparse
import json
import re
import statistics
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Install Pillow: python3 -m pip install pillow", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = ROOT / "public" / "hero" / "moringa" / "source"
OUT = ROOT / "public" / "hero" / "moringa" / "sequence"
MANIFEST = ROOT / "lib" / "hero" / "moringa-sequence.manifest.json"

# Imperfect capsule transition frames (open neck, no flying capsules)
EXCLUDED_FRAME_INDICES = [66, 67, 68, 69]
EXCLUDED_SOURCES = ["69.png", "70.png", "71.png", "72.png"]

OUTPUT_W = 720
OUTPUT_H = 1024
ANCHOR_BOTTOM = 918
ANCHOR_CENTER_X = OUTPUT_W / 2
# Sized so the jar matches the original hero scale (~0.22× source) after inner-ROI alignment
TARGET_STRIP_HEIGHT = 415
WEBP_QUALITY = 82
SUPPORTED = {".png", ".webp", ".jpg", ".jpeg"}

# Inner ROI — jar body only (excludes side capsules / powder bursts)
INNER_LEFT = 0.38
INNER_RIGHT = 0.62
INNER_TOP = 0.22
INNER_BOTTOM = 0.90
# Narrow column at the jar base for stable vertical anchoring
BASE_LEFT = 0.46
BASE_RIGHT = 0.54


def natural_sort_key(path: Path) -> tuple:
    parts = [
        int(x) if x.isdigit() else x.lower() for x in re.split(r"(\d+)", path.stem)
    ]
    return (parts, path.suffix)


def collect_sources(source_dir: Path) -> list[Path]:
    files = [
        p
        for p in source_dir.iterdir()
        if p.is_file() and p.suffix.lower() in SUPPORTED
    ]
    return sorted(files, key=natural_sort_key)


def _roi_bounds(
    w: int, h: int, left: float, top: float, right: float, bottom: float
) -> tuple[int, int, int, int]:
    return (
        int(w * left),
        int(h * top),
        int(w * right),
        int(h * bottom),
    )


def bottle_anchor(img: Image.Image) -> tuple[float, float, float] | None:
    """Alpha-weighted centroid + base row in the inner jar ROI."""
    w, h = img.size
    left, top, right, bottom = _roi_bounds(
        w, h, INNER_LEFT, INNER_TOP, INNER_RIGHT, INNER_BOTTOM
    )
    crop = img.crop((left, top, right, bottom))
    px = crop.load()
    cw, ch = crop.size

    sx = sy = sw = 0.0
    base_y: float | None = None
    bl, bt, br, bb = _roi_bounds(cw, ch, BASE_LEFT, 0.72, BASE_RIGHT, 1.0)
    for y in range(ch):
        for x in range(cw):
            alpha = px[x, y][3]
            if alpha < 32:
                continue
            sx += x * alpha
            sy += y * alpha
            sw += alpha
            if bl <= x < br and y >= bt:
                if base_y is None or y > base_y:
                    base_y = float(y)

    if sw <= 0 or base_y is None:
        return None

    cx = sx / sw + left
    base = base_y + top
    height = bb - top
    return cx, base, height


def align_and_resize(img: Image.Image, scale: float) -> Image.Image:
    w, h = img.size
    new_w = max(1, int(round(w * scale)))
    new_h = max(1, int(round(h * scale)))
    resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    anchor = bottle_anchor(resized)
    if not anchor:
        return Image.new("RGBA", (OUTPUT_W, OUTPUT_H), (0, 0, 0, 0))

    cx, base, _ = anchor
    dx = round(ANCHOR_CENTER_X - cx)
    dy = round(ANCHOR_BOTTOM - base)

    canvas = Image.new("RGBA", (OUTPUT_W, OUTPUT_H), (0, 0, 0, 0))
    canvas.paste(resized, (dx, dy), resized)
    return canvas


def save_webp(img: Image.Image, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, format="WEBP", quality=WEBP_QUALITY, method=6)


def cleanup_sequence(expected_count: int) -> None:
    for path in OUT.iterdir():
        if not path.is_file():
            continue
        if path.suffix.lower() in {".jpg", ".jpeg", ".png"}:
            path.unlink()
            print(f"removed {path.name}")
            continue
        if path.suffix.lower() == ".webp":
            stem = path.stem
            if not stem.startswith("frame-"):
                path.unlink()
                print(f"removed old {path.name}")
                continue
            try:
                index = int(stem.split("-")[1])
            except (IndexError, ValueError):
                path.unlink()
                print(f"removed old {path.name}")
                continue
            if index > expected_count:
                path.unlink()
                print(f"removed stale {path.name}")


def compute_uniform_scale(sources: list[Path]) -> float:
    """One scale for all frames — median inner jar height → consistent size."""
    jar_heights: list[float] = []
    for src in sources:
        anchor = bottle_anchor(Image.open(src).convert("RGBA"))
        if anchor:
            jar_heights.append(anchor[2])

    if not jar_heights:
        return OUTPUT_H / 4000

    median_h = statistics.median(jar_heights)
    return TARGET_STRIP_HEIGHT / median_h


def main() -> None:
    parser = argparse.ArgumentParser(description="Optimize Moringa hero scroll frames")
    parser.add_argument(
        "--source",
        type=Path,
        default=DEFAULT_SOURCE,
        help="Folder with numbered PNG/JPG frames",
    )
    args = parser.parse_args()
    source_dir = args.source.expanduser().resolve()

    if not source_dir.is_dir():
        print(f"Source folder not found: {source_dir}", file=sys.stderr)
        sys.exit(1)

    sources = collect_sources(source_dir)
    if not sources:
        print(f"No images found in {source_dir}", file=sys.stderr)
        sys.exit(1)

    uniform_scale = compute_uniform_scale(sources)
    print(
        f"Optimizing {len(sources)} frames — jar anchor "
        f"(center={ANCHOR_CENTER_X}, bottom={ANCHOR_BOTTOM}, scale={uniform_scale:.4f})"
    )

    cx_values: list[float] = []
    base_values: list[float] = []
    for i, src in enumerate(sources, start=1):
        img = Image.open(src).convert("RGBA")
        aligned = align_and_resize(img, uniform_scale)
        dest = OUT / f"frame-{i:03d}.webp"
        save_webp(aligned, dest)

        anchor = bottle_anchor(aligned)
        if anchor:
            cx, base, _ = anchor
            cx_values.append(cx)
            base_values.append(base)

        if i <= 3 or i == len(sources):
            kb = dest.stat().st_size / 1024
            print(f"  {dest.name}  ← {src.name}  {kb:.0f} KB")

    if cx_values:
        cx_drift = max(cx_values) - min(cx_values)
        print(f"  horizontal drift after align: {cx_drift:.1f}px (target ≤2px)")
    if base_values:
        base_drift = max(base_values) - min(base_values)
        print(f"  vertical base drift after align: {base_drift:.1f}px (target ≤2px)")

    cleanup_sequence(len(sources))

    playback_count = len(sources) - len(EXCLUDED_FRAME_INDICES)
    scroll_vh = max(360, round(playback_count * (500 / 90)))
    manifest = {
        "frameCount": len(sources),
        "playbackFrameCount": playback_count,
        "excludedFrameIndices": EXCLUDED_FRAME_INDICES,
        "excludedSources": EXCLUDED_SOURCES,
        "width": OUTPUT_W,
        "height": OUTPUT_H,
        "format": "webp",
        "pathPrefix": "/hero/moringa/sequence/frame-",
        "scrollHeightVh": scroll_vh,
        "anchorCenterX": ANCHOR_CENTER_X,
        "anchorBottom": ANCHOR_BOTTOM,
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"manifest → {MANIFEST.relative_to(ROOT)}")

    total_mb = sum(p.stat().st_size for p in OUT.glob("frame-*.webp")) / (1024 * 1024)
    print(f"sequence total: {total_mb:.1f} MB ({len(sources)} webp)")


if __name__ == "__main__":
    main()
