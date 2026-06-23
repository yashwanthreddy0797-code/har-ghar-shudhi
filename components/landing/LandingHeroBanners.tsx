"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useCart } from "@/components/cart/CartProvider";

const HERO_MAIN = {
  src: "/landing/diabetes-shudhi-hero-main.png",
  width: 1024,
  height: 682,
  alt: "Pure Ayurvedic Wellness For You and Your Family — Har Ghar Shudhi doctor and product range",
} as const;

const HERO_PANELS = {
  src: "/landing/diabetes-shudhi-hero-panels.png",
  width: 1024,
  height: 341,
  alt: "How to use Har Ghar Shudhi — shop now and empower your health with Ayurvedic goodness",
} as const;

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
      <Image
        src={HERO_MAIN.src}
        alt={HERO_MAIN.alt}
        width={HERO_MAIN.width}
        height={HERO_MAIN.height}
        unoptimized
        priority
        sizes="100vw"
        className="block h-auto w-full"
      />

      <div className="relative w-full">
        <Image
          src={HERO_PANELS.src}
          alt={HERO_PANELS.alt}
          width={HERO_PANELS.width}
          height={HERO_PANELS.height}
          unoptimized
          priority
          sizes="100vw"
          className="block h-auto w-full"
        />
        <ShopNowHotspot
          variantId={variantId}
          availableForSale={availableForSale}
        />
      </div>
    </section>
  );
}
