import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Hero = () => {
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
  return (
    <section className="hero spad my-4">
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h2 className="display-4 text-light fw-bold lh-1">
              Border hero with cropped image and shadows
            </h2>

            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
              >
                Primary
              </button>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            {/* <img
              className="rounded-lg-3"
              src="bootstrap-docs.png"
              alt=""
              width={720}
            /> */}
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
            >
              {galleryItems.map((item, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={`/${item.imageUrl}`}
                    alt="Picture of the author"
                    width={600}
                    height={405}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
