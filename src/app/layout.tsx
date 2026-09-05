import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "@/styles/globals.css";
import { constructMetadata, generateOrganizationSchema } from "@/lib/seo";
import { isSampleDeployment } from "@/lib/deployment";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();
  const isSample = isSampleDeployment();

  return (
    <html lang="vi" className={beVietnamPro.variable}>
      <head>
        {/* Organization JSON-LD — sanitized in sample mode (no fake contact data) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {isSample && (
          <meta name="robots" content="noindex, nofollow, noarchive" />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8F9FF] text-slate-800 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
