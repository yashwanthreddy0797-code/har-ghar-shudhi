import type { CinematicVideoScrollConfig } from "@/lib/hero/cinematicVideoScroll";

export const GUT_SHUDHI_LUXURY_VIDEO_SCROLL: CinematicVideoScrollConfig = {
  scrollId: "gut-shudhi-luxury-video-scroll",
  src: "/hero/gut-shudhi/video/gut-shudhi-luxury-film-scrub.mp4",
  poster: "/hero/gut-shudhi/video/gut-shudhi-luxury-poster.jpg",
  scrollHeightVh: 240,
  theme: "spirulinaLuxury",
  variantLabel: "Gut Shudhi film",
  ariaLabel: "Har Ghar Shudhi Gut Shudhi cinematic product experience",
  videoAriaLabel: "Gut Shudhi luxury Ayurvedic gut wellness film",
  warmPromiseKey: "gutShudhi",
  eyebrow: "Gut Shudhi",
  headline: ["Restore Balance.", "From Within."],
  subtext:
    "A gentle Ayurvedic formula for digestive comfort, nutrient absorption, and everyday gut wellness — lab tested, pure, and made for modern routines.",
  sequenceLabel: "Scroll to experience",
  disableVideoScale: true,
  videoObjectPosition: "center center",
  closing: {
    eyebrow: "Digestive Wellness",
    title: "Support your gut with clean botanicals you can trust — every single day.",
    link: { label: "Shop Gut Shudhi →", href: "/products/gut-shudhi" },
  },
  videoLogoOverlay: {
    className: "bottom-5 right-11 md:bottom-6 md:right-14",
    logoClassName:
      "!h-12 !w-auto !min-w-0 !max-w-[132px] md:!h-[3.25rem] md:!max-w-[142px]",
    backdropClassName:
      "rounded-sm bg-[#041210]/96 px-6 py-2.5 backdrop-blur-md md:px-8 md:py-3",
  },
};
