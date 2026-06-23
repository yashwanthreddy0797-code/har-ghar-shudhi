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
    const hasHash = window.location.hash.length > 1;

    if (!hasHash) {
      window.scrollTo(0, 0);
    }

    document.documentElement.classList.add("scroll-ready");
    window.__scrollBootstrapDone = true;

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
