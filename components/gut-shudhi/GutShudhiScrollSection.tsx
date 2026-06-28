import CinematicFullscreenVideoScrollSection from "@/components/CinematicFullscreenVideoScrollSection";
import { GUT_SHUDHI_LUXURY_VIDEO_SCROLL } from "@/lib/hero/gutShudhiLuxuryVideoScrollConfig";

export default function GutShudhiScrollSection() {
  return (
    <CinematicFullscreenVideoScrollSection
      config={GUT_SHUDHI_LUXURY_VIDEO_SCROLL}
      priority
    />
  );
}
