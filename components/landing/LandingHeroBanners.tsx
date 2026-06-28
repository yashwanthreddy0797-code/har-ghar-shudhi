"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useCart } from "@/components/cart/CartProvider";
import PremiumStaticImage from "@/components/media/PremiumStaticImage";
import {
  SCIENCE_HERO_MAIN,
  SCIENCE_HERO_PANELS,
} from "@/lib/media/scienceHeroAssets";

function ShopNowHotspot({
  variantId,
  availableForSale,
}: {
  variantId: string;
  availableForSale: boolean;
}) {
  const { addItem } = useCart();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!availableForSale) {
      router.push("/shop");
      return;
    }

    startTransition(async () => {
      try {
        const cart = await addItem(variantId);
        if (
          cart?.checkoutUrl &&
          (cart.checkoutUrl.startsWith("http://") ||
            cart.checkoutUrl.startsWith("https://"))
        ) {
          window.location.href = cart.checkoutUrl;
          return;
        }
        router.push("/checkout");
      } catch {
        router.push("/shop");
      }
    });
  };

  return (
    <button
      type="button"
      aria-label="Shop Now"
      disabled={isPending}
      onClick={handleClick}
      className="absolute bottom-[6%] left-1/2 h-[11%] w-[18%] min-h-[2rem] min-w-[5.5rem] -translate-x-1/2 cursor-pointer rounded-md bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green sm:bottom-[7%] sm:h-[12%] sm:w-[16%] md:bottom-[8%]"
    />
  );
}

export default function LandingHeroBanners({
  variantId,
  availableForSale,
}: {
  variantId: string;
  availableForSale: boolean;
}) {
  return (
    <section
      aria-label="Diabetes Shudhi hero"
      className="border-b border-brand-green/10 bg-[#f4fbe8]"
    >
      <PremiumStaticImage
        src={SCIENCE_HERO_MAIN.src}
        retinaSrc={SCIENCE_HERO_MAIN.retinaSrc}
        alt={SCIENCE_HERO_MAIN.alt}
        width={SCIENCE_HERO_MAIN.width}
        height={SCIENCE_HERO_MAIN.height}
        priority
      />

      <div className="relative w-full">
        <PremiumStaticImage
          src={SCIENCE_HERO_PANELS.src}
          retinaSrc={SCIENCE_HERO_PANELS.retinaSrc}
          alt={SCIENCE_HERO_PANELS.alt}
          width={SCIENCE_HERO_PANELS.width}
          height={SCIENCE_HERO_PANELS.height}
          priority
        />
        <ShopNowHotspot
          variantId={variantId}
          availableForSale={availableForSale}
        />
      </div>
    </section>
  );
}
