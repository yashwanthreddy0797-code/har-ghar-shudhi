import Image from "next/image";
import { BRAND_MISSION, BRAND_VISION } from "@/lib/brand/content";
import { Leaf } from "lucide-react";

export default function VisionMissionSection() {
  return (
    <section
      id="vision-mission"
      className="vision-mission-section scroll-mt-36"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 md:py-24">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[clamp(2rem,4.2vw,3rem)] font-medium leading-[1.1] tracking-[0.01em] text-brand-text">
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
              <p className="vision-mission-card__label vision-mission-card__label--vision">
                Our Vision
              </p>
              <p className="vision-mission-card__headline">{BRAND_VISION}</p>
            </div>
            <div className="vision-mission-card__media vision-mission-card__media--full" aria-hidden>
              <Image
                src="/about/vision-mission/vision-background.jpg"
                alt=""
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[center_right]"
                priority
              />
            </div>
          </article>

          <article className="vision-mission-card vision-mission-card--mission group">
            <div className="vision-mission-card__content">
              <p className="vision-mission-card__label vision-mission-card__label--mission">
                Our Mission
              </p>
              <p className="vision-mission-card__headline">{BRAND_MISSION}</p>
            </div>
            <div className="vision-mission-card__media vision-mission-card__media--full" aria-hidden>
              <Image
                src="/about/vision-mission/mission-background.jpg"
                alt=""
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-[center_right]"
                priority
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
