declare global {
  interface Window {
    __lenisInitialized?: boolean;
  }
}

/** True once ScrollBootstrap has confirmed scroll position and released the lock. */
export function isScrollExperienceReady() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("scroll-ready")
  );
}

/** Wait until SmoothScroll has finished Lenis + ScrollTrigger proxy setup. */
export function onLenisInit(callback: () => void) {
  if (typeof window === "undefined") return () => undefined;

  if (window.__lenisInitialized) {
    callback();
    return () => undefined;
  }

  const handler = () => callback();
  window.addEventListener("lenis-init", handler, { once: true });
  return () => window.removeEventListener("lenis-init", handler);
}
