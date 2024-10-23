import { Link } from "react-router-dom";
import { hamburger } from "../assets/icons";
import headerLogo from "../assets/images/header-logo.svg";
import { navLinks } from "../constants";
import { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { TbMenuDeep } from "react-icons/tb";
import { RiCloseFill, RiMenu3Line } from "react-icons/ri";
import { Badge, CloseButton, Divider } from "@chakra-ui/react";
import { FaCartShopping } from "react-icons/fa6";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="padding-x py-8 relative z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <Link to={"/"}>
          <img src={headerLogo} alt="Logo" width={130} height={29} />
        </Link>

        {/* Desktop Navigation */}
        <ul className="flex-1 flex justify-between items-center max-lg:hidden pl-16">
          <li className="flex gap-10">
            <div className="font-montserrat leading-normal lg:text-lg text-slate-gray">
              <Link to={"/products"} className="">
                Products
              </Link>
            </div>
            <div className="font-montserrat leading-normal lg:text-lg lg:text-slate-gray">
              <Link to={"/about-us"} className="">
                About Us
              </Link>
            </div>
            <div className="font-montserrat leading-normal lg:text-lg lg:text-slate-gray">
              <Link to={"/weblog"} className="">
                Blogs
              </Link>
            </div>
          </li>
          {/* Log in and Sign up */}
          <li className="info-text flex items-center gap-5 max-lg:hidden">
            <Link>
              <div className="p-3 hover:opacity-65">Log in</div>
            </Link>
            <Link>
              <div className="bg-coral-red text-white-400 py-3 px-8 rounded-full hover:opacity-75 hover:transition-opacity">
                Sign up
              </div>
            </Link>
            <Divider orientation="vertical" h={"30px"} />
            <div className="font-montserrat leading-normal lg:text-3xl relative p-1 cursor-pointer">
              <FaCartShopping className="" />
              <span className="text-xs px-1 bg-coral-red text-white-400 rounded-full absolute top-0 right-0">
                0
              </span>
            </div>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <div className="hidden max-lg:block">
          <div onClick={toggleMenu} className="cursor-pointer text-[35px]">
            {isMenuOpen ? <RiCloseFill /> : <RiMenu3Line />}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-8 lg:hidden z-20 duration-500 transition-all ease-in-out">
            <ul className="flex flex-col items-center gap-4">
              <li className="font-montserrat leading-normal text-lg text-slate-gray">
                <Link to={"/products"} className="">
                  Products
                </Link>
              </li>
              <li className="font-montserrat leading-normal text-lg text-slate-gray">
                <Link to={"/about-us"} className="">
                  About Us
                </Link>
              </li>
              <li className="mt-3 flex flex-col items-center gap-2 info-text">
                <Link>
                  <div className="p-3 ">Log in</div>
                </Link>
                <Link>
                  <div className="text-coral-red ">Sign up</div>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
