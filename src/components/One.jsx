import Image from "next/image";
import Player from "./Player";
import Iconify from "@/hooks/iconify/Iconify";
import { motion } from "framer-motion";
const One = () => {
  return (
    <>
      <section
        className="One py-4"
        style={{
          background: "#131e25",
        }}
      >
        <div style={{ position: "relative" }}>
          <Image
            src="/img/portfolio/infra_img.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <motion.span
            className="play-btn video-popup"
            whileHover={{ scale: null }}
            animate={{ scale: [null, 1.2, 1.1, 1] }}
            transition={{ ease: "linear", duration: 2, repeat: Infinity }}
            style={{ translate: "-50% -50%", cursor: "pointer" }}
          >
            <span className="inner-circle">
              <Iconify icon="mingcute:play-fill" />
            </span>
          </motion.span>
        </div>
      </section>
    </>
  );
};
export default One;
