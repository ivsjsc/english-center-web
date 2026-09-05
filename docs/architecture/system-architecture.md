# System Architecture Documentation

**Platform**: AURA English Academy Web & Lead Management Platform  
**Architecture Pattern**: Modular Monolith  
**Tech Stack**: Next.js 15 (App Router, Server Components), React 19, TypeScript, Tailwind CSS, Prisma ORM, Jose JWT  

---

## 1. High-Level Architectural Diagram

```
[ Web Browsers & Mobile Clients (390px - 1440px) ]
                         │
                         ▼
             [ Next.js 15 App Router ]
      ┌──────────────────┴──────────────────┐
      ▼                                     ▼
 [ Public Educational Portal ]         [ Authenticated Admin & Lead CRM ]
  - Homepage (14 Sections)              - Dashboard Analytics
  - Course Discovery & Detail           - Lead CRM Pipeline
  - Teacher Profiles                    - Course, Center & Teacher CMS
  - Center Finder (Map + List)          - Blog CMS
  - Level Placement Booking             - Users & RBAC Management
  - Methodology & About                 - Site Configuration
      │                                     │
      └──────────────────┬──────────────────┘
                         ▼
               [ Security & Middle Tier ]
  - Sliding Window IP Rate Limiter (10 req / 15 min)
  - Vietnamese Phone & Data Sanitization (Zod)
  - Honeypot Anti-Bot Shield
  - HTTP-Only JWT Session & RBAC Enforcement
                         │
                         ▼
                 [ Domain Services ]
  - courseRecommendationService (Scoring & Matching)
  - LeadActivity & AuditLog Tracing
  - SEO JSON-LD Generators (Org, Course, LocalBusiness, Article)
                         │
                         ▼
              [ Persistence Layer: Prisma ORM ]
  - SQLite (Local zero-config dev / tests)
  - PostgreSQL (Production RDS / Supabase / Neon via DATABASE_URL)
```

---

## 2. Core Subsystems

### 2.1 Public Educational Website
- **Server Components by Default**: Public routes (`/`, `/courses`, `/teachers`, `/centers`, `/blog`, `/news`, `/methodology`, `/about`, `/privacy`, `/terms`) are server-rendered for instant First Contentful Paint (FCP) and optimal SEO indexing.
- **Client Islands (`"use client"`)**: Isolated to interactive elements like `CourseFinderSection`, `LeadForm`, `PlacementTestForm`, `CentersClientView`, and modal dialogs.

### 2.2 Course Recommendation Service (`src/lib/recommendation.ts`)
- Implements deterministic matching algorithm evaluating:
  - Age bracket match (+40)
  - Learning goal alignment (+45)
  - Current level CEFR compatibility (+20)
  - Format match (1-on-1 vs. group) (+35)
  - Featured priority weighting (+10)
- Exposes clean API endpoint `/api/recommendations` without hardcoding business rules inside UI components.

### 2.3 Lead CRM Pipeline Subsystem
- **State Machine**:
  `NEW` ➔ `CONTACTED` ➔ `APPOINTMENT` ➔ `PLACEMENT_TEST` ➔ `ENROLLED` (or `LOST`).
- **Attribution Capture**: Automatic persistence of UTM query parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`).
- **Audit Trails**: Every status transition and consultant assignment produces an immutable `LeadActivity` log.

### 2.4 Role-Based Access Control (RBAC)
- 5 Hierarchical Roles:
  - `SUPER_ADMIN`: Full root privileges (`*`).
  - `ADMIN`: Operational management across all entities.
  - `CONTENT_EDITOR`: Marketing & educational content management.
  - `CONSULTANT`: Lead viewing, communication logging, and status updating.
  - `CENTER_MANAGER`: Campus-level lead assignments and center profile management.
