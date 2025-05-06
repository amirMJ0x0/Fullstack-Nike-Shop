import { Divider, Heading } from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, Outlet, useLocation } from "react-router-dom";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useAuth } from "../context/AuthProvider";
import { BiComment, BiHeart, BiUser } from "react-icons/bi";
import { profileLinks } from "../constants";

const ProfilePage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;

  const isProfilePage = pathname === "/profile" || pathname === "/Profile";
  return (
    <>
      <Helmet>
        <title>Nike - Profile</title>
      </Helmet>
      <div className="flex max-sm:flex-col mt-5 md:mt-10">
        {/* Sidebar */}
        <aside className="padding-x max-sm:pt-0 md:w-64 p-4 md:min-h-screen">
          <ul className="md:space-y-10 max-sm:text-sm max-sm:gap-1 font-bold md:font-montserrat max-sm:flex max-sm:justify-between">
            {profileLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname.includes(to);
              return (
                <li key={to} className="max-sm-center space-y-1">
                  <Icon
                    className={`md:hidden text-lg transition-colors duration-300 ${
                      isActive ? "text-coral-red text-xl" : ""
                    }`}
                  />
                  <Link
                    to={to}
                    className={`max-sm:col-center transition-colors duration-300 ${
                      isActive ? "text-coral-red" : ""
                    }`}
                  >
                    {label.split(" ").map((word, i) => (
                      <span key={i}>{word}</span>
                    ))}
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        <Divider orientation="vertical" h={"auto"} />
        <main className="md:flex-1 p-4 md:ml-4">
          {isProfilePage ? (
            <Heading size={"lg"} mx={"auto"}>
              Welcome {user.username}
            </Heading>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </>
  );
};

export default ProfilePage;
