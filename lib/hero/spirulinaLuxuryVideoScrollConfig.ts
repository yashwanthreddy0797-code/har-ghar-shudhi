import type { CinematicVideoScrollConfig } from "@/lib/hero/cinematicVideoScroll";

export const SPIRULINA_LUXURY_VIDEO_SCROLL: CinematicVideoScrollConfig = {
  scrollId: "spirulina-luxury-video-scroll",
  src: "/hero/spirulina/video/spirulina-powder-luxury-film.mp4",
  scrollHeightVh: 240,
  theme: "spirulinaLuxury",
  variantLabel: "Spirulina film",
  ariaLabel: "Har Ghar Shudhi Spirulina luxury film experience",
  videoAriaLabel: "Luxury Spirulina powder bottle product film",
  eyebrow: "Spirulina Powder",
  headline: ["Ocean Green.", "Earth Strong."],
  subtext:
    "A cinematic reveal of premium spirulina — complete plant protein, vivid vitality, and clean daily energy in every scoop.",
  sequenceLabel: "Scroll to reveal",
  closing: {
    eyebrow: "Complete Superfood",
    title: "Protein-rich spirulina, presented with the calm confidence of true luxury.",
    link: { label: "Shop Spirulina Powder →", href: "/products/spirulina-powder" },
  },
  videoLogoOverlay: {
    className: "bottom-10 right-12 md:bottom-12 md:right-[3.75rem]",
    logoClassName:
      "!h-11 !w-auto !min-w-0 !max-w-[118px] md:!h-12 md:!max-w-[128px]",
  },
};
