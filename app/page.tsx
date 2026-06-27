import SmoothScroll from "@/components/SmoothScroll";
import CertificatesProofSection from "@/components/CertificatesProofSection";
import Footer from "@/components/Footer";
import HomeLanding from "@/components/home/HomeLanding";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-brand-white pt-[calc(4rem+env(safe-area-inset-top,0px))] text-brand-text md:pt-[calc(4.5rem+env(safe-area-inset-top,0px))]">
        <HomeLanding />
        <CertificatesProofSection />
        <Footer variant="minimal" />
      </main>
    </SmoothScroll>
  );
}
