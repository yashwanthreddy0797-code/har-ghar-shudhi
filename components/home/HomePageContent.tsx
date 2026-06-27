"use client";

import SmoothScroll from "@/components/SmoothScroll";
import CertificatesProofSection from "@/components/CertificatesProofSection";
import Footer from "@/components/Footer";
import HomeBrandStoryVideoScrollSection from "@/components/home/HomeBrandStoryVideoScrollSection";
import HomeLanding from "@/components/home/HomeLanding";

export default function HomePageContent() {
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
