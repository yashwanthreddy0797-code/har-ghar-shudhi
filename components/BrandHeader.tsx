"use client";

import { Leaf } from "lucide-react";

export default function BrandHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-luxury-gold/30 bg-luxury-emerald/20">
          <Leaf className="h-4 w-4 text-luxury-gold" strokeWidth={1.5} />
        </div>
        <div>
          <p className="font-serif text-sm tracking-[0.35em] text-luxury-cream/90 md:text-base">
            HAR GHAR SHUDHI
          </p>
          <p className="font-sans text-[9px] uppercase tracking-[0.25em] text-luxury-gold/70 md:text-[10px]">
            Ayurvedic Wellness
          </p>
        </div>
      </div>

      <nav className="hidden items-center gap-8 md:flex">
        {["Philosophy", "Ingredients", "Wellness", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-sans text-[11px] uppercase tracking-[0.2em] text-luxury-cream/50 transition-colors duration-500 hover:text-luxury-gold"
          >
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}
