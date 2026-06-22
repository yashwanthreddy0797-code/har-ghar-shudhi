"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { getGsap } from "@/lib/gsap/client";
import {
  drawCoverFrame,
  preloadFrameImages,
  sizeHeroCanvas,
} from "@/lib/hero/preloadFrameImages";
import { LUXURY_SEQUENCE_SCROLL } from "@/lib/hero/luxurySequenceScrollConfig";
import { isScrollExperienceReady, onLenisInit } from "@/lib/scroll/lenisReady";
import {
  createScrollProgressSmoother,
  easeInOutCubic,
  easeOutCubic,
  tickerDeltaSeconds,
} from "@/lib/scroll/smoothProgress";

const SCROLL_ID = "luxury-brand-sequence-scroll";

export default function LuxurySequenceScrollSection() {
  const rootRef = useRef<HTMLElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameWrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const preloadedFramesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameIndexRef = useRef(-1);

  const {
    frames,
    scrollHeightVh,
    variantLabel,
    eyebrow,
    headline,
    subtext,
    sequenceLabel,
    closing,
  } = LUXURY_SEQUENCE_SCROLL;

  useLayoutEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    let setupAttempts = 0;
    let syncScroll: (() => void) | undefined;
    let onCanvasResize: (() => void) | undefined;
    let stageResizeObserver: ResizeObserver | undefined;
    let sectionObserver: IntersectionObserver | undefined;
    let setupStarted = false;

    const setup = async () => {
      if (cancelled) return;

      const root = rootRef.current;
      const sequence = sequenceRef.current;
      const pin = pinRef.current;
      const stage = stageRef.current;
      const frameWrap = frameWrapRef.current;
      const canvas = canvasRef.current;
      const overlay = overlayRef.current;
      const copy = copyRef.current;
      const hint = hintRef.current;
      const progress = progressRef.current;

      if (
        !root ||
        !sequence ||
        !pin ||
        !stage ||
        !frameWrap ||
        !canvas ||
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

      if (stage.clientWidth <= 0 || stage.clientHeight <= 0) {
        if (setupAttempts < 24 && !cancelled) {
          setupAttempts += 1;
          requestAnimationFrame(() => void setup());
        }
        return;
      }

      if (preloadedFramesRef.current.length !== frames.length) {
        preloadedFramesRef.current = await preloadFrameImages(
          frames.map((frame) => frame.src)
        );
      }
      if (cancelled) return;

      const canvasCtx = sizeHeroCanvas(canvas, stage);
      if (!canvasCtx) {
        if (setupAttempts < 24 && !cancelled) {
          setupAttempts += 1;
          requestAnimationFrame(() => void setup());
        }
        return;
      }

      const { gsap, ScrollTrigger } = getGsap();
      ctx?.revert();

      const frameCount = frames.length;
      const preloaded = preloadedFramesRef.current;

      const paintFrame = (index: number) => {
        const idx = Math.min(frameCount - 1, Math.max(0, index));
        const img = preloaded[idx];
        if (!img?.complete) return false;

        const sized = sizeHeroCanvas(canvas, stage) ?? canvasCtx;
        const width = stage.clientWidth;
        const height = stage.clientHeight;
        if (width <= 0 || height <= 0) return false;

        drawCoverFrame(sized, img, width, height);
        currentFrameIndexRef.current = idx;
        return true;
      };

      const setFrame = (index: number) => {
        const idx = Math.min(frameCount - 1, Math.max(0, index));
        if (idx === currentFrameIndexRef.current) return;

        const img = preloaded[idx];
        if (!img) return;
        if (!img.complete) {
          img.addEventListener("load", () => setFrame(index), { once: true });
          return;
        }
        paintFrame(idx);
      };

      ctx = gsap.context(() => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        const progressSmoother = createScrollProgressSmoother({
          visualSmoothness: 0.14,
          mediaSmoothness: 0.18,
        });

        const applyProgress = (visualProgress: number, mediaProgress: number) => {
          const scrollProgress = easeInOutCubic(gsap.utils.clamp(0, 1, visualProgress));
          const media = gsap.utils.clamp(0, 1, mediaProgress);
          setFrame(Math.round(media * (frameCount - 1)));

          const copyIn = easeOutCubic(gsap.utils.clamp(0, 1, (scrollProgress - 0.03) / 0.22));
          const copyOut = easeOutCubic(gsap.utils.clamp(0, 1, (scrollProgress - 0.58) / 0.16));
          const copyAlpha = copyIn * (1 - copyOut);
          const hintFade = gsap.utils.clamp(0, 1, 1 - scrollProgress / 0.08);

          gsap.set(frameWrap, {
            scale: gsap.utils.interpolate(1.08, 1, scrollProgress),
            force3D: true,
            overwrite: "auto",
          });

          gsap.set(overlay, {
            opacity: gsap.utils.interpolate(0.55, 0.28, scrollProgress),
            overwrite: "auto",
          });

          gsap.set(copy, {
            autoAlpha: copyAlpha,
            y:
              gsap.utils.interpolate(32, 0, copyIn) +
              gsap.utils.interpolate(0, -22, copyOut),
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

        gsap.set(frameWrap, { scale: 1.08, force3D: true });
        gsap.set(overlay, { opacity: 0.55 });
        gsap.set(copy, { autoAlpha: 0, y: 32, force3D: true });
        gsap.set(hint, { autoAlpha: 1, y: 0, force3D: true });
        gsap.set(progress, {
          scaleX: 0,
          transformOrigin: "left center",
          force3D: true,
        });

        onCanvasResize = () => {
          const idx =
            currentFrameIndexRef.current >= 0 ? currentFrameIndexRef.current : 0;
          paintFrame(idx);
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onCanvasResize);
        stageResizeObserver = new ResizeObserver(() => onCanvasResize?.());
        stageResizeObserver.observe(stage);

        if (reducedMotion) {
          currentFrameIndexRef.current = -1;
          paintFrame(frameCount - 1);
          progressSmoother.reset(1);
          applyProgress(1, 1);
          return;
        }

        progressSmoother.reset(0);

        currentFrameIndexRef.current = -1;
        paintFrame(0);

        ScrollTrigger.create({
          id: SCROLL_ID,
          trigger: sequence,
          scroller: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          pin,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        });

        syncScroll = () => {
          if (!isScrollExperienceReady()) return;

          const resolveTarget = () => {
            const st = ScrollTrigger.getById(SCROLL_ID);
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

    const queueSetupWhenNear = () => {
      const root = rootRef.current;
      if (!root) {
        window.setTimeout(queueSetupWhenNear, 120);
        return;
      }

      sectionObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            runSetup();
            sectionObserver?.disconnect();
          }
        },
        { rootMargin: "1400px 0px" }
      );
      sectionObserver.observe(root);
    };

    const removeLenisListener = onLenisInit(() => {
      queueSetupWhenNear();
      requestAnimationFrame(() => getGsap().ScrollTrigger.refresh());
      window.setTimeout(() => getGsap().ScrollTrigger.refresh(), 800);
    });

    if (typeof window !== "undefined" && window.__lenisInitialized) {
      queueSetupWhenNear();
    }

    const setupRetry = window.setTimeout(queueSetupWhenNear, 600);

    return () => {
      cancelled = true;
      window.clearTimeout(setupRetry);
      removeLenisListener();
      sectionObserver?.disconnect();
      if (onCanvasResize) window.removeEventListener("resize", onCanvasResize);
      stageResizeObserver?.disconnect();
      const { gsap } = getGsap();
      if (syncScroll) gsap.ticker.remove(syncScroll);
      ctx?.revert();
    };
  }, [frames]);

  return (
    <section
      ref={rootRef}
      className="luxury-sequence-scroll product-video-scroll product-video-scroll-zone relative bg-[#060504]"
      aria-label="Har Ghar Shudhi frame sequence experience"
    >
      <div
        ref={sequenceRef}
        className="luxury-sequence-scroll__sequence relative bg-[#060504]"
        style={{ height: `${scrollHeightVh}vh` }}
      >
        <div ref={pinRef} className="relative h-[100svh] w-full overflow-hidden">
          <div ref={frameWrapRef} className="luxury-sequence-scroll__wrap absolute inset-0">
            <div ref={stageRef} className="absolute inset-0">
              <canvas
                ref={canvasRef}
                className="luxury-sequence-scroll__canvas block h-full w-full"
                aria-hidden
              />
            </div>
          </div>

          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.68)_100%)]"
          />

          <p className="pointer-events-none absolute right-6 top-8 z-[4] rounded-full border border-white/10 bg-black/35 px-3 py-1 font-sans text-[9px] uppercase tracking-[0.28em] text-white/55 backdrop-blur-sm md:right-10">
            {variantLabel}
          </p>

          <div className="relative z-[2] flex h-full items-center justify-center px-6 md:px-12">
            <div ref={copyRef} className="max-w-3xl text-center">
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.34em] text-[#c9a962]/85">
                {eyebrow}
              </p>
              <h2 className="mt-5 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-medium leading-[1.02] tracking-[0.02em] text-[#f7f2ea]">
                {headline[0]}
                <br />
                <span className="text-[#c9a962]">{headline[1]}</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl font-body text-sm leading-[1.85] text-[#d8cdbb]/88 md:text-base">
                {subtext}
              </p>
            </div>
          </div>

          <p
            ref={hintRef}
            className="pointer-events-none absolute bottom-10 left-1/2 z-[3] -translate-x-1/2 font-sans text-[9px] uppercase tracking-[0.42em] text-white/45"
          >
            {sequenceLabel}
          </p>

          <div className="absolute bottom-0 left-0 right-0 z-[3] h-px bg-white/10">
            <div ref={progressRef} className="h-full w-full origin-left bg-[#c9a962]/75" />
          </div>
        </div>
      </div>

      <div className="relative z-[2] border-t border-white/10 bg-[#0b0908] px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#c9a962]">
              {closing.eyebrow}
            </p>
            <h3 className="mt-4 max-w-xl font-display text-3xl font-medium leading-[1.12] tracking-[0.02em] text-[#f5efe4] md:text-4xl">
              {closing.title}
            </h3>
          </div>
          <Link
            href={closing.link.href}
            className="inline-flex items-center gap-2 font-shop text-xs uppercase tracking-[0.2em] text-[#d8c08a] transition-colors hover:text-[#c9a962]"
          >
            {closing.link.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
