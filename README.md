
JG Janitorial &amp; Cleaning Services — Website

Official marketing website for **JG Janitorial &amp; Cleaning Services**, a professional residential, commercial and rental cleaning company serving **Manitoulin Island, Ontario** (Little Current, Mindemoya, Espanola and surrounding communities).

- **Live site:** [https://jgjanitorial.netlify.app/](https://jgjanitorial.netlify.app/)
- **Privacy policy:** [https://jgjanitorial.netlify.app/privacy.html](https://jgjanitorial.netlify.app/privacy.html)
- **Contact:** Jgjanitorialcleaningservices@gmail.com · 437 226 9239

---

## Table of contents

1. [Overview](#overview)
2. [Tech stack](#tech-stack)
3. [File structure](#file-structure)
4. [Local development](#local-development)
5. [Deployment](#deployment)
6. [Forms &amp; third-party services](#forms--third-party-services)
7. [SEO &amp; metadata](#seo--metadata)
8. [Accessibility](#accessibility)
9. [Performance](#performance)
10. [Content editing guide](#content-editing-guide)
11. [Privacy &amp; legal](#privacy--legal)
12. [Known TODOs](#known-todos)
13. [Credits](#credits)
14. [License](#license)

---

## Overview

A fast, static, mobile-first site built with **vanilla HTML, CSS and JavaScript** — no build step, no framework, no dependencies to update. It is optimised for:

- **Local SEO** — schema.org markup, canonical URLs, sitemap, robots.txt, targeted meta keywords.
- **Mobile-first responsiveness** — fluid grids, `clamp()` typography, and a slide-in mobile menu.
- **Conversion** — prominent quote CTAs, floating WhatsApp/call buttons, and AJAX forms that never leave the page.
- **Accessibility** — skip links, visible focus rings, `aria-expanded` menu state, `prefers-reduced-motion` support.
- **Privacy compliance** — PIPEDA-aligned privacy policy covering third-party processors (Formspree, Netlify, Google Fonts).

---

## Tech stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Hand-written CSS (custom properties, no preprocessor) |
| Scripting | Vanilla ES5-compatible JavaScript (IIFE, no framework) |
| Fonts | Google Fonts — *Fraunces* (headings) + *Outfit* (body) |
| Forms | [Formspree](https://formspree.io) via `fetch()` AJAX |
| Hosting | [Netlify](https://netlify.com) (static, HTTPS, CDN) |
| Analytics | None (see [Privacy](#privacy--legal)) |

No package manager, no bundler, no node_modules. Clone and open `index.html`.

---

## File structure

```
/
├── index.html                 # Homepage (hero, about, services, quote, why, areas, testimonials, blog, careers)
├── privacy.html               # Privacy policy (PIPEDA-compliant)
├── style.css                  # All site styles (single stylesheet)
├── app.js                     # Menu, scroll reveal, stats counter, AJAX forms, active nav
├── robots.txt                 # Crawler rules + sitemap reference
├── sitemap.xml                # Sitemap (homepage + privacy)
├── README.md                  # This file
└── images/
    ├── JG Janitorial & Cleaning Services Logo-2 (1).png   # Brand logo
    ├── herobg.jpg                                        # Hero background
    ├── jglady.jpg                                        # About section photo
    ├── manitolin.jpg                                     # Service-area photo
    ├── bathroom.jpg / airbnb.jpg / moveout.jpg           # Blog thumbnails
    ├── 19934763-blinds-5928692_1920.jpg                  # Service card
    ├── pexels-*.jpg                                      # Service card photos
    └── ...
```

> ⚠️ **Filenames with spaces and parentheses** (e.g. the logo) work but are fragile — if you rename it, update every reference in `index.html`, `privacy.html` and the JSON-LD blocks. Consider renaming to `logo.png` when convenient.

---

## Local development

No build step. Two ways to preview:

### Option A — open the file directly

```bash
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

Most things work, but **AJAX form submission and Google Fonts may behave differently** under `file://`. Prefer Option B.

### Option B — run a tiny local server

Python (usually pre-installed):

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

Or with Node:

```bash
npx serve .
```

Or with PHP:

```bash
php -S localhost:8000
```

### Editing workflow

1. Edit `index.html`, `privacy.html`, `style.css` or `app.js`.
2. Refresh the browser (hard-refresh with `Ctrl/Cmd + Shift + R` if CSS or JS looks stale).
3. Commit and push — Netlify redeploys automatically.

---

## Deployment

The site is deployed on **Netlify** from the `main` branch of this repository.

| Setting | Value |
|---|---|
| Build command | *(none)* |
| Publish directory | `/` (repo root) |
| Branch | `main` |

Every push to `main` triggers an automatic deploy. Pull requests generate **Deploy Previews** at unique URLs, useful for testing changes before going live.

### To deploy a change

```bash
git add .
git commit -m "Describe your change"
git push origin main
```

Wait ~30 seconds, then hard-refresh the live site.

### Custom domain

To move off `*.netlify.app`, add a custom domain in **Netlify → Domain settings**, then update **all** of these to match:

- `<link rel="canonical">` in `index.html` and `privacy.html`
- `<meta property="og:url">` and `<meta property="og:image">`
- JSON-LD `"url"`, `"logo"` and `"image"` in `index.html`
- JSON-LD `"url"` in `privacy.html`
- `Sitemap:` line in `robots.txt`
- Every `<loc>` in `sitemap.xml`

---

## Forms & third-party services

Two forms on the site POST to **Formspree** via `fetch()` and show inline status messages (no page redirect):

| Form | Endpoint | Purpose |
|---|---|---|
| Quote request (`#quote`) | `https://formspree.io/f/mjyydroa` | Captures leads |
| Career application (`#careers`) | `https://formspree.io/f/xdeevzyl` | Captures job applicants |

### Configuration notes

- **Spam protection:** each form includes a hidden `_gotcha` honeypot field — do not remove it.
- **Submission subject:** set by the hidden `_subject` input; edit it to change the email subject line.
- **Where submissions go:** check the Formspree dashboard for the destination inbox (should be `Jgjanitorialcleaningservices@gmail.com`).
- **Formspree plan limits:** the free tier allows **50 submissions per month per form**. Upgrade if you exceed that.
- **Client-side validation:** `app.js` calls `form.checkValidity()` before sending, so required fields are enforced in-browser.

### Other third parties

| Service | Purpose | Where |
|---|---|---|
| Netlify | Hosting, HTTPS, CDN | Deployment |
| Google Fonts | Fraunces + Outfit | `<head>` preconnect + stylesheet |
| Formspree | Form endpoint + spam filtering | `index.html` form `action` |
| WhatsApp | Floating chat button (`wa.me/14372269239`) | `.floating-actions` |
| Instagram / Facebook | Footer social links | Footer (`YOUR_INSTAGRAM` / `YOUR_FACEBOOK` **placeholders**) |

> 🔴 **Action required:** replace `YOUR_INSTAGRAM` and `YOUR_FACEBOOK` in `index.html`, `privacy.html` and the footer with the real profile URLs.

---

## SEO &amp; metadata

The site is built for local search visibility. Each page includes:

- **Unique `<title>` and `<meta name="description">`** targeting *"cleaning services Manitoulin Island"*, *"janitorial Little Current"*, etc.
- **Canonical URLs** (`<link rel="canonical">`).
- **Open Graph and Twitter Card** tags with a share image.
- **JSON-LD structured data:**
  - Homepage: `HomeAndConstructionBusiness` + `CleaningService` with `areaServed`, `telephone`, `email`, `priceRange`, and an `OfferCatalog` of nine services.
  - Privacy page: `WebPage` linked to the business.
- **`robots.txt`** allowing all crawlers, blocking aggressive SEO scrapers and AI training bots, and pointing to the sitemap.
- **`sitemap.xml`** listing `/` and `/privacy.html`.

### After go-live checklist

- [ ] Submit `https://jgjanitorial.netlify.app/sitemap.xml` in **Google Search Console**.
- [ ] Submit the same sitemap in **Bing Webmaster Tools**.
- [ ] Create/claim a **Google Business Profile** for Manitoulin Island and link the site.
- [ ] Run the homepage through **PageSpeed Insights** and **Rich Results Test**.
- [ ] Confirm `robots.txt` and `sitemap.xml` are reachable at the live URLs.
- [ ] Validate `index.html` and `privacy.html` with the **W3C Markup Validator**.

---

## Accessibility

Implemented:

- Skip-to-content link (`.skip`) on every page.
- `aria-expanded` + `aria-controls` on the mobile menu button, synced by `app.js`.
- `aria-current="location"` set on the active nav link as you scroll.
- Visible `:focus-visible` outline (yellow, 3 px).
- `prefers-reduced-motion` disables all animations and transitions.
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`.
- Form labels are real `<label>` elements, all inputs associated.
- Decorative SVGs and dividers marked `aria-hidden="true"`.
- Contrast tested: navy `#100f43` on white, gold `#e8b93a` on navy, body text `#14213d` on white — all meet WCAG AA.

### Testing

- **Lighthouse** (Chrome DevTools) — aim for ≥ 95 in Accessibility.
- **axe DevTools** browser extension.
- **Keyboard test:** Tab through the entire site — every interactive element should be reachable and show focus.

---

## Performance

- **Zero JavaScript frameworks** — `app.js` is ~4 KB unminified.
- **Single stylesheet** — no `@import` chains.
- **Image optimisation needed** — the photos in `/images` are not compressed or converted to modern formats. Before launch:
  1. Convert each `.jpg` to **WebP** (or AVIF) at ~1600 px wide for hero, ~800 px for cards.
  2. Serve with `<picture>` fallback or rename + update `src`.
  3. Aim for **< 200 KB per image**.
- **Lazy loading** already applied to all below-the-fold images (`loading="lazy"`).
- **Hero image** uses `fetchpriority="high"` for LCP.
- **Preconnect** to `fonts.googleapis.com` and `fonts.gstatic.com`.
- **Fonts** — `display=swap` prevents render-blocking.

### Quick wins if PageSpeed is slow

1. Compress images (biggest lever — often 60–80% of weight).
2. Add `width`/`height` attributes to every `<img>` (most already have them).
3. Consider self-hosting the two fonts to remove the third-party request.

---

## Content editing guide

Common tasks, in plain language:

### Change the phone number

Search across **`index.html`**, **`privacy.html`**, and **`app.js`** for `43772269239` and `437 226 9239`, then update:

- Visible text (`437 226 9239`)
- `tel:` hrefs (`tel:+14372269239`)
- WhatsApp links (`wa.me/14372269239` and the pre-filled message)
- JSON-LD `"telephone"` values
- Privacy policy section 14

### Change the email address

Search for `Jgjanitorialcleaningservices@gmail.com` and replace everywhere, including:

- `mailto:` hrefs
- JSON-LD `"email"` values
- Privacy policy contact section
- Formspree destination (in the Formspree dashboard, not the code)

### Add a new service

1. Duplicate a `<article class="card rv">` block inside `<div class="cards">` in `index.html`.
2. Update the `src`, `alt`, `<h3>` and `<p>`.
3. Add a matching `<option>` inside the quote form `<select name="service">`.
4. Add an `"itemListElement"` entry to the JSON-LD `hasOfferCatalog` list.

### Update the privacy policy date

In `privacy.html`, change **both**:

- The visible `<time datetime="YYYY-MM-DD">Month D, YYYY</time>`
- The `<lastmod>` in `sitemap.xml` (if content changed materially)

### Add a blog post

1. Duplicate a `<article class="blog-card rv">` inside `.blog-grid-modern`.
2. Update the image, `blog-tag`, `<h3>`, summary `<p>`, and the `<details>` content.
3. (Optional) link the card to a full article page — currently blog posts are inline `<details>` expanders, no separate pages.

---

## Privacy &amp; legal

- **`privacy.html`** is a PIPEDA-aligned privacy policy covering:
  - Data categories collected (quote, career, communications, technical).
  - Lawful basis and consent.
  - Named third-party processors: Formspree, Netlify, Google Fonts.
  - International transfer disclosure (US-based processors).
  - Retention windows.
  - Access/correction/withdrawal rights.
  - Breach reporting per PIPEDA.
  - Complaint path to the **Office of the Privacy Commissioner of Canada** and the **Information and Privacy Commissioner of Ontario**.
- The policy includes a disclaimer that it is **not legal advice**. Have it reviewed by a privacy lawyer before relying on it in a dispute.

### If you add new third-party services

Update **section 6 (Sharing & processors)** and, if tracking is introduced, **section 5 (Cookies & tracking)** of `privacy.html` **and** add a cookie consent banner. Currently no first-party cookies or analytics are used, so no banner is required.

---

## Known TODOs

- [ ] Replace `YOUR_INSTAGRAM` and `YOUR_FACEBOOK` with real URLs (footer + contact panel).
- [ ] Compress and convert `/images` to WebP.
- [ ] Verify Formspree endpoints are active and inboxes are correct.
- [ ] Submit sitemap to Google Search Console and Bing Webmaster Tools.
- [ ] Claim Google Business Profile and link to site.
- [ ] Consider a custom domain and update all canonical/OG/JSON-LD URLs.
- [ ] Test full keyboard navigation and run Lighthouse on mobile.
- [ ] Add a `404.html` page (Netlify will serve it automatically).
- [ ] (Optional) Add a `netlify.toml` with security headers:
  ```toml
  [[headers]]
    for = "/*"
    [headers.values]
      X-Frame-Options = "SAMEORIGIN"
      X-Content-Type-Options = "nosniff"
      Referrer-Policy = "strict-origin-when-cross-origin"
      Permissions-Policy = "geolocation=(), microphone=(), camera=()"
  ```

---

## Credits

- **Design &amp; development:** custom build for JG Janitorial &amp; Cleaning Services.
- **Photography:** stock images from Pexels and Pixabay (see filenames for attribution slugs); brand photography provided by the client.
- **Fonts:** [Fraunces](https://fonts.google.com/specimen/Fraunces) and [Outfit](https://fonts.google.com/specimen/Outfit), both licensed under the SIL Open Font License.

---

## License

The **code** in this repository is the property of JG Janitorial &amp; Cleaning Services. All **images, logos and copy** are © JG Janitorial &amp; Cleaning Services unless otherwise noted. Do not reuse brand assets without written permission.

For questions or handover, contact **Jgjanitorialcleaningservices@gmail.com**.


