import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useRef, useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Box } from "@mui/material";
import Player from "./Player";
import Iconify from "@/hooks/iconify/index";
import { Pagination, Navigation } from "swiper";
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
const Reels = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);
  // SwiperCore.use([Navigation, Pagination]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const collectionRef = collection(db, "/Data/Portfolio/video");
        const q = query(
          collectionRef,
          where("aspectRatio", "==", "9:16"),
          orderBy("Date", "asc"),
          limit(20)
        );

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
    <section className="text-light">
      {/* <Box
        sx={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "end",
          gap: "15px",
          padding: "1.2rem",
        }}
      >
        <Box
          sx={{ cursor: "pointer", width: "fit-content", color: "#00c0e8" }}
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <Iconify icon="mingcute:arrow-down-fill" width="35px" rotate={1} />
        </Box>
        <Box
          sx={{ cursor: "pointer", width: "fit-content", color: "#00c0e8" }}
          onClick={() => swiperRef.current?.slideNext()}
        >
          <Iconify icon="mingcute:arrow-up-fill" width="35px" rotate={1} />
        </Box>
      </Box> */}
      <Box>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          loop={true}
          breakpoints={{
            276: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            478: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 12,
            },
          }}
          // navigation={true}
          // modules={[Pagination,Navigation]}
          // ref={swiperRef}
          // onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="mySwiper"
        >
          {loading ? (
            [...Array(10)].map((item, key) => (
              <div key={key}>
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
              {data?.map((value) => (
                <SwiperSlide key={value.id}>
                  <Box sx={{ width: "100%", height: "auto" }}>
                    <Player
                      type={"video/mp4"}
                      videoJsOptions={{
                        autoplay: false,
                        controls: true,
                        responsive: true,
                        preload: "none",
                        fluid: true,
                        poster: value.thumbnailUrl ? value.thumbnailUrl : null,
                        aspectRatio: value.aspectRatio
                          ? value.aspectRatio
                          : "9:16",
                        sources: [
                          {
                            src: value.videoUrl,
                            type: "video/mp4",
                          },
                        ],
                      }}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </>
          )}
        </Swiper>
      </Box>
    </section>
  );
};
export default Reels;
