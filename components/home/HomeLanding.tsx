import Link from "next/link";
import Image from "next/image";
import HomeHeroSection from "@/components/home/HomeHeroSection";
import HomeWelcomeSection from "@/components/home/HomeWelcomeSection";
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
      <HomeHeroSection />
      <HomeWelcomeSection />

      <section className="border-b border-brand-border bg-brand-white">
        <div className="border-b border-brand-green/10 bg-brand-green-light/50 px-6 py-4 md:px-12">
          <div className="mx-auto max-w-6xl">
            <p className="font-shop text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-green-dark">
              Our Signature Products
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 py-14 md:px-12 md:py-20">
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
