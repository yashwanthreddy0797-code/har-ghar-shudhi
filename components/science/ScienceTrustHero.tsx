import Link from "next/link";
import PremiumStaticImage from "@/components/media/PremiumStaticImage";
import {
  SCIENCE_HERO_MAIN,
  SCIENCE_HERO_PANELS,
} from "@/lib/media/scienceHeroAssets";

export default function ScienceTrustHero() {
  return (
    <section aria-label="Science and Trust hero" className="science-trust-hero bg-[#f4fbe8]">
      <PremiumStaticImage
        src={SCIENCE_HERO_MAIN.src}
        retinaSrc={SCIENCE_HERO_MAIN.retinaSrc}
        alt={SCIENCE_HERO_MAIN.alt}
        width={SCIENCE_HERO_MAIN.width}
        height={SCIENCE_HERO_MAIN.height}
        priority
      />

      <div className="relative w-full">
        <PremiumStaticImage
          src={SCIENCE_HERO_PANELS.src}
          retinaSrc={SCIENCE_HERO_PANELS.retinaSrc}
          alt={SCIENCE_HERO_PANELS.alt}
          width={SCIENCE_HERO_PANELS.width}
          height={SCIENCE_HERO_PANELS.height}
          priority
        />
        <Link
          href="/shop"
          aria-label="Explore our products"
          className="absolute bottom-[6%] left-1/2 h-[11%] w-[18%] min-h-[2rem] min-w-[5.5rem] -translate-x-1/2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green sm:bottom-[7%] sm:h-[12%] sm:w-[16%] md:bottom-[8%]"
        />
      </div>
    </section>
  );
}
