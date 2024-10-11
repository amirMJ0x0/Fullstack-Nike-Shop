import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const MainLayout = () => {
  return (
    <>
      <Nav />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
