import { QUALITY } from "@/lib/brand/content";

export default function AboutCertifications() {
  return (
    <section className="border-b border-brand-border bg-brand-sand px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-6xl text-center">
        <p className="font-shop text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-green">
          Our Standards
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-[clamp(1.65rem,3vw,2.25rem)] font-medium leading-snug text-brand-text">
          {QUALITY.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-body text-base leading-relaxed text-brand-muted">
          {QUALITY.subline}
        </p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {QUALITY.exclusions.map((label) => (
            <li
              key={label}
              className="about-luxury-cert border border-brand-border/80 bg-brand-white px-5 py-6 text-center"
            >
              <span className="font-shop text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-green">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
