import dynamic from "next/dynamic";
import Counter from "@/components/Counter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Reels from "@/components/Reels";
import About from "@/components/About";
import Hero from "@/components/Hero";
import One from "@/components/One";

const DynamicWork = dynamic(() => import("@/components/Work"), {
  ssr: false,
});



export default function Page() {
  return (
    <>
      <Hero />
      <One />
      <About />

      <DynamicWork /> {/* Work component is ready */}
      <Services />
      <Reels />
      {/* <Counter /> */}
      <Contact />
      <Footer />
    </>
  );
}
