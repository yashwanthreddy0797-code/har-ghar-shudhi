import type { ProductVideoScrollConfig } from "@/lib/hero/productVideoScroll";

export const MORINGA_VIDEO_SCROLL: ProductVideoScrollConfig = {
  sources: {
    hd: "/hero/moringa/video/moringa-powder-reveal-1080p.mp4",
    uhd: "/hero/moringa/video/moringa-powder-reveal-4k.mp4",
  },
  width: 1920,
  height: 1080,
  scrollHeightVh: 320,
  poster: "/hero/moringa/video/moringa-reveal-poster.jpg",
  layout: {
    stageClass:
      "aspect-video w-full max-w-[min(960px,52vw)] max-h-[min(62vh,540px)] max-md:aspect-video max-md:max-h-[42svh] max-md:max-w-[min(90vw,360px)]",
    columnClass: "w-[min(960px,52vw)] max-md:hidden",
  },
  hero: {
    eyebrow: "Moringa Powder",
    headlineLeft: ["Pure Potency.", "Peak Nutrition."],
    headlineRight: ["From Leaf", "To Life."],
    subtext:
      "Watch our cold-processed moringa emerge — sealed at source to preserve vitamins, minerals, and antioxidants in every scoop.",
    cta: { label: "Shop Moringa", href: "/shop" },
  },
  benefits: {
    left: [
      {
        title: "Rich in Vitamins & Minerals",
        text: "90+ nutrients in every spoon — iron, calcium and vitamins A, C & E.",
      },
      {
        title: "Cold-Processed Purity",
        text: "Dried below 40°C to lock in chlorophyll, enzymes and antioxidants.",
      },
    ],
    right: [
      {
        title: "Sustained Plant Energy",
        text: "Clean, caffeine-free vitality to power your everyday ritual.",
      },
      {
        title: "Sealed at Source",
        text: "Harvested, milled and packed at peak freshness — never sitting in transit.",
      },
    ],
  },
  sequenceLabel: "Scroll to reveal",
  closing: {
    eyebrow: "Daily Wellness",
    title: "One spoonful. Ninety nutrients. Zero compromise.",
    description:
      "Har Ghar Shudhi Moringa Powder is harvested at peak freshness, finely milled, and packed to deliver clean plant energy for your everyday ritual.",
    link: { label: "Explore Moringa Powder →", href: "/shop" },
  },
};
