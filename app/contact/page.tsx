import Link from "next/link";
import PageShell from "@/components/PageShell";
import BrandPillarsBar from "@/components/about/BrandPillarsBar";
import { DELIVERY } from "@/lib/brand/content";
import { Package, Clock, Headphones } from "lucide-react";

export const metadata = {
  title: "Contact Us | Har Ghar Shudhi",
  description: "Get in touch with our team for orders, inquiries, and support.",
};

const SERVICE_ICONS = [Package, Clock, Headphones];

export default function ContactPage() {
  return (
    <PageShell>
      <section className="border-b border-brand-border bg-brand-cream px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            {DELIVERY.headline}
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium text-brand-text md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 font-body text-base italic text-brand-muted">
            {DELIVERY.subline} {DELIVERY.tagline}
          </p>
        </div>
      </section>

      <BrandPillarsBar />

      <section className="border-b border-brand-border bg-brand-white px-6 py-10 md:px-12">
        <ul className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
          {DELIVERY.services.map((service, index) => {
            const Icon = SERVICE_ICONS[index];
            return (
              <li
                key={service.title}
                className="rounded-xl border border-brand-border bg-brand-cream/30 p-6 text-center"
              >
                <Icon className="mx-auto h-5 w-5 text-brand-green" strokeWidth={1.5} />
                <h2 className="mt-4 font-display text-base font-medium text-brand-text">
                  {service.title}
                </h2>
                <p className="mt-2 font-body text-sm leading-relaxed text-brand-muted">
                  {service.description}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-brand-white px-6 py-14 md:px-12 md:py-18">
        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-display text-xl text-brand-green">Get in Touch</h2>
            <ul className="mt-6 space-y-5 font-sans text-sm text-brand-text">
              <li>
                <span className="block text-xs font-medium uppercase tracking-wider text-brand-muted">
                  Email
                </span>
                <a
                  href="mailto:hello@hargharshudhi.com"
                  className="transition-colors hover:text-brand-green"
                >
                  hello@hargharshudhi.com
                </a>
              </li>
              <li>
                <span className="block text-xs font-medium uppercase tracking-wider text-brand-muted">
                  Phone
                </span>
                +91 7406753753
              </li>
              <li>
                <span className="block text-xs font-medium uppercase tracking-wider text-brand-muted">
                  WhatsApp
                </span>
                +91 7406753753
              </li>
              <li>
                <span className="block text-xs font-medium uppercase tracking-wider text-brand-muted">
                  Address
                </span>
                11th Floor, Jasminium Building, Magarpatta City, Hadapsar,
                Pune, Maharashtra 411028
              </li>
            </ul>
            <Link
              href="/about#delivery"
              className="mt-8 inline-block font-shop text-xs font-semibold uppercase tracking-[0.16em] text-brand-green hover:underline"
            >
              Learn about our delivery promise →
            </Link>
          </div>

          <form className="space-y-4">
            <div>
              <label className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-wider text-brand-muted">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border border-brand-border bg-brand-white px-4 py-3 font-sans text-sm text-brand-text focus:border-brand-green focus:outline-none"
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
            <div>
              <label className="mb-1.5 block font-sans text-xs font-medium uppercase tracking-wider text-brand-muted">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full rounded-md border border-brand-border bg-brand-white px-4 py-3 font-sans text-sm text-brand-text focus:border-brand-green focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-brand-green py-3.5 font-sans text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-brand-green-dark"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
