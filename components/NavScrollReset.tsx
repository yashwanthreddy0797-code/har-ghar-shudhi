"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function scrollToHashFromLocation() {
  const hash = window.location.hash;
  if (hash.length <= 1) return;

  const id = decodeURIComponent(hash.slice(1));
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Snap to top instantly after client navigations (nav uses scroll={false}). */
export default function NavScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const isProductRoute = pathname.startsWith("/products/");
    const hasHash = !isProductRoute && window.location.hash.length > 1;

    const resetToTop = () => {
      window.scrollTo(0, 0);
      window.__lenis?.scrollTo(0, { immediate: true });

      void import("@/lib/gsap/client")
        .then(({ getGsap }) => {
          const { ScrollTrigger } = getGsap();
          ScrollTrigger.clearScrollMemory?.();
          ScrollTrigger.update();
        })
        .catch(() => {
          /* GSAP may not be loaded on lightweight routes */
        });
    };

    if (!hasHash) {
      resetToTop();
    }

    document.documentElement.classList.add("scroll-ready");
    window.__scrollBootstrapDone = true;

    if (isProductRoute) {
      requestAnimationFrame(() => {
        requestAnimationFrame(resetToTop);
      });
      window.setTimeout(resetToTop, 120);
      window.setTimeout(resetToTop, 360);
      window.setTimeout(resetToTop, 900);
      return;
    }

    if (hasHash) {
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToHashFromLocation);
      });
      window.setTimeout(scrollToHashFromLocation, 150);
      window.setTimeout(scrollToHashFromLocation, 400);
    }
  }, [pathname]);

  return null;
}
