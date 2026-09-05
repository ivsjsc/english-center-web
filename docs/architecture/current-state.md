# Phase 0: Discovery & Current State Architecture Audit

**Document Version**: 1.0.0  
**Project**: Vietnamese English Center Web & Lead Management Platform  
**Date**: September 2026  
**Auditor**: Lead Software Architect & Senior Full-Stack Engineer  

---

## 1. Repository Discovery & Baseline State

### 1.1 Operating Environment & Tooling
- **Operating System**: Windows (x64)
- **Node.js Runtime**: `v24.14.0` (Active LTS support)
- **Package Manager**: `npm 11.9.0` / `pnpm 10.28.1`
- **Initial Repository State**: Fresh workspace (`d:\IVS\Website\english-center-web`) initialized without legacy technical debt or deprecated packages.

### 1.2 Target Architecture Baseline
To fulfill production-grade performance, SEO, security, and lead conversion standards matching and exceeding reference benchmarks (e.g., VUS) with 100% original identity and code:
- **Framework**: Next.js 15 (App Router with React 19)
- **Language**: TypeScript 5+ in strict mode
- **Styling**: Tailwind CSS v3 with custom educational design system tokens (Academy Navy, Royal Sapphire, Amber Gold, Jade Emerald, Slate Neutrals)
- **Database & ORM**: PostgreSQL with Prisma ORM (configurable with SQLite for fast local zero-dependency development/testing or remote PostgreSQL via `DATABASE_URL`)
- **Authentication**: Secure session-based JWT with HTTP-only, `SameSite=Lax`, secure cookies, password hashing with `bcryptjs`, and server-side RBAC
- **Validation**: Zod schema validation across both client and server action/route handler boundaries
- **Architecture Pattern**: Modular Monolith organized by domain features (`courses`, `centers`, `leads`, `cms`, `auth`, `seo`, `analytics`)

---

## 2. Technical Risk Assessment & Mitigation Matrix

| Dimension | Risk Factor | Impact | Architectural Mitigation |
| :--- | :--- | :--- | :--- |
| **SEO & Discoverability** | Single-page client-side rendering missing course/center metadata | High | Next.js App Router Server Components for public routes. Dynamic metadata generation (`generateMetadata`), canonical tags, Open Graph, Twitter Cards, dynamic `sitemap.xml`, `robots.txt`, and rich Schema.org JSON-LD (`EducationalOrganization`, `Course`, `LocalBusiness`, `Article`, `FAQPage`). |
| **Hydration & Web Vitals** | Layout shift (CLS > 0.1) and high bundle size (LCP > 2.5s) | High | Zero-layout-shift web fonts (`next/font`), optimized `next/image` with explicit aspect ratios, server-rendered markup, and isolated interactive islands (`"use client"`). |
| **Spam & Lead Abuse** | Automated bots flooding registration forms, polluting CRM data | Critical | Defense-in-depth: hidden Honeypot field, in-memory sliding-window IP rate limiter (10 requests / 15 mins per IP), strict Vietnamese telephone format validation (`0[3\|5\|7\|8\|9]xxxxxxxx`), and optional Cloudflare Turnstile integration. |
| **PII & Legal Compliance** | Unauthorized exposure of student/parent names, phones, and minors' ages | Critical | Vietnam Personal Data Protection Decree 13/2023/ND-CP compliance: explicit consent checkbox, masked phone display for unauthorized roles, strict server-side RBAC, and immutable `LeadActivity` / `AuditLog` logging. |
| **Authentication & RBAC** | Privilege escalation or broken object-level authorization (BOLA) | Critical | Server-side authorization helper (`requirePermission`, `requireRole`) on every route handler and server action. Role hierarchy: `SUPER_ADMIN`, `ADMIN`, `CONTENT_EDITOR`, `CONSULTANT`, `CENTER_MANAGER`. Client UI visibility is never trusted for security. |
| **Database Scalability** | Unindexed queries causing slow lead lookups and timeouts under traffic spikes | Medium | Explicit composite and single-column indexes on frequently queried fields: `Lead(status, createdAt)`, `Course(slug, status)`, `Center(province, district, active)`, `BlogPost(slug, published)`. |
| **CMS Architecture** | Hardcoded UI strings preventing marketing/admissions team from updating content | Medium | Centralized Prisma models for Courses, Centers, Teachers, Achievements, Testimonials, Blogs, News, and Site Settings. Admin management portal with full CRUD. |
| **Media & Image Storage** | Heavy unoptimized images slowing mobile page loads | Medium | Next.js image optimization pipeline with WebP/AVIF transcoding, responsive `sizes` attribute, lazy-loading below the fold, and CDN-ready storage abstraction. |
| **Accessibility (a11y)** | Inaccessible contrast or non-keyboard operable filters | High | WCAG 2.1 AA compliance: contrast ratio >= 4.5:1, explicit focus rings (`focus-visible`), touch targets >= 44px on mobile, ARIA roles for modals/accordions/dialogs, and semantic HTML5 tags (`<main>`, `<nav>`, `<section>`, `<article>`, `<header>`, `<footer>`). |
| **Mobile UX** | Center finder with broken maps or awkward desktop tables on small screens | High | Mobile-first design (390px viewport baseline): list-first center discovery with quick-action telephone dial (`tel:`), address copy, and direct Google Maps navigation links. |

---

## 3. Directory Layout (Modular Monolith)

```
english-center-web/
├── docs/                      # Architectural & operational documentation
│   ├── architecture/
│   ├── database/
│   ├── security/
│   ├── deployment/
│   ├── admin/
│   ├── seo/
│   └── testing/
├── prisma/                    # Database schema, migrations, and seed scripts
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (public)/          # Public educational website
│   │   │   ├── page.tsx       # Homepage (14 modular sections)
│   │   │   ├── courses/       # Course discovery and detail
│   │   │   ├── teachers/      # Faculty profiles
│   │   │   ├── centers/       # Center finder & details
│   │   │   ├── student-achievements/
│   │   │   ├── methodology/
│   │   │   ├── about/
│   │   │   ├── blog/
│   │   │   ├── news/
│   │   │   ├── placement-test/
│   │   │   ├── contact/
│   │   │   └── (legal)/       # Privacy, terms, data protection
│   │   ├── admin/             # Authenticated Admin CRM & CMS
│   │   │   ├── login/
│   │   │   ├── page.tsx       # Dashboard analytics
│   │   │   ├── leads/         # Lead CRM & pipeline
│   │   │   ├── courses/       # Course CMS
│   │   │   ├── centers/       # Center CMS
│   │   │   ├── teachers/      # Teacher CMS
│   │   │   ├── blog/          # Blog CMS
│   │   │   ├── users/         # RBAC user management
│   │   │   └── settings/      # Site settings
│   │   ├── api/               # API route handlers (leads, auth, export)
│   │   ├── layout.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/            # UI components
│   │   ├── ui/                # Atomic primitives (Button, Input, Card, Modal, etc.)
│   │   ├── layout/            # Header, Footer, MobileNav, StickyLeadBar
│   │   ├── public/            # Landing page sections & course finder
│   │   └── admin/             # CRM tables, charts, status badges
│   ├── lib/                   # Core utilities & services
│   │   ├── prisma.ts          # Singleton Prisma Client
│   │   ├── auth.ts            # JWT session management
│   │   ├── rbac.ts            # Role & permission enforcement
│   │   ├── rate-limit.ts      # Sliding-window rate limiter
│   │   ├── recommendation.ts  # Course recommendation engine
│   │   ├── seo.ts             # Metadata & Schema.org JSON-LD builders
│   │   └── validation.ts      # Zod validation schemas
│   ├── types/                 # Domain types & interfaces
│   └── styles/
│       └── globals.css        # Tailwind and custom theme styles
├── tests/                     # Unit, integration, and E2E verification
├── .env.example
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```
