import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FollowGate from "@/components/FollowGate";
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
      <FollowGate>
        <ResourcesContent />
      </FollowGate>
      <Footer />
    </>
  );
}
