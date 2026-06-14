import { useMemo, useState, type ChangeEvent } from "react";
import { Route, Routes } from "react-router-dom";
import GuidePage from "./pages/GuidePage";
import SampleReportPage from "./pages/SampleReportPage";
import OrderForm from "./components/OrderForm";
import HowItWorks from "./components/HowItWorks";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import FAQ from "./components/FAQ";
import AfterRequest from "./components/AfterRequest";
import PaymentNote from "./components/PaymentNote";

type CsvRow = Record<string, string>;

type Priority = "High" | "Medium" | "Low";

type CsvAnalysis = {
  fileName: string;
  rowsCount: number;
  headers: string[];
  detectedColumns: {
    issue?: string;
    title?: string;
    link?: string;
    id?: string;
    price?: string;
    availability?: string;
    status?: string;
  };
  issueGroups: {
    issue: string;
    count: number;
    priority: Priority;
    sample: CsvRow[];
  }[];
  warnings: string[];
  topUrls: string[];
};

type CheckStatus = "pass" | "warn" | "fail";

type RuleResult = {
  label: string;
  status: CheckStatus;
  detail: string;
};

type SchemaAnalysis = {
  blocks: number;
  productFound: boolean;
  offerFound: boolean;
  checks: RuleResult[];
  errors: string[];
};

type JsonMap = Record<string, unknown>;

const demoCsv = `Item ID,Title,Link,Issue,Status,Price,Availability
SKU-1001,Blue Running Shoes,https://example.com/products/blue-running-shoes,Mismatched product price,Disapproved,79.99 USD,in stock
SKU-1002,Black Backpack,https://example.com/products/black-backpack,Mismatched product availability,Disapproved,49.00 USD,out of stock
SKU-1003,Travel Mug,https://example.com/products/travel-mug,Mismatched domains,Needs attention,19.00 USD,in stock
SKU-1004,Winter Jacket,https://example.com/products/winter-jacket,Mismatched product price,Disapproved,129.00 USD,in stock
SKU-1005,Cotton T-Shirt,https://example.com/products/cotton-shirt,Pending website check,Warning,24.00 USD,in stock`;

const demoJsonLd = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Blue Running Shoes",
  "offers": {
    "@type": "Offer",
    "price": "79.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": "https://example.com/products/blue-running-shoes"
  }
}
</script>
<link rel="canonical" href="https://example.com/products/blue-running-shoes" />`;

const issueFamilies = [
  "Mismatched product price",
  "Mismatched product availability",
  "Mismatched domains",
  "Different product landing page",
  "Pending website check",
];

const pricing = [
  {
    name: "Express Report",
    price: "$29",
    description:
      "One issue family, up to 25 affected products, clear report within 24 hours.",
    items: [
      "CSV triage",
      "Root-cause notes",
      "Priority fixes",
      "Review prep checklist",
    ],
  },
  {
    name: "Store Audit",
    price: "$79",
    description: "Up to 3 issue families and up to 250 affected products.",
    items: [
      "Grouped issue analysis",
      "Feed vs page checks",
      "Structured data notes",
      "Prevention checklist",
    ],
  },
  {
    name: "Pre-Appeal Checklist",
    price: "$149",
    description:
      "Account-level review preparation without promising reinstatement.",
    items: [
      "Trust-page checks",
      "Policy mapping",
      "Evidence checklist",
      "Appeal readiness notes",
    ],
  },
];

const guides = [
  "How to fix Mismatched product price",
  "How to fix Mismatched product availability",
  "How to fix Mismatched domains",
  "Different product landing page checklist",
  "Pending website check readiness",
  "Product / Offer structured data checklist",
];

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/^\uFEFF/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let inQuotes = false;

  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < normalized.length; i += 1) {
    const char = normalized[i];
    const next = normalized[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      value += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(value.trim());
      value = "";
      continue;
    }

    if (char === "\n" && !inQuotes) {
      row.push(value.trim());

      if (row.some((cell) => cell.length > 0)) {
        rows.push(row);
      }

      row = [];
      value = "";
      continue;
    }

    value += char;
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value.trim());

    if (row.some((cell) => cell.length > 0)) {
      rows.push(row);
    }
  }

  return rows;
}

function rowsToObjects(matrix: string[][]): {
  headers: string[];
  rows: CsvRow[];
} {
  const headers = matrix[0].map((header, index) => {
    const clean = header.replace(/^\uFEFF/, "").trim();
    return clean || `column_${index + 1}`;
  });

  const rows = matrix.slice(1).map((line) => {
    const row: CsvRow = {};

    headers.forEach((header, index) => {
      row[header] = line[index] ?? "";
    });

    return row;
  });

  return { headers, rows };
}

function findColumn(
  headers: string[],
  candidates: string[],
): string | undefined {
  const normalizedCandidates = candidates.map(normalizeText);

  return headers.find((header) => {
    const cleanHeader = normalizeText(header);

    return normalizedCandidates.some((candidate) => {
      return (
        cleanHeader === candidate ||
        cleanHeader.includes(candidate) ||
        candidate.includes(cleanHeader)
      );
    });
  });
}

function getPriority(issue: string): Priority {
  const clean = normalizeText(issue);

  if (
    clean.includes("disapproved") ||
    clean.includes("suspension") ||
    clean.includes("suspended") ||
    clean.includes("mismatched product price") ||
    clean.includes("mismatched product availability") ||
    clean.includes("mismatched domains") ||
    clean.includes("different product landing page")
  ) {
    return "High";
  }

  if (
    clean.includes("warning") ||
    clean.includes("pending") ||
    clean.includes("check") ||
    clean.includes("limited")
  ) {
    return "Medium";
  }

  return "Low";
}

function analyzeCsvText(
  text: string,
  fileName = "demo-merchant-center-export.csv",
): CsvAnalysis {
  const matrix = parseCsv(text);

  if (matrix.length < 2) {
    return {
      fileName,
      rowsCount: 0,
      headers: matrix[0] ?? [],
      detectedColumns: {},
      issueGroups: [],
      topUrls: [],
      warnings: ["CSV looks empty or has no product rows."],
    };
  }

  const { headers, rows } = rowsToObjects(matrix);

  const detectedColumns = {
    issue: findColumn(headers, [
      "issue",
      "issues",
      "problem",
      "diagnostic issue",
      "what needs attention",
    ]),
    title: findColumn(headers, [
      "title",
      "item title",
      "product title",
      "name",
    ]),
    link: findColumn(headers, [
      "link",
      "url",
      "landing page",
      "final url",
      "product url",
    ]),
    id: findColumn(headers, ["id", "item id", "offer id", "product id", "sku"]),
    price: findColumn(headers, ["price", "sale price", "current price"]),
    availability: findColumn(headers, [
      "availability",
      "stock",
      "stock status",
    ]),
    status: findColumn(headers, ["status", "approval status", "item status"]),
  };

  const issueSource = detectedColumns.issue || detectedColumns.status;

  const grouped = new Map<string, CsvRow[]>();

  rows.forEach((row) => {
    const issue = issueSource ? row[issueSource]?.trim() : "";
    const key = issue || "No issue column detected";
    const current = grouped.get(key) ?? [];
    current.push(row);
    grouped.set(key, current);
  });

  const issueGroups = Array.from(grouped.entries())
    .map(([issue, groupRows]) => ({
      issue,
      count: groupRows.length,
      priority: getPriority(issue),
      sample: groupRows.slice(0, 3),
    }))
    .sort((a, b) => {
      const priorityOrder: Record<Priority, number> = {
        High: 0,
        Medium: 1,
        Low: 2,
      };

      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      return b.count - a.count;
    });

  const warnings: string[] = [];

  if (!detectedColumns.issue && !detedetected(detectedColumns.status)) {
    warnings.push(
      "No clear Issue column was detected. The checker grouped products by status instead.",
    );
  }

  if (!detectedColumns.link) {
    warnings.push(
      "No product URL / landing page column was detected. URL-level checks will need manual product URLs.",
    );
  }

  if (!detectedColumns.price) {
    warnings.push(
      "No price column was detected. Price mismatch analysis will require feed price data.",
    );
  }

  if (!detectedColumns.availability) {
    warnings.push(
      "No availability column was detected. Availability mismatch analysis will require stock data.",
    );
  }

  const topUrls = detectedColumns.link
    ? rows
        .map((row) => row[detectedColumns.link as string])
        .filter(Boolean)
        .slice(0, 5)
    : [];

  return {
    fileName,
    rowsCount: rows.length,
    headers,
    detectedColumns,
    issueGroups,
    warnings,
    topUrls,
  };
}

function detedetected(value: unknown): boolean {
  return Boolean(value);
}

function isRecord(value: unknown): value is JsonMap {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function typeIncludes(node: JsonMap | undefined, expected: string): boolean {
  if (!node) return false;

  const type = node["@type"];

  if (Array.isArray(type)) {
    return type
      .map(String)
      .some((item) => item.toLowerCase().includes(expected.toLowerCase()));
  }

  return String(type ?? "")
    .toLowerCase()
    .includes(expected.toLowerCase());
}

function collectNodes(value: unknown): JsonMap[] {
  const nodes: JsonMap[] = [];

  function walk(input: unknown) {
    if (Array.isArray(input)) {
      input.forEach(walk);
      return;
    }

    if (!isRecord(input)) {
      return;
    }

    nodes.push(input);

    const graph = input["@graph"];
    if (graph) {
      walk(graph);
    }

    Object.values(input).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach(walk);
      } else if (isRecord(child)) {
        walk(child);
      }
    });
  }

  walk(value);
  return nodes;
}

function firstObject(value: unknown): JsonMap | undefined {
  if (Array.isArray(value)) {
    return value.find(isRecord);
  }

  if (isRecord(value)) {
    return value;
  }

  return undefined;
}

function safeString(value: unknown): string {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return String(value);
  }

  return "";
}

function extractJsonLdBlocks(input: string): string[] {
  const htmlBlocks = Array.from(
    input.matchAll(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ).map((match) => match[1].trim());

  if (htmlBlocks.length > 0) {
    return htmlBlocks;
  }

  const trimmed = input.trim();

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return [trimmed];
  }

  return [];
}

function analyzeSchemaInput(input: string): SchemaAnalysis {
  const blocks = extractJsonLdBlocks(input);
  const errors: string[] = [];
  const parsed: unknown[] = [];

  blocks.forEach((block, index) => {
    try {
      parsed.push(JSON.parse(block));
    } catch {
      errors.push(`JSON-LD block #${index + 1} could not be parsed.`);
    }
  });

  const nodes = parsed.flatMap(collectNodes);
  const product = nodes.find((node) => typeIncludes(node, "Product"));
  const offerFromProduct = firstObject(product?.offers);
  const offer =
    offerFromProduct ?? nodes.find((node) => typeIncludes(node, "Offer"));

  const priceSpecification = firstObject(offer?.priceSpecification);
  const price =
    safeString(offer?.price) || safeString(priceSpecification?.price);
  const currency =
    safeString(offer?.priceCurrency) ||
    safeString(priceSpecification?.priceCurrency);
  const availability = safeString(offer?.availability);

  const canonicalMatch = input.match(
    /<link[^>]+rel=["'][^"']*canonical[^"']*["'][^>]*>/i,
  );
  const canonicalHref = canonicalMatch?.[0].match(
    /href=["']([^"']+)["']/i,
  )?.[1];

  const hasHreflang =
    /<link[^>]+rel=["'][^"']*alternate[^"']*["'][^>]*hreflang=["'][^"']+["'][^>]*>/i.test(
      input,
    ) || /hreflang=["'][^"']+["']/i.test(input);

  const shippingDetails = offer?.shippingDetails ?? product?.shippingDetails;
  const returnPolicy =
    offer?.hasMerchantReturnPolicy ?? product?.hasMerchantReturnPolicy;

  const checks: RuleResult[] = [
    {
      label: "Product structured data",
      status: product ? "pass" : "fail",
      detail: product
        ? `Product found: ${safeString(product.name) || "name not provided"}`
        : "No Product object found in JSON-LD.",
    },
    {
      label: "Offer object",
      status: offer ? "pass" : "fail",
      detail: offer
        ? "Offer object found."
        : "No Offer object found. Merchant listings usually need offer data.",
    },
    {
      label: "Price",
      status: price ? "pass" : "fail",
      detail: price
        ? `Price detected: ${price}`
        : "No price detected inside Offer.",
    },
    {
      label: "Currency",
      status: currency ? "pass" : "fail",
      detail: currency
        ? `Currency detected: ${currency}`
        : "No priceCurrency detected inside Offer.",
    },
    {
      label: "Availability",
      status: availability ? "pass" : "warn",
      detail: availability
        ? `Availability detected: ${availability}`
        : "No availability detected inside Offer.",
    },
    {
      label: "Canonical URL",
      status: canonicalHref ? "pass" : "warn",
      detail: canonicalHref
        ? `Canonical found: ${canonicalHref}`
        : "No canonical link found in pasted HTML.",
    },
    {
      label: "Hreflang",
      status: hasHreflang ? "pass" : "warn",
      detail: hasHreflang
        ? "Hreflang markup found."
        : "No hreflang found. This is fine for one-language stores, but risky for multilingual stores.",
    },
    {
      label: "Shipping details",
      status: shippingDetails ? "pass" : "warn",
      detail: shippingDetails
        ? "Shipping details found in structured data."
        : "No shippingDetails found. Add later for stronger merchant listing readiness.",
    },
    {
      label: "Return policy",
      status: returnPolicy ? "pass" : "warn",
      detail: returnPolicy
        ? "Return policy found in structured data."
        : "No hasMerchantReturnPolicy found. Add later for stronger trust signals.",
    },
  ];

  if (blocks.length === 0) {
    errors.push("No JSON-LD script block or raw JSON object was found.");
  }

  return {
    blocks: blocks.length,
    productFound: Boolean(product),
    offerFound: Boolean(offer),
    checks,
    errors,
  };
}

function HomePage() {
  const [activeTab, setActiveTab] = useState<"csv" | "schema">("csv");
  const [csvAnalysis, setCsvAnalysis] = useState<CsvAnalysis | null>(null);
  const [schemaInput, setSchemaInput] = useState(demoJsonLd);
  const [schemaAnalysis, setSchemaAnalysis] = useState<SchemaAnalysis | null>(
    null,
  );

  const totalCriticalIssues = useMemo(() => {
    if (!csvAnalysis) return 0;

    return csvAnalysis.issueGroups
      .filter((group) => group.priority === "High")
      .reduce((total, group) => total + group.count, 0);
  }, [csvAnalysis]);

  async function handleCsvUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const text = await file.text();
    setCsvAnalysis(analyzeCsvText(text, file.name));
  }

  function loadDemoCsv() {
    setCsvAnalysis(analyzeCsvText(demoCsv));
  }

  function runSchemaCheck() {
    setSchemaAnalysis(analyzeSchemaInput(schemaInput));
  }

  return (
    <div className="page">
      <header className="header">
        <a
          className="logo"
          href="#top"
          aria-label="Merchant Listing Preflight home"
        >
          <span className="logo-mark">ML</span>
          <span>
            Merchant Listing
            <strong>Preflight</strong>
          </span>
        </a>

        <nav className="nav">
          <a href="#checker">Checker</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#after-request">After request</a>
          <a href="#sample">Sample report</a>
          <a href="#guides">Guides</a>
        </nav>

        <a className="header-cta" href="#checker">
          Run free check
        </a>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="hero-content">
            <div className="eyebrow">
              For Google Merchant Center and merchant listing issues
            </div>

            <h1>
              Find what is blocking your products before you request another
              review.
            </h1>

            <p className="hero-text">
              Upload your affected-products CSV or paste Product / Offer
              structured data. Get a fast preflight summary for price mismatch,
              availability mismatch, domain issues, landing page problems and
              merchant listing readiness.
            </p>

            <div className="hero-actions">
              <a className="btn primary" href="#checker">
                Run free preflight
              </a>
              <a className="btn secondary" href="#sample">
                See sample report
              </a>
            </div>

            <div className="trust-row">
              <span>No calls</span>
              <span>No account login required</span>
              <span>Fixed-price reports</span>
            </div>
          </div>

          <div className="hero-card">
            <div className="terminal-top">
              <span />
              <span />
              <span />
            </div>

            <div className="terminal-body">
              <p className="muted">Detected issue families</p>

              {issueFamilies.map((issue, index) => (
                <div className="terminal-line" key={issue}>
                  <span className="terminal-index">0{index + 1}</span>
                  <span>{issue}</span>
                  <strong>{index < 3 ? "High" : "Medium"}</strong>
                </div>
              ))}

              <div className="summary-box">
                <span>Suggested action</span>
                <strong>Fix feed ↔ landing page ↔ schema mismatch first</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section problem-grid">
          <div>
            <div className="eyebrow">Why this matters</div>
            <h2>
              Merchant issues are not abstract SEO warnings. They affect product
              visibility.
            </h2>
          </div>

          <div className="cards three">
            <article className="card">
              <h3>Price mismatch</h3>
              <p>
                Feed price, page price, sale price and structured data can
                disagree.
              </p>
            </article>

            <article className="card">
              <h3>Availability mismatch</h3>
              <p>
                Stock status can differ between the website, feed, crawl and
                schema.
              </p>
            </article>

            <article className="card">
              <h3>Domain / landing page issues</h3>
              <p>
                Wrong URLs, redirects, canonicals and regional pages can break
                trust.
              </p>
            </article>
          </div>
        </section>

        <section id="checker" className="section checker-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Free checker</div>
              <h2>Run a quick preflight check</h2>
            </div>

            <p>
              Free output gives a summary. Paid report gives root cause, fix
              order, evidence checklist and review preparation.
            </p>
          </div>

          <div className="checker">
            <div className="tabs">
              <button
                className={activeTab === "csv" ? "active" : ""}
                onClick={() => setActiveTab("csv")}
              >
                CSV upload
              </button>
              <button
                className={activeTab === "schema" ? "active" : ""}
                onClick={() => setActiveTab("schema")}
              >
                HTML / JSON-LD
              </button>
            </div>

            {activeTab === "csv" && (
              <div className="checker-panel">
                <div className="upload-box">
                  <h3>Upload affected-products CSV</h3>
                  <p>
                    Use export from Merchant Center “Needs attention” or Issue
                    Details Page. This runs locally in your browser.
                  </p>

                  <label className="field-label" htmlFor="merchant-csv-upload">
                    Affected-products CSV file
                  </label>

                  <input
                    id="merchant-csv-upload"
                    type="file"
                    accept=".csv,text/csv"
                    onChange={handleCsvUpload}
                    title="Upload affected-products CSV file"
                    aria-label="Upload affected-products CSV file"
                  />
                  <button className="btn secondary small" onClick={loadDemoCsv}>
                    Load demo CSV
                  </button>
                </div>

                {csvAnalysis && (
                  <div className="result-box">
                    <div className="result-header">
                      <div>
                        <p className="muted">File</p>
                        <h3>{csvAnalysis.fileName}</h3>
                      </div>

                      <div className="score">
                        <span>{totalCriticalIssues}</span>
                        <small>high-priority rows</small>
                      </div>
                    </div>

                    <div className="stats-grid">
                      <div>
                        <span>{csvAnalysis.rowsCount}</span>
                        <small>products</small>
                      </div>
                      <div>
                        <span>{csvAnalysis.issueGroups.length}</span>
                        <small>issue groups</small>
                      </div>
                      <div>
                        <span>{csvAnalysis.headers.length}</span>
                        <small>columns</small>
                      </div>
                    </div>

                    <h4>Detected columns</h4>
                    <div className="chips">
                      {Object.entries(csvAnalysis.detectedColumns).map(
                        ([key, value]) => (
                          <span
                            className={value ? "chip good" : "chip"}
                            key={key}
                          >
                            {key}: {value || "not found"}
                          </span>
                        ),
                      )}
                    </div>

                    {csvAnalysis.warnings.length > 0 && (
                      <div className="warning-box">
                        {csvAnalysis.warnings.map((warning) => (
                          <p key={warning}>{warning}</p>
                        ))}
                      </div>
                    )}

                    <h4>Issue groups</h4>
                    <div className="issue-list">
                      {csvAnalysis.issueGroups.map((group) => (
                        <article className="issue-item" key={group.issue}>
                          <div>
                            <strong>{group.issue}</strong>
                            <small>{group.count} affected product rows</small>
                          </div>
                          <span
                            className={`priority ${group.priority.toLowerCase()}`}
                          >
                            {group.priority}
                          </span>
                        </article>
                      ))}
                    </div>

                    {csvAnalysis.topUrls.length > 0 && (
                      <>
                        <h4>Sample product URLs</h4>
                        <ul className="url-list">
                          {csvAnalysis.topUrls.map((url) => (
                            <li key={url}>{url}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className="upgrade-box">
                      <div>
                        <strong>Need the full report?</strong>
                        <p>
                          Get root cause, fix order, evidence notes and review
                          checklist.
                        </p>
                      </div>
                      <a className="btn primary small" href="#pricing">
                        View paid reports
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "schema" && (
              <div className="checker-panel">
                <div className="upload-box">
                  <h3>Paste product page HTML or JSON-LD</h3>
                  <p>
                    Paste the source code of a product page, or just the Product
                    / Offer JSON-LD block. Direct URL fetch will be added with
                    backend proxy later.
                  </p>

                  <label className="field-label" htmlFor="schema-input">
                    Product page HTML or JSON-LD
                  </label>

                  <textarea
                    id="schema-input"
                    value={schemaInput}
                    onChange={(event) => setSchemaInput(event.target.value)}
                    rows={14}
                    spellCheck={false}
                    title="Paste product page HTML or JSON-LD"
                    aria-label="Paste product page HTML or JSON-LD"
                    placeholder="Paste product page HTML source or Product / Offer JSON-LD here..."
                  />

                  <button
                    className="btn primary small"
                    onClick={runSchemaCheck}
                  >
                    Analyze schema
                  </button>
                </div>

                {schemaAnalysis && (
                  <div className="result-box">
                    <div className="result-header">
                      <div>
                        <p className="muted">Schema summary</p>
                        <h3>
                          {schemaAnalysis.blocks} JSON-LD block(s) checked
                        </h3>
                      </div>

                      <div className="score">
                        <span>
                          {
                            schemaAnalysis.checks.filter(
                              (check) => check.status === "fail",
                            ).length
                          }
                        </span>
                        <small>failed checks</small>
                      </div>
                    </div>

                    {schemaAnalysis.errors.length > 0 && (
                      <div className="warning-box">
                        {schemaAnalysis.errors.map((error) => (
                          <p key={error}>{error}</p>
                        ))}
                      </div>
                    )}

                    <div className="check-list">
                      {schemaAnalysis.checks.map((check) => (
                        <article
                          className={`check ${check.status}`}
                          key={check.label}
                        >
                          <div>
                            <strong>{check.label}</strong>
                            <p>{check.detail}</p>
                          </div>
                          <span>{check.status}</span>
                        </article>
                      ))}
                    </div>

                    <div className="upgrade-box">
                      <div>
                        <strong>This is only the free preflight.</strong>
                        <p>
                          Full report compares feed data, page content, schema,
                          canonical and review readiness.
                        </p>
                      </div>
                      <a className="btn primary small" href="#pricing">
                        Get full diagnosis
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section id="how-it-works" className="section">
          <HowItWorks />
        </section>

        <section id="pricing" className="section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Pricing</div>
              <h2>Fixed-price diagnostic reports</h2>
            </div>

            <p>
              No promise of Google approval. The deliverable is diagnosis, fix
              order and review preparation.
            </p>
          </div>

          <div className="cards three">
            {pricing.map((plan) => (
              <article className="price-card" key={plan.name}>
                <h3>{plan.name}</h3>
                <div className="price">{plan.price}</div>
                <p>{plan.description}</p>

                <ul>
                  {plan.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <a className="btn primary full" href="#order">
                  Request {plan.name}
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="section">
          <FAQ />
        </section>

        <section id="after-request" className="section">
          <AfterRequest />
        </section>

        <section id="payment-note" className="section">
          <PaymentNote />
        </section>

        <section id="order" className="section">
          <OrderForm />
        </section>

        <section id="sample" className="section sample-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Sample report</div>
              <h2>What the client receives</h2>
            </div>
          </div>

          <div className="report-preview">
            <div className="report-sidebar">
              <span>01 Executive summary</span>
              <span>02 Detected issue family</span>
              <span>03 Affected products</span>
              <span>04 Likely root cause</span>
              <span>05 Evidence</span>
              <span>06 Priority fixes</span>
              <span>07 Review preparation</span>
              <span>08 Prevention checklist</span>
            </div>

            <div className="report-page">
              <h3>Merchant Listing Diagnostic Report</h3>
              <p className="muted">Demo case: Mismatched product price</p>

              <div className="report-block danger">
                <strong>Priority 1</strong>
                <p>
                  Feed price and landing page price appear inconsistent for 14
                  affected products. Fix product data first, then verify page
                  markup.
                </p>
              </div>

              <div className="report-block">
                <strong>Evidence</strong>
                <p>
                  CSV shows USD price while page-level structured data exposes a
                  different value. Canonical points to the same product URL, so
                  the likely conflict is price source synchronization.
                </p>
              </div>

              <div className="report-block">
                <strong>Recommended fix order</strong>
                <ol>
                  <li>Update feed price and sale price fields.</li>
                  <li>Verify Product / Offer structured data.</li>
                  <li>Check visible page price after cache refresh.</li>
                  <li>
                    Resubmit product data and request review only after
                    consistency check.
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section id="guides" className="section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">SEO content plan</div>
              <h2>Issue pages we will publish next</h2>
            </div>

            <p>
              Each guide targets a real problem name and sends users into the
              checker.
            </p>
          </div>

          <div className="guide-grid">
            {guides.map((guide) => {
              const slug = guide
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");

              return (
                <a className="guide-card" href={`/guides/${slug}`} key={guide}>
                  <span>Guide</span>
                  <h3>{guide}</h3>
                  <p>Cause, checklist, free preflight and paid report CTA.</p>
                </a>
              );
            })}
          </div>
        </section>

        <section className="section final-cta">
          <div>
            <div className="eyebrow">Next step</div>
            <h2>Ready for the first real launch version.</h2>
            <p>
              Replace the placeholder email, connect a payment link later, then
              publish the first public MVP on a free host.
            </p>
          </div>

          <a className="btn primary" href="#checker">
            Test the checker
          </a>
        </section>
      </main>

      <footer className="footer">
        <span>Merchant Listing Preflight</span>

        <span className="footer-links">
          <span>Diagnostic service. No Google approval guarantee.</span>
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
        </span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/guides/:slug" element={<GuidePage />} />
      <Route path="/sample-report" element={<SampleReportPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
