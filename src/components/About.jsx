import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
const About = (props) => {
  const { aboutimages, loading = true } = props.props;
  return (
    <section className="py-4 my-4" id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
            >
              {aboutimages?.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <Image
                    src={item.downloadURL}
                    alt="Picture of the author"
                    width={390}
                    height={500}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="col-lg-6">
            <div className="about__text">
              <div className="section-title">
                <span>About Me</span>
                <h2>introduce about My Films history</h2>
              </div>
              <p>
                But must explain to you how all this mistaken idea denoun cin
                pleasure and praisi pain was born and will give complete account
                of the system pound actual teachings
              </p>
              <p>
                But must explain to you how all this mistaken idea denoun cin
                pleasure and praisi pain was born and will give complete account
                of the system pound actual teachings
              </p>
              <p>
                But must explain to you how all this mistaken idea denoun cin
                pleasure and praisi pain was born and will give complete account
                of the system pound actual teachings
              </p>
              <Link href="/Portfolio" className="primary-btn">
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
