import Link from "next/link";
import { site } from "@/data/site";

export default function Nav() {
  const mail = `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label="Main">
        <Link href="/" className="font-mono text-sm font-bold tracking-wide text-white">
          <span className="text-cyan">&lt;/&gt;</span> {site.handle}
        </Link>

        <ul className="hidden items-center gap-8 text-sm text-muted md:flex">
          <li>
            <Link href="/#work" className="transition hover:text-white">Work</Link>
          </li>
          <li>
            <Link href="/#services" className="transition hover:text-white">Services</Link>
          </li>
          <li>
            <Link href="/#learn" className="transition hover:text-white">Learn</Link>
          </li>
          <li>
            <Link href="/resources" className="transition hover:text-white">Resources</Link>
          </li>
        </ul>

        <a
          href={mail}
          className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition hover:bg-[#6470ff]"
        >
          Hire me
        </a>
      </nav>
    </header>
  );
}
