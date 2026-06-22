import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BRAND_INTRO, BRAND_TAGLINE } from "@/lib/brand/content";

export default function AboutHero() {
  return (
    <section
      id="story"
      className="about-brand-hero relative scroll-mt-28 overflow-hidden border-b border-white/10"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/footer/landscape-illustration.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-[0.22]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3024]/40 via-[#243d2e]/88 to-[#1a2421]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(201,169,98,0.14)_0%,transparent_65%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(92vh,820px)] max-w-6xl flex-col items-center justify-center px-6 py-28 text-center md:px-12 md:py-32">
        <div className="mb-8 flex items-center gap-4" aria-hidden>
          <span className="h-px w-12 bg-luxury-gold/50 md:w-16" />
          <span className="font-shop text-[10px] font-semibold uppercase tracking-[0.32em] text-luxury-gold">
            Har Ghar Shudhi
          </span>
          <span className="h-px w-12 bg-luxury-gold/50 md:w-16" />
        </div>

        <h1 className="max-w-4xl font-display text-[clamp(2.5rem,6vw,4.25rem)] font-medium leading-[1.05] tracking-[0.02em] text-white">
          {BRAND_TAGLINE}
        </h1>

        <p className="mx-auto mt-8 max-w-2xl font-body text-base italic leading-[1.9] text-white/72 md:text-lg">
          {BRAND_INTRO}
        </p>

        <Link
          href="/shop"
          className="group mt-12 inline-flex items-center gap-3 rounded-md border border-luxury-gold/35 bg-luxury-gold/10 px-8 py-3.5 font-shop text-[11px] font-semibold uppercase tracking-[0.18em] text-luxury-gold backdrop-blur-sm transition-all hover:border-luxury-gold/60 hover:bg-luxury-gold/20"
        >
          Explore Products
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            strokeWidth={1.5}
          />
        </Link>
      </div>
    </section>
  );
}
