"use client";

import { useState, useTransition } from "react";
import { placeOrderAction } from "@/app/actions/checkout";
import { INDIAN_STATES } from "@/lib/checkout";

export default function CheckoutForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await placeOrderAction({
        email: String(fd.get("email") ?? ""),
        marketingOptIn: fd.get("marketing") === "on",
        firstName: String(fd.get("firstName") ?? ""),
        lastName: String(fd.get("lastName") ?? ""),
        address: String(fd.get("address") ?? ""),
        apartment: String(fd.get("apartment") ?? "") || undefined,
        city: String(fd.get("city") ?? ""),
        state: String(fd.get("state") ?? "Andhra Pradesh"),
        pinCode: String(fd.get("pinCode") ?? ""),
        phone: String(fd.get("phone") ?? ""),
      });
      if (result?.error) setError(result.error);
    });
  }

  const inputClass =
    "w-full rounded-md border border-brand-border bg-white px-3.5 py-3 font-sans text-sm text-brand-text placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <h2 className="font-sans text-lg font-medium text-brand-text">Contact</h2>
        <div className="mt-4 space-y-3">
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="Email"
            className={inputClass}
          />
          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              name="marketing"
              defaultChecked
              className="h-4 w-4 rounded border-brand-border text-brand-green focus:ring-brand-green"
            />
            <span className="font-sans text-sm text-brand-muted">
              Email me with news and offers from Har Ghar Shudhi
            </span>
          </label>
        </div>
      </section>

      <section>
        <h2 className="font-sans text-lg font-medium text-brand-text">Delivery</h2>
        <div className="mt-4 space-y-3">
          <select
            name="country"
            defaultValue="IN"
            disabled
            className={`${inputClass} text-brand-muted`}
            aria-label="Country"
          >
            <option value="IN">India</option>
          </select>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              name="firstName"
              required
              autoComplete="given-name"
              placeholder="First name"
              className={inputClass}
            />
            <input
              type="text"
              name="lastName"
              required
              autoComplete="family-name"
              placeholder="Last name"
              className={inputClass}
            />
          </div>
          <input
            type="text"
            name="address"
            required
            autoComplete="street-address"
            placeholder="Address"
            className={inputClass}
          />
          <input
            type="text"
            name="apartment"
            autoComplete="address-line2"
            placeholder="Apartment, suite, etc. (optional)"
            className={inputClass}
          />
          <div className="grid gap-3 sm:grid-cols-3">
            <input
              type="text"
              name="city"
              required
              autoComplete="address-level2"
              placeholder="City"
              className={inputClass}
            />
            <select
              name="state"
              required
              defaultValue="Andhra Pradesh"
              className={inputClass}
            >
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="pinCode"
              required
              autoComplete="postal-code"
              placeholder="PIN code"
              pattern="[0-9]{6}"
              className={inputClass}
            />
          </div>
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            placeholder="Phone"
            className={inputClass}
          />
        </div>
      </section>

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 font-sans text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-brand-green py-4 font-sans text-sm font-medium uppercase tracking-wider text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
      >
        {isPending ? "Placing order…" : "Complete order — Har Ghar Shudhi"}
      </button>

      <p className="font-sans text-xs leading-relaxed text-brand-muted">
        You are checking out on Har Ghar Shudhi. We never redirect you to
        third-party store branding. Payment and fulfillment are handled by our
        team after order confirmation.
      </p>
    </form>
  );
}
