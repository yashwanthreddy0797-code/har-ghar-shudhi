import SmoothScroll from "@/components/SmoothScroll";
import CertificatesProofSection from "@/components/CertificatesProofSection";
import Footer from "@/components/Footer";
import HomeLanding from "@/components/home/HomeLanding";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-brand-white text-brand-text">
        <HomeLanding />
        <CertificatesProofSection />
        <Footer variant="minimal" />
      </main>
    </SmoothScroll>
  );
}
