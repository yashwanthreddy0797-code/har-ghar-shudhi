"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import FooterIllustration from "@/components/FooterIllustration";
import { HOME_ROUTE, SHOP_LINKS, ABOUT_LINKS, CUSTOMER_LINKS } from "@/lib/navigation";

const POLICY_LINKS = CUSTOMER_LINKS.filter((link) =>
  link.href.startsWith("/policies")
);

const CONNECT_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "mailto:hello@hargharshudhi.com", label: "Email Us" },
  { href: "/philosophy", label: "Our Philosophy" },
  { href: "/track-order", label: "Track Order" },
];

const SOCIAL_LINKS = [
  { href: "https://facebook.com", label: "Facebook", icon: Facebook },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
  { href: "https://youtube.com", label: "YouTube", icon: Youtube },
  { href: "https://linkedin.com", label: "LinkedIn", icon: Linkedin },
] as const;

const FOOTER_NAV_SECTIONS = [
  { label: "Quick Links", links: SHOP_LINKS.slice(0, 5) },
  { label: "About", links: ABOUT_LINKS.slice(0, 5) },
  { label: "Policies", links: POLICY_LINKS },
  { label: "Connect", links: CONNECT_LINKS },
] as const;

interface FooterProps {
  variant?: "minimal" | "full";
}

export default function Footer({ variant = "full" }: FooterProps) {
  void variant;

  return (
    <footer
      id="contact"
      className="relative z-30 w-full max-w-[100vw] overflow-visible text-brand-text max-md:pb-[env(safe-area-inset-bottom,0px)]"
    >
      <FooterIllustration variant="background" />

      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-8 sm:px-6 md:px-10 md:pb-12 md:pt-10 lg:px-12 lg:pt-12">
          <div className="grid grid-cols-1 items-start gap-10 max-md:gap-8 md:grid-cols-12 md:gap-8 lg:gap-10">
            {/* Left — logo & tagline */}
            <div className="flex flex-col items-center md:col-span-3 md:items-start">
              <BrandLogo
                size="md"
                href={HOME_ROUTE}
                className="h-24 w-auto max-w-[170px] sm:h-28 sm:max-w-[190px]"
              />
              <p className="mt-4 max-w-[190px] text-center font-sans text-[11px] leading-[1.6] tracking-[0.04em] text-black md:text-left">
                Rooted in Nature, Driven by Purpose — pure wellness for every home.
              </p>
            </div>

            {/* Center — headline, newsletter, nav, social */}
            <div className="md:col-span-6">
              <div className="mx-auto max-w-lg text-center md:max-w-none">
                <h2 className="font-sans text-base font-semibold uppercase tracking-[0.14em] text-brand-green-dark md:text-lg">
                  Pure Wellness, Thoughtfully Made
                </h2>
                <p className="mt-4 font-sans text-sm leading-relaxed text-brand-muted">
                  Subscribe for special offers, newsletters, and become part of our
                  movement toward Ayurvedic living in every home.
                </p>

                <form
                  className="mt-6 flex items-stretch border border-white/50 bg-white/75 shadow-[0_8px_32px_rgba(45,82,57,0.08)] backdrop-blur-md"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    placeholder="Your e-mail"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 font-sans text-base text-brand-text placeholder:text-brand-muted/60 focus:outline-none md:text-sm"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex shrink-0 items-center justify-center border-l border-white/50 px-4 text-brand-green transition-colors hover:bg-brand-green-light/80 hover:text-brand-green-dark"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </form>

                <nav
                  className="relative mt-8 hidden md:flex md:items-center md:justify-center md:gap-0"
                  aria-label="Footer navigation"
                >
                  {FOOTER_NAV_SECTIONS.map((section, index) => (
                    <div key={section.label} className="flex items-center">
                      {index > 0 && (
                        <span
                          className="mx-5 text-brand-green-dark/35 select-none"
                          aria-hidden
                        >
                          |
                        </span>
                      )}
                      <FooterHoverDropdown
                        label={section.label}
                        links={[...section.links]}
                      />
                    </div>
                  ))}
                </nav>

                <nav
                  className="mt-8 flex flex-col gap-3 md:hidden"
                  aria-label="Footer navigation"
                >
                  {FOOTER_NAV_SECTIONS.map((section) => (
                    <FooterAccordion
                      key={section.label}
                      label={section.label}
                      links={[...section.links]}
                    />
                  ))}
                </nav>

                <div className="mt-8 flex items-center justify-center gap-5">
                  {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-brand-text/70 transition-colors hover:text-brand-green"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — contact */}
            <div className="relative md:col-span-3 md:text-right">
              <p className="text-center font-sans text-sm leading-relaxed text-brand-muted md:text-right">
                Pune, Maharashtra,
                <br />
                India.
              </p>
              <p className="mt-4 text-center font-sans text-sm text-brand-muted md:text-right">
                Email ID:{" "}
                <Link
                  href="mailto:hello@hargharshudhi.com"
                  className="underline decoration-brand-green/30 underline-offset-2 transition-colors hover:text-brand-green"
                >
                  hello@hargharshudhi.com
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-brand-green-dark/15 pt-6 sm:flex-row">
            <p className="text-center font-sans text-[10px] uppercase tracking-[0.2em] text-black sm:text-left">
              © {new Date().getFullYear()} Har Ghar Shudhi. All rights reserved.
            </p>
            <p className="text-center font-serif text-sm italic text-black sm:text-right">
              शुद्धि — Purity in every home.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHoverDropdown({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="group relative">
      <div className="flex cursor-default items-center gap-1.5 py-1 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-brand-green-dark">
        {label}
        <ChevronDown
          className="h-3 w-3 shrink-0 transition-transform duration-150 group-hover:rotate-180"
          strokeWidth={2}
        />
      </div>
      <div className="pointer-events-none invisible absolute left-0 top-full z-30 min-w-[170px] pt-2 opacity-0 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
        <ul className="bg-white/95 py-2 shadow-[0_8px_24px_rgba(45,82,57,0.12)] backdrop-blur-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block whitespace-nowrap px-4 py-2 text-left font-sans text-sm text-brand-green-dark transition-colors hover:bg-brand-green-light/40 hover:text-brand-green"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FooterAccordion({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string }[];
}) {
  return (
    <details className="group overflow-hidden rounded-md border border-brand-border/60 bg-white/90 shadow-[0_4px_16px_rgba(45,82,57,0.06)] backdrop-blur-md">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-brand-green-dark transition-colors hover:text-brand-green [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown
          className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-open:rotate-180"
          strokeWidth={2}
        />
      </summary>
      <ul className="border-t border-brand-border/40 px-2 py-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded px-3 py-2.5 text-left font-sans text-sm text-brand-muted transition-colors hover:bg-brand-green-light/50 hover:text-brand-green"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
