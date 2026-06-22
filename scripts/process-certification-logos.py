#!/usr/bin/env python3
"""Process certification logo assets: crop, remove backgrounds, export PNGs."""

from pathlib import Path

from PIL import Image

ASSETS = Path(
    "/Users/yashwanthreddy/.cursor/projects/Users-yashwanthreddy-Demo/assets"
)
OUT = Path(__file__).resolve().parent.parent / "public" / "certifications"


def to_rgba(image: Image.Image) -> Image.Image:
    if image.mode == "RGBA":
        return image
    if image.mode == "P":
        return image.convert("RGBA")
    return image.convert("RGBA")


def remove_dark_background(image: Image.Image, threshold: int = 40) -> Image.Image:
    rgba = to_rgba(image)
    pixels = rgba.load()
    width, height = rgba.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if r <= threshold and g <= threshold and b <= threshold:
                pixels[x, y] = (r, g, b, 0)
    return rgba


def remove_light_background(image: Image.Image, threshold: int = 235) -> Image.Image:
    rgba = to_rgba(image)
    pixels = rgba.load()
    width, height = rgba.size
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                pixels[x, y] = (r, g, b, 0)
    return rgba


def trim_transparent(image: Image.Image, padding: int = 8) -> Image.Image:
    rgba = to_rgba(image)
    bbox = rgba.getbbox()
    if not bbox:
        return rgba
    left, top, right, bottom = bbox
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(rgba.width, right + padding)
    bottom = min(rgba.height, bottom + padding)
    return rgba.crop((left, top, right, bottom))


def save_logo(name: str, image: Image.Image) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / name
    trimmed = trim_transparent(image)
    trimmed.save(path, "PNG", optimize=True)
    print(f"saved {path} ({trimmed.size})")


def main() -> None:
    # 1. Ayush Premium — remove white background
    ayush = Image.open(ASSETS / "download-db017899-4789-49ae-bb28-fcf29e6d8b0b.png")
    save_logo("ayush-premium.png", remove_light_background(ayush, 230))

    # 2. GMP Certified — remove dark matte background from source asset
    gmp = Image.open(
        ASSETS / "8572b2a84dec5452c5132c4971545eb7e7f63c0e-e36383d6-80b9-4734-9a86-4cce006e4b28.png"
    )
    save_logo("gmp-certified.png", remove_dark_background(gmp, 35))

    # 3. FSSC 22000 — palette PNG, ensure transparency
    fssc = Image.open(
        ASSETS
        / "fssc-22000-logo-png_seeklogo-518599-aa4db4ee-4d8f-427a-80e0-8eea74beaf74.png"
    )
    save_logo("fssc-22000.png", remove_light_background(fssc, 245))

    # 4. FSSAI
    fssai = Image.open(
        ASSETS
        / "fssai-logo-png_seeklogo-304263-534cd80b-2cc4-4237-bdc2-f0bfd6c16e6d.png"
    )
    save_logo("fssai.png", remove_light_background(fssai, 245))

    # 5. ISO 22000 — crop left badge from screenshot
    iso_screen = Image.open(
        ASSETS
        / "Screenshot_2026-06-14_at_20.35.44-af257fdb-7e81-4af9-9af9-e6044fa9b6d1.png"
    )
    iso_crop = iso_screen.crop((0, 0, iso_screen.width // 2, iso_screen.height))
    save_logo("iso-22000.png", remove_light_background(iso_crop, 240))

    # 6. GMP Compliant
    gmp_compliant = Image.open(
        ASSETS
        / "Screenshot_2026-06-14_at_20.31.47-e47e74fe-ff15-4408-998d-204f505fbd56.png"
    )
    save_logo("gmp-compliant.png", remove_light_background(gmp_compliant, 240))

    # 7. HACCP
    haccp = Image.open(
        ASSETS
        / "Screenshot_2026-06-14_at_20.34.25-5889b02e-d825-4498-89d9-33a7d322c800.png"
    )
    save_logo("haccp.png", remove_light_background(haccp, 240))


if __name__ == "__main__":
    main()
