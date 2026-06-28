import CinematicFullscreenVideoScrollSection from "@/components/CinematicFullscreenVideoScrollSection";
import { MASTER_MINERAL_LUXURY_VIDEO_SCROLL } from "@/lib/hero/masterMineralLuxuryVideoScrollConfig";

export default function MasterMineralScrollSection() {
  return (
    <CinematicFullscreenVideoScrollSection
      config={MASTER_MINERAL_LUXURY_VIDEO_SCROLL}
      priority
    />
  );
}
