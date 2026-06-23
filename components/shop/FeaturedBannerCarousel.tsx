"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const ROTATE_MS = 5000;

/** Native aspect ratio of the banner creatives (1024×561). */
const BANNER_ASPECT = 1024 / 561;

const SLIDES = [
  {
    src: "/shop/banners/wildforest-honey-featured.png",
    alt: "Wildforest Multiflora Honey — pure, natural, raw honey from Har Ghar Shudhi",
    href: "/products/wildforest-multiflora-honey",
    label: "Wildforest Multiflora Honey",
  },
  {
    src: "/shop/banners/ashwagandha-advance-featured.png",
    alt: "Ashwagandha Advance — stress support and daily wellness from Har Ghar Shudhi",
    href: "/products/ashwagandha-advance",
    label: "Ashwagandha Advance",
  },
] as const;

export default function FeaturedBannerCarousel({
  className = "",
}: {
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActive(index);
  }, []);

  useEffect(() => {
    if (paused || SLIDES.length <= 1) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-brand-border bg-brand-cream shadow-[0_8px_30px_rgba(45,82,57,0.06)]",
        className,
      ].join(" ")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="relative w-full min-h-[220px] sm:min-h-[260px] md:min-h-[300px] lg:min-h-[340px]"
        style={{ aspectRatio: String(BANNER_ASPECT) }}
      >
        {SLIDES.map((slide, index) => (
          <Link
            key={slide.src}
            href={slide.href}
            aria-label={`Shop ${slide.label}`}
            className={[
              "absolute inset-0 block transition-opacity duration-700 ease-in-out",
              index === active
                ? "z-10 opacity-100"
                : "z-0 pointer-events-none opacity-0",
            ].join(" ")}
            tabIndex={index === active ? 0 : -1}
            aria-hidden={index !== active}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              unoptimized
              sizes="(max-width: 1024px) 100vw, 680px"
              className="object-contain object-center"
              draggable={false}
            />
          </Link>
        ))}
      </div>

      <div
        className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center gap-2.5 md:bottom-4"
        role="tablist"
        aria-label="Featured banner slides"
      >
        {SLIDES.map((slide, index) => {
          const selected = index === active;
          return (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={`Show ${slide.label} banner`}
              onClick={() => goTo(index)}
              className={[
                "h-2.5 w-2.5 rounded-full border border-white/70 transition-all duration-300",
                selected
                  ? "scale-100 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
                  : "scale-90 bg-white/35 hover:bg-white/55",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}
