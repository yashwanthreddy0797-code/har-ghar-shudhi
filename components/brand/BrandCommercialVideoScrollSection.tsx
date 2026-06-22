import CinematicFullscreenVideoScrollSection from "@/components/CinematicFullscreenVideoScrollSection";
import { BRAND_COMMERCIAL_VIDEO_SCROLL } from "@/lib/hero/brandCommercialVideoScrollConfig";

export default function BrandCommercialVideoScrollSection() {
  return (
    <CinematicFullscreenVideoScrollSection
      config={BRAND_COMMERCIAL_VIDEO_SCROLL}
      deferUntilVisible
    />
  );
}
