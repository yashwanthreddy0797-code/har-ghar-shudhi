"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import WordReveal from "./WordReveal";
import ParticleField from "./ParticleField";
import { useScrollDrivenVideo } from "@/hooks/useScrollDrivenVideo";

gsap.registerPlugin(ScrollTrigger);

const SCENE_COUNT = 5;
const HOLD = 1.65;
const TRANSITION = 0.45;
const SCENE_UNIT = HOLD + TRANSITION;

const SCENES = [
  {
    id: "hero",
    headlines: ["Rooted In Ayurveda.", "Backed By Science."],
    subtext: "Ancient herbal wisdom for modern living.",
    align: "center" as const,
    scrim: "text-scrim-center",
  },
  {
    id: "bottle",
    headlines: ["Purity. Precision. Potency."],
    subtext: "Crafted with premium adaptogenic ingredients.",
    align: "left" as const,
    scrim: "text-scrim",
  },
  {
    id: "capsule",
    headlines: ["Adaptogenic Wellness"],
    subtext: "Designed to calm the mind and restore balance.",
    align: "right" as const,
    scrim: "text-scrim-right",
  },
  {
    id: "herbs",
    headlines: ["Powered By Nature"],
    bullets: [
      "Better Sleep",
      "Stress Support",
      "Recovery",
      "Nervous System Balance",
    ],
    align: "left" as const,
    scrim: "text-scrim",
  },
  {
    id: "ending",
    headlines: ["Breathe Deeply.", "Restore Naturally."],
    cta: true,
    align: "center" as const,
    scrim: "text-scrim-center",
  },
];

const GPU = { force3D: true };

export default function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const sceneRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useScrollDrivenVideo(videoRef, timelineRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const pin = pinRef.current;
      const container = containerRef.current;
      if (!pin || !container) return;

      const master = gsap.timeline({
        defaults: { ease: "power2.out", ...GPU },
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 2.6,
          pin,
          pinSpacing: false,
          anticipatePin: 0.5,
          invalidateOnRefresh: true,
        },
      });

      timelineRef.current = master;

      sceneRefs.current.forEach((scene, index) => {
        if (!scene) return;

        const tIn = index * SCENE_UNIT;
        const label = `scene-${index}`;
        const prev = index > 0 ? sceneRefs.current[index - 1] : null;

        const headline = scene.querySelector(".scene-headline");
        const sub = scene.querySelector(".scene-sub");
        const bullets = scene.querySelectorAll(".scene-bullet");
        const cta = scene.querySelector(".scene-cta");

        gsap.set(scene, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 28,
          ...GPU,
        });

        if (headline) gsap.set(headline, { y: 24, opacity: 0, ...GPU });
        if (sub) gsap.set(sub, { y: 14, opacity: 0, ...GPU });
        if (bullets.length) gsap.set(bullets, { opacity: 0, x: -8, ...GPU });
        if (cta) gsap.set(cta, { y: 16, opacity: 0, ...GPU });

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

        if (index > 0) {
          master.to(
            scene,
            { autoAlpha: 1, y: 0, duration: TRANSITION, ease: "power2.out" },
            tIn
          );
        }

        if (headline) {
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

        if (sub) {
          master.to(
            sub,
            { y: 0, opacity: 1, duration: TRANSITION * 0.9 },
            tIn + TRANSITION * 0.55
          );
        }

        if (bullets.length) {
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
            scrub: false,
            once: true,
          },
        });
      }
    }, containerRef);

    return () => {
      timelineRef.current = null;
      ctx.revert();
    };
  }, []);

  const alignClass = (align: "center" | "left" | "right") => {
    if (align === "left")
      return "items-start text-left pl-8 md:pl-20 lg:pl-28";
    if (align === "right")
      return "items-end text-right pr-8 md:pr-20 lg:pr-28";
    return "items-center text-center px-6";
  };

  const scrollHeight = `${SCENE_COUNT * 155}vh`;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: scrollHeight }}
    >
      <div
        ref={pinRef}
        className="gpu-layer relative h-screen w-full overflow-hidden bg-luxury-black"
      >
        <video
          ref={videoRef}
          className="video-layer absolute inset-0 h-full w-full"
          src="/hargharshudhi-story.mp4"
          muted
          playsInline
          preload="auto"
          aria-hidden
        />

        <div className="video-overlay absolute inset-0 z-[2]" aria-hidden />
        <div className="cinematic-gradient absolute inset-0 z-[3]" aria-hidden />
        <ParticleField />

        <div className="pointer-events-none absolute inset-0 z-10">
          {SCENES.map((scene, i) => (
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
                        className="font-serif text-[2.25rem] font-light leading-[1.08] tracking-[0.02em] text-luxury-cream sm:text-5xl md:text-[3.25rem] lg:text-6xl"
                      >
                        <WordReveal text={line} />
                      </h2>
                    ))}
                  </div>

                  {scene.subtext && (
                    <p className="scene-sub max-w-sm font-sans text-[0.9375rem] font-light leading-[1.75] tracking-[0.04em] text-luxury-cream/75 md:text-base md:leading-[1.8]">
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
                          <span className="font-sans text-sm tracking-[0.06em] text-luxury-cream/80 md:text-[0.9375rem]">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {scene.cta && (
                    <div className="scene-cta pt-6 md:pt-10">
                      <button
                        type="button"
                        className="cta-button glass-panel pointer-events-auto inline-flex items-center gap-3 rounded-full border border-luxury-gold/25 px-9 py-4 font-sans text-[11px] uppercase tracking-[0.28em] text-luxury-cream/90 md:px-11 md:py-[1.125rem] md:text-xs"
                      >
                        Explore Products
                        <ArrowRight
                          className="h-3.5 w-3.5 opacity-70"
                          strokeWidth={1.5}
                        />
                      </button>
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
          <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-luxury-cream/35">
            Scroll
          </p>
          <div className="h-8 w-px bg-luxury-gold/30" aria-hidden />
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-luxury-emerald/20">
          <div
            ref={progressRef}
            className="gpu-layer h-full origin-left scale-x-0 bg-luxury-gold/50"
            style={{ transformOrigin: "left center" }}
          />
        </div>
      </div>
    </div>
  );
}
