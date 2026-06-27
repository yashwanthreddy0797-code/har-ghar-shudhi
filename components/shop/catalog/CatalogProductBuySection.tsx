import Link from "next/link";
import { Leaf, ShieldCheck, Truck, Wallet } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog/types";
import { getProductGalleryImages } from "@/lib/catalog/productGalleryImages";
import { formatReviews } from "@/lib/types/product";
import ProductImageGallery from "@/components/shop/catalog/ProductImageGallery";
import CatalogCommerceActions from "@/components/shop/catalog/CatalogCommerceActions";
import CatalogProductRating from "@/components/shop/catalog/CatalogProductRating";

const TRUST_STRIP = [
  { icon: Truck, label: "Free shipping above ₹999" },
  { icon: ShieldCheck, label: "Secure payments" },
  { icon: Leaf, label: "Ayurvedic sourcing" },
  { icon: Wallet, label: "COD available" },
];

export default function CatalogProductBuySection({
  product,
  afterCinematicScroll = false,
}: {
  product: CatalogProduct;
  /** Renders below a fullscreen scroll film — adds a clean hand-off into commerce. */
  afterCinematicScroll?: boolean;
}) {
  const galleryImages = getProductGalleryImages(product.slug, product.images);
  const benefitIcons = product.keyBenefits.slice(0, 4);
  const subtitle = product.productType
    ? `${product.tagline} | ${product.productType}`
    : product.tagline;

  return (
    <section
      className={`border-b border-brand-border bg-brand-white px-4 py-10 sm:px-6 md:px-10 md:py-14 lg:py-16 ${
        afterCinematicScroll ? "shadow-[inset_0_1px_0_0_rgba(45,82,57,0.06)]" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {afterCinematicScroll ? (
          <p className="mb-6 font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            Shop this product
          </p>
        ) : null}

        <nav
          aria-label="Breadcrumb"
          className="mb-6 font-shop text-sm text-brand-muted"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="transition-colors hover:text-brand-green">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-brand-border">
              /
            </li>
            <li>
              <Link href="/shop" className="transition-colors hover:text-brand-green">
                Shop
              </Link>
            </li>
            <li aria-hidden className="text-brand-border">
              /
            </li>
            <li className="text-brand-text">{product.name}</li>
          </ol>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14 xl:gap-16">
          <div className="lg:sticky lg:top-8">
            <ProductImageGallery
              images={galleryImages}
              alt={product.name}
              priority
            />
          </div>

          <div className="min-w-0">
            <h1 className="font-shop text-[clamp(1.75rem,4.5vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.01em] text-brand-text">
              {product.name}
            </h1>
            <p className="mt-2 font-shop text-base text-brand-muted">{subtitle}</p>

            <CatalogProductRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              className="mt-4"
            />

            <p className="mt-5 max-w-xl font-body text-[15px] leading-[1.8] text-brand-muted md:text-base">
              {product.description}
            </p>

            {benefitIcons.length > 0 ? (
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {benefitIcons.map((benefit) => (
                  <div key={benefit.label} className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-brand-green/20 bg-brand-green-light/60 text-2xl">
                      <span aria-hidden>{benefit.icon}</span>
                    </div>
                    <p className="mt-2.5 font-shop text-[11px] font-semibold uppercase leading-snug tracking-[0.08em] text-brand-green">
                      {benefit.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}

            <CatalogCommerceActions
              price={product.price}
              variants={product.variants}
              availableForSale={product.availableForSale}
              className="mt-8 border-t border-brand-border pt-8"
            />

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-brand-border pt-8 sm:grid-cols-4">
              {TRUST_STRIP.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <Icon className="h-5 w-5 text-brand-green" strokeWidth={1.5} />
                  <span className="font-shop text-[11px] leading-snug text-brand-muted">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
