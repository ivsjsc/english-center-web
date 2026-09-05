# DESIGN.md
# Foreign Language Center Website — Design System & UI Specification

> Reference for information architecture and UX patterns: https://vus.edu.vn/
>
> Important: Do not clone VUS pixel-by-pixel. Do not copy VUS branding, logo, images, text, proprietary visual assets, or source code. Create an original design system and visual identity.

---

## 1. Product Vision

Design a modern, premium, trustworthy, conversion-focused website for a Vietnamese Foreign Language / English Center.

The visual experience should communicate:

- International education
- Academic credibility
- Modern learning
- Professional operation
- Friendly and approachable
- Safe for parents and students
- High-quality but not overly luxurious
- Clear, fast, mobile-first UX

Primary audiences:

1. Parents with children aged 4–18
2. Secondary and high-school students
3. University students
4. Working adults
5. IELTS / TOEIC / Cambridge learners
6. Corporate training buyers

Primary user actions:

- Explore courses
- Find the right course
- Register for consultation
- Book a placement test
- Find the nearest center
- View teachers
- Review student achievements
- Read learning resources
- Contact the center

---

## 2. Brand Direction

Create an ORIGINAL visual identity.

### Personality

- Modern
- Academic
- Confident
- Clean
- Friendly
- International
- Reliable
- Human-centered

### Avoid

- Cartoon-heavy UI
- Excessive gradients
- Excessive glassmorphism
- Over-rounded cards
- Neon colors
- Visual clutter
- Generic SaaS appearance
- Direct imitation of VUS

---

## 3. Color System

Use a professional education-oriented palette.

Recommended structure:

### Primary
A confident deep blue / royal blue family.

Usage:
- Main CTA
- Active navigation
- Important highlights
- Links
- Key brand surfaces

### Secondary
A warm accent such as orange, amber, or coral.

Usage:
- Secondary CTA
- Promotional highlights
- Badges
- Important educational milestones

### Neutral
Use a complete neutral scale:

- White
- Off-white
- Light gray
- Mid gray
- Dark slate
- Near-black

### Semantic colors

- Success
- Warning
- Error
- Info

Requirements:

- WCAG AA contrast
- Never use color as the only status indicator
- Avoid more than 2 strong brand colors per section

---

## 4. Typography

Use a modern sans-serif font with excellent Vietnamese support.

Recommended characteristics:

- High readability
- Neutral but friendly
- Strong heading hierarchy
- Suitable for both children/parent content and enterprise/corporate content

Typography scale:

- Display: 56–64px desktop
- H1: 44–56px desktop
- H2: 36–44px
- H3: 28–32px
- H4: 22–24px
- Body Large: 18px
- Body: 16px
- Small: 14px
- Caption: 12–13px

Mobile:

- H1: 32–40px
- H2: 28–32px
- H3: 22–26px
- Body: 16px minimum for form inputs

Line height:

- Headings: 1.15–1.25
- Body: 1.5–1.7

---

## 5. Grid & Layout

### Desktop
- Target width: 1440px
- Content max-width: 1200–1280px
- 12-column grid

### Tablet
- Target width: 768px
- 8-column grid

### Mobile
- Target width: 390px
- 4-column grid
- 16–20px side padding

### Spacing System

Use an 8px base system:

- 4
- 8
- 12
- 16
- 24
- 32
- 40
- 48
- 64
- 80
- 96
- 120

Section spacing:

- Desktop: 80–120px
- Mobile: 56–72px

---

## 6. Radius, Border & Shadow

### Radius
- Buttons: 10–14px
- Cards: 16–20px
- Inputs: 10–12px
- Large media containers: 20–24px

Avoid excessively pill-shaped UI except:
- badges
- filters
- compact tags

### Borders

Use subtle neutral borders:
- 1px standard
- strong border only for selected/focused states

### Shadows

Use subtle shadows only:
- Cards
- Floating elements
- Dropdowns
- Sticky CTA

Do not use heavy shadows.

---

## 7. Iconography

Use a consistent line-icon family.

Rules:

- Same stroke weight
- 20–24px standard size
- 16–18px compact controls
- 28–32px feature icons
- Icons must support text, not replace essential labels

Suggested icon categories:

- Phone
- Message
- Map
- Book
- Graduation cap
- Teacher
- Certificate
- Calendar
- Clock
- Arrow
- Search
- Filter
- User
- Building
- Check
- Chevron

---

## 8. Imagery

Use authentic education imagery.

Preferred:

- Vietnamese learners
- Parents and children
- Teachers interacting with students
- Modern classrooms
- Group discussion
- English activities
- Certificates / achievement moments

Avoid:

- Generic corporate stock imagery
- Artificial-looking AI faces
- Overly staged classroom scenes
- Images with embedded text
- Watermarks

Image treatment:

- Natural lighting
- Clean composition
- Slightly warm tone
- Consistent aspect ratios

---

## 9. Header

### Desktop Header

Structure:

- Logo
- Main navigation
- Secondary navigation if needed
- Primary CTA: “Đăng ký tư vấn”
- Secondary CTA: “Kiểm tra trình độ”

Navigation:

- Khóa học
- Phương pháp học
- Giáo viên
- Thành tích học viên
- Trung tâm
- Blog
- Tin tức
- Giới thiệu

“Khóa học” uses a mega-menu.

Mega-menu groups:

- Mầm non
- Tiểu học
- THCS
- THPT
- IELTS
- TOEIC
- Giao tiếp
- Doanh nghiệp

Header behavior:

- Sticky on scroll
- White or light surface
- Soft bottom border
- Clear active states

### Mobile Header

- Logo
- Compact CTA
- Hamburger
- Full-screen or side drawer
- Accordion submenus

Touch target >= 44px.

---

## 10. Buttons

### Primary Button

Use for:
- Register
- Consultation
- Placement test
- Main conversions

Style:
- Solid brand color
- High contrast
- Medium/large height
- Clear hover/focus states

### Secondary Button

Use:
- Explore
- View details
- Learn more

Style:
- Outline or light fill

### Text Button

Use:
- Read more
- View all

Never create more than 2 strong CTA buttons in one visual group.

---

## 11. Forms

All forms must feel simple and trustworthy.

Input height:
- 48–52px

Fields:
- Clear visible label
- Placeholder is optional
- Never use placeholder as the only label

States:
- Default
- Focus
- Filled
- Error
- Success
- Disabled

Lead form example:

- Họ và tên
- Số điện thoại
- Email
- Tuổi học viên
- Khóa học quan tâm
- Cơ sở
- Ghi chú
- Personal-data consent checkbox

Mobile:
- Single-column form
- Large touch targets
- No cramped horizontal field rows

---

## 12. Homepage Structure

### Section 1 — Hero

Purpose:
Immediate value proposition + conversion.

Desktop:
- 2-column layout
- Content left
- Hero visual right

Mobile:
- Text first
- Visual second
- Primary CTA immediately visible

Content:

- Short eyebrow
- Strong H1
- Supporting paragraph
- Primary CTA
- Secondary CTA
- Trust indicator

Hero visual:
- Student + teacher / educational environment

---

### Section 2 — Trust Metrics

Display 4–6 key metrics.

Examples:

- Students
- Teachers
- Centers
- Years of experience
- International certificates
- Partner organizations

Use clean statistic cards.

Desktop:
4–6 columns

Mobile:
2-column grid

---

### Section 3 — Course Discovery

Heading:
“Khóa học phù hợp cho mọi độ tuổi”

Course categories:

1. Tiếng Anh Mầm non
2. Tiếng Anh Tiểu học
3. Tiếng Anh THCS
4. Tiếng Anh THPT
5. IELTS
6. TOEIC
7. Giao tiếp
8. Doanh nghiệp

Course card:

- Image
- Audience / age
- Course title
- Short description
- CTA
- Optional badge

Desktop:
3–4 cards per row

Mobile:
1 column or controlled horizontal carousel

---

### Section 4 — Course Finder

Create an interactive-looking course recommendation panel.

Fields:

- Age
- Current level
- Learning goal
- Learning format
- Location

CTA:
“Tìm khóa học phù hợp”

Make this section visually distinct.

---

### Section 5 — Why Choose Us

Use 4–6 value pillars:

- International-qualified teachers
- Personalized learning roadmap
- Modern teaching methodology
- Learning technology
- Progress tracking
- Safe learning environment

Use icon + title + description cards.

---

### Section 6 — Learning Method

Use a storytelling layout.

Possible structure:

1. Discover
2. Practice
3. Apply
4. Reflect
5. Progress

Include:

- Communication
- 4 skills
- Critical thinking
- Project-based learning
- Personalized feedback

Use diagrams or step cards.

---

### Section 7 — Teachers

Teacher cards:

- Portrait
- Name
- Nationality
- Qualification
- Years of experience
- Courses taught

Use clean portrait photography.

---

### Section 8 — Student Achievements

Achievement cards:

- Student photo
- Name
- Certificate
- Score
- Course

Examples:

- IELTS
- Cambridge
- TOEIC

Use a carousel on mobile.

---

### Section 9 — Testimonials

Use parent/student testimonials.

Card:

- Avatar
- Name
- Relationship / course
- Quote
- Optional rating

Avoid overly long testimonials.

---

### Section 10 — Learning Ecosystem

Display:

- Offline classes
- Online learning
- Student portal
- Parent portal
- Learning app
- Learning resources

Use interconnected visual cards.

---

### Section 11 — Center Finder

Heading:
“Trung tâm gần bạn”

Desktop:
- Filters + center list + map

Mobile:
- Filters
- List first
- Map secondary

Center card:

- Center name
- Address
- Phone
- Opening hours
- Courses
- View details
- Directions

---

### Section 12 — Blog

Show:

- Featured article
- Latest articles
- Categories

Categories:

- IELTS
- Cambridge
- Grammar
- Vocabulary
- Children English
- Learning Tips

Blog card:

- Thumbnail
- Category
- Title
- Excerpt
- Date
- Reading time

---

### Section 13 — Consultation CTA

Strong conversion section.

Heading:
“Đăng ký nhận tư vấn”

Include a short lead form.

Keep the design clean and reassuring.

---

## 13. Course Detail Page

Structure:

1. Breadcrumb
2. Hero
3. Course overview
4. Target audience
5. Learning outcomes
6. Curriculum
7. Roadmap
8. CEFR mapping
9. Course levels
10. Duration
11. Class size
12. Teaching method
13. Teachers
14. Learning materials
15. Student achievements
16. Testimonials
17. FAQ
18. Consultation form
19. Related courses

Use sticky CTA on mobile.

---

## 14. Course Listing Page

Components:

- Page hero
- Search
- Age filter
- Goal filter
- Level filter
- Format filter
- Course cards
- Consultation CTA

Desktop:
Sidebar/filter bar + grid

Mobile:
Filter drawer + cards

---

## 15. Centers Page

Desktop:
- Search/filter panel
- Center list
- Map

Filters:

- Province
- District
- Course
- Keyword

Mobile:
- Search
- Filter button
- Center cards
- Map toggle

---

## 16. Center Detail Page

Include:

- Center name
- Gallery
- Address
- Hotline
- Opening hours
- Google Maps
- Facilities
- Available courses
- Teachers
- Center news
- Consultation CTA

---

## 17. Teachers Page

Teacher listing:

- Search
- Nationality filter
- Qualification
- Course filter

Teacher profile:

- Portrait
- Bio
- Qualifications
- Teaching experience
- Courses
- Philosophy
- CTA

---

## 18. Student Achievements Page

Provide:

- Featured achievements
- Filters by exam
- IELTS
- Cambridge
- TOEIC

Use large score visual treatment without making the page look like a gaming leaderboard.

---

## 19. Blog Listing

Structure:

- Page heading
- Search
- Featured article
- Category chips
- Article grid
- Pagination / load more

Keep SEO content readable.

---

## 20. Blog Article

Structure:

- Breadcrumb
- Category
- H1
- Author
- Date
- Reading time
- Hero image
- Table of contents
- Rich content
- Inline educational CTA
- FAQ
- Related posts

Content width:
720–800px for readability.

---

## 21. About Page

Include:

- Brand story
- Vision
- Mission
- Core values
- Timeline
- Teaching philosophy
- Quality standards
- Partnerships
- Facilities
- CTA

---

## 22. Contact Page

Include:

- Hotline
- Email
- Main office
- Center finder
- Contact form
- Google Maps
- Social channels

---

## 23. Footer

Include:

### Brand
- Logo
- Legal name
- Description

### Navigation
- Courses
- About
- Centers
- Blog
- Careers
- Contact

### Contact
- Phone
- Email
- Address

### Policies
- Privacy Policy
- Personal Data Policy
- Terms
- Cookie Policy

### Social
- Facebook
- YouTube
- TikTok
- Zalo
- LinkedIn

Footer should feel organized, not dense.

---

## 24. Floating Contact Actions

Desktop:
Compact vertical or horizontal floating actions.

Mobile:
Bottom sticky actions.

Possible actions:

- Call
- Zalo
- Messenger
- Consultation

Do not obstruct content.

---

## 25. Admin Dashboard

Admin style:

- Enterprise
- Compact
- Data-focused
- Neutral
- Fast to scan

Sidebar:

- Dashboard
- Leads
- Courses
- Centers
- Teachers
- Achievements
- Blog
- News
- Pages
- Media
- Users
- Settings

Dashboard cards:

- Leads today
- Leads this month
- Conversion
- Enrollments
- Top courses
- Top centers

Charts should be simple and legible.

---

## 26. Lead CRM

Lead table columns:

- Name
- Phone
- Course
- Center
- Source
- Status
- Consultant
- Created date

Statuses:

- New
- Contacted
- Appointment
- Placement Test
- Enrolled
- Lost

Lead detail:

- Contact information
- Notes
- Timeline
- Assignment
- Status history
- Source / UTM

Use status badges with both color and text.

---

## 27. Responsive Rules

Design explicitly for:

- Mobile: 390px
- Tablet: 768px
- Desktop: 1440px

### Mobile-first requirements

- No horizontal overflow
- Touch target >= 44px
- Body text >= 16px
- Inputs >= 48px height
- CTA visible early
- Menu easy to operate with one hand
- Cards do not become too dense
- Tables convert into responsive lists/cards if necessary

Do not simply scale down desktop designs.

---

## 28. Accessibility

Required:

- WCAG AA contrast
- Keyboard-accessible navigation
- Visible focus state
- Semantic heading hierarchy
- Labels for every form input
- Alt text support
- Proper states for disabled/error/success
- Avoid text embedded inside images

---

## 29. Interaction & Motion

Motion should be subtle.

Allowed:

- Fade in
- Small translate
- Card hover
- Button feedback
- Accordion
- Carousel
- Sticky header transition

Duration:
150–300ms

Avoid:

- Excessive parallax
- Auto-playing distracting animations
- Long transitions
- Motion that blocks interaction

---

## 30. Loading / Empty / Error States

Design:

- Skeleton cards
- Empty search results
- Form error state
- Network error
- 404
- 500
- No centers found
- No course found

All states must match the design system.

---

## 31. SEO-friendly UI Requirements

The design must support:

- Clear H1/H2 hierarchy
- Breadcrumb
- Long-form content
- FAQ
- Table of contents
- Related content
- Internal links
- Structured course information
- Structured center information

Avoid designs that hide important SEO text behind interactions unnecessarily.

---

## 32. Final Design Deliverables

Create a complete visual system and screens for:

1. Design system
2. Homepage desktop
3. Homepage mobile
4. Course listing
5. Course detail
6. Course finder
7. Centers listing
8. Center detail
9. Teachers listing
10. Teacher profile
11. Student achievements
12. Methodology
13. Blog listing
14. Blog article
15. News listing
16. About
17. Contact
18. Placement test
19. Consultation form
20. Admin dashboard
21. Lead CRM
22. Mobile navigation
23. Footer
24. Loading states
25. Empty states
26. Error states

---

## 33. Stitch Instructions

When generating screens:

- Maintain one consistent design system across all pages.
- Reuse components instead of inventing a new style on every screen.
- Prioritize mobile-first behavior.
- Keep conversion CTAs clearly visible.
- Use realistic Vietnamese placeholder content.
- Do not use VUS logos, brand colors, images, or copyrighted copy.
- Use the VUS website only as a UX/information-architecture reference.
- Generate production-oriented layouts that can be implemented in React / Next.js / Tailwind CSS.
