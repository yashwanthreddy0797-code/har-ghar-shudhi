"use client";

import {
  ASHWAGANDHA_CALLOUT_ICONS,
  type AshwagandhaCallout,
} from "@/lib/hero/ashwagandhaContent";

interface AshwagandhaHeroCalloutsProps {
  callouts: AshwagandhaCallout[];
  side: "left" | "right";
}

export default function AshwagandhaHeroCallouts({
  callouts,
  side,
}: AshwagandhaHeroCalloutsProps) {
  const isLeft = side === "left";
  const rowDir = isLeft ? "flex-row" : "flex-row-reverse";
  const textAlign = isLeft ? "text-right" : "text-left";

  return (
    <div
      className={`hero-ashwagandha-callouts pointer-events-none hidden w-full max-w-[min(300px,42vw)] flex-col justify-between gap-[min(10vh,5.5rem)] py-6 md:flex lg:max-w-[320px] ${
        isLeft ? "items-end" : "items-start"
      }`}
      aria-hidden
    >
      {callouts.map((callout, index) => {
        const Icon = ASHWAGANDHA_CALLOUT_ICONS[callout.icon];
        return (
          <article
            key={callout.id}
            data-callout
            data-callout-index={index}
            className={`hero-ashwagandha-callout flex max-w-[280px] items-center gap-4 ${rowDir} ${
              isLeft ? "ml-auto" : "mr-auto"
            }`}
          >
            <div className="hero-ashwagandha-callout-media relative shrink-0">
              <div className="absolute -inset-1 rounded-full bg-[#c9a962]/20 blur-md" />
              <div className="relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-full border border-[#c9a962]/35 bg-[#2f1c12] shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-[#c9a962]/25 lg:h-[80px] lg:w-[80px]">
                <Icon
                  className="h-7 w-7 text-[#c9a962] lg:h-8 lg:w-8"
                  strokeWidth={1.25}
                  aria-hidden
                />
              </div>
            </div>

            <div className={`min-w-0 flex-1 ${textAlign}`}>
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
