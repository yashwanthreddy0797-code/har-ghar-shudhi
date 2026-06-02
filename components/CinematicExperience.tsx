"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import WordReveal from "./WordReveal";
import ParticleField from "./ParticleField";
import CinematicStage, {
  createEmptyStageRefs,
  type CinematicStageRefs,
} from "./cinematic/CinematicStage";
import {
  HERB_PARALLAX,
  SCENE_COUNT,
  SCENE_UNIT,
  SCROLL_HEIGHT_VH,
  TEXT_SCENES,
  TRANSITION,
  VISUAL_SCENE_IDS,
  HOLD,
} from "./cinematic/sceneConfig";
import { onLenisInit } from "@/lib/scroll/lenisReady";

gsap.registerPlugin(ScrollTrigger);

const GPU = { force3D: true };

function refreshOnImages(container: HTMLElement) {
  const refresh = () => ScrollTrigger.refresh();
  container.querySelectorAll("img").forEach((img) => {
    if (img.complete) return;
    img.addEventListener("load", refresh, { once: true });
    img.addEventListener("error", refresh, { once: true });
  });
  requestAnimationFrame(refresh);
  window.addEventListener("load", refresh, { once: true });
}

function applyStaticFallback(
  stage: CinematicStageRefs,
  sceneRefs: (HTMLDivElement | null)[],
  scrollHintRef: HTMLDivElement | null,
  progressRef: HTMLDivElement | null
) {
  VISUAL_SCENE_IDS.forEach((id, index) => {
    const layer = stage.layers[id];
    if (layer) gsap.set(layer, { autoAlpha: index === 0 ? 1 : 0, ...GPU });
  });
  if (stage.heroGlow) gsap.set(stage.heroGlow, { scale: 1, opacity: 1, ...GPU });

  sceneRefs.forEach((scene, index) => {
    if (!scene) return;
    gsap.set(scene, { autoAlpha: index === 0 ? 1 : 0, y: 0, ...GPU });
    const headline = scene.querySelector(".scene-headline");
    const sub = scene.querySelector(".scene-sub");
    const bullets = scene.querySelectorAll(".scene-bullet");
    const cta = scene.querySelector(".scene-cta");
    if (headline) gsap.set(headline, { y: 0, opacity: 1, ...GPU });
    if (sub) gsap.set(sub, { y: 0, opacity: 1, ...GPU });
    if (bullets.length) gsap.set(bullets, { opacity: 1, x: 0, ...GPU });
    if (cta) gsap.set(cta, { y: 0, opacity: 1, ...GPU });
  });

  if (scrollHintRef) gsap.set(scrollHintRef, { autoAlpha: 0 });
  if (progressRef) gsap.set(progressRef, { scaleX: 0 });
}

function wireVisualLayers(
  master: gsap.core.Timeline,
  stage: CinematicStageRefs
) {
  const layers = VISUAL_SCENE_IDS.map((id) => stage.layers[id]);

  layers.forEach((layer, index) => {
    if (!layer) return;

    const tIn = index * SCENE_UNIT;
    const prev = index > 0 ? layers[index - 1] : null;

    gsap.set(layer, {
      autoAlpha: index === 0 ? 1 : 0,
      ...GPU,
    });

    if (prev) {
      master.to(
        prev,
        {
          autoAlpha: 0,
          duration: TRANSITION * 0.7,
          ease: "power2.inOut",
        },
        tIn
      );
    }

    if (index > 0) {
      master.to(
        layer,
        { autoAlpha: 1, duration: TRANSITION, ease: "power2.out" },
        tIn
      );
    }
  });

  const { heroGlow, bottleProduct, bottleSweep, capsuleTop, capsuleBottom } =
    stage;

  if (heroGlow) {
    master.fromTo(
      heroGlow,
      { scale: 1, opacity: 0.72 },
      {
        scale: 1.06,
        opacity: 1,
        duration: HOLD * 0.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      },
      0
    );
  }

  const tBottle = SCENE_UNIT;
  if (bottleProduct) {
    master.fromTo(
      bottleProduct,
      { y: 48, scale: 0.9, rotateY: -14 },
      {
        y: 0,
        scale: 1,
        rotateY: 10,
        duration: HOLD,
        ease: "power2.out",
      },
      tBottle + TRANSITION * 0.15
    );
  }
  if (bottleSweep) {
    master.fromTo(
      bottleSweep,
      { xPercent: -130, autoAlpha: 0.35 },
      {
        xPercent: 130,
        autoAlpha: 0.85,
        duration: HOLD * 0.85,
        ease: "power1.inOut",
      },
      tBottle + TRANSITION * 0.35
    );
  }

  const tCapsule = SCENE_UNIT * 2;
  if (capsuleTop) {
    master.fromTo(
      capsuleTop,
      { y: -72, rotation: -10 },
      { y: 0, rotation: 0, duration: HOLD, ease: "power3.out" },
      tCapsule + TRANSITION * 0.2
    );
  }
  if (capsuleBottom) {
    master.fromTo(
      capsuleBottom,
      { y: 72, rotation: 10 },
      { y: 0, rotation: 0, duration: HOLD, ease: "power3.out" },
      tCapsule + TRANSITION * 0.2
    );
  }

  const tHerbs = SCENE_UNIT * 3;
  stage.herbLeaves.forEach((leaf, i) => {
    if (!leaf) return;
    const depth = HERB_PARALLAX[i] ?? 0.7;
    master.fromTo(
      leaf,
      { y: 90 * depth, autoAlpha: 0, rotation: -18 + i * 8 },
      {
        y: -24 * depth,
        autoAlpha: 1,
        rotation: 0,
        duration: HOLD * Math.min(depth + 0.35, 1.15),
        ease: "power2.out",
      },
      tHerbs + TRANSITION * 0.25 + i * 0.07
    );
  });

  const tEnding = SCENE_UNIT * 4;
  if (stage.endingVignette) {
    master.fromTo(
      stage.endingVignette,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: TRANSITION * 1.1, ease: "power2.out" },
      tEnding
    );
  }
  if (stage.endingProduct) {
    master.fromTo(
      stage.endingProduct,
      { scale: 0.86, y: 36 },
      { scale: 1, y: 0, duration: HOLD, ease: "power2.out" },
      tEnding + TRANSITION * 0.25
    );
  }
}

function wireTextScenes(
  master: gsap.core.Timeline,
  sceneRefs: (HTMLDivElement | null)[]
) {
  sceneRefs.forEach((scene, index) => {
    if (!scene) return;

    const tIn = index * SCENE_UNIT;
    const label = `scene-${index}`;
    const prev = index > 0 ? sceneRefs[index - 1] : null;
    const isFirst = index === 0;

    const headline = scene.querySelector(".scene-headline");
    const sub = scene.querySelector(".scene-sub");
    const bullets = scene.querySelectorAll(".scene-bullet");
    const cta = scene.querySelector(".scene-cta");

    gsap.set(scene, {
      autoAlpha: isFirst ? 1 : 0,
      y: isFirst ? 0 : 28,
      ...GPU,
    });

    if (headline) {
      gsap.set(headline, {
        y: isFirst ? 0 : 24,
        opacity: isFirst ? 1 : 0,
        ...GPU,
      });
    }
    if (sub) {
      gsap.set(sub, {
        y: isFirst ? 0 : 14,
        opacity: isFirst ? 1 : 0,
        ...GPU,
      });
    }
    if (bullets.length) {
      gsap.set(bullets, {
        opacity: isFirst ? 1 : 0,
        x: isFirst ? 0 : -8,
        ...GPU,
      });
    }
    if (cta) {
      gsap.set(cta, {
        y: isFirst ? 0 : 16,
        opacity: isFirst ? 0 : 0,
        ...GPU,
      });
    }

    master.addLabel(label, tIn);

    if (prev) {
      master.to(
        prev,
        {
          autoAlpha: 0,
          y: -16,
          duration: TRANSITION * 0.7,
          ease: "power2.inOut",
        },
        tIn
      );
    }

    if (!isFirst) {
      master.to(
        scene,
        { autoAlpha: 1, y: 0, duration: TRANSITION, ease: "power2.out" },
        tIn
      );
    }

    if (headline && !isFirst) {
      master.to(
        headline,
        {
          y: 0,
          opacity: 1,
          duration: TRANSITION * 1.1,
          ease: "power3.out",
        },
        tIn + TRANSITION * 0.25
      );
    }

    if (sub && !isFirst) {
      master.to(
        sub,
        { y: 0, opacity: 1, duration: TRANSITION * 0.9 },
        tIn + TRANSITION * 0.55
      );
    }

    if (bullets.length && !isFirst) {
      master.to(
        bullets,
        {
          opacity: 1,
          x: 0,
          stagger: 0.06,
          duration: TRANSITION * 0.8,
        },
        tIn + TRANSITION * 0.5
      );
    }

    if (cta) {
      master.to(
        cta,
        { y: 0, opacity: 1, duration: TRANSITION },
        tIn + TRANSITION * 0.65
      );
    }
  });
}

export default function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<CinematicStageRefs>(createEmptyStageRefs());
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;

      const pin = pinRef.current;
      const container = containerRef.current;
      const stage = stageRef.current;
      if (!pin || !container) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) {
        applyStaticFallback(
          stage,
          sceneRefs.current,
          scrollHintRef.current,
          progressRef.current
        );
        return;
      }

      ctx = gsap.context(() => {
        const master = gsap.timeline({
          defaults: { ease: "power2.out", ...GPU },
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: 2.6,
            pin,
            pinSpacing: true,
            anticipatePin: 0.5,
            invalidateOnRefresh: true,
          },
        });

        wireTextScenes(master, sceneRefs.current);
        wireVisualLayers(master, stage);

        const totalDuration = SCENE_COUNT * SCENE_UNIT;

        if (progressRef.current) {
          master.to(
            progressRef.current,
            { scaleX: 1, ease: "none", duration: totalDuration },
            0
          );
        }

        if (scrollHintRef.current) {
          gsap.to(scrollHintRef.current, {
            autoAlpha: 0,
            y: -8,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "+=120",
              toggleActions: "play none none none",
            },
          });
        }

        refreshOnImages(container);
      }, containerRef);
    };

    const removeLenisListener = onLenisInit(setup);

    return () => {
      cancelled = true;
      removeLenisListener();
      ctx?.revert();
    };
  }, []);

  const alignClass = (align: "center" | "left" | "right") => {
    if (align === "left")
      return "items-start text-left pl-8 md:pl-20 lg:pl-28";
    if (align === "right")
      return "items-end text-right pr-8 md:pr-20 lg:pr-28";
    return "items-center text-center px-6";
  };

  return (
    <div
      ref={containerRef}
      className="cinematic-scroll-container relative w-full bg-brand-white"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
    >
      <div
        ref={pinRef}
        className="gpu-layer relative h-screen w-full overflow-hidden bg-brand-white"
      >
        <CinematicStage stageRef={stageRef} />

        <div className="video-overlay absolute inset-0 z-[2]" aria-hidden />
        <div className="cinematic-gradient absolute inset-0 z-[3]" aria-hidden />
        <ParticleField />

        <div className="pointer-events-none absolute inset-0 z-10">
          {TEXT_SCENES.map((scene, i) => (
            <div
              key={scene.id}
              ref={(el) => {
                sceneRefs.current[i] = el;
              }}
              className={`scene-layer absolute inset-0 flex flex-col justify-center ${alignClass(scene.align)}`}
              style={{ visibility: i === 0 ? "visible" : "hidden" }}
            >
              <div
                className={`relative w-full max-w-2xl py-12 md:max-w-3xl md:py-16 lg:max-w-4xl ${
                  scene.align === "center" ? "mx-auto" : ""
                }`}
              >
                <div
                  className={`absolute -inset-x-6 -inset-y-8 md:-inset-x-10 md:-inset-y-10 ${scene.scrim}`}
                  aria-hidden
                />

                <div className="relative space-y-5 md:space-y-7">
                  <div className="scene-headline space-y-3 md:space-y-4">
                    {scene.headlines.map((line, j) => (
                      <h2
                        key={j}
                        className="font-serif text-[2.25rem] font-light leading-[1.08] tracking-[0.02em] text-brand-green sm:text-5xl md:text-[3.25rem] lg:text-6xl"
                      >
                        <WordReveal text={line} />
                      </h2>
                    ))}
                  </div>

                  {scene.subtext && (
                    <p className="scene-sub max-w-sm font-sans text-[0.9375rem] font-light leading-[1.75] tracking-[0.04em] text-brand-text/80 md:max-w-md md:text-base md:leading-[1.8]">
                      {scene.subtext}
                    </p>
                  )}

                  {scene.bullets && (
                    <ul className="mt-2 space-y-4 md:mt-4">
                      {scene.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="scene-bullet flex items-center gap-4"
                        >
                          <span className="bullet-dot shrink-0" />
                          <span className="font-sans text-sm tracking-[0.06em] text-brand-text md:text-[0.9375rem]">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {scene.cta && (
                    <div className="scene-cta pt-6 md:pt-10">
                      <Link
                        href={scene.ctaHref ?? "/shop"}
                        className="cta-button cinematic-cta pointer-events-auto inline-flex items-center gap-3 rounded-full border border-brand-green/30 bg-brand-white px-9 py-4 font-sans text-[11px] uppercase tracking-[0.28em] text-brand-green md:px-11 md:py-[1.125rem] md:text-xs"
                      >
                        {scene.ctaLabel ?? "Explore Products"}
                        <ArrowRight
                          className="h-3.5 w-3.5 opacity-70"
                          strokeWidth={1.5}
                        />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-brand-muted/70">
            Scroll
          </p>
          <div className="h-8 w-px bg-brand-green/30" aria-hidden />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-brand-border">
          <div
            ref={progressRef}
            className="gpu-layer h-full origin-left scale-x-0 bg-brand-green/60"
            style={{ transformOrigin: "left center" }}
          />
        </div>
      </div>
    </div>
  );
}
