import Image from "next/image";
import Link from "next/link";
import {
  BRAND_CLOSING,
  WHO_WE_ARE_TRUST,
} from "@/lib/brand/content";
import {
  ArrowRight,
  FlaskConical,
  Globe,
  Leaf,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

const TRUST_ICONS = {
  natural: Leaf,
  ethical: FlaskConical,
  trusted: ShieldCheck,
  tradition: Globe,
} as const;

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="who-we-are-section">
      <div className="who-we-are-section__mortar" aria-hidden>
        <Image
          src="/about/who-we-are/mortar-herbs.png"
          alt=""
          fill
          sizes="(max-width: 768px) 40vw, 320px"
          className="object-contain object-left-bottom"
          priority={false}
        />
      </div>

      <div className="who-we-are-section__leaf who-we-are-section__leaf--tl" aria-hidden>
        <Image
          src="/cinematic/herbs/leaf-2.svg"
          alt=""
          width={100}
          height={100}
          className="h-full w-full opacity-[0.16]"
        />
      </div>

      <div className="who-we-are-section__seal" aria-hidden>
        <Image
          src="/about/who-we-are/seal.png"
          alt=""
          width={88}
          height={88}
          className="h-full w-full object-contain opacity-[0.5]"
        />
      </div>

      <div className="who-we-are-section__inner">
        <header className="who-we-are-section__header">
          <p className="who-we-are-section__eyebrow">Who We Are</p>
          <div className="who-we-are-section__divider" aria-hidden>
            <span />
            <Leaf
              className="h-3.5 w-3.5"
              strokeWidth={1.5}
              fill="currentColor"
              fillOpacity={0.15}
            />
            <span />
          </div>
          <h2 className="who-we-are-section__headline">{BRAND_CLOSING.headline}</h2>
          <p className="who-we-are-section__body">
            We are not just a brand, we are a promise of purity, transparency and
            care. Thank you for choosing natural. Thank you for choosing{" "}
            <strong className="font-semibold text-brand-green-dark">
              Har Ghar Shudhi
            </strong>
            .
          </p>
          <div className="who-we-are-section__closing">
            <span className="who-we-are-section__flourish" aria-hidden>
              <svg viewBox="0 0 280 56" fill="none" className="h-14 w-[min(280px,88vw)]">
                <path
                  d="M24 44V18M24 18H8M24 18H40"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M256 44V18M256 18H240M256 18H272"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
                <path
                  d="M136 10c-4 6-8 10-12 12 4 2 8 6 12 12 4-6 8-10 12-12-4-2-8-6-12-12z"
                  fill="currentColor"
                  fillOpacity="0.2"
                  stroke="currentColor"
                  strokeWidth="0.75"
                />
              </svg>
            </span>
            <p className="who-we-are-section__tagline">{BRAND_CLOSING.closing}</p>
          </div>
          <div className="who-we-are-section__actions">
            <Link href="/shop" className="who-we-are-section__btn who-we-are-section__btn--primary">
              <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
              Shop Wellness
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/contact"
              className="who-we-are-section__btn who-we-are-section__btn--secondary"
            >
              <Leaf className="h-3.5 w-3.5" strokeWidth={1.5} />
              Contact Us
            </Link>
          </div>
        </header>
      </div>

      <div className="who-we-are-section__trust">
        <svg
          className="who-we-are-section__wave"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0,32 C240,8 480,48 720,24 C960,0 1200,40 1440,20 L1440,48 L0,48 Z"
            fill="currentColor"
          />
        </svg>
        <ul className="who-we-are-section__trust-list">
          {WHO_WE_ARE_TRUST.map((item, index) => {
            const Icon = TRUST_ICONS[item.id];
            return (
              <li key={item.id} className="who-we-are-section__trust-item">
                {index > 0 && (
                  <span className="who-we-are-section__trust-divider" aria-hidden />
                )}
                <span className="who-we-are-section__trust-icon">
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </span>
                <span className="who-we-are-section__trust-label">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
