---
name: Modern Academic Navy
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf4'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d5e3fd'
  on-surface: '#0d1c2f'
  on-surface-variant: '#444653'
  inverse-surface: '#233144'
  inverse-on-surface: '#ebf1ff'
  outline: '#757684'
  outline-variant: '#c4c5d5'
  surface-tint: '#3755c3'
  primary: '#00288e'
  on-primary: '#ffffff'
  primary-container: '#1e40af'
  on-primary-container: '#a8b8ff'
  inverse-primary: '#b8c4ff'
  secondary: '#49607e'
  on-secondary: '#ffffff'
  secondary-container: '#c4dcff'
  on-secondary-container: '#49617f'
  tertiary: '#4c2e00'
  on-tertiary: '#ffffff'
  tertiary-container: '#6b4200'
  on-tertiary-container: '#ffa929'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dde1ff'
  primary-fixed-dim: '#b8c4ff'
  on-primary-fixed: '#001453'
  on-primary-fixed-variant: '#173bab'
  secondary-fixed: '#d2e4ff'
  secondary-fixed-dim: '#b0c8eb'
  on-secondary-fixed: '#001c37'
  on-secondary-fixed-variant: '#314865'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0d1c2f'
  surface-variant: '#d5e3fd'
  royal-blue-vibrant: '#2563EB'
  primary-light: '#EFF6FF'
  primary-highlight: '#DBEAFE'
  amber-hover: '#D97706'
  emerald-growth: '#10B981'
  emerald-growth-dark: '#059669'
  surface-subtle: '#F8FAFC'
  border-subtle: '#E2E8F0'
  text-heading: '#0F172A'
  text-muted: '#64748B'
typography:
  display-hero:
    fontFamily: Be Vietnam Pro
    fontSize: 56px
    fontWeight: '800'
    lineHeight: '1.15'
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.25'
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 22px
    fontWeight: '600'
    lineHeight: '1.35'
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-base:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
  caption-badge:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4.5rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  margin-mobile: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
---

# DESIGN.md
# IVS Academy — Foreign Language Education System Design System & UI Specification

Brand identity inherits from IVS Academy (https://ivsacademy.edu.vn/), incorporating the official logo icon (blue/green modern dynamic globe with rising sun and education architecture) and brand assets.
UX architecture, course grouping, trust signals, and consultation flows reference the best practices of leading education centers (VUS) without cloning proprietary assets.

---

## 1. Brand Identity & Personality
- **Brand Name**: IVS Academy (Hệ thống Anh ngữ Quốc tế IVS)
- **Personality**: Modern International Education, Academic Credibility, Trustworthy, Premium yet Friendly, Enterprise-grade, Mobile-first.
- **Visual Feel**: Crisp slate neutrals, deep academic navy blue primary, vibrant royal blue highlights, energetic warm amber/emerald accents, subtle clean borders (1px border-slate-100/200), soft modern elevation shadows.

---

## 2. Color Palette
- **Primary Deep**: `#0A2540` / `#0C3B7A` (Navy Blue — authoritative, academic)
- **Primary Brand**: `#1E40AF` / `#2563EB` (Royal Blue — modern tech-enabled learning)
- **Primary Light**: `#EFF6FF` / `#DBEAFE`
- **Secondary Accent**: `#F59E0B` / `#D97706` (Amber Sun / Achievement Gold — CTA, badges, highlights)
- **Emerald Growth**: `#10B981` / `#059669` (Eco-green learning progress, verified badges)
- **Neutrals**:
  - Background Light: `#FFFFFF`, Slate-50 `#F8FAFC`
  - Card Surfaces: `#FFFFFF`
  - Borders: `#E2E8F0`
  - Text Muted: `#64748B`
  - Text Default: `#334155`
  - Text Heading: `#0F172A`

---

## 3. Typography
- **Primary Font**: Plus Jakarta Sans, Inter, or Be Vietnam Pro (Google Fonts) with excellent Vietnamese diacritics support.
- **Hierarchy**:
  - Display / Hero H1: 52–60px (Desktop), 34–40px (Mobile), font-weight: 800, line-height 1.15
  - H2 Section Titles: 32–38px (Desktop), 26–30px (Mobile), font-weight: 700
  - H3 Card Titles: 20–24px, font-weight: 600
  - Body Large: 18px, font-weight: 400/500
  - Body Base: 15–16px, font-weight: 400
  - Caption / Badges: 12–13px, font-weight: 600, uppercase tracking-wide

---

## 4. Components & Visual Rhythm
- **Border Radius**:
  - Buttons: 10px–12px (`rounded-xl`)
  - Cards: 16px–20px (`rounded-2xl`)
  - Inputs & Filters: 10px–12px (`rounded-xl`)
  - Badges / Pills: 9999px (`rounded-full`)
- **Elevation / Shadows**:
  - `shadow-sm`: 0 1px 2px 0 rgb(0 0 0 / 0.05)
  - `shadow-card`: 0 4px 20px -2px rgba(15, 23, 42, 0.06)
  - `shadow-hover`: 0 12px 32px -4px rgba(15, 23, 42, 0.12)
- **Icons**: Clean stroke icons (Lucide / Phosphor style), 20–24px standard, stroke-width 1.75.
