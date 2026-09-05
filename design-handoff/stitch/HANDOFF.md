# HANDOFF.md

## Status

This package consolidates the base Stitch export and the later four critical screen families into one implementation handoff.

The approved designs are the **visual source of truth**. The source-original directories are preserved for traceability only.

## Read order

1. `HANDOFF.md`
2. `BUSINESS-CONTEXT.md`
3. `DESIGN.md`
4. `docs/screen-inventory.md`
5. canonical screenshots in `screenshots/`
6. `stitch-export/**/code.html` only when implementation detail is unclear

## Authority order

1. Canonical screenshots
2. Canonical `DESIGN.md`
3. Normalized Stitch code reference
4. Original exports in `source-original/`

## Approved canonical screens

- Homepage Desktop: `screenshots/public/homepage-desktop.png`
- Homepage Mobile: `screenshots/public/homepage-mobile.png`
- Course Detail Desktop/Mobile
- Centers Desktop/Mobile
- Blog Article Desktop/Mobile
- Lead CRM Desktop/Mobile

The old non-mobile-first homepage export is archived under `screenshots/archive/` and must not be used as the mobile acceptance target.

## Implementation rules

- Do not redesign approved UI.
- Do not blindly paste Stitch HTML into production source.
- Translate the visual design into the existing Next.js/TypeScript architecture.
- Preserve server/client boundaries, Prisma/data layer, server-side RBAC, security, SEO and accessibility.
- Editable content must remain CMS/database-driven.
- Centralize tokens and reusable components before implementing pages.
- No unsupported business/accreditation claims.

## Validation breakpoints

- 390px
- 768px
- 1024px
- 1440px

## Phase gate

Before the design refactor, the current Antigravity working tree should be stable: Prisma validation, tests, lint (if configured), typecheck and build must all pass on the final pre-design state.
