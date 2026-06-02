import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Contact Us | Har Ghar Shudhi",
  description: "Get in touch with our team for orders, inquiries, and support.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <section className="border-b border-brand-border bg-brand-cream px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-light text-brand-text md:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 font-sans text-base text-brand-muted">
            We&apos;d love to hear from you. Reach out for orders, support, or
            partnerships.
          </p>
        </div>
      </section>

      <section className="bg-brand-white px-6 py-14 md:px-12 md:py-18">
        <div className="mx-auto grid max-w-4xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-serif text-xl text-brand-green">Get in Touch</h2>
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
