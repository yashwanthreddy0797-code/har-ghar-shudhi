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
      let topLockActive = true;
      const timers: number[] = [];
      const resetWhileLocked = () => {
        if (!topLockActive) return;
        resetToTop();
      };
      const topLockInterval = window.setInterval(resetWhileLocked, 250);
      const cancelTopLock = () => {
        topLockActive = false;
        window.clearInterval(topLockInterval);
        for (const timer of timers) window.clearTimeout(timer);
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(resetWhileLocked);
      });
      timers.push(
        window.setTimeout(resetWhileLocked, 120),
        window.setTimeout(resetWhileLocked, 360),
        window.setTimeout(resetWhileLocked, 900),
        window.setTimeout(resetWhileLocked, 1600),
        window.setTimeout(resetWhileLocked, 2600),
        window.setTimeout(cancelTopLock, 4200)
      );
      window.addEventListener("wheel", cancelTopLock, { once: true, passive: true });
      window.addEventListener("touchmove", cancelTopLock, { once: true, passive: true });
      window.addEventListener("keydown", cancelTopLock, { once: true });

      return () => {
        cancelTopLock();
        window.removeEventListener("wheel", cancelTopLock);
        window.removeEventListener("touchmove", cancelTopLock);
        window.removeEventListener("keydown", cancelTopLock);
      };
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
