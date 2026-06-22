export default function PolicyLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 py-14 md:px-12 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-serif text-3xl font-light text-brand-text md:text-4xl">
          {title}
        </h1>
        <div className="mt-8 space-y-5 font-sans text-sm leading-relaxed text-brand-muted [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-brand-green [&_h3]:mt-7 [&_h3]:font-serif [&_h3]:text-lg [&_h3]:text-brand-green [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:text-brand-green [&_a]:hover:underline">
          {children}
        </div>
      </div>
    </section>
  );
}
