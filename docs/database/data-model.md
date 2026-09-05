# Data Model & Schema Documentation

**Database Provider**: PostgreSQL (compatible with SQLite for zero-config local testing)  
**ORM**: Prisma ORM  

---

## 1. Entity-Relationship Overview

```
User (1) ──── (N) LeadActivity
User (1) ──── (N) Lead [Assigned Consultant]
CourseCategory (1) ──── (N) Course
Course (1) ──── (N) CourseCurriculum
Course (1) ──── (N) CourseOutcome
Course (1) ──── (N) CourseFAQ
Course (1) ──── (N) Lead
Center (1) ──── (N) CenterImage
Center (1) ──── (N) Lead
Center (1) ──── (N) PlacementTestBooking
Center (M) ──── (N) Course [via CenterCourse]
Teacher (M) ──── (N) Course [via TeacherCourse]
Teacher (1) ──── (N) TeacherQualification
Lead (1) ──── (N) LeadActivity
BlogCategory (1) ──── (N) BlogPost
```

---

## 2. Table Schemas & Key Fields

### 2.1 Lead CRM Domain
- **`Lead`**:
  - `id`: CUID primary key
  - `fullName`: Student / Parent name
  - `phone`: Mobile phone (Vietnamese standard)
  - `email`: Optional email address
  - `studentAge`: Age of learner
  - `courseId`, `centerId`: Foreign keys
  - `status`: `NEW`, `CONTACTED`, `APPOINTMENT`, `PLACEMENT_TEST`, `ENROLLED`, `LOST`
  - `UTMSource`, `UTMMedium`, `UTMCampaign`, `UTMContent`, `UTMTerm`: Marketing attribution
  - `assignedUserId`: Consultant in charge
  - `createdAt`, `updatedAt`: Auto timestamps
  - **Indexes**: `[phone]`, `[status]`, `[createdAt]`, `[courseId]`, `[centerId]`, `[assignedUserId]`

- **`LeadActivity`**:
  - `id`, `leadId`, `userId`: References
  - `action`: `LEAD_CREATED`, `STATUS_CHANGE`, `CONSULTANT_ASSIGNED`, `NOTE_ADDED`
  - `previousStatus`, `newStatus`: Pipeline change tracking
  - `note`: Consultant notes
  - `createdAt`: Timestamp
  - **Indexes**: `[leadId]`, `[createdAt]`

### 2.2 Course Domain
- **`Course`**:
  - `id`, `slug` (unique), `name`, `shortDescription`, `description`
  - `categoryId`: Foreign key to `CourseCategory`
  - `targetAudience`, `minimumAge`, `maximumAge`
  - `level`, `CEFRLevel` (`Pre-A1` - `C1`)
  - `duration`, `numberOfSessions`, `teachingMethod`, `classSize`
  - `featuredImage`, `status`, `featured`, `ctaText`, `seoTitle`, `seoDescription`
  - **Indexes**: `[slug]`, `[status]`, `[categoryId]`, `[minimumAge, maximumAge]`

### 2.3 Center Domain
- **`Center`**:
  - `id`, `slug` (unique), `name`, `province`, `district`, `ward`, `address`
  - `latitude`, `longitude`: Geo coordinates
  - `phone`, `email`, `openingHours`, `description`, `facilities`, `GoogleMapsURL`
  - `active`: Boolean flag
  - **Indexes**: `[slug]`, `[province]`, `[district]`, `[active]`

---

## 3. Database Migrations & Seeds

```bash
# Push schema changes
npx prisma db push

# Run realistic demo seed
npx tsx prisma/seed.ts

# Open Prisma Studio GUI
npx prisma studio
```
