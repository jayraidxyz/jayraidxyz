import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthGate from "@/components/AuthGate";
import WatchReadStudio from "@/components/WatchReadStudio";
import { library, formatDate } from "@/data/library";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = library.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | jayraidxyz`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      images: [`/library/${post.cover}`],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [`/library/${post.cover}`],
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const idx = library.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();

  const post = library[idx];
  const newer = library[idx - 1];
  const older = library[idx + 1];

  return (
    <>
      <Nav />
      <AuthGate>
        <WatchReadStudio post={post} formattedDate={formatDate(post.date)} />
        <div className="border-t border-white/10 bg-[#060B16]">
          <nav
            aria-label="More posts"
            className="mx-auto grid max-w-6xl gap-4 px-5 py-12 sm:grid-cols-2"
          >
            {[
              [newer, "← Newer"],
              [older, "Older →"],
            ].map(([p, label], k) =>
              p ? (
                <Link
                  key={p.slug}
                  href={`/library/${p.slug}`}
                  className={`rounded-2xl border border-white/10 bg-[#0B1221] p-5 transition hover:border-cyan/50 ${
                    k === 1 ? "sm:text-right" : ""
                  }`}
                >
                  <p className="font-mono text-xs text-muted">{label}</p>
                  <p className="mt-2 font-bold text-white">{p.title}</p>
                </Link>
              ) : (
                <div key={label} />
              )
            )}
          </nav>
        </div>
      </AuthGate>
      <Footer />
    </>
  );
}
