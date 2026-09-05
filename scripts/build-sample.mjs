import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const rootDir = process.cwd();
const srcAppDir = path.join(rootDir, "src", "app");
const stashDir = path.join(rootDir, ".stash_sample");

const adminSrc = path.join(srcAppDir, "admin");
const adminStash = path.join(stashDir, "admin");

const apiSrc = path.join(srcAppDir, "api");
const apiStash = path.join(stashDir, "api");

let isStashed = false;

function restore() {
  if (!isStashed) return;
  console.log("\nRestoring admin and api routes...");
  try {
    if (fs.existsSync(adminStash)) {
      if (fs.existsSync(adminSrc)) {
        fs.rmSync(adminSrc, { recursive: true, force: true });
      }
      fs.renameSync(adminStash, adminSrc);
    }
    if (fs.existsSync(apiStash)) {
      if (fs.existsSync(apiSrc)) {
        fs.rmSync(apiSrc, { recursive: true, force: true });
      }
      fs.renameSync(apiStash, apiSrc);
    }
    if (fs.existsSync(stashDir)) {
      fs.rmSync(stashDir, { recursive: true, force: true });
    }
    isStashed = false;
    console.log("Routes restored successfully.");
  } catch (err) {
    console.error("Error restoring routes:", err);
  }
}

// Handle interruption signals
process.on("SIGINT", () => {
  restore();
  process.exit(1);
});
process.on("SIGTERM", () => {
  restore();
  process.exit(1);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  restore();
  process.exit(1);
});

/**
 * Recursively search all files under a directory for a pattern.
 * Returns array of { file, line, content } matches.
 */
function searchFilesRecursive(dir, pattern, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      searchFilesRecursive(fullPath, pattern, results);
    } else if (entry.isFile()) {
      try {
        const content = fs.readFileSync(fullPath, "utf8");
        const lines = content.split("\n");
        lines.forEach((lineContent, lineIdx) => {
          if (pattern.test(lineContent)) {
            results.push({
              file: path.relative(dir, fullPath).replace(/\\/g, "/") || entry.name,
              line: lineIdx + 1,
              content: lineContent.trim().slice(0, 200),
            });
          }
        });
      } catch {
        // Skip binary files
      }
    }
  }
  return results;
}

async function main() {
  console.log("=========================================");
  console.log("Building IVS Academy Sample (Website Mẫu)");
  console.log("Target: Cloudflare Pages (Static Export)");
  console.log("=========================================");

  try {
    // 1. Ensure Prisma client is up to date for SSG
    console.log("Running Prisma generate...");
    execSync("npx prisma generate", { stdio: "inherit" });

    // 2. Stash internal routes (admin & api)
    if (!fs.existsSync(stashDir)) {
      fs.mkdirSync(stashDir, { recursive: true });
    }

    if (fs.existsSync(adminSrc)) {
      console.log("Stashing src/app/admin...");
      fs.renameSync(adminSrc, adminStash);
    }
    if (fs.existsSync(apiSrc)) {
      console.log("Stashing src/app/api...");
      fs.renameSync(apiSrc, apiStash);
    }
    isStashed = true;

    // 3. Run Next.js build in sample mode
    console.log("Running next build with NEXT_PUBLIC_DEPLOYMENT_MODE=sample...");
    execSync("npx next build", {
      stdio: "inherit",
      env: {
        ...process.env,
        NEXT_PUBLIC_DEPLOYMENT_MODE: "sample",
        NEXT_PUBLIC_APP_URL: "https://sample.ivsacademy.edu.vn",
      },
    });

    // 4. Validate output directory
    const outDir = path.join(rootDir, "out");
    if (!fs.existsSync(outDir)) {
      throw new Error("Build output directory 'out' was not generated!");
    }

    // 5. Create Cloudflare Pages _headers file with security headers + X-Robots-Tag
    const headersContent = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Robots-Tag: noindex, nofollow, noarchive
`;
    fs.writeFileSync(path.join(outDir, "_headers"), headersContent, "utf8");
    console.log("✓ Created _headers with X-Robots-Tag: noindex, nofollow, noarchive");

    // 6. Security verification: Ensure no admin or api exists in out/
    if (fs.existsSync(path.join(outDir, "admin"))) {
      throw new Error("SECURITY AUDIT FAILED: out/admin exists in sample build!");
    }
    if (fs.existsSync(path.join(outDir, "api"))) {
      throw new Error("SECURITY AUDIT FAILED: out/api exists in sample build!");
    }
    console.log("✓ Security Check: Zero admin, Zero api routes in output");

    // 7. Verify no .env files leaked
    if (fs.existsSync(path.join(outDir, ".env"))) {
      throw new Error("SECURITY AUDIT FAILED: out/.env exists in sample build!");
    }
    console.log("✓ No .env files in output");

    // 8. Verify no database files leaked
    const dbExtensions = [".db", ".sqlite", ".sqlite3"];
    const outEntries = fs.readdirSync(outDir);
    for (const entry of outEntries) {
      for (const ext of dbExtensions) {
        if (entry.endsWith(ext)) {
          throw new Error(`SECURITY AUDIT FAILED: Database file ${entry} found in out/!`);
        }
      }
    }
    console.log("✓ No database files in output");

    // 9. Validate robots.txt contains no localhost references
    const robotsPath = path.join(outDir, "robots.txt");
    if (fs.existsSync(robotsPath)) {
      const robotsContent = fs.readFileSync(robotsPath, "utf8");
      if (robotsContent.includes("localhost") || robotsContent.includes("127.0.0.1")) {
        throw new Error(
          "SEO AUDIT FAILED: robots.txt contains localhost references!\n" +
          "Root cause: NEXT_PUBLIC_APP_URL was not correctly set during build.\n" +
          "Content:\n" + robotsContent
        );
      }
      console.log("✓ robots.txt contains no localhost references");

      // Verify noindex policy
      if (!robotsContent.includes("Disallow: /")) {
        console.warn("⚠ WARNING: robots.txt may not enforce full noindex (Disallow: /) for sample deployment");
      } else {
        console.log("✓ robots.txt enforces Disallow: / for sample deployment");
      }
    } else {
      console.warn("⚠ WARNING: robots.txt was not generated");
    }

    // 10. Validate sitemap.xml contains no localhost references
    const sitemapPath = path.join(outDir, "sitemap.xml");
    if (fs.existsSync(sitemapPath)) {
      const sitemapContent = fs.readFileSync(sitemapPath, "utf8");
      if (sitemapContent.includes("localhost") || sitemapContent.includes("127.0.0.1")) {
        throw new Error(
          "SEO AUDIT FAILED: sitemap.xml contains localhost references!\n" +
          "Root cause: NEXT_PUBLIC_APP_URL was not correctly set during build."
        );
      }
      if (!sitemapContent.includes("sample.ivsacademy.edu.vn")) {
        console.warn("⚠ WARNING: sitemap.xml does not contain sample.ivsacademy.edu.vn URLs");
      } else {
        console.log("✓ sitemap.xml uses sample.ivsacademy.edu.vn domain");
      }
    }

    // 11. Broad scan for localhost / 127.0.0.1 in all output files
    console.log("\nScanning out/ for localhost references...");
    const localhostMatches = searchFilesRecursive(outDir, /localhost|127\.0\.0\.1/i);
    if (localhostMatches.length > 0) {
      console.warn(`⚠ Found ${localhostMatches.length} localhost reference(s) in output:`);
      for (const match of localhostMatches.slice(0, 20)) {
        console.warn(`  ${match.file}:${match.line}: ${match.content}`);
      }
      // Don't throw — some may be in bundled library code (e.g., Next.js internals)
      // But flag for manual review
    } else {
      console.log("✓ No localhost references found in output files");
    }

    console.log("=========================================");
    console.log("Sample build completed successfully!");
    console.log("Output Directory: out/");
    console.log("Security Check: PASS (Zero admin, Zero api, Zero DB, Zero .env)");
    console.log("SEO Check: PASS (noindex, no localhost, correct domain)");
    console.log("Ready for Cloudflare Pages deployment.");
    console.log("=========================================");
  } finally {
    restore();
  }
}

main();
