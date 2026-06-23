import { getGsap } from "@/lib/gsap/client";

export const INTRO_NAV_EVENT = "site-intro-navigate";
export const INTRO_COMPLETE_EVENT = "site-intro-complete";

/** Clears scroll locks, intro, Lenis, and pinned triggers so route changes feel instant. */
export function prepareInstantNavigation() {
  if (typeof window === "undefined") return;

  const html = document.documentElement;
  html.classList.add("scroll-ready");
  html.classList.remove("site-intro-active", "site-intro-revealing");

  window.__scrollBootstrapDone = true;
  window.__siteIntroComplete = true;

  window.dispatchEvent(new Event(INTRO_NAV_EVENT));
  window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT));

  window.scrollTo(0, 0);

  try {
    const { ScrollTrigger } = getGsap();
    ScrollTrigger.getAll().forEach((st) => st.kill());
    ScrollTrigger.clearScrollMemory?.();
    ScrollTrigger.scrollerProxy(html, {});
    ScrollTrigger.refresh();
  } catch {
    /* GSAP not loaded on lightweight routes */
  }

  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
    lenis.destroy();
    delete window.__lenis;
    window.__lenisInitialized = false;
    html.classList.remove("lenis", "lenis-smooth");
  }
}

export const PRIMARY_NAV_HREFS = [
  "/about",
  "/shop",
  "/science-trust",
  "/contact",
] as const;

export function prefetchPrimaryNav(router: { prefetch: (href: string) => void }) {
  for (const href of PRIMARY_NAV_HREFS) {
    router.prefetch(href);
  }
}

function scrollToHash(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

/** Reliable client navigation for mobile menus and hash deep links. */
export function navigateToRoute(
  router: { push: (href: string) => void },
  href: string,
) {
  prepareInstantNavigation();

  if (/^(https?:|mailto:|tel:)/.test(href)) {
    window.location.assign(href);
    return;
  }

  const hashIndex = href.indexOf("#");
  const hashId =
    hashIndex === -1 ? null : decodeURIComponent(href.slice(hashIndex + 1));

  router.push(href);

  if (!hashId) return;

  const attemptScroll = () => scrollToHash(hashId);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (!attemptScroll()) {
        window.setTimeout(attemptScroll, 120);
        window.setTimeout(attemptScroll, 320);
      }
    });
  });
}
