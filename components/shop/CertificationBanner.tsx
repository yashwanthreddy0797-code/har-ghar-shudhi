export default function CertificationBanner() {
  const certs = [
    {
      title: "Glyphosate-Free",
      desc: "Independently tested and certified free from harmful weedicides.",
    },
    {
      title: "FSSAI Certified",
      desc: "Our facility follows internationally recognized food safety standards.",
    },
    {
      title: "Quality Assured",
      desc: "Every batch tested for purity, safety, and nutritional integrity.",
    },
  ];

  return (
    <section className="border-t border-brand-border bg-brand-sand px-6 py-14 md:px-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-2xl font-light text-brand-text md:text-3xl">
          Good Food Backed by Proof
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {certs.map((cert) => (
            <div
              key={cert.title}
              className="rounded-lg border border-brand-border bg-brand-white p-6 text-center shadow-sm"
            >
              <h3 className="font-serif text-lg text-brand-green">
                {cert.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-brand-muted">
                {cert.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
