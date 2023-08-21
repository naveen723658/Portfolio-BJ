import Image from "next/image";
import Player from "./Player";
import Iconify from "@/hooks/iconify/Iconify";
import { motion } from "framer-motion";
const One = (props) => {
  const { loopVideoData, loading = true } = props.props;
  return (
    <>
      {loopVideoData && (
        <section
          className="One py-4"
          style={{
            background: "#131e25",
          }}
        >
          <div style={{ position: "relative" }}>
            <Player
              type={"video/mp4"}
              videoJsOptions={{
                autoplay: false,
                controls: true,
                preload: "auto",
                responsive: true,
                fluid: true,
                sources: [
                  {
                    src: loopVideoData[0].videoUrl,
                    type: "video/mp4",
                  },
                ],
              }}
            />
            {/* <motion.span
              className="play-btn video-popup"
              id="vjs-big-play-button"
              whileHover={{ scale: null }}
              animate={{ scale: [null, 1.2, 1.1, 1] }}
              transition={{ ease: "linear", duration: 2, repeat: Infinity }}
              style={{ translate: "-50% -50%", cursor: "pointer" }}
            >
              <span className="inner-circle">
                <Iconify icon="mingcute:play-fill" />
              </span>
            </motion.span> */}
          </div>
        </section>
      )}
    </>
  );
};
export default One;
