# IVS Academy — Cloudflare Sample Deployment Runbook

**Target Public URL:** `https://sample.ivsacademy.edu.vn`  
**Cloudflare Project Name:** `ivs-academy-sample`  
**Deployment Target Type:** Cloudflare Pages (Static Edge Distribution)  
**Status:** VALIDATED FOR DEPLOYMENT  
**Date:** September 2026  

---

## 1. Selected Deployment Architecture

### Architecture Summary
The Website Mẫu review deployment utilizes **Cloudflare Pages Static Site Hosting (Option A / Option C Hybrid)**.

```mermaid
graph LR
    LocalDB[(Prisma SQLite<br/>Seed Data)] -->|Build-time SSG| NodeBuild[scripts/build-sample.mjs]
    NodeBuild -->|Pre-rendered Static HTML/CSS/JS| OutDir[out/ Static Assets]
    OutDir -->|Wrangler Pages Deploy| CloudflareCDN[Cloudflare Pages Edge CDN]
    CloudflareCDN --> Learner[Visitor / Stakeholder<br/>sample.ivsacademy.edu.vn]
    
    subgraph Excluded for Security
        AdminPortal[/admin & /admin/*]
        APIRoutes[/api/*]
        DBMutations[Prisma SQLite Writes]
    end
```

- **Build-Time Prerendering (SSG):** During `npm run build:sample`, Node.js queries the local development database to statically generate all approved public pages (Homepage, Courses, Centers, Teachers, Methodology, Achievements, Blog, News, About, Policies).
- **Static Artifacts (`out/`):** Produces purely static HTML, CSS, client JavaScript bundles, and optimized web assets.
- **Edge Delivery:** Assets are uploaded to Cloudflare's global edge network (Pages).
- **Zero Serverless/Node Runtime:** No Node.js server, No Workers Functions, No Prisma engine running on Cloudflare.

---

## 2. Why This Architecture Was Selected

1. **Zero Database Runtime Dependency:** Cloudflare Workers and Pages Functions do **not** provide a persistent POSIX filesystem. The existing application uses SQLite (`file:./dev.db`), which cannot run persistently or reliably on Cloudflare serverless edge. Static hosting completely eliminates SQLite runtime failure risks.
2. **Maximum Security & Anti-Leak Safeguard:** Internal CRM routes (`/admin`), login mechanisms, and backend API endpoints (`/api/*`) are completely stripped from the exported bundle. There is zero administrative surface, zero credential vulnerability, and zero danger of unauthorized data exfiltration.
3. **No PII Storage:** In sample mode, public forms (Consultation, Placement Test, Contact Inquiry) do not transmit or store lead data. They immediately return:
   > *“Đây là Website Mẫu. Chức năng gửi đăng ký sẽ được kích hoạt khi triển khai chính thức.”*
4. **Performance & Reliability:** Pure static assets served via Cloudflare's CDN offer sub-50ms global Time-To-First-Byte (TTFB), 99.99% availability, and zero operational server costs.

---

## 3. Alternatives Rejected

| Alternative | Evaluation & Why Rejected |
| :--- | :--- |
| **Option B: Cloudflare Workers + OpenNext** | **REJECTED.** OpenNext with Next.js 15, React 19, and Prisma SQLite requires complex shims. Because SQLite cannot write to persistent storage on Cloudflare edge workers, any database query at runtime would throw filesystem errors (`EBADF` / missing binary engine). Exposing broken backend routes is hazardous. |
| **Deploying full app to a Node.js VPS (e.g. Render / Fly.io / Railway)** | **REJECTED for Phase 4.** The user explicitly mandated a Cloudflare deployment for the review URL `https://sample.ivsacademy.edu.vn`. |

---

## 4. Cloudflare Configuration Details

- **Cloudflare Project Name:** `ivs-academy-sample`
- **Output Directory:** `out`
- **Configuration File:** `wrangler.jsonc`
- **Build Command:** `npm run build:sample`
- **Deployment Command:** `npm run deploy:sample`

---

## 5. Environment Variables

### In Sample Mode (`build:sample`):
| Variable | Value | Purpose |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_DEPLOYMENT_MODE` | `sample` | Activates sample safeguards across the app via `isSampleDeployment()`. |
| `NEXT_PUBLIC_APP_URL` | `https://sample.ivsacademy.edu.vn` | Canonical URL for sitemap and metadata. |
| `NEXT_PUBLIC_HOTLINE` | `1900 xxxx` | Safe neutral contact placeholder. |

---

## 6. Custom Domain Attachment Procedure

Do **NOT** guess or manually insert random CNAME targets. Cloudflare Pages automates custom domain SSL and DNS orchestration:

1. Deploy the project first using `npm run deploy:sample`.
2. Open the [Cloudflare Dashboard](https://dash.cloudflare.com/).
3. Navigate to: **Workers & Pages** → **Overview** → Select project **`ivs-academy-sample`**.
4. Click on the **Custom domains** tab.
5. Click **Set up a domain**.
6. Enter the target hostname:
   ```
   sample.ivsacademy.edu.vn
   ```
7. Click **Continue**.
8. Because `ivsacademy.edu.vn` is managed in Cloudflare DNS, Cloudflare will automatically provision the DNS record and generate the SSL/TLS certificate.
9. Domain verification completes within 1–3 minutes.

---

## 7. Rollback & Update Procedures

### To Deploy an Update:
```bash
npm run build:sample
npm run deploy:sample
```

### To Rollback a Deployment:
1. Open Cloudflare Dashboard → **Workers & Pages** → **`ivs-academy-sample`**.
2. Click on the **Deployments** tab.
3. Find the previous stable deployment in the list.
4. Click the three dots (`...`) on that deployment and select **Rollback to this deployment**.

---

## 8. Limitations of Sample Mode

1. **Admissions & Lead Forms:** Do not write leads to the CRM database. Users who submit forms will see the clear sample notification.
2. **Internal CRM Portal (`/admin`):** Completely disabled and excluded from the public build. Navigation links are hidden.
3. **Dynamic Content Updates:** Content changes require re-running `npm run build:sample` and `npm run deploy:sample` since static pages are pre-rendered at build time.
