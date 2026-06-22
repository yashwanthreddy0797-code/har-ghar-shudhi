import type { CinematicVideoScrollConfig } from "@/lib/hero/cinematicVideoScroll";

export const HONEY_LUXURY_VIDEO_SCROLL: CinematicVideoScrollConfig = {
  scrollId: "honey-luxury-video-scroll",
  src: "/hero/honey/video/luxury-honey-product-film.mp4",
  scrollHeightVh: 240,
  theme: "warmHoney",
  variantLabel: "Honey film",
  ariaLabel: "Har Ghar Shudhi luxury honey film experience",
  videoAriaLabel: "Luxury raw forest honey product film",
  eyebrow: "Raw Forest Honey",
  headline: ["Liquid Gold.", "Harvested Wild."],
  subtext:
    "A slow cinematic pour — unfiltered multiflora honey, rich in enzymes and natural warmth, captured in its purest form.",
  sequenceLabel: "Scroll to reveal",
  closing: {
    eyebrow: "Wild & Unfiltered",
    title: "Honey that moves like light — thick, luminous, and unmistakably pure.",
    link: { label: "Shop Raw Honey →", href: "/shop" },
  },
  videoLogoOverlay: {
    className: "bottom-10 right-12 md:bottom-12 md:right-[3.75rem]",
    logoClassName:
      "!h-11 !w-auto !min-w-0 !max-w-[118px] md:!h-12 md:!max-w-[128px]",
  },
};
