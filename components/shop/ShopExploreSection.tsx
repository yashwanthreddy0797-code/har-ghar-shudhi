"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap/client";
import { isScrollExperienceReady, onLenisInit } from "@/lib/scroll/lenisReady";
import { scrollStepForViewport, exploreScrubForViewport } from "@/lib/scroll/responsiveScroll";
import {
  SHOP_EXPLORE,
  SHOP_EXPLORE_ENTER,
  SHOP_EXPLORE_EXIT,
  SHOP_EXPLORE_PRIMARY,
  SHOP_EXPLORE_SECONDARY,
  type ShopExploreHighlight,
} from "@/lib/shop/exploreProductsConfig";
import { EXPLORE_HIGHLIGHT_ICONS } from "@/lib/shop/exploreHighlightIcons";

const SCROLL_ID = "shop-explore-products";

type ExplorePose = {
  left: string;
  scale: number;
  opacity: number;
  zIndex: number;
};

const BASE_POSE = {
  top: SHOP_EXPLORE_PRIMARY.top,
  xPercent: SHOP_EXPLORE_PRIMARY.xPercent,
  yPercent: SHOP_EXPLORE_PRIMARY.yPercent,
  transformOrigin: SHOP_EXPLORE_PRIMARY.transformOrigin,
  filter: "blur(0px)",
} as const;

function parsePercent(value: string) {
  return parseFloat(value);
}

function mixPose(from: ExplorePose, to: ExplorePose, t: number): ExplorePose {
  const left = mix(parsePercent(from.left), parsePercent(to.left), t);
  return {
    left: `${left}%`,
    scale: mix(from.scale, to.scale, t),
    opacity: mix(from.opacity, to.opacity, t),
    zIndex: t < 0.5 ? from.zIndex : to.zIndex,
  };
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function toGsapPose(pose: ExplorePose, visible: boolean) {
  return {
    ...BASE_POSE,
    left: pose.left,
    scale: pose.scale,
    opacity: pose.opacity,
    zIndex: pose.zIndex,
    visibility: visible ? ("visible" as const) : ("hidden" as const),
    position: "absolute" as const,
  };
}

function getProductPose(
  productIdx: number,
  step: number,
  local: number,
  count: number,
  ease: (t: number) => number
): { pose: ExplorePose; visible: boolean } {
  const primaryIdx = step;
  const secondaryIdx = (step + 1) % count;
  const incomingIdx = (step + 2) % count;
  const t = ease(Math.min(Math.max(local, 0), 1));

  const primary: ExplorePose = {
    left: SHOP_EXPLORE_PRIMARY.left,
    scale: SHOP_EXPLORE_PRIMARY.scale,
    opacity: SHOP_EXPLORE_PRIMARY.opacity,
    zIndex: SHOP_EXPLORE_PRIMARY.zIndex,
  };
  const secondary: ExplorePose = {
    left: SHOP_EXPLORE_SECONDARY.left,
    scale: SHOP_EXPLORE_SECONDARY.scale,
    opacity: SHOP_EXPLORE_SECONDARY.opacity,
    zIndex: SHOP_EXPLORE_SECONDARY.zIndex,
  };
  const exit: ExplorePose = {
    left: SHOP_EXPLORE_EXIT.left,
    scale: SHOP_EXPLORE_EXIT.scale,
    opacity: SHOP_EXPLORE_EXIT.opacity,
    zIndex: SHOP_EXPLORE_EXIT.zIndex,
  };
  const enter: ExplorePose = {
    left: SHOP_EXPLORE_ENTER.left,
    scale: SHOP_EXPLORE_ENTER.scale,
    opacity: SHOP_EXPLORE_ENTER.opacity,
    zIndex: SHOP_EXPLORE_ENTER.zIndex,
  };

  if (productIdx === primaryIdx) {
    const fade = Math.min(t * 1.35, 1);
    const pose = mixPose(primary, exit, t);
    pose.opacity = mix(1, 0, fade);
    return { pose, visible: pose.opacity > 0.02 };
  }

  if (productIdx === secondaryIdx) {
    return { pose: mixPose(secondary, primary, t), visible: true };
  }

  if (productIdx === incomingIdx) {
    const pose = mixPose(enter, secondary, t);
    return { pose, visible: pose.opacity > 0.04 };
  }

  return { pose: enter, visible: false };
}

function HighlightIcon({ item }: { item: ShopExploreHighlight }) {
  const Icon = EXPLORE_HIGHLIGHT_ICONS[item.iconKey] ?? EXPLORE_HIGHLIGHT_ICONS.default;

  return (
    <span
      aria-hidden
      className="flex h-full w-full items-center justify-center rounded-full"
      style={{
        background: `radial-gradient(circle at 28% 22%, rgba(255,255,255,0.42) 0%, transparent 48%), linear-gradient(145deg, ${item.accent} 0%, color-mix(in srgb, ${item.accent} 68%, #000) 100%)`,
      }}
    >
      <Icon className="h-5 w-5 text-white/95" strokeWidth={1.65} />
    </span>
  );
}

export default function ShopExploreSection() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const highlightRefs = useRef<(HTMLUListElement | null)[]>([]);

  const { headline, subtitle, products, scrollVhPerStep } = SHOP_EXPLORE;
  const slideCount = products.length;

  useLayoutEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;

      const root = rootRef.current;
      const pin = pinRef.current;
      if (!root || !pin) return;

      const productEls = productRefs.current.filter(Boolean) as HTMLDivElement[];
      const highlightEls = highlightRefs.current.filter(Boolean) as HTMLUListElement[];
      if (productEls.length !== slideCount || highlightEls.length !== slideCount) return;

      const { gsap, ScrollTrigger } = getGsap();
      ctx?.revert();

      ctx = gsap.context(() => {
        const reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        const handoffEase = gsap.parseEase("power2.out");
        const maxStep = Math.max(slideCount - 2, 0);

        const applyFrame = (travel: number) => {
          const step = Math.min(Math.floor(travel), maxStep);
          const local = travel - step;

          productEls.forEach((el, idx) => {
            const { pose, visible } = getProductPose(
              idx,
              step,
              local,
              slideCount,
              handoffEase
            );
            gsap.set(el, toGsapPose(pose, visible));
          });

          highlightEls.forEach((el, idx) => {
            const outIdx = step;
            const inIdx = (step + 1) % slideCount;
            const OUT_END = 0.36;
            const IN_START = 0.44;

            if (idx === outIdx) {
              const outT = Math.min(local / OUT_END, 1);
              const opacity = 1 - outT;
              gsap.set(el, {
                opacity,
                y: mix(0, -12, outT),
                visibility: opacity > 0.02 ? "visible" : "hidden",
              });
              return;
            }

            if (idx === inIdx) {
              const inT =
                local <= IN_START
                  ? 0
                  : Math.min((local - IN_START) / (1 - IN_START), 1);
              const opacity = inT;
              gsap.set(el, {
                opacity,
                y: mix(16, 0, inT),
                visibility: opacity > 0.02 ? "visible" : "hidden",
              });
              return;
            }

            gsap.set(el, { opacity: 0, y: 16, visibility: "hidden" });
          });
        };

        applyFrame(0);

        if (reducedMotion || slideCount < 2) {
          highlightEls.forEach((el, idx) => {
            gsap.set(el, {
              opacity: idx === 0 ? 1 : 0,
              y: 0,
              visibility: idx === 0 ? "visible" : "hidden",
            });
          });
          return;
        }

        const scrollDistance = () => {
          const stepVh = scrollStepForViewport(scrollVhPerStep);
          return Math.max(
            window.innerHeight * ((slideCount - 1) * stepVh) / 100,
            window.innerWidth <= 767 ? 420 : 520
          );
        };

        ScrollTrigger.create({
          id: SCROLL_ID,
          trigger: root,
          start: "top top",
          end: () => `+=${scrollDistance()}`,
          pin,
          scrub: exploreScrubForViewport(),
          pinType: window.innerWidth <= 767 ? "transform" : "fixed",
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const travel = self.progress * (slideCount - 1);
            applyFrame(travel);
          },
        });

        ScrollTrigger.refresh();
      }, root);

      const imgs = root.querySelectorAll(".shop-explore-product img");
      imgs.forEach((img) => {
        if ((img as HTMLImageElement).complete) return;
        img.addEventListener("load", () => getGsap().ScrollTrigger.refresh(), { once: true });
      });
    };

    let booted = false;
    const boot = () => {
      if (booted) return;
      booted = true;
      setup();
    };
    const onResize = () => getGsap().ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    if (isScrollExperienceReady()) {
      boot();
    } else {
      const detachLenis = onLenisInit(boot);
      const readyPoll = window.setInterval(() => {
        if (isScrollExperienceReady()) {
          window.clearInterval(readyPoll);
          boot();
        }
      }, 60);
      const readyFallback = window.setTimeout(boot, 220);

      return () => {
        cancelled = true;
        detachLenis();
        window.clearInterval(readyPoll);
        window.clearTimeout(readyFallback);
        window.removeEventListener("resize", onResize);
        ctx?.revert();
      };
    }

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      ctx?.revert();
    };
  }, [slideCount, scrollVhPerStep]);

  return (
    <section
      ref={rootRef}
      aria-labelledby="shop-explore-heading"
      className="shop-explore-section relative bg-brand-white pb-10 md:pb-14"
    >
      <div
        ref={pinRef}
        className="shop-explore-pin flex min-h-[68svh] items-start border-t border-brand-border px-5 pt-12 pb-0 max-md:pt-10 sm:px-6 md:px-12 md:pt-16 lg:min-h-[76svh]"
      >
        <div className="mx-auto grid w-full max-w-6xl items-start gap-8 max-md:gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16 lg:items-center">
          <div
            ref={stageRef}
            className="shop-explore-stage relative order-1 mx-auto aspect-[1.05/1] w-full max-w-[min(100%,22rem)] overflow-visible max-md:max-w-[min(92vw,20rem)] sm:max-w-[24rem] lg:order-2 lg:mt-24 lg:max-w-[42rem]"
          >
            {products.map((product, index) => (
              <div
                key={product.slug}
                ref={(el) => {
                  productRefs.current[index] = el;
                }}
                className="shop-explore-product gpu-layer absolute flex h-[min(64vw,15.5rem)] w-[min(52vw,11.5rem)] items-end justify-center will-change-transform max-md:h-[min(68vw,16.5rem)] max-md:w-[min(56vw,12.5rem)] sm:h-[18rem] sm:w-[12.5rem] md:h-[20rem] md:w-[13rem]"
              >
                <Image
                  src={product.src}
                  alt={product.alt}
                  width={product.width}
                  height={product.height}
                  quality={100}
                  unoptimized
                  className="h-full w-full object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.12)]"
                />
              </div>
            ))}
          </div>

          <div className="relative z-10 order-2 lg:order-1">
            <h2
              id="shop-explore-heading"
              className="font-display text-[clamp(2rem,8vw,4.25rem)] font-medium leading-[0.95] tracking-[0.01em] max-md:text-center"
            >
              <span className="block text-brand-text">{headline.primary}</span>
              <span className="mt-1 block text-brand-green">{headline.accent}</span>
            </h2>

            <p className="mt-4 max-w-md font-body text-[15px] leading-relaxed text-brand-muted max-md:mx-auto max-md:text-center md:mt-5 md:text-[1.05rem]">
              {subtitle}
            </p>

            <div className="relative mt-8 flex min-h-[14rem] items-center max-md:mt-6 md:mt-14 md:min-h-[17.5rem]">
              {products.map((product, index) => (
                <ul
                  key={product.slug}
                  ref={(el) => {
                    highlightRefs.current[index] = el;
                  }}
                  className="shop-explore-highlights absolute inset-0 flex flex-col justify-center gap-2 max-md:gap-2.5 md:gap-3"
                  aria-hidden
                >
                  {product.highlights.map((item) => (
                    <li
                      key={item.id}
                      className="shop-explore-highlight-row flex items-center gap-3 max-md:mx-auto max-md:w-full max-md:max-w-xs md:gap-3.5"
                    >
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.05] max-md:h-9 max-md:w-9 md:h-11 md:w-11">
                        <HighlightIcon item={item} />
                      </span>
                      <span className="font-shop text-[13px] font-medium leading-snug tracking-[0.01em] text-brand-text/90 max-md:text-[12px] md:text-[15px]">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
