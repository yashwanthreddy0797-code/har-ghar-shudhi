"use client";

import SmoothScroll from "@/components/SmoothScroll";
import CertificatesProofSection from "@/components/CertificatesProofSection";
import Footer from "@/components/Footer";
import HomeBrandStoryVideoScrollSection from "@/components/home/HomeBrandStoryVideoScrollSection";
import HomeLanding from "@/components/home/HomeLanding";
import SiteIntroReveal from "@/components/intro/SiteIntroReveal";
import { startBrandStoryVideoWarm } from "@/lib/hero/warmBrandStoryVideo";
import { preloadImageAsset } from "@/lib/scroll/preloadMedia";
import { BRAND_STORY_VIDEO_SCROLL } from "@/lib/hero/brandStoryVideoScrollConfig";

startBrandStoryVideoWarm();
if (BRAND_STORY_VIDEO_SCROLL.poster) {
  preloadImageAsset(BRAND_STORY_VIDEO_SCROLL.poster);
}

export default function HomePageContent() {
  return (
    <SmoothScroll>
      <SiteIntroReveal />
      <main className="relative min-h-screen bg-brand-white text-brand-text">
        <HomeLanding />
        <HomeBrandStoryVideoScrollSection />
        <CertificatesProofSection />
        <Footer variant="minimal" />
      </main>
    </SmoothScroll>
  );
}
