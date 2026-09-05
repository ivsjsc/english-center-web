# AURA English Academy — Web & Lead Management Platform

A production-ready website and lead-management CRM platform for a premier Vietnamese English & Foreign Language Center, inspired by industry benchmarks (such as VUS) with an entirely original brand identity, modern UX, high-conversion course discovery, interactive center locator, and full Lead CRM pipeline.

---

## 🌟 Key Features

### 🎓 Public Website
- **Modern Educational Design System**: Academy Navy (`#0B2545`), Royal Sapphire (`#134074`), Warm Amber Gold (`#EE964B`), and Jade Emerald.
- **14 Modular Homepage Sections**: HeroSection, TrustMetrics, CourseDiscovery, CourseFinderSection, WhyChooseUs, LearningMethod, TeacherShowcase, StudentAchievements, Testimonials, LearningEcosystem, CenterFinderSection, LatestBlogPosts, and ConsultationCTA.
- **Course Finder & Recommendation Engine**: Interactive multi-criteria assessment recommending courses based on age, level, goal, format, and location.
- **Interactive Center Finder**: Filter by province/district, map preview, copy address, direct phone dialing, and Google Maps direction.
- **Online Placement Test Booking**: 4-skill Cambridge/IELTS test booking with date/time slot preferences.
- **Regulatory Compliance**: Decree 13/2023/ND-CP Personal Data Protection consent, Privacy Policy, and Terms of Use.

### 💼 Lead CRM & Admissions Portal (`/admin`)
- **Executive Dashboard**: Daily leads, monthly leads, conversion rate, enrollment count, status distribution, and traffic sources (UTM attribution).
- **Lead Pipeline**: `NEW` ➔ `CONTACTED` ➔ `APPOINTMENT` ➔ `PLACEMENT_TEST` ➔ `ENROLLED` / `LOST`.
- **Audit & Activity History**: Every status transition, note, and consultant assignment is immutably recorded in `LeadActivity`.
- **Role-Based Access Control (RBAC)**: `SUPER_ADMIN`, `ADMIN`, `CONTENT_EDITOR`, `CONSULTANT`, and `CENTER_MANAGER`.
- **CMS Portals**: Complete management for Courses, Centers, Faculty profiles, Blog posts, Users, and Site settings.

### 🛡️ Security & Anti-Spam
- Hidden Honeypot bot traps.
- In-memory sliding-window IP rate limiter (10 requests / 15 mins).
- Vietnamese mobile phone regex validation (`03x`, `05x`, `07x`, `08x`, `09x`).
- HTTP-Only secure session cookies with `jose` HS256 JWT encryption.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database & Environment
```bash
# Push Prisma schema to SQLite (or PostgreSQL via DATABASE_URL)
npx prisma db push

# Seed realistic demo data (courses, centers, teachers, blog posts, leads)
npx tsx prisma/seed.ts
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public website.  
Access [http://localhost:3000/admin](http://localhost:3000/admin) to explore the Lead CRM portal.

**Demo Credentials**:
- Super Admin: `superadmin@aura.edu.vn` / `Admin@2026!`
- Consultant: `tuvan.minhchau@aura.edu.vn` / `Admin@2026!`

---

## 🧪 Verification & Build

```bash
# Run unit & integration tests
npm test

# Check TypeScript strict compliance
npm run typecheck

# Build production bundle
npm run build
```

---

## 📚 Documentation
- [System Architecture](docs/architecture/system-architecture.md)
- [Discovery & Current State](docs/architecture/current-state.md)
- [Data Model & Schema](docs/database/data-model.md)
- [Security & Privacy](docs/security/security-model.md)
- [Deployment Guide](docs/deployment/deployment.md)
- [Admin & CRM Guide](docs/admin/admin-guide.md)
- [SEO & Structured Data](docs/seo/seo-strategy.md)
- [Testing Strategy](docs/testing/testing.md)
