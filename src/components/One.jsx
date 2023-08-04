import Image from "next/image";
import Player from "./Player";
import Iconify from "@/hooks/iconify/Iconify";
const One = () => {
  return (
    <>
      <section className="One my-4 py-4">
        <div style={{ position: "relative" }}>
          <Image
            src="/img/portfolio/infra_img.png"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <span className="play-btn video-popup">
            <span className="inner-circle">
              <Iconify icon="mingcute:play-fill" />
            </span>
          </span>
        </div>
      </section>
    </>
  );
};
export default One;
