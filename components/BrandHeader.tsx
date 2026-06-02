"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import {
  SHOP_LINKS,
  CONCERN_LINKS,
  PHILOSOPHY_LINKS,
  CUSTOMER_LINKS,
} from "@/lib/navigation";
import { useCart } from "@/components/cart/CartProvider";
import SearchBar from "@/components/shop/SearchBar";
import { onLenisInit } from "@/lib/scroll/lenisReady";

const NAV_LINKS = [
  { href: "/philosophy", label: "Philosophy" },
  { href: "/shop", label: "Shop" },
  { href: "/shop/concern/immunity", label: "Wellness" },
  { href: "/contact", label: "Contact" },
];

function getScrollY() {
  if (typeof window === "undefined") return 0;
  return window.__lenis?.scroll ?? window.scrollY;
}

export default function BrandHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart, openCart } = useCart();

  useEffect(() => {
    const update = () => setScrolled(getScrollY() > 24);

    update();
    window.addEventListener("scroll", update, { passive: true });

    const attachLenis = () => {
      window.__lenis?.on("scroll", update);
      update();
    };

    const detachLenis = onLenisInit(attachLenis);

    return () => {
      window.removeEventListener("scroll", update);
      detachLenis();
    };
  }, []);

  const showGlass = !isHome || scrolled;
  const cartCount = cart?.totalQuantity ?? 0;

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 overflow-visible border-b",
          "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out",
          showGlass
            ? "nav-glass-hero bg-black/50 backdrop-blur-md backdrop-saturate-150"
            : "border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 md:h-[4.5rem] md:gap-4 md:px-12">
          <div className="relative flex h-full min-w-[200px] shrink-0 items-center md:min-w-[220px]">
            <BrandLogo
              size="md"
              priority
              className="absolute left-0 top-1/2 -translate-y-1/2 brightness-0 invert"
            />
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-xs font-medium uppercase tracking-wider text-white/75 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <SearchBar className="hidden md:block [&_input]:border-white/20 [&_input]:bg-white/10 [&_input]:text-white [&_input]:placeholder:text-white/40" />
            <button
              type="button"
              aria-label="Open cart"
              onClick={openCart}
              className="relative text-white/75 transition-colors hover:text-white"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-green text-[9px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="Menu"
              className="text-white/75 transition-colors hover:text-white lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col border-l border-brand-border bg-brand-white">
            <div className="flex items-center justify-between border-b border-brand-border px-6 py-4">
              <span className="font-sans text-xs font-medium uppercase tracking-wider text-brand-green">
                Menu
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="text-brand-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="border-b border-brand-border px-6 py-4">
              <SearchBar />
            </div>
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <MobileSection title="Shop" links={SHOP_LINKS} onNavigate={() => setMobileOpen(false)} />
              <MobileSection title="Shop by Concern" links={CONCERN_LINKS} onNavigate={() => setMobileOpen(false)} />
              <MobileSection title="Philosophy" links={PHILOSOPHY_LINKS} onNavigate={() => setMobileOpen(false)} />
              <MobileSection title="Customer" links={CUSTOMER_LINKS} onNavigate={() => setMobileOpen(false)} />
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function MobileSection({
  title,
  links,
  onNavigate,
}: {
  title: string;
  links: { href: string; label: string }[];
  onNavigate: () => void;
}) {
  return (
    <div className="mb-8">
      <p className="mb-3 font-sans text-[10px] font-medium uppercase tracking-wider text-brand-green">
        {title}
      </p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              className="font-sans text-sm text-brand-text transition-colors hover:text-brand-green"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
