import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import PlayModal from "./PlayModal";
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
import { Skeleton } from "@mui/material";
import Masonry from "masonry-layout";
import Image from "next/image";
import Link from "next/link";
const Work = () => {
  const masonryRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [source, setSource] = useState();
  const handlePlay = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const collectionRef = collection(db, "/Data/Portfolio/video");
        const q = query(
          collectionRef,
          where("aspectRatio", "==", "888888889:500000000"),
          orderBy("Date", "desc"),
          limit(4)
        );
        const q1 = query(
          collectionRef,
          where("aspectRatio", "==", "9:16"),
          orderBy("Date", "desc"),
          limit(10)
        );

        const querySnapshot1 = await getDocs(q);
        const querySnapshot2 = await getDocs(q1);

        const temp1 = querySnapshot1.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const temp2 = querySnapshot2.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Combine the data from both queries
        const combinedData = [...temp1, ...temp2];
        const order = orderData(combinedData);
        setData(order);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  useLayoutEffect(() => {
    const masonry = new Masonry(masonryRef.current, {
      itemSelector: ".work__item",
      columnWidth: ".grid-sizer",
      gutter: 10,
    });
  }, [data]);

  const orderData = (data) => {
    let temp = [...data];
    let orderedPositions = [0, 6, 10, 11]; // Specify the ordered positions
    const targetAspectRatio = "888888889:500000000";

    const targetItems = [];
    const otherItems = [];

    temp.forEach((item) => {
      if (item.aspectRatio === targetAspectRatio) {
        targetItems.push(item);
      } else {
        otherItems.push(item);
      }
    });
    orderedPositions.forEach((position, index) => {
      let t;
      if (index < targetItems.length) {
        t = temp[position];
        temp[position] = targetItems[index];
        temp[index] = t;
      }
    });

    return temp;
  };

  return (
    <section className="work">
      <div className="work__gallery" ref={masonryRef}>
        <div className="grid-sizer"></div>
        {loading ? (
          [...Array(14)].map((item, key) => (
            <div
              key={key}
              className={`work__item item__${
                key === 0 || key === 6 || key === 10 || key === 11
                  ? 1
                  : key === 3 || key === 9
                  ? 2
                  : 0
              }`}
            >
              <Skeleton
                sx={{ bgcolor: "grey" }}
                variant="rectangular"
                width={"100%"}
                height={"100%"}
              />
            </div>
          ))
        ) : (
          <>
            {data?.map((item, key) => (
              <motion.div
                key={item.id}
                className={`work__item item__${
                  key === 0 || key === 6 || key === 10 || key === 11
                    ? 1
                    : key === 3 || key === 9
                    ? 2
                    : 0
                }`}
                whileHover={{ scale: [null, 1, 0.9] }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={item.thumbnailUrl}
                  alt={item.title ? item.title : "video"}
                  placeholder="blur"
                  loading="lazy"
                  fill
                  sizes="100%"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  blurDataURL={item.thumbnailUrl}
                />
                <div
                  onClick={() => (
                    handlePlay(),
                    setSource({
                      src: item.videoUrl,
                      type: "video/mp4",
                      aspectRatio: item.aspectRatio,
                      width: item.width,
                      thumbnailUrl: item.thumbnailUrl,
                      height: item.height,
                    })
                  )}
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: "1",
                  }}
                  className="play-btn video-popup box"
                >
                  <Iconify icon="mingcute:play-fill" />
                </div>
              </motion.div>
            ))}
          </>
        )}
      </div>
      <Link
        href="/Portfolio"
        className="primary-btn"
        style={{ float: "right", marginRight: "1rem", marginTop: "1rem" }}
      >
        View more
      </Link>
      {source && (
        <PlayModal
          src={source.src}
          type={source.type}
          poster={source.thumbnailUrl}
          ratio={source.aspectRatio}
          w={source.width}
          h={source.height}
          open={openModal}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};
export default Work;
