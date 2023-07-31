import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Player from "./Player";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "30%",
  maxWidth: "80%",
  height: "auto",
  bgcolor: "transparent",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PlayModal = ({ src, type, open, onClose }) => {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
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
      <Box sx={style}>
        <Player src={src} type={type} videoJsOptions={videoJsOptions} />
      </Box>
    </Modal>
  );
};

export default PlayModal;
