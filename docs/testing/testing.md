# Testing Strategy & Quality Verification

**Test Runner**: Vitest  
**Compiler**: TypeScript 5.7+ (`tsc --noEmit`)  
**Linter**: ESLint with Next.js recommended config  

---

## 1. Test Suite Breakdown

### 1.1 Validation & Anti-Spam (`tests/validation.test.ts`)
- Legitimate Vietnamese mobile phone regex testing (`03x`, `05x`, `07x`, `08x`, `09x`).
- Rejection of invalid lengths, non-numeric strings, and deprecated prefixes.
- Mandatory consent under Decree 13/2023/ND-CP.
- Honeypot bot trapping verification.

### 1.2 Role-Based Access Control (`tests/rbac.test.ts`)
- Wildcard permission evaluation for `SUPER_ADMIN`.
- Restricted permissions for `CONSULTANT` (lead reading/updating without course/user mutation).
- Content management permissions for `CONTENT_EDITOR`.

### 1.3 Sliding Window Rate Limiter (`tests/rate-limit.test.ts`)
- Verification that requests within the window limit succeed.
- Verification that requests exceeding the limit are blocked with exact retry-after calculation.

---

## 2. Running Automated Verifications

```bash
# 1. Run Vitest test suite
npm test

# 2. Strict typechecking
npm run typecheck

# 3. Production build validation
npm run build
```
