import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
const Portfolio = dynamic(() => import("@/components/Portfolio/Index"), {
  ssr: true,
});

export default function Page() {
  const router = useRouter();
  const {
    query: { docID },
  } = router;
  return (
    <>
      <Portfolio docID={docID} />
      <Footer />
    </>
  );
}
