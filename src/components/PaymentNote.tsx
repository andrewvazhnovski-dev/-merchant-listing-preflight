function PaymentNote() {
  return (
    <div className="payment-card">
      <div className="section-heading order-heading">
        <div>
          <div className="eyebrow">Payment note</div>
          <h2>Payment is requested after the report scope is confirmed</h2>
        </div>

        <p>
          Merchant Center issues can vary in complexity. The request is reviewed
          first, then the correct report scope and payment details are confirmed
          by email.
        </p>
      </div>

      <div className="payment-grid">
        <article className="payment-item">
          <h3>No payment before scope confirmation</h3>
          <p>
            First, send your store URL, issue type, affected-products CSV and
            sample product URLs. The scope is reviewed before payment is
            requested.
          </p>
        </article>

        <article className="payment-item">
          <h3>Fixed-price report options</h3>
          <p>
            Express Report, Store Audit and Pre-Appeal Checklist are fixed-price
            options. You receive the recommended option before paying.
          </p>
        </article>

        <article className="payment-item">
          <h3>Clear diagnostic deliverable</h3>
          <p>
            The paid deliverable is a diagnostic report with likely root cause,
            evidence notes, priority fixes and review preparation checklist.
          </p>
        </article>
      </div>

      <div className="payment-warning">
        <strong>No approval guarantee</strong>
        <p>
          Payment is for diagnostic work and preparation. It does not buy Google
          approval, reinstatement, policy reversal or ranking improvement.
        </p>
      </div>
    </div>
  );
}

export default PaymentNote;
