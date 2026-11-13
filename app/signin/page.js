import { redirect } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { auth, signIn } from "@/auth";

export const metadata = {
  title: "Sign in | jayraidxyz",
  robots: { index: false },
};

function getCallbackPath(callbackUrl) {
  if (typeof callbackUrl !== "string" || !callbackUrl.startsWith("/") || callbackUrl.startsWith("//")) {
    return "/resources";
  }

  try {
    const url = new URL(callbackUrl, "https://local.invalid");
    if (url.origin !== "https://local.invalid") return "/resources";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/resources";
  }
}

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const callbackPath = getCallbackPath(params?.callbackUrl);
  const session = await auth();

  if (session) redirect(callbackPath);

  async function signInWithGoogle() {
    "use server";
    await signIn("google", { redirectTo: callbackPath });
  }

  const error = Array.isArray(params?.error) ? params.error[0] : params?.error;

  return (
    <>
      <Nav />
      <main className="relative flex min-h-[65vh] items-center justify-center overflow-hidden px-5 py-16">
        <div className="dotgrid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-accent/25 blur-3xl" aria-hidden="true" />
        <section className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-panel/80 p-8 shadow-2xl backdrop-blur sm:p-10">
          <p className="font-mono text-xs font-bold tracking-[0.18em] text-cyan">MEMBERS AREA</p>
          <h1 className="mt-3 text-3xl font-bold">Sign in to continue</h1>
          <p className="mt-3 text-muted">Use your Google account to access the resources library.</p>

          {error ? (
            <p role="alert" className="mt-6 rounded-xl border border-[#ff8caf]/30 bg-[#ff8caf]/10 p-4 text-sm text-[#ffb3c8]">
              {error === "AccessDenied"
                ? "This Google account is not permitted to access the resources."
                : "Sign-in failed. Please try again."}
            </p>
          ) : null}

          <form action={signInWithGoogle} className="mt-7">
            <button
              type="submit"
              className="w-full rounded-full bg-accent px-7 py-3.5 font-medium text-white transition hover:bg-[#6470ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
            >
              Continue with Google
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
