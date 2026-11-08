import { NextResponse } from "next/server";

// Receives the "free notes" form.
// - If SUBSCRIBE_WEBHOOK_URL is set, the email is forwarded there as JSON.
// - If not, it is only printed to the server log. It is NOT stored anywhere.
//   Connect a provider before you promote the site.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  let body = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const email = String(body.email || "").trim();

  // Honeypot: bots fill the hidden field. Pretend it worked, store nothing.
  if (body.company) return NextResponse.json({ ok: true });

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const hook = process.env.SUBSCRIBE_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, {
        method: "POST",
        // Apps Script web apps cannot read request headers, so the optional
        // shared secret travels in the JSON body (Zapier/Make simply ignore it).
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "jayraidxyz-site",
          createdAt: new Date().toISOString(),
          ...(process.env.SUBSCRIBE_WEBHOOK_SECRET && { secret: process.env.SUBSCRIBE_WEBHOOK_SECRET }),
        }),
        redirect: "follow",
      });
      if (!res.ok) return NextResponse.json({ error: "Upstream error" }, { status: 502 });
      // Apps Script answers 200 even on failure; it reports errors as { ok: false }.
      const data = await res.json().catch(() => null);
      if (data && data.ok === false) {
        console.error("[subscribe] upstream rejected:", data.error);
        return NextResponse.json({ error: "Upstream error" }, { status: 502 });
      }
    } catch {
      return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }
  } else if (process.env.NODE_ENV === "production") {
    // Fail loudly so a missing env var never silently drops leads.
    console.error("[subscribe] SUBSCRIBE_WEBHOOK_URL is not set, email NOT stored");
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  } else {
    console.log("[subscribe] no provider connected, email NOT stored:", email);
  }

  return NextResponse.json({ ok: true });
}
