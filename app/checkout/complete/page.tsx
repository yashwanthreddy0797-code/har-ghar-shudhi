import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { getCompletedOrderAction } from "@/app/actions/checkout";
import BrandLogo from "@/components/BrandLogo";
import { formatPrice } from "@/lib/types/product";

export default async function CheckoutCompletePage() {
  const order = await getCompletedOrderAction();
  if (!order) redirect("/shop");

  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 pb-16 pt-24 text-center md:pt-28">
      <BrandLogo size="2xl" href="/" priority />
      <CheckCircle
        className="mt-10 h-14 w-14 text-brand-green"
        strokeWidth={1.25}
      />
      <h1 className="mt-6 font-serif text-3xl font-light text-brand-text">
        Thank you for your order
      </h1>
      <p className="mt-3 font-sans text-sm text-brand-muted">
        Order <span className="font-medium text-brand-text">{order.orderNumber}</span>{" "}
        is confirmed with Har Ghar Shudhi. We&apos;ll email{" "}
        <span className="font-medium text-brand-text">{order.email}</span> with
        delivery updates.
      </p>
      <p className="mt-6 font-sans text-lg font-semibold text-brand-text">
        {formatPrice(order.subtotal)}
      </p>
      <ul className="mt-8 w-full space-y-3 border-t border-brand-border pt-8 text-left">
        {order.lines.map((line, i) => (
          <li
            key={`${line.productTitle}-${i}`}
            className="flex justify-between gap-4 font-sans text-sm"
          >
            <span className="text-brand-text">
              {line.productTitle}
              {line.quantity > 1 ? ` × ${line.quantity}` : ""}
            </span>
            <span className="shrink-0 text-brand-muted">
              {formatPrice(line.lineTotal)}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href="/shop"
        className="mt-10 inline-block rounded-md bg-brand-green px-8 py-3.5 font-sans text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-brand-green-dark"
      >
        Continue shopping
      </Link>
    </div>
  );
}
