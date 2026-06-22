"use client";

import { ArrowUp } from "lucide-react";

function CapsuleVisualization() {
  return (
    <div className="viacap-capsule-stage relative mx-auto flex h-full min-h-[420px] w-full max-w-[520px] items-center justify-center md:min-h-[480px]">
      {/* Outer capsule callout — top left */}
      <article className="viacap-callout viacap-callout--outer absolute left-0 top-[8%] z-10 hidden max-w-[220px] md:block lg:max-w-[240px]">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
          Outer Capsule
        </p>
        <p className="mt-2 font-sans text-[11px] font-light leading-[1.65] tracking-[0.02em] text-white/85">
          Shields probiotics from stomach acid in the digestive tract, while
          delivering prebiotics to stimulate the growth of beneficial bacteria.
        </p>
        <div className="viacap-callout-line viacap-callout-line--outer" aria-hidden />
      </article>

      {/* Capsule render */}
      <div className="viacap-capsule relative z-[5] h-[min(420px,58vh)] w-[min(120px,22vw)] shrink-0 md:h-[min(480px,62vh)] md:w-[min(132px,18vw)]">
        <svg
          viewBox="0 0 132 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.35)]"
          aria-hidden
        >
          <defs>
            <linearGradient id="viacap-outer-top" x1="66" y1="0" x2="66" y2="160">
              <stop offset="0%" stopColor="#7fb068" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#4a7a3a" stopOpacity="0.88" />
            </linearGradient>
            <linearGradient id="viacap-outer-bottom" x1="66" y1="320" x2="66" y2="480">
              <stop offset="0%" stopColor="#4a7a3a" stopOpacity="0.88" />
              <stop offset="100%" stopColor="#7fb068" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="viacap-inner" x1="66" y1="150" x2="66" y2="330">
              <stop offset="0%" stopColor="#1a2e18" />
              <stop offset="50%" stopColor="#0f1a0e" />
              <stop offset="100%" stopColor="#1a2e18" />
            </linearGradient>
            <linearGradient id="viacap-shine" x1="30" y1="0" x2="100" y2="480">
              <stop offset="0%" stopColor="white" stopOpacity="0.28" />
              <stop offset="35%" stopColor="white" stopOpacity="0.06" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <clipPath id="viacap-clip">
              <rect x="8" y="8" width="116" height="464" rx="58" />
            </clipPath>
          </defs>

          {/* Outer shell top */}
          <path
            d="M66 8C34 8 8 34 8 66V150C8 182 34 208 66 208C98 208 124 182 124 150V66C124 34 98 8 66 8Z"
            fill="url(#viacap-outer-top)"
            fillOpacity="0.72"
          />
          {/* Outer shell bottom */}
          <path
            d="M66 272C34 272 8 298 8 330V414C8 446 34 472 66 472C98 472 124 446 124 414V330C124 298 98 272 66 272Z"
            fill="url(#viacap-outer-bottom)"
            fillOpacity="0.72"
          />
          {/* Inner capsule body */}
          <rect
            x="22"
            y="148"
            width="88"
            height="184"
            rx="44"
            fill="url(#viacap-inner)"
          />
          {/* Inner capsule seam highlight */}
          <ellipse cx="66" cy="148" rx="38" ry="8" fill="#2a4528" fillOpacity="0.6" />
          <ellipse cx="66" cy="332" rx="38" ry="8" fill="#2a4528" fillOpacity="0.6" />
          {/* Glass shine */}
          <rect
            x="8"
            y="8"
            width="116"
            height="464"
            rx="58"
            fill="url(#viacap-shine)"
            clipPath="url(#viacap-clip)"
          />
          {/* Outer rim strokes */}
          <rect
            x="8"
            y="8"
            width="116"
            height="464"
            rx="58"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Inner capsule callout — bottom right */}
      <article className="viacap-callout viacap-callout--inner absolute bottom-[10%] right-0 z-10 hidden max-w-[220px] md:block lg:max-w-[240px]">
        <div className="viacap-callout-line viacap-callout-line--inner mb-3" aria-hidden />
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
          Inner Capsule
        </p>
        <p className="mt-2 font-sans text-[11px] font-light leading-[1.65] tracking-[0.02em] text-white/85">
          Delivers 24 live strains of probiotics to the colon, where they&apos;re
          needed most.
        </p>
      </article>

      {/* Mobile callouts */}
      <div className="mt-8 flex w-full flex-col gap-6 md:hidden">
        <article className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
            Outer Capsule
          </p>
          <p className="mt-2 font-sans text-xs font-light leading-relaxed text-white/85">
            Shields probiotics from stomach acid in the digestive tract, while
            delivering prebiotics to stimulate the growth of beneficial bacteria.
          </p>
        </article>
        <article className="rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
            Inner Capsule
          </p>
          <p className="mt-2 font-sans text-xs font-light leading-relaxed text-white/85">
            Delivers 24 live strains of probiotics to the colon, where
            they&apos;re needed most.
          </p>
        </article>
      </div>
    </div>
  );
}

export default function ViacapTechnologySection() {
  return (
    <section
      className="viacap-section relative z-[28] overflow-hidden"
      aria-label="VIACAP Technology"
    >
      {/* Blurred bacteria background */}
      <div className="viacap-section-bg pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto flex min-h-[min(920px,100vh)] max-w-[1440px] flex-col px-4 py-10 sm:px-6 md:px-10 md:py-14 lg:px-14 lg:py-16">
        {/* Frosted glass card */}
        <div className="viacap-glass-card relative flex flex-1 flex-col overflow-hidden rounded-[32px] px-6 py-10 sm:rounded-[36px] sm:px-8 sm:py-12 md:rounded-[40px] md:px-12 md:py-14 lg:px-16 lg:py-16">
          <div className="grid flex-1 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-12">
            {/* Left column */}
            <div className="flex flex-col justify-between gap-10 lg:min-h-[480px] lg:py-2">
              <div>
                <p className="flex items-center gap-2 font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-white/90 md:text-[11px]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/90" />
                  Viacap® Technology
                </p>

                <h2 className="mt-6 max-w-[540px] font-sans text-[clamp(1.75rem,4.2vw,3rem)] font-medium leading-[1.12] tracking-[-0.02em] text-white md:mt-8">
                  Most probiotics don&apos;t survive digestion—DS-01® does.
                </h2>

                <div className="viacap-stat-box mt-8 flex items-center justify-between gap-4 rounded-2xl border border-white/25 px-4 py-4 sm:mt-10 sm:gap-6 sm:px-5 sm:py-5 md:max-w-[480px]">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <span className="shrink-0 rounded-full bg-[#1a2618]/80 px-3 py-1.5 font-sans text-[11px] font-medium text-white ring-1 ring-white/10">
                      DS-01®
                    </span>
                    <span className="font-sans text-sm font-light leading-snug text-white/95 sm:text-[15px]">
                      Increases healthy bacteria°
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-white/5">
                      <ArrowUp className="h-4 w-4 text-white" strokeWidth={2} />
                    </span>
                    <span className="font-sans text-3xl font-medium tracking-tight text-white sm:text-4xl">
                      17x
                    </span>
                  </div>
                </div>
              </div>

              <p className="font-sans text-[10px] font-light tracking-[0.04em] text-white/70">
                °Lactobacillus
              </p>
            </div>

            {/* Right column — capsule */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <CapsuleVisualization />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
