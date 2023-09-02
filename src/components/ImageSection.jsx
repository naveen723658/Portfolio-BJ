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
  return (
    <section
      className="text-light my-4 py-4"
      style={{ maxHeight: "110vh", overflow: "hidden", position: "relative" }}
    >
      <Masonry columns={4} spacing={2}>
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
          height: "7vh",
          zIndex: 1,
        //   backgroundColor: "rgb(0 0 0 / 80%)",
        //   backdropFilter: "blur(50px)",
        //   boxShadow: "rgb(0 0 0 / 80%) 9px -10px 11px 0px inset}",
        }}
      />
    </section>
  );
};
export default ImageSection;
