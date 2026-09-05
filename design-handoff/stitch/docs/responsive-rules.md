# Responsive Rules

## Validation widths
- 390px mobile source-of-truth
- 768px tablet interpolation
- 1024px small desktop/tablet landscape QA
- 1440px desktop source-of-truth

## Mandatory behavior
- Minimum touch target: 44px
- Form control height on mobile: >= 48px
- Body text: >= 16px where interaction/readability requires it
- No horizontal overflow
- No desktop table squeezed into mobile viewport
- Center map is secondary/toggle on mobile; list comes first
- Blog TOC collapses on mobile
- Mobile navigation uses drawer/accordion
- Sticky CTAs must respect safe area and not cover form submit/navigation

The screenshot exports may be downscaled long-page images; their filenames/breakpoint intent, not their raster pixel width, defines the target viewport.
