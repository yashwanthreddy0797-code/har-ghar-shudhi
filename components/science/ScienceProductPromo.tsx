import Link from "next/link";
import { Star } from "lucide-react";
import { SCIENCE_PRODUCT_PROMO } from "@/lib/brand/scienceTrust";

function StarRow({ size = 14 }: { size?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="fill-brand-green-dark text-brand-green-dark"
          style={{ width: size, height: size }}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export default function ScienceProductPromo() {
  const promo = SCIENCE_PRODUCT_PROMO;

  return (
    <section
      aria-labelledby="science-product-promo-heading"
      className="science-product-promo border-b border-brand-border bg-[#f4fbe8] px-6 py-12 md:px-12 md:py-16 lg:py-20"
    >
      <div className="science-product-promo__inner mx-auto max-w-3xl">
        <div className="science-product-promo__badge inline-flex items-center gap-2.5 rounded-full border border-brand-green-dark/35 bg-white/55 px-4 py-2">
          <StarRow size={13} />
          <span className="font-shop text-sm text-brand-green-dark">
            {promo.ratingLabel}{" "}
            <strong className="font-bold">{promo.ratingValue}</strong>
          </span>
        </div>

        <h2
          id="science-product-promo-heading"
          className="science-product-promo__headline mt-6 font-shop text-[clamp(1.85rem,4.5vw,2.65rem)] font-bold leading-[1.12] text-brand-green-dark"
        >
          {promo.headline}
        </h2>

        <p className="science-product-promo__body mt-5 max-w-2xl font-shop text-[15px] leading-[1.75] text-brand-green-dark/90 md:text-base md:leading-[1.8]">
          {promo.description}
        </p>

        <Link
          href={promo.ctaHref}
          className="science-product-promo__cta mt-8 inline-flex items-center justify-center rounded-xl bg-brand-green-dark px-10 py-3.5 font-shop text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#234430]"
        >
          {promo.ctaLabel}
        </Link>

        <div className="science-product-promo__social mt-8 flex flex-wrap items-center gap-4">
          <div className="flex items-center pl-1">
            {promo.customers.map((customer, index) => (
              <span
                key={customer.initials}
                className="science-product-promo__avatar relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#f4fbe8] font-shop text-[11px] font-semibold text-white"
                style={{
                  backgroundColor: customer.tone,
                  marginLeft: index === 0 ? 0 : "-0.65rem",
                  zIndex: promo.customers.length - index,
                }}
              >
                {customer.initials}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <StarRow size={14} />
            <span className="font-shop text-sm font-semibold text-brand-green-dark">
              {promo.socialRating}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
