import PageShell from "@/components/PageShell";
import PolicyLayout from "@/components/PolicyLayout";
import BrandPillarsBar from "@/components/about/BrandPillarsBar";
import { DELIVERY } from "@/lib/brand/content";

export const metadata = {
  title: "Shipping & Delivery | Har Ghar Shudhi",
};

export default function ShippingPolicyPage() {
  return (
    <PageShell showPromo={false}>
      <section className="border-b border-brand-border bg-brand-cream px-6 py-12 md:px-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-shop text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            {DELIVERY.headline}
          </p>
          <p className="mt-3 font-body text-base italic text-brand-muted">
            {DELIVERY.subline} {DELIVERY.tagline}
          </p>
        </div>
      </section>
      <BrandPillarsBar />
      <PolicyLayout title="Shipping & Delivery Policy">
        <h2>1. Order Processing Time</h2>
        <ul>
          <li>
            <strong>Processing Time:</strong> Orders are typically processed
            within 1–2 business days (excluding weekends and public holidays)
            after payment is confirmed.
          </li>
          <li>
            <strong>Peak Periods:</strong> During promotional offer seasons or
            high-demand periods, processing may take up to 3–4 business days.
            We&apos;ll notify you promptly if there&apos;s any unforeseen delay.
          </li>
        </ul>

        <h2>2. Shipping Destinations &amp; Partners</h2>
        <ul>
          <li>
            <strong>Domestic Shipping (India):</strong> Shipping is available
            across India via trusted carriers like India Post, Delhivery, or
            Blue Dart.
          </li>
          <li>
            <strong>International Shipping:</strong> International shipping is
            not currently available.
          </li>
        </ul>

        <h2>3. Shipping Rates &amp; Free Shipping Thresholds</h2>
        <ul>
          <li>
            <strong>Standard Shipping:</strong> ₹50 flat shipping fee for orders
            under ₹499.
          </li>
          <li>Free standard shipping on orders of ₹499 and above.</li>
        </ul>

        <h2>4. Shipping Time Estimates</h2>
        <ul>
          <li>
            <strong>Within Metro Areas</strong> (e.g., Delhi, Mumbai): 2–4
            business days after dispatch.
          </li>
          <li>
            <strong>Tier-2/3 Cities &amp; Remote Areas:</strong> 4–7 business
            days.
          </li>
          <li>
            <strong>International Destinations:</strong> Not enabled.
          </li>
        </ul>

        <h2>5. Order Tracking</h2>
        <p>
          Once your order is dispatched, you&apos;ll receive a shipment
          confirmation email or WhatsApp message with:
        </p>
        <ul>
          <li>Courier name</li>
          <li>Tracking ID</li>
          <li>Estimated delivery schedule</li>
        </ul>
        <p>
          You can also track your order on our{" "}
          <a href="/track-order">Track Order</a> page.
        </p>

        <h2>6. Shipping Delays &amp; Contact</h2>
        <p>
          If your delivery is delayed by more than 5 days beyond the estimated
          timeframe, please contact us via WhatsApp or through our{" "}
          <a href="/contact">Contact Us</a> page.
        </p>

        <h2>7. Lost, Damaged, or Incorrect Deliveries</h2>
        <ul>
          <li>
            <strong>Damaged Items:</strong> Inspect upon delivery. If damaged,
            retain original packaging, take photos, and contact our support team
            within 48 hours. We&apos;ll guide you through the return or
            replacement process.
          </li>
          <li>
            <strong>Lost Shipments or Wrong Products:</strong> Report within 5
            business days of expected delivery; we&apos;ll investigate and
            ensure resolution.
          </li>
        </ul>

        <h2>8. International Duties &amp; Customs</h2>
        <p>
          International customers are responsible for any customs duties, taxes,
          or import fees. These charges vary by destination and are not included
          in product prices or shipping costs at checkout.
        </p>

        <h2>9. Undelivered Orders &amp; Return to Sender</h2>
        <p>
          If a shipment is returned to us due to incorrect address, failed
          delivery attempts, or refusal at delivery:
        </p>
        <ul>
          <li>
            Contact us to reship (you may bear additional shipping charges), or
          </li>
          <li>Arrange for a refund (excluding initial shipping fees).</li>
        </ul>

        <h2>10. Address Accuracy</h2>
        <p>
          Please ensure your shipping address is entered correctly — especially
          PIN codes and phone numbers — to avoid delivery issues. We are not
          responsible for delays caused by inaccuracies in address input.
        </p>

        <h2>11. Contact for Shipping Queries</h2>
        <p>
          For any questions related to shipping, feel free to reach out via
          WhatsApp or visit our <a href="/contact">Contact Us</a> page.
        </p>
      </PolicyLayout>
    </PageShell>
  );
}
