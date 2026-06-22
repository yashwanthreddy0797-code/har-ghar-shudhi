"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { getGsap } from "@/lib/gsap/client";
import { BRAND_LOGO_SRC } from "@/components/BrandLogo";
import { INTRO_NAV_EVENT } from "@/lib/navigation/instantNav";

const HERO_POSTER_SRC = "/hero/moringa/sequence/frame-001.webp";
const MIN_DISPLAY_MS = 1200;
const MAX_INTRO_MS = 3800;
const INTRO_COMPLETE_EVENT = "site-intro-complete";

declare global {
  interface Window {
    __siteIntroComplete?: boolean;
  }
}

function dispatchIntroComplete() {
  if (window.__siteIntroComplete) return;
  window.__siteIntroComplete = true;
  document.documentElement.classList.remove("site-intro-active", "site-intro-revealing");
  window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT));
}

function preloadImage(src: string, timeoutMs = 2000) {
  return Promise.race([
    new Promise<void>((resolve) => {
      const img = new window.Image();
      const done = () => resolve();
      img.onload = done;
      img.onerror = done;
      img.src = src;
    }),
    new Promise<void>((resolve) => window.setTimeout(resolve, timeoutMs)),
  ]);
}

export default function SiteIntroReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    window.__siteIntroComplete = false;
    document.documentElement.classList.add("site-intro-active");

    let aborted = false;
    let splitTimer: number | undefined;
    let hardCapTimer: number | undefined;
    let statusPulse: gsap.core.Tween | undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { gsap } = getGsap();

    const finishIntroImmediately = () => {
      if (aborted || window.__siteIntroComplete) return;

      statusPulse?.kill();
      if (splitTimer !== undefined) window.clearTimeout(splitTimer);
      if (hardCapTimer !== undefined) window.clearTimeout(hardCapTimer);

      gsap.killTweensOf([
        leftPanelRef.current,
        rightPanelRef.current,
        brandRef.current,
        statusRef.current,
        rootRef.current,
      ]);
      gsap.set(rootRef.current, { autoAlpha: 0 });
      setVisible(false);
      dispatchIntroComplete();
    };

    const ctx = gsap.context(() => {
      const leftPanel = leftPanelRef.current;
      const rightPanel = rightPanelRef.current;
      const brand = brandRef.current;
      const status = statusRef.current;

      if (!leftPanel || !rightPanel || !brand || !status) {
        finishIntroImmediately();
        return;
      }

      gsap.set([leftPanel, rightPanel], { xPercent: 0, force3D: true });
      gsap.set(brand, { autoAlpha: 0, y: 18, scale: 0.96 });
      gsap.set(status, { autoAlpha: 0, y: 10 });

      const onIntroNavigate = () => finishIntroImmediately();
      window.addEventListener(INTRO_NAV_EVENT, onIntroNavigate);

      hardCapTimer = window.setTimeout(finishIntroImmediately, MAX_INTRO_MS);

      if (reducedMotion) {
        gsap.to(rootRef.current, {
          autoAlpha: 0,
          duration: 0.35,
          delay: 0.35,
          onComplete: finishIntroImmediately,
        });

        return () => {
          window.removeEventListener(INTRO_NAV_EVENT, onIntroNavigate);
        };
      }

      let splitStarted = false;

      statusPulse = gsap.to(status, {
        autoAlpha: 0.55,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.9,
      });

      gsap
        .timeline({ delay: 0.1 })
        .to(brand, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
        })
        .to(
          status,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.5"
        );

      const runSplit = () => {
        if (aborted || splitStarted || window.__siteIntroComplete) return;
        splitStarted = true;
        statusPulse?.kill();
        document.documentElement.classList.add("site-intro-revealing");

        gsap
          .timeline({
            onComplete: finishIntroImmediately,
          })
          .to([brand, status], {
            autoAlpha: 0,
            y: -10,
            duration: 0.3,
            ease: "power2.in",
          })
          .to(
            leftPanel,
            {
              xPercent: -100,
              duration: 1.05,
              ease: "power3.inOut",
              force3D: true,
            },
            "+=0.02"
          )
          .to(
            rightPanel,
            {
              xPercent: 100,
              duration: 1.05,
              ease: "power3.inOut",
              force3D: true,
            },
            "<"
          )
          .to(
            rootRef.current,
            {
              autoAlpha: 0,
              duration: 0.2,
              ease: "power1.out",
            },
            "-=0.1"
          );
      };

      splitTimer = window.setTimeout(runSplit, MIN_DISPLAY_MS);

      void Promise.all([
        preloadImage(BRAND_LOGO_SRC),
        preloadImage(HERO_POSTER_SRC),
      ]).then(() => {
        if (aborted || splitStarted) return;
        document.documentElement.classList.add("site-intro-revealing");
      });

      return () => {
        window.removeEventListener(INTRO_NAV_EVENT, onIntroNavigate);
      };
    }, rootRef);

    return () => {
      aborted = true;
      statusPulse?.kill();
      if (splitTimer !== undefined) window.clearTimeout(splitTimer);
      if (hardCapTimer !== undefined) window.clearTimeout(hardCapTimer);
      ctx.revert();
      document.documentElement.classList.remove("site-intro-active", "site-intro-revealing");
      if (!window.__siteIntroComplete) {
        dispatchIntroComplete();
      }
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="site-intro gpu-layer fixed inset-0 z-[120] overflow-hidden"
      aria-hidden
    >
      <div className="site-intro-center pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-center px-6">
        <div ref={brandRef} className="site-intro-brand">
          <Image
            src={BRAND_LOGO_SRC}
            alt=""
            width={616}
            height={717}
            priority
            className="h-32 w-auto object-contain sm:h-40 md:h-48 lg:h-56"
          />
        </div>

        <p
          ref={statusRef}
          className="site-intro-status mt-10 font-sans text-[11px] uppercase tracking-[0.34em] text-brand-muted md:mt-12 md:text-xs"
        >
          Loading your experience
        </p>
      </div>

      <div
        ref={leftPanelRef}
        className="site-intro-panel site-intro-panel--left gpu-layer absolute left-0 top-0 z-[2] h-full w-1/2 will-change-transform"
      >
        <div className="site-intro-panel-bg absolute inset-0" />
      </div>

      <div
        ref={rightPanelRef}
        className="site-intro-panel site-intro-panel--right gpu-layer absolute right-0 top-0 z-[2] h-full w-1/2 will-change-transform"
      >
        <div className="site-intro-panel-bg absolute inset-0" />
      </div>
    </div>
  );
}
