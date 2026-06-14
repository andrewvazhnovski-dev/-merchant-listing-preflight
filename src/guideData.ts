export type GuidePageData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  issueName: string;
  intro: string;
  symptoms: string[];
  causes: string[];
  quickChecks: string[];
  fixSteps: string[];
  seoSections?: {
    title: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
};

export const guidePages: GuidePageData[] = [
  {
    slug: "how-to-fix-mismatched-product-price",
    title: "How to fix Mismatched product price in Google Merchant Center",
    metaTitle: "Fix Mismatched Product Price — Google Merchant Center",
    metaDescription:
      "Checklist for fixing mismatched product price issues in Google Merchant Center: feed price, landing page price, sale price and Product / Offer structured data.",
    issueName: "Mismatched product price",
    intro:
      "This issue usually means Google sees one product price in your feed and a different price on the landing page, structured data, sale price logic or regional version of the page.",
    symptoms: [
      "Products are disapproved or limited in Merchant Center.",
      "The feed price does not match the visible page price.",
      "Sale price, discounts or regional pricing changes faster than the feed.",
      "Structured data exposes a different Offer price.",
    ],
    causes: [
      "Feed price and website price are updated at different times.",
      "The page shows a sale price but the feed sends the regular price.",
      "Currency, tax or shipping logic changes visible price by country.",
      "Product / Offer JSON-LD contains stale price data.",
    ],
    quickChecks: [
      "Open 3 affected product URLs from the CSV.",
      "Compare feed price with visible landing page price.",
      "Inspect Product / Offer structured data.",
      "Check whether sale price is active and consistent.",
      "Check whether the page redirects to another country or currency.",
    ],
    fixSteps: [
      "Update feed price, sale price and sale price effective date.",
      "Make sure the visible product page shows the same price.",
      "Update Product / Offer JSON-LD price and priceCurrency.",
      "Clear page cache if your store uses caching.",
      "Wait for Merchant Center recrawl, then request review only after consistency is verified.",
    ],
    seoSections: [
      {
        title: "What mismatched product price means",
        paragraphs: [
          "The mismatched product price issue means Google detected a difference between the price submitted in your product data and the price shown on the product landing page. The mismatch can also come from Product / Offer structured data, sale price logic, currency changes, tax display or regional page versions.",
          "This issue matters because price is one of the strongest product eligibility signals. If Google cannot confirm the same price across the feed, visible page and structured data, the product can become disapproved, limited or held back from merchant listings.",
        ],
      },
      {
        title: "Common causes of price mismatch",
        paragraphs: [
          "Most price mismatch cases are caused by timing, caching or inconsistent data sources. Your feed may update on one schedule, your store theme may show another value, and your JSON-LD markup may still contain an old price.",
          "The safest way to diagnose the problem is to compare the affected-products CSV with the final landing page and the Product / Offer structured data on the same URL.",
        ],
        bullets: [
          "Feed price updates slower than website price.",
          "Sale price is visible on the page but missing from the feed.",
          "Sale price effective date is wrong or expired.",
          "Structured data contains an outdated Offer price.",
          "Currency changes because of country, language or redirect logic.",
          "The product page is cached and still shows an old value.",
          "Variants expose different prices than the submitted product ID.",
        ],
      },
      {
        title: "Feed price vs landing page price",
        paragraphs: [
          "Start by opening several affected product URLs from the CSV. Compare the exact feed price with the price visible to a normal user on the landing page. Do not only check the homepage or category page. Google checks the final product URL.",
          "If the landing page shows a sale price, discount price or variant price, the feed needs to reflect the same product price logic. Otherwise Google may treat the product as inconsistent.",
        ],
        bullets: [
          "Check the exact affected product URL.",
          "Compare the feed price with the visible landing page price.",
          "Check whether the selected variant changes the price.",
          "Check whether the price changes after choosing size, color or quantity.",
          "Check whether tax is included or excluded differently by region.",
        ],
      },
      {
        title: "Sale price mistakes",
        paragraphs: [
          "Sale price issues are very common. A store may display a discount on the page while the feed still sends the regular price. The opposite can also happen: the feed sends a sale price, but the visible page no longer shows that discount.",
          "If your store uses sale_price and sale_price_effective_date, both fields need to match the real active promotion. Expired promotions and cached discount banners can trigger repeated price mismatch issues.",
        ],
        bullets: [
          "Confirm whether the sale is still active.",
          "Check sale_price in the feed.",
          "Check sale_price_effective_date.",
          "Check whether the page still displays the sale price.",
          "Clear cache after changing sale logic.",
        ],
      },
      {
        title: "Structured data price mismatch",
        paragraphs: [
          "Google can read Product / Offer structured data from the page. If the JSON-LD price is different from the visible price or feed price, this can create a conflicting signal.",
          "Inspect the page source or use the free checker on this site. Look for Product, Offer, price and priceCurrency. The values should match the product data and visible product page.",
        ],
        bullets: [
          "Check Product JSON-LD.",
          "Check Offer price.",
          "Check priceCurrency.",
          "Check whether the theme or plugin outputs old schema.",
          "Check whether multiple Product or Offer blocks expose different prices.",
        ],
      },
      {
        title: "Currency and regional pricing issues",
        paragraphs: [
          "Price mismatch can happen when the same product URL shows different currency or price depending on visitor location, language, device or redirect path. Google may crawl from a different region than the one you tested manually.",
          "If your target country is the United States and your feed currency is USD, the landing page should reliably show the matching USD price for that target experience. Regional redirects and automatic currency switchers should be checked carefully.",
        ],
        bullets: [
          "Check target country in Merchant Center.",
          "Check feed currency.",
          "Check whether the page redirects by country.",
          "Check whether currency switchers change the visible price.",
          "Check canonical and hreflang signals for regional pages.",
        ],
      },
      {
        title: "What to fix before requesting another review",
        paragraphs: [
          "Do not request another review immediately after changing one field. First verify consistency across feed data, landing page content and structured data. Then wait for cache and feed updates to settle.",
          "A good review preparation process reduces repeated rejection loops. Save screenshots, affected URLs and notes about what was changed before requesting review again.",
        ],
        bullets: [
          "Feed price matches visible product page price.",
          "Sale price and sale date are correct.",
          "Product / Offer JSON-LD matches the page.",
          "Currency is consistent for the target country.",
          "Product URL does not redirect to a different regional price.",
          "Cache has been cleared.",
          "Several affected URLs were checked manually before review.",
        ],
      },
    ],
  },
  {
    slug: "how-to-fix-mismatched-product-availability",
    title:
      "How to fix Mismatched product availability in Google Merchant Center",
    metaTitle: "Fix Mismatched Availability — Google Merchant Center",
    metaDescription:
      "Checklist for fixing mismatched product availability issues: stock status, feed availability, page content and structured data.",
    issueName: "Mismatched product availability",
    intro:
      "This issue appears when Google sees different availability signals between your product feed, landing page, stock text and structured data.",
    symptoms: [
      "Product is marked in stock in the feed but out of stock on the page.",
      "Product page says sold out while feed still sends in stock.",
      "Availability changes often but feed updates slowly.",
      "Structured data contains stale InStock or OutOfStock value.",
    ],
    causes: [
      "Inventory feed updates are delayed.",
      "Product variants have different stock states.",
      "The page text says unavailable but schema says InStock.",
      "Cached product pages show old stock status.",
    ],
    quickChecks: [
      "Compare feed availability with visible product page availability.",
      "Check variant-level availability.",
      "Inspect Product / Offer availability in JSON-LD.",
      "Check whether out-of-stock text is hidden behind variant selection.",
      "Check cache and CDN timing.",
    ],
    fixSteps: [
      "Sync product feed availability with store inventory.",
      "Update JSON-LD availability.",
      "Make stock text visible and consistent.",
      "Avoid sending in stock for unavailable variants.",
      "Resubmit affected products after consistency is verified.",
    ],
  },
  {
    slug: "how-to-fix-mismatched-domains",
    title: "How to fix Mismatched domains in Google Merchant Center",
    metaTitle: "Fix Mismatched Domains — Google Merchant Center",
    metaDescription:
      "Checklist for fixing mismatched domains in Google Merchant Center: product URLs, redirects, canonical URLs and verified website domain.",
    issueName: "Mismatched domains",
    intro:
      "This issue usually means the domain in your feed, final product URL, landing page, redirect chain or verified Merchant Center website does not line up correctly.",
    symptoms: [
      "Merchant Center flags product URLs as domain mismatch.",
      "Product links redirect to a different domain.",
      "Canonical URL points to another domain.",
      "Store uses several domains or subdomains.",
    ],
    causes: [
      "Feed links use an old domain.",
      "Product URLs redirect from www to non-www or another store domain.",
      "Canonical tags point to a different domain.",
      "Merchant Center website verification does not match the final landing page.",
    ],
    quickChecks: [
      "Open affected product URL from the CSV.",
      "Check final URL after redirects.",
      "Compare final domain with verified Merchant Center website.",
      "Inspect canonical tag.",
      "Check whether checkout or product pages use another domain.",
    ],
    fixSteps: [
      "Update feed links to the final verified domain.",
      "Fix redirect chains.",
      "Make canonical URLs consistent.",
      "Verify the correct website in Merchant Center.",
      "Resubmit affected products after domain consistency is fixed.",
    ],
  },
  {
    slug: "different-product-landing-page-checklist",
    title: "Different product landing page checklist",
    metaTitle: "Different Product Landing Page — Merchant Center Checklist",
    metaDescription:
      "Checklist for diagnosing different product landing page problems in Google Merchant Center.",
    issueName: "Different product landing page",
    intro:
      "This issue can happen when the product URL in the feed does not reliably show the same product to Google and users.",
    symptoms: [
      "Product URL opens a category page instead of a product page.",
      "The page redirects to another product.",
      "The product is not available in the target country.",
      "The page content changes based on location, language or device.",
    ],
    causes: [
      "Wrong product URL in feed.",
      "Variant URL redirects to parent product.",
      "Regional redirects change the product page.",
      "Canonical points to a different product.",
    ],
    quickChecks: [
      "Open affected URL in incognito.",
      "Check final redirected URL.",
      "Check canonical URL.",
      "Check whether the title/image/price match the feed item.",
      "Check mobile version of the product page.",
    ],
    fixSteps: [
      "Send direct product URLs in the feed.",
      "Avoid redirecting product URLs to categories.",
      "Fix canonical conflicts.",
      "Make regional pages consistent.",
      "Recheck affected URLs before review.",
    ],
  },
  {
    slug: "pending-website-check-readiness",
    title: "Pending website check readiness",
    metaTitle: "Pending Website Check — Merchant Center Readiness",
    metaDescription:
      "Website readiness checklist for Merchant Center pending website check issues.",
    issueName: "Pending website check",
    intro:
      "Pending website check means the store should be reviewed for basic trust, crawlability and merchant listing readiness before pushing more products.",
    symptoms: [
      "Merchant Center shows website check pending.",
      "Products are not fully eligible yet.",
      "Website verification or claim status is unclear.",
      "Trust pages are missing or weak.",
    ],
    causes: [
      "New store or newly connected Merchant Center account.",
      "Missing contact, shipping or return information.",
      "Robots, redirects or broken pages block crawling.",
      "Website verification is incomplete.",
    ],
    quickChecks: [
      "Check homepage, product page and checkout accessibility.",
      "Check Contact, Shipping, Returns and Privacy pages.",
      "Check robots.txt and noindex tags.",
      "Check website verification status.",
      "Check Product / Offer structured data.",
    ],
    fixSteps: [
      "Add clear business and contact information.",
      "Publish shipping and return policy pages.",
      "Fix crawl-blocking issues.",
      "Verify and claim the website.",
      "Wait for review after the site is consistent.",
    ],
  },
  {
    slug: "product-offer-structured-data-checklist",
    title: "Product / Offer structured data checklist",
    metaTitle: "Product Offer Structured Data Checklist",
    metaDescription:
      "Checklist for Product and Offer structured data: price, currency, availability, canonical, shipping and return policy readiness.",
    issueName: "Product / Offer structured data",
    intro:
      "Product and Offer structured data helps expose price, currency, availability and merchant details in a machine-readable way.",
    symptoms: [
      "Rich result testing does not detect Product data.",
      "Offer price or currency is missing.",
      "Availability is missing or stale.",
      "Shipping or return policy markup is missing.",
    ],
    causes: [
      "No Product JSON-LD on product pages.",
      "Offer object is incomplete.",
      "Price and availability are not updated dynamically.",
      "Theme or plugin outputs stale schema.",
    ],
    quickChecks: [
      "Check Product @type.",
      "Check Offer object.",
      "Check price and priceCurrency.",
      "Check availability.",
      "Check canonical URL.",
    ],
    fixSteps: [
      "Add Product JSON-LD to product pages.",
      "Add Offer with price, priceCurrency and availability.",
      "Keep schema synchronized with visible page data.",
      "Add shipping and return policy markup when ready.",
      "Test again after deployment.",
    ],
  },
];

export function getGuideBySlug(slug: string | undefined) {
  return guidePages.find((guide) => guide.slug === slug);
}
