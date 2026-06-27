"use client";

import CinematicFullscreenVideoScrollSection from "@/components/CinematicFullscreenVideoScrollSection";
import { BRAND_STORY_VIDEO_SCROLL } from "@/lib/hero/brandStoryVideoScrollConfig";

export default function HomeBrandStoryVideoScrollSection() {
  return (
    <CinematicFullscreenVideoScrollSection
      config={BRAND_STORY_VIDEO_SCROLL}
      deferUntilVisible
    />
  );
}
