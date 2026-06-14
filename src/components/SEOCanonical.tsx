import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://merchant-listing-preflight.pages.dev";

function upsertLink(rel: string, href: string) {
  let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
}

function upsertMeta(property: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(
    `meta[property="${property}"]`,
  );

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

function SEOCanonical() {
  const location = useLocation();

  useEffect(() => {
    const cleanPath =
      location.pathname === "/" ? "/" : location.pathname.replace(/\/$/, "");
    const canonicalUrl = `${SITE_URL}${cleanPath}`;

    upsertLink("canonical", canonicalUrl);
    upsertMeta("og:url", canonicalUrl);
    upsertMeta("og:type", "website");
    upsertMeta("og:site_name", "Merchant Listing Preflight");
  }, [location.pathname]);

  return null;
}

export default SEOCanonical;
