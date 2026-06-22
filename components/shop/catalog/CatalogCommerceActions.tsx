"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice } from "@/lib/types/product";

function isShopifyCheckoutUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export default function CatalogCommerceActions({
  price,
  variantId,
  availableForSale = true,
  className = "",
}: {
  price: number;
  variantId: string;
  availableForSale?: boolean;
  className?: string;
}) {
  const { addItem } = useCart();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = (redirectToCheckout = false) => {
    if (!availableForSale) return;

    setError(null);
    startTransition(async () => {
      try {
        const cart = await addItem(variantId);
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
      <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-green">
        Price
      </p>
      <p className="mt-2 font-shop text-3xl font-semibold tabular-nums tracking-tight text-brand-text md:text-[2.25rem]">
        {formatPrice(price)}
      </p>
      <p className="mt-1 font-shop text-xs tracking-wide text-brand-muted">
        Live pricing from Shopify
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={isPending || !availableForSale}
          onClick={() => handleAddToCart(false)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-brand-green px-8 py-3.5 font-shop text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding…
            </>
          ) : availableForSale ? (
            "Add to Cart"
          ) : (
            "Sold Out"
          )}
        </button>
        <button
          type="button"
          disabled={isPending || !availableForSale}
          onClick={() => handleAddToCart(true)}
          className="inline-flex flex-1 items-center justify-center rounded-md border border-brand-green bg-transparent px-8 py-3.5 font-shop text-xs font-semibold uppercase tracking-[0.18em] text-brand-green transition-colors hover:bg-brand-green-light disabled:cursor-not-allowed disabled:opacity-70"
        >
          Buy Now
        </button>
      </div>

      {error && (
        <p className="mt-3 font-shop text-[11px] tracking-wide text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
