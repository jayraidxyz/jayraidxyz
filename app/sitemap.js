import { getSiteUrl } from "@/lib/siteUrl";

export const dynamic = "force-static";

export default function sitemap() {
  const base = getSiteUrl();
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}