import { useEffect } from "react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need to share my Google Merchant Center login?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. You do not need to share your Google account login. The report can be prepared from your affected-products CSV, affected product URLs, screenshots and issue details.",
      },
    },
    {
      "@type": "Question",
      name: "Do you guarantee Google approval or account reinstatement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. This is a diagnostic and preparation service. It does not guarantee Google approval, account reinstatement, policy reversal, ranking improvement or sales increase.",
      },
    },
    {
      "@type": "Question",
      name: "What do I need to send after requesting a report?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Send the affected-products CSV from Merchant Center, 3–5 affected product URLs, target country, target currency and a screenshot of the issue title.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can I receive the report?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Express Report is designed for a small issue family and can usually be prepared faster than a full store audit. The exact delivery time depends on the number of affected products and issue complexity.",
      },
    },
    {
      "@type": "Question",
      name: "Can you fix the issue directly inside my store?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The core service is diagnosis and preparation. The report explains what is likely broken and what should be fixed first. You or your developer can then implement the changes.",
      },
    },
    {
      "@type": "Question",
      name: "Which issues can be checked?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common checks include mismatched product price, mismatched product availability, mismatched domains, different product landing page, pending website check and Product / Offer structured data readiness.",
      },
    },
  ],
};

function FAQSchema() {
  useEffect(() => {
    const scriptId = "faq-schema-jsonld";

    document.getElementById(scriptId)?.remove();

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.text = JSON.stringify(faqSchema);

    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, []);

  return null;
}

export default FAQSchema;
