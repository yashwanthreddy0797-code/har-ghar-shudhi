import Footer from "@/components/Footer";

export const metadata = {
  title: "Home | Har Ghar Shudhi",
  description:
    "The Har Ghar Shudhi brand story — rooted in nature, driven by purpose.",
};

export default function HomeBrandPage() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-white pt-[calc(4rem+env(safe-area-inset-top,0px))] text-brand-text md:pt-[calc(4.5rem+env(safe-area-inset-top,0px))]">
      <main className="flex-1" aria-label="Brand story — coming soon" />
      <Footer variant="full" />
    </div>
  );
}
