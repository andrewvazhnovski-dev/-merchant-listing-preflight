# Merchant Listing Diagnostic Report

## 1. Client information

**Store URL:**  
[CLIENT STORE URL]

**Issue type:**  
[ISSUE TYPE]

**Target country:**  
[TARGET COUNTRY]

**Target currency:**  
[CURRENCY]

**Report type:**  
Express Report / Store Audit / Pre-Appeal Checklist

**Date:**  
[DATE]

---

## 2. Executive summary

[Short summary of the problem in 3–5 sentences.]

Example:

The affected products appear to have a mismatch between the submitted product data and the landing page signals. The main issue family is likely related to price / availability / domain consistency. Before requesting another review, the store should make feed data, visible page content and structured data consistent.

---

## 3. Detected issue family

**Primary issue:**  
[PRIMARY ISSUE]

**Secondary risks:**

- [RISK 1]
- [RISK 2]
- [RISK 3]

**Priority:**  
High / Medium / Low

---

## 4. Files reviewed

- Affected-products CSV: Yes / No
- Product URLs reviewed: [NUMBER]
- Merchant Center screenshot reviewed: Yes / No
- Structured data reviewed: Yes / No
- Target country/currency checked: Yes / No

---

## 5. Affected product examples

| Product ID | Product title | Product URL | Issue   | Priority |
| ---------- | ------------- | ----------- | ------- | -------- |
| [ID]       | [TITLE]       | [URL]       | [ISSUE] | High     |
| [ID]       | [TITLE]       | [URL]       | [ISSUE] | Medium   |
| [ID]       | [TITLE]       | [URL]       | [ISSUE] | Low      |

---

## 6. Evidence found

### 6.1 Feed data

**Feed price:**  
[VALUE]

**Feed availability:**  
[VALUE]

**Feed product URL:**  
[URL]

Notes:

- [NOTE]
- [NOTE]

---

### 6.2 Landing page

**Visible product price:**  
[VALUE]

**Visible availability:**  
[VALUE]

**Final URL after redirects:**  
[URL]

**Canonical URL:**  
[URL]

Notes:

- [NOTE]
- [NOTE]

---

### 6.3 Structured data

**Product schema found:**  
Yes / No

**Offer object found:**  
Yes / No

**Schema price:**  
[VALUE]

**Schema currency:**  
[VALUE]

**Schema availability:**  
[VALUE]

**Shipping details found:**  
Yes / No

**Return policy found:**  
Yes / No

Notes:

- [NOTE]
- [NOTE]

---

## 7. Likely root cause

[Explain the most likely cause.]

Example:

The likely root cause is that the product feed and the landing page are not synchronized. The feed sends one price while the visible landing page and/or Product / Offer structured data shows another value. This can happen because of sale price logic, cache, delayed feed updates or regional pricing.

---

## 8. Priority fix order

### Priority 1 — Fix blocking mismatch

- [ACTION]
- [ACTION]
- [ACTION]

### Priority 2 — Clean structured data

- [ACTION]
- [ACTION]
- [ACTION]

### Priority 3 — Prepare for review

- [ACTION]
- [ACTION]
- [ACTION]

---

## 9. Review preparation checklist

Before requesting another review, confirm:

- [ ] Feed price matches visible page price
- [ ] Feed availability matches visible page availability
- [ ] Product URL opens the correct product page
- [ ] Final domain matches the verified Merchant Center domain
- [ ] Canonical URL points to the correct product URL
- [ ] Product / Offer structured data is updated
- [ ] Target country and currency are consistent
- [ ] Shipping and return pages are accessible
- [ ] Screenshots are saved as evidence

---

## 10. Prevention checklist

To reduce repeat issues:

- Sync feed after price or stock changes
- Avoid stale cached product pages
- Generate schema from the same product data source as the visible page
- Monitor affected-products CSV weekly
- Test sale price changes before campaigns
- Check redirects after domain or theme changes

---

## 11. Important disclaimer

This report is a diagnostic and preparation document. It does not guarantee Google approval, product approval, account reinstatement, policy reversal, ranking improvement, traffic increase or sales increase.

Final decisions about product visibility, policy enforcement and account status are made by Google.

Merchant Listing Preflight is not affiliated with Google.

---

## 12. Next steps

Recommended next action:

[SHORT NEXT STEP]

Examples:

- Update feed price and sale price fields.
- Fix Product / Offer structured data.
- Verify final product URLs and canonical tags.
- Wait for recrawl after changes.
- Request review only after consistency is confirmed.
