import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>
            <p className="font-mono text-sm font-bold">
              <span className="text-cyan">&lt;/&gt;</span> {site.handle}
            </p>
            <p className="mt-2 text-sm text-muted">Web + mobile dev. Learning Web3 in public.</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
            <Link href="/#work" className="hover:text-white">Work</Link>
            <Link href="/#services" className="hover:text-white">Services</Link>
            <Link href="/#learn" className="hover:text-white">Learn</Link>
            <Link href="/resources" className="hover:text-white">Resources</Link>
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-white">
                {s.label}
              </a>
            ))}
          </nav>
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted">
          Educational content only. Nothing here is financial advice. Crypto is risky and memecoins can go to zero, so never
          use money you can't afford to lose. Examples run on test networks. Some links on the Resources page may be
          affiliate links and are labelled when they are.
        </p>
        <p className="mt-4 text-xs text-muted">© {new Date().getFullYear()} {site.handle}</p>
      </div>
    </footer>
  );
}
