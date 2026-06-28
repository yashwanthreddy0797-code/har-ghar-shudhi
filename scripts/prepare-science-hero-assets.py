#!/usr/bin/env python3
"""Export science/landing hero banners at maximum visual quality + retina variants."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "landing"
ASSETS = Path.home() / ".cursor/projects/Users-yashwanthreddy-Demo/assets"

SOURCES = {
    "diabetes-shudhi-hero-main": ASSETS
    / "ChatGPT_Image_Jun_23__2026__02_15_55_PM-c3b4ba06-a16c-4692-a742-5a661b5878f7.png",
    "diabetes-shudhi-hero-panels": ASSETS
    / "ChatGPT_Image_Jun_23__2026__02_16_19_PM-e3012658-a552-4c58-bd3d-1280f36d8999.png",
}

# Fallback to existing public files if asset copies are missing.
FALLBACKS = {
    "diabetes-shudhi-hero-main": PUBLIC / "diabetes-shudhi-hero-main.png",
    "diabetes-shudhi-hero-panels": PUBLIC / "diabetes-shudhi-hero-panels.png",
}

RETINA_SCALE = 2


def load_rgb(path: Path) -> Image.Image:
    with Image.open(path) as img:
        return img.convert("RGB")


def save_master(img: Image.Image, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, format="JPEG", quality=98, subsampling=0, optimize=False)


def save_retina(img: Image.Image, dest: Path) -> None:
    width, height = img.size
    retina = img.resize(
        (width * RETINA_SCALE, height * RETINA_SCALE),
        Image.Resampling.LANCZOS,
    )
    retina = retina.filter(ImageFilter.UnsharpMask(radius=1.1, percent=105, threshold=2))
    retina.save(dest, format="JPEG", quality=96, subsampling=0, optimize=False)


def main() -> None:
    for stem, preferred in SOURCES.items():
        source = preferred if preferred.exists() else FALLBACKS[stem]
        if not source.exists():
            raise FileNotFoundError(f"Missing hero source for {stem}: {source}")

        rgb = load_rgb(source)
        master = PUBLIC / f"{stem}.jpg"
        retina = PUBLIC / f"{stem}@2x.jpg"
        save_master(rgb, master)
        save_retina(rgb, retina)
        print(f"{stem}: {rgb.size[0]}x{rgb.size[1]} -> {master.name}, {retina.name}")


if __name__ == "__main__":
    main()
