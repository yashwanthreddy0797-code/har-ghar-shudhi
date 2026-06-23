import Image from "next/image";
import { BRAND_TAGLINE } from "@/lib/brand/content";

const HERO_VALUES = ["Natural", "Organic", "Transparent"];

export default function AboutHero() {
  return (
    <section
      id="story"
      className="about-luxury-hero relative scroll-mt-28 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/about/hero-landscape.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1a2421]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#1a2421]/25 to-[#1a2421]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,rgba(26,36,33,0.45)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(88vh,760px)] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center md:px-12 md:py-28">
        <p className="font-shop text-[10px] font-medium uppercase tracking-[0.38em] text-white/70">
          About Us
        </p>

        <h1 className="mt-8 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4rem)] font-medium leading-[1.08] tracking-[0.04em] text-white">
          {BRAND_TAGLINE}
        </h1>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-shop text-[11px] font-medium uppercase tracking-[0.28em] text-luxury-gold"
          aria-label="Brand values"
        >
          {HERO_VALUES.map((value, index) => (
            <span key={value} className="inline-flex items-center gap-4">
              {index > 0 && (
                <span className="hidden text-white/35 sm:inline" aria-hidden>
                  |
                </span>
              )}
              {value}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
