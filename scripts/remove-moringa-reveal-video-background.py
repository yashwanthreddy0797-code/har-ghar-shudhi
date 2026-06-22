#!/usr/bin/env python3
"""Key light-grey studio background from Moringa reveal video → transparent PNG frames + WebM."""
from __future__ import annotations

import math
import shutil
import subprocess
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Install Pillow: python3 -m pip install pillow", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
VIDEO = ROOT / "public" / "hero" / "moringa" / "video" / "moringa-powder-reveal-1080p.mp4"
FRAMES_DIR = ROOT / "public" / "hero" / "moringa" / "video" / "moringa-powder-reveal-frames"
WEBM_OUT = ROOT / "public" / "hero" / "moringa" / "video" / "moringa-powder-reveal-alpha.webm"

TOLERANCE = 34
SOFTNESS = 42
FPS = 24


def sample_background(img: Image.Image) -> tuple[int, int, int]:
    w, h = img.size
    points = [
        (12, 12),
        (w - 12, 12),
        (12, h - 12),
        (w - 12, h - 12),
        (w // 2, 8),
        (8, h // 2),
    ]
    rs = gs = bs = 0
    for x, y in points:
        r, g, b = img.getpixel((x, y))[:3]
        rs += r
        gs += g
        bs += b
    n = len(points)
    return rs // n, gs // n, bs // n


def key_frame(img: Image.Image) -> Image.Image:
    bg = sample_background(img)
    out = img.convert("RGBA")
    px = out.load()
    w, h = out.size
    tol, soft = TOLERANCE, SOFTNESS

    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y][:3]
            dist = math.sqrt(
                (r - bg[0]) ** 2 + (g - bg[1]) ** 2 + (b - bg[2]) ** 2
            )
            if dist <= tol:
                a = 0
            elif dist >= tol + soft:
                a = 255
            else:
                a = int(255 * (dist - tol) / soft)
            px[x, y] = (r, g, b, a)

    return out


def extract_frames() -> list[Path]:
    if FRAMES_DIR.exists():
        shutil.rmtree(FRAMES_DIR)
    FRAMES_DIR.mkdir(parents=True)

    pattern = str(FRAMES_DIR / "frame-%04d.jpg")
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-i",
            str(VIDEO),
            "-qscale:v",
            "1",
            pattern,
        ],
        check=True,
    )
    return sorted(FRAMES_DIR.glob("frame-*.jpg"))


def encode_webm() -> None:
    pattern = str(FRAMES_DIR / "frame-%04d.png")
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-hide_banner",
            "-loglevel",
            "error",
            "-framerate",
            str(FPS),
            "-i",
            pattern,
            "-c:v",
            "libvpx-vp9",
            "-pix_fmt",
            "yuva420p",
            "-b:v",
            "0",
            "-crf",
            "18",
            "-g",
            "1",
            "-keyint_min",
            "1",
            str(WEBM_OUT),
        ],
        check=True,
    )


def main() -> None:
    if not VIDEO.exists():
        print(f"Missing video: {VIDEO}", file=sys.stderr)
        sys.exit(1)

    frames = extract_frames()
    print(f"extracted {len(frames)} frames")

    for i, jpg in enumerate(frames, start=1):
        png = jpg.with_suffix(".png")
        key_frame(Image.open(jpg)).save(png, optimize=True)
        jpg.unlink()
        if i <= 2 or i == len(frames) or i % 24 == 0:
            print(f"keyed {png.name}")

    print("encoding transparent webm…")
    encode_webm()
    print(f"done → {WEBM_OUT}")


if __name__ == "__main__":
    main()
