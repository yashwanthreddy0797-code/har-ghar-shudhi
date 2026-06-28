"use client";

import { useLayoutEffect } from "react";
import HoneyLuxuryVideoScrollSection from "@/components/honey/HoneyLuxuryVideoScrollSection";
import ProductVideoScrollSection from "@/components/ProductVideoScrollSection";
import ShilajitHeroZoomSection from "@/components/shilajit/ShilajitHeroZoomSection";
import CinematicFullscreenVideoScrollSection from "@/components/CinematicFullscreenVideoScrollSection";
import AshwagandhaScrollSection from "@/components/ashwagandha/AshwagandhaScrollSection";
import GutShudhiScrollSection from "@/components/gut-shudhi/GutShudhiScrollSection";
import MasterMineralScrollSection from "@/components/master-mineral/MasterMineralScrollSection";
import DiabetesShudhiScrollSection from "@/components/diabetes-shudhi/DiabetesShudhiScrollSection";
import { MORINGA_VIDEO_SCROLL } from "@/lib/hero/moringaVideoScrollConfig";
import { SHILAJIT_VIDEO_SCROLL } from "@/lib/hero/shilajitVideoScrollConfig";
import { SPIRULINA_LUXURY_VIDEO_SCROLL } from "@/lib/hero/spirulinaLuxuryVideoScrollConfig";
import { ASHWAGANDHA_LUXURY_VIDEO_SCROLL } from "@/lib/hero/ashwagandhaLuxuryVideoScrollConfig";
import { GUT_SHUDHI_LUXURY_VIDEO_SCROLL } from "@/lib/hero/gutShudhiLuxuryVideoScrollConfig";
import { MASTER_MINERAL_LUXURY_VIDEO_SCROLL } from "@/lib/hero/masterMineralLuxuryVideoScrollConfig";
import { DIABETES_SHUDHI_LUXURY_VIDEO_SCROLL } from "@/lib/hero/diabetesShudhiLuxuryVideoScrollConfig";
import { preloadImageAsset, preloadVideoAsset } from "@/lib/scroll/preloadMedia";
import { warmVideoToFirstFrame } from "@/lib/scroll/videoReadiness";
import type { CatalogScrollSlug } from "@/lib/catalog/scrollProducts";

const MORINGA_POSTER = MORINGA_VIDEO_SCROLL.poster ?? "/hero/moringa/video/moringa-reveal-poster.jpg";

export default function CatalogProductScrollHero({ slug }: { slug: CatalogScrollSlug }) {
  useLayoutEffect(() => {
    if (slug === "moringa-powder") {
      preloadVideoAsset(MORINGA_VIDEO_SCROLL.sources.hd);
      preloadImageAsset(MORINGA_POSTER);
      window.__heroWarmPromises = {
        ...window.__heroWarmPromises,
        moringa: warmVideoToFirstFrame(MORINGA_VIDEO_SCROLL.sources.hd, 10000),
      };
    }

    if (slug === "ashwagandha-advance") {
      preloadVideoAsset(ASHWAGANDHA_LUXURY_VIDEO_SCROLL.src);
      window.__heroWarmPromises = {
        ...window.__heroWarmPromises,
        ashwagandha: warmVideoToFirstFrame(
          ASHWAGANDHA_LUXURY_VIDEO_SCROLL.src,
          14000,
        ),
      };
    }

    if (slug === "gut-shudhi") {
      preloadVideoAsset(GUT_SHUDHI_LUXURY_VIDEO_SCROLL.src);
      if (GUT_SHUDHI_LUXURY_VIDEO_SCROLL.poster) {
        preloadImageAsset(GUT_SHUDHI_LUXURY_VIDEO_SCROLL.poster);
      }
      window.__heroWarmPromises = {
        ...window.__heroWarmPromises,
        gutShudhi: warmVideoToFirstFrame(
          GUT_SHUDHI_LUXURY_VIDEO_SCROLL.src,
          12000,
        ),
      };
    }

    if (slug === "master-mineral") {
      preloadVideoAsset(MASTER_MINERAL_LUXURY_VIDEO_SCROLL.src);
      if (MASTER_MINERAL_LUXURY_VIDEO_SCROLL.poster) {
        preloadImageAsset(MASTER_MINERAL_LUXURY_VIDEO_SCROLL.poster);
      }
      window.__heroWarmPromises = {
        ...window.__heroWarmPromises,
        masterMineral: warmVideoToFirstFrame(
          MASTER_MINERAL_LUXURY_VIDEO_SCROLL.src,
          12000,
        ),
      };
    }

    if (slug === "diabetes-shudhi") {
      preloadVideoAsset(DIABETES_SHUDHI_LUXURY_VIDEO_SCROLL.src);
      if (DIABETES_SHUDHI_LUXURY_VIDEO_SCROLL.poster) {
        preloadImageAsset(DIABETES_SHUDHI_LUXURY_VIDEO_SCROLL.poster);
      }
      window.__heroWarmPromises = {
        ...window.__heroWarmPromises,
        diabetesShudhi: warmVideoToFirstFrame(
          DIABETES_SHUDHI_LUXURY_VIDEO_SCROLL.src,
          12000,
        ),
      };
    }
  }, [slug]);

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
          poster={MORINGA_VIDEO_SCROLL.poster}
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

    case "gut-shudhi":
      return <GutShudhiScrollSection />;

    case "master-mineral":
      return <MasterMineralScrollSection />;

    case "diabetes-shudhi":
      return <DiabetesShudhiScrollSection />;

    default:
      return null;
  }
}
