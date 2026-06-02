"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types/product";
import { formatPrice, formatReviews } from "@/lib/types/product";
import { ProductImage } from "@/components/shop/ProductImage";
import AddToCartButton from "@/components/cart/AddToCartButton";

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = product.variants[selectedVariantIndex] ?? product.variants[0];

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-14">
      <div className="relative overflow-hidden rounded-xl border border-brand-border bg-brand-cream">
        <ProductImage
          src={product.image}
          alt={product.name}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="aspect-square rounded-xl"
        />
        {product.badge && (
          <span className="absolute left-4 top-4 rounded bg-brand-accent px-3 py-1.5 font-sans text-[10px] font-medium uppercase tracking-wide text-white">
            {product.badge}
          </span>
        )}
      </div>

      <div>
        <h1 className="font-serif text-3xl font-light leading-tight text-brand-text md:text-4xl">
          {product.name}
        </h1>
        <p className="mt-2 font-sans text-sm text-brand-muted">{product.tagline}</p>

        <div className="mt-4 flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-brand-border"
                }`}
              />
            ))}
          </div>
          <span className="font-sans text-sm text-brand-muted">
            {product.rating} · {formatReviews(product.reviewCount)} Reviews
          </span>
        </div>

        <div className="mt-5 flex items-baseline gap-3">
          <span className="font-sans text-2xl font-semibold text-brand-text">
            {formatPrice(selectedVariant?.price ?? product.price)}
          </span>
          {(selectedVariant?.compareAt ?? product.compareAt) && (
            <span className="font-sans text-lg text-brand-muted line-through">
              {formatPrice(selectedVariant?.compareAt ?? product.compareAt!)}
            </span>
          )}
        </div>

        {selectedVariant && (
          <p className="mt-2 font-sans text-xs text-brand-muted">
            {selectedVariant.availableForSale ? "In stock" : "Out of stock"}
          </p>
        )}

        {product.variants.length > 1 && (
          <div className="mt-7">
            <p className="mb-3 font-sans text-xs font-medium uppercase tracking-wider text-brand-green">
              Select Size
            </p>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant, i) => (
                <button
                  key={variant.id}
                  type="button"
                  disabled={!variant.availableForSale}
                  onClick={() => setSelectedVariantIndex(i)}
                  className={`rounded-md border px-4 py-2 font-sans text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                    i === selectedVariantIndex
                      ? "border-brand-green bg-brand-green-light text-brand-green"
                      : "border-brand-border text-brand-muted hover:border-brand-green/40"
                  }`}
                >
                  {variant.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <AddToCartButton
          variantId={selectedVariant.id}
          availableForSale={selectedVariant.availableForSale}
          className="mt-7 w-full py-3.5 md:w-auto md:px-14"
        />

        {product.description && (
          <p className="mt-8 font-sans text-sm leading-relaxed text-brand-muted">
            {product.description}
          </p>
        )}

        {product.highlights.length > 0 && (
          <ul className="mt-5 space-y-2">
            {product.highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-3 font-sans text-sm text-brand-text"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={`/shop/${product.category}`}
          className="mt-8 inline-block font-sans text-xs text-brand-green hover:underline"
        >
          View more in {product.category}
        </Link>
      </div>
    </div>
  );
}
