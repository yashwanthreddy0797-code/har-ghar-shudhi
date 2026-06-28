import type { CinematicVideoScrollConfig } from "@/lib/hero/cinematicVideoScroll";

export const MASTER_MINERAL_LUXURY_VIDEO_SCROLL: CinematicVideoScrollConfig = {
  scrollId: "master-mineral-luxury-video-scroll",
  src: "/hero/master-mineral/video/master-mineral-luxury-film-scrub.mp4",
  poster: "/hero/master-mineral/video/master-mineral-luxury-poster.jpg",
  scrollHeightVh: 240,
  theme: "darkLuxury",
  variantLabel: "Master Mineral film",
  ariaLabel: "Har Ghar Shudhi Master Mineral cinematic product experience",
  videoAriaLabel: "Master Mineral luxury mineral complex product film",
  warmPromiseKey: "masterMineral",
  eyebrow: "Master Mineral",
  headline: ["Essential Minerals.", "Complete Foundation."],
  subtext:
    "A comprehensive mineral complex in bioavailable forms — supporting cellular function, bone strength, and everyday whole-body wellness.",
  sequenceLabel: "Scroll to experience",
  disableVideoScale: true,
  videoObjectPosition: "center center",
  closing: {
    eyebrow: "Mineral Complex",
    title: "Build your daily mineral foundation with clean, lab-tested botanical integrity.",
    link: { label: "Shop Master Mineral →", href: "/products/master-mineral" },
  },
  videoLogoOverlay: {
    className: "bottom-5 right-11 md:bottom-6 md:right-14",
    logoClassName:
      "!h-12 !w-auto !min-w-0 !max-w-[132px] md:!h-[3.25rem] md:!max-w-[142px]",
    backdropClassName:
      "rounded-sm bg-[#0b0908]/96 px-6 py-2.5 backdrop-blur-md md:px-8 md:py-3",
  },
};
