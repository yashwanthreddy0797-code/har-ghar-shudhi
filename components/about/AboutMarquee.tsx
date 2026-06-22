import { BRAND_CLOSING } from "@/lib/brand/content";

const PHRASE = BRAND_CLOSING.closing;

export default function AboutMarquee() {
  const items = Array.from({ length: 8 }, (_, i) => (
    <span key={i} className="about-marquee-item">
      {PHRASE}
      <span className="about-marquee-dot" aria-hidden />
    </span>
  ));

  return (
    <div className="about-marquee-wrap border-y border-white/10 bg-brand-green-dark py-5">
      <div className="about-marquee-track">{items}</div>
      <div className="about-marquee-track" aria-hidden>
        {items}
      </div>
    </div>
  );
}
