import styles from "./refund.module.css";

export const metadata = {
  title: "Refund Policy | GAAV by Yashoda Dairy Farm",
  description:
    "Read our refund and return policy for dairy products purchased from GAAV by Yashoda Dairy Farm.",
};

export default function RefundPolicyPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <div className={styles.badge}>Policy</div>
        <h1 className={styles.pageTitle}>Refund Policy</h1>
        <p className={styles.lastUpdated}>Last updated: January 1, 2026</p>

        <div className={styles.divider} />

        <div className={styles.introBox}>
          <p>
            At <strong>GAAV by Yashoda Dairy Farm</strong>, we are committed
            to delivering the highest quality pure dairy products to your
            doorstep. Due to the perishable nature of our products, we
            maintain a strict but fair refund policy designed to protect both
            our customers and the integrity of our produce. Please read this
            policy carefully before making a purchase.
          </p>
        </div>

        {/* 1 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>01.</span> General Refund Policy
          </h2>
          <div className={styles.sectionBody}>
            <p>
              As a rule, <strong>we do not accept returns or issue refunds</strong>{" "}
              for products once they have been delivered, as all our dairy
              products — including ghee, butter, paneer, and oils — are
              perishable food items produced fresh in small batches. Once
              delivered and accepted, products cannot be returned for hygienic
              and safety reasons.
            </p>
            <p>
              We take quality control very seriously at every stage of
              production and packaging. Each batch is checked before dispatch.
              We do not compromise on the purity or quality of what we send to
              your home. However, we understand that rare issues can arise
              during transit or packaging, and we do address genuine complaints
              promptly and fairly.
            </p>
            <div className={styles.alertBox}>
              <p>
                ⚠️ <strong>Important:</strong> All claims for damaged,
                incorrect, or defective products must be raised within{" "}
                <strong>24 hours</strong> of delivery. Claims raised after this
                window will not be eligible for a refund or replacement.
              </p>
            </div>
          </div>
        </div>

        {/* 2 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>02.</span> Eligible Refund Scenarios
          </h2>
          <div className={styles.sectionBody}>
            <p>
              We will consider a refund or replacement only under the following
              circumstances:
            </p>
            <ul className={styles.bulletList}>
              <li>
                You received a product that is visibly damaged, leaking, or
                tampered with at the time of delivery.
              </li>
              <li>
                You received an incorrect product that does not match your
                confirmed order.
              </li>
              <li>
                The product delivered has a manufacturing defect (e.g., the
                ghee jar seal is broken upon receipt).
              </li>
              <li>
                Your order was confirmed and payment was processed, but the
                product was never delivered without any communication from our
                team.
              </li>
            </ul>
            <p style={{ marginTop: "16px" }}>
              To raise a valid claim, you must provide:
            </p>
            <ul className={styles.bulletList}>
              <li>
                A clear photograph or video of the damaged or incorrect product.
              </li>
              <li>Your order number and date of delivery.</li>
              <li>
                A brief description of the issue sent to our support email or
                WhatsApp number within 24 hours of delivery.
              </li>
            </ul>
          </div>
        </div>

        {/* 3 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>03.</span> Non-Refundable Situations
          </h2>
          <div className={styles.sectionBody}>
            <p>
              Refunds or replacements will <strong>not</strong> be issued in
              the following cases:
            </p>
            <ul className={styles.bulletList}>
              <li>
                The claim is raised more than 24 hours after the product has
                been delivered.
              </li>
              <li>
                The product has been partially consumed or used before the
                complaint is raised.
              </li>
              <li>
                The issue is due to improper storage by the customer after
                delivery (e.g., paneer not refrigerated promptly).
              </li>
              <li>
                Change of mind or the product does not match personal taste
                preferences.
              </li>
              <li>
                Delays in delivery caused by courier partners, weather
                conditions, or circumstances beyond our control.
              </li>
            </ul>
          </div>
        </div>

        {/* 4 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>04.</span> Refund Processing Timeline
          </h2>
          <div className={styles.sectionBody}>
            <p>
              Once your refund claim is reviewed and approved by our team, the
              refund will be processed back to your original payment method.
              The timeline is as follows:
            </p>

            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}>1</div>
                <div className={styles.timelineContent}>
                  <strong>Claim Submission (Day 0)</strong>
                  <p>
                    Submit your complaint with photos and order details via
                    email or WhatsApp within 24 hours of delivery.
                  </p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}>2</div>
                <div className={styles.timelineContent}>
                  <strong>Review &amp; Approval (1–2 Business Days)</strong>
                  <p>
                    Our team will review your complaint, verify the evidence
                    submitted, and communicate the outcome within 1–2 business
                    days.
                  </p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}>3</div>
                <div className={styles.timelineContent}>
                  <strong>Refund Initiation (Within 2 Business Days of Approval)</strong>
                  <p>
                    Upon approval, the refund is initiated from our payment
                    gateway (Cashfree) to your original payment source.
                  </p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot}>4</div>
                <div className={styles.timelineContent}>
                  <strong>Amount Credited (5–7 Business Days)</strong>
                  <p>
                    The refunded amount will reflect in your bank account,
                    UPI wallet, or card statement within 5–7 business days,
                    depending on your bank or payment provider.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.alertBox} style={{ marginTop: "20px" }}>
              <p>
                💡 For COD (Cash on Delivery) orders, refunds will be
                processed via bank transfer or UPI. Please share your bank
                account details or UPI ID when raising your refund request.
              </p>
            </div>
          </div>
        </div>

        {/* 5 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>05.</span> Order Cancellations &amp; Prepaid Refunds
          </h2>
          <div className={styles.sectionBody}>
            <p>
              If you wish to cancel an order, you must do so within{" "}
              <strong>2 hours</strong> of placing it. Cancellation requests
              raised after this window or after the order has been dispatched
              will not be accepted.
            </p>
            <p>
              For orders cancelled within the allowed window, prepaid amounts
              will be refunded in full to your original payment method within
              5–7 business days. No cancellation charges apply.
            </p>
            <p>
              If we cancel your order due to unavailability, pricing errors,
              or delivery constraints, you will receive a full refund
              automatically within the same 5–7 business day window. We will
              notify you via SMS or email at the earliest.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className={styles.contactBox}>
          <div className={styles.contactTitle}>Need Help With a Refund?</div>
          <p>
            If you believe your order qualifies for a refund or replacement,
            please contact our support team immediately with your order number
            and supporting photographs.
          </p>
          <p>
            📧 Email:{" "}
            <a href="mailto:support@yashodadairyfarm.com">
              support@yashodadairyfarm.com
            </a>
          </p>
          <p>
            💬 WhatsApp: Available on our Contact page
          </p>
          <p>📍 Yashoda Dairy Farm, New Delhi, India</p>
        </div>

      </div>
    </div>
  );
}
