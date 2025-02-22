import { Link, useNavigate } from "react-router-dom";
import headerLogo from "../assets/images/header-logo.svg";
import { useRef } from "react";
import { RiMenu3Line } from "react-icons/ri";
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaCartShopping } from "react-icons/fa6";
import { useAuth } from "../context/AuthProvider";
import useThemeSwitcher from "../hooks/useThemeSwitcher";
import ThemeChanger from "./share/ThemeChanger";
import ProfileContextMenu from "./share/ProfileContextMenu";
import { useCart } from "../context/CartProvider";

const Nav = () => {
  const { user } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const { colorMode, changeTheme } = useThemeSwitcher();
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("black", "white");
  const btnRef = useRef();
  return (
    <header className="padding-x py-8 relative z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <Link to={"/"}>
          <img
            src={headerLogo}
            alt="Logo"
            className="w-24 h-5 sm:w-32 sm:h-7 "
          />
        </Link>

        {/* Desktop Navigation */}
        <ul className="flex-1 flex justify-between items-center pl-16 max-lg:hidden">
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
          <li className="info-text flex items-center gap-5">
            {!user ? (
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
                <ProfileContextMenu textColor={textColor} bgColor={bgColor} />
              </>
            )}

            <Divider orientation="vertical" h={"30px"} />

            {/* theme change btn  */}
            <ThemeChanger
              colorMode={colorMode}
              changeTheme={changeTheme}
              bgColor={bgColor}
              textColor={textColor}
            />

            <Divider
              orientation="vertical"
              h={"30px"}
              className="dark:!opacity-15"
            />
            <Stack
              className="font-montserrat leading-normal text-2xl lg:text-3xl relative p-1 cursor-pointer"
              onClick={() => navigate("/cart")}
            >
              <FaCartShopping
                className={` ${colorMode === "dark" && "text-white-400"}`}
              />
              {totalItems > 0 && (
                <span className="text-xs px-1 bg-coral-red text-white-400 rounded-full absolute top-0 right-0">
                  {totalItems}
                </span>
              )}
            </Stack>
          </li>
        </ul>

        {/* Drawer Menu for Mobile devices */}
        <div className="gap-1 md:gap-2 hidden max-lg:flex">
          <Button
            color="#ff6452"
            size={{ base: "sm", md: "md" }}
            fontSize={"xl"}
            onClick={() => navigate("/cart")}
          >
            <FaCartShopping />
            {totalItems > 0 && (
              <span className="text-xs px-1 py-0 bg-coral-red text-white-400 rounded-full absolute -top-2 -right-1">
                {totalItems}
              </span>
            )}
            {/* <Badge className="absolute -top-1 -right-1 !rounded-md" colorScheme="orange">0</Badge> */}
          </Button>
          <ProfileContextMenu bgColor={bgColor} textColor={textColor} />
          <Button
            ref={btnRef}
            color="#ff6452"
            size={{ base: "sm", md: "md" }}
            fontSize={"xl"}
            onClick={onDrawerOpen}
          >
            <RiMenu3Line />
          </Button>

          <Drawer
            isOpen={isDrawerOpen}
            placement="right"
            onClose={onDrawerClose}
            finalFocusRef={btnRef}
            size={"xs"}
          >
            <DrawerOverlay />
            <DrawerContent overflow={"hidden"}>
              <DrawerCloseButton color={"#ff6452"} />
              <DrawerHeader color={"#ff6452"} fontWeight={"light"}>
                <ThemeChanger
                  changeTheme={changeTheme}
                  textColor={textColor}
                  bgColor={bgColor}
                  isMobileMode={true}
                />
              </DrawerHeader>
              <DrawerBody>
                <ul className="flex flex-col items-center gap-4 mt-4">
                  <li className="font-montserrat leading-normal text-lg text-slate-gray">
                    <Link onClick={onDrawerClose} to={"/products"}>
                      <Text _dark={{ color: "gray.300" }}>Products</Text>
                    </Link>
                  </li>
                  <Divider />
                  <li className="font-montserrat leading-normal text-lg text-slate-gray">
                    <Link onClick={onDrawerClose} to={"/about-us"} className="">
                      <Text _dark={{ color: "gray.300" }}>About Us</Text>
                    </Link>
                  </li>
                  <Divider />
                  <li className="font-montserrat leading-normal text-lg text-slate-gray">
                    <Link onClick={onDrawerClose} to={"/about-us"} className="">
                      <Text _dark={{ color: "gray.300" }}>Blogs</Text>
                    </Link>
                  </li>
                </ul>
              </DrawerBody>
              <DrawerFooter
                color={"#ff6452"}
                fontSize={"xl"}
                justifyContent={"center"}
                gap={"3"}
              >
                {!user && (
                  <>
                    <Link to={"/Login"}>
                      <Text className="p-2 hover:opacity-65">Log in</Text>
                    </Link>
                    <Link to={"/Register"}>
                      <Text className="bg-coral-red text-white-400 py-2 px-6 rounded-full hover:opacity-75 hover:transition-opacity">
                        Sign up
                      </Text>
                    </Link>
                  </>
                )}
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
