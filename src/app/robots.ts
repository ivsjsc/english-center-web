import { MetadataRoute } from "next";
import { isSampleDeployment } from "@/lib/deployment";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ivs.edu.vn";
  const isSample = isSampleDeployment();

  if (isSample) {
    // Sample deployment (Website Mẫu): MUST NOT be indexed by search engines.
    // Demo/placeholder content — noindex, nofollow, noarchive.
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
      sitemap: `${baseUrl}/sitemap.xml`,
    };
  }

  // Production: standard crawl policy
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
