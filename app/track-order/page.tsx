import PageShell from "@/components/PageShell";
import BrandPillarsBar from "@/components/about/BrandPillarsBar";
import { DELIVERY } from "@/lib/brand/content";

export const metadata = {
  title: "Track Order | Har Ghar Shudhi",
  description: "Track your Har Ghar Shudhi order status.",
};

export default function TrackOrderPage() {
  return (
    <PageShell>
      <section className="bg-brand-white px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-lg text-center">
          <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            {DELIVERY.headline}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium text-brand-text">
            Track Your Order
          </h1>
          <p className="mt-4 font-body text-sm italic text-brand-muted">
            {DELIVERY.subline} Enter your order number and email to check delivery status.
          </p>

          <form className="mt-10 space-y-4 text-left">
            <div>
              <label className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-wider text-brand-muted">
                Order Number
              </label>
              <input
                type="text"
                placeholder="e.g. #HGS1234"
                className="w-full rounded-md border border-brand-border bg-brand-white px-4 py-3 font-sans text-sm text-brand-text placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-wider text-brand-muted">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-md border border-brand-border bg-brand-white px-4 py-3 font-sans text-sm text-brand-text focus:border-brand-green focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-brand-green py-3.5 font-sans text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-brand-green-dark"
            >
              Track Order
            </button>
          </form>

          <p className="mt-8 font-shop text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-green">
            {DELIVERY.tagline}
          </p>
        </div>
      </section>
      <BrandPillarsBar />
    </PageShell>
  );
}
