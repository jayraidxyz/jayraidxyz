import { site } from "@/data/site";
import Coin from "./Coin";

export default function Hero() {
  const mail = `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}`;

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      {site.heroVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          src={site.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : null}
      <div className="dotgrid absolute inset-0" aria-hidden="true" />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-cyan/10 blur-3xl" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-20 pt-16 md:grid-cols-[1.25fr_0.75fr] md:pb-28 md:pt-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.16em] text-cyan">
            TESTNET FIRST · NO SHILLING
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-6xl">
            {site.heroLine1}
            <br />
            <span className="bg-gradient-to-r from-cyan to-accent bg-clip-text text-transparent">
              {site.heroLine2}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">{site.sub}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={mail}
              className="rounded-full bg-accent px-7 py-3.5 font-medium text-white transition hover:bg-[#6470ff]"
            >
              Hire me
            </a>
            <a
              href="#notes"
              className="rounded-full border border-white/20 px-7 py-3.5 font-medium text-white transition hover:border-cyan hover:text-cyan"
            >
              Get the free notes
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2 font-mono text-xs text-muted">
            {["Next.js", "React Native", "Solana", "Rust + Anchor"].map((t) => (
              <li key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5">
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto w-48 sm:w-60 md:w-full md:max-w-xs">
          <Coin className="floaty drop-shadow-[0_0_40px_rgba(79,91,255,0.45)]" />
        </div>
      </div>
    </section>
  );
}
