const faqs = [
  {
    question: "Do I need to share my Google Merchant Center login?",
    answer:
      "No. You do not need to share your Google account login. The report can be prepared from your affected-products CSV, affected product URLs, screenshots and issue details.",
  },
  {
    question: "Do you guarantee Google approval or account reinstatement?",
    answer:
      "No. This is a diagnostic and preparation service. It does not guarantee Google approval, account reinstatement, policy reversal, ranking improvement or sales increase.",
  },
  {
    question: "What do I need to send after requesting a report?",
    answer:
      "Send the affected-products CSV from Merchant Center, 3–5 affected product URLs, target country, target currency and a screenshot of the issue title.",
  },
  {
    question: "How fast can I receive the report?",
    answer:
      "The Express Report is designed for a small issue family and can usually be prepared faster than a full store audit. The exact delivery time depends on the number of affected products and issue complexity.",
  },
  {
    question: "Can you fix the issue directly inside my store?",
    answer:
      "The core service is diagnosis and preparation. The report explains what is likely broken and what should be fixed first. You or your developer can then implement the changes.",
  },
  {
    question: "Which issues can be checked?",
    answer:
      "Common checks include mismatched product price, mismatched product availability, mismatched domains, different product landing page, pending website check and Product / Offer structured data readiness.",
  },
];

function FAQ() {
  return (
    <div className="faq-card">
      <div className="section-heading order-heading">
        <div>
          <div className="eyebrow">FAQ</div>
          <h2>Questions before requesting a diagnostic report</h2>
        </div>

        <p>
          Clear answers before you send store data. No login required, no
          approval promises, no hidden review guarantee.
        </p>
      </div>

      <div className="faq-grid">
        {faqs.map((faq) => (
          <article className="faq-item" key={faq.question}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
