import Image from "next/image";
import type { Cart } from "@/lib/shopify/cart";
import { formatPrice } from "@/lib/types/product";

export default function CheckoutOrderSummary({ cart }: { cart: Cart }) {
  return (
    <aside className="bg-checkout-panel px-6 py-8 text-checkout-panel-fg md:px-10 md:py-12 lg:min-h-screen lg:px-12">
      <ul className="space-y-5">
        {cart.lines.map((line) => (
          <li key={line.id} className="flex gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-white/10">
              {line.image && (
                <Image
                  src={line.image}
                  alt={line.productTitle}
                  fill
                  className="object-contain p-1"
                  sizes="64px"
                />
              )}
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-checkout-panel-fg text-[10px] font-medium text-checkout-panel">
                {line.quantity}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-sans text-sm font-medium leading-snug">
                {line.productTitle}
              </p>
              {line.title !== "Default Title" && (
                <p className="mt-0.5 font-sans text-xs text-white/70">
                  {line.title}
                </p>
              )}
            </div>
            <p className="shrink-0 font-sans text-sm font-medium">
              {formatPrice(line.lineTotal)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-3 border-t border-white/15 pt-6 font-sans text-sm">
        <div className="flex justify-between">
          <span className="text-white/75">Subtotal</span>
          <span>{formatPrice(cart.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/75">Shipping</span>
          <span className="text-white/70">Calculated at confirmation</span>
        </div>
        <div className="flex justify-between border-t border-white/15 pt-4 text-base font-medium">
          <span>Total</span>
          <span>
            {cart.currencyCode} {formatPrice(cart.subtotal)}
          </span>
        </div>
      </div>
    </aside>
  );
}
