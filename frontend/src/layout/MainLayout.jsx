import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import AuthProvider from "../context/AuthProvider";

const MainLayout = () => {
  return (
    <AuthProvider>
      <Nav />
      <div>
        <Outlet />
      </div>
    </AuthProvider>
  );
};

export default MainLayout;
