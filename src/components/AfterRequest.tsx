const afterRequestSteps = [
  {
    title: "1. Email opens with your request",
    text: "After you submit the form, your email app opens with a prepared diagnostic request. Attach the CSV manually before sending.",
  },
  {
    title: "2. Scope is confirmed",
    text: "The request is reviewed to confirm whether it fits Express Report, Store Audit or Pre-Appeal Checklist.",
  },
  {
    title: "3. Payment details are sent",
    text: "After the scope is confirmed, you receive payment details and the expected report delivery window.",
  },
  {
    title: "4. Diagnostic report is prepared",
    text: "The report reviews your affected products, product URLs, issue type, target country, currency and structured data signals.",
  },
];

const requiredFiles = [
  "Affected-products CSV from Merchant Center",
  "3–5 affected product URLs",
  "Screenshot of the Merchant Center issue title",
  "Target country and target currency",
  "Notes about discounts, stock updates, redirects, variants or regional pricing",
];

function AfterRequest() {
  return (
    <div className="after-card">
      <div className="section-heading order-heading">
        <div>
          <div className="eyebrow">After you request</div>
          <h2>What happens after you send the diagnostic request</h2>
        </div>

        <p>
          The process is designed to avoid account access, unclear promises and
          unnecessary calls. You send the issue evidence, then receive a focused
          diagnostic report.
        </p>
      </div>

      <div className="after-grid">
        <div className="after-steps">
          {afterRequestSteps.map((step) => (
            <article className="after-step" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <aside className="after-files">
          <h3>Prepare these before sending</h3>

          <ul className="step-list">
            {requiredFiles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="notice-box">
            <strong>No login required</strong>
            <p>
              Do not send Google account passwords, recovery codes, admin access
              or private login credentials.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default AfterRequest;
