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
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-shop text-[clamp(1.35rem,3vw,1.65rem)] font-semibold tabular-nums tracking-tight text-brand-text">
          {formatPrice(displayPrice)}
        </p>
        {!canPurchase ? (
          <span className="rounded bg-[#6b4f8a] px-2 py-0.5 font-shop text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            Sold Out
          </span>
        ) : null}
      </div>
      <p className="mt-0.5 font-shop text-[10px] text-brand-muted">
        MRP (Incl. of all taxes)
      </p>

      {resolvedVariants.length > 0 ? (
        <div className="mt-3">
          <p className="mb-1.5 font-shop text-xs font-semibold text-brand-text">Size</p>
          <div className="flex flex-wrap gap-2">
            {resolvedVariants.map((variant) => {
              const isSelected = variant.id === selectedVariantId;
              return (
                <button
                  key={variant.id}
                  type="button"
                  disabled={!variant.availableForSale}
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`min-w-[7.5rem] rounded-md border-2 px-3 py-2 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                    isSelected
                      ? "border-brand-green bg-brand-green-light"
                      : "border-brand-border bg-brand-white hover:border-brand-green/35"
                  }`}
                >
                  <span className="block font-shop text-sm font-semibold text-brand-text">
                    {variant.label}
                  </span>
                  <span className="mt-0.5 block font-shop text-xs tabular-nums text-brand-muted">
                    {formatPrice(variant.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          disabled={isPending || !canPurchase}
          onClick={() => handleAddToCart(false)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-brand-green px-5 py-2.5 font-shop text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-70"
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
            className="inline-flex flex-1 items-center justify-center rounded-md border-2 border-brand-green bg-transparent px-5 py-2.5 font-shop text-xs font-semibold uppercase tracking-[0.1em] text-brand-green transition-colors hover:bg-brand-green-light disabled:cursor-not-allowed disabled:opacity-70"
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
