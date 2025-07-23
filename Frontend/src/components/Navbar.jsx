import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close, github, klogo } from "../assets";
import linkedin from "../assets/linkedin.svg";
import x from "../assets/x.svg";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <div className='flex'>
          <Link
            to='/'
            className='flex items-center gap-2'
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <img src= {klogo} alt='logo' className='w-9 h-9 object-contain' />
            <p className='text-white text-[18px] font-bold cursor-pointer flex'>
              KK Tiwari &nbsp;
              <span className='sm:block hidden'> | Full-Stack Developer</span>
            </p>
          </Link>

          <div className="flex gap-4 ml-5">
            <a href="https://www.linkedin.com/in/krishan-kant-tiwari-979bb8328/" target="_blank" aria-label="LinkedIn">
              <img src={linkedin} alt="LinkedIn" className='w-9 h-9' />
            </a>
            <a href="https://github.com/krishna23tiwari" target="_blank" aria-label="GitHub">
              <img src={github} alt="GitHub" className='w-9 h-9' />
            </a>
            {/* <a href="https://x.com/ManuSaini82045" target="_blank" aria-label="Twitter/X">
              <img src={x} alt="Twitter/X" className='w-9 h-9' />
            </a> */}
          </div>
        </div>

        {/* Large Screen Menu */}
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer relative group`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
              {/* Underline effect */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
            </li>
          ))}
          <li
            className={`${
              active === 'Resume' ? "text-white" : "text-secondary"
            } hover:text-white text-[18px] font-medium cursor-pointer relative group`}
          >
            <a
              href="https://drive.google.com/file/d/1Vvwwoq0LjhpnQDY21CIgCylmxaU5nJ_V/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
            {/* Underline effect */}
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              <li
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === 'Resume' ? "text-white" : "text-secondary"
                }`}
              >
                <a
                  href="https://drive.google.com/file/d/1O1QqGlLX0G50ig0-N-BCvoUhD9lVxcTV/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
