import Masonry from "@mui/lab/Masonry";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import db from "@/firebase/firestore";
import { Skeleton } from "@mui/material";
import Image from "next/image";

import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "next/link";
const ImageSection = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const collectionRef = collection(db, "/Data/Portfolio/video");
        const q = query(collectionRef, orderBy("Date", "desc"), limit(10));

        const querySnapshot = await getDocs(q);

        const temp = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(temp);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  const lg = useMediaQuery("(min-width:992px)");
  const md = useMediaQuery("(max-width:992px) and (min-width:768px)");
  const sm = useMediaQuery("(max-width:768px) and (min-width:478px)");
  const xs = useMediaQuery("(max-width:478px)");
  return (
    <section
      className="text-light my-4 py-4"
      style={{
        position: "relative",
        height: lg
          ? "95vh"
          : md
          ? "110vh"
          : sm
          ? "120vh"
          : xs
          ? "auto"
          : "100vh",
        overflow: "hidden",
      }}
    >
      <Masonry columns={{ xs: 2, sm: 3, md: 4, lg: 5 }} spacing={2}>
        {data?.map((item, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <Image
              src={item.thumbnailUrl}
              alt={item.title ? item.title : "video"}
              placeholder="blur"
              loading="lazy"
              sizes="100%"
              width={item.width}
              height={item.height}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              blurDataURL={item.thumbnailUrl}
            />
          </Box>
        ))}
      </Masonry>
      <Box
        sx={{
          position: "absolute",
          bottom: -1,
          width: "100%",
          p: 2,
          zIndex: 1,
          boxShadow: "rgb(19 30 37) -7px -20px 20px 0px inset",
        }}
      >
        <div
          style={{
            float: "right",
            marginRight: "1rem",
            marginTop: "1rem",
            backdropFilter: "blur(50px)",
            width: "fit-content",
            padding: `${sm || xs ? "0.5rem" : "1rem"}`,
          }}
        >
          <Link href="/Portfolio" className="primary-btn" sx={{ 
            fontSize: `${sm || xs ? "0.8rem" : "15px"}`,
          }}>
            View more
          </Link>
        </div>
      </Box>
    </section>
  );
};
export default ImageSection;
