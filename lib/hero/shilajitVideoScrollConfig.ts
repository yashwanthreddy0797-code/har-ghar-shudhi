import type { ProductVideoScrollConfig } from "@/lib/hero/productVideoScroll";

export const SHILAJIT_VIDEO_SCROLL: ProductVideoScrollConfig = {
  sources: {
    hd: "/hero/shilajit/video/shilajit-reveal.mp4",
    uhd: "/hero/shilajit/video/shilajit-reveal.mp4",
  },
  width: 720,
  height: 1280,
  scrollHeightVh: 320,
  layout: {
    stageClass:
      "aspect-[9/16] h-[min(72vh,640px)] w-auto max-md:h-auto max-md:max-h-[34svh] max-md:w-[min(68vw,264px)]",
    columnClass: "w-[min(430px,38vw)] max-md:hidden",
  },
  hero: {
    eyebrow: "Himalayan Shilajit",
    headlineLeft: ["A Mineral Ritual.", "Revealed Slowly."],
    headlineRight: ["Ancient Power.", "Modern Purity."],
    subtext:
      "Watch the jar reveal as a premium daily ritual — purified Himalayan Shilajit, rich in fulvic acid and 80+ trace minerals.",
    cta: { label: "Shop Shilajit", href: "/shop" },
  },
  benefits: {
    left: [
      {
        title: "80+ Trace Minerals",
        text: "Naturally mineral-rich resin crafted for everyday strength and stamina.",
      },
      {
        title: "Lab-Verified Purity",
        text: "Filtered and tested for a clean, authentic Shilajit experience.",
      },
    ],
    right: [
      {
        title: "Sustained Energy",
        text: "Supports natural vitality without the crash of stimulant-led energy.",
      },
      {
        title: "Ritual Ready",
        text: "A premium jar reveal designed to feel calm, refined, and high trust.",
      },
    ],
  },
  sequenceLabel: "Scroll to reveal",
  closing: {
    eyebrow: "Pure Mineral Strength",
    title: "A premium Shilajit ritual, revealed with quiet confidence.",
    description:
      "Har Ghar Shudhi Shilajit brings ancient mineral nourishment into a modern wellness routine — refined, tested, and presented with the trust a daily ritual deserves.",
    link: { label: "Explore Shilajit →", href: "/shop" },
  },
};
