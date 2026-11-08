import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Journey from "@/components/Journey";
import FreeNotes from "@/components/FreeNotes";
import Lessons from "@/components/Lessons";
import HireCta from "@/components/HireCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Services />
        <Journey />
        <FreeNotes />
        <Lessons />
        <HireCta />
      </main>
      <Footer />
    </>
  );
}
