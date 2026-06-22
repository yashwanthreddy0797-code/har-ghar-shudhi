"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Snap to top instantly after client navigations (nav uses scroll={false}). */
export default function NavScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.add("scroll-ready");
    window.__scrollBootstrapDone = true;
  }, [pathname]);

  return null;
}
