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
          <strong>Returns &amp; Refunds Policy — Please Read Carefully</strong>
        </p>

        <h2>Returns</h2>
        <p>
          All our shipments are inspected carefully before dispatch. If you
          receive a product in the below-mentioned state, kindly notify us
          within 7 days.
        </p>

        <h3>7-Day Return Policy: Acceptable Reasons for Returns</h3>
        <ul>
          <li>
            You can return your product within 7 days of delivery if the
            product is damaged, leaking, tampered, broken, or the package is
            damaged
          </li>
          <li>Wrong product delivered</li>
          <li>Product past expiration date</li>
          <li>Incomplete order / missing products</li>
        </ul>

        <h3>Unacceptable Reasons for Return</h3>
        <ul>
          <li>Opened / used / altered products</li>
          <li>Original packaging (cartons, labels, etc.) missing</li>
          <li>
            The return or replacement request is generated after 4 days from the
            date of delivery
          </li>
          <li>
            The damaged or missing product is reported after 4 days from the
            date of delivery
          </li>
          <li>
            The product being returned for any reason other than a manufacturing
            defect
          </li>
          <li>
            Issues such as stomach upset, headache, flavour appeal, or flavour
            difference from one brand to another are not applicable for return.
            Please consult with your doctor before buying the product.
          </li>
        </ul>

        <h3>In Case of an Acceptable Reason for Return</h3>
        <ul>
          <li>
            You will need to notify us within 7 days of receiving your product.
            Kindly email us images as proof at{" "}
            <a href="mailto:hello@hargharshudhi.com">
              hello@hargharshudhi.com
            </a>
          </li>
          <li>
            We will investigate and review your return request within 24 working
            hours.
          </li>
          <li>
            If, based on our examination, the product is beyond use and in
            damaged condition, we will request you to discard the product. In
            this case, we will extend you a replacement accordingly.
          </li>
          <li>
            If our reverse pick-up service is not available at your location,
            you will need to self-ship the product via any reliable courier
            partner. We will reimburse the courier charges.
          </li>
          <li>
            After your product(s) is received, we will verify it against the
            claim and initiate the replacement or refund accordingly.
          </li>
        </ul>
        <p>Please note that replacement will depend upon stock availability.</p>

        <h2>Refunds</h2>
        <h3>Refunds Will Not Be Issued If</h3>
        <ul>
          <li>
            The product returned by you is noticeably damaged and/or tampered
            with by you
          </li>
          <li>
            The shipping address you entered while placing an order is incorrect
          </li>
          <li>
            You have consumed part of the product and then decided to return it
          </li>
          <li>You do not comply with the returns policy stated above</li>
        </ul>

        <h3>Refunds May Be Issued Under the Following Circumstances</h3>
        <ul>
          <li>The product ordered by you is not in stock with us</li>
          <li>The shipping address is not serviceable by us</li>
          <li>You comply with the returns policy stated above</li>
          <li>
            The product returned by you is found to be in good condition and is
            not tampered with
          </li>
          <li>
            You have paid twice for a single order from the same email address
          </li>
        </ul>

        <h2>Cancellation &amp; Refunds</h2>
        <ul>
          <li>
            You can cancel your order anytime by sending us an email at{" "}
            <a href="mailto:hello@hargharshudhi.com">
              hello@hargharshudhi.com
            </a>{" "}
            before the order is dispatched. Orders once dispatched are not
            eligible for cancellation.
          </li>
          <li>
            A cancelled order will take 5 to 7 days for the amount to reflect in
            the original mode of payment.
          </li>
        </ul>

        <h3>Processing Fees</h3>
        <p>
          There is no processing fee for returns or replacements. However, if
          you request a replacement of your product with a higher-priced
          product, you will have to pay the difference amount accordingly.
        </p>

        <h3>Modes of Refund</h3>
        <ul>
          <li>
            To cancel, exchange, or return the product, email us at{" "}
            <a href="mailto:hello@hargharshudhi.com">
              hello@hargharshudhi.com
            </a>
          </li>
          <li>
            In the case of a prepaid order, the amount will be refunded to the
            same account from which the order has been placed. Only once we
            receive the product and complete the verification process will the
            amount be processed in 3–5 working days.
          </li>
          <li>
            In the case of cash on delivery, the amount will be transferred to
            the bank account mentioned while placing the return request. Only
            once we receive the product and complete the verification process
            will the amount be processed in 3–5 working days.
          </li>
        </ul>

        <h3>Refund Timeline</h3>
        <p>
          Once the refund request is processed, the amount will be transferred
          within 3–5 working days.
        </p>

        <h3>Replacement Delivery</h3>
        <p>
          Once the request for replacement of the product is approved, we will
          dispatch your replacement within 3–5 working days.
        </p>
      </PolicyLayout>
    </PageShell>
  );
}
