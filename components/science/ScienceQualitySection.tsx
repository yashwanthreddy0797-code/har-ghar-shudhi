import {
  Ban,
  Beaker,
  Droplets,
  Leaf,
  Rabbit,
  ShieldCheck,
} from "lucide-react";
import PremiumStaticImage from "@/components/media/PremiumStaticImage";
import { QUALITY } from "@/lib/brand/content";

const GOLD = "#b89550";

const PILLAR_IMAGES = [
  {
    title: "Premium Quality Herbs",
    image: "/science/quality/premium-quality-herbs.png",
    alt: "Premium Ayurvedic herbs and botanical ingredients in wooden bowls",
    width: 1536,
    height: 1024,
  },
  {
    title: "Hygienic & Modern Processing",
    image: "/science/quality/hygienic-processing.png",
    alt: "Hygienic modern processing facility with trained staff",
    width: 1536,
    height: 1024,
  },
  {
    title: "Rigorous Quality Testing",
    image: "/science/quality/rigorous-quality-testing.png",
    alt: "Rigorous quality testing in controlled laboratory conditions",
    width: 1536,
    height: 1024,
  },
  {
    title: "Eco-friendly Packaging",
    image: "/science/quality/eco-friendly-packaging.png",
    alt: "Eco-friendly sustainable product packaging",
    width: 1536,
    height: 1024,
  },
] as const;

const EXCLUSION_ICONS = [
  { label: "No Additives", Icon: Droplets },
  { label: "No Preservatives", Icon: Ban },
  { label: "Non GMO", Icon: Leaf },
  { label: "Chemical Free", Icon: Beaker },
  { label: "Cruelty Free", Icon: Rabbit },
] as const;

function GoldCircleIcon({
  Icon,
  label,
}: {
  Icon: typeof Droplets;
  label: string;
}) {
  return (
    <li className="flex flex-col items-center gap-4 text-center">
      <div
        className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border sm:h-20 sm:w-20"
        style={{ borderColor: `${GOLD}99` }}
      >
        <Icon
          className="h-7 w-7 sm:h-8 sm:w-8"
          style={{ color: GOLD }}
          strokeWidth={1.25}
        />
      </div>
      <span
        className="font-shop text-[10px] font-semibold uppercase tracking-[0.2em] sm:text-[11px]"
        style={{ color: GOLD }}
      >
        {label}
      </span>
    </li>
  );
}

export default function ScienceQualitySection() {
  const pillars = QUALITY.pillars.map((pillar, index) => ({
    ...pillar,
    ...PILLAR_IMAGES[index],
  }));

  return (
    <section
      id="quality"
      className="border-b border-brand-border bg-[#f3f2ef] px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            Quality Standards
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,2.75rem)] font-medium leading-tight text-brand-text">
            {QUALITY.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-brand-muted md:text-lg">
            {QUALITY.subline}
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="flex flex-col overflow-hidden rounded-xl border border-brand-border/60 bg-brand-white shadow-[0_4px_24px_rgba(26,36,33,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(26,36,33,0.09)]"
            >
              <div className="science-quality-card__media relative aspect-[4/3] w-full overflow-hidden bg-brand-cream">
                <PremiumStaticImage
                  src={pillar.image}
                  alt={pillar.alt}
                  width={pillar.width}
                  height={pillar.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 384px"
                  className="premium-static-image premium-static-image--cover h-full w-full"
                />
              </div>

              <div className="flex flex-1 flex-col px-5 pb-6 pt-5 md:px-6 md:pb-7 md:pt-6">
                <ShieldCheck
                  className="h-5 w-5 text-brand-green"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <h3 className="mt-3 font-display text-lg font-medium leading-snug text-brand-text md:text-xl">
                  {pillar.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-brand-muted">
                  {pillar.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <ul className="mt-14 flex flex-wrap items-start justify-center gap-x-8 gap-y-10 sm:gap-x-10 md:mt-16 lg:justify-between lg:gap-x-4">
          {EXCLUSION_ICONS.map(({ label, Icon }) => (
            <GoldCircleIcon key={label} label={label} Icon={Icon} />
          ))}
        </ul>
      </div>
    </section>
  );
}
