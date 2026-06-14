import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getGuideBySlug, guidePages } from "../guideData";

function setPageMeta(title: string, description: string) {
  document.title = title;

  let meta = document.querySelector('meta[name="description"]');

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", description);
}

function GuidePage() {
  const { slug } = useParams();
  const guide = getGuideBySlug(slug);

  useEffect(() => {
    if (!guide) {
      setPageMeta(
        "Guide not found — Merchant Listing Preflight",
        "Merchant Listing Preflight guide not found.",
      );
      return;
    }

    setPageMeta(guide.metaTitle, guide.metaDescription);
  }, [guide]);

  if (!guide) {
    return (
      <div className="page">
        <header className="header">
          <Link className="logo" to="/">
            <span className="logo-mark">ML</span>
            <span>
              Merchant Listing
              <strong>Preflight</strong>
            </span>
          </Link>

          <Link className="header-cta" to="/">
            Back home
          </Link>
        </header>

        <main className="content-page">
          <section className="content-hero">
            <p className="eyebrow">404</p>
            <h1>Guide not found</h1>
            <p>This guide does not exist yet.</p>

            <Link className="btn primary" to="/">
              Back to homepage
            </Link>
          </section>
        </main>

        <footer className="footer">
          <span>Merchant Listing Preflight</span>

          <span className="footer-links">
            <span>Diagnostic service. No Google approval guarantee.</span>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
          </span>
        </footer>
      </div>
    );
  }

  const related = guidePages
    .filter((item) => item.slug !== guide.slug)
    .slice(0, 3);

  return (
    <div className="page">
      <header className="header">
        <Link className="logo" to="/">
          <span className="logo-mark">ML</span>
          <span>
            Merchant Listing
            <strong>Preflight</strong>
          </span>
        </Link>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/guides">Guides</Link>
          <Link to="/sample-report">Sample report</Link>
        </nav>

        <Link className="header-cta" to="/#order">
          Run free check
        </Link>
      </header>

      <main className="content-page">
        <section className="content-hero">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Guides</span>
          </div>

          <p className="eyebrow">{guide.issueName}</p>

          <h1>{guide.title}</h1>

          <p>{guide.intro}</p>

          <div className="hero-actions">
            <Link className="btn primary" to="/#order">
              Run free preflight
            </Link>

            <Link className="btn secondary" to="/sample-report">
              View sample report
            </Link>
          </div>
        </section>

        <section className="content-grid">
          <article className="article-card">
            <h2>Common symptoms</h2>

            <ul className="step-list">
              {guide.symptoms.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="article-card">
            <h2>Likely causes</h2>

            <ul className="step-list">
              {guide.causes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="article-card">
            <h2>Quick preflight checks</h2>

            <ul className="step-list numbered">
              {guide.quickChecks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="article-card">
            <h2>Fix order</h2>

            <ul className="step-list numbered">
              {guide.fixSteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="article-cta">
          <div>
            <p className="eyebrow">Need a report?</p>

            <h2>Get a clear diagnosis before requesting another review.</h2>

            <p>
              Upload your affected-products CSV and 3–5 affected product URLs.
              The paid report gives root cause, priority fixes, evidence notes
              and review preparation.
            </p>
          </div>

          <Link className="btn primary" to="/#order">
            See pricing
          </Link>
        </section>

        <section className="related-section">
          <h2>Related guides</h2>

          <div className="related-grid">
            {related.map((item) => (
              <Link
                className="guide-card"
                to={`/guides/${item.slug}`}
                key={item.slug}
              >
                <span>Guide</span>

                <h3>{item.title}</h3>

                <p>{item.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>Merchant Listing Preflight</span>
        <span>Diagnostic service. No Google approval guarantee.</span>
      </footer>
    </div>
  );
}

export default GuidePage;
