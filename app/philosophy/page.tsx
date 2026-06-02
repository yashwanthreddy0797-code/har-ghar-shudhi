import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Our Philosophy | Har Ghar Shudhi",
  description:
    "Soil health, conscious farming, and the belief that food can heal people and planet.",
};

const sections = [
  {
    id: "philosophy",
    title: "Our Philosophy",
    content:
      "We believe that the way food is grown determines how it nourishes us. Every product from Har Ghar Shudhi begins with healthy soil, conscious farming, and a deep respect for ancient Ayurvedic wisdom — brought forward for modern living.",
  },
  {
    id: "soil-health",
    title: "Soil Health",
    content:
      "Our farms follow regenerative practices — no chemical weedicides, no shortcuts. We test every batch for glyphosate and other contaminants because clean soil is the foundation of clean food. What grows from the earth should return nourishment, not harm.",
  },
  {
    id: "people-planet",
    title: "Health of People & Planet",
    content:
      "Food is medicine when it is grown with intention. We work directly with farmers who share our commitment to organic, traceable produce. From bilona ghee to stone-ground atta, every step is designed to support both human wellbeing and ecological balance.",
  },
  {
    id: "traceability",
    title: "Traceability",
    content:
      "Every product can be traced back to its source — the farm, the season, the process. We publish lab reports and maintain full transparency because you deserve to know exactly what goes into your home and your body.",
  },
  {
    id: "community",
    title: "Our Community",
    content:
      "Har Ghar Shudhi is more than a brand — it is a movement toward conscious consumption. We host farm visits, workshops, and farmer's markets to reconnect people with the origins of their food.",
  },
];

export default function PhilosophyPage() {
  return (
    <PageShell>
      <section className="border-b border-brand-border bg-brand-cream px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-medium uppercase tracking-wider text-brand-green">
            Farm Life
          </p>
          <h1 className="mt-3 font-serif text-4xl font-light text-brand-text md:text-5xl">
            Rooted in Purpose
          </h1>
          <p className="mt-5 font-sans text-base leading-relaxed text-brand-muted">
            From soil to shelf — our philosophy guides every decision we make.
          </p>
        </div>
      </section>

      <section className="bg-brand-white px-6 py-14 md:px-12 md:py-18">
        <div className="mx-auto max-w-3xl space-y-16">
          {sections.map((section) => (
            <article key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-serif text-2xl font-light text-brand-green md:text-3xl">
                {section.title}
              </h2>
              <p className="mt-4 font-sans text-base leading-[1.85] text-brand-muted">
                {section.content}
              </p>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
