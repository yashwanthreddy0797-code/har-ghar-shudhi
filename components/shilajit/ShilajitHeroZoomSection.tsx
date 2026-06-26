"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap/client";
import { isScrollExperienceReady, onLenisInit } from "@/lib/scroll/lenisReady";
import {
  useResponsiveScrollHeight,
  preferNativeScroll,
  shilajitHeroScrollHeightForViewport,
} from "@/lib/scroll/responsiveScroll";
import { SHILAJIT_HERO_ZOOM } from "@/lib/hero/shilajitHeroZoomConfig";
import {
  bindScrollProgressLock,
  createScrollProgressLock,
} from "@/lib/scroll/scrollProgressLock";

const SCROLL_ID = "shilajit-hero-zoom";
const DESKTOP_START_SCALE = 0.52;
const MOBILE_START_SCALE = 0.64;
/** Max 1 — assembly is stage-height; scaling above 1 clips the jar lid */
const END_SCALE = 1;

export default function ShilajitHeroZoomSection() {
  const rootRef = useRef<HTMLElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const blackVeilRef = useRef<HTMLDivElement>(null);
  const warmGlowRef = useRef<HTMLDivElement>(null);
  const assemblyRef = useRef<HTMLDivElement>(null);
  const leftPropRef = useRef<HTMLDivElement>(null);
  const rightPropRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const responsiveScrollVh = useResponsiveScrollHeight(
    SHILAJIT_HERO_ZOOM.scrollHeightVh,
    shilajitHeroScrollHeightForViewport
  );

  useLayoutEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    let syncScroll: (() => void) | undefined;

    const setup = () => {
      if (cancelled) return;

      const root = rootRef.current;
      const sequence = sequenceRef.current;
      const pin = pinRef.current;
      const stage = stageRef.current;
      const assembly = assemblyRef.current;
      const leftProp = leftPropRef.current;
      const rightProp = rightPropRef.current;
      if (
        !root ||
        !sequence ||
        !pin ||
        !stage ||
        !assembly ||
        !leftProp ||
        !rightProp
      ) {
        return;
      }

      const img = assembly.querySelector(
        "img[data-role='product']"
      ) as HTMLImageElement | null;
      if (!img || img.offsetHeight <= 0 || stage.clientHeight <= 0) return;

      const { gsap, ScrollTrigger } = getGsap();
      ctx?.revert();

      ctx = gsap.context(() => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        const touchScroll = preferNativeScroll();
        const startScale = touchScroll ? MOBILE_START_SCALE : DESKTOP_START_SCALE;
        const propOffsetX = touchScroll ? 28 : 48;
        const propOffsetY = touchScroll ? 10 : 14;

        const phaseSplit = SHILAJIT_HERO_ZOOM.phaseSplit;
        const getStageH = () => stage.clientHeight;

        const getEndScale = () => {
          if (touchScroll) return END_SCALE;
          const stageH = getStageH();
          const imgH = img.offsetHeight;
          if (imgH <= 0 || stageH <= 0) return END_SCALE;
          return Math.min(END_SCALE, stageH / imgH);
        };

        const applyAssembly = (progress: number) => {
          const moveEase = gsap.parseEase("power3.inOut")(progress);
          const scaleEase = gsap.parseEase("power2.out")(progress);
          const endScale = getEndScale();
          const scale = gsap.utils.interpolate(startScale, endScale, scaleEase);
          const stageH = getStageH();
          const startBottom = touchScroll
            ? 10
            : stageH * (1 - startScale) * 0.5;

          gsap.set(assembly, {
            left: "50%",
            bottom: gsap.utils.interpolate(startBottom, 0, moveEase),
            xPercent: -50,
            y: 0,
            scale,
            transformOrigin: "50% 100%",
            force3D: true,
            autoAlpha: 1,
            overwrite: "auto",
          });
        };

        const applyProps = (progress: number) => {
          const leftPop = gsap.parseEase("back.out(1.4)")(
            gsap.utils.clamp(0, 1, progress / 0.78)
          );
          const rightPop = gsap.parseEase("back.out(1.4)")(
            gsap.utils.clamp(0, 1, (progress - 0.1) / 0.78)
          );

          gsap.set(leftProp, {
            x: gsap.utils.interpolate(propOffsetX, 0, leftPop),
            y: gsap.utils.interpolate(propOffsetY, 0, leftPop),
            rotation: gsap.utils.interpolate(-6, 0, leftPop),
            scale: gsap.utils.interpolate(touchScroll ? 0.62 : 0.52, 1, leftPop),
            transformOrigin: "65% 100%",
            force3D: true,
            autoAlpha: leftPop,
            overwrite: "auto",
          });

          gsap.set(rightProp, {
            x: gsap.utils.interpolate(-propOffsetX, 0, rightPop),
            y: gsap.utils.interpolate(propOffsetY, 0, rightPop),
            rotation: gsap.utils.interpolate(8, 0, rightPop),
            scale: gsap.utils.interpolate(touchScroll ? 0.6 : 0.5, 1, rightPop),
            transformOrigin: "35% 100%",
            force3D: true,
            autoAlpha: rightPop,
            overwrite: "auto",
          });
        };

        gsap.set(assembly, { autoAlpha: 0 });
        gsap.set(leftProp, {
          autoAlpha: 0,
          x: propOffsetX,
          y: propOffsetY,
          scale: touchScroll ? 0.62 : 0.52,
          rotation: -6,
        });
        gsap.set(rightProp, {
          autoAlpha: 0,
          x: -propOffsetX,
          y: propOffsetY,
          scale: touchScroll ? 0.6 : 0.5,
          rotation: 8,
        });

        gsap.set(bgRef.current, { autoAlpha: 0 });
        gsap.set(bgImageRef.current, { scale: 1.08 });
        gsap.set(blackVeilRef.current, { autoAlpha: 1 });
        gsap.set(warmGlowRef.current, { autoAlpha: 0 });
        gsap.set(headlineRef.current, { autoAlpha: 0.15 });
        gsap.set(scrollHintRef.current, { autoAlpha: 1 });
        gsap.set(progressRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        const applyProgress = (rawProgress: number) => {
          const progress = gsap.utils.clamp(0, 1, rawProgress);

          if (progress <= phaseSplit) {
            const phase1 = progress / phaseSplit;
            const bgPhase = gsap.parseEase("power2.out")(phase1);

            applyAssembly(phase1);
            applyProps(0);

            if (bgRef.current) {
              gsap.set(bgRef.current, { autoAlpha: bgPhase, overwrite: "auto" });
            }
            if (bgImageRef.current) {
              gsap.set(bgImageRef.current, {
                scale: gsap.utils.interpolate(1.08, 1, bgPhase),
                overwrite: "auto",
              });
            }
            if (blackVeilRef.current) {
              gsap.set(blackVeilRef.current, {
                autoAlpha: gsap.utils.interpolate(1, 0, bgPhase),
                overwrite: "auto",
              });
            }
            if (warmGlowRef.current) {
              gsap.set(warmGlowRef.current, {
                autoAlpha: gsap.utils.clamp(0, 1, (phase1 - 0.35) / 0.5) * 0.5,
                overwrite: "auto",
              });
            }
            if (headlineRef.current) {
              const textPhase = gsap.utils.clamp(0, 1, phase1 / 0.65);
              gsap.set(headlineRef.current, {
                autoAlpha: gsap.utils.interpolate(0.15, 1, textPhase),
                overwrite: "auto",
              });
            }
            if (scrollHintRef.current) {
              gsap.set(scrollHintRef.current, {
                autoAlpha: phase1 > 0.08 ? 0 : 1,
                overwrite: "auto",
              });
            }
          } else {
            const phase2 = (progress - phaseSplit) / (1 - phaseSplit);

            applyAssembly(1);
            applyProps(phase2);

            if (bgRef.current) gsap.set(bgRef.current, { autoAlpha: 1, overwrite: "auto" });
            if (bgImageRef.current) gsap.set(bgImageRef.current, { scale: 1, overwrite: "auto" });
            if (blackVeilRef.current) gsap.set(blackVeilRef.current, { autoAlpha: 0, overwrite: "auto" });
            if (warmGlowRef.current) gsap.set(warmGlowRef.current, { autoAlpha: 0.5, overwrite: "auto" });
            if (headlineRef.current) gsap.set(headlineRef.current, { autoAlpha: 1, overwrite: "auto" });
            if (scrollHintRef.current) gsap.set(scrollHintRef.current, { autoAlpha: 0, overwrite: "auto" });
          }

          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleX: progress,
              transformOrigin: "left center",
              overwrite: "auto",
            });
          }
        };

        if (reducedMotion) {
          applyProgress(1);
          return;
        }

        const progressLock = createScrollProgressLock();

        ScrollTrigger.create({
          id: SCROLL_ID,
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
          ...bindScrollProgressLock(progressLock, {
            onLeaveBack: () => applyProgress(0),
            onLockedEnd: () => applyProgress(1),
          }),
          onRefresh: () => {
            const st = ScrollTrigger.getById(SCROLL_ID);
            if (!st) return;
            applyProgress(progressLock.resolve(st.progress, st.direction));
          },
        });

        syncScroll = () => {
          if (!isScrollExperienceReady()) return;

          const st = ScrollTrigger.getById(SCROLL_ID);
          if (st) {
            applyProgress(progressLock.resolve(st.progress, st.direction));
            return;
          }

          const total = sequence.offsetHeight - window.innerHeight;
          if (total <= 0) return;
          const scrolled = gsap.utils.clamp(
            0,
            total,
            -sequence.getBoundingClientRect().top
          );
          applyProgress(scrolled / total);
        };

        gsap.ticker.add(syncScroll);
        ScrollTrigger.refresh();
        applyProgress(0);
        syncScroll();
      }, root);
    };

    const trySetup = () => {
      if (cancelled) return;
      if (typeof window !== "undefined" && !window.__lenisInitialized) return;
      const img = assemblyRef.current?.querySelector(
        "img[data-role='product']"
      ) as HTMLImageElement | null;
      if (img && img.offsetHeight > 0) {
        setup();
      }
    };

    const removeLenisListener = onLenisInit(() => {
      trySetup();
      requestAnimationFrame(() => getGsap().ScrollTrigger.refresh());
      window.setTimeout(() => getGsap().ScrollTrigger.refresh(), 800);
    });

    if (typeof window !== "undefined" && window.__lenisInitialized) {
      trySetup();
    }

    const imgEl = assemblyRef.current?.querySelector(
      "img[data-role='product']"
    ) as HTMLImageElement | null;
    const onImgLoad = () => trySetup();
    if (imgEl?.complete && imgEl.naturalHeight > 0) {
      trySetup();
    } else {
      imgEl?.addEventListener("load", onImgLoad, { once: true });
    }

    const setupRetry = window.setTimeout(trySetup, 600);
    const setupRetryLate = window.setTimeout(trySetup, 1500);

    return () => {
      cancelled = true;
      imgEl?.removeEventListener("load", onImgLoad);
      window.clearTimeout(setupRetry);
      window.clearTimeout(setupRetryLate);
      removeLenisListener();
      if (syncScroll) getGsap().gsap.ticker.remove(syncScroll);
      ctx?.revert();
    };
  }, [responsiveScrollVh]);

  const { image, background, props, headline, scrollLabel } = SHILAJIT_HERO_ZOOM;

  return (
    <section
      ref={rootRef}
      className="shilajit-hero-zoom relative bg-black"
      aria-label="Shilajit product reveal"
    >
      <div
        ref={sequenceRef}
        className="relative bg-black"
        style={{ height: `${responsiveScrollVh}vh` }}
      >
        <div
          ref={pinRef}
          className="relative h-[100svh] w-full overflow-hidden bg-black"
        >
          <div ref={bgRef} className="absolute inset-0 z-0 opacity-0">
            <div
              ref={bgImageRef}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={background.src}
                alt={background.alt}
                fill
                quality={100}
                unoptimized
                sizes="100vw"
                className="object-cover object-[center_32%] max-md:object-[center_38%]"
                priority={false}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/25" />
          </div>

          <div
            ref={blackVeilRef}
            className="pointer-events-none absolute inset-0 z-[1] bg-black"
          />

          <div
            ref={warmGlowRef}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[50%] opacity-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_100%,rgba(201,169,98,0.32)_0%,rgba(139,105,20,0.12)_40%,transparent_72%)] max-md:h-[58%] max-md:bg-[radial-gradient(ellipse_110%_85%_at_50%_100%,rgba(201,169,98,0.38)_0%,rgba(139,105,20,0.14)_42%,transparent_74%)]"
          />

          <div
            ref={headlineRef}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 z-[5] top-[10%] max-md:top-[9%] md:top-[36%]"
          >
            <div className="mx-auto flex max-w-lg flex-col items-center gap-0.5 px-5 md:hidden">
              <h2 className="font-serif text-center text-[clamp(1.45rem,6.6vw,2rem)] font-light leading-[0.98] tracking-[0.03em] text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                {headline.primary}
              </h2>
              <h2 className="font-serif text-center text-[clamp(1.45rem,6.6vw,2rem)] font-light leading-[0.98] tracking-[0.03em] text-white/85 drop-shadow-[0_0_30px_rgba(255,255,255,0.12)]">
                {headline.secondary}
              </h2>
            </div>
            <div className="hidden md:block">
              <h2 className="absolute left-0 max-w-[46vw] translate-x-[2vw] font-serif text-left text-[clamp(2.25rem,6.5vw,5.25rem)] font-light leading-[0.92] tracking-[0.03em] text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] lg:translate-x-0">
                {headline.primary}
              </h2>
              <h2 className="absolute right-0 max-w-[46vw] -translate-x-[2vw] font-serif text-right text-[clamp(2.25rem,6.5vw,5.25rem)] font-light leading-[0.92] tracking-[0.03em] text-black drop-shadow-[0_0_30px_rgba(255,255,255,0.12)] lg:translate-x-0">
                {headline.secondary}
              </h2>
            </div>
          </div>

          <div
            ref={stageRef}
            className="shilajit-hero-zoom__stage absolute inset-x-0 bottom-0 top-[4.75rem] z-[10] max-md:top-[4.75rem] max-md:pb-3 md:top-[4.5rem]"
          >
            <div
              ref={assemblyRef}
              className="shilajit-hero-zoom__assembly gpu-layer absolute bottom-0 left-1/2 w-full max-md:w-[min(92vw,400px)] will-change-transform opacity-0 md:h-full md:w-auto"
            >
              <div className="relative w-full md:h-full md:w-auto">
                <Image
                  data-role="product"
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  quality={100}
                  unoptimized
                  sizes="(max-width: 767px) 92vw, 50vw"
                  className="shilajit-hero-zoom__jar relative z-[2] block h-auto w-full object-contain object-bottom md:h-full md:w-auto md:max-w-none"
                  priority={false}
                />

                <div
                  ref={leftPropRef}
                  className="shilajit-hero-zoom__prop shilajit-hero-zoom__prop--left gpu-layer pointer-events-none absolute bottom-[19%] left-[1%] z-[3] will-change-transform opacity-0 md:bottom-[29%] md:left-[14%] md:-translate-x-1/2"
                >
                  <Image
                    src={props.left.src}
                    alt={props.left.alt}
                    width={props.left.width}
                    height={props.left.height}
                    quality={100}
                    unoptimized
                    className="block h-[clamp(76px,15svh,118px)] w-auto max-w-[36vw] object-contain object-bottom drop-shadow-[0_14px_30px_rgba(0,0,0,0.52)] md:h-[min(12.5vh,108px)] md:max-w-none"
                    priority={false}
                  />
                </div>

                <div
                  ref={rightPropRef}
                  className="shilajit-hero-zoom__prop shilajit-hero-zoom__prop--right gpu-layer pointer-events-none absolute bottom-[19%] right-[1%] z-[3] will-change-transform opacity-0 md:bottom-[29%] md:right-[14%] md:translate-x-1/2"
                >
                  <Image
                    src={props.right.src}
                    alt={props.right.alt}
                    width={props.right.width}
                    height={props.right.height}
                    quality={100}
                    unoptimized
                    className="block h-[clamp(72px,14svh,110px)] w-auto max-w-[34vw] object-contain object-bottom drop-shadow-[0_14px_30px_rgba(0,0,0,0.58)] md:h-[min(12.5vh,108px)] md:max-w-none"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>

          <p
            ref={scrollHintRef}
            className="pointer-events-none absolute bottom-8 left-1/2 z-[20] -translate-x-1/2 font-sans text-[9px] uppercase tracking-[0.4em] text-white/45"
          >
            {scrollLabel}
          </p>

          <div className="absolute bottom-0 left-0 right-0 z-[20] h-px bg-white/15">
            <div
              ref={progressRef}
              className="h-full w-full origin-left bg-[#c9a962]/60"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
