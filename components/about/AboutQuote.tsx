import { BRAND_INTRO } from "@/lib/brand/content";

export default function AboutQuote() {
  return (
    <section className="border-b border-brand-border bg-brand-cream px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-shop text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-green">
          Our Story
        </p>
        <p className="mx-auto mt-8 max-w-2xl font-body text-base leading-[1.95] text-brand-muted md:text-lg">
          {BRAND_INTRO}
        </p>
      </div>
    </section>
  );
}
