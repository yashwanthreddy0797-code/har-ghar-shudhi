#!/usr/bin/env python3
"""Prepare Moringa hero scroll assets from user-supplied bottle + cap PNGs."""
from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ASSET = Path(
    "/Users/yashwanthreddy/.cursor/projects/Users-yashwanthreddy-Demo/assets"
)
OUT = Path(__file__).resolve().parents[1] / "public" / "hero"
SCENE = OUT / "scene"

BOTTLE_SRC = ASSET / (
    "ChatGPT_Image_May_29__2026__03_48_44_PM-b006e3db-c298-4c17-972f-dcef02f6709b.png"
)
CAP_SRC = ASSET / (
    "ChatGPT_Image_May_29__2026__12_31_03_PM-b7e7d584-9b5a-4455-8be2-d95708a20fe5.png"
)

CANVAS = (682, 1024)


def flood_transparent(
    rgb: Image.Image, seeds: list[tuple[int, int]], thresh: int = 28
) -> Image.Image:
    w, h = rgb.size
    px = rgb.load()
    visited = [[False] * w for _ in range(h)]
    rgba = Image.new("RGBA", (w, h))
    rpx = rgba.load()
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            rpx[x, y] = (r, g, b, 255)
    q: deque[tuple[int, int]] = deque(seeds)
    while q:
        x, y = q.popleft()
        if x < 0 or y < 0 or x >= w or y >= h or visited[y][x]:
            continue
        r, g, b = px[x, y]
        if abs(r - g) > thresh or abs(g - b) > thresh or abs(r - b) > thresh:
            continue
        visited[y][x] = True
        rpx[x, y] = (r, g, b, 0)
        q.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])
    return rgba


def erase_cap_band(img: Image.Image, cap_ratio: float = 0.14) -> Image.Image:
    out = img.copy()
    bbox = img.getbbox()
    if not bbox:
        return out
    left, top, right, bottom = bbox
    height = bottom - top
    cap_bottom = top + int(height * cap_ratio)
    px = out.load()
    w, h = out.size
    cx = (left + right) // 2
    half_w = int((right - left) * 0.24)
    x0 = max(0, cx - half_w)
    x1 = min(w, cx + half_w)
    src_y0 = cap_bottom + 10
    src_y1 = min(h - 1, src_y0 + 28)
    for y in range(top, cap_bottom):
        for x in range(x0, x1):
            px[x, y] = (px[x, y][0], px[x, y][1], px[x, y][2], 0)
    for y in range(top, cap_bottom):
        sy = src_y0 + (y - top) % max(1, src_y1 - src_y0)
        for x in range(x0, x1):
            px[x, y] = px[x, sy]
    return out


def align_cap_on_bottle(
    bottle: Image.Image, cap: Image.Image, cap_top_ratio: float = 0.0
) -> Image.Image:
    """Place isolated cap graphic on the same canvas as the bottle neck."""
    b = bottle.getbbox()
    c = cap.getbbox()
    if not b or not c:
        return cap
    left, top, right, _bottom = b
    cx = (left + right) // 2
    cap_crop = cap.crop(c)
    cw, ch = cap_crop.size
    cap_top = top + int((b[3] - b[1]) * cap_top_ratio)
    paste_x = cx - cw // 2
    canvas = Image.new("RGBA", bottle.size, (0, 0, 0, 0))
    canvas.paste(cap_crop, (paste_x, cap_top), cap_crop)
    return canvas


def main() -> None:
    SCENE.mkdir(parents=True, exist_ok=True)

    w, h = CANVAS
    bottle_rgb = Image.open(BOTTLE_SRC).convert("RGB")
    cap_rgb = Image.open(CAP_SRC).convert("RGB")

    bottle = flood_transparent(
        bottle_rgb, [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)], thresh=35
    )
    cap_raw = flood_transparent(
        cap_rgb, [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)], thresh=12
    )
    cap = align_cap_on_bottle(bottle, cap_raw, cap_top_ratio=0.0)
    body_open = erase_cap_band(bottle, cap_ratio=0.14)

    closed = Image.alpha_composite(erase_cap_band(bottle, cap_ratio=0.14), cap)

    closed.save(OUT / "moringa-bottle.png", optimize=True)
    body_open.save(SCENE / "bottle-body-open.png", optimize=True)
    cap.save(SCENE / "bottle-cap.png", optimize=True)

    b = bottle.getbbox()
    c = cap.getbbox()
    print("Saved hero assets to", OUT)
    print("  bottle bbox:", b)
    print("  cap bbox:", c)
    if b and c:
        cap_h = c[3] - c[1]
        body_w = b[2] - b[0]
        cap_w = c[2] - c[0]
        stack_h = h
        print("  suggested yOffsetRatio:", round((c[1] - b[1]) / stack_h, 4))
        print("  suggested pivotYRatio:", round((c[1] - b[1] + cap_h * 0.85) / stack_h, 4))
        print("  suggested scale:", round(cap_w / body_w, 4))


if __name__ == "__main__":
    main()
