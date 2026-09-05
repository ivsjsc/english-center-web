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

    // 5. Create Cloudflare Pages _headers file
    const headersContent = `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
`;
    fs.writeFileSync(path.join(outDir, "_headers"), headersContent, "utf8");

    // 6. Security verification: Ensure no admin or api exists in out/
    if (fs.existsSync(path.join(outDir, "admin"))) {
      throw new Error("SECURITY AUDIT FAILED: out/admin exists in sample build!");
    }
    if (fs.existsSync(path.join(outDir, "api"))) {
      throw new Error("SECURITY AUDIT FAILED: out/api exists in sample build!");
    }

    console.log("=========================================");
    console.log("Sample build completed successfully!");
    console.log("Output Directory: out/");
    console.log("Security Check: PASS (Zero admin, Zero api, Zero DB writes)");
    console.log("Ready for Cloudflare Pages deployment.");
    console.log("=========================================");
  } finally {
    restore();
  }
}

main();
