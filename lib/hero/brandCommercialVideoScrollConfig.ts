import type { CinematicVideoScrollConfig } from "@/lib/hero/cinematicVideoScroll";

export const BRAND_COMMERCIAL_VIDEO_SCROLL: CinematicVideoScrollConfig = {
  scrollId: "brand-commercial-video-scroll",
  src: "/cinematic/har-ghar-shudhi-product-commercial.mp4",
  scrollHeightVh: 240,
  theme: "darkLuxury",
  variantLabel: "Brand film",
  ariaLabel: "Har Ghar Shudhi product commercial experience",
  videoAriaLabel: "Har Ghar Shudhi luxury product commercial film",
  eyebrow: "Har Ghar Shudhi",
  headline: ["Wellness, Refined.", "For Every Home."],
  subtext:
    "A cinematic journey through pure Ayurvedic craft — calm, premium, and rooted in the trust of everyday ritual.",
  sequenceLabel: "Scroll to experience",
  closing: {
    eyebrow: "The Har Ghar Shudhi Standard",
    title: "Premium wellness that feels intentional from the first frame to the last.",
    link: { label: "Explore the collection →", href: "/shop" },
  },
  videoLogoOverlay: {
    className: "bottom-10 right-12 md:bottom-12 md:right-[3.75rem]",
    logoClassName:
      "!h-11 !w-auto !min-w-0 !max-w-[118px] md:!h-12 md:!max-w-[128px]",
  },
};
