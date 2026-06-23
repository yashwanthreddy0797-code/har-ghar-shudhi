import Image from "next/image";
import {
  BRAND_MISSION,
  BRAND_VISION,
  VISION_MISSION_VALUES,
} from "@/lib/brand/content";
import {
  Eye,
  Heart,
  Leaf,
  Mountain,
  ShieldCheck,
  Users,
} from "lucide-react";

const VALUE_ICONS = {
  nature: Leaf,
  quality: ShieldCheck,
  care: Heart,
  families: Users,
} as const;

export default function VisionMissionSection() {
  return (
    <section
      id="vision-mission"
      className="vision-mission-section scroll-mt-36 border-b border-brand-border/60"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-24">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-shop text-[10px] font-semibold uppercase tracking-[0.32em] text-[#6B705C]">
            Purpose
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.2vw,3rem)] font-medium leading-[1.1] tracking-[0.01em] text-brand-text">
            Vision &amp; Mission
          </h2>
          <div
            className="mx-auto mt-6 flex max-w-xs items-center gap-4"
            aria-hidden
          >
            <span className="h-px flex-1 bg-brand-border" />
            <Leaf
              className="h-3.5 w-3.5 text-[#6B705C]"
              strokeWidth={1.5}
              fill="currentColor"
              fillOpacity={0.15}
            />
            <span className="h-px flex-1 bg-brand-border" />
          </div>
        </header>

        <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          <article className="vision-mission-card vision-mission-card--vision group">
            <div className="vision-mission-card__content">
              <span className="vision-mission-card__icon vision-mission-card__icon--vision">
                <Eye className="h-5 w-5" strokeWidth={1.35} />
              </span>
              <p className="vision-mission-card__label vision-mission-card__label--vision">
                Our Vision
              </p>
              <p className="vision-mission-card__headline">{BRAND_VISION}</p>
            </div>
            <div className="vision-mission-card__media" aria-hidden>
              <Image
                src="/about/vision-mission/vision-herbs.png"
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 280px"
                className="object-cover object-center"
                priority
              />
            </div>
          </article>

          <article className="vision-mission-card vision-mission-card--mission group">
            <div className="vision-mission-card__content">
              <span className="vision-mission-card__icon vision-mission-card__icon--mission">
                <Mountain className="h-5 w-5" strokeWidth={1.35} />
              </span>
              <p className="vision-mission-card__label vision-mission-card__label--mission">
                Our Mission
              </p>
              <p className="vision-mission-card__body">{BRAND_MISSION}</p>
            </div>
            <div className="vision-mission-card__media" aria-hidden>
              <Image
                src="/about/vision-mission/mission-herbs.png"
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 280px"
                className="object-cover object-center"
                priority
              />
            </div>
          </article>
        </div>

        <div className="vision-mission-values mt-10 md:mt-12">
          <ul className="vision-mission-values__list">
            {VISION_MISSION_VALUES.map((value, index) => {
              const Icon = VALUE_ICONS[value.id];
              return (
                <li key={value.id} className="vision-mission-values__item">
                  {index > 0 && (
                    <span
                      className="vision-mission-values__divider hidden sm:block"
                      aria-hidden
                    />
                  )}
                  <span className="vision-mission-values__icon">
                    <Icon className="h-4 w-4" strokeWidth={1.4} />
                  </span>
                  <span className="vision-mission-values__label">
                    {value.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
