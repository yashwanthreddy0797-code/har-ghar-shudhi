"use client";

import { useLayoutEffect } from "react";
import { getGsap } from "@/lib/gsap/client";
import { preloadImageAsset, preloadVideoAsset } from "@/lib/scroll/preloadMedia";
import { warmVideoToFirstFrame } from "@/lib/scroll/videoReadiness";
import { preferNativeScroll } from "@/lib/scroll/responsiveScroll";
import { HONEY_LUXURY_VIDEO_SCROLL } from "@/lib/hero/honeyLuxuryVideoScrollConfig";
import { MORINGA_VIDEO_SCROLL } from "@/lib/hero/moringaVideoScrollConfig";
import { SHILAJIT_HERO_ZOOM } from "@/lib/hero/shilajitHeroZoomConfig";

const MORINGA_POSTER_SRC = "/hero/moringa/video/moringa-reveal-poster.webp";

const INTRO_COMPLETE_EVENT = "site-intro-complete";

/** Warm GSAP + top-of-page media before the user finishes the intro. */
export default function HomeTopSectionsWarmup() {
  useLayoutEffect(() => {
    getGsap();

    preloadVideoAsset(HONEY_LUXURY_VIDEO_SCROLL.src);
    preloadVideoAsset(MORINGA_VIDEO_SCROLL.sources.hd);
    if (HONEY_LUXURY_VIDEO_SCROLL.poster) {
      preloadImageAsset(HONEY_LUXURY_VIDEO_SCROLL.poster);
    }
    preloadImageAsset(MORINGA_POSTER_SRC);
    preloadImageAsset(SHILAJIT_HERO_ZOOM.image.src);
    preloadImageAsset(SHILAJIT_HERO_ZOOM.props.left.src);
    preloadImageAsset(SHILAJIT_HERO_ZOOM.props.right.src);

    window.__heroWarmPromises = {
      honey: warmVideoToFirstFrame(HONEY_LUXURY_VIDEO_SCROLL.src, 14000),
      moringa: warmVideoToFirstFrame(MORINGA_VIDEO_SCROLL.sources.hd, 8000),
    };

    if (!preferNativeScroll()) {
      void import("@studio-freight/lenis");
    }

    const onIntroComplete = () => {
      try {
        getGsap().ScrollTrigger.refresh();
      } catch {
        /* GSAP not ready */
      }
    };

    window.addEventListener(INTRO_COMPLETE_EVENT, onIntroComplete, { once: true });
    return () => window.removeEventListener(INTRO_COMPLETE_EVENT, onIntroComplete);
  }, []);

  return null;
}
