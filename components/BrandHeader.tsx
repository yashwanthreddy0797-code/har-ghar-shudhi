"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import {
  PRIMARY_NAV_LINKS,
  SHOP_LINKS,
  CONCERN_LINKS,
  ABOUT_LINKS,
  PHILOSOPHY_LINKS,
  CUSTOMER_LINKS,
} from "@/lib/navigation";
import {
  prefetchPrimaryNav,
  prepareInstantNavigation,
  navigateToRoute,
} from "@/lib/navigation/instantNav";
import { useCart } from "@/components/cart/CartProvider";
import SearchBar from "@/components/shop/SearchBar";
import { onLenisInit } from "@/lib/scroll/lenisReady";

const NAV_LINKS = PRIMARY_NAV_LINKS;

function getScrollY() {
  if (typeof window === "undefined") return 0;
  return window.__lenis?.scroll ?? window.scrollY;
}

export default function BrandHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { cart, openCart } = useCart();

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const onNavigate = useCallback(() => {
    prepareInstantNavigation();
    setMobileOpen(false);
  }, []);

  const handleMobileNavigate = useCallback(
    (href: string) => {
      setMobileOpen(false);
      navigateToRoute(router, href);
    },
    [router],
  );

  const handleOpenCart = useCallback(() => {
    openCart();
  }, [openCart]);

  const handleOpenMenu = useCallback(() => {
    setMobileOpen(true);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    prefetchPrimaryNav(router);
  }, [router]);

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

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, closeMobileMenu]);

  const showGlass = !isHome || scrolled;
  const cartCount = cart?.totalQuantity ?? 0;

  const mobileMenu =
    mobileOpen && mounted
      ? createPortal(
          <div className="brand-mobile-menu fixed inset-0 z-[9999] lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            />
            <div className="brand-mobile-menu__panel absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col border-l border-brand-border bg-brand-white pt-[env(safe-area-inset-top,0px)]">
              <div className="flex items-center justify-between border-b border-brand-border px-6 py-4">
                <span className="font-sans text-xs font-medium uppercase tracking-wider text-brand-green">
                  Menu
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeMobileMenu}
                  className="text-brand-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="border-b border-brand-border px-6 py-4">
                <SearchBar onNavigate={onNavigate} />
              </div>
              <nav className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
                <div className="mb-8 border-b border-brand-border pb-6">
                  <p className="mb-3 font-sans text-[10px] font-medium uppercase tracking-wider text-brand-green">
                    Navigate
                  </p>
                  <ul className="space-y-3">
                    {NAV_LINKS.map((link) => (
                      <li key={link.href}>
                        <MobileNavLink
                          href={link.href}
                          label={link.label}
                          onNavigate={handleMobileNavigate}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <MobileSection
                  title="About"
                  links={ABOUT_LINKS}
                  onNavigate={handleMobileNavigate}
                />
                <MobileSection
                  title="Shop"
                  links={SHOP_LINKS}
                  onNavigate={handleMobileNavigate}
                />
                <MobileSection
                  title="Shop by Concern"
                  links={CONCERN_LINKS}
                  onNavigate={handleMobileNavigate}
                />
                <MobileSection
                  title="Philosophy"
                  links={PHILOSOPHY_LINKS}
                  onNavigate={handleMobileNavigate}
                />
                <MobileSection
                  title="Customer"
                  links={CUSTOMER_LINKS}
                  onNavigate={handleMobileNavigate}
                />
              </nav>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <header
        className={[
          "pointer-events-auto fixed inset-x-0 top-0 z-[200] overflow-hidden border-b",
          "pt-[env(safe-area-inset-top,0px)]",
          "transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200 ease-out",
          showGlass
            ? "nav-glass-hero bg-black/50 backdrop-blur-md backdrop-saturate-150"
            : "border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 md:h-[4.5rem] md:px-12 lg:grid lg:grid-cols-3 lg:gap-4">
          <div className="flex h-full min-w-0 items-center lg:justify-self-start">
            <Link
              href="/"
              prefetch
              scroll={false}
              onPointerDown={onNavigate}
              onClick={onNavigate}
              aria-label="Har Ghar Shudhi home"
              className="flex h-full items-center"
            >
              <BrandLogo
                size="nav"
                priority
                href={null}
                className="brightness-0 invert"
              />
            </Link>
          </div>

          <nav
            aria-label="Main navigation"
            className="hidden items-center justify-center gap-7 justify-self-center lg:flex"
          >
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                scroll={false}
                onPointerDown={onNavigate}
                onClick={onNavigate}
                className="whitespace-nowrap font-sans text-xs font-medium uppercase tracking-wider text-white/75 transition-colors duration-150 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4 lg:justify-self-end">
            <SearchBar
              className="brand-header-search hidden md:block [&_input]:border-white/20 [&_input]:bg-white/10 [&_input]:text-white [&_input]:placeholder:text-white/40"
              onNavigate={onNavigate}
            />
            <button
              type="button"
              aria-label="Open cart"
              onClick={handleOpenCart}
              className="relative text-white/75 transition-colors duration-150 hover:text-white"
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
              className="text-white/75 transition-colors duration-150 hover:text-white lg:hidden"
              onClick={handleOpenMenu}
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}

function MobileNavLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate: (href: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onNavigate(href)}
      className="brand-mobile-menu__link w-full text-left font-sans text-sm font-medium text-brand-text transition-colors duration-150 hover:text-brand-green"
    >
      {label}
    </button>
  );
}

function MobileSection({
  title,
  links,
  onNavigate,
}: {
  title: string;
  links: { href: string; label: string }[];
  onNavigate: (href: string) => void;
}) {
  return (
    <div className="mb-8">
      <p className="mb-3 font-sans text-[10px] font-medium uppercase tracking-wider text-brand-green">
        {title}
      </p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={`${title}-${link.href}`}>
            <MobileNavLink
              href={link.href}
              label={link.label}
              onNavigate={onNavigate}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
