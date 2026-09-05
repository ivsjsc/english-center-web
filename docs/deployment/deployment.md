# Deployment & Production Operations Guide

**Application**: AURA English Academy Platform  
**Target Environments**: Vercel / Cloudflare Pages / Node.js Standalone Docker  

---

## 1. Environment Configuration

Copy `.env.example` to `.env` and provide production secrets:

```bash
# Production PostgreSQL Connection (Supabase, Neon, AWS RDS)
DATABASE_URL="postgresql://db_user:db_password@db.example.com:5432/aura_prod?schema=public&sslmode=require"

# Minimum 32-character session encryption key
SESSION_SECRET="prod-session-key-super-secure-32chars-minimum-entropy!"

# Production Domain
NEXT_PUBLIC_APP_URL="https://aura.edu.vn"

# Operational Contact & Hotline
NEXT_PUBLIC_HOTLINE="1900 6886"
NEXT_PUBLIC_COMPANY_NAME="AURA English Academy"
NEXT_PUBLIC_ZALO_URL="https://zalo.me/auraenglish"
NEXT_PUBLIC_MESSENGER_URL="https://m.me/auraenglishacademy"

# Optional Cloudflare Turnstile
TURNSTILE_SECRET_KEY="0x4AAAAAA..."
NEXT_PUBLIC_TURNSTILE_SITE_KEY="0x4AAAAAA..."
```

---

## 2. Production Build Pipeline

```bash
# 1. Install dependencies
npm ci

# 2. Generate Prisma client & sync schema
npx prisma generate
npx prisma db push

# 3. Seed initial educational data (first deployment only)
npx tsx prisma/seed.ts

# 4. Run automated test suite
npm test

# 5. Compile production bundle
npm run build

# 6. Start production server
npm start
```

---

## 3. Docker Deployment (Standalone Container)

```dockerfile
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```
