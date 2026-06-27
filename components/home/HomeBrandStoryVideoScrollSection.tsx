"use client";

import CinematicFullscreenVideoScrollSection from "@/components/CinematicFullscreenVideoScrollSection";
import { BRAND_STORY_VIDEO_SCROLL } from "@/lib/hero/brandStoryVideoScrollConfig";
import { startBrandStoryVideoWarm } from "@/lib/hero/warmBrandStoryVideo";

startBrandStoryVideoWarm();

export default function HomeBrandStoryVideoScrollSection() {
  return (
    <CinematicFullscreenVideoScrollSection
      config={BRAND_STORY_VIDEO_SCROLL}
      priority
    />
  );
}
