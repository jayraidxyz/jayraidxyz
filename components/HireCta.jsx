import { site } from "@/data/site";

export default function HireCta() {
  const mail = `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`;
  const x = site.socials.find((s) => s.label === "X");

  return (
    <section id="hire" className="mx-auto max-w-6xl px-5 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-accent/30 via-panel to-ink p-8 sm:p-14">
        <div className="dotgrid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative max-w-2xl">
          <p className="font-mono text-xs font-bold tracking-[0.18em] text-cyan">WORK WITH ME</p>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">Need an app built?</h2>
          <p className="mt-4 text-lg text-muted">
            Tell me what you're building and I'll reply with a plan, a timeline and a price.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={mail}
              className="rounded-full bg-white px-7 py-3.5 font-medium text-ink transition hover:bg-cyan"
            >
              Email me
            </a>
            {x ? (
              <a
                href={x.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/25 px-7 py-3.5 font-medium text-white transition hover:border-cyan hover:text-cyan"
              >
                DM me on X
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
