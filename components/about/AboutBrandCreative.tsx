import Image from "next/image";

const CREATIVE_SRC = "/about/nourished-by-nature-creative.png";
const CREATIVE_WIDTH = 1024;
const CREATIVE_HEIGHT = 682;

export default function AboutBrandCreative() {
  return (
    <section
      id="brand-creative"
      aria-label="Nourished by Nature — Har Ghar Shudhi product range"
      className="scroll-mt-36 border-b border-brand-border bg-brand-cream"
    >
      <Image
        src={CREATIVE_SRC}
        alt="Nourished by Nature. Backed by Ayurveda. Pure, natural, effective Har Ghar Shudhi wellness products in a Himalayan landscape."
        width={CREATIVE_WIDTH}
        height={CREATIVE_HEIGHT}
        unoptimized
        sizes="100vw"
        className="block h-auto w-full"
      />
    </section>
  );
}
