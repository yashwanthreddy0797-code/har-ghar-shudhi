#!/usr/bin/env python3
"""Align Moringa hero scroll frames on one canvas (translate only, no rescale)."""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ASSET = Path(
    "/Users/yashwanthreddy/.cursor/projects/Users-yashwanthreddy-Demo/assets"
)
OUT = Path(__file__).resolve().parents[1] / "public" / "hero" / "moringa" / "sequence"

CANVAS_W, CANVAS_H = 851, 1024
ANCHOR_BOTTOM = 980
ANCHOR_CENTER_X = CANVAS_W / 2

SOURCES = [
    ("frame-00-closed.png", "HarGharShudhi-66adcb79-40b3-49f7-8c3a-aec8cd2fa875.png"),
    ("frame-01.png", "Untitled_design-5-8b52aa58-e0e9-4673-adf5-0c279ec3fcfe.png"),
    ("frame-02.png", "Untitled_design-841b6103-db75-4efb-80ae-1c39c40cd0dc.png"),
    ("frame-03.png", "Untitled_design-2-a6155763-51cd-42bd-b218-302909569f8f.png"),
    ("frame-04.png", "Untitled_design-3-b50d9d85-2906-44cb-8b71-1fa81918c5ae.png"),
    ("frame-05.png", "Untitled_design-4-33f23c39-6bca-42c8-8aff-7abf0665c363.png"),
]


def pad_to_canvas(img: Image.Image) -> Image.Image:
    """Center narrower sources on the shared canvas width."""
    if img.size == (CANVAS_W, CANVAS_H):
        return img.convert("RGBA")
    rgba = img.convert("RGBA")
    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    x = (CANVAS_W - rgba.width) // 2
    canvas.paste(rgba, (x, 0), rgba)
    return canvas


def align_frame(img: Image.Image) -> Image.Image:
    padded = pad_to_canvas(img)
    bbox = padded.getbbox()
    if not bbox:
        return Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))

    cx = (bbox[0] + bbox[2]) / 2
    bottom = bbox[3]
    dx = round(ANCHOR_CENTER_X - cx)
    dy = round(ANCHOR_BOTTOM - bottom)

    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    canvas.paste(padded, (dx, dy), padded)
    return canvas


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    for out_name, src_name in SOURCES:
        src = ASSET / src_name
        if not src.exists():
            raise FileNotFoundError(src)
        aligned = align_frame(Image.open(src))
        dest = OUT / out_name
        aligned.save(dest, format="PNG", optimize=True)
        bbox = aligned.getbbox()
        print(f"saved {dest.name} bbox={bbox}")


if __name__ == "__main__":
    main()
