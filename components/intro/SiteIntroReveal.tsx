"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { getGsap } from "@/lib/gsap/client";
import { BRAND_LOGO_SRC } from "@/components/BrandLogo";
import { INTRO_NAV_EVENT } from "@/lib/navigation/instantNav";
import { BRAND_STORY_VIDEO_SCROLL } from "@/lib/hero/brandStoryVideoScrollConfig";
import { warmVideoToFirstFrame } from "@/lib/scroll/videoReadiness";

const BRAND_STORY_POSTER_SRC = BRAND_STORY_VIDEO_SCROLL.poster;
const BRAND_STORY_VIDEO_SRC = BRAND_STORY_VIDEO_SCROLL.src;
const MIN_DISPLAY_MS = 1400;
const MAX_INTRO_MS = 12000;
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

function preloadImage(src: string, timeoutMs = 2500) {
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

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

async function preloadVideoFile(
  src: string,
  onProgress?: (ratio: number) => void
) {
  if (!("fetch" in window)) return false;

  try {
    const response = await fetch(src, { cache: "force-cache" });
    if (!response.ok) return false;

    const contentLength = Number(response.headers.get("content-length")) || 0;
    if (!response.body) {
      await response.arrayBuffer();
      onProgress?.(1);
      return true;
    }

    const reader = response.body.getReader();
    let received = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (contentLength > 0) {
        onProgress?.(Math.min(0.98, received / contentLength));
      }
    }

    onProgress?.(1);
    return true;
  } catch {
    return false;
  }
}

export default function SiteIntroReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    window.__siteIntroComplete = false;
    document.documentElement.classList.add("site-intro-active");

    let aborted = false;
    let hardCapTimer: number | undefined;
    let statusPulse: gsap.core.Tween | undefined;
    let progressTween: gsap.core.Tween | undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { gsap } = getGsap();

    const setBarProgress = (value: number) => {
      const clamped = Math.max(0, Math.min(100, Math.round(value)));
      setProgress(clamped);
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${clamped}%`;
      }
      if (progressLabelRef.current) {
        progressLabelRef.current.textContent = `${clamped}%`;
      }
    };

    const finishIntroImmediately = () => {
      if (aborted || window.__siteIntroComplete) return;

      statusPulse?.kill();
      progressTween?.kill();
      if (hardCapTimer !== undefined) window.clearTimeout(hardCapTimer);

      gsap.killTweensOf([
        leftPanelRef.current,
        rightPanelRef.current,
        brandRef.current,
        statusRef.current,
        progressTrackRef.current,
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
      const progressTrack = progressTrackRef.current;

      if (!leftPanel || !rightPanel || !brand || !status || !progressTrack) {
        finishIntroImmediately();
        return;
      }

      gsap.set([leftPanel, rightPanel], { xPercent: 0, force3D: true });
      gsap.set(brand, { autoAlpha: 0, y: 18, scale: 0.96 });
      gsap.set(status, { autoAlpha: 0, y: 10 });
      gsap.set(progressTrack, { autoAlpha: 0, y: 8 });
      gsap.set(progressBarRef.current, { width: "0%" });

      const onIntroNavigate = () => finishIntroImmediately();
      window.addEventListener(INTRO_NAV_EVENT, onIntroNavigate);

      hardCapTimer = window.setTimeout(finishIntroImmediately, MAX_INTRO_MS);

      if (reducedMotion) {
        void (async () => {
          setBarProgress(100);
          await sleep(400);
          finishIntroImmediately();
        })();

        return () => {
          window.removeEventListener(INTRO_NAV_EVENT, onIntroNavigate);
        };
      }

      let splitStarted = false;

      statusPulse = gsap.to(status, {
        autoAlpha: 0.7,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.1,
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
        )
        .to(
          progressTrack,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
          },
          "-=0.35"
        );

      const runSplit = () => {
        if (aborted || splitStarted || window.__siteIntroComplete) return;
        splitStarted = true;
        statusPulse?.kill();
        progressTween?.kill();
        setBarProgress(100);
        document.documentElement.classList.add("site-intro-revealing");

        gsap
          .timeline({
            onComplete: finishIntroImmediately,
          })
          .to([brand, status, progressTrack], {
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

      const startTime = Date.now();
      let videoRatio = 0;

      progressTween = gsap.to(
        {},
        {
          duration: 8,
          ease: "none",
          onUpdate: function onProgressTick() {
            const eased = Math.min(88, this.progress() * 88);
            const combined = Math.min(96, eased + videoRatio * 10);
            setBarProgress(combined);
          },
        }
      );

      void (async () => {
        await preloadImage(BRAND_LOGO_SRC);
        setBarProgress(12);
        if (BRAND_STORY_POSTER_SRC) {
          await preloadImage(BRAND_STORY_POSTER_SRC);
        }
        setBarProgress(22);

        const setVideoProgress = (ratio: number) => {
          if (aborted) return;
          videoRatio = Math.max(videoRatio, ratio);
          setBarProgress(Math.min(96, 22 + videoRatio * 72));
        };

        const frameWarm =
          window.__heroWarmPromises?.brandStory ??
          warmVideoToFirstFrame(
            BRAND_STORY_VIDEO_SRC,
            MAX_INTRO_MS - 800,
            setVideoProgress
          );

        const fileWarm = preloadVideoFile(BRAND_STORY_VIDEO_SRC, setVideoProgress);
        const brandStoryReady = Promise.all([
          frameWarm,
          Promise.race([
            fileWarm,
            sleep(MAX_INTRO_MS - 900).then(() => false),
          ]),
        ]).then(([frameReady, fileReady]) => frameReady || fileReady);

        window.__heroWarmPromises = {
          ...window.__heroWarmPromises,
          brandStory: brandStoryReady,
        };

        const ready = await brandStoryReady;

        setBarProgress(ready ? 100 : 94);

        const elapsed = Date.now() - startTime;
        if (elapsed < MIN_DISPLAY_MS) {
          await sleep(MIN_DISPLAY_MS - elapsed);
        }

        if (!aborted && !splitStarted) {
          runSplit();
        }
      })();

      return () => {
        window.removeEventListener(INTRO_NAV_EVENT, onIntroNavigate);
      };
    }, rootRef);

    return () => {
      aborted = true;
      statusPulse?.kill();
      progressTween?.kill();
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

        <div
          ref={progressTrackRef}
          className="site-intro-progress mt-8 w-full max-w-[220px] md:max-w-[260px]"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Loading progress"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-brand-border/80">
              <div
                ref={progressBarRef}
                className="site-intro-progress-bar h-full rounded-full bg-brand-green transition-[width] duration-150 ease-out"
                style={{ width: "0%" }}
              />
            </div>
            <span
              ref={progressLabelRef}
              className="min-w-[2.5rem] font-shop text-[10px] font-semibold tabular-nums tracking-wide text-brand-green"
            >
              0%
            </span>
          </div>
        </div>
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
