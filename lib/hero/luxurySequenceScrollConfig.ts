const FRAME_COUNT = 76;
const FRAME_WIDTH = 1764;
const FRAME_HEIGHT = 1176;

export const LUXURY_SEQUENCE_SCROLL = {
  frameCount: FRAME_COUNT,
  frameWidth: FRAME_WIDTH,
  frameHeight: FRAME_HEIGHT,
  frames: Array.from({ length: FRAME_COUNT }, (_, index) => ({
    src: `/cinematic/luxury-brand-sequence/frame-${String(index + 1).padStart(3, "0")}.jpg`,
    width: FRAME_WIDTH,
    height: FRAME_HEIGHT,
  })),
  scrollHeightVh: 240,
  variantLabel: "Frame sequence",
  eyebrow: "Har Ghar Shudhi",
  headline: ["Pure Wellness.", "Crafted With Care."],
  subtext:
    "The same cinematic story told frame-by-frame — buttery smooth on scroll, with zero video decode lag.",
  sequenceLabel: "Scroll to experience",
  closing: {
    eyebrow: "Frame Sequence",
    title: "Silky scroll playback from 76 hand-picked frames.",
    link: { label: "Explore the collection →", href: "/shop" },
  },
} as const;
