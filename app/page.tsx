import BrandHeader from "@/components/BrandHeader";
import CinematicExperience from "@/components/CinematicExperience";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-luxury-black">
        <BrandHeader />
        <CinematicExperience />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
