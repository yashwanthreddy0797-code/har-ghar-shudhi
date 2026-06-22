"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getGsap } from "@/lib/gsap/client";
import {
  drawFrameToCanvas,
  preloadFrameImages,
  sizeHeroCanvas,
} from "@/lib/hero/preloadFrameImages";
import { onLenisInit, isScrollExperienceReady } from "@/lib/scroll/lenisReady";
import type { ProductScrollConfig } from "@/lib/hero/productScrollConfig";
import AshwagandhaHeroCallouts from "@/components/hero/AshwagandhaHeroCallouts";
import HoneyHeroCallouts from "@/components/hero/HoneyHeroCallouts";
import MoringaHeroCallouts from "@/components/hero/MoringaHeroCallouts";
import {
  ASHWAGANDHA_HERO_CALLOUTS_ALL,
  ASHWAGANDHA_HERO_CALLOUTS_LEFT,
  ASHWAGANDHA_HERO_CALLOUTS_RIGHT,
} from "@/lib/hero/ashwagandhaContent";
import {
  HONEY_HERO_CALLOUTS_ALL,
  HONEY_HERO_CALLOUTS_LEFT,
  HONEY_HERO_CALLOUTS_RIGHT,
} from "@/lib/hero/honeyContent";
import {
  MORINGA_HERO_CALLOUTS_LEFT,
  MORINGA_HERO_CALLOUTS_RIGHT,
} from "@/lib/hero/moringaContent";

const BOTTLE_FRAME_SIZE =
  "block h-full w-full max-w-none object-contain object-bottom";

const BOTTLE_LAYER_SIZE =
  "h-auto w-[min(320px,78vw)] max-w-none object-contain object-bottom sm:w-[min(400px,62vw)] md:w-[min(440px,36vw)] lg:w-[min(500px,32vw)]";

const BOTTLE_STACK_SIZE =
  "relative mx-auto h-[min(720px,78vh)] w-full max-w-[min(420px,88vw)] sm:max-w-[min(540px,76vw)] md:h-[min(780px,80vh)] md:max-w-[min(600px,48vw)] lg:max-w-[min(640px,44vw)] lg:h-[min(820px,82vh)]";

const HONEY_BOTTLE_STACK_SIZE =
  "relative mx-auto h-[min(1440px,90vh)] w-full max-w-[min(840px,96vw)] sm:max-w-[min(1080px,92vw)] md:h-[min(1560px,92vh)] md:max-w-[min(1200px,88vw)] lg:max-w-[min(1280px,88vw)] lg:h-[min(1640px,92vh)]";

const HERO_BOTTLE_COLUMN =
  "hero-bottle-stage relative z-[15] flex min-h-[min(520px,68vh)] w-full -translate-x-8 -translate-y-12 items-center justify-center sm:-translate-x-9 sm:-translate-y-14 md:min-h-[780px] md:w-[min(600px,48vw)] md:-translate-x-10 md:-translate-y-16 lg:min-h-[820px] lg:w-[min(640px,44vw)] lg:-translate-x-12 lg:-translate-y-20 md:justify-self-center";

const MORINGA_HERO_BOTTLE_COLUMN =
  "hero-bottle-stage relative z-[15] flex min-h-[min(520px,68vh)] w-full translate-x-0 -translate-y-12 items-center justify-center sm:-translate-x-1 sm:-translate-y-14 md:min-h-[780px] md:w-[min(600px,48vw)] md:-translate-x-2 md:-translate-y-16 lg:min-h-[820px] lg:w-[min(640px,44vw)] lg:-translate-x-4 lg:-translate-y-20 md:justify-self-center";

const ASHWAGANDHA_HERO_BOTTLE_COLUMN =
  "hero-bottle-stage relative z-[15] flex min-h-[min(520px,68vh)] w-full translate-x-0 -translate-y-12 items-center justify-center sm:-translate-x-1 sm:-translate-y-14 md:min-h-[780px] md:w-[min(600px,48vw)] md:-translate-x-2 md:-translate-y-16 lg:min-h-[820px] lg:w-[min(640px,44vw)] lg:-translate-x-4 lg:-translate-y-20 md:justify-self-center";

const HONEY_HERO_BOTTLE_COLUMN =
  "hero-bottle-stage relative z-[15] flex min-h-[min(1040px,90vh)] w-full translate-x-0 -translate-y-12 items-center justify-center sm:-translate-x-1 sm:-translate-y-14 md:min-h-[1560px] md:w-[min(1200px,88vw)] md:-translate-x-2 md:-translate-y-16 lg:min-h-[1640px] lg:w-[min(1280px,88vw)] lg:-translate-x-4 lg:-translate-y-20 md:justify-self-center";

function heroBottleColumnClass(productId: string) {
  if (productId === "honey") return HONEY_HERO_BOTTLE_COLUMN;
  if (productId === "ashwagandha") return ASHWAGANDHA_HERO_BOTTLE_COLUMN;
  if (productId === "moringa") return MORINGA_HERO_BOTTLE_COLUMN;
  return HERO_BOTTLE_COLUMN;
}

function heroBottleStackClass(productId: string) {
  return productId === "honey" ? HONEY_BOTTLE_STACK_SIZE : BOTTLE_STACK_SIZE;
}

const HERO_CENTER_IMAGE_SIZE =
  "h-auto w-[min(340px,82vw)] max-w-none object-contain sm:w-[min(420px,68vw)] md:w-[min(480px,38vw)] lg:w-[min(540px,34vw)]";

interface ProductScrollExperienceProps {
  config: ProductScrollConfig;
}

function waitForImages(container: HTMLElement | null) {
  if (!container) return Promise.resolve();

  const images = Array.from(container.querySelectorAll("img"));
  return Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        })
    )
  );
}

function preloadImages(urls: string[]) {
  void preloadFrameImages(urls);
}

export default function ProductScrollExperience({
  config,
}: ProductScrollExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const bottleFixedRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const closedRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const capOuterRef = useRef<HTMLDivElement>(null);
  const capInnerRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const heroIntroLeftRef = useRef<HTMLDivElement>(null);
  const heroIntroRightRef = useRef<HTMLDivElement>(null);
  const moringaCalloutsLeftRef = useRef<HTMLDivElement>(null);
  const moringaCalloutsRightRef = useRef<HTMLDivElement>(null);
  const moringaCalloutsMobileRef = useRef<HTMLDivElement>(null);
  const ashwagandhaCalloutsLeftRef = useRef<HTMLDivElement>(null);
  const ashwagandhaCalloutsRightRef = useRef<HTMLDivElement>(null);
  const ashwagandhaCalloutsMobileRef = useRef<HTMLDivElement>(null);
  const honeyCalloutsLeftRef = useRef<HTMLDivElement>(null);
  const honeyCalloutsRightRef = useRef<HTMLDivElement>(null);
  const honeyCalloutsMobileRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preloadedFramesRef = useRef<HTMLImageElement[]>([]);
  const canvasCssSizeRef = useRef({ width: 0, height: 0 });
  const currentFrameIndexRef = useRef(0);

  const { capTuning, assets, theme, frameSequence } = config;
  const showCenterProduct = config.showCenterProduct !== false;
  const heroCenterImage = config.heroCenterImage;
  const hasHeroCenterImage = Boolean(heroCenterImage);
  const hasCenterColumn = showCenterProduct || hasHeroCenterImage;
  const hasFrameSequence = Boolean(frameSequence?.frames.length);
  const hasClosedBottle = Boolean(assets.closed);
  const capFallbackTransform = `translate3d(0, calc(${capTuning.cssYOffsetPercent} * 100%), 0) scale(${capTuning.cssScale}) rotate(${capTuning.cssRotation}deg)`;
  const capFallbackOrigin = `50% ${capTuning.pivotYRatio * 100}%`;
  const sequenceScrollHeightVh = frameSequence?.scrollHeightVh ?? 400;
  const frameDrawAnchor = frameSequence?.anchor;
  const frameDisplayScale = frameSequence?.displayScale ?? 1;
  const animateInHero = hasFrameSequence;
  const isMoringa = config.id === "moringa";
  const isAshwagandha = config.id === "ashwagandha";
  const isHoney = config.id === "honey";
  const showScrollCallouts = isMoringa || isAshwagandha || isHoney;

  const getCalloutSideElements = (): HTMLElement[] => {
    if (isMoringa) {
      return [
        moringaCalloutsLeftRef.current,
        moringaCalloutsRightRef.current,
        moringaCalloutsMobileRef.current,
      ].filter(Boolean) as HTMLElement[];
    }
    if (isAshwagandha) {
      return [
        ashwagandhaCalloutsLeftRef.current,
        ashwagandhaCalloutsRightRef.current,
        ashwagandhaCalloutsMobileRef.current,
      ].filter(Boolean) as HTMLElement[];
    }
    if (isHoney) {
      return [
        honeyCalloutsLeftRef.current,
        honeyCalloutsRightRef.current,
        honeyCalloutsMobileRef.current,
      ].filter(Boolean) as HTMLElement[];
    }
    return [];
  };

  useEffect(() => {
    if (!frameSequence?.frames.length) return;
    preloadImages(frameSequence.frames.map((frame) => frame.src));
  }, [frameSequence]);

  useLayoutEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    let setupAttempts = 0;
    let syncFrames: (() => void) | undefined;
    let onCanvasResize: (() => void) | undefined;
    let stackResizeObserver: ResizeObserver | undefined;

    const setup = async () => {
      if (cancelled || !showCenterProduct) return;

      const { gsap, ScrollTrigger } = getGsap();

      const root = rootRef.current;
      const bottleFixed = bottleFixedRef.current;
      const sequence = sequenceRef.current;
      const pin = pinRef.current;
      const stack = stackRef.current;
      const textOverlay = textOverlayRef.current;

      if (!root || !bottleFixed || !sequence || !pin || !stack) {
        return;
      }

      if (hasFrameSequence && frameSequence) {
        const canvas = canvasRef.current;
        const frames = frameSequence.frames;

        if (!canvas || !frames.length) {
          if (setupAttempts < 20 && !cancelled) {
            setupAttempts += 1;
            requestAnimationFrame(() => {
              void setup();
            });
          }
          return;
        }

        const waitForStackLayout = () =>
          new Promise<void>((resolve) => {
            if (stack.clientWidth > 0 && stack.clientHeight > 0) {
              resolve();
              return;
            }
            const observer = new ResizeObserver(() => {
              if (stack.clientWidth > 0 && stack.clientHeight > 0) {
                observer.disconnect();
                resolve();
              }
            });
            observer.observe(stack);
            requestAnimationFrame(() => {
              if (stack.clientWidth > 0 && stack.clientHeight > 0) {
                observer.disconnect();
                resolve();
              }
            });
          });

        await waitForStackLayout();
        if (cancelled) return;

        const canvasCtx = sizeHeroCanvas(canvas, stack);
        if (!canvasCtx) {
          if (setupAttempts < 20 && !cancelled) {
            setupAttempts += 1;
            requestAnimationFrame(() => void setup());
          }
          return;
        }

        canvasCssSizeRef.current = {
          width: stack.clientWidth,
          height: stack.clientHeight,
        };

        if (preloadedFramesRef.current.length !== frames.length) {
          preloadedFramesRef.current = await preloadFrameImages(
            frames.map((f) => f.src)
          );
        }
        if (cancelled) return;

        ctx?.revert();

        const scroller = document.documentElement;
        const frameCount = frames.length;
        const preloaded = preloadedFramesRef.current;

        const paintFrame = (index: number, ctx2d = canvasCtx) => {
          const idx = Math.min(frameCount - 1, Math.max(0, index));
          const img = preloaded[idx];
          if (!img) return false;

          const sized = sizeHeroCanvas(canvas, stack) ?? ctx2d;
          if (!sized) return false;

          canvasCssSizeRef.current = {
            width: stack.clientWidth,
            height: stack.clientHeight,
          };
          const { width, height } = canvasCssSizeRef.current;
          if (width <= 0 || height <= 0) return false;

          if (!img.complete) return false;

          if (idx !== currentFrameIndexRef.current) {
            currentFrameIndexRef.current = idx;
          }
          drawFrameToCanvas(
            sized,
            img,
            width,
            height,
            frameDrawAnchor,
            frameDisplayScale
          );
          return true;
        };

        const setFrame = (index: number) => {
          const idx = Math.min(frameCount - 1, Math.max(0, index));
          if (idx === currentFrameIndexRef.current && canvasCssSizeRef.current.width > 0) {
            return;
          }
          const img = preloaded[idx];
          if (!img) return;
          if (!img.complete) {
            img.addEventListener("load", () => setFrame(index), { once: true });
            return;
          }
          paintFrame(idx);
        };

        const applyHeroProgress = (rawProgress: number) => {
          const progress = gsap.utils.clamp(0, 1, rawProgress);
          setFrame(Math.round(progress * (frameCount - 1)));

          const textPhase = Math.min(1, progress / 0.12);
          const introTargets = [
            heroIntroLeftRef.current,
            heroIntroRightRef.current,
          ].filter(Boolean) as HTMLElement[];

          if (introTargets.length) {
            gsap.set(introTargets, {
              y: -120 * textPhase,
              autoAlpha: 1 - textPhase,
              overwrite: "auto",
            });
          } else if (textOverlay) {
            gsap.set(textOverlay.children, {
              y: -120 * textPhase,
              autoAlpha: 1 - textPhase,
              overwrite: "auto",
            });
          }

          const calloutIn = gsap.utils.clamp(0, 1, (progress - 0.14) / 0.22);

          for (const side of getCalloutSideElements()) {
            const items = side.querySelectorAll<HTMLElement>("[data-callout]");
            items.forEach((el, i) => {
              const stagger = i * 0.06;
              const itemIn = gsap.utils.clamp(0, 1, (calloutIn - stagger) / 0.7);
              gsap.set(el, {
                autoAlpha: itemIn,
                y: 28 * (1 - itemIn),
                overwrite: "auto",
              });
            });
          }

          if (scrollHintRef.current) {
            gsap.set(scrollHintRef.current, {
              autoAlpha: progress > 0.04 ? 0 : 1,
              overwrite: "auto",
            });
          }
        };

        let syncFramesLocal: (() => void) | undefined;

        ctx = gsap.context(() => {
          const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;

          gsap.set(bottleFixed, { autoAlpha: 1, visibility: "visible" });
          const introReset = [
            heroIntroLeftRef.current,
            heroIntroRightRef.current,
          ].filter(Boolean) as HTMLElement[];
          if (introReset.length) {
            gsap.set(introReset, { y: 0, autoAlpha: 1 });
          } else if (textOverlay) {
            gsap.set(textOverlay.children, { y: 0, autoAlpha: 1 });
          }

          for (const side of getCalloutSideElements()) {
            gsap.set(side.querySelectorAll("[data-callout]"), {
              autoAlpha: 0,
              y: 28,
            });
          }
          if (scrollHintRef.current) {
            gsap.set(scrollHintRef.current, { autoAlpha: 1 });
          }
          bottleFixed.dataset.heroReady = "true";

          onCanvasResize = () => {
            const idx =
              currentFrameIndexRef.current >= 0
                ? currentFrameIndexRef.current
                : 0;
            paintFrame(idx);
            ScrollTrigger.refresh();
          };
          window.addEventListener("resize", onCanvasResize);
          stackResizeObserver = new ResizeObserver(() => {
            onCanvasResize?.();
          });
          stackResizeObserver.observe(stack);

          if (reducedMotion) {
            currentFrameIndexRef.current = -1;
            setFrame(frameCount - 1);
            return;
          }

          currentFrameIndexRef.current = -1;
          setFrame(0);

          ScrollTrigger.create({
            id: `${config.id}-hero-frames`,
            trigger: sequence,
            scroller,
            start: "top top",
            end: "bottom bottom",
            pin,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          });

          syncFramesLocal = () => {
            if (!isScrollExperienceReady()) return;

            const st = ScrollTrigger.getById(`${config.id}-hero-frames`);
            if (st) {
              applyHeroProgress(st.progress);
              return;
            }

            const total = sequence.offsetHeight - window.innerHeight;
            if (total <= 0) return;
            const scrolled = gsap.utils.clamp(0, total, -sequence.getBoundingClientRect().top);
            applyHeroProgress(scrolled / total);
          };
          syncFrames = syncFramesLocal;

          gsap.ticker.add(syncFramesLocal);
          ScrollTrigger.refresh();
          syncFramesLocal();

          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            syncFramesLocal?.();
          });
        }, root);
        return;
      }

      await waitForImages(stack);
      if (cancelled) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      ctx?.revert();

      const closed = closedRef.current;
      const body = bodyRef.current;
      const capOuter = capOuterRef.current;
      const cap = capInnerRef.current;

      if (
        !body ||
        !capOuter ||
        !cap ||
        (hasClosedBottle && !closed)
      ) {
        return;
      }

      const stackH = hasClosedBottle
        ? assets.height
        : stack.offsetHeight || assets.height;
      const capIdleY =
        -stackH * (capTuning.yOffsetRatio + capTuning.idleLiftRatio);
      const capPivotY = stackH * capTuning.pivotYRatio;

      if (reducedMotion) {
        gsap.set(bottleFixed, { autoAlpha: 1 });
        if (hasClosedBottle && closed) {
          gsap.set(closed, { autoAlpha: 1 });
          gsap.set(body, { autoAlpha: 0 });
          gsap.set(capOuter, { autoAlpha: 0 });
        } else {
          gsap.set(body, { autoAlpha: 1 });
          gsap.set(capOuter, { autoAlpha: 0 });
        }
        return;
      }

      ctx = gsap.context(() => {
        if (hasClosedBottle && closed) {
          gsap.set(closed, { autoAlpha: 1 });
          gsap.set(body, { autoAlpha: 0 });
          gsap.set(capOuter, { autoAlpha: 0 });
        } else {
          gsap.set(body, { autoAlpha: 1 });
          gsap.set(capOuter, { autoAlpha: 1 });
        }

        gsap.set(cap, {
          y: capIdleY,
          scale: capTuning.scale,
          rotation: capTuning.idleRotation,
          transformOrigin: `50% ${capPivotY}px`,
        });

        if (config.bottleVisibleOnLoad) {
          gsap.set(bottleFixed, { autoAlpha: 1 });
        } else {
          gsap.set(bottleFixed, { autoAlpha: 0 });
        }

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", force3D: true },
          scrollTrigger: {
            trigger: sequence,
            scroller: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.6,
            pin,
            pinSpacing: true,
            anticipatePin: 0.3,
            invalidateOnRefresh: true,
          },
        });

        tl.to({}, { duration: 0.12 });

        if (hasClosedBottle && closed) {
          tl.add("reveal");
          tl.to(
            closed,
            { autoAlpha: 0, duration: 0.18, ease: "power2.inOut" },
            "reveal"
          );
          tl.to(
            body,
            { autoAlpha: 1, duration: 0.18, ease: "power2.inOut" },
            "reveal"
          );
          tl.to(
            capOuter,
            { autoAlpha: 1, duration: 0.18, ease: "power2.inOut" },
            "reveal"
          );
        }

        tl.add("lift");
        tl.to(
          cap,
          {
            y: capIdleY - stackH * 0.055,
            rotation: 18,
            duration: 0.34,
            ease: "power2.inOut",
          },
          "lift"
        );

        tl.to(
          cap,
          {
            y: capIdleY - stackH * 0.16,
            rotation: 32,
            duration: 0.26,
            ease: "power2.out",
          },
          "lift+=0.34"
        );
        tl.to(
          capOuter,
          { autoAlpha: 0, duration: 0.08, ease: "power1.in" },
          "lift+=0.52"
        );

        tl.to({}, { duration: 0.22 });

        const visibility = ScrollTrigger.create({
          trigger: root,
          scroller: document.documentElement,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            gsap.set(bottleFixed, { autoAlpha: self.isActive ? 1 : 0 });
          },
        });

        gsap.set(bottleFixed, {
          autoAlpha:
            config.bottleVisibleOnLoad || visibility.isActive ? 1 : 0,
        });

        ScrollTrigger.refresh();
      }, root);
    };

    const runSetup = () => {
      if (typeof window !== "undefined" && !window.__lenisInitialized) {
        return;
      }
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

    const setupRetry = window.setTimeout(runSetup, 600);
    const setupRetryLate = window.setTimeout(runSetup, 1500);

    return () => {
      cancelled = true;
      window.clearTimeout(setupRetry);
      window.clearTimeout(setupRetryLate);
      if (syncFrames) getGsap().gsap.ticker.remove(syncFrames);
      if (onCanvasResize) window.removeEventListener("resize", onCanvasResize);
      stackResizeObserver?.disconnect();
      removeLenisListener();
      currentFrameIndexRef.current = 0;
      preloadedFramesRef.current = [];
      ctx?.revert();
    };
  }, [
    assets.height,
    capTuning,
    config.bottleVisibleOnLoad,
    config.id,
    frameDisplayScale,
    frameDrawAnchor,
    frameSequence,
    hasClosedBottle,
    hasFrameSequence,
    showCenterProduct,
    animateInHero,
  ]);

  const calloutsLayerClass = isMoringa
    ? "hero-moringa-callouts-layer"
    : isAshwagandha
      ? "hero-ashwagandha-callouts-layer"
      : "hero-honey-callouts-layer";

  const calloutsLeftRef = isMoringa
    ? moringaCalloutsLeftRef
    : isAshwagandha
      ? ashwagandhaCalloutsLeftRef
      : honeyCalloutsLeftRef;

  const calloutsRightRef = isMoringa
    ? moringaCalloutsRightRef
    : isAshwagandha
      ? ashwagandhaCalloutsRightRef
      : honeyCalloutsRightRef;

  const calloutsMobileRef = isMoringa
    ? moringaCalloutsMobileRef
    : isAshwagandha
      ? ashwagandhaCalloutsMobileRef
      : honeyCalloutsMobileRef;

  const mobileCalloutItems = isMoringa
    ? [...MORINGA_HERO_CALLOUTS_LEFT, ...MORINGA_HERO_CALLOUTS_RIGHT]
    : isAshwagandha
      ? ASHWAGANDHA_HERO_CALLOUTS_ALL
      : HONEY_HERO_CALLOUTS_ALL;

  const mobileCalloutCardClass = isMoringa
    ? "border-white/15 bg-[#0a2f24]/60"
    : isHoney
      ? "border-[#d4a84b]/25 bg-[#2a1c0a]/80"
      : "border-[#c9a962]/20 bg-[#2f1c12]/75";

  const mobileCalloutTitleClass = isMoringa ? "text-white" : "text-[#faf6f0]";
  const mobileCalloutBodyClass = isMoringa
    ? "text-white/60"
    : "text-[#faf6f0]/60";

  const mobileCalloutsWrapperClass = isMoringa
    ? "hero-moringa-callouts-mobile"
    : isAshwagandha
      ? "hero-ashwagandha-callouts-mobile"
      : "hero-honey-callouts-mobile";

  const renderProductStack = () => (
    <div ref={stackRef} className={`hero-bottle-stack ${heroBottleStackClass(config.id)}`}>
      {hasFrameSequence && frameSequence ? (
        <>
          {config.id === "moringa" ? (
            <Image
              src="/hero/moringa/sequence/frame-001.webp"
              alt=""
              width={720}
              height={1024}
              priority
              unoptimized
              className="hero-bottle-poster pointer-events-none absolute inset-0 z-0 h-full w-full object-contain object-bottom"
            />
          ) : null}
          <canvas
            ref={canvasRef}
            className="hero-frame-canvas relative z-[1] block h-full w-full"
            aria-hidden
          />
        </>
      ) : (
        <>
          {assets.closed ? (
            <div
              ref={closedRef}
              className="hero-bottle-layer-wrap hero-bottle-closed relative"
            >
              <Image
                src={assets.closed}
                alt=""
                width={assets.closedWidth ?? assets.width}
                height={assets.closedHeight ?? assets.height}
                priority={config.id === "moringa"}
                unoptimized
                className={`hero-bottle-layer hero-product-image ${BOTTLE_LAYER_SIZE}`}
              />
            </div>
          ) : null}

          <div
            ref={bodyRef}
            className={`hero-bottle-layer-wrap ${assets.closed ? "absolute inset-0" : "relative"}`}
          >
            <Image
              src={assets.bodyOpen!}
              alt=""
              width={assets.width}
              height={assets.height}
              priority={config.id === "moringa" && !assets.closed}
              unoptimized
              className={`hero-bottle-layer hero-bottle-body ${BOTTLE_LAYER_SIZE}`}
            />
          </div>

          <div
            ref={capOuterRef}
            className="hero-bottle-cap-wrap absolute inset-0"
          >
            <div
              ref={capInnerRef}
              className="hero-bottle-cap-inner"
              style={{
                transform: capFallbackTransform,
                transformOrigin: capFallbackOrigin,
              }}
            >
              <Image
                src={assets.cap!}
                alt=""
                width={assets.width}
                height={assets.height}
                priority={config.id === "moringa"}
                unoptimized
                className={`hero-bottle-layer hero-bottle-cap ${BOTTLE_LAYER_SIZE}`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div
      ref={rootRef}
      className={`product-experience relative ${theme.experience}`}
      data-product={config.id}
    >
      {showCenterProduct && !animateInHero ? (
        <div
          ref={bottleFixedRef}
          className="hero-fixed-product pointer-events-none fixed inset-0 flex items-center justify-center opacity-100"
          style={{ zIndex: config.bottleZIndex }}
          aria-hidden
        >
          {renderProductStack()}
        </div>
      ) : null}

      {animateInHero ? (
        <section
          ref={sequenceRef}
          className={`product-scroll-zone relative ${theme.experience}`}
          style={{ height: `${sequenceScrollHeightVh}vh` }}
        >
          <div
            ref={pinRef}
            className={`relative flex h-screen w-full flex-col overflow-hidden ${theme.experience}`}
          >
            <div className="hero-bg pointer-events-none absolute inset-0 z-0 overflow-hidden">
              <div className="hero-bg-gradient absolute inset-0" />
            </div>

            <div className="hero-scroll-stage relative z-[26] flex min-h-0 flex-1 flex-col justify-center pb-16 pt-16 md:pt-20">
              <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1fr_auto_1fr] md:gap-6 md:px-12 lg:px-16">
                <div
                  ref={heroIntroLeftRef}
                  className="hero-text-left pointer-events-auto relative z-[26] order-1 md:justify-self-start"
                >
                  <h1
                    className={`font-serif text-4xl font-light leading-[1.05] tracking-[0.02em] sm:text-5xl md:text-[3.25rem] lg:text-6xl ${theme.text}`}
                  >
                    {config.hero.headlineLeft[0]}
                    <br />
                    {config.hero.headlineLeft[1]}
                  </h1>
                </div>

                <div
                  ref={bottleFixedRef}
                  className={`hero-bottle-slot pointer-events-none relative z-[22] order-2 md:col-start-2 md:row-start-1 ${heroBottleColumnClass(config.id)}`}
                  aria-hidden
                >
                  {renderProductStack()}
                </div>

                <div
                  ref={heroIntroRightRef}
                  className="hero-text-right pointer-events-auto relative z-[26] order-3 md:col-start-3 md:row-start-1 md:justify-self-end md:text-right"
                >
                  <h2
                    className={`font-serif text-4xl font-light leading-[1.05] tracking-[0.02em] sm:text-5xl md:text-[3.25rem] lg:text-6xl ${theme.text}`}
                  >
                    {config.hero.headlineRight[0]}
                    <br />
                    {config.hero.headlineRight[1]}
                  </h2>
                  <p
                    className={`mt-6 max-w-sm font-sans text-[10px] font-light uppercase leading-[1.9] tracking-[0.22em] md:ml-auto md:text-[11px] ${theme.textMuted}`}
                  >
                    {config.hero.subtext}
                  </p>
                  <div className="mt-10 md:flex md:justify-end">
                    <Link
                      href={config.hero.cta.href}
                      className={`hero-cta inline-flex items-center gap-3 rounded-full border px-8 py-3.5 font-sans text-[10px] uppercase tracking-[0.28em] transition-all md:px-10 md:py-4 md:text-[11px] ${theme.text} ${theme.ctaBorder}`}
                    >
                      <span className="opacity-50">•</span>
                      {config.hero.cta.label}
                      <span className="opacity-50">•</span>
                    </Link>
                  </div>
                </div>
              </div>

              {showScrollCallouts ? (
                <div
                  className={`pointer-events-none absolute inset-0 z-[24] hidden md:block ${calloutsLayerClass}`}
                >
                  <div className="mx-auto flex h-full w-full max-w-7xl items-center px-6 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6 md:px-12 lg:px-16">
                    <div ref={calloutsLeftRef} className="flex items-center">
                      {isMoringa ? (
                        <MoringaHeroCallouts
                          callouts={MORINGA_HERO_CALLOUTS_LEFT}
                          side="left"
                        />
                      ) : null}
                      {isAshwagandha ? (
                        <AshwagandhaHeroCallouts
                          callouts={ASHWAGANDHA_HERO_CALLOUTS_LEFT}
                          side="left"
                        />
                      ) : null}
                      {isHoney ? (
                        <HoneyHeroCallouts
                          callouts={HONEY_HERO_CALLOUTS_LEFT}
                          side="left"
                        />
                      ) : null}
                    </div>
                    <div aria-hidden className="min-w-0" />
                    <div
                      ref={calloutsRightRef}
                      className={`flex items-center ${
                        isHoney
                          ? "hero-honey-callouts-right-wrap justify-center"
                          : "justify-end"
                      }`}
                    >
                      {isMoringa ? (
                        <MoringaHeroCallouts
                          callouts={MORINGA_HERO_CALLOUTS_RIGHT}
                          side="right"
                        />
                      ) : null}
                      {isAshwagandha ? (
                        <AshwagandhaHeroCallouts
                          callouts={ASHWAGANDHA_HERO_CALLOUTS_RIGHT}
                          side="right"
                        />
                      ) : null}
                      {isHoney ? (
                        <HoneyHeroCallouts
                          callouts={HONEY_HERO_CALLOUTS_RIGHT}
                          side="right"
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}

              {showScrollCallouts ? (
                <div
                  ref={calloutsMobileRef}
                  className={`pointer-events-none relative z-[26] mx-auto mt-6 grid w-full max-w-lg grid-cols-2 gap-4 px-6 md:hidden ${mobileCalloutsWrapperClass}`}
                >
                  {mobileCalloutItems.map((callout) => (
                    <div
                      key={callout.id}
                      data-callout
                      className={`rounded-xl border px-3 py-3 backdrop-blur-sm ${mobileCalloutCardClass}`}
                    >
                      <p className={`font-serif text-sm ${mobileCalloutTitleClass}`}>
                        {callout.title}
                      </p>
                      <p
                        className={`mt-1 font-sans text-[10px] leading-snug ${mobileCalloutBodyClass}`}
                      >
                        {callout.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : (
      <section
        className={`product-scroll-zone relative min-h-screen ${theme.experience}`}
      >
        <div
          ref={animateInHero ? pinRef : undefined}
          className={`relative flex flex-col overflow-hidden ${theme.experience} ${
            animateInHero ? "min-h-screen" : "min-h-screen pt-16 md:pt-20"
          }`}
        >
          <div className="hero-bg pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="hero-bg-gradient absolute inset-0" />
          </div>

          <div
            className={`relative z-[26] flex flex-1 flex-col ${
              animateInHero
                ? "min-h-screen justify-center pb-16 pt-16 md:pt-20"
                : "items-center pb-16 pt-8 md:pb-20"
            }`}
          >
            <div
              className={`mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:gap-12 md:px-12 lg:px-16 ${
                hasCenterColumn
                  ? "md:grid-cols-[1fr_auto_1fr] md:gap-6"
                  : "md:grid-cols-2"
              }`}
            >
              <div className="hero-text-left relative z-[26] md:justify-self-start">
                <h1
                  className={`font-serif text-4xl font-light leading-[1.05] tracking-[0.02em] sm:text-5xl md:text-[3.25rem] lg:text-6xl ${theme.text}`}
                >
                  {config.hero.headlineLeft[0]}
                  <br />
                  {config.hero.headlineLeft[1]}
                </h1>
              </div>

              {showCenterProduct && animateInHero ? (
                <div
                  ref={bottleFixedRef}
                  className={`pointer-events-none ${heroBottleColumnClass(config.id)}`}
                  aria-hidden
                >
                  {renderProductStack()}
                </div>
              ) : showCenterProduct ? (
                <div
                  className="hero-bottle-slot relative flex min-h-[min(520px,68vh)] w-full md:min-h-[780px] md:w-[min(600px,48vw)] lg:min-h-[820px] lg:w-[min(640px,44vw)]"
                  aria-hidden
                />
              ) : hasHeroCenterImage && heroCenterImage ? (
                <div className="hero-center-image relative z-[26] flex justify-center md:justify-self-center">
                  <Image
                    src={heroCenterImage.src}
                    alt={heroCenterImage.alt ?? ""}
                    width={heroCenterImage.width}
                    height={heroCenterImage.height}
                    priority={config.id === "moringa"}
                    unoptimized
                    className={`hero-product-image ${heroCenterImage.sizeClass ?? HERO_CENTER_IMAGE_SIZE}`}
                  />
                </div>
              ) : null}

              <div className="hero-text-right relative z-[26] md:justify-self-end md:text-right">
                <h2
                  className={`font-serif text-4xl font-light leading-[1.05] tracking-[0.02em] sm:text-5xl md:text-[3.25rem] lg:text-6xl ${theme.text}`}
                >
                  {config.hero.headlineRight[0]}
                  <br />
                  {config.hero.headlineRight[1]}
                </h2>
                <p
                  className={`mt-6 max-w-sm font-sans text-[10px] font-light uppercase leading-[1.9] tracking-[0.22em] md:ml-auto md:text-[11px] ${theme.textMuted}`}
                >
                  {config.hero.subtext}
                </p>
                <div className="mt-10 md:flex md:justify-end">
                  <Link
                    href={config.hero.cta.href}
                    className={`hero-cta inline-flex items-center gap-3 rounded-full border px-8 py-3.5 font-sans text-[10px] uppercase tracking-[0.28em] transition-all md:px-10 md:py-4 md:text-[11px] ${theme.text} ${theme.ctaBorder}`}
                  >
                    <span className="opacity-50">•</span>
                    {config.hero.cta.label}
                    <span className="opacity-50">•</span>
                  </Link>
                </div>
              </div>
            </div>

            {animateInHero ? (
              <p
                className={`hero-scroll-hint pointer-events-none absolute bottom-8 left-1/2 z-[26] -translate-x-1/2 font-sans text-[9px] uppercase tracking-[0.4em] ${theme.textMuted}`}
              >
                {config.sequenceLabel}
              </p>
            ) : null}
          </div>
        </div>

        {!animateInHero ? (
          <>
            <div
              className={`hero-logos-bar relative px-6 py-10 md:px-12 md:py-12 ${theme.panel}`}
            >
              <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-6 md:justify-between md:gap-x-8">
                {config.partners.map((name) => (
                  <span
                    key={name}
                    className={`font-sans text-[10px] uppercase tracking-[0.25em] md:text-[11px] ${theme.textMuted}`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div
              className={`hero-scroll-runway relative h-[30vh] ${theme.panelDark}`}
            />
          </>
        ) : null}
      </section>
      )}

      {showCenterProduct && !animateInHero ? (
        <section
          ref={sequenceRef}
          className="hero-bottle-sequence relative z-[20] h-[200vh]"
          aria-label={`${config.id} reveal animation`}
        >
          <div
            ref={pinRef}
            className={`relative flex h-screen flex-col items-center justify-end pb-[12vh] ${theme.panelDark}`}
          >
            <p
              className={`font-sans text-[9px] uppercase tracking-[0.4em] ${theme.textMuted}`}
            >
              {config.sequenceLabel}
            </p>
          </div>
        </section>
      ) : null}

      {animateInHero && config.showPartnersBar !== false ? (
        <div
          className={`hero-logos-bar relative px-6 py-10 md:px-12 md:py-12 ${theme.panel}`}
        >
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-6 md:justify-between md:gap-x-8">
            {config.partners.map((name) => (
              <span
                key={name}
                className={`font-sans text-[10px] uppercase tracking-[0.25em] md:text-[11px] ${theme.textMuted}`}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      ) : null}

    </div>
  );
}
