import dynamic from "next/dynamic";
import Loading, { SkeletonHero, SkeletonOne } from "@/hooks/Loading";
import Navbar from "@/components/Navbar";
import Counter from "@/components/Counter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Reels from "@/components/Reels";
// import One from "@/components/One";
import About from "@/components/About";

const Hero = dynamic(() => import("@/components/Hero"));
const One = dynamic(() => import("@/components/One"));

const DynamicWork = dynamic(() => import("@/components/Work"), {
  ssr: false,
});

export default function Page() {
  return (
    <>
      {/* <Navbar /> */}
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
