/** Fired once the first pinned hero ScrollTrigger is wired (homepage honey film). */
export const HOME_HERO_SCROLL_READY_EVENT = "home-hero-scroll-ready";

declare global {
  interface Window {
    __heroWarmPromises?: {
      honey?: Promise<boolean>;
      moringa?: Promise<boolean>;
    };
    __homeHeroScrollReady?: boolean;
  }
}

export function markHomeHeroScrollReady() {
  if (typeof window === "undefined" || window.__homeHeroScrollReady) return;
  window.__homeHeroScrollReady = true;
  window.dispatchEvent(new Event(HOME_HERO_SCROLL_READY_EVENT));
}

export function isHomeHeroScrollReady() {
  return typeof window !== "undefined" && window.__homeHeroScrollReady === true;
}

export function onHomeHeroScrollReady(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;

  if (window.__homeHeroScrollReady) {
    callback();
    return () => undefined;
  }

  const handler = () => callback();
  window.addEventListener(HOME_HERO_SCROLL_READY_EVENT, handler, { once: true });
  return () => window.removeEventListener(HOME_HERO_SCROLL_READY_EVENT, handler);
}
