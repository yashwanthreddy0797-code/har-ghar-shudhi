"use client";

import Image from "next/image";
import type { MoringaCallout } from "@/lib/hero/moringaContent";

interface MoringaHeroCalloutsProps {
  callouts: MoringaCallout[];
  side: "left" | "right";
}

export default function MoringaHeroCallouts({
  callouts,
  side,
}: MoringaHeroCalloutsProps) {
  const align = side === "left" ? "items-start text-left" : "items-end text-right";
  const rowDir =
    side === "left"
      ? "flex-row"
      : "flex-row-reverse";

  return (
    <div
      className={`hero-moringa-callouts pointer-events-none hidden w-full max-w-[min(280px,42vw)] flex-col justify-between gap-[min(10vh,5.5rem)] py-6 md:flex lg:max-w-[300px] ${align}`}
      aria-hidden
    >
      {callouts.map((callout, index) => (
        <article
          key={callout.id}
          data-callout
          data-callout-index={index}
          className={`hero-moringa-callout flex max-w-[260px] items-center gap-4 ${rowDir} ${align}`}
        >
          <div className="hero-moringa-callout-media relative shrink-0">
            <div className="absolute -inset-1 rounded-full bg-luxury-gold/20 blur-md" />
            <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full border border-white/25 bg-[#0a2f24] shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-1 ring-luxury-gold/30 lg:h-[80px] lg:w-[80px]">
              <Image
                src={callout.image}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
                unoptimized
              />
            </div>
            {callout.stat ? (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-luxury-gold/40 bg-[#0d3b2e]/95 px-2 py-0.5 font-serif text-[10px] tracking-wide text-luxury-gold">
                {callout.stat}
              </span>
            ) : null}
          </div>

          <div className={`min-w-0 flex-1 ${side === "right" ? "text-right" : ""}`}>
            <h3 className="font-serif text-lg font-light leading-tight tracking-[0.02em] text-white lg:text-xl">
              {callout.title}
            </h3>
            <p className="mt-2 font-sans text-[11px] font-light leading-[1.65] tracking-[0.04em] text-white/65 lg:text-xs">
              {callout.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
