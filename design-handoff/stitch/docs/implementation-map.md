# Stitch → Production Implementation Map

| Design family | Route | Suggested reusable pieces | Data/domain dependencies |
|---|---|---|---|
| Homepage | `/` | Header, Hero, TrustMetrics, CourseCard, CourseFinder, TeacherCard, AchievementCard, CenterCard, BlogCard, LeadForm, Footer | Course, Center, Teacher, Achievement, Testimonial, BlogPost, SiteSetting |
| Course Detail | `/courses/[slug]` | Breadcrumb, CourseHero, OutcomeGrid, Roadmap, CurriculumAccordion, TeacherCard, FAQ, LeadForm | Course, CourseLevel, Curriculum, Outcome, FAQ, Teacher |
| Centers | `/centers` | Search, Filters, CenterCard, Map/List shell, MapToggle | Center, CenterCourse |
| Blog Article | `/blog/[slug]` | Breadcrumb, ArticleHeader, TOC, RichContent, InlineCTA, FAQ, RelatedPosts | BlogPost, BlogCategory, BlogTag, Course |
| Lead CRM | `/admin/leads` | AdminNav, Metrics, Filters, LeadTable, LeadCard, StatusBadge, LeadDrawer, Timeline | Lead, LeadActivity, LeadAssignment, User/RBAC |

## Rule

Create/normalize shared design primitives first. Existing production components should be adapted rather than duplicated when their API is sound.
