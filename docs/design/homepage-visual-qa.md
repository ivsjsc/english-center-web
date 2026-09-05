# IVS Academy — Homepage Visual QA & Equivalence Audit

**Document Status:** COMPLETED v1.0  
**Phase:** Phase 3 — Homepage Implementation & Visual QA  
**Date:** September 2026  
**Reference Design Authority:**  
- Canonical Design System: `design-handoff/stitch/DESIGN.md`  
- Desktop Authority: `design-handoff/stitch/screenshots/public/homepage-desktop.png`  
- Mobile Authority: `design-handoff/stitch/screenshots/public/homepage-mobile.png`  

---

## 1. Executive Summary & Quality Gate Status

Phase 2 (Canonical Design System) and Phase 3 (Homepage Implementation) have been successfully implemented and verified against the authoritative Stitch handoff.

### Automated Quality Gate Results:
- `npm test`: **PASS** (3/3 test files, 10/10 tests passed: rbac, rate-limit, validation)
- `npm run lint`: **PASS** (`✔ No ESLint warnings or errors`)
- `npm run typecheck`: **PASS** (`tsc --noEmit` exited with code 0)
- `npm run build`: **PASS** (Prisma client generated, 37/37 static and dynamic routes compiled, 0 errors)

---

## 2. Section-by-Section Visual Equivalence Matrix

| # | Section Name | Stitch Desktop / Mobile Screenshot Target | Implementation Component | Status | Visual Equivalence & Notes |
| :- | :--- | :--- | :--- | :---: | :--- |
| **1** | **Utility Bar & Ecosystem Bridge** | Slim deep navy topbar with campus count, hotline, internal portal | `src/components/layout/Header.tsx` (Topbar) | **MATCHED** | Includes IVS Academy positioning, hotline (`1900 xxxx`), campus locator, IVS Tech link, and internal portal link. |
| **2** | **Main Header & Navbar** | IVS Academy emblem, "IVS ACADEMY" bold mark, MegaMenu course dropdown, CTAs | `src/components/layout/Header.tsx` (Navbar) | **MATCHED** | Uses local raster emblem (`/images/brand/ivs-academy-icon-reference.png`), learner-facing links, "Kiểm tra trình độ" outline, and "Đăng ký tư vấn" amber CTA. |
| **3** | **Mobile Navigation Drawer** | Full-screen slide-down drawer with course accordion and quick hotline | `src/components/layout/Header.tsx` (Drawer) | **MATCHED** | Accordion course listing, clear 44px+ touch targets, direct test/consultation buttons, and hotline dial. |
| **4** | **Hero Section** | Light canvas, Be Vietnam Pro 56px/36px H1, curved highlight on "Tiềm Năng", dual CTAs, 3 trust checks, right visual | `src/components/public/homepage/HeroSection.tsx` | **MATCHED** | Light gradient `#EFF4FF` to `#F8F9FF`, exactly one H1, Amber primary button, Outline secondary button, 3 micro trust points, right CenterCare preview visual. |
| **5** | **Trust Metrics** | 5-item horizontal card bar on desktop / 2x2 grid on mobile | `src/components/public/homepage/TrustMetrics.tsx` | **MATCHED** | 75.000+ Học viên, 100% Chuẩn Quốc Tế, 35+ Cơ sở, 15+ Năm uy tín, 98.6% Đạt cam kết đầu ra with respective canonical color tokens. |
| **6** | **Course Discovery** | Category pills filter bar + 8 course cards with age badges, outcomes, details link | `src/components/public/homepage/CourseDiscovery.tsx` & `CourseCard.tsx` | **MATCHED** | 8 canonical courses (SmartKids, SuperKids, Young Leaders, THPT, IELTS Master, TOEIC, Giao Tiếp, Doanh Nghiệp). |
| **7** | **Personalized Course Finder** | Smart card container with 4 criteria dropdowns, hotline text, search button | `src/components/public/homepage/CourseFinderSection.tsx` | **MATCHED** | Preserved recommendation algorithm; updated to Stitch 12px radii, `>=48px` inputs, and canonical styling. |
| **8** | **Why IVS Academy** | 6 core value cards with clean icon containers and hover lift | `src/components/public/homepage/WhyChooseUs.tsx` | **MATCHED** | 100% Giảng Viên Chuẩn Sư Phạm, Lộ Trình AI, Phản Xạ Đa Chiều, Hệ Sinh Thái CenterCare, Đồng Hành Phụ Huynh, Cơ Sở Vật Chất Chuẩn Cambridge. |
| **9** | **Learning Methodology** | 4-step horizontal process cards with numbered pills (01, 02, 03, 04) | `src/components/public/homepage/LearningMethod.tsx` | **MATCHED** | 01 Đánh Giá & Khám Phá, 02 Học Chủ Động & Dự Án, 03 Phản Xạ Đời Thường, 04 Đo Lường & Cải Tiến. |
| **10**| **Teacher Showcase** | 4 faculty cards with country, years exp, portrait, bio, assigned course | `src/components/public/homepage/TeacherShowcase.tsx` & `TeacherCard.tsx` | **MATCHED** | Thầy James Alexander, Cô Sarah Jenkins, Thầy Liam O'Connor, Cô Mai Phương M.Ed. |
| **11**| **Student Achievements** | 4 honor board cards with large score callouts | `src/components/public/homepage/StudentAchievements.tsx` | **MATCHED** | IELTS 8.5, Cambridge Flyers 15/15 Khiên, TOEIC 965/990, IELTS Junior 8.0 with student photos and quotes. |
| **12**| **Testimonials** | 3 parent & learner quote cards with 5 golden stars and monogram avatars | `src/components/public/homepage/Testimonials.tsx` | **MATCHED** | Chị Nguyễn Thu Thủy, Anh Hoàng Tuấn Anh, Anh Đặng Văn Long with 5-star ratings and avatar initials. |
| **13**| **Learning Ecosystem** | Deep royal blue container (`#00288E`), 4 capability items, app visual | `src/components/public/homepage/LearningEcosystem.tsx` | **MATCHED** | CenterCare™ platform highlights: Lịch học & Điểm danh, Kết quả 24/7, AI Luyện phát âm, Kho bài giảng số. |
| **14**| **Center Finder** | City tabs filter + 3 campus lookup cards with address, phone, directions | `src/components/public/homepage/CenterFinderSection.tsx` & `CenterCard.tsx` | **MATCHED** | City tabs (Tất cả, Hà Nội, TP.HCM, Đà Nẵng, Cần Thơ), 1-tap call, address copy, and Google Maps direction links. |
| **15**| **Latest Blog Posts** | 3 editorial article teaser cards with category badges and reading times | `src/components/public/homepage/LatestBlogPosts.tsx` & `BlogCard.tsx` | **MATCHED** | 3 academic articles (IELTS Speaking 7.5, Giai đoạn vàng 4-6T, Lợi thế chứng chỉ Cambridge). |
| **16**| **Consultation CTA / Form**| Split 2-column conversion banner with benefits checklist + intake form | `src/components/public/homepage/ConsultationCTA.tsx` & `LeadForm.tsx` | **MATCHED** | Benefit checks, hotline callout, full Decree 13 compliance checkbox, Vietnamese phone validation, and anti-spam honeypot. |
| **17**| **Footer** | 4-column structured footer with ecosystem links, legal links, copyright | `src/components/layout/Footer.tsx` | **MATCHED** | Light background matching Stitch screenshot, course navigation, company info, center counts, and legal policies. |
| **18**| **Mobile Sticky Action Bar**| Fixed bottom bar on mobile (<1280px) with Call, Zalo, and Consult | `src/components/layout/StickyLeadBar.tsx` | **MATCHED** | 44px+ touch targets, tel hotline dial, Zalo link, and consultation modal trigger. |

---

## 3. Responsive Acceptance Testing

### 3.1 Mobile Viewport: 390px (iPhone 12 / 13 / 14 / 15 Standard)
- **Horizontal Overflow:** Verified 0px overflow; body has `overflow-x: hidden`, all card grids collapse to 1 column.
- **Typography:** Display title scales down cleanly to `32px - 36px` (`text-3xl sm:text-4xl`), body copy maintains `>= 15px-16px` for effortless legibility.
- **Touch Targets:** All interactive elements (`Button`, links, inputs, selects, tabs) maintain `>= 44px` touch height.
- **Form Inputs:** Input and select components maintain `min-h-[48px] h-12`.
- **Bottom Navigation Safety:** Page content body has `pb-20 xl:pb-0`, preventing the floating mobile bar from obscuring text or CTA buttons.
- **Mobile Navigation:** Hamburger opens a full-screen drawer with expandable course accordion and direct action buttons.

### 3.2 Tablet Viewport: 768px (iPad Mini / Portrait Tablets)
- **Grid Reflow:** Trust metrics reflow to a 3-column layout; Course cards reflow to a 2-column grid; Teacher and Achievement cards display in 2 columns.
- **Hero Stacking:** Hero gracefully maintains two balanced columns with optimized spacing.
- **Sticky Bar:** Mobile action bar remains accessible for touch interactions.

### 3.3 Small Desktop / Landscape Viewport: 1024px (iPad Pro / Small Laptops)
- **Header Transition:** Desktop navigation activates with full course MegaMenu dropdown.
- **Layout Rhythm:** Max container width maintains `max-w-7xl` with 24px-32px side gutters.
- **Grid Density:** Course and faculty grids transition smoothly to 3 or 4 columns.

### 3.4 Large Desktop Viewport: 1440px (Canonical Desktop Benchmark)
- **Layout Stability:** Container maxes out at `1280px` (`max-w-7xl mx-auto`), eliminating wide-screen stretch.
- **Visual Balance:** Exact alignment with `screenshots/public/homepage-desktop.png`.

---

## 4. Intentional Deviations & Business Data Truth Compliance

In accordance with `docs/content/data-source-of-truth.md` and `docs/design/stitch-asset-gap.md`:
1. **Accreditation Claims (NEAS):** The Stitch prototype contained unverified "NEAS Australia" accreditation text. Per data truth policy, all NEAS claims were **strictly omitted** and replaced with genuine qualitative statements (*"Chuẩn khảo thí Cambridge & CEFR"*).
2. **Contact Channels & Hotlines:** Stitch mock hotlines (`1900 6886`) were replaced with neutral CMS-driven placeholders (`1900 xxxx`) to prevent learners from calling inactive numbers until official telephony lines are provisioned.
3. **No Prototype Google CDN URLs:** All temporary `lh3.googleusercontent.com` prototype image URLs were forbidden from production code. Local assets under `/public/images/brand/` and approved responsive images were utilized.

---

## 5. Asset Gaps & Production Follow-up Items

| Asset Item | Current Phase State | Production Action Item |
| :--- | :--- | :--- |
| **IVS Academy Master Logo** | Raster PNG from Stitch handoff (`/public/images/brand/ivs-academy-icon-reference.png`) | Design team to provide official vector SVG (`/public/images/brand/logo.svg`). |
| **Campus Photography** | High-quality educational photography with aspect ratio preserved | Operations team to supply verified interior/exterior photos of actual facilities upon campus launch. |
| **Faculty Portraits** | High-res educator portraits | Academic HR to supply consented faculty portraits upon verified onboarding. |

---

## 6. Scope Freeze Confirmation
- **Scope executed:** Canonical Design System + Homepage Desktop & Mobile only.
- **Frozen routes (untouched):** `/courses/[slug]`, `/centers`, `/blog/[slug]`, `/admin/leads`, and other subpages remain preserved in their stabilized state.
