import Link from "next/link";
import { ChevronLeft, ShieldCheck } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog/types";
import { ProductImage } from "@/components/shop/ProductImage";
import CatalogCommerceActions from "@/components/shop/catalog/CatalogCommerceActions";

const TRUST_BADGES = [
  "Ayush Licensed",
  "Lab Tested",
  "Premium Quality",
  "No Preservatives",
];

export default function CatalogProductBuySection({
  product,
  afterCinematicScroll = false,
}: {
  product: CatalogProduct;
  /** Renders below a fullscreen scroll film — adds a clean hand-off into commerce. */
  afterCinematicScroll?: boolean;
}) {
  return (
    <section
      className={`border-b border-brand-border bg-brand-white px-6 py-10 md:px-12 md:py-14 lg:py-16 ${
        afterCinematicScroll ? "shadow-[inset_0_1px_0_0_rgba(45,82,57,0.06)]" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <Link
          href="/shop"
          className="mb-8 inline-flex items-center gap-2 font-shop text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted transition-colors hover:text-brand-green"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to shop
        </Link>

        {afterCinematicScroll ? (
          <p className="mb-6 font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            Shop this product
          </p>
        ) : null}

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
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

          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-xl border border-brand-border bg-brand-cream shadow-[0_24px_60px_rgba(45,82,57,0.08)]">
              <ProductImage
                src={product.image}
                alt={product.name}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/5] w-full rounded-xl object-cover md:aspect-square"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
