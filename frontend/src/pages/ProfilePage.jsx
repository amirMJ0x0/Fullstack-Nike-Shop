import { Divider } from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>Nike - Profile</title>
      </Helmet>
      <div className="flex mt-10">
        {/* Sidebar */}
        <aside className="padding-x w-64 p-4 min-h-screen">
          <ul className="space-y-10 font-bold font-montserrat">
            <li>
              <Link to="account-info">Account Info</Link>
            </li>
            <li>
              <Link to="orders">Orders</Link>
            </li>
            <li>
              <Link to="my-favorites">My Favorites</Link>
            </li>
            <li>
              <Link to="my-comments">My Comments</Link>
            </li>
          </ul>
        </aside>

        <Divider orientation="vertical" h={'auto'}/>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default ProfilePage;
