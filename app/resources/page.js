import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { resources } from "@/data/resources";

export const metadata = {
  title: "Resources | jayraidxyz",
  description: "The tools I actually use to build and learn Web3, with affiliate links clearly labelled.",
};

export default function ResourcesPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-4xl px-5 py-16">
        <Link href="/" className="text-sm text-muted hover:text-white">
          ← Back home
        </Link>

        <p className="mt-8 font-mono text-xs font-bold tracking-[0.18em] text-cyan">RESOURCES</p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Tools I actually use</h1>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-relaxed text-muted">
          <strong className="text-white">Disclosure:</strong> I only list tools I use. If a link is an affiliate link, it is
          marked below, and I may earn a commission at no extra cost to you. I never put exchange or trading-bot referral links
          here. Nothing on this page is financial advice.
        </div>

        <div className="mt-12 space-y-12">
          {resources.map((g) => (
            <section key={g.group}>
              <h2 className="text-xl font-bold">{g.group}</h2>
              <ul className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10">
                {g.items.map((r) => (
                  <li key={r.name} className="flex flex-wrap items-center justify-between gap-3 p-5">
                    <div>
                      <p className="font-medium">
                        {r.name}
                        {r.affiliate ? (
                          <span className="ml-3 rounded-md border border-cyan/40 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan">
                            AFFILIATE LINK
                          </span>
                        ) : null}
                      </p>
                      <p className="text-sm text-muted">{r.note}</p>
                    </div>
                    <a
                      href={r.href}
                      target="_blank"
                      rel={r.affiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
                      className="text-sm font-medium text-cyan hover:underline"
                    >
                      Visit →
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
