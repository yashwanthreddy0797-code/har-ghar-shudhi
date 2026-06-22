import SiteIntroReveal from "@/components/intro/SiteIntroReveal";
import HomeTopSectionsWarmup from "@/components/home/HomeTopSectionsWarmup";
import ProductVideoScrollSection from "@/components/ProductVideoScrollSection";
import SmoothScroll from "@/components/SmoothScroll";
import CertificatesProofSection from "@/components/CertificatesProofSection";
import Footer from "@/components/Footer";
import HoneyLuxuryVideoScrollSection from "@/components/honey/HoneyLuxuryVideoScrollSection";
import BrandCommercialVideoScrollSection from "@/components/brand/BrandCommercialVideoScrollSection";
import SpirulinaLuxuryVideoScrollSection from "@/components/spirulina/SpirulinaLuxuryVideoScrollSection";
import ShilajitHeroZoomSection from "@/components/shilajit/ShilajitHeroZoomSection";
import { MORINGA_VIDEO_SCROLL } from "@/lib/hero/moringaVideoScrollConfig";
import { SHILAJIT_VIDEO_SCROLL } from "@/lib/hero/shilajitVideoScrollConfig";

export default function Home() {
  return (
    <SmoothScroll>
      <HomeTopSectionsWarmup />
      <SiteIntroReveal />
      <main className="relative min-h-screen bg-brand-white">
        <HoneyLuxuryVideoScrollSection />
        <ProductVideoScrollSection
          config={MORINGA_VIDEO_SCROLL}
          scrollId="moringa-video-scroll"
          theme="light"
          priority
        />
        <ShilajitHeroZoomSection />
        <ProductVideoScrollSection
          config={SHILAJIT_VIDEO_SCROLL}
          scrollId="shilajit-video-scroll"
          theme="dark"
        />
        <BrandCommercialVideoScrollSection />
        <SpirulinaLuxuryVideoScrollSection />
        <CertificatesProofSection />
        <Footer variant="minimal" />
      </main>
    </SmoothScroll>
  );
}
