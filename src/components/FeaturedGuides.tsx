import { Link } from "react-router-dom";
import { guidePages } from "../guideData";

function FeaturedGuides() {
  const featuredGuides = guidePages.slice(0, 6);

  return (
    <div className="featured-guides-card">
      <div className="section-heading order-heading">
        <div>
          <div className="eyebrow">Merchant Center guides</div>
          <h2>Issue guides for common Merchant Center problems</h2>
        </div>

        <p>
          Each guide targets a real issue name and explains symptoms, likely
          causes, quick checks and fix order before requesting another review.
        </p>
      </div>

      <div className="featured-guides-grid">
        {featuredGuides.map((guide) => (
          <Link
            className="featured-guide-item"
            to={`/guides/${guide.slug}`}
            key={guide.slug}
          >
            <span>{guide.issueName}</span>
            <h3>{guide.title}</h3>
            <p>{guide.metaDescription}</p>
            <strong>Read guide →</strong>
          </Link>
        ))}
      </div>

      <div className="featured-guides-footer">
        <Link className="btn secondary" to="/guides">
          View all guides
        </Link>

        <Link className="btn primary" to="/#order">
          Request diagnostic report
        </Link>
      </div>
    </div>
  );
}

export default FeaturedGuides;
