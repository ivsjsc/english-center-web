# Asset & Prototype Dependency Audit

The normalized Stitch HTML is a visual implementation reference, **not production-ready source**.

## External dependencies detected

- `cdn.tailwindcss.com` — prototype runtime Tailwind; production must use the repo build pipeline.
- `fonts.googleapis.com` / `fonts.gstatic.com` — font delivery; use the project font strategy (e.g. `next/font`) where appropriate.
- `lh3.googleusercontent.com` — Stitch reference imagery; replace/localize with approved production assets before launch.
- Maps/social URLs appear on some screens as link targets.

## Google-hosted reference image count by prototype

| Prototype | Distinct `lh3.googleusercontent.com` refs | Hosts |
|---|---:|---|
| `stitch-export/centers/desktop/code.html` | 6 | cdn.tailwindcss.com, fonts.googleapis.com, fonts.gstatic.com, lh3.googleusercontent.com, maps.google.com, zalo.me |
| `stitch-export/centers/mobile/code.html` | 5 | cdn.tailwindcss.com, fonts.googleapis.com, fonts.gstatic.com, lh3.googleusercontent.com, maps.google.com |
| `stitch-export/blog-article/desktop/code.html` | 8 | cdn.tailwindcss.com, fonts.googleapis.com, fonts.gstatic.com, lh3.googleusercontent.com, linkedin.com, www.facebook.com, zalo.me |
| `stitch-export/blog-article/mobile/code.html` | 7 | cdn.tailwindcss.com, fonts.googleapis.com, fonts.gstatic.com, lh3.googleusercontent.com |
| `stitch-export/course-detail/desktop/code.html` | 11 | cdn.tailwindcss.com, fonts.googleapis.com, fonts.gstatic.com, lh3.googleusercontent.com, zalo.me |
| `stitch-export/course-detail/mobile/code.html` | 7 | cdn.tailwindcss.com, fonts.googleapis.com, fonts.gstatic.com, lh3.googleusercontent.com |
| `stitch-export/lead-crm/desktop/code.html` | 0 | cdn.tailwindcss.com, fonts.googleapis.com, fonts.gstatic.com |
| `stitch-export/lead-crm/mobile/code.html` | 0 | cdn.tailwindcss.com, fonts.googleapis.com, fonts.gstatic.com |
| `stitch-export/homepage/desktop/code.html` | 22 | cdn.tailwindcss.com, fonts.googleapis.com, fonts.gstatic.com, lh3.googleusercontent.com |
| `stitch-export/homepage/mobile/code.html` | 17 | cdn.tailwindcss.com?plugins=forms,container-queries, fonts.googleapis.com, fonts.gstatic.com, lh3.googleusercontent.com, maps.google.com, zalo.me |

## Brand assets

`assets/brand/*.png` are raster references extracted from Stitch inputs. They are not guaranteed to be original vector/logo master files. Prefer official IVS source assets when available.

## Production rule

Do not ship Stitch-hosted imagery or CDN Tailwind by accident. Add an asset-replacement check before deployment.
