import CinematicFullscreenVideoScrollSection from "@/components/CinematicFullscreenVideoScrollSection";
import { ASHWAGANDHA_LUXURY_VIDEO_SCROLL } from "@/lib/hero/ashwagandhaLuxuryVideoScrollConfig";

export default function AshwagandhaScrollSection() {
  return (
    <CinematicFullscreenVideoScrollSection
      config={ASHWAGANDHA_LUXURY_VIDEO_SCROLL}
      priority
    />
  );
}
