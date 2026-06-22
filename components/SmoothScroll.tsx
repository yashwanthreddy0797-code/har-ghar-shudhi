"use client";

import { useLayoutEffect } from "react";
import { getGsap } from "@/lib/gsap/client";
import { preferNativeScroll } from "@/lib/scroll/responsiveScroll";

declare global {
  interface Window {
    __lenis?: {
      destroy: () => void;
      raf: (time: number) => void;
      scroll: number;
      scrollTo: (value: number, opts?: { immediate?: boolean }) => void;
      on: (event: string, cb: () => void) => void;
      resize: () => void;
    };
    __lenisInitialized?: boolean;
    __nativeScroll?: boolean;
    __siteIntroComplete?: boolean;
  }
}

const INTRO_COMPLETE_EVENT = "site-intro-complete";

function refreshScrollTriggers(
  ScrollTrigger: ReturnType<typeof getGsap>["ScrollTrigger"]
) {
  if (window.location.pathname === "/" && !window.__siteIntroComplete) {
    window.addEventListener(
      INTRO_COMPLETE_EVENT,
      () => ScrollTrigger.refresh(),
      { once: true }
    );
    return;
  }

  ScrollTrigger.refresh();
}

function bootNativeScroll(ScrollTrigger: ReturnType<typeof getGsap>["ScrollTrigger"]) {
  window.__nativeScroll = true;
  window.__lenisInitialized = true;

  ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

  if (ScrollTrigger.isTouch) {
    ScrollTrigger.normalizeScroll({
      allowNestedScroll: true,
      lockAxis: false,
      type: "touch,pointer",
    });
  }

  refreshScrollTriggers(ScrollTrigger);
  window.dispatchEvent(new Event("lenis-init"));
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    let lenis: Window["__lenis"];
    let raf: ((time: number) => void) | undefined;
    let onLoad: (() => void) | undefined;
    let onLenisRefresh: (() => void) | undefined;
    let cancelled = false;

    async function init() {
      const { gsap, ScrollTrigger } = getGsap();
      if (cancelled) return;

  if (preferNativeScroll()) {
    document.documentElement.classList.add("native-scroll");
    bootNativeScroll(ScrollTrigger);
        return;
      }

      ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

      const Lenis = (await import("@studio-freight/lenis")).default;
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.85,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.78,
        touchMultiplier: 1,
        infinite: false,
      });

      window.__lenis = lenis;
      window.__nativeScroll = false;
      lenis.scrollTo(0, { immediate: true });
      document.documentElement.classList.add("lenis", "lenis-smooth");
      lenis.on("scroll", ScrollTrigger.update);

      const scroller = document.documentElement;

      ScrollTrigger.scrollerProxy(scroller, {
        scrollTop(value) {
          if (arguments.length && typeof value === "number") {
            lenis!.scrollTo(value, { immediate: true });
          }
          return lenis!.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: "fixed",
      });

      onLenisRefresh = () => lenis!.resize();
      ScrollTrigger.addEventListener("refresh", onLenisRefresh);

      raf = (time: number) => {
        lenis!.raf(time * 1000);
      };

      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      onLoad = () => refreshScrollTriggers(ScrollTrigger);
      window.addEventListener("load", onLoad);

      window.__lenisInitialized = true;
      refreshScrollTriggers(ScrollTrigger);
      window.dispatchEvent(new Event("lenis-init"));
    }

    init();

    return () => {
      cancelled = true;
      const { gsap, ScrollTrigger } = getGsap();

      if (onLoad) window.removeEventListener("load", onLoad);
      if (onLenisRefresh) {
        ScrollTrigger.removeEventListener("refresh", onLenisRefresh);
      }
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.normalizeScroll(false);

      if (raf) gsap.ticker.remove(raf);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      document.documentElement.classList.remove("native-scroll");
      lenis?.destroy();
      delete window.__lenis;
      delete window.__lenisInitialized;
      delete window.__nativeScroll;
    };
  }, []);

  return <>{children}</>;
}
