import CinematicFullscreenVideoScrollSection from "@/components/CinematicFullscreenVideoScrollSection";
import { SPIRULINA_LUXURY_VIDEO_SCROLL } from "@/lib/hero/spirulinaLuxuryVideoScrollConfig";

export default function SpirulinaLuxuryVideoScrollSection() {
  return (
    <CinematicFullscreenVideoScrollSection
      config={SPIRULINA_LUXURY_VIDEO_SCROLL}
      deferUntilVisible
    />
  );
}
