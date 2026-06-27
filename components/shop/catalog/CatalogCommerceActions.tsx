"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice, type ProductVariant } from "@/lib/types/product";

function isShopifyCheckoutUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export default function CatalogCommerceActions({
  price,
  variants,
  availableForSale = true,
  className = "",
}: {
  price: number;
  variants: ProductVariant[];
  availableForSale?: boolean;
  className?: string;
}) {
  const { addItem } = useCart();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const resolvedVariants = useMemo(
    () =>
      variants.length
        ? variants
        : [
            {
              id: "default",
              label: "Standard",
              price,
              availableForSale,
            } satisfies ProductVariant,
          ],
    [variants, price, availableForSale]
  );

  const [selectedVariantId, setSelectedVariantId] = useState(resolvedVariants[0].id);

  const selectedVariant = useMemo(
    () => resolvedVariants.find((v) => v.id === selectedVariantId) ?? resolvedVariants[0],
    [resolvedVariants, selectedVariantId]
  );

  const canPurchase = selectedVariant.availableForSale;
  const displayPrice = selectedVariant.price;

  const handleAddToCart = (redirectToCheckout = false) => {
    if (!canPurchase) return;

    setError(null);
    startTransition(async () => {
      try {
        const cart = await addItem(selectedVariant.id);
        if (redirectToCheckout) {
          if (cart?.checkoutUrl && isShopifyCheckoutUrl(cart.checkoutUrl)) {
            window.location.href = cart.checkoutUrl;
            return;
          }
          router.push("/checkout");
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not add to cart");
      }
    });
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-3">
        <p className="font-shop text-[clamp(1.75rem,4vw,2.25rem)] font-semibold tabular-nums tracking-tight text-brand-text">
          {formatPrice(displayPrice)}
        </p>
        {!canPurchase ? (
          <span className="rounded-md bg-[#6b4f8a] px-3 py-1 font-shop text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
            Sold Out
          </span>
        ) : null}
      </div>
      <p className="mt-1 font-shop text-xs text-brand-muted">
        MRP (Incl. of all taxes)
      </p>

      {resolvedVariants.length > 0 ? (
        <div className="mt-7">
          <p className="mb-3 font-shop text-sm font-semibold text-brand-text">Size</p>
          <div className="flex flex-wrap gap-3">
            {resolvedVariants.map((variant) => {
              const isSelected = variant.id === selectedVariantId;
              return (
                <button
                  key={variant.id}
                  type="button"
                  disabled={!variant.availableForSale}
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`min-w-[9.5rem] rounded-lg border-2 px-5 py-4 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                    isSelected
                      ? "border-brand-green bg-brand-green-light"
                      : "border-brand-border bg-brand-white hover:border-brand-green/35"
                  }`}
                >
                  <span className="block font-shop text-base font-semibold text-brand-text">
                    {variant.label}
                  </span>
                  <span className="mt-1 block font-shop text-sm tabular-nums text-brand-muted">
                    {formatPrice(variant.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={isPending || !canPurchase}
          onClick={() => handleAddToCart(false)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-green px-8 py-4 font-shop text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding…
            </>
          ) : canPurchase ? (
            "Add to Cart"
          ) : (
            "Notify Me"
          )}
        </button>
        {canPurchase ? (
          <button
            type="button"
            disabled={isPending}
            onClick={() => handleAddToCart(true)}
            className="inline-flex flex-1 items-center justify-center rounded-lg border-2 border-brand-green bg-transparent px-8 py-4 font-shop text-sm font-semibold uppercase tracking-[0.12em] text-brand-green transition-colors hover:bg-brand-green-light disabled:cursor-not-allowed disabled:opacity-70"
          >
            Buy Now
          </button>
        ) : null}
      </div>

      {error ? (
        <p className="mt-3 font-shop text-[11px] tracking-wide text-red-500">{error}</p>
      ) : null}
    </div>
  );
}
