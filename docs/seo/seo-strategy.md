# Search Engine Optimization (SEO) & Structured Data Strategy

**Target Core Web Vitals**:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **CLS (Cumulative Layout Shift)**: < 0.1
- **INP (Interaction to Next Paint)**: < 200ms

---

## 1. Structured Data (JSON-LD) Schemas Implemented

| Route | Schema.org Type | Purpose |
| :--- | :--- | :--- |
| **Root Layout** | `EducationalOrganization` | Declares institution name, logo, accreditation, and hotline |
| `/courses/[slug]` | `Course` | Rich snippets for course name, duration, provider, and description |
| `/courses/[slug]` | `FAQPage` | Expands SERP real estate with direct Q&A accordions |
| `/centers/[slug]` | `LocalBusiness` / `EducationalOrganization` | Campus address, geocoordinates, opening hours, telephone |
| `/blog/[slug]` | `Article` | Headline, author, publisher, datePublished, OpenGraph image |

---

## 2. Technical SEO Infrastructure
- **Dynamic Sitemap**: Automatically generated at `/sitemap.xml` with priority and changeFrequency configured for all courses, centers, and articles.
- **Robots Policy**: Configured at `/robots.txt` disallowing `/admin/` and `/api/` while encouraging indexing of all public educational materials.
- **Canonical URLs**: Automatically set on every route via `constructMetadata` helper to prevent duplicate content penalties.
- **Social Graph**: Full OpenGraph and Twitter Card tags configured with fallback dimensions 1200x630px.
