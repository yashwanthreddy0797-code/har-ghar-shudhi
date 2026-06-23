"use client";

import { useMemo, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Heart, Loader2, Star } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { isPlaceholderImage } from "@/components/shop/ProductImage";
import { getShopProductImage } from "@/lib/shop/exploreProductsConfig";
import {
  formatPrice,
  type Product,
  type ProductVariant,
} from "@/lib/types/product";

function getBenefitLine(product: Product): string {
  if (product.benefitPills?.length) {
    return product.benefitPills.join(" | ");
  }
  return product.tagline;
}

function badgeTone(badge?: string) {
  if (!badge) return "green" as const;
  const lower = badge.toLowerCase();
  if (lower.includes("superfood") || lower.includes("trending")) {
    return "orange" as const;
  }
  return "green" as const;
}

function StarRating() {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const variants = product.variants.length
    ? product.variants
    : [
        {
          id: product.id,
          label: "Default",
          price: product.price,
          availableForSale: product.availableForSale,
        } satisfies ProductVariant,
      ];

  const [selectedVariantId, setSelectedVariantId] = useState(variants[0].id);
  const [wishlisted, setWishlisted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const selectedVariant = useMemo(
    () => variants.find((v) => v.id === selectedVariantId) ?? variants[0],
    [variants, selectedVariantId]
  );

  const imageSrc = getShopProductImage(product.slug, product.image);
  const benefitLine = getBenefitLine(product);
  const tone = badgeTone(product.badge);
  const canPurchase = selectedVariant.availableForSale;

  const handleAddToCart = () => {
    if (!canPurchase) return;
    setError(null);
    startTransition(async () => {
      try {
        await addItem(selectedVariant.id, 1);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not add to cart");
      }
    });
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-brand-border bg-brand-white shadow-[0_2px_12px_rgba(45,82,57,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(45,82,57,0.1)]">
      <Link
        href={`/products/${product.slug}`}
        className="relative block overflow-hidden bg-gradient-to-br from-brand-cream via-brand-white to-brand-sand"
      >
        <div className="relative aspect-square">
          {isPlaceholderImage(imageSrc) ? (
            <div className="flex h-full items-center justify-center font-shop text-[10px] uppercase tracking-[0.2em] text-brand-muted/50">
              Image soon
            </div>
          ) : (
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}

          <div className="absolute right-2 top-2 z-10 flex max-w-[calc(100%-1rem)] items-stretch overflow-hidden rounded-sm shadow-sm">
            {product.badge && (
              <span
                className={[
                  "flex max-w-[7.5rem] items-center truncate px-1.5 py-0.5 font-shop text-[7px] font-semibold uppercase tracking-[0.1em] text-white sm:max-w-[8.5rem] md:text-[8px]",
                  tone === "orange" ? "bg-[#c45c26]" : "bg-brand-green-dark",
                ].join(" ")}
              >
                {product.badge}
              </span>
            )}
            <button
              type="button"
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              aria-pressed={wishlisted}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setWishlisted((v) => !v);
              }}
              className={[
                "flex shrink-0 items-center justify-center border-l border-white/20 px-1.5 py-0.5 transition-colors",
                tone === "orange" ? "bg-[#c45c26]" : "bg-brand-green-dark",
                wishlisted ? "text-red-200" : "text-white/90 hover:text-white",
              ].join(" ")}
            >
              <Heart
                className={`h-2.5 w-2.5 ${wishlisted ? "fill-current" : ""}`}
                strokeWidth={1.75}
              />
            </button>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3.5 md:p-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="min-w-0 flex-1 font-display text-[13px] font-semibold uppercase leading-snug tracking-[0.03em] text-brand-text transition-colors hover:text-brand-green md:text-sm"
          >
            {product.name}
          </Link>
          <p className="shrink-0 font-shop text-sm font-bold tabular-nums text-brand-text md:text-base">
            {formatPrice(selectedVariant.price)}
          </p>
        </div>

        {benefitLine && (
          <p className="mt-1.5 line-clamp-2 font-shop text-[11px] leading-snug text-brand-muted md:text-xs">
            {benefitLine}
          </p>
        )}

        <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">
          <StarRating />
          <span className="font-shop text-[11px] font-semibold text-brand-text md:text-xs">
            {product.rating.toFixed(2)}
          </span>
          <span className="font-shop text-[11px] text-brand-muted md:text-xs">
            | {product.reviewCount} Review{product.reviewCount === 1 ? "" : "s"}
          </span>
        </div>

        <div className="mt-3">
          <div className="relative">
            <select
              value={selectedVariantId}
              onChange={(e) => setSelectedVariantId(e.target.value)}
              aria-label={`Select size for ${product.name}`}
              className="w-full appearance-none rounded-md border border-brand-border bg-brand-white py-2.5 pl-3 pr-9 font-shop text-xs text-brand-text transition-colors focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/30 md:text-[13px]"
            >
              {variants.map((variant) => (
                <option key={variant.id} value={variant.id}>
                  {variant.label}
                  {!variant.availableForSale ? " — Sold out" : ""}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted"
              strokeWidth={1.75}
              aria-hidden
            />
          </div>
        </div>

        <div className="mt-3 flex-1" />

        <button
          type="button"
          disabled={isPending || !canPurchase}
          onClick={handleAddToCart}
          className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-green-dark py-2.5 font-shop text-[11px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-green disabled:cursor-not-allowed disabled:bg-brand-border disabled:text-brand-muted md:py-3 md:text-xs"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding…
            </>
          ) : canPurchase ? (
            "Add to Cart"
          ) : (
            "Sold Out"
          )}
        </button>

        {error && (
          <p className="mt-2 text-center font-shop text-[10px] text-red-500">{error}</p>
        )}
      </div>
    </article>
  );
}
