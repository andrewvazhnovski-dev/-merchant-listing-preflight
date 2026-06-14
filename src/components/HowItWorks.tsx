const processSteps = [
  {
    number: "01",
    title: "Send request",
    text: "Fill the form with your store URL, issue type, target country and currency. No Google login is required.",
  },
  {
    number: "02",
    title: "Send CSV and examples",
    text: "After the email opens, attach the affected-products CSV and add 3–5 affected product URLs.",
  },
  {
    number: "03",
    title: "Get diagnostic report",
    text: "You receive a clear report with likely root cause, evidence, priority fixes and review preparation notes.",
  },
];

const deliverables = [
  "Executive summary of the issue",
  "Affected product examples",
  "Likely root cause",
  "Feed vs page vs schema mismatch notes",
  "Priority fix order",
  "Review preparation checklist",
  "Prevention checklist",
];

const notIncluded = [
  "No Google approval guarantee",
  "No account reinstatement promise",
  "No need to share Google login",
  "No live call required",
  "No code changes inside your store",
];

function HowItWorks() {
  return (
    <div className="how-card">
      <div className="section-heading order-heading">
        <div>
          <div className="eyebrow">How it works</div>
          <h2>
            Simple diagnostic workflow before another Merchant Center review
          </h2>
        </div>

        <p>
          The goal is not to guess. The goal is to compare Merchant Center
          export, product URLs and structured data, then show what should be
          fixed first.
        </p>
      </div>

      <div className="process-grid">
        {processSteps.map((step) => (
          <article className="process-step" key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>

      <div className="details-grid">
        <article className="details-card">
          <h3>What the report includes</h3>

          <ul className="step-list">
            {deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="details-card">
          <h3>Important limits</h3>

          <ul className="step-list">
            {notIncluded.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  );
}

export default HowItWorks;
