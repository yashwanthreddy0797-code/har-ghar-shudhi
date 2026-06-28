"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { getGsap } from "@/lib/gsap/client";
import {
  CINEMATIC_VIDEO_THEMES,
  cinematicScrubTimeFromProgress,
  type CinematicVideoScrollConfig,
} from "@/lib/hero/cinematicVideoScroll";
import { isScrollExperienceReady, onLenisInit } from "@/lib/scroll/lenisReady";
import {
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
import { preloadVideoAsset } from "@/lib/scroll/preloadMedia";
import { createVideoScrubSeeker } from "@/lib/scroll/videoScrub";
import { isVideoFrameReady } from "@/lib/scroll/videoReadiness";
import { markHomeHeroScrollReady } from "@/lib/scroll/heroMediaGate";
import {
  bindScrollProgressLock,
  createScrollProgressLock,
} from "@/lib/scroll/scrollProgressLock";

function beginVideoPreload(video: HTMLVideoElement) {
  video.preload = "auto";
  if (video.readyState < HTMLMediaElement.HAVE_METADATA) {
    video.load();
  }
}

interface CinematicFullscreenVideoScrollSectionProps {
  config: CinematicVideoScrollConfig;
  /** Defer video decode + ScrollTrigger until the section is near the viewport. */
  deferUntilVisible?: boolean;
  /** Hero / above-the-fold — preload immediately and wire scroll faster. */
  priority?: boolean;
}

export default function CinematicFullscreenVideoScrollSection({
  config,
  deferUntilVisible = false,
  priority = false,
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
  const [videoReady, setVideoReady] = useState(false);

  const {
    scrollId,
    src,
    poster,
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
  subtextClassName,
  videoObjectPosition,
  videoTransform,
  hideOverlayCopy = false,
  hideVariantLabel = false,
  hideScrollHint = false,
  disableVideoScale = false,
  scrollProgressSmoothing,
  videoScrub: videoScrubOptions,
  directVideoScrub = false,
  videoStartTime = 0,
  warmPromiseKey,
} = config;
  const t = CINEMATIC_VIDEO_THEMES[theme];
  const responsiveScrollVh = useResponsiveScrollHeight(
    scrollHeightVh,
    cinematicScrollHeightForViewport
  );

  useEffect(() => {
    preloadVideoAsset(src);
    const video = videoRef.current;
    if (!video) return;

    beginVideoPreload(video);

    const markReady = () => {
      if (
        videoStartTime > 0 &&
        isVideoFrameReady(video) &&
        video.currentTime < videoStartTime - 0.05
      ) {
        try {
          video.currentTime = videoStartTime;
        } catch {
          /* ignore seek races while metadata loads */
        }
      }
      // Do NOT reset currentTime here: media events (canplay/loadeddata/seeked)
      // fire after every scrub seek, so resetting would fight the scrubber and
      // freeze the hero on frame 0 (most visible on touch devices). The scrub
      // seeker owns currentTime once it's wired.
      if (isVideoFrameReady(video)) {
        setVideoReady(true);
      }
    };

    markReady();
    video.addEventListener("loadedmetadata", markReady);
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("error", markReady, { once: true });

    return () => {
      video.removeEventListener("loadedmetadata", markReady);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("error", markReady);
    };
  }, [src, priority, videoStartTime]);

  useLayoutEffect(() => {
    if (priority || hideOverlayCopy) return;
    const { gsap } = getGsap();
    if (copyRef.current) gsap.set(copyRef.current, { autoAlpha: 0 });
    if (hintRef.current && !hideScrollHint) gsap.set(hintRef.current, { autoAlpha: 0 });
  }, [hideOverlayCopy, hideScrollHint, priority]);

  useLayoutEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    let setupAttempts = 0;
    let syncScroll: (() => void) | undefined;
    let detachVideoScrub: (() => void) | undefined;
    let stopScrubWaiting: (() => void) | undefined;
    let sectionObserver: IntersectionObserver | undefined;
    let setupComplete = false;
    let setupInFlight = false;

    const setup = async () => {
      if (cancelled || setupInFlight || setupComplete) return;
      setupInFlight = true;

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
        !progress
      ) {
        setupInFlight = false;
        if (setupAttempts < 24 && !cancelled) {
          setupAttempts += 1;
          requestAnimationFrame(() => void setup());
        }
        return;
      }

      beginVideoPreload(video);

      if (cancelled || !videoRef.current || videoRef.current !== video) {
        setupInFlight = false;
        return;
      }

      const warmPromise =
        warmPromiseKey && window.__heroWarmPromises?.[warmPromiseKey]
          ? window.__heroWarmPromises[warmPromiseKey]
          : priority
            ? window.__heroWarmPromises?.honey
            : undefined;

      const scrubPollMs = priority || warmPromiseKey ? 100 : 250;

      const { gsap, ScrollTrigger } = getGsap();
      const touchScroll = preferNativeScroll();
      detachVideoScrub?.();
      ctx?.revert();

      if (touchScroll) {
        gsap.ticker.lagSmoothing(500, 33);
      }

      let videoScrubReady = isVideoFrameReady(video);
      let videoScrub: ReturnType<typeof createVideoScrubSeeker> | undefined;
      let scrubPoll: number | undefined;
      let detachScrubListeners: (() => void) | undefined;

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
          video.currentTime = videoStartTime;
        } catch {
          /* ignore */
        }
        videoScrub = createVideoScrubSeeker(video, {
          touchScroll,
          ...videoScrubOptions,
        });
        detachVideoScrub = () => {
          stopWaitingForScrub();
          videoScrub?.detach();
        };
        videoScrubReady = true;
        setVideoReady(true);
        stopWaitingForScrub();
        syncScroll?.();
        requestAnimationFrame(() => {
          try {
            getGsap().ScrollTrigger.refresh();
          } catch {
            /* GSAP may not be ready yet */
          }
        });
        return true;
      };

      // Create the scrubber the instant the video can paint a frame. We don't
      // rely on a single timed wait: a poll + media events guarantee the
      // scrubber is wired no matter how the decode/cache race resolves.
      if (!ensureVideoScrub()) {
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
        beginVideoPreload(video);
        scrubPoll = window.setInterval(() => {
          if (!ensureVideoScrub() && !cancelled) beginVideoPreload(video);
        }, scrubPollMs);
      }

      void warmPromise?.then(() => {
        ensureVideoScrub();
        try {
          getGsap().ScrollTrigger.refresh();
        } catch {
          /* ignore */
        }
      });

      ctx = gsap.context(() => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        video.pause();
        try {
          video.currentTime = videoStartTime;
        } catch {
          /* ignore */
        }

        let scrollTarget = 0;
        let sectionActive = priority;

        const progressSmoother = createScrollProgressSmoother(
          scrollProgressSmoothing ??
            cinematicScrollProgressSmoothingForViewport()
        );

        const applyProgress = (
          visualProgress: number,
          mediaProgress: number,
          skipVideoSeek = false
        ) => {
          const scrollProgress = directVideoScrub
            ? gsap.utils.clamp(0, 1, visualProgress)
            : easeInOutCubic(gsap.utils.clamp(0, 1, visualProgress));
          const media = gsap.utils.clamp(0, 1, mediaProgress);
          const duration = video.duration;

          if (
            !skipVideoSeek &&
            videoScrubReady &&
            videoScrub &&
            Number.isFinite(duration) &&
            duration > 0
          ) {
            videoScrub.setTargetTime(
              cinematicScrubTimeFromProgress(media, duration, videoStartTime)
            );
          }

          const copyIn = hideOverlayCopy
            ? 0
            : priority
              ? 1 - easeOutCubic(gsap.utils.clamp(0, 1, scrollProgress / 0.28))
              : easeOutCubic(gsap.utils.clamp(0, 1, (scrollProgress - 0.03) / 0.22));
          const copyOut = hideOverlayCopy
            ? 0
            : easeOutCubic(gsap.utils.clamp(0, 1, (scrollProgress - 0.58) / 0.16));
          const copyAlpha = copyIn * (1 - copyOut);
          const hintFade = hideScrollHint
            ? 0
            : priority
              ? gsap.utils.clamp(0, 1, 1 - scrollProgress / 0.12)
              : gsap.utils.clamp(0, 1, 1 - scrollProgress / 0.08);

          gsap.set(videoWrap, {
            scale:
              disableVideoScale || touchScroll
                ? 1
                : gsap.utils.interpolate(1.06, 1, scrollProgress),
            force3D: true,
            overwrite: "auto",
          });

          gsap.set(overlay, {
            opacity: hideOverlayCopy
              ? gsap.utils.interpolate(0.18, 0.08, scrollProgress)
              : gsap.utils.interpolate(0.48, 0.22, scrollProgress),
            overwrite: "auto",
          });

          if (copy) {
            gsap.set(copy, {
              autoAlpha: copyAlpha,
              y:
                gsap.utils.interpolate(28, 0, copyIn) +
                gsap.utils.interpolate(0, -18, copyOut),
              force3D: true,
              overwrite: "auto",
            });
          }

          if (hint) {
            gsap.set(hint, {
              autoAlpha: hintFade,
              y: gsap.utils.interpolate(0, -10, 1 - hintFade),
              force3D: true,
              overwrite: "auto",
            });
          }

          gsap.set(progress, {
            scaleX: scrollProgress,
            transformOrigin: "left center",
            force3D: true,
            overwrite: "auto",
          });
        };

        gsap.set(videoWrap, {
          scale: disableVideoScale || touchScroll ? 1 : 1.06,
          force3D: true,
        });
        gsap.set(overlay, { opacity: hideOverlayCopy ? 0.18 : 0.48 });
        if (priority && copy && !hideOverlayCopy) {
          gsap.set(copy, { autoAlpha: 1, y: 0, force3D: true });
        } else if (copy) {
          gsap.set(copy, { autoAlpha: 0, y: 28, force3D: true });
        }
        if (hint && !hideScrollHint) {
          gsap.set(hint, { autoAlpha: priority ? 1 : 1, y: 0, force3D: true });
        } else if (hint) {
          gsap.set(hint, { autoAlpha: 0, y: 0, force3D: true });
        }
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

        const applyVideoFromScroll = (progress: number) => {
          const duration = video.duration;
          if (
            videoScrubReady &&
            videoScrub &&
            Number.isFinite(duration) &&
            duration > 0
          ) {
            videoScrub.setTargetTime(
              cinematicScrubTimeFromProgress(progress, duration, videoStartTime)
            );
          }
        };

        const scrollTriggerConfig = directVideoScrub
          ? {
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
              },
              onUpdate: (self: { progress: number }) => {
                const progress = gsap.utils.clamp(0, 1, self.progress);
                scrollTarget = progress;
                applyVideoFromScroll(progress);
                applyProgress(progress, progress, true);
              },
            }
          : bindScrollProgressLock(progressLock, {
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
                snapUnlockedStart();
              },
              onUpdate: (progress) => {
                scrollTarget = progress;
              },
              onLockedEnd: snapLockedEnd,
            });

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
          ...scrollTriggerConfig,
        });

        syncScroll = () => {
          if (!priority && !isScrollExperienceReady()) return;
          if (!sectionActive) return;

          if (directVideoScrub) {
            applyVideoFromScroll(scrollTarget);
            applyProgress(scrollTarget, scrollTarget, true);
            return;
          }

          const { visual, media } = progressSmoother.step(
            scrollTarget,
            tickerDeltaSeconds(gsap)
          );
          applyProgress(visual, media);
        };

        gsap.ticker.add(syncScroll);
        ScrollTrigger.refresh();
        syncScroll();
        sectionObserver?.disconnect();
        sectionObserver = undefined;
        setupComplete = true;
        setupInFlight = false;
        if (priority) markHomeHeroScrollReady();
      }, root);
    };

    const runSetup = () => {
      if (typeof window !== "undefined" && !window.__lenisInitialized) {
        onLenisInit(runSetup);
        return;
      }
      if (setupComplete || setupInFlight) return;
      void setup();
    };

    const queueSetup = () => {
      if (priority || !deferUntilVisible) {
        runSetup();
        return;
      }

      const root = rootRef.current;
      if (!root) {
        window.setTimeout(queueSetup, 120);
        return;
      }

      sectionObserver?.disconnect();
      sectionObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries.some((entry) => entry.isIntersecting);
          if (!visible) return;

          const video = videoRef.current;
          if (video) beginVideoPreload(video);

          runSetup();
        },
        { rootMargin: "2200px 0px", threshold: 0 }
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

    const setupRetry = window.setTimeout(queueSetup, priority ? 80 : 600);
    const setupRetryLate = window.setTimeout(queueSetup, priority ? 300 : 1500);

    return () => {
      cancelled = true;
      window.clearTimeout(setupRetry);
      window.clearTimeout(setupRetryLate);
      removeLenisListener();
      sectionObserver?.disconnect();
      const { gsap } = getGsap();
      if (syncScroll) gsap.ticker.remove(syncScroll);
      stopScrubWaiting?.();
      detachVideoScrub?.();
      ctx?.revert();
    };
  }, [deferUntilVisible, directVideoScrub, disableVideoScale, hideOverlayCopy, hideScrollHint, priority, scrollId, scrollProgressSmoothing, responsiveScrollVh, videoScrubOptions, videoStartTime, warmPromiseKey]);

  return (
    <section
      id={scrollId}
      ref={rootRef}
      data-video-ready={videoReady ? "" : undefined}
      data-priority={priority ? "" : undefined}
      className={`cinematic-video-scroll product-video-scroll product-video-scroll-zone relative ${t.section}`}
      aria-label={ariaLabel}
    >
      <div
        ref={sequenceRef}
        className={`cinematic-video-scroll__sequence relative ${t.sequence}`}
        style={{ height: `${responsiveScrollVh}vh` }}
      >
        <div ref={pinRef} className="relative h-[100svh] w-full overflow-hidden">
          <div
            ref={videoWrapRef}
            className="cinematic-video-scroll__wrap absolute inset-0"
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
              className="cinematic-video-scroll__video h-full w-full object-cover [transform:translateZ(0)]"
              style={{
                objectPosition: videoObjectPosition,
                transform: videoTransform
                  ? `${videoTransform} translateZ(0)`
                  : undefined,
              }}
              src={src}
              poster={poster}
              muted
              playsInline
              preload="auto"
              {...(priority || warmPromiseKey
                ? { fetchPriority: "high" as const }
                : {})}
              aria-label={videoAriaLabel}
            />
          </div>

          <div
            ref={overlayRef}
            className={`pointer-events-none absolute inset-0 ${t.overlay}`}
          />

          {variantLabel && !hideVariantLabel ? (
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
              <div
                className={
                  videoLogoOverlay.backdropClassName ??
                  "rounded-md bg-[#120c06]/45 px-2 py-1.5 backdrop-blur-[3px] ring-1 ring-white/10"
                }
              >
                <BrandLogo
                  size="nav"
                  variant="white"
                  href={null}
                  className={`drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] ${videoLogoOverlay.logoClassName ?? "!h-11 !w-auto !min-w-0 !max-w-[118px]"}`}
                />
              </div>
            </div>
          ) : null}

          {!hideOverlayCopy ? (
            <div className="relative z-[2] flex h-full items-center justify-center px-5 pb-16 pt-20 max-md:px-4 max-md:pb-20 max-md:pt-24 md:px-12">
              <div ref={copyRef} data-cinematic-overlay className="max-w-3xl text-center">
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
                  className={`mx-auto mt-4 max-w-xl font-body text-[13px] leading-[1.8] max-md:px-1 md:mt-6 md:text-base md:leading-[1.85] ${subtextClassName ?? t.subtext}`}
                >
                  {subtext}
                </p>
              </div>
            </div>
          ) : null}

          {!hideScrollHint ? (
            <p
              ref={hintRef}
              data-cinematic-hint
              className={`pointer-events-none absolute bottom-8 left-1/2 z-[3] max-md:bottom-6 -translate-x-1/2 font-sans text-[8px] uppercase tracking-[0.36em] md:bottom-10 md:text-[9px] md:tracking-[0.42em] ${t.hint}`}
            >
              {sequenceLabel}
            </p>
          ) : null}

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
