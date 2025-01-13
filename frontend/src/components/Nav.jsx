import { Link } from "react-router-dom";
import headerLogo from "../assets/images/header-logo.svg";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiCloseFill, RiMenu3Line } from "react-icons/ri";
import {
  Box,
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from "../context/AuthProvider";
import { BsMoon, BsSun } from "react-icons/bs";
import { GrSystem } from "react-icons/gr";
import useThemeSwitcher from "../hooks/useThemeSwitcher";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData, logOut } = useAuth();
  const { colorMode, changeTheme } = useThemeSwitcher();

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");

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
          <li className="flex gap-10 info-text">
            <div className="font-montserrat leading-normal lg:text-lg ">
              <Link to={"/products"} className="">
                <Text _dark={{ color: "gray.400" }}>Products</Text>
              </Link>
            </div>
            <div className="font-montserrat leading-normal lg:text-lg ">
              <Link to={"/about-us"} className="">
                <Text _dark={{ color: "gray.400" }}>About Us</Text>
              </Link>
            </div>
            <div className="font-montserrat leading-normal lg:text-lg ">
              <Link to={"/weblog"} className="">
                <Text _dark={{ color: "gray.400" }}>Blogs</Text>
              </Link>
            </div>
          </li>
          {/* Log in and Sign up | Profile*/}
          <li className="info-text flex items-center gap-5 max-lg:hidden">
            {!userData.data ? (
              <>
                <Link to={"/Login"}>
                  <Text className="p-3 hover:opacity-65">Log in</Text>
                </Link>
                <Link to={"/Register"}>
                  <Text className="bg-coral-red text-white-400 py-3 px-8 rounded-full hover:opacity-75 hover:transition-opacity">
                    Sign up
                  </Text>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={"/profile"}
                  className="flex justify-center items-center gap-2 text-2xl"
                >
                  <span>{userData?.data?.username}</span>
                  <FaUser />
                </Link>
                <button onClick={logOut}>
                  <div className="bg-coral-red text-white-400 py-3 px-8 rounded-full hover:opacity-75 hover:transition-opacity">
                    logout
                  </div>
                </button>
              </>
            )}

            <Divider
              orientation="vertical"
              h={"30px"}
              // className="dark:!opacity-15"
            />
            <Menu>
              <MenuButton
                as={Button}
                className="!bg-transparent !text-xl"
                marginRight={"-3.5"}
              >
                {colorMode === "light" ? (
                  <BsSun />
                ) : colorMode === "dark" ? (
                  <BsMoon />
                ) : colorMode === "system" ? (
                  <GrSystem />
                ) : null}
              </MenuButton>
              <Box bg={bgColor} color={textColor} className="!font-montserrat">
                <MenuList>
                  <MenuItem
                    icon={<BsSun />}
                    value={"light"}
                    // onClick={(e) => handleTheme(e)}
                    onClick={(e) => changeTheme(e)}
                    // className="dark:!bg-[#1E3E62]"
                  >
                    Light
                  </MenuItem>
                  <MenuItem
                    icon={<BsMoon />}
                    value={"dark"}
                    // onClick={(e) => handleTheme(e)}
                    onClick={(e) => changeTheme(e)}
                    // className="dark:!bg-[#1E3E62]"
                  >
                    Dark
                  </MenuItem>
                  <MenuItem
                    icon={<GrSystem />}
                    value={"system"}
                    // onClick={(e) => handleTheme(e)}
                    onClick={(e) => changeTheme(e)}
                    // className="dark:!bg-[#1E3E62]"
                  >
                    System
                  </MenuItem>
                </MenuList>
              </Box>
            </Menu>

            <Divider
              orientation="vertical"
              h={"30px"}
              className="dark:!opacity-15"
            />
            <Stack className="font-montserrat leading-normal lg:text-3xl relative p-1 cursor-pointer">
              <FaCartShopping
                className={` ${colorMode === "dark" && "text-white-400"}`}
              />
              <span className="text-xs px-1 bg-coral-red text-white-400 rounded-full absolute top-0 right-0">
                0
              </span>
            </Stack>
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
