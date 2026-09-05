import { prisma } from "./prisma";

export interface RecommendationCriteria {
  age?: number;
  currentLevel?: string; // "beginner" | "intermediate" | "advanced" | "all"
  learningGoal?: string; // "cambridge" | "ielts" | "communication" | "study_abroad" | "kids"
  learningFormat?: string; // "center" | "1on1" | "online"
  province?: string;
  centerId?: string;
}

export interface RecommendedCourseItem {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  targetAudience: string;
  minimumAge: number;
  maximumAge: number;
  level: string;
  duration: string;
  featuredImage: string;
  categoryName: string;
  categorySlug: string;
  matchScore: number;
  matchReason: string;
}

export async function courseRecommendationService(
  criteria: RecommendationCriteria
): Promise<RecommendedCourseItem[]> {
  const courses = await prisma.course.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      category: true,
      centerCourses: true,
    },
  });

  const scored = courses.map((course) => {
    let score = 50; // base score for active courses
    const reasons: string[] = [];

    // 1. Age suitability
    if (criteria.age !== undefined && criteria.age > 0) {
      if (criteria.age >= course.minimumAge && criteria.age <= course.maximumAge) {
        score += 40;
        reasons.push(`Tối ưu cho lứa tuổi ${criteria.age} tuổi`);
      } else if (
        criteria.age >= course.minimumAge - 1 &&
        criteria.age <= course.maximumAge + 1
      ) {
        score += 15;
      } else {
        score -= 30; // penalize mismatching age
      }
    }

    // 2. Learning goal match
    if (criteria.learningGoal) {
      const goal = criteria.learningGoal.toLowerCase();
      const slug = course.slug.toLowerCase();
      const catSlug = course.category.slug.toLowerCase();

      if (
        (goal === "ielts" && (slug.includes("ielts") || catSlug.includes("ielts"))) ||
        (goal === "cambridge" && (slug.includes("cambridge") || catSlug.includes("tieu-hoc"))) ||
        (goal === "kids" && (catSlug.includes("mam-non") || catSlug.includes("tieu-hoc"))) ||
        (goal === "communication" && (slug.includes("italk") || catSlug.includes("giao-tiep"))) ||
        (goal === "study_abroad" && (slug.includes("sat") || catSlug.includes("du-hoc")))
      ) {
        score += 45;
        reasons.push("Đúng trọng tâm mục tiêu học tập");
      }
    }

    // 3. Current Level match
    if (criteria.currentLevel && criteria.currentLevel !== "all") {
      const lvl = criteria.currentLevel.toLowerCase();
      const courseLvl = course.level.toLowerCase();
      if (courseLvl.includes(lvl) || (lvl === "beginner" && course.CEFRLevel?.includes("A1"))) {
        score += 20;
        reasons.push("Phù hợp với trình độ hiện tại");
      }
    }

    // 4. Learning format match
    if (criteria.learningFormat) {
      if (criteria.learningFormat === "1on1" && course.slug.includes("1-on-1")) {
        score += 35;
        reasons.push("Lớp kèm 1-kèm-1 theo yêu cầu");
      }
    }

    // 5. Featured priority
    if (course.featured) {
      score += 10;
    }

    const defaultReason = reasons.length > 0 ? reasons.join(" • ") : "Khóa học tiêu biểu chuẩn quốc tế";

    return {
      id: course.id,
      slug: course.slug,
      name: course.name,
      shortDescription: course.shortDescription,
      targetAudience: course.targetAudience,
      minimumAge: course.minimumAge,
      maximumAge: course.maximumAge,
      level: course.level,
      duration: course.duration,
      featuredImage: course.featuredImage,
      categoryName: course.category.name,
      categorySlug: course.category.slug,
      matchScore: score,
      matchReason: defaultReason,
    };
  });

  // Sort descending by matchScore
  return scored.sort((a, b) => b.matchScore - a.matchScore);
}
