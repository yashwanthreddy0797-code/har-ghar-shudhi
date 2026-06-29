import type { VideoScrubOptions } from "@/lib/scroll/videoScrub";
import { getGsap } from "@/lib/gsap/client";
import { preferNativeScroll } from "@/lib/scroll/responsiveScroll";

/** Touch devices scrub video 1:1 with scroll — no progress lock or media lag. */
export function isImmediateVideoScrub(
  touchScroll = preferNativeScroll(),
  directVideoScrub = false
): boolean {
  return touchScroll || directVideoScrub;
}

export function resolveVideoScrubOptions(
  touchScroll = preferNativeScroll(),
  overrides: VideoScrubOptions = {}
): VideoScrubOptions {
  if (!touchScroll) return overrides;
  return {
    performanceMode: true,
    seekThreshold: 0.035,
    ...overrides,
  };
}

/** Read live ScrollTrigger progress every frame — onUpdate is throttled on touch. */
export function scrollTriggerProgress(
  scrollId: string,
  fallback = 0
): number {
  if (typeof window === "undefined") return fallback;
  try {
    const { ScrollTrigger } = getGsap();
    const st = ScrollTrigger.getById(scrollId);
    if (st?.isActive) return Math.max(0, Math.min(1, st.progress));
  } catch {
    /* GSAP not ready */
  }
  return fallback;
}
