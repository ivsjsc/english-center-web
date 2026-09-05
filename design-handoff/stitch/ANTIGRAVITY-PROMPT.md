# ANTIGRAVITY-PROMPT.md

Paste the following prompt into Antigravity **after the pre-Stitch stabilization gate is green**.

---

The final Google Stitch design handoff is now available in:

`./design-handoff/stitch/`

This package consolidates the approved IVS Academy design system and these canonical Desktop/Mobile screen families:

- Homepage
- Course Detail
- Centers
- Blog Article
- Lead CRM

## PRECONDITION

Do not start the UI refactor if the current working tree is not stable. Confirm the current final tree passes the repository-equivalent of:

```bash
npx prisma validate
npm test
npm run lint
npm run typecheck
npm run build
```

If a script does not exist, report that accurately. Do not claim PASS from an earlier tree.

## READ FIRST

Read in this exact order:

1. `design-handoff/stitch/HANDOFF.md`
2. `design-handoff/stitch/BUSINESS-CONTEXT.md`
3. `design-handoff/stitch/DESIGN.md`
4. `design-handoff/stitch/docs/screen-inventory.md`
5. `design-handoff/stitch/docs/implementation-map.md`
6. `design-handoff/stitch/docs/asset-audit.md`
7. all canonical screenshots under `design-handoff/stitch/screenshots/`

Only inspect `stitch-export/**/code.html` when visual/component detail is unclear. Treat Stitch HTML as prototype/reference code, never as production architecture.

## BRAND AND PRODUCT POSITION

This is **IVS Academy**, part of IVS JSC. It is NOT AURA.

The public website must remain foreign-language-center/admissions first:

- 80% Foreign Language Center
- 15% Education Solutions
- 5% IVS ecosystem bridges

IVS Tech/IVS Learn/CenterCare may be represented as supporting ecosystem capability, but do not turn the main Academy navigation into a general technology-services catalog.

VUS is a UX benchmark only. Never copy VUS branding/content/assets.

Remove or neutralize unsupported demo claims about accreditation, licensing, partners, counts or outcomes unless verified data already exists in the project.

## DESIGN AUTHORITY

When references conflict, use:

1. canonical screenshot
2. canonical `DESIGN.md`
3. normalized Stitch HTML reference
4. original source export

Do NOT redesign approved screens.

Do NOT invent a different color/font/radius system.

Lock the canonical design implementation around **Be Vietnam Pro** and the tokens defined in `DESIGN.md`.

## ARCHITECTURE RULE

Preserve the existing production architecture and working domain implementation:

- Next.js / App Router
- TypeScript strictness
- Tailwind build pipeline
- Prisma/data layer
- server-side RBAC
- Zod/server validation
- Lead PII protections
- SEO / structured data
- CMS/database-driven editable content

Do not rewrite sound business/domain code merely to mimic Stitch prototype markup.

No `any`, `@ts-ignore`, lint suppression, client-side-only authorization, or hardcoded editable production content as shortcuts.

## PHASE 1 — DESIGN-TO-CODE MAPPING

Before changing public UI, update/create:

`docs/design/stitch-implementation-map.md`

Map every canonical screen to:

- application route
- existing component(s)
- component(s) to refactor/create
- server/client boundary
- domain/data dependency
- responsive behavior
- interaction states
- asset requirements
- unresolved ambiguity

Prefer adapting existing sound components over creating duplicates.

## PHASE 2 — CENTRAL DESIGN SYSTEM

Implement/refactor centrally first:

- colors
- typography
- spacing
- radius
- shadows
- container widths
- breakpoints
- Button
- Badge/StatusBadge
- Input/Select/Textarea/Checkbox
- Card
- Accordion
- Modal/Drawer
- Header/MegaMenu/MobileNavigation
- Footer/FloatingContactCTA

Do not scatter arbitrary hex values, pixel values or page-specific token systems.

## PHASE 3 — HOMEPAGE GATE

Implement the approved Homepage first.

Acceptance widths:

- 390
- 768
- 1024
- 1440

The approved mobile reference is `screenshots/public/homepage-mobile.png`. Ignore the archived legacy mobile reference.

Run visual QA and the full test/typecheck/build validation. Stop and report the Homepage comparison before expanding to other screen families.

## PHASE 4 — CRITICAL SCREENS

After Homepage is consistent, implement in this order:

1. Course Detail
2. Centers
3. Blog Article
4. Lead CRM

Specific responsive rules:

- Centers mobile: list-first, map secondary/toggle.
- Blog mobile: collapsible TOC, no persistent sidebar.
- CRM mobile: lead cards; do not horizontally squeeze the desktop table.
- Course Detail mobile: compact summary, collapsible curriculum and accessible sticky CTA.

## PHASE 5 — DERIVED SCREENS

Only after the canonical five screen families are stable, derive the remaining pages from the same design system:

- Course Listing
- Center Detail
- Teachers / Teacher Detail
- Achievements
- Methodology
- Blog Listing
- News
- About
- Contact
- Placement Test
- remaining Admin/CMS screens
- loading/empty/error states

Do not create a second visual identity for these screens.

## ASSETS

The Stitch prototypes contain `lh3.googleusercontent.com`, Google Fonts and CDN Tailwind references.

Do not ship those prototype dependencies blindly.

- use the repository Tailwind build
- use the project font strategy
- replace Stitch reference images with approved/localized production assets
- prefer official IVS logo/source assets over raster references in the handoff

## VALIDATION

After each implementation batch, run the repository-equivalent of:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

After the final code change, rerun the complete sequence once more.

## REPORTING

For each phase report:

- files changed
- components reused vs created
- visual discrepancies remaining
- data/content issues found
- security/accessibility impact
- commands actually executed
- PASS/FAIL
- remaining blockers

Start with the Design-to-Code mapping and centralized design-system plan. Do not immediately rewrite every page.
