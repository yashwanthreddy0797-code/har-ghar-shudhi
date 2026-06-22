import type { CinematicVideoScrollConfig } from "@/lib/hero/cinematicVideoScroll";

export const LUXURY_VIDEO_SCROLL: CinematicVideoScrollConfig = {
  scrollId: "luxury-brand-video-scroll",
  src: "/cinematic/luxury-brand-reveal.mp4",
  scrollHeightVh: 240,
  theme: "darkLuxury",
  variantLabel: "Video scrub",
  ariaLabel: "Har Ghar Shudhi cinematic experience",
  videoAriaLabel: "Har Ghar Shudhi luxury wellness film",
  eyebrow: "Har Ghar Shudhi",
  headline: ["Pure Wellness.", "Crafted With Care."],
  subtext:
    "A cinematic glimpse into the calm, premium world of Ayurvedic wellness — rooted in tradition, refined for your home.",
  sequenceLabel: "Scroll to experience",
  closing: {
    eyebrow: "Everyday Ritual",
    title: "Wellness that feels as premium as it performs.",
    link: { label: "Explore the collection →", href: "/shop" },
  },
};
