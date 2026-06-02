"use client";

import { HONEY_CALLOUT_ICONS, type HoneyCallout } from "@/lib/hero/honeyContent";

interface HoneyHeroCalloutsProps {
  callouts: HoneyCallout[];
  side: "left" | "right";
}

export default function HoneyHeroCallouts({
  callouts,
  side,
}: HoneyHeroCalloutsProps) {
  const isLeft = side === "left";

  return (
    <div
      className={`hero-honey-callouts pointer-events-none hidden w-full max-w-[min(300px,42vw)] flex-col justify-between gap-[min(10vh,5.5rem)] py-6 md:flex lg:max-w-[320px] ${
        isLeft
          ? "items-end"
          : "hero-honey-callouts--right items-start md:-translate-x-[18.75rem] lg:-translate-x-[20rem]"
      }`}
      aria-hidden
    >
      {callouts.map((callout, index) => {
        const Icon = HONEY_CALLOUT_ICONS[callout.icon];
        return (
          <article
            key={callout.id}
            data-callout
            data-callout-index={index}
            className={`hero-honey-callout flex max-w-[280px] items-center gap-4 ${
              isLeft ? "ml-auto" : "mr-auto"
            }`}
          >
            <div className="hero-honey-callout-media relative shrink-0">
              <div className="absolute -inset-1 rounded-full bg-[#d4a84b]/20 blur-md" />
              <div className="relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full border border-[#d4a84b]/35 bg-[#2a1c0a] shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-[#d4a84b]/25 lg:h-[80px] lg:w-[80px]">
                <Icon
                  className="h-7 w-7 text-[#d4a84b] lg:h-8 lg:w-8"
                  strokeWidth={1.25}
                  aria-hidden
                />
              </div>
            </div>

            <div className="min-w-0 flex-1 text-left">
              <h3 className="font-serif text-lg font-light leading-tight tracking-[0.02em] text-[#faf6f0] lg:text-xl">
                {callout.title}
              </h3>
              <p className="mt-2 font-sans text-[11px] font-light leading-[1.65] tracking-[0.04em] text-[#faf6f0]/65 lg:text-xs">
                {callout.description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
