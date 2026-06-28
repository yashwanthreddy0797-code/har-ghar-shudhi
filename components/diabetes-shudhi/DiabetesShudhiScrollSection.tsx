import CinematicFullscreenVideoScrollSection from "@/components/CinematicFullscreenVideoScrollSection";
import { DIABETES_SHUDHI_LUXURY_VIDEO_SCROLL } from "@/lib/hero/diabetesShudhiLuxuryVideoScrollConfig";

export default function DiabetesShudhiScrollSection() {
  return (
    <CinematicFullscreenVideoScrollSection
      config={DIABETES_SHUDHI_LUXURY_VIDEO_SCROLL}
      priority
    />
  );
}
