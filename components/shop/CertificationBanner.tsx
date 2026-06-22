export default function CertificationBanner() {
  const certs = [
    {
      title: "Ayush Licensed",
      desc: "Licensed under the Ministry of Ayush for authentic Ayurvedic formulations.",
      href: "/certifications/ayush-license.pdf",
    },
    {
      title: "ISO Certified",
      desc: "Our processes meet internationally recognized quality management standards.",
    },
    {
      title: "FSSC Certified",
      desc: "Food Safety System Certification for end-to-end supply chain safety.",
    },
    {
      title: "HACCP Certified",
      desc: "Hazard Analysis and Critical Control Points for food safety assurance.",
    },
    {
      title: "FSSAI Certified",
      desc: "Our facility follows nationally recognized food safety standards.",
    },
    {
      title: "Glyphosate-Free",
      desc: "Independently tested and certified free from harmful weedicides.",
    },
    {
      title: "Quality Assured",
      desc: "Every batch tested for purity, safety, and nutritional integrity.",
    },
  ];

  return (
    <section className="border-t border-brand-border bg-brand-sand px-6 py-14 md:px-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-display text-2xl font-medium tracking-[0.02em] text-brand-text md:text-[2rem]">
          Good Food Backed by Proof
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {certs.map((cert) => {
            const CardContent = (
              <>
                <h3 className="font-display text-lg font-medium tracking-[0.01em] text-brand-green">
                  {cert.title}
                </h3>
                <p className="mt-2.5 font-body text-sm leading-[1.75] text-brand-muted">
                  {cert.desc}
                </p>
                {cert.href ? (
                  <p className="mt-3 font-body text-xs font-medium uppercase tracking-[0.12em] text-brand-green/80">
                    View license →
                  </p>
                ) : null}
              </>
            );

            if (cert.href) {
              return (
                <a
                  key={cert.title}
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-brand-border bg-brand-white p-6 text-center shadow-sm transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-brand-green/30 hover:shadow-md"
                  aria-label={`${cert.title} — open license document`}
                >
                  {CardContent}
                </a>
              );
            }

            return (
              <div
                key={cert.title}
                className="rounded-lg border border-brand-border bg-brand-white p-6 text-center shadow-sm"
              >
                {CardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
