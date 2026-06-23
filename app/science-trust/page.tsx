import PageShell from "@/components/PageShell";
import ScienceTrustPage from "@/components/science/ScienceTrustPage";

export const metadata = {
  title: "Science & Trust | Har Ghar Shudhi",
  description:
    "Certified Ayurvedic wellness backed by doctors, nutritionists, and international quality standards. Ayush, GMP, FSSAI, ISO certified.",
};

export default function ScienceTrustRoute() {
  return (
    <PageShell showPromo={false} proofSectionClassName="hidden">
      <ScienceTrustPage />
    </PageShell>
  );
}
