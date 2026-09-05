---
name: IVS Academy — Canonical Stitch Design System
source: Google Stitch / Modern Academic Navy
status: APPROVED HANDOFF v1.0
primary_breakpoints:
  mobile: 390
  tablet: 768
  desktop: 1440
colors:
  primary-deep: '#00288E'
  primary: '#1E40AF'
  primary-vibrant: '#2563EB'
  primary-light: '#EFF6FF'
  primary-highlight: '#DBEAFE'
  accent-amber: '#F59E0B'
  accent-amber-hover: '#D97706'
  growth: '#10B981'
  growth-dark: '#059669'
  surface: '#F8F9FF'
  surface-subtle: '#F8FAFC'
  white: '#FFFFFF'
  border: '#E2E8F0'
  text-heading: '#0F172A'
  text-default: '#334155'
  text-muted: '#64748B'
  error: '#BA1A1A'
typography:
  primary-font: 'Be Vietnam Pro'
  display-desktop: '56px/1.15 800'
  display-mobile: '36px/1.20 800'
  h2-desktop: '36px/1.25 700'
  h2-mobile: '28px/1.30 700'
  h3: '22px/1.35 600'
  body-large: '18px/1.60 400'
  body: '16px/1.50 400'
  small: '14px/1.50 400'
rounded:
  button: '12px'
  card: '16px-20px'
  input: '12px'
  pill: '9999px'
---

# IVS Academy — Canonical Design System

This file is the single design-system authority for implementation. It resolves ambiguity between the original brief and Stitch-generated variants. The approved screens under `screenshots/` are the visual source of truth; this file governs details not visible in screenshots.

## 1. Product position

The website is **IVS Academy**, part of the broader **IVS JSC** ecosystem, but the primary product experience is a **Foreign Language / English Center website** for learners and parents.

Use the following information hierarchy:

- **80% — Foreign-language center:** courses, placement test, teachers, centers, student results, methodology, admissions and learning content.
- **15% — Education solutions:** school partnerships, international teachers, TeacherMatch, curriculum/R&D, IVS LifeMinds and center consulting.
- **5% — IVS ecosystem bridges:** IVS Learn, CenterCare, IVS Tech, Global Teacher Hub and related IVS platforms.

Do not turn the main navigation into an IVS corporate-services catalog. Technology and B2B services are supporting context, not the primary admissions journey.

## 2. Brand and reference rules

- Brand: **IVS Academy**. Never use AURA or another demo academy brand.
- `https://ivsacademy.edu.vn/` is the primary brand/business reference.
- `https://ivstech.store/` is an ecosystem reference for technology capability, not a source for main Academy navigation.
- `https://vus.edu.vn/` is only a UX/information-architecture benchmark. Never copy VUS branding, copyrighted content, images, or pixel-for-pixel layouts.
- Do not invent licenses, accreditations, partnerships, statistics, teacher counts or center counts. Business claims must be verified or CMS-driven placeholders clearly marked as demo.

## 3. Visual language

Modern international education, academic credibility, trustworthy, premium but approachable, clean, enterprise-grade and mobile-first.

Avoid excessive gradients, glassmorphism, cartoon-heavy surfaces, neon colors, over-rounded cards and generic SaaS styling.

## 4. Color usage

- Deep/royal blues: primary actions, navigation states, educational authority.
- Amber: conversion highlights, achievements and secondary emphasis. Do not use amber as a large background excessively.
- Emerald: progress/verified/success semantics.
- Slate/white surfaces: dominant page canvas and cards.
- Maintain WCAG AA contrast. Never use color alone to communicate status.

## 5. Typography

Lock the implementation font to **Be Vietnam Pro** unless the owner explicitly replaces it later. Do not mix Plus Jakarta Sans/Inter/Be Vietnam Pro across pages.

- Hero Desktop: 56px, 800, 1.15
- Hero Mobile: 36px, 800, 1.20
- Section H2 Desktop: 36px, 700, 1.25
- Section H2 Mobile: 28px, 700, 1.30
- H3: 22px, 600, 1.35
- Body Large: 18px, 1.60
- Body: 16px, 1.50
- Small: 14px, 1.50

## 6. Layout and spacing

- Desktop target: 1440px; max content width 1200–1280px.
- Tablet target: 768px.
- Mobile target: 390px with 16px base side gutter.
- Use an 8px spacing rhythm; common values: 8, 16, 24, 32, 48, 64, 80, 96.
- Section spacing: approximately 80–120px desktop and 56–72px mobile.
- No horizontal overflow.

## 7. Components

Reuse shared components rather than reproducing visual CSS per page:

`Button`, `Badge`, `Input`, `Select`, `Card`, `SectionHeading`, `CourseCard`, `TeacherCard`, `AchievementCard`, `CenterCard`, `BlogCard`, `LeadForm`, `Accordion`, `Modal/Drawer`, `Header`, `MegaMenu`, `MobileNavigation`, `Footer`, `FloatingContactCTA`.

Standard rules:

- Buttons 10–12px radius, clear focus/hover/disabled states.
- Cards 16–20px radius, subtle border/shadow.
- Inputs 48–52px minimum height; visible labels.
- Touch target >= 44px.
- Icons: consistent line family, 20–24px, ~1.75 stroke.

## 8. Approved screen families

The following screen families are approved in this handoff:

1. Homepage — Desktop + Mobile-first
2. Course Detail — Desktop + Mobile
3. Centers — Desktop + Mobile
4. Blog Article — Desktop + Mobile
5. Lead CRM — Desktop + Mobile

Use them to derive all remaining screens without changing the visual identity.

## 9. Responsive behavior

Mobile is not a scaled desktop canvas.

- Navigation becomes drawer/accordion.
- Course/content grids collapse deliberately.
- Long forms become one column.
- Center finder is list-first with map toggle/secondary map.
- Blog sidebar becomes collapsible TOC.
- CRM table becomes responsive lead cards on mobile rather than a horizontally squeezed table.
- Sticky/floating CTAs must not obscure content.

## 10. Public vs Admin

Public pages are high-trust, editorial and conversion-oriented. Admin/CRM is compact, data-focused and enterprise-oriented, while retaining shared typography/tokens. Do not make Admin look like a public marketing landing page.

## 11. Content and SEO

Layouts must support semantic H1/H2/H3, breadcrumbs, long-form text, FAQ, TOC, internal links, structured course/center information and accessible form labels. Do not hide important SEO content behind unnecessary interactions.

## 12. Implementation authority

Priority when references differ:

1. `screenshots/` approved canonical screen
2. this `DESIGN.md`
3. `stitch-export/**/code.html` for visual/interaction clues only
4. original Stitch/source files under `source-original/`

Generated Stitch HTML is **not production architecture** and must never override Next.js/TypeScript/security/accessibility/data-layer requirements.
