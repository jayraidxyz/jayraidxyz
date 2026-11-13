import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PostMedia from "@/components/PostMedia";
import { library, formatDate, typeColors } from "@/data/library";
import { auth } from "@/auth";

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
    twitter: { card: "summary_large_image", title: post.title, description: post.summary, images: [`/library/${post.cover}`] },
  };
}

function Block({ b }) {
  if (b.h) return <h2 className="mt-10 text-2xl font-bold first:mt-0">{b.h}</h2>;
  if (b.p) return <p className="mt-4 text-lg leading-relaxed text-white/85">{b.p}</p>;
  if (b.ul)
    return (
      <ul className="mt-4 space-y-3">
        {b.ul.map((li) => (
          <li key={li} className="flex gap-3 text-lg leading-relaxed text-white/90">
            <span className="mt-3 h-2 w-2 shrink-0 rounded-sm bg-accent" aria-hidden="true" />
            <span>{li}</span>
          </li>
        ))}
      </ul>
    );
  if (b.note)
    return (
      <p className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-relaxed text-muted">
        {b.note}
      </p>
    );
  return null;
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const session = await auth();
  if (!session) redirect(`/signin?callbackUrl=${encodeURIComponent(`/library/${slug}`)}`);

  const idx = library.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const post = library[idx];
  const newer = library[idx - 1];
  const older = library[idx + 1];

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <Link href="/resources#library" className="text-sm text-muted hover:text-white">
          ← All resources
        </Link>

        <header className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-md border px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.14em] ${typeColors[post.type]}`}>
              {post.type.toUpperCase()}
            </span>
            <span className="font-mono text-xs text-muted">
              {formatDate(post.date)} · {post.readMinutes} min read
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-[1.1] sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-xl text-muted">{post.summary}</p>
          <ul className="mt-5 flex flex-wrap gap-2 font-mono text-[11px] text-muted">
            {post.tags.map((t) => (
              <li key={t} className="rounded-md border border-white/10 px-2.5 py-1">
                {t}
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[400px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <PostMedia post={post} />
          </aside>

          <article className="max-w-2xl">
            {post.body.map((b, i) => (
              <Block key={i} b={b} />
            ))}

            {post.sources.length ? (
              <section className="mt-12 border-t border-white/10 pt-8" aria-labelledby="sources">
                <h2 id="sources" className="font-mono text-xs font-bold tracking-[0.18em] text-cyan">
                  SOURCES
                </h2>
                <ul className="mt-4 space-y-3">
                  {post.sources.map((s) => (
                    <li key={s.href}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/90 underline decoration-white/30 underline-offset-4 transition hover:text-cyan hover:decoration-cyan"
                      >
                        {s.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {post.captions.length ? (
              <section className="mt-10" aria-labelledby="captions">
                <h2 id="captions" className="font-mono text-xs font-bold tracking-[0.18em] text-cyan">
                  HOW I POSTED IT
                </h2>
                <div className="mt-4 space-y-3">
                  {post.captions.map((c) => (
                    <details key={c.platform} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                      <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                        {c.platform} caption
                        <span className="text-cyan transition group-open:rotate-45" aria-hidden="true">
                          +
                        </span>
                      </summary>
                      <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-muted">{c.text}</p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </article>
        </div>

        <nav aria-label="More posts" className="mt-16 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-2">
          {[
            [newer, "← Newer"],
            [older, "Older →"],
          ].map(([p, label], k) =>
            p ? (
              <Link
                key={p.slug}
                href={`/library/${p.slug}`}
                className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan/50 ${
                  k === 1 ? "sm:text-right" : ""
                }`}
              >
                <p className="font-mono text-xs text-muted">{label}</p>
                <p className="mt-2 font-bold">{p.title}</p>
              </Link>
            ) : (
              <div key={label} />
            )
          )}
        </nav>
      </main>
      <Footer />
    </>
  );
}
