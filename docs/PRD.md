# Product Requirement Document (PRD) - ICON Estate & Property Managers

## 1. Executive Summary & Vision
**ICON Estate & Property Managers** is Ghana's premier real estate property manager and developer (`https://IconpropertiesGh.com/`). The platform serves clients across four core operational pillars:
1. **Property Management (Management of Properties):** Comprehensive end-to-end management for landlords and property owners, including tenant screening, rent collection, lease administration, routine maintenance, facility management, and financial reporting across Ghana.
2. **We Build (Property Development):** Full-cycle architectural design, civil engineering, construction, and estate development.
3. **We Sell (Brokerage & Sales):** Residential, commercial, and land sales representation across Ghana.
4. **We Rent (Leasing & Rentals):** Executive home rentals, luxury apartments, and commercial property leasing.

This document specifies functional requirements, service coverage, and production hardening standards covering **SEO Optimization, Security Hardening, Anti-Spam Protections, Privacy Compliance, and Deployment Readiness**.

---

## 2. Multi-Page Structure & Intent Mapping

| Page | File | Search Intent & Focus Keywords | Robots Directive |
|---|---|---|---|
| **Home** | `index.html` | Real estate Ghana, property managers Ghana, property management Ghana | `index, follow` |
| **We Build** | `we-build.html` | Property development Ghana, house construction, building projects Ghana | `index, follow` |
| **We Sell** | `we-sell.html` | Properties for sale Ghana, houses for sale Ghana, real estate for sale | `index, follow` |
| **We Rent** | `we-rent.html` | Properties for rent Ghana, houses for rent, apartments for rent Ghana | `index, follow` |
| **About Us / Services** | `about.html` | ICON Properties Ghana, property managers Ghana, property management services | `index, follow` |
| **Contact Us** | `contact.html` | Contact ICON Properties Ghana, property management consultation Ghana | `index, follow` |
| **Privacy Policy** | `privacy-policy.html` | ICON Properties Ghana privacy policy, data protection Ghana | `index, follow` |
| **Terms & Conditions** | `terms-and-conditions.html` | ICON Properties Ghana terms of service, real estate terms | `index, follow` |
| **Thank You** | `thank-you.html` | Inquiry confirmation | `noindex, follow` |
| **404 Error Page** | `404.html` | Page not found error landing | `noindex, follow` |

---

## 3. SEO & Structured Data Requirements
1. **Canonical Domain:** Standardized on `https://IconpropertiesGh.com/`. All pages explicitly state clean canonical URLs.
2. **Metadata Integrity:**
   - Unique `<title>` and `<meta name="description">` per page.
   - Complete Open Graph (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`).
   - Complete Twitter Card metadata (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).
3. **Structured Data (JSON-LD):**
   - Homepage: `Organization`, `WebSite`, `LocalBusiness`, `RealEstateAgent`.
   - Commercial pages (`we-build.html`, `we-sell.html`, `we-rent.html`): `Service`, `RealEstateAgent`, `BreadcrumbList`.
   - Contact & About: `LocalBusiness`, `ContactPage`, `AboutPage`.
4. **Sitemap & Robots:**
   - `/sitemap.xml` containing all 8 indexable pages with `<lastmod>` and `<changefreq>`.
   - `/robots.txt` referencing `/sitemap.xml` and disallowing non-public system paths.

---

## 4. Form Hardening & Anti-Spam Requirements
All public forms (`inquiry-form`, `ws-enquiry-form`, `wr-requirements-form`) MUST enforce multi-layered defense:
1. **Honeypot Shield:** Hidden field `name="website_hp"` detects automated bot submissions.
2. **Time-Based Spam Filter:** Submissions under 2.0 seconds from render are flagged as spam.
3. **Rate Limiting:** Maximum 3 form submissions per 10-minute window per client session.
4. **Duplicate Submission Lock:** Identical message content submitted within 60 seconds is blocked.
5. **Strict Whitelist Validation & Sanitization:**
   - Name: 2 - 100 characters, sanitize special scripts.
   - Email: RFC 5322 regex validation, max 120 characters.
   - Phone: Ghana (`+233`, `02x`, `05x`) and International numeric format (7-20 digits).
   - Message: 10 - 2000 characters.
   - Select Dropdowns: Whitelisted value validation.

---

## 5. Security, Privacy & Deployment Requirements
1. **Security Headers:** CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` configured across Apache (`.htaccess`), Netlify (`_headers`), and Vercel (`vercel.json`).
2. **Vulnerability Disclosure:** Standard `/.well-known/security.txt` file created.
3. **Web App Manifest:** `/site.webmanifest` linking favicons and brand theme colors (`#FD6F00` / `#1F3C07`).
4. **Custom 404 Page:** Branded `404.html` providing clean user navigation without leaking technical server information.
5. **Privacy Compliance:** GDPR/Data Protection notice on forms linking to `privacy-policy.html`.
