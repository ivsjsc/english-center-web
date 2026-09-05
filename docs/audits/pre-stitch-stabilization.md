# Pre-Stitch Stabilization and Quality Audit Report

**Date:** 2026-09-05  
**Project:** IVS Academy Educational Website & Lead CRM Platform  
**Target Organization:** IVS Academy (English & International Education)  
**Status:** ALL CHECKS PASSED — Codebase Frozen for Stitch UI Handoff  

---

## 1. Executive Summary & Quality Gate Status

This audit report validates the complete stabilization pass performed on the working tree of `english-center-web` prior to the planned Google Stitch UI design handoff. All feature development was strictly frozen. Every TypeScript error, ESLint rule violation, branding inconsistency, and unverified partnership claim has been resolved at the root cause.

| Check | Command Executed | Exit Code | Result |
| :--- | :--- | :---: | :---: |
| **Database Schema Format** | `npx prisma format` | 0 | **PASS** |
| **Database Schema Validation** | `npx prisma validate` | 0 | **PASS** |
| **Prisma Client Generation** | `npx prisma generate` | 0 | **PASS** |
| **Automated Unit & RBAC Tests** | `npm test` (`vitest run`) | 0 | **PASS** (10/10 passed) |
| **ESLint Static Analysis** | `npm run lint` (`next lint`) | 0 | **PASS** (0 errors, 0 warnings) |
| **TypeScript Typecheck** | `npm run typecheck` (`tsc --noEmit`) | 0 | **PASS** (0 type errors) |
| **Production Build** | `npm run build` (`prisma generate && next build`) | 0 | **PASS** (37/37 routes) |

---

## 2. Current Architecture

### 2.1 Core Framework & Runtime
- **Framework:** Next.js 15.1.6 (App Router, Server Components + Client Boundary architecture)
- **Language:** TypeScript 5.7.3 (Strict mode, `noImplicitAny: true`, zero `@ts-ignore` / `@ts-expect-error`)
- **Runtime:** Node.js v24.14.0 (Windows pwsh shell)
- **Styling:** Tailwind CSS 3.4.17 with customized design token scales for IVS Academy brand colors (Navy `#0F294A`, Accent Amber `#F59E0B`, Slate neutrals).
- **Icons:** `lucide-react` 0.475.0

### 2.2 Database & ORM
- **Database (Development):** SQLite (`prisma/dev.db`) accessed via Prisma ORM 6.3.0.
- **Production Migration Strategy:** PostgreSQL via standard Prisma Migration CLI (`npx prisma migrate deploy`). `prisma db push` is restricted to local development prototyping only and will not be used in staging/production pipelines.
- **Client Boundary Integrity:** Validated that zero client components (`"use client"`) import `@prisma/client` or `@/lib/prisma`. All database mutations and queries are strictly confined to Server Components, Server Actions, or Route Handlers.

### 2.3 Authentication & Authorization (RBAC)
- **Session Mechanism:** Stateless encrypted JSON Web Tokens (`jose`) stored in `httpOnly`, `sameSite: "lax"`, `secure` (production) cookies (`ivs_session_token`).
- **Secrets Management:** In development, falls back to local fallback token; in production, `JWT_SECRET` is strictly verified with immediate server halt on absence.
- **RBAC Matrix:** 5 distinct system roles (`SUPER_ADMIN`, `ADMIN`, `CONTENT_EDITOR`, `CONSULTANT`, `CENTER_MANAGER`) verified server-side with granular permission checks (`lead.read`, `lead.update`, `lead.assign`, `course.manage`, `center.manage`, `content.manage`, `settings.manage`, `user.read`, `user.manage`).
- **Server Enforcement:** UI hiding is treated solely as a UX affordance; all mutation and retrieval endpoints enforce role permissions server-side.

---

## 3. Problems Found & Root Causes

### 3.1 Unresolved Imports & Type Inconsistencies
- **Problem:** `constructMetadata` import was accidentally stripped during an import purge in `src/app/(public)/teachers/[slug]/page.tsx`, causing TypeScript error TS2304.
- **Root Cause:** Batch import cleanup removed `constructMetadata` from `@/lib/seo`.
- **Fix:** Restored `constructMetadata` import from `@/lib/seo`.

### 3.2 ESLint Formatting & Syntax Errors
- **Problem:** Unescaped quotes in `blog/[slug]/page.tsx` (`"{post.excerpt}"`) and `LeadsManagerClient.tsx` (`"{act.note}"`) caused `react/no-unescaped-entities` errors.
- **Root Cause:** JSX literals containing double quotes without HTML entity encoding.
- **Fix:** Replaced with typographic entities `&ldquo;` and `&rdquo;`.

### 3.3 HTML Anchor Navigation in Next.js Client Component
- **Problem:** `admin/login/page.tsx` utilized standard `<a href="/">` for navigation.
- **Root Cause:** Inadvertent use of HTML anchor tag instead of Next.js client-side Link component.
- **Fix:** Converted to `<Link href="/">` from `next/link`.

### 3.4 Dead Code & Unused Variable Warnings
- **Problem:** Unused imports and variables across admin and public pages:
  - `LeadsManagerClient.tsx`: `courses` state, `Filter`, `Clock`, `AlertCircle`, `CheckCircle2`, `Calendar`, `X`, `Select`, `Badge`, `userRole`.
  - `admin/page.tsx`: redundant database queries `prisma.course.findMany()` and `prisma.center.findMany()`, unused `Award`, `Building2`, `Clock`, `Badge`.
  - `admin/blog`, `admin/centers`, `admin/courses`, `admin/settings`, `admin/teachers`, `admin/users`: orphaned icon imports.
  - `about`, `courses`, `teachers`, `centers`, `news`, `personal-data-policy`, `privacy`, `terms`: orphaned icons and buttons.
- **Root Cause:** Rapid prototyping iterations during previous feature development.
- **Fix:** Systematically removed all dead code, eliminated unused queries, and utilized `userRole` in `LeadsManagerClient` to enforce UI-level assignment permissions (`canAssign`).

---

## 4. Branding & Data Quality Audit

### 4.1 Transition to IVS Academy
- **Target Brand:** **IVS Academy** (Hệ thống Anh ngữ & Đào tạo Quốc tế IVS).
- **Audited Surfaces:** Page titles, OpenGraph metadata, structured JSON-LD schemas, header navigation, footer, hero banners, CTA blocks, consultation forms, admin portal, demo accounts, seed data, and system settings.
- **Result:** Global search for legacy placeholder brand strings returned **0 occurrences** across all TS, TSX, JS, and JSON files.

### 4.2 Elimination of Fabricated Business & Accreditation Claims
Per the project directives, all unverified claims have been eliminated or replaced with neutral, industry-standard curriculum references:
1. **NEAS Accreditation:** Removed all claims of "đạt chuẩn kiểm định NEAS Australia" or "chứng nhận NEAS 5 năm liên tiếp". Replaced with "tiêu chuẩn chất lượng cao" and "Khung Tham Chiếu Năng Lực Ngôn Ngữ Chung Châu Âu (CEFR)".
2. **Fabricated Exam Partnerships:** Removed claims stating the academy is a "Đối tác khảo thí kim cương của British Council / IDP" or "Hội đồng khảo thí Cambridge chính thức". Replaced with neutral statements clarifying that courses follow Cambridge & IELTS exam formats and assist students with registration.
3. **Fabricated Headcounts & Metrics:** Removed unverified figures (such as "5.200+ học viên đạt xuất sắc") and replaced with neutral qualitative achievements ("Vinh Danh Học Viên Tiêu Biểu").
4. **Email & Domain Consistency:** Standardized all official addresses to `@ivs.edu.vn` (e.g. `superadmin@ivs.edu.vn`, `tuvan.minhchau@ivs.edu.vn`, `contact@ivs.edu.vn`, `privacy@ivs.edu.vn`).

---

## 5. Security & Lead PII Handling Audit

### 5.1 Lead PII Protection
1. **Phone Validation:** Anchored Vietnamese mobile phone regex (`^0[35789][0-9]{8}$`) enforced across all entry points (Consultation CTA, Course Finder, Course Detail modal, Placement Test, and Contact form).
2. **Consent Recording:** Storage of user consent checkbox under Decree 13/2023/ND-CP ("Quy định về bảo vệ dữ liệu cá nhân") linked to `/personal-data-policy`.
3. **No PII in Server Logs:** Verified that `console.error` and audit logging in API handlers do not output unmasked lead telephone numbers or email addresses in plain text.
4. **Anti-Spam & Abuse Defense:**
   - Client honeypot fields (`honeypot`) return a silent `200 OK` without database persistence when filled by automated bots.
   - Server-side IP rate limiting (10 requests per 15-minute sliding window) protects `/api/leads`, `/api/placement-test`, and `/api/contact`.

### 5.2 Admin API Authorization
1. **Endpoint Protection:** Audited `GET` and `PATCH` in `/api/admin/leads`. Verified that non-authenticated requests receive `403 Forbidden`.
2. **Granular RBAC:** Added server-side validation ensuring only users with `lead.assign` permission can alter `assignedUserId`.

---

## 6. Files Changed During Stabilization

1. `prisma/seed.ts` — Brand overhaul to IVS Academy, `@ivs.edu.vn` emails, CEFR article, neutral FAQs.
2. `src/app/admin/leads/LeadsManagerClient.tsx` — Typographic quote escaping, unused import purge, role gating.
3. `src/app/admin/login/page.tsx` — Next.js `<Link>` fix, IVS Academy portal branding, demo credentials update.
4. `src/app/admin/layout.tsx` — Brand update to IVS Portal, unused import purge.
5. `src/app/admin/page.tsx` — Removed unused Prisma queries and icon imports.
6. `src/app/admin/blog/page.tsx` — Cleaned unused imports, preserved RBAC permission check.
7. `src/app/admin/centers/page.tsx` — Cleaned unused imports.
8. `src/app/admin/courses/page.tsx` — Cleaned unused imports.
9. `src/app/admin/settings/page.tsx` — Cleaned unused imports.
10. `src/app/admin/teachers/page.tsx` — Cleaned unused imports.
11. `src/app/admin/users/page.tsx` — Cleaned unused imports.
12. `src/app/api/admin/leads/route.ts` — Added server-side `lead.assign` authorization enforcement.
13. `src/app/api/contact/route.ts` — Updated response branding to IVS Academy.
14. `src/app/(public)/about/page.tsx` — Replaced NEAS/partner claims with CEFR academic standards, cleaned imports.
15. `src/app/(public)/blog/page.tsx` — Updated branding to IVS Academy, cleaned imports.
16. `src/app/(public)/blog/[slug]/page.tsx` — Fixed unescaped quotes in excerpt block, cleaned imports.
17. `src/app/(public)/centers/page.tsx` — Removed NEAS claims, updated branding to IVS Academy.
18. `src/app/(public)/centers/CentersClientView.tsx` — Cleaned unused imports.
19. `src/app/(public)/centers/[slug]/page.tsx` — Removed NEAS badges, cleaned imports.
20. `src/app/(public)/contact/page.tsx` — Updated branding to IVS Academy, `@ivs.edu.vn`, cleaned imports.
21. `src/app/(public)/contact/ContactForm.tsx` — Updated confirmation message to IVS Academy.
22. `src/app/(public)/courses/page.tsx` — Replaced NEAS claims with CEFR standards, cleaned imports.
23. `src/app/(public)/courses/[slug]/page.tsx` — Cleaned unused imports and unused map callback parameters.
24. `src/app/(public)/methodology/page.tsx` — Removed NEAS claims, updated branding to IVS Academy and IVS Learning.
25. `src/app/(public)/news/page.tsx` — Updated branding to IVS Academy, cleaned imports.
26. `src/app/(public)/personal-data-policy/page.tsx` — Updated branding and DPO email to `privacy@ivs.edu.vn`.
27. `src/app/(public)/placement-test/page.tsx` — Updated branding to IVS Academy, cleaned imports.
28. `src/app/(public)/placement-test/PlacementTestForm.tsx` — Updated consent text and confirmation to IVS Academy.
29. `src/app/(public)/privacy/page.tsx` — Updated branding and DPO email to `privacy@ivs.edu.vn`.
30. `src/app/(public)/student-achievements/page.tsx` — Replaced unverified student counts with neutral badges.
31. `src/app/(public)/teachers/page.tsx` — Updated branding to IVS Academy, cleaned imports.
32. `src/app/(public)/teachers/[slug]/page.tsx` — Restored `constructMetadata`, removed NEAS badge.
33. `src/app/(public)/terms/page.tsx` — Updated branding to IVS Academy.
34. `src/app/robots.ts` — Updated base domain to `https://ivs.edu.vn`.
35. `src/app/sitemap.ts` — Updated base domain to `https://ivs.edu.vn`.

---

## 7. Verification Logs & Execution History

### 7.1 Database Verification
```bash
> npx prisma format
Formatted prisma\schema.prisma in 23ms

> npx prisma validate
The schema at prisma\schema.prisma is valid

> npx prisma generate
Generated Prisma Client (v6.19.3) to .\node_modules\@prisma\client in 118ms
```
**Status:** PASS

### 7.2 Unit & Authorization Tests
```bash
> npm test
 ✓ tests/rate-limit.test.ts (1 test) 3ms
 ✓ tests/rbac.test.ts (4 tests) 3ms
 ✓ tests/validation.test.ts (5 tests) 5ms

Test Files  3 passed (3)
     Tests  10 passed (10)
  Duration  502ms
```
**Status:** PASS

### 7.3 ESLint Analysis
```bash
> npm run lint
✔ No ESLint warnings or errors
```
**Status:** PASS (0 warnings, 0 errors)

### 7.4 TypeScript Strict Compilation
```bash
> npm run typecheck
tsc --noEmit
# Exited with code 0, no diagnostic messages
```
**Status:** PASS (0 errors)

### 7.5 Production Build
```bash
> npm run build
✔ Generated Prisma Client (v6.19.3)
Creating an optimized production build ...
✔ Compiled successfully in 3.9s
Linting and checking validity of types ...
Generating static pages (37/37) ...
Finalizing page optimization ...
# Exited with code 0
```
**Status:** PASS

---

## 8. Definition of Done Evaluation

- [x] IDE TypeScript Problems attributable to the project are resolved (0 errors).
- [x] Prisma validate PASS (schema formatted, validated, client generated).
- [x] Automated unit tests PASS (10/10 tests in `vitest`).
- [x] ESLint analysis PASS (0 warnings, 0 errors).
- [x] Typecheck PASS (`tsc --noEmit` exits code 0).
- [x] Production build PASS (`next build` compiled all 37 routes without issues).
- [x] Zero unresolved import errors.
- [x] Zero usage of `any`, `@ts-ignore`, `@ts-expect-error`, or `eslint-disable` to silence errors.
- [x] Zero knowingly fabricated business, accreditation, or partnership claims.
- [x] Feature development strictly frozen; no Stitch UI integration started.

**Conclusion:** The repository is in a healthy, production-grade, and verified state. The stabilization phase is complete. Work is halted to await the official Google Stitch UI design handoff.
