import type { CinematicVideoScrollConfig } from "@/lib/hero/cinematicVideoScroll";

export const BRAND_STORY_VIDEO_SCROLL: CinematicVideoScrollConfig = {
  scrollId: "home-brand-story-video-scroll",
  src: "/cinematic/har-ghar-shudhi-brand-story-scrub.mp4",
  scrollHeightVh: 225,
  theme: "darkLuxury",
  ariaLabel: "Har Ghar Shudhi brand story cinematic experience",
  videoAriaLabel: "Har Ghar Shudhi brand story film",
  eyebrow: "",
  headline: ["", ""],
  subtext: "",
  sequenceLabel: "",
  hideOverlayCopy: true,
  hideVariantLabel: true,
  hideScrollHint: true,
  disableVideoScale: true,
  directVideoScrub: true,
  videoStartTime: 1,
  videoScrub: {
    performanceMode: true,
    seekThreshold: 0.05,
  },
  closing: {
    eyebrow: "Our Story",
    title: "Wellness that begins with trust — from nature to your doorstep.",
    link: { label: "Read our story →", href: "/about" },
  },
  videoLogoOverlay: {
    className: "bottom-8 right-11 md:bottom-9 md:right-[3.25rem]",
    logoClassName:
      "!h-11 !w-auto !min-w-0 !max-w-[118px] md:!h-12 md:!max-w-[128px]",
    backdropClassName:
      "rounded-sm bg-[#0b0908]/94 px-6 py-2 backdrop-blur-md md:px-8",
  },
};
