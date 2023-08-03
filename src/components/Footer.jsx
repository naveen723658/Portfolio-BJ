import Link from "next/link";
import Iconify from "@/hooks/iconify/index";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="header__logo">
                  <Link href="/">
                    Brijesh <span>Gupta</span>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="footer__top__social">
                  <a href="#">
                    <Iconify icon="gg:facebook" />
                  </a>
                  <a href="#">
                    <Iconify icon="akar-icons:twitter-fill" />
                  </a>
                  <a href="#">
                    <Iconify icon="fa6-brands:instagram" />
                  </a>
                  <a href="#">
                    <Iconify icon="entypo-social:youtube" />
                  </a>
                  <a href="#">
                    <Iconify icon="icomoon-free:whatsapp" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__copyright">
            <div className="row">
              <div className="col-lg-12 text-center">
                <p className="footer__copyright__text">
                  Copyright © All rights reserved by{" "}
                  <a href="" target="_blank">
                    Brijesh Gupta
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
