import PromoBanner from "./PromoBanner";
import CertificatesProofSection from "./CertificatesProofSection";
import Footer from "./Footer";

export default function PageShell({
  children,
  showPromo = true,
  proofSectionClassName = "",
}: {
  children: React.ReactNode;
  showPromo?: boolean;
  proofSectionClassName?: string;
}) {
  return (
    <div className="shop-typography min-h-screen bg-brand-white pt-[calc(4rem+env(safe-area-inset-top,0px))] text-brand-text md:pt-[calc(4.5rem+env(safe-area-inset-top,0px))]">
      {showPromo && <PromoBanner />}
      <main>{children}</main>
      <CertificatesProofSection className={proofSectionClassName} />
      <Footer variant="full" />
    </div>
  );
}
