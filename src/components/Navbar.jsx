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
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-dribbble" />
                </a>
                <a href="#">
                  <i className="fa fa-instagram" />
                </a>
                <a href="#">
                  <i className="fa fa-youtube-play" />
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
