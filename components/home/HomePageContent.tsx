"use client";

import { useLayoutEffect } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CertificatesProofSection from "@/components/CertificatesProofSection";
import Footer from "@/components/Footer";
import HomeBrandStoryVideoScrollSection from "@/components/home/HomeBrandStoryVideoScrollSection";
import HomeLanding from "@/components/home/HomeLanding";
import { BRAND_STORY_VIDEO_SCROLL } from "@/lib/hero/brandStoryVideoScrollConfig";
import { preloadVideoAsset } from "@/lib/scroll/preloadMedia";

export default function HomePageContent() {
  useLayoutEffect(() => {
    preloadVideoAsset(BRAND_STORY_VIDEO_SCROLL.src);
  }, []);

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-brand-white text-brand-text">
        <HomeLanding />
        <HomeBrandStoryVideoScrollSection />
        <CertificatesProofSection />
        <Footer variant="minimal" />
      </main>
    </SmoothScroll>
  );
}
