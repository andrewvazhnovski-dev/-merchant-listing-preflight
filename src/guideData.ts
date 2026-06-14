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
    seoSections: [
      {
        title: "What mismatched product availability means",
        paragraphs: [
          "The mismatched product availability issue means Google detected different stock signals between your product feed, landing page, Product / Offer structured data or visible product page content.",
          "For example, your feed may say the product is in stock, while the page says sold out. The opposite can also happen: the feed sends out of stock, but the product page still allows users to buy the item.",
        ],
      },
      {
        title: "Common causes of availability mismatch",
        paragraphs: [
          "Availability mismatches are usually caused by delayed inventory sync, variant-level stock logic, cached product pages or stale structured data. This is especially common on stores where inventory changes often.",
          "The safest way to diagnose the issue is to compare the affected-products CSV with the final product landing page and the Product / Offer JSON-LD on that same URL.",
        ],
        bullets: [
          "Feed availability updates slower than website inventory.",
          "Product page says sold out while the feed still sends in stock.",
          "Structured data still contains an old InStock or OutOfStock value.",
          "Variants have different stock states.",
          "The default selected variant is unavailable.",
          "Cached product pages show old stock information.",
          "Inventory changes by country, warehouse or delivery zone.",
        ],
      },
      {
        title: "Feed availability vs landing page availability",
        paragraphs: [
          "Start with the exact affected product URLs from Merchant Center. Do not only check the product in your admin panel. Google evaluates the final landing page that users and crawlers can access.",
          "The feed availability value should match what a normal visitor sees on the product page. If the page says sold out, unavailable, backorder or preorder, the feed should not send a conflicting in stock value.",
        ],
        bullets: [
          "Open several affected URLs from the CSV.",
          "Compare feed availability with visible product page availability.",
          "Check whether the add-to-cart button is enabled or disabled.",
          "Check whether the page shows sold out, backorder or preorder text.",
          "Check whether the product is available in the target country.",
        ],
      },
      {
        title: "Variant availability problems",
        paragraphs: [
          "Variant logic is one of the most common reasons for availability mismatch. A parent product may appear available, but the selected size, color or variant may be out of stock.",
          "If your feed submits variant-specific product IDs, each submitted variant should lead to a landing page experience that clearly matches that variant's stock status.",
        ],
        bullets: [
          "Check the submitted product ID.",
          "Check whether the feed item represents a parent product or variant.",
          "Select the exact size, color or option on the page.",
          "Confirm that the selected variant stock matches the feed.",
          "Avoid sending in stock for unavailable variants.",
        ],
      },
      {
        title: "Structured data availability mismatch",
        paragraphs: [
          "Google can read Product / Offer structured data from the product page. If the visible page says the product is sold out but JSON-LD still says InStock, this creates a conflicting signal.",
          "Inspect the Product / Offer markup and check the availability field. It should match the actual product page and the feed availability value.",
        ],
        bullets: [
          "Check Product JSON-LD.",
          "Check Offer availability.",
          "Look for InStock, OutOfStock, PreOrder or BackOrder values.",
          "Check whether multiple Offer blocks expose different availability.",
          "Check whether your theme or plugin outputs stale schema.",
        ],
      },
      {
        title: "Caching and inventory sync issues",
        paragraphs: [
          "Availability can change quickly, but cached pages and delayed feed updates can expose old stock information. This can make Merchant Center see one value while your store admin shows another.",
          "After fixing inventory logic, clear page cache, CDN cache and theme/plugin cache where relevant. Then wait for the feed and page data to become consistent before requesting review.",
        ],
        bullets: [
          "Check store inventory sync timing.",
          "Check feed generation schedule.",
          "Clear product page cache.",
          "Clear CDN cache if used.",
          "Check whether old availability remains in page source.",
          "Recheck affected URLs after cache is cleared.",
        ],
      },
      {
        title: "What to fix before requesting another review",
        paragraphs: [
          "Do not request another review until the feed, visible product page and structured data all show the same availability status. Repeated reviews without consistency can lead to another rejection cycle.",
          "Before review, test several affected URLs manually and save notes about what changed. This helps confirm that the issue is actually fixed rather than temporarily hidden.",
        ],
        bullets: [
          "Feed availability matches visible product page availability.",
          "Variant-level stock status is correct.",
          "Product / Offer JSON-LD availability is updated.",
          "Sold out, preorder or backorder text is clear.",
          "Add-to-cart behavior matches the submitted availability.",
          "Cache has been cleared.",
          "Several affected URLs were checked manually before review.",
        ],
      },
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
    seoSections: [
      {
        title: "What mismatched domains means",
        paragraphs: [
          "The mismatched domains issue means Google detected that the domain submitted in your product data does not match the final landing page domain, verified website domain, redirect destination or canonical URL.",
          "This can happen when a store changes domain, uses both www and non-www versions, redirects products through another domain, or keeps old product URLs inside the feed.",
        ],
      },
      {
        title: "Common causes of domain mismatch",
        paragraphs: [
          "Domain mismatch problems are usually caused by redirects, old feed URLs, inconsistent canonical tags or incorrect Merchant Center website verification.",
          "Google needs to see a consistent domain path from the product feed to the final landing page. If the feed sends one domain but the page resolves to another, the product can be flagged.",
        ],
        bullets: [
          "Feed links use an old domain.",
          "Product URLs redirect to a different domain.",
          "The store uses www in one place and non-www in another.",
          "Canonical URLs point to another domain.",
          "Merchant Center website verification uses the wrong domain.",
          "Regional domains or subdomains are mixed incorrectly.",
          "Product URLs pass through tracking or redirect domains.",
        ],
      },
      {
        title: "Feed URL vs final landing page URL",
        paragraphs: [
          "Start by opening several affected product URLs from the affected-products CSV. Check what domain appears in the feed and what domain appears after all redirects finish.",
          "The safest setup is to submit the final product URL in the feed, using the same verified domain that users and Google can access directly.",
        ],
        bullets: [
          "Copy the product URL from the feed or CSV.",
          "Open it in the browser.",
          "Check whether it redirects.",
          "Compare the original feed domain with the final browser domain.",
          "Make sure the final page still shows the same product.",
        ],
      },
      {
        title: "Redirect chain problems",
        paragraphs: [
          "Redirects are not always bad, but long or inconsistent redirect chains can create Merchant Center problems. A product URL may redirect from http to https, from non-www to www, from an old domain to a new domain, or from one country version to another.",
          "If the final redirected page is on a domain that is not verified or expected, Google can treat the product as mismatched.",
        ],
        bullets: [
          "Check http to https redirects.",
          "Check www to non-www redirects.",
          "Check old domain to new domain redirects.",
          "Check whether product URLs redirect to homepage or category pages.",
          "Check whether regional redirects change the domain.",
        ],
      },
      {
        title: "Canonical URL mismatch",
        paragraphs: [
          "Canonical tags tell search engines which URL is the preferred version of a page. If the product page loads on one domain but the canonical points to another domain, that can create a conflicting signal.",
          "For Merchant Center troubleshooting, check the canonical tag on affected product pages and confirm that it matches the final verified product URL strategy.",
        ],
        bullets: [
          "Open the affected product page source.",
          "Find the canonical URL.",
          "Compare canonical domain with final landing page domain.",
          "Check whether canonical points to an old domain.",
          "Check whether canonical points to a different product page.",
        ],
      },
      {
        title: "Verified website domain in Merchant Center",
        paragraphs: [
          "Merchant Center expects product landing pages to belong to the website domain verified and claimed in the account. If the verified domain does not match where products actually land, product URLs can be rejected or limited.",
          "This is especially important after migrations, rebrands, Shopify domain changes, WooCommerce migrations or switching from a temporary domain to a custom domain.",
        ],
        bullets: [
          "Check the verified website in Merchant Center.",
          "Compare it with the final product page domain.",
          "Make sure the correct domain is claimed.",
          "Remove old temporary domains from feed links.",
          "Use one consistent domain strategy across feed and website.",
        ],
      },
      {
        title: "Subdomain and regional domain issues",
        paragraphs: [
          "Stores sometimes use subdomains or regional domains for different countries, languages or storefronts. This can work, but the feed, target country, landing page and verification signals need to be aligned.",
          "If your feed targets one country but redirects users to another regional domain, Google may see a mismatch between submitted product data and landing page experience.",
        ],
        bullets: [
          "Check whether products use subdomains.",
          "Check whether target country changes the landing domain.",
          "Check hreflang and canonical setup.",
          "Check whether checkout uses a different domain.",
          "Check whether regional redirects are forced automatically.",
        ],
      },
      {
        title: "What to fix before requesting another review",
        paragraphs: [
          "Do not request another review until the feed URL, final landing page URL, canonical URL and verified Merchant Center website are consistent.",
          "After fixing domain issues, test several affected products manually. Make sure each product URL lands on the correct product page without unexpected domain changes.",
        ],
        bullets: [
          "Feed links use the final verified domain.",
          "Redirect chains are clean and predictable.",
          "Canonical URLs match the final product page domain.",
          "Merchant Center website verification matches the store domain.",
          "Regional redirects do not send users to the wrong domain.",
          "Affected product URLs were checked manually before review.",
        ],
      },
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
    seoSections: [
      {
        title: "What different product landing page means",
        paragraphs: [
          "The different product landing page issue means Google could not reliably match the product submitted in your feed with the product shown on the final landing page.",
          "This usually happens when the feed URL opens the wrong product, redirects to a category page, changes by country or device, or shows product content that does not match the submitted item.",
        ],
      },
      {
        title: "Common causes of different landing page issues",
        paragraphs: [
          "Most different product landing page problems are caused by incorrect feed links, redirect rules, variant handling, canonical conflicts or regional page changes.",
          "Google expects the landing page to clearly show the same product that was submitted in the feed. If the feed says one product but the URL displays another, the product can be disapproved or limited.",
        ],
        bullets: [
          "Feed URL points to a category page instead of a product page.",
          "Product URL redirects to another product.",
          "Variant URL redirects to the parent product.",
          "The landing page changes by country, language or device.",
          "Canonical URL points to another product.",
          "Product title, image or price does not match the feed item.",
          "Unavailable products redirect to collections or homepage.",
        ],
      },
      {
        title: "Feed URL vs final product page",
        paragraphs: [
          "Start by opening the exact affected product URLs from the affected-products CSV. Check whether each URL lands on the same product that was submitted in the feed.",
          "Do not only test the URL from your store admin. Test the public URL that Google receives in the feed and follow the final redirected destination.",
        ],
        bullets: [
          "Open the affected product URL from the CSV.",
          "Check the final URL after redirects.",
          "Confirm the product title matches the feed title.",
          "Confirm the product image matches the feed image.",
          "Confirm the visible price and availability match the submitted product.",
        ],
      },
      {
        title: "Redirects to category, homepage or another product",
        paragraphs: [
          "Redirecting unavailable or old products to a category page can create landing page mismatch problems. Google may expect a specific product, but the final page shows a collection, homepage or different item.",
          "If a product is unavailable, it is usually safer to keep a clear product page with accurate availability instead of silently redirecting to a different page.",
        ],
        bullets: [
          "Check whether old product URLs redirect.",
          "Avoid redirecting product URLs to homepage.",
          "Avoid redirecting product URLs to unrelated products.",
          "Avoid sending category URLs as product landing pages.",
          "Keep the landing page focused on the submitted product.",
        ],
      },
      {
        title: "Variant landing page problems",
        paragraphs: [
          "Variant handling can create mismatch issues when the feed submits a specific variant but the landing page opens a generic parent product or a different default variant.",
          "If the submitted product ID represents a size, color or material variant, the landing page should make that variant easy to identify and should not show a conflicting default option.",
        ],
        bullets: [
          "Check whether the feed submits parent products or variants.",
          "Confirm the correct variant opens on the landing page.",
          "Check size, color, material and product option selection.",
          "Make sure variant price and availability match the feed.",
          "Avoid defaulting to a different variant than the submitted item.",
        ],
      },
      {
        title: "Canonical and duplicate product conflicts",
        paragraphs: [
          "Canonical tags can create conflicting signals if the submitted product page points to another product, another variant or a different regional URL.",
          "For Merchant Center troubleshooting, the canonical URL should support the same final product experience rather than contradicting the feed landing page.",
        ],
        bullets: [
          "Inspect the canonical URL on affected product pages.",
          "Check whether canonical points to a different product.",
          "Check whether canonical points to a different variant.",
          "Check whether canonical points to another country version.",
          "Keep canonical logic consistent with the feed URL strategy.",
        ],
      },
      {
        title: "Regional and device-based landing page changes",
        paragraphs: [
          "Some stores show different landing page content depending on country, language, device or visitor location. This can cause Google to see a different product than the one you tested manually.",
          "If your feed targets a specific country, the final landing page should reliably show the correct product for that target country experience.",
        ],
        bullets: [
          "Check whether the page redirects by country.",
          "Check whether mobile and desktop show the same product.",
          "Check whether language selection changes the product URL.",
          "Check whether target country affects price, availability or product content.",
          "Check hreflang and regional URL setup.",
        ],
      },
      {
        title: "What to fix before requesting another review",
        paragraphs: [
          "Before requesting another review, verify that the feed URL, final URL, canonical URL and visible landing page content all point to the same product.",
          "Test several affected products manually and document what changed. This reduces the risk of another review rejection caused by hidden redirects or inconsistent product pages.",
        ],
        bullets: [
          "Feed URL opens the correct product page.",
          "Final URL does not redirect to a different product.",
          "Product title, image, price and availability match the feed.",
          "Canonical URL does not contradict the product page.",
          "Variant selection matches the submitted product ID.",
          "Regional redirects do not change the product unexpectedly.",
          "Several affected URLs were checked manually before review.",
        ],
      },
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
    seoSections: [
      {
        title: "What pending website check means",
        paragraphs: [
          "Pending website check means Merchant Center still needs to evaluate whether your website is ready for merchant listings, product visibility and product review.",
          "This does not always mean one product field is wrong. It can involve website verification, crawlability, trust pages, product page quality, checkout accessibility and account-level readiness.",
        ],
      },
      {
        title: "Common causes of pending website check",
        paragraphs: [
          "Pending website check often appears on new stores, recently migrated stores, newly connected Merchant Center accounts or stores with incomplete trust signals.",
          "Before pushing more products, it is safer to check the website itself: homepage, product pages, policy pages, checkout flow, robots.txt, noindex tags and structured data.",
        ],
        bullets: [
          "Website is new or recently connected to Merchant Center.",
          "Website verification or claim status is incomplete.",
          "Contact, shipping or return policy pages are missing.",
          "Product pages are thin, broken or not crawlable.",
          "Robots.txt or noindex tags block important pages.",
          "Checkout is inaccessible or unclear.",
          "Product / Offer structured data is missing or inconsistent.",
        ],
      },
      {
        title: "Website verification and claim status",
        paragraphs: [
          "Merchant Center needs to know that the website belongs to the account. If the website is not verified or claimed correctly, product review can remain blocked or delayed.",
          "Check that the domain verified in Merchant Center matches the real domain where product landing pages are hosted. This is especially important after domain changes, Shopify development domains or moving from a temporary URL to a custom domain.",
        ],
        bullets: [
          "Check verified website domain in Merchant Center.",
          "Check claimed website status.",
          "Confirm that product URLs use the same domain.",
          "Remove temporary or old domains from feed links.",
          "Make sure www and non-www versions are handled consistently.",
        ],
      },
      {
        title: "Trust pages Merchant Center expects",
        paragraphs: [
          "A store should provide clear information for customers before Google can confidently evaluate it. Weak or missing trust pages can slow down review readiness.",
          "The exact requirements depend on the store, country and business model, but the basic pages should be visible, crawlable and consistent with the checkout experience.",
        ],
        bullets: [
          "Contact page with clear contact information.",
          "Shipping policy.",
          "Return and refund policy.",
          "Privacy policy.",
          "Terms or store policies.",
          "Business identity or store information where relevant.",
          "Consistent footer links to important policy pages.",
        ],
      },
      {
        title: "Crawlability and technical access",
        paragraphs: [
          "Merchant Center needs to access the website and product pages. If important pages are blocked by robots.txt, noindex tags, redirects, password protection or JavaScript errors, the review can be delayed or fail.",
          "Check the public version of the website, not only the admin preview. The product page should be reachable by a normal visitor without login or special permissions.",
        ],
        bullets: [
          "Check robots.txt.",
          "Check noindex tags.",
          "Check product page HTTP status.",
          "Check redirect behavior.",
          "Check whether pages require login.",
          "Check whether product content loads for normal visitors.",
          "Check mobile and desktop accessibility.",
        ],
      },
      {
        title: "Product page readiness",
        paragraphs: [
          "Product pages should clearly show the submitted product, price, availability, image, description and purchase path. If product pages are incomplete or inconsistent, website check readiness can suffer.",
          "The goal is not only to have pages online, but to make them trustworthy, crawlable and consistent with product feed data.",
        ],
        bullets: [
          "Product title is visible.",
          "Product image is visible.",
          "Price is visible and matches the feed.",
          "Availability is visible and accurate.",
          "Add-to-cart or purchase path is clear.",
          "Product description is not empty.",
          "Product page does not redirect unexpectedly.",
        ],
      },
      {
        title: "Checkout and customer experience",
        paragraphs: [
          "A website can look complete but still fail readiness signals if checkout is broken, unclear or inconsistent. Google may evaluate whether users can reasonably complete a purchase.",
          "Before requesting another review, test the store like a real customer: open product page, add item to cart, go to checkout and verify that shipping, returns and contact information are accessible.",
        ],
        bullets: [
          "Add-to-cart works.",
          "Cart page works.",
          "Checkout opens without errors.",
          "Shipping information is clear before purchase.",
          "Return information is accessible.",
          "Contact information is easy to find.",
          "No broken policy links in footer or checkout.",
        ],
      },
      {
        title: "What to fix before waiting for review",
        paragraphs: [
          "Do not only wait passively if the website is incomplete. Fix the visible trust, crawlability and product page issues first, then allow Merchant Center time to re-evaluate the site.",
          "A clean website readiness pass reduces the chance that product-level issues will continue to appear after the website check is complete.",
        ],
        bullets: [
          "Website is verified and claimed.",
          "Important policy pages are published.",
          "Product pages are crawlable.",
          "Robots and noindex are not blocking important pages.",
          "Product pages show price and availability clearly.",
          "Checkout path works.",
          "Product / Offer structured data is present where possible.",
        ],
      },
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
