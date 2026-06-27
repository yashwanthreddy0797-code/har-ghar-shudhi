import type { CinematicVideoScrollConfig } from "@/lib/hero/cinematicVideoScroll";

/** Same cinematic film that played above Spirulina on the legacy homepage. */
export const ASHWAGANDHA_LUXURY_VIDEO_SCROLL: CinematicVideoScrollConfig = {
  scrollId: "ashwagandha-luxury-video-scroll",
  src: "/cinematic/har-ghar-shudhi-product-commercial.mp4",
  scrollHeightVh: 240,
  theme: "darkLuxury",
  variantLabel: "Ashwagandha film",
  ariaLabel: "Har Ghar Shudhi Ashwagandha Advance cinematic experience",
  videoAriaLabel: "Ashwagandha Advance luxury product film",
  eyebrow: "Ashwagandha Advance",
  headline: ["Balance Your Mind.", "Strengthen Your Body."],
  subtext:
    "Ashwagandha Advance — stress support and daily wellness with powerful adaptogenic herbs for strength, stamina, and balance.",
  subtextClassName: "text-white",
  videoObjectPosition: "center 65%",
  videoTransform: "translateY(12vh)",
  sequenceLabel: "Scroll to experience",
  closing: {
    eyebrow: "The Solution",
    title: "One capsule a day for a stronger, calmer you.",
    link: {
      label: "Shop Ashwagandha Advance →",
      href: "/products/ashwagandha-advance",
    },
  },
  videoLogoOverlay: {
    className: "bottom-0 right-12 md:bottom-2 md:right-[3.75rem]",
    logoClassName:
      "!h-11 !w-auto !min-w-0 !max-w-[118px] md:!h-12 md:!max-w-[128px]",
    backdropClassName:
      "rounded-sm bg-[#0b0908]/92 px-6 py-2 backdrop-blur-md md:px-8",
  },
};
