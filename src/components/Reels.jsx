import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Box } from "@mui/material";
import Player from "./Player";
import Iconify from "@/hooks/iconify/index";
import { Pagination, Navigation } from "swiper";
import { motion } from "framer-motion";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import db from "@/firebase/firestore";

const Reels = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);
  // SwiperCore.use([Navigation, Pagination]);
  
  const { data, loading } = fetcher();
  return (
    <section className="text-light">
      <Box
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
      </Box>
      <Box>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          // navigation={true}
          // modules={[Pagination,Navigation]}
          // ref={swiperRef}
          // onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="mySwiper"
        >
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
                    aspectRatio: value.aspectRatio ? value.aspectRatio : "9:16",
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
        </Swiper>
      </Box>
    </section>
  );
};
export const fetcher = async () => {
  let loading = true;
  try {
    const collectionRef = collection(db, "/Data/Portfolio/video");
    const q = query(
      collectionRef,
      where("aspectRatio", "==", "9:16"),
      limit(20)
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      Date: "",
    }));
    
    return {
      props: { data, loading: false }, // Pass the fetched data as props to your component
    };
  } catch (error) {
    console.log(error);
    return {
      props: { data: [], loading: true }, // Pass the fetched data as props to your component
    };
  }
};
export default Reels;   
