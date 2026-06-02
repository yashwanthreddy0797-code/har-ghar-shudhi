"use client";

import { useEffect, useRef } from "react";
import { Eye, FlaskConical, Leaf, Sprout } from "lucide-react";
import { getGsap } from "@/lib/gsap/client";
import { onLenisInit } from "@/lib/scroll/lenisReady";

const PILLARS = [
  {
    num: "01",
    title: "NMR Tested",
    description:
      "Every batch lab-verified for authenticity, purity, and zero adulteration.",
    icon: FlaskConical,
  },
  {
    num: "02",
    title: "Ethical Sourcing",
    description:
      "From Himalayan wildforests to organic farms — fair partnerships at every step.",
    icon: Sprout,
  },
  {
    num: "03",
    title: "Ayurvedic Science",
    description:
      "Formulations rooted in ancient wisdom, refined with modern clinical standards.",
    icon: Leaf,
  },
  {
    num: "04",
    title: "Full Transparency",
    description:
      "Nothing added, nothing hidden — complete ingredient traceability you can trust.",
    icon: Eye,
  },
] as const;

export default function BrandStandardSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    const setup = () => {
      const section = sectionRef.current;
      if (!section) return;

      const { gsap } = getGsap();
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) return;

      ctx?.revert();
      ctx = gsap.context(() => {
        gsap.from("[data-standard-reveal]", {
          y: 36,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        });
      }, section);
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
      ref={sectionRef}
      className="brand-standard relative z-[25] overflow-hidden bg-[#f5f0e8] py-20 md:py-28"
      aria-label="The Har Ghar Shudhi standard"
    >
      <div className="brand-standard-grid pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="brand-standard-glow pointer-events-none absolute -left-32 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-brand-green/10 blur-3xl" />
      <div className="brand-standard-glow pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-luxury-gold/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <p
          data-standard-reveal
          className="text-center font-sans text-[10px] uppercase tracking-[0.35em] text-brand-green md:text-[11px]"
        >
          The Har Ghar Shudhi Standard
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-6">
          <div
            data-standard-reveal
            className="brand-standard-manifesto relative overflow-hidden rounded-2xl bg-brand-green-dark px-8 py-10 text-[#faf6f0] md:px-10 md:py-12 lg:col-span-5 lg:row-span-2 lg:flex lg:flex-col lg:justify-between"
          >
            <div className="brand-standard-manifesto-accent pointer-events-none absolute inset-0" />
            <div className="relative">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-luxury-gold/80">
                Our Promise
              </p>
              <h2 className="mt-5 font-serif text-3xl font-light leading-[1.08] tracking-[0.02em] md:text-4xl lg:text-[2.75rem]">
                One Standard.
                <br />
                Every Product.
              </h2>
              <p className="mt-6 max-w-sm font-sans text-sm font-light leading-[1.85] tracking-[0.02em] text-[#faf6f0]/75">
                Whether it&apos;s adaptogenic supplements or raw wildforest honey
                — every Har Ghar Shudhi product carries the same commitment to
                purity, potency, and transparency.
              </p>
            </div>
            <p className="relative mt-10 font-serif text-lg italic text-luxury-gold/90 md:mt-12">
              शुद्धि — Purity in every home.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:gap-6">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article
                  key={pillar.num}
                  data-standard-reveal
                  className="brand-standard-card group relative rounded-2xl border border-brand-green/10 bg-brand-white/80 p-6 backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-brand-green/25 hover:shadow-[0_20px_50px_rgba(45,82,57,0.08)] md:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-serif text-3xl font-light leading-none text-brand-green/15 transition-colors duration-500 group-hover:text-brand-green/25">
                      {pillar.num}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-green/15 bg-brand-green-light/50 text-brand-green transition-colors duration-500 group-hover:border-brand-green/30 group-hover:bg-brand-green-light">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-light text-brand-text">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm font-light leading-[1.75] text-brand-muted">
                    {pillar.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div
          data-standard-reveal
          className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-brand-green/10 pt-10 md:mt-16"
        >
          {[
            "Pure As Nature",
            "Proven By Science",
            "Powerful For Health",
            "Transparent Always",
          ].map((item, index) => (
            <span key={item} className="flex items-center gap-6">
              <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-brand-green/80 md:text-[11px]">
                {item}
              </span>
              {index < 3 && (
                <span
                  className="hidden h-1 w-1 rounded-full bg-luxury-gold/60 sm:block"
                  aria-hidden
                />
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
