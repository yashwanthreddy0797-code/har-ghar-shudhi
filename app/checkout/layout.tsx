import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Har Ghar Shudhi",
  description: "Secure checkout — Har Ghar Shudhi Organic Wellness",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-checkout-cream text-brand-text">{children}</div>
  );
}
