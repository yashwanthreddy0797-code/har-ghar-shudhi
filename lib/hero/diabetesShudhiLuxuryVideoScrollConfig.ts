import type { CinematicVideoScrollConfig } from "@/lib/hero/cinematicVideoScroll";

export const DIABETES_SHUDHI_LUXURY_VIDEO_SCROLL: CinematicVideoScrollConfig = {
  scrollId: "diabetes-shudhi-luxury-video-scroll",
  src: "/hero/diabetes-shudhi/video/diabetes-shudhi-luxury-film-scrub.mp4",
  poster: "/hero/diabetes-shudhi/video/diabetes-shudhi-luxury-poster.jpg",
  scrollHeightVh: 240,
  theme: "warmHoney",
  variantLabel: "Diabetes Shudhi film",
  ariaLabel: "Har Ghar Shudhi Diabetes Shudhi cinematic product experience",
  videoAriaLabel: "Diabetes Shudhi luxury blood sugar support product film",
  warmPromiseKey: "diabetesShudhi",
  eyebrow: "Diabetes Shudhi",
  headline: ["Golden Balance.", "Metabolic Wellness."],
  subtext:
    "An Ayurvedic blend crafted to support blood sugar balance, healthy metabolism, and antioxidant protection — lab tested, pure, and made for everyday wellness.",
  sequenceLabel: "Scroll to experience",
  disableVideoScale: true,
  videoObjectPosition: "center center",
  closing: {
    eyebrow: "Blood Sugar Support",
    title: "Support your metabolic wellness journey with clean botanicals you can trust.",
    link: { label: "Shop Diabetes Shudhi →", href: "/products/diabetes-shudhi" },
  },
  videoLogoOverlay: {
    className: "bottom-5 right-11 md:bottom-6 md:right-14",
    logoClassName:
      "!h-12 !w-auto !min-w-0 !max-w-[132px] md:!h-[3.25rem] md:!max-w-[142px]",
    backdropClassName:
      "rounded-sm bg-[#140e08]/96 px-6 py-2.5 backdrop-blur-md md:px-8 md:py-3",
  },
};
