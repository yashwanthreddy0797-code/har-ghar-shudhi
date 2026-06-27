import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  FlaskConical,
  Leaf,
  Play,
  ShieldCheck,
  Truck,
} from "lucide-react";

const HERO_FEATURES = [
  { icon: Leaf, label: "100% Natural & Herbal" },
  { icon: ShieldCheck, label: "Complete Transparency" },
  { icon: FlaskConical, label: "Tested For Purity" },
  { icon: Truck, label: "Delivered With Care" },
] as const;

const HERO_SUBTEXT =
  "We create natural, organic and herbal products that nurture your health and respect our planet.";

export default function HomeHeroSection() {
  return (
    <section className="home-hero relative min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/home/hero-valley.jpg"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[62%_45%]"
        />
        <div className="absolute inset-0 bg-[#0f1814]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1814]/78 via-[#0f1814]/42 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1814]/55 via-transparent to-[#0f1814]/15" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col px-6 md:px-12 lg:px-16">
        <div className="flex flex-1 flex-col justify-center pb-8 pt-[calc(5.5rem+env(safe-area-inset-top,0px))]">
          <div className="home-hero__content max-w-xl text-left lg:max-w-2xl">
            <p className="home-hero__eyebrow font-shop text-[9px] font-semibold uppercase tracking-[0.38em] !text-white md:text-[10px] md:tracking-[0.42em]">
              Nature&apos;s Purity, Your Everyday Wellness
            </p>

            <h1 className="mt-5 font-display text-[clamp(2.35rem,5.5vw,4.35rem)] font-medium leading-[1.08] tracking-[0.02em] text-white md:mt-6">
              Rooted in Nature,
              <br />
              Driven by <span className="text-[#c9a962]">Purpose</span>
            </h1>

            <Leaf
              className="mt-5 h-4 w-4 text-[#c9a962]"
              strokeWidth={1.35}
              fill="currentColor"
              fillOpacity={0.12}
              aria-hidden
            />

            <p className="mt-5 max-w-md font-body text-[clamp(0.95rem,1.9vw,1.125rem)] leading-[1.85] text-white/90 md:mt-6 lg:max-w-lg">
              {HERO_SUBTEXT}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap md:mt-9">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-3 rounded-sm border border-[#1e3d2f]/60 bg-[#1e3d2f]/42 px-7 py-3.5 font-shop text-[10px] font-semibold uppercase tracking-[0.22em] !text-white shadow-[0_8px_28px_rgba(15,35,28,0.32)] backdrop-blur-md transition-all hover:border-[#1e3d2f]/80 hover:bg-[#1e3d2f]/58"
              >
                Explore Our Products
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
              </Link>
              <Link
                href="/#home-brand-story-video-scroll"
                className="inline-flex items-center justify-center gap-3 rounded-sm border border-white/75 bg-white/5 px-7 py-3.5 font-shop text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-[2px] transition-colors hover:border-white hover:bg-white/10"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/80">
                  <Play
                    className="ml-0.5 h-3 w-3 fill-white text-white"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
                Watch Our Story
              </Link>
            </div>
          </div>
        </div>

        <div className="home-hero__content max-w-xl pb-28 lg:max-w-2xl">
          <div className="rounded-lg border border-white/10 bg-[#1a2421]/62 px-3 py-4 backdrop-blur-md sm:px-4 md:py-5">
            <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:flex sm:items-start sm:gap-x-6 md:gap-x-7">
              {HERO_FEATURES.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex min-w-0 flex-col items-center gap-2.5 text-center sm:min-w-[6.25rem]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c9a962]/35">
                    <Icon
                      className="h-[1.15rem] w-[1.15rem] text-[#c9a962]"
                      strokeWidth={1.25}
                      aria-hidden
                    />
                  </span>
                  <span className="font-shop text-[8px] font-semibold uppercase leading-snug tracking-[0.12em] text-[#c9a962]/95 sm:text-[9px]">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a962]/40">
          <ChevronDown className="h-4 w-4 animate-bounce text-[#c9a962]" strokeWidth={1.5} />
        </span>
        <span className="font-shop text-[9px] font-medium uppercase tracking-[0.28em] text-white/70">
          Scroll to Discover
        </span>
      </div>
    </section>
  );
}
