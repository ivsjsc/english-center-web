import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://ivs.edu.vn";
const SITE_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || "IVS Academy";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonicalPath?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description = "IVS Academy — Hệ thống đào tạo Anh ngữ và Kỹ năng Quốc tế. Các khóa học tiếng Anh mầm non, tiểu học, thiếu niên, luyện thi IELTS và giao tiếp công sở.",
  keywords = ["tiếng Anh trẻ em", "luyện thi IELTS", "tiếng Anh giao tiếp", "IVS Academy", "trung tâm tiếng Anh uy tín"],
  image = "/images/og-default.jpg",
  canonicalPath = "",
  noIndex = false,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Đào Tạo Ngoại Ngữ & Kỹ Năng Quốc Tế`;
  const url = `${BASE_URL}${canonicalPath}`;

  return {
    metadataBase: new URL(BASE_URL),
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "vi_VN",
      type: "website",
      images: [
        {
          url: image.startsWith("http") ? image : `${BASE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.startsWith("http") ? image : `${BASE_URL}${image}`],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
  };
}

// JSON-LD Structured Data Generators

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SITE_NAME,
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description: "Hệ thống trung tâm đào tạo Ngoại ngữ & Kỹ năng tại Việt Nam.",
    telephone: "1900 6886",
    email: "contact@ivs.edu.vn",
    address: {
      "@type": "PostalAddress",
      streetAddress: "189 Nguyễn Thị Minh Khai",
      addressLocality: "Quận 1",
      addressRegion: "Hồ Chí Minh",
      postalCode: "700000",
      addressCountry: "VN",
    },
    sameAs: [
      "https://facebook.com/ivsacademy",
      "https://youtube.com/@ivsacademy",
    ],
  };
}

export function generateCourseSchema(course: {
  name: string;
  description: string;
  slug: string;
  duration: string;
  featuredImage: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      sameAs: BASE_URL,
    },
    image: course.featuredImage,
    courseCode: course.slug,
    timeRequired: course.duration,
  };
}

export function generateLocalBusinessSchema(center: {
  name: string;
  address: string;
  phone: string;
  latitude?: number | null;
  longitude?: number | null;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "EducationalOrganization"],
    name: center.name,
    url: `${BASE_URL}/centers/${center.slug}`,
    telephone: center.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: center.address,
      addressCountry: "VN",
    },
    geo: center.latitude && center.longitude ? {
      "@type": "GeoCoordinates",
      latitude: center.latitude,
      longitude: center.longitude,
    } : undefined,
  };
}

export function generateArticleSchema(article: {
  title: string;
  excerpt: string;
  slug: string;
  featuredImage: string;
  authorName?: string;
  publishedAt: Date;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    author: {
      "@type": "Person",
      name: article.authorName || "Ban Chuyên Môn IVS",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    datePublished: article.publishedAt.toISOString(),
    url: `${BASE_URL}/blog/${article.slug}`,
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
