import Link from "next/link";
import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import { getAllCatalogProducts } from "@/lib/catalog";

const FEATURED_SLUGS = [
  "wildforest-multiflora-honey",
  "moringa-powder",
  "pure-shilajit",
  "ashwagandha-advance",
  "spirulina-powder",
] as const;

export default function HomeLanding() {
  const products = getAllCatalogProducts().filter((p) =>
    FEATURED_SLUGS.includes(p.slug as (typeof FEATURED_SLUGS)[number])
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-brand-border bg-gradient-to-b from-brand-cream via-brand-white to-brand-white px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <BrandLogo size="2xl" className="mx-auto" href={null} />
          <p className="mt-8 font-shop text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-green">
            Rooted in Nature
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2rem,6vw,3.75rem)] font-medium leading-[1.06] tracking-[0.02em] text-brand-text">
            Luxury Ayurvedic wellness for every home
          </h1>
          <p className="mt-5 max-w-2xl font-body text-base leading-[1.85] text-brand-muted md:text-lg">
            Pure, lab-tested botanicals — honey, moringa, shilajit, ashwagandha,
            and spirulina — crafted with transparency and purpose.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-md bg-brand-green px-8 py-3.5 font-shop text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-green-dark"
            >
              Shop All Products
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-md border border-brand-green/30 px-8 py-3.5 font-shop text-xs font-semibold uppercase tracking-[0.18em] text-brand-green transition-colors hover:border-brand-green hover:bg-brand-green-light"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-border bg-brand-white px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center md:mb-12">
            <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
              Featured Products
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-[0.02em] text-brand-text md:text-4xl">
              Explore our collection
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group overflow-hidden rounded-xl border border-brand-border bg-brand-cream/40 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(45,82,57,0.1)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <p className="font-shop text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-green">
                    {product.badge ?? product.tagline}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-medium text-brand-text">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-brand-muted">
                    {product.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
