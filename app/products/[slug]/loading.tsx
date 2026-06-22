import PageShell from "@/components/PageShell";

export default function ProductLoading() {
  return (
    <PageShell showPromo={false}>
      <div className="animate-pulse bg-brand-white px-6 py-10 md:px-12 md:py-14">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 h-4 w-32 rounded bg-brand-border" />
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="aspect-square rounded-xl bg-brand-cream" />
            <div className="space-y-4">
              <div className="h-4 w-24 rounded bg-brand-border" />
              <div className="h-10 w-3/4 rounded bg-brand-border" />
              <div className="h-4 w-full rounded bg-brand-border" />
              <div className="h-4 w-5/6 rounded bg-brand-border" />
              <div className="mt-6 flex gap-2">
                <div className="h-8 w-20 rounded-full bg-brand-border" />
                <div className="h-8 w-20 rounded-full bg-brand-border" />
              </div>
              <div className="mt-8 h-12 w-full rounded bg-brand-border sm:w-64" />
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
