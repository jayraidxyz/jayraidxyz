import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { site } from "@/data/site";

export const metadata = {
  title: "Privacy Policy | jayraidxyz",
  description: "What data this site collects, why, and how to ask for it to be deleted.",
};

const UPDATED = "13 November 2026";

function Section({ title, children }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-3 space-y-3 text-lg leading-relaxed text-white/85">{children}</div>
    </section>
  );
}

function List({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((li) => (
        <li key={li} className="flex gap-3">
          <span className="mt-3 h-2 w-2 shrink-0 rounded-sm bg-accent" aria-hidden="true" />
          <span>{li}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="relative overflow-hidden">
        <div className="dotgrid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-12 sm:pt-16">
          <Link href="/" className="text-sm text-muted hover:text-white">
            ← Back home
          </Link>
          <p className="mt-8 font-mono text-xs font-bold tracking-[0.18em] text-cyan">LEGAL</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">Privacy Policy</h1>
          <p className="mt-3 font-mono text-xs text-muted">Last updated: {UPDATED}</p>

          <p className="mt-8 text-lg leading-relaxed text-white/85">
            This site ({site.handle}) is a personal developer portfolio and learning library. This policy explains what
            personal data it handles, why, and your choices. I keep data collection to the minimum needed to run the site.
          </p>

          <Section title="What I collect">
            <p>
              <strong className="text-white">Google sign-in (Resources page).</strong> To open the Resources page you sign in
              with Google. I receive your name, email address and profile picture from Google. I do not receive your Google
              password, contacts, Drive files or any other Google data.
            </p>
            <p>
              <strong className="text-white">Free notes sign-up.</strong> If you request the free PDF, I collect the email
              address you enter.
            </p>
            <p>
              <strong className="text-white">Technical data.</strong> My hosting provider (Vercel) may process standard
              request data such as IP address, browser type and pages requested, for security and operation of the service.
            </p>
          </Section>

          <Section title="How I use it">
            <List
              items={[
                "To confirm you are signed in and keep the Resources page available to signed-in visitors",
                "To restrict access to approved accounts, where an allow-list is enabled",
                "To send you the free notes and, if you opted in, occasional updates about new content",
                "To keep the site secure and working",
              ]}
            />
            <p>I do not sell your data, and I do not use it for advertising or profiling.</p>
          </Section>

          <Section title="Cookies and sessions">
            <p>
              Signing in sets a secure, encrypted session cookie (and short-lived cookies used during the Google login flow).
              These are strictly necessary for authentication. Your session data is stored in the cookie itself, not in a
              database on my side. This site does not use advertising or third-party analytics cookies.
            </p>
          </Section>

          <Section title="Who I share data with">
            <List
              items={[
                "Google: to authenticate you. Their handling of your data is covered by Google's Privacy Policy.",
                "Vercel: hosting and infrastructure.",
                "My email provider or automation tool: receives the email address you submit for the free notes, so I can deliver and send updates.",
              ]}
            />
            <p>I may disclose data if required by law.</p>
          </Section>

          <Section title="Google API data">
            <p>
              The site's use of information received from Google is limited to authenticating you and displaying your
              email on the Resources page. It is not used for advertising, not transferred to third parties except as needed
              to provide the service, and not used to train AI models.
            </p>
          </Section>

          <Section title="Retention">
            <p>
              Session cookies expire automatically or when you sign out. Email addresses submitted for the free notes are
              kept until you unsubscribe or ask me to delete them. Hosting logs are kept by Vercel under its own retention
              rules.
            </p>
          </Section>

          <Section title="Your rights and choices">
            <p>
              You can sign out at any time, unsubscribe from any email, and ask me to access, correct or delete your data.
              You can also revoke this site's access from your Google Account under Security, then Third-party apps with
              account access. Depending on where you live (including Nigeria under the NDPA, and the UK/EU under GDPR), you
              may have additional legal rights. Contact me and I will respond promptly.
            </p>
          </Section>

          <Section title="Children">
            <p>This site is not directed at children under 13, and I do not knowingly collect their data.</p>
          </Section>

          <Section title="Changes">
            <p>If I change this policy, I will update the date above. Material changes will be flagged on this page.</p>
          </Section>

          <Section title="Contact">
            <p>
              Questions or requests:{" "}
              <a href={`mailto:${site.email}`} className="text-cyan underline underline-offset-4 hover:text-white">
                {site.email}
              </a>
            </p>
          </Section>

          <p className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-relaxed text-muted">
            Educational content only. Nothing on this site is financial advice.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
