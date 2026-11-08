// Base URL for metadata, sitemap and OG tags.
// Set SITE_URL once you have a domain (e.g. https://jayraidxyz.com).
// Falls back to Vercel's production URL, then localhost.
export function getSiteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}
