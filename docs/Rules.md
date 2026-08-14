# Engineering Rules & Master Guidelines - ICON Estate & Property Managers

## 1. Scope & Documentation Standards
1. **Multi-Page Consistency:** The website spans **Home** (`index.html`), **We Build** (`we-build.html`), **We Sell** (`we-sell.html`), **We Rent** (`we-rent.html`), **About Us** (`about.html`), **Contact Us** (`contact.html`), **Privacy Policy** (`privacy-policy.html`), **Terms and Conditions** (`terms-and-conditions.html`), **Thank You** (`thank-you.html`), and **404 Error Page** (`404.html`). All pages must maintain identical design tokens, header/footer navigation, form systems, and animation guidelines.
2. **Directory Rules:** Maintain all project documentation inside `/docs/` as `.md` files (`PRD.md`, `Architecture.md`, `Rules.md`, `Phases.md`, `Design.md`). Do not create non-markdown formats or `Memory.md` prior to code execution.
3. **Framework Policy:** Standard Vanilla JavaScript (ES6+), pure CSS3, and HTML5 semantic elements only. No external animation libraries (e.g., GSAP, Framer Motion) or bloated frameworks.
4. **Property Management Representation Rule:** The tagline *"Ghana's Number one Real estate property managers And Developers!"* MUST be consistently featured across footers, hero banners, and service sections. Property Management (tenant management, rent collection, facility maintenance, and financial reporting) MUST be documented and presented alongside We Build, We Sell, and We Rent.
5. **Scope Protection (Mandatory):** Do NOT redesign the website layout arbitrarily. Do NOT change visual design, colors, typography, or layout. Do NOT modify smooth physics animations. Focus on Property Management representation, Production SEO, Security, Anti-Spam, Privacy, Technical Hardening, and Deployment Readiness.

---

## 2. Brand Identity & Strict Color System
1. **Primary Orange (`#FD6F00`):** Reserved for primary CTA buttons, active state indicators, section badges, focus rings, step numbers, and orange card hover accents.
2. **Dark Green (`#1F3C07`):** Core headings, top navigation bar, secondary buttons, dark section backgrounds (Why ICON, CTA banners), and primary footer elements.
3. **Neutral Tone Standards:**
   - Background Light: `#F7F8F5`
   - Dark Text: `#171717`
   - Muted Gray: `#6B7280`
   - Border / Dividers: `#E5E7EB`
   - Card Background: `#FFFFFF`
4. **No Unauthorized Colors:** Do NOT introduce bright blues, purples, neon accents, or unapproved gradients.

---

## 3. Animation, CSS & UI Consistency Rules

### Rule 1: Animation Style
- Use subtle, premium, luxury real-estate animation style.
- Preferred animations: Fade In, Slide Up, Subtle Scale, Smooth color transitions, Image zoom on hover (`scale(1.03)`), Card elevation on hover (`translateY(-6px)`).
- Avoid excessive animations, bouncing, or distracting effects.

### Rule 2: Page Entrance Animation
- Sections reveal upon entering the viewport via `IntersectionObserver`.
- Preferred effect: `opacity: 0 -> 1`, `transform: translateY(40px) -> translateY(0)`. Applied via JS (`section-hidden` / `section-in-view`) to eliminate above-the-fold content flashing.

### Rule 3: Button Animations
- Hover interaction: `transform: translateY(-2px)`, shadow increase, smooth background color transition, arrow movement (`translateX(0) -> translateX(4px)`).
- Smooth return on mouse leave. No aggressive scaling or bouncing.

### Rule 4: Card & Box Hover Animation
- Hover interaction: `transform: translateY(-6px)`, subtle elevation shadow increase (`0 12px 30px rgba(0,0,0,0.09)`).
- Image zoom inside card container: `transform: scale(1.03)` with `overflow: hidden;`.

---

## 4. Production SEO, Security & Anti-Spam Rules

### Rule 8: Technical SEO Standards
1. **Canonical Domain:** Standardize on `https://IconpropertiesGh.com/` for all canonical URLs, sitemaps, and Open Graph metadata.
2. **Meta Integrity:** Every indexable page MUST have a unique `<title>`, meta description, canonical link, Open Graph metadata (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`), and Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`).
3. **Utility Page Indexing:** Utility pages such as `thank-you.html` and `404.html` MUST specify `<meta name="robots" content="noindex, follow">`.
4. **Structured Data:** Implement valid JSON-LD schemas (`LocalBusiness`, `RealEstateAgent`, `Organization`, `WebSite`, `BreadcrumbList`) across commercial pages. No fake reviews, ratings, or prices.

### Rule 9: Security & Defense-in-Depth
1. **Zero Secret Exposure:** Never place API keys, passwords, database credentials, or private tokens in HTML, client JavaScript, CSS, or Git repositories.
2. **XSS & DOM Sanitization:** All user inputs must be HTML-escaped (`escapeHTML`) before processing or reflecting in the DOM. Avoid `innerHTML` with raw input.
3. **Security Headers Configuration:** Deploy Content Security Policy (CSP), HSTS (`max-age=31536000`), `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy` via deployment configs (`.htaccess`, `_headers`, `vercel.json`).
4. **Vulnerability Reporting:** Provide `/.well-known/security.txt` specifying security contact procedures.

### Rule 10: Anti-Spam & Form Protection
1. **Honeypot Protection:** Include hidden honeypot fields (`name="website_hp"`) in all public inquiry forms. Submissions with filled honeypots are silently dropped.
2. **Submission Timing Validation:** Form completion faster than 2.0 seconds is flagged as automated bot activity.
3. **Client-Side Rate Limiting:** Enforce a maximum of 3 submissions per 10-minute window per form instance.
4. **Duplicate Submission Shield:** Block identical form submissions sent within 60 seconds.
5. **Strict Data Sanitization:** Validate Name (max 100 chars), Email (strict RFC 5322 regex, max 120 chars), Phone (Ghana +233 / International 7-20 digits), Message (min 10, max 2000 chars), and Select fields against allowed value whitelists.
