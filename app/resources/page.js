import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AuthGate from "@/components/AuthGate";
import ResourcesContent from "@/components/ResourcesContent";

export const metadata = {
  title: "Resources | jayraidxyz",
  description:
    "Explainers, carousels and tools from my Web3 learning journey. Testnet-first, no hype, affiliate links clearly labelled.",
};

export default function ResourcesPage() {
  return (
    <>
      <Nav />
      <AuthGate>
        <ResourcesContent />
      </AuthGate>
      <Footer />
    </>
  );
}
