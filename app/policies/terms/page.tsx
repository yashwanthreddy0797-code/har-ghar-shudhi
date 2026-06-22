import PageShell from "@/components/PageShell";
import PolicyLayout from "@/components/PolicyLayout";

export const metadata = {
  title: "Terms of Service | Har Ghar Shudhi",
};

export default function TermsOfServicePage() {
  return (
    <PageShell showPromo={false}>
      <PolicyLayout title="Terms of Service">
        <p>
          This website is an online service owned, operated, and managed by Har
          Ghar Shudhi. By using or accessing the website, you are deemed to
          have accepted the terms and conditions of the agreement listed below,
          or as may be revised from time to time (&quot;User Agreement&quot;),
          for an indefinite period. You understand and agree that you are bound
          by such terms for as long as you access this website.
        </p>
        <p>
          We may make calls and send SMS through a third-party platform to
          verify cash-on-delivery orders.
        </p>
        <p>
          We reserve the right to change the terms and conditions of this User
          Agreement from time to time without any obligation to inform you, and
          it is your responsibility to review them as often as possible.
        </p>
        <p>
          If you have any queries about the terms and conditions of this User
          Agreement, or have any comments or complaints about the website,
          please email us at{" "}
          <a href="mailto:hello@hargharshudhi.com">hello@hargharshudhi.com</a>.
        </p>

        <h2>Legalities</h2>
        <p>
          We are not responsible for any health or safety concerns once the
          buyer has received the item. If any harm is incurred from the items
          purchased by the buyer, we share no responsibility. Our products are
          not intended to diagnose, treat, cure, or prevent any disease.
        </p>
        <p>
          These Terms of Service and any separate agreements whereby we provide
          you services shall be governed by and construed in accordance with the
          laws of India.
        </p>
      </PolicyLayout>
    </PageShell>
  );
}
