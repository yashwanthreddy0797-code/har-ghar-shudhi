import Link from "next/link";
import PageShell from "@/components/PageShell";
import BrandPillarsBar from "@/components/about/BrandPillarsBar";
import {
  BRAND_INTRO,
  BRAND_TAGLINE,
  BRAND_VISION,
  TRANSPARENCY,
  WHY_WE_EXIST,
} from "@/lib/brand/content";

export const metadata = {
  title: "Our Philosophy | Har Ghar Shudhi",
  description:
    "Natural wellness rooted in purity, transparency, and respect for nature — the philosophy behind every Har Ghar Shudhi product.",
};

const sections = [
  {
    id: "wellness",
    title: "Natural Wellness for Every Home",
    content: BRAND_INTRO,
  },
  {
    id: "purity",
    title: "Purity You Can Feel",
    content:
      "We create natural, organic and herbal products that are pure, safe and effective — with no harmful additives, no preservatives, and no shortcuts. Every formulation is designed to nurture your health while respecting our planet.",
  },
  {
    id: "transparency",
    title: TRANSPARENCY.headline,
    content: `${TRANSPARENCY.subline} ${TRANSPARENCY.points.map((p) => `${p.title}: ${p.description}`).join(" ")} ${TRANSPARENCY.cta}`,
  },
  {
    id: "community",
    title: "A Movement, Not Just a Brand",
    content:
      "Har Ghar Shudhi is a promise of purity, transparency and care. We exist to reconnect people with the healing power of nature, build a brand you can trust always, and contribute to a greener and healthier planet — one home at a time.",
  },
];

export default function PhilosophyPage() {
  return (
    <PageShell>
      <section className="border-b border-brand-border bg-brand-cream px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            Our Philosophy
          </p>
          <h1 className="mt-3 font-display text-4xl font-medium text-brand-text md:text-5xl">
            {BRAND_TAGLINE}
          </h1>
          <p className="mt-5 font-body text-base italic leading-relaxed text-brand-muted">
            {BRAND_VISION}
          </p>
        </div>
      </section>

      <BrandPillarsBar />

      <section className="bg-brand-white px-6 py-14 md:px-12 md:py-18">
        <div className="mx-auto max-w-3xl space-y-16">
          {sections.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="font-display text-2xl font-medium text-brand-green md:text-3xl">
                {section.title}
              </h2>
              <p className="mt-4 font-body text-base leading-[1.85] text-brand-muted">
                {section.content}
              </p>
            </article>
          ))}

          <div className="rounded-xl border border-brand-border bg-brand-cream/50 p-8">
            <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-green">
              Why We Exist
            </p>
            <ul className="mt-5 space-y-3">
              {WHY_WE_EXIST.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 font-body text-sm leading-relaxed text-brand-muted"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                  {item.description}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-6 inline-block font-shop text-xs font-semibold uppercase tracking-[0.16em] text-brand-green hover:underline"
            >
              Read our full story →
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
