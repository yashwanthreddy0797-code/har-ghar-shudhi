#!/usr/bin/env python3
from pathlib import Path
from PIL import Image

ASSET = Path(
    "/Users/yashwanthreddy/.cursor/projects/Users-yashwanthreddy-Demo/assets"
)
OUT = Path(__file__).resolve().parents[1] / "public" / "cinematic"

FILES = {
    "ashwagandha": "WhatsApp_Image_2026-05-26_at_10.29.23_PM-76855bd1-022a-438c-991e-d02b925c9954.png",
    "remove_bg": "ChatGPT_Image_May_20__2026__06_33_00_PM-removebg-preview-21aa41d4-e789-407a-bdba-7c03b73d3524.png",
    "moringa": "WhatsApp_Image_2026-05-26_at_10.23.12_PM-fe184590-271b-421f-b0ff-cab088549f2e.png",
    "spirulina": "WhatsApp_Image_2026-05-26_at_10.23.13_PM-36c86adf-fd54-4b61-986b-a9353f033831.png",
    "honey": "WhatsApp_Image_2026-05-26_at_10.23.13_PM__1_-f4092861-1d78-4717-8e2a-4bbbfa2fd461.png",
}


def fit(img: Image.Image, size: tuple[int, int]) -> Image.Image:
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    copy = img.copy()
    copy.thumbnail(size, Image.Resampling.LANCZOS)
    ox = (size[0] - copy.width) // 2
    oy = (size[1] - copy.height) // 2
    canvas.paste(copy, (ox, oy), copy if copy.mode == "RGBA" else None)
    return canvas


def crop_box(img: Image.Image, box: tuple[int, int, int, int]) -> Image.Image:
    return img.crop(box).convert("RGBA")


def main() -> None:
    (OUT / "herbs").mkdir(parents=True, exist_ok=True)
    (OUT / "products").mkdir(parents=True, exist_ok=True)

    ash = Image.open(ASSET / FILES["ashwagandha"]).convert("RGBA")
    rembg = Image.open(ASSET / FILES["remove_bg"]).convert("RGBA")
    mor = Image.open(ASSET / FILES["moringa"]).convert("RGBA")
    spi = Image.open(ASSET / FILES["spirulina"]).convert("RGBA")

    fit(rembg, (1200, 1200)).save(OUT / "bottle.png", optimize=True)

    bottle_col = crop_box(ash, (95, 15, 585, 1005))
    crop_box(bottle_col, (0, 0, 490, 520)).save(OUT / "capsule-top.png", optimize=True)
    crop_box(bottle_col, (0, 470, 490, 990)).save(
        OUT / "capsule-bottom.png", optimize=True
    )
    crop_box(ash, (85, 35, 595, 965)).save(OUT / "ending-product.png", optimize=True)

    fit(crop_box(ash, (0, 700, 240, 980)), (280, 320)).save(
        OUT / "herbs" / "leaf-1.png", optimize=True
    )
    fit(crop_box(mor, (520, 620, 820, 940)), (300, 320)).save(
        OUT / "herbs" / "leaf-2.png", optimize=True
    )
    fit(crop_box(spi, (500, 650, 780, 950)), (280, 300)).save(
        OUT / "herbs" / "leaf-3.png", optimize=True
    )
    fit(crop_box(ash, (520, 760, 670, 940)), (220, 220)).save(
        OUT / "herbs" / "leaf-4.png", optimize=True
    )

    for key, name in [
        ("ashwagandha", "ashwagandha-advance.png"),
        ("moringa", "moringa-powder.png"),
        ("spirulina", "spirulina-powder.png"),
        ("honey", "wildforest-honey.png"),
    ]:
        src = ASSET / FILES[key]
        dst = OUT / "products" / name
        Image.open(src).save(dst, optimize=True)

    print("Prepared cinematic assets in public/cinematic/")


if __name__ == "__main__":
    main()
