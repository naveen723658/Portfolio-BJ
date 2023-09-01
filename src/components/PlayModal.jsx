import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Player from "./Player";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
const PlayModal = ({ src, type, poster, ratio, w, h, open, onClose }) => {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    poster: poster,
    responsive: true,
    fluid: true,
    aspectRatio: ratio,
    sources: [
      {
        src: src,
        type: type,
      },
    ],
  };
  const lg = useMediaQuery("(min-width:992px)");
  const md = useMediaQuery("(max-width:992px) and (min-width:768px)");
  const sm = useMediaQuery("(max-width:768px) and (min-width:478px)");
  const xs = useMediaQuery("(max-width:478px)");
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth:
            ratio === "9:16" && lg
              ? "26rem"
              : ratio === "9:16" && md
              ? "22rem"
              : ratio === "9:16" && sm
              ? "20rem"
              : ratio === "9:16" && xs
              ? "95%"
              : lg
              ? "80%"
              : md
              ? "85%"
              : sm
              ? "90%"
              : "98%",
          height: "auto",
          bgcolor: "transparent",
          border: "none",
          boxShadow: 15,
          outline: 0,
          p: xs || sm ? 2 : 4,
        }}
      >
        <Player src={src} type={type} videoJsOptions={videoJsOptions} />
      </Box>
    </Modal>
  );
};

export default PlayModal;
