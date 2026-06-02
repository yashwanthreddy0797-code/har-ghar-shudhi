declare global {
  interface Window {
    __lenisInitialized?: boolean;
  }
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
