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
import { SHOP_LINKS, CUSTOMER_LINKS } from "@/lib/navigation";

const POLICY_LINKS = CUSTOMER_LINKS.filter((link) =>
  link.href.startsWith("/policies")
);

const CONNECT_LINKS = [
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

interface FooterProps {
  variant?: "minimal" | "full";
}

export default function Footer({ variant = "full" }: FooterProps) {
  void variant;

  return (
    <footer id="contact" className="relative z-30 bg-brand-white text-brand-text">
      {/* All footer content sits above the landscape illustration */}
      <div className="border-t border-brand-border/60 bg-brand-white">
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-32 md:px-10 md:pb-16 md:pt-40 lg:px-12 lg:pt-44">
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-8 lg:gap-10">
            {/* Left — logo & tagline */}
            <div className="flex flex-col items-center md:col-span-3 md:items-start">
              <BrandLogo size="md" href="/" className="h-28 w-auto max-w-[190px]" />
              <p className="mt-4 max-w-[190px] text-center font-sans text-[11px] leading-[1.6] tracking-[0.04em] text-brand-muted md:text-left">
                Har Ghar Shudhi — Rooted in Nature, Driven by Purpose
              </p>
            </div>

            {/* Center — headline, newsletter, nav, social */}
            <div className="md:col-span-6">
              <div className="mx-auto max-w-lg text-center">
                <h2 className="font-sans text-base font-semibold uppercase tracking-[0.14em] text-brand-green-dark md:text-lg">
                  Pure Wellness, Thoughtfully Made
                </h2>
                <p className="mt-4 font-sans text-sm leading-relaxed text-brand-muted">
                  Subscribe for special offers, newsletters, and become part of our
                  movement toward Ayurvedic living in every home.
                </p>

                <form
                  className="mt-6 flex items-stretch border border-brand-border bg-brand-white"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    placeholder="Your e-mail"
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 font-sans text-sm text-brand-text placeholder:text-brand-muted/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="flex shrink-0 items-center justify-center border-l border-brand-border px-4 text-brand-green transition-colors hover:bg-brand-green-light hover:text-brand-green-dark"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </form>

                <nav
                  className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 sm:gap-x-3"
                  aria-label="Footer navigation"
                >
                  <FooterDropdown
                    label="Quick Links"
                    links={SHOP_LINKS.slice(0, 6)}
                  />
                  <span
                    className="hidden text-brand-border/80 sm:inline"
                    aria-hidden
                  >
                    |
                  </span>
                  <FooterDropdown label="Policies" links={POLICY_LINKS} />
                  <span
                    className="hidden text-brand-border/80 sm:inline"
                    aria-hidden
                  >
                    |
                  </span>
                  <FooterDropdown label="Connect" links={CONNECT_LINKS} />
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

          {/* Copyright — still above illustration */}
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-brand-border/70 pt-6 sm:flex-row">
            <p className="text-center font-sans text-[10px] uppercase tracking-[0.2em] text-brand-muted sm:text-left">
              © {new Date().getFullYear()} Har Ghar Shudhi. All rights reserved.
            </p>
            <p className="text-center font-serif text-sm italic text-brand-green/80 sm:text-right">
              शुद्धि — Purity in every home.
            </p>
          </div>
        </div>
      </div>

      <FooterIllustration />
    </footer>
  );
}

function FooterDropdown({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string }[];
}) {
  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-1 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-brand-green-dark transition-colors hover:text-brand-green [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown
          className="h-3.5 w-3.5 transition-transform duration-200 group-open:rotate-180"
          strokeWidth={2}
        />
      </summary>
      <ul className="absolute left-1/2 top-full z-40 mt-3 min-w-[200px] -translate-x-1/2 border border-brand-border bg-brand-white py-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block px-5 py-2.5 text-left font-sans text-sm text-brand-muted transition-colors hover:bg-brand-green-light/50 hover:text-brand-green"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
