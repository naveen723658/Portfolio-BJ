import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
const Portfolio = dynamic(() => import("@/components/Portfolio/Index"), {
  ssr: true,
});

export default function Page() {
  return (
    <>
      <Portfolio />
      <Footer />
    </>
  );
}
