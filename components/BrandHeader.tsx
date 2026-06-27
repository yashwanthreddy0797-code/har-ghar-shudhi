"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import {
  HOME_ROUTE,
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
  const isHome = pathname === HOME_ROUTE;
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

  const handleLogoNavigate = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      onNavigate();
      prepareInstantNavigation();

      if (pathname === HOME_ROUTE) {
        return;
      }

      navigateToRoute(router, HOME_ROUTE);
    },
    [onNavigate, pathname, router],
  );

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

  const isNavActive = (href: string) => {
    if (href === HOME_ROUTE) return pathname === HOME_ROUTE;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

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
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 md:h-[4.5rem] md:px-12 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <div className="flex h-full min-w-0 items-center lg:justify-self-start">
            <Link
              href={HOME_ROUTE}
              prefetch
              scroll={false}
              onPointerDown={onNavigate}
              onClick={handleLogoNavigate}
              aria-label="Har Ghar Shudhi home"
              className="flex h-full items-center"
            >
              <BrandLogo
                size="nav"
                priority
                href={null}
                variant="white"
                className="brightness-0 invert"
              />
            </Link>
          </div>

          <nav
            aria-label="Main navigation"
            className="hidden items-center justify-center gap-5 justify-self-center xl:gap-7 lg:flex"
          >
            {NAV_LINKS.map((item) => {
              const active = isNavActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch
                  scroll={false}
                  onPointerDown={onNavigate}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "relative whitespace-nowrap pb-1 font-sans text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-150",
                    active
                      ? "text-white after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white"
                      : "text-white/75 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 md:gap-4 lg:justify-self-end">
            <Link
              href="/search"
              prefetch
              scroll={false}
              onPointerDown={onNavigate}
              onClick={onNavigate}
              aria-label="Search"
              className="hidden text-white/75 transition-colors duration-150 hover:text-white md:inline-flex"
            >
              <Search className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <SearchBar
              className="brand-header-search hidden lg:block [&_input]:border-white/20 [&_input]:bg-white/10 [&_input]:text-white [&_input]:placeholder:text-white/40"
              onNavigate={onNavigate}
            />
            <Link
              href="/track-order"
              prefetch
              scroll={false}
              onPointerDown={onNavigate}
              onClick={onNavigate}
              aria-label="Account"
              className="hidden text-white/75 transition-colors duration-150 hover:text-white sm:inline-flex"
            >
              <User className="h-4 w-4" strokeWidth={1.5} />
            </Link>
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
