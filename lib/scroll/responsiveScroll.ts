"use client";

import { useEffect, useState } from "react";

export const MOBILE_MAX_WIDTH = 767;

/** Scale desktop scroll runway down on narrow viewports to reduce scroll fatigue. */
export function scrollHeightForViewport(
  desktopVh: number,
  width = typeof window !== "undefined" ? window.innerWidth : 1024
): number {
  if (width > MOBILE_MAX_WIDTH) return desktopVh;
  if (desktopVh >= 300) return Math.round(desktopVh * 0.62);
  if (desktopVh >= 200) return Math.round(desktopVh * 0.72);
  return Math.round(desktopVh * 0.7);
}

/** Fullscreen cinematic films — shorter pin runway on touch for smoother handoff. */
export function cinematicScrollHeightForViewport(
  desktopVh: number,
  width = typeof window !== "undefined" ? window.innerWidth : 1024
): number {
  if (width > MOBILE_MAX_WIDTH) return desktopVh;
  if (desktopVh >= 200) return Math.round(desktopVh * 0.52);
  return Math.round(desktopVh * 0.58);
}

/** Shilajit hero zoom — enough runway for jar + props reveal on touch. */
export function shilajitHeroScrollHeightForViewport(
  desktopVh: number,
  width = typeof window !== "undefined" ? window.innerWidth : 1024
): number {
  if (width > MOBILE_MAX_WIDTH) return desktopVh;
  if (desktopVh >= 300) return Math.round(desktopVh * 0.58);
  return Math.round(desktopVh * 0.62);
}

export function scrollStepForViewport(
  desktopVhPerStep: number,
  width = typeof window !== "undefined" ? window.innerWidth : 1024
): number {
  if (width > MOBILE_MAX_WIDTH) return desktopVhPerStep;
  return Math.round(desktopVhPerStep * 0.68);
}

export function useResponsiveScrollHeight(
  desktopVh: number,
  scaler: (
    desktopVh: number,
    width?: number
  ) => number = scrollHeightForViewport
): number {
  const [vh, setVh] = useState(desktopVh);

  useEffect(() => {
    const update = () => setVh(scaler(desktopVh));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, [desktopVh, scaler]);

  return vh;
}

export function useIsMobileViewport(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

/** Native touch scrolling is smoother than Lenis on phones — use for scroll-linked sections. */
export function preferNativeScroll(
  width = typeof window !== "undefined" ? window.innerWidth : 1024
): boolean {
  if (width <= MOBILE_MAX_WIDTH) return true;
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches &&
    navigator.maxTouchPoints > 0
  );
}

export function scrollProgressSmoothingForViewport(
  width = typeof window !== "undefined" ? window.innerWidth : 1024
) {
  if (width <= MOBILE_MAX_WIDTH) {
    return { visualSmoothness: 0.48, mediaSmoothness: 1.25 };
  }
  return { visualSmoothness: 0.14, mediaSmoothness: 0.22 };
}

/** Product scroll films — match cinematic touch responsiveness on phones. */
export function productVideoScrollProgressSmoothingForViewport(
  width = typeof window !== "undefined" ? window.innerWidth : 1024
) {
  if (width <= MOBILE_MAX_WIDTH) {
    return { visualSmoothness: 0.5, mediaSmoothness: 1.3 };
  }
  return scrollProgressSmoothingForViewport(width);
}

/** Cinematic fullscreen films — video tracks the finger more tightly on touch. */
export function cinematicScrollProgressSmoothingForViewport(
  width = typeof window !== "undefined" ? window.innerWidth : 1024
) {
  if (width <= MOBILE_MAX_WIDTH) {
    return { visualSmoothness: 0.58, mediaSmoothness: 1.4 };
  }
  return scrollProgressSmoothingForViewport(width);
}

export function exploreScrubForViewport(
  width = typeof window !== "undefined" ? window.innerWidth : 1024
) {
  return width <= MOBILE_MAX_WIDTH ? 0.55 : 1.35;
}
