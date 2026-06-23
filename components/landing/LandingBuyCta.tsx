"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

function isShopifyCheckoutUrl(url: string) {
  return url.startsWith("http://") || url.startsWith("https://");
}

export default function LandingBuyCta({
  variantId,
  availableForSale = true,
  label = "Buy Now",
  className = "",
  size = "default",
}: {
  variantId: string;
  availableForSale?: boolean;
  label?: string;
  className?: string;
  size?: "default" | "large" | "yellow";
}) {
  const { addItem } = useCart();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const sizeClasses =
    size === "large"
      ? "px-10 py-4 text-sm"
      : size === "yellow"
        ? "border-2 border-brand-text bg-[#f5d547] px-8 py-3.5 text-sm text-brand-text shadow-[4px_4px_0_#1a1a1a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#1a1a1a]"
        : "px-8 py-3.5 text-xs";

  const colorClasses =
    size === "yellow"
      ? ""
      : "bg-brand-green text-white hover:bg-brand-green-dark";

  const handleBuy = () => {
    if (!availableForSale) {
      router.push("/shop");
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        const cart = await addItem(variantId);
        if (cart?.checkoutUrl && isShopifyCheckoutUrl(cart.checkoutUrl)) {
          window.location.href = cart.checkoutUrl;
          return;
        }
        router.push("/checkout");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not add to cart");
      }
    });
  };

  return (
    <div>
      <button
        type="button"
        disabled={isPending}
        onClick={handleBuy}
        className={`inline-flex items-center justify-center gap-2 rounded-md font-shop font-bold uppercase tracking-[0.16em] transition-all disabled:cursor-not-allowed disabled:opacity-70 ${sizeClasses} ${colorClasses} ${className}`}
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
        <p className="mt-2 font-shop text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
