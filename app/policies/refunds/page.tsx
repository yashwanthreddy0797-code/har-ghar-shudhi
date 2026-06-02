import PageShell from "@/components/PageShell";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata = {
  title: "Refund & Cancellation | Har Ghar Shudhi",
};

export default function RefundsPolicyPage() {
  return (
    <PageShell showPromo={false}>
      <PolicyLayout title="Refund & Cancellation Policy">
        <p>
          We want you to be completely satisfied with every purchase. If
          something isn&apos;t right, we&apos;re here to help.
        </p>
        <h3>Cancellation</h3>
        <p>
          Orders can be cancelled within 24 hours of placement, provided they
          have not yet been dispatched. Contact us at hello@hargharshudhi.com
          with your order number.
        </p>
        <h3>Refunds</h3>
        <p>
          If you receive a damaged or incorrect product, please notify us within
          48 hours of delivery with photos. We will arrange a replacement or
          full refund at no additional cost.
        </p>
        <h3>Non-Returnable Items</h3>
        <p>
          Opened food products cannot be returned for hygiene reasons unless
          damaged or defective on arrival.
        </p>
        <h3>Refund Timeline</h3>
        <p>
          Approved refunds are processed within 5–7 business days to your
          original payment method.
        </p>
      </PolicyLayout>
    </PageShell>
  );
}
