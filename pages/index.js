import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Counter from "@/components/Counter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Reels from "@/components/Reels";
import One from "@/components/One";
import About from "@/components/About";
// import Work from "@/components/Work";
const DynamicWork = dynamic(() => import("@/components/Work"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      <One />
      <About />
      <DynamicWork />
      <Services />
      <Reels />
      {/* <Counter /> */}
      <Contact />
      <Footer />
    </>
  );
}