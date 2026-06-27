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
      className={`border-b border-brand-border bg-brand-white px-4 py-5 sm:px-6 md:px-8 md:py-6 lg:max-h-screen lg:overflow-hidden ${
        afterCinematicScroll ? "shadow-[inset_0_1px_0_0_rgba(45,82,57,0.06)]" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <nav aria-label="Breadcrumb" className="font-shop text-xs text-brand-muted">
            <ol className="flex flex-wrap items-center gap-1">
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
          {afterCinematicScroll ? (
            <p className="font-shop text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-green">
              Shop this product
            </p>
          ) : null}
        </div>

        <div className="grid items-center gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8">
          <div>
            <ProductImageGallery
              images={galleryImages}
              alt={product.name}
              priority
            />
          </div>

          <div className="min-w-0">
            <h1 className="font-shop text-[clamp(1.35rem,3.5vw,1.75rem)] font-semibold leading-tight tracking-[-0.01em] text-brand-text">
              {product.name}
            </h1>
            <p className="mt-1 font-shop text-sm text-brand-muted">{subtitle}</p>

            <CatalogProductRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              className="mt-2"
            />

            <p className="mt-2 line-clamp-2 max-w-xl font-body text-sm leading-relaxed text-brand-muted">
              {product.description}
            </p>

            {benefitIcons.length > 0 ? (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {benefitIcons.map((benefit) => (
                  <div key={benefit.label} className="text-center">
                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-brand-green/20 bg-brand-green-light/60 text-base">
                      <span aria-hidden>{benefit.icon}</span>
                    </div>
                    <p className="mt-1 font-shop text-[9px] font-semibold uppercase leading-tight tracking-[0.06em] text-brand-green">
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
              className="mt-4 border-t border-brand-border pt-4"
            />

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-brand-border pt-4 sm:grid-cols-4">
              {TRUST_STRIP.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <Icon className="h-4 w-4 text-brand-green" strokeWidth={1.5} />
                  <span className="font-shop text-[9px] leading-tight text-brand-muted">
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
