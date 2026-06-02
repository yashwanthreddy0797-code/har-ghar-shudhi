import BrandStandardSection from "@/components/BrandStandardSection";
import HeroScrollExperience from "@/components/HeroScrollExperience";
import ProductScrollExperience from "@/components/ProductScrollExperience";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import { ASHWAGANDHA_SCROLL, HONEY_SCROLL } from "@/lib/hero/productScrollConfig";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-brand-white">
        <HeroScrollExperience />
        <ProductScrollExperience config={ASHWAGANDHA_SCROLL} />
        <BrandStandardSection />
        <ProductScrollExperience config={HONEY_SCROLL} />
        <Footer variant="minimal" />
      </main>
    </SmoothScroll>
  );
}
