"use client";

import { ANNOUNCEMENTS } from "@/lib/navigation";

export default function PromoBanner() {
  return (
    <div className="relative z-50 overflow-hidden bg-brand-green-dark">
      <div className="animate-marquee flex whitespace-nowrap py-2.5">
        {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((text, i) => (
          <span
            key={i}
            className="mx-8 font-sans text-xs tracking-wide text-white/95"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
