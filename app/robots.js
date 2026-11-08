import { getSiteUrl } from "@/lib/siteUrl";

export const dynamic = "force-static";

export default function robots() {
  const base = getSiteUrl();
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${base}/sitemap.xml`,
  };
}