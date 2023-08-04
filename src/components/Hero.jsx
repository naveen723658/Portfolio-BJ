import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";
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
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 ">
            <h2 className="display-4">Embrace the Director’s Chair</h2>
            <p>
              Craft stunning visuals with our state-of-the-art videography
              solutions – because storytelling isn’t limited to words on a page.
              Let your creative juices flow while we capture the magic.
            </p>
            <div className="d-grid gap-2 d-md-flex mt-2 justify-content-md-start mb-4 mb-lg-3">
              <a href="#" className="primary-btn">
                See More About Us
              </a>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            {/* <Swiper
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
            </Swiper> */}
      
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
