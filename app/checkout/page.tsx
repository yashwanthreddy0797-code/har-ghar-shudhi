import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import CheckoutLogo from "@/components/checkout/CheckoutLogo";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";
import { getCart } from "@/lib/shopify/cart";

export default async function CheckoutPage() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("shopify_cart_id")?.value;
  const cart = cartId ? await getCart(cartId) : null;

  if (!cart || cart.lines.length === 0) {
    redirect("/shop?checkout=empty");
  }

  return (
    <div className="pt-16 md:pt-[4.5rem] lg:grid lg:min-h-screen lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px]">
      <div className="border-b border-brand-border/60 bg-checkout-cream px-6 py-6 md:px-12 md:py-8 lg:border-b-0 lg:border-r">
        <div className="mx-auto max-w-xl">
          <div className="mb-10 flex items-center justify-between gap-4">
            <CheckoutLogo />
            <Link
              href="/shop"
              className="text-brand-muted transition-colors hover:text-brand-green"
              aria-label="Back to shop"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            </Link>
          </div>
          <CheckoutForm />
        </div>
      </div>

      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <CheckoutOrderSummary cart={cart} />
      </div>
    </div>
  );
}
