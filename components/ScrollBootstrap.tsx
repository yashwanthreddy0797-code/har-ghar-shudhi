"use client";

import { useLayoutEffect } from "react";
import { getGsap } from "@/lib/gsap/client";
import { onHomeHeroScrollReady } from "@/lib/scroll/heroMediaGate";

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
    let introDone = !isHomeRoute() || window.__siteIntroComplete === true;
    let heroReady = false;
    let releaseQueued = false;

    const tryRelease = () => {
      if (releaseQueued) return;
      if (!lenisReady) return;
      if (isHomeRoute() && (!introDone || !heroReady)) return;
      releaseQueued = true;
      releaseAfterBootstrap();
    };

    const onLenisInit = () => {
      lenisReady = true;
      tryRelease();
    };

    const onIntroComplete = () => {
      introDone = true;
      tryRelease();
    };

    const onHeroReady = () => {
      heroReady = true;
      tryRelease();
    };

    window.addEventListener("lenis-init", onLenisInit, { once: true });

    let introListener: (() => void) | undefined;
    let removeHeroListener: (() => void) | undefined;
    let shopFallback: number | undefined;
    let hardFallback: number;

    if (isHomeRoute()) {
      if (!introDone) {
        introListener = onIntroComplete;
        window.addEventListener(INTRO_COMPLETE_EVENT, introListener, { once: true });
      }
      removeHeroListener = onHomeHeroScrollReady(onHeroReady);
      hardFallback = window.setTimeout(releaseAfterBootstrap, 8000);
    } else {
      shopFallback = window.setTimeout(releaseAfterBootstrap, 0);
      hardFallback = window.setTimeout(releaseAfterBootstrap, 800);
    }

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
      if (shopFallback !== undefined) window.clearTimeout(shopFallback);
      window.clearTimeout(hardFallback);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("lenis-init", onLenisInit);
      if (introListener) {
        window.removeEventListener(INTRO_COMPLETE_EVENT, introListener);
      }
      removeHeroListener?.();
    };
  }, []);

  return null;
}
