import Link from "next/link";
import { redirect } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import LibraryGrid from "@/components/LibraryGrid";
import { resources } from "@/data/resources";
import { library, notesPost, formatDate, typeColors } from "@/data/library";
import { auth, signOut } from "@/auth";

export const metadata = {
  title: "Resources | jayraidxyz",
  description:
    "Explainers, carousels and tools from my Web3 learning journey. Testnet-first, no hype, affiliate links clearly labelled.",
};

function FeaturedPost({ post }) {
  return (
    <article className="group relative grid overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-accent/20 via-panel to-ink md:grid-cols-[0.8fr_1.2fr]">
      <Link href={`/library/${post.slug}`} className="absolute inset-0 z-10" aria-label={`Read: ${post.title}`} />
      <div className="dotgrid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative aspect-[4/5] max-h-[460px] w-full overflow-hidden md:aspect-auto md:max-h-none">
        <img
          src={`/library/${post.cover}`}
          alt=""
          loading="eager"
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03] md:object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-panel/80" aria-hidden="true" />
      </div>
      <div className="relative flex flex-col justify-center p-7 sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-md border border-cyan/40 bg-cyan/10 px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.14em] text-cyan">
            LATEST
          </span>
          <span className={`rounded-md border px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.14em] ${typeColors[post.type]}`}>
            {post.type.toUpperCase()}
          </span>
          <span className="font-mono text-[11px] text-muted">
            {formatDate(post.date)} · {post.readMinutes} min read
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h2>
        <p className="mt-4 text-lg text-muted">{post.summary}</p>
        <span className="mt-7 inline-flex w-fit items-center rounded-full bg-accent px-6 py-3 font-medium text-white transition group-hover:bg-[#6470ff]">
          {post.video ? "Watch and read" : "Read"} →
        </span>
      </div>
    </article>
  );
}

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}

export default async function ResourcesPage() {
  const session = await auth();
  if (!session) redirect("/signin?callbackUrl=/resources");

  const [featured, ...rest] = library;

  return (
    <>
      <Nav />
      <main>
        <header className="relative overflow-hidden border-b border-white/10">
          <div className="dotgrid absolute inset-0" aria-hidden="true" />
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-12 sm:pt-16">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link href="/" className="text-sm text-muted hover:text-white">
                ← Back home
              </Link>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="text-muted">{session.user?.email}</span>
                <form action={signOutAction}>
                  <button type="submit" className="text-cyan transition hover:text-white">
                    Sign out
                  </button>
                </form>
              </div>
            </div>
            <p className="mt-8 font-mono text-xs font-bold tracking-[0.18em] text-cyan">RESOURCES</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
              The library.{" "}
              <span className="bg-gradient-to-r from-cyan to-accent bg-clip-text text-transparent">Learn it with me.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted sm:text-xl">
              Every explainer, carousel and video I publish, plus the tools I actually use. Testnet-first, no hype.
            </p>
            <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-3 font-mono text-xs">
              {[
                ["#library", "Library"],
                ["#notes", "Free notes"],
                ["#tools", "Tools"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="rounded-full border border-white/15 px-4 py-2 text-muted transition hover:border-cyan hover:text-white"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <section id="library" className="mx-auto max-w-6xl px-5 py-16">
          <FeaturedPost post={featured} />
          <div className="mt-14">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="text-2xl font-bold sm:text-3xl">All posts</h2>
              <p className="font-mono text-xs text-muted">{library.length} posts</p>
            </div>
            <LibraryGrid posts={library} />
          </div>
        </section>

        <section id="notes" className="border-y border-white/10 bg-panel/60">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-14 md:grid-cols-[1fr_auto]">
            <div>
              <p className="font-mono text-xs font-bold tracking-[0.18em] text-cyan">FREE DOWNLOAD</p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{notesPost.title}</h2>
              <p className="mt-3 max-w-2xl text-muted">{notesPost.summary}</p>
            </div>
            <a
              href={notesPost.href}
              download
              className="w-fit rounded-full bg-accent px-7 py-3.5 font-medium text-white transition hover:bg-[#6470ff]"
            >
              Download the PDF
            </a>
          </div>
        </section>

        <section id="tools" className="mx-auto max-w-6xl px-5 py-16">
          <p className="font-mono text-xs font-bold tracking-[0.18em] text-cyan">TOOLS</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Tools I actually use</h2>

          <div className="mt-6 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-relaxed text-muted">
            <strong className="text-white">Disclosure:</strong> I only list tools I use. If a link is an affiliate link, it is
            marked below, and I may earn a commission at no extra cost to you. I never put exchange or trading-bot referral
            links here. Nothing on this page is financial advice.
          </div>

          <div className="mt-10 space-y-12">
            {resources.map((g) => (
              <div key={g.group}>
                <h3 className="font-mono text-sm font-bold tracking-wide text-white/90">{g.group}</h3>
                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {g.items.map((r) => (
                    <li key={r.name}>
                      <a
                        href={r.href}
                        target="_blank"
                        rel={r.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
                        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-white/[0.05]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-lg font-bold">{r.name}</p>
                          <span className="text-cyan transition group-hover:translate-x-0.5" aria-hidden="true">
                            ↗
                          </span>
                        </div>
                        <p className="mt-2 flex-1 text-sm text-muted">{r.note}</p>
                        {r.affiliate ? (
                          <span className="mt-4 w-fit rounded-md border border-cyan/40 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan">
                            AFFILIATE LINK
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
