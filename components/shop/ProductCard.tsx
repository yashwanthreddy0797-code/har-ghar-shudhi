import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types/product";
import { formatPrice, formatReviews } from "@/lib/types/product";
import ProductImageFromProduct from "./ProductImage";
import AddToCartButton from "@/components/cart/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  const defaultVariant = product.variants[0];

  return (
    <article className="group flex flex-col">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg border border-brand-border bg-brand-white">
          <ProductImageFromProduct product={product} />
          {product.badge && (
            <span className="absolute left-3 top-3 rounded bg-brand-accent px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-wide text-white">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      <div className="mt-3 flex flex-1 flex-col">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-sans text-sm font-medium leading-snug text-brand-text transition-colors group-hover:text-brand-green md:text-[15px]">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 font-sans text-xs text-brand-muted">
          {product.tagline}
        </p>

        <div className="mt-2 flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-sans text-xs text-brand-muted">
            {product.rating} · {formatReviews(product.reviewCount)} Reviews
          </span>
        </div>

        <div className="mt-auto flex items-baseline gap-2 pt-3">
          <span className="font-sans text-base font-semibold text-brand-text">
            {formatPrice(defaultVariant?.price ?? product.price)}
          </span>
          {product.compareAt && (
            <span className="font-sans text-sm text-brand-muted line-through">
              {formatPrice(product.compareAt)}
            </span>
          )}
        </div>

        {defaultVariant && (
          <AddToCartButton
            variantId={defaultVariant.id}
            availableForSale={defaultVariant.availableForSale}
            className="mt-3 w-full"
          />
        )}
      </div>
    </article>
  );
}
