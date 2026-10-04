# Merchant Listing Preflight

A browser-based React and TypeScript toolkit for triaging Google Merchant Center product-listing issues before manual review.

## What it does

### CSV diagnostics analyzer

- Reads Merchant Center-style CSV exports locally in the browser.
- Detects common columns such as issue, status, product ID, title, URL, price, and availability.
- Groups affected products by issue.
- Assigns High, Medium, or Low priority.
- Highlights missing fields and representative product URLs.
- Includes demo data for a quick walkthrough.

### Product structured-data checker

- Accepts raw JSON-LD or HTML containing `application/ld+json`.
- Locates `Product` and `Offer` objects.
- Checks price, currency, availability, canonical URL, hreflang, shipping details, and return-policy signals.
- Returns prioritized pass, warning, and failure results.
- Handles malformed or incomplete input without crashing the interface.

### Supporting pages

- Sample diagnostic report.
- Merchant Center issue guides and review checklist.
- Reusable FAQ, order-flow, SEO metadata, privacy, and terms components.
- Responsive routed interface with a custom not-found page.

## Privacy model

Uploaded CSV files and pasted markup are processed client-side. The current application has no backend and does not log in to, modify, or automatically access a Merchant Center account.

## Stack

- React 19
- TypeScript
- Vite
- React Router
- CSS / Sass
- ESLint

## Run locally

```bash
npm install
npm run dev
```

Production and quality checks:

```bash
npm run lint
npm run build
npm run preview
```

The current main branch passes the lint and production-build checks.

## Project structure

```text
src/
├── components/   Reusable UI, forms, FAQ, SEO, and workflow sections
├── pages/        Guides, reports, legal pages, and diagnostic resources
├── App.tsx       Routing plus CSV and structured-data analysis
└── guideData.ts  Structured guide content

docs/docs/
└── report-template.md
```

## Scope and limitations

This is a rule-based preflight and reporting tool. It does not guarantee account approval or reinstatement, replace an official Google decision, or perform a security audit.

## Repository

The commit history documents the implementation and iteration of the application. The main code sample is available in `src/App.tsx`, `src/components`, and `src/pages`.
