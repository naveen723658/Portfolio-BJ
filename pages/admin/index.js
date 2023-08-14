
import Head from "next/head";
import dynamic from "next/dynamic";
const Dasboard = dynamic(() => import("@/components/admin/Layout"), {
  ssr: false,
});

const Page = () => (
  <>
    <Head>
      <title>Dasboard | Bgupta panel</title>
    </Head>
    <Dasboard />
  </>
);

export default Page;
