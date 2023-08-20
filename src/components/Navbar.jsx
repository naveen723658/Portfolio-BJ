import { useState, useEffect } from "react";
import Iconify from "@/hooks/iconify/index";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mediaWidth, setMediaWidth] = useState(0);
  const navContainer = {
    visible: {
      //x: 0,
      opacity: 1,
      transition: {
        x: { velocity: 100 },
        duration: 0.3,
      },
    },
    hidden: {
      //x: -250,
      opacity: 0,
      transition: {
        x: { velocity: 100 },
        duration: 0.3,
      },
    },
  };
  const navList = {
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.07,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const navItem = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    hidden: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setMediaWidth(window.innerWidth);
    };

    // Initial width on component mount
    setMediaWidth(window.innerWidth);

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <header className="header" style={{ position: "relative" }}>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-2 col">
            <div className="header__logo">
              <Link href="/">
                Brijesh <span>Gupta</span>
              </Link>
            </div>
          </div>
          <div className="col-lg-10 col-1" style={{ position: "relative" }}>
            {mediaWidth > 991.5 && (
              <div className="header__nav__option">
                <nav className="header__nav__menu">
                  <ul>
                    <li className="active">
                      <Link href="/">Home</Link>
                    </li>
                    <li>
                      <Link href="#about">About</Link>
                    </li>
                    <li>
                      <Link href="/Portfolio">Portfolio</Link>
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
            )}
            <span
              className="menu"
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpen(!isOpen)}
            >
              <Iconify icon="jam:menu" sx={{ width: "50px", height: "50px" }} />
            </span>
          </div>
        </div>
      </div>
      {mediaWidth < 991.5 && isOpen && (
        <AnimatePresence>
          <motion.div
            className="navbar header__nav__menu mobile-menu"
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            exit="hidden"
            variants={navContainer}
          >
            <motion.ul
              className="navList container"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={navList}
            >
              <motion.li className="active" variants={navItem}>
                <Link href="/">Home</Link>
              </motion.li>
              <motion.li variants={navItem}>
                <Link href="#about">About</Link>
              </motion.li>
              <motion.li variants={navItem}>
                <Link href="/">Portfolio</Link>
              </motion.li>
              <motion.li variants={navItem}>
                <Link href="/">Services</Link>
              </motion.li>

              <motion.li variants={navItem}>
                <Link href="/">Contact</Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        </AnimatePresence>
      )}
    </header>
  );
};

export default Navbar;
