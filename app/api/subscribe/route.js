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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "jayraidxyz-site" }),
      });
      if (!res.ok) return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    } catch {
      return NextResponse.json({ error: "Upstream error" }, { status: 502 });
    }
  } else {
    console.log("[subscribe] no provider connected, email NOT stored:", email);
  }

  return NextResponse.json({ ok: true });
}
