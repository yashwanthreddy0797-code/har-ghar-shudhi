import PageShell from "@/components/PageShell";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata = {
  title: "Privacy Policy | Har Ghar Shudhi",
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell showPromo={false}>
      <PolicyLayout title="Privacy Policy">
        <p>
          Har Ghar Shudhi respects your privacy. This policy explains how we
          collect, use, and protect your personal information.
        </p>
        <h3>Information We Collect</h3>
        <p>
          We collect information you provide when placing orders, subscribing to
          our newsletter, or contacting us — including name, email, phone
          number, and delivery address.
        </p>
        <h3>How We Use Your Information</h3>
        <p>
          Your data is used to process orders, provide customer support, send
          order updates, and — with your consent — share offers and newsletters.
        </p>
        <h3>Data Security</h3>
        <p>
          We implement industry-standard security measures to protect your
          personal information. Payment processing is handled by secure,
          PCI-compliant payment gateways.
        </p>
        <h3>Contact</h3>
        <p>
          For privacy-related inquiries, email us at hello@hargharshudhi.com.
        </p>
      </PolicyLayout>
    </PageShell>
  );
}
