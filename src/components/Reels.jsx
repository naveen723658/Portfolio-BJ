import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Box } from "@mui/material";
import Player from "./Player";
import { useFetchAllImagesMeta } from "@/hooks/firebase";
import Iconify from "@/hooks/Iconify";
import { Pagination, Navigation } from "swiper";
const Reels = () => {
  const galleryItems = [
    {
      id: 1,
      videoUrl: "https://shorturl.at/lBPU7",
      imageUrl: "img/portfolio/infra_img.png",
    },
    {
      id: 2,
      videoUrl: "https://shorturl.at/dmzR0",
      imageUrl: "img/work/kohinor.png",
    },
    {
      id: 3,
      videoUrl: "https://shorturl.at/ahDMY",
      imageUrl: "img/work/label.png",
    },
    {
      id: 4,
      videoUrl: "https://shorturl.at/fAKTW",
      imageUrl: "img/work/ad2.png",
    },
    {
      id: 5,
      videoUrl: "https://shorturl.at/oxBG6",
      imageUrl: "img/work/oceedee.png",
    },
    {
      id: 6,
      videoUrl: "https://shorturl.at/bmpE8",
      imageUrl: "img/work/oceedee2.png",
    },
    {
      id: 7,
      videoUrl: "https://shorturl.at/bnU37",
      imageUrl: "img/work/next.png",
    },
    // Add more items as needed
  ];
  const [imageMeta, loading] = useFetchAllImagesMeta(`Oceedee Campaign Shoot/`);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);
  // SwiperCore.use([Navigation, Pagination]);
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
          {imageMeta.map((value, index) => (
            <SwiperSlide key={index}>
              <Box sx={{ width: "100%", height: "auto" }}>
                <Player
                  type={"video/mp4"}
                  videoJsOptions={{
                    autoplay: false,
                    controls: true,
                    responsive: true,
                    fluid: true,
                    aspectRatio: "9:16",
                    sources: [
                      {
                        src: value.url,
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
export default Reels;
