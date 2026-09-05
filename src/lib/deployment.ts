/**
 * Centralized deployment mode helper.
 * Checks if the application is running in "sample" deployment mode (Website Mẫu).
 */
export function isSampleDeployment(): boolean {
  return process.env.NEXT_PUBLIC_DEPLOYMENT_MODE === "sample";
}
