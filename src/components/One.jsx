import Image from "next/image";
import Player from "./Player";
import Iconify from "@/hooks/iconify/Iconify";
import { motion } from "framer-motion";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  orderBy,
} from "firebase/firestore";
import db from "@/firebase/firestore";
import { Skeleton, Box, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
const One = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const collectionRef = collection(db, "/Data/Portfolio/video");
        const q = query(
          collectionRef,
          where("LoopVideo", "==", true),
          orderBy("Date", "desc"),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        const temp = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(temp);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, []);
  return (
    <>
      <section
        className="One py-4"
        style={{
          background: "#131e25",
        }}
      >
        {loading ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Skeleton
              sx={{
                bgcolor: "#414141",
                width: "100%",
                height: "80vh",
                border: 0,
              }}
              variant="rectangular"
            />
            <Box
              sx={{
                display: "flex",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CircularProgress />
            </Box>
          </Box>
        ) : (
          <>
            <div style={{ position: "relative" }}>
              <Player
                type={"video/mp4"}
                videoJsOptions={{
                  autoplay: false,
                  controls: true,
                  preload: "auto",
                  responsive: true,
                  fluid: true,
                  poster: data[0]?.thumbnailUrl ? data[0]?.thumbnailUrl : null,
                  sources: [
                    {
                      src: data[0]?.videoUrl,
                      type: "video/mp4",
                    },
                  ],
                }}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};
export default One;
