"use client";

import { useEffect, useRef } from "react";
import { Activity, HeartPulse } from "lucide-react";
import { getGsap } from "@/lib/gsap/client";
import { onLenisInit } from "@/lib/scroll/lenisReady";
import { MORINGA_PURITY_STEPS, MORINGA_STATS } from "@/lib/hero/moringaContent";

export default function MoringaProductInsights() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    const setup = () => {
      const root = rootRef.current;
      if (!root) return;

      const { gsap } = getGsap();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      ctx?.revert();
      ctx = gsap.context(() => {
        gsap.from("[data-moringa-reveal]", {
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: root,
            start: "top 78%",
            once: true,
          },
        });
      }, root);
    };

    const detach = onLenisInit(setup);
    setup();
    return () => {
      detach();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="moringa-insights relative z-[28] -mt-px bg-brand-cream"
      aria-label="Moringa product benefits and purity"
    >
      <div className="relative overflow-hidden bg-[#0d3b2e] px-6 py-20 md:px-12 md:py-24 lg:px-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(26, 92, 71, 0.5) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center" data-moringa-reveal>
            <h2 className="font-serif text-3xl font-light tracking-[0.04em] text-white md:text-5xl">
              Why Moringa?
            </h2>
            <p className="mt-4 font-sans text-sm font-light tracking-wide text-white/70 md:text-base">
              Nature&apos;s most complete plant.
            </p>
          </div>

          <ul className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-10 sm:grid-cols-4 md:mt-16 md:gap-8">
            {MORINGA_STATS.map((stat) => (
              <li
                key={stat.label}
                data-moringa-reveal
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-luxury-gold/35 bg-[#0a2f24] shadow-inner md:h-24 md:w-24">
                  <span className="font-serif text-2xl text-luxury-gold md:text-3xl">
                    {stat.value}
                  </span>
                </div>
                <span className="mt-3 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-white/80">
                  {stat.label}
                </span>
              </li>
            ))}
          </ul>

          <p
            className="mt-12 text-center font-sans text-sm font-light tracking-wide text-white/75 md:mt-14"
            data-moringa-reveal
          >
            One leaf. Countless benefits.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden bg-[#082418] px-6 py-20 md:px-12 md:py-24 lg:px-16">
        <div className="mx-auto max-w-6xl text-center" data-moringa-reveal>
          <h2 className="font-serif text-3xl font-light tracking-[0.04em] text-luxury-gold md:text-5xl lg:text-[3.5rem]">
            Our Purity Journey
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-sans text-sm font-light leading-relaxed text-white/70 md:text-base">
            From the lap of nature to your home, with care &amp; honesty.
          </p>
        </div>

        <ol className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-6">
          {MORINGA_PURITY_STEPS.map((step) => (
            <li
              key={step.step}
              data-moringa-reveal
              className="rounded-xl border border-luxury-gold/15 bg-[#0d3b2e]/60 px-5 py-5 text-left backdrop-blur-sm"
            >
              <span className="font-serif text-2xl text-luxury-gold">{step.step}</span>
              <p className="mt-2 font-sans text-sm font-light leading-relaxed text-white/85">
                {step.title}
              </p>
            </li>
          ))}
        </ol>

        <div
          className="mx-auto mt-12 flex max-w-md items-center justify-center gap-3 rounded-full border border-luxury-gold/25 px-6 py-3 md:mt-14"
          data-moringa-reveal
        >
          <Activity className="h-4 w-4 text-luxury-gold" strokeWidth={1.5} />
          <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-white/70">
            100% Natural · No Preservatives · Vegan · Gluten Free
          </span>
          <HeartPulse
            className="h-4 w-4 text-luxury-gold"
            strokeWidth={1.5}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
