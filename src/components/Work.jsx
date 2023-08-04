import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import Masonry from "masonry-layout";
import { useFetchAllImagesMeta } from "@/hooks/firebase";
import Player from "./Player";
import PlayModal from "./PlayModal";
import Iconify from "@/hooks/iconify/Iconify";
import { motion } from "framer-motion";
const Work = () => {
  const masonryRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [source, setSource] = useState({
    src: "",
    type: "",
  });
  const handlePlay = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [imageMeta, loading] = useFetchAllImagesMeta(`DCC Animal Hospital/`);

  useEffect(() => {
    console.log(imageMeta);
  }, [imageMeta]);
  useLayoutEffect(() => {
    const masonry = new Masonry(masonryRef.current, {
      itemSelector: ".work__item",
      columnWidth: ".grid-sizer",
      gutter: 10,
    });
    setBackgroundImages();
  }, []);

  const setBackgroundImages = () => {
    const elements = document.querySelectorAll(".set-bg");
    elements.forEach((element) => {
      const bg = element.getAttribute("data-setbg");
      element.style.backgroundImage = `url(${bg})`;
    });
  };
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
    <section className="work">
      <div className="work__gallery" ref={masonryRef}>
        <div className="grid-sizer"></div>
        {galleryItems.map((item, key) => (
          <motion.div
            key={item.id}
            className={`work__item item__${
              key === 0 ? 1 : key === 3 ? 2 : key === 6 ? 1 : key === 9 ? 2 : 0
            } set-bg box`}
            data-setbg={`${item.imageUrl}`}
            whileHover={{ scale: [null, 1, 0.9] }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: null }}
              animate={{ scale: [null, 1.3, 1.2, 1.1, 1] }}
              transition={{ ease: "linear", duration: 2, repeat: Infinity }}
              onClick={() => (
                handlePlay(),
                setSource({ src: item.videoUrl, type: "video/mp4" })
              )}
              style={{ cursor: "pointer" }}
              className="play-btn video-popup box"
            >
              <Iconify icon="mingcute:play-fill" />
            </motion.div>
          </motion.div>
        ))}
      </div>
      <PlayModal
        src={source.src}
        type={source.type}
        open={openModal}
        onClose={handleCloseModal}
      />
    </section>
  );
};
export default Work;
