import PageShell from "@/components/PageShell";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata = {
  title: "Shipping & Delivery | Har Ghar Shudhi",
};

export default function ShippingPolicyPage() {
  return (
    <PageShell showPromo={false}>
      <PolicyLayout title="Shipping & Delivery Policy">
        <p>
          We ship across India through trusted courier partners. Orders are
          typically dispatched within 2–4 business days of confirmation.
        </p>
        <h3>Free Shipping</h3>
        <p>
          Enjoy free shipping on all orders above ₹1,499. For orders below this
          threshold, a flat shipping fee applies at checkout.
        </p>
        <h3>Delivery Timeline</h3>
        <p>
          Metro cities: 3–5 business days. Tier 2 & 3 cities: 5–8 business
          days. Remote areas may take up to 10 business days.
        </p>
        <h3>Order Tracking</h3>
        <p>
          Once dispatched, you will receive a tracking link via email and SMS.
          You can also track your order on our{" "}
          <a href="/track-order">Track Order</a> page.
        </p>
      </PolicyLayout>
    </PageShell>
  );
}
