import dynamic from "next/dynamic";
import Counter from "@/components/Counter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Reels from "@/components/Reels";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import db from "@/firebase/firestore";
import About from "@/components/About";
import Hero from "@/components/Hero";
import One from "@/components/One";

const DynamicWork = dynamic(() => import("@/components/Work"), {
  ssr: false,
});

export async function getStaticProps() {
  const collectionRef = collection(db, "/Data/Portfolio/video");
  const collection2Ref = collection(db, "/Data/Portfolio/Images");
  const q = query(collectionRef, where("hero", "==", true), limit(6));
  const q2 = query(collectionRef, where("LoopVideo", "==", true), limit(1));
  const q3 = query(collection2Ref, limit(10));
  let loading = true;
  try {
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const query2Snapshot = await getDocs(q2);
    const loopVideoData = query2Snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const query3Snapshot = await getDocs(q3);
    const aboutimages = query3Snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      props: { data, loading: false, loopVideoData, aboutimages }, // Pass the fetched data as props to your component
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { data: [], loading: false, loopVideoData : [], aboutimages:[] }, // Return an empty array or handle the error as needed
    };
  }
}

export default function Page({ data, loading, loopVideoData, aboutimages }) {
  return (
    <>
      <Hero props={{ data, loading }} />
      <One props={{ loopVideoData, loading }} />
      <About props={{ aboutimages, loading }} />
      <DynamicWork />
      <Services />
      <Reels />
      {/* <Counter /> */}
      <Contact />
      <Footer />
    </>
  );
}
