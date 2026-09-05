# IVS Academy — Stitch Design-to-Code Implementation Map

**Document Status:** LOCKED CANONICAL ARCHITECTURE MAPPING v1.0  
**Phase:** Phase 1 — Business Data Truth Lock & Stitch Design-to-Code Mapping  
**Date:** September 2026  
**Reference Handoff:** `./design-handoff/stitch/`  
**Visual Priority:** Approved Canonical Screenshots (`screenshots/`) $\rightarrow$ Canonical `DESIGN.md` $\rightarrow$ Business Context $\rightarrow$ Normalized Stitch HTML Reference  

---

## 1. Architectural Guardrails & Principles

1. **No Blind Copy-Paste:** Stitch prototype HTML files (`stitch-export/**/code.html`) are visual and structural references only. They rely on prototype dependencies (CDN Tailwind, Google Fonts, `lh3.googleusercontent.com` URLs). Production code must strictly adhere to the Next.js 15 App Router, TypeScript strict mode, Prisma ORM, and local Tailwind CSS pipeline.
2. **Preserve Sound Domain Architecture:** Existing server/client boundaries, Zod schema validation, server-side RBAC, Next.js ISR/SSR caching, SEO structured data (`generateMetadata`), and Decree 13/2023/ND-CP lead PII protections must be fully preserved.
3. **Component Adaptability Over Duplication:** Rather than creating parallel duplicates (e.g., `ButtonNew`, `StitchCard`), adapt existing production components to match Stitch canonical design tokens.

---

## 2. Canonical Design Tokens & System Foundation

### 2.1 Canonical Color Palette
| Token Name | Hex Value | Semantic Role | Tailwind Class |
| :--- | :--- | :--- | :--- |
| `primary-deep` | `#00288E` | Academic foundation, deep header canvas | `bg-[#00288E]`, `text-[#00288E]` |
| `primary` | `#1E40AF` | Primary interactive brand color, hero headings | `bg-blue-800` / `bg-brand-primary` |
| `primary-vibrant` | `#2563EB` | Active buttons, focus rings, links, hover states | `bg-blue-600` / `bg-brand-vibrant` |
| `primary-light` | `#EFF6FF` | Badge backgrounds, highlighted surface pills | `bg-blue-50` |
| `primary-highlight`| `#DBEAFE` | Subtle borders, light interactive containers | `bg-blue-100`, `border-blue-200` |
| `accent-amber` | `#F59E0B` | Conversion triggers, primary CTA, badges | `bg-amber-500`, `text-amber-500` |
| `accent-amber-hover`| `#D97706`| Primary CTA hover state | `hover:bg-amber-600` |
| `growth` (emerald) | `#10B981` | Verification, progress, success states, hotline | `bg-emerald-500`, `text-emerald-500` |
| `growth-dark` | `#059669` | Success button hover, high-contrast text | `text-emerald-700`, `hover:bg-emerald-600` |
| `surface` | `#F8F9FF` | Primary page canvas, light background tone | `bg-[#F8F9FF]` |
| `surface-subtle` | `#F8FAFC` | Card backgrounds, alternating table rows | `bg-slate-50` |
| `white` | `#FFFFFF` | Dominant card surface, clean container fill | `bg-white` |
| `border` | `#E2E8F0` | Subtle structural dividers and card borders | `border-slate-200` |
| `text-heading` | `#0F172A` | Primary display & heading typography | `text-slate-900` |
| `text-default` | `#334155` | Body copy, readable paragraphs | `text-slate-700` |
| `text-muted` | `#64748B` | Metadata, helper labels, captions, dates | `text-slate-500` |
| `error` | `#BA1A1A` | Validation errors, destructive actions | `text-rose-700`, `bg-rose-50` |

### 2.2 Canonical Typography Hierarchy (Locked to `Be Vietnam Pro`)
| Style Role | Desktop Spec | Mobile Spec | Weight | Line Height | Tracking |
| :--- | :--- | :--- | :---: | :---: | :---: |
| **Display / Hero** | `56px` (`text-5xl lg:text-6xl`) | `36px` (`text-3xl sm:text-4xl`) | 800 (ExtraBold) | 1.15 | `-0.02em` |
| **Section H2** | `36px` (`text-3xl lg:text-4xl`) | `28px` (`text-2xl sm:text-3xl`) | 700 (Bold) | 1.25 | `-0.015em` |
| **H3 / Card Title** | `22px` (`text-xl sm:text-2xl`) | `20px` (`text-lg sm:text-xl`) | 600 (SemiBold) | 1.35 | normal |
| **Body Large** | `18px` (`text-lg`) | `16px` (`text-base`) | 400 (Regular) / 500 | 1.60 | normal |
| **Body Regular** | `16px` (`text-base`) | `15px-16px` | 400 (Regular) | 1.50 | normal |
| **Small / Caption** | `14px` (`text-sm`) | `13px-14px` | 400 / 500 | 1.50 | normal |
| **Badge / Label** | `12px-13px` (`text-xs`) | `12px` | 600 (SemiBold) | 1.20 | `0.02em` (caps) |

### 2.3 Structural Spacing, Radii & Layout Tokens
- **Base Rhythm:** 8px grid (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `80px`, `96px`).
- **Section Spacing:** Desktop `80px - 120px` (`py-20 lg:py-28`); Mobile `56px - 72px` (`py-14 sm:py-16`).
- **Border Radii:**
  - Buttons: `12px` (`rounded-xl`).
  - Cards: `16px - 20px` (`rounded-2xl` or `rounded-[20px]`).
  - Inputs / Selects: `12px` (`rounded-xl`), minimum height `48px` (mobile >= 48px, desktop 50px).
  - Pills / Badges: `9999px` (`rounded-full`).
- **Container Max-Width:** `1280px` (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
- **Breakpoints:** Mobile `390px`, Tablet `768px`, Landscape QA `1024px`, Desktop `1440px`.

---

## 3. Screen-by-Screen Design-to-Code Mapping

### Screen 1: Homepage (`/`) — Desktop & Mobile-first
- **Canonical Screenshot Authority:**
  - Desktop: `screenshots/public/homepage-desktop.png`
  - Mobile: `screenshots/public/homepage-mobile.png`
- **Application Route:** `/`
- **Existing Implementation File:** `src/app/(public)/page.tsx`
- **Component Strategy:**

| Sub-section | Existing Component | Action | Boundary | Data / CMS Dependency | Existing Visual Gap & Refactor Scope |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **Header / Nav** | `src/components/layout/Header.tsx` | **REFACTOR** | Client | `CourseCategory`, `SiteSetting` | Add slim utility ecosystem bar at top; implement MegaMenu for course discovery; refactor mobile hamburger into smooth drawer with ecosystem accordion. |
| **Hero Section** | `HeroSection.tsx` | **REFACTOR** | Server | `SiteSetting` (banner copy) | Align typography to Be Vietnam Pro 56px/36px; implement dual CTA (Amber "Tư Vấn Miễn Phí" + Outline "Khám Phá Khóa Học"); add floating student trust badge. |
| **Trust Metrics** | `TrustMetrics.tsx` | **REFACTOR** | Server | None (Static qualitative) | Eliminate any lingering fake count metrics; match Stitch 4-card horizontal bar with soft slate border and modern Lucide icons. |
| **Course Discovery** | `CourseDiscovery.tsx` | **REFACTOR** | Client | `CourseCategory`, `Course` | Add category pill filter bar; refactor CourseCard to match Stitch layout (age badge, CEFR outcome, credit/duration pill, direct CTA). |
| **Course Finder** | `CourseFinderSection.tsx` | **REUSE** | Client | None (Algorithm client-side) | Preserve existing multi-step recommendation logic; refresh container card, input radii (12px), and amber action button. |
| **Why Choose Us** | `WhyChooseUs.tsx` | **REFACTOR** | Server | None | Update 4-card pillar layout with clean icon containers and subtle hover elevation. |
| **Learning Method** | `LearningMethod.tsx` | **REFACTOR** | Server | None | Implement 4-stage Active Learning step progression with numbered pill badges and connecting visual line. |
| **Faculty Showcase** | `TeacherShowcase.tsx` | **REFACTOR** | Server | `Teacher`, `TeacherQualification` | Display 3 featured faculty cards; include qualification badges (TESOL, CELTA, Masters); link to `/teachers`. |
| **Achievements** | `StudentAchievements.tsx` | **REFACTOR** | Server | `StudentAchievement` | Render honor cards with score pill (`IELTS 8.5`, `Flyers 15/15`), student photo, and verified story. |
| **Testimonials** | `Testimonials.tsx` | **REFACTOR** | Server | `Testimonial` | Modernize quote bubble design with verified parent/learner role and 5-star rating display. |
| **Center Locator** | `CenterFinderSection.tsx` | **REFACTOR** | Client | `Center` | Region filter tabs (TP.HCM, Hà Nội, Đà Nẵng); clean center card with 1-tap dial and address copy. |
| **Blog & News** | `LatestBlogPosts.tsx` | **REFACTOR** | Server | `BlogPost` | 3-column article card with category badge, reading time, publication date, and hover zoom. |
| **Consultation CTA** | `ConsultationCTA.tsx` | **REFACTOR** | Client | `Lead` (API submit) | Reassurance copy under form; Decree 13 checkbox; anti-spam honeypot; 48px inputs. |
| **Footer** | `Footer.tsx` | **REFACTOR** | Server | `SiteSetting`, `Center` | 4-column structured footer with ecosystem links, legal links, dynamic center counts, and copyright. |
| **Sticky Action Bar**| `StickyLeadBar.tsx` | **REFACTOR** | Client | None | Mobile bottom bar with quick consultation trigger, Zalo link, and tel dial. |

---

### Screen 2: Course Detail (`/courses/[slug]`) — Desktop & Mobile
- **Canonical Screenshot Authority:**
  - Desktop: `screenshots/public/course-detail-desktop.png`
  - Mobile: `screenshots/public/course-detail-mobile.png`
- **Application Route:** `/courses/[slug]`
- **Existing Implementation File:** `src/app/(public)/courses/[slug]/page.tsx`
- **Component Strategy:**

| Sub-section | Existing Component | Action | Boundary | Data / CMS Dependency | Existing Visual Gap & Refactor Scope |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **Breadcrumb & Hero**| In `courses/[slug]/page.tsx` | **REFACTOR** | Server | `Course`, `CourseCategory` | Breadcrumb trail (`Trang chủ / Khóa học / [Tên]`); Course category pill; large H1 title; short summary; key metadata pills (Duration, Age, Schedule, CEFR Level). |
| **Sticky Sidebar (Desktop)**| In `courses/[slug]/page.tsx` | **REFACTOR** | Client | `Course`, `Lead` | Make sidebar sticky (`sticky top-24`); contains price range/tuition note, "Đăng Ký Tư Vấn" button triggering lead drawer/modal, syllabus download button, hotline dial. |
| **Sticky CTA Bar (Mobile)** | New component / In page | **NEW** | Client | None | Sticky bottom bar on mobile (390px) with Course Title + "Tư Vấn Ngay" CTA button respecting safe-area-inset. |
| **Learning Outcomes** | In `courses/[slug]/page.tsx` | **REFACTOR** | Server | `CourseOutcome` | 2-column checklist with emerald check icons and bold takeaway statements. |
| **Curriculum Roadmap** | `Accordion` / Custom list | **REFACTOR** | Client | `CourseCurriculum` | Accordion modules showing module name, duration, learning objectives, and test milestones. |
| **Assigned Faculty** | In `courses/[slug]/page.tsx` | **REFACTOR** | Server | `Teacher` | Faculty card with photo, credentials, and teaching philosophy. |
| **Course FAQs** | `Accordion` | **REFACTOR** | Client | `CourseFAQ` | Expandable frequently asked questions with Schema.org JSON-LD FAQPage. |
| **Embedded Consultation**| `LeadForm` | **REUSE** | Client | `Lead` (API submit) | Pre-fills current course ID in consultation intake. |

---

### Screen 3: Centers Locator (`/centers`) — Desktop & Mobile
- **Canonical Screenshot Authority:**
  - Desktop: `screenshots/public/centers-desktop.png`
  - Mobile: `screenshots/public/centers-mobile.png`
- **Application Route:** `/centers`
- **Existing Implementation File:** `src/app/(public)/centers/page.tsx`, `CentersClientView.tsx`
- **Component Strategy:**

| Sub-section | Existing Component | Action | Boundary | Data / CMS Dependency | Existing Visual Gap & Refactor Scope |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **Page Header** | In `centers/page.tsx` | **REFACTOR** | Server | None | Clean title, breadcrumbs, and subtitle explaining modern facility standards. |
| **Filter Controls** | `CentersClientView.tsx` | **REFACTOR** | Client | `Center` (provinces/districts) | Horizontal province filter tabs (Tất cả, TP.HCM, Hà Nội, Đà Nẵng) + search bar. |
| **Desktop Split View** | `CentersClientView.tsx` | **REFACTOR** | Client | `Center` | 2-pane desktop layout: left pane contains scrollable CenterCards list; right pane shows interactive map preview with active campus pin card. |
| **Mobile List-First Pattern**| `CentersClientView.tsx` | **REFACTOR** | Client | `Center` | On 390px mobile, default to list-first view. Provide floating/segmented toggle button ("Xem bản đồ" / "Xem danh sách"). Map is secondary. |
| **CenterCard** | In `CentersClientView.tsx` | **REFACTOR** | Client | `Center`, `CenterImage` | Thumbnail image, campus name, address with "Sao chép" button, phone with `tel:` link, opening hours, facility badges, and "Xem chi tiết" button. |
| **Facility Modal / Drawer**| In `CentersClientView.tsx` | **REFACTOR** | Client | `Center` | Modal on desktop, bottom sheet drawer on mobile showing facility gallery, classroom specs, and directions. |

---

### Screen 4: Blog Article (`/blog/[slug]`) — Desktop & Mobile
- **Canonical Screenshot Authority:**
  - Desktop: `screenshots/public/blog-article-desktop.png`
  - Mobile: `screenshots/public/blog-article-mobile.png`
- **Application Route:** `/blog/[slug]`
- **Existing Implementation File:** `src/app/(public)/blog/[slug]/page.tsx`
- **Component Strategy:**

| Sub-section | Existing Component | Action | Boundary | Data / CMS Dependency | Existing Visual Gap & Refactor Scope |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **Article Header** | In `blog/[slug]/page.tsx` | **REFACTOR** | Server | `BlogPost`, `BlogCategory` | Breadcrumbs, category pill, publication date, reading time calculation (e.g., "5 phút đọc"), and large editorial title. |
| **Table of Contents (Desktop)**| None (Missing) | **NEW** | Client | Parsed headings (`h2`, `h3`) | Sticky left sidebar TOC with active scroll-spy highlighting, author card, and social share buttons. |
| **Table of Contents (Mobile)** | None (Missing) | **NEW** | Client | Parsed headings | Collapsible accordion/drawer TOC at the beginning of the article on mobile viewports. |
| **Editorial Prose Area** | In `blog/[slug]/page.tsx` | **REFACTOR** | Server | `BlogPost.content` | Proportional typography (max-w-[760px]), high-contrast text (`text-slate-800`), styled callout quote blocks, and inline key takeaway boxes. |
| **Mid-Article CTA** | None (Missing) | **NEW** | Client | `Lead` | Banner encouraging course consultation or placement test booking relevant to article topic. |
| **Related Articles** | In `blog/[slug]/page.tsx` | **REFACTOR** | Server | `BlogPost` | 3-card grid of articles in same category. |

---

### Screen 5: Lead CRM (`/admin/leads`) — Desktop & Mobile
- **Canonical Screenshot Authority:**
  - Desktop: `screenshots/admin/lead-crm-desktop.png`
  - Mobile: `screenshots/admin/lead-crm-mobile.png`
- **Application Route:** `/admin/leads`
- **Existing Implementation File:** `src/app/admin/leads/page.tsx`, `LeadsManagerClient.tsx`
- **Component Strategy:**

| Sub-section | Existing Component | Action | Boundary | Data / CMS Dependency | Existing Visual Gap & Refactor Scope |
| :--- | :--- | :---: | :---: | :--- | :--- |
| **Metrics Summary Cards** | In `admin/page.tsx` (missing in leads) | **NEW** | Client | `Lead` aggregations | 4 metric cards at top of CRM: Total Leads, New, In Consultation, Enrolled, and Conversion Rate %. |
| **Filters & Search** | `LeadsManagerClient.tsx` | **REFACTOR** | Client | `User` (consultants), `Course` | Search input, status pills (`Tất cả`, `Mới`, `Đã liên hệ`, `Hẹn test`, `Đã nhập học`, `Thất bại`), and consultant filter. |
| **Desktop Table** | `LeadsManagerClient.tsx` | **REFACTOR** | Client | `Lead`, `LeadActivity`, `User` | Compact enterprise table: Checkbox, Name + Age, Masked Phone (role-guarded), Course, Source/UTM, Status Badge, Consultant, Date, Action. |
| **Mobile Lead Cards** | None (Currently squeezes table) | **NEW** | Client | `Lead` | On mobile (<768px), suppress table and render touch-friendly Lead Cards with 1-tap call, status badge, and note summary. |
| **Slide-over Drawer** | Centered `Modal` currently | **REFACTOR** | Client | `LeadActivity`, `Lead` | Convert centered modal to slide-over right drawer (desktop) / bottom drawer (mobile) with timeline stepper, quick note input, and assignment. |
| **Server-side RBAC** | `hasPermission(role, ...)` | **REUSE** | Server / API | `lib/rbac.ts` | Strictly preserve existing server-side authorization on all lead mutations and exports. |

---

## 4. Reusable Component Inventory & Canonical Mapping

| Component | File Location | Strategy | Responsibilities & Props |
| :--- | :--- | :---: | :--- |
| **Button** | `src/components/ui/button.tsx` | **REFACTOR** | Support `primary` (Amber), `secondary` (Vibrant Blue), `outline`, `ghost`, `destructive`. Radius `12px`. Touch target >= 44px. |
| **Badge / StatusBadge**| `src/components/ui/badge.tsx` | **REFACTOR** | Support `primary` (blue), `amber`, `emerald` (success), `slate` (neutral), `rose` (error). Pill radius `9999px`. |
| **Input / Textarea** | `src/components/ui/input.tsx` | **REFACTOR** | Min height `48px`. Radius `12px`. Border `#E2E8F0`, focus ring `primary-vibrant`. Visible labels & error states. |
| **Select** | `src/components/ui/select.tsx` | **REFACTOR** | Height `48px-50px`. Chevron icon, clean option styling, accessible keyboard navigation. |
| **Card** | `src/components/ui/card.tsx` | **REFACTOR** | Radius `16px-20px`. Border `border-slate-100`, shadow `shadow-sm hover:shadow-card`. Clean padding tokens. |
| **Accordion** | `src/components/ui/accordion.tsx` | **REFACTOR** | Smooth chevron rotation, accessible ARIA attributes, clean border separator. Used in FAQ & syllabus. |
| **Modal / Drawer** | `src/components/ui/modal.tsx` | **REFACTOR** | Accessible dialog supporting centered modal (desktop) and bottom-sheet/slide-over drawer (mobile & CRM). |
| **Header** | `src/components/layout/Header.tsx` | **REFACTOR** | Slim utility topbar + glass navbar + MegaMenu + mobile responsive drawer. |
| **Footer** | `src/components/layout/Footer.tsx` | **REFACTOR** | 4-column educational footer with ecosystem links, dynamic center counts, and regulatory compliance. |
| **CourseCard** | `src/components/public/CourseCard.tsx` | **NEW** | Reusable card for course discovery, course listing, and related courses. Age tag, CEFR badge, action CTA. |
| **TeacherCard** | `src/components/public/TeacherCard.tsx` | **NEW** | Reusable teacher profile card with qualifications, bio snippet, and course associations. |
| **CenterCard** | `src/components/public/CenterCard.tsx` | **NEW** | Reusable campus card with address, 1-tap call, copy address, and Google Maps direction link. |
| **BlogCard** | `src/components/public/BlogCard.tsx` | **NEW** | Reusable blog teaser card with featured image, reading time, date, and category badge. |
| **LeadForm** | `src/components/public/LeadForm.tsx` | **REFACTOR** | Reusable consultation form with Vietnamese phone regex, honeypot spam protection, and Decree 13 consent. |
| **FloatingContactCTA**| `src/components/layout/StickyLeadBar.tsx`| **REFACTOR** | Floating action bar on mobile with quick call, Zalo chat, and consultation trigger. |

---

## 5. Technical Reuse & Safety Plan

1. **Prisma & Data Layer:** Zero schema modifications required for Phase 1. All models (`Course`, `CourseCategory`, `Center`, `Teacher`, `BlogPost`, `Lead`, `SiteSetting`) directly fulfill the Stitch design dependencies.
2. **Server/Client Boundaries:**
   - Public pages (`page.tsx`, `courses/[slug]/page.tsx`, `blog/[slug]/page.tsx`, `centers/page.tsx`) remain async Server Components fetching data directly via Prisma.
   - Interactive islands (`CourseDiscovery`, `CentersClientView`, `LeadsManagerClient`, `Header` mobile menu, modals) maintain explicit `"use client"` boundaries.
3. **SEO & Structured Data:**
   - `constructMetadata`, `generateCourseSchema`, `generateArticleSchema`, `generateFAQSchema` in `src/lib/seo.ts` will continue to provide rich Schema.org JSON-LD.
4. **PII Protections:**
   - Lead telephone masking and server-side RBAC remain strictly enforced. Client UI hiding is treated solely as visual layout; authorization is validated on every server endpoint.
