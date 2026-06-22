"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap/client";
import { isScrollExperienceReady, onLenisInit } from "@/lib/scroll/lenisReady";

const MoringaModelScene = dynamic(
  () => import("@/components/moringa/MoringaModelScene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[420px] items-center justify-center">
        <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/40">
          Loading 3D model…
        </p>
      </div>
    ),
  }
);

const SCROLL_HEIGHT_VH = 280;

export default function MoringaModelScrollSection() {
  const rootRef = useRef<HTMLElement>(null);
  const sequenceRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const introLeftRef = useRef<HTMLDivElement>(null);
  const introRightRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useLayoutEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    let syncScroll: (() => void) | undefined;

    const setup = () => {
      if (cancelled) return;

      const root = rootRef.current;
      const sequence = sequenceRef.current;
      const pin = pinRef.current;
      if (!root || !sequence || !pin) return;

      const { gsap, ScrollTrigger } = getGsap();
      ctx?.revert();

      ctx = gsap.context(() => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        gsap.set(introLeftRef.current, { y: 0, autoAlpha: 1 });
        gsap.set(introRightRef.current, { y: 0, autoAlpha: 1 });
        gsap.set(scrollHintRef.current, { autoAlpha: 1 });
        gsap.set(progressRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        const applyProgress = (rawProgress: number) => {
          const progress = gsap.utils.clamp(0, 1, rawProgress);
          setScrollProgress(progress);

          const textPhase = Math.min(1, progress / 0.14);
          const introTargets = [
            introLeftRef.current,
            introRightRef.current,
          ].filter(Boolean) as HTMLElement[];

          if (introTargets.length) {
            gsap.set(introTargets, {
              y: -80 * textPhase,
              autoAlpha: 1 - textPhase * 0.85,
              overwrite: "auto",
            });
          }

          if (scrollHintRef.current) {
            gsap.set(scrollHintRef.current, {
              autoAlpha: progress > 0.05 ? 0 : 1,
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

        if (reducedMotion) {
          applyProgress(0.5);
          return;
        }

        ScrollTrigger.create({
          id: "moringa-3d-scroll",
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

          const st = ScrollTrigger.getById("moringa-3d-scroll");
          if (st) {
            applyProgress(st.progress);
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
        syncScroll();
      }, root);
    };

    const runSetup = () => {
      if (typeof window !== "undefined" && !window.__lenisInitialized) return;
      setup();
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
      removeLenisListener();
      if (syncScroll) getGsap().gsap.ticker.remove(syncScroll);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="moringa-model-scroll relative bg-[#0a2f24]"
      aria-label="Moringa 3D container reveal"
    >
      <div
        ref={sequenceRef}
        className="relative bg-[#0a2f24]"
        style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
      >
        <div
          ref={pinRef}
          className="relative h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_50%_42%,rgba(26,92,71,0.45)_0%,rgba(10,47,36,0.92)_48%,#071f18_100%)]"
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center px-4 md:px-8">
            <MoringaModelScene
              progress={scrollProgress}
              className="h-[min(78vh,760px)] w-full max-w-[min(520px,92vw)] md:max-w-[min(620px,44vw)]"
            />
          </div>

          <div className="relative z-[2] flex h-full flex-col justify-center pb-16 pt-16 md:pt-20">
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-[1fr_auto_1fr] md:gap-6 md:px-12 lg:px-16">
              <div
                ref={introLeftRef}
                className="pointer-events-auto relative z-[3] order-1 md:justify-self-start"
              >
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.32em] text-white/55">
                  Moringa Powder
                </p>
                <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-[0.02em] text-white sm:text-5xl md:text-[2.75rem] lg:text-[3rem]">
                  Crafted In
                  <br />
                  Three Dimensions.
                </h2>
              </div>

              <div
                aria-hidden
                className="order-2 hidden w-[min(430px,38vw)] md:col-start-2 md:row-start-1 md:block"
              />

              <div
                ref={introRightRef}
                className="pointer-events-auto relative z-[3] order-3 md:col-start-3 md:row-start-1 md:justify-self-end md:text-right"
              >
                <h3 className="font-serif text-4xl font-light leading-[1.05] tracking-[0.02em] text-white sm:text-5xl md:text-[2.75rem] lg:text-[3rem]">
                  Scroll To
                  <br />
                  Explore Form.
                </h3>
                <p className="mt-6 max-w-sm font-sans text-[10px] font-light uppercase leading-[1.9] tracking-[0.22em] text-white/65 md:ml-auto md:text-[11px]">
                  A premium container reveal — rotate and lift the jar as you
                  scroll through the ritual of daily wellness.
                </p>
                <div className="pointer-events-auto mt-10 md:flex md:justify-end">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-3 rounded-full border border-white/35 px-8 py-3.5 font-sans text-[10px] uppercase tracking-[0.28em] text-white transition-all hover:border-white hover:bg-white/10 md:px-10 md:py-4 md:text-[11px]"
                  >
                    <span className="opacity-50">•</span>
                    Shop Moringa
                    <span className="opacity-50">•</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p
            ref={scrollHintRef}
            className="pointer-events-none absolute bottom-8 left-1/2 z-[3] -translate-x-1/2 font-sans text-[9px] uppercase tracking-[0.4em] text-white/45"
          >
            Scroll to move
          </p>

          <div className="absolute bottom-0 left-0 right-0 z-[3] h-px bg-white/10">
            <div
              ref={progressRef}
              className="h-full w-full origin-left bg-[#c9a962]/70"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
