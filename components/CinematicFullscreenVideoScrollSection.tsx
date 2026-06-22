"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { getGsap } from "@/lib/gsap/client";
import {
  CINEMATIC_VIDEO_THEMES,
  type CinematicVideoScrollConfig,
} from "@/lib/hero/cinematicVideoScroll";
import { isScrollExperienceReady, onLenisInit } from "@/lib/scroll/lenisReady";
import {
  MOBILE_MAX_WIDTH,
  useIsMobileViewport,
  useResponsiveScrollHeight,
  preferNativeScroll,
  cinematicScrollHeightForViewport,
  cinematicScrollProgressSmoothingForViewport,
} from "@/lib/scroll/responsiveScroll";
import {
  createScrollProgressSmoother,
  easeInOutCubic,
  easeOutCubic,
  tickerDeltaSeconds,
} from "@/lib/scroll/smoothProgress";

function waitForVideoReady(video: HTMLVideoElement, timeoutMs = 4500) {
  return Promise.race([
    new Promise<void>((resolve) => {
      const finish = () => {
        video.removeEventListener("loadedmetadata", finish);
        video.removeEventListener("loadeddata", finish);
        video.removeEventListener("canplay", finish);
        video.removeEventListener("error", finish);
        resolve();
      };

      if (
        video.readyState >= HTMLMediaElement.HAVE_METADATA &&
        Number.isFinite(video.duration) &&
        video.duration > 0
      ) {
        resolve();
        return;
      }

      video.addEventListener("loadedmetadata", finish, { once: true });
      video.addEventListener("loadeddata", finish, { once: true });
      video.addEventListener("canplay", finish, { once: true });
      video.addEventListener("error", finish, { once: true });
      video.load();
    }),
    new Promise<void>((resolve) => window.setTimeout(resolve, timeoutMs)),
  ]);
}

interface CinematicFullscreenVideoScrollSectionProps {
  config: CinematicVideoScrollConfig;
  /** Defer video decode + ScrollTrigger until the section is near the viewport. */
  deferUntilVisible?: boolean;
}

export default function CinematicFullscreenVideoScrollSection({
  config,
  deferUntilVisible = false,
}: CinematicFullscreenVideoScrollSectionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const {
    scrollId,
    src,
    scrollHeightVh,
    theme,
    variantLabel,
    ariaLabel,
    videoAriaLabel,
    eyebrow,
    headline,
    subtext,
    sequenceLabel,
    closing,
    videoLogoOverlay,
  } = config;
  const t = CINEMATIC_VIDEO_THEMES[theme];
  const isMobile = useIsMobileViewport();
  const responsiveScrollVh = useResponsiveScrollHeight(
    scrollHeightVh,
    cinematicScrollHeightForViewport
  );

  useEffect(() => {
    if (!isMobile) return;
    const video = videoRef.current;
    if (!video) return;
    video.preload = "auto";
    video.load();
  }, [isMobile, src]);

  useLayoutEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    let setupAttempts = 0;
    let syncScroll: (() => void) | undefined;
    let detachSeek: (() => void) | undefined;
    let sectionObserver: IntersectionObserver | undefined;
    let setupStarted = false;

    const setup = async () => {
      if (cancelled) return;

      const root = rootRef.current;
      const sequence = sequenceRef.current;
      const pin = pinRef.current;
      const video = videoRef.current;
      const videoWrap = videoWrapRef.current;
      const overlay = overlayRef.current;
      const copy = copyRef.current;
      const hint = hintRef.current;
      const progress = progressRef.current;

      if (
        !root ||
        !sequence ||
        !pin ||
        !video ||
        !videoWrap ||
        !overlay ||
        !copy ||
        !hint ||
        !progress
      ) {
        if (setupAttempts < 24 && !cancelled) {
          setupAttempts += 1;
          requestAnimationFrame(() => void setup());
        }
        return;
      }

      video.preload = "auto";
      await waitForVideoReady(video, preferNativeScroll() ? 3500 : 4500);
      if (cancelled || !videoRef.current || videoRef.current !== video) return;

      const { gsap, ScrollTrigger } = getGsap();
      const touchScroll = preferNativeScroll();
      detachSeek?.();
      ctx?.revert();

      ctx = gsap.context(() => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        video.pause();
        video.currentTime = 0;

        let targetTime = 0;
        let seeking = false;
        let lastSeekAt = 0;
        const SEEK_THRESHOLD = touchScroll ? 0.07 : 1 / 30;
        const SEEK_MIN_INTERVAL_MS = touchScroll ? 36 : 0;

        const seekToTarget = () => {
          if (!Number.isFinite(video.duration) || video.duration <= 0) {
            seeking = false;
            return;
          }

          const clamped = gsap.utils.clamp(0, video.duration - 0.04, targetTime);
          if (Math.abs(video.currentTime - clamped) < SEEK_THRESHOLD) {
            seeking = false;
            return;
          }

          const now = performance.now();
          if (seeking && now - lastSeekAt < SEEK_MIN_INTERVAL_MS) return;

          seeking = true;
          lastSeekAt = now;
          try {
            if (
              touchScroll &&
              "fastSeek" in video &&
              typeof video.fastSeek === "function"
            ) {
              video.fastSeek(clamped);
            } else {
              video.currentTime = clamped;
            }
          } catch {
            seeking = false;
          }
        };

        const onSeeked = () => seekToTarget();
        video.addEventListener("seeked", onSeeked);
        detachSeek = () => video.removeEventListener("seeked", onSeeked);

        const progressSmoother = createScrollProgressSmoother(
          cinematicScrollProgressSmoothingForViewport()
        );

        const applyProgress = (visualProgress: number, mediaProgress: number) => {
          const scrollProgress = easeInOutCubic(gsap.utils.clamp(0, 1, visualProgress));
          const media = gsap.utils.clamp(0, 1, mediaProgress);
          const duration = video.duration;

          if (Number.isFinite(duration) && duration > 0) {
            targetTime = media * duration;
            if (!seeking) seekToTarget();
          }

          const copyIn = easeOutCubic(gsap.utils.clamp(0, 1, (scrollProgress - 0.03) / 0.22));
          const copyOut = easeOutCubic(gsap.utils.clamp(0, 1, (scrollProgress - 0.58) / 0.16));
          const copyAlpha = copyIn * (1 - copyOut);
          const hintFade = gsap.utils.clamp(0, 1, 1 - scrollProgress / 0.08);

          gsap.set(videoWrap, {
            scale: touchScroll
              ? 1
              : gsap.utils.interpolate(1.06, 1, scrollProgress),
            force3D: true,
            overwrite: "auto",
          });

          gsap.set(overlay, {
            opacity: gsap.utils.interpolate(0.48, 0.22, scrollProgress),
            overwrite: "auto",
          });

          gsap.set(copy, {
            autoAlpha: copyAlpha,
            y:
              gsap.utils.interpolate(28, 0, copyIn) +
              gsap.utils.interpolate(0, -18, copyOut),
            force3D: true,
            overwrite: "auto",
          });

          gsap.set(hint, {
            autoAlpha: hintFade,
            y: gsap.utils.interpolate(0, -10, 1 - hintFade),
            force3D: true,
            overwrite: "auto",
          });

          gsap.set(progress, {
            scaleX: scrollProgress,
            transformOrigin: "left center",
            force3D: true,
            overwrite: "auto",
          });
        };

        gsap.set(videoWrap, { scale: touchScroll ? 1 : 1.06, force3D: true });
        gsap.set(overlay, { opacity: 0.48 });
        gsap.set(copy, { autoAlpha: 0, y: 28, force3D: true });
        gsap.set(hint, { autoAlpha: 1, y: 0, force3D: true });
        gsap.set(progress, {
          scaleX: 0,
          transformOrigin: "left center",
          force3D: true,
        });

        if (reducedMotion) {
          progressSmoother.reset(1);
          applyProgress(1, 1);
          return;
        }

        progressSmoother.reset(0);

        ScrollTrigger.create({
          id: scrollId,
          trigger: sequence,
          scroller: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          pin,
          pinSpacing: true,
          pinType: touchScroll ? "transform" : "fixed",
          anticipatePin: touchScroll ? 0 : 1,
          fastScrollEnd: touchScroll,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        });

        syncScroll = () => {
          if (!isScrollExperienceReady()) return;

          const resolveTarget = () => {
            const st = ScrollTrigger.getById(scrollId);
            if (st) return st.progress;

            const total = sequence.offsetHeight - window.innerHeight;
            if (total <= 0) return 0;
            const scrolled = gsap.utils.clamp(
              0,
              total,
              -sequence.getBoundingClientRect().top
            );
            return scrolled / total;
          };

          const { visual, media } = progressSmoother.step(
            resolveTarget(),
            tickerDeltaSeconds(gsap)
          );
          applyProgress(visual, media);
        };

        gsap.ticker.add(syncScroll);
        ScrollTrigger.refresh();
        syncScroll();
      }, root);
    };

    const runSetup = () => {
      if (typeof window !== "undefined" && !window.__lenisInitialized) return;
      if (setupStarted) return;
      setupStarted = true;
      void setup();
    };

    const queueSetup = () => {
      const shouldDefer =
        deferUntilVisible && window.innerWidth > MOBILE_MAX_WIDTH;

      if (!shouldDefer) {
        runSetup();
        return;
      }

      const root = rootRef.current;
      if (!root) {
        window.setTimeout(queueSetup, 120);
        return;
      }

      sectionObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            runSetup();
            sectionObserver?.disconnect();
          }
        },
        { rootMargin: "1600px 0px" }
      );
      sectionObserver.observe(root);
    };

    const removeLenisListener = onLenisInit(() => {
      queueSetup();
      requestAnimationFrame(() => getGsap().ScrollTrigger.refresh());
      window.setTimeout(() => getGsap().ScrollTrigger.refresh(), 800);
    });

    if (typeof window !== "undefined" && window.__lenisInitialized) {
      queueSetup();
    }

    const setupRetry = window.setTimeout(queueSetup, 600);
    const setupRetryLate = window.setTimeout(queueSetup, 1500);

    return () => {
      cancelled = true;
      window.clearTimeout(setupRetry);
      window.clearTimeout(setupRetryLate);
      removeLenisListener();
      sectionObserver?.disconnect();
      const { gsap } = getGsap();
      if (syncScroll) gsap.ticker.remove(syncScroll);
      detachSeek?.();
      ctx?.revert();
    };
  }, [deferUntilVisible, scrollId, responsiveScrollVh]);

  return (
    <section
      ref={rootRef}
      className={`cinematic-video-scroll product-video-scroll product-video-scroll-zone relative ${t.section}`}
      aria-label={ariaLabel}
    >
      <div
        ref={sequenceRef}
        className={`cinematic-video-scroll__sequence relative ${t.sequence}`}
        style={{ height: `${responsiveScrollVh}vh` }}
      >
        <div ref={pinRef} className="relative h-[100svh] w-full overflow-hidden">
          <div ref={videoWrapRef} className="cinematic-video-scroll__wrap absolute inset-0">
            <video
              ref={videoRef}
              className="cinematic-video-scroll__video h-full w-full object-cover"
              src={src}
              muted
              playsInline
              preload={isMobile ? "auto" : deferUntilVisible ? "metadata" : "auto"}
              aria-label={videoAriaLabel}
            />
          </div>

          <div
            ref={overlayRef}
            className={`pointer-events-none absolute inset-0 ${t.overlay}`}
          />

          {variantLabel ? (
            <p
              className={`pointer-events-none absolute right-6 top-8 z-[4] rounded-full border px-3 py-1 font-sans text-[9px] uppercase tracking-[0.28em] backdrop-blur-sm md:right-10 ${t.badge}`}
            >
              {variantLabel}
            </p>
          ) : null}

          {videoLogoOverlay ? (
            <div
              className={`pointer-events-none absolute z-[5] ${videoLogoOverlay.className ?? "bottom-10 right-12 md:bottom-12 md:right-[3.75rem]"}`}
              aria-hidden
            >
              <div className="rounded-md bg-[#120c06]/45 px-2 py-1.5 backdrop-blur-[3px] ring-1 ring-white/10">
                <BrandLogo
                  size="nav"
                  variant="white"
                  href={null}
                  className={`drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] ${videoLogoOverlay.logoClassName ?? "!h-11 !w-auto !min-w-0 !max-w-[118px]"}`}
                />
              </div>
            </div>
          ) : null}

          <div className="relative z-[2] flex h-full items-center justify-center px-5 pb-16 pt-20 max-md:px-4 max-md:pb-20 max-md:pt-24 md:px-12">
            <div ref={copyRef} className="max-w-3xl text-center">
              <p
                className={`font-sans text-[9px] font-medium uppercase tracking-[0.3em] max-md:tracking-[0.28em] md:text-[10px] md:tracking-[0.34em] ${t.eyebrow}`}
              >
                {eyebrow}
              </p>
              <h2
                className={`mt-4 font-display text-[clamp(1.85rem,8.5vw,4.5rem)] font-medium leading-[1.04] tracking-[0.02em] md:mt-5 ${t.headline}`}
              >
                {headline[0]}
                <br />
                <span className={t.headlineAccent}>{headline[1]}</span>
              </h2>
              <p
                className={`mx-auto mt-4 max-w-xl font-body text-[13px] leading-[1.8] max-md:px-1 md:mt-6 md:text-base md:leading-[1.85] ${t.subtext}`}
              >
                {subtext}
              </p>
            </div>
          </div>

          <p
            ref={hintRef}
            className={`pointer-events-none absolute bottom-8 left-1/2 z-[3] max-md:bottom-6 -translate-x-1/2 font-sans text-[8px] uppercase tracking-[0.36em] md:bottom-10 md:text-[9px] md:tracking-[0.42em] ${t.hint}`}
          >
            {sequenceLabel}
          </p>

          <div className={`absolute bottom-0 left-0 right-0 z-[3] h-px ${t.progressTrack}`}>
            <div ref={progressRef} className={`h-full w-full origin-left ${t.progressBar}`} />
          </div>
        </div>
      </div>

      <div className={`relative z-[2] px-5 py-12 max-md:py-14 md:px-12 md:py-20 ${t.closingWrap}`}>
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p
              className={`font-sans text-[10px] uppercase tracking-[0.3em] ${t.closingEyebrow}`}
            >
              {closing.eyebrow}
            </p>
            <h3
              className={`mt-4 max-w-xl font-display text-3xl font-medium leading-[1.12] tracking-[0.02em] md:text-4xl ${t.closingTitle}`}
            >
              {closing.title}
            </h3>
          </div>
          <Link
            href={closing.link.href}
            className={`inline-flex items-center gap-2 font-shop text-xs uppercase tracking-[0.2em] transition-colors ${t.closingLink}`}
          >
            {closing.link.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
