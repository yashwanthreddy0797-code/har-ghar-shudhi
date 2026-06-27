import Link from "next/link";
import type { CatalogProduct } from "@/lib/catalog/types";
import { getRelatedCatalogProducts } from "@/lib/catalog";
import CatalogFaqAccordion from "@/components/shop/catalog/CatalogFaqAccordion";
import CatalogRelatedProducts from "@/components/shop/catalog/CatalogRelatedProducts";

export default function CatalogProductDetails({
  product,
}: {
  product: CatalogProduct;
}) {
  const related = getRelatedCatalogProducts(product.relatedSlugs);

  return (
    <>
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

      <section className="border-b border-brand-border bg-brand-white px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <CatalogRelatedProducts products={related} />
        </div>
      </section>

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
