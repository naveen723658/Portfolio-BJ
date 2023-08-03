import Iconify from "@/hooks/iconify/index";

const Navbar = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="header__logo">
              <a href="./index.html">
                <img src="img/logo.png" alt="" />
                {/* Brijesh Gupta */}
              </a>
            </div>
          </div>
          <div className="col-lg-10">
            <div className="header__nav__option">
              <nav className="header__nav__menu mobile-menu">
                <ul>
                  <li className="active">
                    <a href="./index.html">Home</a>
                  </li>
                  <li>
                    <a href="./about.html">About</a>
                  </li>
                  <li>
                    <a href="./portfolio.html">Portfolio</a>
                  </li>
                  <li>
                    <a href="./services.html">Services</a>
                  </li>

                  <li>
                    <a href="./contact.html">Contact</a>
                  </li>
                </ul>
              </nav>
              <div className="header__nav__social">
                <a href="#">
                  {/* <i className="fa fa-facebook" /> */}
                  <Iconify icon="gg:facebook" />
                </a>
                <a href="#">
                  {/* <i className="fa fa-twitter" /> */}
                  <Iconify icon="akar-icons:twitter-fill" />
                </a>
                <a href="#">
                  {/* <i className="fa fa-instagram" /> */}
                  <Iconify icon="fa6-brands:instagram" />
                </a>
                <a href="#">
                  {/* <i className="fa fa-youtube-play" /> */}
                  <Iconify icon="entypo-social:youtube" />
                </a>
                <a href="#">
                  {/* <i className="fa fa-youtube-play" /> */}
                  <Iconify icon="icomoon-free:whatsapp" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap" />
      </div>
    </header>
  );
};

export default Navbar;
