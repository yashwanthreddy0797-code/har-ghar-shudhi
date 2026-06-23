import Image from "next/image";
import Link from "next/link";

const HERO_MAIN = {
  src: "/landing/diabetes-shudhi-hero-main.png",
  width: 1024,
  height: 682,
  alt: "Pure Ayurvedic Wellness — Har Ghar Shudhi certified doctor and full product range",
} as const;

const HERO_PANELS = {
  src: "/landing/diabetes-shudhi-hero-panels.png",
  width: 1024,
  height: 341,
  alt: "Har Ghar Shudhi — Ayurvedic goodness for you and your family",
} as const;

export default function ScienceTrustHero() {
  return (
    <section aria-label="Science and Trust hero" className="bg-[#f4fbe8]">
      <Image
        src={HERO_MAIN.src}
        alt={HERO_MAIN.alt}
        width={HERO_MAIN.width}
        height={HERO_MAIN.height}
        unoptimized
        priority
        sizes="100vw"
        className="block h-auto w-full"
      />

      <div className="relative w-full">
        <Image
          src={HERO_PANELS.src}
          alt={HERO_PANELS.alt}
          width={HERO_PANELS.width}
          height={HERO_PANELS.height}
          unoptimized
          priority
          sizes="100vw"
          className="block h-auto w-full"
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
