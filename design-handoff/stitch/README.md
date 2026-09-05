# IVS Academy — Stitch Design Handoff v1.0

This package merges the original IVS Academy Stitch design export with the later critical screens and normalizes them for implementation by Antigravity.

## What is included

- Canonical Design System (`DESIGN.md`)
- IVS business/brand architecture (`BUSINESS-CONTEXT.md`)
- Approved Homepage Desktop + Mobile-first
- Course Detail Desktop + Mobile
- Centers Desktop + Mobile
- Blog Article Desktop + Mobile
- Lead CRM Desktop + Mobile
- Normalized Stitch HTML references
- Original raw Stitch exports preserved for traceability
- Implementation map, component inventory, responsive rules, asset audit and acceptance checklist
- Ready-to-paste Antigravity implementation prompt

## Recommended repo location

```text
design-handoff/stitch/
```

Copy the **contents** of this folder there. Antigravity should read `HANDOFF.md` first.

## Important

The Stitch HTML uses CDN Tailwind, Google Fonts and, on public screens, Google-hosted image URLs. These are prototype dependencies, not approved production dependencies. See `docs/asset-audit.md`.
