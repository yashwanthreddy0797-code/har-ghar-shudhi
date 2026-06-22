"use client";

import { useLayoutEffect } from "react";
import { getGsap } from "@/lib/gsap/client";

declare global {
  interface Window {
    __scrollBootstrapDone?: boolean;
    __siteIntroComplete?: boolean;
  }
}

const INTRO_COMPLETE_EVENT = "site-intro-complete";

function isHomeRoute() {
  return typeof window !== "undefined" && window.location.pathname === "/";
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

    const html = document.documentElement;
    html.classList.remove("scroll-ready");

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);

    const releaseAfterBootstrap = () => {
      // Two frames after Lenis so ScrollTrigger pins settle before reveal.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          releaseScrollLock();
        });
      });
    };

    const onLenisInit = () => {
      if (isHomeRoute() && !window.__siteIntroComplete) {
        window.addEventListener(INTRO_COMPLETE_EVENT, releaseAfterBootstrap, {
          once: true,
        });
        window.setTimeout(releaseAfterBootstrap, 5000);
        return;
      }
      releaseAfterBootstrap();
    };

    const onIntroComplete = () => {
      releaseAfterBootstrap();
    };

    window.addEventListener("lenis-init", onLenisInit, { once: true });

    let introListener: (() => void) | undefined;
    let shopFallback: number | undefined;
    let hardFallback: number;

    if (isHomeRoute()) {
      introListener = onIntroComplete;
      window.addEventListener(INTRO_COMPLETE_EVENT, introListener, { once: true });
      hardFallback = window.setTimeout(releaseScrollLock, 5000);
    } else {
      // Pages without SmoothScroll — release on the next frame.
      shopFallback = window.setTimeout(releaseScrollLock, 0);
      hardFallback = window.setTimeout(releaseScrollLock, 800);
    }

    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      window.__scrollBootstrapDone = false;
      html.classList.remove("scroll-ready");
      window.scrollTo(0, 0);
      window.setTimeout(releaseScrollLock, 150);
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      if (shopFallback !== undefined) window.clearTimeout(shopFallback);
      window.clearTimeout(hardFallback);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("lenis-init", onLenisInit);
      if (introListener) {
        window.removeEventListener(INTRO_COMPLETE_EVENT, introListener);
      }
    };
  }, []);

  return null;
}
