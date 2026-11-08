import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Coin from "@/components/Coin";

export const metadata = { title: "Page not found | jayraidxyz" };

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center">
        <Coin className="floaty w-36" />
        <p className="mt-8 font-mono text-xs font-bold tracking-[0.18em] text-cyan">404</p>
        <h1 className="mt-3 text-4xl font-bold">Nothing here.</h1>
        <p className="mt-4 text-lg text-muted">That page doesn't exist or has moved.</p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-accent px-7 py-3.5 font-medium text-white transition hover:bg-[#6470ff]"
        >
          Back home
        </Link>
      </main>
      <Footer />
    </>
  );
}
