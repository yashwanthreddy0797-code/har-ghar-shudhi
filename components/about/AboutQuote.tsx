import { BRAND_INTRO, BRAND_TAGLINE } from "@/lib/brand/content";

export default function AboutQuote() {
  return (
    <section className="border-b border-brand-border bg-brand-cream px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-shop text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-green">
          Our Story
        </p>
        <blockquote className="mt-8 font-display text-[clamp(1.5rem,3.2vw,2.25rem)] font-medium italic leading-[1.45] tracking-[0.01em] text-brand-text">
          &ldquo;{BRAND_TAGLINE}&rdquo;
        </blockquote>
        <p className="mx-auto mt-10 max-w-2xl font-body text-base leading-[1.95] text-brand-muted md:text-lg">
          {BRAND_INTRO}
        </p>
      </div>
    </section>
  );
}
