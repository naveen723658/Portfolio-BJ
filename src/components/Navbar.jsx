import Iconify from "@/hooks/iconify/index";
import Link from "next/link";
const Navbar = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-2 col">
            <div className="header__logo">
              <Link href="/">
                Brijesh <span>Gupta</span>
              </Link>
            </div>
          </div>
          <div className="col-lg-10 col-1" style={{position:"relative"}}>
            <div className="header__nav__option">
              <nav className="header__nav__menu mobile-menu">
                <ul>
                  <li className="active">
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="#about">About</Link>
                  </li>
                  <li>
                    <Link href="/">Portfolio</Link>
                  </li>
                  <li>
                    <Link href="/">Services</Link>
                  </li>

                  <li>
                    <Link href="/">Contact</Link>
                  </li>
                </ul>
              </nav>
              <div className="header__nav__social">
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

            <span className="menu" style={{cursor:"pointer"}}>
              <Iconify icon="jam:menu" sx={{width: "50px" , height: "50px"}} />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
