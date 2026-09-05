# Visual & Technical Acceptance Checklist

## Precondition
- [ ] Current app stabilization complete
- [ ] Prisma validate PASS
- [ ] tests PASS
- [ ] lint PASS (or explicitly documented if script unavailable)
- [ ] typecheck PASS
- [ ] production build PASS

## Design system
- [ ] Be Vietnam Pro applied consistently
- [ ] canonical colors/tokens centralized
- [ ] no competing page-local design systems
- [ ] button/input/card variants reusable

## Homepage
- [ ] 1440 comparison PASS
- [ ] 390 mobile-first comparison PASS

## Course Detail
- [ ] Desktop hierarchy/layout match
- [ ] Mobile curriculum/CTA behavior match

## Centers
- [ ] Desktop list/map pattern match
- [ ] Mobile list-first pattern match

## Blog Article
- [ ] Desktop readable article width/TOC match
- [ ] Mobile TOC/readability match

## Lead CRM
- [ ] Desktop table/drawer behavior match
- [ ] Mobile lead-card behavior match
- [ ] RBAC enforced server-side

## Global
- [ ] no horizontal overflow at 390/768/1024/1440
- [ ] WCAG-friendly contrast and focus states
- [ ] editable copy/data comes from CMS/database
- [ ] no VUS or AURA branding
- [ ] no unsupported accreditation/partner/statistic claims
- [ ] no Stitch-hosted production image dependency
- [ ] final tests/typecheck/build PASS after UI implementation
