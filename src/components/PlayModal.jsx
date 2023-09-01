import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Player from "./Player";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

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
          minWidth: ratio === "9:16" ? "30%" : "80%",
          height: "auto",
          bgcolor: "transparent",
          border: "none",
          boxShadow: 15,
          outline: 0,
          p: 4,
        }}
      >
        <Player src={src} type={type} videoJsOptions={videoJsOptions} />
      </Box>
    </Modal>
  );
};

export default PlayModal;
