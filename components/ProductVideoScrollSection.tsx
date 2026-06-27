"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { getGsap } from "@/lib/gsap/client";
import { onLenisInit, isScrollExperienceReady } from "@/lib/scroll/lenisReady";
import {
  createScrollProgressSmoother,
  easeOutCubic,
  tickerDeltaSeconds,
} from "@/lib/scroll/smoothProgress";
import {
  bindScrollProgressLock,
  createScrollProgressLock,
} from "@/lib/scroll/scrollProgressLock";
import type { ProductVideoScrollConfig } from "@/lib/hero/productVideoScroll";
import {
  useResponsiveScrollHeight,
  preferNativeScroll,
  productVideoScrollProgressSmoothingForViewport,
} from "@/lib/scroll/responsiveScroll";
import { preloadVideoAsset } from "@/lib/scroll/preloadMedia";
import { createVideoScrubSeeker } from "@/lib/scroll/videoScrub";
import { isVideoFrameReady } from "@/lib/scroll/videoReadiness";

type Theme = {
  section: string;
  pin: string;
  panel: string;
  eyebrow: string;
  headline: string;
  subtext: string;
  cta: string;
  hint: string;
  progressTrack: string;
  progressBar: string;
  closingWrap: string;
  closingEyebrow: string;
  closingTitle: string;
  closingDesc: string;
  closingLink: string;
  videoClass: string;
};

const THEMES: Record<"light" | "dark", Theme> = {
  light: {
    section: "bg-[#f7f2ea]",
    pin: "bg-gradient-to-b from-[#faf6ef] via-[#f5eee2] to-[#efe6d6]",
    panel:
      "overflow-hidden rounded-[1.75rem] ring-1 ring-brand-green-dark/10 shadow-[0_40px_90px_-30px_rgba(45,82,57,0.45)]",
    eyebrow: "text-brand-green/70",
    headline: "text-brand-text",
    subtext: "text-brand-muted",
    cta: "border-brand-green/35 text-brand-green hover:border-brand-green hover:bg-brand-green-light",
    hint: "text-brand-muted/70",
    progressTrack: "bg-brand-border/80",
    progressBar: "bg-brand-green/40",
    closingWrap: "border-t border-brand-border/60 bg-brand-cream",
    closingEyebrow: "text-brand-green",
    closingTitle: "text-brand-text",
    closingDesc: "text-brand-text/80",
    closingLink: "text-brand-green hover:text-brand-green-dark",
    videoClass: "",
  },
  dark: {
    section: "bg-[#060504]",
    pin: "bg-[radial-gradient(ellipse_at_50%_44%,rgba(92,64,32,0.32)_0%,rgba(20,15,11,0.85)_44%,#070504_82%)]",
    panel: "overflow-visible bg-transparent",
    videoClass: "product-video-blend",
    eyebrow: "text-[#c9a962]/80",
    headline: "text-[#f5efe4]",
    subtext: "text-[#b8ac98]",
    cta: "border-[#c9a962]/40 text-[#d8c08a] hover:border-[#c9a962] hover:bg-[#c9a962]/10",
    hint: "text-[#b8ac98]/60",
    progressTrack: "bg-white/10",
    progressBar: "bg-[#c9a962]/70",
    closingWrap: "border-t border-brand-border/50 bg-white",
    closingEyebrow: "text-[#c9a962]",
    closingTitle: "text-brand-text",
    closingDesc: "text-brand-text",
    closingLink: "text-[#d8c08a] hover:text-[#c9a962]",
  },
};

function beginVideoPreload(video: HTMLVideoElement) {
  video.preload = "auto";
  if (video.readyState < HTMLMediaElement.HAVE_METADATA) {
    video.load();
  }
}

interface ProductVideoScrollSectionProps {
  config: ProductVideoScrollConfig;
  scrollId: string;
  theme?: "light" | "dark";
  /** Preload video + wire scroll sooner — for above-the-fold sections. */
  priority?: boolean;
  /** Poster shown until the first video frame is decoded. */
  poster?: string;
}

export default function ProductVideoScrollSection({
  config,
  scrollId,
  theme = "light",
  priority = false,
  poster,
}: ProductVideoScrollSectionProps) {
  const videoSrc = config.sources.hd;
  const [videoReady, setVideoReady] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introLeftRef = useRef<HTMLDivElement>(null);
  const introRightRef = useRef<HTMLDivElement>(null);
  const introLeftDesktopRef = useRef<HTMLDivElement>(null);
  const introRightDesktopRef = useRef<HTMLDivElement>(null);
  const benefitsLeftRef = useRef<HTMLDivElement>(null);
  const benefitsRightRef = useRef<HTMLDivElement>(null);
  const benefitsMobileTopRef = useRef<HTMLDivElement>(null);
  const benefitsMobileBottomRef = useRef<HTMLDivElement>(null);
  const benefitsMobileCtaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const responsiveScrollVh = useResponsiveScrollHeight(config.scrollHeightVh);

  useLayoutEffect(() => {
    const { gsap } = getGsap();
    const introTargets = [
      introLeftRef.current,
      introRightRef.current,
      introLeftDesktopRef.current,
      introRightDesktopRef.current,
      scrollHintRef.current,
    ].filter(Boolean) as HTMLElement[];

    if (introTargets.length) gsap.set(introTargets, { autoAlpha: 0 });
  }, []);

  useLayoutEffect(() => {
    if (!priority || !videoSrc) return;
    preloadVideoAsset(videoSrc);
  }, [priority, videoSrc]);

  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => {
      if (isVideoFrameReady(video)) setVideoReady(true);
    };

    markReady();
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("loadedmetadata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("error", markReady, { once: true });

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("loadedmetadata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("error", markReady);
    };
  }, [videoSrc]);

  useLayoutEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    let setupAttempts = 0;
    let syncScroll: (() => void) | undefined;
    let detachVideoScrub: (() => void) | undefined;
    let stopScrubWaiting: (() => void) | undefined;
    let setupComplete = false;
    let setupInFlight = false;
    let setupRetryTimer: number | undefined;

    const scheduleSetupRetry = (delayMs = 450) => {
      if (cancelled || setupComplete) return;
      window.clearTimeout(setupRetryTimer);
      setupRetryTimer = window.setTimeout(() => {
        setupInFlight = false;
        void setup();
      }, delayMs);
    };

    const setup = async () => {
      if (cancelled || setupInFlight || setupComplete) return;
      setupInFlight = true;

      const root = rootRef.current;
      const sequence = sequenceRef.current;
      const pin = pinRef.current;
      const video = videoRef.current;

      if (!root || !sequence || !pin || !video) {
        setupInFlight = false;
        if (setupAttempts < 24 && !cancelled) {
          setupAttempts += 1;
          requestAnimationFrame(() => void setup());
        }
        return;
      }

      if (cancelled || !videoRef.current || videoRef.current !== video) {
        setupInFlight = false;
        return;
      }

      beginVideoPreload(video);

      const warmPromise = priority
        ? window.__heroWarmPromises?.moringa
        : undefined;

      const { gsap, ScrollTrigger } = getGsap();
      detachVideoScrub?.();
      ctx?.revert();

      let videoScrubReady = isVideoFrameReady(video);
      let videoScrub: ReturnType<typeof createVideoScrubSeeker> | undefined;
      let scrubPoll: number | undefined;
      let detachScrubListeners: (() => void) | undefined;

      const revealIntroCopy = () => {
        gsap.set(introLeftRef.current, { y: 0, autoAlpha: 1 });
        gsap.set(introRightRef.current, { y: 0, autoAlpha: 1 });
        gsap.set(introLeftDesktopRef.current, { y: 0, autoAlpha: 1 });
        gsap.set(introRightDesktopRef.current, { y: 0, autoAlpha: 1 });
      };

      const stopWaitingForScrub = () => {
        if (scrubPoll !== undefined) {
          window.clearInterval(scrubPoll);
          scrubPoll = undefined;
        }
        detachScrubListeners?.();
        detachScrubListeners = undefined;
      };
      stopScrubWaiting = stopWaitingForScrub;

      const ensureVideoScrub = () => {
        if (videoScrub) return true;
        if (cancelled || !videoRef.current || videoRef.current !== video) {
          return false;
        }
        if (!isVideoFrameReady(video)) return false;
        video.pause();
        try {
          video.currentTime = 0;
        } catch {
          /* ignore */
        }
        const touchScroll = preferNativeScroll();
        videoScrub = createVideoScrubSeeker(video, { touchScroll });
        detachVideoScrub = () => {
          stopWaitingForScrub();
          videoScrub?.detach();
        };
        videoScrubReady = true;
        setVideoReady(true);
        revealIntroCopy();
        stopWaitingForScrub();
        syncScroll?.();
        return true;
      };

      // Wire the scrubber the instant the video can paint a frame. A poll plus
      // media events guarantee it initializes regardless of how the decode/cache
      // race resolves, so the video never ends up frozen while scrolling.
      if (!ensureVideoScrub()) {
        beginVideoPreload(video);
        const onMediaReady = () => {
          ensureVideoScrub();
        };
        video.addEventListener("loadeddata", onMediaReady);
        video.addEventListener("canplay", onMediaReady);
        video.addEventListener("canplaythrough", onMediaReady);
        video.addEventListener("seeked", onMediaReady);
        detachScrubListeners = () => {
          video.removeEventListener("loadeddata", onMediaReady);
          video.removeEventListener("canplay", onMediaReady);
          video.removeEventListener("canplaythrough", onMediaReady);
          video.removeEventListener("seeked", onMediaReady);
        };
        scrubPoll = window.setInterval(() => {
          if (!ensureVideoScrub() && !cancelled) beginVideoPreload(video);
        }, 250);
      }

      void warmPromise?.then(() => {
        ensureVideoScrub();
      });

      ctx = gsap.context(() => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        const touchScroll = preferNativeScroll();

        if (touchScroll) {
          gsap.ticker.lagSmoothing(500, 33);
        }

        video.pause();
        try {
          video.currentTime = 0;
        } catch {
          /* ignore */
        }

        let scrollTarget = 0;
        let sectionActive = priority;

        const progressSmoother = createScrollProgressSmoother(
          productVideoScrollProgressSmoothingForViewport()
        );

        const applyProgress = (visualProgress: number, mediaProgress: number) => {
          const progress = gsap.utils.clamp(0, 1, visualProgress);
          const media = gsap.utils.clamp(0, 1, mediaProgress);
          const duration = video.duration;

          if (videoScrubReady && videoScrub && Number.isFinite(duration) && duration > 0) {
            videoScrub.setTargetTime(media * duration);
          }

          const textPhase = easeOutCubic(Math.min(1, progress / 0.18));
          const introTargets = [
            introLeftRef.current,
            introRightRef.current,
            introLeftDesktopRef.current,
            introRightDesktopRef.current,
          ].filter(Boolean) as HTMLElement[];

          if (introTargets.length) {
            gsap.set(introTargets, {
              y: -60 * textPhase,
              autoAlpha: 1 - textPhase,
              overwrite: "auto",
            });
          }

          const calloutIn = easeOutCubic(
            gsap.utils.clamp(0, 1, (progress - 0.12) / 0.32)
          );
          const benefitSides = [
            benefitsLeftRef.current,
            benefitsRightRef.current,
          ].filter(Boolean) as HTMLElement[];

          const animateBenefitItems = (
            container: HTMLElement | null,
            selector: string
          ) => {
            if (!container) return;
            const items = container.querySelectorAll<HTMLElement>(selector);
            items.forEach((el, i) => {
              const stagger = i * 0.12;
              const itemIn = easeOutCubic(
                gsap.utils.clamp(0, 1, (calloutIn - stagger) / 0.7)
              );
              gsap.set(el, {
                autoAlpha: itemIn,
                y: 24 * (1 - itemIn),
                overwrite: "auto",
              });
            });
          };

          for (const side of benefitSides) {
            animateBenefitItems(side, "[data-vbenefit]");
          }
          animateBenefitItems(
            benefitsMobileTopRef.current,
            "[data-vbenefit-mobile]"
          );
          animateBenefitItems(
            benefitsMobileBottomRef.current,
            "[data-vbenefit-mobile]"
          );

          if (benefitsMobileCtaRef.current) {
            const ctaIn = easeOutCubic(
              gsap.utils.clamp(0, 1, (calloutIn - 0.22) / 0.65)
            );
            gsap.set(benefitsMobileCtaRef.current, {
              autoAlpha: ctaIn,
              y: 18 * (1 - ctaIn),
              overwrite: "auto",
            });
          }

          if (scrollHintRef.current) {
            gsap.set(scrollHintRef.current, {
              autoAlpha: gsap.utils.clamp(0, 1, 1 - progress / 0.08),
              overwrite: "auto",
            });
          }

          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleX: progress,
              transformOrigin: "left center",
              overwrite: "auto",
            });
          }
        };

        gsap.set(introLeftRef.current, { y: 0, autoAlpha: 0 });
        gsap.set(introRightRef.current, { y: 0, autoAlpha: 0 });
        gsap.set(introLeftDesktopRef.current, { y: 0, autoAlpha: 0 });
        gsap.set(introRightDesktopRef.current, { y: 0, autoAlpha: 0 });
        if (videoScrubReady) revealIntroCopy();
        [benefitsLeftRef.current, benefitsRightRef.current]
          .filter(Boolean)
          .forEach((side) => {
            gsap.set((side as HTMLElement).querySelectorAll("[data-vbenefit]"), {
              autoAlpha: 0,
              y: 24,
            });
          });
        if (benefitsMobileTopRef.current) {
          gsap.set(
            benefitsMobileTopRef.current.querySelectorAll("[data-vbenefit-mobile]"),
            { autoAlpha: 0, y: 24 }
          );
        }
        if (benefitsMobileBottomRef.current) {
          gsap.set(
            benefitsMobileBottomRef.current.querySelectorAll("[data-vbenefit-mobile]"),
            { autoAlpha: 0, y: 24 }
          );
        }
        gsap.set(benefitsMobileCtaRef.current, { autoAlpha: 0, y: 18 });
        gsap.set(scrollHintRef.current, { autoAlpha: 1 });
        gsap.set(progressRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        if (reducedMotion) {
          progressSmoother.reset(1);
          applyProgress(1, 1);
          setupComplete = true;
          setupInFlight = false;
          return;
        }

        progressSmoother.reset(0);

        const progressLock = createScrollProgressLock();
        const snapLockedEnd = () => {
          scrollTarget = 1;
          progressSmoother.reset(1);
          applyProgress(1, 1);
        };
        const snapUnlockedStart = () => {
          scrollTarget = 0;
          progressSmoother.reset(0);
          applyProgress(0, 0);
        };

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
          onToggle: (self) => {
            sectionActive = self.isActive;
          },
          ...bindScrollProgressLock(progressLock, {
            onEnter: () => {
              sectionActive = true;
            },
            onEnterBack: () => {
              sectionActive = true;
            },
            onLeave: () => {
              sectionActive = false;
            },
            onLeaveBack: () => {
              sectionActive = false;
              if (scrollTarget < 0.12) {
                snapUnlockedStart();
              }
            },
            onUpdate: (progress) => {
              scrollTarget = progress;
            },
            onLockedEnd: snapLockedEnd,
          }),
        });

        syncScroll = () => {
          if (!priority && !isScrollExperienceReady()) return;
          if (!sectionActive) return;

          const { visual, media } = progressSmoother.step(
            scrollTarget,
            tickerDeltaSeconds(gsap)
          );
          const videoMedia = touchScroll ? scrollTarget : media;
          applyProgress(visual, videoMedia);
        };

        gsap.ticker.add(syncScroll);
        ScrollTrigger.refresh();
        syncScroll();
        setupComplete = true;
        setupInFlight = false;
        window.setTimeout(() => ScrollTrigger.refresh(), 300);
        window.setTimeout(() => ScrollTrigger.refresh(), 1200);
      }, root);
    };

    const runSetup = () => {
      if (typeof window !== "undefined" && !window.__lenisInitialized) return;
      if (setupComplete || setupInFlight) return;
      void setup();
    };

    const removeLenisListener = onLenisInit(() => {
      runSetup();
      requestAnimationFrame(() => getGsap().ScrollTrigger.refresh());
      window.setTimeout(() => getGsap().ScrollTrigger.refresh(), 800);
    });

    if (typeof window !== "undefined" && window.__lenisInitialized) {
      runSetup();
    }

    const setupRetry = window.setTimeout(runSetup, priority ? 80 : 600);
    const setupRetryLate = window.setTimeout(runSetup, priority ? 300 : 1500);
    const onWindowLoad = () => {
      runSetup();
      getGsap().ScrollTrigger.refresh();
    };
    window.addEventListener("load", onWindowLoad);

    return () => {
      cancelled = true;
      window.clearTimeout(setupRetry);
      window.clearTimeout(setupRetryLate);
      window.clearTimeout(setupRetryTimer);
      window.removeEventListener("load", onWindowLoad);
      removeLenisListener();
      const { gsap } = getGsap();
      if (syncScroll) gsap.ticker.remove(syncScroll);
      stopScrubWaiting?.();
      detachVideoScrub?.();
      ctx?.revert();
    };
  }, [videoSrc, scrollId, responsiveScrollVh, priority]);

  const {
    hero,
    benefits,
    closing,
    sequenceLabel,
    width,
    height,
    layout,
  } = config;
  const t = THEMES[theme];
  const stageClass = `product-video-scroll-stage ${layout.stageClass}`;
  const isPortraitVideo = height > width;

  const mobileBenefitCardClass =
    theme === "dark"
      ? "border-[#c9a962]/20 bg-black/65 backdrop-blur-md"
      : "border-brand-green-dark/12 bg-white/80";

  return (
    <section
      ref={rootRef}
      data-video-ready={videoReady ? "" : undefined}
      data-priority={priority ? "" : undefined}
      className={`product-video-scroll product-video-scroll-zone relative ${t.section} ${
        isPortraitVideo ? "product-video-scroll--portrait" : ""
      } ${theme === "dark" ? "product-video-scroll--dark" : ""}`}
      aria-label={`${hero.eyebrow} reveal`}
    >
      <div
        ref={sequenceRef}
        className={`relative ${t.section}`}
        style={{ height: `${responsiveScrollVh}vh` }}
      >
        <div
          ref={pinRef}
          className={`relative flex h-[100svh] w-full flex-col overflow-hidden md:block ${t.pin}`}
        >
          {/* Mobile top — intro + benefit row above video */}
          <div className="product-video-scroll-mobile__top relative z-[2] shrink-0 px-5 pb-3 pt-[4.25rem] md:hidden">
            <div ref={introLeftRef} data-video-intro className="text-center">
              <p
                className={`font-sans text-[9px] font-medium uppercase tracking-[0.28em] ${t.eyebrow}`}
              >
                {hero.eyebrow}
              </p>
              <h2
                className={`product-video-scroll-mobile__headline mt-2.5 font-serif text-[clamp(1.65rem,6.8vw,2.15rem)] font-light leading-[1.06] tracking-[0.02em] ${t.headline}`}
              >
                {hero.headlineLeft[0]}
                <br />
                {hero.headlineLeft[1]}
              </h2>
            </div>
            <div
              ref={benefitsMobileTopRef}
              aria-hidden
              className="product-video-scroll-mobile__benefits-row pointer-events-none absolute inset-x-5 bottom-0 grid grid-cols-2 gap-2"
            >
              {benefits.left.map((b) => (
                <div
                  key={b.title}
                  data-vbenefit-mobile
                  className={`rounded-xl border px-2.5 py-2.5 backdrop-blur-sm ${mobileBenefitCardClass}`}
                >
                  <span
                    className={`block h-px w-6 ${t.progressBar}`}
                    aria-hidden
                  />
                  <h3
                    className={`mt-2 font-sans text-[8px] font-semibold uppercase leading-tight tracking-[0.12em] ${t.headline}`}
                  >
                    {b.title}
                  </h3>
                  <p
                    className={`mt-1 font-sans text-[8px] leading-snug ${t.subtext}`}
                  >
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Video — in-flow on mobile, fullscreen on desktop */}
          <div className="product-video-scroll-mobile__stage relative z-[1] flex min-h-0 flex-[1_1_auto] items-center justify-center px-4 py-3 md:absolute md:inset-0 md:z-0 md:flex-none md:py-16">
            <div
              className={`${stageClass} ${t.panel} w-full max-w-[min(92vw,380px)] md:max-h-[min(62vh,540px)] md:max-w-[min(960px,52vw)]`}
              style={
                poster
                  ? {
                      backgroundImage: `url(${poster})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : undefined
              }
            >
              <video
                ref={videoRef}
                className={`product-video-scroll-video block h-full w-full ${t.videoClass}`}
                src={videoSrc}
                poster={poster}
                width={width}
                height={height}
                muted
                playsInline
                preload="auto"
                aria-label={`${hero.eyebrow} reveal animation`}
              />
            </div>
          </div>

          {/* Mobile bottom — intro + benefit row below video */}
          <div className="product-video-scroll-mobile__bottom relative z-[2] shrink-0 px-5 pb-14 pt-3 md:hidden">
            <div ref={introRightRef} data-video-intro className="text-center">
              <h3
                className={`product-video-scroll-mobile__headline font-serif text-[clamp(1.65rem,6.8vw,2.15rem)] font-light leading-[1.06] tracking-[0.02em] ${t.headline}`}
              >
                {hero.headlineRight[0]}
                <br />
                {hero.headlineRight[1]}
              </h3>
              <p
                className={`product-video-scroll-mobile__subtext mx-auto mt-3 max-w-[18rem] font-sans text-[9px] font-light uppercase leading-[1.7] tracking-[0.16em] ${t.subtext}`}
              >
                {hero.subtext}
              </p>
              <div className="pointer-events-auto mt-5 flex justify-center">
                <Link
                  href={hero.cta.href}
                  className={`inline-flex items-center gap-3 rounded-full border px-7 py-3 font-sans text-[9px] uppercase tracking-[0.22em] transition-all ${t.cta}`}
                >
                  <span className="opacity-50">•</span>
                  {hero.cta.label}
                  <span className="opacity-50">•</span>
                </Link>
              </div>
            </div>
            <div className="product-video-scroll-mobile__benefits-stack pointer-events-none absolute inset-x-5 top-0 flex flex-col items-center gap-3">
              <div
                ref={benefitsMobileBottomRef}
                aria-hidden
                className="product-video-scroll-mobile__benefits-row grid w-full grid-cols-2 gap-2"
              >
                {benefits.right.map((b) => (
                  <div
                    key={b.title}
                    data-vbenefit-mobile
                    className={`rounded-xl border px-2.5 py-2.5 backdrop-blur-sm ${mobileBenefitCardClass}`}
                  >
                    <span
                      className={`block h-px w-6 ${t.progressBar}`}
                      aria-hidden
                    />
                    <h3
                      className={`mt-2 font-sans text-[8px] font-semibold uppercase leading-tight tracking-[0.12em] ${t.headline}`}
                    >
                      {b.title}
                    </h3>
                    <p
                      className={`mt-1 font-sans text-[8px] leading-snug ${t.subtext}`}
                    >
                      {b.text}
                    </p>
                  </div>
                ))}
              </div>
              <div
                ref={benefitsMobileCtaRef}
                className="product-video-scroll-mobile__benefits-cta pointer-events-auto"
              >
                <Link
                  href={hero.cta.href}
                  className={`inline-flex items-center gap-3 rounded-full border px-7 py-3 font-sans text-[9px] uppercase tracking-[0.22em] transition-all ${t.cta}`}
                >
                  <span className="opacity-50">•</span>
                  {hero.cta.label}
                  <span className="opacity-50">•</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop text overlay */}
          <div className="relative z-[2] hidden h-full flex-col justify-center pb-16 pt-20 md:flex">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-8 px-12 lg:gap-12 lg:px-16">
              <div className="relative col-start-1 row-start-1 max-w-[18rem] justify-self-start">
                <div ref={introLeftDesktopRef} data-video-intro>
                  <p
                    className={`font-sans text-[10px] font-medium uppercase tracking-[0.32em] ${t.eyebrow}`}
                  >
                    {hero.eyebrow}
                  </p>
                  <h2
                    className={`mt-4 font-serif text-[2.75rem] font-light leading-[1.05] tracking-[0.02em] lg:text-[3rem] ${t.headline}`}
                  >
                    {hero.headlineLeft[0]}
                    <br />
                    {hero.headlineLeft[1]}
                  </h2>
                </div>
                <div
                  ref={benefitsLeftRef}
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 space-y-8"
                >
                  {benefits.left.map((b) => (
                    <div key={b.title} data-vbenefit>
                      <span
                        className={`block h-px w-8 ${t.progressBar}`}
                        aria-hidden
                      />
                      <h3
                        className={`mt-3 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] ${t.headline}`}
                      >
                        {b.title}
                      </h3>
                      <p
                        className={`mt-2 font-sans text-[12px] leading-[1.65] ${t.subtext}`}
                      >
                        {b.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                aria-hidden
                className={`col-start-2 row-start-1 ${layout.columnClass}`}
              />

              <div className="relative col-start-3 row-start-1 max-w-[18rem] justify-self-end text-right">
                <div ref={introRightDesktopRef} data-video-intro>
                  <h3
                    className={`font-serif text-[2.75rem] font-light leading-[1.05] tracking-[0.02em] lg:text-[3rem] ${t.headline}`}
                  >
                    {hero.headlineRight[0]}
                    <br />
                    {hero.headlineRight[1]}
                  </h3>
                  <p
                    className={`mt-6 font-sans text-[11px] font-light uppercase leading-[1.9] tracking-[0.22em] ${t.subtext}`}
                  >
                    {hero.subtext}
                  </p>
                  <div className="pointer-events-auto mt-10 flex justify-end">
                    <Link
                      href={hero.cta.href}
                      className={`inline-flex items-center gap-3 rounded-full border px-10 py-4 font-sans text-[11px] uppercase tracking-[0.28em] transition-all ${t.cta}`}
                    >
                      <span className="opacity-50">•</span>
                      {hero.cta.label}
                      <span className="opacity-50">•</span>
                    </Link>
                  </div>
                </div>
                <div
                  ref={benefitsRightRef}
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 space-y-8"
                >
                  {benefits.right.map((b) => (
                    <div key={b.title} data-vbenefit>
                      <span
                        className={`ml-auto block h-px w-8 ${t.progressBar}`}
                        aria-hidden
                      />
                      <h3
                        className={`mt-3 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] ${t.headline}`}
                      >
                        {b.title}
                      </h3>
                      <p
                        className={`mt-2 font-sans text-[12px] leading-[1.65] ${t.subtext}`}
                      >
                        {b.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p
            ref={scrollHintRef}
            data-video-intro
            className={`pointer-events-none absolute bottom-6 left-1/2 z-[3] -translate-x-1/2 font-sans text-[8px] uppercase tracking-[0.36em] max-md:bottom-5 md:text-[9px] md:tracking-[0.4em] ${t.hint}`}
          >
            {sequenceLabel}
          </p>

          <div
            className={`absolute bottom-0 left-0 right-0 z-[3] h-px ${t.progressTrack}`}
          >
            <div
              ref={progressRef}
              className={`h-full w-full origin-left ${t.progressBar}`}
            />
          </div>
        </div>
      </div>

      <div className={`relative z-[2] ${t.closingWrap}`}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16 md:px-12 md:py-20 lg:px-16">
          <div>
            <p
              className={`font-sans text-[10px] uppercase tracking-[0.3em] ${t.closingEyebrow}`}
            >
              {closing.eyebrow}
            </p>
            <h2
              className={`mt-5 font-serif text-3xl font-light leading-[1.12] tracking-[0.02em] md:text-4xl lg:text-[2.75rem] ${t.closingTitle}`}
            >
              {closing.title}
            </h2>
          </div>
          <div>
            <p
              className={`font-sans text-base font-light leading-[1.85] tracking-[0.02em] ${t.closingDesc}`}
            >
              {closing.description}
            </p>
            <Link
              href={closing.link.href}
              className={`mt-8 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] transition-colors ${t.closingLink}`}
            >
              {closing.link.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
