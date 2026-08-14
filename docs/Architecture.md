# Technical Architecture Specification - ICON Estate & Property Managers

## 1. System Architecture Overview
The platform operates as a static, high-performance web application utilizing **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**.

Domain: `https://IconpropertiesGh.com/`

The architecture supports four core real-estate domains:
1. **Property Management (Management of Properties):** Landlord asset management, facility maintenance tracking, tenant portal routing, and rental yield optimization across Takoradi, Accra, and satellite locations in Ghana.
2. **We Build (Property Development):** Architectural projects, estate construction, civil engineering portfolio.
3. **We Sell (Brokerage & Sales):** Property sales, residential villas, land acquisitions.
4. **We Rent (Leasing & Management):** Long-term and short-term luxury rentals.

---

## 2. SEO & Metadata Engine
Each page includes a standardized, fully responsive `<head>` architecture:
- **Charset & Viewport:** `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **Canonical link:** `<link rel="canonical" href="https://IconpropertiesGh.com/[page]">`
- **Indexing directive:** `<meta name="robots" content="index, follow">` (or `noindex, follow` for utility pages)
- **Open Graph:** `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`, `og:locale`
- **Twitter Cards:** `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`
- **JSON-LD Structured Data:** Inline `<script type="application/ld+json">` schemas validating schema.org types (`Organization`, `LocalBusiness`, `RealEstateAgent`, `WebSite`, `BreadcrumbList`). Structured data explicitly lists Property Management services (`PropertyManagement`, `RealEstateAgent`).

---

## 3. Form Validation, Anti-Spam & Security Engine
In `js/script.js`, the `Global Form Engine` handles validation, anti-spam, and sanitization:
1. **Honeypot Verification:** `if (formData.get('website_hp')) return reject();`
2. **Timing Analysis:** `if (Date.now() - formLoadTime < 2000) return reject();`
3. **Session Rate Limiting:** Enforces 3 submissions per 10-minute window via `sessionStorage` timestamps.
4. **Input Sanitization:** `escapeHTML(input)` converts `<, >, ", ', &` to HTML entities, preventing DOM XSS.
5. **Form State Notifications:** Accessible alerts (`aria-live="polite"`, `role="alert"`) managed without layout shift.

---

## 4. Server Security & Hardening Architecture
To ensure security defense-in-depth regardless of hosting environment, multi-platform security headers are provided:
- **Apache (`.htaccess`):** HSTS, CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, HTTPS redirection rules, Gzip compression.
- **Netlify (`_headers`):** Security headers mapping for all routes `/*`.
- **Vercel (`vercel.json`):** Security header configurations for modern cloud deployment.
- **Security Disclosure (`/.well-known/security.txt`):** Standard security contact protocol.
- **Sitemap (`/sitemap.xml`) & Crawler Rules (`/robots.txt`):** Clean crawling architecture.

---

## 5. Directory & Asset Topology
```
/
├── index.html
├── about.html
├── contact.html
├── we-build.html
├── we-rent.html
├── we-sell.html
├── privacy-policy.html
├── terms-and-conditions.html
├── thank-you.html
├── 404.html (NEW - Branded Error Page)
├── sitemap.xml (NEW - XML Indexing Sitemap)
├── robots.txt (NEW - Crawler Rules)
├── site.webmanifest (NEW - Web App Metadata)
├── .htaccess (NEW - Apache Security Headers)
├── _headers (NEW - Netlify Security Headers)
├── vercel.json (NEW - Vercel Security Headers)
├── .well-known/
│   └── security.txt (NEW - Security Reporting)
├── css/
│   └── style.css
├── js/
│   └── script.js
├── docs/
│   ├── PRD.md
│   ├── Architecture.md
│   ├── Rules.md
│   ├── Phases.md
│   └── Design.md
└── images/
```
