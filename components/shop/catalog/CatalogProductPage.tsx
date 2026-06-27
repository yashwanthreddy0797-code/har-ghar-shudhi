import Link from "next/link";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog/types";
import { getRelatedCatalogProducts } from "@/lib/catalog";
import { ProductImage } from "@/components/shop/ProductImage";
import CatalogCommerceActions from "@/components/shop/catalog/CatalogCommerceActions";
import CatalogFaqAccordion from "@/components/shop/catalog/CatalogFaqAccordion";
import CatalogRelatedProducts from "@/components/shop/catalog/CatalogRelatedProducts";

const TRUST_BADGES = [
  "Ayush Licensed",
  "Lab Tested",
  "Premium Quality",
  "No Preservatives",
];

export default function CatalogProductPage({
  product,
  skipImageHero = false,
}: {
  product: CatalogProduct;
  /** When a cinematic scroll hero renders above, hide the duplicate product image. */
  skipImageHero?: boolean;
}) {
  const related = getRelatedCatalogProducts(product.relatedSlugs);

  return (
    <>
      {/* SECTION 1 — Hero */}
      <section className="border-b border-brand-border bg-brand-white px-6 py-10 md:px-12 md:py-14 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/shop"
            className="mb-8 inline-flex items-center gap-2 font-shop text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted transition-colors hover:text-brand-green"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to shop
          </Link>

          <div className={`grid items-start gap-10 ${skipImageHero ? "" : "lg:grid-cols-2 lg:gap-16"}`}>
            <div className={skipImageHero ? "" : "order-2 lg:order-1"}>
              <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
                {product.badge ?? product.tagline}
              </p>
              <h1 className="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[0.02em] text-brand-text">
                {product.name}
              </h1>
              <p className="mt-3 font-body text-base italic leading-relaxed text-brand-muted md:text-lg">
                {product.tagline}
              </p>
              <p className="mt-5 max-w-lg font-body text-[15px] leading-[1.85] text-brand-muted">
                {product.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {product.benefitPills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-brand-green/20 bg-brand-green-light px-3.5 py-1.5 font-shop text-[11px] font-medium uppercase tracking-[0.12em] text-brand-green"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <CatalogCommerceActions
                price={product.price}
                variantId={product.variants[0]?.id ?? ""}
                availableForSale={product.availableForSale}
                className="mt-8"
              />

              <div className="mt-8 flex flex-wrap gap-3">
                {TRUST_BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-border bg-brand-cream px-3 py-1.5 font-shop text-[10px] uppercase tracking-[0.14em] text-brand-muted"
                  >
                    <ShieldCheck className="h-3 w-3 text-brand-green" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {!skipImageHero ? (
            <div className="order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-xl border border-brand-border bg-brand-cream shadow-[0_24px_60px_rgba(45,82,57,0.08)]">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="aspect-[4/5] rounded-xl md:aspect-square"
                />
              </div>
            </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* SECTION 2 — Why This Product */}
      <section className="border-b border-brand-border bg-brand-cream px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            Why This Product
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-tight tracking-[0.02em] text-brand-text md:text-[2.5rem]">
            {product.whyThisProduct.title}
          </h2>
          <p className="mt-4 max-w-2xl font-body text-base leading-[1.85] text-brand-muted md:text-[17px]">
            {product.whyThisProduct.description}
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {product.whyThisProduct.features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-lg border border-brand-border bg-brand-white p-6 shadow-[0_8px_30px_rgba(45,82,57,0.05)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(45,82,57,0.08)]"
              >
                <h3 className="font-display text-xl font-medium tracking-[0.01em] text-brand-text">
                  {feature.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-[1.75] text-brand-muted">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Key Benefits */}
      <section className="border-b border-brand-border bg-brand-white px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            Key Benefits
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-[0.02em] text-brand-text md:text-[2.25rem]">
            What it supports
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
            {product.keyBenefits.map((benefit) => (
              <div
                key={benefit.label}
                className="rounded-lg border border-brand-border bg-brand-cream/60 p-5 text-center md:p-6"
              >
                <span className="text-3xl" aria-hidden>
                  {benefit.icon}
                </span>
                <p className="mt-3 font-shop text-sm font-medium tracking-[0.02em] text-brand-text md:text-[15px]">
                  {benefit.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Ingredients / Formulation */}
      <section className="border-b border-brand-border bg-brand-sand px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            {product.formulation.kind === "honey"
              ? "Sourcing"
              : product.formulation.kind === "spray"
                ? "Active Benefits"
                : product.formulation.kind === "powder"
                  ? "Nutrients"
                  : "Formulation"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-[0.02em] text-brand-text md:text-[2.25rem]">
            {product.formulation.title}
          </h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {product.formulation.items.map((item) => (
              <article
                key={item.name}
                className="rounded-lg border border-brand-border bg-brand-white p-6"
              >
                <h3 className="font-display text-xl font-medium text-brand-text">
                  {item.name}
                </h3>
                <p className="mt-3 font-body text-sm leading-[1.75] text-brand-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — How To Use */}
      <section className="border-b border-brand-border bg-brand-white px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            How To Use
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-[0.02em] text-brand-text md:text-[2.25rem]">
            Your daily ritual
          </h2>

          <ol className="relative mt-10 space-y-0 border-l border-brand-border pl-8 md:pl-10">
            {product.howToUse.map((step, index) => (
              <li key={step.title} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[2.05rem] flex h-8 w-8 items-center justify-center rounded-full border border-brand-green/25 bg-brand-green-light font-shop text-xs font-semibold text-brand-green md:-left-[2.35rem] md:h-9 md:w-9">
                  {index + 1}
                </span>
                <h3 className="font-display text-xl font-medium text-brand-text">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xl font-body text-sm leading-[1.8] text-brand-muted md:text-[15px]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 6 — Why Choose HGS */}
      <section className="border-b border-brand-border bg-brand-cream px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            Why Choose Har Ghar Shudhi
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-[0.02em] text-brand-text md:text-[2.25rem]">
            Rooted in nature. Driven by purpose.
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-3 md:gap-4">
            {product.trustPoints.map((point) => (
              <span
                key={point}
                className="rounded-full border border-brand-border bg-brand-white px-5 py-2.5 font-shop text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-text shadow-sm"
              >
                {point}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — Related Products */}
      <section className="border-b border-brand-border bg-brand-white px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <CatalogRelatedProducts products={related} />
        </div>
      </section>

      {/* SECTION 8 — FAQ */}
      <section className="border-b border-brand-border bg-brand-cream px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-[0.02em] text-brand-text md:text-[2.25rem]">
            Common questions
          </h2>
          <div className="mt-8">
            <CatalogFaqAccordion faqs={product.faqs} />
          </div>
        </div>
      </section>

      {/* SECTION 9 — Final CTA */}
      <section className="bg-brand-green px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] font-medium leading-tight tracking-[0.02em] text-white">
            {product.finalCta.headline}
          </h2>
          <p className="mt-4 font-body text-base italic text-white/80 md:text-lg">
            {product.finalCta.subline}
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-white px-10 py-3.5 font-shop text-xs font-semibold uppercase tracking-[0.18em] text-brand-green transition-colors hover:bg-brand-cream"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </>
  );
}
