"use client";

import HoneyLuxuryVideoScrollSection from "@/components/honey/HoneyLuxuryVideoScrollSection";
import ProductVideoScrollSection from "@/components/ProductVideoScrollSection";
import ShilajitHeroZoomSection from "@/components/shilajit/ShilajitHeroZoomSection";
import CinematicFullscreenVideoScrollSection from "@/components/CinematicFullscreenVideoScrollSection";
import AshwagandhaScrollSection from "@/components/ashwagandha/AshwagandhaScrollSection";
import { MORINGA_VIDEO_SCROLL } from "@/lib/hero/moringaVideoScrollConfig";
import { SHILAJIT_VIDEO_SCROLL } from "@/lib/hero/shilajitVideoScrollConfig";
import { SPIRULINA_LUXURY_VIDEO_SCROLL } from "@/lib/hero/spirulinaLuxuryVideoScrollConfig";
import type { CatalogScrollSlug } from "@/lib/catalog/scrollProducts";

export default function CatalogProductScrollHero({ slug }: { slug: CatalogScrollSlug }) {
  switch (slug) {
    case "wildforest-multiflora-honey":
      return <HoneyLuxuryVideoScrollSection />;

    case "moringa-powder":
      return (
        <ProductVideoScrollSection
          config={MORINGA_VIDEO_SCROLL}
          scrollId="moringa-video-scroll"
          theme="light"
          priority
          poster="/hero/moringa/video/moringa-reveal-poster.webp"
        />
      );

    case "pure-shilajit":
      return (
        <>
          <ShilajitHeroZoomSection />
          <ProductVideoScrollSection
            config={SHILAJIT_VIDEO_SCROLL}
            scrollId="shilajit-video-scroll"
            theme="dark"
            priority
          />
        </>
      );

    case "ashwagandha-advance":
      return <AshwagandhaScrollSection />;

    case "spirulina-powder":
      return (
        <CinematicFullscreenVideoScrollSection
          config={SPIRULINA_LUXURY_VIDEO_SCROLL}
          priority
        />
      );

    default:
      return null;
  }
}
