# Security & Privacy Model Documentation

**Compliance Standard**: Vietnam Personal Data Protection Decree 13/2023/ND-CP  
**Security Posture**: Zero-Trust Server Enforcement  

---

## 1. Threat Mitigation Strategies

### 1.1 Lead Data Protection (PII)
- **Encryption in Transit**: Strict HTTPS with HSTS headers.
- **Access Control**: Lead details (phone numbers, emails, addresses, minor student ages) are only viewable by authorized roles (`SUPER_ADMIN`, `ADMIN`, `CONSULTANT`, `CENTER_MANAGER`).
- **Decree 13/2023/ND-CP Compliance**:
  - Explicit consent opt-in checkbox required on all lead registration and placement test forms.
  - Transparent Privacy Policy and Personal Data Protection Policy accessible at `/privacy` and `/personal-data-policy`.
  - Immutable activity history tracking consultant views and status modifications.

### 1.2 Anti-Spam & Bot Mitigation
1. **Honeypot Trap**: Invisible field `honeypot` hidden from real users. Any automated bot filling this input receives a dummy success response while the payload is immediately dropped without database pollution.
2. **Sliding-Window IP Rate Limiter**: Maximum 10 submissions per 15-minute sliding window per IP address, preventing denial-of-service or form flooding.
3. **Vietnamese Mobile Regex**: Strict validation requiring standard 10-digit format starting with `03`, `05`, `07`, `08`, `09`.

### 1.3 Session Security & RBAC
- **Token Management**: `jose` HS256 JWT tokens signed with a 32+ byte secret.
- **Cookie Security**:
  - `httpOnly: true` (inaccessible to JavaScript, immune to XSS token theft).
  - `secure: true` (only transmitted over HTTPS in production).
  - `sameSite: "lax"` (mitigating CSRF attacks).
- **Server-Side Enforcement**: Authorization checks (`hasPermission`) execute on every API route and server action. The frontend UI visibility is never trusted alone.

### 1.4 HTTP Security Headers
Configured in `next.config.ts`:
- `X-Frame-Options: DENY` (prevents clickjacking)
- `X-Content-Type-Options: nosniff` (prevents MIME sniffing)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
