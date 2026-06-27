"use client";

import { useLayoutEffect } from "react";
import { getGsap } from "@/lib/gsap/client";

declare global {
  interface Window {
    __scrollBootstrapDone?: boolean;
  }
}

function releaseScrollLock() {
  if (window.__scrollBootstrapDone) return;
  window.__scrollBootstrapDone = true;

  const html = document.documentElement;
  html.classList.add("scroll-ready");

  try {
    getGsap().ScrollTrigger.refresh();
  } catch {
    /* GSAP not loaded yet on non-home routes */
  }
}

/**
 * Ensures every load starts at scroll 0 and scroll-driven sections stay hidden
 * until Lenis + ScrollTrigger are wired — prevents the hero/pinned flash on refresh.
 */
export default function ScrollBootstrap() {
  useLayoutEffect(() => {
    window.__scrollBootstrapDone = false;
    delete window.__homeHeroScrollReady;

    const html = document.documentElement;
    html.classList.remove("scroll-ready");

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    const releaseAfterBootstrap = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          releaseScrollLock();
        });
      });
    };

    let lenisReady = false;
    let releaseQueued = false;

    const tryRelease = () => {
      if (releaseQueued) return;
      if (!lenisReady) return;
      releaseQueued = true;
      releaseAfterBootstrap();
    };

    const onLenisInit = () => {
      lenisReady = true;
      tryRelease();
    };

    window.addEventListener("lenis-init", onLenisInit, { once: true });

    const shopFallback = window.setTimeout(releaseAfterBootstrap, 0);
    const hardFallback = window.setTimeout(releaseAfterBootstrap, 800);

    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      window.__scrollBootstrapDone = false;
      releaseQueued = false;
      html.classList.remove("scroll-ready");
      window.scrollTo(0, 0);
      window.setTimeout(releaseScrollLock, 150);
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      window.clearTimeout(shopFallback);
      window.clearTimeout(hardFallback);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("lenis-init", onLenisInit);
    };
  }, []);

  return null;
}
