# IVS Academy — Stitch Asset Gap & Dependency Audit

**Document Status:** LOCKED CANONICAL AUDIT v1.0  
**Phase:** Phase 1 — Business Data Truth Lock & Stitch Design-to-Code Mapping  
**Date:** September 2026  
**Reference Directory:** `./design-handoff/stitch/assets/` & `./design-handoff/stitch/docs/asset-audit.md`  

---

## 1. Asset Policy & Anti-Substitution Rule

1. **Strict Prohibition on Prototype URL Leaks:** The Stitch prototype exports contain Google-hosted temporary assets (`lh3.googleusercontent.com`), CDN Tailwind (`cdn.tailwindcss.com`), and Google Fonts runtime tags. These must NEVER be introduced into production code or database records.
2. **No Unrelated Stock Imagery Substitutions:** Stock photos that misrepresent facilities, teachers, or students must not be casually substituted as genuine IVS assets. Real corporate and campus photography must be prioritized. Where placeholder imagery is required during development, it must be explicitly categorized as `PLACEHOLDER` and sourced from approved local storage (`/public/assets/...`).
3. **Vector Over Raster:** Logos and icons must use clean, scalable SVG format rather than low-resolution raster exports (`.png`).

---

## 2. Asset Classification Matrix

Every required asset across the 5 canonical screen families is categorized into one of four states:
- **`PRODUCTION ASSET AVAILABLE`**: Approved production-grade asset already exists in local source.
- **`STITCH PROTOTYPE ONLY`**: Hosted on Google prototype CDN (`lh3.googleusercontent.com`) or raster extract (`assets/brand/*.png`); must be migrated to local repo.
- **`MISSING`**: Required by design specification but not yet provided by business/brand owner.
- **`MUST BE REPLACED`**: Current asset represents obsolete branding (AURA), unverified claims (NEAS), or unauthorized persona photos.

---

### 2.1 Brand & Identity Assets

| Asset Name | Target Route / Usage | Current Format in Handoff | Status | Resolution / Action Required |
| :--- | :--- | :--- | :---: | :--- |
| **IVS Academy Master Logo (Horizontal)** | Header (Desktop/Mobile), Footer, Admin Topbar | `assets/brand/ivs-academy-brand-reference.png` (Raster PNG, 1.48MB) | **STITCH PROTOTYPE ONLY** | Design team must supply official vector SVG master (`/public/brand/logo.svg`). Do not deploy heavy raster PNG. |
| **IVS Academy Emblem / Icon** | Favicon, Mobile Navbar, Footer Icon, App Icon | `assets/brand/ivs-academy-icon-reference.png` (Raster PNG, 1.36MB) | **STITCH PROTOTYPE ONLY** | Export clean SVG favicon (`/public/favicon.ico`, `/public/icon.svg`). |
| **IVS JSC Corporate Logo** | Topbar Utility Bridge, Footer Holding Badge | None (Text only in code) | **MISSING** | Marketing to supply official IVS JSC holding vector logo. |
| **IVS Tech Ecosystem Badge** | Ecosystem Section, Footer | None (Text link) | **MISSING** | Ecosystem vector mark for `https://ivstech.store/`. |
| **IVS Learn / CenterCare Badges**| Ecosystem Section, Navigation | None (Text link) | **MISSING** | EdTech platform icons. |

---

### 2.2 Hero & Editorial Visual Assets

| Asset Name | Target Route / Usage | Current Source / Prototype | Status | Resolution / Action Required |
| :--- | :--- | :--- | :---: | :--- |
| **Homepage Hero Main Visual (Desktop)** | Homepage Hero Section | `lh3.googleusercontent.com/...` (Stitch code.html:22) | **STITCH PROTOTYPE ONLY** | Replace with approved high-res photograph of real interactive classroom / international teacher and Vietnamese learners. |
| **Homepage Hero Visual (Mobile)** | Homepage Mobile Hero | `lh3.googleusercontent.com/...` (Stitch mobile:17) | **STITCH PROTOTYPE ONLY** | Optimize aspect ratio (4:3 or 1:1) WebP format for mobile viewport (390px). |
| **Why Choose Us Pillar Illustrations** | Homepage 4 Pillars | Material Symbol icons in Stitch | **PRODUCTION ASSET AVAILABLE** | Implemented using clean `lucide-react` icons (ShieldCheck, Laptop, Users, Target). |
| **Active Learning Methodology Diagram** | Homepage Learning Method | CSS/HTML steps in Stitch | **PRODUCTION ASSET AVAILABLE** | Implemented via Tailwind responsive step layout with numbered indicator pills. |

---

### 2.3 Course & Curriculum Assets

| Asset Name | Target Route / Usage | Current Source / Prototype | Status | Resolution / Action Required |
| :--- | :--- | :--- | :---: | :--- |
| **SmartKids Mầm Non Banner** | Course Discovery, Course Detail | Unsplash placeholder in `seed.ts` | **MUST BE REPLACED** | Replace Unsplash photo with branded young-learner illustration or photo. |
| **SuperKids Tiểu Học Banner** | Course Discovery, Course Detail | Unsplash placeholder in `seed.ts` | **MUST BE REPLACED** | Replace with verified primary school student classroom asset. |
| **Young Leaders Thiếu Niên Banner**| Course Discovery, Course Detail | Unsplash placeholder in `seed.ts` | **MUST BE REPLACED** | Replace with academic teen learning asset. |
| **IELTS Master Banner** | Course Discovery, Course Detail | Unsplash placeholder in `seed.ts` | **MUST BE REPLACED** | High-end academic test preparation imagery. |
| **Tiếng Anh Giao Tiếp iTalk** | Course Discovery, Course Detail | Unsplash placeholder in `seed.ts` | **MUST BE REPLACED** | Adult / corporate communicative classroom setting. |
| **Corporate English Banner** | Course Discovery | Unsplash placeholder in `seed.ts` | **MUST BE REPLACED** | Professional workplace training photo. |
| **Course Category Icons (8 icons)**| MegaMenu, Course Cards | `Baby`, `GraduationCap`, `BookOpen`, etc. | **PRODUCTION ASSET AVAILABLE** | Handled natively by `lucide-react` icons. |

---

### 2.4 Faculty & Teacher Assets

| Asset Name | Target Route / Usage | Current Source / Prototype | Status | Resolution / Action Required |
| :--- | :--- | :--- | :---: | :--- |
| **David Harrison Portrait** | TeacherShowcase, Teacher Detail | Unsplash model photo in `seed.ts` | **MUST BE REPLACED** | Persona photo; replace with verified real faculty portrait upon academic HR handover. |
| **Nguyễn Thùy Linh Portrait** | TeacherShowcase, Teacher Detail | Unsplash model photo in `seed.ts` | **MUST BE REPLACED** | Replace with verified real faculty portrait. |
| **Michael O'Brien Portrait** | TeacherShowcase, Teacher Detail | Unsplash model photo in `seed.ts` | **MUST BE REPLACED** | Replace with verified real faculty portrait. |
| **Remaining Faculty (Mai, Williams, Trí)**| Teachers page | Unsplash model photos | **MUST BE REPLACED** | Replace with verified real faculty portraits. |
| **Teacher Qualification Badges** | TeacherCard, Course Detail | Text pills in code | **PRODUCTION ASSET AVAILABLE** | Formatted as semantic badge tokens (`TESOL`, `CELTA`, `MA Applied Linguistics`). |

---

### 2.5 Campus & Center Facility Assets

| Asset Name | Target Route / Usage | Current Source / Prototype | Status | Resolution / Action Required |
| :--- | :--- | :--- | :---: | :--- |
| **Flagship Campus Q1 Facility Gallery** | Centers Page, Center Detail | Unsplash office photos in `seed.ts`; mock in Stitch | **MUST BE REPLACED** | Operations team must provide actual campus photos (facade, reception, lab, classrooms). |
| **Tân Bình Campus Facility Gallery** | Centers Page, Center Detail | Unsplash office photos in `seed.ts` | **MUST BE REPLACED** | Real campus photography required. |
| **Cầu Giấy Campus Facility Gallery** | Centers Page, Center Detail | Unsplash university photos in `seed.ts` | **MUST BE REPLACED** | Real campus photography required. |
| **Đà Nẵng Campus Facility Gallery** | Centers Page, Center Detail | Unsplash building photos in `seed.ts` | **MUST BE REPLACED** | Real campus photography required. |
| **Interactive Map Pins / Mapbox/Google Tiles**| Centers Split View | Stitch static mock map / Google embed | **STITCH PROTOTYPE ONLY** | Implement responsive static map card preview with direct link to Google Maps search URL. |

---

### 2.6 Social Proof, Achievements & Badges

| Asset Name | Target Route / Usage | Current Source / Prototype | Status | Resolution / Action Required |
| :--- | :--- | :--- | :---: | :--- |
| **Student Achievement Avatars (10 items)**| StudentAchievements section | Unsplash stock photos in `seed.ts` | **MUST BE REPLACED** | Student affairs must supply real student portraits with written Decree 13 compliance consent. |
| **Parent Testimonial Avatars (8 items)** | Testimonials section | Unsplash stock photos in `seed.ts` | **MUST BE REPLACED** | Real consented parent portraits or neutral monogram initials. |
| **Cambridge English Preparation Badge** | TrustMetrics, Footer, Course Detail | CSS pill badge | **PRODUCTION ASSET AVAILABLE** | Neutral curriculum indicator badge without false "Official Exam Centre" claims. |
| **NEAS Quality Badge** | Stitch prototype footer & modal | `lh3.googleusercontent.com/...` | **MUST BE REPLACED** (DELETED) | **STRICT BAN:** Removed entirely from production code and forbidden from UI. |

---

## 3. Asset Migration & Optimization Pipeline (Pre-Launch)

Before commencing production UI visual rollout:
1. **Localize Brand Assets:** Convert `design-handoff/stitch/assets/brand/*.png` to optimized vector SVG and place under `public/images/brand/`.
2. **Next.js Image Domain Policy:** Configure `next.config.ts` `images.remotePatterns` strictly for authorized production CDNs and local domains. Remove untrusted prototype domains.
3. **Format Standardization:** Transcode all photography to `.webp` or `.avif` with responsive srcset sizes (`390px`, `768px`, `1200px`) and explicit aspect ratios to eliminate Cumulative Layout Shift (CLS = 0).
