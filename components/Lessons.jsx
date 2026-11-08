import { posts } from "@/data/posts";
import { site } from "@/data/site";
import SectionHead from "./SectionHead";
import Coin from "./Coin";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-11-07" -> "Nov 7, 2026". Done by hand so server and browser always agree.
function formatDate(iso) {
  const [y, m, d] = String(iso).split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

// Works out the platform and @handle from the post URL.
function describe(href) {
  let url;
  try {
    url = new URL(href);
  } catch {
    return { platform: "web", handle: site.handle, label: "View post" };
  }
  const host = url.hostname.replace(/^www\./, "");
  if (host === "x.com" || host === "twitter.com") {
    const handle = url.pathname.split("/")[1] || site.handle;
    return { platform: "x", handle, label: "View on X" };
  }
  if (host.endsWith("tiktok.com")) {
    const handle = (url.pathname.split("/")[1] || "").replace(/^@/, "") || site.handle;
    return { platform: "tiktok", handle, label: "View on TikTok" };
  }
  return { platform: "web", handle: site.handle, label: "View post" };
}

function XLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export default function Lessons() {
  if (!posts.length) return null; // hidden until you add lessons in data/posts.js

  return (
    <section id="lessons" className="mx-auto max-w-6xl px-5 py-20">
      <SectionHead kicker="05 · LATEST LESSONS" title="Fresh from the feed">
        Short lessons from my X and TikTok. Tap a card to open the original post.
      </SectionHead>

      <div className="grid gap-5 md:grid-cols-2">
        {posts.slice(0, 4).map((p) => {
          const { platform, handle, label } = describe(p.href);
          return (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title}, ${label}`}
              className="group flex flex-col rounded-2xl border border-white/10 bg-[#0d1117] p-5 transition hover:border-white/25 hover:bg-[#10151d] focus-visible:border-cyan"
            >
              {/* Header: avatar, name, handle, platform logo */}
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10 bg-ink p-1" aria-hidden="true">
                  <Coin className="h-full w-full" />
                </div>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate font-bold text-white">{site.handle}</p>
                  <p className="truncate text-sm text-muted">@{handle}</p>
                </div>
                {platform === "x" ? <XLogo className="h-5 w-5 shrink-0 text-white" /> : null}
                {platform === "tiktok" ? <TikTokLogo className="h-5 w-5 shrink-0 text-white" /> : null}
              </div>

              {/* Post text */}
              <p className="mt-4 flex-1 whitespace-pre-line text-[17px] leading-relaxed text-white/95">{p.text}</p>

              {/* Footer: date + view link */}
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                <time dateTime={p.date} className="text-muted">
                  {formatDate(p.date)}
                </time>
                <span className="font-medium text-cyan transition group-hover:translate-x-0.5">{label} →</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
