import PromoBanner from "./PromoBanner";
import Footer from "./Footer";

export default function PageShell({
  children,
  showPromo = true,
}: {
  children: React.ReactNode;
  showPromo?: boolean;
}) {
  return (
    <div className="min-h-screen bg-brand-white pt-16 text-brand-text md:pt-[4.5rem]">
      {showPromo && <PromoBanner />}
      <main>{children}</main>
      <Footer variant="full" />
    </div>
  );
}
