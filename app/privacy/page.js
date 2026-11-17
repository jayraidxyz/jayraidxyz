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
              <strong className="text-white">Google sign-in (Resources library).</strong> To access the Resources page
              and Watch &amp; Read posts you sign in with Google via Firebase Authentication. I receive your name, email
              address, and profile picture from Google, and save your bookmarks, lesson progress, and study notes in
              Firestore under your account. I do not receive your Google password, contacts, Drive files, or any other
              Google data.
            </p>
            <p>
              <strong className="text-white">Free notes sign-up.</strong> If you request the free PDF, I collect the email
              address you enter.
            </p>
            <p>
              <strong className="text-white">Technical data.</strong> My hosting provider may process standard request
              data such as IP address, browser type and pages requested, for security and operation of the service.
            </p>
          </Section>

          <Section title="How I use it">
            <List
              items={[
                "To authenticate you and keep the Resources library restricted to signed-in visitors",
                "To save and sync your bookmarks, completed lessons, and personal study notes",
                "To send you the free notes and, if you opted in, occasional updates about new content",
                "To keep the site secure and working",
              ]}
            />
            <p>I do not sell your data, and I do not use it for advertising or profiling.</p>
          </Section>

          <Section title="Sessions and storage">
            <p>
              Signing in via Firebase Authentication stores your session locally in your browser so you stay signed in
              across visits. Your saved bookmarks, lesson progress, and study notes are stored privately under your user
              record in Cloud Firestore. This site does not use advertising or third-party analytics cookies.
            </p>
          </Section>

          <Section title="Who I share data with">
            <List
              items={[
                "Google & Firebase: to authenticate you and store your account profile and learning progress.",
                "My hosting provider: infrastructure and request delivery.",
                "My email provider or automation tool: receives the email address you submit for the free notes, so I can deliver and send updates.",
              ]}
            />
            <p>I may disclose data if required by law.</p>
          </Section>

          <Section title="Retention">
            <p>
              Your account profile and study progress stay in Firestore until you request deletion. Email addresses
              submitted for the free notes are kept until you unsubscribe or ask me to delete them.
            </p>
          </Section>

          <Section title="Your rights and choices">
            <p>
              You can sign out at any time from your profile menu, unsubscribe from any email, and ask me to access,
              correct or delete your data. Depending on where you live (including Nigeria under the NDPA, and the UK/EU
              under GDPR), you may have additional legal rights. Contact me and I will respond promptly.
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
