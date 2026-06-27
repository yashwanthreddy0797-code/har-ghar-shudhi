import Image from "next/image";
import {
  FlaskConical,
  Leaf,
  Package,
  Scale,
  Users,
} from "lucide-react";

const FEATURES = [
  { icon: Leaf, label: "100% Natural & Herbal" },
  { icon: Scale, label: "Complete Transparency" },
  { icon: FlaskConical, label: "Tested For Purity" },
  { icon: Package, label: "Delivered With Care" },
  { icon: Users, label: "Trusted By Thousands" },
] as const;

export default function HomeWelcomeSection() {
  return (
    <section className="home-welcome relative overflow-hidden bg-[#f7f4ef]">
      <div
        className="home-welcome__leaf home-welcome__leaf--left pointer-events-none absolute left-0 top-1/2 -translate-y-1/2"
        aria-hidden
      >
        <Image
          src="/cinematic/herbs/leaf-1.svg"
          alt=""
          width={280}
          height={400}
          className="h-auto w-[min(28vw,220px)] opacity-[0.14]"
        />
      </div>
      <div
        className="home-welcome__leaf home-welcome__leaf--right pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
        aria-hidden
      >
        <Image
          src="/cinematic/herbs/leaf-3.svg"
          alt=""
          width={280}
          height={400}
          className="h-auto w-[min(28vw,220px)] opacity-[0.14]"
        />
      </div>

      <div className="relative z-[1] mx-auto max-w-4xl px-6 py-16 text-center md:px-12 md:py-24">
        <p className="font-shop text-[10px] font-semibold uppercase tracking-[0.32em] text-[#a98467]">
          Welcome to Har Ghar Shudhi
        </p>
        <h2 className="mt-5 font-display text-[clamp(1.875rem,4.5vw,3rem)] font-medium leading-[1.12] tracking-[0.02em] text-brand-green-dark">
          A Journey Back to Natural Wellness
        </h2>
        <div className="mx-auto mt-5 flex justify-center" aria-hidden>
          <Leaf className="h-5 w-5 text-luxury-gold" strokeWidth={1.5} />
        </div>
        <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-[1.9] text-brand-text/85 md:text-[1.05rem]">
          We create natural, organic and herbal products that nurture your health
          and respect our planet. From the finest ingredients to your home, we
          ensure complete purity and transparency.
        </p>

        <ul className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-5 lg:gap-6">
          {FEATURES.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-green/20 bg-white/60">
                <Icon
                  className="h-5 w-5 text-brand-green"
                  strokeWidth={1.25}
                  aria-hidden
                />
              </span>
              <span className="max-w-[9rem] font-shop text-[10px] font-semibold uppercase leading-snug tracking-[0.12em] text-brand-green-dark">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
