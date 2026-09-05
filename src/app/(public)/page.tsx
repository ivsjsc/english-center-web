import React from "react";
import { prisma } from "@/lib/prisma";
import { HeroSection } from "@/components/public/homepage/HeroSection";
import { TrustMetrics } from "@/components/public/homepage/TrustMetrics";
import { CourseDiscovery } from "@/components/public/homepage/CourseDiscovery";
import { CourseFinderSection } from "@/components/public/homepage/CourseFinderSection";
import { WhyChooseUs } from "@/components/public/homepage/WhyChooseUs";
import { LearningMethod } from "@/components/public/homepage/LearningMethod";
import { TeacherShowcase } from "@/components/public/homepage/TeacherShowcase";
import { StudentAchievements } from "@/components/public/homepage/StudentAchievements";
import { Testimonials } from "@/components/public/homepage/Testimonials";
import { LearningEcosystem } from "@/components/public/homepage/LearningEcosystem";
import { CenterFinderSection } from "@/components/public/homepage/CenterFinderSection";
import { LatestBlogPosts } from "@/components/public/homepage/LatestBlogPosts";
import { ConsultationCTA } from "@/components/public/homepage/ConsultationCTA";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  canonicalPath: "",
});

export const revalidate = 60; // ISR revalidation every 60s

export default async function HomePage() {
  const [
    categories,
    courses,
    teachers,
    centers,
    achievements,
    testimonials,
    blogPosts,
  ] = await Promise.all([
    prisma.courseCategory.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, slug: true, name: true },
    }),
    prisma.course.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { slug: true, name: true } },
        outcomes: { select: { description: true }, orderBy: { orderIndex: "asc" } },
      },
    }),
    prisma.teacher.findMany({
      where: { active: true },
      orderBy: { yearsExperience: "desc" },
      include: {
        qualifications: { select: { name: true, issuer: true } },
      },
    }),
    prisma.center.findMany({
      where: { active: true },
      orderBy: { province: "asc" },
    }),
    prisma.studentAchievement.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.testimonial.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: {
        category: { select: { name: true, slug: true } },
      },
    }),
  ]);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <TrustMetrics />
      <CourseDiscovery categories={categories} courses={courses} />
      <CourseFinderSection />
      <WhyChooseUs />
      <LearningMethod />
      <TeacherShowcase teachers={teachers} />
      <StudentAchievements achievements={achievements} />
      <Testimonials testimonials={testimonials} />
      <LearningEcosystem />
      <CenterFinderSection centers={centers} />
      <LatestBlogPosts posts={blogPosts} />
      <ConsultationCTA />
    </div>
  );
}
