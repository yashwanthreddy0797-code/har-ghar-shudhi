"use client";

import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

interface AddToCartButtonProps {
  variantId: string;
  availableForSale?: boolean;
  className?: string;
  label?: string;
}

export default function AddToCartButton({
  variantId,
  availableForSale = true,
  className = "",
  label = "Add to Cart",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!availableForSale) {
    return (
      <button
        type="button"
        disabled
        className={`w-full cursor-not-allowed rounded-md bg-brand-border py-2.5 font-sans text-xs font-medium uppercase tracking-wider text-brand-muted ${className}`}
      >
        Sold Out
      </button>
    );
  }

  return (
    <div>
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          setError(null);
          startTransition(async () => {
            try {
              await addItem(variantId);
            } catch (e) {
              setError(e instanceof Error ? e.message : "Could not add to cart");
            }
          });
        }}
        className={`inline-flex items-center justify-center gap-2 rounded-md bg-brand-green py-2.5 font-sans text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60 ${className}`}
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Adding…
          </>
        ) : (
          label
        )}
      </button>
      {error && (
        <p className="mt-2 font-sans text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}
