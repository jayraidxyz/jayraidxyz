import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/700.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import { site } from "@/data/site";
import { getSiteUrl } from "@/lib/siteUrl";

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: `${site.handle} | Web + mobile developer, learning Web3 in public`,
  description: `${site.heroLine1} ${site.heroLine2} ${site.sub}`,
  openGraph: {
    title: `${site.handle} | Web + mobile developer`,
    description: `${site.heroLine1} ${site.heroLine2}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.handle} | Web + mobile developer`,
    description: `${site.heroLine1} ${site.heroLine2}`,
  },
};

export const viewport = {
  themeColor: "#0B0E14",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-ink font-sans text-white antialiased">{children}</body>
    </html>
  );
}
