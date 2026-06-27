import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { BRAND_TAGLINE } from "@/lib/brand/content";

export default function HomeHeroSection() {
  return (
    <section className="home-hero relative min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/home/hero-forest.png"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1a2421]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a2421]/70 via-[#1a2421]/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2421]/50 via-transparent to-[#1a2421]/20" />
      </div>

      <div className="home-hero__mortar pointer-events-none absolute bottom-0 right-0 z-[1]" aria-hidden>
        <Image
          src="/about/who-we-are/mortar-herbs.png"
          alt=""
          width={640}
          height={720}
          priority
          className="h-auto w-[min(52vw,520px)] max-w-none object-contain object-bottom"
          sizes="(max-width: 768px) 52vw, 520px"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pb-28 pt-[calc(5.5rem+env(safe-area-inset-top,0px))] md:px-12 md:pb-32 lg:px-16">
        <div className="max-w-xl lg:max-w-2xl">
          <h1 className="font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[1.08] tracking-[0.02em] text-white">
            {BRAND_TAGLINE}
          </h1>
          <p className="mt-5 max-w-md font-shop text-[clamp(0.95rem,2vw,1.125rem)] font-normal leading-[1.75] text-white/88 md:mt-6">
            Pure. Honest. Transparent. Wellness the way nature intended.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-3 rounded-md bg-brand-green-dark px-7 py-3.5 font-shop text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand-green md:mt-10"
          >
            Explore Our Products
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </Link>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70"
        aria-hidden
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30">
          <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={1.5} />
        </span>
        <span className="font-shop text-[9px] font-medium uppercase tracking-[0.28em]">
          Scroll to Discover
        </span>
      </div>
    </section>
  );
}
