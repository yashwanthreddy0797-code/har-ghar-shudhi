import Image from "next/image";
import BrandLogo from "@/components/BrandLogo";
import {
  PHILOSOPHY_FOOTER_TAGLINE,
  WHY_WE_EXIST,
} from "@/lib/brand/content";
import { Globe, Leaf, Shield, User } from "lucide-react";

const CARD_ICONS = {
  nature: Leaf,
  pure: Shield,
  trust: User,
  planet: Globe,
} as const;

export default function PhilosophySection() {
  return (
    <section
      id="why-we-exist"
      className="philosophy-section scroll-mt-36 border-b border-brand-border/60"
    >
      <div className="philosophy-section__leaf philosophy-section__leaf--tl" aria-hidden>
        <Image
          src="/cinematic/herbs/leaf-1.svg"
          alt=""
          width={120}
          height={120}
          className="h-full w-full opacity-[0.14]"
        />
      </div>
      <div className="philosophy-section__leaf philosophy-section__leaf--bl" aria-hidden>
        <Image
          src="/cinematic/herbs/leaf-3.svg"
          alt=""
          width={140}
          height={140}
          className="h-full w-full opacity-[0.12]"
        />
      </div>

      <div className="philosophy-section__seal" aria-hidden>
        <Image
          src="/about/philosophy/seal.png"
          alt=""
          width={88}
          height={88}
          className="h-full w-full object-contain opacity-[0.55]"
        />
      </div>

      <div className="relative z-[1] mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-24">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-shop text-[10px] font-semibold uppercase tracking-[0.32em] text-[#3d5c44]">
            Our Philosophy
          </p>
          <div
            className="mx-auto mt-5 flex max-w-xs items-center gap-4"
            aria-hidden
          >
            <span className="h-px flex-1 bg-brand-border" />
            <Leaf
              className="h-3.5 w-3.5 text-[#5a7a62]"
              strokeWidth={1.5}
              fill="currentColor"
              fillOpacity={0.12}
            />
            <span className="h-px flex-1 bg-brand-border" />
          </div>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3rem)] font-medium leading-[1.12] tracking-[0.01em] text-brand-text">
            Purpose in every choice we make
          </h2>
          <div
            className="mx-auto mt-5 flex max-w-xs items-center gap-4"
            aria-hidden
          >
            <span className="h-px flex-1 bg-brand-border" />
            <Leaf
              className="h-3.5 w-3.5 text-[#5a7a62]"
              strokeWidth={1.5}
              fill="currentColor"
              fillOpacity={0.12}
            />
            <span className="h-px flex-1 bg-brand-border" />
          </div>
          <p className="mx-auto mt-6 max-w-2xl font-body text-[clamp(0.95rem,1.8vw,1.05rem)] leading-[1.85] text-brand-muted">
            At{" "}
            <strong className="font-semibold text-brand-green-dark">
              Har Ghar Shudhi
            </strong>
            , our every step is guided by purpose — for you, for nature and for a
            better tomorrow.
          </p>
        </header>

        <ul className="philosophy-cards mt-12 md:mt-14">
          {WHY_WE_EXIST.map((item) => {
            const Icon = CARD_ICONS[item.id];
            return (
              <li key={item.id} className="philosophy-card">
                <div className="philosophy-card__media-wrap">
                  <span className="philosophy-card__icon">
                    <Icon className="h-4 w-4" strokeWidth={1.45} />
                  </span>
                  <div className="philosophy-card__media">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 260px"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                <h3 className="philosophy-card__title">{item.title}</h3>
                <p className="philosophy-card__description">{item.description}</p>
              </li>
            );
          })}
        </ul>

        <footer className="philosophy-section__footer">
          <Leaf
            className="mx-auto h-4 w-4 text-brand-green"
            strokeWidth={1.5}
            fill="currentColor"
            fillOpacity={0.1}
            aria-hidden
          />
          <BrandLogo href={null} size="sm" className="!h-14 !min-w-0 !max-w-[200px]" />
          <p className="philosophy-section__tagline">{PHILOSOPHY_FOOTER_TAGLINE}</p>
        </footer>
      </div>
    </section>
  );
}
